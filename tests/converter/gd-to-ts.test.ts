import { describe, it, expect } from 'vitest';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.js';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import ts from 'typescript';
import { GodotClassRegistry } from '../../src/typings/godot-registry.js';
import {
  readFileSync,
  readdirSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
} from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { normalizeFixtureText } from '../helpers/fixture-text.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'gd-to-ts');
const REGISTRY_PATH = join(
  __dirname,
  '..',
  '..',
  'typings',
  'godot-class-registry.json',
);
const registry = GodotClassRegistry.fromJsonFile(REGISTRY_PATH);

// Discover all fixture pairs: *.gd files that have a matching *.ts file
const allGdFiles = readdirSync(FIXTURES_DIR).filter((f) => f.endsWith('.gd'));
// Fixtures that require special options (excluded from auto-discovery)
const SPECIAL_FIXTURES = new Set(['signal-handlers']);

const fixtureFiles = allGdFiles
  .filter((f) => {
    const tsFile = f.replace(/\.gd$/, '.ts');
    return readdirSync(FIXTURES_DIR).includes(tsFile);
  })
  .map((f) => f.replace(/\.gd$/, ''))
  .filter((f) => !SPECIAL_FIXTURES.has(f));

// Build project sources from all GD fixtures (for user class resolution)
const projectSources = allGdFiles.map((f) => ({
  source: readFileSync(join(FIXTURES_DIR, f), 'utf-8'),
  filePath: join(FIXTURES_DIR, f),
}));

describe('GD to TS: Fixture-based tests', () => {
  for (const fixtureName of fixtureFiles) {
    it(`should correctly convert: ${fixtureName}`, () => {
      const gdFilePath = join(FIXTURES_DIR, `${fixtureName}.gd`);
      const gdSource = readFileSync(gdFilePath, 'utf-8');
      const expectedTs = readFileSync(
        join(FIXTURES_DIR, `${fixtureName}.ts`),
        'utf-8',
      );

      const result = convertGdToTs({
        source: gdSource,
        filePath: gdFilePath,
        registry,
        projectSources,
      });

      // Log diagnostics for debugging
      if (result.diagnostics.length > 0) {
        for (const d of result.diagnostics) {
          console.log(
            `  [${d.severity}] ${d.message} (${d.file}:${d.line}:${d.column})`,
          );
        }
      }

      const normalizedActual = normalizeFixtureText(result.code);
      const normalizedExpected = normalizeFixtureText(expectedTs);

      // Compare line by line for better error messages
      const actualLines = normalizedActual.split('\n');
      const expectedLines = normalizedExpected.split('\n');

      for (
        let i = 0;
        i < Math.max(actualLines.length, expectedLines.length);
        i++
      ) {
        const actual = actualLines[i] ?? '<missing>';
        const expected = expectedLines[i] ?? '<missing>';
        if (actual !== expected) {
          const contextStart = Math.max(0, i - 2);
          const contextEnd = Math.min(
            Math.max(actualLines.length, expectedLines.length),
            i + 10,
          );
          const expectedContext = expectedLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          const actualContext = actualLines
            .slice(contextStart, contextEnd)
            .map(
              (l, j) =>
                `  ${j + contextStart === i ? '>' : ' '} ${j + contextStart + 1}| ${l}`,
            )
            .join('\n');
          expect.fail(
            `Line ${i + 1} mismatch in ${fixtureName}:\n` +
              `  Expected: ${JSON.stringify(expected)}\n` +
              `  Actual:   ${JSON.stringify(actual)}\n\n` +
              `  Expected context:\n${expectedContext}\n\n` +
              `  Actual context:\n${actualContext}`,
          );
        }
      }

      expect(actualLines.length).toBe(expectedLines.length);
    });
  }
});

