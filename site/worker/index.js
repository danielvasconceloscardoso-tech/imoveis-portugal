// The site's only server code (prompt 35 §3.9, D61; ops/ARCHITECTURE.md). Everything else is static assets.
// POST /api/request: a concierge, partner or viewing request from the one-question flows (src/scripts/flow.ts),
// checked and sent as a plain-text email to the brand mailbox through Cloudflare Email Routing (free). The brand
// mailbox forwards buyer requests to the partner agency the same day (hard rule 6, D14). Nothing is stored here.
// Until the operator turns on Email Routing and adds the MAILER binding (ops/ARCHITECTURE.md §3), the endpoint answers
// 503 and the page offers the same request as a ready-written email instead.
const FLOWS = new Set(["concierge", "partner", "viewing"]);
const MAX = 8 * 1024;
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const clean = (v, n = 400) => String(v ?? "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").slice(0, n).trim();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/request") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json(405, { error: "method" });
    const raw = await request.text();
    if (raw.length > MAX) return json(413, { error: "size" });
    let d; try { d = JSON.parse(raw); } catch { return json(400, { error: "json" }); }
    if (d.hp) return json(200, { ok: true });  // the hidden field a person never fills
    const email = clean(d.email, 200);
    if (!FLOWS.has(d.flow) || d.consent !== true || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json(400, { error: "fields" });
    if (!env.MAILER || !env.MAIL_FROM || !env.MAIL_TO) return json(503, { error: "not-configured" });

    const lines = [
      `Flow: ${clean(d.flow)} · edition ${clean(d.edition, 8)} · language ${clean(d.language, 4)} · page ${clean(d.page, 200)}`,
      d.project ? `Project: ${clean(d.project, 120)}${d.unit ? ` · unit ${clean(d.unit, 40)}` : ""}${d.price ? ` · price ${clean(d.price, 12)} EUR` : ""}` : "",
      "",
      ...(Array.isArray(d.labels) ? d.labels.slice(0, 20).map((x) => `- ${clean(x)}`) : []),
      "",
      `Name: ${clean(d.name, 120)}`, `Email: ${email}`, d.phone ? `Phone: ${clean(d.phone, 40)}` : "",
      d.budget ? `Budget from the map or path (EUR): ${clean(d.budget, 12)}` : "",
      d.brief ? `\nSummary the reader chose to include:\n${clean(d.brief, 1500)}` : "",
      "", "Consent given in the form (unticked by default, recipient named).",
      "Buyer and seller requests go to the partner agency today (D14).",
    ].filter((x) => x !== "");
    const subject = `[${clean(d.flow)}] ${clean(d.edition, 8)}/${clean(d.language, 4)} · ${clean(d.name, 60) || email}`;
    const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
    const mime = [
      `From: Imoveis Portugal <${env.MAIL_FROM}>`, `To: ${env.MAIL_TO}`, `Reply-To: ${email}`,
      `Subject: =?UTF-8?B?${b64(subject)}?=`, `Message-ID: <${crypto.randomUUID()}@${env.MAIL_FROM.split("@")[1]}>`, `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0", "Content-Type: text/plain; charset=UTF-8", "Content-Transfer-Encoding: base64", "",
      b64(lines.join("\n")).replace(/.{76}/g, "$&\r\n"),
    ].join("\r\n");
    try {
      const { EmailMessage } = await import("cloudflare:email");
      await env.MAILER.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, mime));
      return json(200, { ok: true });
    } catch (e) {
      return json(502, { error: "send" });
    }
  },
};
