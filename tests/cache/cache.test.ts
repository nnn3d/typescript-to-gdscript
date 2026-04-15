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
import { ProjectCache, hashFile, type CachedDiagnostic } from '../../src/cache/index.ts';

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

const EMPTY_MAP = '{"version":3,"mappings":""}';
const DIAGS: CachedDiagnostic[] = [];

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
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'project/a.ts', 'ts');
    const gd = writeFile(tmpDir, 'project/a.gd', 'gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts code');
    const gd = writeFile(tmpDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    expect(cache.isTsToGdFresh(ts, gd)).toBe(true);
  });

  it('returns false when TS source is modified', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'original ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    writeFileSync(ts, 'modified ts');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns false when GD output is modified', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts code');
    const gd = writeFile(tmpDir, 'a.gd', 'original gd');
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    writeFileSync(gd, 'modified gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('returns false when GD file is deleted', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts code');
    const gd = writeFile(tmpDir, 'a.gd', 'gd code');
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    rmSync(gd);
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });
});

describe('source map storage (inline in cache.json)', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('stores and retrieves source map by TS path', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const mapJson = '{"version":3,"mappings":"AAAA"}';
    cache.updateTsToGd(ts, gd, mapJson, DIAGS);
    const result = cache.getSourceMap(ts);
    const parsed = JSON.parse(result!);
    expect(parsed.version).toBe(3);
    expect(parsed.mappings).toBe('AAAA');
  });

  it('returns undefined for unknown entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    expect(cache.getSourceMap('/nonexistent.ts')).toBeUndefined();
  });

  it('strips sourcesContent from stored map', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const mapWithContent = '{"version":3,"mappings":"","sourcesContent":["full source code"]}';
    cache.updateTsToGd(ts, gd, mapWithContent, DIAGS);
    const result = cache.getSourceMap(ts);
    const parsed = JSON.parse(result!);
    expect(parsed.sourcesContent).toBeUndefined();
    expect(parsed.version).toBe(3);
  });

  it('strips _tsHash and _gdHash from stored map', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const mapWithHashes = '{"version":3,"mappings":"","_tsHash":"abc","_gdHash":"def"}';
    cache.updateTsToGd(ts, gd, mapWithHashes, DIAGS);
    const result = cache.getSourceMap(ts);
    const parsed = JSON.parse(result!);
    expect(parsed._tsHash).toBeUndefined();
    expect(parsed._gdHash).toBeUndefined();
  });
});

describe('diagnostics caching', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('stores and retrieves diagnostics', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const diags: CachedDiagnostic[] = [
      { message: 'test warning', severity: 'warning', file: ts, line: 5, column: 3 },
    ];
    cache.updateTsToGd(ts, gd, EMPTY_MAP, diags);
    const result = cache.getDiagnostics(ts);
    expect(result).toHaveLength(1);
    expect(result![0].message).toBe('test warning');
    expect(result![0].severity).toBe('warning');
  });

  it('returns undefined for unknown entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    expect(cache.getDiagnostics('/nonexistent.ts')).toBeUndefined();
  });

  it('stores empty diagnostics array', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    cache.updateTsToGd(ts, gd, EMPTY_MAP, []);
    expect(cache.getDiagnostics(ts)).toEqual([]);
  });

  it('diagnostics survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const diags: CachedDiagnostic[] = [
      { message: 'persisted', severity: 'error', file: ts, line: 1, column: 0 },
    ];

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, diags);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.getDiagnostics(ts)).toEqual(diags);
  });
});

