import { describe, it, expect, afterEach } from 'vitest';
import { resolve } from 'path';
import { resolveLintGodotPath } from '../../src/config/index.js';

/**
 * `convert` and `watch` both run the Godot check after converting, and must
 * find Godot the same way: `godotPath`, then `GODOT_PATH`, then `godot` on
 * `PATH` — and not at all when the project set `disableGodotLint`.
 */
describe('resolveLintGodotPath', () => {
  const saved = process.env.GODOT_PATH;
  afterEach(() => {
    if (saved === undefined) delete process.env.GODOT_PATH;
    else process.env.GODOT_PATH = saved;
  });

  it('skips the check when disableGodotLint is set', () => {
    process.env.GODOT_PATH = '/opt/godot';
    expect(
      resolveLintGodotPath({
        godotPath: '/usr/bin/godot',
        disableGodotLint: true,
      }),
    ).toBeUndefined();
  });

  it('prefers the configured godotPath', () => {
    process.env.GODOT_PATH = '/opt/godot';
    expect(
      resolveLintGodotPath({
        godotPath: 'tools/godot',
        disableGodotLint: false,
      }),
    ).toBe(resolve('tools/godot'));
  });

  it('falls back to GODOT_PATH without a configured path', () => {
    process.env.GODOT_PATH = '/opt/godot';
    expect(
      resolveLintGodotPath({ godotPath: undefined, disableGodotLint: false }),
    ).toBe('/opt/godot');
  });

  it('falls back to godot on PATH without GODOT_PATH', () => {
    delete process.env.GODOT_PATH;
    expect(
      resolveLintGodotPath({ godotPath: undefined, disableGodotLint: false }),
    ).toBe('godot');
  });
});
