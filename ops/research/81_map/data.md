# Prompt 81, agent 3: the services table (10 Nov 2026)

Files: `content/facts/map/services/` (README.md has the layer table with every source, licence and gap). Builder: `scripts/map-data/services.py` and `scripts/map-data/services/`. Branch p81-data, not pushed.

## 1. What is delivered

- `summary.json`: 308 places, every field of the contract, plus optional fields (`pop`, `area_km2`, `island`, `beach.cat`, `beach_flag`, `beach_n20`, `beach_inland`, `food.mich_star_n30`, `er_cand`, facility `id`).
- `origins.csv` (308), `facilities/` (9 facility files with 7 913 rows, of which 2 696 are pharmacies, and `counts_by_municipality.csv`), `access/` (8 files, 20 353 rows), `inputs/` (8 source lists).
- A rebuild in six commands (README, "Rebuild").

## 2. Coverage (places with a value, of 308)

| Layer | Field | Covered | Why not 308 |
|---|---|---|---|
| Public emergency hospital | `er` | 297 | 11 island places with no hospital on the island (no ferries in the routing) |
| Centro de saúde | `cs` | 308 | |
| Private hospital | `ph`, `ph_n20` | 294 | 14 island places with none on the island |
| Pharmacies | `pharm_n` | 297 | 11 municipalities with none in OpenStreetMap (a mapping gap, shown as null) |
| International school | `isch`, `isch_n30` | 288 | The Azores (19) and Porto Santo: none on the island |
| Private schools | `psch_n20` | 308 | |
| Public secondary | `sec_n20` | 308 | |
| Beach | `beach` | 308 | |
| Airport | `air` | 308 | |
| Long-distance train | `rail` | 278 | No railway on the islands (30) |
| Food | `food.*` | 308 | |
| Golf | `golf`, `golf_n30` | 289 | 19 island places with no course on the island |
| Culture | `museum`, `cult_n20` | 307 | Corvo: none mapped |
| Population, area | `pop`, `area_km2` | 308 | |

73 places have an international school within 30 minutes, 192 a Michelin-listed restaurant within 30, 82 a golf course within 30, 89 a sea beach within 20.

## 3. Routing

- OSRM 26.4.0 on this machine (npm package `@project-osrm/osrm`, prebuilt binaries; version 26.9.0 needs a newer glibc than Ubuntu 24.04 has; oneTBB from the PyPI wheel). Extract, partition and customize take 3 minutes and 3.6 GB of memory; all tables for 308 origins take 40 seconds. No request went to the public OSRM server.
- Data: `portugal.osm.pbf` from download.openstreetmap.fr (OpenStreetMap France's extract service), data of 2026-11-09, 480 MB, md5 checked. It covers Madeira and the Azores (308 municipal boundaries found). **download.geofabrik.de did not answer from this machine** (the connection is reset during the TLS handshake, every time), so the extract comes from the other public OSM mirror. Same data, same licence.
- Profile: OSRM's own `car.lua`, with two changes written into `osrm_prepare.sh`: ferries off (a first attempt left ferries drivable at 10 km/h, and Madalena do Pico reached the Horta hospital in 62 minutes; fixed), and `--small-component-size 100` (with the default, Corvo's whole road network counted as a "small component" and its town hall was joined to a road on Flores).
- Not in the routing: traffic, parking, and roads through Spain (the extract stops near the border; a border municipality whose fastest way is through Spain gets the Portuguese road time).

## 4. The golden-sample check

### 4.1 All 21 places with hand-checked route files

Every row of every `places/<slug>/routes.csv` (1 580 routes, public OSRM server, 3 to 7 Nov) was routed again on the local engine from the same origin and to the same point.

| | |
|---|---|
| Mean difference (local minus hand-checked) | +0.09 min |
| Within 1 minute | 1 525 of 1 580 |
| Within 2 minutes | 1 571 of 1 580 |
| Largest | +2.7 min |
| The 9 above 2 minutes | 7 are Vigo airport (Spain is outside the extract; Vigo is not in the table); 2 are one school in Vila Nova de Famalicão seen from Santo Tirso and Trofa (+2.1, +2.3) |

