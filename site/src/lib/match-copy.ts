/** Prompt 81: the matching engine's words, PT, EN and FR. Functional register (content/METHOD.md): nouns and numbers.
 * The engine returns structured reasons (lib/match.ts); this file only turns them into lines. Pure: no DOM. */
import { TASTE_RULES, TASTES, WEIGHTS, TOP_N, MAX_PER_REGION, type Taste, type MeasureKey, type Reason, type Tradeoff, type TradeSide, type MatchResult, type MatchOutcome, type Importance } from "./match";

export type MatchLang = "pt" | "en" | "fr";
const LOCALE: Record<MatchLang, string> = { pt: "pt-PT", en: "en-US", fr: "fr-FR" };
const nf = (lang: MatchLang, v: number, digits = 1) => new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: digits }).format(v);
/** Euros as the rest of the page writes them (Intl, per language). Whole euros are rounded down, so a line never overstates the room left. */
const money = (lang: MatchLang, v: number, digits: number) => new Intl.NumberFormat(LOCALE[lang], { style: "currency", currency: "EUR", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
const eur = (lang: MatchLang, v: number) => money(lang, Math.floor(v + 1e-9), 0);
const lowerFirst = (s: string, lang: MatchLang) => s.charAt(0).toLocaleLowerCase(LOCALE[lang]) + s.slice(1);

export const TASTE_LABELS: Record<MatchLang, Record<Taste, string>> = {
  pt: { beach: "Praia", isch: "Escola internacional", schools: "Escolas", health: "Hospital", airport: "Aeroporto", train: "Comboio", food: "Gastronomia", golf: "Golfe", culture: "Cultura", quiet: "Tranquilidade" },
  en: { beach: "Beach", isch: "International school", schools: "Schools", health: "Hospital", airport: "Airport", train: "Train", food: "Food", golf: "Golf", culture: "Culture", quiet: "Quiet" },
  fr: { beach: "Plage", isch: "École internationale", schools: "Écoles", health: "Hôpital", airport: "Aéroport", train: "Train", food: "Gastronomie", golf: "Golf", culture: "Culture", quiet: "Calme" },
};
export const IMPORTANCE_LABELS: Record<MatchLang, Record<Importance, string>> = {
  pt: { nice: "Desejável", essential: "Essencial" },
  en: { nice: "Nice to have", essential: "Essential" },
  fr: { nice: "Souhaitable", essential: "Essentiel" },
};

/** A drive time that rounds to zero reads "under 1 min", never "0 min" (the card says the same). */
const LT1: Record<MatchLang, string> = { pt: "menos de 1", en: "under 1", fr: "moins d’1" };
const mn = (lang: MatchLang, v: string): string => (v === "0" ? LT1[lang] : v);
/** A measure and its value as a short phrase: "Beach 17 min", "4 international schools within 30 min". */
const PHRASES: Record<MatchLang, Record<MeasureKey, (v: string, one: boolean) => string>> = {
  pt: {
    beach_min: v => `Praia a ${mn("pt", v)} min`, isch_min: v => `Escola internacional a ${mn("pt", v)} min`,
    isch_n30: (v, one) => `${v} ${one ? "escola internacional" : "escolas internacionais"} a menos de 30 min`,
    sec_n20: (v, one) => `${v} ${one ? "escola secundária pública" : "escolas secundárias públicas"} a menos de 20 min`,
    er_min: v => `Urgência hospitalar a ${mn("pt", v)} min`, air_min: v => `Aeroporto a ${mn("pt", v)} min`, rail_min: v => `Estação de comboio a ${mn("pt", v)} min`,
    mich_n30: (v, one) => `${v} ${one ? "restaurante" : "restaurantes"} no Guia Michelin a menos de 30 min`,
    mkt_n20: (v, one) => `${v} ${one ? "mercado" : "mercados"} a menos de 20 min`,
    golf_min: v => `Golfe a ${mn("pt", v)} min`, golf_n30: (v, one) => `${v} ${one ? "campo" : "campos"} de golfe a menos de 30 min`,
    cult_n20: (v, one) => `${v} ${one ? "museu ou teatro" : "museus e teatros"} a menos de 20 min`,
    dens: v => `${v} residentes por km²`,
  },
  en: {
    beach_min: v => `Beach ${mn("en", v)} min`, isch_min: v => `International school ${mn("en", v)} min`,
    isch_n30: (v, one) => `${v} international ${one ? "school" : "schools"} within 30 min`,
    sec_n20: (v, one) => `${v} public secondary ${one ? "school" : "schools"} within 20 min`,
    er_min: v => `Emergency hospital ${mn("en", v)} min`, air_min: v => `Airport ${mn("en", v)} min`, rail_min: v => `Train station ${mn("en", v)} min`,
    mich_n30: (v, one) => `${v} Michelin-listed ${one ? "restaurant" : "restaurants"} within 30 min`,
    mkt_n20: (v, one) => `${v} ${one ? "market" : "markets"} within 20 min`,
    golf_min: v => `Golf ${mn("en", v)} min`, golf_n30: (v, one) => `${v} golf ${one ? "course" : "courses"} within 30 min`,
    cult_n20: (v, one) => `${v} ${one ? "museum or theatre" : "museums and theatres"} within 20 min`,
    dens: v => `${v} residents per km²`,
  },
  fr: {
    beach_min: v => `Plage à ${mn("fr", v)} min`, isch_min: v => `École internationale à ${mn("fr", v)} min`,
    isch_n30: (v, one) => `${v} ${one ? "école internationale" : "écoles internationales"} à moins de 30 min`,
    sec_n20: (v, one) => `${v} ${one ? "lycée public" : "lycées publics"} à moins de 20 min`,
    er_min: v => `Urgences hospitalières à ${mn("fr", v)} min`, air_min: v => `Aéroport à ${mn("fr", v)} min`, rail_min: v => `Gare à ${mn("fr", v)} min`,
    mich_n30: (v, one) => `${v} ${one ? "restaurant" : "restaurants"} au Guide Michelin à moins de 30 min`,
    mkt_n20: (v, one) => `${v} ${one ? "marché" : "marchés"} à moins de 20 min`,
    golf_min: v => `Golf à ${mn("fr", v)} min`, golf_n30: (v, one) => `${v} ${one ? "golf" : "golfs"} à moins de 30 min`,
    cult_n20: (v, one) => `${v} ${one ? "musée ou théâtre" : "musées et théâtres"} à moins de 20 min`,
    dens: v => `${v} habitants au km²`,
  },
};
/** The value as the reader sees it: residents per km² in whole numbers (the table keeps one decimal; scores do not change). */
const shown = (key: MeasureKey, value: number) => (key === "dens" ? Math.round(value) : value);
export const measurePhrase = (key: MeasureKey, value: number, lang: MatchLang): string => PHRASES[lang][key](nf(lang, shown(key, value)), shown(key, value) === 1);

/** The trade-off in plain words: what the next place is, compared with this one, when it does better and when it does
 * worse on a measure. Drive times: closer or farther. Counts: more or fewer. Residents per km²: quieter or busier. */
const COMPARE: Record<MatchLang, Record<MeasureKey, [better: string, worse: string]>> = {
  pt: {
    beach_min: ["mais perto da praia", "mais longe da praia"], isch_min: ["mais perto de uma escola internacional", "mais longe de uma escola internacional"],
    isch_n30: ["mais escolas internacionais a menos de 30 min", "menos escolas internacionais a menos de 30 min"],
    sec_n20: ["mais escolas secundárias públicas a menos de 20 min", "menos escolas secundárias públicas a menos de 20 min"],
    er_min: ["mais perto de uma urgência hospitalar", "mais longe de uma urgência hospitalar"], air_min: ["mais perto do aeroporto", "mais longe do aeroporto"],
    rail_min: ["mais perto de uma estação de comboio", "mais longe de uma estação de comboio"],
    mich_n30: ["mais restaurantes no Guia Michelin a menos de 30 min", "menos restaurantes no Guia Michelin a menos de 30 min"],
    mkt_n20: ["mais mercados a menos de 20 min", "menos mercados a menos de 20 min"],
    golf_min: ["mais perto de um campo de golfe", "mais longe de um campo de golfe"], golf_n30: ["mais campos de golfe a menos de 30 min", "menos campos de golfe a menos de 30 min"],
    cult_n20: ["mais museus e teatros a menos de 20 min", "menos museus e teatros a menos de 20 min"], dens: ["mais tranquilo", "mais movimentado"],
  },
  en: {
    beach_min: ["closer to the beach", "farther from the beach"], isch_min: ["closer to an international school", "farther from an international school"],
    isch_n30: ["more international schools within 30 min", "fewer international schools within 30 min"],
    sec_n20: ["more public secondary schools within 20 min", "fewer public secondary schools within 20 min"],
    er_min: ["closer to an emergency hospital", "farther from an emergency hospital"], air_min: ["closer to the airport", "farther from the airport"],
    rail_min: ["closer to a train station", "farther from a train station"],
    mich_n30: ["more Michelin-listed restaurants within 30 min", "fewer Michelin-listed restaurants within 30 min"],
    mkt_n20: ["more markets within 20 min", "fewer markets within 20 min"],
    golf_min: ["closer to a golf course", "farther from a golf course"], golf_n30: ["more golf courses within 30 min", "fewer golf courses within 30 min"],
    cult_n20: ["more museums and theatres within 20 min", "fewer museums and theatres within 20 min"], dens: ["quieter", "busier"],
  },
  fr: {
    beach_min: ["plus près de la plage", "plus loin de la plage"], isch_min: ["plus près d’une école internationale", "plus loin d’une école internationale"],
    isch_n30: ["plus d’écoles internationales à moins de 30 min", "moins d’écoles internationales à moins de 30 min"],
    sec_n20: ["plus de lycées publics à moins de 20 min", "moins de lycées publics à moins de 20 min"],
    er_min: ["plus près des urgences hospitalières", "plus loin des urgences hospitalières"], air_min: ["plus près de l’aéroport", "plus loin de l’aéroport"],
    rail_min: ["plus près d’une gare", "plus loin d’une gare"],
    mich_n30: ["plus de restaurants au Guide Michelin à moins de 30 min", "moins de restaurants au Guide Michelin à moins de 30 min"],
    mkt_n20: ["plus de marchés à moins de 20 min", "moins de marchés à moins de 20 min"],
    golf_min: ["plus près d’un golf", "plus loin d’un golf"], golf_n30: ["plus de golfs à moins de 30 min", "moins de golfs à moins de 30 min"],
    cult_n20: ["plus de musées et théâtres à moins de 20 min", "moins de musées et théâtres à moins de 20 min"], dens: ["plus calme", "plus animé"],
  },
};
/** The unit that follows the next place's value in a comparison ("12 min", "73 residents per km²"); counts carry none. */
const UNIT: Record<MatchLang, (key: MeasureKey) => string> = {
  pt: key => (key.endsWith("_min") ? " min" : key === "dens" ? " residentes por km²" : ""),
  en: key => (key.endsWith("_min") ? " min" : key === "dens" ? " residents per km²" : ""),
  fr: key => (key.endsWith("_min") ? " min" : key === "dens" ? " habitants au km²" : ""),
};

const WORDS = {
  pt: {
    under: (v: string) => `${v} por mês abaixo do seu orçamento`, atLimit: "no limite do seu orçamento",
    rent: (v: string, q: string) => `renda mediana ${v}/m² (INE, ${q})`, buy: (v: string, q: string) => `preço mediano ${v}/m² (INE, ${q})`,
    noData: "sem dados", next: (n: string) => `A seguir, ${n}`, against: (a: string, b: string) => `${a} contra ${b} aqui`,
    cheaper: (v: string) => `menos ${v} por mês`, dearer: (v: string) => `mais ${v} por mês`,
    tie: "Alguns destes lugares empatam em pontos; primeiro vem o custo mensal mais baixo.", score: (s: string, level: string, w: number) => `pontuação ${s} de 1 · ${level} (×${w})`,
    same: "igual nos seus gostos e no custo", points: (p: string, m: string) => `${p} de ${m} ${m === "1" ? "ponto" : "pontos"}`,
    weights: `Essencial conta ${WEIGHTS.essential}, desejável conta ${WEIGHTS.nice}. Um lugar com zero num essencial fica de fora.`,
    spread: `Desceu: no máximo ${MAX_PER_REGION} lugares por região nos ${TOP_N} primeiros.`,
    fit: (n: string) => `${n} lugares dentro do orçamento.`, fitOne: "1 lugar dentro do orçamento.",
    out: { budget: (n: string) => `${n} acima do orçamento`, rent: (n: string) => `${n} sem mediana de renda do INE`, sale: (n: string) => `${n} sem mediana de preço do INE`, essential: (n: string) => `${n} por um essencial` },
    left: "Fora", noEssential: "Nenhum lugar dentro do orçamento cumpre todos os essenciais. Passe um a desejável.",
    noService: "Os dados de serviços ainda não cobrem este gosto.",
    rule: `No máximo ${MAX_PER_REGION} lugares por região nos ${TOP_N} primeiros.`, ties: "Empates: primeiro o custo mensal mais baixo.",
    hard: "Um lugar acima do orçamento nunca aparece.", missing: "Sem dados para um gosto: sem pontos, e o cartão indica-o.",
    none: "Nenhum lugar cabe neste orçamento.", map: "Ver no mapa",
    how: "Como ordenamos", paid: "Ninguém paga para subir na lista.",
  },
  en: {
    under: (v: string) => `${v} a month under your budget`, atLimit: "at your budget limit",
    rent: (v: string, q: string) => `median rent ${v}/m² (INE, ${q})`, buy: (v: string, q: string) => `median price ${v}/m² (INE, ${q})`,
    noData: "no data", next: (n: string) => `Next, ${n}`, against: (a: string, b: string) => `${a} against ${b} here`,
    cheaper: (v: string) => `${v} a month less`, dearer: (v: string) => `${v} a month more`,
    tie: "Some of these places tie on points; the lower monthly cost comes first.", score: (s: string, level: string, w: number) => `score ${s} of 1 · ${level} (×${w})`,
    same: "the same on your tastes and cost", points: (p: string, m: string) => `${p} of ${m} ${m === "1" ? "point" : "points"}`,
    weights: `Essential counts ${WEIGHTS.essential}, nice to have counts ${WEIGHTS.nice}. A place that scores zero on an essential is left out.`,
    spread: `Moved down: at most ${MAX_PER_REGION} places per region in the first ${TOP_N}.`,
    fit: (n: string) => `${n} places within the budget.`, fitOne: "1 place within the budget.",
    out: { budget: (n: string) => `${n} above the budget`, rent: (n: string) => `${n} with no INE rent median`, sale: (n: string) => `${n} with no INE price median`, essential: (n: string) => `${n} on an essential` },
    left: "Left out", noEssential: "No place within the budget meets every essential. Move one to nice to have.",
    noService: "The services data does not cover this taste yet.",
    rule: `At most ${MAX_PER_REGION} places per region in the first ${TOP_N}.`, ties: "Ties: the lower monthly cost comes first.",
    hard: "A place above the budget is never shown.", missing: "No data for a taste: no points for it, and the card says so.",
    none: "No place fits this budget.", map: "View on map",
    how: "How we rank", paid: "Nobody can pay to move up the list.",
  },
  fr: {
    under: (v: string) => `${v} par mois sous votre budget`, atLimit: "à la limite de votre budget",
    rent: (v: string, q: string) => `loyer médian ${v}/m² (INE, ${q})`, buy: (v: string, q: string) => `prix médian ${v}/m² (INE, ${q})`,
    noData: "pas de données", next: (n: string) => `Ensuite, ${n}`, against: (a: string, b: string) => `${a} contre ${b} ici`,
    cheaper: (v: string) => `${v} de moins par mois`, dearer: (v: string) => `${v} de plus par mois`,
    tie: "Certains de ces lieux sont à égalité de points ; le coût mensuel le plus bas passe d’abord.", score: (s: string, level: string, w: number) => `score ${s} sur 1 · ${level} (×${w})`,
    same: "identique sur vos goûts et le coût", points: (p: string, m: string) => `${p} sur ${m} ${m === "1" ? "point" : "points"}`,
    weights: `Essentiel compte ${WEIGHTS.essential}, souhaitable compte ${WEIGHTS.nice}. Un lieu à zéro sur un essentiel est écarté.`,
    spread: `Descendu : ${MAX_PER_REGION} lieux par région au plus dans les ${TOP_N} premiers.`,
    fit: (n: string) => `${n} lieux dans le budget.`, fitOne: "1 lieu dans le budget.",
    out: { budget: (n: string) => `${n} au-dessus du budget`, rent: (n: string) => `${n} sans loyer médian INE`, sale: (n: string) => `${n} sans prix médian INE`, essential: (n: string) => `${n} pour un essentiel` },
    left: "Écartés", noEssential: "Aucun lieu dans le budget ne remplit tous les essentiels. Passez-en un en souhaitable.",
    noService: "Les données de services ne couvrent pas encore ce goût.",
    rule: `${MAX_PER_REGION} lieux par région au plus dans les ${TOP_N} premiers.`, ties: "Égalité : le coût mensuel le plus bas d’abord.",
    hard: "Un lieu au-dessus du budget n’apparaît jamais.", missing: "Pas de données pour un goût : pas de points, et la fiche l’indique.",
    none: "Aucun lieu n’entre dans ce budget.", map: "Voir sur la carte",
    how: "Notre classement", paid: "Personne ne paie pour monter dans la liste.",
  },
} as const;
export const matchWords = (lang: MatchLang) => WORDS[lang];
const colon = (lang: MatchLang) => (lang === "fr" ? " : " : ": ");

export function formatReason(r: Reason, lang: MatchLang): string {
  const w = WORDS[lang];
  if (r.kind === "taste") return measurePhrase(r.key, r.value, lang);
  if (r.kind === "budget") return r.under >= 1 ? w.under(eur(lang, r.under)) : w.atLimit;
  return r.mode === "rent" ? w.rent(money(lang, r.value, 2), r.period) : w.buy(money(lang, r.value, 0), r.period);
}
/** The result's two or three reasons on one line, then each chosen taste the place has no data for. */
export function formatReasons(result: Pick<MatchResult, "reasons" | "unknown">, lang: MatchLang): string {
  const parts = result.reasons.map((r, i) => { const s = formatReason(r, lang); return i === 0 ? s.charAt(0).toLocaleUpperCase(LOCALE[lang]) + s.slice(1) : lowerFirst(s, lang); });
  for (const t of result.unknown) parts.push(`${lowerFirst(TASTE_LABELS[lang][t], lang)}${colon(lang)}${WORDS[lang].noData}`);
  return parts.join(" · ");
}
function side(s: TradeSide, good: boolean, lang: MatchLang): string {
  const w = WORDS[lang];
  if (s.kind === "cost") return (good ? w.cheaper : w.dearer)(eur(lang, s.diff));
  // "farther from the beach, 12 min against 6 here"; "busier, 73 residents per km² against 56 here".
  return `${COMPARE[lang][s.key][good ? 0 : 1]}, ${w.against(nf(lang, shown(s.key, s.next)) + UNIT[lang](s.key), nf(lang, shown(s.key, s.here)))}`;
}
/** One line against the next result: what the next place does better and worse. Empty for the last result. */
export function formatTradeoff(t: Tradeoff | null, lang: MatchLang): string {
  if (!t) return "";
  const w = WORDS[lang], parts = [t.better ? side(t.better, true, lang) : "", t.worse ? side(t.worse, false, lang) : ""].filter(Boolean);
  return `${w.next(t.nextName)}${colon(lang)}${parts.length ? parts.join(lang === "fr" ? " ; " : "; ") : w.same}.`;
}
/** One quiet line when equal points decided the order between two neighbours in the list shown; empty otherwise. */
export function formatTie(listed: readonly Pick<MatchResult, "points" | "maxPoints">[], lang: MatchLang): string {
  return listed.some((m, i) => i > 0 && m.maxPoints > 0 && m.points === listed[i - 1].points) ? WORDS[lang].tie : "";
}
/** One chosen taste on the place's card, in words: its numbers, its score out of 1, and how much it counts. */
export function formatTasteLine(t: Pick<MatchResult["tastes"][number], "taste" | "importance" | "weight" | "score" | "parts">, lang: MatchLang): string {
  if (t.score === null) return `${TASTE_LABELS[lang][t.taste]}${colon(lang)}${WORDS[lang].noData}`;
  const score = new Intl.NumberFormat(LOCALE[lang], { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(t.score);
  return `${t.parts.map(part => measurePhrase(part.key, part.value, lang)).join(" · ")} · ${WORDS[lang].score(score, lowerFirst(IMPORTANCE_LABELS[lang][t.importance], lang), t.weight)}`;
}
export const formatPoints = (r: Pick<MatchResult, "points" | "maxPoints">, lang: MatchLang): string =>
  r.maxPoints ? WORDS[lang].points(nf(lang, r.points, 2), nf(lang, r.maxPoints, 0)) : "";
/** How many places fit, and how many were left out for each reason. */
export function formatCoverage(o: Pick<MatchOutcome, "matches" | "excluded">, lang: MatchLang): string {
  const w = WORDS[lang], c = (why: string) => o.excluded.filter(e => e.why === why || (why === "essential" && e.why.startsWith("essential"))).length;
  const out = [[c("over-budget"), w.out.budget], [c("no-rent-median"), w.out.rent], [c("no-sale-median"), w.out.sale], [c("essential"), w.out.essential]] as const;
  const left = out.filter(([n]) => n > 0).map(([n, f]) => f(nf(lang, n, 0)));
  const fit = o.matches.length === 1 ? w.fitOne : w.fit(nf(lang, o.matches.length, 0));
  return left.length ? `${fit} ${w.left}${colon(lang)}${left.join(", ")}.` : fit;
}

/** What each measure is, for the method lines. */
const NOUNS: Record<MatchLang, Record<MeasureKey, string>> = {
  pt: { beach_min: "minutos de carro até à praia", isch_min: "minutos de carro até à escola internacional", isch_n30: "escolas internacionais a menos de 30 min", sec_n20: "escolas secundárias públicas a menos de 20 min", er_min: "minutos de carro até à urgência hospitalar", air_min: "minutos de carro até ao aeroporto", rail_min: "minutos de carro até à estação de longo curso", mich_n30: "restaurantes no Guia Michelin a menos de 30 min", mkt_n20: "mercados a menos de 20 min", golf_min: "minutos de carro até ao campo de golfe", golf_n30: "campos de golfe a menos de 30 min", cult_n20: "museus e teatros a menos de 20 min", dens: "residentes por km²" },
  en: { beach_min: "drive minutes to the beach", isch_min: "drive minutes to the international school", isch_n30: "international schools within 30 min", sec_n20: "public secondary schools within 20 min", er_min: "drive minutes to the emergency hospital", air_min: "drive minutes to the airport", rail_min: "drive minutes to the long-distance station", mich_n30: "Michelin-listed restaurants within 30 min", mkt_n20: "markets within 20 min", golf_min: "drive minutes to the golf course", golf_n30: "golf courses within 30 min", cult_n20: "museums and theatres within 20 min", dens: "residents per km²" },
  fr: { beach_min: "minutes en voiture jusqu’à la plage", isch_min: "minutes en voiture jusqu’à l’école internationale", isch_n30: "écoles internationales à moins de 30 min", sec_n20: "lycées publics à moins de 20 min", er_min: "minutes en voiture jusqu’aux urgences", air_min: "minutes en voiture jusqu’à l’aéroport", rail_min: "minutes en voiture jusqu’à la gare grandes lignes", mich_n30: "restaurants au Guide Michelin à moins de 30 min", mkt_n20: "marchés à moins de 20 min", golf_min: "minutes en voiture jusqu’au golf", golf_n30: "golfs à moins de 30 min", cult_n20: "musées et théâtres à moins de 20 min", dens: "habitants au km²" },
};
/** The method in the reader's language, one line per taste, written from TASTE_RULES so it cannot drift from the code. */
export function methodLines(lang: MatchLang, tastes: readonly Taste[] = TASTES): string[] {
  const n = (v: number) => nf(lang, v);
  const T = {
    pt: { range: (a: number, b: number) => `1 até ${n(a)}, 0 a partir de ${n(b)}`, count: (c: number) => `0 sem nenhum, 1 a partir de ${n(c)}`, log: ", em escala logarítmica", share: (p: number) => `${p}% ` },
    en: { range: (a: number, b: number) => `1 at ${n(a)} or fewer, 0 at ${n(b)} or more`, count: (c: number) => `0 at none, 1 at ${n(c)} or more`, log: ", on a log scale", share: (p: number) => `${p}% ` },
    fr: { range: (a: number, b: number) => `1 jusqu’à ${n(a)}, 0 à partir de ${n(b)}`, count: (c: number) => `0 sans aucun, 1 à partir de ${n(c)}`, log: ", en échelle logarithmique", share: (p: number) => `${p} % ` },
  }[lang];
  return tastes.map(t => {
    const rules = TASTE_RULES[t];
    const parts = rules.map(r => `${rules.length > 1 ? T.share(Math.round(r.share * 100)) : ""}${NOUNS[lang][r.key]}${colon(lang)}${r.kind === "count" ? T.count(r.full) : T.range(r.full, r.zero) + (r.kind === "sparse" ? T.log : "")}`);
    return `${TASTE_LABELS[lang][t]}${colon(lang)}${parts.join("; ")}.`;
  });
}
