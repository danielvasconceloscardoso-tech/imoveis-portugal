# Services table (prompt 81): what every municipality has within reach

Built 10 Nov 2026 for all 308 municipalities: health, schools, beach, airport, long-distance train, food, golf and culture. Every facility has a source, a licence and the date checked; every time is a car time by road from the municipality's town hall. Nothing is estimated: where there is no value the field is `null` and the reason is below. Coverage, the golden-sample check and the operator's decisions are in `ops/research/81_map/data.md`.

## Files

| File | What it holds |
|---|---|
| `origins.csv` | One origin per municipality: the town hall (295) or, where OpenStreetMap maps no town hall, the centre of the seat town (13, `point_kind = town centre`). The 21 places that already have a hand-checked card use that card's origin. |
| `facilities/<layer>.csv` | One row per facility: id, layer, kind, name, lat, lon, municipality (slug), attributes, source, source URL, licence, date checked. |
| `facilities/counts_by_municipality.csv` | 2021 census population, 2022 official area, and the OpenStreetMap restaurant and pharmacy counts inside each boundary. |
| `access/<layer>.csv` | slug, kind, facility id, minutes, km: the nearest few facilities of each kind and every one inside the counted radius (20 353 rows). |
| `summary.json` | The contract read by the ranking engine. Field names are fixed in the prompt 81 brief; optional additions are listed below. |
| `inputs/` | The small source lists the build reads, so it can be rebuilt without fetching them again. |

## Method

1. **Origin.** The town hall of each municipality (OpenStreetMap `amenity=townhall`), the same kind of point as the Gondomar golden sample. 284 come from `tiles/viver_aqui/sede_points.csv` (scripts/map-data/sede.py), 21 of them replaced by the origin of the place card already built (identical except Trofa); 11 more were found in the extract; 13 fall back to the seat town's centre (the `admin_centre` node of the boundary relation). Lisboa is set by hand to the Paços do Concelho at Praça do Município: sede_points.csv held the municipal services building at Campo Grande.
2. **Facilities.** Read from published lists and from one OpenStreetMap extract (see the layer table). Every row must lie inside one of the 308 municipal boundaries (121 objects on the Spanish side of the extract were dropped). A node and a building outline for the same place count once (same name within a set distance, per layer).
3. **Drive times.** OSRM 26.4.0 run on this machine on the same extract: car profile, no traffic, ferries switched off, table service (MLD). No request goes to the public OSRM server. A time is the road time from the origin to the facility's point joined to the nearest road. A facility more than 1 km from any road a car can use gets no time (10 beaches on the Ria Formosa islands and at Furnas, 1 museum).
4. **Islands.** With no ferries in the routing, no route crosses the sea. A place on an island that has no facility of a kind gets `null` for it (for example `er` on Pico, São Jorge, Graciosa, Santa Maria, Flores, Corvo and Porto Santo).
5. **Rounding.** Minutes are rounded to the nearest whole minute in `summary.json` and kept to one decimal in `access/`. "Within 20 minutes" uses the unrounded time.
6. **Unknown is null, never 0.** A count of 0 means the layer was read and none is within the radius. The two counts inside a boundary (`pharm_n`, `food.rest_n`) are null when OpenStreetMap holds none, because every municipality has pharmacies and restaurants: 0 there is a mapping gap.

## Layers

