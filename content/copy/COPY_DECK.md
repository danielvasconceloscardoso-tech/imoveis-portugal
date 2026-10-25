# Copy deck

Every text on the site, by page and block, in Portuguese (Portugal), English (American) and French (prompt 10). The site reads this file at build time: edit a line here, push, and the page changes. Voice: content/VOICE.md. Terms: content/GLOSSARY.md.

How to edit:
1. Change only the text after `PT:`, `EN:` or `FR:`. Keep the `##` page and `###` block names: the site looks them up.
2. Words in curly brackets are filled in by the site: `{agency}`, `{ami}`, `{email}`, `{n}`, `{left}`, `{total}`, `{country}`, `{date}` and the legal placeholders. Keep them.
3. Blocks ending in `.lu`, `.fr`, `.ch`, `.br`, `.us`, `.il` belong to one edition.
4. Not in this file: the FAQ questions and answers (content/faq/*.yaml), the disclaimers (content/EDITORIAL_POLICY.md), the report text (site/ebooks/), and figures and their sources (content/facts/facts.csv).

## common

### nav.compare
- PT: O que compra
- EN: What it buys
- FR: Ce que vous achetez

### nav.sims
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

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

### gold
- PT: Patrocinador Gold
- EN: Gold sponsor
- FR: Sponsor Gold

### partners.line
- PT: Tem um negócio para quem vive fora? Veja as condições para parceiros.
- EN: Do you run a business for people abroad? See our partner terms.
- FR: Vous avez une entreprise pour ceux qui vivent à l'étranger ? Voyez nos conditions partenaires.

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
- PT: Uma newsletter para quem vive lá fora e quer casa em Portugal.
- EN: A newsletter for people abroad who want a home in Portugal.
- FR: Une newsletter pour ceux qui vivent à l'étranger et veulent une maison au Portugal.

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

## home

### h1
- PT: Comprar casa em Portugal sem lá estar.
- EN: Buy a home in Portugal without being there.
- FR: Acheter au Portugal sans y être.

### line.lu
- PT: Para quem vive no Luxemburgo e volta a pensar na casa todos os agostos.
- EN: For people in Luxembourg who think about the house back home every August.
- FR: Pour ceux qui vivent au Luxembourg et repensent à la maison chaque mois d'août.

### line.fr
- PT: Para quem vive em França e conta os dias até às férias de agosto.
- EN: For people in France who count the days to the August holidays.
- FR: Pour ceux qui vivent en France et comptent les jours jusqu'aux vacances d'août.

### line.ch
- PT: Para quem vive na Suíça e já faz as contas em francos e em euros.
- EN: For people in Switzerland who already do the sums in francs and in euros.
- FR: Pour ceux qui vivent en Suisse et font déjà leurs calculs en francs et en euros.

### line.br
- PT: Para quem vive no Brasil e está a preparar a mudança, ou a segunda casa, em Portugal.
- EN: For people in Brazil getting ready for a move, or a second home, in Portugal.
- FR: Pour ceux qui vivent au Brésil et préparent un départ, ou une résidence secondaire, au Portugal.

### line.us
- PT: Para quem vive nos Estados Unidos e pensa numa casa no Norte de Portugal.
- EN: For people in the US thinking about a home in the North of Portugal.
- FR: Pour ceux qui vivent aux États-Unis et pensent à une maison dans le Nord du Portugal.

### line.il
- PT: Para quem vive em Israel e pensa numa casa em Portugal.
- EN: For people in Israel thinking about a home in Portugal.
- FR: Pour ceux qui vivent en Israël et pensent à une maison au Portugal.

### promise
- PT: Às quintas-feiras, por email: uma casa real, o custo completo e as regras explicadas, com fonte. Grátis.
- EN: Every Thursday, by email: a real home, the full cost and the rules explained, with sources. Free.
- FR: Chaque jeudi, par e-mail : un vrai bien, le coût complet et les règles expliquées, avec leurs sources. Gratuit.

### subscribe
- PT: Quero receber
- EN: Sign me up
- FR: Je m'abonne

### subscribe.subject
- PT: Quero receber a newsletter
- EN: Please sign me up for the newsletter
- FR: Je souhaite recevoir la newsletter

### call.link
- PT: Falar 15 minutos com a agência, grátis
- EN: Talk to the agency for 15 minutes, free
- FR: Parler 15 minutes avec l'agence, gratuitement

### example.h
- PT: {price} de casa, {extra} por cima
- EN: A {price} home, {extra} on top
- FR: Un bien à {price}, {extra} en plus

### example.p
- PT: O preço é o início. Por cima, quem compra sem ser residente fiscal em Portugal paga:
- EN: The price is just the start. On top, a buyer who isn't a Portuguese tax resident pays:
- FR: Le prix n'est qu'un début. En plus, un acheteur non-résident fiscal au Portugal paie :

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
- PT: Total
- EN: Total
- FR: Total

### example.fx
- PT: Cerca de {local} ao câmbio do BCE de {date}.
- EN: About {local} at the ECB rate of {date}.
- FR: Environ {local} au cours de la BCE du {date}.

### example.note
- PT: Sem crédito, advogado nem câmbio. Se for residente fiscal e esta for a sua morada principal, o IMT é bem menor.
- EN: No mortgage, lawyer or exchange costs included. If you're a tax resident and it's your main home, the transfer tax is much lower.
- FR: Hors crédit, avocat et change. Si vous êtes résident fiscal et que c'est votre résidence principale, l'IMT est bien plus bas.

### example.link
- PT: Ver a conta completa
- EN: See the full breakdown
- FR: Voir le calcul complet

### qa.h.august
- PT: As perguntas que nos fazem em agosto
- EN: What people ask us every August
- FR: Les questions qu'on nous pose en août

### qa.h
- PT: As perguntas que mais nos fazem
- EN: What people ask us most
- FR: Les questions qu'on nous pose le plus

### qa.sign.q
- PT: Posso comprar sem ir a Portugal?
- EN: Can I buy without going to Portugal?
- FR: Puis-je acheter sans aller au Portugal ?

### qa.sign.a
- PT: Sim, com uma procuração assinada aí, num consulado português ou num notário com Apostila. Pode vir só para receber as chaves.
- EN: Yes, with a power of attorney signed where you live, at a Portuguese consulate or before a notary with an Apostille. You can come over just to collect the keys.
- FR: Oui, avec une procuration signée chez vous, dans un consulat du Portugal ou chez un notaire avec apostille. Vous pouvez venir juste pour récupérer les clés.

### qa.costs.q
- PT: Quanto pago por cima do preço?
- EN: How much do I pay on top of the price?
- FR: Combien paie-t-on en plus du prix ?

### qa.costs.a
- PT: IMT, imposto do selo, escritura e registo. No exemplo acima, {extra}.
- EN: Transfer tax, stamp duty, deed and registration. In the example above, {extra}.
- FR: L'IMT, le droit de timbre, l'acte et l'enregistrement. Dans l'exemple ci-dessus, {extra}.

### qa.bank.q
- PT: O banco empresta a quem vive fora?
- EN: Will a bank lend to someone who lives abroad?
- FR: La banque prête-t-elle à quelqu'un qui vit à l'étranger ?

### qa.bank.a
- PT: Empresta, até 90% para habitação própria e 80% para outros fins, nos limites do Banco de Portugal.
- EN: Yes, up to 90% for your main home and 80% for other uses, within Banco de Portugal's limits.
- FR: Oui, jusqu'à 90 % pour la résidence principale et 80 % pour les autres usages, dans les limites de la Banque du Portugal.

### qa.inherit.q
- PT: A casa dos meus pais ficou para mim. E agora?
- EN: My parents' house is now mine. What now?
- FR: La maison de mes parents me revient. Et maintenant ?

### qa.inherit.a
- PT: Primeiro, a habilitação de herdeiros e o registo. Depois, decidir com os irmãos. Os filhos não pagam o imposto do selo de 10% sobre a herança.
- EN: First, the heirs' declaration and the registration. Then you decide with your siblings. Children don't pay the 10% stamp duty on inheritance.
- FR: D'abord, l'acte de notoriété des héritiers et l'enregistrement. Ensuite, décider avec les frères et sœurs. Les enfants ne paient pas le droit de timbre de 10 % sur la succession.

### qa.live.q
- PT: Comprar casa dá direito a viver em Portugal?
- EN: Does buying a home let me live in Portugal?
- FR: Acheter un bien permet-il de vivre au Portugal ?

### qa.live.a
- PT: Não. Desde 7 de outubro de 2023, comprar deixou de abrir novos vistos gold. Para viver cá, precisa de um visto de residência, como o D7.
- EN: No. Since October 7, 2023, buying no longer opens new Golden Visa applications. To live here, you need a residence visa, such as the D7.
- FR: Non. Depuis le 7 octobre 2023, l'achat n'ouvre plus de nouveaux golden visas. Pour y vivre, il faut un visa de résidence, comme le D7.

### qa.all
- PT: Todas as perguntas
- EN: All questions
- FR: Toutes les questions

### side.h
- PT: Do lado de lá
- EN: On the ground in Portugal
- FR: Sur place, au Portugal

### side.p
- PT: Quem trata da casa em Portugal é a Habinedita Gondomar, agência licenciada (AMI {ami}).
- EN: Your home in Portugal is handled by Habinedita Gondomar, a licensed agency (AMI {ami}).
- FR: Sur place, c'est Habinedita Gondomar, agence agréée (AMI {ami}), qui s'occupe de votre bien.

## calls

### intro.h
- PT: Primeira conversa · 15 min · grátis
- EN: First call · 15 min · free
- FR: Premier appel · 15 min · gratuit

### intro.p
- PT: Diga o que procura e o que já tem tratado. Saímos com os próximos passos.
- EN: Tell us what you're looking for and what's already done. You leave with the next steps.
- FR: Dites ce que vous cherchez et ce qui est déjà fait. Vous repartez avec les prochaines étapes.

### intro.short
- PT: Conversa de 15 min, grátis
- EN: 15-minute call, free
- FR: Appel de 15 min, gratuit

### intro.subject
- PT: Primeira conversa de 15 minutos com a agência
- EN: 15-minute first call with the agency
- FR: Premier appel de 15 minutes avec l'agence

### plan.h
- PT: Plano de compra · 45 min · 150 €
- EN: Buying plan · 45 min · 150 €
- FR: Plan d'achat · 45 min · 150 €

### plan.p
- PT: Orçamento, zonas, crédito e calendário, para o seu caso. Os 150 € são descontados se comprar com a agência, que os fatura.
- EN: Budget, areas, mortgage and timeline, for your case. The 150 € is credited if you buy through the agency, which invoices it.
- FR: Budget, quartiers, crédit et calendrier, pour votre cas. Les 150 € sont déduits si vous achetez avec l'agence, qui les facture.

### plan.short
- PT: Plano de compra, 45 min, 150 €
- EN: Buying plan, 45 min, 150 €
- FR: Plan d'achat, 45 min, 150 €

### plan.subject
- PT: Plano de compra de 45 minutos com a agência
- EN: 45-minute buying plan with the agency
- FR: Plan d'achat de 45 minutes avec l'agence

## faq

### title
- PT: Perguntas sobre comprar casa em Portugal a partir de fora
- EN: Buying a home in Portugal from abroad, question by question
- FR: Acheter au Portugal depuis l'étranger, question par question

### lede
- PT: As perguntas que mais se fazem, respondidas em poucas linhas. Cada número leva à sua fonte oficial.
- EN: The questions people ask most, answered in a few lines. Every number links to its official source.
- FR: Les questions les plus posées, en quelques lignes. Chaque chiffre renvoie à sa source officielle.

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

### form.cta
- PT: Enviar a minha pergunta
- EN: Send my question
- FR: Envoyer ma question

### calls.h
- PT: Falar com a agência
- EN: Talk to the agency
- FR: Parler à l'agence

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
- PT: Página a página
- EN: Page by page
- FR: Page par page

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
- PT: Uma casa e as contas, todas as quintas-feiras
- EN: One home and its numbers, every Thursday
- FR: Un bien et ses chiffres, chaque jeudi

## partners

### title
- PT: Para parceiros
- EN: For partners
- FR: Partenaires

### h1
- PT: Patrocine a newsletter de quem compra casa em Portugal a partir de fora
- EN: Sponsor the newsletter for people buying a home in Portugal from abroad
- FR: Sponsorisez la newsletter de ceux qui achètent au Portugal depuis l'étranger

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

### cta
- PT: Enviar o meu pedido
- EN: Send my request
- FR: Envoyer ma demande

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
- PT: As fontes da página inicial, uma a uma
- EN: The home page sources, one by one
- FR: Les sources de la page d'accueil, une par une

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

## compare

### title
- PT: O que compra com o mesmo dinheiro
- EN: What the same money buys
- FR: Ce que le même budget permet d'acheter

### lede
- PT: Metros quadrados de casa para 250 000 €, 500 000 € e 1 000 000 €, em Portugal e onde vive. Preço por m² de vendas reais, de fontes oficiais.
- EN: Square metres of home for €250,000, €500,000 and €1,000,000, in Portugal and where you live. Price per m² from actual sales, from official sources.
- FR: Des mètres carrés de logement pour 250 000 €, 500 000 € et 1 000 000 €, au Portugal et là où vous vivez. Prix au m² des ventes réelles, de sources officielles.

### line
- PT: Com {budget} compra cerca de {a} m² {placeA} e {b} m² {placeB}.
- EN: With {budget} you buy about {a} m² {placeA} and {b} m² {placeB}.
- FR: Avec {budget}, vous achetez environ {a} m² {placeA} et {b} m² {placeB}.

### budget.h
- PT: Com {budget}
- EN: With {budget}
- FR: Avec {budget}

### col.place
- PT: Local
- EN: Place
- FR: Lieu

### col.m2
- PT: Preço por m²
- EN: Price per m²
- FR: Prix au m²

### col.buys
- PT: Compra cerca de
- EN: Buys about
- FR: Permet environ

### pt.h
- PT: Em Portugal
- EN: In Portugal
- FR: Au Portugal

### abroad.none
- PT: Ainda não encontrámos um preço oficial por m² para {country}. Mostramos só Portugal até haver uma fonte primária.
- EN: We have not yet found an official price per m² for {country}. We show Portugal only until there is a primary source.
- FR: Nous n'avons pas encore trouvé de prix officiel au m² pour {country}. Nous montrons seulement le Portugal en attendant une source primaire.

### note
- PT: São medianas de vendas reais, não casas concretas. Uma casa em particular pode custar bastante mais ou menos.
- EN: These are medians of actual sales, not specific homes. Any given home can cost a lot more or less.
- FR: Ce sont des médianes de ventes réelles, pas des biens précis. Un bien donné peut coûter nettement plus ou moins.

### note.mean
- PT: No Luxemburgo, o Observatoire de l'Habitat publica a média dos apartamentos usados, não a mediana.
- EN: In Luxembourg, the Observatoire de l'Habitat publishes the average for existing apartments, not the median.
- FR: Au Luxembourg, l'Observatoire de l'Habitat publie la moyenne des appartements existants, pas la médiane.

### note.canton
- PT: Na Suíça só encontrámos um valor oficial para o cantão de Genebra ({chf} CHF por m² em 2024), convertido à taxa de referência do BCE de {date}.
- EN: In Switzerland we only found an official figure for the canton of Geneva ({chf} CHF per m² in 2024), converted at the ECB reference rate of {date}.
- FR: En Suisse, nous n'avons trouvé de chiffre officiel que pour le canton de Genève ({chf} CHF le m² en 2024), converti au taux de référence de la BCE du {date}.

### note.pt
- PT: Em Portugal: últimos 12 meses até ao {quarter}, todas as casas vendidas, novas e usadas.
- EN: In Portugal: the 12 months to {quarter}, all homes sold, new and existing.
- FR: Au Portugal : les 12 mois jusqu'au {quarter}, tous les logements vendus, neufs et anciens.

### share.h
- PT: Para partilhar
- EN: To share
- FR: À partager

### share.p
- PT: A mesma comparação numa imagem, com a fonte, para enviar à família ou publicar.
- EN: The same comparison as an image, with its source, to send to family or post.
- FR: La même comparaison en image, avec sa source, à envoyer à la famille ou à publier.

### share.link
- PT: Descarregar a imagem
- EN: Download the image
- FR: Télécharger l'image

### home.link
- PT: Ver a comparação completa
- EN: See the full comparison
- FR: Voir la comparaison complète

### place.lisboa
- PT: Lisboa
- EN: Lisbon
- FR: Lisbonne

### place.porto
- PT: Porto
- EN: Porto
- FR: Porto

### place.gondomar
- PT: Gondomar
- EN: Gondomar
- FR: Gondomar

### place.braga
- PT: Braga
- EN: Braga
- FR: Braga

### place.faro
- PT: Faro
- EN: Faro
- FR: Faro

### place.viseu
- PT: Viseu
- EN: Viseu
- FR: Viseu

### place.lux
- PT: Cidade do Luxemburgo
- EN: Luxembourg City
- FR: Luxembourg-Ville

### place.esch
- PT: Esch-sur-Alzette
- EN: Esch-sur-Alzette
- FR: Esch-sur-Alzette

### place.paris
- PT: Paris
- EN: Paris
- FR: Paris

### place.lyon
- PT: Lyon
- EN: Lyon
- FR: Lyon

### place.geneve
- PT: Genebra (cantão)
- EN: Geneva (canton)
- FR: Genève (canton)

### in.lisboa
- PT: em Lisboa
- EN: in Lisbon
- FR: à Lisbonne

### in.porto
- PT: no Porto
- EN: in Porto
- FR: à Porto

### in.gondomar
- PT: em Gondomar
- EN: in Gondomar
- FR: à Gondomar

### in.braga
- PT: em Braga
- EN: in Braga
- FR: à Braga

### in.faro
- PT: em Faro
- EN: in Faro
- FR: à Faro

### in.viseu
- PT: em Viseu
- EN: in Viseu
- FR: à Viseu

### in.lux
- PT: na cidade do Luxemburgo
- EN: in Luxembourg City
- FR: à Luxembourg-Ville

### in.esch
- PT: em Esch-sur-Alzette
- EN: in Esch-sur-Alzette
- FR: à Esch-sur-Alzette

### in.paris
- PT: em Paris
- EN: in Paris
- FR: à Paris

### in.lyon
- PT: em Lyon
- EN: in Lyon
- FR: à Lyon

### in.geneve
- PT: em Genebra
- EN: in Geneva
- FR: à Genève

## sims

### title
- PT: Simuladores
- EN: Calculators
- FR: Simulateurs

### lede
- PT: Contas feitas no seu navegador, com as regras de 2026 e a fonte de cada taxa. Não guardamos nada do que escreve.
- EN: Worked out in your browser, with the 2026 rules and the source of every rate. Nothing you type is stored.
- FR: Calculs faits dans votre navigateur, avec les règles de 2026 et la source de chaque taux. Rien de ce que vous saisissez n'est enregistré.

### estimate
- PT: Estimativa com as regras em vigor. Não é uma proposta de crédito nem aconselhamento fiscal.
- EN: An estimate under current rules. Not a credit offer and not tax advice.
- FR: Estimation selon les règles en vigueur. Ce n'est ni une offre de crédit ni un conseil fiscal.

### result.h
- PT: Resultado
- EN: Result
- FR: Résultat

### share
- PT: Copiar a ligação com estes valores
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
- PT: Quer que {name} analise o seu caso e compare bancos, sem custos para si?
- EN: Would you like {name} to look at your case and compare banks, at no cost to you?
- FR: Voulez-vous que {name} étudie votre dossier et compare les banques, sans frais pour vous ?

### credit.consent
- PT: Aceito que os dados deste pedido sejam enviados apenas a {name} (intermediário de crédito, Banco de Portugal n.º {bdp}) para me contactar sobre ele. Posso retirar o consentimento a qualquer momento.
- EN: I agree that the details of this request are sent only to {name} (credit intermediary, Banco de Portugal no. {bdp}) to contact me about it. I can withdraw my consent at any time.
- FR: J'accepte que les données de cette demande soient envoyées uniquement à {name} (intermédiaire de crédit, Banco de Portugal n° {bdp}) pour me contacter à ce sujet. Je peux retirer mon consentement à tout moment.

### credit.send
- PT: Enviar o pedido
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
- PT: Para comparar propostas de vários bancos, fale com um parceiro de crédito.
- EN: To compare offers from several banks, talk to a credit partner.
- FR: Pour comparer les offres de plusieurs banques, parlez à un partenaire crédit.

### tax.p
- PT: O imposto no país onde vive depende do seu caso. Um consultor fiscal confirma as contas.
- EN: Tax where you live depends on your case. A tax adviser can check the numbers.
- FR: L'impôt dans votre pays de résidence dépend de votre situation. Un conseiller fiscal vérifie les chiffres.

### agency.p
- PT: Se já tem um preço em mente, a agência parceira mostra-lhe casas nesse valor.
- EN: If you already have a price in mind, the partner agency can show you homes at that price.
- FR: Si vous avez déjà un prix en tête, l'agence partenaire vous montre des biens à ce prix.

### plan.cta
- PT: Plano de compra em PDF, com três cenários de crédito e a lista de documentos · 5,99 €
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
- PT: IMT, imposto do selo e escritura para o preço que indicar.
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
- EN: Deed and registration (Casa Pronta)
- FR: Acte et enregistrement (Casa Pronta)

### r.extra
- PT: Acima do preço
- EN: On top of the price
- FR: En plus du prix

### r.total
- PT: Total a pagar
- EN: Total to pay
- FR: Total à payer

### cost.note
- PT: Quem não é residente fiscal paga IMT à taxa única de 7,5%, salvo exceções, como passar a residente nos dois anos seguintes. Advogado e avaliação bancária não estão incluídos.
- EN: Buyers who are not tax residents pay IMT at a flat 7.5%, with exceptions such as becoming resident within two years. Lawyer and bank valuation are not included.
- FR: Les non-résidents fiscaux paient l'IMT au taux unique de 7,5 %, sauf exceptions, comme devenir résident dans les deux ans. Avocat et expertise bancaire non inclus.

### payment.name
- PT: Prestação do crédito
- EN: Monthly mortgage payment
- FR: Mensualité du crédit

### payment.p
- PT: A prestação mensal para o preço, a entrada, o prazo e a taxa que indicar.
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
- PT: Os bancos financiam até 90% do valor da habitação própria e permanente e até 80% das outras casas, e o total das prestações não pode passar 45% do rendimento líquido (Banco de Portugal, desde 1 de agosto de 2026). Taxa nominal, sem seguros nem comissões: não é uma TAEG.
- EN: Banks lend up to 90% of the value of an own permanent home and up to 80% for other homes, and all loan payments together cannot exceed 45% of net income (Banco de Portugal, since 1 August 2026). Nominal rate, without insurance or fees: not an APR.
- FR: Les banques financent jusqu'à 90 % de la valeur d'une résidence principale et jusqu'à 80 % des autres biens, et l'ensemble des mensualités ne peut dépasser 45 % du revenu net (Banco de Portugal, depuis le 1er août 2026). Taux nominal, hors assurances et frais : ce n'est pas un TAEG.

### rent.name
- PT: Rendimento do arrendamento
- EN: Rental yield
- FR: Rendement locatif

### rent.p
- PT: Rentabilidade bruta e líquida de uma casa arrendada, com o imposto para não residentes.
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
- PT: Não residentes pagam 25% sobre o rendimento líquido do arrendamento habitacional, com reduções para contratos de cinco anos ou mais. O país onde vive pode também tributar este rendimento.
- EN: Non-residents pay 25% on net income from residential lettings, with reductions for leases of five years or more. The country where you live may also tax this income.
- FR: Les non-résidents paient 25 % sur le revenu net de la location d'habitation, avec des réductions pour les baux de cinq ans ou plus. Votre pays de résidence peut aussi imposer ce revenu.

## plan

### title
- PT: Plano de compra
- EN: Purchase plan
- FR: Plan d'achat

### sub
- PT: O seu plano para comprar casa em Portugal a partir de {country}, com as regras de 2026 e a fonte de cada número.
- EN: Your plan to buy a home in Portugal from {country}, under the 2026 rules, with the source of every figure.
- FR: Votre plan pour acheter au Portugal depuis {country}, selon les règles de 2026, avec la source de chaque chiffre.

### made
- PT: Preparado a {date}
- EN: Prepared on {date}
- FR: Préparé le {date}

### sample
- PT: Exemplo com valores de demonstração. O plano comprado usa os valores do seu simulador.
- EN: Example with sample figures. The plan you buy uses the figures from your calculator.
- FR: Exemple avec des valeurs de démonstration. Le plan acheté reprend les valeurs de votre simulateur.

### print
- PT: Guardar em PDF
- EN: Save as PDF
- FR: Enregistrer en PDF

### inputs.h
- PT: Os seus dados
- EN: Your figures
- FR: Vos chiffres

### s1.h
- PT: 1. Quanto custa no total
- EN: 1. What it costs in total
- FR: 1. Combien cela coûte au total

### s2.h
- PT: 2. Três cenários de crédito
- EN: 2. Three mortgage scenarios
- FR: 2. Trois scénarios de crédit

### s2.p
- PT: A mesma entrada e o mesmo prazo, com a taxa média atual e com mais um e mais dois pontos, para ver a margem que tem se as taxas subirem.
- EN: Same deposit and term, at today's average rate and at one and two points higher, to see how much room you have if rates rise.
- FR: Même apport et même durée, au taux moyen actuel puis à un et deux points de plus, pour mesurer votre marge si les taux montent.

### s2.col.rate
- PT: Taxa
- EN: Rate
- FR: Taux

### s2.col.monthly
- PT: Prestação
- EN: Monthly
- FR: Mensualité

### s2.col.interest
- PT: Juros totais
- EN: Total interest
- FR: Intérêts totaux

### s2.col.income
- PT: Rendimento líquido mínimo
- EN: Minimum net income
- FR: Revenu net minimum

### s2.note
- PT: Rendimento líquido mínimo = prestação ÷ 45%, o limite do Banco de Portugal para todas as prestações. Sem outros créditos.
- EN: Minimum net income = payment ÷ 45%, Banco de Portugal's limit for all loan payments. Assumes no other loans.
- FR: Revenu net minimum = mensualité ÷ 45 %, la limite du Banco de Portugal pour l'ensemble des mensualités. Sans autre crédit.

### s3.h
- PT: 3. Se arrendar a casa
- EN: 3. If you let the home
- FR: 3. Si vous louez le bien

### s3.none
- PT: Não indicou renda. Com o simulador de arrendamento pode juntar este capítulo.
- EN: You did not enter a rent. The rental calculator adds this chapter.
- FR: Vous n'avez pas indiqué de loyer. Le simulateur de location ajoute ce chapitre.

### s4.h
- PT: 4. Impostos a confirmar onde vive
- EN: 4. Tax points to check where you live
- FR: 4. Points fiscaux à vérifier dans votre pays

### s5.h
- PT: 5. Documentos
- EN: 5. Documents
- FR: 5. Documents

### s6.h
- PT: 6. Os passos, a partir de fora
- EN: 6. The steps, from abroad
- FR: 6. Les étapes, depuis l'étranger

### s7.h
- PT: 7. Quem o pode ajudar
- EN: 7. Who can help
- FR: 7. Qui peut vous aider

### s7.p
- PT: Uma primeira conversa de 15 minutos com a {agency}, grátis. Para o crédito, um intermediário de crédito registado no Banco de Portugal. Para a escritura e a procuração, um advogado.
- EN: A free 15-minute first call with {agency}. For the mortgage, a credit intermediary registered with Banco de Portugal. For the deed and the power of attorney, a lawyer.
- FR: Un premier échange gratuit de 15 minutes avec {agency}. Pour le crédit, un intermédiaire de crédit enregistré auprès du Banco de Portugal. Pour l'acte et la procuration, un avocat.

### tax.pt.1
- PT: Em Portugal: o NIF obtém-se à distância através de um representante; ao comprar, passa a ter de nomear um representante fiscal ou aderir às notificações eletrónicas (obrigatório fora da UE e do EEE).
- EN: In Portugal: you can get a NIF remotely through a representative; once you own property, you must appoint a tax representative or sign up for electronic notifications (mandatory outside the EU and EEA).
- FR: Au Portugal : le NIF s'obtient à distance par un représentant ; une fois propriétaire, vous devez nommer un représentant fiscal ou adhérer aux notifications électroniques (obligatoire hors UE et EEE).

### tax.pt.2
- PT: Em Portugal: IMI todos os anos, de 0,3% a 0,45% do valor patrimonial, e AIMI acima de 600 000 € de valor patrimonial por pessoa.
- EN: In Portugal: IMI every year, 0.3% to 0.45% of the tax value, and AIMI above €600,000 of tax value per person.
- FR: Au Portugal : l'IMI chaque année, de 0,3 % à 0,45 % de la valeur fiscale, et l'AIMI au-delà de 600 000 € de valeur fiscale par personne.

### tax.lu.1
- PT: Luxemburgo: o rendimento de uma casa em Portugal pode ser tributado em Portugal; o Luxemburgo isenta-o mas pode usá-lo para calcular a taxa sobre o resto do rendimento.
- EN: Luxembourg: income from a home in Portugal may be taxed in Portugal; Luxembourg exempts it but may use it to set the rate on the rest of your income.
- FR: Luxembourg : les revenus d'un bien au Portugal peuvent être imposés au Portugal ; le Luxembourg les exonère mais peut en tenir compte pour le taux appliqué au reste de vos revenus.

### tax.fr.1
- PT: França: as contas bancárias abertas fora de França, incluindo em Portugal, declaram-se todos os anos (formulário 3916).
- EN: France: bank accounts opened outside France, including in Portugal, are declared every year (form 3916).
- FR: France : les comptes bancaires ouverts hors de France, y compris au Portugal, se déclarent chaque année (formulaire 3916).

### tax.ch.1
- PT: Suíça: o 2.º pilar pode ser levantado antecipadamente para a habitação principal, também no estrangeiro, mas não para uma segunda casa (mínimo 20 000 CHF).
- EN: Switzerland: 2nd-pillar money can be withdrawn early for your main home, also abroad, but not for a second home (minimum CHF 20,000).
- FR: Suisse : le 2e pilier peut être retiré de manière anticipée pour la résidence principale, aussi à l'étranger, mais pas pour une résidence secondaire (minimum 20 000 CHF).

### tax.ch.2
- PT: Suíça: o pilar 3a também pode ser usado para a casa própria.
- EN: Switzerland: pillar 3a money can also be used for your own home.
- FR: Suisse : le pilier 3a peut aussi servir pour votre propre logement.

### tax.br.1
- PT: Brasil: a casa em Portugal declara-se em Bens e Direitos do IRPF, com o valor de compra em moeda estrangeira.
- EN: Brazil: the home in Portugal is declared under Bens e Direitos in the IRPF, with the purchase value in foreign currency.
- FR: Brésil : le bien au Portugal se déclare dans les Bens e Direitos de l'IRPF, avec le prix d'achat en devise.

### tax.br.2
- PT: Brasil: acima de 1 milhão de dólares em bens no estrangeiro a 31 de dezembro, há a declaração CBE ao Banco Central.
- EN: Brazil: with US$1 million or more in assets abroad on 31 December, the CBE declaration to the Central Bank is due.
- FR: Brésil : au-delà d'un million de dollars d'actifs à l'étranger au 31 décembre, la déclaration CBE à la Banque centrale est due.

### tax.us.1
- PT: Estados Unidos: contas no estrangeiro acima de 10 000 dólares no total, em qualquer momento do ano, declaram-se no FBAR; o formulário 8938 tem limites próprios.
- EN: United States: foreign accounts above $10,000 in total at any time of the year go on the FBAR; Form 8938 has its own thresholds.
- FR: États-Unis : les comptes à l'étranger au-delà de 10 000 dollars au total, à tout moment de l'année, se déclarent dans le FBAR ; le formulaire 8938 a ses propres seuils.

### tax.us.2
- PT: Estados Unidos: uma mais-valia na venda pode ser tributada em Portugal e nos Estados Unidos; o crédito por imposto estrangeiro evita a dupla tributação.
- EN: United States: a gain on sale may be taxed in both Portugal and the US; the foreign tax credit avoids double taxation.
- FR: États-Unis : une plus-value à la vente peut être imposée au Portugal et aux États-Unis ; le crédit d'impôt étranger évite la double imposition.

### tax.il.1
- PT: Israel: o rendimento de uma casa em Portugal pode ser tributado em Portugal; Israel dá um crédito pelo imposto português.
- EN: Israel: income from a home in Portugal may be taxed in Portugal; Israel gives a credit for the Portuguese tax.
- FR: Israël : les revenus d'un bien au Portugal peuvent être imposés au Portugal ; Israël accorde un crédit pour l'impôt portugais.

### doc.1
- PT: NIF português e documento de identificação.
- EN: Portuguese tax number (NIF) and ID.
- FR: Numéro fiscal portugais (NIF) et pièce d'identité.

### doc.2
- PT: Procuração com apostila, se não estiver presente na escritura, ou assinada num consulado português.
- EN: Power of attorney with an apostille if you will not attend the deed, or signed at a Portuguese consulate.
- FR: Procuration apostillée si vous n'êtes pas présent à l'acte, ou signée dans un consulat portugais.

### doc.3
- PT: Comprovativo da origem do dinheiro, que o banco, o notário ou o advogado podem pedir.
- EN: Proof of where the money comes from, which the bank, notary or lawyer may ask for.
- FR: Justificatif de l'origine des fonds, que la banque, le notaire ou l'avocat peuvent demander.

### doc.4
- PT: Do vendedor: caderneta predial, certidão do registo predial, licença de utilização ou a sua dispensa, certificado energético e ficha técnica da habitação, quando aplicável.
- EN: From the seller: property tax record (caderneta), land registry certificate, usage licence or its waiver, energy certificate and the home's technical sheet, where applicable.
- FR: Du vendeur : fiche fiscale (caderneta), certificat du registre foncier, licence d'utilisation ou sa dispense, certificat énergétique et fiche technique du logement, le cas échéant.

### doc.5
- PT: Para o crédito: declarações de rendimentos e recibos de salário do país onde vive, e extratos bancários.
- EN: For the mortgage: tax returns, payslips from the country where you live and bank statements.
- FR: Pour le crédit : avis d'imposition, fiches de paie de votre pays de résidence et relevés bancaires.

### step.1
- PT: Pedir o NIF e decidir sobre o representante fiscal.
- EN: Get a NIF and decide on the tax representative.
- FR: Obtenir le NIF et décider du représentant fiscal.

### step.2
- PT: Abrir conta num banco português e pedir uma aprovação prévia do crédito.
- EN: Open a Portuguese bank account and ask for mortgage pre-approval.
- FR: Ouvrir un compte dans une banque portugaise et demander un accord de principe pour le crédit.

### step.3
- PT: Ver casas por videochamada, por um familiar ou ao vivo numa viagem.
- EN: View homes by video call, through a relative or in person on a trip.
- FR: Visiter par appel vidéo, par un proche ou sur place lors d'un séjour.

### step.4
- PT: Assinar o contrato-promessa (CPCV) e pagar o sinal: se o comprador desistir, perde-o; se o vendedor desistir, devolve-o em dobro.
- EN: Sign the promissory contract (CPCV) and pay the deposit: if the buyer walks away, it is lost; if the seller does, it is returned twice over.
- FR: Signer le compromis (CPCV) et verser l'acompte : si l'acheteur se retire, il le perd ; si le vendeur se retire, il le rend au double.

### step.5
- PT: Avaliação do banco e aprovação final do crédito.
- EN: Bank valuation and final mortgage approval.
- FR: Expertise de la banque et accord définitif du crédit.

### step.6
- PT: Pagar o IMT e o imposto do selo antes da escritura (o IMT, no prazo de 30 dias após a liquidação).
- EN: Pay IMT and stamp duty before the deed (IMT within 30 days of assessment).
- FR: Payer l'IMT et le droit de timbre avant l'acte (l'IMT dans les 30 jours suivant la liquidation).

### step.7
- PT: Escritura e registo, num Balcão Casa Pronta ou num notário, em pessoa ou por procuração.
- EN: Deed and registration at a Casa Pronta desk or a notary, in person or by power of attorney.
- FR: Acte et enregistrement dans un guichet Casa Pronta ou chez un notaire, en personne ou par procuration.

### step.8
- PT: Depois: IMI todos os anos e, se arrendar, a declaração das rendas em Portugal.
- EN: Afterwards: IMI every year and, if you let it, declaring the rent in Portugal.
- FR: Ensuite : l'IMI chaque année et, si vous louez, la déclaration des loyers au Portugal.

### r.rate
- PT: Taxa
- EN: Rate
- FR: Taux

## checkout

### title
- PT: Plano de compra em PDF
- EN: Purchase plan as a PDF
- FR: Plan d'achat en PDF

### lede
- PT: O seu simulador transformado num plano de 7 capítulos, para ler com calma e mostrar à família, ao banco ou ao advogado.
- EN: Your calculator turned into a 7-chapter plan, to read at your own pace and show to family, the bank or a lawyer.
- FR: Votre simulation transformée en un plan en 7 chapitres, à lire tranquillement et à montrer à la famille, à la banque ou à l'avocat.

### price
- PT: 5,99 €
- EN: €5.99
- FR: 5,99 €

### inside.h
- PT: O que inclui
- EN: What it includes
- FR: Ce qu'il contient

### inside.1
- PT: O custo total da compra, imposto a imposto.
- EN: The total purchase cost, tax by tax.
- FR: Le coût total de l'achat, impôt par impôt.

### inside.2
- PT: Três cenários de crédito, com o rendimento mínimo para cada um.
- EN: Three mortgage scenarios, with the minimum income for each.
- FR: Trois scénarios de crédit, avec le revenu minimum pour chacun.

### inside.3
- PT: O rendimento se arrendar a casa.
- EN: The return if you let the home.
- FR: Le rendement si vous louez le bien.

### inside.4
- PT: Os pontos fiscais a confirmar no país onde vive.
- EN: The tax points to check in the country where you live.
- FR: Les points fiscaux à vérifier dans votre pays de résidence.

### inside.5
- PT: A lista de documentos e os passos a partir de fora.
- EN: The document checklist and the steps from abroad.
- FR: La liste des documents et les étapes depuis l'étranger.

### example
- PT: Ver um exemplo
- EN: See an example
- FR: Voir un exemple

### consent
- PT: Peço a entrega imediata do PDF e reconheço que, com ela, perco o direito de livre resolução de 14 dias (Decreto-Lei 24/2014, art. 17.º).
- EN: I ask for the PDF to be delivered immediately and acknowledge that I then lose the 14-day right of withdrawal (Decreto-Lei 24/2014, art. 17).
- FR: Je demande la livraison immédiate du PDF et reconnais perdre ainsi mon droit de rétractation de 14 jours (Decreto-Lei 24/2014, art. 17).

### buy
- PT: Comprar o plano · 5,99 €
- EN: Buy the plan · €5.99
- FR: Acheter le plan · 5,99 €

### vat
- PT: Preço com IVA. Fatura emitida por {entity}.
- EN: Price includes VAT. Invoice issued by {entity}.
- FR: Prix TTC. Facture émise par {entity}.

### pay
- PT: Pagamento por cartão através da Stripe. Não guardamos dados do cartão.
- EN: Card payment through Stripe. We do not store card details.
- FR: Paiement par carte via Stripe. Nous ne conservons pas les données de carte.
