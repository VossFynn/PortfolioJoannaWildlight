"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Lightbox } from "@/components/primitives/Lightbox";
import type { ResolvedImage } from "@/lib/content/types";

interface PlaceholderImageProps {
  image: ResolvedImage | null;
  /**
   * Größe/Radius/Rotation kommen vom Aufrufer. Kein `absolute` übergeben —
   * die Fläche ist intern position:relative (next/image fill); zum
   * Positionieren einen Wrapper mit fester Höhe verwenden.
   */
  className?: string;
  /** Streifen-Variante passend zum umgebenden Hintergrund. */
  tone?: "ivory" | "greige" | "card";
  /** Kleinere Label-Schrift auf Mobile-Flächen. */
  labelSize?: "sm" | "md";
  /** Beschriftung des Platzhalters, solange in Payload noch kein Bild hochgeladen ist. */
  placeholderLabel?: string;
  sizes?: string;
  priority?: boolean;
  /** Klick öffnet das Bild vergrößert in der Lightbox (Default an). */
  expandable?: boolean;
}

/**
 * Bildfläche, gespeist aus Payload-Media (via ContentProvider). Ohne Bild:
 * gestreifter Platzhalter mit Monospace-Label und warmem Radial-Glow
 * (Design-Handoff) — zeigt an, dass im CMS noch ein Foto fehlt. Mit Bild:
 * next/image (fill), responsive über den Next-Image-Optimizer. Jedes echte
 * Bild ist per Klick vergrößerbar (expandable={false} schaltet ab).
 */
export function PlaceholderImage({
  image,
  className = "",
  tone = "ivory",
  labelSize = "md",
  placeholderLabel = "Bild folgt",
  sizes = "100vw",
  priority,
  expandable = true,
}: PlaceholderImageProps) {
  const [expanded, setExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (image) {
    return (
      <>
        <div className={`relative overflow-hidden ${className}`}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
            placeholder={image.blurDataURL ? "blur" : undefined}
            blurDataURL={image.blurDataURL ?? undefined}
          />
          {expandable && (
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setExpanded(true)}
              aria-label={`Bild vergrößern: ${image.alt}`}
              className="absolute inset-0 cursor-zoom-in"
            />
          )}
        </div>
        {expandable && expanded && (
          <Lightbox
            src={image.url}
            alt={image.alt}
            onClose={() => {
              setExpanded(false);
              triggerRef.current?.focus();
            }}
          />
        )}
      </>
    );
  }

  const stripes = {
    ivory: ["var(--jw-stripe-a)", "var(--jw-stripe-b)"],
    greige: ["var(--jw-stripe-alt-a)", "var(--jw-stripe-alt-b)"],
    card: ["var(--jw-stripe-card-a)", "var(--jw-stripe-card-b)"],
  } as const;
  const [stripeA, stripeB] = stripes[tone];

  return (
    <div
      role="img"
      aria-label={placeholderLabel}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `repeating-linear-gradient(45deg, ${stripeA}, ${stripeA} 10px, ${stripeB} 10px, ${stripeB} 20px)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 52% at 50% 0%, var(--jw-placeholder-glow), transparent 62%)`,
        }}
      />
      <div
        className={`absolute top-4 left-5 font-mono text-text-tertiary ${
          labelSize === "sm" ? "text-[11px]" : "text-xs"
        }`}
      >
        {placeholderLabel}
      </div>
    </div>
  );
}
