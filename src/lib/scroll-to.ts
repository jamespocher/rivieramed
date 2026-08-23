/**
 * Klick-Handler für seiteninterne Sprungmarken.
 *
 * Ein reines `href="#abschnitt"` reicht hier nicht: der Router verarbeitet den
 * Hash-Teil der Adresse mit und landet dadurch auf der Startseite statt beim
 * Abschnitt. Wir scrollen darum selbst und lassen die Adresszeile in Ruhe.
 */
export function scrollToId(
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  const el = document.getElementById(id);
  if (!el) return; // Abschnitt liegt auf einer anderen Seite – Link normal folgen lassen
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
