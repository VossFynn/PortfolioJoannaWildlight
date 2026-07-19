"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { withBasePath } from "@/lib/basePath";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

interface LightboxProps {
  /** Pfad aus dem Bild-Manifest (ohne basePath). */
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * Vergrößerte Bildansicht als Overlay. Schließt per Escape, Klick
 * (Backdrop wie Bild) oder Schließen-Button; sperrt den Seiten-Scroll,
 * solange sie offen ist. Rendert per Portal in den Body: rotierte
 * Rahmen (Polaroid/Karten, transform) bilden sonst den Containing Block
 * für position:fixed — das Overlay bliebe im Rahmen gefangen.
 */
export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-dark/90 p-4 md:p-10"
      onClick={onClose}
    >
      <div className="relative h-full w-full max-w-6xl">
        <Image src={withBasePath(src)} alt={alt} fill className="object-contain" sizes="100vw" />
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Vergrößertes Bild schließen"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-pill bg-ivory/10 text-2xl text-ivory transition-colors hover:bg-ivory/20"
      >
        ×
      </button>
    </div>,
    document.body
  );
}
