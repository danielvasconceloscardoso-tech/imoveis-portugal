# Prompt 80: can we compute "buildable potential" for any point in Portugal?

Scope: data sources, licences, extraction effort, a Gondomar test, and what a first version needs.
Method: WebSearch only. In this session WebFetch could not reach any host (diariodarepublica.pt, cm-gondomar.pt, dados.gov.pt, dgterritorio.github.io, score.litehaus.co all failed to resolve in the sandbox), so every fact below comes from search-result snippets of the linked pages. No browser, no curl, no GetCapabilities call, no scripted request to any government server. Anything not seen in a snippet is marked UNCONFIRMED.

## Verdict in five lines

1. **Zoning class for any point in mainland Portugal: yes, from open data.** DGT's CRUS (Carta do Regime de Uso do Solo) is a harmonised national layer built from every PDM's ordenamento map, CC BY 4.0, served per municipality through DGT's OGC API (pygeoapi) [S1][S2][S3].
2. **Constraints: mostly yes, but scattered.** REN has WMS/WFS from DGT; Natura 2000 has shapefile/WMS/WFS from ICNF; heritage has an ArcGIS REST service from Património Cultural; flood zones and coastal programmes are mainly PDF/viewer. RAN has no national open service that I found [S10][S11][S12][S13][S14].
3. **Building index and max height/floors: no national dataset exists.** They sit only in each PDM's regulation text (PDF in Diário da República), so they have to be extracted municipality by municipality. Feasible with an LLM and a human check. Roughly 1 to 2 days per municipality for the main urban classes (estimate).
4. **Plot geometry: partial.** About 125 mainland municipalities have cadastro (geometric/predial). The other ~153 rely on BUPi, about 43% of matrices identified (Sept 2026). BUPi's public map shows polygons, but there is no confirmed open bulk download of plot geometry [S15][S16][S17][S18].
5. **A competitor already sells this for Portugal.** Litehaus (score.litehaus.co) publishes per-municipality "Índices PDM" pages, Gondomar included, and sells a 29 € "what can I build" report [S27][S28]. Sitescope (Warsaw) is not alone.

## 1. Sources, one by one

