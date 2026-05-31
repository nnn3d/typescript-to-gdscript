import type { Command } from 'commander';
import { resolve } from 'path';
import { Watcher } from '../watcher/index.ts';
import { resolveConfig, resolveGodotPath } from '../config/index.ts';
import { isDebugEnabled } from './helpers.ts';

export function registerWatchCommand(program: Command): void {
  program
    .command('watch')
    .description('Watch TypeScript files and convert on change')
    .option('--root-dir <dir>', 'Root directory', '.')
    .option('--ts-dir <dir>', 'TypeScript source directory to watch')
    .option('--gd-dir <dir>', 'GDScript output directory')
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
    .option('--emit-on-error', 'Emit output files even when conversion errors occur', false)
    .option('--no-check', 'Disable the debounced full-project diagnostic check')
    .action((opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          gdDir: opts.gdDir,
          typingsDir: opts.typingsDir,
          tsconfig: opts.tsconfig,
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
        sourceMap: true,
        typingsDir: cfg.typingsDir,
        scenesDir: cfg.scenesDir,
        cacheDir: cfg.cacheDir,
        ignore: cfg.ignore,
        projectFile: cfg.projectFile,
        godotPath,
        projectRoot: opts.projectRoot ? resolve(opts.projectRoot) : undefined,
        emitOnError: opts.emitOnError,
        noCheck: opts.check === false,
        debug: isDebugEnabled(),
        godotTypingsDir: cfg.godotTypingsDir,
        generateGlobalClassTypes: cfg.converterOptions.generateGlobalClassTypes,
      });

      watcher.start();

      process.on('SIGINT', () => {
        watcher.stop().finally(() => process.exit(0));
      });
    });
}
