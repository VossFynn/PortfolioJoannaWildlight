"use client";

import { useState } from "react";

import { submitContactRequest } from "@/lib/contact/submit";
import { Button } from "@/components/primitives/Button";
import type { ContactContent } from "@/lib/content/types";

type FormContent = ContactContent["form"];

const inputClass =
  "h-[52px] rounded-card border border-border-input bg-card px-4 text-base text-ink md:px-4.5";
const labelClass = "flex flex-col gap-2 text-sm text-text-secondary md:gap-2.5 md:tracking-[0.04em]";
const errorClass = "text-sm italic text-gold-dark";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ form }: { form: FormContent }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    message: "",
  });
  const [source, setSource] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Bitte gib deinen Namen an.";
    if (!values.email.trim()) next.email = "Bitte gib deine E-Mail-Adresse an.";
    else if (!EMAIL_RE.test(values.email)) next.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    if (!values.occasion.trim()) next.occasion = "Bitte beschreibe kurz euren Anlass.";
    if (!values.message.trim()) next.message = "Bitte erzähl mir ein bisschen von euch.";
    if (!consent) next.consent = "Bitte bestätige die Datenschutzerklärung.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    const result = await submitContactRequest({ ...values, source });
    setStatus(result.ok ? "sent" : "failed");
  };

  if (status === "sent") {
    return (
      <div className="mt-11 rounded-card border border-line bg-card px-7 py-9 md:mt-14">
        <p className="font-display text-2xl italic text-gold-dark">Danke für eure Nachricht!</p>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          Ich melde mich schnell bei dir zurück.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-11 flex flex-col gap-6 md:mt-14 md:gap-7">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-7">
        <label className={labelClass}>
          {form.nameLabel}
          <input type="text" name="name" value={values.name} onChange={set("name")} required className={inputClass} />
          {errors.name && <span role="alert" className={errorClass}>{errors.name}</span>}
        </label>
        <label className={labelClass}>
          {form.emailLabel}
          <input type="email" name="email" value={values.email} onChange={set("email")} required className={inputClass} />
          {errors.email && <span role="alert" className={errorClass}>{errors.email}</span>}
        </label>
      </div>
      <label className={labelClass}>
        {form.phoneLabel}
        <input type="tel" name="phone" value={values.phone} onChange={set("phone")} className={inputClass} />
      </label>
      <label className={labelClass}>
        {form.occasionLabel}
        <input type="text" name="occasion" value={values.occasion} onChange={set("occasion")} required className={inputClass} />
        {errors.occasion && <span role="alert" className={errorClass}>{errors.occasion}</span>}
      </label>
      <label className={labelClass}>
        {form.messageLabel}
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          required
          className="resize-y rounded-card border border-border-input bg-card px-4 py-3.5 text-base leading-relaxed text-ink md:px-4.5"
        />
        {errors.message && <span role="alert" className={errorClass}>{errors.message}</span>}
      </label>

      {/* Quellen-Chips (Single-Select) */}
      <fieldset className="flex flex-col gap-3 md:gap-3.5">
        <legend className="mb-3 text-sm text-text-secondary md:mb-3.5 md:tracking-[0.04em]">
          {form.sourceQuestion}
        </legend>
        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {form.sources.map((label) => {
            const active = source === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setSource(active ? null : label)}
                className={`inline-flex h-[46px] items-center rounded-pill border px-5 text-[15px] transition-colors md:px-6 ${
                  active
                    ? "border-gold-dark bg-gold-dark text-ivory"
                    : "border-border-input bg-card text-text-secondary hover:border-gold-dark"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className="flex cursor-pointer items-start gap-3 md:gap-3.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 h-5 w-5 shrink-0 accent-gold-dark md:h-5 md:w-5"
          />
          <span className="text-sm leading-relaxed text-text-secondary">{form.consentText}</span>
        </label>
        {errors.consent && (
          <p role="alert" className={`mt-2 ${errorClass}`}>
            {errors.consent}
          </p>
        )}
      </div>

      <div>
        <Button type="submit" variant="filled-dark" className="w-full md:w-auto md:px-12">
          {status === "sending" ? "Wird gesendet …" : form.submitLabel}
        </Button>
        {status === "failed" && (
          <p role="alert" className={`mt-3 ${errorClass}`}>
            Das hat leider nicht geklappt. Bitte versuch es später noch einmal.
          </p>
        )}
      </div>
    </form>
  );
}
