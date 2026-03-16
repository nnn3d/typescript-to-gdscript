import { execFile } from 'child_process';
import { promisify } from 'util';
import { existsSync, readFileSync } from 'fs';
import { resolve, basename, dirname, join, relative } from 'path';
import { SourceMapReader } from '../sourcemap/index.js';
import type { TransformDiagnostic } from '../converter/common/index.js';

var execFileAsync = promisify(execFile);

// ─── Types ───────────────────────────────────────────────────

export interface GodotValidateOptions {
  /** .gd files to validate */
  gdFiles: string[];
  /** Godot project root (must contain project.godot) */
  projectRoot: string;
  /** Path to Godot executable */
  godotPath: string;
  /** Directory containing .gd.map source map files (defaults to same dir as .gd) */
  sourceMapDir?: string;
}

export interface GodotValidateResult {
  /** All diagnostics, remapped to TS positions where source maps exist */
  diagnostics: TransformDiagnostic[];
  /** Whether Godot executable was found and ran */
  godotAvailable: boolean;
}

export interface GodotRawError {
  /** Absolute file path */
  file: string;
  /** 1-based line number */
  line: number;
  /** 0-based column number (often 0 when Godot doesn't report it) */
  column: number;
  /** Error type: "Parse Error", "Compile Error", etc. */
  errorType: string;
  /** Error message */
  message: string;
}

// ─── Error Parsing ───────────────────────────────────────────

/**
 * Resolves a `res://` path to an absolute path relative to the project root.
 */
function resolveResPath(resPath: string, projectRoot: string): string {
  // res://scripts/player.gd → scripts/player.gd
  var relative = resPath.replace(/^res:\/\//, '');
  return resolve(projectRoot, relative);
}

/**
 * Parses Godot CLI stderr output into structured error objects.
 * Handles multiple known Godot error output formats.
 */
export function parseGodotErrors(stderr: string, projectRoot: string): GodotRawError[] {
  var errors: GodotRawError[] = [];
  var lines = stderr.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]!;

    // Format 1: "res://path.gd:15 - Parse Error: message"
    // Format 1b: "res://path.gd:15:3 - Parse Error: message"
    var resMatch = line.match(
      /^\s*res:\/\/(.+?):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/
    );
    if (resMatch) {
      errors.push({
        file: resolveResPath('res://' + resMatch[1]!, projectRoot),
        line: parseInt(resMatch[2]!, 10),
        column: resMatch[3] ? parseInt(resMatch[3]!, 10) : 0,
        errorType: resMatch[4]!,
        message: resMatch[5]!.trim(),
      });
      continue;
    }

    // Format 2: "SCRIPT ERROR: Parse Error: message"
    // followed by "   at: res://path.gd:15" or "   at: GDScript::reload (res://path.gd:15)"
    var scriptErrorMatch = line.match(
      /^\s*SCRIPT ERROR:\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/
    );
    if (scriptErrorMatch) {
      var nextLine = lines[i + 1];
      if (nextLine) {
        // Match both "at: res://file.gd:15" and "at: GDScript::reload (res://file.gd:15)"
        var atMatch = nextLine.match(
          /^\s*at:\s*(?:\S+\s+\()?res:\/\/(.+?):(\d+)(?::(\d+))?\)?/
        );
        if (atMatch) {
          errors.push({
            file: resolveResPath('res://' + atMatch[1]!, projectRoot),
            line: parseInt(atMatch[2]!, 10),
            column: atMatch[3] ? parseInt(atMatch[3]!, 10) : 0,
            errorType: scriptErrorMatch[1]!,
            message: scriptErrorMatch[2]!.trim(),
          });
          i++; // Skip the "at:" line
          continue;
        }
      }
    }

    // Skip generic "ERROR: Failed to load script" lines (not actionable, follows SCRIPT ERROR)
    if (/^\s*ERROR:\s*Failed to load script/.test(line)) {
      // Also skip the following "at:" line
      if (lines[i + 1] && /^\s*at:/.test(lines[i + 1]!)) i++;
      continue;
    }

    // Format 3: Absolute/relative path "path/file.gd:15 - Parse Error: message"
    var absMatch = line.match(
      /^\s*(.+\.gd):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/
    );
    if (absMatch) {
      errors.push({
        file: resolve(projectRoot, absMatch[1]!),
        line: parseInt(absMatch[2]!, 10),
        column: absMatch[3] ? parseInt(absMatch[3]!, 10) : 0,
        errorType: absMatch[4]!,
        message: absMatch[5]!.trim(),
      });
    }
  }

  return errors;
}

