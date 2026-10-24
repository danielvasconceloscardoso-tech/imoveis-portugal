# Prompt 08 — Partner agency: Habinedita Gondomar

To run: in Claude Code, type "Read ops/prompts/08_partner_agency_habinedita.md and apply it." Applies to the site work in prompts 06 and 07. Nothing is published, merged or deployed without Daniel's approval.

---

## Decision (D17, 24 Oct 2026)

The partner agency (D14) is **Habinedita Gondomar**, Av. General Humberto Delgado 415, Gondomar (São Cosme), Valbom e Jovim. It is the only real-estate agency on the platform and appears as a **sponsor** (labelled as such), as every paid relationship (D6).

Public details (checked 24 Oct 2026):
- Website: https://habineditagondomar.pt/ (link here from every mention)
- AMI licence: 13250 (shown in the site footer)
- Address: Av. General Humberto Delgado 415, Gondomar (São Cosme), Valbom e Jovim (Imovirtual agency page)
- Phone: +351 221 458 069 (Imovirtual agency page)
- Email: not published; until the agency sends one, buyer requests go to the brand mailbox and are forwarded the same day
- Logo: ask the operator for the file; until then, the agency name in text

Decided: **agency name only**, no personal names (anonymity).

## Where it appears

1. **Buyer request page** (every edition): "Your request goes to our partner agency, Habinedita Gondomar (AMI 13250), licensed real-estate mediator." Requests go to the brand mailbox and are forwarded to the agency the same day; switch to direct delivery once the agency gives a business email.
2. **"Talk to a partner" page** (every edition): Habinedita is the partner for buying and selling a home. Other categories (lawyer, bank, tax adviser, money transfer, developer) stay "announced at launch".
3. **FAQ**: [agency] links point to the buyer request page.
4. **Partners page and media kit**: shown under "Partner agency" with the sponsored label. The real-estate category is closed to other agencies (D9).
5. **config.ts**: `agency.name = "Habinedita Gondomar"`, `agency.ami = "13250"`, `agency.website = "https://habineditagondomar.pt/"`, `agency.phone = "+351 221 458 069"`.

## Partner profile (the agency's own statement, labelled as sponsored)

**PT:** A Habinedita Gondomar acompanha compradores que vivem fora de Portugal, com experiência com clientes do Luxemburgo, de França, da Suíça, do Brasil, dos Estados Unidos e de Israel. Trata da procura, das visitas e da negociação, e coordena com advogados e bancos para quem compra à distância.

**FR :** Habinedita Gondomar accompagne les acheteurs qui vivent hors du Portugal, avec une expérience auprès de clients du Luxembourg, de France, de Suisse, du Brésil, des États-Unis et d'Israël. L'agence s'occupe de la recherche, des visites et de la négociation, et coordonne avec avocats et banques pour ceux qui achètent à distance.

**PT-BR:** A Habinedita Gondomar atende compradores que moram fora de Portugal, com experiência com clientes de Luxemburgo, França, Suíça, Brasil, Estados Unidos e Israel. Cuida da busca, das visitas e da negociação, e coordena com advogados e bancos para quem compra à distância.

**EN:** Habinedita Gondomar works with buyers who live outside Portugal, with experience serving clients from Luxembourg, France, Switzerland, Brazil, the United States and Israel. The agency handles the search, viewings and negotiation, and works with lawyers and banks for buyers purchasing from abroad.

## Rules

1. Label: "Parceiro patrocinador" / "Partenaire sponsor" / "Parceiro patrocinador" / "Sponsored partner".
2. Never describe the platform as "independent" or "neutral".
3. Every claim in the profile is the agency's own statement and must be confirmed by the agency before going live (Código da Publicidade: advertising must be truthful).
4. No other personal data in the repo: the agency's public business contacts only.

## When the agency sends its business email

Add the agency's domain to the allowlist in .githooks/pre-commit (alongside the brand addresses) before committing it, and switch the buyer form to deliver to it directly, with a copy to the brand mailbox.
