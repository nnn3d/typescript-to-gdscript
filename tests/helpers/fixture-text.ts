/**
 * Normalize fixture text for comparison: LF line endings, no trailing
 * whitespace on any line, no leading or trailing blank lines.
 */
export function normalizeFixtureText(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}
