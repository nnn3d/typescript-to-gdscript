import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { resolve } from 'path';

const ROOT = resolve(__dirname, '..');

describe('TypeScript type checking', () => {
  it('should have no type errors in src/', () => {
    try {
      execSync('npx tsc --noEmit', {
        cwd: ROOT,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (err: any) {
      const output = (err.stdout || '') + (err.stderr || '');
      expect.fail(`tsc --noEmit failed:\n${output}`);
    }
  });
});
