import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { createMemoryHost } from '../../src/parser/typescript/memory-host.js';

const OPTIONS: ts.CompilerOptions = { noLib: true, strict: true, types: [] };

function build(host: ts.CompilerHost, oldProgram?: ts.Program) {
  return ts.createProgram({
    rootNames: ['/lib/a.d.ts', '/src/main.ts'],
    options: OPTIONS,
    host,
    oldProgram,
  });
}

describe('createMemoryHost', () => {
  it('type-checks files that exist only in memory', () => {
    const host = createMemoryHost(
      new Map([
        ['/lib/a.d.ts', 'declare function greet(name: string): void;'],
        ['/src/main.ts', 'greet(1);'],
      ]),
    );
    const program = build(host);
    const codes = program
      .getSemanticDiagnostics(program.getSourceFile('/src/main.ts'))
      .map((d) => d.code);
    expect(codes).toEqual([2345]); // number is not assignable to string
  });

  it('reuses unchanged files when the program is rebuilt', () => {
    const host = createMemoryHost(
      new Map([
        ['/lib/a.d.ts', 'declare function greet(name: string): void;'],
        ['/src/main.ts', 'greet("a");'],
      ]),
    );
    const first = build(host);
    host.setFile('/src/main.ts', 'greet("b");');
    const second = build(host, first);
    expect(second.getSourceFile('/lib/a.d.ts')).toBe(
      first.getSourceFile('/lib/a.d.ts'),
    );
    expect(second.getSourceFile('/src/main.ts')!.text).toBe('greet("b");');
  });

  it('reports directories that contain files', () => {
    const host = createMemoryHost(new Map([['/a/b/c.ts', '']]));
    expect(host.directoryExists!('/a')).toBe(true);
    expect(host.directoryExists!('/a/b')).toBe(true);
    expect(host.directoryExists!('/a/')).toBe(true);
    expect(host.directoryExists!('/')).toBe(true);
    expect(host.directoryExists!('/x')).toBe(false);
  });
});
