import type { Metadata } from "next";
import Link from "next/link";

import { Accent } from "@/components/primitives/Accent";
import { ArchImage } from "@/components/primitives/ArchImage";
import { Button } from "@/components/primitives/Button";
import { Marquee } from "@/components/primitives/Marquee";
import { PlaceholderImage } from "@/components/primitives/PlaceholderImage";
import { Polaroid } from "@/components/primitives/Polaroid";
import { ScrollReveal } from "@/components/primitives/ScrollReveal";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { StickerBadge } from "@/components/primitives/StickerBadge";
import { SunCircle } from "@/components/primitives/SunCircle";
import { CTABand } from "@/components/sections/CTABand";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { getContentProvider } from "@/lib/content/provider";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getContentProvider().getPageContent("home");
  return { title: home.meta.title, description: home.meta.description };
}

export default async function HomePage() {
  const provider = getContentProvider();
  const [home, heroImages, testimonials, site] = await Promise.all([
    provider.getPageContent("home"),
    provider.getHeroImages(),
    provider.getTestimonials(),
    provider.getSiteContent(),
  ]);

  return (
    <>
      <HeroCarousel slides={heroImages} title={home.hero.title} subtitle={home.hero.subtitle} />

      {/* Intro + Collage */}
      <section className="relative overflow-hidden px-6 pt-16 md:overflow-visible md:px-30 md:py-30">
        <div className="items-center gap-24 md:grid md:grid-cols-[1fr_460px]">
          <div>
            <h1 className="font-display text-[40px] font-medium leading-[1.1] md:mb-8 md:text-[52px] md:leading-tight">
              <span className="md:hidden">
                <Accent text={home.intro.headlineMobile} />
              </span>
              <span className="hidden md:inline">
                <Accent text={home.intro.headline} />
              </span>
            </h1>
            <div className="hidden md:block">
              {home.intro.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-text-secondary first:mt-0">
                  {p}
                </p>
              ))}
              <Button href={home.intro.buttonHref} variant="outline-dark" className="mt-11">
                {home.intro.buttonLabel}
              </Button>
            </div>
          </div>

          {/* Collage */}
          <div className="relative mt-8 h-[430px] md:mt-0 md:h-[580px]">
            <SunCircle className="absolute -right-12 -top-14 h-[190px] w-[190px] md:-right-10 md:-top-9 md:h-[230px] md:w-[230px]" />
            <ArchImage
              imageKey={home.intro.portraitKey}
              size="portrait"
              className="absolute inset-y-0 left-0 right-14 md:right-16"
              priority
            />
            <Polaroid
              imageKey={home.intro.polaroidKey}
              rotate={5}
              className="absolute bottom-9 right-0 h-[165px] w-[130px] md:bottom-14 md:h-[190px] md:w-[150px]"
            />
            <StickerBadge className="absolute -bottom-4 left-3.5 md:left-5">
              {home.intro.stickerLabel}
            </StickerBadge>
          </div>

          {/* Mobile: Text + Button unter der Collage */}
          <div className="mt-11 md:hidden">
            {home.intro.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-base leading-relaxed text-text-secondary first:mt-0">
                {p}
              </p>
            ))}
            <div className="mt-8 text-center">
              <Button href={home.intro.buttonHref} variant="filled-dark">
                {home.intro.buttonLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={home.marqueeItems} className="mt-14 md:mt-0" />

      {/* Was ich festhalte */}
      <section className="bg-greige px-6 py-18 text-center md:px-30 md:py-26">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-medium md:text-[42px]">
            <Accent text={home.services.headline} />
          </h2>
          <SectionDivider className="my-4 md:my-5" />
          <p className="text-base text-text-tertiary md:text-[17px]">{home.services.subline}</p>
        </ScrollReveal>
        <div className="mt-11 flex flex-col gap-7 text-left md:mt-16 md:grid md:grid-cols-3 md:gap-12">
          {home.services.cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 120}>
              <div
                className="rounded-card bg-card p-3 pb-6.5 shadow-card md:p-3.5 md:pb-8"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.2 : 1.2}deg)` }}
              >
                <PlaceholderImage
                  imageKey={card.imageKey}
                  tone="card"
                  labelSize="sm"
                  className="h-[330px] rounded-t-[var(--jw-radius-arch-sm)] rounded-b-card md:h-[360px] md:rounded-t-[var(--jw-radius-arch-card)]"
                />
                <div className="px-5.5 pt-5.5 md:px-7 md:pt-7">
                  <div className="font-display text-[25px] md:text-[28px]">{card.title}</div>
                  <p className="mt-2 text-base leading-relaxed text-text-secondary md:mt-2.5">
                    {card.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <Button href={home.services.buttonHref} variant="outline-dark" className="mt-11 md:mt-16">
          {home.services.buttonLabel}
        </Button>
      </section>

      {/* Kleine Werke */}
      <section className="px-6 py-18 text-center md:px-30 md:py-30">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-medium md:text-[42px]">
            <Accent text={home.works.headline} />
          </h2>
          <SectionDivider className="my-4 md:my-5" />
          <p className="mx-auto max-w-[620px] text-base leading-relaxed text-text-secondary md:text-[17px]">
            {home.works.text}
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-3.5 md:mt-14 md:grid-cols-4 md:gap-6">
          {home.works.imageKeys.map((key, i) => (
            <ScrollReveal key={key} delay={i * 100} className={i % 2 === 0 ? "mt-5 md:mt-8" : ""}>
              <PlaceholderImage
                imageKey={key}
                labelSize="sm"
                className="h-[230px] md:h-[400px]"
              />
            </ScrollReveal>
          ))}
        </div>
        <Button href={home.works.buttonHref} variant="outline-dark" className="mt-11 md:mt-16">
          {home.works.buttonLabel}
        </Button>
      </section>

      {/* Testimonials */}
      <section className="bg-greige px-6 py-18 text-center md:px-30 md:py-26">
        <ScrollReveal>
          <h2 className="mx-auto max-w-3xl font-display text-[27px] font-medium leading-snug md:text-[38px]">
            {home.testimonials.headline}
          </h2>
          <SectionDivider className="mt-4 md:mt-5" />
        </ScrollReveal>
        <div className="mt-9 md:mt-14">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Trust-Zeile */}
      <section className="flex flex-col gap-14 px-6 py-18 text-center md:grid md:grid-cols-2 md:items-center md:gap-16 md:px-30 md:py-26">
        <div className="flex flex-col items-center gap-4 md:gap-5">
          <div
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-[13px] border-[1.5px] border-ink md:h-13 md:w-13 md:rounded-[14px]"
          >
            <div className="h-4.5 w-4.5 rounded-pill border-[1.5px] border-ink md:h-5 md:w-5" />
          </div>
          <p className="text-base md:text-[17px]">
            {home.trust.instagramTextBefore}{" "}
            <Link
              href={site.instagram.url}
              className="font-display text-[19px] italic text-gold-dark md:text-xl"
            >
              {site.instagram.handle}
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center gap-3.5 md:gap-4">
          <div aria-hidden className="text-xl tracking-[5px] text-gold md:text-[22px] md:tracking-[6px]">
            ★★★★★
          </div>
          <p className="font-display text-[23px] md:text-[26px]">{home.trust.googleStarsLine}</p>
          <Button href={home.trust.reviewUrl} variant="outline-dark" className="h-12 px-7 text-sm tracking-[0.06em] md:h-[50px] md:px-8 md:tracking-[0.08em]">
            {home.trust.reviewButtonLabel}
          </Button>
        </div>
      </section>

      <CTABand content={home.cta} />
    </>
  );
}
