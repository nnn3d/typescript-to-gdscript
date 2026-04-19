/**
 * Integration tests for the tstogd TypeScript language service plugin.
 *
 * Each test builds a small temp project, wraps a real
 * `ts.LanguageService` with the plugin, and drives the wrapped service
 * the same way `tsserver` would. Covers:
 *
 *   - `getSemanticDiagnostics` surfaces converter diagnostics as tstogd
 *     `ts.Diagnostic`s (source = "tstogd", code 90000/90001). Reuses the
 *     shared plugin-fixture set (paired `.ts` / `.json`) that captures
 *     each converter diagnostic pattern in one place.
 *   - Live convert persists to `ProjectCache` with the cache-folder `.gd`
 *     mirror populated.
 *   - Navigation bridges: go-to-def redirects shadow → source, find-refs
 *     bridges both directions and merges.
 *   - Passthrough: `.d.ts` files never get tstogd diagnostics.
 *   - Second call on same version reuses the in-memory cache (no
 *     duplicate persist).
 */

import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { basename, join } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { makeProject, type HarnessProject } from './harness.ts';
import { ProjectCache } from '../../src/cache/index.ts';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import type { TransformDiagnostic } from '../../src/converter/common/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PLUGIN_FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'plugin');

// Plugin fixtures pair a `.ts` source with a `.json` expectations file.
// Each expectation uses substring matching by default or a regex via the
// `messageRegex` field. `severity` follows ESLint's integer scheme
// (1 = warning, 2 = error) because the fixtures predate the plugin and
// were originally shared with an ESLint rule — keep the shape so they
// can also be consumed by any future tooling.
interface ExpectedMessage {
  message?: string;
  messageRegex?: string;
  severity: 1 | 2;
}

function matchMessage(actual: string, exp: ExpectedMessage): boolean {
  if (exp.messageRegex !== undefined) {
    return new RegExp(exp.messageRegex).test(actual);
  }
  return exp.message !== undefined && actual.includes(exp.message);
}

function fixtureDiagnostics(diags: readonly { source?: string }[]): readonly { source?: string }[] {
  return diags.filter((d) => d.source === 'tstogd');
}

/**
 * Map the converter's `TransformDiagnostic.severity` → the plugin's
 * emitted `ts.Diagnostic.category` (Warning=0, Error=1, Suggestion=2)
 * and `code`. Must stay in lock-step with `severityToCategory` +
 * `DIAG_CODE_BASE` logic in `src/ts-plugin/index.ts`.
 */
function expectedPluginCategory(severity: TransformDiagnostic['severity']): number {
  if (severity === 'error' || severity === 'type-error') return 1; // Error
  if (severity === 'warning') return 0; // Warning
  return 2; // Suggestion (info)
}
function expectedPluginCode(severity: TransformDiagnostic['severity']): number {
  return severity === 'type-error' ? 90001 : 90000;
}

// ─── Fixture-driven diagnostics tests ────────────────────────

