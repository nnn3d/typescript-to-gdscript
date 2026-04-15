/**
 * Project-level cache for TS→GD conversion, addon GD→TS, and typings generation.
 * All data lives in a single cache.json manifest — entries are atomic (written
 * together, deleted together). Source maps and diagnostics are stored inline.
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
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

export interface CachedDiagnostic {
  message: string;
  severity: string;
  file: string;
  line: number;
  column: number;
}

interface TsToGdEntry {
  tsHash: string;
  gdHash: string;
  diagnostics: CachedDiagnostic[];
  /** Source map JSON (without sourcesContent to save space). */
  sourceMap: string;
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
  private cacheFile: string;
  private data: CacheManifest;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
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

  /** Update TS→GD cache entry with source map and diagnostics (atomic). */
  updateTsToGd(
    tsPath: string,
    gdPath: string,
    sourceMap: string,
    diagnostics: CachedDiagnostic[],
  ): void {
    const key = this.normKey(tsPath);
    this.data.tsToGd[key] = {
      tsHash: hashFile(tsPath),
      gdHash: hashFile(gdPath),
      diagnostics,
      sourceMap: stripSourceMapContent(sourceMap),
    };
  }

  /** Read the cached source map for a TS file. */
  getSourceMap(tsPath: string): string | undefined {
    const entry = this.data.tsToGd[this.normKey(tsPath)];
    return entry?.sourceMap;
  }

  /** Read cached diagnostics for a TS file. */
  getDiagnostics(tsPath: string): CachedDiagnostic[] | undefined {
    return this.data.tsToGd[this.normKey(tsPath)]?.diagnostics;
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

/** Strip `sourcesContent` from a source map JSON string to save cache space. */
function stripSourceMapContent(sourceMapJson: string): string {
  try {
    const parsed = JSON.parse(sourceMapJson);
    delete parsed.sourcesContent;
    delete parsed._tsHash;
    delete parsed._gdHash;
    return JSON.stringify(parsed);
  } catch {
    return sourceMapJson;
  }
}
