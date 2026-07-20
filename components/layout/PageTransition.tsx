"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Muss zur Transition-Dauer der `.jw-page-transition-out`-Klasse in globals.css passen. */
const TRANSITION_MS = 180;

/**
 * Sanfter Crossfade zwischen Routen. Ohne das hier swappt der App Router
 * Seiteninhalte instantan — auf Mobile fühlt sich das wie ein harter Sprung
 * statt eines Seitenwechsels an. Hält den zuletzt gerenderten Inhalt fest,
 * blendet ihn aus, und setzt erst danach auf den neuen `children`-Baum um
 * (der zu dem Zeitpunkt vom App Router schon aufgelöst ist). Bei
 * prefers-reduced-motion wird sofort umgeschaltet, ganz ohne Animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [content, setContent] = useState(children);
  const [path, setPath] = useState(pathname);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reagiert auf einen geänderten Pfad direkt beim Rendern statt in einem
  // Effekt (React-empfohlenes Pattern fürs Anpassen von State bei geänderter
  // Prop) — bei reduced-motion sofort umschalten, sonst nur `visible` auf
  // false setzen, um das Ausblenden anzustoßen. Der Effekt unten kümmert sich
  // danach ausschließlich um den Timer (ein echtes externes System), nie
  // direkt um den State-Sync selbst.
  if (pathname !== path) {
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setContent(children);
      setPath(pathname);
    } else if (visible) {
      setVisible(false);
    }
  }

  useEffect(() => {
    if (visible || pathname === path) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setContent(children);
      setPath(pathname);
      setVisible(true);
    }, TRANSITION_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible, pathname, path, children]);

  return (
    <div className={`jw-page-transition ${visible ? "" : "jw-page-transition-out"}`}>{content}</div>
  );
}
