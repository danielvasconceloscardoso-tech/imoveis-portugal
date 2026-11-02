# Deck map data — sources and gaps

Checked 2026-11-02. Public data only. These are point layers for static maps in sponsor decks. They are not for the website map.

Coordinates rule: an official dataset's coordinates are used where the dataset has them. Otherwise the point was geocoded with OSM Nominatim (1 req/s, brand User-Agent), with Photon (komoot, OSM data) as the fallback. A geocode was kept only if all of these held:
- the OSM feature is a POI of the right type (hospital, clinic or doctors for hospitals; school, college or kindergarten for schools);
- its address contains the expected municipality. For municipalities named like a district, the point must also be within 10 km of the town;
- it lies in Portugal (mainland lon −9.6 to −6.1, lat 36.9 to 42.2; Madeira and the Azores allowed).

Rows that failed are left with empty lat/lon, not guessed. Every point with coordinates passed the Portugal bounds check.

## hospitals.csv — 124 rows, 110 with coordinates

| Part | Rows | Source |
|---|---|---|
| SNS / ULS hospital units with an emergency service (mainland), incl. Hospital de Cascais (PPP) | 56 | List compiled per ULS; `source_url` points to the official SNS list https://www.sns.gov.pt/servicos-de-urgencia-sns/ |
| Regional public hospitals (Madeira SESARAM 1, Azores 3) | 4 | sesaram.pt, hdes.pt, hseit.pt, hospitalhorta.pt (all reachable) |
| CUF | 13 | https://www.cuf.pt/hospitais-e-clinicas (fetched; hospital names copied from the page) |
| HPA network | 5 | https://www.grupohpa.com/pt/ (fetched). The HPA site now lists its hospitals under the CUF brand: CUF Alvor, CUF Faro, CUF Madeira and CUF Sines, so group is "HPA network (CUF)". The fifth is Hospital São Camilo, Portimão |
| Luz Saúde | 11 | https://www.hospitaldaluz.pt/ (the site is a JS app with no readable unit list, so names were taken from the group's known network; verify) |
| Lusíadas Saúde | 12 | https://www.lusiadas.pt/hospitais-clinicas (fetched) |
| Trofa Saúde | 23 | https://www.trofasaude.pt/listagem-das-unidades-hospitalares/ (fetched; it lists every unit, and several are small units rather than full hospitals) |

`coord_source`: OSM Nominatim 104, Photon 6, empty 14.

