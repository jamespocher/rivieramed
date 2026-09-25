/**
 * Überträgt die neuen Startseiten-Texte ins Sanity-CMS (Dokument "homepage").
 * Ohne diesen Schritt überschreibt das CMS die neuen Texte aus dem Code,
 * weil dort noch die alten Werte ("Private pflege zu Hause. / Mit Herz.") stehen.
 *
 *   SANITY_WRITE_TOKEN=... node scripts/sync-homepage-cms.mjs          # mit Token
 *   node scripts/sync-homepage-cms.mjs                                  # nutzt das Login von `npx sanity login`
 *   node scripts/sync-homepage-cms.mjs --dry-run                        # nur anzeigen
 */
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT = "amas9704";
const DATASET = "riviera-med";
const DOC_ID = "136261ac-7600-481c-bc86-9908e1574f1a";
const dryRun = process.argv.includes("--dry-run");

const set = {
  heroEyebrow: "Spitex Thun & Bern",
  heroHeading: "Professionelle Pflege",
  heroHeadingAccent: "mit Hand und Herz.",
  heroSubtext:
    "Riviera Med ist Ihre private Spitex für Pflege und Betreuung zu Hause – in Thun, Bern, Spiez, Steffisburg und im ganzen Berner Oberland. Von allen Krankenkassen anerkannt, rund um die Uhr erreichbar.",
  heroTrustBadges: ["Spitex in Thun, Bern & Berner Oberland", "Alle Krankenkassen anerkannt", "24 Stunden erreichbar", "Kostenloses Erstgespräch"],
  servicesEyebrow: "Unsere Spitex-Leistungen",
  servicesHeading: "Pflege und Betreuung, die sich Ihrem Leben anpasst.",
  servicesSubtext:
    "Von wenigen Stunden pro Woche bis zur 24-Stunden-Betreuung: Pflege, Hauswirtschaft, Nachtwache und Physiotherapie aus einer Hand – zu Hause in Thun, Bern und im Berner Oberland.",
  whySubtext:
    "Wir sind eine kleine, private Spitex mit festem Team. Das bedeutet: Sie sehen immer bekannte Gesichter, und wir nehmen uns die Zeit, die gute Pflege zu Hause braucht.",
  whyBullets: [
    { _key: "team", title: "Kleines festes Team", description: "Sie lernen uns persönlich kennen – ohne wechselndes Personal." },
    { _key: "tarife", title: "Transparente Tarife", description: "Keine versteckten Kosten, Abrechnung im 15-Minuten-Takt, Pflegeleistungen über die Krankenkasse." },
    { _key: "flexibel", title: "Flexibel im Alltag", description: "Einsätze richten sich nach Ihrem Rhythmus – auch abends, nachts und am Wochenende." },
  ],
  landscapeEyebrow: "Spitex in Thun, Bern und im Berner Oberland",
  testimonialsEyebrow: "Rezensionen",
  testimonialsHeading: "Was Klientinnen, Klienten und Angehörige über uns sagen.",
  faqEyebrow: "Häufige Fragen zur Spitex",
  faqHeading: "Was Sie über Pflege zu Hause wissen möchten.",
  ctaHeading: "Sind wir die richtige Spitex für Ihre Familie?",
  ctaSubtext:
    "Lassen Sie uns unverbindlich darüber sprechen. Ein Erstgespräch bei Ihnen zu Hause in Thun, Bern oder im Berner Oberland ist kostenlos.",
};

async function token() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  try {
    const cfg = JSON.parse(await readFile(join(homedir(), ".config/sanity/config.json"), "utf8"));
    if (cfg.authToken) return cfg.authToken;
  } catch {}
  throw new Error("Kein Token: SANITY_WRITE_TOKEN setzen oder `npx sanity login` im studio/-Ordner ausführen.");
}

if (dryRun) {
  console.log(JSON.stringify(set, null, 2));
  process.exit(0);
}

const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
  body: JSON.stringify({ mutations: [{ patch: { id: DOC_ID, set } }] }),
});
const body = await res.json();
if (!res.ok) {
  console.error("Fehler:", JSON.stringify(body, null, 2));
  process.exit(1);
}
console.log("✓ Homepage-Dokument aktualisiert:", body.results?.map((r) => r.id).join(", "));
