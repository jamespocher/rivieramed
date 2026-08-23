import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Home, Moon, Activity, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { sanityClient, leistungenQuery } from "@/lib/sanity";

type CmsData = {
  eyebrow?: string
  heading?: string
  subtext?: string
  ctaText?: string
  items?: { icon: string; title: string; text: string }[]
}

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen — Riviera Med" },
      { name: "description", content: "Pflege, Betreuung, Hauswirtschaft, Nachtwachen und Physiotherapie in den Regionen Thun & Bern." },
      { property: "og:title", content: "Leistungen — Riviera Med" },
      { property: "og:description", content: "Unsere Leistungen im Überblick." },
    ],
  }),
  loader: async (): Promise<CmsData | null> => {
    try { return await sanityClient.fetch<CmsData>(leistungenQuery) } catch { return null }
  },
  component: LeistungenPage,
});

const ICON_MAP: Record<string, LucideIcon> = { Heart, Home, Moon, Activity, Sparkles };

const DEFAULT_ITEMS = [
  { icon: Heart, title: "Pflege & Betreuung", text: "Medizinische Grund- und Behandlungspflege nach KLV. Wundversorgung, Medikamentenmanagement, Mobilisation." },
  { icon: Home, title: "Hauswirtschaft", text: "Einkaufen, Kochen, Reinigen, Wäsche – damit Sie zu Hause selbstständig bleiben." },
  { icon: Moon, title: "Nachtwachen", text: "Präsenz- und Sitzwachen, diplomierte Nachtpflege. Ruhige Nächte für alle." },
  { icon: Activity, title: "Physiotherapie", text: "Therapie zu Hause – nach Unfall, OP oder bei chronischen Beschwerden. Auf ärztliche Verordnung." },
];

function LeistungenPage() {
  const cms = Route.useLoaderData() ?? {};
  const eyebrow = cms.eyebrow ?? "Unsere Leistungen";
  const heading = cms.heading ?? "Ein Angebot, das sich Ihrem Leben anpasst.";
  const subtext = cms.subtext ?? "Von wenigen Stunden pro Woche bis zur 24-Stunden-Betreuung – wir stimmen unsere Einsätze auf Ihren Alltag ab.";
  const ctaText = cms.ctaText ?? "Unverbindlich anfragen";
  const items = cms.items?.length
    ? cms.items.map((it) => ({ icon: ICON_MAP[it.icon] ?? Heart, title: it.title, text: it.text }))
    : DEFAULT_ITEMS;

  return (
    <section className="py-16 md:py-24">
      <div className="rm-container max-w-5xl">
        <p className="rm-eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">{heading}</h1>
        <p className="mt-5 text-[19px] text-foreground/80 max-w-2xl">{subtext}</p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <article className="group bg-surface border border-border rounded-2xl p-7 rm-lift hover:border-primary/40 h-full">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <it.icon className="h-7 w-7" aria-hidden />
                </span>
                <h2 className="text-[22px] font-semibold mb-2">{it.title}</h2>
                <p className="text-foreground/75 leading-relaxed">{it.text}</p>
                <Link to="/kontakt" className="mt-5 inline-flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Anfragen <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Link to="/kontakt" className="group inline-flex h-[56px] items-center gap-2 px-7 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-all hover:-translate-y-0.5 hover:shadow-lift">
            {ctaText}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
