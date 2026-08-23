import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  Paperclip,
  Clock,
  Users,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";
import { DateiAuswahl, formatGroesse } from "@/components/site/DateiAuswahl";
import { CONTACT } from "@/lib/contact";
import { scrollToId } from "@/lib/scroll-to";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs & Spontanbewerbung — Riviera Med" },
      {
        name: "description",
        content:
          "Arbeiten bei Riviera Med: Wir suchen laufend Pflegefachpersonen, Betreuer:innen und Hauswirtschafter:innen in Thun, Bern und im Berner Oberland. Jetzt spontan bewerben.",
      },
      { property: "og:title", content: "Jobs & Spontanbewerbung — Riviera Med" },
      {
        property: "og:description",
        content: "Werden Sie Teil eines kleinen, festen Teams in Thun und Bern.",
      },
    ],
  }),
  component: JobsPage,
});

const BEREICHE = [
  "Pflegefachperson HF / FH",
  "Fachfrau/Fachmann Gesundheit EFZ",
  "Pflegehelfer:in SRK",
  "Betreuung / Begleitung",
  "Hauswirtschaft",
  "Nachtwache",
  "Administration",
  "Anderes",
] as const;

const PENSEN = ["10–30 %", "40–60 %", "70–90 %", "100 %", "auf Abruf"] as const;

const bewerbungSchema = z.object({
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
  bereich: z.string().trim().min(1),
  pensum: z.string().trim().min(1),
  message: z
    .string()
    .trim()
    .min(10, { message: "Bitte schreiben Sie uns ein paar Zeilen zu Ihrer Person." })
    .max(5000, { message: "Nachricht ist zu lang (max. 5000 Zeichen)." }),
});

type BewerbungForm = z.infer<typeof bewerbungSchema>;
type FieldErrors = Partial<Record<keyof BewerbungForm, string>>;

const EMPTY: BewerbungForm = {
  name: "",
  email: "",
  phone: "",
  bereich: BEREICHE[0],
  pensum: PENSEN[3],
  message: "",
};

const VORTEILE = [
  {
    icon: Users,
    title: "Kleines, festes Team",
    text: "Kurze Wege, echte Mitsprache und Kolleginnen und Kollegen, die man beim Namen kennt.",
  },
  {
    icon: Clock,
    title: "Planbare Einsätze",
    text: "Dienstpläne, die zu Ihrem Leben passen – von wenigen Stunden bis 100 %.",
  },
  {
    icon: HeartHandshake,
    title: "Zeit für Menschen",
    text: "Wir rechnen keine Minuten. Sie haben Zeit für die Menschen, die Sie betreuen.",
  },
  {
    icon: MapPin,
    title: "Region Thun & Bern",
    text: "Einsätze in Ihrer Nähe – ohne lange Anfahrtswege quer durch den Kanton.",
  },
];

