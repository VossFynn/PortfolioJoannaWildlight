import Link from "next/link";

type ButtonVariant = "outline-dark" | "filled-dark" | "outline-gold";

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center h-[52px] md:h-[54px] rounded-pill px-10 md:px-11 text-[15px] tracking-[0.08em] transition-colors duration-300 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  "outline-dark":
    "border border-ink text-ink hover:bg-ink hover:text-ivory",
  "filled-dark": "bg-ink text-ivory hover:bg-gold-dark",
  "outline-gold":
    "border border-gold-light text-gold-pale hover:bg-gold-light hover:text-dark",
};

/** Pill-Button (README: Höhe 52–56px, 15px, ls .08em, Transition ~300ms). */
export function Button({
  href,
  variant = "outline-dark",
  className = "",
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
