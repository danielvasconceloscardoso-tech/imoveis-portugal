# Prompt 81, agent 4: one matching engine for every place finder (10 Nov 2026)

Branch `p81-rank`. Reader-facing method: `docs/MATCHING.md`. Engine: `site/src/lib/match.ts`.

## 1. Every place-matching feature on the site (surveyed before any change)

| # | Feature | Where | What it did before | Use the engine? | What I did |
| --- | --- | --- | --- | --- | --- |
| 1 | /regressar discovery, EN and FR | `components/Regressar.astro`, `scripts/regressar.ts`, `lib/regressar-places.ts` (`rankCities`) | 13 hand-picked places. Six tastes, each a yes/no filter on "has a sourced fact". Sorted by lowest housing cost. One place shown at a time. A taste could only remove places. | Yes | Wired. All 308 places, ten tastes, weights on screen, ranked list with reasons and trade-off, the list re-ranks at once when a taste or weight changes. |
| 2 | /regressar discovery, PT | `pages/[lang]/[ed]/regressar/index.astro` serves the approved prototype `public/previews/regressar-clear/index.html`, a single file with its own inline `places()` | Its own copy of the 13 places. Six chips, each a yes/no filter. Sorted by **highest** cost first. Three shown. This is the page a Portuguese reader sees. | Yes | The file is untouched. `scripts/regressar-pt-match.ts` replaces only its `places()` step with the engine, in the page's own card style: five cards, a weight row per chosen chip, reasons, trade-off, "how we rank". If the table cannot load, the old list stays. **Needs the operator's yes (CLAUDE.md 14): it changes an approved page.** |
| 3 | The two static previews | `/previews/regressar-clear/`, `/previews/regressar-beta/` | Same inline logic as row 2 (noindex preview copies). | No | Not touched. They keep the old logic. Listed so nobody is surprised. |
| 4 | "What this income allows" on /regressar | `components/RegressarBuyingPower.astro` | The reader picks one of the 13 places from a list. No matching. | No | Not touched. |
| 5 | Map search | `scripts/map-v3.ts` `find()` (and the older `map-explorer.ts`) | Text search by name over municipalities, parishes, golf courses, beaches, developments. Order: names that start with the text, then municipalities first. | No (a name search, not a taste finder) | Not touched. **Confirmed: the map has no taste finder today.** |
| 6 | Map label priority | `scripts/map-v3.ts` `rank()` line 575 | Decides which municipality names are drawn first: the selected place, the big cities, then municipalities that hold a partner project, then by drawn size. Not a list of results. | No | Not touched. Flagged for the art director: a place with a partner project gets its label drawn earlier than its size alone would. |
| 7 | Concierge: buildings near a typed place | `scripts/flow.ts` `matches()`, `matchBox()` | Text match of the typed place against each development's place and municipality ("here") or its region and nearby names ("near"), within the budget band. Every card is a developer's building, labelled. Order: the order of the list. | No | Not touched, and no sponsored item can enter the engine (see §7). |
| 8 | One-screen simulator | `lib/sim1.ts`, `components/Sim1.astro` | The reader picks one of ten fixed regions. No matching. | No | Not touched. |
| 9 | Comparable municipalities in the paid analysis | `scripts/map-data/build.py` line 215 (`cmp`) | Three places with the nearest price, yield, coast and city flags, fixed at build time. | No | Not touched. |
| 10 | Map comparison page, saved places, golf mode | `MapComparePage.astro`, `hearts.ts`, `golf-mode.ts` | The reader's own picks side by side; golf mode orders course markers. | No | Not touched (golf mode is off limits). |

## 2. The engine

Files:
- `site/src/lib/match.ts`: the engine. Pure TypeScript, no DOM, no fetch, no dates, no randomness. Imports only `./housing`.
- `site/src/lib/housing.ts`: the affordability maths, moved unchanged (`housingPayment`, `HOUSING_DEFAULTS`, the validation). `lib/regressar-places.ts` re-exports the old names.
- `site/src/lib/match-table.ts`: summary.json row to engine measures; table encode and decode.
- `site/src/lib/match-data.ts`: `loadMatchData()`, one fetch of `/data/match.json`, on first use.
- `site/src/lib/match-copy.ts`: reasons, trade-off, points, coverage and method lines in PT, EN, FR.
- `site/scripts/build-match-table.mjs` (`npm run build:match`): writes `site/public/data/match.json` (308 places, about 75 kB, 20 kB gzipped) and `match-photos.json` (the 76 photographs the map already holds, with alt text). `--check` fails when either is out of date.