| Source | What it contains | Coverage | Format / API | Licence | Notes |
|---|---|---|---|---|---|
| **PDM ordenamento + condicionantes maps** (via DGT SNIT) | Planta de Ordenamento (soil class/category), Plantas de Condicionantes (REN, RAN, Natura, easements), limit of the plan | 308 PDM registered as geodatasets in SNIG (Dec 2025) [S4] | Per-municipality WMS at `servicos.dgterritorio.pt/sdisnitWMSPDM1_<code>/wmservice.aspx` (examples: Gouveia, Ansião, Estarreja, with layers such as `Planta_de_Ordenamento`, `Planta_de_Condicionantes_-_2_1_-_REN`) [S5]. SNIT network services historically WMS 1.3.0 and WFS 2.0.0 [S6] | Free to view through SNIG [S5]. Reuse licence per service UNCONFIRMED | Raster-style WMS for many plans: good for display, not for attribute query. Vector depends on the municipality |
| **PDM regulation text** | Articles per soil category: uses, índice de utilização/edificabilidade, altura da fachada, pisos, impermeabilização, exceptions | All 308 | PDF in Diário da República 2.ª série (aviso). Municipal sites usually host a consolidated PDF | Official acts. Text of legislation is not protected by copyright in PT (UNCONFIRMED for consolidated municipal PDFs) | See section 3 |
| **CRUS** (DGT) | Harmonised soil classification/qualification extracted from the ordenamento, zonamento and implantação maps of PMOT in force: designation, category, municipality, area | All mainland municipalities. In 2014 every one except Lagos [S7]. National dataset plus per-municipality datasets on dados.gov.pt [S1][S8] | OGC API Features: collections `crus_<municipio>` (e.g. `crus_moncao`, `crus_crato`, `crus_trofa`) on `ogcapi.dgterritorio.gov.pt` [S2]. Also downloads on dados.gov.pt | **CC BY 4.0** on the national and the municipal listings [S8][S1] | dados.gov.pt listing last updated 21 Sep 2023 [S8], so it may lag recent PDM changes. Categories follow DR 11/2009 or DR 15/2015 depending on the plan [S8]. No indices, no heights |
| **COS** (land cover 2018, 2023) | Land use/cover, not zoning | Mainland | OGC API collections `cos2018v3`, `cos2023v1`. Large collections need a bbox or CQL filter [S9] | COS2018 on INSPIRE: CC BY 4.0 [S7b]. COS2023 licence UNCONFIRMED. A third-party aggregator lists CC BY-NC (2018, unreliable) [S9b] | Context only ("is it built up?"). Never a legal answer |
| **Planos de Urbanização / Pormenor** | Finer zoning, sometimes a plot-level implantação with ABC per lot | 217 PU and 864 PP registered as geodatasets in SNIG (Dec 2025). Most municipalities have none or few [S4] | SNIT WMS like the PDM. Regulation in DR (PDF) | As above | Where a PP exists it **prevails** at plot level. A v1 must at least flag "a PU/PP applies here" |
| **REN** | Ecological reserve delimitation per municipality | All mainland municipalities with a REN in force | SNIT geoportal (SRUP tab) with the in-force and historic charts; national WMS; WFS per CCDR region (DGT advises the regional WFS because the national one is heavy) [S10] | Open via SNIG (exact licence UNCONFIRMED) | Strong constraint (DL 166/2008 regime) |
| **RAN** | Agricultural reserve | Mainland | No DGADR national WMS/WFS found. RAN usually comes inside each PDM's condicionantes map [S10] | UNCONFIRMED | Gap: use the PDM condicionantes layer |
| **Natura 2000 (ICNF)** | ZPE, ZEC/SIC, habitats | Mainland | Shapefile download, WMS and WFS on `si.icnf.pt`, listed in the ICNF geoCatálogo [S11] | Not stated in snippets: UNCONFIRMED | Endpoints listed as http. Metadata revision 2018 for ZPE |
| **Coast (POC)** | Coastal programmes (e.g. POC Caminha-Espinho, RCM 111/2021, 451 km², 122 km of coast, 9 municipalities, territorial model at 1:10,000) [S12] | Coastal municipalities only | Mostly PDF reports and sheets on APA/SNIAmb. POC norms are transposed into PDMs by amendment [S12] | UNCONFIRMED | Not relevant to Gondomar (inland) |
| **Heritage (Património Cultural, ex-DGPC)** | Classified and in-classification monuments, sets, sites, general and special protection zones | Mainland | ArcGIS REST MapServer `geo.patrimoniocultural.gov.pt/.../Atlas_Patrimonio_2024_Servicos/MapServer` [S13]. WMS not confirmed | UNCONFIRMED | A protection zone means a binding opinion from the heritage authority |
| **Flood zones (APA)** | Flood hazard/risk maps for 63 ARPSI (PGRI) plus PGRH flood-zone charts [S14] | ARPSI only, not national | Geoportal viewer; dados.gov.pt metadata entries. No WMS URL found [S14] | UNCONFIRMED | Municipal "zonas inundáveis" also sit in PDM condicionantes |
| **Cadastro predial / CGPR (DGT)** | Official plot geometry | 118 mainland municipalities from CGPR plus 7 from the experimental cadastre = 125 [S15] | DGT visualizador. OGC API collection `cadastro`, bbox required [S9][S2] | Open data per DGT pages (exact terms UNCONFIRMED) | Mostly south and interior. DL 72/2023 converted CGPR to cadastro predial [S15] |
| **BUPi / simplified cadastre** | Georeferenced graphic representations (RGG) of rustic and mixed plots, submitted by owners | 153 mainland municipalities without cadastre, 144 joined (older page) [S15]. Sept 2026: 3,633,783 matrices identified (43%) out of 8,451,367, i.e. 1,805,117 ha of 3,947,349 ha [S16]. April 2026: 42% [S17] | Public map viewer and GeoPortal showing polygons. Open data on dados.gov.pt = aggregate indicators (number of RGG, adhesion), not geometry [S18] | Geometry viewable, bulk reuse not offered (UNCONFIRMED) | Rustic land only, so urban plots are largely absent. Free registration ended 30 Sep 2026 (DL 87/2026), then 15 € per RGG [S16] |
| **Caderneta predial (AT)** | Tax record: articles, areas, VPT, owner | National | Owner or representative only, through Portal das Finanças | **Not public** | Never ask users to upload it into a public tool (personal data) |
| **dados.gov.pt** | Harvests SNIG: CRUS per municipality, some municipal PDM layers (e.g. "Estrutura Ecológica Municipal", "UOPG") [S19] | Uneven | Files plus links | Mostly CC BY 4.0 on DGT items [S8] | Good discovery index, not a service |
| **Municipal SIG portals** | Some municipalities publish vector PDM (Ovar: free shapefile download of the plans in force [S5]; Almada WebSIG, São Brás geoportal [S19]) | Patchy, municipality by municipality | ArcGIS Hub, QGIS server, custom viewers | Per municipality | Gondomar: no public SIG/WebSIG found in search results (UNCONFIRMED) |

