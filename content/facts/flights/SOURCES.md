# US to Portugal: nonstop routes and flight times (prompt 71 §1, checked 4 Nov 2026)

Two files, read by `site/src/lib/closer.ts` for the US edition's "Closer than you think" page (`/en/us/closer-than-you-think/`). Every row also has its row in `content/facts/facts.csv` (column `fact`).

## us_nonstops.csv: every nonstop from the US to Portugal

Source: US Department of Transportation, Bureau of Transportation Statistics, **T-100 International Segment (All Carriers)**, https://www.transtats.bts.gov/DL_SelectFields.aspx?gnoyr_VQ=FJE (form fields: geography Portugal, period All, years 2025 and 2026; fields DEPARTURES_SCHEDULED, DEPARTURES_PERFORMED, SEATS, PASSENGERS, DISTANCE, RAMP_TO_RAMP, AIR_TIME, UNIQUE_CARRIER, ORIGIN, DEST, YEAR, MONTH, CLASS). Every carrier, US or foreign, reports each nonstop segment it flies to or from the US, month by month. Rows kept: origin country US, destination Portugal, class F (scheduled passenger service). The 2026 file held January to July when downloaded.

- `season`: the months flown in 2025 (and 2026 for a route that started in 2026 or earlier in the year); "all year" when flown every month of 2025.
- `gate_min_2026`: ramp-to-ramp minutes (gate out to gate in, as flown) divided by departures performed, Jan to Jul 2026. Only US carriers report it; TAP and Azores Airlines report none, so their routes show no time.
- `shown`: 1 when the route was flown at least 9 times in Jan to Jul 2026 (one-off flights, such as a single diversion, stay in the file with 0).
- JetBlue (named in the brief) flies no nonstop to Portugal in these data. United's Newark to Faro, Funchal and Ponta Delgada, Delta's JFK to Porto and TAP's Boston to Porto are seasonal.

## us_domestic.csv: the domestic trip beside it

Source: US DOT, BTS, **Airline On-Time Performance**, Reporting Carrier On-Time Performance (1987 to present), monthly files for January to July 2026, https://transtats.bts.gov/PREZIP/ (On_Time_Reporting_Carrier_On_Time_Performance_1987_present_2026_{1..7}.zip). `gate_min` is the average ActualElapsedTime (gate out to gate in, the same measure as T-100 ramp-to-ramp time, same months), cancelled and diverted flights excluded; `scheduled_min` is the average CRSElapsedTime (the airlines' published block time).

## Azores Airlines: leave after dinner, land for breakfast

Azores Airlines' own flight schedule, https://www.azoresairlines.pt/en/flight-schedule (the timetable search; the page reads `/en/flight-schedule-json?origin=…&dest=…&departure=…`), queried for 12 Nov 2026, 18 Mar 2027 and 15 Jul 2027 from JFK, Boston and Oakland to every Azores and mainland airport. Nonstops: JFK to Ponta Delgada (S4 246, 21:20 to 06:55 in winter), Boston to Ponta Delgada (S4 224 / S4 280, 21:25 to 06:20) and Boston to Terceira (S4 234). Oakland returned no flights.

## Not reachable from the build environment (not used)

The airlines' own timetables: flytap.com (Cloudflare challenge; tapairportugal.com press pages render client-side), united.com (not resolvable), delta.com (444), aa.com (403), jetblue.com (client-side app with no schedule in the page). Airport route lists: ANA (aeroportolisboa.pt, aeroportoporto.pt, aeroportofaro.pt, aeroportomadeira.pt: Incapsula challenge), Boston Logan (Incapsula), LAX, Dulles and O'Hare (403). Newark's own site lists Faro, Lisbon, Ponta Delgada, Porto and Madeira among its destinations (newarkairport.com/flights/departures, destination filter), which matches the DOT data. The brief's scheduled times (New York to Los Angeles 6 h 08 to 6 h 19, New York to Lisbon 6 h 45 to 6 h 55, Newark to Faro 7 h 20 leaving 21:30 and landing 09:50, Newark to Honolulu 11 h 28) could not be read on an airline's own timetable; the page uses the DOT averages above instead.
