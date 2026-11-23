import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ignored = new Set([".git", "node_modules", ".next", ".data", "temp"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".mdx", ".css", ".html", ".txt", ".svg"]);
// Construct the retired names so the audit itself does not reintroduce them.
const retired = ["aeo" + "engine", ["AEO", "Engine"].join(" "), ["AEO", "ENGINE", "LLC"].join(" "), "Vij" + "ay", "Man" + "vel", ["30%", "traffic", "growth"].join(" "), "Ask4" + "SAM", "Broad" + "view", "Dominate" + " Dental", "My Rights" + " Law", "Cornish" + " Seaweed", "Product" + "Scope", "Oppo" + "Suits", "Agent" + " Odyssey"];
const personal = [`\\b${"S" + "ai"}\\b`, "S" + "aivinay", ["founder", "CEO"].join("\\s*/\\s*"), ["saiv", "inay0027", "@gmail.com"].join("")];
const pattern = new RegExp([...retired, ...personal].join("|"), "i"), matches = [];
let scanned = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink() || ignored.has(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (textExtensions.has(path.extname(file)) || entry.name === ".env.example") { scanned++; if (pattern.test(await fs.readFile(file, "utf8"))) matches.push(path.relative(root, file)); }
  }
}
await walk(root);
if (matches.length) { console.error(`Brand audit failed in ${matches.length} file(s):\n${matches.join("\n")}`); process.exitCode = 1; }
else console.log(`Brand audit passed: ${scanned} source, configuration, documentation, and text asset files; zero retired-brand matches.`);
