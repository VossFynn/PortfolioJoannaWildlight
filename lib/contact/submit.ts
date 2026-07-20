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
 * Sendet die Anfrage an Payloads REST-API (Collection contact-submissions,
 * öffentlicher `create`-Zugriff — siehe collections/ContactSubmissions.ts).
 * Einträge landen im Admin-Panel unter "Contact Submissions". Optionaler
 * E-Mail-Versand: RESEND_API_KEY setzen und @payloadcms/email-resend in
 * payload.config.ts einbinden (siehe PROJECT_README.md) — ohne Key läuft
 * alles wie hier, nur ohne Benachrichtigungsmail.
 */
export async function submitContactRequest(data: ContactRequest): Promise<ContactResult> {
  if (!data.name.trim() || !data.email.trim() || !data.occasion.trim() || !data.message.trim()) {
    return { ok: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }

  try {
    const res = await fetch("/api/contact-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false, error: "Netzwerkfehler." };
  }
}