describe('GD to TS: Signal handler typing', () => {
  it('should type untyped params from signal handler info', () => {
    const gdFilePath = join(FIXTURES_DIR, 'signal-handlers.gd');
    const gdSource = readFileSync(gdFilePath, 'utf-8');
    const expectedTs = readFileSync(
      join(FIXTURES_DIR, 'signal-handlers.ts'),
      'utf-8',
    );

    // Simulate signal handler info resolved from .tscn connections
    const signalHandlers = new Map([
      [
        '_on_area_entered',
        {
          params: [{ name: 'area', gdType: 'Area2D' }],
        },
      ],
      [
        '_on_body_shape_entered',
        {
          params: [
            { name: 'body_rid', gdType: 'RID' },
            { name: 'body', gdType: 'Node2D' },
            { name: 'body_shape_index', gdType: 'int' },
            { name: 'local_shape_index', gdType: 'int' },
          ],
        },
      ],
      [
        '_on_timer_timeout',
        {
          params: [],
        },
      ],
    ]);

    const result = convertGdToTs({
      source: gdSource,
      filePath: gdFilePath,
      registry,
      projectSources,
      signalHandlers,
    });

    const normalizedActual = normalizeFixtureText(result.code);
    const normalizedExpected = normalizeFixtureText(expectedTs);

    const actualLines = normalizedActual.split('\n');
    const expectedLines = normalizedExpected.split('\n');

    for (
      let i = 0;
      i < Math.max(actualLines.length, expectedLines.length);
      i++
    ) {
      const actual = actualLines[i] ?? '(missing)';
      const expected = expectedLines[i] ?? '(missing)';
      expect(
        actual,
        `Line ${i + 1} mismatch:\n  Expected: ${JSON.stringify(expected)}\n  Actual:   ${JSON.stringify(actual)}`,
      ).toBe(expected);
    }
    expect(actualLines.length).toBe(expectedLines.length);
  });
});

