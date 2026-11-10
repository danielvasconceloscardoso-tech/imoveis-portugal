// Prompt 81: the services lines of the municipality card ("Por perto"). Presentation only: every value comes from the
// place's own file (site/public/data/map/place/<slug>.json, key "sv", built by scripts/map-data/place_services.py) and
// every word from COPY_DECK.md "## services" (the card writer's block), passed in as S. Which variant goes where is the
// card writer's table (ops/research/81_map/copy.md §6). A value that is missing shows "no figure yet", never a zero.
export type Near = { min: number; n: string; h?: 1; cur?: string[]; n30?: number; cat?: string; flag?: boolean; iata?: string };
export type Sv = {
  d: string; o?: string; ok?: "hall" | "center"; isl?: string; hd?: string; eea?: string;
  er?: Near; cs?: Near; isch?: Near; beach?: Near; bin?: Near; bflag?: { min: number; n: string }; air?: Near;
  sec?: { n20: number; min?: number; n?: string }; mich?: { n30: number; star?: number }; mkt?: { min: number; n: string };
  paid?: { ns: number; nh: number };
};
export type SvRow = { key: string; k: string; v: string; d: string; tag?: string };
type Ctx = { S: Record<string, string>; lang: string; loc: string; esc: (t: string) => string; flight?: string };

const FAR = 45;  // minutes: the card writer's threshold (the ranking engine's zero point)
const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

