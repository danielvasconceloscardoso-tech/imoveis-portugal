# Prompt 56: "Descobrir": a site that makes people fall for a region, then shows the homes there (D77)

CEO, 2 Nov 2026, 22:45. Operator: no score cards. The site, the letter and the posts are optimistic, playful and premium: they help people find the coolest things in Portugal (food, wine, art, surf, golf, festas, places), so they end up wanting a home in that region, and then they see the developments listed there. Behind it, a five-star service: the best partners, professional and calm, like a Claridge's or Belmond concierge.

## 0. Remove

1. **The index scores from the public site:** no number out of 100 on the map, cards or search; no "O seu índice" sliders; no score in the letter or posts. Keep the pipeline and data internal (they inform which places we feature). Prompt 45 §1b and §6 (Portugal 100) are cancelled.
2. The map's colour field shows nothing by default; official price per m² stays available as one optional layer for those who look for it.

## 1. Descobrir: the map becomes a map of cool things

1. **Layers that matter to a person, not an analyst:** Comer (Michelin and the beloved tables), Vinho (quintas that receive visitors), Arte (Vhils, Joana Vasconcelos, Bordalo II, Killa Was Here, museums, galleries), Mar (beaches, surf spots), Golfe, Festas (with dates), Natureza (levadas, trails, river beaches), Famílias (schools), Saúde (hospitals). Data from `content/letter/BANK.csv` and official sources; every point with a photo, two lines in the voice of `content/VOICE_AND_WORLD.md`, and its source.
2. **Each region tells its story:** tap a region and get its best five things this month, the next festa, the table to book, and at the end "Casas nesta região" with the listed developments (labelled).

## 2. Light gamification (premium, never childish)

1. **O Passaporte:** a reader collects a stamp for each place they explore on the map or visit in real life (a QR at partner venues later). Ten stamps in a region unlock that region's guide; a full region unlocks a partner perk (a tasting at a quinta, a dinner, a round of golf), offered and paid for by the partner, labelled. Stamps stored on the device only, or in the reader's letter account with consent.
2. **"Qual é a sua região?":** a six-question quiz (morning person or night owl, sea or mountains, wine or surf, city or village, budget, who comes with you) that ends with a region, its five best things and the homes listed there. Shareable result card.
3. **O desafio da semana** in the letter: a photo of a place, guess where it is; answers revealed next letter; the best guessers named by first name only with consent.
4. **Roteiros:** "48 horas no Porto", "O Douro em 3 dias", "Comporta sem pressa": a route on the map, stop by stop, ending at the homes in the region.

## 3. The concierge, five-star

1. The Concierge speaks like a great hotel concierge: brief, warm, anticipating the next need. It introduces "a sua equipa" (the qualified advisor, the lawyer, the bank, the tax adviser) as the people who will look after the purchase, each with a verified-register badge (prompt 48 §1).
2. Service promises we can keep, stated plainly (response within one working day; visits by video; everything signable from abroad), once the operator confirms each.
3. A "Como trabalhamos" page: the partners, how they were chosen, what each does, the independence rules. Calm, professional, no superlatives.

## 4. Scope and shipping

1. Portuguese first. EN and FR only after the operator approves the PT version (rule 15).
2. Build in this order, each live per D67: §0, §1 (three layers first: Comer, Vinho, Arte), the region view, §2.2 the quiz, §2.4 two roteiros, §3, then the Passaporte.
3. Report after each step: the commit hash, "live", one line. No PDFs.
