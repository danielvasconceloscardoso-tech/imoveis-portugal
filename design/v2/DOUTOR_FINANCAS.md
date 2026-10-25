# Doutor Finanças: what to copy, what to do differently (prompt 13, D23)

Opened 25 Oct 2026 from the build environment. Screenshots (desktop first screen, mobile first screen and mobile full page, cookies rejected) in `design/v2/doutor-financas/`. Business figures are the CEO's (prompt 13), not re-checked here.

## What we could and could not open

| Page | Opened | Screenshots |
| --- | --- | --- |
| Home, Simulators (/ferramentas/), Ecossistema Casa, Comprar casa, Melhor crédito habitação, Observatório do Imobiliário, Estudos, Últimas, Testemunhos | Yes (HTTP 200) | `{page}-desktop.jpg`, `{page}-mobile.jpg`, `{page}-mobile-full.jpg` |
| Credit-intermediary registration PDF (IC-000042) | Yes | text only (one page) |
| One article: "Crédito Habitação e Emigração: o que deve saber" | Yes | text only |
| YouTube, Instagram, TikTok, Facebook, LinkedIn, Spotify podcast | **No**: blocked by this environment's network proxy (HTTP 403 for all six) | none |

## What works, page by page

1. **Home.** A news carousel on top (tax and housing headlines of the week), then "Em que podemos ajudar?" with eight service tiles (new mortgage, cheaper mortgage, PPR, insurance, consolidated credit, energy, solar, telecoms), then articles by category with the author's name, then four simulators. The header carries "Intermediário de crédito nº 0000420" on every page: the licence is a trust signal, not small print.
2. **Simulators (/ferramentas/).** About 20 tools in five groups (salary and social security, taxes, savings, credit, investing). Each has a one-line promise ("Saiba exatamente quanto vai pagar de IMT"). Between groups: a named client story with a euro figure ("poupou 1.123 € por mês") and a "Falar com o Doutor" button. The simulators are the traffic engine (CEO: 7 M uses in 2023); the button after each result is the business.
3. **Ecossistema Casa.** One page, four blocks (mortgage; life and home insurance; buy or sell; energy and telecoms), each with one button, then **one form**: goal, amount, number of borrowers, name, phone, email, and three tick boxes: (a) consent for the mortgage and the insurance tied to it, (b) a separate consent to be contacted about other savings (insurance not tied to the loan, energy, telecoms, buying and selling), (c) the newsletter. Then an FAQ of seven questions. Promise: "Serviço sem custos", "Tratamos de tudo por si", 4.9/5 Google. The hero is a stock-style portrait marked "Imagem gerada com recurso a Inteligência Artificial", with three circle-check promises under it: the template look prompt 11 removed from our site.
4. **Comprar casa / Melhor crédito.** Three promises, a three-step "Como funciona", a before/after case with spread, payment and total cost, and a multi-step form ("Qual é o seu objetivo?" first, contact details last). Buying a home goes to "uma rede de consultores imobiliários certificados" (several agencies), with contact promised "em menos de 24h".
5. **Observatório do Imobiliário.** A monthly PDF report (quarterly editions in January, April, July, October) built from listing portals, "+160.000 imóveis", own affordability index. Positioning: "Ajudar famílias a comprar com confiança / os bancos a decidir / o país a conhecer o seu mercado". Built for press pick-up as much as for readers.
6. **Estudos.** Barometers with Universidade Católica (financial habits, investing, retirement, digital literacy): third-party academic names lend authority and earn press.
7. **Últimas (content).** The first screen lists twelve articles from four days (about three a day) across categories (credit, taxes, housing, energy, investing…), every one dated, with category and author. Each article page ends with a client story and a simulator or "Falar com o Doutor" button; no "read also" lists.
8. **Testemunhos.** Video stories with first names, one detailed before/after case (loan, spread, payment, total cost), "+185.000 pessoas que ajudámos em 2024", the same form again.
9. **Licences.** Tied credit intermediary n.º 0000420 with 17 lenders; separate insurance intermediary (Doutor Finanças Protege) with 21 insurers named by logo.

## What we do differently for people abroad

| Doutor Finanças | Imóveis Portugal |
| --- | --- |
| Written for residents in Portugal, in PT only | Six editions in PT, EN and FR; prices also in CHF, $, R$ and ₪ (ECB rate) |
| Emigrant content is thin and old: the one emigrant mortgage article is from March 2019 (updated April 2020), before the 7.5% non-resident IMT (DL 97/2026) | Non-residents are the whole audience: every simulator has a "resident or not" switch and the 2026 rules |
| Sells no ad slots and labels nothing as sponsored; income is bank and insurer commission | Flat sponsorship only (D6), every sponsored block labelled (hard rule 4); the credit partner's commission is its own business, disclosed by it (D21) |
| One form, several partners behind it; a second tick box for "other savings" | One form, **one consent box per partner**, each naming the recipient (GDPR art. 6(1)(a) and 7); no catch-all box |
| Buying through a network of agencies | One licensed partner agency, Habinedita Gondomar (D14) |
| Named client stories and euro savings | No testimonials until real, written, permitted ones exist; never invented |
| Observatório built from listing portals (asking prices) | INE, Banco de Portugal and national statistics offices only: sale prices, with the source on every number |
| Licence in the header | Licences shown wherever a partner appears: AMI (agency), Banco de Portugal (credit partner), ASF (insurer, when signed) |
| About three articles a day | One article per real question per week and edition, each ending with its simulator and the matching partner (content plan: `content/PLAN_DF.md`) |

## What we copy now (built in this prompt)

1. The Ecossistema idea as **"A sua casa em Portugal, tratada de fora"**: one page, one form, a box per partner.
2. More simulators: IMT and stamp duty, IMI, debt-to-income ratio, "Que casa consigo comprar" (income in the reader's currency), capital gains for non-residents.
3. A property data page from INE quarterly figures (North first), next to "O que compra".
4. A content and social rhythm adapted to our size (`content/PLAN_DF.md`).

## Lenders and insurers named (for the sponsor pipeline)

- Lenders in the IC-000042 PDF: Cofidis, Santander Totta, Abanca, Bankinter, BPI, Banco CTT, BNI Europa, Novo Banco, Banco BIC Português, Montepio Crédito, UCI, BNP Paribas Personal Finance, Unicre, Caixa Geral de Depósitos, Millennium bcp, Crédito Agrícola, Novo Banco dos Açores, BBVA IFIC. The PDF also shows a staff member's email; it is not copied anywhere in the repo.
- Insurers (logos on /seguro-vida-geral/): Allianz, Mapfre, MetLife, Prévoir, Asisa, Real Vida, Saúde Prime, Una, Victoria, Generali Tranquilidade, Zurich, Golden SGF, Habit, Ageas, Innovarisk, Caravela, MGEN, Europ Assistance, April, Bupa, ARAG.
- Energy and telecom partners: not named publicly on the pages opened.
