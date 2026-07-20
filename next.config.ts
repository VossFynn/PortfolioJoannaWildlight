import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Medien liegen auf Cloudflare R2 (S3-Storage-Plugin, payload.config.ts).
// R2_PUBLIC_URL ist die öffentliche Bucket-Domain, z. B.
// "https://media.joanna-wildlight.de" oder die *.r2.dev-Dev-URL.
const r2PublicUrl = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2PublicUrl
      ? [
          {
            protocol: r2PublicUrl.protocol.replace(":", "") as "http" | "https",
            hostname: r2PublicUrl.hostname,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default withPayload(nextConfig);
