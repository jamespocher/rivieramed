import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Home, Moon, Activity, Sparkles, Phone, ArrowRight, type LucideIcon } from "lucide-react";
import livingRoom from "@/assets/vertrauen.webp";
import landscape from "@/assets/thunersee.webp";
import { Reveal } from "@/components/site/Reveal";
import { ReviewSlider } from "@/components/site/ReviewSlider";
import { AnmeldeFormular } from "@/components/site/AnmeldeFormular";
import { CONTACT } from "@/lib/contact";
import { scrollToId } from "@/lib/scroll-to";
import { REVIEWS, averageRating, type Review } from "@/lib/reviews";
import { homepageQuery, type HomepageData } from "@/lib/cms-queries";
import { useCms } from "@/hooks/use-cms";

// Hero-Bild liegt fix unter /public, damit index.html es vorladen kann (LCP).
const HERO_IMG = "/images/spitex-thun-pflege-zuhause-hero.webp";
const HERO_IMG_MOBILE = "/images/spitex-thun-pflege-zuhause-hero-mobile.webp";

const DEFAULT_FAQS = [
  {
    q: "Übernimmt die Krankenkasse die Kosten der Spitex?",
    a: "Ja. Pflegeleistungen nach KLV (Krankenpflege-Leistungsverordnung) – also Abklärung, Grundpflege und Behandlungspflege zu Hause – werden von allen Schweizer Krankenkassen übernommen, unabhängig von Ihrer Kasse. Es bleibt lediglich die gesetzliche Patientenbeteiligung von maximal CHF 15.35 pro Tag. Hauswirtschaft und Betreuung sind Selbstzahlerleistungen zu transparenten Tarifen.",
  },
  {
    q: "Was ist der Unterschied zwischen privater und öffentlicher Spitex?",
    a: "Als anerkannte private Spitex erbringen wir dieselben Pflegeleistungen nach KLV wie die öffentliche Spitex – und rechnen sie genauso über die Krankenkasse ab. Der Unterschied liegt in der Betreuung: ein kleines, festes Team, mehr Flexibilität bei Zeiten und Umfang, und Sie wählen Ihre Spitex frei.",
  },
  {
    q: "Wie schnell kann die Pflege zu Hause starten?",
    a: "In dringenden Fällen – zum Beispiel nach einem Spitalaustritt – innerhalb von 24 bis 48 Stunden. Für geplante Einsätze vereinbaren wir ein unverbindliches Erstgespräch, meist innerhalb einer Woche.",
  },
  {
    q: "Was kostet das Erstgespräch?",
    a: "Das Erstgespräch bei Ihnen zu Hause ist kostenlos und unverbindlich. Wir klären den Pflege- und Betreuungsbedarf ab, beantworten Ihre Fragen zur Finanzierung und planen gemeinsam die passende Unterstützung.",
  },
  {
    q: "In welchen Regionen ist Riviera Med als Spitex tätig?",
    a: "Wir sind in Thun, Bern, Spiez, Steffisburg, Hilterfingen, Oberhofen und im ganzen Berner Oberland für Sie da. Unser Sitz ist in Thun – kurze Wege sind uns wichtig.",
  },
  {
    q: "Bietet Riviera Med auch Nachtwachen und Wochenenddienste an?",
    a: "Ja. Wir sind 24 Stunden am Tag, 365 Tage im Jahr erreichbar. Nachtwachen, Sitzwachen, Wochenend- und Feiertagsdienste bis hin zur 24-Stunden-Betreuung sind ein fester Teil unseres Angebots.",
  },
  {
    q: "Wer kommt zu uns nach Hause?",
    a: "Sie werden von einem kleinen, festen Team aus diplomierten Pflegefachpersonen und Betreuenden begleitet, das Sie persönlich kennenlernen. Das schafft Vertrauen und Kontinuität – gerade bei Pflege und Betreuung zu Hause.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spitex Thun & Bern – Professionelle Pflege zu Hause | Riviera Med" },
      {
        name: "description",
        content:
          "Riviera Med ist Ihre private Spitex in Thun und Bern: professionelle Pflege, Betreuung, Hauswirtschaft, Nachtwachen und Physiotherapie zu Hause. Alle Krankenkassen anerkannt, 24/7 erreichbar. Kostenloses Erstgespräch.",
      },
      { property: "og:title", content: "Spitex Thun & Bern – Professionelle Pflege mit Hand und Herz | Riviera Med" },
      {
        property: "og:description",
        content: "Private Spitex für Pflege und Betreuung zu Hause in Thun, Bern und im Berner Oberland. Alle Krankenkassen anerkannt, rund um die Uhr erreichbar.",
      },
      { property: "og:image", content: "https://riviera-med.com/images/spitex-thun-pflege-zuhause-hero.webp" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: DEFAULT_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      },
    ],
  }),
  component: HomePage,
});

