import { describe, it, expect } from 'vitest';
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { generateAddonTypings } from '../../src/typings/addons.js';
import {
  GENERATED_HEADER,
  LEGACY_SOURCE_HEADER,
} from '../../src/typings/addon-output.js';
import { ProjectCache } from '../../src/cache/index.js';
import { cleanUpProjectsAfterEach, makeProject } from './addon-test-project.js';

cleanUpProjectsAfterEach();

describe('Addon typings output folder and cache', () => {
  it('sweeps a converted .ts left by an older tstogd', () => {
    // The upgrade path: a previous version wrote `widget.ts` into the
    // typings tree. It resolves ahead of `widget.d.ts`, so leaving it there
    // would keep the user on stale addon types with nothing to show for it.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });
    mkdirSync(join(outputDir, 'addons/Demo'), { recursive: true });
    const leftover = join(outputDir, 'addons/Demo/widget.ts');
    writeFileSync(leftover, `${LEGACY_SOURCE_HEADER}\nexport class Widget {}\n`);

    generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(existsSync(leftover)).toBe(false);
    expect(existsSync(join(outputDir, 'addons/Demo/widget.d.ts'))).toBe(true);
  });

  it('sweeps the legacy .ts even when the cache says everything is fresh', () => {
    // Hashing the declaration can't see a sibling that shadows it, so the
    // sweep has to run on the cache fast path too.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });
    const cacheDir = join(rootDir, '.cache');
    generateAddonTypings({ rootDir, outputDir, tsConfigPath, cache: new ProjectCache(cacheDir) });

    const leftover = join(outputDir, 'addons/Demo/widget.ts');
    writeFileSync(leftover, `${LEGACY_SOURCE_HEADER}\nexport class Widget {}\n`);

    const logs: string[] = [];
    generateAddonTypings({
      rootDir, outputDir, tsConfigPath,
      cache: new ProjectCache(cacheDir),
      onDebug: (m) => logs.push(m),
    });

    expect(logs.some((m) => m.includes('skipped'))).toBe(true);
    expect(existsSync(leftover)).toBe(false);
  });

  it('sweeps output of an addon removed since the last run, cache or not', () => {
    // A removal changes type resolution for the survivors exactly as an
    // addition does, so it must defeat the cache fast path, not ride it.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
      'addons/Gone/gone.gd': 'extends Node\nclass_name GoneThing\n',
    });
    const cacheDir = join(rootDir, '.cache');
    generateAddonTypings({ rootDir, outputDir, tsConfigPath, cache: new ProjectCache(cacheDir) });
    expect(existsSync(join(outputDir, 'addons/Gone/gone.d.ts'))).toBe(true);

    rmSync(join(rootDir, 'addons/Gone'), { recursive: true, force: true });
    const logs: string[] = [];
    generateAddonTypings({
      rootDir, outputDir, tsConfigPath,
      cache: new ProjectCache(cacheDir),
      onDebug: (m) => logs.push(m),
    });

    expect(logs.some((m) => m.includes('skipped'))).toBe(false);
    expect(existsSync(join(outputDir, 'addons/Gone/gone.d.ts'))).toBe(false);
    expect(existsSync(join(outputDir, 'addons/Gone/gone.gd.d.ts'))).toBe(false);
    // The emptied folder goes too, rather than lingering as a stub.
    expect(existsSync(join(outputDir, 'addons/Gone'))).toBe(false);
    expect(existsSync(join(outputDir, 'addons/Demo/widget.d.ts'))).toBe(true);
  });

  it('sweeps everything generated once the last addon is gone', () => {
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });
    generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    rmSync(join(rootDir, 'addons'), { recursive: true, force: true });
    generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(existsSync(join(outputDir, 'addons'))).toBe(false);
  });

  it('never deletes a file it did not generate', () => {
    // Deletion is keyed on the generator header, not the extension: the
    // README walks users through fixing addon typings by hand, and a
    // hand-written declaration must survive every run.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });
    mkdirSync(join(outputDir, 'addons/GodotSteam'), { recursive: true });
    const handWritten = join(outputDir, 'addons/GodotSteam/steam.d.ts');
    writeFileSync(handWritten, 'declare const Steam: { init(): void };\n');
    mkdirSync(join(outputDir, 'addons/Demo'), { recursive: true });
    const notes = join(outputDir, 'addons/Demo/NOTES.md');
    writeFileSync(notes, 'hand-written\n');

    generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(existsSync(handWritten)).toBe(true);
    expect(existsSync(notes)).toBe(true);
  });

  it('refuses to sweep when the typings folder is the addons source folder', () => {
    // `typingsDir` set to the project root makes `<typingsDir>/addons` the
    // real addons folder, where the addon's own files live.
    const { rootDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
      'addons/Demo/tooling/build.ts': `${GENERATED_HEADER}\nexport const x = 1;\n`,
    });

    generateAddonTypings({ rootDir, outputDir: rootDir, tsConfigPath });

    expect(existsSync(join(rootDir, 'addons/Demo/tooling/build.ts'))).toBe(true);
    expect(existsSync(join(rootDir, 'addons/Demo/widget.gd'))).toBe(true);
  });

  it('removes its temp directory', () => {
    // Read the path from the debug log rather than diffing the OS temp
    // folder, which other test files populate concurrently.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
    });
    const logs: string[] = [];
    generateAddonTypings({ rootDir, outputDir, tsConfigPath, onDebug: (m) => logs.push(m) });

    const line = logs.find((m) => m.startsWith('Addon typings: temp dir '));
    expect(line).toBeDefined();
    expect(existsSync(line!.slice('Addon typings: temp dir '.length))).toBe(false);
  });

  it('does not cache a degraded run', () => {
    // Otherwise degraded output outlives the fix: add the missing tsconfig
    // and a cache hit keeps serving the `any`-riddled declaration while
    // no longer printing the warning that explained it.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nfunc get_self_node():\n\treturn get_node(".")\n',
    });
    const cacheDir = join(rootDir, '.cache');

    const degraded = generateAddonTypings({ rootDir, outputDir, cache: new ProjectCache(cacheDir) });
    expect(degraded.diagnostics.length).toBeGreaterThan(0);

    const logs: string[] = [];
    const fixed = generateAddonTypings({
      rootDir, outputDir, tsConfigPath,
      cache: new ProjectCache(cacheDir),
      onDebug: (m) => logs.push(m),
    });

    expect(logs.some((m) => m.includes('skipped'))).toBe(false);
    expect(fixed.diagnostics).toEqual([]);
    const decl = readFileSync(join(outputDir, 'addons/Demo/widget.d.ts'), 'utf-8');
    expect(decl).toMatch(/get_self_node\(\)\s*:\s*Node \| null/);
  });

  it("caches an addon's own warnings and reports them again on a cache hit", () => {
    // A third-party addon's warning never goes away. Refusing to cache it
    // would switch the cache off for good; caching it silently would hide
    // it. The warning is stored with the entry and replayed instead.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/child.gd': 'extends "res://scripts/missing.gd"\n\nfunc ping():\n\tpass\n',
    });
    const cacheDir = join(rootDir, '.cache');

    const first = generateAddonTypings({ rootDir, outputDir, tsConfigPath, cache: new ProjectCache(cacheDir) });
    expect(first.diagnostics).toHaveLength(1);
    expect(first.diagnostics[0].message).toContain('TS2507');

    const logs: string[] = [];
    const second = generateAddonTypings({
      rootDir, outputDir, tsConfigPath,
      cache: new ProjectCache(cacheDir),
      onDebug: (m) => logs.push(m),
    });

    expect(logs.some((m) => m.includes('skipped'))).toBe(true);
    expect(second.diagnostics).toEqual(first.diagnostics);
  });
});
