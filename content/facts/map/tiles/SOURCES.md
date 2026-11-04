# Map tiles: what is copied here and what the map publishes (D83 part 2, 3 Nov 2026)

These CSV files are the processed public statistics behind site/public/data/map/tiles.json; `python3 scripts/map-data/tiles.py`
reads them (default folder; `--src DIR` for another). The raw API responses and the IPMA station tables stay out of the repo.
Publishing rules (lead, 3 Nov 2026):
1. Preço: INE 0014763 (total, new, existing), 0014759 (typology), 5-year change against 0012234 / 0012241 2021-Q2. INE publishes no
   quartiles: the "range" is the lowest to highest typology median, labelled "entre tipologias"; elsewhere the single median, with
   new and existing when INE publishes them. Credit "INE", CC BY 4.0.
2. Construção nova: no partner project publishes a price: "preços sob consulta (promotor)" where a partner project is, nothing
   elsewhere. The prices of non-partner (demo) projects are never used on the public map.
3. Viver aqui: sunshine (IPMA 1971-2000, private use only) NOT published ("Em breve"; the columns were removed from the copy here);
   the 1991-2020 temperature and rainfall NOT published (no licence stated; removed). Sea in August: Copernicus Marine Service
   (OSTIA 1991-2020), credited. Beach: straight-line km to the nearest APA sea bathing water ("em linha reta", never minutes).
   Flight: the nearest of LIS, OPO, FAO, FNC, PDL in straight-line km; the flight time stays "Em breve" (no timetable fetched).
4. Escolas e saúde: nearest international school (none in the Azores: "nenhuma na região"), nearest public emergency hospital,
   doctors per 1000 residents, INE 0012837, 2025, labelled as counted by place of residence.
5. No crime data.

# Map rebuild data (D83): sources, periods, licences

Built 3 Nov 2026 for the four tiles of the map card. All files were fetched on **2026-11-03** unless a row says otherwise. Nothing in this folder is invented. A gap is left empty and explained here. No crime data was collected.

Place codes:
- `geocod` is INE's code: NUTS III (3 characters) followed by the DICO (4) or DICOFRE (6).
- `place_code` / `muni_dico` / `dicofre` match `c[3:]` in `site/public/data/map/munis.topo.json` and `id` in `parishes.topo.json`.

Map points: the municipality and parish points are the `x,y` from the repo topojson. For Madeira and the Azores these points are converted back from the inset coordinates to real coordinates, using the inverse of `INSET` in `scripts/map-data/build.py` (the gathering script, geo.py).

## 1. Preço (market): `preco/`

| File | Source (indicator) | Publisher | Reference period | Licence |
|---|---|---|---|---|
| `sales_m2_by_category_municipality.csv`, `sales_m2_by_category_parish.csv` | Latest: INE **0014763**, median value per m² of family dwellings sold in the last 12 months, by category (Total / Novos / Existentes), NUTS 2024, *geografia 2025* (652 parishes). 5-year base: INE **0012234** (same indicator, pre-2025 parish geography), 2021-Q2. https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0014763&Dim1=S5A20262&lang=PT and https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0012234&Dim1=S5A20212&lang=PT | INE, Estatísticas de preços da habitação ao nível local (Metodologia 2022). Data updated 2026-10-23 | 2026-Q2 (12 months to June 2026). Change vs 2021-Q2 (20 quarters back) | CC BY 4.0 (INE, via dados.gov.pt) |
| `sales_m2_by_typology_municipality.csv`, `sales_m2_by_typology_parish.csv` | Latest: INE **0014759** (by Tipologia do fogo: T0 ou T1, T2, T3, T4 ou mais), geografia 2025. 5-year base: INE **0012241**, 2021-Q2 | INE (as above) | 2026-Q2. Change vs 2021-Q2 | CC BY 4.0 |
| `bank_valuation_m2_monthly_municipality.csv` | INE **0012248**, median bank valuation €/m² by municipality (Município 2024) and type of construction (Total / Apartamentos / Moradias), monthly | INE, Inquérito à avaliação bancária na habitação | September 2026. Change vs September 2021 | CC BY 4.0 |
| `bank_valuation_m2_annual_municipality.csv` | INE **0012256** (the annual version of 0012248) | INE | 2025. Change vs 2020 | CC BY 4.0 |
| `raw_ine/*.json` | The unedited API responses used to build the tables | INE | as above | CC BY 4.0 |

