/**
 * Befüllt nur Impressum/Datenschutz (Payload-Globals). Separates Script statt
 * `npm run seed`, weil der Haupt-Seed früh abbricht, sobald die
 * Media-Collection nicht leer ist (Duplikatschutz für Testimonials/Fotos) —
 * `updateGlobal` ist dagegen idempotent und darf beliebig oft laufen.
 * Ausführen mit `npm run seed:legal`.
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { datenschutz, impressum } from "../content/legal";

async function seedLegal() {
  const payload = await getPayload({ config });
  const strings = (items: string[]) => items.map((text) => ({ text }));

  const legalSections = (content: typeof impressum) => ({
    meta: content.meta,
    kicker: content.kicker,
    headline: content.headline,
    subtitle: content.subtitle,
    badgeLabel: content.badgeLabel,
    marqueeItems: strings(content.marqueeItems),
    sections: content.sections.map((s) => ({
      number: s.number,
      title: s.title,
      paragraphs: strings(s.paragraphs),
      list: strings(s.list ?? []),
      pills: strings(s.pills ?? []),
    })),
    note: content.note,
  });

  payload.logger.info("Befülle Impressum & Datenschutz …");
  await payload.updateGlobal({ slug: "impressum-page", data: legalSections(impressum) });
  await payload.updateGlobal({ slug: "datenschutz-page", data: legalSections(datenschutz) });
  payload.logger.info("Fertig.");
}

await seedLegal();
