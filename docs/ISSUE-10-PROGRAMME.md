# Programa Regressar — source-linked fiscal screening

The programme is the subject of the experience. Its fiscal measure and the Portuguese IRS model remain separate from any government partnership claim or official entitlement decision. This screen addresses **CIRS article 12-A**, not the separate IEFP financial support measure, which has its own application, employment and eligibility rules. A salary and a country cannot determine eligibility.

## Version and verification boundary

`CIRS-12A-2024-2026-screening-1`, prepared 6 November 2026. The supported return cohort is **2024, 2025 or 2026**, matching the existing prototype's statutory assumptions. This is a source-linked screening model, **not independently reverified current legislation**. The environment's network policy blocks the official programme and AT domains; the prior primary-source attempt is documented in [the annual model](ISSUE-10-TAX.md). No alternative connection or proxy bypass was used. `PROGRAMME_RULES.sourceVerified` and every result's `sourceVerified` remain `false`.

Sources for fiscal review:

- [CIRS article 12-A](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs12a.aspx).
- [Programa Regressar — fiscal support](https://www.programaregressar.gov.pt/pt/medida-de-apoio-fiscal/).

A link is not a claim that its current contents were retrieved. Before promoting this as a verified fiscal calculator, confirm the current consolidated article, supported return window, NHR restriction and interaction with any other special tax regime. Do not infer an extension to 2027 or convert this screening into an IEFP application decision.

## Questions and outcomes

The visitor gives a fiscal return year and four explicit confirmations: previous Portuguese tax residence; no Portuguese tax residence in **any of the five preceding years**; regularised Portuguese tax affairs; and no NHR registration application. Nationality alone does not establish earlier tax residence. The NHR confirmation is phrased explicitly to reduce the ambiguity of answering a negative question.

All four confirmations must be literal `yes`, and the return year must be supported, before `benefitMayBeCompared` becomes true. The output is still only `potentially-eligible`. Unknown, absent, malformed or nonliteral answers never activate the hypothetical benefit. A known failed condition yields `not-eligible` for this scenario, even when other answers remain unknown. The interface must continue to qualify this result as informational, with official confirmation required.

For a 2026 return, the lookback is **2021–2025** and the model's five tax years are **2026–2030**. A 2024 return gives 2019–2023 and 2024–2028 respectively. These are tax-year windows, not five rolling years from the day of arrival.

**Legacy protection:** a return before 2024 yields `incomplete` with `legacy-rules-required`. Earlier cohorts may still have relief during 2026 under earlier rules. The module deliberately does not deny those visitors by applying the newer five-year lookback to them. A later year returns `outside-return-window`: incompatible with this versioned scenario, not a claim that future legislation cannot change.

## Integration and calculation

`assessEligibility(answers)` is pure and has no storage, analytics, network calls or tax-rate changes. Answers are `yes`, `no` or `unknown`; a missing return year remains missing. It returns status, reasons, missing fields, exact lookback and benefit tax years, and the conditional-comparison flag. PT, EN and FR labels and explanations accompany the questions.

The calling application must use the result to gate its optional Article 12-A scenario and clear any previously enabled benefit if an answer or return year ceases to satisfy the screen. It must never enable relief from origin country, salary amount or a partially completed checklist. Source verification is a separate release requirement; the flag permits only an explicitly hypothetical comparison.

This module does not change the 50% exclusion, gross-income cap, contribution basis, deductions or annual IRS computation. Those remain in [regressar-tax.ts](../site/src/lib/regressar-tax.ts), with their existing assumptions and review limitations.

## Verification

Run `cd site && node --import tsx scripts/test-regressar-eligibility.mjs`.

Eight contracts cover missing and malformed answers, every failed condition, every supported cohort's exact year windows, legacy handling, unsupported future years, all **81** combinations of four tri-state answers, source uncertainty, three-language copy and immutable input. Passing these tests validates screening implementation consistency, not the legislation or an individual tax entitlement.
