# Photography standard (operator, 3 Nov 2026; applies to every place, card, postcard and article)

1. **Breathtaking views first:** the river, the sea, the coastline, viewpoints (miradouros), the Douro valley, rooftops at golden hour, the light on the water.
2. **Wide, full-bleed, warm natural light;** no people in close-up, no clichés, no collages.
3. **Licences that allow commercial use only:** Unsplash, Pexels, Pixabay Content License, Wikimedia Commons (CC0, CC BY, CC BY-SA, with attribution), our partner developers' renders (for their own projects), Turismo de Portugal's media bank once the operator registers us. Never "all rights reserved", "non-commercial" (NC) or "no derivatives" (ND) for graded copies.
4. **Every photo is credited on /credits/** (site/src/lib/credits.ts) and listed below with its source URL, author and licence. CC BY-SA copies we grade are shared under the same licence.
5. **Selection rules per place:** one hero (the place's best view: water, coast, valley or rooftops, golden hour preferred) and two gallery views; the place must be recognisable and named correctly in the alt text; no developer render stands in for a place; if no photo meets the standard, the card says so in the report and is not shipped weaker (CLAUDE.md rule 17).
6. **Web copies:** graded with scripts/design/resort_grade.py, cut to 640/1024/1600 px WebP (and AVIF where the page uses it).

# Photographs and video on the home page (prompt 33 §1, 27 Oct 2026)

Every photograph carries the one grade, `python3 scripts/design/resort_grade.py <in> <out> 1.3` (bright, warm, soft
contrast, blues and greens slightly muted); the film carries the same look as an ffmpeg filter. Web copies are cut to
`site/public/img/v2/<name>-{640,1024,1600}.{avif,webp}`. Pixabay Content License and Mixkit License: commercial use,
no attribution required, not redistributed as stand-alone files. CC BY-SA: credited on /credits/ (site/src/lib/credits.ts),
never in a caption; our graded copies are shared under the same licence.

| File (site/public/) | Where on the home page | What it shows | Source | Licence |
| --- | --- | --- | --- | --- |
| video/hero-portugal.mp4, video/hero-portugal-poster.* | Hero film (21 s, 1.9 MB) and its poster (first frame), restored on 28 Oct 2026 exactly as at commit 6e9a1bc (operator's request) | 0–6 s the Algarve cliffs with villas and a pool from the air; 5–11 s a white pool with cabanas; 10–16 s a morning beach near Lagos; 15–21 s the Atlantic in late light | Pixabay video 237279 (Radds); Mixkit 4045; Pixabay video 13771 (Wowa84); Mixkit 22254 | Mixkit License; Pixabay Content License |
| img/v2/resort-piscina-oliveira-* | About, tall photograph | A pool beside an olive tree and a white wall, Alentejo | Pixabay 643413, somepaulo | Pixabay Content License |
| img/v2/lisboa-tejo-cais-* | Place card, Lisbon | The Tagus at the Cais das Colunas, a sailing boat | Pixabay 3844136, Louise36 | Pixabay Content License |
| img/v2/porto-douro-amanhecer-* | Place card, Porto | The Douro at first light, a rabelo boat | Pixabay 4688930, vjgalaxy | Pixabay Content License |
| img/v2/cascais-boca-do-inferno-* | Place card, Cascais | Boca do Inferno at golden hour | Pixabay 3951680, BernardoUPloud | Pixabay Content License |
| img/v2/comporta-dunas-* | Place card, Comporta | Dunes and the empty beach between Praia da Comporta and Praia da Torre (bottom 6% cropped to remove the photographer's watermark) | Vitor Oliveira, Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Litotal_entre_a_Praia_da_Comporta_e_a_Praia_da_Torre_-_Portugal_(48800641008).jpg | CC BY-SA 2.0 |
| img/v2/algarve-praia-da-marinha-* | Place card, Algarve | Golden cliffs at Praia da Marinha, Lagoa | Pixabay 1786783 | Pixabay Content License |
| img/v2/madeira-funchal-fogo-* | Place card, Madeira (prompt 34, 27 Oct 2026) | New Year's Eve fireworks over Funchal bay | Supplied by the operator in chat, 27 Oct 2026; source page and licence to follow (prompt 34 §4: to be confirmed before launch) | To confirm |
| img/v2/madeira-sao-lourenco-* | Previously the Madeira place card (kept for other pages) | Ponta de São Lourenço in warm light | Pixabay 6763548, pixelRaw | Pixabay Content License |
| img/v2/algarve-golfe-amanhecer-* | Mosaic, tile 1 (large) | A fairway in morning fog, Algarve (golfers small, backs or profiles) | Pixabay 1268298, ullakvist | Pixabay Content License |
| img/v2/madeira-porto-moniz-* | Mosaic, tile 2 | The natural pools of Porto Moniz, Madeira | Pixabay 6819229, Olga_Fil | Pixabay Content License |
| img/v2/resort-mesa-terraco-* | Mosaic, tile 3 | A table set on a terrace at sunset (place not stated by the source) | Pixabay 5356682, JoelFazhari | Pixabay Content License |
| img/v2/resort-piscina-mar-* | Mosaic, tile 4 (large) | An infinity pool above the sea (place not stated by the source; alt text names no place) | Pixabay 2396808, lenchen87 | Pixabay Content License |
| img/v2/madeira-levada-* | Mosaic, tile 5 | A levada in the Laurissilva, Madeira | Pixabay 7110623, alandsmann | Pixabay Content License |
| img/v2/lisboa-tejo-vela-* | Mosaic, tile 6 | A sailing boat on the Tagus, Lisbon across the river | Pixabay 7010962, wsdamiao | Pixabay Content License |

Removed from the home page in this pass: the tram, Alfama roofs, the Ribeira, Praia da Rainha, Ponta da Piedade, Funchal,
Sintra, Douro terraces, Benagil, Madeira north coast and Ponte Luís I photographs (files kept where other pages use
them), the Praia da Comporta photograph with umbrellas (files deleted) and its caption credit.

## Prompt 35 §2 (D61), 27 Oct 2026: the CTO's choice to the D60 standard

Downloaded at the largest public size, cropped where noted, graded with `resort_grade.py` (1.0; 0.4 for the night photo). CC BY and CC BY-SA photographs are credited on /credits/ only; our graded copies of CC BY-SA photographs are shared under the same licence.

| File (site/public/) | Where | What it shows | Source page | Licence | Date checked |
| --- | --- | --- | --- | --- | --- |
| img/v2/comporta-praia-dunas-* | About (tall photograph) | Comporta's white beach and dunes, turquoise sea (centre of a panorama) | https://www.flickr.com/photos/sarunas_b/52660132908/ (Šarūnas Burdulis) | CC BY-SA 2.0 | 2026-10-27 |
| img/v2/comporta-mar-turquesa-* | Place card, Comporta | Turquoise water reaching the sand | https://www.flickr.com/photos/sarunas_b/52659924874/ (Šarūnas Burdulis) | CC BY-SA 2.0 | 2026-10-27 |
| img/v2/comporta-mar-arrabida-* | Mosaic | The sea at Comporta, Arrábida beyond | https://www.flickr.com/photos/sarunas_b/52659924749/ (Šarūnas Burdulis) | CC BY-SA 2.0 | 2026-10-27 |
| img/v2/cascais-baia-* | Place card, Cascais | The bay, small boats, the old town (cropped to leave out a parked van) | https://pixabay.com/photos/beach-cascais-portugal-sea-4585777/ | Pixabay Content License | 2026-10-27 |
| img/v2/lisboa-castelo-por-do-sol-* | Place card, Lisboa | From São Jorge castle at sunset, rooftops, the Tagus, the 25 de Abril bridge | https://www.flickr.com/photos/stephendgardner/8634512892/ (Steve Gardner) | CC BY 2.0 | 2026-10-27 |
| img/v2/porto-douro-entardecer-* | Place card, Porto | The Douro and the Luís I bridge at sunset | Unsplash photo-1513735492246-483525079686 (see design/directions/photos/CREDITS.md) | Unsplash License | 2026-10-27 |
| img/v2/porto-ribeira-noite-* | Mosaic | The Ribeira at blue hour, lights on the Douro | https://pixabay.com/photos/porto-city-portugal-historic-city-1972486/ | Pixabay Content License | 2026-10-27 |
| img/v2/algarve-porto-de-mos-* | Place card, Algarve | Golden cliffs above Porto de Mós beach | https://www.flickr.com/photos/sergeigussev/54459216417/ (Sergei Gussev) | CC BY 2.0 | 2026-10-27 |
| img/v2/algarve-falesias-por-do-sol-* | Mosaic | Algarve cliffs at sunset near Porto de Mós (landscape crop) | https://www.flickr.com/photos/sergeigussev/54460328213/ (Sergei Gussev) | CC BY 2.0 | 2026-10-27 |

Removed from the home page: the olive tree and pool, the table on a terrace, the pool above the sea (all generic resort photographs), the Comporta photograph with the cropped watermark, Boca do Inferno, Praia da Marinha, the Cais das Colunas and the Douro at dawn.

Not found under a free or open licence (Unsplash, Pexels, Pixabay, Flickr commercial licences; Wikimedia rate-limited): an aerial of Comporta, and a clifftop or dune golf course in Portugal. The golf tile stays the Algarve course at sunrise until one is found.

## Prompt 36 (D62), 27 Oct 2026: map v3 data layers

All self-hosted (built by scripts/map-data/v3_assets.py and v3_extras.py); credited on /credits/ and in the map's small attribution line.

| Layer | Source | Licence | Notes |
| --- | --- | --- | --- |
| Relief (3D terrain, hillshade) | Terrain Tiles, Mapzen on AWS Open Data (registry.opendata.aws/terrain-tiles), terrarium encoding | Open; attribution required (EU-DEM Copernicus, SRTM and GMTED2010 USGS, ETOPO1 NOAA) | z5-z10, mainland only, sea floor clamped to 0 m, outside Portugal lowered to 0 m |
| Sea depth tint | Same tiles (bathymetry) | As above | z5-z8 near, z5-z6 far |
| Night lights | NASA Black Marble 2016 (VIIRS_Black_Marble), NASA GIBS | Public domain (NASA imagery, no copyright) | z5-z8 near, z5-z6 far; inset images for Madeira and the Azores |
| Rivers (Tejo, Douro, Minho, Guadiana) | Natural Earth 1:10m rivers and lake centrelines | Public domain | clipped to mainland Portugal |
| Beaches | OpenStreetMap natural=beach, named, via Nominatim (1 request a second) | ODbL, © OpenStreetMap contributors | 985 points |
| Golf, boundaries | OpenStreetMap (unchanged from map v2) | ODbL | |

### Golf courses (prompt 36 §9), 28 Oct 2026

`content/facts/golf/courses.csv` (79 courses; notes and weak rows in `content/facts/golf/NOTES.md`) is the map's golf layer (`scripts/map-data/golf_list.py` → `site/public/data/map/golf.json`). Details from Visit Portugal course pages and visitmadeira.com / valedolobo.com; fpg.pt, visitalgarve.pt and most resort sites were blocked from the build environment and are still to be checked against the list. Coordinates: OpenStreetMap Nominatim (never Google). Outlines: OpenStreetMap leisure=golf_course (ODbL) where one lies at the course.

## D83 lifestyle articles (3 Nov 2026)

One photograph per article (content/stories/). Five come from the library above; five are new, found through the Openverse API (Wikimedia Commons and the Unsplash and Pexels sites refused or rate-limited the build environment that night, so only Flickr originals could be fetched, at 1024 px). New files are graded with `resort_grade.py` (1.0), not cropped (photographers' marks kept), cut to `img/v2/<name>-{640,1024}.{avif,webp}` (no 1600: the originals are 1024 px wide). CC BY and CC BY-SA are credited on /credits/ (site/src/lib/credits.ts); our graded copies of CC BY-SA photographs are shared under the same licence.

| File (site/public/) | Article | What it shows | Source page | Author | Licence | Date checked |
| --- | --- | --- | --- | --- | --- | --- |
| img/v2/algarve-praia-da-marinha-* | Um inverno sem geada… | Praia da Marinha, Lagoa | (library, above) | | Pixabay Content License | 2026-11-03 |
| img/v2/lisboa-tejo-cais-* | Portugal está entre os países mais pacíficos… | The Tagus from the Cais das Colunas | (library, above) | | Pixabay Content License | 2026-11-03 |
| img/v2/matosinhos-she-changes-* | Um dia normal em Matosinhos | Janet Echelman's She Changes over the roundabout | https://www.flickr.com/photos/21446942@N00/29604509272 | Vitor Oliveira (Portuguese_eyes) | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/porto-douro-palacio-de-cristal-* | A mesa mais estrelada do Porto… | The Douro from the Palácio de Cristal gardens | https://www.flickr.com/photos/24879135@N04/38195462106 | mattk1979 | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/douro-socalcos-* | O Douro tem 270 anos… | Douro vineyard terraces | (site/public/video/CREDITS.md: Pixabay 5649128) | Ramiro-- | Pixabay Content License | 2026-11-03 |
| img/v2/leca-piscina-das-mares-* | Siza e Souto de Moura… | Siza's tidal pools, Leça da Palmeira | https://www.flickr.com/photos/21446942@N00/27747007423 | Vitor Oliveira (Portuguese_eyes) | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/cascais-baia-* | Cascais, de vila de pescadores a casa de reis | The bay of Cascais | (library, above) | | Pixabay Content License | 2026-11-03 |
| img/v2/porto-foz-farolim-felgueiras-* | As escolas internacionais do Porto e de Lisboa | Felgueiras lighthouse, Foz do Douro (no school exterior was found under a commercial licence) | https://www.flickr.com/photos/42201095@N03/52667959121 | Jocelyn777 Love Europe | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/porto-ponte-luis-i-noite-* | São João, a noite em que o Porto não dorme | The Luís I bridge at night | Unsplash photo-1569959220744-ff553533f492 (design/directions/photos/CREDITS.md; photographer to confirm) | | Unsplash License | 2026-11-03 |
| img/v2/vila-do-conde-aqueduto-* | Vila do Conde, o mar a 41 minutos do Porto | The Santa Clara aqueduct | https://www.flickr.com/photos/133200397@N03/46637546551 | Sergei Gussev | CC BY 2.0 | 2026-11-03 |

## Fix step 4, 3 Nov 2026: the ten lifestyle articles, one view each

The articles were rewritten (PT, EN, FR) and every photograph reviewed against the standard above. Four were replaced by views that meet it (the Felgueiras lighthouse standing in for the schools, the Luís I bridge at night for São João, She Changes at midday for Matosinhos, the aqueduct for Vila do Conde); Faro now shows Faro instead of Praia da Marinha (Lagoa); Lisbon and Cascais moved to warmer views from the library. New files were found through the Wikimedia Commons API (the Unsplash, Pexels and Pixabay APIs need keys; Commons and Flickr rate-limited the build environment, so two more candidates, a Cascais sunset and the Foz do Douro, could not be downloaded), graded with `resort_grade.py` (1.0) and cut to `img/v2/<name>-{640,1024,1600}.{avif,webp}`. The previous files stay on disk.

| File (site/public/) | Article | What it shows | Source page | Author | Licence | Date checked |
| --- | --- | --- | --- | --- | --- | --- |
| img/v2/faro-ria-formosa-por-do-sol-* | inverno-faro | The Ria Formosa at sunset from the Praia de Faro bridge | https://commons.wikimedia.org/wiki/File:Sunset_from_the_Ponte_Praia_de_Faro_(36487363454).jpg | Eduard Marmet | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/lisboa-castelo-por-do-sol-* | paz-portugal | Lisbon from São Jorge castle at sunset | (library, above) | Steve Gardner | CC BY 2.0 | 2026-11-03 |
| img/v2/matosinhos-leixoes-por-do-sol-* | dia-matosinhos | Sunset on Matosinhos beach, the Leixões cruise terminal in silhouette | https://commons.wikimedia.org/wiki/File:Matosinhos_Harbour_(38677455861).jpg | prilfish | CC BY 2.0 | 2026-11-03 |
| img/v2/porto-douro-palacio-de-cristal-* | mesa-porto | The Douro from the Palácio de Cristal gardens (kept; daylight, 1024 px original) | (D83, above) | mattk1979 | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/douro-socalcos-* | douro-270 | Douro vineyard terraces (kept) | (D83, above) | Ramiro-- | Pixabay Content License | 2026-11-03 |
| img/v2/leca-piscina-das-mares-* | siza-souto | Siza's tidal pools, Leça da Palmeira (kept; the article's subject; 1024 px original) | (D83, above) | Vitor Oliveira | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/cascais-boca-do-inferno-* | cascais-reis | Boca do Inferno, Cascais, at golden hour | (library, above) | BernardoUPloud | Pixabay Content License | 2026-11-03 |
| img/v2/porto-douro-amanhecer-* | escolas | The Douro at first light, a rabelo boat, Ribeira | (library, above) | vjgalaxy | Pixabay Content License | 2026-11-03 |
| img/v2/porto-douro-entardecer-* | sao-joao | The Douro and the Luís I bridge at sunset | (library, above) | Unsplash | Unsplash License | 2026-11-03 |
| img/v2/vila-do-conde-rio-ave-santa-clara-* | vila-do-conde | The Ave River and the Monastery of Santa Clara | https://commons.wikimedia.org/wiki/File:Convento_de_Santa_Clara_(Vila_do_Conde)_(3).jpg | Joseolgon | CC BY 4.0 | 2026-11-03 |
## Golden sample place card: Gondomar (operator's step 1, 3 Nov 2026)

One hero and two gallery views for Gondomar's card on the map (photography standard above). Found through the Openverse API; the Wikimedia Commons copies of the photographer's Flickr originals were downloaded at 1920 px (Commons thumbnails), cropped (sky, and the bottom edge with the photographer's mark), graded with `resort_grade.py` (1.0) and cut to `img/v2/<name>-{640,1024,1600}.webp` (the hero and the marina: 640 and 1024 only, their crops are 1382 and 1128 px wide). The camera positions in the Flickr metadata were reverse-geocoded with Nominatim: all three are in the municipality of Gondomar. CC BY-SA: credited on /credits/ (site/src/lib/credits.ts); our graded copies are shared under the same licence.

**Not met: golden hour.** No golden-hour photograph of Gondomar (Gramido, Valbom, Melres, the Marina do Freixo or the river beaches) was found under a commercial licence on Openverse (Flickr and Wikimedia Commons; Unsplash and Pexels refused the build environment). All three are clear daylight; the grade warms them. The Marina do Freixo results were the Palácio do Freixo and the Freixo bridge, which are in Porto, not Gondomar.

| File (site/public/) | Where | What it shows | Source page | Author | Licence | Date checked |
| --- | --- | --- | --- | --- | --- | --- |
| img/v2/gondomar-douro-gramido-* | Gondomar card, hero | The Douro from Gramido (Valbom, Gondomar), small boats, the terrace on the Gondomar bank | https://commons.wikimedia.org/w/index.php?curid=77637693 (Flickr 38633058680) | Vitor Oliveira (Portuguese_eyes) | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/gondomar-melres-douro-* | Gondomar card, gallery | The Douro valley from Melres (Gondomar), the far bank and the hills | https://commons.wikimedia.org/w/index.php?curid=77637623 (Flickr 36407281306) | Vitor Oliveira (Portuguese_eyes) | CC BY-SA 2.0 | 2026-11-03 |
| img/v2/gondomar-marina-melres-* | Gondomar card, gallery | The Marina de Melres (Gondomar) on the Douro | https://commons.wikimedia.org/w/index.php?curid=77637715 (Flickr 41314804074) | Vitor Oliveira (Portuguese_eyes) | CC BY-SA 2.0 | 2026-11-03 |

## Norte roll-out: place cards and region postcards (operator's step 2, 3 Nov 2026)

The golden sample's standard, place by place (Gondomar above is unchanged). Every candidate came from the Wikimedia Commons API (full-text search and a 10 km geosearch around the Câmara Municipal), filtered to CC0, public domain, CC BY and CC BY-SA, at least 1280 px wide and landscape; the camera point (the file's Commons coordinates) had to fall inside the municipality, or, where a file has no coordinates, its title, description or category had to name a place inside it (said in each row). Picked by eye from contact sheets: water, coast, valley or rooftops first, golden hour where there was one. Downloaded as Commons thumbnails (1920 px, or 1280 px where the original is smaller; Openverse answered HTTP 500 and Flickr's image servers refused the build environment), cut to 16:10 with the photographer's mark trimmed where there was one, graded with `resort_grade.py` (1.0) and saved as `img/v2/<name>-{640,1024,1600}.webp`. Credited on /credits/ (site/src/lib/credits.ts); our graded copies of CC BY-SA photographs are shared under the same licence. Four photographs already on the site were reused (rows marked); their licence and camera point were re-checked today.

Municipalities that passed lines 3 and 4 but **failed line 1** (no hero and two gallery views to this standard; they keep today's card, see ops/ACCEPTANCE_PLACE_CARD.md, "Norte roll-out"): Lousada, Maia, Paços de Ferreira, Paredes, Penafiel.

| File (site/public/) | Where | What it shows | Source page | Author | Licence | Camera point | Date checked |
| --- | --- | --- | --- | --- | --- | --- | --- |
| img/v2/espinho-barrinha-por-do-sol-* | Espinho card, hero | Sunset over the Barrinha de Esmoriz, the Paramos lagoon, Espinho | https://commons.wikimedia.org/w/index.php?curid=176539864 (Serene sunset over the calm water of the Barrinha de Esmoriz or Lagoa de Paramos lagoon, Espinho, Aveiro, Portugal, January 2024 (53523152049)) | Sergei Gussev | CC BY 2.0 | camera point 40.96652, -8.64692 (Commons), inside Espinho | 2026-11-03 |
| img/v2/espinho-praia-da-baia-* | Espinho card, gallery | Praia da Baía and the Atlantic, Espinho | https://commons.wikimedia.org/w/index.php?curid=176539972 (Sandy beach Praia da Baia with a cloudy sky in the background, Espinho, Aveiro, Portugal, January 2024 (53522977158)) | Sergei Gussev | CC BY 2.0 | no camera coordinates; the title names Praia da Baía, Espinho | 2026-11-03 |
| img/v2/espinho-praia-de-paramos-* | Espinho card, gallery | Praia de Paramos and its chapel, Espinho | https://commons.wikimedia.org/w/index.php?curid=77610642 (Praia de Paramos - Portugal (4004050151)) | Vitor Oliveira | CC BY-SA 2.0 | no camera coordinates; the title names Praia de Paramos (Espinho); Commons category Chapels in Espinho | 2026-11-03 |
| img/v2/feira-cidade-do-castelo-* | Santa Maria da Feira card, hero | Santa Maria da Feira seen from its castle, rooftops and hills | https://commons.wikimedia.org/w/index.php?curid=627410 (Castelo de Sta. Maria da Feira4) | Vitor Oliveira | CC BY 2.0 | camera point 40.92114, -8.54298 (Commons), inside Santa Maria da Feira | 2026-11-03 |
| img/v2/feira-muralhas-do-castelo-* | Santa Maria da Feira card, gallery | The walls of Santa Maria da Feira castle above the town | https://commons.wikimedia.org/w/index.php?curid=627412 (Castelo de Sta. Maria da Feira6) | Vitor Oliveira | CC BY 2.0 | camera point 40.92083, -8.54312 (Commons), inside Santa Maria da Feira | 2026-11-03 |
| img/v2/feira-castelo-* | Santa Maria da Feira card, gallery | Santa Maria da Feira castle | https://commons.wikimedia.org/w/index.php?curid=7383311 (Vista exterior do castelo de Santa Maria da Feira) | Marinhopaiva | CC BY-SA 3.0 | no camera coordinates; the castle stands in the town of Santa Maria da Feira | 2026-11-03 |
| img/v2/amares-cavado-prozelo-* | Amares card, hero | The Cávado at Prozelo, Amares, with its sandy river beach | https://commons.wikimedia.org/w/index.php?curid=48472567 (Cávado River in Prozelo Amares (2)) | Joseolgon | CC BY-SA 4.0 | no camera coordinates; the description names Prozelo, Amares (the sand bank in front is on the Amares side) | 2026-11-03 |
| img/v2/amares-rio-homem-fiscal-* | Amares card, gallery | The Homem river at Fiscal, Amares, and an old stone mill | https://commons.wikimedia.org/w/index.php?curid=130835429 (Rio Homem - Fiscal - Portugal (52814965094)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.65731, -8.40106 (Commons), inside Amares | 2026-11-03 |
| img/v2/amares-miradouro-senhora-da-paz-* | Amares card, gallery | The valley from the Nossa Senhora da Paz viewpoint, Amares | https://commons.wikimedia.org/w/index.php?curid=123090078 (Miradouro de Nossa Senhora da Paz - Amares - Portugal (52361558163)) | Vitor Oliveira | CC BY-SA 2.0 | no camera coordinates; the title names the Nossa Senhora da Paz viewpoint, Amares | 2026-11-03 |
| img/v2/braga-bom-jesus-por-do-sol-* | Braga card, hero | Braga at sunset, seen from Bom Jesus do Monte | https://commons.wikimedia.org/w/index.php?curid=58182722 (Sunset, Bom Jesus do Monte, Braga) | Jsamwrites | CC BY-SA 4.0 | camera point 41.55460, -8.37750 (Commons), inside Braga | 2026-11-03 |
| img/v2/braga-vista-terreiro-de-moises-* | Braga card, gallery | Braga from the Terreiro de Moisés, at the Bom Jesus do Monte sanctuary | https://commons.wikimedia.org/w/index.php?curid=37083974 (Braga-Santuário do Bom Jesus do Monte-Vista de Braga-20140912) | Daniel VILLAFRUELA | CC BY-SA 4.0 | camera point 41.55465, -8.37783 (Commons), inside Braga | 2026-11-03 |
| img/v2/braga-serras-entardecer-* | Braga card, gallery | The city and the hills at dusk, from the Bom Jesus do Monte sanctuary | https://commons.wikimedia.org/w/index.php?curid=120861784 (Sunset viewed at the Sanctuary of Bom Jesus do Monte 01) | John Samuel | CC BY-SA 4.0 | no camera coordinates; the title names the Bom Jesus do Monte sanctuary, Braga | 2026-11-03 |
| img/v2/vila-verde-cavado-entardecer-* | Vila Verde card, hero | The Cávado at dusk by the N201, Vila Verde | https://commons.wikimedia.org/w/index.php?curid=60305078 (N201, Portugal - panoramio) | Belarmino Ribeiro | CC BY 3.0 | camera point 41.59562, -8.46288 (Commons), inside Vila Verde | 2026-11-03 |
| img/v2/vila-verde-foz-do-homem-* | Vila Verde card, gallery | The Homem river meeting the Cávado at Soutelo, Vila Verde | https://commons.wikimedia.org/w/index.php?curid=46662805 (Rio Homem e Rio Cávado) | Joseolgon | CC BY-SA 4.0 | no camera coordinates; the description names Soutelo, Vila Verde | 2026-11-03 |
| img/v2/vila-verde-praia-do-faial-* | Vila Verde card, gallery | The Faial river beach on the Cávado, Vila de Prado | https://commons.wikimedia.org/w/index.php?curid=166660739 (Praia do Faial) | Joseolgon | CC BY 4.0 | no camera coordinates; the description names Vila de Prado (Vila Verde) | 2026-11-03 |
| img/v2/vizela-ponte-velha-* | Vizela card, hero | The Vizela river and the old bridge, Caldas de Vizela | https://commons.wikimedia.org/w/index.php?curid=78957308 (Rio Vizela - Caldas de Vizela - Portugal (26310072288)) | Vitor Oliveira | CC BY-SA 2.0 | no camera coordinates; the title names Caldas de Vizela; Commons category Ponte Velha de Vizela | 2026-11-03 |
| img/v2/vizela-acude-parque-das-termas-* | Vizela card, gallery | The weir on the Vizela river in the Parque das Termas, in autumn | https://commons.wikimedia.org/w/index.php?curid=21446981 (Rio Vizela (2074627714)) | Feliciano Guimarães | CC BY 2.0 | no camera coordinates; the description names the Parque de Vizela; Commons category Parque das Termas de Vizela | 2026-11-03 |
| img/v2/vizela-parque-das-termas-* | Vizela card, gallery | The river in the Parque das Termas, Vizela | https://commons.wikimedia.org/w/index.php?curid=78957208 (Parque das Termas de Vizela - Caldas de Vizela - Portugal (33138239974)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.37190, -8.30354 (Commons), inside Vizela | 2026-11-03 |
| img/v2/matosinhos-leixoes-por-do-sol-* | Matosinhos card, hero (already on the site and on /credits/) | Sunset on Matosinhos beach, the Leixões cruise terminal in silhouette | File:Matosinhos Harbour (38677455861).jpg | (as credited) | (as credited) | no camera coordinates (Flickr 38677455861 has none); the view is Matosinhos beach and the Leixões cruise terminal, both in Matosinhos | 2026-11-03 |
| img/v2/matosinhos-leca-da-palmeira-praia-* | Matosinhos card, gallery | Leça da Palmeira beach, rocks and sand, Matosinhos | https://commons.wikimedia.org/w/index.php?curid=78041001 (Leça da Palmeira - Portugal (15407979669)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.19252, -8.70706 (Commons), inside Matosinhos | 2026-11-03 |
| img/v2/matosinhos-leca-farol-* | Matosinhos card, gallery | The Leça da Palmeira shore and the Boa Nova lighthouse | https://commons.wikimedia.org/w/index.php?curid=78040999 (Leça da Palmeira - Portugal (14973854464)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.19765, -8.71048 (Commons), inside Matosinhos | 2026-11-03 |
| img/v2/porto-praia-internacional-por-do-sol-* | Porto card, hero | Sunset on the Atlantic at Praia Internacional, Foz, Porto | https://commons.wikimedia.org/w/index.php?curid=45429732 (Sunset over Atlantic Ocean (23102474191)) | cat_collector | CC BY 2.0 | camera point 41.17230, -8.68914 (Commons), inside Porto | 2026-11-03 |
| img/v2/porto-douro-palacio-de-cristal-* | Porto card, gallery (already on the site and on /credits/) | The Douro and the city from the Palácio de Cristal gardens, Porto | Flickr 38195462106 (mattk1979) | (as credited) | (as credited) | camera point 41.14706, -8.62609 (Flickr 38195462106), inside Porto; licence CC BY-SA 2.0 re-checked on the Flickr page | 2026-11-03 |
| img/v2/porto-foz-farolim-felgueiras-* | Porto card, gallery (already on the site and on /credits/) | The Felgueiras light and the sea at Foz do Douro, Porto | Flickr 52667959121 (Jocelyn777 Love Europe) | (as credited) | (as credited) | camera point 41.14774, -8.66771 (Flickr 52667959121), inside Porto; licence CC BY-SA 2.0 re-checked on the Flickr page | 2026-11-03 |
| img/v2/gaia-praia-por-do-sol-* | Vila Nova de Gaia card, hero | Sunset over the Atlantic from the beach boardwalk, Vila Nova de Gaia | https://commons.wikimedia.org/w/index.php?curid=143704631 (Vila Nova de Gaia (52544291098)) | Sergei Gussev | CC BY 2.0 | camera point 41.07281, -8.65725 (Commons), inside Vila Nova de Gaia | 2026-11-03 |
| img/v2/gaia-cais-rabelos-* | Vila Nova de Gaia card, gallery | Rabelo boats at the Gaia quay, below the Luís I bridge | https://commons.wikimedia.org/w/index.php?curid=36768407 (Vila Nova de Gaia-Ponte Luis 1°-20140910) | Daniel VILLAFRUELA | CC BY-SA 4.0 | camera point 41.13824, -8.61178 (Commons), inside Vila Nova de Gaia | 2026-11-03 |
| img/v2/gaia-ponte-luis-i-jardim-do-morro-* | Vila Nova de Gaia card, gallery | The Luís I bridge and Porto's Ribeira from the Jardim do Morro, Gaia | https://commons.wikimedia.org/w/index.php?curid=176043289 (Ponte de Dom Luís I and Ribeira, Porto (54795128175)) | Dale Cruse | CC BY 4.0 | no camera coordinates; Commons category "Luiz I bridge from Jardim do Morro" (the Jardim do Morro is in Vila Nova de Gaia) | 2026-11-03 |
| img/v2/santo-tirso-ave-mosteiro-* | Santo Tirso card, hero | The Ave river and the Santo Tirso monastery | https://commons.wikimedia.org/w/index.php?curid=110739740 (Santo Tirso, Couto (Santa Cristina e São Miguel) e Burgães - Santo Tirso Monastery - 20190804153754) | Marta.i.sousa~ptwikiquote | CC BY-SA 4.0 | no camera coordinates; the title names the Santo Tirso monastery (Santo Tirso, Couto) | 2026-11-03 |
| img/v2/santo-tirso-rio-ave-* | Santo Tirso card, gallery | The Ave river through Santo Tirso | https://commons.wikimedia.org/w/index.php?curid=56484645 (Rio Ave, Santo Tirso - panoramio (1)) | Carlos Cunha | CC BY-SA 3.0 | camera point 41.34601, -8.47030 (Commons), inside Santo Tirso | 2026-11-03 |
| img/v2/santo-tirso-margens-do-ave-* | Santo Tirso card, gallery | The tree-lined banks of the Ave, Santo Tirso | https://commons.wikimedia.org/w/index.php?curid=56484687 (Santo Tirso - panoramio (5)) | Carlos Cunha | CC BY-SA 3.0 | camera point 41.35222, -8.47493 (Commons), inside Santo Tirso | 2026-11-03 |
| img/v2/valongo-rio-ferreira-ponte-* | Valongo card, hero | A stone bridge reflected in the Ferreira river, Valongo | https://commons.wikimedia.org/w/index.php?curid=78931207 (Rio Ferreira - Portugal (34837005213)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.18120, -8.47135 (Commons), inside Valongo | 2026-11-03 |
| img/v2/valongo-rio-ferreira-sobrado-* | Valongo card, gallery | The Ferreira river between vineyards, Sobrado, Valongo | https://commons.wikimedia.org/w/index.php?curid=78931241 (Rio Ferreira - Sobrado - Portugal (35285256283)) | Vitor Oliveira | CC BY-SA 2.0 | camera point 41.22235, -8.45542 (Commons), inside Valongo | 2026-11-03 |
| img/v2/valongo-ponte-ferreira-* | Valongo card, gallery | The Ponte Ferreira at Calvário, Valongo | https://commons.wikimedia.org/w/index.php?curid=78931417 (Rio Ferreira - Calvário - Portugal (35704123700)) | Vitor Oliveira | CC BY-SA 2.0 | no camera coordinates; the title names Calvário; Commons categories Valongo and Ponte Ferreira | 2026-11-03 |
| img/v2/trofa-acude-rio-ave-* | Trofa card, hero | The Ave river running over the weir, Trofa | https://commons.wikimedia.org/w/index.php?curid=60653028 (Rio Ave, Trofa - panoramio (1)) | Carlos Cunha | CC BY-SA 3.0 | camera point 41.34686, -8.55257 (Commons), inside Trofa | 2026-11-03 |
| img/v2/trofa-rio-ave-* | Trofa card, gallery | The Ave river between wooded banks, Trofa | https://commons.wikimedia.org/w/index.php?curid=60653020 (Rio Ave, Trofa - panoramio) | Carlos Cunha | CC BY-SA 3.0 | camera point 41.34686, -8.55257 (Commons), inside Trofa | 2026-11-03 |
| img/v2/trofa-passadico-do-ave-* | Trofa card, gallery | The boardwalk along the Ave river, Trofa | https://commons.wikimedia.org/w/index.php?curid=60653044 (Rio Ave, Trofa - panoramio (4)) | Carlos Cunha | CC BY-SA 3.0 | camera point 41.34418, -8.56075 (Commons), inside Trofa | 2026-11-03 |
| img/v2/centro-ria-de-aveiro-por-do-sol-* | Centro region card, region postcard and region card | The Ria de Aveiro at sunset, Ponte da Varela, Murtosa | https://commons.wikimedia.org/w/index.php?curid=78635083 (Sunset, Ponte da Varela, Murtosa) | VetK2O3 | CC BY-SA 4.0 | no camera coordinates; the title names Ponte da Varela, Murtosa (Região de Aveiro, Centro) | 2026-11-03 |
| img/v2/acores-sete-cidades-vista-do-rei-* | Açores region card, region postcard and region card | Lagoa das Sete Cidades from the Vista do Rei viewpoint, São Miguel | https://commons.wikimedia.org/w/index.php?curid=8055587 (Lagoa das Sete Cidades, Miradouro da vista do Rei, Sete Cidades, Ponta Delgada, ilha de São Miguel, Açores) | José Luís Ávila Silveira/Pedro Noronha e Costa | Public domain | no camera coordinates; the title names the Miradouro da Vista do Rei, Sete Cidades, Ponta Delgada (São Miguel, Açores) | 2026-11-03 |
