/**
 * GD→TS auto-import tests — mirrors the CLI's convert + inject
 * pipeline (`initial-convert-gd-to-ts` writes each `.gd` to disk as `.ts`, then
 * runs `injectMissingImportsForProject` to prepend the imports the
 * TS program reports as missing).
 *
 * Each test sets up a small in-memory project under `os.tmpdir()`,
 * runs the pipeline, and asserts on the resulting `.ts` content.
 *
 * The temp-project layout deliberately keeps `.gd` and `.ts` in
 * separate sibling subdirs (`gd/`, `ts/`) so the import-specifier
 * math has to consult the gd→ts mapping in `injectMissingImports`.
 * Earlier versions silently produced `../gd/foo` specifiers when
 * gdDir != tsDir; the divergent layout locks the fix in.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.ts';
import { injectMissingImportsForProject } from '../../src/converter/gd-to-ts/inject-imports.ts';
import { resolveRegistry } from '../../src/config/index.ts';

interface SourceSpec {
  /** Path relative to the project's `gd/` root (e.g. `'lib/helper.gd'`). */
  relPath: string;
  source: string;
}

interface PipelineResult {
  /** Read the generated `.ts` for the given `.gd` rel-path. */
  read(relPath: string): string;
}

const registry = resolveRegistry();

let projectDir: string;
let gdRoot: string;
let tsRoot: string;

beforeEach(() => {
  projectDir = join(
    tmpdir(),
    `tstogd-gdtots-imports-${randomBytes(4).toString('hex')}`,
  );
  gdRoot = join(projectDir, 'gd');
  tsRoot = join(projectDir, 'ts');
  mkdirSync(gdRoot, { recursive: true });
  mkdirSync(tsRoot, { recursive: true });
});

afterEach(() => {
  try { rmSync(projectDir, { recursive: true, force: true }); } catch { /* ignore */ }
});

/**
 * Convert + inject pipeline. Writes every `SourceSpec` into the
 * project's `gd/` tree, converts each one to a sibling `.ts` under
 * `ts/`, then runs the import-injection pass. `flag` drives the
 * `generateGlobalClassTypes` knob (default `false` = inject imports).
 */
function runPipeline(specs: SourceSpec[], flag = false): PipelineResult {
  const projectSources = specs.map((s) => {
    const filePath = resolve(gdRoot, s.relPath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, s.source);
    return { filePath, source: s.source };
  });
  const convertedFiles: Array<{ tsPath: string; gdPath: string }> = [];
  const tsByRel = new Map<string, string>();
  for (const { source, filePath } of projectSources) {
    const result = convertGdToTs({ source, filePath, registry, projectSources });
    const relGd = filePath.slice(gdRoot.length + 1).replace(/\\/g, '/');
    const tsPath = join(tsRoot, relGd.replace(/\.gd$/, '.ts'));
    mkdirSync(dirname(tsPath), { recursive: true });
    writeFileSync(tsPath, result.code);
    convertedFiles.push({ tsPath, gdPath: filePath });
    tsByRel.set(relGd, tsPath);
  }
  injectMissingImportsForProject(convertedFiles, projectSources, registry, {
    generateGlobalClassTypes: flag,
  });
  return { read: (relPath) => readFileSync(tsByRel.get(relPath)!, 'utf-8') };
}

