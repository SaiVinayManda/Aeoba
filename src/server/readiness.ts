import { lookup } from "node:dns/promises";
import { request as httpsRequest } from "node:https";
import { request as httpRequest } from "node:http";
import { isIP } from "node:net";
import type { ReadinessResult } from "@/lib/readiness-types";
import { auditUrl, isPublicAddress } from "@/server/public-url";

async function publicPage(input: string, deadline = Date.now() + 12000, redirects = 0): Promise<{ html: string; url: URL }> {
  const url = auditUrl(input), hostname = url.hostname.replace(/^\[|\]$/g, "");
  const remaining = deadline - Date.now(); if (remaining <= 0) throw new Error("The website took too long to respond.");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const addresses = await Promise.race([
    isIP(hostname) ? Promise.resolve([{ address: hostname, family: isIP(hostname) }]) : lookup(hostname, { all: true, verbatim: true }),
    new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("The website could not be resolved in time.")), remaining); }),
  ]).finally(() => { if (timer) clearTimeout(timer); });
  if (!addresses.length || addresses.some(item => !isPublicAddress(item.address))) throw new Error("This host does not resolve exclusively to public addresses.");
  const address = addresses.find(item => item.family === 4) ?? addresses[0];
  // Connect to the validated IP, preserving the original Host and TLS server
  // name. A second DNS lookup must not turn a public target into a private one.
  const result = await new Promise<{ html: string; location?: string }>((resolve, reject) => {
    const transport = url.protocol === "https:" ? httpsRequest : httpRequest;
    const req = transport({ hostname: address.address, servername: hostname, family: address.family, port: url.port || (url.protocol === "https:" ? 443 : 80), path: url.pathname + url.search, method: "GET", maxHeaderSize: 16384, headers: { Host: url.host, "User-Agent": "AeobaReadiness/1.0", Accept: "text/html", "Accept-Encoding": "identity" }, signal: AbortSignal.timeout(Math.max(1, deadline - Date.now())) }, response => {
      const status = response.statusCode || 0;
      if ([301, 302, 303, 307, 308].includes(status) && response.headers.location) { response.resume(); resolve({ html: "", location: new URL(response.headers.location, url).href }); return; }
      if (status < 200 || status >= 300) { response.resume(); reject(new Error(`The website returned HTTP ${status}. Try another public page or request a manual report.`)); return; }
      if (!response.headers["content-type"]?.toLowerCase().includes("text/html")) { response.resume(); reject(new Error("This URL did not return an HTML web page.")); return; }
      if (response.headers["content-encoding"] && response.headers["content-encoding"] !== "identity") { response.resume(); reject(new Error("This website did not provide uncompressed HTML for the quick check. Request a manual report instead.")); return; }
      const parts: Buffer[] = []; let bytes = 0;
      response.on("data", (chunk: Buffer) => { bytes += chunk.length; if (bytes > 1024 * 1024) { req.destroy(new Error("The HTML page is too large for this quick check.")); return; } parts.push(chunk); });
      response.on("end", () => resolve({ html: Buffer.concat(parts).toString("utf8") })); response.on("error", reject);
    });
    req.on("error", reject); req.end();
  });
  if (result.location) { if (redirects >= 3) throw new Error("The website redirected too many times."); return publicPage(result.location, deadline, redirects + 1); }
  return { html: result.html, url };
}

const attribute = (tag: string, key: string) => { const match = tag.match(new RegExp(`(?:^|\\s)${key}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")); return match?.[1] ?? match?.[2] ?? match?.[3] ?? ""; };
const plainText = (text: string) => text.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();

export function analyzeHtml(html: string, url: string): ReadinessResult {
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const title = plainText(markup.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").slice(0, 300);
  const meta = [...markup.matchAll(/<meta\b[^>]*>/gi)].map(item => item[0]);
  const description = plainText(attribute(meta.find(tag => attribute(tag, "name").toLowerCase() === "description") || "", "content")).slice(0, 1000);
  const canonical = attribute([...markup.matchAll(/<link\b[^>]*>/gi)].map(item => item[0]).find(tag => attribute(tag, "rel").toLowerCase() === "canonical") || "", "href");
  const h1Count = [...markup.matchAll(/<h1\b/gi)].length, types = new Set<string>();
  const collect = (value: unknown, depth = 0) => { if (!value || typeof value !== "object" || depth > 10) return; if (Array.isArray(value)) { value.slice(0, 100).forEach(item => collect(item, depth + 1)); return; } const object = value as Record<string, unknown>; const type = object["@type"]; if (typeof type === "string") types.add(type); else if (Array.isArray(type)) type.forEach(item => { if (typeof item === "string") types.add(item); }); for (const item of Object.values(object)) if (typeof item === "object") collect(item, depth + 1); };
  for (const script of [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].slice(0, 100)) if (attribute(script[1], "type").toLowerCase() === "application/ld+json") { try { collect(JSON.parse(script[2])); } catch { /* Invalid markup is not counted as valid schema. */ } }
  const robots = attribute(meta.find(tag => attribute(tag, "name").toLowerCase() === "robots") || "", "content");
  return { url, fetchedAt: new Date().toISOString(), title, description, canonical, h1Count, schemaTypes: [...types].slice(0, 50), checks: [
    { id: "title", label: "Page title", passed: Boolean(title), detail: title || "No title was found in the fetched HTML." },
    { id: "description", label: "Meta description", passed: Boolean(description), detail: description || "No meta description was found." },
    { id: "h1", label: "One primary heading", passed: h1Count === 1, detail: `${h1Count} H1 heading${h1Count === 1 ? "" : "s"} found in the fetched HTML.` },
    { id: "canonical", label: "Canonical URL", passed: Boolean(canonical), detail: canonical || "No canonical URL was found." },
    { id: "organization", label: "Organization entity", passed: types.has("Organization") || types.has("LocalBusiness"), detail: types.has("Organization") || types.has("LocalBusiness") ? "Organization or LocalBusiness JSON-LD was found." : "No Organization or LocalBusiness JSON-LD was found." },
    { id: "faq", label: "FAQ structured data", passed: types.has("FAQPage"), detail: types.has("FAQPage") ? "FAQPage JSON-LD was found; verify that it matches visible questions." : "No FAQPage JSON-LD was found. Add it only if the page has useful visible FAQs." },
    { id: "robots", label: "No meta noindex directive", passed: !/\bnoindex\b|\bnone\b/i.test(robots), detail: robots || "No meta robots restriction was found. This does not check robots.txt or HTTP-level indexing directives." },
  ] };
}

export async function scanWebsite(input: string) {
  try { const page = await publicPage(input); return analyzeHtml(page.html, page.url.href); }
  catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EACCES" || code === "EPERM") throw new Error("This server cannot reach public websites right now. You can still request a manual AEO report.");
    if (code === "ENOTFOUND" || code === "EAI_AGAIN") throw new Error("The website address could not be resolved. Check the domain and try again.");
    if (code === "ECONNRESET" || code === "ECONNREFUSED" || code === "ETIMEDOUT" || code === "ABORT_ERR") throw new Error("The website did not complete the connection in time. Try another public page or request a manual report.");
    if (code?.includes("CERT") || code?.includes("TLS")) throw new Error("A secure connection to this website could not be verified. Request a manual report instead.");
    throw error;
  }
}
