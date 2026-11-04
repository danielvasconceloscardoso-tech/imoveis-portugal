# Prompt 73: Functional screens in plain words (Y Combinator style); the Concierge's first step fixed

Operator, 4 Nov 2026, on his phone:
- "O concierge está muito esquisito. 'Uma casa por cerca de 200 000 €' é a única opção, porquê?"
- "Gosto do simulador, mas os primeiros textos são muito AI. Para quê escrever tanto?"
- "Coisas claras e diretas em tudo o que é funcional", Y Combinator style.

The rule is now in content/METHOD.md, "Two registers". Goes live under D67. Record it as the next free D number. Run it before anything else in the queue.

## 1. The Concierge, step 1
What the operator saw coming from the simulator:
- the context shown as a selectable option ("O que estava a ver: Uma casa por cerca de 200 000 €"), pre-selected;
- the budget chips allowing "1 a 5 M€" next to that 200 000 € context;
- "Até 300 mil €" breaking onto two lines;
- a half-width button.

Fix:
1. **Three options only:** "Comprar casa", "Custos e impostos", "Vender ou herdar" (EN "Buy a home", "Costs and taxes", "Sell or inherit"; FR "Acheter", "Frais et impôts", "Vendre ou hériter").
2. **The context pre-selects, it is never an option:**
   - From the simulator: "Custos e impostos" is selected, and the budget chip matches the price (200 000 € → "< 300 mil €").
   - From a place or a development: "Comprar casa" is selected, with one small line underneath, "Sobre: O'rizon Living" or "Sobre: Gondomar".
   - Never a price sentence.
   - The context still travels with the request (`help.ctx`, `help.budget`), so the consultant sees it.
3. **Budget chips on one line each, at 375 px:**
   - PT: "< 300 mil €", "300 mil–1 M€", "1–5 M€", "> 5 M€";
   - EN: "< €300k", "€300k–1M", "€1–5M", "> €5M";
   - FR: "< 300 k€", "300 k€–1 M€", "1–5 M€", "> 5 M€".
4. **Subtitle:** "Um consultor liga-lhe à hora que escolher." (EN "An advisor calls you when you choose." FR "Un conseiller vous appelle quand vous voulez.")
5. **The button is full width,** in the thumb zone.

## 2. The simulator
1. **Delete the lede** ("As contas fazem-se no seu navegador…").
   - Title "Simuladores" and one line: "Quanto custa comprar, com as regras de 2026." (EN "What buying costs, under the 2026 rules." FR "Ce que coûte l'achat, règles 2026.")
   - "Nothing is stored" and "not advice" become one small line at the very bottom, merged with `estimate`.
2. **Delete the Apartamento / Moradia toggle and `type.note`.** It changes nothing. Check sims.ts first; if it feeds anything, say so instead of deleting.
3. **Plain labels:**
   - "Como paga": "Sem crédito" / "Com crédito" (not "Capitais próprios");
   - "Para quê": "Uso";
   - keep "Preço da casa", "Onde", "Entrada", "Total a pagar", "Prestação ao mês".

## 3. Every functional screen, in three languages
1. **Apply METHOD.md "Two registers" to everything functional:**
   - simulators, the Concierge, map controls and filters;
   - the Maré signup, forms, buttons, errors, empty states and navigation;
   - the one-line intros of step by step and the FAQ.
2. **The rules:**
   - delete every sentence that explains the tool, praises it, or says what we store, unless it prevents a mistake or the law requires it;
   - labels of 1 to 3 words;
   - the same meaning in PT, EN and FR.
3. **Editorial text keeps its voice.** That means Maré, articles and the last line of the cards.

## Acceptance (on main, phone at 375 px, PT, EN and FR)
1. From the simulator at 200 000 €, the Concierge opens on "Custos e impostos" and "< 300 mil €", with three options, no price sentence and no wrapped chips.
2. From a development card it opens on "Comprar casa", with "Sobre: <name>".
3. The simulator shows no lede paragraph and no Apartamento / Moradia toggle.
4. The James, Sophie and Ana agents (prompt 70) re-run the Concierge and the simulator with no "too much text" finding.
5. The checks and the build pass.

## Report
1. A before-and-after table of every functional string you changed or deleted, in PT.
2. Phone screenshots of the Concierge step 1 and the simulator top.
