# Copy deck

Every text on the site, by page and block, in Portuguese (Portugal), English (American) and French (prompt 10). The site reads this file at build time: edit a line here, push, and the page changes. Voice: content/VOICE.md. Terms: content/GLOSSARY.md.

How to edit:
1. Change only the text after `PT:`, `EN:` or `FR:`. Keep the `##` page and `###` block names: the site looks them up.
2. Words in curly brackets are filled in by the site: `{agency}`, `{ami}`, `{email}`, `{n}`, `{left}`, `{total}`, `{country}`, `{date}` and the legal placeholders. Keep them.
3. Blocks ending in `.lu`, `.fr`, `.ch`, `.br`, `.us`, `.il`, `.uk` belong to one edition.
4. Not in this file: the FAQ questions and answers (content/faq/*.yaml), the disclaimers (content/EDITORIAL_POLICY.md), the report text (site/ebooks/), and figures and their sources (content/facts/facts.csv).
5. Tone (prompt 43, content/EDITORIAL_POLICY.md rules 10 to 12): positive, never deficit (say what the reader can do: "You don't need to be in Portugal to buy a home. Here's how it works."); short sentences a foreigner reads easily, every Portuguese term explained once; no AI tells; at most three short sentences per block.
6. The partner agency is not named on the site while `config.agency.public` is false (prompt 66): blocks speak of "a qualified advisor". The wording that names it lives in `## agencynamed` (same block keys) and comes back when the flag is true. `{agency}` and `{ami}` may appear only there: the build fails if a block shown with the flag off names the agency.

## common

### navx.faq
- PT: Perguntas
- EN: Questions
- FR: Questions

### navx.articles
- PT: Artigos
- EN: Articles
- FR: Articles

### nav.articles
- PT: Artigos
- EN: Articles
- FR: Articles

### navx.journey
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### nav.dossiers
- PT: Dossiers
- EN: Dossiers
- FR: Dossiers

### nav.consult
- PT: Concierge
- EN: Concierge
- FR: Concierge

### navx.prices
- PT: Preços
- EN: Prices
- FR: Prix

### nav.journey
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### country.il
- PT: Israel
- EN: Israel
- FR: Israël

### country.uk
- PT: Reino Unido
- EN: UK
- FR: Royaume-Uni

### country.us
- PT: EUA
- EN: USA
- FR: États-Unis

### country.br
- PT: Brasil
- EN: Brazil
- FR: Brésil

### country.ch
- PT: Suíça
- EN: Switzerland
- FR: Suisse

### country.fr
- PT: França
- EN: France
- FR: France

### country.lu
- PT: Luxemburgo
- EN: Luxembourg
- FR: Luxembourg

### country.hint
- PT: Moeda, impostos, exemplos e percurso seguem o país onde vive.
- EN: Examples, currency, tax answers and Step by step follow the country you live in.
- FR: Les exemples, la devise, la fiscalité et le Pas à pas suivent votre pays de résidence.

### country.live
- PT: Vive em
- EN: I live in
- FR: J'habite

### nav.ours
- PT: Os nossos parceiros
- EN: Our partners
- FR: Nos partenaires

### nav.private
- PT: Residência, impostos e herança
- EN: Residence, tax and inheritance
- FR: Résidence, fiscalité et succession

### close
- PT: Fechar
- EN: Close
- FR: Fermer

### newsletter
- PT: Maré, a newsletter
- EN: Maré, the newsletter
- FR: Maré, la newsletter

### navx.partners
- PT: Parceiros
- EN: Partners
- FR: Partenaires

### navx.private
- PT: Residência, impostos e herança
- EN: Residence, tax and inheritance
- FR: Résidence, fiscalité et succession

### navx.sims
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### navx.map
- PT: Mapa
- EN: Map
- FR: Carte

### navx.buy
- PT: Comprar
- EN: Buying
- FR: Acheter

### nav.map
- PT: Mapa
- EN: Map
- FR: Carte

### nav.data
- PT: Preços e rendas
- EN: Prices and rents
- FR: Prix et loyers

### nav.casa
- PT: Comprar a partir de fora
- EN: Buying from abroad
- FR: Acheter depuis l'étranger

### nav.sims
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### nav.faq
- PT: Perguntas
- EN: FAQ
- FR: Questions

### nav.blog
- PT: Artigos
- EN: Articles
- FR: Articles

### nav.guide
- PT: Guia gratuito
- EN: Free guide
- FR: Guide gratuit

### nav.buy
- PT: Encontrar casa
- EN: Find a home
- FR: Trouver un bien

### nav.partners
- PT: Para parceiros
- EN: For partners
- FR: Pour les partenaires

### nav.how
- PT: Sobre nós
- EN: About us
- FR: À propos

### nav.talk
- PT: Falar com um parceiro
- EN: Talk to a partner
- FR: Parler à un partenaire

### subscribe
- PT: Subscrever
- EN: Subscribe
- FR: S'abonner

### skip
- PT: Saltar para o conteúdo
- EN: Skip to content
- FR: Aller au contenu

### beta
- PT: Beta
- EN: Beta
- FR: Bêta

### menu
- PT: Menu
- EN: Menu
- FR: Menu

### edition
- PT: Edição
- EN: Edition
- FR: Édition

### language
- PT: Língua
- EN: Language
- FR: Langue

### sticky.talk
- PT: Falar com um parceiro
- EN: Talk to a partner
- FR: Parler à un partenaire

### sticky.guide
- PT: Receber o guia
- EN: Get the guide
- FR: Recevoir le guide

### gold
- PT: Patrocinador Gold
- EN: Gold sponsor
- FR: Sponsor Gold

### partners.line
- PT: Empresas: ser parceiro.
- EN: Businesses: become a partner.
- FR: Entreprises : devenir partenaire.

### sponsored
- PT: Patrocinado
- EN: Sponsored
- FR: Sponsorisé

### checked
- PT: verificado a {date}
- EN: checked on {date}
- FR: vérifié le {date}

### sources
- PT: Fontes
- EN: Sources
- FR: Sources

### privacy
- PT: Privacidade
- EN: Privacy
- FR: Confidentialité

### form.pending
- PT: Formulário em preparação. Escreva-nos para {email}.
- EN: Form coming soon. Write to {email}.
- FR: Formulaire en préparation. Écrivez à {email}.

### trust.1.h
- PT: Um consultor qualificado
- EN: A qualified advisor
- FR: Un conseiller qualifié

### trust.1.p
- PT: De uma mediadora imobiliária licenciada, patrocinadora da Imóveis Portugal.
- EN: At a licensed real-estate brokerage that sponsors Imóveis Portugal.
- FR: D'une agence immobilière agréée, sponsor d'Imóveis Portugal.

### trust.2.h
- PT: Fontes oficiais
- EN: Official sources
- FR: Sources officielles

### trust.2.p
- PT: Cada número traz a fonte e a data da verificação.
- EN: Every number shows its source and the date we checked it.
- FR: Chaque chiffre indique sa source et sa date de vérification.

### trust.3.h
- PT: Patrocínios identificados
- EN: Sponsors labeled
- FR: Sponsors signalés

### trust.3.p
- PT: O conteúdo pago diz sempre que é patrocinado.
- EN: Paid content always says it's sponsored.
- FR: Un contenu payé l'indique toujours.

### foot.tagline
- PT: A sua casa em Portugal, a partir de onde vive. E a Maré, à terça e à sexta, às 8h.
- EN: Your home in Portugal, from wherever you live. Maré, a newsletter every Tuesday and Friday at 8 a.m. Lisbon time.
- FR: Votre maison au Portugal, depuis chez vous. Maré, une newsletter chaque mardi et vendredi à 8 h.

### foot.about
- PT: Sobre
- EN: About
- FR: À propos

### foot.editions
- PT: Edições
- EN: Editions
- FR: Éditions

### foot.languages
- PT: Línguas
- EN: Languages
- FR: Langues

### foot.legal
- PT: Aviso legal
- EN: Legal notice
- FR: Mentions légales

### foot.credits
- PT: Créditos
- EN: Credits
- FR: Crédits

### foot.agency
- PT: Os pedidos de compra e venda seguem para um consultor qualificado de uma mediadora imobiliária licenciada.
- EN: Buying and selling requests go to a qualified advisor at a licensed real-estate brokerage.
- FR: Les demandes d'achat et de vente sont transmises à un conseiller qualifié d'une agence immobilière agréée.

## editions

### name.lu
- PT: Luxemburgo
- EN: Luxembourg
- FR: Luxembourg

### name.fr
- PT: França
- EN: France
- FR: France

### name.ch
- PT: Suíça
- EN: Switzerland
- FR: Suisse

### name.br
- PT: Brasil
- EN: Brazil
- FR: Brésil

### name.us
- PT: Estados Unidos
- EN: United States
- FR: États-Unis

### name.il
- PT: Israel
- EN: Israel
- FR: Israël

### name.uk
- PT: Reino Unido
- EN: United Kingdom
- FR: Royaume-Uni

### fact.lu
- PT: pessoas com nacionalidade portuguesa vivem no Luxemburgo.
- EN: people with Portuguese nationality live in Luxembourg.
- FR: personnes de nationalité portugaise vivent au Luxembourg.

### fact.fr
- PT: pessoas nascidas em Portugal vivem em França, a maior comunidade portuguesa do mundo.
- EN: people born in Portugal live in France, the largest Portuguese community in the world.
- FR: personnes nées au Portugal vivent en France, la plus grande communauté portugaise au monde.

### fact.ch
- PT: pessoas nascidas em Portugal vivem na Suíça.
- EN: people born in Portugal live in Switzerland.
- FR: personnes nées au Portugal vivent en Suisse.

### fact.br
- PT: casas compradas em Portugal em 2025 por pessoas nascidas no Brasil, mais do que qualquer outra nacionalidade estrangeira.
- EN: homes bought in Portugal in 2025 by people born in Brazil, more than any other foreign nationality.
- FR: logements achetés au Portugal en 2025 par des personnes nées au Brésil, plus que toute autre nationalité étrangère.

### fact.us
- PT: em contas no estrangeiro, em algum momento do ano: acima disto, os US persons entregam o FBAR.
- EN: in foreign accounts at any time in the year: above that, US persons file an FBAR.
- FR: sur des comptes à l'étranger, à un moment de l'année : au-delà, les US persons déposent un FBAR.

### fact.il
- PT: de IMT desde maio de 2026 se não for residente fiscal em Portugal, salvo exceções.
- EN: transfer tax (IMT) since May 2026 if you're not a Portuguese tax resident, with some exceptions.
- FR: d'IMT depuis mai 2026 si vous n'êtes pas résident fiscal au Portugal, sauf exceptions.

### fact.uk
- PT: pessoas nascidas em Portugal vivem em Inglaterra e no País de Gales.
- EN: people born in Portugal live in England and Wales.
- FR: personnes nées au Portugal vivent en Angleterre et au pays de Galles.

### topic.lu
- PT: Crédito no Luxemburgo ou em Portugal, impostos dos dois lados e o que muda no regresso.
- EN: Mortgages in Luxembourg or Portugal, taxes on both sides, and what changes when you move back.
- FR: Crédit au Luxembourg ou au Portugal, impôts des deux côtés et ce qui change au retour.

### topic.fr
- PT: Crédito em França ou em Portugal, impostos dos dois lados, heranças e casas de família.
- EN: Mortgages in France or Portugal, taxes on both sides, inheritance and family homes.
- FR: Crédit en France ou au Portugal, impôts des deux côtés, successions et maisons de famille.

### topic.ch
- PT: O 2.º pilar para comprar casa, francos em euros e o que muda na reforma em Portugal.
- EN: Using your 2nd pillar, francs into euros, and what changes when you retire in Portugal.
- FR: Le 2e pilier pour acheter, les francs en euros et ce qui change à la retraite au Portugal.

### topic.br
- PT: Vistos e residência, reais em euros, crédito em Portugal e o que declarar no Brasil.
- EN: Visas and residence, reais into euros, Portuguese mortgages and what to report in Brazil.
- FR: Visas et résidence, reais en euros, crédit au Portugal et ce qu'il faut déclarer au Brésil.

### topic.us
- PT: Crédito em Portugal para não residentes, dólares em euros, vistos e o que declarar nos EUA (FBAR, formulário 8938).
- EN: Portuguese mortgages for non-residents, dollars into euros, visas and US reporting (FBAR, Form 8938).
- FR: Crédit au Portugal pour non-résidents, dollars en euros, visas et déclarations américaines (FBAR, formulaire 8938).

### topic.il
- PT: Crédito em Portugal para não residentes, shekels em euros e a convenção fiscal entre Portugal e Israel.
- EN: Portuguese mortgages for non-residents, shekels into euros and the Portugal–Israel tax treaty.
- FR: Crédit au Portugal pour non-résidents, shekels en euros et la convention fiscale entre le Portugal et Israël.

### topic.uk
- PT: Crédito em Portugal para não residentes, libras em euros e a convenção fiscal entre Portugal e o Reino Unido.
- EN: Portuguese mortgages for non-residents, pounds into euros and the UK–Portugal tax treaty.
- FR: Crédit au Portugal pour non-résidents, livres en euros et la convention fiscale entre le Portugal et le Royaume-Uni.

### place.lu
- PT: Ribeira, Porto
- EN: Ribeira, Porto
- FR: La Ribeira, Porto

### place.fr
- PT: O Douro ao fim da tarde, Porto
- EN: The Douro at sunset, Porto
- FR: Le Douro au coucher du soleil, Porto

### place.ch
- PT: Ponte Luís I à noite, Porto
- EN: Luís I bridge at night, Porto
- FR: Le pont Luís I la nuit, Porto

### place.br
- PT: Ribeira, Porto
- EN: Ribeira, Porto
- FR: La Ribeira, Porto

### place.us
- PT: O Douro ao fim da tarde, Porto
- EN: The Douro at sunset, Porto
- FR: Le Douro au coucher du soleil, Porto

### place.il
- PT: Ponte Luís I à noite, Porto
- EN: Luís I bridge at night, Porto
- FR: Le pont Luís I la nuit, Porto

### place.uk
- PT: Ribeira, Porto
- EN: Ribeira, Porto
- FR: La Ribeira, Porto

## home

### qa.path
- PT: Comprar ou vender, passo a passo
- EN: Buying or selling, step by step
- FR: Acheter ou vendre, étape par étape

### h1.lu
- PT: Comprar casa em Portugal a partir do Luxemburgo.
- EN: Buying a home in Portugal from Luxembourg is simpler than it looks.
- FR: Acheter au Portugal depuis le Luxembourg, c'est plus simple qu'il n'y paraît.

### h1.fr
- PT: Comprar casa em Portugal a partir de França.
- EN: Buying a home in Portugal from France is simpler than it looks.
- FR: Acheter au Portugal depuis la France, c'est plus simple qu'il n'y paraît.

### h1.ch
- PT: Comprar casa em Portugal a partir da Suíça.
- EN: Buying a home in Portugal from Switzerland is simpler than it looks.
- FR: Acheter au Portugal depuis la Suisse, c'est plus simple qu'il n'y paraît.

### h1.br
- PT: Comprar casa em Portugal a partir do Brasil.
- EN: Buying a home in Portugal from Brazil is simpler than it looks.
- FR: Acheter au Portugal depuis le Brésil, c'est plus simple qu'il n'y paraît.

### h1.us
- PT: Comprar casa em Portugal a partir dos Estados Unidos.
- EN: Buying a home in Portugal from the US is simpler than it looks.
- FR: Acheter au Portugal depuis les États-Unis, c'est plus simple qu'il n'y paraît.

### h1.il
- PT: Comprar casa em Portugal a partir de Israel.
- EN: Buying a home in Portugal from Israel is simpler than it looks.
- FR: Acheter au Portugal depuis Israël, c'est plus simple qu'il n'y paraît.

### h1.uk
- PT: Comprar casa em Portugal a partir do Reino Unido.
- EN: Buying a home in Portugal from the UK is simpler than it looks.
- FR: Acheter au Portugal depuis le Royaume-Uni, c'est plus simple qu'il n'y paraît.

### where.lu
- PT: no Luxemburgo
- EN: in Luxembourg
- FR: au Luxembourg

### where.fr
- PT: em França
- EN: in France
- FR: en France

### where.ch
- PT: na Suíça
- EN: in Switzerland
- FR: en Suisse

### where.br
- PT: no Brasil
- EN: in Brazil
- FR: au Brésil

### where.us
- PT: nos Estados Unidos
- EN: in the US
- FR: aux États-Unis

### where.il
- PT: em Israel
- EN: in Israel
- FR: en Israël

### where.uk
- PT: no Reino Unido
- EN: in the UK
- FR: au Royaume-Uni

### lede
- PT: Cada passo, com as regras oficiais e um parceiro quando precisar. E a Maré, grátis, à terça e à sexta, às 8h.
- EN: We show you every step, with the official rules and the right numbers, and put you in touch with the people who get it done: the agency, the bank, the lawyer. Maré, a newsletter every Tuesday and Friday at 8 a.m., free.
- FR: Nous montrons chaque étape, avec les règles officielles et les bons chiffres, et vous mettons en relation avec ceux qui s'en chargent : l'agence, la banque, l'avocat. Maré, une newsletter chaque mardi et vendredi à 8 h, gratuite.

### subscribe
- PT: Receber a Maré
- EN: Get Maré
- FR: Recevoir Maré

### subscribe.subject
- PT: Quero receber a Maré
- EN: Please sign me up for Maré
- FR: Je souhaite recevoir Maré

### call.link
- PT: Pedir 15 minutos grátis
- EN: Talk to an advisor for 15 minutes, free
- FR: Parler 15 minutes avec un conseiller, gratuitement

### qa.h
- PT: Perguntas frequentes
- EN: Your questions, answered
- FR: Vos questions, nos réponses

### qa.away.q
- PT: Posso comprar sem ir a Portugal?
- EN: Can I buy without going to Portugal?
- FR: Puis-je acheter sans aller au Portugal ?

### qa.away.a
- PT: Sim, com uma procuração assinada {where}: um advogado parceiro trata da compra. As visitas podem ser por videochamada.
- EN: Yes. You sign a power of attorney {where} and a partner lawyer handles the purchase for you. Viewings can be done by video call.
- FR: Oui. Vous signez une procuration {where} et un avocat partenaire s'occupe de l'achat pour vous. Les visites peuvent se faire en appel vidéo.

### qa.total.q
- PT: Quanto vou pagar no total?
- EN: How much will I pay in total?
- FR: Combien vais-je payer au total ?

### qa.total.a
- PT: Numa casa de {price}, sem residência fiscal em Portugal: {total} com impostos, escritura e registo. O simulador calcula qualquer valor.
- EN: The calculator adds the taxes, the deed and the registration to the price, for any amount. For a {price} home, if you're not a Portuguese tax resident, the total cost is {total}.
- FR: Le simulateur ajoute au prix les impôts, l'acte et l'enregistrement, pour tout montant. Pour un bien à {price}, sans résidence fiscale au Portugal, le coût total est de {total}.

### qa.bank.q
- PT: O banco empresta a quem vive fora?
- EN: Will a bank lend to me if I live abroad?
- FR: La banque prête-t-elle si je vis à l'étranger ?

### qa.bank.a
- PT: Sim, dentro dos limites do Banco de Portugal: até 90% do valor para habitação própria e 80% para outros fins. O parceiro de crédito compara as propostas.
- EN: Yes. Portuguese banks lend to non-residents, up to 90% of the value for your own home and 80% for other uses, within Banco de Portugal's limits. Our credit partner compares banks for you.
- FR: Oui. Les banques portugaises financent les non-résidents, jusqu'à 90 % de la valeur pour votre résidence et 80 % pour les autres usages, dans les limites de la Banque du Portugal. Notre partenaire crédit compare les banques pour vous.

### qa.inherit.q
- PT: Herdei a casa dos meus pais.
- EN: I've inherited my parents' house.
- FR: J'ai hérité de la maison de mes parents.

### qa.inherit.a
- PT: Habilitação de herdeiros e registo tratam-se à distância, com um advogado parceiro. Os filhos não pagam o imposto do selo de 10% sobre a herança.
- EN: The heirs' declaration and the registration can be done from abroad, with a partner lawyer. Children don't pay the 10% stamp duty on inheritance.
- FR: L'acte de notoriété et l'enregistrement se font à distance, avec un avocat partenaire. Les enfants ne paient pas le droit de timbre de 10 % sur la succession.

### qa.live.q
- PT: Quero viver em Portugal.
- EN: I'd like to live in Portugal.
- FR: Je voudrais vivre au Portugal.

### qa.live.a
- PT: Com um visto de residência, como o D7 para rendimentos próprios. Desde 7 de outubro de 2023, comprar casa não abre novos vistos gold. Um advogado parceiro trata do pedido.
- EN: The route is a residence visa, such as the D7 for people with their own income. Since October 7, 2023, buying a home no longer opens new Golden Visa applications. A partner lawyer handles the application.
- FR: La voie, c'est un visa de résidence, comme le D7 pour les revenus propres. Depuis le 7 octobre 2023, l'achat d'un bien n'ouvre plus de nouveaux golden visas. Un avocat partenaire s'occupe de la demande.

### qa.tax.q
- PT: E os impostos aqui e em Portugal?
- EN: What about taxes here and in Portugal?
- FR: Et les impôts, ici et au Portugal ?

### qa.tax.a
- PT: As regras dos dois países, com a fonte oficial. Para o seu caso, um consultor fiscal parceiro.
- EN: We explain the rules in both countries, with the official source. For your own case, a partner tax adviser.
- FR: Nous expliquons les règles des deux pays, avec la source officielle. Pour votre cas, un conseiller fiscal partenaire.

### btn.lawyer
- PT: Perguntar a um advogado
- EN: Talk to a lawyer
- FR: Parler à un avocat

### btn.sim
- PT: Calcular o custo
- EN: Work out the cost
- FR: Calculer le coût

### btn.bank
- PT: Perguntar a um banco
- EN: Look at my case
- FR: Étudier mon dossier

### btn.tax
- PT: Perguntar ao consultor fiscal
- EN: Talk to a tax adviser
- FR: Parler à un conseiller fiscal

### qa.all
- PT: Ver todas as respostas
- EN: All questions
- FR: Toutes les questions

### week.h
- PT: A casa da semana
- EN: This week's home
- FR: Le bien de la semaine

### example.h
- PT: Custos de compra de uma casa de {price}
- EN: Buying costs for a {price} home
- FR: Frais d'achat d'un bien à {price}

### example.p
- PT: Custo total com impostos, escritura e registo, sem residência fiscal em Portugal: {total}.
- EN: Total cost with taxes, deed and registration, if you're not a Portuguese tax resident: {total}.
- FR: Coût total avec impôts, acte et enregistrement, sans résidence fiscale au Portugal : {total}.

### example.imt
- PT: IMT (7,5%)
- EN: Transfer tax, IMT (7.5%)
- FR: IMT (7,5 %)

### example.is
- PT: Imposto do selo (0,8%)
- EN: Stamp duty (0.8%)
- FR: Droit de timbre (0,8 %)

### example.deed
- PT: Escritura e registo (Casa Pronta)
- EN: Deed and registration (Casa Pronta)
- FR: Acte et enregistrement (Casa Pronta)

### example.total
- PT: Custo total
- EN: Total cost
- FR: Coût total

### example.fx
- PT: Cerca de {local} ao câmbio do BCE de {date}.
- EN: About {local} at the ECB rate of {date}.
- FR: Environ {local} au cours de la BCE du {date}.

### example.note
- PT: Para um residente fiscal, na morada principal, o IMT é bem menor. Não inclui crédito, advogado nem câmbio.
- EN: If you become a tax resident and this is your main home, the transfer tax is much lower. Mortgage, lawyer and exchange costs are not included.
- FR: Si vous devenez résident fiscal et que c'est votre résidence principale, l'IMT est bien plus bas. Crédit, avocat et change non compris.

### example.wait
- PT: Casa de exemplo, até o consultor qualificado apresentar a primeira casa real.
- EN: Until the qualified advisor sends a first real listing, we run the numbers on an example home.
- FR: En attendant le premier vrai bien proposé par le conseiller qualifié, nous faisons les comptes d'un bien d'exemple.

### example.link
- PT: Ver a conta completa
- EN: See the full breakdown
- FR: Voir le calcul complet

### side.h
- PT: O consultor qualificado
- EN: Our qualified advisor
- FR: Le conseiller qualifié

### side.p
- PT: De uma mediadora imobiliária licenciada, Patrocinadora Gold.
- EN: At a licensed real-estate brokerage, a Gold sponsor.
- FR: D'une agence immobilière agréée, sponsor Gold.

### blog.h
- PT: Para ler antes de assinar
- EN: To read before you sign
- FR: À lire avant de signer

## calls

### intro.h
- PT: Primeira conversa · 15 min · grátis
- EN: First call · 15 min · free
- FR: Premier appel · 15 min · gratuit

### intro.p
- PT: Diga-nos o que procura e o que já tem tratado. Sai com os próximos passos definidos.
- EN: Tell us what you're looking for and what's already done. You leave with the next steps.
- FR: Dites ce que vous cherchez et ce qui est déjà fait. Vous repartez avec les prochaines étapes.

### intro.short
- PT: Conversa de 15 min, grátis
- EN: 15-minute call, free
- FR: Appel de 15 min, gratuit

### intro.subject
- PT: Primeira conversa de 15 minutos com um consultor
- EN: 15-minute first call with an advisor
- FR: Premier appel de 15 minutes avec un conseiller

## faq

### onpath
- PT: No percurso: {step}
- EN: On the path: {step}
- FR: Dans le parcours : {step}

### stage.inheritance.p
- PT: Quem paga imposto, o que comunicar e como registar a casa.
- EN: Who pays tax, what to report and how to register the home.
- FR: Qui paie l'impôt, quoi déclarer et comment enregistrer le bien.

### stage.inheritance.h
- PT: Herança
- EN: Inheritance
- FR: Succession

### stage.selling.p
- PT: Mais-valias, documentos e a transferência do dinheiro.
- EN: Gains, documents and bringing the money home.
- FR: Plus-values, documents et rapatriement des fonds.

### stage.selling.h
- PT: Vender
- EN: Selling
- FR: Vendre

### stage.renting.p
- PT: Rendas, impostos e a convenção fiscal com o seu país.
- EN: Rent, the tax on it and the treaty with your country.
- FR: Les loyers, leur imposition et la convention avec votre pays.

### stage.renting.h
- PT: Arrendar
- EN: Renting out
- FR: Louer

### stage.owning.p
- PT: Impostos de cada ano, residência e o que declarar.
- EN: Yearly taxes, residence and what to report.
- FR: Impôts annuels, résidence et déclarations.

### stage.owning.h
- PT: Ser proprietário
- EN: Owning
- FR: Être propriétaire

### title
- PT: Perguntas sobre comprar casa em Portugal a partir de fora
- EN: Buying a home in Portugal from abroad, question by question
- FR: Acheter au Portugal depuis l'étranger, question par question

### lede
- PT: Respostas curtas, com a fonte oficial.
- EN: Short answers, with the official source.
- FR: Réponses courtes, avec la source officielle.

### search
- PT: Pesquisar: IMT, crédito…
- EN: Search: tax, mortgage…
- FR: Rechercher : IMT, crédit…

### stage.before.h
- PT: Antes de comprar
- EN: Before you buy
- FR: Avant d'acheter

### stage.before.p
- PT: Contas, crédito e o que ter em ordem.
- EN: Budget, mortgage and paperwork.
- FR: Budget, crédit et démarches.

### stage.buying.h
- PT: Na compra
- EN: Buying
- FR: L'achat

### stage.buying.p
- PT: Os passos, os contratos e os impostos da escritura.
- EN: The steps, the contracts and the taxes at closing.
- FR: Les étapes, les contrats et les impôts à l'acte.

### stage.after.h
- PT: Após a compra
- EN: After you buy
- FR: Après l'achat

### stage.after.p
- PT: Impostos anuais, arrendar e o que declarar.
- EN: Yearly taxes, renting out and what to report.
- FR: Impôts annuels, location et déclarations.

### none
- PT: Nada encontrado.
- EN: Nothing found.
- FR: Aucun résultat.

### updated
- PT: Fontes verificadas a {date}
- EN: Sources checked on {date}
- FR: Sources vérifiées le {date}

### cta.lawyer
- PT: Perguntar a um advogado
- EN: Talk to a lawyer
- FR: Parler à un avocat

### cta.bank
- PT: Perguntar a um banco
- EN: Talk to a bank
- FR: Parler à une banque

### cta.tax
- PT: Perguntar ao consultor fiscal
- EN: Talk to a tax advisor
- FR: Parler à un conseiller fiscal

### cta.fx
- PT: Perguntar sobre transferências
- EN: Talk about money transfers
- FR: Parler transferts d'argent

### cta.developer
- PT: Perguntar a um promotor
- EN: Talk to a developer
- FR: Parler à un promoteur

### cta.agency
- PT: Perguntar a um consultor qualificado
- EN: Ask a qualified advisor
- FR: Demander à un conseiller qualifié

### who.lawyer
- PT: Advogado
- EN: Lawyer
- FR: Avocat

### who.bank
- PT: Banco
- EN: Bank
- FR: Banque

### who.tax
- PT: Consultor fiscal
- EN: Tax advisor
- FR: Conseiller fiscal

### who.fx
- PT: Transferências
- EN: Money transfer
- FR: Transfert d'argent

### who.developer
- PT: Promotor
- EN: Developer
- FR: Promoteur

## talk

### form.cta
- PT: Enviar pergunta
- EN: Send question
- FR: Envoyer la question

### calls.h
- PT: Falar com um consultor
- EN: Talk to an advisor
- FR: Parler à un conseiller

### title
- PT: Falar com um parceiro
- EN: Talk to a partner
- FR: Parler à un partenaire

### lede
- PT: A sua pergunta segue para um parceiro da categoria que escolher.
- EN: Your question goes to a partner in the category you choose.
- FR: Votre question va à un partenaire de la catégorie choisie.

### agency.p
- PT: Numa mediadora imobiliária licenciada, para comprar ou vender a partir de fora: procura, visitas por vídeo ou ao vivo, negociação.
- EN: At a licensed real-estate brokerage, for buying or selling from abroad: search, viewings by video call or in person, and negotiation.
- FR: Dans une agence immobilière agréée, pour acheter ou vendre depuis l'étranger : recherche, visites en appel vidéo ou sur place, et négociation.

### cats.h
- PT: Escolha a categoria
- EN: Pick a category
- FR: Choisissez la catégorie

### launch
- PT: Estes parceiros chegam a 1 de dezembro de 2026. Até lá, as perguntas frequentes têm a regra e a fonte oficial.
- EN: These partners arrive on December 1, 2026. Until then, the FAQ gives the rule and the official source.
- FR: Ces partenaires arrivent le 1er décembre 2026. D'ici là, les questions fréquentes donnent la règle et la source officielle.

### cat.lawyer.h
- PT: Advogado
- EN: Lawyer
- FR: Avocat

### cat.lawyer.p
- PT: Compra à distância, procuração, contrato-promessa, heranças.
- EN: Buying from abroad, power of attorney, promissory contract, inheritance.
- FR: Achat à distance, procuration, compromis, succession.

### cat.bank.h
- PT: Banco
- EN: Bank
- FR: Banque

### cat.bank.p
- PT: Crédito à habitação para quem vive fora.
- EN: A mortgage, even while you live abroad.
- FR: Un crédit immobilier, même en vivant à l'étranger.

### cat.tax.h
- PT: Consultor fiscal
- EN: Tax advisor
- FR: Conseiller fiscal

### cat.tax.p
- PT: Impostos em Portugal e no país onde vive.
- EN: Taxes in Portugal and where you live.
- FR: Impôts au Portugal et dans votre pays.

### cat.fx.h
- PT: Transferências de dinheiro
- EN: Money transfer
- FR: Transfert d'argent

### cat.fx.p
- PT: Câmbio e envio de valores elevados.
- EN: Currency exchange and large transfers.
- FR: Change et transferts de montants élevés.

### cat.developer.h
- PT: Promotor imobiliário
- EN: Developer
- FR: Promoteur

### cat.developer.p
- PT: Empreendimentos novos e em construção.
- EN: New and off-plan developments.
- FR: Programmes neufs et en construction.

### form.h
- PT: O seu pedido
- EN: Your request
- FR: Votre demande

### form.intro
- PT: Usamos estes dados só para responder e, com a sua autorização, para os passar a um parceiro da categoria.
- EN: We use these details only to reply and, if you agree, to pass them to a partner in that category.
- FR: Nous utilisons ces données uniquement pour répondre et, avec votre accord, pour les transmettre à un partenaire de la catégorie.

## guide

### title
- PT: O custo total de comprar casa em Portugal
- EN: The total cost of buying in Portugal
- FR: Le coût total d'un achat au Portugal

### label
- PT: Guia gratuito · PDF
- EN: Free guide · PDF
- FR: Guide gratuit · PDF

### lede
- PT: {n} páginas com as contas para casas de 250 000 € e 400 000 € e a fonte oficial de cada número.
- EN: {n} pages of worked numbers for homes at €250,000 and €400,000, with the official source for every figure.
- FR: {n} pages d'exemples chiffrés pour des biens de 250 000 € et 400 000 €, avec la source officielle de chaque chiffre.

### download
- PT: Descarregar o guia (PDF)
- EN: Download the guide (PDF)
- FR: Télécharger le guide (PDF)

### inside.h
- PT: Página a página
- EN: Page by page
- FR: Page par page

### inside.1
- PT: Os impostos da compra em 2026, com a taxa de IMT para não residentes e as exceções.
- EN: Every purchase tax in 2026, including the non-resident transfer tax rate and its exceptions.
- FR: Tous les impôts de l'achat en 2026, dont le taux d'IMT des non-résidents et ses exceptions.

### inside.2
- PT: As contas como residente e como não residente, em quadro e em gráfico.
- EN: Worked examples as a resident and as a non-resident, in tables and charts.
- FR: Des exemples chiffrés en résident et en non-résident, en tableaux et en graphiques.

### inside.3
- PT: Regras do crédito, impostos anuais e uma lista para comprar à distância.
- EN: Mortgage rules, the yearly taxes and a checklist for buying from abroad.
- FR: Les règles de crédit, les impôts annuels et une liste de contrôle pour acheter à distance.

### inside.4
- PT: {country}: o representante fiscal e as regras verificadas do país onde vive.
- EN: {country}: the tax representative and the verified rules where you live.
- FR: {country} : le représentant fiscal et les règles vérifiées de votre pays.

### signup.h
- PT: Maré, a newsletter
- EN: Maré, the newsletter
- FR: Maré, la newsletter

## partners

### terms
- PT: Condições sob consulta. Até três lugares por zona e por passo.
- EN: Terms on request. Places are limited per area and per step.
- FR: Conditions sur demande. Places limitées par secteur et par étape.

### terms.h
- PT: Condições sob consulta
- EN: Terms on request
- FR: Conditions sur demande

### place.launch.p
- PT: Um novo empreendimento em destaque no mapa, na página da zona e num envio da Maré.
- EN: A new project featured on the map, on the area page and in one issue of Maré.
- FR: Un nouveau programme mis en avant sur la carte, sur la page du secteur et dans un numéro de Maré.

### place.launch.h
- PT: Lançamentos
- EN: Launches
- FR: Lancements

### place.private.p
- PT: Em todos os países, ao lado das regras oficiais.
- EN: In every country, next to the official rules.
- FR: Dans tous les pays, à côté des règles officielles.

### place.private.h
- PT: Residência, impostos e herança
- EN: Residence, tax and inheritance
- FR: Résidence, fiscalité et succession

### place.checkpoint.p
- PT: Cada passo do percurso termina com quem trata dele: banco, advogado, consultor fiscal ou transferências. Até três por passo e por país.
- EN: In each country, every step of the path ends with the partner who handles it: bank, lawyer, tax adviser, money transfer. Up to three per step and country.
- FR: Dans chaque pays, chaque étape du parcours se termine par le partenaire qui s'en charge : banque, avocat, conseiller fiscal, transferts. Trois au plus par étape et par pays.

### place.checkpoint.h
- PT: Passos do percurso, para consultores
- EN: Path steps, for advisers
- FR: Étapes du parcours, pour les conseillers

### place.area.p
- PT: Logótipo, um empreendimento e a indicação de patrocinado, no mapa, na página de preços da zona e no cartão de cada concelho. Até três por zona.
- EN: On the map, on the area's price page and on each municipality card: your logo, one project and the sponsored label. Up to three per area.
- FR: Sur la carte, sur la page des prix du secteur et sur la fiche de chaque commune : votre logo, un programme et la mention sponsorisé. Trois au plus par secteur.

### place.area.h
- PT: Lugares por zona, para promotores
- EN: Area placements, for developers
- FR: Places par secteur, pour les promoteurs

### place.h
- PT: O que os parceiros recebem
- EN: What partners get
- FR: Ce que reçoivent les partenaires

### proof.4
- PT: Publicamos aqui os números de audiência quando os tivermos.
- EN: Audience figures appear here as soon as they exist.
- FR: Les chiffres d'audience figureront ici dès qu'ils existeront.

### proof.3
- PT: Seis edições em três línguas e a Maré, à terça e à sexta, às 8h, a partir de 1 de dezembro de 2026.
- EN: Six editions in three languages and Maré, a newsletter every Tuesday and Friday at 8 a.m., from 1 December 2026.
- FR: Six éditions en trois langues et Maré, une newsletter chaque mardi et vendredi à 8 h, à partir du 1er décembre 2026.

### proof.2
- PT: Grupo parceiro licenciado: mediação imobiliária, intermediação de crédito e seguros.
- EN: Licensed partner group: real-estate brokerage, credit intermediation and insurance.
- FR: Groupe partenaire agréé : agence immobilière, intermédiation de crédit et assurance.

### proof.1
- PT: {n} cidadãos portugueses vivem no Luxemburgo, 14,5% da população (STATEC, censos de 2021).
- EN: {n} Portuguese nationals live in Luxembourg, 14.5% of the population (STATEC, 2021 census).
- FR: {n} ressortissants portugais vivent au Luxembourg, 14,5 % de la population (STATEC, recensement 2021).

### proof.h
- PT: Antes do lançamento, com números reais
- EN: Before launch, with real numbers
- FR: Avant le lancement, avec des chiffres réels

### why.p
- PT: Para um advogado, um processo de compra; para um banco, um crédito; para um promotor, uma venda; para quem gere o património de uma família, uma relação de muitos anos.
- EN: For a lawyer, one purchase file. For a bank, one mortgage. For a developer, one sale. For a wealth manager, a client for many years.
- FR: Pour un avocat, un dossier d'achat. Pour une banque, un crédit. Pour un promoteur, une vente. Pour un gestionnaire de patrimoine, un client pour des années.

### why.h
- PT: O valor de um cliente
- EN: One client covers the year
- FR: Un client couvre l'année

### network.p
- PT: Vários parceiros por categoria e por edição, ordenados pelo tempo de resposta e pela avaliação dos leitores. Imobiliário, crédito e seguros ficam com o grupo parceiro.
- EN: The network is open: several partners per category and edition. The order follows response time and readers' ratings. Real estate, mortgages and insurance stay with the partner group.
- FR: Le réseau est ouvert : plusieurs partenaires par catégorie et par édition. L'ordre suit le temps de réponse et l'avis des lecteurs. Immobilier, crédit et assurance restent au groupe partenaire.

### inventory.5
- PT: No mapa e nas listas «falar com um parceiro» da sua categoria e das suas edições.
- EN: On the map and in the "talk to a partner" lists for your category and editions.
- FR: Sur la carte et dans les listes « parler à un partenaire » de votre catégorie et de vos éditions.

### inventory.6
- PT: Nas etapas de residência, IFICI e herança.
- EN: In the steps on residence, IFICI and inheritance.
- FR: Dans les étapes résidence, IFICI et succession.

### inventory.4
- PT: Num capítulo do guia gratuito.
- EN: In a chapter of the free guide.
- FR: Dans un chapitre du guide gratuit.

### inventory.3
- PT: Na Maré, à terça e à sexta.
- EN: In Maré, the Tuesday and Friday newsletter.
- FR: Dans Maré, la newsletter du mardi et du vendredi.

### inventory.2
- PT: Nas perguntas da sua categoria, com uma resposta identificada.
- EN: On the questions in your category, with a labelled answer.
- FR: Sur les questions de votre catégorie, avec une réponse signalée.

### inventory.1
- PT: Nos simuladores, com a indicação «oferecido por».
- EN: On the calculators, marked "offered by".
- FR: Sur les simulateurs, avec la mention « offert par ».

### inventory.h
- PT: Onde aparece
- EN: Where you appear
- FR: Où vous apparaissez

### title
- PT: Para parceiros
- EN: For partners
- FR: Partenaires

### h1
- PT: O seu nome junto de quem prepara uma casa em Portugal
- EN: Your next clients are preparing a home in Portugal
- FR: Vos prochains clients préparent un achat au Portugal

### lede
- PT: Leitores no Luxemburgo, em França, na Suíça, no Brasil, nos Estados Unidos, em Israel e no Reino Unido, a preparar uma compra em Portugal de 300 mil a 10 milhões de euros. Seis edições em três línguas, a partir de 1 de dezembro de 2026.
- EN: Our readers live in Luxembourg, France, Switzerland, Brazil, the United States, Israel and the United Kingdom. They are preparing a purchase in Portugal, from €300,000 to €10 million. Six editions, three languages, launching on 1 December 2026.
- FR: Nos lecteurs vivent au Luxembourg, en France, en Suisse, au Brésil, aux États-Unis, en Israël et au Royaume-Uni. Ils préparent un achat au Portugal, de 300 000 € à 10 millions d'euros. Six éditions, trois langues, lancement le 1er décembre 2026.

### cta
- PT: Pedir as condições
- EN: Let's talk for 15 minutes
- FR: Parlons 15 minutes

### founding.h
- PT: Parceiro fundador
- EN: Founding partner
- FR: Partenaire fondateur

### founding.p
- PT: Até 1 de dezembro de 2026, os dez primeiros parceiros entram com condições de fundador, sob consulta.
- EN: The first ten partners get founding-partner terms, until 1 December 2026. Terms on request.
- FR: Les dix premiers partenaires bénéficient de conditions de partenaire fondateur, jusqu'au 1er décembre 2026. Conditions sur demande.

### slots
- PT: {left} de {total} lugares disponíveis até {deadline}
- EN: {left} of {total} places left until {deadline}
- FR: {left} places sur {total} jusqu'au {deadline}

### readers.h
- PT: Quem nos lê
- EN: Who reads us
- FR: Nos lecteurs

### readers.p
- PT: Pessoas que compram a partir do país onde vivem: casa para morar, de férias ou para investir. Procuram regras claras e bons profissionais.
- EN: People with a plan: the home they will live in, a holiday home or an investment. They buy from the country where they live. They want clear rules, correct figures and good professionals.
- FR: Des personnes qui ont un projet : leur future résidence, une maison de vacances ou un investissement. Elles achètent depuis leur pays. Elles cherchent des règles claires, des chiffres exacts et de bons professionnels.

### whynow.p
- PT: Os parceiros fundadores aparecem desde o primeiro número, a 1 de dezembro de 2026, e mantêm o preço no segundo ano.
- EN: Founding partners appear from the first issue, on 1 December 2026. They keep the founding price in the second year.
- FR: Les partenaires fondateurs figurent dès le premier numéro, le 1er décembre 2026. Ils gardent le prix fondateur la deuxième année.

### agency.p
- PT: Um consultor qualificado de uma mediadora imobiliária licenciada, a única da plataforma. Todos os pedidos de compra ou venda seguem para ele. A mediadora paga um patrocínio anual fixo, nunca uma comissão por contacto.
- EN: A qualified advisor at a licensed real-estate brokerage, the only one on the platform. Every request to buy or sell goes to the advisor. The brokerage pays a flat yearly sponsorship, never a fee per lead.
- FR: Un conseiller qualifié d'une agence immobilière agréée, la seule de la plateforme. Toutes les demandes d'achat ou de vente lui sont transmises. L'agence verse un parrainage annuel forfaitaire, jamais une commission par contact.

### rules.h
- PT: As nossas regras
- EN: Our rules
- FR: Nos règles

### rules.1
- PT: Todo o conteúdo patrocinado é identificado como tal.
- EN: All sponsored content is labeled as such.
- FR: Tout contenu sponsorisé est signalé comme tel.

### rules.2
- PT: Não publicamos promessas de rendimento.
- EN: We publish no promises of returns.
- FR: Nous ne publions aucune promesse de rendement.

### rules.3
- PT: Cada parceiro paga um valor anual fixo, nunca uma comissão por contacto.
- EN: Every partner pays a flat annual fee, never a fee per contact.
- FR: Chaque partenaire paie un forfait annuel, jamais une commission par contact.

### rules.4
- PT: Os pedidos de compra seguem só para um consultor qualificado de uma mediadora licenciada.
- EN: Buying requests go only to a qualified advisor at a licensed brokerage.
- FR: Les demandes d'achat vont uniquement à un conseiller qualifié d'une agence agréée.

### report.h
- PT: Os números da sua presença
- EN: The numbers behind your presence
- FR: Les chiffres de votre présence

### report.p
- PT: Todos os meses, por edição: subscritores, aberturas, cliques e pedidos de contacto ligados à sua presença.
- EN: Every month, automatically: subscribers, opens, clicks and contact requests linked to your presence, per edition.
- FR: Chaque mois, automatiquement : abonnés, ouvertures, clics et demandes de contact liés à votre présence, par édition.

### book
- PT: Marcar uma chamada
- EN: Book a call
- FR: Réserver un appel

### form.intro
- PT: Resposta num dia útil.
- EN: Answer within one business day.
- FR: Réponse sous un jour ouvré.

## buy

### cta
- PT: Enviar pedido
- EN: Send request
- FR: Envoyer la demande

### title
- PT: Encontrar casa
- EN: Find a home
- FR: Trouver un bien

### h1
- PT: Diga-nos que casa procura
- EN: Tell us what home you want
- FR: Dites-nous quel bien vous cherchez

### lede
- PT: O pedido segue para um consultor qualificado, que o contacta com opções. Sem custos.
- EN: Your request goes to a qualified advisor, who contacts you with options. Free.
- FR: Votre demande va à un conseiller qualifié, qui vous contacte avec des propositions. Gratuit.

### steps.h
- PT: A seguir
- EN: What happens next
- FR: Ensuite

### steps.1
- PT: Preenche o formulário: dois minutos.
- EN: You fill in the form: two minutes.
- FR: Vous remplissez le formulaire : deux minutes.

### steps.2
- PT: O consultor qualificado contacta-o em até dois dias úteis.
- EN: The qualified advisor reaches out within two business days.
- FR: Le conseiller qualifié vous contacte sous deux jours ouvrés.

### steps.3
- PT: Se quiser, o consultor marca visitas para quando estiver em Portugal.
- EN: If you like, the advisor sets up viewings for when you're in Portugal.
- FR: Si vous le souhaitez, le conseiller organise des visites pendant votre séjour au Portugal.

### small
- PT: Os seus dados servem só para este pedido e seguem para o consultor qualificado apenas com o seu consentimento.
- EN: Your details are used only for this request. They go only to the qualified advisor, with your consent.
- FR: Vos données servent uniquement à cette demande. Elles ne vont qu'au conseiller qualifié, avec votre accord.

## how

### title
- PT: Sobre nós
- EN: About us
- FR: À propos

### h1
- PT: Cada facto tem fonte e cada patrocínio está identificado.
- EN: Facts with sources. Sponsors labeled.
- FR: Des faits sourcés. Des sponsors signalés.

### lede
- PT: Quem somos, de onde vêm os números e como a Imóveis Portugal é financiada.
- EN: Who we are, where the numbers come from and how Imóveis Portugal makes money.
- FR: Qui nous sommes, d'où viennent les chiffres et comment Imóveis Portugal se finance.

### about.h
- PT: Quem somos
- EN: Who we are
- FR: Qui sommes-nous

### about.p
- PT: Todos os anos, milhares de emigrantes, lusodescendentes e estrangeiros decidem comprar casa em Portugal. A maioria faz tudo à distância, com pouca informação e sem saber em quem confiar. A Imóveis Portugal foi criada para eles: uma plataforma de informação independente. Não somos uma agência imobiliária e não recebemos comissões.
- EN: Every year, thousands of emigrants, people of Portuguese descent and foreigners decide to buy a home in Portugal. Most of them do it from a distance, with little information and no clear idea of whom to trust. Imóveis Portugal was built for them: an independent information platform. We are not a real estate agency and we take no commissions.
- FR: Chaque année, des milliers d'émigrés, de lusodescendants et d'étrangers décident d'acheter un logement au Portugal. La plupart le font à distance, avec peu d'informations et sans savoir à qui se fier. Imóveis Portugal a été créé pour eux : une plateforme d'information indépendante. Nous ne sommes pas une agence immobilière et nous ne touchons aucune commission.

### about.what.h
- PT: O que fazemos
- EN: What we do
- FR: Ce que nous faisons

### about.what.p
- PT: Desenvolvemos internamente algoritmos e ferramentas de inteligência artificial que cruzam dados oficiais de preços, território e serviços com aquilo que cada pessoa procura, e mostram-lhe a região e a casa certas. A plataforma junta um mapa interativo do país, um concierge que encaminha cada pedido para parceiros licenciados, e a Maré, a nossa newsletter às terças e sextas. Pelo caminho, damos a conhecer municípios, escolas, hospitais, artistas, restaurantes e negócios portugueses a quem está a escolher onde viver.
- EN: We have developed our own algorithms and AI tools that match official data on prices, places and services with what each person is looking for, and show them the right region and the right home. The platform brings together an interactive map of the country, a concierge that sends each request to licensed partners, and Maré, our newsletter every Tuesday and Friday. Along the way, we introduce Portuguese municipalities, schools, hospitals, artists, restaurants and businesses to people choosing where to live.
- FR: Nous avons développé nos propres algorithmes et outils d'intelligence artificielle, qui croisent les données officielles sur les prix, le territoire et les services avec ce que chacun recherche, et lui montrent la bonne région et le bon logement. La plateforme réunit une carte interactive du pays, un concierge qui transmet chaque demande à des partenaires agréés, et Maré, notre newsletter du mardi et du vendredi. Au passage, nous faisons connaître des communes, écoles, hôpitaux, artistes, restaurants et entreprises portugais à ceux qui choisissent où vivre.

### about.motto.p
- PT: O nosso lema é "Portugal, de perto, mesmo de longe". A missão: tornar a compra de casa em Portugal clara e segura para quem vive fora, e levar mais pessoas e investimento a todo o país.
- EN: Our motto is "Portugal, up close, even from afar". Our mission: to make buying a home in Portugal clear and safe for people who live abroad, and to bring more people and investment to the whole country.
- FR: Notre devise : « Le Portugal, de près, même de loin ». Notre mission : rendre l'achat d'un logement au Portugal clair et sûr pour ceux qui vivent à l'étranger, et amener plus de monde et d'investissement dans tout le pays.

### press.h
- PT: Imprensa, instituições e parcerias
- EN: Press, institutions and partnerships
- FR: Presse, institutions et partenariats

### press.p
- PT: Para entrevistas, pedidos de dados, protocolos ou parcerias, escreva-nos:
- EN: For interviews, data requests, partnership agreements or collaborations, write to us:
- FR: Pour une interview, une demande de données, une convention ou un partenariat, écrivez-nous :

### press.subject
- PT: Imprensa e parcerias
- EN: Press and partnerships
- FR: Presse et partenariats

### s1.h
- PT: De onde vêm os números
- EN: Where the numbers come from
- FR: D'où viennent les chiffres

### s1.p
- PT: Cada número vem de uma fonte oficial: Finanças, Diário da República, Banco de Portugal, INE ou as autoridades do seu país, com a data da verificação. O que não confirmamos fica por publicar.
- EN: Every number comes from an official source. That means Portugal's tax authority, the official gazette, Banco de Portugal, the INE or the authorities where you live. We open the source and cite it. We say when we checked it. If we can't confirm it, we don't publish it.
- FR: Chaque chiffre vient d'une source officielle : le fisc portugais, le Diário da República, la Banque du Portugal, l'INE ou les autorités de votre pays. Nous ouvrons la source et la citons. Nous indiquons la date de vérification. Sans confirmation, nous ne publions pas.

### s2.h
- PT: Informação, sem aconselhamento
- EN: We describe, we don't advise
- FR: Nous décrivons, nous ne conseillons pas

### s2.p
- PT: Explicamos as regras e o caminho. Isto não constitui aconselhamento jurídico, fiscal ou financeiro: para o seu caso, confirme junto de um profissional. Podemos pô-lo em contacto com os nossos parceiros.
- EN: We explain the rules so you understand the path. This isn't legal, tax or financial advice: for your own case, talk to a professional. We can put you in touch with our partners.
- FR: Nous expliquons les règles pour que vous compreniez le chemin. Ce n'est pas un conseil juridique, fiscal ou financier : pour votre cas, adressez-vous à un professionnel. Nous pouvons vous mettre en relation avec nos partenaires.

### s3.h
- PT: Como ganhamos dinheiro
- EN: How we make money
- FR: Comment nous nous finançons

### s3.p
- PT: Os parceiros pagam um patrocínio anual fixo, nunca por contacto nem por venda. O conteúdo pago indica sempre o patrocinador.
- EN: Partners pay a flat yearly sponsorship. They never pay per lead or per sale. All paid content says it's sponsored, and by whom.
- FR: Les partenaires versent un parrainage annuel forfaitaire. Jamais une commission par contact ou par vente. Tout contenu payé indique qu'il est sponsorisé, et par qui.

### s4.h
- PT: Uma só agência imobiliária
- EN: One real-estate agency
- FR: Une seule agence immobilière

### s4.p
- PT: A Imóveis Portugal não faz mediação imobiliária. Os pedidos de compra ou venda seguem só para um consultor qualificado de uma mediadora imobiliária licenciada, patrocinadora do site.
- EN: Imóveis Portugal isn't a real-estate broker. Requests to buy or sell a home go only to a qualified advisor at a licensed real-estate brokerage, which is a sponsor.
- FR: Imóveis Portugal n'est pas un intermédiaire immobilier. Les demandes d'achat ou de vente vont uniquement à un conseiller qualifié d'une agence immobilière agréée, qui est sponsor du site.

### s5.h
- PT: Os seus dados
- EN: Your data
- FR: Vos données

### s5.p
- PT: Para receber a Maré basta um clique: a beehiiv envia as edições e cada email tem um link para cancelar. Não usamos cookies de publicidade nem de estatística. Os pedidos que envia seguem por email só para a Imóveis Portugal e para o consultor qualificado, e o site não os guarda.
- EN: You join Maré, our newsletter, with one click: beehiiv sends the issues, and every email has an unsubscribe link. We use no advertising or analytics cookies. The requests you send go by email only to Imóveis Portugal and the qualified advisor, and the site does not store them.
- FR: On s'inscrit à Maré, notre newsletter, d'un clic : beehiiv envoie les numéros et chaque e-mail contient un lien de désinscription. Aucun cookie publicitaire ni de mesure d'audience. Les demandes que vous envoyez partent par e-mail uniquement chez Imóveis Portugal et le conseiller qualifié, et le site ne les conserve pas.

### s6.h
- PT: Números de audiência
- EN: Audience numbers
- FR: Chiffres d'audience

### s6.p
- PT: Publicamos o número de leitores assim que o tivermos.
- EN: We'll publish reader numbers once they exist. Until then, we show none.
- FR: Nous publierons le nombre de lecteurs lorsqu'il existera. D'ici là, nous n'en affichons aucun.

### example.h
- PT: As fontes da página inicial, uma a uma
- EN: The home page sources, one by one
- FR: Les sources de la page d'accueil, une par une

### example.p
- PT: Os números da página inicial desta edição e as suas fontes oficiais:
- EN: The numbers on this edition's home page and the official sources behind them:
- FR: Les chiffres de la page d'accueil de cette édition et leurs sources officielles :

### contact.h
- PT: Correções
- EN: Corrections
- FR: Corrections

### contact.p
- PT: Se encontrar um erro, escreva-nos. Corrigimos e indicamos a data da correção:
- EN: Spotted a mistake? Write to us and we'll fix it, with the date of the correction:
- FR: Vous avez repéré une erreur ? Écrivez-nous, nous la corrigeons en indiquant la date :

## legal

### privacy.7.p
- PT: O site junta no seu dispositivo (armazenamento local) o que fez e respondeu: o país da edição, o orçamento, o uso, o financiamento e a entrada, o custo total e o IMT do simulador, as zonas e os empreendimentos que abriu ou guardou e quanto tempo passou em cada uma, o prazo, se já tem NIF e se pensa passar a residente. Fica no seu dispositivo até o apagar, e pode vê-lo e imprimi-lo em «O meu perfil de comprador». Quando envia um pedido ao Concierge, o perfil segue com ele, com a origem de cada linha, só para a Imóveis Portugal e para o consultor qualificado, porque o pediu (RGPD, art. 6.º, n.º 1, al. b)). Um promotor só o recebe se marcar a caixa, desmarcada, com o nome desse promotor (art. 6.º, n.º 1, al. a)), e pode retirar esse consentimento a qualquer momento. Para os relatórios aos promotores contamos só quantos perfis completos chegam por empreendimento, sem nenhum dado pessoal. O perfil é indicativo, não é uma avaliação de crédito e não serve para nenhuma decisão automatizada sobre si. Para orçamentos elevados, o consultor continua a pedir identificação e prova de fundos, como exige a Lei 83/2017.
- EN: The site gathers on your device (local storage) what you did and answered: your edition's country, budget, use, financing and down payment, the simulator's total cost and IMT, the areas and developments you opened or saved and how long you spent on each, your timeline, whether you have a NIF and whether you plan to become a resident. It stays on your device until you delete it, and you can see and print it under “My buyer profile”. When you send a Concierge request, the profile goes with it, with where each line came from, only to Imóveis Portugal and the qualified advisor, because you asked for it (GDPR art. 6(1)(b)). A developer receives it only if you tick the unticked box naming that developer (art. 6(1)(a)), and you can withdraw that consent at any time. For the developers' reports we only count how many complete profiles arrive per development, with no personal data. The profile is indicative, is not a credit assessment and is not used for any automated decision about you. For high budgets, the advisor still asks for identification and proof of funds, as Lei 83/2017 requires.
- FR: Le site rassemble sur votre appareil (stockage local) ce que vous avez fait et répondu : le pays de votre édition, le budget, l'usage, le financement et l'apport, le coût total et l'IMT du simulateur, les secteurs et programmes ouverts ou gardés et le temps passé sur chacun, l'échéance, si vous avez un NIF et si vous pensez devenir résident. Il reste sur votre appareil jusqu'à ce que vous l'effaciez, et vous pouvez le voir et l'imprimer dans « Mon profil d'acheteur ». Quand vous envoyez une demande au Concierge, le profil part avec elle, avec l'origine de chaque ligne, uniquement chez Imóveis Portugal et le conseiller qualifié, parce que vous l'avez demandé (RGPD, art. 6, par. 1, b)). Un promoteur ne le reçoit que si vous cochez la case, non cochée, à son nom (art. 6, par. 1, a)), et vous pouvez retirer cet accord à tout moment. Pour les rapports aux promoteurs, nous comptons seulement combien de profils complets arrivent par programme, sans aucune donnée personnelle. Le profil est indicatif, n'est pas une évaluation de crédit et ne sert à aucune décision automatisée vous concernant. Pour les budgets élevés, le conseiller demande toujours une pièce d'identité et la preuve des fonds, comme l'exige la Lei 83/2017.

### privacy.7.h
- PT: O seu perfil de comprador
- EN: Your buyer profile
- FR: Votre profil d'acheteur

### draft
- PT: Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.
- EN: Draft. Fields in square brackets will be filled in once the entity is set up.
- FR: Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.

### pending
- PT: Imóveis Portugal. A sociedade que publica este site está a ser registada em Portugal; o nome, a sede e o registo aparecem aqui antes do lançamento, a 1 de dezembro de 2026. Contacto: {email}.
- EN: Imóveis Portugal. The company that publishes this site is being registered in Portugal; its name, address and registration will appear here before launch on December 1, 2026. Contact: {email}.
- FR: Imóveis Portugal. La société qui publie ce site est en cours d'immatriculation au Portugal ; sa dénomination, son siège et son immatriculation figureront ici avant le lancement, le 1er décembre 2026. Contact : {email}.

### privacy.title
- PT: Privacidade
- EN: Privacy
- FR: Confidentialité

### privacy.h1
- PT: Política de privacidade
- EN: Privacy policy
- FR: Politique de confidentialité

### privacy.intro
- PT: Tratamos poucos dados, só para o que nos pede, e nunca os vendemos.
- EN: We collect little data, only for what you ask us to do, and we never sell it.
- FR: Nous collectons peu de données, uniquement pour ce que vous nous demandez, et nous ne les vendons jamais.

### privacy.1.h
- PT: Responsável
- EN: Controller
- FR: Responsable du traitement

### privacy.1.p
- PT: {entity}, {address}. Contacto: {email}.
- EN: {entity}, {address}. Contact: {email}.
- FR: {entity}, {address}. Contact : {email}.

### privacy.2.h
- PT: Que dados tratamos e porquê
- EN: What data we process and why
- FR: Données traitées et finalités

### privacy.2.p
- PT: Maré, a newsletter: o seu email, com o seu consentimento (RGPD, art. 6.º, n.º 1, al. a)), dado com um clique no formulário; a beehiiv envia as edições e cada email tem um link para cancelar. Pedidos de compra, de visita e do Concierge: nome, contactos e o que procura, para dar seguimento ao pedido que nos faz antes de qualquer contrato (art. 6.º, n.º 1, al. b)); recebem-nos a Imóveis Portugal e um consultor qualificado de uma mediadora imobiliária licenciada. Pedidos de parceria: dados profissionais, para responder (art. 6.º, n.º 1, al. b)). Pedidos a parceiros: categoria, país, pergunta e contacto, para responder ao seu pedido (art. 6.º, n.º 1, al. b)) e, se o autorizar, passar a um parceiro da categoria.
- EN: Maré, the newsletter: your email address, with your consent (GDPR, art. 6(1)(a)), given with one click on the form; beehiiv sends the issues and every email has an unsubscribe link. Buying, viewing and Concierge requests: name, contact details and what you're looking for, to act on the request you make before any contract (art. 6(1)(b)), sent to Imóveis Portugal and a qualified advisor at a licensed real-estate brokerage. Partner inquiries: business details, to reply (art. 6(1)(b)). Requests to a partner: category, country, question and contact details, to answer your request (art. 6(1)(b)) and, if you agree, to pass them to a partner in that category.
- FR: Maré, la newsletter : votre adresse e-mail, avec votre consentement (RGPD, art. 6, par. 1, a)), donné d'un clic dans le formulaire ; beehiiv envoie les numéros et chaque e-mail contient un lien de désinscription. Demandes d'achat, de visite et du Concierge : nom, coordonnées et critères, pour donner suite à la demande que vous faites avant tout contrat (art. 6, par. 1, b)), transmis à Imóveis Portugal et à un conseiller qualifié d'une agence immobilière agréée. Demandes de partenariat : données professionnelles, pour répondre (art. 6, par. 1, b)). Demandes à un partenaire : catégorie, pays, question et coordonnées, pour répondre à votre demande (art. 6, par. 1, b)) et, avec votre accord, les transmettre à un partenaire de la catégorie.

### privacy.3.h
- PT: Quem recebe os dados
- EN: Who receives the data
- FR: Destinataires

### privacy.3.p
- PT: A Imóveis Portugal e um consultor qualificado de uma mediadora imobiliária licenciada recebem os pedidos que envia pelo site (compra, visita, Concierge e pedidos a parceiros), por email, através do Cloudflare Email Routing; o site não os guarda. O parceiro da categoria escolhida, só para pedidos a parceiros e com o seu consentimento. O promotor de um empreendimento, só se marcar a caixa com o nome dele: recebe por nós o seu perfil de comprador. Prestadores que tratam dados por nossa conta: beehiiv (envio da Maré, EUA, com garantias adequadas para a transferência), Tally (formulários, UE), Cloudflare (alojamento, envio dos pedidos por email e estatísticas sem cookies) e Cal.com (marcação de chamadas).
- EN: Imóveis Portugal and a qualified advisor at a licensed real-estate brokerage receive the requests you send on the site (buying, viewing, Concierge and requests to a partner), by email, through Cloudflare Email Routing; the site does not store them. The partner in the chosen category, only for requests to a partner and with your consent. A development's developer, only if you tick the box with its name: it receives your buyer profile through us. Processors acting for us: beehiiv (Maré, the newsletter, USA, with appropriate safeguards for the transfer), Tally (forms, EU), Cloudflare (hosting, sending requests by email and cookie-free statistics) and Cal.com (call booking).
- FR: Imóveis Portugal et un conseiller qualifié d'une agence immobilière agréée reçoivent les demandes que vous envoyez sur le site (achat, visite, Concierge et demandes à un partenaire), par e-mail, via Cloudflare Email Routing ; le site ne les conserve pas. Le partenaire de la catégorie choisie, uniquement pour les demandes à un partenaire et avec votre accord. Le promoteur d'un programme, uniquement si vous cochez la case à son nom : il reçoit votre profil d'acheteur par notre intermédiaire. Sous-traitants : beehiiv (Maré, la newsletter, États-Unis, avec garanties appropriées pour le transfert), Tally (formulaires, UE), Cloudflare (hébergement, envoi des demandes par e-mail et statistiques sans cookies) et Cal.com (prise de rendez-vous).

### privacy.4.h
- PT: Durante quanto tempo
- EN: How long we keep it
- FR: Durée de conservation

### privacy.4.p
- PT: Maré: até cancelar a subscrição. Pedidos de compra e pedidos a parceiros: 12 meses. Pedidos de parceria: durante a relação comercial e o prazo legal aplicável.
- EN: Maré, the newsletter: until you unsubscribe. Buying requests and requests to a partner: 12 months. Partner inquiries: for the business relationship and the applicable legal period.
- FR: Maré, la newsletter : jusqu'à votre désinscription. Demandes d'achat et demandes à un partenaire : 12 mois. Demandes de partenariat : pendant la relation commerciale et la durée légale applicable.

### privacy.5.h
- PT: Os seus direitos
- EN: Your rights
- FR: Vos droits

### privacy.5.p
- PT: Acesso, retificação, apagamento, oposição, limitação, portabilidade e retirada do consentimento a qualquer momento, escrevendo para o contacto acima. Pode também apresentar queixa à autoridade de proteção de dados do seu país (por exemplo, a CNPD em Portugal ou no Luxemburgo).
- EN: Access, correction, deletion, objection, restriction, portability and withdrawal of consent at any time, by writing to the contact above. You can also file a complaint with the data protection authority of your country, or with Portugal's CNPD.
- FR: Accès, rectification, effacement, opposition, limitation, portabilité et retrait du consentement à tout moment, en écrivant au contact ci-dessus. Vous pouvez aussi saisir l'autorité de protection des données de votre pays (CNIL en France, CNPD au Luxembourg, PFPDT en Suisse).

### privacy.6.h
- PT: Cookies
- EN: Cookies
- FR: Cookies

### privacy.6.p
- PT: Não usamos cookies de publicidade nem de estatística. A língua e a edição que escolhe ficam só no seu navegador (armazenamento local), sem cookies. Os formulários incorporados podem usar cookies técnicos do serviço. Alguns empreendimentos mostram um filme do YouTube e uma visita 3D de property-sales-engine.com: só carregam quando toca em «Ver o filme» ou «Abrir a visita 3D», e a partir daí esses sites podem guardar os seus próprios cookies, segundo as políticas deles. Sem esse toque, nada deles é carregado. As respostas do Concierge que não dizem quem é (o que procura, orçamento, sítio e horas escolhidas) ficam também no seu dispositivo durante 24 horas, para não se perderem se fechar a página, e são apagadas quando envia o pedido; o nome, o email e o telefone nunca ficam.
- EN: We use no advertising or analytics cookies. The language and edition you choose stay only in your browser (local storage), without cookies. Embedded forms may use technical cookies from their service. Some developments show a YouTube film and a 3D tour from property-sales-engine.com. They load only when you tap “Play the film” or “Open the 3D tour”; from then on those sites may set their own cookies, under their own policies. Without that tap, nothing from them loads. Concierge answers that say nothing about who you are (what you need, budget, place and chosen times) are also kept on your device for 24 hours, so closing the page does not lose them, and are deleted when you send the request; your name, email and phone never are.
- FR: Aucun cookie publicitaire ni de mesure d'audience. La langue et l'édition choisies restent uniquement dans votre navigateur (stockage local), sans cookie. Les formulaires intégrés peuvent utiliser des cookies techniques de leur service. Certains programmes proposent un film YouTube et une visite 3D de property-sales-engine.com. Ils ne se chargent que lorsque vous touchez « Voir le film » ou « Ouvrir la visite 3D » ; ces sites peuvent alors déposer leurs propres cookies, selon leurs propres politiques. Sans ce geste, rien d'eux n'est chargé. Les réponses au Concierge qui ne disent rien de vous (votre besoin, budget, lieu et horaires choisis) restent aussi sur votre appareil pendant 24 heures, pour ne pas les perdre si vous fermez la page, et sont effacées à l'envoi de la demande ; vos nom, e-mail et téléphone, jamais.

### legal.title
- PT: Aviso legal
- EN: Legal notice
- FR: Mentions légales

### legal.h1
- PT: Aviso legal
- EN: Legal notice
- FR: Mentions légales

### legal.intro
- PT: Quem publica a Imóveis Portugal e em que condições.
- EN: Who publishes Imóveis Portugal, and on what terms.
- FR: Qui publie Imóveis Portugal, et à quelles conditions.

### legal.1.h
- PT: Editor
- EN: Publisher
- FR: Éditeur

### legal.1.p
- PT: {entity}, {address}. Registo: {register}. IVA: {vat}. Contacto: {email}.
- EN: {entity}, {address}. Registration: {register}. VAT: {vat}. Contact: {email}.
- FR: {entity}, {address}. Immatriculation : {register}. TVA : {vat}. Contact : {email}.

### legal.2.h
- PT: Alojamento
- EN: Hosting
- FR: Hébergeur

### legal.2.p
- PT: Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, EUA.
- EN: Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.
- FR: Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, États-Unis.

### legal.3.h
- PT: Conteúdo
- EN: Content
- FR: Contenu

### legal.3.p
- PT: Os artigos são informativos e não substituem aconselhamento jurídico, fiscal ou financeiro. O conteúdo patrocinado é sempre identificado.
- EN: Articles are for information only and don't replace legal, tax or financial advice. Sponsored content is always labeled.
- FR: Les articles sont informatifs et ne remplacent pas un conseil juridique, fiscal ou financier. Le contenu sponsorisé est toujours signalé.

### legal.4.h
- PT: Pedidos de compra e venda
- EN: Buying and selling requests
- FR: Demandes d'achat et de vente

### legal.4.p
- PT: Seguem para um consultor qualificado de uma mediadora imobiliária licenciada. A Imóveis Portugal não faz mediação imobiliária.
- EN: They go to a qualified advisor at a licensed real-estate brokerage. Imóveis Portugal does not act as a real-estate broker.
- FR: Elles sont transmises à un conseiller qualifié d'une agence immobilière agréée. Imóveis Portugal n'exerce pas d'activité d'intermédiation immobilière.

## root

### h.pt
- PT: Comprar casa em Portugal a partir de onde vive.
- EN: Comprar casa em Portugal a partir de onde vive.
- FR: Comprar casa em Portugal a partir de onde vive.

### h.en
- PT: Buying a home in Portugal from wherever you live.
- EN: Buying a home in Portugal from wherever you live.
- FR: Buying a home in Portugal from wherever you live.

### h.fr
- PT: Acheter au Portugal depuis là où vous vivez.
- EN: Acheter au Portugal depuis là où vous vivez.
- FR: Acheter au Portugal depuis là où vous vivez.

### notfound
- PT: Página não encontrada
- EN: Page not found
- FR: Page introuvable

### notfound.p
- PT: Este endereço não existe ou mudou.
- EN: This address doesn't exist or has moved.
- FR: Cette adresse n'existe pas ou a changé.

### notfound.home
- PT: Voltar ao início
- EN: Back to the home page
- FR: Retour à l'accueil

## sims

### local
- PT: cerca de {local}, à taxa de referência do BCE
- EN: about {local} at the ECB reference rate
- FR: environ {local} au taux de référence de la BCE

### pdf
- PT: Guardar em PDF
- EN: Save as PDF
- FR: Enregistrer en PDF

### step.of
- PT: {i} de {n}
- EN: {i} of {n}
- FR: {i} sur {n}

### step.done
- PT: Ver o resultado
- EN: See the result
- FR: Voir le résultat

### step.back
- PT: Voltar
- EN: Back
- FR: Retour

### step.next
- PT: Seguinte
- EN: Next
- FR: Suivant

### q.imirate
- PT: Que taxa aplica o município?
- EN: What rate does the municipality apply?
- FR: Quel taux applique la commune ?

### q.vpt
- PT: Qual é o valor patrimonial tributário?
- EN: What is the tax value (VPT)?
- FR: Quelle est la valeur fiscale (VPT) ?

### q.mgmt
- PT: Que parte da renda vai para a gestão?
- EN: What share of the rent goes to management?
- FR: Quelle part du loyer va à la gestion ?

### q.insurance
- PT: Quanto custa o seguro por ano?
- EN: What does insurance cost a year?
- FR: Combien coûte l'assurance par an ?

### q.condo
- PT: Quanto é o condomínio por mês?
- EN: What is the monthly service charge?
- FR: Quelles sont les charges de copropriété par mois ?

### q.imi
- PT: Quanto paga de IMI por ano?
- EN: How much IMI do you pay a year?
- FR: Combien d'IMI payez-vous par an ?

### q.rent
- PT: Que renda mensal espera?
- EN: What monthly rent do you expect?
- FR: Quel loyer mensuel attendez-vous ?

### q.salecosts
- PT: Quanto custa a venda?
- EN: What does the sale cost?
- FR: Combien coûte la vente ?

### q.works
- PT: Que obras com fatura fez na casa?
- EN: What invoiced improvements did you make?
- FR: Quels travaux facturés avez-vous réalisés ?

### q.buycosts
- PT: Quanto pagou de IMT, selo e escritura?
- EN: What did you pay in IMT, stamp duty and deed?
- FR: Combien avez-vous payé d'IMT, de timbre et d'acte ?

### q.buy
- PT: Por quanto comprou?
- EN: What did you buy it for?
- FR: À quel prix l'avez-vous acheté ?

### q.sale
- PT: Por quanto vai vender?
- EN: What will you sell for?
- FR: À quel prix allez-vous vendre ?

### q.instalments
- PT: Quanto somam todas as prestações, com a nova?
- EN: What do all your loan payments add up to, with the new one?
- FR: Combien font toutes vos mensualités, avec la nouvelle ?

### q.debts
- PT: Que outras prestações paga por mês?
- EN: What other loan payments do you make each month?
- FR: Quelles autres mensualités payez-vous ?

### q.income
- PT: Qual é o rendimento líquido mensal do seu agregado?
- EN: What is your household's net monthly income?
- FR: Quel est le revenu net mensuel de votre foyer ?

### q.rate
- PT: Que taxa de juro anual quer usar?
- EN: Which annual interest rate should we use?
- FR: Quel taux d'intérêt annuel retenir ?

### q.years
- PT: Em quantos anos quer pagar?
- EN: Over how many years?
- FR: Sur combien d'années ?

### q.deposit
- PT: Quanto vai dar de entrada?
- EN: How much will you put down?
- FR: Quel apport prévoyez-vous ?

### q.price
- PT: Qual é o preço da casa?
- EN: What is the price of the home?
- FR: Quel est le prix du bien ?

### map.name
- PT: O mapa: quanto espaço compra o seu orçamento
- EN: The map: how much space your budget buys
- FR: La carte : l'espace que votre budget permet

### gains.note
- PT: Desde 2023, metade da mais-valia conta para o IRS às taxas gerais, também para não residentes. A taxa depende do resto do rendimento; o país onde vive pode também tributar a venda. Sem os coeficientes de correção monetária.
- EN: Since 2023, half of the gain counts for income tax and the general rates apply, also to non-residents. The rate can be higher depending on the rest of your income, and the country where you live may also tax the sale. Inflation correction coefficients are not included.
- FR: Depuis 2023, la moitié de la plus-value est retenue pour l'impôt et les taux généraux s'appliquent, aussi aux non-résidents. Le taux peut être plus élevé selon le reste de vos revenus, et votre pays de résidence peut aussi imposer la vente. Coefficients de correction monétaire non inclus.

### r.taxIfOnly
- PT: IRS, se fosse o único rendimento em Portugal
- EN: Tax if it were your only income in Portugal
- FR: Impôt si c'était votre seul revenu au Portugal

### r.taxable
- PT: Parte que conta (50%)
- EN: Part that counts (50%)
- FR: Part retenue (50 %)

### r.gain
- PT: Mais-valia
- EN: Gain
- FR: Plus-value

### f.salecosts
- PT: Custos da venda (€)
- EN: Sale costs (€)
- FR: Frais de vente (€)

### f.works
- PT: Obras de valorização com fatura (€)
- EN: Improvement works with invoices (€)
- FR: Travaux de valorisation facturés (€)

### f.buycosts
- PT: Custos da compra: IMT, selo, escritura (€)
- EN: Purchase costs: IMT, stamp duty, deed (€)
- FR: Frais d'achat : IMT, timbre, acte (€)

### f.buy
- PT: Preço de compra (€)
- EN: Purchase price (€)
- FR: Prix d'achat (€)

### f.sale
- PT: Preço de venda (€)
- EN: Sale price (€)
- FR: Prix de vente (€)

### gains.p
- PT: A mais-valia na venda da casa e a parte que conta para o IRS.
- EN: The gain on selling a home in Portugal and the part that counts for Portuguese income tax.
- FR: La plus-value à la vente d'un bien au Portugal et la part retenue pour l'impôt portugais.

### gains.name
- PT: Mais-valias para não residentes
- EN: Capital gains for non-residents
- FR: Plus-values pour non-résidents

### afford.note
- PT: Francos, dólares, reais e shekels à taxa de referência do BCE de 23 de outubro de 2026. Cada banco usa a sua taxa e pode descontar o risco cambial. O custo total inclui os impostos da compra.
- EN: Income in francs, dollars, reais or shekels is converted at the ECB reference rate of 23 October 2026. Banks apply their own rate and may discount for currency risk. Purchase taxes are not included: see the total cost.
- FR: Le revenu en francs, dollars, reais ou shekels est converti au taux de référence de la BCE du 23 octobre 2026. Les banques appliquent leur propre taux et peuvent tenir compte du risque de change. Impôts de l'achat non inclus : voir le coût total.

### afford.byincome
- PT: Limite pelo rendimento: o total das prestações não pode passar 45% do rendimento líquido.
- EN: Your income is the limit: the monthly payment cannot exceed 45% of net income.
- FR: C'est le revenu qui limite : la mensualité ne peut dépasser 45 % du revenu net.

### afford.bydeposit
- PT: Limite pela entrada: os bancos financiam até 80% (90% na habitação própria e permanente); a entrada cobre o resto.
- EN: Your deposit is the limit: banks lend up to 80% (90% for an own permanent home), so the deposit must cover the rest.
- FR: C'est l'apport qui limite : les banques financent jusqu'à 80 % (90 % pour une résidence principale), l'apport doit couvrir le reste.

### r.price
- PT: Preço máximo da casa
- EN: Highest home price
- FR: Prix maximum du bien

### r.maxLoan
- PT: Crédito máximo
- EN: Highest loan
- FR: Crédit maximum

### r.maxInst
- PT: Prestação máxima
- EN: Highest monthly payment
- FR: Mensualité maximale

### f.debts
- PT: Outras prestações mensais
- EN: Other monthly loan payments
- FR: Autres mensualités

### afford.p
- PT: O preço máximo para o seu rendimento, a entrada e a taxa, dentro dos limites do Banco de Portugal.
- EN: The highest price from the income you earn where you live, your deposit and the rate, within Banco de Portugal's limits.
- FR: Le prix maximum à partir du revenu perçu là où vous vivez, de l'apport et du taux, dans les limites du Banco de Portugal.

### afford.name
- PT: A casa ao seu alcance
- EN: What you can afford
- FR: Le bien à votre portée

### dsti.note
- PT: Desde 1 de agosto de 2026, o Banco de Portugal limita a 45% do rendimento líquido as prestações de todos os créditos de quem pede um novo. Cada banco pode passar o limite em até 10% do crédito que concede por ano.
- EN: Since 1 August 2026, Banco de Portugal caps all loan payments of a new borrower at 45% of net income. Each bank may exceed the cap for up to 10% of the credit it grants each year.
- FR: Depuis le 1er août 2026, le Banco de Portugal limite l'ensemble des mensualités d'un nouvel emprunteur à 45 % du revenu net. Chaque banque peut dépasser la limite pour 10 % au plus du crédit accordé chaque année.

### dsti.over
- PT: Acima do limite: os bancos só podem passar os 45% numa pequena parte dos créditos.
- EN: Above the limit: banks may exceed 45% only for a small share of the loans they grant.
- FR: Au-dessus de la limite : les banques ne peuvent dépasser 45 % que pour une petite part des crédits accordés.

### r.room
- PT: Margem até ao limite, por mês
- EN: Room up to the limit, per month
- FR: Marge jusqu'à la limite, par mois

### r.limit
- PT: Limite do Banco de Portugal
- EN: Banco de Portugal limit
- FR: Limite du Banco de Portugal

### r.ratio
- PT: Taxa de esforço
- EN: Debt-to-income ratio
- FR: Taux d'endettement

### f.instalments
- PT: Todas as prestações mensais, incluindo a nova
- EN: All monthly loan payments, including the new one
- FR: Toutes les mensualités, y compris la nouvelle

### f.income
- PT: Rendimento líquido mensal
- EN: Net monthly income
- FR: Revenu net mensuel

### dsti.p
- PT: A parte do rendimento líquido que vai para prestações, face ao limite do Banco de Portugal.
- EN: How much of your net income goes on loan payments, compared with Banco de Portugal's limit.
- FR: La part de votre revenu net consacrée aux mensualités, comparée à la limite du Banco de Portugal.

### dsti.name
- PT: Taxa de esforço
- EN: Debt-to-income ratio
- FR: Taux d'endettement

### imi.note
- PT: Cada município fixa a taxa todos os anos, dentro do intervalo legal. Acima de 600 000 € de valor patrimonial por pessoa, soma-se o adicional ao IMI (AIMI).
- EN: Each municipality sets its rate every year within the legal range. Above €600,000 of tax value per person there is also the additional IMI (AIMI).
- FR: Chaque commune fixe son taux chaque année dans la fourchette légale. Au-delà de 600 000 € de valeur fiscale par personne s'ajoute l'IMI additionnel (AIMI).

### imi.range
- PT: A taxa tem de estar entre 0,3% e 0,45%.
- EN: The rate must be between 0.3% and 0.45%.
- FR: Le taux doit être compris entre 0,3 % et 0,45 %.

### r.imi
- PT: IMI por ano
- EN: IMI per year
- FR: IMI par an

### f.imirate
- PT: Taxa do município (%)
- EN: Municipal rate (%)
- FR: Taux de la commune (%)

### vpt.hint
- PT: Está na caderneta predial. Costuma ser mais baixo do que o preço.
- EN: It is on the home's property tax record (caderneta predial). It is usually lower than the price.
- FR: Elle figure sur la caderneta predial du bien. Elle est en général inférieure au prix.

### f.vpt
- PT: Valor patrimonial tributário (€)
- EN: Tax value (VPT, €)
- FR: Valeur fiscale (VPT, €)

### imi.p
- PT: O imposto municipal anual, sobre o valor patrimonial.
- EN: The municipal tax you pay on the home every year, based on its tax value.
- FR: L'impôt municipal payé chaque année sur le bien, à partir de sa valeur fiscale.

### imi.name
- PT: IMI
- EN: Property tax (IMI)
- FR: Taxe foncière (IMI)

### imt.note
- PT: Residentes pagam IMT por escalões (habitação própria e permanente ou outra). Não residentes pagam 7,5% sobre o valor total, salvo exceções: ter sido residente fiscal, passar a sê-lo nos dois anos seguintes, ou arrendar com renda dentro dos limites legais.
- EN: Residents pay IMT by bracket (own permanent home or other). Non-residents pay 7.5% on the full value, with exceptions: having been a tax resident, becoming one within two years, or letting the home at a rent within the legal caps.
- FR: Les résidents paient l'IMT par tranches (résidence principale ou autre). Les non-résidents paient 7,5 % sur la valeur totale, sauf exceptions : avoir été résident fiscal, le devenir dans les deux ans, ou louer le bien à un loyer dans les plafonds légaux.

### r.taxes
- PT: Impostos da compra
- EN: Purchase taxes
- FR: Impôts de l'achat

### imt.p
- PT: Os dois impostos da compra, para residentes e não residentes, com as tabelas de 2026.
- EN: The two purchase taxes, for residents and non-residents, with the 2026 tables.
- FR: Les deux impôts de l'achat, pour résidents et non-résidents, avec les barèmes 2026.

### imt.name
- PT: IMT e imposto do selo
- EN: Transfer tax and stamp duty
- FR: IMT et droit de timbre

### title
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### lede
- PT: Quanto custa comprar, com as regras de 2026.
- EN: What buying costs, under the 2026 rules.
- FR: Ce que coûte l'achat, règles 2026.

### estimate
- PT: Estimativa, não é aconselhamento fiscal nem proposta de crédito. Não guardamos o que escreve.
- EN: An estimate, not tax advice or a credit offer. We don't store what you type.
- FR: Estimation, ni conseil fiscal ni offre de crédit. Nous ne conservons pas ce que vous saisissez.

### result.h
- PT: Resultado
- EN: Result
- FR: Résultat

### share
- PT: Copiar a ligação
- EN: Copy the link with these figures
- FR: Copier le lien avec ces chiffres

### copied
- PT: Ligação copiada
- EN: Link copied
- FR: Lien copié

### yes
- PT: Sim
- EN: Yes
- FR: Oui

### no
- PT: Não
- EN: No
- FR: Non

### others.h
- PT: Outros simuladores
- EN: Other calculators
- FR: Autres simulateurs

### next.h
- PT: O passo seguinte
- EN: The next step
- FR: L'étape suivante

### sponsor
- PT: Simulador oferecido por {name} · intermediário de crédito registado no Banco de Portugal n.º {bdp} · patrocinado
- EN: Calculator offered by {name} · credit intermediary registered with Banco de Portugal no. {bdp} · sponsored
- FR: Simulateur offert par {name} · intermédiaire de crédit enregistré auprès du Banco de Portugal sous le n° {bdp} · sponsorisé

### credit.q
- PT: Quer que {name} analise o seu caso e compare bancos?
- EN: Would you like {name} to look at your case and compare banks?
- FR: Voulez-vous que {name} étudie votre dossier et compare les banques ?

### credit.consent
- PT: Aceito que os dados deste pedido sejam enviados apenas a {name} (intermediário de crédito, Banco de Portugal n.º {bdp}) para me contactar sobre ele. Posso retirar o consentimento a qualquer momento.
- EN: I agree that the details of this request are sent only to {name} (credit intermediary, Banco de Portugal no. {bdp}) to contact me about it. I can withdraw my consent at any time.
- FR: J'accepte que les données de cette demande soient envoyées uniquement à {name} (intermédiaire de crédit, Banco de Portugal n° {bdp}) pour me contacter à ce sujet. Je peux retirer mon consentement à tout moment.

### credit.send
- PT: Pedir a análise
- EN: Send the request
- FR: Envoyer la demande

### credit.subject
- PT: Pedido de análise de crédito
- EN: Mortgage review request
- FR: Demande d'étude de crédit

### credit.privacy
- PT: Recebe um email para confirmar o pedido. Como tratamos os seus dados:
- EN: You will get an email to confirm the request. How we handle your data:
- FR: Vous recevrez un email pour confirmer la demande. Comment nous traitons vos données :

### credit.none
- PT: Um parceiro de crédito compara propostas de vários bancos.
- EN: To compare offers from several banks, talk to a credit partner.
- FR: Pour comparer les offres de plusieurs banques, parlez à un partenaire crédit.

### tax.p
- PT: O imposto no país onde vive depende do seu caso. Um consultor fiscal confirma as contas.
- EN: Tax where you live depends on your case. A tax adviser can check the numbers.
- FR: L'impôt dans votre pays de résidence dépend de votre situation. Un conseiller fiscal vérifie les chiffres.

### agency.p
- PT: Com um preço em mente, um consultor qualificado mostra-lhe casas nesse valor.
- EN: If you already have a price in mind, a qualified advisor can show you homes at that price.
- FR: Si vous avez déjà un prix en tête, un conseiller qualifié vous montre des biens à ce prix.

### agency.cta
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### plan.cta
- PT: Receber o plano em PDF · 5,99 €
- EN: Purchase plan as a PDF, with three mortgage scenarios and the document checklist · €5.99
- FR: Plan d'achat en PDF, avec trois scénarios de crédit et la liste des documents · 5,99 €

### source
- PT: Fonte
- EN: Source
- FR: Source

### cost.name
- PT: Custo total da compra
- EN: Total purchase cost
- FR: Coût total de l'achat

### cost.p
- PT: IMT, imposto do selo e escritura para o preço indicado.
- EN: Property transfer tax, stamp duty and deed costs for the price you enter.
- FR: IMT, droit de timbre et acte pour le prix que vous indiquez.

### f.price
- PT: Preço da casa (€)
- EN: Home price (€)
- FR: Prix du bien (€)

### f.own
- PT: Vai ser a sua habitação própria e permanente?
- EN: Will it be your own permanent home?
- FR: Sera-ce votre résidence principale ?

### f.resident
- PT: É residente fiscal em Portugal?
- EN: Are you a tax resident of Portugal?
- FR: Êtes-vous résident fiscal au Portugal ?

### f.mortgage
- PT: Vai pedir crédito?
- EN: Will you take a mortgage?
- FR: Allez-vous emprunter ?

### r.imt
- PT: IMT
- EN: Property transfer tax (IMT)
- FR: IMT (droits de mutation)

### r.is
- PT: Imposto do selo (0,8%)
- EN: Stamp duty (0.8%)
- FR: Droit de timbre (0,8 %)

### r.deed
- PT: Escritura e registo (Casa Pronta)
- EN: Deed and registration (Casa Pronta, the state's one-stop desk)
- FR: Acte et enregistrement (Casa Pronta, le guichet unique de l'État)

### r.extra
- PT: Impostos, escritura e registo
- EN: Taxes, deed and registration
- FR: Impôts, acte et enregistrement

### r.total
- PT: Total a pagar
- EN: Total to pay
- FR: Total à payer

### cost.note
- PT: Para não residentes fiscais, o IMT tem a taxa única de 7,5%, salvo exceções, como passar a residente nos dois anos seguintes. Sem advogado nem avaliação bancária.
- EN: If you're not a tax resident, IMT is a flat 7.5%, with exceptions such as becoming resident within two years. Lawyer and bank valuation are not included.
- FR: Si vous n'êtes pas résident fiscal, l'IMT est au taux unique de 7,5 %, sauf exceptions, comme devenir résident dans les deux ans. Avocat et expertise bancaire non inclus.

### payment.name
- PT: Prestação do crédito
- EN: Monthly mortgage payment
- FR: Mensualité du crédit

### payment.p
- PT: A prestação mensal para o preço, a entrada, o prazo e a taxa indicados.
- EN: The monthly payment for the price, deposit, term and rate you enter.
- FR: La mensualité pour le prix, l'apport, la durée et le taux que vous indiquez.

### f.deposit
- PT: Entrada (€)
- EN: Deposit (€)
- FR: Apport (€)

### f.years
- PT: Prazo (anos)
- EN: Term (years)
- FR: Durée (ans)

### f.rate
- PT: Taxa de juro anual (%)
- EN: Annual interest rate (%)
- FR: Taux d'intérêt annuel (%)

### rate.hint
- PT: Média dos novos créditos à habitação em Portugal em {month}: {rate}% (Banco de Portugal). Pode alterar.
- EN: Average rate on new mortgages in Portugal in {month}: {rate}% (Banco de Portugal). You can change it.
- FR: Taux moyen des nouveaux crédits immobiliers au Portugal en {month} : {rate} % (Banco de Portugal). Vous pouvez le modifier.

### r.loan
- PT: Montante do crédito
- EN: Loan amount
- FR: Montant emprunté

### r.ltv
- PT: Financiamento sobre o preço
- EN: Loan to price
- FR: Financement sur le prix

### r.monthly
- PT: Prestação mensal
- EN: Monthly payment
- FR: Mensualité

### r.interest
- PT: Juros ao longo do prazo
- EN: Interest over the term
- FR: Intérêts sur la durée

### r.stamp
- PT: Imposto do selo sobre o crédito (0,6%)
- EN: Stamp duty on the loan (0.6%)
- FR: Droit de timbre sur le prêt (0,6 %)

### ltv.over
- PT: Acima do limite do Banco de Portugal para esta casa: {cap}% do valor.
- EN: Above Banco de Portugal's limit for this home: {cap}% of its value.
- FR: Au-dessus de la limite du Banco de Portugal pour ce bien : {cap} % de sa valeur.

### payment.note
- PT: Os bancos financiam até 90% do valor da habitação própria e permanente e até 80% das outras casas. O total das prestações não pode passar 45% do rendimento líquido (Banco de Portugal, desde 1 de agosto de 2026). Taxa nominal, sem seguros nem comissões: não é uma TAEG.
- EN: Banks lend up to 90% of the value of an own permanent home and up to 80% for other homes, and all loan payments together cannot exceed 45% of net income (Banco de Portugal, since 1 August 2026). Nominal rate, without insurance or fees: not an APR.
- FR: Les banques financent jusqu'à 90 % de la valeur d'une résidence principale et jusqu'à 80 % des autres biens, et l'ensemble des mensualités ne peut dépasser 45 % du revenu net (Banco de Portugal, depuis le 1er août 2026). Taux nominal, hors assurances et frais : ce n'est pas un TAEG.

### rent.name
- PT: Rendimento do arrendamento
- EN: Rental yield
- FR: Rendement locatif

### rent.p
- PT: Rentabilidade bruta e líquida da casa arrendada, com o imposto para não residentes.
- EN: Gross and net yield on a rented home, with the tax for non-residents.
- FR: Rendement brut et net d'un bien loué, avec l'impôt des non-résidents.

### f.rent
- PT: Renda mensal (€)
- EN: Monthly rent (€)
- FR: Loyer mensuel (€)

### f.imi
- PT: IMI por ano (€)
- EN: Property tax (IMI) per year (€)
- FR: Taxe foncière (IMI) par an (€)

### f.condo
- PT: Condomínio por mês (€)
- EN: Building charges per month (€)
- FR: Charges de copropriété par mois (€)

### f.insurance
- PT: Seguro por ano (€)
- EN: Insurance per year (€)
- FR: Assurance par an (€)

### f.mgmt
- PT: Gestão (% da renda)
- EN: Management (% of rent)
- FR: Gestion (% du loyer)

### imi.hint
- PT: O IMI vai de 0,3% a 0,45% do valor patrimonial tributário, conforme o município.
- EN: IMI ranges from 0.3% to 0.45% of the tax value, depending on the municipality.
- FR: L'IMI va de 0,3 % à 0,45 % de la valeur fiscale, selon la commune.

### r.gross
- PT: Rendas por ano
- EN: Rent per year
- FR: Loyers par an

### r.costs
- PT: Despesas por ano
- EN: Costs per year
- FR: Charges par an

### r.net
- PT: Líquido antes de imposto
- EN: Net before tax
- FR: Net avant impôt

### r.tax
- PT: Imposto em Portugal (25%)
- EN: Tax in Portugal (25%)
- FR: Impôt au Portugal (25 %)

### r.after
- PT: Líquido depois de imposto
- EN: Net after tax
- FR: Net après impôt

### r.grossYield
- PT: Rentabilidade bruta
- EN: Gross yield
- FR: Rendement brut

### r.netYield
- PT: Rentabilidade líquida
- EN: Net yield
- FR: Rendement net

### r.afterYield
- PT: Rentabilidade depois de imposto
- EN: Yield after tax
- FR: Rendement après impôt

### rent.note
- PT: Não residentes pagam 25% sobre o rendimento líquido do arrendamento habitacional, menos em contratos de cinco anos ou mais. O país onde vive pode também tributar este rendimento.
- EN: Non-residents pay 25% on net income from residential lettings, with reductions for leases of five years or more. The country where you live may also tax this income.
- FR: Les non-résidents paient 25 % sur le revenu net de la location d'habitation, avec des réductions pour les baux de cinq ans ou plus. Votre pays de résidence peut aussi imposer ce revenu.

## casa

### more.h
- PT: Para ler e preparar
- EN: To read and prepare
- FR: À lire pour préparer

### title
- PT: Comprar a partir de fora, passo a passo
- EN: Buying from abroad, step by step
- FR: Acheter depuis l'étranger, pas à pas

### lede
- PT: Casa, crédito, seguros, advogado, impostos e envio do dinheiro: um só pedido, e cada parte segue apenas para o parceiro que autorizar.
- EN: Home, mortgage, insurance, lawyer, tax and sending the money: one request, and each part goes only to the partner you authorise.
- FR: Bien, crédit, assurances, avocat, impôts et envoi de l'argent : une seule demande, et chaque partie va uniquement au partenaire que vous autorisez.

### s.agency.h
- PT: Ver casas sem viajar
- EN: Seeing homes without travelling
- FR: Voir des biens sans voyager

### s.agency.p
- PT: Um consultor qualificado de uma mediadora licenciada procura casas no seu orçamento e mostra-as por videochamada, através de um familiar ou ao vivo.
- EN: A qualified advisor at a licensed brokerage looks for homes in your budget and shows them by video call, through a relative or in person.
- FR: Un conseiller qualifié d'une agence agréée cherche des biens dans votre budget. Il vous les montre en appel vidéo, par un proche ou sur place.

### s.credit.h
- PT: Um crédito a partir de fora
- EN: A mortgage from abroad
- FR: Un crédit depuis l'étranger

### s.credit.p
- PT: Um intermediário de crédito registado no Banco de Portugal compara bancos que emprestam a não residentes.
- EN: A credit intermediary registered with Banco de Portugal compares banks that lend to non-residents.
- FR: Un intermédiaire de crédit enregistré auprès du Banco de Portugal compare les banques qui prêtent aux non-résidents.

### s.insurance.h
- PT: Os seguros
- EN: Insurance
- FR: Les assurances

### s.insurance.p
- PT: Seguro de vida para o crédito e multirriscos para a casa, com uma seguradora registada na ASF.
- EN: Life cover for the mortgage and home insurance, with an insurer registered with the ASF.
- FR: Assurance-vie pour le crédit et multirisque habitation, avec un assureur enregistré auprès de l'ASF.

### s.lawyer.h
- PT: O contrato, a procuração e os impostos
- EN: The contract, the power of attorney and tax
- FR: Le contrat, la procuration et les impôts

### s.lawyer.p
- PT: Um advogado trata do contrato-promessa, da procuração e da escritura; um consultor fiscal, do NIF, do representante fiscal e dos impostos onde vive.
- EN: A lawyer handles the promissory contract, the power of attorney and the deed. A tax adviser handles the NIF (Portuguese tax number), the tax representative and tax where you live.
- FR: Un avocat s'occupe du compromis, de la procuration et de l'acte. Un conseiller fiscal s'occupe du NIF (numéro fiscal portugais), du représentant fiscal et de l'impôt dans votre pays.

### s.fx.h
- PT: Enviar o dinheiro
- EN: Sending the money
- FR: Envoyer l'argent

### s.fx.p
- PT: Uma empresa de pagamentos autorizada envia a entrada e o preço a partir de francos, dólares, reais ou shekels.
- EN: An authorised payment company to send the deposit and the price in francs, dollars, reais or shekels.
- FR: Une société de paiement agréée pour envoyer l'apport et le prix en francs, dollars, reais ou shekels.

### partner.none
- PT: Parceiro a anunciar antes de 1 de dezembro de 2026.
- EN: Partner to be announced before December 1, 2026.
- FR: Partenaire annoncé avant le 1er décembre 2026.

### form.h
- PT: O seu pedido
- EN: Your request
- FR: Votre demande

### form.need
- PT: De que precisa?
- EN: What do you need?
- FR: De quoi avez-vous besoin ?

### form.region
- PT: Região em Portugal
- EN: Region in Portugal
- FR: Région au Portugal

### form.budget
- PT: Orçamento
- EN: Budget
- FR: Budget

### form.when
- PT: Quando quer comprar
- EN: When you plan to buy
- FR: Quand vous pensez acheter

### form.message
- PT: Outros pormenores
- EN: Other details
- FR: Autres détails

### form.consent.h
- PT: Para quem segue cada parte
- EN: Who receives each part
- FR: Qui reçoit chaque partie

### form.consent
- PT: {parts}: autorizo o envio a {name}, para me contactarem.
- EN: {parts}: I authorise sending this to {name}, to contact me.
- FR: {parts} : j'autorise l'envoi à {name}, pour me contacter.

### form.team
- PT: a equipa da Imóveis Portugal
- EN: the Imóveis Portugal team
- FR: l'équipe d'Imóveis Portugal

### form.consent.team
- PT: {parts}: autorizo a Imóveis Portugal a tratar este pedido e a contactar-me.
- EN: {parts}: I authorise Imóveis Portugal to handle this request and contact me.
- FR: {parts} : j'autorise Imóveis Portugal à traiter cette demande et à me contacter.

### form.tying
- PT: O crédito nunca obriga a contratar o seguro ou outro produto do parceiro (Decreto-Lei 74-A/2017).
- EN: A mortgage never requires the partner's insurance or any other product (Decreto-Lei 74-A/2017).
- FR: Un crédit n'oblige jamais à souscrire l'assurance ou un autre produit du partenaire (Decreto-Lei 74-A/2017).

### form.never
- PT: Não vendemos os seus dados. Os parceiros pagam um patrocínio fixo, nunca uma comissão por pedido.
- EN: We never sell your data. Partners pay a flat sponsorship, never a fee per request.
- FR: Nous ne vendons pas vos données. Les partenaires versent un sponsoring forfaitaire, jamais une commission par demande.

### form.send
- PT: Enviar pedido
- EN: Send request
- FR: Envoyer la demande

### form.how
- PT: Resposta em dois dias úteis.
- EN: Answer within two working days.
- FR: Réponse sous deux jours ouvrés.

### n.agency
- PT: Ver casas
- EN: Viewing homes
- FR: Voir des biens

### n.credit
- PT: Crédito
- EN: Mortgage
- FR: Crédit

### n.insurance
- PT: Seguros
- EN: Insurance
- FR: Assurances

### n.lawyer
- PT: Advogado e impostos
- EN: Lawyer and tax
- FR: Avocat et impôts

### n.fx
- PT: Envio do dinheiro
- EN: Sending money
- FR: Envoi d'argent

### form.name
- PT: Nome
- EN: Name
- FR: Nom

### form.email
- PT: Email
- EN: Email
- FR: E-mail

### form.err.email
- PT: Escreva um email válido.
- EN: Enter a valid email.
- FR: Saisissez un e-mail valide.

### form.sending
- PT: A enviar…
- EN: Sending…
- FR: Envoi…

### form.sent
- PT: Pedido enviado. Resposta em dois dias úteis.
- EN: Request sent. Answer within two working days.
- FR: Demande envoyée. Réponse sous deux jours ouvrés.

### form.fallback
- PT: Não foi enviado. Envie-o por email:
- EN: It didn't go through. Send it by email:
- FR: L'envoi a échoué. Envoyez-la par e-mail :

### form.fallback.a
- PT: Abrir o email
- EN: Open email
- FR: Ouvrir l'e-mail

### form.subject
- PT: Pedido: comprar a partir de fora
- EN: Request: buying from abroad
- FR: Demande : acheter depuis l'étranger

### licences.h
- PT: Licenças
- EN: Licences
- FR: Licences

### licences.p
- PT: A licença de cada parceiro: AMI para a agência, Banco de Portugal para o crédito, ASF para os seguros, Ordem dos Advogados para os advogados.
- EN: Each partner's licence: AMI for the agency, Banco de Portugal for the mortgage, ASF for insurance, the Bar for lawyers.
- FR: La licence de chaque partenaire : AMI pour l'agence, Banco de Portugal pour le crédit, ASF pour l'assurance, l'Ordre pour les avocats.

## data

### map.p
- PT: Escreva um valor: o mapa mostra os metros quadrados que compra em cada concelho, do Minho aos Açores.
- EN: Enter an amount on the map and see the square metres it buys in each municipality, from the Minho to the Azores.
- FR: Indiquez un montant sur la carte et voyez les mètres carrés qu'il permet dans chaque commune, du Minho aux Açores.

### map.h
- PT: Quanto espaço compra o seu orçamento
- EN: How much space your budget buys
- FR: L'espace que votre budget permet

### title
- PT: Preços das casas no Norte e no resto do país
- EN: House prices in the North and across Portugal
- FR: Prix des logements dans le Nord et dans le reste du pays

### lede
- PT: Preço mediano por m² das casas vendidas em cada concelho, nos 12 meses até ao fim de cada trimestre. Dados do INE, atualizados trimestralmente.
- EN: Median price per m² of homes sold, by municipality, over the last 12 months, quarter by quarter. INE data, updated every quarter.
- FR: Prix médian au m² des logements vendus, par commune, sur les 12 derniers mois, trimestre par trimestre. Données de l'INE, mises à jour chaque trimestre.

### region.porto
- PT: Área Metropolitana do Porto
- EN: Porto metropolitan area
- FR: Aire métropolitaine de Porto

### region.minho
- PT: Minho e Cávado
- EN: Minho and Cávado
- FR: Minho et Cávado

### region.tamega
- PT: Tâmega e Sousa, Douro e Trás-os-Montes
- EN: Tâmega e Sousa, Douro and Trás-os-Montes
- FR: Tâmega e Sousa, Douro et Trás-os-Montes

### region.centro
- PT: Centro
- EN: Centre
- FR: Centre

### region.lisboa
- PT: Lisboa e Algarve
- EN: Lisbon and the Algarve
- FR: Lisbonne et l'Algarve

### col.place
- PT: Concelho
- EN: Municipality
- FR: Commune

### col.change
- PT: Num ano
- EN: In a year
- FR: Sur un an

### national
- PT: Portugal: {v} por m², {chg} num ano.
- EN: Portugal: {v} per m², {chg} in a year.
- FR: Portugal : {v} le m², {chg} sur un an.

### note
- PT: Mediana do valor por m² das casas vendidas nos 12 meses até ao fim de cada trimestre. Inclui casas novas e usadas. Não são preços pedidos em anúncios. Onde há poucas vendas, a variação anual pode ser grande.
- EN: Median value per m² of homes sold in the 12 months to the end of each quarter. New and existing homes. Not asking prices from listings. Where sales are few, the yearly change can be large.
- FR: Valeur médiane au m² des logements vendus sur les 12 mois jusqu'à la fin de chaque trimestre. Neufs et anciens. Pas des prix demandés dans les annonces. Là où les ventes sont rares, la variation annuelle peut être forte.

## blog

### title
- PT: Comprar casa em Portugal a partir de fora
- EN: Articles for buying calmly from abroad
- FR: Articles pour acheter sereinement depuis l'étranger

### lede
- PT: Impostos, crédito e os passos da compra, com a fonte oficial de cada número.
- EN: Taxes, mortgages and the steps of a purchase, explained with the official source for every number.
- FR: Impôts, crédit et étapes de l'achat, expliqués avec la source officielle de chaque chiffre.

### read
- PT: Ler o artigo
- EN: Read the article
- FR: Lire l'article

### minutes
- PT: {n} min de leitura
- EN: {n} min read
- FR: {n} min de lecture

### published
- PT: Publicado a {date}
- EN: Published {date}
- FR: Publié le {date}

### updated
- PT: Atualizado a {date}
- EN: Updated {date}
- FR: Mis à jour le {date}

### tldr
- PT: A resposta curta
- EN: The short answer
- FR: La réponse courte

### related
- PT: Ler a seguir
- EN: Read next
- FR: À lire ensuite

### back
- PT: Todos os artigos
- EN: All articles
- FR: Tous les articles

### author
- PT: Equipa Imóveis Portugal
- EN: The Imóveis Portugal team
- FR: L'équipe Imóveis Portugal

### empty
- PT: Os primeiros artigos chegam em breve.
- EN: The first articles are coming soon.
- FR: Les premiers articles arrivent bientôt.

## place

### h1
- PT: Comprar casa {in}
- EN: Buying a home {in}
- FR: Acheter {in}

### lede
- PT: Preço mediano das casas vendidas {in} nos últimos 12 meses: {v} por m², {chg} num ano.
- EN: The median price of homes sold {in} over the last 12 months was {v} per square metre, {chg} on a year earlier.
- FR: Le prix médian des logements vendus {in} sur les 12 derniers mois s'élève à {v} le mètre carré, {chg} sur un an.

### region
- PT: Região: {region}. Mediana nacional: {pt} por m².
- EN: Region: {region}. National median: {pt} per m².
- FR: Région : {region}. Médiane nationale : {pt} le m².

### budgets.h
- PT: O que o seu orçamento compra aqui
- EN: What your budget buys here
- FR: Ce que votre budget permet ici

### budget
- PT: cerca de {m2} m²
- EN: about {m2} m²
- FR: environ {m2} m²

### trend.h
- PT: Trimestre a trimestre
- EN: Quarter by quarter
- FR: Trimestre après trimestre

### imi
- PT: O IMI, imposto anual sobre a casa, vai de 0,3% a 0,45% do valor patrimonial tributário, conforme o município.
- EN: Annual property tax (IMI) is set by the municipality, between 0.3% and 0.45% of the tax value.
- FR: La taxe foncière annuelle (IMI) est fixée par la commune, entre 0,3 % et 0,45 % de la valeur fiscale.

### next.h
- PT: Próximos passos
- EN: Next steps
- FR: Les prochaines étapes

### sim
- PT: Calcular o custo de 100 m²
- EN: Work out the total cost of a 100 m² home at the median price
- FR: Calculer le coût total d'un logement de 100 m² au prix médian

### homes
- PT: Ver casas nesta zona com um consultor qualificado
- EN: See homes in this area with a qualified advisor
- FR: Voir des biens dans ce secteur avec un conseiller qualifié

### map
- PT: Ver no mapa
- EN: See it on the map
- FR: Voir sur la carte

### others.h
- PT: Outros concelhos
- EN: Other municipalities
- FR: Autres communes

### crumb
- PT: Mapa
- EN: Map
- FR: Carte

## map

### proj.credit
- PT: Imagem: {c}
- EN: Image: {c}
- FR: Image : {c}

### proj.sim
- PT: Calcular o custo total
- EN: Work out the total cost
- FR: Calculer le coût total

### proj.askag
- PT: Pedir detalhes ao consultor qualificado
- EN: Ask a qualified advisor
- FR: Demander à un conseiller qualifié

### proj.askdev
- PT: Ver o site do promotor
- EN: See the developer's site
- FR: Voir le site du promoteur

### proj.ask
- PT: Receber detalhes
- EN: Request information
- FR: Demander des informations

### proj.del
- PT: Entrega prevista: {v}
- EN: Expected completion: {v}
- FR: Livraison prévue : {v}

### proj.typ
- PT: Tipologias: {v}
- EN: Types: {v}
- FR: Typologies : {v}

### proj.onreq
- PT: Preço sob consulta
- EN: Price on request
- FR: Prix sur demande

### proj.from
- PT: A partir de {v}
- EN: From {v}
- FR: À partir de {v}

### devs.none
- PT: Ainda sem empreendimentos parceiros nesta seleção.
- EN: No partner developments in this selection yet.
- FR: Pas encore de programme partenaire dans cette sélection.

### devs.del
- PT: Entrega até
- EN: Ready by
- FR: Livraison avant

### devs.max
- PT: Preço até (€)
- EN: Price up to (€)
- FR: Prix jusqu'à (€)

### devs.typ
- PT: Tipologia
- EN: Type
- FR: Typologie

### devs.toggle
- PT: Novos empreendimentos
- EN: New developments
- FR: Programmes neufs

### golf.toggle
- PT: Golfe
- EN: Golf
- FR: Golf

### golf.legend
- PT: Campos de golfe a verde. Toque ou aponte para ver o nome. © OpenStreetMap contributors (ODbL).
- EN: Golf courses in green. Hover over or tap a course to see its name. Golf courses: © OpenStreetMap contributors (ODbL).
- FR: Les parcours de golf en vert. Survolez ou touchez un parcours pour voir son nom. Parcours de golf : © OpenStreetMap contributors (ODbL).

### golf.unnamed
- PT: Campo de golfe
- EN: Golf course
- FR: Parcours de golf

### f.fr
- PT: Residentes estrangeiros em 2023: {v}, dos quais {b} do Brasil.
- EN: Foreign residents in 2023: {v}, of whom {b} from Brazil.
- FR: Résidents étrangers en 2023 : {v}, dont {b} du Brésil.

### f.new
- PT: Edifícios novos para habitação concluídos em 2025: {v}. Edifícios licenciados, todas as obras: {l}.
- EN: New residential buildings completed in 2025: {v}. Buildings licensed, all works: {l}.
- FR: Bâtiments résidentiels neufs achevés en 2025 : {v}. Bâtiments autorisés, tous travaux : {l}.

### f.area
- PT: Área média de uma casa de residência habitual: {v} m² (Censos 2021).
- EN: Average floor area of a main home: {v} m² (Census 2021).
- FR: Surface moyenne d'une résidence principale : {v} m² (recensement 2021).

### f.vac
- PT: Casas vazias: {v}% (Censos 2021).
- EN: Empty homes: {v}% (Census 2021).
- FR: Logements vacants : {v} % (recensement 2021).

### f.sea
- PT: Casas de uso sazonal: {v}% (Censos 2021).
- EN: Seasonal homes: {v}% (Census 2021).
- FR: Logements saisonniers : {v} % (recensement 2021).

### f.dom
- PT: Compradores com domicílio fiscal no estrangeiro: {a} por m². Em Portugal: {p} (INE, {q}).
- EN: Buyers with a tax address abroad: {a} per m². In Portugal: {p} (INE, {q}).
- FR: Acheteurs domiciliés fiscalement à l'étranger : {a} le m². Au Portugal : {p} (INE, {q}).

### f.h
- PT: Habitação e moradores
- EN: Homes and residents
- FR: Logements et habitants

### legend.fr
- PT: Residentes estrangeiros com autorização de residência, 2023 (INE).
- EN: Height and colour show the foreign residents with a residence permit in 2023 (INE).
- FR: La hauteur et la couleur montrent les résidents étrangers titulaires d'un titre de séjour en 2023 (INE).

### legend.new
- PT: Edifícios novos para habitação concluídos em 2025 (INE).
- EN: Height and colour show the new residential buildings completed in 2025 (INE).
- FR: La hauteur et la couleur montrent les bâtiments résidentiels neufs achevés en 2025 (INE).

### legend.vac
- PT: Percentagem de casas vazias (INE, Censos 2021).
- EN: Height and colour show the share of empty homes (INE, Census 2021).
- FR: La hauteur et la couleur montrent la part des logements vacants (INE, recensement 2021).

### legend.sea
- PT: Percentagem de casas de uso sazonal, como casas de férias (INE, Censos 2021).
- EN: Height and colour show the share of homes used seasonally, such as holiday homes (INE, Census 2021).
- FR: La hauteur et la couleur montrent la part des logements à usage saisonnier, comme les maisons de vacances (INE, recensement 2021).

### metric.fr
- PT: Residentes estrangeiros
- EN: Foreign residents
- FR: Résidents étrangers

### metric.new
- PT: Casas novas concluídas
- EN: New homes completed
- FR: Logements neufs achevés

### metric.vac
- PT: Casas vazias
- EN: Empty homes
- FR: Logements vacants

### metric.sea
- PT: Casas de uso sazonal
- EN: Seasonal homes
- FR: Logements saisonniers

### layer.label
- PT: Outros dados
- EN: More data
- FR: Autres données

### currency
- PT: Moeda
- EN: Currency
- FR: Devise

### img.src
- PT: Fonte: INE, {quarter}. Estatísticas oficiais, não é uma avaliação.
- EN: Source: INE, {quarter}. Official statistics, not a valuation.
- FR: Source : INE, {quarter}. Statistiques officielles, pas une évaluation.

### img.for
- PT: com {b}
- EN: with {b}
- FR: avec {b}

### par.hint
- PT: Aproxime para ver as freguesias com valores do INE.
- EN: Zoom in to see the parishes where INE publishes figures.
- FR: Zoomez pour voir les paroisses où l'INE publie des chiffres.

### par.nodata
- PT: Sem preço do INE para esta freguesia.
- EN: INE publishes no price for this parish.
- FR: L'INE ne publie pas de prix pour cette paroisse.

### par.open
- PT: Ver o concelho
- EN: See the municipality
- FR: Voir la commune

### par.of
- PT: Freguesia · {m}
- EN: Parish · {m}
- FR: Paroisse (freguesia) · {m}

### card.disclaimer
- PT: Os valores passados não garantem valores futuros. Estatísticas oficiais, não é uma avaliação.
- EN: Past values do not guarantee future values. Official statistics, not a valuation.
- FR: Les valeurs passées ne garantissent pas les valeurs futures. Statistiques officielles, pas une évaluation.

### card.source
- PT: Fonte: INE, {quarter}.
- EN: Source: INE, {quarter}.
- FR: Source : INE, {quarter}.

### card.cmp
- PT: Concelhos comparáveis
- EN: Comparable municipalities
- FR: Communes comparables

### mo.down
- PT: A abrandar.
- EN: Slowing.
- FR: En ralentissement.

### mo.steady
- PT: Estável.
- EN: Steady.
- FR: Stable.

### mo.up
- PT: A acelerar.
- EN: Accelerating.
- FR: En accélération.

### card.mo
- PT: Preço nos últimos 4 trimestres: {c4}. Nos últimos 8: {c8}.
- EN: Price over the last 4 quarters: {c4}. Over the last 8: {c8}.
- FR: Prix sur les 4 derniers trimestres : {c4}. Sur les 8 derniers : {c8}.

### card.yield
- PT: Rentabilidade bruta: {y}. Taxa média dos novos créditos à habitação: {r} (Banco de Portugal, {month}).
- EN: Gross yield: {y}. Average rate on new home loans: {r} (Banco de Portugal, {month}).
- FR: Rendement brut : {y}. Taux moyen des nouveaux crédits immobiliers : {r} (Banco de Portugal, {month}).

### card.gap
- PT: Desde 2020, preço {p} por ano e renda {r} por ano: {d} pontos de diferença.
- EN: Since 2020, prices changed {p} a year and rents {r} a year, a gap of {d} points.
- FR: Depuis 2020, le prix a varié de {p} par an et le loyer de {r} par an, un écart de {d} points.

### card.cagrp
- PT: Preço: {v} por ano desde 2016.
- EN: Price: {v} a year since 2016.
- FR: Prix : {v} par an depuis 2016.

### card.rent
- PT: Renda por m² por mês
- EN: Rent per m² a month
- FR: Loyer au m² par mois

### card.price
- PT: Preço por m²
- EN: Price per m²
- FR: Prix au m²

### card.chart
- PT: Preço e renda por m², 2016 a 2026
- EN: Price and rent per m², 2016 to 2026
- FR: Prix et loyer au m², 2016 à 2026

### shareimg
- PT: Partilhar como imagem
- EN: Image to share
- FR: Image à partager

### close
- PT: Fechar
- EN: Close
- FR: Fermer

### flat
- PT: Mapa plano
- EN: Flat map
- FR: Carte à plat

### find.none
- PT: Nenhum concelho com esse nome.
- EN: No municipality by that name.
- FR: Aucune commune de ce nom.

### find.wait
- PT: A procurar…
- EN: Searching…
- FR: Recherche…

### wait.line
- PT: A ligação está lenta. O cartão abre assim que chegar.
- EN: The connection is slow. The card opens as soon as it arrives.
- FR: La connexion est lente. La fiche s'ouvre dès qu'elle arrive.

### wait.btn
- PT: Tentar de novo
- EN: Try again
- FR: Réessayer






### find
- PT: Procurar concelho
- EN: Find a municipality
- FR: Chercher une commune

### legend.yield
- PT: Rentabilidade bruta: renda mediana dos novos contratos × 12 ÷ preço mediano, por m² (INE, {quarter}).
- EN: Height and colour show the gross yield: median rent on new leases × 12 ÷ median price, per m² (INE, {quarter}).
- FR: La hauteur et la couleur montrent le rendement brut : loyer médian des nouveaux baux × 12 ÷ prix médian, au m² (INE, {quarter}).

### legend.growth
- PT: Subida do preço mediano por m² desde o 1.º trimestre de 2016 (INE, {quarter}).
- EN: Height and colour show how much the median price per m² has risen since Q1 2016 (INE, {quarter}).
- FR: La hauteur et la couleur montrent la hausse du prix médian au m² depuis le 1er trimestre 2016 (INE, {quarter}).

### legend.price
- PT: Preço mediano por m² das casas vendidas nos últimos 12 meses (INE, {quarter}).
- EN: Height and colour show the median price per m² of homes sold over the last 12 months (INE, {quarter}).
- FR: La hauteur et la couleur montrent le prix médian au m² des logements vendus sur les 12 derniers mois (INE, {quarter}).

### legend.m2
- PT: Metros quadrados que o seu orçamento compra, ao preço mediano das casas vendidas (INE, {quarter}).
- EN: Height and colour show the square metres your budget buys, based on the median price of homes sold (INE, {quarter}).
- FR: La hauteur et la couleur montrent les mètres carrés de votre budget, sur la base du prix médian des logements vendus (INE, {quarter}).

### metric.yield
- PT: Rentabilidade bruta
- EN: Gross rental yield
- FR: Rendement locatif brut

### metric.growth
- PT: Subida em 10 anos
- EN: 10-year growth
- FR: Hausse sur 10 ans

### metric.price
- PT: Preço mediano por m²
- EN: Median price per m²
- FR: Prix médian au m²

### metric.m2
- PT: m² para o meu orçamento
- EN: m² for my budget
- FR: m² pour mon budget

### metric.label
- PT: A altura mostra
- EN: Height shows
- FR: La hauteur montre

### qfmt
- PT: {q}.º trimestre de {y}
- EN: Q{q} {y}
- FR: {q}e trimestre {y}

### col.m2
- PT: Preço mediano por m²
- EN: Median price per m²
- FR: Prix médian au m²

### title
- PT: Quanto espaço compra o seu orçamento
- EN: How much space your budget buys
- FR: L'espace que votre budget permet

### lede
- PT: Escreva um orçamento e veja os m² que compra em cada concelho de Portugal.
- EN: Enter an amount. See how many square metres it buys in each municipality of Portugal.
- FR: Indiquez un montant. Voyez combien de mètres carrés il permet dans chaque commune du Portugal.

### budget.label
- PT: O seu orçamento
- EN: Your budget
- FR: Votre budget

### local
- PT: cerca de {local} à taxa de referência do BCE de {date}
- EN: about {local} at the ECB reference rate of {date}
- FR: environ {local} au taux de référence de la BCE du {date}

### legend
- PT: Metros quadrados que o seu orçamento compra, ao preço mediano das casas vendidas (INE, {quarter}).
- EN: Height and colour show the square metres your budget buys. Based on the median price of homes sold (INE, {quarter}).
- FR: La hauteur et la couleur montrent les mètres carrés de votre budget. Base : le prix médian des logements vendus (INE, {quarter}).

### hint
- PT: Toque num concelho para o detalhe.
- EN: Tap a municipality for the details.
- FR: Touchez une commune pour le détail.

### filters
- PT: Filtrar
- EN: Filter
- FR: Filtrer

### f.all
- PT: Todo o país
- EN: All of Portugal
- FR: Tout le pays

### f.coast
- PT: Litoral
- EN: Coast
- FR: Littoral

### f.inland
- PT: Interior
- EN: Inland
- FR: Intérieur

### f.city
- PT: Cidade
- EN: City
- FR: Ville

### f.country
- PT: Campo
- EN: Countryside
- FR: Campagne

### f.air
- PT: Perto de um aeroporto
- EN: Near an airport
- FR: Près d'un aéroport

### r.north
- PT: Norte
- EN: North
- FR: Nord

### r.centre
- PT: Centro
- EN: Centre
- FR: Centre

### r.lisbon
- PT: Lisboa
- EN: Lisbon
- FR: Lisbonne

### r.alentejo
- PT: Alentejo
- EN: Alentejo
- FR: Alentejo

### r.algarve
- PT: Algarve
- EN: Algarve
- FR: Algarve

### r.madeira
- PT: Madeira
- EN: Madeira
- FR: Madère

### r.azores
- PT: Açores
- EN: Azores
- FR: Açores

### card.m2
- PT: metros quadrados
- EN: square metres
- FR: mètres carrés

### card.median
- PT: Preço mediano: {v} por m², INE, {quarter}
- EN: Median price: {v} per m², INE, {quarter}
- FR: Prix médian : {v} le m², INE, {quarter}

### card.nodata
- PT: Sem número oficial para este concelho.
- EN: No official figure for this municipality.
- FR: Pas de chiffre officiel pour cette commune.

### a.homes
- PT: Encontrar casa nesta zona
- EN: See homes in this area
- FR: Voir des biens dans ce secteur

### a.dev
- PT: Falar com promotores nesta zona
- EN: Talk to developers here
- FR: Parler aux promoteurs du secteur

### a.sim
- PT: Calcular o custo total
- EN: Work out the total cost
- FR: Calculer le coût total

### a.page
- PT: Ver preços do concelho
- EN: See the municipality page
- FR: Voir la page de la commune

### a.private
- PT: Ver residência, impostos e herança
- EN: Residence, tax and inheritance
- FR: Résidence, fiscalité et succession

### share
- PT: Copiar ligação
- EN: Copy the link
- FR: Copier le lien

### copied
- PT: Ligação copiada
- EN: Link copied
- FR: Lien copié

### list
- PT: Todos os concelhos, em lista
- EN: Every municipality, as a list
- FR: Toutes les communes, en liste

### search
- PT: Procurar um concelho
- EN: Search for a municipality
- FR: Chercher une commune

### col.buys
- PT: O seu orçamento compra
- EN: Your budget buys
- FR: Votre budget permet

### note
- PT: Medianas de vendas reais dos últimos 12 meses, não casas concretas; com poucas vendas, variam mais. A Madeira e os Açores aparecem ao lado do continente, em escala menor.
- EN: These are medians of actual sales over 12 months, not specific homes. Where sales are few, figures vary more. Madeira and the Azores sit beside the mainland, at a smaller scale.
- FR: Ce sont des médianes de ventes réelles sur 12 mois, pas des biens précis. Là où les ventes sont rares, les chiffres varient davantage. Madère et les Açores figurent à côté du continent, à plus petite échelle.

### open
- PT: Abrir o mapa
- EN: Open the map
- FR: Ouvrir la carte

### home.h
- PT: Quanto espaço compra o seu orçamento
- EN: How much space your budget buys
- FR: L'espace que votre budget permet

### home.p
- PT: Escreva um orçamento e veja os m² que compra em cada concelho.
- EN: Enter an amount. See how many square metres it buys in each municipality.
- FR: Indiquez un montant. Voyez combien de mètres carrés il permet dans chaque commune.

## scen

### h
- PT: Quatro orçamentos, lado a lado
- EN: Four budgets, side by side
- FR: Quatre budgets, côte à côte

### lede
- PT: O que cada orçamento compra, ao preço mediano das casas vendidas (INE). A partir de 5 milhões, exemplos de anúncios publicados.
- EN: Where each budget makes sense, at the median price of homes sold (INE). From 5 million, published listings as examples.
- FR: Où chaque budget prend son sens, au prix médian des logements vendus (INE). À partir de 5 millions, des annonces publiées en exemple.

### local
- PT: cerca de {local}
- EN: about {local}
- FR: environ {local}

### m2
- PT: {m2} m²
- EN: {m2} m²
- FR: {m2} m²

### 300k.h
- PT: Um apartamento no Porto, em Braga ou em Viseu
- EN: An apartment in Porto, Braga or Viseu
- FR: Un appartement à Porto, Braga ou Viseu

### 1m.h
- PT: Lisboa e Cascais, ou uma casa grande no Norte
- EN: Lisbon and Cascais, or a large house in the North
- FR: Lisbonne et Cascais, ou une grande maison dans le Nord

### 5m.h
- PT: Uma moradia na Linha de Cascais ou no Algarve, ou uma quinta
- EN: A villa on the Cascais coast or in the Algarve, or a country estate
- FR: Une villa sur la côte de Cascais ou en Algarve, ou un domaine

### 10m.h
- PT: A Quinta do Lago, no Algarve, e Sintra
- EN: Quinta do Lago in the Algarve, and Sintra
- FR: Quinta do Lago en Algarve, et Sintra

### example
- PT: Exemplo, anúncio publicado
- EN: Example, published listing
- FR: Exemple, annonce publiée

### note
- PT: As medianas do INE cobrem concelhos inteiros, sem separar zonas como a Quinta do Lago, em Loulé. Os exemplos são preços pedidos em anúncios, não de venda, e não são casas propostas pelo consultor qualificado.
- EN: INE medians describe whole municipalities. They don't describe the most sought-after enclaves inside them, such as Quinta do Lago in Loulé. The examples are asking prices from listings, not sale prices. They are not homes offered by the qualified advisor.
- FR: Les médianes de l'INE décrivent des communes entières. Elles ne décrivent pas les secteurs les plus recherchés, comme Quinta do Lago à Loulé. Les exemples sont des prix demandés, pas des prix de vente. Ce ne sont pas des biens proposés par le conseiller qualifié.

## private

### qa.h
- PT: Questões para preparar com os seus consultores
- EN: The questions to prepare with your advisers
- FR: Les questions à préparer avec vos conseillers

### title
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### h1
- PT: Residência, impostos e herança
- EN: Residence, tax and inheritance
- FR: Résidence, fiscalité et succession

### lede
- PT: Para cada questão, a regra oficial e o parceiro que a trata consigo. Informação, não aconselhamento.
- EN: Residence, tax when you move here, inheritance and holding structures: the official rule for each question and the partner who handles it with you. Information, not advice.
- FR: Résidence, fiscalité à l'installation, succession et structures de détention : la règle officielle de chaque question et le partenaire qui la traite avec vous. De l'information, pas du conseil.

### live.q
- PT: Quero viver em Portugal parte do ano.
- EN: Living in Portugal for part of the year.
- FR: Je voudrais vivre au Portugal une partie de l'année.

### live.a
- PT: Com um visto de residência, como o D7, para quem vive de rendimentos próprios. Desde 7 de outubro de 2023, comprar casa já não abre novas autorizações de residência para investimento; as existentes continuam a ser renovadas. Um advogado parceiro indica a sua via.
- EN: The route is a residence visa, such as the D7 for people living on their own income. Since October 7, 2023, buying a home no longer opens new residence permits for investment; existing permits are still renewed. A partner lawyer tells you which route applies to you.
- FR: La voie, c'est un visa de résidence, comme le D7 pour qui vit de revenus propres. Depuis le 7 octobre 2023, l'achat d'un bien n'ouvre plus de nouveaux titres de séjour pour investissement ; ceux qui existent sont toujours renouvelés. Un avocat partenaire vous indique la voie qui s'applique à vous.

### ifici.q
- PT: Vou mudar-me e continuar a trabalhar.
- EN: I'll move and keep working.
- FR: Je vais m'installer et continuer à travailler.

### ifici.a
- PT: Se passar a residente fiscal sem o ter sido nos cinco anos anteriores e trabalhar numa atividade elegível (investigação, ensino superior, profissões altamente qualificadas), o rendimento dessa atividade pode ter uma taxa de 20% durante 10 anos (IFICI). Um consultor fiscal parceiro confirma se a sua atividade conta.
- EN: If you become a tax resident without having been one in the previous five years and work in an eligible activity (research, higher education, highly qualified jobs), that work income can be taxed at a special 20% rate for 10 years (IFICI). A partner tax adviser confirms whether your activity qualifies.
- FR: Si vous devenez résident fiscal sans l'avoir été au cours des cinq années précédentes et exercez une activité éligible (recherche, enseignement supérieur, emplois hautement qualifiés), ce revenu peut être imposé au taux spécial de 20 % pendant 10 ans (IFICI). Un conseiller fiscal partenaire confirme si votre activité est concernée.

### inherit.q
- PT: Quero deixar a casa aos meus filhos.
- EN: I want to leave the house to my children.
- FR: Je veux transmettre la maison à mes enfants.

### inherit.a
- PT: Em Portugal, filhos, cônjuge ou unido de facto e pais estão isentos do imposto do selo de 10% sobre heranças e doações; os outros herdeiros pagam 10%. As regras do país onde vive também contam. Um advogado parceiro prepara a sucessão nos dois países.
- EN: In Portugal, children, a spouse or partner and parents are exempt from the 10% stamp duty on inheritances and gifts; other heirs pay 10%. The rules of the country where you live count too. A partner lawyer plans the succession in both countries.
- FR: Au Portugal, les enfants, le conjoint ou partenaire et les parents sont exonérés du droit de timbre de 10 % sur les successions et donations ; les autres héritiers paient 10 %. Les règles de votre pays de résidence comptent aussi. Un avocat partenaire prépare la succession dans les deux pays.

### aimi.q
- PT: Vou ter mais do que uma casa.
- EN: More than one home in Portugal.
- FR: Je vais posséder plus d'un bien.

### aimi.a
- PT: Além do IMI de cada casa, o adicional ao IMI (AIMI) incide sobre a soma dos valores patrimoniais acima de 600 000 € por pessoa: 0,7%, com taxas marginais de 1% acima de 1 000 000 € e 1,5% acima de 2 000 000 €. Um consultor fiscal parceiro faz as contas ao seu património.
- EN: Besides each home's IMI, the additional IMI (AIMI) applies to the sum of tax values above €600,000 per person: 0.7%, with marginal rates of 1% above €1,000,000 and 1.5% above €2,000,000. A partner tax adviser runs the numbers on your holdings.
- FR: En plus de l'IMI de chaque bien, l'IMI additionnel (AIMI) porte sur la somme des valeurs fiscales au-delà de 600 000 € par personne : 0,7 %, avec des taux marginaux de 1 % au-delà de 1 000 000 € et de 1,5 % au-delà de 2 000 000 €. Un conseiller fiscal partenaire fait le calcul sur votre patrimoine.

### holding.q
- PT: Posso comprar em nome de uma sociedade?
- EN: Can I buy in a company's name?
- FR: Puis-je acheter au nom d'une société ?

### holding.a
- PT: Pode, e a sociedade paga AIMI de 0,4%, ou 0,7% se a casa for de uso pessoal dos sócios ou gerentes. Se a sociedade tiver sede, ou for controlada a partir de um território com regime fiscal mais favorável da lista das Finanças, o IMT é de 10% sem isenções e o IMI de 7,5% ao ano. Um consultor fiscal e um advogado parceiros comparam as duas vias.
- EN: Yes. A company pays AIMI at 0.4%, or 0.7% if the home is for the personal use of its owners or managers. If the company is based in, or controlled from, a territory with a more favourable tax regime on the Finance Ministry list, IMT is 10% with no exemption and IMI is 7.5% a year. A partner tax adviser and lawyer compare buying in your own name and through a company.
- FR: Oui. Une société paie l'AIMI à 0,4 %, ou 0,7 % si le bien est à l'usage personnel de ses associés ou dirigeants. Si la société est établie, ou contrôlée depuis, un territoire à régime fiscal privilégié figurant sur la liste des Finances, l'IMT est de 10 % sans exonération et l'IMI de 7,5 % par an. Un conseiller fiscal et un avocat partenaires comparent l'achat en nom propre et par société.

### bank.q
- PT: Prefiro tratar o crédito com o meu banco de sempre.
- EN: I would rather arrange the loan with my own bank.
- FR: Je préfère passer par ma banque pour le crédit.

### bank.a
- PT: Os limites são os mesmos para todos: até 90% do valor para habitação própria e 80% para outros fins (Banco de Portugal). Um banco parceiro trata do crédito e da relação com o seu património.
- EN: The limits are the same for everyone: up to 90% of the value for your own home and 80% for other uses (Banco de Portugal). A partner bank arranges the loan and the relationship around your wealth.
- FR: Les limites sont les mêmes pour tous : jusqu'à 90 % de la valeur pour votre résidence et 80 % pour les autres usages (Banque du Portugal). Une banque partenaire organise le crédit et la relation autour de votre patrimoine.

### partners.h
- PT: Os parceiros desta secção
- EN: The partners in this section
- FR: Les partenaires de cette section

### partners.p
- PT: Gestores de património, bancos, consultores fiscais e advogados que acompanham compras a partir do estrangeiro, até cinco por edição, cada um com licença e marcado como patrocinado.
- EN: Wealth managers, banks, tax advisers and lawyers who work on purchases made from abroad. Each is shown with its licence and the sponsored label. Five per edition at most.
- FR: Gestionnaires de patrimoine, banques, conseillers fiscaux et avocats qui accompagnent les achats faits depuis l'étranger. Chacun apparaît avec sa licence et la mention sponsorisé. Cinq au plus par édition.

### partners.none
- PT: Os primeiros parceiros são anunciados antes do lançamento. Até lá, os pedidos seguem pela página Falar com um parceiro.
- EN: The first partners for these steps are announced before launch. Until then, your request goes to the right category on the Talk to a partner page.
- FR: Les premiers partenaires de ces étapes sont annoncés avant le lancement. D'ici là, votre demande va à la bonne catégorie sur la page Parler à un partenaire.

### map
- PT: Abrir o mapa de preços
- EN: See on the map what your budget buys
- FR: Voir sur la carte ce que permet votre budget

## kit

### types.h
- PT: Uma página para cada tipo de parceiro
- EN: A page for each kind of partner
- FR: Une page pour chaque type de partenaire

### download
- PT: Descarregar o media kit (PDF)
- EN: Download the media kit (PDF)
- FR: Télécharger le media kit (PDF)

### get.h
- PT: O que recebe
- EN: What you get
- FR: Ce que vous obtenez

### wealth.h
- PT: Para gestores de património e bancos
- EN: For wealth managers and banks
- FR: Pour les gestionnaires de patrimoine et les banques

### wealth.label
- PT: Gestão de património e banca
- EN: Wealth management and banking
- FR: Gestion de patrimoine et banque

### wealth.p
- PT: Leitores no Luxemburgo, na Suíça e em França que preparam a compra de uma casa em Portugal: residência, IFICI, herança, estruturas de detenção. O seu nome ao lado da resposta oficial a cada tema.
- EN: Your clients in Luxembourg, Switzerland and France who buy a home in Portugal read us while they prepare the purchase: residence, IFICI, inheritance and holding structures. Your name appears next to the official answer to each of these questions.
- FR: Vos clients au Luxembourg, en Suisse et en France qui achètent au Portugal nous lisent pendant qu'ils préparent leur achat : résidence, IFICI, succession et structures de détention. Votre nom figure à côté de la réponse officielle à chacune de ces questions.

### wealth.get.1
- PT: Perfil com a sua licença nas etapas sobre residência, herança e estruturas de detenção.
- EN: A profile with your licence in the steps on residence, inheritance and holding structures.
- FR: Un profil avec votre licence dans les étapes sur la résidence, la succession et les structures de détention.

### wealth.get.2
- PT: Presença no mapa e no percurso dos leitores com os orçamentos que acompanha.
- EN: A place on the map and on the path of readers with the budgets you serve.
- FR: Une place sur la carte et dans le parcours des lecteurs aux budgets que vous accompagnez.

### wealth.get.3
- PT: O seu nome no simulador de crédito, com a indicação «oferecido por».
- EN: Your name on the mortgage calculator, marked "offered by".
- FR: Votre nom sur le simulateur de crédit, avec la mention « proposé par ».

### wealth.get.4
- PT: Presença na Maré, à terça e à sexta, nas edições que escolher.
- EN: Slots in Maré, the Tuesday and Friday newsletter, in the editions you choose.
- FR: Des présences dans Maré, la newsletter du mardi et du vendredi, dans les éditions choisies.

### taxlegal.h
- PT: Para consultores fiscais e advogados
- EN: For tax advisers and law firms
- FR: Pour les conseillers fiscaux et les avocats

### taxlegal.label
- PT: Fiscal e jurídico
- EN: Tax and legal
- FR: Fiscal et juridique

### taxlegal.p
- PT: Cada pergunta sobre procuração, IMT, herança ou impostos nos dois países termina com o parceiro que trata dela: o seu escritório, nas edições e nas línguas dos seus clientes.
- EN: Every question on power of attorney, IMT, inheritance or tax in both countries ends with the partner who solves it. That partner can be your firm, in the editions and languages your clients read.
- FR: Chaque question sur la procuration, l'IMT, la succession ou la fiscalité dans les deux pays se termine par le partenaire qui la résout. Ce partenaire peut être votre cabinet, dans les éditions et les langues de vos clients.

### taxlegal.get.1
- PT: Perfil com a inscrição na Ordem ou o registo profissional, e respostas identificadas nas perguntas da sua categoria.
- EN: A profile with your Bar or professional registration, and labelled answers to the questions in your category.
- FR: Un profil avec votre inscription à l'Ordre ou votre enregistrement professionnel, et des réponses signées aux questions de votre catégorie.

### taxlegal.get.2
- PT: Nas etapas sobre IFICI, herança e sociedades.
- EN: In the steps on IFICI, inheritance and companies.
- FR: Dans les étapes sur l'IFICI, la succession et les sociétés.

### taxlegal.get.3
- PT: Na página «Comprar a partir de fora, passo a passo» e na sua categoria da página Falar com um parceiro.
- EN: On the "Buying from abroad, step by step" page and in your category on the Talk to a partner page.
- FR: Sur la page « Acheter depuis l'étranger, pas à pas » et dans votre catégorie de la page Parler à un partenaire.

### taxlegal.get.4
- PT: Um capítulo identificado no guia gratuito.
- EN: A labelled chapter in the free guide.
- FR: Un chapitre signé dans le guide gratuit.

### transfer.h
- PT: Para empresas de transferência de dinheiro
- EN: For money-transfer firms
- FR: Pour les sociétés de transfert d'argent

### transfer.label
- PT: Transferências
- EN: Money transfer
- FR: Transferts

### transfer.p
- PT: Os leitores pagam a entrada e o preço em francos, dólares, reais ou shekels; o site mostra cada valor na moeda deles, à taxa do BCE. Essa linha de câmbio pode levar o seu nome.
- EN: Readers pay the deposit and the price in francs, dollars, reais or shekels. The site shows every amount in their currency at the ECB rate; that exchange line can be yours.
- FR: Les lecteurs paient l'apport et le prix en francs, dollars, reais ou shekels. Le site affiche chaque montant dans leur devise, au taux de la BCE ; cette ligne de change peut être la vôtre.

### transfer.get.1
- PT: O seu nome na linha de câmbio dos simuladores e do mapa, com a indicação «oferecido por».
- EN: Your name on the exchange line of the calculators and the map, marked "offered by".
- FR: Votre nom sur la ligne de change des simulateurs et de la carte, avec la mention « proposé par ».

### transfer.get.2
- PT: Perfil com a autorização do Banco de Portugal ou do regulador do seu país.
- EN: A profile with your Banco de Portugal or home-regulator authorisation.
- FR: Un profil avec votre agrément de la Banque du Portugal ou de votre régulateur.

### transfer.get.3
- PT: A categoria «transferências» na página Falar com um parceiro e na página passo a passo.
- EN: The money-transfer category on the Talk to a partner page and on the step-by-step page.
- FR: La catégorie transferts sur la page Parler à un partenaire et sur la page pas à pas.

### transfer.get.4
- PT: Presença na Maré, à terça e à sexta, nas edições que escolher.
- EN: Slots in Maré, the Tuesday and Friday newsletter, in the editions you choose.
- FR: Des présences dans Maré, la newsletter du mardi et du vendredi, dans les éditions choisies.

### developers.h
- PT: Para promotores imobiliários
- EN: For property developers
- FR: Pour les promoteurs immobiliers

### developers.label
- PT: Promotores
- EN: Developers
- FR: Promoteurs

### developers.p
- PT: No mapa, quem procura um concelho e um orçamento vê o seu empreendimento, com os preços publicados e a indicação de patrocinado, do apartamento de 300 mil euros à moradia de 10 milhões.
- EN: Readers who look up a municipality and a budget on the map see your development there, with its published prices and the sponsored label. From a €300,000 apartment to a €10 million villa.
- FR: Les lecteurs qui cherchent une commune et un budget sur la carte y voient votre programme, avec ses prix publiés et la mention sponsorisé. De l'appartement à 300 000 € à la villa à 10 millions.

### developers.get.1
- PT: Uma posição no mapa no seu concelho, para os orçamentos do empreendimento.
- EN: A map position in your municipality, for your development's budgets.
- FR: Une position sur la carte dans votre commune, pour les budgets de votre programme.

### developers.get.2
- PT: Uma página do empreendimento, identificada como patrocinada, com os custos de compra calculados.
- EN: A development page, labelled as sponsored, with the buying costs worked out.
- FR: Une page du programme, signalée comme sponsorisée, avec les frais d'achat calculés.

### developers.get.3
- PT: Destaque na Maré nas edições que escolher.
- EN: A feature in Maré in the editions you choose.
- FR: Une mise en avant dans Maré dans les éditions choisies.

### developers.get.4
- PT: O seu empreendimento aparece primeiro aos leitores cujo orçamento lhe corresponde.
- EN: Your development comes first for readers whose budget fits it.
- FR: Votre programme apparaît en premier aux lecteurs dont le budget lui correspond.

### developers.rule
- PT: Os pedidos de visita dos leitores seguem para um consultor qualificado de uma mediadora licenciada, que trabalha com o promotor.
- EN: Readers' viewing requests go to a qualified advisor at a licensed brokerage, who works with the developer.
- FR: Les demandes de visite des lecteurs vont à un conseiller qualifié d'une agence agréée, qui travaille avec le promoteur.

## ours

### title
- PT: Os nossos parceiros
- EN: Our partners
- FR: Nos partenaires

### lede
- PT: Cada parceiro com a sua licença e a indicação de patrocinado.
- EN: Each partner with its licence and the sponsored label.
- FR: Chaque partenaire avec sa licence et la mention sponsorisé.

### group.h
- PT: O grupo parceiro
- EN: The partner group
- FR: Le groupe partenaire

### agency
- PT: Agência imobiliária
- EN: Estate agency
- FR: Agence immobilière

### credit
- PT: Intermediário de crédito
- EN: Credit intermediary
- FR: Intermédiaire de crédit

### insurance
- PT: Seguros
- EN: Insurance
- FR: Assurances

### tba
- PT: A anunciar, com o registo no regulador
- EN: To be announced, with its regulator registration
- FR: À annoncer, avec son enregistrement auprès du régulateur

### founding.h
- PT: Parceiros fundadores
- EN: Founding partners
- FR: Partenaires fondateurs

### founding.none
- PT: Os parceiros fundadores aparecem aqui à medida que assinam, até 1 de dezembro de 2026.
- EN: Founding partners appear here as they sign, until December 1, 2026.
- FR: Les partenaires fondateurs apparaissent ici à mesure qu'ils signent, jusqu'au 1er décembre 2026.

### devs.h
- PT: Promotores
- EN: Developers
- FR: Promoteurs

### devs.role
- PT: Promotor imobiliário
- EN: Developer
- FR: Promoteur immobilier

### join
- PT: Ver como ser parceiro
- EN: See the partner terms
- FR: Voir les conditions partenaires

## journey

### role.rental
- PT: Gestão de arrendamento
- EN: Rental management
- FR: Gestion locative

### role.architect
- PT: Arquiteto
- EN: Architect
- FR: Architecte

### q.sell.cert.a
- PT: É um dos documentos pedidos numa venda. Um advogado parceiro confirma as exceções e quem o emite.
- EN: It is one of the documents asked for in a sale. A partner lawyer confirms the exceptions and who issues it.
- FR: C'est l'un des documents demandés lors d'une vente. Un avocat partenaire confirme les exceptions et qui le délivre.

### q.sell.cert.q
- PT: Preciso de certificado energético para vender?
- EN: Do I need an energy certificate to sell?
- FR: Faut-il un certificat énergétique pour vendre ?

### q.sell.heirs.a
- PT: Com a habilitação de herdeiros e o registo predial. Um advogado parceiro confirma os passos e os custos no seu caso.
- EN: Through a declaration of heirs and land registration. A partner lawyer confirms the steps and costs for your case.
- FR: Par l'acte de notoriété des héritiers et l'inscription au registre foncier. Un avocat partenaire confirme les étapes et les coûts dans votre cas.

### q.sell.heirs.q
- PT: Como fica a casa em nome dos herdeiros?
- EN: How does the home pass into the heirs' names?
- FR: Comment le bien passe-t-il au nom des héritiers ?

### q.sell.filing.a
- PT: Sim: o cabeça-de-casal e os herdeiros comunicam o óbito e os bens no modelo oficial até ao fim do 3.º mês seguinte, mesmo quando estão isentos do imposto. Com motivo justificado, as Finanças podem dar até 60 dias a mais.
- EN: Yes: the head of the estate and the heirs report the death and the assets on the official form by the end of the third following month, even when they are exempt from the tax. For a justified reason, the tax office can grant up to 60 more days.
- FR: Oui : l'administrateur de la succession et les héritiers déclarent le décès et les biens sur le formulaire officiel avant la fin du troisième mois suivant, même s'ils sont exonérés. Pour un motif justifié, les Finances peuvent accorder jusqu'à 60 jours de plus.

### q.sell.filing.q
- PT: Tenho de comunicar a herança às Finanças?
- EN: Do I have to report the inheritance to the tax office?
- FR: Dois-je déclarer la succession aux Finances ?

### cp.estate.h
- PT: Património e forma de deter a casa
- EN: Your holdings and how to hold the home
- FR: Patrimoine et façon de détenir le bien

### from.il
- PT: de Israel
- EN: Israel
- FR: Israël

### from.uk
- PT: do Reino Unido
- EN: the UK
- FR: le Royaume-Uni

### from.us
- PT: dos Estados Unidos
- EN: the US
- FR: les États-Unis

### from.br
- PT: do Brasil
- EN: Brazil
- FR: le Brésil

### from.ch
- PT: da Suíça
- EN: Switzerland
- FR: la Suisse

### from.fr
- PT: de França
- EN: France
- FR: la France

### from.lu
- PT: do Luxemburgo
- EN: Luxembourg
- FR: le Luxembourg

### title
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### h1
- PT: Da ideia às chaves, a partir {from}
- EN: From the idea to the keys, from {from}
- FR: De l'idée aux clés, depuis {from}

### lede
- PT: Da escolha da zona à venda ou à herança. Em cada passo, as perguntas de quem vive {where}, a resposta oficial e o parceiro que trata dele.
- EN: Step by step, from choosing the area to selling or passing it on. At each one, the questions people ask {where}, the official answer and the partner who handles that step.
- FR: Étape par étape, du choix du secteur à la vente ou à la transmission. À chaque étape, les questions qu'on se pose {where}, la réponse officielle et le partenaire qui s'en charge.

### step
- PT: Passo {n}
- EN: Step {n}
- FR: Étape {n}

### ask
- PT: Perguntar a um parceiro
- EN: Ask a partner
- FR: Demandez à un partenaire

### slot.h
- PT: Parceiro para este passo
- EN: Partner for this step
- FR: Partenaire pour cette étape

### slot.p
- PT: Lugares para parceiros verificados, para quem vive {where}, sempre identificados como patrocinados.
- EN: Places kept for verified partners for readers {where}, always labelled as sponsored.
- FR: Places réservées à des partenaires vérifiés pour les lecteurs {where}, toujours signalés comme sponsorisés.

### slot.join
- PT: Ver as condições
- EN: Partner terms
- FR: Conditions partenaires

### unverified
- PT: Sem fonte oficial que possamos citar: um parceiro responde ao seu caso.
- EN: No official source we can cite: a partner answers for your case.
- FR: Pas de source officielle à citer : un partenaire répond pour votre cas.

### past
- PT: Os preços passados não garantem preços futuros.
- EN: Past prices do not guarantee future prices.
- FR: Les prix passés ne garantissent pas les prix futurs.

### open
- PT: Ver o passo a passo
- EN: See it step by step
- FR: Voir pas à pas

### role.agency
- PT: Agência imobiliária
- EN: Estate agency
- FR: Agence immobilière

### role.developer
- PT: Promotor
- EN: Developer
- FR: Promoteur

### role.bank
- PT: Banco
- EN: Bank
- FR: Banque

### role.fx
- PT: Transferências
- EN: Money transfer
- FR: Transferts

### role.lawyer
- PT: Advogado
- EN: Lawyer
- FR: Avocat

### role.tax
- PT: Consultor fiscal
- EN: Tax adviser
- FR: Conseiller fiscal

### role.insurance
- PT: Seguros
- EN: Insurance
- FR: Assurances

### role.wealth
- PT: Gestão de património
- EN: Wealth adviser
- FR: Gestion de patrimoine

### cp.budget.h
- PT: O orçamento e o lugar
- EN: Budget and place
- FR: Le budget et le lieu

### cp.finance.h
- PT: O financiamento
- EN: Financing
- FR: Le financement

### cp.docs.h
- PT: Os documentos
- EN: Documents
- FR: Les documents

### cp.buy.h
- PT: A compra
- EN: The purchase
- FR: L'achat

### cp.taxbuy.h
- PT: Os impostos da compra
- EN: Taxes when you buy
- FR: Les impôts à l'achat

### cp.own.h
- PT: Ser proprietário
- EN: Owning
- FR: Être propriétaire

### cp.rent.h
- PT: Arrendar
- EN: Renting it out
- FR: Mettre en location

### cp.sell.h
- PT: Vender
- EN: Selling
- FR: Vendre

### cp.struct.h
- PT: Residência e estrutura
- EN: Residence and structuring
- FR: Résidence et structuration

### q.space.q
- PT: Quanto espaço compra o meu orçamento?
- EN: How much space does my budget buy?
- FR: Combien d'espace mon budget permet-il ?

### q.space.a
- PT: O mapa mostra os metros quadrados que o seu orçamento compra em cada concelho, ao preço mediano das casas vendidas.
- EN: On the map, enter your budget and see the square metres in each municipality, at the median price of homes sold.
- FR: Sur la carte, indiquez votre budget et voyez les mètres carrés dans chaque commune, au prix médian des logements vendus.

### q.trend.q
- PT: Os preços estão a subir?
- EN: Are prices going up?
- FR: Les prix augmentent-ils ?

### q.trend.a
- PT: No país, a mediana do metro quadrado vendido passou de 1 923 € para 2 264 € num ano (INE, 2.º trimestre de 2026). A página de preços mostra dez anos por zona.
- EN: Nationally, the median square metre sold went from €1,923 to €2,264 in a year (INE, Q2 2026). The prices section shows ten years by area.
- FR: Dans tout le pays, le mètre carré médian vendu est passé de 1 923 € à 2 264 € en un an (INE, 2e trimestre 2026). La section des prix montre dix ans par secteur.

### q.lend.q
- PT: O banco empresta a quem vive fora?
- EN: Will a bank lend to me if I live abroad?
- FR: La banque prête-t-elle si je vis à l'étranger ?

### q.lend.a
- PT: Sim. Os limites do Banco de Portugal valem para todos: até 90% do valor para habitação própria e permanente e 80% para outros fins.
- EN: Yes. Banco de Portugal's limits apply to everyone: up to 90% of the value for your own permanent home and 80% for other uses.
- FR: Oui. Les limites de la Banque du Portugal valent pour tous : jusqu'à 90 % de la valeur pour la résidence principale et 80 % pour les autres usages.

### q.howmuch.q
- PT: Quanto posso pedir?
- EN: How much can I borrow?
- FR: Combien puis-je emprunter ?

### q.howmuch.a
- PT: As prestações de todos os créditos não podem passar 45% do rendimento líquido. O prazo vai até 40 anos para quem tem até 35 anos de idade, e 35 anos a partir daí.
- EN: All your loan payments together cannot exceed 45% of net income. The term goes up to 40 years if you are under 35, and 35 years from then on.
- FR: L'ensemble des mensualités ne peut dépasser 45 % du revenu net. La durée va jusqu'à 40 ans avant 35 ans, puis 35 ans.

### q.move.q
- PT: Como transfiro o dinheiro?
- EN: How do I move the money?
- FR: Comment transférer l'argent ?

### q.move.a
- PT: Bancos, notários e advogados têm de conhecer a origem dos fundos quando a operação o justifica: para isso servem os comprovativos do salário e das poupanças usados na compra.
- EN: Banks, notaries and lawyers must know where the funds come from when the operation calls for it. Keep proof of the salary and savings used for the purchase.
- FR: Banques, notaires et avocats doivent connaître l'origine des fonds lorsque l'opération le justifie. Gardez les justificatifs du salaire et de l'épargne utilisés.

### q.ch.pillar.q
- PT: Posso usar o 2.º pilar ou o 3.º pilar?
- EN: Can I use my 2nd or 3rd pillar?
- FR: Puis-je utiliser mon 2e ou 3e pilier ?

### q.ch.pillar.a
- PT: O levantamento antecipado do 2.º pilar é permitido a partir de 20 000 CHF para a residência principal, na Suíça ou no estrangeiro, não para uma casa de férias. O 3.º pilar A também serve para a casa própria.
- EN: Early withdrawal of 2nd-pillar money is allowed for your main residence, in Switzerland or abroad, not for a holiday home, from CHF 20,000. Pillar 3a can also go towards your own home.
- FR: Le retrait anticipé du 2e pilier est possible pour votre résidence principale, en Suisse ou à l'étranger, pas pour une résidence secondaire, à partir de 20 000 CHF. Le pilier 3a peut aussi financer votre logement.

### q.fr.3916.q
- PT: Tenho de declarar a conta portuguesa em França?
- EN: Do I declare the Portuguese account in France?
- FR: Dois-je déclarer le compte portugais en France ?

### q.fr.3916.a
- PT: Sim. Quem é residente fiscal em França declara todos os anos cada conta aberta no estrangeiro, mesmo sem movimentos (formulário 3916).
- EN: Yes. French tax residents declare every account opened abroad each year, even if unused (form 3916).
- FR: Oui. Les résidents fiscaux français déclarent chaque année tout compte ouvert à l'étranger, même inutilisé (formulaire 3916).

### q.us.fbar.q
- PT: Tenho de declarar a conta portuguesa nos EUA?
- EN: Do I report the Portuguese account in the US?
- FR: Dois-je déclarer le compte portugais aux États-Unis ?

### q.us.fbar.a
- PT: Se a soma das contas no estrangeiro passar 10 000 dólares em algum momento do ano, entrega-se o FBAR. O formulário 8938 tem limites próprios para quem vive fora.
- EN: If your foreign accounts together exceed $10,000 at any time in the year, you file an FBAR. Form 8938 has its own thresholds for people living abroad.
- FR: Si vos comptes à l'étranger dépassent ensemble 10 000 $ à un moment de l'année, vous déposez un FBAR. Le formulaire 8938 a ses propres seuils.

### q.br.cbe.q
- PT: Tenho de declarar o imóvel no Brasil?
- EN: Do I declare the property in Brazil?
- FR: Dois-je déclarer le bien au Brésil ?

### q.br.cbe.a
- PT: Sim, em Bens e Direitos no IRPF, com o valor de compra em moeda estrangeira. Se os bens no exterior somarem 1 000 000 de dólares ou mais a 31 de dezembro, há ainda a declaração CBE ao Banco Central.
- EN: Yes, under Bens e Direitos in the IRPF return, with the purchase value in foreign currency. If assets abroad total US$1,000,000 or more on 31 December, there is also the CBE declaration to the Central Bank.
- FR: Oui, dans Bens e Direitos de l'IRPF, avec la valeur d'achat en devise. Si les avoirs à l'étranger atteignent 1 000 000 de dollars au 31 décembre, il y a aussi la déclaration CBE à la Banque centrale.

### q.homeloan.q
- PT: Posso pedir o crédito a um banco {where}?
- EN: Can a bank {where} finance it?
- FR: Une banque {where} peut-elle financer ?

### q.homeloan.a
- PT: Depende do banco; não há regra oficial. Um banco parceiro responde ao seu caso.
- EN: It depends on each bank: no official rule says so. A partner bank answers for your case.
- FR: Cela dépend de chaque banque : aucune règle officielle ne le dit. Une banque partenaire répond pour votre cas.

### q.nif.q
- PT: Preciso de NIF?
- EN: Do I need a NIF (Portuguese tax number)?
- FR: Ai-je besoin d'un NIF (numéro fiscal portugais) ?

### q.nif.a
- PT: Sim, antes de assinar. Pede-se online, através de um representante legal, ou presencialmente, sem precisar de representante fiscal.
- EN: Yes, before you sign, and you can request it online through a legal representative, or in person. You don't need a tax representative to get it.
- FR: Oui, avant de signer, et il se demande en ligne par un représentant légal, ou sur place. Pas besoin de représentant fiscal pour l'obtenir.

### q.rep.eu.q
- PT: Preciso de representante fiscal?
- EN: Do I need a tax representative?
- FR: Ai-je besoin d'un représentant fiscal ?

### q.rep.eu.a
- PT: Não é obrigatório para quem vive na União Europeia. Basta aderir às notificações eletrónicas das Finanças.
- EN: It's optional if you live in the European Union. You can simply join the tax authority's electronic notifications.
- FR: Ce n'est pas obligatoire si vous vivez dans l'Union européenne. Il suffit d'adhérer aux notifications électroniques du fisc.

### q.rep.non.q
- PT: Preciso de representante fiscal?
- EN: Do I need a tax representative?
- FR: Ai-je besoin d'un représentant fiscal ?

### q.rep.non.a
- PT: Para quem vive fora da União Europeia, sim, nos 15 dias após ter o imóvel, a menos que adira às notificações eletrónicas das Finanças.
- EN: Living outside the European Union, yes, within 15 days of owning the property, unless you join the tax authority's electronic notifications.
- FR: En dehors de l'Union européenne, oui, dans les 15 jours après l'achat, sauf adhésion aux notifications électroniques du fisc.

### q.account.q
- PT: Preciso de conta num banco português?
- EN: Do I need a Portuguese bank account?
- FR: Ai-je besoin d'un compte dans une banque portugaise ?

### q.account.a
- PT: Com crédito em Portugal, o banco pode exigir uma conta à ordem. Sem crédito, não encontrámos regra oficial: um parceiro responde ao seu caso.
- EN: If you take a mortgage in Portugal, the bank may require a current account. For a cash purchase we found no official rule: a partner answers for your case.
- FR: Avec un crédit au Portugal, la banque peut exiger un compte courant. Pour un achat comptant, nous n'avons pas trouvé de règle officielle : un partenaire répond pour votre cas.

### q.poa.q
- PT: Posso assinar sem ir a Portugal?
- EN: Can I sign without going to Portugal?
- FR: Puis-je signer sans aller au Portugal ?

### q.poa.a
- PT: Sim, com uma procuração assinada {where}, num consulado de Portugal ou num notário com a Apostila de Haia.
- EN: Yes, with a power of attorney signed {where}, at a Portuguese consulate or before a notary with the Hague Apostille.
- FR: Oui, avec une procuration signée {where}, dans un consulat du Portugal ou chez un notaire avec l'apostille de La Haye.

### q.cpcv.q
- PT: Como funciona o contrato-promessa?
- EN: How does the promissory contract work?
- FR: Comment fonctionne le compromis ?

### q.cpcv.a
- PT: Fixa o preço, a data e o sinal. Se o comprador desistir, perde o sinal; se o vendedor desistir, devolve-o em dobro.
- EN: It sets the price, the date and the deposit. If you withdraw, you lose the deposit; if the seller withdraws, they pay it back twice over.
- FR: Il fixe le prix, la date et les arrhes. Si vous vous retirez, vous les perdez ; si le vendeur se retire, il les rend au double.

### q.deed.q
- PT: Onde se faz a escritura?
- EN: Where is the deed signed?
- FR: Où se signe l'acte ?

### q.deed.a
- PT: No balcão Casa Pronta, a escritura e o registo fazem-se no mesmo sítio: 375 € com um ato de registo, 700 € com crédito e hipoteca.
- EN: At a Casa Pronta office, the deed and the registration happen in one place: €375 with one registration act, €700 with a mortgage.
- FR: Au guichet Casa Pronta, l'acte et l'enregistrement se font au même endroit : 375 € pour un acte, 700 € avec un crédit hypothécaire.

### q.docs.q
- PT: Que documentos leva a casa?
- EN: Which documents come with the home?
- FR: Quels documents accompagnent le bien ?

### q.docs.a
- PT: A identificação de vendedores e compradores, a ficha técnica se existir, a licença de utilização ou a sua dispensa, e o certificado energético.
- EN: The IDs of sellers and buyers, the technical file if there is one, the usage licence or its waiver, and the energy certificate.
- FR: Les pièces d'identité des vendeurs et acheteurs, la fiche technique s'il y en a une, le permis d'utilisation ou sa dispense, et le certificat énergétique.

### q.imt.q
- PT: Quanto pago de IMT?
- EN: How much IMT do I pay?
- FR: Combien d'IMT vais-je payer ?

### q.imt.a
- PT: Se não for residente fiscal em Portugal, 7,5% do preço desde maio de 2026, salvo exceções: já ter sido residente, passar a residente em dois anos, ou arrendar para habitação dentro dos limites da lei.
- EN: If you're not a Portuguese tax resident, 7.5% of the price since May 2026, with exceptions: having been a resident, becoming one within two years, or renting it out as a home within the legal caps.
- FR: Si vous n'êtes pas résident fiscal au Portugal, 7,5 % du prix depuis mai 2026, sauf exceptions : avoir été résident, le devenir dans les deux ans, ou louer comme résidence dans les plafonds légaux.

### q.is.q
- PT: E o imposto do selo?
- EN: And stamp duty?
- FR: Et le droit de timbre ?

### q.is.a
- PT: 0,8% do preço na compra e, com crédito de cinco anos ou mais, 0,6% do montante emprestado.
- EN: 0.8% of the price on the purchase and, with a loan of five years or more, 0.6% of the amount borrowed.
- FR: 0,8 % du prix à l'achat et, avec un crédit de cinq ans ou plus, 0,6 % du montant emprunté.

### q.imi.q
- PT: Quanto pago por ano?
- EN: What do I pay each year?
- FR: Que paie-t-on chaque année ?

### q.imi.a
- PT: O IMI, entre 0,3% e 0,45% do valor patrimonial, conforme o município. Acima de 600 000 € de valor patrimonial por pessoa, há ainda o AIMI.
- EN: IMI, between 0.3% and 0.45% of the tax value, depending on the municipality. Above €600,000 of tax value per person, there is also AIMI.
- FR: L'IMI, entre 0,3 % et 0,45 % de la valeur fiscale selon la commune. Au-delà de 600 000 € de valeur fiscale par personne, s'ajoute l'AIMI.

### q.ins.q
- PT: Tenho de fazer o seguro com o banco?
- EN: Must I take the bank's insurance?
- FR: Dois-je prendre l'assurance de la banque ?

### q.ins.a
- PT: Não. O banco pode exigir um seguro ligado ao crédito, mas tem de aceitar o de outra seguradora com cobertura equivalente.
- EN: No. The bank may require insurance linked to the loan, but must accept another insurer's policy with equivalent cover.
- FR: Non. La banque peut exiger une assurance liée au crédit, mais doit accepter celle d'un autre assureur à garanties équivalentes.

### q.renttax.q
- PT: E se arrendar?
- EN: What if I rent it out?
- FR: Et si je loue ?

### q.renttax.a
- PT: As rendas de habitação de não residentes pagam 25% em Portugal, com reduções para contratos longos. O alojamento local exige registo prévio.
- EN: Non-residents' rent from housing is taxed at 25% in Portugal, with reductions for long contracts. Short-term rental needs prior registration.
- FR: Les loyers d'habitation des non-résidents sont imposés à 25 % au Portugal, avec des réductions pour les baux longs. La location de courte durée exige un enregistrement préalable.

### q.home.rent.q
- PT: Também pago impostos {where}?
- EN: Do I also pay tax {where}?
- FR: Est-ce que je paie aussi des impôts {where} ?

### q.home.rent.lu.a
- PT: O Luxemburgo isenta essas rendas, mas pode tê-las em conta para fixar a taxa sobre o resto do seu rendimento.
- EN: Luxembourg exempts that rent but may take it into account to set the rate on the rest of your income.
- FR: Le Luxembourg exonère ces loyers mais peut en tenir compte pour fixer le taux sur le reste de vos revenus.

### q.home.rent.ch.a
- PT: A Suíça isenta essas rendas, mas pode aplicar ao resto do rendimento a taxa que aplicaria sem a isenção.
- EN: Switzerland exempts that rent but may apply to the rest of your income the rate it would apply without the exemption.
- FR: La Suisse exonère ces loyers mais peut appliquer au reste de vos revenus le taux qu'elle appliquerait sans exonération.

### q.home.rent.br.a
- PT: O Brasil pode tributá-las e desconta o imposto pago em Portugal, até ao imposto brasileiro sobre esse rendimento.
- EN: Brazil may tax it and deducts the tax paid in Portugal, up to the Brazilian tax on that income.
- FR: Le Brésil peut les imposer et déduit l'impôt payé au Portugal, dans la limite de l'impôt brésilien sur ce revenu.

### q.home.rent.il.a
- PT: Israel pode tributá-las e dá um crédito pelo imposto pago em Portugal.
- EN: Israel may tax it and gives a credit for the tax paid in Portugal.
- FR: Israël peut les imposer et accorde un crédit pour l'impôt payé au Portugal.

### q.home.rent.uk.a
- PT: O Reino Unido pode tributá-las e dá um crédito pelo imposto pago em Portugal.
- EN: The UK may tax it and gives a credit for the tax paid in Portugal.
- FR: Le Royaume-Uni peut les imposer et accorde un crédit pour l'impôt payé au Portugal.

### q.home.rent.us.a
- PT: Os EUA tributam os seus cidadãos sobre o rendimento mundial; o crédito por imposto estrangeiro (formulário 1116) evita pagar duas vezes.
- EN: The US taxes its citizens on worldwide income; the foreign tax credit (Form 1116) avoids paying twice.
- FR: Les États-Unis imposent leurs citoyens sur le revenu mondial ; le crédit d'impôt étranger (formulaire 1116) évite de payer deux fois.

### q.home.rent.fr.a
- PT: Portugal pode tributá-las. O método francês para evitar a dupla tributação mudou em 2016 e não o confirmámos na fonte: um consultor fiscal parceiro responde ao seu caso.
- EN: Portugal may tax it. How France avoids double taxation changed in 2016 and we couldn't confirm it at the source: a partner tax adviser answers for your case.
- FR: Le Portugal peut les imposer. La façon dont la France évite la double imposition a changé en 2016 et nous n'avons pas pu la vérifier à la source : un conseiller fiscal partenaire répond pour votre cas.

### q.cg.q
- PT: Quanto pago de impostos quando vender?
- EN: How much tax do I pay when I sell?
- FR: Combien d'impôt quand je vends ?

### q.cg.a
- PT: Em Portugal, conta 50% da mais-valia, às taxas gerais do IRS. A taxa autónoma de 28% para não residentes deixou de existir em 2023.
- EN: In Portugal, 50% of the gain counts, at the general IRS rates. The flat 28% rate for non-residents ended in 2023.
- FR: Au Portugal, 50 % de la plus-value compte, aux taux généraux de l'IRS. Le taux forfaitaire de 28 % pour les non-résidents a disparu en 2023.

### q.home.sell.q
- PT: E {where}?
- EN: And {where}?
- FR: Et {where} ?

### q.home.sell.lu.a
- PT: O Luxemburgo isenta a mais-valia, mas pode tê-la em conta para a taxa sobre o resto do rendimento.
- EN: Luxembourg exempts the gain but may take it into account for the rate on the rest of your income.
- FR: Le Luxembourg exonère la plus-value mais peut en tenir compte pour le taux sur le reste de vos revenus.

### q.home.sell.ch.a
- PT: A Suíça isenta a mais-valia, com a mesma regra de taxa sobre o resto do rendimento.
- EN: Switzerland exempts the gain, with the same rate rule on the rest of your income.
- FR: La Suisse exonère la plus-value, avec la même règle de taux sur le reste des revenus.

### q.home.sell.br.a
- PT: O Brasil pode tributá-la e desconta o imposto pago em Portugal, até ao imposto brasileiro sobre esse ganho.
- EN: Brazil may tax it and deducts the tax paid in Portugal, up to the Brazilian tax on that gain.
- FR: Le Brésil peut l'imposer et déduit l'impôt payé au Portugal, dans la limite de l'impôt brésilien sur ce gain.

### q.home.sell.us.a
- PT: Os EUA podem tributar os seus cidadãos sobre o ganho; o crédito por imposto estrangeiro (formulário 1116) evita a dupla tributação.
- EN: The US may tax its citizens on the gain; the foreign tax credit (Form 1116) avoids double taxation.
- FR: Les États-Unis peuvent imposer leurs citoyens sur le gain ; le crédit d'impôt étranger (formulaire 1116) évite la double imposition.

### q.home.sell.il.a
- PT: Não confirmámos na fonte como Israel trata este ganho: um consultor fiscal parceiro responde ao seu caso.
- EN: We couldn't confirm at the source how Israel treats this gain: a partner tax adviser answers for your case.
- FR: Nous n'avons pas pu vérifier à la source comment Israël traite ce gain : un conseiller fiscal partenaire répond pour votre cas.

### q.home.sell.uk.a
- PT: O Reino Unido pode tributá-la e dá um crédito pelo imposto pago em Portugal.
- EN: The UK may tax the gain and gives a credit for the tax paid in Portugal.
- FR: Le Royaume-Uni peut imposer la plus-value et accorde un crédit pour l'impôt payé au Portugal.

### q.home.sell.fr.a
- PT: Portugal pode tributá-la. O tratamento em França mudou em 2016 e não o confirmámos na fonte: um consultor fiscal parceiro responde ao seu caso.
- EN: Portugal may tax it. France's treatment changed in 2016 and we couldn't confirm it at the source: a partner tax adviser answers for your case.
- FR: Le Portugal peut l'imposer. Le traitement en France a changé en 2016 et nous n'avons pas pu le vérifier à la source : un conseiller fiscal partenaire répond pour votre cas.

### q.live.q
- PT: Posso viver em Portugal?
- EN: Can I live in Portugal?
- FR: Puis-je vivre au Portugal ?

### q.live.a
- PT: Com um visto de residência, como o D7 para rendimentos próprios. Desde 7 de outubro de 2023, comprar casa já não abre novas autorizações de residência para investimento.
- EN: With a residence visa, such as the D7 for your own income. Since October 7, 2023, buying a home no longer opens new residence permits for investment.
- FR: Avec un visa de résidence, comme le D7 pour les revenus propres. Depuis le 7 octobre 2023, l'achat d'un bien n'ouvre plus de nouveaux titres de séjour pour investissement.

### q.br.cplp.q
- PT: Sendo brasileiro, há um caminho próprio?
- EN: As a Brazilian, is there a specific route?
- FR: En tant que Brésilien, existe-t-il une voie propre ?

### q.br.cplp.a
- PT: Sim: a autorização de residência CPLP, depois de obter um visto de residência num consulado de Portugal.
- EN: Yes: the CPLP residence permit, after first getting a residence visa at a Portuguese consulate.
- FR: Oui : le titre de séjour CPLP, après un visa de résidence obtenu dans un consulat du Portugal.

### q.ifici.q
- PT: E os impostos se me mudar?
- EN: And tax if I move?
- FR: Et la fiscalité si je m'installe ?

### q.ifici.a
- PT: Sem residência fiscal nos cinco anos anteriores e numa atividade elegível, o rendimento desse trabalho pode ter a taxa de 20% durante 10 anos (IFICI).
- EN: Without tax residence in the previous five years and in an eligible activity, that work income can be taxed at 20% for 10 years (IFICI).
- FR: Sans résidence fiscale les cinq années précédentes et dans une activité éligible, ce revenu peut être imposé à 20 % pendant 10 ans (IFICI).

### q.inherit.q
- PT: E quando passar a casa aos filhos?
- EN: And when I pass the house to my children?
- FR: Et quand je transmets la maison à mes enfants ?

### q.inherit.a
- PT: Em Portugal, filhos, cônjuge e pais estão isentos do imposto do selo de 10% sobre heranças e doações. As estruturas de detenção estão na etapa Residência, impostos e herança.
- EN: In Portugal, children, a spouse and parents are exempt from the 10% stamp duty on inheritances and gifts. Holding structures are covered in the Residence, tax and inheritance step.
- FR: Au Portugal, enfants, conjoint et parents sont exonérés du droit de timbre de 10 % sur successions et donations. Les structures de détention sont traitées dans l'étape Résidence, fiscalité et succession.

## dev

### h
- PT: Promotores parceiros nesta zona
- EN: Partner developers in this area
- FR: Promoteurs partenaires dans ce secteur

### empty
- PT: Lugar disponível para um promotor parceiro, identificado como patrocinado.
- EN: A place for a partner developer, labelled as sponsored.
- FR: Une place pour un promoteur partenaire, signalée comme sponsorisée.

### from
- PT: desde {price}
- EN: from {price}
- FR: à partir de {price}

### sponsored
- PT: Patrocinado
- EN: Sponsored
- FR: Sponsorisé

### launch.h
- PT: Lançamento
- EN: Launch
- FR: Lancement

### launch.empty
- PT: Lugar para lançar um novo empreendimento nesta zona, no mapa, nesta página e num envio da Maré.
- EN: A place to launch a new project in this area. It appears on the map, on this page and in one issue of Maré.
- FR: Une place pour lancer un nouveau programme dans ce secteur. Il figure sur la carte, sur cette page et dans un numéro de Maré.

### join
- PT: Anunciar como promotor
- EN: For developers: terms on request
- FR: Pour les promoteurs : conditions sur demande

### card
- PT: Anunciar como promotor
- EN: Partner developers here: places available
- FR: Promoteurs partenaires ici : places disponibles

## consult

### dedicated
- PT: Um consultor dedicado acompanha o seu pedido.
- EN: A dedicated adviser takes care of your request.
- FR: Un conseiller dédié suit votre demande.

### title
- PT: Concierge
- EN: Concierge
- FR: Concierge

### h1
- PT: O Concierge, 15 minutos com um consultor qualificado
- EN: The Concierge, 15 minutes with a qualified advisor
- FR: Le Concierge, 15 minutes avec un conseiller qualifié

### lede
- PT: Quinze minutos por videochamada com um consultor qualificado, sem custos. As suas respostas preparam a conversa.
- EN: Fifteen minutes by video call with a qualified advisor, at no cost. Answer a few questions so the conversation starts with your case.
- FR: Quinze minutes en appel vidéo avec un conseiller qualifié, sans frais. Répondez à quelques questions pour que l'échange parte de votre situation.

### form.h
- PT: O seu pedido
- EN: Your request
- FR: Votre demande

### next.h
- PT: O que acontece a seguir
- EN: What happens next
- FR: La suite

### next.1
- PT: O consultor lê o seu pedido, confirma a hora por email e liga-lhe.
- EN: The advisor reads your request, confirms the time by email and calls you.
- FR: Le conseiller lit votre demande, confirme l'heure par e-mail et vous appelle.

### next.2
- PT: Na consulta: as zonas, o orçamento, o calendário e os próximos passos.
- EN: In the consultation: areas, budget, timing and the next steps.
- FR: Pendant la consultation : les secteurs, le budget, le calendrier et les prochaines étapes.

### next.3
- PT: Depois, os parceiros certos para o seu caso: crédito, advogado, consultor fiscal do seu país.
- EN: Then the right partners for your case: mortgage, lawyer, a tax adviser for your country.
- FR: Ensuite, les bons partenaires pour votre cas : crédit, avocat, conseiller fiscal de votre pays.

### privacy
- PT: Os seus dados seguem só para a Imóveis Portugal e para o consultor qualificado, que lhe responde por email.
- EN: Your details go only to Imóveis Portugal and the qualified advisor, who replies by email.
- FR: Vos données ne vont qu'à Imóveis Portugal et au conseiller qualifié, qui vous répond par e-mail.

### cta
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### card.h
- PT: Concierge · 15 min · vídeo
- EN: Concierge · 15 min · video
- FR: Concierge · 15 min · vidéo

### card.p
- PT: Com um consultor qualificado, sem custos. Diga-nos em que ponto está.
- EN: With a qualified advisor, at no cost. Tell us where you are in your plan.
- FR: Avec un conseiller qualifié, sans frais. Dites-nous où vous en êtes.

### ok.title
- PT: Pedido recebido
- EN: Request received
- FR: Demande reçue

### ok.h1
- PT: O seu pedido chegou ao consultor
- EN: Your request has reached the advisor
- FR: Votre demande est arrivée chez le conseiller

### ok.p
- PT: O consultor qualificado propõe-lhe por email uma videochamada de 15 minutos, no horário que indicou.
- EN: Thank you. The qualified advisor will email you to propose a 15-minute video call within the window you gave.
- FR: Merci. Le conseiller qualifié vous proposera par e-mail un appel vidéo de 15 minutes dans la période indiquée.

### ok.prep
- PT: Para a conversa: o orçamento, as zonas que lhe interessam e o NIF, se já o tiver.
- EN: To prepare, have your budget, the areas you like and, if you have one, your NIF (Portuguese tax number) to hand.
- FR: Pour préparer l'échange, ayez sous la main votre budget, les secteurs qui vous intéressent et, si vous l'avez, votre NIF (numéro fiscal portugais).

### private.title
- PT: Um consultor dedicado
- EN: A dedicated adviser
- FR: Un conseiller dédié

### private.h1
- PT: Um consultor dedicado acompanha o seu pedido
- EN: A dedicated adviser is taking care of your request
- FR: Un conseiller dédié suit votre demande

### private.p
- PT: O consultor qualificado propõe-lhe por email uma videochamada de 15 minutos, no horário que indicou.
- EN: Thank you. The qualified advisor will email you to propose a 15-minute video call within the window you gave.
- FR: Merci. Le conseiller qualifié vous proposera par e-mail un appel vidéo de 15 minutes dans la période indiquée.

### private.aml
- PT: Antes das visitas, o consultor pede a identificação e a origem dos fundos, como a lei exige a todas as agências imobiliárias em Portugal.
- EN: Before viewings, the advisor asks for the usual identification and information on the origin of funds. Every estate agency in Portugal must do so.
- FR: Avant les visites, le conseiller demande les pièces d'identité habituelles et des informations sur l'origine des fonds. C'est une obligation pour toute agence immobilière au Portugal.

### later.title
- PT: Obrigado
- EN: Thank you
- FR: Merci

### later.h1
- PT: Obrigado pelo seu pedido
- EN: Thank you for your request
- FR: Merci pour votre demande

### later.p
- PT: Pelo que nos diz, tem tempo para preparar a compra com calma. Eis o essencial nesta fase.
- EN: From what you tell us, you have time to prepare calmly. Here is what matters at this stage.
- FR: D'après vos réponses, vous avez le temps de préparer votre achat sereinement. Voici l'essentiel pour cette étape.

### later.path
- PT: O percurso do seu país, passo a passo
- EN: Your country's path, step by step
- FR: Le parcours de votre pays, pas à pas

### later.nl
- PT: Maré, a newsletter: insights e pérolas de Portugal, todas as terças e sextas.
- EN: Maré, the newsletter: insights and hidden gems from Portugal, every Tuesday and Friday.
- FR: Maré, la newsletter : idées et pépites du Portugal, chaque mardi et vendredi.

### later.dossier
- PT: Os dossiers, com os números do seu caso
- EN: The dossiers, with the figures for your case
- FR: Les dossiers, avec les chiffres de votre cas

### later.book
- PT: Quando a compra estiver mais perto, fale aqui com o Concierge.
- EN: When your purchase is closer, talk to the Concierge here.
- FR: Quand votre achat sera plus proche, parlez ici au Concierge.

## prices

### title
- PT: Preços e rendas
- EN: Prices and rents
- FR: Prix et loyers

### h1
- PT: Dez anos de preços, concelho a concelho
- EN: Ten years of prices, municipality by municipality
- FR: Dix ans de prix, commune par commune

### lede
- PT: Na análise completa: o preço mediano do m² vendido em cada concelho desde 2016, trimestre a trimestre, as rendas dos novos contratos e o rendimento bruto, com a fonte oficial.
- EN: In the full analysis: the median price per square metre sold in each municipality since 2016, quarter by quarter, rents on new leases and gross yield, with the official source.
- FR: Dans l'analyse complète : le prix médian du mètre carré vendu dans chaque commune depuis 2016, trimestre par trimestre, les loyers des nouveaux baux et le rendement brut, avec la source officielle.

### national
- PT: Portugal: de {from} por m² em 2016 para {to} em 2026.
- EN: Portugal: from {from} per m² in 2016 to {to} in 2026.
- FR: Portugal : de {from} le m² en 2016 à {to} en 2026.

### break
- PT: Nova metodologia INE
- EN: New INE method
- FR: Nouvelle méthode INE

### compare.h
- PT: Compare até três lugares
- EN: Compare up to three places
- FR: Comparez jusqu'à trois lieux

### compare.add
- PT: Juntar um concelho
- EN: Add a municipality
- FR: Ajouter une commune

### compare.remove
- PT: Retirar
- EN: Remove
- FR: Retirer

### cur.eur
- PT: Em euros
- EN: In euros
- FR: En euros

### cur.local
- PT: Em {cur}, à taxa do BCE de {date}
- EN: In {cur}, at the ECB rate of {date}
- FR: En {cur}, au taux de la BCE du {date}

### col.place
- PT: Lugar
- EN: Place
- FR: Lieu

### col.m2
- PT: Preço por m²
- EN: Price per m²
- FR: Prix au m²

### col.10y
- PT: Desde 2016
- EN: Since 2016
- FR: Depuis 2016

### col.1y
- PT: Num ano
- EN: In a year
- FR: Sur un an

### col.rent
- PT: Renda por m², mês
- EN: Rent per m², month
- FR: Loyer au m², mois

### col.yield
- PT: Rendimento bruto
- EN: Gross yield
- FR: Rendement brut

### yield.note
- PT: Rendimento bruto: a renda mediana por m² vezes 12, a dividir pelo preço mediano por m². Período de 12 meses até ao 2.º trimestre de 2026. Antes de custos e impostos.
- EN: Gross yield: the median rent per m² times 12, divided by the median price per m². Twelve months to Q2 2026. Before costs and tax.
- FR: Rendement brut : le loyer médian au m² fois 12, divisé par le prix médian au m². Douze mois jusqu'au 2e trimestre 2026. Avant frais et impôts.

### method
- PT: As vendas seguem a metodologia do INE de 2018 até ao 3.º trimestre de 2019 e a de 2022 a partir daí. As regiões começam em 2019. Medianas de vendas reais, não casas concretas.
- EN: Sales follow INE's 2018 method up to Q3 2019 and its 2022 method from then on. Regions start in 2019. Medians of actual sales, not specific homes.
- FR: Les ventes suivent la méthode INE de 2018 jusqu'au 3e trimestre 2019, puis celle de 2022. Les régions commencent en 2019. Médianes de ventes réelles, pas des biens précis.

### regions.h
- PT: Por região
- EN: By region
- FR: Par région

### place.h
- PT: Neste lugar
- EN: In this place
- FR: Dans ce lieu

### home.h
- PT: Dez anos de preços
- EN: Ten years of prices
- FR: Dix ans de prix

### home.p
- PT: Desde 2016, o metro quadrado vendido em Portugal passou de {from} para {to}.
- EN: Since 2016, the square metre sold in Portugal has gone from {from} to {to}. See each municipality, rents and gross yield.
- FR: Depuis 2016, le mètre carré vendu au Portugal est passé de {from} à {to}. Voyez chaque commune, les loyers et le rendement brut.

### home.open
- PT: Ver preços e rendas
- EN: See prices and rents
- FR: Voir prix et loyers

### none
- PT: Sem número oficial
- EN: No official figure
- FR: Pas de chiffre officiel

## dossier

### title
- PT: Dossiers
- EN: Dossiers
- FR: Dossiers

### h1
- PT: Os números do seu caso, num só documento
- EN: The figures for your case, in one document
- FR: Les chiffres de votre cas, en un seul document

### lede
- PT: Relatórios em PDF com as regras oficiais e os dados do INE para o seu país, orçamento e zona. Informação, não aconselhamento.
- EN: PDF reports built from the official rules and INE data for your country, budget and area. Information, not advice: for decisions, the right partners at each step.
- FR: Des rapports PDF établis à partir des règles officielles et des données de l'INE pour votre pays, votre budget et votre secteur. De l'information, pas du conseil : pour décider, les bons partenaires à chaque étape.

### compra.h
- PT: Dossier de compra
- EN: Purchase dossier
- FR: Dossier d'achat

### compra.p
- PT: O custo total da compra, os impostos ao comprar, ter, arrendar e vender, em Portugal e no seu país, cenários de crédito ilustrativos, documentos e ordem dos passos, dez anos de preços da zona e os parceiros de cada passo.
- EN: For your country, budget and area: the full purchase cost, taxes when buying, owning, renting and selling, in Portugal and at home, illustrative mortgage scenarios, documents and the order of steps, ten years of area prices and the partners for each step.
- FR: Pour votre pays, budget et secteur : le coût total de l'achat, la fiscalité à l'achat, à la détention, en location et à la vente, au Portugal et chez vous, des scénarios de crédit illustratifs, les documents et l'ordre des étapes, dix ans de prix du secteur et les partenaires de chaque étape.

### zona.h
- PT: Relatório de zona
- EN: Area report
- FR: Rapport de secteur

### zona.p
- PT: Dez anos de preços, rendas dos novos contratos e rendimento bruto, comparação com os concelhos vizinhos, empreendimentos de parceiros identificados e como comprar lá a partir de fora.
- EN: One area in depth: ten years of prices, rents on new leases and gross yield, a comparison with neighbouring municipalities, labelled partner projects and how to buy there from abroad.
- FR: Un secteur en profondeur : dix ans de prix, loyers des nouveaux baux et rendement brut, comparaison avec les communes voisines, programmes partenaires signalés et comment y acheter depuis l'étranger.

### private.h
- PT: Dossier de residência e património
- EN: Residence and estate dossier
- FR: Dossier résidence et patrimoine

### private.p
- PT: Opções de residência, IFICI, herança nos dois países, questões de estrutura para os seus consultores, as zonas mais procuradas e apresentação a parceiros verificados.
- EN: Residence options, IFICI, inheritance across both countries, structuring questions to discuss with your advisers, the most sought-after areas and introductions to vetted partners.
- FR: Options de résidence, IFICI, succession dans les deux pays, questions de structuration à discuter avec vos conseillers, les secteurs les plus recherchés et mise en relation avec des partenaires vérifiés.

### price
- PT: {price}, IVA incluído
- EN: {price}, VAT included
- FR: {price}, TVA comprise

### soon
- PT: Disponível em breve
- EN: Available soon
- FR: Bientôt disponible

### soon.p
- PT: Abre quando a faturação estiver pronta.
- EN: Purchase opens once invoicing is ready. Until then, see a sample.
- FR: L'achat ouvre dès que la facturation est prête. D'ici là, voyez un exemple.

### sample
- PT: Ver um exemplo (PDF)
- EN: See a sample (PDF)
- FR: Voir un exemple (PDF)

### order
- PT: Receber o meu dossier
- EN: Prepare my dossier
- FR: Préparer mon dossier

### form.h
- PT: Para quem é o dossier
- EN: Who the dossier is for
- FR: Pour qui est le dossier

### form.budget
- PT: Orçamento (€)
- EN: Budget (€)
- FR: Budget (€)

### form.area
- PT: Concelho
- EN: Municipality
- FR: Commune

### form.purpose
- PT: Para quê
- EN: Purpose
- FR: Objectif

### form.own
- PT: Casa para viver
- EN: Own home
- FR: Résidence principale

### form.holiday
- PT: Casa de férias
- EN: Holiday home
- FR: Résidence secondaire

### form.rental
- PT: Para arrendar
- EN: Rental income
- FR: Revenus locatifs

### consent
- PT: Peço a entrega imediata do PDF e aceito que, com a entrega, perco o direito de livre resolução de 14 dias (DL 24/2014, art. 17.º).
- EN: I ask for the PDF to be delivered immediately and accept that, once delivered, I lose the 14-day right of withdrawal (DL 24/2014, art. 17).
- FR: Je demande la livraison immédiate du PDF et accepte qu'une fois livré, je perds le droit de rétractation de 14 jours (DL 24/2014, art. 17).

### vat
- PT: IVA incluído, à taxa do país de residência (regime OSS).
- EN: VAT included, at the rate of your country of residence (OSS scheme).
- FR: TVA comprise, au taux de votre pays de résidence (régime OSS).

### info
- PT: Informação, não aconselhamento. Para conselho jurídico, um advogado ou solicitador (Lei 49/2004); para impostos, um consultor fiscal; para crédito, o intermediário de crédito registado no Banco de Portugal, que faz a análise personalizada sem custos.
- EN: Information, not advice. For legal advice, a lawyer or solicitor (Lei 49/2004); for tax, a tax adviser; for credit, the intermediary registered with Banco de Portugal, who prepares a personalised analysis at no cost.
- FR: De l'information, pas du conseil. Pour un conseil juridique, un avocat ou un solicitador (Lei 49/2004) ; pour la fiscalité, un conseiller fiscal ; pour le crédit, l'intermédiaire enregistré auprès de la Banque du Portugal, qui réalise une analyse personnalisée sans frais.

### prepared
- PT: Preparado a {date}
- EN: Prepared on {date}
- FR: Préparé le {date}

### for
- PT: Para quem vive {where}
- EN: For readers {where}
- FR: Pour les lecteurs {where}

### summary.h
- PT: Em resumo
- EN: At a glance
- FR: En bref

### s.total
- PT: Custo total da compra
- EN: Total purchase cost
- FR: Coût total de l'achat

### s.m2
- PT: O orçamento compra, ao preço mediano
- EN: The budget buys, at the median price
- FR: Le budget permet, au prix médian

### s.median
- PT: Preço mediano na zona
- EN: Median price in the area
- FR: Prix médian du secteur

### s.ten
- PT: Variação desde 2016
- EN: Change since 2016
- FR: Variation depuis 2016

### s.rent
- PT: Renda mediana de novos contratos
- EN: Median rent on new leases
- FR: Loyer médian des nouveaux baux

### s.yield
- PT: Rendimento bruto da zona
- EN: Area gross yield
- FR: Rendement brut du secteur

### s.monthly
- PT: Prestação ilustrativa
- EN: Illustrative monthly payment
- FR: Mensualité illustrative

### costs.h
- PT: Custos da compra
- EN: Purchase costs
- FR: Frais d'achat

### finance.h
- PT: Cenários de financiamento ilustrativos
- EN: Illustrative financing scenarios
- FR: Scénarios de financement illustratifs

### finance.p
- PT: Crédito de {ltv} do preço a {years} anos, nos limites do Banco de Portugal. Não é uma oferta de crédito: a análise personalizada é feita pelo intermediário de crédito registado.
- EN: A loan of {ltv} of the price over {years} years, within Banco de Portugal's limits. Not a credit offer: the personalised analysis comes from the registered credit intermediary.
- FR: Un crédit de {ltv} du prix sur {years} ans, dans les limites de la Banque du Portugal. Ce n'est pas une offre de crédit : l'analyse personnalisée relève de l'intermédiaire de crédit enregistré.

### col.rate
- PT: Taxa anual
- EN: Annual rate
- FR: Taux annuel

### col.monthly
- PT: Prestação
- EN: Monthly payment
- FR: Mensualité

### col.interest
- PT: Juros no prazo
- EN: Interest over the term
- FR: Intérêts sur la durée

### col.stamp
- PT: Selo do crédito
- EN: Stamp duty on the loan
- FR: Timbre sur le crédit

### area.h
- PT: Dez anos de preços na zona
- EN: Ten years of prices in the area
- FR: Dix ans de prix dans le secteur

### neigh.h
- PT: Comparado com os concelhos vizinhos
- EN: Compared with neighbouring municipalities
- FR: Comparé aux communes voisines

### rents.h
- PT: Rendas dos novos contratos, por ano
- EN: Rents on new leases, by year
- FR: Loyers des nouveaux baux, par an

### devs.none
- PT: Ainda sem empreendimentos de parceiros nesta zona.
- EN: No partner projects in this area yet.
- FR: Pas encore de programmes partenaires dans ce secteur.

### steps.h
- PT: Do primeiro passo à escritura, e depois
- EN: From the first step to the deed, and after
- FR: Du premier pas à l'acte, et après

### partners.h
- PT: Os parceiros para cada passo
- EN: The partners for each step
- FR: Les partenaires de chaque étape

### tba
- PT: A anunciar
- EN: To be announced
- FR: À annoncer

### buyhow.h
- PT: Comprar aqui a partir de fora
- EN: Buying here from abroad
- FR: Acheter ici depuis l'étranger

### struct.h
- PT: Residência, impostos e estrutura
- EN: Residence, tax and structuring
- FR: Résidence, fiscalité et structuration

### prime.h
- PT: As zonas mais procuradas
- EN: The most sought-after areas
- FR: Les secteurs les plus recherchés

### examples.h
- PT: Exemplos de anúncios publicados
- EN: Examples of published listings
- FR: Exemples d'annonces publiées

### ask.h
- PT: Questões para discutir com os seus consultores
- EN: Questions to discuss with your advisers
- FR: Questions à discuter avec vos conseillers

### ask.1
- PT: Comprar em nome próprio ou através de uma sociedade: AIMI, IMT e custos de manter a estrutura.
- EN: Buying in your own name or through a company: AIMI, IMT and the cost of running the structure.
- FR: Acheter en nom propre ou via une société : AIMI, IMT et coût de la structure.

### ask.2
- PT: A lei aplicável à sucessão e o imposto sobre a herança no seu país.
- EN: The law that governs the succession and inheritance tax in your country.
- FR: La loi applicable à la succession et l'impôt successoral dans votre pays.

### ask.3
- PT: Mudar a residência fiscal: o momento, o IFICI e as regras de saída do seu país.
- EN: Moving your tax residence: the timing, IFICI and your country's exit rules.
- FR: Changer de résidence fiscale : le moment, l'IFICI et les règles de sortie de votre pays.

### ask.4
- PT: A origem dos fundos e os comprovativos que o banco, o notário e a agência vão pedir.
- EN: The origin of funds and the evidence the bank, the notary and the agency will ask for.
- FR: L'origine des fonds et les justificatifs que la banque, le notaire et l'agence demanderont.

### ask.5
- PT: Seguro, gestão da casa e custos anuais com várias propriedades.
- EN: Insurance, property management and annual costs across several properties.
- FR: Assurance, gestion du bien et coûts annuels avec plusieurs biens.

### intro.h
- PT: Apresentação a parceiros
- EN: Introductions to partners
- FR: Mise en relation avec des partenaires

### intro.p
- PT: Se quiser, apresentamos-lhe parceiros verificados para o seu país: gestor de património ou banco, consultor fiscal, advogado. Cada um com licença e marcado como patrocinado.
- EN: After you read it, we introduce vetted partners for your country: wealth manager or bank, tax adviser and lawyer. Each is shown with its licence and the sponsored label.
- FR: Après lecture, nous vous mettons en relation avec des partenaires vérifiés pour votre pays : gestionnaire de patrimoine ou banque, conseiller fiscal et avocat. Chacun figure avec sa licence et la mention sponsorisé.

### sources.h
- PT: Fontes
- EN: Sources
- FR: Sources

## path

Prompt 43 §3b: each station is a plain question (st.{k}.q) and a two or three sentence answer (st.{k}.a), then "Saiba mais" and one partner link (p.*) that opens the Concierge with the topic.

### learn
- PT: Ler em detalhe
- EN: Learn more
- FR: En savoir plus

### p.tag
- PT: Parceiro
- EN: Partner
- FR: Partenaire

### p.lawyer
- PT: Perguntar a um advogado
- EN: Clarify with a partner lawyer
- FR: En parler avec un avocat partenaire

### p.advisor
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### p.bank
- PT: Perguntar a um banco
- EN: Ask a partner bank for a simulation
- FR: Demander une simulation à une banque partenaire

### p.tax
- PT: Perguntar ao consultor fiscal
- EN: Clarify with a partner tax adviser
- FR: En parler avec un conseiller fiscal partenaire

### st.place.q
- PT: Onde posso comprar com o meu orçamento?
- EN: Where can my budget buy a home?
- FR: Où acheter avec mon budget ?

### st.place.a
- PT: O mapa mostra o preço mediano por metro quadrado em cada concelho, com dados do INE, o instituto de estatística português, e quanto espaço o seu orçamento compra, com até três zonas lado a lado.
- EN: The map shows the median price per square metre in each municipality, from INE, Portugal's statistics office. You can see how much space your budget buys in each area. You can also compare two or three areas side by side.
- FR: La carte montre le prix médian au mètre carré dans chaque commune, selon l'INE, l'institut statistique portugais. Vous voyez ainsi la surface que permet votre budget dans chaque secteur. Vous pouvez aussi comparer deux ou trois secteurs côte à côte.

### st.money.q
- PT: Como pago a casa?
- EN: How do I pay for the home?
- FR: Comment payer le bien ?

### st.money.a
- PT: Com poupanças ou crédito, de um banco português ou do país onde vive. Em Portugal, o banco empresta até 90% do valor da casa onde vai viver e até 80% de uma casa de férias, e pede os comprovativos da origem do dinheiro.
- EN: You can pay with your savings, a mortgage from a Portuguese bank or a loan from your bank at home. In Portugal, banks lend up to 90% of the value for the home you live in and up to 80% for a holiday home. The bank also asks where the money comes from, so it helps to have the proof ready.
- FR: Vous pouvez payer avec votre épargne, un crédit d'une banque portugaise ou un prêt de votre banque. Au Portugal, la banque prête jusqu'à 90 % de la valeur pour la résidence principale et jusqu'à 80 % pour une résidence secondaire. Elle demande aussi l'origine des fonds : il est utile d'avoir les justificatifs sous la main.

### st.docs.q
- PT: Que documentos preciso para comprar?
- EN: Which documents do I need to buy?
- FR: Quels documents faut-il pour acheter ?

### st.docs.a
- PT: O NIF, o número fiscal português, pedido online através de um representante (se já o tem, está feito), e um documento de identificação válido. Para assinar de onde vive, uma procuração feita num consulado português ou num notário local, com a Apostila de Haia, o selo que a torna válida em Portugal.
- EN: You need a NIF, your Portuguese tax number, which you can request online through a representative, and a valid passport or ID card. To sign from the country where you live, you give a power of attorney at a Portuguese consulate. A local notary works too, with a Hague Apostille, a stamp that makes it valid in Portugal.
- FR: Il vous faut un NIF, votre numéro fiscal portugais, que vous pouvez demander en ligne par un représentant, et une pièce d'identité valide. Pour signer depuis votre pays, vous donnez une procuration dans un consulat du Portugal. Un notaire local convient aussi, avec l'apostille de La Haye, un tampon qui la rend valable au Portugal.

### st.struct.q
- PT: E se quiser viver em Portugal parte do ano?
- EN: What if I want to live in Portugal part of the year?
- FR: Et pour vivre au Portugal une partie de l'année ?

### st.struct.a
- PT: Comprar casa e viver em Portugal são passos separados. Para viver cá há vistos de residência, como o D7, para quem vive de rendimentos próprios. A residência fiscal, o país onde paga o imposto sobre o rendimento, define os impostos; para algumas profissões, o IFICI dá uma taxa especial a quem se muda.
- EN: Buying a home and living in Portugal are separate steps: to live here, there are residence visas, such as the one for people with their own income (D7). Your tax residence, the country where you pay income tax, sets the taxes you pay in Portugal. For some professions, IFICI gives a special rate to people who move here.
- FR: Acheter et vivre au Portugal sont deux démarches distinctes : pour vivre ici, il existe des visas de résidence, comme celui des personnes qui vivent de leurs propres revenus (D7). Votre résidence fiscale, le pays où vous payez l'impôt sur le revenu, fixe les impôts que vous payez au Portugal. Pour certaines professions, l'IFICI offre un taux spécial à ceux qui s'installent.

### st.choose.q
- PT: Como vejo casas à distância?
- EN: How do I view homes from abroad?
- FR: Comment visiter des biens à distance ?

### st.choose.a
- PT: Um consultor qualificado organiza as visitas (por videochamada, com um familiar ou ao vivo) e prepara consigo a proposta. O mapa mostra também os empreendimentos novos dos promotores parceiros.
- EN: A qualified advisor arranges the viewings: by video call, with a relative, or in person when you visit Portugal. On the map, you can also see new developments from partner developers. Once you find the home, the advisor helps you prepare the offer.
- FR: Un conseiller qualifié organise les visites : en appel vidéo, avec un proche ou sur place lors de votre venue au Portugal. Sur la carte, vous voyez aussi les programmes neufs des promoteurs partenaires. Une fois le bien trouvé, le conseiller vous aide à préparer l'offre.

### st.cpcv.q
- PT: O que é o contrato-promessa?
- EN: What is the promissory contract?
- FR: Qu'est-ce que le compromis ?

### st.cpcv.a
- PT: O contrato-promessa de compra e venda (CPCV) assina-se antes da escritura e fixa o preço, a data e o sinal, o valor pago nesse dia. Se o vendedor desistir, devolve o sinal em dobro; se for o comprador, perde-o.
- EN: The promissory contract (CPCV) is signed before the deed and sets the price, the date and the deposit (sinal), the amount you pay that day. The law protects both sides: if the seller backs out, they repay the deposit twice over; if the buyer does, the seller keeps it.
- FR: Le compromis (CPCV) se signe avant l'acte et fixe le prix, la date et les arrhes (sinal), la somme versée ce jour-là. La loi protège les deux parties : si le vendeur se retire, il rend le double des arrhes ; si c'est l'acheteur, le vendeur les garde.

### st.deed.q
- PT: Como se faz a escritura?
- EN: How does the deed work?
- FR: Comment se passe l'acte ?

### st.deed.a
- PT: A escritura põe a casa em seu nome. Antes dela, paga o IMT, o imposto sobre a compra, e o imposto do selo. Num balcão Casa Pronta, escritura e registo fazem-se num só momento, pessoalmente ou por procuração.
- EN: The deed (escritura) is the act that puts the home in your name. Before it, you pay IMT, the tax on the purchase, and stamp duty. At a Casa Pronta desk, the deed and the land registration happen in one sitting, in person or through a power of attorney.
- FR: L'acte (escritura) transfère le bien à votre nom. Avant l'acte, vous payez l'IMT, l'impôt sur l'achat, et le droit de timbre. Dans un guichet Casa Pronta, l'acte et l'inscription au registre se font en une seule fois, en personne ou par procuration.

### st.estate.q
- PT: Em nome próprio ou por uma sociedade?
- EN: In your own name or through a company?
- FR: En nom propre ou par une société ?

### st.estate.a
- PT: Cada forma tem impostos próprios. Quando a soma dos valores patrimoniais, o valor fiscal das casas, passa de 600 000 € por pessoa, aplica-se o AIMI, um adicional ao imposto municipal, com taxas diferentes para pessoas e sociedades.
- EN: You can buy in your own name or through a company, and each has its own taxes. When the tax values of your homes in Portugal add up to more than €600,000 per person, AIMI applies, an additional property tax. AIMI rates differ for individuals and companies.
- FR: Vous pouvez acheter en nom propre ou par une société, et chaque formule a sa fiscalité. Quand la somme des valeurs fiscales de vos biens au Portugal dépasse 600 000 € par personne, l'AIMI s'applique, un impôt additionnel sur l'immobilier. Les taux de l'AIMI diffèrent entre personnes et sociétés.

### st.keys.q
- PT: O que acontece quando recebo as chaves?
- EN: What happens when I get the keys?
- FR: Que se passe-t-il à la remise des clés ?

### st.keys.a
- PT: Com as chaves, passa a água, a luz e o gás para o seu nome e escolhe o seguro da casa. As Finanças, a autoridade tributária, escrevem para a morada fiscal que indicar.
- EN: You get the keys, move the water, power and gas contracts into your name and choose home insurance. The Finanças, Portugal's tax authority, send their letters to the tax address you give them.
- FR: Vous recevez les clés, mettez l'eau, l'électricité et le gaz à votre nom et choisissez une assurance habitation. Les Finanças, l'administration fiscale portugaise, envoient leur courrier à l'adresse fiscale que vous indiquez.

### st.own.q
- PT: Que impostos pago como proprietário?
- EN: What taxes do I pay as an owner?
- FR: Quels impôts payer en tant que propriétaire ?

### st.own.a
- PT: Todos os anos, o IMI, o imposto municipal sobre a casa: entre 0,3% e 0,45% do valor fiscal. Se arrendar, as rendas de não residentes pagam 25% em Portugal, menos em contratos longos. O país onde vive pode também ter regras para elas.
- EN: Each year you pay IMI, the municipal tax on the home, between 0.3% and 0.45% of its tax value. If you rent it out, rent earned by non-residents is taxed at 25% in Portugal, with lower rates for long leases. Your home country may also have rules for that rent.
- FR: Chaque année, vous payez l'IMI, l'impôt municipal sur le bien, entre 0,3 % et 0,45 % de sa valeur fiscale. Si vous louez, les loyers des non-résidents sont imposés à 25 % au Portugal, avec des taux réduits pour les baux longs. Votre pays peut aussi avoir ses règles pour ces loyers.

### st.later.q
- PT: E se um dia vender?
- EN: What if I sell one day?
- FR: Et si je revends un jour ?

### st.later.a
- PT: Em Portugal, metade da mais-valia, o ganho na venda, conta para o IRS, o imposto sobre o rendimento. O país onde vive pode também tributá-la, segundo o acordo fiscal entre os dois.
- EN: In Portugal, only half of the capital gain, the profit on the sale, counts for income tax (IRS). Your home country may also tax it, under the tax treaty between the two countries.
- FR: Au Portugal, seule la moitié de la plus-value, le gain sur la vente, compte pour l'impôt sur le revenu (IRS). Votre pays peut aussi l'imposer, selon la convention fiscale entre les deux pays.

### st.worth.q
- PT: Quanto vale a minha casa?
- EN: What is my home worth?
- FR: Combien vaut mon bien ?

### st.worth.a
- PT: O mapa mostra o preço mediano por metro quadrado no seu concelho, com dados do INE. Para a sua casa, um consultor qualificado faz uma avaliação sem compromisso.
- EN: The map shows the median price per square metre in your municipality, from official INE data. For a figure for your own home, a qualified advisor gives you a valuation with no commitment.
- FR: La carte montre le prix médian au mètre carré dans votre commune, selon les données officielles de l'INE. Pour un chiffre sur votre bien, un conseiller qualifié fait une estimation sans engagement.

### st.inherit.q
- PT: Como trato de uma casa herdada?
- EN: How do I handle an inherited home?
- FR: Comment gérer un bien hérité ?

### st.inherit.a
- PT: Os herdeiros comunicam o óbito e os bens às Finanças até ao fim do terceiro mês seguinte, mesmo quando estão isentos. Cônjuge, filhos e pais não pagam o imposto do selo de 10% sobre a herança. A habilitação de herdeiros, o documento que diz quem herda, permite registar a casa em nome de cada um.
- EN: The heirs report the death and the assets to the Finanças, the tax office, by the end of the third following month, even when they are exempt. A spouse or partner, children and parents don't pay the 10% stamp duty on inheritance. A declaration of heirs (habilitação de herdeiros), the document that names who inherits, then lets you register the home in their names.
- FR: Les héritiers déclarent le décès et les biens aux Finanças, l'administration fiscale, avant la fin du troisième mois suivant, même s'ils sont exonérés. Le conjoint ou partenaire, les enfants et les parents ne paient pas le droit de timbre de 10 % sur la succession. L'acte de notoriété (habilitação de herdeiros), qui désigne les héritiers, permet ensuite d'inscrire le bien à leur nom.

### st.taxes.q
- PT: Que impostos pago na venda?
- EN: What tax do I pay when I sell?
- FR: Quels impôts sur la vente ?

### st.taxes.a
- PT: Em Portugal, metade da mais-valia, o ganho na venda, conta para o IRS, o imposto sobre o rendimento, e a taxa final depende dos seus rendimentos. O país onde vive pode também tributar o ganho, segundo o acordo fiscal entre os dois.
- EN: In Portugal, only half of the capital gain, the profit on the sale, counts for income tax (IRS). The final rate depends on your income. Your home country may also tax the gain, under the tax treaty between the two countries.
- FR: Au Portugal, seule la moitié de la plus-value, le gain sur la vente, compte pour l'impôt sur le revenu (IRS). Le taux final dépend de vos revenus. Votre pays peut aussi imposer ce gain, selon la convention fiscale entre les deux pays.

### st.prepare.q
- PT: Que documentos pede a venda?
- EN: Which documents does the sale need?
- FR: Quels documents pour la vente ?

### st.prepare.a
- PT: Para a escritura: identificação e NIF de quem vende, a ficha técnica da casa, se existir, e a licença de utilização (o documento da câmara municipal que permite habitar a casa) ou a sua dispensa.
- EN: For the deed, you bring the sellers' ID and NIF, the home's technical file (ficha técnica) if there is one, and the usage licence or its waiver. The usage licence (licença de utilização) is the town hall's permit that lets people live in the home.
- FR: Pour l'acte, vous réunissez l'identité et le NIF des vendeurs, la fiche technique du logement (ficha técnica) s'il y en a une, et le permis d'habiter ou sa dispense. Le permis d'habiter (licença de utilização) est l'autorisation de la mairie qui permet d'occuper le logement.

### st.list.q
- PT: Como ponho a casa à venda?
- EN: How do I put the home on the market?
- FR: Comment mettre le bien en vente ?

### st.list.a
- PT: Um consultor qualificado anuncia a casa, mostra-a e traz-lhe as propostas. O contrato de mediação, o acordo escrito com a mediadora, fixa o preço pedido e as condições.
- EN: A qualified advisor lists the home, runs the viewings and brings you the offers, while you live abroad. The brokerage agreement (contrato de mediação) sets the asking price and the terms.
- FR: Un conseiller qualifié publie l'annonce, organise les visites et vous présente les offres, pendant que vous vivez à l'étranger. Le mandat (contrato de mediação), l'accord écrit avec son agence, fixe le prix demandé et les conditions.

### st.sdeed.q
- PT: Como assino a venda?
- EN: How do I sign the sale?
- FR: Comment signer la vente ?

### st.sdeed.a
- PT: Num notário ou num balcão Casa Pronta, onde escritura e registo se fazem num só momento. Pessoalmente ou por procuração, a partir do país onde vive.
- EN: You sign the deed of sale at a notary or a Casa Pronta desk, where the deed and the registration happen in one sitting. You can attend in person or sign through a power of attorney from the country where you live.
- FR: Vous signez l'acte de vente chez un notaire ou dans un guichet Casa Pronta, où l'acte et l'enregistrement se font en une seule fois. Vous pouvez être présent ou signer par procuration depuis votre pays.

### st.smoney.q
- PT: Como trago o dinheiro da venda?
- EN: How do I bring the money home?
- FR: Comment rapatrier l'argent de la vente ?

### st.smoney.a
- PT: O comprador paga para uma conta sua, em Portugal ou no país onde vive. O banco pode pedir o comprovativo da venda como origem do dinheiro, e o seu país pode ter declarações próprias para contas no estrangeiro.
- EN: The buyer pays into your account, in Portugal or in the country where you live. Your bank may ask for proof of the sale to show where the money comes from. Your country may also have its own reporting for accounts abroad.
- FR: L'acheteur paie sur votre compte, au Portugal ou dans votre pays. Votre banque peut demander la preuve de la vente pour justifier l'origine des fonds. Votre pays peut aussi avoir ses propres déclarations pour les comptes à l'étranger.

### end.h
- PT: Leve o percurso consigo
- EN: Take the path with you
- FR: Emportez le Pas à pas

### saved
- PT: O seu progresso fica guardado neste dispositivo.
- EN: Your progress stays on this device.
- FR: Votre progression reste sur cet appareil.

### local
- PT: Cerca de {v}
- EN: About {v}
- FR: Environ {v}

### progress
- PT: {n} de {t} etapas feitas
- EN: {n} of {t} steps done
- FR: {n} étapes sur {t} faites

### stepof
- PT: Passo {n} de {t}
- EN: Step {n} of {t}
- FR: Étape {n} sur {t}

### st.smoney.h
- PT: Trazer o dinheiro
- EN: Moving the money
- FR: Rapatrier l'argent

### st.sdeed.h
- PT: A escritura
- EN: The deed
- FR: L'acte

### st.list.h
- PT: Pôr à venda com um consultor
- EN: Listing with an advisor
- FR: Mettre en vente avec un conseiller

### st.prepare.h
- PT: Preparar a casa
- EN: Preparing the home
- FR: Préparer le bien

### st.taxes.h
- PT: Os impostos em Portugal e no seu país
- EN: Taxes in Portugal and at home
- FR: Les impôts au Portugal et chez vous

### st.inherit.h
- PT: A herança e o registo
- EN: The inheritance and registration
- FR: La succession et l'enregistrement

### st.worth.h
- PT: Quanto vale a casa
- EN: What the home is worth
- FR: Ce que vaut le bien

### st.estate.h
- PT: Património e forma de deter a casa
- EN: Your holdings and how to hold the home
- FR: Patrimoine et façon de détenir le bien

### st.struct.h
- PT: Residência e estrutura
- EN: Residence and structuring
- FR: Résidence et structuration

### st.later.h
- PT: Vender mais tarde
- EN: Selling later
- FR: Vendre plus tard

### st.own.h
- PT: Ser proprietário, arrendar e segurar
- EN: Owning, renting and insurance
- FR: Être propriétaire, louer et assurer

### st.keys.h
- PT: As chaves
- EN: The keys
- FR: Les clés

### st.deed.h
- PT: Os impostos e a escritura
- EN: Taxes and the deed
- FR: Les impôts et l'acte

### st.cpcv.h
- PT: O contrato-promessa
- EN: The promissory contract
- FR: Le compromis

### st.choose.h
- PT: Escolher a casa
- EN: Choosing the home
- FR: Choisir le bien

### st.docs.h
- PT: Os documentos
- EN: The documents
- FR: Les documents

### st.money.h
- PT: O financiamento e o dinheiro
- EN: Financing and moving the money
- FR: Le financement et l'argent

### st.place.h
- PT: O orçamento e o lugar
- EN: The budget and the place
- FR: Le budget et le lieu

### toc
- PT: As etapas
- EN: The steps
- FR: Les étapes

### faq
- PT: Ver todas as perguntas
- EN: All the questions
- FR: Toutes les questions

### copied
- PT: Ligação copiada
- EN: Link copied
- FR: Lien copié

### change
- PT: Mudar as respostas
- EN: Change the answers
- FR: Modifier les réponses

### email.p
- PT: A Maré, a newsletter, chega à terça e à sexta, às 8h, e o primeiro envio traz o Passo a passo. Cancela quando quiser.
- EN: Sign up to Maré, the newsletter, every Tuesday and Friday at 8 a.m.: the first email carries Step by step, and you can leave whenever you want.
- FR: Inscrivez-vous à Maré, la newsletter, chaque mardi et vendredi à 8 h : le premier e-mail contient le Pas à pas, et vous pouvez partir quand vous voulez.

### email
- PT: Receber por email
- EN: Get the path by email
- FR: Recevoir le parcours par e-mail

### share
- PT: Partilhar o percurso
- EN: Share my path
- FR: Partager mon parcours

### done
- PT: Feito
- EN: Done
- FR: Fait

### next
- PT: Próximo passo
- EN: Next step
- FR: Étape suivante

### here
- PT: Está aqui
- EN: You are here
- FR: Vous êtes ici

### start
- PT: Ver o meu percurso
- EN: Start step by step
- FR: Commencer pas à pas

### t.later
- PT: Mais tarde
- EN: Later
- FR: Plus tard

### t.year
- PT: Dentro de um ano
- EN: Within a year
- FR: D'ici un an

### t.soon
- PT: Nos próximos 3 meses
- EN: In the next 3 months
- FR: Dans les 3 prochains mois

### q.timing
- PT: Quando
- EN: When
- FR: Quand

### q.inherited
- PT: Casa herdada
- EN: The home was inherited
- FR: Le bien a été hérité

### q.value
- PT: Valor estimado da casa (€)
- EN: What the home may be worth (€)
- FR: Ce que le bien peut valoir (€)

### q.budget
- PT: Orçamento (€)
- EN: Your budget (€)
- FR: Votre budget (€)

### q.country
- PT: País de residência
- EN: Where you live
- FR: Où vous vivez

### door.sell.p
- PT: Do valor da casa ao dinheiro na sua conta, incluindo uma casa herdada.
- EN: From what the home is worth to the money in your account, including an inherited home.
- FR: De la valeur du bien à l'argent sur votre compte, y compris un bien hérité.

### door.buy.p
- PT: Da escolha da zona às chaves, e o que vem depois.
- EN: From choosing the area to the keys, and what comes after.
- FR: Du choix du secteur aux clés, et ce qui vient ensuite.

### door.sell
- PT: Vender
- EN: Sell
- FR: Vendre

### door.buy
- PT: Comprar
- EN: Buy
- FR: Acheter

### lede
- PT: Comprar ou vender casa em Portugal a partir {from}, uma pergunta de cada vez.
- EN: Buying or selling a home in Portugal from {from}, one question at a time.
- FR: Acheter ou vendre un bien au Portugal depuis {from}, une question à la fois.

### h1
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

Prompt 27: the path (two doors, stations, checklist). Blocks path.st.{k}.h / .what / .need.n per station.

## team

### do.rental
- PT: Gere o arrendamento, se arrendar a casa.
- EN: Manages the letting, if you rent the home out.
- FR: Gère la location, si vous louez le bien.

### do.architect
- PT: Arquiteto ou designer de interiores, para obras e decoração.
- EN: An architect or interior designer, for works and furnishing.
- FR: Un architecte ou un architecte d'intérieur, pour les travaux et l'aménagement.

### do.wealth
- PT: Organiza o património e a forma de deter a casa.
- EN: Organises your holdings and how you hold the home.
- FR: Organise votre patrimoine et la façon de détenir le bien.

### do.insurance
- PT: Seguro da casa e, com crédito, seguro de vida.
- EN: Home insurance and, with a mortgage, life cover.
- FR: Assurance habitation et, avec un crédit, assurance décès.

### do.tax
- PT: Vê os impostos em Portugal e no país onde vive.
- EN: Looks at the taxes in Portugal and in the country where you live.
- FR: Examine les impôts au Portugal et dans votre pays de résidence.

### do.fx
- PT: Transfere o dinheiro da sua moeda para euros.
- EN: Moves your money from your currency into euros.
- FR: Transfère votre argent de votre devise vers l'euro.

### do.bank
- PT: Intermediário de crédito registado no Banco de Portugal (DL 81-C/2017): compara e prepara o financiamento.
- EN: A credit intermediary registered with Banco de Portugal (DL 81-C/2017): compares and prepares the financing.
- FR: Intermédiaire de crédit enregistré auprès de la Banco de Portugal (DL 81-C/2017) : compare et prépare le financement.

### do.lawyer
- PT: Trata do NIF, da procuração e da escritura.
- EN: Handles your NIF (Portuguese tax number), the power of attorney and the deed.
- FR: S'occupe du NIF (numéro fiscal portugais), de la procuration et de l'acte.

### do.developer
- PT: Apresenta as casas novas do empreendimento e as condições de venda.
- EN: Presents the development's new homes and its terms of sale.
- FR: Présente les logements neufs du programme et ses conditions de vente.

### do.agency
- PT: Encontra e mostra as casas e acompanha a compra até à escritura.
- EN: Finds and shows you homes and stays with the purchase until the deed.
- FR: Trouve et fait visiter les biens, et suit l'achat jusqu'à l'acte.

### wait
- PT: Os outros passos terão um nome quando o parceiro for escolhido e verificado.
- EN: The other steps get a name once their partner is chosen and verified.
- FR: Les autres étapes auront un nom une fois leur partenaire choisi et vérifié.

### send
- PT: Pedir que me contactem
- EN: Ask the ones I chose to contact me
- FR: Demander un contact à ceux que j'ai choisis

### consent
- PT: Aceito que {name} me contacte sobre este pedido
- EN: I agree that {name} may contact me about this request
- FR: J'accepte que {name} me contacte au sujet de cette demande

### now
- PT: Neste passo
- EN: At this step
- FR: À cette étape

### p
- PT: Um parceiro por passo, para o seu caso até aqui. Só quem escolher recebe o seu pedido.
- EN: The partners your case needs so far, one per step. Choose who may contact you: only the ones you choose receive your request.
- FR: Les partenaires dont votre cas a besoin jusqu'ici, un par étape. Choisissez qui peut vous contacter : seuls ceux que vous cochez reçoivent votre demande.

### h.sell
- PT: A sua equipa para esta venda
- EN: Your team for this sale
- FR: Votre équipe pour cette vente

### h
- PT: A sua equipa para esta compra
- EN: Your team for this purchase
- FR: Votre équipe pour cet achat

Prompt 28 §2b (D54): "Your team for this purchase", the partners a case needs, step by step.

## brief

### note
- PT: Indicativo, não é uma avaliação de crédito
- EN: Indicative, not a credit assessment
- FR: Indicatif, pas une évaluation de crédit

### data
- PT: Interesse: {places}
- EN: Interested in: {places}
- FR: Intérêt : {places}

### nonif
- PT: Ainda sem NIF
- EN: No NIF yet
- FR: Pas encore de NIF

### nif
- PT: NIF já obtido
- EN: NIF in place
- FR: NIF déjà obtenu

### later
- PT: Sem data marcada
- EN: No set date
- FR: Sans date fixée

### year
- PT: Pronto dentro de um ano
- EN: Ready within a year
- FR: Prêt d'ici un an

### soon
- PT: Pronto nos próximos 3 meses
- EN: Ready within 3 months
- FR: Prêt dans les 3 mois

### dsti
- PT: Taxa de esforço indicativa {v}
- EN: Indicative debt-to-income {v}
- FR: Taux d'endettement indicatif {v}

### inherit
- PT: Casa herdada
- EN: Inherited home
- FR: Bien hérité

### sell
- PT: Quer vender
- EN: Selling
- FR: Souhaite vendre

### value
- PT: Valor indicado {v}
- EN: Stated value {v}
- FR: Valeur indiquée {v}

### budget
- PT: Orçamento {v}
- EN: Budget {v}
- FR: Budget {v}

### total
- PT: Orçamento total {v} com impostos
- EN: Total budget {v} incl. taxes
- FR: Budget total {v} frais inclus

### own
- PT: Entrada {v}
- EN: Deposit {v}
- FR: Apport {v}

### loan
- PT: Financiamento de cerca de {v}
- EN: Financing of about {v}
- FR: Financement d'environ {v}

### cash
- PT: Compra sem crédito
- EN: Cash buyer
- FR: Achat sans crédit

### from
- PT: A partir {from}
- EN: From {from}
- FR: Depuis {from}

### privacy
- PT: Como tratamos este resumo
- EN: How we handle this summary
- FR: Comment nous traitons ce résumé

### none
- PT: Sem valores do percurso ou dos simuladores: o pedido segue com as suas respostas.
- EN: No figures from the path or the calculators: the request goes with your answers.
- FR: Aucun montant du parcours ni des simulateurs : la demande part avec vos réponses.

### include
- PT: Incluir este resumo
- EN: Include this summary
- FR: Joindre ce résumé

### p
- PT: Para o consultor começar pelo seu caso.
- EN: So the advisor starts from your case.
- FR: Pour que le conseiller parte de votre cas.

### h
- PT: O que segue com o seu pedido
- EN: What goes with your request
- FR: Ce qui accompagne votre demande

Prompt 28 §2b (D54): the qualified summary that goes with a partner enquiry (indicative, never a decision).

## show

### list
- PT: Promotores parceiros
- EN: Partner developers
- FR: Promoteurs partenaires

### open
- PT: Ver as casas
- EN: View the homes
- FR: Voir les logements

### title
- PT: {developer} em {muni}
- EN: {developer} in {muni}
- FR: {developer} à {muni}

### gallery
- PT: Galeria
- EN: Gallery
- FR: Galerie

### partners
- PT: Promotores parceiros aqui
- EN: Partner developers here
- FR: Promoteurs partenaires ici

### back
- PT: Todas as casas
- EN: All the homes
- FR: Tous les logements

### published
- PT: Preços como publicados a {date}; podem mudar sem aviso.
- EN: Prices as published on {date}; they may change without notice.
- FR: Prix tels que publiés le {date} ; ils peuvent changer sans préavis.

### sources
- PT: Fontes das casas e dos preços
- EN: Sources for the homes and prices
- FR: Sources des logements et des prix

### credit
- PT: Imagens: {credit}.
- EN: Images: {credit}.
- FR: Images : {credit}.

### viewing.p
- PT: O pedido segue para {to}, com o resumo do seu caso, se quiser. Visita no local ou por vídeo.
- EN: The request goes to {to}, with the summary of your case if you choose to include it. In person or by video.
- FR: La demande part vers {to}, avec le résumé de votre cas si vous choisissez de le joindre. Sur place ou en vidéo.

### viewing
- PT: Marcar uma visita privada
- EN: Book a private visit
- FR: Réserver une visite privée

### cost.open
- PT: Calcular com este preço
- EN: Open the calculator with this price
- FR: Ouvrir le simulateur avec ce prix

### cost.total
- PT: Total indicativo
- EN: Indicative total
- FR: Total indicatif

### cost.deed
- PT: Escritura e registo
- EN: Deed and registration
- FR: Acte et enregistrement

### cost.is
- PT: Imposto do selo
- EN: Stamp duty
- FR: Droit de timbre

### cost.imt
- PT: IMT
- EN: Transfer tax (IMT)
- FR: IMT

### cost.price
- PT: Preço publicado
- EN: Published price
- FR: Prix publié

### cost.p
- PT: Comprador a viver no estrangeiro, sem crédito: valores indicativos do simulador, com as taxas oficiais.
- EN: For a buyer living abroad, without a mortgage: indicative figures from the calculator, at the official rates.
- FR: Pour un acheteur vivant à l'étranger, sans crédit : montants indicatifs du simulateur, aux taux officiels.

### cost.h
- PT: O custo de comprar esta casa
- EN: What buying this home costs
- FR: Ce que coûte l'achat de ce logement

### ctx.src
- PT: INE, {q}. Valores passados não garantem valores futuros; estatística oficial, não uma avaliação.
- EN: INE, {q}. Past values do not guarantee future values; official statistics, not a valuation.
- FR: INE, {q}. Les valeurs passées ne garantissent pas les valeurs futures ; statistique officielle, pas une estimation.

### ctx.yield
- PT: Rendimento bruto
- EN: Gross yield
- FR: Rendement brut

### ctx.rent
- PT: Renda mediana por m² por mês
- EN: Median rent per m² a month
- FR: Loyer médian au m² par mois

### ctx.g10
- PT: Variação desde 2016
- EN: Change since 2016
- FR: Évolution depuis 2016

### ctx.m2
- PT: Preço mediano por m² das casas vendidas
- EN: Median price per m² of homes sold
- FR: Prix médian au m² des logements vendus

### ctx
- PT: {muni} em números oficiais
- EN: {muni} in official figures
- FR: {muni} en chiffres officiels

### plotarea
- PT: lote de {v} m²
- EN: plot of {v} m²
- FR: terrain de {v} m²

### plot
- PT: Lote
- EN: Plot
- FR: Terrain

### view
- PT: Ver a casa
- EN: View the home
- FR: Voir le logement

### delivery
- PT: Entrega {v}
- EN: Delivery {v}
- FR: Livraison {v}

### onrequest
- PT: Preço sob consulta
- EN: Price on request
- FR: Prix sur demande

### from
- PT: Desde {v}
- EN: From {v}
- FR: À partir de {v}

### homes
- PT: As casas
- EN: The homes
- FR: Les logements

Prompt 28 §2 (D53): the partner showcase page and its home detail (partners only on the site; each private demo shows its own developer).

## home2

Design v2 home (prompt 32, D59). Every block: one to three sentences, at most 45 words, one action. Proposal, see design/COPY_V2.md.

### h1.lu
- PT: Comprar casa em Portugal a partir do Luxemburgo.
- EN: A home in Portugal, without leaving Luxembourg.
- FR: Une maison au Portugal, sans quitter le Luxembourg.

### h1.fr
- PT: Comprar casa em Portugal a partir de França.
- EN: A home in Portugal, without leaving France.
- FR: Une maison au Portugal, sans quitter la France.

### h1.ch
- PT: Comprar casa em Portugal a partir da Suíça.
- EN: A home in Portugal, without leaving Switzerland.
- FR: Une maison au Portugal, sans quitter la Suisse.

### h1.br
- PT: Comprar casa em Portugal a partir do Brasil.
- EN: A home in Portugal, without leaving Brazil.
- FR: Une maison au Portugal, sans quitter le Brésil.

### h1.us
- PT: Comprar casa em Portugal a partir dos EUA.
- EN: A home in Portugal, without leaving the US.
- FR: Une maison au Portugal, sans quitter les États-Unis.

### h1.il
- PT: Comprar casa em Portugal a partir de Israel.
- EN: A home in Portugal, without leaving Israel.
- FR: Une maison au Portugal, sans quitter Israël.

### h1.uk
- PT: Casa em Portugal, sem sair do Reino Unido.
- EN: A home in Portugal, without leaving the UK.
- FR: Une maison au Portugal, sans quitter le Royaume-Uni.

### lede
- PT: Os preços oficiais dos 308 concelhos, o custo completo de cada compra e quem trata de cada passo.
- EN: Official prices for 308 municipalities, the real cost of each purchase and who handles each step.
- FR: Les prix officiels de 308 communes, le coût réel de chaque achat et qui s'occupe de chaque étape.

### bar.live
- PT: Vivo
- EN: I live in
- FR: J'habite

### bar.in.lu
- PT: no Luxemburgo
- EN: Luxembourg
- FR: au Luxembourg

### bar.in.fr
- PT: em França
- EN: France
- FR: en France

### bar.in.ch
- PT: na Suíça
- EN: Switzerland
- FR: en Suisse

### bar.in.br
- PT: no Brasil
- EN: Brazil
- FR: au Brésil

### bar.in.us
- PT: nos Estados Unidos
- EN: the United States
- FR: aux États-Unis

### bar.in.il
- PT: em Israel
- EN: Israel
- FR: en Israël

### bar.in.uk
- PT: no Reino Unido
- EN: the United Kingdom
- FR: au Royaume-Uni

### bar.want
- PT: Quero
- EN: I want to
- FR: Je veux

### bar.buy
- PT: comprar
- EN: buy
- FR: acheter

### bar.sell
- PT: vender
- EN: sell
- FR: vendre

### bar.budget
- PT: Orçamento
- EN: Budget
- FR: Budget

### bar.value
- PT: Valor da casa
- EN: Home value
- FR: Valeur du bien

### bar.go
- PT: Começar
- EN: Start
- FR: Commencer

### about.h
- PT: Uma publicação para quem vive fora.
- EN: Information first, partners second.
- FR: D'abord l'information, ensuite les partenaires.

### about.p
- PT: Para quem vive noutro país e quer comprar ou vender casa em Portugal. Cada número com a fonte oficial e, quando precisar, um parceiro licenciado.
- EN: We are a publication for people who live abroad and want to buy or sell in Portugal. Every figure carries its official source. When you need someone, we introduce a licensed partner.
- FR: Nous sommes une publication pour ceux qui vivent à l'étranger et veulent acheter ou vendre au Portugal. Chaque chiffre porte sa source officielle. Quand il vous faut quelqu'un, nous présentons un partenaire agréé.

### about.a
- PT: Ver como trabalhamos
- EN: How we work
- FR: Notre méthode

### map.h
- PT: Quanto compra o seu orçamento, concelho a concelho.
- EN: What your budget buys, municipality by municipality.
- FR: Ce que votre budget achète, commune par commune.

### map.p
- PT: Escreva um valor e veja os metros quadrados nos 308 concelhos. Medianas do INE, 2.º trimestre de 2026.
- EN: Enter an amount and see the square metres in each of the 308 municipalities. INE medians, second quarter of 2026.
- FR: Indiquez un montant et voyez les mètres carrés dans chacune des 308 communes. Médianes de l'INE, deuxième trimestre 2026.

### map.a
- PT: Ver o mapa completo
- EN: See the full map
- FR: Voir la carte complète

### places.h
- PT: Seis lugares, cada um com o preço oficial.
- EN: Six places, six official prices.
- FR: Six lieux, six prix officiels.

### places.lisboa.n
- PT: Lisboa
- EN: Lisbon
- FR: Lisbonne

### places.porto.n
- PT: Porto
- EN: Porto
- FR: Porto

### places.coast.n
- PT: A costa
- EN: The coast
- FR: La côte

### places.one
- PT: Mediana de {v} por metro quadrado.
- EN: A median of {v} per square metre.
- FR: Médiane de {v} le mètre carré.

### places.coast
- PT: Medianas entre {a} e {b} por metro quadrado, em Cascais, Grândola e Loulé.
- EN: Medians between {a} and {b} per square metre in Cascais, Grândola and Loulé.
- FR: Médianes entre {a} et {b} le mètre carré à Cascais, Grândola et Loulé.

### places.a
- PT: Ver no mapa
- EN: See on the map
- FR: Voir sur la carte

### paths.h
- PT: Comprar ou vender, um passo de cada vez.
- EN: Buying or selling, one step at a time.
- FR: Acheter ou vendre, une étape à la fois.

### paths.p
- PT: Cada etapa explicada, uma pergunta de cada vez. Também para quem herdou casa.
- EN: Buy, sell or inherit from where you live. One question at a time, each stage explained.
- FR: Acheter, vendre ou hériter depuis chez vous. Une question à la fois, chaque étape expliquée.

### paths.a
- PT: Ver o Passo a passo
- EN: Start Step by step
- FR: Commencer le Pas à pas

### buy.h
- PT: Comprar
- EN: Buy
- FR: Acheter

### buy.p
- PT: Nove passos, cada um com o custo e os documentos.
- EN: Nine steps, each with its real cost and the documents you need.
- FR: Neuf étapes, chacune avec son coût réel et les documents nécessaires.

### buy.a
- PT: Ver os nove passos
- EN: Buying, step by step
- FR: Acheter, pas à pas

### sell.h
- PT: Vender
- EN: Sell
- FR: Vendre

### sell.p
- PT: Sete passos, com os impostos e o que pode tratar à distância.
- EN: Seven steps, with the taxes and what you can do from abroad.
- FR: Sept étapes, avec les impôts et ce que vous pouvez faire à distance.

### sell.a
- PT: Ver os sete passos
- EN: Selling, step by step
- FR: Vendre, pas à pas

### qa.h
- PT: As perguntas que mais nos fazem.
- EN: The questions we are asked most.
- FR: Les questions qu'on nous pose le plus.

### qa.a
- PT: Ver todas as respostas
- EN: See all questions
- FR: Voir toutes les questions

### photos.h
- PT: Portugal em seis fotografias.
- EN: Portugal in six photographs.
- FR: Le Portugal en six photographies.

### prices.h
- PT: Dez anos de preços oficiais.
- EN: Ten years of official prices.
- FR: Dix ans de prix officiels.

### prices.p
- PT: O metro quadrado vendido em Portugal valia {from} em 2016 e {to} em 2026.
- EN: A square metre sold in Portugal was {from} in 2016 and {to} in 2026.
- FR: Le mètre carré vendu au Portugal valait {from} en 2016 et {to} en 2026.

### prices.a
- PT: Ver preços e rendas
- EN: See prices and rents
- FR: Voir les prix et les loyers

### nl.h
- PT: Maré
- EN: Maré
- FR: Maré

### nl.p
- PT: Às 8h de Lisboa, um lugar com história e o que fazer no fim de semana. Três minutos de leitura, grátis. Cancele quando quiser.
- EN: At 8 a.m. Lisbon time, a place with a story and what to do at the weekend. A three-minute read, free. Leave whenever you like.
- FR: À 8 h, heure de Lisbonne, un lieu chargé d'histoire et que faire le week-end. Trois minutes de lecture, gratuit. Vous partez quand vous voulez.

### nl.email
- PT: O seu email
- EN: Your email
- FR: Votre e-mail

### nl.consent
- PT: Aceito receber a Maré por email. Posso cancelar em qualquer envio.
- EN: I agree to receive Maré. I can unsubscribe from any email.
- FR: J'accepte de recevoir Maré. Je peux me désabonner depuis chaque e-mail.

### nl.a
- PT: Receber a Maré
- EN: Sign up
- FR: M'inscrire

### ft.buy
- PT: Comprar
- EN: Buy
- FR: Acheter

### ft.sell
- PT: Vender
- EN: Sell
- FR: Vendre

### ft.map
- PT: Mapa
- EN: Map
- FR: Carte

### ft.qa
- PT: Perguntas
- EN: Questions
- FR: Questions

### ft.partners
- PT: Parceiros
- EN: Partners
- FR: Partenaires

### ft.editions
- PT: Edições
- EN: Editions
- FR: Éditions

### ft.langs
- PT: Línguas
- EN: Languages
- FR: Langues

### ft.legal
- PT: Informação legal
- EN: Legal
- FR: Mentions

### places.cascais.n
- PT: Cascais
- EN: Cascais
- FR: Cascais

### places.comporta.n
- PT: Comporta
- EN: Comporta
- FR: Comporta

### places.algarve.n
- PT: Algarve
- EN: Algarve
- FR: Algarve

### places.madeira.n
- PT: Madeira
- EN: Madeira
- FR: Madeira

### places.muni
- PT: Mediana do concelho de {m}: {v} por m².
- EN: {m} municipality median: {v} per m².
- FR: Médiane de la commune de {m} : {v} le m².

### places.wait
- PT: Fotografia a chegar.
- EN: Photograph to come.
- FR: Photographie à venir.

### map.more
- PT: Ver mais dados
- EN: More
- FR: Plus

## map3

Prompt 36 (D62): map v3. Budget gesture, layer chips, Day/Night, search, time, compare, tours, the place sheet.

### budget.label
- PT: O seu orçamento
- EN: Your budget
- FR: Votre budget

### budget.tap
- PT: Toque para escrever
- EN: Tap to type
- FR: Touchez pour saisir

### sentence
- PT: Com cerca de {b}, compra perto de {a} m² em {pa} e {c} m² em {pc}.
- EN: Around {b} buys about {a} m² in {pa}, {c} m² in {pc}.
- FR: Avec environ {b}, on achète près de {a} m² à {pa} et {c} m² à {pc}.

### sentence.one
- PT: Com cerca de {b}, compra perto de {a} m² em {pa}.
- EN: Around {b} buys about {a} m² in {pa}.
- FR: Avec environ {b}, on achète près de {a} m² à {pa}.

### medians
- PT: Medianas do INE, {q}.
- EN: INE medians, {q}.
- FR: Médianes de l'INE, {q}.

### reach
- PT: Nos lugares iluminados, este valor compra 100 m² ou mais.
- EN: The glowing places buy 100 m² or more at this amount.
- FR: Les lieux qui brillent offrent 100 m² ou plus à ce montant.

### chip.price
- PT: Preço
- EN: Price
- FR: Prix

### chip.g10
- PT: 10 anos
- EN: 10 years
- FR: 10 ans

### chip.rent
- PT: Renda
- EN: Rent
- FR: Loyer

### chip.yield
- PT: Rentabilidade
- EN: Yield
- FR: Rendement

### chip.vac
- PT: Casas vagas
- EN: Empty homes
- FR: Logements vacants

### legend.vac
- PT: Casas vagas, em % do parque habitacional (INE, Censos 2021)
- EN: Empty homes, as a share of all dwellings (INE, 2021 Census)
- FR: Logements vacants, en % du parc (INE, recensement 2021)

### card.vacline
- PT: Censos 2021 (INE): {v} das casas vagas e {s} de uso sazonal, como casas de férias.
- EN: In the 2021 Census (INE), {v} of homes stood empty and {s} were seasonal (second homes): homes to restore, and a sense of life outside summer.
- FR: Au recensement 2021 (INE), {v} des logements étaient vacants et {s} à usage saisonnier (résidences secondaires) : des maisons à rénover, et une idée de la vie hors saison.

### chip.golf
- PT: Golfe
- EN: Golf
- FR: Golf

### chip.beach
- PT: Praias
- EN: Beaches
- FR: Plages

### chip.devs
- PT: Novos empreendimentos
- EN: New developments
- FR: Programmes neufs

### layers
- PT: Camadas
- EN: Layers
- FR: Calques

### legend.price
- PT: Preço mediano por m², {q}
- EN: Median price per m², {q}
- FR: Prix médian au m², {q}

### legend.g10
- PT: Variação do preço em 10 anos
- EN: Price change over 10 years
- FR: Évolution du prix sur 10 ans

### legend.rent
- PT: Renda mediana por m² e mês, {q}
- EN: Median rent per m² a month, {q}
- FR: Loyer médian au m² par mois, {q}

### legend.yield
- PT: Rentabilidade bruta do arrendamento
- EN: Gross rental yield
- FR: Rendement locatif brut

### search
- PT: Procurar lugar, praia ou golfe
- EN: Search a place, a beach or a golf course
- FR: Chercher un lieu, une plage ou un golf

### search.short
- PT: Procurar
- EN: Search
- FR: Rechercher

### g.munis
- PT: Concelhos
- EN: Municipalities
- FR: Communes

### g.pars
- PT: Freguesias
- EN: Parishes
- FR: Paroisses

### g.golf
- PT: Campos de golfe
- EN: Golf courses
- FR: Golfs

### g.beach
- PT: Praias
- EN: Beaches
- FR: Plages

### g.devs
- PT: Empreendimentos parceiros
- EN: Partner developments
- FR: Programmes partenaires

### card.price
- PT: Preço por m²
- EN: Price per m²
- FR: Prix au m²

### card.g10
- PT: Em 10 anos
- EN: Over 10 years
- FR: Sur 10 ans

### card.rent
- PT: Renda por m², mês
- EN: Rent per m², month
- FR: Loyer au m², mois

### card.homes
- PT: Encontrar casa aqui
- EN: See homes here
- FR: Voir les biens ici

### card.concierge
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### card.compare
- PT: Comparar
- EN: Compare
- FR: Comparer

### card.details
- PT: Ver mais números
- EN: Details
- FR: Détails

### card.pickb
- PT: Toque noutro lugar para comparar com {a}.
- EN: Tap another place to compare with {a}.
- FR: Touchez un autre lieu pour comparer avec {a}.

### card.buys
- PT: Com o seu orçamento: {v} m²
- EN: With your budget: {v} m²
- FR: Avec votre budget : {v} m²

### card.m2b
- PT: m² com o orçamento
- EN: m² for your budget
- FR: m² avec votre budget

### time
- PT: Ano
- EN: Year
- FR: Année

### play
- PT: Ver dez anos
- EN: Play ten years
- FR: Voir dix ans défiler

### pause
- PT: Pausa
- EN: Pause
- FR: Pause

### tours
- PT: Visitas guiadas
- EN: Guided tours
- FR: Visites guidées

### tour.coast
- PT: A costa, do Porto à Comporta
- EN: The coast, from Porto to Comporta
- FR: La côte, de Porto à Comporta

### tour.golf
- PT: Golfe no Algarve
- EN: Golf on the Algarve
- FR: Le golf en Algarve

### tour.madeira
- PT: Madeira
- EN: Madeira
- FR: Madère

### tour.time
- PT: Cinco anos em vinte segundos
- EN: Five years in twenty seconds
- FR: Cinq ans en vingt secondes

### tour.takeover
- PT: Toque no mapa para continuar por si.
- EN: Touch the map to take over.
- FR: Touchez la carte pour reprendre la main.

### tour.golfcap
- PT: {n} campos de golfe no Algarve.
- EN: {n} golf courses on the Algarve, along the Atlantic.
- FR: {n} golfs en Algarve, le long de l'Atlantique.

### tour.timecap
- PT: Preço mediano por m², {q}.
- EN: Median price per m², {q}.
- FR: Prix médian au m², {q}.

### open
- PT: Abrir o mapa
- EN: Open the map
- FR: Ouvrir la carte

### close
- PT: Fechar
- EN: Close
- FR: Fermer

### noscript
- PT: O mapa precisa de JavaScript. Na lista abaixo, os 308 concelhos e o preço de cada um.
- EN: The map needs JavaScript. All 308 municipalities and their prices are in the list below.
- FR: La carte a besoin de JavaScript. Les 308 communes et leurs prix sont dans la liste ci-dessous.

### credits
- PT: Fonte: INE · © OpenStreetMap contributors · Relevo: Terrain Tiles (AWS Open Data)
- EN: Source: INE · © OpenStreetMap contributors · Relief: Terrain Tiles (AWS Open Data)
- FR: Source : INE · © OpenStreetMap contributors · Relief : Terrain Tiles (AWS Open Data)

## flow

Prompt 35 §3 (D61): the requests as one question at a time (concierge, partner request, private viewing). Same fields, data, consent and routing as the Tally forms (ops/TALLY_CONSULTA.md, ops/SETUP.md §4). Submission: ops/ARCHITECTURE.md.

Prompt 43 §3b: the partner links on the path and the questions open the Concierge with ?topic=lawyer|advisor|bank|tax. Bank and tax have no signed partner yet: the first screen says topic.intro and the request goes to the qualified advisor (D66).

### topic
- PT: Assunto
- EN: Topic
- FR: Sujet

### topic.intro
- PT: Apresentamos-lhe a pessoa certa.
- EN: We'll introduce you to the right person.
- FR: Nous vous présentons la bonne personne.

### topic.lawyer
- PT: Uma questão jurídica
- EN: A legal question
- FR: Une question juridique

### topic.advisor
- PT: Encontrar a casa
- EN: Finding the home
- FR: Trouver le bien

### topic.bank
- PT: Crédito e banco
- EN: Mortgage and the bank
- FR: Crédit et banque

### topic.tax
- PT: Impostos
- EN: Taxes
- FR: Impôts

### back
- PT: Voltar
- EN: Back
- FR: Retour

### next
- PT: Continuar
- EN: Continue
- FR: Continuer

### skip
- PT: Saltar
- EN: Skip
- FR: Passer

### of
- PT: {i} de {n}
- EN: {i} of {n}
- FR: {i} sur {n}

### close
- PT: Fechar
- EN: Close
- FR: Fermer

### c.title
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### c.lede
- PT: Quinze minutos por vídeo com um consultor qualificado, sem custos. Pedir leva um minuto.
- EN: Fifteen minutes by video with a qualified advisor, at no cost. Asking takes a minute.
- FR: Quinze minutes en vidéo avec un conseiller qualifié, sans frais. La demande prend une minute.

### c.country
- PT: Onde vive?
- EN: Where do you live?
- FR: Où vivez-vous ?

### other
- PT: Outro país
- EN: Another country
- FR: Un autre pays

### c.budget
- PT: Qual é, mais ou menos, o seu orçamento?
- EN: Roughly what is your budget?
- FR: Quel est, à peu près, votre budget ?

### c.budget.1
- PT: < 300 mil €
- EN: < €300k
- FR: < 300 k€

### c.budget.2
- PT: 300 mil–1 M€
- EN: €300k–1M
- FR: 300 k€–1 M€

### c.budget.3
- PT: 1–5 M€
- EN: €1–5M
- FR: 1–5 M€

### c.budget.4
- PT: > 5 M€
- EN: > €5M
- FR: > 5 M€

### more
- PT: Até lá, cada etapa está explicada em
- EN: Until then, every stage is explained in
- FR: D'ici là, chaque étape est expliquée dans

### more.path
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### more.articles
- PT: Artigos
- EN: Articles
- FR: Articles

### c.purpose
- PT: Para que é a casa?
- EN: What is the home for?
- FR: À quoi servira le logement ?

### c.purpose.1
- PT: Casa para viver
- EN: A home to live in
- FR: Un logement pour y vivre

### c.purpose.2
- PT: Casa de férias
- EN: A holiday home
- FR: Une maison de vacances

### c.purpose.3
- PT: Para arrendar
- EN: To rent out
- FR: Pour le louer

### c.purpose.4
- PT: Regresso a Portugal
- EN: Returning to Portugal
- FR: Retour au Portugal

### c.purpose.5
- PT: Investimento
- EN: Investment
- FR: Investissement

### c.when
- PT: Quando pensa comprar?
- EN: When do you plan to buy?
- FR: Quand pensez-vous acheter ?

### c.when.1
- PT: Nos próximos 3 meses
- EN: Within 3 months
- FR: Dans les 3 mois

### c.when.2
- PT: Entre 3 e 12 meses
- EN: In 3 to 12 months
- FR: Entre 3 et 12 mois

### c.when.3
- PT: Daqui a mais de um ano
- EN: In more than a year
- FR: Dans plus d'un an

### c.when.4
- PT: Ainda não sei
- EN: Not sure yet
- FR: Je ne sais pas encore

### c.fin
- PT: Como pensa pagar?
- EN: How do you plan to pay?
- FR: Comment pensez-vous payer ?

### c.fin.1
- PT: Capitais próprios (sem crédito)
- EN: Own funds (no mortgage)
- FR: Fonds propres (sans crédit)

### c.fin.2
- PT: Com crédito
- EN: With a mortgage
- FR: Avec un crédit

### c.fin.3
- PT: Ainda não decidi
- EN: Not decided yet
- FR: Pas encore décidé

### c.nif
- PT: Já tem NIF português?
- EN: Do you already have a Portuguese tax number (NIF)?
- FR: Avez-vous déjà un NIF (numéro fiscal portugais) ?

### yes
- PT: Sim
- EN: Yes
- FR: Oui

### no
- PT: Ainda não
- EN: Not yet
- FR: Pas encore

### c.place
- PT: Onde, em Portugal?
- EN: Where in Portugal?
- FR: Où, au Portugal ?

### c.place.ph
- PT: Uma região ou um concelho
- EN: A region or a town
- FR: Une région ou une commune

### c.lang
- PT: Em que língua prefere a chamada?
- EN: Which language would you like for the call?
- FR: Dans quelle langue préférez-vous l'appel ?

### c.window
- PT: A que horas prefere? (hora de Lisboa)
- EN: When suits you best? (Lisbon time)
- FR: Quel moment vous convient le mieux ? (heure de Lisbonne)

### c.window.1
- PT: Dias úteis, ao fim do dia
- EN: Weekdays, early evening
- FR: En semaine, en fin de journée

### c.window.2
- PT: Dias úteis, durante o dia
- EN: Weekdays, during the day
- FR: En semaine, en journée

### c.window.3
- PT: Ao sábado de manhã
- EN: Saturday morning
- FR: Le samedi matin

### contact
- PT: Como lhe respondemos?
- EN: How should we reply?
- FR: Comment vous répondre ?

### name
- PT: Nome
- EN: Name
- FR: Nom

### email
- PT: Email
- EN: Email
- FR: E-mail

### phone
- PT: Telefone (opcional)
- EN: Phone (optional)
- FR: Téléphone (facultatif)

### consent.h
- PT: Uma última coisa
- EN: One last thing
- FR: Une dernière chose

### c.consent
- PT: Autorizo que este pedido seja enviado ao consultor qualificado de uma mediadora imobiliária licenciada, para me contactar sobre ele. Li a política de privacidade.
- EN: I agree that this request is sent to a qualified advisor at a licensed real-estate brokerage, to contact me about it. I have read the privacy policy.
- FR: J'accepte que cette demande soit transmise à un conseiller qualifié d'une agence immobilière agréée, pour me recontacter. J'ai lu la politique de confidentialité.

### send
- PT: Enviar o pedido
- EN: Send request
- FR: Envoyer la demande

### sending
- PT: A enviar…
- EN: Sending…
- FR: Envoi…

### review
- PT: O seu pedido
- EN: Your request
- FR: Votre demande

### fallback
- PT: Não foi possível enviar daqui. Envie-o por email, já está escrito:
- EN: We couldn't send it from here. Send it by email, it's already written:
- FR: L'envoi n'a pas abouti d'ici. Envoyez-la par e-mail, elle est déjà rédigée :

### fallback.btn
- PT: Abrir o email
- EN: Open the email
- FR: Ouvrir l'e-mail

### invalid.email
- PT: Este endereço de email parece incompleto.
- EN: This email address doesn't look complete.
- FR: Cette adresse e-mail semble incomplète.

### p.title
- PT: Falar com um parceiro
- EN: Talk to a partner
- FR: Parler à un partenaire

### p.cat
- PT: Sobre o quê?
- EN: What is it about?
- FR: À quel sujet ?

### p.question
- PT: Qual é a sua pergunta?
- EN: What is your question?
- FR: Quelle est votre question ?

### p.question.ph
- PT: Duas ou três frases, sem dados pessoais sensíveis.
- EN: In two or three sentences. No sensitive personal details.
- FR: En deux ou trois phrases. Sans données personnelles sensibles.

### p.consent
- PT: Autorizo que o meu pedido seja usado para me responderem e, se eu pedir, enviado a um parceiro da categoria escolhida. Li a política de privacidade.
- EN: I agree that my request is used to reply to me and, if I ask, passed to a partner in the chosen category. I have read the privacy policy.
- FR: J'accepte que ma demande serve à me répondre et, si je le demande, soit transmise à un partenaire de la catégorie choisie. J'ai lu la politique de confidentialité.

### p.done.h
- PT: Recebemos a sua pergunta.
- EN: We have your question.
- FR: Nous avons bien reçu votre question.

### p.done.p
- PT: Respondemos por email, normalmente em dois dias úteis.
- EN: We reply by email, usually within two working days.
- FR: Nous répondons par e-mail, en général sous deux jours ouvrés.

### v.title
- PT: Marcar uma visita privada
- EN: Book a private visit
- FR: Réserver une visite privée

### v.how
- PT: Como prefere visitar?
- EN: How would you like to view it?
- FR: Comment souhaitez-vous visiter ?

### v.how.1
- PT: Por videochamada
- EN: By video call
- FR: En visioconférence

### v.how.2
- PT: Ao vivo, em Portugal
- EN: In person, in Portugal
- FR: Sur place, au Portugal

### v.done.h
- PT: O pedido seguiu para o consultor qualificado.
- EN: Request sent to a qualified advisor.
- FR: Demande transmise à un conseiller qualifié.

### v.done.p
- PT: O consultor confirma a data por email, normalmente em dois dias úteis.
- EN: The advisor will confirm the date by email, usually within two working days.
- FR: Le conseiller confirme la date par e-mail, en général sous deux jours ouvrés.

## find

Prompt 35 §3.3 (D61): one search for the whole site (the magnifier, ⌘K on desktop).

### open
- PT: Procurar
- EN: Search
- FR: Rechercher

### ph
- PT: Um lugar, uma pergunta, um simulador…
- EN: A place, a question, a calculator…
- FR: Un lieu, une question, un simulateur…

### g.place
- PT: Lugares
- EN: Places
- FR: Lieux

### g.faq
- PT: Perguntas
- EN: Questions
- FR: Questions

### g.sim
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### g.step
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### g.page
- PT: Páginas
- EN: Pages
- FR: Pages

### none
- PT: Nada encontrado. Experimente outra palavra.
- EN: Nothing found. Try another word.
- FR: Aucun résultat. Essayez un autre mot.

### concierge
- PT: Concierge
- EN: Concierge
- FR: Concierge

## simx

Prompt 35 §3.8 (D61): the simulators' result as one large number, the detail on demand.

### detail
- PT: Ver as contas
- EN: See the breakdown
- FR: Voir le détail

## pathx

Prompt 35 §3.1 (D61): the path's start as one question at a time.

### door
- PT: Por onde começamos?
- EN: Where shall we start?
- FR: Par où commençons-nous ?

### country
- PT: Onde vive?
- EN: Where do you live?
- FR: Où vivez-vous ?

### where
- PT: Vive {where}.
- EN: You live {where}.
- FR: Vous vivez {where}.

### where.change
- PT: Mudar
- EN: Change
- FR: Modifier

### budget
- PT: Quanto, mais ou menos?
- EN: Roughly how much?
- FR: À peu près, combien ?

### when
- PT: Para quando?
- EN: For when?
- FR: Pour quand ?

## golf

Prompt 36 §9 (D62): the golf card on the map, from our own list (content/facts/golf/courses.csv).

### holes
- PT: Buracos
- EN: Holes
- FR: Trous

### design
- PT: Desenho
- EN: Designed by
- FR: Conçu par

### opened
- PT: Abriu em
- EN: Opened
- FR: Ouvert en

### status
- PT: Estado
- EN: Status
- FR: Statut

### opening
- PT: Abre em {y}
- EN: Opening {y}
- FR: Ouverture en {y}

### homes
- PT: Encontrar casa por perto
- EN: See homes nearby
- FR: Voir des biens à proximité

### site
- PT: Ver o site oficial
- EN: Official website
- FR: Site officiel

### src
- PT: Lista de campos: Federação Portuguesa de Golfe e sites oficiais dos campos e dos resorts. Contornos © OpenStreetMap contributors.
- EN: Our list of courses: Portuguese Golf Federation, the courses' and resorts' official websites. Outlines © OpenStreetMap contributors.
- FR: Notre liste des parcours : Fédération portugaise de golf, sites officiels des parcours et des resorts. Contours © OpenStreetMap contributors.

## showb

### avail
- PT: Disponibilidade
- EN: Availability
- FR: Disponibilités

### block
- PT: Bloco {b}
- EN: Block {b}
- FR: Bloc {b}

### typ
- PT: Tipologia
- EN: Type (T1 = 1 bedroom)
- FR: Typologie (T1 = 1 chambre)

### total
- PT: Total
- EN: Total
- FR: Total

### forsale
- PT: Para venda
- EN: For sale
- FR: En vente

### soon
- PT: Venda a partir de mar 2027
- EN: On sale from Mar 2027
- FR: En vente dès mars 2027

### reserved
- PT: Reservado
- EN: Reserved
- FR: Réservé

### sold
- PT: Vendido
- EN: Sold
- FR: Vendu

### checked
- PT: Verificado a {date}.
- EN: Checked on {date}.
- FR: Vérifié le {date}.

### source
- PT: Fonte: tabela do promotor
- EN: Source: the developer's table
- FR: Source : tableau du promoteur

### interest
- PT: Visitar ou reservar
- EN: I'm interested in this home
- FR: Ce logement m'intéresse

### visit
- PT: Marcar uma visita privada
- EN: Book a private visit
- FR: Réserver une visite privée

### price
- PT: Preço sob consulta
- EN: Price on request
- FR: Prix sur demande

### features
- PT: O empreendimento
- EN: The development
- FR: La résidence

### now
- PT: {n} casas para venda agora
- EN: {n} homes for sale now
- FR: {n} logements en vente maintenant

### view
- PT: Ver o empreendimento
- EN: See the development
- FR: Voir le programme

### map
- PT: No mapa
- EN: On the map
- FR: Sur la carte

### maplink
- PT: Ver {muni} no mapa
- EN: See {muni} on the map, with the developments
- FR: Voir {muni} sur la carte, avec les résidences

### sim
- PT: Quanto custa a compra
- EN: What the purchase costs
- FR: Ce que coûte l'achat

### simlede
- PT: Introduza o preço do promotor. Casa de férias, comprador sem crédito; outras situações no simulador completo.
- EN: Enter the price the developer gives you. Second home, buyer without a mortgage; everything else in the full simulator.
- FR: Saisissez le prix indiqué par le promoteur. Résidence secondaire, acheteur sans crédit ; le reste dans le simulateur complet.

### simprice
- PT: Preço (€)
- EN: Price (€)
- FR: Prix (€)

### simfull
- PT: Calcular outras situações
- EN: Open the full simulator
- FR: Ouvrir le simulateur complet

### by
- PT: Promotor: {developer}
- EN: Developer: {developer}
- FR: Promoteur : {developer}

### tour
- PT: Marble Terrace, Gondomar
- EN: Marble Terrace, Gondomar
- FR: Marble Terrace, Gondomar

## art

Prompt 37 §2 and prompt 43 §3: the Artigos hub and its four articles, built by site/src/components/ArticlePage.astro. Per article: "h" is the title and H1 (60 characters at most, with the search phrase), "p" the meta description and the hub card (80 to 155 characters), "a" the answer in two sentences, "i.N" the paragraphs before the first question, "sN.q" a question heading and "sN.1" to "sN.3" its paragraphs, "fN.q" and "fN.a" the three follow-up questions (shown under the article and as FAQPage data). Words in curly brackets come from the data files when the page is built (INE prices, the golf table); "{sNow}", "{sHist}", "{sOsm}", "{sGolf}", "{sRent}", "{sBdp}" and "{sEcb}" become the numbered source after a sentence. The tables and the chart reuse "map.col.m2", "data.col.place", "map.r.*", "map.a.page" and "prices.break".

### title
- PT: Artigos
- EN: Articles
- FR: Articles

### lede
- PT: Os métodos e as tabelas, com a fonte oficial de cada número.
- EN: The long explanations, the tables and the method, in one place. Every number with its official source.
- FR: Les explications longues, les tableaux et la méthode, au même endroit. Chaque chiffre avec sa source officielle.

### read
- PT: Ler o artigo
- EN: Read the article
- FR: Lire l'article

### all
- PT: Todos os artigos
- EN: All articles
- FR: Tous les articles

### open
- PT: Abrir o mapa
- EN: Open the map
- FR: Ouvrir la carte

### faq
- PT: Perguntas frequentes
- EN: Frequently asked questions
- FR: Questions fréquentes

### next
- PT: Para continuar
- EN: Keep reading
- FR: Pour continuer

### go.afford
- PT: Calcular o preço máximo
- EN: See what you can afford
- FR: Voir quel bien vous pouvez acheter

### go.cost
- PT: Calcular o custo total
- EN: Work out the total cost of buying
- FR: Calculer le coût total de l'achat

### go.rent
- PT: Calcular a rentabilidade
- EN: Work out the yield of a rental
- FR: Calculer le rendement d'une location

### go.journey
- PT: Ver o passo a passo
- EN: The step-by-step path, starting with where to buy
- FR: Le pas à pas, en commençant par le choix du lieu

### map.h
- PT: Preço por m² por concelho em Portugal, como ler o mapa
- EN: Portugal price per m² by municipality, reading the map
- FR: Prix au m² par commune au Portugal, lire la carte

### map.p
- PT: O preço por m² de cada concelho está no mapa. Na análise completa: os 308 concelhos lado a lado, com a variação a cinco e a dez anos, as rendas e o rendimento bruto.
- EN: Each municipality's price per m² is on the map. The full analysis puts all 308 side by side, with the change over five and ten years, rents and gross yield.
- FR: Le prix au m² de chaque commune est sur la carte. L'analyse complète met les 308 communes côte à côte, avec l'évolution sur cinq et dix ans, les loyers et le rendement brut.

### map.link
- PT: Como ler o mapa →
- EN: How to read the map →
- FR: Comment lire la carte →

### map.a
- PT: O preço por m² por concelho é a mediana das casas vendidas nos últimos 12 meses. No {q}: {pt} no país, de {lowv} em {low} a {topv} em {top}.{sNow}
- EN: The price per m² by municipality on the map is the median price of homes sold over the last 12 months. In {q}, Portugal stood at {pt} per m², from {lowv} in {low} to {topv} in {top}.{sNow}
- FR: Le prix au m² par commune, sur la carte, est le prix médian des logements vendus sur les 12 derniers mois. Au {q}, le Portugal était à {pt} le m², de {lowv} à {low} jusqu'à {topv} à {top}.{sNow}

### map.i.1
- PT: Números do INE, o Instituto Nacional de Estatística, para os 308 concelhos (municípios) de Portugal.{sOsm}
- EN: The numbers come from INE, Portugal's national statistics office. The map shows all 308 municipalities, called concelhos in Portuguese.{sOsm}
- FR: Les chiffres viennent de l'INE, l'institut national de la statistique du Portugal. La carte montre les 308 communes, appelées concelhos en portugais.{sOsm}

### map.i.2
- PT: No mapa, o seu orçamento mostra os m² que compra em cada concelho.
- EN: You can type your budget into the map. It shows how many square metres that budget buys in each municipality.
- FR: Vous pouvez saisir votre budget sur la carte. Elle montre combien de mètres carrés il permet dans chaque commune.

### map.s1.q
- PT: O que mostram a altura e a cor do mapa?
- EN: What do the height and colour on the map show?
- FR: Que montrent la hauteur et la couleur de la carte ?

### map.s1.1
- PT: A altura e a cor seguem o indicador escolhido: o preço por m², a subida desde 2016 ou a rentabilidade bruta.
- EN: Each municipality has a height and a colour. Both follow the measure you pick, such as the price per m², the rise since 2016 or the gross yield.
- FR: Chaque commune a une hauteur et une couleur. Les deux suivent l'indicateur choisi, comme le prix au m², la hausse depuis 2016 ou le rendement brut.

### map.s1.2
- PT: Um toque num concelho mostra o detalhe e a fonte. A Madeira e os Açores aparecem ao lado do continente, em escala menor.
- EN: Tap a municipality to see the details and the source. Madeira and the Azores sit beside the mainland, at a smaller scale.
- FR: Touchez une commune pour voir le détail et la source. Madère et les Açores figurent à côté du continent, à plus petite échelle.

### map.s2.q
- PT: O que é o preço mediano por m²?
- EN: What is the median price per m²?
- FR: Qu'est-ce que le prix médian au m² ?

### map.s2.1
- PT: A mediana é o valor do meio: metade das casas vendidas custou menos por m², metade custou mais.
- EN: The median is the middle value. Half the homes sold cost less per m², and the other half cost more.
- FR: La médiane est la valeur du milieu. La moitié des logements vendus a coûté moins au m², l'autre moitié plus.

### map.s2.2
- PT: Uma venda muito cara quase não mexe na mediana; numa média, puxava o valor para cima.
- EN: One very expensive sale barely moves the median. In an average, that same sale would pull the figure up.
- FR: Une vente très chère fait à peine bouger la médiane. Dans une moyenne, cette même vente tirerait le chiffre vers le haut.

### map.s2.3
- PT: À mediana nacional, 100 m² a {pt} dão {ex}. Cada casa pode valer mais ou menos.{sNow}
- EN: An example with the national median: 100 m² at {pt} comes to {ex}. A given home can be worth more or less.{sNow}
- FR: Un exemple avec la médiane nationale : 100 m² à {pt} font {ex}. Un bien précis peut valoir plus ou moins.{sNow}

### map.s3.q
- PT: São preços de venda ou preços de anúncio?
- EN: Are these sale prices or asking prices?
- FR: S'agit-il de prix de vente ou de prix affichés ?

### map.s3.1
- PT: São preços de vendas reais, de casas novas e usadas.{sNow}
- EN: They are real sales, not asking prices from listings. New and existing homes both count.{sNow}
- FR: Ce sont des ventes réelles, pas des prix d'annonces. Les logements neufs et anciens comptent tous les deux.{sNow}

### map.s3.2
- PT: Cada valor junta 12 meses de vendas, mais estável do que um só trimestre.
- EN: Each figure pools 12 months of sales. That makes it steadier than a single quarter.
- FR: Chaque chiffre réunit 12 mois de ventes. Il est donc plus stable qu'un seul trimestre.

### map.s4.q
- PT: Porque é que alguns concelhos não têm preço?
- EN: Why do some municipalities have no price?
- FR: Pourquoi certaines communes n'ont-elles pas de prix ?

### map.s4.1
- PT: O INE publica onde há vendas suficientes: no {q}, em {n} dos {total} concelhos.{sNow}
- EN: INE publishes only where there are enough sales. In {q}, {n} of the {total} municipalities have a price.{sNow}
- FR: L'INE ne publie que là où les ventes suffisent. Au {q}, {n} des {total} communes ont un prix.{sNow}

### map.s4.2
- PT: Onde o INE não publica, a lista mostra um traço, sem estimativas nossas.
- EN: We make no estimates. Where INE publishes nothing, the list shows a dash.
- FR: Nous n'estimons rien. Là où l'INE ne publie pas, la liste affiche un tiret.

### map.s4.3
- PT: Com poucas vendas, os valores variam mais de trimestre para trimestre.
- EN: Where sales are few, figures move more from one quarter to the next.
- FR: Là où les ventes sont rares, les chiffres varient davantage d'un trimestre à l'autre.

### map.s5.q
- PT: Quanto custa o m² em cada concelho?
- EN: How much is a square metre in each municipality?
- FR: Combien coûte le m² dans chaque commune ?

### map.s5.1
- PT: Lista alfabética, com a região ao lado. O nome abre o concelho no mapa.{sNow}
- EN: The list is in alphabetical order, with the region beside each name. Tap a name to see that municipality on the map.{sNow}
- FR: La liste suit l'ordre alphabétique, avec la région à côté. Touchez un nom pour voir la commune sur la carte.{sNow}

### map.f1.q
- PT: Qual é o concelho mais caro de Portugal?
- EN: Which municipality in Portugal is the most expensive?
- FR: Quelle est la commune la plus chère du Portugal ?

### map.f1.a
- PT: No {q}, era {top}, com {topv} por m². Seguiam-se {top2} e {top3}.
- EN: In {q}, it was {top}, at {topv} per m². {top2} and {top3} came next.
- FR: Au {q}, c'était {top}, avec {topv} le m². Suivaient {top2} et {top3}.

### map.f2.q
- PT: Qual é o preço médio do m² em Portugal?
- EN: What is the average price per m² in Portugal?
- FR: Quel est le prix moyen du m² au Portugal ?

### map.f2.a
- PT: O INE publica a mediana, e não a média: no {q}, {pt} por m², nas vendas dos últimos 12 meses.
- EN: INE publishes the median, not the average. In {q}, the national median was {pt} per m² for homes sold over the last 12 months.
- FR: L'INE publie la médiane, pas la moyenne. Au {q}, la médiane nationale était de {pt} le m² pour les logements vendus sur 12 mois.

### map.f3.q
- PT: De onde vêm os preços do mapa?
- EN: Where do the prices on the map come from?
- FR: D'où viennent les prix de la carte ?

### map.f3.a
- PT: Do INE, o Instituto Nacional de Estatística: medianas de vendas reais, publicadas a cada trimestre.
- EN: They come from INE, Portugal's national statistics office. They are medians of real sales, published every quarter.
- FR: Ils viennent de l'INE, l'institut national de la statistique. Ce sont des médianes de ventes réelles, publiées chaque trimestre.

### prices.h
- PT: Evolução do preço das casas em Portugal em dez anos
- EN: Portugal house prices over ten years
- FR: Évolution des prix immobiliers au Portugal sur dix ans

### prices.p
- PT: Dez anos de preços das casas em Portugal na análise completa: a mediana por m² de vendas reais, trimestre a trimestre desde 2016, no país, em cada região e em cada concelho, com Lisboa e o Porto lado a lado.
- EN: Ten years of Portugal house prices in the full analysis: the median price per m² of real sales, quarter by quarter since 2016, for the country, each region and each municipality, with Lisbon and Porto side by side.
- FR: Dix ans de prix immobiliers au Portugal dans l'analyse complète : le prix médian au m² des ventes réelles, trimestre par trimestre depuis 2016, pour le pays, chaque région et chaque commune, avec Lisbonne et Porto côte à côte.

### prices.link
- PT: Dez anos de preços →
- EN: Ten years of prices →
- FR: Dix ans de prix →

### prices.a
- PT: O preço das casas em Portugal subiu {g}% entre o {q0} e o {q}: o m² passou de {from} para {to}, segundo o INE.{sHist}
- EN: Portugal house prices rose {g}% between {q0} and {q}. The median square metre sold went from {from} to {to}, according to INE.{sHist}
- FR: Les prix immobiliers au Portugal ont augmenté de {g} % entre le {q0} et le {q}. Le m² vendu est passé de {from} à {to}, selon l'INE.{sHist}

### prices.i.1
- PT: Cada ponto é a mediana por m² das vendas dos 12 meses anteriores (INE, o Instituto Nacional de Estatística).
- EN: INE is Portugal's national statistics office. Each point on the chart is the median price per m² of the sales over the previous 12 months.
- FR: L'INE est l'institut national de la statistique du Portugal. Chaque point du graphique est le prix médian au m² des ventes des 12 mois précédents.

### prices.s1.q
- PT: Quanto subiram as casas em Lisboa e no Porto?
- EN: How much have prices risen in Lisbon and Porto?
- FR: De combien les prix ont-ils augmenté à Lisbonne et à Porto ?

### prices.s1.1
- PT: Em Lisboa, o m² passou de {lisFrom} para {lisTo}, mais {lisG}%. No Porto, de {porFrom} para {porTo}, mais {porG}%.{sHist}
- EN: In Lisbon, the square metre went from {lisFrom} to {lisTo}, up {lisG}%. In Porto, it went from {porFrom} to {porTo}, up {porG}%.{sHist}
- FR: À Lisbonne, le m² est passé de {lisFrom} à {lisTo}, soit {lisG} % de plus. À Porto, il est passé de {porFrom} à {porTo}, soit {porG} % de plus.{sHist}

### prices.s1.2
- PT: O gráfico mostra as três linhas por trimestre, desde o {q0}.
- EN: The chart shows all three lines, quarter by quarter, since {q0}.
- FR: Le graphique montre les trois courbes, trimestre par trimestre, depuis le {q0}.

### prices.s2.q
- PT: Quanto subiram as casas no último ano?
- EN: How much did prices rise in the last year?
- FR: De combien les prix ont-ils augmenté sur un an ?

### prices.s2.1
- PT: No {qY}, o m² vendido em Portugal valia {yago}. No {q}, valia {to}, mais {yoy}%.{sNow}
- EN: In {qY}, the median square metre sold in Portugal was {yago}. In {q}, it was {to}, up {yoy}%.{sNow}
- FR: Au {qY}, le m² vendu au Portugal valait {yago}. Au {q}, il valait {to}, soit {yoy} % de plus.{sNow}

### prices.s2.2
- PT: Estes números descrevem o passado e não indicam como os preços vão evoluir.
- EN: These figures describe the past. They don't say where prices will go next.
- FR: Ces chiffres décrivent le passé. Ils ne disent pas comment les prix vont évoluer.

### prices.s3.q
- PT: Porque há uma marca no gráfico em 2019?
- EN: Why is there a mark on the chart in 2019?
- FR: Pourquoi y a-t-il un repère sur le graphique en 2019 ?

### prices.s3.1
- PT: Em 2019, o INE mudou o método: a metodologia de 2018 vale até ao 3.º trimestre de 2019, a de 2022 daí em diante.{sHist}
- EN: In 2019, INE changed how it calculates these prices. Sales follow INE's 2018 method up to Q3 2019 and its 2022 method from then on.{sHist}
- FR: En 2019, l'INE a changé sa façon de calculer ces prix. Les ventes suivent la méthode INE de 2018 jusqu'au 3e trimestre 2019, puis celle de 2022.{sHist}

### prices.s3.2
- PT: A linha junta os dois métodos e marca a mudança; ambos medem a mediana por m² de vendas reais.
- EN: The line joins the two methods and marks the change. Both measure the median price per m² of real sales.
- FR: La courbe relie les deux méthodes et marque le changement. Les deux mesurent le prix médian au m² de ventes réelles.

### prices.s4.q
- PT: Onde ver os preços do seu concelho?
- EN: Where can I see prices for one municipality?
- FR: Où voir les prix de votre commune ?

### prices.s4.1
- PT: O mapa mostra o preço de cada concelho e a subida desde 2016, com o detalhe num toque.
- EN: The map shows each municipality's price and its rise since 2016. Tap a municipality for the details.
- FR: La carte montre le prix de chaque commune et sa hausse depuis 2016. Touchez une commune pour le détail.

### prices.s4.2
- PT: A página de preços e rendas acrescenta as rendas e a rentabilidade bruta.
- EN: The prices and rents page brings together prices, rents and the gross yield.
- FR: La page des prix et des loyers réunit les prix, les loyers et le rendement brut.

### prices.f1.q
- PT: Os preços das casas em Portugal continuam a subir?
- EN: Are house prices in Portugal still rising?
- FR: Les prix immobiliers continuent-ils de monter au Portugal ?

### prices.f1.a
- PT: Entre o {qY} e o {q}, o preço mediano por m² subiu {yoy}%. Os números descrevem o passado e não preveem o futuro.
- EN: Between {qY} and {q}, the median price per m² rose {yoy}%. The figures describe the past and don't predict the future.
- FR: Entre le {qY} et le {q}, le prix médian au m² a augmenté de {yoy} %. Les chiffres décrivent le passé et ne prédisent pas l'avenir.

### prices.f2.q
- PT: Quanto custava o m² em Portugal em 2016?
- EN: How much was a square metre in Portugal in 2016?
- FR: Combien coûtait le m² au Portugal en 2016 ?

### prices.f2.a
- PT: No {q0}, a mediana nacional era {from} por m². No {q}, era {to}.
- EN: In {q0}, the national median was {from} per m². In {q}, it was {to}.
- FR: Au {q0}, la médiane nationale était de {from} le m². Au {q}, elle était de {to}.

### prices.f3.q
- PT: Estes preços incluem casas novas?
- EN: Do these prices include new homes?
- FR: Ces prix incluent-ils les logements neufs ?

### prices.f3.a
- PT: Sim: o INE junta casas novas e usadas numa só mediana por m².
- EN: Yes. INE counts sales of new and existing homes in one median per m².
- FR: Oui. L'INE compte les ventes de logements neufs et anciens dans une seule médiane au m².

### golf.h
- PT: Preço das casas junto ao golfe em Portugal
- EN: Golf property prices in Portugal
- FR: Prix immobilier près des golfs au Portugal

### golf.p
- PT: O preço das casas junto ao golfe em Portugal, na análise completa: a mediana de cada freguesia com campo ao lado da do concelho, e o rácio entre as duas, sem atribuir a diferença ao golfe.
- EN: Golf property prices in Portugal, in the full analysis: each golf parish's median price per m² next to its municipality's, and the ratio between them. A comparison, not a cause.
- FR: Prix immobilier près des golfs au Portugal, dans l'analyse complète : la médiane de chaque paroisse avec golf à côté de celle de sa commune, et le rapport entre les deux. Une comparaison, pas une cause.

### golf.label
- PT: Mediana da freguesia vs mediana do concelho, 2.º trimestre de 2026
- EN: Parish median vs municipality median, second quarter of 2026
- FR: Médiane de la paroisse vs médiane de la commune, 2e trimestre 2026

### golf.a
- PT: Junto ao golfe, o preço das casas em Portugal fica, na maioria das freguesias, perto da mediana do concelho. Almancil, no Algarve, é a exceção clara: 36% acima de Loulé.{sNow}{sGolf}
- EN: Golf property prices in Portugal are, in most parishes, close to the price of their municipality. In the Algarve, Almancil is the clear case: its median is 36% above Loulé's.{sNow}{sGolf}
- FR: Près des golfs, les prix immobiliers au Portugal restent, dans la plupart des paroisses, proches de ceux de leur commune. En Algarve, Almancil est le cas net : sa médiane est 36 % au-dessus de celle de Loulé.{sNow}{sGolf}

### golf.i.1
- PT: Comparamos duas medianas do INE (Instituto Nacional de Estatística) do mesmo trimestre: a da freguesia com campo e a do concelho.
- EN: We compare two medians from INE, Portugal's national statistics office, in the same quarter. One is for the parish (freguesia) with the course, the other for the whole municipality (concelho).
- FR: Nous comparons deux médianes de l'INE, l'institut national de la statistique, au même trimestre. L'une est celle de la paroisse (freguesia) du golf, l'autre celle de toute la commune (concelho).

### golf.i.2
- PT: Das {count} freguesias com campo completo e as duas medianas publicadas, {within} ficam a 10% ou menos do concelho.{sNow}{sGolf}
- EN: Of the {count} parishes with a full course and both medians published, {within} sit within 10% of their municipality.{sNow}{sGolf}
- FR: Sur les {count} paroisses avec un parcours complet et les deux médianes publiées, {within} restent à 10 % ou moins de leur commune.{sNow}{sGolf}

### golf.s1.q
- PT: Como se lê o rácio entre freguesia e concelho?
- EN: How do I read the parish to municipality ratio?
- FR: Comment lire le rapport entre paroisse et commune ?

### golf.s1.1
- PT: O rácio divide a mediana da freguesia pela do concelho: 1,36 quer dizer 36% acima.
- EN: The ratio divides the parish median by the municipality median. A ratio of 1.36 means the parish median is 36% above the municipality's.
- FR: Le rapport divise la médiane de la paroisse par celle de la commune. Un rapport de 1,36 signifie que la médiane de la paroisse est 36 % au-dessus de celle de la commune.

### golf.s1.2
- PT: Um rácio de 1 é o mesmo preço; abaixo de 1, a mediana da freguesia é mais baixa.
- EN: A ratio of 1 means the same price. Below 1, the parish median is lower than the municipality's.
- FR: Un rapport de 1 signifie le même prix. Sous 1, la médiane de la paroisse est plus basse que celle de la commune.

### golf.s1.3
- PT: A tabela ordena as freguesias com campo completo do rácio mais alto para o mais baixo.
- EN: The table lists the parishes with a full course, from the highest ratio to the lowest.
- FR: Le tableau liste les paroisses avec un parcours complet, du rapport le plus haut au plus bas.

### golf.s2.q
- PT: O golfe faz subir o preço das casas?
- EN: Does golf push up home prices?
- FR: Le golf fait-il monter les prix des logements ?

### golf.s2.1
- PT: A tabela mostra onde os preços diferem, sem explicar porquê. O golfe é uma das características destas freguesias.
- EN: This shows where prices differ, not why. Golf is one feature of these parishes among many.
- FR: Cela montre où les prix diffèrent, pas pourquoi. Le golf est une caractéristique de ces paroisses parmi d'autres.

### golf.s2.2
- PT: Pesam também a costa, o tipo e o tamanho das casas, a construção nova e a procura de cada zona.
- EN: A golf parish can sit above or below its municipality for many reasons. The coast, the type and size of homes, new building and local demand all play a part.
- FR: Une paroisse avec golf peut se situer au-dessus ou en dessous de sa commune pour bien des raisons. La côte, le type et la taille des logements, la construction neuve et la demande locale comptent.

### golf.s3.q
- PT: Quais são as freguesias de golfe mais caras do Algarve?
- EN: Which Algarve golf parishes cost the most?
- FR: Quelles sont les paroisses de golf les plus chères de l'Algarve ?

### golf.s3.1
- PT: Almancil, a freguesia da Quinta do Lago e de Vale do Lobo: mediana 36% acima da de Loulé.{sGolf}
- EN: Almancil is the clear case: its median is 36% above Loulé's. It is the parish of Quinta do Lago and Vale do Lobo.{sGolf}
- FR: Almancil est le cas net : sa médiane est 36 % au-dessus de celle de Loulé. C'est la paroisse de Quinta do Lago et de Vale do Lobo.{sGolf}

### golf.s3.2
- PT: As outras freguesias de golfe do Algarve ficam, na maioria, a menos de 10% do concelho, algumas abaixo.
- EN: Most other Algarve golf parishes sit within 10% of their municipality, some below it.
- FR: La plupart des autres paroisses de golf de l'Algarve restent à moins de 10 % de leur commune, certaines en dessous.

### golf.s3.3
- PT: Desde o 4.º trimestre de 2019, Almancil e Loulé subiram quase o mesmo (cerca de +91%).{sNow}{sHist}
- EN: Since the fourth quarter of 2019, Almancil and Loulé have risen by almost the same share (about +91%).{sNow}{sHist}
- FR: Depuis le 4e trimestre 2019, Almancil et Loulé ont progressé presque autant (environ +91 %).{sNow}{sHist}

### golf.s4.q
- PT: Há freguesias de golfe com preços diferentes fora do Algarve?
- EN: Are there golf parishes with different prices outside the Algarve?
- FR: Y a-t-il des paroisses de golf aux prix différents hors de l'Algarve ?

### golf.s4.1
- PT: Sim. Em Canidelo, Vila Nova de Gaia, a mediana está {can}% acima do concelho; em Cascais e Estoril, {cas}% acima.{sNow}
- EN: Yes. In Canidelo, Vila Nova de Gaia, the median is {can}% above the municipality's. In Cascais e Estoril, it is {cas}% above.{sNow}
- FR: Oui. À Canidelo, Vila Nova de Gaia, la médiane est {can} % au-dessus de celle de la commune. À Cascais e Estoril, elle est {cas} % au-dessus.{sNow}

### golf.s4.2
- PT: Em Silvalde, Espinho, a mediana fica {sil}% abaixo do concelho.{sNow}
- EN: Some golf parishes sit below their municipality too. In Silvalde, Espinho, the median is {sil}% below.{sNow}
- FR: Certaines paroisses de golf sont aussi sous leur commune. À Silvalde, Espinho, la médiane est {sil} % en dessous.{sNow}

### golf.s5.q
- PT: Porque faltam algumas freguesias e alguns campos?
- EN: Why are some parishes and courses missing?
- FR: Pourquoi manque-t-il des paroisses et des parcours ?

### golf.s5.1
- PT: Por freguesia, o INE só publica desde o 4.º trimestre de 2019 e onde há vendas suficientes; nada é estimado.{sHist}
- EN: INE publishes parish medians only from the fourth quarter of 2019 and only where there are enough sales. There is no ten-year parish figure, and nothing is estimated.{sHist}
- FR: L'INE ne publie les médianes par paroisse que depuis le 4e trimestre 2019, et seulement là où les ventes suffisent. Il n'y a pas de chiffre sur dix ans par paroisse, et rien n'est estimé.{sHist}

### golf.s5.2
- PT: Grândola e Alcácer do Sal (Troia, Comporta) não têm números por freguesia.
- EN: Grândola and Alcácer do Sal (Troia, Comporta) have no parish figures.
- FR: Grândola et Alcácer do Sal (Troia, Comporta) n'ont pas de chiffres par paroisse.

### golf.s5.3
- PT: Os campos vêm do OpenStreetMap, um mapa aberto feito por voluntários; o que lá não está não aparece aqui.{sOsm}{sGolf}
- EN: Courses come from OpenStreetMap, an open map built by volunteers. A course missing there is missing here.{sOsm}{sGolf}
- FR: Les parcours viennent d'OpenStreetMap, une carte ouverte faite par des bénévoles. Un parcours absent là-bas l'est aussi ici.{sOsm}{sGolf}

### golf.f1.q
- PT: Quanto custa o m² em Almancil?
- EN: How much is a square metre in Almancil?
- FR: Combien coûte le m² à Almancil ?

### golf.f1.a
- PT: No {q}, a mediana em Almancil era {alm} por m². Em Loulé, o concelho, era {lou}.
- EN: In {q}, the median in Almancil was {alm} per m². In Loulé, its municipality, it was {lou}.
- FR: Au {q}, la médiane à Almancil était de {alm} le m². À Loulé, sa commune, elle était de {lou}.

### golf.f2.q
- PT: Uma casa junto ao golfe vale mais?
- EN: Is a home near a golf course worth more?
- FR: Un logement près d'un golf vaut-il plus ?

### golf.f2.a
- PT: Os números comparam preços, sem medir causas. A costa, o tipo de casa e a construção nova também contam.
- EN: These figures don't show that. They compare prices and don't measure causes. The coast, the type of home and new building count too.
- FR: Ces chiffres ne le montrent pas. Ils comparent des prix et ne mesurent pas de causes. La côte, le type de logement et le neuf comptent aussi.

### golf.f3.q
- PT: Porque não aparecem Troia e Comporta?
- EN: Why are Troia and Comporta missing?
- FR: Pourquoi Troia et Comporta n'apparaissent-elles pas ?

### golf.f3.a
- PT: O INE não publica medianas por freguesia em Grândola nem em Alcácer do Sal. Sem número oficial, não mostramos nenhum.
- EN: INE publishes no parish medians for Grândola or Alcácer do Sal. Without an official number, we show none.
- FR: L'INE ne publie pas de médianes par paroisse pour Grândola ni pour Alcácer do Sal. Sans chiffre officiel, nous n'en montrons aucun.

### golf.col.parish
- PT: Freguesia
- EN: Parish
- FR: Paroisse

### golf.col.muni
- PT: Concelho
- EN: Municipality
- FR: Commune

### golf.col.pm
- PT: Freguesia, €/m²
- EN: Parish, €/m²
- FR: Paroisse, €/m²

### golf.col.mm
- PT: Concelho, €/m²
- EN: Municipality, €/m²
- FR: Commune, €/m²

### golf.col.ratio
- PT: Rácio
- EN: Ratio
- FR: Rapport

### method.h
- PT: Preço mediano por m² do INE, como calculamos
- EN: Portugal house price data, how we calculate
- FR: Prix médian au m² de l'INE, notre méthode de calcul

### method.p
- PT: O preço mediano por m² do INE no mapa e nos gráficos: a origem de cada número, a leitura e os limites.
- EN: Portugal house price data on our map and charts. Where each INE number comes from, how we read it and where its limits are.
- FR: Le prix médian au m² de l'INE, sur la carte et les graphiques. D'où vient chaque chiffre, comment nous le lisons et où sont ses limites.

### method.link
- PT: Como calculamos →
- EN: How we calculate →
- FR: Notre méthode de calcul →

### method.a
- PT: Mostramos o preço mediano por m² do INE, sem estimativas nossas: onde o INE não publica, não há número.{sNow}
- EN: The Portugal house price data on our map is INE's median price per m², with no estimates of our own. Where INE publishes no number, we show none.{sNow}
- FR: Le prix médian au m² que nous affichons est celui de l'INE, sans estimation de notre part. Là où l'INE ne publie pas de chiffre, nous n'en montrons aucun.{sNow}

### method.i.1
- PT: O INE é o Instituto Nacional de Estatística de Portugal.
- EN: INE is Portugal's national statistics office, the official source for these figures.
- FR: L'INE est l'institut national de la statistique, l'organisme officiel des statistiques au Portugal.

### method.s1.q
- PT: De onde vêm os preços das casas?
- EN: Where do the house prices come from?
- FR: D'où viennent les prix des logements ?

### method.s1.1
- PT: A mediana do INE do valor por m² das habitações familiares vendidas nos últimos 12 meses, por concelho e por freguesia, a divisão mais pequena do concelho.{sNow}{sHist}
- EN: Prices come from INE: the median value per m² of family dwellings sold in the last 12 months. There are figures by municipality (concelho) and by parish (freguesia), the smaller unit inside it.{sNow}{sHist}
- FR: Les prix viennent de l'INE : la valeur médiane au m² des logements familiaux vendus sur les 12 derniers mois. Il existe des chiffres par commune (concelho) et par paroisse (freguesia), l'unité plus petite à l'intérieur.{sNow}{sHist}

### method.s1.2
- PT: Medianas de vendas reais, de casas novas e usadas, e não o valor de uma casa concreta.
- EN: These are medians of actual sales, not specific homes. New and existing homes both count.
- FR: Ce sont des médianes de ventes réelles, pas des biens précis. Les logements neufs et anciens comptent tous les deux.

### method.s1.3
- PT: Onde há poucas vendas, os valores variam mais.
- EN: Where sales are few, figures vary more.
- FR: Là où les ventes sont rares, les chiffres varient davantage.

### method.s2.q
- PT: Porque usamos a mediana e não a média?
- EN: Why do we use the median and not the average?
- FR: Pourquoi la médiane et pas la moyenne ?

### method.s2.1
- PT: A mediana é o valor do meio: metade das casas vendidas custou menos por m², metade custou mais.
- EN: The median is the middle value. Half the homes sold cost less per m², and the other half cost more.
- FR: La médiane est la valeur du milieu. La moitié des logements vendus a coûté moins au m², l'autre moitié plus.

### method.s2.2
- PT: Poucas vendas muito caras mexem muito na média e pouco na mediana, a medida que o INE publica.
- EN: A few very expensive sales change an average a lot but barely move the median. It is also the measure INE publishes.
- FR: Quelques ventes très chères changent beaucoup une moyenne mais font à peine bouger la médiane. C'est aussi la mesure que publie l'INE.

### method.s3.q
- PT: Como juntamos dez anos de preços?
- EN: How do we join ten years of prices?
- FR: Comment relions-nous dix ans de prix ?

### method.s3.1
- PT: Até ao 3.º trimestre de 2019, as vendas seguem a metodologia do INE de 2018; depois, a de 2022. Os gráficos marcam a mudança.{sHist}
- EN: Sales follow INE's 2018 method up to Q3 2019 and its 2022 method from then on. The charts mark the change.{sHist}
- FR: Les ventes suivent la méthode INE de 2018 jusqu'au 3e trimestre 2019, puis celle de 2022. Les graphiques marquent le changement.{sHist}

### method.s3.2
- PT: As regiões começam em 2019; as freguesias, no 4.º trimestre de 2019.
- EN: Regions start in 2019. By parish, INE publishes medians only from the fourth quarter of 2019.
- FR: Les régions commencent en 2019. Par paroisse, l'INE ne publie des médianes que depuis le 4e trimestre 2019.

### method.s4.q
- PT: Como calculamos a rentabilidade bruta?
- EN: How do we calculate the gross yield?
- FR: Comment calculons-nous le rendement brut ?

### method.s4.1
- PT: É a renda mediana por m² vezes 12, a dividir pelo preço mediano por m², com os 12 meses até ao {q}.{sRent}
- EN: Gross yield: the median rent per m² times 12, divided by the median price per m². It uses twelve months to {q}.{sRent}
- FR: Rendement brut : le loyer médian au m² fois 12, divisé par le prix médian au m². Il porte sur douze mois jusqu'au {q}.{sRent}

### method.s4.2
- PT: As rendas são as dos novos contratos de arrendamento: a mediana do INE por m² ao mês. Os valores de Portugal e de cada concelho estão na análise completa.{sRent}
- EN: Rents are those of new lease contracts: INE's median per m² a month. The figures for Portugal and for each municipality are in the full analysis.{sRent}
- FR: Les loyers sont ceux des nouveaux baux : la médiane de l'INE au m² par mois. Les chiffres du Portugal et de chaque commune figurent dans l'analyse complète.{sRent}

### method.s4.3
- PT: É um valor antes de custos e impostos.
- EN: This is before costs and tax.
- FR: C'est un chiffre avant frais et impôts.

### method.s5.q
- PT: De onde vêm os limites do mapa e os campos de golfe?
- EN: Where do the map's boundaries and golf courses come from?
- FR: D'où viennent les limites de la carte et les golfs ?

### method.s5.1
- PT: Os limites de concelhos e freguesias vêm do OpenStreetMap, um mapa aberto de voluntários, ligado aos códigos do INE.{sOsm}
- EN: Municipality and parish boundaries come from OpenStreetMap, matched to INE codes. OpenStreetMap is an open map built by volunteers.{sOsm}
- FR: Les limites des communes et des paroisses viennent d'OpenStreetMap, rattachées aux codes de l'INE. OpenStreetMap est une carte ouverte faite par des bénévoles.{sOsm}

### method.s5.2
- PT: Os campos de golfe vêm também do OpenStreetMap.{sGolf}
- EN: Golf courses come from OpenStreetMap too.{sGolf}
- FR: Les parcours de golf viennent aussi d'OpenStreetMap.{sGolf}

### method.s6.q
- PT: Como convertemos os euros noutras moedas?
- EN: How do we convert euros into other currencies?
- FR: Comment convertissons-nous les euros en d'autres monnaies ?

### method.s6.1
- PT: Francos, dólares, reais e shekels usam a taxa de referência do BCE, o Banco Central Europeu, da data indicada.{sEcb}
- EN: Amounts in francs, dollars, reais or shekels use the reference rate of the ECB, the European Central Bank, on the date shown.{sEcb}
- FR: Les montants en francs, dollars, reais ou shekels utilisent le taux de référence de la BCE, la Banque centrale européenne, à la date indiquée.{sEcb}

### method.s6.2
- PT: A taxa de juro média do crédito à habitação vem do Banco de Portugal.{sBdp}
- EN: The average mortgage interest rate comes from Banco de Portugal, the central bank.{sBdp}
- FR: Le taux d'intérêt moyen du crédit immobilier vient du Banco de Portugal, la banque centrale.{sBdp}

### method.f1.q
- PT: Os preços do INE são preços de venda?
- EN: Are INE prices sale prices?
- FR: Les prix de l'INE sont-ils des prix de vente ?

### method.f1.a
- PT: Sim: medianas de vendas reais dos últimos 12 meses, não preços de anúncio.
- EN: Yes. They are medians of real sales over the last 12 months, not asking prices.
- FR: Oui. Ce sont des médianes de ventes réelles sur 12 mois, pas des prix d'annonces.

### method.f2.q
- PT: De quando são os números mais recentes?
- EN: How recent are the latest figures?
- FR: De quand datent les chiffres les plus récents ?

### method.f2.a
- PT: O INE publica-os a cada trimestre; os mais recentes no site são do {q}.
- EN: INE publishes these prices every quarter. The latest on the site are for {q}.
- FR: L'INE publie ces prix chaque trimestre. Les plus récents sur le site portent sur le {q}.

### method.f3.q
- PT: Porque é que o meu concelho não tem preço?
- EN: Why does my municipality have no price?
- FR: Pourquoi ma commune n'a-t-elle pas de prix ?

### method.f3.a
- PT: O INE só publica onde há vendas suficientes; nos outros casos, não estimamos valor.
- EN: INE publishes only where there are enough sales. In those cases, we estimate nothing.
- FR: L'INE ne publie que là où les ventes suffisent. Dans ces cas, nous n'estimons aucune valeur.

## trust

### h
- PT: O que pode verificar
- EN: What you can check
- FR: Ce que vous pouvez vérifier

### agency
- PT: Agência parceira {who}: licença {n}, verificada no registo público do {reg} a {date}
- EN: Partner agency {who}: licence {n}, checked in the {reg} public register on {date}
- FR: Agence partenaire {who} : licence {n}, vérifiée au registre public de l'{reg} le {date}

### pro
- PT: {who}: inscrição {n}, verificada no registo público ({reg}) a {date}
- EN: {who}: registration {n}, checked in the public register ({reg}) on {date}
- FR: {who} : inscription {n}, vérifiée au registre public ({reg}) le {date}

### data
- PT: Números oficiais com fonte e data: INE, Banco de Portugal, BCE
- EN: Official figures with source and date: INE, Banco de Portugal, ECB
- FR: Chiffres officiels avec source et date : INE, Banco de Portugal, BCE

### flat
- PT: Os parceiros pagam um patrocínio fixo, nunca por pedido. O conteúdo patrocinado vem sempre identificado
- EN: Partners pay a flat sponsorship, never per request; sponsored content is always labelled
- FR: Les partenaires paient un parrainage fixe, jamais par demande ; le contenu sponsorisé est toujours signalé

### cookies
- PT: Medimos a audiência sem cookies
- EN: We measure our audience without cookies
- FR: Nous mesurons l'audience sans cookies

## sim1

The one-screen simulator at the top of the calculators page (night of 3 Nov 2026, part 3). Maths from the calculators; every figure with its source in small print.

### h
- PT: Quanto custa, ao todo
- EN: What it costs, all in
- FR: Ce que cela coûte, tout compris


### price
- PT: Preço da casa
- EN: Price of the home
- FR: Prix du logement

### region
- PT: Onde
- EN: Where
- FR: Où





### use
- PT: Uso
- EN: Use
- FR: Usage

### use.live
- PT: Para viver
- EN: To live in
- FR: Pour y vivre

### use.away
- PT: Férias ou investimento
- EN: Holidays or investment
- FR: Vacances ou investissement

### use.live.note
- PT: Para viver: IMT da habitação própria e permanente, para quem tem ou passa a ter residência fiscal em Portugal.
- EN: To live in: IMT at the own-home rates, for buyers who are or become tax residents of Portugal.
- FR: Pour y vivre : IMT au barème de la résidence principale, pour qui est ou devient résident fiscal au Portugal.

### use.away.note
- PT: Férias ou investimento: IMT de 7,5% para compradores sem residência fiscal em Portugal.
- EN: Holidays or investment: IMT at 7.5% for buyers who are not tax residents of Portugal.
- FR: Vacances ou investissement : IMT de 7,5 % pour les acheteurs non résidents fiscaux au Portugal.

### pay
- PT: Como paga
- EN: How you pay
- FR: Comment vous payez

### pay.cash
- PT: Sem crédito
- EN: No mortgage
- FR: Sans crédit

### pay.loan
- PT: Com crédito
- EN: With a mortgage
- FR: Avec crédit

### entry
- PT: Entrada
- EN: Deposit
- FR: Apport

### row.costs
- PT: Impostos e escritura
- EN: Taxes and deed
- FR: Impôts et acte

### row.loan
- PT: Prestação ao mês
- EN: Monthly payment
- FR: Mensualité

### row.buys
- PT: Espaço que compra {inplace}
- EN: Space it buys {inplace}
- FR: Surface achetée {inplace}

### m2
- PT: cerca de {n} m²
- EN: about {n} m²
- FR: environ {n} m²

### m2.rate
- PT: {v} por m²
- EN: {v} per m²
- FR: {v} le m²

### loan.terms
- PT: {years} anos, à taxa média dos novos créditos à habitação em {month}: {rate}%.
- EN: {years} years, at the average rate on new mortgages in {month}: {rate}%.
- FR: {years} ans, au taux moyen des nouveaux crédits immobiliers en {month} : {rate} %.

### buys.note
- PT: Mediana do valor por m² das casas vendidas nos 12 meses anteriores, apartamentos e moradias juntos. Toque numa região para a escolher.
- EN: Median value per m² of the homes sold in the previous 12 months, apartments and houses together. Tap a region to choose it.
- FR: Valeur médiane au m² des logements vendus sur les 12 mois précédents, appartements et maisons ensemble. Touchez une région pour la choisir.

### src
- PT: Fonte: {s}
- EN: Source: {s}
- FR: Source : {s}

### src.ine
- PT: INE, {q}.º trimestre de {y}
- EN: INE, Q{q} {y}
- FR: INE, {q}e trimestre {y}

### detail.cost
- PT: Ver o cálculo completo
- EN: See the full calculation
- FR: Voir le calcul complet

### detail.payment
- PT: Ver o cálculo da prestação
- EN: See the payment calculation
- FR: Voir le calcul de la mensualité

### next.homes
- PT: Ver casas {inplace}
- EN: See homes {inplace}
- FR: Voir les logements {inplace}

### next.save
- PT: Guardar a região
- EN: Save the region
- FR: Garder la région

### next.saved
- PT: Região guardada
- EN: Region saved
- FR: Région gardée

### next.cg
- PT: Abrir o Concierge com estes números
- EN: Open the Concierge with these figures
- FR: Ouvrir le Concierge avec ces chiffres

### next.cg.note
- PT: Os números seguem com o pedido, só se o enviar.
- EN: The figures go with the request, only if you send it.
- FR: Les chiffres accompagnent la demande, seulement si vous l'envoyez.

### list.h
- PT: Ver cada cálculo em detalhe
- EN: See each calculation in detail
- FR: Voir chaque calcul en détail

### local
- PT: cerca de {local}
- EN: about {local}
- FR: environ {local}

## bar

Part 2 of 3 Nov 2026 (the journey): the five-item bar at the bottom of the phone (the same five in the desktop header), the hearts and "A sua seleção" (the homes and regions a reader saves on their own device), the closing next step of every page, "Voltar", the homes on the edition home page and the developers' way to an example showcase.

### label
- PT: Atalhos
- EN: Shortcuts
- FR: Raccourcis

### nav.map
- PT: Mapa
- EN: Map
- FR: Carte

### nav.sims
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### nav.concierge
- PT: Concierge
- EN: Concierge
- FR: Concierge

### nav.path
- PT: Passo a passo
- EN: Step by step
- FR: Pas à pas

### nav.faq
- PT: Perguntas
- EN: Questions
- FR: Questions

### saved
- PT: Os seus favoritos
- EN: Your favorites
- FR: Vos favoris

### heart.add
- PT: Guardar nos favoritos
- EN: Save to your favorites
- FR: Ajouter à vos favoris

### heart.saved
- PT: Guardado nos favoritos
- EN: Saved to your favorites
- FR: Ajouté à vos favoris

### heart.removed
- PT: Retirado dos favoritos
- EN: Removed from your favorites
- FR: Retiré de vos favoris

### page.title
- PT: Os seus favoritos
- EN: Your favorites
- FR: Vos favoris

### page.lede
- PT: Ficam só neste aparelho.
- EN: Kept on this device only.
- FR: Gardés sur cet appareil uniquement.

### page.homes
- PT: Casas
- EN: Homes
- FR: Logements

### page.regions
- PT: Zonas
- EN: Areas
- FR: Zones

### page.remove
- PT: Retirar
- EN: Remove
- FR: Retirer

### page.empty.h
- PT: Ainda não guardou nada
- EN: Nothing saved yet
- FR: Rien de gardé pour l'instant

### page.empty.p
- PT: Toque no coração de um lugar no mapa.
- EN: Tap the heart on a place on the map.
- FR: Touchez le cœur d'un lieu sur la carte.

### page.empty.a
- PT: Abrir o mapa
- EN: Open the map
- FR: Ouvrir la carte

### back
- PT: Voltar
- EN: Back
- FR: Retour

### next.h
- PT: O passo seguinte
- EN: The next step
- FR: L'étape suivante

### next.go
- PT: Começar
- EN: Start
- FR: Commencer

### next.home.p
- PT: Um consultor liga-lhe à hora que escolher.
- EN: An advisor calls you when you choose.
- FR: Un conseiller vous appelle quand vous voulez.

### next.map.p
- PT: Uma zona em mente? Um consultor mostra-lhe as casas.
- EN: An area in mind? An advisor shows you the homes.
- FR: Une zone en tête ? Un conseiller vous montre les logements.

### next.sims.p
- PT: Uma conversa de 15 minutos com um consultor, grátis.
- EN: A 15-minute call with an advisor, free.
- FR: Un appel de 15 minutes avec un conseiller, gratuit.

### next.read.p
- PT: Um consultor liga-lhe à hora que escolher.
- EN: An advisor calls you when you choose.
- FR: Un conseiller vous appelle quand vous voulez.

### next.back.p
- PT: Volte à página onde estava.
- EN: Back to the page you were on.
- FR: Retour à la page où vous étiez.

### next.show.p
- PT: Para ver estas casas, marque uma visita privada.
- EN: To see these homes, book a private visit.
- FR: Pour voir ces logements, réservez une visite privée.

### next.saved.p
- PT: O Concierge começa pelas zonas que guardou.
- EN: The Concierge starts from the areas you saved.
- FR: Le Concierge part des zones que vous avez gardées.

### homes.h
- PT: Casas novas, à venda agora
- EN: New homes, for sale now
- FR: Logements neufs, en vente maintenant

### homes.p
- PT: Empreendimentos apresentados pelos promotores parceiros, com a disponibilidade que eles publicam.
- EN: Developments presented by partner developers, with the availability they publish.
- FR: Des programmes présentés par les promoteurs partenaires, avec la disponibilité qu'ils publient.

### homes.view
- PT: Ver o empreendimento
- EN: See the development
- FR: Voir le programme

### dev.example
- PT: Veja como apresentamos um empreendimento: {name}, {muni}
- EN: See how we present a development: {name}, {muni}
- FR: Voyez comment nous présentons un programme : {name}, {muni}

### dev.forDevs
- PT: Para promotores: como apresentar um empreendimento aqui
- EN: For developers: how to present a development here
- FR: Pour les promoteurs : présenter un programme ici

### path.go
- PT: Ver o meu passo a passo
- EN: See my step by step
- FR: Voir mon pas à pas

### near
- PT: Casas novas perto: {name}, {muni}
- EN: New homes nearby: {name}, {muni}
- FR: Logements neufs à proximité : {name}, {muni}

## mtvc

### units.h
- PT: Todas as frações
- EN: Every unit
- FR: Tous les logements

### units.lede
- PT: {n} frações: {a} disponíveis, {r} reservadas. Áreas em m², como publicadas pelo promotor.
- EN: {n} units: {a} available, {r} reserved. Areas in m², as published by the developer.
- FR: {n} logements : {a} disponibles, {r} réservés. Surfaces en m², telles que publiées par le promoteur.

### filter
- PT: Mostrar
- EN: Show
- FR: Afficher

### filter.all
- PT: Todas
- EN: All
- FR: Tous

### filter.avail
- PT: Só disponíveis
- EN: Available only
- FR: Disponibles seulement

### col.unit
- PT: Fração
- EN: Unit
- FR: Lot

### col.sun
- PT: Exposição
- EN: Aspect
- FR: Orientation

### col.area
- PT: Área habitável
- EN: Living area
- FR: Surface habitable

### col.out
- PT: Exterior
- EN: Outdoor
- FR: Extérieur

### col.park
- PT: Estacionamento
- EN: Parking
- FR: Stationnement

### col.storage
- PT: Arrumos
- EN: Storage
- FR: Cellier

### col.gross
- PT: Área bruta total
- EN: Total gross area
- FR: Surface brute totale

### col.status
- PT: Estado
- EN: Status
- FR: Statut

### col.price
- PT: Preço
- EN: Price
- FR: Prix

### floor0
- PT: Rés-do-chão
- EN: Ground floor
- FR: Rez-de-chaussée

### floorn
- PT: {n}.º piso
- EN: Floor {n}
- FR: Étage {n}

### balcony
- PT: Varanda {v} m²
- EN: Balcony {v} m²
- FR: Balcon {v} m²

### terrace
- PT: Terraço {v} m²
- EN: Terrace {v} m²
- FR: Terrasse {v} m²

### garden
- PT: Jardim {v} m²
- EN: Garden {v} m²
- FR: Jardin {v} m²

### space
- PT: Lugar, {n} viatura
- EN: Space, {n} car
- FR: Place, {n} voiture

### box1
- PT: Box, {n} viatura
- EN: Box, {n} car
- FR: Box, {n} voiture

### box
- PT: Box, {n} viaturas
- EN: Box, {n} cars
- FR: Box, {n} voitures

### available
- PT: Disponível
- EN: Available
- FR: Disponible

### onrequest
- PT: Sob consulta
- EN: On request
- FR: Sur demande

### ask
- PT: Tenho interesse
- EN: I'm interested
- FR: Ça m'intéresse

### place.h
- PT: A localização
- EN: The location
- FR: L'emplacement

### place.src
- PT: Fonte: promotor
- EN: Source: the developer
- FR: Source : le promoteur

### place.marks
- PT: Assinalados no mapa da brochura do promotor
- EN: Marked on the developer's brochure map
- FR: Indiqués sur la carte de la brochure du promoteur

### place.marksrc
- PT: Brochura do promotor
- EN: The developer's brochure
- FR: Brochure du promoteur

### place.dist
- PT: Distâncias em linha reta, a partir do OpenStreetMap
- EN: Straight-line distances, from OpenStreetMap
- FR: Distances à vol d'oiseau, d'après OpenStreetMap

### place.distnote
- PT: Cálculo nosso, em linha reta, a partir do OpenStreetMap; o percurso a pé ou de carro é mais longo.
- EN: Our calculation, in a straight line from OpenStreetMap; the route on foot or by car is longer.
- FR: Notre calcul, à vol d'oiseau d'après OpenStreetMap ; le trajet à pied ou en voiture est plus long.

### related.h
- PT: Do mesmo promotor
- EN: By the same developer
- FR: Du même promoteur

### rq.inperson
- PT: No local, em {place}
- EN: On site, in {place}
- FR: Sur place, à {place}

## signals

The share line on a developer's page (night of 3 Nov 2026, part 5): the phone's share sheet, or the link copied. Counted without cookies (lib/track.ts).

### share
- PT: Partilhar esta página
- EN: Share this page
- FR: Partager cette page

### copied
- PT: Ligação copiada
- EN: Link copied
- FR: Lien copié

## send

Requests really sent (operator, 3 Nov 2026): the Concierge, the partner and viewing flows and the showcase request sheet post to /api/request, which e-mails Imóveis Portugal and the partner agency together (GDPR art. 6(1)(b), no consent box). One plain line under the send button names both; the privacy link follows it.

### notice
- PT: O seu pedido segue para a Imóveis Portugal e para um consultor qualificado, que lhe responde por e-mail.
- EN: Your request goes to Imóveis Portugal and a qualified advisor, who replies by email.
- FR: Votre demande va à Imóveis Portugal et à un conseiller qualifié, qui vous répond par e-mail.

### privacy
- PT: Política de privacidade.
- EN: Privacy policy.
- FR: Politique de confidentialité.

### to
- PT: Imóveis Portugal e um consultor qualificado
- EN: Imóveis Portugal and a qualified advisor
- FR: Imóveis Portugal et un conseiller qualifié

### basis.h
- PT: Base do envio
- EN: Why it is sent
- FR: Base de l'envoi

### basis.p
- PT: Pedido enviado pelo leitor à Imóveis Portugal e ao consultor qualificado (RGPD, art. 6.º, n.º 1, al. b)): diligências pré-contratuais a pedido do titular.
- EN: Request sent by the reader to Imóveis Portugal and the qualified advisor (GDPR art. 6(1)(b)): steps taken at the reader's request before a contract.
- FR: Demande envoyée par le lecteur à Imóveis Portugal et au conseiller qualifié (RGPD, art. 6, par. 1, b)) : mesures précontractuelles prises à la demande de la personne.

### last
- PT: Último pedido enviado nesta sessão.
- EN: Last request sent in this session.
- FR: Dernière demande envoyée dans cette session.

### foot
- PT: Enviado pela Imóveis Portugal. O mesmo pedido segue para a Imóveis Portugal e para o consultor qualificado, que responde ao leitor.
- EN: Sent by Imóveis Portugal. The same request goes to Imóveis Portugal and to the qualified advisor, who replies to the reader.
- FR: Envoyé par Imóveis Portugal. La même demande part chez Imóveis Portugal et chez le conseiller qualifié, qui répond au lecteur.

## mare

### title
- PT: Maré
- EN: Maré
- FR: Maré

### meta
- PT: Maré, a newsletter da Imóveis Portugal: Portugal à terça e à sexta, às 8h de Lisboa, em três minutos. Grátis.
- EN: Maré, the Imóveis Portugal newsletter: Portugal every Tuesday and Friday at 8 a.m. Lisbon time, in three minutes. Free.
- FR: Maré, la newsletter d'Imóveis Portugal : le Portugal chaque mardi et vendredi à 8 h, heure de Lisbonne, en trois minutes. Gratuit.

### line
- PT: Maré, a newsletter: ideias e pérolas de Portugal, todas as terças e sextas.
- EN: Maré, the newsletter: insights and hidden gems from Portugal, every Tuesday and Friday.
- FR: Maré, la newsletter : idées et pépites du Portugal, chaque mardi et vendredi.

### when
- PT: Às 8h de Lisboa, em três minutos. Grátis.
- EN: At 8 a.m. Lisbon time, in three minutes. Free.
- FR: À 8 h, heure de Lisbonne, en trois minutes. Gratuit.

### email
- PT: O seu email
- EN: Your email
- FR: Votre e-mail

### consent
- PT: Aceito receber a Maré por email. Posso cancelar em qualquer envio.
- EN: I agree to receive Maré by email. I can unsubscribe from any email.
- FR: J'accepte de recevoir Maré par e-mail. Je peux me désabonner depuis chaque e-mail.

### consent.need
- PT: Marque a caixa para receber a Maré.
- EN: Tick the box to receive Maré.
- FR: Cochez la case pour recevoir Maré.

### a
- PT: Receber a Maré
- EN: Get Maré
- FR: Recevoir Maré

### optin.mail
- PT: Abre o seu email com o pedido escrito. Envie-o.
- EN: Opens your email with the request written. Send it.
- FR: Ouvre votre messagerie avec la demande rédigée. Envoyez-la.

### oneclick
- PT: Cancela num clique, em qualquer envio.
- EN: Unsubscribe in one click, from any issue.
- FR: Désinscription en un clic, depuis chaque envoi.

### optin.embed
- PT: Depois, confirme o seu email.
- EN: Then confirm your email.
- FR: Ensuite, confirmez votre e-mail.

### sent
- PT: Falta um passo: envie o email que se abriu e confirme quando a Maré lhe escrever.
- EN: One step left: send the email that opened, then confirm when Maré writes to you.
- FR: Il reste une étape : envoyez l'e-mail qui s'est ouvert, puis confirmez quand Maré vous écrit.

### thanks
- PT: Feito. Se chegar um email de confirmação, basta um clique.
- EN: Done. If a confirmation email arrives, one click is enough.
- FR: C'est fait. Si un e-mail de confirmation arrive, un clic suffit.

### confirm
- PT: Confirme aqui: {email}
- EN: Confirm here: {email}
- FR: Confirmez ici : {email}

### latest.h
- PT: A última Maré
- EN: The latest Maré
- FR: La dernière Maré

### latest.p
- PT: Tal como chega à caixa de correio.
- EN: Exactly as it arrives in the inbox.
- FR: Telle qu'elle arrive dans la boîte de réception.

### first.h
- PT: A primeira Maré, a {date}
- EN: The first Maré, on {date}
- FR: La première Maré, le {date}

### first.p
- PT: Uma antevisão, tal como vai chegar à caixa de correio.
- EN: A preview, exactly as it will arrive in the inbox.
- FR: Un aperçu, tel qu'il arrivera dans la boîte de réception.

### inbox.from
- PT: De
- EN: From
- FR: De

### inbox.subject
- PT: Assunto
- EN: Subject
- FR: Objet

### pt.only
- PT: Em português.
- EN: The first issues are in Portuguese.
- FR: Les premiers numéros sont en portugais.

### archive.h
- PT: Todas as Marés
- EN: Every issue
- FR: Tous les numéros

### archive.read
- PT: Ler
- EN: Read
- FR: Lire

### minutes
- PT: {n} min de leitura
- EN: {n} min read
- FR: {n} min de lecture

### issue.back
- PT: Todas as Marés
- EN: Every issue
- FR: Tous les numéros

### issue.sub
- PT: Receber as próximas
- EN: Get the next ones
- FR: Recevoir les prochains

### day.tue
- PT: terça
- EN: Tuesday
- FR: mardi

### day.fri
- PT: sexta
- EN: Friday
- FR: vendredi

### block.label
- PT: Maré, a newsletter
- EN: Maré, the newsletter
- FR: Maré, la newsletter

### block
- PT: Esta {dia}: {headline}. Receba às 8h de Lisboa.
- EN: This {dia} in Maré: “{headline}”. In your inbox at 8 a.m. Lisbon time.
- FR: Ce {dia} dans Maré : « {headline} ». À 8 h, heure de Lisbonne, dans votre boîte.

### block.plain
- PT: Ideias e pérolas de Portugal, todas as terças e sextas, às 8h de Lisboa.
- EN: Ideas and hidden gems from Portugal, every Tuesday and Friday at 8 a.m. Lisbon time.
- FR: Idées et pépites du Portugal, chaque mardi et vendredi à 8 h, heure de Lisbonne.

### home.more
- PT: Ver a Maré
- EN: See Maré
- FR: Voir Maré

## lifea

D83 (operator, 3 Nov 2026): the ten lifestyle articles (content/stories/, site/src/components/StoryPage.astro) and their "Para ir" block (components/ParaIr.astro). The article text lives in its own Markdown file; here only the frame around it. The presenting partner of "Para ir" is set in site/src/config.ts (paraIr); empty, the block shows no partner. Since fix step 4 (3 Nov 2026) the articles exist in PT, EN and FR (content/stories/{id}.{lang}.md), so every line below is read on the site in all three languages.

### mins
- PT: {n} min de leitura
- EN: {n} min read
- FR: {n} min de lecture

### go.h
- PT: Para ir
- EN: Getting there
- FR: Pour y aller

### go.with
- PT: Para ir, com {partner}
- EN: Getting there, with {partner}
- FR: Pour y aller, avec {partner}

### go.where
- PT: Onde
- EN: Where
- FR: Où

### go.when
- PT: Quando
- EN: When
- FR: Quand

### go.fly
- PT: Voo
- EN: Flight
- FR: Vol

### go.flight
- PT: De {city}, voo direto para {to}: {time} ({flight}).
- EN: From {city}, direct flight to {to}: {time} ({flight}).
- FR: De {city}, vol direct vers {to} : {time} ({flight}).

### go.via
- PT: De {city}, o voo direto vai para Lisboa: {time} ({flight}).
- EN: From {city}, the direct flight goes to Lisbon: {time} ({flight}).
- FR: De {city}, le vol direct va à Lisbonne : {time} ({flight}).

### go.season
- PT: De {city}, voo direto para {to} no verão, quatro por semana ({flight}).
- EN: From {city}, direct flight to {to} in summer, four a week ({flight}).
- FR: De {city}, vol direct vers {to} en été, quatre par semaine ({flight}).

### go.sched
- PT: Horário de inverno publicado; os horários mudam com a estação.
- EN: Published winter schedule; times change with the season.
- FR: Horaires d'hiver publiés ; ils changent avec la saison.

### city.lux
- PT: Luxemburgo
- EN: Luxembourg
- FR: Luxembourg

### city.par
- PT: Paris
- EN: Paris
- FR: Paris

### city.gva
- PT: Genebra
- EN: Geneva
- FR: Genève

### city.zrh
- PT: Zurique
- EN: Zurich
- FR: Zurich

### city.sao
- PT: São Paulo
- EN: São Paulo
- FR: São Paulo

### city.nyc
- PT: Nova Iorque
- EN: New York
- FR: New York

### city.tlv
- PT: Telavive
- EN: Tel Aviv
- FR: Tel Aviv

### city.lon
- PT: Londres
- EN: London
- FR: Londres

### to.opo
- PT: o Porto
- EN: Porto
- FR: Porto

### to.lis
- PT: Lisboa
- EN: Lisbon
- FR: Lisbonne

### to.fao
- PT: Faro
- EN: Faro
- FR: Faro

### tile
- PT: {place} no mapa, com as casas da zona
- EN: {place} on the map, with the homes nearby
- FR: {place} sur la carte, avec les logements autour

### tile.alt
- PT: Mapa de {place} e dos concelhos à volta
- EN: Map of {place} and the municipalities around it
- FR: Carte de {place} et des communes autour

### sponsored
- PT: Conteúdo patrocinado por {partner}. As opiniões e recomendações são da responsabilidade do parceiro.
- EN: Sponsored by {partner}. Views and recommendations are the partner's own.
- FR: Contenu sponsorisé par {partner}. Les avis et recommandations relèvent de la responsabilité du partenaire.

### all
- PT: Todos os artigos
- EN: All articles
- FR: Tous les articles

### hub.h
- PT: Para ler em dois minutos
- EN: Two-minute reads
- FR: À lire en deux minutes

### guides.h
- PT: Guias práticos
- EN: Practical guides
- FR: Guides pratiques

### guides.p
- PT: O NIF, os impostos, o crédito e o método por trás dos números, com as fontes oficiais.
- EN: The NIF (Portuguese tax number), taxes, mortgages and the method behind the figures, with the official sources.
- FR: Le NIF (numéro fiscal portugais), les impôts, le crédit et la méthode derrière les chiffres, avec les sources officielles.

### hub.lede
- PT: Portugal em leituras de dois minutos, com a fonte de cada facto. Os guias práticos vêm a seguir.
- EN: Portugal in two-minute reads, with the source of every fact. The practical guides follow.
- FR: Le Portugal en lectures de deux minutes, avec la source de chaque fait. Les guides pratiques suivent.

## map4

D83 part 2 (3 Nov 2026): the map in three depths. First glance: photographs and names, no numbers. A tap opens the place as tiles (price, life, schools and health); a tile opens its chart; the full analysis (29 € per region, 99 € for Portugal, 12 months) stays switched off until the company and invoicing are ready. The price colours, the quarterly time slider, the budget, the layers and the tours move behind "Camadas". PT is the text; EN and FR repeat a plain translation.

### search
- PT: Procurar um lugar
- EN: Find a place
- FR: Chercher un lieu

### search.hint
- PT: Concelho, freguesia, praia ou campo de golfe
- EN: Municipality, parish, beach or golf course
- FR: Commune, paroisse, plage ou golf

### layers
- PT: Camadas
- EN: Layers
- FR: Calques

### layers.h
- PT: Camadas e dados
- EN: Layers and data
- FR: Calques et données

### layers.close
- PT: Fechar
- EN: Close
- FR: Fermer

### layer.none
- PT: Só o mapa
- EN: Map only
- FR: Carte seule

### layer.colour
- PT: Cor no mapa
- EN: Color on the map
- FR: Couleur sur la carte

### layer.on
- PT: No mapa
- EN: On the map
- FR: Sur la carte

### layer.view
- PT: Vista
- EN: View
- FR: Vue

### layer.time
- PT: Evolução trimestral
- EN: Quarter by quarter
- FR: Trimestre par trimestre

### layer.tours
- PT: Visitas guiadas
- EN: Guided tours
- FR: Visites guidées

### regions
- PT: Regiões
- EN: Regions
- FR: Régions

### region.line
- PT: {n} concelhos · {cities}
- EN: {n} municipalities · {cities}
- FR: {n} communes · {cities}

### region.kick
- PT: Região
- EN: Region
- FR: Région

### region.pick
- PT: Toque num concelho para o ver de perto.
- EN: Tap a municipality to see it up close.
- FR: Touchez une commune pour la voir de près.

### cut.muni
- PT: Valores do concelho
- EN: Municipality figures
- FR: Chiffres de la commune

### cut.parish
- PT: Freguesia de {m}
- EN: Parish in {m}
- FR: Paroisse de {m}

### tile.price
- PT: Preço
- EN: Price
- FR: Prix

### tile.mkt
- PT: Mercado
- EN: Market
- FR: Marché

### tile.nb
- PT: Construção nova
- EN: New build
- FR: Neuf

### tile.nbsrc
- PT: preços pedidos, fonte: promotor
- EN: asking prices, source: developer
- FR: prix demandés, source : promoteur

### tile.onreq
- PT: sob consulta
- EN: on request
- FR: sur demande

### tile.dir.up
- PT: Em cinco anos, o preço mediano subiu {v}.
- EN: Over five years, the median price rose {v}.
- FR: En cinq ans, le prix médian a augmenté de {v}.

### tile.dir.down
- PT: Em cinco anos, o preço mediano desceu {v}.
- EN: Over five years, the median price fell {v}.
- FR: En cinq ans, le prix médian a baissé de {v}.

### tile.dir.flat
- PT: Em cinco anos, o preço mediano ficou praticamente igual.
- EN: Over five years, the median price barely moved.
- FR: En cinq ans, le prix médian a peu bougé.

### tile.life
- PT: Viver aqui
- EN: Living here
- FR: Vivre ici

### tile.sun
- PT: Sol por ano
- EN: Sunshine a year
- FR: Soleil par an

### tile.sun.v
- PT: {v} h
- EN: {v} h
- FR: {v} h

### tile.sea
- PT: Mar em agosto
- EN: Sea in August
- FR: Mer en août

### tile.beach
- PT: Até à praia
- EN: To the beach
- FR: Jusqu'à la plage

### tile.min
- PT: {v} min
- EN: {v} min
- FR: {v} min

### tile.flight
- PT: Voo para {c}
- EN: Flight to {c}
- FR: Vol vers {c}

### tile.care
- PT: Escolas e saúde
- EN: Schools and health
- FR: Écoles et santé

### tile.school
- PT: Escola internacional
- EN: International school
- FR: École internationale

### tile.hosp
- PT: Hospital
- EN: Hospital
- FR: Hôpital

### tile.docs
- PT: Médicos residentes por 1000 habitantes (INE)
- EN: Resident doctors per 1,000 people (INE)
- FR: Médecins résidents pour 1 000 habitants (INE)

### tile.km
- PT: {n}, a {v} km
- EN: {n}, {v} km away
- FR: {n}, à {v} km

### tile.soon
- PT: Em breve
- EN: Coming soon
- FR: Bientôt

### tile.soon.p
- PT: Estamos a reunir estes números nas fontes oficiais.
- EN: We are gathering these figures from the official sources.
- FR: Nous rassemblons ces chiffres auprès des sources officielles.

### tile.open
- PT: Ver o gráfico
- EN: See the chart
- FR: Voir le graphique

### tile.rent
- PT: Rendas e rendimento
- EN: Rents and yield
- FR: Loyers et rendement

### tile.g10y
- PT: Evolução 10 anos
- EN: Ten years
- FR: Dix ans

### tile.foreign
- PT: Procura estrangeira
- EN: Foreign demand
- FR: Demande étrangère

### tile.supply
- PT: Nova oferta
- EN: New supply
- FR: Offre nouvelle

### tile.compare
- PT: Comparar
- EN: Compare
- FR: Comparer

### tile.paid
- PT: Análise completa
- EN: Full analysis
- FR: Analyse complète

### unlock.offer
- PT: Análise completa: {r} € por região · {a} € Portugal inteiro, {m} meses
- EN: Full analysis: €{r} per region · €{a} for all of Portugal, {m} months
- FR: Analyse complète : {r} € par région · {a} € tout le Portugal, {m} mois

### unlock.p
- PT: Os números públicos de {place}, organizados lugar a lugar, com as fontes ao lado.
- EN: The public figures for {place}, organised place by place, with the sources alongside.
- FR: Les chiffres publics de {place}, organisés lieu par lieu, sources à l'appui.

### unlock.soon
- PT: Disponível em breve
- EN: Available soon
- FR: Bientôt disponible

### unlock.buy.region
- PT: {region} · {v} €
- EN: {region} · €{v}
- FR: {region} · {v} €

### unlock.buy.all
- PT: Portugal inteiro · {v} €
- EN: All of Portugal · €{v}
- FR: Tout le Portugal · {v} €

### unlock.list.1
- PT: Preços por tipologia, do T0 ao T4 e mais
- EN: Prices by number of bedrooms, T0 to T4 and above
- FR: Prix par typologie, du T0 au T4 et plus

### unlock.list.2
- PT: Novo e usado, lado a lado
- EN: New and existing homes, side by side
- FR: Neuf et ancien, côte à côte

### unlock.list.3
- PT: Intervalos de preço e a banda mais alta do mercado
- EN: Price ranges and the top band of the market
- FR: Fourchettes de prix et la tranche haute du marché

### unlock.list.4
- PT: Rendas e rendimento bruto
- EN: Rents and gross yield
- FR: Loyers et rendement brut

### unlock.list.5
- PT: Dez anos de preços, trimestre a trimestre
- EN: Ten years of prices, quarter by quarter
- FR: Dix ans de prix, trimestre par trimestre

### unlock.list.6
- PT: O preço pago por compradores com domicílio fiscal fora de Portugal
- EN: The price paid by buyers taxed outside Portugal
- FR: Le prix payé par les acheteurs domiciliés hors du Portugal

### unlock.list.7
- PT: Nova oferta: licenças e obras concluídas
- EN: New supply: permits and completions
- FR: Offre nouvelle : permis et achèvements

### unlock.list.8
- PT: Comparação completa entre lugares e um PDF para guardar
- EN: A full comparison between places and a PDF to keep
- FR: Une comparaison complète entre lieux et un PDF à garder

### unlock.note
- PT: Factos públicos do INE, da PORDATA e do IPMA. Descrevem o mercado; não são aconselhamento.
- EN: Public facts from INE, PORDATA and IPMA. They describe the market; they are not advice.
- FR: Faits publics de l'INE, de PORDATA et de l'IPMA. Ils décrivent le marché ; ce n'est pas un conseil.

### chart.span.1
- PT: num ano
- EN: in a year
- FR: en un an

### chart.span.5
- PT: em cinco anos
- EN: in five years
- FR: en cinq ans

### chart.span.10
- PT: em dez anos
- EN: in ten years
- FR: en dix ans

### chart.up
- PT: {in}, o preço subiu {v} {span}
- EN: {in}, prices rose {v} {span}
- FR: {in}, le prix a augmenté de {v} {span}

### chart.down
- PT: {in}, o preço desceu {v} {span}
- EN: {in}, prices fell {v} {span}
- FR: {in}, le prix a baissé de {v} {span}

### chart.flat
- PT: {in}, o preço ficou estável {span}
- EN: {in}, prices held steady {span}
- FR: {in}, le prix est resté stable {span}

### chart.above
- PT: No {q}, a mediana foi de {v}/m², acima da mediana {of} ({r}/m²).
- EN: In {q}, the median was {v}/m², above the median for {of} ({r}/m²).
- FR: Au {q}, la médiane était de {v}/m², au-dessus de la médiane {of} ({r}/m²).

### chart.near
- PT: No {q}, a mediana foi de {v}/m², perto da mediana {of} ({r}/m²).
- EN: In {q}, the median was {v}/m², close to the median for {of} ({r}/m²).
- FR: Au {q}, la médiane était de {v}/m², proche de la médiane {of} ({r}/m²).

### chart.below
- PT: No {q}, a mediana foi de {v}/m², abaixo da mediana {of} ({r}/m²).
- EN: In {q}, the median was {v}/m², below the median for {of} ({r}/m²).
- FR: Au {q}, la médiane était de {v}/m², en dessous de la médiane {of} ({r}/m²).

### chart.src
- PT: Fonte: INE, valor mediano das vendas por m², {q}. Descreve o mercado; não é aconselhamento.
- EN: Source: INE, median sale value per m², {q}. It describes the market; it is not advice.
- FR: Source : INE, valeur médiane des ventes au m², {q}. Cela décrit le marché ; ce n'est pas un conseil.

### strip.above
- PT: acima da mediana {of}
- EN: above the median for {of}
- FR: au-dessus de la médiane {of}

### strip.near
- PT: perto da mediana {of}
- EN: close to the median for {of}
- FR: proche de la médiane {of}

### strip.below
- PT: abaixo da mediana {of}
- EN: below the median for {of}
- FR: en dessous de la médiane {of}

### strip.note
- PT: Cada traço é um concelho; o ponto verde é {place}.
- EN: Each tick is a municipality; the green dot is {place}.
- FR: Chaque trait est une commune ; le point vert est {place}.

### back
- PT: Voltar
- EN: Back
- FR: Retour

### of.11
- PT: do Norte
- EN: the North
- FR: du Nord

### of.19
- PT: do Centro
- EN: the Centre
- FR: du Centre

### of.1D
- PT: do Oeste e Vale do Tejo
- EN: Oeste and Vale do Tejo
- FR: de l'Oeste et Vale do Tejo

### of.1A
- PT: da Grande Lisboa
- EN: Greater Lisbon
- FR: du Grand Lisbonne

### of.1B
- PT: da Península de Setúbal
- EN: the Setúbal Peninsula
- FR: de la péninsule de Setúbal

### of.1C
- PT: do Alentejo
- EN: the Alentejo
- FR: de l'Alentejo

### of.15
- PT: do Algarve
- EN: the Algarve
- FR: de l'Algarve

### of.20
- PT: dos Açores
- EN: the Azores
- FR: des Açores

### of.30
- PT: da Madeira
- EN: Madeira
- FR: de Madère

### of.PT
- PT: de Portugal
- EN: Portugal
- FR: du Portugal

### cty.lu
- PT: o Luxemburgo
- EN: Luxembourg
- FR: le Luxembourg

### cty.fr
- PT: Paris
- EN: Paris
- FR: Paris

### cty.ch
- PT: Genebra
- EN: Geneva
- FR: Genève

### cty.br
- PT: São Paulo
- EN: São Paulo
- FR: São Paulo

### cty.us
- PT: Nova Iorque
- EN: New York
- FR: New York

### cty.il
- PT: Telavive
- EN: Tel Aviv
- FR: Tel-Aviv

### cty.uk
- PT: Londres
- EN: London
- FR: Londres

### ph.porto-douro-entardecer
- PT: O Douro e a ponte Luís I, Porto
- EN: The Douro and the Luís I bridge, Porto
- FR: Le Douro et le pont Luís I, Porto

### ph.lisboa-castelo-por-do-sol
- PT: Lisboa vista do Castelo de São Jorge
- EN: Lisbon from São Jorge castle
- FR: Lisbonne depuis le château Saint-Georges

### ph.comporta-mar-turquesa
- PT: Comporta, Alcácer do Sal
- EN: Comporta, Alcácer do Sal
- FR: Comporta, Alcácer do Sal

### ph.algarve-praia-da-marinha
- PT: Praia da Marinha, Lagoa
- EN: Praia da Marinha, Lagoa
- FR: Praia da Marinha, Lagoa

### ph.madeira-levada
- PT: Uma levada na Laurissilva, Madeira
- EN: A levada in the Laurissilva, Madeira
- FR: Une levada dans la Laurissilva, Madère

### ph.centro-ria-de-aveiro-por-do-sol
- PT: A Ria de Aveiro ao pôr do sol, Murtosa
- EN: The Ria de Aveiro at sunset, Murtosa
- FR: La Ria de Aveiro au coucher du soleil, Murtosa

### ph.acores-sete-cidades-vista-do-rei
- PT: Lagoa das Sete Cidades, São Miguel
- EN: Lagoa das Sete Cidades, São Miguel
- FR: Lagoa das Sete Cidades, São Miguel

### compare.h
- PT: Comparar lugares
- EN: Compare places
- FR: Comparer des lieux

### compare.lede
- PT: Dois ou três lugares guardados com o coração, lado a lado. As primeiras linhas são livres; o resto faz parte da análise completa.
- EN: Two or three places saved with the heart, side by side. The first rows are free; the rest is part of the full analysis.
- FR: Deux ou trois lieux gardés avec le cœur, côte à côte. Les premières lignes sont libres ; le reste fait partie de l'analyse complète.

### compare.lede.free
- PT: Dois ou três lugares guardados, lado a lado.
- EN: Two or three saved places, side by side.
- FR: Deux ou trois lieux gardés, côte à côte.

### compare.pill
- PT: Comparar {n}
- EN: Compare {n}
- FR: Comparer {n}

### compare.need
- PT: Toque no coração de dois ou três lugares no mapa.
- EN: Tap the heart on two or three places on the map.
- FR: Touchez le cœur de deux ou trois lieux sur la carte.

### compare.max
- PT: Os três lugares guardados mais recentes.
- EN: The three most recently saved places.
- FR: Les trois lieux gardés les plus récents.

### compare.map
- PT: Voltar ao mapa
- EN: Back to the map
- FR: Retour à la carte

### compare.dir5
- PT: 5 anos
- EN: 5 years
- FR: 5 ans

### compare.rent
- PT: Renda por m²
- EN: Rent per m²
- FR: Loyer au m²

### compare.yield
- PT: Rendimento bruto
- EN: Gross yield
- FR: Rendement brut

### compare.g10
- PT: 10 anos
- EN: 10 years
- FR: 10 ans

### compare.foreign
- PT: Compradores de fora
- EN: Buyers from abroad
- FR: Acheteurs étrangers

### compare.supply
- PT: Obras novas
- EN: New buildings
- FR: Constructions neuves

### compare.locked
- PT: Na análise completa
- EN: In the full analysis
- FR: Dans l'analyse complète

### compare.src
- PT: Fontes: INE (preços, {q}), IPMA e PORDATA. Não é aconselhamento.
- EN: Sources: INE (prices, {q}), IPMA and PORDATA. Not advice.
- FR: Sources : INE (prix, {q}), IPMA et PORDATA. Ce n'est pas un conseil.

### compare.more
- PT: Rendas, rendimento e dez anos de preços: em breve.
- EN: Rents, yields and ten years of prices: coming soon.
- FR: Loyers, rendements et dix ans de prix : bientôt.

### a.title
- PT: Análise completa · {region}
- EN: Full analysis · {region}
- FR: Analyse complète · {region}

### a.all
- PT: Portugal inteiro
- EN: All of Portugal
- FR: Tout le Portugal

### a.lede
- PT: {region} em números públicos, lugar a lugar: preços, rendas, dez anos, procura estrangeira e obras novas. Dados de {q}.
- EN: {region} in public figures, place by place: prices, rents, ten years, foreign demand and new building. Data for {q}.
- FR: {region} en chiffres publics, lieu par lieu : prix, loyers, dix ans, demande étrangère et constructions neuves. Données de {q}.

### a.typ
- PT: Preços por tipologia
- EN: Prices by number of bedrooms
- FR: Prix par typologie

### a.ne
- PT: Novo e usado
- EN: New and existing
- FR: Neuf et ancien

### a.range
- PT: Intervalos e banda alta
- EN: Ranges and the top band
- FR: Fourchettes et tranche haute

### a.rent
- PT: Rendas e rendimento bruto
- EN: Rents and gross yield
- FR: Loyers et rendement brut

### a.g10
- PT: Dez anos de preços
- EN: Ten years of prices
- FR: Dix ans de prix

### a.foreign
- PT: Procura estrangeira
- EN: Foreign demand
- FR: Demande étrangère

### a.supply
- PT: Nova oferta
- EN: New supply
- FR: Offre nouvelle

### a.cmp
- PT: Todos os concelhos, lado a lado
- EN: Every municipality, side by side
- FR: Toutes les communes, côte à côte

### a.col.place
- PT: Concelho
- EN: Municipality
- FR: Commune

### a.col.m2
- PT: €/m²
- EN: €/m²
- FR: €/m²

### a.col.p5
- PT: 5 anos
- EN: 5 years
- FR: 5 ans

### a.col.p10
- PT: 10 anos
- EN: 10 years
- FR: 10 ans

### a.col.rent
- PT: Renda €/m²
- EN: Rent €/m²
- FR: Loyer €/m²

### a.col.yield
- PT: Rendimento
- EN: Yield
- FR: Rendement

### a.col.abroad
- PT: €/m² de fora
- EN: €/m² from abroad
- FR: €/m² de l'étranger

### a.col.dom
- PT: €/m² residentes
- EN: €/m² residents
- FR: €/m² résidents

### a.col.res
- PT: Residentes estrangeiros
- EN: Foreign residents
- FR: Résidents étrangers

### a.col.lic
- PT: Licenças
- EN: Permits
- FR: Permis

### a.col.new
- PT: Obras novas concluídas
- EN: New buildings completed
- FR: Constructions neuves achevées

### a.col.lo
- PT: De
- EN: From
- FR: De

### a.col.hi
- PT: Até
- EN: To
- FR: À

### a.pdf
- PT: Guardar em PDF
- EN: Save as PDF
- FR: Enregistrer en PDF

### a.private
- PT: Análise para o comprador. Não partilhar esta ligação.
- EN: Analysis for the buyer. Please do not share this link.
- FR: Analyse pour l'acheteur. Merci de ne pas partager ce lien.

### a.src
- PT: Fontes: INE (vendas, rendas, licenças, obras, residentes, {q}), PORDATA, IPMA e os preços publicados pelos promotores. Descreve o mercado; não é aconselhamento.
- EN: Sources: INE (sales, rents, permits, completions, residents, {q}), PORDATA, IPMA and the developers' published prices. It describes the market; it is not advice.
- FR: Sources : INE (ventes, loyers, permis, achèvements, résidents, {q}), PORDATA, IPMA et les prix publiés par les promoteurs. Cela décrit le marché ; ce n'est pas un conseil.

### compare.open
- PT: Ver no mapa
- EN: See on the map
- FR: Voir sur la carte

### tile.kmline
- PT: {v} km em linha reta
- EN: {v} km in a straight line
- FR: {v} km à vol d'oiseau

### tile.airport
- PT: Aeroporto
- EN: Airport
- FR: Aéroport

### tile.ap
- PT: {n}, {v} km em linha reta
- EN: {n}, {v} km in a straight line
- FR: {n}, {v} km à vol d'oiseau

### tile.noschool
- PT: Nenhuma na região
- EN: None in the region
- FR: Aucune dans la région

### tile.onreq2
- PT: preços sob consulta (promotor)
- EN: prices on request (developer)
- FR: prix sur demande (promoteur)

### tile.ty
- PT: entre tipologias
- EN: across typologies
- FR: selon la typologie

### tile.ne
- PT: novos {n} · usados {e}
- EN: new {n} · existing {e}
- FR: neuf {n} · ancien {e}

### tile.src
- PT: Mar em agosto: Copernicus Marine Service (1991–2020). Praias: APA. Aeroportos: OpenStreetMap. Médicos: INE (2025). Distâncias em linha reta, calculadas por nós.
- EN: Sea in August: Copernicus Marine Service (1991–2020). Beaches: APA. Airports: OpenStreetMap. Doctors: INE (2025). Straight-line distances, calculated by us.
- FR: Mer en août : Copernicus Marine Service (1991–2020). Plages : APA. Aéroports : OpenStreetMap. Médecins : INE (2025). Distances à vol d'oiseau, calculées par nous.

### a.col.newine
- PT: Novos (INE)
- EN: New (INE)
- FR: Neuf (INE)

### a.col.oldine
- PT: Usados (INE)
- EN: Existing (INE)
- FR: Ancien (INE)

## fix35

Operator's fix round, 3 Nov 2026, steps 3 and 5. Step 3: the prices page and three data articles become previews of the map's paid analysis (title, the finding in one sentence, the shape of the chart without figures, "Ver a análise completa"); the figures they used to give free are in the analysis (components/MapAnalysisPage.astro, components/AnalysisExtra.astro). Step 5: Maré said to be a newsletter wherever it is named (the sentence itself is mare.line, the short form common.newsletter).

### prev.cta
- PT: Ver a análise completa
- EN: See the full analysis
- FR: Voir l'analyse complète

### prev.shape
- PT: A forma do gráfico, sem os valores. Os números estão na análise completa.
- EN: The shape of the chart, without the values. The figures are in the full analysis.
- FR: La forme du graphique, sans les valeurs. Les chiffres sont dans l'analyse complète.

### prev.region
- PT: Uma região, no mapa · {v} €
- EN: One region, on the map · €{v}
- FR: Une région, sur la carte · {v} €

### prev.data.f
- PT: Em dez anos, o preço do m² subiu em quase todos os concelhos.{sHist}
- EN: Over ten years the price per m² rose in almost every municipality.{sHist}
- FR: En dix ans, le prix au m² a augmenté dans presque toutes les communes.{sHist}

### prev.data.y
- PT: Rentabilidade bruta por concelho
- EN: Gross yield by municipality
- FR: Rendement brut par commune

### prev.data.lo
- PT: m² mais barato
- EN: Cheapest m²
- FR: m² le moins cher

### prev.data.hi
- PT: m² mais caro
- EN: Dearest m²
- FR: m² le plus cher

### prev.prices.f
- PT: Em dez anos, o preço mediano do m² em Portugal subiu em todos os trimestres, e o Porto subiu mais depressa do que Lisboa e do que o país.{sHist}
- EN: Over ten years, Portugal's median price per m² rose in every quarter, and Porto rose faster than Lisbon and the country as a whole.{sHist}
- FR: En dix ans, le prix médian au m² au Portugal a augmenté à chaque trimestre, et Porto plus vite que Lisbonne et que l'ensemble du pays.{sHist}

### prev.prices.y
- PT: Preço por m², com o mesmo ponto de partida
- EN: Price per m², from the same starting point
- FR: Prix au m², depuis le même point de départ

### prev.prices.lo
- PT: Há dez anos
- EN: Ten years ago
- FR: Il y a dix ans

### prev.prices.hi
- PT: Hoje
- EN: Today
- FR: Aujourd'hui

### prev.prices.rest
- PT: Lisboa e Portugal
- EN: Lisbon and Portugal
- FR: Lisbonne et le Portugal

### prev.map.f
- PT: O m² mais caro está em Lisboa, Cascais e Oeiras, e o mais barato no interior do Norte e do Centro, onde o mesmo orçamento compra muitas vezes mais espaço.{sNow}
- EN: The dearest square metre is in Lisbon, Cascais and Oeiras, the cheapest in the inland North and Centre, where the same budget buys many times the space.{sNow}
- FR: Le m² le plus cher se trouve à Lisbonne, Cascais et Oeiras, le moins cher dans l'intérieur du Nord et du Centre, où le même budget achète bien plus d'espace.{sNow}

### prev.map.y
- PT: Preço por m², concelho a concelho
- EN: Price per m², municipality by municipality
- FR: Prix au m², commune par commune

### prev.map.lo
- PT: Mais caro
- EN: Dearest
- FR: Le plus cher

### prev.map.hi
- PT: Mais barato
- EN: Cheapest
- FR: Le moins cher

### prev.golf.f
- PT: Na maioria das freguesias com campo de golfe, o preço por m² fica perto do preço do concelho; Almancil e Canidelo são as exceções, bem acima.{sNow}{sGolf}
- EN: In most parishes with a golf course, the price per m² sits close to the municipality's; Almancil and Canidelo are the exceptions, well above it.{sNow}{sGolf}
- FR: Dans la plupart des paroisses avec un golf, le prix au m² reste proche de celui de la commune ; Almancil et Canidelo font exception, nettement au-dessus.{sNow}{sGolf}

### prev.golf.y
- PT: Freguesias com campo de golfe, face ao concelho
- EN: Parishes with a golf course, against their municipality
- FR: Paroisses avec un golf, face à leur commune

### prev.golf.lo
- PT: Acima do concelho
- EN: Above the municipality
- FR: Au-dessus de la commune

### prev.golf.hi
- PT: Abaixo do concelho
- EN: Below the municipality
- FR: En dessous de la commune

### an.ten
- PT: Dez anos, concelho a concelho
- EN: Ten years, municipality by municipality
- FR: Dix ans, commune par commune

### an.golf
- PT: Golfe: a freguesia face ao concelho
- EN: Golf: the parish against its municipality
- FR: Golf : la paroisse face à sa commune

## card5

Operator's step 1 (3 Nov 2026): the golden sample place card (Gondomar first). Free: photo, name, one line, heart, Preço in words (market median, new build, the five-year direction), Viver aqui (minutes by car to the beach, Porto and the airport; the flight), Escolas and Saúde (names and minutes), a small "Fontes" link and two calls to action. Paid (the analysis behind "Ver a análise completa"): ten years, rents and yield, distributions, the comparison with neighbours, doctors per inhabitant, the full lists. The place's own facts (the line, the names, the minutes) come from content/facts/map/places/<slug>/.

### mkt
- PT: Mercado
- EN: Market
- FR: Marché

### m2
- PT: {v} €/m²
- EN: €{v}/m²
- FR: {v} €/m²

### nb
- PT: Construção nova
- EN: New build
- FR: Neuf

### nb.onreq
- PT: preços sob consulta (promotor)
- EN: prices on request (developer)
- FR: prix sur demande (promoteur)

### life
- PT: Viver aqui
- EN: Living here
- FR: Vivre ici

### bycar
- PT: de carro
- EN: by car
- FR: en voiture

### min
- PT: {v} min
- EN: {v} min
- FR: {v} min

### flight
- PT: Voo desde {c}
- EN: Flight from {c}
- FR: Vol depuis {c}

### flight.via
- PT: até Lisboa, sem voo direto
- EN: to Lisbon, no direct flight
- FR: jusqu'à Lisbonne, sans vol direct

### flight.soon
- PT: em breve
- EN: coming soon
- FR: bientôt

### schools
- PT: Escolas
- EN: Schools
- FR: Écoles

### health
- PT: Saúde
- EN: Health
- FR: Santé

### within
- PT: a 20 minutos de carro
- EN: within 20 minutes by car
- FR: à 20 minutes en voiture

### sources
- PT: Fontes
- EN: Sources
- FR: Sources

### cta.paid
- PT: Ver a análise completa
- EN: See the full analysis
- FR: Voir l'analyse complète

### cta.consult
- PT: Falar com o Concierge
- EN: Talk to the Concierge
- FR: Parler au Concierge

### homes
- PT: Casas novas em {muni}: {name}
- EN: New homes in {muni}: {name}
- FR: Logements neufs à {muni} : {name}

### total
- PT: Total a pagar ≈ {total}, com IMT, imposto do selo e escritura
- EN: Total to pay ≈ {total}, with IMT, stamp duty and deed
- FR: Total à payer ≈ {total}, avec IMT, droit de timbre et acte

### photo.n
- PT: Fotografia {i} de {n}
- EN: Photo {i} of {n}
- FR: Photo {i} sur {n}

### src.h
- PT: Fontes
- EN: Sources
- FR: Sources

### src.mkt
- PT: Mercado: INE, valor mediano das vendas de alojamentos familiares por m² nos 12 meses até ao {q}.
- EN: Market: INE, median price per m² of homes sold in the 12 months to {q}.
- FR: Marché : INE, prix médian au m² des logements vendus sur les 12 mois jusqu'au {q}.

### src.dir
- PT: Direção a cinco anos: o mesmo indicador do INE, do {q0} ao {q}.
- EN: Five-year direction: the same INE indicator, {q0} to {q}.
- FR: Tendance sur cinq ans : le même indicateur de l'INE, du {q0} au {q}.

### src.nb
- PT: Construção nova: o promotor parceiro, que publica os preços sob consulta.
- EN: New build: the partner developer, which gives prices on request.
- FR: Neuf : le promoteur partenaire, qui communique ses prix sur demande.

### src.drive
- PT: Tempos de carro: OSRM, com dados do OpenStreetMap, a partir da {o}, sem trânsito, arredondados ao minuto. Consultado a {d}.
- EN: Driving times: OSRM, with OpenStreetMap data, from the {o}, without traffic, rounded to the minute. Checked on {d}.
- FR: Temps en voiture : OSRM, avec les données d'OpenStreetMap, depuis la {o}, sans trafic, arrondis à la minute. Consulté le {d}.

### src.flight
- PT: Voo: horário publicado do voo direto {from}–{to} (PlaneMapper). Consultado a {d}.
- EN: Flight: the published schedule of the direct {from}–{to} flight (PlaneMapper). Checked on {d}.
- FR: Vol : l'horaire publié du vol direct {from}–{to} (PlaneMapper). Consulté le {d}.

### src.sch
- PT: Escolas: DGEEC (InfoEscolas, dados de 2023/24) e o site de cada escola; as escolas internacionais não constam do InfoEscolas e foram confirmadas no próprio site. Consultado a {d}.
- EN: Schools: DGEEC (InfoEscolas, 2023/24 data) and each school's own site; the international schools are not in InfoEscolas and were confirmed on their own sites. Checked on {d}.
- FR: Écoles : DGEEC (InfoEscolas, données 2023/24) et le site de chaque école ; les écoles internationales ne figurent pas dans InfoEscolas et ont été confirmées sur leur propre site. Consulté le {d}.

### src.hsp
- PT: Saúde: ERS, registo público de prestadores de cuidados de saúde (inclui os hospitais e centros de saúde do SNS). Consultado a {d}.
- EN: Health: ERS, the public register of healthcare providers (it includes the SNS hospitals and health centres). Checked on {d}.
- FR: Santé : ERS, le registre public des prestataires de soins (il comprend les hôpitaux et centres de santé du SNS). Consulté le {d}.

### src.ph
- PT: Fotografias: autores e licenças na página de créditos.
- EN: Photographs: authors and licences on the credits page.
- FR: Photographies : auteurs et licences sur la page des crédits.

### src.km
- PT: Distâncias em linha reta, calculadas por nós até termos os tempos de carro deste concelho: praia e aeroporto a partir da câmara municipal (APA, OpenStreetMap), escola e hospital a partir do centro do concelho (SNS, OpenStreetMap).
- EN: Straight-line distances, calculated by us until we have this municipality's driving times: beach and airport from the town hall (APA, OpenStreetMap), school and hospital from the middle of the municipality (SNS, OpenStreetMap).
- FR: Distances à vol d'oiseau, calculées par nous en attendant les temps en voiture de cette commune : plage et aéroport depuis la mairie (APA, OpenStreetMap), école et hôpital depuis le centre de la commune (SNS, OpenStreetMap).

### preview
- PT: O que está na análise de {place}
- EN: What the analysis of {place} holds
- FR: Ce que contient l'analyse de {place}

### paid.1
- PT: Dez anos de preços, trimestre a trimestre, e o gráfico
- EN: Ten years of prices, quarter by quarter, with the chart
- FR: Dix ans de prix, trimestre par trimestre, avec le graphique

### paid.2
- PT: Rendas e rendimento bruto
- EN: Rents and gross yield
- FR: Loyers et rendement brut

### paid.3
- PT: Onde o lugar fica entre os 308 concelhos e a comparação com os vizinhos
- EN: Where the place sits among the 308 municipalities, and how it compares with its neighbors
- FR: La place du lieu parmi les 308 communes et la comparaison avec ses voisines

### paid.4
- PT: Médicos por habitante e as listas completas de escolas e de saúde
- EN: Doctors per resident and the full lists of schools and health services
- FR: Médecins par habitant et les listes complètes des écoles et des services de santé

### a.place
- PT: {place}: escolas, saúde e praias a 20 minutos de carro
- EN: {place}: schools, health and beaches within 20 minutes by car
- FR: {place} : écoles, santé et plages à 20 minutes en voiture

### a.place.p
- PT: Tempos de carro OSRM a partir da {o}, sem trânsito. Escolas: DGEEC InfoEscolas e sites das escolas. Saúde: registo da ERS. Consultado a {d}.
- EN: OSRM driving times from the {o}, without traffic. Schools: DGEEC InfoEscolas and the schools' sites. Health: the ERS register. Checked on {d}.
- FR: Temps en voiture OSRM depuis la {o}, sans trafic. Écoles : DGEEC InfoEscolas et les sites des écoles. Santé : registre de l'ERS. Consulté le {d}.

### a.col.min
- PT: Minutos
- EN: Minutes
- FR: Minutes

### a.col.kind
- PT: Tipo
- EN: Type
- FR: Type

### a.col.muni
- PT: Concelho
- EN: Municipality
- FR: Commune

### a.beaches
- PT: Praias de mar
- EN: Sea beaches
- FR: Plages océanes

### a.chart
- PT: {place}: dez anos de preços
- EN: {place}: ten years of prices
- FR: {place} : dix ans de prix

### a.sea
- PT: Temperatura do mar em agosto (Copernicus, 1991–2020)
- EN: Sea temperature in August (Copernicus, 1991–2020)
- FR: Température de la mer en août (Copernicus, 1991–2020)

### place.lede
- PT: Preço mediano das casas vendidas {in} nos 12 meses até ao {q}: {v} por m². {dir}
- EN: The median price of homes sold {in} in the 12 months to {q} was {v} per square meter. {dir}
- FR: Le prix médian des logements vendus {in} sur les 12 mois jusqu'au {q} s'élève à {v} le mètre carré. {dir}

### place.paid
- PT: Os dez anos de preços, as rendas e o rendimento bruto estão na análise completa.
- EN: Ten years of prices, rents and gross yield are in the full analysis.
- FR: Les dix ans de prix, les loyers et le rendement brut figurent dans l'analyse complète.

### tag.cs
- PT: centro de saúde
- EN: health center
- FR: centre de santé

### a.col.name
- PT: Nome
- EN: Name
- FR: Nom

### kind.intl
- PT: Escola internacional
- EN: International school
- FR: École internationale

### kind.priv
- PT: Colégio privado, currículo português
- EN: Private school, Portuguese curriculum
- FR: École privée, programme portugais

### kind.hpub
- PT: Hospital público (SNS)
- EN: Public hospital (SNS)
- FR: Hôpital public (SNS)

### kind.hpriv
- PT: Hospital privado
- EN: Private hospital
- FR: Hôpital privé

### kind.cs
- PT: Centro de saúde (SNS)
- EN: Health center (SNS)
- FR: Centre de santé (SNS)

## gate5

Free versus paid, site-wide (operator, 3 Nov 2026, acceptance line 2: "No 10-year data, yield or chart free anywhere"). The national rent and gross yield the method article used to quote, now in the paid analysis (MapAnalysisPage.astro, under "Rendas e rendimento bruto").

### a.rent.pt
- PT: Em Portugal, a renda mediana dos novos contratos era {rent} por m² ao mês, nos 12 meses até ao {q}: um rendimento bruto de {yield}%. É a renda vezes 12, a dividir pelo preço mediano por m², antes de custos e impostos.
- EN: In Portugal, the median rent on new leases was {rent} per m² a month in the 12 months to {q}, a gross yield of {yield}%. That is the rent times 12, divided by the median price per m², before costs and tax.
- FR: Au Portugal, le loyer médian des nouveaux baux était de {rent} le m² par mois sur les 12 mois jusqu'au {q}, soit un rendement brut de {yield} %. C'est le loyer fois 12, divisé par le prix médian au m², avant frais et impôts.

## advisor

Prompt 66 §3 (operator, 3 Nov 2026): while `config.agency.public` is false the site names no agency, no AMI licence and no agency website. Requests still go to the same agency (routing, e-mails and hard rule 6 unchanged); the reader sees "a qualified advisor". These blocks fill the places where the agency's name used to sit.

### who
- PT: um consultor qualificado
- EN: a qualified advisor
- FR: un conseiller qualifié

### title
- PT: Consultor qualificado
- EN: Qualified advisor
- FR: Conseiller qualifié

### firm
- PT: Mediadora imobiliária licenciada
- EN: Licensed real-estate brokerage
- FR: Agence immobilière agréée

### partners.h
- PT: Quem recebe os pedidos de casa
- EN: Who receives home requests
- FR: Qui reçoit les demandes de logement

### casa.consent
- PT: {parts}: autorizo o envio ao consultor qualificado, para me contactar.
- EN: {parts}: I authorise sending this to the qualified advisor, to contact me.
- FR: {parts} : j'autorise l'envoi au conseiller qualifié, pour me contacter.

## agencynamed

The wording that names the partner agency, kept exactly as it was before prompt 66 (only the Maré line corrected for D87). Used instead of the block of the same key when `config.agency.public` is true in site/src/config.ts (lib/copy.ts). Edit here to change what the site says when the agency is named again.

### common.trust.1.h
- PT: Agência parceira licenciada
- EN: Licensed partner agency
- FR: Agence partenaire agréée

### common.trust.1.p
- PT: {agency}, AMI {ami}. Patrocinador.
- EN: {agency}, AMI license {ami}. Sponsor.
- FR: {agency}, licence AMI {ami}. Sponsor.

### common.foot.agency
- PT: Agência parceira
- EN: Partner agency
- FR: Agence partenaire

### home.call.link
- PT: Pedir 15 minutos grátis
- EN: Talk to the agency for 15 minutes, free
- FR: Parler 15 minutes avec l'agence, gratuitement

### home.example.wait
- PT: Casa de exemplo, até a agência parceira apresentar a primeira casa real.
- EN: Until the partner agency sends its first real listing, we run the numbers on an example home.
- FR: En attendant le premier vrai bien de l'agence partenaire, nous faisons les comptes d'un bien d'exemple.

### home.side.h
- PT: A agência parceira
- EN: Our partner agency
- FR: L'agence partenaire

### home.side.p
- PT: Habinedita Gondomar, agência licenciada (AMI {ami}), Patrocinador Gold.
- EN: Habinedita Gondomar, licensed agency (AMI {ami}), Gold sponsor.
- FR: Habinedita Gondomar, agence agréée (AMI {ami}), sponsor Gold.

### calls.intro.subject
- PT: Primeira conversa de 15 minutos com a agência
- EN: 15-minute first call with the agency
- FR: Premier appel de 15 minutes avec l'agence

### faq.cta.agency
- PT: Perguntar à agência parceira
- EN: Ask our partner agency
- FR: Demander à l'agence partenaire

### talk.calls.h
- PT: Falar com a agência
- EN: Talk to the agency
- FR: Parler à l'agence

### talk.agency.p
- PT: A agência parceira para comprar ou vender a partir de fora: procura, visitas por vídeo ou ao vivo, negociação.
- EN: Our partner agency, for buying or selling from abroad: search, viewings by video call or in person, and negotiation.
- FR: Notre agence partenaire pour acheter ou vendre un bien depuis l'étranger : recherche, visites en appel vidéo ou sur place, et négociation.

### partners.proof.2
- PT: Grupo parceiro licenciado: agência imobiliária (AMI {ami}), intermediário de crédito e seguros.
- EN: Licensed partner group: estate agency (AMI {ami}), credit intermediary and insurance.
- FR: Groupe partenaire agréé : agence immobilière (AMI {ami}), intermédiaire de crédit et assurance.

### partners.agency.p
- PT: A única agência imobiliária da plataforma. Recebe todos os pedidos de compra ou venda e paga um patrocínio anual fixo, nunca uma comissão por contacto.
- EN: Our partner agency, and the only real-estate agency on the platform. Every request to buy or sell goes to it. It pays a flat yearly sponsorship, never a fee per lead.
- FR: Notre agence partenaire, et la seule agence immobilière de la plateforme. Toute demande d'achat ou de vente lui est transmise. Elle verse un parrainage annuel forfaitaire, jamais une commission par contact.

### partners.rules.4
- PT: Os pedidos de compra seguem só para a nossa agência parceira licenciada.
- EN: Buying requests go only to our licensed partner agency.
- FR: Les demandes d'achat vont uniquement à notre agence partenaire agréée.

### buy.lede
- PT: O pedido segue para a agência parceira, {agency} (AMI {ami}), que o contacta com opções. Sem custos.
- EN: Your request goes to our partner agency, {agency} (AMI license {ami}). The agency will reach out with options. It's free for you.
- FR: Votre demande part chez notre agence partenaire, {agency} (licence AMI {ami}). L'agence vous contacte avec des propositions. C'est gratuit pour vous.

### buy.steps.2
- PT: A agência parceira contacta-o em até dois dias úteis.
- EN: The partner agency reaches out within two business days.
- FR: L'agence partenaire vous contacte sous deux jours ouvrés.

### buy.small
- PT: Os seus dados servem só para este pedido e seguem para a agência parceira apenas com o seu consentimento.
- EN: Your details are used only for this request. They go only to the partner agency, with your consent.
- FR: Vos données servent uniquement à cette demande. Elles ne vont qu'à l'agence partenaire, avec votre accord.

### how.s4.p
- PT: A Imóveis Portugal não faz mediação imobiliária. Os pedidos de compra ou venda seguem só para a {agency}, agência parceira licenciada (AMI {ami}) e patrocinadora.
- EN: Imóveis Portugal isn't a real-estate broker. Requests to buy or sell a home go only to {agency}. It is our partner agency, licensed (AMI {ami}) and a sponsor.
- FR: Imóveis Portugal n'est pas un intermédiaire immobilier. Les demandes d'achat ou de vente vont uniquement à {agency}. C'est notre agence partenaire, agréée (AMI {ami}) et sponsor.

### how.s5.p
- PT: Para receber a Maré basta um clique: a beehiiv envia as edições e cada email tem um link para cancelar. Não usamos cookies de publicidade nem de estatística. Os pedidos que envia seguem por email só para a Imóveis Portugal e para a agência parceira, e o site não os guarda.
- EN: You join Maré, our newsletter, with one click: beehiiv sends the issues, and every email has an unsubscribe link. We use no advertising or analytics cookies. The requests you send go by email only to Imóveis Portugal and the partner agency, and the site does not store them.
- FR: On s'inscrit à Maré, notre newsletter, d'un clic : beehiiv envoie les numéros et chaque e-mail contient un lien de désinscription. Aucun cookie publicitaire ni de mesure d'audience. Les demandes que vous envoyez partent par e-mail uniquement chez Imóveis Portugal et l'agence partenaire, et le site ne les conserve pas.

### legal.privacy.7.p
- PT: O site junta no seu dispositivo (armazenamento local) o que fez e respondeu: o país da edição, o orçamento, o uso, o financiamento e a entrada, o custo total e o IMT do simulador, as zonas e os empreendimentos que abriu ou guardou e quanto tempo passou em cada uma, o prazo, se já tem NIF e se pensa passar a residente. Fica no seu dispositivo até o apagar, e pode vê-lo e imprimi-lo em «O meu perfil de comprador». Quando envia um pedido ao Concierge, o perfil segue com ele, com a origem de cada linha, só para a Imóveis Portugal e para a agência parceira {agency}, porque o pediu (RGPD, art. 6.º, n.º 1, al. b)). Um promotor só o recebe se marcar a caixa, desmarcada, com o nome desse promotor (art. 6.º, n.º 1, al. a)), e pode retirar esse consentimento a qualquer momento. Para os relatórios aos promotores contamos só quantos perfis completos chegam por empreendimento, sem nenhum dado pessoal. O perfil é indicativo, não é uma avaliação de crédito e não serve para nenhuma decisão automatizada sobre si. Para orçamentos elevados, a agência parceira continua a pedir identificação e prova de fundos, como exige a Lei 83/2017.
- EN: The site gathers on your device (local storage) what you did and answered: your edition's country, budget, use, financing and down payment, the simulator's total cost and IMT, the areas and developments you opened or saved and how long you spent on each, your timeline, whether you have a NIF and whether you plan to become a resident. It stays on your device until you delete it, and you can see and print it under “My buyer profile”. When you send a Concierge request, the profile goes with it, with where each line came from, only to Imóveis Portugal and our partner agency {agency}, because you asked for it (GDPR art. 6(1)(b)). A developer receives it only if you tick the unticked box naming that developer (art. 6(1)(a)), and you can withdraw that consent at any time. For the developers' reports we only count how many complete profiles arrive per development, with no personal data. The profile is indicative, is not a credit assessment and is not used for any automated decision about you. For high budgets, the partner agency still asks for identification and proof of funds, as Lei 83/2017 requires.
- FR: Le site rassemble sur votre appareil (stockage local) ce que vous avez fait et répondu : le pays de votre édition, le budget, l'usage, le financement et l'apport, le coût total et l'IMT du simulateur, les secteurs et programmes ouverts ou gardés et le temps passé sur chacun, l'échéance, si vous avez un NIF et si vous pensez devenir résident. Il reste sur votre appareil jusqu'à ce que vous l'effaciez, et vous pouvez le voir et l'imprimer dans « Mon profil d'acheteur ». Quand vous envoyez une demande au Concierge, le profil part avec elle, avec l'origine de chaque ligne, uniquement chez Imóveis Portugal et l'agence partenaire {agency}, parce que vous l'avez demandé (RGPD, art. 6, par. 1, b)). Un promoteur ne le reçoit que si vous cochez la case, non cochée, à son nom (art. 6, par. 1, a)), et vous pouvez retirer cet accord à tout moment. Pour les rapports aux promoteurs, nous comptons seulement combien de profils complets arrivent par programme, sans aucune donnée personnelle. Le profil est indicatif, n'est pas une évaluation de crédit et ne sert à aucune décision automatisée vous concernant. Pour les budgets élevés, l'agence partenaire demande toujours une pièce d'identité et la preuve des fonds, comme l'exige la Lei 83/2017.

### legal.privacy.2.p
- PT: Maré, a newsletter: o seu email, com o seu consentimento (RGPD, art. 6.º, n.º 1, al. a)), dado com um clique no formulário; a beehiiv envia as edições e cada email tem um link para cancelar. Pedidos de compra, de visita e do Concierge: nome, contactos e o que procura, para dar seguimento ao pedido que nos faz antes de qualquer contrato (art. 6.º, n.º 1, al. b)), enviados à Imóveis Portugal e à agência parceira {agency} (AMI {ami}). Pedidos de parceria: dados profissionais, para responder (art. 6.º, n.º 1, al. b)). Pedidos a parceiros: categoria, país, pergunta e contacto, para responder ao seu pedido (art. 6.º, n.º 1, al. b)) e, se o autorizar, passar a um parceiro da categoria.
- EN: Maré, the newsletter: your email address, with your consent (GDPR, art. 6(1)(a)), given with one click on the form; beehiiv sends the issues and every email has an unsubscribe link. Buying, viewing and Concierge requests: name, contact details and what you're looking for, to act on the request you make before any contract (art. 6(1)(b)), sent to Imóveis Portugal and our partner agency {agency} (AMI {ami}). Partner inquiries: business details, to reply (art. 6(1)(b)). Requests to a partner: category, country, question and contact details, to answer your request (art. 6(1)(b)) and, if you agree, to pass them to a partner in that category.
- FR: Maré, la newsletter : votre adresse e-mail, avec votre consentement (RGPD, art. 6, par. 1, a)), donné d'un clic dans le formulaire ; beehiiv envoie les numéros et chaque e-mail contient un lien de désinscription. Demandes d'achat, de visite et du Concierge : nom, coordonnées et critères, pour donner suite à la demande que vous faites avant tout contrat (art. 6, par. 1, b)), transmis à Imóveis Portugal et à l'agence partenaire {agency} (AMI {ami}). Demandes de partenariat : données professionnelles, pour répondre (art. 6, par. 1, b)). Demandes à un partenaire : catégorie, pays, question et coordonnées, pour répondre à votre demande (art. 6, par. 1, b)) et, avec votre accord, les transmettre à un partenaire de la catégorie.

### legal.privacy.3.p
- PT: A Imóveis Portugal e a agência parceira {agency} (AMI {ami}) recebem os pedidos que envia pelo site (compra, visita, Concierge e pedidos a parceiros), por email, através do Cloudflare Email Routing; o site não os guarda. O parceiro da categoria escolhida, só para pedidos a parceiros e com o seu consentimento. O promotor de um empreendimento, só se marcar a caixa com o nome dele: recebe por nós o seu perfil de comprador. Prestadores que tratam dados por nossa conta: beehiiv (envio da Maré, EUA, com garantias adequadas para a transferência), Tally (formulários, UE), Cloudflare (alojamento, envio dos pedidos por email e estatísticas sem cookies) e Cal.com (marcação de chamadas).
- EN: Imóveis Portugal and our partner agency {agency} (AMI {ami}) receive the requests you send on the site (buying, viewing, Concierge and requests to a partner), by email, through Cloudflare Email Routing; the site does not store them. The partner in the chosen category, only for requests to a partner and with your consent. A development's developer, only if you tick the box with its name: it receives your buyer profile through us. Processors acting for us: beehiiv (Maré, the newsletter, USA, with appropriate safeguards for the transfer), Tally (forms, EU), Cloudflare (hosting, sending requests by email and cookie-free statistics) and Cal.com (call booking).
- FR: Imóveis Portugal et l'agence partenaire {agency} (AMI {ami}) reçoivent les demandes que vous envoyez sur le site (achat, visite, Concierge et demandes à un partenaire), par e-mail, via Cloudflare Email Routing ; le site ne les conserve pas. Le partenaire de la catégorie choisie, uniquement pour les demandes à un partenaire et avec votre accord. Le promoteur d'un programme, uniquement si vous cochez la case à son nom : il reçoit votre profil d'acheteur par notre intermédiaire. Sous-traitants : beehiiv (Maré, la newsletter, États-Unis, avec garanties appropriées pour le transfert), Tally (formulaires, UE), Cloudflare (hébergement, envoi des demandes par e-mail et statistiques sans cookies) et Cal.com (prise de rendez-vous).

### legal.legal.4.h
- PT: Agência parceira
- EN: Partner agency
- FR: Agence partenaire

### legal.legal.4.p
- PT: {agency}, AMI {ami}, mediadora imobiliária licenciada. A Imóveis Portugal não faz mediação imobiliária.
- EN: {agency}, AMI license {ami}, a licensed real-estate broker. Imóveis Portugal does not act as a real-estate broker.
- FR: {agency}, licence AMI {ami}, intermédiaire immobilier agréé. Imóveis Portugal n'exerce pas d'activité d'intermédiation immobilière.

### sims.agency.p
- PT: Com um preço em mente, a agência parceira mostra casas nesse valor.
- EN: If you already have a price in mind, the partner agency can show you homes at that price.
- FR: Si vous avez déjà un prix en tête, l'agence partenaire vous montre des biens à ce prix.

### casa.s.agency.p
- PT: A agência parceira, {agency} (AMI {ami}), procura casas no seu orçamento e mostra-as por videochamada, a um familiar ou ao vivo.
- EN: Our partner agency, {agency} (AMI {ami}), looks for homes in your budget. It shows them by video call, through a relative or in person.
- FR: Notre agence partenaire, {agency} (AMI {ami}), cherche des biens dans votre budget. Elle vous les montre en appel vidéo, par un proche ou sur place.

### place.homes
- PT: Pedir consulta à agência
- EN: See homes in this area with the partner agency
- FR: Voir des biens dans ce secteur avec l'agence partenaire

### map.proj.askag
- PT: Receber detalhes da agência
- EN: Ask through the partner agency
- FR: Demander via l'agence partenaire

### scen.note
- PT: As medianas do INE cobrem concelhos inteiros, sem separar zonas como a Quinta do Lago, em Loulé. Os exemplos são preços pedidos em anúncios, não de venda, e as casas não são da nossa agência parceira.
- EN: INE medians describe whole municipalities. They don't describe the most sought-after enclaves inside them, such as Quinta do Lago in Loulé. The examples are asking prices from listings, not sale prices. They are not homes from our partner agency.
- FR: Les médianes de l'INE décrivent des communes entières. Elles ne décrivent pas les secteurs les plus recherchés, comme Quinta do Lago à Loulé. Les exemples sont des prix demandés, pas des prix de vente. Ce ne sont pas des biens de notre agence partenaire.

### kit.developers.rule
- PT: Os pedidos de visita dos leitores seguem para a nossa agência parceira licenciada, que trabalha com o promotor.
- EN: Readers' viewing requests go to our licensed partner agency, which works with the developer.
- FR: Les demandes de visite des lecteurs vont à notre agence partenaire agréée, qui travaille avec le promoteur.

### consult.h1
- PT: O Concierge, 15 minutos com a agência parceira
- EN: The Concierge, 15 minutes with our partner agency
- FR: Le Concierge, 15 minutes avec l'agence partenaire

### consult.lede
- PT: Quinze minutos por videochamada com a {agency} (AMI {ami}), sem custos. As suas respostas preparam a conversa.
- EN: Fifteen minutes by video call with {agency} (AMI {ami}), at no cost. Answer a few questions so the conversation starts with your case.
- FR: Quinze minutes en appel vidéo avec {agency} (AMI {ami}), sans frais. Répondez à quelques questions pour que l'échange parte de votre situation.

### consult.next.1
- PT: A agência lê o seu pedido e responde por email.
- EN: The agency reads your request and replies by email.
- FR: L'agence lit votre demande et vous répond par e-mail.

### consult.privacy
- PT: Os seus dados seguem só para a Imóveis Portugal e para a agência parceira, que lhe responde por email.
- EN: Your details go only to Imóveis Portugal and the partner agency, who reply by email.
- FR: Vos données ne vont qu'à Imóveis Portugal et à l'agence partenaire, qui vous répond par e-mail.

### consult.card.p
- PT: Com a agência parceira, sem custos. Diga-nos o que procura.
- EN: With the partner agency, at no cost. Tell us where you are in your plan.
- FR: Avec l'agence partenaire, sans frais. Dites-nous où vous en êtes.

### consult.ok.h1
- PT: O seu pedido chegou à agência
- EN: Your request has reached the agency
- FR: Votre demande est arrivée à l'agence

### consult.ok.p
- PT: A {agency} propõe-lhe por email uma videochamada de 15 minutos, no horário que indicou.
- EN: Thank you. {agency} will email you to propose a 15-minute video call within the window you gave.
- FR: Merci. {agency} vous proposera par e-mail un appel vidéo de 15 minutes dans la période indiquée.

### consult.private.p
- PT: A {agency} propõe-lhe por email uma videochamada de 15 minutos, no horário que indicou.
- EN: Thank you. {agency} will email you to propose a 15-minute video call within the window you gave.
- FR: Merci. {agency} vous proposera par e-mail un appel vidéo de 15 minutes dans la période indiquée.

### consult.private.aml
- PT: Antes das visitas, a agência pede a identificação e a origem dos fundos, como a lei exige a todas as agências imobiliárias em Portugal.
- EN: Before viewings, the agency asks for the usual identification and information on the origin of funds. Every estate agency in Portugal must do so.
- FR: Avant les visites, l'agence demande les pièces d'identité habituelles et des informations sur l'origine des fonds. C'est une obligation pour toute agence immobilière au Portugal.

### path.st.choose.a
- PT: O consultor da agência parceira organiza as visitas (por videochamada, com um familiar ou ao vivo) e prepara consigo a proposta. O mapa mostra também os empreendimentos novos dos promotores parceiros.
- EN: The partner agency's advisor arranges the viewings: by video call, with a relative, or in person when you visit Portugal. On the map, you can also see new developments from partner developers. Once you find the home, the advisor helps you prepare the offer.
- FR: Le conseiller de l'agence partenaire organise les visites : en appel vidéo, avec un proche ou sur place lors de votre venue au Portugal. Sur la carte, vous voyez aussi les programmes neufs des promoteurs partenaires. Une fois le bien trouvé, le conseiller vous aide à préparer l'offre.

### path.st.worth.a
- PT: O mapa mostra o preço mediano por metro quadrado no seu concelho, com dados do INE. Para a sua casa, o consultor da agência parceira faz uma avaliação sem compromisso.
- EN: The map shows the median price per square metre in your municipality, from official INE data. For a figure for your own home, the partner agency's advisor gives you a valuation with no commitment.
- FR: La carte montre le prix médian au mètre carré dans votre commune, selon les données officielles de l'INE. Pour un chiffre sur votre bien, le conseiller de l'agence partenaire fait une estimation sans engagement.

### path.st.list.a
- PT: A agência parceira anuncia a casa, mostra-a e traz-lhe as propostas. O contrato de mediação, o acordo escrito com a agência, fixa o preço pedido e as condições.
- EN: The partner agency lists the home, runs the viewings and brings you the offers, while you live abroad. The agency agreement (contrato de mediação) sets the asking price and the terms.
- FR: L'agence partenaire publie l'annonce, organise les visites et vous présente les offres, pendant que vous vivez à l'étranger. Le mandat (contrato de mediação), l'accord écrit avec l'agence, fixe le prix demandé et les conditions.

### path.st.list.h
- PT: Pôr à venda com a agência
- EN: Listing with the agency
- FR: Mettre en vente avec l'agence

### flow.c.lede
- PT: Quinze minutos por vídeo com a agência parceira, sem custos. Pedir leva um minuto.
- EN: A free first 15-minute video call with our partner agency. One question at a time, about a minute in all.
- FR: Un premier échange vidéo de 15 minutes, gratuit, avec notre agence partenaire. Une question à la fois, une minute en tout.

### flow.c.consent
- PT: Autorizo o envio deste pedido à {agency} (AMI {ami}), agência imobiliária parceira, para me contactar sobre ele. Li a política de privacidade.
- EN: I agree that this request is sent to {agency} (AMI {ami}), the partner estate agency, to contact me about it. I have read the privacy policy.
- FR: J'accepte que cette demande soit transmise à {agency} (AMI {ami}), agence immobilière partenaire, pour me recontacter. J'ai lu la politique de confidentialité.

### flow.v.done.h
- PT: O pedido seguiu para a agência parceira.
- EN: Request sent to our partner agency.
- FR: Demande transmise à notre agence partenaire.

### flow.v.done.p
- PT: A {agency} confirma a data por email, normalmente em dois dias úteis.
- EN: {agency} will confirm the date by email, usually within two working days.
- FR: {agency} confirme la date par e-mail, en général sous deux jours ouvrés.

### bar.next.home.p
- PT: Diga-nos onde vive, o orçamento e o que procura. O Concierge prepara o resto com a agência parceira.
- EN: Tell us where you live, your budget and what you are looking for. The Concierge prepares the rest with the partner agency.
- FR: Dites-nous où vous vivez, votre budget et ce que vous cherchez. Le Concierge prépare le reste avec l'agence partenaire.

### bar.next.sims.p
- PT: Com os números feitos, o passo seguinte é uma conversa de 15 minutos com a agência parceira, sem custos.
- EN: With the numbers done, the next step is a 15-minute call with the partner agency, free of charge.
- FR: Les chiffres faits, l'étape suivante est un appel de 15 minutes avec l'agence partenaire, sans frais.

### bar.next.read.p
- PT: Quando quiser, o Concierge junta as suas respostas e marca a primeira conversa com a agência parceira.
- EN: Whenever you like, the Concierge gathers your answers and books the first call with the partner agency.
- FR: Quand vous voulez, le Concierge rassemble vos réponses et fixe le premier appel avec l'agence partenaire.

### bar.next.show.p
- PT: Para ver estas casas, marque uma visita privada. A agência parceira trata do resto com o promotor.
- EN: To see these homes, book a private visit. The partner agency handles the rest with the developer.
- FR: Pour voir ces logements, réservez une visite privée. L'agence partenaire s'occupe du reste avec le promoteur.

### send.notice
- PT: O seu pedido segue para a {agency}, mediadora licenciada (AMI {ami}), e para a Imóveis Portugal. Responde-lhe por e-mail.
- EN: When you send, your request goes to Imóveis Portugal and to {agency}, who reply by email.
- FR: En envoyant, votre demande part chez Imóveis Portugal et chez {agency}, qui vous répond par e-mail.

### p69.notice
- PT: O seu pedido segue para a {agency}, mediadora licenciada (AMI {ami}), e para a Imóveis Portugal. A {agency} confirma a hora por email e liga-lhe.
- EN: Your request goes to Imóveis Portugal and to {agency}, who confirm the time by email and call you.
- FR: Votre demande part chez Imóveis Portugal et chez {agency}, qui confirme l'heure par e-mail et vous appelle.

### p69.notice.later
- PT: O seu pedido segue para a {agency}, mediadora licenciada (AMI {ami}), e para a Imóveis Portugal. A {agency} escreve-lhe por email para combinar a hora.
- EN: Your request goes to Imóveis Portugal and to {agency}, who email you to agree on a time.
- FR: Votre demande part chez Imóveis Portugal et chez {agency}, qui vous écrit par e-mail pour convenir d'une heure.

### send.to
- PT: Imóveis Portugal e o consultor qualificado da {agency}
- EN: Imóveis Portugal and the qualified advisor at {agency}
- FR: Imóveis Portugal et le conseiller qualifié de {agency}

### send.basis.p
- PT: Pedido enviado pelo leitor à Imóveis Portugal e à agência parceira {agency} (RGPD, art. 6.º, n.º 1, al. b)): diligências pré-contratuais a pedido do titular.
- EN: Request sent by the reader to Imóveis Portugal and the partner agency {agency} (GDPR art. 6(1)(b)): steps taken at the reader's request before a contract.
- FR: Demande envoyée par le lecteur à Imóveis Portugal et à l'agence partenaire {agency} (RGPD, art. 6, par. 1, b)) : mesures précontractuelles prises à la demande de la personne.

### send.foot
- PT: Enviado pela Imóveis Portugal. O mesmo pedido segue para a Imóveis Portugal e para o consultor qualificado da agência parceira, que responde ao leitor.
- EN: Sent by Imóveis Portugal. The same request goes to Imóveis Portugal and to the partner agency's qualified advisor, who replies to the reader.
- FR: Envoyé par Imóveis Portugal. La même demande part chez Imóveis Portugal et chez le conseiller qualifié de l'agence partenaire, qui répond au lecteur.

## orz

Prompt 66 (3 Nov 2026): the O'rizon Living showcase, the first project shown on the site as our pick, without payment ("tag" in projects.json, never "Sponsored"). The film and the 3D tour load only when the reader asks: both come from other sites that set their own cookies. Used by ShowcaseBlocks.astro, ShowcaseUnits.astro and ShowcaseMedia.astro.

### film.h
- PT: O filme
- EN: The film
- FR: Le film

### film.play
- PT: Ver o filme
- EN: Play the film
- FR: Voir le film

### film.note
- PT: Filme de Shalu Investments. Toca no YouTube, que pode guardar os seus próprios cookies.
- EN: Film by Shalu Investments. It plays on YouTube, which may set its own cookies.
- FR: Film de Shalu Investments. Il se lit sur YouTube, qui peut déposer ses propres cookies.

### views.h
- PT: As vistas
- EN: The views
- FR: Les vues

### views.p
- PT: O rio, a ponte do Freixo e o Porto ao fundo, em imagens do promotor.
- EN: The river, the Freixo bridge and Porto beyond, in the developer's renders.
- FR: Le fleuve, le pont do Freixo et Porto au loin, dans les images du promoteur.

### tour.h
- PT: A visita 3D
- EN: The 3D tour
- FR: La visite 3D

### tour.p
- PT: Os cinco edifícios em maqueta 3D: escolha um edifício, um piso e uma casa, com a planta e as áreas.
- EN: The five buildings as a 3D model: pick a building, a floor and a home, with its plan and areas.
- FR: Les cinq immeubles en maquette 3D : choisissez un immeuble, un étage et un logement, avec son plan et ses surfaces.

### tour.open
- PT: Abrir a visita 3D
- EN: Open the 3D tour
- FR: Ouvrir la visite 3D

### tour.note
- PT: Abre a visita 3D de Shalu Investments, em property-sales-engine.com, que pode guardar os seus próprios cookies.
- EN: Opens Shalu Investments' 3D tour from property-sales-engine.com, which may set its own cookies.
- FR: Ouvre la visite 3D de Shalu Investments, sur property-sales-engine.com, qui peut déposer ses propres cookies.

### tour.newtab
- PT: Abrir num separador novo
- EN: Open in a new tab
- FR: Ouvrir dans un nouvel onglet

### close
- PT: Fechar
- EN: Close
- FR: Fermer

### bld.h
- PT: Cinco edifícios
- EN: Five buildings
- FR: Cinq immeubles

### bld.p
- PT: Os nomes são do promotor. As frações por tipologia são as publicadas para a primeira fase; a segunda fase ainda não tem números.
- EN: The names are the developer's. Homes by typology as published for the first phase; the second phase has no figures yet.
- FR: Les noms sont ceux du promoteur. Logements par typologie tels que publiés pour la première phase ; la deuxième phase n'a pas encore de chiffres.

### bld.phase
- PT: Fase {n}
- EN: Phase {n}
- FR: Phase {n}

### bld.total
- PT: Total
- EN: Total
- FR: Total

### bld.nofig
- PT: Por publicar
- EN: Not yet published
- FR: Pas encore publié

### areas.h
- PT: Áreas por tipologia
- EN: Areas by type (T1 = 1 bedroom)
- FR: Surfaces par typologie (T1 = 1 chambre)

### areas.v
- PT: {min} a {max} m²
- EN: {min} to {max} m²
- FR: {min} à {max} m²

### homes.h
- PT: Casas à venda, com preço publicado
- EN: Homes for sale, with a published price
- FR: Logements en vente, avec prix publié

### homes.lede
- PT: {n} casas anunciadas, de {min} a {max}.
- EN: {n} homes listed, from {min} to {max}.
- FR: {n} logements annoncés, de {min} à {max}.

### col.typ
- PT: Tipologia
- EN: Type (T1 = 1 bedroom)
- FR: Typologie (T1 = 1 chambre)

### col.area
- PT: Área anunciada
- EN: Listed area
- FR: Surface annoncée

### col.out
- PT: Exterior
- EN: Outdoor
- FR: Extérieur

### col.price
- PT: Preço pedido
- EN: Asking price
- FR: Prix demandé

### out.balcony
- PT: varanda
- EN: balcony
- FR: balcon

### out.terrace
- PT: terraço
- EN: terrace
- FR: terrasse

### out.garden
- PT: jardim
- EN: garden
- FR: jardin

### out.and
- PT: e
- EN: and
- FR: et

### duplex
- PT: Duplex
- EN: Duplex
- FR: Duplex

### ask
- PT: Pedir esta casa
- EN: Ask about this home
- FR: Demander ce logement

### plans.h
- PT: Plantas por tipologia
- EN: Floor plans by typology
- FR: Plans par typologie

### amen.h
- PT: No condomínio
- EN: In the grounds
- FR: Dans la résidence

### amen.src
- PT: Lista do promotor
- EN: The developer's list
- FR: Liste du promoteur

## p68

Prompt 68 (4 Nov 2026), the method's worked example (content/METHOD.md): a place with partner projects that carry a "hero" line in projects.json, and with an arrival in its place.json, opens as an arrival (the photograph, the name, one line), then its developments as photo tiles in one format (alphabetical, no ranking; each opens its card: the render, one line, one action), then the next questions, one line each, opening on tap, then one more thing. Gondomar is the sample (rule 17). The place's own lines (the arrival, the last line) live in content/facts/map/places/<slug>/place.json; the project's line in projects.json. Used by site/src/scripts/map-v3.ts.

### q.life
- PT: {city} a {v} min de carro
- EN: {city}, {v} min away by car
- FR: {city} à {v} min en voiture

### q.schools
- PT: Escolas: {n} a menos de {m} min
- EN: Schools: {n} within {m} min
- FR: Écoles : {n} à moins de {m} min

### q.price
- PT: Com {b}: cerca de {a} m²
- EN: {b} buys about {a} m²
- FR: Avec {b} : environ {a} m²

### q.health
- PT: Um hospital a {v} min
- EN: A hospital {v} min away
- FR: Un hôpital à {v} min

### q.sea
- PT: O mar a {v} km do centro, em linha reta
- EN: The sea {v} km from town, as the crow flies
- FR: La mer à {v} km du centre, à vol d'oiseau

### q.sea.min
- PT: O mar a {v} min
- EN: The sea {v} min away
- FR: La mer à {v} min

### q.health.cs
- PT: Um centro de saúde a {v} min
- EN: A health center {v} min away
- FR: Un centre de santé à {v} min

### visit
- PT: Marcar uma visita privada
- EN: Book a private visit
- FR: Réserver une visite privée

### view
- PT: Ver o empreendimento
- EN: See the development
- FR: Voir le programme

### credit
- PT: Imagem: {c}
- EN: Image: {c}
- FR: Image : {c}

### more.src
- PT: {t}, consultado a {d}.
- EN: {t}, checked {d}.
- FR: {t}, consulté le {d}.


## p69

Prompt 69 (4 Nov 2026), the Concierge in three steps and IMT explained where the number is (content/METHOD.md). Feel: "I asked once, and someone has it in hand." Step 1 opens on what the reader came from (the project, the place, the budget), already chosen; step 2 is one time picker in the reader's own time zone with Lisbon underneath (it replaces flow.c.when and flow.c.window, kept unused); step 3 is the e-mail or phone and the language of the call, and sends. After the confirmation, the optional preparation asks what can wait (purpose, timeline, NIF, financing, where). The IMT screen opens from the simulator, the Concierge's confirmation, the map card and the project card. Used by site/src/lib/flows.ts, site/src/scripts/flow.ts, site/src/scripts/slots.ts, site/src/components/ImtSheet.astro and site/src/scripts/imt.ts. Rates and references: content/facts/facts.csv (pt-imt-nonresident-flat, pt-imt-nonresident-exceptions, pt-imt-hpp-2026).

### help
- PT: Em que podemos ajudar?
- EN: What can we help with?
- FR: En quoi pouvons-nous vous aider ?

### lede
- PT: Um consultor liga-lhe à hora que escolher.
- EN: An advisor calls you when you choose.
- FR: Un conseiller vous appelle quand vous voulez.

### help.ctx
- PT: O que estava a ver
- EN: What you were looking at
- FR: Ce que vous regardiez

### help.project
- PT: {name}, {inplace}
- EN: {name}, {inplace}
- FR: {name}, {inplace}

### help.place
- PT: Uma casa {inplace}
- EN: A home {inplace}
- FR: Un logement {inplace}

### help.placebudget
- PT: Uma casa {inplace}, por cerca de {price}
- EN: A home {inplace}, around {price}
- FR: Un logement {inplace}, autour de {price}

### help.budget
- PT: Uma casa por cerca de {price}
- EN: A home around {price}
- FR: Un logement autour de {price}

### help.about
- PT: Sobre: {name}
- EN: About: {name}
- FR: À propos : {name}

### help.home
- PT: Comprar casa
- EN: Buy a home
- FR: Acheter

### help.costs
- PT: Custos e impostos
- EN: Costs and taxes
- FR: Frais et impôts

### help.sell
- PT: Vender ou herdar
- EN: Sell or inherit
- FR: Vendre ou hériter

### budget
- PT: Orçamento
- EN: Budget
- FR: Budget

### when
- PT: Quando lhe podemos ligar?
- EN: When can we call you?
- FR: Quand pouvons-nous vous appeler ?

### when.skip
- PT: Prefiro combinar por email
- EN: I'd rather agree a time by email
- FR: Je préfère convenir d'une heure par e-mail
### visit.title
- PT: Marcar uma visita privada
- EN: Book a private visit
- FR: Réserver une visite privée
### visit.when
- PT: Quando lhe podemos ligar para marcar a visita?
- EN: When can we call you to arrange the visit?
- FR: Quand pouvons-nous vous appeler pour organiser la visite ?
### visit.done
- PT: O consultor liga-lhe a essa hora para marcar a visita a {name}.
- EN: The advisor calls you at that time to arrange the visit to {name}.
- FR: Le conseiller vous appelle à cette heure-là pour organiser la visite de {name}.
### visit.done.later
- PT: O consultor escreve-lhe por email para marcar a visita a {name}.
- EN: The advisor emails you to arrange the visit to {name}.
- FR: Le conseiller vous écrit par e-mail pour organiser la visite de {name}.
### visit.intent
- PT: Visita privada a {name} (ligar para marcar)
- EN: Private visit to {name} (call to arrange)
- FR: Visite privée de {name} (appeler pour organiser)

### tz
- PT: Horas {ofcity}, com Lisboa por baixo.
- EN: Times {ofcity}, with Lisbon underneath.
- FR: Heures {ofcity}, avec Lisbonne en dessous.

### tz.same
- PT: Horas de Lisboa.
- EN: Lisbon times.
- FR: Heures de Lisbonne.

### tz.change
- PT: Mudar
- EN: Change
- FR: Modifier

### tz.zone
- PT: Mostrar as horas de
- EN: Show the times for
- FR: Afficher les heures de

### tz.lisbon
- PT: Lisboa
- EN: Lisbon
- FR: Lisbonne

### tz.next
- PT: +1 dia
- EN: +1 day
- FR: +1 jour

### tz.prev
- PT: −1 dia
- EN: −1 day
- FR: −1 jour

### slot.day
- PT: Escolha um dia
- EN: Choose a day
- FR: Choisissez un jour

### slot.time
- PT: Escolha até três horas
- EN: Choose up to three times
- FR: Choisissez jusqu'à trois horaires

### slot.picked
- PT: As suas horas
- EN: Your times
- FR: Vos horaires

### slot.none
- PT: Ainda não escolheu uma hora.
- EN: No time chosen yet.
- FR: Aucun horaire choisi pour l'instant.

### slot.remove
- PT: Retirar
- EN: Remove
- FR: Retirer
### slot.kept
- PT: Guardámos as horas que escolheu.
- EN: We kept the times you chose.
- FR: Nous avons gardé les horaires choisis.

### reach
- PT: Como chegamos até si?
- EN: How do we reach you?
- FR: Comment vous joindre ?

### lang
- PT: Língua da chamada
- EN: Language of the call
- FR: Langue de l'appel

### send
- PT: Marcar a chamada
- EN: Book the call
- FR: Réserver l'appel

### send.later
- PT: Enviar
- EN: Send
- FR: Envoyer

### notice
- PT: O seu pedido segue para a Imóveis Portugal e para um consultor qualificado, que confirma a hora por email e lhe liga.
- EN: Your request goes to Imóveis Portugal and to a qualified advisor, who confirms the time by email and calls you.
- FR: Votre demande part chez Imóveis Portugal et chez un conseiller qualifié, qui confirme l'heure par e-mail et vous appelle.

### notice.later
- PT: O seu pedido segue para a Imóveis Portugal e para um consultor qualificado, que lhe escreve por email para combinar a hora.
- EN: Your request goes to Imóveis Portugal and to a qualified advisor, who emails you to agree on a time.
- FR: Votre demande part chez Imóveis Portugal et chez un conseiller qualifié, qui vous écrit par e-mail pour convenir d'une heure.

### phone
- PT: Telefone
- EN: Phone
- FR: Téléphone

### email
- PT: Email
- EN: Email
- FR: E-mail
### req
- PT: obrigatório
- EN: required
- FR: obligatoire
### cc
- PT: Indicativo do país
- EN: Country code
- FR: Indicatif du pays

### err.name
- PT: Indique o seu nome.
- EN: Enter your name.
- FR: Indiquez votre nom.

### err.email
- PT: Indique o seu email.
- EN: Enter your email.
- FR: Indiquez votre e-mail.

### err.phone
- PT: Indique um telefone: o consultor liga para este número.
- EN: Enter a phone number: the advisor calls you on it.
- FR: Indiquez un téléphone : le conseiller vous appelle à ce numéro.

### err.phone.bad
- PT: Este número parece incompleto.
- EN: This number looks incomplete.
- FR: Ce numéro semble incomplet.

### place
- PT: Onde, em Portugal? Até três sítios.
- EN: Where in Portugal? Up to three places.
- FR: Où, au Portugal ? Jusqu'à trois lieux.

### place.ph
- PT: Ex.: Gondomar, Vila do Conde
- EN: e.g. Gondomar, Vila do Conde
- FR: Ex. : Gondomar, Vila do Conde

### done.h
- PT: Marcado.
- EN: Booked.
- FR: Réservé.

### done.h.later
- PT: Enviado.
- EN: Sent.
- FR: Envoyé.

### done.p
- PT: Um consultor qualificado confirma a hora por email e liga-lhe a essa hora.
- EN: A qualified advisor confirms the time by email, then calls you at that time.
- FR: Un conseiller qualifié confirme l'heure par e-mail, puis vous appelle à cette heure-là.

### done.p.later
- PT: Um consultor qualificado escreve-lhe por email para combinar a hora.
- EN: A qualified advisor emails you to agree on a time.
- FR: Un conseiller qualifié vous écrit par e-mail pour convenir d'une heure.

### done.times
- PT: As horas que escolheu
- EN: The times you chose
- FR: Les horaires que vous avez choisis

### prep
- PT: Ajude o consultor a preparar a chamada (30 s)
- EN: Help the advisor prepare the call (30 s)
- FR: Aidez le conseiller à préparer l'appel (30 s)

### prep.p
- PT: Cinco perguntas, todas opcionais.
- EN: Five questions, all optional.
- FR: Cinq questions, toutes facultatives.

### prep.send
- PT: Enviar ao consultor
- EN: Send to the advisor
- FR: Envoyer au conseiller

### prep.done.h
- PT: Obrigado. O consultor já tem tudo.
- EN: Thank you. The advisor has it all.
- FR: Merci. Le conseiller a tout en main.

### prep.intent
- PT: Preparação da chamada
- EN: Preparation for the call
- FR: Préparation de l'appel

### imt.line
- PT: IMT de {price}: {imt} se não for residente fiscal.
- EN: IMT on {price}: {imt} if you are not a tax resident.
- FR: IMT sur {price} : {imt} si vous n'êtes pas résident fiscal.

### imt.how
- PT: Como se calcula
- EN: How it works
- FR: Comment il se calcule

### imt.map
- PT: IMT a {price}? {imt} sem residência fiscal.
- EN: IMT at {price}? {imt} as a non-resident.
- FR: L'IMT à {price} ? {imt} pour un non-résident.
### total.nr
- PT: não residente, sem crédito
- EN: non-resident, no mortgage
- FR: non-résident, sans crédit

### imt.title
- PT: O IMT, explicado
- EN: IMT, explained
- FR: L'IMT, expliqué

### imt.h
- PT: O IMT de uma casa de {price}
- EN: IMT on a {price} home
- FR: L'IMT d'un logement à {price}

### imt.what
- PT: O imposto municipal sobre as transmissões, pago antes da escritura.
- EN: The property transfer tax, paid before the deed.
- FR: L'impôt sur les transmissions immobilières, payé avant l'acte.

### imt.price
- PT: Preço
- EN: Price
- FR: Prix

### imt.nr.k
- PT: Sem residência fiscal em Portugal
- EN: Not a Portuguese tax resident
- FR: Non-résident fiscal au Portugal

### imt.nr.p
- PT: 7,5% do preço, sem isenção nem redução.
- EN: 7.5% of the price, with no exemption or reduction.
- FR: 7,5 % du prix, sans exonération ni réduction.

### imt.back.k
- PT: Duas formas de recuperar a diferença
- EN: Two ways to get the difference back
- FR: Deux façons de récupérer la différence

### imt.back.1
- PT: Passa a residente fiscal em Portugal nos 2 anos seguintes à compra.
- EN: You become a Portuguese tax resident within 2 years of the purchase.
- FR: Vous devenez résident fiscal au Portugal dans les 2 ans qui suivent l'achat.

### imt.back.2
- PT: Arrenda a casa para habitação nos 6 meses seguintes, durante pelo menos 36 meses nos primeiros 5 anos, com renda dentro dos limites legais.
- EN: You let the home as a residence within 6 months, for at least 36 months in the first 5 years, at a rent within the legal caps.
- FR: Vous louez le logement comme résidence dans les 6 mois, pendant au moins 36 mois sur les 5 premières années, à un loyer dans les plafonds légaux.

### imt.back.p
- PT: Nos dois casos, paga primeiro os 7,5%. Depois tem 6 meses para pedir a diferença às Finanças (AT), a contar de quando passa a residente ou assina o arrendamento.
- EN: In both cases you pay 7.5% first. Then you have 6 months to ask the tax office (AT) for the difference, counted from when you become resident or sign the lease.
- FR: Dans les deux cas, vous payez d'abord 7,5 %. Vous avez ensuite 6 mois pour demander la différence au fisc portugais (AT), à compter de votre installation comme résident ou de la signature du bail.

### imt.res.k
- PT: Residente fiscal, habitação própria e permanente
- EN: Tax resident, primary home
- FR: Résident fiscal, résidence principale

### imt.res.p
- PT: Por escalões: a parte até ao limite do escalão anterior paga a taxa média desse limite, o resto paga a taxa marginal.
- EN: By bracket: the part up to the previous bracket's limit pays the average rate at that limit, the rest pays the marginal rate.
- FR: Par tranches : la part jusqu'au plafond de la tranche précédente paie le taux moyen de ce plafond, le reste paie le taux marginal.

### imt.res.yours
- PT: A {price}: {a} sobre os primeiros {top}, mais {rate} sobre {rest}, {b}.
- EN: At {price}: {a} on the first {top}, plus {rate} of {rest}, {b}.
- FR: À {price} : {a} sur les premiers {top}, plus {rate} de {rest}, soit {b}.

### imt.res.flat
- PT: A {price}: {rate} sobre todo o valor.
- EN: At {price}: {rate} of the whole price.
- FR: À {price} : {rate} sur la totalité du prix.

### imt.col.to
- PT: Até
- EN: Up to
- FR: Jusqu'à

### imt.col.rate
- PT: Taxa marginal
- EN: Marginal rate
- FR: Taux marginal

### imt.col.flat
- PT: {rate} sobre todo o valor
- EN: {rate} of the whole price
- FR: {rate} sur la totalité

### imt.col.above
- PT: Acima de {v}
- EN: Above {v}
- FR: Au-delà de {v}

### imt.more.k
- PT: Mais uma coisa
- EN: One more thing
- FR: Encore une chose

### imt.more
- PT: A {price}, paga {nr} na compra. Se passar a residente nos 2 anos seguintes e for a sua habitação própria e permanente, o IMT é de {res}: pode pedir {back} de volta.
- EN: At {price}, you pay {nr} at purchase. If you move to Portugal within 2 years and make it your primary home, the IMT is {res}: you can ask for {back} back.
- FR: À {price}, vous payez {nr} à l'achat. Si vous devenez résident dans les 2 ans et en faites votre résidence principale, l'IMT est de {res} : vous pouvez demander {back} en retour.

### imt.more.none
- PT: Acima de {top}, os residentes também pagam 7,5%: não há diferença a devolver.
- EN: Above {top}, residents also pay 7.5%: there is no difference to refund.
- FR: Au-delà de {top}, les résidents paient aussi 7,5 % : il n'y a pas de différence à rembourser.

### imt.more.if
- PT: Se não passar a residente nem arrendar a casa por longo prazo, nada é devolvido.
- EN: If you neither move there nor let it long-term, nothing comes back.
- FR: Si vous ne vous installez pas et ne louez pas à long terme, rien n'est remboursé.

### imt.nr.who
- PT: Conta a residência fiscal, não a nacionalidade.
- EN: What counts is tax residency, not nationality.
- FR: C'est la résidence fiscale qui compte, pas la nationalité.

### imt.other
- PT: Outras exceções, nas perguntas frequentes
- EN: Other exceptions, in the FAQ
- FR: Autres exceptions, dans les questions fréquentes

### imt.how.k
- PT: Como se calcula
- EN: How it's worked out
- FR: Comment c'est calculé

### imt.refs
- PT: Referências legais
- EN: Legal references
- FR: Références légales

### imt.sim
- PT: Se passar a residente fiscal nos 2 anos seguintes, pode pedir {back} de volta.
- EN: If you become a tax resident within 2 years, you can ask for {back} back.
- FR: Si vous devenez résident fiscal dans les 2 ans, vous pouvez demander {back} en retour.

### imt.src.k
- PT: Fontes
- EN: Sources
- FR: Sources

### imt.src.checked
- PT: consultado a {d}
- EN: checked {d}
- FR: consulté le {d}

### imt.disc
- PT: Informação, não aconselhamento fiscal. Taxas em vigor em 2026.
- EN: Information, not tax advice. Rates in force in 2026.
- FR: Information, pas un conseil fiscal. Taux en vigueur en 2026.

### imt.calc
- PT: Abrir o simulador completo
- EN: Open the full calculator
- FR: Ouvrir le simulateur complet

### imt.open
- PT: Como se calcula o IMT
- EN: How IMT is calculated
- FR: Comment l'IMT est calculé

## cv

Prompt 74 (4 Nov 2026): the buyer profile that builds itself (D54, D79). Functional register (content/METHOD.md, "Two registers"). The confirmation card "O seu perfil de comprador" (site/src/scripts/cvcard.ts), the line on the Concierge's last step, and the one-page summary (site/src/components/ProfilePage.astro). The data stays on the reader's device (site/src/lib/cv.ts) until a request is sent.

### h
- PT: O seu perfil de comprador
- EN: Your buyer profile
- FR: Votre profil d'acheteur

### pct
- PT: Perfil {n}%
- EN: Profile {n}%
- FR: Profil {n} %

### k.country
- PT: Vive em
- EN: Lives in
- FR: Réside

### k.budget
- PT: Orçamento
- EN: Budget
- FR: Budget

### k.use
- PT: Uso
- EN: Use
- FR: Usage

### k.fin
- PT: Financiamento
- EN: Financing
- FR: Financement

### k.total
- PT: Custo total
- EN: Total cost
- FR: Coût total

### k.timeline
- PT: Comprar
- EN: Buying
- FR: Achat

### k.nif
- PT: NIF
- EN: NIF
- FR: NIF

### k.resident
- PT: Residente em Portugal
- EN: Moving to Portugal
- FR: Résident au Portugal

### k.interest
- PT: Interesse
- EN: Interested in
- FR: Intérêt

### k.time
- PT: Tempo no mapa
- EN: Time on the map
- FR: Temps sur la carte

### fin.cash
- PT: Sem crédito
- EN: No mortgage
- FR: Sans crédit

### fin.loan
- PT: Com crédito
- EN: With a mortgage
- FR: Avec crédit

### fin.loan.p
- PT: Com crédito, entrada {p}%
- EN: With a mortgage, {p}% down
- FR: Avec crédit, apport {p} %

### timeline.6
- PT: < 6 meses
- EN: < 6 months
- FR: < 6 mois

### timeline.12
- PT: 6–12 meses
- EN: 6–12 months
- FR: 6–12 mois

### timeline.later
- PT: Mais tarde
- EN: Later
- FR: Plus tard

### nif.yes
- PT: Sim
- EN: Yes
- FR: Oui

### nif.no
- PT: Ainda não
- EN: Not yet
- FR: Pas encore

### resident.yes
- PT: Sim
- EN: Yes
- FR: Oui

### resident.no
- PT: Não
- EN: No
- FR: Non

### resident.maybe
- PT: Talvez
- EN: Maybe
- FR: Peut-être

### q.timeline
- PT: Quando quer comprar?
- EN: When do you want to buy?
- FR: Quand voulez-vous acheter ?

### q.nif
- PT: Já tem NIF?
- EN: Do you have a NIF?
- FR: Avez-vous un NIF ?

### q.resident
- PT: Pensa passar a residente em Portugal?
- EN: Do you plan to become a resident in Portugal?
- FR: Pensez-vous devenir résident au Portugal ?

### refund
- PT: Se sim: {v} de IMT de volta.
- EN: If yes: {v} of IMT back.
- FR: Si oui : {v} d'IMT remboursés.

### src.edition
- PT: edição
- EN: edition
- FR: édition

### src.simulator
- PT: simulador
- EN: simulator
- FR: simulateur

### src.map
- PT: mapa
- EN: map
- FR: carte

### src.concierge
- PT: Concierge
- EN: Concierge
- FR: Concierge

### src.answers
- PT: respostas
- EN: answers
- FR: réponses

### src.favorites
- PT: favoritos
- EN: favorites
- FR: favoris

### src.mare
- PT: Maré
- EN: Maré
- FR: Maré

### edit
- PT: Alterar
- EN: Change
- FR: Modifier

### place.ph
- PT: Outro sítio
- EN: Another place
- FR: Autre lieu

### place.add
- PT: Juntar
- EN: Add
- FR: Ajouter

### remove
- PT: Retirar
- EN: Remove
- FR: Retirer

### ready
- PT: Pronto
- EN: Done
- FR: Terminé

### sending
- PT: A enviar…
- EN: Sending…
- FR: Envoi…

### sent
- PT: O consultor já tem o seu perfil.
- EN: The advisor has your profile.
- FR: Le conseiller a votre profil.

### failed
- PT: Não foi possível enviar. O consultor recebeu o perfil com o pedido.
- EN: Could not send. The advisor got the profile with your request.
- FR: Envoi impossible. Le conseiller a reçu le profil avec la demande.

### consent
- PT: Partilhar este perfil com {dev}, promotor de {name}.
- EN: Share this profile with {dev}, the developer of {name}.
- FR: Partager ce profil avec {dev}, promoteur de {name}.

### summary
- PT: Abrir o resumo (PDF)
- EN: Open the summary (PDF)
- FR: Ouvrir le résumé (PDF)

### intent
- PT: Perfil do comprador
- EN: Buyer profile
- FR: Profil de l'acheteur

### goes
- PT: Segue com o pedido: {list}.
- EN: Goes with the request: {list}.
- FR: Joint à la demande : {list}.

### page.title
- PT: O meu perfil de comprador
- EN: My buyer profile
- FR: Mon profil d'acheteur

### page.lede
- PT: Para levar ao banco ou ao advogado.
- EN: To take to your bank or lawyer.
- FR: À montrer à votre banque ou à votre avocat.

### page.costs
- PT: Custos da compra
- EN: Purchase costs
- FR: Frais d'achat

### page.price
- PT: Preço
- EN: Price
- FR: Prix

### page.imt
- PT: IMT (não residente)
- EN: IMT (non-resident)
- FR: IMT (non-résident)

### page.imt.res
- PT: IMT (habitação própria)
- EN: IMT (own home)
- FR: IMT (résidence principale)

### page.is
- PT: Imposto do selo
- EN: Stamp duty
- FR: Droit de timbre

### page.deed
- PT: Escritura e registo
- EN: Deed and registration
- FR: Acte et enregistrement

### page.total
- PT: Total
- EN: Total
- FR: Total

### page.short
- PT: Lista curta
- EN: Shortlist
- FR: Sélection

### page.print
- PT: Guardar como PDF
- EN: Save as PDF
- FR: Enregistrer en PDF

### page.empty
- PT: Ainda não há perfil neste dispositivo.
- EN: No profile on this device yet.
- FR: Pas encore de profil sur cet appareil.

### page.empty.a
- PT: Abrir o simulador
- EN: Open the calculator
- FR: Ouvrir le simulateur

### page.made
- PT: Feito neste dispositivo a {d}.
- EN: Made on this device on {d}.
- FR: Établi sur cet appareil le {d}.

### page.clear
- PT: Apagar este perfil do dispositivo
- EN: Delete this profile from this device
- FR: Effacer ce profil de cet appareil

### page.note
- PT: Indicativo, com as regras de 2026: não é uma avaliação de crédito nem aconselhamento fiscal.
- EN: Indicative, under the 2026 rules: not a credit assessment or tax advice.
- FR: Indicatif, règles 2026 : ni évaluation de crédit ni conseil fiscal.

## p71

Prompt 71 (4 Nov 2026), US edition, English only: "Closer than you think" (site/src/pages/en/us/closer-than-you-think.astro, site/src/lib/closer.ts) and the south-coast arrival on the US map (site/src/components/MapV3.astro, site/src/scripts/map-v3.ts). Feel: "Portugal is closer than California." The PT and FR lines repeat the English: these blocks are only shown on the US edition, in English (the parity check needs all three lines). Figures and their sources: content/facts/facts.csv and content/facts/flights/SOURCES.md.

### title
- PT: Closer than you think
- EN: Closer than you think
- FR: Closer than you think

### desc
- PT: From New York, Lisbon is about half an hour further than Los Angeles. Every nonstop from the US to Portugal, with its airline and season.
- EN: From New York, Lisbon is about half an hour further than Los Angeles. Every nonstop from the US to Portugal, with its airline and season.
- FR: From New York, Lisbon is about half an hour further than Los Angeles. Every nonstop from the US to Portugal, with its airline and season.

### kick
- PT: From {city}
- EN: From {city}
- FR: From {city}

### hero.n
- PT: {n} min
- EN: {n} min
- FR: {n} min

### hero.more
- PT: Lisbon is {n} minutes further than {dom}.
- EN: Lisbon is {n} minutes further than {dom}.
- FR: Lisbon is {n} minutes further than {dom}.

### hero.less
- PT: Lisbon is {n} minutes closer than {dom}.
- EN: Lisbon is {n} minutes closer than {dom}.
- FR: Lisbon is {n} minutes closer than {dom}.

### pick
- PT: Your city
- EN: Your city
- FR: Your city

### to
- PT: {from} to {to}
- EN: {from} to {to}
- FR: {from} to {to}

### nonstop
- PT: Nonstop to {to} with {airline}, {season}.
- EN: Nonstop to {to} with {airline}, {season}.
- FR: Nonstop to {to} with {airline}, {season}.

### tz
- PT: Lisbon is {h} hours ahead of {city}.
- EN: Lisbon is {h} hours ahead of {city}.
- FR: Lisbon is {h} hours ahead of {city}.

### now
- PT: Now: {t} in {city}, {t2} in Lisbon.
- EN: Now: {t} in {city}, {t2} in Lisbon.
- FR: Now: {t} in {city}, {t2} in Lisbon.

### night.h
- PT: Leave after dinner, land for breakfast.
- EN: Leave after dinner, land for breakfast.
- FR: Leave after dinner, land for breakfast.

### night.l
- PT: {dep} from {city}, {arr} in {to}, with {airline}.
- EN: {dep} from {city}, {arr} in {to}, with {airline}.
- FR: {dep} from {city}, {arr} in {to}, with {airline}.

### routes.h
- PT: Every nonstop from the US
- EN: Every nonstop from the US
- FR: Every nonstop from the US

### routes.n
- PT: {n} routes, {a} airlines, flown in 2026.
- EN: {n} routes, {a} airlines, flown in 2026.
- FR: {n} routes, {a} airlines, flown in 2026.

### card.h
- PT: The card
- EN: The card
- FR: The card

### card.dl
- PT: Save the card
- EN: Save the card
- FR: Save the card

### card.more
- PT: further to {to} than to {dom}.
- EN: further to {to} than to {dom}.
- FR: further to {to} than to {dom}.

### card.less
- PT: closer to {to} than to {dom}.
- EN: closer to {to} than to {dom}.
- FR: closer to {to} than to {dom}.

### card.foot
- PT: Average time gate to gate, Jan to Jul 2026. US Department of Transportation.
- EN: Average time gate to gate, Jan to Jul 2026. US Department of Transportation.
- FR: Average time gate to gate, Jan to Jul 2026. US Department of Transportation.

### note
- PT: Times are the average gate to gate, January to July 2026, as the airlines report them to the US Department of Transportation. Seasons are the months flown in 2025 and 2026.
- EN: Times are the average gate to gate, January to July 2026, as the airlines report them to the US Department of Transportation. Seasons are the months flown in 2025 and 2026.
- FR: Times are the average gate to gate, January to July 2026, as the airlines report them to the US Department of Transportation. Seasons are the months flown in 2025 and 2026.

### next
- PT: The south coast, on the map
- EN: The south coast, on the map
- FR: The south coast, on the map

### sources
- PT: Sources
- EN: Sources
- FR: Sources

### south.chip
- PT: The south coast
- EN: The south coast
- FR: The south coast

### south.k
- PT: Stop {i} of {n}
- EN: Stop {i} of {n}
- FR: Stop {i} of {n}

### south.dist
- PT: {h} from Lisbon · {mi} mi
- EN: {h} from Lisbon · {mi} mi
- FR: {h} from Lisbon · {mi} mi

### south.next
- PT: Next: {name}
- EN: Next: {name}
- FR: Next: {name}

### south.golf
- PT: Every golf course
- EN: Every golf course
- FR: Every golf course

### south.sines.line
- PT: Microsoft's largest investment in Portugal is going in here.
- EN: Microsoft's largest investment in Portugal is going in here.
- FR: Microsoft's largest investment in Portugal is going in here.

### south.sines.num
- PT: $10B+
- EN: $10B+
- FR: $10B+

### south.sines.lab
- PT: for AI infrastructure, from 2026
- EN: for AI infrastructure, from 2026
- FR: for AI infrastructure, from 2026

### south.comporta.line
- PT: Rice fields and pine woods behind the dunes, south of Lisbon.
- EN: Rice fields and pine woods behind the dunes, south of Lisbon.
- FR: Rice fields and pine woods behind the dunes, south of Lisbon.

### south.comporta.num
- PT: {n}
- EN: {n}
- FR: {n}

### south.comporta.lab
- PT: golf courses from Tróia to Melides
- EN: golf courses from Tróia to Melides
- FR: golf courses from Tróia to Melides

### south.algarve.line
- PT: The golf coast, from Vilamoura to Lagos.
- EN: The golf coast, from Vilamoura to Lagos.
- FR: The golf coast, from Vilamoura to Lagos.

### south.algarve.num
- PT: {n}
- EN: {n}
- FR: {n}

### south.algarve.lab
- PT: golf courses on the Algarve coast
- EN: golf courses on the Algarve coast
- FR: golf courses on the Algarve coast

### south.algarve.marina
- PT: Vilamoura: Portugal's largest marina, {n} berths.
- EN: Vilamoura: Portugal's largest marina, {n} berths.
- FR: Vilamoura: Portugal's largest marina, {n} berths.

### south.algarve.beach
- PT: Praia da Falésia: Tripadvisor's best beach in the world, 2024.
- EN: Praia da Falésia: Tripadvisor's best beach in the world, 2024.
- FR: Praia da Falésia: Tripadvisor's best beach in the world, 2024.

### night.ls
- PT: {dep} from {city}, {arr} in {to}, with {airline}, {season}.
- EN: {dep} from {city}, {arr} in {to}, with {airline}, {season}.
- FR: {dep} from {city}, {arr} in {to}, with {airline}, {season}.

### hero.h
- PT: {h} h
- EN: {h} h
- FR: {h} h

### hero.nonstop
- PT: ahead, in Lisbon. {airline} flies there nonstop, {season}.
- EN: ahead, in Lisbon. {airline} flies there nonstop, {season}.
- FR: ahead, in Lisbon. {airline} flies there nonstop, {season}.

## p78

Prompt 78 (4 Nov 2026): golf mode on the map (site/src/scripts/golf-mode.ts). Functional copy is plain (content/METHOD.md, "Two registers"); course and development names are set in Playfair italic by the page, never in the copy.

### toggle
- PT: Golfe
- EN: Golf
- FR: Golf

### toggle.aria
- PT: Modo golfe
- EN: Golf mode
- FR: Mode golf

### tag
- PT: Seleção
- EN: Our pick
- FR: Sélection

### holes
- PT: {n} buracos
- EN: {n} holes
- FR: {n} trous

### courses
- PT: {n} campos
- EN: {n} courses
- FR: {n} parcours

### door.h
- PT: Da sua porta
- EN: From your door
- FR: De votre porte

### door.car
- PT: de carro
- EN: by car
- FR: en voiture

### door.tee
- PT: {name}, primeiro tee
- EN: {name}, first tee
- FR: {name}, premier départ

### min
- PT: {v} min
- EN: {v} min
- FR: {v} min

### near
- PT: de carro, desde {name}
- EN: by car from {name}
- FR: en voiture depuis {name}

### next
- PT: Ao lado do {name}
- EN: Next to {name}
- FR: À côté de {name}

### door.next
- PT: Ao lado
- EN: Next door
- FR: À côté

### mark
- PT: Gerido pela Details
- EN: Managed by Details
- FR: Géré par Details

### private
- PT: Clube privado de sócios
- EN: Private members' club
- FR: Club privé de membres

### algarve
- PT: {n} no Algarve
- EN: {n} in the Algarve
- FR: {n} en Algarve

### src.details
- PT: Comunicado da Details (via IAGTO)
- EN: Details press release (via IAGTO)
- FR: Communiqué de Details (via IAGTO)

### reset
- PT: Voltar a Vilamoura
- EN: Back to Vilamoura
- FR: Retour à Vilamoura

### site
- PT: Site do campo
- EN: Course site
- FR: Site du parcours

### homes
- PT: As casas
- EN: The homes
- FR: Les logements

### year.k
- PT: Em 2027
- EN: In 2027
- FR: En 2027

### year.pga
- PT: PGA Tour Champions no The Els Club, 30 jul.–1 ago.
- EN: PGA Tour Champions at The Els Club, 30 Jul–1 Aug
- FR: PGA Tour Champions à The Els Club, 30 juil.–1er août

### year.f1
- PT: Fórmula 1 em Portimão, 18–20 jun.
- EN: Formula 1 at Portimão, 18–20 June
- FR: Formule 1 à Portimão, 18–20 juin

### src.drive
- PT: Tempo de carro: OSRM, dados OpenStreetMap, sem trânsito, {d}
- EN: Drive time: OSRM, OpenStreetMap data, no traffic, {d}
- FR: Temps de trajet : OSRM, données OpenStreetMap, sans trafic, {d}

### src.outline
- PT: Contornos dos campos: OpenStreetMap
- EN: Course outlines: OpenStreetMap
- FR: Contours des parcours : OpenStreetMap

### flags
- PT: {n} campos de golfe
- EN: {n} golf courses
- FR: {n} parcours de golf

### courses.near
- PT: Campos perto desta casa
- EN: Courses near this home
- FR: Parcours près de ce logement

### north
- PT: Norte para cima
- EN: North up
- FR: Nord en haut

## film

### pause
- PT: Pausar o filme
- EN: Pause the film
- FR: Mettre le film en pause

### play
- PT: Ver o filme
- EN: Play the film
- FR: Lire le film
