"use client";

import { useState } from "react";

import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import type { ResolvedImage } from "@/lib/content/types";

interface CategoryCarouselProps {
  images: (ResolvedImage | null)[];
  /** Streifen-Variante der Platzhalter passend zum Sektions-BG. */
  tone?: "ivory" | "greige";
  /** Höhe/Rotation/Schatten kommen vom Aufrufer. */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Karussell einer Fotografie-Kategorie: Crossfade zwischen den Slides,
 * Dots wechseln per Klick direkt zum Bild (bei nur einem Slide keine Dots).
 * Klick aufs Bild vergrößert es (Lightbox via PlaceholderImage).
 */
export function CategoryCarousel({
  images,
  tone = "ivory",
  className = "",
  priority,
  sizes,
}: CategoryCarouselProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className={`relative ${className}`}>
      {images.map((image, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <PlaceholderImage
            image={image}
            tone={tone}
            className="h-full w-full"
            priority={priority && i === 0}
            sizes={sizes}
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1 md:bottom-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Bild ${i + 1} von ${images.length} anzeigen`}
              aria-current={i === index}
              className="flex h-7 w-7 items-center justify-center"
            >
              <span
                className={`h-2 w-2 rounded-pill shadow-sticker transition-colors duration-300 ${
                  i === index ? "bg-ivory/95" : "bg-ivory/45 hover:bg-ivory/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
