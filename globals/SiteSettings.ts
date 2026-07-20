import type { GlobalConfig } from "payload";

import { imageField } from "./fields/shared";

const navItemFields = [
  { name: "label", type: "text" as const, required: true },
  { name: "href", type: "text" as const, required: true },
];

/** Logo, Hauptnavigation, Footer, Instagram — überall im Layout verwendet. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "group",
      fields: [
        { name: "top", type: "text", required: true },
        { name: "bottom", type: "text", required: true },
        imageField("image", { description: "Logo-Datei (PNG, randlos beschnitten)." }),
      ],
    },
    {
      name: "nav",
      type: "array",
      required: true,
      minRows: 1,
      fields: navItemFields,
    },
    {
      name: "footer",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "tagline", type: "text", required: true },
        { name: "quote", type: "text", required: true },
        { name: "links", type: "array", required: true, fields: navItemFields },
        { name: "copyright", type: "text", required: true },
      ],
    },
    {
      name: "instagram",
      type: "group",
      fields: [
        { name: "handle", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
