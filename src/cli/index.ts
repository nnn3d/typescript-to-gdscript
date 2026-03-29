#!/usr/bin/env node

import { Command } from 'commander';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  existsSync,
  rmSync,
} from 'fs';
import { resolve, dirname, relative, extname, join } from 'path';
import { globSync } from 'glob';
import { convertTsToGd } from '../converter/ts-to-gd/index.ts';
import { convertGdToTs } from '../converter/gd-to-ts/index.ts';
import {
  generateTypings,
  resolveSignalHandlers,
  findSceneFiles,
} from '../typings/scenes.ts';
import { generateGodotDocsTypings } from '../typings/godot-docs.ts';
import { parseGodotVersion } from '../typings/godot-registry.ts';
import { Watcher } from '../watcher/index.ts';
import {
  resolveRegistry,
  resolveGodotPath,
  resolveConfig,
  shouldIgnore,
} from '../config/index.ts';
import {
  validateGdFiles,
  validateGdFilesSync,
} from '../godot-validate/index.ts';
import { tmpdir } from 'os';

const program = new Command();

program
  .name('ts2gd')
  .description('Convert TypeScript to GDScript and back')
  .version('0.1.0')
  .option('--debug', 'Show debug/info messages', false);

/** Print a message only when --debug is enabled */
function debugLog(message: string): void {
  if (program.opts().debug) {
    console.log(message);
  }
}

/** Recursively find all .ts files (excluding .d.ts, node_modules, hidden dirs, and ignored patterns) */
function findTsFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules') continue;
      const fullPath = join(dir, entry);
      if (shouldIgnore(fullPath, rootDir, ignore)) continue;
      if (statSync(fullPath).isDirectory()) {
        results.push(...findTsFiles(fullPath, rootDir, ignore));
      } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
        results.push(fullPath);
      }
    }
  } catch {
    // skip inaccessible
  }
  return results;
}

/** Recursively find all .gd files (excluding node_modules, hidden dirs, and ignored patterns) */
function findGdFiles(
  dir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules') continue;
      const fullPath = join(dir, entry);
      if (shouldIgnore(fullPath, rootDir, ignore)) continue;
      if (statSync(fullPath).isDirectory()) {
        results.push(...findGdFiles(fullPath, rootDir, ignore));
      } else if (entry.endsWith('.gd')) {
        results.push(fullPath);
      }
    }
  } catch {
    // skip inaccessible
  }
  return results;
}

/**
 * Resolve file arguments: if patterns are provided, expand them via glob;
 * otherwise return all files of the given extension in the source directory.
 */
function resolveFiles(
  patterns: string[] | undefined,
  ext: '.ts' | '.gd',
  sourceDir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  if (patterns && patterns.length > 0) {
    // Expand glob patterns
    const files: string[] = [];
    for (const pattern of patterns) {
      const matches = globSync(pattern, { cwd: process.cwd(), absolute: true });
      for (const match of matches) {
        const m = match.replace(/\\/g, '/');
        if (ext === '.ts' && m.endsWith('.d.ts')) continue;
        if (m.endsWith(ext) && !shouldIgnore(resolve(m), rootDir, ignore)) {
          files.push(resolve(m));
        }
      }
    }
    return files;
  }
  // Default: find all files in sourceDir
  return ext === '.ts'
    ? findTsFiles(sourceDir, rootDir, ignore)
    : findGdFiles(sourceDir, rootDir, ignore);
}

/** Generate class typings (globals.d.ts) and scene typings (scene-typings.d.ts) */
function generateAllTypings(cfg: {
  rootDir: string;
  tsDir: string;
  gdDir: string;
  typingsDir: string;
  scenesDir: string;
  ignore: string[];
  projectFile: string;
  tsconfig?: string;
  tsFiles?: string[];
}): void {
  const tsFiles =
    cfg.tsFiles ?? findTsFiles(cfg.tsDir, cfg.rootDir, cfg.ignore);
  if (tsFiles.length === 0) return;

  const writtenFiles = generateTypings({
    rootDir: cfg.rootDir,
    tsDir: cfg.tsDir,
    gdDir: cfg.gdDir,
    files: tsFiles,
    outputDir: cfg.typingsDir,
    scenesDir: cfg.scenesDir,
    tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
    ignore: cfg.ignore,
    projectFile: cfg.projectFile,
  });
  debugLog(`Generated ${writtenFiles.length} typings files in ${cfg.typingsDir}`);
}

// ─── Convert TS -> GD ──────────────────────────────────────

