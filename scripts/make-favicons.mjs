/**
 * Erzeugt Favicons aus dem Bildzeichen (Kreis mit Kreuz) der Wortmarke.
 *   node scripts/make-favicons.mjs
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";

const SRC = "src/assets/riviera-med-logo-trimmed.png";
const OUT = "public";
await mkdir(OUT, { recursive: true });

// Bildzeichen links ausschneiden, auf Inhalt trimmen, quadratisch mit Rand setzen
const mark = await sharp(SRC).extract({ left: 0, top: 0, width: 200, height: 190 }).trim().toBuffer();
const meta = await sharp(mark).metadata();
const side = Math.max(meta.width, meta.height);
const pad = Math.round(side * 0.08);
const square = await sharp(mark)
  .extend({
    top: Math.floor((side - meta.height) / 2) + pad,
    bottom: Math.ceil((side - meta.height) / 2) + pad,
    left: Math.floor((side - meta.width) / 2) + pad,
    right: Math.ceil((side - meta.width) / 2) + pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const sizes = { "favicon-16.png": 16, "favicon-32.png": 32, "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512 };
for (const [name, px] of Object.entries(sizes)) {
  // Apple-Icon ohne Transparenz (iOS füllt sonst schwarz), Rest transparent
  const base = sharp(square).resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const buf = name.startsWith("apple") ? await base.flatten({ background: "#ffffff" }).png().toBuffer() : await base.png().toBuffer();
  await writeFile(`${OUT}/${name}`, buf);
}

// favicon.ico: ICO-Container mit PNG-Einträgen (16, 32, 48)
const icoPngs = await Promise.all([16, 32, 48].map((px) => sharp(square).resize(px, px).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(icoPngs.length, 4);
let offset = 6 + 16 * icoPngs.length;
const entries = [], datas = [];
icoPngs.forEach((png, i) => {
  const px = [16, 32, 48][i];
  const e = Buffer.alloc(16);
  e.writeUInt8(px === 256 ? 0 : px, 0); e.writeUInt8(px === 256 ? 0 : px, 1);
  e.writeUInt8(0, 2); e.writeUInt8(0, 3); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
  offset += png.length; entries.push(e); datas.push(png);
});
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, ...entries, ...datas]));

await writeFile(`${OUT}/site.webmanifest`, JSON.stringify({
  name: "Riviera Med – Spitex Thun & Bern",
  short_name: "Riviera Med",
  icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  theme_color: "#2f4fd6", background_color: "#ffffff", display: "browser",
}, null, 2));
console.log("Favicons erzeugt:", Object.keys(sizes).join(", "), "favicon.ico, site.webmanifest");
