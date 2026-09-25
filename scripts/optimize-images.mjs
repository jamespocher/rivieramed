/**
 * Erzeugt optimierte WebP-Varianten der grossen Fotos.
 *   node scripts/optimize-images.mjs
 * Quelle bleibt unangetastet; Ausgabe wird im Code referenziert.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const jobs = [
  // Hero (public, feste Namen → Preload in index.html)
  { src: "src/assets/headline-foto.jpg", out: "public/images/spitex-thun-pflege-zuhause-hero.webp", width: 1920, quality: 74 },
  { src: "src/assets/headline-foto.jpg", out: "public/images/spitex-thun-pflege-zuhause-hero-mobile.webp", width: 1080, quality: 72 },
  // Logos (Header/Footer, laden auf jeder Seite)
  { src: "src/assets/riviera-med-logo-trimmed.png", out: "src/assets/riviera-med-logo-trimmed.webp", width: 600, quality: 90 },
  { src: "src/assets/riviera-med-logo-weiss.png", out: "src/assets/riviera-med-logo-weiss.webp", width: 600, quality: 90 },
  // Inhaltsbilder (werden von Vite gehasht)
  { src: "src/assets/vertrauen.jpg", out: "src/assets/vertrauen.webp", width: 1600, quality: 74 },
  { src: "src/assets/thunersee.jpg", out: "src/assets/thunersee.webp", width: 1920, quality: 70 },
];

await mkdir("public/images", { recursive: true });
for (const j of jobs) {
  const info = await sharp(j.src).resize({ width: j.width, withoutEnlargement: true }).webp({ quality: j.quality, effort: 5 }).toFile(j.out);
  console.log(`${j.out}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
}
