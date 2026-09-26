import { resolve } from 'path';

/**
 * Comparison key for a filesystem path: absolute, forward slashes, and
 * lower-cased on Windows, where paths are case-insensitive.
 */
export function pathKey(file: string): string {
  const normalized = resolve(file).replace(/\\/g, '/');
  return process.platform === 'win32' ? normalized.toLowerCase() : normalized;
}

/**
 * `pathKey` of a directory with a trailing slash, so a `startsWith` test
 * means "inside" rather than "shares a prefix" — `/a/addons-extra` must
 * not count as being inside `/a/addons`.
 */
function dirKey(dir: string): string {
  return pathKey(dir).replace(/\/$/, '') + '/';
}

/** Whether `file` lies strictly inside `dir`. */
export function isInside(file: string, dir: string): boolean {
  return pathKey(file).startsWith(dirKey(dir));
}
