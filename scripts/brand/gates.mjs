// Prompt 49 §3.3–3.6, for the names whose .com is free: .pt (DNS.pt public WHOIS search, .pt has no RDAP in the IANA
// bootstrap), YouTube and LinkedIn handles (plain requests: 404 = free), and Wiktionary entries in the seven languages
// (the English Wiktionary's language sections). One request a second per service. Instagram, TikTok and the trademark
// registers are not queried: they answer scripts only behind login walls or CAPTCHAs, so the operator checks them.
//   node scripts/brand/gates.mjs names.txt out.json
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const [inp, out] = process.argv.slice(2);
const names = readFileSync(inp, "utf8").split("\n").filter(Boolean);
const prev = existsSync(out) ? JSON.parse(readFileSync(out, "utf8")) : {};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url, body = false) => { try { const r = await fetch(url, { signal: AbortSignal.timeout(20000) }); return { s: r.status, t: body ? await r.text() : "" }; } catch { return { s: 0, t: "" }; } };
const LANGS = ["Portuguese", "Spanish", "French", "English", "German", "Italian", "Hebrew"];
for (const n of names) {
  if (prev[n]) continue;
  const r = {};
  const pt = await get(`https://www.pt.pt/pt/ferramentas/whois/?site=${n}.pt`, true); await wait(1000);
  const t = pt.t.replace(/<[^>]*>/g, "\n");
  r.pt = pt.s !== 200 ? "check" : /Não existem resultados que correspondam/.test(t) ? "free" : new RegExp(`\\n\\s*${n}\\s*\\n\\s*\\.pt\\s*\\n`, "i").test(t) ? "registered" : "check";
  const yt = await get(`https://www.youtube.com/@${n}`); await wait(1000);
  r.youtube = yt.s === 404 ? "free" : yt.s === 200 ? "taken" : "unverified";
  const li = await get(`https://www.linkedin.com/company/${n}`); await wait(1000);
  r.linkedin = li.s === 404 ? "free" : li.s === 200 ? "taken" : "unverified";
  const wk = await get(`https://en.wiktionary.org/w/api.php?action=parse&format=json&prop=sections&page=${n}`, true); await wait(1000);
  let secs = []; try { secs = (JSON.parse(wk.t).parse?.sections || []).filter((s) => s.toclevel === 1).map((s) => s.line); } catch { /* no entry */ }
  r.wiktionary = secs.filter((s) => LANGS.includes(s));
  r.wiktionaryOther = secs.filter((s) => !LANGS.includes(s)).slice(0, 6);
  prev[n] = r; writeFileSync(out, JSON.stringify(prev, null, 1));
  console.log(n, JSON.stringify(r));
}
