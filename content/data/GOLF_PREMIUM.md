# The golf premium: parish median vs municipality median

Prompt 33 §4.2. Our own data story, built only from official figures. Data file: `content/data/golf-premium.json`. Build: `python3 scripts/map-data/golf_premium.py` (after `build.py` and `golf.py`). Status 27 Oct 2026, INE quarter 2026-Q2.

Label everywhere it is shown: **"parish median vs municipality median"**. Never "golf premium" without that label, never a cause.

## What it compares

For each parish that holds a golf course, the INE median price per m² of the parish next to the median of its municipality, in the same quarter, and how both changed.

- **Measure.** INE, median value per m² of family dwellings sold in the last 12 months, all dwellings (new and existing), €/m². Indicator 0012234 (Metodologia 2022) for parishes and municipalities from 2019-Q4; indicator 0009490 (Metodologia 2018) for municipalities before that.
- **Ratio.** Parish median ÷ municipality median, latest quarter (2026-Q2). 1.36 means the parish median is 36% above the municipality's.
- **Change.** From 2019-Q4 to 2026-Q2 for both, on the same method. INE publishes parish medians only from 2019-Q4, so **there is no 10-year parish figure**. The municipality's 10-year change (2016-Q2 to 2026-Q2) is given on its own and joins the two INE methods at 2019-Q4, as the map's charts do.
- **Which parishes.** OpenStreetMap `leisure=golf_course` outlines (golf.py) intersected with the OpenStreetMap parish boundaries matched to INE codes. A parish counts when it holds at least 10 ha of a course or a quarter of one. A course on a border can count for two parishes (Pestana Alto: Alvor and Portimão).
- **Only where INE publishes.** INE publishes parish medians for about 57 municipalities and, inside them, only for parishes with enough sales. Nothing is estimated or filled in.

## Reading rule (no causation)

This shows where prices differ, not why. A golf parish can sit above or below its municipality for many reasons: the coast, the type and size of homes, new building, who buys. Golf is one feature of these parishes among many. Write "the median in Almancil is 36% above Loulé's", never "golf adds 36%" or "golf raises prices".

## The Algarve resort parishes (2026-Q2)

| Parish | Municipality | Parish €/m² | Municipality €/m² | Ratio | Parish, 2019-Q4 to 2026-Q2 | Municipality, same period | Municipality, 10 years | Courses (OpenStreetMap) |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Almancil | Loulé | 5 617 | 4 137 | 1.36 | +90.8% | +90.6% | +160.7% | Quinta do Lago (North, South, Laranjal), San Lorenzo, Pinheiros Altos, Vale do Lobo (Royal, Ocean) |
| Quarteira | Loulé | 4 482 | 4 137 | 1.08 | +92.9% | +90.6% | +160.7% | Vilamoura: Dom Pedro Old, Pinhal, Laguna, Millennium, Victoria; Pestana Vila Sol |
| Porches | Lagoa | 3 715 | 3 371 | 1.10 | +110.8% | +94.2% | +148.4% | one course, unnamed in OpenStreetMap |
| Estômbar e Parchal | Lagoa | 3 281 | 3 371 | 0.97 | +137.4% | +94.2% | +148.4% | Pestana Gramacho, Pestana Vale da Pinta, two unnamed |
| Lagoa e Carvoeiro | Lagoa | 3 257 | 3 371 | 0.97 | +81.9% | +94.2% | +148.4% | Vale de Milho |
| São Gonçalo de Lagos | Lagos | 3 876 | 3 949 | 0.98 | +93.0% | +96.6% | +164.1% | Boavista, one unnamed |
| Odiáxere | Lagos | no INE figure | 3 949 | | | +96.6% | +164.1% | Onyria Palmares |
| Guia | Albufeira | 3 660 | 3 490 | 1.05 | +73.2% | +78.4% | +153.8% | Salgados |
| Albufeira e Olhos de Água | Albufeira | 3 539 | 3 490 | 1.01 | +79.1% | +78.4% | +153.8% | Pine Cliffs, Balaia Par 3 |
| Alvor | Portimão | 3 425 | 3 259 | 1.05 | +94.8% | +121.1% | +187.6% | Penina, Pestana Alto |
| Vila Nova de Cacela | Vila Real de Santo António | 3 390 | 3 116 | 1.09 | +74.3% | +99.4% | +153.3% | Monte Rei, Quinta da Ria, Quinta de Cima |
| Budens | Vila do Bispo | 3 169 | 3 189 | 0.99 | +88.6% | +102.5% | +134.7% | Santo António (Parque da Floresta) |

What the table says, in plain words: Almancil is the clear case, its median 36% above Loulé's; most other Algarve golf parishes sit within 10% of their municipality, some below it. Since 2019-Q4, Almancil and Loulé rose by almost exactly the same share (about +91%).

The full list, 35 parishes across Portugal (Cascais e Estoril 1.15, Canidelo 1.34, Funchal's São Gonçalo 0.86 and others), is in the JSON. Four parishes there have only a driving range, an academy or a pitch & putt (`full_course: false`) and should stay out of any chart.

## Where INE publishes no parish figures

- **Grândola** (Troia, CostaTerra, Pinheirinho on OpenStreetMap) and **Alcácer do Sal** (Comporta): INE publishes no parish medians for either municipality, so no parish comparison is possible. Alcácer do Sal also has no golf course mapped in OpenStreetMap today. Only the municipal median can be shown (JSON `municipalities_without_parish_data`).
- Also without parish data: Óbidos, Torres Vedras, Benavente, Chaves, Ponte de Lima, Porto Santo, Machico and the Azores courses, among others (23 municipalities in all).
- Courses inside a municipality INE does publish, but in a parish it does not (Sintra's Penha Longa side, Belas, Beloura and Lisbon Sports Club; Amendoeira in Silves; Benamor in Tavira; Espiche in Lagos; Vila Monte and Colina Verde in Olhão): listed in `courses_in_unpublished_parishes`, not compared.
- Odiáxere (Lagos), Estela (Póvoa de Varzim) and Água Longa (Santo Tirso): INE has no figure for 2026-Q2 (too few sales). Kept in the JSON with a note, not compared.

## Sources

- `ine-m2-2026q2`: INE, Estatísticas de preços da habitação ao nível local, indicator 0012234, 2nd quarter 2026 (released 23 Oct 2026). CC BY 4.0. Parish and municipality medians.
- `ine-m2-history`: INE indicators 0009490 and 0012234, 2016 to 2026. CC BY 4.0. Municipal series and the 2019-Q4 method break.
- `osm-boundaries`: parish boundaries, © OpenStreetMap contributors (ODbL), matched to INE codes (content/facts/map/MISMATCHES.md).
- Golf courses: OpenStreetMap `leisure=golf_course`, © OpenStreetMap contributors, Open Database License (ODbL), https://www.openstreetmap.org/copyright. Raw file content/facts/map/raw/osm-golf.geojson.gz (manifest dated 27 Oct 2026). Proposed fact id `osm-golf-courses` for content/facts/facts.csv (not added: that file has another owner).

OpenStreetMap is a volunteer map: a course missing there (for example the Comporta courses or Ombria in Loulé, not mapped as golf courses on 27 Oct 2026) is missing here. Course names are OpenStreetMap's, as written there.
