# Quality scorecard

Generated 2026-10-26 by `node scripts/scorecard.mjs` (prompt 15 §5) on the built site. Pages: home, faq, sims, cost, map, place, partners, buy, blog, how, private, step, path in each language (PT on the .lu edition, EN on .us, FR on .fr).

Thresholds: zero LanguageTool errors on headings and buttons; readability 60+ (Flesch EN, Fernandes PT, Kandel-Moles FR) and sentences under 20 words on average; no banned words, em-dashes or question headings; zero serious axe issues; Lighthouse mobile 95+ in all four categories; parity across languages.

## PT

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /pt/lu/ | 68 | 10.7 | 0 | 1 (VIR_A_VERBO_VERBO: "vier a ser") | 0 | 0 | 1 |
| /pt/lu/perguntas-frequentes/ | 73 | 11.2 | 0 | 10 (ATRAVES_DE_POR_VIA: "através de"; DEPOIS_DE_APÓS: "Depois de"; GENERAL_VERB_AGREEMENT_ERRORS: "os seus créditos não deve") | 0 | 0 | 4 |
| /pt/lu/simuladores/ | 70 | 12.4 | 0 | 0 | 0 | 0 | 0 |
| /pt/lu/simuladores/custo-total/ | 77 | 9.3 | 0 | 0 | 0 | 0 | 1 |
| /pt/lu/mapa/ | 69 | 9.4 | 0 | 0 | 0 | 0 | 0 |
| /pt/lu/mapa/porto/ | 61 | 9.3 | 0 | 1 (PORTUGUESE_WORD_REPEAT_BEGINNING_RULE: "Lugar") | 0 | 0 | 0 |
| /pt/lu/parceiros/ | 60 | 9.6 | 0 | 3 (ESPACO_APOS_PONTO: ".Falemos"; PORTUGUESE_WORD_REPEAT_BEGINNING_RULE: "Para"; PORTUGUESE_WORD_REPEAT_BEGINNING_RULE: "Para") | 0 | 0 | 0 |
| /pt/lu/comprar/ | 66 | 7.4 | 0 | 0 | 0 | 0 | 0 |
| /pt/lu/blog/ | 82 | 10.6 | 0 | 0 | 0 | 0 | 0 |
| /pt/lu/como-trabalhamos/ | 62 | 9.8 | 0 | 4 (SIMPLIFICAR_CONVERTER_PARA_VERBO_INFINITIVO: "para que perceba"; PT_BARBARISMS_REPLACE_EMAIL: "email"; PT_BARBARISMS_REPLACE_LINK: "link") | 0 | 0 | 1 |
| /pt/lu/residencia-impostos-heranca/ | 65 | 15.7 | 0 | 0 | 0 | 0 | 2 |
| /pt/lu/comprar-a-partir-de-fora/ | 65 | 10.1 | 0 | 2 (ATRAVES_DE_POR_VIA: "através de"; PT_BARBARISMS_REPLACE_EMAIL: "email") | 0 | 0 | 0 |
| /pt/lu/o-seu-percurso/ | 63 | 13.3 | 0 | 10 (QUE_SE_V_PRESENTE: "que se fazem"; PT_REDUNDANCY_REPLACE_ANOS_DE_IDADE: "anos de idade"; PT_REDUNDANCY_REPLACE_ANOS_DE_IDADE: "anos de idade") | 0 | 0 | 6 |

## EN

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /en/us/ | 69 | 11 | 0 | 1 (MISSING_COMMA_AFTER_YEAR: "2026") | 0 | 0 | n/a |
| /en/us/faq/ | 75 | 11.9 | 0 | 7 (MISSING_COMMA_AFTER_YEAR: "2026"; CURRENCY: "700 €"; DID_BASEFORM: "buying") | 0 | 0 | n/a |
| /en/us/calculators/ | 71 | 11.9 | 0 | 0 | 0 | 0 | n/a |
| /en/us/calculators/total-cost/ | 75 | 9.9 | 0 | 0 | 0 | 0 | n/a |
| /en/us/map/ | 65 | 8.8 | 0 | 1 (MISSING_COMMA_AFTER_YEAR: "2026") | 0 | 0 | n/a |
| /en/us/map/porto/ | 79 | 9.6 | 0 | 0 | 0 | 0 | n/a |
| /en/us/partners/ | 62 | 9.1 | 0 | 5 (MISSING_COMMA_AFTER_YEAR: "2026"; SENTENCE_WHITESPACE: "Let"; ENGLISH_WORD_REPEAT_BEGINNING_RULE: "For") | 0 | 0 | n/a |
| /en/us/buy/ | 65 | 7.9 | 0 | 0 | 0 | 0 | n/a |
| /en/us/blog/ | 65 | 9.3 | 0 | 0 | 0 | 0 | n/a |
| /en/us/how-we-work/ | 60 | 9.4 | 0 | 1 (COMMA_COMPOUND_SENTENCE: " and") | 0 | 0 | n/a |
| /en/us/residence-tax-inheritance/ | 65 | 15.4 | 0 | 0 | 0 | 0 | n/a |
| /en/us/buying-from-abroad/ | 61 | 9.3 | 0 | 0 | 0 | 0 | n/a |
| /en/us/your-path/ | 74 | 13.6 | 0 | 10 (RELATIVE_CLAUSE_AGREEMENT: "handles"; RELATIVE_CLAUSE_AGREEMENT: "handles"; COMMA_COMPOUND_SENTENCE_2: " and") | 0 | 0 | n/a |

