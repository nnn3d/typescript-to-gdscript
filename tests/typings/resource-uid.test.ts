import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { resolveResourceUid } from '../../src/typings/scene-utils.js';

describe('resolveResourceUid', () => {
  it('reads each uid storage location and returns undefined when absent', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tstogd-uid-'));
    try {
      // .gd.uid sidecar
      writeFileSync(join(dir, 'foo.gd'), 'extends Node\n');
      writeFileSync(join(dir, 'foo.gd.uid'), 'uid://abc123\n');
      expect(resolveResourceUid(join(dir, 'foo.gd'))).toBe('uid://abc123');

      // .import sidecar
      writeFileSync(join(dir, 'icon.png'), '');
      writeFileSync(join(dir, 'icon.png.import'), '[remap]\nimporter="texture"\nuid="uid://png99"\n');
      expect(resolveResourceUid(join(dir, 'icon.png'))).toBe('uid://png99');

      // .tscn header
      writeFileSync(join(dir, 's.tscn'), '[gd_scene load_steps=1 format=3 uid="uid://scene7"]\n');
      expect(resolveResourceUid(join(dir, 's.tscn'))).toBe('uid://scene7');

      // .tres header
      writeFileSync(join(dir, 'r.tres'), '[gd_resource type="ShaderMaterial" format=3 uid="uid://res5"]\n');
      expect(resolveResourceUid(join(dir, 'r.tres'))).toBe('uid://res5');

      // no uid anywhere
      writeFileSync(join(dir, 'bare.tres'), '[gd_resource type="Resource" format=3]\n');
      expect(resolveResourceUid(join(dir, 'bare.tres'))).toBeUndefined();
      expect(resolveResourceUid(join(dir, 'missing.tscn'))).toBeUndefined();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