| Layer (summary fields) | Kind in the files | Source | Licence | Checked | Covered of 308 | Known gaps |
|---|---|---|---|---|---|---|
| Public hospital with an emergency department (`er`) | `er` 56, `er_special` 4, `er_candidate` 21 | A list of public hospitals with an emergency department compiled per ULS on 2026-11-02 (`inputs/hospitals_list.csv`), points from OpenStreetMap. Each ULS was checked against the SNS open-data file "Atendimentos por Tipo de Urgência Hospitalar" (transparencia.sns.gov.pt, one download): all 40 institutions with general emergency attendances in 2026 have at least one hospital in the list. | list: facts; points ODbL; SNS file: open data | 2026-11-10 | 297 | The SNS's own building-level list of emergency departments could not be downloaded. Basic emergency services in health centres and small hospitals are missing, so `er` is too long in parts of the interior (38 places above 45 minutes). `er_candidate`: 21 hospitals OpenStreetMap tags `emergency=yes` that the list does not hold, shown as `er_cand` and never used for `er`. `er_special`: two children's hospitals and two maternity hospitals, listed and not used. 11 island places: null. |
| Centro de saúde (`cs`) | `cs` 921 | OpenStreetMap: health facilities named Centro de Saúde, USF, UCSP, Extensão de Saúde, Unidade de Saúde | ODbL | 2026-11-10 | 308 | The name is OpenStreetMap's, often the building ("Centro de Saúde de São Cosme") and not the unit in the ERS register ("USF Sete Caminhos"). Not every unit is mapped. |
| Private hospitals (`ph`, `ph_n20`) | `ph` 77 | The groups' own lists of units (CUF, Luz, Lusíadas, Trofa Saúde, HPA; 2026-11-02) plus OpenStreetMap hospitals that are private by tag or name | facts; points ODbL | 2026-11-10 | 294 | 7 units in the group lists have no point and are left out. Some units are small. Misericórdia and other social-sector hospitals are not counted. A private hospital does not always have an emergency service. |
| Pharmacies (`pharm_n`) | `pharmacy` 2 696 | OpenStreetMap `amenity=pharmacy` inside the boundary | ODbL | 2026-11-10 | 297 | A floor: Portugal has about 2 900 pharmacies. 11 municipalities have none in OpenStreetMap: null. |
| International schools (`isch`, `isch_n30`) | `isch` 48 | A list of international schools (school sites and one third-party directory, 2026-11-02; `inputs/intl_schools_list.csv`) plus OpenStreetMap schools whose name says international | facts; points ODbL | 2026-11-10 | 288 | 34 from the list with curriculum and language; 14 from OpenStreetMap only, curriculum not checked (`cur` and `lang` null). 3 list rows have no point. None in the Azores or on Porto Santo. |
| Private schools (`psch_n20`) | `psch` 484 | OpenStreetMap `amenity=school`, private by tag or by name (Colégio, Externato) | ODbL | 2026-11-10 | 308 | OpenStreetMap does not say which cycles a school teaches: the count includes primary-only private schools. The official register (DGEEC) needs the operator. |
| Public secondary schools (`sec_n20`) | `sec` 531 | OpenStreetMap `amenity=school` whose name says Secundária, not private | ODbL | 2026-11-10 | 308 | A school that teaches secondary without the word in its name is missed. |
| Beach (`beach`, `beach_flag`, `beach_n20`, `beach_inland`) | `beach_sea` 512, `beach_inland` 159 | Points and names: APA identified bathing waters 2026 (already in the repo). Category: EEA bathing-water status, season 2024 (discodata.eea.europa.eu). Blue Flag: Associação Bandeira Azul, awarded sites 2026 (bandeiraazul.abaae.pt) | APA: no restrictions stated; EEA: reuse with attribution; Blue Flag: facts | 2026-11-10 | 308 | Sea = EEA category coastal (486) or transitional (26: river mouths and lagoons). 380 of the 396 Blue Flag beaches are matched to a bathing water; 16 are not (see data.md) and their water shows `flag: false`. 10 bathing waters are new since the 2024 EEA file and are classed by the distance-to-ocean rule. Names are the official ones without "Praia de". |
| Airport (`air`) | `air` 14, `airfield_not_counted` 6 | OpenStreetMap aerodromes with an IATA code; the point is the passenger terminal | ODbL | 2026-11-10 | 308 | Counted: LIS, OPO, FAO, FNC, PXO, PDL, TER, HOR, PIX, SMA, SJZ, GRW, FLW, CVU. The choice of airports was not checked against a timetable in this pass. Not counted: Beja and the regional airfields of Bragança, Vila Real, Viseu, Cascais and Portimão. |
| Long-distance train (`rail`) | `rail` 77 | OpenStreetMap route relations of CP Alfa Pendular, Intercidades and the Porto–Vigo international train: the stations where they stop | ODbL | 2026-11-10 | 278 | A station with one long-distance train a day counts like Lisboa-Oriente. No railway on the islands: null. |
| Food (`food.mich_n30`, `mich_star_n30`, `mkt_n20`, `rest_n`, `rest_per_1k`) | `mich` 201, `mkt` 418; restaurants counted, not listed (19 118) | MICHELIN Guide, Portugal selection as listed on 2026-11-10 (5 listing pages); OpenStreetMap marketplaces named Mercado; OpenStreetMap `amenity=restaurant` inside the boundary over the 2021 census population | facts; ODbL; CC BY 4.0 | 2026-11-10 | 308 | The Michelin count matches the 201 the guide states (9 two-star, 44 one-star, 25 Bib Gourmand, 123 selected). Restaurant density follows how well OpenStreetMap is mapped: Porto 4.0 per 1 000, Gondomar 0.4. A description of what is listed and mapped, not of quality. |
| Golf (`golf`, `golf_n30`) | `golf` 78 | `content/facts/golf/courses.csv` (prompt 33), open courses | facts; points ODbL | 2026-10-28 | 289 | Islands without a course: null. |
| Culture (`museum`, `cult_n20`) | `museum` 1 229, `theatre` 381 | OpenStreetMap `tourism=museum` and `amenity=theatre`, named | ODbL | 2026-11-10 | 307 | OpenStreetMap's own idea of a museum: small visitor centres count like national museums. Corvo: none mapped. |
| Population and area (`pop`, `area_km2`) | | INE 0011609 (Census 2021) and INE 0008350 (area, Direção-Geral do Território, 2022), one file each | CC BY 4.0 | 2026-11-10 | 308 | |

