"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Verzögerung in ms für gestaffelte Einblendung (Karten, Grids). */
  delay?: number;
  className?: string;
}

/**
 * Blendet Inhalt beim ersten Sichtbarwerden ein (IntersectionObserver,
 * einmalig). Bei prefers-reduced-motion ist der Inhalt sofort sichtbar
 * (CSS-Regel in globals.css überschreibt die Animation).
 */
export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`jw-reveal ${visible ? "jw-reveal-visible" : ""} ${className}`}
      style={delay ? ({ "--jw-reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
