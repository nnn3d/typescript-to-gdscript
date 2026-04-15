/**
 * Project-level cache for TS→GD conversion, addon GD→TS, and typings generation.
 * Stores file hashes to skip redundant work. Source maps are stored in a
 * separate directory mirroring the GD file structure.
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  unlinkSync,
  readdirSync,
  statSync,
} from 'fs';
import { createHash } from 'crypto';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

// ─── Package version (for cache invalidation) ──────────────

// Read version from package.json at module scope (relative to compiled dist/ or src/)
let PACKAGE_VERSION = '0.0.0';
try {
  const pkgPath = join(
    dirname(fileURLToPath(import.meta.url)),
    '../../package.json',
  );
  if (existsSync(pkgPath)) {
    PACKAGE_VERSION =
      JSON.parse(readFileSync(pkgPath, 'utf-8')).version ?? '0.0.0';
  }
} catch {
  /* fallback to 0.0.0 */
}

// ─── Types ──────────────────────────────────────────────────

interface TsToGdEntry {
  tsHash: string;
  gdHash: string;
  /** Relative path from sourcemapsDir to the .map file (for orphan cleanup) */
  mapRelPath?: string;
}

interface AddonEntry {
  gdHash: string;
  tsHash: string;
  dtsHash: string;
}

interface TypingsEntry {
  sourceHash: string;
  dtsHash: string;
}

interface CacheManifest {
  version: string;
  tsToGd: Record<string, TsToGdEntry>;
  addons: Record<string, AddonEntry>;
  typings: Record<string, TypingsEntry>;
}

// ─── ProjectCache ───────────────────────────────────────────

export class ProjectCache {
  private cacheDir: string;
  private sourcemapsDir: string;
  private cacheFile: string;
  private data: CacheManifest;

  constructor(cacheDir: string, sourcemapsDir: string) {
    this.cacheDir = cacheDir;
    this.sourcemapsDir = sourcemapsDir;
    this.cacheFile = join(cacheDir, 'cache.json');
    this.data = this.load();
  }

  private load(): CacheManifest {
    if (existsSync(this.cacheFile)) {
      try {
        const raw = readFileSync(this.cacheFile, 'utf-8');
        const data = JSON.parse(raw) as CacheManifest;
        // Version mismatch → clear cache
        if (data.version === PACKAGE_VERSION) {
          return data;
        }
        console.log(`[cache] Version changed (${data.version} → ${PACKAGE_VERSION}), clearing cache`);
        this.clearFiles();
      } catch {
        // Corrupted cache; start fresh
      }
    }
    return this.empty();
  }

  private empty(): CacheManifest {
    return { version: PACKAGE_VERSION, tsToGd: {}, addons: {}, typings: {} };
  }

  // ── TS→GD ─────────────────────────────────────────────────

  /** Check if a TS→GD conversion is still fresh (ts hash and gd hash match). */
  isTsToGdFresh(tsPath: string, gdPath: string): boolean {
    const key = this.normKey(tsPath);
    const entry = this.data.tsToGd[key];
    if (!entry) return false;
    try {
      return hashFile(tsPath) === entry.tsHash && hashFile(gdPath) === entry.gdHash;
    } catch { return false; }
  }

  /** Update TS→GD cache entry and write source map to cache. */
  updateTsToGd(
    tsPath: string,
    gdPath: string,
    sourceMap: string | undefined,
    rootDir: string,
  ): void {
    const key = this.normKey(tsPath);
    const mapRelPath = sourceMap
      ? relative(rootDir, gdPath).replace(/\\/g, '/') + '.map'
      : undefined;
    this.data.tsToGd[key] = {
      tsHash: hashFile(tsPath),
      gdHash: hashFile(gdPath),
      ...(mapRelPath ? { mapRelPath } : {}),
    };
    if (sourceMap) {
      this.writeSourceMap(gdPath, sourceMap, rootDir);
    }
  }

  /** Read a cached source map for a GD file. Returns JSON string or undefined. */
  getSourceMap(gdPath: string, rootDir: string): string | undefined {
    const mapPath = this.sourceMapPath(gdPath, rootDir);
    if (existsSync(mapPath)) {
      try { return readFileSync(mapPath, 'utf-8'); } catch { /* */ }
    }
    return undefined;
  }

  // ── Addons (GD→TS) ────────────────────────────────────────

  /** Check if an addon file conversion is fresh (gd, ts, d.ts hashes match). */
  isAddonFresh(gdPath: string, tsPath: string, dtsPath: string): boolean {
    const key = this.normKey(gdPath);
    const entry = this.data.addons[key];
    if (!entry) return false;
    try {
      return (
        hashFile(gdPath) === entry.gdHash &&
        existsSync(tsPath) && hashFile(tsPath) === entry.tsHash &&
        existsSync(dtsPath) && hashFile(dtsPath) === entry.dtsHash
      );
    } catch { return false; }
  }

  /** Update addon cache entry after full pipeline (convert + ts-helpers). */
  updateAddon(gdPath: string, tsPath: string, dtsPath: string): void {
    const key = this.normKey(gdPath);
    this.data.addons[key] = {
      gdHash: hashFile(gdPath),
      tsHash: hashFile(tsPath),
      dtsHash: hashFile(dtsPath),
    };
  }

