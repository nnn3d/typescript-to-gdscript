import { execFile } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { resolve, relative, normalize } from 'path';
import type { TransformDiagnostic } from '../converter/common/index.ts';

import {
  parseGodotErrors,
  getAutoloadNames,
  isAutoloadFalsePositive,
  isDuplicateClassFalsePositive,
  isUnderScratchDir,
} from './error-parser.ts';
import { remapError, remapErrorSync } from './source-map-remap.ts';

// Re-export everything that external consumers need
export {
  parseGodotErrors,
  getAutoloadNames,
  isAutoloadFalsePositive,
  isDuplicateClassFalsePositive,
  isUnderScratchDir,
} from './error-parser.ts';
export type { GodotRawError } from './error-parser.ts';
export { remapError, remapErrorSync } from './source-map-remap.ts';

const execFileAsync = promisify(execFile);

// ─── Types ───────────────────────────────────────────────────

export interface GodotValidateOptions {
  /**
   * .gd files to validate. Pass a bare `string` to validate without
   * source-map remapping, or the object form to supply the `.gd.map`
   * JSON + original `.ts` path so diagnostics come back anchored at
   * the TypeScript positions.
   */
  gdFiles: Array<string | { path: string; sourceMapJson?: string; tsFilePath?: string }>;
  /** Godot project root (must contain project.godot) */
  projectRoot: string;
  /** Path to Godot executable */
  godotPath: string;
  /**
   * Optional abort signal. When aborted, the in-flight Godot process
   * is killed and the function returns immediately with whatever
   * diagnostics had been collected so far (typically none). The
   * remaining files in the batch, output parsing, and source-map
   * remapping are all skipped — useful for callers that supersede
   * their own requests (e.g. the ts-plugin firing a fresh validation
   * on every keystroke).
   */
  signal?: AbortSignal;
  /**
   * Optional `ProjectCache` directory. Any diagnostic pointing at a
   * file inside here is treated as a throwaway mirror (the cache's
   * `gd-output/<…>.gd`) and Godot's `Class "X" hides a global script
   * class.` error for such files is suppressed — the real file is
   * what's already registered in the project. Callers that already
   * have a `ResolvedConfig` should pass `cfg.cacheDir`; otherwise
   * leave unset.
   */
  cacheDir?: string;
}

export interface GodotValidateResult {
  /** All diagnostics, remapped to TS positions where source maps exist */
  diagnostics: TransformDiagnostic[];
  /** Whether Godot executable was found and ran */
  godotAvailable: boolean;
}

// ─── Main Validation ─────────────────────────────────────────

/**
 * Validates GDScript files using the Godot CLI and remaps errors
 * back to TypeScript positions via source maps.
 */
