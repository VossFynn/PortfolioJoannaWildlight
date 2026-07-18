interface StickerBadgeProps {
  children: React.ReactNode;
  /** Rotation in Grad (Design: -4°). */
  rotate?: number;
  className?: string;
}

/** Dunkler Pill-Sticker mit Gold-Pale-Text (z. B. „★ 5,0 bei Google“). */
export function StickerBadge({ children, rotate = -4, className = "" }: StickerBadgeProps) {
  return (
    <div
      className={`inline-block whitespace-nowrap rounded-pill bg-dark px-6 py-3 text-sm tracking-[0.06em] text-gold-pale shadow-sticker ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
