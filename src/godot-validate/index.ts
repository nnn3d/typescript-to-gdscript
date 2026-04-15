import { execFile, execFileSync } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { resolve, relative } from 'path';
import type { TransformDiagnostic } from '../converter/common/index.ts';

import {
  parseGodotErrors,
  getAutoloadNames,
  isAutoloadFalsePositive,
  isDuplicateClassFalsePositive,
} from './error-parser.ts';
import { remapError, remapErrorSync } from './source-map-remap.ts';

// Re-export everything that external consumers need
export {
  parseGodotErrors,
  getAutoloadNames,
  isAutoloadFalsePositive,
  isDuplicateClassFalsePositive,
} from './error-parser.ts';
export type { GodotRawError } from './error-parser.ts';
export { remapError, remapErrorSync } from './source-map-remap.ts';

var execFileAsync = promisify(execFile);

// ─── Types ───────────────────────────────────────────────────

export interface GodotValidateOptions {
  /** .gd files to validate */
  gdFiles: string[];
  /** Godot project root (must contain project.godot) */
  projectRoot: string;
  /** Path to Godot executable */
  godotPath: string;
  /** Directory containing .gd.map source map files (mirrors GD structure relative to rootDir) */
  sourceMapDir?: string;
  /** Root directory for computing relative paths within sourceMapDir */
  rootDir?: string;
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
  // Check Godot availability
  try {
    await execFileAsync(options.godotPath, ['--version'], { timeout: 10000 });
  } catch {
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
  var autoloadNames = getAutoloadNames(options.projectRoot);

  var allDiagnostics: TransformDiagnostic[] = [];

  for (var gdFile of options.gdFiles) {
    var resolvedFile = resolve(gdFile);

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
    var relToProject = relative(options.projectRoot, resolvedFile).replace(
      /\\/g,
      '/',
    );
    var resPath = `res://${relToProject}`;

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
        },
      );
      // Exit code 0 = no errors
    } catch (err: any) {
      var stderr: string = err.stderr ?? '';
      var stdout: string = err.stdout ?? '';
      var output = stderr + '\n' + stdout;

      var rawErrors = parseGodotErrors(output, options.projectRoot);
      // Filter false-positive errors
      rawErrors = rawErrors.filter(
        (e) =>
          !isAutoloadFalsePositive(e, autoloadNames) &&
          !isDuplicateClassFalsePositive(e),
      );

      if (rawErrors.length === 0 && output.trim()) {
        // Unparsed error output -- report first meaningful line
        // But first check if it's a known false positive
        var isFalsePositive = false;
        if (autoloadNames.size > 0) {
          for (var autoloadName of autoloadNames) {
            if (output.includes('Identifier not found: ' + autoloadName) ||
                output.includes('Identifier "' + autoloadName + '" not declared')) {
              isFalsePositive = true;
              break;
            }
          }
        }
        if (!isFalsePositive && /Class ".*" hides a global script class/.test(output)) {
          isFalsePositive = true;
        }
        if (!isFalsePositive) {
          var firstLine = output
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

      for (var rawError of rawErrors) {
        var diag = await remapError(rawError, options.sourceMapDir, options.rootDir);
        allDiagnostics.push(diag);
      }
    }
  }

  return { diagnostics: allDiagnostics, godotAvailable: true };
}

// ─── Sync Validation ─────────────────────────────────────────

export interface GodotValidateSyncOptions {
  /** .gd files to validate (with optional source map JSON per file) */
  gdFiles: Array<{
    path: string;
    sourceMapJson?: string;
    tsFilePath?: string;
  }>;
  /** Godot project root (must contain project.godot) */
  projectRoot: string;
  /** Path to Godot executable */
  godotPath: string;
}

/**
 * Synchronous version of validateGdFiles for use in ESLint rules.
 * Uses execFileSync and sync source map remapping.
 */
export function validateGdFilesSync(
  options: GodotValidateSyncOptions,
): GodotValidateResult {
  // Check Godot availability
  try {
    execFileSync(options.godotPath, ['--version'], {
      timeout: 10000,
      stdio: 'pipe',
    });
  } catch {
    return {
      diagnostics: [
        {
          message:
            `Godot executable not found at "${options.godotPath}". ` +
            'Set godotPath in tstogd.json or GODOT_PATH env variable.',
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
  var autoloadNames = getAutoloadNames(options.projectRoot);

  var allDiagnostics: TransformDiagnostic[] = [];

  for (var gdFile of options.gdFiles) {
    var resolvedFile = resolve(gdFile.path);

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

    var relToProject = relative(options.projectRoot, resolvedFile).replace(
      /\\/g,
      '/',
    );
    var resPath = `res://${relToProject}`;

    try {
      execFileSync(
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
          stdio: 'pipe',
        },
      );
    } catch (err: any) {
      var stderr: string = '';
      var stdout: string = '';

      if (err.stderr)
        stderr =
          err.stderr instanceof Buffer ? err.stderr.toString() : err.stderr;
      if (err.stdout)
        stdout =
          err.stdout instanceof Buffer ? err.stdout.toString() : err.stdout;

      var output = stderr + '\n' + stdout;
      var rawErrors = parseGodotErrors(output, options.projectRoot);
      // Filter false-positive errors
      rawErrors = rawErrors.filter(
        (e) =>
          !isAutoloadFalsePositive(e, autoloadNames) &&
          !isDuplicateClassFalsePositive(e),
      );

      if (rawErrors.length === 0 && output.trim()) {
        // Check if unparsed output is a known false positive
        var isFalsePositive = false;
        if (autoloadNames.size > 0) {
          for (var autoloadName of autoloadNames) {
            if (output.includes('Identifier not found: ' + autoloadName) ||
                output.includes('Identifier "' + autoloadName + '" not declared')) {
              isFalsePositive = true;
              break;
            }
          }
        }
        if (!isFalsePositive && /Class ".*" hides a global script class/.test(output)) {
          isFalsePositive = true;
        }
        if (!isFalsePositive) {
          var firstLine = output
            .trim()
            .split('\n')
            .find((l) => l.trim().length > 0);
          if (firstLine) {
            allDiagnostics.push({
              message: `[Godot] ${firstLine.trim()}`,
              severity: 'error',
              file: gdFile.tsFilePath ?? resolvedFile,
              line: 0,
              column: 0,
            });
          }
        }
      }

      for (var rawError of rawErrors) {
        allDiagnostics.push(
          remapErrorSync(rawError, gdFile.sourceMapJson, gdFile.tsFilePath),
        );
      }
    }
  }

  return { diagnostics: allDiagnostics, godotAvailable: true };
}
