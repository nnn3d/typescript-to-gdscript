/**
 * Fixture harness for addon declarations: `tests/fixtures/addon-declarations`
 * holds `<name>.gd` beside the `<name>.d.ts` the full addon pipeline should
 * emit for it.
 *
 * Every fixture goes into one throwaway project and the pipeline runs once,
 * so fixtures can reference each other (by `class_name` or `preload`) the
 * way addons in a real project do, and the file stays well inside vitest's
 * worker RPC timeout.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, readdirSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { generateAddonTypings } from '../../src/typings/addons.js';
import type { TransformDiagnostic } from '../../src/converter/common/index.js';
import { makeProject } from './addon-test-project.js';
import { normalizeFixtureText } from '../helpers/fixture-text.ts';

const FIXTURES_DIR = join(__dirname, '..', 'fixtures', 'addon-declarations');
/** Where the fixtures land inside the project; `res://` paths in them assume it. */
const ADDON_DIR = 'addons/Fixtures';

const fixtureNames = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.gd'))
  .map((f) => f.replace(/\.gd$/, ''));

let rootDir = '';
let outputDir = '';
let diagnostics: TransformDiagnostic[] = [];

beforeAll(() => {
  const sources: Record<string, string> = {};
  for (const name of fixtureNames) {
    sources[`${ADDON_DIR}/${name}.gd`] = readFileSync(join(FIXTURES_DIR, `${name}.gd`), 'utf-8');
  }
  const project = makeProject(sources);
  rootDir = project.rootDir;
  outputDir = project.outputDir;
  diagnostics = generateAddonTypings(project).diagnostics;
  // The whole pipeline runs here, several TypeScript programs over every
  // fixture. Under full-suite load that outlasts vitest's 10 s default for
  // hooks, which fails the file with every test skipped.
}, 120_000);

afterAll(() => {
  if (rootDir) rmSync(rootDir, { recursive: true, force: true });
});

describe('Addon declarations: fixture-based tests', () => {
  it('produces no diagnostics for the fixture set', () => {
    expect(diagnostics).toEqual([]);
  });

  for (const name of fixtureNames) {
    it(`emits the expected declaration for: ${name}`, () => {
      const expectedPath = join(FIXTURES_DIR, `${name}.d.ts`);
      expect(existsSync(expectedPath), `missing expected output ${name}.d.ts`).toBe(true);

      const actual = readFileSync(join(outputDir, ADDON_DIR, `${name}.d.ts`), 'utf-8');
      expect(normalizeFixtureText(actual)).toBe(normalizeFixtureText(readFileSync(expectedPath, 'utf-8')));
    });
  }
});
