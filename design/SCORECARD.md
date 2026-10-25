# Quality scorecard

Generated 2026-10-25 by `node scripts/scorecard.mjs` (prompt 15 §5) on the built site. Pages: home, faq, sims, cost, map, place, partners, buy, blog, how in each language (PT on the .lu edition, EN on .us, FR on .fr).

Thresholds: zero LanguageTool errors on headings and buttons; readability 60+ (Flesch EN, Fernandes PT, Kandel-Moles FR) and sentences under 20 words on average; no banned words, em-dashes or question headings; zero serious axe issues; Lighthouse mobile 95+ in all four categories; parity across languages.

## PT

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /pt/lu/ | 75 | 12.2 | 0 | 2 (PT_BARBARISMS_REPLACE_EMAIL: "email"; SI_UNITS_EXPONENT: "T2") | 5 | 0 | 3 |
| /pt/lu/perguntas-frequentes/ | 75 | 12.4 | 1 | 15 (DEPOIS_DE_APÓS: "Depois de"; ATRAVES_DE_POR_VIA: "através de"; DEPOIS_DE_APÓS: "Depois de") | 2 | 0 | 4 |
| /pt/lu/simuladores/ | 72 | 12.8 | 0 | 0 | 1 | 0 | 0 |
| /pt/lu/simuladores/custo-total/ | 72 | 10.9 | 0 | 0 | 1 | 0 | 0 |
| /pt/lu/mapa/ | 75 | 8.2 | 0 | 0 | 1 | 0 | 0 |
| /pt/lu/mapa/porto/ | 73 | 11.3 | 0 | 0 | 1 | 0 | 0 |
| /pt/lu/parceiros/ | 56 | 13.4 | 0 | 7 (PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter") | 1 | 0 | 0 |
| /pt/lu/comprar/ | 59 | 10.1 | 0 | 0 | 1 | 0 | 0 |
| /pt/lu/blog/ | 80 | 10.5 | 0 | 0 | 2 | 0 | 0 |
| /pt/lu/como-trabalhamos/ | 57 | 11.5 | 0 | 5 (SIMPLIFICAR_CONVERTER_PARA_VERBO_INFINITIVO: "para que perceba"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_EMAIL: "email") | 1 | 0 | 1 |

## EN

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /en/us/ | 68 | 12.8 | 2 | 7 (CURRENCY: "18,375 €"; CURRENCY: "1,960 €"; CURRENCY: "375 €") | 5 | 0 | n/a |
| /en/us/faq/ | 74 | 13 | 0 | 23 (MISSING_COMMA_AFTER_YEAR: "2026"; CURRENCY: "150 €"; CURRENCY: "375 €") | 2 | 0 | n/a |
| /en/us/calculators/ | 73 | 12.3 | 0 | 0 | 1 | 0 | n/a |
| /en/us/calculators/total-cost/ | 77 | 10.9 | 0 | 2 (CURRENCY: "150 €"; EN_UNPAIRED_BRACKETS: ")") | 2 | 0 | n/a |
| /en/us/map/ | 69 | 8.3 | 0 | 2 (CURRENCY: "2,264 €"; CURRENCY: "500,000 €") | 1 | 0 | n/a |
| /en/us/map/porto/ | 72 | 11.7 | 0 | 12 (CURRENCY: "3,631 €"; CURRENCY: "2,264 €"; CURRENCY: "300,000 €") | 1 | 0 | n/a |
| /en/us/partners/ | 58 | 12.3 | 0 | 18 (MISSING_COMMA_AFTER_YEAR: "2026"; CURRENCY: "1,800 €"; CURRENCY: "4,800 €") | 1 | 0 | n/a |
| /en/us/buy/ | 62 | 10.6 | 0 | 0 | 1 | 0 | n/a |
| /en/us/blog/ | 65 | 9.3 | 0 | 0 | 1 | 0 | n/a |
| /en/us/how-we-work/ | 55 | 11.2 | 0 | 1 (COMMA_COMPOUND_SENTENCE: " and") | 1 | 0 | n/a |

## FR

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /fr/fr/ | 79 | 12.1 | 0 | 6 (grammalecte_typo_parenthèse_fermante_collée: "n"; grammalecte_typo_parenthèse_fermante_collée: "o"; grammalecte_typo_parenthèse_fermante_collée: "i") | 3 | 0 | 1 |
| /fr/fr/questions-frequentes/ | 77 | 12.1 | 0 | 13 (FR_REPEATEDWORDS_SAUF: "sauf"; ESPACE_UNITES: "€.415"; IL_FAUT: "Mieux vaut") | 2 | 0 | 1 |
| /fr/fr/simulateurs/ | 77 | 13 | 1 | 0 | 1 | 0 | 0 |
| /fr/fr/simulateurs/cout-total/ | 89 | 11 | 0 | 0 | 2 | 0 | 0 |
| /fr/fr/carte/ | 85 | 8.3 | 1 | 2 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "Po"; OU_LEQUEL: "où") | 1 | 0 | 0 |
| /fr/fr/carte/porto/ | 85 | 12 | 0 | 1 (OU_LEQUEL: "où") | 1 | 0 | 0 |
| /fr/fr/partenaires/ | 70 | 13.7 | 0 | 6 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er") | 1 | 0 | 0 |
| /fr/fr/acheter/ | 59 | 10.1 | 0 | 0 | 1 | 0 | 0 |
| /fr/fr/blog/ | 74 | 10.5 | 0 | 0 | 1 | 0 | 0 |
| /fr/fr/notre-methode/ | 59 | 11.1 | 0 | 2 (FR_MULTITOKEN_SPELLING_HYPHEN: "Decreto-Lei"; ON_VERBE: "borrower") | 1 | 0 | 1 |

