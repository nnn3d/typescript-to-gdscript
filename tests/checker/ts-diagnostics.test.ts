import { describe, it, expect } from 'vitest';
import { resolve, join } from 'path';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { createTsProgram } from '../../src/parser/typescript/index.ts';
import { collectTsDiagnostics } from '../../src/checker/ts-diagnostics.ts';

const fixtureDir = resolve(__dirname, '../fixtures/plugin');

describe('collectTsDiagnostics', () => {
  it('returns an array (even for a non-project dir)', () => {
    const program = createTsProgram({ rootDir: fixtureDir, files: [] });
    const diags = collectTsDiagnostics(program, fixtureDir);
    expect(Array.isArray(diags)).toBe(true);
  });

  it('filters out .d.ts files', () => {
    const program = createTsProgram({ rootDir: fixtureDir, files: [] });
    const diags = collectTsDiagnostics(program, fixtureDir);
    for (const d of diags) {
      expect(d.file.endsWith('.d.ts')).toBe(false);
    }
  });

  it('filters out files outside tsDir', () => {
    const program = createTsProgram({ rootDir: fixtureDir, files: [] });
    const diags = collectTsDiagnostics(program, fixtureDir);
    for (const d of diags) {
      expect(d.file.startsWith(resolve(fixtureDir))).toBe(true);
    }
  });

  it('filters out noise codes 2434, 2435, 2449', () => {
    // The "namespace + class merge" pattern (used for enums / inner classes
    // in this project) triggers TS2434 and friends. Build a fixture that
    // exercises the pattern, run TS diagnostics, and assert none of those
    // codes leak through.
    const tmp = mkdtempSync(join(tmpdir(), 'tstogd-noise-test-'));
    const tsFile = join(tmp, 'merge.ts');
    // Class declared BEFORE its merging namespace — this layout produces
    // TS2434 ("namespace must precede the class") and TS2449
    // ("class is used before its declaration") in `getSemanticDiagnostics`.
    writeFileSync(
      tsFile,
      [
        'export class Foo {',
        '  static method(): Foo.Inner | undefined { return undefined; }',
        '}',
        'export namespace Foo {',
        '  export class Inner {}',
        '}',
        '',
      ].join('\n'),
    );
    try {
      const program = createTsProgram({ rootDir: tmp, files: [tsFile] });
      const diags = collectTsDiagnostics(program, tmp);
      const noiseCodes = [2434, 2435, 2449];
      for (const d of diags) {
        for (const code of noiseCodes) {
          expect(d.message).not.toContain(`TS${code}:`);
        }
      }
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});
