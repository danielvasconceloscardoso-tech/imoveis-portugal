# Prompt 81, agent 6: independent QA and fact-check (10 Nov 2026)

Checked: commit d0ffa9e, as a detached checkout. I saw none of this work being made. Every line below is something I ran or read myself. Where I could not check, the row says BLOCKED and why.

How I worked:
- My own install (`npm ci`) with the pinned test runner 1.56.1, driving the machine's own Chromium. Build: `WORKERS_CI_BRANCH=main npx astro build`, 7,873 pages, exit 0. Served on 127.0.0.1 only, stopped by PID.
- Browser checks at 1440×900 and at 390×844 with touch and an iPhone user agent, in PT, EN and FR. Analytics blocked; every `/e/` page aborted and recorded.
- Drive times re-routed in-process on the data engineer's local graph (same engine, so this proves the table is reproducible, not that the engine is right). Independent bounds: the hand-checked route files, straight-line distance and road class.
- No scripted request to any government server. Public pages by plain GET at human pace; one search tool for facts with no direct page.
- Screenshots, scripts and logs are in the QA scratch folder (`…/scratchpad/p81/qa/`: `shots/`, `scripts/`, `break.log`, `e2e.log`, `visual.log`, `visual-main.log`).

Counts: A 30 rows: 25 confirmed, 4 corrected, 1 blocked. A doubts 5: 2 confirmed, 3 corrected. B 9: 7 confirmed, 2 corrected. C 7: 5 confirmed, 2 corrected. D acceptance 19: 14 confirmed (items 4 and 13 only as far as a headless browser shows), 4 corrected, 1 blocked. D other 17: 12 confirmed, 5 corrected. E 7: 6 confirmed, 1 corrected.

## A. Service data: 30 random rows

Draw: Python `random.Random(8106)`, slugs sorted; two picks per layer, one more Blue Flag beach, one more hospital; picks 1 to 4 forced to islands, 5 to 8 to places more than 60 minutes from the sea. "Bound" = straight-line km, road km and the average speed they imply.

