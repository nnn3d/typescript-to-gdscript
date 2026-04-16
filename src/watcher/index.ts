import { watch, type FSWatcher } from 'chokidar';
import { extname, resolve, relative, join } from 'path';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import ts from 'typescript';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { createTsProgram } from '../parser/typescript/index.ts';
import { validateGdFiles } from '../godot-validate/index.ts';
import { generateTypings, generateAddonTypings, generateFileTypings } from '../typings/scenes.ts';
import { shouldIgnore } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
import { isConversionErrorSeverity } from '../converter/common/index.ts';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export interface WatcherOptions {
  /** Root directory (base for relative paths) */
  rootDir: string;
  /** TypeScript source directory to watch. Defaults to rootDir. */
  tsDir?: string;
  /** GDScript output directory. Defaults to tsDir. */
  gdDir?: string;
  /** Output directory for GDScript files (deprecated, use gdDir) */
  outputDir?: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Enable source maps */
  sourceMap?: boolean;
  /** Directory for all generated typings (globals.d.ts, scene-typings.d.ts) */
  typingsDir?: string;
  /** Directory to scan for .tscn files. Defaults to rootDir. */
  scenesDir?: string;
  /** Cache directory */
  cacheDir?: string;
  /** Callback for diagnostics */
  onDiagnostic?: (file: string, message: string, severity: string) => void;
  /** Path to Godot executable (enables GD validation after conversion) */
  godotPath?: string;
  /** Godot project root for validation (defaults to rootDir) */
  projectRoot?: string;
  /** Glob patterns for files/folders to ignore. */
  ignore?: string[];
  /** Path to project.godot file (for autoload singleton detection). */
  projectFile?: string;
  /** Emit output files even when conversion errors occur. */
  emitOnError?: boolean;
  /** Enable verbose debug logging. */
  debug?: boolean;
  /** Absolute path to Godot engine typings (for /// reference in _index.d.ts) */
  godotTypingsDir?: string;
}

/** File extensions that trigger typings regeneration (scenes, resources, assets). */
const RESOURCE_EXTENSIONS = new Set([
  '.tscn', '.tres', '.res',
  '.png', '.jpg', '.ogg', '.wav', '.mp3',
  '.gdshader', '.theme',
]);

/** All extensions the watcher cares about (TS + resources). */
const WATCHED_EXTENSIONS = new Set(['.ts', ...RESOURCE_EXTENSIONS]);

/** Debounce delay (ms) — wait for rapid file changes to settle before converting. */
const DEBOUNCE_MS = 150;

export class Watcher {
  private options: WatcherOptions;
  private fsWatcher: FSWatcher | null = null;
  private cache: ProjectCache;
  private tsFiles: Set<string> = new Set();
  private tsDir: string;
  private gdDir: string;
  private initialTypingsGenerated = false;
  private initialScanDone = false;

  // ── Program reuse ─────────────────────────────────────────
  private cachedProgram: ts.Program | null = null;

  // ── Debounced conversion queue ────────────────────────────
  private pendingTsFiles: Set<string> = new Set();
  private pendingNonTsFiles: string[] = [];
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Initial scan counters ─────────────────────────────────
  private initialConverted = 0;
  private initialSkipped = 0;
  private initialErrors = 0;

  constructor(options: WatcherOptions) {
    this.options = options;
    this.tsDir = options.tsDir ?? options.rootDir;
    this.gdDir = options.gdDir ?? options.outputDir ?? this.tsDir;
    const cacheDir = options.cacheDir ?? join(tmpdir(), `ts2gd-cache-${createHash('sha256').update(resolve(options.rootDir)).digest('hex').slice(0, 16)}`);
    this.cache = new ProjectCache(cacheDir);
  }

