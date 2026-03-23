import { describe, it, expect } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'ts-to-gd');

/**
 * Normalize generated GDScript for comparison:
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

// Discover all fixture pairs: *.ts files that have a matching *.gd file
const fixtureFiles = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.ts'))
  .filter((f) => {
    const gdFile = f.replace(/\.ts$/, '.gd');
    return readdirSync(FIXTURES_DIR).includes(gdFile);
  })
  .map((f) => f.replace(/\.ts$/, ''));

describe('TS to GD: Fixture-based tests', () => {
  for (const fixtureName of fixtureFiles) {
    it(`should correctly convert: ${fixtureName}`, () => {
      const tsFilePath = join(FIXTURES_DIR, `${fixtureName}.ts`);
      const expectedGd = readFileSync(
        join(FIXTURES_DIR, `${fixtureName}.gd`),
        'utf-8',
      );

      const result = convertTsToGd({
        filePath: tsFilePath,
        rootDir: FIXTURES_DIR,
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
      const normalizedExpected = normalize(expectedGd);

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
          const contextStart = Math.max(0, i - 2);
          const contextEnd = Math.min(
            Math.max(actualLines.length, expectedLines.length),
            i + 10,
          );
          const expectedContext = expectedLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          const actualContext = actualLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          expect.fail(
            `Line ${i + 1} mismatch in ${fixtureName}:\n` +
              `  Expected: ${JSON.stringify(expected)}\n` +
              `  Actual:   ${JSON.stringify(actual)}\n\n` +
              `  Expected context:\n${expectedContext}\n\n` +
              `  Actual context:\n${actualContext}`,
          );
        }
      }

      expect(actualLines.length).toBe(expectedLines.length);
    });
  }
});
