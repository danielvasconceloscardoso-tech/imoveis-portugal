# Issue 10 — Independent QA

## Scope and status

The salary-to-city experience is tested separately from the main map and Golf Mode. Browser tests live in `site/tests/e2e/regressar.spec.ts`; they use the repository's existing desktop 1440 × 900 and mobile 390 × 844 projects. No production deployment is part of this work.

**Final lightweight candidate: PASS — 36/36 browser cases**, no skipped cases or flaky results, 1.1 minutes. This is a fresh complete run after the standalone page shell, map accessibility and contrast changes. Screenshots and traces were disabled. TypeScript and collection checks passed.

Final results: `site/artifacts/issue10/browser-light-final.json`; identity/source-hash check: `site/artifacts/issue10/final-coverage.json`. Six additional locale smoke cases passed on the preceding cosmetic candidate. Initial failure evidence remains in local history; it is not a screenshot deliverable.

**Accessibility: six axe WCAG 2 A/AA and 2.1 AA audits, zero automated violations**, zero uncaught browser errors and no horizontal overflow. The audits cover Portuguese desktop/mobile result and city states, plus English/French desktop results. Portuguese desktop uses ordinary motion and completes the cinematic reveal; the other contexts use reduced motion. Result: `site/artifacts/issue10/axe-final.json`. No new images were produced after the operator requested no screenshots.

## Acceptance checks

- Portuguese decimal-comma input agrees with decimal-point input.
- Portuguese, English and French routes expose accessible country and **net** income inputs. No foreign gross-income input is requested.
- A local calculation reveals Portuguese annual gross, net, IRS and employee Social Security. Tax year 2026 is visible; results announce through a live region.
- €4,500 per payment × 12 and €54,000 per year produce the same gross result. Fourteen payments correspond to €63,000 per year, not twelve-month arithmetic.
- Article 12-A starts off, remains an explicit scenario and lowers required gross for the same target when chosen. Fiscal unit tests own the actual statutory arithmetic and boundary values.
- Empty, zero and negative incomes never produce salary results. A €1,000 monthly amount receives the explicit unsupported-minimum-existence explanation instead of an inaccurate calculation.
- Raw income is absent from URL, request data and browser storage. Browser tests reject all cross-origin and non-GET requests, so no test can send mail, leads or payment requests.
- Denied storage and reduced motion preserve calculation and city discovery. Preference buttons expose selection through `aria-pressed`.
- A CHF calculation uses the dated 23 October ECB snapshot and differs from an EUR identity conversion.
- A €1,700 monthly rent scenario with a beach preference produces an honest no-match in the curated sample. Discovery links contain the actual place identity and no salary. A revealed candidate must satisfy the model's housing affordability and selected preferences; the city-ranking unit checks own those numerical constraints.
- Successive city reveals reuse one real initialized MapLibre canvas rather than leaking renderers.
- Keyboard submission works; the primary action is at least 44 × 44 CSS pixels; the page has no horizontal overflow at either tested viewport.

## Fiscal review boundaries

The calculation must distinguish annual liability from monthly withholding. It must identify the assumed resident region, employment category, household, deductions, contribution basis and special-regime eligibility. Net foreign salary is declared by the visitor; no foreign tax calculation belongs here. Foreign currencies need a verifiable dated rate or a visibly user-supplied conversion; no silent 1:1 exchange assumption.

The first release must not imply bank approval from income alone. Housing comparisons need an explicit floor area, dated municipal INE reference and the distinction between observed medians and available listings. Missing cost-of-living evidence must stay missing; invented city living-cost totals cannot be presented as data.

The repository contains a sourced 2026 IRS bracket snapshot (`pt-irs-68-2026`, checked 25 October 2026). An inherited snapshot is not independent live verification. Minimum-existence relief, specific deductions, solidarity and the Article 12-A exclusion/cap require explicit treatment rather than an unexplained effective tax percentage.

## Reproduction

After building and starting the local candidate, run from `site/`:

```sh
E2E_BASE_URL=http://127.0.0.1:4323 npx playwright test regressar.spec.ts --project=desktop --project=mobile --workers=1
```

Use the environment's supported Chromium executable if its bundled browser is unavailable. Respect the current operator instruction: no new screenshots. The final smoke run disables screenshots and traces in a temporary ignored test configuration. Do not run competing browser/performance sessions on this environment's shared software GPU.

## Findings and corrective changes

Before browser execution, independent integration review identified repeated MapLibre construction and stale map candidates after changing preferences. The application now reuses a single handle, hides stale results/maps on input changes and updates only current compatible candidates. Browser coverage exercises one real canvas across repeated reveals and a preference change.

The initial browser run (`history/initial/` in the evidence directory) passed 34 cases and failed two mobile annualisation cases. Trace input coordinates and the original screenshot showed the fixed bottom shortcut bar covering the calculate button after expanding payment details. The focused page now uses its own lightweight, accessible brand header, language links and footer, so the obstructing fixed bar is absent. Other pages retain their existing shell. The test inputs, trusted clicks and visibility requirements were not weakened.

Fiscal review found the implementation internally consistent with its documented model. This is not independent verification of current legislation: only the existing 2026 bracket snapshot had prior source provenance. The visible UI must continue to identify the unconfirmed statutory assumptions, annual-tax scope, omitted tax credits, explicit former-resident eligibility and unsupported low-income range.

## Accessibility review and limits

Automated auditing initially found six city-text contrast failures per viewport (4.4:1). The muted color was darkened; the final audits report zero violations. Manual review also found unnamed map regions and MapLibre overwriting every city button name with “Map marker”. The map now has a named region and each marker’s accessible name is restored after construction; the full browser suite asserts those actual rendered names.

Axe still marks photo-background contrast and overlapping map markers as incomplete checks. These are not counted as passes. The photograph now has a uniform 66% dark-green overlay: even a white image pixel produces sufficient contrast for white text. Marker foreground/background colors have strong contrast, but labels can overlap in the small map; zoom controls and the alternative-city action remain available. No full WCAG conformance certification is claimed.

The focused page avoids the shared site JavaScript and styles. Its final full regression preserves local-only salary handling, all three languages, input validation, conversion/annualisation and existing-map deep links. Lighthouse results are owned by the parent release verification and are not inferred from browser-test duration.
