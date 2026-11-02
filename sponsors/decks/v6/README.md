# Partnerships v6 decks (sponsors/PARTNERSHIPS_v6.md)

One deck per category, PT and EN, 8 slides each: the moment we own, what the partner gets in each channel, the prototype letter with the category filled (fictional "Exemplo" brands), the map, the monthly report (illustrative numbers), the three levels with prices (v6 as reset by task 56a, sponsors/BUDGETS_56a.pdf), the founding offer and the 90-day pilot, and the rules (labelling, no per-request pricing, the index never for sale, the category's own advertising rules).

- Build: `node sponsors/decks/v6/build.mjs [category ...]` → `pdf/<category>_<pt|en>.pdf`
- Content: `categories.mjs`; map points: `data/*.csv` (sources in `data/SOURCES.md`), the golf list, the airports.
- Prices marked unsourced in PARTNERSHIPS_v6.md (no public spend figure yet): private banking, digital banking, schools, higher education, wine, spirits and coffee, mobility, home setup, energy, hotels, golf, luxury.
- Before any deck goes out: check the hospital list against the SNS (data/SOURCES.md), replace the directory links in schools.csv with the schools' own sites, and have the operator approve (hard rule 2). Nothing is sent.
