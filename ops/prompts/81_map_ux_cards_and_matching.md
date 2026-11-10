# Prompt 81: the map — a better look, the services on every municipality card, and matching that listens (operator, 10 Nov 2026)

Run this with the model the operator chose: Fable 5.2 (switch with `/model` before starting).

The operator's words, three problems:
1. Readers get most of what we offer through the map, so it has to be the best thing on the site. Make it more beautiful.
2. Schools, hospitals and the rest of the services we promised must appear on the municipality cards. Today only 29 of the 308 places have them (`content/facts/map/places/`).
3. When he picks a place by what matters to him (food, international school, beach…), the results stay the same. He is right. `rankCities` in `site/src/lib/regressar-places.ts` uses each taste as a hard yes/no filter on 13 hand-picked places, then sorts by cheapest housing. A taste can only remove a place; it never changes the order. Find every place-matching feature on the site before changing anything: the Regressar discovery, any map finder, and the Concierge flow's place matching in `site/src/scripts/flow.ts`.

Rules that apply in full:
- CLAUDE.md 14 (live flow, visual check, a change of look needs the operator's yes);
- CLAUDE.md 16 (content/METHOD.md and content/DESIGN_AND_DATA.md);
- CLAUDE.md 17 (golden sample first: Gondomar);
- CLAUDE.md 18 (public pages through curl/Playwright, never the operator's browser, no scripted requests to government sites);
- content/EDITORIAL_POLICY.md (every fact traceable).

Sponsors never change the order of results.

## 1. The team: create six specialised agents

Agents 1, 3 and 4 start in parallel. Agent 2 starts from agent 1's audit, and agent 5 from agent 3's Gondomar rows. Each writes to `ops/research/81_map/<agent>.md` and returns a summary of 10 lines or fewer.

1. **UX researcher** (has run usability for Airbnb and Apple Maps).
   - Audit the map as a first-time reader, on a phone at 390 and a desktop at 1440 on a fast connection, using headless Playwright with screenshots.
   - Cover the first five seconds, search, choosing a place, the card, going back, the paid analysis, and the paths into the map from the home and from /regressar.
   - Read the map's own events (lib/track.ts) for where readers stop, if any data exists.
   - Output: the 10 problems that cost readers the most, ranked, each with a screenshot and one proposed fix.
2. **Art director** (the one Belmond or Claridge's would hire; the same brief as the golf-mode designer: warm Algarve-summer light, restraint, no clip art).
   - From the audit, redesign the map chrome and the municipality card. Keep what the operator already likes: the 3D views, full-bleed photography, the ivory, green and gold palette, Playfair and Manrope.
   - Typography, spacing, motion (films must move), the card's hierarchy, and how services show on the card.
   - Build it on the Gondomar card and the national view only.
   - Deliver before-and-after screenshots for desktop 1440 and phone 390.
3. **Data engineer** (GIS and open data, Portugal).
   - Build `content/facts/map/services/` for all 308 municipalities: one row per facility, with source, licence, date checked, coordinates and drive time from the municipality's town hall (the same origin as the golden sample).
   - Layers, in order:
     1. Health: the nearest public hospital with an emergency department (urgência), the nearest centro de saúde, private hospitals, pharmacies (count).
     2. Schools: international schools (curriculum and language), private schools, public secondary schools.
     3. The beach (Blue Flag or official bathing water).
     4. Airport.
     5. Train station (long-distance).
     6. Food: a defensible, sourced signal, such as the Michelin Guide's listing per municipality, municipal markets, or the restaurant density from OpenStreetMap. State the method; never "best food".
     7. Golf (reuse the golf data).
     8. Culture: museums and theatres.
   - Prefer published open-data files (dados.gov.pt, the SNS transparency portal, DGEEC, APA) and OpenStreetMap (ODbL: attribution on the map).
   - Drive times: do not hammer the public OSRM demo server. Run OSRM locally on the Portugal extract if the workspace allows; otherwise propose the route to the operator before running anything.
   - Anything only reachable by scripting a government site: stop and list it for the operator.
   - Check Gondomar's rows against the hand-checked golden sample (`content/facts/map/places/gondomar/`). Every difference is either explained or fixed.
4. **Ranking engineer** (built recommendation systems; explains every result).
   - Replace the hard-filter, cheapest-first logic with one shared engine used everywhere a reader picks a place, over all 308 municipalities.
   - Budget stays a hard limit (the existing affordability maths and its tests stay).
   - Each taste becomes a score from the data engineer's table, built from drive time and distance decay (for example: full at 10 minutes or less, zero at 45 or more) and counts within a radius, never a yes/no.
   - The reader can mark a taste as essential or nice to have, with visible weights.
   - Results are spread across regions, so the top five are not all in one metro area.
   - Every result shows its two or three reasons in numbers (for example: "International school 12 min · beach 17 min · 380 € a month under your budget") and the trade-off against the next result.
   - No hidden weights and no paid ranking. Document the method in `docs/MATCHING.md`, in plain words, as a reader-facing "how we rank".
   - Tests:
     1. Changing any taste changes the order whenever the data differ (a property test over random taste sets).
     2. "Beach" moves coastal places up.
     3. "International school" moves Cascais, Oeiras and the Porto metro up.
     4. "Golf" moves Loulé and Albufeira up.
     5. Gondomar fixtures with exact expected numbers.
   - Signal (DESIGN_AND_DATA): each taste and weight change is one event, with the consent rules unchanged.
5. **Card writer** (head-concierge voice, content/METHOD.md). Writes the service lines for the Gondomar card in PT, EN and FR: what a reader sees in five seconds, then the detail. Free vs paid:
   - Free on the card: the nearest emergency hospital, the nearest centro de saúde, the nearest international school, the number of schools within 20 minutes, the beach, the airport, plus one food line if the data engineer's signal holds.
   - Paid analysis: the full lists with addresses and registry numbers, as in the golden sample.
6. **Independent QA and fact-checker** (has not seen the work).
   - Checks 30 random service rows against their sources.
   - Runs the ranking tests and tries to break the engine with odd inputs.
   - Runs `node scripts/check-content.mjs`, `node scripts/check-parity.mjs`, the build and `node scripts/visual-check.mjs`.
   - Checks the Gondomar card and the matching on a phone and a desktop.
   - Reports CONFIRMED, CORRECTED or BLOCKED for each item before anything goes to the operator.

## 2. Order of work (golden sample first)

1. Audit (agent 1) and data for Gondomar plus its neighbours (agent 3). The ranking engine is built on all 308 with whatever layers are ready, and tested.
2. The Gondomar card in the new look (agents 2 and 5), and the new matching on /regressar and the map finder.
3. **Stop and send the operator:**
   - before-and-after screenshots, desktop and phone;
   - three example searches showing the results now change with taste (for example: "international school + beach", "food + quiet", "golf"), each with its reasons;
   - the acceptance list, ticked.
4. Only after his yes:
   - roll the card out to all 308;
   - move the visual-check baseline (`--update`);
   - go live under D67.

## 3. Report to the operator

1. Plain text, one page, English, with the screenshots attached.
2. Order:
   1. the 10 UX problems and what was fixed;
   2. the new card;
   3. how matching works now, in five lines;
   4. which data layers cover how many of the 308, and which are missing and why;
   5. what needs his decision (sources, drive-time routing, food signal).
3. Write each decision to ops/DECISIONS.md.
4. Update row 81 in ops/QUEUE.md.
