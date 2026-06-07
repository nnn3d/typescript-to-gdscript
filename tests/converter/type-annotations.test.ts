import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import ts from 'typescript';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { tsTypeNodeToGdType } from '../../src/converter/common/index.js';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Regression tests for type-annotation emission. The converter must only
 * emit a GDScript type annotation when the referenced TS type is something
 * GDScript actually has — a Godot class/value-type or a user `class_name`
 * class. Non-class types (`object`, interfaces, type aliases) and unknown /
 * unresolved type names must NOT be emitted as bogus GD type annotations.
 *
 * Each case asserts on the FULL converted GDScript, not substrings.
 */
describe('TS to GD: type-annotation emission', () => {
  let dir: string;

  // A minimal tsconfig that mirrors the real project setup enough for type
  // resolution + cross-file imports, without pulling in the DOM lib.
  const TSCONFIG = JSON.stringify({
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      moduleResolution: 'classic',
      allowImportingTsExtensions: true,
      noLib: true,
      strict: true,
      noEmit: true,
      types: [],
    },
    include: ['./**/*.ts'],
  });

  function convert(source: string, helper?: string): string {
    writeFileSync(join(dir, 'tsconfig.json'), TSCONFIG);
    if (helper !== undefined) {
      writeFileSync(join(dir, 'helper.ts'), helper);
    }
    const filePath = join(dir, 'main.ts');
    writeFileSync(filePath, source);
    const result = convertTsToGd({
      filePath,
      rootDir: dir,
      tsConfigPath: join(dir, 'tsconfig.json'),
    });
    return result.code;
  }

  /** Expected output when the parameter type is dropped. */
  const UNTYPED =
    'extends Node\nclass_name Probe\n\nfunc use(x) -> void:\n\tpass\n';

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'tstogd-typeanno-'));
  });

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('omits the annotation for an unknown / unresolved type', () => {
    const code = convert(
      `export class Probe extends Node {
  use(x: Banana): void {}
}
`,
    );
    expect(code).toBe(UNTYPED);
  });

  it('omits the annotation for a known non-class type (object)', () => {
    const code = convert(
      `export class Probe extends Node {
  use(x: object): void {}
}
`,
    );
    expect(code).toBe(UNTYPED);
  });

  it('omits the annotation for a known non-class type (local interface)', () => {
    const code = convert(
      `interface Local { x: int }
export class Probe extends Node {
  use(x: Local): void {}
}
`,
    );
    expect(code).toBe(UNTYPED);
  });

  it('omits the annotation for an unknown type imported from another file', () => {
    const code = convert(
      `import { Missing } from './helper.ts';
export class Probe extends Node {
  use(x: Missing): void {}
}
`,
      // helper exports nothing named Missing — the import is unresolved.
      `export class Other extends Node {}
`,
    );
    expect(code).toBe(UNTYPED);
  });

  it('omits the annotation for a non-class type imported from another file', () => {
    const code = convert(
      `import { Thing } from './helper.ts';
export class Probe extends Node {
  use(x: Thing): void {}
}
`,
      `export interface Thing { x: int }
`,
    );
    expect(code).toBe(UNTYPED);
  });

  it('emits the annotation for a class imported from another file', () => {
    const code = convert(
      `import { Enemy } from './helper.ts';
export class Probe extends Node {
  use(x: Enemy): void {}
}
`,
      `export class Enemy extends Node {}
`,
    );
    expect(code).toBe(
      'extends Node\nclass_name Probe\n\nfunc use(x: Enemy) -> void:\n\tpass\n',
    );
  });

  it('still emits valid Godot class and value-type annotations', () => {
    const code = convert(
      `export class Probe extends Node {
  a: Node;
  b: Vector2;
  use(n: Node2D): void {}
}
`,
    );
    expect(code).toBe(
      'extends Node\nclass_name Probe\n\n' +
        'var a: Node\nvar b: Vector2\n\n' +
        'func use(n: Node2D) -> void:\n\tpass\n',
    );
  });

  it('omits dotted type references (correctness over completeness)', () => {
    // `Node.ProcessMode` is a valid Godot inner enum, but the converter can't
    // verify dotted refs are real GD types (the checker returns no declaration
    // for them), so it drops the annotation rather than risk emitting an
    // invalid one. GD types are optional — dropping is always safe.
    const code = convert(
      `export class Probe extends Node {
  a: Node.ProcessMode;
  use(): void {}
}
`,
    );
    expect(code).toBe(
      'extends Node\nclass_name Probe\n\nvar a\n\nfunc use() -> void:\n\tpass\n',
    );
  });

  // Without a registry the converter can't recognise Godot built-ins by name,
  // so it must only emit types it can prove are classes/enums and drop the
  // rest — emitting an unrecognised name could break the generated GDScript.
  it('drops Godot-by-name and unknown types when no registry is available', () => {
    const src = `class User {}
class Probe {
  m(a: User, b: Node2D, c: Banana): void {}
}
`;
    const fileName = join(dir, 'degraded.ts');
    writeFileSync(fileName, src);
    const program = ts.createProgram([fileName], {
      noLib: true,
      target: ts.ScriptTarget.ES2022,
    });
    const checker = program.getTypeChecker();
    const sf = program.getSourceFile(fileName)!;
    let params: ts.NodeArray<ts.ParameterDeclaration> | undefined;
    const visit = (n: ts.Node): void => {
      if (ts.isMethodDeclaration(n)) params = n.parameters;
      ts.forEachChild(n, visit);
    };
    visit(sf);
    const gd = (p: ts.ParameterDeclaration): string | null =>
      tsTypeNodeToGdType(
        p.type,
        checker,
        sf,
        undefined,
        /* registry */ undefined,
      );

    // Resolved user class → emitted even without a registry.
    expect(gd(params![0]!)).toBe('User');
    // Godot type known only by name (no registry to confirm) → dropped.
    expect(gd(params![1]!)).toBeNull();
    // Genuinely unknown name → dropped.
    expect(gd(params![2]!)).toBeNull();
  });
});
