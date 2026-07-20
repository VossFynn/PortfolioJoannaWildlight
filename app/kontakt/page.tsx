import type { Metadata } from "next";
import Link from "next/link";

import { Accent } from "@/components/primitives/Accent";
import { ArchImage } from "@/components/primitives/ArchImage";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { StickerBadge } from "@/components/primitives/StickerBadge";
import { ContactForm } from "@/components/sections/ContactForm";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContentProvider().getPageContent("contact");
  return { title: contact.meta.title, description: contact.meta.description };
}

export default async function ContactPage() {
  const provider = getContentProvider();
  const [contact, site] = await Promise.all([
    provider.getPageContent("contact"),
    provider.getSiteContent(),
  ]);

  return (
    <section className="items-start gap-28 px-6 py-16 md:grid md:grid-cols-[1fr_480px] md:px-30 md:pb-30 md:pt-28">
      {/* Formular */}
      <div>
        <h1 className="font-display text-[32px] font-medium md:text-[50px]">
          <Accent text={contact.headline} />
        </h1>
        <SectionDivider align="left" className="mt-5 md:mt-6" />
        <p className="mt-6 text-base leading-relaxed text-text-secondary md:mt-7 md:text-[17px]">
          {contact.intro}
        </p>
        <ContactForm form={contact.form} />
      </div>

      {/* Seitenspalte */}
      <div className="mt-16 flex flex-col gap-9 md:mt-0">
        <div className="relative">
          <ArchImage
            image={contact.side.portraitImage}
            size="portrait"
            className="mx-auto aspect-[3/4] max-w-[300px] md:mx-0 md:aspect-auto md:h-[520px] md:max-w-none"
          />
          <StickerBadge className="absolute bottom-7 left-1/2 -translate-x-1/2">
            {contact.side.stickerLabel}
          </StickerBadge>
        </div>
        <div className="text-center">
          <div className="font-display text-2xl leading-[1.4] md:text-[26px]">
            {contact.side.headline}
          </div>
          <p className="mt-4.5 text-base text-text-secondary md:mt-5">
            {contact.side.instagramTextBefore}{" "}
            <Link
              href={site.instagram.url}
              className="font-display text-[19px] italic text-gold-dark"
            >
              {site.instagram.handle}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
