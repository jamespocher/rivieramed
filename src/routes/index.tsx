import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Home, Moon, Activity, Sparkles, Phone, ArrowRight, type LucideIcon } from "lucide-react";
import heroImage from "@/assets/headline-foto.jpg";
import livingRoom from "@/assets/vertrauen.jpg";
import landscape from "@/assets/thunersee.jpg";
import { Reveal } from "@/components/site/Reveal";
import { AnmeldeFormular } from "@/components/site/AnmeldeFormular";
import { CONTACT } from "@/lib/contact";
import { scrollToId } from "@/lib/scroll-to";
import { sanityClient, homepageQuery, type HomepageData } from "@/lib/sanity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riviera Med — Spitex in der Region Thun & Bern" },
      {
        name: "description",
        content:
          "Pflege und Betreuung zu Hause in Thun und Umgebung. Kompetent, herzlich, rund um die Uhr. Alle Krankenkassen anerkannt. Erstgespräch kostenlos.",
      },
      { property: "og:title", content: "Riviera Med — Spitex in der Region Thun & Bern" },
      {
        property: "og:description",
        content: "Pflege und Betreuung zu Hause. Herzlich, kompetent, 24/7 in der Region Thun & Bern.",
      },
    ],
  }),
  loader: async (): Promise<HomepageData | null> => {
    try {
      return await sanityClient.fetch<HomepageData>(homepageQuery)
    } catch {
      return null
    }
  },
  component: HomePage,
});

// ── Icon-Mapping: Sanity-String → Lucide-Komponente ─────────────────
const ICON_MAP: Record<string, LucideIcon> = { Heart, Home, Moon, Activity, Sparkles };

// ── Fallback-Daten (aktiv solange kein Sanity-Dokument existiert) ────
const DEFAULT_SERVICES = [
  { icon: Heart, title: "Pflege & Betreuung", description: "Medizinische Grund- und Behandlungspflege nach KLV. Wundversorgung, Medikamente, Mobilisation – alles über Ihre Krankenkasse abgerechnet." },
  { icon: Home, title: "Hauswirtschaft", description: "Einkaufen, Kochen, Reinigen, Wäsche. Damit Sie sich zu Hause weiterhin wohlfühlen – unabhängig und in Ihrem eigenen Rhythmus." },
  { icon: Moon, title: "Nachtwachen", description: "Präsenz- und Sitzwachen sowie diplomierte Nachtpflege. Sie und Ihre Angehörigen können beruhigt schlafen." },
  { icon: Activity, title: "Physiotherapie", description: "Gezielte Therapie bei Ihnen zu Hause. Nach Unfall, Operation oder bei chronischen Beschwerden – auf Verordnung Ihres Arztes." },
  { icon: Sparkles, title: "Entlastung für Angehörige", description: "Kurzeinsätze, Ferienvertretung, Begleitung zu Arztterminen. Damit pflegende Angehörige auch einmal durchatmen können." },
  { icon: Heart, title: "Beratung & Abklärung", description: "Unverbindliches Erstgespräch bei Ihnen zu Hause. Wir erstellen gemeinsam mit Ihnen einen Plan – individuell und ehrlich." },
];

// Vertrauenspunkte – identisch im Hero und in der Leiste darunter
const TRUST_POINTS = ["Thun & Bern", "Alle Krankenkassen anerkannt"];

const DEFAULT_WHY_BULLETS = [
  { title: "Kleines festes Team", description: "Sie lernen uns persönlich kennen – ohne wechselndes Personal." },
  { title: "Transparente Preise", description: "Keine versteckten Kosten, Abrechnung im 15-Minuten-Takt." },
  { title: "Flexibel im Alltag", description: "Einsätze passen sich Ihrem Rhythmus an – nicht umgekehrt." },
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Mein Vater wollte um keinen Preis ins Heim. Riviera Med hat es möglich gemacht, dass er in seiner gewohnten Umgebung bleiben kann. Die Pflegerinnen sind einfühlsam und zuverlässig.", author: "Sandra M.", role: "Tochter", location: "Hilterfingen" },
  { quote: "Nach meiner Hüftoperation brauchte ich jeden Tag Unterstützung. Das Team war stets pünktlich, freundlich und sehr professionell. Ich fühlte mich in besten Händen.", author: "Heinz R.", role: "Klient, 78", location: "Thun" },
  { quote: "Die transparente Preisgestaltung und die ehrliche Beratung haben uns sofort überzeugt. Keine versteckten Kosten, klare Kommunikation – so muss es sein.", author: "Margrit H.", role: "Ehefrau", location: "Spiez" },
];

