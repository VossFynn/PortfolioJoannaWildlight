/**
 * Typen NUR für die Seed-Daten in content/*.ts (Klartext-Kopie aus der
 * ursprünglichen lokalen Content-Schicht, vor der Payload-Migration). Der
 * Seed-Script (scripts/seed.ts) liest diese Module und legt daraus die
 * echten Payload-Globals/-Collections an — die Live-App nutzt sie nicht
 * mehr, siehe lib/content/types.ts für die aktuellen Runtime-Typen.
 */
export type AccentedText = string;

export interface NavItem {
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface HeroImage {
  imageKey: string;
  alt: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  isPlaceholder?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PhotoCategory {
  slug: string;
  eyebrow: string;
  headline: string;
  text: string;
  imageKeys: string[];
}

export type ContactSource = string;

export interface CtaBandContent {
  headline: AccentedText;
  text?: string;
  buttonLabel: string;
  buttonHref: string;
  quote?: string;
}

export interface SiteContent {
  logo: { top: string; bottom: string };
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
  imageKey: string;
}

export interface HomeContent {
  meta: PageMeta;
  hero: { title: string; subtitle: string };
  intro: {
    headline: AccentedText;
    headlineMobile: AccentedText;
    paragraphs: string[];
    buttonLabel: string;
    buttonHref: string;
    portraitKey: string;
    polaroidKey: string;
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
    imageKeys: string[];
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
  intro: { portraitKey: string; headline: string; paragraphs: string[] };
  passion: { headline: string; paragraphs: string[]; imageKey: string };
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
    portraitKey: string;
    stickerLabel: string;
    headline: string;
    instagramTextBefore: string;
  };
}
