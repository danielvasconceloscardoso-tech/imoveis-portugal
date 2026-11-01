<!-- title: Monthly sponsor report · template -->
# Monthly sponsor report: template

One report per sponsor and month, in the sponsor's language (Portuguese or English), delivered as a PDF within the first ten working days of the following month (agreement, clause 2.1). Aggregate figures only: no name, contact detail or other element that identifies a reader (clause 6.4). Every section states its source and period; a section with no data says "no data yet", never an estimate.

**Generate it:** `/sponsor-report <company> <month>`, which runs

`node scripts/sponsor-report.mjs "<company>" <YYYY-MM> --in data.json [--lang pt|en] [--out file.pdf] [--md]`

and writes `sponsors/reports/<company>_<YYYY-MM>_<lang>.pdf` by default. Cloudflare Web Analytics, the letter platform and the request log are not connected yet, so the figures come from the JSON file; a sample is in `sponsors/papers/monthly-report.sample.json`.

## The sections

### Header

The month, the sponsor, the project and the municipality, with the line "Aggregate figures, no personal data".

### 1. Reach per edition

One row per edition (Luxembourg, France, Switzerland, Brazil, United States, Israel) and a total: letter subscribers at month end, letters sent, opens, site visits. Source: the letter platform and Cloudflare Web Analytics.

### 2. The project page

Views of the project page, pin opens on the map, card views in the Concierge and search, card clicks; then the page views by edition. Source: Cloudflare Web Analytics.

### 3. Requests and qualified summaries

The number of requests in the month and by edition, then one line per request with its qualified summary: date, edition, typology, budget band, means of payment, timeline, type of visit, status. Each request went only to the qualified advisor of the partner agency (D66). The script refuses any other field and any value that looks like an email address or a phone number.

### 4. The municipality's index card

The municipality's score out of 100, its rank among the 308 municipalities, the pillar scores and the date of the data, with the line "The index and its score are never affected by the sponsorship". Source: the index (content/data/INDEX_METHOD.md).

### 5. Availability

Units listed, available, reserved and sold at month end, from the developer's availability table.

### Notes

Optional lines from the operator (for example a change of availability or a letter date moved).

## The JSON input

| Field | Content |
| --- | --- |
| `company`, `project`, `municipality`, `month`, `lang` | the header; `company` and `month` are checked against the command line |
| `reach.editions.<lu,fr,ch,br,us,il>` | `subscribers`, `letters_sent`, `opens`, `site_visits` |
| `showcase` | `page_views`, `pin_opens`, `card_views`, `card_clicks`, `by_edition.<edition>` |
| `requests` | `total`, `by_edition.<edition>`, `summaries[]` with only `date`, `edition`, `typology`, `budget_band`, `payment`, `timeline`, `visit`, `status` |
| `index_card` | `municipality`, `score`, `rank`, `of`, `pillars[]` (`name`, `score`), `as_of`, `url` |
| `availability` | `listed`, `available`, `reserved`, `sold` |
| `notes[]` | free lines, no personal data |
| `<section>.source` | overrides the default source line of that section |

Any section left out prints "no data yet".

## What the report never contains

Readers' names, email addresses, phone numbers or messages; estimates presented as measurements; any promise of requests or sales. The report shows what was measured, with its source.
