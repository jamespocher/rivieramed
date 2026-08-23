import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { Send, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT } from "@/lib/contact";

const LEISTUNGEN = [
  "Pflege & Betreuung",
  "Hauswirtschaft",
  "Nachtwache",
  "Physiotherapie",
  "Entlastung für Angehörige",
  "Beratung & Abklärung",
  "Ich weiss es noch nicht",
] as const;

const anmeldeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Bitte geben Sie Ihren vollständigen Namen an." })
    .max(200, { message: "Name ist zu lang." }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Bitte geben Sie eine gültige Telefonnummer an." })
    .max(50)
    .regex(/^[0-9+()\s\-./]+$/, { message: "Ungültige Zeichen in der Telefonnummer." }),
  email: z
    .string()
    .trim()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse an." })
    .max(320),
  ort: z
    .string()
    .trim()
    .min(2, { message: "Bitte geben Sie Ihren Wohnort an." })
    .max(120),
  leistung: z.string().trim().min(1),
  message: z
    .string()
    .trim()
    .max(5000, { message: "Nachricht ist zu lang (max. 5000 Zeichen)." }),
});

type AnmeldeForm = z.infer<typeof anmeldeSchema>;
type FieldErrors = Partial<Record<keyof AnmeldeForm, string>>;

const EMPTY: AnmeldeForm = {
  name: "",
  phone: "",
  email: "",
  ort: "",
  leistung: LEISTUNGEN[0],
  message: "",
};

/**
 * Anmeldung für Pflege und Betreuung.
 * Wird auf der Startseite und auf der Kontaktseite eingebunden.
 */
export function AnmeldeFormular({ id }: { id?: string }) {
  const [form, setForm] = useState<AnmeldeForm>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const onChange =
    (field: keyof AnmeldeForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = anmeldeSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, phone, email, ort, leistung, message } = parsed.data;
    const subject = encodeURIComponent(`Anmeldung: ${name}, ${ort}`);
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\nWohnort: ${ort}\nGewünschte Leistung: ${leistung}\n\nNachricht:\n${message || "—"}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSuccess(true);
    setForm(EMPTY);
  };

  return (
    <div
      id={id}
      className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden"
    >
      {/* Direktweg über OPAN */}
      <div className="flex flex-col gap-3 border-b border-border bg-surface-alt px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <p className="font-semibold text-[oklch(0.24_0.005_100)]">
            Lieber direkt online anmelden?
          </p>
          <p className="text-[15px] text-foreground/70">
            Über OPAN – dem Anmeldeportal für Spitex-Leistungen.
          </p>
        </div>
        <a
          href={CONTACT.opanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-primary px-5 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Online-Anmeldung
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>

      {success ? (
        <div className="flex flex-col items-center px-6 py-12 text-center md:px-8">
          <CheckCircle2 className="mb-4 h-14 w-14 text-primary" />
          <h3 className="text-2xl font-semibold">Vielen Dank!</h3>
          <p className="mt-3 max-w-md text-foreground/80">
            Ihr E-Mail-Programm sollte sich geöffnet haben. Falls nicht,
            schreiben Sie uns direkt an{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-primary underline"
            >
              {CONTACT.email}
            </a>{" "}
            – oder verschlüsselt über HIN an{" "}
            <a
              href={`mailto:${CONTACT.hinEmail}`}
              className="text-primary underline"
            >
              {CONTACT.hinEmail}
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setSuccess(false)}
          >
            Neue Anmeldung erfassen
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="am-name">
                Vor- und Nachname <span className="text-primary">*</span>
              </Label>
              <Input
                id="am-name"
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
              <Label htmlFor="am-phone">
                Telefon <span className="text-primary">*</span>
              </Label>
              <Input
                id="am-phone"
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="am-email">
                E-Mail <span className="text-primary">*</span>
              </Label>
              <Input
                id="am-email"
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
              <Label htmlFor="am-ort">
                Wohnort <span className="text-primary">*</span>
              </Label>
              <Input
                id="am-ort"
                value={form.ort}
                onChange={onChange("ort")}
                placeholder="3600 Thun"
                autoComplete="address-level2"
                maxLength={120}
                aria-invalid={!!errors.ort}
              />
              {errors.ort && (
                <p className="text-xs text-destructive">{errors.ort}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="am-leistung">Gewünschte Leistung</Label>
            <select
              id="am-leistung"
              value={form.leistung}
              onChange={onChange("leistung")}
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
            >
              {LEISTUNGEN.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="am-message">Ihre Situation (optional)</Label>
            <Textarea
              id="am-message"
              value={form.message}
              onChange={onChange("message")}
              placeholder="Für wen suchen Sie Unterstützung, ab wann und in welchem Umfang? Ein paar Stichworte genügen."
              rows={5}
              maxLength={5000}
              aria-invalid={!!errors.message}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {errors.message ? (
                <span className="text-destructive">{errors.message}</span>
              ) : (
                <span>Das Erstgespräch ist kostenlos und unverbindlich.</span>
              )}
              <span className="tabular-nums">{form.message.length}/5000</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Mit dem Absenden stimmen Sie unserer{" "}
              <Link to="/datenschutz" className="underline hover:text-primary">
                Datenschutzerklärung
              </Link>{" "}
              zu.
            </p>
            <Button type="submit" size="lg" className="rm-lift">
              <Send className="h-4 w-4" />
              Anmeldung senden
            </Button>
          </div>

          <p className="flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              Medizinische Unterlagen senden Sie uns bitte verschlüsselt über
              HIN an{" "}
              <a
                href={`mailto:${CONTACT.hinEmail}`}
                className="font-medium text-primary hover:underline"
              >
                {CONTACT.hinEmail}
              </a>
              .
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
