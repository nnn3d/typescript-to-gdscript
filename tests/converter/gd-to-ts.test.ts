import { describe, it, expect } from 'vitest';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.js';
import { GodotClassRegistry } from '../../src/typings/godot-registry.js';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

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

/**
 * Normalize code for comparison:
 * - Trim trailing whitespace per line
 * - Remove trailing empty lines
 * - Normalize line endings
 */
function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '')
    .trim();
}

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

      const normalizedActual = normalize(result.code);
      const normalizedExpected = normalize(expectedTs);

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
      ['_on_area_entered', {
        params: [{ name: 'area', gdType: 'Area2D' }],
      }],
      ['_on_body_shape_entered', {
        params: [
          { name: 'body_rid', gdType: 'RID' },
          { name: 'body', gdType: 'Node2D' },
          { name: 'body_shape_index', gdType: 'int' },
          { name: 'local_shape_index', gdType: 'int' },
        ],
      }],
      ['_on_timer_timeout', {
        params: [],
      }],
    ]);

    const result = convertGdToTs({
      source: gdSource,
      filePath: gdFilePath,
      registry,
      projectSources,
      signalHandlers,
    });

    const normalizedActual = normalize(result.code);
    const normalizedExpected = normalize(expectedTs);

    const actualLines = normalizedActual.split('\n');
    const expectedLines = normalizedExpected.split('\n');

    for (
      let i = 0;
      i < Math.max(actualLines.length, expectedLines.length);
      i++
    ) {
      const actual = actualLines[i] ?? '(missing)';
      const expected = expectedLines[i] ?? '(missing)';
      expect(actual, `Line ${i + 1} mismatch:\n  Expected: ${JSON.stringify(expected)}\n  Actual:   ${JSON.stringify(actual)}`).toBe(expected);
    }
    expect(actualLines.length).toBe(expectedLines.length);
  });
});

// Shared helper: create a temp dir with tsconfig referencing Godot typings
async function makeTsHelperTmp(
  label: string,
): Promise<{
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
    const { runTsHelpers } = await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } = await makeTsHelperTmp('operator-fix');
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
      expect(fixed).toContain('this.position = gd.ops.add(this.position, Vector2(1, 1))');
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
    const { runTsHelpers } = await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { resolveRegistry } = await import('../../src/config/index.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } = await makeTsHelperTmp('explicit-convert');
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
      expect(fixed).toContain('const points: PackedVector2Array = gd.as([], PackedVector2Array)');
      expect(fixed).toContain('body.points = gd.as([], PackedVector2Array)');
      expect(fixed).not.toContain('gd.as(body.points, PackedVector2Array) =');
      // Return statement: wraps the expression, not the `return` keyword
      expect(fixed).toContain('return gd.as(this.get_viewport_rect().size, Vector2i)');
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
    const { runTsHelpers } = await import('../../src/converter/gd-to-ts/ts-helpers.js');
    const { readFileSync: readFile } = await import('fs');

    const { tmpDir, cleanup, writeFile } = await makeTsHelperTmp('extends-type');
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

