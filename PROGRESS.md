# PROGRESS — Joanna Wildlight Portfolio

## Stand
- Zuletzt erledigt (Session 7, /admin-500-Fix Root Cause): Live-`/admin` zeigte "This page couldn't load. Reload to try again, or go back." — sah wie ein Server-500 aus, war aber ein clientseitiger Hydration-Crash (kein `digest` an Next.js' `global-error.js`, curl auf `/admin`/`/admin/login` lieferte durchgehend valides 200-HTML). Ursache: `app/layout.tsx` (Root-Layout der Site, rendert eigenes `<html>`/`<body>`) wrappte `app/(payload)/layout.tsx`, dessen Payload-`RootLayout` (`@payloadcms/next/layouts`) ebenfalls ein eigenes `<html>`/`<body>` rendert — doppelt verschachteltes `<html>` auf jeder `/admin`-Route. Der Browser korrigiert das ungültige DOM beim Parsen, wodurch React beim Hydrieren clientseitig crasht. Fix nach Payloads dokumentiertem "Multiple Root Layouts"-Pattern: alle Frontend-Routen (`layout.tsx`, `page.tsx`, `not-found.tsx`, `globals.css`, alle Unterseiten) per `git mv` nach `app/(frontend)/` verschoben, sodass `(frontend)` und `(payload)` als gleichrangige, unabhängige Root-Layouts nebeneinander stehen (kein `app/layout.tsx` mehr auf true-root-Ebene). `icon.tsx`/`opengraph-image.tsx`/`robots.ts`/`sitemap.ts` bleiben auf true-root-Ebene (reine Metadata-Route-Handler, kein Root-Layout nötig). Reiner Rename, keine Inhaltsänderung (`git diff -M` zeigt 0 insertions/deletions). Lokal verifiziert via `next dev`: `/admin` + `/admin/login` liefern sauber 200 ohne Crash (vorher reproduzierte der Bug identisch auch im Dev-Server). Committed, noch nicht gepusht (User will Diff/Deploy selbst freigeben) — Live-Verifikation gegen `https://joanna-wildlight.netlify.app/admin` steht noch aus.
- Neu gefunden, nicht Teil des Fixes (Session 7): (1) `npx next build` crasht lokal auf diesem macOS-Rechner reproduzierbar (jedes Mal, auf wechselnden Seiten `/qa` oder `/kontakt`) mit `TypeError: Cannot read properties of undefined (reading 'split')` während des parallelen Prerenderings (13 Worker) — reproduziert identisch auf unverändertem `main` vor diesem Fix, also nicht durch die Route-Group-Umstrukturierung verursacht. Verdächtig: Build-Log zeigt `objc[...]: Class GNotificationCenterDelegate is implemented in both .../node_modules/@img/sharp-libvips-darwin-arm64/...8.18.3... and .../node_modules/next/node_modules/@img/sharp-libvips-darwin-arm64/...8.17.3...` (zwei verschiedene sharp/libvips-Versionen im selben Prozess geladen, macOS warnt selbst vor "spurious casting failures and mysterious crashes") — passt zum Fehlerbild. Tritt auf Netlifys Linux-Build nicht auf (letzte 3 Deploys alle `state: ready`), daher kein Blocker für Priority 1, aber lokal nervig; falls es weiter stört: `node_modules/next/node_modules/@img/sharp-libvips-darwin-arm64` vs. Top-Level-Version angleichen/dedupen. (2) Lokale Postgres-DB (Docker, Port 5433) ist komplett leer (0 Zeilen in `home_page`/`media`/`users` — nie geseedet in dieser Session) → alle Content-Seiten (`/`, `/ueber-mich`, `/fotografie`, `/qa`, `/kontakt`) crashen lokal in `next dev` mit `TypeError` in `components/primitives/Accent.tsx:19` (`text.split()` auf undefined CMS-Feld), weil Payload keine Inhalte liefert. Kein Bug im Code, nur fehlender lokaler Seed (`npm run seed` gegen die lokale DB laufen lassen, falls lokale Content-Vorschau gebraucht wird).
- Zuletzt erledigt (Session 6, Payload-CMS-Migration + Mobile-Bugfixes): Komplette Migration von statischem GitHub-Pages-Export auf Next.js-SSR + eingebettetes Payload CMS (Postgres via Netlify DB/Neon, Medien via Cloudflare R2 S3-Adapter), gehostet auf Netlify. Alle Seiten-Inhalte als Payload-Globals modelliert (SiteSettings, HomePage, AboutPage, PhotographyPage, FaqPage, ContactPage, Impressum-/DatenschutzPage), Testimonials/FaqItems/PhotoCategories als eigene Collections mit `order`-Feld. `PayloadContentProvider` (lib/content/provider.ts) implementiert das bestehende `ContentProvider`-Interface über Payloads Local API — Komponenten/Seiten mussten nur beim Bildsystem angefasst werden (imageKey-Manifest-Lookup → direkt aufgelöste {url,alt}-Objekte aus Payload-Media-Relationships; `lib/images/manifest.ts` und `lib/basePath.ts` komplett entfernt). `scripts/seed.ts` überträgt die bisherige Copy (content/*.ts, jetzt nur noch Seed-Quelle) + alle 17 Fotos einmalig nach Payload — end-to-end gegen lokales Postgres verifiziert (Media/Testimonials/FaqItems/PhotoCategories-Counts geprüft, alle 5+2 Routen + /admin + /api/contact-submissions curl-getestet, `next build` inkl. ISR-Revalidate 1m auf allen Seiten). Kontaktformular postet jetzt an `/api/contact-submissions` (öffentlicher create, read nur eingeloggt — Access-Control verifiziert). Zwei explizit gemeldete Mobile-Bugs behoben: Menü-Drawer war Kind des sticky Headers mit `top-16`-Lücke (Hintergrund blitzte durch, wenn Sticky-Positionierung während schnellem Scrollen hinterherhinkte) → Drawer jetzt per Portal in den Body, deckt volle Viewport-Höhe inkl. eigener Kopfzeile ab, unabhängig vom Live-Zustand des echten Headers; Routenwechsel hatten keinerlei Übergang → `PageTransition`-Komponente (Crossfade, respektiert prefers-reduced-motion) in app/layout.tsx. Zusätzlich im Zuge der Recherche gefunden und behoben: fehlendes Impressum/Datenschutz (rechtlich in Deutschland relevant, Footer-Links liefen bisher auf href="#") → echte Routen + CMS-editierbare Globals (Rechtstext selbst fehlt noch, TODO für Joanna), fehlender Favicon/OG-Image/sitemap.xml/robots.txt/404-Seite ergänzt, Next-Image-Optimizer jetzt nutzbar (kein `unoptimized`/basePath mehr nötig) wodurch der manuelle srcMobile-`<picture>`-Hack in PlaceholderImage entfallen konnte.
- Blocker/Notizen Session 6: Payload-CLI (`payload run`/`generate:*`/`migrate:*`) scheiterte auf diesem Node-26-Setup mit `ERR_REQUIRE_ASYNC_MODULE` beim Laden von payload.config.ts (Top-Level-Await in @payloadcms/richtext-lexical, CJS-require via tsx) — behoben durch `"type": "module"` in package.json (Next selbst lief davor schon unabhängig davon fehlerfrei). Docker Desktop war zu Sessionbeginn nicht gestartet; `open -a Docker` + kurz warten reichte. Lokale Verifikation lief komplett gegen echtes Postgres (docker-compose.yml, Port 5433) statt SQLite, um Prod-Parität zu haben — Migration `migrations/20260720_160913_initial_schema.ts` wurde bereits generiert und muss beim ersten Netlify-Deploy nicht neu erzeugt werden (nur `payload migrate` läuft, siehe netlify.toml Build-Command).
- Offen (nicht von hier aus erledigbar): Netlify-Account-Setup, `netlify db init`, Cloudflare-R2-Bucket + Public-URL, PAYLOAD_SECRET/Env-Vars in Netlify, erster Admin-User im Live-/admin, echter Rechtstext für Impressum/Datenschutz, Produktions-Seed gegen die echte DB — alles Schritt für Schritt in DEPLOYMENT.md dokumentiert.
- Frühere Session (5, Mobile-First-Pass): Scroll-Snap nur noch auf Desktop mit Maus (`@media (min-width:768px) and (pointer:fine)`) — das `y proximity`-Snap auf `html` kämpfte in iOS Safari gegen das Momentum-Scrolling und machte das Scrollen ruckelig. iOS-sicherer Scroll-Lock in `lib/scrollLock.ts` (overflow auf Root-Element statt nur Body; kein position:fixed-Trick, der würde den Sticky-Header verschieben) — genutzt von Lightbox + Mobile-Drawer. Lightbox rendert jetzt per `createPortal` in den Body: rotierte Rahmen (Polaroid/Karten mit `transform`) bildeten den Containing Block für `position:fixed`, das Overlay blieb im Rahmen gefangen. Bildflächen mobil von festen px-Höhen auf `aspect-[3/4]` (Karten, Werke-Grid, Kategorie-Karussells, Arch-Portraits) bzw. `aspect-square` (Hero) umgestellt — deutlich weniger Beschnitt der Hochformat-Fotos. Hero-Bilder bekamen 1080px-Mobile-Varianten (~185KB statt ~470KB, LCP) via `srcMobile` im Manifest + `<picture>`-Zweig in PlaceholderImage (Lightbox nutzt weiter die volle Auflösung). Marquee-Wortlisten auf about/faq/photography aufgefüllt (waren nur 4 bzw. 6 Einträge). `-webkit-tap-highlight-color: transparent`.
- Frühere Session (4): Intro-Collage-Bug behoben (ArchImage bekam `absolute` in die intern `relative` Fläche — `.relative` gewinnt in der CSS-Reihenfolge, Bogen-Portrait kollabierte auf 0px; jetzt Wrapper-Div positioniert). Marquee: mehr Wörter + selbstskalierende Wiederholung/Dauer (Leerraum auf breiten Viewports behoben). Fotografie: CategoryCarousel je Sektion (Crossfade, klickbare Dots) + Lightbox (Klick vergrößert, Esc/Klick schließt); Manifest um kat-*-2/3-Slides ergänzt, PhotoCategory.imageKey → imageKeys[]. Hero-/Testimonial-Dots jetzt klickbare Buttons. Scroll: smooth + scroll-snap y proximity auf Sektionsanfänge (scroll-padding = Headerhöhe). Logo-PNG randlos beschnitten (war 283×129 mit Wortmark nur 147×57) und 2x gespeichert → wirkt im Header design-groß ohne Header-Vergrößerung. Danach: Lightbox-Zoom auf ALLE Content-Bilder ausgeweitet — PlaceholderImage ist jetzt Client-Komponente mit `expandable` (Default an, gilt via ArchImage/Polaroid überall); Lightbox nach components/primitives/ verschoben; Hero-Titel + inaktive Slides pointer-events-none, damit der Zoom-Klick durchkommt.
- In Arbeit / Als Nächstes: offen bleiben Inhalts-TODOs: 2 echte Testimonials, Mail-Service in lib/contact/submit.ts, Datenschutz/Impressum-Links im Footer (href="#"); Logo-Quelle ist nur 155×65 — für gestochen scharfes Retina wäre ein höher aufgelöster Export gut.
- Deployment: Pages lief kurz auf build_type "legacy" (Branch-Root via Jekyll → README wurde als Startseite gerendert). Per `gh api -X PUT repos/VossFynn/PortfolioJoannaWildlight/pages -f build_type=workflow` auf GitHub Actions umgestellt (2026-07-19); Live-Site verifiziert. Falls je wieder die README erscheint: Settings → Pages → Source muss "GitHub Actions" sein.
- Blocker/Notizen: Tailwind v4 → Theme-Mapping in globals.css via @theme inline (kein tailwind.config). Achtung: `rtk next build` meldete einmal fälschlich Erfolg aus stalem Zustand — zur Verifikation `npx next build` direkt nutzen und Routen-Liste prüfen. Die vom User gelieferten Bilddateien waren AVIF mit falscher Endung → per sips zu echten JPEG/PNG konvertiert. WICHTIG: PlaceholderImage/ArchImage nie `absolute` in className geben (Position-Konflikt) — Wrapper verwenden.
- Aktualisiert: Session 5, 2026-07-19

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
- Testimonials: Das Design enthält nur 1 echtes Zitat (Sarah und Sven), zeigt aber 3 Dots. Einträge 2+3 sind weiterhin Platzhalter-Text — jetzt aber direkt in `/admin` unter Testimonials editierbar, kein Code-Deploy mehr nötig.
- ContentProvider: `getContentProvider()` in `lib/content/provider.ts` ist die einzige Austauschstelle für den Content-Adapter; seit Session 6 implementiert `PayloadContentProvider` das Interface über Payloads Local API (vorher `LocalContentProvider` mit dynamischem Import aus `content/`).
- Kontakt-Submit (korrigiert, Session 6): `submitContactRequest` liegt in `lib/contact/submit.ts` (Client-seitiger Fetch, keine Server Action) und postet an `/api/contact-submissions` (Payload-REST, öffentlicher create-Zugriff).
- Payload/Netlify-Stack (Session 6, mit Nutzer abgestimmt): Postgres via Netlify DB (Neon, ohne separaten Account) statt MongoDB/Turso; Medien via Cloudflare R2 (S3-Adapter, keine Egress-Kosten) statt Uploadthing/S3. Begründung: Netlify DB lässt sich direkt aus dem Netlify-Dashboard provisionieren (ein Account weniger), R2 passt gut zu einem foto-lastigen Portfolio (viel Traffic auf große Bilder, R2 verlangt dafür nichts extra).
- Platzhalter-Streifen in 3 Tönen (ivory/greige/card) als Tokens, exakt nach den drei Streifen-Paaren im Design; Karten-/Polaroid-Flächen nutzen `tone="card"`.
- Hero-Carousel: 5,5s-Intervall, 1s-Crossfade; Dots werden bei prefers-reduced-motion per `motion-reduce:hidden` ausgeblendet (statisch = erstes Bild).
- Q+A mobil: Accordion mit genau einer offenen Frage (erste initial), erneutes Tippen schließt (`open = -1`), wie im data-dc-script der Referenz.
- Kontakt-Submit: Server Action `submitContactRequest` in `app/kontakt/actions.ts` als Stub (loggt + validiert minimal); TODO Mail-Service dort dokumentiert, Signatur stabil halten.
- Fehlermeldungen im Formular: italic Gold-Dark (Design definiert keine Fehlerfarbe).
- Footer-Sonderfarben (#EDEAE0/#A8A190/#C0B9A6/#7E786A) als eigene Tokens ergänzt statt Hex in der Komponente.
