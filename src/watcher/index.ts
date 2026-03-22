import { watch, type FSWatcher } from 'chokidar';
import { extname, resolve, relative, join } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { validateGdFiles } from '../godot-validate/index.ts';
import { generateClassTypings } from '../typings/classes.ts';
import {
  generateSceneTypings,
  buildScriptClassMap,
} from '../typings/scenes.ts';
import { shouldIgnore } from '../config/index.ts';
import { FileCache } from '../cache/index.ts';
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
  private cache: FileCache;
  private tsFiles: Set<string> = new Set();
  private tsDir: string;
  private gdDir: string;

  constructor(options: WatcherOptions) {
    this.options = options;
    this.tsDir = options.tsDir ?? options.rootDir;
    this.gdDir = options.gdDir ?? options.outputDir ?? this.tsDir;
    this.cache = new FileCache(
      options.cacheDir ?? resolve(options.rootDir, '.ts2gd-cache'),
    );
  }

  start(): void {
    const patterns = [
      `${this.tsDir}/**/*.ts`,
      `${this.options.rootDir}/**/*.tscn`,
    ];

    this.fsWatcher = watch(patterns, {
      ignored: [/(^|[\/\\])\../, /node_modules/, /\.d\.ts$/, /dist\//],
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
      this.regenerateClassTypings();
    } else if (ext === '.tscn') {
      // Scene file changed — regenerate class typings (includes scene overloads)
      this.log(filePath, 'Scene changed, regenerating typings', 'info');
      this.regenerateClassTypings();
    }
  }

  private handleRemove(filePath: string): void {
    this.tsFiles.delete(filePath);
    this.cache.remove(filePath);
    this.cache.save();
  }

  private async convertFile(filePath: string): Promise<void> {
    // Check cache
    if (!this.cache.needsUpdate(filePath)) {
      return;
    }

    // Check if output was modified externally
    if (this.cache.outputModified(filePath)) {
      this.log(
        filePath,
        'WARNING: Output file was modified externally. Skipping.',
        'warning',
      );
      return;
    }

    // Convert (diagnostics are produced by the converter itself)
    const result = convertTsToGd({
      filePath,
      rootDir: this.tsDir,
      tsConfigPath: this.options.tsConfigPath,
      sourceMap: this.options.sourceMap,
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
    const relPath = relative(this.tsDir, filePath);
    const outputPath = resolve(this.gdDir, relPath.replace(/\.ts$/, '.gd'));
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, result.code);

    if (result.sourceMap) {
      writeFileSync(outputPath + '.map', result.sourceMap);
    }

    // Update cache
    this.cache.update(filePath, outputPath);
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

  private regenerateClassTypings(): void {
    if (!this.options.typingsDir) return;

    const files = [...this.tsFiles];
    const scenesDir = this.options.scenesDir ?? this.options.rootDir;
    const typingsDir = this.options.typingsDir;

    mkdirSync(typingsDir, { recursive: true });

    const classTypingsOutput = join(typingsDir, 'globals.d.ts');
    const sceneTypingsOutput = join(typingsDir, 'scene-typings.d.ts');

    // Generate globals.d.ts (global class declarations)
    generateClassTypings({
      rootDir: this.options.rootDir,
      files,
      outputPath: classTypingsOutput,
      tsConfigPath: this.options.tsConfigPath,
    });

    // Generate scene-typings.d.ts (module augmentation for get_node overloads)
    const scriptClassMap = buildScriptClassMap({
      files,
      rootDir: this.options.rootDir,
      tsDir: this.tsDir,
      gdDir: this.gdDir,
      sceneTypingsDir: typingsDir,
      tsConfigPath: this.options.tsConfigPath,
    });

    generateSceneTypings({
      scenesDir,
      outputPath: sceneTypingsOutput,
      scriptClassMap,
      rootDir: this.options.rootDir,
      projectFile: this.options.projectFile,
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