OpenStreetMap data: © OpenStreetMap contributors, ODbL 1.0. The map must carry that credit. The extract is `portugal.osm.pbf` from download.openstreetmap.fr (data of 2026-11-09 00:52 UTC, md5 6e2530daac08204ae43c97d0ff95cfbc); it holds the mainland, Madeira and the Azores (308 municipal boundaries). download.geofabrik.de did not answer from the build machine.

## Optional fields added to the contract

`pop`, `area_km2`, `island` (island places only), `beach.cat`, `beach_flag`, `beach_n20`, `beach_inland`, `food.mich_star_n30`, `er_cand`, and `id` (the facility id) inside every nearest-facility object. `layers` has one entry per field group, plus `pop` and `area`.

## Rebuild (next quarter)

From the repo root, with a scratch folder outside the repo (3 GB free, 6 GB of memory):

1. Download `https://download.openstreetmap.fr/extracts/europe/portugal.osm.pbf` to `SCRATCH/osm/` and check its md5.
2. `python3 -I scripts/map-data/services/osm_extract.py SCRATCH/osm/portugal.osm.pbf SCRATCH/work` (needs `pip install osmium shapely`; 3 minutes).
3. `scripts/map-data/services/osrm_prepare.sh SCRATCH` (installs the OSRM binaries in the scratch folder and builds the graph; 3 minutes).
4. `python3 scripts/map-data/services.py facilities --scratch SCRATCH`
5. `LD_LIBRARY_PATH=SCRATCH/tools/tbb/tbb-2022.1.0.data/data/lib node scripts/map-data/services/route.cjs SCRATCH` (40 seconds)
6. `python3 scripts/map-data/services.py summary --scratch SCRATCH`

Before that, refresh `inputs/`: the Blue Flag list of the year, the Michelin selection, the EEA season, and the hospital and school lists. Change `CHECKED` and `OSM_SRC` at the top of services.py. Then delete the scratch folder.