program
  .command('convert')
  .description(
    'Convert TypeScript file(s) to GDScript. If no files given, converts all .ts files in tsDir.',
  )
  .argument('[files...]', 'TypeScript files or glob patterns to convert')
  .option('-o, --output-dir <dir>', 'Output directory (alias for --gd-dir)')
  .option('--ts-dir <dir>', 'TypeScript source directory')
  .option('--gd-dir <dir>', 'GDScript output directory')
  .option('--source-map', 'Generate source maps', false)
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir,
        gdDir: opts.gdDir,
        tsconfig: opts.tsconfig,
        sourceMap: opts.sourceMap,
      },
    });

    const resolvedFiles = resolveFiles(
      files.length > 0 ? files : undefined,
      '.ts',
      cfg.tsDir,
      cfg.rootDir,
      cfg.ignore,
    );

    if (resolvedFiles.length === 0) {
      console.log('No TypeScript files found to convert.');
      return;
    }

    debugLog(`Converting ${resolvedFiles.length} file(s)...`);

    let hasErrors = false;
    for (const filePath of resolvedFiles) {
      const result = convertTsToGd({
        filePath,
        rootDir: cfg.tsDir,
        tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        sourceMap: cfg.sourceMap,
      });

      for (const diag of result.diagnostics) {
        const prefix =
          diag.severity === 'error'
            ? 'ERROR'
            : diag.severity === 'warning'
              ? 'WARN'
              : 'INFO';
        console.error(
          `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
        );
      }

      if (result.diagnostics.some((d) => d.severity === 'error')) {
        hasErrors = true;
        continue;
      }

      const relPath = relative(cfg.tsDir, filePath);
      const outputPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.code);
      debugLog(`Written: ${outputPath}`);

      if (result.sourceMap) {
        const mapPath = outputPath + '.map';
        writeFileSync(mapPath, result.sourceMap);
        debugLog(`Written: ${mapPath}`);
      }
    }

    // Generate class typings + scene typings
    generateAllTypings({
      ...cfg,
      tsFiles: resolvedFiles,
    });

    if (hasErrors) process.exit(1);
  });

// ─── Convert GD -> TS ──────────────────────────────────────

program
  .command('convert-gd')
  .description(
    'Convert GDScript file(s) to TypeScript. If no files given, converts all .gd files in gdDir.',
  )
  .argument('[files...]', 'GDScript files or glob patterns to convert')
  .option('-o, --output-dir <dir>', 'Output directory (alias for --ts-dir)')
  .option('--ts-dir <dir>', 'TypeScript output directory')
  .option('--gd-dir <dir>', 'GDScript source directory')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option(
    '--registry <path>',
    'Path to godot-class-registry.json (overrides tstogd.json and bundled)',
  )
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir,
        gdDir: opts.gdDir,
        registryPath: opts.registry,
      },
    });

    const resolvedFiles = resolveFiles(
      files.length > 0 ? files : undefined,
      '.gd',
      cfg.gdDir,
      cfg.rootDir,
      cfg.ignore,
    );

    if (resolvedFiles.length === 0) {
      console.log('No GDScript files found to convert.');
      return;
    }

    debugLog(`Converting ${resolvedFiles.length} file(s)...`);

    const registry = resolveRegistry({ registryPath: cfg.registryPath });
    const tsOutputFiles: string[] = [];

    // Find .tscn scene files for signal handler resolution
    const sceneFiles = findSceneFiles(
      cfg.scenesDir,
      cfg.rootDir,
      cfg.ignore,
    );

    // Build project sources for user-defined class inheritance resolution
    const projectSources = resolvedFiles.map((f) => ({
      source: readFileSync(f, 'utf-8'),
      filePath: f,
    }));

    let hasErrors = false;
    for (const { source, filePath } of projectSources) {
      // Resolve signal handler types from .tscn connections
      const scriptResPath = `res://${relative(cfg.rootDir, filePath).replace(/\\/g, '/')}`;
      const signalHandlers = sceneFiles.length > 0
        ? resolveSignalHandlers(scriptResPath, sceneFiles, registry)
        : undefined;

      const result = convertGdToTs({ source, filePath, registry, projectSources, signalHandlers });

      for (const diag of result.diagnostics) {
        const prefix =
          diag.severity === 'error'
            ? 'ERROR'
            : diag.severity === 'warning'
              ? 'WARN'
              : 'INFO';
        console.error(
          `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
        );
      }

      if (result.diagnostics.some((d) => d.severity === 'error')) {
        hasErrors = true;
        continue;
      }

      const relPath = relative(cfg.gdDir, filePath);
      const outputPath = resolve(cfg.tsDir, relPath.replace(/\.gd$/, '.ts'));

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.code);
      debugLog(`Written: ${outputPath}`);
      tsOutputFiles.push(outputPath);
    }

    // Generate class typings + scene typings from the converted TS files
    generateAllTypings({
      ...cfg,
      tsFiles: tsOutputFiles,
    });

    if (hasErrors) process.exit(1);
  });

// ─── Validate GD ─────────────────────────────────────────────

program
  .command('validate-gd')
  .description(
    'Validate GDScript files using Godot CLI and remap errors to TypeScript via source maps',
  )
  .argument(
    '<files...>',
    'GDScript or TypeScript files to validate (.ts auto-resolves to .gd)',
  )
  .option('--godot-path <path>', 'Path to Godot executable')
  .option(
    '--project-root <dir>',
    'Godot project root (must contain project.godot)',
    '.',
  )
  .option(
    '--source-map-dir <dir>',
    'Directory containing .gd.map source map files',
  )
  .action(async (files: string[], opts) => {
    const godotPath = resolveGodotPath({ godotPath: opts.godotPath });
    const projectRoot = resolve(opts.projectRoot);

    const gdFiles = files.map((f) => {
      const resolved = resolve(f);
      return resolved.endsWith('.ts')
        ? resolved.replace(/\.ts$/, '.gd')
        : resolved;
    });

    const result = await validateGdFiles({
      gdFiles,
      projectRoot,
      godotPath,
      sourceMapDir: opts.sourceMapDir ? resolve(opts.sourceMapDir) : undefined,
    });

    for (const diag of result.diagnostics) {
      const prefix =
        diag.severity === 'error'
          ? 'ERROR'
          : diag.severity === 'warning'
            ? 'WARN'
            : 'INFO';
      console.error(
        `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
      );
    }

    if (result.diagnostics.some((d) => d.severity === 'error')) process.exit(1);
  });

// ─── Watch ──────────────────────────────────────────────────

program
  .command('watch')
  .description('Watch TypeScript files and convert on change')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--ts-dir <dir>', 'TypeScript source directory to watch')
  .option('--gd-dir <dir>', 'GDScript output directory')
  .option('--output-dir <dir>', 'Output directory (alias for --gd-dir)')
  .option('--source-map', 'Generate source maps', false)
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .option(
    '--typings-dir <path>',
    'Directory for all generated typings (relative to rootDir)',
  )
  .option(
    '--godot-path <path>',
    'Path to Godot executable (enables GD validation after conversion)',
  )
  .option('--project-root <dir>', 'Godot project root for validation')
  .action((opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir,
        gdDir: opts.gdDir,
        typingsDir: opts.typingsDir,
        tsconfig: opts.tsconfig,
        sourceMap: opts.sourceMap,
        godotPath: opts.godotPath,
      },
    });
    const godotPath = cfg.godotPath
      ? resolveGodotPath({ godotPath: cfg.godotPath })
      : undefined;

    const watcher = new Watcher({
      rootDir: cfg.rootDir,
      tsDir: cfg.tsDir,
      gdDir: cfg.gdDir,
      outputDir: cfg.gdDir,
      tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
      sourceMap: cfg.sourceMap,
      typingsDir: cfg.typingsDir,
      scenesDir: cfg.scenesDir,
      ignore: cfg.ignore,
      projectFile: cfg.projectFile,
      godotPath,
      projectRoot: opts.projectRoot ? resolve(opts.projectRoot) : undefined,
    });

    watcher.start();

    // Graceful shutdown
    process.on('SIGINT', () => {
      watcher.stop();
      process.exit(0);
    });
  });

