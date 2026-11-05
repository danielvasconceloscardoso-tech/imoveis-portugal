/** Compact, source-backed place services for the Regressar experience.
 * Only three already-public free-card records per category, or one nearest
 * record where detailed coverage is absent. Not an exhaustive directory.
 * Driving estimates are OSRM free-flow from the recorded origin, never live traffic.
 * See docs/ISSUE-10-LIFE.md. No fresh primary-source verification is claimed. */
import { HOUSING_DEFAULTS, housingPayment, type RegressarPlace } from './regressar-places';
export type LifeService = {
 name: string; kind: string; curriculum?: string; municipality?: string;
 minutes: number | null; km: number; distanceMode: 'drive' | 'straight-line';
 sourceUrl: string; sourceLabel: string; checkedOn: string;
};
export type PlaceLife = {
 id: string; coverage: 'detailed-drive' | 'nearest-straight-line' | 'unavailable';
 origin: {name:string;lat:number;lon:number}|null; checkedOn:string|null;
 schools: readonly LifeService[]; hospitals: readonly LifeService[];
 schoolCoverage: 'selected-private-and-international' | 'nearest-international-only' | 'unavailable';
 sourceRecord: string|null;
};
export const REGRESSAR_LIFE: Readonly<Record<string, PlaceLife>> = {
 "gondomar": {
  "id": "gondomar",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal de Gondomar, Praça Manuel Guedes",
   "lat": 41.14402,
   "lon": -8.53652
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "Colégio Paulo VI",
    "kind": "private",
    "curriculum": "Portuguese national curriculum, pre-school to secondary",
    "municipality": "Gondomar",
    "minutes": 3,
    "km": 1.8,
    "distanceMode": "drive",
    "sourceUrl": "https://www.colegiopaulovi.com/",
    "sourceLabel": "School website / DGEEC InfoEscolas",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio Camões",
    "kind": "private",
    "curriculum": "Portuguese national curriculum, 1st cycle to secondary",
    "municipality": "Gondomar",
    "minutes": 9,
    "km": 9.4,
    "distanceMode": "drive",
    "sourceUrl": "https://colegiocamoes.com/",
    "sourceLabel": "School website / DGEEC InfoEscolas",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio Luso-Francês",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (Franciscanas Missionárias de Nossa Senhora, since 1936)",
    "municipality": "Porto",
    "minutes": 11,
    "km": 10.6,
    "distanceMode": "drive",
    "sourceUrl": "https://www.lusofrances.pt/",
    "sourceLabel": "School website / DGEEC InfoEscolas",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital-Escola Fernando Pessoa",
    "kind": "private hospital (university teaching hospital)",
    "minutes": 2,
    "km": 1.0,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 119118, HOSPITAL-ESCOLA DA UNIVERSIDADE FERNANDO PESSOA, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital de Santo António",
    "kind": "public central hospital (SNS)",
    "minutes": 13,
    "km": 9.3,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 136523, UNIDADE HOSPITALAR DE SANTO ANTÓNIO, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital de São João",
    "kind": "public central hospital (SNS)",
    "minutes": 13,
    "km": 11.9,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 104641, HOSPITAL DE SÃO JOÃO, EPE (CHSJ-PORTO), Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/gondomar.json"
 },
 "braga": {
  "id": "braga",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal de Braga",
   "lat": 41.550914,
   "lon": -8.428451
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "Externato Carvalho Araújo",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle)",
    "municipality": "Braga",
    "minutes": 3,
    "km": 2.0,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/braga.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Externato Paulo VI",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Braga",
    "minutes": 4,
    "km": 1.4,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/braga.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio D. Diogo de Sousa",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Braga",
    "minutes": 4,
    "km": 1.9,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/braga.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital Privado de Braga Centro",
    "kind": "private hospital",
    "minutes": 4,
    "km": 2.5,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 133945, HOSPITAL PRIVADO DE BRAGA CENTRO, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Lusíadas Braga",
    "kind": "private hospital",
    "minutes": 4,
    "km": 2.4,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 149134, HOSPITAL LUSÍADAS BRAGA, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital de Braga",
    "kind": "public hospital (SNS)",
    "minutes": 5,
    "km": 3.7,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 111724, HOSPITAL DE BRAGA, Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/braga.json"
 },
 "matosinhos": {
  "id": "matosinhos",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal de Matosinhos",
   "lat": 41.183187,
   "lon": -8.68324
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "CLIP – Oporto International School",
    "kind": "international",
    "curriculum": "British curriculum; lists itself as a Cambridge School, accredited by the Council of International Schools",
    "municipality": "Porto",
    "minutes": 4,
    "km": 2.6,
    "distanceMode": "drive",
    "sourceUrl": "https://www.clip.pt/en/contacts",
    "sourceLabel": "School website / DGEEC InfoEscolas",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio INED - Polo I",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary)",
    "municipality": "Porto",
    "minutes": 5,
    "km": 3.0,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/matosinhos.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio INED - Polo II",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (3rd cycle, 2nd cycle)",
    "municipality": "Porto",
    "minutes": 6,
    "km": 3.8,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/matosinhos.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital CUF Porto",
    "kind": "private hospital",
    "minutes": 4,
    "km": 2.7,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 118601, HOSPITAL CUF PORTO, SA, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Pedro Hispano",
    "kind": "public hospital (SNS)",
    "minutes": 5,
    "km": 2.8,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 104477, HOSPITAL PEDRO HISPANO, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Privado da Boa Nova",
    "kind": "private hospital",
    "minutes": 8,
    "km": 8.1,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 113119, HOSPITAL PRIVADO DA BOA NOVA, Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/matosinhos.json"
 },
 "porto": {
  "id": "porto",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal do Porto",
   "lat": 41.150093,
   "lon": -8.610667
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "Colégio Ribadouro",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Porto",
    "minutes": 3,
    "km": 1.5,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/porto.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio de Nossa Senhora da Paz",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Porto",
    "minutes": 3,
    "km": 1.9,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/porto.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Grande Colégio Universal",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Porto",
    "minutes": 3,
    "km": 1.7,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/porto.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital CUF Trindade",
    "kind": "private hospital",
    "minutes": 1,
    "km": 0.4,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 143003, HOSPITAL CUF TRINDADE, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital de Santo António",
    "kind": "public hospital (SNS)",
    "minutes": 2,
    "km": 0.9,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 136523, UNIDADE HOSPITALAR DE SANTO ANTÓNIO, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Santa Maria",
    "kind": "private hospital",
    "minutes": 3,
    "km": 1.6,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 106196, HOSPITAL SANTA MARIA - PORTO, Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/porto.json"
 },
 "lisboa": {
  "id": "lisboa",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Lisboa",
   "lat": 38.7463,
   "lon": -9.1514
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "Queen Elizabeth's School",
    "kind": "international",
    "curriculum": "British",
    "municipality": "Lisboa",
    "minutes": null,
    "km": 1.5,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/lisboa.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital de Santa Maria",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 0.9,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/lisboa.json"
 },
 "cascais": {
  "id": "cascais",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Cascais",
   "lat": 38.7294,
   "lon": -9.4378
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "St. George's School",
    "kind": "international",
    "curriculum": "British",
    "municipality": "Cascais",
    "minutes": null,
    "km": 1.1,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/cascais.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital de Cascais Dr. José de Almeida",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 1.7,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/cascais.json"
 },
 "vila-do-conde": {
  "id": "vila-do-conde",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal de Vila do Conde",
   "lat": 41.354229,
   "lon": -8.743352
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "Colégio do Forte",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Vila do Conde",
    "minutes": 4,
    "km": 2.3,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/vila-do-conde.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio de Amorim",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle)",
    "municipality": "Póvoa de Varzim",
    "minutes": 8,
    "km": 7.7,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/vila-do-conde.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Unidade Hospitalar de Vila do Conde",
    "kind": "public hospital (SNS)",
    "minutes": 1,
    "km": 0.4,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 124937, UNIDADE HOSPITALAR DE VILA DO CONDE, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital da Luz Póvoa de Varzim",
    "kind": "private hospital",
    "minutes": 4,
    "km": 3.6,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 105263, HOSPITAL DA LUZ, PÓVOA DE VARZIM, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Unidade Hospitalar da Póvoa de Varzim",
    "kind": "public hospital (SNS)",
    "minutes": 5,
    "km": 4.1,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 104485, UNIDADE HOSPITALAR DE POVOA DE VARZIM, Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/vila-do-conde.json"
 },
 "lagos": {
  "id": "lagos",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Lagos",
   "lat": 37.154,
   "lon": -8.728
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "Barlavento International Primary School",
    "kind": "international",
    "curriculum": "British",
    "municipality": "Lagos",
    "minutes": null,
    "km": 5.5,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/lagos.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital de Lagos",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 7.4,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/lagos.json"
 },
 "viana-do-castelo": {
  "id": "viana-do-castelo",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Viana do Castelo",
   "lat": 41.7115,
   "lon": -8.7531
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "CLIB - The Braga International School",
    "kind": "international",
    "curriculum": "IB",
    "municipality": "Braga",
    "minutes": null,
    "km": 34.1,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/viana-do-castelo.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital de Santa Luzia",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 6.8,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/viana-do-castelo.json"
 },
 "espinho": {
  "id": "espinho",
  "coverage": "detailed-drive",
  "origin": {
   "name": "Câmara Municipal de Espinho",
   "lat": 41.008992,
   "lon": -8.63944
  },
  "checkedOn": "2026-11-03",
  "schools": [
   {
    "name": "Externato Oliveira Martins",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary)",
    "municipality": "Espinho",
    "minutes": 2,
    "km": 0.7,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/espinho.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio das Terras de Santa Maria",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle)",
    "municipality": "Santa Maria da Feira",
    "minutes": 9,
    "km": 8.7,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/espinho.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Colégio de Lamas",
    "kind": "private",
    "curriculum": "Portuguese national curriculum (secondary, 3rd cycle, 2nd cycle, 1st cycle)",
    "municipality": "Santa Maria da Feira",
    "minutes": 13,
    "km": 9.5,
    "distanceMode": "drive",
    "sourceUrl": "/data/map/place/espinho.json",
    "sourceLabel": "DGEEC InfoEscolas · recorded free-card list",
    "checkedOn": "2026-11-03"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital Nossa Senhora da Ajuda",
    "kind": "public hospital (SNS)",
    "minutes": 4,
    "km": 1.7,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 151733, UNIDADE 3 - HOSPITAL N. Sª AJUDA - ESPINHO, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Lusíadas Santa Maria da Feira",
    "kind": "private hospital",
    "minutes": 14,
    "km": 14.6,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 168079, HOSPITAL LUSÍADAS SANTA MARIA DA FEIRA, Registado",
    "checkedOn": "2026-11-03"
   },
   {
    "name": "Hospital Eduardo Santos Silva",
    "kind": "public hospital (SNS)",
    "minutes": 17,
    "km": 15.9,
    "distanceMode": "drive",
    "sourceUrl": "https://www2.ers.pt/DMZ/Pesquisa/Pesquisa.aspx",
    "sourceLabel": "ERS registo 114621, UNIDADE 1 - HOSPITAL EDUARDO SANTOS SILVA, Registado",
    "checkedOn": "2026-11-03"
   }
  ],
  "schoolCoverage": "selected-private-and-international",
  "sourceRecord": "/data/map/place/espinho.json"
 },
 "guimaraes": {
  "id": "guimaraes",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Guimarães",
   "lat": 41.4685,
   "lon": -8.3285
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "CLIB - The Braga International School",
    "kind": "international",
    "curriculum": "IB",
    "municipality": "Braga",
    "minutes": null,
    "km": 12.3,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/guimaraes.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital da Senhora da Oliveira",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 3.5,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/guimaraes.json"
 },
 "povoa-de-varzim": {
  "id": "povoa-de-varzim",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Póvoa de Varzim",
   "lat": 41.4237,
   "lon": -8.7495
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "CLIP - Oporto International School",
    "kind": "international",
    "curriculum": "British",
    "municipality": "Porto",
    "minutes": null,
    "km": 28.6,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/povoa-de-varzim.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital da Póvoa de Varzim",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 4.6,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/povoa-de-varzim.json"
 },
 "aveiro": {
  "id": "aveiro",
  "coverage": "nearest-straight-line",
  "origin": {
   "name": "Aveiro",
   "lat": 40.6481,
   "lon": -8.6213
  },
  "checkedOn": "2026",
  "schools": [
   {
    "name": "Oporto British School",
    "kind": "international",
    "curriculum": "British",
    "municipality": "Porto",
    "minutes": null,
    "km": 56.3,
    "distanceMode": "straight-line",
    "sourceUrl": "/data/map/place/aveiro.json",
    "sourceLabel": "Recorded international-school list · school sites / OpenStreetMap",
    "checkedOn": "2026"
   }
  ],
  "hospitals": [
   {
    "name": "Hospital Infante D. Pedro",
    "kind": "public emergency hospital",
    "minutes": null,
    "km": 3.2,
    "distanceMode": "straight-line",
    "sourceUrl": "https://www.sns.gov.pt",
    "sourceLabel": "SNS · recorded nearest public emergency hospital",
    "checkedOn": "2026"
   }
  ],
  "schoolCoverage": "nearest-international-only",
  "sourceRecord": "/data/map/place/aveiro.json"
 }
};

