// One check for every metrics file (prompt 47 §3.4, prompt 51 §3): aggregates only. Refuses any value that looks like an
// email address or a phone number, and request summaries with fields outside the allowed list (CLAUDE.md hard rule 3;
// sponsorship agreement clause 6.4). Used by scripts/metrics/collect.mjs, scripts/sponsor-report.mjs and the site build.
export const ALLOWED = ["date", "edition", "typology", "budget_band", "payment", "timeline", "visit", "status"];
const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/, PHONE = /\+?\d[\d\s().-]{7,}\d/g;
export function problems(data, label = "in") {
  const out = [];
  (function scan(v, path) {
    if (typeof v === "string") {
      if (EMAIL.test(v)) out.push(`${path}: looks like an email address`);
      // Nine digits or more, except dates and amounts with thousands separators (1 000 000).
      const ph = (v.match(PHONE) || []).find((x) => x.replace(/\D/g, "").length >= 9 && !/^\d{1,3}([ ., ]\d{3})+$/.test(x.trim()) && !/^\d{4}-\d{2}-\d{2}( – \d{4}-\d{2}-\d{2})?$/.test(x.trim()));
      if (ph) out.push(`${path}: looks like a phone number`);
    } else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) scan(x, `${path}.${k}`);
  })(data, label);
  for (const [i, s] of (data?.requests?.summaries || []).entries())
    for (const k of Object.keys(s)) if (!ALLOWED.includes(k)) out.push(`${label}.requests.summaries[${i}].${k}: field not allowed (allowed: ${ALLOWED.join(", ")})`);
  return out;
}
export function checkAggregate(data, label) {
  const p = problems(data, label);
  if (p.length) { console.error("refused, personal data risk:\n  " + p.join("\n  ")); process.exit(1); }
}
