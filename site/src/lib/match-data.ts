/** Prompt 81: the browser's loader for the matching table. One fetch of /data/match.json, on first use only (the
 * discovery on /regressar today; any map script may call it the same way), then kept for the page. */
import { decodeMatchTable, type MatchData, type MatchTable } from "./match-table";

export const MATCH_TABLE_URL = "/data/match.json";
let task: Promise<MatchData> | undefined;
export function loadMatchData(url = MATCH_TABLE_URL): Promise<MatchData> {
  task ??= fetch(url, { credentials: "omit" })
    .then(r => { if (!r.ok) throw new Error(`match table: ${r.status}`); return r.json() as Promise<MatchTable>; })
    .then(decodeMatchTable)
    .catch(e => { task = undefined; throw e; });
  return task;
}
