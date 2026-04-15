import type { Command } from 'commander';
import { resolve } from 'path';
import { resolveGodotPath } from '../config/index.ts';
import { validateGdFiles } from '../godot-validate/index.ts';

export function registerValidateGdCommand(program: Command): void {
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
        rootDir: projectRoot,
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
}
