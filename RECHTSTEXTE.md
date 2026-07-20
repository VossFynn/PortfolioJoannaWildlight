# Rechtstexte — Entwurf für Impressum & Datenschutzerklärung

Dieser Text ist zum direkten Kopieren in die Payload-Admin-Oberfläche gedacht:
`/admin` → Globals → **Impressum** bzw. **Datenschutz** → Feld „body" (Rich-Text).
Überschriften unten als Überschrift formatieren, Rest als normaler Absatz/Liste.

Basis: die bisherigen Wix-Seiten (`/impressum`, `/datenschutz`, `/cookies`),
angepasst an die neue Infrastruktur (Netlify statt Wix, Netlify-DB/Neon,
Cloudflare R2). Cookies sind auf Wunsch als Unterabschnitt in die
Datenschutzerklärung integriert, keine eigene Seite mehr — siehe
„Getroffene Entscheidungen" unten.

Stellen, die noch eine Entscheidung/Bestätigung von Joanna brauchen, sind mit
`[TODO: …]` markiert.

---

## Impressum

**Angaben gemäß § 5 TMG**

Joanna Bartels
Fotografin (Geschäftsbezeichnung: „Joanna Wildlight")
Varreler Bäke 37G
28259 Bremen

**Kontakt**

Telefon: 01737366934
E-Mail: Joanna.fotografie5@gmail.com

`[TODO: Steuernummer / USt-IdNr. oder Hinweis auf die Kleinunternehmerregelung
nach § 19 UStG ergänzen? Nicht gesetzlich vorgeschrieben, aber üblich, wenn du
Rechnungen stellst. Wenn du mir die Nummer/den Status nennst, ergänze ich den
Absatz.]`

**Verbraucherstreitbeilegung/Universalschlichtungsstelle**

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
einer Verbraucherschlichtungsstelle teilzunehmen.

**Bildrechte**

Alle auf dieser Website veröffentlichten Fotografien sind urheberrechtlich
geschützt und Eigentum von Joanna Bartels, sofern nicht anders gekennzeichnet.
Eine Verwendung, Vervielfältigung oder Weiterverbreitung ohne vorherige
schriftliche Zustimmung ist nicht gestattet.

*(Dieser letzte Absatz stand nicht im alten Impressum — ich habe ihn ergänzt,
weil er für ein Fotografie-Portfolio Standard und in deinem Interesse ist.
Sag Bescheid, falls er raus soll.)*

---

## Datenschutzerklärung

### 1. Datenschutz auf einen Blick

**Allgemeine Hinweise**

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
unserer unter diesem Text aufgeführten Datenschutzerklärung.

**Datenerfassung auf dieser Website**

*Wer ist verantwortlich für die Datenerfassung auf dieser Website?*

Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen
Stelle" in dieser Datenschutzerklärung entnehmen.

*Wie erfassen wir Ihre Daten?*

Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen —
z. B. über das Kontaktformular. Andere Daten werden automatisch beim Besuch
der Website durch unseren Hosting-Anbieter erfasst (technische Daten wie
Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Diese
Website setzt derzeit **keine** Analyse- oder Marketing-Tools ein, die
darüber hinaus Daten erheben.

*Wofür nutzen wir Ihre Daten?*

Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
Website zu gewährleisten. Über das Kontaktformular übermittelte Daten nutzen
wir ausschließlich, um Ihre Anfrage zu bearbeiten und zu beantworten.

*Welche Rechte haben Sie bezüglich Ihrer Daten?*

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu
verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
können Sie diese jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
jederzeit an uns wenden.

### 2. Hosting

Wir hosten die Inhalte unserer Website bei folgenden Anbietern:

**Netlify**

Anbieter ist die Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA
(nachfolgend „Netlify"). Netlify stellt die Server bereit, auf denen diese
Website ausgeliefert wird, und verarbeitet dabei automatisch technische
Zugriffsdaten (siehe „Server-Log-Dateien" unten).

Die Datenübertragung in die USA wird laut Netlify auf die
Standardvertragsklauseln der EU-Kommission gestützt. Details entnehmen Sie
der Datenschutzerklärung von Netlify: https://www.netlify.com/privacy/.

**Datenbank (Netlify DB / Neon)**

Die über das Kontaktformular übermittelten Daten werden in einer
PostgreSQL-Datenbank gespeichert, die als „Netlify DB" (technisch auf Basis
von Neon) direkt bei Netlify betrieben wird.

`[TODO: Region der Datenbank bestätigen. Bei der Einrichtung über
"netlify db init" bzw. die Neon-Extension lässt sich eine Region wählen — eine
EU-Region (z. B. Frankfurt) würde diesen Absatz zur Drittstaatenübermittlung
überflüssig machen. Bis das feststeht, gilt vorsorglich die gleiche
Absicherung wie oben bei Netlify (Standardvertragsklauseln), da die
Datenbank ohnehin über Netlifys Infrastruktur läuft.]`

**Cloudflare R2 (Medien-Speicher)**

Bilder und andere Medien werden über Cloudflare R2 ausgeliefert, einem
Dienst der Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
Der genutzte Speicherbereich (Bucket) ist nach aktueller technischer
Konfiguration auf die EU-Jurisdiktion eingestellt.

`[TODO: bitte im Cloudflare-Dashboard bestätigen, dass der produktive R2-
Bucket tatsächlich auf "EU jurisdiction" steht — die lokale Konfiguration
deutet stark darauf hin, ich kann es aber nicht von hier aus einsehen.]`

Unabhängig davon stützt sich die Datenübertragung, soweit erforderlich, auf
die Standardvertragsklauseln der EU-Kommission. Details:
https://www.cloudflare.com/privacypolicy/.

Die Verwendung der oben genannten Dienste erfolgt auf Grundlage von Art. 6
Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst
zuverlässigen Darstellung unserer Website. Mit allen genannten Anbietern
bestehen bzw. gelten die jeweiligen Verträge zur Auftragsverarbeitung (AVV).

### 3. Allgemeine Hinweise und Pflichtinformationen

**Datenschutz**

Die Betreiberin dieser Seiten nimmt den Schutz Ihrer persönlichen Daten sehr
ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
Datenschutzerklärung.

Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten
erhoben. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir
erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem
Zweck das geschieht.

Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der
Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.

**Hinweis zur verantwortlichen Stelle**

Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:

Joanna Bartels
Varreler Bäke 37G
28259 Bremen

Telefon: 01737366934
E-Mail: Joanna.fotografie5@gmail.com

Verantwortliche Stelle ist die natürliche oder juristische Person, die allein
oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
personenbezogenen Daten entscheidet.

**Speicherdauer**

Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer
genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck
für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen
geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen
Gründe für die Speicherung haben (z. B. steuer- oder handelsrechtliche
Aufbewahrungsfristen).

**Empfänger von personenbezogenen Daten**

Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn
dies zur Bereitstellung unserer Website erforderlich ist (siehe „Hosting"),
wenn wir gesetzlich hierzu verpflichtet sind, oder wenn eine sonstige
Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von
Auftragsverarbeitern geben wir personenbezogene Daten nur auf Grundlage eines
gültigen Vertrags über Auftragsverarbeitung weiter.

**Widerruf Ihrer Einwilligung zur Datenverarbeitung**

Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit
widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
Datenverarbeitung bleibt vom Widerruf unberührt.

**Beschwerderecht bei der zuständigen Aufsichtsbehörde**

Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei
einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres
gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
Verstoßes.

**Recht auf Datenübertragbarkeit**

Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen
Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.

**Auskunft, Berichtigung, Löschung und Einschränkung**

Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das
Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie
ggf. ein Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung
dieser Daten. Hierzu können Sie sich jederzeit an uns wenden.

**SSL-/TLS-Verschlüsselung**

Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine
verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
Browsers von „http://" auf „https://" wechselt.

### 4. Server-Log-Dateien

Unser Hosting-Anbieter Netlify erfasst automatisch Informationen in
sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt.
Dies sind:

- Browsertyp und Browserversion
- verwendetes Betriebssystem
- Referrer URL
- Hostname des zugreifenden Rechners
- Uhrzeit der Serveranfrage
- IP-Adresse

Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die
Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
Wir haben ein berechtigtes Interesse an der technisch fehlerfreien
Darstellung und der Optimierung unserer Website.

### 5. Cookies

Diese Website verwendet **derzeit keine Cookies zu Analyse-, Tracking- oder
Marketingzwecken**. Es kommen keine Cookie-Banner-pflichtigen Dienste wie
Google Analytics, Werbe-Pixel oder vergleichbare Tools zum Einsatz.

Ein Cookie wird ausschließlich im internen, passwortgeschützten
Administrationsbereich dieser Website gesetzt (technisch notwendiges
Session-Cookie zur Anmeldung), der ausschließlich von der Websitebetreiberin
selbst genutzt wird und für gewöhnliche Website-Besucher:innen nicht
zugänglich ist.

Sollten künftig zusätzliche Cookies (z. B. für Statistik- oder
Marketingzwecke) eingesetzt werden, wird diese Datenschutzerklärung
entsprechend aktualisiert und, soweit gesetzlich erforderlich, vorab Ihre
Einwilligung eingeholt.

### 6. Datenerfassung auf dieser Website

**Kontaktformular**

Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden die von
Ihnen eingegebenen Daten — Name, E-Mail-Adresse, optional Telefonnummer,
Angaben zu Anlass/Zeitraum/Vorstellung des Shootings, Ihre Nachricht sowie
optional, wie Sie auf uns aufmerksam geworden sind — zwecks Bearbeitung der
Anfrage bei uns gespeichert. Die Speicherung erfolgt in einer Datenbank (siehe
„Hosting"), auf die ausschließlich die Websitebetreiberin über einen
passwortgeschützten Adminbereich Zugriff hat. Diese Daten geben wir nicht
ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage Ihrer Einwilligung (Art.
6 Abs. 1 lit. a DSGVO), die Sie durch das Ankreuzen der entsprechenden
Checkbox im Formular erteilen und jederzeit mit Wirkung für die Zukunft
widerrufen können, sowie ergänzend auf Grundlage von Art. 6 Abs. 1 lit. b
DSGVO, soweit Ihre Anfrage der Anbahnung eines Vertrags (Fotoshooting) dient.

Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis
Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck
für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
Ihrer Anfrage). Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.

`[TODO — erst aktivieren, sobald die E-Mail-Benachrichtigung tatsächlich im
Code aktiv ist (aktuell laut DEPLOYMENT.md nur vorbereitet, aber nicht
angeschlossen):]`

*Zur Benachrichtigung über neue Anfragen wird zusätzlich eine
E-Mail-Weiterleitung über den Dienst Resend eingesetzt (Anbieter: Plus Five
Five, Inc., USA). Dabei werden die im Kontaktformular angegebenen Daten per
E-Mail an die Websitebetreiberin übermittelt. Details entnehmen Sie der
Datenschutzerklärung von Resend: https://resend.com/legal/privacy-policy.*

**Anfrage per E-Mail oder Telefon**

Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage
inklusive aller daraus hervorgehenden personenbezogenen Daten (Name,
Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und
verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt
oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen
übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
lit. f DSGVO).

**Hinweis zu externen Links (Instagram)**

Im Footer und auf der Kontaktseite verlinken wir auf unser Instagram-Profil.
Dabei handelt es sich um einen einfachen Hyperlink, kein eingebettetes
Social-Media-Plugin. Beim Aufruf dieser Website werden daher **keine** Daten
an Instagram/Meta übertragen. Erst wenn Sie aktiv auf den Link klicken und
instagram.com besuchen, gelten die dortigen Datenschutzbestimmungen von Meta
Platforms Ireland Limited: https://privacycenter.instagram.com/policy/.

---

## Getroffene Entscheidungen (zu diesem Entwurf)

- **Cookies als eigene Seite vs. Unterabschnitt:** Auf Wunsch in die
  Datenschutzerklärung integriert (Abschnitt 5), keine eigene `/cookies`-Seite
  mehr. Begründung: keine eigene Cookie-Policy gesetzlich vorgeschrieben, die
  Website setzt aktuell ohnehin keine Tracking-Cookies, und der Footer-Link
  „Cookies" zeigte im Code bereits auf `/datenschutz`.
- **Adresse:** „Varreler Bäke 37G" übernommen (Schreibweise wie im alten
  Impressum; der alte Datenschutztext hatte einen Tippfehler).
- **Instagram/Meta-„gemeinsame Verantwortlichkeit"-Absatz** aus dem alten
  Datenschutztext entfernt, da auf der neuen Seite kein eingebettetes
  Instagram-Widget existiert, sondern nur ein normaler Link.
- **WIX-Hosting-Abschnitt** durch Netlify/Netlify-DB(Neon)/Cloudflare R2
  ersetzt.
- **Google-Fonts-Hinweis** bewusst weggelassen: `next/font/google` lädt die
  Schriften beim Build selbst und stellt sie self-hosted bereit, es gibt
  keine Laufzeit-Anfrage an Google-Server.

## Offene Punkte, die noch von dir kommen müssen

1. Steuernummer/USt-IdNr. bzw. Kleinunternehmer-Hinweis fürs Impressum (optional).
2. Bestätigung: liegt die Netlify-DB (Neon) in einer EU-Region? (Empfehlung:
   bei der Einrichtung bewusst eine EU-Region wählen, dann kann der
   Drittstaaten-Absatz in Abschnitt 2 später vereinfacht werden.)
3. Bestätigung: ist der produktive Cloudflare-R2-Bucket auf EU-Jurisdiktion
   eingestellt?
4. Den Resend-Absatz erst scharf schalten, wenn die E-Mail-Benachrichtigung
   tatsächlich implementiert ist.
