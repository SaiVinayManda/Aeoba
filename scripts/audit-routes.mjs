import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { sourceLoader, root } from "./lib/load-source.mjs";

const load = sourceLoader(), { publicRoutes, privateRoutes } = load("src/config/routes.ts"), { routeAliases } = load("src/config/aliases.ts"), { site } = load("src/config/site.ts"), { navigationMenus } = load("src/config/navigation.ts");
const port = Number(process.env.AEOBA_AUDIT_PORT || 3011), origin = `http://localhost:${port}`;
const password = randomBytes(24).toString("hex"), secret = randomBytes(32).toString("hex"), email = "route-audit@example.invalid";
await fs.mkdir(path.join(root, "temp"), { recursive: true });
const storage = await fs.mkdtemp(path.join(root, "temp", "aeoba-route-audit-"));
const server = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "start", "-p", String(port)], { cwd: root, env: { ...process.env, AEOBA_DATA_DIR: storage, AEOBA_PORTAL_EMAIL: email, AEOBA_PORTAL_PASSWORD: password, AEOBA_SESSION_SECRET: secret }, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
let log = ""; const capture = chunk => { log = (log + chunk.toString()).slice(-16000); }; server.stdout.on("data", capture); server.stderr.on("data", capture);
const pages = new Map(), anchors = new Set();
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const get = async route => { if (pages.has(route)) return pages.get(route); const response = await fetch(origin + route); assert.equal(new URL(response.url).origin, origin, `External redirect: ${route}`); assert.equal(response.status, 200, `${route}: HTTP ${response.status}`); const html = await response.text(); pages.set(route, html); return html; };
const post = (route, body, extra = {}) => fetch(origin + route, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin, ...extra }, body: JSON.stringify(body), redirect: "manual" });

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) { if (server.exitCode !== null) throw new Error(`Preview server exited: ${log}`); try { const response = await fetch(origin); if (response.status === 200) { ready = true; break; } } catch { /* Wait for this isolated production server. */ } await delay(200); }
  assert.ok(ready, `Preview server did not start: ${log}`);
  const routes = [...publicRoutes, ...privateRoutes.filter(route => route !== "/portal"), "/checkout?plan=growth", "/checkout?plan=scale", "/checkout?plan=enterprise", "/contact?subject=Strategy%20call", "/resources/tools/ai-visibility-checker?url=https%3A%2F%2Faeoba.com"];
  for (let index = 0; index < routes.length; index += 6) {
    await Promise.all(routes.slice(index, index + 6).map(async route => {
      const html = await get(route);
      assert.ok(html.includes("Aeoba"), `${route}: missing brand`); assert.ok(html.includes(site.email), `${route}: missing contact`);
      assert.ok(html.includes("Milan, Italy") && html.includes("Sliema, Malta"), `${route}: missing locations`);
      assert.ok(/<title>[^<]*Aeoba/.test(html), `${route}: missing branded page title`);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(item => JSON.parse(item[1]));
      assert.ok(schemas.some(schema => schema["@type"] === "Organization" && schema.name === site.name), `${route}: missing organization schema`);
      for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
        const href = decode(match[1]);
        if (href.startsWith("mailto:")) { assert.equal(href, `mailto:${site.email}`); continue; }
        if (href.startsWith("https://")) { assert.ok(route.startsWith("/resources/blog/") || route === "/resources/podcast", `${route}: unexpected external link`); continue; }
        assert.ok(href.startsWith("/") || href.startsWith("#"), `${route}: outbound or invalid link ${href}`);
        const destination = new URL(href, origin + route); assert.equal(destination.origin, origin); anchors.add(destination.pathname + destination.search + destination.hash);
      }
    }));
    console.log(`Checked ${Math.min(index + 6, routes.length)}/${routes.length} native pages.`);
  }
  for (const menu of navigationMenus) for (const group of menu.groups) for (const link of group.links) { anchors.add(link.href); await get(link.href); }
  for (const href of anchors) { const target = new URL(href, origin), html = await get(target.pathname + target.search); if (target.hash) assert.ok(html.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Missing section: ${href}`); }
  for (const [alias, destination] of Object.entries(routeAliases)) { const response = await fetch(origin + alias, { redirect: "manual" }); assert.ok([307, 308].includes(response.status), `${alias}: missing native redirect`); assert.equal(response.headers.get("location"), destination); await get(destination); }
  for (const route of ["/not-a-real-page", "/platform/not-a-feature", "/resources/blog/not-an-article"]) assert.equal((await fetch(origin + route)).status, 404, `${route}: unknown pages must not be generic 200s`);
  for (const route of ["/sitemap.xml", "/robots.txt", "/aeoba-mark.svg"]) assert.equal((await fetch(origin + route)).status, 200, route);
  const assets = new Set();
  for (const html of pages.values()) for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)(?:\?[^"]*)?"/g)) assets.add(decode(match[1]));
  for (const asset of assets) {
    const response = await fetch(origin + asset); assert.equal(response.status, 200, `Missing asset: ${asset}`);
    if (asset.endsWith(".css")) for (const match of (await response.text()).matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) { const url = new URL(match[1], origin + asset); if (url.origin === origin && url.pathname.startsWith("/_next/")) assets.add(url.pathname); }
  }
  const home = await get("/"); assert.ok(!home.includes(["Trusted by", "50+ brands"].join(" "))); assert.ok(home.includes(site.guarantee.replaceAll("&", "&amp;")) || home.includes(site.guarantee));
  let response = await fetch(origin + "/portal", { redirect: "manual" }); assert.equal(response.status, 307); assert.equal(response.headers.get("location"), "/login");
  response = await post("/api/requests", { kind: "report", email, website: "https://aeoba.com", prompts: ["Which AEO program fits our buyer questions?"], name: "Route verification" }); assert.equal(response.status, 201); const saved = await response.json(); assert.ok(saved.id); const stored = await fs.readFile(path.join(storage, "requests.jsonl"), "utf8"); assert.ok(stored.includes(saved.id));
  response = await post("/api/requests", { kind: "contact", email: "invalid" }); assert.equal(response.status, 400);
  response = await post("/api/requests", { kind: "contact", email }, { Origin: "https://outside.example.invalid" }); assert.equal(response.status, 403);
  response = await post("/api/readiness", { url: "http://127.0.0.1" }); assert.equal(response.status, 422);
  let publicScan = false;
  if (process.env.AEOBA_AUDIT_PUBLIC_URL) {
    response = await post("/api/readiness", { url: process.env.AEOBA_AUDIT_PUBLIC_URL });
    const result = await response.json(); assert.equal(response.status, 200, result.error); assert.ok(result.title); assert.equal(result.checks.length, 7); publicScan = true;
    console.log(`Public HTML fetch passed: ${result.url} · ${result.title}`);
  }
  response = await post("/api/auth/login", { email, password: "incorrect" }); assert.equal(response.status, 401);
  response = await post("/api/auth/login", { email, password }); assert.equal(response.status, 200); const cookieHeader = response.headers.get("set-cookie"); assert.ok(cookieHeader?.toLowerCase().includes("httponly")); const cookie = cookieHeader.split(";")[0];
  response = await fetch(origin + "/portal", { headers: { Cookie: cookie } }); assert.equal(response.status, 200); assert.ok((await response.text()).includes(saved.id));
  response = await fetch(origin + "/portal", { headers: { Cookie: cookie + "tampered" }, redirect: "manual" }); assert.equal(response.status, 307);
  response = await post("/api/auth/logout", {}, { Cookie: cookie }); assert.equal(response.status, 200); assert.ok(response.headers.get("set-cookie")?.includes("aeoba-session="));
  const report = { pages: routes.length, distinctNativeDestinations: pages.size, internalLinksAndSections: anchors.size, aliases: Object.keys(routeAliases).length, assets: assets.size, publicReadinessFetch: publicScan ? "passed" : "not requested", verified: ["page identity and metadata", "organization schema", "internal links and section anchors", "JavaScript, stylesheet, and font assets", "404 behavior", "request persistence and validation", "cross-origin rejection", "private network scan rejection", "portal login, cookie, protected data, tampering, and logout", ...(publicScan ? ["public website readiness scan"] : [])] };
  await fs.mkdir(path.join(root, "docs"), { recursive: true }); await fs.writeFile(path.join(root, "docs", "route-audit.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} catch (error) { console.error(log.slice(-6000)); throw error; }
finally {
  server.kill();
  await delay(400);
  if (!storage.startsWith(path.join(root, "temp", "aeoba-route-audit-"))) throw new Error("Unexpected audit cleanup path.");
  await fs.rm(storage, { recursive: true, force: true });
}
