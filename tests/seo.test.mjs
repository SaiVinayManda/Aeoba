import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import sharp from "sharp";
import { sourceLoader, root } from "../scripts/lib/load-source.mjs";

const load = sourceLoader();
const { site, organizationSchema, websiteSchema } = load("src/config/site.ts");
const { routeCatalog } = load("src/lib/seo-routes.ts");
const { publicRoutes } = load("src/config/routes.ts");
const { blogAnswers, serviceAnswers } = load("src/content/seo-answers.ts");
const { glossaryEntries } = load("src/content/glossary.ts");
const { guideChapters } = load("src/content/resources.ts");
const { default: sitemap } = load("src/app/sitemap.ts");
const { default: robots } = load("src/app/robots.ts");

test("search identity uses the canonical agency, both locations, and a dimensioned raster logo", () => {
  assert.equal(websiteSchema.name, "Aeoba");
  assert.equal(websiteSchema.alternateName, "Aeoba AI SEO Agency");
  assert.equal(websiteSchema["@id"], "https://aeoba.com/#website");
  assert.ok(organizationSchema["@type"].includes("Organization"));
  assert.ok(organizationSchema["@type"].includes("ProfessionalService"));
  assert.equal(organizationSchema.logo.url, "https://aeoba.com/logo.png");
  assert.equal(organizationSchema.logo.width, 512);
  assert.equal(organizationSchema.logo.height, 512);
  assert.equal(organizationSchema.email, "info@aeoba.com");
  assert.equal(organizationSchema.location.map(location => location.name).join(";"), "Milan, Italy;Sliema, Malta");
});

test("sitemap covers public routes once with stable editorial dates and omits private routes", () => {
  const entries = sitemap();
  const urls = entries.map(item => item.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(entries.length, publicRoutes.length);
  for (const route of publicRoutes) assert.ok(urls.includes(route === "/" ? site.url : site.url + route), route);
  for (const item of entries) {
    assert.match(item.lastModified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(new Date(item.lastModified).getTime() <= Date.now() + 24 * 60 * 60 * 1000);
    assert.ok(item.priority > 0 && item.priority <= 1);
  }
  for (const route of routeCatalog.filter(item => !item.index)) assert.ok(!urls.includes(site.url + route.path));
});

test("every requested search and AI agent can retrieve public assets while private endpoints stay excluded", () => {
  const rules = robots();
  for (const bot of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended"]) {
    const rule = rules.rules.find(item => Array.isArray(item.userAgent) && item.userAgent.includes(bot));
    assert.ok(rule, bot);
    for (const asset of ["/favicon.ico", "/icon-*.png", "/logo.png", "/llms.txt", "/_next/static/"]) assert.ok(rule.allow.includes(asset), `${bot}: ${asset}`);
    assert.ok(rule.disallow.includes("/api/") && rule.disallow.includes("/portal"));
  }
  assert.equal(rules.sitemap, "https://aeoba.com/sitemap.xml");
});

test("answer blocks support extraction with 40–60 words and the guide retains all seven chapters", () => {
  const answers = [...Object.values(blogAnswers), ...Object.values(serviceAnswers), ...glossaryEntries];
  for (const item of answers) {
    const words = item.answer.split(/\s+/).length;
    assert.ok(words >= 40 && words <= 60, `${item.question}: ${words} words`);
    assert.ok(item.question.endsWith("?"));
  }
  assert.equal(guideChapters.length, 7);
  for (const chapter of guideChapters) {
    const words = `${chapter.body} ${chapter.task}`.split(/\s+/).length;
    assert.ok(words >= 40 && words <= 60, chapter.title);
  }
});

test("generated icons, social image, ICO frames, manifest, and LLM references are complete", async () => {
  for (const size of [48, 96, 144, 192, 512]) {
    const metadata = await sharp(path.join(root, `public/icon-${size}.png`)).metadata();
    assert.equal(metadata.width, size); assert.equal(metadata.height, size);
  }
  for (const [file, width, height] of [["logo.png", 512, 512], ["apple-touch-icon.png", 180, 180], ["og-image.png", 1200, 630]]) {
    const metadata = await sharp(path.join(root, "public", file)).metadata();
    assert.equal(metadata.width, width); assert.equal(metadata.height, height);
  }
  const ico = await fs.readFile(path.join(root, "public/favicon.ico"));
  assert.equal(ico.readUInt16LE(2), 1); assert.equal(ico.readUInt16LE(4), 3);
  for (const [index, size] of [48, 96, 144].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size); assert.equal(ico[entry + 1], size);
    const length = ico.readUInt32LE(entry + 8), offset = ico.readUInt32LE(entry + 12);
    const frame = await sharp(ico.subarray(offset, offset + length)).metadata();
    assert.equal(frame.width, size); assert.equal(frame.height, size);
  }
  const manifest = JSON.parse(await fs.readFile(path.join(root, "public/manifest.webmanifest"), "utf8"));
  assert.equal(manifest.name, site.name); assert.equal(manifest.theme_color, "#09090D");
  assert.equal(manifest.icons.length, 2);
  const text = await fs.readFile(path.join(root, "public/llms.txt"), "utf8");
  const full = await fs.readFile(path.join(root, "public/llms-full.txt"), "utf8");
  assert.ok(text.startsWith("# Aeoba\n\n> "));
  assert.ok(text.includes("$1,597/mo") && text.includes("$2,997/mo") && text.includes("Enterprise: Custom"));
  assert.ok(text.includes(site.guarantee));
  assert.ok(full.length > text.length * 4);
  for (const match of full.matchAll(/\]\((https:\/\/aeoba\.com[^)]+)\)/g)) {
    const url = new URL(match[1]);
    assert.ok(publicRoutes.includes(url.pathname) || ["/llms-full.txt", "/sitemap.xml"].includes(url.pathname), url.href);
  }
});
