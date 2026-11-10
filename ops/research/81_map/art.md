# Prompt 81, agent 2: the map's look, the municipality card and the finder (10 Nov 2026)

Branch `p81-look`. Nothing here is live. The operator sees the Gondomar sample first and says yes or no (CLAUDE.md rules 14 and 17).

Built on two things only: the Gondomar card and the national view. Every other place keeps the card it has today.

Images, all PNG at device scale 2, are in `/tmp/claude-0/-home-user-imoveis-portugal/686bee09-1d24-5475-8099-3259ef978529/scratchpad/p81/look/final/` (list in section 9). "Before" is the live site on 10 November. "After" is a local build of this branch.

## 1. The five questions (content/METHOD.md), answered before designing

1. **What should they feel?** "I have arrived somewhere I could live, and the questions I had not yet asked are already answered." On the national view: "Portugal is open in front of me and I know what to do next."
2. **What is the one hero?**
   - On the card: the photograph and the name, then one fact, what the reader's budget buys there. One action: the Concierge.
   - On the national view: the country itself. One action on the first visit: "choose by what matters to you".
3. **How do they arrive?** As today, because it is the best screen on the site: the camera comes down the Douro, the photograph first, the name in large type, one line. New: the photograph moves, slowly, on every device.
4. **What will they ask next?** "And the hospital? The school? The beach? The flight home?" Seven lines answer, open, in minutes. "Which hospital?" One tap on a line gives the name and what it is. "Says who?" The foot of the list, then "Fontes".
5. **What is the one more thing?** The last line of the card, set apart in italics: "Daqui sai 42% da ourivesaria portuguesa." Before, it was folded inside "Sobre este lugar".

## 2. Design decisions, in plain words

### Type
- Playfair Display for names and for every figure. Manrope for labels and small print. No third face.
- The numbers are the hero of the services list: 22 px Playfair, lining figures, right-aligned in one column. The unit ("min") is small and grey beside the number.
- A count ("35") stands alone in the numbers' column. What it counts ("a menos de 20 min") sits on a small line under the label, so the column stays a column.
- Small capitals (10 px, wide spacing) for the three quiet headings: the region above the name, "Por perto", "Preço".

