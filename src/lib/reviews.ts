/**
 * Rezensionen für den Slider direkt unter dem Hero.
 *
 * Hier die echten Bewertungen eintragen (z. B. aus Google). Reihenfolge =
 * Reihenfolge im Slider. `rating` 1–5, `source` optional (z. B. "Google").
 * Der Slider zeigt automatisch den Durchschnitt aller Bewertungen an.
 */
export type Review = {
  quote: string;
  author: string;
  role?: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source?: string;
  date?: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Mein Vater wollte um keinen Preis ins Heim. Riviera Med hat es möglich gemacht, dass er in seiner gewohnten Umgebung bleiben kann. Die Pflegerinnen sind einfühlsam und zuverlässig.",
    author: "Sandra M.",
    role: "Tochter",
    location: "Hilterfingen",
    rating: 5,
  },
  {
    quote:
      "Nach meiner Hüftoperation brauchte ich jeden Tag Unterstützung. Das Team war stets pünktlich, freundlich und sehr professionell. Ich fühlte mich in besten Händen.",
    author: "Heinz R.",
    role: "Klient, 78",
    location: "Thun",
    rating: 5,
  },
  {
    quote:
      "Die transparente Preisgestaltung und die klare Beratung haben uns sofort überzeugt. Keine versteckten Kosten, offene Kommunikation – so muss es sein.",
    author: "Margrit H.",
    role: "Ehefrau",
    location: "Spiez",
    rating: 5,
  },
];

export function averageRating(reviews: Review[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
