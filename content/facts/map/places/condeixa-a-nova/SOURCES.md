# Condeixa-a-Nova: place card (Centro roll-out of the golden sample, operator's step 2, region 2, 3 Nov 2026)

Built exactly as Gondomar (content/facts/map/places/gondomar/SOURCES.md has the full method). Everything here was checked on **2026-11-03** at the source named in each row; nothing is estimated. `scripts/map-data/place_cards.py` turns this folder into the free card (`site/public/data/map/place/condeixa-a-nova.json`, key `c5`) and the paid analysis (`site/src/data/mapanalysis.json`, key `card`).

## Origin point

**Câmara Municipal de Condeixa-a-Nova**, 40.11290 N, 8.49902 W. Source: OpenStreetMap (Nominatim), amenity=townhall (node/1911761539). Every drive time starts here.

## Drive times: `routes.csv`

OSRM (`router.project-osrm.org`, car profile, OpenStreetMap data), one `table` request from the origin to every point; free-flow times (no traffic), shown rounded to the minute.
- Nearest sea beach by drive time (10 APA sea bathing waters checked, the nearest by straight line): **Praia do Forte (Figueira da Foz), 42 min**.
- Regional centre (by rule: the nearest of the district capitals Aveiro, Coimbra, Leiria, Viseu, Guarda and Castelo Branco by drive time): **Coimbra, Praça 8 de Maio, 18 min**.
- Airport: **Aeroporto do Porto (OPO), terminal, 96 min** (the nearer of Porto and Lisbon by drive time; Lisbon, Terminal 1: 123 min).
- Flights per edition: the golden sample's published schedules from Porto (OPO), the nearest Portuguese airport (facts `flight-*` in content/facts/facts.csv); Israel: TLV–LIS, no direct flight.

## Schools: `schools.csv`

5 within 20 minutes by car: DGEEC InfoEscolas private network (2023/24 data, every NUTS III of the Centro and the neighbouring Grande Lisboa, Península de Setúbal, Alentejo Central, Alto Alentejo, Área Metropolitana do Porto, Douro and Tâmega e Sousa; Fátima's three schools and the other InfoEscolas schools without an OpenStreetMap match placed by hand on their own OSM object, `routes.csv`; general schools to the 3rd cycle or secondary, vocational, arts and music schools left out) and the international schools, each verified on its own site (in the Centro: Leiria International School, Marinha Grande; none within 20 minutes of this place). Points: OpenStreetMap (Nominatim), the school's own OSM object. `card = 1`: the seven on the free card (international schools first, then the nearest).

## Health: `health.csv`

7 hospital(s) and 6 SNS primary-care unit(s) within 20 minutes by car, every one named as registered in the **ERS public register** (`www2.ers.pt/DMZ/Pesquisa`, registration number in `registry`). The point is the register's own map pin where it falls inside the concelho of the registered address, otherwise the hospital's OpenStreetMap object (`routes.csv`, `point_source`). The SNS portal refused the build environment (HTTP 405). On the card: the nearest centro de saúde (USF or UCSP) and up to six hospitals.

## Photographs

Photographs to come (operator, 3 Nov: the card ships without them, the photo step follows).

## The one line

"As ruínas romanas de Conímbriga, e o centro de Coimbra a 18 minutos de carro." The Roman ruins of Conímbriga are in the municipality of Condeixa-a-Nova (OpenStreetMap, "Ruínas de Conímbriga", way/122078220); 18 minutes is the OSRM time to Coimbra, Praça 8 de Maio.
