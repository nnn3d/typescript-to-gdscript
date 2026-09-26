import { describe, it, expect } from 'vitest';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { generateAddonTypings } from '../../src/typings/addons.js';
import { emitAddonDeclarations } from '../../src/typings/addon-declarations.js';
import { GENERATED_HEADER } from '../../src/typings/addon-output.js';
import {
  cleanUpProjectsAfterEach,
  inPipelineTemp,
  makeBareProject,
  makeProject,
  walk,
} from './addon-test-project.js';

cleanUpProjectsAfterEach();

describe('Addon declaration emit', () => {
  it('writes declarations only, freezing the types inferred from bodies', () => {
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': [
        'extends Node',
        'class_name Widget',
        '',
        'var hp: int = 10',
        '',
        'func describe():',
        '\treturn "hp"',
        '',
        'func bump(amount: int) -> int:',
        '\treturn hp + amount',
      ].join('\n'),
    });

    const { writtenFiles } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    expect(writtenFiles.length).toBeGreaterThan(0);

    // A `widget.ts` next to `widget.d.ts` would win module resolution and
    // shadow the declaration, so the typings tree must hold none at all.
    const emitted = walk(outputDir);
    expect(emitted.filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'))).toEqual([]);
    expect(emitted).toContain('addons/Demo/widget.d.ts');
    expect(emitted).toContain('addons/Demo/widget.gd.d.ts');

    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');

    expect(decl).toContain('class Widget extends Node');
    // `func describe():` carries no GDScript return type; declaration emit
    // infers it from the body rather than dropping it.
    expect(decl).toMatch(/describe\(\)\s*:\s*string/);
    // An annotated one is carried through verbatim.
    expect(decl).toMatch(/bump\(amount: int\)\s*:\s*int/);
    // Bodies are gone, and with them the reason `@ts-nocheck` existed.
    expect(decl).not.toContain('@ts-nocheck');
    expect(decl).not.toContain('return');
    // The header is what lets the stale-file sweep tell ours from the user's.
    expect(decl.startsWith(GENERATED_HEADER)).toBe(true);
  });

  it('types a cross-addon preload() through GodotResources, not as a bare Resource', () => {
    // `preload("res://addons/…")` resolves via `GodotResources[P]`, and that
    // interface is populated by the generated `.gd.d.ts`. Emit declarations
    // before those exist and the type freezes as the `Resource` fallback —
    // which is worse than the old behaviour, where the consumer's own
    // program still had both halves and worked it out at use time.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/helper.gd': 'extends RefCounted\n\nfunc assist() -> int:\n\treturn 1\n',
      'addons/Demo/widget.gd': [
        'extends Node',
        'class_name Widget',
        '',
        'const Helper = preload("res://addons/Demo/helper.gd")',
        '',
        'var hp: int = 1',
      ].join('\n'),
    });

    generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');

    expect(decl).toContain('./helper');
    expect(decl).not.toMatch(/Helper:\s*(any|Resource)\s*;/);
  });

  it('rewrites declarations on a second run over an existing typings tree', () => {
    // TypeScript will not write a file that is also one of its inputs. It
    // reports that as TS5055 among the options diagnostics, not in the emit
    // result, so pulling the previous run's declarations in through the
    // tsconfig would make every later run quietly keep the stale ones.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nfunc first() -> int:\n\treturn 1\n',
    });

    const first = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    expect(first.diagnostics).toEqual([]);
    expect(readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8')).toContain('first');

    writeFileSync(
      join(rootDir, 'addons/Demo/widget.gd'),
      'extends Node\nclass_name Widget\n\nfunc second() -> String:\n\treturn "x"\n',
    );

    const second = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    expect(second.diagnostics).toEqual([]);

    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');
    expect(decl).toContain('second');
    expect(decl).not.toContain('first');
  });

  it('gives the same declarations on every run, including the first', () => {
    // The nullable helper must see the other addons through the temp
    // `.gd.d.ts`, not through whatever a previous run left in the typings
    // folder — otherwise run 1 infers `Node` and run 2 `Node | null`.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/finder.gd': [
        'extends RefCounted', 'class_name AddonFinder', '', 'var cached: Node', '',
        'func find() -> Node:', '\tif cached == null:', '\t\treturn null', '\treturn cached', '',
      ].join('\n'),
      'addons/Demo/widget.gd': [
        'extends Node', 'class_name Widget', '', 'var f: AddonFinder', '',
        'func get_thing() -> Node:', '\treturn f.find()', '',
      ].join('\n'),
    });
    const widget = join(outputDir, 'addons/Demo/widget.d.ts');

    generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    const first = readFileSync(widget, 'utf-8');
    generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    const second = readFileSync(widget, 'utf-8');

    expect(first).toBe(second);
    expect(first).toMatch(/get_thing\(\)\s*:\s*Node \| null/);
  });

  it('re-anchors references to project files outside the addon tree', () => {
    // An addon extending a project script: TypeScript writes the reference
    // relative to the temp source, which runs through the OS temp folder.
    // It has to be relative to where the declaration actually lands.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/child.gd': 'extends "res://scripts/user_base.gd"\n\nfunc ping():\n\tpass\n',
      'src/user_base.ts': 'export class UserBase extends Node {\n  hp: int = 1;\n}\n',
      'types/scripts/user_base.gd.d.ts': [
        'import type { UserBase as ScriptClass } from "../../src/user_base";',
        'declare global {',
        '  interface GodotResources { "res://scripts/user_base.gd": typeof ScriptClass; }',
        '}',
        'export {};',
        '',
      ].join('\n'),
    });

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    const decl = readFileSync(join(outputDir, 'addons/Demo/child.d.ts'), 'utf-8');

    expect(decl).toContain('import("../../../src/user_base")');
    expect(decl).not.toContain('tstogd-');
    expect(diagnostics).toEqual([]);
  });

  it("emits even when the user's tsconfig sets noEmitOnError", () => {
    // The converted code never type-checks cleanly, so honouring the flag
    // would skip every declaration.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nfunc bad(x):\n\treturn x.foo\n',
    });
    const cfg = JSON.parse(readFileSync(tsConfigPath, 'utf-8'));
    cfg.compilerOptions.noEmitOnError = true;
    writeFileSync(tsConfigPath, JSON.stringify(cfg));

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(existsSync(join(outputDir, 'addons/Demo/widget.d.ts'))).toBe(true);
    expect(diagnostics).toEqual([]);
  });

  it("emits even when the user's tsconfig sets isolatedDeclarations", () => {
    // That flag refuses to emit any declaration whose types are inferred,
    // which is every declaration here worth having.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nfunc describe():\n\treturn "x"\n',
    });
    const cfg = JSON.parse(readFileSync(tsConfigPath, 'utf-8'));
    cfg.compilerOptions.declaration = true;
    cfg.compilerOptions.isolatedDeclarations = true;
    writeFileSync(tsConfigPath, JSON.stringify(cfg));

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(diagnostics).toEqual([]);
    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');
    expect(decl).toMatch(/describe\(\)\s*:\s*string/);
  });

  it('re-anchors an absolute specifier into the temp tree to the output tree', () => {
    // The last line of defence behind `typeTextForSource`: a specifier
    // TypeScript (or a helper) wrote as an absolute path into the temp
    // tree is mapped to the same file's place in the output.
    const tempDir = makeBareProject();
    const outputDir = makeBareProject();
    const demo = join(tempDir, 'addons', 'Demo');
    mkdirSync(demo, { recursive: true });
    writeFileSync(join(demo, 'helper.ts'), 'export class Helper {}\n');
    const absolute = join(demo, 'helper').replace(/\\/g, '/');
    writeFileSync(
      join(demo, 'widget.ts'),
      `export declare const helper: import("${absolute}").Helper;\n`,
    );

    const result = emitAddonDeclarations({
      tsFiles: [join(demo, 'widget.ts'), join(demo, 'helper.ts')],
      tempDir,
      outputDir,
    });

    expect(result.degraded).toBe(false);
    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');
    expect(decl).toContain('import("./helper").Helper');
  });

  it("treats a declaration its own code keeps from being written as the addon's warning, not a degraded run", () => {
    // TypeScript writes no declaration that has errors. That is as stable
    // as the addon's code, so it must not mark the run degraded — a
    // degraded run is never cached, and one such addon would switch the
    // cache off for good.
    const tempDir = makeBareProject();
    const outputDir = makeBareProject();
    const demo = join(tempDir, 'addons', 'Demo');
    mkdirSync(demo, { recursive: true });
    // TS4094: an exported class expression may not have private members.
    writeFileSync(join(demo, 'made.ts'), 'export const Made = class { private secret = 1; };\n');

    const result = emitAddonDeclarations({ tsFiles: [join(demo, 'made.ts')], tempDir, outputDir });

    expect(result.degraded).toBe(false);
    expect(result.declarations.size).toBe(0);
    expect(result.diagnostics.some((d) => d.message.startsWith('TS4094'))).toBe(true);
    expect(result.diagnostics.some((d) => d.message.includes('No declaration was written'))).toBe(true);
  });

  it('flags a declaration that still names the temp folder', () => {
    // If a path into the temp tree survives in any form the transformer
    // doesn't touch, the run must not pass as clean: the folder is gone by
    // the time anyone reads the declaration.
    const tempDir = makeBareProject();
    const outputDir = makeBareProject();
    const demo = join(tempDir, 'addons', 'Demo');
    mkdirSync(demo, { recursive: true });
    const inTemp = join(demo, 'data.json').replace(/\\/g, '/');
    writeFileSync(join(demo, 'widget.ts'), `export declare const where: "${inTemp}";\n`);

    const result = emitAddonDeclarations({ tsFiles: [join(demo, 'widget.ts')], tempDir, outputDir });

    expect(result.degraded).toBe(true);
    expect(result.diagnostics.some((d) => d.message.includes('temporary build folder'))).toBe(true);
  });

  it('reports an extends path it cannot resolve, against a file that exists', () => {
    // `extends "res://…"` with nothing behind it in GodotResources: the
    // synthesised base falls back to `Resource`, which is not a
    // constructor. Declaration emit accepts that; only the check sees it.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/child.gd': 'extends "res://scripts/missing.gd"\n\nfunc ping():\n\tpass\n',
    });

    const { writtenFiles, diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(writtenFiles.some((f) => f.endsWith('child.d.ts'))).toBe(true);
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].message).toContain('TS2507');
    expect(diagnostics[0].severity).toBe('warning');
    expect(existsSync(diagnostics[0].file)).toBe(true);
  });

  it('resolves `extends "res://..."` to the real base class', () => {
    // GDScript's path-extends becomes `extends preload(...)` in TS — a class
    // expression, which declaration emit can only express by synthesising
    // `declare const X_base: <type of the expression>`. That type is the
    // whole game: with the `.gd.d.ts` in the program `preload` resolves
    // through `GodotResources` to `typeof DemoBase` and the declaration is
    // sound; without them it falls back to `Resource`, which is not a
    // constructor, and the declaration fails to type-check with TS2507.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/base.gd': 'extends Node\nclass_name DemoBase\n\nvar hp: int = 1\n',
      'addons/Demo/child.gd': 'extends "res://addons/Demo/base.gd"\n\nfunc ping():\n\tpass\n',
    });

    const { writtenFiles, diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(writtenFiles.some((f) => f.endsWith('child.d.ts'))).toBe(true);
    expect(diagnostics).toEqual([]);

    const decl = readFileSync(join(outputDir, 'addons/Demo/child.d.ts'), 'utf-8');
    expect(decl).toContain('typeof DemoBase');
    expect(decl).not.toMatch(/_base:\s*Resource/);
  });

  it('collapses the whole check into one message when Godot typings are not visible', () => {
    // A tsconfig that resolves but never pulls in the typings: every Godot
    // type in the declarations becomes an unknown name, and reporting each
    // one would blame the addon for a project misconfiguration.
    const rootDir = makeBareProject();
    mkdirSync(join(rootDir, 'addons/Demo'), { recursive: true });
    writeFileSync(
      join(rootDir, 'addons/Demo/widget.gd'),
      'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    );
    const outputDir = join(rootDir, 'types');
    mkdirSync(outputDir, { recursive: true });
    const tsConfigPath = join(rootDir, 'tsconfig.json');
    writeFileSync(
      tsConfigPath,
      JSON.stringify({
        compilerOptions: { strict: true, noEmit: true, types: [] },
        include: ['./types/**/*.d.ts'],
      }),
    );

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].message).toContain('Godot typings are not visible');
    expect(diagnostics[0].severity).toBe('warning');
  });

  it('warns once when no tsconfig is given, since inferred types would freeze as any', () => {
    const { rootDir, outputDir } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir });

    // Only this one: the check against the typings is skipped, since it
    // could only restate the same fault as "typings not visible".
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].message).toContain('without a tsconfig');
    // It names a path that outlives the run — never the temp tree, which
    // is gone by the time anyone reads it.
    expect(inPipelineTemp(diagnostics[0].file)).toBe(false);
  });

  it('points the .gd.d.ts import at the declaration, not the temp source', () => {
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });

    generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    const gdDts = readFileSync(join(outputDir, 'addons/Demo/widget.gd.d.ts'), 'utf-8');

    // Extensionless specifier — resolves to `widget.d.ts` sitting beside it.
    expect(gdDts).toContain('from "./widget"');
    expect(gdDts).not.toContain('tstogd-addon-');
    expect(existsSync(join(outputDir, 'addons/Demo/widget.d.ts'))).toBe(true);
  });
});
