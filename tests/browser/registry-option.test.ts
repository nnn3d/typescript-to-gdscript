import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const { resolveRegistry } = vi.hoisted(() => ({ resolveRegistry: vi.fn() }));
vi.mock('../../src/config/index.ts', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  resolveRegistry,
}));

import { convertTsToGd } from '../../src/converter/ts-to-gd/index.js';
import { GodotClassRegistry } from '../../src/typings/godot-registry.js';
import { createMemoryHost } from '../../src/parser/typescript/memory-host.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

describe('convertTsToGd registry option', () => {
  it('uses the passed registry and never resolves one from disk', () => {
    const registry = GodotClassRegistry.fromJson(
      readFileSync(join(ROOT, 'typings', 'godot-class-registry.json'), 'utf-8'),
    );
    const host = createMemoryHost(
      new Map([['/src/main.ts', 'export class A {}\n']]),
    );
    const program = ts.createProgram({
      rootNames: ['/src/main.ts'],
      options: { noLib: true, types: [] },
      host,
    });

    const result = convertTsToGd({
      filePath: '/src/main.ts',
      rootDir: '/src',
      program,
      registry,
    });

    expect(resolveRegistry).not.toHaveBeenCalled();
    expect(result.code).toContain('class_name A');
  });
});
