/**
 * `validateGdProject` against the real Godot. It compiles the converted
 * scripts in one run of a checker script. It used to start the project
 * instead (`--check-only` without `--script` does nothing), which ran the
 * main scene's code, missed every script that scene doesn't load, and in a
 * project without a main scene made Godot abort with a modal dialog that
 * Windows shows even in `--headless` mode.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { basename, join, normalize, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { validateGdProject } from '../../src/godot-validate/index.ts';
import { resolveGodotPath } from '../../src/config/index.ts';

const GODOT_PATH = resolveGodotPath();

let root: string;
let scripts: string;

beforeEach(() => {
  root = join(tmpdir(), `tstogd-projectcheck-${randomBytes(4).toString('hex')}`);
  scripts = join(root, 'scripts');
  mkdirSync(scripts, { recursive: true });
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

function write(rel: string, content: string): string {
  const file = join(root, rel);
  writeFileSync(file, content);
  return file;
}

/** The converted scripts, as the checker passes them in. */
function converted(...files: string[]) {
  return new Map(files.map((f) => [normalize(resolve(f)), {}]));
}

describe('validateGdProject', () => {
  it('reports a script nothing loads, in a project without a main scene', async () => {
    write('project.godot', 'config_version=5\n');
    const ok = write('scripts/ok.gd', 'extends Node\n\nfunc _ready():\n\tpass\n');
    const broken = write(
      'scripts/broken.gd',
      'extends Node\n\nfunc broken():\n\tvar x: int = "not an int"\n',
    );

    const result = await validateGdProject({
      projectRoot: root,
      godotPath: GODOT_PATH,
      gdDir: scripts,
      sourceMapTable: converted(ok, broken),
    });

    expect(result.godotAvailable).toBe(true);
    expect(result.diagnostics.length).toBeGreaterThan(0);
    for (const d of result.diagnostics) {
      expect(d.severity).toBe('error');
      expect(basename(d.file)).toBe('broken.gd');
      expect(d.line).toBe(4);
    }
  });

  it("does not run the game's code", async () => {
    const marker = join(root, 'ran.txt').replace(/\\/g, '/');
    write(
      'project.godot',
      'config_version=5\n\n[application]\nrun/main_scene="res://main.tscn"\n',
    );
    const main = write(
      'scripts/main.gd',
      `extends Node\n\nfunc _ready():\n\tFileAccess.open("${marker}", FileAccess.WRITE).store_string("ran")\n`,
    );
    write(
      'main.tscn',
      '[gd_scene load_steps=2 format=3]\n\n' +
        '[ext_resource type="Script" path="res://scripts/main.gd" id="1"]\n\n' +
        '[node name="Main" type="Node"]\nscript = ExtResource("1")\n',
    );

    const result = await validateGdProject({
      projectRoot: root,
      godotPath: GODOT_PATH,
      gdDir: scripts,
      sourceMapTable: converted(main),
    });

    expect(result.diagnostics).toEqual([]);
    expect(existsSync(marker)).toBe(false);
  });
});
