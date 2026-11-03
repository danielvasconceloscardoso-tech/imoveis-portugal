# Metrics setup (prompt 51 §3): what feeds the dashboards, and the operator's steps

## How it works

1. **Page views, countries and events** come from Cloudflare Web Analytics, which is cookie-free and needs no banner. Readers' actions are counted with no cookie and no server code. Each counted action loads a tiny unlisted page under `/e/` in a hidden frame (`site/src/lib/track.ts`). Every action goes through one function, `ev()`, with one schema (see "The events" below). Examples:
   - Concierge started, each step reached, where it stopped, and sent;
   - a request sent, per flow and per partner project;
   - a place opened on the map, the time spent on it, and the layers turned on;
   - a developer's page seen and shared;
   - every simulator interaction;
   - Passo a passo stations opened and completed;
   - a question opened on Perguntas;
   - a letter signup with its first-touch UTM.

   Nothing about the person is recorded, only the path and the country. The same events can also go to our own first-party store (Cloudflare D1) once the operator turns it on: `ops/EVENTS_SETUP.md`. It is off today.
2. **Subscribers per edition** come from beehiiv, if the free plan exposes the API. That is not verified; if it doesn't, see step 3.
3. **What no platform sees** is typed in by the operator: the advisor's response time, visits booked and request summaries (only date, edition, typology, budget band, payment, timeline, visit and status).
   - Weekly: `ops/metrics/manual/<YYYY-Www>.json`.
   - Monthly, per partner: `sponsors/reports/manual/<partner>_<YYYY-MM>.json`, with keys `requests.summaries`, `advisor.response_hours_median`, `advisor.within_24h_pct`, `advisor.answered`, `visits`, `availability`, `index_card` and `notes`.
4. **The collector**, `scripts/metrics/collect.mjs`, runs by itself through `.github/workflows/metrics.yml`:
   - on Mondays, the past week: `ops/metrics/weekly/`, plus the block in `ops/METRICS.md`;
   - on the 1st of each month, each partner's month: `sponsors/reports/data/`.

   It commits to main as the brand, and Cloudflare redeploys. `scripts/metrics/guard.mjs` refuses any email address, phone number or summary field outside the allowed list, and the build checks again.
5. **What the numbers feed:**
   - the private partner dashboards;
   - the internal dashboard;
   - `/sponsor-report <company> <month>` (the PDF, approved by the operator before it is sent: hard rule 2).

## The events (one schema, part 5)

Every reader action is one call, `ev({ event, place?, region?, band?, origin?, step? })` in `site/src/lib/track.ts`. The function adds `page` (the path only), `ed` (the edition), a random per-tab `sid` and the timestamp `ts`. Bands replace amounts: budget bands come from `lib/sim1.ts` and time bands are `0-10s`, `10-30s`, `30-60s`, `1-3m` and `3m-plus`. Any value that is not a short slug, or that contains `@`, is dropped. Names, e-mail addresses and answers typed by the reader are never sent.

The Cloudflare count is the page `/e/{ed}/{event}/`, except the three short families marked below. Every page is built by `site/src/lib/events.ts`. An event whose page is not in that file is not counted by Cloudflare, so add it there first.

| Event | Counted at `/e/…` | Fields | Fired when |
| --- | --- | --- | --- |
| `map/place` | `s/{place}/` | place, origin (`page`, `home`) | a place is opened on the map (tap or search) |
| `map/time` | `s/{place}/t/{band}/` | place, band | the place card closes, another place or card opens, or the page is hidden |
| `map/layer/{price,g10,rent,yield,vac}` | `{ed}/map/layer/{l}/` | place (if a card is open), origin | a layer button is tapped |
| `map/overlay/{golf,beach,devs}/{on,off}` | `{ed}/map/overlay/…/` | place, origin | an overlay button is tapped |
| `map/share` | `{ed}/map/share/` | place, origin (`native`, `copy`) | the place card's share button |
| `p/{project}/pin` | `{ed}/p/{project}/pin/` | place = project, origin `map` | a partner's map pin is opened |
| `p/{project}/card` | `{ed}/p/{project}/card/` | place, origin = flow | a listed building's card is clicked in the Concierge |
| `p/{project}/req` | `{ed}/p/{project}/req/` | place, origin = flow | a request about that project is sent |
| `p/{project}/view` | `{ed}/p/{project}/view/` | place, origin (`site`, `outside`) | the developer's page is opened on the site (never on the private demos) |
| `p/{project}/share` | `{ed}/p/{project}/share/` | place, origin (`native`, `copy`) | "Partilhar esta página" on the developer's page |
| `faq/open` | `q/{id}/` | step = question id | a question is opened on Perguntas |
| `path/{station}/open` | `{ed}/path/{station}/open/` | step, band (budget), origin (`buy`, `sell`, `preview`) | a Passo a passo station comes on screen |
| `path/{station}/done` | `{ed}/path/{station}/done/` | step, origin | "Próximo passo" on a station |
| `flow/{flow}/start` | `{ed}/flow/{flow}/start/` | band | the reader moves past the first screen (concierge, partner, viewing, lawyer) |
| `flow/{flow}/step/{step}` | `{ed}/flow/{flow}/step/{step}/` | step, band, origin `known` when the site pre-filled it | a step is shown (also `lawyer`, `book`, `buildings` side screens) |
| `flow/{flow}/stop/{step}` | `{ed}/flow/{flow}/stop/{step}/` | step, band | the sheet closes, or the page is left, without sending |
| `flow/{flow}/sent` | `{ed}/flow/{flow}/sent/` | band, origin `sheet` for the showcase request sheet | the request was sent to /api/request (Imóveis Portugal and the partner agency) |
| `flow/{flow}/fallback` | `{ed}/flow/{flow}/fallback/` | band, origin `sheet` for the showcase request sheet | /api/request did not take it; the ready-written e-mail was offered (concierge, partner, viewing) |
| `sim1/{what}/{value}` | `{ed}/sim1/…/` | region, band, origin `sim1` | every interaction with the one-screen simulator (budget, entry, region, type, use, pay, row, next) |
| `sim/{tool}/use` | `{ed}/sim/{tool}/use/` | band (price) | a classic calculator is used (once the hand stops) |
| `heart/{home,region}/{on,off}` | `{ed}/heart/…/` | place (home) or region, origin | a heart is set or removed. Helper: `evHeart(kind, id, on, origin)` |
| `bar/{item}` | `{ed}/bar/{item}/` | origin `bar` | a tap on the phone bottom bar. Helper: `evBar(item)`. Items: home, map, sims, concierge, saved, path, faq, search, menu, letter |
| `letter/signup/{medium}` | `{ed}/letter/signup/{medium}/` | origin = `source/medium/campaign` (first touch in this tab), step = where | the letter signup form is submitted. Media counted: none, email, newsletter, social, paid, cpc, referral, partner, qr, other |
| `art/{id}/open` | `{ed}/art/{id}/open/` | origin `art` | a lifestyle article (D83, content/stories/) is opened |
| `art/{id}/place` | `{ed}/art/{id}/place/` | place = municipality slug, origin `art` | a place named in the article is followed to its card on the map |
| `art/{id}/tile` | `{ed}/art/{id}/tile/` | place, origin `art` | the small map tile under "Para ir" is opened |
| `art/{id}/concierge` | `{ed}/art/{id}/concierge/` | origin `art` | the Concierge line at the end of the article is followed |

