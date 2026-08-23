import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/contact";
import { scrollToId } from "@/lib/scroll-to";
import { sanityClient, tarifeQuery } from "@/lib/sanity";

type Row = { label: string; unit: string; price: string; note?: string }
type FinItem = { q: string; a: string }
type CmsData = {
  eyebrow?: string; heading?: string; subtext?: string
  pflegeHeading?: string; pflegeSubtext?: string; pflegeRows?: Row[]
  haushaltsHeading?: string; haushaltsSubtext?: string; haushaltsRows?: Row[]
  nachtHeading?: string; nachtSubtext?: string; nachtRows?: Row[]
  finanzierungHeading?: string; finanzierungItems?: FinItem[]
  ctaHeading?: string; ctaSubtext?: string
}

export const Route = createFileRoute("/tarife")({
  head: () => ({
    meta: [
      { title: "Tarife & Finanzierung — Riviera Med" },
      { name: "description", content: "Transparente Tarife für Pflege, Hauswirtschaft und Nachtwachen in den Regionen Thun & Bern. Alle Krankenkassen anerkannt." },
      { property: "og:title", content: "Tarife & Finanzierung — Riviera Med" },
      { property: "og:description", content: "Transparente Preise für Pflege zu Hause." },
    ],
  }),
  loader: async (): Promise<CmsData | null> => {
    try { return await sanityClient.fetch<CmsData>(tarifeQuery) } catch { return null }
  },
  component: TarifePage,
});

const DEFAULT_PFLEGE: Row[] = [
  { label: "Abklärung & Beratung (Art. 7a KLV)", unit: "pro Stunde", price: "CHF 76.90", note: "Krankenkasse" },
  { label: "Untersuchung & Behandlung (Art. 7b KLV)", unit: "pro Stunde", price: "CHF 63.00", note: "Krankenkasse" },
  { label: "Grundpflege (Art. 7c KLV)", unit: "pro Stunde", price: "CHF 52.60", note: "Krankenkasse" },
  { label: "Patientenbeteiligung", unit: "pro Tag (max.)", price: "CHF 15.35", note: "gesetzlich" },
];
const DEFAULT_HAUSHALT: Row[] = [
  { label: "Hauswirtschaft", unit: "pro Stunde", price: "CHF 55.00", note: "Selbstzahlung" },
  { label: "Betreuung / Begleitung", unit: "pro Stunde", price: "CHF 55.00", note: "Selbstzahlung" },
  { label: "Wegpauschale", unit: "pro Besuch", price: "CHF 7.00" },
];
const DEFAULT_NACHT: Row[] = [
  { label: "Präsenz-Nachtwache", unit: "8 h Nacht", price: "CHF 400.00" },
  { label: "Sitzwache", unit: "8 h Nacht", price: "CHF 420.00" },
  { label: "Diplomierte Nachtpflege", unit: "8 h Nacht", price: "CHF 460.00" },
];
const DEFAULT_FINANZIERUNG: FinItem[] = [
  { q: "Krankenkasse", a: "Alle Pflegeleistungen nach KLV (Art. 7a–c) werden von Ihrer Krankenkasse übernommen – unabhängig davon, bei welcher Sie versichert sind. Wir rechnen direkt mit Ihrer Kasse ab." },
  { q: "Kanton Bern / GSI", a: "Der Kanton Bern beteiligt sich an den Pflegekosten. Dadurch bleibt Ihre Patientenbeteiligung auf maximal CHF 15.35 pro Pflegetag begrenzt." },
  { q: "Patientenbeteiligung", a: "Gesetzlich vorgeschrieben: max. CHF 15.35 pro Tag an Pflegeleistungen. Die Franchise und der Selbstbehalt Ihrer Grundversicherung kommen dazu." },
];

