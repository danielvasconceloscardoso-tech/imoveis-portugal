// Prompt 81 (UX problem 5): the search's own rules, apart from the map so they can be tested without it.
// 1. The names foreign readers type: English, French and German exonyms of the places that have one, and the seven
//    regions in three languages ("Lisbon", "Lisbonne", "Oporto", "Azores", "Algarve").
// 2. Order: an exact name first ("Porto" before "Porto de Mós"), then names that start with the text, then names with a
//    word that starts with it, then names that contain it; municipalities and regions before the rest; shorter first.
// 3. One wrong letter (two in a long name) still finds the place, offered under "Did you mean".
// Pure: no DOM. Accents never matter.
export const plainText = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Names a place is also known by abroad: [what the reader types, the municipality's slug]. Only names in real use. */
export const EXONYMS: [string, string][] = [
  ["Lisbon", "lisboa"], ["Lisbonne", "lisboa"], ["Lissabon", "lisboa"], ["Lisbona", "lisboa"],
  ["Oporto", "porto"], ["Braganza", "braganca"], ["Bragance", "braganca"], ["Coimbre", "coimbra"],
];
/** The seven regions of the map, as readers name them in Portuguese, English and French. */
export const REGION_NAMES: Record<string, string[]> = {
  north: ["Norte", "North", "Nord", "Northern Portugal", "Nord du Portugal"],
  centre: ["Centro", "Centre", "Center", "Central Portugal"],
  lisbon: ["Lisboa", "Lisbon", "Lisbonne", "Grande Lisboa", "Greater Lisbon"],
  alentejo: ["Alentejo"],
  algarve: ["Algarve"],
  madeira: ["Madeira", "Madère", "Ilha da Madeira", "Madeira Island"],
  azores: ["Açores", "Azores", "Açores", "Azoren"],
};

export type Entry<T> = { names: string[]; group: string; item: T };
/** 0 exact, 1 starts with, 2 a word starts with, 3 contains; -1 no match. The best over the entry's names. */
export function matchClass(names: readonly string[], t: string): number {
  let best = -1;
  for (const raw of names) {
    const n = plainText(raw);
    const c = n === t ? 0 : n.startsWith(t) ? 1 : n.split(" ").some((w) => w.startsWith(t)) ? 2 : n.includes(t) ? 3 : -1;
    if (c >= 0 && (best < 0 || c < best)) best = c;
  }
  return best;
}
const FIRST = ["munis", "regions"];
/** The matches of a typed text, best first. `text` is what the reader typed; the list comes back at most `max` long. */
export function searchEntries<T>(pool: readonly Entry<T>[], text: string, max = 12): Entry<T>[] {
  const t = plainText(text);
  if (!t) return [];
  const hits: { e: Entry<T>; c: number; g: number; len: number; i: number }[] = [];
  pool.forEach((e, i) => { const c = matchClass(e.names, t); if (c >= 0) hits.push({ e, c, g: FIRST.includes(e.group) ? 0 : 1, len: plainText(e.names[0]).length, i }); });
  // An exact name always leads, whatever its kind; after that, places and regions before parishes, golf and beaches.
  hits.sort((a, b) => Number(a.c > 0) - Number(b.c > 0) || a.g - b.g || a.c - b.c || a.len - b.len || a.i - b.i);
  return hits.slice(0, max).map((h) => h.e);
}

/** Edit distance with swaps of two neighbours counted once (Damerau-Levenshtein, optimal string alignment), cut at `max`. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2: number[] = [], prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i]; let low = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      row.push(v); if (v < low) low = v;
    }
    if (low > max) return max + 1;
    prev2 = prev; prev = row;
  }
  return prev[b.length];
}
/** "Did you mean": names within one wrong letter of the text (two from eight letters on). Places and regions only. */
export function nearEntries<T>(pool: readonly Entry<T>[], text: string, max = 3): Entry<T>[] {
  const t = plainText(text);
  if (t.length < 4) return [];
  const allow = t.length >= 8 ? 2 : 1, out: { e: Entry<T>; d: number; i: number }[] = [];
  pool.forEach((e, i) => {
    if (!FIRST.includes(e.group)) return;
    let d = allow + 1;
    for (const raw of e.names) { const n = plainText(raw); d = Math.min(d, editDistance(t, n, allow), n.length > t.length ? editDistance(t, n.slice(0, t.length), allow) + 1 : allow + 1); }
    if (d <= allow) out.push({ e, d, i });
  });
  return out.sort((a, b) => a.d - b.d || a.i - b.i).slice(0, max).map((x) => x.e);
}
