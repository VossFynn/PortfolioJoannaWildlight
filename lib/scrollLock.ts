/**
 * iOS-sicherer Seiten-Scroll-Lock für Overlays (Lightbox, Mobile-Drawer).
 * `overflow: hidden` nur auf dem Body reicht in iOS Safari nicht — die
 * Seite scrollt/rubberbandet hinter dem Overlay weiter. Gesperrt wird
 * deshalb auf dem Root-Element (wirkt in iOS Safari ab 16) plus
 * overscroll-behavior gegen Scroll-Chaining/Rubberbanding.
 * Bewusst KEIN position:fixed-Trick auf dem Body: der würde den
 * Sticky-Header beim Öffnen mitten auf der Seite aus dem Viewport schieben.
 */
export function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.documentElement.style.overscrollBehavior = "";
  document.body.style.overflow = "";
}