## FR

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /fr/fr/ | 79 | 10.8 | 0 | 10 (VOIR_REGARDER: "Voyez"; VIRG_NON_TROUVEE: " il"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "se") | 0 | 0 | 0 |
| /fr/fr/questions-frequentes/ | 78 | 11.1 | 0 | 8 (FR_REPEATEDWORDS_SAUF: "sauf"; ESPACE_UNITES: "€.415"; AGREEMENT_POSTPONED_ADJ: "permanente") | 0 | 0 | 0 |
| /fr/fr/simulateurs/ | 75 | 12.5 | 0 | 2 (VOIR_REGARDER: "Voyez"; VIRG_NON_TROUVEE: " il") | 0 | 0 | 0 |
| /fr/fr/simulateurs/cout-total/ | 90 | 9.7 | 0 | 6 (grammalecte_typo_parenthèse_fermante_collée: "I"; PARENTHESES: ")Código"; grammalecte_typo_parenthèse_fermante_collée: "D") | 0 | 0 | 0 |
| /fr/fr/carte/ | 90 | 9.9 | 0 | 4 (VOIR_REGARDER: "Voyez"; VIRG_NON_TROUVEE: " il"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "se") | 0 | 0 | 0 |
| /fr/fr/carte/porto/ | 84 | 9.8 | 0 | 1 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "2e") | 0 | 0 | 0 |
| /fr/fr/partenaires/ | 71 | 9.7 | 0 | 7 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er") | 0 | 0 | 0 |
| /fr/fr/acheter/ | 65 | 7.4 | 0 | 0 | 0 | 0 | 0 |
| /fr/fr/blog/ | 74 | 10.5 | 0 | 0 | 0 | 0 | 0 |
| /fr/fr/notre-methode/ | 65 | 9.5 | 0 | 2 (FR_MULTITOKEN_SPELLING_HYPHEN: "Decreto-Lei"; ON_VERBE: "borrower") | 0 | 0 | 1 |
| /fr/fr/residence-fiscalite-succession/ | 67 | 15.9 | 0 | 1 (AGREEMENT_POSTPONED_ADJ: "sponsorisé") | 0 | 0 | 0 |
| /fr/fr/acheter-depuis-l-etranger/ | 68 | 9.7 | 0 | 9 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; FR_REPEATEDWORDS_ANNONCER: "annoncé"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er") | 0 | 0 | 0 |
| /fr/fr/votre-parcours/ | 74 | 13.4 | 0 | 8 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "2e"; AGREEMENT_NUMERAL_SINGULAR: "Autres"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "2e") | 0 | 0 | 0 |

## Lighthouse (mobile)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| pt /pt/lu/ | 99 | 100 | 100 | 100 |
| pt /pt/lu/perguntas-frequentes/ | 100 | 100 | 100 | 100 |
| pt /pt/lu/simuladores/custo-total/ | 99 | 100 | 100 | 100 |
| pt /pt/lu/mapa/ | 97 | 100 | 100 | 100 |
| pt /pt/lu/o-seu-percurso/ | 99 | 100 | 100 | 100 |
| en /en/us/ | 99 | 100 | 100 | 100 |
| en /en/us/faq/ | 100 | 100 | 100 | 100 |
| en /en/us/calculators/total-cost/ | 99 | 100 | 100 | 100 |
| en /en/us/map/ | 97 | 100 | 100 | 100 |
| en /en/us/your-path/ | 99 | 100 | 100 | 100 |
| fr /fr/fr/ | 99 | 100 | 100 | 100 |
| fr /fr/fr/questions-frequentes/ | 100 | 100 | 100 | 100 |
| fr /fr/fr/simulateurs/cout-total/ | 99 | 100 | 100 | 100 |
| fr /fr/fr/carte/ | 95 | 100 | 100 | 100 |
| fr /fr/fr/votre-parcours/ | 99 | 100 | 100 | 100 |

## Parity

ok

## Result

All thresholds met.
