"use client";

import { useState } from "react";

import type { FaqItem } from "@/lib/content/types";

/**
 * Q+A-Karten. Desktop: alle 9 Karten offen im 2-Spalten-Grid.
 * Mobile: Accordion — genau eine Frage offen (erste initial), erneutes
 * Tippen schließt sie.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      {/* Desktop: alle offen */}
      <div className="hidden grid-cols-2 items-start gap-x-12 gap-y-9 md:grid">
        {items.map((item) => (
          <div key={item.question} className="rounded-card border border-line bg-card px-10 py-9">
            <span aria-hidden className="block h-[9px] w-[9px] rounded-pill bg-gold-light" />
            <h2 className="mt-4 font-display text-[26px] italic">{item.question}</h2>
            <p className="mt-3.5 text-base leading-relaxed text-text-secondary">{item.answer}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Accordion */}
      <div className="flex flex-col gap-3.5 md:hidden">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          return (
            <div key={item.question} className="rounded-card border border-line bg-card">
              <h2>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-5.5 py-5 text-left"
                >
                  <span className="font-display text-[21px] italic leading-[1.4]">
                    {item.question}
                  </span>
                  <span aria-hidden className="w-6 shrink-0 text-center text-xl text-gold-dark">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
              </h2>
              {isOpen && (
                <p id={panelId} className="px-5.5 pb-6 text-base leading-relaxed text-text-secondary">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
