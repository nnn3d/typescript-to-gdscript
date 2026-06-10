import { describe, it, expect, afterEach } from 'vitest';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join, resolve, basename } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

const execFileAsync = promisify(execFile);

const CLI = resolve(__dirname, '../../src/cli/index.ts');
const FIXTURES = resolve(__dirname, '../fixtures/cli');
const TSX = resolve(__dirname, '../../node_modules/.bin/tsx');

function makeTmpDir(): string {
  const dir = join(
    tmpdir(),
    `tstogd-cli-test-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(dir, { recursive: true });
  return dir;
}

function runCli(args: string[]): Promise<{ stdout: string; stderr: string }> {
  return execFileAsync(TSX, [CLI, ...args], {
    cwd: process.cwd(),
    timeout: 30000,
    shell: process.platform === 'win32',
  });
}

function runCliRaw(
  args: string[],
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((res) => {
    execFile(
      TSX,
      [CLI, ...args],
      {
        cwd: process.cwd(),
        timeout: 30000,
        shell: process.platform === 'win32',
      },
      (err, stdout, stderr) => {
        res({
          stdout: stdout ?? '',
          stderr: stderr ?? '',
          exitCode: err ? ((err as any).code ?? 1) : 0,
        });
      },
    );
  });
}

describe('CLI: convert (TS → GD)', () => {
  let tmpDir: string;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should convert valid TS file and exit 0', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.ts');
    const result = await runCli([
      'convert',
      input,
      '--ts-dir',
      FIXTURES,
      '--gd-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    // Output file should be created
    const outputPath = join(tmpDir, 'valid.gd');
    expect(existsSync(outputPath)).toBe(true);
    // No error on stderr
    expect(result.stderr).not.toContain('[ERROR]');
  });

  it('should fail on invalid TS file and exit non-zero', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'invalid.ts');
    const result = await runCliRaw([
      'convert',
      input,
      '--ts-dir',
      FIXTURES,
      '--gd-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    // Should exit with non-zero
    expect(result.exitCode).not.toBe(0);
    // Should have error in stderr (new format: [CONV:error])
    expect(result.stderr).toContain('[CONV:error]');
    // Output file should NOT be created
    const outputPath = join(tmpDir, 'invalid.gd');
    expect(existsSync(outputPath)).toBe(false);
  });

  it('should show info messages with --debug flag', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.ts');
    const result = await runCli([
      '--debug',
      'convert',
      input,
      '--ts-dir',
      FIXTURES,
      '--gd-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    expect(result.stdout).toContain('Converting');
    expect(result.stdout).toContain('Written:');
  });

  it('should suppress info messages without --debug flag', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.ts');
    const result = await runCli([
      'convert',
      input,
      '--ts-dir',
      FIXTURES,
      '--gd-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    expect(result.stdout).not.toContain('Converting');
    expect(result.stdout).not.toContain('Written:');
  });
});

describe('CLI: convert cache modes', () => {
  let tmpDir: string;
  let cacheDir: string;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
    if (cacheDir) rmSync(cacheDir, { recursive: true, force: true });
  });

  /**
   * rootDir (tmpDir) has no node_modules and no tstogd.json, so
   * resolveConfig places the cache at
   * `<os-tmp>/typescript-to-gdscript/<basename(rootDir)>`.
   */
  function setup(): { input: string; outputPath: string } {
    tmpDir = makeTmpDir();
    cacheDir = join(tmpdir(), 'typescript-to-gdscript', basename(tmpDir));
    return {
      input: join(FIXTURES, 'valid.ts'),
      outputPath: join(tmpDir, 'valid.gd'),
    };
  }

  function convertArgs(input: string, ...extra: string[]): string[] {
    return [
      '--debug',
      'convert',
      input,
      '--ts-dir',
      FIXTURES,
      '--gd-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
      ...extra,
    ];
  }

  /**
   * Keys of the `tsToGd` section of cache.json, or [] when the manifest
   * doesn't exist. NB: cache.json itself is written unconditionally by
   * typings generation (it has its own cache section), so tests must
   * assert on `tsToGd` entries — not on the file's existence.
   */
  function tsToGdCacheKeys(): string[] {
    const manifest = join(cacheDir, 'cache.json');
    if (!existsSync(manifest)) return [];
    const data = JSON.parse(readFileSync(manifest, 'utf-8'));
    return Object.keys(data.tsToGd ?? {});
  }

  it('default: reconverts on every run (no cache read) but still writes cache', async () => {
    const { input, outputPath } = setup();

    const first = await runCliRaw(convertArgs(input));
    expect(first.exitCode).toBe(0);
    expect(first.stdout).toContain(`Written: ${outputPath}`);
    // Conversion result must be written to cache even though reads are disabled
    expect(tsToGdCacheKeys().some((k) => k.endsWith('/valid.ts'))).toBe(true);

    const second = await runCliRaw(convertArgs(input));
    expect(second.exitCode).toBe(0);
    expect(second.stdout).toContain(`Written: ${outputPath}`);
    expect(second.stdout).not.toContain('Skipped (cache)');
  }, 60000);

  it('--use-cache: second run skips conversion via cache', async () => {
    const { input, outputPath } = setup();

    const first = await runCliRaw(convertArgs(input, '--use-cache'));
    expect(first.exitCode).toBe(0);
    expect(first.stdout).toContain(`Written: ${outputPath}`);

    const second = await runCliRaw(convertArgs(input, '--use-cache'));
    expect(second.exitCode).toBe(0);
    expect(second.stdout).toContain(`Skipped (cache): ${outputPath}`);
    expect(second.stdout).not.toContain(`Written: ${outputPath}`);
  }, 60000);

  it('--no-cache: nothing written to cache dir', async () => {
    const { input } = setup();

    const result = await runCliRaw(convertArgs(input, '--no-cache'));
    expect(result.exitCode).toBe(0);
    expect(tsToGdCacheKeys().some((k) => k.endsWith('/valid.ts'))).toBe(false);
  }, 60000);
});

describe('CLI: initial-convert-gd-to-ts (GD → TS)', () => {
  let tmpDir: string;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should convert valid GD file and exit 0', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.gd');
    const result = await runCli([
      'initial-convert-gd-to-ts',
      input,
      '--gd-dir',
      FIXTURES,
      '--ts-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    // Output file should be created
    const outputPath = join(tmpDir, 'valid.ts');
    expect(existsSync(outputPath)).toBe(true);
    // No error on stderr
    expect(result.stderr).not.toContain('[ERROR]');
  });

  it('should fail on invalid GD file and exit non-zero', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'invalid.gd');
    const result = await runCliRaw([
      'initial-convert-gd-to-ts',
      input,
      '--gd-dir',
      FIXTURES,
      '--ts-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);
    // Should exit with non-zero
    expect(result.exitCode).not.toBe(0);
    // Should have error in stderr
    expect(result.stderr).toContain('[ERROR]');
    // Output file should NOT be created
    const outputPath = join(tmpDir, 'invalid.ts');
    expect(existsSync(outputPath)).toBe(false);
  });

  it('should NOT overwrite existing TS file by default and exit non-zero', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.gd');
    const outputPath = join(tmpDir, 'valid.ts');
    const preExisting = '// hand-edited — must not be overwritten\n';
    writeFileSync(outputPath, preExisting);

    const result = await runCliRaw([
      'initial-convert-gd-to-ts',
      input,
      '--gd-dir',
      FIXTURES,
      '--ts-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);

    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain('Refusing to overwrite');
    expect(result.stderr).toContain('--force');
    // Original content preserved
    expect(readFileSync(outputPath, 'utf-8')).toBe(preExisting);
  });

  it('should overwrite existing TS file when --force is passed', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.gd');
    const outputPath = join(tmpDir, 'valid.ts');
    const preExisting = '// hand-edited — should be overwritten with --force\n';
    writeFileSync(outputPath, preExisting);

    const result = await runCli([
      'initial-convert-gd-to-ts',
      input,
      '--force',
      '--gd-dir',
      FIXTURES,
      '--ts-dir',
      tmpDir,
      '--root-dir',
      tmpDir,
    ]);

    expect(result.stderr).not.toContain('Refusing to overwrite');
    // Assert the file was replaced with actually-converted content,
    // not just truncated. `valid.gd` declares `class_name ValidClass`,
    // so the converted TS must contain the class name.
    const content = readFileSync(outputPath, 'utf-8');
    expect(content).not.toBe(preExisting);
    expect(content).toContain('class ValidClass');
  });

  it('should partial-skip: write missing TS files but refuse existing ones', async () => {
    // Realistic re-run scenario: the user has hand-edited some .ts
    // files but added new .gd files since the last migration. The
    // command should write the new ones, refuse the existing ones,
    // and exit non-zero.
    tmpDir = makeTmpDir();
    const gdDir = join(tmpDir, 'gd');
    const tsDir = join(tmpDir, 'ts');
    mkdirSync(gdDir, { recursive: true });
    mkdirSync(tsDir, { recursive: true });

    // Two source .gd files with `class_name` so the converted .ts is
    // self-contained (no cross-imports needed).
    const existingGd = join(gdDir, 'existing.gd');
    const newGd = join(gdDir, 'new.gd');
    writeFileSync(
      existingGd,
      'extends Node\nclass_name ExistingClass\n\nvar a: int = 1\n',
    );
    writeFileSync(
      newGd,
      'extends Node\nclass_name NewClass\n\nvar b: int = 2\n',
    );

    // Pre-write the .ts mirror for ONLY one of them (simulating a
    // hand-edited file).
    const existingTs = join(tsDir, 'existing.ts');
    const newTs = join(tsDir, 'new.ts');
    const handEdited = '// hand-edited — must NOT be touched\n';
    writeFileSync(existingTs, handEdited);

    const result = await runCliRaw([
      'initial-convert-gd-to-ts',
      '--gd-dir',
      gdDir,
      '--ts-dir',
      tsDir,
      '--root-dir',
      tmpDir,
    ]);

    // Should exit non-zero because at least one file was skipped
    expect(result.exitCode).not.toBe(0);
    // Stderr should list ONLY the skipped path and offer --force
    expect(result.stderr).toContain('Refusing to overwrite');
    expect(result.stderr).toContain('existing.ts');
    expect(result.stderr).not.toContain('new.ts');
    expect(result.stderr).toContain('--force');

    // The hand-edited file must be preserved verbatim
    expect(readFileSync(existingTs, 'utf-8')).toBe(handEdited);
    // The new file must have been written with valid converted content
    expect(existsSync(newTs)).toBe(true);
    expect(readFileSync(newTs, 'utf-8')).toContain('class NewClass');
  });
});
