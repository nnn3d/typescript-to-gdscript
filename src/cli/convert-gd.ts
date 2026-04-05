import type { Command } from 'commander';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertGdToTs } from '../converter/gd-to-ts/index.ts';
import { runTsHelpers } from '../converter/gd-to-ts/ts-helpers.ts';
import { collectAllSignalHandlers, findSceneFiles } from '../typings/scenes.ts';
import { resolveConfig, resolveRegistry } from '../config/index.ts';
import { debugLog, resolveFiles, generateAllTypings } from './helpers.ts';

export function registerConvertGdCommand(program: Command): void {
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
    .option('--no-helpers', 'Disable all GD-to-TS conversion helpers')
    .option(
      '--no-signal-handler-helper',
      'Disable signal handler type inference from .tscn connections',
    )
    .option(
      '--no-operator-fix-helper',
      'Disable TS-based operator type error auto-fix (gd.ops wrapping)',
    )
    .option('--emit-on-error', 'Emit output files even when conversion errors occur', false)
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
      const collectedErrors: string[] = [];

      // Find .tscn scene files for signal handler resolution
      const sceneFiles = findSceneFiles(cfg.scenesDir, cfg.rootDir, cfg.ignore);

      // Pre-collect all signal handlers once (instead of re-parsing scenes per file)
      const signalHelperEnabled = !opts.noHelpers && !opts.noSignalHandlerHelper;
      const allSignalHandlers = signalHelperEnabled && sceneFiles.length > 0
        ? collectAllSignalHandlers(sceneFiles, registry)
        : undefined;

      // Build project sources for user-defined class inheritance resolution
      const projectSources = resolvedFiles.map((f) => ({
        source: readFileSync(f, 'utf-8'),
        filePath: f,
      }));

      let hasErrors = false;
      for (const { source, filePath } of projectSources) {
        const scriptResPath = `res://${relative(cfg.rootDir, filePath).replace(/\\/g, '/')}`;
        const signalHandlers = allSignalHandlers?.get(scriptResPath);

        const result = convertGdToTs({
          source,
          filePath,
          registry,
          projectSources,
          signalHandlers,
        });

        // Collect diagnostics for summary at end
        for (const diag of result.diagnostics) {
          const prefix =
            diag.severity === 'error'
              ? 'ERROR'
              : diag.severity === 'warning'
                ? 'WARN'
                : 'INFO';
          collectedErrors.push(
            `[${prefix}] ${diag.file}:${diag.line}:${diag.column} - ${diag.message}`,
          );
        }

        if (result.diagnostics.some((d) => d.severity === 'error')) {
          hasErrors = true;
          if (!opts.emitOnError) continue;
        }

        const relPath = relative(cfg.gdDir, filePath);
        const outputPath = resolve(cfg.tsDir, relPath.replace(/\.gd$/, '.ts'));

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.code);
        console.log(`Writing ${relative(process.cwd(), outputPath)}`);
        tsOutputFiles.push(outputPath);
      }

      // Generate class typings + scene typings from the converted TS files
      generateAllTypings({
        ...cfg,
        tsFiles: tsOutputFiles,
      });

      // Run TS-based post-processing helpers (operator fix, etc.)
      const operatorFixEnabled = !opts.noHelpers && !opts.noOperatorFixHelper;
      if (operatorFixEnabled && tsOutputFiles.length > 0) {
        const helperResult = runTsHelpers({
          files: tsOutputFiles,
          rootDir: cfg.tsDir,
          tsConfigPath: cfg.tsconfig,
          helpers: { operatorFix: true },
        });
        if (helperResult.fixedFiles.length > 0) {
          debugLog(`Operator fix: patched ${helperResult.fixedFiles.length} file(s)`);
        }
      }

      // Print collected errors at the end
      if (collectedErrors.length > 0) {
        console.error('');
        for (const msg of collectedErrors) {
          console.error(msg);
        }
      }

      if (hasErrors) process.exit(1);
    });
}
