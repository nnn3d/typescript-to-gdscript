import ts from 'typescript';

/**
 * A compiler host over an in-memory file map, for environments with no
 * filesystem (the browser playground).
 *
 * Parsed files are cached by path and text. TypeScript only reuses a
 * file from `oldProgram` when the host hands back the very same
 * `SourceFile` object, so without the cache every rebuild would re-parse
 * the whole Godot typings tree.
 *
 * Files are never evicted (one entry per path), and the cache assumes fixed
 * compiler options: it ignores the `languageVersion` options and
 * `shouldCreateNewSourceFile` that TypeScript passes to `getSourceFile`.
 */
export interface MemoryHost extends ts.CompilerHost {
  /** Add a file or replace its text. */
  setFile(path: string, text: string): void;
}

export function createMemoryHost(files: Map<string, string>): MemoryHost {
  const parsed = new Map<string, { text: string; sourceFile: ts.SourceFile }>();
  const dirs = new Set<string>();
  const addDirs = (path: string) => {
    for (
      let dir = parentDir(path);
      dir && !dirs.has(dir);
      dir = parentDir(dir)
    ) {
      dirs.add(dir);
    }
  };
  for (const path of files.keys()) addDirs(path);

  return {
    setFile(path, text) {
      files.set(path, text);
      addDirs(path);
    },
    getSourceFile(fileName, languageVersion) {
      const text = files.get(fileName);
      if (text === undefined) return undefined;
      const hit = parsed.get(fileName);
      if (hit && hit.text === text) return hit.sourceFile;
      const sourceFile = ts.createSourceFile(fileName, text, languageVersion);
      parsed.set(fileName, { text, sourceFile });
      return sourceFile;
    },
    fileExists: (fileName) => files.has(fileName),
    readFile: (fileName) => files.get(fileName),
    directoryExists: (dir) => dir === '/' || dirs.has(dir.replace(/\/$/, '')),
    getDirectories: () => [],
    getDefaultLibFileName: () => '/lib.d.ts',
    getCurrentDirectory: () => '/',
    getCanonicalFileName: (fileName) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    writeFile: () => {},
  };
}

function parentDir(path: string): string {
  const slash = path.lastIndexOf('/');
  return slash > 0 ? path.slice(0, slash) : '';
}
