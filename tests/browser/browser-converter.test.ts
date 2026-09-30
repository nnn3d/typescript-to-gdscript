import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createBrowserConverter } from '../../src/browser/index.js';
import { readTypingsBundle } from '../../src/browser/read-typings.js';
import {
  FIXTURES_EXPECTING_DIAGNOSTICS,
  isProblemDiagnostic,
  listFixtures,
  normalize,
} from '../converter/fixture-harness.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FIXTURES_DIR = join(ROOT, 'tests', 'fixtures', 'ts-to-gd');

/**
 * Fixtures that need a second file: an import, a `*.gd.d.ts` mirror, or
 * a script class another fixture declares. The playground converts one
 * file, so these stay covered by the Node harness only.
 */
const MULTI_FILE_FIXTURES = new Set<string>([
  'extends-path', // extends a script by res:// path declared elsewhere
  'merged-namespaces', // needs its merged-namespaces.gd.d.ts mirror
  'super-global-child', // extends SuperScriptParent, declared in another fixture
  'super-preload-child', // extends a script by res:// path declared elsewhere
  'super-script-child', // imports ./super-script-parent.ts
]);

const converter = createBrowserConverter(
  readTypingsBundle(join(ROOT, 'typings')),
);

function render(
  diagnostics: ReturnType<typeof converter.convert>['diagnostics'],
): string {
  return diagnostics
    .map(
      (d) => `[${d.source}/${d.severity}] ${d.message} (${d.line}:${d.column})`,
    )
    .join('\n');
}

const fixtures = listFixtures(FIXTURES_DIR);

describe('browser converter matches the Node fixtures', () => {
  it('skips only fixtures that exist', () => {
    for (const name of MULTI_FILE_FIXTURES) expect(fixtures).toContain(name);
  });

  for (const name of fixtures) {
    if (MULTI_FILE_FIXTURES.has(name)) continue;
    it(name, () => {
      const result = converter.convert(
        readFileSync(join(FIXTURES_DIR, `${name}.ts`), 'utf-8'),
        `/src/${name}.ts`,
      );
      const problems = render(result.diagnostics.filter(isProblemDiagnostic));
      if (FIXTURES_EXPECTING_DIAGNOSTICS.has(name)) {
        expect(problems, `${name} should report a diagnostic`).not.toBe('');
      } else {
        expect(problems, `${name} reported diagnostics`).toBe('');
      }
      expect(normalize(result.code)).toBe(
        normalize(readFileSync(join(FIXTURES_DIR, `${name}.gd`), 'utf-8')),
      );
    });
  }
});

describe('createBrowserConverter', () => {
  // A renamed import is the shape that resolves the module path.
  it('reports a missing import as a diagnostic instead of throwing', () => {
    const result = converter.convert(
      "import { B as C } from './b';\nexport class A {}\n",
    );
    const messages = result.diagnostics
      .filter((d) => d.source === 'ts')
      .map((d) => d.message);
    expect(messages.join('\n')).toMatch(/TS(2792|2307)/);
  });

  it('rejects a file name that is not an absolute virtual path', () => {
    expect(() => converter.convert('export class A {}', 'main.ts')).toThrow(
      /absolute virtual path: main\.ts/,
    );
  });

  it('reports every diagnostic against the virtual file name', () => {
    const result = converter.convert('export class A { x: Foo }', '/src/a.ts');
    expect(result.diagnostics.length).toBeGreaterThan(0);
    for (const d of result.diagnostics) expect(d.file).toBe('/src/a.ts');
  });

  it('requires the typings index in the bundle', () => {
    const bundle = readTypingsBundle(join(ROOT, 'typings'));
    delete bundle.typings['/typings/index.d.ts'];
    expect(() => createBrowserConverter(bundle)).toThrow(
      /no \/typings\/index\.d\.ts/,
    );
  });
});

const EXAMPLES_DIR = join(ROOT, 'site', 'src', 'playground', 'examples');

describe('playground examples convert cleanly', () => {
  const examples = existsSync(EXAMPLES_DIR)
    ? readdirSync(EXAMPLES_DIR).filter((f) => f.endsWith('.ts'))
    : [];

  it('has examples', () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  for (const file of examples) {
    it(file, () => {
      const result = converter.convert(
        readFileSync(join(EXAMPLES_DIR, file), 'utf-8'),
        `/src/${file}`,
      );
      expect(render(result.diagnostics), `${file} reported diagnostics`).toBe(
        '',
      );
      expect(result.code.trim()).not.toBe('');
    });
  }
});
