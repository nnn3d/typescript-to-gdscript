import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TYPINGS_DIR = join(__dirname, '..', '..', 'typings');

/**
 * Type-check a TS snippet against the REAL generated Godot typings and return
 * the diagnostics for the snippet file. Used to lock in the Dictionary typing
 * contract (literal assignability, typed index access, typed methods via the
 * ambient `this: T` Object methods, dynamic-key fallback, nested generics).
 */
function typeCheck(snippet: string): ts.Diagnostic[] {
  const dir = mkdtempSync(join(tmpdir(), 'dict-typing-'));
  try {
    const filePath = join(dir, 'snippet.ts');
    writeFileSync(filePath, snippet);
    const program = ts.createProgram({
      rootNames: [filePath, join(TYPINGS_DIR, 'index.d.ts')],
      options: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.Node16,
        moduleResolution: ts.ModuleResolutionKind.Node16,
        strict: true,
        noEmit: true,
        noLib: true,
        types: [],
      },
    });
    const source = program.getSourceFile(filePath)!;
    return [
      ...program.getSemanticDiagnostics(source),
      ...program.getSyntacticDiagnostics(source),
    ];
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function fmt(diags: ts.Diagnostic[]): string {
  return diags
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
    .join('\n');
}

/** Wrap a snippet body inside a function in an exported class (Node ctx). */
function wrap(body: string): string {
  return `export class Probe extends Node {\n  run() {\n${body}\n  }\n}\n`;
}

describe('Dictionary typing contract', () => {
  it('accepts empty and populated object literals for typed Dictionary', () => {
    const diags = typeCheck(
      wrap(`
    const a: Dictionary<string, int> = {};
    const b: Dictionary<string, int> = { x: 1, y: 2 };
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('types index access on a typed Dictionary', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary<string, int> = { x: 1 };
    const v: int = d["x"];
    d["z"] = 5;
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('rejects assigning the wrong value type through index access', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary<string, int> = {};
    const bad: string = d["x"];
    `),
    );
    expect(diags.length).toBeGreaterThan(0);
  });

  it('types get/keys via the ambient this:T Object methods', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary<string, int> = { x: 1 };
    const v: int = d.get("x");
    const ks: Array<string> = d.keys();
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('allows dynamic non-literal string keys via fallback', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary<string, int> = {};
    const key: string = "k";
    const v = d.get(key);
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('supports nested generic dictionaries', () => {
    const diags = typeCheck(
      wrap(`
    const n: Dictionary<string, Array<int>> = { a: [1, 2] };
    const arr: Array<int> = n["a"];
    const m: Dictionary<int, Dictionary<string, int>> = { 1: { a: 1 } };
    const inner: int = m[1]["a"];
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('produces a typed dictionary from explicit constructor type arguments', () => {
    const diags = typeCheck(
      wrap(`
    const b = Dictionary<string, int>();
    const v: int = b["x"];
    b["y"] = 7;
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('enforces the value type on a constructor-typed dictionary', () => {
    const diags = typeCheck(
      wrap(`
    const b = Dictionary<string, int>();
    b["y"] = "no";
    `),
    );
    expect(diags.length).toBeGreaterThan(0);
  });

  it('types methods for object/class keys (non-string/number) via generics', () => {
    const diags = typeCheck(
      wrap(`
    const d = Dictionary<Node2D, int>();
    const k = new Node2D();
    const v: int = d.get(k);
    d.set(k, 5);
    const ks: Array<Node2D> = d.keys();
    const vs: Array<int> = d.values();
    const found: Node2D | null = d.find_key(5);
    const sz: int = d.size();
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('enforces value type on object-keyed Dictionary methods', () => {
    const diags = typeCheck(
      wrap(`
    const d = Dictionary<Node2D, int>();
    const k = new Node2D();
    d.set(k, "not an int");
    `),
    );
    expect(diags.length).toBeGreaterThan(0);
  });

  it('keeps bare Dictionary assignable from a literal', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary = {};
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('types heterogeneous unannotated struct literals per key', () => {
    const diags = typeCheck(
      wrap(`
    const p = { name: "bob", health: 100 };
    const n: string = p.get("name");
    const h: int = p.get("health");
    `),
    );
    expect(fmt(diags)).toBe('');
  });

  it('enforces the value type on index-signature writes', () => {
    const diags = typeCheck(
      wrap(`
    const d: Dictionary<string, int> = {};
    d["x"] = "wrong";
    `),
    );
    expect(diags.length).toBeGreaterThan(0);
  });

  // Dynamic-key support means a non-matching string literal falls back to the
  // `get(key: string): unknown` overload rather than erroring. This documents
  // that intended trade-off: precise types for known keys, `unknown` otherwise.
  it('falls back to unknown for non-matching string keys (no error)', () => {
    const diags = typeCheck(
      wrap(`
    const p = { name: "bob" };
    const m: unknown = p.get("missing");
    `),
    );
    expect(fmt(diags)).toBe('');
  });
});
