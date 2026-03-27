import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { readFileSync, mkdtempSync, rmSync, readdirSync } from 'fs';
import { tmpdir } from 'os';
import { generateGodotDocsTypings } from '../../src/typings/godot-docs.js';

const GODOT_DOCS_DIR = join(__dirname, '../../vendor/godot/doc/classes');
const OVERRIDE_DIR = join(__dirname, '../../typings/_overrides');
const VERSION_CLASSES_DIR = join(__dirname, '../../typings/4.7/classes');

describe('Godot Docs: typings generation', () => {
  it('should generate per-class files matching typings/4.7/classes/', () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'godot-typings-'));

    try {
      generateGodotDocsTypings({
        classDocsDir: GODOT_DOCS_DIR,
        outputDir: tmpDir,
        overrideDir: OVERRIDE_DIR,
      });

      const generatedClassesDir = join(tmpDir, 'classes');
      const generatedFiles = readdirSync(generatedClassesDir).sort();
      const expectedFiles = readdirSync(VERSION_CLASSES_DIR).sort();

      // Same set of files
      expect(generatedFiles).toEqual(expectedFiles);

      // Compare each file
      for (const file of expectedFiles) {
        const generated = readFileSync(
          join(generatedClassesDir, file),
          'utf-8',
        );
        const expected = readFileSync(join(VERSION_CLASSES_DIR, file), 'utf-8');

        const generatedLines = generated.split('\n');
        const expectedLines = expected.split('\n');

        const maxLen = Math.max(generatedLines.length, expectedLines.length);
        for (var i = 0; i < maxLen; i++) {
          const gen = generatedLines[i] ?? '<EOF>';
          const exp = expectedLines[i] ?? '<EOF>';
          if (gen !== exp) {
            expect.fail(
              `${file} line ${i + 1} mismatch:\n` +
                `  Expected: ${JSON.stringify(exp)}\n` +
                `  Got:      ${JSON.stringify(gen)}`,
            );
          }
        }

        expect(generatedLines.length).toBe(expectedLines.length);
      }
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