  // ── Typings ────────────────────────────────────────────────

  /** Check if typings for a source file are fresh. */
  isTypingsFresh(sourcePath: string, dtsPath: string): boolean {
    const key = this.normKey(sourcePath);
    const entry = this.data.typings[key];
    if (!entry) return false;
    try {
      return (
        hashFile(sourcePath) === entry.sourceHash &&
        existsSync(dtsPath) && hashFile(dtsPath) === entry.dtsHash
      );
    } catch { return false; }
  }

  /** Update typings cache entry. */
  updateTypings(sourcePath: string, dtsPath: string): void {
    const key = this.normKey(sourcePath);
    this.data.typings[key] = {
      sourceHash: hashFile(sourcePath),
      dtsHash: hashFile(dtsPath),
    };
  }

  /** Invalidate typings entry when source changes (removes dtsHash). */
  invalidateTypings(sourcePath: string): void {
    const key = this.normKey(sourcePath);
    delete this.data.typings[key];
  }

  // ── Stale cleanup ─────────────────────────────────────────

  /**
   * Remove cache entries for files that no longer exist in the project.
   * Pass undefined to skip a section (e.g. convert only knows about TS files).
   * Also removes orphaned source map files when currentTsFiles is provided.
   */
  cleanStale(
    currentTsFiles?: Set<string>,
    currentAddonFiles?: Set<string>,
    currentTypingSources?: Set<string>,
  ): void {
    // Clean tsToGd entries first, then orphaned source maps.
    // Order matters: cleanOrphanedSourceMaps reads the remaining entries
    // to determine which .map files are still valid.
    if (currentTsFiles) {
      for (const key of Object.keys(this.data.tsToGd)) {
        if (!currentTsFiles.has(key)) {
          delete this.data.tsToGd[key];
        }
      }
      this.cleanOrphanedSourceMaps();
    }
    // Clean addons
    if (currentAddonFiles) {
      for (const key of Object.keys(this.data.addons)) {
        if (!currentAddonFiles.has(key)) {
          delete this.data.addons[key];
        }
      }
    }
    // Clean typings
    if (currentTypingSources) {
      for (const key of Object.keys(this.data.typings)) {
        if (!currentTypingSources.has(key)) {
          delete this.data.typings[key];
        }
      }
    }
  }

  /**
   * Remove source map files that don't correspond to any remaining tsToGd entry.
   * Uses the `mapRelPath` stored in each entry to determine which files are valid.
   */
  private cleanOrphanedSourceMaps(): void {
    if (!existsSync(this.sourcemapsDir)) return;
    // Collect valid map relative paths from remaining tsToGd entries
    const validMapPaths = new Set<string>();
    for (const entry of Object.values(this.data.tsToGd)) {
      if (entry.mapRelPath) {
        validMapPaths.add(entry.mapRelPath);
      }
    }
    try {
      walkDir(this.sourcemapsDir, (filePath) => {
        if (!filePath.endsWith('.map')) return;
        const rel = relative(this.sourcemapsDir, filePath).replace(/\\/g, '/');
        if (!validMapPaths.has(rel)) {
          try { unlinkSync(filePath); } catch { /* */ }
        }
      });
    } catch { /* ignore errors during cleanup */ }
  }

  // ── Persistence ────────────────────────────────────────────

  /** Write cache manifest to disk. */
  save(): void {
    mkdirSync(this.cacheDir, { recursive: true });
    writeFileSync(this.cacheFile, JSON.stringify(this.data, null, 2));
  }

  /** Clear all cache data and files. */
  clear(): void {
    this.data = this.empty();
    this.clearFiles();
  }

  private clearFiles(): void {
    if (existsSync(this.cacheDir)) {
      rmSync(this.cacheDir, { recursive: true, force: true });
    }
  }

  // ── Source map file helpers ────────────────────────────────

  private sourceMapPath(gdPath: string, rootDir: string): string {
    const rel = relative(rootDir, gdPath).replace(/\\/g, '/');
    return join(this.sourcemapsDir, rel + '.map');
  }

  private writeSourceMap(gdPath: string, sourceMap: string, rootDir: string): void {
    const mapPath = this.sourceMapPath(gdPath, rootDir);
    mkdirSync(dirname(mapPath), { recursive: true });
    writeFileSync(mapPath, sourceMap);
  }

  // ── Key normalization ─────────────────────────────────────

  private normKey(absPath: string): string {
    return absPath.replace(/\\/g, '/');
  }
}

// ─── Utilities ──────────────────────────────────────────────

/** MD5 hash of file content, hex-encoded, truncated to 16 chars. */
export function hashFile(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex').slice(0, 16);
}

/** Recursively walk a directory, calling `fn` for each file. */
function walkDir(dir: string, fn: (filePath: string) => void): void {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    try {
      if (statSync(fullPath).isDirectory()) {
        walkDir(fullPath, fn);
      } else {
        fn(fullPath);
      }
    } catch { /* skip inaccessible */ }
  }
}
