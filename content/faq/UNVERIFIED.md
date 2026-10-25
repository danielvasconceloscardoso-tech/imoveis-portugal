# FAQ items not verified (for Daniel)

Checked on 24 Oct 2026. Everything published on the FAQ pages comes from `content/facts/facts.csv`. The items below were left out, or kept narrower than in content/FAQ.md, because no primary source could be opened.

## Questions left out

| Edition | Question | Why | What would settle it |
| --- | --- | --- | --- |
| LU | Can a Luxembourg bank finance a home in Portugal? | Bank practice, not a rule: no official source | Written answer from a sponsor bank, published as a labelled sponsor answer |
| FR | Succession d'un bien au Portugal : quelle loi s'applique ? | EUR-Lex (Regulation 650/2012, arts. 21–22) and notaires.fr refuse automated access | Daniel opens https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32012R0650 and confirms arts. 21 and 22 |
| IL | Can I finance a Portuguese home from Israel? | Bank practice, not a rule: no official source | Written answer from a sponsor bank |

## Answers kept narrower than the master

1. **Non-resident IMT at 7.5% (all editions, question 2).** The law is verified (CIMT art. 17.º n.º 10, Decreto-Lei 97/2026). Two points need Daniel:
   - **Start date.** The decree has no specific entry-into-force rule for this change, so the general five-day rule gives 25 May 2026. The FAQ says "since May 2026".
   - **Exception (a).** It applies to a buyer who "tenha sido considerado residente para efeitos fiscais em território nacional". If this covers anyone who was ever a Portuguese tax resident, most emigrant readers in LU, FR and CH would not pay the 7.5%. The FAQ quotes only exception (b), becoming resident within two years, until this is confirmed.
2. **France, question 1 (declaring the property in France).** The duty to declare foreign accounts (form 3916) is verified (BOFiP). How France treats Portuguese rental income under the treaty as amended in 2016 (exemption or tax credit) could not be checked: impots.gouv.fr was in maintenance, and the BOFiP commentary found dates from 2012. The answer says only that the treaty decides it.
3. **Mortgages (question 3).** The master said non-residents usually get a lower share of the price. No official source says so. The answer quotes only Banco de Portugal's limits (90% own home, 80% other purposes), which apply to everyone.
4. **CPCV deposit (question 5).** The "usual deposit range" is practice, not law, so it was dropped. Article 442 of the Civil Code is quoted.
5. **AIMI (question 6).** The 600 000 € deduction is verified, but the rates are not quoted (CIMI art. 135.º-F not yet checked).
6. **Rental tax (question 7).** The 25% rate is verified (CIRS art. 72.º). The new special regimes in Decreto-Lei 97/2026 for capped rents are not quoted until Daniel confirms them.
7. **Israel (question 1).** Only the treaty level is stated. gov.il refuses automated access, so Israel's own rules on foreign rental income are not quoted.

## Sources that refuse automated access

bportugal.pt (used the Banco de Portugal notification published by the ESRB instead), eur-lex.europa.eu, e-justice.europa.eu, notaires.fr, gov.il, legifrance.gouv.fr. impots.gouv.fr was in maintenance on 24 Oct 2026; try again later.

## Redesign v2 (prompt 09, 25 Oct 2026)

1. **FAQ ranking.** Google search, autocomplete, Trends and Reddit are blocked here, so `rank` follows how often a question came up in web search results (content/FAQ_SOURCES.md), not measured search volume. Check it in Google Trends and "People also ask".
2. **Golden Visa and property (Lei 56/2023).** Asked very often (BR, US, IL). The law's text on diariodarepublica.pt did not load, so the answer describes only the verified visas (D7, CPLP) and sends the reader to a lawyer.
3. **Notary, registration and Casa Pronta fees.** justica.gov.pt returned an error; costs are described as "depend on the service chosen".
4. **Capital gains rate for non-residents.** Only the 50% rule (CIRS art. 43.º) is quoted. The rate itself (progressive rates, worldwide income) is not, until art. 68.º and the tax authority's circular are opened.
5. **Partner agency profile.** The text in the report and on the "Talk to a partner" page is Habinedita Gondomar's own statement (prompt 08). The agency must confirm it before launch. Its logo could not be downloaded (habineditagondomar.pt returned 403 and 502), so its name is shown as text.

## Prompt 10 (25 Oct 2026)

1. **Resolved:** Golden Visa and property (Lei 56/2023, art. 42.º, opened on Portal das Finanças) and Casa Pronta fees and documents (justica.gov.pt). Both are now in facts.csv and the FAQ.
2. **New fact:** IFICI (EBF art. 58.º-A), answered for BR, US and IL readers. The list of eligible professions (Portaria 352/2024/1) is not quoted.
3. **Benchmark questions still without an official source:** bank account requirement, purchase timeline, average prices by city, agency fees, usual CPCV deposit, citizenship, emigrant account. See design/v2/BENCHMARK.md.
4. **Questions per edition:** the new benchmark questions take some editions to 21–22 questions; the content check now allows 15 to 22.

## Doutor Finanças buying guide (25 Oct 2026)

Daniel asked for the free e-book to cover the topics of https://www.doutorfinancas.pt/vida-e-familia/habitacao/guia-como-comprar-casa-em-portugal/ (May 2024). It is a secondary source, so only items that could be checked in a primary source went in: the FINE and 7-day reflection (DL 74-A/2017, art. 13), insurance and tied sales (art. 11), the Casa Pronta documents and fees, the HPP bracket in CIMT art. 17, and the worked own-capital comparison, which is computed from facts.csv. Left out:

1. **Warranty on new homes (10 years structural, 5 years other).** Press and law-firm notes say this is Decreto-Lei 84/2021 (from 1 Jan 2022). The guide cites the repealed DL 67/2003. The text of DL 84/2021 on diariodarepublica.pt did not load. To settle: open the decree and confirm the periods and the list of structural elements.
2. **Temporary IMI exemption for a main home (EBF art. 46.º).** Found only in a 2016 version of the article and in binding rulings (3 years, VPT up to 125 000 €, 60-day request). The current article did not open on the Finanças portal. To settle: open the current EBF art. 46.º.
3. **Debt-to-income and term limits in the guide (30% / 50%; 40, 37 and 35 years).** Out of date: the guide predates the Banco de Portugal limits applying from 1 Aug 2026 (45%; 40 / 35 years), which facts.csv already holds. Not used.
4. **Bank fees of 600 to 1 000 €, the usual deposit of 10 to 20% in the CPCV, approval times, fixed / variable / mixed rate mechanics, and the 100% financing remark.** Market practice with no official source. Left out (deposit range already excluded, see "CPCV deposit" above).
5. **Search, viewing and fraud tips; documents the bank asks for.** Practical advice with no primary source. Not in the report. If wanted, they fit as a sponsored article by the partner lawyer or agency.
6. **IMT term "habitação própria e permanente".** The CIMT page used does not define it. The report says the tax domicile is the usual proof (CIRS art. 10.º n.º 5, a capital-gains rule). Daniel to confirm with a tax adviser whether a buyer who becomes resident within two years gets the HPP table on the refund.
7. **DL 74-A/2017 text.** Read from the Banco de Portugal copy of the 2017 original; later amendments were not checked.
