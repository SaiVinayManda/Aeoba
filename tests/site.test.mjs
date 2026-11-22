import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import { sourceLoader, root } from "../scripts/lib/load-source.mjs";

const load = sourceLoader();
const { site, organizationSchema, faqSchema, bookingUrl } = load("src/config/site.ts");
const { publicRoutes, privateRoutes } = load("src/config/routes.ts");
const { routeAliases } = load("src/config/aliases.ts");
const { navigationMenus } = load("src/config/navigation.ts");
const { calculatePipeline, csvCell, makeBuyerPrompts } = load("src/lib/tools.ts");
const { auditUrl, isPublicAddress } = load("src/server/public-url.ts");
const { analyzeHtml } = load("src/server/readiness.ts");
const { validateSubmission, saveRequest, readRequests } = load("src/server/requests.ts");
const auth = load("src/server/auth.ts");
const { sameOrigin } = load("src/server/http.ts");

test("form origins use the incoming host across loopback and HTTPS proxy deployments", () => {
  assert.equal(sameOrigin(new Request("http://localhost:3000/api/requests", { headers: { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000" } })), true);
  assert.equal(sameOrigin(new Request("http://localhost:3000/api/requests", { headers: { host: "aeoba.com", origin: "https://aeoba.com", "x-forwarded-proto": "https" } })), true);
  assert.equal(sameOrigin(new Request("http://localhost:3000/api/requests", { headers: { host: "aeoba.com", origin: "https://outside.example.invalid", "x-forwarded-proto": "https" } })), false);
  assert.equal(sameOrigin(new Request("http://localhost:3000/api/requests")), false);
});

test("every navigation item and legacy alias resolves to an explicit native route", () => {
  const routes = new Set([...publicRoutes, ...privateRoutes]);
  for (const menu of navigationMenus) { assert.ok(routes.has(`/${menu.slug}`)); for (const group of menu.groups) for (const item of group.links) assert.ok(routes.has(item.href), item.href); }
  for (const [alias, destination] of Object.entries(routeAliases)) { assert.ok(alias.startsWith("/")); assert.ok(routes.has(destination), `${alias} -> ${destination}`); }
  assert.equal(bookingUrl, "/book-call"); assert.equal(new Set(publicRoutes).size, publicRoutes.length);
});

test("identity and JSON-LD share the configured founder, locations, email, and visible FAQs", () => {
  assert.equal(site.name, "Aeoba"); assert.equal(site.founder.name, "Sai (Saivinay Manda)"); assert.equal(site.email, "saivinay0027@gmail.com");
  assert.equal(organizationSchema.founder.name, site.founder.name); assert.equal(organizationSchema.location.length, 2);
  assert.equal(organizationSchema.location[0].name, "Milan, Italy"); assert.equal(organizationSchema.location[1].name, "Sliema, Malta");
  for (const [index, item] of site.faq.entries()) { assert.equal(faqSchema.mainEntity[index].name, item.question); assert.equal(faqSchema.mainEntity[index].acceptedAnswer.text, item.answer); }
  assert.ok(site.guarantee.includes("10 buyer-intent prompts")); assert.ok(site.guaranteeTerms.includes("both ChatGPT and Perplexity"));
});

test("pipeline separates visits, opportunities, pipeline, revenue, and program cost", () => {
  const result = calculatePipeline({ dealValue: 10000, prompts: 1000, coverage: 20, clickRate: 5, leadRate: 10, winRate: 20, monthlyFee: 1597 });
  assert.equal(result.visits, 10); assert.equal(result.opportunities, 1); assert.equal(result.pipeline, 10000); assert.equal(result.revenue, 2000); assert.equal(result.net, 403);
  const empty = calculatePipeline({ dealValue: -1, prompts: NaN, coverage: 1000, clickRate: -10, leadRate: 0, winRate: 0, monthlyFee: 0 });
  assert.equal(empty.pipeline, 0); assert.ok(Object.values(empty).every(Number.isFinite));
});

test("prompt plans preserve audience, market, and decision context", () => {
  const prompts = makeBuyerPrompts("technical AEO", "SaaS founders", "Milan", "Comparison");
  assert.equal(prompts.length, 3); assert.ok(prompts[0].includes("technical AEO")); assert.ok(prompts[0].includes("SaaS founders")); assert.ok(prompts[0].includes("Milan"));
});

test("CSV exports quote values and neutralize spreadsheet formulas", () => {
  assert.equal(csvCell('a"b'), '"a""b"');
  for (const value of ["=1+1", "+CMD", "-1+2", "@SUM(1)", "  =1+1", "\n=1+1"]) assert.ok(csvCell(value).startsWith('"\''));
});

test("the public website policy blocks private, reserved, credential, and non-web targets", () => {
  for (const target of ["http://127.0.0.1", "http://2130706433", "http://0x7f000001", "http://10.0.0.1", "http://169.254.169.254", "http://[::1]", "http://[::ffff:127.0.0.1]", "http://localhost", "http://service.internal", "file:///etc/passwd", "https://user:password@aeoba.com", "https://aeoba.com:8080"]) assert.throws(() => auditUrl(target), target);
  for (const address of ["0.0.0.0", "172.16.0.1", "192.168.1.1", "100.64.0.1", "224.0.0.1", "198.51.100.2", "fc00::1", "fe80::1", "2001:db8::1", "2002:7f00:1::", "2::1"]) assert.equal(isPublicAddress(address), false, address);
  assert.equal(isPublicAddress("1.1.1.1"), true); assert.equal(isPublicAddress("2606:4700:4700::1111"), true); assert.equal(isPublicAddress("2001:4860:4860::8888"), true); assert.equal(auditUrl("aeoba.com").href, "https://aeoba.com/");
});

test("readiness findings come from actual supplied HTML, not a visibility estimate", () => {
  const html = '<title>Aeoba &amp; answers</title><meta content="Useful page" name="description"><link href="https://aeoba.com/" rel="canonical"><h1>Useful answers</h1><script type="application/ld+json">{"@graph":[{"@type":"Organization"},{"@type":"FAQPage"}]}</script>';
  const result = analyzeHtml(html, "https://aeoba.com/"); assert.equal(result.title, "Aeoba & answers"); assert.equal(result.h1Count, 1); assert.equal(result.checks.filter(check => check.passed).length, 7);
  const bad = analyzeHtml('<meta name="robots" content="noindex"><script type="application/ld+json">invalid</script>', "https://aeoba.com/"); assert.equal(bad.schemaTypes.length, 0); assert.equal(bad.checks.find(check => check.id === "robots").passed, false);
  const scriptOnly = analyzeHtml('<script>const example = "<h1>not a visible heading</h1>";</script><h1>Real heading</h1><meta name=description content="Unquoted attribute support">', "https://aeoba.com/"); assert.equal(scriptOnly.h1Count, 1); assert.equal(scriptOnly.description, "Unquoted attribute support");
});

test("submissions validate email, URL protocol, report prompts, and plan", () => {
  const base = { kind: "report", email: "sample@example.invalid", website: "https://aeoba.com", prompts: ["Which AEO partner fits our needs?"] };
  assert.equal(validateSubmission(base).prompts.length, 1);
  assert.throws(() => validateSubmission({ ...base, email: "wrong" })); assert.throws(() => validateSubmission({ ...base, website: "javascript:alert(1)" })); assert.throws(() => validateSubmission({ ...base, prompts: [] })); assert.throws(() => validateSubmission({ ...base, kind: "onboarding", plan: "unknown" }));
});

test("sessions require configured credentials, reject tampering, and expire", () => {
  const before = { password: process.env.AEOBA_PORTAL_PASSWORD, secret: process.env.AEOBA_SESSION_SECRET, email: process.env.AEOBA_PORTAL_EMAIL };
  try {
    process.env.AEOBA_PORTAL_PASSWORD = "test-password-for-native-verification"; process.env.AEOBA_SESSION_SECRET = "test-session-secret-for-native-verification-only"; process.env.AEOBA_PORTAL_EMAIL = "sample@example.invalid";
    assert.equal(auth.validCredentials("sample@example.invalid", "wrong"), false); assert.equal(auth.validCredentials("other@example.invalid", process.env.AEOBA_PORTAL_PASSWORD), false); assert.equal(auth.validCredentials("sample@example.invalid", process.env.AEOBA_PORTAL_PASSWORD), true);
    const now = Date.now(), token = auth.createSession(now); assert.equal(auth.readSession(token, now).email, "sample@example.invalid"); assert.equal(auth.readSession(token + "x", now), null); assert.equal(auth.readSession(token, now + auth.sessionSeconds * 1000 + 1), null);
    process.env.AEOBA_SESSION_SECRET = ""; assert.equal(auth.readSession(token, now), null); assert.equal(auth.portalConfigured(), false);
  } finally { for (const [key, value] of [["AEOBA_PORTAL_PASSWORD", before.password], ["AEOBA_SESSION_SECRET", before.secret], ["AEOBA_PORTAL_EMAIL", before.email]]) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } }
});

test("concurrent form submissions are persisted and read without a fabricated success", async () => {
  const parent = path.join(root, "temp"); await fs.mkdir(parent, { recursive: true }); const dir = await fs.mkdtemp(path.join(parent, "aeoba-storage-test-")); const previous = process.env.AEOBA_DATA_DIR; process.env.AEOBA_DATA_DIR = dir;
  try {
    const data = validateSubmission({ kind: "contact", email: "sample@example.invalid", message: "Native storage verification request." });
    const saved = await Promise.all(Array.from({ length: 12 }, () => saveRequest(data))); const records = await readRequests(); assert.equal(records.length, 12); assert.equal(new Set(records.map(record => record.id)).size, 12); assert.ok(saved.every(item => records.some(record => record.id === item.id)));
  } finally { if (previous === undefined) delete process.env.AEOBA_DATA_DIR; else process.env.AEOBA_DATA_DIR = previous; if (!dir.startsWith(path.join(root, "temp", "aeoba-storage-test-"))) throw new Error("Unexpected test cleanup path."); await fs.rm(dir, { recursive: true, force: true }); }
});
