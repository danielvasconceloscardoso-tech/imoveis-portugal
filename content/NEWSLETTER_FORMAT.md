# Newsletter format (prompt 12, section 3)

One email per edition and language, every Thursday. A 5-minute read (about 600 to 800 words). At least 80% evergreen: interesting and useful in a year's time, not facts that expire next week. Voice: content/VOICE.md v3 (D35): talk to the reader directly, and every item goes from the reader's obstacle to the rule or number that answers it, then to the partner who solves it. Every figure has a fact id in content/facts/facts.csv and appears in `sources:`.

## The seven blocks, always in this order

| # | PT | EN | FR | What goes in | Rules |
| --- | --- | --- | --- | --- | --- |
| 1 | A casa da semana | This week's home | Le bien de la semaine | One real listing from the partner agency, used with its written permission: place, price, the full cost of buying it (IMT, stamp duty, deed) and the total in the reader's currency (CHF, $, R$, ₪, ECB rate and date). | No listing from any other agency (D9, D14). Until the agency sends one, the block runs the cost example with the same layout and says so. |
| 2 | A história | The story | L'histoire | A real buyer's journey (anonymised, with written permission) or a story built on data (launch: "What 300,000 €, 1 M€, 5 M€ and 10 M€ buy in Portugal", content/press/DATA_STORY.md). | No invented people, quotes or anecdotes. Place stories use INE, Banco de Portugal or municipal data. |
| 3 | O mapa | The map | La carte | One budget on the interactive map (D34), linked with `?budget=`, and its shareable image (site/public/share/map-{budget}.png). No town-against-town comparisons. | Medians, not homes: say it in one line. |
| 4 | A pergunta do leitor | Reader's question | La question du lecteur | A real question a reader sent (reply to the email), a short answer with its source, then the matching partner button. | Before launch there are no reader questions: use the most-searched question from the FAQ and call it that. |
| 5 | Um número | One number | Un chiffre | One sourced figure of the week: the only "data" item. | One number, one line of context, the source. |
| 6 | Do parceiro | From our partner | Du partenaire | The sponsor block. | Always opens with the sponsored label from EDITORIAL_POLICY.md. One sponsor per issue. |
| 7 | Fecho | Sign-off | Pour finir | "Responda a este email com a sua pergunta." Every reply gets an answer; the best questions become next week's content. | Then the disclaimer and the unsubscribe line. |

## Subject lines

Specific and curious, with a place, a price or a number: "O que 300 mil, 1, 5 e 10 milhões compram em Portugal". Under 60 characters where possible. No clickbait, no banned words (VOICE.md), no question-bait ("Sabia que…?"), no emojis.

## beehiiv

1. One publication or segment per edition; PT, EN and FR as separate segments of each edition (D18).
2. Personalisation: `{{first name | Olá}}` / `{{first name | Hi}}` / `{{first name | Bonjour}}`.
3. Paste each draft as a new post, status draft. Never schedule or send without the operator's approval (hard rule 2). Test send to the three reviewers on Wednesday.
4. beehiiv adds the unsubscribe link and the postal footer; the draft's last line is a reminder, not a link.

## Files

`content/inbox/week-NN-newsletter/{edition}-{lang}.md`, with front matter: edition, lang (pt-PT, en, fr), type: newsletter, week, date, title (= subject), sources (fact ids), sponsored, status: draft. `node scripts/check-content.mjs` must pass before /publish-week.
