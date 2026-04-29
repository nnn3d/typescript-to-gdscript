import type { Command } from 'commander';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { convertGdToTs } from '../converter/gd-to-ts/index.ts';
import { injectMissingImportsForProject } from '../converter/gd-to-ts/inject-imports.ts';
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
    .option(
      '--unsafe-use-any',
      'Use `any` instead of `unknown` as the fallback for unresolvable types (e.g. gd.getset without a GDScript type or typeof-able value). Less strict but more error-prone.',
      false,
    )
    .option('--emit-on-error', 'Emit output files even when conversion errors occur', false)
    .action((files: string[], opts) => {
      const cfg = resolveConfig({
        overrides: {
          rootDir: opts.rootDir,
          tsDir: opts.tsDir,
          gdDir: opts.gdDir,
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

      const registry = resolveRegistry({ registryPath: opts.registry });
      const tsOutputFiles: string[] = [];
      const collectedErrors: string[] = [];

      // Find .tscn scene files for signal handler resolution
      const sceneFiles = findSceneFiles(cfg.scenesDir, cfg.rootDir, cfg.ignore);

      // Pre-collect all signal handlers once (instead of re-parsing scenes per file)
      const allSignalHandlers = sceneFiles.length > 0
        ? collectAllSignalHandlers(sceneFiles, registry)
        : undefined;

      // Build project sources for user-defined class inheritance resolution
      const projectSources = resolvedFiles.map((f) => ({
        source: readFileSync(f, 'utf-8'),
        filePath: f,
      }));

      // Tracks every successfully-written file so the import-injection
      // post-pass below knows which `.ts` to rewrite and which `.gd`
      // each one corresponds to (for self-import skipping).
      const convertedFiles: Array<{ tsPath: string; gdPath: string }> = [];

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
          unsafeUseAny: !!opts.unsafeUseAny,
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
        convertedFiles.push({ tsPath: outputPath, gdPath: filePath });
      }

      // Inject `import { Foo } from "./foo.js"` lines for every
      // unresolved user-class identifier in the freshly-written `.ts`
      // files. Runs BEFORE typings + TS helpers so the helpers see a
      // fully-imported file. No-op when the project opts into the
      // legacy `generateGlobalClassTypes: true` layout.
      injectMissingImportsForProject(
        convertedFiles,
        projectSources,
        registry,
        {
          generateGlobalClassTypes: cfg.converterOptions.generateGlobalClassTypes,
          tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
        },
      );

      // Generate class typings + scene typings + addon typings from the converted TS files
      generateAllTypings({
        ...cfg,
        tsFiles: tsOutputFiles,
      });

      // Run TS-based post-processing helpers.
      if (tsOutputFiles.length > 0) {
        const helperResult = runTsHelpers({
          files: tsOutputFiles,
          rootDir: cfg.rootDir,
          tsConfigPath: cfg.tsconfig,
          registry,
          unsafeUseAny: !!opts.unsafeUseAny,
        });
        if (helperResult.fixedFiles.length > 0) {
          debugLog(`TS helpers: patched ${helperResult.fixedFiles.length} file(s)`);
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
