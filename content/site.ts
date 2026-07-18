import type { SiteContent } from "@/lib/content/types";

export const site: SiteContent = {
  logo: { top: "JOANNA", bottom: "WILDLIGHT" },
  nav: [
    { label: "Start", href: "/" },
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Fotografie", href: "/fotografie" },
    { label: "Q + A", href: "/qa" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footer: {
    name: "Joanna Bartels",
    tagline: "Fotografin für Bremen und 25km Umkreis",
    quote: "„Fotografie ist für mich das Festhalten von kleinen Wundern.“",
    links: [
      { label: "Datenschutz", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Impressum", href: "#" },
    ],
    copyright: "© 2026 Joanna Bartels | All rights Reserved",
  },
  instagram: {
    handle: "„Joanna.wildlight“",
    url: "https://www.instagram.com/joanna.wildlight",
  },
};
