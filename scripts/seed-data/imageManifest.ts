/**
 * Key → lokale Bilddatei + Alt-Text, ausschließlich für scripts/seed.ts:
 * jede Datei wird einmalig in die Payload-Media-Collection hochgeladen,
 * der Key dient nur als Brücke zu den imageKey-Referenzen in content/*.ts.
 * Nach dem Seeden ist diese Zuordnung Payload-intern (Media-IDs) und diese
 * Datei nicht mehr relevant.
 */
export interface SeedImage {
  file: string;
  alt: string;
}

export const seedImageManifest = {
  "home-hero-1": { file: "hero-familie.jpg", alt: "Schwarz-weißes Familienfoto: Eltern und Kinder halten die neugeborenen Zwillinge" },
  "home-hero-2": { file: "hero-mutter-baby.jpg", alt: "Mutter kuschelt mit ihrem Baby in weißen Strickmützen" },

  "portrait-joanna": { file: "joanna-portrait.jpg", alt: "Portrait von Joanna mit Hut im goldenen Abendlicht" },
  "detail-foto": { file: "mutter-kind-kuerbis.jpg", alt: "Mutter küsst ihr Kind auf einer Picknickdecke zwischen Kürbissen" },

  "card-familie": { file: "mutter-tochter.jpg", alt: "Mutter umarmt ihre Tochter auf einer sonnigen Wiese" },
  "card-paar": { file: "paar-heide.jpg", alt: "Paar sitzt lachend zusammen in der Heide" },
  "card-babybauch": { file: "babybauch-strand.jpg", alt: "Schwangeres Paar liegt aneinandergelehnt im Sand" },

  "werk-1": { file: "mutter-baby-sonnenblumen.jpg", alt: "Mutter hält ihr Baby im Sonnenblumenfeld" },
  "werk-2": { file: "kind-hund.jpg", alt: "Schwarz-weiß: Mädchen schmiegt sich an einen Australian Shepherd" },
  "werk-3": { file: "hochzeit-paar.jpg", alt: "Brautpaar mit wehendem Schleier unter Bäumen" },
  "werk-4": { file: "mutter-baby-herbst.jpg", alt: "Mutter hält ihr lachendes Baby mit Bommelmütze im Herbst" },

  "portrait-joanna-kamera": { file: "joanna-kamera.jpg", alt: "Joanna mit Kamera in der Natur im Gegenlicht" },
  "shooting-natur": { file: "joanna-hunde.jpg", alt: "Schwarz-weiß: Frau mit Blumenkranz und zwei Hunden im Wald" },

  "kat-familie": { file: "familie-wald.jpg", alt: "Mutter tobt mit ihren zwei Kindern auf einer Decke im Wald" },
  "kat-familie-2": { file: "mutter-tochter.jpg", alt: "Mutter umarmt ihre Tochter auf einer sonnigen Wiese" },
  "kat-familie-3": { file: "hero-familie.jpg", alt: "Schwarz-weißes Familienfoto: Eltern und Kinder halten die neugeborenen Zwillinge" },
  "kat-paar": { file: "paar-umarmung.jpg", alt: "Paar umarmt sich innig auf einer Landstraße" },
  "kat-paar-2": { file: "paar-heide.jpg", alt: "Paar sitzt lachend zusammen in der Heide" },
  "kat-babybauch": { file: "babybauch-strand.jpg", alt: "Schwangeres Paar liegt aneinandergelehnt im Sand" },
  "kat-newborn": { file: "mutter-baby-herbst.jpg", alt: "Mutter hält ihr lachendes Baby mit Bommelmütze im Herbst" },
  "kat-newborn-2": { file: "hero-mutter-baby.jpg", alt: "Mutter kuschelt mit ihrem Baby in weißen Strickmützen" },
  "kat-newborn-3": { file: "mutter-baby-sonnenblumen.jpg", alt: "Mutter hält ihr Baby im Sonnenblumenfeld" },
  "kat-mensch-tier": { file: "frau-hund-schnee.jpg", alt: "Frau kuschelt im Schnee mit ihrem Golden Retriever" },
  "kat-mensch-tier-2": { file: "kind-hund.jpg", alt: "Schwarz-weiß: Mädchen schmiegt sich an einen Australian Shepherd" },
  "kat-mensch-tier-3": { file: "joanna-hunde.jpg", alt: "Schwarz-weiß: Frau mit Blumenkranz und zwei Hunden im Wald" },
  "kat-hochzeit": { file: "hochzeit-paar.jpg", alt: "Brautpaar mit wehendem Schleier unter Bäumen" },

  "portrait-joanna-kontakt": { file: "joanna-portrait.jpg", alt: "Portrait von Joanna mit Hut im goldenen Abendlicht" },

  logo: { file: "logo.png", alt: "Joanna Wildlight Logo" },
} satisfies Record<string, SeedImage>;

export type SeedImageKey = keyof typeof seedImageManifest;
