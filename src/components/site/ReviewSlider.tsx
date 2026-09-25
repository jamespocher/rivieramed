import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { averageRating, type Review } from "@/lib/reviews";

type Props = {
  reviews: Review[];
  eyebrow?: string;
  heading?: string;
  autoplayMs?: number;
};

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent" aria-label={`${value} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star className="absolute inset-0 text-foreground/15" style={{ width: size, height: size }} fill="currentColor" strokeWidth={0} aria-hidden />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="text-accent" style={{ width: size, height: size }} fill="currentColor" strokeWidth={0} aria-hidden />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Rezensionen-Slider (Embla). Läuft automatisch, pausiert bei Hover/Fokus,
 * per Pfeilen, Punkten, Tastatur und Wischen bedienbar.
 */
export function ReviewSlider({
  reviews,
  eyebrow = "Rezensionen",
  heading = "Was Klientinnen, Klienten und Angehörige über uns sagen.",
  autoplayMs = 6500,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused || autoplayMs <= 0) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, paused, autoplayMs]);

  if (!reviews.length) return null;
  const avg = averageRating(reviews);

  return (
    <section
      className="py-14 md:py-20 bg-surface border-b border-border"
      aria-labelledby="rezensionen-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="rm-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="rm-eyebrow mb-3">{eyebrow}</p>
            <h2 id="rezensionen-heading" className="text-[30px] md:text-[42px] leading-[1.08]">
              {heading}
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[34px] leading-none font-display italic text-[oklch(0.24_0.005_100)]">{avg.toFixed(1)}</span>
            <div className="flex flex-col gap-1">
              <Stars value={avg} />
              <span className="text-[13px] text-muted-foreground">
                {reviews.length} {reviews.length === 1 ? "Bewertung" : "Bewertungen"}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 touch-pan-y">
              {reviews.map((r, i) => (
                <div key={`${r.author}-${i}`} className="pl-6 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
                  <figure className="h-full bg-surface-alt border border-border rounded-2xl p-7 md:p-8 flex flex-col">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <Stars value={r.rating} size={16} />
                      {r.source && (
                        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{r.source}</span>
                      )}
                    </div>
                    <blockquote className="text-[17px] leading-relaxed text-foreground/85 flex-1">«{r.quote}»</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-border">
                      <p className="font-semibold text-[oklch(0.24_0.005_100)]">{r.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {[r.role, r.location].filter(Boolean).join(" · ")}
                        {r.date ? ` · ${r.date}` : ""}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Rezensionen wechseln">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === selected}
                  aria-label={`Rezension ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === selected ? "w-8 bg-primary" : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Vorherige Rezension"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Nächste Rezension"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
