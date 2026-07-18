interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Endloses Laufband (~30s Loop). Der Inhalt wird dupliziert und per CSS um
 * -50% verschoben; bei prefers-reduced-motion steht das Band still
 * (Regel in globals.css).
 */
export function Marquee({ items, className = "" }: MarqueeProps) {
  // Sequenz mehrfach wiederholen, damit eine Hälfte breiter als der Viewport ist.
  const sequence = Array.from({ length: 4 }, () => items)
    .flat()
    .join(" · ");

  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y border-greige py-3.5 md:py-4 font-display italic text-lg md:text-xl text-gold-dark ${className}`}
    >
      <div className="jw-marquee-track inline-block">
        <span>{sequence} · </span>
        <span aria-hidden>{sequence} · </span>
      </div>
    </div>
  );
}
