#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative, extname, join } from 'path';
import { convertTsToGd } from '../converter/ts-to-gd/index.js';
import { convertGdToTs } from '../converter/gd-to-ts/index.js';
import { lintFiles } from '../linter/index.js';
import { generateClassTypings } from '../typings/classes.js';
import { generateGodotDocsTypings } from '../typings/godot-docs.js';
import { GodotClassRegistry, generateGodotRegistry } from '../typings/godot-registry.js';
import { Watcher } from '../watcher/index.js';

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
  .option('--registry <path>', 'Path to godot-class-registry.json')
  .action((files: string[], opts) => {
    const registry = opts.registry
      ? GodotClassRegistry.fromJsonFile(resolve(opts.registry))
      : undefined;

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

program
  .command('generate-typings')
  .description('Generate TypeScript typings and class registry from Godot docs')
  .option('--docs-dir <dir>', 'Godot XML class documentation directory')
  .option('--output-dir <dir>', 'Output directory for .d.ts files', '.')
  .option('--patch-dir <dir>', 'Directory containing .patch files')
  .option('--registry-output <path>', 'Output path for godot-class-registry.json')
  .option('--version <ver>', 'Godot version label')
  .action((opts) => {
    if (opts.docsDir) {
      generateGodotDocsTypings({
        classDocsDir: resolve(opts.docsDir),
        outputDir: resolve(opts.outputDir),
        patchDir: opts.patchDir ? resolve(opts.patchDir) : undefined,
        registryOutputPath: opts.registryOutput ? resolve(opts.registryOutput) : undefined,
        version: opts.version,
      });
      console.log('Generated Godot typings.');
      if (opts.registryOutput) {
        console.log(`Generated registry: ${resolve(opts.registryOutput)}`);
      }
    } else {
      console.error('--docs-dir is required');
      process.exit(1);
    }
  });

// ─── Generate Registry Only ─────────────────────────────────

program
  .command('generate-registry')
  .description('Generate Godot class registry JSON from Godot docs')
  .requiredOption('--docs-dir <dir>', 'Godot XML class documentation directory')
  .option('-o, --output <path>', 'Output path for registry JSON', 'godot-class-registry.json')
  .option('--version <ver>', 'Godot version label')
  .action((opts) => {
    generateGodotRegistry({
      classDocsDir: resolve(opts.docsDir),
      outputPath: resolve(opts.output),
      version: opts.version,
    });
    console.log(`Generated registry: ${resolve(opts.output)}`);
  });

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
