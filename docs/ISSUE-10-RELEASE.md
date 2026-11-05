# Issue 10 — Regressar prototype

This initial report is superseded by the [programme-first release](ISSUE-10-PROGRAMME-RELEASE.md) for the current iteration.

A declared take-home salary becomes a Portuguese annual gross estimate, then a source-backed place to explore. The arrival asks for country and net salary; annualisation and tax assumptions stay behind progressive controls. The city reveal filters by affordability and every selected supported preference before any animation starts.

## Review routes

- Running local production-build preview: `http://127.0.0.1:4334/pt/lu/regressar/` (HTTP 200 verified).
- Portuguese: `/pt/lu/regressar/`
- English: `/en/us/regressar/`
- French: `/fr/fr/regressar/`

The existing Workers Builds configuration also builds pushed branches; external preview readiness cannot be verified through this environment’s restricted network. The local preview above is the actual compiled application. The dedicated shell loads one application script, without the general navigation/profile scripts; brand, language and legal/navigation links remain.

The calculators index links to the experience. The existing main map, Golf modules and other calculators remain intact. The small discovery map loads only after a reveal, uses existing local municipality geometry and links into the current map with a place query. No map token, remote tile service or paid dependency is introduced.

## Calculation boundary

This is an annual mainland employee-income model for a single resident with no dependants, no other income and no personal tax credits. It is not a payroll-withholding calculator. Supported equivalent annual net: EUR20,000–500,000; low-income minimum-existence cases fail explicitly. Article 12-A is an optional conditional comparison, never presumed eligibility. The full method describes the gross-income cap, duration, deduction treatment and exclusions.

The existing 2026 IRS bracket register was checked on 25 October. Primary-source retrieval is blocked by the environment; additional statutory assumptions require independent fiscal review before this is promoted as a validated fiscal tool. The interface marks that limitation. Implementation tests validate the model, not the law.

Foreign salary is already net: no foreign gross or foreign tax is requested or inferred. Non-euro conversion uses the repository's dated ECB snapshot of 23 October 2026, visibly labelled, not a live November quote.

Housing uses existing INE municipality medians and an explicit 80m² scenario, capped at 35% of annual net divided by 12. Purchase repayments assume 20% deposit, 3% nominal interest and 30 years; taxes, fees and insurance are excluded. Income alone does not establish deposit availability or financing approval. Remaining income is before other living expenses, not a researched cost-of-living total. City-specific living-cost evidence is unavailable and no total is invented.

Only six evidenced tastes are offered: beach, golf, art, food, schools and airport. Surf, business and quiet have no comparable verified dataset and are not inferred. No compatible result means an honest empty state. The discovery sample covers 13 mainland municipalities, not all Portugal.

## Privacy and motion

Salary remains in browser memory. It is not serialized into a URL, storage, analytics or network payload. Local step events contain only the step name. Reduced motion skips the reveal animation and camera flights. Results and errors use accessible live regions; every core control supports keyboard use.

## Validation and evidence

The production-mode build passed with 7,369 pages. The fiscal, currency and place engines passed 27 contracts (11 + 6 + 10). TypeScript and content/parity checks passed. The final lightweight candidate passed the complete desktop/mobile suite: 36/36, zero skips/flaky cases. Six axe states passed with zero automatic violations, runtime errors or horizontal overflow. Actual city marker labels, region semantics and image-text contrast were corrected following manual review. This is not a WCAG certification. Screenshots are omitted from the handoff at the operator’s request. Verified application revision: `9cd60da74e6368e0e90d59a17b5d70273f5154b1`. No screenshots are part of this handoff.

Reproduction: `npm run test:regressar`, `npm run test:config`, `npm run test:content`, `npm run build:test`, then `npm run test:e2e -- regressar.spec.ts`.

See [tax model](ISSUE-10-TAX.md), [places and matching](ISSUE-10-PLACES.md), [currency and distribution sources](ISSUE-10-SOURCES.md), [creative direction](ISSUE-10-DESIGN.md) and [independent QA](ISSUE-10-QA.md).

## Release controls

Work is isolated on `codex/issue-10-regressar`, based on `e7a7a6232b4c6b99cfae589e436b6292c49bc61c`. The permanent backup branch `backup/pre-codex-2026-11-05` and tag `pre-codex-2026-11-05` remain at `77552be5a5a5bdfbbf6517e4f5525408af5d03db`. No production publication is authorized for this new issue. No outreach or government partnership claim is made.

## Final performance

Lighthouse 13.6, local Chromium 155, serial mobile/desktop runs. Budgets unchanged after the first failure: performance ≥90, accessibility ≥95, LCP ≤2500ms, CLS ≤0.1. The original V2 shell scored 60 mobile with 3860ms TBT; the dedicated shell removes that loading cost. No artificial loading delay or renderer quality reduction was added.

| Profile | Performance | Accessibility | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile-regressar | 100 | 100 | 1659 | 0.0000 | 0 |
| desktop-regressar | 100 | 100 | 411 | 0.0000 | 0 |

Both route budgets passed; zero gatherer errors. Best-practice score: mobile 96, desktop 100. SEO 69 is diagnostic: the prototype intentionally remains noindex. These are laboratory measurements, not field INP or physical-device measurements.

Final reports: `site/artifacts/issue10/browser-light-final.json`, `final-coverage.json`, `axe-final.json`, `lighthouse-final/summary.json`. Hosted GitHub CI has not run; draft PR creation is subject to the environment’s GitHub API restriction. The [ready description](ISSUE-10-PR.md) and [comparison](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/compare/main...codex/issue-10-regressar?expand=1) supply the handoff.