### Legal background that changes the data (2023 to 2026)

- **Soil classification deadline.** RJIGT (DL 80/2015) removed the "solo urbanizável" category. Municipalities had to adapt PDMs to the new classification rules by 31 Dec 2024. DL 117/2024 did not extend the deadline, so norms on urbanisable land are automatically suspended where a PDM was not adapted (art. 199.º). Later exceptions were introduced [S20][S21]. Earlier count: of 278 mainland municipalities, 84 had finished and 180 were in progress [S22]. **Consequence:** a zoning class read from an older map can be legally suspended, and CRUS does not show that.
- **DL 117/2024, art. 72.º-B.** Special reclassification of rustic land to urban land for housing through a simplified PDM amendment: at least 20 days of public discussion, at least 700/1000 of above-ground floor area for public or moderate-value housing, and a 5-year execution deadline. It was amended by Lei 53-A/2025 after parliamentary review [S20][S23]. **Consequence:** zoning can change by a simple amendment, so a v1 needs a "last checked" date per municipality.
- **DR 15/2015** sets the soil categories (rústico/urbano and their qualification). **DR 5/2019** fixes mandatory technical concepts (altura da fachada, índices), which helps normalise extracted values across PDMs [S24].
- **Simplex Urbanístico (DL 10/2024).** A favourable PIP is now valid 2 years, extendable by 1 (RJUE art. 17.º); a PIP under art. 14.º n.º 2 can exempt later works from prior control [S25]. DL 108/2026 (29 May 2026) revised parts of it again; details UNCONFIRMED [S25b].

## 2. Can it be computed "for any point in Portugal"?

| Output | Mainland | Azores/Madeira | How |
|---|---|---|---|
| Soil class + category (urbano/rústico, e.g. "Espaços residenciais") | Yes (CRUS, open) | No CRUS seen. Regional IDEs (IDEA Azores, iRIG Madeira) publish their own PDM records [S5b] | Point-in-polygon on CRUS |
| PDM subcategory (e.g. "Tipo I" vs "Tipo II") | Only where the municipal vector or WMS carries it. CRUS may flatten it (UNCONFIRMED per municipality) | Same | SNIT WMS GetFeatureInfo or municipal vector |
| Constraints (REN, Natura, heritage zone, flood) | REN, Natura, heritage: yes. Flood: ARPSI only. RAN: via the PDM | Partial | Several services |
| Índice, max height/floors | **No dataset.** Extraction from PDF per municipality | Same | LLM plus human check |
| Plot outline and area | 125 municipalities with cadastre, plus BUPi rustic polygons for view only | Partial | User draws the plot or enters the area as the honest fallback |
| PP/PU override | Flag yes (SNIT). Content: PDF | Same | Overlay of the plan limit |

Answer: **"zoning class + main constraints for any mainland point" is doable with open data; "buildable m² for any point" is not, without per-municipality regulation extraction and a plot area supplied by the user.** Nationwide extraction for 278 mainland municipalities is roughly 300 to 550 person-days (estimate), plus upkeep for every PDM amendment.

## 3. How hard is extracting indices from PDM regulations?

Structure of a typical post-2015 PDM regulation (Gondomar is representative):
- Title/chapter on **solo urbano**, one section per category (Espaços centrais, Espaços residenciais, Espaços urbanos de baixa densidade, Atividades económicas, Equipamentos, Verdes), each with 2 to 4 articles: *identificação e usos*, then *regime de edificabilidade* [S26].
- Parameters are written in prose, not tables, with conditional logic: "where there is a consolidated urban frontage, follow the dominant façade height; otherwise Iu ≤ 1.4" [S26]. Some PDMs add an annex table (e.g. Braga, Pombal regulations seen in results).
- Cross-references: definitions in DR 5/2019, exceptions in general articles (estacionamento, cedências), UOPG articles, and transitional articles.