describe('addon freshness', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns false for unknown addon', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const gd = writeFile(tmpDir, 'addon.gd', 'gd');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const gd = writeFile(tmpDir, 'addon.gd', 'gd code');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts code');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts code');
    cache.updateAddon(gd, ts, dts);
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(true);
  });

  it('returns false when any of the three files changes', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));

    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const dts = writeFile(tmpDir, 'a.d.ts', 'dts');
    cache.updateAddon(gd, ts, dts);
    writeFileSync(gd, 'gd modified');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);

    cache.updateAddon(gd, ts, dts);
    writeFileSync(ts, 'ts modified');
    expect(cache.isAddonFresh(gd, ts, dts)).toBe(false);

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
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('returns true after update with unchanged files', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn content');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts content');
    cache.updateTypings(src, dts);
    expect(cache.isTypingsFresh(src, dts)).toBe(true);
  });

  it('returns false when source changes', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const src = writeFile(tmpDir, 'scene.tscn', 'original');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');
    cache.updateTypings(src, dts);
    writeFileSync(src, 'modified');
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('invalidateTypings removes the entry', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
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
    const ts = writeFile(tmpDir, 'a.ts', 'ts code');
    const gd = writeFile(tmpDir, 'a.gd', 'gd code');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(true);
  });

  it('source maps survive reload (stored in cache.json)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const mapJson = '{"version":3,"sources":["a.ts"]}';

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, mapJson, DIAGS);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
    const result = cache2.getSourceMap(ts);
    expect(result).toBeDefined();
    const parsed = JSON.parse(result!);
    expect(parsed.version).toBe(3);
    expect(parsed.sources).toEqual(['a.ts']);
  });

  it('addon entries survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const gd = writeFile(tmpDir, 'addon.gd', 'gd');
    const ts = writeFile(tmpDir, 'addon.ts', 'ts');
    const dts = writeFile(tmpDir, 'addon.d.ts', 'dts');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateAddon(gd, ts, dts);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.isAddonFresh(gd, ts, dts)).toBe(true);
  });

  it('typings entries survive save + reload', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTypings(src, dts);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
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
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache1.save();

    const cacheFile = join(cacheDir, 'cache.json');
    const data = JSON.parse(readFileSync(cacheFile, 'utf-8'));
    data.version = '99.99.99';
    writeFileSync(cacheFile, JSON.stringify(data));

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('preserves cache when version matches', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
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

    const cache = new ProjectCache(cacheDir);
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
  });

  it('handles missing cache.json (first run)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    mkdirSync(cacheDir, { recursive: true });

    const cache = new ProjectCache(cacheDir);
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
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const tsA = writeFile(tmpDir, 'a.ts', 'a');
    const gdA = writeFile(tmpDir, 'a.gd', 'a');
    const tsB = writeFile(tmpDir, 'b.ts', 'b');
    const gdB = writeFile(tmpDir, 'b.gd', 'b');

    cache.updateTsToGd(tsA, gdA, EMPTY_MAP, DIAGS);
    cache.updateTsToGd(tsB, gdB, EMPTY_MAP, DIAGS);

    const currentFiles = new Set([tsA.replace(/\\/g, '/')]);
    cache.cleanStale(currentFiles);

    expect(cache.isTsToGdFresh(tsA, gdA)).toBe(true);
    expect(cache.isTsToGdFresh(tsB, gdB)).toBe(false);
  });

  it('undefined params skip that section (do not wipe)', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const src = writeFile(tmpDir, 'scene.tscn', 'tscn');
    const dts = writeFile(tmpDir, 'scene.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache.updateTypings(src, dts);

    cache.cleanStale(undefined, undefined, undefined);

    expect(cache.isTsToGdFresh(ts, gd)).toBe(true);
    expect(cache.isTypingsFresh(src, dts)).toBe(true);
  });

  it('empty set removes all entries in that section', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const addonGd = writeFile(tmpDir, 'addon.gd', 'gd');
    const addonTs = writeFile(tmpDir, 'addon.ts', 'ts');
    const addonDts = writeFile(tmpDir, 'addon.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache.updateAddon(addonGd, addonTs, addonDts);

    cache.cleanStale(new Set(), undefined);

    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
    expect(cache.isAddonFresh(addonGd, addonTs, addonDts)).toBe(true);
  });
});

describe('clear', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('resets all in-memory data', () => {
    tmpDir = makeTmpDir();
    const cache = new ProjectCache(join(tmpDir, 'cache'));
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const src = writeFile(tmpDir, 's.tscn', 'tscn');
    const dts = writeFile(tmpDir, 's.d.ts', 'dts');

    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache.updateTypings(src, dts);
    cache.save();

    cache.clear();

    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);
    expect(cache.isTypingsFresh(src, dts)).toBe(false);
  });

  it('removes cacheDir from disk', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const cache = new ProjectCache(cacheDir);
    cache.save();
    expect(existsSync(cacheDir)).toBe(true);

    cache.clear();
    expect(existsSync(cacheDir)).toBe(false);
  });
});
