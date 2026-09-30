import { readFileSync, readdirSync } from 'fs';
import { join, relative, sep } from 'path';
import { TYPINGS_ROOT, type TypingsBundle } from './bundle.ts';

/**
 * Node-only: read the typings tree into the bundle the browser converter
 * takes. Never import this from browser code.
 */
export function readTypingsBundle(typingsDir: string): TypingsBundle {
  const typings: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.d.ts')) {
        const rel = relative(typingsDir, full).split(sep).join('/');
        typings[`${TYPINGS_ROOT}/${rel}`] = readFileSync(full, 'utf-8');
      }
    }
  };
  walk(typingsDir);
  return {
    typings,
    registryJson: readFileSync(
      join(typingsDir, 'godot-class-registry.json'),
      'utf-8',
    ),
  };
}
