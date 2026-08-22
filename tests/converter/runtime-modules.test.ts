import { afterEach, describe, expect, it } from 'vitest';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { randomBytes } from 'crypto';
import { join } from 'path';
import { tmpdir } from 'os';
import { convertRuntimeModules } from '../../src/index.ts';

let tmpDir: string;

afterEach(() => {
  if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
});

describe('convertRuntimeModules', () => {
  it('converts value-imported package sources for the configured Godot project', () => {
    tmpDir = join(
      tmpdir(),
      `tstogd-runtime-modules-${randomBytes(4).toString('hex')}`,
    );
    const sourceRoot = join(tmpDir, 'typescript');
    const projectRoot = join(tmpDir, 'godot');
    const tsDir = join(sourceRoot, 'src');
    const gdDir = join(projectRoot, 'scripts');
    const packageDir = join(sourceRoot, 'node_modules/@scope/shared');
    const entryPath = join(tsDir, 'main.ts');
    const tsConfigPath = join(sourceRoot, 'tsconfig.json');

    mkdirSync(join(packageDir, 'src'), { recursive: true });
    mkdirSync(tsDir, { recursive: true });
    writeFileSync(
      join(packageDir, 'package.json'),
      JSON.stringify({
        name: '@scope/shared',
        version: '1.2.3',
        exports: './src/index.ts',
      }),
    );
    writeFileSync(
      join(packageDir, 'src/base.ts'),
      'export class _Base extends Object {}\n',
    );
    writeFileSync(
      join(packageDir, 'src/index.ts'),
      "import { _Base } from './base';\nexport class _Shared extends _Base {}\n",
    );
    writeFileSync(
      entryPath,
      "import { _Shared as Shared } from '@scope/shared';\nexport class Main extends Shared {}\n",
    );
    writeFileSync(
      tsConfigPath,
      JSON.stringify({
        compilerOptions: {
          module: 'esnext',
          moduleResolution: 'bundler',
          noEmit: true,
        },
        include: ['src/main.ts'],
      }),
    );

    const modules = convertRuntimeModules({
      entryFiles: [entryPath],
      rootDir: tsDir,
      tsDir,
      gdDir,
      projectRoot,
      tsConfigPath,
    });

    const entryOutput = join(gdDir, 'main.gd');
    const sharedOutput = join(
      projectRoot,
      '.tstogd_modules/@scope/shared/1.2.3/src/index.gd',
    );
    const baseOutput = join(
      projectRoot,
      '.tstogd_modules/@scope/shared/1.2.3/src/base.gd',
    );
    const entry = modules.find((module) => module.outputPath === entryOutput);

    expect(entry?.outputPath).toBe(entryOutput);
    expect(entry?.result.code).toContain(
      'preload("res://.tstogd_modules/@scope/shared/1.2.3/src/index.gd")',
    );
    expect(modules.map((module) => module.outputPath)).toContain(sharedOutput);
    expect(modules.map((module) => module.outputPath)).toContain(baseOutput);
  });
});