| # | Place, layer | Table says | Verdict | Evidence |
|---|---|---|---|---|
| 1 | São Roque do Pico, `er` | null | CONFIRMED | Pico has health centres and no hospital; patients are sent to Horta (regional press). No road leaves the island. |
| 2 | Funchal, `cs` | Centro de Saúde do Bom Jesus, 2 min, 0.7 km | CONFIRMED | Rua das Hortas 65, Funchal (directory and press). 0.3 km straight. |
| 3 | Santa Cruz da Graciosa, `ph` | null | CONFIRMED | None of the five groups' lists in `inputs/hospitals_list.csv` holds a unit on Graciosa. No second source read. |
| 4 | Câmara de Lobos, `isch` | International Sharing School, Madeira, 11 min, British | CONFIRMED, curriculum not verified | The school's own site lists a Madeira campus. 6.6 km straight, 8.5 km road. Its landing page states no curriculum. |
| 5 | Arraiolos, `sec_n20` | 1 | CONFIRMED | Escola Básica e Secundária Cunha Rivara (ministry list, code 702889), 2 min. The next two are 21.6 min away, outside the 20. |
| 6 | Mora, `beach` | Albarquel, 94 min, Blue Flag, transitional | CONFIRMED | Blue Flag association page: Albarquel, Setúbal, code PTCH2C, flag season 4 Jun to 15 Sep 2026. 81 km straight, 112.5 km road, 72 km/h. |
| 7 | Oliveira do Hospital, `air` | OPO, 142 min, 193 km | CONFIRMED (bound) | 119 km straight, 82 km/h. Lisbon is farther. |
| 8 | Marvão, `rail` | Ródão, 59 min | CONFIRMED | Intercidades stops at Ródão (Wikipedia, station page). 38.5 km straight, 55.7 km road. |
| 9 | Penela, `food.mich_n30` | 5 | CONFIRMED | MA, O Palco, Refeitrº, SAFRA_, Solar do Bacalhau: each has its page on guide.michelin.com (plain GET, HTTP 200), same town and point. All five are in Coimbra, 25.2 to 29.2 min away; four of them are within 2.3 min of the 30-minute edge. |
| 10 | Vila Real de Santo António, `food.mkt_n20` | 3 | CONFIRMED (OpenStreetMap rows only) | Mercado Municipal 1.8 min, Monte Gordo 7.5, Altura 12.2. |
| 11 | Viseu, `golf` | Oporto Golf Club, 82 min | **CORRECTED** | Montebelo Golfe, 27 holes, Farminhão, Viseu, about ten minutes from the city (Visit Portugal and course directories). It is not in the list. |
| 12 | Peso da Régua, `museum` | Museu do Douro, 4 min, 3.2 km | CONFIRMED | 0.2 km straight; the 3.2 km is the one-way system. A walk is shorter. |
| 13 | Montijo, `pop` | 55,682 | CONFIRMED | Equals the INE file in `inputs/` and the census table on Wikipedia (whose first paragraph says 55,689). |
| 14 | Santa Cruz (Madeira), `area_km2` | 81.31 | BLOCKED | Equals the INE file in `inputs/`. Wikipedia says 81.50 from an older edition. The 2022 figure cannot be re-read without a government site. |
| 15 | Figueira da Foz, `er` | Hospital Distrital, 8 min | CONFIRMED | A medical-surgical emergency department (nurses' union, internal-medicine journal). 1.9 km straight, 5.1 km over the bridge. |
| 16 | Condeixa-a-Nova, `cs` | Centro de Saúde de Cernache, 7 min | **CORRECTED** | Condeixa has its own health centre 0.2 min from the town hall: USF Fernando Namora and USF Condeixa, Rua Dr. Simão da Cunha (`places/condeixa-a-nova/health.csv`, regulator's register). OpenStreetMap does not map it. |
| 17 | Vidigueira, `ph` | Hospital CUF Sines, 101 min | CONFIRMED | The group's own page names Hospital CUF Sines. 97 km straight, 108 km road. |
| 18 | Seixal, `isch` | Seixal International School, 11 min, curriculum null | **CORRECTED** | It exists and teaches Cambridge Primary, ages 3 to 11 only (school directory). The line "International school 11 min" will be read as covering every school year. |
| 19 | Montemor-o-Velho, `sec_n20` | 5 | CONFIRMED (OpenStreetMap rows only) | One in town, three in Figueira da Foz at 16 to 17.5 min, one in Soure at 19.7. |
| 20 | Vendas Novas, `beach` | Albarquel, 45 min (44.7) | CONFIRMED | As row 6. 44 km straight, 54.6 km road. |
| 21 | Torre de Moncorvo, `air` | OPO, 143 min | CONFIRMED (bound) | 136 km straight, 186 km road, 78 km/h. |
| 22 | Porto de Mós, `rail` | Caxarias, 36 min | CONFIRMED | Intercidades stops at Caxarias (Wikipedia). 26.5 km straight. |
| 23 | Alenquer, `food.mich_n30` | 2 | CONFIRMED | Tasco da Ilda (Azambuja) and Taberna Sakra (Alverca, Bib Gourmand 2026) on the guide's own pages. |
| 24 | Aveiro, `food.mkt_n20` | 9 | CONFIRMED (OpenStreetMap rows only) | Nine names, no two within 200 m. |
| 25 | Pombal, `golf` | Oporto Golf Club, 98 min | **CORRECTED** | Four courses at Óbidos (Praia d'El Rey, Bom Sucesso, Royal Óbidos, West Cliffs) are nearer and missing from the list. |
| 26 | Angra do Heroísmo, `museum` | Museu de Angra, 1 min | CONFIRMED | 0.2 km from the town hall. |
| 27 | Amares, `pop` | 18,595 | CONFIRMED | INE file and Wikipedia agree. |
| 28 | Mortágua, `area_km2` | 251.18 | CONFIRMED | INE file and Wikipedia agree. |
| 29 | Póvoa de Varzim, `beach` | Zona Urbana Sul II, 1 min, Blue Flag | CONFIRMED | Association page: code PTCW9M, flag season 2026. 0.8 km. |
| 30 | São Vicente, `er` | Hospital Dr. Nélio Mendonça, 37 min | CONFIRMED | Madeira's central hospital. 20.7 km straight, 32 km road. |

All 18 timed rows re-routed on the local graph to the same tenth of a minute.

### The five doubts

| Doubt | Verdict | What is true |
|---|---|---|
| 1. Braga and Coimbra hospital pins | **CORRECTED** | **Braga:** the OpenStreetMap outline is the hospital (Sete Fontes, postcode 4710-243, the regulator's own address). The regulator's pin (41.5759, −8.4252) falls on Avenida do Cávado in Palmeira, 2.3 km away. So the table's 7 min is right (5.8 to the helipad side, 7.0 to the outline's centre) and the hand-checked 5 is to the wrong point. The same pin makes Amares 12.7 where the hospital is 17.5, and Vila Verde 10.0 where it is 16.3. **Coimbra:** both points are on the campus. 5.0 min reaches the avenue at no. 185, 300 m short of the building; 5.5 reaches Praceta Mota Pinto; 6.8 the building's centre by an internal road. True value: 5 to 7. Neither card is live on the new look, but the roll-out with "hand-checked first" would print Braga 5, Amares 13, Vila Verde 10. |
| 2. Gondomar: Santo António or São João | CONFIRMED | A tie. Hand-checked 13.3 against 13.4; local graph 14.4 against 14.4. The card names Santo António, 13 min (hand-checked). The table says 14. "The nearest" rests on a tenth of a minute. |
| 3. `psch_n20` 61 never reaches a card or a score | CONFIRMED | Not in the engine's measures, not in `match.json` rows, not in `gondomar.json`, not in the card text in three languages. Same for `pharm_n`, `rest_n`, `rest_per_1k`, `ph_n20`, `er_cand`. |
| 4. Three interior places over 45 minutes | **CORRECTED, all three** | Drawn with the same seed: **Valença** (48 min to Viana): the public hospital of Ponte de Lima has a basic emergency department (the table's own `er_cand`, 29 min) and Monção has one in its health centre. **Sernancelhe** (47 to Lamego): the basic emergency service at Moimenta da Beira names Sernancelhe in its own area. **Góis** (47 to Coimbra): the one at Arganil names Góis in its area. Sources: municipal documents and press; the official list is on a government site. |
| 5. Null written as 0 | **CORRECTED** | `summary.json` and `match.json`: every null stays null (all 12 measures compared, 308 places, 0 differences). The card prints words, never 0 (tried on Corvo, Barrancos, São Roque do Pico in a patched scratch copy). But: (a) **Fafe `golf.min` = 0**: the course's point is the town centre, a stand-in (`content/facts/golf/NOTES.md` says so). The result line reads "Golf 0 min". (b) Golf is null, "no course on the island", for all of São Miguel and Terceira, which have courses (Batalha, Furnas, Terceira). (c) Result lines print a true sub-minute time as "0 min" (Vizela train, Calheta beach); the card says "under 1 min". (d) `sec_n20` = 0 in 23 places means "no school found by name": the card says "no figure yet", the engine scores 0 and "essential" leaves the place out. Which of the 23 are true zeros I did not check. |

Coverage and row counts in `data.md` recounted and equal: 7,913 facility rows, 20,353 access rows, 73 / 192 / 82 / 89, 38 over 45 minutes, 60 with a nearer candidate.

## B. The ranking engine

| Check | Verdict | Result |
|---|---|---|
| `npm run test:match` | CONFIRMED | 19 contracts passed, 0 failed. |
| `npm run test:regressar` | CONFIRMED | 83 PASS lines, 0 failed (11 + 8 + 11 + 8 + 9 + 7 + 10 + 19). |
| `npm run test:config` | **CORRECTED** | Exit 0, no error, with a real install. The ranking note's 16 errors were the missing packages. |
| `match.ts` against `docs/MATCHING.md` | CONFIRMED, one line wrong for a reader | Weights 3 and 1, every curve, the log scale (300 per km² = 0.5), ties (points, cost, slug), two per region in the first five, budget on the unrounded cost, essential at zero or without data leaves a place out with its reason, 57 and 4 without a median: all agree. The worked example uses the test table (international school 12 min, score 0.96). The real card says 15 min (score 0.90). |
| My own script (`scripts/break.mts`, 70 checks) | CONFIRMED | 0 failures. No tastes; all ten; all essential (59 left); budget 0, 1 €, 10 million, NaN, negative, strings, null, object, array, true, in both modes; unknown and hostile taste names; duplicates; garbage places; a place with every value null; Corvo; determinism; 25 shuffles; taste order; adding a taste never lowers points (73,477 checks); a weight from 1 to 3 never lowers points or the points order of a place at 1.00; every score and total recomputed by hand from `match.json`; every reason is the place's own number; trade-off numbers and direction; 200 random searches with no essential at zero, 308 always accounted for, the spread rule kept. |
| Sponsors never change the order | CONFIRMED | Read and grepped for partner, sponsor, development, project, pin, selection, paid, featured, boost, and for any sort or filter after the engine: `lib/match.ts` (imports `./housing` only), `lib/housing.ts`, `lib/match-table.ts`, `lib/match-data.ts`, `lib/match-copy.ts`, `scripts/build-match-table.mjs` (reads `summary.json`, `prices.json`, `tiles.json`, the municipality points, the photo list), `lib/regressar-places.ts` `rankCities`, `scripts/regressar.ts`, `scripts/regressar-pt-match.ts`, `scripts/map-finder.ts`. Each caller shows the engine's list in the engine's order and only cuts its length. One thing outside the results: `map-v3.ts` line 610 still draws the name of a municipality with a partner project before others of its size. |
| The three examples at 6,000 € net, rent | CONFIRMED | Engine and browser (`/en/us/regressar/`) give: Gaia, Matosinhos, Almada, Oeiras, Cascais / Silves, São Brás de Alportel, Cantanhede, Penela, Vila Viçosa / Lagoa, Silves, Sintra, Almada, Oeiras. First lines as the note quotes them. |
| Do the lists hold for someone who knows Portugal | **CORRECTED** | See below. |
| `build-match-table.mjs --check` | CONFIRMED | `match.json` is up to date. |

Where the lists do not hold:
1. **Golf.** The course list has no course in Óbidos, Viseu, Torres Vedras, the Ribatejo or the Azores (it was built for five regions, `content/facts/golf/NOTES.md`). Óbidos is 297th of 304 on golf and is left out when golf is essential ("golf 52 min"). Ponta Delgada reads "no data".
2. **Golf, the order.** Eight places score 1.00, then the lower cost decides. So Almada and Oeiras stand above Loulé (0.95, 14 courses in the municipality, 13 min from the town hall) and Cascais.
3. **One taste alone.** Many places reach the cap (beach 56, food 32, culture 50, hospital 61), and the cheapest comes first. On the Portuguese page: "Praia" gives Horta, Madalena, Calheta, Murtosa, Mira. "Gastronomia" gives Paços de Ferreira, Santo Tirso, Santa Maria da Feira, Famalicão, Guimarães. "Arte e arquitetura" gives Golegã first. "Aeroporto" counts Pico and Porto Santo like Porto. Each is true to the rule and the page says ties go to the lower cost.
4. **Silves first for "food + quiet"** is explained by its own numbers: 11 listed restaurants within 30 min (Porches, Lagoa, Portimão, Albufeira, Lagos; I read the 11 rows), 7 markets within 20, 56 residents per km². Quiet is the whole municipality's density while food is a 30-minute circle, so a rural municipality next to a city scores on both. Penela's five restaurants are all in Coimbra, 25 to 29 min away.
5. **International school.** Almada's school (7 min) teaches ages 1 to 13; Seixal's ages 3 to 11. 14 of the 48 schools have no curriculum checked. The count within 30 min counts campuses (Cascais: 28).

## C. Repo checks and build

| Check | Verdict | Result |
|---|---|---|
| `node scripts/check-content.mjs` | CONFIRMED | Exit 0. |
| `node scripts/check-parity.mjs` | CONFIRMED | Exit 0. Working tree clean after it. |
| Build | CONFIRMED | Exit 0, 7,873 pages. origin/main builds 7,411; the 462 more are the new event pages. |
| `node scripts/visual-check.mjs --dist …` (no `--update`) | CONFIRMED | 9 of 24 fail, with the art note's figures: map 16.00 / 14.47, gondomar 17.44 / 21.90, arrow 13.14 / 9.24, simulator 6.88 / 16.19, concierge 2.19 (desktop, size changed). |
| "map, gondomar, arrow differ on purpose" | **CORRECTED** | They also fail on a build of origin/main, before any of this work: map 15.24 / 11.95, gondomar 15.66 / 20.23, arrow 12.42 / 6.25. The baseline (4 Nov, commit 9f6c008) was already out of date for the map pages. The check cannot tell this work's change from the older one. |
| "simulator and concierge already failed on the parent" | CONFIRMED | Same figures on origin/main: 6.88 / 16.19 and 2.19. Commit 1572ee1 (5 Nov) is in main and later than the baseline. |
| `npx playwright test --trace off`, all projects | **CORRECTED** (never run before) | 198 tests: 160 passed, 38 failed. Table below. The pull-request workflow runs this suite, so it would fail as the branch stands. |

| Spec (failures) | Message | Stale spec or wrong page |
|---|---|---|
| `experience.spec.ts:20` edition loads `/en/il/` (2) | expected 200, received 404 | Stale. The Israel edition was hidden on main on 8 Nov. Not this work. |
| `main-map.spec.ts:57` entry, keyboard Skip and passive finish (8) | waits for `[data-map-arrival-skip]`; welcome expected to leave by itself | Stale. The welcome now stays and has no Skip. Asserts the old approved page. |
| `main-map.spec.ts:100` reduced motion bypasses entry (8) | welcome expected hidden, is visible | Stale, same reason. It does show that the welcome appears under reduced motion. |
| `main-map.spec.ts:159` search opens a first-fold card (8) | `.m3-pp > span` not in the viewport | Stale. On the new Gondomar card the price block sits under the services; the first fold carries the price as a small line. |
| `main-map.spec.ts:238` compact portrait keeps the price visible (4) | same | Stale, same. |
| `main-map-controls.spec.ts:356` place questions by keyboard (4) | waits for `[data-q="life"]` | Stale. The new Gondomar card has no such question. |
| `regressar.spec.ts:220` and `:241` (4) | expected 2, received 3; expected 5, received 6 | The spec is wrong, the page is right. `Regressar.astro` line 91 gives the salary result section the bare attribute `data-r-result`; each ranked row carries `data-r-result="<slug>"`. The spec counts both. Inside the list I count 5. These are the ranking engineer's new tests; they had never run. |

No map spec was changed in this branch (`git diff origin/main...HEAD -- site/tests/e2e` touches only the three regressar files).

## D. The Gondomar card and the map, as a reader

### The acceptance list (art.md §10)

| # | Item | Verdict | What I saw |
|---|---|---|---|
| 1 | Card with photograph, name and line before the map is ready | CONFIRMED | Name, line and services in the page 0.3 to 0.6 s after navigation, before any canvas exists. The photograph's file was still loading at that instant. |
| 2 | Desktop 1440×900: name, line, budget fact and the first five service lines, no tap | **CORRECTED** | Four lines are clear. PT and FR: the fifth (beach) ends 5 px under the Concierge button. EN: the budget fact takes two lines and the fifth line is hidden behind the button. |
| 3 | Phone, on opening: photograph, name, line, budget fact, Concierge button | CONFIRMED | The card is 63% of the map (53% of the screen). All five in view, three languages. |
| 4 | Phone: one upward swipe anywhere opens the card; the text scrolls only then | CONFIRMED in headless Chromium with real touch events. BLOCKED on a real iPhone | First swipe: full height, text not scrolled. Second: text scrolls. A pull down from the top puts it back. |
| 5 | Phone, fully open: service lines visible without a tap | **CORRECTED** | At 390×844 all seven lines show at once in PT and FR, six in EN. The note says three. |
| 6 | Concierge button reachable at every height | CONFIRMED | Half, full and scrolled. |
| 7 | Free lines are exactly the seven | CONFIRMED | Hospital, health centre, international school, public secondary schools, beach, airport, Michelin Guide. |
| 8 | Full lists no longer on the free card | CONFIRMED | No school or hospital list by name in the card text. What moved to paid is as §3 says. |
| 9 | Hand-checked values through one override | CONFIRMED | 13, 2, 15, 17, 21 with the hand-checked names. See the date defect below. |
| 10 | A missing value is words | CONFIRMED | Ten other places patched into my scratch copy only: Corvo "noutra ilha", "nenhuma na ilha", "ainda sem número"; Barrancos "1 h 41 min"; Mértola in French "1 h 13"; Condeixa "menos de 1 min". No zero, no placeholder, no "em breve", no error. |
| 11 | Every number has its source behind "Fontes", dated | CONFIRMED, with two dates | Every line has one. Drive times are listed twice, 10 Nov and 3 Nov. |
| 12 | PT, EN and FR in parity | CONFIRMED | Three cards read line by line; parity check passes. The matching lines live in `lib/match-copy.ts`, outside the parity check; all three languages are there. |
| 13 | The photograph moves; reduced motion slows it | CONFIRMED as computed style. BLOCKED as motion | `m3-drift` 22 s; 60 s under reduced motion; sheet and line transitions 0 s. How it looks cannot be judged in software graphics. |
| 14 | Developments keep their labels; pending partners hidden | CONFIRMED | Parceiro / Seleção, Our partner / Our pick, Partenaire / Sélection. Nothing says Sponsored. No project in `projects.json` is marked pending today, so there is nothing to hide. |
| 15 | Each line opened and each sheet height is an event | CONFIRMED | `map/sv/{er,cs,isch,sec,beach,air,food}`, `map/sheet/full`, `map/sheet/half` fired and counted. |
| 16 | Nothing new loaded before it is needed | **CORRECTED** | Up front: the map script grew from 42.6 to 49.0 kB gzip, the map stylesheet from 13.2 to 16.3. On first opening of the finder: 2.6 kB (panel) + 8.1 kB (engine and its words, not in the note) + 19.7 kB (table). Nothing of the finder loads before it is opened. No new library. |
| 17 | Keyboard: every line a button with a focus ring | CONFIRMED | 2 px ring on every stop. Enter and Space open and close a line. Escape closes the card. Screen reader not tested. |
| 18 | Dark mode | BLOCKED | Not tested by me either. |
| 19 | Visual check: only the map pages differ | **CORRECTED** | Section C: the same nine shots fail on origin/main. |

### Everything else

| Check | Verdict | What I saw |
|---|---|---|
| Every number on the card | CONFIRMED | Against `places/gondomar/` and the table: 13.3, 2.4, 14.7, 16.9, 20.9 min; 35 schools (35 distinct names, no doubles); 35 restaurants, 13 with a star; 4 international schools; 31 schools and 11 health units in the paid lists; 128 m² (300,000 ÷ 2,348); 98% in five years (1,184 to 2,348). Lavadores has the 2026 Blue Flag (association page, code PTCQ9M). |
| Words | CONFIRMED | No "best", no advice, nothing from the banned list, no exclamation mark in the services block, the chrome block or the matching lines, three languages. No placeholder leaks. "1 restaurant", "One holds a star", "1 h 13 min" correct. Older copy on the same card: "hidden gems" (EN) and "pépites" (FR) in the Maré block. |
| Foot of the card | **CORRECTED** | It says "Consultado a 10 de novembro de 2026". Five of the seven values were measured on 3 Nov on another server. |
| Seven other places | CONFIRMED, one cut | Braga, Cascais, Viseu, Corvo, Loulé, Mértola, Vila do Conde, both sizes: today's card, no console error, no failed request, no placeholder. On the phone, at the opening height, the Concierge button of Braga, Cascais and Vila do Conde is cut by the card's lower edge (12 px, 31 px and 0 px showing). |
| Search | CONFIRMED | "Lisbon", "Lisbonne": Lisboa first. "Oporto": Porto. "Porto": Porto before Porto de Mós. "Algarve", "Azores": the region. "Gondomr": "Did you mean Gondomar". "xyzq" and a script tag: "No place by that name". Empty box: six places. "silver coast": nothing, as the note says. Enter opens the first hit. Escape closes. |
| Way back, zoom, labels | CONFIRMED | "Portugal" appears after a card closes and leaves at the national view. Plus and minus work. A click on "Porto" opens Porto; on a region's name, the region. Browser Back closes the card. |
| Region tiles on a phone | CONFIRMED | Algarve, Açores, Madeira each framed above the card; three towns as links; credit and caption apart. |
| Budget button | CONFIRMED | Opens its panel; the amount on the button follows the slider. |
| Home page map | CONFIRMED | `/pt/lu/`: the wheel moved the page 1,200 px; one finger moved it 360 px. |
| Golf mode | CONFIRMED | Opens (`?mode=golf`); no golf file in the diff; the golf specs pass. |
| `/regressar` | CONFIRMED | PT: five cards, each links to the map and the link opens the card; each of the six chips changes the list. EN: rows open a panel with "View on map". |
| Finder, desktop | **CORRECTED** | Works: ten tastes, weights 1 and 3 on screen, budget by keyboard and pointer, five results then more, numerals, a result opens its card, Escape closes the card then the finder. Three defects, below. Only one and a half results fit under the controls at 900 px. |
| Finder, phone | **CORRECTED** | Works, with the numerals drawn over the panel. Below. |
| Events | CONFIRMED | All 70 event pages the new code can fire (map/sv, map/sheet, the chrome, the welcome, match/*) exist for all 7 edition folders. Every event I fired has its page. None carries the budget, a typed text or a number of four digits. No POST left the page. |
| Console and requests | CONFIRMED | No page error and no console error on any page I opened. Failed requests: only map tiles cancelled by the camera moving. No third-party request from the new code. |
| Keyboard details | **CORRECTED** (small) | One stop in the card has no name (the gallery). After Escape the focus stays on a control inside the closed card. The numerals read "Map marker". |
| Tap targets "44 px or taller" | **CORRECTED** | On the phone card: the budget link is 24 px tall, the IMT link 34, the heart 40×40, the grab bar 22. |

## E. Hard rules

| Check on `git diff origin/main...HEAD` (98 files) | Verdict | Finding |
|---|---|---|
| A person's name | CONFIRMED none | Commit author and committer are the brand on all 17 commits. |
| An email that is not the brand's | CONFIRMED none | |
| A secret | CONFIRMED none | |
| A model name | **CORRECTED** | Six commit messages end with a co-author line naming an AI model and a session link: de57764, 5a988f9, 696a83a, e9ce1a3, a01172f, ce8a2ff. Three notes print a scratch path that names the tool: `art.md` lines 7 and 163, `ranking.md` line 142, `ux.md` line 15. |
| `wrangler.jsonc`, DNS, `content/partners/`, `ops/snapshots/baseline`, golf mode files | CONFIRMED untouched | The only "golf" paths are the two services data files. |
| New network call to a third party | CONFIRMED none | Three same-origin fetches: `/data/match.json`, `/data/match-photos.json` (twice). |
| A photo without a licence line | CONFIRMED none | No site image added. The welcome uses a photograph already in `content/media/SOURCES.md`. The 18 added images are screenshots in `ops/research/81_map/shots/`. |

## Defects, worst first

Marked **[before the sample]** where the operator would see it in what he is sent.

1. **[before the sample] Phone: the map's numerals are drawn on top of the finder.** `/en/us/map/` at 390×844 → "Choose by what matters to you" → International school, Essential, Beach. The numerals 1 to 5 sit over the weight buttons and over the first result's name. A reader cannot read "Nice to have" or "Vila Nova de Gaia". Screenshot `en-phone-finder-isch-beach.png`.
2. **[before the sample] "Moved down" is printed on places that moved up.** `site/src/scripts/map-finder.ts` line 112 tests `m.rank !== m.scoreRank`; `/regressar` tests `rank > scoreRank`. Map finder, 300,000 €, international school essential + beach: Sintra (4th, 5th by points) and Palmela (5th, 6th by points) both read "Moved down: at most 2 places per region in the first 5". Porto is the one that moved down. Both sizes, three languages. Screenshot `en-desktop-finder-moved-down.png`.
3. **[before the sample] The golf layer is incomplete, and "golf" is one of the three examples.** `content/facts/map/services/facilities/golf.csv` reuses a list made for five regions. Missing at least: Óbidos (four courses), Viseu (Montebelo), the Azores (three). Effects: Óbidos 297th of 304 and left out when golf is essential; Viseu "82 min"; Pombal "98 min"; Ponta Delgada "no data"; the README's "islands without a course: null" is wrong for São Miguel and Terceira. Fafe reads "Golf 0 min" from a stand-in point. Either complete the list or say so next to the example.
4. **[before the sample] The art note's finder example is not what the finder shows.** `art.md` §7 gives Gaia, Matosinhos, Almada, Oeiras, Cascais at 300,000 €. The finder gives Gaia, Matosinhos, Almada, Sintra, Palmela: Oeiras and Cascais are above that budget. The list quoted is the 6,000 € rent list.
5. **[before the sample] The card's foot gives the wrong date for five of its seven numbers.** It says 10 Nov. Hospital, health centre, school, beach and airport were measured on 3 Nov on the public server. `scripts/map-data/place_services.py` line 110 always writes the table's date. The card writer asked for the 3 Nov date on hand-checked cards (`copy.md` §5).
6. **Roll-out with "hand-checked first" would name hospitals that are not emergency hospitals.** I ran the builder for all hand-built places without writing anything. Coimbra: "Maternidade Daniel de Matos, 3 min", a maternity. Condeixa-a-Nova: "Hospital Geral (Covões), 14 min", whose emergency service became a walk-in clinic on 1 Nov 2025 (press). Espinho, Valongo, Vila do Conde and Gaia would name a unit other than the one in the table's list (4, 1, 1 and 1 min against 17, 14, 5 and 6); whether those four have an emergency department I did not verify. Braga, Amares and Vila Verde would use the wrong pin (doubt 1). Gondomar is not affected. This bears on the operator's choice between the two sources.
7. **The hospital layer misses nearer public emergency departments: 3 of 3 sampled.** Doubt 4. Known and said on the card over 45 minutes. In the ranking, "hospital essential" leaves 53 places out on this list.
8. **The test suite fails: 38 of 198.** 28 map tests and 4 keyboard tests still assert the old card and the old welcome and were not updated; 4 new regressar tests fail on their own selector; 2 are older (Israel). The pull-request workflow would stop.
9. **The visual check says nothing about this work on the map pages.** Section C. The baseline is out of date on main for five pages.
10. **Desktop first view shows four service lines, not five;** in English the fifth is behind the Concierge button. Screenshot `en-desktop-first.png`.
11. **One taste alone returns the cheapest place at the cap.** Section B, point 3. Not a bug. The operator will see Horta for "Praia" and Paços de Ferreira for "Gastronomia" on the Portuguese page.
12. **"International school" counts schools for young children only, and counts campuses.** Seixal (ages 3 to 11), Almada (1 to 13); "28 within 30 min" for Cascais; 14 schools with no curriculum checked.
13. **Result lines say "0 min".** Vizela train, Calheta beach, Fafe golf, three languages. The card says "under 1 min".
14. **Numerals cover names and pins on the map.** Desktop: 1 and 2 sit on "Porto". Phone, after a result opens: a numeral sits on a development's photo pin and on "Vila Nova de Gaia". Screenshots `pt-desktop-finder-isch-beach.png`, `en-phone-finder-place.png`.
15. **Today's cards on the phone: the Concierge button is cut at the opening height** on Braga, Cascais, Vila do Conde. One swipe brings it back. Screenshot `other-phone-braga.png`.
16. **Tap targets under 44 px** on the phone card (budget link 24, IMT link 34, heart 40, grab bar 22).
17. **Mixed units in the finder.** US edition: budget in dollars, monthly amounts in euros, no bridge. Portuguese lines print "2026-Q2" where the card says "2.º trimestre de 2026".
18. **Six commit messages and three notes name an AI tool.** Section E.
19. **`docs/MATCHING.md` gives Gondomar's international school as 12 minutes** (test table). The card says 15.
20. **`data-r-result` is used for two things** (`Regressar.astro` line 91 and each ranked row). `regressar.ts` line 222 sets `aria-current` on the salary section too.
21. **Smaller:** the numerals are announced as "Map marker"; one unnamed focus stop in the card; focus stays in the closed card after Escape; beach names print as registered ("CDS", "Azul", "Zona Urbana Sul II") and two swimming pools are called "a sea beach" (Ponta Delgada, São Roque do Pico); Corvo's foot cites the mainland health service; a partner project still moves a municipality's name up the label order (`map-v3.ts` line 610).

## What I could not check

1. **A real iPhone and real Safari.** The sheet's swipe and the home page scroll were driven with touch events in headless Chromium only.
2. **Motion as a viewer sees it.** Software graphics here. I checked that animations exist and their durations.
3. **Dark mode, landscape, tablets, a screen reader.**
4. **Drive times against a second engine.** I used the same local graph, the hand-checked files (Gondomar, Braga, Coimbra, Amares, Vila Verde, Condeixa) and distance bounds. I sent nothing to the public routing server.
5. **Anything that needs a government site:** the official list of emergency departments, the 2022 area of Santa Cruz, the school registers, the regulator's register. Rows 3, 10, 19 and 24 rest on the layer's own inputs.
6. **The Michelin total of 201 and the 16 unmatched Blue Flag beaches.** I read seven restaurant pages and three beach pages.
7. **Whether the 14 airports have scheduled flights today.**
8. **Which of the 23 places with no secondary school by name really have none.**
9. **Whether the units at Espinho, Valongo, Vila do Conde and Gaia have an emergency department** (defect 6).
10. **The live site.** Everything was a local build of d0ffa9e.
11. **The fix the art director is making now.** I judged d0ffa9e only.
12. **Figures on the card that this work did not change:** the IMT line, the flight times, the new-build price range.
