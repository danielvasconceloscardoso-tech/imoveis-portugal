# Map layers: sources, periods and licences (prompt 25 §4)

Every layer is checked for commercial reuse before it is built. Status on 26 Oct 2026. Raw files and download dates: raw/manifest.json. Build: scripts/map-data/layers.py.

| # | Layer | Source | Licence | Period | Status |
|---|---|---|---|---|---|
| 1 | What buyers with a tax address abroad pay (vs Portugal) | INE 0012239, median €/m² by buyer's tax domicile, quarterly | CC BY 4.0 (INE on dados.gov.pt) | Q2 2026 | **Built**: place card, 53 concelhos (INE publishes about 58; a value for "abroad" only where enough sales) |
| 2 | Market liquidity (number of sales) | INE local house price statistics | CC BY 4.0 | | **Not found**: no municipal sales-count indicator located through the INE API or dados.gov.pt; to ask INE |
| 3 | New supply | INE 0013247 (buildings completed, new construction, family housing) and 0013242 (buildings licensed, all works) | CC BY 4.0 | 2025 | **Built**: layer "Casas novas concluídas" and place card |
| 4 | Housing stock | INE Census 2021: 0012516 seasonal-use share, 0012517 vacant share, 0012518 average floor area | CC BY 4.0 | 2021 | **Built**: layers "Casas de uso sazonal", "Casas vazias", place card. Building age not added yet |
| 5 | Short-term rental | RNAL (Turismo de Portugal) | Not stated on rnt.turismodeportugal.pt; the national register is not on dados.gov.pt | | **Waiting**: licence to confirm with Turismo de Portugal before use (task 25f). Municipal datasets exist (e.g. Nazaré, CC BY) but not national |
| 6 | Annual ownership cost (IMI rate per concelho) | Portal das Finanças, Taxas IMI | Public administrative data | 2026 | **Waiting**: task 19d (table to export) |
| 7 | Foreign residents by nationality | INE 0013219 (population with legal residence status, by nationality) | CC BY 4.0 | 2023 | **Built**: layer "Residentes estrangeiros", place card (total and Brazil; INE groups France, Switzerland, the US and Israel under "other countries") |
| 8 | Access (car time to Porto, Lisbon, Faro airports; rail) | OpenStreetMap | ODbL | | **Waiting**: routing needs an OSRM or Overpass host, neither on the network allowlist; the "near an airport" filter (45 km) stays |
| 9 | Daily life (schools, hospitals, Blue Flag beaches, golf) | OpenStreetMap; SNS open data | ODbL; SNS terms to check | | **Waiting**: Overpass blocked; SNS licence to check |
| 10 | Climate (sunshine, temperature) | IPMA climate normals | IPMA open data terms to check | 1981–2010 / 1991–2020 | **Waiting**: api.ipma.pt reachable; normals by station, licence to confirm |
| 11 | Risk (flood zones, coastal erosion, wildfire hazard) | APA, ICNF | To check per dataset | | **Waiting**: GIS services; licences to confirm |
| 12 | Finance (housing-loan rate, Euribor, ECB rates) | Banco de Portugal BPstat; ECB | Public statistics, reuse with attribution | Aug 2026; daily | **Built** (rate on the place card, fact bdp-mortgage-rate-2026-08; ECB rates in the budget field) |

Not used, by rule: listing prices from portals; competitors' data (Doutor Finanças, ComparaJá, Confidencial Imobiliário, Casafari, idealista and others are benchmarks only, never sources, D49 and 00_MASTER_RUN §6).

Boundaries: OpenStreetMap (ODbL, "© OpenStreetMap contributors"); OSM's Portuguese boundaries carry the tag source = "DGT - CAOP 2022". See MISMATCHES.md.
