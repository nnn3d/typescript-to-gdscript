/**
 * Godot error output parser and false-positive filtering.
 */

import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { parseAutoloads } from '../typings/scenes.ts';

// ─── Types ───────────────────────────────────────────────────

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

// ─── Autoload Error Filtering ────────────────────────────────

/**
 * Collects autoload singleton names from project.godot.
 * Used to filter false-positive "Identifier not found" errors caused by
 * Godot bug https://github.com/godotengine/godot/issues/80319
 * (--check-only --script doesn't load autoloads).
 */
export function getAutoloadNames(projectRoot: string): Set<string> {
  var projectFile = join(projectRoot, 'project.godot');
  if (!existsSync(projectFile)) return new Set();
  var autoloads = parseAutoloads(projectFile);
  return new Set(autoloads.map((a) => a.name));
}

/**
 * Returns true if the error is a false positive caused by Godot not loading
 * autoloads in --check-only mode.
 */
export function isAutoloadFalsePositive(
  error: GodotRawError,
  autoloadNames: Set<string>,
): boolean {
  if (autoloadNames.size === 0) return false;
  // Format 1: "Identifier not found: GameManager"
  // Format 2: "Identifier "Globals" not declared in the current scope."
  var match1 = error.message.match(/^Identifier not found: (\w+)/);
  if (match1 && autoloadNames.has(match1[1]!)) return true;
  var match2 = error.message.match(/^Identifier "(\w+)" not declared/);
  if (match2 && autoloadNames.has(match2[1]!)) return true;
  return false;
}

/**
 * Returns true if the error is a false positive caused by validating a
 * tmp copy of a GD file while the original still exists in the project.
 * Godot reports: 'Class "Foo" hides a global script class.'
 */
export function isDuplicateClassFalsePositive(error: GodotRawError): boolean {
  return /^Class ".*" hides a global script class/.test(error.message);
}

// ─── Error Parsing ───────────────────────────────────────────

/**
 * Resolves a `res://` path to an absolute path relative to the project root.
 */
export function resolveResPath(resPath: string, projectRoot: string): string {
  // res://scripts/player.gd -> scripts/player.gd
  var relative = resPath.replace(/^res:\/\//, '');
  return resolve(projectRoot, relative);
}

/**
 * Parses Godot CLI stderr output into structured error objects.
 * Handles multiple known Godot error output formats.
 */
export function parseGodotErrors(
  stderr: string,
  projectRoot: string,
): GodotRawError[] {
  var errors: GodotRawError[] = [];
  var lines = stderr.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]!;

    // Format 1: "res://path.gd:15 - Parse Error: message"
    // Format 1b: "res://path.gd:15:3 - Parse Error: message"
    var resMatch = line.match(
      /^\s*res:\/\/(.+?):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/,
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
      /^\s*SCRIPT ERROR:\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/,
    );
    if (scriptErrorMatch) {
      var nextLine = lines[i + 1];
      if (nextLine) {
        // Match "at: res://file.gd:15" and "at: GDScript::reload (res://file.gd:15)"
        var atMatch = nextLine.match(
          /^\s*at:\s*(?:\S+\s+\()?res:\/\/(.+?):(\d+)(?::(\d+))?\)?/,
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
        // Match absolute path: "at: GDScript::reload (C:\path\file.gd:15)" or "at: C:\path\file.gd:15"
        var atAbsMatch = nextLine.match(
          /^\s*at:\s*(?:\S+\s+\()?(.+\.gd):(\d+)(?::(\d+))?\)?/,
        );
        if (atAbsMatch) {
          errors.push({
            file: resolve(atAbsMatch[1]!),
            line: parseInt(atAbsMatch[2]!, 10),
            column: atAbsMatch[3] ? parseInt(atAbsMatch[3]!, 10) : 0,
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
      /^\s*(.+\.gd):(\d+)(?::(\d+))?\s*-\s*((?:Parse|Compile|Script)\s+Error):\s*(.+)$/,
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
