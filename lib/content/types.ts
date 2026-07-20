/**
 * Content-Typen der Website. Alle Texte/Bilder kommen aus Payload CMS via
 * PayloadContentProvider (lib/content/provider.ts).
 *
 * Konvention "AccentedText": ein String, in dem GENAU EIN Wort/Teilsatz mit
 * *Sternchen* markiert ist — es wird als italic-Gold-Akzent gerendert
 * (Komponente <Accent>). Beispiel: "Schön, dass du *da* bist!"
 */
export type AccentedText = string;

/**
 * Aufgelöste Bild-Referenz (Payload-Media → URL/Alt). `null` = noch kein
 * Bild hochgeladen, Frontend zeigt den gestreiften Design-Platzhalter.
 */
export interface ResolvedImage {
  url: string;
  alt: string;
  /** Winziges Vorschaubild als Data-URI (next/image `placeholder="blur"`), `null` bei älteren Uploads ohne Blur-Generierung. */
  blurDataURL: string | null;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

/** Hero-Slide des Startseiten-Carousels. */
export interface HeroImage {
  image: ResolvedImage | null;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Kategorie-Sektion auf der Fotografie-Seite. */
export interface PhotoCategory {
  slug: string;
  eyebrow: string;
  headline: string;
  text: string;
  /** Slides des Kategorie-Karussells; bei nur einem Bild gibt es keine Dots. */
  images: (ResolvedImage | null)[];
}

export type ContactSource = string;

export interface CtaBandContent {
  headline: AccentedText;
  text?: string | null;
  buttonLabel: string;
  buttonHref: string;
  quote?: string | null;
}

export interface SiteContent {
  logo: { top: string; bottom: string; image: ResolvedImage | null };
  nav: NavItem[];
  footer: {
    name: string;
    tagline: string;
    quote: string;
    links: NavItem[];
    copyright: string;
  };
  instagram: { handle: string; url: string };
}

export interface ServiceCard {
  title: string;
  text: string;
  image: ResolvedImage | null;
}

export interface HomeContent {
  meta: PageMeta;
  hero: { title: string; subtitle: string };
  intro: {
    headline: AccentedText;
    /** Mobile bricht die Headline um: "Schön, dass\ndu *da* bist!" */
    headlineMobile: AccentedText;
    paragraphs: string[];
    buttonLabel: string;
    buttonHref: string;
    portraitImage: ResolvedImage | null;
    polaroidImage: ResolvedImage | null;
    stickerLabel: string;
  };
  marqueeItems: string[];
  services: {
    headline: AccentedText;
    subline: string;
    cards: ServiceCard[];
    buttonLabel: string;
    buttonHref: string;
  };
  works: {
    headline: AccentedText;
    text: string;
    images: (ResolvedImage | null)[];
    buttonLabel: string;
    buttonHref: string;
  };
  testimonials: { headline: string };
  trust: {
    instagramTextBefore: string;
    googleStarsLine: string;
    reviewButtonLabel: string;
    reviewUrl: string;
  };
  cta: CtaBandContent;
}

export interface AboutContent {
  meta: PageMeta;
  headline: AccentedText;
  marqueeItems: string[];
  intro: { portraitImage: ResolvedImage | null; headline: string; paragraphs: string[] };
  passion: { headline: string; paragraphs: string[]; image: ResolvedImage | null };
  facts: { headline: AccentedText; items: string[] };
  cta: CtaBandContent;
}

export interface PhotographyContent {
  meta: PageMeta;
  headline: AccentedText;
  marqueeItems: string[];
  cta: CtaBandContent;
}

export interface FaqPageContent {
  meta: PageMeta;
  headline: AccentedText;
  marqueeItems: string[];
  cta: CtaBandContent;
}

export interface ContactContent {
  meta: PageMeta;
  headline: AccentedText;
  intro: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    occasionLabel: string;
    messageLabel: string;
    sourceQuestion: string;
    sources: ContactSource[];
    consentText: string;
    submitLabel: string;
  };
  side: {
    portraitImage: ResolvedImage | null;
    stickerLabel: string;
    headline: string;
    instagramTextBefore: string;
  };
}

/** Ein nummerierter Rechtstext-Abschnitt (Impressum/Datenschutz). */
export interface LegalSection {
  number: string;
  title: string;
  /** Jeder Absatz kann "\n" für Zeilenumbrüche enthalten (z. B. Adressblock). */
  paragraphs: string[];
  /** Optionale Aufzählung (z. B. Server-Log-Dateien). */
  list: string[];
  /** Optionale Chip-Liste (z. B. Rechte-Übersicht); letzter Eintrag wird hervorgehoben. */
  pills: string[];
}

/** Impressum/Datenschutz. */
export interface LegalPageContent {
  meta: PageMeta;
  kicker: string;
  headline: AccentedText;
  subtitle: string;
  badgeLabel: string;
  marqueeItems: string[];
  sections: LegalSection[];
  note: { title: string; body: string };
}

export type PageContentMap = {
  home: HomeContent;
  about: AboutContent;
  photography: PhotographyContent;
  faq: FaqPageContent;
  contact: ContactContent;
};

export type PageKey = keyof PageContentMap;
