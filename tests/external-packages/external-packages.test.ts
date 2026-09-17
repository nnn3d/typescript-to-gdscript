import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  realpathSync,
  readlinkSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { dirname, join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import {
  linkExternalPackages,
  resolveExternalPackages,
} from '../../src/external-packages/index.ts';

let tempDir: string;

beforeEach(() => {
  tempDir = join(
    tmpdir(),
    `tstogd-external-packages-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(tempDir, { recursive: true });
});

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true });
});

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

function createLibrary(
  rootDir: string,
  name: string,
  dependencies: Record<string, string> = {},
): void {
  writeJson(join(rootDir, 'package.json'), {
    name,
    version: '1.0.0',
    dependencies,
  });
  writeJson(join(rootDir, 'tstogd.json'), {
    lib: true,
    tsDir: 'src',
    gdDir: 'dist/godot',
  });
  mkdirSync(join(rootDir, 'src'), { recursive: true });
  mkdirSync(join(rootDir, 'dist/godot'), { recursive: true });
}

describe('external package linking', () => {
  it('discovers declared libraries and their library dependencies', () => {
    const projectRoot = join(tempDir, 'project');
    const sharedRoot = join(projectRoot, 'node_modules/@scope/shared');
    const nestedRoot = join(sharedRoot, 'node_modules/nested-lib');
    writeJson(join(projectRoot, 'package.json'), {
      dependencies: { '@scope/shared': '1.0.0' },
    });
    createLibrary(sharedRoot, '@scope/shared', { 'nested-lib': '1.0.0' });
    createLibrary(nestedRoot, 'nested-lib');

    const packages = linkExternalPackages({
      rootDir: projectRoot,
      projectRoot,
      externalPackages: [],
    });

    expect(packages.map((pkg) => pkg.mountName).sort()).toEqual([
      '@scope/shared',
      'nested-lib',
    ]);
    const sharedLink = join(projectRoot, 'tstogd_modules/@scope/shared');
    const nestedLink = join(projectRoot, 'tstogd_modules/nested-lib');
    expect(lstatSync(sharedLink).isSymbolicLink()).toBe(true);
    expect(lstatSync(nestedLink).isSymbolicLink()).toBe(true);
    expect(existsSync(join(projectRoot, 'node_modules/.gdignore'))).toBe(true);
    expect(
      realpathSync(resolve(dirname(sharedLink), readlinkSync(sharedLink))),
    ).toBe(realpathSync(sharedRoot));
  });

  it('links a plain folder under a custom mount name', () => {
    const projectRoot = join(tempDir, 'project');
    const sharedRoot = join(tempDir, 'plain-shared');
    const nestedRoot = join(sharedRoot, 'node_modules/nested-lib');
    mkdirSync(projectRoot, { recursive: true });
    createLibrary(sharedRoot, 'plain-shared', { 'nested-lib': '1.0.0' });
    createLibrary(nestedRoot, 'nested-lib');

    const packages = linkExternalPackages({
      rootDir: projectRoot,
      projectRoot,
      externalPackages: [{ from: '../plain-shared', to: 'custom/shared' }],
    });

    expect(packages[0]?.mountName).toBe('custom/shared');
    expect(packages.map((pkg) => pkg.mountName)).toContain('nested-lib');
    expect(
      lstatSync(
        join(projectRoot, 'tstogd_modules/custom/shared'),
      ).isSymbolicLink(),
    ).toBe(true);
  });

  it('removes stale links from the managed directory', () => {
    const projectRoot = join(tempDir, 'project');
    const oldRoot = join(tempDir, 'old-lib');
    mkdirSync(projectRoot, { recursive: true });
    createLibrary(oldRoot, 'old-lib');

    linkExternalPackages({
      rootDir: projectRoot,
      projectRoot,
      externalPackages: [{ from: '../old-lib' }],
    });
    const oldLink = join(projectRoot, 'tstogd_modules/old-lib');
    expect(existsSync(oldLink)).toBe(true);

    linkExternalPackages({
      rootDir: projectRoot,
      projectRoot,
      externalPackages: [],
    });
    expect(existsSync(oldLink)).toBe(false);
  });

  it('rejects an explicit package that is not a library', () => {
    const projectRoot = join(tempDir, 'project');
    const sharedRoot = join(tempDir, 'plain-shared');
    mkdirSync(projectRoot, { recursive: true });
    writeJson(join(sharedRoot, 'tstogd.json'), { tsDir: 'src' });

    expect(() =>
      resolveExternalPackages({
        rootDir: projectRoot,
        projectRoot,
        externalPackages: [{ from: '../plain-shared' }],
      }),
    ).toThrow('must set "lib": true');
  });

  it('rejects package mounts that contain another package mount', () => {
    const projectRoot = join(tempDir, 'project');
    const firstRoot = join(tempDir, 'first');
    const secondRoot = join(tempDir, 'second');
    mkdirSync(projectRoot, { recursive: true });
    createLibrary(firstRoot, 'first');
    createLibrary(secondRoot, 'second');

    expect(() =>
      linkExternalPackages({
        rootDir: projectRoot,
        projectRoot,
        externalPackages: [
          { from: '../first', to: 'shared' },
          { from: '../second', to: 'shared/nested' },
        ],
      }),
    ).toThrow('cannot contain each other');
    expect(existsSync(join(projectRoot, 'tstogd_modules'))).toBe(false);
  });
});
