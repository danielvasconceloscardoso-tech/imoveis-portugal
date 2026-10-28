# Golf courses CSV: notes (checked 2026-10-28)

File: `courses.csv` (79 rows, UTF-8, one row per course; resorts with separately named courses get one row each).

## Counts per region

| Region | Rows | Open | Under construction |
|---|---|---|---|
| Algarve | 41 | 41 | 0 |
| Comporta / Tróia (Grândola, Alcácer do Sal) | 5 | 5 | 0 |
| Lisbon / Cascais / Sintra / Oeiras / Setúbal peninsula | 16 | 16 | 0 |
| Madeira and Porto Santo | 5 | 4 | 1 (Ponta do Pargo, opening 2027) |
| North (Porto, Braga, Viana do Castelo, Vila Real) | 12 | 12 | 0 |
| **Total** | **79** | **78** | **1** |

Multi-loop facilities are one row with the total holes: Palmares 27, Pinheiros Altos 27, Vila Sol 27 (18 from 1991 plus 9 from 2001), Golf do Estoril 27 (18 + 9), Penha Longa 27 (Atlantic Championship 18 + 9), Santo da Serra 27. Penina (Championship 18, Resort 9, Academy 9), Amendoeira (Faldo, O'Connor Jnr., Academy 9) and Porto Santo (18 + 9-hole par 3) are split into separate rows. These rows share one resort-level coordinate.

## Sources: what was reachable

The network proxy allowed very few hosts, so the requested source order could not be followed as written.

| Source | Status |
|---|---|
| fpg.pt (Federação Portuguesa de Golfe) | **Blocked**: proxy 403 on CONNECT; WebFetch could not resolve the host. Not used. |
| visitalgarve.pt | **Blocked** (403). Not used. |
| visitportugal.com | Host reachable, but every page returns an Anubis "are you a bot" proof-of-work challenge. I did not try to get past it. Its course data sheets (inauguration year, architect, holes) were read **through web-search result extracts** of those pages, and the page URL is cited in source_url. |
| visitmadeira.com (official Madeira tourism board) | **Reachable**, read directly. Used for all Madeira rows. |
| valedolobo.com (official resort site) | **Reachable**, read directly. Used for the Vale do Lobo Ocean course. |
| Nearly all other official course and resort sites (Quinta do Lago, Dom Pedro, Pestana, Penha Longa, Oitavos, Troia, Monte Rei, Ombria, VIC Properties, Terras da Comporta, CostaTerra, palheirogolf, santodaserragolf, portosantogolfe, oportogolfclub, estelagolf, etc.) | **Blocked** (403). Not read. |
| Golf press (golfbusinessnews, golfcoursearchitecture.net, golftoday, top100golfcourses, leadingcourses, portugalgolf.net, 1golf.eu, where2golf) | **Blocked** for direct fetch. Seen only through web-search extracts. Used only for new courses: Dunas, Torre, Ombria, Els Club, Pinheirinho, CostaTerra and Ponta do Pargo. |
| wikipedia, wikidata, overpass-api, visitlisboa.com, visitporto.travel | Blocked |
| nominatim.openstreetmap.org, api.openstreetmap.org | **Reachable**. Used for every coordinate, to list candidate courses, and for reverse checks of the municipality. |

**Consequence:** the `official_website` values come from the `website` tag on the course in OpenStreetMap, from Visit Portugal listings, or from the official domain shown in search results. Apart from valedolobo.com, none of these sites could be opened, so some URLs may be out of date (for example, the Penina link points to an old Le Méridien domain).

To follow the requested source order exactly, whitelist `fpg.pt`, `visitalgarve.pt` and the course domains in the session's network settings, and get past the Visit Portugal bot challenge with a real browser. Then re-check the rows.

## Coordinates

- 74 rows use the centroid of an OpenStreetMap golf polygon (`leisure=golf_course`), found with Nominatim using the query written in `coord_source`. Every point was reverse-geocoded to check its parish and municipality, and every point is inside the mainland or Madeira bounding box.
- 8 of those 74 rows share a polygon that covers the whole resort: 3 at Penina, 3 at Amendoeira and 2 at Porto Santo. Those points are resort-level, not per course.
- **Weak coordinates** (also noted in `coord_source`):
  - Ombria Golf Course: resort hotel point (Viceroy at Ombria, Tôr). The course is not mapped in OSM.
  - Dunas Course (Terras da Comporta): polygon of the "Comporta Dunes" development area (landuse=construction), not the course itself.
  - Torre Course (Terras da Comporta): **town centre** (hamlet of Torre, Comporta).
  - Campo de Golfe de Rilhadas: **town centre** (point for the Fafe municipality). It may be several km off.
  - Ponta do Pargo (under construction): **town centre** (parish point).
  - The Els Club Vilamoura: correct site, but the OSM polygon is still named "Victoria".
- No Google service was used.

## Municipality calls that need a second look

- **Penha Longa**: the course straddles Sintra and Cascais. The polygon centroid falls just inside Cascais (Alcabideche). The hotel and monastery are in Sintra, so the row says Sintra.
- **Quinta do Peru**: OSM's address says Seixal, but the point reverse-geocodes to Quinta do Conde, which is in **Sesimbra**, and Visit Portugal places the club in Quinta do Conde. The row says Sesimbra.
- **Quinta de Cima**: Visit Portugal gives a Vila Nova de Cacela (Vila Real de Santo António) address, but the polygon centroid falls in Cabanas de Tavira (**Tavira**). The row says Tavira. Quinta da Ria stays as Vila Real de Santo António.
- **Santo da Serra**: Visit Madeira's address is 9200-152 Machico, and the point is in Água de Pena, Machico. The Santo António da Serra area also extends into Santa Cruz. The row says Machico.
- **Dunas (Terras da Comporta)**: Grândola (the Carvalhal area, per the development polygon). **Torre** is in Alcácer do Sal (Comporta parish).

## Facts that conflict between sources (value chosen in brackets)

- Laguna (Vilamoura): Visit Portugal's data sheet says 2000, but its text says opened 1990 by Joseph Lee [1990].
- Castro Marim: Visit Portugal says 18 holes, par 71. OSM tags it as 3 x 9 holes [18]. It may really be 27.
- Monte Rei North: Visit Portugal says 2006 [2006]. Other sources often say 2007.
- Belas Clube de Campo: Visit Portugal says "1997/98" [left empty].
- Pinheiros Altos: "1992 / 2007" (the third nine was added later) [1992].
- Miramar: the data sheet credits Frank Gordon (1932), but the text says Mackenzie Ross (1934) and a Howard Swan redesign [year 1932, designer left empty].
- Lisbon Sports Club: 1922 is the opening of the first 9 holes. The 18 holes were completed in 1992 [1922].
- Quinta de Cima: Visit Portugal's page is under the name Quinta de Cima but shows the Quinta da Ria address. Both are credited to Roquemore, 2002 [2002 for both].
- Penina Academy: 1977 on one Visit Portugal page and 1972 on another [1977]. Penina Championship: no year found on the pages I could see [left empty].
- Pinheirinho: reopening reported as 2022 or 2024, and VIC calls 2026 its "opening season". It hosts the Legends Tour event from 30 Oct to 1 Nov 2026 [status open, year empty]. It may be invitation-only.
- CostaTerra: a Tom Fazio course, private (members and guests). Directories say "est. 2024". No firm opening date was found [open, year empty].
- Dunas at "JNcQUOI Club Comporta": I found no source that links the JNcQUOI name to the golf course. JNcQUOI Club Comporta is an Amorim Luxury project in Comporta. The course is reported as the Terras da Comporta Dunas course (Vanguard Properties, McLay Kidd), opened June 2023. The resort name keeps both labels; the CEO should confirm the branding.

## Courses still under construction or announced

- **Ponta do Pargo, Calheta, Madeira**: 18 holes, Nick Faldo. Opening 2027 per a February 2026 announcement (earlier reports said 2026). In the CSV as under construction.
- **Monte Rei South Course** (Vila Real de Santo António, Jack Nicklaus): announced in 2019. One directory says construction began, others say it was "due to start". There is no announced opening year, so it is **not in the CSV**.
- **Madeira extensions**: the regional government plans new 9-hole courses at Santo da Serra and Porto Santo. They are only planned, with no construction or date confirmed, so they are **not in the CSV**.
- The Els Club Vilamoura (rebuilt on the Victoria site, opened 21 July 2025) and Torre (opened June 2025) are now open and are listed as open.

## Doubtful or excluded entries

- **Porches (Lagoa)**: there is an unnamed OSM golf polygon at 37.1015, -8.3753, between Porches and Armação de Pêra. This is very likely the 9-hole pitch & putt at the Vila Vita Parc hotel, which is a guest practice facility. It is **excluded**. No new course near Porches was found.
- Other unnamed OSM golf polygons, excluded until identified:
  - Lagos (37.0852, -8.6743)
  - Alvor/Portimão (37.1455, -8.5675)
  - Parchal/Lagoa (37.131, -8.50 and 37.134, -8.498): probably parts of Gramacho or Vale da Pinta
  - North of Loulé (37.1546, -8.0403)
  - "Private Golf Course" near Cabanas de Tavira (37.1438, -7.5843)
  - Belas/Sintra (38.804, -9.266 and 38.808, -9.265): probably parts of Belas or Lisbon Sports Club
  - Ponte de Lima (41.7467, -8.5604): next to Axis
  - Paços de Ferreira (41.3007, -8.3394)
- Excluded as driving ranges or academies of fewer than 6 holes: Vilamoura Golf Academy, Club Med Balaia (3 holes), Vila Monte (3 holes), Algarve Golf Academy (range), Academia de Golf de Lisboa, Golf Club de Braga driving range, and the Universidade do Minho range in Guimarães.
- **Aroeira Challenge** (9 holes, Almada): I could not confirm that it exists or is open, so it is not in the CSV.
- **Quinta do Lago "Paddocks"**: not confirmed and not in the CSV.
- Short courses that are included, flagged for review:
  - Golfe Quinta do Fojo: 6 holes, from the OSM description only. Visit Portugal lists it as a course.
  - City Golf, Matosinhos: 9 holes, par 27.
  - Campo do Clube de Golfe de Vidago: 9 holes, 2009. This is separate from the Vidago Palace course.
  - Arrábida Resort & Golf Academy (formerly Palmela Village): 18 holes per OSM and directories, OSM par 61. Year and designer were not confirmed.
- **Out of scope but close to Lisbon** (not in the CSV; easy to add if the map should cover them):
  - Ribagolfe Lakes and Oaks, and Santo Estêvão Golfe (Benavente)
  - Dolce CampoReal (Torres Vedras)
  - Campo de Golfe do Botado (Peniche)
  - Praia d'El Rey, Bom Sucesso and the other Óbidos courses

## Rows with weak sourcing

- Source is an **OSM object only** (no Visit Portugal or official page seen): Álamos Golf Course and Amendoeira Academy Course.
- **No official website**: Álamos, Dunas, Torre, Pinheirinho, Jamor, Aldeia dos Capuchos, City Golf, Rilhadas, Campo do Clube de Golfe de Vidago, and Ponta do Pargo.
- **Source is golf press or a third party** (seen through search extracts):
  - Dunas (golftoday)
  - Torre (The Portugal News)
  - Pinheirinho (Legends Tour)
  - Ponta do Pargo (golftoday)
  - Quinta da Ria (planetgolf)
  - Golf Aldeia dos Capuchos (Visit Lisboa, the official Lisbon tourism board)
- **Official page seen only through search extracts**: Ombria (ombria.com media page), Els Club (ernieels.com), and CostaTerra (discoverylandco.com).
- **All Visit Portugal rows**: the pages were read through search-result extracts, not opened directly (bot challenge). Years and designers are as Visit Portugal states them.