Feasibility:
- An LLM can produce a structured row per category (Iu or Ie, max façade height, pisos, impermeabilização, minimum plot, allowed uses, article reference, exception text) with high recall on prose like the Gondomar text. **The human check is non-negotiable**: conditional clauses ("salvo…", "na ausência de frente urbana consolidada") decide the answer, and Litehaus's own Gondomar page shows several "não determinado"/"DESCONHECIDO" cells, which is a sign of how often automatic extraction fails [S27].
- Effort (estimate): around 0.5 day to extract and check the 4 to 6 main urban classes of one PDM, 1 to 2 days with rustic classes and exceptions, and 0.5 day per amendment.
- Sources of error: amendments not consolidated (always read the latest republication), PP/PU overrides, suspended zones (preventive measures), and the 31 Dec 2024 suspension of urbanisable-land norms.

## 4. Gondomar test (Porto district)

### Plan in force
- **Original PDM:** ratified by RCM 48/95 [S29].
- **1st revision:** final version approved by the Assembleia Municipal and published as **Aviso n.º 13057/2015**, DR 2.ª série n.º 219, 9 Nov 2015, in force the next day, with Regulamento, Planta de Ordenamento and Planta de Condicionantes [S30][S31]. Public discussion had opened with Aviso n.º 5283-A/2015 (14 May 2015) [S32]. Linked REN delimitation: Portaria 230/2015 [S29b].
- **1st alteration (with republication of the regulation):** **Aviso n.º 3337/2018**, DR 2.ª série n.º 51, 13 Mar 2018, approved by the Assembleia Municipal on 28 Dec 2017 [S33][S26]. **This is the current consolidated text found.**
- **Partial suspensions with preventive measures (2023):** Aviso n.º 6915/2023 (3 Apr 2023, area next to the LIPOR organic recovery plant) and **Aviso n.º 13612/2023**, DR 2.ª série n.º 137, 17 Jul 2023 (area next to the HE-UFP hospital in the UF Gondomar (S. Cosme), Valbom e Jovim). Both lapse when the 2nd revision enters into force [S34][S35].
- **2nd revision:** in progress. Procedure restarted by a notice of 30 Jun 2022 after an extension in 2021; participation process "Gondomar Participa" [S36]. No public discussion or approval found for 2025 or 2026 (UNCONFIRMED). **No later alteration was found between 2018 and 2026 (UNCONFIRMED: a direct DRE search is still needed).**

### Zoning map service / data
- **SNIT WMS:** follows the pattern `https://servicos.dgterritorio.pt/sdisnitWMSPDM1_<DICO>_<id>_<n>/wmservice.aspx?request=GetCapabilities&Service=WMS` [S5]. Gondomar's DICO is 1304 [S37], but the `<id>` part for Gondomar was not found, so the exact URL is UNCONFIRMED. **Not called.**
- **CRUS via OGC API:** by the naming pattern of the other municipalities [S2], the expected collection is `https://ogcapi.dgterritorio.gov.pt/collections/crus_gondomar/items?bbox=...`. This is an inference: no search result showed `crus_gondomar` (UNCONFIRMED). **Not called.**
- **Municipal SIG:** none found for Gondomar. The plans are published as PDFs on cm-gondomar.pt (2015 aviso, 2018 republication) [S31][S26].

### Building parameters for the main urban classes (Aviso 3337/2018 republication)

| Category | Parameter (no consolidated urban frontage) | Article | Source quality |
|---|---|---|---|
| Espaços centrais | Iu max **1.4**; impermeabilização max 80%; otherwise the façade height of the frontage applies | **Art. 52.º n.º 1 b) i)** | Value seen in the official PDF snippet; article number from the Litehaus index citing Aviso 3337/2018 [S26][S27] |
| Espaços residenciais, Tipo I | Iu max **1.1**; altura da fachada ≤ **16 m or 4 pisos**, unless the frontage sets another height | Art. 54.º or 55.º (UNCONFIRMED; art. 53.º = identification and uses) | Text seen in the official PDF snippet [S26]; article mapping from Litehaus [S27] |
| Espaços residenciais, Tipo II | Iu max **0.8**; altura da fachada ≤ **12 m or 3 pisos** | Art. 54.º or 55.º (UNCONFIRMED) | Official PDF snippet [S26]; also repeated in a Supercasa listing [S38] |
| Espaços urbanos de baixa densidade | Iu **0.6**; façade 7 m; at most 2 dwellings per residential building; impermeabilização ≤ 40% | UNCONFIRMED (art. 55.º or later) | **Secondary only** (Supercasa listing). Must be checked against the DR text [S38] |