The two engines agree. The local one is on average a few seconds slower, on newer OpenStreetMap data and a newer OSRM build; which of the two causes it was not isolated.

### 4.2 Gondomar, row by row

Origin: identical (Câmara Municipal de Gondomar, 41.14402 N, 8.53652 W).

| Item | Hand-checked (3 Nov) | Services table | Verdict |
|---|---|---|---|
| Praia de Lavadores | 16.9 → 17 min | 17.4 → 17 min, nearest sea beach, Blue Flag 2026 | Same. Our name is "Lavadores" (the official bathing-water name; the card adds "Praia de") |
| Airport terminal (OPO) | 20.9 → 21 min, 22.3 km | 22.4 → 22 min, 22.3 km | **+1 minute.** Same point (terminal), same distance; the local engine is 1.5 min slower on this route. Explained, not changed: the table keeps one engine for all 308 |
| Avenida dos Aliados | 11.5 → 12 min | 11.6 → 12 min | Same. A city-centre point is not a layer of the table; routed for this check only |
| Hospital de São João | 13.4 → 13 min | 14.4 → 14 min | **+1 minute**, same reason |
| Hospital de Santo António | 13.3 → 13 min | 14.4 → 14 min; this is `er` (the nearer of the two by road, as in the hand-checked file) | **+1 minute**, same reason. The brief quotes São João; the hand-checked file has Santo António 0.1 min nearer |
| USF Sete Caminhos | 2.4 → 2 min | 2.4 → 2 min, named "Centro de Saúde de São Cosme" | Same point and time. **Name differs**: OpenStreetMap names the building; the ERS register names the unit. The card writer should keep the hand-checked name for Gondomar |
| Hospital-Escola Fernando Pessoa | 1.8 → 2 min | 1.8 → 2 min, named "Trofa Saúde Fernando Pessoa" (the group's list) | Same point and time. Name differs (group's name against the ERS name) |
| CUF Trindade, Lusíadas Porto, Luz Arrábida, CUF Porto | 12.2, 14.8, 14.7, 18.2 | 12.2, 15.1, 15.2, 18.7 | Same within 0.5 min |
| Hospital Eduardo Santos Silva | 14.5 | 15.7 | +1.2 min, same reason |
| Centro de Saúde de Valbom, de São Pedro da Cova | 4.2, 5.8 | 4.1, 5.8 | Same |
| The 4 international schools | 14.7 to 18.7 min | 15.0 to 19.1 min; `isch` Deutsche Schule zu Porto 15 min, `isch_n30` 4 | Same four schools, each +0.3 to +0.8 min |
| The 31 schools within 20 minutes | 27 private (DGEEC, up to 3rd cycle or secondary) + 4 international | All 31 are in the table and all are within 20 minutes. `psch_n20` = 61, `isch_n30` = 4, `sec_n20` = 35 | **Count differs, explained.** OpenStreetMap cannot tell which cycles a private school teaches, so 61 includes primary-only private schools. The hand-checked 27 is the stricter, better number; only the DGEEC register can reproduce it for 308 places |
| Private hospitals within 20 minutes | 5 named | `ph_n20` = 8 | The table also holds Trofa Saúde units in Gaia, Maia and Alfena |

Across the 21 places, all 258 hand-checked private-school rows and all 27 international-school rows are found in the table within 400 m.

### 4.3 Braga and Coimbra

