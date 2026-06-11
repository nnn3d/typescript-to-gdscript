import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import ts from 'typescript';
import { isPlainObjectType } from '../../src/converter/ts-to-gd/access-rewrite.ts';
import type { GodotClassRegistry } from '../../src/typings/godot-registry.ts';

/**
 * Unit tests for the plain-object classification that drives the
 * member-access → `.get()` rewrite. Fixture tests can't reach the
 * registry / no-registry branches (fixture programs don't load the
 * Godot typings, so engine types resolve to `any` there) — this test
 * builds a mini-program where `Vector2` is a *named interface*, exactly
 * how the real typings declare value types.
 */

const SOURCE = `
interface Vector2 { x: number }
interface Cfg { a?: number }
interface Dictionary { get(k: string): unknown }
type DictAlias = Dictionary;
class Klass { p: number = 1 }

let anon = { k: 1 };
let lit: { v?: number } = {};
let vec: Vector2 = { x: 1 };
let cfg: Cfg = { a: 1 };
let dict: Dictionary = null as any;
let aliased: DictAlias = null as any;
let inst = new Klass();
let arr: number[] = [];
let cb: () => void = () => {};
let un: Cfg | null = null;
let anyVal: any = 1;
`;

/** Stub registry: knows Vector2 as a constructor (value type). */
const stubRegistry = {
  hasClass: (n: string) => n === 'Node',
  isConstructor: (n: string) => n === 'Vector2',
  isGlobalEnum: () => false,
} as unknown as GodotClassRegistry;

let tmpDir: string;
let checker: ts.TypeChecker;
let typeOf: (varName: string) => ts.Type;

beforeAll(() => {
  tmpDir = join(
    tmpdir(),
    `tstogd-access-rewrite-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(tmpDir, { recursive: true });
  const filePath = join(tmpDir, 'zoo.ts');
  writeFileSync(filePath, SOURCE);

  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    strict: true,
    noEmit: true,
  });
  checker = program.getTypeChecker();
  const sf = program.getSourceFile(filePath)!;

  const decls = new Map<string, ts.VariableDeclaration>();
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const d of stmt.declarationList.declarations) {
      if (ts.isIdentifier(d.name)) decls.set(d.name.text, d);
    }
  }
  typeOf = (varName: string) => {
    const d = decls.get(varName);
    if (!d) throw new Error(`no var ${varName} in zoo`);
    return checker.getTypeAtLocation(d.name);
  };
});

afterAll(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

describe('isPlainObjectType — with registry', () => {
  it('accepts anonymous object literals and type literals', () => {
    expect(isPlainObjectType(typeOf('anon'), checker, stubRegistry)).toBe(true);
    expect(isPlainObjectType(typeOf('lit'), checker, stubRegistry)).toBe(true);
  });

  it('accepts named user interfaces', () => {
    expect(isPlainObjectType(typeOf('cfg'), checker, stubRegistry)).toBe(true);
  });

  it('accepts T | null unions of plain objects', () => {
    expect(isPlainObjectType(typeOf('un'), checker, stubRegistry)).toBe(true);
  });

  it('rejects Godot registry types even when declared as interfaces', () => {
    expect(isPlainObjectType(typeOf('vec'), checker, stubRegistry)).toBe(false);
  });

  it('rejects Dictionary — directly and through a type alias', () => {
    expect(isPlainObjectType(typeOf('dict'), checker, stubRegistry)).toBe(
      false,
    );
    expect(isPlainObjectType(typeOf('aliased'), checker, stubRegistry)).toBe(
      false,
    );
  });

  it('rejects classes, arrays, callables, and any', () => {
    expect(isPlainObjectType(typeOf('inst'), checker, stubRegistry)).toBe(
      false,
    );
    expect(isPlainObjectType(typeOf('arr'), checker, stubRegistry)).toBe(false);
    expect(isPlainObjectType(typeOf('cb'), checker, stubRegistry)).toBe(false);
    expect(isPlainObjectType(typeOf('anyVal'), checker, stubRegistry)).toBe(
      false,
    );
  });
});

describe('isPlainObjectType — without registry (degraded mode)', () => {
  it('rejects ALL named types — cannot prove they are not Godot types', () => {
    // Vector2 is a `declare interface` in the real typings; without the
    // registry there is no way to tell it from a user interface, and
    // `vec.get("x")` on a value type crashes at runtime. Correctness
    // over completeness (AGENTS rule 11): drop the rewrite.
    expect(isPlainObjectType(typeOf('vec'), checker, undefined)).toBe(false);
    expect(isPlainObjectType(typeOf('cfg'), checker, undefined)).toBe(false);
    expect(isPlainObjectType(typeOf('dict'), checker, undefined)).toBe(false);
  });

  it('still accepts anonymous literals — they can never be Godot types', () => {
    expect(isPlainObjectType(typeOf('anon'), checker, undefined)).toBe(true);
    expect(isPlainObjectType(typeOf('lit'), checker, undefined)).toBe(true);
  });
});
