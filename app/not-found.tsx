import { Button } from "@/components/primitives/Button";
import { SectionDivider } from "@/components/primitives/SectionDivider";
import { SunCircle } from "@/components/primitives/SunCircle";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center px-6 py-24 text-center md:py-36">
      <SunCircle className="h-24 w-24 md:h-28 md:w-28" />
      <h1 className="mt-8 font-display text-[32px] font-medium italic md:text-[50px]">
        Diese Seite gibt es nicht.
      </h1>
      <SectionDivider className="mt-5.5 md:mt-7" />
      <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-[17px]">
        Der Link ist vielleicht veraltet, oder die Seite wurde verschoben. Von der Startseite aus
        findest du alles wieder.
      </p>
      <Button href="/" variant="outline-dark" className="mt-9 md:mt-11">
        Zur Startseite
      </Button>
    </section>
  );
}
