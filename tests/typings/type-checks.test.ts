import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join } from 'path';
import { readdirSync } from 'fs';

const TYPE_CHECKS_DIR = join(__dirname, 'type-checks');
const TSCONFIG_PATH = join(TYPE_CHECKS_DIR, 'tsconfig.json');

describe('Typings: type checks', () => {
  it('should compile all type-check files with no errors', () => {
    try {
      execSync(`npx tsc -p "${TSCONFIG_PATH}"`, {
        cwd: join(__dirname, '../..'),
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (err: any) {
      const output = (err.stdout || '') + (err.stderr || '');
      expect.fail(`TypeScript type checks failed:\n${output}`);
    }
  });

  it('should have type-check files covering key areas', () => {
    const files = readdirSync(TYPE_CHECKS_DIR)
      .filter((f) => f.endsWith('.ts'))
      .map((f) => f.replace('.ts', ''));

    expect(files).toContain('gd-helpers');
    expect(files).toContain('arrays');
    expect(files).toContain('dictionary');
    expect(files).toContain('classes');
    expect(files).toContain('corner-cases');
    expect(files).toContain('singletons');
  });
});
