import type { PhotoCategory, PhotographyContent } from "@/lib/content/types";

export const photography: PhotographyContent = {
  meta: {
    title: "Fotografie — Joanna Wildlight",
    description:
      "Kleiner Einblick in meine Werke: Familien, Paare, Babybauch, Newborn, Mensch & Tier und Hochzeiten — ehrlich, natürlich und voller Gefühl.",
  },
  headline: "Kleiner Einblick in meine *Werke*",
  marqueeItems: [
    "Familien",
    "Paare",
    "Babybauch",
    "Newborn",
    "Mensch & Tier",
    "Hochzeiten",
  ],
  cta: {
    headline: "Lasst uns eure *Geschichte* festhalten",
    text: "Die Momente, die heute selbstverständlich wirken, sind morgen unbezahlbare Erinnerungen. Lasst uns gemeinsam etwas schaffen, das bleibt.",
    buttonLabel: "Termin anfrage",
    buttonHref: "/kontakt",
  },
};

export const photoCategories: PhotoCategory[] = [
  {
    slug: "familien",
    eyebrow: "Familien",
    headline: "„Zeitlose Erinnerungen für die ganze Familie“",
    text: "Im Alltag fehlt oft genau die Person, die die Erinnerung festhält. Bei eurem Shooting geht es nicht um Perfektion, sondern um euch als Familie - komplett, echt und nah. Mit all den kleinen Momenten, die später einmal unbezahlbar sind.",
    imageKeys: ["kat-familie", "kat-familie-2", "kat-familie-3"],
  },
  {
    slug: "paare",
    eyebrow: "Paare",
    headline: "„Eure Liebe im Mittelpunkt“",
    text: "Wann habt ihr euch das letzte mal bewusst Zeit für euch genommen? Ein Shooting ist eure gemeinsame Auszeit ohne Alltag, ohne Ablenkung. Nur ihr zwei und echte Momente, die bleiben.",
    imageKeys: ["kat-paar", "kat-paar-2"],
  },
  {
    slug: "babybauch",
    eyebrow: "Babybauch",
    headline: "„Die Magie des Lebens.“",
    text: "Die Zeit ist einmalig und oft viel zu schnell vorbei. Zwischen Vorbereitung und Alltag vergisst man leicht, wie besonders sie wirklich ist. Genau deshalb halte ich sie für euch fest, bevor sie einfach vorbeigeht.",
    imageKeys: ["kat-babybauch"],
  },
  {
    slug: "newborn",
    eyebrow: "Newborn | Baby",
    headline: "„So klein, so kostbar“",
    text: "Die ersten Tage mit eurem Baby sind leise, zart und voller Liebe. Während alles neu ist, vergeht genau diese Zeit viel zu schnell. Ich halte diese besonderen Momente fest, damit sie für immer bleiben. Die beste Zeit für ein Newborn-Shooting liegt meist zwischen dem 5. und 14. Lebensmonat. In dieser Zeit schlafen die Kleinen noch viel und lassen sich besonders ruhig fotografieren. Aber auch später sind wundervolle Aufnahmen möglich, dann einfach mit etwas mehr Bewegung und ganz eigenen Momenten. Ob bei euch zu Hause oder in der Natur, wir finden den passenden Rahmen für euch.",
    imageKeys: ["kat-newborn", "kat-newborn-2", "kat-newborn-3"],
  },
  {
    slug: "mensch-und-tier",
    eyebrow: "Mensch und Tier",
    headline: "„Eure Verbindung im Fokus“",
    text: "Sie gehören zu eurer Familie mit all ihrer Liebe und ihrem eigenen Charakter. Genau diese besondere Verbindung halte ich für euch fest - ehrlich, nah und so, wie sie wirklich ist.",
    imageKeys: ["kat-mensch-tier", "kat-mensch-tier-2", "kat-mensch-tier-3"],
  },
  {
    slug: "hochzeiten",
    eyebrow: "Hochzeiten",
    headline: "„Eure Liebe - echt & unvergesslich“",
    text: "Euer Hochzeitstag besteht aus so viel mehr als nur großen Momenten. Es sind die kleinen Blicke, die leisen Gesten und all die Gefühle dazwischen. Ich halte genau diese Augenblicke für euch fest - in Bildern, die ihr auch Jahre später noch spürt, wenn ihr sie anschaut.",
    imageKeys: ["kat-hochzeit"],
  },
];