export async function validateGdFiles(
  options: GodotValidateOptions,
): Promise<GodotValidateResult> {
  const { signal } = options;

  // If the caller aborted before we even started, bail immediately —
  // no point probing Godot.
  if (signal?.aborted) {
    return { diagnostics: [], godotAvailable: true };
  }

  // Check Godot availability. The headless args are mandatory: on Windows,
  // a bare `godot --version` pops the "couldn't detect mode" GUI dialog
  // because Godot briefly initializes its display server before reading
  // the `--version` argument.
  try {
    await execFileAsync(options.godotPath, ['--headless', '--version'], { timeout: 10000, signal });
  } catch {
    // Abort during the --version probe: treat like a no-op, caller's
    // signal.aborted check will gate downstream work.
    if (signal?.aborted) {
      return { diagnostics: [], godotAvailable: true };
    }
    return {
      diagnostics: [
        {
          message:
            `Godot executable not found at "${options.godotPath}". ` +
            'Set --godot-path, godotPath in tstogd.json, or GODOT_PATH env variable.',
          severity: 'warning',
          file: '',
          line: 0,
          column: 0,
        },
      ],
      godotAvailable: false,
    };
  }

  // Collect autoload names to filter false-positive errors (Godot bug #80319)
  const autoloadNames = getAutoloadNames(options.projectRoot);
  // `cacheDir` (if supplied) marks the `ProjectCache` gd-output mirror
  // — diagnostics from files under there are treated as scratch, not
  // real project files. Callers that don't have a resolved config
  // simply pass nothing and the outside-project heuristic handles it.
  const { cacheDir } = options;

  const allDiagnostics: TransformDiagnostic[] = [];

  for (const gdFileEntry of options.gdFiles) {
    // Stop between iterations as well — don't keep validating the
    // remaining batch once the caller has moved on.
    if (signal?.aborted) return { diagnostics: [], godotAvailable: true };
    const gdFile = typeof gdFileEntry === 'string' ? gdFileEntry : gdFileEntry.path;
    const sourceMapJson = typeof gdFileEntry === 'string' ? undefined : gdFileEntry.sourceMapJson;
    const tsFilePath = typeof gdFileEntry === 'string' ? undefined : gdFileEntry.tsFilePath;
    const resolvedFile = resolve(gdFile);

    if (!existsSync(resolvedFile)) {
      allDiagnostics.push({
        message: `GDScript file not found: ${resolvedFile}`,
        severity: 'error',
        file: resolvedFile,
        line: 0,
        column: 0,
      });
      continue;
    }

    // Convert to res:// path for Godot CLI
    const relToProject = relative(options.projectRoot, resolvedFile).replace(
      /\\/g,
      '/',
    );
    const resPath = `res://${relToProject}`;

    try {
      await execFileAsync(
        options.godotPath,
        [
          '--headless',
          '--check-only',
          '--path',
          options.projectRoot,
          '--script',
          resPath,
        ],
        {
          timeout: 30000,
          cwd: options.projectRoot,
          signal,
        },
      );
      // Exit code 0 = no errors
    } catch (err: any) {
      // The exec was aborted (caller superseded this request) — drop
      // everything we might have started and return immediately. No
      // output parsing, no source-map remapping, no further files.
      if (signal?.aborted) {
        return { diagnostics: [], godotAvailable: true };
      }

      const stderr: string = err.stderr ?? '';
      const stdout: string = err.stdout ?? '';
      const output = stderr + '\n' + stdout;

      let rawErrors = parseGodotErrors(output, options.projectRoot);
      // Filter false-positive errors
      rawErrors = rawErrors.filter(
        (e) =>
          !isAutoloadFalsePositive(e, autoloadNames) &&
          !isDuplicateClassFalsePositive(e, options.projectRoot, cacheDir),
      );

      if (rawErrors.length === 0 && output.trim()) {
        // Unparsed error output -- report first meaningful line
        // But first check if it's a known false positive
        let isFalsePositive = false;
        if (autoloadNames.size > 0) {
          for (const autoloadName of autoloadNames) {
            if (output.includes('Identifier not found: ' + autoloadName) ||
                output.includes('Identifier "' + autoloadName + '" not declared')) {
              isFalsePositive = true;
              break;
            }
          }
        }
        const isTmpFile = isUnderScratchDir(resolvedFile, options.projectRoot, cacheDir);
        if (!isFalsePositive && isTmpFile && /Class ".*" hides a global script class/.test(output)) {
          isFalsePositive = true;
        }
        if (!isFalsePositive) {
          const firstLine = output
            .trim()
            .split('\n')
            .find((l) => l.trim().length > 0);
          if (firstLine) {
            allDiagnostics.push({
              message: `[Godot] ${firstLine.trim()}`,
              severity: 'error',
              file: resolvedFile,
              line: 0,
              column: 0,
            });
          }
        }
      }

      for (const rawError of rawErrors) {
        const diag = await remapError(rawError, sourceMapJson, tsFilePath);
        allDiagnostics.push(diag);
      }
    }
  }

  return { diagnostics: allDiagnostics, godotAvailable: true };
}

// ─── Whole-Project Validation ─────────────────────────────────

export interface GodotValidateProjectOptions {
  projectRoot: string;
  godotPath: string;
  /** Only report errors for .gd files whose resolved path starts with this dir. */
  gdDir: string;
  /**
   * Source map table for remapping .gd errors back to .ts positions.
   * Key: normalized absolute .gd file path.
   * Value: { sourceMapJson, tsFilePath } — both optional.
   */
  sourceMapTable: Map<string, { sourceMapJson?: string; tsFilePath?: string }>;
  cacheDir?: string;
  signal?: AbortSignal;
}

