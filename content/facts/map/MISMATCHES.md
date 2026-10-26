# Map boundaries ↔ INE codes (prompt 25 §1)

Built by scripts/map-data/build.py from content/facts/map/raw/ (sources and dates in raw/manifest.json).

## Concelhos: 308 of 308 matched

- 275 from OpenStreetMap relations (admin_level 7) matched on the tag ine:code = INE DICO.
- 30 from geoBoundaries PRT ADM2 (CC0), absent from the OSM export: Calheta (R.A.M.), Câmara de Lobos, Funchal, Machico, Ponta do Sol, Porto Moniz, Ribeira Brava, Santa Cruz, Santana, São Vicente, Porto Santo, Vila do Porto, Lagoa (R.A.A.), Nordeste, Ponta Delgada, Povoação, Ribeira Grande, Vila Franca do Campo, Angra do Heroísmo, Vila da Praia da Vitória, Santa Cruz da Graciosa, Calheta (R.A.A.), Velas, Lajes do Pico, Madalena, São Roque do Pico, Horta, Lajes das Flores, Santa Cruz das Flores, Corvo.
- 3 mainland concelhos absent from the OSM export, drawn as the gap their OSM neighbours leave (guided by geoBoundaries): Vale de Cambra, Vila Nova de Foz Côa, Castanheira de Pêra.
- Terras de Bouro (relation 3872426) has no ine:code; matched by name → 0310.
- Almada (relation 5401734) has ine:code 1403, which INE gives to Almeirim; matched by name → 1503.

Replace with a fresh OpenStreetMap extract (Overpass, admin_level 7 and 8) once the build environment can reach it; until DGT confirms commercial use (task 8x), CAOP is not used.

## Parishes: 369 of the 584 INE publishes prices or rents for

- 229 matched on ine:code (DICOFRE), 140 by name inside the right concelho.
- 215 without a boundary: INE now uses the 2025 parish map (Lei 25-A/2025 restored many parishes merged in 2013), and the 2016 OSM export predates it or lacks the code. They stay out of the parish layer; their concelho still shows them in the list.

