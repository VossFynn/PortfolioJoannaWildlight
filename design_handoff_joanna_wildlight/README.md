# Handoff: Joanna Wildlight — Portfolio-Website (Fotografin)

## Overview
5-seitige Portfolio-Website für Joanna Bartels („Joanna Wildlight"), Familien- & Paarfotografin aus Bremen. Seiten: **Startseite, Über mich, Fotografie, Q+A, Kontakt**. Stimmung: warm, natürlich, „golden hour" — ruhige Ivory-Basis, belebt durch verspielte Details (Collage-Hero, Polaroid, Sticker, Laufband-Zeilen, leicht gedrehte Karten).

## About the Design Files
Die HTML-Dateien in diesem Paket sind **Design-Referenzen (Prototypen in HTML)** — kein Produktionscode. Aufgabe: diese Designs im Ziel-Codebase-Umfeld (z. B. Next.js/Astro/React, oder statisches HTML/CSS falls kein Framework existiert) **nachbauen**, mit dessen etablierten Patterns. Jede Datei zeigt Desktop (1440 px) und Mobile (390 px) nebeneinander als Frames auf grauem Canvas — nur der Inhalt der weißen Frames ist die Website.

## Fidelity
**High-fidelity.** Farben, Typografie, Abstände und Copy sind final und sollen pixelgenau übernommen werden. Alle Bildflächen sind Platzhalter (gestreifte Flächen mit Monospace-Label wie „portrait joanna · hochformat") — sie beschreiben Motiv + Format und werden durch echte Fotos ersetzt. Der warme radial-gradient Schleier auf Platzhaltern entfällt bei echten Fotos.

## Design Tokens

### Farben
| Token | Hex | Verwendung |
|---|---|---|
| Ivory (Seitengrund) | `#F7F4EE` | Body-Hintergrund |
| Karte hell | `#FDFBF6` | Karten, Polaroid-Rahmen, Inputs, FAQ-Karten |
| Greige (Sektionen) | `#E4E1D8` | Alternierende Sektionshintergründe |
| Linie hell | `#EBE7DC` | Header-Border |
| Border Input | `#D5D0C3` | Input-Rahmen |
| Text dunkel | `#3B372F` | Headlines, Primärtext, dunkle Buttons |
| Text sekundär | `#5A5449` | Fließtext |
| Text tertiär | `#6E675E` / `#9A937F` | Subtext, Labels |
| Gold dunkel | `#8A6D3F` | Akzentwörter (italic), Links, Hover |
| Gold | `#B08A52` | Trennstriche (48×1 px), Sterne |
| Gold hell | `#C9A26A` | Punkte, CTA-Border dunkel, Glow-Gradients |
| Gold sehr hell | `#EDD9B8` | Akzentwörter/CTA-Text auf dunklem Grund |
| Dunkel (CTA-Band) | `#332F28` | CTA-Sektionen, Sticker-Badges |
| Dunkel (Footer) | `#2B2822` | Footer |

### Typografie
- **Display/Headlines:** `Cormorant Garamond` (Google Fonts), weight 400–600, italic für Akzente/Zitate.
- **Body/UI:** `Mulish` (Google Fonts), weight 400–600.
- Desktop: H1 50–52 px (w500), H2 38–44 px (w500), Body 17–18 px / line-height 1.8, Nav 15 px / letter-spacing 0.04em.
- Mobile: H1 32–40 px, H2 27–32 px, Body 16 px / lh 1.75.
- Akzentmuster: **ein Wort pro Headline** als `<span>` italic in `#8A6D3F` (auf hellem Grund) bzw. `#EDD9B8` (auf dunklem Grund). Beispiele: „da", „festhalte", „Werke", „fühlen", „ehrliche", „Geschichte", „euch", „echte", „offen", „Antworten".
- Logo: „JOANNA" 26 px, letter-spacing 0.28em + „WILDLIGHT" 9 px, letter-spacing 0.5em, Farbe `#9A937F` (Mobile: 20 px / 7 px).

### Sonstige Tokens
- Radius: Buttons/Pills `999px`; Karten `4px`; Bogen-Bilder (Arch) `230px 230px 4px 4px` (Desktop-Portrait), `130–160px` oben auf Karten/Mobile.
- Schatten: Frames `0 12px 48px rgba(59,55,47,0.14)`; Karten `0 6px 20px rgba(59,55,47,0.10)`; Polaroid/Sticker `0 8px 24px rgba(59,55,47,0.22)`; gedrehte Bilder `0 10px 30px rgba(59,55,47,0.14–0.16)`.
- Buttons: Höhe 52–56 px, Padding 0 32–44 px, letter-spacing 0.08em, 15 px. Varianten: Outline dunkel (Border `#3B372F`, Hover: gefüllt dunkel, Text ivory) · Gefüllt dunkel (`#3B372F`, Hover `#8A6D3F`) · Outline gold auf dunklem Grund (Border `#C9A26A`, Text `#EDD9B8`, Hover: gefüllt `#C9A26A`, Text `#332F28`).
- Trennstrich unter Headlines: 48×1 px (`#B08A52`), zentriert, margin 20–28 px.

## Wiederkehrende verspielte Elemente („lebendig")
1. **Laufband-Zeile:** horizontale Zeile zwischen Sektionen, 1 px Border oben+unten (`#E4E1D8`), Cormorant italic 18–22 px in `#8A6D3F`, Inhalt „ehrlich · natürlich · nah · voller Gefühl · …" (auf Fotografie: Kategorienamen). Empfohlen als endlose CSS-Marquee-Animation (translateX, ~30s linear infinite, duplizierter Inhalt).
2. **Sticker-Badge:** dunkle Pille (`#332F28`, Text `#EDD9B8`, radius 999px), `rotate(-4deg)`, Schatten — „★ 5,0 bei Google" (Startseite-Hero) und „★ Ich freue mich auf euch!" (Kontakt-Portrait).
3. **Polaroid:** kleines Foto mit weißem Rahmen (`#FDFBF6`, padding 8–9px, unten 26–30px), `rotate(5deg)`, überlappt das Bogen-Portrait rechts unten.
4. **Sonnenkreis:** weicher radialer Gold-Glow-Kreis (190–230 px, `rgba(201,162,106,0.45→transparent)`), hinter Hero-Headline, ragt rechts aus dem Viewport.
5. **Gedrehte Karten/Bilder:** Kategorie-Karten ±1.2°, Galeriebilder ±1–1.5°, mit Schatten. Bilder in Karten mit Bogen-Radius oben.
6. **Scroll-Reveals:** Sektionen sanft einblenden (opacity 0→1, translateY 24px→0, 0.6s ease-out, einmalig via IntersectionObserver). Karten in Grids mit 100 ms Stagger.

## Screens / Views

### 1. Startseite (`Startseite.dc.html`)
1. **Header** (88 px, Border unten `#EBE7DC`): Logo links, Nav rechts (Start · Über mich · Fotografie · Q + A · Kontakt), aktiver Link mit 1 px Gold-Unterstrich. Mobile: 64 px, Logo + Burger (zwei 24×1.5 px Linien, 48×48 px Hit-Target).
2. **Hero** (Desktop 680 px, Mobile 560 px): Vollbild-Familienfoto (golden hour), dunkler Verlauf nach unten (`rgba(46,42,35,0.62)→0.08`), zentriert unten: „JOANNA WILDLIGHT" Cormorant italic 58 px letter-spacing 0.16em + Subline „FAMILIEN & PAARFOTOGRAFIE" 17 px ls 0.28em uppercase. Mobile: linksbündig unten, 32/13 px.
3. **Intro** (Grid 1fr/460px, gap 96, padding 120): links H1 „Schön, dass du *da* bist!" + 2 Absätze + Outline-Button „Mehr über mich". Rechts **Collage**: Bogen-Portrait (580 px, arch 230px) + Sonnenkreis (oben rechts hinter Bild) + Polaroid „detail-foto" (150×190, rotate 5°) + Sticker „★ 5,0 bei Google" (links unten, rotate −4°). Mobile: verspielter Intro-Block — Headline mit Zeilenumbruch, Collage 430 px hoch (Portrait arch 160px + Polaroid 130×165 + Sticker), Text, gefüllter dunkler Button.
4. **Laufband** „ehrlich · natürlich · nah · voller Gefühl · …".
5. **Was ich für euch *festhalte*** (bg `#E4E1D8`, zentriert): 3 Karten (Familien / Paare / Schwangerschaft) — weißer Rahmen `#FDFBF6` mit 14 px padding, Bild mit Bogen oben (arch 150px, Desktop 360 px hoch), Titel Cormorant 28 px, Text 16 px, Rotation −1.2° / +1.2° / −1.2°. CTA-Outline-Button „Eure Geschichte festhalten". Mobile: Karten untereinander, Bild 330 px, arch 130px, gleiche Rotationen.
6. **Kleine *Werke* von mir** (zentriert, padding 120): 4-spaltiges Foto-Grid (400 px hoch, Spalten 1+3 mit margin-top 32 px für Versatz), Intro-Text, Outline-Button „Schau dir mehr an". Mobile: 2×2 Grid, 230 px, Versatz 20 px.
7. **Testimonials** (bg `#E4E1D8`): Karte `#F7F4EE` mit Zitat (Cormorant italic 24 px), Autor uppercase 15 px ls 0.14em, Pfeil-Buttons rund 52 px (Border `#9A937F`, Hover gold), 3 Dots (aktiv `#B08A52`). State: Karussell-Index. Mobile: Pfeile + Dots unter der Karte.
8. **Trust-Zeile** (2 Spalten): Instagram-Icon (Outline-Rounded-Square + Kreis) mit Link „Joanna.wildlight" · 5 Sterne `#B08A52` + „Vertrauen, das bleibt – 5,0 bei Google" + Outline-Button „Erfahrungen teilen".
9. **CTA-Band** (bg `#332F28`, Gold-Glow radial oben): H2 „Lust auf *echte* Erinnerungen?", Text `#CFC9BB`, Gold-Outline-Button „Termin anfrage", darunter Zitat Cormorant italic `#B0A890`.
10. **Footer** (bg `#2B2822`): Name, „Fotografin für Bremen und 25km Umkreis", Zitat, Links Datenschutz/Cookies/Impressum (Hover `#EDD9B8`), Copyright-Zeile mit Border oben `#3B372F`.

### 2. Über mich (`Ueber-mich.dc.html`)
1. Header (aktiv: Über mich).
2. **H1 zentriert**: „Echte Momente für Familien, die *fühlen* wollen, nicht posieren." + Gold-Trennstrich.
3. **Laufband** „ehrlich · natürlich · nah …".
4. **Intro-Grid** (460px/1fr): links Bogen-Portrait („portrait joanna mit kamera"), rechts H2 „Hey, ich bin Joanna." + 3 Absätze (Mama von zwei Kindern …).
5. **Meine Leidenschaft** (bg `#E4E1D8`, Grid 1fr/400px): Text links, Bild rechts 500 px, `rotate(1.5deg)` + Schatten (Mobile: −1.5°).
6. **Fakten** (zentriert, 4 Spalten): Gold-Punkt 10 px + Cormorant italic 24 px — „Kreativ & immer offen für Neues" / „Ehrlich, herzlich und gerne mal laut am Lachen" / „Tagträumerin mit Kamera" / „Nutella-Junkie & Pasta-Liebhaberin". H2: „Wer ich bin. Ein paar *ehrliche* Fakten". Mobile: untereinander.
7. **CTA-Band**: „Lasst uns eure *Geschichte* festhalten" + Gold-Outline-Button.
8. Footer.

### 3. Fotografie (`Fotografie.dc.html`)
1. Header (aktiv: Fotografie).
2. H1 „Kleiner Einblick in meine *Werke*" + Trennstrich.
3. **Laufband** mit Kategorienamen „Familien · Paare · Babybauch · Newborn · Mensch & Tier · Hochzeiten".
4. **6 alternierende Kategorie-Sektionen** (Grid 520px Bild / 1fr Text, gap 96, padding 112/120; Bildseite wechselt links/rechts; jede 2. Sektion bg `#E4E1D8`). Bilder 620 px hoch, abwechselnd `rotate(−1deg)` / `rotate(+1deg)` + Schatten. Textseite: Eyebrow uppercase 13 px ls 0.3em `#8A6D3F` (Kategoriename), H2 Cormorant 38 px in Anführungszeichen, Absatz 17 px.
   - Familien — „Zeitlose Erinnerungen für die ganze Familie"
   - Paare — „Eure Liebe im Mittelpunkt"
   - Babybauch — „Die Magie des Lebens."
   - Newborn | Baby — „So klein, so kostbar" (längerer Text inkl. 5.–14. Lebensmonat-Hinweis)
   - Mensch und Tier — „Eure Verbindung im Fokus"
   - Hochzeiten — „Eure Liebe - echt & unvergesslich"
   (Copy exakt aus der HTML-Datei übernehmen.) Mobile: Bild oben (440 px), Text darunter, gleiche Reihenfolge.
5. CTA-Band „Lasst uns eure *Geschichte* festhalten" + Absatz + Button. Footer.

### 4. Q+A (`QA.dc.html`)
1. Header (aktiv: Q + A). H1 „Fragen und *Antworten*" + Trennstrich + Laufband.
2. **Desktop:** 2-spaltiges Grid (padding 0 160px) mit 9 Karten (`#FDFBF6`, Border `#ECE8DD`, padding 36/40): Gold-Punkt 9 px, Frage Cormorant italic 26 px, Antwort 16 px — alle offen, kein Accordion.
3. **Mobile:** Accordion — Kopfzeile (Frage italic 21 px + „+"/„–" in `#8A6D3F`, min-height 44 px), genau eine offen (erste initial offen; Klick auf offene schließt sie). State: `open: number | -1`.
4. Die 9 Fragen/Antworten (Ort, Hochzeiten, Lieferzeit 3-4 Wochen, Ablauf, Regen, unbearbeitete Bilder, Outfits, Tiere, Bezahlung) exakt aus `QA.dc.html` (Logic-Block unten in der Datei) übernehmen.
5. CTA-Band „Noch Fragen *offen*?" + Button. Footer.

### 5. Kontakt (`Kontakt.dc.html`)
1. Header (aktiv: Kontakt). Grid 1fr/480px (gap 112).
2. **Formular links:** H1 „Erzählt mir von *euch*" + Trennstrich + Intro-Absatz. Felder: Name* + Email* (2-spaltig), Telefonnummer, „Anlass, gewünschter Zeitraum oder eure Vorstellung"*, Textarea „Erzählt mir von euch"* (5 rows). Inputs: 52 px hoch, bg `#FDFBF6`, Border `#D5D0C3`, radius 4px, Focus: 2 px Outline `#B08A52`. **Quellen-Chips** „Wie bist du auf mich aufmerksam geworden?": Social Media / Google / Empfehlungen / Anders — Pills 46 px, Single-Select (aktiv: bg+Border `#8A6D3F`, Text `#F7F4EE`). Datenschutz-Checkbox (accent `#8A6D3F`) + gefüllter Submit-Button „Anfrage senden" (Hover `#8A6D3F`). Validierung: Pflichtfelder, E-Mail-Format, Checkbox erforderlich.
3. **Seitenspalte rechts:** Bogen-Portrait (520 px, arch 240px) mit Sticker „★ Ich freue mich auf euch!" (unten mittig, rotate −4°), darunter Cormorant-Zeile + Instagram-Link.
4. Mobile: alles einspaltig, Formular zuerst. Footer (ohne CTA-Band).

## Interactions & Behavior
- **Nav:** aktive Seite mit Gold-Unterstrich; Links Hover `#8A6D3F`. Mobile-Burger öffnet Fullscreen/Drawer-Menü (bg `#F7F4EE`, Links Cormorant groß) — im Mock nicht ausgeführt, frei umsetzbar im gleichen Stil.
- **Buttons:** Hover-Transitionen ~0.2s ease (Farbe/Hintergrund).
- **Testimonial-Karussell:** Pfeile + Dots, 3 Einträge, optional Auto-Rotate 6 s.
- **FAQ-Accordion (mobile):** siehe oben; sanfte Höhen-Transition.
- **Laufband:** CSS-Marquee-Animation, pausiert bei `prefers-reduced-motion`.
- **Scroll-Reveals:** siehe „Wiederkehrende Elemente" Punkt 6; bei `prefers-reduced-motion` deaktivieren.
- **Responsive:** Breakpoints frei; Referenzen sind 1440 (Desktop) und 390 (Mobile). Grids kollabieren einspaltig, Bogen-Portraits max-width ~300 px zentriert.

## State Management
- `testimonialIndex: number` (Karussell)
- `faqOpen: number | -1` (Mobile-Accordion)
- `contactSource: string | null` (Chip-Auswahl), Formularfelder + `consent: boolean`
- Kein Datenfetching; Formular-Submit an gewünschtes Backend/Mail-Service (nicht Teil des Designs).

## Assets
- Alle Fotos: Platzhalter — durch echte Bilder von Joanna ersetzen (Labels in den HTML-Dateien nennen Motiv + Format, z. B. „familienfoto · querformat / golden hour").
- Fonts: Google Fonts „Cormorant Garamond" + „Mulish".
- Icons: Instagram-Glyphe als einfache Outline (Rounded Square + Kreis), Pfeile/Sterne als Text-Glyphen — durch Icon-Set des Codebases ersetzbar.

## Files
- `Startseite.dc.html`, `Ueber-mich.dc.html`, `Fotografie.dc.html`, `QA.dc.html`, `Kontakt.dc.html` — je Desktop-1440- und Mobile-390-Frame; exakte Copy, Farben und Maße im Markup (inline styles). Interaktive Logik (FAQ, Chips) im `<script data-dc-script>`-Block am Dateiende.
- `Final.dc.html` — Gesamtübersicht, importiert alle 5 Seiten.
- `support.js` — nur Preview-Runtime der Design-Umgebung, **nicht übernehmen**.
