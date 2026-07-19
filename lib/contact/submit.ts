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
 * Austauschbarer Submit-Stub, läuft clientseitig (statischer Export für
 * GitHub Pages — Server Actions stehen dort nicht zur Verfügung).
 * TODO: an Mail-Service anbinden (z. B. Formspree/Resend-API oder
 * CMS-Form-Endpoint per fetch) — Signatur beibehalten, dann muss das
 * Formular nicht angefasst werden.
 */
export async function submitContactRequest(data: ContactRequest): Promise<ContactResult> {
  // Minimal-Validierung (das Formular validiert bereits ausführlich).
  if (!data.name.trim() || !data.email.trim() || !data.occasion.trim() || !data.message.trim()) {
    return { ok: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }

  console.info("[Kontaktanfrage]", { ...data, receivedAt: new Date().toISOString() });
  return { ok: true };
}
