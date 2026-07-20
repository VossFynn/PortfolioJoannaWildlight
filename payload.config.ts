import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ContactSubmissions } from "./collections/ContactSubmissions";
import { FaqItems } from "./collections/FaqItems";
import { Media } from "./collections/Media";
import { PhotoCategories } from "./collections/PhotoCategories";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { DatenschutzPage } from "./globals/DatenschutzPage";
import { FaqPage } from "./globals/FaqPage";
import { HomePage } from "./globals/HomePage";
import { ImpressumPage } from "./globals/ImpressumPage";
import { PhotographyPage } from "./globals/PhotographyPage";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Netlifys eingebaute "Netlify DB" (Neon) injiziert NETLIFY_DATABASE_URL;
// lokal/CI kommt die Verbindung über DATABASE_URI (z. B. docker-compose oder
// eine Neon-Dev-Branch-URL).
const databaseUri = process.env.DATABASE_URI ?? process.env.NETLIFY_DATABASE_URL ?? "";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Testimonials, FaqItems, PhotoCategories, ContactSubmissions],
  globals: [
    SiteSettings,
    HomePage,
    AboutPage,
    PhotographyPage,
    FaqPage,
    ContactPage,
    ImpressumPage,
    DatenschutzPage,
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${process.env.R2_PUBLIC_URL}/${key}`;
          },
        },
      },
      bucket: process.env.R2_BUCKET ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});
