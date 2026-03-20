import { describe, it, expect } from 'vitest';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.js';
import { GodotClassRegistry } from '../../src/typings/godot-registry.js';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'gd-to-ts');
const REGISTRY_PATH = join(
  __dirname,
  '..',
  '..',
  'typings',
  '4.7',
  'godot-class-registry.json',
);
const registry = GodotClassRegistry.fromJsonFile(REGISTRY_PATH);

/**
 * Normalize code for comparison:
 * - Trim trailing whitespace per line
 * - Remove trailing empty lines
 * - Normalize line endings
 */
function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '')
    .trim();
}

// Discover all fixture pairs: *.gd files that have a matching *.ts file
const allGdFiles = readdirSync(FIXTURES_DIR).filter((f) => f.endsWith('.gd'));
const fixtureFiles = allGdFiles
  .filter((f) => {
    const tsFile = f.replace(/\.gd$/, '.ts');
    return readdirSync(FIXTURES_DIR).includes(tsFile);
  })
  .map((f) => f.replace(/\.gd$/, ''));

// Build project sources from all GD fixtures (for user class resolution)
const projectSources = allGdFiles.map((f) => ({
  source: readFileSync(join(FIXTURES_DIR, f), 'utf-8'),
  filePath: join(FIXTURES_DIR, f),
}));

describe('GD to TS: Fixture-based tests', () => {
  for (const fixtureName of fixtureFiles) {
    it(`should correctly convert: ${fixtureName}`, () => {
      const gdFilePath = join(FIXTURES_DIR, `${fixtureName}.gd`);
      const gdSource = readFileSync(gdFilePath, 'utf-8');
      const expectedTs = readFileSync(
        join(FIXTURES_DIR, `${fixtureName}.ts`),
        'utf-8',
      );

      const result = convertGdToTs({
        source: gdSource,
        filePath: gdFilePath,
        registry,
        projectSources,
      });

      // Log diagnostics for debugging
      if (result.diagnostics.length > 0) {
        for (const d of result.diagnostics) {
          console.log(
            `  [${d.severity}] ${d.message} (${d.file}:${d.line}:${d.column})`,
          );
        }
      }

      const normalizedActual = normalize(result.code);
      const normalizedExpected = normalize(expectedTs);

      // Compare line by line for better error messages
      const actualLines = normalizedActual.split('\n');
      const expectedLines = normalizedExpected.split('\n');

      for (
        let i = 0;
        i < Math.max(actualLines.length, expectedLines.length);
        i++
      ) {
        const actual = actualLines[i] ?? '<missing>';
        const expected = expectedLines[i] ?? '<missing>';
        if (actual !== expected) {
          expect.fail(
            `Line ${i + 1} mismatch in ${fixtureName}:\n` +
              `  Expected: ${JSON.stringify(expected)}\n` +
              `  Actual:   ${JSON.stringify(actual)}`,
          );
        }
      }

      expect(actualLines.length).toBe(expectedLines.length);
    });
  }
});
