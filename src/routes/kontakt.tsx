import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Heart, Copy, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & Bewerbung — Riviera Med" },
      {
        name: "description",
        content:
          "Kontaktieren Sie Riviera Med oder bewerben Sie sich direkt online. Wir suchen engagiertes Pflegepersonal in Thun, Bern und Umgebung.",
      },
    ],
  }),
  component: KontaktPage,
});

const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Bitte geben Sie Ihren vollständigen Namen an." })
    .max(200, { message: "Name ist zu lang." }),
  email: z
    .string()
    .trim()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse an." })
    .max(320),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Bitte geben Sie eine gültige Telefonnummer an." })
    .max(50)
    .regex(/^[0-9+()\s\-./]+$/, { message: "Ungültige Zeichen in der Telefonnummer." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Bitte schreiben Sie uns ein paar Zeilen zu Ihrer Person." })
    .max(5000, { message: "Nachricht ist zu lang (max. 5000 Zeichen)." }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof applicationSchema>, string>>;

function IbanCopy({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(iban.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-3 bg-surface rounded-lg px-4 py-3 border border-border w-fit">
      <span className="font-mono text-[17px] font-semibold tracking-wider text-foreground select-all">
        {iban}
      </span>
      <button
        onClick={copy}
        className="ml-1 flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors shrink-0"
        aria-label="IBAN kopieren"
      >
        {copied ? (
          <><Check className="h-4 w-4" /><span>Kopiert</span></>
        ) : (
          <><Copy className="h-4 w-4" /><span>Kopieren</span></>
        )}
      </button>
    </div>
  );
}

function KontaktPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const onChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, email, phone, message } = parsed.data;
    const subject = encodeURIComponent(`Bewerbung / Kontakt: ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\n\nNachricht:\n${message}`
    );
    window.location.href = `mailto:info@riviera-med.com?subject=${subject}&body=${body}`;
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">Kontakt & Bewerbung</p>
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">
              Lassen Sie uns sprechen.
            </h1>
            <p className="mt-5 text-[19px] text-foreground/80">
              Ob Sie eine pflegerische Betreuung für einen Angehörigen suchen oder selbst Teil unseres
              Teams werden möchten – wir freuen uns auf Ihre Nachricht. Rufen Sie uns an, schreiben
              Sie uns oder nutzen Sie direkt das Formular unten.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:+41792375521"
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-semibold tabular-nums">079 237 55 21</p>
              </div>
            </a>
            <a
              href="mailto:info@riviera-med.com"
              className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface hover:border-primary hover:shadow-md transition-all rm-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">E-Mail</p>
                <p className="font-semibold">info@riviera-med.com</p>
              </div>
            </a>
            <a
              href="https://wa.me/41792375521"
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
            <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-surface">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-semibold">
                  Scheibenstrasse 3<br />3600 Thun
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bewerbung" className="py-16 md:py-24 bg-surface/60 border-t border-border">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">Jetzt bewerben</p>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1]">
              Werden Sie Teil unseres Teams.
            </h2>
            <p className="mt-5 text-[17px] text-foreground/80">
              Wir suchen laufend engagierte Pflegefachpersonen, Betreuer:innen und
              Hauswirtschafter:innen. Senden Sie uns Ihre Bewerbung direkt über das Formular –
              wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 p-6 md:p-8 rounded-2xl border border-border bg-background shadow-sm space-y-6"
            >
              {success ? (
                <div className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 className="h-14 w-14 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold">Vielen Dank!</h3>
                  <p className="mt-3 text-foreground/80 max-w-md">
                    Ihr E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreiben Sie uns
                    direkt an{" "}
                    <a href="mailto:info@riviera-med.com" className="text-primary underline">
                      info@riviera-med.com
                    </a>
                    .
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSuccess(false)}
                  >
                    Neue Nachricht senden
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Vor- und Nachname <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={onChange("name")}
                        placeholder="Max Mustermann"
                        autoComplete="name"
                        maxLength={200}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Telefon <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange("phone")}
                        placeholder="079 123 45 67"
                        autoComplete="tel"
                        maxLength={50}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      E-Mail <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="ihre.email@beispiel.ch"
                      autoComplete="email"
                      maxLength={320}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Ihre Nachricht <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={onChange("message")}
                      placeholder="Erzählen Sie uns kurz von sich, Ihrer Qualifikation und warum Sie bei Riviera Med arbeiten möchten – oder beschreiben Sie, welche Unterstützung Sie für einen Angehörigen suchen."
                      rows={6}
                      maxLength={5000}
                      aria-invalid={!!errors.message}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.message ? (
                        <span className="text-destructive">{errors.message}</span>
                      ) : (
                        <span>Mind. 10 Zeichen</span>
                      )}
                      <span className="tabular-nums">{form.message.length}/5000</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground">
                      Mit dem Absenden stimmen Sie unserer{" "}
                      <a href="/datenschutz" className="underline hover:text-primary">
                        Datenschutzerklärung
                      </a>{" "}
                      zu.
                    </p>
                    <Button type="submit" size="lg" className="rm-lift">
                      <Send className="h-4 w-4" />
                      Nachricht senden
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ==================== SPENDEN ==================== */}
      <section className="py-20 md:py-28 border-t border-border bg-surface-alt">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-primary mb-5">
              <Heart className="h-5 w-5 fill-primary" />
              <p className="rm-eyebrow !mb-0">Spenden</p>
            </span>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1] mb-6">
              Gemeinsam mehr bewirken.
            </h2>
            <p className="text-[18px] leading-relaxed text-foreground/75 max-w-2xl">
              Hinter jedem Besuch, den wir machen, steht mehr als ein Pflegeeinsatz — es ist ein Moment, der einem Menschen zeigt, dass er nicht allein ist. Viele unserer Klientinnen und Klienten sind auf Betreuung angewiesen, die weit über das gesetzlich Finanzierbare hinausgeht: ein ruhiges Gespräch, ein gemeinsames Mittagessen, eine Hand, die hält.
            </p>
            <p className="mt-4 text-[18px] leading-relaxed text-foreground/75 max-w-2xl">
              Mit Ihrer Spende ermöglichen Sie uns, diese Momente zu schenken — auch dort, wo das Budget knapp ist. Jeder Betrag hilft uns, unsere Arbeit so zu tun, wie wir es für richtig halten: mit Zeit, mit Herz und ohne Abstriche an der Menschlichkeit.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <p className="text-primary-foreground font-semibold text-[15px] tracking-wide uppercase text-sm">
                  Bankverbindung
                </p>
              </div>
              <div className="p-6 md:p-8 space-y-5 text-[15px]">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Bank</p>
                    <p className="font-medium text-foreground leading-snug">
                      Post Finance AG<br />
                      Mingerstrasse 20<br />
                      3030 Bern
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Kontoinhaber</p>
                    <p className="font-medium text-foreground leading-snug">
                      Riviera Med GmbH<br />
                      Scheibenstrasse 3<br />
                      3600 Thun
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">IBAN</p>
                  <IbanCopy iban="CH04 0900 0000 1561 1973 1" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-sm text-muted-foreground">
              Herzlichen Dank für Ihre Unterstützung. Jede Spende fliesst direkt in die Betreuung unserer Klientinnen und Klienten.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================== GOOGLE MAPS ==================== */}
      <section className="border-t border-border">
        <div className="rm-container py-14">
          <Reveal>
            <p className="rm-eyebrow mb-3">So finden Sie uns</p>
            <p className="text-[17px] text-foreground/70 mb-8">
              Scheibenstrasse 3 · 3600 Thun
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
