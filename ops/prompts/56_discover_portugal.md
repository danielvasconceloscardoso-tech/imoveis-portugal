# Prompt 56: "Descobrir": a site that makes people fall for a region, then shows the homes there (D77)

CEO, 2 Nov 2026, 22:45. Operator: no score cards. The site, the letter and the posts are optimistic, playful and premium: they help people find the coolest things in Portugal (food, wine, art, surf, golf, festas, places), so they end up wanting a home in that region, and then they see the developments listed there. Behind it, a five-star service: the best partners, professional and calm, like a Claridge's or Belmond concierge.

## 0. Remove

1. **The index scores from the public site:** no number out of 100 on the map, cards or search; no "O seu índice" sliders; no score in the letter or posts. Keep the pipeline and data internal (they inform which places we feature). Prompt 45 §1b and §6 (Portugal 100) are cancelled.
2. The map's colour field shows nothing by default; official price per m² stays available as one optional layer for those who look for it.

## 1. Descobrir: the map becomes a map of cool things

1. **Layers that matter to a person, not an analyst:** Comer (Michelin and the beloved tables), Vinho (quintas that receive visitors), Arte (Vhils, Joana Vasconcelos, Bordalo II, Killa Was Here, museums, galleries), Mar (beaches, surf spots), Golfe, Festas (with dates), Natureza (levadas, trails, river beaches), Famílias (schools), Saúde (hospitals). Data from `content/letter/BANK.csv` and official sources; every point with a photo, two lines in the voice of `content/VOICE_AND_WORLD.md`, and its source.
2. **Each region tells its story:** tap a region and get its best five things this month, the next festa, the table to book, and at the end "Casas nesta região" with the listed developments (labelled).

## 2. Light gamification (premium, never childish)

1. **O Passaporte: dropped (operator, 2 Nov).** ~~a reader collects a stamp for each place they explore on the map or visit in real life (a QR at partner venues later). Ten stamps in a region unlock that region's guide; a full region unlocks a partner perk (a tasting at a quinta, a dinner, a round of golf), offered and paid for by the partner, labelled. Stamps stored on the device only, or in the reader's letter account with consent.~~ Remove the passport stamp from the quiz result screen.
2. **"Qual é a sua região?"** (mockup: `design/quiz/quiz_mockup.html` and `Qual_e_a_sua_regiao.png`; build to it): a six-question quiz (morning person or night owl, sea or mountains, wine or surf, city or village, budget, who comes with you) that ends with a region, its five best things and the homes listed there. Shareable result card.
3. **O desafio** moves to the letter (operator, 2 Nov; prompt 52): see there. Not on the site.
4. **Roteiros:** "48 horas no Porto", "O Douro em 3 dias", "Comporta sem pressa": a route on the map, stop by stop, ending at the homes in the region.

### The quiz, in detail
1. **Screens:** intro (full-bleed photo, "Um jogo de dois minutos", one button) → six questions, one per screen, four photo tiles each (tap selects and moves on after 400 ms; "Voltar" always) → result (full-bleed photo of the region, two lines on why it fits, "Este mês" three items from the bank) → "Casas nesta região" with the listed developments and "Ver casas no mapa" → the first Passaporte stamp → share.
2. **Questions:** Acorda com (mar, montanha, cidade, rio) · Às sete da tarde (varanda e vinho, praia, jantar na cidade, buraco 18) · Fim de semana (surf, golfe, museus e galerias, trilhos e levadas) · Quem vem consigo (família, a dois, sozinho, amigos) · Inverno (20 graus sempre, lareira e frio bom, tanto faz) · Até onde vai o orçamento (four ranges; used only to choose which homes to show, never the region).
3. **Regions (six results):** O Douro e o Porto · O Minho · Lisboa e Cascais · Comporta e o Alentejo litoral · O Algarve · A Madeira. Each answer adds points to regions in a small table in `content/quiz/weights.json`; ties broken by the "às sete da tarde" answer; second-best region shown as "Também é a sua cara".
4. **Share card:** 1080×1920 and 1200×630 images generated per region (photo, "A minha região em Portugal", region, one line, "Qual é a sua?") with the link to the quiz; Instagram story and WhatsApp share buttons.
5. **Letter:** the result offers the letter signup ("Receba o melhor de {região} todas as terças e sextas"), double opt-in, consent unticked.
6. **No personal data stored without consent;** results kept on the device; counts per region reported anonymously in `ops/METRICS.md`.

## 3. The concierge, five-star

1. The Concierge speaks like a great hotel concierge: brief, warm, anticipating the next need. It introduces "a sua equipa" (the qualified advisor, the lawyer, the bank, the tax adviser) as the people who will look after the purchase, each with a verified-register badge (prompt 48 §1).
2. Service promises we can keep, stated plainly (response within one working day; visits by video; everything signable from abroad), once the operator confirms each.
3. A "Como trabalhamos" page: the partners, how they were chosen, what each does, the independence rules. Calm, professional, no superlatives.

## 4. Scope and shipping

1. Portuguese first. EN and FR only after the operator approves the PT version (rule 15).
2. Build in this order, each live per D67: §0, §1 (three layers first: Comer, Vinho, Arte), the region view, §2.2 the quiz, §2.4 two roteiros, §3.
3. Report after each step: the commit hash, "live", one line. No PDFs.
