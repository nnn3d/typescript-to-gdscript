/**
 * TS→GD import-processing tests.
 *
 * Each test sets up a small in-memory project (a temp dir under
 * `os.tmpdir()`), populates it with the source files the scenario
 * needs, builds a TS program over them, and runs `convertTsToGd`
 * against a designated entry. The TS program is necessary so the
 * type checker can resolve cross-file imports the same way a real
 * project run would.
 *
 * `globals.d.ts` provides minimal stubs (`Node`, `int`, `gd`) so the
 * checker doesn't error on the bare `extends Node` references that
 * appear in nearly every fixture.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  mkdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'fs';
import { dirname, join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import type { ConvertOptions } from '../../src/converter/ts-to-gd/index.ts';
import { createTsProgram } from '../../src/parser/typescript/index.ts';

interface Project {
  dir: string;
  /** Write a TS source file relative to the project root. */
  write(relPath: string, content: string): string;
  /** Convert the entry file with all written `.ts` files in scope. */
  convert(
    entryRel: string,
    options?: Partial<ConvertOptions>,
  ): ReturnType<typeof convertTsToGd>;
}

const GLOBALS_STUB =
  'declare const gd: any;\ndeclare type int = number;\ndeclare class Node {}\n';

let project: Project;

beforeEach(() => {
  const dir = join(
    tmpdir(),
    `tstogd-tstogd-imports-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  // Every scenario relies on `Node` / `int` / `gd` being declared.
  writeFileSync(join(dir, 'globals.d.ts'), GLOBALS_STUB);
  const written: string[] = [join(dir, 'globals.d.ts')];

  project = {
    dir,
    write(relPath, content) {
      const abs = resolve(dir, relPath);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, content);
      if (relPath.endsWith('.ts')) written.push(abs);
      return abs;
    },
    convert(entryRel, options = {}) {
      const program = createTsProgram({ rootDir: dir, files: written });
      return convertTsToGd({
        filePath: resolve(dir, entryRel),
        rootDir: dir,
        tsDir: dir,
        gdDir: dir,
        projectRoot: dir,
        program,
        ...options,
      });
    },
  };
});

afterEach(() => {
  try {
    rmSync(project.dir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

function normalize(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n+$/, '')
    .trim();
}

describe('TS→GD imports — happy path', () => {
  it('skips non-anonymous + non-renamed imports (already global in GD)', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import { Foo } from './foo.ts';\nexport class Main extends Node {\n  fooRef: Foo | null = null;\n}\n",
    );
    const result = project.convert('main.ts');
    expect(normalize(result.code)).toBe(
      normalize('extends Node\nclass_name Main\n\nvar fooRef: Foo = null\n'),
    );
  });

  it('emits const + preload for renamed non-anonymous imports', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import { Foo as Alias } from './foo.ts';\nexport class Main extends Node {\n  ref: Alias | null = null;\n}\n",
    );
    const result = project.convert('main.ts');
    expect(normalize(result.code)).toBe(
      normalize(
        'extends Node\nclass_name Main\n\nconst Alias = preload("res://foo.gd")\n\nvar ref: Alias = null\n',
      ),
    );
  });

  it('emits const + preload for anonymous-class imports (with or without rename)', () => {
    project.write('anonym.ts', 'export class _Anonym extends Node {}\n');
    project.write(
      'main.ts',
      [
        "import { _Anonym } from './anonym.ts';",
        "import { _Anonym as Renamed } from './anonym.ts';",
        'export class Main extends Node {',
        '  a: _Anonym | null = null;',
        '  b: Renamed | null = null;',
        '}',
        '',
      ].join('\n'),
    );
    const result = project.convert('main.ts');
    expect(normalize(result.code)).toBe(
      normalize(
        [
          'extends Node',
          'class_name Main',
          '',
          'const _Anonym = preload("res://anonym.gd")',
          'const Renamed = preload("res://anonym.gd")',
          '',
          'var a: _Anonym = null',
          'var b: Renamed = null',
        ].join('\n'),
      ),
    );
  });

  it('rewrites `extends` of an anonymous import to `extends "res://…"`', () => {
    project.write('base.ts', 'export class _Base extends Node {}\n');
    project.write(
      'derived.ts',
      "import { _Base } from './base.ts';\nexport class Derived extends _Base {}\n",
    );
    const result = project.convert('derived.ts');
    expect(normalize(result.code)).toBe(
      normalize(
        'extends "res://base.gd"\nclass_name Derived\n\nconst _Base = preload("res://base.gd")\n',
      ),
    );
  });

  it('emits relative preload paths inside a library', () => {
    project.write('shared/foo.ts', 'export class _Foo extends Node {}\n');
    project.write(
      'shared/nested/main.ts',
      "import { _Foo } from '../foo.ts';\nexport class Main extends Node {}\n",
    );
    const result = project.convert('shared/nested/main.ts', {
      tsDir: resolve(project.dir, 'shared'),
      gdDir: resolve(project.dir, 'dist/godot'),
      lib: true,
    });
    expect(result.code).toContain('const _Foo = preload("../foo.gd")');
  });

  it('maps linked package imports through the package tsDir and gdDir', () => {
    const packageRoot = resolve(project.dir, 'shared-package');
    const packageSource = project.write(
      'shared-package/src/foo.ts',
      'export class _Foo extends Node {}\n',
    );
    const installedPackage = resolve(project.dir, 'app/shared-link');
    mkdirSync(dirname(installedPackage), { recursive: true });
    symlinkSync(
      packageRoot,
      installedPackage,
      process.platform === 'win32' ? 'junction' : 'dir',
    );
    project.write(
      'app/src/main.ts',
      "import { _Foo } from '../shared-link/src/foo.ts';\nexport class Main extends Node {}\n",
    );
    const realPackageRoot = realpathSync(packageRoot);

    const result = project.convert('app/src/main.ts', {
      tsDir: resolve(project.dir, 'app/src'),
      gdDir: resolve(project.dir, 'app/scripts'),
      projectRoot: resolve(project.dir, 'app'),
      externalPackages: [
        {
          rootDir: realPackageRoot,
          tsDir: resolve(realPackageRoot, 'src'),
          gdDir: resolve(realPackageRoot, 'dist/godot'),
          mountName: '@scope/shared',
        },
      ],
    });

    expect(packageSource).toBe(resolve(packageRoot, 'src/foo.ts'));
    expect(result.code, JSON.stringify(result.diagnostics)).toContain(
      'const _Foo = preload("res://tstogd_modules/@scope/shared/dist/godot/foo.gd")',
    );
  });

  it('does not resolve regular global class imports that need no preload', () => {
    project.write(
      'main.ts',
      "import { SharedClass } from '@scope/shared';\nexport class Main extends Node {}\n",
    );

    const result = project.convert('main.ts');

    expect(result.code).not.toContain('preload(');
    expect(
      result.diagnostics.find((diagnostic) => diagnostic.severity === 'error'),
    ).toBeUndefined();
  });

  it('silently drops whole-statement type-only imports', () => {
    project.write('foo.ts', 'export class _Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import type { _Foo } from './foo.ts';\nexport class Main extends Node {\n  ref: _Foo | null = null;\n}\n",
    );
    const result = project.convert('main.ts');
    expect(normalize(result.code)).toBe(
      normalize('extends Node\nclass_name Main\n\nvar ref: _Foo = null\n'),
    );
    expect(
      result.diagnostics.find((d) => d.severity === 'error'),
    ).toBeUndefined();
  });

  it('silently drops per-binding type-only specifiers', () => {
    project.write('foo.ts', 'export class _Foo extends Node {}\n');
    project.write('bar.ts', 'export class _Bar extends Node {}\n');
    project.write(
      'main.ts',
      [
        "import { type _Foo } from './foo.ts';",
        "import { _Bar } from './bar.ts';",
        'export class Main extends Node {',
        '  ref: _Foo | null = null;',
        '  bar: _Bar | null = null;',
        '}',
        '',
      ].join('\n'),
    );
    const result = project.convert('main.ts');
    expect(normalize(result.code)).toBe(
      normalize(
        [
          'extends Node',
          'class_name Main',
          '',
          'const _Bar = preload("res://bar.gd")',
          '',
          'var ref: _Foo = null',
          'var bar: _Bar = null',
        ].join('\n'),
      ),
    );
  });
});

describe('TS→GD imports — errors', () => {
  it('errors when an anonymous import cannot resolve to source', () => {
    project.write(
      'main.ts',
      "import { _Shared } from '@scope/shared';\nexport class Main extends Node {}\n",
    );

    const result = project.convert('main.ts');

    expect(
      result.diagnostics.find(
        (diagnostic) =>
          diagnostic.severity === 'error' &&
          diagnostic.message.includes('must resolve to a TypeScript source'),
      ),
    ).toBeDefined();
  });

  it('errors when a class field name collides with an imported local', () => {
    project.write('foo.ts', 'export class _Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import { _Foo } from './foo.ts';\nexport class Main extends Node {\n  _Foo: int = 0;\n}\n",
    );
    const result = project.convert('main.ts');
    const err = result.diagnostics.find(
      (d) =>
        d.severity === 'error' &&
        d.message.includes('conflicts with an imported class'),
    );
    expect(err, JSON.stringify(result.diagnostics)).toBeDefined();
    // Anchor at the offending field, not the import line.
    expect(err!.line).toBe(3);
  });

  it('errors on default imports', () => {
    project.write('foo.ts', 'export default class Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import Foo from './foo.ts';\nexport class Main extends Node {}\n",
    );
    const result = project.convert('main.ts');
    expect(
      result.diagnostics.find(
        (d) => d.severity === 'error' && d.message.includes('Default imports'),
      ),
    ).toBeDefined();
  });

  it('errors on namespace imports', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    project.write(
      'main.ts',
      "import * as Ns from './foo.ts';\nexport class Main extends Node {}\n",
    );
    const result = project.convert('main.ts');
    expect(
      result.diagnostics.find(
        (d) =>
          d.severity === 'error' && d.message.includes('Namespace imports'),
      ),
    ).toBeDefined();
  });
});