/** Unknown places get an explicit empty state; no borrowed city data. */
export function getPlaceLife(id:string):PlaceLife {
 return REGRESSAR_LIFE[id] ?? {id,coverage:'unavailable',origin:null,checkedOn:null,schools:[],hospitals:[],schoolCoverage:'unavailable',sourceRecord:null};
}
export type PurchasingPowerOptions = {
 budgetShare?:number;depositPercent?:number;annualRate?:number;termYears?:number;
};
export type PurchasingPower = {
 housingBudget:number;maxLoan:number;maxPurchasePrice:number;deposit:number;
 maxBuyAreaM2:number;maxRentAreaM2:number;
 assumptions:{budgetShare:number;depositPercent:number;annualRate:number;termYears:number};
};
/** An illustrative monthly-payment ceiling, NOT a loan offer/approval or a claim
 * that a deposit is available. No taxes, fees, insurance, maintenance or other
 * living costs are included; INE medians are not available property listings.
 * Floating precision is retained; the UI should round indicative area DOWN.
 */
export function purchasingPower(netMonthly:number,place:Pick<RegressarPlace,'priceM2'|'rentM2'>,options:PurchasingPowerOptions={}):PurchasingPower|null {
 const assumptions={budgetShare:options.budgetShare??HOUSING_DEFAULTS.budgetShare,depositPercent:options.depositPercent??HOUSING_DEFAULTS.depositPercent,annualRate:options.annualRate??HOUSING_DEFAULTS.annualRate,termYears:options.termYears??HOUSING_DEFAULTS.termYears};
 const {budgetShare,depositPercent,annualRate,termYears}=assumptions;
 if(![netMonthly,place.priceM2,place.rentM2,...Object.values(assumptions)].every(Number.isFinite)||netMonthly<=0||place.priceM2<=0||place.rentM2<=0||budgetShare<=0||budgetShare>1||depositPercent<0||depositPercent>=100||annualRate<0||annualRate>30||termYears<1||termYears>50)return null;
 const housingBudget=netMonthly*budgetShare;
 const maxLoan=housingBudget/housingPayment(1,annualRate,termYears);
 const maxPurchasePrice=maxLoan/(1-depositPercent/100);
 return {housingBudget,maxLoan,maxPurchasePrice,deposit:maxPurchasePrice*depositPercent/100,maxBuyAreaM2:maxPurchasePrice/place.priceM2,maxRentAreaM2:housingBudget/place.rentM2,assumptions};
}