Scoring (the same table as `docs/MATCHING.md`; the code constant is `TASTE_RULES`):

| Taste (slug) | Measure from summary.json | 1 at | 0 at | Share |
| --- | --- | --- | --- | --- |
| beach | `beach.min` | 10 min or less | 45 min or more | 100% |
| isch | `isch.min` | 10 min or less | 45 min or more | 70% |
| | `isch_n30` | 4 or more | 0 | 30% |
| schools | `sec_n20` | 5 or more | 0 | 100% |
| health | `er.min` | 10 min or less | 45 min or more | 100% |
| airport | `air.min` | 20 min or less | 90 min or more | 100% |
| train | `rail.min` | 10 min or less | 45 min or more | 100% |
| food | `food.mich_n30` | 10 or more | 0 | 70% |
| | `food.mkt_n20` | 5 or more | 0 | 30% |
| golf | `golf.min` | 10 min or less | 45 min or more | 60% |
| | `golf_n30` | 10 or more | 0 | 40% |
| culture | `cult_n20` | 20 or more | 0 | 100% |
| quiet | `pop` ÷ `area_km2`, residents per km² | 30 or fewer | 3,000 or more (log scale) | 100% |

Rules, each one visible to the reader:
1. Budget is a hard limit, on the unrounded monthly cost. The old `HOUSING_DEFAULTS`, `housingPayment` and every validation limit are unchanged.
2. Scores are rounded to two decimals, then points = Σ weight × score. Essential 3, nice to have 1. The sum is done in whole hundredths, so a tie is a real tie.
3. Essential: a place scoring 0 on it is **left out** (not sunk), and so is a place with no data for it. Each is kept in `excluded` with its reason (`essential-zero` with the value, `essential-no-data`).
4. No data (`null`): no score, no points, the taste is listed in `unknown`, the line reads "no data". A taste needs all its measures; one missing part makes the taste "no data" for that place.
5. Order: points, then lower monthly cost, then slug.
6. Spread: at most 2 per NUTS III region in the first 5 (`spreadByRegion`). A held place comes straight after the five; `rank` and `scoreRank` both travel with the result and the card says "moved down". With too few regions left, the rule gives way.
7. Every result: two or three structured reasons (the two tastes with most points, then budget headroom; the INE median fills in when fewer than two tastes score) and one trade-off against the next result (the taste where the next place gains most points and the one where it loses most; cost stands in when no taste differs).
8. Old names: `art` means culture; `surf` and `business` are still refused as unsupported, never ignored. `rankCities` keeps its name and signature, takes `essential` and `places`, and returns the engine's results plus the photograph and line of the 13 places.

Prices: 304 of 308 have a sale median, 251 a rent median (INE, 2026-Q2, from `site/src/data/prices.json`). Rent mode leaves 57 out with `no-rent-median`; buy mode leaves 4 out with `no-sale-median` (Barrancos, Corvo, Lajes das Flores, Santa Cruz das Flores). Nothing estimated.

Use from a map script (nothing built there; the art director designs the chrome):

```ts
import { loadMatchData } from "../lib/match-data";
import { matchPlaces } from "../lib/match";
import { formatReasons, formatTradeoff } from "../lib/match-copy";
const { places } = await loadMatchData();                     // /data/match.json, fetched once
const found = matchPlaces({ netMonthly: 6000, housingMode: "buy", places, tastes: [{ taste: "beach", importance: "essential" }] });
found.matches[0].id;                                           // slug: open it with ?place=<slug>
formatReasons(found.matches[0], "pt");
```

A map finder that starts from a monthly budget instead of an income passes `netMonthly: budget, budgetShare: 1`. A finder that starts from a purchase price is not supported yet: one small option to add when the map needs it.

