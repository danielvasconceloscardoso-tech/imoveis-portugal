# Quality scorecard

Generated 2026-10-25 by `node scripts/scorecard.mjs` (prompt 15 §5) on the built site. Pages: home, faq, sims, cost, map, place, partners, buy, blog, how in each language (PT on the .lu edition, EN on .us, FR on .fr).

Thresholds: zero LanguageTool errors on headings and buttons; readability 60+ (Flesch EN, Fernandes PT, Kandel-Moles FR) and sentences under 20 words on average; no banned words, em-dashes or question headings; zero serious axe issues; Lighthouse mobile 95+ in all four categories; parity across languages.

## PT

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /pt/lu/ | 64 | 14.7 | 1 | 2 (PT_BARBARISMS_REPLACE_EMAIL: "email"; SI_UNITS_EXPONENT: "T2") | 9 | 1 | 3 |
| /pt/lu/perguntas-frequentes/ | 73 | 13.6 | 1 | 15 (DEPOIS_DE_APÓS: "Depois de"; ATRAVES_DE_POR_VIA: "através de"; DEPOIS_DE_APÓS: "Depois de") | 2 | 1 | 4 |
| /pt/lu/simuladores/ | 72 | 12.8 | 0 | 0 | 1 | 1 | 0 |
| /pt/lu/simuladores/custo-total/ | 65 | 15.4 | 0 | 0 | 4 | 1 | 0 |
| /pt/lu/mapa/ | 62 | 18.4 | 0 | 0 | 1 | 1 | 0 |
| /pt/lu/mapa/porto/ | 59 | 29.6 | 0 | 0 | 1 | 1 | 0 |
| /pt/lu/parceiros/ | 55 | 15.6 | 2 | 7 (PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter") | 1 | 1 | 0 |
| /pt/lu/comprar/ | 54 | 10.3 | 0 | 0 | 1 | 1 | 0 |
| /pt/lu/blog/ | 74 | 16.8 | 0 | 0 | 2 | 1 | 0 |
| /pt/lu/como-trabalhamos/ | 57 | 11.6 | 1 | 5 (SIMPLIFICAR_CONVERTER_PARA_VERBO_INFINITIVO: "para que perceba"; PT_BARBARISMS_REPLACE_NEWSLETTER: "newsletter"; PT_BARBARISMS_REPLACE_EMAIL: "email") | 1 | 1 | 1 |

## EN

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /en/us/ | 43 | 14.3 | 3 | 7 (CURRENCY: "18,375 €"; CURRENCY: "1,960 €"; CURRENCY: "375 €") | 9 | 1 | n/a |
| /en/us/faq/ | 59 | 13.7 | 0 | 23 (MISSING_COMMA_AFTER_YEAR: "2026"; CURRENCY: "150 €"; CURRENCY: "375 €") | 2 | 1 | n/a |
| /en/us/calculators/ | 58 | 12.3 | 0 | 0 | 1 | 1 | n/a |
| /en/us/calculators/total-cost/ | 51 | 15.3 | 0 | 2 (CURRENCY: "150 €"; EN_UNPAIRED_BRACKETS: ")") | 5 | 1 | n/a |
| /en/us/map/ | 46 | 17 | 0 | 2 (CURRENCY: "2,264 €"; CURRENCY: "500,000 €") | 1 | 1 | n/a |
| /en/us/map/porto/ | 36 | 28.4 | 0 | 12 (CURRENCY: "3,631 €"; CURRENCY: "2,264 €"; CURRENCY: "300,000 €") | 1 | 1 | n/a |
| /en/us/partners/ | 43 | 14.5 | 0 | 18 (MISSING_COMMA_AFTER_YEAR: "2026"; CURRENCY: "1,800 €"; CURRENCY: "4,800 €") | 1 | 1 | n/a |
| /en/us/buy/ | 49 | 10.7 | 0 | 0 | 1 | 1 | n/a |
| /en/us/blog/ | 43 | 14.8 | 0 | 0 | 1 | 1 | n/a |
| /en/us/how-we-work/ | 44 | 11.3 | 1 | 1 (COMMA_COMPOUND_SENTENCE: " and") | 1 | 1 | n/a |

## FR

| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /fr/fr/ | 62 | 13.9 | 5 | 6 (grammalecte_typo_parenthèse_fermante_collée: "n"; grammalecte_typo_parenthèse_fermante_collée: "o"; grammalecte_typo_parenthèse_fermante_collée: "i") | 7 | 1 | 1 |
| /fr/fr/questions-frequentes/ | 72 | 13 | 0 | 13 (FR_REPEATEDWORDS_SAUF: "sauf"; ESPACE_UNITES: "€.415"; IL_FAUT: "Mieux vaut") | 2 | 1 | 1 |
| /fr/fr/simulateurs/ | 76 | 13 | 0 | 0 | 1 | 1 | 0 |
| /fr/fr/simulateurs/cout-total/ | 73 | 15.2 | 3 | 0 | 5 | 1 | 0 |
| /fr/fr/carte/ | 68 | 18.3 | 1 | 2 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b9_a1_1: "Po"; OU_LEQUEL: "où") | 1 | 1 | 0 |
| /fr/fr/carte/porto/ | 55 | 28.9 | 0 | 1 (OU_LEQUEL: "où") | 1 | 1 | 0 |
| /fr/fr/partenaires/ | 65 | 16 | 0 | 6 (grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er"; grammalecte_g2__typo_ordinaux_chiffres_exposants__b1_a1_1: "1er") | 1 | 1 | 0 |
| /fr/fr/acheter/ | 45 | 10.3 | 0 | 0 | 1 | 1 | 0 |
| /fr/fr/blog/ | 63 | 16.3 | 0 | 0 | 1 | 1 | 0 |
| /fr/fr/notre-methode/ | 55 | 11.2 | 1 | 2 (FR_MULTITOKEN_SPELLING_HYPHEN: "Decreto-Lei"; ON_VERBE: "borrower") | 1 | 1 | 1 |

## Parity

ok

## Result

- pt /pt/lu/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".." · voice: todos os agostos, tratada de fora, o pre[çc]o [ée] o in[ií]cio, \bpor cima\b, \bquem compra\b · question headings: Posso comprar sem ir a Portugal? | Quanto pago por cima do preço? | O banco empresta a quem vive fora? | A casa dos meus pais ficou para mim. E agora? · axe: link-in-text-block (1)
- pt /pt/lu/perguntas-frequentes/: grammar in headings/buttons: DEPOIS_DE_APÓS: "Depois de" · voice: tratada de fora, \bquem compra\b · axe: link-in-text-block (1)
- pt /pt/lu/simuladores/: voice: tratada de fora · axe: link-in-text-block (1)
- pt /pt/lu/simuladores/custo-total/: voice: tratada de fora · question headings: Vai ser a sua habitação própria e permanente? | É residente fiscal em Portugal? | Vai pedir crédito? · axe: link-in-text-block (1)
- pt /pt/lu/mapa/: voice: tratada de fora · axe: link-in-text-block (1)
- pt /pt/lu/mapa/porto/: readability 59 · sentence length 29.6 · voice: tratada de fora · axe: link-in-text-block (1)
- pt /pt/lu/parceiros/: grammar in headings/buttons: PORTUGUESE_WORD_REPEAT_BEGINNING_RULE: "Parceiro"; PORTUGUESE_WORD_REPEAT_BEGINNING_RULE: "Parceiro" · readability 55 · voice: tratada de fora · axe: link-in-text-block (1)
- pt /pt/lu/comprar/: readability 54 · voice: tratada de fora · axe: link-in-text-block (1)
- pt /pt/lu/blog/: voice: tratada de fora, \bquem compra\b · axe: link-in-text-block (1)
- pt /pt/lu/como-trabalhamos/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".." · readability 57 · voice: tratada de fora · axe: link-in-text-block (1)
- en /en/us/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".."; CURRENCY: "245,000 €"; CURRENCY: "20,710 €" · readability 43 · voice: the price is (just )?the start, \bon top of the price\b, \bon top, , \ba buyer who\b, home from abroad · question headings: Can I buy without going to Portugal? | How much do I pay on top of the price? | Will a bank lend to someone who lives abroad? | Does buying a home let me live in Portugal? · axe: link-in-text-block (1)
- en /en/us/faq/: readability 59 · voice: \bon top of the price\b, home from abroad · axe: link-in-text-block (1)
- en /en/us/calculators/: readability 58 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/calculators/total-cost/: readability 51 · voice: \bon top of the price\b, home from abroad · question headings: Will it be your own permanent home? | Are you a tax resident of Portugal? | Will you take a mortgage? · axe: link-in-text-block (1)
- en /en/us/map/: readability 46 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/map/porto/: readability 36 · sentence length 28.4 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/partners/: readability 43 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/buy/: readability 49 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/blog/: readability 43 · voice: home from abroad · axe: link-in-text-block (1)
- en /en/us/how-we-work/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".." · readability 44 · voice: home from abroad · axe: link-in-text-block (1)
- fr /fr/fr/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".."; grammalecte_typo_ponctuation_superflue4: "?."; grammalecte_typo_ponctuation_superflue4: "?."; grammalecte_typo_ponctuation_superflue4: "?."; grammalecte_typo_ponctuation_superflue4: "?." · voice: le prix n'est qu'un d[ée]but, \ben plus du prix\b, maison depuis l'[ée]tranger · question headings: Puis-je acheter sans aller au Portugal ? | Combien paie-t-on en plus du prix ? | La banque prête-t-elle à quelqu'un qui vit à l'étranger ? | La maison de mes parents me revient. Et maintenant ? · axe: link-in-text-block (1)
- fr /fr/fr/questions-frequentes/: voice: \ben plus du prix\b, maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/simulateurs/: voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/simulateurs/cout-total/: grammar in headings/buttons: grammalecte_typo_ponctuation_superflue4: "?."; grammalecte_typo_ponctuation_superflue4: "?."; grammalecte_typo_ponctuation_superflue4: "?." · voice: \ben plus du prix\b, maison depuis l'[ée]tranger · question headings: Sera-ce votre résidence principale ? | Êtes-vous résident fiscal au Portugal ? | Allez-vous emprunter ? · axe: link-in-text-block (1)
- fr /fr/fr/carte/: grammar in headings/buttons: NORD_SUD: "Nord" · voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/carte/porto/: readability 55 · sentence length 28.9 · voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/partenaires/: voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/acheter/: readability 45 · voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/blog/: voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
- fr /fr/fr/notre-methode/: grammar in headings/buttons: DOUBLE_PUNCTUATION: ".." · readability 55 · voice: maison depuis l'[ée]tranger · axe: link-in-text-block (1)
