// Country chapter of the per-edition cost e-books. Only facts from content/facts/facts.csv:
// each item lists the fact ids it rests on, and build.ts adds their sources to the e-book.
// Left out until verified (content/faq/UNVERIFIED.md): Luxembourg filing rules, how France taxes
// Portuguese rent under the treaty, Israel's own rules, Swiss 3a conditions.
import type { Lang } from "../src/i18n";

export type Ed = "lu" | "fr" | "ch" | "br" | "us" | "il";
export const EDS: Ed[] = ["lu", "fr", "ch", "br", "us", "il"];
type Item = { facts: string[]; text: Record<Lang, string> };
export type Country = { name: Record<Lang, string>; h: Record<Lang, string>; items: Item[]; note: Record<Lang, string> };

// Shared items: tax representative inside or outside the EU/EEA, and the non-resident IMT rate.
const repEU: Item = {
  facts: ["pt-tax-rep"],
  text: {
    pt: "Representante fiscal: como reside num Estado-membro da UE, nomear um representante fiscal em Portugal é opcional.",
    en: "Tax representative: as you live in an EU member state, appointing a tax representative in Portugal is optional.",
    fr: "Représentant fiscal : comme vous résidez dans un État membre de l'UE, désigner un représentant fiscal au Portugal est facultatif.",
  },
};
const repOut = (pt: string, en: string, fr: string): Item => ({
  facts: ["pt-tax-rep", "pt-nif-nonresident"],
  text: {
    pt: `Representante fiscal: ${pt} não pertence à UE nem ao EEE. Depois da compra tem 15 dias para nomear um representante fiscal em Portugal ou aderir às notificações eletrónicas das Finanças.`,
    en: `Tax representative: ${en} is outside the EU and the EEA. After the purchase you have 15 days to appoint a tax representative in Portugal or sign up for the tax authority's electronic notifications.`,
    fr: `Représentant fiscal : ${fr} ne fait partie ni de l'UE ni de l'EEE. Après l'achat, vous avez 15 jours pour désigner un représentant fiscal au Portugal ou adhérer aux notifications électroniques des Finances.`,
  },
});
const imtNonRes: Item = {
  facts: ["pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions"],
  text: {
    pt: "IMT: se não for residente fiscal em Portugal, paga a taxa única de 7,5%, salvo as exceções da secção 2. Se já foi residente fiscal em Portugal, leia a exceção (a) e confirme o seu caso com um profissional.",
    en: "IMT: if you are not a Portuguese tax resident, you pay the flat 7.5%, unless one of the exceptions in section 2 applies. If you were once a Portuguese tax resident, read exception (a) and check your case with a professional.",
    fr: "IMT : si vous n'êtes pas résident fiscal au Portugal, vous payez le taux unique de 7,5 %, sauf exception de la section 2. Si vous avez déjà été résident fiscal au Portugal, lisez l'exception (a) et faites vérifier votre cas par un professionnel.",
  },
};
const imtMove: Item = {
  facts: ["pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions"],
  text: {
    pt: "IMT: se não for residente fiscal em Portugal, paga a taxa única de 7,5%. Se se tornar residente fiscal em Portugal nos dois anos seguintes à compra, paga primeiro os 7,5% e pede a devolução da diferença no prazo de seis meses.",
    en: "IMT: if you are not a Portuguese tax resident, you pay the flat 7.5%. If you become a Portuguese tax resident within two years of the purchase, you pay 7.5% first and claim back the difference within six months.",
    fr: "IMT : si vous n'êtes pas résident fiscal au Portugal, vous payez le taux unique de 7,5 %. Si vous devenez résident fiscal au Portugal dans les deux ans suivant l'achat, vous payez d'abord 7,5 % puis demandez le remboursement de la différence dans les six mois.",
  },
};
const rentPT: Item = {
  facts: ["pt-rent-tax-nonresident"],
  text: {
    pt: "Rendas em Portugal: as rendas de habitação de não residentes pagam 25% em Portugal, com reduções para contratos longos.",
    en: "Rent in Portugal: residential rent earned by non-residents is taxed at 25% in Portugal, with reductions for long leases.",
    fr: "Loyers au Portugal : les loyers d'habitation des non-résidents sont imposés à 25 % au Portugal, avec des réductions pour les baux longs.",
  },
};
const askTax = {
  pt: "O que não está neste guia: as regras de declaração do país onde vive dependem do seu caso. Fale com um consultor fiscal.",
  en: "Not covered here: the filing rules of the country where you live depend on your situation. Talk to a tax adviser.",
  fr: "Hors de ce guide : les obligations déclaratives de votre pays dépendent de votre situation. Adressez-vous à un conseiller fiscal.",
};

