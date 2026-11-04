// The site's only server code (prompt 35 §3.9, D61; ops/ARCHITECTURE.md). Everything else is static assets.
// POST /api/request: a concierge, partner or viewing request from the one-question flows (src/scripts/flow.ts) and the
// showcase request sheet (src/scripts/request.ts), checked and sent as an email (plain text and HTML) through Cloudflare Email
// Routing (free) to every address in MAIL_TO: the brand mailbox and the partner agency, Habinedita Gondomar (operator,
// 3 Nov 2026; hard rule 6, D14). Legal basis: steps taken at the reader's request before a contract (GDPR art. 6(1)(b)),
// so the request no longer carries a consent box. Nothing is stored here.
// Until the operator turns on Email Routing and adds the MAILER binding (ops/ARCHITECTURE.md §3), the endpoint answers
// 503 and the page offers the same request as a ready-written email instead.
const FLOWS = new Set(["concierge", "partner", "viewing"]);
const MAX = 8 * 1024;
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const clean = (v, n = 400) => String(v ?? "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").slice(0, n).trim();

const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
// M72-15: the number the advisor dials, in international form ("00352…" → "+352…"); one typed without a country code
// (the page adds the edition's own before sending) is flagged rather than guessed.
const intlPhone = (v) => { const p = clean(v, 40); if (!p) return ""; if (p.startsWith("+")) return p; if (/^00\d/.test(p)) return `+${p.slice(2)}`; return `${p} (no country code)`; };

/** The e-mail to Imóveis Portugal and the partner agency: subject, plain text and HTML. Also used by
 *  scripts/test-worker.mjs and the sample in the prompt 74 report (export default .compose), never with real data. */
function compose(d, email, origin = "") {
  // The viewing sheet's slots: readable strings, or { d: "YYYY-MM-DD", t: "HH:MM" } in Portugal time.
  const slots = Array.isArray(d.slots) ? d.slots.slice(0, 6).map((x) => (x && typeof x === "object" ? `${clean(x.d, 10)} ${clean(x.t, 5)} (Lisbon)` : clean(x, 160))).filter(Boolean) : [];
  // Prompt 74: the buyer profile (lib/cv.ts): each field with where it came from, the completeness figure, and the
  // developer consent. This message goes only to MAIL_TO (Imóveis Portugal and the partner agency, D14, D84): the Worker
  // never e-mails a developer. A ticked, named box is recorded here as the buyer's permission to pass the profile to
  // that developer; without it the message says not to.
  const cv = d.cv && typeof d.cv === "object" && Array.isArray(d.cv.fields) ? d.cv : null;
  const cvFields = cv ? cv.fields.slice(0, 16).map((f) => ({ l: clean(f && f.l, 60), v: clean(f && f.v, 240), src: clean(f && f.src, 30) })).filter((f) => f.l && f.v) : [];
  const pct = cv ? Math.max(0, Math.min(100, Math.round(Number(cv.pct) || 0))) : 0;
  const sh = cv && cv.share && typeof cv.share === "object" ? cv.share : null;
  const shareOk = !!(sh && sh.ticked === true && clean(sh.developer, 120));
  const consentLine = !cv ? "" : shareOk
    ? `Developer consent: the buyer ticked "${clean(sh.text, 300)}". The profile may be passed to ${clean(sh.developer, 120)} (this e-mail was not sent to them).`
    : "Developer consent: none. Do not pass this profile to any developer.";
  const profile = /^\/[a-z0-9/-]+\/$/.test(String(d.profile || "")) && origin ? `${origin}${d.profile}` : "";
  const phone = intlPhone(d.phone);
  const head = [
    `Flow: ${clean(d.flow)} · edition ${clean(d.edition, 8)} · language ${clean(d.language, 4)} · page ${clean(d.page, 200)}`,
    d.project ? `Project: ${clean(d.project, 120)}${d.unit ? ` · unit ${clean(d.unit, 60)}` : ""}${d.price ? ` · price ${clean(d.price, 12)} EUR` : ""}` : "",
    d.intent ? `Request: ${clean(d.intent, 120)}` : "",
    slots.length ? `Preferred times: ${slots.join(" | ")}` : "",
    d.pay ? `Payment: ${clean(d.pay, 60)}` : "",
    d.horizon ? `Horizon: ${clean(d.horizon, 60)}` : "",
  ].filter(Boolean);
  const answers = Array.isArray(d.labels) ? d.labels.slice(0, 20).map((x) => clean(x)).filter(Boolean) : [];
  const who = [`Name: ${clean(d.name, 120)}`, `Email: ${email}`, phone ? `Phone: ${phone}` : "", d.budget ? `Budget from the map or path (EUR): ${clean(d.budget, 12)}` : ""].filter(Boolean);
  const cvText = cv ? [`Buyer profile: ${pct}% complete${cv.qualified === true ? " · qualified (4 of 5 key fields)" : ""}`,
    ...cvFields.map((f) => `- ${f.l}: ${f.v}  [${f.src}]`), consentLine, profile ? `The buyer's own summary (on their device): ${profile}` : ""].filter(Boolean) : [];
  const legal = ["Pedido enviado pelo leitor à Imóveis Portugal e à agência parceira Habinedita Gondomar (RGPD art. 6.º, n.º 1, al. b): diligências pré-contratuais a pedido do titular).",
    "Buyer and seller requests go to the partner agency today (D14)."];
  const text = [...head, "", ...answers.map((x) => `- ${x}`), "", ...who, d.brief ? `\nSummary the reader chose to include:\n${clean(d.brief, 1500)}` : "",
    ...(cvText.length ? ["", ...cvText] : []), "", ...legal].filter((x, i, a) => x !== "" || (a[i - 1] !== "" && i > 0)).join("\n");
  const subject = `[${clean(d.flow)}] ${clean(d.edition, 8)}/${clean(d.language, 4)}${d.project ? ` · ${clean(d.project, 60)}` : ""}${cv ? ` · Perfil ${pct}%` : ""} · ${clean(d.name, 60) || email}`;
  const td = 'style="padding:6px 12px 6px 0;border-bottom:1px solid #eee;vertical-align:top"';
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(subject)}</title></head><body style="margin:0;padding:24px;font:15px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111;background:#fff">
<div style="max-width:640px">${head.map((x) => `<p style="margin:0 0 4px">${esc(x)}</p>`).join("")}
${answers.length ? `<ul style="margin:12px 0;padding-left:20px">${answers.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
<p style="margin:12px 0 4px">${who.map(esc).join("<br>")}</p>
${cv ? `<h2 style="margin:24px 0 4px;font-size:17px">Buyer profile <span style="font-weight:600;color:#1f6b4f">${pct}%</span>${cv.qualified === true ? ' <span style="font-size:13px;font-weight:600;color:#555">· qualified (4 of 5 key fields)</span>' : ""}</h2>
<table style="border-collapse:collapse;width:100%;font-size:14.5px"><tr><th align="left" ${td}>Field</th><th align="left" ${td}>Value</th><th align="left" ${td}>Source</th></tr>${cvFields.map((f) => `<tr><td ${td}>${esc(f.l)}</td><td ${td}><b>${esc(f.v)}</b></td><td ${td} style="color:#666">${esc(f.src)}</td></tr>`).join("")}</table>
<p style="margin:12px 0 0;padding:10px 12px;border-radius:8px;background:${shareOk ? "#eef7f1" : "#f6f3ee"}">${esc(consentLine)}</p>
${profile ? `<p style="margin:12px 0 0">The buyer's own summary (on their device): <a href="${esc(profile)}">${esc(profile)}</a></p>` : ""}` : ""}
${d.brief ? `<p style="margin:16px 0 0;white-space:pre-wrap">${esc(clean(d.brief, 1500))}</p>` : ""}
<p style="margin:24px 0 0;font-size:12.5px;color:#666">${legal.map(esc).join("<br>")}</p></div></body></html>`;
  return { subject, text, html };
}

