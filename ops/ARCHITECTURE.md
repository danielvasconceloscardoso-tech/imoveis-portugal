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

The concierge (free first call with the partner agency), the partner request and the private viewing are one-question-at-a-time flows (`site/src/lib/flows.ts`, `site/src/scripts/flow.ts`, `site/src/components/Flow.astro`). They ask the same fields as the Tally forms they replace (`ops/TALLY_CONSULTA.md`, `ops/SETUP.md` §4), with the consent unticked and naming the recipient (GDPR, hard rule 4).

Choice: a Cloudflare Worker that emails the request to the brand mailbox, rather than Tally behind the scenes. Reasons:

1. Tally has no free way to receive a submission from our own interface; it only takes submissions through its own form.
2. Cloudflare Email Routing and the Worker are free and already in the stack.
3. Nothing is stored anywhere: the Worker checks the request (size, consent, email, a hidden field against bots) and sends one plain-text email. No personal data enters the repository or a database (hard rule 3).

Path of a request:

1. The reader answers in the flow; answers stay in that browser tab only (`sessionStorage`) until sent.
2. On "Send request", the page posts JSON to `/api/request`.
3. The Worker sends the email to the brand mailbox, with `Reply-To` set to the reader.
4. The brand mailbox forwards buyer and seller requests to the partner agency the same day (hard rule 6, D14). Partner-category requests are answered by the brand, as before.
5. If the endpoint is not configured or fails, the flow shows the same request as a ready-written email to the brand mailbox (one tap), so no request is ever lost.

Routing shown to the reader after a concierge request (never displayed as a rule): budget 1 M€ or more → the "dedicated adviser" message; timing within 12 months → "received"; otherwise → "thank you" with the path and the newsletter (unchanged from D52).

## 3. Operator steps to switch the endpoint on (about 10 minutes, free)

1. Cloudflare dashboard → the domain (imoveisportugal.lu, once its nameservers are on Cloudflare) → Email → Email Routing → Enable. Accept the DNS records it proposes.
2. Email Routing → Destination addresses → add the brand mailbox and confirm the verification email.
3. Workers & Pages → `imoveis-portugal` → Settings → Bindings → Add → Send email: name `MAILER`, destination address = the brand mailbox.
4. Same page → Variables and secrets → add plain-text variables `MAIL_FROM` = `requests@imoveisportugal.lu` and `MAIL_TO` = the brand mailbox.
5. Redeploy (or push to the branch). Test: send a concierge request on the preview; it should arrive within a minute with the reader as Reply-To.

Until then the flows work end to end through the ready-written email.

## 4. Search (⌘K)

A static index per language and edition (`/search/{lang}-{ed}.json`, built by `site/src/pages/search/[key].json.ts`): the 308 places (to the map), the questions (to the FAQ), the simulators, the path's steps and the main pages. Loaded only when the reader opens search. The map page keeps its own search, which also finds parishes, golf courses, beaches and partner developments.

## 5. Map v3

See `content/media/SOURCES.md` (prompt 36 table) and `scripts/map-data/v3_assets.py`, `v3_extras.py`. About 25 MB of self-hosted tiles; no third-party map service at runtime.
