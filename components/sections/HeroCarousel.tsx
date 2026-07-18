"use client";

import { useEffect, useState } from "react";

import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import type { HeroImage } from "@/lib/content/types";

interface HeroCarouselProps {
  slides: HeroImage[];
  title: string;
  subtitle: string;
}

const INTERVAL_MS = 5500;

/**
 * Automatisches Hero-Carousel (bewusste Abweichung vom Design-Doc):
 * Slides crossfaden endlos; Overlay-Verlauf und Titel liegen fix darüber.
 * Bei prefers-reduced-motion bleibt statisch das erste Bild stehen.
 */
export function HeroCarousel({ slides, title, subtitle }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || slides.length < 2) return;
    setAnimate(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      className="relative h-[560px] overflow-hidden md:h-[680px]"
      role="region"
      aria-roledescription="Karussell"
      aria-label="Eindrücke aus Shootings"
    >
      {/* Slides (crossfade) */}
      {slides.map((slide, i) => (
        <div
          key={slide.imageKey}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <PlaceholderImage
            imageKey={slide.imageKey}
            className="h-full w-full"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Fixes Overlay: Gold-Schleier oben + dunkler Verlauf unten */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 78% 8%, var(--jw-hero-glow), transparent 65%), linear-gradient(to top, var(--jw-hero-overlay-from), var(--jw-hero-overlay-to) 55%)",
        }}
      />

      {/* Fixer Titel */}
      <div className="absolute inset-x-6 bottom-9 text-ivory md:inset-x-0 md:bottom-22 md:text-center">
        <h1 className="font-display text-[32px] font-medium italic tracking-[0.12em] md:text-[58px] md:tracking-[0.16em]">
          {title}
        </h1>
        <p className="mt-2 text-[13px] uppercase tracking-[0.24em] opacity-90 md:mt-3 md:text-[17px] md:tracking-[0.28em]">
          {subtitle}
        </p>
      </div>

      {/* Dezente Dots */}
      {animate && slides.length > 1 && (
        <div aria-hidden className="absolute inset-x-0 bottom-3 flex justify-center gap-2.5 md:bottom-6">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-pill transition-colors duration-500 ${
                i === index ? "bg-ivory/90" : "bg-ivory/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Screenreader-Status */}
      <p className="sr-only" aria-live="polite">
        {slides[index]?.alt}
      </p>
    </section>
  );
}
