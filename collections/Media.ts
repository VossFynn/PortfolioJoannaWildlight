import type { CollectionConfig } from "payload";
import sharp from "sharp";

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
    {
      name: "blurDataURL",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (!req.file?.data) return data;
        // Winziges Vorschaubild als Data-URI fürs next/image-Blur-Placeholder
        // (siehe ResolvedImage/PlaceholderImage) — läuft auf dem Original-
        // Upload-Buffer, unabhängig von Payloads eigener imageSizes-Pipeline
        // (bewusst deaktiviert, siehe Kommentar oben). Schlägt sharp bei
        // einer nicht dekodierbaren Datei fehl, soll das den Upload nicht
        // blockieren — dann bleibt einfach kein Blur-Placeholder.
        try {
          const preview = await sharp(req.file.data)
            .resize(20, undefined, { fit: "inside" })
            .jpeg({ quality: 40 })
            .toBuffer();
          data.blurDataURL = `data:image/jpeg;base64,${preview.toString("base64")}`;
        } catch {
          data.blurDataURL = null;
        }
        return data;
      },
    ],
  },
};
