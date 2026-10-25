# Prompt 16 — Interactive Portugal map: "what your budget buys"

To run: "Read ops/prompts/16_portugal_map.md and execute it." Work on a branch and open a PR. Nothing is published or merged without the operator's "go". Everything in PT, EN and FR.

Decision D34: the "O que compra" city comparison (prompt 12) is replaced by an interactive map of Portugal. No direct comparisons with Gondomar or any single town. No price cap.

## What the reader does

1. Types any budget (from 100,000 € to 10 M€ and above; shown in the reader's currency too, ECB rate with date).
2. Sees Portugal coloured by **how many m² that budget buys** in each municipality (median sale price per m², INE, quarterly, with date and source). Tap a municipality or region: the m² figure, the median €/m², a short line on the place, and 3–5 beautiful real photos (coast, city, countryside, the home types typical there).
3. Filters: coast or inland, city or countryside, near an airport (Porto, Lisbon, Faro), North / Centre / Lisbon / Alentejo / Algarve / islands.
4. Calls to action on every place card:
   - "Ver casas nesta zona": the partner agency's request form, prefilled with the place and budget (D14, D19)
   - "Falar com promotores nesta zona": developer partners active there (labelled sponsored); "Talk to a partner" if none yet
   - "Simular o custo total": the cost simulator, prefilled
   - For budgets of 1 M€ and above, a discreet link to the Private section (D33)
5. Shareable link that keeps the budget and the selected place (no personal data), plus a shareable image for social media.

## How to build it

1. Boundaries: official CAOP from Direção-Geral do Território (open data), simplified to a light TopoJSON. Mainland, Madeira and the Azores (as insets).
2. Map in the browser with free, open tools (D3 or MapLibre with no paid tiles); fast on a phone (Lighthouse mobile 95+). Works without a map library fallback: a searchable list of municipalities.
3. Data in content/facts (INE municipality table, with source URL and date). Municipalities without an INE figure are shown in grey with "sem dados oficiais".
4. Photos: real, warm, high quality, by region; no visible credit (D-photo rule from prompt 10), sources in site/public/photos/CREDITS.md; never imply a photo is a property for sale.
5. Design: the cleanest page on the site (prompt 11 rules). The map is the hero of the home page's "what your budget buys" block and has its own page.
6. Remove the prompt 12 city-vs-city lines from the site, the newsletter format and the press kit, and use the map as the launch data story in prompt 15 instead ("what 500,000 € buys across Portugal").

## Review

Push after each step. Reply with the preview link, mobile screenshots (budget 300k €, 1 M€ and 5 M€), and anything you couldn't verify. Keep it short. Don't merge.
