# Private developer demos v3 (prompt 29, D56, D57) · English only (D51) · not published

Unlisted pages on the branch preview, noindex, out of the sitemap and every menu. Nothing is sent before the operator's go (task 26a). The page opens with "How a buyer reaches you" in seven steps (a real screen and her line for each, the sample enquiry in full) and "Walk the path as this buyer" (demo mode, ?demo=<token>: a caption bar with Listen on each step; no form is ever sent, no cookie is set). The map sits lower, as "Where your homes sit". No audience numbers, no promises of leads, no testimonials; the buyer is illustrative and labelled.

| Developer | Buyer · voice | Demo page | Walk | Film files |
|---|---|---|---|---|
| Vanguard Properties · Tomás Ribeiro 79 (template) | New York · af_heart | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/search/?demo=34c86306cf | ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79.mp4 (clean), _captions.mp4, .vtt, _voice.mp3, _loop.mp4; frames/Vanguard_Tomas-Ribeiro-79/ |
| Vale do Lobo · The Residences | Los Angeles · af_heart | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/search/?demo=65bf930b11 | archive/v3/: ImoveisPortugal_Demo_ValeDoLobo_The-Residences.mp4 (clean), _captions.mp4, .vtt, _voice.mp3, _loop.mp4; frames/ValeDoLobo_The-Residences/ (v3, archived by prompt 31) |
| Shalu Investments · O'rizon Living | Tel Aviv · bf_emma | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/search/?demo=f658bd1eef | archive/v3/: ImoveisPortugal_Demo_Shalu_ORizon-Living.mp4 (clean), _captions.mp4, .vtt, _voice.mp3, _loop.mp4; frames/Shalu_ORizon-Living/ (v3, archived by prompt 31) |
| VIC Properties · Prata Riverside Village | Geneva · bf_emma | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/7c1e5a90d4/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/7c1e5a90d4/search/?demo=7c1e5a90d4 | archive/v3/: ImoveisPortugal_Demo_VIC_Prata-Riverside-Village.mp4 (clean), _captions.mp4, .vtt, _voice.mp3, _loop.mp4; frames/VIC_Prata-Riverside-Village/ (v3, archived by prompt 31) |

## The film (screenplay: content/demos/screenplay.json)

- One voice, the buyer thinking out loud at night; the picture answers each problem with the real site. Thirteen shots, 1080p, 60 fps, rendered frame by frame on the built site (site/scripts/demo-film.mjs); each shot holds until its line ends plus 0.6 s.
- Voice: Kokoro-82M (hexgrad, Apache 2.0, commercial use allowed) run with kokoro-onnx (thewh1teagle, MIT), model files from the GitHub release model-files-v1.0 (kokoro-v1.0.onnx, voices-v1.0.bin); lang en-gb, speed 0.9; voice af_heart (US demos) and bf_emma (Tel Aviv and Geneva). No name in her lines needs a respelling; the respelling table is in the screenplay for later use.
- Read-back check: every line is transcribed by Whisper base.en (OpenAI, MIT) through sherpa-onnx (k2-fsa, Apache 2.0) and re-rendered if it does not read back; all 40 lines pass (numbers read back as digits are compared in words). scripts/demos/voice.py.
- Mix: voice with a light high-pass and gentle compression at -16 LUFS integrated; sound effects synthesised in scripts/demos/sound.py (clock ticking and a low city hum in act 1, keystrokes, clicks). No music: pixabay.com cannot be reached from the build environment, so the films are voice only, as prompt 29 §2c allows (no synthesised pad).
- Captions: burned in for muted autoplay (Manrope, small, lower third, soft shadow, no box) and as a .vtt file.

## Pending on network access (task 29b)