## Lighthouse (mobile)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| pt /pt/lu/ | - | - | - | - |
| pt /pt/lu/perguntas-frequentes/ | - | - | - | - |
| pt /pt/lu/simuladores/custo-total/ | - | - | - | - |
| pt /pt/lu/mapa/ | - | - | - | - |
| en /en/us/ | - | - | - | - |
| en /en/us/faq/ | - | - | - | - |
| en /en/us/calculators/total-cost/ | - | - | - | - |
| en /en/us/map/ | - | - | - | - |
| fr /fr/fr/ | - | - | - | - |
| fr /fr/fr/questions-frequentes/ | - | - | - | - |
| fr /fr/fr/simulateurs/cout-total/ | - | - | - | - |
| fr /fr/fr/carte/ | - | - | - | - |

## Parity

ok

## Result

- pt /pt/lu/: voice: todos os agostos, tratada de fora, o pre[çc]o [ée] o in[ií]cio, \bpor cima\b, \bquem compra\b
- pt /pt/lu/perguntas-frequentes/: grammar in headings/buttons: DEPOIS_DE_APÓS: "Depois de" · voice: tratada de fora, \bquem compra\b
- pt /pt/lu/simuladores/: voice: tratada de fora
- pt /pt/lu/simuladores/custo-total/: voice: tratada de fora
- pt /pt/lu/mapa/: voice: tratada de fora
- pt /pt/lu/mapa/porto/: voice: tratada de fora
- pt /pt/lu/parceiros/: readability 56 · voice: tratada de fora
- pt /pt/lu/comprar/: readability 59 · voice: tratada de fora
- pt /pt/lu/blog/: voice: tratada de fora, \bquem compra\b
- pt /pt/lu/como-trabalhamos/: readability 57 · voice: tratada de fora
- en /en/us/: grammar in headings/buttons: CURRENCY: "245,000 €"; CURRENCY: "20,710 €" · voice: the price is (just )?the start, \bon top of the price\b, \bon top, , \ba buyer who\b, home from abroad
- en /en/us/faq/: voice: \bon top of the price\b, home from abroad
- en /en/us/calculators/: voice: home from abroad
- en /en/us/calculators/total-cost/: voice: \bon top of the price\b, home from abroad
- en /en/us/map/: voice: home from abroad
- en /en/us/map/porto/: voice: home from abroad
- en /en/us/partners/: readability 58 · voice: home from abroad
- en /en/us/buy/: voice: home from abroad
- en /en/us/blog/: voice: home from abroad
- en /en/us/how-we-work/: readability 55 · voice: home from abroad
- fr /fr/fr/: voice: le prix n'est qu'un d[ée]but, \ben plus du prix\b, maison depuis l'[ée]tranger
- fr /fr/fr/questions-frequentes/: voice: \ben plus du prix\b, maison depuis l'[ée]tranger
- fr /fr/fr/simulateurs/: grammar in headings/buttons: POINT: "acheter" · voice: maison depuis l'[ée]tranger
- fr /fr/fr/simulateurs/cout-total/: voice: \ben plus du prix\b, maison depuis l'[ée]tranger
- fr /fr/fr/carte/: grammar in headings/buttons: NORD_SUD: "Nord" · voice: maison depuis l'[ée]tranger
- fr /fr/fr/carte/porto/: voice: maison depuis l'[ée]tranger
- fr /fr/fr/partenaires/: voice: maison depuis l'[ée]tranger
- fr /fr/fr/acheter/: readability 59 · voice: maison depuis l'[ée]tranger
- fr /fr/fr/blog/: voice: maison depuis l'[ée]tranger
- fr /fr/fr/notre-methode/: readability 59 · voice: maison depuis l'[ée]tranger
- pt /pt/lu/: Lighthouse did not run
- pt /pt/lu/perguntas-frequentes/: Lighthouse did not run
- pt /pt/lu/simuladores/custo-total/: Lighthouse did not run
- pt /pt/lu/mapa/: Lighthouse did not run
- en /en/us/: Lighthouse did not run
- en /en/us/faq/: Lighthouse did not run
- en /en/us/calculators/total-cost/: Lighthouse did not run
- en /en/us/map/: Lighthouse did not run
- fr /fr/fr/: Lighthouse did not run
- fr /fr/fr/questions-frequentes/: Lighthouse did not run
- fr /fr/fr/simulateurs/cout-total/: Lighthouse did not run
- fr /fr/fr/carte/: Lighthouse did not run
