import { watch, type FSWatcher } from 'chokidar';
import { extname, resolve, relative } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.js';
import { lintFiles } from '../linter/index.js';
import { generateClassTypings } from '../typings/classes.js';
import { FileCache } from '../cache/index.js';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export interface WatcherOptions {
  /** Root directory to watch */
  rootDir: string;
  /** Output directory for GDScript files */
  outputDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Enable source maps */
  sourceMap?: boolean;
  /** Path to global class typings output */
  classTypingsOutput?: string;
  /** Cache directory */
  cacheDir?: string;
  /** Callback for diagnostics */
  onDiagnostic?: (file: string, message: string, severity: string) => void;
}

export class Watcher {
  private options: WatcherOptions;
  private fsWatcher: FSWatcher | null = null;
  private cache: FileCache;
  private tsFiles: Set<string> = new Set();

  constructor(options: WatcherOptions) {
    this.options = options;
    this.cache = new FileCache(
      options.cacheDir ?? resolve(options.rootDir, '.ts2gd-cache')
    );
  }

  start(): void {
    const patterns = [
      `${this.options.rootDir}/**/*.ts`,
      `${this.options.rootDir}/**/*.tscn`,
    ];

    this.fsWatcher = watch(patterns, {
      ignored: [
        /(^|[\/\\])\../,
        /node_modules/,
        /\.d\.ts$/,
        /dist\//,
      ],
      persistent: true,
      ignoreInitial: false,
    });

    this.fsWatcher
      .on('add', (path) => this.handleFile(resolve(path)))
      .on('change', (path) => this.handleFile(resolve(path)))
      .on('unlink', (path) => this.handleRemove(resolve(path)));

    console.log(`Watching ${this.options.rootDir} for changes...`);
  }

  stop(): void {
    this.fsWatcher?.close();
    this.cache.save();
    console.log('Watcher stopped.');
  }

  private handleFile(filePath: string): void {
    const ext = extname(filePath);

    if (ext === '.ts' && !filePath.endsWith('.d.ts')) {
      this.tsFiles.add(filePath);
      this.convertFile(filePath);
      this.regenerateClassTypings();
    } else if (ext === '.tscn') {
      // Scene file changed — regenerate scene typings
      this.log(filePath, 'Scene changed, regenerating typings', 'info');
    }
  }

  private handleRemove(filePath: string): void {
    this.tsFiles.delete(filePath);
    this.cache.remove(filePath);
    this.cache.save();
  }

  private convertFile(filePath: string): void {
    // Check cache
    if (!this.cache.needsUpdate(filePath)) {
      return;
    }

    // Check if output was modified externally
    if (this.cache.outputModified(filePath)) {
      this.log(filePath, 'WARNING: Output file was modified externally. Skipping.', 'warning');
      return;
    }

    // Lint first
    const lintResults = lintFiles({
      files: [filePath],
      rootDir: this.options.rootDir,
      tsConfigPath: this.options.tsConfigPath,
    });

    for (const result of lintResults) {
      for (const d of result.diagnostics) {
        this.log(d.file, `[${d.severity}] ${d.message} (${d.line}:${d.column})`, d.severity);
      }
    }

    const hasErrors = lintResults.some(r =>
      r.diagnostics.some(d => d.severity === 'error')
    );
    if (hasErrors) {
      this.log(filePath, 'Lint errors found, skipping conversion', 'error');
      return;
    }

    // Convert
    const result = convertTsToGd({
      filePath,
      rootDir: this.options.rootDir,
      tsConfigPath: this.options.tsConfigPath,
      sourceMap: this.options.sourceMap,
    });

    for (const d of result.diagnostics) {
      this.log(d.file, `[${d.severity}] ${d.message} (${d.line}:${d.column})`, d.severity);
    }

    if (result.diagnostics.some(d => d.severity === 'error')) {
      return;
    }

    // Write output
    const relPath = relative(this.options.rootDir, filePath);
    const outputPath = resolve(this.options.outputDir, relPath.replace(/\.ts$/, '.gd'));
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, result.code);

    if (result.sourceMap) {
      writeFileSync(outputPath + '.map', result.sourceMap);
    }

    // Update cache
    this.cache.update(filePath, outputPath);
    this.cache.save();

    this.log(filePath, `Converted -> ${relative(this.options.rootDir, outputPath)}`, 'info');
  }

  private regenerateClassTypings(): void {
    if (!this.options.classTypingsOutput) return;

    generateClassTypings({
      rootDir: this.options.rootDir,
      files: [...this.tsFiles],
      outputPath: this.options.classTypingsOutput,
      tsConfigPath: this.options.tsConfigPath,
    });
  }

  private log(file: string, message: string, severity: string): void {
    if (this.options.onDiagnostic) {
      this.options.onDiagnostic(file, message, severity);
    } else {
      const prefix = severity === 'error' ? 'ERROR' : severity === 'warning' ? 'WARN' : 'INFO';
      console.log(`[${prefix}] ${relative(this.options.rootDir, file)}: ${message}`);
    }
  }
}
