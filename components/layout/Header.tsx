"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { withBasePath } from "@/lib/basePath";
import type { NavItem } from "@/lib/content/types";

interface HeaderProps {
  logo: { top: string; bottom: string };
  nav: NavItem[];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header({ logo, nav }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Solange der Drawer offen ist, Seiten-Scroll sperren; Escape schließt.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const logoBlock = (
    <Link href="/" aria-label={`${logo.top} ${logo.bottom} — Startseite`}>
      {/* PNG ist randlos aufs Wortmark beschnitten (2x für Retina) —
          Höhe entspricht der Logo-Größe aus dem Design (Mobile ~34px, Desktop ~48px) */}
      <Image
        src={withBasePath("/images/logo.png")}
        alt={`${logo.top} ${logo.bottom}`}
        width={310}
        height={130}
        priority
        className="h-9 w-auto md:h-12"
      />
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-ivory pl-5 pr-2 md:h-[88px] md:px-16">
      {logoBlock}

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
        type="button"
        className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block h-[1.5px] w-6 bg-ink transition-transform ${open ? "translate-y-[3.75px] rotate-45" : ""}`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-ink transition-transform ${open ? "-translate-y-[3.75px] -rotate-45" : ""}`}
        />
      </button>

      {/* Fullscreen-Drawer (Mobile) */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-30 flex flex-col items-center justify-center gap-9 bg-ivory md:hidden"
        >
          <nav
            className="flex flex-col items-center gap-9"
            aria-label="Hauptnavigation mobil"
          >
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`font-display text-3xl transition-colors hover:text-gold-dark ${
                    active ? "italic text-gold-dark" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
