// The reader's own selection (homes and regions), kept on this device only (localStorage "ip.saved"), never sent.
// Shared by the hearts, "A sua seleção" and the simulator's "Guardar a região": same key, same shape, same API.
// Every change dispatches a window event "ip:saved" so every control on the page can follow.
export type Kind = "home" | "region";
export type Item = { kind: Kind; id: string; label: string; href: string; t: number };

const KEY = "ip.saved";

export function get(): Item[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => x && (x.kind === "home" || x.kind === "region") && typeof x.id === "string") : [];
  } catch { return []; }
}

export function has(kind: Kind, id: string): boolean {
  return get().some((x) => x.kind === kind && x.id === id);
}

/** Adds the item, or removes it when it is already there. Returns true when the item is now saved. */
export function toggle(item: Omit<Item, "t"> & { t?: number }): boolean {
  const all = get();
  const at = all.findIndex((x) => x.kind === item.kind && x.id === item.id);
  const on = at < 0;
  if (on) all.unshift({ kind: item.kind, id: item.id, label: item.label, href: item.href, t: item.t ?? Date.now() });
  else all.splice(at, 1);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage off: nothing kept */ }
  try { window.dispatchEvent(new CustomEvent("ip:saved", { detail: { kind: item.kind, id: item.id, on } })); } catch { /* old browser */ }
  return on;
}
