# Copy deck

Every text on the site, by page and block, in Portuguese (Portugal), English (American) and French (prompt 10). The site reads this file at build time: edit a line here, push, and the page changes. Voice: content/VOICE.md. Terms: content/GLOSSARY.md.

How to edit:
1. Change only the text after `PT:`, `EN:` or `FR:`. Keep the `##` page and `###` block names: the site looks them up.
2. Words in curly brackets are filled in by the site: `{agency}`, `{ami}`, `{email}`, `{n}`, `{left}`, `{total}`, `{country}`, `{date}` and the legal placeholders. Keep them.
3. Blocks ending in `.lu`, `.fr`, `.ch`, `.br`, `.us`, `.il` belong to one edition.
4. Not in this file: the FAQ questions and answers (content/faq/*.yaml), the disclaimers (content/EDITORIAL_POLICY.md), the report text (site/ebooks/), and figures and their sources (content/facts/facts.csv).

## common

### nav.faq
- PT: Perguntas
- EN: FAQ
- FR: Questions

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
- FR: Partenaires

### nav.how
- PT: Como trabalhamos
- EN: How we work
- FR: Notre méthode

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
- PT: Este formulário está a ser preparado. Entretanto, escreva-nos para {email}.
- EN: This form is being set up. In the meantime, write to us at {email}.
- FR: Ce formulaire est en cours de préparation. En attendant, écrivez-nous à {email}.

### trust.1.h
- PT: Agência parceira licenciada
- EN: Licensed partner agency
- FR: Agence partenaire agréée

### trust.1.p
- PT: {agency}, AMI {ami}. Patrocinador.
- EN: {agency}, AMI license {ami}. Sponsor.
- FR: {agency}, licence AMI {ami}. Sponsor.

### trust.2.h
- PT: Fontes oficiais
- EN: Official sources
- FR: Sources officielles

### trust.2.p
- PT: Cada número traz a fonte e a data em que a verificámos.
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
- PT: Para quem vive lá fora e tem Portugal no coração.
- EN: For people who live abroad with Portugal at heart.
- FR: Pour ceux qui vivent à l'étranger, le Portugal au cœur.

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

### foot.agency
- PT: Agência parceira
- EN: Partner agency
- FR: Agence partenaire

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
- PT: de IMT desde maio de 2026 para quem compra sem ser residente fiscal em Portugal, salvo exceções.
- EN: transfer tax (IMT) since May 2026 for buyers who aren't Portuguese tax residents, with some exceptions.
- FR: d'IMT depuis mai 2026 pour les acheteurs non-résidents fiscaux au Portugal, sauf exceptions.

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

### place.lu
- PT: Telhados de Alfama, Lisboa
- EN: Alfama rooftops, Lisbon
- FR: Toits de l'Alfama, Lisbonne

### place.fr
- PT: Ribeira, Porto
- EN: Ribeira, Porto
- FR: La Ribeira, Porto

### place.ch
- PT: Baixa e Castelo de São Jorge, Lisboa
- EN: Baixa and São Jorge Castle, Lisbon
- FR: Baixa et château Saint-Georges, Lisbonne

### place.br
- PT: Praça do Comércio, Lisboa
- EN: Praça do Comércio, Lisbon
- FR: Praça do Comércio, Lisbonne

### place.us
- PT: O Douro ao fim da tarde, Porto
- EN: The Douro at sunset, Porto
- FR: Le Douro au coucher du soleil, Porto

### place.il
- PT: Alfama e São Vicente de Fora, Lisboa
- EN: Alfama and São Vicente de Fora, Lisbon
- FR: Alfama et São Vicente de Fora, Lisbonne

## home

### hero.lu
- PT: Do Luxemburgo à sua casa em Portugal.
- EN: From Luxembourg to your home in Portugal.
- FR: Du Luxembourg à votre maison au Portugal.

### hero.fr
- PT: De França à sua casa em Portugal.
- EN: From France to your home in Portugal.
- FR: De France à votre maison au Portugal.

### hero.ch
- PT: Da Suíça à sua casa em Portugal.
- EN: From Switzerland to your home in Portugal.
- FR: De Suisse à votre maison au Portugal.

### hero.br
- PT: Do Brasil à sua casa em Portugal.
- EN: From Brazil to your home in Portugal.
- FR: Du Brésil à votre maison au Portugal.

### hero.us
- PT: Dos Estados Unidos à sua casa em Portugal.
- EN: From America to your home in Portugal.
- FR: Des États-Unis à votre maison au Portugal.

### hero.il
- PT: De Israel à sua casa em Portugal.
- EN: From Israel to your home in Portugal.
- FR: D'Israël à votre maison au Portugal.

### lede
- PT: Uma newsletter gratuita, todas as semanas: casas escolhidas, contas feitas e as regras com a fonte oficial. Primeiro número a 1 de dezembro.
- EN: A free newsletter every week: hand-picked homes, the real numbers, and the rules with their official sources. First issue December 1.
- FR: Une newsletter gratuite chaque semaine : des biens choisis, les vrais chiffres et les règles avec leur source officielle. Premier numéro le 1er décembre.

### signup.h
- PT: Receba a newsletter
- EN: Get the newsletter
- FR: Recevez la newsletter

### signup.note
- PT: Grátis. Cancela com um clique.
- EN: Free. Unsubscribe in one click.
- FR: Gratuit. Désinscription en un clic.

### proof
- PT: Fontes oficiais · Agência parceira AMI {ami} · Patrocínios identificados
- EN: Official sources · Partner agency AMI {ami} · Sponsors labeled
- FR: Sources officielles · Agence partenaire AMI {ami} · Sponsors signalés

### figs.label
- PT: Em números
- EN: By the numbers
- FR: En chiffres

### figs.h
- PT: Três números antes de comprar
- EN: Three numbers before you buy
- FR: Trois chiffres avant d'acheter

### fig.nonres
- PT: de IMT para quem compra sem ser residente fiscal em Portugal, desde maio de 2026, salvo exceções.
- EN: transfer tax (IMT) for buyers who aren't Portuguese tax residents, since May 2026, with some exceptions.
- FR: d'IMT pour les acheteurs non-résidents fiscaux au Portugal, depuis mai 2026, sauf exceptions.

### fig.stamp
- PT: de imposto do selo sobre o preço, a somar ao IMT.
- EN: stamp duty on the price, on top of the transfer tax.
- FR: de droit de timbre sur le prix, en plus de l'IMT.

### fig.ltv
- PT: do valor é o máximo que um banco empresta para uma casa que não seja a sua morada principal.
- EN: of the value is the most a bank can lend for a home that isn't your main residence.
- FR: de la valeur, c'est le maximum qu'une banque prête pour un bien qui n'est pas votre résidence principale.

### start.label
- PT: Comece aqui
- EN: Start here
- FR: Par où commencer

### start.h
- PT: Três passos para avançar
- EN: Three ways to start
- FR: Trois façons d'avancer

### card.faq.h
- PT: As suas perguntas
- EN: Your questions
- FR: Vos questions

### card.faq.p
- PT: As dúvidas que mais se pesquisam, respondidas em poucas linhas e com fonte.
- EN: The most-searched questions, answered in a few lines, with sources.
- FR: Les questions les plus recherchées, en quelques lignes et avec leurs sources.

### card.guide.h
- PT: O guia gratuito
- EN: The free guide
- FR: Le guide gratuit

### card.guide.p
- PT: Quanto custa mesmo comprar: impostos, crédito e contas feitas, em PDF.
- EN: What buying really costs: taxes, mortgages and worked examples, as a PDF.
- FR: Ce que coûte vraiment un achat : impôts, crédit et exemples chiffrés, en PDF.

### card.buy.h
- PT: Encontrar casa
- EN: Find a home
- FR: Trouver un bien

### card.buy.p
- PT: Diga-nos o que procura. A agência parceira contacta-o, sem custos para si.
- EN: Tell us what you're looking for. Our partner agency will reach out, free of charge.
- FR: Dites-nous ce que vous cherchez. L'agence partenaire vous contacte, sans frais.

### go
- PT: Abrir
- EN: Open
- FR: Ouvrir

### weekly.label
- PT: A newsletter
- EN: The newsletter
- FR: La newsletter

### weekly.h
- PT: Todas as semanas, na sua caixa
- EN: Every week, in your inbox
- FR: Chaque semaine, dans votre boîte

### weekly.1
- PT: Casas à venda, escolhidas por região e orçamento.
- EN: Homes for sale, picked by region and budget.
- FR: Des biens à vendre, choisis par région et par budget.

### weekly.2
- PT: O custo completo de cada compra: IMT, imposto do selo, escritura e registo.
- EN: The full cost of each purchase: transfer tax (IMT), stamp duty, deed and registration.
- FR: Le coût complet de chaque achat : IMT, droit de timbre, acte et enregistrement.

### weekly.3
- PT: Respostas de advogados e bancos parceiros e da nossa agência parceira, sempre identificadas.
- EN: Answers from partner lawyers, banks and our partner agency, always labeled.
- FR: Les réponses d'avocats et de banques partenaires et de notre agence partenaire, toujours signalées.

### partners.label
- PT: Para empresas
- EN: For businesses
- FR: Entreprises

### partners.h
- PT: Chegue a quem está a preparar a compra
- EN: Reach people getting ready to buy
- FR: Touchez ceux qui préparent leur achat

### partners.p
- PT: Advogados, bancos, consultores fiscais, transferências de dinheiro e promotores apresentam-se aos nossos leitores, sempre identificados como patrocinadores.
- EN: Lawyers, banks, tax advisors, money transfer services and developers can introduce themselves to our readers, always labeled as sponsors.
- FR: Avocats, banques, conseillers fiscaux, services de transfert et promoteurs se présentent à nos lecteurs, toujours signalés comme sponsors.

### partners.a
- PT: Ver condições para parceiros
- EN: See partner terms
- FR: Voir les conditions partenaires

## faq

### title
- PT: Como podemos ajudar?
- EN: How can we help?
- FR: Comment pouvons-nous vous aider ?

### lede
- PT: As perguntas que mais se fazem sobre comprar casa em Portugal a partir de fora. Respostas curtas, cada uma com a sua fonte oficial.
- EN: The questions people ask most about buying a home in Portugal from abroad. Short answers, each with its official source.
- FR: Les questions les plus posées sur l'achat d'un bien au Portugal depuis l'étranger. Des réponses courtes, chacune avec sa source officielle.

### search
- PT: Pesquisar: IMT, crédito, procuração…
- EN: Search: transfer tax, mortgage, power of attorney…
- FR: Rechercher : IMT, crédit, procuration…

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
- PT: Depois de comprar
- EN: After you buy
- FR: Après l'achat

### stage.after.p
- PT: Impostos anuais, arrendar e o que declarar.
- EN: Yearly taxes, renting out and what to report.
- FR: Impôts annuels, location et déclarations.

### none
- PT: Não encontrámos essa pergunta. Envie-a a um parceiro e recebe uma resposta para o seu caso.
- EN: We couldn't find that question. Send it to a partner and get an answer for your case.
- FR: Nous n'avons pas trouvé cette question. Posez-la à un partenaire pour une réponse adaptée à votre cas.

### updated
- PT: Fontes verificadas a {date}
- EN: Sources checked on {date}
- FR: Sources vérifiées le {date}

### cta.lawyer
- PT: Falar com um advogado
- EN: Talk to a lawyer
- FR: Parler à un avocat

### cta.bank
- PT: Falar com um banco
- EN: Talk to a bank
- FR: Parler à une banque

### cta.tax
- PT: Falar com um consultor fiscal
- EN: Talk to a tax advisor
- FR: Parler à un conseiller fiscal

### cta.fx
- PT: Falar sobre transferências
- EN: Talk about money transfers
- FR: Parler transferts d'argent

### cta.developer
- PT: Falar com um promotor
- EN: Talk to a developer
- FR: Parler à un promoteur

### cta.agency
- PT: Pedir à agência parceira
- EN: Ask our partner agency
- FR: Demander à l'agence partenaire

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

### title
- PT: Falar com um parceiro
- EN: Talk to a partner
- FR: Parler à un partenaire

### lede
- PT: Para o seu caso concreto, deixe-nos a pergunta e a categoria. Passamos o pedido a um parceiro dessa área.
- EN: For your own situation, leave us your question and the category. We'll pass it to a partner in that field.
- FR: Pour votre situation, laissez-nous votre question et la catégorie. Nous la transmettons à un partenaire du domaine.

### agency.p
- PT: A nossa agência parceira para comprar ou vender casa. Acompanha quem vive fora de Portugal: procura, visitas e negociação.
- EN: Our partner agency for buying or selling a home. It works with buyers who live outside Portugal: search, viewings and negotiation.
- FR: Notre agence partenaire pour acheter ou vendre un bien. Elle accompagne ceux qui vivent hors du Portugal : recherche, visites et négociation.

### cats.h
- PT: Escolha a categoria
- EN: Pick a category
- FR: Choisissez la catégorie

### launch
- PT: Os parceiros destas categorias chegam com o lançamento, a 1 de dezembro de 2026. Até lá, o seu pedido chega-nos por email e respondemos assim que houver parceiro.
- EN: Partners in these categories arrive at launch, on December 1, 2026. Until then, your request comes to us by email and we'll reply as soon as there's a partner.
- FR: Les partenaires de ces catégories arrivent au lancement, le 1er décembre 2026. D'ici là, votre demande nous parvient par e-mail et nous répondons dès qu'un partenaire est présent.

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
- EN: Mortgages for people who live abroad.
- FR: Crédit immobilier pour non-résidents.

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
- PT: Categoria, país onde vive, a sua pergunta e o seu consentimento. Usamos estes dados só para responder e, se o autorizar, para os passar a um parceiro da categoria.
- EN: Category, country you live in, your question and your consent. We use these details only to reply and, if you agree, to pass them to a partner in that category.
- FR: Catégorie, pays de résidence, votre question et votre consentement. Nous utilisons ces données uniquement pour répondre et, avec votre accord, pour les transmettre à un partenaire de la catégorie.

## guide

### title
- PT: Quanto custa mesmo comprar casa em Portugal
- EN: What it really costs to buy in Portugal
- FR: Ce que coûte vraiment un achat au Portugal

### label
- PT: Guia gratuito · PDF
- EN: Free guide · PDF
- FR: Guide gratuit · PDF

### lede
- PT: {n} páginas com as contas feitas para casas de 250 000 € e 400 000 €, e a fonte oficial de cada número.
- EN: {n} pages of worked numbers for homes at 250,000 € and 400,000 €, with the official source for every figure.
- FR: {n} pages d'exemples chiffrés pour des biens de 250 000 € et 400 000 €, avec la source officielle de chaque chiffre.

### download
- PT: Descarregar o guia (PDF)
- EN: Download the guide (PDF)
- FR: Télécharger le guide (PDF)

### inside.h
- PT: O que vai encontrar
- EN: What's inside
- FR: Au sommaire

### inside.1
- PT: Todos os impostos da compra em 2026, incluindo a taxa de IMT para não residentes e as exceções.
- EN: Every purchase tax in 2026, including the non-resident transfer tax rate and its exceptions.
- FR: Tous les impôts de l'achat en 2026, dont le taux d'IMT des non-résidents et ses exceptions.

### inside.2
- PT: Contas feitas como residente e como não residente, em quadro e em gráfico.
- EN: Worked examples as a resident and as a non-resident, in tables and charts.
- FR: Des exemples chiffrés en résident et en non-résident, en tableaux et en graphiques.

### inside.3
- PT: As regras do crédito, os impostos de todos os anos e uma lista para comprar à distância.
- EN: Mortgage rules, the yearly taxes and a checklist for buying from abroad.
- FR: Les règles de crédit, les impôts annuels et une liste de contrôle pour acheter à distance.

### inside.4
- PT: {country}: o representante fiscal e as regras verificadas do país onde vive.
- EN: {country}: the tax representative and the verified rules where you live.
- FR: {country} : le représentant fiscal et les règles vérifiées de votre pays.

### signup.h
- PT: Receba também a newsletter
- EN: Get the newsletter too
- FR: Recevez aussi la newsletter

## partners

### title
- PT: Para parceiros
- EN: For partners
- FR: Partenaires

### h1
- PT: Chegue a quem prepara a compra
- EN: Reach buyers before they buy
- FR: Touchez les acheteurs avant l'achat

### lede
- PT: Um guia semanal em seis edições (Luxemburgo, França, Suíça, Brasil, Estados Unidos e Israel), em português, inglês e francês. Lançamento a 1 de dezembro de 2026.
- EN: A weekly guide in six editions (Luxembourg, France, Switzerland, Brazil, the United States and Israel), in Portuguese, English and French. Launching December 1, 2026.
- FR: Un guide hebdomadaire en six éditions (Luxembourg, France, Suisse, Brésil, États-Unis, Israël), en portugais, anglais et français. Lancement le 1er décembre 2026.

### cta
- PT: Falemos 15 minutos
- EN: Let's talk for 15 minutes
- FR: Parlons 15 minutes

### founding.h
- PT: Parceiro fundador
- EN: Founding partner
- FR: Partenaire fondateur

### founding.p
- PT: 40% de desconto no primeiro ano e o mesmo preço garantido no segundo. Dez lugares, um parceiro por categoria.
- EN: 40% off the first year, with the same price locked in for the second. Ten places, one partner per category.
- FR: 40 % de remise la première année, et le même prix garanti la deuxième. Dix places, un partenaire par catégorie.

### slots
- PT: Lugares disponíveis: {left} de {total}
- EN: Places available: {left} of {total}
- FR: Places disponibles : {left} sur {total}

### readers.h
- PT: Quem nos lê
- EN: Who reads us
- FR: Nos lecteurs

### readers.p
- PT: Famílias portuguesas no Luxemburgo, em França e na Suíça que preparam a casa de férias, o regresso ou a reforma, e brasileiros, americanos e israelitas que preparam uma compra para viver, reformar-se ou investir. Leem porque têm um plano.
- EN: Portuguese families in Luxembourg, France and Switzerland planning a vacation home, a move back or retirement, and Brazilians, Americans and Israelis getting ready to buy to live, retire or invest. They read because they have a plan.
- FR: Des familles portugaises au Luxembourg, en France et en Suisse qui préparent une résidence secondaire, un retour ou leur retraite, et des Brésiliens, Américains et Israéliens qui préparent un achat pour s'installer ou investir. Ils lisent parce qu'ils ont un projet.

### whynow.p
- PT: Os parceiros fundadores aparecem desde o primeiro número, a 1 de dezembro, antes do Natal, quando muitas famílias emigradas estão em Portugal a ver casas.
- EN: Founding partners appear from the first issue on December 1, just before the holidays, when many families from abroad are in Portugal looking at homes.
- FR: Les partenaires fondateurs figurent dès le premier numéro, le 1er décembre, juste avant les fêtes, quand beaucoup de familles de l'étranger sont au Portugal et visitent des biens.

### packages.h
- PT: Pacotes
- EN: Packages
- FR: Formules

### founding.price
- PT: Preço fundador (ano 1)
- EN: Founding price (year 1)
- FR: Prix fondateur (année 1)

### list.price
- PT: Preço normal
- EN: Standard price
- FR: Prix normal

### per.year
- PT: / ano
- EN: / year
- FR: / an

### from
- PT: a partir de
- EN: from
- FR: à partir de

### gold.p
- PT: Exclusivo na sua categoria em todas as edições. Em todas as newsletters, um artigo patrocinado por mês em cada edição, uma coluna de perguntas e respostas e relatório mensal.
- EN: Category exclusivity across all editions. In every newsletter, one sponsored article a month per edition, a Q&A column and a monthly report.
- FR: Exclusivité de catégorie sur toutes les éditions. Dans chaque newsletter, un article sponsorisé par mois et par édition, une rubrique questions-réponses et un rapport mensuel.

### silver.p
- PT: Uma edição à escolha. Na newsletter de 15 em 15 dias, um artigo patrocinado por trimestre, entrada no diretório de parceiros e relatório mensal.
- EN: One edition of your choice. In the newsletter every two weeks, one sponsored article a quarter, a directory listing and a monthly report.
- FR: Une édition au choix. Dans la newsletter tous les quinze jours, un article sponsorisé par trimestre, une fiche dans l'annuaire et un rapport mensuel.

### bronze.p
- PT: Uma edição. Entrada com logótipo no diretório de parceiros e uma menção por mês na newsletter.
- EN: One edition. A directory listing with your logo and one mention a month in the newsletter.
- FR: Une édition. Une fiche avec logo dans l'annuaire et une mention par mois dans la newsletter.

### campaign.h
- PT: Campanha de empreendimento
- EN: Development campaign
- FR: Campagne promoteur

### campaign.p
- PT: Para promotores: um empreendimento em destaque nas edições escolhidas, com newsletter, artigo e redes sociais.
- EN: For developers: one project featured in the editions you choose, with newsletter, article and social media.
- FR: Pour les promoteurs : un programme mis en avant dans les éditions choisies, avec newsletter, article et réseaux sociaux.

### vat
- PT: Valores sem IVA.
- EN: Prices exclude VAT.
- FR: Prix hors TVA.

### agency.p
- PT: A nossa agência parceira e a única agência imobiliária da plataforma. Todos os pedidos de compra ou venda seguem para ela. Paga um patrocínio anual fixo, nunca uma comissão por contacto.
- EN: Our partner agency, and the only real-estate agency on the platform. Every request to buy or sell goes to it. It pays a flat yearly sponsorship, never a fee per lead.
- FR: Notre agence partenaire, et la seule agence immobilière de la plateforme. Toute demande d'achat ou de vente lui est transmise. Elle verse un parrainage annuel forfaitaire, jamais une commission par contact.

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
- PT: Cada parceiro paga um valor fixo, nunca uma comissão por contacto.
- EN: Every partner pays a flat fee, never a fee per lead.
- FR: Chaque partenaire paie un forfait, jamais une commission par contact.

### rules.4
- PT: Os pedidos de compra seguem só para a nossa agência parceira licenciada.
- EN: Buying requests go only to our licensed partner agency.
- FR: Les demandes d'achat vont uniquement à notre agence partenaire agréée.

### report.h
- PT: O que recebe todos os meses
- EN: What you get every month
- FR: Ce que vous recevez chaque mois

### report.p
- PT: Um relatório por edição: subscritores, aberturas, cliques e pedidos de contacto ligados à sua presença.
- EN: One report per edition: subscribers, opens, clicks and contact requests linked to your presence.
- FR: Un rapport par édition : abonnés, ouvertures, clics et demandes de contact liés à votre présence.

### book
- PT: Marcar chamada
- EN: Book a call
- FR: Réserver un appel

### form.intro
- PT: Deixe os seus dados: respondemos num dia útil.
- EN: Leave your details and we'll reply within one business day.
- FR: Laissez vos coordonnées : nous répondons sous un jour ouvré.

## buy

### title
- PT: Encontrar casa
- EN: Find a home
- FR: Trouver un bien

### h1
- PT: Diga-nos que casa procura
- EN: Tell us what home you want
- FR: Dites-nous quel bien vous cherchez

### lede
- PT: O seu pedido segue para a nossa agência parceira, a {agency} (AMI {ami}), mediadora imobiliária licenciada, que o contacta com opções. Não paga nada por isso.
- EN: Your request goes to our partner agency, {agency} (AMI license {ami}), a licensed real-estate broker, which will reach out with options. It's free for you.
- FR: Votre demande part chez notre agence partenaire, {agency} (licence AMI {ami}), intermédiaire immobilier agréé, qui vous contacte avec des propositions. C'est gratuit pour vous.

### steps.h
- PT: A seguir
- EN: What happens next
- FR: Ensuite

### steps.1
- PT: Preenche o formulário, em dois minutos.
- EN: You fill in the form, in two minutes.
- FR: Vous remplissez le formulaire, en deux minutes.

### steps.2
- PT: A agência parceira contacta-o em até dois dias úteis.
- EN: The partner agency reaches out within two business days.
- FR: L'agence partenaire vous contacte sous deux jours ouvrés.

### steps.3
- PT: Se quiser, marca visitas para quando estiver em Portugal.
- EN: If you'd like, it sets up viewings for when you're in Portugal.
- FR: Si vous le souhaitez, elle organise des visites pendant votre séjour au Portugal.

### small
- PT: Os seus dados servem só para este pedido e só seguem para a agência parceira, com o seu consentimento.
- EN: Your details are used only for this request and shared only with the partner agency, with your consent.
- FR: Vos données servent uniquement à cette demande et ne sont transmises qu'à l'agence partenaire, avec votre accord.

## how

### title
- PT: Como trabalhamos
- EN: How we work
- FR: Notre méthode

### h1
- PT: Factos com fonte. Patrocínios identificados.
- EN: Facts with sources. Sponsors labeled.
- FR: Des faits sourcés. Des sponsors signalés.

### lede
- PT: O que publicamos, de onde vêm os números e como o Imóveis Portugal ganha dinheiro.
- EN: What we publish, where the numbers come from and how Imóveis Portugal makes money.
- FR: Ce que nous publions, d'où viennent les chiffres et comment Imóveis Portugal se finance.

### s1.h
- PT: De onde vêm os números
- EN: Where the numbers come from
- FR: D'où viennent les chiffres

### s1.p
- PT: Cada número vem de uma fonte oficial: Portal das Finanças, Diário da República, Banco de Portugal, INE ou as autoridades do país de cada edição. Abrimos a fonte, citamo-la e dizemos quando a verificámos. Se não a conseguimos confirmar, não publicamos.
- EN: Every number comes from an official source: Portugal's tax authority, the official gazette, Banco de Portugal, the statistics office (INE) or the authorities of each edition's country. We open the source, cite it and say when we checked it. If we can't confirm it, we don't publish it.
- FR: Chaque chiffre vient d'une source officielle : administration fiscale portugaise, Diário da República, Banque du Portugal, INE ou autorités du pays de chaque édition. Nous ouvrons la source, la citons et indiquons la date de vérification. Si nous ne pouvons pas la confirmer, nous ne publions pas.

### s2.h
- PT: Explicamos as regras, não damos conselhos
- EN: We describe, we don't advise
- FR: Nous décrivons, nous ne conseillons pas

### s2.p
- PT: Explicamos as regras para que perceba o caminho. Não é aconselhamento jurídico, fiscal ou financeiro: para o seu caso, fale com um profissional. Podemos pô-lo em contacto com os nossos parceiros.
- EN: We explain the rules so you understand the path. This isn't legal, tax or financial advice: for your own case, talk to a professional. We can put you in touch with our partners.
- FR: Nous expliquons les règles pour que vous compreniez le chemin. Ce n'est pas un conseil juridique, fiscal ou financier : pour votre cas, adressez-vous à un professionnel. Nous pouvons vous mettre en relation avec nos partenaires.

### s3.h
- PT: Como ganhamos dinheiro
- EN: How we make money
- FR: Comment nous nous finançons

### s3.p
- PT: Os parceiros (advogados, bancos, consultores fiscais, transferências de dinheiro, promotores e a nossa agência parceira) pagam um patrocínio anual fixo, nunca uma comissão por contacto ou por venda. Todo o conteúdo pago diz que é patrocinado e por quem.
- EN: Partners (lawyers, banks, tax advisors, money transfer services, developers and our partner agency) pay a flat yearly sponsorship, never a fee per lead or a commission on a sale. All paid content says it's sponsored, and by whom.
- FR: Les partenaires (avocats, banques, conseillers fiscaux, services de transfert, promoteurs et notre agence partenaire) versent un parrainage annuel forfaitaire, jamais une commission par contact ou sur une vente. Tout contenu payé indique qu'il est sponsorisé, et par qui.

### s4.h
- PT: Uma só agência imobiliária
- EN: One real-estate agency
- FR: Une seule agence immobilière

### s4.p
- PT: O Imóveis Portugal não faz mediação imobiliária. Os pedidos para comprar ou vender casa seguem só para a nossa agência parceira, a {agency} (AMI {ami}), mediadora licenciada e patrocinadora.
- EN: Imóveis Portugal isn't a real-estate broker. Requests to buy or sell a home go only to our partner agency, {agency} (AMI license {ami}), a licensed broker and a sponsor.
- FR: Imóveis Portugal n'exerce pas d'activité d'intermédiation immobilière. Les demandes d'achat ou de vente vont uniquement à notre agence partenaire, {agency} (licence AMI {ami}), intermédiaire agréé et sponsor.

### s5.h
- PT: Os seus dados
- EN: Your data
- FR: Vos données

### s5.p
- PT: A newsletter pede dupla confirmação e cada email tem um link para cancelar. Não usamos cookies de publicidade nem de estatística. Os pedidos de compra só seguem para a agência parceira com o seu consentimento.
- EN: The newsletter uses double opt-in, and every email has an unsubscribe link. We use no advertising or analytics cookies. Buying requests go to the partner agency only with your consent.
- FR: La newsletter fonctionne en double confirmation et chaque e-mail contient un lien de désinscription. Aucun cookie publicitaire ni de mesure d'audience. Les demandes d'achat ne vont à l'agence partenaire qu'avec votre accord.

### s6.h
- PT: Números de audiência
- EN: Audience numbers
- FR: Chiffres d'audience

### s6.p
- PT: Publicamos o número de leitores quando ele existir. Até lá, não mostramos números de audiência.
- EN: We'll publish reader numbers once they exist. Until then, we show none.
- FR: Nous publierons le nombre de lecteurs lorsqu'il existera. D'ici là, nous n'en affichons aucun.

### example.h
- PT: Exemplo: as fontes da página inicial
- EN: Example: the sources on the home page
- FR: Exemple : les sources de la page d'accueil

### example.p
- PT: Os números da página inicial desta edição e as fontes oficiais de onde vêm:
- EN: The numbers on this edition's home page and the official sources behind them:
- FR: Les chiffres de la page d'accueil de cette édition et leurs sources officielles :

### contact.h
- PT: Correções
- EN: Corrections
- FR: Corrections

### contact.p
- PT: Viu um erro? Escreva-nos e corrigimos, com a data da correção:
- EN: Spotted a mistake? Write to us and we'll fix it, with the date of the correction:
- FR: Vous avez repéré une erreur ? Écrivez-nous, nous la corrigeons en indiquant la date :

## legal

### draft
- PT: Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.
- EN: Draft. Fields in square brackets will be filled in once the entity is set up.
- FR: Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.

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
- PT: Newsletter: nome próprio e email, com o seu consentimento (RGPD, art. 6.º, n.º 1, al. a)) e dupla confirmação. Pedidos de compra: nome, contactos e o que procura, com o seu consentimento, para os enviarmos à agência parceira {agency} (AMI {ami}). Pedidos de parceria: dados profissionais, para responder (art. 6.º, n.º 1, al. b)). Pedidos a parceiros: categoria, país, pergunta e contacto, com o seu consentimento, para responder e, se o autorizar, passar a um parceiro da categoria.
- EN: Newsletter: first name and email, with your consent (GDPR, art. 6(1)(a)) and double opt-in. Buying requests: name, contact details and what you're looking for, with your consent, to pass them to our partner agency {agency} (AMI {ami}). Partner inquiries: business details, to reply (art. 6(1)(b)). Requests to a partner: category, country, question and contact details, with your consent, to reply and, if you agree, to pass them to a partner in that category.
- FR: Newsletter : prénom et e-mail, avec votre consentement (RGPD, art. 6, par. 1, a)) et double confirmation. Demandes d'achat : nom, coordonnées et critères, avec votre consentement, transmis à l'agence partenaire {agency} (AMI {ami}). Demandes de partenariat : données professionnelles, pour répondre (art. 6, par. 1, b)). Demandes à un partenaire : catégorie, pays, question et coordonnées, avec votre consentement, pour répondre et, avec votre accord, les transmettre à un partenaire de la catégorie.

### privacy.3.h
- PT: Quem recebe os dados
- EN: Who receives the data
- FR: Destinataires

### privacy.3.p
- PT: A agência parceira, só para pedidos de compra. O parceiro da categoria escolhida, só para pedidos a parceiros e com o seu consentimento. Prestadores que tratam dados por nossa conta: beehiiv (newsletter, EUA, com garantias adequadas para a transferência), Tally (formulários, UE), Cloudflare (alojamento e estatísticas sem cookies) e Cal.com (marcação de chamadas).
- EN: The partner agency, only for buying requests. The partner in the chosen category, only for requests to a partner and with your consent. Processors acting for us: beehiiv (newsletter, USA, with appropriate safeguards for the transfer), Tally (forms, EU), Cloudflare (hosting and cookie-free statistics) and Cal.com (call booking).
- FR: L'agence partenaire, uniquement pour les demandes d'achat. Le partenaire de la catégorie choisie, uniquement pour les demandes à un partenaire et avec votre accord. Sous-traitants : beehiiv (newsletter, États-Unis, avec garanties appropriées pour le transfert), Tally (formulaires, UE), Cloudflare (hébergement et statistiques sans cookies) et Cal.com (prise de rendez-vous).

### privacy.4.h
- PT: Durante quanto tempo
- EN: How long we keep it
- FR: Durée de conservation

### privacy.4.p
- PT: Newsletter: até cancelar. Pedidos de compra e pedidos a parceiros: 12 meses. Pedidos de parceria: durante a relação comercial e o prazo legal aplicável.
- EN: Newsletter: until you unsubscribe. Buying requests and requests to a partner: 12 months. Partner inquiries: for the business relationship and the applicable legal period.
- FR: Newsletter : jusqu'à votre désinscription. Demandes d'achat et demandes à un partenaire : 12 mois. Demandes de partenariat : pendant la relation commerciale et la durée légale applicable.

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
- PT: Não usamos cookies de publicidade nem de estatística. A língua e a edição que escolhe ficam só no seu navegador (armazenamento local), sem cookies. Os formulários incorporados podem usar cookies técnicos do serviço.
- EN: We use no advertising or analytics cookies. The language and edition you choose stay only in your browser (local storage), without cookies. Embedded forms may use technical cookies from their service.
- FR: Aucun cookie publicitaire ni de mesure d'audience. La langue et l'édition choisies restent uniquement dans votre navigateur (stockage local), sans cookie. Les formulaires intégrés peuvent utiliser des cookies techniques de leur service.

### legal.title
- PT: Aviso legal
- EN: Legal notice
- FR: Mentions légales

### legal.h1
- PT: Aviso legal
- EN: Legal notice
- FR: Mentions légales

### legal.intro
- PT: Quem publica o Imóveis Portugal e em que condições.
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
- PT: Agência parceira
- EN: Partner agency
- FR: Agence partenaire

### legal.4.p
- PT: {agency}, AMI {ami}, mediadora imobiliária licenciada. O Imóveis Portugal não faz mediação imobiliária.
- EN: {agency}, AMI license {ami}, a licensed real-estate broker. Imóveis Portugal does not act as a real-estate broker.
- FR: {agency}, licence AMI {ami}, intermédiaire immobilier agréé. Imóveis Portugal n'exerce pas d'activité d'intermédiation immobilière.

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
