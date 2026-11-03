// The hearts (Part 2 of 3 Nov): a heart on a home or a region saves it to "A sua seleção" on this device (lib/saved.ts).
// Static hearts come from components/Heart.astro; the map cards and the Concierge listings write theirs with heartHTML().
// Every tap is a cookie-free event: {ed}/save/home/{id}, {ed}/unsave/home/{id}, save/region/{slug}, unsave/region/{slug}.
import { get, has, toggle, type Item } from "../lib/saved";
import { track, edOf } from "../lib/track";

const HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.2s-7.2-4.5-7.2-10.1A4.1 4.1 0 0 1 12 7.5a4.1 4.1 0 0 1 7.2 2.6c0 5.6-7.2 10.1-7.2 10.1z"/></svg>`;
type Labels = { add: string; saved: string; removed: string; link: string };
let L: Labels | null = null;
const labels = (): Labels | null => {
  if (L) return L;
  try { L = JSON.parse(document.getElementById("ip-save-l")?.textContent || "null"); } catch { L = null; }
  return L;
};
const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

/** A heart button as HTML, for cards built in the browser. Empty where the page has no selection (embeds, demos). */
export function heartHTML(kind: Item["kind"], id: string, label: string, href: string, cls = ""): string {
  const T = labels(); if (!T || !id) return "";
  return `<button type="button" class="ht${cls ? ` ${cls}` : ""}" data-save="${kind}" data-id="${esc(id)}" data-label="${esc(label)}" data-href="${esc(href)}" aria-pressed="${has(kind, id)}" aria-label="${esc(T.add)}: ${esc(label)}">${HEART}</button>`;
}

const evId = (id: string) => id.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");

/** Wires every heart on the page (present and future) and the header link to the selection. Runs once. */
export function initHearts() {
  const w = window as unknown as { __ipHearts?: boolean };
  if (w.__ipHearts) return; w.__ipHearts = true;
  const live = document.createElement("p"); live.className = "vh"; live.setAttribute("role", "status"); live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  const sync = () => {
    const items = get(), on = new Set(items.map((x) => `${x.kind}:${x.id}`));
    document.querySelectorAll<HTMLElement>("[data-save]").forEach((b) => b.setAttribute("aria-pressed", String(on.has(`${b.dataset.save}:${b.dataset.id}`))));
    const T = labels();
    document.querySelectorAll<HTMLElement>("[data-saved-link]").forEach((a) => {
      a.classList.toggle("is-on", items.length > 0);
      if (T) a.setAttribute("aria-label", items.length ? `${T.link} (${items.length})` : T.link);
    });
  };
  document.addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest?.<HTMLElement>("[data-save]");
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const kind = b.dataset.save as Item["kind"], id = b.dataset.id || "";
    if (!id) return;
    const on = toggle({ kind, id, label: b.dataset.label || id, href: b.dataset.href || location.pathname });
    const T = labels(); if (T) live.textContent = on ? T.saved : T.removed;
    b.classList.remove("ht-pop"); void b.offsetWidth; if (on) b.classList.add("ht-pop");
    track(kind === "home" ? `${edOf()}/${on ? "save" : "unsave"}/home/${evId(id)}` : `${on ? "save" : "unsave"}/region/${evId(id)}`);
  }, true);
  addEventListener("ip:saved", sync);
  addEventListener("storage", (e) => { if (e.key === "ip.saved") sync(); });
  addEventListener("pageshow", sync);
  sync();
  // Hearts written later (the map sheet, the Concierge cards) take their state from heartHTML; this keeps them current.
}
