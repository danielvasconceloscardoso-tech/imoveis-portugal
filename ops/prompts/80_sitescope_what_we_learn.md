# Prompt 80: sitescope.ai, what we can learn and what we should do (operator, 8 Nov 2026)

The operator saw sitescope.ai on Instagram, a Warsaw startup with the bio "Unlocking buildable potential with AI". Its account (@sitescope.ai) has 3 posts and about 2,300 followers; one post is titled "What does sitescope actually do?". A creator, @realrobertgutierrez, posted a reel from their office: a zoning/plot map on a TV screen, the caption "Startups like this are the foundational layer…", labelled "polish startup", with about 10.9K likes, 782 comments and 9.6K shares. (Screenshots stay with the operator: they show his own Instagram, so they are kept out of the repo.)

Your task: find out exactly what they do and how they grow, then tell the operator what Imóveis Portugal should learn and do. This is research and a recommendation only: build nothing in this prompt. Any build comes as its own prompt after the operator's go, golden sample first (CLAUDE.md rule 17: Gondomar).

## 1. Create the team: six specialised agents

Run agents 1 to 4 in parallel. Give each one this brief plus its own section. Each saves its findings to `ops/research/80_sitescope/<agent>.md` and returns a summary of 10 lines or fewer.

Rules for every agent:
- WebSearch and WebFetch only. Never the operator's Chrome or any browser tool: an earlier agent got his IP blocked by a government site.
- Every fact gets a link. Never invent a number. Mark anything unconfirmed.
- Instagram, LinkedIn and TikTok usually block fetching. Use search snippets, press coverage, and Polish company registers (KRS, Tracxn, Crunchbase snippets).

1. **Company analyst** (a venture-capital associate's eye):
   - Product: inputs, the data it uses (Polish zoning plans (MPZP), building-condition decisions (WZ), the land registry), outputs (buildable area, height, footprint, feasibility report, 3D massing) and what the AI actually does.
   - Customers, pricing, founders and their background, founding year, funding (amount and investors), team size, traction claims, press, partners.
2. **Growth and content analyst** (a social strategist who has run creator campaigns):
   - Who @realrobertgutierrez is, and his format: visits to startups, a hand pointing at the screen, captions word by word.
   - Whether the collaboration looks paid or organic, and what such a reel costs.
   - Why this one went viral: the hook, the length, the claim "foundational layer".
   - What sitescope's own posts look like.
   - Give three Portuguese or Lusophone creators who make the same kind of video, with follower counts and links.
3. **Portugal data engineer** (a GIS engineer who knows Portuguese planning law): can we compute "buildable potential" in Portugal? For each source, say what it contains, its coverage of the 308 municipalities, its format (map service (WMS/WFS), shapefile or PDF only), its licence, and whether it has an API. Sources:
   - the municipal master plans (PDM): zoning and constraints maps, and the regulation text;
   - DGT's national planning information system (SNIT);
   - detailed and urbanisation plans (Planos de Pormenor and de Urbanização);
   - protected land and other restrictions: REN, RAN, Natura 2000, the coastline, heritage;
   - the land registry: Cadastro Predial, the simplified cadastre and BUPi;
   - dados.gov.pt and municipal map portals.

   Building indices and maximum heights sit in PDF regulation text, so check how hard extracting them is. Then test it on Gondomar: find its PDM, the zoning map service, and the regulation article with the building indices. Say what a first version would need.
4. **Market analyst** (a real-estate strategy consultant):
   - Who already does plot feasibility or land intelligence in Portugal and Spain: Casafari, Confidencial Imobiliário, idealista/data, and any "viabilidade construtiva" startup. Add the comparables abroad: LandTech (UK), Archistar (AU), Deepblocks, Gridics, TestFit. Give prices where public.
   - Who would pay in Portugal, with evidence of spend: developers, banks (valuations), agencies, architects, municipalities, IHRU and the 2024 law on rural land for housing (DL 117/2024).
   - Emigrants who inherited family land. BUPi spent about €140k on an emigrant campaign; "what can I build on my family's land?" is a question the Programa Regressar audience asks.

Once agents 1 to 4 have returned:

5. **Strategist** (a McKinsey partner who has built a media business). Reads the four files and writes `ops/research/80_sitescope/recommendation.md`:
   - What we learn: product, content, go-to-market. Three to five points, each with the evidence behind it.
   - What we do now, at no cost (this month): for example a creator-style office/screen reel of our own map and simulator, and the wording of our bio.
   - What we build, if anything, in three steps. A smallest version: for one municipality, click a point and see its zoning class plus links to the official plan. Then: the licence angle for public bodies (Regressar, municipalities, BUPi), sponsors (developers), and exit value.
   - Every point judged against D76: Portugal only, revenue per hour of human time, what a buyer of the business pays for.
   - What we do not do, and why.
6. **Independent fact-checker**: has not seen the work. Checks every number and claim in recommendation.md against its source and marks each CONFIRMED, CORRECTED or REMOVED. Fix the file before reporting.

## 2. Report to the operator

1. Plain text in the chat, no HTML and no PDF, at most one page, in English.
2. Order:
   1. what sitescope is (three lines);
   2. what we learn;
   3. what we do this month;
   4. what we could build and who pays;
   5. the risks.
3. End with one question for the operator: which step he wants as the next prompt.
4. Write one line in ops/DECISIONS.md only if the operator decides something.
5. Tick row 80 in ops/QUEUE.md.
