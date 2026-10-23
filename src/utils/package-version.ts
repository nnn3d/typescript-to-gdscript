/**
 * Fields of the installed `typescript-to-gdscript` package, read from its
 * own `package.json`. The version is used for the CLI `--version` flag and
 * for cache invalidation, so both always report the same number; the
 * TypeScript peer range is what `tstogd init` installs.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

interface PackageJson {
  version?: unknown;
  peerDependencies?: Record<string, unknown>;
}

let cached: { path: string; json: PackageJson } | undefined;

function readPackageJson(): { path: string; json: PackageJson } {
  // Resolves relative to the compiled `dist/utils/` or the source `src/utils/`.
  const pkgPath = join(
    dirname(fileURLToPath(import.meta.url)),
    '../../package.json',
  );

  let raw: string;
  try {
    raw = readFileSync(pkgPath, 'utf-8');
  } catch (err) {
    throw new Error(
      `Cannot read the package.json: failed to read ${pkgPath} (${(err as Error).message})`,
    );
  }

  try {
    return { path: pkgPath, json: JSON.parse(raw) as PackageJson };
  } catch (err) {
    throw new Error(
      `Cannot read the package.json: ${pkgPath} is not valid JSON (${(err as Error).message})`,
    );
  }
}

function packageJson(): { path: string; json: PackageJson } {
  return (cached ??= readPackageJson());
}

/** Reads `version` from the package's `package.json` (cached after the first call). */
export function getPackageVersion(): string {
  const { path, json } = packageJson();
  const version = json.version;
  if (typeof version !== 'string' || version === '') {
    throw new Error(
      `Cannot read the package version: ${path} has no "version" field`,
    );
  }
  return version;
}

/** Reads the `typescript` peer dependency range from the package's `package.json`. */
export function getTypescriptPeerRange(): string {
  const { path, json } = packageJson();
  const range = json.peerDependencies?.typescript;
  if (typeof range !== 'string' || range === '') {
    throw new Error(
      `Cannot read the TypeScript peer range: ${path} has no "peerDependencies.typescript" field`,
    );
  }
  return range;
}
