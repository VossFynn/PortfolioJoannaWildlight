# PROGRESS — Joanna Wildlight Portfolio

## Stand
- Zuletzt erledigt (Session 4): Intro-Collage-Bug behoben (ArchImage bekam `absolute` in die intern `relative` Fläche — `.relative` gewinnt in der CSS-Reihenfolge, Bogen-Portrait kollabierte auf 0px; jetzt Wrapper-Div positioniert). Marquee: mehr Wörter + selbstskalierende Wiederholung/Dauer (Leerraum auf breiten Viewports behoben). Fotografie: CategoryCarousel je Sektion (Crossfade, klickbare Dots) + Lightbox (Klick vergrößert, Esc/Klick schließt); Manifest um kat-*-2/3-Slides ergänzt, PhotoCategory.imageKey → imageKeys[]. Hero-/Testimonial-Dots jetzt klickbare Buttons. Scroll: smooth + scroll-snap y proximity auf Sektionsanfänge (scroll-padding = Headerhöhe). Logo-PNG randlos beschnitten (war 283×129 mit Wortmark nur 147×57) und 2x gespeichert → wirkt im Header design-groß ohne Header-Vergrößerung. Danach: Lightbox-Zoom auf ALLE Content-Bilder ausgeweitet — PlaceholderImage ist jetzt Client-Komponente mit `expandable` (Default an, gilt via ArchImage/Polaroid überall); Lightbox nach components/primitives/ verschoben; Hero-Titel + inaktive Slides pointer-events-none, damit der Zoom-Klick durchkommt.
- In Arbeit / Als Nächstes: offen bleiben Inhalts-TODOs: 2 echte Testimonials, Mail-Service in lib/contact/submit.ts, Datenschutz/Impressum-Links im Footer (href="#"); Logo-Quelle ist nur 155×65 — für gestochen scharfes Retina wäre ein höher aufgelöster Export gut.
- Deployment: Pages lief kurz auf build_type "legacy" (Branch-Root via Jekyll → README wurde als Startseite gerendert). Per `gh api -X PUT repos/VossFynn/PortfolioJoannaWildlight/pages -f build_type=workflow` auf GitHub Actions umgestellt (2026-07-19); Live-Site verifiziert. Falls je wieder die README erscheint: Settings → Pages → Source muss "GitHub Actions" sein.
- Blocker/Notizen: Tailwind v4 → Theme-Mapping in globals.css via @theme inline (kein tailwind.config). Achtung: `rtk next build` meldete einmal fälschlich Erfolg aus stalem Zustand — zur Verifikation `npx next build` direkt nutzen und Routen-Liste prüfen. Die vom User gelieferten Bilddateien waren AVIF mit falscher Endung → per sips zu echten JPEG/PNG konvertiert. WICHTIG: PlaceholderImage/ArchImage nie `absolute` in className geben (Position-Konflikt) — Wrapper verwenden.
- Aktualisiert: Session 4, 2026-07-19

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
- [x] Bild-Manifest: semantischer Key → { src: null, label, motiv/format, ratio }
- [x] Placeholder-Komponente (ohne src: gestreift + Monospace-Label + warmer Radial-Glow; mit src: next/image ohne Glow)

### Phase 4 — Primitive
- [x] Button (Varianten: Outline dunkel, Gefüllt dunkel, Outline gold auf dunklem Grund) + Hover-Transitions
- [x] Marquee/Laufband (endlos ~30s, Inhalt dupliziert, pausiert bei prefers-reduced-motion)
- [x] StickerBadge, Polaroid, ArchImage (Bogen-Radius), SunCircle, SectionDivider (48×1px Gold)
- [x] ScrollReveal (IntersectionObserver, einmalig, opt. Stagger; bei reduced-motion deaktiviert)

### Phase 5 — Layout
- [x] Header/Nav (aktive Seite Gold-Unterstrich, Hover gold; Mobile-Burger → Fullscreen-Drawer im gleichen Stil)
- [x] Footer
- [x] CTABand-Komponente (wiederverwendbar, Gold-Glow, Gold-Outline-Button)