pexels.com, pixabay.com and unsplash.com are refused by this environment's network policy, so these shots use designed stand-ins until the hosts are allowed, then the films re-render with one command:
- shot 1, the night skyline of the buyer's city and the laptop's glow on a hand: a dark plate lit only by a screen glow, with the city and time in type;
- shot 11, the laptop closing halfway: the same plate, the glow dimming;
- shot 12, the city in the morning: our licensed photographs where we have them (Lisbon, Alfama rooftops, Unsplash photo-1536663815808-535e2280d2c2; Porto, Ribeira with rabelo boats, Unsplash photo-1555881400-74d7acaacd8b); the Algarve has no photograph yet, so the Vale do Lobo film shows a plain morning plate with the type;
- the optional piano or string bed.

Rules followed: homes, prices and images only as each developer (or its own sales team) published them, credited, shown only in that developer's private preview until it signs; estate agencies that list a developer's homes are sources only, never shown (D9); every market figure is INE's with its period; the email in step 6 is "Sample enquiry · illustrative buyer"; "Launching 1 December 2026" closes the page and the film.

## Sources of every price and image

### Shalu Investments

**O'rizon Living** (gondomar), checked 2026-10-26. Images: O'rizon Living / Shalu Investments, via Essential Business.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| listing | T1 | 57.2 | 385 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-varanda-em-condominio-privado-com-vista-rio-ID1iBWD |
| listing | T1 | 59 | 390 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-varanda-no-orizon-living-ID1iRU5 |
| listing | T1 | 70 | 360 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-terraco-e-jardim-no-orizon-living-ID1iRrR |
| listing | T1 | 71 | 365 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-jardim-no-orizon-living-ID1iRwE |
| listing | T2 | 110 | 615 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t2-no-orizon-living-com-varanda-e-terraco-e-vistas-rio-ID1iRXF |
| listing | T2 | 118 | 670 000 € | https://www.imovirtual.com/pt/anuncio/t2-no-orizon-living-com-varanda-e-jardim-privativo-vistas-rio-ID1iMK3 |
| listing | T2 | 170 | 699 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t2-no-orizon-living-com-varanda-e-jardim-privativo-ID1iCJG |
| listing | T3 | 170 | 775 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t3-com-varanda-no-orizon-living-ID1iCKC |
| listing | T3 | 146 | 695 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t3-duplex-com-varanda-vistas-rio-e-cidade-do-porto-ID1iRVg |
| listing | T3 | 128 | 975 000 € | https://www.imovirtual.com/pt/anuncio/t3-em-condominio-privado-com-vistas-desafogadas-para-o-rio-douro-ID1if1I |
| listing | T4 | 199 | 1 090 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t4-no-orizon-living-com-varanda-vistas-rio-douro-ID1iSmG |
| listing | T4 | 337 | 1 350 000 € | https://www.imovirtual.com/pt/anuncio/t4-no-orizon-living-com-varandas-e-terraco-com-vistas-rio-douro-ID1iQ1o |

Pages and images: https://www.essential-business.pt/2025/10/03/shalu-invests-e100-million-in-luxury-porto-project/ · https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-jardim-no-orizon-living-ID1iRwE · https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-terraco-e-jardim-no-orizon-living-ID1iRrR · https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-varanda-em-condominio-privado-com-vista-rio-ID1iBWD · https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-varanda-no-orizon-living-ID1iRU5 · https://www.imovirtual.com/pt/anuncio/apartamento-t2-no-orizon-living-com-varanda-e-jardim-privativo-ID1iCJG · https://www.imovirtual.com/pt/anuncio/apartamento-t2-no-orizon-living-com-varanda-e-terraco-e-vistas-rio-ID1iRXF · https://www.imovirtual.com/pt/anuncio/apartamento-t3-com-varanda-no-orizon-living-ID1iCKC · https://www.imovirtual.com/pt/anuncio/apartamento-t3-duplex-com-varanda-vistas-rio-e-cidade-do-porto-ID1iRVg · https://www.imovirtual.com/pt/anuncio/apartamento-t4-no-orizon-living-com-varanda-vistas-rio-douro-ID1iSmG · https://www.imovirtual.com/pt/anuncio/t2-no-orizon-living-com-varanda-e-jardim-privativo-vistas-rio-ID1iMK3 · https://www.imovirtual.com/pt/anuncio/t3-em-condominio-privado-com-vistas-desafogadas-para-o-rio-douro-ID1if1I · https://www.imovirtual.com/pt/anuncio/t4-no-orizon-living-com-varandas-e-terraco-com-vistas-rio-douro-ID1iQ1o