  start(): void {
    // Chokidar v4 does not support glob patterns — watch directories and filter via ignored.
    const watchedDirs = this.tsDir === this.options.rootDir
      ? [this.options.rootDir]
      : [this.tsDir, this.options.rootDir];

    this.fsWatcher = watch(watchedDirs, {
      ignored: (path, stats) => {
        const base = path.split(/[/\\]/).pop() ?? '';
        if (base.startsWith('.') || base === 'node_modules' || base === 'addons' || base === 'dist') return true;
        if (!stats?.isFile()) return false;
        if (path.endsWith('.d.ts')) return true;
        if (base === 'project.godot') return false;
        const dotIdx = base.lastIndexOf('.');
        const ext = dotIdx >= 0 ? base.slice(dotIdx) : '';
        return !WATCHED_EXTENSIONS.has(ext);
      },
      persistent: true,
      ignoreInitial: false,
    });

    this.fsWatcher
      .on('add', (path) => this.handleFile(resolve(path)))
      .on('change', (path) => this.handleFile(resolve(path)))
      .on('unlink', (path) => this.handleRemove(resolve(path)))
      .on('ready', () => {
        // Flush pending conversions from the initial scan (before marking scan as done,
        // so counters are tracked correctly)
        this.flushPending();
        this.initialScanDone = true;
        // Clean stale cache entries now that all files have been scanned
        const currentTsFiles = new Set([...this.tsFiles].map(f => f.replace(/\\/g, '/')));
        this.cache.cleanStale(currentTsFiles);
        this.cache.save();
        // Print summary
        const parts: string[] = [];
        if (this.initialConverted > 0) parts.push(`${this.initialConverted} converted`);
        if (this.initialSkipped > 0) parts.push(`${this.initialSkipped} cached`);
        if (this.initialErrors > 0) parts.push(`${this.initialErrors} error(s)`);
        const summary = parts.length > 0 ? parts.join(', ') : 'no .ts files found';
        console.log(`Initial scan complete: ${summary}. Watching for changes...`);
      });
  }

  stop(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.fsWatcher?.close();
    this.cache.save();
    console.log('Watcher stopped.');
  }

  // ── Event handlers ────────────────────────────────────────

  private handleFile(filePath: string): void {
    const ext = extname(filePath);
    if (shouldIgnore(filePath, this.options.rootDir, this.options.ignore ?? [])) return;

    if (ext === '.ts' && !filePath.endsWith('.d.ts')) {
      this.tsFiles.add(filePath);
      this.pendingTsFiles.add(filePath);
      // Invalidate cached program — a TS file changed
      this.cachedProgram = null;
      this.scheduleFlush();
    } else if (RESOURCE_EXTENSIONS.has(ext) || filePath.endsWith('project.godot')) {
      this.pendingNonTsFiles.push(filePath);
      this.scheduleFlush();
    }
  }

  private handleRemove(filePath: string): void {
    this.tsFiles.delete(filePath);
    this.pendingTsFiles.delete(filePath);
    this.cachedProgram = null;
    this.cache.save();
  }

  // ── Debounced batch processing ────────────────────────────

