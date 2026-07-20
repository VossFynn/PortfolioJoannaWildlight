import type { GlobalConfig } from "payload";

import { accentedTextField, ctaField, metaField, stringListField } from "./fields/shared";

/** Fragen/Antworten selbst liegen in der Collection faq-items. */
export const FaqPage: GlobalConfig = {
  slug: "faq-page",
  label: "Q+A",
  access: {
    read: () => true,
  },
  fields: [metaField, accentedTextField("headline"), stringListField("marqueeItems"), ctaField],
};
