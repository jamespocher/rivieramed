import { Clock } from "lucide-react";

/**
 * Störer «Antwort innerhalb von 24 Stunden» – kräftige Pille mit Puls-Punkt.
 */
export function AntwortBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground pl-4 pr-5 py-2.5 text-[15px] font-semibold shadow-[0_10px_30px_-10px_oklch(0.80_0.12_240/0.9)] ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center text-primary">
        <span className="rm-ping absolute inset-0 rounded-full" aria-hidden />
        <span className="relative h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <Clock className="h-4 w-4" aria-hidden />
      Antwort innerhalb von 24 Stunden
    </span>
  );
}
