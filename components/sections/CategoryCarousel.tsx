"use client";

import { useState } from "react";

import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import { Lightbox } from "@/components/sections/Lightbox";
import { getImage } from "@/lib/images/manifest";

interface CategoryCarouselProps {
  imageKeys: string[];
  /** Streifen-Variante der Platzhalter passend zum Sektions-BG. */
  tone?: "ivory" | "greige";
  /** Höhe/Rotation/Schatten kommen vom Aufrufer. */
  className?: string;
  priority?: boolean;
}

/**
 * Karussell einer Fotografie-Kategorie: Crossfade zwischen den Slides,
 * Dots wechseln per Klick direkt zum Bild (bei nur einem Slide keine Dots).
 * Klick aufs Bild öffnet die Lightbox (Esc / Klick daneben schließt).
 */
export function CategoryCarousel({
  imageKeys,
  tone = "ivory",
  className = "",
  priority,
}: CategoryCarouselProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const current = getImage(imageKeys[index]);

  return (
    <>
      <div className={`relative ${className}`}>
        {imageKeys.map((key, i) => (
          <div
            key={key}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <PlaceholderImage
              imageKey={key}
              tone={tone}
              className="h-full w-full"
              priority={priority && i === 0}
            />
          </div>
        ))}

        {/* Klickfläche über dem aktiven Bild: vergrößern */}
        {current.src && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label={`Bild vergrößern: ${current.alt}`}
            className="absolute inset-0 cursor-zoom-in"
          />
        )}

        {imageKeys.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1 md:bottom-3">
            {imageKeys.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} von ${imageKeys.length} anzeigen`}
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

      {expanded && current.src && (
        <Lightbox src={current.src} alt={current.alt} onClose={() => setExpanded(false)} />
      )}
    </>
  );
}
