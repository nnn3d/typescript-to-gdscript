#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, dirname, relative, extname, join } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.js';
import { convertGdToTs } from '../converter/gd-to-ts/index.js';
import { generateClassTypings } from '../typings/classes.js';
import { generateGodotDocsTypings } from '../typings/godot-docs.js';
import { parseGodotVersion } from '../typings/godot-registry.js';
import { Watcher } from '../watcher/index.js';
import { resolveRegistry, resolveGodotPath, resolveConfig } from '../config/index.js';
import { validateGdFiles } from '../godot-validate/index.js';

const program = new Command();

program
  .name('ts2gd')
  .description('Convert TypeScript to GDScript and back')
  .version('0.1.0');

// ─── Convert TS -> GD ──────────────────────────────────────

program
  .command('convert')
  .description('Convert TypeScript file(s) to GDScript')
  .argument('<files...>', 'TypeScript files to convert')
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
        gdDir: opts.gdDir ?? opts.outputDir,
        tsconfig: opts.tsconfig,
        sourceMap: opts.sourceMap,
      },
    });

    for (const file of files) {
      const filePath = resolve(file);
      const result = convertTsToGd({
        filePath,
        rootDir: cfg.tsDir,
        tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        sourceMap: cfg.sourceMap,
      });

      for (const diag of result.diagnostics) {
        const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
        console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
      }

      if (result.diagnostics.some(d => d.severity === 'error')) continue;

      const relPath = relative(cfg.tsDir, filePath);
      const outputPath = resolve(cfg.gdDir, relPath.replace(/\.ts$/, '.gd'));

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.code);
      console.log(`Written: ${outputPath}`);

      if (result.sourceMap) {
        const mapPath = outputPath + '.map';
        writeFileSync(mapPath, result.sourceMap);
        console.log(`Written: ${mapPath}`);
      }
    }
  });

// ─── Convert GD -> TS ──────────────────────────────────────

program
  .command('convert-gd')
  .description('Convert GDScript file(s) to TypeScript')
  .argument('<files...>', 'GDScript files to convert')
  .option('-o, --output-dir <dir>', 'Output directory (alias for --ts-dir)')
  .option('--ts-dir <dir>', 'TypeScript output directory')
  .option('--gd-dir <dir>', 'GDScript source directory')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--registry <path>', 'Path to godot-class-registry.json (overrides tstogd.json and bundled)')
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir ?? opts.outputDir,
        gdDir: opts.gdDir,
        registryPath: opts.registry,
      },
    });
    const registry = resolveRegistry({ registryPath: cfg.registryPath });

    for (const file of files) {
      const filePath = resolve(file);
      const source = readFileSync(filePath, 'utf-8');

      const result = convertGdToTs({ source, filePath, registry });

      for (const diag of result.diagnostics) {
        const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
        console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
      }

      const relPath = relative(cfg.gdDir, filePath);
      const outputPath = resolve(cfg.tsDir, relPath.replace(/\.gd$/, '.ts'));

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.code);
      console.log(`Written: ${outputPath}`);
    }
  });

// ─── Validate GD ─────────────────────────────────────────────

