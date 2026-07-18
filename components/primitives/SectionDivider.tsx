interface SectionDividerProps {
  /** center (Standard) oder linksbündig (z. B. „Meine Leidenschaft“, Kontakt). */
  align?: "center" | "left";
  className?: string;
}

/** Gold-Trennstrich unter Headlines: 48×1px Desktop, 44×1px Mobile. */
export function SectionDivider({ align = "center", className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={`h-px w-11 md:w-12 bg-gold ${align === "center" ? "mx-auto" : ""} ${className}`}
    />
  );
}
