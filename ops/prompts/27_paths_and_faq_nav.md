# Prompt 27 — Buy and sell as a path, FAQ in the top navigation (D51)

To run: "Read ops/prompts/27_paths_and_faq_nav.md and execute it." Run it right after prompt 26. Work on a branch and open a PR. Nothing is published or merged without the operator's "go". PT, EN and FR; identity D50 (OneMark register); voice D35. This replaces the navigation in prompt 19 §1 and the journey layout in prompts 20 §2 and 24 (their content stays).

## 1. Navigation (five items, never wrapping)

PT "O seu percurso · Mapa · Perguntas · Private · Parceiros" · EN "Your path · Map · FAQ · Private · Partners" · FR "Votre parcours · Carte · Questions · Private · Partenaires". Price trends and simulators live inside the map and the path; everything else in the footer. Country selector and language switch on the right; one discreet "Newsletter" button.

## 2. FAQ as a top section

1. One FAQ hub per language, filtered by the reader's country: the most searched questions first, grouped by stage of the path (before buying, buying, owning, renting, selling, inheritance), with search.
2. Every answer links to its checkpoint on the path, and every checkpoint shows its FAQ questions.
3. Featured questions on the home page under the map.

## 3. The path: buying or selling, navigated like a journey

The feeling: walking a beautiful route with a concierge beside you, not filling in forms. Elegant, calm, never childish.

1. **Start screen:** two doors, "Comprar" and "Vender" (later a third, "Herdei uma casa"), then three quick choices: country of residence, budget band (or property value for selling), timing. The path adapts to the answers.
2. **The route:** a single vertical line on mobile, a gently curving line on desktop, with 7 to 9 checkpoints as stations:
   - Buying: budget and place (map) → financing and moving money → documents (NIF, bank account, power of attorney) → choosing the home (agency, developers) → the promissory contract (CPCV) → taxes and the deed → keys → owning, renting, insurance → selling later.
   - Selling or inherited: what it is worth (valuation request to the agency) → inheritance and registration → taxes in Portugal and at home → preparing the home → listing with the agency → the deed → moving the money.
3. **Each checkpoint opens as a card:** what happens here (two lines), what you need (a short checklist the reader can tick), the questions people ask (from the FAQ), the numbers for their case (prefilled simulator), the partner for this step (labelled), and one button: "Próximo passo".
4. **Progress:** the reader sees where they are ("Está aqui"), what is done (ticked stations fill in), and how long the remaining steps usually take (only if a source supports it, otherwise no duration). Progress is saved on the device (localStorage, wrapped in try/catch); optional "Enviar o meu percurso por email" with double opt-in through beehiiv.
5. **Motion:** the line draws itself as the reader advances; each station opens with a short, subtle transition; respect "reduced motion".
6. **Shareable:** "Partilhar o meu percurso" link with country, budget and step (no personal data).
7. **Accessibility and speed:** keyboard and screen-reader friendly, Lighthouse mobile 95+, works without JavaScript as a plain ordered list.

## Review

Push after each section. Reply with the preview link, mobile screenshots of the start screen, the buying path for a Luxembourg reader at 400 k€ (three checkpoints open), the selling path for an inherited home, and the FAQ hub. Keep it short. Don't merge.
