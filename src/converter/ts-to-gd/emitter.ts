import { SourceMapper, type Mapping } from '../../sourcemap/index.ts';

/**
 * GDScript code emitter with source map support.
 * Tracks line/column positions as code is emitted.
 */
export class GDScriptEmitter {
  private output: string[] = [];
  private currentLine = 1;
  private currentColumn = 0;
  private indentLevel = 0;
  private indentStr = '\t';
  private sourceMapper: SourceMapper | null = null;
  private sourceFile: string;

  constructor(
    sourceFile: string,
    generatedFile?: string,
    enableSourceMap = false,
  ) {
    this.sourceFile = sourceFile;
    if (enableSourceMap && generatedFile) {
      this.sourceMapper = new SourceMapper(sourceFile, generatedFile);
    }
  }

  indent(): void {
    this.indentLevel++;
  }

  dedent(): void {
    this.indentLevel = Math.max(0, this.indentLevel - 1);
  }

  /**
   * Write text to output, tracking position for source maps.
   * @param text The text to write
   * @param originalLine Original source line (1-based), for source map
   * @param originalColumn Original source column (0-based), for source map
   */
  write(text: string, originalLine?: number, originalColumn?: number): void {
    if (
      originalLine !== undefined &&
      originalColumn !== undefined &&
      this.sourceMapper
    ) {
      this.sourceMapper.addMapping({
        source: this.sourceFile,
        originalLine,
        originalColumn,
        generatedLine: this.currentLine,
        generatedColumn: this.currentColumn,
      });
    }

    const lines = text.split('\n');
    this.output.push(text);
    this.currentLine += lines.length - 1;
    this.currentColumn =
      lines.length > 1
        ? lines.at(-1)!.length
        : this.currentColumn + lines.at(0)!.length;
  }

  /** Write text followed by a newline, with mapping at column 0 (line start). */
  writeLine(text: string, originalLine: number, originalColumn: number): void {
    const indent = this.indentStr.repeat(this.indentLevel);
    this.write(indent + text, originalLine, originalColumn);
    this.write('\n');
  }

  /** Write an empty line */
  writeEmptyLine(): void {
    this.write('\n');
  }

  /** Get current indentation level */
  getIndentLevel(): number {
    return this.indentLevel;
  }

  /** Get indentation string for a given level */
  getIndentStr(level?: number): string {
    return this.indentStr.repeat(level ?? this.indentLevel);
  }

  /** Write current indentation */
  writeIndent(): void {
    const indent = this.indentStr.repeat(this.indentLevel);
    this.write(indent);
  }

  /** Get the generated code */
  getOutput(): string {
    return this.output.join('');
  }

  /** Get the source map JSON string, or undefined if source maps are disabled */
  getSourceMap(): string | undefined {
    return this.sourceMapper?.toString();
  }

  /** Set source content for source maps */
  setSourceContent(content: string): void {
    this.sourceMapper?.addSourceContent(this.sourceFile, content);
  }
}
