# Prompt 83: Maré becomes the main brand. Find a free .com and check the trademark risk (operator, 12 Nov 2026)

The operator's decision: Maré becomes the main brand. Imóveis Portugal is a real-estate name, and it makes every conversation with public bodies harder (Programa Regressar, Turismo de Portugal). This prompt only covers research and a recommendation. Nothing gets bought, registered or built.

Rules that apply in full:
1. CLAUDE.md 18. Public pages go through curl or headless Playwright. Never use the operator's browser, a login, a form or a bot-check bypass. Never script requests to government sites: EUIPO, INPI, TMview and WIPO count as government sites.
2. Hard rule 5. No paid tool and no purchase.
3. CLAUDE.md 15. The report is one page, in English.

## 1. The team: create four agents

Agents 1 and 2 start in parallel. Agent 3 starts from agent 2's shortlist. Agent 4 checks everything at the end. Each agent writes to `ops/research/83_name/<agent>.md` and returns a summary of 10 lines or fewer.

1. **Brand namer** (has named consumer media brands and knows the Portuguese and French markets).
   - Generate 80 candidate .com domains built on "Maré" ("mare" in the domain).
   - Use these patterns:
     1. Maré + Portugal (mareportugal, maredeportugal).
     2. Maré + a format word (letter, daily, journal, weekly, notes, post, guide, edit).
     3. A verb + Maré (readmare, getmare, joinmare).
     4. Maré + a place or sea word (mareatlantica, mareoeste).
     5. Short coined variants that keep the sound (amare, maremar).
   - Each name must:
     1. Be easy to say and spell in Portuguese, French and English.
     2. Avoid a bad meaning in those three languages and in Brazilian Portuguese.
     3. Be 14 characters or fewer before ".com".
     4. Have no hyphens or digits.
     5. Not resemble Farol.
   - Write one line per name: the name, why it works and any risk.
2. **Domain checker** (infrastructure engineer).
   - Check every candidate with RDAP over curl: `https://rdap.verisign.com/com/v1/domain/<name>.com`. A 404 means the domain is probably free; a 200 means it is taken. Wait at least 1 second between requests.
   - If RDAP is blocked by the proxy, try one alternative public source. If that fails too, stop and write the list for the operator to paste into Namecheap Beast Mode.
   - For each taken domain, record the registrar, the creation date and whether the page shows "for sale" (one curl of the home page, no more).
   - Also check the .pt version of the free names the same way, if a public RDAP or WHOIS endpoint for .pt answers. Otherwise mark it "to check by hand".
   - Output: a table with the name, .com status, .pt status and source, plus a shortlist of the 15 best free .com names (agent 1's ranking among the free ones).
3. **Trademark and handle checker** (has done trademark clearance in the EU).
   1. For each of the 15 shortlisted names, write the exact searches the operator must run by hand:
      - TMview: the name and "MARE"/"MARÉ" as a word element, in classes 35, 36 and 41, filtered on the EU, Portugal, France, Benelux, Switzerland, the UK, Brazil and the US.
      - The INPI marks search.
      Do not run these searches with a script.
   2. From public, non-government sources only (company sites, press, app stores, a normal web search), list the existing brands called Maré or close to it in media, newsletters, real estate, travel and hospitality. For each: country, sector, website and how close it is to us.
   3. Check whether the Instagram, TikTok, LinkedIn and X handles exist, by opening the public profile URL once per network with curl or Playwright, without logging in. If a network blocks this, write "to check by hand". Never create an account.
   4. Give each shortlisted name a risk rating (low, medium or high), with the reason.
4. **Independent fact-checker** (has not seen the work).
   - Re-checks 10 random "free" results and 5 random "taken" results with a second request.
   - Checks that no government site was scripted and that nothing was bought, registered or created.
   - Marks each item CONFIRMED, CORRECTED or REMOVED.

## 2. Report to the operator

Plain text, one page, in English, in this order:
1. The top 5 free .com names, ranked, each with:
   - one line on why it is ranked there;
   - .pt status;
   - social handle status;
   - trademark risk.
2. The existing "Maré" brands that matter, and why.
3. The searches the operator must run by hand: TMview and INPI links and terms, plus any handles marked "to check by hand".
4. What to buy first, and the cost: the domain only, around 10 € a year. The trademark waits until there is a company or a first sponsor. Leave that decision with the operator.

Write the decision of this prompt to ops/DECISIONS.md: "Maré to become the main brand (operator, 12 Nov 2026); name and domain pending prompt 83". Add row 83 to ops/QUEUE.md. Commit and push to `main` (no site change, so no visual check).
