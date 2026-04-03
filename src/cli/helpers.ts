/**
 * Shared CLI helpers used by multiple commands.
 */

import {
  readdirSync,
  statSync,
  existsSync,
  writeFileSync,
  globSync,
} from 'fs';
import { join, resolve } from 'path';
import { shouldIgnore } from '../config/index.ts';
import { generateTypings } from '../typings/scenes.ts';

/** Reference to the program instance for debug flag access */
let _debugEnabled = false;

export function setDebugEnabled(enabled: boolean): void {
  _debugEnabled = enabled;
}

/** Print a message only when --debug is enabled */
export function debugLog(message: string): void {
  if (_debugEnabled) {
    console.log(message);
  }
}

/** Recursively find all .ts files (excluding .d.ts, node_modules, hidden dirs, and ignored patterns) */
export function findTsFiles(dir: string, rootDir: string, ignore: string[]): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === 'addons') continue;
      const fullPath = join(dir, entry);
      if (shouldIgnore(fullPath, rootDir, ignore)) continue;
      if (statSync(fullPath).isDirectory()) {
        results.push(...findTsFiles(fullPath, rootDir, ignore));
      } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
        results.push(fullPath);
      }
    }
  } catch {
    // skip inaccessible
  }
  return results;
}

/** Recursively find all .gd files (excluding node_modules, hidden dirs, and ignored patterns) */
export function findGdFiles(dir: string, rootDir: string, ignore: string[]): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith('.') || entry === 'node_modules' || entry === 'addons') continue;
      const fullPath = join(dir, entry);
      if (shouldIgnore(fullPath, rootDir, ignore)) continue;
      if (statSync(fullPath).isDirectory()) {
        results.push(...findGdFiles(fullPath, rootDir, ignore));
      } else if (entry.endsWith('.gd')) {
        results.push(fullPath);
      }
    }
  } catch {
    // skip inaccessible
  }
  return results;
}

/**
 * Resolve file arguments: if patterns are provided, expand them via glob;
 * otherwise return all files of the given extension in the source directory.
 */
export function resolveFiles(
  patterns: string[] | undefined,
  ext: '.ts' | '.gd',
  sourceDir: string,
  rootDir: string,
  ignore: string[],
): string[] {
  if (patterns && patterns.length > 0) {
    const files: string[] = [];
    for (const pattern of patterns) {
      const matches = globSync(pattern, {
        cwd: process.cwd(),
      }).map((m: string) => resolve(m));
      for (const match of matches) {
        const m = match.replace(/\\/g, '/');
        if (ext === '.ts' && m.endsWith('.d.ts')) continue;
        if (m.endsWith(ext) && !shouldIgnore(resolve(m), rootDir, ignore)) {
          files.push(resolve(m));
        }
      }
    }
    return files;
  }
  return ext === '.ts'
    ? findTsFiles(sourceDir, rootDir, ignore)
    : findGdFiles(sourceDir, rootDir, ignore);
}

/** Generate class typings (globals.d.ts) and scene typings (scene-typings.d.ts) */
export function generateAllTypings(cfg: {
  rootDir: string;
  tsDir: string;
  gdDir: string;
  typingsDir: string;
  scenesDir: string;
  ignore: string[];
  projectFile: string;
  tsconfig?: string;
  tsFiles?: string[];
}): void {
  const tsFiles =
    cfg.tsFiles ?? findTsFiles(cfg.tsDir, cfg.rootDir, cfg.ignore);
  if (tsFiles.length === 0) return;

  const writtenFiles = generateTypings({
    rootDir: cfg.rootDir,
    tsDir: cfg.tsDir,
    gdDir: cfg.gdDir,
    files: tsFiles,
    outputDir: cfg.typingsDir,
    scenesDir: cfg.scenesDir,
    tsConfigPath: cfg.tsconfig ? resolve(cfg.tsconfig) : undefined,
    ignore: cfg.ignore,
    projectFile: cfg.projectFile,
  });
  debugLog(
    `Generated ${writtenFiles.length} typings files in ${cfg.typingsDir}`,
  );
}

/** Helper functions for generate-gdscript-global-typings and set-latest commands */

import { mkdirSync } from 'fs';

export function writeVersionIndexDts(versionDir: string): void {
  const content = `/// <reference path="../_globals/globals.d.ts" />\n/// <reference path="../_globals/gd-helpers.d.ts" />\n/// <reference path="classes/index.d.ts" />\n`;
  writeFileSync(join(versionDir, 'index.d.ts'), content);
}

export function writeLatestIndexDts(latestDir: string, version: string): void {
  mkdirSync(latestDir, { recursive: true });
  const content = `// @version ${version}\n/// <reference path="../${version}/index.d.ts" />\n`;
  writeFileSync(join(latestDir, 'index.d.ts'), content);
}

export function getAvailableVersions(typingsRoot: string): string[] {
  if (!existsSync(typingsRoot)) return [];
  return readdirSync(typingsRoot).filter((name) => {
    if (name === 'latest' || name.endsWith('.d.ts') || name.endsWith('.ts'))
      return false;
    const fullPath = join(typingsRoot, name);
    return (
      statSync(fullPath).isDirectory() &&
      (existsSync(join(fullPath, 'classes')) ||
        existsSync(join(fullPath, 'godot.d.ts')))
    );
  });
}
