# Metrics setup (prompt 51 §3): what feeds the dashboards, and the operator's steps

## How it works

1. **Page views, countries and events** come from Cloudflare Web Analytics, which is cookie-free and needs no banner. Readers' actions are counted with no cookie and no server code. Each counted action loads a tiny unlisted page under `/e/` in a hidden frame (`site/src/lib/track.ts`):
   - Concierge started and sent;
   - a request sent, per flow and per partner project;
   - a partner pin opened on the map;
   - a listed building's card clicked;
   - a place opened on the map;
   - a question opened on Perguntas.

   Nothing about the person is recorded, only the path and the country.
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
