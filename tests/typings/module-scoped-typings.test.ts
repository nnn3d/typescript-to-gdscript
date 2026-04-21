/**
 * Module-scoped vs global typings layout tests.
 *
 * The `generateGlobalClassTypes` flag flips how non-anonymous classes
 * are exposed in the generated `.gd.d.ts` files:
 *
 *   - `false` (project default) — emitted as a module-scoped
 *     declaration; consumers must `import { Foo }`. The `.gd.d.ts`
 *     references the user's class via the imported `ScriptClass` alias
 *     for the `GodotScripts` / `GodotResources` mappings.
 *
 *   - `true` (legacy / addon-required) — emitted as
 *     `class Foo extends ScriptClass` inside `declare global`, so the
 *     class is usable without an explicit import.
 *
 * Anonymous classes (`_<UpperCamel>` convention) ALWAYS use the
 * module-scoped layout regardless of the flag.
 *
 * Each test sets up a small TS project under `os.tmpdir()`, runs
 * `generateTypings` against it, and asserts on key snippets in the
 * resulting `.gd.d.ts` that distinguish the two layouts.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { generateTypings } from '../../src/typings/scenes.ts';

interface Project {
  rootDir: string;
  outputDir: string;
  /** Write a TS source file at `relPath` under the project root. */
  write(relPath: string, content: string): string;
  /**
   * Run the typings generator with the given flag and return the
   * generated `.gd.d.ts` content for the named source. `name` is the
   * source basename without the `.ts` extension (e.g. `'foo'` for
   * `foo.ts` produces `foo.gd.d.ts`).
   */
  generate(generateGlobalClassTypes: boolean, name: string): string;
}

let project: Project;

beforeEach(() => {
  const rootDir = join(
    tmpdir(),
    `tstogd-modtypings-${randomBytes(4).toString('hex')}`,
  );
  const outputDir = join(rootDir, '_typings');
  mkdirSync(rootDir, { recursive: true });
  mkdirSync(outputDir, { recursive: true });
  // Stub `Node` / `gd` so the TS program parses without errors.
  writeFileSync(
    join(rootDir, 'globals.d.ts'),
    'declare class Node {} declare const gd: any;\n',
  );
  const tsFiles: string[] = [];

  project = {
    rootDir,
    outputDir,
    write(relPath, content) {
      const abs = resolve(rootDir, relPath);
      writeFileSync(abs, content);
      if (relPath.endsWith('.ts') && !relPath.endsWith('.d.ts')) {
        tsFiles.push(abs);
      }
      return abs;
    },
    generate(generateGlobalClassTypes, name) {
      generateTypings({
        rootDir,
        tsDir: rootDir,
        gdDir: rootDir,
        files: tsFiles,
        outputDir,
        scenesDir: rootDir,
        generateGlobalClassTypes,
      });
      return readFileSync(join(outputDir, `${name}.gd.d.ts`), 'utf-8');
    },
  };
});

afterEach(() => {
  try { rmSync(project.rootDir, { recursive: true, force: true }); } catch { /* ignore */ }
});

describe('Typings: named class, module-scoped (default)', () => {
  it('does NOT emit `class Foo extends ScriptClass` inside `declare global`', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    const dts = project.generate(false, 'foo');

    // The legacy declare-global class declaration must not appear.
    expect(dts).not.toMatch(
      /declare global \{[\s\S]*\bclass Foo extends ScriptClass/,
    );
  });

  it('routes GodotScripts/Resources through the imported `ScriptClass` alias', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    const dts = project.generate(false, 'foo');

    // The user's class isn't visible globally in module-scoped mode,
    // so the GodotScripts/Resources entries point at the imported
    // `ScriptClass` alias (which == the user's `Foo`) instead.
    expect(dts).toContain('"res://foo.gd": ScriptClass;');
    expect(dts).toContain('"res://foo.gd": typeof ScriptClass;');
  });

  it('augments the user\'s class via `declare module` (typed get_node etc.)', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    const dts = project.generate(false, 'foo');

    expect(dts).toContain('declare module "../foo" {');
    expect(dts).toContain('interface Foo extends StaticProps {');
    expect(dts).toContain(
      'get_node<P extends string & ScriptPaths>(path: P): _GDGetNode<ScriptTree, P>;',
    );
  });
});

describe('Typings: named class, global mode (legacy / addon)', () => {
  it('emits `class Foo extends ScriptClass` inside `declare global`', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    const dts = project.generate(true, 'foo');

    expect(dts).toMatch(
      /declare global \{[\s\S]*\bclass Foo extends ScriptClass/,
    );
  });

  it('routes GodotScripts/Resources through the bare class name', () => {
    project.write('foo.ts', 'export class Foo extends Node {}\n');
    const dts = project.generate(true, 'foo');

    expect(dts).toContain('"res://foo.gd": Foo;');
    expect(dts).toContain('"res://foo.gd": typeof Foo;');
    // No `ScriptClass` alias appears in the GodotScripts mappings under
    // the legacy layout — the bare class name is what's exported.
    expect(dts).not.toContain('"res://foo.gd": ScriptClass;');
  });
});

describe('Typings: StaticProps augmentation regardless of base class', () => {
  it('still extends StaticProps when the class does NOT extend Node', () => {
    // Stub a non-Node base so the TS program parses and the typings
    // generator's `extendsNode` check returns false for `Bag`.
    project.write(
      'extra.d.ts',
      'declare class RefCounted {}\n',
    );
    project.write(
      'bag.ts',
      'export class Bag extends RefCounted {\n  static MAX = 10;\n}\n',
    );
    const dts = project.generate(false, 'bag');

    // The augmentation must be present so `this.MAX` resolves on
    // instances — even without any of the Node tree-method overloads.
    expect(dts).toContain('type StaticProps = Omit<typeof ScriptClass');
    expect(dts).toMatch(/declare module "[^"]+" \{[\s\S]*interface Bag extends StaticProps/);
    // No Node-specific overloads when the base class isn't a Node.
    expect(dts).not.toContain('get_node<P extends string & ScriptPaths>');
  });
});

describe('Typings: anonymous class (always module-scoped)', () => {
  // Whichever value of the flag is passed, the layout is identical —
  // `_Anon` is anonymous by convention and never gets a `declare global`
  // class declaration.
  for (const flag of [false, true]) {
    it(`is module-scoped regardless of flag (flag=${flag})`, () => {
      project.write('anon.ts', 'export class _Anon extends Node {}\n');
      const dts = project.generate(flag, 'anon');

      // No top-level `class _Anon extends ScriptClass` in declare global.
      expect(dts).not.toMatch(
        /declare global \{[\s\S]*\bclass _Anon extends ScriptClass/,
      );
      // No synthesized `_Script` local handle either.
      expect(dts).not.toContain('declare class _Script');
      // GodotScripts/Resources go through the imported alias.
      expect(dts).toContain('"res://anon.gd": ScriptClass;');
      expect(dts).toContain('"res://anon.gd": typeof ScriptClass;');
    });
  }
});
