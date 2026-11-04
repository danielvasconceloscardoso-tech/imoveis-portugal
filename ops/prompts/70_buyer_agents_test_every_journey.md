# Prompt 70: Real buyers test every journey, and we fix everything they feel

Operator, 4 Nov 2026: "Create agents that act like foreign buyers and navigate the website on the phone while they're on the metro, walking, or sitting on a couch: one French, one English, one Portuguese. Another one shows it on the computer to friends or a wife: how easy, clean and informative it is (not more information). Run tests and experiment with every journey. Fix every bug, wrong translation or weird feeling."

Run it after prompt 69, and test 69's work too. Goes live under D67. Follow content/METHOD.md (rule 16). Record it as the next free D number.

## First known bug (operator's phone, Safari, home page)
The header (brand, Maré, search, Menu) sits on top of the hero headline "Comprar casa em Portugal a partir do Luxemburgo." Both are white on the photo, so the top buttons can't be read. A dark tab with "›" on the left edge also covers the form.

Fix it so the header never shares space with the headline:
- the headline starts below the header, with the safe area respected;
- the header stays readable over any photo;
- no element covers the form.

Check on every page that has a photo hero.

## The agents
Spawn one subagent per persona and run them in parallel. Each uses Playwright on the live site (main), as a real person would. They tap, scroll, go back, switch apps, and read only what a person reads. They never read the code.

1. **Sophie, French, lives in Lyon, on the metro.** iPhone 13, FR edition, slow 3G with drops. She is interrupted every 40–60 seconds (tab switch, screen lock, back). She arrives from an Instagram link and has four stops to see if Portugal is for her.
2. **James, English, USA edition, walking.** Pixel 7. One thumb only, so every tap must reach the bottom two-thirds of the screen. Bright sun: high contrast needed. He has two minutes to check prices and sign up for Maré.
3. **Ana, Portuguese, emigrant in Luxembourg, on the couch at night.** iPhone 15, PT, dark mode, unhurried. She wants to come back:
   - she compares two concelhos;
   - she understands the 7.5% IMT and how it is refunded;
   - she books a call with the consultant.
4. **Marc and Inês, showing it on a laptop to friends at dinner.** Desktop 1440 px, one language each pass. The test is the 60-second demo: "Look how easy this is." Map arrival, Gondomar, a development, the full cost, the call booked. Every hesitation, dead end, jargon word or wall of text counts as a failure. The answer is never more information: it is less, better placed.

## Every journey, every persona
1. **Pages:**
   - home and the edition switch;
   - the map, a place card, the Gondomar card, a development card and /orizon;
   - the simulators and the IMT screen;
   - the Concierge (all three steps and Back);
   - the Maré signup and the Maré page;
   - step by step, the FAQ and articles;
   - the partners page and the legal pages;
   - a 404.
2. **Conditions:**
   - the language switch, deep links and the browser Back button;
   - landscape, dark mode, reduced motion and a slow network;
   - a form left halfway and resumed.

## Each agent keeps a log
For every step:
- what they tapped;
- what they expected;
- what happened;
- how it felt (1 to 5);
- the exact words that confused them;
- a screenshot.

Every finding gets one tag: **bug**, **translation** (wrong or different meaning in PT, EN or FR), **feeling** (against METHOD.md: too much text, hard to reach, unclear, not beautiful) or **slow**.

## Fix and repeat
1. **Fix every finding.** Copy fixes go into COPY_DECK.md in all three languages, with the same meaning.
2. **Re-run the agents on the fixed site** until a full pass finds no bug and no translation issue, and every journey scores at least 4 out of 5 for feeling.
3. **Report what you could not fix**, instead of shipping a weaker version.

## Report (short, one language)
1. A table of findings: persona, page, tag, what was wrong, fixed (yes/no).
2. Before and after screenshots of the ten worst.
3. The 60-second laptop demo as a screen recording (H.264, `-preset veryfast`).
4. The live links.
