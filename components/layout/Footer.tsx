import Link from "next/link";

import type { SiteContent } from "@/lib/content/types";

export function Footer({ site }: { site: SiteContent }) {
  const { footer } = site;
  return (
    <footer className="bg-footer px-7 pb-8 pt-14 text-center text-footer-text md:px-30 md:pb-10 md:pt-16">
      <div className="font-display text-[22px] tracking-[0.06em] md:text-2xl">{footer.name}</div>
      <div className="mt-2 text-sm text-footer-muted">{footer.tagline}</div>
      <div className="mt-5 font-display text-[17px] italic leading-relaxed text-footer-quote md:mt-6 md:text-lg">
        {footer.quote}
      </div>
      <div className="mt-7 flex justify-center gap-6 text-sm text-cta-text md:mt-8 md:gap-8">
        {footer.links.map((link) => (
          <Link key={link.label} href={link.href} className="transition-colors hover:text-gold-pale">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-7 border-t border-ink pt-5 text-xs text-footer-copyright md:mt-8 md:pt-6">
        {footer.copyright}
      </div>
    </footer>
  );
}
