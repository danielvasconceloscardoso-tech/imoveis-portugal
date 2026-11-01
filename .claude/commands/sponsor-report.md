Build the monthly sponsor report (prompt 47 §3.4) for `$ARGUMENTS` (`<company> <month>`, month as YYYY-MM).

1. Look for the month's input at `sponsors/reports/data/<company-slug>_<YYYY-MM>.json` (shape: sponsors/papers/monthly-report-template.en.md; sample: sponsors/papers/monthly-report.sample.json). Cloudflare Web Analytics, the letter platform and the request log are not connected yet: if no file exists, ask the operator for the figures or run without `--in`, and every section says "no data yet". Never estimate a figure.
2. Run from the repo root, in the sponsor's language (pt or en):
   `node scripts/sponsor-report.mjs "<company>" <YYYY-MM> --in <file.json> --lang <pt|en>`
   The PDF lands in `sponsors/reports/<company-slug>_<YYYY-MM>_<lang>.pdf`.
3. The script refuses request summaries with fields other than date, edition, typology, budget_band, payment, timeline, visit, status, and any value that looks like an email or a phone number. Fix the input; never bypass the check (hard rule 3).
4. Show the operator the path and the page count. The report goes to the sponsor only after the operator approves it (hard rule 2).
