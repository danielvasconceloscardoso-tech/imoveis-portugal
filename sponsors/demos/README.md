# Private developer demos v2 (prompt 28, D53, D54) · English only (D51) · not published

Unlisted pages on the branch preview, noindex (meta and X-Robots-Tag), out of the sitemap and every menu. Nothing is sent before the operator's go (task 26a).

| Developer | Buyer in the film | Demo page | Showcase | Film (1080p, 30 fps, silent) | Loop (6 s) | One-page PDF |
|---|---|---|---|---|---|---|
| Shalu Investments · O'rizon Living (Gondomar) | A couple in Tel Aviv · ₪3,000,000 | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/homes/ | ImoveisPortugal_Demo_Shalu_ORizon-Living.mp4 | ImoveisPortugal_Demo_Shalu_ORizon-Living_loop.mp4 | ImoveisPortugal_Demo_Shalu_ORizon-Living.pdf |
| Vanguard Properties · Tomás Ribeiro 79 (Lisbon), Muda plots (Grândola) | A family in New York · $3,500,000 | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/homes/ | ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79.mp4 | ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79_loop.mp4 | ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79.pdf |
| Vale do Lobo · The Residences (Loulé) | A family in California · $4,000,000 | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/homes/ | ImoveisPortugal_Demo_ValeDoLobo_The-Residences.mp4 | ImoveisPortugal_Demo_ValeDoLobo_The-Residences_loop.mp4 | ImoveisPortugal_Demo_ValeDoLobo_The-Residences.pdf |
| VIC Properties · Prata Riverside Village (Lisbon), replaces OneMark | A family in Geneva · CHF 2,000,000 | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/7c1e5a90d4/ | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/7c1e5a90d4/homes/ | ImoveisPortugal_Demo_VIC_Prata-Riverside-Village.mp4 | ImoveisPortugal_Demo_VIC_Prata-Riverside-Village_loop.mp4 | ImoveisPortugal_Demo_VIC_Prata-Riverside-Village.pdf |

Film storyboard (prompt 28 §3): wordmark on black, Portugal in 3D, the concierge line and the budget writing itself, the municipality rising with three INE numbers, their showcase, one home with its cost and "Arrange a private viewing", then (§2b) the buyer's team assembling and the developer's view of the enquiry as a qualified summary, their own website, the final card. Words appear only as typographic cards (no subtitle box), no pointer, menus or scrollbars; rendered frame by frame (site/scripts/demo-film.mjs) so the camera and scrolls are smooth. No music: silence, so no track licence to record.

How they are built: content/developers/projects.json (each developer's homes, prices and images as published, with the URL of every item and the date checked; scripts/developers/import.py), site/src/lib/demos.ts (buyer, readers, home filmed), site/src/pages/d/[token]/ (page, showcase, homes, one-pager, film data), site/scripts/demo-film.mjs and demo-pdf.mjs (run with the built site served on port 4326).

Rules followed: homes, prices, areas, delivery and images only as each developer (or its own sales team) published them, credited, shown only in that developer's private preview until it signs (partner=false); estate agencies that list a developer's homes are kept as sources only and never shown (D9: O'rizon's listings are by ESSIA, whose listing codes are hidden); Vale do Lobo's resale homes of third-party owners are left out (not the developer's homes); every market figure is INE's with its period; the buyer, the monthly figures and the enquiry are marked "Illustrative example".

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

## Open points (task 26a)

- O'rizon Living: no listing names Shalu; the developer link rests on the Essential Business article (3 Oct 2025). All current listings are ESSIA's, so the unit prices are agency asking prices and the area basis is not stated; only one image (the article's render, 1422 px) could be fetched, as the listing photo server is blocked here.
- Vanguard: Muda now publishes prices only for 15 building plots (the 8 Founders Collection villas are reserved, no price), so the film and page lead with Tomás Ribeiro 79 in Lisbon; Muda is placed in Grândola (OpenStreetMap hamlet "Muda"), which replaces the earlier Alcácer do Sal guess.
- Vale do Lobo: The Residences publishes "from" prices and areas per unit type only; delivery not published.
- VIC: prices come from VIC's own sales arm (VIC Mediação) on Imovirtual; vic-properties.com publishes none; no unit photos (listing image server blocked), so the project images are VIC's own.
- OneMark stays in the pipeline until its first project is public.
- Approve the four demos before any link, film or PDF is sent.
