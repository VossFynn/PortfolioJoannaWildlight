/**
 * Bild-Manifest: semantischer Key → Asset.
 * src ist heute überall null (Platzhalter). Echte Fotos einbinden:
 * Datei nach public/images/ legen und src auf "/images/<datei>" setzen —
 * die Placeholder-Komponente rendert dann automatisch next/image ohne Glow.
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
  "home-hero-1": { src: null, label: "familienfoto · querformat / golden hour", alt: "Familienfoto zur golden hour", glowX: 78 },
  "home-hero-2": { src: null, label: "familienfoto 2 · querformat / golden hour", alt: "Familienfoto zur golden hour", glowX: 40 },
  "home-hero-3": { src: null, label: "familienfoto 3 · querformat / golden hour", alt: "Familienfoto zur golden hour", glowX: 60 },

  /* Startseite — Intro-Collage */
  "portrait-joanna": { src: null, label: "portrait joanna · hochformat", alt: "Portrait von Joanna", glowX: 70 },
  "detail-foto": { src: null, label: "detail-foto", alt: "Detailfoto", glowX: 40 },

  /* Startseite — "Was ich festhalte"-Karten */
  "card-familie": { src: null, label: "familie · hochformat", alt: "Familienshooting", glowX: 60 },
  "card-paar": { src: null, label: "paar · hochformat", alt: "Paarshooting", glowX: 40 },
  "card-babybauch": { src: null, label: "babybauch · hochformat", alt: "Babybauchshooting", glowX: 70 },

  /* Startseite — "Kleine Werke"-Grid */
  "werk-1": { src: null, label: "foto 1", alt: "Ausgewähltes Foto 1", glowX: 50 },
  "werk-2": { src: null, label: "foto 2", alt: "Ausgewähltes Foto 2", glowX: 30 },
  "werk-3": { src: null, label: "foto 3", alt: "Ausgewähltes Foto 3", glowX: 65 },
  "werk-4": { src: null, label: "foto 4", alt: "Ausgewähltes Foto 4", glowX: 45 },

  /* Über mich */
  "portrait-joanna-kamera": { src: null, label: "portrait joanna mit kamera · hochformat", alt: "Joanna mit Kamera", glowX: 65 },
  "shooting-natur": { src: null, label: "shooting in der natur · hochformat", alt: "Shooting in der Natur", glowX: 45 },

  /* Fotografie — Kategorien */
  "kat-familie": { src: null, label: "familie · hochformat", alt: "Familienfotografie", glowX: 60 },
  "kat-paar": { src: null, label: "paar · hochformat", alt: "Paarfotografie", glowX: 40 },
  "kat-babybauch": { src: null, label: "babybauch · hochformat", alt: "Babybauchfotografie", glowX: 65 },
  "kat-newborn": { src: null, label: "newborn · hochformat", alt: "Newborn-Fotografie", glowX: 50 },
  "kat-mensch-tier": { src: null, label: "mensch & tier · hochformat", alt: "Mensch-und-Tier-Fotografie", glowX: 55 },
  "kat-hochzeit": { src: null, label: "hochzeit · hochformat", alt: "Hochzeitsfotografie", glowX: 45 },

  /* Kontakt */
  "portrait-joanna-kontakt": { src: null, label: "portrait joanna · hochformat", alt: "Portrait von Joanna", glowX: 65 },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof imageManifest;

export function getImage(key: string): ImageAsset {
  const asset = (imageManifest as Record<string, ImageAsset>)[key];
  if (!asset) throw new Error(`Unbekannter Bild-Key: ${key}`);
  return asset;
}