export default {
  compose,
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/request") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json(405, { error: "method" });
    const raw = await request.text();
    if (raw.length > MAX) return json(413, { error: "size" });
    let d; try { d = JSON.parse(raw); } catch { return json(400, { error: "json" }); }
    if (d.hp) return json(200, { ok: true });  // the hidden field a person never fills
    const email = clean(d.email, 200);
    if (!FLOWS.has(d.flow) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json(400, { error: "fields" });
    const to = String(env.MAIL_TO ?? "").split(",").map((x) => x.trim()).filter((x) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x));
    if (!env.MAILER || !env.MAIL_FROM || !to.length) return json(503, { error: "not-configured" });
    const { subject, text, html } = compose(d, email, url.origin);
    const b64 = (x) => btoa(String.fromCharCode(...new TextEncoder().encode(x)));
    const wrap = (x) => b64(x).replace(/.{76}/g, "$&\r\n");
    const bound = `ip-${crypto.randomUUID()}`;
    // Prompt 74: plain text and the same in HTML (the buyer profile as a table), one message.
    const mime = (rcpt) => [
      `From: Imoveis Portugal <${env.MAIL_FROM}>`, `To: ${rcpt}`, `Reply-To: ${email}`,
      `Subject: =?UTF-8?B?${b64(subject)}?=`, `Message-ID: <${crypto.randomUUID()}@${env.MAIL_FROM.split("@")[1]}>`, `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0", `Content-Type: multipart/alternative; boundary="${bound}"`, "",
      `--${bound}`, "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "", wrap(text),
      `--${bound}`, "Content-Type: text/html; charset=UTF-8", "Content-Transfer-Encoding: base64", "", wrap(html),
      `--${bound}--`, "",
    ].join("\r\n");
    // One message per address (Email Routing sends to one verified destination at a time); 200 if at least one went.
    let sent = 0;
    try {
      const { EmailMessage } = await import("cloudflare:email");
      for (const rcpt of to) {
        try { await env.MAILER.send(new EmailMessage(env.MAIL_FROM, rcpt, mime(rcpt))); sent++; } catch (e) { console.log(`send failed: ${e}`); }
      }
    } catch (e) { console.log(`email module: ${e}`); }
    return sent ? json(200, { ok: true, sent }) : json(502, { error: "send" });
  },
};