### Phase 6 — Hero-Carousel
- [x] HeroCarousel: Crossfade, Auto-Advance 5–6s endlos, Overlay-Verlauf + zentrierter Text bleiben fix über allen Slides, prefers-reduced-motion = statisch erstes Bild, optional dezente Dots, a11y (aria-live polite, Alt/Label)

### Phase 7 — Seiten (Copy 1:1 aus .dc.html, Akzentwörter als italic-Gold-<span>)
- [x] Startseite (Hero-Carousel, Intro+Collage, Laufband, "festhalte"-Karten, "Werke"-Grid mit Versatz, Testimonials, Trust-Zeile, CTA-Band, Footer)
- [x] Über mich
- [x] Fotografie (6 alternierende Kategorie-Sektionen, exakte Copy + Rotationen + Wechsel-BG)
- [x] Q+A (Desktop: 9 Karten offen; Mobile: Accordion, eine offen, erste initial offen)
- [x] Kontakt (Formular + Client-Validierung, Quellen-Chips Single-Select, Datenschutz-Checkbox Pflicht, Submit gegen austauschbaren Server-Action/Route-Stub mit TODO für Mail-Service)

### Phase 8 — Interaktionen & Feinschliff
- [x] Testimonial-Karussell (Pfeile + Dots, 3 Einträge, opt. Auto-Rotate 6s)
- [x] Responsive gegen 1440/390 geprüft (Grids einspaltig, Bogen-Portraits mobil max ~300px zentriert)
- [x] a11y: semantisches HTML, Alt aus Labels, Tastaturbedienung, sichtbare Focus-States
- [x] prefers-reduced-motion überall respektiert

### Phase 9 — Doku & Abschluss
- [x] PROJECT_README.md: Architektur/Ordnerstruktur + Run-Befehle; Platzhalter→echte Fotos ersetzen (Manifest, Keys, Schritte); wo Copy liegt + wie bearbeiten; CMS-Naht (welches Interface implementieren, was ein Adapter erfüllen muss); wo Tokens liegen
- [x] `npm run build` + Lint + Typecheck sauber
- [x] "Getroffene Entscheidungen"-Notiz in PROGRESS.md ergänzt

---

## Getroffene Entscheidungen
- Projekt-Root = `/Users/U730282/.private/PortfolioJoannaWildlight/` (Next.js-App direkt im Root, Design-Handoff bleibt in `design_handoff_joanna_wildlight/`).
- Testimonials: Das Design enthält nur 1 echtes Zitat (Sarah und Sven), zeigt aber 3 Dots. Einträge 2+3 sind als `isPlaceholder: true` markierte Platzhalter — vor Launch durch echte Google-Rezensionen ersetzen (`content/testimonials.ts`).
- ContentProvider: `getContentProvider()` in `lib/content/provider.ts` ist die einzige Austauschstelle für einen späteren CMS-Adapter; Getter laden content/-Module lazy via dynamic import.
- Platzhalter-Streifen in 3 Tönen (ivory/greige/card) als Tokens, exakt nach den drei Streifen-Paaren im Design; Karten-/Polaroid-Flächen nutzen `tone="card"`.
- Hero-Carousel: 5,5s-Intervall, 1s-Crossfade; Dots werden bei prefers-reduced-motion per `motion-reduce:hidden` ausgeblendet (statisch = erstes Bild).
- Q+A mobil: Accordion mit genau einer offenen Frage (erste initial), erneutes Tippen schließt (`open = -1`), wie im data-dc-script der Referenz.
- Kontakt-Submit: Server Action `submitContactRequest` in `app/kontakt/actions.ts` als Stub (loggt + validiert minimal); TODO Mail-Service dort dokumentiert, Signatur stabil halten.
- Fehlermeldungen im Formular: italic Gold-Dark (Design definiert keine Fehlerfarbe).
- Footer-Sonderfarben (#EDEAE0/#A8A190/#C0B9A6/#7E786A) als eigene Tokens ergänzt statt Hex in der Komponente.
