# Vila do Conde: place card (built as the golden sample, 4 Nov 2026)

Operator, 4 Nov 2026: "Why don't you have school or hospitals data?" Built exactly as Gondomar (content/facts/map/places/gondomar/SOURCES.md has the full method) and the Norte roll-out (ops/ACCEPTANCE_PLACE_CARD.md, "Norte roll-out"). Nothing is estimated. `scripts/map-data/place_cards.py` turns this folder into the free card (`site/public/data/map/place/vila-do-conde.json`, keys `c5` and `arr`) and the paid analysis (`site/src/data/mapanalysis.json`, key `card`).

## Origin point

**Câmara Municipal de Vila do Conde**, 41.35423 N, 8.74335 W. Source: OpenStreetMap (Nominatim), amenity=townhall (way/75689015), Praça Vasco da Gama. Every drive time starts here (the same rule as Gondomar and the roll-out: the town hall, not a development).

## Drive times: `routes.csv`

OSRM (`router.project-osrm.org`, car profile, OpenStreetMap data), `table` service from the origin to every point; free-flow times (no traffic), shown rounded to the minute. Computed on 2026-11-03 in the Norte roll-out; the 14 SNS family health units of the ULS Póvoa de Varzim/Vila do Conde were added on 2026-11-04 with one more `table` request.
- Nearest sea beach by drive time (10 APA sea bathing waters checked): **Praia de Vila do Conde (APA bathing water PTCF8V, "Frente Urbana Norte"), 3 min**.
- Centre (the nearest of Porto, Braga, Viana do Castelo, Vila Real and Bragança by drive time): **Porto, Avenida dos Aliados, 29 min**.
- Airport: **Aeroporto do Porto (OPO), terminal, 20 min**.
- Flights per edition: the golden sample's published schedules from Porto (facts `flight-*` in content/facts/facts.csv); Israel: TLV–LIS, no direct flight.

## Schools: `schools.csv`

**2 within 20 minutes by car**, both on the card: Colégio do Forte (Vila do Conde, 4 min) and Colégio de Amorim (Póvoa de Varzim, 8 min). Source: DGEEC InfoEscolas private network (2023/24 data, every NUTS III of the Norte and its neighbours; general schools to the 3rd cycle or secondary; vocational, arts and music schools left out), each placed on its own OpenStreetMap object; checked 2026-11-03. Public schools are not counted (the same rule as Gondomar). The international schools of Porto (CLIP, Oporto British School, Lycée Français International de Porto, Deutsche Schule Porto) are all more than 20 minutes away by car. The schools' own sites were not opened for this pass (`school_site` is empty, as for the roll-out's private schools).

## Health: `health.csv`

5 hospitals and 6 SNS family health units within 20 minutes by car, every one named as registered in the **ERS public register** (`www2.ers.pt/DMZ/Pesquisa`, registration number in `registry`). The point is the register's own map pin.
- Hospitals (checked 2026-11-03): Unidade Hospitalar de Vila do Conde (ULS Póvoa de Varzim/Vila do Conde, ERS 124937) 1 min; Hospital da Luz Póvoa de Varzim (ERS 105263) 4 min; Unidade Hospitalar da Póvoa de Varzim (ULS Póvoa de Varzim/Vila do Conde, ERS 104485) 5 min; Hospital Privado da Boa Nova (Matosinhos) 17 min; Hospital São João de Deus (Fão, Esposende) 18 min.
- Centros de saúde (ERS establishment pages re-read on 2026-11-04): the nearest is **USF Santa Clara** (ERS 130338), Rua Doutor António José de Sousa Pereira, Vila do Conde, 1 min; USF Aqueduto (ERS 130340) is at the same address. The register's map pin for both is the same as the hospital's (the units sit beside the Unidade Hospitalar de Vila do Conde). Also within 20 minutes: USF Navegantes (ERS 130341) 4 min, and the Póvoa de Varzim units.
- The Norte roll-out's crawl had missed the ULS Póvoa de Varzim/Vila do Conde family health units (their establishment pages had not been read), so it named USF Dunas (Matosinhos) as the nearest centro de saúde; that is corrected here.
- The SNS portal refused the build environment (HTTP 405), as before.

## The arrival line and the last line

"O mar e o Ave, a 41 minutos da Trindade de metro." (facts.csv `metro-b-vila-do-conde`, Metro do Porto line B timetable, Bx express; checked 2026-11-03). The drive time to the Aliados (29 min) is in the answers ("Porto? 29 min."). "O aqueduto de Santa Clara foi construído com 999 arcos." (facts.csv `vdc-aqueduct`, Câmara Municipal de Vila do Conde, re-checked 2026-11-04).

## Photograph

The one the map already showed: `img/v2/vila-do-conde-foz-do-ave-do-ar-*` (site/src/data/place-photos.json; credits in content/media/SOURCES.md).
