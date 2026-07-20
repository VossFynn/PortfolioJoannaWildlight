import type { ContactContent } from "@/scripts/seed-data/types";

export const contact: ContactContent = {
  meta: {
    title: "Kontakt — Joanna Wildlight",
    description:
      "Du interessierst dich für ein Shooting oder hast Fragen? Erzähl mir gerne ein bisschen über euch und eure Wünsche — ich melde mich schnell bei dir zurück.",
  },
  headline: "Erzählt mir von *euch*",
  intro:
    "Du interessierst dich für ein Shooting oder hast Fragen? Dann erzähl mir gerne ein bisschen über euch und eure Wünsche. Je mehr ich von euch erfahre, desto besser kann ich eure Geschichte in Bildern festhalten.",
  form: {
    nameLabel: "Dein Name*",
    emailLabel: "Deine Email*",
    phoneLabel: "Deine Telefonnummer",
    occasionLabel: "Anlass, gewünschter Zeitraum oder eure Vorstellung*",
    messageLabel: "Erzählt mir von euch*",
    sourceQuestion: "Wie bist du auf mich aufmerksam geworden?",
    sources: ["Social Media", "Google", "Empfehlungen", "Anders"],
    consentText:
      "Ich habe die Datenschutzerklärung gelesen und verstanden. Ich willige ein, dass meine angegebenen Daten für die Kommunikation und Kontaktaufnahme verwendet werden dürfen. Die Einwilligung kann jederzeit widerrufen werden.",
    submitLabel: "Anfrage senden",
  },
  side: {
    portraitKey: "portrait-joanna-kontakt",
    stickerLabel: "★ Ich freue mich auf euch!",
    headline: "Ich freue mich darauf, eure Geschichte kennenzulernen",
    instagramTextBefore: "Folge mir gerne auf Instagram",
  },
};
