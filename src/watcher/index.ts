import { watch, type FSWatcher } from 'chokidar';
import { extname, resolve, relative, join } from 'path';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { validateGdFiles } from '../godot-validate/index.ts';
import { generateTypings, generateAddonTypings, generateFileTypings } from '../typings/scenes.ts';
import { shouldIgnore } from '../config/index.ts';
import { ProjectCache } from '../cache/index.ts';
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
}

export class Watcher {
  private options: WatcherOptions;
  private fsWatcher: FSWatcher | null = null;
  private cache: ProjectCache;
  private sourcemapsDir: string;
  private tsFiles: Set<string> = new Set();
  private tsDir: string;
  private gdDir: string;
  private initialTypingsGenerated = false;

  constructor(options: WatcherOptions) {
    this.options = options;
    this.tsDir = options.tsDir ?? options.rootDir;
    this.gdDir = options.gdDir ?? options.outputDir ?? this.tsDir;
    const cacheDir = options.cacheDir ?? join(tmpdir(), `ts2gd-cache-${createHash('sha256').update(resolve(options.rootDir)).digest('hex').slice(0, 16)}`);
    this.sourcemapsDir = join(cacheDir, 'sourcemaps');
    this.cache = new ProjectCache(cacheDir, this.sourcemapsDir);
  }

  start(): void {
    const patterns = [
      `${this.tsDir}/**/*.ts`,
      `${this.options.rootDir}/**/*.tscn`,
      `${this.options.rootDir}/**/*.tres`,
      `${this.options.rootDir}/**/*.res`,
      `${this.options.rootDir}/**/*.png`,
      `${this.options.rootDir}/**/*.jpg`,
      `${this.options.rootDir}/**/*.ogg`,
      `${this.options.rootDir}/**/*.wav`,
      `${this.options.rootDir}/**/*.mp3`,
      `${this.options.rootDir}/**/*.gdshader`,
      `${this.options.rootDir}/**/*.theme`,
      `${this.options.rootDir}/**/project.godot`,
    ];

    this.fsWatcher = watch(patterns, {
      ignored: [/(^|[\/\\])\../, /node_modules/, /addons/, /\.d\.ts$/, /dist\//],
      persistent: true,
      ignoreInitial: false,
    });

    this.fsWatcher
      .on('add', (path) => this.handleFile(resolve(path)))
      .on('change', (path) => this.handleFile(resolve(path)))
      .on('unlink', (path) => this.handleRemove(resolve(path)));

    console.log(`Watching ${this.tsDir} for changes...`);
  }

  stop(): void {
    this.fsWatcher?.close();
    this.cache.save();
    console.log('Watcher stopped.');
  }

  private handleFile(filePath: string): void {
    const ext = extname(filePath);
    if (shouldIgnore(filePath, this.options.rootDir, this.options.ignore ?? [])) return;

    if (ext === '.ts' && !filePath.endsWith('.d.ts')) {
      this.tsFiles.add(filePath);
      this.convertFile(filePath).catch((err) => {
        this.log(filePath, `Unexpected error: ${err.message}`, 'error');
      });
      this.regenerateTypingsFor(filePath);
    } else if (ext === '.tscn') {
      this.log(filePath, 'Scene changed, regenerating typings', 'info');
      this.regenerateTypingsFor(filePath);
    } else if (filePath.endsWith('project.godot') || ['.tres', '.res', '.png', '.jpg', '.ogg', '.wav', '.mp3', '.gdshader', '.theme'].includes(ext)) {
      this.log(filePath, 'Resource changed, regenerating typings', 'info');
      this.regenerateTypingsFor(filePath);
    }
  }

  private handleRemove(filePath: string): void {
    this.tsFiles.delete(filePath);
    // Stale entries are cleaned on next full build via cleanStale()
    this.cache.save();
  }

  private async convertFile(filePath: string): Promise<void> {
    const relPath = relative(this.tsDir, filePath);
    const outputPath = resolve(this.gdDir, relPath.replace(/\.ts$/, '.gd'));

    // Check cache — skip if both source and output are unchanged
    if (this.cache.isTsToGdFresh(filePath, outputPath)) {
      return;
    }

    // Convert
    const result = convertTsToGd({
      filePath,
      rootDir: this.tsDir,
      tsConfigPath: this.options.tsConfigPath,
      sourceMap: true,
    });

    for (const d of result.diagnostics) {
      this.log(
        d.file,
        `[${d.severity}] ${d.message} (${d.line}:${d.column})`,
        d.severity,
      );
    }

    if (result.diagnostics.some((d) => d.severity === 'error')) {
      return;
    }

    // Write output
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, result.code);

    // Update cache (writes source map to cache dir)
    this.cache.updateTsToGd(filePath, outputPath, result.sourceMap, this.options.rootDir);
    this.cache.save();

    this.log(
      filePath,
      `Converted -> ${relative(this.options.rootDir, outputPath) || outputPath}`,
      'info',
    );

    // Validate with Godot if configured
    if (this.options.godotPath) {
      const projectRoot = this.options.projectRoot ?? this.options.rootDir;
      const validateResult = await validateGdFiles({
        gdFiles: [outputPath],
        projectRoot,
        godotPath: this.options.godotPath,
        sourceMapDir: this.sourcemapsDir,
        rootDir: this.options.rootDir,
      });
      for (const d of validateResult.diagnostics) {
        this.log(
          d.file || filePath,
          `[${d.severity}] ${d.message} (${d.line}:${d.column})`,
          d.severity,
        );
      }
    }
  }

  private regenerateTypingsFor(changedFile: string): void {
    if (!this.options.typingsDir) return;
    const typingsDir = this.options.typingsDir;

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
      });
      generateAddonTypings({
        rootDir: this.options.rootDir,
        outputDir: typingsDir,
        ignore: this.options.ignore,
        cache: this.cache,
      });

      // Clean stale TS→GD entries on first build
      const currentTsFiles = new Set([...this.tsFiles].map(f => f.replace(/\\/g, '/')));
      this.cache.cleanStale(currentTsFiles);
      this.cache.save();
      return;
    }

    // Incremental: only regenerate typings for the changed file
    generateFileTypings([changedFile], [...this.tsFiles], {
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

  private log(file: string, message: string, severity: string): void {
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