function JobsPage() {
  const [form, setForm] = useState<BewerbungForm>(EMPTY);
  const [dateien, setDateien] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [gesendeteDateien, setGesendeteDateien] = useState<string[]>([]);

  const onChange =
    (field: keyof BewerbungForm) =>
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
    const parsed = bewerbungSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { name, email, phone, bereich, pensum, message } = parsed.data;
    const unterlagen = dateien.length
      ? `\n\nUnterlagen (im Mail angehängt):\n${dateien
          .map((d) => `- ${d.name} (${formatGroesse(d.size)})`)
          .join("\n")}`
      : "";

    const subject = encodeURIComponent(`Spontanbewerbung: ${name} – ${bereich}`);
    const body = encodeURIComponent(
      `Name: ${name}\nTelefon: ${phone}\nE-Mail: ${email}\nBereich: ${bereich}\nGewünschtes Pensum: ${pensum}\n\nÜber mich:\n${message}${unterlagen}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setGesendeteDateien(dateien.map((d) => d.name));
    setSuccess(true);
    setForm(EMPTY);
    setDateien([]);
  };

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="py-16 md:py-24">
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">Jobs bei Riviera Med</p>
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-[1.05]">
              Pflege, wie sie sein sollte.
            </h1>
            <p className="mt-5 text-[19px] text-foreground/80">
              Wir suchen laufend engagierte Pflegefachpersonen, Betreuer:innen
              und Hauswirtschafter:innen für unsere Einsätze in Thun, Bern und
              im Berner Oberland. Eine offene Stelle ausgeschrieben oder nicht –
              senden Sie uns Ihre Spontanbewerbung.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <a
              href="#spontanbewerbung"
              onClick={(e) => scrollToId(e, "spontanbewerbung")}
              className="mt-8 inline-flex h-[56px] items-center gap-2 rounded-md bg-primary px-7 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lift"
            >
              Spontanbewerbung senden
            </a>
          </Reveal>
        </div>
      </section>

      {/* ==================== VORTEILE ==================== */}
      <section className="border-y border-border bg-surface py-16 md:py-20">
        <div className="rm-container">
          <Reveal>
            <p className="rm-eyebrow mb-4">Warum bei uns</p>
            <h2 className="max-w-2xl text-[30px] md:text-[40px] font-semibold leading-tight">
              Ein Arbeitsplatz mit Zeit und Nähe.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VORTEILE.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-border bg-background p-7 rm-lift hover:border-primary/40">
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <v.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="mb-2 text-[22px] font-semibold">{v.title}</h3>
                  <p className="leading-relaxed text-foreground/75">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SPONTANBEWERBUNG ==================== */}
      <section
        id="spontanbewerbung"
        className="py-16 md:py-24 scroll-mt-[112px]"
      >
        <div className="rm-container max-w-3xl">
          <Reveal>
            <p className="rm-eyebrow mb-5">Spontanbewerbung</p>
            <h2 className="text-[32px] md:text-[44px] font-semibold tracking-tight leading-[1.1]">
              Werden Sie Teil unseres Teams.
            </h2>
            <p className="mt-5 text-[17px] text-foreground/80">
              Erzählen Sie uns kurz von sich. Wir melden uns innerhalb von
              24 Stunden – ein vollständiges Dossier brauchen Sie dafür noch
              nicht.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-border bg-background shadow-sm">
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
                    </a>
                    .
                  </p>

                  {gesendeteDateien.length > 0 && (
                    <div className="mt-6 max-w-md rounded-lg border border-border bg-surface-alt px-5 py-4 text-left">
                      <p className="flex items-start gap-2 text-[15px] font-medium">
                        <Paperclip
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        Bitte hängen Sie Ihre Unterlagen im E-Mail-Fenster noch
                        an
                      </p>
                      <ul className="mt-2 space-y-1 pl-6 text-[14px] text-muted-foreground">
                        {gesendeteDateien.map((n) => (
                          <li key={n} className="truncate">
                            {n}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 pl-6 text-[13px] text-muted-foreground">
                        Die Namen stehen bereits im Mailtext. Anhängen muss Ihr
                        E-Mail-Programm übernehmen – das kann eine Website aus
                        Sicherheitsgründen nicht selbst tun.
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSuccess(false)}
                  >
                    Neue Bewerbung senden
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
                      <Label htmlFor="jb-name">
                        Vor- und Nachname <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="jb-name"
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
                      <Label htmlFor="jb-phone">
                        Telefon <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="jb-phone"
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
                    <Label htmlFor="jb-email">
                      E-Mail <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="jb-email"
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="jb-bereich">Bereich</Label>
                      <select
                        id="jb-bereich"
                        value={form.bereich}
                        onChange={onChange("bereich")}
                        className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                      >
                        {BEREICHE.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jb-pensum">Gewünschtes Pensum</Label>
                      <select
                        id="jb-pensum"
                        value={form.pensum}
                        onChange={onChange("pensum")}
                        className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                      >
                        {PENSEN.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jb-message">
                      Über Sie <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="jb-message"
                      value={form.message}
                      onChange={onChange("message")}
                      placeholder="Erzählen Sie uns kurz von sich: Ausbildung, Erfahrung, ab wann Sie verfügbar sind und warum Sie bei Riviera Med arbeiten möchten."
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

                  <DateiAuswahl dateien={dateien} onChange={setDateien} />

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
                      Bewerbung senden
                    </Button>
                  </div>

                  <p className="flex items-start gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>
                      Vollständige Dossiers mit sensiblen Unterlagen können Sie
                      uns verschlüsselt über HIN an{" "}
                      <a
                        href={`mailto:${CONTACT.hinEmail}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {CONTACT.hinEmail}
                      </a>{" "}
                      senden.
                    </span>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
