import type { CollectionConfig } from "payload";

/**
 * Datei liegt via S3-Storage-Plugin (payload.config.ts) auf Cloudflare R2.
 * Next/Image übernimmt responsive Skalierung zur Laufzeit (remotePatterns
 * in next.config.ts) — deshalb hier bewusst keine Payload-imageSizes.
 */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Alt-Text für Screenreader/SEO — kurz beschreiben, was im Bild passiert.",
      },
    },
  ],
};
