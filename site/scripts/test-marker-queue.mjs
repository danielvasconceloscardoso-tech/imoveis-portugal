// Contract for the guarded MapLibre 4.7 marker-instance scheduling adapter.
// Read production source so an upstream hook change cannot silently leave a
// copied test implementation passing. Re-run when upgrading MapLibre.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const { transformSync } = require('esbuild');
const source = readFileSync(new URL('../src/scripts/map-v3.ts', import.meta.url), 'utf8');
const start = source.indexOf('  const pinOpacityQueue =');
const end = source.indexOf('  const PIN_OFF =', start);
assert.ok(start >= 0 && end > start, 'Production marker scheduling boundaries changed; review the adapter contract.');
const adapter = transformSync(`${source.slice(start, end)}\nglobalThis.wrap = deferPinOcclusion;`, {
  loader: 'ts', format: 'cjs',
}).code;

function setup() {
  const tasks = [], map = {}, calls = [], state = { main: true };
  let taskId = 0;
  const context = {
    map, mainPresentation: () => state.main,
    window: { setTimeout(task) { tasks.push(task); return ++taskId; } },
  };
  vm.createContext(context);
  vm.runInContext(adapter, context);
  const makeMarker = () => context.wrap({
    _map: map, _pos: 1,
    _updateOpacity(force) { calls.push({ marker: this, force, pos: this._pos }); },
  });
  return { tasks, map, calls, state, makeMarker, wrap: context.wrap };
}

test('coalesces one marker and yields a task between distinct marker checks', () => {
  const { tasks, calls, makeMarker } = setup();
  const first = makeMarker(), second = makeMarker();
  first._updateOpacity(false); first._updateOpacity(false); second._updateOpacity(false);
  assert.equal(calls.length, 0, 'No synchronous GPU readback');
  assert.equal(tasks.length, 1);
  tasks.shift()();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].marker, first);
  assert.equal(tasks.length, 1, 'The next marker waits for another browser task');
  tasks.shift()();
  assert.equal(calls.length, 2);
  assert.equal(calls[1].marker, second);
});

test('uses the current marker position and preserves the native non-forced throttle flag', () => {
  const { tasks, calls, makeMarker } = setup();
  const marker = makeMarker();
  marker._updateOpacity(false); marker._pos = 2;
  tasks.shift()();
  assert.equal(calls[0].pos, 2);
  assert.equal(calls[0].force, false, 'Keep MapLibre\'s native 100 ms throttle');
});

test('preserves any forced request when later non-forced requests coalesce', () => {
  const { tasks, calls, makeMarker } = setup();
  const marker = makeMarker();
  marker._updateOpacity(false); marker._updateOpacity(true); marker._updateOpacity(false);
  tasks.shift()();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].force, true);
});

test('discards checks for detached markers and markers from a replaced map', () => {
  const { tasks, calls, makeMarker } = setup();
  const detached = makeMarker(), replaced = makeMarker();
  detached._updateOpacity(false); replaced._updateOpacity(false);
  detached._map = null; replaced._map = {};
  while (tasks.length) tasks.shift()();
  assert.equal(calls.length, 0);
});

test('discards queued main-map checks on Golf transition and preserves its native path', () => {
  const { tasks, calls, state, makeMarker } = setup();
  const marker = makeMarker();
  marker._updateOpacity(false); state.main = false;
  tasks.shift()();
  assert.equal(calls.length, 0);
  marker._updateOpacity(false);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].force, false);
  assert.equal(tasks.length, 0);
});

test('leaves markers unchanged when the private hook is absent', () => {
  const { wrap, map, tasks } = setup();
  const marker = { _map: map };
  assert.equal(wrap(marker), marker);
  assert.equal(marker._updateOpacity, undefined);
  assert.equal(tasks.length, 0);
});
