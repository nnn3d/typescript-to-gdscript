import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createBrowserConverter } from '../../src/browser/index.js';
import { readTypingsBundle } from '../../src/browser/read-typings.js';
import { normalize } from '../converter/fixture-harness.js';

/**
 * A guide example is a TypeScript block followed by the GDScript it turns
 * into. Nothing else keeps those pairs honest when the converter changes, so
 * each one is converted here (with the playground's converter) and compared.
 * The TypeScript must also convert without a single diagnostic.
 *
 * A block opened as ```ts nocheck is skipped: an intentional error, or a
 * fragment that is not a whole script. A block opened as ```ts scene reads
 * nodes from a scene this test doesn't have, so `get_node()` is `Node | null`
 * to TypeScript here: that one error is allowed, and the output is still
 * compared. A TypeScript block with no GDScript block right after it is not a
 * pair and is not checked.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PAGES_DIR = join(ROOT, 'site', 'src', 'content', 'docs');
const GUIDE_DIR = join(PAGES_DIR, 'guide');

interface Fence {
  lang: string;
  meta: string;
  body: string;
  /** 0-based index of the opening and the closing fence line. */
  start: number;
  end: number;
}

function fences(lines: string[]): Fence[] {
  const result: Fence[] = [];
  for (let i = 0; i < lines.length; i++) {
    const open = /^```(\w+)?\s*(.*)$/.exec(lines[i]);
    if (!open) continue;
    const start = i;
    const body: string[] = [];
    for (i++; i < lines.length && !/^```\s*$/.test(lines[i]); i++) {
      body.push(lines[i]);
    }
    result.push({
      lang: open[1] ?? '',
      meta: open[2],
      body: body.join('\n'),
      start,
      end: i,
    });
  }
  return result;
}

interface Pair {
  ts: string;
  gd: string;
  /** 1-based line of the TypeScript fence, for the test name. */
  line: number;
  /** Opened as ```ts scene: its nodes come from a scene the test lacks. */
  scene: boolean;
}

/** The error a node read gets without its scene: `Node | null` for `Label`. */
const NO_SCENE =
  /^TS2322: Type 'Node \| null' is not assignable to type '\w+'\./;

function pairs(text: string): Pair[] {
  const lines = text.split(/\r?\n/);
  const all = fences(lines);
  const found: Pair[] = [];
  for (let k = 0; k + 1 < all.length; k++) {
    const ts = all[k];
    const gd = all[k + 1];
    if (!['ts', 'typescript'].includes(ts.lang) || gd.lang !== 'gdscript') {
      continue;
    }
    if (/\bnocheck\b/.test(ts.meta)) continue;
    // Only blank lines may separate the two blocks.
    const between = lines.slice(ts.end + 1, gd.start);
    if (between.some((l) => l.trim() !== '')) continue;
    found.push({
      ts: ts.body,
      gd: gd.body,
      line: ts.start + 1,
      scene: /\bscene\b/.test(ts.meta),
    });
  }
  return found;
}

const pages = [
  join(ROOT, 'README.md'),
  // The site's landing page, which opens with an example of its own.
  join(PAGES_DIR, 'index.mdx'),
  ...(existsSync(GUIDE_DIR)
    ? readdirSync(GUIDE_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => join(GUIDE_DIR, f))
    : []),
];

const converter = createBrowserConverter(
  readTypingsBundle(join(ROOT, 'typings')),
);

describe('doc examples convert as shown', () => {
  it('has guide pages', () => {
    expect(pages.length).toBeGreaterThan(1);
  });

  for (const page of pages) {
    const name = page.slice(ROOT.length + 1).replace(/\\/g, '/');
    const pagePairs = pairs(readFileSync(page, 'utf-8'));
    pagePairs.forEach((pair, index) => {
      it(`${name}:${pair.line}`, () => {
        const slug = name.replace(/[^\w]+/g, '-');
        const result = converter.convert(pair.ts, `/src/${slug}-${index}.ts`);
        const problems = result.diagnostics
          .filter((d) => !(pair.scene && NO_SCENE.test(d.message)))
          .map(
            (d) =>
              `[${d.source}/${d.severity}] ${d.message} (${d.line}:${d.column})`,
          );
        expect(problems, `${name}:${pair.line} reported diagnostics`).toEqual(
          [],
        );
        expect(normalize(result.code)).toBe(normalize(pair.gd));
      });
    });
  }
});
