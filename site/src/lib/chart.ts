// Line charts for ten years of prices (prompt 20 §3), the same code at build time (SVG strings) and in the browser.
// Prompt 19 rules: hairlines, ink, deep green and brass, serif numerals, no grid boxes, no shadows.
export type Series = { label: string; values: (number | null)[] };
export const COLORS = ["#16181c", "#1f4a3d", "#7a5e28"];

export function lineChart(quarters: string[], series: Series[], o: { w?: number; h?: number; breakAt?: string; breakLabel?: string; fmt?: (v: number) => string; scale?: number } = {}): string {
  const w = o.w ?? 520, h = o.h ?? 300, pl = 6, pr = 58, pt = 16, pb = 28, k = o.scale ?? 1;
  const all = series.flatMap((s) => s.values.filter((v): v is number => v !== null).map((v) => v * k));
  if (!all.length) return "";
  const lo = 0, hi = Math.max(...all) * 1.08;
  const x = (i: number) => pl + (i / (quarters.length - 1)) * (w - pl - pr);
  const y = (v: number) => pt + (1 - (v - lo) / (hi - lo)) * (h - pt - pb);
  const fmt = o.fmt ?? ((v: number) => String(Math.round(v)));
  const years = quarters.map((q, i) => [q, i] as const).filter(([q]) => q.endsWith("Q1") && Number(q.slice(0, 4)) % 2 === 0);
  let s = `<svg viewBox="0 0 ${w} ${h}" class="lchart" role="img" aria-label="${series.map((x) => x.label).join(", ")}">`;
  s += `<line x1="${pl}" x2="${w - pr}" y1="${h - pb}" y2="${h - pb}" stroke="#dcd4c4" stroke-width="1"/>`;
  for (const [q, i] of years) s += `<text x="${x(i)}" y="${h - 8}" font-size="13" fill="#5d6066" text-anchor="middle">${q.slice(0, 4)}</text>`;
  if (o.breakAt) { const bi = quarters.indexOf(o.breakAt); if (bi > 0) s += `<line x1="${x(bi)}" x2="${x(bi)}" y1="${pt}" y2="${h - pb}" stroke="#dcd4c4" stroke-dasharray="3 4"/><text x="${x(bi) + 6}" y="${pt + 10}" font-size="12.5" fill="#5d6066">${o.breakLabel ?? ""}</text>`; }
  series.forEach((sr, si) => {
    let d = "", pen = false, last: [number, number] | null = null;
    sr.values.forEach((v, i) => { if (v === null) { pen = false; return; } const px = x(i), py = y(v * k); d += `${pen ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`; pen = true; last = [px, v * k]; });
    s += `<path d="${d}" fill="none" stroke="${COLORS[si % 3]}" stroke-width="${si === 0 ? 2 : 1.6}" stroke-linejoin="round"/>`;
    if (last) s += `<text x="${(last as [number, number])[0] + 6}" y="${y((last as [number, number])[1]) + 4}" font-size="14" fill="${COLORS[si % 3]}" font-family="Georgia, serif">${fmt((last as [number, number])[1])}</text>`;
  });
  return s + "</svg>";
}

/** Change in % between the first and last available values. */
export function change(values: (number | null)[], back?: number): number | null {
  const v = values.filter((x): x is number => x !== null);
  if (v.length < 2) return null;
  const end = values[values.length - 1];
  const start = back ? values[values.length - 1 - back] : v[0];
  return end && start ? (end / start - 1) * 100 : null;
}