## 3. Tests

`cd site && npm run test:match` (also the last step of `npm run test:regressar`). Result on the real table copied from p81-data on 10 Nov: **19 contracts passed, 0 waiting.**

| Test | What it proves | Result |
| --- | --- | --- |
| curves | every breakpoint by hand; null, NaN, negatives are "no data"; shares add to 1 | pass |
| 5. Gondomar fixture | exact measures, the ten scores, rent 722.40, buy 633.55, 7.58 of 10 points, 3.68 of 4, the reason line in PT, EN, FR | pass |
| plain weighted sum | 60 seeded tables: points recomputed by an independent copy of the curves | pass |
| 1. a taste changes the order whenever the data differ | property test, 948 added tastes: each pair's new order follows old gap + weight × score gap, and the order changes exactly when some pair must flip. 922 of 948 changed the order; 540 single-taste swaps all changed it. Before: never. | pass |
| weight change | nice to have ↔ essential follows the same sum; essential at zero or without data is out, with the reason | pass |
| budget | never exceeded, unrounded, both modes; every place is ranked or left out with a reason; exact boundary | pass |
| no data | never a silent zero; unknown and true zero give different reasons | pass |
| spread | at most 2 per region in the first 5; gives way only when no other region is left | pass |
| determinism | same input, same order; order of places and tastes irrelevant; ties by cost, then slug | pass |
| odd inputs | no tastes, all ten essential, zero, negative, NaN, huge budget, garbage tables, 400 random junk inputs: a clear reason, never a throw | pass |
| reasons and trade-off | 2 to 3 reasons, numbers are the place's own, trade-off sides agree with the points; exact lines in three languages | pass |
| nothing commercial | `match.ts` imports only `./housing`; sponsor fields on a place change nothing | pass |
| published table | 308 places, medians equal INE's, built from the repository, under 120 kB, never fixture data | pass |
| rent mode | exactly the 57 without a rent median are left out, with the reason | pass |
| 2. beach, real table | coastal places move up on average, sit well above inland ones; the first twenty are within 15 minutes of a beach | pass |
| 3. international school, real table | Cascais, Oeiras, Porto, Matosinhos, Maia, Vila Nova de Gaia, Gondomar each move up and land in the first quarter; Cascais and Oeiras in the first twenty | pass |
| 4. golf, real table | Loulé and Albufeira move up into the first fifteen | pass |
| 5b. Gondomar, real table | within one minute of the golden sample; differences printed | pass, with two differences (see §5) |

Other checks: `npm run test:regressar` all green (tax 11, FX 8, places 11, eligibility 8, life 9, support 7, preview 10, matching 19). `node scripts/check-content.mjs` and `node scripts/check-parity.mjs` exit 0. Build: 7,712 pages, exit 0.

Not run here:
- `npm run test:config` fails before and after my change on the same 16 errors: `@playwright/test` and Node types are not in the shared install. With those lines filtered out, `src/scripts/regressar.ts` and everything it imports type-check clean.
- The Playwright specs (`npm run test:e2e`) cannot run for the same reason. I updated them (see §4) and checked the same flows with a headless Playwright script instead; QA should run the specs where the dev dependencies exist.
- `site/node_modules` pointed at `/home/user/wt-p80/site/node_modules`, which does not exist. I re-pointed my own link to `/home/user/imoveis-portugal/site/node_modules`. The other three folders have the same broken link.

## 4. Assertions changed

`site/scripts/test-regressar-places.mjs`
1. "all 64 combinations of selected tastes are hard filters" (every match had to carry a fact for every taste) became "all 64 combinations of tastes: none removes a place; without services data each reads no data".
2. "unsupported constraints are never silently ignored": the list `surf, business, quiet, invented` lost `quiet`, which is now a taste. The other three are still refused.
3. Added: "with the place table, tastes reorder the list and an essential at zero leaves a place out".
4. Unchanged: INE prices, photographs and credits, invalid inputs, the exact budget boundary, monotone affordable sets, the mortgage formula, the sourced distances, determinism and the salary-free map link.

