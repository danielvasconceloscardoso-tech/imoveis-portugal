# Tally: "Consulta privada" (prompt 21 §2, D39) — for the operator

Extend the existing form **Pedido de casa** (https://tally.so/r/BEEzgN, id `BEEzgN`) and rename it **Consulta privada**. Then duplicate it for EN and FR and send the operator's three form IDs to the CTO (config.forms.buyer). Nothing else changes on the site: the page already embeds the form and passes the hidden fields.

## 1. Fields, in this order (* = required)

| # | Field (PT) | EN | FR | Type and options |
| --- | --- | --- | --- | --- |
| 1 | País onde vive* | Country you live in* | Pays de résidence* | Dropdown: Luxemburgo / Luxembourg / Luxembourg · França / France / France · Suíça / Switzerland / Suisse · Brasil / Brazil / Brésil · Estados Unidos / United States / États-Unis · Israel / Israel / Israël · Outro / Other / Autre |
| 2 | Orçamento* | Budget* | Budget* | Single choice: Até 300 mil € / Up to €300k / Jusqu'à 300 k€ · 300 mil € a 1 M€ / €300k to €1M / 300 k€ à 1 M€ · 1 a 5 M€ / €1M to €5M / 1 à 5 M€ · Mais de 5 M€ / Over €5M / Plus de 5 M€ |
| 3 | Para quê* | Purpose* | Objectif* | Single choice: Casa para viver / Own home / Résidence principale · Casa de férias / Holiday home / Résidence secondaire · Rendimento de arrendamento / Rental income / Revenus locatifs · Regresso a Portugal / Returning to Portugal / Retour au Portugal · Investimento / Investment / Investissement |
| 4 | Quando quer comprar* | When do you plan to buy* | Quand pensez-vous acheter* | Single choice: Nos próximos 3 meses / Within 3 months / Dans les 3 mois · 3 a 12 meses / 3 to 12 months / 3 à 12 mois · Mais de 12 meses / More than 12 months / Plus de 12 mois · Ainda não sei / Not sure yet / Je ne sais pas encore |
| 5 | Financiamento* | Financing* | Financement* | Single choice: Pronto pagamento / Cash / Comptant · Crédito / Mortgage / Crédit · Ainda não decidi / Not decided / Pas encore décidé |
| 6 | Já tem NIF?* | Do you already have a NIF?* | Avez-vous déjà un NIF ?* | Yes / No |
| 7 | Região ou concelho | Region or municipality | Région ou commune | Short text (keep the existing field; prefilled from `place`) |
| 8 | Língua da conversa* | Language for the call* | Langue de l'échange* | Single choice: Português · English · Français |
| 9 | Janela preferida* | Preferred window* | Créneau souhaité* | Short text, placeholder "ex.: dias úteis, 18h–20h (hora de Lisboa)" / "e.g. weekdays, 6–8 pm Lisbon time" / "ex. : en semaine, 18 h–20 h (heure de Lisbonne)" |
| 10 | Nome* | Name* | Nom* | Keep |
| 11 | Email* | Email* | E-mail* | Keep |
| 12 | Telefone | Phone | Téléphone | Keep, optional |
| 13 | Consentimento* | Consent* | Consentement* | Checkbox, unticked: "Autorizo o envio deste pedido à Habinedita Gondomar (AMI 13250), agência imobiliária parceira, para me contactar sobre ele. Li a política de privacidade." / "I agree that this request is sent to Habinedita Gondomar (AMI 13250), the partner estate agency, to contact me about it. I have read the privacy policy." / "J'accepte que cette demande soit transmise à Habinedita Gondomar (AMI 13250), agence immobilière partenaire, pour me recontacter. J'ai lu la politique de confidentialité." |

Hidden fields (keep): `edition`, `language`, `budget`, `place`.

Remove the old "Orçamento" free-text field once field 2 exists (the hidden `budget` from the map still arrives).

## 2. Redirect on completion (Tally → Settings → Redirect on completion, with conditional logic)

The rule is never shown to readers. Use the edition and language from the hidden fields to build the URL: `https://{edition domain}/{language}/{edition}/{consult slug}/{page}/`.

1. If **Orçamento** is "1 a 5 M€" or "Mais de 5 M€" → `private-desk/`
2. Else if **Quando** is "Nos próximos 3 meses" or "3 a 12 meses" → `recebido/` (EN `received/`, FR `recu/`)
3. Else → `obrigado/` (EN `thank-you/`, FR `merci/`)

Consult slug: PT `consulta-privada`, EN `private-consultation`, FR `consultation-privee`. Example: `https://imoveisportugal.lu/pt/lu/consulta-privada/private-desk/`.

## 3. Notifications

- Email to the brand mailbox for every submission (as today), and **forward to the agency the same day** (hard rule 6, D14).
- Respondent confirmation email: off in Tally (the confirmation emails are sent by the agency, copy in content/consulta/EMAILS.md).
