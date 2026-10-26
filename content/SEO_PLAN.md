# SEO plan (prompt 15 §3)

Researched 25 Oct 2026 from the build environment. Google autocomplete, "People also ask", Trends, AlsoAsked, AnswerThePublic and Reddit are blocked from here (content/FAQ_SOURCES.md), so the map below comes from the web-search research behind the FAQ ranking (prompt 09) and the reader questions in content/TOPICS.md. **Task 15b:** the operator checks each cluster's head term in Google Trends and "People also ask" per country and reorders clusters by volume.

## Keyword map: 7 clusters, one pillar each

Each cluster has one pillar page, supporting articles (content/blog/), its calculator and its partner. Head terms per language; the long tail is the FAQ questions in that cluster.

| Cluster | Head terms PT · EN · FR | Pillar page | Calculator | Partner |
| --- | --- | --- | --- | --- |
| **Costs** | quanto custa comprar casa em portugal, impostos compra casa · cost of buying property in Portugal, closing costs Portugal · frais d'achat Portugal, frais de notaire Portugal | Guide (e-book page) | Custo total, IMT e imposto do selo | Agency |
| **Process** | comprar casa em portugal a partir do estrangeiro, procuração compra casa · buying a house in Portugal from abroad, power of attorney Portugal · acheter au Portugal à distance, procuration Portugal | One-stop page (prompt 17 name) | Plano de compra (paid, when live) | Agency, lawyer |
| **Tax** | IMT não residentes 7,5%, IMI, mais-valias não residentes · Portugal property tax non-resident, capital gains Portugal non-resident · impôts Portugal non-résident, plus-value Portugal | FAQ (tax section) | IMI, Mais-valias, Rendimento do arrendamento | Tax adviser |
| **Mortgage** | crédito habitação não residente, emigrante crédito habitação · mortgage in Portugal for non-residents · crédit immobilier Portugal non-résident | Calculators page | Prestação, Que casa consigo comprar, Taxa de esforço | Credit partner, bank |
| **Places** | comprar casa no Porto, preço m2 Gondomar, comprar casa Braga · buying a home in Porto, house prices Portugal by region · acheter à Porto, prix m2 Portugal | Map page | Map + cost calculator prefilled | Agency, developers |
| **Inheritance** | herdar casa em portugal emigrante, habilitação de herdeiros · inheriting a house in Portugal · hériter d'une maison au Portugal | FAQ (after buying) | none | Lawyer |
| **Returning home** | regressar a portugal impostos, programa regressar IRS · moving back to Portugal tax · retour au Portugal impôts | Blog article (to write) | Que casa consigo comprar | Tax adviser |
| **Residence, tax and inheritance (high budgets, D52: never labelled by budget)** | IFICI, residência para investimento fundos · Portugal investment residence funds, IFICI tax regime · résidence Portugal investissement, IFICI | Private section (prompt 18) | Mais-valias, Custo total | Wealth Partners |

## Programmatic pages (built)

"Comprar casa em [concelho]" for 30 municipalities, North and Centre first: `/pt/lu/mapa/porto/` (and every edition and language). Each page: INE median price per m² for five quarters with the change in a year, what 300 k€ to 10 M€ buy there, the IMI range, the cost calculator prefilled for a 100 m² home at the median price, the partner agency, links to the other 29 places, BreadcrumbList data. Only municipalities with an INE figure. **Task 15c:** add each municipality's IMI rate from the AT table "Taxas IMI/CA por Município e Ano" (the service returned "technical reasons, try later" from here).

First five to review: Porto, Vila Nova de Gaia, Braga, Gondomar, Lisboa.

## Technical (done)

1. Schema: Organization (home), FAQPage (FAQ), Article and BreadcrumbList (blog), BreadcrumbList (municipality pages). HowTo goes on the one-stop page once its steps are final (prompt 17).
2. hreflang in all three languages (D24); one sitemap per edition domain, now with the calculators and the 30 municipality pages.
3. Internal links: every article links to the FAQ, the calculators and the map, plus its partner and related articles; every municipality page links to its calculator, the agency and the other places.
4. `llms.txt` at the root; answers start with the short answer, then the rule and its source.

## Content rhythm

One article per real question per week and language (content/PLAN_DF.md), each linked to its pillar, calculator and FAQ answer.
