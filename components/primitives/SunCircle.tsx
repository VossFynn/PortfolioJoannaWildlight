interface SunCircleProps {
  /** Durchmesser in px (Design: 230 Desktop, ~150 Mobile via className). */
  className?: string;
}

/** Warmer Gold-Glow-Kreis hinter der Intro-Collage. */
export function SunCircle({ className = "" }: SunCircleProps) {
  return (
    <div
      aria-hidden
      className={`rounded-pill ${className}`}
      style={{
        background:
          "radial-gradient(circle at 40% 40%, var(--jw-sun-glow), var(--jw-sun-glow-mid) 65%, transparent 75%)",
      }}
    />
  );
}
