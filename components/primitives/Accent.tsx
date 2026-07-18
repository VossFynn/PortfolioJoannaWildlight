import type { AccentedText } from "@/lib/content/types";

interface AccentProps {
  text: AccentedText;
  /** dark = Akzent auf dunklem Grund (CTA-Band) in Gold-Pale statt Gold-Dark. */
  on?: "light" | "dark";
}

/**
 * Rendert AccentedText: mit *Sternchen* markierte Teile werden zum
 * italic-Gold-<span>, "\n" wird zum Umbruch (Mobile-Headlines).
 */
export function Accent({ text, on = "light" }: AccentProps) {
  const accentClass =
    on === "dark" ? "italic text-gold-pale" : "italic text-gold-dark";

  return (
    <>
      {text.split("\n").map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line.split(/(\*[^*]+\*)/).map((part, i) =>
            part.startsWith("*") && part.endsWith("*") ? (
              <span key={i} className={accentClass}>
                {part.slice(1, -1)}
              </span>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </>
  );
}