| DICOFRE | Parish (INE) | Concelho |
|---|---|---|
| 010421 | União das freguesias de Arouca e Burgo | Arouca |
| 010422 | União das freguesias de Cabreiros e Albergaria da Serra | Arouca |
| 010423 | União das freguesias de Canelas e Espiunca | Arouca |
| 010424 | União das freguesias de Covelo de Paivó e Janarde | Arouca |
| 010706 | União das freguesias de Anta e Guetim | Espinho |
| 010932 | União das freguesias de Caldas de São Jorge e Pigeiros | Santa Maria da Feira |
| 010933 | União das freguesias de Canedo, Vale e Vila Maior | Santa Maria da Feira |
| 010934 | União das freguesias de Lobão, Gião, Louredo e Guisande | Santa Maria da Feira |
| 010935 | União das freguesias de Santa Maria da Feira, Travanca, Sanfins e Espargo | Santa Maria da Feira |
| 010936 | União de freguesias de São Miguel de Souto e Mosteirô | Santa Maria da Feira |
| 011302 | Cesar | Oliveira de Azeméis |
| 011320 | União das freguesias de Nogueira do Cravo e Pindelo | Oliveira de Azeméis |
| 011321 | União das freguesias de Oliveira de Azeméis, Santiago de Riba-Ul, Ul, Macinhata da Seixa e Madail | Oliveira de Azeméis |
| 011322 | União das freguesias de Pinheiro da Bemposta, Travanca e Palmaz | Oliveira de Azeméis |
| 011910 | União das freguesias de Vila Chã, Codal e Vila Cova de Perrinho | Vale de Cambra |
| 030290 | União das freguesias de Alheira e Igreja Nova | Barcelos |
| 030291 | União das freguesias de Alvito (São Pedro e São Martinho) e Couto | Barcelos |
| 030292 | União das freguesias de Areias de Vilar e Encourados | Barcelos |
| 030293 | União das freguesias de Barcelos, Vila Boa e Vila Frescainha (São Martinho e São Pedro) | Barcelos |
| 030294 | União das freguesias de Campo e Tamel (São Pedro Fins) | Barcelos |
| 030295 | União das freguesias de Carreira e Fonte Coberta | Barcelos |
| 030296 | União das freguesias de Chorente, Góios, Courel, Pedra Furada e Gueral | Barcelos |
| 030297 | União das freguesias de Creixomil e Mariz | Barcelos |
| 030298 | União das freguesias de Durrães e Tregosa | Barcelos |
| 030299 | União das freguesias de Gamil e Midões | Barcelos |
| 0302FA | União das freguesias de Milhazes, Vilar de Figos e Faria | Barcelos |
| 0302FB | União das freguesias de Negreiros e Chavão | Barcelos |
| 0302FC | União das freguesias de Quintiães e Aguiar | Barcelos |
| 0302FD | União das freguesias de Sequeade e Bastuço (São João e Santo Estevão) | Barcelos |
| 0302FE | União das freguesias de Silveiros e Rio Covo (Santa Eulália) | Barcelos |
| 0302FF | União das freguesias de Tamel (Santa Leocádia) e Vilar do Monte | Barcelos |
| 0302FG | União das freguesias de Viatodos, Grimancelos, Minhotães e Monte de Fralães | Barcelos |
| 0302FH | União das freguesias de Vila Cova e Feitos | Barcelos |
| 030351 | Braga (São Vítor) | Braga |
| 030363 | União das freguesias de Arentim e Cunha | Braga |
| 030364 | União das freguesias de Braga (Maximinos, Sé e Cividade) | Braga |
| 030365 | União das freguesias de Braga (São José de São Lázaro e São João do Souto) | Braga |
| 030366 | União das freguesias de Cabreiros e Passos (São Julião) | Braga |
| 030367 | União das freguesias de Celeirós, Aveleda e Vimieiro | Braga |
| 030368 | União das freguesias de Crespos e Pousada | Braga |
| 030369 | União das freguesias de Escudeiros e Penso (Santo Estêvão e São Vicente) | Braga |
| 030370 | União das freguesias de Este (São Pedro e São Mamede) | Braga |
| 030371 | União das freguesias de Ferreiros e Gondizalves | Braga |
| 030372 | União das freguesias de Guisande e Oliveira (São Pedro) | Braga |
| 030373 | União das freguesias de Lomar e Arcos | Braga |
| 030374 | União das freguesias de Merelim (São Paio), Panoias e Parada de Tibães | Braga |
| 030375 | União das freguesias de Merelim (São Pedro) e Frossos | Braga |
| 030376 | União das freguesias de Morreira e Trandeiras | Braga |
| 030377 | União das freguesias de Nogueira, Fraião e Lamaçães | Braga |
| 030378 | União das freguesias de Nogueiró e Tenões | Braga |
| 030379 | União das freguesias de Real, Dume e Semelhe | Braga |
| 030380 | União das freguesias de Santa Lucrécia de Algeriz e Navarra | Braga |
| 030381 | União das freguesias de Vilaça e Fradelos | Braga |
| 030875 | União das freguesias de Abação e Gémeos | Guimarães |
| 030876 | União das freguesias de Airão Santa Maria, Airão São João e Vermil | Guimarães |
| 030877 | União das freguesias de Arosa e Castelões | Guimarães |
| 030878 | União das freguesias de Atães e Rendufe | Guimarães |
| 030879 | União das freguesias de Briteiros Santo Estêvão e Donim | Guimarães |
| 030880 | União das freguesias de Briteiros São Salvador e Briteiros Santa Leocádia | Guimarães |
| 030881 | União das freguesias de Candoso São Tiago e Mascotelos | Guimarães |
| 030882 | União das freguesias de Conde e Gandarela | Guimarães |
| 030883 | União das freguesias de Leitões, Oleiros e Figueiredo | Guimarães |
| 030884 | União das freguesias de Oliveira, São Paio e São Sebastião | Guimarães |
| 030885 | União das freguesias de Prazins Santo Tirso e Corvite | Guimarães |
| 030886 | União das freguesias de Sande São Lourenço e Balazar | Guimarães |
| 030887 | União das freguesias de Sande Vila Nova e Sande São Clemente | Guimarães |
| 030888 | União das freguesias de Selho São Lourenço e Gominhães | Guimarães |
| 030889 | União das freguesias de Serzedo e Calvos | Guimarães |
| 030890 | União das freguesias de Souto Santa Maria, Souto São Salvador e Gondomar | Guimarães |
| 030891 | União das freguesias de Tabuadelo e São Faustino | Guimarães |
| 031250 | União das freguesias de Antas e Abade de Vermoim | Vila Nova de Famalicão |
| 031251 | União das freguesias de Arnoso (Santa Maria e Santa Eulália) e Sezures | Vila Nova de Famalicão |
| 031252 | União das freguesias de Avidos e Lagoa | Vila Nova de Famalicão |
| 031253 | União das freguesias de Carreira e Bente | Vila Nova de Famalicão |
| 031254 | União das freguesias de Esmeriz e Cabeçudos | Vila Nova de Famalicão |
| 031255 | União das freguesias de Gondifelos, Cavalões e Outiz | Vila Nova de Famalicão |
| 031256 | União das freguesias de Lemenhe, Mouquim e Jesufrei | Vila Nova de Famalicão |
| 031257 | União das freguesias de Ruivães e Novais | Vila Nova de Famalicão |
| 031258 | União das freguesias de Seide | Vila Nova de Famalicão |
| 031259 | União das freguesias de Vale (São Cosme), Telhado e Portela | Vila Nova de Famalicão |
| 031260 | União das freguesias de Vila Nova de Famalicão e Calendário | Vila Nova de Famalicão |
| 060332 | União das freguesias de Antuzede e Vil de Matos | Coimbra |
| 060333 | União das freguesias de Assafarge e Antanhol | Coimbra |
| 060334 | União das freguesias de Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu) | Coimbra |
| 060335 | União das freguesias de Eiras e São Paulo de Frades | Coimbra |
| 060336 | União das freguesias de Santa Clara e Castelo Viegas | Coimbra |
| 060337 | União das freguesias de São Martinho de Árvore e Lamarosa | Coimbra |
| 060338 | União das freguesias de São Martinho do Bispo e Ribeira de Frades | Coimbra |
| 060339 | União das freguesias de Souselas e Botão | Coimbra |
| 060340 | União das freguesias de Taveiro, Ameal e Arzila | Coimbra |
| 060341 | União das freguesias de Trouxemil e Torre de Vilela | Coimbra |
| 080206 | União das freguesias de Alcoutim e Pereiro | Alcoutim |
| 080507 | União das freguesias de Conceição e Estoi | Faro |
| 080508 | União das freguesias de Faro (Sé e São Pedro) | Faro |
| 080607 | União das freguesias de Estômbar e Parchal | Lagoa |
| 080608 | União das freguesias de Lagoa e Carvoeiro | Lagoa |
| 080707 | União das freguesias de Bensafrim e Barão de São João | Lagos |
| 080808 | Loulé (São Clemente) | Loulé |
| 080809 | Loulé (São Sebastião) | Loulé |
| 080812 | União de freguesias de Querença, Tôr e Benafim | Loulé |
| 081006 | União das freguesias de Moncarapacho e Fuseta | Olhão |
| 081309 | União das freguesias de Alcantarilha e Pêra | Silves |
| 081310 | União das freguesias de Algoz e Tunes | Silves |
| 081410 | União das freguesias de Conceição e Cabanas de Tavira | Tavira |
| 081411 | União das freguesias de Luz de Tavira e Santo Estêvão | Tavira |
| 081412 | União das freguesias de Tavira (Santa Maria e Santiago) | Tavira |
| 100932 | União das freguesias de Colmeias e Memória | Leiria |
| 100933 | União das freguesias de Leiria, Pousos, Barreira e Cortes | Leiria |
| 100934 | União das freguesias de Marrazes e Barosa | Leiria |
| 100935 | União das freguesias de Monte Real e Carvide | Leiria |
| 100936 | União das freguesias de Monte Redondo e Carreira | Leiria |
| 100937 | União das freguesias de Parceiros e Azoia | Leiria |
| 100938 | União das freguesias de Santa Catarina da Serra e Chainça | Leiria |
| 100939 | União das freguesias de Santa Eufémia e Boa Vista | Leiria |
| 100940 | União das freguesias de Souto da Carpalhosa e Ortigosa | Leiria |
| 110507 | União das freguesias de Carcavelos e Parede | Cascais |
| 110508 | União das freguesias de Cascais e Estoril | Cascais |
| 110633 | Olivais | Lisboa |
| 110726 | União das freguesias de Moscavide e Portela | Loures |
| 110727 | União das freguesias de Sacavém e Prior Velho | Loures |
| 110728 | União das freguesias de Santa Iria de Azoia, São João da Talha e Bobadela | Loures |
| 110729 | União das freguesias de Santo Antão e São Julião do Tojal | Loures |
| 110730 | União das freguesias de Santo António dos Cavaleiros e Frielas | Loures |
| 110731 | União das freguesias de Camarate, Unhos e Apelação | Loures |
| 110918 | União das freguesias de Azueira e Sobral da Abelheira | Mafra |
| 110919 | União das freguesias de Enxara do Bispo, Gradil e Vila Franca do Rosário | Mafra |
| 110920 | União das freguesias de Igreja Nova e Cheleiros | Mafra |
| 110921 | União das freguesias de Malveira e São Miguel de Alcainça | Mafra |
| 110922 | União das freguesias de Venda do Pinheiro e Santo Estêvão das Galés | Mafra |
| 111012 | União das freguesias de Algés, Linda-a-Velha e Cruz Quebrada-Dafundo | Oeiras |
| 111013 | União das freguesias de Carnaxide e Queijas | Oeiras |
| 111014 | União das freguesias de Oeiras e São Julião da Barra, Paço de Arcos e Caxias | Oeiras |
| 111122 | União das freguesias de Agualva e Mira-Sintra | Sintra |
| 111123 | União das freguesias de Almargem do Bispo, Pêro Pinheiro e Montelavar | Sintra |
| 111124 | União das freguesias do Cacém e São Marcos | Sintra |
| 111125 | União das freguesias de Massamá e Monte Abraão | Sintra |
| 111126 | União das freguesias de Queluz e Belas | Sintra |
| 111127 | União das freguesias de São João das Lampas e Terrugem | Sintra |
| 111128 | União das freguesias de Sintra (Santa Maria e São Miguel, São Martinho e São Pedro de Penaferrim) | Sintra |
| 111412 | União das freguesias de Alhandra, São João dos Montes e Calhandriz | Vila Franca de Xira |
| 111413 | União das freguesias de Alverca do Ribatejo e Sobralinho | Vila Franca de Xira |
| 111414 | União das freguesias de Castanheira do Ribatejo e Cachoeiras | Vila Franca de Xira |
| 111415 | União das freguesias de Póvoa de Santa Iria e Forte da Casa | Vila Franca de Xira |
| 111515 | Falagueira-Venda Nova | Amadora |
| 111608 | União das freguesias de Pontinha e Famões | Odivelas |
| 111609 | União das freguesias de Póvoa de Santo Adrião e Olival Basto | Odivelas |
| 111610 | União das freguesias de Ramada e Caneças | Odivelas |
| 130412 | Baguim do Monte (Rio Tinto) | Gondomar |
| 130413 | União das freguesias de Fânzeres e São Pedro da Cova | Gondomar |
| 130414 | União das freguesias de Foz do Sousa e Covelo | Gondomar |
| 130415 | União das freguesias de Gondomar (São Cosme), Valbom e Jovim | Gondomar |
| 130416 | União das freguesias de Melres e Medas | Gondomar |
| 130811 | União das freguesias de Custóias, Leça do Balio e Guifões | Matosinhos |
| 130812 | União das freguesias de Matosinhos e Leça da Palmeira | Matosinhos |
| 130813 | União das freguesias de Perafita, Lavra e Santa Cruz do Bispo | Matosinhos |
| 130814 | União das freguesias de São Mamede de Infesta e Senhora da Hora | Matosinhos |
| 131216 | União das freguesias de Aldoar, Foz do Douro e Nevogilde | Porto |
| 131217 | União das freguesias de Cedofeita, Santo Ildefonso, Sé, Miragaia, São Nicolau e Vitória | Porto |
| 131218 | União das freguesias de Lordelo do Ouro e Massarelos | Porto |
| 131313 | União das freguesias de Aver-o-Mar, Amorim e Terroso | Póvoa de Varzim |
| 131314 | União das freguesias de Aguçadoura e Navais | Póvoa de Varzim |
| 131315 | União das freguesias da Póvoa de Varzim, Beiriz e Argivai | Póvoa de Varzim |
| 131405 | Aves | Santo Tirso |
| 131430 | Negrelos (São Tomé) | Santo Tirso |
| 131433 | União das freguesias de Areias, Sequeiró, Lama e Palmeira | Santo Tirso |
| 131435 | União das freguesias de Carreira e Refojos de Riba de Ave | Santo Tirso |
| 131436 | União das freguesias de Lamelas e Guimarei | Santo Tirso |
| 131437 | União das freguesias de Santo Tirso, Couto (Santa Cristina e São Miguel) e Burgães | Santo Tirso |
| 131506 | União das freguesias de Campo e Sobrado | Valongo |
| 131631 | União das freguesias de Bagunte, Ferreiró, Outeiro Maior e Parada | Vila do Conde |
| 131632 | União das freguesias de Fornelo e Vairão | Vila do Conde |
| 131633 | União das freguesias de Malta e Canidelo | Vila do Conde |
| 131634 | União das freguesias de Retorta e Tougues | Vila do Conde |
| 131635 | União das freguesias de Rio Mau e Arcos | Vila do Conde |
| 131636 | União das freguesias de Touguinha e Touguinhó | Vila do Conde |
| 131637 | União das freguesias de Vilar e Mosteiró | Vila do Conde |
| 131725 | União das freguesias de Grijó e Sermonde | Vila Nova de Gaia |
| 131726 | União das freguesias de Gulpilhares e Valadares | Vila Nova de Gaia |
| 131727 | União das freguesias de Mafamude e Vilar do Paraíso | Vila Nova de Gaia |
| 131728 | União das freguesias de Pedroso e Seixezelo | Vila Nova de Gaia |
| 131729 | União das freguesias de Sandim, Olival, Lever e Crestuma | Vila Nova de Gaia |
| 131730 | União das freguesias de Santa Marinha e São Pedro da Afurada | Vila Nova de Gaia |
| 131731 | União das freguesias de Serzedo e Perosinho | Vila Nova de Gaia |
| 131809 | União das freguesias de Alvarelhos e Guidões | Trofa |
| 131810 | União das freguesias de Bougado (São Martinho e Santiago) | Trofa |
| 131811 | União das freguesias de Coronado (São Romão e São Mamede) | Trofa |
| 150312 | União das freguesias de Almada, Cova da Piedade, Pragal e Cacilhas | Almada |
| 150313 | União das freguesias de Caparica e Trafaria | Almada |
| 150314 | União das freguesias de Charneca de Caparica e Sobreda | Almada |
| 150315 | União das freguesias de Laranjeiro e Feijó | Almada |
| 150409 | União das freguesias de Alto do Seixalinho, Santo André e Verderena | Barreiro |
| 150410 | União das freguesias de Barreiro e Lavradio | Barreiro |
| 150411 | União das freguesias de Palhais e Coina | Barreiro |
| 150607 | União das freguesias de Baixa da Banheira e Vale da Amoreira | Moita |
| 150608 | União das freguesias de Gaio-Rosário e Sarilhos Pequenos | Moita |
| 150709 | União das freguesias de Atalaia e Alto Estanqueiro-Jardia | Montijo |
| 150710 | União das freguesias de Montijo e Afonsoeiro | Montijo |
| 150711 | União das freguesias de Pegões | Montijo |
| 150806 | União das freguesias de Poceirão e Marateca | Palmela |
| 151007 | União das freguesias do Seixal, Arrentela e Aldeia de Paio Pires | Seixal |
| 151101 | Sesimbra (Castelo) | Sesimbra |
| 151102 | Sesimbra (Santiago) | Sesimbra |
| 151205 | Setúbal (São Sebastião) | Setúbal |
| 151209 | União das freguesias de Azeitão (São Lourenço e São Simão) | Setúbal |
| 151210 | União das freguesias de Setúbal (São Julião, Nossa Senhora da Anunciada e Santa Maria da Graça) | Setúbal |
| 310301 | Imaculado Coração de Maria | Funchal |
| 310302 | Monte | Funchal |
| 310303 | Funchal (Santa Luzia) | Funchal |
| 310304 | Funchal (Santa Maria Maior) | Funchal |
| 310305 | Santo António | Funchal |
| 310306 | São Gonçalo | Funchal |
| 310307 | São Martinho | Funchal |
| 310308 | Funchal (São Pedro) | Funchal |
| 310309 | São Roque | Funchal |
| 310310 | Funchal (Sé) | Funchal |