`site/tests/e2e/regressar.spec.ts`
5. "an unaffordable beach preference produces an honest no-match rather than a random city" became "a nice-to-have never removes a place; an essential nobody meets gives an honest no-match, not a random city" (its own two-place table).
6. Added: "tastes and weights change the order; every result gives its reasons and its trade-off" (also checks the card without a photograph and no sideways scroll).
7. Both regressar specs now pin `/data/match.json` to `tests/e2e/fixtures/match.fixture.json`, so they do not move when the services data is refreshed.

`site/tests/e2e/regressar-programme.spec.ts`
8. "A sourced city reveals housing power, real schools and actual hospitals" no longer expects the six tastes to leave Matosinhos as the only place; it opens Matosinhos from the ranked list.

## 5. Data: what is in, what still moves

- `content/facts/map/services/summary.json` in this branch is a byte-for-byte copy of the data engineer's final file (branch p81-data, commit 4663331; 308 places, every layer). **At merge, take p81-data's file and run `npm run build:match`;** the table test fails until that is done, on purpose.
- Coverage in the table: beach 308, international school drive 288, hospital 297, airport 308, train 278, golf drive 289, counts 308, density 308. The gaps are islands with no road route, shown as "no data".
- Gondomar against the golden sample: beach 17 (same). Airport 22 against 21. Emergency hospital 14 (Hospital de Santo António) against 13 (Hospital de São João). Both are the data engineer's to explain; the engine only reads them.
- Quiet: residents (`pop`, INE Census 2021) ÷ official area (`area_km2`, INE indicator 0008350, which INE takes from DGT's CAOP), both added by the data engineer at my request, for all 308. For QA: `content/facts/map/README.md` says CAOP is not used until DGT confirms commercial use; this figure comes through INE under CC BY 4.0, and the lead should confirm that is enough.
- **Hospital is a weak layer in the interior.** `er` comes from a compiled list of 56 general public hospitals; basic emergency services in health centres are missing. 38 places read more than 45 minutes (3 of them on islands) and 42 score 0 on hospital; 11 island places have no data. With hospital marked essential, those 53 are left out. `docs/MATCHING.md` says so in plain words. `er_cand` (an unverified nearer hospital) is never read.
- **Food can switch to markets only in one line.** The Michelin counts come from the guide's public listing pages, a source the operator has still to confirm. The switch: `TASTE_RULES.food` in `site/src/lib/match.ts` (the replacement line is written there as a comment), the same line in the tests' hand copy (`HAND.food` in `site/scripts/test-match.mjs`), the Gondomar fixture numbers, and the food rows of the two tables. No table rebuild is needed: `mkt_n20` is already in `match.json`.
- Weak signals left out of every score, as the data engineer advised. How much each would move the order if it were scored (304 places, buy mode):
  - restaurants per 1,000 residents at 30% of food: mean shift 33 places, 175 places move more than 20, only 8 of the first 20 stay. Gondomar's food score would fall from 1.00 to 0.72 on OpenStreetMap coverage alone.
  - private schools added to schools: mean shift 23 places, 108 move more than 20, 8 of the first 20 stay.
  - pharmacies and the unverified nearer hospital (`er_cand`) are never read.

## 6. The three example searches (real table, 6,000 € net a month, rent)

1. International school (essential) + beach: Vila Nova de Gaia, Matosinhos, Almada, Oeiras, Cascais. Porto is held to sixth by the spread rule. First line: "International school 10 min · beach 9 min · €1,232 a month under your budget".
2. Food + quiet: Silves, São Brás de Alportel, Cantanhede, Penela, Vila Viçosa. First line: "11 Michelin-listed restaurants within 30 min · 55.5 residents per km² · €1,284 a month under your budget".
3. Golf: Lagoa, Silves, Sintra, Almada, Oeiras. First line: "Golf 2 min · €1,305 a month under your budget · median rent €9.93/m²".
4. No taste, for contrast: Mêda, Vila Flor, Almeida, Marvão, Mogadouro (lowest cost first).

Screenshots, all on the **real** table, phone (iPhone 13) and desktop 1440, in `the session scratch folder: p81/rank/shots-real/`:
- EN: `isch-beach-phone-list.png`, `isch-beach-desktop-list.png`, `food-quiet-…`, `golf-…`, each with a `-card.png` of the opened place.
- PT: `pt-isch-beach-phone.png`, `pt-isch-beach-desktop.png`, `pt-food-…`, `pt-golf-…` (the Portuguese page has no "quiet" chip, so its second search is food alone).
- FR, phone lists: `…/rank/shots-real-fr/`.
- `…/rank/shots-fixture/` holds earlier runs on the made-up fixture; do not show those to the operator.

### Polish pass (lead's review of the real screenshots, wording and display only, no change to scoring)

1. The trade-off says what it means: "busier, 73 residents per km² against 56 here", "fewer Michelin-listed restaurants within 30 min, 7 against 11 here", "closer to the beach, 4 min against 6 here", "€260 a month less". No "better on / worse on". Same in PT and FR.
2. Residents per km² are whole numbers wherever a reader sees them (the table keeps one decimal; scores are unchanged).
3. When equal points decide the order between two neighbours in the list shown, one line says so: "Some of these places tie on points; the lower monthly cost comes first." It is absent when no neighbours tie and when no taste is chosen.
4. The card's taste lines are in words: "Golf 2 min · 16 golf courses within 30 min · score 1.00 of 1 · nice to have (×1)".

## 7. The Concierge flow

Nothing changed, and nothing should for ranking: it lists developers' buildings near a typed place, every card labelled, in the list's own order. Two notes for the lead:
1. Its order is the order of the projects list (`lib/projects.ts`, passed by `Flow.astro`). No code reorders by payment, but nothing states the rule either. One line in the Concierge ("in alphabetical order") would make "sponsors never change the order" checkable there too.
2. The engine has no way to receive a project, a partner or a sponsor, and a test fails if `match.ts` ever imports anything but the housing maths.

## 8. Signal

One event per change, through `lib/track.ts` `ev()`, listed in `lib/events.ts` (`MATCH_TASTES`, `MATCH_ACTS`) and `ops/METRICS_SETUP.md`: `match/taste/{taste}/{on|off}`, `match/weight/{taste}/{essential|nice}`, `match/show`, `match/place` (the municipality in `place`, first-party store only), `match/none`. Origin `regressar`. Never the income, the budget or the list. Consent rules untouched: no cookie, no identifier, short slugs only. Before this, /regressar sent no events at all (its `regressar:step` signal has no listener).

## 9. For the operator to decide

1. **The Portuguese page.** It is the approved prototype. The engine now drives its "Onde viver" block: five cards instead of three, a weight row under the chips, reasons and trade-off on each card. Yes or no. It also has six chips only; adding hospital, train, quiet and schools there is a second yes.
2. **No taste chosen.** The list is the lowest cost first across 308 places, so it opens on small interior towns (Mêda, Vila Flor). Before, it was 13 hand-picked places. Keep, or ask for one taste before showing a list.
3. **Quiet** = residents per km² (2021 census ÷ official area), 1 at 30 or fewer, 0 at 3,000 or more. A measure of how built-up a municipality is, not of noise.
4. **Food** = Michelin-listed restaurants within 30 minutes (70%) and markets within 20 (30%). It favours the belts around Porto, Lisbon and the Algarve. Restaurants per 1,000 residents is left out as unreliable. The Michelin source needs your confirmation; without it, food becomes markets only (a one-line switch, §5).
5. **Schools** = public secondary schools within 20 minutes. Private schools are left out until the data can tell primary-only schools apart. International schools are their own taste.
6. **Hospital** = the nearest public emergency department only. Health centres and private hospitals are on the card but not in the score. The list misses basic emergency services in the interior (38 places read over 45 minutes): keep the taste as it is, hide it until the list is complete, or stop "essential" from leaving places out on this taste.
7. **Essential at zero leaves a place out** (rather than sinking it), with weights 3 and 1.
8. **Spread**: two per NUTS III region in the first five. Lisbon's metro is two regions (Grande Lisboa, Península de Setúbal), so it can hold four of the five.
9. **Rent mode** shows 251 places; 57 have no INE rent median and are named as left out, not estimated.
