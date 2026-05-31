/**
 * Project-level cache for TS→GD conversion, addon GD→TS, and typings generation.
 * All data lives in a single cache.json manifest — entries are atomic (written
 * together, deleted together). Source maps and diagnostics are stored inline.
 *
 * TS→GD entries additionally keep a physical copy of the generated `.gd`
 * file under `<cacheDir>/gd-output/`. The CLI/watcher can then promote the
 * cached `.gd` to the real output path via a single `rename()` when the
 * plugin (or an earlier run) already produced the right bytes — saving a
 * full re-conversion.
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  renameSync,
  copyFileSync,
  statSync,
} from 'fs';
import * as fsp from 'fs/promises';
import { createHash, randomUUID } from 'crypto';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { watch as chokidarWatch, type FSWatcher } from 'chokidar';
import type { DiagnosticSeverity } from '../converter/common/index.ts';

export interface ProjectCacheOptions {
  /**
   * Watch `cache.json` for external writes and reload the in-memory
   * manifest when another process mutates it. Intended for long-lived
   * holders (the `watch` CLI, the ts-plugin inside tsserver) that run
   * alongside other writers. Self-writes via `save()` don't trigger a
   * reload — the current instance's own mtime is tracked and filtered.
   *
   * Default `false`. Leave off for short-lived callers (single
   * `convert` run) to avoid the small polling cost.
   */
  watch?: boolean;
  /**
   * Polling interval (ms) for the `watch` mode. Shorter = faster
   * cross-process propagation, higher CPU/IO. Defaults to 500ms —
   * imperceptible in interactive use and well under any human-scale
   * save-to-promote cycle.
   */
  watchInterval?: number;
}

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
  severity: DiagnosticSeverity;
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
  /**
   * Relative path (from the cache dir) to the stored `.gd` file.
   * Optional for back-compat with older entries that predate the
   * cache-folder feature.
   */
  cachedGdRel?: string;
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
  private gdOutputDir: string;
  private data: CacheManifest;

  /**
   * mtime in ms of the last `save()` we issued. The chokidar handler
   * compares incoming mtimes against this to decide whether a change
   * notification corresponds to our own write (ignored) or an external
   * one (reload).
   */
  private lastSelfWriteMtime: number | null = null;
  /** The chokidar watcher, kept so `close()` can tear it down. */
  private fileWatcher: FSWatcher | null = null;
  /**
   * Serialization chain for async saves. Each `saveAsync()` call
   * captures a snapshot of `this.data` synchronously, then queues its
   * I/O behind whatever async save is currently in flight. Ensures:
   *   - no two saves race on the rename step;
   *   - newest in-memory state always ends up on disk (FIFO ordering).
   */
  private saveChain: Promise<void> = Promise.resolve();
  /**
   * Monotonic counter that disambiguates tmp file names when saves
   * land within the same millisecond (Date.now() granularity).
   */
  private saveCounter = 0;

  constructor(cacheDir: string, options?: ProjectCacheOptions) {
    this.cacheDir = cacheDir;
    this.cacheFile = join(cacheDir, 'cache.json');
    this.gdOutputDir = join(cacheDir, 'gd-output');
    this.data = this.load();
    // NB: do NOT seed `lastSelfWriteMtime` from the existing file's mtime.
    // Only our own `save()` should set that field — otherwise an external
    // writer that happens to land at the same filesystem mtime as the
    // file already had at construction time would be misclassified as
    // our own write and ignored.
    if (options?.watch) {
      this.startWatching(options.watchInterval ?? 500);
    }
  }

  /**
   * Start watching `cache.json` for external writes via chokidar.
   * Event-driven: no idle polling, instant cross-process propagation.
   *
   * Our writers use atomic tmp-and-rename, which on Windows can surface
   * as unlink+add rather than change. We subscribe to both events to
   * cover all platforms' atomic-rename quirks. Chokidar emits the
   * stats object alongside `change`/`add` when watching a single file,
   * so we can filter our own writes by comparing `mtimeMs` against
   * the one we recorded from our last `save()`.
   *
   * `interval` is the polling fallback cadence for filesystems without
   * native events (some network/docker mounts); ignored when native
   * watching is available.
   */
  private startWatching(interval: number): void {
    // Snapshot the file's mtime at the moment we decide to watch. If an
    // external write lands BETWEEN chokidar.watch() being called and the
    // watcher reaching its `ready` state, the event is lost — chokidar
    // only emits changes it observed after setup. We reconcile on
    // `ready` by re-stating the file: if mtime has moved past the
    // snapshot, a write happened during the gap and we reload.
    let startupMtime: number | null = null;
    try {
      if (existsSync(this.cacheFile)) {
        startupMtime = statSync(this.cacheFile).mtimeMs;
      }
    } catch {
      /* best-effort */
    }

    const reload = (mtimeMs: number): void => {
      try {
        this.data = this.load();
        this.lastSelfWriteMtime = mtimeMs;
      } catch {
        // Partial/corrupt read during another writer's tmp→rename;
        // a subsequent event will pick up the finished file.
      }
    };

    const handler = (_path: string, stats?: import('fs').Stats): void => {
      // If chokidar didn't supply stats (rare on some platforms), fall
      // back to a fresh stat to get mtime.
      let mtimeMs = stats?.mtimeMs;
      if (mtimeMs === undefined) {
        try {
          mtimeMs = statSync(this.cacheFile).mtimeMs;
        } catch {
          return; /* file transiently gone during rename */
        }
      }
      // Our own `save()` just wrote this mtime — not an external event.
      if (
        this.lastSelfWriteMtime !== null &&
        mtimeMs === this.lastSelfWriteMtime
      )
        return;
      reload(mtimeMs);
    };

    this.fileWatcher = chokidarWatch(this.cacheFile, {
      persistent: false,
      ignoreInitial: true,
      interval,
    });
    this.fileWatcher.on('change', handler);
    this.fileWatcher.on('add', handler);
    // On `ready`, reconcile: an external writer that landed before
    // chokidar armed its watch wouldn't have fired a `change` event,
    // so compare the live mtime to our startup snapshot. But ONLY
    // reload when the current mtime is something we don't already
    // account for: either matches `startupMtime` (no change during
    // gap) or matches `lastSelfWriteMtime` (our own save() landed
    // during the gap and we already mutated in-memory past it).
    this.fileWatcher.on('ready', () => {
      try {
        if (!existsSync(this.cacheFile)) return;
        const curr = statSync(this.cacheFile).mtimeMs;
        if (curr === startupMtime) return;
        if (curr === this.lastSelfWriteMtime) return;
        reload(curr);
      } catch {
        /* best-effort */
      }
    });
  }

  /**
   * Stop watching `cache.json`. Idempotent. Safe to call even when
   * `watch` mode was never enabled. Long-lived holders should call
   * this on graceful shutdown so chokidar's handles are released.
   * Returns a promise that resolves once the watcher has closed —
   * callers that care about determinism (tests, tear-down paths)
   * should await it; fire-and-forget is fine for process exit.
   */
  async close(): Promise<void> {
    if (this.fileWatcher) {
      const w = this.fileWatcher;
      this.fileWatcher = null;
      try {
        await w.close();
      } catch {
        /* best-effort */
      }
    }
  }

  private captureCurrentMtime(): void {
    try {
      if (existsSync(this.cacheFile)) {
        this.lastSelfWriteMtime = statSync(this.cacheFile).mtimeMs;
      }
    } catch {
      /* best-effort */
    }
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
        console.log(
          `[cache] Version changed (${data.version} → ${PACKAGE_VERSION}), clearing cache.`,
        );
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
      return (
        hashFile(tsPath) === entry.tsHash && hashFile(gdPath) === entry.gdHash
      );
    } catch {
      return false;
    }
  }

  /**
   * Update a TS→GD cache entry (atomic at the entry level). When `gdContent`
   * is provided, the generated `.gd` is also written into the cache-folder
   * mirror so a later `convert`/`watch` run can promote it to the real
   * output path without re-conversion. `tsContent` lets the caller supply
   * the exact bytes that were converted — crucial when the source is an
   * in-memory IDE buffer whose disk file hasn't been saved yet.
   */
  updateTsToGd(
    tsPath: string,
    gdPath: string,
    sourceMap: string,
    diagnostics: CachedDiagnostic[],
    options?: {
      /** In-memory content that was converted. Defaults to reading `tsPath`. */
      tsContent?: string | Buffer;
      /** Generated `.gd` output. When set, also writes to cache-folder. */
      gdContent?: string | Buffer;
    },
  ): void {
    const key = this.normKey(tsPath);
    const previous = this.data.tsToGd[key];

    const tsHash =
      options?.tsContent !== undefined
        ? hashContent(options.tsContent)
        : hashFile(tsPath);

    let gdHash: string;
    let cachedGdRel: string | undefined;

    if (options?.gdContent !== undefined) {
      gdHash = hashContent(options.gdContent);
      cachedGdRel = this.computeCachedGdRel(tsPath);
      // If the previous entry had a mirror at a DIFFERENT relative path
      // (e.g. tsPath changed case, or `computeCachedGdRel` implementation
      // changed), remove the stale file — otherwise it'd live forever as
      // an orphan. When the path matches, the writeFileSync below simply
      // overwrites it with the fresh bytes.
      if (previous?.cachedGdRel && previous.cachedGdRel !== cachedGdRel) {
        this.removeCachedGdFile(previous);
      }
      const abs = join(this.cacheDir, cachedGdRel);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, options.gdContent);
    } else {
      // No `gdContent` — the caller is telling us the real `.gd` is the
      // source of truth now. Any previously-cached mirror no longer
      // corresponds to an output the promote path would want to use, so
      // drop it. Keeping it would leak disk space and risk a later
      // `hasFreshCachedGd` false-positive if hashes happened to align.
      gdHash = hashFile(gdPath);
      if (previous?.cachedGdRel) {
        this.removeCachedGdFile(previous);
      }
      cachedGdRel = undefined;
    }

    this.data.tsToGd[key] = {
      tsHash,
      gdHash,
      diagnostics,
      sourceMap: stripSourceMapContent(sourceMap),
      cachedGdRel,
    };
  }

  /**
   * True when a cache-folder `.gd` exists for `tsPath`, its content hash
   * still matches the entry's recorded `gdHash`, AND the on-disk `.ts`
   * source still matches the entry's recorded `tsHash`. Used as the
   * precondition for `promoteCachedGd()`.
   *
   * Three checks are necessary — skipping any one produces stale output:
   *   - `cachedGdRel` exists and file present on disk — otherwise nothing
   *     to promote.
   *   - mirror bytes match `gdHash` — guards against tampering or a
   *     partial/interrupted write.
   *   - `hashFile(tsPath) === tsHash` — guards against the user editing
   *     the `.ts` after the entry was written (e.g. plugin converted a
   *     buffer, user saved, then edited again before the watcher ran).
   *     Without this, promoting would silently overwrite the real `.gd`
   *     with bytes that don't correspond to the current `.ts` source.
   */
  hasFreshCachedGd(tsPath: string): boolean {
    const entry = this.data.tsToGd[this.normKey(tsPath)];
    if (!entry?.cachedGdRel) return false;
    const abs = join(this.cacheDir, entry.cachedGdRel);
    if (!existsSync(abs)) return false;
    try {
      return (
        hashFile(tsPath) === entry.tsHash && hashFile(abs) === entry.gdHash
      );
    } catch {
      return false;
    }
  }

  /** Absolute path to the cache-folder `.gd` mirror, or undefined if no entry. */
  getCachedGdPath(tsPath: string): string | undefined {
    const entry = this.data.tsToGd[this.normKey(tsPath)];
    if (!entry?.cachedGdRel) return undefined;
    return join(this.cacheDir, entry.cachedGdRel);
  }

  /**
   * Atomically promote the cache-folder `.gd` for `tsPath` into `targetGdPath`.
   * Returns true if the promotion happened. Safe to call even when no cache
   * copy exists — returns false in that case.
   *
   * Promotion uses `rename()` on same-FS (fast + atomic), falling back to
   * copy+delete when `rename` crosses devices. Either way, the cached copy
   * is consumed (moved out), so the entry's `cachedGdRel` is cleared — but
   * `tsHash`/`gdHash` stay valid, so `isTsToGdFresh` remains true.
   */
  promoteCachedGd(tsPath: string, targetGdPath: string): boolean {
    if (!this.hasFreshCachedGd(tsPath)) return false;
    const key = this.normKey(tsPath);
    const entry = this.data.tsToGd[key]!;
    const source = join(this.cacheDir, entry.cachedGdRel!);
    mkdirSync(dirname(targetGdPath), { recursive: true });
    try {
      renameSync(source, targetGdPath);
    } catch {
      // Cross-device or permissions failure: fall back to copy + delete.
      try {
        copyFileSync(source, targetGdPath);
        rmSync(source, { force: true });
      } catch {
        return false;
      }
    }
    delete entry.cachedGdRel;
    return true;
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
        existsSync(tsPath) &&
        hashFile(tsPath) === entry.tsHash &&
        existsSync(dtsPath) &&
        hashFile(dtsPath) === entry.dtsHash
      );
    } catch {
      return false;
    }
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
        existsSync(dtsPath) &&
        hashFile(dtsPath) === entry.dtsHash
      );
    } catch {
      return false;
    }
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
          this.removeCachedGdFile(this.data.tsToGd[key]);
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

  private removeCachedGdFile(entry: TsToGdEntry | undefined): void {
    if (!entry?.cachedGdRel) return;
    const abs = join(this.cacheDir, entry.cachedGdRel);
    try {
      if (existsSync(abs)) rmSync(abs, { force: true });
    } catch {
      /* best-effort cleanup */
    }
  }

  // ── Persistence ────────────────────────────────────────────

  /**
   * Write cache manifest to disk atomically (`.tmp` + `rename`) so concurrent
   * readers (e.g. IDE plugin) never observe a partially-written file, and
   * concurrent writers (watcher + plugin child) can't corrupt each other.
   * Last-writer-wins for entry contents — that's safe because the cache is
   * idempotent (both writers compute the same result from the same input).
   */
  save(): void {
    mkdirSync(this.cacheDir, { recursive: true });
    // Ensure Godot ignores the cache directory
    const gdignore = join(this.cacheDir, '.gdignore');
    if (!existsSync(gdignore)) writeFileSync(gdignore, '');
    const tmpFile = this.nextTmpFile();
    writeFileSync(tmpFile, JSON.stringify(this.data, null, 2));
    try {
      renameSync(tmpFile, this.cacheFile);
    } catch {
      // Last resort: direct write (not atomic but preserves previous semantics).
      try {
        rmSync(tmpFile, { force: true });
        writeFileSync(this.cacheFile, readFileSync(tmpFile));
      } catch {
        /* give up */
      }
    }
    // Record our write's mtime so the watch listener (if any) ignores
    // the notification we just triggered — only genuine external edits
    // should cause a reload.
    this.captureCurrentMtime();
  }

  /**
   * Asynchronous counterpart to `save()`. Same atomic-rename semantics,
   * same self-mtime tracking for the chokidar watch filter — but every
   * disk touch goes through `fs/promises`, so long-lived hosts like
   * the ts-plugin (running inside tsserver's event loop) don't stall
   * the main thread while cache.json is being serialized + written.
   *
   * Concurrent calls are serialized via an internal promise chain:
   * each call grabs a synchronous JSON snapshot of the current state
   * up-front, then queues its I/O behind any in-flight save. Last-
   * queued write wins on disk; no renames race.
   */
  saveAsync(): Promise<void> {
    // Snapshot in-memory state NOW, before yielding control. Any
    // mutations between this call and when our I/O actually runs
    // belong to a later `saveAsync()` — not ours.
    const json = JSON.stringify(this.data, null, 2);
    const tmpFile = this.nextTmpFile();
    const run = this.saveChain.then(() => this.doSaveAsync(json, tmpFile));
    // Keep the chain alive even if our run rejects — next call
    // shouldn't inherit the failure (it'll write its own snapshot).
    this.saveChain = run.catch(() => {});
    return run;
  }

  private nextTmpFile(): string {
    // `pid` + `Date.now()` + monotonic counter guarantees uniqueness
    // within a single ProjectCache instance. The 8-char random suffix
    // covers the (rare) case of two independent `ProjectCache`
    // instances for the same `cacheDir` saving in the same
    // millisecond — each has its own counter starting at 0, so pid
    // + ms + counter would collide. randomUUID gives a per-write
    // cryptographic disambiguator so no two tmp paths ever clash.
    this.saveCounter = (this.saveCounter + 1) >>> 0;
    const rnd = randomUUID().replace(/-/g, '').slice(0, 8);
    return `${this.cacheFile}.tmp-${process.pid}-${Date.now()}-${this.saveCounter}-${rnd}`;
  }

  private async doSaveAsync(json: string, tmpFile: string): Promise<void> {
    await fsp.mkdir(this.cacheDir, { recursive: true });
    const gdignore = join(this.cacheDir, '.gdignore');
    // existsSync is O(1) and non-blocking — no need for fsp here.
    if (!existsSync(gdignore)) {
      await fsp.writeFile(gdignore, '');
    }
    await fsp.writeFile(tmpFile, json);
    try {
      await fsp.rename(tmpFile, this.cacheFile);
    } catch {
      // Last resort: non-atomic copy. Preserves save()'s behavior.
      try {
        await fsp.rm(tmpFile, { force: true });
        await fsp.writeFile(this.cacheFile, json);
      } catch {
        /* give up */
      }
    }
    // Capture mtime via the same promise chain — no `statSync` here,
    // since that would block the event loop we're specifically trying
    // to keep free.
    try {
      const stat = await fsp.stat(this.cacheFile);
      this.lastSelfWriteMtime = stat.mtimeMs;
    } catch {
      /* best-effort */
    }
  }

  /** Clear all cache data and files. */
  clear(): void {
    this.data = this.empty();
    this.clearFiles();
    this.lastSelfWriteMtime = null;
  }

  private clearFiles(): void {
    if (existsSync(this.cacheDir)) {
      rmSync(this.cacheDir, { recursive: true, force: true });
    }
  }

  // ── Key normalization + cache-folder path ─────────────────

  private normKey(absPath: string): string {
    return absPath.replace(/\\/g, '/');
  }

  /**
   * Build the relative cache-folder path for a TS source. Format:
   *   `gd-output/<16-char-hash-of-tsPath>-<tsBasename>.gd`
   *
   * The hash prefix disambiguates files with the same basename in
   * different directories without having to mirror the full tree.
   */
  private computeCachedGdRel(tsPath: string): string {
    const key = this.normKey(tsPath);
    const hash = createHash('md5').update(key).digest('hex').slice(0, 16);
    const name = basename(tsPath).replace(/\.ts$/, '.gd');
    return join('gd-output', `${hash}-${name}`).replace(/\\/g, '/');
  }
}

// ─── Utilities ──────────────────────────────────────────────

/** MD5 hash of file content, hex-encoded, truncated to 16 chars. */
export function hashFile(filePath: string): string {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex').slice(0, 16);
}

/** MD5 hash of a string/Buffer, hex-encoded, truncated to 16 chars. */
export function hashContent(content: string | Buffer): string {
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
