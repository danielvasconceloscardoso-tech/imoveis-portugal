# Map v2 against v1 (prompt 29 §3, D55)

Branch `map-v2` (preview: https://map-v2-imoveis-portugal.geralportugalimoveis.workers.dev/) against the frozen v1 (branch `freeze-map-path-v1`, preview https://freeze-map-path-v1-imoveis-portugal.geralportugalimoveis.workers.dev/; its screenshots are in ops/snapshots/map-path-v1/ on the working branch). Same states, same names: 02 Portugal, 03 Lisbon selected, 04 Gondomar selected, 05 a budget entered; then what v2 adds: 10 the time slider at Q1 2016, 11 Porto and Lisbon side by side, 12 the Islands chip, 13 the coastal glide on a first visit.

## Speed (measured 26 Oct 2026 on the same machine, /en/lu/map/, uncompressed local server)

| | v1 | v2 |
| --- | --- | --- |
| Lighthouse mobile performance (median of 3) | 94 (94, 94, 94) | 93 (92, 93, 94) |
| Largest Contentful Paint | 2.41 s | 2.41 s |
| Map JavaScript, gzip: our code / with MapLibre | 12.7 KB / 230.7 KB | 14.2 KB / 232.2 KB |
| Frame rate, 5 s orbit, phone profile (390×844, CPU 4× slower, software WebGL) | 18 fps | 17 fps |

The map's code loads only when the reader first touches or scrolls the map, so v2's extra 1.5 KB does not reach the first paint; the Lighthouse and frame-rate gaps are within the run-to-run spread here (software rendering, no GPU). The coastal photographs are not in yet (content/media/SOURCES.md, task 29b): they are lazy-loaded WebP in three sizes and will not change the first paint either.
