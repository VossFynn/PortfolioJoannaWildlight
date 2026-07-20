import type { Testimonial } from "@/scripts/seed-data/types";

/**
 * Das Design zeigt ein Karussell mit 3 Dots, enthält aber nur ein echtes
 * Kundenzitat (Sarah und Sven). Die beiden anderen Einträge sind als
 * Platzhalter markiert und müssen vor Launch durch echte Google-Rezensionen
 * ersetzt werden.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Wir haben Joanna für ein Babybauchshooting gebucht. Die Bilder sind super abwechslungsreich und schön geworden. Joanna hat ein tolles Auge für schöne Settings und bietet zudem diverse Kleider für das Shooting an. Alles in Allem waren wir rundum zufrieden :)",
    author: "Sarah und Sven",
  },
  {
    quote:
      "Platzhalter — hier kommt vor Launch ein echtes Kundenzitat aus den Google-Rezensionen hin.",
    author: "Platzhalter",
    isPlaceholder: true,
  },
  {
    quote:
      "Platzhalter — hier kommt vor Launch ein echtes Kundenzitat aus den Google-Rezensionen hin.",
    author: "Platzhalter",
    isPlaceholder: true,
  },
];
