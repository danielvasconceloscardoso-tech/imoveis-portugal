# Prompt 48: every logo we can legitimately show, and how fast

CEO, 1 Nov 2026, 21:30. Developers have told us that visible backing (embassies, business associations, professional orders, Portuguese and EU funds) would raise our credibility a lot. Map every body whose mark, badge, listing or status we could show honestly, rank by weeks to a logo on the site, prepare each application so the operator only signs, and build the mechanism on the site that shows a logo only when a consent or an approval exists. Most routes need the Lda (task 47a) first; say so in each row. Nothing is sent or applied for by you.

## 1. First, the badges that need nobody's permission: verified professionals

1. Every partner card shows "Verificado em registo público · {data}" with the registration number linked to the official public search: lawyers in the Ordem dos Advogados search (cédula); the partner agency's AMI licence in IMPIC's public list; credit intermediaries in the Banco de Portugal register; insurance distributors in the ASF register; architects and engineers (if ever partners) in the Ordem dos Arquitetos and Ordem dos Engenheiros searches; solicitadores in the OSAE list; accountants in the OCC list; developers in the IMPIC construction-licence (alvará) list. Build it as one component reading `content/partners/*.yaml` (registry, number, URL, date checked), with a monthly re-check script.
2. The Ordens' emblems are not ours to show: the Ordem dos Advogados forbids third-party use of its emblem, and the others require authorisation. The number, the link and the date are the credibility. Document this rule in the component's README.

## 2. The map of institutions (`ops/CREDIBILITY.md`, plus a PDF of at most 4 pages)

One row per body: what it is; what it gives (membership badge, licence to use a mark, official status, listing, grant with publicity obligations, content partnership); conditions; cost; weeks from today to a logo on the site; the exact application link or contact page; the wording we may use ("Membro de", "Startup reconhecida por", "Licenciado", "Cofinanciado por", "Parceiro de conteúdo"); whether it is honest before launch; what we offer in return. Verify every fact on the body's own site this week. Cover at least:

1. **Business and sector associations in Portugal:** AEP and ACP (Porto), AIP (Lisbon), ANJE; **APPII** (the developers' and investors' association: the most useful room for us), AICCOPN and AECOPS (construction), CPCI; APEMIP and ASMIP only as institutions, never as agency partners (D9), flagged for the operator.
2. **Bilateral chambers and business clubs in our six markets:** CCIFP (Paris), the Luso-Swiss chamber, the Câmara Portuguesa de Comércio no Brasil (São Paulo, Rio), the Portugal–US Chamber of Commerce (New York), the Israel–Portugal chamber, the Luso-Luxembourg business associations and clubs. Membership fee, what members may display, events where sponsors sit.
3. **Official statuses and marks:** Startup Portugal's recognition of startup status under Lei 21/2023 (criteria, online application, what the certificate allows us to say); IAPMEI's SME certification; "Portugal Sou Eu" (whether services with ≥50% national value are eligible, the licence terms for the mark); PME Líder conditions for later.
4. **Portuguese and EU funds:** Portugal 2030 through COMPETE 2030 and **Norte 2030** (we are a Porto-area company selling in six markets): the "Vales" and the internationalisation and digitalisation lines open to a company under two years old, the calls open now or announced, eligible costs (content in five languages, the index, the social campaigns, fairs), the grant rate and ceiling, the steps from incorporation (SME certificate, Balcão dos Fundos registration, application, decision, contract), the publicity obligations under Regulation (EU) 2021/1060 Annex IX that make the logos appear, and the realistic month the logos could be on the site. Also PRR lines still open to startups, if any. State in bold that the EU emblem and the Portugal 2030 marks may only be shown by a beneficiary of an approved operation.
5. **The diaspora institutions:** GAID (Gabinete de Apoio ao Investidor da Diáspora) and PNAID with its partner network and municipal focal points; the Secretaria de Estado das Comunidades Portuguesas; the Conselhos das Comunidades Portuguesas (the elected councils per consular area: Luxembourg, Paris, Geneva, São Paulo, Newark/New York, Tel Aviv); the Conselho da Diáspora Portuguesa. For each: a content or distribution partnership that costs them nothing and helps their mission (the "Voltar" and Regressar programmes explained to the diaspora in five languages, the municipality incentives directory, the index cards for their focal municipalities).
6. **Embassies and consulates, and AICEP:** what they can do (list community media and associations on the consulate pages, share events, the AICEP economic sections' promotion of Portuguese developers abroad, the Dia de Portugal events where sponsors and the community meet) and what they cannot (endorse a commercial platform). The exact pages where community links are listed for the six consular areas.
7. **Turismo de Portugal and the regional promotion agencies** (Porto e Norte, Algarve, Madeira, Alentejo, Centro, Azores, Lisboa): co-marketing and source-market programmes open to media partners, not endorsements.
8. **Academic validation:** a review of the index method by a university (Porto Business School, FEP, ISCTE, Nova SBE): cost of a short commissioned review, time, what we may say ("Método revisto por …" only with their written agreement), how it reads to a bank.
9. **Press at launch:** "as seen in" after the Index and Portugal 100 press release (prompt 47 §4.2); which outlets' names may be shown and under what rule (published coverage only, linked).

## 3. Applications ready to sign (`ops/credibility/`)

For each body in the top ten by speed: the filled form or the email in the right language (PT, FR, EN), the attachments list, the fee, who signs (one of the two partners), and the follow-up date. Drafts only; the operator sends.

## 4. On the site

1. The "Instituições" strip in the footer and on the Parceiros page: logos appear only from a row in `content/partners/institutions.csv` (body, what it is, wording allowed, document or approval reference, date, expiry). The build fails if a logo file exists without a row.
2. Wording rules in the component: never "apoiado pela Embaixada"; "Membro de" for memberships; "Cofinanciado por" only with the operation code; "Startup reconhecida por Startup Portugal" only with the certificate number.

## 5. Deliver

1. The table and the PDF, ranked by weeks to a logo, with a one-page "this week / this month / after launch / 2027" plan for the operator.
2. The verified-professional component live per D67 (prompt 37's lawyer cards get the Ordem link and the date now).
3. One line on anything you could not verify. No screenshots.

Allowlist additions: `appii.pt`, `aiccopn.pt`, `aecops.pt`, `cpci.pt`, `aeportugal.pt`, `cciporto.pt`, `aip.pt`, `anje.pt`, `ccifp.fr`, `startupportugal.com`, `iapmei.pt`, `portugalsoueu.pt`, `norte2030.pt`, `compete2030.gov.pt`, `portugal2030.pt`, `balcaofundosue.pt`, `recuperarportugal.gov.pt`, `diaspora.gov.pt`, `conselhodadiaspora.pt`, `portaldascomunidades.mne.gov.pt`, `portaldiplomatico.mne.gov.pt`, `aicep.pt`, `impic.pt`, `oa.pt`, `portal.oa.pt`, `ordemengenheiros.pt`, `arquitectos.pt`, `osae.pt`, `occ.pt`, `bportugal.pt`, `asf.com.pt`, `pbs.up.pt`, `fep.up.pt`, `iscte-iul.pt`, `novasbe.unl.pt`.
