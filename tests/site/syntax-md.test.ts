import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createBrowserConverter } from '../../src/browser/index.js';
import { readTypingsBundle } from '../../src/browser/read-typings.js';

/**
 * `SYNTAX.md` ships in the npm package for AI agents. To stay short, its
 * example doesn't print the GDScript; a `// → …` comment states the part that
 * matters on its line. The example must convert without a diagnostic, and
 * every stated part must be in the output.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const blocks = [
  ...readFileSync(join(ROOT, 'SYNTAX.md'), 'utf-8').matchAll(
    /^```ts\r?\n(.*?)^```/gms,
  ),
].map((m) => m[1]);

describe('SYNTAX.md', () => {
  it('has an example', () => {
    expect(blocks.length).toBeGreaterThan(0);
  });

  const converter = createBrowserConverter(
    readTypingsBundle(join(ROOT, 'typings')),
  );

  blocks.forEach((ts, index) => {
    it(`example ${index + 1} converts as its comments say`, () => {
      const result = converter.convert(ts, `/src/syntax-${index}.ts`);
      expect(result.diagnostics).toEqual([]);

      // Without comments: they are carried over, and would match themselves.
      const gd = result.code.replace(/^\s*#.*$/gm, '');
      const stated = [...ts.matchAll(/\/\/ → (.+)$/gm)].map((m) => m[1].trim());
      expect(stated.length).toBeGreaterThan(0);
      expect(stated.filter((s) => !gd.includes(s))).toEqual([]);
    });
  });
});
