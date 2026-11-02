# Prompt 65: the profiling engine: segments, intent, cohorts and data crossing (design-v2 first)

CEO, 3 Nov 2026, 00:40. Operator: go beyond counting. Build the tools that cross our data to understand who the buyers are, what stage they are at and what they will do, the way the big data companies do, inside the law. Free tier only (Cloudflare D1, Workers Analytics Engine, scripts in the repo). Nothing on main until the operator approves.

## 1. The layers
1. **Events** (content/DESIGN_AND_DATA.md): every tap, swipe, save, share, dwell time, Concierge step, in one first-party, cookie-free schema, keyed to an anonymous session id that lives only for the visit.
2. **The consented profile** ("O meu Portugal"): when a reader saves their profile (one unticked consent), their own events, quiz, simulator, Concierge answers and letter clicks (beehiiv) join into one record.
3. **Official data at region level:** INE prices and rents, foreign-buyer transactions, schools, health, flight routes from the editions' airports. Joined by region and budget band, never by person.

## 2. The tools
1. **Segments:** cluster anonymous sessions and profiles into buyer types by origin, budget band, regions, timing, household and behaviour (for example "família, Luxemburgo, Porto, 2027", "regresso à aldeia", "segunda casa no Algarve", "investidor Lisboa"). Name each in plain words, count it every week. Feeds: content choices, sponsor pitches, the forecast.
2. **Journey stage:** from behaviour, place each session or profile in one of four stages (sonhar, explorar, decidir, comprar). Used to show the right next card (the assistant in prompt 63), never shown to the reader as a score.
3. **Cohorts and funnels:** for each origin, channel (UTM) and segment: visit → quiz → saved profile → Concierge request; time between steps; where they stop; letter retention by signup month.
4. **Segment reach for sponsors:** how many people in a segment, this month ("famílias do Luxemburgo, 400–600 k€, Porto, 2027: N"). This is what we sell: reach to a segment, never the people (D6, no per-lead).
5. **The demand–supply gap by region:** declared foreign demand (budget, timing) crossed with INE prices, new supply and foreign-buyer deeds: where demand from abroad is ahead of supply. Core of the forecast (prompt 64 §4) and of the annual developer subscription.
6. **Look-alike signals:** which early behaviours predict a Concierge request (for example "opened three places in one region and the simulator within a week"). Used to time the assistant's offers.

## 3. Where it shows
The private dashboard (/painel, Cloudflare Access): segments and their size, the stage mix, funnels, cohorts, the gap map, segment reach for each sponsor category. A weekly summary of the aggregates in ops/METRICS.md.

## 4. Within the law (keep the data valuable at exit)
1. Profiling for personalisation and statistics is allowed with transparency: say it plainly in the privacy policy (what we infer, why, how to object; GDPR arts. 13, 21(2)). No automated decision with legal or similar effect on anyone (art. 22).
2. A short data protection impact assessment in ops/legal/DPIA.md before it goes live (art. 35: systematic evaluation of personal aspects).
3. Never: device fingerprinting or any storage on the device without consent (Lei 41/2004 art. 5); buying or enriching personal data from third parties; matching people across other sites or social networks; inferring health, religion, ethnicity, politics or sexuality (art. 9); per-person data to any partner (D6).
4. Anonymous layer: session ids expire with the visit; aggregates shown only for groups of 10 or more.

## 5. Ship
On design-v2: the schema, the store, the joins, the six tools as scripts and dashboard views, the DPIA draft and the privacy-policy wording. Test with synthetic data. Report in plain text, one line per tool, with the preview link.
