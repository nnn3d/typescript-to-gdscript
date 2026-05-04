import { resolve } from 'path';
import { validateGdProject } from '../godot-validate/index.ts';
import type { TransformDiagnostic } from '../converter/common/index.ts';

export interface GodotProjectCheckOptions {
  projectRoot: string;
  godotPath: string;
  gdDir: string;
  cacheDir?: string;
  /** Built during the conversion pass: normalizedGdPath → { sourceMapJson, tsFilePath } */
  sourceMapTable: Map<string, { sourceMapJson?: string; tsFilePath?: string }>;
  signal?: AbortSignal;
}

export async function runGodotProjectCheck(
  opts: GodotProjectCheckOptions,
): Promise<TransformDiagnostic[]> {
  const result = await validateGdProject({
    projectRoot: opts.projectRoot,
    godotPath: opts.godotPath,
    gdDir: resolve(opts.gdDir),
    sourceMapTable: opts.sourceMapTable,
    cacheDir: opts.cacheDir,
    signal: opts.signal,
  });
  return result.diagnostics;
}