const DEFAULT_FAQS = [
  { q: "Übernimmt die Krankenkasse die Kosten?", a: "Ja. Pflegeleistungen nach KLV (Krankenpflege-Leistungsverordnung) werden von allen Schweizer Krankenkassen übernommen – unabhängig von Ihrer Kasse. Es bleibt lediglich die gesetzliche Patientenbeteiligung von maximal CHF 15.35 pro Tag." },
  { q: "Wie schnell können Sie starten?", a: "In dringenden Fällen innerhalb von 24 bis 48 Stunden. Für geplante Einsätze vereinbaren wir gerne ein unverbindliches Erstgespräch, meist innerhalb einer Woche." },
  { q: "Was kostet ein Erstgespräch?", a: "Das Erstgespräch bei Ihnen zu Hause ist kostenlos und unverbindlich. Wir nehmen uns Zeit, Ihre Situation kennenzulernen und gemeinsam die passende Unterstützung zu planen." },
  { q: "Welche Regionen bedienen Sie?", a: "Wir sind in ganz Thun, Bern und im Berner Oberland verfügbar." },
  { q: "Sind Sie auch nachts und am Wochenende da?", a: "Ja. Wir sind 24 Stunden am Tag, 365 Tage im Jahr erreichbar. Nachtwachen, Wochenend- und Feiertagsdienste sind ein fester Teil unseres Angebots." },
  { q: "Wer kommt zu uns nach Hause?", a: "Sie werden von einem kleinen, festen Team betreut, das Sie persönlich kennenlernen. Das schafft Vertrauen und Kontinuität – besonders wichtig bei Pflege und Betreuung." },
];