export const COUNTRIES: Record<Ed, Country> = {
  lu: {
    name: { pt: "Luxemburgo", en: "Luxembourg", fr: "Luxembourg" },
    h: { pt: "Se vive no Luxemburgo", en: "If you live in Luxembourg", fr: "Si vous vivez au Luxembourg" },
    items: [
      repEU,
      imtNonRes,
      rentPT,
      {
        facts: ["lu-pt-treaty-property"],
        text: {
          pt: "Rendas no Luxemburgo: a convenção entre Portugal e o Luxemburgo dá a Portugal o direito de tributar os rendimentos de imóveis situados em Portugal. O Luxemburgo isenta esse rendimento, mas pode tê-lo em conta para calcular a taxa sobre o resto do seu rendimento.",
          en: "Rent in Luxembourg: the Portugal–Luxembourg tax treaty gives Portugal the right to tax income from property located in Portugal. Luxembourg exempts that income but may take it into account to set the rate on the rest of your income.",
          fr: "Loyers au Luxembourg : la convention entre le Portugal et le Luxembourg donne au Portugal le droit d'imposer les revenus des biens situés au Portugal. Le Luxembourg exonère ces revenus, mais peut en tenir compte pour fixer le taux sur le reste de vos revenus.",
        },
      },
    ],
    note: askTax,
  },
  fr: {
    name: { pt: "França", en: "France", fr: "France" },
    h: { pt: "Se vive em França", en: "If you live in France", fr: "Si vous vivez en France" },
    items: [
      repEU,
      imtNonRes,
      {
        facts: ["fr-3916"],
        text: {
          pt: "Contas em Portugal: quem é residente fiscal em França declara todos os anos cada conta bancária aberta, detida, usada ou encerrada no estrangeiro (formulário 3916-3916 bis), mesmo que não seja usada. Inclui a conta aberta em Portugal para a compra.",
          en: "Accounts in Portugal: French tax residents declare every bank account opened, held, used or closed abroad each year (form 3916-3916 bis), even if it is not used. That includes an account opened in Portugal for the purchase.",
          fr: "Comptes au Portugal : un résident fiscal français déclare chaque année tout compte bancaire ouvert, détenu, utilisé ou clos à l'étranger (formulaire 3916-3916 bis), même inutilisé. Cela inclut le compte ouvert au Portugal pour l'achat.",
        },
      },
      {
        facts: ["pt-rent-tax-nonresident"],
        text: {
          pt: "Rendas: as rendas de habitação de não residentes pagam 25% em Portugal, com reduções para contratos longos. A convenção fiscal entre Portugal e França fixa a forma como França as tem em conta.",
          en: "Rent: residential rent earned by non-residents is taxed at 25% in Portugal, with reductions for long leases. The Portugal–France tax treaty sets how France takes it into account.",
          fr: "Loyers : les loyers d'habitation des non-résidents sont imposés à 25 % au Portugal, avec des réductions pour les baux longs. La convention fiscale franco-portugaise fixe la façon dont la France en tient compte.",
        },
      },
    ],
    note: askTax,
  },
  ch: {
    name: { pt: "Suíça", en: "Switzerland", fr: "Suisse" },
    h: { pt: "Se vive na Suíça", en: "If you live in Switzerland", fr: "Si vous vivez en Suisse" },
    items: [
      repOut("a Suíça", "Switzerland", "la Suisse"),
      imtNonRes,
      {
        facts: ["ch-2nd-pillar-abroad"],
        text: {
          pt: "2.º pilar (LPP): pode ser levantado antecipadamente para a sua residência principal, na Suíça ou no estrangeiro; não para uma casa de férias. O levantamento mínimo é de 20 000 CHF.",
          en: "2nd pillar (LPP/BVG): it can be withdrawn early for your main residence, in Switzerland or abroad; not for a holiday home. The minimum withdrawal is 20,000 CHF.",
          fr: "2e pilier (LPP) : il peut être retiré de manière anticipée pour votre résidence principale, en Suisse ou à l'étranger ; pas pour une résidence secondaire. Le retrait minimum est de 20 000 CHF.",
        },
      },
      {
        facts: ["ch-2p-conditions"],
        text: {
          pt: "Condições do 2.º pilar: um imóvel de cada vez; um levantamento a cada 5 anos; pedido até 3 anos antes das prestações de reforma; a partir dos 50 anos, limitado à prestação de saída aos 50 anos ou a metade da atual; consentimento escrito do cônjuge ou parceiro registado.",
          en: "2nd-pillar conditions: one property at a time; one withdrawal every 5 years; requested at the latest 3 years before retirement benefits; from age 50, limited to the vested benefit at 50 or half the current one; written consent of the spouse or registered partner.",
          fr: "Conditions du 2e pilier : un seul logement à la fois ; un retrait tous les 5 ans ; demande au plus tard 3 ans avant les prestations de vieillesse ; dès 50 ans, limité à la prestation de libre passage à 50 ans ou à la moitié de l'actuelle ; consentement écrit du conjoint ou partenaire enregistré.",
        },
      },
      {
        facts: ["ch-2p-effects"],
        text: {
          pt: "Efeitos: o levantamento reduz as prestações futuras e tem de ser reembolsado se vender a casa, salvo se reinvestir noutra habitação própria em 2 anos. O reembolso mínimo é de 10 000 CHF.",
          en: "Effects: the withdrawal reduces your future benefits and must be repaid if you sell the home, unless you reinvest in a new own home within 2 years. The minimum repayment is 10,000 CHF.",
          fr: "Effets : le retrait réduit vos prestations futures et doit être remboursé en cas de vente, sauf réinvestissement dans un nouveau logement en propriété dans les 2 ans. Le remboursement minimum est de 10 000 CHF.",
        },
      },
      {
        facts: ["ch-2p-pledge"],
        text: {
          pt: "Em vez de levantar, pode dar em penhor os direitos de previdência para obter melhores condições de financiamento, em condições semelhantes.",
          en: "Instead of withdrawing, you can pledge your pension rights to obtain better financing terms, under similar conditions.",
          fr: "Au lieu de retirer, vous pouvez mettre en gage vos droits de prévoyance pour obtenir de meilleures conditions de financement, à des conditions similaires.",
        },
      },
      {
        facts: ["ch-3a-home"],
        text: {
          pt: "Pilar 3a: pode ser levantado antecipadamente para adquirir habitação para uso próprio ou amortizar um crédito à habitação. As condições, como prazos e idade, não estão neste guia.",
          en: "Pillar 3a: it can be withdrawn early to buy a home for your own use or to repay a mortgage. Its conditions, such as frequency and age limits, are not covered here.",
          fr: "Pilier 3a : il peut être retiré de manière anticipée pour acquérir un logement pour vos propres besoins ou rembourser un prêt hypothécaire. Ses conditions, comme la fréquence et l'âge, ne sont pas traitées ici.",
        },
      },
    ],
    note: {
      pt: "Fonte das regras suíças: Office fédéral des assurances sociales (OFAS). A sua caixa de pensões aplica-as ao seu caso.",
      en: "Source of the Swiss rules: Federal Social Insurance Office (FSIO). Your pension fund applies them to your case.",
      fr: "Source des règles suisses : Office fédéral des assurances sociales (OFAS). Votre caisse de pension les applique à votre cas.",
    },
  },
  br: {
    name: { pt: "Brasil", en: "Brazil", fr: "Brésil" },
    h: { pt: "Se vive no Brasil", en: "If you live in Brazil", fr: "Si vous vivez au Brésil" },
    items: [
      {
        facts: ["pt-nonresidents-buy", "pt-visa-own-income", "pt-cplp-residence"],
        text: {
          pt: "Visto: para comprar não precisa. Para viver em Portugal precisa de um visto de residência, por exemplo o de quem vive de rendimentos próprios (conhecido como D7) ou o visto CPLP, que depois dá acesso à autorização de residência emitida pela AIMA.",
          en: "Visa: you do not need one to buy. To live in Portugal you need a residence visa, for example the one for people living on their own income (known as D7) or the CPLP visa, which then gives access to the residence permit issued by AIMA.",
          fr: "Visa : il n'en faut pas pour acheter. Pour vivre au Portugal, il faut un visa de résidence, par exemple celui des personnes vivant de leurs propres revenus (dit D7) ou le visa CPLP, qui donne ensuite accès au titre de séjour délivré par l'AIMA.",
        },
      },
      repOut("o Brasil", "Brazil", "le Brésil"),
      imtMove,
      {
        facts: ["br-bens-exterior"],
        text: {
          pt: "Imposto de renda: se é residente fiscal no Brasil, a casa entra em Bens e Direitos da declaração do IRPF, pelo valor de compra em moeda estrangeira, convertido em dólares e depois em reais à cotação de venda do Banco Central na data da compra.",
          en: "Income tax: if you are a Brazilian tax resident, the home goes in the Bens e Direitos section of the IRPF return, at the purchase price in foreign currency, converted to dollars and then to reais at the Banco Central selling rate on the purchase date.",
          fr: "Impôt sur le revenu : si vous êtes résident fiscal au Brésil, le bien se déclare dans la rubrique Bens e Direitos de l'IRPF, au prix d'achat en devise, converti en dollars puis en reais au cours vendeur de la Banco Central à la date d'achat.",
        },
      },
      {
        facts: ["br-cbe"],
        text: {
          pt: "CBE: com bens no estrangeiro de 1 milhão de dólares ou mais a 31 de dezembro, há ainda a declaração anual de Capitais Brasileiros no Exterior ao Banco Central.",
          en: "CBE: with assets abroad of US$ 1 million or more on 31 December, you also file the yearly declaration of Brazilian capital abroad (CBE) with the Banco Central.",
          fr: "CBE : avec des avoirs à l'étranger de 1 million de dollars ou plus au 31 décembre, il faut aussi la déclaration annuelle des capitaux brésiliens à l'étranger (CBE) à la Banco Central.",
        },
      },
    ],
    note: askTax,
  },
  us: {
    name: { pt: "Estados Unidos", en: "United States", fr: "États-Unis" },
    h: { pt: "Se vive nos Estados Unidos", en: "If you live in the United States", fr: "Si vous vivez aux États-Unis" },
    items: [
      repOut("os Estados Unidos", "the United States", "les États-Unis"),
      imtMove,
      {
        facts: ["us-fbar"],
        text: {
          pt: "FBAR: os US persons entregam o FBAR à FinCEN, separado da declaração de impostos, quando o valor somado das contas no estrangeiro passa de 10 000 USD em algum momento do ano.",
          en: "FBAR: US persons file an FBAR with FinCEN, separately from the tax return, when the combined value of their foreign accounts goes over $10,000 at any time in the year.",
          fr: "FBAR : les US persons déposent un FBAR auprès du FinCEN, à part de la déclaration d'impôts, lorsque la valeur totale de leurs comptes à l'étranger dépasse 10 000 USD à un moment de l'année.",
        },
      },
      {
        facts: ["us-8938-abroad"],
        text: {
          pt: "Formulário 8938: para quem vive fora dos Estados Unidos, aplica-se com ativos no estrangeiro acima de 200 000 USD no fim do ano ou 300 000 USD em qualquer momento (declaração individual; 400 000 e 600 000 USD em conjunto). Os limites para quem vive nos Estados Unidos são outros e não estão neste guia.",
          en: "Form 8938: for taxpayers living outside the US, it applies with foreign assets over $200,000 at year end or $300,000 at any time (single; $400,000 and $600,000 joint). The thresholds for people living in the US differ and are not covered here.",
          fr: "Formulaire 8938 : pour les contribuables vivant hors des États-Unis, il s'applique au-delà de 200 000 USD d'avoirs étrangers en fin d'année ou 300 000 USD à tout moment (déclaration individuelle ; 400 000 et 600 000 USD en commun). Les seuils pour les résidents des États-Unis sont différents et ne sont pas traités ici.",
        },
      },
      {
        facts: ["us-pt-treaty-gains"],
        text: {
          pt: "Venda: pela convenção entre Portugal e os Estados Unidos, Portugal pode tributar as mais-valias de imóveis em Portugal, e os Estados Unidos mantêm o direito de tributar os seus cidadãos. O crédito por imposto estrangeiro (formulário 1116) evita a dupla tributação.",
          en: "Selling: under the Portugal–US tax treaty, Portugal may tax gains on property in Portugal, and the US keeps the right to tax its citizens. The foreign tax credit (Form 1116) avoids double taxation.",
          fr: "Vente : selon la convention entre le Portugal et les États-Unis, le Portugal peut imposer les plus-values sur les biens situés au Portugal, et les États-Unis gardent le droit d'imposer leurs citoyens. Le crédit d'impôt étranger (formulaire 1116) évite la double imposition.",
        },
      },
    ],
    note: askTax,
  },
  il: {
    name: { pt: "Israel", en: "Israel", fr: "Israël" },
    h: { pt: "Se vive em Israel", en: "If you live in Israel", fr: "Si vous vivez en Israël" },
    items: [
      repOut("Israel", "Israel", "Israël"),
      imtMove,
      rentPT,
      {
        facts: ["il-pt-treaty-property"],
        text: {
          pt: "Rendas em Israel: pela convenção entre Portugal e Israel, Portugal pode tributar os rendimentos de imóveis em Portugal, e Israel, como país de residência, dá um crédito pelo imposto pago em Portugal.",
          en: "Rent in Israel: under the Portugal–Israel tax treaty, Portugal may tax income from property in Portugal, and Israel, as your country of residence, allows a credit for the tax paid in Portugal.",
          fr: "Loyers en Israël : selon la convention entre le Portugal et Israël, le Portugal peut imposer les revenus des biens situés au Portugal, et Israël, pays de résidence, accorde un crédit pour l'impôt payé au Portugal.",
        },
      },
    ],
    note: {
      pt: "O que não está neste guia: a forma como Israel calcula o seu próprio imposto segue as regras israelitas. Fale com um consultor fiscal.",
      en: "Not covered here: how Israel calculates its own tax follows Israeli rules. Talk to a tax adviser.",
      fr: "Hors de ce guide : le calcul de l'impôt israélien suit les règles israéliennes. Adressez-vous à un conseiller fiscal.",
    },
  },
};
