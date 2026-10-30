# The Index: method, v1 (CEO, 30 Oct 2026)

One number out of 100 for each of the 308 municipalities, answering one question: **how well does this place serve someone buying a home from abroad?** Not "cheap or expensive" (the budget decides where), but how the money holds its value, whether the home can be let and sold again, how easy the place is to reach and live in, and what it costs to own. Official data only, method public, recomputed every quarter, frozen once a year as the **Portugal 100**.

The working name is "Índice Imóveis Portugal" (operator to confirm the name).

## 1. Pillars, indicators, weights

| Pillar | Weight | Indicator | Within pillar | Direction | Scale | Source |
| --- | --- | --- | --- | --- | --- | --- |
| **Valorização** (how the money holds) | 20 | Real 5-year price growth, annualised | 40% | higher | relative | INE local house prices, deflated by INE CPI |
| | | Real 10-year price growth, annualised | 30% | higher | relative | same |
| | | Price volatility, 5 years | 30% | lower | relative | same |
| **Rendimento** (if let) | 15 | Gross rental yield | 70% | higher | relative | INE local rents ÷ INE local prices |
| | | Real rent growth, 3 years | 30% | higher | relative | INE local rents |
| **Liquidez** (can it be sold again) | 15 | Turnover: sales per 1,000 dwellings, last 4 quarters | 50% | higher | relative | INE sales counts ÷ Census 2021 dwelling stock |
| | | Sales per year, log | 25% | higher | relative | INE |
| | | Share of purchases by buyers with tax domicile abroad | 25% | higher | relative | INE, where published; else the pillar reweights to the other two |
| **Acesso** (getting there) | 20 | Road minutes to the nearest airport with scheduled international flights | 50% | lower | fixed: 30 min → 100, 180 min → 0 | OSRM on OpenStreetMap; airports LIS, OPO, FAO, FNC, PDL, TER, PXO |
| | | Road minutes to the nearest SNS hospital with an emergency service | 30% | lower | fixed: 15 → 100, 90 → 0 | SNS transparency portal / dados.gov.pt |
| | | Fibre (FTTH) coverage of households | 20% | higher | fixed: 100% → 100, 50% → 0 | ANACOM, per municipality |
| **Vida** (living there) | 20 | Annual sunshine hours | 20% | higher | relative | IPMA 1991–2020 normals, nearest station |
| | | Hot days (max ≥ 35 °C, or the nearest threshold IPMA publishes) | 15% | lower | relative | IPMA normals |
| | | Distance from the municipality seat to the coast | 25% | lower | fixed: 10 km → 100, 60 km → 0 | OpenStreetMap coastline |
| | | Blue Flag beaches within 20 km | 10% | higher | fixed: 0 → 0, 5+ → 100 | ABAE, current year |
| | | Golf courses within 30 road minutes | 10% | higher | fixed: 0 → 0, 5+ → 100 | our list, content/facts/golf/courses.csv |
| | | Crimes recorded per 1,000 inhabitants, 3-year average | 20% | lower | relative | INE / DGPJ |
| **Custo de ter** (owning it) | 10 | Municipal IMI rate on urban property | 60% | lower | fixed: 0.30% → 100, 0.45% → 0 | Portal das Finanças, annual table |
| | | Municipal IRS rebate returned to residents | 25% | higher | fixed: 0% → 0, 5% → 100 | annual Portaria / AT |
| | | IMI familiar deduction offered | 15% | yes = 100 | fixed | Portal das Finanças |

Weights sum to 100. They were set for a buyer who lives abroad: reaching the place and being able to sell it again weigh as much as the lifestyle; price growth matters more than yield because most readers buy to live or to keep, not to let.

## 2. The computation

For each indicator *i* and municipality *m*, with raw value *x*:

1. **Prepare the INE series.** Quarterly medians are noisy in small municipalities, so every price and rent series is first smoothed with a 4-quarter rolling median. Growth is computed on the smoothed series deflated by the INE consumer price index (base: latest quarter). Annualised growth over *n* years = (P_t / P_{t−n})^(1/n) − 1. Volatility = standard deviation of quarterly log changes over the last 20 quarters. Yield = (median rent €/m²/month × 12) ÷ median sale €/m², both for the latest available period.
2. **Scale to 0–100.**
   - *Relative* indicators: winsorise at the 5th and 95th percentiles across the 308 municipalities, then scale linearly: s = 100 × (x − P5) ÷ (P95 − P5), clipped to [0, 100]. If lower is better, s = 100 − s.
   - *Fixed* indicators: linear between the two goalposts given in the table, clipped to [0, 100]. Fixed goalposts are used where a number has a meaning on its own (minutes, kilometres, a tax rate), so a municipality's score doesn't move just because another one changed.
