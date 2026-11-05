import { ev } from "../lib/track";

const SEEN = "ip.map.arrival.v1";
type MapRoot = HTMLElement & { __mapx?: { load: () => Promise<void> } };

export function initMapArrival(intro: HTMLElement) {
  if (intro.dataset.initialized) return;
  intro.dataset.initialized = "true";
  const frame = intro.closest<HTMLElement>("[data-map-arrival-frame]");
  const root = frame?.querySelector<MapRoot>("[data-m3]");
  if (!frame || !root) return;

  // The real map starts in parallel, including when the visual arrival is bypassed.
  // The engine owns the camera and shared-link state; this surface never changes either.
  let woke = false;
  const wake = () => {
    if (woke || !root.__mapx) return;
    woke = true;
    void root.__mapx.load().catch(() => {});
    root.removeEventListener("m3:ready", wake);
  };
  root.addEventListener("m3:ready", wake);
  wake();

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const query = new URLSearchParams(location.search);
  const direct = query.size > 0 || !!location.hash;
  let seen = false;
  try { seen = localStorage.getItem(SEEN) === "1"; } catch { /* private browsing */ }
  try { seen ||= sessionStorage.getItem(SEEN) === "1"; } catch { /* storage unavailable */ }
  // Any map visit counts, including a shared place link. Returning from that place
  // to the plain map should not introduce an arrival the reader already bypassed.
  try { localStorage.setItem(SEEN, "1"); } catch { /* session storage is the fallback */ }
  try { sessionStorage.setItem(SEEN, "1"); } catch { /* the arrival remains optional */ }
  if (direct || seen || reduce.matches || document.hidden) return;
  intro.hidden = false;
  frame.dataset.arrivalActive = "true";
  ev({ event: "map/arrival/shown", origin: "map" });
  const card = intro.querySelector<HTMLElement>(".map-arrival__card")!;
  let ended = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let remaining = 1880;
  let timerStarted = 0;
  let hovered = false;
  const finish = (reason: "explore" | "skip" | "complete", immediate = false, focusMap = false) => {
    if (ended) return;
    ended = true;
    clearTimeout(timer);
    timer = undefined;
    delete frame.dataset.arrivalActive;
    const heldFocus = intro.contains(document.activeElement);
    intro.inert = true;
    if (heldFocus || focusMap) root.querySelector<HTMLElement>("[data-spot-open]")?.focus({ preventScroll: true });
    if (immediate || reduce.matches) intro.hidden = true;
    else {
      intro.classList.add("is-leaving");
      setTimeout(() => { intro.hidden = true; }, 220);
    }
    ev({ event: `map/arrival/${reason}`, origin: "map" });
    root.removeEventListener("pointerdown", interact);
    root.removeEventListener("focusin", interact);
    window.removeEventListener("keydown", escape);
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("pagehide", leave);
    document.removeEventListener("visibilitychange", visibility);
    reduce.removeEventListener("change", reduced);
    card.removeEventListener("pointerenter", pointerEnter);
    card.removeEventListener("pointerleave", pointerLeave);
    intro.removeEventListener("focusin", pause);
    intro.removeEventListener("focusout", focusOut);
  };
  // Keep a control under the reader's pointer or keyboard focus until they finish.
  // This pauses only the optional card; the map is already loading and interactive.
  const pause = () => {
    if (timer === undefined) return;
    clearTimeout(timer);
    timer = undefined;
    remaining = Math.max(0, remaining - (performance.now() - timerStarted));
  };
  const resume = () => {
    if (ended || hovered || intro.contains(document.activeElement) || timer !== undefined) return;
    timerStarted = performance.now();
    timer = setTimeout(() => finish("complete"), remaining);
  };
  const pointerEnter = () => { hovered = true; pause(); };
  const pointerLeave = () => { hovered = false; resume(); };
  const focusOut = () => queueMicrotask(resume);
  const interact = () => finish("skip", true);
  const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish("skip", true); };
  const scroll = () => finish("skip", true);
  const reduced = () => { if (reduce.matches) finish("skip", true); };
  const leave = () => finish("skip", true);
  const visibility = () => { if (document.hidden) finish("skip", true); };
  intro.querySelector("[data-map-arrival-explore]")?.addEventListener("click", () => finish("explore", true, true));
  intro.querySelector("[data-map-arrival-skip]")?.addEventListener("click", () => finish("skip", true, true));
  root.addEventListener("pointerdown", interact, { passive: true });
  root.addEventListener("focusin", interact);
  window.addEventListener("keydown", escape);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("pagehide", leave);
  document.addEventListener("visibilitychange", visibility);
  reduce.addEventListener("change", reduced);
  card.addEventListener("pointerenter", pointerEnter);
  card.addEventListener("pointerleave", pointerLeave);
  intro.addEventListener("focusin", pause);
  intro.addEventListener("focusout", focusOut);
  // Passive arrival: 2.1 seconds total, independent of network/map readiness.
  // A tap is always immediate; leaving the controls resumes only the remaining time.
  resume();
}