**Main gap: the official SNS sources could not be reached from this session.**
- transparencia.sns.gov.pt (datasets "Caracterização das Valências de Urgência" and "Atendimentos por Tipo de Urgência Hospitalar", which carry official geo-points) was refused by the network: connection reset, and DNS refused for the fetch tool.
- tempos.min-saude.pt (TLS refused) and sns.gov.pt (bot challenge, HTTP 405) also failed.
- The SNS list was therefore compiled from the ULS structure. It was checked against the ERS study "Acesso aos Serviços de Urgência do SNS" (Nov 2025, https://ers.pt/media/tdygatva/ers_estudo-acesso-aos-serviços-de-urgência-do-serviço-nacional-de-saúde.pdf): 83 SU across 39 ULS plus Cascais, of which 39 SUB, 31 SUMC and 13 SUP. The ERS study gives counts only, not a per-site list.
- Not included: SUB points located in health centres rather than hospitals, and some smaller hospital SUs that could not be confirmed (e.g. Amarante, Fafe, Ponte de Lima, Pombal, Alcobaça, Seia, Águeda/Estarreja). **Before the deck ships, check the SNS rows against sns.gov.pt/servicos-de-urgencia-sns/ from a normal browser.** When transparencia.sns.gov.pt is reachable, replace the coordinates with the dataset's geo-points.

Rows with no coordinates (not found in OSM with a matching name and municipality):
- Luz: Hospital da Luz Guimarães
- Lusíadas: Beloura, Campera, Paços de Ferreira
- Trofa Saúde: Alfena, Barcelos, Braga Sul, Loures, Maia, Boa Nova, Valença, Marco de Canaveses, Fernando Pessoa, Vila do Conde

Trofa Saúde Vila do Conde was blanked because OSM returned the same point as Senhor do Bonfim. These rows can be filled from the groups' own address pages.

## universities.csv — 56 rows, all with coordinates

- **Official source:** DGEEC "Estabelecimentos do Ensino Superior de Portugal", https://dados.gov.pt/datasets/estabelecimentos-do-ensino-superior-de-portugal. The file is the DGT INSPIRE download `Estab_Ens_Sup_Portugal.zip` (shapefile, WGS84, 321 organic units; feed dated 2023-03-07). Coordinates come from this dataset for 54 rows.
- **DGES:** dges.gov.pt now redirects to the new regulator, the Instituto para o Ensino Superior (iesuperior.pt). No list was taken from it.
- **Selection: one point per institution, at the main unit (rectorate or presidency).**
  - Public universities: 14 (incl. ISCTE and Universidade Aberta).
  - Public polytechnic institutes and non-integrated public schools (nursing schools of Lisbon, Porto and Coimbra, ENIDH, ESHTE): 20.
  - Private: 15. These are institutions with university status whose name is "Universidade…", "Instituto Universitário…" or ISPA, plus the Lusíada Norte (Porto) and Católica Porto campuses.
  - Business schools: 7. Five are DGEEC units: Nova SBE, ISEG, Católica Lisbon SBE, Católica Porto Business School and FEP. Porto Business School and AESE are not in the DGEEC register; they were geocoded with Nominatim, with their own sites as the source.
- **Excluded:** military and police schools, and small private polytechnic schools.
- **Note:** Universidade Católica Portuguesa (main) and Católica Lisbon SBE share one DGEEC point (Palma de Cima campus).
- **Gap:** the dataset is from 2023, so later mergers and renamings may not be reflected. Example: the Lusófona entities.

## schools.csv — 38 rows, 33 with coordinates

| Region | Rows |
|---|---|
| Lisboa e Cascais | 21 |
| Algarve | 10 |
| Porto e Norte | 5 |
| Centro | 1 |
| Madeira e Açores | 1 |
| Alentejo | 0 |

| Curriculum | Rows |
|---|---|
| British | 19 |
| other (Swedish, Dutch, mixed) | 6 |
| American | 4 |
| German | 4 |
| IB | 3 |
| French | 2 |
| Swiss | 0 |

- **How the list was built:** schools were discovered from a third-party directory (https://www.globalcitizensolutions.com/international-schools-in-portugal/, fetched 2026-11-02) plus known schools. Each school was then confirmed by an OSM school/college feature with the same name in the stated municipality.
- **`source_url`:**
  - 20 rows use the school's own site: either reached and title-checked (stjulians.com, dominics-int.org, kingscollegeschools.org, tasisportugal.org, ois.pt, lfcl.pt, queenelizabeths.com, park-is.com, clip.pt, lfip.pt, dsporto.de, nobelalgarve.com, obs.edu.pt, dslissabon.com), or taken from the OSM `website` tag (St. George's, CAISL, International Sharing School).
  - The other 18 rows point to the directory above and still need the school's own URL.
- **`curriculum`:** this is the main curriculum. Several schools are dual (e.g. British + IB Diploma).
- **Ministry of Education / DGEEC network data:** no national open dataset of private or international schools with coordinates was found on dados.gov.pt. The only matches were municipal datasets (Lisboa, Oeiras, Águeda). So no official coordinates were used.
- **Gaps:**
  - No Swiss-curriculum school identified in Portugal.
  - No Alentejo or Azores international school found.
  - Removed as duplicates or unconfirmed:
    - PaRK Praça de Espanha campus: OSM returned only the Restelo campus.
    - The International School of Madeira: OSM returned the Sharing School point.
    - International School of Coimbra: no OSM match.
  - No coordinates for: International Sharing School - Lisboa, Aspire International School, Vale Verde International School, Aljezur International School, NOAP.
  - St. Peter's International School was matched to the OSM feature "International School of Palmela" at the same site (Quinta do Anjo). Confirm the current name.

## Method notes

- All downloads went through the session proxy into a scratch folder. Large scratch files were deleted afterwards.
- Personal names: none in the CSVs.
- The DGEEC file contains institutional emails and phone numbers. These were not copied.
