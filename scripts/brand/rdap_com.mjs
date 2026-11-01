// Prompt 49 §3.1: .com availability through Verisign RDAP (404 = free), one request a second, resumable.
// Every "free" is confirmed by a second RDAP request a few seconds later (a DNS lookup is not available in the build
// environment). Usage: node scripts/brand/rdap_com.mjs names.txt results.tsv [limit]
import { readFileSync, existsSync, appendFileSync } from "node:fs";
const [inp, out, limit = "100000"] = process.argv.slice(2);
const done = new Set(existsSync(out) ? readFileSync(out, "utf8").split("\n").filter(Boolean).map((l) => l.split("\t")[0]) : []);
const names = readFileSync(inp, "utf8").split("\n").filter(Boolean).filter((n) => !done.has(n)).slice(0, Number(limit));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const rdap = async (n) => { try { const r = await fetch(`https://rdap.verisign.com/com/v1/domain/${n}.com`, { signal: AbortSignal.timeout(15000) }); return r.status; } catch { return 0; } };
for (const n of names) {
  let s = await rdap(n); await wait(1000);
  let res = s === 404 ? "free" : s === 200 ? "registered" : `error-${s}`;
  if (res === "free") { await wait(1500); const s2 = await rdap(n); await wait(1000); if (s2 !== 404) res = s2 === 200 ? "registered" : `unconfirmed-${s2}`; }
  appendFileSync(out, `${n}\t${res}\t${new Date().toISOString()}\n`);
}
