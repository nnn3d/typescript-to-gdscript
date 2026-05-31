/**
 * Anonymous class naming convention — unit tests for the helpers in
 * `src/converter/common/index.ts` and the GD→TS / TS→GD round-trip
 * behavior they enable.
 *
 *   - `gdFilenameToAnonymousClassName('some_class.gd')` → `'_SomeClass'`
 *   - `class_name _Foo` in GD source              → `class G_Foo` in TS
 *   - `class G_Foo` in TS source                  → `class_name _Foo` in GD
 *   - `class _Foo` in TS source (anonymous)       → GD with NO `class_name`
 */

import { describe, it, expect } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import {
  gdFilenameToAnonymousClassName,
  isAnonymousClassName,
  escapeUnderscoreClassName,
} from '../../src/converter/common/index.ts';
import { convertTsToGd } from '../../src/converter/ts-to-gd/index.ts';
import { convertGdToTs } from '../../src/converter/gd-to-ts/index.ts';
import { resolveRegistry } from '../../src/config/index.ts';

describe('gdFilenameToAnonymousClassName', () => {
  it('converts snake_case basenames to UpperCamel', () => {
    expect(gdFilenameToAnonymousClassName('some_class.gd')).toBe('_SomeClass');
    expect(gdFilenameToAnonymousClassName('many_word_name.gd')).toBe(
      '_ManyWordName',
    );
  });

  it('preserves PascalCase basenames', () => {
    expect(gdFilenameToAnonymousClassName('Anonym.gd')).toBe('_Anonym');
    expect(gdFilenameToAnonymousClassName('MyHttpServer.gd')).toBe(
      '_MyHttpServer',
    );
  });

  it('strips path components, keeps the basename', () => {
    expect(gdFilenameToAnonymousClassName('nested/foo.gd')).toBe('_Foo');
    expect(gdFilenameToAnonymousClassName('a/b/c/some_file.gd')).toBe(
      '_SomeFile',
    );
    expect(
      gdFilenameToAnonymousClassName('C:\\\\Users\\\\nnn3d\\\\foo.gd'),
    ).toBe('_Foo');
  });

  it('falls back to "_Anonym" for nonsense input', () => {
    expect(gdFilenameToAnonymousClassName('___.gd')).toBe('_Anonym');
    expect(gdFilenameToAnonymousClassName('.gd')).toBe('_Anonym');
  });
});

describe('isAnonymousClassName', () => {
  it('treats single-underscore prefix as anonymous', () => {
    expect(isAnonymousClassName('_Foo')).toBe(true);
    expect(isAnonymousClassName('_Anonym')).toBe(true);
  });

  it('treats `G_` prefix (escape) as NON-anonymous', () => {
    expect(isAnonymousClassName('G_Foo')).toBe(false);
  });

  it('returns false for normal class names', () => {
    expect(isAnonymousClassName('Foo')).toBe(false);
    expect(isAnonymousClassName('MyClass')).toBe(false);
  });
});

describe('escapeUnderscoreClassName (one-way GD→TS fallback)', () => {
  it('prefixes `G_` for `_`-prefixed GD class names', () => {
    expect(escapeUnderscoreClassName('_Foo')).toBe('G_Foo');
  });

  it('passes through non-prefixed names unchanged', () => {
    expect(escapeUnderscoreClassName('Foo')).toBe('Foo');
  });
});

describe('GD→TS naming — emitter integration', () => {
  it('synthesizes `_FilenameClass` for a `.gd` with no `class_name`', () => {
    const registry = resolveRegistry();
    const result = convertGdToTs({
      source: 'extends Node\n\nfunc _ready():\n\tprint("hi")\n',
      filePath: '/whatever/some_class.gd',
      registry,
    });
    expect(result.code).toMatch(/^export class _SomeClass extends Node \{/);
  });

  it('escapes `class_name _Foo` to `G_Foo` in the TS output', () => {
    const registry = resolveRegistry();
    const result = convertGdToTs({
      source: 'class_name _Foo\nextends Node\n',
      filePath: '/whatever/foo.gd',
      registry,
    });
    expect(result.code).toMatch(/^export class G_Foo extends Node \{/);
  });
});

describe('TS→GD naming — emitter integration', () => {
  // Each test writes a tiny project under tmpdir so the TS program can
  // resolve the file naturally.
  function withTempProject<T>(
    fn: (project: {
      dir: string;
      write(rel: string, content: string): string;
    }) => T,
  ): T {
    const dir = join(
      tmpdir(),
      `tstogd-naming-test-${randomBytes(4).toString('hex')}`,
    );
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'globals.d.ts'),
      'declare const gd: any; declare type int = number;\n',
    );
    try {
      return fn({
        dir,
        write(rel, content) {
          const abs = resolve(dir, rel);
          writeFileSync(abs, content);
          return abs;
        },
      });
    } finally {
      try {
        rmSync(dir, { recursive: true, force: true });
      } catch {
        /* best-effort */
      }
    }
  }

  it('skips `class_name` for an anonymous `_Foo` TS class', () => {
    withTempProject((p) => {
      const tsPath = p.write('foo.ts', `export class _Foo extends Node {}\n`);
      const result = convertTsToGd({ filePath: tsPath, rootDir: p.dir });
      expect(result.code).not.toContain('class_name');
      expect(result.code).toContain('extends Node');
    });
  });

  it('emits `G_Foo` verbatim (the escape is not undone on TS→GD)', () => {
    withTempProject((p) => {
      const tsPath = p.write('foo.ts', `export class G_Foo extends Node {}\n`);
      const result = convertTsToGd({ filePath: tsPath, rootDir: p.dir });
      expect(result.code).toContain('class_name G_Foo');
      expect(result.code).not.toContain('class_name _Foo');
    });
  });

  it('emits plain `class_name X` for a regular non-prefixed class', () => {
    withTempProject((p) => {
      const tsPath = p.write('foo.ts', `export class Foo extends Node {}\n`);
      const result = convertTsToGd({ filePath: tsPath, rootDir: p.dir });
      expect(result.code).toContain('class_name Foo');
    });
  });
});
