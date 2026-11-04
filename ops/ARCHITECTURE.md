# Architecture (design-v2)

One static site (Astro), deployed as Cloudflare Workers static assets, plus one small Worker for requests. No database, no paid tool (hard rule 5). Prompt 35 §3.9 (D61).

## 1. What runs where

| Part | Where | Notes |
| --- | --- | --- |
| Pages, images, map tiles, data | `site/dist`, served as static assets | Built by `npm run build` in `site/`. Map tiles and data are self-hosted (`site/public/tiles`, `site/public/data`). |
| Request endpoint `POST /api/request` | `site/worker/index.js` | The only server code. `run_worker_first: ["/api/*"]` in `site/wrangler.jsonc`, so every other path never touches it. |
| Analytics | Cloudflare Web Analytics | Cookie-free. |
| Newsletter | beehiiv (free plan) | Unchanged. |

## 2. Requests: one question at a time, sent by a free Worker

The concierge (free first call with the partner agency), the partner request and the private viewing are one-question-at-a-time flows (`site/src/lib/flows.ts`, `site/src/scripts/flow.ts`, `site/src/components/Flow.astro`). They ask the same fields as the Tally forms they replace (`ops/TALLY_CONSULTA.md`, `ops/SETUP.md` §4). The showcase request sheet ("Pedir visita", `site/src/scripts/request.ts`) sends through the same endpoint with flow `viewing`. Since 3 Nov 2026 (operator: "Emails come to us and Habinedita both. No need for the consent.") there is no consent box: the legal basis is GDPR art. 6(1)(b), steps taken at the reader's request before a contract, and the last screen says in one plain line, with the privacy link, that the request goes to Imóveis Portugal and Habinedita Gondomar.

Choice: a Cloudflare Worker that emails the request to the brand mailbox and the partner agency, rather than Tally behind the scenes. Reasons:

1. Tally has no free way to receive a submission from our own interface; it only takes submissions through its own form.
2. Cloudflare Email Routing and the Worker are free and already in the stack.
3. Nothing is stored anywhere: the Worker checks the request (size, flow, email, a hidden field against bots) and sends the same plain-text email to each address in `MAIL_TO`. No personal data enters the repository or a database (hard rule 3).

Path of a request:

1. The reader answers in the flow; answers stay in that browser tab only (`sessionStorage`) until sent.
2. On "Send request", the page posts JSON to `/api/request`.
3. The Worker sends one email per address in `MAIL_TO` (the brand mailbox and Habinedita Gondomar), with `Reply-To` set to the reader; it answers 200 if at least one was sent, 502 if none, 503 while not configured.
   - Prompt 74: each message is plain text plus the same in HTML. A Concierge request carries the buyer profile (`site/src/lib/cv.ts`): every field with its source, the completeness figure and the developer consent line. The Worker never e-mails a developer; a ticked, named box is recorded as the buyer's permission for Imóveis Portugal to pass the profile on. `scripts/test-worker.mjs` covers it.
4. The partner agency receives buyer and seller requests directly (hard rule 6, D14); the brand mailbox keeps the same copy. Partner-category requests are answered by the brand, as before.
5. If the endpoint is not configured or fails, the flow shows the same request as a ready-written email to the brand mailbox (one tap), with the agency in copy when the build variable `PUBLIC_AGENCY_EMAIL` is set, so no request is ever lost.

Test without Cloudflare: `node scripts/test-worker.mjs` (mocked mailer: no consent needed, two addresses give two sends, 503 when not configured).

Routing shown to the reader after a concierge request (never displayed as a rule): budget 1 M€ or more → the "dedicated adviser" message; timing within 12 months → "received"; otherwise → "thank you" with the path and the newsletter (unchanged from D52).

## 3. Operator steps to switch the endpoint on (about 15 minutes, free)

1. Cloudflare dashboard → the domain (imoveisportugal.lu, once its nameservers are on Cloudflare) → Email → Email Routing → Enable. Accept the DNS records it proposes.
2. Email Routing → Destination addresses → add two addresses: the brand mailbox and Habinedita Gondomar's address (the one the agency gives for buyer requests). Each receives a verification email: both must be confirmed (the agency clicks its own link) before anything is delivered there.
3. Workers & Pages → `imoveis-portugal` → Settings → Bindings → Add → Send email: name `MAILER`, with no fixed destination address (or, if the form asks, allow both verified addresses). A fixed single destination would send everything to that one address only.
4. Same page → Variables and secrets → add plain-text variables `MAIL_FROM` = `requests@imoveisportugal.lu` and `MAIL_TO` = the brand mailbox and Habinedita's address, comma-separated, no quotes in the value (`brand-mailbox,habinedita-address`). The Worker sends one email to each.
5. Optional, same page → Build → Variables: `PUBLIC_AGENCY_EMAIL` = Habinedita's address. Only the ready-written fallback email uses it, as a copy (cc) when the endpoint is off; it is read at build time and never stored in the repository.
6. Redeploy (or push to the branch). Test: send a concierge request and a "Pedir visita" request on the preview; each should arrive within a minute in both mailboxes, with the reader as Reply-To.

Until then the flows work end to end through the ready-written email.

## 4. Search (⌘K)

A static index per language and edition (`/search/{lang}-{ed}.json`, built by `site/src/pages/search/[key].json.ts`): the 308 places (to the map), the questions (to the FAQ), the simulators, the path's steps and the main pages. Loaded only when the reader opens search. The map page keeps its own search, which also finds parishes, golf courses, beaches and partner developments.

## 5. Map v3

See `content/media/SOURCES.md` (prompt 36 table) and `scripts/map-data/v3_assets.py`, `v3_extras.py`. About 25 MB of self-hosted tiles; no third-party map service at runtime.
