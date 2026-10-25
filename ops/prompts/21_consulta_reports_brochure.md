# Prompt 21 — Consulta privada, paid dossiers, and the sponsor brochure (D38–D40)

To run: "Read ops/prompts/21_consulta_reports_brochure.md and execute it." Work on a branch and open a PR. Nothing is published, sent or merged without the operator's "go". PT, EN and FR, natively, Claridge's standard (prompt 19), voice v3 (D35). This prompt overrides earlier pricing and package instructions (prompts 12 §2b, 15 §1, 18 §3).

## 1. No prices or packages on the website (D38)

Partner pages describe what partners get (area placements, journey checkpoints, the Private section, launches) and end with "Condições sob consulta" and the partner enquiry form (Tally KppYG8). No price, tier or package name anywhere public.

## 2. "Consulta privada" instead of a call (D39)

The Claridge's logic: an appointment you are qualified for, not a sales call.
1. **Request form** (Tally BEEzgN, extended; give the operator the exact fields to add): country of residence, budget band (up to 300 k€, 300 k€–1 M€, 1–5 M€, 5 M€+), purpose (own home, holiday home, rental income, return to Portugal, investment), timing, financing (cash, mortgage, not decided), already has a NIF (yes/no), preferred language, preferred date window, consent naming the agency.
2. **Qualification rule** (shown to nobody, applied in the confirmation): timing within 12 months, or budget from 1 M€ → offered a 30-minute video consultation with the partner agency; otherwise → the journey for their country, the newsletter and the dossiers, with an invitation to book when ready.
3. Confirmation page and email copy for both outcomes, warm and precise. For 1 M€+: "a Private desk" wording, and a note that the agency will ask for the usual identification and proof of funds before viewings (the agency's own anti-money-laundering duties, Lei 83/2017).
4. After the consultation (copy only, sent by the agency): the next steps and the right partners: credit partner's personalised analysis (free, from the registered intermediary), lawyer, tax adviser for their country, the dossier.

## 3. Paid dossiers (information products, D39)

Personalised PDFs compiled from facts.csv and the reader's inputs, in the brand's report design (Knight Frank model). Information, not advice: each one says so and points to the partner for advice (lawyer, tax adviser; acts reserved to lawyers, Lei 49/2004).
1. **Dossiê de compra** · 190 €: for the reader's country, budget and area: full purchase costs, taxes when buying, owning, renting and selling in Portugal and at home under the treaty, financing scenarios (illustrative, not an offer), documents and timeline, area data (10-year prices, yields), and the partner shortlist for each step.
2. **Relatório de zona** · 90 €: one area in depth: 10-year price and rent data, yields, typologies, active developer projects (labelled), and how to buy there from abroad.
3. **Dossiê Private** · 950 €: for 1 M€+: residence options, IFICI, inheritance across both countries, holding-structure questions to discuss with advisers, prime areas, and introductions to vetted Private partners.
4. No personalised mortgage report from the brand: that is credit advice and stays with the registered credit partner (DL 81-C/2017).
5. Build the generator and the checkout pages with the **buy buttons off** until the billing entity exists (D4): invoicing, EU VAT on digital services (OSS), and the express consent that waives the 14-day withdrawal right for immediate delivery (DL 24/2014, art. 17.º). Stripe Payment Links once D4 is set.

## 4. Sponsor brochure (private, PDF, not linked from the site)

sponsors/brochure/ in FR, EN and PT, one per partner type (developers; tax, legal and wealth; banks and money transfer), designed like the reports:
1. The audience and why now (launch 1 Dec, six countries, 300 k€ to 10 M€+), the Claridge's positioning, the map, the price trends and the journeys, with screenshots.
2. **What you buy:** area placements (developers) or journey checkpoints (advisers), limited places, what each placement shows, where, and in which languages.
3. **Prices (D40):**
   - Area placement, per slot per year: Prime 24,000 € (e.g. Comporta, Quinta do Lago/Loulé, Cascais, central Lisbon, Porto Foz) · Strong 12,000 € (e.g. Porto, Braga, the rest of the Algarve, Madeira) · Standard 6,000 €. Maximum 3 per area.
   - Project launch: 7,500 € (prime areas 15,000 €).
   - Journey checkpoint, per step per country per year: Switzerland, Luxembourg, USA 12,000 € · France, Israel 8,000 € · Brazil 5,000 €; the residence and structuring step ×1.5. Maximum 3 per step.
   - Private Partner (Private section and structuring steps in every country): 48,000 €.
   - Founding Partner: the first 10 partners get 40% off year 1, price locked for year 2.
4. The logic in one line: "one client at your step pays for the year".
5. Labelled sponsorship, licences shown, flat annual fee (D6), no exclusivity sold before launch (D32).

## Review

Push after each section. Reply with the preview link, mobile screenshots of the consultation request, both confirmation pages and one dossier sample (LU, PT), the brochure PDFs, and the Tally fields the operator must add. Keep it short. Don't merge.