Notes:
- **5-year change.** The change is computed only where the same code and category exist in the old-geography series (0012234 or 0012241) for both 2021-Q2 and 2026-Q2. Parishes that the 2025 parish reform split or created therefore have no 5-year change.
- **Same values as the repo.** 0012234 for 2026-Q2 equals `site/src/data/prices.json`; for example, Lisboa is 5 192 €/m² in both. The geografia-2025 series (0014763) agrees with 0012234 on 2 635 of the 2 637 shared code×category cells.
- **Parish detail is limited.** INE publishes sales by parish only for the Porto metropolitan area, Grande Lisboa, Península de Setúbal, the Algarve and other municipalities with more than 100 000 inhabitants (59 municipalities). Typology is published only for those same municipalities and their parishes: 58 municipalities and 652 parishes, not all 308.
- **Bank valuations.** INE publishes bank valuations at municipality level only, split by apartments and houses. They are not split into new and existing dwellings, nor by typology. Many monthly municipal values are confidential ("Dado confidencial", flagged in `*_flag`).
- **No quartiles.** INE publishes no Q1 or Q3 for these series. Neither the INE API nor the dados.gov.pt catalogue has a quartile indicator; a search for "quartil" returned only an unrelated dataset. `typology_range_low/high` is therefore the lowest and highest published typology median for the place (only where at least two are published). It is labelled as such and is not a quartile range.

## 2. Construção nova: `construcao_nova/`

| File | Source | Period | Licence |
|---|---|---|---|
| `newbuild_units_eur_m2.csv`, `newbuild_projects_eur_m2.csv` | `content/developers/projects.json` (repo). `eur_m2` = published price ÷ published area, per unit. Each row keeps the developer or listing URL and the `checked` date | Checked 2026-10-26 to 2026-11-03 | Developers' published prices (facts) |

- **Published prices:** 6 of the 9 projects have units with both a price and an area published (38 units).
- **Not comparable (see the `caveat` column):**
  - MUDA (Grândola): the area is the **plot** area. It is not a dwelling €/m².
  - The Residences Vale do Lobo: a "from" price over a "from" area.
  - Orizon, Prata Factory and Prata South: prices and areas come from Imovirtual listings.
- **None published:** Six Senses Comporta, Marble Terrace (Gondomar), and Marble Terrace Vila do Conde (46 homes listed, 0 prices).
- **Partner status:** the only `partner=true` projects are Marble Terrace and Marble Terrace Vila do Conde, and both are "none published". Every project with a price is `partner=false`. Under projects.json `_how`, a `partner=false` project appears only in that developer's private demo, not on the public map.

## 3. Viver aqui: `viver_aqui/`

