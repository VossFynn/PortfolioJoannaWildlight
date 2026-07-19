/**
 * Bild-Manifest: semantischer Key → Asset.
 * Fotos austauschen: Datei nach public/images/ legen und src auf
 * "/images/<datei>" setzen (src: null rendert wieder den gestreiften
 * Platzhalter mit Monospace-Label und Glow).
 * label = Monospace-Beschriftung des Platzhalters (Motiv · Format, aus dem Design).
 */
export interface ImageAsset {
  src: string | null;
  label: string;
  alt: string;
  /** Ausrichtung des warmen Radial-Glows auf dem Platzhalter (x% der Breite). */
  glowX?: number;
}

export const imageManifest = {
  /* Startseite — Hero-Carousel (Slides frei erweiterbar) */
  "home-hero-1": { src: "/images/hero-familie.jpg", label: "familienfoto · querformat / golden hour", alt: "Schwarz-weißes Familienfoto: Eltern und Kinder halten die neugeborenen Zwillinge", glowX: 78 },
  "home-hero-2": { src: "/images/hero-mutter-baby.jpg", label: "familienfoto 2 · querformat / golden hour", alt: "Mutter kuschelt mit ihrem Baby in weißen Strickmützen", glowX: 40 },

  /* Startseite — Intro-Collage */
  "portrait-joanna": { src: "/images/joanna-portrait.jpg", label: "portrait joanna · hochformat", alt: "Portrait von Joanna mit Hut im goldenen Abendlicht", glowX: 70 },
  "detail-foto": { src: "/images/mutter-kind-kuerbis.jpg", label: "detail-foto", alt: "Mutter küsst ihr Kind auf einer Picknickdecke zwischen Kürbissen", glowX: 40 },

  /* Startseite — "Was ich festhalte"-Karten */
  "card-familie": { src: "/images/mutter-tochter.jpg", label: "familie · hochformat", alt: "Mutter umarmt ihre Tochter auf einer sonnigen Wiese", glowX: 60 },
  "card-paar": { src: "/images/paar-heide.jpg", label: "paar · hochformat", alt: "Paar sitzt lachend zusammen in der Heide", glowX: 40 },
  "card-babybauch": { src: "/images/babybauch-strand.jpg", label: "babybauch · hochformat", alt: "Schwangeres Paar liegt aneinandergelehnt im Sand", glowX: 70 },

  /* Startseite — "Kleine Werke"-Grid */
  "werk-1": { src: "/images/mutter-baby-sonnenblumen.jpg", label: "foto 1", alt: "Mutter hält ihr Baby im Sonnenblumenfeld", glowX: 50 },
  "werk-2": { src: "/images/kind-hund.jpg", label: "foto 2", alt: "Schwarz-weiß: Mädchen schmiegt sich an einen Australian Shepherd", glowX: 30 },
  "werk-3": { src: "/images/hochzeit-paar.jpg", label: "foto 3", alt: "Brautpaar mit wehendem Schleier unter Bäumen", glowX: 65 },
  "werk-4": { src: "/images/mutter-baby-herbst.jpg", label: "foto 4", alt: "Mutter hält ihr lachendes Baby mit Bommelmütze im Herbst", glowX: 45 },

  /* Über mich */
  "portrait-joanna-kamera": { src: "/images/joanna-kamera.jpg", label: "portrait joanna mit kamera · hochformat", alt: "Joanna mit Kamera in der Natur im Gegenlicht", glowX: 65 },
  "shooting-natur": { src: "/images/joanna-hunde.jpg", label: "shooting in der natur · hochformat", alt: "Schwarz-weiß: Frau mit Blumenkranz und zwei Hunden im Wald", glowX: 45 },

  /* Fotografie — Kategorien */
  "kat-familie": { src: "/images/familie-wald.jpg", label: "familie · hochformat", alt: "Mutter tobt mit ihren zwei Kindern auf einer Decke im Wald", glowX: 60 },
  "kat-paar": { src: "/images/paar-umarmung.jpg", label: "paar · hochformat", alt: "Paar umarmt sich innig auf einer Landstraße", glowX: 40 },
  "kat-babybauch": { src: "/images/babybauch-strand.jpg", label: "babybauch · hochformat", alt: "Schwangeres Paar liegt aneinandergelehnt im Sand", glowX: 65 },
  "kat-newborn": { src: "/images/mutter-baby-herbst.jpg", label: "newborn · hochformat", alt: "Mutter hält ihr lachendes Baby mit Bommelmütze im Herbst", glowX: 50 },
  "kat-mensch-tier": { src: "/images/frau-hund-schnee.jpg", label: "mensch & tier · hochformat", alt: "Frau kuschelt im Schnee mit ihrem Golden Retriever", glowX: 55 },
  "kat-hochzeit": { src: "/images/hochzeit-paar.jpg", label: "hochzeit · hochformat", alt: "Brautpaar mit wehendem Schleier unter Bäumen", glowX: 45 },

  /* Kontakt */
  "portrait-joanna-kontakt": { src: "/images/joanna-portrait.jpg", label: "portrait joanna · hochformat", alt: "Portrait von Joanna mit Hut im goldenen Abendlicht", glowX: 65 },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof imageManifest;

export function getImage(key: string): ImageAsset {
  const asset = (imageManifest as Record<string, ImageAsset>)[key];
  if (!asset) throw new Error(`Unbekannter Bild-Key: ${key}`);
  return asset;
}
