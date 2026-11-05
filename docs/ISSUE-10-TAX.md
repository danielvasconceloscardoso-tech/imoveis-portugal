# Issue 10 — Annual salary model, 2026

This is a transparent mainland Portuguese employee-income **scenario**, not an official tax service, an eligibility determination or a payslip/withholding quotation. It does not calculate foreign tax. The visitor supplies their own foreign net income.

## Version and verification

Version: `PT-mainland-2026.11-model-1`, prepared 5 November 2026. The nine 2026 general IRS brackets come verbatim from the repository's existing `pt-irs-68-2026` fact, recorded as checked on 25 October 2026. New attempts to retrieve the primary AT source on 5 November returned a proxy CONNECT 403. **The other statutory assumptions below have not been independently reverified during this session. Fiscal review is required before presenting this as a verified 2026 tax calculator.** Source links are for inspection, not a claim that the pages were opened successfully.

The model uses employee Segurança Social of 11%; a specific deduction of the larger of 8.54 × IAS or mandatory social contributions; an IAS assumption of €537.13 (specific deduction €4,587.09); the annual article 68 table; and solidarity on taxable income above €80,000 (2.5% up to €250,000, 5% on the excess). General IRS follows article 68(2)'s published average/marginal method. Its three-decimal average rates can produce sub-euro boundary differences. Amounts are rounded to cents; the inverse solver verifies that its result reaches the annual target to €0.05. It is an approximate equivalent, not a guarantee of the globally smallest contractual salary.

Defaults are explicit: one full-year mainland Portuguese resident employee, single, no dependants or disability, no other income, no IRS Jovem/IFICI/NHR, no joint assessment and no personal/household expense tax credits. Results are before those credits. Madeira/Azores, partial years, self-employment and cross-border treaty situations are unsupported. Annual net targets below €20,000 or above €500,000 return a machine-readable `UNSUPPORTED_NET_RANGE` error instead of a result. In particular this is **not a minimum-existence calculator**; low-income tax protection is not modelled or claimed.

## Conditional former-resident comparison

Article 12-A is shown only as a hypothetical comparison for someone who meets the legal conditions, never inferred from their country or salary. The intended statutory assumptions are a 50% exclusion on qualifying gross employment income up to €250,000 per year (**maximum excluded €125,000**, not €250,000), over the return year and four subsequent years. Social contributions remain on the full salary; the specific deduction is allocated proportionally to the income remaining taxable. This allocation and the current return-date/eligibility conditions require primary-source/fiscal confirmation before release.

The explanatory eligibility checklist must cover previous Portuguese residence, no Portuguese tax residence in the preceding five years, the statutory return-date window, regularised tax affairs, incompatibility with other special regimes, and a five-tax-year benefit. It must link to the current article and official programme rather than approve an individual case. This prototype is not an official partnership with Programa Regressar.

## Annual income, not November withholding

Foreign monthly net is multiplied by the visitor's declared 12, 13 or 14 payments. Annual input is used directly. Currency conversion belongs to the calling layer and must have a verifiable rate/date or an explicit user-provided conversion; this engine invents no exchange rate. Portuguese annual net divided by 12 is a calendar-month average, **not** a claim about one of 14 payslips. Changes to monthly withholding, including temporary November measures, do not replace annual liability and are deliberately absent.

## Formula

1. Employee contributions = gross × 11%.
2. Conditional excluded income = 50% × min(gross, €250,000), otherwise zero.
3. Deduction = max(€4,587.09, contributions), capped at gross, multiplied by the proportion remaining taxable.
4. Taxable income = max(0, gross − exclusion − deduction).
5. Annual net = gross − contributions − general IRS − solidarity, before personal tax credits.
6. Solve in integer cents for an annual gross reaching the requested annual net. No foreign gross is requested or derived.

## Sources and tests

- [CIRS article 68](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68.aspx)
- [CIRS article 25](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs25.aspx)
- [CIRS article 68-A](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68a.aspx)
- [CIRS article 12-A](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs12a.aspx)
- [Programa Regressar — fiscal support](https://www.programaregressar.gov.pt/pt/medida-de-apoio-fiscal/)
- [Segurança Social — contribution rates](https://www.seg-social.pt/taxas-contributivas)
- [Segurança Social — IAS](https://www.seg-social.pt/indexante-dos-apoios-sociais-ias)

Run from `site/`: `node --import tsx scripts/test-regressar-tax.mjs`. Contracts cover independent €50k standard/conditional calculations, all IRS edges, solidarity edges, qualifying-income cap, €2.5k/€4.5k/€7k monthly-net inversions, annualisation, supported endpoints, a deterministic inverse sweep and invalid inputs. Passing tests establish implementation consistency with this disclosed model; they do not substitute for legal verification.
