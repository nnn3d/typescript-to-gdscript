import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Fixtures whose whole point is a construct the converter rejects —
 * they pin what the `--emit-on-error` output looks like. Every other
 * fixture must convert without an error or a warning.
 */
export const FIXTURES_EXPECTING_DIAGNOSTICS = new Set(['unsupported-body']);

/**
 * Normalize generated GDScript for comparison:
 * - Trim trailing whitespace per line
 * - Remove trailing empty lines
 * - Normalize line endings
 */
export function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '')
    .trim();
}

/**
 * Discover all fixture pairs: names of `*.ts` files (not `*.d.ts`) that
 * have a matching `*.gd` file.
 */
export function listFixtures(dir: string): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'))
    .map((f) => f.replace(/\.ts$/, ''))
    .filter((name) => existsSync(join(dir, `${name}.gd`)));
}

/**
 * Errors and warnings; a fixture must have none unless it is in
 * FIXTURES_EXPECTING_DIAGNOSTICS. `converter-diag` fixtures assert
 * diagnostics in detail, so this is only the clean/not-clean split.
 */
export function isProblemDiagnostic(d: { severity: string }): boolean {
  return d.severity === 'error' || d.severity === 'warning';
}
