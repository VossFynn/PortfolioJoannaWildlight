import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { getContentProvider } from "@/lib/content/provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ISR: Seiten werden statisch generiert, aber alle 60s neu aus Payload
// aufgelöst — sonst würden CMS-Änderungen erst beim nächsten Deploy
// sichtbar (Header/Footer kommen aus diesem Layout, brauchen also auch
// eine eigene Revalidate-Angabe, nicht nur die einzelnen page.tsx).
export const revalidate = 60;

// Für Netlify-Deploy-Previews/Custom-Domain in Netlify env vars setzen —
// nötig, damit z. B. das OG-Bild eine absolute URL bekommt.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Joanna Wildlight — Familien & Paarfotografie in Bremen",
  description:
    "Joanna Wildlight — Familien- & Paarfotografin aus Bremen. Echte Momente für Familien, die fühlen wollen, nicht posieren.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getContentProvider().getSiteContent();

  return (
    <html lang="de" className={`${cormorant.variable} ${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory font-body text-ink">
        <Header logo={site.logo} nav={site.nav} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer site={site} />
      </body>
    </html>
  );
}
