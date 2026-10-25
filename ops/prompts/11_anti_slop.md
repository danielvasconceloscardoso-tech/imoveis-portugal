# Prompt 11 — Remove the AI look

To run: "Read ops/prompts/11_anti_slop.md and execute it." Work on your branch. Nothing is merged, published or sent without Daniel's approval.

Daniel's verdict: the site still looks like AI made it, and anyone can tell. The CEO's diagnosis of the home page (design/v2/screens/mobile/home-iphone-full.jpg):

1. Template structure: a small label above every heading ("EM NÚMEROS", "COMECE AQUI", "A NEWSLETTER"), "three numbers", "three steps", three cards with "Abrir →", circle-check bullets. This is the standard AI landing page.
2. Generic headings that could sit on any site: "Todas as semanas, na sua caixa", "Como podemos ajudar?", "Chegue a quem está a preparar a compra".
3. Nothing real: no real house, no real price, no real place from the North, no person. A Lisbon postcard photo (Alfama) on the Luxembourg edition, where most readers come from the North.
4. Visible "Este formulário está a ser preparado…": this kills trust on the first screen.
5. A wall of footnotes in the middle of the page reads like a research paper, not a brand.
6. The trust bar is repeated twice.

## 1. Design rules (apply on every page)

1. No label above headings. No "three X" sections. No circle-check bullets. No generic cards with arrows. Vary the rhythm: one full-bleed photo, one text section, one real example.
2. The home page has at most five sections, in the order of section 3 below.
3. Sources become a small superscript number that opens the source on tap. No footnote blocks mid-page; full list at the bottom of the page only.
4. Never show a placeholder or "being prepared" text. If a form isn't live, the button opens an email to the brand mailbox.
5. Photos: the North and Centre of Portugal (Porto, Gondomar, Braga, Minho, Douro) and daily life (keys, a table, a street, a balcony), warm and real. Never the same postcard on every edition. Use the partner agency's own photos when the operator provides them.
6. Show prices in the reader's currency next to euros where it helps: CHF for Switzerland, R$ for Brazil, $ for the USA, ₪ for Israel (rate and date shown, source: ECB reference rate).
7. Bigger, calmer type in the hero; one accent colour; more white space.

## 2. Copy rules (add to content/VOICE.md)

1. Banned AI words and shapes, in all three languages: "descubra", "explore", "jornada", "sem complicações", "tudo o que precisa", "parceiro de confiança", "simplificamos", "seamless", "unlock", "votre partenaire de confiance"; rhetorical questions as headings; taglines built on a colon; lists of three adjectives; em-dashes.
2. Write like someone from the community, without clichés (superseded by prompt 17: optimistic, realistic, obstacle → solution).
3. Every claim is specific: a place, a price, a date, a number, with its source.

## 3. Home page (PT master, write EN and FR natively from it)

The CEO wrote the PT copy in content/copy/HOME_CEO_DRAFT.md. Use it as written, and adapt the edition lines (the LU example below) for each country.

## 4. Calls with the partner agency (D19, D20)

1. Habinedita Gondomar appears as **Patrocinador Gold** wherever partners are shown.
2. Two call options on the "Talk to a partner" page and at the end of practice FAQ answers (CPCV deposit, purchase timeline, what a budget buys, buying from abroad):
   - "Primeira conversa · 15 min · grátis"
   - "Plano de compra · 45 min · 150 €, descontados se comprar com a agência" (invoiced by the agency)
3. Use a Cal.com placeholder link in config.ts until the operator creates the event types. Never show a broken link: fall back to an email.
4. Tax and legal questions keep their lawyer or tax adviser call to action; financing keeps the bank call to action.

## Review

Apply the design and copy rules to every page, then rewrite the rest of COPY_DECK.md under the same rules. Push after each step. Reply with the preview link and mobile screenshots of the home, FAQ and Talk to a partner pages. Keep it short. Don't merge.
