import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import type { ResolvedImage } from "@/lib/content/types";

interface ArchImageProps {
  image: ResolvedImage | null;
  /** portrait = großer Bogen (230px Desktop / 150px Mobile), card = Karten-Bogen (150px). */
  size?: "portrait" | "card";
  tone?: "ivory" | "greige";
  className?: string;
  priority?: boolean;
}

/** Bild mit Bogen-Radius oben (rund) und 4px-Ecken unten. */
export function ArchImage({
  image,
  size = "portrait",
  tone = "ivory",
  className = "",
  priority,
}: ArchImageProps) {
  const radius =
    size === "portrait"
      ? "rounded-t-[var(--jw-radius-arch-md)] md:rounded-t-[var(--jw-radius-arch)]"
      : "rounded-t-[var(--jw-radius-arch-sm)] md:rounded-t-[var(--jw-radius-arch-card)]";

  return (
    <PlaceholderImage
      image={image}
      tone={tone}
      priority={priority}
      className={`${radius} rounded-b-card ${className}`}
    />
  );
}
