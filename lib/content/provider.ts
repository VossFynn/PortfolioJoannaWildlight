import type {
  FaqItem,
  HeroImage,
  PageContentMap,
  PageKey,
  PhotoCategory,
  SiteContent,
  Testimonial,
} from "@/lib/content/types";

/**
 * CMS-Naht: Komponenten/Seiten beziehen Inhalte ausschließlich über dieses
 * Interface. Heute liefert der LocalContentProvider die Daten aus content/;
 * ein späterer CMS-Adapter implementiert dasselbe Interface (z. B. via
 * fetch gegen die CMS-API) und wird in getContentProvider() eingetauscht —
 * ohne dass Komponenten angefasst werden müssen.
 */
export interface ContentProvider {
  getSiteContent(): Promise<SiteContent>;
  getHeroImages(): Promise<HeroImage[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getFaqItems(): Promise<FaqItem[]>;
  getPhotoCategories(): Promise<PhotoCategory[]>;
  getPageContent<K extends PageKey>(page: K): Promise<PageContentMap[K]>;
}

class LocalContentProvider implements ContentProvider {
  async getSiteContent(): Promise<SiteContent> {
    const { site } = await import("@/content/site");
    return site;
  }

  async getHeroImages(): Promise<HeroImage[]> {
    const { heroImages } = await import("@/content/home");
    return heroImages;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const { testimonials } = await import("@/content/testimonials");
    return testimonials;
  }

  async getFaqItems(): Promise<FaqItem[]> {
    const { faqItems } = await import("@/content/faq");
    return faqItems;
  }

  async getPhotoCategories(): Promise<PhotoCategory[]> {
    const { photoCategories } = await import("@/content/photography");
    return photoCategories;
  }

  async getPageContent<K extends PageKey>(page: K): Promise<PageContentMap[K]> {
    const loaders: { [P in PageKey]: () => Promise<PageContentMap[P]> } = {
      home: async () => (await import("@/content/home")).home,
      about: async () => (await import("@/content/about")).about,
      photography: async () => (await import("@/content/photography")).photography,
      faq: async () => (await import("@/content/faq")).faqPage,
      contact: async () => (await import("@/content/contact")).contact,
    };
    return loaders[page]();
  }
}

const provider: ContentProvider = new LocalContentProvider();

/** Einzige Stelle, an der der aktive Provider gewählt wird. */
export function getContentProvider(): ContentProvider {
  return provider;
}
