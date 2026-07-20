import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import type { ResolvedImage } from "@/lib/content/types";

interface PolaroidProps {
  image: ResolvedImage | null;
  /** Rotation in Grad (Design: 5° beim Intro-Detail-Foto). */
  rotate?: number;
  className?: string;
}

/** Polaroid-Rahmen: Card-Hintergrund, unten breiterer Rand, Schatten, leicht gedreht. */
export function Polaroid({ image, rotate = 5, className = "" }: PolaroidProps) {
  return (
    <div
      className={`bg-card p-[9px] pb-[30px] shadow-sticker ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <PlaceholderImage image={image} tone="card" labelSize="sm" className="h-full w-full" />
    </div>
  );
}
