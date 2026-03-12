import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

interface CacheEntry {
  sourceHash: string;
  outputHash: string;
  outputPath: string;
}

interface CacheData {
  version: string;
  entries: Record<string, CacheEntry>;
}

const CACHE_VERSION = '1';

export class FileCache {
  private cacheDir: string;
  private cacheFile: string;
  private data: CacheData;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
    this.cacheFile = join(cacheDir, 'cache.json');
    this.data = this.load();
  }

  private load(): CacheData {
    if (existsSync(this.cacheFile)) {
      try {
        const raw = readFileSync(this.cacheFile, 'utf-8');
        const data = JSON.parse(raw) as CacheData;
        if (data.version === CACHE_VERSION) {
          return data;
        }
      } catch {
        // Corrupted cache; start fresh
      }
    }
    return { version: CACHE_VERSION, entries: {} };
  }

  save(): void {
    mkdirSync(this.cacheDir, { recursive: true });
    writeFileSync(this.cacheFile, JSON.stringify(this.data, null, 2));
  }

  /** Check if a source file needs recompilation */
  needsUpdate(sourcePath: string): boolean {
    const entry = this.data.entries[sourcePath];
    if (!entry) return true;

    try {
      const currentHash = this.hashFile(sourcePath);
      return currentHash !== entry.sourceHash;
    } catch {
      return true;
    }
  }

  /** Check if the output file has been modified externally */
  outputModified(sourcePath: string): boolean {
    const entry = this.data.entries[sourcePath];
    if (!entry) return false;

    try {
      const currentOutputHash = this.hashFile(entry.outputPath);
      return currentOutputHash !== entry.outputHash;
    } catch {
      return false;
    }
  }

  /** Update cache entry after successful compilation */
  update(sourcePath: string, outputPath: string): void {
    this.data.entries[sourcePath] = {
      sourceHash: this.hashFile(sourcePath),
      outputHash: this.hashFile(outputPath),
      outputPath,
    };
  }

  /** Remove a cache entry */
  remove(sourcePath: string): void {
    delete this.data.entries[sourcePath];
  }

  /** Get the output path for a cached source file */
  getOutputPath(sourcePath: string): string | undefined {
    return this.data.entries[sourcePath]?.outputPath;
  }

  private hashFile(filePath: string): string {
    const content = readFileSync(filePath);
    return createHash('sha256').update(content).digest('hex');
  }
}
