# Prompt 25 — The 3D map with 10 years of prices and rents (priority, D49)

To run: "Read ops/prompts/25_3d_map_intelligence.md and execute it." **Priority: pause the queue after the section you are on, build this, then resume.** Work on a branch and open a PR. Nothing is published or merged without the operator's "go". PT, EN and FR. Colours from D44 (black, white, eau-de-nil, bottle green, brass details); the map's data scale is a quiet sequential green. This supersedes the map parts of prompts 16, 18 §1 and 19 §2 where they conflict.

## 1. Data (content/facts/map/, scripts/map-data/)

1. **Prices:** INE "Estatísticas de preços da habitação ao nível local": median sale value per m² of family dwellings (last 12 months), by municipality, quarterly, **from the year ending Q1 2016** to the latest release; parishes where INE publishes them (Lisbon and Porto metropolitan areas, Algarve).
2. **Rents:** INE "Estatísticas de rendas da habitação ao nível local": median rent per m² of new lease contracts, by municipality, semi-annual, from the first period INE publishes (record it).
3. Get both from INE's official API or the dados.gov.pt datasets (licence **CC BY 4.0**: commercial use allowed with attribution). Store raw files with download date and the source URL; one script rebuilds the processed JSON. Every displayed figure shows "Fonte: INE" with the period.
4. **Boundaries (D49, commercial-safe):** OpenStreetMap municipality boundaries (ODbL; credit "© OpenStreetMap contributors") simplified to a light TopoJSON; mainland plus Madeira and the Azores as insets. Fallback for the prototype: geoBoundaries PRT ADM2 (CC0, 311 units; files on media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/PRT/ADM2/). Do **not** use DGT's CAOP until DGT confirms commercial use in writing (task for the operator). Match boundaries to INE municipality codes (DICO) and list any mismatch.
5. Mortgage rate reference for the yield comparison: Banco de Portugal's latest average rate on new housing loans, with date.

## 2. The map (site page + home block + embeddable build)

1. MapLibre GL with our own data, no paid tiles, no API key. Municipalities as **3D extrusions**; the reader chooses what height means: **m² for my budget** (default), **median €/m²**, **10-year price growth**, **gross rental yield**. Colour follows the same metric on the green scale.
2. **One elegant budget field, no preset buttons and no budget tiers shown** (D52), in the reader's currency (ECB rate, dated); any amount works. Changing budget or metric animates the heights; tilted camera, smooth fly-to on tap, slow idle rotation on the home page.
3. **Place card:** large real photo, name in the display type, then:
   - m² for the budget and the median €/m² (latest), with period and source
   - **10-year chart**: price per m² and rent per m² on one elegant chart, compound annual growth for each, and the gap between them
   - **gross yield** (median rent × 12 ÷ median price) vs the current mortgage rate
   - **momentum**: change over the last 4 and 8 quarters, described in words ("a acelerar", "estável", "a abrandar"), factual, never a forecast
   - **comparable places**: three municipalities with similar price level, yield and setting (coast, city, inland) and their m² for the same budget
   - the actions: homes there (agency form prefilled with place and budget), developers there (partner slots, labelled), the cost simulator, the reader's country journey
   - "Os valores passados não garantem valores futuros. Estatísticas oficiais, não é uma avaliação." (EN and FR equivalents)
4. **Area briefs:** a short quarterly text per municipality generated from the data and **reviewed by a person before publishing** (editorial responsibility, so no AI label is required under the AI Act, art. 50(4)). No chat or question box on the map.
5. **Every municipality is clickable** (all 308, including small ones such as Gondomar, São João da Madeira or Barrancos, and those in Madeira and the Azores): a generous invisible hit area around small polygons, hover and focus states, keyboard access, and a search box ("Procurar concelho") that flies to any municipality and opens its card. Where INE publishes parishes (Lisbon and Porto metropolitan areas, Algarve), zooming in makes parishes clickable too. Test by clicking every municipality in an automated check and list any that fail.
6. Filters: coast or inland, city or countryside, near an airport (Porto, Lisbon, Faro), region; a searchable list as fallback; a flat 2D mode for low-power devices and reduced motion; Lighthouse mobile 95+.
7. Shareable link keeps budget, metric and place (no personal data); a shareable image per place for social media.

## 3. Embeddable version (for licensing later)

1. One script or iframe snippet that renders the map on another site, with config for: language, default budget, centre area, highlighted project pin, call-to-action target, partner colours.
2. Footer on every embed: **"Powered by Imóveis Portugal"** linked to the site, plus the required data credits in small type ("Fonte: INE · © OpenStreetMap contributors"). Nothing else.
3. A demo page per use case (media, developer project, bank white-label) using placeholder branding, not published.

## 4. Phase 2 layers (after the core map works)

Add as switchable layers and as facts on the place card, each with source, period and licence recorded in content/facts/map/SOURCES.md. Check every licence before use; skip any dataset that does not allow commercial reuse.
1. **What foreign buyers pay:** INE's house prices split by the buyer's tax domicile (Portugal vs abroad) and number of transactions, by municipality where INE publishes them (confirm coverage).
2. **Market liquidity:** number of sales per municipality per quarter (INE).
3. **New supply:** building permits and dwellings completed per municipality (INE construction statistics).
4. **Housing stock (Census 2021):** share of second homes and vacant dwellings, age of buildings.
5. **Short-term rental:** local accommodation registrations (RNAL, Turismo de Portugal, CC BY 4.0; use the current national download) and each municipality's local accommodation rules (containment areas).
6. **Annual ownership cost:** IMI rate set by each municipality for the current year (Portal das Finanças) feeding the cost simulator.
7. **Foreign residents** by municipality and nationality (AIMA / INE): where Americans, Brazilians, French, Swiss and others already live.
8. **Access:** travel time by car to Porto, Lisbon and Faro airports (computed from OpenStreetMap), rail and metro stations.
9. **Daily life:** international schools, hospitals (SNS open data), Blue Flag beaches, golf courses (OpenStreetMap).
10. **Climate:** sunshine hours and average temperatures (IPMA climate normals).
11. **Risk, shown factually:** flood zones (APA), coastal erosion, wildfire hazard (ICNF).
12. **Finance:** Banco de Portugal average rate on new housing loans and Euribor (BPstat), ECB reference exchange rates.
Not public and not used: listing prices scraped from portals. Short-term rental performance (occupancy, nightly rates) only from a source whose licence allows commercial use.

## Review

Push after each section. Reply with the preview link, mobile and desktop screenshots (300 k€ and 5 M€; one place card with the 10-year chart), the first period of the INE rent series, any boundary-code mismatches, and the embed snippet. Keep it short. Don't merge.
