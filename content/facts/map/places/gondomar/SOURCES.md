# Gondomar: the golden sample place card (operator's step 1, 3 Nov 2026)

Everything in this folder was checked on **2026-11-03** at the source named in each row. Nothing is estimated. `scripts/map-data/place_cards.py` (called by `scripts/map-data/tiles.py`) turns it into the free card (`site/public/data/map/place/gondomar.json`, key `c5`) and the paid analysis (`site/src/data/mapanalysis.json`, key `card`).

## Origin point

**Câmara Municipal de Gondomar, Praça Manuel Guedes**, 41.14402 N, 8.53652 W (OpenStreetMap, `amenity=townhall`, found with Nominatim). Every drive time starts here.

## Drive times: `routes.csv`

- Engine: OSRM, the public demo server `router.project-osrm.org`, car profile, OpenStreetMap data. One `table` request (origin to every point) and nine `route` requests to spot-check the headline points; both agree to the minute. Durations are OSRM's free-flow times (no traffic) and are shown rounded to the minute, "de carro". Straight lines are never used on the card.
- Points: OpenStreetMap through Nominatim (1 request a second), except CLIP, whose own contact page gives its GPS point. `osrm_snapped_*` is where OSRM joined the road network.
- Nearest sea beach by drive time: six were checked (Matosinhos, Homem do Leme, Molhe, Gondarém, Lavadores, Salgueiros); **Praia de Lavadores (Vila Nova de Gaia), 17 min**, is the nearest. Porto centre: Avenida dos Aliados, 12 min. Porto airport (OPO): the passenger terminal (OSM `aeroway=terminal`), 21 min.

## Flights: `place.json` → `content/facts/facts.csv`

Only published schedules, per edition: LUX–OPO 2 h 30 (Luxair LG3761), ORY–OPO 2 h 15 (TAP TP455), GVA–OPO 2 h 30 (TAP TP939), GRU–OPO 10 h 00 (TAP TP94), EWR–OPO 6 h 40 (TAP TP212): PlaneMapper schedule pages, checked 2026-11-03 (facts `flight-*`). Israel: no direct Tel Aviv–Porto flight was found in the schedules checked; the card shows TLV–LIS 6 h 10 (El Al LY375) "até Lisboa, sem voo direto". A connection Lisboa–Porto is not added (no published connection time was fetched).

## Schools: `schools.csv`

- "Within 20 minutes" means OSRM time from the origin ≤ 20 min. All 31 rows qualify.
- Portuguese-curriculum private schools: **DGEEC InfoEscolas** (`infoescolas.medu.pt`, 2023/24 data), searched by name and listed by NUTS III "Área Metropolitana do Porto" with nature "privado" for secondary, 3rd, 2nd and 1st cycles. The list kept here is every general private school in Gondomar, Porto, Maia, Matosinhos, Valongo and Vila Nova de Gaia that teaches up to the 3rd cycle or secondary (vocational, arts, music and pre-school-only establishments left out). The name shown on the card is the school's own (its site); `dgeec_infoescolas` gives the name as DGEEC lists it.
- International schools: CLIP, Oporto British School, Lycée Français International de Porto and Deutsche Schule Porto do not appear in InfoEscolas (their pupils do not sit the Portuguese national exams). Each was verified on its own site (name, address, curriculum). The DGEEC's own list of private and cooperative schools (dgeec.medu.pt) could not be read as a table from the build environment (its site serves encrypted content to its app); the "Planos de Estudo Estrangeiros" separata was not found as a list of names.
- Names: the operator's "Deutsche Schule zu Porto" calls itself **Deutsche Schule Porto** (Colégio Alemão do Porto) on its site; "Colégio Paulo VI" is "Colégio Paulo VI de Gondomar" in InfoEscolas; "Colégio Luso-Francês" is "Colégio "Luso Francês"" in InfoEscolas.
- Added to the operator's six: **Colégio Camões** (Rio Tinto, Gondomar; InfoEscolas, secondary to 1st cycle; 9 min).
- Not kept: "Colégio de Gaia" (InfoEscolas lists it; OpenStreetMap only has the street "Rua do Colégio de Gaia", so its point could not be confirmed). "Externato Patronato Imaculada Conceição" (InfoEscolas) is placed at "Colégio Externato da Imaculada Conceição", Rua do Calvário, Maia (OpenStreetMap): same school by name and town, not confirmed on a site of its own.
- `card = 1`: the seven on the free card. The full list (31) is in the paid analysis.

## Health: `health.csv`

- Registry: **ERS, registo público de prestadores** (`www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx`), searched by name with a browser; the registration number, the entity and the address come from each establishment's record. The SNS portal (`sns.gov.pt`) refused the build environment (HTTP 405) and the ULS sites (`*.min-saude.pt`) did not answer; the ERS register lists the SNS establishments with their ULS.
- Public central hospitals: Hospital de São João (ULS São João, ERS 104641) 13 min; Hospital de Santo António ("Unidade Hospitalar de Santo António", ULS Santo António, ERS 136523) 13 min.
- Private hospitals: Hospital CUF Porto (ERS 118601) 18 min; Hospital Lusíadas Porto (ERS 111312) 15 min; Hospital da Luz Arrábida (ERS 103302) 15 min.
- **Trofa Saúde: the nearest unit is the Hospital-Escola da Universidade Fernando Pessoa itself.** ERS lists it (registo 119118, Avenida Fernando Pessoa, S. Cosme, Gondomar) under the entity "Trofa Saúde Hospital-Escola Fernando Pessoa, S.A."; 2 min. The other Trofa Saúde hospitals in the ERS list (Trofa, Maia day hospital, Braga, Famalicão and others) are farther.
- Nearest centro de saúde: the SNS family health units at Rua 7 Caminhos, Gondomar (ULS Santo António): **USF Sete Caminhos** (ERS 130273), with USF Renascer, USF Monte Crasto ("Monte Castro" in ERS) and the SASU Gondomar urgent-care service (ERS 130274) at the same address; 2 min (OpenStreetMap names the building "Centro de Saúde de São Cosme").
- Also within 20 minutes (paid list): Hospital CUF Trindade 12 min (ERS lists it; record not opened); Hospital Eduardo Santos Silva (ULS Gaia/Espinho, ERS 114621) 14 min; Centro de Saúde de Valbom 4 min and Centro de Saúde de São Pedro da Cova 6 min (OpenStreetMap only: not found by name in the ERS search).

## Photographs

See `content/media/SOURCES.md`, "Golden sample place card: Gondomar". Not met: golden hour (none found under a commercial licence).

## The one line

"O Douro à porta, de Gramido a Melres, e os Aliados a 12 minutos de carro." Gramido (Valbom) and Melres are on the Douro in Gondomar (OpenStreetMap; the photographs' camera points); 12 minutes is the OSRM time above.
