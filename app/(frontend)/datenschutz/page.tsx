import type { Metadata } from "next";

import { LegalPageSections } from "@/components/sections/LegalPageSections";
import { getContentProvider } from "@/lib/content/provider";

/** ISR: CMS-Änderungen erscheinen ohne Redeploy, spätestens nach 60s. */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentProvider().getLegalPage("datenschutz");
  return { title: page.meta.title, description: page.meta.description };
}

export default async function DatenschutzPage() {
  const page = await getContentProvider().getLegalPage("datenschutz");
  return <LegalPageSections content={page} />;
}