/**
 * Run `godot --headless --check-only --path PROJECT` (no --script) to validate
 * the entire project at once. Errors are filtered to files under `gdDir` and
 * remapped to TypeScript positions via the provided source-map table.
 */
export async function validateGdProject(
  options: GodotValidateProjectOptions,
): Promise<GodotValidateResult> {
  const { signal } = options;

  if (signal?.aborted) return { diagnostics: [], godotAvailable: true };

  // Skip if projectRoot is not a valid Godot project — surface a warning so
  // misconfigured setups don't think their lint is silently passing.
  if (!existsSync(resolve(options.projectRoot, 'project.godot'))) {
    return {
      diagnostics: [{
        message:
          `Godot project root has no project.godot ("${options.projectRoot}"). ` +
          'Pass --project-root pointing at the directory that contains project.godot ' +
          'to enable Godot validation.',
        severity: 'warning',
        file: '',
        line: 0,
        column: 0,
      }],
      godotAvailable: true,
    };
  }

  try {
    // See note above on the headless args — needed to suppress the GUI
    // mode-detection dialog on Windows.
    await execFileAsync(options.godotPath, ['--headless', '--version'], { timeout: 10000, signal });
  } catch {
    if (signal?.aborted) return { diagnostics: [], godotAvailable: true };
    return {
      diagnostics: [{
        message:
          `Godot executable not found at "${options.godotPath}". ` +
          'Set --godot-path, godotPath in tstogd.json, or GODOT_PATH env variable.',
        severity: 'warning',
        file: '',
        line: 0,
        column: 0,
      }],
      godotAvailable: false,
    };
  }

  if (signal?.aborted) return { diagnostics: [], godotAvailable: true };

  const autoloadNames = getAutoloadNames(options.projectRoot);
  const { cacheDir } = options;
  const resolvedGdDir = normalize(resolve(options.gdDir));

  // `--check-only` without `--script` enters the SceneTree main loop with
  // no script to call quit(), so on Windows it hangs forever. `--quit-after 1`
  // forces Godot to quit after one main-loop tick — all scripts have already
  // been parsed by then, so syntax errors still surface in the output.
  //
  // IMPORTANT: with `--quit-after 1`, Godot exits with code 0 even when
  // there are script errors (the quit succeeded, that's all `--quit-after`
  // tracks). So we MUST always parse stdout+stderr — never short-circuit
  // on a successful exit.
  let output: string;
  try {
    const result = await execFileAsync(
      options.godotPath,
      [
        '--headless',
        '--check-only',
        '--path',
        options.projectRoot,
        '--quit-after',
        '1',
      ],
      {
        timeout: 60000,
        cwd: options.projectRoot,
        signal,
        windowsHide: true,
        maxBuffer: 50 * 1024 * 1024,
      },
    );
    output = (result.stderr ?? '') + '\n' + (result.stdout ?? '');
  } catch (err: any) {
    if (signal?.aborted) return { diagnostics: [], godotAvailable: true };
    const stderr: string = err.stderr ?? '';
    const stdout: string = err.stdout ?? '';
    output = stderr + '\n' + stdout;
  }

  // Exit code 0 with no parseable errors → all good.
  if (!output.trim()) return { diagnostics: [], godotAvailable: true };

  let rawErrors = parseGodotErrors(output, options.projectRoot);
  rawErrors = rawErrors.filter(
    (e) =>
      !isAutoloadFalsePositive(e, autoloadNames) &&
      !isDuplicateClassFalsePositive(e, options.projectRoot, cacheDir),
  );

  // Filter to errors under gdDir only
  rawErrors = rawErrors.filter((e) => {
    if (!e.file) return false;
    return normalize(resolve(e.file)).startsWith(resolvedGdDir);
  });

  const allDiagnostics: TransformDiagnostic[] = [];

  for (const rawError of rawErrors) {
    const resolvedGd = normalize(resolve(rawError.file));
    const entry = options.sourceMapTable.get(resolvedGd);
    const diag = await remapError(rawError, entry?.sourceMapJson, entry?.tsFilePath);
    allDiagnostics.push(diag);
  }

  return { diagnostics: allDiagnostics, godotAvailable: true };
}