// ─── Generate Typings ──────────────────────────────────────

/**
 * Detects Godot version from vendor/godot/version.py relative to the given godot docs dir.
 * The docs dir is expected to be vendor/godot/doc/classes, so version.py is at ../../version.py.
 */
function detectGodotVersion(docsDir: string): string | null {
  // Try docsDir/../../version.py (standard layout: vendor/godot/doc/classes)
  const candidates = [
    join(docsDir, '..', '..', 'version.py'),
    join(docsDir, '..', 'version.py'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      const ver = parseGodotVersion(candidate);
      return ver.short;
    }
  }
  return null;
}

/**
 * Writes index.d.ts into a version folder so it can be used independently.
 */
function writeVersionIndexDts(versionDir: string): void {
  const content = `/// <reference path="../_globals/globals.d.ts" />\n/// <reference path="../_globals/gd-helpers.d.ts" />\n/// <reference path="classes/index.d.ts" />\n`;
  writeFileSync(join(versionDir, 'index.d.ts'), content);
}

/**
 * Writes latest/index.d.ts that references a version folder.
 * latest/ is just a pointer, not a copy.
 */
function writeLatestIndexDts(latestDir: string, version: string): void {
  mkdirSync(latestDir, { recursive: true });
  const content = `// @version ${version}\n/// <reference path="../${version}/index.d.ts" />\n`;
  writeFileSync(join(latestDir, 'index.d.ts'), content);
}

