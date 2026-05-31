import { describe, it, expect } from 'vitest';
import { resolve } from 'path';
import { collectProjectDiagnostics } from '../../src/checker/index.ts';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('collectProjectDiagnostics', () => {
  it('returns CheckResult shape with three diagnostic arrays', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'tstogd-checker-test-'));
    const tsDir = join(tmp, 'src');
    const gdDir = join(tmp, 'gd');
    mkdirSync(tsDir);
    mkdirSync(gdDir);
    writeFileSync(
      join(tsDir, 'empty.ts'),
      'export class Empty extends Node {}\n',
    );
    try {
      const result = await collectProjectDiagnostics({
        tsDir,
        gdDir,
        projectRoot: tmp,
        tsFiles: [join(tsDir, 'empty.ts')],
        cache: null,
        noEmit: true,
      });
      expect(result).toHaveProperty('tsDiagnostics');
      expect(result).toHaveProperty('converterDiagnostics');
      expect(result).toHaveProperty('godotDiagnostics');
      expect(result).toHaveProperty('staleFiles');
      expect(Array.isArray(result.tsDiagnostics)).toBe(true);
      expect(Array.isArray(result.converterDiagnostics)).toBe(true);
      expect(Array.isArray(result.godotDiagnostics)).toBe(true);
      expect(Array.isArray(result.staleFiles)).toBe(true);
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('detects stale .gd files in noEmit mode', async () => {
    const tmp = mkdtempSync(join(tmpdir(), 'tstogd-checker-stale-'));
    const tsDir = join(tmp, 'src');
    const gdDir = join(tmp, 'gd');
    mkdirSync(tsDir);
    mkdirSync(gdDir);
    const tsFile = join(tsDir, 'player.ts');
    const gdFile = join(gdDir, 'player.gd');
    writeFileSync(tsFile, 'export class Player extends Node {}\n');
    // Write a stale .gd that doesn't match what the converter would emit
    writeFileSync(gdFile, '# stale\nextends Node\n');
    try {
      const result = await collectProjectDiagnostics({
        tsDir,
        gdDir,
        projectRoot: tmp,
        tsFiles: [tsFile],
        cache: null,
        noEmit: true,
      });
      expect(result.staleFiles).toContain(resolve(gdFile));
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});
