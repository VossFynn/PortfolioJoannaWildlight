import type { GlobalConfig } from "payload";

import { accentedTextField, ctaField, imageField, metaField, stringListField } from "./fields/shared";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    {
      name: "heroSlides",
      type: "array",
      required: true,
      minRows: 1,
      admin: { description: "Slides des Hero-Karussells auf der Startseite." },
      fields: [imageField("image", { required: true })],
    },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text", required: true },
      ],
    },
    {
      name: "intro",
      type: "group",
      fields: [
        accentedTextField("headline"),
        accentedTextField("headlineMobile", "Mobile Variante — \\n erzwingt einen Zeilenumbruch."),
        stringListField("paragraphs"),
        { name: "buttonLabel", type: "text", required: true },
        { name: "buttonHref", type: "text", required: true },
        imageField("portraitImage", { required: true }),
        imageField("polaroidImage", { required: true }),
        { name: "stickerLabel", type: "text", required: true },
      ],
    },
    stringListField("marqueeItems"),
    {
      name: "services",
      type: "group",
      label: "Was ich festhalte",
      fields: [
        accentedTextField("headline"),
        { name: "subline", type: "text", required: true },
        {
          name: "cards",
          type: "array",
          required: true,
          minRows: 1,
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea", required: true },
            imageField("image", { required: true }),
          ],
        },
        { name: "buttonLabel", type: "text", required: true },
        { name: "buttonHref", type: "text", required: true },
      ],
    },
    {
      name: "works",
      type: "group",
      label: "Kleine Werke",
      fields: [
        accentedTextField("headline"),
        { name: "text", type: "textarea", required: true },
        imageField("images", { hasMany: true, required: true, minRows: 1 }),
        { name: "buttonLabel", type: "text", required: true },
        { name: "buttonHref", type: "text", required: true },
      ],
    },
    {
      name: "testimonials",
      type: "group",
      fields: [{ name: "headline", type: "text", required: true }],
    },
    {
      name: "trust",
      type: "group",
      label: "Trust-Zeile",
      fields: [
        { name: "instagramTextBefore", type: "text", required: true },
        { name: "googleStarsLine", type: "text", required: true },
        { name: "reviewButtonLabel", type: "text", required: true },
        { name: "reviewUrl", type: "text", required: true },
      ],
    },
    ctaField,
  ],
};
