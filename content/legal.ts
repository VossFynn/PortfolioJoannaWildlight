import type { LegalPageContent } from "@/scripts/seed-data/types";

/**
 * Rechtstexte (Basis: RECHTSTEXTE.md, Session 8). § 5 TMG dort ist durch das
 * DDG (Digitale-Dienste-Gesetz) abgelöst worden — Kicker/Abschnittstitel
 * nutzen die aktuelle Bezeichnung § 5 DDG. Editorial-Hinweise/TODOs aus
 * RECHTSTEXTE.md (Steuernummer, DB-Region, R2-Jurisdiktion, Resend) sind
 * bewusst nicht übernommen: entweder noch nicht bestätigt oder (Resend)
 * laut DEPLOYMENT.md noch nicht produktiv im Code angeschlossen.
 */
export const impressum: LegalPageContent = {
  meta: {
    title: "Impressum — Joanna Wildlight",
    description: "Impressum von Joanna Wildlight Fotografie gemäß § 5 DDG.",
  },
  kicker: "RECHTLICHES · § 5 DDG",
  headline: "Das *Kleingedruckte* — nur eben größer",
  subtitle:
    "Auch Wildblumen brauchen Wurzeln. Hier steht, wer hinter Joanna Wildlight steckt — schwarz auf Ivory.",
  badgeLabel: "★ Kurz, ehrlich, transparent",
  marqueeItems: [
    "Impressum",
    "Verantwortlich",
    "§ 5 DDG",
    "Urheberrecht",
    "Bildrechte",
    "Kontakt",
    "Verbraucherschlichtung",
  ],
  sections: [
    {
      number: "01",
      title: "Angaben gemäß § 5 DDG",
      paragraphs: [
        "Joanna Bartels\nFotografin (Geschäftsbezeichnung: „Joanna Wildlight“)\nVarreler Bäke 37G\n28259 Bremen",
      ],
    },
    {
      number: "02",
      title: "Kontakt",
      paragraphs: ["Telefon: 01737366934\nE-Mail: Joanna.fotografie5@gmail.com"],
    },
    {
      number: "03",
      title: "Verbraucherstreitbeilegung",
      paragraphs: [
        "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      number: "04",
      title: "Bildrechte",
      paragraphs: [
        "Alle auf dieser Website veröffentlichten Fotografien sind urheberrechtlich geschützt und Eigentum von Joanna Bartels, sofern nicht anders gekennzeichnet. Eine Verwendung, Vervielfältigung oder Weiterverbreitung ohne vorherige schriftliche Zustimmung ist nicht gestattet.",
      ],
    },
  ],
  note: {
    title: "Gut zu wissen",
    body: "Rückfragen zu diesen Angaben? Einfach eine Nachricht schreiben — die Kontaktdaten stehen oben.",
  },
};

export const datenschutz: LegalPageContent = {
  meta: {
    title: "Datenschutz — Joanna Wildlight",
    description:
      "Datenschutzerklärung von Joanna Wildlight: welche Daten beim Websitebesuch und über das Kontaktformular verarbeitet werden.",
  },
  kicker: "RECHTLICHES · DSGVO",
  headline: "Deine Daten in *guten Händen*",
  subtitle:
    "Ich sammle Momente, keine Daten. Hier erfährst du, was beim Besuch dieser Website und beim Ausfüllen des Kontaktformulars mit deinen Angaben passiert — ohne Juristendeutsch.",
  badgeLabel: "★ Keine Tracker, versprochen",
  marqueeItems: [
    "Datenschutz",
    "DSGVO",
    "Deine Rechte",
    "Transparenz",
    "Keine Tracker",
    "Hosting",
    "Kontaktformular",
    "Widerruf",
  ],
  sections: [
    {
      number: "01",
      title: "Datenschutz auf einen Blick",
      paragraphs: [
        "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.",
        "Wie erfassen wir deine Daten? Zum einen dadurch, dass du sie uns mitteilst — z. B. über das Kontaktformular. Andere Daten werden automatisch beim Besuch der Website durch unseren Hosting-Anbieter erfasst (technische Daten wie Browsertyp, Betriebssystem oder Uhrzeit des Seitenaufrufs). Diese Website setzt derzeit keine Analyse- oder Marketing-Tools ein, die darüber hinaus Daten erheben.",
        "Wofür nutzen wir deine Daten? Ein Teil dient der fehlerfreien Bereitstellung der Website. Über das Kontaktformular übermittelte Daten nutzen wir ausschließlich, um deine Anfrage zu bearbeiten und zu beantworten.",
      ],
    },
    {
      number: "02",
      title: "Hosting",
      paragraphs: [
        "Wir hosten die Inhalte dieser Website bei folgenden Anbietern.",
        "Netlify: Anbieter ist die Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA. Netlify stellt die Server bereit, auf denen diese Website ausgeliefert wird, und verarbeitet dabei automatisch technische Zugriffsdaten (siehe „Server-Log-Dateien“). Die Datenübertragung in die USA stützt sich laut Netlify auf die Standardvertragsklauseln der EU-Kommission (netlify.com/privacy).",
        "Datenbank (Netlify DB / Neon): Die über das Kontaktformular übermittelten Daten werden in einer PostgreSQL-Datenbank gespeichert, die als „Netlify DB“ (technisch auf Basis von Neon) direkt bei Netlify betrieben wird. Auch hier gilt vorsorglich dieselbe Absicherung wie oben (Standardvertragsklauseln), da die Datenbank über Netlifys Infrastruktur läuft.",
        "Cloudflare R2 (Medien-Speicher): Bilder und andere Medien werden über Cloudflare R2 ausgeliefert, einem Dienst der Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA. Unabhängig von der konfigurierten Speicherregion stützt sich die Datenübertragung, soweit erforderlich, auf die Standardvertragsklauseln der EU-Kommission (cloudflare.com/privacypolicy).",
        "Die Nutzung der genannten Dienste erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen Darstellung der Website). Mit allen genannten Anbietern bestehen die jeweiligen Verträge zur Auftragsverarbeitung (AVV).",
      ],
    },
    {
      number: "03",
      title: "Allgemeine Hinweise & deine Rechte",
      paragraphs: [
        "Die Betreiberin dieser Seiten nimmt den Schutz deiner persönlichen Daten sehr ernst und behandelt sie vertraulich, entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Erklärung. Die Datenübertragung im Internet kann Sicherheitslücken aufweisen — ein lückenloser Schutz vor dem Zugriff durch Dritte ist nicht möglich.",
        "Verantwortliche Stelle: Joanna Bartels, Varreler Bäke 37G, 28259 Bremen, Telefon: 01737366934, E-Mail: Joanna.fotografie5@gmail.com.",
        "Speicherdauer: Soweit hier keine speziellere Speicherdauer genannt ist, verbleiben deine Daten bei uns, bis der Zweck der Verarbeitung entfällt. Bei einem berechtigten Löschersuchen oder Widerruf werden sie gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
        "Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung, erkennbar an „https://“ in der Adresszeile.",
        "Dir stehen im Rahmen der geltenden Bestimmungen jederzeit folgende Rechte zu, außerdem kannst du eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen:",
      ],
      pills: [
        "Auskunft",
        "Berichtigung",
        "Löschung",
        "Einschränkung",
        "Datenübertragbarkeit",
        "Widerspruch",
        "Beschwerde bei der Aufsichtsbehörde",
      ],
    },
    {
      number: "04",
      title: "Server-Log-Dateien",
      paragraphs: [
        "Unser Hosting-Anbieter Netlify erfasst automatisch Informationen in Server-Log-Dateien, die dein Browser automatisch übermittelt. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt; die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung der Website).",
      ],
      list: [
        "Browsertyp und Browserversion",
        "verwendetes Betriebssystem",
        "Referrer URL",
        "Hostname des zugreifenden Rechners",
        "Uhrzeit der Serveranfrage",
        "IP-Adresse",
      ],
    },
    {
      number: "05",
      title: "Cookies",
      paragraphs: [
        "Diese Website verwendet derzeit keine Cookies zu Analyse-, Tracking- oder Marketingzwecken. Es kommen keine Cookie-Banner-pflichtigen Dienste wie Google Analytics, Werbe-Pixel oder vergleichbare Tools zum Einsatz.",
        "Ein Cookie wird ausschließlich im internen, passwortgeschützten Administrationsbereich gesetzt (technisch notwendiges Session-Cookie zur Anmeldung) — für gewöhnliche Besucher:innen nicht zugänglich und nicht relevant.",
        "Sollten künftig zusätzliche Cookies eingesetzt werden, wird diese Erklärung entsprechend aktualisiert und, soweit gesetzlich erforderlich, vorab deine Einwilligung eingeholt.",
      ],
    },
    {
      number: "06",
      title: "Kontaktformular, Anfrage & Instagram",
      paragraphs: [
        "Kontaktformular: Wenn du uns per Kontaktformular Anfragen zukommen lässt, speichern wir die eingegebenen Daten — Name, E-Mail-Adresse, optional Telefonnummer, Angaben zu Anlass/Zeitraum/Vorstellung des Shootings, deine Nachricht sowie optional, wie du auf uns aufmerksam geworden bist — zwecks Bearbeitung der Anfrage. Die Speicherung erfolgt in einer Datenbank (siehe „Hosting“), auf die ausschließlich die Websitebetreiberin über einen passwortgeschützten Adminbereich Zugriff hat. Wir geben diese Daten nicht ohne deine Einwilligung weiter.",
        "Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du durch das Ankreuzen der Checkbox im Formular erteilst und jederzeit mit Wirkung für die Zukunft widerrufen kannst, sowie ergänzend auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage der Anbahnung eines Vertrags (Fotoshooting) dient. Deine Angaben verbleiben bei uns, bis du uns zur Löschung aufforderst, deine Einwilligung widerrufst oder der Zweck der Speicherung entfällt — zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.",
        "Anfrage per E-Mail oder Telefon: Kontaktierst du uns per E-Mail oder Telefon, speichern und verarbeiten wir deine Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung deines Anliegens (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Wir geben diese Daten nicht ohne deine Einwilligung weiter.",
        "Instagram: Im Footer und auf der Kontaktseite verlinken wir auf unser Instagram-Profil — ein einfacher Hyperlink, kein eingebettetes Social-Media-Plugin. Beim Aufruf dieser Website werden daher keine Daten an Instagram/Meta übertragen. Erst wenn du aktiv auf den Link klickst und instagram.com besuchst, gilt dort die Datenschutzerklärung von Meta Platforms Ireland Limited.",
      ],
    },
  ],
  note: {
    title: "Kurz gesagt",
    body: "Nur was du uns im Formular anvertraust, landet bei uns — und bleibt dort, bis du etwas anderes möchtest. Fragen zum Datenschutz? Einfach eine Nachricht schreiben.",
  },
};
