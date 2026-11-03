// Unit test of the request endpoint (site/worker/index.js) with a mocked env: no network, no Cloudflare account.
// "cloudflare:email" exists only in the Workers runtime, so a resolve hook maps it to a small stand-in.
// Run from the repo root:  node scripts/test-worker.mjs
import { register } from "node:module";
import assert from "node:assert/strict";

const stub = "export class EmailMessage { constructor(from, to, raw) { this.from = from; this.to = to; this.raw = raw; } }";
const hooks = `export async function resolve(spec, ctx, next) {
  if (spec === "cloudflare:email") return { url: "data:text/javascript," + encodeURIComponent(${JSON.stringify(stub)}), shortCircuit: true };
  return next(spec, ctx);
}`;
register("data:text/javascript," + encodeURIComponent(hooks));
const worker = (await import("../site/worker/index.js")).default;

const mailer = (fail = []) => { const sent = []; return { sent, async send(m) { if (fail.includes(m.to)) throw new Error("refused"); sent.push(m); } }; };
const env = (over = {}) => ({ ASSETS: { fetch: () => new Response("asset") }, MAIL_FROM: "requests@imoveisportugal.lu", MAIL_TO: "ops@imoveisportugal.lu", MAILER: mailer(), ...over });
const post = (body, e) => worker.fetch(new Request("https://imoveisportugal.lu/api/request", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) }), e);
const decode = (raw) => Buffer.from(raw.split("\r\n\r\n")[1].replace(/\r\n/g, ""), "base64").toString("utf8");
const viewing = { flow: "viewing", edition: "lu", language: "pt", page: "/pt/lu/parceiros/marble/gondomar/", project: "Marble Terrace", unit: "Bloco B · T2",
  intent: "Visita online (Vídeo)", slots: [{ d: "2026-11-10", t: "17:30" }, "qua., 11 nov., 12:00 em Portugal"], pay: "Crédito habitação", horizon: "Nos próximos 6 meses",
  labels: ["Orçamento: 400–500 k€"], name: "Leitor Teste", email: "leitor@example.com", phone: "+352 600 000 000", hp: "" };
let n = 0; const ok = (name) => console.log(`ok ${++n} - ${name}`);

{ const e = env(); const r = await post(viewing, e);
  assert.equal(r.status, 200); assert.equal(e.MAILER.sent.length, 1); ok("no consent field: 200, one email sent"); }
{ const e = env(); const r = await post({ ...viewing, consent: false }, e);
  assert.equal(r.status, 200); ok("consent:false is ignored: 200"); }
{ const e = env({ MAIL_TO: "ops@imoveisportugal.lu, agencia@example.com" }); const r = await post(viewing, e);
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true, sent: 2 });
  assert.deepEqual(e.MAILER.sent.map((m) => m.to), ["ops@imoveisportugal.lu", "agencia@example.com"]);
  assert.match(e.MAILER.sent[1].raw, /^To: agencia@example\.com\r$/m); assert.match(e.MAILER.sent[0].raw, /^Reply-To: leitor@example\.com\r$/m);
  const body = decode(e.MAILER.sent[0].raw);
  for (const t of ["Project: Marble Terrace · unit Bloco B · T2", "Request: Visita online (Vídeo)", "Preferred times: 2026-11-10 17:30 (Lisbon) | qua., 11 nov., 12:00 em Portugal",
    "Payment: Crédito habitação", "Horizon: Nos próximos 6 meses", "- Orçamento: 400–500 k€", "Phone: +352 600 000 000",
    "Pedido enviado pelo leitor à Imóveis Portugal e à agência parceira Habinedita Gondomar (RGPD art. 6.º, n.º 1, al. b): diligências pré-contratuais a pedido do titular).",
    "Buyer and seller requests go to the partner agency today (D14)."]) assert.ok(body.includes(t), `body has: ${t}`);
  assert.ok(!/Consent given/.test(body)); ok("two addresses: two sends, one per address, viewing fields printed"); }
{ const e = env({ MAIL_TO: "ops@imoveisportugal.lu,agencia@example.com", MAILER: mailer(["agencia@example.com"]) }); const r = await post(viewing, e);
  assert.equal(r.status, 200); assert.equal(e.MAILER.sent.length, 1); ok("one of two sends fails: still 200"); }
{ const e = env({ MAILER: mailer(["ops@imoveisportugal.lu"]) }); const r = await post(viewing, e); assert.equal(r.status, 502); ok("every send fails: 502"); }
for (const miss of ["MAILER", "MAIL_FROM", "MAIL_TO"]) { const e = env({ [miss]: undefined }); const r = await post(viewing, e); assert.equal(r.status, 503); }
ok("not configured (no MAILER, MAIL_FROM or MAIL_TO): 503");
{ const r = await post(viewing, env({ MAIL_TO: " , " })); assert.equal(r.status, 503); ok("MAIL_TO without an address: 503"); }
{ const e = env(); const r = await post({ ...viewing, hp: "bot" }, e); assert.equal(r.status, 200); assert.equal(e.MAILER.sent.length, 0); ok("honeypot: 200, nothing sent"); }
{ const r = await post({ ...viewing, flow: "other" }, env()); assert.equal(r.status, 400); const r2 = await post({ ...viewing, email: "x" }, env()); assert.equal(r2.status, 400); ok("unknown flow or bad email: 400"); }
for (const f of ["concierge", "partner"]) { const r = await post({ ...viewing, flow: f }, env()); assert.equal(r.status, 200); }
ok("concierge and partner flows accepted");
{ const r = await post("x".repeat(9000), env()); assert.equal(r.status, 413); ok("over 8 KB: 413"); }
{ const r = await worker.fetch(new Request("https://imoveisportugal.lu/api/request"), env()); assert.equal(r.status, 405); ok("GET: 405"); }
{ const r = await worker.fetch(new Request("https://imoveisportugal.lu/pt/lu/"), env()); assert.equal(await r.text(), "asset"); ok("other paths: static assets"); }
console.log(`all ${n} passed`);