What the site already knows is reused, so the reader is never asked twice. The Concierge opens with these answers already given, and each one stays editable:
- the country, from the edition;
- the budget band, from the link, else the simulator used in this tab, else the budget saved on the device;
- the place, from the link, else the last place opened on the map in this tab, else the last place saved on the device.

These come from `sessionStorage` (`ip.place`, `ip.sim1.budget`, `ip.utm`) and the existing `localStorage` keys. They stay on the reader's device and are never sent.

The collector (`scripts/metrics/collect.mjs`) reads the new pages into `place_time` (top places, by band), `flow_steps` (steps and stops per flow), `events` (every other event, by name) and the developers' `view` and `share` counts.

## The links (unlisted, noindex, never in a menu or the sitemap)

- Internal weekly dashboard: `/i/be18a942fba0cbdf030a/` on the live domain. Do not forward it.
- Partner dashboards: `/p/{token}/`, one per row in `content/partners/dashboards.csv`.
  - ID Investimentos Imobiliários (Marble Terrace): `/p/3507cb0e058224b80adf/`. It stays empty until the first collected month.
  - The labelled sample for sales calls: `/p/0150d7d8a4110db94157/`.
- To add a partner, add a row with a new random token (`python3 -c "import secrets; print(secrets.token_hex(10))"`). The operator sends the link; a partner only ever sees their own row.

## Operator steps (about 20 minutes, once)

1. **Turn Web Analytics on.** In the Cloudflare dashboard, open Analytics & Logs → Web Analytics → Add a site → the live domain (imoveisportugal.pt).
   - If Cloudflare offers **automatic setup** for the domain, accept it and skip the next point; nothing else is needed on the site.
   - Otherwise choose the JavaScript snippet and copy only the `token` value from it. Then open Workers & Pages → `imoveis-portugal` → Settings → Build → Variables and secrets → add `PUBLIC_CF_BEACON_TOKEN` = that token. The token is public by design, and the next build carries it.
   - Use one route or the other, not both, or every page is counted twice.
2. **Note the site tag.** The site tag is shown in that Web Analytics site's settings. Also note the Account ID from the dashboard's right column.
3. **Create a read-only API token.** Go to My Profile → API Tokens → Create Token → Custom token → Permissions: **Account · Account Analytics · Read**, for this account only. Copy the token once.
4. **Add the GitHub secrets.** In the GitHub repository, open Settings → Secrets and variables → Actions → New repository secret and add:
   - `CF_API_TOKEN` (step 3);
   - `CF_ACCOUNT_ID` (step 2);
   - `CF_SITE_TAGS` (step 2; comma-separated if there are several domains).
5. **beehiiv (optional).** If Settings → API exists on our plan, create a key and add the secrets `BEEHIIV_API_KEY` and `BEEHIIV_PUBS` (format `lu:pub_…,fr:pub_…`, one publication or segment per edition). If the plan has no API, type the subscribers into the weekly manual file instead.
6. **First run.** In GitHub, open Actions → metrics → Run workflow. Check that `ops/METRICS.md` shows the week and that the internal dashboard fills after the redeploy.

Paste nothing into chat: the keys live only in Cloudflare and GitHub (hard rule 3).

## Limits, said plainly

- Counts start the day the beacon is live; nothing before that can be recovered.
- Cloudflare Web Analytics samples heavy traffic. Its figures are visits and page loads, not people.
- Requests are counted when they leave the page. The advisor's own figures (replies, visits) come from the advisor through the operator.
- An ad blocker that blocks Cloudflare's beacon hides that reader from every count.
- Each event page is counted at most once per page load. An action made as the page closes (time on a place, a Concierge stop when the tab is closed) may be lost on `/e/`. The first-party store (`ops/EVENTS_SETUP.md`) receives it, because it uses `sendBeacon`.
