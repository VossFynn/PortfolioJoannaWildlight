import { Accent } from "@/components/primitives/Accent";
import { Button } from "@/components/primitives/Button";
import type { CtaBandContent } from "@/lib/content/types";

/** Dunkles CTA-Band mit Gold-Glow, Akzent-Headline, optionalem Text/Zitat. */
export function CTABand({ content }: { content: CtaBandContent }) {
  return (
    <section className="relative overflow-hidden bg-dark px-7 py-18 text-center text-ivory md:px-30 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, var(--jw-cta-glow), transparent 65%)",
        }}
      />
      <div className="relative">
        <h2 className="font-display text-3xl font-medium leading-snug md:text-[44px]">
          <Accent text={content.headline} on="dark" />
        </h2>
        {content.text && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cta-text md:mt-6 md:text-[17px]">
            {content.text}
          </p>
        )}
        <Button href={content.buttonHref} variant="outline-gold" className="mt-9 md:mt-11">
          {content.buttonLabel}
        </Button>
        {content.quote && (
          <p className="mt-14 font-display text-lg italic text-quote-dark md:mt-18 md:text-[22px]">
            {content.quote}
          </p>
        )}
      </div>
    </section>
  );
}
