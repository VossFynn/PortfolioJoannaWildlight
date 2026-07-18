import Image from "next/image";

import { getImage } from "@/lib/images/manifest";

interface PlaceholderImageProps {
  imageKey: string;
  /** Größe/Radius/Rotation kommen vom Aufrufer (absolute/relative Fläche). */
  className?: string;
  /** Streifen-Variante passend zum Sektions-Hintergrund. */
  tone?: "ivory" | "greige";
  /** Kleinere Label-Schrift auf Mobile-Flächen. */
  labelSize?: "sm" | "md";
  sizes?: string;
  priority?: boolean;
}

/**
 * Bildfläche aus dem Manifest. Ohne src: gestreifter Platzhalter mit
 * Monospace-Label und warmem Radial-Glow (Design-Handoff). Mit src:
 * next/image (fill) ohne Glow — Austausch nur über lib/images/manifest.ts.
 */
export function PlaceholderImage({
  imageKey,
  className = "",
  tone = "ivory",
  labelSize = "md",
  sizes,
  priority,
}: PlaceholderImageProps) {
  const asset = getImage(imageKey);

  if (asset.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  const stripeA = tone === "greige" ? "var(--jw-stripe-alt-a)" : "var(--jw-stripe-a)";
  const stripeB = tone === "greige" ? "var(--jw-stripe-alt-b)" : "var(--jw-stripe-b)";
  const glowX = asset.glowX ?? 50;

  return (
    <div
      role="img"
      aria-label={asset.alt}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `repeating-linear-gradient(45deg, ${stripeA}, ${stripeA} 10px, ${stripeB} 10px, ${stripeB} 20px)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 52% at ${glowX}% 0%, var(--jw-placeholder-glow), transparent 62%)`,
        }}
      />
      <div
        className={`absolute top-4 left-5 font-mono text-text-tertiary ${
          labelSize === "sm" ? "text-[11px]" : "text-xs"
        }`}
      >
        {asset.label}
      </div>
    </div>
  );
}
