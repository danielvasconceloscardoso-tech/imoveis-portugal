/** Issue 10: deliberately small, source-backed mainland discovery sample.
 * Latest medians copied from prices.json; no historical/paid dataset is bundled.
 * Provenance and matching thresholds: docs/ISSUE-10-PLACES.md. */
import type { Lang, EdCode } from "../i18n";
import { pathFor } from "../i18n";

export type Preference = "beach" | "surf" | "golf" | "art" | "food" | "schools" | "airport" | "business" | "quiet";
export const VERIFIED_PREFERENCES: readonly Preference[] = ["beach", "golf", "art", "food", "schools", "airport"];
export type HousingMode = "rent" | "buy";
export type PlaceEvidence = { value: number | null; unit: string; detail: string; source: string; checked: string };
export type RegressarPlace = {
  id: string; name: string; lat: number; lon: number; priceM2: number; rentM2: number; period: string;
  photo: string; alt: Record<Lang, string>; photoCredit: string; line: Record<Lang, string>;
  evidence: Partial<Record<Preference, PlaceEvidence>>;
};
export const REGRESSAR_PLACES: readonly RegressarPlace[] = [
  {
    "id": "gondomar",
    "name": "Gondomar",
    "lat": 41.14402,
    "lon": -8.53652,
    "priceM2": 2348,
    "rentM2": 9.03,
    "period": "2026-Q2",
    "photo": "/img/v2/gondomar-aerial-dusk-1024.webp",
    "alt": {
      "pt": "O Douro ao entardecer, de Valbom à ponte do Freixo, com o Porto ao fundo; imagem do promotor com o O'rizon Living na margem",
      "en": "The Douro at dusk, from Valbom to the Freixo bridge, with Porto beyond; the developer's image with O'rizon Living on the bank",
      "fr": "Le Douro au crépuscule, de Valbom au pont do Freixo, avec Porto au loin ; image du promoteur avec O'rizon Living sur la rive"
    },
    "photoCredit": "Shalu Investments",
    "line": {
      "pt": "O Douro à porta, de Gramido a Melres, e os Aliados a 12 minutos de carro.",
      "en": "The Douro on the doorstep, from Gramido to Melres, and downtown Porto 12 minutes away by car.",
      "fr": "Le Douro au pas de la porte, de Gramido à Melres, et le centre de Porto à 12 minutes en voiture."
    },
    "evidence": {
      "airport": {
        "value": 17,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 13.0,
        "unit": "km-straight-line",
        "detail": "Deutsche Schule zu Porto",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "braga",
    "name": "Braga",
    "lat": 41.55091,
    "lon": -8.42845,
    "priceM2": 2199,
    "rentM2": 8.68,
    "period": "2026-Q2",
    "photo": "/img/v2/braga-bom-jesus-por-do-sol-1024.webp",
    "alt": {
      "pt": "Braga ao pôr do sol, vista do Bom Jesus do Monte",
      "en": "Braga at sunset, seen from Bom Jesus do Monte",
      "fr": "Braga au coucher du soleil, vue depuis le Bom Jesus do Monte"
    },
    "photoCredit": "",
    "line": {
      "pt": "A cidade vista do Bom Jesus do Monte, e a Praia da Apúlia a 27 minutos de carro.",
      "en": "The city seen from Bom Jesus do Monte, and Praia da Apúlia 27 minutes away by car.",
      "fr": "La ville vue depuis le Bom Jesus do Monte, et la Praia da Apúlia à 27 minutes en voiture."
    },
    "evidence": {
      "airport": {
        "value": 40,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 5.1,
        "unit": "km-straight-line",
        "detail": "CLIB - The Braga International School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "art": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Eduardo Souto de Moura, Pritzker Architecture Prize 2011",
        "source": "https://www.pritzkerprize.com/laureates/2011",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "matosinhos",
    "name": "Matosinhos",
    "lat": 41.18319,
    "lon": -8.68324,
    "priceM2": 3183,
    "rentM2": 12.48,
    "period": "2026-Q2",
    "photo": "/img/v2/matosinhos-leixoes-por-do-sol-1024.webp",
    "alt": {
      "pt": "Pôr do sol na praia de Matosinhos, com o terminal de cruzeiros de Leixões em silhueta",
      "en": "Sunset on Matosinhos beach, the Leixões cruise terminal in silhouette",
      "fr": "Coucher de soleil sur la plage de Matosinhos, le terminal de croisières de Leixões en silhouette"
    },
    "photoCredit": "",
    "line": {
      "pt": "O mar de Matosinhos a Leça da Palmeira, e os Aliados a 12 minutos de carro.",
      "en": "The sea from Matosinhos to Leça da Palmeira, and downtown Porto 12 minutes away by car.",
      "fr": "La mer de Matosinhos à Leça da Palmeira, et le centre de Porto à 12 minutes en voiture."
    },
    "evidence": {
      "beach": {
        "value": 1.1,
        "unit": "km-straight-line",
        "detail": "MATOSINHOS",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "airport": {
        "value": 7,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 3.2,
        "unit": "km-straight-line",
        "detail": "CLIP - Oporto International School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 1,
        "unit": "listed-open-courses",
        "detail": "City Golf",
        "source": "https://www.visitportugal.com/en/content/city-golf",
        "checked": "2026-10-28"
      },
      "art": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Álvaro Siza, Pritzker Architecture Prize 1992",
        "source": "https://www.pritzkerprize.com/laureates/1992",
        "checked": "2026-11-03"
      },
      "food": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Matosinhos joined the UNESCO Creative Cities Network for gastronomy",
        "source": "https://www.cm-matosinhos.pt/servicos/comunicacao-e-imagem/noticias/noticia/matosinhos-e-cidade-criativa-da-unesco",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "porto",
    "name": "Porto",
    "lat": 41.15009,
    "lon": -8.61067,
    "priceM2": 3631,
    "rentM2": 14.48,
    "period": "2026-Q2",
    "photo": "/img/v2/porto-douro-entardecer-1024.webp",
    "alt": {
      "pt": "O Douro e a ponte Luís I ao entardecer, Porto",
      "en": "The Douro and the Luís I bridge at sunset, Porto",
      "fr": "Le Douro et le pont Luís I au coucher du soleil, Porto"
    },
    "photoCredit": "",
    "line": {
      "pt": "O Douro e o Atlântico, da Ribeira à Foz, e a Praia do Castelo do Queijo a 10 minutos de carro.",
      "en": "The Douro and the Atlantic, from the Ribeira to Foz, and Praia do Castelo do Queijo 10 minutes away by car.",
      "fr": "Le Douro et l'Atlantique, de la Ribeira à Foz, et la Praia do Castelo do Queijo à 10 minutes en voiture."
    },
    "evidence": {
      "beach": {
        "value": 5.4,
        "unit": "km-straight-line",
        "detail": "LAVADORES",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "airport": {
        "value": 12,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 2.7,
        "unit": "km-straight-line",
        "detail": "Deutsche Schule zu Porto",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "art": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Álvaro Siza, Pritzker Architecture Prize 1992",
        "source": "https://www.pritzkerprize.com/laureates/1992",
        "checked": "2026-11-03"
      },
      "food": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Antiqvvm, Porto, in the MICHELIN Guide 2026",
        "source": "https://guide.michelin.com/pt/pt_PT/porto-region/porto/restaurant/antiqvvm",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "lisboa",
    "name": "Lisboa",
    "lat": 38.74953,
    "lon": -9.15019,
    "priceM2": 5192,
    "rentM2": 17.43,
    "period": "2026-Q2",
    "photo": "/img/v2/lisboa-castelo-por-do-sol-1024.webp",
    "alt": {
      "pt": "Lisboa vista do Castelo de São Jorge ao pôr do sol, os telhados e o Tejo",
      "en": "Lisbon from São Jorge Castle at sunset, the rooftops and the Tagus",
      "fr": "Lisbonne depuis le château de São Jorge au coucher du soleil, les toits et le Tage"
    },
    "photoCredit": "",
    "line": {
      "pt": "Lisboa vista do Castelo de São Jorge ao pôr do sol, os telhados e o Tejo",
      "en": "Lisbon from São Jorge Castle at sunset, the rooftops and the Tagus",
      "fr": "Lisbonne depuis le château de São Jorge au coucher du soleil, les toits et le Tage"
    },
    "evidence": {
      "airport": {
        "value": 4,
        "unit": "km-straight-line",
        "detail": "LIS",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 1.5,
        "unit": "km-straight-line",
        "detail": "Queen Elizabeth's School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 1,
        "unit": "listed-open-courses",
        "detail": "Clube de Golfe do Paço do Lumiar",
        "source": "https://www.visitportugal.com/en/NR/exeres/ACF12CE6-A664-479C-9FB3-C747AE5783AF",
        "checked": "2026-10-28"
      }
    }
  },
  {
    "id": "cascais",
    "name": "Cascais",
    "lat": 38.7294,
    "lon": -9.4378,
    "priceM2": 4889,
    "rentM2": 16.83,
    "period": "2026-Q2",
    "photo": "/img/v2/cascais-baia-1024.webp",
    "alt": {
      "pt": "A baía de Cascais, pequenos barcos e a vila",
      "en": "The bay of Cascais, small boats and the old town",
      "fr": "La baie de Cascais, ses petits bateaux et la vieille ville"
    },
    "photoCredit": "",
    "line": {
      "pt": "A baía de Cascais, pequenos barcos e a vila",
      "en": "The bay of Cascais, small boats and the old town",
      "fr": "La baie de Cascais, ses petits bateaux et la vieille ville"
    },
    "evidence": {
      "schools": {
        "value": 1.1,
        "unit": "km-straight-line",
        "detail": "St. George's School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 3,
        "unit": "listed-open-courses",
        "detail": "Oitavos Dunes",
        "source": "https://www.visitportugal.com/en/NR/exeres/465756C2-933D-48AF-B6DE-D8EB971AA8B8",
        "checked": "2026-10-28"
      },
      "art": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Eduardo Souto de Moura, Pritzker Architecture Prize 2011",
        "source": "https://www.pritzkerprize.com/laureates/2011",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "vila-do-conde",
    "name": "Vila do Conde",
    "lat": 41.35423,
    "lon": -8.74335,
    "priceM2": 2333,
    "rentM2": 8.67,
    "period": "2026-Q2",
    "photo": "/img/v2/vila-do-conde-foz-do-ave-do-ar-1024.webp",
    "alt": {
      "pt": "A foz do Ave e Vila do Conde vistas do ar, o mar ao fundo",
      "en": "The mouth of the Ave and Vila do Conde from the air, the sea beyond",
      "fr": "L'embouchure de l'Ave et Vila do Conde vues du ciel, la mer au loin"
    },
    "photoCredit": "",
    "line": {
      "pt": "O mar e o Ave, a 41 minutos da Trindade de metro.",
      "en": "The sea and the Ave, 41 minutes from Trindade by metro.",
      "fr": "La mer et l'Ave, à 41 minutes de Trindade en métro."
    },
    "evidence": {
      "beach": {
        "value": 1.2,
        "unit": "km-straight-line",
        "detail": "FRENTE URBANA NORTE",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "airport": {
        "value": 13,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "art": {
        "value": null,
        "unit": "verified-place-fact",
        "detail": "Vila do Conde museum network",
        "source": "https://www.cm-viladoconde.pt/servicos/servicos-municipais/cultura-e-lazer/museu-de-vila-do-conde",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "lagos",
    "name": "Lagos",
    "lat": 37.10835,
    "lon": -8.67791,
    "priceM2": 3949,
    "rentM2": 12.77,
    "period": "2026-Q2",
    "photo": "/img/v2/algarve-porto-de-mos-1024.webp",
    "alt": {
      "pt": "As falésias douradas sobre a praia de Porto de Mós, Lagos",
      "en": "Golden cliffs above Porto de Mós beach, Lagos",
      "fr": "Les falaises dorées au-dessus de la plage de Porto de Mós, Lagos"
    },
    "photoCredit": "",
    "line": {
      "pt": "As falésias douradas sobre a praia de Porto de Mós, Lagos",
      "en": "Golden cliffs above Porto de Mós beach, Lagos",
      "fr": "Les falaises dorées au-dessus de la plage de Porto de Mós, Lagos"
    },
    "evidence": {
      "beach": {
        "value": 1.5,
        "unit": "km-straight-line",
        "detail": "BATATA",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 5.5,
        "unit": "km-straight-line",
        "detail": "Barlavento International Primary School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 3,
        "unit": "listed-open-courses",
        "detail": "Espiche Golf",
        "source": "https://www.visitportugal.com/en/content/espiche-golf",
        "checked": "2026-10-28"
      }
    }
  },
  {
    "id": "viana-do-castelo",
    "name": "Viana do Castelo",
    "lat": 41.6946,
    "lon": -8.82942,
    "priceM2": 1938,
    "rentM2": 7.8,
    "period": "2026-Q2",
    "photo": "/img/v2/viana-do-castelo-telhados-santa-luzia-1024.webp",
    "alt": {
      "pt": "Os telhados de Viana do Castelo e o monte de Santa Luzia",
      "en": "The rooftops of Viana do Castelo and Mount Santa Luzia",
      "fr": "Les toits de Viana do Castelo et le mont Santa Luzia"
    },
    "photoCredit": "",
    "line": {
      "pt": "Os telhados de Viana do Castelo e o monte de Santa Luzia",
      "en": "The rooftops of Viana do Castelo and Mount Santa Luzia",
      "fr": "Les toits de Viana do Castelo et le mont Santa Luzia"
    },
    "evidence": {
      "beach": {
        "value": 1.4,
        "unit": "km-straight-line",
        "detail": "FOZ DO LIMA",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "espinho",
    "name": "Espinho",
    "lat": 41.00899,
    "lon": -8.63944,
    "priceM2": 2797,
    "rentM2": 10.03,
    "period": "2026-Q2",
    "photo": "/img/v2/espinho-barrinha-por-do-sol-1024.webp",
    "alt": {
      "pt": "Pôr do sol sobre a Barrinha de Esmoriz, a Lagoa de Paramos, em Espinho",
      "en": "Sunset over the Barrinha de Esmoriz, the Paramos lagoon, Espinho",
      "fr": "Coucher de soleil sur la Barrinha de Esmoriz, la lagune de Paramos, à Espinho"
    },
    "photoCredit": "",
    "line": {
      "pt": "O Atlântico à porta, da Praia da Baía à Lagoa de Paramos, e os Aliados a 23 minutos de carro.",
      "en": "The Atlantic on the doorstep, from Praia da Baía to the Paramos lagoon, and downtown Porto 23 minutes away by car.",
      "fr": "L'Atlantique au pas de la porte, de la Praia da Baía à la lagune de Paramos, et le centre de Porto à 23 minutes en voiture."
    },
    "evidence": {
      "beach": {
        "value": 0.6,
        "unit": "km-straight-line",
        "detail": "ESPINHO-BAÍA",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "airport": {
        "value": 27,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 1,
        "unit": "listed-open-courses",
        "detail": "Oporto Golf Club",
        "source": "https://www.visitportugal.com/en/NR/exeres/47F6D261-DC7B-4375-86A1-014EEDA1D785",
        "checked": "2026-10-28"
      }
    }
  },
  {
    "id": "guimaraes",
    "name": "Guimarães",
    "lat": 41.44427,
    "lon": -8.29216,
    "priceM2": 1859,
    "rentM2": 6.92,
    "period": "2026-Q2",
    "photo": "/img/v2/guimaraes-paco-dos-duques-castelo-1024.webp",
    "alt": {
      "pt": "O Paço dos Duques e o castelo de Guimarães vistos do ar, a cidade e as serras ao fundo",
      "en": "The Palace of the Dukes and Guimarães castle from the air, the town and hills beyond",
      "fr": "Le palais des Ducs et le château de Guimarães vus du ciel, la ville et les collines au loin"
    },
    "photoCredit": "",
    "line": {
      "pt": "O Paço dos Duques e o castelo de Guimarães vistos do ar, a cidade e as serras ao fundo",
      "en": "The Palace of the Dukes and Guimarães castle from the air, the town and hills beyond",
      "fr": "Le palais des Ducs et le château de Guimarães vus du ciel, la ville et les collines au loin"
    },
    "evidence": {
      "airport": {
        "value": 39,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "schools": {
        "value": 12.3,
        "unit": "km-straight-line",
        "detail": "CLIB - The Braga International School",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      }
    }
  },
  {
    "id": "povoa-de-varzim",
    "name": "Póvoa de Varzim",
    "lat": 41.37956,
    "lon": -8.75997,
    "priceM2": 2472,
    "rentM2": 9.09,
    "period": "2026-Q2",
    "photo": "/img/v2/povoa-de-varzim-cabo-santo-andre-1024.webp",
    "alt": {
      "pt": "A costa do Cabo de Santo André, dunas e mar, Póvoa de Varzim",
      "en": "The coast at Cabo de Santo André, dunes and sea, Póvoa de Varzim",
      "fr": "La côte du cap de Santo André, dunes et mer, Póvoa de Varzim"
    },
    "photoCredit": "",
    "line": {
      "pt": "A costa do Cabo de Santo André, dunas e mar, Póvoa de Varzim",
      "en": "The coast at Cabo de Santo André, dunes and sea, Póvoa de Varzim",
      "fr": "La côte du cap de Santo André, dunes et mer, Póvoa de Varzim"
    },
    "evidence": {
      "beach": {
        "value": 0.8,
        "unit": "km-straight-line",
        "detail": "ZONA URBANA SUL II",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      },
      "airport": {
        "value": 16,
        "unit": "km-straight-line",
        "detail": "OPO",
        "source": "https://www.openstreetmap.org/copyright",
        "checked": "2026-11-03"
      },
      "golf": {
        "value": 1,
        "unit": "listed-open-courses",
        "detail": "Estela Golf Club",
        "source": "https://www.visitportugal.com/en/NR/exeres/40A015D9-6AED-412F-9A5F-6495DAEDA60E",
        "checked": "2026-10-28"
      }
    }
  },
  {
    "id": "aveiro",
    "name": "Aveiro",
    "lat": 40.64027,
    "lon": -8.65362,
    "priceM2": 2391,
    "rentM2": 9.75,
    "period": "2026-Q2",
    "photo": "/img/v2/aveiro-ria-de-aveiro-1024.webp",
    "alt": {
      "pt": "Aveiro: Ria de Aveiro",
      "en": "Aveiro: Ria de Aveiro",
      "fr": "Aveiro : Ria de Aveiro"
    },
    "photoCredit": "",
    "line": {
      "pt": "Aveiro: Ria de Aveiro",
      "en": "Aveiro: Ria de Aveiro",
      "fr": "Aveiro : Ria de Aveiro"
    },
    "evidence": {
      "beach": {
        "value": 6.3,
        "unit": "km-straight-line",
        "detail": "JARDIM DE OUDINOT",
        "source": "https://inspire.apambiente.pt/",
        "checked": "2026-11-03"
      }
    }
  }
];

export const HOUSING_DEFAULTS = Object.freeze({ areaM2: 80, budgetShare: 0.35, depositPercent: 20, annualRate: 3, termYears: 30 });
export type HousingAssumptions = typeof HOUSING_DEFAULTS;
export type RankedCity = RegressarPlace & {
  monthlyHousing: number; housingShare: number; remainingMonthly: number;
  purchasePrice: number; deposit: number; loan: number;
  matchedPreferences: Preference[];
};
export type RankCitiesInput = {
  netMonthly: number; preferences?: readonly Preference[]; housingMode?: HousingMode;
  areaM2?: number; budgetShare?: number; depositPercent?: number; annualRate?: number; termYears?: number;
};
export type CityDiscovery = {
  matches: RankedCity[]; unsupportedPreferences: Preference[];
  reason: "matched" | "invalid-input" | "unsupported-preference" | "no-affordable-match";
  assumptions: { areaM2: number; budgetShare: number; depositPercent: number; annualRate: number; termYears: number; housingMode: HousingMode };
};

/** Nominal fixed-rate repayment; excludes insurance, bank fees and purchase taxes.
 * Rate is a scenario assumption, not a financing offer or approval. */
export function housingPayment(principal: number, annualRate: number, termYears: number): number {
  if (![principal, annualRate, termYears].every(Number.isFinite) || principal < 0 || annualRate < 0 || termYears <= 0) return NaN;
  const n = termYears * 12;
  if (annualRate === 0) return principal / n;
  const r = annualRate / 1200;
  return principal * r / (1 - Math.pow(1 + r, -n));
}

/** Every selected taste is a hard filter. A cinematic reveal never bypasses affordability.
 * All money checks use unrounded values; display rounding cannot admit an over-budget city. */
export function rankCities(input: RankCitiesInput): CityDiscovery {
  const assumptions = {
    ...HOUSING_DEFAULTS,
    areaM2: input.areaM2 ?? HOUSING_DEFAULTS.areaM2,
    budgetShare: input.budgetShare ?? HOUSING_DEFAULTS.budgetShare,
    depositPercent: input.depositPercent ?? HOUSING_DEFAULTS.depositPercent,
    annualRate: input.annualRate ?? HOUSING_DEFAULTS.annualRate,
    termYears: input.termYears ?? HOUSING_DEFAULTS.termYears,
    housingMode: input.housingMode ?? "rent" as HousingMode,
  };
  const preferences = [...new Set(input.preferences ?? [])];
  const unsupportedPreferences = preferences.filter(p => !VERIFIED_PREFERENCES.includes(p));
  const result = (reason: CityDiscovery["reason"], matches: RankedCity[] = []): CityDiscovery => ({ matches, unsupportedPreferences, reason, assumptions });
  if (!Number.isFinite(input.netMonthly) || input.netMonthly <= 0 ||
      !Object.values(assumptions).filter(v => typeof v === "number").every(Number.isFinite) ||
      assumptions.areaM2 <= 0 || assumptions.areaM2 > 500 || assumptions.budgetShare <= 0 || assumptions.budgetShare > 1 ||
      assumptions.depositPercent < 0 || assumptions.depositPercent > 100 || assumptions.annualRate < 0 || assumptions.annualRate > 30 ||
      assumptions.termYears < 1 || assumptions.termYears > 50 || !["rent", "buy"].includes(assumptions.housingMode)) return result("invalid-input");
  if (unsupportedPreferences.length) return result("unsupported-preference");
  const max = input.netMonthly * assumptions.budgetShare;
  const matches: RankedCity[] = [];
  for (const place of REGRESSAR_PLACES) {
    if (!preferences.every(p => !!place.evidence[p])) continue;
    const purchasePrice = place.priceM2 * assumptions.areaM2;
    const deposit = purchasePrice * assumptions.depositPercent / 100;
    const loan = purchasePrice - deposit;
    const monthlyHousing = assumptions.housingMode === "rent"
      ? place.rentM2 * assumptions.areaM2
      : housingPayment(loan, assumptions.annualRate, assumptions.termYears);
    if (!Number.isFinite(monthlyHousing) || monthlyHousing < 0 || monthlyHousing > max) continue;
    matches.push({ ...place, monthlyHousing, housingShare: monthlyHousing / input.netMonthly,
      remainingMonthly: input.netMonthly - monthlyHousing, purchasePrice, deposit, loan,
      matchedPreferences: preferences });
  }
  // Deterministic: greatest budget headroom first, then slug. No lottery, hidden weights or paid ranking.
  matches.sort((a, b) => a.monthlyHousing - b.monthlyHousing || a.id.localeCompare(b.id));
  return result(matches.length ? "matched" : "no-affordable-match", matches);
}

/** The current main map owns interaction/camera state; no Golf or shared map modules are changed. */
export function regressarMapHref(id: string, lang: Lang = "pt", ed: EdCode = "lu"): string {
  return `${pathFor(lang, ed, "map")}?place=${encodeURIComponent(id)}`;
}
