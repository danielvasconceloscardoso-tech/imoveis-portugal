# Regressar — schools, hospitals and housing scenarios

`site/src/lib/regressar-life.ts` supplies a compact, source-backed view of the same 13 mainland municipalities as `REGRESSAR_PLACES`. It does not add an exhaustive directory, a medical recommendation or a property listing. It contains no complete paid analysis or historical market series.

## API

- `getPlaceLife(id)` returns `{id, coverage, origin, checkedOn, schools, hospitals, schoolCoverage, sourceRecord}`. Unknown IDs return `coverage: 'unavailable'`, empty service arrays and null origin/date; they never inherit another city's services.
- A service contains `name`, `kind`, optional `curriculum`/`municipality`, `minutes`, `km`, `distanceMode`, `sourceUrl`, `sourceLabel` and `checkedOn`.
- `purchasingPower(netMonthly, place, options?)` returns a housing budget, maximum illustrative loan/purchase amount, separate deposit, indicative purchase/rental areas and assumptions. Invalid inputs return null.

The raw module is approximately 25 KB. Import it only after a place is revealed so that services do not add to the first interaction's loading cost.

## Service coverage

| Municipalities | Coverage | Date precision |
| --- | --- | --- |
| Gondomar, Braga, Matosinhos, Porto, Vila do Conde, Espinho | Up to three schools and three hospitals, taken only from existing free-card source records | Exact `checked_on` retained for every item, 3 or 4 November 2026 |
| Lisboa, Cascais, Lagos, Viana do Castelo, Guimarães, Póvoa de Varzim, Aveiro | One recorded nearest international school and nearest public emergency hospital | The underlying register supplies only `2026`; no day/month is invented |

For detailed places, the source files are `content/facts/map/places/<id>/schools.csv`, `health.csv`, `place.json` and `SOURCES.md`; the corresponding public record is `site/public/data/map/place/<id>.json`. Candidates must be `card=1` and within the existing 20-minute source window, sorted by driving duration. This retains at most three already-public records per category. Hospital selection filters on the registered **hospital kind**; USFs, health centres and other primary-care units are never relabelled as hospitals. The ERS registration evidence is retained verbatim.

School coverage includes selected private/international schools; it does **not** count all public schools. A listed school does not imply a place is available, admission eligibility, free tuition or a recommended curriculum. The nearest international school in a fallback city may be distant; show its actual distance without implying proximity.

### Distance semantics

`distanceMode: 'drive'` means OSRM car estimates from the recorded municipal origin (usually the town hall), **free flow without traffic**, using the source's rounded minute and driving kilometres. These are not directions from the visitor's future home. The exact origin is included.

`distanceMode: 'straight-line'` means the existing municipal reference-point distance from `content/facts/map/tiles/escolas_saude/escolas_saude_municipality.csv` and the public place JSON. It has `minutes: null`. It must never be shown as driving kilometres, a travel duration or a daily commute. The recorded public-hospital source is SNS; the school source is the repository's international-school list and school/OSM references. No driving time is inferred by multiplying a straight-line distance.

Sources are the inherited DGEEC InfoEscolas/school-site records, [ERS public registry](https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx), [SNS](https://www.sns.gov.pt) and the repository's [map source notes](../content/facts/map/README.md). Individual school URLs are used only where already recorded. Otherwise the link points to the reproducible local public record, not an invented school URL. No fresh website verification, hospital opening status, clinical availability or school admissions check is claimed.

## What this income could cover

The helper treats `netMonthly` as annual net divided by 12, not one of fourteen payslips. Defaults are explicit, shared with the existing discovery engine:

- 35% of average monthly net for housing;
- purchase: 20% own-funds deposit, 3% nominal annual interest, 30 years;
- rental: the same monthly budget divided by the municipality's existing INE rent median per m²;
- purchase area: illustrative purchase ceiling divided by the existing INE sale median per m².

For monthly rate `r`, term `n` months and housing budget `B`, `loan = B × (1 − (1 + r)^−n) / r`; at zero interest `loan = B × n`. `purchase = loan / (1 − depositShare)` and `deposit = purchase × depositShare`. No claim is made that the deposit is already available. The visitor still needs purchase taxes, fees and any lender requirements.

The 3% rate is a scenario assumption, not a current mortgage offer or approval. The model excludes other debts, age/term limits, stress tests, lender underwriting, insurance, maintenance, property taxes, transaction costs and all other living expenses. INE medians are observations rather than available homes. Rental and sale periods remain the place record's period. Display indicative area rounded down and describe it as a scenario, never an exact home that can be bought.

## Checks

From `site/`:

```sh
node --import tsx scripts/test-regressar-life.mjs
```

Nine contracts cover the 13-city boundary and unknown empty state; exact free-card/CSV parity; hospital versus primary-care classification; straight-line versus driving units and date precision; provenance/origins; an independently calculated annuity fixture; zero interest/separate deposit; invalid inputs; and income/price monotonicity. No live network, forms, messages or paid service is used.
