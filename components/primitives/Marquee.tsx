interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Ziel-Tempo des Laufbands: ~50px/s (30s für die frühere ~1500px-Hälfte). */
const PX_PER_SECOND = 50;
/** Grobe Breite pro Zeichen in px (20px italic Serif) — nur fürs Timing/Sizing. */
const PX_PER_CHAR = 9;
/** Eine Track-Hälfte muss breiter sein als jeder realistische Viewport. */
const MIN_HALF_WIDTH_PX = 2600;

/**
 * Endloses Laufband. Der Inhalt wird so oft wiederholt, dass eine Hälfte
 * breiter als der Viewport ist (sonst entsteht am Loop-Ende Leerraum),
 * dann dupliziert und per CSS um -50% verschoben; die Dauer skaliert mit
 * der Breite, damit das Tempo unabhängig von der Wortanzahl gleich bleibt.
 * Bei prefers-reduced-motion steht das Band still (Regel in globals.css).
 */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const base = items.join(" · ") + " · ";
  const repeats = Math.max(2, Math.ceil(MIN_HALF_WIDTH_PX / (base.length * PX_PER_CHAR)));
  const sequence = base.repeat(repeats);
  const durationS = Math.round((sequence.length * PX_PER_CHAR) / PX_PER_SECOND);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y border-greige py-3.5 md:py-4 font-display italic text-lg md:text-xl text-gold-dark ${className}`}
    >
      <div
        className="jw-marquee-track inline-block"
        style={{ animationDuration: `${durationS}s` }}
      >
        <span>{sequence}</span>
        <span aria-hidden>{sequence}</span>
      </div>
    </div>
  );
}
