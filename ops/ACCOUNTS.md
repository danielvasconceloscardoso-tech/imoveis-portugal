# Platform accounts and public IDs

Public identifiers only (no passwords, keys or tokens). All accounts are on the brand mailbox geralportugalimoveis@gmail.com. Set up 25 Oct 2026.

## beehiiv (newsletter, free plan)
- Publication: Imóveis Portugal · default language Português · timezone Lisbon
- Sender: Imóveis Portugal (beehiiv default sending address) · reply-to geralportugalimoveis@gmail.com
- Double opt-in: on · Smart Nudge (48 h reminder): on · welcome email: off
- Custom fields: `language`, `edition` (text)
- Subscribe form "Site – PT": id `c515b523-ee0e-4cd4-9d78-97423874a589`
  - Embed: `<script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="c515b523-ee0e-4cd4-9d78-97423874a589"></script>`
  - Attribution (optional, before </body>): `<script type="text/javascript" async src="https://subscribe-forms.beehiiv.com/attribution.js"></script>`
- Open: footer postal address not set ("No Address Set"); beehiiv needs it before the first send. It must be the billing entity's or a business address, never a team member's (D4, hard rule 1). EN and FR forms still to create.

## Tally (forms, free plan)
- **Pedido de parceria**: https://tally.so/r/KppYG8 (form id `KppYG8`)
  - Fields: Empresa*, Setor* (Banco privado / Gestão de património, Banco / Crédito, Advogado, Consultoria fiscal, Transferências de dinheiro, Promotor imobiliário, Seguros, Outro), País*, Nome*, Email profissional*, Mensagem, consent checkbox* (unticked)
  - Hidden fields: `edition`, `language`
- **Pedido de casa**: https://tally.so/r/BEEzgN (form id `BEEzgN`)
  - Fields: Região ou concelho*, Orçamento*, Quando quer comprar* (3 meses / 3–12 meses / mais de um ano), País onde vive*, Nome*, Email*, Telefone (opcional), consent checkbox* naming Habinedita Gondomar (AMI 13250) and the privacy policy (unticked)
  - Hidden fields: `edition`, `language`, `budget`, `place` (prefilled from the map and simulators via URL parameters)
- Both: email notification of every submission to geralportugalimoveis@gmail.com; button "Enviar pedido"; PT only for now (EN and FR copies to create).

## Cal.com
- Not created yet: the partner agency creates it with its own email (D19) and sends the two booking links (15 min free, 45 min paid).
