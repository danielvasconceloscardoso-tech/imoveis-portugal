import { ev } from "../lib/track";

const SEEN = "ip.map.arrival.v1";

// Prompt 81 (UX problem 8): the welcome stays until the reader acts (it left by itself after two seconds, often before
// its photograph had arrived). Its one action opens the finder; "View the map", any touch on the map, a scroll or Escape
// put it away. Shown once: any later visit, or a shared link with a place, goes straight to the map.
export function initMapArrival(intro: HTMLElement) {
  if (intro.dataset.initialized) return;
  intro.dataset.initialized = "true";
  const frame = intro.closest<HTMLElement>("[data-map-arrival-frame]");
  const root = frame?.querySelector<HTMLElement>("[data-m3]");
  if (!frame || !root) return;

  // MapV3 owns background loading and prioritizes a shared place's card/photo.
  // This optional introduction never bypasses that existing scheduling.
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
  if (direct || seen || document.hidden) return;
  intro.hidden = false;
  frame.dataset.arrivalActive = "true";
  ev({ event: "map/arrival/shown", origin: "map" });
  let ended = false;
  const finish = (reason: "explore" | "skip" | "find", immediate = false, focusMap = false) => {
    if (ended) return;
    ended = true;
    delete frame.dataset.arrivalActive;
    const heldFocus = intro.contains(document.activeElement);
    intro.inert = true;
    if ((heldFocus || focusMap) && reason !== "find") root.querySelector<HTMLElement>("[data-spot-open]")?.focus({ preventScroll: true });
    if (immediate || reduce.matches) intro.hidden = true;
    else {
      intro.classList.add("is-leaving");
      setTimeout(() => { intro.hidden = true; }, 220);
    }
    ev({ event: `map/arrival/${reason}`, origin: "map" });
    root.removeEventListener("pointerdown", interact);
    window.removeEventListener("keydown", escape);
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("pagehide", leave);
  };
  const interact = () => finish("skip", true);
  const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish("skip", true); };
  const scroll = () => finish("skip", true);
  const leave = () => finish("skip", true);
  intro.querySelector("[data-map-arrival-explore]")?.addEventListener("click", () => finish("explore", false, true));
  // The finder (map-v3.ts listens for "m3:find" on the map's root and opens the panel). The mark on the root is for a
  // press that comes before that script has arrived: it finds the mark when it starts and opens the panel then.
  intro.querySelector("[data-map-arrival-find]")?.addEventListener("click", () => { finish("find", true); root.dataset.m3Find = "1"; root.dispatchEvent(new Event("m3:find")); });
  root.addEventListener("pointerdown", interact, { passive: true });
  window.addEventListener("keydown", escape);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("pagehide", leave);
}
