# Claude Code — rebuild the sponsor list and the plan from scratch

To run: in Claude Code, plan mode, type "Read ops/prompts/01_rebuild_sponsors_and_plan.md and execute it."

---

You are the CTO. Read CLAUDE.md, ops/TASKS.md, ops/DECISIONS.md and sponsors/ first.

The current sponsor list (sponsors/Sponsors_v1.xlsx) is a first draft: 100 names, too many large corporates with long sales cycles, and no proof that any of them spends money on our audience. Rebuild it from scratch using one principle: **follow the money**. A good sponsor is a business we can prove already pays to reach Portuguese emigrants in Luxembourg, France or Switzerland, or Brazilians buying in Portugal.

## Part 1 — Sponsor research

### Evidence sources, in order of value

1. **Meta Ad Library.** Advertisers running ads in Portuguese or French, targeting LU, FR, CH or BR, about buying property in Portugal, mortgages for non-residents, moving back, renovation or visas. Use the API if the operator gives you a token. If not, give the operator a list of ready-made search URLs to check by hand, and a CSV template to paste results into.
2. **Emigrant property fairs.** Exhibitor lists of property and "return to Portugal" fairs in Paris, Luxembourg and Switzerland, and of fairs for Brazilians about Portugal. Every exhibitor has proven budget.
3. **Diaspora media.** Advertisers in Contacto and Rádio Latina (LU), LusoJornal and Cap Magellan (FR), Portuguese media in Switzerland, and Brazilian sites about living in Portugal.
4. **Search ads.** Who bids on searches like "comprar casa em Portugal emigrante", "crédit immobilier Portugal non-résident", "levantar 2.º pilar comprar casa Portugal" and "visto D7 comprar imóvel".
5. **Regions emigrants come from.** Minho, Trás-os-Montes and the Beiras: builders, kitchen and furniture makers (Paços de Ferreira), solar installers, solicitadores and small agencies that already serve emigrants.
6. **Chambers of commerce.** Member directories of Portugal–Luxembourg, Franco-Portuguese and Swiss-Portuguese chambers.

### Output

1. Create sponsors/pipeline.csv with these columns:

   id, company, sector, edition, tier, evidence_url, evidence_note, decision_maker_role, contact_channel, offer_type, est_deal_value_eur, close_probability, expected_value_eur, priority_score, status, next_action, next_action_date, owner

   - **tier:** A = proven spend on our audience; B = serves emigrants or Brazilian buyers, no proof of spend yet; C = large corporate, long cycle.
   - **offer_type:** pay-per-lead, founding partner, campaign, affiliate, or barter (content swap).
   - **expected_value_eur** = est_deal_value_eur × close_probability.
   - **priority_score:** higher for tier A, faster cycle, and higher expected value.

2. Sizing: at least 150 rows, at least 60% tier A or B, and every tier A row with an evidence URL. Move tier C rows to a "later" tab.

3. Contacts: company-level or published business contacts only, with the source noted. No guessed personal emails.

4. Create sponsors/Sponsors_v2.xlsx from the CSV:
   - formulas for expected value;
   - pipeline totals by edition, sector and tier;
   - a status dropdown;
   - a "This week's 40" tab, sorted by priority score.

5. Write sponsors/METHOD.md explaining how the list was built, so it can be refreshed monthly.

## Part 2 — Rebuild the plan as a 90-day cash plan

1. Write ops/PLAN.md, version 2:
   - weekly cash and signal targets for 90 days;
   - the offer ladder, from fastest to slowest money: paid calls, pay-per-lead pilots, founding partners, campaigns, annual Gold;
   - a channel plan per edition, including emigrant Facebook groups, short video, and the August and Christmas peaks;
   - the 10 riskiest assumptions, each with a cheap test.

2. All four editions launch on the same day (decided, see ops/DECISIONS.md). Plan for that.
3. Wherever version 2 departs from the current plan (pricing, channel choice, site or social structure), do **not** change it yourself. Add a "Decision for Daniel" task to ops/TASKS.md with the options and the € impact of each.

## Part 3 — Sprint 0: first cash within 14 days (before the full site)

1. One sponsor offer page per edition: offer, prices, a founding-partner counter, and a booking button.
2. Booking with Cal.com (free tier).
3. Payment links for paid calls and founding partner packages. Stripe Payment Links have no monthly fee, only per-transaction fees.
4. A buyer lead form that sends leads to the partner agency's inbox the same day.
5. A tracking sheet for calls booked, deals and cash received, feeding ops/METRICS.md.

Payments and invoices need the billing entity decision first. If it is still open, add it to TASKS.md as blocking, with owner Daniel.

## Rules

1. Show the plan first and wait for approval.
2. Every claim about a company needs a source URL.
3. Follow the hard rules in CLAUDE.md: anonymity, human approval, no personal data, GDPR, free tier first.
4. End the session with a summary in ops/TASKS.md under "Last session": rows by tier, top 10 by expected value, and the decisions waiting for Daniel.
