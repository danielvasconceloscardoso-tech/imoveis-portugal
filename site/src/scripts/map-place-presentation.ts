// Presentation only: all place facts, figures and media still come from the verified map datasets.
const escapeHTML = (value: string) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export function placeStory(d: any, lang: string, fallback = ""): string {
  return d.arr?.line?.[lang] || d.c5?.line?.[lang] || fallback;
}

// Native details preserves keyboard behavior and disclosure state without another interaction runtime.
export function placeDetailHTML(title: string, bodyHTML: string, id: string): string {
  if (!bodyHTML) return "";
  return `<details class="m3-place-detail" data-place-detail="${escapeHTML(id)}"><summary><span>${escapeHTML(title)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="m3-place-detail-body">${bodyHTML}</div></details>`;
}

export function placeHistoryHTML(d: any, lang: string, label: string): string {
  const line = d.arr?.more?.[lang];
  if (!line) return "";
  return placeDetailHTML(label, `<p class="m3-place-story" data-more>${escapeHTML(line)}</p>`, "story");
}

export function creditFor(file: string, credits: Record<string, string> = {}): string {
  const prefix = Object.keys(credits).filter((key) => `${file}-`.startsWith(key)).sort((a, b) => b.length - a.length)[0];
  return prefix ? credits[prefix] : "";
}

export function photoCreditHTML(author: string, href: string, label: string): string {
  return author ? `<figcaption class="m3-photo-credit"><a href="${escapeHTML(href)}" target="_blank" rel="noopener" aria-label="${escapeHTML(`${label}: ${author}`)}">${escapeHTML(author)}</a></figcaption>` : "";
}
