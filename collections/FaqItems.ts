import type { CollectionConfig } from "payload";

/** Fragen/Antworten der Q+A-Seite. */
export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
  },
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { description: "Reihenfolge auf der Seite, aufsteigend." },
    },
  ],
};
