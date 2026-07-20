import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { SectionDivider } from "@/components/primitives/SectionDivider";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentProvider().getLegalPage("datenschutz");
  return { title: page.meta.title, description: page.meta.description };
}

export default async function DatenschutzPage() {
  const page = await getContentProvider().getLegalPage("datenschutz");

  return (
    <section className="px-6 py-16 md:px-30 md:py-28">
      <h1 className="font-display text-[32px] font-medium md:text-[50px]">{page.headline}</h1>
      <SectionDivider align="left" className="mt-5.5 md:mt-7" />
      <div className="prose mt-9 max-w-2xl text-base leading-relaxed text-text-secondary md:mt-11 md:text-[17px]">
        {page.body && <RichText data={page.body} />}
      </div>
    </section>
  );
}
