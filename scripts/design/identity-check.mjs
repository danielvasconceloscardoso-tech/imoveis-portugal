// Prompt 23 §3.2 (D50): the identity gate. Fails on the "AI look" anywhere we style things: cream, beige, ivory,
// terracotta, peach or orange colours; the default fonts of AI products; rounded cards with soft shadows. Scans the
// site source and built CSS, the social templates and the generators of the brochure, media kits, dossiers and e-books.
// Run from the repo root: node scripts/design/identity-check.mjs   (scripts/scorecard.mjs runs it too). Exit 1 on a hit.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SCAN = ["site/src", "site/dist/_astro", "site/scripts", "site/dossiers/build.ts", "site/ebooks/build.ts", "design/social/templates", "sponsors/prospects/build/style.css", "scripts/social"];
const EXT = /\.(css|astro|ts|mjs|html)$/;
// Old identities kept on purpose: the demo-film scripts render archived films; this file names the banned fonts.
const SKIP = [/site\/scripts\/demo-film\.mjs$/, /scripts\/design\/identity-check\.mjs$/];
const walk = (p, out = []) => { if (!existsSync(p)) return out; if (statSync(p).isDirectory()) for (const f of readdirSync(p)) walk(join(p, f), out); else if (EXT.test(p)) out.push(p); return out; };

// Warm hues (5° to 60°: terracotta, orange, peach, beige, cream, ivory) with any visible saturation are out;
// so is a warm light tint that only reads as cream on white.
const warm = (r, g, b) => {
  const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, l = (mx + mn) / 2, d = mx - mn;
  if (d < 0.02) return false;
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = mx === r / 255 ? ((g - b) / 255 / d) % 6 : mx === g / 255 ? (b - r) / 255 / d + 2 : (r - g) / 255 / d + 4;
  h = (h * 60 + 360) % 360;
  return h >= 5 && h <= 60 && s >= 0.12;
};
const FONTS = /\b(Inter|DM Sans|Poppins|Space Grotesk|Newsreader|Public Sans|Jost)\b(?![-\w])/;
const hits = [];
for (const file of SCAN.flatMap((s) => walk(join(root, s)))) {
  const rel = relative(root, file);
  if (SKIP.some((r) => r.test(rel))) continue;
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/#([0-9a-f]{6})\b|rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/gi)) {
    const [r, g, b] = m[1] ? [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)) : [m[2], m[3], m[4]].map(Number);
    if (warm(r, g, b)) hits.push(`${rel}: warm colour ${m[0]}`);
  }
  for (const line of src.split("\n")) if (/font-family|@import|fontsource|\bfont:/.test(line) && FONTS.test(line)) hits.push(`${rel}: banned font ${line.match(FONTS)[1]}`);
  // A rule that is both rounded (12 px or more) and shadowed is the soft "card" look.
  for (const rule of src.matchAll(/\{([^{}]*)\}/g)) {
    const body = rule[1], rad = body.match(/border-radius\s*:\s*(\d+)px/), sh = /box-shadow\s*:\s*(?!none)[^;]*\d/.test(body);
    if (rad && Number(rad[1]) >= 12 && sh) hits.push(`${rel}: rounded card with a shadow (${rad[0]})`);
  }
}
const uniq = [...new Set(hits)];
console.log(uniq.length ? uniq.join("\n") + `\n${uniq.length} identity issues (D50, prompt 23)` : "identity ok: no warm colours, banned fonts or rounded-shadow cards");
process.exit(uniq.length ? 1 : 0);
