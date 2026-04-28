import { createFileRoute } from "@tanstack/react-router";
import { PricingCalculator } from "@/features/pricing-calculator/PricingCalculator";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tarife")({
  head: () => ({
    meta: [
      { title: "Tarife & Finanzierung — Riviera Med" },
      {
        name: "description",
        content:
          "Transparente Tarife für Pflege, Hauswirtschaft und Nachtwachen in den Regionen Thun & Bern. Interaktiver Kostenrechner. Alle Krankenkassen anerkannt.",
      },
      { property: "og:title", content: "Tarife & Finanzierung — Riviera Med" },
      { property: "og:description", content: "Transparente Preise und Kostenrechner für Pflege zu Hause." },
    ],
  }),
  component: TarifePage,
});

type Row = { label: string; unit: string; price: string; note?: string };

const pflege: Row[] = [
  { label: "Abklärung & Beratung (Art. 7a KLV)", unit: "pro Stunde", price: "CHF 79.80", note: "Krankenkasse" },
  { label: "Untersuchung & Behandlung (Art. 7b KLV)", unit: "pro Stunde", price: "CHF 65.40", note: "Krankenkasse" },
  { label: "Grundpflege (Art. 7c KLV)", unit: "pro Stunde", price: "CHF 54.60", note: "Krankenkasse" },
  { label: "Patientenbeteiligung", unit: "pro Tag (max.)", price: "CHF 15.35", note: "gesetzlich" },
];

const haushalt: Row[] = [
  { label: "Hauswirtschaft", unit: "pro Stunde", price: "CHF 55.00", note: "Selbstzahlung" },
  { label: "Betreuung / Begleitung", unit: "pro Stunde", price: "CHF 55.00", note: "Selbstzahlung" },
  { label: "Wegpauschale", unit: "pro Besuch", price: "CHF 7.00" },
  { label: "Einsätze Wochenende", unit: "Zuschlag", price: "+15 %" },
  { label: "Einsätze nachts (22–06)", unit: "Zuschlag", price: "+25 %" },
];

const nacht: Row[] = [
  { label: "Präsenz-Nachtwache", unit: "8 h Nacht", price: "CHF 400.00" },
  { label: "Sitzwache", unit: "8 h Nacht", price: "CHF 420.00" },
  { label: "Diplomierte Nachtpflege", unit: "8 h Nacht", price: "CHF 460.00" },
];

function Table({ rows }: { rows: Row[] }) {
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
  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="rm-container max-w-3xl">
          <p className="rm-eyebrow mb-5">Tarife & Finanzierung</p>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">
            Transparente Preise. Ohne Überraschungen.
          </h1>
          <p className="mt-5 text-[19px] leading-relaxed text-foreground/80">
            Pflegeleistungen werden über alle Schweizer Krankenkassen abgerechnet.
            Hauswirtschaft und Betreuung erbringen wir als Selbstzahlerleistung zu fairen Tarifen.
          </p>
        </div>
      </section>

      {/* Sticky section nav */}
      <nav className="sticky top-[72px] z-30 border-y border-border bg-surface/90 backdrop-blur">
        <div className="rm-container flex gap-2 overflow-x-auto py-3 text-[15px]">
          {[
            ["#rechner", "Kostenrechner"],
            ["#pflege", "Pflegeleistungen"],
            ["#haushalt", "Hauswirtschaft"],
            ["#nacht", "Nachtwachen"],
            ["#finanzierung", "Finanzierung"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 px-4 py-2 rounded-md text-foreground/75 hover:bg-surface-alt hover:text-primary font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Calculator */}
      <section id="rechner" className="py-14 md:py-20 bg-surface-alt scroll-mt-[144px]">
        <div className="rm-container">
          <div className="max-w-2xl mb-10">
            <p className="rm-eyebrow mb-4">Interaktiv</p>
            <h2 className="text-[30px] md:text-[40px] font-semibold leading-tight">
              Ihre Kosten – auf einen Blick.
            </h2>
            <p className="mt-4 text-[17px] text-foreground/75">
              Wählen Sie die gewünschten Leistungen und Stunden. Der Rechner zeigt eine Schätzung Ihrer
              monatlichen Kosten und was die Krankenkasse übernimmt.
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      {/* Tariff tables */}
      <section id="pflege" className="py-14 md:py-20 scroll-mt-[144px]">
        <div className="rm-container space-y-16">
          <div>
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">Pflegeleistungen (KLV)</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">
              Von der Krankenkasse übernommen. Es bleibt die gesetzliche Patientenbeteiligung von maximal CHF 15.35 pro Tag.
            </p>
            <Table rows={pflege} />
          </div>

          <div id="haushalt" className="scroll-mt-[144px]">
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">Hauswirtschaft & Betreuung</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">
              Selbstzahlerleistungen. Keine Grundgebühr, keine Mindestabnahme. Abrechnung im 15-Minuten-Takt.
            </p>
            <Table rows={haushalt} />
          </div>

          <div id="nacht" className="scroll-mt-[144px]">
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-2">Nachtwachen</h2>
            <p className="text-foreground/75 mb-6 max-w-2xl">
              Ruhige Nächte für Sie und Ihre Angehörigen. Pauschaltarife für eine ganze Nacht (22:00 – 06:00 Uhr).
            </p>
            <Table rows={nacht} />
          </div>
        </div>
      </section>

      {/* Financing accordion */}
      <section id="finanzierung" className="py-14 md:py-20 bg-surface-alt scroll-mt-[144px]">
        <div className="rm-container max-w-3xl">
          <h2 className="text-[26px] md:text-[32px] font-semibold mb-6">Finanzierung</h2>
          <div className="divide-y divide-border border-y border-border">
            {[
              {
                q: "Krankenkasse",
                a: "Alle Pflegeleistungen nach KLV (Art. 7a–c) werden von Ihrer Krankenkasse übernommen – unabhängig davon, bei welcher Sie versichert sind. Wir rechnen direkt mit Ihrer Kasse ab.",
              },
              {
                q: "Kanton Bern / GSI",
                a: "Der Kanton Bern beteiligt sich an den Pflegekosten. Dadurch bleibt Ihre Patientenbeteiligung auf maximal CHF 15.35 pro Pflegetag begrenzt.",
              },
              {
                q: "Patientenbeteiligung",
                a: "Gesetzlich vorgeschrieben: max. CHF 15.35 pro Tag an Pflegeleistungen. Die Franchise und der Selbstbehalt Ihrer Grundversicherung kommen dazu.",
              },
              {
                q: "Ergänzungsleistungen (EL)",
                a: "Wenn Rente und Vermögen nicht ausreichen, können Ergänzungsleistungen beantragt werden. Wir beraten Sie gerne und helfen bei der Antragstellung.",
              },
            ].map((f) => (
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
              <h2 className="text-[24px] md:text-[28px] font-semibold">Fragen zu den Tarifen?</h2>
              <p className="mt-2 text-foreground/75">Wir erstellen Ihnen gerne eine unverbindliche Offerte.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+41792375521"
                className="inline-flex h-[52px] items-center px-6 rounded-md border border-border font-medium hover:bg-surface-alt"
              >
                ☎ 079 237 55 21
              </a>
              <Link
                to="/kontakt"
                className="inline-flex h-[52px] items-center px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover"
              >
                Erstgespräch vereinbaren →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
