"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/lib/content/types";

const AUTO_ROTATE_MS = 6000;

const arrowClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-text-muted text-lg text-text-tertiary transition-colors hover:border-gold hover:text-gold-dark md:h-13 md:w-13 md:text-xl";

function Dots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-0.5 md:gap-1">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Zitat ${i + 1} von ${count} anzeigen`}
          aria-current={i === active}
          className="flex h-7 w-7 items-center justify-center"
        >
          <span
            className={`h-2 w-2 rounded-pill transition-colors duration-300 ${
              i === active ? "bg-gold" : "bg-dot-inactive hover:bg-gold-light"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/**
 * Karussell mit Pfeilen + Dots. Auto-Rotate alle 6s (aus bei
 * prefers-reduced-motion); manuelle Navigation setzt den Timer zurück.
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoRotate = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      testimonials.length < 2
    )
      return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
  }, [testimonials.length]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startAutoRotate]);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
    startAutoRotate();
  };

  const select = (i: number) => {
    setIndex(i);
    startAutoRotate();
  };

  const current = testimonials[index];

  const card = (
    <figure
      className="rounded-card bg-ivory px-7 py-9 text-left md:flex-1 md:px-16 md:py-14"
      aria-live="polite"
    >
      <div aria-hidden className="font-display text-[28px] tracking-[0.2em] text-gold md:text-3xl">
        “
      </div>
      <blockquote className="mt-1.5 font-display text-xl italic leading-relaxed md:mt-2 md:text-2xl">
        {current.quote}
      </blockquote>
      <figcaption className="mt-5 text-[13px] uppercase tracking-[0.14em] text-text-tertiary md:mt-7 md:text-[15px]">
        — {current.author}
      </figcaption>
    </figure>
  );

  return (
    <div>
      {/* Desktop: Pfeile neben der Karte */}
      <div className="mx-auto hidden max-w-4xl items-center gap-8 md:flex">
        <button type="button" onClick={() => go(-1)} className={arrowClass} aria-label="Vorheriges Zitat">
          ←
        </button>
        {card}
        <button type="button" onClick={() => go(1)} className={arrowClass} aria-label="Nächstes Zitat">
          →
        </button>
      </div>
      <div className="mt-8 hidden justify-center md:flex">
        <Dots count={testimonials.length} active={index} onSelect={select} />
      </div>

      {/* Mobile: Pfeile + Dots unter der Karte */}
      <div className="md:hidden">
        {card}
        <div className="mt-7 flex items-center justify-center gap-6">
          <button type="button" onClick={() => go(-1)} className={arrowClass} aria-label="Vorheriges Zitat">
            ←
          </button>
          <Dots count={testimonials.length} active={index} onSelect={select} />
          <button type="button" onClick={() => go(1)} className={arrowClass} aria-label="Nächstes Zitat">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
