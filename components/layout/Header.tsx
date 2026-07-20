"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { NavItem, ResolvedImage } from "@/lib/content/types";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

interface HeaderProps {
  logo: { top: string; bottom: string; image: ResolvedImage | null };
  nav: NavItem[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Muss zur Transition-Dauer der `.jw-drawer`-Klasse in globals.css passen. */
const DRAWER_TRANSITION_MS = 220;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Header({ logo, nav }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drawerPathname, setDrawerPathname] = useState(pathname);
  // `mounted` hält den Drawer im DOM, bis die Exit-Transition fertig ist;
  // `entered` schaltet die geöffnete Optik erst einen Frame nach dem Mounten
  // um, sonst hat der Browser keine Chance, den geschlossenen Ausgangszustand
  // zu malen, und die CSS-Transition würde nicht abspielen.
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Menü schließt automatisch bei Routenwechsel (z. B. Browser-Zurück). Als
  // Render-Zeit-Anpassung statt Effekt (React-empfohlenes Pattern fürs
  // Zurücksetzen von State bei geänderter Prop) — kein zusätzlicher Renderpass.
  if (pathname !== drawerPathname) {
    setDrawerPathname(pathname);
    setOpen(false);
  }

  // Drawer-Mount/Optik synchron zu `open` nachziehen (gleiches Render-Zeit-
  // Pattern wie oben) — nur das Abwarten eines Frames vorm Auf- bzw. eines
  // Timers vorm Zublenden ist eine echte externe Synchronisation und bleibt
  // im Effekt darunter. Bei reduced-motion passiert alles hier sofort, ganz
  // ohne Verzögerung.
  if (open && !mounted) {
    setMounted(true);
  }
  if (!open && mounted && prefersReducedMotion()) {
    setMounted(false);
  }
  if (open && mounted && !entered && prefersReducedMotion()) {
    setEntered(true);
  }
  if (!open && entered) {
    setEntered(false);
  }

  // Nicht-reduced-motion-Fall: eine Frame nach dem Mounten auf die geöffnete
  // Optik umschalten (sonst hat der Browser den Ausgangszustand nicht
  // gemalt und die CSS-Transition spielt nicht ab); beim Schließen erst
  // nach Ablauf der Exit-Transition unmounten.
  useEffect(() => {
    if (!mounted || prefersReducedMotion()) return;

    if (open) {
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }

    const timeout = setTimeout(() => setMounted(false), DRAWER_TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [mounted, open]);

  // Solange der Drawer (inkl. Exit-Transition) im DOM steht, Seiten-Scroll
  // sperren (iOS-sicher); Escape schließt.
  useEffect(() => {
    if (!mounted) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted]);

  // Fokus auf den Schließen-Button erst, sobald der Drawer tatsächlich im
  // DOM ist (Ref existiert erst nach dem Mount-Render).
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  const closeAndRestoreFocus = () => {
    setOpen(false);
    burgerRef.current?.focus();
  };

  // Solange in Payload noch kein Logo-Bild hochgeladen ist: Textmarke aus
  // logo.top/bottom statt next/image (verhindert kaputtes Bild im Header).
  const logoImage = logo.image ? (
    <Image
      src={logo.image.url}
      alt={`${logo.top} ${logo.bottom}`}
      width={310}
      height={130}
      priority
      className="h-9 w-auto md:h-12"
    />
  ) : (
    <span className="font-display leading-tight">
      <span className="block text-base md:text-xl">{logo.top}</span>
      <span className="block text-sm italic text-gold-dark md:text-base">{logo.bottom}</span>
    </span>
  );

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-ivory pl-5 pr-2 md:h-[88px] md:px-16">
      <Link href="/" aria-label={`${logo.top} ${logo.bottom} — Startseite`} aria-hidden={open} tabIndex={open ? -1 : undefined}>
        {/* PNG ist randlos aufs Wortmark beschnitten (2x für Retina) —
            Höhe entspricht der Logo-Größe aus dem Design (Mobile ~34px, Desktop ~48px) */}
        {logoImage}
      </Link>

      {/* Desktop-Nav */}
      <nav className="hidden gap-10 text-[15px] tracking-[0.04em] md:flex" aria-label="Hauptnavigation">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`pb-1 transition-colors hover:text-gold-dark ${
                active ? "border-b border-gold" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile-Burger (48×48 Hit-Target, zwei 24×1.5px-Linien) */}
      <button
        ref={burgerRef}
        type="button"
        className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Menü öffnen"
        aria-hidden={open}
        tabIndex={open ? -1 : undefined}
        onClick={() => setOpen(true)}
      >
        <span className="block h-[1.5px] w-6 bg-ink transition-transform" />
        <span className="block h-[1.5px] w-6 bg-ink transition-transform" />
      </button>

      {/* Fullscreen-Drawer (Mobile), per Portal in den Body: deckt den kompletten
          Viewport ab (inkl. Header-Zeile) statt sich auf top-16 + die Live-Position
          des sticky Headers zu verlassen. In iOS Safari hinkt position:sticky bei
          schnellem/Momentum-Scrollen manchmal einen Frame hinterher — ein Klick auf
          den Burger währenddessen ließ den Hintergrund durch die Lücke unter dem
          (noch nicht angedockten) Header aufblitzen. Die Drawer-eigene Kopfzeile
          (Logo + Schließen-Button) macht sie unabhängig vom echten Header.
          Fade + leichtes Absinken aus der Kopfzeile (.jw-drawer in globals.css,
          Dauer muss zu DRAWER_TRANSITION_MS passen). */}
      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptnavigation mobil"
            className={`jw-drawer fixed inset-0 z-[60] flex flex-col bg-ivory md:hidden ${
              entered ? "jw-drawer-open" : ""
            }`}
          >
            <div className="flex h-16 items-center justify-between border-b border-line pl-5 pr-2">
              <Link href="/" aria-label={`${logo.top} ${logo.bottom} — Startseite`} onClick={closeAndRestoreFocus}>
                {logoImage}
              </Link>
              <button
                ref={closeRef}
                type="button"
                className="flex h-12 w-12 flex-col items-center justify-center gap-1.5"
                aria-label="Menü schließen"
                onClick={closeAndRestoreFocus}
              >
                <span className="block h-[1.5px] w-6 translate-y-[3.75px] rotate-45 bg-ink" />
                <span className="block h-[1.5px] w-6 -translate-y-[3.75px] -rotate-45 bg-ink" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-9" aria-label="Hauptnavigation mobil">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={closeAndRestoreFocus}
                    className={`font-display text-3xl transition-colors hover:text-gold-dark ${
                      active ? "italic text-gold-dark" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}
