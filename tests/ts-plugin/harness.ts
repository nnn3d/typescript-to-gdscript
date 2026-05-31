/**
 * Test harness for the tstogd TypeScript language service plugin.
 *
 * Builds a realistic-ish tsserver environment in a temp directory:
 *   - Fixture .ts / .gd.d.ts / tstogd.json / tsconfig.json files on disk.
 *   - A real `ts.LanguageService` backed by a real `LanguageServiceHost`
 *     reading those files (so the plugin's `ls.getProgram()` returns a
 *     legitimate Program with a warm TypeChecker — exactly what the
 *     plugin sees in a live IDE).
 *   - A mock `PluginCreateInfo` that plumbs `info.languageService` /
 *     `info.project.projectService.logger` through to captured helpers.
 *
 * The harness exposes the plugin-wrapped LanguageService plus utilities
 * to write/edit buffer contents, look up positions by "<marker>" tags
 * embedded in source, and snapshot the on-disk cache afterward.
 */

import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';
import initPlugin from '../../src/ts-plugin/index.ts';

export interface FixtureFile {
  /** Relative path inside the project root. */
  path: string;
  /** File content. */
  content: string;
}

export interface HarnessProject {
  /** Absolute path to the project root (temp dir). */
  rootDir: string;
  /** Wrapped LanguageService (with plugin overrides applied). */
  ls: ts.LanguageService;
  /** Raw (pre-plugin) LanguageService — for sanity comparison. */
  rawLs: ts.LanguageService;
  /** Captured `[tstogd-plugin]` log lines. */
  logs: string[];
  /** Number of times `refreshDiagnostics` was called by the plugin. */
  refreshCount: number;
  /** Edit a file's buffer content in-place (bumps the host's version). */
  writeFile(relPath: string, content: string): void;
  /** Delete the whole temp project. */
  dispose(): void;
  /** Absolute path for a relative project path. */
  abs(relPath: string): string;
}

/**
 * Create a fresh plugin-wrapped project under OS temp.
 *
 * @param files   Fixture files (paths relative to project root). Unless
 *                you include one, a default `tstogd.json` and
 *                `tsconfig.json` are written for you.
 */
export function makeProject(files: FixtureFile[]): HarnessProject {
  const rootDir = join(
    tmpdir(),
    `tstogd-plugin-test-${randomBytes(4).toString('hex')}`,
  );
  mkdirSync(rootDir, { recursive: true });

  const byPath = new Map<string, string>();
  const versions = new Map<string, number>();

  const ensureDefault = (rel: string, content: string): void => {
    if (files.some((f) => f.path === rel)) return;
    files = [...files, { path: rel, content }];
  };
  ensureDefault(
    'tstogd.json',
    JSON.stringify({ rootDir: '.', tsDir: 'src', gdDir: 'gd' }, null, 2),
  );
  ensureDefault(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          strict: true,
          noEmit: true,
          skipLibCheck: true,
        },
        include: ['src/**/*.ts'],
      },
      null,
      2,
    ),
  );

  for (const f of files) {
    const abs = join(rootDir, f.path);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, f.content);
    byPath.set(abs.replace(/\\/g, '/'), f.content);
    versions.set(abs.replace(/\\/g, '/'), 0);
  }

  // ── LanguageServiceHost ───────────────────────────────────
  const tsFiles = files
    .filter((f) => f.path.endsWith('.ts') && !f.path.endsWith('tsconfig.json'))
    .map((f) => join(rootDir, f.path));

  const host: ts.LanguageServiceHost = {
    getScriptFileNames: () => tsFiles,
    getScriptVersion: (fileName) => {
      const key = fileName.replace(/\\/g, '/');
      return String(versions.get(key) ?? 0);
    },
    getScriptSnapshot: (fileName) => {
      const key = fileName.replace(/\\/g, '/');
      let content = byPath.get(key);
      if (content === undefined) {
        if (!existsSync(fileName)) return undefined;
        content = readFileSync(fileName, 'utf-8');
      }
      return ts.ScriptSnapshot.fromString(content);
    },
    getCurrentDirectory: () => rootDir,
    getCompilationSettings: () => ({
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
    }),
    getDefaultLibFileName: (opts) => ts.getDefaultLibFilePath(opts),
    readFile: (fileName) => {
      const key = fileName.replace(/\\/g, '/');
      if (byPath.has(key)) return byPath.get(key)!;
      if (!existsSync(fileName)) return undefined;
      return readFileSync(fileName, 'utf-8');
    },
    fileExists: (fileName) => {
      const key = fileName.replace(/\\/g, '/');
      return byPath.has(key) || existsSync(fileName);
    },
    directoryExists: (dirName) => existsSync(dirName),
    getDirectories: (dirName) => {
      try {
        return require('fs')
          .readdirSync(dirName, { withFileTypes: true })
          .filter((d: { isDirectory: () => boolean }) => d.isDirectory())
          .map((d: { name: string }) => d.name);
      } catch {
        return [];
      }
    },
  };

  const rawLs = ts.createLanguageService(host, ts.createDocumentRegistry());

  // ── Plugin wrap ───────────────────────────────────────────
  const logs: string[] = [];
  let refreshCount = 0;

  const mockLogger = {
    info: (msg: string) => {
      if (typeof msg === 'string' && msg.includes('[tstogd-plugin]')) {
        logs.push(msg);
      }
    },
    msg: () => {},
    startGroup: () => {},
    endGroup: () => {},
    loggingEnabled: () => true,
    hasLevel: () => false,
    close: () => {},
    perftrc: () => {},
  };

  const mockProject = {
    projectService: { logger: mockLogger },
    // The plugin resolves its config once at `create()` via this hook,
    // mirroring tsserver's real `server.Project.getCurrentDirectory()`
    // behavior (== the tsconfig's directory for configured projects).
    getCurrentDirectory: () => rootDir,
    refreshDiagnostics: () => {
      refreshCount++;
    },
  };

  const pluginInit = initPlugin({ typescript: ts });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ls = pluginInit.create({
    languageService: rawLs,
    project: mockProject as any,
    languageServiceHost: host as any,
    serverHost: ts.sys as any,
    config: {},
  } as any);

  return {
    rootDir,
    ls,
    rawLs,
    logs,
    get refreshCount() {
      return refreshCount;
    },
    writeFile(relPath, content) {
      const abs = join(rootDir, relPath);
      const key = abs.replace(/\\/g, '/');
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, content);
      byPath.set(key, content);
      versions.set(key, (versions.get(key) ?? 0) + 1);
    },
    dispose() {
      try {
        rmSync(rootDir, { recursive: true, force: true });
      } catch {
        /* ignore */
      }
    },
    abs(relPath) {
      return resolve(rootDir, relPath);
    },
  };
}
