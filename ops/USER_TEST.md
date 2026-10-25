# Real-people test kit (prompt 15 §6)

AI scores can't tell us whether a reader trusts the site. Ten minutes per person, five people per audience, on their own phone, with the preview link. The operator recruits (friends of friends, community groups, a sponsor's marketing team); nobody is paid; no names are written in the repo.

## Audiences (5 people each)

1. Portuguese emigrant in Luxembourg (PT)
2. French buyer, no Portuguese ties (FR)
3. Brazilian preparing a move (PT)
4. American buyer (EN)
5. Marketing manager at a likely sponsor (bank, law firm or money-transfer firm) (their language)

## The test (10 minutes)

1. **Five seconds.** Show the home page for five seconds, then hide it. Ask: "What is this site, and who is it for?"
2. **Two tasks.** (a) "Find what a 250,000 € home costs in total, with taxes." (b) "Book the free call with the agency." Note where they hesitate and how long each takes. For the sponsor audience: "Find what it costs to appear as a partner."
3. **Three questions.**
   - What would stop you trusting this site?
   - Which words or sentences felt odd, or written by a machine?
   - Would you subscribe to the newsletter? Why or why not?

## Tally questionnaire (spec; the operator builds it)

Form name: "Teste do site · Site test · Test du site", one version per language, no login, no tracking.

| # | Field | Type | Required |
| --- | --- | --- | --- |
| 1 | Audience | Single choice: LU emigrant · French buyer · Brazilian · American · Sponsor marketing | yes |
| 2 | Language of the test | Single choice: PT · EN · FR | yes |
| 3 | In one sentence: what is this site and who is it for? | Short text | yes |
| 4 | Task A: total cost of a 250,000 € home found? | Yes · With help · No | yes |
| 5 | Task A: seconds taken | Number | no |
| 6 | Task B: free call found? | Yes · With help · No | yes |
| 7 | Task B: seconds taken | Number | no |
| 8 | What would stop you trusting this site? | Long text | yes |
| 9 | Words or sentences that felt odd or machine-written | Long text | no |
| 10 | Would you subscribe? | Yes · Maybe · No, and why (long text) | yes |
| 11 | Consent: "I agree that my answers, without my name, are used to improve the site." | Checkbox, unticked | yes |

No name, email or phone fields. Tally settings: no IP collection; responses visible only to the brand account.

## After the tests

1. The operator exports the answers (CSV) and keeps them outside the repo.
2. The CTO summarises them, without names, in `content/copy/CEO_EDITS.md` under "User tests", with one proposed fix per finding.
3. Words flagged by two or more people are added to the voice check in `scripts/scorecard.mjs`.