describe('ts-plugin: getSemanticDiagnostics (plugin fixture parity)', () => {
  const fixtureFiles = readdirSync(PLUGIN_FIXTURES_DIR)
    .filter((f) => f.endsWith('.ts') && !f.startsWith('godot-'))
    .sort();

  for (const tsFile of fixtureFiles) {
    const name = basename(tsFile, '.ts');
    const jsonFile = join(PLUGIN_FIXTURES_DIR, tsFile.replace('.ts', '.json'));
    if (!existsSync(jsonFile)) continue;

    it(`should report converter diagnostics for fixture: ${name}`, () => {
      const source = readFileSync(join(PLUGIN_FIXTURES_DIR, tsFile), 'utf-8');
      const expected: ExpectedMessage[] = JSON.parse(
        readFileSync(jsonFile, 'utf-8'),
      );

      const p = makeProject([
        { path: `src/${tsFile}`, content: source },
      ]);

      try {
        // Use the converter itself as the ground truth. Any expected
        // entry the converter doesn't produce must be Godot-sourced (or
        // otherwise out of our scope) — the plugin can't surface those
        // synchronously, so we skip them here. For every expected entry
        // that DOES correspond to a converter diagnostic, the plugin
        // must re-emit it with the right category/code/source.
        const converterOut = convertTsToGd({
          filePath: p.abs(`src/${tsFile}`),
          rootDir: p.abs('src'),
        });
        const converterDiags = converterOut.diagnostics;

        const diags = p.ls.getSemanticDiagnostics(p.abs(`src/${tsFile}`));
        const tstogd = fixtureDiagnostics(diags);

        let assertedAny = false;
        for (const exp of expected) {
          const converterHit = converterDiags.find((d) =>
            matchMessage(d.message, exp),
          );
          if (!converterHit) continue; // Godot-sourced / out of scope.
          if (converterHit.severity === 'info') continue; // info is filtered.

          assertedAny = true;
          const match = tstogd.find((d) => matchMessage(messageTextOf(d), exp));
          expect(
            match,
            `Plugin should surface converter diagnostic for ${name}: ` +
              `${JSON.stringify(exp)}\nConverter reports: ${converterHit.severity} ${converterHit.message}\nPlugin output:\n` +
              tstogd
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((d) => `  code=${(d as any).code} cat=${(d as any).category} msg=${messageTextOf(d)}`)
                .join('\n'),
          ).toBeDefined();
          expect(match!.source).toBe('tstogd');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expect((match as any).code).toBe(expectedPluginCode(converterHit.severity));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expect((match as any).category).toBe(expectedPluginCategory(converterHit.severity));
        }

        // Sanity: empty-expectation fixtures (e.g. `valid-code`) should
        // never see an error-category diagnostic from the plugin.
        if (!assertedAny && expected.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errors = tstogd.filter((d) => (d as any).category === 1);
          expect(
            errors,
            `Expected no converter errors for ${name}, got:\n` +
              tstogd
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((d) => `  code=${(d as any).code} msg=${messageTextOf(d)}`)
                .join('\n'),
          ).toHaveLength(0);
        }
      } finally {
        p.dispose();
      }
    });
  }
});

function messageTextOf(d: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = (d as any).messageText;
  return typeof raw === 'string' ? raw : String(raw);
}

// ─── Passthrough ─────────────────────────────────────────────

describe('ts-plugin: passthrough', () => {
  let p: HarnessProject | undefined;
  afterEach(() => { p?.dispose(); p = undefined; });

  it('does not attach tstogd diagnostics to .d.ts files', () => {
    p = makeProject([
      { path: 'src/types/global.d.ts', content: 'declare const FOO: number;' },
      { path: 'src/Foo.ts', content: 'export class Foo extends Node {}' },
    ]);
    const diags = p.ls.getSemanticDiagnostics(p.abs('src/types/global.d.ts'));
    expect(fixtureDiagnostics(diags)).toEqual([]);
  });

  it('does not attach tstogd diagnostics to files outside tsDir', () => {
    p = makeProject([
      { path: 'other/Outside.ts', content: 'export const x = 1;' },
    ]);
    const diags = p.ls.getSemanticDiagnostics(p.abs('other/Outside.ts'));
    expect(fixtureDiagnostics(diags)).toEqual([]);
  });
});

// ─── Cache write-through ─────────────────────────────────────