/** A drive time in the deck's own form: "17 min", "1 h 13 min" (French: "1 h 05"), "1 h", "under 1 min". */
export function driveTime(min: number, x: Pick<Ctx, "S" | "lang">): string {
  const S = x.S;
  if (min < 1) return S["t.lt1"];
  if (min < 60) return fill(S["t.min"], { min });
  const h = Math.floor(min / 60), m = min % 60;
  return m ? fill(S["t.hm"], { h, min: x.lang === "fr" ? String(m).padStart(2, "0") : m }) : fill(S["t.hr"], { h });
}
export const longDate = (d: string, loc: string) => { try { return new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${d}T12:00:00`)); } catch { return d; } };
const joinList = (a: string[], lang: string) => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} ${lang === "pt" ? "e" : lang === "fr" ? "et" : "and"} ${a[a.length - 1]}`);

/** The card's rows, in the order of a life (health, school, beach, airport, table): label, value, the detail on tap. */
export function serviceRows(sv: Sv, x: Ctx): SvRow[] {
  const S = x.S, t = (m: number) => driveTime(m, x), rows: SvRow[] = [], year = sv.d.slice(0, 4), date = longDate(sv.d, x.loc);
  const none = (key: string, k: string) => rows.push({ key, k, v: S["none.v"], d: S["none.d"] });
  // Hospital with an emergency department.
  if (sv.er) rows.push({ key: "er", k: S["er.k"], v: t(sv.er.min), d: fill(S[sv.er.min > FAR ? "er.d.far" : "er.d"], { name: sv.er.n, t: t(sv.er.min) }) });
  else if (sv.isl) rows.push({ key: "er", k: S["er.k"], v: S["er.v.island"], d: S["er.d.island"] });
  else none("er", S["er.k"]);
  // Centro de saúde.
  if (sv.cs) rows.push({ key: "cs", k: S["cs.k"], v: t(sv.cs.min), d: fill(S["cs.d"], { name: sv.cs.n, t: t(sv.cs.min) }) });
  else none("cs", S["cs.k"]);
  // International school.
  if (sv.isch) {
    const i = sv.isch, cur = (i.cur ?? []).map((c) => S[`cur.${c}`]).filter(Boolean);
    let d = i.min > FAR ? fill(S["isch.d.far"], { name: i.n, t: t(i.min) }) : cur.length ? fill(S["isch.d"], { name: i.n, cur: joinList(cur, x.lang), t: t(i.min) }) : fill(S["isch.d.nocur"], { name: i.n, t: t(i.min) });
    if ((i.n30 ?? 0) >= 2) d += ` ${fill(S["isch.more"], { n: i.n30! })}`;
    rows.push({ key: "isch", k: S["isch.k"], v: t(i.min), d });
  } else if (sv.isl) rows.push({ key: "isch", k: S["isch.k"], v: S["isch.v.island"], d: S["isch.d.island"] });
  else none("isch", S["isch.k"]);
  // Public secondary schools: the count within 20 minutes, or the nearest one where there is one or none.
  if (sv.sec) {
    const c = sv.sec, near = c.n && c.min != null ? `${fill(S["sch.near"], { name: c.n, t: t(c.min) })} ${S["sch.how"]}` : "";
    if (c.n20 >= 2) rows.push({ key: "sec", k: S["sch.k"], v: fill(S["sch.v"], { n: c.n20 }), d: near || S["sch.how"] });
    else if (near) rows.push({ key: "sec", k: S["sch.k.1"], v: t(c.min!), d: near });
    else none("sec", S["sch.k.1"]);
  } else none("sec", S["sch.k.1"]);
  // The beach: the sea first when it is within 45 minutes; otherwise a nearer river or lake beach leads and the sea follows.
  const sea = sv.beach, inland = sv.bin;
  if (sea && !(sea.min > FAR && inland && inland.min < sea.min)) {
    let d = fill(S[sea.cat === "transitional" ? "beach.d.trans" : "beach.d"], { name: sea.n, t: t(sea.min) });
    if (sea.flag) d += ` ${fill(S["beach.flag"], { year })}`;
    else if (sv.bflag) d += ` ${fill(S["beach.flag.other"], { name: sv.bflag.n, t: t(sv.bflag.min), year })}`;
    rows.push({ key: "beach", k: S["beach.k"], v: t(sea.min), d, tag: sea.flag ? S["beach.flag.k"] : "" });
  } else if (inland) {
    let d = fill(S["beach.d.inland"], { name: inland.n, t: t(inland.min) });
    if (inland.flag) d += ` ${fill(S["beach.flag"], { year })}`;
    if (sea) d += ` ${fill(S["beach.sea"], { t: t(sea.min), name: sea.n })}`;
    rows.push({ key: "beach", k: S["beach.k.inland"], v: t(inland.min), d, tag: inland.flag ? S["beach.flag.k"] : "" });
  } else none("beach", S["beach.k"]);
  // The airport, to the passenger terminal; the edition's published flight follows where the place has one.
  if (sv.air) {
    const a = sv.air, name = (a.iata && S[`air.n.${a.iata}`]) || a.n;
    rows.push({ key: "air", k: S["air.k"], v: t(a.min), d: `${fill(S["air.d"], { name, iata: a.iata ?? "", t: t(a.min) })}${x.flight ? ` ${x.flight}` : ""}` });
  } else none("air", S["air.k"]);
  // The table: the Michelin Guide's listing within 30 minutes, else the nearest market, else no line at all.
  if (sv.mich?.n30) {
    const m = sv.mich, one = m.n30 === 1;
    let d = fill(S[one ? "food.mich.d.1" : "food.mich.d"], { date });
    if (m.star) d += ` ${one ? S["food.mich.star.only"] : m.star === 1 ? S["food.mich.star.1"] : fill(S["food.mich.star"], { n: m.star })}`;
    rows.push({ key: "food", k: S["food.mich.k"], v: one ? S["food.mich.v.1"] : fill(S["food.mich.v"], { n: m.n30 }), d });
  } else if (sv.mkt) rows.push({ key: "food", k: S["food.mkt.k"], v: t(sv.mkt.min), d: fill(S["food.mkt.d"], { name: sv.mkt.n, t: t(sv.mkt.min) }) });
  return rows;
}

/** The foot: the method, the date and the credit, once. */
export function serviceFoot(sv: Sv, x: Ctx): string {
  const S = x.S, from = sv.o ? fill(S[sv.ok === "center" ? "from.center" : "from.hall"], { origin: sv.o, town: sv.o }) : "";
  // A card with hand-checked lines carries two dates: theirs and the table's (the hospital, the schools count, the table).
  const and = x.lang === "pt" ? " e a " : x.lang === "fr" ? " et le " : " and ";
  const date = sv.hd && sv.hd !== sv.d ? `${longDate(sv.hd, x.loc)}${and}${longDate(sv.d, x.loc)}` : longDate(sv.d, x.loc);
  return `${fill(S["foot"], { from, date }).replace(/\s+,/g, ",").replace(/\s{2,}/g, " ")} ${S[sv.mich?.n30 ? "foot.src.mich" : "foot.src"]}`;
}
/** Behind "Fontes": one line per topic the card shows. */
export function serviceSources(sv: Sv, x: Ctx): string[] {
  const S = x.S, date = longDate(sv.d, x.loc), year = sv.d.slice(0, 4);
  const from = sv.o ? fill(S[sv.ok === "center" ? "from.center" : "from.hall"], { origin: sv.o, town: sv.o }) : "";
  const li = [fill(S["src.drive"], { from }), S["src.health"], S["src.schools"]];
  if (sv.beach || sv.bin) li.push(fill(S["src.beach"], { year, eea: sv.eea ?? String(Number(year) - 2) }));
  li.push(S["src.air"]);
  if (sv.mich?.n30) li.push(fill(S["src.mich"], { date }));
  li.push(fill(S["src.osm"], { date }));
  return li;
}

const chev = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
/** A value as the card sets it: the figure in the numbers' column ("17 min", "1 h 13 min", "35"), and what a count is a
 * count of ("within 20 min") on a small line under the label. Words with no figure ("on another island") stay words. */
function valueHTML(v: string, esc: (t: string) => string): { fig: string; sub: string; words: boolean } {
  const count = v.match(/^(\d+)\s+(?!min\b|h\b)(.+)$/);
  if (count) return { fig: `<b>${count[1]}</b>`, sub: count[2], words: false };
  if (/^\d/.test(v)) return { fig: esc(v).replace(/\d+/g, "<b>$&</b>"), sub: "", words: false };
  return { fig: esc(v), sub: "", words: true };
}

export function servicesHTML(sv: Sv, x: Ctx, id: string): string {
  const S = x.S, e = x.esc;
  const rows = serviceRows(sv, x).map((r) => {
    const v = valueHTML(r.v, e);
    return `<li class="m3-svi" data-sv="${r.key}"><button type="button" class="m3-svb" aria-expanded="false" aria-controls="${id}-${r.key}"><span class="m3-svk">${e(r.k)}${v.sub ? `<small>${e(v.sub)}</small>` : ""}${r.tag ? `<small class="is-flag">${e(r.tag)}</small>` : ""}</span><span class="m3-svv${v.words ? " is-words" : ""}">${v.fig}</span>${chev}</button><div class="m3-svd" id="${id}-${r.key}" role="region" inert><p>${e(r.d)}</p></div></li>`;
  }).join("");
  return `<section class="m3-sb m3-sv" data-services><h3 class="m3-tt">${e(S["h"])}<small>${e(S["sub"])}</small></h3><ul class="m3-svl">${rows}</ul><p class="m3-sv-foot">${e(serviceFoot(sv, x))}</p></section>`;
}