| File | Source | Publisher | Period | Licence |
|---|---|---|---|---|
| `ipma_sunshine_normals_1971_2000_stations.csv` | IPMA station climate sheets 1971–2000, row "Insolação (horas)". List: https://www.ipma.pt/pt/oclima/normais.clima/1971-2000/normalclimate7100.jsp ; per-station PDF in `sheet_url` (https://www.ipma.pt/bin/file.data/climate-normal/cn_71-00_*.pdf) | IPMA (formerly IM) | **1971–2000**: the most recent normals that include sunshine. Many stations have partial years (`station_note`) | **Restrictive.** Every sheet says: "É exclusivamente concedido o direito de utilização privada, individual, pessoal e não transmissível… sendo expressamente interdita toda a apresentação e/ou reprodução, total ou parcial". **Do not publish without IPMA's written permission** |
| `ipma_climate_normals_1991_2020_stations.csv` | IPMA climate sheets 1991–2020, list https://www.ipma.pt/pt/oclima/normais.clima/1991-2020/normalclimate9120.jsp (sheets version 1.0, 2024; list dated 29-04-2025) | IPMA | 1991–2020 | IPMA website terms of use (https://api.ipma.pt/ "termos e condições"). No open licence is stated, and the 1991–2020 sheets carry no restrictive notice. Ask IPMA (the climate address on ipma.pt) to confirm commercial reuse with attribution |
| `sst_climatology_1991_2020_coastal_stretches.csv` | Copernicus Marine **SST_GLO_SST_L4_REP_OBSERVATIONS_010_011** (OSTIA reprocessed, foundation SST, 0.05°), dataset METOFFICE-GLO-SST-L4-REP-OBS-SST_202003, read from the public ARCO store https://s3.waw3-1.cloudferro.com/mdl-arco-geo-046/arco/SST_GLO_SST_L4_REP_OBSERVATIONS_010_011/METOFFICE-GLO-SST-L4-REP-OBS-SST_202003/geoChunked.zarr . Daily values averaged over 1991–2020 at one sea cell off each of 32 stretches (18 mainland, 4 Madeira, 10 Azores); August mean, annual mean and the 12 monthly means | Copernicus Marine Service (Met Office, GHRSST) | 1991–2020 | Copernicus Marine Service licence (free, including commercial use). Attribution: "Generated using E.U. Copernicus Marine Service Information; data provided by GHRSST, Met Office and CMEMS" |
| `apa_bathing_waters_2026.csv` (+ raw `apa_bathing_waters_wfs_raw.xml`) | APA INSPIRE WFS "Águas balneares de Portugal": https://inspire.apambiente.pt/getogc/services/INSPIRE/AM_BathingWaters/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=INSPIRE_AM_BathingWaters:AM.BathingWater (671 bathing waters, mainland, Madeira and Azores) | Agência Portuguesa do Ambiente | Identified bathing waters as served on 2026-11-03 | WFS capabilities: Fees and AccessConstraints "Sem restrições" |
| `beach_distance_municipality.csv`, `beach_distance_parish.csv` | Computed: **straight-line** km from the map point (p70 round 3: for municipalities, `viver_aqui_municipality.csv` now measures the beach and the airport from the town hall, `sede_points.csv`) to the nearest APA bathing water. Both `sea` and `any` (including river beaches) are given | Ours, from APA + repo points | 2026 | — |
| `sede_points.csv` | OpenStreetMap via Nominatim (amenity=townhall, "Câmara Municipal de …"), checked against the municipality's name and point (scripts/map-data/sede.py --fetch). 284 of 308 town halls; the other 24 have no distances on the card until one is found | © OpenStreetMap contributors | 2026-11-04 | ODbL |
| `airports.csv` | OpenStreetMap via Nominatim (aeroway=aerodrome), 19 airports | © OpenStreetMap contributors | 2026-11-03 | ODbL |
| `flights_editions_to_portugal.csv` | 70 routes (14 edition airports × LIS, OPO, FAO, FNC, PDL). `great_circle_km` is computed. **Scheduled block times are not filled** (see "Not fetched") | — | — | — |
| `nearest_airport_parish.csv`, and the airport columns in `viver_aqui_municipality.csv` | Straight line to the nearest of LIS, OPO, FAO, FNC, PDL | Ours | — | — |
| `viver_aqui_municipality.csv` | One row per municipality, joining the above. For each municipality: the nearest sunshine station, the nearest 1991–2020 station, the nearest SST stretch, the nearest sea bathing water and the nearest airport (all in the same region: mainland, Madeira or Azores), each with its distance | Ours | as above | as above |

