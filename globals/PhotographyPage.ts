import type { GlobalConfig } from "payload";

import { accentedTextField, ctaField, metaField, stringListField } from "./fields/shared";

/** Kategorie-Sektionen selbst liegen in der Collection photo-categories. */
export const PhotographyPage: GlobalConfig = {
  slug: "photography-page",
  label: "Fotografie",
  access: {
    read: () => true,
  },
  fields: [metaField, accentedTextField("headline"), stringListField("marqueeItems"), ctaField],
};
