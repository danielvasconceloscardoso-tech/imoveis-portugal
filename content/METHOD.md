# Method and voice (operator, 4 Nov 2026)

Everything we make follows this: the site, the map, Maré, articles, emails, decks. The CEO and the CTO read it before any design or copy. It sits above DESIGN_AND_DATA.md and VOICE.md where they disagree.

## The method: five questions before anything is built
1. **What should they feel?** One sentence, written before anything else. Steve Jobs started from the experience and worked back to the technology.
2. **What is the one hero?** One image, one fact, one action per screen. Everything else waits one tap away. Saying no is the work.
3. **How do they arrive?** Every place, project and issue has an arrival, set like a Belmond arrival: the light, the name, the welcome, before any information. The journey is the experience.
4. **What will they ask next?** Answer it before they ask, in one line, and keep the detail behind a tap. Never make them search. The Claridge's concierge anticipates: "leave it with me".
5. **What is the one more thing?** Keep the best fact for the end, so every moment closes on a surprise.

**The craft test:** the parts nobody looks at are finished too: transitions, loading, empty states, dark mode, error pages.

## The voice: the head concierge
Speaks like the head concierge at Claridge's, sees like a Belmond travel writer, presents like Steve Jobs on stage.
1. **The concierge:** warm, brief, discreet. Knows everything, shows off nothing. "Leave it with me", never "Contact us".
2. **The travel writer:** the senses and the place, in exact nouns. A real detail beats an adjective, and the detail is always true and sourced.
3. **On stage:** one idea per sentence. Numbers made human ("€300,000 buys about 128 m²"). At most one analogy. Then stop.

**Rules:**
- Nouns and numbers, not adjectives. Banned: stunning, nestled, unique, hidden gem, paradise, breathtaking, unforgettable, "luxury" (say what it is), "Discover…", exclamation marks, emojis.
- Second person, present tense.
- No two-beat drama ("Comece pelos números."), no history lessons, no list where one line will do.
- Never invent a detail to make a sentence pretty.
- Read it aloud as the concierge would at his desk. If he would not say it, cut it.

## Two registers (operator, 4 Nov: "clear, direct shit in everything that's functional", Y Combinator style)
1. **Editorial** (Maré, articles, the last line of a card): the head concierge, as above.
2. **Functional** (simulators, the Concierge, forms, map controls, buttons, labels, errors, navigation): Y Combinator plain.
   - Say what it is, in as few words as a person needs. Labels of 1 to 3 words.
   - No sentence explaining how the tool works, what we store or how good it is. The one exception is a line that prevents a mistake or that the law requires: then one small line at the bottom.
   - If a control changes nothing, delete the control instead of explaining it.
   - No jargon where a plain word exists ("Sem crédito", not "Capitais próprios").

## Worked example: tapping Gondomar on the map
**Today (a report):** gallery, price in words, drive times, seven schools and seven health centres by name, sources, two buttons, and the development as one line at the bottom.

**With the method:**
1. **Feel:** "I have arrived somewhere I could live, and someone has already thought of everything."
2. **Arrival:** the camera comes down the Douro to Gondomar. The name in large type, one line: "Gondomar. O Douro, a {min} minutos do Porto" (OSRM minutes).
3. **Hero:** O'rizon stands at its real spot as a photograph. One tap opens the full-bleed render, one line ("200 casas sobre o Douro, junto à Marina do Freixo"), and one action: "Marcar uma visita privada".
4. **The next questions,** one line each, opening on tap: "Porto? {min} min." "Escolas? 7 a menos de 15 min." "300 000 €? Cerca de 128 m²."
5. **One more thing:** "Daqui sai 42% da ourivesaria portuguesa."
