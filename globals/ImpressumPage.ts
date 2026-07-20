import type { GlobalConfig } from "payload";

import {
  accentedTextField,
  legalNoteField,
  legalSectionsField,
  metaField,
  stringListField,
} from "./fields/shared";

/** Rechtlich in Deutschland verpflichtend (Impressumspflicht, § 5 DDG). */
export const ImpressumPage: GlobalConfig = {
  slug: "impressum-page",
  label: "Impressum",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    { name: "kicker", type: "text", required: true, defaultValue: "RECHTLICHES · § 5 DDG" },
    accentedTextField("headline"),
    { name: "subtitle", type: "textarea", required: true },
    { name: "badgeLabel", type: "text", required: true },
    stringListField("marqueeItems"),
    legalSectionsField,
    legalNoteField,
  ],
};
