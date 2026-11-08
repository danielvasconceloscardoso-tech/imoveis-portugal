# Programa Regressar — optimistic preview QA

The first estimate assumes the programme conditions for an explicitly hypothetical scenario. Unknown screening answers are not a finding of eligibility. Known failed conditions or unsupported cohorts must replace the active result and tax ledger with the standard scenario. A visitor can explicitly choose the standard comparison without the application silently overriding that choice after later checklist answers.

## Coverage

The three existing Regressar browser suites retain their privacy, annualisation, currency, source-data, municipal filtering, native MapLibre reuse, official support and clipboard contracts. Contradictory opt-in-first assertions are replaced to match the operator’s new preview-first request. One explicit-standard-preference case adds two desktop/mobile scenarios, for 62 current identities.

The updated cases check:

- The first EUR4,500 monthly target is a labelled hypothetical programme estimate: EUR67,770 required annual gross, not EUR92,518 standard gross.
- The maintained EUR4,500 calendar-month-average net leads visually; required annual gross remains visible with a smaller type size. The annual net remains EUR54,000. PT, EN and FR communicate the assumption without saying entitlement is approved or confirmed.
- A completed compatible checklist changes the status, not the underlying programme estimate or target net. An explicit standard comparison preference persists.
- A failed condition replaces all monetary fields consistently: rounded annual gross EUR92,518, social security EUR10,177, general IRS EUR28,283, solidarity EUR59 and net EUR54,000. The known rounding difference does not exceed EUR2. No stale lower figure is presented as the active result.
- Legacy 2023 and future 2027 returns do not receive the current cohort’s hypothetical benefit. Returning to a supported year with missing-only answers restores a labelled hypothetical estimate rather than declaring eligibility.
- The native primary link leads to the programme preview; the checklist follows the result in document order. Support remains available independently.
- The brand signature appears at least three times at deliberate journey touchpoints without replacing the independent-status disclosure.

## Execution

Test files compiled with the repository TypeScript options. After the final production-mode build and HTTP 200 readiness signal, a fresh serial desktop/mobile run passed **62/62**, with zero skipped, flaky or unexpected cases. Every current identity was checked against a fresh collection. All 21 application/test SHA-256 fingerprints are retained in `site/artifacts/optimistic-preview/final-coverage.json`; `missingOrFailed` is empty.

Six whole-page axe states passed with zero automatic violations, browser errors or horizontal overflow: Portuguese desktop hypothetical preview; compatible checklist with sourced Matosinhos life data; known-disqualifier standard fallback; Portuguese mobile hypothetical preview; English explicit standard comparison; French hypothetical preview. Raw incomplete audit categories remain in the report, so this is not WCAG certification.

Screenshots and Playwright traces were disabled throughout. Both browser processes ended cleanly before the parent’s Lighthouse measurements. Mathematical implementation and UI tests do not certify tax law or entitlement.

Reports: `site/artifacts/optimistic-preview/browser-results.json`, `collected.json`, `final-coverage.json`, `axe-results.json`.
