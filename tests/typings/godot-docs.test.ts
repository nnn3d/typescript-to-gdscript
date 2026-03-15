import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { readFileSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { generateGodotDocsTypings } from '../../src/typings/godot-docs.js';

const GODOT_DOCS_DIR = join(__dirname, '../../vendor/godot/doc/classes');
const OVERRIDE_DIR = join(__dirname, '../../typings/overrides');
const VERSION_GODOT_DTS = join(__dirname, '../../typings/4.7/godot.d.ts');

describe('Godot Docs: typings generation', () => {
  it('should generate godot.d.ts matching typings/4.7/godot.d.ts', () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'godot-typings-'));

    try {
      generateGodotDocsTypings({
        classDocsDir: GODOT_DOCS_DIR,
        outputDir: tmpDir,
        overrideDir: OVERRIDE_DIR,
      });

      const generated = readFileSync(join(tmpDir, 'godot.d.ts'), 'utf-8');
      const expected = readFileSync(VERSION_GODOT_DTS, 'utf-8');

      const generatedLines = generated.split('\n');
      const expectedLines = expected.split('\n');

      // Find first mismatch for a useful error message
      const maxLen = Math.max(generatedLines.length, expectedLines.length);
      for (var i = 0; i < maxLen; i++) {
        const gen = generatedLines[i] ?? '<EOF>';
        const exp = expectedLines[i] ?? '<EOF>';
        if (gen !== exp) {
          expect.fail(
            `Line ${i + 1} mismatch:\n` +
            `  Expected: ${JSON.stringify(exp)}\n` +
            `  Got:      ${JSON.stringify(gen)}`
          );
        }
      }

      expect(generatedLines.length).toBe(expectedLines.length);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
