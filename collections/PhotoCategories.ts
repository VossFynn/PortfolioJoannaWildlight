import type { CollectionConfig } from "payload";

/** Kategorie-Sektionen der Fotografie-Seite (je Kategorie ein Karussell). */
export const PhotoCategories: CollectionConfig = {
  slug: "photo-categories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "headline",
    defaultColumns: ["headline", "eyebrow", "order"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "Interner Schlüssel, z. B. \"familie\"." },
    },
    { name: "eyebrow", type: "text", required: true },
    { name: "headline", type: "text", required: true },
    { name: "text", type: "textarea", required: true },
    {
      name: "images",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
      required: true,
      minRows: 1,
      admin: { description: "Slides des Kategorie-Karussells, in Anzeigereihenfolge." },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { description: "Reihenfolge auf der Seite, aufsteigend." },
    },
  ],
};
