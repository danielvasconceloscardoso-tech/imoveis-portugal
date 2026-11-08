# Simulator first: salary to negotiate, then housing and city discovery

The entry screen is the simulator itself. Country, explicitly selectable salary currency, current net income and the calculate button appear before programme information. There is no preliminary navigation or eligibility gate before the first calculation.

The primary result is Portuguese **gross per payment**, defaulting to 14 payments per year, with an explicit 12-payment alternative. Annual required gross remains visible. This payment selector changes only the presentation of the annual negotiation salary; it does not change foreign annualisation, the annual tax calculation or the annual net target. The annual tax ledger has its own visible period caption. Monthly net remains supporting information, clearly annual net divided by 12.

Currency is independent of residence. The five existing dated ECB snapshot currencies are selectable; no unverified quote or foreign gross/tax is introduced. Country selection supplies a usual currency default which the visitor can override.

Immediately after calculating, visitors can select a municipality and see indicative rental area, purchase area, price ceiling and deposit requirement before answering lifestyle questions. This uses the existing source-backed medians and illustrative 35% net housing ceiling, 20% deposit, 30 years and 3% nominal interest. Taxes/fees/insurance are excluded; no loan approval or available listing is promised. Preference matching, school/hospital data, the map, optional eligibility checklist and official-support handoff remain available later in the flow.

The initial Programme Regressar relief remains explicitly hypothetical. Known failed conditions and unsupported cohorts still restore the standard result and its complete tax ledger. No tax rates, source-verification flags or eligibility law were changed. The four quiet textual brand signatures and independent-role disclosure remain.

## Validation

- Static production-mode build: 7,411 pages.
- 63 engine/data/presentation contracts, TypeScript and content/parity passed.
- 66 current desktop/mobile browser identities passed: 62 healthy cases in the full run plus four unchanged support cases rerun after restoring a quiet optional link. No skipped/flaky identities counted as passes.
- Actual first-screen geometry verified for country/currency/net/submit on PT desktop/mobile and EN/FR desktop.
- Independent USD/CHF pay currency, 14/12 Portuguese salary presentation and immediate housing power by municipality are covered.
- Six whole-page axe states passed with zero automatic violations, runtime errors or overflow. This is not a WCAG certification.
- No standalone screenshots or Playwright traces produced.

| Profile | Performance | Accessibility | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile-regressar | 100 | 100 | 1804 | 0.0000 | 0 |
| desktop-regressar | 100 | 100 | 412 | 0.0000 | 0 |

Unchanged Lighthouse budgets passed, with zero gatherer errors. These are local lab results, not field or physical-device claims. Evidence: `site/artifacts/simulator-first/{final-coverage,axe-results}.json` and `lighthouse/summary.json`. All prior backups and current main changes are preserved; publication follows the existing go-live authorization.
