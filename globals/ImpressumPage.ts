import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

import { metaField } from "./fields/shared";

/**
 * Rechtlich in Deutschland verpflichtend (Impressumspflicht, §5 TMG). Der
 * Footer-Link existierte bisher als href="#" — hier nur das Gerüst, der
 * eigentliche Rechtstext muss von Joanna kommen (z. B. via e-recht24-Generator).
 */
export const ImpressumPage: GlobalConfig = {
  slug: "impressum-page",
  label: "Impressum",
  access: {
    read: () => true,
  },
  fields: [
    metaField,
    { name: "headline", type: "text", required: true, defaultValue: "Impressum" },
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