// ─── Source Map Remapping ────────────────────────────────────

/**
 * Remaps a Godot error from GDScript positions to TypeScript positions
 * using source maps. Falls back to GD positions if no source map available.
 */
export async function remapError(
  error: GodotRawError,
  sourceMapDir?: string,
): Promise<TransformDiagnostic> {
  var mapPath = sourceMapDir
    ? join(sourceMapDir, basename(error.file) + '.map')
    : error.file + '.map';

  if (existsSync(mapPath)) {
    try {
      var rawMap = readFileSync(mapPath, 'utf-8');
      var reader = await SourceMapReader.fromJSON(rawMap);
      var original = reader.originalPositionFor(error.line, error.column);

      // If column 0 has no mapping (e.g. indentation), find the first mapping on this line
      if (!original.source || original.line == null) {
        var allMappings = reader.allMappings();
        var lineMapping = allMappings.find(m => m.generatedLine === error.line);
        if (lineMapping && lineMapping.originalLine != null && lineMapping.source != null) {
          original = {
            source: lineMapping.source,
            line: lineMapping.originalLine,
            column: lineMapping.originalColumn,
          };
        }
      }

      reader.destroy();

      if (original.source && original.line != null) {
        return {
          message: `[Godot ${error.errorType}] ${error.message}`,
          severity: 'error',
          file: resolve(dirname(mapPath), original.source),
          line: original.line,
          column: original.column ?? 0,
        };
      }
    } catch {
      // Source map read failed, fall through to GD position
    }
  }

  return {
    message: `[Godot ${error.errorType}] ${error.message}`,
    severity: 'error',
    file: error.file,
    line: error.line,
    column: error.column,
  };
}

// ─── Main Validation ─────────────────────────────────────────

/**
 * Validates GDScript files using the Godot CLI and remaps errors
 * back to TypeScript positions via source maps.
 */
export async function validateGdFiles(options: GodotValidateOptions): Promise<GodotValidateResult> {
  // Check Godot availability
  try {
    await execFileAsync(options.godotPath, ['--version'], { timeout: 10000 });
  } catch {
    return {
      diagnostics: [{
        message: `Godot executable not found at "${options.godotPath}". ` +
          'Set --godot-path, godotPath in tstogd.json, or GODOT_PATH env variable.',
        severity: 'warning',
        file: '',
        line: 0,
        column: 0,
      }],
      godotAvailable: false,
    };
  }

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
    var relToProject = relative(options.projectRoot, resolvedFile).replace(/\\/g, '/');
    var resPath = `res://${relToProject}`;

    try {
      await execFileAsync(options.godotPath, [
        '--headless',
        '--check-only',
        '--path', options.projectRoot,
        '--script', resPath,
      ], {
        timeout: 30000,
        cwd: options.projectRoot,
      });
      // Exit code 0 = no errors
    } catch (err: any) {
      var stderr: string = err.stderr ?? '';
      var stdout: string = err.stdout ?? '';
      var output = stderr + '\n' + stdout;

      var rawErrors = parseGodotErrors(output, options.projectRoot);

      if (rawErrors.length === 0 && output.trim()) {
        // Unparsed error output — report first meaningful line
        var firstLine = output.trim().split('\n').find(l => l.trim().length > 0);
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

      for (var rawError of rawErrors) {
        var diag = await remapError(rawError, options.sourceMapDir);
        allDiagnostics.push(diag);
      }
    }
  }

  return { diagnostics: allDiagnostics, godotAvailable: true };
}