program
  .command('generate-gdscript-global-typings')
  .description(
    'Generate TypeScript typings and class registry from Godot docs into versioned typings folder',
  )
  .option('--docs-dir <dir>', 'Godot XML class documentation directory')
  .option('--typings-dir <dir>', 'Root typings directory', 'typings')
  .option('--override-dir <dir>', 'Directory containing override .d.ts files')
  .option(
    '--version <ver>',
    'Godot version label (auto-detected from vendor/godot/version.py if omitted)',
  )
  .option('--set-latest', 'Also update latest/ reference', true)
  .action((opts) => {
    if (!opts.docsDir) {
      console.error('--docs-dir is required');
      process.exit(1);
    }

    const docsDir = resolve(opts.docsDir);
    const typingsRoot = resolve(opts.typingsDir);
    const version = opts.version ?? detectGodotVersion(docsDir);

    if (!version) {
      console.error(
        'Could not detect Godot version. Use --version to specify it.',
      );
      process.exit(1);
    }

    const versionDir = join(typingsRoot, version);
    mkdirSync(versionDir, { recursive: true });

    const registryPath = join(versionDir, 'godot-class-registry.json');
    const overrideDir = opts.overrideDir
      ? resolve(opts.overrideDir)
      : join(typingsRoot, '_overrides');

    generateGodotDocsTypings({
      classDocsDir: docsDir,
      outputDir: versionDir,
      overrideDir: existsSync(overrideDir) ? overrideDir : undefined,
      registryOutputPath: registryPath,
      version,
    });

    writeVersionIndexDts(versionDir);
    console.log(`Generated typings for Godot ${version} in ${versionDir}`);

    if (opts.setLatest) {
      const latestDir = join(typingsRoot, 'latest');
      writeLatestIndexDts(latestDir, version);
      console.log(`Updated latest/ → ${version}`);
    }
  });

// ─── Set Latest ──────────────────────────────────────────────

program
  .command('set-latest')
  .description(
    'Set the "latest" typings to point to an existing version folder',
  )
  .argument('<version>', 'Version folder name to point to (e.g. "4.7")')
  .option('--typings-dir <dir>', 'Root typings directory', 'typings')
  .action((version: string, opts) => {
    const typingsRoot = resolve(opts.typingsDir);
    const sourceDir = join(typingsRoot, version);
    const latestDir = join(typingsRoot, 'latest');

    if (!existsSync(sourceDir)) {
      console.error(`Version folder not found: ${sourceDir}`);
      console.error(
        `Available versions: ${getAvailableVersions(typingsRoot).join(', ') || '(none)'}`,
      );
      process.exit(1);
    }

    writeLatestIndexDts(latestDir, version);
    console.log(`Set latest typings to version ${version}`);
  });

function getAvailableVersions(typingsRoot: string): string[] {
  if (!existsSync(typingsRoot)) return [];
  return readdirSync(typingsRoot).filter((name) => {
    if (name === 'latest' || name.endsWith('.d.ts') || name.endsWith('.ts'))
      return false;
    const fullPath = join(typingsRoot, name);
    return (
      statSync(fullPath).isDirectory() &&
      (existsSync(join(fullPath, 'classes')) ||
        existsSync(join(fullPath, 'godot.d.ts')))
    );
  });
}

// ─── Generate Typings ──────────────────────────────────────

