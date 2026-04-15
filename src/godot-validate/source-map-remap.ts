/**
 * Source map remapping for Godot validation errors.
 * Maps GDScript error positions back to TypeScript source positions.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, basename, dirname, join, relative } from 'path';
import { SourceMapReader } from '../sourcemap/index.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import type { GodotRawError } from './error-parser.ts';

// ─── Async Remap (uses SourceMapReader) ──────────────────────

/**
 * Remaps a Godot error from GDScript positions to TypeScript positions
 * using source maps. Falls back to GD positions if no source map available.
 *
 * @param error - The raw Godot error
 * @param sourceMapDir - Directory containing .gd.map files (mirrors GD structure relative to rootDir)
 * @param rootDir - Project root used to compute relative paths within sourceMapDir
 */
export async function remapError(
  error: GodotRawError,
  sourceMapDir?: string,
  rootDir?: string,
): Promise<TransformDiagnostic> {
  var mapPath: string;
  if (sourceMapDir && rootDir) {
    // Cache-based: source maps mirror GD directory structure relative to rootDir
    var relGd = relative(rootDir, error.file).replace(/\\/g, '/');
    mapPath = join(sourceMapDir, relGd + '.map');
  } else if (sourceMapDir) {
    mapPath = join(sourceMapDir, basename(error.file) + '.map');
  } else {
    mapPath = error.file + '.map';
  }

  if (existsSync(mapPath)) {
    try {
      var rawMap = readFileSync(mapPath, 'utf-8');
      var reader = await SourceMapReader.fromJSON(rawMap);
      var original = reader.originalPositionFor(error.line, error.column);

      // If column 0 has no mapping (e.g. indentation), find the first mapping on this line
      if (!original.source || original.line == null) {
        var allMappings = reader.allMappings();
        var lineMapping = allMappings.find(
          (m) => m.generatedLine === error.line,
        );
        if (
          lineMapping &&
          lineMapping.originalLine != null &&
          lineMapping.source != null
        ) {
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

// ─── VLQ Decoding for Sync Source Map Remapping ───────────────

export const VLQ_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function decodeVlq(encoded: string): number[] {
  var result: number[] = [];
  var shift = 0;
  var value = 0;

  for (var i = 0; i < encoded.length; i++) {
    var digit = VLQ_CHARS.indexOf(encoded[i]!);
    if (digit === -1) continue;

    var cont = digit & 32;
    digit &= 31;
    value += digit << shift;

    if (cont) {
      shift += 5;
    } else {
      var negate = value & 1;
      value >>= 1;
      result.push(negate ? -value : value);
      shift = 0;
      value = 0;
    }
  }

  return result;
}

interface LineMapping {
  generatedLine: number;
  generatedColumn: number;
  originalLine: number;
  originalColumn: number;
  sourceIndex: number;
}

/**
 * Parses source map JSON mappings into a flat array of line mappings.
 * Lightweight sync alternative to SourceMapConsumer.
 */
export function parseSourceMapMappings(rawMap: string): {
  mappings: LineMapping[];
  sources: string[];
} {
  var map = JSON.parse(rawMap);
  var sources: string[] = map.sources ?? [];
  var segments: string[] = (map.mappings ?? '').split(';');
  var mappings: LineMapping[] = [];

  var genCol = 0;
  var srcIdx = 0;
  var origLine = 0;
  var origCol = 0;

  for (var lineIdx = 0; lineIdx < segments.length; lineIdx++) {
    genCol = 0; // Reset column for each generated line
    var seg = segments[lineIdx]!;
    if (!seg) continue;

    var parts = seg.split(',');
    for (var part of parts) {
      var decoded = decodeVlq(part);
      if (decoded.length < 4) continue;

      genCol += decoded[0]!;
      srcIdx += decoded[1]!;
      origLine += decoded[2]!;
      origCol += decoded[3]!;

      mappings.push({
        generatedLine: lineIdx + 1, // 1-based
        generatedColumn: genCol,
        originalLine: origLine + 1, // 1-based
        originalColumn: origCol,
        sourceIndex: srcIdx,
      });
    }
  }

  return { mappings, sources };
}

/**
 * Synchronously remaps a Godot error using a pre-loaded source map JSON string.
 * Falls back to GD position if remapping fails.
 */
export function remapErrorSync(
  error: GodotRawError,
  sourceMapJson?: string,
  tsFilePath?: string,
): TransformDiagnostic {
  if (sourceMapJson) {
    try {
      var { mappings } = parseSourceMapMappings(sourceMapJson);

      // Find the first mapping on the error line
      var lineMapping = mappings.find((m) => m.generatedLine === error.line);
      // Try exact match first
      var exactMapping = mappings.find(
        (m) =>
          m.generatedLine === error.line && m.generatedColumn <= error.column,
      );
      var bestMapping = exactMapping ?? lineMapping;

      if (bestMapping) {
        return {
          message: `[Godot ${error.errorType}] ${error.message}`,
          severity: 'error',
          file: tsFilePath ?? error.file,
          line: bestMapping.originalLine,
          column: bestMapping.originalColumn,
        };
      }
    } catch {
      // Fall through to GD position
    }
  }

  return {
    message: `[Godot ${error.errorType}] ${error.message}`,
    severity: 'error',
    file: tsFilePath ?? error.file,
    line: error.line,
    column: error.column,
  };
}
