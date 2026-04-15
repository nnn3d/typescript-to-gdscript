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
        console.log(`[cache] Version changed (${data.version} → ${PACKAGE_VERSION}), clearing cache.`);
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
    const tsHash = hashFile(tsPath);
    const gdHash = hashFile(gdPath);
    this.data.tsToGd[key] = { tsHash, gdHash };
    if (sourceMap) {
      this.writeSourceMap(gdPath, sourceMap, rootDir, tsHash, gdHash);
    }
  }

  /**
   * Read a cached source map for a GD file. Returns the raw source map JSON
   * string (without the extra cache fields) or undefined if missing/stale.
   * Staleness is checked by comparing the embedded gdHash against the current
   * GD file on disk — if the file was modified, the map positions are invalid.
   */
  getSourceMap(gdPath: string, rootDir: string): string | undefined {
    const mapPath = this.sourceMapPath(gdPath, rootDir);
    if (!existsSync(mapPath)) return undefined;
    try {
      const raw = readFileSync(mapPath, 'utf-8');
      // Validate: if the GD file changed since the map was generated, it's stale.
      // The _gdHash field is embedded in the JSON — parse only to check it.
      // Return the raw string as-is; consumers ignore unknown fields per the spec.
      const parsed = JSON.parse(raw);
      if (parsed._gdHash && existsSync(gdPath) && hashFile(gdPath) !== parsed._gdHash) {
        return undefined;
      }
      return raw;
    } catch { return undefined; }
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
   * Source map files are NOT cleaned — they are self-validating via embedded
   * hashes and will be ignored by getSourceMap() when stale.
   */
  cleanStale(
    currentTsFiles?: Set<string>,
    currentAddonFiles?: Set<string>,
    currentTypingSources?: Set<string>,
  ): void {
    if (currentTsFiles) {
      for (const key of Object.keys(this.data.tsToGd)) {
        if (!currentTsFiles.has(key)) {
          delete this.data.tsToGd[key];
        }
      }
    }
    if (currentAddonFiles) {
      for (const key of Object.keys(this.data.addons)) {
        if (!currentAddonFiles.has(key)) {
          delete this.data.addons[key];
        }
      }
    }
    if (currentTypingSources) {
      for (const key of Object.keys(this.data.typings)) {
        if (!currentTypingSources.has(key)) {
          delete this.data.typings[key];
        }
      }
    }
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

  private writeSourceMap(
    gdPath: string, sourceMap: string, rootDir: string,
    tsHash: string, gdHash: string,
  ): void {
    const mapPath = this.sourceMapPath(gdPath, rootDir);
    mkdirSync(dirname(mapPath), { recursive: true });
    // Embed file hashes so the source map is self-validating
    try {
      const parsed = JSON.parse(sourceMap);
      parsed._tsHash = tsHash;
      parsed._gdHash = gdHash;
      writeFileSync(mapPath, JSON.stringify(parsed));
    } catch {
      // If source map isn't valid JSON, write as-is
      writeFileSync(mapPath, sourceMap);
    }
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