program
  .command('generate-typings')
  .description(
    'Generate globals.d.ts with class declarations, scene overloads, GodotResources, and autoloads. If no files given, scans tsDir.',
  )
  .argument('[files...]', 'TypeScript source files or glob patterns')
  .option('-o, --output <path>', 'Output .d.ts file path')
  .option(
    '--typings-dir <path>',
    'Directory for all generated typings (relative to rootDir)',
  )
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        typingsDir: opts.typingsDir,
        tsconfig: opts.tsconfig,
      },
    });

    const resolvedFiles = resolveFiles(
      files.length > 0 ? files : undefined,
      '.ts',
      cfg.tsDir,
      cfg.rootDir,
      cfg.ignore,
    );

    if (resolvedFiles.length === 0) {
      console.log('No TypeScript files found.');
      return;
    }

    const outputDir = opts.output
      ? resolve(opts.output)
      : cfg.typingsDir;

    const writtenFiles = generateTypings({
      rootDir: cfg.rootDir,
      tsDir: cfg.tsDir,
      gdDir: cfg.gdDir,
      files: resolvedFiles,
      outputDir,
      scenesDir: cfg.scenesDir,
      tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
      ignore: cfg.ignore,
      projectFile: cfg.projectFile,
    });
    debugLog(`Generated ${writtenFiles.length} typings files in ${outputDir}`);
  });

// ─── Lint ──────────────────────────────────────────────────

program
  .command('lint')
  .description(
    'Lint TypeScript files by converting to GDScript and reporting diagnostics. If no files given, lints all .ts files in tsDir.',
  )
  .argument('[files...]', 'TypeScript files or glob patterns to lint')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--ts-dir <dir>', 'TypeScript source directory')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .option(
    '--godot-path <path>',
    'Path to Godot executable (enables GDScript validation)',
  )
  .option('--project-root <dir>', 'Godot project root for validation')
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir,
        tsconfig: opts.tsconfig,
        godotPath: opts.godotPath,
      },
    });

    const resolvedFiles = resolveFiles(
      files.length > 0 ? files : undefined,
      '.ts',
      cfg.tsDir,
      cfg.rootDir,
      cfg.ignore,
    );

    if (resolvedFiles.length === 0) {
      console.log('No TypeScript files found to lint.');
      return;
    }

    const godotPath = cfg.godotPath
      ? resolveGodotPath({ godotPath: cfg.godotPath })
      : undefined;
    const projectRoot = opts.projectRoot
      ? resolve(opts.projectRoot)
      : cfg.rootDir;

    let totalErrors = 0;
    let totalWarnings = 0;

    for (const filePath of resolvedFiles) {
      // Skip .d.ts files
      if (filePath.endsWith('.d.ts')) continue;

      // Step 1: Convert TS to GD and collect diagnostics
      const result = convertTsToGd({
        filePath,
        rootDir: cfg.tsDir,
        tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        sourceMap: true, // Always generate source map for Godot error remapping
      });

      let fileHasErrors = false;

      // Step 2: Report converter diagnostics
      for (const diag of result.diagnostics) {
        if (diag.severity === 'info') continue;
        const prefix = diag.severity === 'error' ? 'ERROR' : 'WARN';
        if (diag.severity === 'error') {
          totalErrors++;
          fileHasErrors = true;
        } else {
          totalWarnings++;
        }
        console.error(
          `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
        );
      }

      // Step 3: If no converter errors and godotPath configured, run Godot validation
      if (!fileHasErrors && godotPath) {
        const relPath = relative(cfg.tsDir, filePath);
        const gdRelPath = relPath.replace(/\.ts$/, '.gd');
        const gdAbsPath = resolve(tmpdir(), 'tstogd', gdRelPath);
        const gdDir = dirname(gdAbsPath);

        try {
          mkdirSync(gdDir, { recursive: true });
          writeFileSync(gdAbsPath, result.code);

          const validateResult = validateGdFilesSync({
            gdFiles: [
              {
                path: gdAbsPath,
                sourceMapJson: result.sourceMap,
                tsFilePath: filePath,
              },
            ],
            projectRoot,
            godotPath,
          });

          for (const diag of validateResult.diagnostics) {
            const prefix = diag.severity === 'error' ? 'ERROR' : 'WARN';
            if (diag.severity === 'error') {
              totalErrors++;
            } else {
              totalWarnings++;
            }
            console.error(
              `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
            );
          }
        } finally {
          // Clean up temp GD file
          try {
            if (existsSync(gdAbsPath)) rmSync(gdAbsPath);
            const mapPath = gdAbsPath + '.map';
            if (existsSync(mapPath)) rmSync(mapPath);
          } catch {
            // Ignore cleanup errors
          }
        }
      }
    }

    // Summary
    if (totalErrors > 0 || totalWarnings > 0) {
      console.log(
        `\nLint complete: ${totalErrors} error(s), ${totalWarnings} warning(s)`,
      );
    } else {
      console.log(
        `\nLint complete: ${resolvedFiles.length} file(s) checked, no issues found.`,
      );
    }

    if (totalErrors > 0) process.exit(1);
  });

program.parse();
