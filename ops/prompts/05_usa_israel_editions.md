# Prompt 05 — Add the USA and Israel editions for the 1 Dec launch

To run: in Claude Code, type "Read ops/prompts/05_usa_israel_editions.md and apply it to the work in progress." It changes the scope of prompts 02, 03 and 04; it is not a separate project.

---

## Decision (D10, revised 24 Oct 2026)

Six editions launch together on Tue 1 Dec 2026: Luxembourg, France, Switzerland, Brazil, **USA** and **Israel**. Both new editions are in English (US spelling). Hebrew for Israel comes later, only when a sponsor pays for a professional translator. D13: the sites stay under the Imóveis Portugal brand on country domains (for example imoveisportugal.us and an Israeli domain); social accounts are named "Portugal Home Guides". Build with the edition codes `us` and `il` and keep domains in config.

Also apply to all prompts: the Switzerland edition is bilingual, Portuguese and French.

## Who reads them and what they need

| Edition | Reader | Topics that make the edition useful |
| --- | --- | --- |
| USA | Americans buying a home or second home in Portugal: retirees, remote workers, investors | Total purchase costs; financing (Portuguese mortgages for non-residents, since US lenders rarely lend on property abroad); USD to EUR transfers; residency routes used by Americans (for example D7 and digital nomad visas); how the US taxes property abroad and the reporting it triggers (for example FBAR and FATCA); the Portugal–US tax treaty |
| Israel | Israelis buying to invest or relocate | Total purchase costs; financing; ILS to EUR transfers; how Israel taxes residents' property abroad; the Portugal–Israel tax treaty; the Israeli-backed developments in Greater Porto and elsewhere (as sponsors, not as editorial endorsement) |

Every fact follows content/EDITORIAL_POLICY.md: primary sources (IRS, FinCEN, US State Department; Israel Tax Authority; Portuguese official sources), traceable in content/facts/facts.csv, no advice, English disclaimer.

## Changes to each prompt

1. **Prompt 02 (site, media kits, outreach):** add `us` and `il` to the site (i18n, routes, hreflang en-US and en-IL, edition switcher), with the same pages as the other editions. The three design directions must work in English too. Add an English media kit. Outreach drafts for US and Israeli sponsors come from prompt 03.
2. **Prompt 03 (international sponsors):** the research now feeds editions that launch on 1 Dec, so prioritise it. Remove the guardrail "do not build the USA or Israel editions yet". Sponsors for these editions: US- and Israeli-backed developers, relocation and residency firms, FX providers serving USD and ILS, international tax firms for Americans and Israelis abroad, Portuguese banks lending to non-residents. No agencies (D9), no Russia (D11).
3. **Prompt 04 (e-books):** add e-book 1 in English ("What buying a home in Portugal really costs"), plus "Buying in Portugal as an American" and "Buying in Portugal from Israel". Add US and Israel home-country facts to facts.csv.
4. **config.ts:** add newsletter, sponsor and buyer form slots for `us` and `il`; add `domain` placeholders for both.

## Guardrails

1. The four existing editions must not slip because of the two new ones. If something has to give before 1 Dec, tell the operator what and why; do not decide alone.
2. Same approval rule: nothing published, sent, deployed or merged without Daniel's explicit approval.
