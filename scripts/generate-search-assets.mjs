import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const mark = `<defs><mask id="aeoba-weave-mask"><rect width="320" height="320" fill="white"/><path d="M 92 178 C 120 198, 165 170, 218 158" stroke="black" stroke-width="19" stroke-linecap="round"/><path d="M 225 162 C 205 178, 175 180, 152 174" stroke="black" stroke-width="19" stroke-linecap="round"/></mask></defs><g mask="url(#aeoba-weave-mask)" stroke="#FAFAFA" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M 96 268 C 118 205, 138 66, 160 66 C 182 66, 206 205, 226 268"/><path d="M 110 268 C 130 212, 148 92, 161 92 C 174 92, 194 212, 212 268"/><path d="M 96 268 L 110 268" stroke-width="10"/><path d="M 212 268 C 218 273, 224 273, 226 268" stroke-width="9"/></g><path d="M 118 168 C 94 166, 94 184, 118 188 C 148 193, 186 154, 214 152 C 230 151, 232 164, 212 171 C 188 179, 148 169, 118 168 Z" stroke="#6366F1" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
const badge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="512" height="512" fill="none"><rect width="320" height="320" rx="64" fill="#09090D"/>${mark}</svg>`;

await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(path.join(publicDir, "logo.svg"), badge + "\n");
for (const size of [48, 96, 144, 192, 512]) {
  await sharp(Buffer.from(badge)).resize(size, size).png().toFile(path.join(publicDir, `icon-${size}.png`));
}
await sharp(Buffer.from(badge)).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
await fs.copyFile(path.join(publicDir, "icon-512.png"), path.join(publicDir, "logo.png"));

// ICO supports embedded PNG frames; retain all requested resolutions in its directory.
const sizes = [48, 96, 144];
const frames = await Promise.all(sizes.map(size => fs.readFile(path.join(publicDir, `icon-${size}.png`))));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
for (const [index, frame] of frames.entries()) {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
await fs.writeFile(path.join(publicDir, "favicon.ico"), Buffer.concat([header, ...frames]));

// Rasterize the checked-in Geist font through sharp's text renderer.
// This keeps the social card independent of fonts installed on the build host.
const fontfile = path.join(publicDir, "sites/aeoba/fonts/Geist_Variable-s.p.12e_ny3np-tt-.ttf");
const textLayer = async (text, size, color, width) => sharp({ text: { text: `<span foreground="${color}">${text}</span>`, font: `Geist ${size}`, fontfile, width, rgba: true, dpi: 72 } }).png().toBuffer();
const title = await textLayer("Aeoba", 94, "#FAFAFA", 720);
const tagline = await textLayer("Become the answer.", 46, "#FAFAFA", 780);
const detail = await textLayer("AEO · GEO · Technical SEO", 30, "#C7D2FE", 780);
const domain = await textLayer("aeoba.com", 26, "#FAFAFA", 500);
const badgeLayer = await sharp(Buffer.from(badge)).resize(250, 250).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#09090D" } }).composite([
  { input: badgeLayer, left: 65, top: 165 },
  { input: title, left: 365, top: 155 },
  { input: tagline, left: 370, top: 290 },
  { input: detail, left: 370, top: 370 },
  { input: domain, left: 80, top: 540 },
]).png().toFile(path.join(publicDir, "og-image.png"));

await fs.writeFile(path.join(publicDir, "manifest.webmanifest"), JSON.stringify({ name: "Aeoba", short_name: "Aeoba", description: "Aeoba AEO, GEO, and technical SEO agency", start_url: "/", display: "standalone", theme_color: "#09090D", background_color: "#09090D", icons: [192, 512].map(size => ({ src: `/icon-${size}.png`, sizes: `${size}x${size}`, type: "image/png", purpose: "any" })) }, null, 2) + "\n");
await fs.writeFile(path.join(publicDir, "browserconfig.xml"), '<?xml version="1.0" encoding="utf-8"?>\n<browserconfig><msapplication><tile><square150x150logo src="/icon-144.png"/><TileColor>#09090D</TileColor></tile></msapplication></browserconfig>\n');
console.log("Generated favicon ICO, five PNG icons, Apple icon, vector/raster logo, social card, manifest, and Microsoft tile configuration.");
