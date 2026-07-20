# Joanna Wildlight — Portfolio-Website

Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4, mit Payload CMS
als eingebettetem Backend (Postgres + Cloudflare R2 für Medien). Gehostet auf
Netlify — siehe [DEPLOYMENT.md](DEPLOYMENT.md) für Live-Setup.

## Starten (lokal)

Braucht eine Postgres-Datenbank. Am einfachsten via Docker:

```bash
docker compose up -d        # startet lokales Postgres auf Port 5433
npm install
npm run dev                 # → http://localhost:3000, Admin unter /admin
npm run seed                # einmalig: bestehende Copy + Fotos nach Payload übertragen
```

`.env.local` ist bereits mit `DATABASE_URI` + `PAYLOAD_SECRET` für die lokale
Postgres-Instanz vorbelegt. R2-Variablen dort optional — ohne sie speichert
Payload Uploads lokal auf der Festplatte (`media/`) statt in R2.

```bash
npm run build                            # Production-Build
npm start                                # Production-Server
npx eslint app components lib content collections globals scripts   # Lint
npx tsc --noEmit                         # Typecheck
npm run generate:types                   # payload-types.ts neu generieren (nach Schema-Änderung)
npm run migrate:create -- <name>         # neue Migration nach Schema-Änderung
```

## Architektur / Ordnerstruktur

```
app/                    Seiten (App Router, RSC)
  layout.tsx            Root-Layout: Fonts, Header, Footer, PageTransition
  page.tsx               Startseite; ueber-mich/ fotografie/ qa/ kontakt/
  impressum/ datenschutz/  Rechtstexte (Lexical-RichText aus Payload)
  (payload)/             Payload-Boilerplate: /admin, /api — siehe unten
  sitemap.ts / robots.ts / icon.tsx / opengraph-image.tsx
components/
  primitives/            Accent, Button, Marquee, SectionDivider, StickerBadge,
                        SunCircle, Polaroid, ArchImage, PlaceholderImage, ScrollReveal
  layout/                Header (Client: Drawer/aktive Route), Footer, PageTransition
  sections/              HeroCarousel, TestimonialCarousel, FaqList, ContactForm,
                        CTABand, CategoryCarousel
collections/            Payload-Collections: Media, Users, Testimonials,
                        FaqItems, PhotoCategories, ContactSubmissions
globals/                Payload-Globals: SiteSettings, HomePage, AboutPage,
                        PhotographyPage, FaqPage, ContactPage, Impressum-/
                        DatenschutzPage — je ein Global pro Seite
lib/content/            types.ts (Runtime-Content-Typen) + provider.ts
                        (PayloadContentProvider — CMS-Naht)
payload.config.ts        Payload-Konfiguration (DB-Adapter, Storage, Collections/Globals)
scripts/seed.ts          Einmaliges Seed-Script (siehe unten)
scripts/seed-data/       Nur für den Seed genutzte Typen + Bild-Manifest
content/*.ts             Seed-Quelldaten (1:1 die ursprüngliche Copy) — wird
                        nur von scripts/seed.ts gelesen, nicht mehr vom Frontend
migrations/               Postgres-Migrationen (werden bei jedem Deploy angewendet)
```

## Design-Tokens

Alle Farben, Radien, Schatten und Maße liegen **ausschließlich** in
`app/globals.css`: als `--jw-*` Custom Properties in `:root`, gemappt ins
Tailwind-Theme via `@theme inline` (Tailwind v4, kein `tailwind.config`).
Komponenten referenzieren nur Token-Klassen (`bg-ivory`, `text-gold-dark`, …)
oder `var(--jw-*)` — nie harte Hex-Werte.

## Inhalte bearbeiten (Payload CMS)

Alle Texte und Fotos werden im Admin-Panel unter `/admin` gepflegt — keine
Code-Änderung mehr nötig:

- **Seiten-Inhalte** (Texte, Headlines, Bilder): je ein "Global" pro Seite
  (Startseite, Über mich, Fotografie, Q+A, Kontakt, Impressum, Datenschutz)
  sowie "Site Settings" für Logo/Navigation/Footer/Instagram.
- **Fotos**: über die Media-Bibliothek hochladen, dann in den jeweiligen
  Bild-Feldern auswählen. Ohne ausgewähltes Bild zeigt das Frontend einen
  gestreiften Platzhalter (Design-Fallback, kein Fehler).
- **Testimonials / FAQ / Fotografie-Kategorien**: eigene Collections mit
  einem `order`-Feld für die Reihenfolge.
- Änderungen erscheinen **innerhalb von ~60s** live (ISR-Revalidierung,
  `export const revalidate = 60` in jeder `page.tsx`) — kein Redeploy nötig.

## Copy-Konvention

**AccentedText**: genau ein mit `*Sternchen*` markierter Teil wird als
italic-Gold-Akzent gerendert (`<Accent>`), `\n` erzwingt einen Umbruch
(Mobile-Headlines). Gilt für alle entsprechend gekennzeichneten Textfelder
im Admin-Panel (Beschreibung steht dort als Feld-Hinweis).

## CMS-Naht

Komponenten/Seiten beziehen Inhalte ausschließlich über das
`ContentProvider`-Interface (`lib/content/provider.ts`):

```ts
getSiteContent() · getHeroImages() · getTestimonials() · getFaqItems()
getPhotoCategories() · getPageContent(page) · getLegalPage(slug)
```

`PayloadContentProvider` implementiert dieses Interface über Payloads Local
API (kein HTTP-Roundtrip, läuft direkt in React Server Components). Ein
Wechsel des Backends würde nur eine neue Implementierung + Eintausch in
`getContentProvider()` erfordern — Komponenten/Seiten blieben unangetastet.

## Bilder

`components/primitives/PlaceholderImage.tsx` rendert Payload-Media (next/image,
responsive über den Next-Image-Optimizer) oder — falls kein Bild gesetzt —
einen gestreiften Design-Platzhalter mit Label. Lightbox-Zoom ist für alle
Content-Bilder aktiv (`expandable={false}` schaltet es ab).

## Kontaktformular

`components/sections/ContactForm.tsx` validiert clientseitig und sendet an
`lib/contact/submit.ts` → POST gegen Payloads REST-API
(`/api/contact-submissions`, öffentlicher `create`-Zugriff, `read` nur für
eingeloggte Admins). Einträge landen unter `/admin` → „Contact Submissions“.
Optionaler E-Mail-Versand: siehe DEPLOYMENT.md.

## Seed-Script

`scripts/seed.ts` überträgt einmalig die ursprüngliche lokale Copy
(`content/*.ts`) und alle Fotos (`public/images/`) nach Payload — via
`npm run seed`. Läuft nur, wenn die Media-Collection leer ist (Schutz gegen
versehentliches Doppel-Seeding); `FORCE_SEED=true npm run seed` erzwingt es.
Nach dem ersten erfolgreichen Seed sind `content/*.ts` nur noch Referenz/
Backup der ursprünglichen Copy, nicht mehr Teil des Laufzeit-Pfads.

## Deployment

Siehe [DEPLOYMENT.md](DEPLOYMENT.md) — Netlify (Next.js-Runtime), Netlify DB
(Neon-Postgres, ohne separaten Account), Cloudflare R2 für Medien.