**Sunshine is not published for 1991–2020 or 1981–2010.** The IPMA 1991–2020 sheets (57 stations) and 1981–2010 sheets (65 stations) were downloaded and searched; neither set contains a sunshine (insolação) row. The station data embedded in the 1991–2020 map page has only temperature, precipitation and day counts. The 1971–2000 sheets have sunshine for 48 of 68 stations.

**How "sea" bathing waters are told apart.** The APA layer has no water-category field. A bathing water counts as "sea" when it lies within 6 km of an OSTIA open-ocean grid cell (OSTIA mask value 1 = water, not land or lake).
- Result: 514 of 671 count as sea bathing waters. This includes estuary and lagoon beaches such as Ria de Aveiro, Ria Formosa and the Tejo mouth.
- Check of the cut-off: the nearest inland ones, Azenhas–Vilar de Mouros (7.7 km), Ereira (10 km) and Lenta (10.8 km), fall outside it; Alvor (5.1 and 5.6 km) and Bico (5.4 km) fall inside.
- For the authoritative category, use the EEA bathing-water dataset (field "bathingWaterCategory").

## 4. Escolas e saúde: `escolas_saude/`

| File | Source | Period | Licence |
|---|---|---|---|
| `doctors_per_1000_municipality_2025.csv` (+ raw `ine_0012837_2025_raw.json`) | INE **0012837**, "Médicas/os por 1000 habitantes (N.º) por Local de residência (NUTS - 2024)", annual. https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0012837&lang=PT | 2025 (updated 2026-07-28) | CC BY 4.0 |
| `escolas_saude_municipality.csv`, `escolas_saude_parish.csv` | Straight-line nearest international school and nearest hospital, within the same region | — | — |

**The doctors figure is by place of residence.** INE counts doctors registered with the Ordem dos Médicos by where they live, not where they work. A low value in a suburb does not mean there is no care there.

**Schools and hospitals reused from the deck data.** They come from `sponsors/decks/v6/data/{schools,hospitals}.csv` (design-v2 branch); their own SOURCES.md is in the same folder. 
- **Schools:** 38 rows, 33 with coordinates and a `curriculum` column (British, American, IB, German, French, other).
  - Sources: OSM Nominatim for the coordinates, and a third-party directory plus the schools' own sites for the list.
  - Gaps: none in the Azores or the Alentejo. The 19 Azores municipalities say "none in region".
- **Hospitals:** the "public emergency" columns use the 60 public rows with coordinates: SNS/ULS hospitals with an emergency service, plus the Madeira (SESARAM) and Azores (SRS) public hospitals.
  - That list was compiled per ULS against the SNS list https://www.sns.gov.pt/servicos-de-urgencia-sns/, which is not reachable from here.
  - Health-centre emergency points are not included (SUB in health centres, and the Porto Santo, Flores, Corvo and Graciosa health centres). Distances from those islands are therefore to the nearest hospital on another island.
  - The `nearest_any_hospital` columns include private hospitals, which do not necessarily have a 24-hour emergency department.

## Not fetched: where the operator can get it