program
  .command('validate-gd')
  .description('Validate GDScript files using Godot CLI and remap errors to TypeScript via source maps')
  .argument('<files...>', 'GDScript or TypeScript files to validate (.ts auto-resolves to .gd)')
  .option('--godot-path <path>', 'Path to Godot executable')
  .option('--project-root <dir>', 'Godot project root (must contain project.godot)', '.')
  .option('--source-map-dir <dir>', 'Directory containing .gd.map source map files')
  .action(async (files: string[], opts) => {
    const godotPath = resolveGodotPath({ godotPath: opts.godotPath });
    const projectRoot = resolve(opts.projectRoot);

    const gdFiles = files.map(f => {
      const resolved = resolve(f);
      return resolved.endsWith('.ts') ? resolved.replace(/\.ts$/, '.gd') : resolved;
    });

    const result = await validateGdFiles({
      gdFiles,
      projectRoot,
      godotPath,
      sourceMapDir: opts.sourceMapDir ? resolve(opts.sourceMapDir) : undefined,
    });

    for (const diag of result.diagnostics) {
      const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
      console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
    }

    if (result.diagnostics.some(d => d.severity === 'error')) process.exit(1);
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
  .option('--class-typings <path>', 'Output path for global class typings (deprecated, use --class-typings-path)')
  .option('--class-typings-path <path>', 'Directory for generated global class typings (relative to rootDir)')
  .option('--godot-path <path>', 'Path to Godot executable (enables GD validation after conversion)')
  .option('--project-root <dir>', 'Godot project root for validation')
  .action((opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        tsDir: opts.tsDir,
        gdDir: opts.gdDir ?? opts.outputDir,
        classTypingsPath: opts.classTypingsPath,
        tsconfig: opts.tsconfig,
        sourceMap: opts.sourceMap,
        godotPath: opts.godotPath,
      },
    });
    const godotPath = cfg.godotPath ? resolveGodotPath({ godotPath: cfg.godotPath }) : undefined;

    // Resolve class typings output path
    const classTypingsOutput = opts.classTypings
      ? resolve(opts.classTypings)
      : resolve(cfg.rootDir, cfg.classTypingsPath, 'globals.d.ts');

    const watcher = new Watcher({
      rootDir: cfg.rootDir,
      tsDir: cfg.tsDir,
      gdDir: cfg.gdDir,
      outputDir: cfg.gdDir,
      tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
      sourceMap: cfg.sourceMap,
      classTypingsOutput,
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
  const content = `/// <reference path="../globals.d.ts" />\n/// <reference path="../gd-helpers.d.ts" />\n/// <reference path="classes/index.d.ts" />\n`;
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
  .command('generate-typings')
  .description('Generate TypeScript typings and class registry from Godot docs into versioned typings folder')
  .option('--docs-dir <dir>', 'Godot XML class documentation directory')
  .option('--typings-dir <dir>', 'Root typings directory', 'typings')
  .option('--override-dir <dir>', 'Directory containing override .d.ts files')
  .option('--version <ver>', 'Godot version label (auto-detected from vendor/godot/version.py if omitted)')
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
      console.error('Could not detect Godot version. Use --version to specify it.');
      process.exit(1);
    }

    const versionDir = join(typingsRoot, version);
    mkdirSync(versionDir, { recursive: true });

    const registryPath = join(versionDir, 'godot-class-registry.json');
    const overrideDir = opts.overrideDir ? resolve(opts.overrideDir) : join(typingsRoot, 'overrides');

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
  .description('Set the "latest" typings to point to an existing version folder')
  .argument('<version>', 'Version folder name to point to (e.g. "4.7")')
  .option('--typings-dir <dir>', 'Root typings directory', 'typings')
  .action((version: string, opts) => {
    const typingsRoot = resolve(opts.typingsDir);
    const sourceDir = join(typingsRoot, version);
    const latestDir = join(typingsRoot, 'latest');

    if (!existsSync(sourceDir)) {
      console.error(`Version folder not found: ${sourceDir}`);
      console.error(`Available versions: ${getAvailableVersions(typingsRoot).join(', ') || '(none)'}`);
      process.exit(1);
    }

    writeLatestIndexDts(latestDir, version);
    console.log(`Set latest typings to version ${version}`);
  });

function getAvailableVersions(typingsRoot: string): string[] {
  if (!existsSync(typingsRoot)) return [];
  return readdirSync(typingsRoot).filter(name => {
    if (name === 'latest' || name.endsWith('.d.ts') || name.endsWith('.ts')) return false;
    const fullPath = join(typingsRoot, name);
    return statSync(fullPath).isDirectory() && (existsSync(join(fullPath, 'classes')) || existsSync(join(fullPath, 'godot.d.ts')));
  });
}

// ─── Generate Class Typings ────────────────────────────────

program
  .command('generate-class-typings')
  .description('Generate global class declarations from TS source files')
  .argument('<files...>', 'TypeScript source files')
  .option('-o, --output <path>', 'Output .d.ts file path')
  .option('--class-typings-path <path>', 'Directory for generated global class typings (relative to rootDir)')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    const cfg = resolveConfig({
      overrides: {
        rootDir: opts.rootDir,
        classTypingsPath: opts.classTypingsPath,
        tsconfig: opts.tsconfig,
      },
    });

    const outputPath = opts.output
      ? resolve(opts.output)
      : resolve(cfg.rootDir, cfg.classTypingsPath, 'globals.d.ts');

    generateClassTypings({
      rootDir: cfg.rootDir,
      files: files.map(f => resolve(f)),
      outputPath,
      tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
    });
    console.log(`Generated: ${outputPath}`);
  });

program.parse();
