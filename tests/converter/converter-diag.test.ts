import { describe, it, expect, afterEach } from 'vitest';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { join, basename } from 'path';
import ts from 'typescript';
import { tmpdir } from 'os';

const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'converter-diag');
const TMP_DIR = join(tmpdir(), '__tmp__' + Math.random().toString(36));

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

interface ExpectedDiagnostic {
  message: string;
  severity: 'error' | 'type-error' | 'warning' | 'info';
  /**
   * Optional 1-based line/column to assert on the matched diagnostic.
   * When present, the entry requires an EXACT location match in
   * addition to the message/severity substring match. Use sparingly —
   * most fixtures care only about message content. Primary use case
   * is regression coverage for position-preserving fixes (e.g. the
   * column off-by-one +1 convention on `TransformDiagnostic`).
   */
  line?: number;
  column?: number;
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
  .filter((f) => f.endsWith('.ts'))
  .sort();

describe('Converter Diagnostics: Fixture-based tests', () => {
  for (const tsFile of fixtureFiles) {
    const fixtureName = basename(tsFile, '.ts');
    const jsonFile = tsFile.replace('.ts', '.json');

    it(`should produce correct diagnostics: ${fixtureName}`, () => {
      const tsSource = readFileSync(join(FIXTURES_DIR, tsFile), 'utf-8');
      const expected: ExpectedDiagnostic[] = JSON.parse(
        readFileSync(join(FIXTURES_DIR, jsonFile), 'utf-8'),
      );

      const result = convert(tsSource, tsFile);
      const diagnostics = result.diagnostics;

      if (expected.length === 0) {
        // No diagnostics expected — filter out info-level
        const significant = diagnostics.filter(
          (d) => d.severity === 'error' || d.severity === 'warning',
        );
        expect(
          significant,
          `Expected no errors/warnings for ${fixtureName}, got:\n` +
            significant.map((d) => `  [${d.severity}] ${d.message}`).join('\n'),
        ).toHaveLength(0);
      } else {
        for (const exp of expected) {
          const match = diagnostics.find(
            (d) =>
              d.message.includes(exp.message) &&
              d.severity === exp.severity &&
              (exp.line === undefined || d.line === exp.line) &&
              (exp.column === undefined || d.column === exp.column),
          );
          // Location hint: when line/column were specified but nothing
          // matched, callers almost always want to know "did any
          // diagnostic match message+severity but miss on location?"
          // — a plain "not found" error hides that distinction.
          const locationPart =
            exp.line !== undefined || exp.column !== undefined
              ? ` at ${exp.line ?? '?'}:${exp.column ?? '?'}`
              : '';
          expect(
            match,
            `Expected diagnostic with message containing "${exp.message}" ` +
              `and severity "${exp.severity}"${locationPart} in ${fixtureName}.\n` +
              `Actual diagnostics:\n` +
              diagnostics
                .map(
                  (d) => `  [${d.severity}] ${d.line}:${d.column} ${d.message}`,
                )
                .join('\n'),
          ).toBeDefined();
        }
      }

      // When all expected diagnostics are non-conversion-errors (type-error,
      // warning, info), the converter MUST still emit a non-trivial .gd code
      // — type-errors do not block output.
      const hasExpectedConversionError = expected.some(
        (e) => e.severity === 'error',
      );
      if (!hasExpectedConversionError && expected.length > 0) {
        expect(
          result.code.trim().length,
          `Expected non-empty .gd output for ${fixtureName} (only ` +
            `non-blocking diagnostics expected), but got empty/whitespace code.`,
        ).toBeGreaterThan(0);
      }
    });
  }
});
