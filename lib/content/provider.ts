import config from "@payload-config";
import { getPayload } from "payload";

import type { Media } from "@/payload-types";
import type {
  AboutContent,
  ContactContent,
  FaqItem,
  FaqPageContent,
  HeroImage,
  HomeContent,
  LegalPageContent,
  PageContentMap,
  PageKey,
  PhotoCategory,
  PhotographyContent,
  ResolvedImage,
  SiteContent,
  Testimonial,
} from "@/lib/content/types";

/**
 * CMS-Naht: Komponenten/Seiten beziehen Inhalte ausschließlich über dieses
 * Interface. PayloadContentProvider löst es über Payloads Local API auf
 * (keine HTTP-Roundtrip nötig, läuft direkt in React Server Components).
 */
export interface ContentProvider {
  getSiteContent(): Promise<SiteContent>;
  getHeroImages(): Promise<HeroImage[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getFaqItems(): Promise<FaqItem[]>;
  getPhotoCategories(): Promise<PhotoCategory[]>;
  getPageContent<K extends PageKey>(page: K): Promise<PageContentMap[K]>;
  getLegalPage(slug: "impressum" | "datenschutz"): Promise<LegalPageContent>;
}

/** Löst eine Payload-Relationship (ID, populiertes Doc oder leer) zu {url, alt} auf. */
function resolveImage(media: number | Media | null | undefined): ResolvedImage | null {
  if (!media || typeof media === "number" || !media.url) return null;
  return { url: media.url, alt: media.alt, blurDataURL: media.blurDataURL ?? null };
}

function resolveImages(media: (number | Media)[] | null | undefined): (ResolvedImage | null)[] {
  return (media ?? []).map((m) => resolveImage(m));
}

const textList = (items: { text: string }[] | null | undefined): string[] =>
  (items ?? []).map((i) => i.text);

class PayloadContentProvider implements ContentProvider {
  private async payload() {
    return getPayload({ config });
  }

  async getSiteContent(): Promise<SiteContent> {
    const payload = await this.payload();
    const site = await payload.findGlobal({ slug: "site-settings" });
    return {
      logo: {
        top: site.logo.top,
        bottom: site.logo.bottom,
        image: resolveImage(site.logo.image),
      },
      nav: site.nav,
      footer: site.footer,
      instagram: site.instagram,
    };
  }

  async getHeroImages(): Promise<HeroImage[]> {
    const payload = await this.payload();
    const home = await payload.findGlobal({ slug: "home-page" });
    return home.heroSlides.map((slide) => ({ image: resolveImage(slide.image) }));
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const payload = await this.payload();
    const { docs } = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 0,
    });
    return docs.map((doc) => ({ quote: doc.quote, author: doc.author }));
  }

  async getFaqItems(): Promise<FaqItem[]> {
    const payload = await this.payload();
    const { docs } = await payload.find({
      collection: "faq-items",
      sort: "order",
      limit: 0,
    });
    return docs.map((doc) => ({ question: doc.question, answer: doc.answer }));
  }

  async getPhotoCategories(): Promise<PhotoCategory[]> {
    const payload = await this.payload();
    const { docs } = await payload.find({
      collection: "photo-categories",
      sort: "order",
      limit: 0,
    });
    return docs.map((doc) => ({
      slug: doc.slug,
      eyebrow: doc.eyebrow,
      headline: doc.headline,
      text: doc.text,
      images: resolveImages(doc.images),
    }));
  }

  async getPageContent<K extends PageKey>(page: K): Promise<PageContentMap[K]> {
    const payload = await this.payload();

    if (page === "home") {
      const p = await payload.findGlobal({ slug: "home-page" });
      const content: HomeContent = {
        meta: p.meta,
        hero: p.hero,
        intro: {
          headline: p.intro.headline,
          headlineMobile: p.intro.headlineMobile,
          paragraphs: textList(p.intro.paragraphs),
          buttonLabel: p.intro.buttonLabel,
          buttonHref: p.intro.buttonHref,
          portraitImage: resolveImage(p.intro.portraitImage),
          polaroidImage: resolveImage(p.intro.polaroidImage),
          stickerLabel: p.intro.stickerLabel,
        },
        marqueeItems: textList(p.marqueeItems),
        services: {
          headline: p.services.headline,
          subline: p.services.subline,
          cards: p.services.cards.map((c) => ({
            title: c.title,
            text: c.text,
            image: resolveImage(c.image),
          })),
          buttonLabel: p.services.buttonLabel,
          buttonHref: p.services.buttonHref,
        },
        works: {
          headline: p.works.headline,
          text: p.works.text,
          images: resolveImages(p.works.images),
          buttonLabel: p.works.buttonLabel,
          buttonHref: p.works.buttonHref,
        },
        testimonials: p.testimonials,
        trust: p.trust,
        cta: p.cta,
      };
      return content as PageContentMap[K];
    }

    if (page === "about") {
      const p = await payload.findGlobal({ slug: "about-page" });
      const content: AboutContent = {
        meta: p.meta,
        headline: p.headline,
        marqueeItems: textList(p.marqueeItems),
        intro: {
          portraitImage: resolveImage(p.intro.portraitImage),
          headline: p.intro.headline,
          paragraphs: textList(p.intro.paragraphs),
        },
        passion: {
          headline: p.passion.headline,
          paragraphs: textList(p.passion.paragraphs),
          image: resolveImage(p.passion.image),
        },
        facts: {
          headline: p.facts.headline,
          items: textList(p.facts.items),
        },
        cta: p.cta,
      };
      return content as PageContentMap[K];
    }

    if (page === "photography") {
      const p = await payload.findGlobal({ slug: "photography-page" });
      const content: PhotographyContent = {
        meta: p.meta,
        headline: p.headline,
        marqueeItems: textList(p.marqueeItems),
        cta: p.cta,
      };
      return content as PageContentMap[K];
    }

    if (page === "faq") {
      const p = await payload.findGlobal({ slug: "faq-page" });
      const content: FaqPageContent = {
        meta: p.meta,
        headline: p.headline,
        marqueeItems: textList(p.marqueeItems),
        cta: p.cta,
      };
      return content as PageContentMap[K];
    }

    // "contact"
    const p = await payload.findGlobal({ slug: "contact-page" });
    const content: ContactContent = {
      meta: p.meta,
      headline: p.headline,
      intro: p.intro,
      form: {
        nameLabel: p.form.nameLabel,
        emailLabel: p.form.emailLabel,
        phoneLabel: p.form.phoneLabel,
        occasionLabel: p.form.occasionLabel,
        messageLabel: p.form.messageLabel,
        sourceQuestion: p.form.sourceQuestion,
        sources: textList(p.form.sources),
        consentText: p.form.consentText,
        submitLabel: p.form.submitLabel,
      },
      side: {
        portraitImage: resolveImage(p.side.portraitImage),
        stickerLabel: p.side.stickerLabel,
        headline: p.side.headline,
        instagramTextBefore: p.side.instagramTextBefore,
      },
    };
    return content as PageContentMap[K];
  }

  async getLegalPage(slug: "impressum" | "datenschutz"): Promise<LegalPageContent> {
    const payload = await this.payload();
    const p =
      slug === "impressum"
        ? await payload.findGlobal({ slug: "impressum-page" })
        : await payload.findGlobal({ slug: "datenschutz-page" });
    return { meta: p.meta, headline: p.headline, body: p.body };
  }
}

const provider: ContentProvider = new PayloadContentProvider();

/** Einzige Stelle, an der der aktive Provider gewählt wird. */
export function getContentProvider(): ContentProvider {
  return provider;
}
