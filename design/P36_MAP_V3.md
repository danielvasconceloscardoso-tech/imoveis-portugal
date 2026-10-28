# Map v3 (prompt 36, D62): what was built and how fast it is

Preview: the design-v2 branch, `/pt/lu/mapa/` (and the home page, where the map rotates slowly and stops after 15 seconds or at the first touch). v1 (main) and map-v2 stay as they were.

## What the reader gets

1. **The look.** Portugal as a relief model: real terrain (AWS Terrain Tiles, Portugal only; Spain and the sea floor flattened), hillshade lit from the south-west, our own basemap (sand land, a sea with a calm depth gradient, a fine bright coastline, the Tejo, Douro, Minho and Guadiana), place names in Playfair for the big places and Manrope as you zoom. The price is a colour field draped on the relief, one sand-to-green ramp whose lightness falls steadily (readable in the common colour-vision types). The legend is one thin line with two numbers.
2. **Day / Night.** NASA Black Marble (public domain): Lisbon, Porto, the Algarve coast and Madeira glow; Madeira and the Azores, drawn beside the mainland, keep their own relief and lights.
3. **Budget as a gesture.** A slider in the reader's currency, tap the amount to type it; the places the budget reaches (100 m² or more) glow, and one sentence answers: "Com cerca de 1 500 000 €, compra perto de 590 m² em Grândola e 307 m² em Cascais. Medianas do INE, 2.º trimestre de 2026."
4. **Hover and tap.** A place lifts with its name and one number; a tap flies in (1.2 s, eased) and opens the card: from the side on desktop, from the bottom on mobile with three heights (peek, half, full). Photo, name, price per m², 10-year change, rent, what the budget buys, the 10-year line, "Ver casas aqui" and "Falar com o concierge"; Compare, details and share one tap further.
5. **Search like Spotlight.** The magnifier or ⌘K: 308 concelhos, Comporta, Melides, Vilamoura, Quinta do Lago and other well-known places, parishes, golf courses, 985 named beaches (OpenStreetMap) and partner developments. Typing "Comp" already glides to Comporta.
6. **Chips:** Preço · 10 anos · Renda · Rentabilidade, then Golfe · Praias · Novos empreendimentos (partners only) as overlays.
7. **Time.** A slim scrubber, 2016 to 2026, and play: ten years in about 12 seconds.
8. **Compare.** Pin two places; a mirrored split card shows their numbers.
9. **Tours.** "A costa, do Porto à Comporta", "Golfe no Algarve", "Madeira", "Dez anos em vinte segundos"; a touch takes over at any moment.
10. **Arrival.** One opening flight from the Atlantic onto the coast on the map page; the slow rotation on the home page.
11. **Every state is a link:** `?place=`, `?parish=`, `?layer=`, `?q=` (quarter), `?budget=`, `?night=1`, `?golf=1`, `?beach=1`, `?devs=1`.

Kept: 308/308 concelhos clickable (flat and 3D), parishes from zoom 8.2, golf, the embed with "Powered by" (still map v2), every source on /credits/ and in the map's attribution, the plain list of 308 places without JavaScript.

## Speed

Lighthouse mobile (simulated mid-range phone, 4x CPU, slow 4G), map page, on a local server with Cloudflare-like compression; SEO is left out (the preview is noindex).

| | v1 (main) | map-v2 | map v3 |
| --- | --- | --- | --- |
| Performance | 99-100 | 99-100 | 96-99 |
| LCP | 1.65 s | 1.5-1.9 s | 1.9-2.2 s |
| Total blocking time | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0.001 |
| Bytes before the first touch | 127 KB | 164 KB | 131 KB |
| From the first touch to a live map * | 3.2 s | 11.8 s | 4.9 s |
| Bytes after the first touch * | 1.7 MB | 2.2 MB | 1.2 MB |
| Frame rate during a camera move * | 60 | 31 | 9 (see below) |

\* Measured in this build environment: 390 x 844 screen, 4x CPU slow-down, and **software WebGL (no graphics card)**. The first two rows compare fairly; the frame rate does not stand for a phone, whose GPU draws the relief and the layers. In software rendering v3 is heavier than v2 (more layers, 3D terrain, a full-screen sea).

How the relief is kept from costing the reader:

1. The map wakes at the first sign of a reader (a pointer moving over it, a touch, a key, a scroll), as map v2 did; before that the page shows a poster that is the map's first frame (22 KB on mobile). A shared link with a state opens the map straight away.
2. Everything is self-hosted: about 16 MB of tiles on the server, of which a reader loads around 1.2 MB for the first view.
3. A frame-rate governor watches the first seconds of movement: below 40 fps it removes the 3D terrain (the hillshade keeps the relief), below 30 fps it lowers the resolution to 1.5x. The pixel ratio is capped at 2 on 3x phones.
4. Reduced motion and weak devices (2 cores or Save-Data) get the flat map with no animation.

Still to measure: frame rate on a real mid-range phone (an operator's phone with the preview link is enough: open the map, run "Golfe no Algarve", and tell us if it stutters).
