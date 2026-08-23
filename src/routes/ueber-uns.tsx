import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { sanityClient, ueberUnsQuery } from "@/lib/sanity";

type CmsMember = { name: string; role: string; bio?: string[] }
type CmsData = {
  eyebrow?: string; heading?: string; subtext?: string
  stats?: { number: string; label: string }[]
  teamEyebrow?: string; teamHeading?: string; teamSubtext?: string
  team?: CmsMember[]
}

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Riviera Med" },
      { name: "description", content: "Das Team hinter Riviera Med – Ihre Spitex in den Regionen Thun & Bern." },
    ],
  }),
  loader: async (): Promise<CmsData | null> => {
    try { return await sanityClient.fetch<CmsData>(ueberUnsQuery) } catch { return null }
  },
  component: UeberUnsPage,
});

const DEFAULT_STATS = [
  { number: "24/7", label: "Erreichbar" },
  { number: "100%", label: "Krankenkassen" },
];

const DEFAULT_TEAM: CmsMember[] = [
  { name: "Florjan Mislimi", role: "Geschäftsführer · Fachmann Gesundheit EFZ" },
  { name: "Muad Amiin", role: "Geschäftsführer · Dipl. Pflegefachmann HF" },
  { name: "Lenell Brown", role: "Betriebsleiter · Fachmann Gesundheit EFZ" },
  { name: "Dayana Romero", role: "Fachfrau Gesundheit" },
  { name: "Sara Boss", role: "Fachfrau Gesundheit" },
];

/** Initialen für das Namens-Monogramm (solange keine Porträts hinterlegt sind) */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function UeberUnsPage() {
  const cms = Route.useLoaderData() ?? {};

  const eyebrow = cms.eyebrow ?? "Über uns";
  const heading = cms.heading ?? "Menschen, die sich kümmern.";
  const subtext = cms.subtext ?? "Riviera Med ist eine Spitex-Organisation mit Sitz in Thun. Wir sind ein kleines, festes Team in Pflege und Betreuung. Unser Versprechen: Wir nehmen uns Zeit.";
  const stats = cms.stats?.length ? cms.stats : DEFAULT_STATS;

  const teamEyebrow = cms.teamEyebrow ?? "Unser Team";
  const teamHeading = cms.teamHeading ?? "Die Köpfe hinter Riviera Med.";
  const teamSubtext = cms.teamSubtext ?? "Ein gemeinsamer Anspruch: Pflege, die den Menschen in den Mittelpunkt stellt – kompetent, verlässlich und mit Herz.";
  const team = cms.team?.length ? cms.team : DEFAULT_TEAM;

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <p className="rm-eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">{heading}</h1>
          <p className="mt-5 text-[19px] text-foreground/80">{subtext}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 text-center sm:max-w-md">
            {stats.map(({ number, label }) => (
              <div key={label} className="bg-surface border border-border rounded-xl p-6 rm-lift">
                <div className="text-[36px] font-semibold text-primary tabular-nums whitespace-nowrap">{number}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <div className="rm-container">
          <Reveal>
            <p className="rm-eyebrow mb-4">{teamEyebrow}</p>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1] max-w-2xl">{teamHeading}</h2>
            <p className="mt-4 text-[17px] text-foreground/75 max-w-2xl">{teamSubtext}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <article className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-background p-6 rm-lift transition-all duration-300 hover:border-primary/40">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[17px] font-semibold tracking-wide text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    {initials(m.name)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-semibold tracking-tight">{m.name}</h3>
                    <p className="mt-0.5 text-[15px] leading-snug text-foreground/70">{m.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
