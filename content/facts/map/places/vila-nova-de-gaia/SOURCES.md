# Vila Nova de Gaia: place card (Norte roll-out of the golden sample, operator's step 2, 3 Nov 2026)

Built exactly as Gondomar (content/facts/map/places/gondomar/SOURCES.md has the full method). Everything here was checked on **2026-11-03** at the source named in each row; nothing is estimated. `scripts/map-data/place_cards.py` turns this folder into the free card (`site/public/data/map/place/vila-nova-de-gaia.json`, key `c5`) and the paid analysis (`site/src/data/mapanalysis.json`, key `card`).

## Origin point

**Câmara Municipal de Vila Nova de Gaia**, 41.13004 N, 8.60662 W. Source: OpenStreetMap (Nominatim), amenity=townhall (way/196504094), Avenida da República. Every drive time starts here.

## Drive times: `routes.csv`

OSRM (`router.project-osrm.org`, car profile, OpenStreetMap data), one `table` request from the origin to every point; free-flow times (no traffic), shown rounded to the minute.
- Nearest sea beach by drive time (10 APA sea bathing waters checked, the nearest by straight line): **Lavadores (Vila Nova de Gaia), 9 min**.
- Centre (by rule: the nearest of Porto, Braga, Viana do Castelo, Vila Real and Bragança by drive time): **Porto, Avenida dos Aliados, 7 min**.
- Airport: **Aeroporto do Porto (OPO), terminal, 20 min** (Vigo, Spain, is farther or more than 110 km away).
- Flights per edition: the golden sample's published schedules from Porto (OPO), the nearest Portuguese airport (facts `flight-*` in content/facts/facts.csv); Israel: TLV–LIS, no direct flight.

## Schools: `schools.csv`

33 within 20 minutes by car: DGEEC InfoEscolas private network (2023/24 data, every NUTS III of the Norte and the neighbouring Região de Aveiro, Viseu Dão Lafões and Beiras e Serra da Estrela; general schools to the 3rd cycle or secondary, vocational, arts and music schools left out) and the international schools, each verified on its own site. Points: OpenStreetMap (Nominatim), the school's own OSM object. `card = 1`: the seven on the free card (international schools first, then the nearest).

## Health: `health.csv`

16 hospital(s) and 6 SNS primary-care unit(s) within 20 minutes by car, every one named as registered in the **ERS public register** (`www2.ers.pt/DMZ/Pesquisa`, registration number in `registry`). The point is the register's own map pin where it falls inside the concelho of the registered address, otherwise the hospital's OpenStreetMap object (`routes.csv`, `point_source`). The SNS portal refused the build environment (HTTP 405). On the card: the nearest centro de saúde (USF or UCSP) and up to six hospitals.

## Photographs

See `content/media/SOURCES.md`, "Norte roll-out: place cards". 

## The one line

"O cais do Douro em frente à Ribeira, as praias do Atlântico, e os Aliados a 7 minutos de carro." The Cais de Gaia faces Porto's Ribeira across the Douro, and the municipality's coast runs from Lavadores to Granja (OpenStreetMap; APA bathing waters; the photographs); 7 minutes is the OSRM time to the Avenida dos Aliados.
