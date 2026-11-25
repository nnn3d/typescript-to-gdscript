import { describe, it, expect } from 'vitest';
import { spawn } from 'child_process';
import { createRequire } from 'module';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { withAgentInstructions } from '../../src/cli/init.js';
import { resolveConfig } from '../../src/config/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const TSX = pathToFileURL(createRequire(import.meta.url).resolve('tsx')).href;

/** Runs `tstogd init` in `cwd`, giving the next answer at each prompt. */
function runInit(cwd: string, answers: string[]): Promise<number | null> {
  const child = spawn(
    process.execPath,
    ['--import', TSX, join(ROOT, 'src', 'cli', 'index.ts'), 'init'],
    { cwd, stdio: ['pipe', 'pipe', 'inherit'] },
  );
  const left = [...answers];
  let shown = '';
  child.stdout.on('data', (chunk: Buffer) => {
    shown += chunk.toString();
    if (!/(\)|\]): $/.test(shown)) return;
    shown = '';
    child.stdin.write(`${left.shift() ?? ''}\n`);
  });
  return new Promise((done) => child.on('close', done));
}

describe('tstogd init: tstogd.json', () => {
  // A missing `gdDir` means `scripts`, not "the same as tsDir".
  it.each(['src', 'scripts'])(
    'keeps %s for both TypeScript and GDScript',
    async (folder) => {
      const dir = mkdtempSync(join(tmpdir(), 'tstogd-init-'));
      try {
        // Steps whose file is already there ask nothing.
        writeFileSync(join(dir, 'tsconfig.json'), '{}');
        writeFileSync(join(dir, '.gitignore'), 'node_modules/\n');
        writeFileSync(join(dir, 'AGENTS.md'), withAgentInstructions('')!);
        expect(await runInit(dir, [folder, folder, 'types'])).toBe(0);

        const config = resolveConfig({ configDir: dir });
        expect(config.tsDir).toBe(join(dir, folder));
        expect(config.gdDir).toBe(join(dir, folder));
        expect(config.typingsDir).toBe(join(dir, 'types'));
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    },
    30000,
  );
});

describe('tstogd init: AGENTS.md', () => {
  it('creates the section when there is no file', () => {
    const content = withAgentInstructions('');
    expect(content).toMatch(/^## tstogd/);
    expect(content).toMatch(/[^\n]\n$/);
  });

  it('appends the section and keeps what is there', () => {
    const content = withAgentInstructions('# My game\n\nUse tabs.\n\n');
    expect(content).toMatch(/^# My game\n\nUse tabs\.\n\n## tstogd/);
  });

  it('leaves a file that already points to SYNTAX.md alone', () => {
    const content = withAgentInstructions('# My game\n');
    expect(withAgentInstructions(content!)).toBeNull();
  });

  // Layouts differ, and tstogd.json can change after init.
  it('names no project folder', () => {
    expect(withAgentInstructions('')).not.toMatch(/src\/|scripts\/|_typings/);
  });

  it('points to a file the package ships', () => {
    const path = /node_modules\/typescript-to-gdscript\/([\w.]+)/.exec(
      withAgentInstructions('')!,
    )![1];
    expect(existsSync(join(ROOT, path))).toBe(true);
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
    expect(pkg.files).toContain(path);
  });
});
