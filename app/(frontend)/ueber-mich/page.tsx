import type { Metadata } from "next";

import { Accent } from "@/components/primitives/Accent";
import { ArchImage } from "@/components/primitives/ArchImage";
import { Marquee } from "@/components/primitives/Marquee";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import { ScrollReveal } from "@/components/primitives/ScrollReveal";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { CTABand } from "@/components/sections/CTABand";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContentProvider().getPageContent("about");
  return { title: about.meta.title, description: about.meta.description };
}

export default async function AboutPage() {
  const about = await getContentProvider().getPageContent("about");

  return (
    <>
      {/* H1 */}
      <section className="px-6 pt-16 text-center md:px-30 md:pt-28">
        <h1 className="mx-auto max-w-[880px] font-display text-[31px] font-medium leading-[1.3] md:text-[50px] md:leading-[1.25]">
          <Accent text={about.headline} />
        </h1>
        <SectionDivider className="mt-5.5 md:mt-7" />
      </section>

      <Marquee items={about.marqueeItems} className="mt-14 md:mt-18" />

      {/* Intro */}
      <section className="items-center gap-24 px-6 py-14 md:grid md:grid-cols-[460px_1fr] md:px-30 md:pb-30 md:pt-22">
        <ArchImage
          image={about.intro.portraitImage}
          size="portrait"
          className="mx-auto aspect-[3/4] max-w-[300px] md:mx-0 md:aspect-auto md:h-[580px] md:max-w-none"
          priority
          sizes="(min-width: 768px) 460px, 300px"
        />
        <div>
          <h2 className="mt-10 font-display text-[29px] font-medium md:mt-0 md:text-[40px]">
            {about.intro.headline}
          </h2>
          {about.intro.paragraphs.map((p, i) => (
            <p
              key={p}
              className={`text-base leading-relaxed text-text-secondary md:text-lg ${i === 0 ? "mt-4.5 md:mt-7" : "mt-3.5 md:mt-4"}`}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Leidenschaft */}
      <section className="bg-greige px-6 py-18 md:px-30 md:py-26">
        <div className="items-center gap-24 md:grid md:grid-cols-[1fr_400px]">
          <ScrollReveal>
            <h2 className="font-display text-[30px] font-medium md:text-[42px]">
              {about.passion.headline}
            </h2>
            <SectionDivider align="left" className="mt-4 md:mt-5" />
            {about.passion.paragraphs.map((p, i) => (
              <p
                key={p}
                className={`text-base leading-relaxed text-text-secondary md:text-[17px] ${i === 0 ? "mt-7 md:mt-8" : "mt-3.5 md:mt-4"}`}
              >
                {p}
              </p>
            ))}
          </ScrollReveal>
          <PlaceholderImage
            image={about.passion.image}
            tone="greige"
            className="mt-10 aspect-[3/4] -rotate-[1.5deg] shadow-tilt md:mt-0 md:aspect-auto md:h-[500px] md:rotate-[1.5deg]"
            sizes="(min-width: 768px) 400px, 100vw"
          />
        </div>
      </section>

      {/* Fakten */}
      <section className="px-6 py-18 text-center md:px-30 md:py-30">
        <ScrollReveal>
          <h2 className="font-display text-[29px] font-medium leading-[1.35] md:text-[42px]">
            <Accent text={about.facts.headline} />
          </h2>
          <SectionDivider className="mt-4.5 md:mt-5" />
        </ScrollReveal>
        <div className="mt-11 flex flex-col gap-8 md:mt-18 md:grid md:grid-cols-4 md:gap-10">
          {about.facts.items.map((fact, i) => (
            <ScrollReveal key={fact} delay={i * 100}>
              <div className="flex flex-col items-center gap-3.5 md:gap-5">
                <span aria-hidden className="h-[9px] w-[9px] rounded-pill bg-gold-light md:h-2.5 md:w-2.5" />
                <div className="font-display text-[22px] italic leading-[1.45] md:text-2xl">{fact}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTABand content={about.cta} />
    </>
  );
}
