import { describe, it, expect, afterEach } from 'vitest';
import { writeFileSync, readFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import {
  ProjectCache,
  hashFile,
  type CachedDiagnostic,
} from '../../src/cache/index.ts';

// ─── Helpers ────────────────────────────────────────────────

function makeTmpDir(): string {
  const dir = join(
    tmpdir(),
    `tstogd-cache-test-${randomBytes(4).toString('hex')}`,
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
    const mapWithContent =
      '{"version":3,"mappings":"","sourcesContent":["full source code"]}';
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
    const mapWithHashes =
      '{"version":3,"mappings":"","_tsHash":"abc","_gdHash":"def"}';
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
      {
        message: 'test warning',
        severity: 'warning',
        file: ts,
        line: 5,
        column: 3,
      },
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

// ─── Cache-folder `.gd` mirror ───────────────────────────────

describe('cache-folder gd-output', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('stores the .gd in <cacheDir>/gd-output/ when gdContent is provided', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'src/a.ts', 'ts');
    const gd = writeFile(tmpDir, 'gd/a.gd', 'ORIG'); // real path content that will NOT be overwritten
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, {
      gdContent: 'func foo():\n\tpass\n',
    });

    expect(cache.hasFreshCachedGd(ts)).toBe(true);
    const cachedPath = cache.getCachedGdPath(ts);
    expect(cachedPath).toBeDefined();
    expect(existsSync(cachedPath!)).toBe(true);
    expect(readFileSync(cachedPath!, 'utf-8')).toBe('func foo():\n\tpass\n');
    // Real gd path was NOT touched — the mirror is separate storage.
    expect(readFileSync(gd, 'utf-8')).toBe('ORIG');
  });

  it('does not create the mirror when gdContent is omitted', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);

    expect(cache.hasFreshCachedGd(ts)).toBe(false);
    expect(cache.getCachedGdPath(ts)).toBeUndefined();
  });

  it('uses supplied tsContent for hash (supports in-memory buffer conversion)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'disk-content');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);

    // Plugin converted "buffer-content" (disk still has "disk-content").
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, {
      tsContent: 'buffer-content',
      gdContent: 'buffer-gd',
    });

    // Disk hash != buffer hash → CLI sees stale entry, refuses to reuse.
    expect(cache.isTsToGdFresh(ts, gd)).toBe(false);

    // After user saves buffer → disk, entry matches.
    writeFileSync(ts, 'buffer-content');
    // gd on disk is still "gd", so we need to check cache-folder path.
    expect(cache.hasFreshCachedGd(ts)).toBe(true);
  });

  it('hasFreshCachedGd returns false when mirror file was tampered with', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'good' });

    const mirror = cache.getCachedGdPath(ts)!;
    writeFileSync(mirror, 'tampered');
    expect(cache.hasFreshCachedGd(ts)).toBe(false);
  });

  it('hasFreshCachedGd returns false when the TS source was edited after caching', () => {
    // Regression: previously `hasFreshCachedGd` only validated the
    // mirror's own content hash. The watcher's probe order is
    // `isTsToGdFresh` → `hasFreshCachedGd` → promote. When the user
    // edits the TS, the first returns false (gdHash mismatch on real
    // .gd, or real .gd missing). Without also verifying `tsHash`, the
    // second returns true and the promote path silently writes a
    // STALE `.gd` (compiled from the old TS) to the real output.
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'v1-source');
    const gd = writeFile(tmpDir, 'a.gd', 'gd-v1');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'gd-v1' });

    // Sanity: entry is fresh right after writing.
    expect(cache.hasFreshCachedGd(ts)).toBe(true);

    // User edits the TS file — mirror still exists untouched, but now
    // corresponds to the old v1 source.
    writeFileSync(ts, 'v2-source');
    expect(cache.hasFreshCachedGd(ts)).toBe(false);

    // And therefore promote is a no-op — nothing stale gets written.
    expect(cache.promoteCachedGd(ts, gd)).toBe(false);
  });

  it('promoteCachedGd moves the mirror to the target path and consumes it', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gdTarget = join(tmpDir, 'real/a.gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gdTarget, EMPTY_MAP, DIAGS, {
      gdContent: 'func foo():\n\tpass\n',
    });

    const mirrorBefore = cache.getCachedGdPath(ts)!;
    expect(existsSync(mirrorBefore)).toBe(true);

    const ok = cache.promoteCachedGd(ts, gdTarget);
    expect(ok).toBe(true);
    expect(readFileSync(gdTarget, 'utf-8')).toBe('func foo():\n\tpass\n');
    // Mirror gone; entry remains fresh because real path now matches.
    expect(existsSync(mirrorBefore)).toBe(false);
    expect(cache.isTsToGdFresh(ts, gdTarget)).toBe(true);
  });

  it('promoteCachedGd returns false when there is no fresh mirror', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gdTarget = join(tmpDir, 'a.gd');
    const cache = new ProjectCache(cacheDir);

    expect(cache.promoteCachedGd(ts, gdTarget)).toBe(false);
  });

  it('cleanStale removes the mirror when the TS entry is evicted', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'gd' });
    const mirror = cache.getCachedGdPath(ts)!;
    expect(existsSync(mirror)).toBe(true);

    // Evict — source no longer exists in currentTsFiles set.
    cache.cleanStale(new Set());
    expect(existsSync(mirror)).toBe(false);
  });

  it('updateTsToGd without gdContent drops the previous mirror (no orphan)', () => {
    // Regression: a no-gdContent update previously preserved the old
    // `cachedGdRel`, so if a prior call had cached a mirror for
    // different bytes, the orphan file stayed on disk forever.
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd-bytes');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'stale-mirror' });
    const mirror = cache.getCachedGdPath(ts)!;
    expect(existsSync(mirror)).toBe(true);

    // Second update goes through the "real .gd is source of truth" path.
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    expect(existsSync(mirror)).toBe(false);
    expect(cache.getCachedGdPath(ts)).toBeUndefined();
    expect(cache.hasFreshCachedGd(ts)).toBe(false);
  });

  it('updateTsToGd with new gdContent replaces the mirror bytes in-place', () => {
    // Same mirror path (tsPath unchanged) → overwrite with new bytes,
    // no orphan left behind.
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);

    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'v1' });
    const mirror = cache.getCachedGdPath(ts)!;
    expect(readFileSync(mirror, 'utf-8')).toBe('v1');

    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'v2' });
    // Same path, new bytes.
    expect(cache.getCachedGdPath(ts)).toBe(mirror);
    expect(readFileSync(mirror, 'utf-8')).toBe('v2');
    // Cache folder is tidy: exactly one `.gd` under gd-output/.
    const mirrorDir = join(cacheDir, 'gd-output');
    const files = existsSync(mirrorDir)
      ? require('fs')
          .readdirSync(mirrorDir)
          .filter((f: string) => f.endsWith('.gd'))
      : [];
    expect(files).toHaveLength(1);
  });

  it('persists cachedGdRel across save/load', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'content' });
    cache1.save();

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.hasFreshCachedGd(ts)).toBe(true);
    expect(cache2.getCachedGdPath(ts)).toBe(cache1.getCachedGdPath(ts));
  });
});