describe('ts-plugin: persistent cache write-through', () => {
  let p: HarnessProject | undefined;
  afterEach(() => { p?.dispose(); p = undefined; });

  // The plugin persists cache state via `saveAsync()` (fire-and-forget)
  // to avoid blocking the tsserver event loop. Tests that inspect
  // cache.json right after `getSemanticDiagnostics` must therefore wait
  // for the write to settle. Poll the filesystem briefly rather than
  // sleeping a fixed amount — fast on SSDs, bounded on slow CI.
  async function waitForCacheJson(
    rootDir: string,
    timeoutMs = 2000,
  ): Promise<string> {
    const start = Date.now();
    for (;;) {
      const found = findCacheJson(rootDir);
      if (found) return found;
      if (Date.now() - start > timeoutMs) {
        throw new Error(`cache.json did not appear under ${rootDir} within ${timeoutMs}ms`);
      }
      await new Promise((r) => setTimeout(r, 25));
    }
  }
  /** Poll until the predicate returns a defined value, then return it. */
  async function waitFor<T>(
    fn: () => T | undefined,
    timeoutMs = 2000,
  ): Promise<T> {
    const start = Date.now();
    for (;;) {
      const v = fn();
      if (v !== undefined) return v;
      if (Date.now() - start > timeoutMs) {
        throw new Error(`waitFor timed out after ${timeoutMs}ms`);
      }
      await new Promise((r) => setTimeout(r, 25));
    }
  }

  it('writes to cache.json and gd-output/ mirror after live convert', async () => {
    p = makeProject([
      {
        path: 'src/Greeting.ts',
        content: [
          'export class Greeting extends Node {',
          '  hello(name: String): String {',
          '    return "hi " + name;',
          '  }',
          '}',
        ].join('\n'),
      },
    ]);

    p.ls.getSemanticDiagnostics(p.abs('src/Greeting.ts'));

    const cacheJson = await waitForCacheJson(p.rootDir);
    const cacheDir = cacheJson.replace(/[\\/]cache\.json$/, '');

    // Wait for the mirror to also be on disk — same saveAsync flush.
    const mirror = await waitFor(() => {
      const c = new ProjectCache(cacheDir);
      return c.getCachedGdPath(p!.abs('src/Greeting.ts'));
    });

    const cache = new ProjectCache(cacheDir);
    expect(cache.hasFreshCachedGd(p.abs('src/Greeting.ts'))).toBe(true);
    expect(existsSync(mirror)).toBe(true);
    const gdContent = readFileSync(mirror, 'utf-8');
    expect(gdContent).toContain('class_name Greeting');
    expect(gdContent).toContain('func hello(');
  });

  it('editing the buffer produces a fresh cache entry with new bytes', async () => {
    p = makeProject([
      {
        path: 'src/Counter.ts',
        content: [
          'export class Counter extends Node {',
          '  val: int = 0;',
          '}',
        ].join('\n'),
      },
    ]);

    p.ls.getSemanticDiagnostics(p.abs('src/Counter.ts'));
    const cacheJson = await waitForCacheJson(p.rootDir);
    const cacheDir = cacheJson.replace(/[\\/]cache\.json$/, '');
    const mirrorBefore = await waitFor(() => {
      const path = new ProjectCache(cacheDir).getCachedGdPath(p!.abs('src/Counter.ts'));
      return path ? readFileSync(path, 'utf-8') : undefined;
    });
    expect(mirrorBefore).toContain('var val');

    p.writeFile(
      'src/Counter.ts',
      [
        'export class Counter extends Node {',
        '  val: int = 0;',
        '  other: float = 1.5;',
        '}',
      ].join('\n'),
    );
    p.ls.getSemanticDiagnostics(p.abs('src/Counter.ts'));

    const mirrorAfter = await waitFor(() => {
      const path = new ProjectCache(cacheDir).getCachedGdPath(p!.abs('src/Counter.ts'));
      if (!path) return undefined;
      const txt = readFileSync(path, 'utf-8');
      // Wait until the NEW bytes are persisted (not the old snapshot).
      return txt.includes('var other') ? txt : undefined;
    });
    expect(mirrorAfter).toContain('var val');
    expect(mirrorAfter).toContain('var other');
    expect(mirrorAfter).not.toBe(mirrorBefore);
  });

  it('second call on unchanged buffer reuses the in-memory cache (cache.json unchanged)', async () => {
    p = makeProject([
      {
        path: 'src/Stable.ts',
        content: [
          'export class Stable extends Node {',
          '  test() {',
          '    let a: int = 1; let b: int = 2;',
          '    let x = a || b;',
          '  }',
          '}',
        ].join('\n'),
      },
    ]);

    p.ls.getSemanticDiagnostics(p.abs('src/Stable.ts'));
    const cacheJson = await waitForCacheJson(p.rootDir);
    // Let the initial saveAsync chain fully drain so mtime1 reflects
    // the *final* on-disk state after this diagnostic call.
    await new Promise((r) => setTimeout(r, 100));
    const mtime1 = statSync(cacheJson).mtimeMs;

    p.ls.getSemanticDiagnostics(p.abs('src/Stable.ts'));
    await new Promise((r) => setTimeout(r, 100));
    const mtime2 = statSync(cacheJson).mtimeMs;
    expect(mtime2).toBe(mtime1);
  });
});