### Vanguard Properties

**Tomás Ribeiro 79** (lisboa), checked 2026-10-26. Images: Vanguard Properties.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| TOM_1C | T2 | 109.77 | 1 650 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_2B | T3 | 189.34 | 2 490 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_2C | T3 | 179.9 | 2 400 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_3B | T3 | 191.54 | 2 540 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_3C | T3 | 179.9 | 2 450 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_4B | T3 | 189.34 | 2 570 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_5B | T3 | 191.54 | 2 625 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |
| TOM_6C | T3 | 179.9 | 2 570 000 € | https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/ |

Pages and images: https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ · https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/

**Muda** (grandola), checked 2026-10-26. Images: Vanguard Properties.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| MUDA 4.08 | Plot | 834.3 | 700 000 € | https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ |
| MUDA 4.04 | Plot | 1019.3 | 710 000 € | https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ |
| MUDA 4.05 | Plot | 1275.9 | 1 000 000 € | https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ |
| MUDA 4.01 | Plot | 2388 | 1 750 000 € | https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ |

Pages and images: https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/ · https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/

### Vale do Lobo

**The Residences Vale do Lobo** (loule), checked 2026-10-26. Images: Photo: Vale do Lobo Real Estate / valedolobo.com; Render: The Residences Vale do Lobo / valedolobo.com.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| SP45 | T2 | 125 | 1 480 000 € (from) | https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-two-bedroom-apartments/ |
| SP46 | T3 | 172 | 1 960 000 € (from) | https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-three-bedroom-apartments/ |
| SP47 | T4 | 237 | 2 840 000 € (from) | https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-four-bedroom-apartments/ |
| SP48 | T4 | 244 | 3 200 000 € (from) | https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-linked-villas/ |

Pages and images: https://www.valedolobo.com/en/real-estate/buy-a-property/exclusive-listing-unique-design-villa/ · https://www.valedolobo.com/en/real-estate/buy-a-property/linked-villa-with-golf-views/ · https://www.valedolobo.com/en/real-estate/buy-a-property/margarida-apartment-with-jacuzzi-2/ · https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-four-bedroom-apartments/ · https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-linked-villas/ · https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-three-bedroom-apartments/ · https://www.valedolobo.com/en/real-estate/buy-a-property/the-residences-two-bedroom-apartments/ · https://www.valedolobo.com/en/real-estate/buy-a-property/traditional-villa-with-golf-sea-view-2/ · https://www.valedolobo.com/en/the-residences-vale-do-lobo/

### VIC Properties

**Prata Riverside Village – Factory building** (lisboa), checked 2026-10-26. Images: © VIC Properties; © VIC Properties; photo Ricardo Oliveira Alves.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| Factory A4C | T0 | 48.4 | 500 000 € | https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-a-4c-ID1hytA |
| Factory B4A | T2 | 136.1 | 970 000 € | https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-b-4a-ID1gRs7 |
| Factory B4D | T2 | 184.2 | 1 125 000 € | https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-b-4d-ID1gRsa |
| Factory A1A | T3 | 202.6 | 1 300 000 € | https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-a-1a-ID1gRsu |
| Factory C6A | T2 | 260.4 | 1 480 000 € | https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-c-6a-ID1gRsh |

