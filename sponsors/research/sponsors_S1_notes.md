# Sponsor list S1: notes (prompt 54 §4)

Checked 2026-11-02. File: `sponsors/research/sponsors_S1.csv`, 112 companies. Companies only: no personal names, personal emails or phone numbers. Nobody was contacted and no form was submitted.

## Counts per category

| # | Category | Rows | A | B | C |
|---|---|---|---|---|---|
| 1 | Portuguese bank (non-resident / private banking) | 16 | 6 | 6 | 4 |
| 2 | International private bank with Portugal desk | 14 | 5 | 6 | 3 |
| 3 | Mortgage / credit intermediary | 9 | 2 | 4 | 3 |
| 4 | Currency transfer and payments | 13 | 3 | 3 | 7 |
| 5 | Insurer (incl. expat health) | 17 | 4 | 7 | 6 |
| 6 | Law and tax firm | 22 | 6 | 8 | 8 |
| 7 | Relocation, schools, healthcare | 21 | 8 | 7 | 6 |
|   | of which relocation services | 4 | 0 | 1 | 3 |
|   | of which international schools | 12 | 5 | 5 | 2 |
|   | of which private healthcare | 5 | 3 | 1 | 1 |
|   | **Total** | **112** | **34** | **41** | **37** |

Products: partner block 59, series 35, event 11, Apresentado por 7. No row is pitched the Friday weekend item; it fits hotels and restaurants better than these categories.

## Method

- Each contact URL was checked with `curl -sSL -o /dev/null -w "%{http_code} %{url_effective}" -A "Mozilla/5.0" --max-time 25` through the proxy. The CSV holds the final URL after redirects. The page title and text were also checked, so that error pages served with a 200 code were not counted as live. Banco BiG and CGD have such pages, and other paths were chosen for both.
- Size signals come from the company's own site, Wikipedia infoboxes, or press: ECO's insurer ranking for H1 2025, ECO on Luz Saúde and Lusíadas, and Forbes Portugal on Allianz. Each figure was matched against the text of the cited page, except where the row says the page was not opened.
- Priority A means a clear fit, budget, and a calendar slot that is near (December–January, or the school-admissions season). The priorities are a research call, not a pricing or positioning decision.

## Could not verify

- **Contact page blocked (10 rows, 8.9%, under the 10% limit).** These sites return HTTP 403 to scripted requests and are recorded as `blocked`: Banco Carregosa, Bankinter Portugal, Julius Baer, EFG International, Edmond de Rothschild, Revolut, Currencies Direct, PwC Portugal, Blevins Franks and Deutsche Schule Lissabon. Each URL is the usual press or contact path, but it has not been confirmed. Open these in a browser before outreach.
- **Millennium bcp:** the contacts page returns 200, but some requests got empty replies from the server.
- **Weak or unverified size signal (11 rows):** Banco BiG, Banco Invest, BGL BNP Paribas, La Luxembourgeoise, Caiado Guerreiro and Lycée Français International de Porto publish no size figure on the cited source. Poupança no Minuto and Mútuo Valor show only their registrations. CCA Law Firm shows only press visibility. For Banco ATLANTICO Europa and Blevins Franks, the source page blocks scripts and was not opened: the Atlantico claim comes from pipeline row S186 and the Blevins Franks claim from a search result. The Mútuo Valor register page on bportugal.pt also returns 403.
- **Old figures:** Santander Portugal's headcount is from 2017, Spuerkeess from 2019, the DLA Piper revenue from 2022, the Crown group's headcount from 2018 and Luz Saúde's from 2022/23. These were the latest on the cited pages.
- **Portugal desk not confirmed** for Lombard Odier, Quintet and Andbank. The why_fits field says so. Bradesco Europa's site would not resolve, so it was dropped.
- **Decisões e Soluções:** the group also runs a real-estate mediation arm. It is listed for its credit-intermediation arm only and set to priority C. Check it against D9 before any contact.

## Dropped during research (not in the CSV)

- **Merged or absorbed:**
  - Telles: telles.pt now redirects to Deloitte Legal.
  - Degroof Petercam: the 'Resident in Portugal' page redirects to Indosuez, which is now noted in the Indosuez row.
  - HPA Saúde: now part of CUF, noted in the CUF row.
  - British Hospital Lisbon XXI: now part of Luz Saúde.
- **No longer fits:** Banco do Brasil Portugal closed its retail business in 2017, and its clients moved to Banco CTT.
- **Site unreachable or wrong domain:** Gold Credit, Relocationel, United Lisbon International School (bad certificate), Redbridge School, Vilamoura International School, Aspire International School, ING Luxembourg (server errors), J. Safra Sarasin (no contact page found).
- **Blocked, and would have pushed blocked rows over 10%:** TorFX, Ria Money Transfer, Paysend.
- **No verifiable size signal:** Conti Financial Services, Remessa Online, Lusitania Seguros, Brave Generation Academy.

## Overlap with sponsors/pipeline.csv

Many banks, insurers and wealth firms here are already in `pipeline.csv`: CGD, Millennium bcp, Santander, Novobanco, BPI, Montepio, Crédito Agrícola, ABANCA, Banque BCP, ATLANTICO, Indosuez, UBP, Julius Baer, Lombard Odier, EFG, Edmond de Rothschild, BTG, VdA, PLMJ, Fidelidade, Wise, Revolut, ComparaJá and others. Deduplicate on merge. Under CLAUDE.md rule 13, pipeline.csv remains the source of truth for companies it already holds.
