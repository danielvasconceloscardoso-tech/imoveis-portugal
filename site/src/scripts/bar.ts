// The journey chrome (Part 2 of 3 Nov): the five-item bar at the thumb on phones (the same five in the desktop header),
// the hearts, "Voltar" that returns to where the reader was, and the closing next step of every page. Each tap is a
// cookie-free event (lib/track.ts): {ed}/bar/{k} (phone bar), {ed}/nav/{k} (desktop header), {ed}/next/{k} (next step).
import { track, edOf } from "../lib/track";
import { initHearts } from "./hearts";

export function initBar() {
  initHearts();
  document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    const a = t.closest?.<HTMLElement>("[data-bb-k], [data-nav-k], [data-next-k]");
    if (a) {
      const k = a.dataset.bbK ? `bar/${a.dataset.bbK}` : a.dataset.navK ? `nav/${a.dataset.navK}` : `next/${a.dataset.nextK}`;
      track(`${edOf()}/${k}`);
    }
    const card = t.closest?.<HTMLElement>("[data-home-card]");
    if (card) track(`${edOf()}/p/${card.dataset.homeCard}/card`);
    // "Voltar": back to the page the reader came from on this site; the link's own address when there is none
    // (a shared link, a new tab).
    const back = t.closest?.<HTMLAnchorElement>("a[data-goback]");
    if (back && !(e as MouseEvent).metaKey && !(e as MouseEvent).ctrlKey && !(e as MouseEvent).shiftKey) {
      let same = false;
      try { same = !!document.referrer && new URL(document.referrer).origin === location.origin && new URL(document.referrer).pathname !== location.pathname; } catch { same = false; }
      if (same && history.length > 1) { e.preventDefault(); history.back(); }
    }
  });
  // The bar steps aside while the phone keyboard is up (a field has focus), so it never floats over what is typed.
  const bb = document.querySelector<HTMLElement>("[data-bb]");
  if (bb) {
    const typing = (el: Element | null) => !!el && (el as HTMLElement).matches?.("input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select, [contenteditable]");
    document.addEventListener("focusin", (e) => bb.classList.toggle("is-away", typing(e.target as Element)));
    document.addEventListener("focusout", () => setTimeout(() => bb.classList.toggle("is-away", typing(document.activeElement)), 60));
  }
}
