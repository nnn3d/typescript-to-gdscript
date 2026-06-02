import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { readFileSync } from 'fs';
import { parseGodotVersion } from '../../src/typings/godot-registry.js';

const ROOT = join(__dirname, '../..');

/**
 * Guard against accidentally pinning `vendor/godot` to a different Godot
 * version than the committed typings were generated from.
 *
 * Without this, a submodule bump (or a stale gitlink) silently desyncs the
 * bundled `typings/` from the checked-out engine docs — exactly the 4.6↔4.7
 * mix-up this project hit before. Here it fails loudly in `yarn test:run`
 * (and CI) instead.
 *
 * We read `version.py` rather than `git describe --tags`: CI checks the
 * submodule out shallow at a detached commit, so tag objects usually aren't
 * even present, whereas `version.py` is always there.
 *
 * Fix when it fails: either re-pin `vendor/godot` to match the typings, or
 * regenerate the typings from the current submodule (`yarn generate:godot-typings`).
 */
describe('Submodule / typings version consistency', () => {
  it('bundled typings match the checked-out vendor/godot version', () => {
    const engine = parseGodotVersion(join(ROOT, 'vendor/godot/version.py'));
    const registry = JSON.parse(
      readFileSync(join(ROOT, 'typings/godot-class-registry.json'), 'utf-8'),
    ) as { version: string };

    expect(registry.version).toBe(engine.short);
  });
});
