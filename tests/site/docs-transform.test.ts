// tests/site/docs-transform.test.ts
import { describe, it, expect } from 'vitest';
import { transformDoc } from '../../site/scripts/docs-transform.js';

const OPTS = {
  base: '/typescript-to-gdscript',
  repoBlobUrl: 'https://github.com/nnn3d/typescript-to-gdscript/blob/master',
  repoRawUrl: 'https://github.com/nnn3d/typescript-to-gdscript/raw/master',
  repoEditUrl: 'https://github.com/nnn3d/typescript-to-gdscript/edit/master',
};

const DOC = [
  '[← Back to README](../README.md)',
  '',
  '> Brief: full reference for every `tstogd` CLI command. See [config](configuration.md).',
  '',
  '# CLI Reference',
  '',
  'See [configuration](configuration.md#tstogdjson) and [init](#tstogd-init).',
  '',
  '```bash',
  '# Normal convert',
  'tstogd convert',
  '```',
  '',
  '![shot](assets/convert.webp) and [site](https://example.com).',
].join('\n');

describe('transformDoc', () => {
  const out = transformDoc(DOC, 'cli.md', OPTS);

  it('moves the title into frontmatter and derives description and edit link', () => {
    expect(
      out.startsWith(
        '---\ntitle: "CLI Reference"\n' +
          'description: "full reference for every tstogd CLI command. See config."\n' +
          'editUrl: "https://github.com/nnn3d/typescript-to-gdscript/edit/master/docs/cli.md"\n' +
          '---\n\n',
      ),
    ).toBe(true);
  });

  it('drops the back link and the heading but keeps the brief', () => {
    expect(out).not.toContain('Back to README');
    expect(out).not.toContain('# CLI Reference');
    expect(out).toContain(
      '> Brief: full reference for every `tstogd` CLI command. See [config](/typescript-to-gdscript/configuration/).',
    );
  });

  it('leaves headings inside code fences alone', () => {
    expect(out).toContain('# Normal convert');
  });

  it('rewrites links between docs to site routes', () => {
    expect(out).toContain(
      '[configuration](/typescript-to-gdscript/configuration/#tstogdjson)',
    );
    expect(out).toContain('[init](#tstogd-init)');
  });

  it('keeps assets and external links', () => {
    expect(out).toContain('![shot](assets/convert.webp)');
    expect(out).toContain('[site](https://example.com)');
  });

  it('resolves links from nested docs and sends outside links to GitHub', () => {
    const nested = transformDoc(
      '# Signals\n\n[cli](../cli.md#x) [readme](../../README.md#faq) [peer](other.md)',
      'guides/signals.md',
      OPTS,
    );
    expect(nested).toContain('[cli](/typescript-to-gdscript/cli/#x)');
    expect(nested).toContain(
      '[readme](https://github.com/nnn3d/typescript-to-gdscript/blob/master/README.md#faq)',
    );
    expect(nested).toContain('[peer](/typescript-to-gdscript/guides/other/)');
  });

  it('fails on a doc without a title', () => {
    expect(() => transformDoc('no heading', 'x.md', OPTS)).toThrow(/x\.md/);
  });

  it('leaves links inside ~~~ fences and indented list fences untouched', () => {
    const md = [
      '# T',
      '',
      '~~~md',
      '[a](x.md)',
      '~~~',
      '',
      '- item',
      '  ```md',
      '  [b](y.md)',
      '  ```',
      '',
      '[c](z.md)',
    ].join('\n');
    const res = transformDoc(md, 'p.md', OPTS);
    expect(res).toContain('[a](x.md)');
    expect(res).toContain('[b](y.md)');
    expect(res).toContain('[c](/typescript-to-gdscript/z/)');
  });

  it('handles CRLF input', () => {
    const res = transformDoc('# Title\r\n\r\n[a](b.md)\r\n', 'p.md', OPTS);
    expect(res).not.toContain('\r');
    expect(res).toContain('title: "Title"');
    expect(res).toContain('[a](/typescript-to-gdscript/b/)');
  });

  it('drops the back link only on the first line', () => {
    const md = '# T\n\n[← Back to README](../README.md)\n';
    expect(transformDoc(md, 'p.md', OPTS)).toContain('Back to README');
  });

  it('strips backticks from the title', () => {
    const res = transformDoc('# `gd` Namespace Helpers\n', 'p.md', OPTS);
    expect(res).toContain('title: "gd Namespace Helpers"');
  });

  it('maps index.md to the folder route', () => {
    const md = '# T\n\n[a](index.md) [b](guides/index.md#h) [c](../index.md)';
    const res = transformDoc(md, 'x/p.md', OPTS);
    expect(res).toContain('[a](/typescript-to-gdscript/x/)');
    expect(res).toContain('[b](/typescript-to-gdscript/x/guides/#h)');
    expect(res).toContain('[c](/typescript-to-gdscript/)');
  });

  it('sends non-image assets to GitHub and keeps images relative', () => {
    const md = '# T\n\n[pdf](assets/a.pdf) ![img](assets/a.png)';
    const res = transformDoc(md, 'p.md', OPTS);
    expect(res).toContain(
      '[pdf](https://github.com/nnn3d/typescript-to-gdscript/blob/master/docs/assets/a.pdf)',
    );
    expect(res).toContain('![img](assets/a.png)');
  });

  it('sends images outside docs/ to the raw URL', () => {
    const md = '# T\n\n![shot](../media/a.png)';
    const res = transformDoc(md, 'p.md', OPTS);
    expect(res).toContain(
      '![shot](https://github.com/nnn3d/typescript-to-gdscript/raw/master/media/a.png)',
    );
  });
});
