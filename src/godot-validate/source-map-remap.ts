/**
 * Source map remapping for Godot validation errors.
 * Maps GDScript error positions back to TypeScript source positions.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { SourceMapReader } from '../sourcemap/index.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';
import type { GodotRawError } from './error-parser.ts';

// ─── Async Remap (uses SourceMapReader) ──────────────────────

/**
 * Remaps a Godot error from GDScript positions to TypeScript positions.
 *
 * Source-map input priority:
 *   1. `sourceMapJson` parameter (inline — preferred: caller already has
 *      the JSON in memory, e.g. straight from a converter run or a
 *      `ProjectCache` entry — no disk read needed).
 *   2. `<error.file>.map` sidecar on disk (fallback for callers that
 *      only point at the `.gd`).
 *
 * When `tsFilePath` is provided, it overrides the resolved source path
 * from the source map — useful when the map's `sources` entry is
 * relative to a throwaway location (e.g. a cache/scratch dir) but we
 * already know the real `.ts` we're validating.
 *
 * Falls back to GD positions if no source map is available.
 */
export async function remapError(
  error: GodotRawError,
  sourceMapJson?: string,
  tsFilePath?: string,
): Promise<TransformDiagnostic> {
  let rawMap: string | undefined = sourceMapJson;
  let mapPath: string | undefined;

  if (!rawMap) {
    mapPath = error.file + '.map';
    if (existsSync(mapPath)) {
      try {
        rawMap = readFileSync(mapPath, 'utf-8');
      } catch {
        rawMap = undefined;
      }
    }
  }

  if (rawMap) {
    try {
      const reader = await SourceMapReader.fromJSON(rawMap);
      let original = reader.originalPositionFor(error.line, error.column);

      // If column 0 has no mapping (e.g. indentation), find the first mapping on this line
      if (!original.source || original.line == null) {
        const allMappings = reader.allMappings();
        const lineMapping = allMappings.find(
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
        // When `tsFilePath` is supplied, trust the caller over the
        // sourcemap's `source` entry. Otherwise resolve `source`
        // relative to wherever the sourcemap lives on disk (fallback
        // path) — or, for inline maps with no disk anchor, leave it
        // as-is (caller is responsible for providing `tsFilePath`).
        let file: string;
        if (tsFilePath) {
          file = tsFilePath;
        } else if (mapPath) {
          file = resolve(dirname(mapPath), original.source);
        } else {
          file = original.source;
        }
        return {
          message: `[Godot ${error.errorType}] ${error.message}`,
          severity: 'error',
          file,
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
    file: tsFilePath ?? error.file,
    line: error.line,
    column: error.column,
  };
}

// ─── VLQ Decoding for Sync Source Map Remapping ───────────────

export const VLQ_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function decodeVlq(encoded: string): number[] {
  const result: number[] = [];
  let shift = 0;
  let value = 0;

  for (let i = 0; i < encoded.length; i++) {
    let digit = VLQ_CHARS.indexOf(encoded[i]!);
    if (digit === -1) continue;

    const cont = digit & 32;
    digit &= 31;
    value += digit << shift;

    if (cont) {
      shift += 5;
    } else {
      const negate = value & 1;
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
  const map = JSON.parse(rawMap);
  const sources: string[] = map.sources ?? [];
  const segments: string[] = (map.mappings ?? '').split(';');
  const mappings: LineMapping[] = [];

  let genCol = 0;
  let srcIdx = 0;
  let origLine = 0;
  let origCol = 0;

  for (let lineIdx = 0; lineIdx < segments.length; lineIdx++) {
    genCol = 0; // Reset column for each generated line
    const seg = segments[lineIdx]!;
    if (!seg) continue;

    const parts = seg.split(',');
    for (const part of parts) {
      const decoded = decodeVlq(part);
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
      const { mappings } = parseSourceMapMappings(sourceMapJson);

      // Find the first mapping on the error line
      const lineMapping = mappings.find((m) => m.generatedLine === error.line);
      // Try exact match first
      const exactMapping = mappings.find(
        (m) =>
          m.generatedLine === error.line && m.generatedColumn <= error.column,
      );
      const bestMapping = exactMapping ?? lineMapping;

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
