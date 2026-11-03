// "A sua seleção" (Part 2 of 3 Nov): the homes and regions a reader saves with a heart, kept on their own device only
// (localStorage "ip.saved", never a cookie, never sent). One shared helper for every heart on the site (homes on the
// showcase pages, map cards and Concierge listings; regions on the map cards, place pages and the simulators).
// After each change it fires "ip:saved" on window so every heart and the header link can follow.
export type Kind = "home" | "region";
export type Item = { kind: Kind; id: string; label: string; href: string; t: number };

const KEY = "ip.saved";

/** Everything saved on this device, newest first. Never throws (private mode, blocked storage: an empty list). */
export function get(): Item[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => x && (x.kind === "home" || x.kind === "region") && typeof x.id === "string") : [];
  } catch { return []; }
}

export function has(kind: Item["kind"], id: string): boolean {
  return get().some((x) => x.kind === kind && x.id === id);
}

/** Saves the item, or removes it if it is already saved. Returns true when the item is now saved. */
export function toggle(item: Omit<Item, "t"> & { t?: number }): boolean {
  const list = get(), i = list.findIndex((x) => x.kind === item.kind && x.id === item.id);
  const on = i < 0;
  if (on) list.unshift({ kind: item.kind, id: item.id, label: item.label, href: item.href, t: item.t ?? Date.now() });
  else list.splice(i, 1);
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 200))); } catch { /* private mode: nothing kept */ }
  try { window.dispatchEvent(new CustomEvent("ip:saved", { detail: { kind: item.kind, id: item.id, on } })); } catch { /* old browser */ }
  return on;
}
