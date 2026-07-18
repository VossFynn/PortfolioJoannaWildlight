# PROGRESS — Joanna Wildlight Portfolio

## Stand
- Zuletzt erledigt: Phase 2 — Content-Schicht komplett (about/photography/faq/testimonials/contact + ContentProvider mit local-provider)
- In Arbeit / Als Nächstes: Phase 3 — Placeholder-Komponente (Manifest existiert bereits)
- Blocker/Notizen: Tailwind v4 → Theme-Mapping in globals.css via @theme inline (kein tailwind.config). app/page.tsx ist minimaler Platzhalter bis Phase 7.
- Aktualisiert: Session 2, 2026-07-18

---

### Phase 0 — Setup
- [x] Next.js (App Router) + TS strict + Tailwind initialisiert; `npm run dev` läuft fehlerfrei
- [x] Fonts (Cormorant Garamond, Mulish) via next/font eingebunden
- [x] Ordnerstruktur: app/, components/{primitives,layout,sections}, content/, lib/content/, lib/images
- [x] PROGRESS.md aus dieser Checkliste erstellt + STAND-BLOCK gesetzt

### Phase 1 — Design-Tokens
- [x] Alle Tokens aus README (Farben, Radien, Schatten, Button-Höhen, Trennstrich, Typo-Skalen Desktop/Mobile) als CSS-Custom-Properties in globals.css
- [x] Tokens in Tailwind-Theme gemappt; Referenzierung nur über Tokens

### Phase 2 — Content-Schicht (CMS-ready)
- [x] TS-Typen: Testimonial, FaqItem, PhotoCategory, NavItem, PageMeta, HeroImage, ContactSource
- [x] content/-Daten mit echter Copy aus den .dc.html (site, home, about, photography, faq, testimonials)
- [x] ContentProvider-Interface + local-provider; async Getter: getHeroImages, getTestimonials, getFaqItems, getPhotoCategories, getPageContent

### Phase 3 — Bilder
- [ ] Bild-Manifest: semantischer Key → { src: null, label, motiv/format, ratio }
- [ ] Placeholder-Komponente (ohne src: gestreift + Monospace-Label + warmer Radial-Glow; mit src: next/image ohne Glow)

### Phase 4 — Primitive
- [ ] Button (Varianten: Outline dunkel, Gefüllt dunkel, Outline gold auf dunklem Grund) + Hover-Transitions
- [ ] Marquee/Laufband (endlos ~30s, Inhalt dupliziert, pausiert bei prefers-reduced-motion)
- [ ] StickerBadge, Polaroid, ArchImage (Bogen-Radius), SunCircle, SectionDivider (48×1px Gold)
- [ ] ScrollReveal (IntersectionObserver, einmalig, opt. Stagger; bei reduced-motion deaktiviert)

### Phase 5 — Layout
- [ ] Header/Nav (aktive Seite Gold-Unterstrich, Hover gold; Mobile-Burger → Fullscreen-Drawer im gleichen Stil)
- [ ] Footer
- [ ] CTABand-Komponente (wiederverwendbar, Gold-Glow, Gold-Outline-Button)

### Phase 6 — Hero-Carousel
- [ ] HeroCarousel: Crossfade, Auto-Advance 5–6s endlos, Overlay-Verlauf + zentrierter Text bleiben fix über allen Slides, prefers-reduced-motion = statisch erstes Bild, optional dezente Dots, a11y (aria-live polite, Alt/Label)

### Phase 7 — Seiten (Copy 1:1 aus .dc.html, Akzentwörter als italic-Gold-<span>)
- [ ] Startseite (Hero-Carousel, Intro+Collage, Laufband, "festhalte"-Karten, "Werke"-Grid mit Versatz, Testimonials, Trust-Zeile, CTA-Band, Footer)
- [ ] Über mich
- [ ] Fotografie (6 alternierende Kategorie-Sektionen, exakte Copy + Rotationen + Wechsel-BG)
- [ ] Q+A (Desktop: 9 Karten offen; Mobile: Accordion, eine offen, erste initial offen)
- [ ] Kontakt (Formular + Client-Validierung, Quellen-Chips Single-Select, Datenschutz-Checkbox Pflicht, Submit gegen austauschbaren Server-Action/Route-Stub mit TODO für Mail-Service)

### Phase 8 — Interaktionen & Feinschliff
- [ ] Testimonial-Karussell (Pfeile + Dots, 3 Einträge, opt. Auto-Rotate 6s)
- [ ] Responsive gegen 1440/390 geprüft (Grids einspaltig, Bogen-Portraits mobil max ~300px zentriert)
- [ ] a11y: semantisches HTML, Alt aus Labels, Tastaturbedienung, sichtbare Focus-States
- [ ] prefers-reduced-motion überall respektiert

### Phase 9 — Doku & Abschluss
- [ ] PROJECT_README.md: Architektur/Ordnerstruktur + Run-Befehle; Platzhalter→echte Fotos ersetzen (Manifest, Keys, Schritte); wo Copy liegt + wie bearbeiten; CMS-Naht (welches Interface implementieren, was ein Adapter erfüllen muss); wo Tokens liegen
- [ ] `npm run build` + Lint + Typecheck sauber
- [ ] "Getroffene Entscheidungen"-Notiz in PROGRESS.md ergänzt

---

## Getroffene Entscheidungen
- Projekt-Root = `/Users/U730282/.private/PortfolioJoannaWildlight/` (Next.js-App direkt im Root, Design-Handoff bleibt in `design_handoff_joanna_wildlight/`).
- Testimonials: Das Design enthält nur 1 echtes Zitat (Sarah und Sven), zeigt aber 3 Dots. Einträge 2+3 sind als `isPlaceholder: true` markierte Platzhalter — vor Launch durch echte Google-Rezensionen ersetzen (`content/testimonials.ts`).
- ContentProvider: `getContentProvider()` in `lib/content/provider.ts` ist die einzige Austauschstelle für einen späteren CMS-Adapter; Getter laden content/-Module lazy via dynamic import.