// ── Icon-Mapping: Sanity-String → Lucide-Komponente ─────────────────
const ICON_MAP: Record<string, LucideIcon> = { Heart, Home, Moon, Activity, Sparkles };

// ── Fallback-Daten (aktiv solange kein Sanity-Dokument existiert) ────
const DEFAULT_SERVICES = [
  { icon: Heart, title: "Pflege zu Hause", description: "Grund- und Behandlungspflege nach KLV bei Ihnen zu Hause: Wundversorgung, Medikamente richten, Mobilisation, Körperpflege. Über Ihre Krankenkasse abgerechnet." },
  { icon: Home, title: "Hauswirtschaft & Betreuung", description: "Einkaufen, Kochen, Reinigen, Wäsche und Begleitung im Alltag. Damit Sie in Thun, Bern oder im Berner Oberland selbstbestimmt in den eigenen vier Wänden bleiben." },
  { icon: Moon, title: "Nachtwachen & 24-Stunden-Betreuung", description: "Präsenz- und Sitzwachen, diplomierte Nachtpflege und Betreuung rund um die Uhr. Für ruhige Nächte – für Sie und Ihre Angehörigen." },
  { icon: Activity, title: "Physiotherapie zu Hause", description: "Therapie in Ihrem Zuhause nach Unfall, Operation oder bei chronischen Beschwerden – auf ärztliche Verordnung und von der Krankenkasse übernommen." },
  { icon: Sparkles, title: "Entlastung für pflegende Angehörige", description: "Stundenweise Einsätze, Ferienvertretung und Begleitung zu Arztterminen. Damit pflegende Angehörige durchatmen können." },
  { icon: Heart, title: "Beratung & Abklärung", description: "Kostenloses, unverbindliches Erstgespräch bei Ihnen zu Hause. Wir klären den Pflegebedarf ab und erstellen gemeinsam mit Ihnen einen individuellen Pflegeplan." },
];

// Vertrauenspunkte im Hero
const TRUST_POINTS = ["Spitex in Thun, Bern & Berner Oberland", "Alle Krankenkassen anerkannt", "24 Stunden erreichbar", "Kostenloses Erstgespräch"];

const DEFAULT_WHY_BULLETS = [
  { title: "Kleines festes Team", description: "Sie lernen uns persönlich kennen – ohne wechselndes Personal." },
  { title: "Transparente Tarife", description: "Keine versteckten Kosten, Abrechnung im 15-Minuten-Takt, Pflegeleistungen über die Krankenkasse." },
  { title: "Flexibel im Alltag", description: "Einsätze richten sich nach Ihrem Rhythmus – auch abends, nachts und am Wochenende." },
];