The exact article text must still be read in the DR PDF. It was not reachable from this session.

### Constraints for Gondomar
- REN: Portaria 230/2015 delimitation, tied to the PDM revision [S29b]; on SNIT/SRUP [S10].
- RAN, Natura 2000, flood zones on the Douro, heritage: available through the services above. Gondomar-specific overlaps were not verified (UNCONFIRMED).
- Two 2023 preventive-measure areas (above) override the PDM where they apply: a v1 must show them.

## 5. What a first version needs (one municipality: click a point → zoning class + constraints + links)

**Scope (Gondomar or any municipality with a clean, recent PDM):**
1. Click a point → soil class and category (CRUS, CC BY 4.0) plus PDM subcategory where the municipal map carries it.
2. Constraint flags: REN, RAN (from the PDM condicionantes), Natura 2000, heritage protection zone, flood zone where mapped, PP/PU in force, preventive measures/suspension areas.
3. For the category: the extracted parameters (Iu, façade height/pisos, impermeabilização) with **the article number and a link to the DR aviso and the municipal PDF**, plus the date checked.
4. Optional: the user enters the plot area → "indicative maximum gross floor area = area × Iu", labelled as indicative.

**Data and build (estimates):**

| Item | Days |
|---|---|
| Pull CRUS for the municipality from the OGC API (one manual download, cached as static GeoJSON/PMTiles; no live calls to government servers from the site) | 0.5 |
| REN, Natura and heritage layers clipped to the municipality, cached | 1 |
| PDM condicionantes/subcategory: vector from the municipality, or a request to it; otherwise WMS display only | 1 to 2 (plus waiting time for the municipality) |
| Regulation extraction (LLM) + human check by the reviewer + article links | 1 to 2 |
| Map UI (MapLibre, static tiles on Cloudflare Pages) + click panel + disclaimer | 2 |
| Legal/wording review | 0.5 |
| **Total** | **about 6 to 8 days for one municipality**; then about 1.5 to 3 days per extra municipality |

**Licence risks:**
- CRUS and most DGT data: CC BY 4.0 → attribution "© DGT" required; fine for commercial use [S8].
- ICNF, Património Cultural, APA: reuse terms not confirmed. Check each before publishing tiles derived from them (UNCONFIRMED).
- BUPi geometry: view-only public map. **Do not scrape or republish** plot polygons. Cadastre polygons from DGT only if the open-data terms are confirmed.
- PDM text: quoting articles with a link is low risk. Republishing municipal PDFs: link instead.
- No personal data: never store owner names, NIF, caderneta content or matrix numbers tied to a person.
- Do not run scripted harvests against government servers (rule from the brief). Download once, by hand, and cache.

**Legal wording (describe, never advise), proposed panel footer:**
> "Information taken from public planning documents (PDM de Gondomar, Aviso n.º 3337/2018, and the DGT Carta do Regime de Uso do Solo, checked on [date]). It describes what these documents say for the point you selected. It is not an assessment of any specific plot, and it does not replace a Pedido de Informação Prévia (RJUE art. 14.º) or a certidão from the Câmara Municipal, which are the only documents that bind the municipality. Plans change: confirm with the Câmara Municipal and a licensed professional before any decision. Buyer questions go to our partner agency."

Also: never show "you can build X m²" as a fact. Show "PDM parameter for this category: Iu max 1.1 (art. …)". Show PP/PU, suspension and preventive-measure flags first. Show the "last checked" date.

**Business read (for the CEO, not decided here):** a one-municipality map is a strong content and SEO asset ("what can be built in Gondomar") and a lead source for the partner agency, but Litehaus already covers this with a paid report [S28]. Nationwide coverage is a data-maintenance business (300+ days plus upkeep), which works against the low-touch north star (D76). A business decision for the CEO.

## Sources

