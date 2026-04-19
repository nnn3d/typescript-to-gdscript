import { describe, it, expect, afterEach } from 'vitest';
import {
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
  existsSync,
} from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { Watcher } from '../../src/watcher/index.ts';
import { ProjectCache, hashFile } from '../../src/cache/index.ts';

// ─── Helpers ────────────────────────────────────────────────

function makeTmpDir(label: string): string {
  const dir = join(
    tmpdir(),
    `tstogd-${label}-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  return dir;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Wait until `predicate` returns truthy or `timeout` ms elapses. Polls
 * every `step` ms. Returns the last predicate value (truthy on success,
 * false/undefined on timeout).
 */
async function waitFor<T>(
  predicate: () => T | undefined,
  timeout = 3000,
  step = 50,
): Promise<T | undefined> {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const v = predicate();
    if (v) return v;
    if (Date.now() - start > timeout) return v;
    await sleep(step);
  }
}

// ─── Tests ──────────────────────────────────────────────────

describe('Watcher + cache: updated-file re-conversion', () => {
  let tmpDir: string;
  let watcher: Watcher | null = null;

  afterEach(async () => {
    if (watcher) {
      await watcher.stop();
      watcher = null;
    }
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it(
    'after first conversion, editing the .ts triggers re-conversion with fresh bytes',
    async () => {
      tmpDir = makeTmpDir('watcher');
      const tsDir = join(tmpDir, 'src');
      const gdDir = join(tmpDir, 'out');
      const cacheDir = join(tmpDir, 'cache');
      mkdirSync(tsDir, { recursive: true });

      // Minimal class so the converter has something real to emit.
      const tsPath = join(tsDir, 'Foo.ts');
      writeFileSync(
        tsPath,
        [
          'class Foo extends Object {',
          '  hello(): number {',
          '    return 1;',
          '  }',
          '}',
        ].join('\n'),
      );

      watcher = new Watcher({
        rootDir: tmpDir,
        tsDir,
        gdDir,
        cacheDir,
      });
      watcher.start();

      const gdPath = join(gdDir, 'Foo.gd');
      // Initial scan must convert and write the .gd file.
      const firstFound = await waitFor(
        () => existsSync(gdPath) && readFileSync(gdPath, 'utf-8'),
        5000,
      );
      expect(firstFound).toBeTruthy();
      expect(firstFound as string).toContain('return 1');

      // Cache should record fresh state for the pair.
      const cache = new ProjectCache(cacheDir);
      expect(cache.isTsToGdFresh(tsPath, gdPath)).toBe(true);
      const tsHashBefore = hashFile(tsPath);

      // Edit the .ts file — the body must change so the generated GD changes too.
      writeFileSync(
        tsPath,
        [
          'class Foo extends Object {',
          '  hello(): number {',
          '    return 42;',
          '  }',
          '}',
        ].join('\n'),
      );
      // Sanity: the new content hashes differently.
      expect(hashFile(tsPath)).not.toBe(tsHashBefore);

      // Watcher should pick it up, re-convert, and write new bytes.
      const refreshed = await waitFor(() => {
        const txt = readFileSync(gdPath, 'utf-8');
        return txt.includes('return 42') ? txt : undefined;
      }, 5000);
      expect(refreshed).toBeTruthy();
      expect(refreshed as string).toContain('return 42');
      expect(refreshed as string).not.toContain('return 1');

      // Cache reflects the new state — fresh against the updated .ts + .gd.
      const cacheAfter = new ProjectCache(cacheDir);
      expect(cacheAfter.isTsToGdFresh(tsPath, gdPath)).toBe(true);
    },
    15000,
  );

  it(
    'after first conversion, an unchanged .ts is served from cache (no rewrite)',
    async () => {
      tmpDir = makeTmpDir('watcher');
      const tsDir = join(tmpDir, 'src');
      const gdDir = join(tmpDir, 'out');
      const cacheDir = join(tmpDir, 'cache');
      mkdirSync(tsDir, { recursive: true });

      const tsPath = join(tsDir, 'Foo.ts');
      writeFileSync(
        tsPath,
        ['class Foo extends Object {', '  v: number = 1;', '}'].join('\n'),
      );

      watcher = new Watcher({
        rootDir: tmpDir,
        tsDir,
        gdDir,
        cacheDir,
      });
      watcher.start();

      const gdPath = join(gdDir, 'Foo.gd');
      await waitFor(() => existsSync(gdPath), 5000);

      // Capture the .gd bytes + cache state after initial conversion.
      const gdBefore = readFileSync(gdPath, 'utf-8');
      const cache = new ProjectCache(cacheDir);
      expect(cache.isTsToGdFresh(tsPath, gdPath)).toBe(true);

      // Stop + restart the watcher over the SAME cacheDir: this simulates
      // a repeat `watch` run where nothing on disk has changed. The
      // initial scan must see isTsToGdFresh=true and skip re-conversion.
      // If it re-converted, the .gd bytes may be identical but the cache
      // counters would register a "converted" instead of "cached".
      await watcher.stop();
      watcher = null;

      watcher = new Watcher({
        rootDir: tmpDir,
        tsDir,
        gdDir,
        cacheDir,
      });
      watcher.start();

      // Wait long enough for the initial scan to complete.
      await sleep(800);

      // Output bytes should be byte-identical (no re-conversion touched the file).
      const gdAfter = readFileSync(gdPath, 'utf-8');
      expect(gdAfter).toBe(gdBefore);
      // Cache remains fresh.
      const cache2 = new ProjectCache(cacheDir);
      expect(cache2.isTsToGdFresh(tsPath, gdPath)).toBe(true);
    },
    15000,
  );
});
