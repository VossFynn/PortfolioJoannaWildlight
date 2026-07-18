import type { FaqItem, FaqPageContent } from "@/lib/content/types";

export const faqPage: FaqPageContent = {
  meta: {
    title: "Q + A — Joanna Wildlight",
    description:
      "Fragen und Antworten rund um Shootings mit Joanna Wildlight: Ablauf, Ort, Bildabgabe, Outfits, Bezahlung und mehr.",
  },
  headline: "Fragen und *Antworten*",
  marqueeItems: ["ehrlich", "natürlich", "nah", "voller Gefühl"],
  cta: {
    headline: "Noch Fragen *offen*?",
    buttonLabel: "Termin anfrage",
    buttonHref: "/kontakt",
  },
};

export const faqItems: FaqItem[] = [
  {
    question: "Wo findet das Shooting statt?",
    answer:
      "Ich bin im Raum Bremen in einem Umkreis von ca. 30 km unterwegs - für Herzensprojekte auch mal weiter.",
  },
  {
    question: "Fotografierst du auch Hochzeiten?",
    answer:
      "Ja! Besonders gern kleine, intime Feiern voller Nähe und echter Emotionen. Wenn ihr euch in meinem Stil wiederfindet, freue ich mich auf eure Anfrage.",
  },
  {
    question: "Wie lange dauert es, bis wir die Bilder bekommen?",
    answer:
      "In der Regel dauert es ca. 3-4 Wochen. Ich nehme mir die Zeit, jede Aufnahme sorgfältig auszusuchen und zu bearbeiten, damit ihr euch lange daran erfreuen könnt.",
  },
  {
    question: "Wie läuft ein Shooting bei dir ab?",
    answer:
      "Ganz entspannt. Ich begleite euch mit Herz und einem offenen Blick. Kein Stress, nur ihr, so wie ihr seid. Ob draußen in der Natur oder bei euch zu Hause. Ich schaffe Raum, damit echte Momente entstehen können.",
  },
  {
    question: "Was, wenn es an unserem Tag regnet?",
    answer:
      "Kein Drama! Wir machen das Beste daraus. Ist es einigermaßen trocken, kann das Shooting i.d.R. stattfinden. Sollte es stark regnen, haben wir einen Ersatztermin, den wir vorher auch schon ausmachen.",
  },
  {
    question: "Bekomme ich auch die unbearbeiteten Bilder?",
    answer:
      "Nein. Ich gebe grundsätzlich keine unbearbeiteten Bilder heraus. Die Auswahl und Bearbeitung gehört zu meinem kreativen Prozess und sie machen den Look meiner Fotografie aus.",
  },
  {
    question: "Was sollen wir anziehen?",
    answer:
      "Am besten etwas, worin ihr euch wohlfühlt. Natürliche, gedeckte Farben passen am schönsten zu meinem Bildstil. Ich schicke euch gern vorab ein kleines Inspirations-PDF zur Outfitwahl.",
  },
  {
    question: "Fotografierst du auch Tiere?",
    answer:
      "Unbedingt! Tiere sind Familienmitglieder. Ich selbst lebe mit zwei Hunden und zwei Katzen zusammen und ich weiß, wie kostbar gemeinsame Erinnerungen mit ihnen sind. =)",
  },
  {
    question: "Wie können wir bei dir bezahlen?",
    answer:
      "Du kannst ganz entspannt per Überweisung oder Paypal bezahlen. Den Betrag solltest du innerhalb einer Woche begleichen.",
  },
];
