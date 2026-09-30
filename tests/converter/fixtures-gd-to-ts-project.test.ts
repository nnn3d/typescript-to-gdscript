/**
 * GD → TS output must type-check.
 *
 * The fixture runner in `gd-to-ts.test.ts` pins the EMITTER's text, and
 * never type-checks it. What a user gets is more than that: the whole
 * `initial-convert-gd-to-ts` pipeline — convert, add the missing
 * imports, generate the script and scene typings, then the TS helper
 * post-pass that fixes operator and variant errors. So this runs the
 * real CLI over every fixture as one Godot project and type-checks what
 * comes out.
 *
 * Non-strict on purpose. This is migration output a human finishes: a
 * GD parameter with no type legitimately comes out untyped, and a field
 * without an initializer legitimately has none. What must not happen is
 * a conversion TypeScript cannot make sense of at all — the
 * `constructor(...)` without `super()` that TS rejected on every
 * converted class, or a base class left without its import.
 * `strictBindCallApply` stays on, as docs/reference/configuration.md asks of a
 * non-strict project: without it the typings' Godot `call` / `bind` on
 * a lambda turn untyped, and `lam.call(x)` returns `unknown`.
 *
 * The fixture sources are real GDScript for the same reason: output can
 * only be judged against valid input. The second test holds them to it
 * — Godot itself checks every source. Scripts whose node paths type only
 * through a scene (`$Label` is a `Node` until a scene says `Label`) have
 * a minimal `.tscn` next to them, which the pipeline turns into scene
 * typings exactly as it would in a project.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execFile } from 'child_process';
import {
  copyFileSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { basename, join, resolve } from 'path';
import { tmpdir } from 'os';
import { collectTsDiagnostics } from '../../src/checker/ts-diagnostics.js';
import { createTsProgram } from '../../src/parser/typescript/index.js';
import { validateGdFiles } from '../../src/godot-validate/index.js';
import { resolveGodotPath } from '../../src/config/index.js';

const REPO = resolve(__dirname, '../..');
const FIXTURES_DIR = join(REPO, 'tests', 'fixtures', 'gd-to-ts');
const TSX = join(REPO, 'node_modules', '.bin', 'tsx');
const CLI = join(REPO, 'src', 'cli', 'index.ts');

/**
 * Diagnostics a fixture exists to produce, matched exhaustively in both
 * directions: each entry must match a distinct diagnostic (by substring),
 * and nothing else may be left over.
 */
const EXPECTED: Record<string, string[]> = {
  // Pins that a name nothing resolves stays bare rather than gaining a
  // `this.` it has no right to — so the output names something that
  // does not exist, exactly as the GDScript did.
  'self2.ts': ["TS2304: Cannot find name 'get_joint_bone'"],
};

/** The same, for Godot's verdict on the fixture sources. */
const EXPECTED_GODOT: Record<string, string[]> = {
  // The GDScript half of the `self2` entry above.
  'self2.gd': ['Function "get_joint_bone()" not found'],
};

const PROJECT = mkdtempSync(join(tmpdir(), 'tstogd-gdtots-project-'));
const sources: string[] = [];

beforeAll(() => {
  for (const file of readdirSync(FIXTURES_DIR)) {
    if (!file.endsWith('.gd') && !file.endsWith('.tscn')) continue;
    copyFileSync(join(FIXTURES_DIR, file), join(PROJECT, file));
    if (file.endsWith('.gd')) sources.push(join(PROJECT, file));
  }
  writeFileSync(
    join(PROJECT, 'project.godot'),
    'config_version=5\n\n[application]\nconfig/name="fixtures"\n',
  );
});

afterAll(() => {
  rmSync(PROJECT, { recursive: true, force: true });
});

/**
 * Take each expected message out of `found` (by file and substring), then
 * require that nothing is left — a fixture's deliberate error must still
 * happen, and nothing else may.
 */
function expectExactly(
  found: { file: string; text: string }[],
  expected: Record<string, string[]>,
  label: string,
): void {
  const unmatched = [...found];
  for (const [file, messages] of Object.entries(expected)) {
    for (const message of messages) {
      const i = unmatched.findIndex(
        (d) => d.file === file && d.text.includes(message),
      );
      expect(i, `expected in ${file}: ${message}`).toBeGreaterThan(-1);
      unmatched.splice(i, 1);
    }
  }
  expect(unmatched.map((d) => `  ${d.file} ${d.text}`).join('\n'), label).toBe(
    '',
  );
}

function runCli(args: string[]): Promise<{ code: number; output: string }> {
  return new Promise((res) => {
    execFile(
      TSX,
      [CLI, ...args],
      { cwd: REPO, timeout: 150_000, shell: process.platform === 'win32' },
      (err, stdout, stderr) =>
        res({
          code: err ? ((err as { code?: number }).code ?? 1) : 0,
          output: `${stdout ?? ''}${stderr ?? ''}`,
        }),
    );
  });
}

describe('GD → TS: the converted fixture project type-checks', () => {
  it('has no TypeScript diagnostics beyond the expected ones', async () => {
    // The pipeline picks this up from the root, as it would a project's
    // own — its TS helpers type-check with it too.
    writeFileSync(
      join(PROJECT, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'esnext',
          module: 'esnext',
          moduleResolution: 'classic',
          allowImportingTsExtensions: true,
          noLib: true,
          strict: false,
          strictBindCallApply: true,
          noEmit: true,
          skipLibCheck: true,
          types: [],
        },
        include: [join(REPO, 'typings'), './**/*.ts'],
      }),
    );

    const run = await runCli([
      'initial-convert-gd-to-ts',
      ...sources,
      '--gd-dir',
      PROJECT,
      '--ts-dir',
      join(PROJECT, 'ts'),
      '--root-dir',
      PROJECT,
    ]);
    expect(run.code, run.output).toBe(0);

    const program = createTsProgram({
      rootDir: PROJECT,
      files: [],
      tsConfigPath: join(PROJECT, 'tsconfig.json'),
    });
    const found = collectTsDiagnostics(program, join(PROJECT, 'ts')).map(
      (d) => ({
        file: basename(d.file),
        text: `${d.line}:${d.column} ${d.message}`,
      }),
    );
    expectExactly(
      found,
      EXPECTED,
      'TypeScript diagnostics in the converted project',
    );
  }, 180_000);

  it('converts sources Godot accepts', async () => {
    const godotPath = resolveGodotPath();
    // Without the import pass Godot knows no `class_name`, and every
    // script that names another one fails.
    await new Promise<void>((res, rej) =>
      execFile(
        godotPath,
        ['--headless', '--path', PROJECT, '--import'],
        { timeout: 120_000 },
        (err) => (err ? rej(err) : res()),
      ),
    );
    const result = await validateGdFiles({
      gdFiles: sources,
      projectRoot: PROJECT,
      godotPath,
    });
    expect(result.godotAvailable).toBe(true);
    const found = result.diagnostics.map((d) => ({
      file: basename(d.file),
      text: `${d.line}: ${d.message}`,
    }));
    expectExactly(found, EXPECTED_GODOT, 'Godot errors in the fixture sources');
  }, 180_000);
});
