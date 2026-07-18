import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";

interface PolaroidProps {
  imageKey: string;
  /** Rotation in Grad (Design: 5° beim Intro-Detail-Foto). */
  rotate?: number;
  className?: string;
}

/** Polaroid-Rahmen: Card-Hintergrund, unten breiterer Rand, Schatten, leicht gedreht. */
export function Polaroid({ imageKey, rotate = 5, className = "" }: PolaroidProps) {
  return (
    <div
      className={`bg-card p-[9px] pb-[30px] shadow-sticker ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <PlaceholderImage imageKey={imageKey} tone="card" labelSize="sm" className="h-full w-full" />
    </div>
  );
}
