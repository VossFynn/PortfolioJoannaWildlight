import type { CollectionAfterChangeHook } from "payload";

import type { ContactSubmission, SiteSetting } from "@/payload-types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEmailHtml(doc: ContactSubmission): string {
  const rows: Array<[string, string | null | undefined]> = [
    ["Name", doc.name],
    ["E-Mail", doc.email],
    ["Telefon", doc.phone],
    ["Anlass", doc.occasion],
    ["Gefunden über", doc.source],
  ];

  const rowsHtml = rows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;">${label}</td><td>${escapeHtml(
          String(value),
        )}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:sans-serif;font-size:15px;color:#222;">
      <p>Neue Anfrage über das Kontaktformular:</p>
      <table>${rowsHtml}</table>
      <p style="margin-top:16px;color:#666;">Nachricht:</p>
      <p style="white-space:pre-wrap;">${escapeHtml(doc.message)}</p>
    </div>
  `;
}

/**
 * Benachrichtigt die im SiteSettings-Global hinterlegte Adresse (falls
 * gesetzt) über eine neue Kontaktanfrage. Ohne konfigurierten E-Mail-Adapter
 * (kein RESEND_API_KEY, siehe payload.config.ts) oder ohne hinterlegte
 * Adresse passiert nichts — die Anfrage bleibt trotzdem im Admin-Panel sichtbar.
 */
export const notifyOnContactSubmission: CollectionAfterChangeHook<ContactSubmission> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "create") return;
  if (!req.payload.email) return;

  const siteSettings = (await req.payload.findGlobal({
    slug: "site-settings",
  })) as SiteSetting;

  const contactEmail = siteSettings.notifications?.contactEmail;
  if (!contactEmail) return;

  try {
    await req.payload.sendEmail({
      to: contactEmail,
      replyTo: doc.email,
      subject: `Neue Kontaktanfrage von ${doc.name}`,
      html: formatEmailHtml(doc),
    });
  } catch (error) {
    req.payload.logger.error({ err: error }, "Benachrichtigungsmail für Kontaktanfrage fehlgeschlagen");
  }
};