// ─── Atomic cache.json write ─────────────────────────────────

describe('atomic cache.json write', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('cache.json never appears half-written (tmp file staging)', () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache.save();

    const cacheFile = join(cacheDir, 'cache.json');
    expect(existsSync(cacheFile)).toBe(true);
    // Must be valid JSON — any half-write would fail parsing.
    expect(() => JSON.parse(readFileSync(cacheFile, 'utf-8'))).not.toThrow();
    // No .tmp leftovers.
    const leftovers = require('fs')
      .readdirSync(cacheDir)
      .filter((f: string) => f.includes('.tmp'));
    expect(leftovers).toEqual([]);
  });
});

// ─── saveAsync ───────────────────────────────────────────────

describe('ProjectCache saveAsync', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('persists the same data as save() and survives reload', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts-content');
    const gd = writeFile(tmpDir, 'a.gd', 'gd-content');

    const cache1 = new ProjectCache(cacheDir);
    cache1.updateTsToGd(ts, gd, EMPTY_MAP, [
      { message: 'hi', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
    await cache1.saveAsync();

    const cache2 = new ProjectCache(cacheDir);
    expect(cache2.isTsToGdFresh(ts, gd)).toBe(true);
    expect(cache2.getDiagnostics(ts)).toEqual([
      { message: 'hi', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
  });

  it('produces atomic cache.json (no half-written files, no .tmp leftovers)', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    await cache.saveAsync();

    const cacheFile = join(cacheDir, 'cache.json');
    expect(existsSync(cacheFile)).toBe(true);
    expect(() => JSON.parse(readFileSync(cacheFile, 'utf-8'))).not.toThrow();
    const leftovers = require('fs')
      .readdirSync(cacheDir)
      .filter((f: string) => f.includes('.tmp'));
    expect(leftovers).toEqual([]);
  });

  it('serializes concurrent saveAsync calls — last-queued state wins', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');
    const cache = new ProjectCache(cacheDir);

    // Fire three overlapping saves — each captures a different
    // snapshot of diagnostics at call time. The *final* on-disk state
    // should match the last-queued snapshot (here: 'third').
    cache.updateTsToGd(ts, gd, EMPTY_MAP, [
      { message: 'first', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
    const p1 = cache.saveAsync();
    cache.updateTsToGd(ts, gd, EMPTY_MAP, [
      { message: 'second', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
    const p2 = cache.saveAsync();
    cache.updateTsToGd(ts, gd, EMPTY_MAP, [
      { message: 'third', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
    const p3 = cache.saveAsync();

    await Promise.all([p1, p2, p3]);

    const reloaded = new ProjectCache(cacheDir);
    expect(reloaded.getDiagnostics(ts)).toEqual([
      { message: 'third', severity: 'warning', file: ts, line: 1, column: 1 },
    ]);
    // No .tmp file stragglers after all saves settled.
    const leftovers = require('fs')
      .readdirSync(cacheDir)
      .filter((f: string) => f.includes('.tmp'));
    expect(leftovers).toEqual([]);
  });

  it('self-write filter: own saveAsync does not trigger watch reload', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache = new ProjectCache(cacheDir, {
      watch: true,
      watchInterval: 100,
    });
    try {
      cache.updateTsToGd(ts, gd, EMPTY_MAP, [
        {
          message: 'self-async',
          severity: 'warning',
          file: ts,
          line: 1,
          column: 1,
        },
      ]);
      await cache.saveAsync();

      // Mutate only in memory. A self-triggered reload would overwrite it.
      cache.updateTsToGd(ts, gd, EMPTY_MAP, [
        {
          message: 'in-memory',
          severity: 'warning',
          file: ts,
          line: 1,
          column: 1,
        },
      ]);
      await new Promise((r) => setTimeout(r, 400));

      expect(cache.getDiagnostics(ts)![0].message).toBe('in-memory');
    } finally {
      await cache.close();
    }
  });
});

// ─── Watch mode (cross-instance coherency) ───────────────────

describe('ProjectCache watch mode', () => {
  let tmpDir: string;
  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  /**
   * The watch mode uses chokidar (event-driven, with `awaitWriteFinish`
   * stability debounce). External writes propagate near-instantly on
   * platforms with native FS events; the wait covers the debounce plus
   * a small slack for CI jitter. `WATCH_INTERVAL` is chokidar's polling
   * fallback cadence — used only on exotic filesystems.
   */
  const WATCH_INTERVAL = 100;
  const POLL_WAIT = 400;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  it('picks up external writes after the poll interval', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    // Writer instance populates the cache.
    const writer = new ProjectCache(cacheDir);
    writer.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS, { gdContent: 'gd' });
    writer.save();

    // Reader instance with watch enabled.
    const reader = new ProjectCache(cacheDir, {
      watch: true,
      watchInterval: WATCH_INTERVAL,
    });
    try {
      expect(reader.getDiagnostics(ts)).toEqual([]);

      // Externally update through a different instance.
      const external = new ProjectCache(cacheDir);
      external.updateTsToGd(ts, gd, EMPTY_MAP, [
        {
          message: 'external',
          severity: 'warning',
          file: ts,
          line: 1,
          column: 1,
        },
      ]);
      external.save();

      await sleep(POLL_WAIT);

      const diags = reader.getDiagnostics(ts);
      expect(diags).toHaveLength(1);
      expect(diags![0].message).toBe('external');
    } finally {
      await reader.close();
    }
  });

  it('does NOT reload on its own save()', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache = new ProjectCache(cacheDir, {
      watch: true,
      watchInterval: WATCH_INTERVAL,
    });
    try {
      // Make a change that's NOT reflected on disk, then save.
      cache.updateTsToGd(ts, gd, EMPTY_MAP, [
        {
          message: 'self-write',
          severity: 'warning',
          file: ts,
          line: 1,
          column: 1,
        },
      ]);
      cache.save();
      expect(cache.getDiagnostics(ts)![0].message).toBe('self-write');

      // Wait past several poll ticks. If the listener mistook our own
      // save for an external write, it would have reloaded from disk
      // (which would have the same content anyway, but importantly NOT
      // overwrite our in-memory mutations made *after* save).
      //
      // To distinguish: mutate in memory without saving, then wait.
      // A self-triggered reload would drop this mutation.
      cache.updateTsToGd(ts, gd, EMPTY_MAP, [
        {
          message: 'in-memory-only',
          severity: 'warning',
          file: ts,
          line: 2,
          column: 2,
        },
      ]);
      await sleep(POLL_WAIT);

      // Still the in-memory value — no self-triggered reload clobbered it.
      expect(cache.getDiagnostics(ts)![0].message).toBe('in-memory-only');
    } finally {
      await cache.close();
    }
  });

  it('close() stops watching (safe to call, idempotent)', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache = new ProjectCache(cacheDir, {
      watch: true,
      watchInterval: WATCH_INTERVAL,
    });
    new ProjectCache(cacheDir).updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    await cache.close();
    await cache.close(); // second call must not throw

    // After close, external writes should NOT propagate.
    const snapshot = JSON.stringify(cache.getDiagnostics(ts) ?? null);
    const external = new ProjectCache(cacheDir);
    external.updateTsToGd(ts, gd, EMPTY_MAP, [
      {
        message: 'too late',
        severity: 'warning',
        file: ts,
        line: 1,
        column: 1,
      },
    ]);
    external.save();
    await sleep(POLL_WAIT);

    expect(JSON.stringify(cache.getDiagnostics(ts) ?? null)).toBe(snapshot);
  });

  it('watch mode is off by default (no reload on external write)', async () => {
    tmpDir = makeTmpDir();
    const cacheDir = join(tmpDir, 'cache');
    const ts = writeFile(tmpDir, 'a.ts', 'ts');
    const gd = writeFile(tmpDir, 'a.gd', 'gd');

    const cache = new ProjectCache(cacheDir); // no options → no watch
    cache.updateTsToGd(ts, gd, EMPTY_MAP, DIAGS);
    cache.save();

    const external = new ProjectCache(cacheDir);
    external.updateTsToGd(ts, gd, EMPTY_MAP, [
      {
        message: 'external',
        severity: 'warning',
        file: ts,
        line: 1,
        column: 1,
      },
    ]);
    external.save();

    await sleep(POLL_WAIT);

    // Default-mode cache keeps its old snapshot — no background polling.
    expect(cache.getDiagnostics(ts)).toEqual([]);
  });
});
