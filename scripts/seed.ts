/**
 * Einmaliges Seeding: überträgt die bisherige lokale Copy (content/*.ts) und
 * alle Fotos (public/images/, via scripts/seed-data/imageManifest.ts) nach
 * Payload, damit das Admin-Panel von Anfang an mit dem echten Stand befüllt
 * ist statt leer zu starten. Ausführen mit `npm run seed`.
 *
 * Läuft nur, wenn die Media-Collection noch leer ist (Schutz gegen
 * versehentliches Doppel-Seeding) — zum erzwungenen erneuten Seeden
 * `FORCE_SEED=true npm run seed`.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "@payload-config";
import { getPayload } from "payload";

import { about } from "../content/about";
import { contact } from "../content/contact";
import { faqItems, faqPage } from "../content/faq";
import { heroImages, home } from "../content/home";
import { photoCategories, photography } from "../content/photography";
import { site } from "../content/site";
import { testimonials } from "../content/testimonials";
import { seedImageManifest, type SeedImageKey } from "./seed-data/imageManifest";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(dirname, "../public/images");

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({ collection: "media", limit: 1 });
  if (existing.docs.length > 0 && process.env.FORCE_SEED !== "true") {
    payload.logger.warn(
      "Media-Collection ist nicht leer — Seed übersprungen (FORCE_SEED=true erzwingt erneutes Anlegen, kann Duplikate erzeugen)."
    );
    return;
  }

  payload.logger.info("Lade Bilder hoch …");
  // Mehrere Manifest-Keys teilen sich dieselbe Datei (z. B. Hero-Foto auch
  // als Fotografie-Kategorie-Slide) — jede Datei nur einmal hochladen.
  const uniqueFiles = new Map<string, string>();
  for (const { file, alt } of Object.values(seedImageManifest)) {
    if (!uniqueFiles.has(file)) uniqueFiles.set(file, alt);
  }
  const fileToMediaId = new Map<string, number>();
  for (const [file, alt] of uniqueFiles) {
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(imagesDir, file),
    });
    fileToMediaId.set(file, doc.id);
  }
  const media = (key: SeedImageKey): number => {
    const id = fileToMediaId.get(seedImageManifest[key].file);
    if (!id) throw new Error(`Kein Media-Upload für Key "${key}" gefunden.`);
    return id;
  };
  const strings = (items: string[]) => items.map((text) => ({ text }));

  payload.logger.info("Lege Testimonials an …");
  for (const [i, t] of testimonials.entries()) {
    await payload.create({
      collection: "testimonials",
      data: { quote: t.quote, author: t.author, order: i },
    });
  }

  payload.logger.info("Lege FAQ-Einträge an …");
  for (const [i, f] of faqItems.entries()) {
    await payload.create({
      collection: "faq-items",
      data: { question: f.question, answer: f.answer, order: i },
    });
  }

  payload.logger.info("Lege Fotografie-Kategorien an …");
  for (const [i, cat] of photoCategories.entries()) {
    await payload.create({
      collection: "photo-categories",
      data: {
        slug: cat.slug,
        eyebrow: cat.eyebrow,
        headline: cat.headline,
        text: cat.text,
        images: cat.imageKeys.map((k) => media(k as SeedImageKey)),
        order: i,
      },
    });
  }

  payload.logger.info("Befülle Site-Settings …");
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      logo: { top: site.logo.top, bottom: site.logo.bottom, image: media("logo") },
      nav: site.nav,
      footer: site.footer,
      instagram: site.instagram,
    },
  });

  payload.logger.info("Befülle Startseite …");
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      meta: home.meta,
      heroSlides: heroImages.map((h) => ({ image: media(h.imageKey as SeedImageKey) })),
      hero: home.hero,
      intro: {
        headline: home.intro.headline,
        headlineMobile: home.intro.headlineMobile,
        paragraphs: strings(home.intro.paragraphs),
        buttonLabel: home.intro.buttonLabel,
        buttonHref: home.intro.buttonHref,
        portraitImage: media(home.intro.portraitKey as SeedImageKey),
        polaroidImage: media(home.intro.polaroidKey as SeedImageKey),
        stickerLabel: home.intro.stickerLabel,
      },
      marqueeItems: strings(home.marqueeItems),
      services: {
        headline: home.services.headline,
        subline: home.services.subline,
        cards: home.services.cards.map((c) => ({
          title: c.title,
          text: c.text,
          image: media(c.imageKey as SeedImageKey),
        })),
        buttonLabel: home.services.buttonLabel,
        buttonHref: home.services.buttonHref,
      },
      works: {
        headline: home.works.headline,
        text: home.works.text,
        images: home.works.imageKeys.map((k) => media(k as SeedImageKey)),
        buttonLabel: home.works.buttonLabel,
        buttonHref: home.works.buttonHref,
      },
      testimonials: home.testimonials,
      trust: home.trust,
      cta: home.cta,
    },
  });

  payload.logger.info("Befülle Über-mich-Seite …");
  await payload.updateGlobal({
    slug: "about-page",
    data: {
      meta: about.meta,
      headline: about.headline,
      marqueeItems: strings(about.marqueeItems),
      intro: {
        portraitImage: media(about.intro.portraitKey as SeedImageKey),
        headline: about.intro.headline,
        paragraphs: strings(about.intro.paragraphs),
      },
      passion: {
        headline: about.passion.headline,
        paragraphs: strings(about.passion.paragraphs),
        image: media(about.passion.imageKey as SeedImageKey),
      },
      facts: { headline: about.facts.headline, items: strings(about.facts.items) },
      cta: about.cta,
    },
  });

  payload.logger.info("Befülle Fotografie-Seite …");
  await payload.updateGlobal({
    slug: "photography-page",
    data: {
      meta: photography.meta,
      headline: photography.headline,
      marqueeItems: strings(photography.marqueeItems),
      cta: photography.cta,
    },
  });

  payload.logger.info("Befülle Q+A-Seite …");
  await payload.updateGlobal({
    slug: "faq-page",
    data: {
      meta: faqPage.meta,
      headline: faqPage.headline,
      marqueeItems: strings(faqPage.marqueeItems),
      cta: faqPage.cta,
    },
  });

  payload.logger.info("Befülle Kontakt-Seite …");
  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      meta: contact.meta,
      headline: contact.headline,
      intro: contact.intro,
      form: {
        nameLabel: contact.form.nameLabel,
        emailLabel: contact.form.emailLabel,
        phoneLabel: contact.form.phoneLabel,
        occasionLabel: contact.form.occasionLabel,
        messageLabel: contact.form.messageLabel,
        sourceQuestion: contact.form.sourceQuestion,
        sources: strings(contact.form.sources),
        consentText: contact.form.consentText,
        submitLabel: contact.form.submitLabel,
      },
      side: {
        portraitImage: media(contact.side.portraitKey as SeedImageKey),
        stickerLabel: contact.side.stickerLabel,
        headline: contact.side.headline,
        instagramTextBefore: contact.side.instagramTextBefore,
      },
    },
  });

  payload.logger.info("Fertig — Payload ist mit dem bisherigen Stand befüllt.");
}

await seed();
