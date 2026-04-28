# Riviera Med — Website

Private Spitex Thun · TanStack Start · React 19 · Tailwind v4 · shadcn/ui

---

## Schnellstart in VS Code

1. **Ordner öffnen**

   ```bash
   code "/Users/JamesPocher/Desktop/RivieraMed_Website"
   ```

   oder in VS Code: `File → Open Folder…` → `RivieraMed_Website` wählen.

2. **Empfohlene Extensions installieren** — VS Code zeigt beim ersten
   Öffnen automatisch einen Hinweis (siehe `.vscode/extensions.json`):
   ESLint, Prettier, Tailwind CSS IntelliSense.

3. **Terminal öffnen** in VS Code (`⌃` + `` ` ``) und Abhängigkeiten
   installieren:

   ```bash
   npm install
   ```

4. **Dev-Server starten:**

   ```bash
   npm run dev
   ```

   Vite öffnet die Vorschau standardmässig auf
   <http://localhost:5173>. Beim Speichern eines Files wird die Seite
   automatisch neu geladen (Hot Module Replacement).

5. **Seiten direkt anschauen:**

   | Seite | URL |
   |---|---|
   | Startseite | <http://localhost:5173/> |
   | Leistungen | <http://localhost:5173/leistungen> |
   | Tarife | <http://localhost:5173/tarife> |
   | Über uns | <http://localhost:5173/ueber-uns> |
   | Kontakt | <http://localhost:5173/kontakt> |
   | Impressum | <http://localhost:5173/impressum> |
   | Datenschutz | <http://localhost:5173/datenschutz> |

   Die Verlinkung zwischen den Seiten ist über `<Link to="…">`
   in `SiteHeader.tsx` und `SiteFooter.tsx` aufgebaut.

---

## Weitere Scripts

```bash
npm run build       # Production-Build
npm run preview     # Build lokal anschauen
npm run lint        # ESLint
npm run format      # Prettier
```

---

## Projektstruktur

```
RivieraMed_Website/
├── .vscode/                  # Editor-Settings & Extension-Empfehlungen
├── _design/                  # Design-Quellen (PDF, Logo-PNG, MasterPrompt)
├── public/                   # Statische Assets (werden direkt ausgeliefert)
├── src/
│   ├── routes/               # Seiten (file-based routing)
│   │   ├── __root.tsx        # Layout-Wrapper (Header/Footer)
│   │   ├── index.tsx         # /
│   │   ├── leistungen.tsx    # /leistungen
│   │   ├── tarife.tsx        # /tarife
│   │   ├── ueber-uns.tsx     # /ueber-uns
│   │   ├── kontakt.tsx       # /kontakt
│   │   ├── impressum.tsx     # /impressum
│   │   └── datenschutz.tsx   # /datenschutz
│   ├── components/
│   │   ├── site/             # Layout-Bausteine (Header, Footer, Logo, Reveal)
│   │   └── ui/               # shadcn/ui Komponenten (Button, Card, …)
│   ├── features/
│   │   └── pricing-calculator/PricingCalculator.tsx
│   ├── hooks/                # use-mobile, use-reveal, useScrolled
│   ├── lib/                  # cn() Util
│   ├── integrations/
│   │   └── supabase/client.ts
│   ├── assets/               # Bilder (importiert via @/assets/…)
│   ├── routeTree.gen.ts      # ⚠ Auto-generiert von TanStack Router
│   ├── router.tsx
│   └── styles.css            # Tailwind v4 + Design-Tokens
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── components.json           # shadcn/ui Config
└── README.md
```

---

## Verlinkung zwischen den Seiten

Alle internen Links nutzen den TanStack-Router-`<Link>`:

```tsx
import { Link } from "@tanstack/react-router";

<Link to="/leistungen">Leistungen</Link>
```

Das hat den Vorteil, dass kein Page-Reload passiert (SPA-Navigation,
schneller).

* **Header** (`src/components/site/SiteHeader.tsx`) verlinkt:
  Leistungen · Tarife · Über uns · Kontakt · Erstgespräch-CTA → /kontakt
* **Footer** (`src/components/site/SiteFooter.tsx`) verlinkt:
  Leistungen · Über uns · Tarife · Kontakt · Datenschutz · Impressum

Die Routen werden automatisch aus den Dateien in `src/routes/` erkannt
und in `src/routeTree.gen.ts` registriert.

---

## Optional: Supabase verbinden (Bewerbungsformular)

Das Kontakt­formular schreibt Bewerbungen in eine Supabase-Tabelle
`job_applications`. Damit das funktioniert, musst du im Projekt­root
ein `.env.local` anlegen:

```bash
VITE_SUPABASE_URL="https://DEIN-PROJEKT.supabase.co"
VITE_SUPABASE_ANON_KEY="dein-anon-key"
```

Ohne diese Variablen läuft die Seite trotzdem — nur der Submit-Button
schlägt fehl.

---

## Hinweise

* **Routen ändern:** Neue Seite anlegen → einfach eine neue Datei in
  `src/routes/` erstellen (z. B. `blog.tsx`). TanStack Router regeneriert
  `routeTree.gen.ts` beim nächsten `npm run dev`.
* **Bilder:** Liegen in `src/assets/`, importiert über `@/assets/…`.
* **Design-Tokens:** In `src/styles.css` (Farben, Schriftgrössen,
  Spacing) — Tailwind v4 `@theme inline` Block.
* **Logo:** `src/assets/riviera-med-logo.png`.
