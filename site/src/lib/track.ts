// Cookie-free event counts (prompt 51 §3), with no server code and no cookie, consent banner or identifier.
// Cloudflare Web Analytics counts page loads only, so an event is the load of a tiny static page under /e/ (built by
// pages/e/[...p].astro, noindex), opened once in a hidden frame. The beacon on that page records its path and the
// visitor's country, nothing else; scripts/metrics/collect.mjs reads the counts back through Cloudflare's API.
// No beacon on the page (local builds, previews, the operator has not switched Web Analytics on): nothing happens.
const seen = new Set<string>();
export function track(path: string): void {
  try {
    if (seen.has(path) || !/^[a-z0-9/-]+$/.test(path)) return;
    seen.add(path);
    if (!document.querySelector('script[src*="cloudflareinsights.com/beacon"]')) return;
    const f = document.createElement("iframe");
    f.src = `/e/${path}/`; f.tabIndex = -1; f.title = ""; f.setAttribute("aria-hidden", "true");
    f.style.cssText = "position:absolute;width:1px;height:1px;border:0;opacity:0;pointer-events:none;left:-9px;top:0";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 20000);  // removing the frame lets its beacon send on unload
  } catch { /* never in the reader's way */ }
}
/** The reader's edition from the URL (/{lang}/{ed}/...), or "xx" outside an edition. */
export const edOf = (): string => { const e = location.pathname.split("/")[2] || ""; return /^(lu|fr|ch|br|us|il)$/.test(e) ? e : "xx"; };
