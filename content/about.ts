import type { AboutContent } from "@/lib/content/types";

export const about: AboutContent = {
  meta: {
    title: "Über mich — Joanna Wildlight",
    description:
      "Hey, ich bin Joanna. Mama von zwei wundervollen Kindern und Fotografin mit ganzem Herzen. Echte Momente für Familien, die fühlen wollen, nicht posieren.",
  },
  headline: "Echte Momente für Familien, die *fühlen* wollen, nicht posieren.",
  marqueeItems: ["ehrlich", "natürlich", "nah", "voller Gefühl"],
  intro: {
    portraitKey: "portrait-joanna-kamera",
    headline: "Hey, ich bin Joanna.",
    paragraphs: [
      "Ich bin Mama von zwei wundervollen Kindern und Fotografin mit ganzem Herzen.",
      "Erst als ich selbst Mama wurde, habe ich verstanden, wie wertvoll diese kleinen, flüchtigen Momente sind.",
      "Genau diese halte ich für euch fest. Ehrlich, natürlich und voller Gefühl.",
    ],
  },
  passion: {
    headline: "Meine Leidenschaft",
    paragraphs: [
      "Ich fotografiere Familien, Paare, Kinder und werdende Eltern, am liebsten draußen in der Natur, dort, wo die echten Geschichten entstehen.",
      "Mir ist es wichtig, dass ihr euch wohlfühlt und dass nichts gestellt ist.",
      "Ich begleite euch mit meinem offenen Blick und viel Herz und halte fest, was ihr vielleicht im Alltag gar nicht bemerkt. Die zarten Verbindungen, das echte Lächeln, den kleinen Zauber im Moment.",
    ],
    imageKey: "shooting-natur",
  },
  facts: {
    headline: "Wer ich bin. Ein paar *ehrliche* Fakten",
    items: [
      "Kreativ & immer offen für Neues",
      "Ehrlich, herzlich und gerne mal laut am Lachen",
      "Tagträumerin mit Kamera",
      "Nutella-Junkie & Pasta-Liebhaberin",
    ],
  },
  cta: {
    headline: "Lasst uns eure *Geschichte* festhalten",
    buttonLabel: "Termin anfrage",
    buttonHref: "/kontakt",
  },
};