### Colour
- Ivory paper (#f7f4ed), ink green (#243a33), the button green (#284d40). Nothing new.
- Gold appears twice on the card: "Bandeira Azul" under the beach, and the labels the developments already carry. On the finder: the place numbers.

### Spacing
- One hairline between lines, no boxes. The card is one sheet of paper with rules, as the map page already was.
- Every tap target is 44 px or taller.

### Motion
- The photograph drifts inside its own frame (22 seconds each way). Nothing grows and nothing overlaps, so the gallery still swipes cleanly.
- Reduced motion: camera glides become jumps and panels stop sliding, as before. The photograph keeps a slower drift (60 seconds), so a film is never a still (prompt 78 §0).
- A service line opens in 280 ms. The phone sheet changes height in 340 ms with a soft landing.

### Hierarchy of the card (top to bottom)
1. Photograph, with its credit.
2. Region and sub-region in small capitals; the name; one line.
3. The budget fact: "Com 300 000 €: cerca de 128 m²", with the INE median and its quarter under it in small type. It still opens the simulator.
4. "Por perto · de carro, sem trânsito": the seven lines, open.
5. The developments, as the same photo tiles as today (alphabetical, "Parceiro" and "Seleção" labels unchanged).
6. "Preço" in full: market, new build, the five-year sentence, the IMT line.
7. What the paid analysis holds (the card writer's line), "Ver a análise completa", "Fontes".
8. The last line. Then the Maré block.
9. Fixed at the foot of the card at every height: "Falar com o Concierge".

### How services show
- A label and a number per line. The order follows a life: hospital, health centre, international school, schools, beach, airport, table.
- A tap on a line opens one sentence: the name, the time, what it is. One line open at a time.
- A value that is missing is written in words ("noutra ilha", "ainda sem número"). It is never a zero and never "em breve".
- The words are the card writer's block (`## services` in COPY_DECK.md). I wrote none of them. My own words (chrome, finder, first screen) are in `## map5`.

## 3. What moved from free to paid on the Gondomar card

Today's live card shows, free, three lists by name. The new card shows the seven lines of the prompt and nothing else.

| Today, free | New card |
| --- | --- |
| **Schools, 7 by name with minutes:** Colégio Paulo VI 3, Colégio Camões 9, Colégio Luso-Francês 11, Deutsche Schule Porto 15, Lycée Français International de Porto 17, CLIP 18, Oporto British School 19 | Free: the nearest international school only (Deutsche Schule Porto, 15 min, German curriculum, "4 within 30 min") and the count of public secondary schools within 20 minutes (35, with the nearest by name). **Moved to paid: the other six school names and their minutes.** |
| **Health, 7 by name with minutes:** Hospital-Escola Fernando Pessoa 2 (Trofa Saúde), USF Sete Caminhos 2, Hospital de Santo António 13, Hospital de São João 13, Hospital da Luz Arrábida 15, Hospital Lusíadas Porto 15, Hospital CUF Porto 18 | Free: the nearest public hospital with an emergency department (Hospital de Santo António, 13 min) and the nearest centro de saúde (USF Sete Caminhos, 2 min). **Moved to paid: Hospital de São João and the four private hospitals.** |
| **Living here, 3 drive times and the flight:** Praia de Lavadores 17, Porto Aliados 12, Aeroporto do Porto 21, the flight from the reader's country | All four stay free. The beach and the airport are two of the seven lines. The flight is inside the airport line's detail. "12 minutos dos Aliados" is the line under the name. |
| nothing | **New, free:** Blue Flag on the beach line, the Michelin Guide count (35 within 30 minutes, 13 with a star). |

Two visible changes for the operator:
1. The health headline changes. Today the card says "Um hospital a 2 min" (the private Hospital-Escola Fernando Pessoa). The new list leads with the public emergency hospital at 13 min.
2. The paid lists are already built (`site/src/data/mapanalysis.json`, 31 schools and 11 health units for Gondomar). The card's teaser says so in the card writer's words.

## 4. The two sources of numbers: one override

The operator has not chosen between the hand-checked sample (3 Nov) and the services table (10 Nov). The builder holds one switch.

- File: `scripts/map-data/place_services.py`, constant `HAND_FIRST` (now `True`).
- `True`: where the place's own folder (`content/facts/map/places/<slug>/`) has a value for a line, the card shows that minute and that name. Everything else comes from `summary.json`.
- `False`: every line comes from `summary.json`.

What Gondomar shows with each setting:

| Line | Hand-checked first (built) | Table only |
| --- | --- | --- |
| Hospital with ER | Hospital de Santo António, 13 min | Hospital de Santo António, 14 min |
| Centro de saúde | USF Sete Caminhos, 2 min | Centro de Saúde de São Cosme, 2 min |
| International school | Deutsche Schule Porto, 15 min | Deutsche Schule zu Porto, 15 min |
| Beach | Praia de Lavadores, 17 min | Lavadores, 17 min |
| Airport | 21 min | 22 min |
| Public secondary schools, Michelin, market | table (the sample has no such counts) | table |

Notes:
- The brief quotes "Hospital de São João, 13 min". In the hand-checked file Santo António is 13.3 minutes and São João 13.4. The line is "the nearest", so the card names Santo António. Both read 13.
- The Blue Flag, the curriculum and the airport code are not in the hand-checked files. They are kept from the table only when both sources name the same facility.
- "Fontes" then carries one extra line: these five were checked one by one on 3 November, under the names in the official registers.
- Food has its own switch in the same file: `FOOD = "mich"` (built) or `"mkt"` (markets only), because the Michelin source still needs the operator's yes.

## 5. The data path

- `scripts/map-data/place_services.py` builds a compact block, `sv`, from `summary.json`, from `access/` and `facilities/` (the nearest public secondary school and the nearest market by name, which the summary does not hold) and from `origins.csv` (the origin's display name).
- `scripts/map-data/tiles.py` writes it into `site/public/data/map/place/<slug>.json`.
- One list decides who gets it: `ROLLOUT = ["gondomar"]`. Only `gondomar.json` changed in this branch.
- The card script reads `sv`. A place without it keeps today's card.

Tried in a scratch build only (the built copy was patched, the repository was not): Cascais, Tavira, Mértola, Funchal, Corvo and Barrancos, from table data alone. Every variant of the card writer's table came out as his note says:
- Cascais: a beach without a flag, and the nearest one with a flag named in the detail.
- Tavira: one public secondary school, so the line gives the nearest and its time. "One holds a star."
- Mértola and Barrancos: a hospital over 45 minutes with the honest extra sentence; a river beach leading with the sea's time after it; a market instead of Michelin; times as "1 h 13 min".
- Funchal: an island with everything.
- Corvo: "on another island", "none on the island", "no figure yet", no food line, no photograph, no price. Nothing printed a zero.

## 6. The ten UX problems

| # | Problem | Status | What was done |
| --- | --- | --- | --- |
| 1 | Most cards are a stub next to Gondomar | **Design and data path ready; shown on Gondomar only** | The services block is one fixed list, open, in minutes, built from the table for any of the 308. The roll-out is one list in the builder. Photographs for the 224 places without one are not part of this work. |
| 2 | On a phone the card is a keyhole | **Fixed** | The card opens at 63% of the map: photograph, name, line, the budget fact and the Concierge button are all in view. One upward swipe anywhere opens it to full height. Only then does the text scroll. A pull down from the top puts it back. The Concierge button never leaves the foot of the card. |
| 3 | Tastes on /regressar never reorder | Agent 4's part. **The map's half is built** | The map now has a finder (section 7). |
| 4 | A tap opens a place the reader did not choose | **Fixed** | Names on the map are tap targets (a tap on "Porto" opens Porto; before, Santa Maria da Feira). A tap on a region's name opens the region. On a phone, a tap on a municipality drawn smaller than 30 px comes closer first and opens nothing. A place is named as soon as it is drawn wide enough to carry its name. |
| 5 | Search fails on the names foreign readers type | **Fixed, one gap** | "Lisbon", "Lisbonne", "Lissabon", "Oporto" find the city. "Algarve", "Azores", "Madeira", "North" find the region. An exact name comes first ("Porto" before "Porto de Mós"). One wrong letter is forgiven ("Gondomr", "Cascias": "Did you mean"). The empty box offers six places. The message says "No place by that name". On a phone the hint is no longer cut off. Gap: "Silver Coast" (see section 8). |
| 6 | Region tiles do not go to the region on a phone | **Fixed** | Cause found: the camera's padding left a band too thin to fit a region, and the map library then did not move at all. The Algarve and the Azores now sit above the card. Madeira and the Azores come closer (they are drawn smaller than life). The region card's three towns are buttons. |
| 7 | The home page's map traps the scroll | **Fixed** | One finger scrolls the page, two move the map. The wheel scrolls the page unless Ctrl or ⌘ is held. Tested: the page moved, the map did not. The home page looks the same; the map library's hint appears only when a reader tries, in our words. |
| 8 | The first five seconds do not say what to do | **Fixed** | The welcome stays until the reader acts. Its one action is "Escolher pelo que conta para si" (the finder); "Ver o mapa" is the quiet way past. The budget is a button in the top bar with the amount on it, no longer inside "Camadas". Every edition gets the welcome (it was US and Luxembourg only). On a phone the finder and the budget are the second row of the top bar. |
| 9 | The paid analysis is a dead end | **Only the repeated list removed** | A line already shown as a preview tile is not listed again. Prices, "Disponível em breve" and an email field are the operator's decision: untouched. |
| 10 | No way back to Portugal | **Fixed** | A "Portugal" button appears whenever the map is away from the national view. Plus and minus on a desktop. Closing a region's card returns to the whole country. |

Smaller things from the audit:
- **The French map's older look: fixed.** Cause: `MapV3.astro` gave the new look to two pages by name (`en/us` and `pt/lu`). It is now every map page. Four hard-coded strings and the welcome got French from the deck. The home page's embedded map keeps its own look.
- **A credit covering a caption (Açores card): fixed.** The credit moves to the right.
- Not done: a tap on a photograph opening it full-bleed; the hidden page title; the English site's link to the Portuguese Regressar page.

## 7. The finder

One entry in the top bar: "O que conta para si" (EN "What matters to you", FR "Ce qui compte pour vous").

- **Tastes:** the engine's ten, as chips. A chosen taste shows its two weights with their numbers: "Desejável 1", "Essencial 3".
- **Budget:** the map's own purchase budget, on the same slider scale. The engine's limit is a monthly cost, so one line says how the two meet: "80 m², 20% de entrada, 30 anos a 3%: até 1 011 € por mês." A place is within the budget exactly when 80 m² at its INE median cost no more than the budget.
- **Results:** five places, then "Mais lugares". Each has its rank, name, sub-region, points, two or three reasons in numbers and the trade-off against the next. All of it comes from `lib/match.ts` and `lib/match-copy.ts`, as they are. I wrote no second ranking and no reason line.
- **On the map:** the places of the list stand as small numerals in the list's order. A result, or its numeral, flies the map there and opens the card.
- **Nothing sponsored:** no development enters the list. While the list is open the developments' pins step back from the map.
- **Speed:** the panel's code (6.7 kB) and the 308-place table (75 kB, 20 kB compressed) load when the panel first opens.
- **Signals:** the engine's events with origin "map": `match/taste/…`, `match/weight/…`, `match/show`, `match/place`, `match/none`. Never the budget.

Where the entry is on a phone:
- On the map with no card open: the second row of the top bar, "O que conta para si" beside the budget (185 x 44 px).
- With a card open: the same button shrinks to its sign alone (44 x 44 px) at the left under the search box; the "Portugal" button is at the right. A tap closes the card and opens the finder.
- It is hidden only while the welcome is up, because the welcome's own button is the finder.

From the list to the map on a phone: the panel covers the map, so a tap on a result puts the panel away, flies the map to the place and opens its card half-height, with the place's numeral on the map above it. Closing the card brings the list back. Checked with touch input.

Corrected after the lead's review (two defects in the numerals):
1. On a phone the numerals showed through the finder panel. Cause: I had given each numeral its own stacking number so that 1 sat above 2, and the map's layer does not contain such numbers, so they rose above the panel. Fix: no stacking number at all; the first place is simply added last. The numerals now stay inside the map's layer, under every panel.
2. On a desktop a numeral sat on the word "Porto". Fix: place names now make room for the numerals exactly as they do for the developments' pins (a name moves above or below, or waits), and numerals closer than their own width stand side by side in the list's order.

Example, 300 000 €, international school essential and beach: Vila Nova de Gaia, Matosinhos, Almada, Oeiras, Cascais. First line: "Escola internacional a 10 min · praia a 9 min · 296 € por mês abaixo do seu orçamento".

## 8. What I did not do, and why

1. **The roll-out to 308.** By rule: Gondomar first, then the operator's yes.
2. **"Silver Coast" in the search.** It is a tourism name with no fixed border and it is not one of the map's seven regions. It needs a definition from the CEO before the map can frame it.
3. **An email field or any change on the paid sheet** beyond the repeated list. The operator's decision.
4. **A full-bleed photograph on tap.** Not in the ten; time went to the phone sheet.
5. **Ideas from yesterday's prototype** (night lights, engraving, numbered region rail, weather). I borrowed none. The region photo tiles the operator likes already do the rail's job once the camera follows them, and the ten problems were about finding and reading, which a new skin does not fix.
6. **A larger Portugal on the desktop's first view.** The country fills the height the screen gives it; making it wider means cropping the islands. Left alone.
7. **Dark mode, landscape tablets, screen readers.** Not tested. Keyboard: every new control is a real button with a visible focus ring.
8. **Real Safari on an iPhone.** Not available here. The sheet's swipe uses plain touch events and was tested with real touch input in headless Chromium at iPhone 13 size. It should be tried on a device before going live.
9. **The existing card of the other 307 places.** Untouched, apart from what the shared chrome gives every card (the way back, the region towns).

One thing found and left for the lead: a full run of `scripts/map-data/tiles.py` today also adds "new build: prices on request" to Lagos and Loulé (the developments' data changed since the files were last built). That is not this prompt's change, so I kept those three files as they were and committed only `gondomar.json`.

One thing found in existing copy: the Maré block on the card reads "Ideas and hidden gems from Portugal" in English. "Hidden gem" is on METHOD.md's banned list. Not my block; for the CEO.

## 9. The images

Folder: `/tmp/claude-0/-home-user-imoveis-portugal/686bee09-1d24-5475-8099-3259ef978529/scratchpad/p81/look/final/`

| File | What it shows |
| --- | --- |
| `pair-desktop-national.png`, `pair-phone-national.png` | The national view on arrival, before and after, side by side |
| `pair-desktop-gondomar-5s.png`, `pair-phone-gondomar-5s.png` | The Gondomar card, the five-second view |
| `pair-desktop-gondomar-services.png`, `pair-phone-gondomar-services.png` | The Gondomar card, the services |
| `before-*.png`, `after-*.png` | The same six views, each on its own |
| `after-phone-sheet-half.png`, `after-phone-sheet-full.png` | The phone sheet half open and fully open |
| `after-desktop-finder.png`, `after-phone-finder.png`, `after-phone-finder-list.png` | The finder: international school (essential) and beach |
| `after-desktop-finder-place.png` | A result opened from the finder |
| `after-desktop-search-lisbon.png`, `after-desktop-search-porto.png`, phone the same | Search results (with `before-…` for both) |
| `after-desktop-search-lisbonne.png`, `after-desktop-search-gondomr.png` | French name; one wrong letter |
| `after-desktop-gondomar-en.png`, `after-desktop-gondomar-fr.png`, phone the same | The card in English and French |
| `after-*-budget.png`, `after-*-region-algarve.png`, `after-*-region-madeira.png` | The budget panel; regions framed |

## 10. Acceptance list for the Gondomar card

| # | Item | Result |
| --- | --- | --- |
| 1 | `?place=gondomar` opens the card with photograph, name and line before the map is ready | True |
| 2 | Desktop, first view at 1440 x 900: name, line, budget fact and the first five service lines, no tap | True (lines six and seven need a scroll) |
| 3 | Phone, on opening: photograph, name, line, budget fact and the Concierge button in view | True |
| 4 | Phone: one upward swipe anywhere opens the card to full height; the text scrolls only then | True in headless Chromium with touch input. **Not verified on a real iPhone** |
| 5 | Phone, fully open: service lines visible without a tap | True for the first three; the rest on scroll. One swipe is needed first |
| 6 | The Concierge button is reachable at every height of the card | True |
| 7 | Free lines are exactly the seven of the prompt | True |
| 8 | Full lists of schools and health units are no longer on the free card | True |
| 9 | Hand-checked values shown where they exist, through one override | True (section 4) |
| 10 | A missing value is words, never a zero or "em breve" | True (tried on Corvo and Barrancos in a scratch build) |
| 11 | Every number has its source behind "Fontes", dated | True |
| 12 | PT, EN and FR in parity | True (`check-parity.mjs` passes; EN and FR cards in the images) |
| 13 | The photograph moves on every device; reduced motion slows it and does not stop it | True in the stylesheet. **Motion itself cannot be judged in software graphics here** |
| 14 | Developments keep their labels; O'rizon keeps "Seleção"; pending partners stay hidden | True |
| 15 | Each service line opened is one event; the sheet's height changes are events | True (`map/sv/{line}`, `map/sheet/{full,half}`, pages built under `/e/`) |
| 16 | Nothing new is loaded before it is needed; no new library | True. The map script grows from 42.7 to 49.1 kB compressed; the finder loads on demand |
| 17 | Keyboard: every line is a button with a focus ring | True. Screen reader **not tested** |
| 18 | Dark mode | **Not met: not tested** |
| 19 | Visual check: only the map pages differ | See section 11 |

## 11. Checks run

- `node scripts/check-content.mjs`: 0 errors. `node scripts/check-parity.mjs`: ok.
- `npm run test:match`: 19 contracts passed. `npm run test:regressar`: all green.
- Build: 7,873 pages (161 more than before: the new event pages).
- Reduced motion (headless, both sizes): the card's photograph is still moving (60-second drift) and the welcome still shows.
- The home page (headless, both sizes): a one-finger swipe and the wheel moved the page; the map stayed where it was.
- `node scripts/visual-check.mjs` (never with `--update`): result below.
- Type check of the five scripts I wrote or changed: clean, apart from one older line in `map-v3.ts` that was already reported before my change.
- Page errors on the map, the home page and the French map: none.

Visual check against the approved baseline, 24 shots:

| Page | Desktop | Phone | Why |
| --- | --- | --- | --- |
| `map`, `gondomar`, `arrow` | differ (13 to 17%) | differ (9 to 22%) | The point of this work: the new chrome and the new card. `arrow` is the same map page opened on three pins, so it carries the new top bar. |
| the five home pages, `closer`, `mare` | pass | pass | Unchanged. The home pages hold the embedded map: it looks the same. |
| `simulator` | differs (6.9%) | differs (16.2%) | **Not from this work.** The page gained a "Programa Regressar" link in an earlier commit (1572ee1). The commit before mine fails the same shot (7.4% and 18.9%). |
| `concierge` | differs (2.2%, page height) | pass | **Not from this work.** The commit before mine fails it on both sizes. I touched no file of the Concierge. |

So: three map shots differ on purpose; two other shots already differed from the baseline before my first change. The lead should know the baseline is stale for `simulator` and `concierge`.

## 12. What the roll-out to 308 needs

1. **The operator's yes** on the Gondomar card, then two choices: hand-checked first or table only (`HAND_FIRST`), and Michelin or markets (`FOOD`).
2. **Widen one list:** `ROLLOUT = None` in `place_services.py`, run `tiles.py`, commit the 308 place files. About 500 bytes more per file.
3. **The 20 other hand-built places** have the same folders as Gondomar. The override reads them the same way, but the rule for "public hospital with an emergency department" reads the `kind` column of each `health.csv`, which was written by hand. QA should read those 20 cards before they go out.
4. **The arrival places without a hand-built card** (Albufeira, Faro, Lagos, Loulé and five more) will move from today's arrival card to the new one. Their developments and last lines carry over; their "Viver aqui" lists in straight-line kilometres are replaced by the seven lines in minutes.
5. **The paid teaser** is shown only where the full lists exist today (the hand-built places). The card writer's second line (`paid.list`) is ready for the other 287 once the paid page shows the table's lists.
6. **Places without a price or a photograph** (Corvo): the card holds together, but it is short. Photographs for the 224 places without one are a separate job.
7. **Move the visual-check baseline** (`--update`) for `map`, `gondomar` and `arrow` only, after the yes.
8. **A real iPhone** for the sheet, and one pass with a screen reader.

## 13. For the operator's decision

1. The Gondomar card as shown: yes or no.
2. Which numbers Gondomar shows: hand-checked first (built) or the table only.
3. The food line: Michelin (built) or markets only.
4. The new look on every edition's map page (France, Switzerland, Brazil and the UK had the older chrome).
5. The health headline: the public emergency hospital at 13 min replaces "Um hospital a 2 min".
6. "Silver Coast": whether the map should know it, and where it starts and ends.
