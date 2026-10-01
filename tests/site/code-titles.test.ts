// tests/site/code-titles.test.ts
import { describe, it, expect } from 'vitest';
import { codeTitles } from '../../site/plugins/code-titles.js';

/** The title the plugin leaves on a block of `language` with `title` set. */
function titleOf(language: string, title?: string): string | undefined {
  const codeBlock = { language, props: { title } };
  const hook = codeTitles.hooks?.preprocessMetadata as unknown as (ctx: {
    codeBlock: typeof codeBlock;
  }) => void;
  hook({ codeBlock });
  return codeBlock.props.title;
}

describe('code-titles', () => {
  it('titles TypeScript and GDScript blocks so the two are easy to tell apart', () => {
    expect(titleOf('ts')).toBe('TypeScript');
    expect(titleOf('typescript')).toBe('TypeScript');
    expect(titleOf('gdscript')).toBe('GDScript');
  });

  it('keeps an explicit title, and leaves other languages alone', () => {
    expect(titleOf('ts', 'player.ts')).toBe('player.ts');
    expect(titleOf('bash')).toBe(undefined);
  });
});
