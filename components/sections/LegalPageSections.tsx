import { Accent } from "@/components/primitives/Accent";
import { Marquee } from "@/components/primitives/Marquee";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { StickerBadge } from "@/components/primitives/StickerBadge";
import { SunCircle } from "@/components/primitives/SunCircle";
import type { LegalPageContent, LegalSection } from "@/lib/content/types";

const LINK_PATTERN = /(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]{2,})/gi;

/** Erkennt bare E-Mail-Adressen/URLs in Fließtext und macht sie klickbar. */
function withLinks(text: string) {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-dark underline-offset-2 hover:underline"
        >
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-gold-dark underline-offset-2 hover:underline">
          {part}
        </a>
      );
    }
    return part;
  });
}

/** Ein Absatz; "\n" markiert Zeilenumbrüche innerhalb des Absatzes (z. B. Adressblock). */
function LegalParagraph({ text }: { text: string }) {
  return (
    <p className="text-[15px] leading-[1.85] text-text-secondary md:text-base md:leading-[1.9]">
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {withLinks(line)}
        </span>
      ))}
    </p>
  );
}

function SectionCard({ section, rotate }: { section: LegalSection; rotate: number }) {
  const lastPillIndex = section.pills.length - 1;
  return (
    <div
      className="rounded-card border border-line bg-card p-7 md:mb-10 md:break-inside-avoid md:p-11"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-baseline gap-3 md:gap-4">
        <span className="font-display text-lg italic text-gold md:text-[22px]">{section.number}</span>
        <h2 className="font-display text-[22px] font-medium md:text-[28px]">{section.title}</h2>
      </div>
      <div className="mt-4 flex flex-col gap-3.5 md:mt-5 md:gap-4">
        {section.paragraphs.map((p, i) => (
          <LegalParagraph key={i} text={p} />
        ))}
      </div>
      {section.list.length > 0 && (
        <ul className="mt-4 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-text-secondary md:mt-5 md:text-base">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.pills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
          {section.pills.map((pill, i) => (
            <span
              key={pill}
              className={
                i === lastPillIndex
                  ? "inline-flex h-9 items-center rounded-pill border border-gold bg-gold-dark px-4 text-[13px] text-ivory md:h-10 md:px-5 md:text-sm"
                  : "inline-flex h-9 items-center rounded-pill border border-border-input bg-ivory px-4 text-[13px] text-text-secondary md:h-10 md:px-5 md:text-sm"
              }
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Rechtstext-Seite (Impressum/Datenschutz): Hero mit Kicker/Headline/Sticker,
 * Laufband, dann nummerierte Karten in einem CSS-Columns-Layout (füllt Spalte
 * 1 komplett top-down, dann Spalte 2 — balanciert unterschiedlich lange
 * Karten von selbst, anders als ein zeilenweises Grid).
 */
export function LegalPageSections({ content }: { content: LegalPageContent }) {
  const noteRotate = content.sections.length % 2 === 0 ? -0.4 : 0.4;

  return (
    <>
      <section className="relative px-6 pb-10 pt-16 text-center md:px-30 md:pb-16 md:pt-26">
        <SunCircle className="absolute left-6 top-24 hidden h-16 w-16 opacity-55 md:block" />
        <div className="font-mono text-[11px] tracking-[0.2em] text-text-muted md:text-xs">
          {content.kicker}
        </div>
        <h1 className="mt-4 font-display text-[34px] font-medium md:mt-5 md:text-[56px]">
          <Accent text={content.headline} />
        </h1>
        <SectionDivider className="mt-5 md:mt-7" />
        <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-text-secondary md:mt-6 md:text-[17px]">
          {content.subtitle}
        </p>
        <StickerBadge rotate={-4} className="mt-6 md:absolute md:right-[150px] md:top-24 md:mt-0">
          {content.badgeLabel}
        </StickerBadge>
      </section>

      <Marquee items={content.marqueeItems} />

      <section className="px-6 py-14 md:px-30 md:py-24">
        <div className="flex flex-col gap-7 md:block md:columns-2 md:gap-x-12">
          {content.sections.map((section, i) => (
            <SectionCard key={section.number} section={section} rotate={i % 2 === 0 ? -0.5 : 0.5} />
          ))}
          <div
            className="rounded-card bg-greige p-7 md:break-inside-avoid md:p-11"
            style={{ transform: `rotate(${noteRotate}deg)` }}
          >
            <div className="font-display text-xl italic text-gold-dark md:text-[21px]">
              {content.note.title}
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-text-secondary md:mt-4 md:text-[15px]">
              {content.note.body}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
