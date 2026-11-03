# Events store: turning on the first-party event log (part 5, 3 Nov 2026)

The site already sends every reader action through one function, `ev()` in `site/src/lib/track.ts`. Today it does one thing: it counts the action on Cloudflare Web Analytics through a tiny `/e/…` page (`ops/METRICS_SETUP.md`). It can also send the same action as a short JSON line to our own store. That second output stays off until three things exist: a database, a Worker route that writes to it, and a build variable that names the route. Only the operator can set these up, because they live in the Cloudflare account and in `site/worker/` and `site/wrangler.jsonc`, which the build helpers never touch.

Nothing in this file is wired into the build. Until step 4 is done, no browser sends anything new and no session id is created.

## What is sent (one schema)

One JSON object per action, sent with `navigator.sendBeacon` as `text/plain`:

```json
{"v":1,"event":"map/time","place":"gondomar","band":"30-60s","origin":"page","page":"/pt/lu/mapa/","ed":"lu","sid":"9f2c0a41d3b7e815","ts":"2026-12-01T09:14:03Z"}
```

| Field | What it holds | Example |
| --- | --- | --- |
| `event` | the action, a slug path (the full list is in `ops/METRICS_SETUP.md`) | `flow/concierge/stop/fin` |
| `page` | the path of the page, never the query string | `/pt/fr/concierge/` |
| `ed` | the edition | `fr` |
| `place` | a municipality slug or a partner project id | `gondomar`, `marble-terrace` |
| `region` | a region slug | `lisboa` |
| `band` | a band, never an amount: a budget band or a time band | `300-500k`, `1-3m` |
| `origin` | where it came from: a surface, a share method, or the first-touch UTM `source/medium/campaign` | `test/email/w01` |
| `step` | a flow step, a Passo a passo station or a question id | `budget`, `docs` |
| `sid` | a random id for this browser tab (sessionStorage, 16 hex characters). It is not a cookie, it is gone when the tab closes, and it is never stored with anything personal | `9f2c0a41d3b7e815` |
| `ts` | the time, to the second (the Worker stores its own clock) | `2026-12-01T09:14:03Z` |

Every field is checked twice: in the browser, where anything that is not a short lowercase slug is dropped, and again in the Worker below. No name, e-mail address, phone number, free-text answer or IP address is ever stored. A body that contains `@` is dropped whole.

## Operator steps (about 15 minutes, once)

### 1. Create the database (D1, free plan)

D1 is recommended over Analytics Engine: it is plain SQL, it can be exported in one command (useful for exit-readiness), and the free plan's daily write allowance is far above our launch traffic. Check the current limits on Cloudflare's D1 pricing page before you start.

1. In the Cloudflare dashboard, open **Storage & Databases → D1 SQL Database → Create**.
2. Name: `ip-events`. Location: Western Europe. Click **Create**.
3. Open the database, go to **Console**, paste this and click **Execute**:

```sql
CREATE TABLE IF NOT EXISTS ev (
  id INTEGER PRIMARY KEY,
  ts TEXT NOT NULL,          -- server time, ISO, to the second
  day TEXT NOT NULL,         -- YYYY-MM-DD, for grouping
  event TEXT NOT NULL,
  page TEXT, ed TEXT, place TEXT, region TEXT, band TEXT, origin TEXT, step TEXT,
  sid TEXT,                  -- random per tab, never personal
  country TEXT               -- two letters, from Cloudflare's own request data
);
CREATE INDEX IF NOT EXISTS ev_day_event ON ev (day, event);
```

4. Copy the **Database ID** shown on the database's page. It is not a secret, but paste it only into the file in step 2.

*Alternative, Analytics Engine:* in **Workers & Pages → Analytics Engine**, enable it and use a dataset named `ip_events`. It needs no table, but it keeps data for a limited time and is read through its SQL API. Use one store or the other, not both.

### 2. Add the binding to `site/wrangler.jsonc`

Add one block inside the top-level object, next to `"assets"`:

```jsonc
  // The first-party event log (ops/EVENTS_SETUP.md): written by POST /api/ev in worker/index.js.
  "d1_databases": [
    { "binding": "EVENTS", "database_name": "ip-events", "database_id": "<the Database ID from step 1>" }
  ],
```

With Analytics Engine, add this block instead:

```jsonc
  "analytics_engine_datasets": [ { "binding": "EVENTS_AE", "dataset": "ip_events" } ],
```

You do not need to change `"run_worker_first"`: `/api/*` already reaches the Worker.

### 3. Add the route to `site/worker/index.js`

Paste this block above `export default {`:

