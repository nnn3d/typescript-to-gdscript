import { describe, it, expect, afterEach } from 'vitest';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

const execFileAsync = promisify(execFile);

const CLI = resolve(__dirname, '../../src/cli/index.ts');
const FIXTURES = resolve(__dirname, '../fixtures/cli');
const TSX = resolve(__dirname, '../../node_modules/.bin/tsx');

function makeTmpDir(): string {
  const dir = join(
    tmpdir(),
    `ts2gd-cli-test-${randomBytes(4).toString('hex')}`,
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
      { cwd: process.cwd(), timeout: 30000, shell: process.platform === 'win32' },
      (err, stdout, stderr) => {
        res({
          stdout: stdout ?? '',
          stderr: stderr ?? '',
          exitCode: err ? (err as any).code ?? 1 : 0,
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
    // Should have error in stderr
    expect(result.stderr).toContain('[ERROR]');
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

describe('CLI: convert-gd (GD → TS)', () => {
  let tmpDir: string;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should convert valid GD file and exit 0', async () => {
    tmpDir = makeTmpDir();
    const input = join(FIXTURES, 'valid.gd');
    const result = await runCli([
      'convert-gd',
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
      'convert-gd',
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
});
