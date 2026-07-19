import type { Metadata } from "next";

import { Accent } from "@/components/primitives/Accent";
import { Marquee } from "@/components/primitives/Marquee";
import { ScrollReveal } from "@/components/primitives/ScrollReveal";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { CategoryCarousel } from "@/components/sections/CategoryCarousel";
import { CTABand } from "@/components/sections/CTABand";
import { getContentProvider } from "@/lib/content/provider";

export async function generateMetadata(): Promise<Metadata> {
  const photography = await getContentProvider().getPageContent("photography");
  return { title: photography.meta.title, description: photography.meta.description };
}

export default async function PhotographyPage() {
  const provider = getContentProvider();
  const [photography, categories] = await Promise.all([
    provider.getPageContent("photography"),
    provider.getPhotoCategories(),
  ]);

  return (
    <>
      <section className="px-6 pb-14 pt-16 text-center md:px-30 md:pb-22 md:pt-28">
        <h1 className="font-display text-[32px] font-medium md:text-[50px]">
          <Accent text={photography.headline} />
        </h1>
        <SectionDivider className="mt-5.5 md:mt-7" />
      </section>

      <Marquee items={photography.marqueeItems} className="mb-14 md:mb-22" />

      {/* Kategorien alternierend: gerade = Bild links/Ivory, ungerade = Bild rechts/Greige */}
      {categories.map((cat, i) => {
        const alt = i % 2 === 1;
        const image = (
          <CategoryCarousel
            imageKeys={cat.imageKeys}
            tone={alt ? "greige" : "ivory"}
            className={`aspect-[3/4] md:aspect-auto md:h-[620px] md:shadow-tilt ${alt ? "md:rotate-[1deg]" : "md:-rotate-[1deg]"}`}
            priority={i === 0}
          />
        );
        const text = (
          <ScrollReveal>
            <div className="mt-7 text-[12px] uppercase tracking-[0.28em] text-gold-dark md:mt-0 md:text-[13px] md:tracking-[0.3em]">
              {cat.eyebrow}
            </div>
            <h2 className="mt-3 font-display text-[27px] font-medium leading-[1.35] md:mt-4 md:text-[38px]">
              {cat.headline}
            </h2>
            <p className="mt-4.5 text-base leading-relaxed text-text-secondary md:mt-7 md:text-[17px]">
              {cat.text}
            </p>
          </ScrollReveal>
        );

        return (
          <section
            key={cat.slug}
            className={`px-6 py-18 md:grid md:items-center md:gap-24 md:px-30 md:py-28 ${
              alt ? "bg-greige md:grid-cols-[1fr_520px]" : "md:grid-cols-[520px_1fr]"
            } ${i === 0 ? "pt-0 md:pt-0" : ""}`}
          >
            <div className={alt ? "md:order-2" : ""}>{image}</div>
            <div className={alt ? "md:order-1" : ""}>{text}</div>
          </section>
        );
      })}

      <CTABand content={photography.cta} />
    </>
  );
}
