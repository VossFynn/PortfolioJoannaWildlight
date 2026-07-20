import type { Field } from "payload";

/** PageMeta {title, description} — SEO-Titel/-Beschreibung einer Seite. */
export const metaField: Field = {
  name: "meta",
  type: "group",
  label: "SEO",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
  ],
};

/**
 * AccentedText-Konvention: genau ein *mit Sternchen markierter* Teil wird im
 * Frontend als kursiver Gold-Akzent gerendert (Komponente <Accent>).
 */
export const accentedTextField = (name: string, description?: string): Field => ({
  name,
  type: "text",
  required: true,
  admin: {
    description:
      description ?? "Genau *einen* Teil in Sternchen setzen — wird kursiv/gold hervorgehoben.",
  },
});

/** Wiederverwendbares CTA-Band (Headline, optionaler Text/Zitat, Button). */
export const ctaField: Field = {
  name: "cta",
  type: "group",
  label: "CTA-Band",
  fields: [
    accentedTextField("headline"),
    { name: "text", type: "textarea" },
    { name: "buttonLabel", type: "text", required: true },
    { name: "buttonHref", type: "text", required: true },
    { name: "quote", type: "text" },
  ],
};

/** Einfache String-Liste (z. B. Laufband-Wörter) als Array aus Text-Zeilen. */
export const stringListField = (name: string, description?: string): Field => ({
  name,
  type: "array",
  required: true,
  minRows: 1,
  admin: description ? { description } : undefined,
  fields: [{ name: "text", type: "text", required: true }],
});

interface ImageFieldOptions {
  required?: boolean;
  hasMany?: boolean;
  minRows?: number;
  description?: string;
}

/**
 * Optionale Bild-Referenz. Leer = Frontend zeigt gestreiften Platzhalter.
 * `hasMany`/`minRows` sind je nach Payloads Relationship-Feldtyp nur in
 * bestimmten Kombinationen erlaubt — Felder deshalb nur bei Bedarf setzen
 * statt sie immer (ggf. mit `undefined`) mitzugeben, und am Ende auf `Field`
 * casten (die diskriminierte Union lässt sich sonst nicht sauber inferieren).
 */
export const imageField = (name: string, opts: ImageFieldOptions = {}): Field => {
  const field: Record<string, unknown> = {
    name,
    type: "relationship",
    relationTo: "media",
  };
  if (opts.required) field.required = true;
  if (opts.hasMany) field.hasMany = true;
  if (opts.minRows !== undefined) field.minRows = opts.minRows;
  if (opts.description) field.admin = { description: opts.description };
  return field as Field;
};