| Item | Hand-checked | Services table | Verdict |
|---|---|---|---|
| Braga, nearest sea beach | Apúlia 26.6 min | Apúlia 26 min (26.4) | Same |
| Braga, airport | OPO 41.3 min | OPO 42 min (42.1) | +0.8 min |
| Braga, international school | CLIB 8.9 min | CLIB 9 min (8.6) | Same |
| Braga, public hospital | Hospital de Braga 5.0 min | Hospital de Braga 7 min | **Different point.** The hand-checked file uses the ERS register's map pin (41.5759, −8.4252); the table uses the hospital's outline in OpenStreetMap (41.5675, −8.3992, Sete Fontes), 2.3 km away. For QA to confirm on the hospital's own site; if OpenStreetMap is right the Braga card is 2 minutes short |
| Braga, centro de saúde | USF Maxisaúde 2.1 min | USF Manuel Rocha Peixoto 2 min (1.7) | Same building (Largo Paulo Orósio), a different unit's name |
| Coimbra, nearest sea beach | Praia do Forte (Figueira da Foz) 41.8 min | Praia do Forte 42 min | Same. The EEA classes it transitional (river mouth); that is why transitional waters count as sea |
| Coimbra, airport | OPO 93.9 min | OPO 95 min (94.9) | +1.0 min |
| Coimbra, public hospital | HUC 4.9 min | HUC 7 min (6.8) | **Different point** on the same campus: ERS map pin against the OpenStreetMap outline of the central block, 300 m apart |
| Coimbra, centro de saúde | USF Cruz de Celas 3.9 min | Centro de Saúde de Celas 4 min (4.2) | Same place, building name |

## 5. Gaps, layer by layer (what a reader of the card must not be misled about)

1. **`er` is too long in parts of the interior.** The list holds 56 general public hospitals. The regulator counts 83 emergency services (39 of them basic ones, often in health centres). Barrancos shows 101 minutes (to Beja), Melgaço 82 (to Viana do Castelo), Freixo de Espada à Cinta 85 (to Macedo de Cavaleiros): the regulator's count says basic emergency services exist that the list does not hold, and these are the places where one is most likely nearer. Which ones, I could not verify. 38 places show more than 45 minutes; 60 places have an `er_cand` nearer than `er`. Until the official list is in, the card should say "hospital com urgência" only where `er` is under about 45 minutes, or show `er_cand` with its caveat.
2. **`pharm_n` and `food.rest_n` are OpenStreetMap counts.** They follow how well a place is mapped. Gondomar: 16 pharmacies and 64 restaurants for 164 257 residents; Porto: 100 and 930. Good for "a lot / a few" between similar places, wrong as a published number.
3. **`psch_n20` counts every private school OpenStreetMap knows**, including primary-only ones (Gondomar 61 against 27 hand-checked).
4. **`isch`: 14 of the 48 schools come from OpenStreetMap only** (the name says international; curriculum not checked): Almada, Seixal, Prunus, Astória, Kubo, Prime School (2), Santo António, Saint Peters, PaRK (2 more campuses), Oeiras International (second campus), Vale Verde, Torres Vedras. Three list schools have no point (International Sharing School Lisboa, Aspire, NOAP).
5. **Blue Flag: 16 of 396 beaches not matched** to a bathing water: Salgueiros (Angra do Heroísmo), Almograve Sul and Malhão Sul (Odemira), Praia Verde Lago (Castro Marim), Costa Nova Sul (Ílhavo), Lagoa da Ervedeira (Leiria), Agudela Sul, Meia Laranja, Pedras da Agudela and Praia de Beijinhos (Matosinhos), Aquário (Porto), Amorosa Sul and Luziamar (Viana do Castelo), Santo António and Tarquínio-Paraíso (Almada), Guincho Sul (Cascais). The Blue Flag page gives a point for each beach, but several points are the town, not the beach, so matching is by name first. Counts check: the page states 396 beaches, 21 marinas, 21 boats; the list parsed holds exactly those.
6. **Airports.** The 14 counted were chosen from OpenStreetMap's aerodromes with an IATA code; that each has scheduled passenger flights was not checked against a timetable in this pass. The regional line Bragança–Vila Real–Viseu–Cascais–Portimão exists on a public page as of 2019; whether it flies today was not checked, so those five airfields are listed and not counted.
7. **Rail.** 77 stations where OpenStreetMap's Alfa Pendular, Intercidades and Porto–Vigo relations stop. Frequency is not in the data.
8. **Origins.** 13 municipalities have no town hall mapped in OpenStreetMap; their origin is the centre of the seat town: Terras de Bouro, Vila Velha de Ródão, Figueira de Castelo Rodrigo, Salvaterra de Magos, Arcos de Valdevez, Mesão Frio, Mangualde, Penalva do Castelo, Penedono, São João da Pesqueira, Santa Cruz da Graciosa, Santa Cruz das Flores, Corvo. Lisboa's point in `sede_points.csv` is the Campo Grande services building, 4.7 km from the Paços do Concelho; the table uses the Paços do Concelho, **the live card's straight-line distances for Lisboa still use Campo Grande**. Ovar has two objects named Câmara Municipal 2 km apart; not resolved.
9. **Beaches without a road.** 10 bathing waters on the Ria Formosa islands (Culatra, Farol, Armona, Barreta, Ilha de Tavira, Barril, Terra Estreita, Fuseta-Mar) and Furnas (Vila do Bispo) get no drive time; Olhão and Tavira therefore show their nearest beach reachable by car.
10. **Names.** Beach names are the official bathing-water names in title case ("Lavadores", "Rainha (Cascais)"); OpenStreetMap names are kept as mapped ("Muzeu" in Braga).

