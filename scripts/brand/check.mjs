// Prompt 47 §1: domains and handles for each candidate name. Domains through RDAP where the registry has it (Verisign
// for .com and .net, AFNIC for .fr, Registro.br for .com.br) and DNS.pt's public WHOIS search for .pt; .lu, .ch, .us and
// .co.il have no public RDAP reachable from here and are marked "check". Handles: an HTTP request per platform, read as
// "free", "taken" or "unverified" (login walls and bot answers are never read as free).
//   node scripts/brand/check.mjs out.json name1 name2 ...
import { writeFileSync } from "node:fs";
const [out, ...names] = process.argv.slice(2);
const UA = { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15", "accept-language": "en" };
const get = async (url, opts = {}) => { try { const r = await fetch(url, { headers: UA, redirect: opts.redirect ?? "follow", signal: AbortSignal.timeout(20000) }); return { status: r.status, text: opts.body ? await r.text() : "", url: r.url }; } catch (e) { return { status: 0, text: "", err: String(e.message || e) }; } };
const rdap = async (url) => { const r = await get(url); return r.status === 200 ? "registered" : r.status === 404 ? "free" : `check (${r.status || r.err})`; };
async function pt(label) {
  const r = await get(`https://www.pt.pt/pt/ferramentas/whois/?site=${label}.pt`, { body: true });
  if (r.status !== 200) return `check (${r.status})`;
  const t = r.text.replace(/<[^>]*>/g, "\n");
  if (/Não existem resultados que correspondam/.test(t)) return "free";
  const re = new RegExp(`\\n\\s*${label}\\s*\\n\\s*\\.pt\\s*\\n`, "i");
  return re.test(t) ? "registered" : "check";
}
async function handles(h) {
  const yt = await get(`https://www.youtube.com/@${h}`); // 404 when the handle does not exist
  const li = await get(`https://www.linkedin.com/company/${h}`, { redirect: "manual" });
  const tt = await get(`https://www.tiktok.com/@${h}`, { body: true });
  const ig = await get(`https://www.instagram.com/${h}/`, { redirect: "manual" });
  const x = await get(`https://x.com/${h}`);
  const ttTaken = /"uniqueId":"/i.test(tt.text) && new RegExp(`"uniqueId":"${h}"`, "i").test(tt.text);
  const ttFree = /"statusCode":10202|couldn['’]t find this account|user-not-found/i.test(tt.text);
  return {
    youtube: yt.status === 404 ? "free" : yt.status === 200 ? "taken" : "unverified",
    linkedin: li.status === 404 ? "free" : li.status === 200 ? "taken" : "unverified",
    tiktok: ttTaken ? "taken" : ttFree ? "free" : "unverified",
    instagram: "unverified",  // login wall for scripts
    x: "unverified",          // client-rendered for scripts
  };
}
const res = [];
for (const raw of names) {
  const label = raw.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  const d = {
    com: await rdap(`https://rdap.verisign.com/com/v1/domain/${label}.com`),
    net: await rdap(`https://rdap.verisign.com/net/v1/domain/${label}.net`),
    pt: await pt(label),
    fr: await rdap(`https://rdap.nic.fr/domain/${label}.fr`),
    "com.br": await rdap(`https://rdap.registro.br/domain/${label}.com.br`),
    lu: "check", ch: "check", us: "check", "co.il": "check",
  };
  const h = await handles(label);
  res.push({ name: raw, label, domains: d, handles: h });
  console.log(raw.padEnd(18), Object.entries(d).filter(([, v]) => v !== "check").map(([k, v]) => `.${k}:${v}`).join(" "), "|", Object.entries(h).map(([k, v]) => `${k}:${v}`).join(" "));
}
writeFileSync(out, JSON.stringify(res, null, 1));
