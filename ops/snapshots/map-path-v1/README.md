# Map and path v1, frozen (D55)

Branch `freeze-map-path-v1` (commit 4469117, never committed to) with its own Cloudflare preview:
https://freeze-map-path-v1-imoveis-portugal.geralportugalimoveis.workers.dev/

The tag `map-path-v1` could not be pushed from the build session (the git proxy refuses tags, HTTP 403); create it on GitHub on commit 4469117 (task 29a).

Screenshots, desktop 1440 px and mobile 390 px, edition Luxembourg in Portuguese, taken 26 Oct 2026 from that commit:
- 01 home (full page)
- 02 map, whole of Portugal · 03 Lisbon selected · 04 Gondomar selected · 05 a budget entered (400 000 €)
- 06 path start screen
- 07 buying path, every station at 400 000 € (01 to 09), plus the two stations added for a high budget (struct, estate) at 1 500 000 €
- 08 selling path for an inherited home, every station (01 to 07)
- 09 FAQ (screen and full page)

Rule from now on (D55): on the working branch, no changes to the map, the path pages or the navigation except bug fixes; map improvements go to branch `map-v2` until the operator says go.
