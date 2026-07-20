import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

import { metaField } from "./fields/shared";

/**
 * DSGVO verlangt eine Datenschutzerklärung, sobald personenbezogene Daten
 * verarbeitet werden (hier: das Kontaktformular). Der Footer-Link existierte
 * bisher als href="#" — hier nur das Gerüst, der Rechtstext muss von Joanna
 * kommen (z. B. via e-recht24-Generator, inkl. Angaben zu Hosting/CMS).
 */
export const DatenschutzPage: GlobalConfig = {
  slug: "datenschutz-page",
  label: "Datenschutz",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    { name: "headline", type: "text", required: true, defaultValue: "Datenschutzerklärung" },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor(),
      admin: {
        description: "TODO: echten Rechtstext eintragen (z. B. per e-recht24.de-Generator).",
      },
    },
  ],
};
