import { describe, it, expect, afterEach } from 'vitest';
import {
  writeFileSync,
  readFileSync,
  mkdirSync,
  rmSync,
  existsSync,
} from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { ProjectCache, hashFile } from '../../src/cache/index.ts';

// ─── Helpers ────────────────────────────────────────────────

function makeTmpDir(): string {
  const dir = join(
    tmpdir(),
    `ts2gd-cache-test-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  return dir;
}

function writeFile(dir: string, name: string, content: string): string {
  const p = join(dir, name);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  return p;
}

// ─── Tests ──────────────────────────────────────────────────

describe('hashFile', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns a 16-char hex string', () => {
    tmpDir = makeTmpDir();
    const p = writeFile(tmpDir, 'a.txt', 'hello');
    expect(hashFile(p)).toMatch(/^[0-9a-f]{16}$/);
  });

  it('is deterministic for same content', () => {
    tmpDir = makeTmpDir();
    const a = writeFile(tmpDir, 'a.txt', 'same content');
    const b = writeFile(tmpDir, 'b.txt', 'same content');
    expect(hashFile(a)).toBe(hashFile(b));
  });

  it('differs for different content', () => {
    tmpDir = makeTmpDir();
    const a = writeFile(tmpDir, 'a.txt', 'content A');
    const b = writeFile(tmpDir, 'b.txt', 'content B');
    expect(hashFile(a)).not.toBe(hashFile(b));
  });

  it('throws for non-existent file', () => {
    expect(() => hashFile('/nonexistent-file-path')).toThrow();
  });
});

describe('TS→GD freshness', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns false for unknown entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const ts = writeFile(tmpDir, 'project/a.ts', 'ts');
    const gd = writeFile(tmpDir, 'project/a.gd', 'gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts code');
    const gd = writeFile(rootDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, undefined, rootDir);
    expect(cache.isTsToGdFresh(ts, gd)).toBe(true);
  });

  it('returns false when TS source is modified', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'original ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, undefined, rootDir);
    writeFileSync(ts, 'modified ts');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns false when GD output is modified', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts code');
    const gd = writeFile(rootDir, 'a.gd', 'original gd');
    cache.updateTsToGd(ts, gd, undefined, rootDir);
    writeFileSync(gd, 'modified gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns false when GD file is deleted', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts code');
    const gd = writeFile(rootDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, undefined, rootDir);
    rmSync(gd);
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });
});

describe('source map storage', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('stores and retrieves source map JSON', () => {
    tmpDir = makeTmpDir();
    const sourcemapsDir = join(tmpDir, 'maps');
    const cache = new ProjectCache(join(tmpDir, 'cache'), sourcemapsDir);
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    const mapJson = '{"version":3,"mappings":"AAAA"}';
    cache.updateTsToGd(ts, gd, mapJson, rootDir);
    const result = cache.getSourceMap(gd, rootDir);
    // getSourceMap returns raw JSON (including embedded _tsHash/_gdHash);
    // consumers ignore unknown fields per the source map spec
    const parsed = JSON.parse(result!);
    expect(parsed.version).toBe(3);
    expect(parsed.mappings).toBe('AAAA');
    expect(parsed._gdHash).toMatch(/^[0-9a-f]{16}$/);
  });

  it('returns undefined when no source map stored', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    cache.updateTsToGd(ts, gd, undefined, rootDir);
    expect(cache.getSourceMap(gd, rootDir)).toBeUndefined();
  });

  it('returns undefined when GD file was modified (stale map)', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'original gd');
    cache.updateTsToGd(ts, gd, '{"version":3,"mappings":"AAAA"}', rootDir);
    // Modify GD file → embedded gdHash won't match → stale
    writeFileSync(gd, 'modified gd');
    expect(cache.getSourceMap(gd, rootDir)).toBeUndefined();
  });

  it('embeds _tsHash and _gdHash in the .map file on disk', () => {
    tmpDir = makeTmpDir();
    const sourcemapsDir = join(tmpDir, 'maps');
    const cache = new ProjectCache(join(tmpDir, 'cache'), sourcemapsDir);
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts content');
    const gd = writeFile(rootDir, 'a.gd', 'gd content');
    cache.updateTsToGd(ts, gd, '{"version":3}', rootDir);
    const mapPath = join(sourcemapsDir, 'a.gd.map');
    const raw = JSON.parse(readFileSync(mapPath, 'utf-8'));
    expect(raw._tsHash).toMatch(/^[0-9a-f]{16}$/);
    expect(raw._gdHash).toMatch(/^[0-9a-f]{16}$/);
    expect(raw._tsHash).toBe(hashFile(ts));
    expect(raw._gdHash).toBe(hashFile(gd));
  });

  it('stores map at correct nested path in sourcemapsDir', () => {
    tmpDir = makeTmpDir();
    const sourcemapsDir = join(tmpDir, 'maps');
    const cache = new ProjectCache(join(tmpDir, 'cache'), sourcemapsDir);
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'sub/deep/a.ts', 'ts');
    const gd = writeFile(rootDir, 'sub/deep/a.gd', 'gd');
    cache.updateTsToGd(ts, gd, '{"mappings":""}', rootDir);
    const expectedMapPath = join(sourcemapsDir, 'sub', 'deep', 'a.gd.map');
    expect(existsSync(expectedMapPath)).toBe(true);
  });
});

describe('addon freshness', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns false for unknown addon', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const gd = writeFile(tmpDir, 'addon.gd', 'gd');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const gd = writeFile(tmpDir, 'addon.gd', 'gd code');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts code');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts code');
    cache.updateAddon(gd, ts, dts);
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(true);
  });

  it('returns false when any of the three files changes', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));

    // Test GD change
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const dts = writeFile(tmpDir, 'a.d.ts', 'dts');
    cache.updateAddon(gd, ts, dts);
    writeFileSync(gd, 'gd modified');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);

    // Test TS change
    cache.updateAddon(gd, ts, dts); // re-update with current content
    writeFileSync(ts, 'ts modified');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);

    // Test DTS change
    cache.updateAddon(gd, ts, dts);
    writeFileSync(dts, 'dts modified');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);
  });
});

describe('typings freshness and invalidation', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns false for unknown entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn content');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts content');
    cache.updateTypings(src, dts);
    expect(cache.isTypingsFresh(src, dts)).toBe(true);
  });

  it('returns false when source changes', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const src = writeFile(tmpDir, 'scene.tscn', 'original');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');
    cache.updateTypings(src, dts);
    writeFileSync(src, 'modified');
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('invalidateTypings removes the entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');
    cache.updateTypings(src, dts);
    expect(cache.isTypingsFresh(src, dts)).toBe(true);
    cache.invalidateTypings(src);
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });
});

describe('persistence (save and reload)', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('tsToGd entries survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts code');
    const gd = writeFile(rootDir, 'a.gd', 'gd code');

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateTsToGd(ts, gd, undefined, rootDir);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir, mapsDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(true);
  });

  it('source maps survive reload (stored on disk)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    const mapJson = '{"version":3,"sources":["a.ts"]}';

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateTsToGd(ts, gd, mapJson, rootDir);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir, mapsDir);
    const result = cache2.getSourceMap(gd, rootDir);
    expect(result).toBeDefined();
    const parsed = JSON.parse(result!);
    expect(parsed.version).toBe(3);
    expect(parsed.sources).toEqual(['a.ts']);
  });

  it('addon entries survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const gd = writeFile(tmpDir, 'addon.gd', 'gd');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts');

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateAddon(gd, ts, dts);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir, mapsDir);
    expect(cache2.isAddonFresh(gd, ts, dts)).toBe(true);
  });

  it('typings entries survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateTypings(src, dts);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir, mapsDir);
    expect(cache2.isTypingsFresh(src, dts)).toBe(true);
  });
});

describe('version mismatch', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('clears cache when cache.json has a different version', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateTsToGd(ts, gd, undefined, rootDir);
    cache1.save();

    // Tamper with version
    const cacheFile = join(cacheDir, 'cache.json');
    const data = JSON.parse(readFileSync(cacheFile, 'utf-8'));
    data.version = '99.99.99';
    writeFileSync(cacheFile, JSON.stringify(data));

    const cache2 = new ProjectCache(cacheDir, mapsDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('preserves cache when version matches', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const mapsDir = join(tmpDir, 'maps');
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');

    const cache1 = new ProjectCache(cacheDir, mapsDir);
    cache1.updateTsToGd(ts, gd, undefined, rootDir);
    cache1.save();

    // Reload without tampering
    const cache2 = new ProjectCache(cacheDir, mapsDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(true);
  });
});

describe('corrupted cache.json', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('handles invalid JSON gracefully (starts fresh)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(join(cacheDir, 'cache.json'), 'not valid json{{');

    const cache = new ProjectCache(cacheDir, join(tmpDir, 'maps'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('handles missing cache.json (first run)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    mkdirSync(cacheDir, { recursive: true });
    // No cache.json written

    const cache = new ProjectCache(cacheDir, join(tmpDir, 'maps'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });
});

describe('cleanStale', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('removes entries not in current file set', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const tsA = writeFile(rootDir, 'a.ts', 'a');
    const gdA = writeFile(rootDir, 'a.gd', 'a');
    const tsB = writeFile(rootDir, 'b.ts', 'b');
    const gdB = writeFile(rootDir, 'b.gd', 'b');

    cache.updateTsToGd(tsA, gdA, undefined, rootDir);
    cache.updateTsToGd(tsB, gdB, undefined, rootDir);

    // Only keep a.ts
    const currentFiles = new Set([tsA.replace(/\\/g, '/')]);
    cache.cleanStale(currentFiles);

    expect(cache.isTsToGdFresh(tsA, gdA)).toBe(true);
    expect(cache.isTsToGdFresh(tsB, gdB)).toBe(false);
  });

  it('undefined params skip that section (do not wipe)', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, undefined, rootDir);
    cache.updateTypings(src, dts);

    // Pass all undefined — nothing should be cleaned
    cache.cleanStale(undefined, undefined, undefined);

    expect(cache.isTsToGdFresh(ts, gd)).toBe(true);
    expect(cache.isTypingsFresh(src, dts)).toBe(true);
  });

  it('empty set removes all entries in that section', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    const addonGd = writeFile(tmpDir, 'addon.gd', 'gd');
    const addonTs = writeFile(tmpDir, 'addon.ts', 'ts');
    const addonDts = writeFile(tmpDir, 'addon.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, undefined, rootDir);
    cache.updateAddon(addonGd, addonTs, addonDts);

    // Empty set for tsToGd wipes it, undefined for addons preserves it
    cache.cleanStale(new Set(), undefined);

    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
    expect(cache.isAddonFresh(addonGd, addonTs, addonDts)).toBe(true);
  });

  it('does not delete stale .map files (they are self-validating)', () => {
    tmpDir = makeTmpDir();
    const sourcemapsDir = join(tmpDir, 'maps');
    const cache = new ProjectCache(join(tmpDir, 'cache'), sourcemapsDir);
    const rootDir = join(tmpDir, 'project');

    const tsA = writeFile(rootDir, 'a.ts', 'a');
    const gdA = writeFile(rootDir, 'a.gd', 'a');
    const tsB = writeFile(rootDir, 'b.ts', 'b');
    const gdB = writeFile(rootDir, 'b.gd', 'b');

    cache.updateTsToGd(tsA, gdA, '{"version":3}', rootDir);
    cache.updateTsToGd(tsB, gdB, '{"version":3}', rootDir);

    const mapA = join(sourcemapsDir, 'a.gd.map');
    const mapB = join(sourcemapsDir, 'b.gd.map');
    expect(existsSync(mapA)).toBe(true);
    expect(existsSync(mapB)).toBe(true);

    // Remove b.ts from current files → entry cleaned, but .map stays on disk
    const currentFiles = new Set([tsA.replace(/\\/g, '/')]);
    cache.cleanStale(currentFiles);

    expect(existsSync(mapA)).toBe(true);
    expect(existsSync(mapB)).toBe(true); // still on disk, but getSourceMap validates via hash
  });
});

describe('clear', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('resets all in-memory data', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'), join(tmpDir, 'maps'));
    const rootDir = join(tmpDir, 'project');
    const ts = writeFile(rootDir, 'a.ts', 'ts');
    const gd = writeFile(rootDir, 'a.gd', 'gd');
    const src = writeFile(tmpDir, 's.tscn', 'tscn');
    const dts = writeFile(tmpDir, 's.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, undefined, rootDir);
    cache.updateTypings(src, dts);
    cache.save();

    cache.clear();

    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('removes cacheDir from disk', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const cache = new ProjectCache(cacheDir, join(tmpDir, 'maps'));
    cache.save();
    expect(existsSync(cacheDir)).toBe(true);

    cache.clear();
    expect(existsSync(cacheDir)).toBe(false);
  });
});