function HomePage() {
  const cms = useCms<HomepageData>(homepageQuery) ?? {};

  // Sektion-Daten: CMS-Wert wenn vorhanden, sonst Fallback
  const heroEyebrow = cms.heroEyebrow ?? "Spitex Thun & Bern";
  const heroHeading = cms.heroHeading ?? "Professionelle Pflege";
  const heroHeadingAccent = cms.heroHeadingAccent ?? "mit Hand und Herz.";
  const heroSubtext = cms.heroSubtext ?? "Riviera Med ist Ihre private Spitex für Pflege und Betreuung zu Hause – in Thun, Bern, Spiez, Steffisburg und im ganzen Berner Oberland. Von allen Krankenkassen anerkannt, rund um die Uhr erreichbar.";
  const heroCtaText = cms.heroCtaText ?? "Erstgespräch vereinbaren";
  const heroTrustBadges = cms.heroTrustBadges ?? TRUST_POINTS;
  const heroTrustCardQuote = cms.heroTrustCardQuote ?? "Ein kleines Team, das Zeit hat und wirklich zuhört.";
  const heroTrustCardAttribution = cms.heroTrustCardAttribution ?? "Margrit H. · Spiez";

  const servicesEyebrow = cms.servicesEyebrow ?? "Unsere Spitex-Leistungen";
  const servicesHeading = cms.servicesHeading ?? "Pflege und Betreuung, die sich Ihrem Leben anpasst.";
  const servicesSubtext = cms.servicesSubtext ?? "Von wenigen Stunden pro Woche bis zur 24-Stunden-Betreuung: Pflege, Hauswirtschaft, Nachtwache und Physiotherapie aus einer Hand – zu Hause in Thun, Bern und im Berner Oberland.";
  const services = cms.services?.length
    ? cms.services.map((s) => ({ icon: ICON_MAP[s.icon] ?? Heart, title: s.title, description: s.description }))
    : DEFAULT_SERVICES;

  const whyEyebrow = cms.whyEyebrow ?? "Warum Riviera Med";
  const whyHeading = cms.whyHeading ?? "Zeit. Vertrauen.";
  const whyHeadingAccent = cms.whyHeadingAccent ?? "Kontinuität.";
  const whySubtext = cms.whySubtext ?? "Wir sind eine kleine, private Spitex mit festem Team. Das bedeutet: Sie sehen immer bekannte Gesichter, und wir nehmen uns die Zeit, die gute Pflege zu Hause braucht.";
  const whyBullets = cms.whyBullets?.length ? cms.whyBullets : DEFAULT_WHY_BULLETS;

  const landscapeEyebrow = cms.landscapeEyebrow ?? "Spitex in Thun, Bern und im Berner Oberland";
  const landscapeHeading = cms.landscapeHeading ?? "Dort, wo Sie zu Hause sind – sind wir auch.";

  const reviewsEyebrow = cms.testimonialsEyebrow ?? "Rezensionen";
  const reviewsHeading = cms.testimonialsHeading ?? "Was Klientinnen, Klienten und Angehörige über uns sagen.";
  const reviews: Review[] = cms.testimonials?.length
    ? cms.testimonials.map((t) => ({ quote: t.quote, author: t.author, role: t.role, location: t.location, rating: 5 as const }))
    : REVIEWS;
  const rating = averageRating(reviews);

  const faqEyebrow = cms.faqEyebrow ?? "Häufige Fragen zur Spitex";
  const faqHeading = cms.faqHeading ?? "Was Sie über Pflege zu Hause wissen möchten.";
  const faqs = cms.faqs?.length
    ? cms.faqs.map((f) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;

  const ctaHeading = cms.ctaHeading ?? "Sind wir die richtige Spitex für Ihre Familie?";
  const ctaSubtext = cms.ctaSubtext ?? "Lassen Sie uns unverbindlich darüber sprechen. Ein Erstgespräch bei Ihnen zu Hause in Thun, Bern oder im Berner Oberland ist kostenlos.";
  const ctaButtonText = cms.ctaButtonText ?? "Erstgespräch vereinbaren";

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[calc(92vh-88px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <picture>
            <source media="(max-width: 767px)" srcSet={HERO_IMG_MOBILE} type="image/webp" />
            <img
              src={HERO_IMG}
              alt="Pflegefachperson hält die Hand einer Klientin zu Hause – Spitex Riviera Med, Thun und Bern"
              className="h-full w-full object-cover"
              width={1920}
              height={1280}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(110deg, oklch(0.24 0.04 175 / 0.82) 0%, oklch(0.28 0.04 175 / 0.65) 45%, oklch(0.30 0.04 175 / 0.35) 100%)" }}
          />
          <div className="absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl rm-float" />
          <div className="absolute bottom-10 -left-16 h-[300px] w-[300px] rounded-full bg-primary/40 blur-3xl" />
        </div>

        <div className="rm-container pt-20 pb-24 md:pt-28 md:pb-32 w-full">
          <div className="max-w-3xl text-white">
            <div className="rm-fade-in">
              <p className="rm-eyebrow text-accent text-[24px] mb-5">
                {heroEyebrow}
              </p>
            </div>

            <div className="rm-fade-in" style={{ animationDelay: "100ms" }}>
              <h1 className="text-[44px] md:text-[64px] lg:text-[76px] tracking-tight leading-[1.02] text-white">
                {heroHeading}<br />
                <span className="text-accent">{heroHeadingAccent}</span>
              </h1>
            </div>

            <div className="rm-fade-in" style={{ animationDelay: "200ms" }}>
              <p className="mt-7 text-[19px] md:text-[22px] leading-relaxed text-white/85 max-w-[640px]">
                {heroSubtext}
              </p>
            </div>

            <div className="rm-fade-in" style={{ animationDelay: "300ms" }}>
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
            </div>

            <div className="rm-fade-in" style={{ animationDelay: "450ms" }}>
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
            </div>
          </div>
        </div>

        {/* Floating trust card */}
        <div className="rm-fade-in hidden lg:block absolute right-8 xl:right-16 bottom-24 z-10" style={{ animationDelay: "600ms" }}>
          <div className="bg-surface/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-lift px-6 py-5 max-w-[280px]">
            <div className="flex items-center gap-0.5 text-accent">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="relative inline-block text-[18px]">
                  <span className="text-foreground/20">★</span>
                  <span className="absolute inset-0 overflow-hidden text-accent" style={{ width: `${Math.max(0, Math.min(1, rating - (i - 1))) * 100}%` }}>★</span>
                </span>
              ))}
              <span className="ml-1 text-[13px] font-semibold text-foreground/60">{rating.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-[15px] font-semibold text-[oklch(0.24_0.005_100)]">
              «{heroTrustCardQuote}»
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{heroTrustCardAttribution}</p>
          </div>
        </div>
      </section>

      {/* ==================== REZENSIONEN (direkt unter dem Hero) ==================== */}
      <ReviewSlider reviews={reviews} eyebrow={reviewsEyebrow} heading={reviewsHeading} />

      {/* ==================== SERVICES ==================== */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" aria-hidden />
        <div className="rm-container relative">
          <div className="max-w-2xl mb-14">
            <Reveal>
              <p className="rm-eyebrow mb-4">{servicesEyebrow}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[34px] md:text-[50px] leading-[1.08]">
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
                  alt="Pflegefachfrau der Spitex Riviera Med im Gespräch mit einer Klientin im Wohnzimmer in Thun"
                  className="h-full w-full object-cover rm-zoom-img"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1060}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <p className="rm-eyebrow mb-4">{whyEyebrow}</p>
              <h2 className="text-[34px] md:text-[46px] leading-[1.08]">
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

      {/* ==================== LANDSCAPE BAND ==================== */}
      <section className="relative flex items-center justify-center min-h-[340px] md:min-h-[420px] overflow-hidden">
        <img
          src={landscape}
          alt="Thunersee mit Bergpanorama – Einsatzgebiet der Spitex Riviera Med im Berner Oberland"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1281}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, oklch(0.24 0.04 175 / 0.75), oklch(0.30 0.04 175 / 0.75))" }}
          aria-hidden
        />
        <div className="rm-container relative text-white text-center max-w-2xl py-16">
          <Reveal>
            <p className="rm-eyebrow text-accent text-[24px] mb-4">
              {landscapeEyebrow}
            </p>
            <h2 className="text-[36px] md:text-[54px] leading-[1.08] text-white">
              {landscapeHeading}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="py-14 bg-surface border-y border-border overflow-hidden">
        <p className="rm-eyebrow text-center text-muted-foreground mb-10">
          Vernetzt mit der Region Thun & Bern
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
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-10 w-auto max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300" />
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
              <h2 className="text-[34px] md:text-[46px] leading-tight">{faqHeading}</h2>
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
                <h2 className="text-[34px] md:text-[50px] leading-[1.08] text-primary-foreground">
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
              <p className="rm-eyebrow mb-4">Anmeldung Spitex</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[34px] md:text-[46px] leading-tight">
                In zwei Minuten angemeldet.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 text-[18px] text-foreground/75">
                Sie sagen uns, worum es geht – wir melden uns innerhalb von
                24 Stunden mit einem Terminvorschlag für Ihr Erstgespräch zu Hause.
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