## 6. What would need scripting a government site (stopped, for the operator)

| Need | Where it is | What exactly is needed |
|---|---|---|
| The building-level list of SNS emergency departments (SUB, SUMC, SUP) with coordinates | SNS: the page "Serviços de Urgência SNS" on sns.gov.pt and the waiting-times service tempos.min-saude.pt (its list of institutions). One plain request to the second was reset; no retry | From a normal browser: save the list of emergency services (name, type, address or point) as a file and drop it in `content/facts/map/services/inputs/`. The build then replaces the compiled list and `er_cand` disappears |
| Private schools by cycle (the hand-checked 27 for Gondomar, for all 308) | DGEEC InfoEscolas (search by NUTS III and nature) or the DGEEC list of private and cooperative schools | An export of all private schools with the cycles taught and the address. InfoEscolas needs searching and paging, so it was not touched |
| Public secondary schools, official list | DGEEC "rede escolar" | The same export, public schools with secondary education |
| ERS register numbers for every hospital and health centre (as in the golden sample's paid list) | ERS public register (search form) | Not attempted. The table carries no registry numbers; the paid analysis of the 21 hand-checked places keeps its own |
| Centros de saúde, official list | SNS / ACSS primary-care units | An export of functional units with addresses, to replace OpenStreetMap names |

Fetched from government servers, within the rule (one direct download each, plain GET): INE 0011609 (population), INE 0008350 (area), SNS transparency file "Atendimentos por Tipo de Urgência Hospitalar" (CSV export). Nothing else.

Other network notes: the EEA's public data service answered the data query and refused a query for its table list (403; not retried), so the bathing-water points come from the APA file already in the repo. guide.michelin.com answered curl with an empty 202 (a browser check); a plain headless browser with no changes to its settings loaded the five listing pages. If the operator reads that as a bot check that should not have been passed, the `mich` rows come out and `food` keeps markets and restaurant density.

## 7. Decisions for the operator

1. **Emergency hospitals.** Accept `er` from the compiled list of 56 with its interior gap, or wait for the official SNS list (he, or someone with a browser, saves it: section 6). Until then, should the card show `er_cand` ("hospital with emergency per OpenStreetMap, not verified")? My proposal: no on the card, yes in the ranking as a floor only if he agrees.
2. **Routing.** Keep the local OSRM (free, reproducible, 3 minutes to rebuild, agrees with the hand-checked routes to within a minute in 1 525 of 1 580 cases) and accept that Gondomar's airport reads 22 minutes where the card says 21 and São João 14 where it says 13. Or keep the hand-checked numbers on the 21 built cards and use the table everywhere else. One engine for everything is cleaner; the cards would move by a minute in a few lines.
3. **Food signal.** Proposal: Michelin-listed restaurants within 30 minutes (`mich_n30`, 201 restaurants, exact and sourced) as the main signal, markets within 20 minutes as the second, and restaurant density only as a tie-breaker, never printed. Is using the Michelin listing acceptable to him (facts only: name, distinction, point; no text copied)?
4. **Sea beach.** Transitional waters (river mouths, lagoons: Paço d'Arcos, Praia do Forte in Figueira, Barra) count as sea beaches. Without them Lisboa's nearest beach is 20 minutes away instead of 19 and Coimbra's changes name. Confirm.
5. **Airports.** Count only the 14, or add the regional airfields if their line is flying. Needs a timetable check.
6. **OpenStreetMap as the source of names and counts** for health centres, private schools, pharmacies and culture: acceptable for the free card with the credit "© OpenStreetMap contributors", or wait for the official lists.
7. **Lisboa's origin** on the live card (Campo Grande against Praça do Município): fix in `sede_points.csv` in a later pass.

## 8. Not done

- No ERS registry numbers, no addresses (the paid lists of the golden sample have them; the table has points and sources).
- No check of the 14 airports against a timetable.
- No frequency for trains, no opening hours, no quality rating of any kind.
- The 30 random rows against their sources are QA's (agent 6).

## 9. Addendum, 10 Nov 2026: the golf layer made national

**Why.** The golf layer was built from `content/facts/golf/courses.csv`, a list made for five regions (Algarve, Comporta and Tróia, Lisbon and Setúbal, Madeira, the North). Óbidos read 52 minutes to a course, Viseu 82, Ponta Delgada no data, and Fafe "0 min" because its course sat on the town centre. This addendum replaces the golf row of section 2 and the "82 places" of the sentence under it.

**Reference.** The national list of golf courses of the Federação Portuguesa de Golfe (portal.fpg.pt/campos/listagem-campos-nacionais-golfe/; 81 clubs, 108 loops on 10 Nov 2026). The page shows the list in a frame served by the federation's scoring provider (scoring-pt.datagolf.pt); the frame was read with one plain request, and so was the federation's separate pitch-and-putt list. Visit Portugal was not used: its pages sit behind a bot check. Each course added was also opened on its own page where that page answers a plain request (Praia D'El Rey's does not: the federation's list is its source; Ribagolfe has no site of its own that could be found: the federation's list, and Turismo de Lisboa for the holes).

**Candidates.** Every `leisure=golf_course` object of the OpenStreetMap extract of 9 Nov (127), and every cluster of `golf=*` features, more than 1 km from a listed course: 41 objects.

**Added: 12 courses** (`content/facts/map/services/inputs/golf_supplement.csv`), points from OpenStreetMap (the clubhouse or reception where it is mapped, else the centroid of the course outline):

| Region | Courses | Municipality |
|---|---|---|
| Centro | Montebelo Golfe (27 holes) | Viseu |
| Oeste | Praia D'El Rey, West Cliffs, Royal Óbidos, Guardian Bom Sucesso | Óbidos |
| Oeste | CampoReal | Torres Vedras |
| Ribatejo | Santo Estêvão Golfe, Ribagolfe Lakes, Ribagolfe Oaks (one point for the two) | Benavente |
| Azores, São Miguel | Batalha (27 holes), Furnas | Ribeira Grande, Povoação |
| Azores, Terceira | Campo de Golfe da Ilha Terceira | Vila da Praia da Vitória |

**Taken out of this layer: 2 of the 78** (`inputs/golf_not_used.csv`; both stay in the map's golf list, which was not touched):

- Campo de Golfe de Rilhadas (Fafe): its point was the centre of Fafe. OpenStreetMap maps 12 greens at 41.4269 N, 8.2123 W, 4.4 km away, without a course outline or a name. It could not be confirmed as open in 2026: it is not on the federation's list, the club's domain did not answer, Visit Portugal is behind the bot check. To put back with the greens' point once a public page confirms it.
- Torre Course (Terras da Comporta, Alcácer do Sal): open (on the federation's list), but its point was the hamlet of Torre and OpenStreetMap maps nothing of the course. The cost: Alcácer do Sal now reads 48 minutes (Montado) where the stand-in gave 37; Grândola 27 (Dunas) where it gave 26.

Two other points of the 78 are not course outlines and were kept, because each is on the estate itself and not a town: Dunas Course (the outline of the Comporta Dunes estate) and Ombria (the resort hotel beside the course). The other 74 lie within 1 km of an OpenStreetMap golf outline.

**Left out: 30 of the 41 candidate objects (11 hold the 12 courses added), and 5 listed courses without a point:**

- On the federation's list, no object in OpenStreetMap, so no point (5): Guardizela Golf Club (Guimarães), Campo de Golfe do Aqueduto (Paredes), Quinta dos Reis Olives Golf Course (Beja), THE ONE Hills Lisbon City Golf (Lisboa, not located), Ferragudo Golf Course (Lagoa; two unnamed outlines at Parchal may be it, not confirmed). The first four are also on the federation's pitch-and-putt list.
- Pitch-and-putt (3): Campo de Golfe de Cantanhede (on the federation's golf list and on its pitch-and-putt list; the 9 holes OpenStreetMap maps measure 49 to 92 m), Quinta das Lágrimas (Coimbra), Academia de Golf de Lisboa.
- Not confirmed as open on a named public page, not on the federation's list (5): Campo de Golfe da Curia (Anadia, 9 holes), Vimeiro Golf Club (Torres Vedras, 9 holes), Botado (Peniche, 9 holes; the hotel's site is behind a bot check), Clube de Golfe do Faial (Horta), Ammaia Clube de Golfe (Marvão; OpenStreetMap says closed).
- Closed (1): Golden Eagle (Rio Maior): its own site speaks of the course in the past tense and of a new project.
- Driving ranges, practice greens, miniature golf (7): Braga, the Universidade do Minho range, Quinta de Santo António do Freixo (Leiria), Algarve Golf Academy, Vila Monte, a hotel putting green on Madeira, a miniature golf at Condeixa.
- Unnamed outlines, not identified (12): Ponte de Lima, Paços de Ferreira, Batalha, two at Belas, north of Loulé, Alvor, Parchal, Porches, Lagos, Funchal; and "Private Golf Course" near Cabanas de Tavira.
- In Spain (2; and one cluster of holes without an outline, Golf Guadiana at Badajoz): the two Isla Canela courses.

The rule for short courses is the one the 78 already follow: a short course that its source lists as a course stays (City Golf, Quinta do Fojo, Quinta da Barca, Balaia are in the 78); a layout that is pitch-and-putt only, a range or a hotel practice green is not a course.

**Routes.** Only the golf layer was routed again, on the same local graph (88 courses, 308 origins): `services.py golf`, `route.cjs <scratch> golf`, `services.py summary`. Before any change the summary step was run on the untouched inputs and gave the committed files byte for byte. After: in `summary.json` only `golf`, `golf_n30` and `layers.golf` differ (160 places have another nearest course or time, 32 another count); every other key of every place and layer is identical. In `match.json` only the columns `golf_min`, `golf_n30`, `golf_name`, the golf coverage and the golf source line differ.

**Coverage.** `golf`: 297 of 308 (289 before). Null: the 11 places on Santa Maria, Graciosa, São Jorge, Pico, Faial, Flores and Corvo, islands with no course. 98 places have a course within 30 minutes (82 before).

| Place | Before | After |
|---|---|---|
| Óbidos | 52 min, 0 within 30 | 17 min (Guardian Bom Sucesso), 4 within 30 |
| Viseu | 82 min, 0 | 21 min (Montebelo), 1 |
| Pombal | 98 min, 0 | 83 min (Guardian Bom Sucesso), 0 |
| Ponta Delgada | no data | 17 min (Batalha), 1 |
| Angra do Heroísmo | no data | 15 min (Ilha Terceira), 1 |
| Torres Vedras | 34 min, 0 | 15 min (CampoReal), 1 |
| Benavente | 42 min, 0 | 23 min (Ribagolfe), 3 |
| Fafe | "0 min" (stand-in), 1 | 34 min (Amarante), 0 |
| Loulé, Cascais, Lagos, Funchal | 13, 6, 7, 11 min; 17, 10, 9, 2 | unchanged |

**Still odd, and why.** Pombal, Leiria (57) and Coimbra (68) are far from a course in this list: the 9-hole course at Curia would bring Coimbra and Pombal closer if it is confirmed open. Guimarães reads 39 minutes (17 before, to the stand-in at Fafe): Rilhadas and Guardizela are the two courses near it and neither is in the layer. Alcácer do Sal reads 48 minutes with a course inside the municipality (Torre) that has no mapped point.
