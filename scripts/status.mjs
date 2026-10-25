// /status (CLAUDE.md): blocked tasks, tasks due this week, outreach touches due, revenue signed vs target.
// Reads ops/TASKS.md, ops/METRICS.md and sponsors/pipeline.csv. Run from the repo root: node scripts/status.mjs
import { readFileSync } from "node:fs";
const today = new Date(process.argv[2] || Date.now());
const iso = (d) => d.toISOString().slice(0, 10);
const inDays = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };
const csv = (t) => {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < t.length; i++) { const ch = t[i];
    if (q) { if (ch === '"' && t[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
    else if (ch === '"') q = true; else if (ch === ",") { row.push(cell); cell = ""; } else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else cell += ch; }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [h, ...r] = rows; return r.filter((x) => x[0]).map((x) => Object.fromEntries(h.map((k, i) => [k, x[i] ?? ""])));
};
const tasks = readFileSync("ops/TASKS.md", "utf8").split("\n").filter((l) => /^\| \w+ \|/.test(l) && !/^\| #/.test(l)).map((l) => l.split("|").map((x) => x.trim()));
const blocked = tasks.filter((t) => /blocked|waiting/i.test(t[4] || ""));
const due = tasks.filter((t) => !/done/i.test(t[4] || "") && /^\d{4}-\d{2}-\d{2}$/.test(t[5] || "") && t[5] <= inDays(7));
const pipe = csv(readFileSync("sponsors/pipeline.csv", "utf8"));
const signed = pipe.filter((r) => /signed|won/i.test(`${r.status} ${r.outcome}`));
const touch = (r) => (!r.touch1_date ? null : !r.touch2_date && r.touch1_date <= inDays(-3) ? "touch 2 (LinkedIn)" : !r.touch3_date && r.touch2_date && r.touch1_date <= inDays(-7) ? "touch 3 (follow-up)" : null);
const touchesDue = pipe.map((r) => [r, touch(r)]).filter(([, t]) => t);
const replies = pipe.filter((r) => r.reply && !/opt-out|no/i.test(r.reply));
const calls = pipe.filter((r) => r.call_date && r.call_date >= iso(today));
const metrics = readFileSync("ops/METRICS.md", "utf8");
const target = (metrics.match(/revenue target[^\d]*([\d.,\s]+)/i) || [])[1];
console.log(`Status ${iso(today)}\n`);
console.log(`Blocked (${blocked.length})`); blocked.forEach((t) => console.log(`  ${t[1]} ${t[2].slice(0, 90)} · ${t[3]}`));
console.log(`\nDue within 7 days (${due.length})`); due.forEach((t) => console.log(`  ${t[1]} ${t[5]} ${t[2].slice(0, 80)} · ${t[3]}`));
console.log(`\nOutreach: ${pipe.filter((r) => r.touch1_date).length} contacted, ${touchesDue.length} touches due, ${replies.length} replies, ${calls.length} calls booked`);
touchesDue.slice(0, 15).forEach(([r, t]) => console.log(`  ${r.id} ${r.company.slice(0, 40)}: ${t}`));
const value = signed.reduce((s, r) => s + Number(r.est_deal_value_eur || 0), 0);
console.log(`\nRevenue signed: ${value.toLocaleString("en")} € from ${signed.length} sponsors${target ? ` · target ${target.trim()}` : ""}`);