```js
// POST /api/ev: one event of the site's schema (src/lib/track.ts ev, ops/EVENTS_SETUP.md). Anonymous and cookie-free:
// slugs only, no IP stored, any body containing "@" dropped whole. Always answers 204, so a reader never waits on it.
const EV_NAME = /^[a-z0-9][a-z0-9/-]{0,119}$/, EV_SLUG = /^[a-z0-9][a-z0-9-]{0,99}$/, EV_ORIGIN = /^[a-z0-9-][a-z0-9._/-]{0,119}$/;
const EV_PAGE = /^\/[A-Za-z0-9/._-]{0,199}$/, EV_SID = /^[a-f0-9]{16}$/, EV_ED = new Set(["lu", "fr", "ch", "br", "us", "il", "xx"]);
const EV_PERSONAL = /@|%40|\+?\d[\d\s().-]{7,}\d/;  // an e-mail address or a phone number anywhere: drop the whole event
async function handleEv(request, env) {
  const done = () => new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  if (request.method !== "POST") return new Response(null, { status: 405 });
  const from = request.headers.get("origin");
  if (from && from !== new URL(request.url).origin) return new Response(null, { status: 403 });  // our own pages only
  const raw = await request.text();
  if (raw.length > 2048 || /@|%40/i.test(raw)) return done();
  let d; try { d = JSON.parse(raw); } catch { return done(); }
  // Every text field except the random tab id and the time: anything that looks like a phone number drops the event.
  if (Object.entries(d || {}).some(([k, v]) => k !== "sid" && k !== "ts" && typeof v === "string" && EV_PERSONAL.test(v))) return done();
  const ok = (v, re) => (typeof v === "string" && re.test(v) ? v : null);
  const event = ok(d?.event, EV_NAME);
  if (d?.v !== 1 || !event) return done();
  const now = new Date().toISOString().slice(0, 19) + "Z";
  const row = [now, now.slice(0, 10), event, ok(d.page, EV_PAGE), EV_ED.has(d.ed) ? d.ed : null, ok(d.place, EV_SLUG), ok(d.region, EV_SLUG),
    ok(d.band, EV_SLUG), ok(d.origin, EV_ORIGIN), ok(d.step, EV_SLUG), ok(d.sid, EV_SID), ok(request.cf?.country, /^[A-Z]{2}$/)];
  try {
    if (env.EVENTS) await env.EVENTS.prepare("INSERT INTO ev (ts, day, event, page, ed, place, region, band, origin, step, sid, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(...row).run();
    else if (env.EVENTS_AE) env.EVENTS_AE.writeDataPoint({ indexes: [event], blobs: row.slice(2).map((x) => x ?? "") });
  } catch { /* the store is down: the reader never notices */ }
  return done();
}
```

Then, inside `fetch`, as the first line after `const url = new URL(request.url);`, add:

```js
    if (url.pathname === "/api/ev") return handleEv(request, env);
```

The existing `/api/request` code stays as it is. Commit as the brand (`git config user.name "Imoveis Portugal"`, `git config user.email ops@imoveisportugal.lu`).

### 4. Switch the browsers on: `PUBLIC_EVENTS_ENDPOINT`

1. Open **Workers & Pages → imoveis-portugal → Settings → Build → Variables and secrets** (the same place as `PUBLIC_CF_BEACON_TOKEN`).
2. Add `PUBLIC_EVENTS_ENDPOINT` = `/api/ev`. Use the relative path, so every country domain writes to its own Worker.
3. Run a new deployment. From that build, `ev()` also sends the JSON line. Remove the variable and rebuild to switch it off again. The `/e/` counts carry on either way.

Before step 4, ask the CEO to confirm the privacy policy paragraph on audience measurement for each edition (owner CEO in `ops/TASKS.md`). The per-tab id is kept in the browser's sessionStorage: it is not a cookie, but it is still storage on the reader's device. It falls under the audience-measurement exemption (CNIL guidance) only while it stays anonymous, first-party, limited to statistics and short-lived. Keep it that way.

### 5. Check it works

1. Open the live map, open a place, close the card, and send a Concierge halfway and then close it.
2. In D1 → `ip-events` → Console, run:

```sql
SELECT ts, event, ed, place, band, step, origin FROM ev ORDER BY id DESC LIMIT 20;
```

You should see `map/place`, `map/time`, `flow/concierge/step/…` and `flow/concierge/stop/…`.

## Reading it (aggregates only)

Weekly counts by event:

```sql
SELECT day, event, COUNT(*) AS n FROM ev WHERE day >= date('now', '-7 days') GROUP BY day, event ORDER BY day DESC, n DESC;
```

Where the Concierge stops:

```sql
SELECT step, COUNT(*) AS n FROM ev WHERE event LIKE 'flow/concierge/stop/%' GROUP BY step ORDER BY n DESC;
```

Letter signups by first-touch UTM:

```sql
SELECT origin, COUNT(*) AS n FROM ev WHERE event LIKE 'letter/signup/%' GROUP BY origin ORDER BY n DESC;
```

To export everything: `npx wrangler d1 export ip-events --remote --output=events.sql`. Do not commit the export (hard rule 3). Reports and sponsor figures show only groups of 10 or more (DESIGN_AND_DATA.md, Data §7).

Retention: delete rows older than 13 months once a month:

```sql
DELETE FROM ev WHERE day < date('now', '-13 months');
```
