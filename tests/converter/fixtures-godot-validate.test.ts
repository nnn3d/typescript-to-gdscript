import { describe, it, expect, afterAll } from 'vitest';
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { validateGdFiles } from '../../src/godot-validate/index.ts';
import { resolveGodotPath } from '../../src/config/index.ts';

const execFileAsync = promisify(execFile);
const GODOT_PATH = resolveGodotPath();
const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, '..', 'fixtures', 'ts-to-gd');
const TMP_DIR = join(
  tmpdir(),
  `tstogd-fixture-gd-${randomBytes(4).toString('hex')}`,
);

/**
 * Feeds fixture `.gd` output to Godot itself.
 *
 * The sibling fixture test pins the *shape* of the generated GDScript
 * by string comparison, which can happily pin something Godot refuses
 * to parse — that is exactly how `self.X` inside `static func` shipped
 * (issue #4). This test closes that gap.
 *
 * Every fixture runs by default, so a new one gets Godot coverage
 * without anyone remembering to opt it in; SKIP below is the explicit,
 * reasoned exception list, and it is only for fixtures that CANNOT be
 * validated in isolation — never for output Godot rejects. Each fixture
 * gets its own project because 16 of them declare `class_name MyClass`,
 * and two scripts claiming one global class name is itself a parse
 * error.
 *
 * Godot stops at the first parse error in a file, so a fixture can hide
 * a second defect behind the one you just fixed — re-run after each fix
 * rather than assuming the file is clean.
 */
const SKIP = new Map<string, string>([
  // Not validatable in isolation — the fixture needs files a one-file
  // project doesn't have. Nothing wrong with the output.
  [
    'class-annotations-edge',
    'preloads a sibling .gd that does not exist in a one-file project',
  ],
  [
    'gd-eval-comments',
    'preloads a sibling .gd that does not exist in a one-file project',
  ],
]);

/**
 * Godot errors a fixture exists to produce, matched exhaustively in both
 * directions. Unlike SKIP, these fixtures ARE validated: each pins output
 * the converter passes through on purpose, because Godot reports it at
 * parse time and a converter rule would only duplicate that (AGENTS.md
 * rule 10) — so the test asserts Godot does report it, and nothing else.
 */
const EXPECTED_ERRORS = new Map<string, string[]>([
  [
    'super-engine-base',
    ['Cannot call the parent class\' virtual function "_init()"'],
  ],
]);

/**
 * Sibling fixtures a fixture's output refers to — by `class_name` or by
 * `res://` path — copied into its project, so it is checked against the
 * script it extends rather than skipped for not having one.
 */
const SIBLINGS = new Map<string, string[]>([
  ['extends-path', ['super-script-parent']],
  ['super-script-child', ['super-script-parent']],
  ['super-preload-child', ['super-script-parent']],
  ['super-global-child', ['super-script-parent']],
]);

const FIXTURES = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.gd'))
  .map((f) => f.slice(0, -'.gd'.length))
  .sort();

afterAll(() => {
  rmSync(TMP_DIR, { recursive: true, force: true });
});

/**
 * A fresh single-file Godot project, imported so the engine registers
 * the script's own `class_name` — without the import pass a script
 * referencing itself by name fails with `Identifier not found`.
 */
async function setupProject(fixtureName: string): Promise<string> {
  const projectDir = join(TMP_DIR, fixtureName);
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(
    join(projectDir, 'project.godot'),
    [
      '; Engine configuration file.',
      'config_version=5',
      '',
      '[application]',
      'config/name="Fixture"',
    ].join('\n'),
  );
  for (const name of [fixtureName, ...(SIBLINGS.get(fixtureName) ?? [])]) {
    copyFileSync(
      join(FIXTURES_DIR, `${name}.gd`),
      join(projectDir, `${name}.gd`),
    );
  }
  try {
    await execFileAsync(
      GODOT_PATH,
      ['--headless', '--path', projectDir, '--import'],
      { timeout: 60000 },
    );
  } catch (err) {
    // The raw `spawn godot ENOENT` hides the one thing the reader
    // needs. These tests fail loudly rather than skip when Godot is
    // missing (see AGENTS.md), so the message has to say what to do.
    const cause = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Godot import failed for fixture '${fixtureName}' using ` +
        `"${GODOT_PATH}". Set --godot-path, godotPath in tstogd.json, or ` +
        `the GODOT_PATH env variable.\n${cause}`,
    );
  }
  return projectDir;
}

describe.concurrent('TS to GD: fixture output parses in Godot', () => {
  for (const fixtureName of FIXTURES) {
    const skipReason = SKIP.get(fixtureName);
    if (skipReason !== undefined) {
      it.skip(`Godot accepts: ${fixtureName} (${skipReason})`, () => {});
      continue;
    }

    it(`Godot accepts: ${fixtureName}`, async () => {
      const projectDir = await setupProject(fixtureName);
      const result = await validateGdFiles({
        gdFiles: [join(projectDir, `${fixtureName}.gd`)],
        projectRoot: projectDir,
        godotPath: GODOT_PATH,
      });

      expect(result.godotAvailable).toBe(true);
      const errors = result.diagnostics.map((d) => `${d.line}: ${d.message}`);
      const missing: string[] = [];
      for (const expected of EXPECTED_ERRORS.get(fixtureName) ?? []) {
        const i = errors.findIndex((e) => e.includes(expected));
        if (i === -1) missing.push(expected);
        else errors.splice(i, 1);
      }
      // Name the fixture INSIDE the compared value, not just in the
      // test title: vitest collapses failure blocks whose rendered
      // error is identical and prints only one of them, which
      // silently attributes another fixture's error to this one.
      expect({ fixture: fixtureName, errors, missing }).toEqual({
        fixture: fixtureName,
        errors: [],
        missing: [],
      });
    }, 90000);
  }
});
