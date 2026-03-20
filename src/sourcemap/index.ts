import {
  SourceMapGenerator,
  SourceMapConsumer,
  type RawSourceMap,
  type MappingItem,
} from 'source-map';

export interface Mapping {
  /** Original source file */
  source: string;
  /** Original line (1-based) */
  originalLine: number;
  /** Original column (0-based) */
  originalColumn: number;
  /** Generated line (1-based) */
  generatedLine: number;
  /** Generated column (0-based) */
  generatedColumn: number;
  /** Optional name */
  name?: string;
}

export class SourceMapper {
  private generator: SourceMapGenerator;
  private sourceFile: string;

  constructor(sourceFile: string, generatedFile: string) {
    this.sourceFile = sourceFile;
    this.generator = new SourceMapGenerator({
      file: generatedFile,
    });
  }

  addMapping(mapping: Mapping): void {
    this.generator.addMapping({
      source: mapping.source,
      original: { line: mapping.originalLine, column: mapping.originalColumn },
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn,
      },
      name: mapping.name,
    });
  }

  addSourceContent(source: string, content: string): void {
    this.generator.setSourceContent(source, content);
  }

  toJSON(): RawSourceMap {
    return this.generator.toJSON();
  }

  toString(): string {
    return this.generator.toString();
  }
}

/**
 * Position in a source file — line is 1-based, column is 0-based.
 */
export interface SourcePosition {
  line: number;
  column: number;
  source?: string | null;
  name?: string | null;
}

/**
 * Reads a source map and provides lookup methods.
 * Used for verification and for mapping GDScript LSP errors back to TS.
 */
export class SourceMapReader {
  private consumer: SourceMapConsumer;

  private constructor(consumer: SourceMapConsumer) {
    this.consumer = consumer;
  }

  static async fromJSON(
    rawMap: RawSourceMap | string,
  ): Promise<SourceMapReader> {
    const json =
      typeof rawMap === 'string'
        ? (JSON.parse(rawMap) as RawSourceMap)
        : rawMap;
    const consumer = await new SourceMapConsumer(json);
    return new SourceMapReader(consumer);
  }

  /**
   * Given a position in the generated (GDScript) file, find the original (TS) position.
   */
  originalPositionFor(
    generatedLine: number,
    generatedColumn: number,
  ): SourcePosition {
    const result = this.consumer.originalPositionFor({
      line: generatedLine,
      column: generatedColumn,
    });
    return {
      line: result.line!,
      column: result.column!,
      source: result.source,
      name: result.name,
    };
  }

  /**
   * Given a position in the original (TS) file, find the generated (GDScript) position.
   */
  generatedPositionFor(
    source: string,
    originalLine: number,
    originalColumn: number,
  ): { line: number | null; column: number | null } {
    return this.consumer.generatedPositionFor({
      source,
      line: originalLine,
      column: originalColumn,
    });
  }

  /**
   * Get all mappings as a flat array.
   */
  allMappings(): MappingItem[] {
    const mappings: MappingItem[] = [];
    this.consumer.eachMapping((m) => mappings.push(m));
    return mappings;
  }

  destroy(): void {
    this.consumer.destroy();
  }
}
