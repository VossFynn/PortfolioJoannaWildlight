import type { GlobalConfig } from "payload";

import { accentedTextField, imageField, metaField, stringListField } from "./fields/shared";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Kontakt",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    accentedTextField("headline"),
    { name: "intro", type: "textarea", required: true },
    {
      name: "form",
      type: "group",
      fields: [
        { name: "nameLabel", type: "text", required: true },
        { name: "emailLabel", type: "text", required: true },
        { name: "phoneLabel", type: "text", required: true },
        { name: "occasionLabel", type: "text", required: true },
        { name: "messageLabel", type: "text", required: true },
        { name: "sourceQuestion", type: "text", required: true },
        stringListField("sources", 'Auswahl-Chips "Wie hast du mich gefunden?"'),
        { name: "consentText", type: "text", required: true },
        { name: "submitLabel", type: "text", required: true },
      ],
    },
    {
      name: "side",
      type: "group",
      fields: [
        imageField("portraitImage", { required: true }),
        { name: "stickerLabel", type: "text", required: true },
        { name: "headline", type: "text", required: true },
        { name: "instagramTextBefore", type: "text", required: true },
      ],
    },
  ],
};
