import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import teamMuad from "@/assets/team-muad.png";
import teamFlorjan from "@/assets/team-florjan.png";
import teamLenell from "@/assets/team-lenell.png";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Riviera Med" },
      {
        name: "description",
        content:
          "Das Team hinter Riviera Med – Ihre Private Spitex in den Regionen Thun & Bern. Lernen Sie Muad Amiin, Florjan Mislimi und Lenell Brown kennen.",
      },
    ],
  }),
  component: UeberUnsPage,
});

type Member = {
  name: string;
  role: string;
  image: string;
  bio: string[];
};

const team: Member[] = [
  {
    name: "Muad Amiin",
    role: "Geschäftsführer · CEO",
    image: teamMuad,
    bio: [
      "Mit langjähriger Erfahrung in der Pflege steht Muad für Qualität, Vertrauen und Menschlichkeit.",
      "Sein Anspruch: gemeinsam mit dem Team eine individuelle Betreuung auf höchstem Niveau bieten – für mehr Sicherheit, Autonomie und Wohlbefinden im Alltag unserer Klientinnen und Klienten.",
    ],
  },
  {
    name: "Florjan Mislimi",
    role: "Geschäftsführer · CEO",
    image: teamFlorjan,
    bio: [
      "Über fünf Jahre Spitex-Erfahrung und vertiefte Kenntnisse in der Akutgeriatrie – Florjan übt seinen Beruf mit Leidenschaft und Herz aus.",
      "Als erfahrener Teamleiter hat er interdisziplinäre Pflegeteams geführt und Prozesse so gestaltet, dass die bestmögliche Betreuung der Klientinnen und Klienten gesichert ist. Qualität, Professionalität und Menschlichkeit stehen für ihn stets im Mittelpunkt.",
    ],
  },
  {
    name: "Lenell Brown",
    role: "Betriebsleiter · COO",
    image: teamLenell,
    bio: [
      "Über zehn Jahre Erfahrung im Pflegebereich, ergänzt durch eine höhere Kaderausbildung der Armee mit Schwerpunkt Psychologie.",
      "Dazu vierzehn Jahre im Firmenkundengeschäft einer Bank sowie langjährige HR-Verantwortung in einer internationalen Künstlerorganisation – mit sechs Jahren operativer Führung in über zwanzig Ländern. Diese Breite macht Lenell zum Rückgrat unserer Organisation.",
    ],
  },
];

function UeberUnsPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <p className="rm-eyebrow mb-5">Über uns</p>
          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">
            Menschen, die sich kümmern.
          </h1>
          <p className="mt-5 text-[19px] text-foreground/80">
            Riviera Med ist eine private Spitex-Organisation mit Sitz in Thun. Wir sind ein kleines,
            festes Team mit langjähriger Erfahrung in Pflege und Betreuung. Unser Versprechen: Wir
            nehmen uns Zeit.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ["15+", "Jahre Erfahrung"],
              ["24/7", "Erreichbar"],
              ["5+", "Gemeinden"],
              ["100%", "Krankenkassen"],
            ].map(([n, l]) => (
              <div key={l} className="bg-surface border border-border rounded-xl p-6 rm-lift">
                <div className="text-[36px] font-semibold text-primary tabular-nums whitespace-nowrap">{n}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-surface border-y border-border">
        <div className="rm-container">
          <Reveal>
            <p className="rm-eyebrow mb-4">Unser Team</p>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1] max-w-2xl">
              Die Köpfe hinter Riviera Med.
            </h2>
            <p className="mt-4 text-[17px] text-foreground/75 max-w-2xl">
              Drei Persönlichkeiten, ein gemeinsamer Anspruch: Pflege, die den Menschen in den
              Mittelpunkt stellt – kompetent, verlässlich und mit Herz.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <article className="group h-full rounded-2xl border border-border bg-background overflow-hidden rm-lift transition-all duration-300 hover:border-primary/40">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={m.image}
                      alt={`Porträt von ${m.name}, ${m.role}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-semibold tracking-tight text-white drop-shadow-md">{m.name}</h3>
                      <p className="text-sm text-white/90 drop-shadow">{m.role}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {m.bio.map((p, idx) => (
                      <p key={idx} className="text-[15px] leading-relaxed text-foreground/80">
                        {p}
                      </p>
                    ))}
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
