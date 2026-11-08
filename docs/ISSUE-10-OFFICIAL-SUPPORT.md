# Programa Regressar — official support handoff

The support route helps a visitor reach the appropriate institution with useful questions. It is not an official advisor directory, appointment booking, first-party referral service or confirmed government partnership.

## Implementation brief

1. **Feel:** someone has made the next practical step clear.
2. **Hero:** one primary route to Programa Regressar; employment support and tax confirmation wait below it.
3. **Arrival:** explain the programme before introducing a calculator. An enquiry can be prepared without entering salary.
4. **Next question:** “Who can help me prepare my return?” Name the institution’s role and open its own website for its published contact channels.
5. **One more thing:** give the visitor three questions to take with them, without exporting financial details.

Build an independent, programme-first return journey. Keep the user in control: understand the scope, inspect the conditions, estimate income if useful, then prepare an enquiry and choose an official channel. Never invent advisors, email addresses, phone numbers, appointments, eligibility or response times. Do not send anything automatically.

## Sources and limits

The module centralizes three established institutional origins:

| Route | Origin | Role |
| --- | --- | --- |
| Programa Regressar | https://www.programaregressar.gov.pt/ | Programme information and guidance to the appropriate official service |
| IEFP | https://www.iefp.pt/ | Employment and return-support information, distinct from tax relief |
| Autoridade Tributária | https://www.portaldasfinancas.gov.pt/ | Confirmation of individual tax conditions and CIRS article 12-A |

These are **institutional root URLs**, not newly verified direct contact endpoints. The execution environment still blocks these domains; network-configuration draft saving could not be confirmed by the parent workflow. No current named advisors, direct contact details, availability, response times or bookings were established. A targeted repository search found no reusable current programme phone/email evidence. Labels say “Contacts on the official website” and explain that the visitor must choose the institution’s Contacts section. They must not imply a one-click live connection to a person.

The institution maintains its own channels. If access becomes available, verify any direct contact endpoint and update this central module with its source and actual check date before promoting it as a verified direct channel. Do not silently replace the root with a guessed `/contactos/` path.

## Local preparation and privacy

`buildReturnBrief({lang,countryName?,returnYear?})` creates plain text in Portuguese, English or French. It asks which service can help, which conditions/deadlines to confirm, and how to prepare/request guidance. A declared country label and year are optional context. Legacy and future years remain neutral context, never an eligibility assertion. The parent integration leaves country blank until the visitor actually declares it, rather than treating an edition default as a personal answer.

Salary, budget, tax-screening answers, contact identifiers and documents are not accepted input fields. Extra financial fields from an untyped caller are ignored. Country labels reject financial amounts, identifiers and line-break injection. The builder performs no network request, storage, auto-send, clipboard operation or DOM mutation. The caller copies only on an explicit user action and retains a manual selection fallback when clipboard access is unavailable. The prepared text is read-only in the tool; visitors can adapt it after pasting into their chosen official channel. The copy makes this sequence explicit.

No contact messages were sent, no contact records were scraped and no personal data was stored in this work.

## Validation

Run from `site/`:

```sh
node --import tsx scripts/test-regressar-support.mjs
```

Seven contracts passed: exact official HTTPS roots and explicit verification scope, copy parity, neutral three-question templates, optional year/country behavior, financial-field exclusion, label-injection rejection and input/URL immutability. Browser integration and actual user-initiated clipboard behavior are verified by the parent workflow; these module tests do not establish institutional availability or legal eligibility.
