# Programme-first Regressar experience

The operator explicitly approved production publication on 6 November 2026. The release integrates the existing editorial `main` baseline `6d7834d40047007ea48b3882e7c65a2c50ba57af` without overwriting those changes.

The visitor declares country and net pay, compares Portuguese annual gross requirements, then chooses photographic questions and reveals a municipality that meets every selected supported taste and the illustrative housing ceiling. A separate, source-backed local-life section shows indicative floor areas, required deposit, schools and actual hospitals. Salary and screening answers stay in browser memory.

## What changed

- **Imóveis Portugal × Programa Regressar** typographic composition follows the operator’s supplied visual reference. The adjacent public note identifies an independent simulator without government partnership or validation. This is a textual reference, not a retrieved official graphic-logo asset. The official source domains remain blocked by the execution environment; no official logo or legal verification was fabricated.
- Programme comparison is central. The relief toggle remains disabled until the return year and all four declared conditions are compatible with the versioned screening model. Unknown or failed answers revoke the comparison and restore the standard calculation. Earlier return cohorts are directed to historical-rule review rather than falsely denied relief under newer rules.
- The annual general IRS model remains distinct from monthly withholding. The two comparison figures are required gross amounts for the **same annual net target**; the gross difference is not advertised as tax savings. The current model covers a single full-year mainland employee, without dependants, other income or personal credits, within EUR20,000–500,000 annual net. Statutory assumptions and conditional deduction treatment still require independent fiscal confirmation.
- Six licensed photographic choices cover beach, golf, art, food, schools and airport proximity. Every selected preference remains a hard constraint, with no incompatible random reveal.
- Thirteen municipalities include 24 selected school records and 25 hospital records. Hospitals exclude primary-care units. Detailed records use dated free-flow OSRM estimates from the recorded origin; fallback records retain straight-line kilometres and never acquire invented minutes. School coverage is private/international selection, not all local public schools or a guarantee of admission. Sources and dates accompany each institution.
- Housing power uses INE medians and the disclosed 35% monthly-net housing ceiling. Rental area and purchase area remain illustrative; purchase capacity assumes 20% deposit, 30 years and 3% nominal interest. Deposit funds, taxes, fees, insurance, maintenance and other living costs are not presumed available or included. No mortgage approval or available listing is promised.
- The **Simuladores** entry now names Programa Regressar explicitly. Existing main-map/Golf modules remain unchanged.

## Validation

- Initial feature build: 7,369 pages. Final integrated production candidate: 7,411 pages, preserving 42 new editorial routes.
- 44 fiscal, FX, ranking, screening and local-data contracts passed; TypeScript and content/parity passed.
- 48 current desktop/mobile browser cases verified by test identity: 46 healthy cases from the full run plus two stronger corrected source-date-location assertions rerun successfully. No skipped cases are counted as passes. An earlier unreachable-preview attempt is retained as infrastructure history.
- Six whole-page axe states passed with zero automatic violations, runtime errors or horizontal overflow, including expanded conditional-programme controls and Matosinhos local-life data. Image/pseudo-background contrast remains a manual audit category; the actual 66% dark overlay is checked across viewports and bounds white-text contrast even over white imagery. This is not WCAG certification.
- Lighthouse results below use unchanged performance ≥90, accessibility ≥95, LCP ≤2500ms and CLS ≤0.1 budgets. No artificial engine delay or quality reduction was introduced.
- No standalone screenshots or Playwright traces were produced for this iteration, as requested. Hosted CI has not run because the environment blocks GitHub API access needed to create the PR.

| Profile | Performance | Accessibility | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile-regressar | 100 | 100 | 1812 | 0.0000 | 0 |
| desktop-regressar | 100 | 100 | 411 | 0.0000 | 0 |

Reports: `site/artifacts/issue10/programme-final-coverage.json`, `programme-axe-results.json`, `programme-lighthouse/summary.json`. Real compiled preview: `http://127.0.0.1:4334/pt/lu/regressar/`; English and French use the same route under `/en/us/` and `/fr/fr/`. The only change after these feature audits is the calculator-index link label; its static build and link are checked separately.

Branch: `codex/issue-10-regressar`. Permanent backup branch `backup/pre-codex-2026-11-05` and tag `pre-codex-2026-11-05` remain immutable at `77552be5a5a5bdfbbf6517e4f5525408af5d03db`. The initial review did not include production publication. Subsequent explicit operator approval authorizes the current production release; its remote commit and verification status are recorded in `site/artifacts/issue10/programme-production-release.json`.

See [screening rules](ISSUE-10-PROGRAMME.md), [local data](ISSUE-10-LIFE.md), [creative brief](ISSUE-10-EXPERIENCE.md), [QA](ISSUE-10-PROGRAMME-QA.md), and [original tax model limits](ISSUE-10-TAX.md).
