import type { Metadata } from "next";

import { LegalPageSections } from "@/components/sections/LegalPageSections";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentProvider().getLegalPage("impressum");
  return { title: page.meta.title, description: page.meta.description };
}

export default async function ImpressumPage() {
  const page = await getContentProvider().getLegalPage("impressum");
  return <LegalPageSections content={page} />;
}