Pages and images: https://vic-properties.com/en/latest/more-than-600-families-have-already-chosen-prata-as-their-home/ · https://vic-properties.com/en/portfolio/prata-riverside-village/ · https://vic-properties.com/ultimas/casa-do-passadico-interiores-cria-projeto-de-decoracao-para-o-prata-riverside-village/ · https://vic-properties.com/ultimas/vic-properties-conclui-riverside-e-prepara-arranque-de-obras-de-mais-dois-edificios/ · https://vic-properties.com/ultimas/visao-de-renzo-piano-para-marvila-ja-e-uma-realidade-e-acelera-com-o-lancamento-do-edificio-south/ · https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-a-1a-ID1gRsu · https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-a-4c-ID1hytA · https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-b-4a-ID1gRs7 · https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-b-4d-ID1gRsa · https://www.imovirtual.com/pt/anuncio/edificio-factory-bloco-c-6a-ID1gRsh · https://www.imovirtual.com/pt/empreendimento/edificio-factory-ID1gRrG

**Prata Riverside Village – South building** (lisboa), checked 2026-10-26. Images: © VIC Properties; © VIC Properties; photo Ricardo Oliveira Alves.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| South B-5ºA | T2 | 151.5 | 1 040 000 € | https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-b-5a-ID1hyaD |
| South B-5ºB | T2 | 175.1 | 1 190 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t2-edificio-south-ID1fYOW |
| South C-4ºA | T3 | 193.4 | 1 510 000 € | https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-c-4a-ID1hyb9 |
| South C-2ºA | T3 | 252.8 | 1 610 000 € | https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-c-2a-ID1hyaM |
| South C-1ºA | T4 | 266.1 | 1 810 000 € | https://www.imovirtual.com/pt/anuncio/apartamento-t4-edificio-south-ID1fYOe |

Pages and images: https://vic-properties.com/en/latest/more-than-600-families-have-already-chosen-prata-as-their-home/ · https://vic-properties.com/en/portfolio/prata-riverside-village/ · https://vic-properties.com/ultimas/casa-do-passadico-interiores-cria-projeto-de-decoracao-para-o-prata-riverside-village/ · https://vic-properties.com/ultimas/vic-properties-conclui-riverside-e-prepara-arranque-de-obras-de-mais-dois-edificios/ · https://vic-properties.com/ultimas/visao-de-renzo-piano-para-marvila-ja-e-uma-realidade-e-acelera-com-o-lancamento-do-edificio-south/ · https://www.imovirtual.com/pt/anuncio/apartamento-t2-edificio-south-ID1fYOW · https://www.imovirtual.com/pt/anuncio/apartamento-t4-edificio-south-ID1fYOe · https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-b-5a-ID1hyaD · https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-c-2a-ID1hyaM · https://www.imovirtual.com/pt/anuncio/edificio-south-bloco-c-4a-ID1hyb9 · https://www.imovirtual.com/pt/empreendimento/edificio-south-ID1fYNU

**Six Senses Comporta** (grandola; Pinheirinho estate, Carvalhal), added by prompt 33 §7.1, checked 2026-10-27. Images: © VIC Properties (renders from the Six Senses Comporta gallery on vic-properties.com, PNG converted to JPG, stored as /d/7c1e5a90d4/img/six-senses-*-{800,1600}.webp). Pin: the Six Senses "How to get there" point on VIC's portfolio page (38.232432, -8.757925), inside Grândola on our municipal map.

| Home | Typology | Area m² | Price as published | Source |
|---|---|---|---|---|
| Sand | Sand Dune Villas | not published per residence | on request (collection from € 2.76 million) | https://vic-properties.com/en/latest/vic-properties-reveals-six-senses-residences-comporta/ |
| Forest | Forest Apartments and Villas | not published per residence | on request (collection from € 2.76 million) | https://vic-properties.com/en/latest/vic-properties-reveals-six-senses-residences-comporta/ |
| Lake | Lake Villas (14) | not published per residence | on request (collection from € 2.76 million) | https://vic-properties.com/en/latest/vic-properties-reveals-six-senses-residences-comporta/ |

