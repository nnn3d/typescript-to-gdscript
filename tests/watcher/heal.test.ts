import { describe, it, expect } from 'vitest';
import {
  diagnosticSignatures,
  computeSuspects,
  normPath,
} from '../../src/watcher/heal.ts';
import type { CheckResult } from '../../src/checker/index.ts';
import type { TransformDiagnostic } from '../../src/converter/common/index.ts';

function diag(
  file: string,
  message: string,
  severity: TransformDiagnostic['severity'] = 'error',
  line = 1,
  column = 1,
): TransformDiagnostic {
  return { file, message, severity, line, column };
}

function result(partial: Partial<CheckResult>): CheckResult {
  return {
    tsDiagnostics: [],
    converterDiagnostics: [],
    godotDiagnostics: [],
    staleFiles: [],
    ...partial,
  };
}

describe('diagnosticSignatures', () => {
  it('ignores diagnostic positions — only severity + message matter', () => {
    const a = diagnosticSignatures(
      result({ tsDiagnostics: [diag('C:/p/a.ts', 'boom', 'error', 3, 7)] }),
    );
    const b = diagnosticSignatures(
      result({ tsDiagnostics: [diag('C:/p/a.ts', 'boom', 'error', 99, 1)] }),
    );
    expect(a.get('C:/p/a.ts')).toBe(b.get('C:/p/a.ts'));
  });

  it('changes when a message changes or a diagnostic is added', () => {
    const base = diagnosticSignatures(
      result({ tsDiagnostics: [diag('C:/p/a.ts', 'boom')] }),
    );
    const changed = diagnosticSignatures(
      result({ tsDiagnostics: [diag('C:/p/a.ts', 'other boom')] }),
    );
    const added = diagnosticSignatures(
      result({
        tsDiagnostics: [diag('C:/p/a.ts', 'boom')],
        converterDiagnostics: [diag('C:/p/a.ts', 'conv issue', 'type-error')],
      }),
    );
    expect(changed.get('C:/p/a.ts')).not.toBe(base.get('C:/p/a.ts'));
    expect(added.get('C:/p/a.ts')).not.toBe(base.get('C:/p/a.ts'));
  });

  it('is order-insensitive and collapses duplicates', () => {
    const a = diagnosticSignatures(
      result({
        tsDiagnostics: [diag('C:/p/a.ts', 'one'), diag('C:/p/a.ts', 'two')],
      }),
    );
    const b = diagnosticSignatures(
      result({
        tsDiagnostics: [
          diag('C:/p/a.ts', 'two'),
          diag('C:/p/a.ts', 'one'),
          diag('C:/p/a.ts', 'one', 'error', 50, 2),
        ],
      }),
    );
    expect(a.get('C:/p/a.ts')).toBe(b.get('C:/p/a.ts'));
  });

  it('filters info diagnostics and normalizes backslash paths', () => {
    const sigs = diagnosticSignatures(
      result({
        tsDiagnostics: [diag('C:\\p\\a.ts', 'note', 'info')],
        converterDiagnostics: [diag('C:\\p\\b.ts', 'real', 'warning')],
      }),
    );
    expect(sigs.has('C:/p/a.ts')).toBe(false);
    expect(sigs.has('C:/p/b.ts')).toBe(true);
  });
});

describe('computeSuspects', () => {
  const projectTsFiles = new Set(['C:/p/a.ts', 'C:/p/b.ts', 'C:/p/c.ts']);

  it('flags files whose signature appeared, changed, or disappeared', () => {
    const prev = new Map([
      ['C:/p/a.ts', 'sig-a'],
      ['C:/p/b.ts', 'sig-b'],
    ]);
    const curr = new Map([
      ['C:/p/b.ts', 'sig-b-changed'],
      ['C:/p/c.ts', 'sig-c'],
    ]);
    const suspects = computeSuspects(prev, curr, {
      batchConverted: new Set(),
      projectTsFiles,
    });
    expect(suspects.sort()).toEqual(['C:/p/a.ts', 'C:/p/b.ts', 'C:/p/c.ts']);
  });

  it('skips unchanged files and files converted in the current batch', () => {
    const prev = new Map([['C:/p/a.ts', 'same']]);
    const curr = new Map([
      ['C:/p/a.ts', 'same'],
      ['C:/p/b.ts', 'new-error'],
    ]);
    const suspects = computeSuspects(prev, curr, {
      batchConverted: new Set(['C:/p/b.ts']),
      projectTsFiles,
    });
    expect(suspects).toEqual([]);
  });

  it('treats a null baseline as empty (startup heal of error files)', () => {
    const curr = new Map([['C:/p/a.ts', 'leftover-error']]);
    const suspects = computeSuspects(null, curr, {
      batchConverted: new Set(),
      projectTsFiles,
    });
    expect(suspects).toEqual(['C:/p/a.ts']);
  });

  it('ignores .d.ts files and files outside the watched project', () => {
    const curr = new Map([
      ['C:/p/types.d.ts', 'x'],
      ['C:/elsewhere/z.ts', 'y'],
      ['C:/p/out/a.gd', 'z'],
    ]);
    const suspects = computeSuspects(null, curr, {
      batchConverted: new Set(),
      projectTsFiles,
    });
    expect(suspects).toEqual([]);
  });
});

describe('normPath', () => {
  it('converts backslashes to forward slashes', () => {
    expect(normPath('C:\\p\\a.ts')).toBe('C:/p/a.ts');
  });
});
