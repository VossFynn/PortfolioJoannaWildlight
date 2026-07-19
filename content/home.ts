import type { HeroImage, HomeContent } from "@/lib/content/types";

export const heroImages: HeroImage[] = [
  { imageKey: "home-hero-1", alt: "Schwarz-weißes Familienfoto: Eltern und Kinder halten die neugeborenen Zwillinge" },
  { imageKey: "home-hero-2", alt: "Mutter kuschelt mit ihrem Baby in weißen Strickmützen" },
];

export const home: HomeContent = {
  meta: {
    title: "Joanna Wildlight — Familien & Paarfotografie in Bremen",
    description:
      "Hey, ich bin Joanna. Fotografin für echte, natürliche Momente. Ich halte fest, was bleibt: ehrlich, nah und voller Gefühl.",
  },
  hero: {
    title: "JOANNA WILDLIGHT",
    subtitle: "Familien & Paarfotografie",
  },
  intro: {
    headline: "Schön, dass du *da* bist!",
    headlineMobile: "Schön, dass\ndu *da* bist!",
    paragraphs: [
      "Hey, ich bin Joanna. Fotografin für echte, natürliche Momente.",
      "Ich halte fest, was bleibt: ehrlich, nah und voller Gefühl.",
    ],
    buttonLabel: "Mehr über mich",
    buttonHref: "/ueber-mich",
    portraitKey: "portrait-joanna",
    polaroidKey: "detail-foto",
    stickerLabel: "★ 5,0 bei Google",
  },
  marqueeItems: [
    "ehrlich",
    "natürlich",
    "nah",
    "voller Gefühl",
    "ungestellt",
    "warm",
    "lebendig",
    "golden hour",
    "echte Momente",
  ],
  services: {
    headline: "Was ich für euch *festhalte*",
    subline: "Ehrlich, natürlich und voller Gefühl.",
    cards: [
      {
        title: "Familien",
        text: "Echte Momente voller Nähe und Liebe.",
        imageKey: "card-familie",
      },
      {
        title: "Paare",
        text: "Eure Verbindung - genau so, wie sie ist.",
        imageKey: "card-paar",
      },
      {
        title: "Schwangerschaft",
        text: "Eine besondere Zeit, die viel zu schnell vergeht.",
        imageKey: "card-babybauch",
      },
    ],
    buttonLabel: "Eure Geschichte festhalten",
    buttonHref: "/kontakt",
  },
  works: {
    headline: "Kleine *Werke* von mir",
    text: "Hier bekommst du einen kleinen Einblick in meine liebsten Bilder und das, was ich fotografiere. Noch mehr Einblicke findest du auf Instagram.",
    imageKeys: ["werk-1", "werk-2", "werk-3", "werk-4"],
    buttonLabel: "Schau dir mehr an",
    buttonHref: "/fotografie",
  },
  testimonials: {
    headline: "Das sagen meine Kunden über mich und meine Arbeit",
  },
  trust: {
    instagramTextBefore: "Folge mir gerne auf Instagram",
    googleStarsLine: "Vertrauen, das bleibt – 5,0 bei Google",
    reviewButtonLabel: "Erfahrungen teilen",
    reviewUrl: "https://g.page/joannawildlight",
  },
  cta: {
    headline: "Lust auf *echte* Erinnerungen?",
    text: "Ich freue mich auf deine Nachricht - ob Fragen, Wünsche oder deinen Shootingtermin. Ich melde mich schnell bei dir zurück.",
    buttonLabel: "Termin anfrage",
    buttonHref: "/kontakt",
    quote: "„Wir machen Fotos als Rückfahrkarte zu einem sonst verlorenen Moment.“",
  },
};
