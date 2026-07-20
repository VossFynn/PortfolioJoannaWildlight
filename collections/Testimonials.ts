import type { CollectionConfig } from "payload";

/** Zitate im Testimonial-Karussell der Startseite. */
export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "quote", "order"],
  },
  defaultSort: "order",
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "author", type: "text", required: true },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { description: "Reihenfolge im Karussell, aufsteigend." },
    },
  ],
};
