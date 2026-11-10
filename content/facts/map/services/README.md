# Services table (prompt 81): what every municipality has within reach

First pass, 10 Nov 2026. One table for all 308 municipalities: health, schools, beach, airport, long-distance train, food, golf and culture, each facility with its source and the car time from the municipality's town hall. The full method, coverage, gaps and the operator's decisions are in `ops/research/81_map/data.md`; this file is being completed layer by layer.

- `origins.csv`: the origin of every drive time, one per municipality (town hall; 13 use the centre of the seat town because OpenStreetMap maps no town hall there).
- `facilities/<layer>.csv`: one row per facility (id, layer, kind, name, lat, lon, municipality, attributes, source, source URL, licence, date checked). `counts_by_municipality.csv` holds the 2021 census population and the OSM restaurant and pharmacy counts.
- `access/<layer>.csv`: drive time and distance from each town hall to the nearest few facilities of each kind and to every one inside the counted radius.
- `summary.json`: the contract read by the ranking engine (field names fixed in the prompt 81 brief).
- `inputs/`: the small source lists the build reads (hospital lists, international schools, Blue Flag 2026, Michelin Guide selection, EEA bathing-water categories, census population, SNS emergency institutions).

Rebuild: the steps at the top of `scripts/map-data/services.py`.

Routing: OSRM 26.4.0 run locally on the OpenStreetMap extract of Portugal (8 Nov 2026), car profile, no traffic, no ferries. No drive time is estimated from a straight line; where there is no road route (another island) the value is null.
