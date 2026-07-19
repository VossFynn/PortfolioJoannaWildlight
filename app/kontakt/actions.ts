"use server";

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  message: string;
  source: string | null;
}

export interface ContactResult {
  ok: boolean;
  error?: string;
}

/**
 * Austauschbarer Submit-Stub. TODO: an Mail-Service anbinden
 * (z. B. Resend/Nodemailer oder CMS-Form-Endpoint) — Signatur beibehalten,
 * dann muss das Formular nicht angefasst werden.
 */
export async function submitContactRequest(data: ContactRequest): Promise<ContactResult> {
  // Server-seitige Minimal-Validierung (Client validiert bereits ausführlich).
  if (!data.name.trim() || !data.email.trim() || !data.occasion.trim() || !data.message.trim()) {
    return { ok: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }

  console.info("[Kontaktanfrage]", { ...data, receivedAt: new Date().toISOString() });
  return { ok: true };
}
