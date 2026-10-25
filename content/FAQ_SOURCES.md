# Where the FAQ questions come from (prompt 09)

Researched on 25 Oct 2026. Every answer comes from content/facts/facts.csv; this file records why each **question** is in the FAQ and in what order.

## How the ranking was made

Prompt 09 asks for Google "People also ask", autocomplete, Google Trends, and diaspora Facebook groups and Reddit. From this environment:

1. **Google search, autocomplete and Trends:** blocked (google.com, suggestqueries.google.com and trends.google.com refuse the connection).
2. **Reddit (r/PortugalExpats, r/portugal):** blocked; web search returned no Reddit threads.
3. **Facebook groups:** need a login; not opened.
4. **Used instead:** web search (US index) in the language of each audience, read for the questions that guides, forums (expat.com, Fórum da Casa, Routard) and Q&A pages ask again and again.

So `rank` orders questions by **how many independent sources raised them** in those searches, not by measured search volume. Daniel or the operator can check the order in Google Trends and "People also ask" (5 minutes per edition) and change `rank` in the YAML files; the site re-sorts on the next build.

## Searches run

| Audience | Query |
| --- | --- |
| USA | buying property in Portugal as an American frequently asked questions |
| All, EN | reddit PortugalExpats buying a house questions non-resident mortgage NIF lawyer |
| All, EN | "Portugal" buying a house reddit expats closing costs IMT stamp duty lawyer fees mortgage non resident |
| All, EN | Portugal capital gains tax selling property non-resident 50% questions |
| USA | FBAR Portugal property American do I need to report house abroad IRS |
| LU, FR, CH (PT) | emigrante comprar casa em Portugal dúvidas IMT crédito habitação |
| LU (PT) | emigrante no Luxemburgo comprar casa em Portugal impostos crédito |
| FR (FR) | acheter une maison au Portugal depuis la France questions fréquentes impôts frais de notaire |
| FR (FR) | acheter au Portugal non résident crédit immobilier banque portugaise apport |
| CH (FR) | 2e pilier achat résidence principale Portugal retrait LPP questions |
| BR (PT) | brasileiro comprar imóvel em Portugal perguntas frequentes |
| IL (EN) | Israelis buying property in Portugal questions tax |

## Questions and evidence

| Rank | Question (key) | Stage | Raised by (examples) |
| --- | --- | --- | --- |
| 1 | Can I buy if I live abroad? (buy-abroad) | Before | taxesforexpats.com, brighttax.com, mcs.pt, immoabroad.com, terms.law, doutorfinancas.pt, deco.proteste.pt |
| 2 | What does buying cost besides the price? (costs) | Before | idealista.pt/en "real cost", portugalist.com, expat.com/fr "frais d'achat", propertyguides.com, tagusproperty.com |
| 3 | Can I get a mortgage as a non-resident? (mortgage) | Before | idealista.pt "crédito para emigrantes", cofidis.pt, deco.proteste.pt, theportugalnews.com, comparamais.pt |
| 3.5–3.6 | CH: 2nd pillar for a home in Portugal, conditions (ch-2p, ch-2p-rules) | Before | ibani.com (two guides), hellosafe.ch |
| 4 | How do I get a NIF? (nif) | Before | brighttax.com, cgd.pt buyers guide, expat.com/fr |
| 5 | Do non-residents pay more IMT? (imt-nonres) | Buying | idealista.pt/en, portugalist.com, forumdacasa.com |
| 5.5 | How much do the deed and registration cost? (deed), added in prompt 10 | Buying | cidadaniaevisto.com.br, wise.com, remitly.com, expat.com/fr (design/v2/BENCHMARK.md) |
| 6 | BR, US, IL: Does buying let me live in Portugal? Golden Visa (visa) | Before | brighttax.com, mcs.pt, eurodicas.com.br, haaretz.com, idealista.pt (vistos gold) |
| 7 | Do I need a lawyer? (lawyer) | Buying | brighttax.com, rightmove.co.uk, cgd.pt, immoabroad.com |
| 8 | What taxes every year? (yearly) | After | propertyguides.com, expat.com/fr "coût foncier annuel", blevinsfranks.com |
| 8.5 | FR: declare account and home in France (fr-declare); BR: IRPF (br-irpf); US: FBAR / Form 8938 (us-report) | After | expat.com/fr; eurodicas.com.br; portugalvisitor.com, goldinglawyers.com, onlinetaxman.com |
| 9 | Can I rent it out? (rent) | After | brighttax.com, taxesforexpats.com |
| 9.5 | LU: rent declared in Luxembourg (lu-rent); IL: rent taxed in Israel (il-rent) | After | doutorfinancas.pt (LU emigrants); sovereigngroup.com, blevinsfranks.com |
| 10 | How much tax when I sell? (sell) | After | sovereigngroup.com, mcs.pt, idealista.pt/en (two articles), youroverseashome.com |
| 10.5 | US: sale taxed in the US (us-sale) | After | wise.com/us blog, goldinglawyers.com |
| 10.8 | BR, US, IL: special tax regime for people moving to Portugal (ifici), added in prompt 10 | After | letemps.ch, expat.com/fr ("fin de mon RNH"), remitly.com |
| 11 | How much will a bank lend me? (borrow) | Before | deco.proteste.pt, idealista.pt, galivel.com |
| 11.5 | CH: pillar 3a (ch-3a) | Before | ibani.com |
| 12 | Do I have to be in Portugal to sign? (sign) | Buying | comparamais.pt (procuração), brighttax.com |
| 13 | What is the CPCV? (cpcv) | Buying | engelvoelkers.com buyers check-list, mcs.pt |
| 14 | How do I send the money? (money) | Buying | smartcurrencyexchange.com, brighttax.com, ibani.com (exchange rate) |
| 15 | How is IMT calculated, when is it due? (imt-calc) | Buying | idealista.pt/fr "impôts et taxes", deco.proteste.pt (IMT calculator) |
| 16 | Is now a good time to buy? (timing) | Before | ynetnews.com, condominiosc.com.br, forbespt.com |
| 17 | Can you find me a home? (find) | Before | eurodicas.com.br (buying through an agency) |
| 18 | I inherited a house in Portugal (inherit) | After | content/FAQ.md (CEO master); routard.com forum |

## Asked often but not answered yet

Updated in prompt 10: the Golden Visa (Lei 56/2023, art. 42.º) and the deed and registration costs (Casa Pronta, justica.gov.pt) are now verified and answered. Still open (content/faq/UNVERIFIED.md):

1. Whether a Portuguese bank account is required.
2. How long a purchase takes.
3. Average prices by city, agency fees, usual deposit on the CPCV, usual down payment for non-residents.
4. Citizenship (including the Sephardic route) and the emigrant account ("conta emigrante").