  private scheduleFlush(): void {
    // During initial scan, don't debounce — we flush in the ready handler
    if (!this.initialScanDone) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.flushPending(), DEBOUNCE_MS);
  }

  private flushPending(): void {
    if (this.debounceTimer) { clearTimeout(this.debounceTimer); this.debounceTimer = null; }

    const tsToConvert = [...this.pendingTsFiles];
    const nonTsChanged = [...this.pendingNonTsFiles];
    this.pendingTsFiles.clear();
    this.pendingNonTsFiles.length = 0;

    // Convert TS files (batch — one Program for all)
    if (tsToConvert.length > 0) {
      this.convertBatch(tsToConvert);
    }

    // Regenerate typings for all changed files (TS + non-TS) in one batch
    const allChanged = [...tsToConvert, ...nonTsChanged];
    if (allChanged.length > 0) {
      this.regenerateTypingsFor(allChanged);
    }
  }

  // ── Batch conversion with Program reuse ───────────────────

  private convertBatch(filePaths: string[]): void {
    // Separate cached vs. stale files
    const toConvert: Array<{ filePath: string; outputPath: string }> = [];
    for (const filePath of filePaths) {
      const relPath = relative(this.tsDir, filePath);
      const outputPath = resolve(this.gdDir, relPath.replace(/\.ts$/, '.gd'));

      if (this.cache.isTsToGdFresh(filePath, outputPath)) {
        if (!this.initialScanDone) this.initialSkipped++;
        this.log(filePath, 'Unchanged (cached)', 'debug');
        continue;
      }
      toConvert.push({ filePath, outputPath });
    }

    if (toConvert.length === 0) return;

    // Create or reuse the ts.Program for all conversions in this batch.
    // Pass oldProgram so TypeScript reuses SourceFiles for unchanged files.
    const oldProgram = this.cachedProgram ?? undefined;
    const program = createTsProgram({
      rootDir: this.tsDir,
      files: [...this.tsFiles],
      tsConfigPath: this.options.tsConfigPath,
      oldProgram,
    });
    this.cachedProgram = program;

    this.debugLog(`Converting ${toConvert.length} file(s) with ${oldProgram ? 'reused' : 'new'} program`);

    for (const { filePath, outputPath } of toConvert) {
      this.convertSingleFile(filePath, outputPath, program);
    }
  }

  private convertSingleFile(filePath: string, outputPath: string, program: ts.Program): void {
    const result = convertTsToGd({
      filePath,
      rootDir: this.tsDir,
      sourceMap: true,
      program,
    });

    for (const d of result.diagnostics) {
      // Map type-error → warning for log colouring; watch treats type-errors as non-blocking.
      const logSeverity = d.severity === 'type-error' ? 'warning' : d.severity;
      this.log(
        d.file,
        `[${d.severity}] ${d.message} (${d.line}:${d.column})`,
        logSeverity,
      );
    }

    if (result.diagnostics.some((d) => isConversionErrorSeverity(d.severity))) {
      if (!this.initialScanDone) this.initialErrors++;
      if (!this.options.emitOnError) return;
    }

    // Write output
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, result.code);

    // Update cache with source map and diagnostics
    if (result.sourceMap) {
      this.cache.updateTsToGd(filePath, outputPath, result.sourceMap, result.diagnostics);
    }
    this.cache.save();

    if (!this.initialScanDone) {
      this.initialConverted++;
    }
    this.log(
      filePath,
      `Converted -> ${relative(this.options.rootDir, outputPath) || outputPath}`,
      'info',
    );

    // Validate with Godot if configured
    if (this.options.godotPath) {
      const projectRoot = this.options.projectRoot ?? this.options.rootDir;
      validateGdFiles({
        gdFiles: [outputPath],
        projectRoot,
        godotPath: this.options.godotPath,
      }).then((validateResult) => {
        for (const d of validateResult.diagnostics) {
          this.log(
            d.file || filePath,
            `[${d.severity}] ${d.message} (${d.line}:${d.column})`,
            d.severity,
          );
        }
      }).catch((err: Error) => {
        this.log(filePath, `Godot validation failed: ${err.message}`, 'warning');
      });
    }
  }

  // ── Typings regeneration ──────────────────────────────────

  private debugLog(message: string): void {
    if (this.options.debug) {
      console.log(message);
    }
  }

  private regenerateTypingsFor(changedFiles: string[]): void {
    if (!this.options.typingsDir) return;
    const typingsDir = this.options.typingsDir;
    const onDebug = this.options.debug ? (msg: string) => this.debugLog(msg) : undefined;

    // First run: full generation (all scripts, scenes, resources, index, addons)
    if (!this.initialTypingsGenerated) {
      this.initialTypingsGenerated = true;
      generateTypings({
        rootDir: this.options.rootDir,
        tsDir: this.tsDir,
        gdDir: this.gdDir,
        files: [...this.tsFiles],
        outputDir: typingsDir,
        scenesDir: this.options.scenesDir ?? this.options.rootDir,
        tsConfigPath: this.options.tsConfigPath,
        ignore: this.options.ignore,
        projectFile: this.options.projectFile,
        cache: this.cache,
        onDebug,
        godotTypingsDir: this.options.godotTypingsDir,
      });
      generateAddonTypings({
        rootDir: this.options.rootDir,
        outputDir: typingsDir,
        ignore: this.options.ignore,
        cache: this.cache,
        onDebug,
      });
      return;
    }

    // Incremental: regenerate typings for all changed files in one batch
    generateFileTypings(changedFiles, [...this.tsFiles], {
      rootDir: this.options.rootDir,
      tsDir: this.tsDir,
      outputDir: typingsDir,
      tsConfigPath: this.options.tsConfigPath,
      scenesDir: this.options.scenesDir ?? this.options.rootDir,
      ignore: this.options.ignore,
      projectFile: this.options.projectFile,
      cache: this.cache,
    });
  }

  // ── Logging ───────────────────────────────────────────────

  private log(file: string, message: string, severity: string): void {
    if (severity === 'debug' && !this.options.debug) return;
    if (this.options.onDiagnostic) {
      this.options.onDiagnostic(file, message, severity);
    } else {
      const prefix =
        severity === 'error'
          ? 'ERROR'
          : severity === 'warning'
            ? 'WARN'
            : 'INFO';
      console.log(
        `[${prefix}] ${relative(this.options.rootDir, file)}: ${message}`,
      );
    }
  }
}
