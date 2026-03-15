#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, existsSync } from 'fs';
import { resolve, dirname, relative, extname, join } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.js';
import { convertGdToTs } from '../converter/gd-to-ts/index.js';
import { lintFiles } from '../linter/index.js';
import { generateClassTypings } from '../typings/classes.js';
import { generateGodotDocsTypings } from '../typings/godot-docs.js';
import { parseGodotVersion } from '../typings/godot-registry.js';
import { Watcher } from '../watcher/index.js';
import { resolveRegistry } from '../config/index.js';

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
  .option('-o, --output-dir <dir>', 'Output directory')
  .option('--source-map', 'Generate source maps', false)
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    const rootDir = resolve(opts.rootDir);

    for (const file of files) {
      const filePath = resolve(file);
      const result = convertTsToGd({
        filePath,
        rootDir,
        tsConfigPath: opts.tsconfig ? resolve(opts.tsconfig) : undefined,
        sourceMap: opts.sourceMap,
      });

      for (const diag of result.diagnostics) {
        const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
        console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
      }

      if (result.diagnostics.some(d => d.severity === 'error')) continue;

      const outputPath = opts.outputDir
        ? resolve(opts.outputDir, relative(rootDir, filePath).replace(/\.ts$/, '.gd'))
        : filePath.replace(/\.ts$/, '.gd');

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
  .option('-o, --output-dir <dir>', 'Output directory')
  .option('--registry <path>', 'Path to godot-class-registry.json (overrides tstogd.json and bundled)')
  .action((files: string[], opts) => {
    const registry = resolveRegistry({ registryPath: opts.registry });

    for (const file of files) {
      const filePath = resolve(file);
      const source = readFileSync(filePath, 'utf-8');

      const result = convertGdToTs({ source, filePath, registry });

      for (const diag of result.diagnostics) {
        const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
        console.error(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
      }

      const outputPath = opts.outputDir
        ? resolve(opts.outputDir, relative('.', filePath).replace(/\.gd$/, '.ts'))
        : filePath.replace(/\.gd$/, '.ts');

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, result.code);
      console.log(`Written: ${outputPath}`);
    }
  });

// ─── Lint ───────────────────────────────────────────────────

program
  .command('lint')
  .description('Lint TypeScript files for GDScript transformation issues')
  .argument('<files...>', 'TypeScript files to lint')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    const results = lintFiles({
      files: files.map(f => resolve(f)),
      rootDir: resolve(opts.rootDir),
      tsConfigPath: opts.tsconfig ? resolve(opts.tsconfig) : undefined,
    });

    let hasErrors = false;
    for (const result of results) {
      for (const diag of result.diagnostics) {
        const prefix = diag.severity === 'error' ? 'ERROR' : diag.severity === 'warning' ? 'WARN' : 'INFO';
        console.log(`[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`);
        if (diag.severity === 'error') hasErrors = true;
      }
    }

    if (hasErrors) process.exit(1);
  });

// ─── Watch ──────────────────────────────────────────────────

program
  .command('watch')
  .description('Watch TypeScript files and convert on change')
  .option('--root-dir <dir>', 'Root directory to watch', '.')
  .option('--output-dir <dir>', 'Output directory for GDScript files')
  .option('--source-map', 'Generate source maps', false)
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .option('--class-typings <path>', 'Output path for global class typings')
  .action((opts) => {
    const rootDir = resolve(opts.rootDir);
    const watcher = new Watcher({
      rootDir,
      outputDir: opts.outputDir ? resolve(opts.outputDir) : rootDir,
      tsConfigPath: opts.tsconfig ? resolve(opts.tsconfig) : undefined,
      sourceMap: opts.sourceMap,
      classTypingsOutput: opts.classTypings ? resolve(opts.classTypings) : undefined,
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
 * Copies all files from sourceDir to targetDir.
 */
function copyTypingsDir(sourceDir: string, targetDir: string): void {
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

/**
 * Writes index.d.ts into a version folder so it can be used independently.
 */
function writeVersionIndexDts(versionDir: string): void {
  const content = `/// <reference path="../globals.d.ts" />\n/// <reference path="../gd-helpers.d.ts" />\n/// <reference path="godot.d.ts" />\n`;
  writeFileSync(join(versionDir, 'index.d.ts'), content);
}

program
  .command('generate-typings')
  .description('Generate TypeScript typings and class registry from Godot docs into versioned typings folder')
  .option('--docs-dir <dir>', 'Godot XML class documentation directory')
  .option('--typings-dir <dir>', 'Root typings directory', 'typings')
  .option('--patch-dir <dir>', 'Directory containing .patch files')
  .option('--version <ver>', 'Godot version label (auto-detected from vendor/godot/version.py if omitted)')
  .option('--set-latest', 'Also copy to latest/', true)
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

    generateGodotDocsTypings({
      classDocsDir: docsDir,
      outputDir: versionDir,
      patchDir: opts.patchDir ? resolve(opts.patchDir) : undefined,
      registryOutputPath: registryPath,
      version,
    });

    writeVersionIndexDts(versionDir);
    console.log(`Generated typings for Godot ${version} in ${versionDir}`);

    if (opts.setLatest) {
      const latestDir = join(typingsRoot, 'latest');
      copyTypingsDir(versionDir, latestDir);
      console.log(`Copied to ${latestDir}`);
    }
  });

// ─── Set Latest ──────────────────────────────────────────────

program
  .command('set-latest')
  .description('Set the "latest" typings from an existing version folder')
  .argument('<version>', 'Version folder name to copy from (e.g. "4.6")')
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

    copyTypingsDir(sourceDir, latestDir);
    writeVersionIndexDts(latestDir);
    console.log(`Set latest typings to version ${version}`);
  });

function getAvailableVersions(typingsRoot: string): string[] {
  if (!existsSync(typingsRoot)) return [];
  return readdirSync(typingsRoot).filter(name => {
    if (name === 'latest' || name.endsWith('.d.ts') || name.endsWith('.ts')) return false;
    const fullPath = join(typingsRoot, name);
    return statSync(fullPath).isDirectory() && existsSync(join(fullPath, 'godot.d.ts'));
  });
}

// ─── Generate Class Typings ────────────────────────────────

program
  .command('generate-class-typings')
  .description('Generate global class declarations from TS source files')
  .argument('<files...>', 'TypeScript source files')
  .option('-o, --output <path>', 'Output .d.ts file path', 'globals.d.ts')
  .option('--root-dir <dir>', 'Root directory', '.')
  .option('--tsconfig <path>', 'Path to tsconfig.json')
  .action((files: string[], opts) => {
    generateClassTypings({
      rootDir: resolve(opts.rootDir),
      files: files.map(f => resolve(f)),
      outputPath: resolve(opts.output),
      tsConfigPath: opts.tsconfig ? resolve(opts.tsconfig) : undefined,
    });
    console.log(`Generated: ${resolve(opts.output)}`);
  });

program.parse();
