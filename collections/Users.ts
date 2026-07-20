import type { CollectionConfig } from "payload";

/** Login-Nutzer fürs Admin-Panel (/admin). Kein Public-Zugriff. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};