- [S1] dados.gov.pt, Carta do Regime de Uso do Solo – Portugal Continental: https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-portugal-continental-1
- [S2] DGT OGC API collections (examples): https://ogcapi.dgterritorio.gov.pt/collections?f=html ; https://ogcapi.dgterritorio.gov.pt/collections/crus_moncao/items/36275?f=html ; https://ogcapi.dgterritorio.gov.pt/collections/crus_trofa/items/151774?f=html ; https://ogcapi.dgterritorio.gov.pt/collections/crus_crato/items/12122
- [S3] DGT OGC API user manual: https://dgterritorio.github.io/ogcapi-user/pdf/document.pdf ; DGT OGC API platform (JIIDE 2025): https://www.idee.es/resources/presentaciones/JIIDE25/Resumenes/92.pdf ; pygeoapi FOSS4G 2025: https://pygeoapi.io/presentations/foss4g2025
- [S4] DGT/SNIG PoInT presentation to COSNIG, 17 Dec 2025 (308 PDM, 217 PU, 864 PP): https://snig.dgterritorio.gov.pt/sites/default/files/documentos/899/2025-12-17_PoInT_apresentacao_COSNIG.pdf
- [S5] SNIT PDM WMS examples: http://servicos.dgterritorio.pt/sdisnitWMSPDM1_0906_132_1/wmservice.aspx?request=GetCapabilities&Service=WMS ; https://servicos.dgterritorio.pt/sdisnitWMSPDM1_0108_2674_2/wmservice.aspx?request=GetCapabilities&Service=WMS ; DGT WMS guide 2019: https://www.dgterritorio.gov.pt/sites/default/files/documentos-publicos/Guia_de_apoio_utilizacao_servicos_WMS_GeoMedia2019.pdf ; DGT PDM data model: https://www.dgterritorio.gov.pt/sites/default/files/publicacoes/Modelodados_PDM_18022021_Vol1_e_Vol2.pdf
- [S5b] Azores IDE PDM record example: https://sma.idea.azores.gov.pt/geonetwork/srv/api/records/a59d39db-5835-4116-b934-2e2fe3a8454b
- [S6] SNIT presentation, JIIDE 2014: https://www.idee.es/resources/presentaciones/JIIDE14/20141107/Workshop_6_SNIT.pdf
- [S7] CRUS paper, JIIDE 2014: https://www.idee.es/resources/presentaciones/JIIDE14/20141107/CRUS.pdf
- [S7b] INSPIRE record (COS2018, CC BY 4.0): https://inspire-geoportal.ec.europa.eu/srv/api/records/b498e89c-1093-4793-ad22-63516062891b
- [S8] dados.gov.pt municipal CRUS listings (CC BY 4.0, updated 21 Sep 2023), e.g. https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-gois-1 ; https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-coruche-1 ; https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-alcacer-do-sal-1
- [S9] geopt R package docs (collection IDs, bbox/CQL1 notes): https://cran.case.edu/web/packages/geopt/refman/geopt.html ; https://cran.r-universe.dev/geopt/doc/downloading-data.html
- [S9b] Third-party catalogue of DGT data (CC BY-NC claim): https://dataportal.ponderful.eu/dataset/9f11a8f6-6f50-4967-99fd-b7baff77a16a ; DGT open-data page: https://www.dgterritorio.gov.pt/dados-abertos ; DGT CDG page: https://www.dgterritorio.gov.pt/conjuntos-de-dados-geograficos-cdg
- [S10] REN on SNIT: https://snit-sgt.dgterritorio.gov.pt/ren ; https://cnt.dgterritorio.gov.pt/ren-vigor ; SNIG REN record: https://snig.dgterritorio.gov.pt/rndg/srv/api/records/ad95b02a-fbd2-4b8e-89b6-f699a9ff3c0d/formatters/snig-view ; DGT cadastre viewer (RAN simplified): https://www.dgterritorio.gov.pt/Novo-visualizador-de-cadastro-Medida-Simplex-2020-0
- [S11] ICNF geoCatálogo ZPE: https://geocatalogo.icnf.pt/metadados/zpe.html ; catalogue: https://geocatalogo.icnf.pt/catalogo.html ; SNIG ZEC record: https://snig.dgterritorio.gov.pt/rndg/srv/api/records/824af467-47ae-4ee4-9c20-093d1fca7c5c/formatters/snig-view
- [S12] RCM 111/2021 (POC Caminha-Espinho): https://vlex.pt/vid/resolucao-do-conselho-ministros-874195010 ; APA programme report: https://apambiente.pt/sites/default/files/_SNIAMB_Agua/DLPC/POC/POC_A-CE/2021-01-29_Relatorio_Programa_VF_compressed.pdf
- [S13] Património Cultural Atlas service: https://geo.patrimoniocultural.gov.pt/arcgis/rest/services/PatrimonioClassificadoEmViasClassificacao/Atlas_Patrimonio_2024_Servicos/MapServer
- [S14] APA note on PGRI/ARPSI maps (63 ARPSI): https://apambiente.pt/sites/default/files/_A_APA/Comunicacao/Media/NotasOCS2020/Nota_OCS_2020-64_Webconferencias_PGRI.pdf ; dados.gov.pt flood-zone chart: https://dados.gov.pt/en/datasets/pgrh-alentejo-rh6-parte-2-tomo-4b-carta-das-zonas-inundaveis/
- [S15] DGT cadastre FAQ / CGPR: https://www.dgterritorio.gov.pt/atividades/cadastro/perguntas-frequentes ; https://www.dgterritorio.gov.pt/atividades/cadastro/cadastro-geometrico-da-propriedade-rustica ; BUPi municipalities with cadastre: https://cadastropredial.bupi.gov.pt/ ; DL 72/2023: https://diariodarepublica.pt/dr/detalhe/decreto-lei/72-2023-220219335
- [S16] idealista, BUPi 2026 (43%, matrices, ha, DL 87/2026, fees): https://www.idealista.pt/news/financas/fiscalidade/2026/10/02/77978-bupi-novas-regras-para-identificar-e-regularizar-terrenos ; Government note: https://portugal.gov.pt/gc25/comunicacao/noticias/georreferenciacao-e-registo-dos-predios-rusticos-no-bupi-gratuitos-ate-setembro-de-2026
- [S17] Diário de Viseu, BUPi 42% (Apr 2026): https://www.diarioviseu.pt/2026/04/18/bupi-com-42-de-area-identificada/
- [S18] eBUPi public map: https://www.idealista.pt/news/node/69693 ; eBUPi GeoPortal: https://www.idealista.pt/news/node/74315 ; https://echoboomer.pt/ebupi-lanca-geoportal-centralizar-mapas-dados-portugal/
- [S19] dados.gov.pt municipal PDM layers, e.g. https://dados.gov.pt/en/datasets/estrutura-ecologica-municipal/ ; https://dados.gov.pt/en/datasets/uopg-ordenamento-2012
- [S20] DL 117/2024: https://diariodarepublica.pt/dr/detalhe/decreto-lei/117-2024-901535572 ; Macedo Vitorino analysis: https://www.macedovitorino.com/conhecimento/insights/O-Regime-Especial-de-Reclassificacao-de-Solos-Rusticos-em-Urbanos-para-Habitacao/6629/
- [S21] Ordem dos Arquitectos, critical analysis of RJIGT changes: https://ordemdosarquitectos.org/backend/uploads/Alteracoes_RJIGT_Analise_Critica_OA_20250110_e145a8e171.pdf ; CM Silves note: https://www.cm-silves.pt/pt/noticias/31808/esclarecimento-publico-sobre-o-decreto-lei-n-1172024-de-30-de-dezembro-que-estabelece-mecanismo-de-reclassificacao-de-solos-rusticos-para-solos-urbanos.aspx
- [S22] PDM adaptation deadline extensions: https://eco.sapo.pt/2022/06/09/governo-da-mais-tempo-as-camaras-para-reverem-pdm/ ; https://portugal.gov.pt/gc23/comunicacao/comunicados/pdm-prolongado-prazo-para-a-inclusao-das-novas-regras-do-solo ; https://www.idealista.pt/news/node/65371
- [S23] DN, Parliament amends DL 117/2024: https://www.dn.pt/pol%C3%ADtica/parlamento-aprovou-altera%C3%A7%C3%B5es-ao-diploma-que-permite-construir-em-solos-r%C3%BAsticos
- [S24] DR 5/2019 text: https://www.madeira.gov.pt//Portals/51/OrdenamentoUrbanismo/Documentos/Legislacao/DR%20n%c2%ba5_2019%20de%2027%20de%20setembro.pdf ; DR 15/2015: https://informador.pt/legislacao/diploma/decreto-regulamentar-n-o-15-2015/
- [S25] Simplex Urbanístico (Ordem dos Arquitectos): https://ordemdosarquitectos.org/backend/uploads/Simplex_Urbanistico_78be4f0124.pdf ; ECO opinion: https://eco.sapo.pt/opiniao/simplex-urbanismo-e-ordenamento-do-territorio/ ; PLMJ: https://plmj.com/xms/files/Simplex_Urbanistico.pdf
- [S25b] DL 108/2026 (29 May 2026): https://ordemdosarquitectos.org/backend/uploads/DL_N_108_2026_29_MAIO_2786145a69.pdf ; Deloitte: https://www.deloitte.com/pt/pt/services/legal/blogs/publicacoes/simplex-urbanistico-2026.html
- [S26] PDM Gondomar, republication, DR 2.ª série n.º 51, 13 Mar 2018 (municipal PDF): https://www.cm-gondomar.pt/wp-content/uploads/2018/06/PDM_Gondomar_2018.pdf
- [S27] Litehaus, Índices PDM Gondomar: https://score.litehaus.co/land/pt/gondomar/indices-pdm ; https://score.litehaus.co/land/pt/gondomar
- [S28] Litehaus funding and product: https://eco.sapo.pt/2025/05/29/litehaus-levanta-15-milhoes-para-acelerar-construcao-de-casas/ ; https://www.idealista.pt/news/node/70017
- [S29] RCM 48/95 (original PDM Gondomar): https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/48-1995-502429
- [S29b] Portaria 230/2015 (REN Gondomar): https://diariodarepublica.pt/dr/detalhe/portaria/230-2015-69951098
- [S30] Aviso n.º 13057/2015 (DRE): https://diariodarepublica.pt/dr/detalhe/aviso/13057-2015-70948212 ; mirror: https://dre.tretas.org/dre/1965336/aviso-13057-2015-de-9-de-novembro
- [S31] Aviso 13057/2015 PDF on cm-gondomar.pt: https://www.cm-gondomar.pt/wp-content/uploads/2018/02/Aviso_13057_2015_PDM_Gondomar.pdf ; CM news: https://www.cm-gondomar.pt/novo-pdm-gondomar-publicado-diario-da-republica/
- [S32] Aviso 5283-A/2015 (DR 2.ª série n.º 93, 14 May 2015): https://files.diariodarepublica.pt/gratuitos/2s/2015/05/2S093A0000S01.pdf ; Relatório de ponderação: https://www.cm-gondomar.pt/wp-content/uploads/2018/02/G268-REL-Pondera_ao-R01.pdf
- [S33] Aviso n.º 3337/2018 (DRE): https://diariodarepublica.pt/dr/detalhe/aviso/3337-2018-114859410 ; CM news: https://www.cm-gondomar.pt/alteracao-ao-pdm-gondomar-publicada-diario-da-republica/
- [S34] Suspension, Aviso 13612/2023 (CM PDF): https://www.cm-gondomar.pt/wp-content/uploads/2023/07/2023.07.17-Aviso-DR-Suspensao-Parcial-do-Plano-Diretor-Municipal-de-Gondomar.pdf
- [S35] Suspension, April 2023 (CM PDF): https://www.cm-gondomar.pt/wp-content/uploads/2023/04/Publicacao-DR-03abril23.pdf
- [S36] CM Gondomar PDM page: https://www.cm-gondomar.pt/atividade-municipal/planeamento-e-ordenamento/plano-diretor-municipal/ ; revision restart: https://www.cm-gondomar.pt/camara-aprova-retoma-da-revisao-do-pdm/ ; Gondomar Participa: https://www.cm-gondomar.pt/eventos/gondomar-participa-revisao-do-pdm/
- [S37] ICNF PMDFCI Gondomar (DICO 1304 in path): https://fogos.icnf.pt/pmdfci/13_Porto/1304/2G/Caderno_I/Texto/PMDFCI_Gondomar_Caderno_I.pdf
- [S38] Supercasa Gondomar land listings quoting PDM parameters (secondary): https://supercasa.pt/zona/ramalde-(sao-cosme)/comprar-terrenos/gondomar/pagina-5 ; https://supercasa.pt/comprar-terrenos/gondomar/com-preco-min-450000,area-max-100000?ordem=preco-asc
