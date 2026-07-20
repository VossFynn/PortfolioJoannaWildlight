import type { Metadata } from "next";

import { Accent } from "@/components/primitives/Accent";
import { Marquee } from "@/components/primitives/Marquee";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { CTABand } from "@/components/sections/CTABand";
import { FaqList } from "@/components/sections/FaqList";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const faq = await getContentProvider().getPageContent("faq");
  return { title: faq.meta.title, description: faq.meta.description };
}

export default async function FaqPage() {
  const provider = getContentProvider();
  const [faq, items] = await Promise.all([
    provider.getPageContent("faq"),
    provider.getFaqItems(),
  ]);

  return (
    <>
      <section className="px-6 pb-12 pt-16 text-center md:px-30 md:pb-22 md:pt-28">
        <h1 className="font-display text-[32px] font-medium md:text-[50px]">
          <Accent text={faq.headline} />
        </h1>
        <SectionDivider className="mt-5.5 md:mt-7" />
      </section>

      <Marquee items={faq.marqueeItems} className="mb-12 md:mb-22" />

      <section className="px-6 pb-18 md:px-40 md:pb-30">
        <FaqList items={items} />
      </section>

      <CTABand content={faq.cta} />
    </>
  );
}