describe('GD→TS auto-imports (convert + inject pipeline)', () => {
  it('emits an import line for a class referenced via `extends`', () => {
    const r = runPipeline([
      { relPath: 'base.gd', source: 'class_name Base\nextends Node\n' },
      { relPath: 'derived.gd', source: 'class_name Derived\nextends Base\n' },
    ]);
    expect(r.read('derived.gd')).toMatch(
      /^import \{ Base \} from "\.\/base";\n\nexport class Derived extends Base/,
    );
  });

  it('emits ONE import line per class even when referenced multiple times', () => {
    const r = runPipeline([
      {
        relPath: 'player.gd',
        source: 'class_name Player\nextends Node\nconst MAX = 100\n',
      },
      {
        relPath: 'use.gd',
        source:
          'class_name Use\nextends Node\n\nvar p1: Player\nvar p2: Player\n\nfunc get_max() -> int:\n\treturn Player.MAX\n',
      },
    ]);
    const importLines = r
      .read('use.gd')
      .split('\n')
      .filter((l) => l.startsWith('import { Player'));
    expect(importLines).toHaveLength(1);
    expect(importLines[0]).toBe('import { Player } from "./player";');
  });

  it("does NOT import the file's own class", () => {
    const r = runPipeline([
      {
        relPath: 'self.gd',
        source:
          'class_name SelfClass\nextends Node\nconst KIND = "x"\n\nstatic func make() -> SelfClass:\n\treturn SelfClass.new()\n',
      },
    ]);
    expect(r.read('self.gd')).not.toContain('import { SelfClass }');
  });

  it('uses a relative specifier across subdirectories', () => {
    const r = runPipeline([
      {
        relPath: 'lib/tools/helper.gd',
        source: 'class_name Helper\nextends Node\n',
      },
      {
        relPath: 'game/player.gd',
        source: 'class_name Player\nextends Node\n\nvar h: Helper\n',
      },
    ]);
    expect(r.read('game/player.gd')).toContain(
      'import { Helper } from "../lib/tools/helper";',
    );
  });

  it('skips imports for classes that are not actually referenced', () => {
    const r = runPipeline([
      { relPath: 'unused.gd', source: 'class_name Unused\nextends Node\n' },
      { relPath: 'main.gd', source: 'class_name Main\nextends Node\n' },
    ]);
    expect(r.read('main.gd')).not.toContain('import { Unused }');
  });

  it('imports MULTIPLE distinct classes (one line each, alphabetical)', () => {
    const r = runPipeline([
      { relPath: 'apple.gd', source: 'class_name Apple\nextends Node\n' },
      { relPath: 'banana.gd', source: 'class_name Banana\nextends Node\n' },
      {
        relPath: 'main.gd',
        source: 'class_name Main\nextends Node\n\nvar a: Apple\nvar b: Banana\n',
      },
    ]);
    const lines = r.read('main.gd').split('\n');
    const apple = lines.findIndex((l) => l.includes('import { Apple'));
    const banana = lines.findIndex((l) => l.includes('import { Banana'));
    expect(apple).toBeGreaterThanOrEqual(0);
    expect(banana).toBeGreaterThanOrEqual(0);
    // Alphabetical — matches `injectMissingImports`'s `localeCompare`.
    expect(apple).toBeLessThan(banana);
  });

  it('does NOT false-positive on class names appearing only in comments / strings', () => {
    // The TS-program-based scan reports 2304/2503 for actual identifier
    // references, not for tokens inside comments or string literals.
    const r = runPipeline([
      { relPath: 'ghost.gd', source: 'class_name Ghost\nextends Node\n' },
      {
        relPath: 'main.gd',
        source: [
          'class_name Main',
          'extends Node',
          '',
          '# This comment mentions Ghost but does not actually use the class.',
          'var label: String = "Ghost lives in the haunted house"',
          '',
        ].join('\n'),
      },
    ]);
    expect(r.read('main.gd')).not.toContain('import { Ghost }');
  });
});

describe('GD→TS auto-imports (legacy / addon layout)', () => {
  it('emits no import lines when generateGlobalClassTypes is true', () => {
    const r = runPipeline(
      [
        { relPath: 'base.gd', source: 'class_name Base\nextends Node\n' },
        { relPath: 'derived.gd', source: 'class_name Derived\nextends Base\n' },
      ],
      true,
    );
    const code = r.read('derived.gd');
    expect(code).not.toMatch(/^import /m);
    // Sanity — `extends Base` still emitted; the legacy layout relies
    // on `declare global { class Base … }` from the typings layer.
    expect(code).toContain('extends Base');
  });
});
