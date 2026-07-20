import type { GlobalConfig } from "payload";

import {
  accentedTextField,
  legalNoteField,
  legalSectionsField,
  metaField,
  stringListField,
} from "./fields/shared";

/** DSGVO verlangt eine Datenschutzerklärung, sobald personenbezogene Daten verarbeitet werden. */
export const DatenschutzPage: GlobalConfig = {
  slug: "datenschutz-page",
  label: "Datenschutz",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    { name: "kicker", type: "text", required: true, defaultValue: "RECHTLICHES · DSGVO" },
    accentedTextField("headline"),
    { name: "subtitle", type: "textarea", required: true },
    { name: "badgeLabel", type: "text", required: true },
    stringListField("marqueeItems"),
    legalSectionsField,
    legalNoteField,
  ],
};
