/**
 * Rezensionen für den Slider direkt unter dem Hero.
 *
 * Quelle: Google-Rezensionen von Riviera Med (Stand September 2026).
 * Reihenfolge = Reihenfolge im Slider. `rating` 1–5, `source` optional.
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
      "Sehr freundliches und professionelles Team. Die Betreuung ist zuverlässig, herzlich und kompetent. Man fühlt sich jederzeit gut aufgehoben und ernst genommen. Vielen Dank für die tolle Unterstützung. Klare Empfehlung!",
    author: "Abdow",
    rating: 5,
    source: "Google",
    date: "2026",
  },
  {
    quote:
      "Im höchsten Grade vertrauenswürdig, liebenswert, einfühlsam und sehr kompetent. Dem gesamten Team möchte ich meinen Dank aussprechen für ihre Hilfsbereitschaft und das grosse Engagement.",
    author: "Stefania Ardu",
    rating: 5,
    source: "Google",
    date: "2026",
  },
  {
    quote:
      "Eine geniale Spitex – unsere Familie ist begeistert! Leni und sein Team ermöglichen meinem Vater eine fachlich und menschlich grandiose Betreuung daheim. Die Zusammenarbeit ist genial!",
    author: "Franziska Rettenmund",
    role: "Tochter",
    rating: 5,
    source: "Google",
    date: "2024",
  },
  {
    quote:
      "Mein Bruder wird von der Riviera Med Spitex versorgt und er findet, dass ihm da ein ganz grosser Glücksgriff gelungen sei.",
    author: "mac scout",
    role: "Bruder eines Klienten",
    rating: 5,
    source: "Google",
    date: "2022",
  },
  {
    quote: "Ich war sehr zufrieden mit der Dienstleistung von der Riviera Med GmbH.",
    author: "Heidi Kernen",
    role: "Klientin",
    rating: 5,
    source: "Google",
    date: "2022",
  },
  {
    quote: "Freundlich, sehr zuverlässig, kein Stress, hilfsbereit.",
    author: "Erika Buhlmann",
    role: "Klientin",
    rating: 5,
    source: "Google",
    date: "2022",
  },
];

export function averageRating(reviews: Review[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