function HomePage() {
  const cms = Route.useLoaderData() ?? {};

  // Sektion-Daten: CMS-Wert wenn vorhanden, sonst Fallback
  const heroEyebrow = cms.heroEyebrow ?? "Spitex · Region Thun & Bern";
  const heroHeading = cms.heroHeading ?? "Pflege zu Hause.";
  const heroHeadingAccent = cms.heroHeadingAccent ?? "Mit Herz.";
  const heroSubtext = cms.heroSubtext ?? "Bedarfsgerechte Pflege und Betreuung – kompetent, herzlich und rund um die Uhr in den Regionen Thun, Bern und im Berner Oberland.";
  const heroCtaText = cms.heroCtaText ?? "Erstgespräch vereinbaren";
  const heroTrustBadges = cms.heroTrustBadges ?? TRUST_POINTS;
  const heroTrustCardQuote = cms.heroTrustCardQuote ?? "Ein kleines Team, das Zeit hat und wirklich zuhört.";
  const heroTrustCardAttribution = cms.heroTrustCardAttribution ?? "Margrit H. · Spiez";

  const servicesEyebrow = cms.servicesEyebrow ?? "Unsere Leistungen";
  const servicesHeading = cms.servicesHeading ?? "Ein Angebot, das sich Ihrem Leben anpasst.";
  const servicesSubtext = cms.servicesSubtext ?? "Von wenigen Stunden die Woche bis zur 24-Stunden-Betreuung – wir gestalten Ihre Unterstützung gemeinsam mit Ihnen.";
  const services = cms.services?.length
    ? cms.services.map((s) => ({ icon: ICON_MAP[s.icon] ?? Heart, title: s.title, description: s.description }))
    : DEFAULT_SERVICES;

  const whyEyebrow = cms.whyEyebrow ?? "Warum Riviera Med";
  const whyHeading = cms.whyHeading ?? "Zeit. Vertrauen.";
  const whyHeadingAccent = cms.whyHeadingAccent ?? "Kontinuität.";
  const whySubtext = cms.whySubtext ?? "Wir sind ein kleines, festes Team. Das bedeutet: Sie sehen immer bekannte Gesichter, und wir nehmen uns die Zeit, die es braucht.";
  const whyBullets = cms.whyBullets?.length ? cms.whyBullets : DEFAULT_WHY_BULLETS;

  const landscapeEyebrow = cms.landscapeEyebrow ?? "Zu Hause in der Region Thun und Bern";
  const landscapeHeading = cms.landscapeHeading ?? "Dort, wo Sie zu Hause sind – sind wir auch.";

  const testimonialsEyebrow = cms.testimonialsEyebrow ?? "Stimmen aus der Region";
  const testimonialsHeading = cms.testimonialsHeading ?? "Was Familien über uns sagen.";
  const testimonials = cms.testimonials?.length ? cms.testimonials : DEFAULT_TESTIMONIALS;

  const faqEyebrow = cms.faqEyebrow ?? "Häufige Fragen";
  const faqHeading = cms.faqHeading ?? "Was Sie wissen möchten.";
  const faqs = cms.faqs?.length
    ? cms.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;

  const ctaHeading = cms.ctaHeading ?? "Sind wir die Richtigen für Ihre Familie?";
  const ctaSubtext = cms.ctaSubtext ?? "Lassen Sie uns unverbindlich darüber sprechen. Ein Erstgespräch bei Ihnen zu Hause ist kostenlos.";
  const ctaButtonText = cms.ctaButtonText ?? "Erstgespräch vereinbaren";

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[calc(92vh-88px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="" aria-hidden className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(110deg, oklch(0.24 0.04 175 / 0.82) 0%, oklch(0.28 0.04 175 / 0.65) 45%, oklch(0.30 0.04 175 / 0.35) 100%)" }}
          />
          <div className="absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl rm-float" />
          <div className="absolute bottom-10 -left-16 h-[300px] w-[300px] rounded-full bg-primary/40 blur-3xl" />
        </div>

        <div className="rm-container pt-20 pb-24 md:pt-28 md:pb-32 w-full">
          <div className="max-w-3xl text-white">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.16em] uppercase text-accent mb-6">
                <span className="h-px w-8 bg-accent" />
                {heroEyebrow}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-semibold tracking-tight leading-[1.02] text-white">
                {heroHeading}<br />
                <span className="text-accent">{heroHeadingAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-7 text-[19px] md:text-[22px] leading-relaxed text-white/85 max-w-[620px]">
                {heroSubtext}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#anmeldung"
                  onClick={(e) => scrollToId(e, "anmeldung")}
                  className="group inline-flex h-[58px] items-center gap-2 px-7 rounded-md bg-accent text-accent-foreground text-[17px] font-semibold hover:bg-accent/90 transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  {heroCtaText}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="inline-flex h-[58px] items-center gap-2 px-7 rounded-md border border-white/30 bg-white/5 backdrop-blur text-white text-[17px] font-medium hover:bg-white/15 transition-all"
                >
                  <Phone className="h-5 w-5" />
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-white/85 max-w-xl">
                {heroTrustBadges.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/25 text-accent shrink-0">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Floating trust card */}
        <Reveal delay={600} variant="right" className="hidden lg:block absolute right-8 xl:right-16 bottom-24 z-10">
          <div className="bg-surface/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-lift px-6 py-5 max-w-[280px]">
            <div className="flex items-center gap-0.5 text-accent">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="text-[18px]">★</span>
              ))}
              <span className="relative inline-block text-[18px]">
                <span className="text-foreground/20">★</span>
                <span className="absolute inset-0 overflow-hidden w-[50%] text-accent">★</span>
              </span>
              <span className="ml-1 text-[13px] font-semibold text-foreground/60">4.5</span>
            </div>
            <p className="mt-2 text-[15px] font-semibold text-[oklch(0.24_0.005_100)]">
              «{heroTrustCardQuote}»
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{heroTrustCardAttribution}</p>
          </div>
        </Reveal>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="py-8 border-y border-border bg-surface">
        <div className="rm-container">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[14px] font-medium text-muted-foreground uppercase tracking-[0.14em]">
            {TRUST_POINTS.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" aria-hidden />
        <div className="rm-container relative">
          <div className="max-w-2xl mb-14">
            <Reveal>
              <p className="rm-eyebrow mb-4">{servicesEyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[32px] md:text-[48px] font-semibold leading-[1.1]">
                {servicesHeading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-[18px] text-foreground/75 leading-relaxed">{servicesSubtext}</p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="group relative bg-surface border border-border rounded-2xl p-7 rm-lift h-full hover:border-primary/40 overflow-hidden">
                  <span className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <s.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="text-[22px] font-semibold mb-2.5">{s.title}</h3>
                  <p className="text-[16px] leading-relaxed text-foreground/75">{s.description}</p>
                  <Link to="/leistungen" className="mt-5 inline-flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Mehr erfahren <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMAGE + TEXT SPLIT ==================== */}
      <section className="py-20 md:py-28">
        <div className="rm-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <Reveal variant="left">
              <div className="rm-zoom relative rounded-2xl overflow-hidden shadow-card border border-border aspect-[5/4]">
                <img
                  src={livingRoom}
                  alt="Pflegerin und Klientin im hellen Wohnzimmer"
                  className="h-full w-full object-cover rm-zoom-img"
                  loading="lazy"
                  width={1280}
                  height={896}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <p className="rm-eyebrow mb-4">{whyEyebrow}</p>
              <h2 className="text-[32px] md:text-[44px] font-semibold leading-[1.1]">
                {whyHeading}<br /><span className="text-primary">{whyHeadingAccent}</span>
              </h2>
              <p className="mt-5 text-[18px] text-foreground/75 leading-relaxed">{whySubtext}</p>
              <ul className="mt-8 space-y-4">
                {whyBullets.map(({ title, description }) => (
                  <li key={title} className="flex gap-4">
                    <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="font-semibold text-[17px] text-[oklch(0.24_0.005_100)]">{title}</p>
                      <p className="text-foreground/70">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== LANDSCAPE PARALLAX BAND ==================== */}
      <section
        className="relative flex items-center justify-center min-h-[340px] md:min-h-[420px] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, oklch(0.24 0.04 175 / 0.75), oklch(0.30 0.04 175 / 0.75)), url(${landscape})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="rm-container relative text-white text-center max-w-2xl py-16">
          <Reveal>
            <p className="text-accent font-semibold tracking-[0.18em] uppercase text-[13px] mb-5">
              {landscapeEyebrow}
            </p>
            <h2 className="text-[34px] md:text-[52px] font-semibold leading-[1.1] text-white">
              {landscapeHeading}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 md:py-28 bg-surface-alt">
        <div className="rm-container">
          <div className="max-w-2xl mb-14">
            <Reveal>
              <p className="rm-eyebrow mb-4">{testimonialsEyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[32px] md:text-[44px] font-semibold leading-tight">
                {testimonialsHeading}
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 120}>
                <figure className="group relative bg-surface border border-border rounded-2xl p-8 flex flex-col h-full rm-lift overflow-hidden">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" aria-hidden />
                  <svg className="h-9 w-9 text-accent mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.34A1.83 1.83 0 0 1 7.17 9.34zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83h-3.49A1.83 1.83 0 0 1 17.17 9.34z" />
                  </svg>
                  <blockquote className="text-[17px] leading-relaxed text-foreground/85 flex-1">«{t.quote}»</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-border">
                    <p className="font-semibold text-[oklch(0.24_0.005_100)]">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role} · {t.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="py-14 bg-surface border-y border-border overflow-hidden">
        <p className="text-center text-[13px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-10">
          Vernetzt mit der Region
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-surface to-transparent" />
          <div className="rm-ticker-track">
            {[
              { src: "/logos/spitalthun-logo.png",        alt: "Spital Thun",      href: "https://www.spitalthun.ch/" },
              { src: "/logos/GSI-logo.png",               alt: "GSI Kanton Bern",  href: "https://www.gsi.be.ch" },
              { src: "/logos/ASPS-logo.avif",             alt: "ASPS",             href: "https://spitexprivee.swiss/de/" },
              { src: "/logos/Rückenzentrum-logo.png",     alt: "Rückenzentrum",    href: "https://www.dasrueckenzentrum.ch/" },
              { src: "/logos/agentur-scherrer-logo.jpg",  alt: "Agentur Scherrer", href: "http://www.agentur-scherrer.ch/" },
              { src: "/logos/central-apotheke-logo.png",  alt: "Central Apotheke", href: "https://centralapotheke-thun.ch/" },
              { src: "/logos/probstoptik-logo.png",       alt: "Probst",           href: "https://www.probst.ch/" },
              { src: "/logos/rshilfsmittel-logo.png",     alt: "RS Hilfsmittel",   href: "https://www.rs-hilfsmittel.ch/" },
              { src: "/logos/schlossapotheke-logo.jpeg",  alt: "Schloss Apotheke", href: "https://www.schlossapotheke.ch/" },
              { src: "/logos/spitalthun-logo.png",        alt: "Spital Thun",      href: "https://www.spitalthun.ch/" },
              { src: "/logos/GSI-logo.png",               alt: "GSI Kanton Bern",  href: "https://www.gsi.be.ch" },
              { src: "/logos/ASPS-logo.avif",             alt: "ASPS",             href: "https://spitexprivee.swiss/de/" },
              { src: "/logos/Rückenzentrum-logo.png",     alt: "Rückenzentrum",    href: "https://www.dasrueckenzentrum.ch/" },
              { src: "/logos/agentur-scherrer-logo.jpg",  alt: "Agentur Scherrer", href: "http://www.agentur-scherrer.ch/" },
              { src: "/logos/central-apotheke-logo.png",  alt: "Central Apotheke", href: "https://centralapotheke-thun.ch/" },
              { src: "/logos/probstoptik-logo.png",       alt: "Probst",           href: "https://www.probst.ch/" },
              { src: "/logos/rshilfsmittel-logo.png",     alt: "RS Hilfsmittel",   href: "https://www.rs-hilfsmittel.ch/" },
              { src: "/logos/schlossapotheke-logo.jpeg",  alt: "Schloss Apotheke", href: "https://www.schlossapotheke.ch/" },
            ].map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center mx-10 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300" aria-label={p.alt}>
                <img src={p.src} alt={p.alt} className="h-10 w-auto max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 md:py-28">
        <div className="rm-container max-w-3xl">
          <div className="mb-12 text-center">
            <Reveal>
              <p className="rm-eyebrow mb-4">{faqEyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[32px] md:text-[44px] font-semibold leading-tight">{faqHeading}</h2>
            </Reveal>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
                    <h3 className="text-[18px] md:text-[19px] font-semibold pr-4 group-hover:text-primary transition-colors">
                      {f.q}
                    </h3>
                    <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary group-open:bg-primary group-open:text-primary-foreground group-open:border-primary transition-all group-hover:border-primary">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-open:rotate-45 transition-transform duration-300">
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-[17px] leading-relaxed text-foreground/75">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-20 md:py-28">
        <div className="rm-container">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-8 md:px-14 py-16 md:py-20">
              <div className="absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l from-accent/30 to-transparent pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl rm-float" aria-hidden />
              <div className="relative max-w-2xl">
                <h2 className="text-[32px] md:text-[48px] font-semibold leading-[1.08] text-primary-foreground">
                  {ctaHeading}
                </h2>
                <p className="mt-5 text-[18px] md:text-[20px] text-primary-foreground/85 leading-relaxed">
                  {ctaSubtext}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#anmeldung"
                  onClick={(e) => scrollToId(e, "anmeldung")}
                    className="group inline-flex h-[58px] items-center gap-2 px-7 rounded-md bg-accent text-accent-foreground text-[17px] font-semibold hover:bg-accent/90 transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    {ctaButtonText}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    className="inline-flex h-[58px] items-center gap-2 px-7 rounded-md border border-primary-foreground/30 text-[17px] font-medium hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Phone className="h-5 w-5" /> {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== ANMELDUNG ==================== */}
      <section id="anmeldung" className="pb-20 md:pb-28 scroll-mt-[112px]">
        <div className="rm-container max-w-3xl">
          <div className="mb-10 text-center">
            <Reveal>
              <p className="rm-eyebrow mb-4">Anmeldung</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[32px] md:text-[44px] font-semibold leading-tight">
                In zwei Minuten angemeldet.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[18px] text-foreground/75">
                Sie sagen uns, worum es geht – wir melden uns innerhalb von
                24 Stunden mit einem Terminvorschlag.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <AnmeldeFormular />
          </Reveal>
        </div>
      </section>
    </>
  );
}
