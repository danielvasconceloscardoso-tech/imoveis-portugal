# Prompt 03 — International sponsors: foreign-capital developers, chambers and embassies

To run: in Claude Code, plan mode, type "Read ops/prompts/03_international_sponsors.md and execute it."

Run after prompt 02's open items, or in parallel if Daniel says so. Nothing is sent or published (same rule as prompt 02).

---

You are the CTO. Read CLAUDE.md, ops/DECISIONS.md and sponsors/METHOD.md first.

## The idea (Daniel, 24 Oct 2026)

Developers and investors from abroad build in Portugal and sell to buyers from their own countries: Israeli capital in Greater Porto and Gondomar (for example Shalu Investments' O'rizon Living at Marina do Freixo), American, British, Chinese and others. They already pay to reach buyers abroad. They are natural Gold sponsors and campaign buyers. Bilateral chambers of commerce and the economic sections of embassies can introduce us to their member companies.

The money logic: in 2025 buyers with a tax domicile outside the EU paid on average 470,277 € per home, against 234,120 € for residents (INE, via idealista/news). A developer selling ten flats at that price can justify a 4,800 € Gold or a 1,500 € campaign many times over.

## Part 1 — Research the sponsors (follow the money, as in prompt 01)

1. **Foreign-capital developers and investors active in Portugal**, by country of capital: Israel, United States, United Kingdom, China, plus any other country with a clear cluster you find (for example France, Brazil, Turkey, Gulf states). Start with the Israeli-capital names already known: Shalu Investments, Fortera, Taga Urbanic, Youropa / Gaya Capital, Grupo Tamar, Mondego Capital Partners. Earlier research found no Chinese institutional capital in Greater Porto: say so if that still holds and look nationally instead.
2. **Evidence of spend on foreign buyers:** roadshows abroad, ads in their home market, English, Hebrew or Chinese sales pages, international portals, home-country media coverage.
3. **Bilateral chambers of commerce in Portugal** (for example the American, British, Israeli and Chinese chambers): their member directories, sponsorship packages and newsletters. Verify each chamber's exact name and site.
4. **Economic and commercial sections of the embassies in Lisbon** for the same countries: name of the section, public contact, whether they run business networks or newsletters.

## Part 2 — Output

1. Add the developers and investors to sponsors/build/sponsors_v2_data.py with tier A/B/C and evidence URL, a new column `capital_origin`, and rebuild sponsors/Sponsors_v2.xlsx. No agencies (D9).
2. A new tab "Chambers & embassies": organisation, country, what they offer (member newsletter, sponsored content, events), public contact route, evidence URL.
3. sponsors/INTERNATIONAL.md: what you found per country and the size of the opportunity. Decision D10: the next editions are USA and Israel, so go deepest on those two: sponsors, chambers, audience size, and what a US and an Israeli buyer need to know (tax at home, financing, residency).

## Part 3 — Draft outreach (drafts only)

1. Developers: a first email in English (or Portuguese if they are Portuguese-run), offering Gold sponsorship and developer campaigns across our editions, using the evidence in their row.
2. Chambers: an email asking for (a) an introduction in their member newsletter, inviting members to write a sponsored guest post for Imóveis Portugal and to consider a founding Gold sponsorship, and (b) their own sponsorship or partnership options.
3. Embassies: a short, formal email to the economic section asking whether they would share the opportunity with their companies active in Portuguese real estate.
4. Save under sponsors/outreach/international/, same rules as prompt 02 Part C: plain prose, under 140 words, one ask, opt-out line, signature placeholder `[Assinatura]`, no personal emails stored.

## Guardrails

1. **Russia:** do not research, list or contact Russian-capital companies or Russian state bodies. EU sanctions (Council Regulations (EU) 269/2014 and 833/2014) make this a compliance risk; Daniel decides if this ever changes.
2. **Sponsored guest posts** are labelled as sponsored content, always.
3. **Embassies** are approached for introductions only. No request for endorsement, no use of their names or logos on our site or media kit.
4. The USA and Israel editions launch on 1 Dec with the others (D10, revised): see ops/prompts/05_usa_israel_editions.md.
5. Nothing is sent, published or merged without Daniel's explicit approval.
