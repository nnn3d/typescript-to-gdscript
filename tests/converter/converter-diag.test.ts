import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'converter-diag');
const TMP_DIR = join(__dirname, '__tmp__');

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

interface ExpectedDiagnostic {
  message: string;
  severity: 'error' | 'warning' | 'info';
}

function convert(code: string, filename: string) {
  mkdirSync(TMP_DIR, { recursive: true });
  const filePath = join(TMP_DIR, filename);
  writeFileSync(filePath, code);
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    strict: true,
    noEmit: true,
  });
  return convertTsToGd({ filePath, rootDir: TMP_DIR, program });
}

// Discover all fixture pairs
const fixtureFiles = readdirSync(FIXTURES_DIR)
  .filter(f => f.endsWith('.ts'))
  .sort();

describe('Converter Diagnostics: Fixture-based tests', () => {
  for (const tsFile of fixtureFiles) {
    const fixtureName = basename(tsFile, '.ts');
    const jsonFile = tsFile.replace('.ts', '.json');

    it(`should produce correct diagnostics: ${fixtureName}`, () => {
      const tsSource = readFileSync(join(FIXTURES_DIR, tsFile), 'utf-8');
      const expected: ExpectedDiagnostic[] = JSON.parse(
        readFileSync(join(FIXTURES_DIR, jsonFile), 'utf-8')
      );

      const result = convert(tsSource, tsFile);
      const diagnostics = result.diagnostics;

      if (expected.length === 0) {
        // No diagnostics expected — filter out info-level
        const significant = diagnostics.filter(d => d.severity === 'error' || d.severity === 'warning');
        expect(
          significant,
          `Expected no errors/warnings for ${fixtureName}, got:\n` +
          significant.map(d => `  [${d.severity}] ${d.message}`).join('\n')
        ).toHaveLength(0);
      } else {
        for (const exp of expected) {
          const match = diagnostics.find(
            d => d.message.includes(exp.message) && d.severity === exp.severity
          );
          expect(
            match,
            `Expected diagnostic with message containing "${exp.message}" ` +
            `and severity "${exp.severity}" in ${fixtureName}.\n` +
            `Actual diagnostics:\n` +
            diagnostics.map(d => `  [${d.severity}] ${d.message}`).join('\n')
          ).toBeDefined();
        }
      }
    });
  }
});
