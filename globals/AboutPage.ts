import type { GlobalConfig } from "payload";

import { accentedTextField, ctaField, imageField, metaField, stringListField } from "./fields/shared";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Über mich",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    accentedTextField("headline"),
    stringListField("marqueeItems"),
    {
      name: "intro",
      type: "group",
      fields: [
        imageField("portraitImage", { required: true }),
        { name: "headline", type: "text", required: true },
        stringListField("paragraphs"),
      ],
    },
    {
      name: "passion",
      type: "group",
      label: "Leidenschaft",
      fields: [
        { name: "headline", type: "text", required: true },
        stringListField("paragraphs"),
        imageField("image", { required: true }),
      ],
    },
    {
      name: "facts",
      type: "group",
      label: "Fakten",
      fields: [accentedTextField("headline"), stringListField("items")],
    },
    ctaField,
  ],
};
