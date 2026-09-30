import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { createMemoryHost } from '../../src/parser/typescript/memory-host.js';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { COMPILER_OPTIONS } from '../../src/browser/index.js';

describe('runtime imports in an in-memory program', () => {
  it('resolves a renamed import to a file that exists only in memory', () => {
    const host = createMemoryHost(
      new Map([
        [
          '/p/a.gd.d.ts',
          "import { A } from './a'; declare module './a' { namespace A { const X: number } }",
        ],
        ['/p/a.ts', 'export class A {}\n'],
        [
          '/p/b.ts',
          "import { A as B } from './a';\nexport class C extends B {}\n",
        ],
      ]),
    );
    const program = ts.createProgram({
      rootNames: ['/p/a.gd.d.ts', '/p/a.ts', '/p/b.ts'],
      options: COMPILER_OPTIONS,
      host,
    });

    const result = convertTsToGd({
      filePath: '/p/b.ts',
      rootDir: '/p',
      program,
    });

    expect(result.code).toContain('const B = preload("res://a.gd")');
    expect(result.diagnostics.map((d) => d.message).join('\n')).not.toContain(
      'must resolve',
    );
  });
});