3. **Pillar score** = weighted mean of its indicators' scores, using the within-pillar weights.
4. **Index** = Σ (pillar weight × pillar score) ÷ 100, rounded to a whole number for display; one decimal is kept for ranking. Ties are broken by Liquidez, then Acesso.
5. **Rank** 1 to 308.

## 3. Missing data, confidence, eligibility

1. **Suppressed INE values** (confidentiality in small municipalities): use the latest value within the last 8 quarters. If none, impute the NUTS III median and flag the indicator as *estimated*.
2. **Coverage** c_m = share of total indicator weight computed from real (non-imputed) data. Shown on the card as "Dados completos" (≥ 90%), "Dados parciais" (70–89%) or "Dados insuficientes" (< 70%, the index is shown in grey with no rank).
3. **Portugal 100 eligibility:** c_m ≥ 90% and at most one imputed market indicator (prices, rents, sales).
4. **Islands:** Madeira and Azores municipalities use their own airports (FNC, PXO, PDL, TER); coast and beach indicators apply as elsewhere.

## 4. Cadence and freezing

1. **Quarterly refresh** when INE publishes local prices (about two months after the quarter) and rents (twice a year). Each refresh is a dated release with a changelog.
2. **Portugal 100, once a year:** frozen on the data available at the end of October; revealed in the last week of November, ten places a day from #100 to #11, and #1 to #10 on 1 December. Each place shows its change against the previous year.
3. **Weights are fixed for 12 months.** A change is announced one release in advance, with the old and the new ranking published side by side.

## 5. Validation before the first publication

1. **Back-test:** compute the index with data as of Q3 2016 (Access, Vida and Custo as today) and report the Spearman correlation between the 2016 index and 2016–2021 real price growth and turnover. Publish the result, whatever it is.
2. **Face validity:** the top 20 and bottom 20 are reviewed by the operator and the partner agency for anything implausible; every surprise is traced to its indicator before publication.
3. **Sensitivity:** publish the top 20 under three alternative weightings (lifestyle-heavy, yield-heavy, access-heavy) to show how stable it is.
4. **Reproducibility:** the whole pipeline runs from raw downloads to `index.json` with one command and gives identical output on a second run.

## 6. Independence ("How we rate", the public page)

1. Every indicator names its source and the date it was checked.
2. No sponsor, partner, municipality or developer sees the index before it is published, influences a weight, or supplies data.
3. No payment of any kind changes any number. The index is never sold; it is free to quote with credit.
4. Errors are corrected in place with a dated note; the previous value stays visible.
5. The index describes, it does not advise (D12). It carries the standard disclaimer.

## 7. On the site

1. **Map:** the colour field defaults to the index; one tap switches to price. **Card:** "92 · Cascais" with a one-line reason generated from the two strongest and the weakest pillar ("Forte em acesso e liquidez; rendimento baixo."), the six pillar bars one tap away, and the sources.
2. **"O seu índice":** six sliders, one per pillar, normalised to 100; the map recolours live; saved on the reader's device; the Concierge uses the reader's weights when it suggests places. The official index stays the official one, labelled.
3. **Edition overlay (not part of the index):** "Com {budget} compra {m²} aqui" from the budget field, and the flight time from the edition's main airport (a static table).
4. **Search:** typing a place returns its card with the score first.

## 8. Data pipeline

`scripts/index/`: one fetcher per source with a dated raw snapshot in `content/data/index/raw/{source}/{date}/`, one `compute.py` that produces `site/public/data/index.json` (per municipality: index, rank, pillars, indicators with raw value, score, source, date, estimated flag, coverage), unit tests for scaling and imputation, and `RELEASES.md` with one line per release. OSRM runs locally on the Geofabrik Portugal extract. Allowlist additions: `anacom.pt`, `download.geofabrik.de`, `transparencia.sns.gov.pt`, `bandeiraazul.abae.pt`.
