import { useEffect, useState } from "react";

/**
 * Nicht-blockierender CMS-Zugriff.
 *
 * Früher hing der Sanity-Fetch im Route-Loader – die Seite blieb leer, bis
 * Sanity geantwortet hatte (oder der Request in ein Timeout lief). Jetzt
 * rendert jede Seite sofort mit ihren Fallback-Texten; sobald Inhalte aus
 * dem CMS eintreffen, werden sie eingeblendet. Der Sanity-Client wird erst
 * bei Bedarf nachgeladen und landet nicht im Haupt-Bundle.
 */
export function useCms<T>(query: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const { sanityClient } = await import("@/lib/sanity");
        const result = await sanityClient.fetch<T>(query);
        if (!cancelled && result) setData(result);
      } catch {
        /* Fallback-Texte bleiben stehen */
      }
    };
    // Erst nach dem ersten Paint starten, damit der Hero sofort sichtbar ist.
    const id = window.setTimeout(run, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [query]);

  return data;
}
