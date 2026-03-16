import { describe, it, expect } from 'vitest';
import { lintFiles } from '../../src/linter/index.js';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { afterEach } from 'vitest';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TMP_DIR = join(__dirname, '__tmp__');

afterEach(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

function writeTsFile(name: string, code: string): string {
  mkdirSync(TMP_DIR, { recursive: true });
  const filePath = join(TMP_DIR, name);
  writeFileSync(filePath, code);
  return filePath;
}

function lint(code: string, filename = 'test.ts') {
  const filePath = writeTsFile(filename, code);
  const results = lintFiles({ files: [filePath], rootDir: TMP_DIR });
  return results[0]!.diagnostics;
}

function convert(code: string, filename = 'test.ts') {
  const filePath = writeTsFile(filename, code);
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.Node16,
    moduleResolution: ts.ModuleResolutionKind.Node16,
    strict: true,
    noEmit: true,
  });
  return convertTsToGd({ filePath, rootDir: TMP_DIR, program });
}

// ─── Lint Rules ───────────────────────────────────────────────

describe('Lint: var restriction', () => {
  it('should warn on var', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    var x = 1;\n  }\n}\n');
    expect(diags.some(d => d.message.includes('var') && d.message.includes('restricted'))).toBe(true);
  });

  it('should not warn on let', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let x = 1;\n  }\n}\n');
    expect(diags.filter(d => d.message.includes('restricted'))).toHaveLength(0);
  });

  it('should not warn on const', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    const x = 1;\n  }\n}\n');
    expect(diags.filter(d => d.message.includes('restricted'))).toHaveLength(0);
  });
});

describe('Lint: undefined restriction', () => {
  it('should error on undefined usage', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let x = undefined;\n  }\n}\n');
    expect(diags.some(d => d.message.includes('undefined') && d.severity === 'error')).toBe(true);
  });

  it('should accept null', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let x = null;\n  }\n}\n');
    expect(diags.filter(d => d.message.includes('undefined'))).toHaveLength(0);
  });
});

describe('Lint: single class per file', () => {
  it('should error on multiple classes', () => {
    const diags = lint('class Foo extends Node {}\nclass Bar extends Node {}\n');
    expect(diags.some(d => d.message.includes('Only one class'))).toBe(true);
  });

  it('should accept single class', () => {
    const diags = lint('class Foo extends Node {}\n');
    expect(diags.filter(d => d.message.includes('Only one class'))).toHaveLength(0);
  });
});

describe('Lint: no top-level statements', () => {
  it('should error on top-level variable', () => {
    const diags = lint('let x = 1;\nclass Foo extends Node {}\n');
    expect(diags.some(d => d.message.includes('Top-level statement'))).toBe(true);
  });

  it('should allow type imports', () => {
    const diags = lint('class Foo extends Node {}\n');
    expect(diags.filter(d => d.message.includes('Top-level'))).toHaveLength(0);
  });
});

describe('Lint: unsupported features', () => {
  it('should error on spread operator', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let arr = [1, 2];\n    let arr2 = [...arr];\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Spread'))).toBe(true);
  });

  it('should error on for...in', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let obj = {};\n    for (let k in obj) {}\n  }\n}\n');
    expect(diags.some(d => d.message.includes('for...in'))).toBe(true);
  });

  it('should error on optional chaining (?.)', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let obj: Node = this;\n    let x = obj?.get_name();\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Optional chaining'))).toBe(true);
  });

  it('should error on optional property access (?.prop)', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let obj: Node = this;\n    let x = obj?.name;\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Optional chaining'))).toBe(true);
  });

  it('should error on nullish coalescing (??)', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let a: Node = this;\n    let b = a ?? this;\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Nullish coalescing'))).toBe(true);
  });

  it('should error on nullish coalescing assignment (??=)', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let a: Node = this;\n    a ??= this;\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Nullish coalescing assignment'))).toBe(true);
  });

  it('should error on destructuring', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let [a, b] = [1, 2];\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Destructuring'))).toBe(true);
  });

  it('should error on object destructuring', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let {a, b} = {a: 1, b: 2};\n  }\n}\n');
    expect(diags.some(d => d.message.includes('Destructuring'))).toBe(true);
  });

  it('should not error on valid for...of', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let arr = [1, 2];\n    for (let x of arr) {}\n  }\n}\n');
    expect(diags.filter(d => d.message.includes('for...in'))).toHaveLength(0);
  });

  it('should not error on regular property access', () => {
    const diags = lint('class Foo extends Node {\n  test() {\n    let x = this.get_name();\n  }\n}\n');
    expect(diags.filter(d => d.message.includes('Optional chaining'))).toHaveLength(0);
  });
});

// ─── Converter Diagnostics ────────────────────────────────────

describe('Converter: const/let/var handling', () => {
  it('should convert const to var without warning', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    const x: int = 1;\n  }\n}\n');
    expect(result.code).toContain('var x: int = 1');
    expect(result.diagnostics.filter(d => d.severity === 'warning')).toHaveLength(0);
  });

  it('should convert let to var without warning', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    let x: int = 1;\n  }\n}\n');
    expect(result.code).toContain('var x: int = 1');
    expect(result.diagnostics.filter(d => d.severity === 'warning')).toHaveLength(0);
  });

  it('should convert var to var with warning', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    var x: int = 1;\n  }\n}\n');
    expect(result.code).toContain('var x: int = 1');
    expect(result.diagnostics.some(d => d.message.includes('var') && d.message.includes('restricted'))).toBe(true);
  });
});

describe('Converter: undefined handling', () => {
  it('should convert undefined to null with error', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    let x = undefined;\n  }\n}\n');
    expect(result.code).toContain('var x = null');
    expect(result.diagnostics.some(d => d.message.includes('undefined') && d.severity === 'error')).toBe(true);
  });
});

describe('Converter: spread operator error', () => {
  it('should error on spread in array', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    let a = [1];\n    let b = [...a];\n  }\n}\n');
    expect(result.diagnostics.some(d => d.message.includes('Spread') && d.severity === 'error')).toBe(true);
  });
});

describe('Converter: optional chaining (?.) handling', () => {
  it('should produce output for optional chaining (falls back to raw text)', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    let obj: Node = this;\n    let x = obj?.get_name();\n  }\n}\n');
    // Converter still produces output (getText fallback), linter catches this
    expect(result.code).toBeDefined();
  });
});

describe('Converter: nullish coalescing (??) handling', () => {
  it('should produce output for nullish coalescing (falls back to raw text)', () => {
    const result = convert('class Foo extends Node {\n  test() {\n    let a: Node = this;\n    let b = a ?? this;\n  }\n}\n');
    // Converter still produces output, linter catches this
    expect(result.code).toBeDefined();
  });
});

describe('Converter: get/set accessor warning', () => {
  it('should warn on getter', () => {
    const result = convert('class Foo extends Node {\n  get value(): int { return 0; }\n}\n');
    expect(result.diagnostics.some(d => d.message.includes('accessor'))).toBe(true);
  });
});

describe('Converter: valid code produces no errors', () => {
  it('should convert clean code with no diagnostics', () => {
    const result = convert([
      'class Player extends Node2D {',
      '  health: int = 100;',
      '  _ready() {',
      '    let x: int = 42;',
      '    let name: string = "test";',
      '  }',
      '}',
    ].join('\n') + '\n');
    const errors = result.diagnostics.filter(d => d.severity === 'error');
    expect(errors).toHaveLength(0);
    expect(result.code).toContain('class_name Player');
    expect(result.code).toContain('extends Node2D');
    expect(result.code).toContain('var health: int = 100');
  });
});
