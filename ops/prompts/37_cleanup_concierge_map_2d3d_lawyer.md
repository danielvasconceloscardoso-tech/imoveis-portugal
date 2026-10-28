# Prompt 37: clean-up, concierge fixes, map 2D/3D, the first lawyer profile

CEO, 28 Oct 2026, evening. Decisions D63–D64. Branch `design-v2`.

**Deadline:** the operator's father shows the site to a Gondomar developer tomorrow (29 Oct). §1 and §2 must be live by tomorrow morning. Work fast and efficiently: this is mostly removing and moving things, not building new ones. Nothing is published, sent or merged without the operator's "go".

## 1. Concierge: bugs and iPhone (first)

1. **It always opens on Luxembourg.** It must open on the reader's edition: the one in the URL, else the saved one.
2. **It needs a double click.** One click or tap must open it, everywhere.
3. **On iPhone it looks broken.** Make the panel a proper bottom sheet:
   - full width, safe areas respected;
   - no zoom on focus (inputs at least 16 px);
   - nothing cut off by the keyboard;
   - smooth open and close;
   - one question per screen.

   Test in Playwright WebKit at 390×844 and send screenshots.

## 2. Less noise: move it into articles

1. **The map shows only what a buyer needs at a glance.** Every long explanation, table, methodology note or block of statistics on the map page and the home page moves into articles.
2. **Create an "Artigos" hub** built like the Simuladores hub: one card per article, a short line, one action. First articles, made from the material you remove:
   - "Preços: como ler o mapa";
   - "Dez anos de preços em Portugal";
   - "O prémio do golfe" (the golf premium);
   - "Como calculamos" (method and sources);
   - plus the golf, Madeira and New Year's Eve pillar drafts once approved.

   The relevant map card or section links to its article in one line.
3. **Navigation** (operator, 28 Oct: Artigos sits next to the other sections): Passo a passo · Mapa · Simuladores · Artigos · Perguntas · Parceiros, plus Concierge. On mobile, everything sits in the menu.

## 3. The map: 2D and 3D, no night

1. **Remove Night mode** entirely: switch, NASA tiles, code.
2. **One switch: 2D · 3D.**
   - **3D:** today's map v3 (relief, budget slider, card, search, tours).
   - **2D:** a flat, clean, Apple Maps-like version of the same map and the same features. Light basemap, the colour field, the same card and search, fast on any phone. Reuse what works from the previous map (v1 or map-v2), your choice.
   - **Default:** 2D on phones and weak devices, 3D on desktop. The choice is remembered.
3. **Fix the little bugs you know of** (task list 35–36), and keep 308/308, golf, beaches, compare, the time slider, and the "Lisboa" label at every zoom.

## 4. The first lawyer profile in the Concierge (D64)

When a reader chooses "I have a question" or reaches the legal step, the Concierge shows one partner lawyer as a card.

**The card shows:**
- photo;
- name and firm;
- Ordem dos Advogados professional number (cédula), with a link to the Ordem's public lawyer search;
- practice areas relevant to buyers (purchase, inheritance, tax residence, power of attorney);
- languages;
- where they work (city, video);
- typical response time;
- fee information as the lawyer chooses to state it ("first consultation €X" or "from €X per hour");
- a LinkedIn link;
- one action: "Book a call".

**Rules:**
- The card is labelled "Parceiro". The lawyer pays a flat sponsorship (D6). No commission or share of fees per client: sharing fees with non-lawyers is prohibited.
- Wording stays informative, within the publicity rules for lawyers (Estatuto da Ordem dos Advogados, art. 94): no superlatives, no comparisons, no promises.
- The lawyer's photo and data are used only with their written consent.
- The request goes to the lawyer only after the reader ticks a consent box naming the lawyer (unticked by default).
- Until the operator sends the real profile, build it with a clearly marked sample ("Exemplo") that never goes live. The real data goes in `content/partners/lawyers.yaml`, one entry per lawyer, so more can follow.

## 5. Report

Send:
- screenshots of the Concierge on iPhone (WebKit 390×844) and desktop;
- the map in 2D and 3D;
- the Artigos hub;
- the lawyer card.

One line on anything that couldn't be done. Don't send, publish or merge anything.
