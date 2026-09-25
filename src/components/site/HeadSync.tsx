import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

type MetaEntry = Record<string, unknown> & { title?: string; "script:ld+json"?: unknown };

/**
 * Überträgt die `head()`-Angaben der Routen (Titel, Meta, JSON-LD) in den
 * echten <head>. Ohne SSR wertet TanStack Router `head()` sonst nicht aus –
 * alle Unterseiten hätten denselben Titel und dieselbe Beschreibung.
 */
export function HeadSync() {
  const metas = useRouterState({
    select: (s) => s.matches.map((m) => (m as { meta?: MetaEntry[] }).meta).filter(Boolean) as MetaEntry[][],
  });

  useEffect(() => {
    const head = document.head;
    head.querySelectorAll("[data-rm-head]").forEach((el) => el.remove());

    let title: string | undefined;
    const seen = new Set<string>();
    const nodes: HTMLElement[] = [];

    // Tiefste Route zuerst, damit sie allgemeinere Angaben überschreibt.
    for (let i = metas.length - 1; i >= 0; i--) {
      for (const m of metas[i]) {
        if (m.title) {
          if (!title) title = String(m.title);
          continue;
        }
        if ("script:ld+json" in m) {
          const s = document.createElement("script");
          s.type = "application/ld+json";
          s.text = JSON.stringify(m["script:ld+json"]);
          nodes.push(s);
          continue;
        }
        const key = String(m.name ?? m.property ?? "");
        if (key && seen.has(key)) continue;
        if (key) seen.add(key);
        const tag = document.createElement("meta");
        for (const [k, v] of Object.entries(m)) tag.setAttribute(k, String(v));
        nodes.push(tag);
      }
    }

    if (title) document.title = title;
    // Statische Fallbacks aus index.html ausblenden, wenn die Route eigene liefert.
    for (const key of seen) {
      head.querySelector(`meta[name="${key}"]:not([data-rm-head]), meta[property="${key}"]:not([data-rm-head])`)?.remove();
    }
    for (const n of nodes) {
      n.setAttribute("data-rm-head", "");
      head.appendChild(n);
    }
  }, [metas]);

  return null;
}
