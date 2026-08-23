import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { AnmeldeFormular } from "@/components/site/AnmeldeFormular";
import { CONTACT } from "@/lib/contact";
import { sanityClient, kontaktQuery } from "@/lib/sanity";

type CmsData = {
  eyebrow?: string; heading?: string; subtext?: string
  formEyebrow?: string; formHeading?: string; formSubtext?: string
}

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & Anmeldung — Riviera Med" },
      {
        name: "description",
        content:
          "Kontaktieren Sie Riviera Med oder melden Sie sich direkt online für Pflege und Betreuung zu Hause an. Thun, Bern und Berner Oberland.",
      },
    ],
  }),
  loader: async (): Promise<CmsData | null> => {
    try { return await sanityClient.fetch<CmsData>(kontaktQuery) } catch { return null }
  },
  component: KontaktPage,
});

function KontaktPage() {
  const cms = Route.useLoaderData() ?? {};
  const eyebrow = cms.eyebrow ?? "Kontakt & Anmeldung";
  const heading = cms.heading ?? "Lassen Sie uns sprechen.";
  const subtext = cms.subtext ?? "Sie suchen Pflege oder Betreuung für sich oder einen Angehörigen? Rufen Sie uns an, schreiben Sie uns – oder melden Sie sich gleich hier unten an. Das Erstgespräch bei Ihnen zu Hause ist kostenlos und unverbindlich.";
  const formEyebrow = cms.formEyebrow ?? "Anmeldung";
  const formHeading = cms.formHeading ?? "Melden Sie sich hier an.";
  const formSubtext = cms.formSubtext ?? "Füllen Sie das Formular aus oder nutzen Sie die Online-Anmeldung über OPAN. Wir melden uns innerhalb von 24 Stunden bei Ihnen.";

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">{eyebrow}</p>
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">
              {heading}
            </h1>
            <p className="mt-5 text-[19px] text-foreground/80">{subtext}</p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-semibold tabular-nums">{CONTACT.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">E-Mail</p>
                <p className="font-semibold break-words text-[15px]">{CONTACT.email}</p>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT.hinEmail}`}
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">HIN – verschlüsselt</p>
                <p className="font-semibold break-words text-[15px]">{CONTACT.hinEmail}</p>
              </div>
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="font-semibold">Nachricht schreiben</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface sm:col-span-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-semibold">
                  {CONTACT.street}<br />{CONTACT.city}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              Arztberichte, Verordnungen und andere medizinische Unterlagen
              senden Sie uns bitte verschlüsselt über HIN an{" "}
              <a href={`mailto:${CONTACT.hinEmail}`} className="font-medium text-primary hover:underline">
                {CONTACT.hinEmail}
              </a>
              .
            </span>
          </p>
        </div>
      </section>

      {/* ==================== ANMELDUNG ==================== */}
      <section id="anmeldung" className="py-16 md:py-24 bg-surface/60 border-t border-border scroll-mt-[112px]">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">{formEyebrow}</p>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1]">
              {formHeading}
            </h2>
            <p className="mt-5 text-[17px] text-foreground/80">{formSubtext}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10">
              <AnmeldeFormular />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== HINWEIS JOBS ==================== */}
      <section className="border-t border-border py-12">
        <div className="rm-container max-w-3xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[18px] font-semibold">Sie möchten bei uns arbeiten?</p>
                <p className="mt-1 text-foreground/75">
                  Offene Stellen und die Spontanbewerbung finden Sie auf unserer Jobs-Seite.
                </p>
              </div>
            </div>
            <Link
              to="/jobs"
              className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Zu den Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== GOOGLE MAPS ==================== */}
      <section className="border-t border-border">
        <div className="rm-container py-14">
          <Reveal>
            <p className="rm-eyebrow mb-3">So finden Sie uns</p>
            <p className="text-[17px] text-foreground/70 mb-8">
              {CONTACT.street} · {CONTACT.city}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-sm" style={{ height: "420px" }}>
              <iframe
                title="Riviera Med GmbH – Standort Thun"
                src="https://maps.google.com/maps?q=Scheibenstrasse+3,+3600+Thun,+Schweiz&output=embed&hl=de&z=16"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "saturate(1.4) hue-rotate(185deg) brightness(0.95)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            <a
              href="https://www.google.com/maps/place/Riviera+Med+GmbH+-+Private+Spitex+Thun/data=!4m2!3m1!1s0x0:0x380d1cbb8f9ad3d4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              In Google Maps öffnen ↗
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
