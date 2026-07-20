import type { CollectionConfig } from "payload";

/**
 * Eingänge des Kontaktformulars. Öffentlich nur `create` (das Formular sendet
 * ohne Login) — lesen/ändern/löschen ist Admins vorbehalten.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "occasion", "createdAt"],
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "occasion", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "source", type: "text" },
  ],
};