Facts and where each is published (all checked 2026-10-27):
- 58 branded residences; 70-key hotel: https://vic-properties.com/en/portfolio/pinheirinho-comporta/ (counters "70 Key Hotel", "58 Branded Residences", "34 Hectares") and both press releases;
- two to five bedrooms; architect Michaelis Boyd: VIC press release EN, 26 May 2026, https://vic-properties.com/en/latest/vic-properties-reveals-six-senses-residences-comporta/ ; PT, https://vic-properties.com/ultimas/vic-properties-inicia-a-comercializacao-e-construcao-do-six-senses-comporta/ ; teaser brochure, https://vic-properties.com/wp-content/uploads/2026/05/Six-Senses-Comporta-Teaser-Brochure_EN.pdf (pp. 5 and 32: "two- to five-bedroom villas and apartments", "Architect & Interior Designer: Michaelis Boyd");
- 210 to 1,400 m²: PT press release ("Com áreas entre os 210 m² e os 1.400 m²"); the EN press release instead says "200 m² to 2,152 m² (2,153 to 23,164 square feet) of living space" (see open points);
- 18-hole golf course (designed by Jorge Santana da Silva): portfolio page ("18 Hole Golf Course") and both press releases;
- opening Q4 2028: EN press release ("The 70-key hotel, resort and 58 residences are scheduled to open in Q4 of 2028"); construction underway;
- from € 2.76 million: EN press release ("residences are now on sale and start at € 2.76 million"); no price per residence is published, so each residence shows "Price on request" and no cost total;
- collections Sand, Forest, Lake: EN press release; 14 Lake Villas and 44 Sand Dune and Forest residences: teaser brochure (pp. 17 and 34).

Pages and images: https://vic-properties.com/en/portfolio/pinheirinho-comporta/ · https://vic-properties.com/en/latest/vic-properties-reveals-six-senses-residences-comporta/ · https://vic-properties.com/ultimas/vic-properties-inicia-a-comercializacao-e-construcao-do-six-senses-comporta/ · https://vic-properties.com/wp-content/uploads/2026/05/Six-Senses-Comporta-Teaser-Brochure_EN.pdf · images https://vic-properties.com/wp-content/uploads/2026/03/Portfolio-SixSenses_G1_1.png (hero) and _G1_2, _G1_3, _G1_4, _G2_1, _G2_2, _G2_3, _G2_4, _G2_5 (.png, same folder)

## Open points (task 26a)

- O'rizon Living: no listing names Shalu; the developer link rests on the Essential Business article (3 Oct 2025). All current listings are ESSIA's, so the unit prices are agency asking prices and the area basis is not stated; only one image (the article's render, 1422 px) could be fetched, as the listing photo server is blocked here.
- Vanguard: Muda now publishes prices only for 15 building plots (the 8 Founders Collection villas are reserved, no price), so the film and page lead with Tomás Ribeiro 79 in Lisbon; Muda is placed in Grândola (OpenStreetMap hamlet "Muda"), which replaces the earlier Alcácer do Sal guess.
- Vale do Lobo: The Residences publishes "from" prices and areas per unit type only; delivery not published.
- VIC: prices come from VIC's own sales arm (VIC Mediação) on Imovirtual; vic-properties.com publishes none; no unit photos (listing image server blocked), so the project images are VIC's own.
- VIC, Six Senses Comporta: VIC's two press releases of 26 May 2026 disagree on sizes (PT 210 to 1,400 m², EN 200 to 2,152 m² of living space); the page follows the PT figure given in prompt 33. Ask VIC which is current before sending. sixsenses.com and pinheirinhocomporta.com (VIC's sales site) are refused by this environment's network policy, so nothing was checked there. The published "from € 2.76 million" is above the Geneva buyer's CHF 2 million (about € 2.17 million), which matters for film v4 (§7.2).
- OneMark stays in the pipeline until its first project is public.
- Approve the four demos before any link, film or PDF is sent.
