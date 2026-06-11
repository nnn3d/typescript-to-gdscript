import { describe, it, expect, afterEach } from 'vitest';
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import { Watcher } from '../../src/watcher/index.ts';

// ─── Helpers ────────────────────────────────────────────────

function makeTmpDir(label: string): string {
  const dir = join(
    tmpdir(),
    `tstogd-${label}-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  return dir;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitFor<T>(
  predicate: () => T | undefined,
  timeout = 3000,
  step = 50,
): Promise<T | undefined> {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const v = predicate();
    if (v) return v;
    if (Date.now() - start > timeout) return v;
    await sleep(step);
  }
}

// ─── Tests ──────────────────────────────────────────────────

describe('Watcher self-heal: error-driven reconversion of stale dependents', () => {
  let tmpDir: string;
  let watcher: Watcher | null = null;

  afterEach(async () => {
    if (watcher) {
      await watcher.stop();
      watcher = null;
    }
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('re-kinding a dep class→interface heals the dependent .gd via the check cycle', async () => {
    tmpDir = makeTmpDir('watcher-heal');
    const tsDir = join(tmpDir, 'src');
    const gdDir = join(tmpDir, 'out');
    const cacheDir = join(tmpDir, 'cache');
    mkdirSync(tsDir, { recursive: true });

    // tsconfig is required for the check phase's TS diagnostics — the
    // fresh TS error in a.ts is what triggers the heal.
    const tsConfigPath = join(tmpDir, 'tsconfig.json');
    writeFileSync(
      tsConfigPath,
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          noEmit: true,
          strict: false,
          skipLibCheck: true,
        },
        include: ['src/**/*.ts'],
      }),
    );

    const bPath = join(tsDir, 'b.ts');
    const aPath = join(tsDir, 'a.ts');
    writeFileSync(
      bPath,
      ['export class Foo extends Object {', '  x: number = 1;', '}'].join('\n'),
    );
    writeFileSync(
      aPath,
      [
        "import { Foo } from './b.ts';",
        '',
        'export class A extends Object {',
        '  field: Foo = new Foo();',
        '}',
      ].join('\n'),
    );

    watcher = new Watcher({
      rootDir: tmpDir,
      tsDir,
      gdDir,
      cacheDir,
      tsConfigPath,
    });
    watcher.start();

    const aGdPath = join(gdDir, 'a.gd');
    const bGdPath = join(gdDir, 'b.gd');

    // Initial scan: both files convert; `Foo` is a class, so a.gd gets
    // the type annotation.
    const initial = await waitFor(() => {
      if (!existsSync(aGdPath) || !existsSync(bGdPath)) return undefined;
      const txt = readFileSync(aGdPath, 'utf-8');
      return txt.includes('var field: Foo = Foo.new()') ? txt : undefined;
    }, 8000);
    expect(initial).toBeTruthy();

    // Let the first diagnostic check finish so the signature baseline is
    // established (check debounce is 1s).
    await sleep(2500);

    // Re-kind Foo: class → interface. a.ts is NOT touched. Its correct
    // output changes (annotation must be dropped — `var x: Foo` would
    // reference a vanished class_name), and a fresh TS error appears in
    // a.ts (`new Foo()` on an interface) which triggers the heal.
    writeFileSync(
      bPath,
      [
        'export interface Foo {',
        '  x: number;',
        '}',
        '',
        'export class _B extends Object {',
        '}',
      ].join('\n'),
    );

    // The watcher converts b (the changed file), the debounced check
    // sees the new error in a.ts, reconverts a in memory, and rewrites
    // a.gd with the annotation dropped — all without a.ts changing.
    const healed = await waitFor(() => {
      const txt = readFileSync(aGdPath, 'utf-8');
      return txt.includes('var field = Foo.new()') &&
        !txt.includes('var field: Foo')
        ? txt
        : undefined;
    }, 12000);
    expect(healed).toBeTruthy();

    // Stability: no oscillation — subsequent cycles must not flip the
    // file back or keep rewriting it.
    const after = readFileSync(aGdPath, 'utf-8');
    await sleep(2000);
    expect(readFileSync(aGdPath, 'utf-8')).toBe(after);
  }, 30000);
});
