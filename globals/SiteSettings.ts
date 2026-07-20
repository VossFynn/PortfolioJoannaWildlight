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
    {
      name: "notifications",
      type: "group",
      fields: [
        {
          name: "contactEmail",
          type: "email",
          admin: {
            description:
              "Empfängt eine Benachrichtigung, sobald über das Kontaktformular eine neue Anfrage eingeht. Leer lassen, um Benachrichtigungen zu deaktivieren.",
          },
          // Not needed for the public site (nav/footer/etc.), so keep it out of the
          // public global read (site-settings has `read: () => true` at the global level).
          access: {
            read: ({ req: { user } }) => Boolean(user),
          },
        },
      ],
    },
  ],
};
