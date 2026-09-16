# GADELLAA ARTS TATTOO STUDIO — Nyeri, Kenya

Tattoo studio website. *Wear your ink.* React + TypeScript + Vite + Framer Motion, CSS Modules.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build → dist/
```

## Before launch — replace the placeholders

| What | Where |
| --- | --- |
| Photographs | `src/data/images.ts` — files live in `public/images/work/`, named `<design>-<placement>.jpg` |
| Prices | `src/data/pricing.ts` (shown on `/prices`) |
| Artists (all placeholders) | `src/data/artists.ts` — set `placeholder: false` once real |
| Portfolio entries | `src/data/works.ts` |
| Studio copy | `src/data/studio.ts` |
| Domain, email, address (phone and socials are real) | `src/data/site.ts` **and** the meta / JSON-LD in `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| Booking submission | `src/pages/Booking.tsx` → `onSubmit` (currently prepares an email; nothing is sent) |

All photography is the studio's own work, in `public/images/work/`. Pieces
shot from two angles have a `-2` file; the second angle is used in the hero
and booking banner (see `PLACEMENTS` in `src/data/images.ts`). Tattoo photos
are never used as artist portraits or studio pictures.

## Structure

```
src/
  components/  Navbar, Hero, FeaturedWork, ShuffleDeck, ArtistsSection,
               StudioSection, BookingCTA, Footer, Frame (image), Reveal,
               DisplayLines, ArrowLink, PageShell, ScrollToTop
  pages/       Home, Work, Prices, Artists, Studio, Booking, NotFound
  data/        images, works, pricing, artists, studio, site
  lib/         motion (variants/easing), hooks, seo
  styles/      variables.css (tokens), globals.css
```

Deploying as a static SPA: configure the host to rewrite unknown paths to `index.html`.
