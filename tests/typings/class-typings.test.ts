import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { generateClassTypings } from '../../src/typings/classes.js';

const CROSS_FILE_DIR = join(__dirname, 'cross-file');
const OUTPUT_PATH = join(CROSS_FILE_DIR, 'globals.d.ts');
const TSCONFIG_PATH = join(CROSS_FILE_DIR, 'tsconfig.json');

const sourceFiles = [
  join(CROSS_FILE_DIR, 'Animal.ts'),
  join(CROSS_FILE_DIR, 'Dog.ts'),
  join(CROSS_FILE_DIR, 'DogOwner.ts'),
];

describe('Class typings generation', () => {
  it('should generate globals .d.ts with import + declare global pattern', () => {
    generateClassTypings({
      rootDir: CROSS_FILE_DIR,
      files: sourceFiles,
      outputPath: OUTPUT_PATH,
    });

    const content = readFileSync(OUTPUT_PATH, 'utf-8');

    // Should have imports for each class
    expect(content).toContain('import _Animal from "./Animal.js";');
    expect(content).toContain('import _Dog from "./Dog.js";');
    expect(content).toContain('import _DogOwner from "./DogOwner.js";');

    // Should have declare global block with class declarations
    expect(content).toContain('declare global {');
    expect(content).toContain('class Animal extends _Animal {}');
    expect(content).toContain('class Dog extends _Dog {}');
    expect(content).toContain('class DogOwner extends _DogOwner {}');
    expect(content).toContain('export {};');

    // Should NOT contain any member declarations (no duplication)
    expect(content).not.toContain('name: string');
    expect(content).not.toContain('speak(');
    expect(content).not.toContain('bark(');
    expect(content).not.toContain('constructor(');
  });

  it('should compile cross-file references with generated globals', () => {
    generateClassTypings({
      rootDir: CROSS_FILE_DIR,
      files: sourceFiles,
      outputPath: OUTPUT_PATH,
    });

    try {
      execSync(`npx tsc -p "${TSCONFIG_PATH}"`, {
        cwd: resolve(__dirname, '../..'),
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (err: any) {
      const output = (err.stdout || '') + (err.stderr || '');
      expect.fail(
        `Cross-file type checking failed:\n${output}`
      );
    }
  });
});