1. **Flight block times.** I checked flytap.com (pages load, but `flightDuration` is null; the schedule is built in JavaScript), luxair.lu (no static timetable), easyjet.com, swiss.com, transavia.com and voeazul.com.br (HTTP 403), and united.com, latamairlines.com and airfrance.fr (connection refused). The Ryanair timetable API works but Ryanair serves none of these origin airports.
   - To fill `scheduled_block_time_min`, read the dep/arr times of one flight per route and month in each carrier's booking or timetable tool.
   - Tools to use (home pages; each carrier's timetable or flight search is linked from there): TAP https://www.flytap.com, Luxair https://www.luxair.lu, easyJet https://www.easyjet.com, SWISS https://www.swiss.com, Azores Airlines https://www.azoresairlines.pt, United https://www.united.com, Delta https://www.delta.com, El Al https://www.elal.com, Azul https://www.voeazul.com.br, LATAM https://www.latamairlines.com, Air France https://www.airfrance.fr, Transavia https://www.transavia.com. I did not check which carriers fly which route, so the `carrier` column is empty.
   - Converting to block minutes: arr − dep, corrected for the time-zone difference.
   - Alternative: an OAG or Cirium extract (paid; budget rule 5).
2. **Sunshine 1991–2020.** IPMA does not publish it on the normals pages. Two options:
   - (a) Ask IPMA (the climate address on ipma.pt) for the 1991–2020 "insolação" normals per station, together with written permission to publish. The same permission is needed for the 1971–2000 values here.
   - (b) Use the EUMETSAT CM SAF SARAH-3 sunshine-duration climate data record (https://wui.cmsaf.eu, free registration, 0.05° grid). It gives a value per municipality instead of per station.
3. **Overpass and Geofabrik.** These remain unreachable: overpass-api.de (connection reset), overpass.kumi.systems and overpass.private.coffee (timeout), maps.mail.ru (504), overpass.openstreetmap.fr (403) and download.geofabrik.de (reset). This means no road travel times, which is why every distance here is straight-line km.
4. **SNS / ERS official emergency list with coordinates.** transparencia.sns.gov.pt resets the connection and sns.gov.pt returns 405. The operator can download the dataset "Caracterização das Valências de Urgência" (portal https://transparencia.sns.gov.pt) and the SNS page https://www.sns.gov.pt/servicos-de-urgencia-sns/ from a normal browser.
5. **Quartile ranges** of sales or valuations are not published by INE in the API. To ask INE: https://www.ine.pt (Pedidos de informação). The quarterly press release of "Estatísticas de Preços da Habitação ao nível local" is the place to check for any dispersion measure.

## Coverage (308 municipalities; parishes: INE geografia 2025 = 652 in the 59 municipalities with parish detail; repo map = 489)

| Tile / table | Municipalities with a value | Parishes with a value | Latest period | Gaps |
|---|---|---|---|---|
| Sales €/m², total (0014763) | 304 / 308 | 358 / 652 (59 municipalities only) | 2026-Q2 | Empty cells are INE "Dado nulo ou não aplicável" |
| Sales €/m², new | 161 | 153 | 2026-Q2 | |
| Sales €/m², existing | 302 | 314 | 2026-Q2 | |
| Sales 5-year change (total) | 290 | 280 | vs 2021-Q2 | Parishes created or split in 2025 have none |
| Sales by typology (0014759), at least one typology | 56 of the 58 published | 237 | 2026-Q2 | Published only for 58 municipalities and their parishes |
| Bank valuation, monthly (0012248) | 156 total; 98 apartments; 111 houses | n/a (not published) | Sep 2026 | Many confidential |
| Bank valuation, annual (0012256) | 261 total; 165 apartments; 251 houses | n/a | 2025 | |
| New-build €/m² (projects.json) | 4 municipalities (Lisboa, Grândola, Loulé, Gondomar) | n/a | Oct–Nov 2026 | Partner projects: none published |
| Sunshine (IPMA 1971–2000, nearest of 48 stations) | 308 | via municipality | 1971–2000 | 80 municipalities are more than 30 km from their station, 15 more than 50 km (max 129 km, Horta to Angra). Licence blocks publication |
| Temperature/precipitation (IPMA 1991–2020, nearest of 57 stations) | 308 | via municipality | 1991–2020 | |
| SST (32 stretches) | 308 (nearest stretch, with km) | via municipality | 1991–2020 | |
| Nearest sea bathing water (straight line) | 308 | 489 (repo parishes) | 2026 | |
| Nearest PT airport (straight line) | 308 | 489 | — | |
| Flight block times | 0 / 70 routes | — | — | Not fetched (see above) |
| Nearest international school | 289 (19 Azores: none in region) | 489 | 2026-11-02 list | 5 schools without coordinates |
| Nearest public emergency hospital | 308 | 489 | 2026-11-02 list | Health-centre emergency points missing |
| Doctors per 1 000 (0012837) | 308 | n/a (INE publishes no parish value) | 2025 | |
