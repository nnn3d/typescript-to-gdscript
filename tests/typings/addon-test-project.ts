/**
 * Throwaway Godot projects for the addon typings tests. Not a test file
 * itself (no `.test.ts` suffix), so vitest never collects it.
 */

import { afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readdirSync } from 'fs';
import { tmpdir } from 'os';
import { join, resolve, relative } from 'path';

const REPO_TYPINGS = resolve(__dirname, '../../typings');

/** Whether a path lies in the pipeline's own temp tree (not a test project). */
export const inPipelineTemp = (p: string) => /tstogd-addon-(?!test-)/.test(p);

const created: string[] = [];

/** Register cleanup of every project made in the calling test file. */
export function cleanUpProjectsAfterEach(): void {
  afterEach(() => {
    while (created.length) {
      rmSync(created.pop()!, { recursive: true, force: true });
    }
  });
}

/** Build a throwaway Godot project with the given sources and a tsconfig that sees the Godot typings. */
export function makeProject(files: Record<string, string>): {
  rootDir: string;
  outputDir: string;
  tsConfigPath: string;
} {
  const rootDir = mkdtempSync(join(tmpdir(), 'tstogd-addon-test-'));
  created.push(rootDir);

  for (const [rel, content] of Object.entries(files)) {
    const abs = join(rootDir, rel);
    mkdirSync(join(abs, '..'), { recursive: true });
    writeFileSync(abs, content);
  }

  const outputDir = join(rootDir, 'types');
  mkdirSync(outputDir, { recursive: true });

  const tsConfigPath = join(rootDir, 'tsconfig.json');
  writeFileSync(
    tsConfigPath,
    JSON.stringify({
      compilerOptions: {
        target: 'esnext',
        module: 'esnext',
        moduleResolution: 'classic',
        allowImportingTsExtensions: true,
        noLib: true,
        strict: true,
        noEmit: true,
        types: [],
      },
      // Relative — TypeScript's `include` does not reliably honour
      // absolute paths, and a tsconfig that silently fails to pull in the
      // typings would make these tests assert against unresolved names.
      include: [
        relative(rootDir, REPO_TYPINGS).replace(/\\/g, '/'),
        './types/**/*.d.ts',
      ],
    }),
  );

  return { rootDir, outputDir, tsConfigPath };
}

/** A project directory with no tsconfig pointing at the typings — for misconfiguration cases. */
export function makeBareProject(): string {
  const rootDir = mkdtempSync(join(tmpdir(), 'tstogd-addon-test-'));
  created.push(rootDir);
  return rootDir;
}

/** Every file under `dir`, as paths relative to it. */
export function walk(dir: string, prefix = ''): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out;
}
