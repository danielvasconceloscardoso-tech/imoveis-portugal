# Setup: what only the operator can do

About 45 minutes. Everything else is done in the repo. Use the brand mailbox for every account, never a personal one.

## 1. Brand mailbox (5 min)

1. Done: geralportugalimoveis@gmail.com (brand mailbox, recovery by phone only).
2. Later, once a domain is on Cloudflare: Cloudflare → your domain → Email → Email Routing → create `parcerias@imoveisportugal.lu` forwarding to the mailbox. For sending from the domain address, use a free custom-domain mailbox (for example Zoho Mail's free plan; check its current terms).
3. The commit check allows only imoveisportugal domain addresses and this brand Gmail; any other address is blocked.

## 2. Domains (10 min)

1. Buy `imoveisportugal.lu` first, then `.fr`, `.ch`, `.com.br`.
2. Turn on WHOIS privacy where offered. For `.com.br` (registro.br, needs a CPF), check what the public record shows before using a personal CPF.
3. At each registrar, change the nameservers to the two Cloudflare gives you in step 3.

## 3. Cloudflare: hosting, analytics, email (15 min)

1. Create a free Cloudflare account. Add each domain (Add a site, Free plan) and copy the nameservers into the registrar.
2. Workers & Pages → Create → Pages → Connect to Git → choose `imoveis-portugal`.
   - Framework preset: Astro
   - Root directory: `site`
   - Build command: `npm run build`
   - Build output: `dist`
3. Deploy. You get a `…pages.dev` preview link: send it to the CEO chat.
4. Pages project → Custom domains → add the four domains (and `www.` versions).
5. Pages project → Settings → Environment variables: `DOMAIN_MODE` = `own-domain`.
6. Pages project → Web Analytics → enable (no cookies).

## 4. Forms in Tally (10 min)

Create forms in Portuguese, French and Brazilian Portuguese (LU and CH share the Portuguese ones). In each form add a hidden field named `edition`. Settings → Notifications → send to the brand mailbox (buyer form: also to the partner agency).

**Sponsor enquiry:** company · name · role · business email · phone (optional) · category (bank/credit, law, FX, developer, agency, insurance, other) · editions of interest (LU, FR, CH, BR) · message. Note under the button: "We use these details only to reply to your request."

**Buyer request:** first name · email · phone/WhatsApp · country of residence · region in Portugal · budget (under 150k, 150–300k, 300–500k, over 500k €) · property type · timeline (0–3, 3–6, 6–12, 12+ months) · needs a mortgage (yes / no / not sure) · message · **unticked** checkbox: "I agree that my request is sent to the licensed partner real-estate agency so it can contact me."

The form ID is the end of the share link: `tally.so/r/w4Xyz1` → `w4Xyz1`.

**Partner request ("Falar com um parceiro" / "Parler à un partenaire"):** one form per language: Portuguese (LU and CH), French (FR, plus a separate copy for Switzerland in French so requests can be counted per edition), Brazilian Portuguese. Fields: category (Advogado / Banco / Consultor fiscal / Transferências de dinheiro / Promotor imobiliário; no real-estate agency, D9 and D14) · country where you live · your question · first name · email · **unticked** checkbox: "I agree that my request is used to reply to me and, if I ask, passed to a partner in the chosen category." Hidden field `edition` (lu, fr, ch, ch-fr, br). Notifications → the brand mailbox only. Put the IDs in `config.forms.partnerRequest` in `site/src/config.ts`.

Monthly count for the media kit: Tally → the form → Submissions → filter by month → count per category. Write the totals (counts only, no names or emails) in ops/METRICS.md.

## 5. Newsletter in beehiiv (5 min)

1. Create the publication "Imóveis Portugal" (free plan, up to 2,500 subscribers).
2. If the free plan allows several publications, create one per edition; otherwise one publication, and the form used tells us the edition.
3. Settings → Subscribe forms → create an embed per edition; copy each embed URL. Turn on double opt-in.

## 6. Cal.com (3 min)

Create a 15-minute event "Parceria Imóveis Portugal" under the brand name; copy the link.

## 7. Send to the CEO chat

The pages.dev link, the domain email address, the Tally form IDs, the beehiiv embed URLs and the Cal.com link. They go into `site/src/config.ts`, and the site redeploys on its own.

## Before going public (needs D4)

1. Billing entity chosen: name, address, register number, VAT number into `config.entity`.
2. Partner agency name and AMI licence number into `config.agency`.
3. Daniel reviews the legal pages (privacy and legal notice drafts are live in each edition).
4. Then `launchReady: true`: removes the "noindex" and opens the site to search engines.
