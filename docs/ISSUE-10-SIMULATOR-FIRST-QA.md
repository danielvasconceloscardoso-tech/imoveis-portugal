# Simulator-first salary negotiation — QA

## Current acceptance boundary

The simulator is the first actionable screen, rather than an information or programme-navigation page. Desktop (1440 × 900) and mobile (390 × 844) must show country, source currency, declared net pay and the calculate action without an introductory click or page scroll. Programme information, screening and official support remain reachable as supporting material.

The leading result is the estimated **Portuguese gross per payment** for employer negotiation. The Portuguese payment count defaults to 14 and can change to 12 without changing annual gross, annual net, taxes or the foreign payment assumption. Required annual gross remains visible. Average monthly net is supporting information and is still explicitly annual net divided by twelve, not a payslip claim.

The default Article 12-A figure remains a hypothetical eligibility assumption, never confirmation. Known failed conditions and unsupported cohorts restore the standard gross and matching tax ledger. The existing private local calculation, sourced housing/life data, reduced motion and salary-free official-support brief remain covered.

## Added and revised browser checks

The three Regressar specs collect **66 identities** across desktop and mobile: the previous 62 plus two new scenarios per viewport.

- Immediate viewport geometry proves the actual financial controls are usable before information or screening.
- Explicit USD and CHF source currencies are converted using the dated repository snapshot while the residence country stays Luxembourg. No silent country-equals-currency assumption.
- EUR4,500 net × 12 produces the conditional annual gross reference EUR67,770 and approximate gross per Portuguese payment EUR4,841 × 14. The annual salary remains visible and the negotiation figure has the strongest visual hierarchy.
- Switching Portuguese payment count to 12 changes the approximate negotiation figure to EUR5,647 and leaves the annual result, source payment count and tax ledger unchanged.
- Immediate illustrative housing power appears before preference selection or a city reveal. Changing the reference municipality changes area estimates, not the annual salary result.
- Existing self-screening, standard comparison, exact fallback ledger, 13/14 foreign annualisation, currency date, clipboard success/denial, source citations, private storage/network behaviour and real MapLibre reuse remain exercised.

The application source, mathematical model and rates are owned by the implementation agents. These tests validate displayed behaviour against independent numeric references and preservation requirements; they do not certify current tax law or financing approval.

## Execution

TypeScript passed. Final coverage verifies **66/66 current identities**, with no skipped or flaky cases. The first complete run passed 62 and exposed four support-navigation failures because the redesign had removed an existing quiet shortcut. Restoring one secondary support anchor fixed all four unchanged cases in a fresh rerun; the financial controls and their initial positions were unchanged. The original report and failure log are preserved under `site/artifacts/simulator-first/history/initial/`.

Six whole-page axe states passed with **zero automatic violations, uncaught errors or horizontal overflow**. A separate initial-viewport check verified all four financial controls are inside the screen in PT desktop/mobile and EN/FR desktop before any simulation or introductory interaction. These checks use DOM geometry, not screenshots.

Final evidence: `site/artifacts/simulator-first/final-coverage.json` records the fresh collection, the 62+4 report provenance, no missing/failed identities and 22 final source/test hashes. `axe-results.json` retains all six audit results, incomplete findings and initial-control geometry. Browsers were closed before Lighthouse was released to the principal agent.

All browser runs use one worker and disable screenshots and traces. Automated axe results, if run, are not WCAG certification; image/pseudo-background contrast still needs its recorded manual or mathematical review. No external forms, messages, contacts, payments or non-GET requests are submitted.