// Shared helper: create a temp dir with tsconfig referencing Godot typings
async function makeTsHelperTmp(label: string): Promise<{
  tmpDir: string;
  cleanup: () => void;
  writeFile: (name: string, content: string) => string;
}> {
  const { mkdirSync, writeFileSync, rmSync } = await import('fs');
  const tmpDir = join(
    tmpdir(),
    `tstogd-helper-${label}-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(tmpDir, { recursive: true });
  const typingsDir = join(__dirname, '..', '..', 'typings');
  writeFileSync(
    join(tmpDir, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'Node16',
        moduleResolution: 'Node16',
        strict: true,
        noEmit: true,
        noLib: true,
        types: [],
      },
      include: [typingsDir, './*.ts'],
    }),
  );
  return {
    tmpDir,
    cleanup: () => rmSync(tmpDir, { recursive: true, force: true }),
    writeFile: (name: string, content: string) => {
      const p = join(tmpDir, name);
      writeFileSync(p, content);
      return p;
    },
  };
}

describe('GD to TS: Operator fix helper', () => {
  it('should fix operator type errors using gd.ops wrappers', async () => {
    const { runTsHelpers } =
      await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } =
      await makeTsHelperTmp('operator-fix');
    try {
      const tsContent = [
        'export class TestOps extends Node2D {',
        '  v1: Vector2 = Vector2(1, 2);',
        '  v2: Vector2 = Vector2(3, 4);',
        '',
        '  test(node: Node2D) {',
        '    let v3 = this.v1 + this.v2;',
        '    let v4 = this.v1 - this.v2;',
        '    let v5 = this.v1 * this.v2;',
        '    let ok = 1 + 2;',
        '    let mouse_pos = this.get_global_mouse_position();',
        '    let target_angle = (mouse_pos - node.global_position).angle();',
        '    this.position += Vector2(1, 1);',
        '    this.v1 -= this.v2;',
        '  }',
        '}',
      ].join('\n');
      const filePath = writeFile('test-ops.ts', tsContent);

      const result = runTsHelpers({
        files: [filePath],
        rootDir: tmpDir,
        tsConfigPath: join(tmpDir, 'tsconfig.json'),
        helpers: { explicitConvert: false, readyFieldTypes: false },
      });

      expect(result.fixedFiles.length).toBe(1);
      const fixed = readFile(filePath, 'utf-8');

      // Operator errors should be wrapped in gd.ops
      expect(fixed).toContain('gd.ops.add(this.v1, this.v2)');
      expect(fixed).toContain('gd.ops.sub(this.v1, this.v2)');
      expect(fixed).toContain('gd.ops.mul(this.v1, this.v2)');
      expect(fixed).toContain('gd.ops.sub(mouse_pos, node.global_position)');

      // Compound assignments should be expanded
      expect(fixed).toContain(
        'this.position = gd.ops.add(this.position, Vector2(1, 1))',
      );
      expect(fixed).toContain('this.v1 = gd.ops.sub(this.v1, this.v2)');

      // Primitive operations should NOT be wrapped
      expect(fixed).toContain('let ok = 1 + 2;');
    } finally {
      cleanup();
    }
  });
});

describe('GD to TS: Explicit convert helper', () => {
  it('should wrap variant-type assignments in gd.as(value, Target)', async () => {
    const { runTsHelpers } =
      await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { resolveRegistry } = await import('../../src/config/index.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } =
      await makeTsHelperTmp('explicit-convert');
    try {
      const tsContent = [
        'function wants_v2i(v: Vector2i): void {}',
        'function wants_v2(v: Vector2): void {}',
        'function wants_packed(p: PackedColorArray): void {}',
        '',
        'export class TestExplicit extends Node2D {',
        '  test(): Vector2i {',
        '    // Vector2 → Vector2i (variant convert)',
        '    wants_v2i(Vector2.DOWN);',
        '    // Vector2i → Vector2 (variant convert)',
        '    wants_v2(Vector2i.ZERO);',
        '    // Array<Color> → PackedColorArray (via variantConverts)',
        '    const colors: Array<Color> = [];',
        '    wants_packed(colors);',
        '    // Empty array literal → PackedVector2Array (TS2739: missing properties)',
        '    const points: PackedVector2Array = [];',
        '    // Property assignment with LHS PropertyAccessExpression',
        '    const body: { points: PackedVector2Array } = { points: [] as any };',
        '    body.points = [];',
        '    // Return statement: wrap returned expression, not the keyword',
        '    return this.get_viewport_rect().size;',
        '    // Valid (no fix needed)',
        '    wants_v2(Vector2.UP);',
        '  }',
        '}',
      ].join('\n');
      const filePath = writeFile('test-explicit.ts', tsContent);

      const result = runTsHelpers({
        files: [filePath],
        rootDir: tmpDir,
        tsConfigPath: join(tmpDir, 'tsconfig.json'),
        registry: resolveRegistry(),
        helpers: { operatorFix: false, readyFieldTypes: false },
      });

      expect(result.fixedFiles.length).toBe(1);
      const fixed = readFile(filePath, 'utf-8');

      // Argument errors wrapped in gd.as with the correct target
      expect(fixed).toContain('wants_v2i(gd.as(Vector2.DOWN, Vector2i))');
      expect(fixed).toContain('wants_v2(gd.as(Vector2i.ZERO, Vector2))');
      expect(fixed).toContain('wants_packed(gd.as(colors, PackedColorArray))');
      // TS2739: missing properties (empty array → PackedVector2Array)
      expect(fixed).toContain(
        'const points: PackedVector2Array = gd.as([], PackedVector2Array)',
      );
      expect(fixed).toContain('body.points = gd.as([], PackedVector2Array)');
      expect(fixed).not.toContain('gd.as(body.points, PackedVector2Array) =');
      // Return statement: wraps the expression, not the `return` keyword
      expect(fixed).toContain(
        'return gd.as(this.get_viewport_rect().size, Vector2i)',
      );
      expect(fixed).not.toContain('gd.as(return');
      // Valid call unchanged
      expect(fixed).toContain('wants_v2(Vector2.UP);');
    } finally {
      cleanup();
    }
  });
});

describe('GD to TS: Extends type helper', () => {
  it('should copy parameter types from parent class for overridden methods', async () => {
    const { runTsHelpers } =
      await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } =
      await makeTsHelperTmp('extends-type');
    try {
      // `_process(delta: float)` and `_input(event: InputEvent)` are both
      // inherited from Node on Node2D — overriding without types should be
      // fixed up by the extends-type helper.
      const tsContent = [
        'export class TestExtends extends Node2D {',
        '  _process(delta) {',
        '    let x = delta;',
        '  }',
        '  _input(event) {',
        '    let y = event;',
        '  }',
        '  custom_method(arg) {',
        '    return arg;',
        '  }',
        '}',
      ].join('\n');
      const filePath = writeFile('test-extends.ts', tsContent);

      const result = runTsHelpers({
        files: [filePath],
        rootDir: tmpDir,
        tsConfigPath: join(tmpDir, 'tsconfig.json'),
        helpers: {
          operatorFix: false,
          explicitConvert: false,
          readyFieldTypes: false,
        },
      });

      expect(result.fixedFiles.length).toBe(1);
      const fixed = readFile(filePath, 'utf-8');

      // Inherited method parameters gain types from the parent class
      expect(fixed).toContain('_process(delta: float)');
      expect(fixed).toContain('_input(event: InputEvent)');

      // Methods that don't override anything are left untouched
      expect(fixed).toContain('custom_method(arg)');
    } finally {
      cleanup();
    }
  });
});

describe('GD to TS: `break` inside a `match` branch', () => {
  function convert(source: string) {
    return convertGdToTs({
      source,
      filePath: join(FIXTURES_DIR, 'break-in-match.gd'),
      registry,
      projectSources,
    });
  }

  it('reports a `break` that exits the loop around the `match`', () => {
    // GDScript `match` is not a loop, so this `break` leaves the
    // `while`. TS has no way to say that — inside the emitted
    // `switch` a bare `break` would exit the switch instead — so the
    // construct is rejected rather than quietly converted.
    const result = convert(
      [
        'extends Node',
        '',
        'func f(x):',
        '    while true:',
        '        match x:',
        '            1:',
        '                break',
        '            _:',
        '                print("other")',
        '',
      ].join('\n'),
    );

    const errors = result.diagnostics.filter((d) => d.severity === 'error');
    expect(errors.map((d) => d.message).join('\n')).toContain('`break`');
    expect(result.code).not.toMatch(/^\s*break;\s*$/m);
  });

  // The rejected `break` leaves only an `/* ERROR: ... */` comment
  // behind, and a comment is not a statement — so the `case` it sat
  // under still needs a block, exactly as a comment-only branch does.
  // Without one the label stacks onto the next `case`, merging two
  // branches into one on the way back, with nothing reported.
  it('keeps a branch whose `break` was rejected separate from the next', () => {
    const source = [
      'extends Node',
      '',
      'func f(x):',
      '\twhile true:',
      '\t\tmatch x:',
      '\t\t\t1:',
      '\t\t\t\tbreak',
      '\t\t\t2:',
      '\t\t\t\tprint("two")',
      '',
    ].join('\n');
    const result = convert(source);

    expect(
      result.diagnostics.filter((d) => d.severity === 'error'),
    ).not.toEqual([]);

    // Round trip the emitted TS: the two branches must come back as
    // two branches, not as a merged `1, 2:`.
    const dir = mkdtempSync(join(tmpdir(), 'tstogd-breakbranch-'));
    try {
      const filePath = join(dir, 'b.ts');
      writeFileSync(filePath, result.code);
      const program = ts.createProgram([filePath], {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.Node16,
        moduleResolution: ts.ModuleResolutionKind.Node16,
        strict: true,
        noEmit: true,
      });
      const back = convertTsToGd({ filePath, rootDir: dir, program });
      expect(back.code).not.toMatch(/^\s*1,\s*2:/m);
      expect(back.code).toMatch(/^\s*1:/m);
      expect(back.code).toMatch(/^\s*2:/m);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('leaves a `break` that belongs to a loop inside the branch alone', () => {
    const result = convert(
      [
        'extends Node',
        '',
        'func f(x):',
        '    match x:',
        '        1:',
        '            while true:',
        '                break',
        '',
      ].join('\n'),
    );

    expect(result.diagnostics.filter((d) => d.severity === 'error')).toEqual(
      [],
    );
    expect(result.code).toMatch(/^\s*break;\s*$/m);
  });
});
describe('GD → TS → GD round trip: `match`', () => {
  // The dialect's `switch` carries no `break`, so what separates one
  // branch from the next is purely whether a `case` has a statement
  // under it. A branch that loses its statement silently merges into
  // the one below it — changing what the code does, with no diagnostic
  // in either direction. The `.gd`/`.ts` fixture pair pins each leg on
  // its own; this pins the composition, which is where that bug lived.
  //
  // Only the branch structure is compared. A full-text round trip is
  // not achievable by design: the converters normalise indentation,
  // rewrite `x is not T` to `not (x is T)`, and drop `: Variant`.
  const source = readFileSync(join(FIXTURES_DIR, 'match.gd'), 'utf-8');

  function section(gd: string, funcName: string): string {
    const lines = gd.split('\n');
    const start = lines.findIndex((l) => l.startsWith(`func ${funcName}(`));
    expect(start).toBeGreaterThan(-1);
    const rest = lines.slice(start + 1);
    const end = rest.findIndex((l) => l.startsWith('func '));
    return (end === -1 ? rest : rest.slice(0, end)).join('\n').trimEnd();
  }

  it('keeps every bodyless branch separate from the next one', () => {
    const toTs = convertGdToTs({
      source,
      filePath: join(FIXTURES_DIR, 'match.gd'),
      registry,
      projectSources,
    });
    expect(toTs.diagnostics.filter((d) => d.severity === 'error')).toEqual([]);

    const dir = mkdtempSync(join(tmpdir(), 'tstogd-roundtrip-'));
    try {
      const filePath = join(dir, 'match.ts');
      writeFileSync(filePath, toTs.code);
      const program = ts.createProgram([filePath], {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.Node16,
        moduleResolution: ts.ModuleResolutionKind.Node16,
        strict: true,
        noEmit: true,
      });
      const back = convertTsToGd({ filePath, rootDir: dir, program });

      // The return leg has to be clean too: an error here means the
      // TypeScript this converter emits is not something the other
      // converter accepts.
      expect(
        back.diagnostics
          .filter((d) => d.severity === 'error')
          .map((d) => d.message),
      ).toEqual([]);

      // Five branches in, five branches out. Before the `{}` emission
      // was keyed on statements, branches 1–3 came back as `1, 2, 3, 4:`
      // — one branch that printed "four" for every value. Branch 4 is
      // the same failure through a comment form that spans lines: a
      // per-line check sees `a note` and calls the branch filled.
      expect(section(back.code, 'test_bodyless_branches')).toBe(
        [
          '\t# A branch with no statement must not merge into the next one:',
          '\t# in the TS `switch` a `case` with no body under it falls through.',
          '\t# A `"""..."""` is a statement in GDScript but a comment in TS, so',
          '\t# branch 4 needs the `{}` too — and it spans lines, which a',
          '\t# per-line check reads as code from the second line on.',
          // `x` is a field, so it comes back through TS as `this.x`.
          '\tmatch self.x:',
          '\t\t1:',
          '\t\t\t# only a comment',
          '\t\t\tpass',
          '\t\t2:',
          '\t\t\tpass',
          '\t\t3:',
          '\t\t\t@warning_ignore("unused_variable")',
          '\t\t\tpass',
          '\t\t4:',
          '\t\t\t"""',
          '\t\t\ta note',
          '\t\t\tover two lines',
          '\t\t\t"""',
          '\t\t5:',
          '\t\t\tprint("five")',
        ].join('\n'),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('GD to TS: `_` before other branches', () => {
  it('transcribes every branch in source order', () => {
    const result = convertGdToTs({
      source: [
        'extends Node',
        '',
        'func f(x):',
        '\tmatch x:',
        '\t\t_:',
        '\t\t\tprint("other")',
        '\t\t1:',
        '\t\t\tprint("one")',
        '',
      ].join('\n'),
      filePath: join(FIXTURES_DIR, 'wildcard-first.gd'),
      registry,
      projectSources,
    });

    // A straight transcription: every branch is carried over, in the
    // order it was written, with nothing dropped and nothing said.
    // `_` matching first does make `1:` dead in the GDScript, but
    // deciding that on the user's behalf is not this converter's job —
    // migration output is meant to be read and edited, so losing code
    // silently is worse than carrying a branch that never ran. Putting
    // `default` last is the TS→GD direction's problem, and it does it.
    expect(result.diagnostics).toEqual([]);
    expect(result.code).toContain('default:');
    expect(result.code).toContain('print("other")');
    expect(result.code).toContain('case 1:');
    expect(result.code).toContain('print("one")');

    // Source order, not normalised order.
    expect(result.code.indexOf('default:')).toBeLessThan(
      result.code.indexOf('case 1:'),
    );
  });

  it('keeps every branch when `_` is already last', () => {
    const result = convertGdToTs({
      source: [
        'extends Node',
        '',
        'func f(x):',
        '\tmatch x:',
        '\t\t1:',
        '\t\t\tprint("one")',
        '\t\t_:',
        '\t\t\tprint("other")',
        '',
      ].join('\n'),
      filePath: join(FIXTURES_DIR, 'wildcard-last.gd'),
      registry,
      projectSources,
    });

    expect(result.diagnostics.filter((d) => d.severity === 'warning')).toEqual(
      [],
    );
    expect(result.code).toContain('case 1:');
    expect(result.code).toContain('default:');
  });
});

// The other direction has `fixtures-godot-validate.test.ts`, which
// feeds every emitted `.gd` to a real Godot import. Nothing did the
// same for the TypeScript this converter emits, even though a branch
// body can now be nothing but a comment or an `ERROR` marker — shapes
// where a stray brace would go unnoticed by a string comparison.
describe('GD to TS: emitted TypeScript parses', () => {
  it('produces syntactically valid TS for every fixture', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tstogd-parse-'));
    try {
      const written: string[] = [];
      for (const gdFile of allGdFiles) {
        const gdPath = join(FIXTURES_DIR, gdFile);
        const result = convertGdToTs({
          source: readFileSync(gdPath, 'utf-8'),
          filePath: gdPath,
          registry,
          projectSources,
        });
        const outPath = join(dir, basename(gdFile, '.gd') + '.ts');
        writeFileSync(outPath, result.code);
        written.push(outPath);
      }

      // One program over every file: parsing is what is under test, so
      // type resolution (and the cost of it) is beside the point.
      const program = ts.createProgram(written, {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.Node16,
        moduleResolution: ts.ModuleResolutionKind.Node16,
        noResolve: true,
        noEmit: true,
      });

      const failures: string[] = [];
      for (const file of written) {
        const sf = program.getSourceFile(file);
        if (!sf) {
          failures.push(`${basename(file)}: not in program`);
          continue;
        }
        for (const d of program.getSyntacticDiagnostics(sf)) {
          const { line } = sf.getLineAndCharacterOfPosition(d.start ?? 0);
          failures.push(
            `${basename(file)}:${line + 1} ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`,
          );
        }
      }
      expect(failures).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('GD to TS: globals TypeScript cannot spell', () => {
  function convert(source: string) {
    return convertGdToTs({
      source,
      filePath: join(FIXTURES_DIR, 'unspellable-global.gd'),
      registry,
    });
  }

  it('routes a call through the `gd` namespace', () => {
    const result = convert(
      ['extends Node', '', 'func f(v):', '    return typeof(v)', ''].join('\n'),
    );
    expect(result.code).toContain('gd.typeof(v)');
    expect(result.diagnostics.filter((d) => d.severity === 'error')).toEqual(
      [],
    );
  });

  it('lets a local of the same name shadow the global', () => {
    const result = convert(
      [
        'extends Node',
        '',
        'func f():',
        '    var typeof = func(x): return x',
        '    return typeof.call(1)',
        '',
      ].join('\n'),
    );
    // A local binding is escaped, not rewritten to `gd.` — it is the
    // user's variable, not Godot's global.
    expect(result.code).toContain('typeof_');
    expect(result.code).not.toContain('gd.typeof');
  });

  it('lets a class member of the same name shadow the global', () => {
    const result = convert(
      [
        'extends Node',
        '',
        'func typeof(v):',
        '    return 1',
        '',
        'func g(v):',
        '    return typeof(v)',
        '',
      ].join('\n'),
    );
    expect(result.code).toContain('this.typeof(v)');
    expect(result.code).not.toContain('gd.typeof');
  });

  it('reports the global used as a value instead of emitting a broken name', () => {
    // GDScript accepts `typeof` as a Callable value, but TypeScript has
    // no name for it: the bare word is a syntax error and `gd.typeof`
    // converts back to a property read, not the callable. Neither is
    // emittable, so the construct is reported.
    const result = convert(
      [
        'extends Node',
        '',
        'func f():',
        '    var c: Callable = typeof',
        '    return c.call(1)',
        '',
      ].join('\n'),
    );
    const errors = result.diagnostics.filter((d) => d.severity === 'error');
    expect(errors.map((d) => d.message).join('\n')).toContain(
      'used as a value here',
    );
  });
});
