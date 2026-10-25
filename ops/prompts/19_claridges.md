# Prompt 19 — The Claridge's standard: navigation, map, simulators, and a full copy audit in three languages

To run: "Read ops/prompts/19_claridges.md and execute it." Work on a branch and open a PR. Nothing is published or merged without the operator's "go". This prompt overrides earlier design and copy instructions where they conflict.

The feeling Daniel wants: **walking into Claridge's**. Calm, discreet, impeccable, nothing shouting, every detail considered, and you are looked after without being sold to. Whether you have 300k € or 10 M€.

## 1. Navigation and layout (the current header is cluttered and wraps)

1. **Five items at most, one or two words each, never wrapping** on any screen width. Proposal: PT "Comprar · Mapa · Simuladores · Private · Parceiros"; EN "Buying · Map · Calculators · Private · Partners"; FR "Acheter · Carte · Simulateurs · Private · Partenaires". Everything else (FAQ, guides, articles, how we work, legal) lives under "Comprar" or in the footer.
2. Right side: language switch (PT · EN · FR) and one discreet button, "Newsletter". The "Beta" mark is small and quiet, not a badge.
3. Mobile: a full-screen menu that feels like a concierge desk: large serif items, generous spacing, the two main actions at the bottom.
4. Typography and colour: one refined serif for display (self-hosted, free licence) and one clean sans for text; warm ivory background, deep ink text, one muted brass or deep green accent used sparingly. Hairline rules instead of boxes. Large margins. No cards with shadows, no badges, no icons unless they earn their place.
5. Motion: slow, subtle fades and transitions; respect "reduced motion".

## 2. The map: superb, 3D and interactive

1. MapLibre GL with our own GeoJSON (CAOP boundaries), no paid tiles and no API key: municipalities as **3D extrusions whose height is the m² the reader's budget buys**, coloured on a refined sequential palette. Tilted camera, smooth fly-to when a place is tapped, slow idle rotation on the home page.
2. Budget control: a single elegant input with presets (300 k€ · 1 M€ · 5 M€ · 10 M€) and the reader's currency. Changing the budget animates the heights.
3. Place card: a large real photo, the place name in the display serif, the m² figure in large numerals, the median €/m² with source and date, then the three actions (see homes, talk to developers there, simulate the total cost).
4. Mobile performance: simplified geometry, Lighthouse mobile 95+; on low-power devices or "reduced motion", a flat 2D version; a searchable list as fallback.

## 3. Simulators: creative and distinguished

1. **One question at a time**, like a conversation with a concierge, with large numerals, smooth sliders and the result updating live.
2. The result is presented like a **beautifully set statement**: the total in large serif numerals, each line (IMT, stamp duty, notary and registration, or monthly payment and debt-to-income ratio, or gross and net yield) on hairline rules, each with its source in small type.
3. Every simulator works from 100 k€ to 10 M€ and above, in the reader's currency too.
4. The next step at the bottom: the matching partner, then "save as PDF" (free) and the paid report when it's switched on (D22).
5. Shareable link with the inputs (no personal data).

## 4. Full copy audit, PT, EN and FR (the same problems exist in all three)

The CEO found these on main; fix every one and everything like them:
- Nav: "Casa tratada de fora" / "Home from abroad" / "Maison depuis l'étranger"
- One-stop page: "A sua casa em Portugal, tratada de fora" / "Your home in Portugal, handled from abroad" / "Votre maison au Portugal, gérée depuis l'étranger" (CasaPage.astro and the deck)
- "volta a pensar na casa todos os agostos" / "think about the house back home every August"; "What people ask us every August"
- "{price} de casa, {extra} por cima" / "{extra} on top"; "O preço é o início. Por cima, quem compra…" / "The price is just the start. On top, a buyer…"
- "Quanto pago por cima do preço?" / "on top of the price" / "en plus du prix" (FAQ titles and the deck)
- "quem compra", "de quem compra casa", "para quem compra a partir de fora", "ceux qui achètent", "a buyer who…" in the deck, FAQ and blog
- Nav labels "Ce que vous achetez", "Maison depuis l'étranger": literal and clumsy

Rules for the rewrite (content/VOICE.md, D35): optimistic and realistic; obstacle → information → partner; talk to the reader directly; costs as information ("Custo total com impostos e registo"); calm, confident, concise, the register of a five-star concierge in each language. Add every banned phrase and its EN and FR equivalents to the voice check, then run the scorecard (prompt 15) and grep the whole repo until zero matches.

## Review

Push after each section. Reply with the preview link, mobile and desktop screenshots of the header, the map (300 k€ and 10 M€), one simulator result and the home page in PT, EN and FR, and the full list of copy changes. Keep it short. Don't merge.
