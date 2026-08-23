import { useRef, useState } from "react";
import { Paperclip, X, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";

export const MAX_DATEIEN = 5;
const MAX_MB = 10;
const ERLAUBT = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function formatGroesse(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Dateiauswahl für Bewerbungsunterlagen (max. 5 Dateien).
 *
 * Die Dateien werden hier nur ausgewählt, nicht übertragen – das Formular
 * öffnet das E-Mail-Programm der Besucherin, und Browser dürfen dort keine
 * Anhänge setzen. Die Namen wandern in den Mailtext, das Anhängen macht die
 * Person selbst. Sobald ein Upload-Ziel eingerichtet ist, kann diese
 * Komponente unverändert bleiben – nur das Absenden ändert sich.
 */
export function DateiAuswahl({
  dateien,
  onChange,
}: {
  dateien: File[];
  onChange: (dateien: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const [ueberZone, setUeberZone] = useState(false);

  const aufnehmen = (neue: FileList | null) => {
    if (!neue?.length) return;
    const liste = Array.from(neue);
    const meldungen: string[] = [];
    const gueltig: File[] = [];

    for (const f of liste) {
      if (f.size > MAX_MB * 1024 * 1024) {
        meldungen.push(`„${f.name}" ist grösser als ${MAX_MB} MB.`);
      } else if (ERLAUBT.length && !ERLAUBT.includes(f.type) && f.type !== "") {
        meldungen.push(`„${f.name}" hat ein nicht unterstütztes Format.`);
      } else if (
        dateien.some((d) => d.name === f.name && d.size === f.size) ||
        gueltig.some((d) => d.name === f.name && d.size === f.size)
      ) {
        meldungen.push(`„${f.name}" ist bereits ausgewählt.`);
      } else {
        gueltig.push(f);
      }
    }

    const platz = MAX_DATEIEN - dateien.length;
    if (gueltig.length > platz) {
      meldungen.push(`Es sind höchstens ${MAX_DATEIEN} Dateien möglich.`);
    }

    onChange([...dateien, ...gueltig.slice(0, Math.max(0, platz))]);
    setFehler(meldungen.length ? meldungen.join(" ") : null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const entfernen = (index: number) => {
    onChange(dateien.filter((_, i) => i !== index));
    setFehler(null);
  };

  const voll = dateien.length >= MAX_DATEIEN;

  return (
    <div className="space-y-2">
      <Label htmlFor="jb-dateien">Unterlagen (optional)</Label>
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        Zum Beispiel Lebenslauf, Bewerbungsschreiben, Diplome oder
        Arbeitszeugnisse. Bis zu {MAX_DATEIEN} Dateien als PDF, Word oder Bild,
        je maximal {MAX_MB}&nbsp;MB.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!voll) setUeberZone(true);
        }}
        onDragLeave={() => setUeberZone(false)}
        onDrop={(e) => {
          e.preventDefault();
          setUeberZone(false);
          if (!voll) aufnehmen(e.dataTransfer.files);
        }}
        className={`rounded-lg border border-dashed px-5 py-6 text-center transition-colors ${
          ueberZone
            ? "border-primary bg-primary/5"
            : voll
              ? "border-border bg-muted/40"
              : "border-input hover:border-primary/50"
        }`}
      >
        <input
          ref={inputRef}
          id="jb-dateien"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic"
          className="sr-only"
          disabled={voll}
          onChange={(e) => aufnehmen(e.target.files)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={voll}
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-[15px] font-medium transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Paperclip className="h-4 w-4" aria-hidden />
          Dateien auswählen
        </button>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {voll
            ? `Maximum von ${MAX_DATEIEN} Dateien erreicht`
            : `oder hierher ziehen · noch ${MAX_DATEIEN - dateien.length} möglich`}
        </p>
      </div>

      {fehler && <p className="text-xs text-destructive">{fehler}</p>}

      {dateien.length > 0 && (
        <ul className="space-y-2 pt-1">
          {dateien.map((d, i) => (
            <li
              key={`${d.name}-${d.size}`}
              className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2"
            >
              <FileText
                className="h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-[15px]">
                {d.name}
              </span>
              <span className="shrink-0 text-[13px] tabular-nums text-muted-foreground">
                {formatGroesse(d.size)}
              </span>
              <button
                type="button"
                onClick={() => entfernen(i)}
                aria-label={`${d.name} entfernen`}
                className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
