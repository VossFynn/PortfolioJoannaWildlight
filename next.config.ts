import type { NextConfig } from "next";

// Für GitHub Pages: Deployment liegt unter /<repo-name>/ — der Workflow
// setzt NEXT_PUBLIC_BASE_PATH="/PortfolioJoannaWildlight". Lokal bleibt
// die Variable leer (kein Präfix). Asset-src aus public/ läuft über
// lib/basePath.ts (next/image prefixt bei unoptimized nicht automatisch).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    // GitHub Pages hat keinen Image-Optimizer (statisches Hosting).
    unoptimized: true,
  },
};

export default nextConfig;
