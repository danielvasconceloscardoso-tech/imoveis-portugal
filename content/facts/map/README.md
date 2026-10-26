# Map data (prompt 25, D49)

Everything the 3D map shows comes from here and is rebuilt by two scripts (from the repo root):

1. `python3 scripts/map-data/fetch.py` downloads the raw files into `raw/` and records each URL, licence and download date in `raw/manifest.json`. Requests to INE run one at a time with retries.
2. `python3 scripts/map-data/build.py` (needs `pip install shapely` and npx) writes `site/public/data/map/` (TopoJSON boundaries and parish series), `site/public/data/prices.json` and `MISMATCHES.md`.
3. After `npm run build` in site/, `node scripts/map-data/clicktest.mjs` clicks every concelho and writes `CLICKTEST.md`.

## Sources

| What | Source | Licence | Periods |
|---|---|---|---|
| Sale price per m² (median, last 12 months) | INE 0009490 (Metodologia 2018), 0012234 (Metodologia 2022; concelhos and parishes) | CC BY 4.0 | quarterly, year ending Q1 2016 to Q2 2026; method break at Q4 2019 |
| Rent per m² of new leases (median, last 12 months) | INE 0014696 (Metodologia 2026) | CC BY 4.0 | quarterly, **first period Q1 2020**, to Q2 2026 |
| Earlier rent series (record only) | INE 0009817 (Metodologia 2021) | CC BY 4.0 | semi-annual, **first period 2nd half of 2017**, to 2nd half of 2023; not mixed with the 2026 method |
| Mortgage rate for the yield comparison | Banco de Portugal, BPstat 12533735 (fact bdp-mortgage-rate-2026-08) | public | August 2026, 3.00% |
| Concelho and parish boundaries | OpenStreetMap admin_level 7 and 8 via the osm-boundaries export (planet of Dec 2016) | ODbL, "© OpenStreetMap contributors" | |
| Madeira and Azores concelhos, 3 mainland gaps | geoBoundaries PRT ADM2 | CC0 | |

Every figure on the site shows "Fonte: INE" and its period. CAOP (DGT) is not used until DGT confirms commercial use in writing (task 8x).

The OpenStreetMap servers and Overpass are blocked by this build environment's network policy. With `overpass-api.de` allowed, fetch.py's OSM step should be replaced by an Overpass query for current admin_level 7 and 8 relations in Portugal: that would cover the islands and the 2025 parish map, and close most of the gaps listed in MISMATCHES.md.

## Derived figures (build.py)

- Gross yield = median rent per m² × 12 ÷ median price per m², same quarter. Before costs and tax.
- Growth: price change since Q1 2016; compound annual rate since 2016 (price) and since 2020 (price and rent, same window, and the gap between them).
- Momentum: price change over the last 4 and 8 quarters; "accelerating" if the last 4 quarters grew 2+ points faster than the 4 before, "slowing" if 2+ points slower, else "steady". A description of the record, never a forecast.
- Comparable places: the three concelhos nearest in price level (log), gross yield and setting (coast, city).
