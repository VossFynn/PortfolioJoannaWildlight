import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Joanna Wildlight — Familien & Paarfotografie in Bremen",
  description:
    "Joanna Wildlight — Familien- & Paarfotografin aus Bremen. Echte Momente für Familien, die fühlen wollen, nicht posieren.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory font-body text-ink">{children}</body>
    </html>
  );
}
