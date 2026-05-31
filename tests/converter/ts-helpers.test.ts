import { describe, it, expect } from 'vitest';
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  rmSync,
  mkdirSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

import { runTsHelpers } from '../../src/converter/gd-to-ts/ts-helpers.js';
import { resolveRegistry } from '../../src/config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_ROOT = join(__dirname, '..', 'fixtures', 'ts-helpers');
const TYPINGS_DIR = join(__dirname, '..', '..', 'typings');

/**
 * Fixture-based test suite for the TS-helper post-processing pipeline.
 *
 * Lay out pairs under `tests/fixtures/ts-helpers/<mode>/`:
 *   - `<name>.in.ts`  — input TS, written to a scratch tmp file and run
 *                      through `runTsHelpers` once
 *   - `<name>.out.ts` — expected output after all helpers have applied
 *
 * `<mode>` is one of:
 *   - `default` — `runTsHelpers({ registry })` (user mode)
 *   - `addon`   — `runTsHelpers({ registry, addonMode: true })`
 *
 * Grouping related cases into one fixture is encouraged — it's easier to
 * inspect the whole behaviour at a glance than jumping between a dozen
 * tiny files. Each fixture compares the full post-helper text to the
 * expected output line-by-line for clearer diffs on failure.
 */

type Mode = 'default' | 'addon';

interface HelperOptions {
  addonMode?: boolean;
}

const MODE_OPTIONS: Record<Mode, HelperOptions> = {
  default: {},
  addon: { addonMode: true },
};

function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '');
}

function makeScratchDir(label: string) {
  const dir = join(
    tmpdir(),
    `tstogd-ts-helpers-${label}-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, 'tsconfig.json'),
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
      include: [TYPINGS_DIR, './*.ts'],
    }),
  );
  return dir;
}

function discoverFixtures(mode: Mode): string[] {
  const modeDir = join(FIXTURES_ROOT, mode);
  const entries = readdirSync(modeDir);
  const bases = new Set<string>();
  for (const e of entries) {
    if (!e.endsWith('.in.ts')) continue;
    bases.add(e.slice(0, -'.in.ts'.length));
  }
  const paired: string[] = [];
  for (const b of bases) {
    if (!entries.includes(`${b}.out.ts`)) {
      // Hard fail rather than silently skip — a missing `.out.ts` is almost
      // always a typo, and a silently-skipped fixture means a test author
      // thinks they have coverage they don't.
      throw new Error(
        `ts-helpers fixture ${mode}/${b}.in.ts has no matching ${b}.out.ts`,
      );
    }
    paired.push(b);
  }
  return paired.sort();
}

function runFixture(mode: Mode, name: string): void {
  const modeDir = join(FIXTURES_ROOT, mode);
  const inputText = readFileSync(join(modeDir, `${name}.in.ts`), 'utf-8');
  const expectedText = readFileSync(join(modeDir, `${name}.out.ts`), 'utf-8');

  const tmpDir = makeScratchDir(`${mode}-${name}`);
  try {
    const scratchPath = join(tmpDir, `${name}.ts`);
    writeFileSync(scratchPath, inputText);

    runTsHelpers({
      files: [scratchPath],
      rootDir: tmpDir,
      tsConfigPath: join(tmpDir, 'tsconfig.json'),
      registry: resolveRegistry(),
      ...MODE_OPTIONS[mode],
    });

    const actual = normalize(readFileSync(scratchPath, 'utf-8'));
    const expected = normalize(expectedText);

    if (actual === expected) return;

    const actualLines = actual.split('\n');
    const expectedLines = expected.split('\n');
    for (
      let i = 0;
      i < Math.max(actualLines.length, expectedLines.length);
      i++
    ) {
      const a = actualLines[i] ?? '<missing>';
      const e = expectedLines[i] ?? '<missing>';
      if (a !== e) {
        const start = Math.max(0, i - 2);
        const end = Math.min(
          Math.max(actualLines.length, expectedLines.length),
          i + 10,
        );
        const render = (lines: string[]) =>
          lines
            .slice(start, end)
            .map(
              (l, j) =>
                `  ${j + start === i ? '>' : ' '} ${j + start + 1}| ${l}`,
            )
            .join('\n');
        expect.fail(
          `Line ${i + 1} mismatch in ${mode}/${name}:\n` +
            `  Expected: ${JSON.stringify(e)}\n` +
            `  Actual:   ${JSON.stringify(a)}\n\n` +
            `  Expected context:\n${render(expectedLines)}\n\n` +
            `  Actual context:\n${render(actualLines)}`,
        );
      }
    }
    expect(actualLines.length).toBe(expectedLines.length);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

describe.each(['default', 'addon'] as const)(
  `TS helpers: %s mode fixtures`,
  (mode) => {
    for (const name of discoverFixtures(mode)) {
      it(`runs helpers on ${name}`, () => runFixture(mode, name));
    }
  },
);