// ─── Async Godot pipeline (regression guard) ────────────────
//
// Covers the path the file-logging debug trace exposed: the plugin
// must write a scratch .gd, spawn Godot async, and — critically —
// surface Godot's diagnostics through the live cache on the next
// `getSemanticDiagnostics` call, anchored at the real TS file (not
// the scratch path remapped via the .gd.map).
//
// Godot is a hard prerequisite for these tests — no skipping. If
// Godot isn't installed, the test fails loudly with the underlying
// error so the developer knows they need to install it.

describe('ts-plugin: async Godot diagnostics', () => {
  let p: HarnessProject | undefined;
  afterEach(() => { p?.dispose(); p = undefined; });

  it('surfaces Godot validation errors via refreshDiagnostics + memo hit', async () => {
    // The source converts cleanly (converter produces 0 errors) but
    // calls a method that doesn't exist on the base class, which Godot
    // catches at parse-time. The plugin should write scratch .gd, run
    // Godot async, normalize diag.file back to the real TS path, store
    // in the live cache, and expose it on the next query.
    p = makeProject([
      {
        path: 'project.godot',
        content:
          'config_version=5\n' +
          '[application]\n' +
          'config/name="ts2gd-test"\n' +
          'config/features=PackedStringArray("4.3","GL Compatibility")\n',
      },
      {
        path: 'tstogd.json',
        content: JSON.stringify(
          { rootDir: '.', tsDir: 'src', gdDir: '.' },
          null,
          2,
        ),
      },
      {
        path: 'src/BadCall.ts',
        content: [
          'export class __CLASS__ extends Node {',
          '  run() {',
          '    this.definitely_not_a_real_method();',
          '  }',
          '}',
        ].join('\n'),
      },
    ]);

    const fileName = p.abs('src/BadCall.ts');

    // First call: triggers live convert + kicks off Godot async.
    // Returns converter diagnostics only (Godot hasn't finished yet).
    p.ls.getSemanticDiagnostics(fileName);

    // Wait for the Godot subprocess to finish and the plugin's
    // async handler to populate liveCache.godot. Poll the on-disk
    // cache as a proxy — if the refreshDiagnostics nudge fired, the
    // cache.json was updated and a re-query will return the new
    // count. Hard cap of 30s so a misconfigured Godot doesn't hang CI.
    const deadline = Date.now() + 30_000;
    let pluginDiags: readonly { source?: string; messageText?: string }[] = [];
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 250));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pluginDiags = (p.ls.getSemanticDiagnostics(fileName) as any[]).filter(
        (d) => d.source === 'tstogd',
      );
      if (pluginDiags.length > 0) break;
    }

    expect(
      pluginDiags.length,
      'Plugin should surface at least one Godot diagnostic. ' +
        'If this fails, check that Godot is on PATH and the scratch ' +
        '.gd write + source-map remap paths are correct.',
    ).toBeGreaterThan(0);

    // The specific failing call should appear in the message — either
    // via Godot's "Function 'X' not found" or a similar parse error.
    const message = String(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pluginDiags[0] as any).messageText ?? '',
    );
    expect(message).toMatch(/definitely_not_a_real_method|not found/i);
  }, 35_000);
});

// ─── Helpers ────────────────────────────────────────────────

/**
 * Locate the `cache.json` written for the test project. The plugin's
 * `resolveConfig` picks `node_modules/.cache/…` when available, else a
 * path under `os.tmpdir()`. Search both.
 */
function findCacheJson(rootDir: string): string | undefined {
  const nmCache = join(rootDir, 'node_modules', '.cache', 'typescript-to-gdscript', 'cache.json');
  if (existsSync(nmCache)) return nmCache;
  const tmp = tmpdir();
  const expected = join(
    tmp,
    'typescript-to-gdscript',
    basename(rootDir),
    'cache.json',
  );
  if (existsSync(expected)) return expected;
  return undefined;
}
