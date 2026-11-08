# Programa Regressar — conditional preview first

The first calculation can explore the Article 12-A scenario while answers remain unknown. Adjacent copy explicitly says that the benefit is assumed and the conditions still need checking. An incomplete checklist never becomes a claim of eligibility.

`decideProgrammeScenario(assessment, preferBenefit = true)` is a presentation policy over the existing screening result. It does not change `assessEligibility`, `benefitMayBeCompared`, tax rates, statutory rules or `sourceVerified`.

| Screening state | Default result | Meaning |
| --- | --- | --- |
| Missing/unknown answers only | Hypothetical benefit scenario | Assume the conditions solely for a disclosed preview; check the list next. |
| All current-model conditions answered yes | Compatible benefit scenario | Self-reported compatibility, still requiring tax confirmation. |
| Known failed condition | Standard scenario | The current model stops applying relief. |
| Legacy, invalid or future/out-of-window year | Standard scenario | The current cohort cannot be assumed; historical rules or future law need separate review. |
| Visitor chooses the standard comparison | Standard scenario | Respect that choice while preserving the available conditional preview. |

Every scenario has `eligibilityConfirmed: false`. Known reasons override the optimistic default; contradictory screening states fail closed. A fully unknown assessment still has `benefitMayBeCompared === false`: the presentation layer distinguishes a labelled assumption from the actual screening outcome.

The result hierarchy should lead with preserved average monthly net income, explicitly annual net divided by 12. Required annual gross remains visible as a secondary fact, not hidden or relabelled as monthly pay. The standard comparison remains available. No salary, rate, eligibility or loan result is made more favourable by changing the arithmetic.

Source verification and legislative work in queued Prompt 79 remain separate. This change verifies no new law, introduces no IRS Jovem model and does not set `sourceVerified: true`.

Run from `site/`: `node --import tsx scripts/test-regressar-scenario.mjs`. Ten contracts cover missing/partial information, declared compatibility, known failures, cohorts and malformed years, explicit standard choice, contradictory states, all 81 answer combinations, immutability and PT/EN/FR copy.

## Delivered presentation

The first calculation uses a clearly labelled hypothetical Article 12-A scenario. Missing answers permit exploring an assumption, not a claim of eligibility. Known failed conditions, unsupported cohorts and invalid years restore the standard calculation; explicit user choice of the standard scenario is respected. The underlying strict screening flags, source-verification flags and tax arithmetic remain unchanged.

The large figure is the preserved **average monthly net**, annual net divided by 12, explicitly distinguished from a payslip amount. Required annual gross remains visible below at a smaller scale. The standard comparison is available in a native disclosure; taxes and social contributions always follow the displayed scenario. The checklist follows the result. Four compact textual brand signatures appear in the header, simulator, result and support section, with independent status retained. No official graphic-logo asset or partnership is claimed.

## Final checks

Production-mode build: 7,411 pages. All 61 model/data/support/presentation contracts and TypeScript/content/parity passed. Fresh complete browser coverage: 62/62 desktop/mobile cases, no skipped/flaky/failed cases. Six whole-page axe states passed with zero automatic violations, runtime errors or horizontal overflow; manual/pseudo-background audit limitations remain recorded. No standalone screenshots or Playwright traces were produced.

| Profile | Performance | Accessibility | LCP (ms) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| mobile-regressar | 100 | 100 | 1821 | 0.0000 | 0 |
| desktop-regressar | 100 | 100 | 410 | 0.0000 | 0 |

Unchanged budgets passed with zero gatherer errors. Laboratory scores are not field INP or physical-device certification. Evidence: `site/artifacts/optimistic-preview/{final-coverage,axe-results}.json` and `lighthouse/summary.json`. The queued Prompt 79 remains separate: this change does not implement IRS Jovem, treat OE2027 proposals as enacted law or mark statutory sources verified. Publication follows the existing go-live authorization and normal main fast-forward checks.
