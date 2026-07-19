# Joanna Wildlight — Portfolio-Website

Pixelgenaue Umsetzung des Design-Handoffs (`design_handoff_joanna_wildlight/`) in
Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4.

## Starten

```bash
npm install
npm run dev        # Entwicklung → http://localhost:3000
npm run build      # Production-Build (prerendert alle 5 Seiten statisch)
npm start          # Production-Server
npx eslint app components lib content   # Lint
npx tsc --noEmit                        # Typecheck
```

## Architektur / Ordnerstruktur

```
app/                    Seiten (App Router, RSC)
  layout.tsx            Root-Layout: Fonts, Header, Footer
  page.tsx              Startseite
  ueber-mich/ fotografie/ qa/ kontakt/
  kontakt/actions.ts    Server Action (Formular-Submit-Stub)
components/
  primitives/           Accent, Button, Marquee, SectionDivider, StickerBadge,
                        SunCircle, Polaroid, ArchImage, PlaceholderImage, ScrollReveal
  layout/               Header (Client: Drawer/aktive Route), Footer
  sections/             HeroCarousel, TestimonialCarousel, FaqList, ContactForm, CTABand
content/                Copy pro Seite (site, home, about, photography, faq,
                        testimonials, contact) — 1:1 aus den .dc.html-Referenzen
lib/content/            types.ts (Content-Typen) + provider.ts (CMS-Naht)
lib/images/manifest.ts  Bild-Manifest: semantischer Key → Asset
```

## Design-Tokens

Alle Farben, Radien, Schatten und Maße liegen **ausschließlich** in
`app/globals.css`: als `--jw-*` Custom Properties in `:root`, gemappt ins
Tailwind-Theme via `@theme inline` (Tailwind v4, kein `tailwind.config`).
Komponenten referenzieren nur Token-Klassen (`bg-ivory`, `text-gold-dark`, …)
oder `var(--jw-*)` — nie harte Hex-Werte.

## Platzhalter → echte Fotos ersetzen

Alle Bildflächen sind Platzhalter (gestreift + Monospace-Label + warmer Glow).
So kommt ein echtes Foto rein:

1. Datei nach `public/images/` legen, z. B. `public/images/hero-1.jpg`.
2. In `lib/images/manifest.ts` beim passenden Key `src` setzen:
   `"home-hero-1": { src: "/images/hero-1.jpg", label: …, alt: … }`.
3. Fertig — `PlaceholderImage` rendert dann automatisch `next/image`
   (object-cover, ohne Glow). Radius/Rotation bleiben erhalten.

Die Keys sind semantisch benannt (`home-hero-1`, `portrait-joanna`,
`kat-familie`, …); das `label` nennt Motiv + Format aus dem Design.
`alt` bitte beim Einpflegen echter Fotos konkretisieren.

**Testimonials:** `content/testimonials.ts` enthält 1 echtes Zitat und 2 mit
`isPlaceholder: true` markierte Einträge — vor Launch durch echte
Google-Rezensionen ersetzen.

## Copy bearbeiten

Sämtliche Texte liegen in `content/*.ts` (typisiert über
`lib/content/types.ts`). Konvention **AccentedText**: genau ein mit
`*Sternchen*` markierter Teil wird als italic-Gold-Akzent gerendert
(`<Accent>`), `\n` erzwingt einen Umbruch (Mobile-Headlines).

## CMS-Naht

Komponenten beziehen Inhalte nur über das `ContentProvider`-Interface
(`lib/content/provider.ts`):

```ts
getSiteContent() · getHeroImages() · getTestimonials() · getFaqItems()
getPhotoCategories() · getPageContent(page)
```

Ein CMS-Adapter muss genau dieses Interface implementieren (alle Getter async,
Rückgabetypen aus `lib/content/types.ts`) und in `getContentProvider()`
eingetauscht werden — Komponenten und Seiten bleiben unverändert.

## Kontaktformular

`components/sections/ContactForm.tsx` validiert clientseitig (Pflichtfelder,
E-Mail-Format, Datenschutz-Checkbox) und submittet gegen die Server Action
`app/kontakt/actions.ts`. Dort steht der **TODO für den Mail-Service**
(z. B. Resend/Nodemailer) — Signatur `submitContactRequest(data)` beibehalten,
dann bleibt das Formular unangetastet.
