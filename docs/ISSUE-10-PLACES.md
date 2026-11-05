# Issue 10 — Place discovery contract

The first release compares **13 mainland municipalities**, not every Portuguese home or town. These are existing editorial/photo-backed places with published sale and rental medians. No scoring alleges that a municipality guarantees a particular lifestyle, school place, job or loan.

`site/src/lib/regressar-places.ts` copies only the latest selected-place medians from `site/src/data/prices.json`, period **2026-Q2**. It does not export the paid historical dataset. Regenerate/verify these values whenever that source updates. The input is monthly **annual net divided by twelve**, irrespective of pay-slip count.

## Sources already recorded in the repository

- Prices: INE median sale €/m², last twelve months; 0009490/0012234. New-lease median rent €/m², 0014696. `content/facts/map/README.md`; dataset release dates sales 2026-10-23, rents 2026-09-29. These are municipal statistics, not listings, valuations or availability promises. Multiplying by 80m² is a scenario, not a particular dwelling.
- Beach: `site/public/data/map/tiles.json` and `content/facts/map/tiles/viver_aqui/viver_aqui_municipality.csv`, APA bathing-water geography. Qualification ≤10km **straight line** to a listed sea bathing water. The repository's classifier includes estuary/lagoon bathing waters; never translate this into driving time or surf suitability.
- Airport: same table, nearest LIS/OPO/FAO/FNC/PDL airport ≤40km **straight line**, OSM coordinates. No flight availability, travel time or traffic assumption.
- Schools: existing map nearest-international-school list, within 15km straight line. List originated in the school directory and school sites; coordinates OSM. See `content/facts/map/tiles/SOURCES.md` §4. This is not a school quality, suitability, capacity or admission claim.
- Golf: `content/facts/golf/courses.csv`, at least one listed open course in the municipality. Source URL and original checked date accompany each match. Course roster and Golf Mode code are unchanged.
- Art/architecture: selected existing facts `pritzker-siza-1992`, `pritzker-souto-2011`, `vdc-museums`, from Pritzker and Vila do Conde municipality sources. Food: `michelin-antiqvvm`, `matosinhos-unesco-gastronomy`. The evidence is a particular verified place fact, not a comparative quality index.
- Imagery: existing `place-photos.json` or individual `place.json` galleries. All stems are already licensed in `content/media/SOURCES.md`. Gondomar's image is identified as a developer image and retains its Shalu Investments credit. No image substitution or invented alt text.

Surf, business and tranquillity have no adequate comparable evidence in the present sample; they return `unsupported-preference`. The interface should offer the six supported tastes and explain the limited coverage. Selecting an unsupported constraint never silently broadens the search.

## Deterministic compatibility

`rankCities({ netMonthly, preferences, housingMode })` applies **all** selected verified preferences and the housing budget. The default budget is 35% of net, an explicitly editable planning assumption, not a lender rule. Sort is the lowest unrounded housing cost first, then municipality slug. There is no random fallback, sponsorship weighting or hidden preference score. An empty set remains empty.

Rent defaults to 80m² × INE median new-lease €/m². Buying defaults to 80m² × INE sale median, 20% cash deposit, nominal fixed 3% annual scenario rate, 30 years, standard amortisation. The 3% scenario is consistent with the existing August 2026 Banco de Portugal fact `bdp-mortgage-rate-2026-08`; it is **not** a current offer, APRC/TAEG or approval. Taxes, transaction costs, insurance, fees, condominium and utilities are excluded and must be stated. The deposit must be funded separately; income alone cannot prove that it exists. Do not describe `remainingMonthly` as disposable income after living costs: it is only net less this housing scenario. No reliable regional non-housing-cost dataset is bundled, so none is fabricated.

## Map boundary

`showRegressarMap(container, places, selectedId, onSelect)` lazy-loads the already installed MapLibre and the local `/data/map/munis.topo.json`, with a sage municipal map and accessible 44px place-marker buttons. It fetches no map tiles, geocoder, style service or token. It is isolated from the current main map and native Golf module. The official map deep-link remains `regressarMapHref(id, lang, ed)`; it carries only the place ID, never salary or household data. Reduced motion disables camera animation. The returned handle supports `select`, `update` and `destroy`.