function TableComp({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full text-left text-[16px]">
        <thead className="bg-surface-alt">
          <tr>
            <th className="px-5 py-3.5 font-semibold text-foreground/70 text-[14px] uppercase tracking-wider">Leistung</th>
            <th className="px-5 py-3.5 font-semibold text-foreground/70 text-[14px] uppercase tracking-wider hidden sm:table-cell">Einheit</th>
            <th className="px-5 py-3.5 font-semibold text-foreground/70 text-[14px] uppercase tracking-wider text-right">Preis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="px-5 py-4 align-top">
                <div className="font-medium text-[oklch(0.24_0.005_100)]">{r.label}</div>
                {r.note && <div className="text-[13px] text-muted-foreground mt-0.5">{r.note}</div>}
                <div className="text-[13px] text-muted-foreground mt-0.5 sm:hidden">{r.unit}</div>
              </td>
              <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">{r.unit}</td>
              <td className="px-5 py-4 text-right font-semibold tabular-nums whitespace-nowrap">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TarifePage() {
  const cms = Route.useLoaderData() ?? {};

  const eyebrow = cms.eyebrow ?? "Tarife & Finanzierung";
  const heading = cms.heading ?? "Transparente Preise. Ohne Überraschungen.";
  const subtext = cms.subtext ?? "Pflegeleistungen werden über alle Schweizer Krankenkassen abgerechnet. Hauswirtschaft und Betreuung erbringen wir als Selbstzahlerleistung zu fairen Tarifen.";

  const pflegeHeading = cms.pflegeHeading ?? "Pflegeleistungen (KLV)";
  const pflegeSubtext = cms.pflegeSubtext ?? "Von der Krankenkasse übernommen. Es bleibt die gesetzliche Patientenbeteiligung von maximal CHF 15.35 pro Tag.";
  const pflegeRows = cms.pflegeRows?.length ? cms.pflegeRows : DEFAULT_PFLEGE;

  const haushaltsHeading = cms.haushaltsHeading ?? "Hauswirtschaft & Betreuung";
  const haushaltsSubtext = cms.haushaltsSubtext ?? "Selbstzahlerleistungen. Keine Grundgebühr, keine Mindestabnahme. Abrechnung im 15-Minuten-Takt.";
  const haushaltsRows = cms.haushaltsRows?.length ? cms.haushaltsRows : DEFAULT_HAUSHALT;

  const nachtHeading = cms.nachtHeading ?? "Nachtwachen";
  const nachtSubtext = cms.nachtSubtext ?? "Ruhige Nächte für Sie und Ihre Angehörigen. Pauschaltarife für eine ganze Nacht (22:00 – 06:00 Uhr).";
  const nachtRows = cms.nachtRows?.length ? cms.nachtRows : DEFAULT_NACHT;

  const finanzierungHeading = cms.finanzierungHeading ?? "Finanzierung";
  const finanzierungItems = cms.finanzierungItems?.length ? cms.finanzierungItems : DEFAULT_FINANZIERUNG;

  const ctaHeading = cms.ctaHeading ?? "Fragen zu den Tarifen?";
  const ctaSubtext = cms.ctaSubtext ?? "Wir erstellen Ihnen gerne eine unverbindliche Offerte.";

  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="rm-container max-w-3xl">
          <p className="rm-eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">{heading}</h1>
          <p className="mt-5 text-[19px] leading-relaxed text-foreground/80">{subtext}</p>
        </div>
      </section>

      <nav className="sticky top-[88px] z-30 border-y border-border bg-surface/90 backdrop-blur">
        <div className="rm-container flex gap-2 overflow-x-auto py-3 text-[15px]">
          {[["pflege", "Pflegeleistungen"], ["haushalt", "Hauswirtschaft"], ["nacht", "Nachtwachen"], ["finanzierung", "Finanzierung"]].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollToId(e, id)}
              className="shrink-0 px-4 py-2 rounded-md text-foreground/75 hover:bg-surface-alt hover:text-primary font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="pflege" className="py-14 md:py-20 scroll-mt-[160px]">
        <div className="rm-container space-y-16">
          <div>
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">{pflegeHeading}</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">{pflegeSubtext}</p>
            <TableComp rows={pflegeRows} />
          </div>
          <div id="haushalt" className="scroll-mt-[160px]">
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">{haushaltsHeading}</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">{haushaltsSubtext}</p>
            <TableComp rows={haushaltsRows} />
          </div>
          <div id="nacht" className="scroll-mt-[160px]">
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">{nachtHeading}</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">{nachtSubtext}</p>
            <TableComp rows={nachtRows} />
          </div>
        </div>
      </section>

      <section id="finanzierung" className="py-14 md:py-20 bg-surface-alt scroll-mt-[160px]">
        <div className="rm-container max-w-3xl">
          <h2 className="text-[26px] md:text-[32px] font-semibold mb-6">{finanzierungHeading}</h2>
          <div className="divide-y divide-border border-y border-border">
            {finanzierungItems.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                  <h3 className="text-[18px] font-semibold pr-4">{f.q}</h3>
                  <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary group-open:bg-primary group-open:text-primary-foreground group-open:border-primary transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-open:rotate-45 transition-transform">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-[17px] leading-relaxed text-foreground/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="rm-container">
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-semibold">{ctaHeading}</h2>
              <p className="mt-2 text-foreground/75">{ctaSubtext}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phoneTel}`} className="inline-flex h-[52px] items-center px-6 rounded-md border border-border font-medium hover:bg-surface-alt">☎ {CONTACT.phone}</a>
              <Link to="/kontakt" className="inline-flex h-[52px] items-center px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover">Jetzt anmelden →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
