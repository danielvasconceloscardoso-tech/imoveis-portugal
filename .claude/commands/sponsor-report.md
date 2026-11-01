Build the monthly sponsor report (prompt 47 §3.4, upgraded in prompt 51) for `$ARGUMENTS` (`<company> <month>`, month as YYYY-MM).

1. The month's figures live in `sponsors/reports/data/<partner-slug>_<YYYY-MM>.json`. They are written on the 1st of each month by `scripts/metrics/collect.mjs --month` (GitHub Actions, `.github/workflows/metrics.yml`). The sources are Cloudflare Web Analytics, with its cookie-free event pages, and beehiiv, merged with the operator's file `sponsors/reports/manual/<partner-slug>_<YYYY-MM>.json`, which holds the advisor's response time, visits booked, request summaries, availability and notes. Setup: ops/METRICS_SETUP.md. If no file exists, ask the operator for the figures, or run without `--in`: every section then says "no data yet". Never estimate a figure.
2. Run this from the repo root, in the sponsor's language (pt or en):
   `node scripts/sponsor-report.mjs "<company>" <YYYY-MM> --in sponsors/reports/data/<slug>_<YYYY-MM>.json --lang <pt|en>`
   - The PDF opens with the funnel: reach → saw the project → card clicks → requests → visits, with the share kept at each step.
   - It then gives the reach per edition, the project page with readers by country, and the requests with their qualified summary and the advisor's response.
   - It ends with the index card and availability.
   - The PDF lands in `sponsors/reports/<company-slug>_<YYYY-MM>_<lang>.pdf`.
3. The same numbers appear live on the partner's private dashboard: `/p/<token>/`, with the token in `content/partners/dashboards.csv`.
4. `scripts/metrics/guard.mjs` refuses two things:
   - request summaries with fields other than date, edition, typology, budget_band, payment, timeline, visit and status;
   - any value that looks like an email address or a phone number.

   Fix the input; never bypass the check (hard rule 3).
5. Show the operator the path and the page count. The report and the dashboard link go to the sponsor only after the operator approves (hard rule 2).
