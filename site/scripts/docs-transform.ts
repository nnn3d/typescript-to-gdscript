// site/scripts/docs-transform.ts
import { posix } from 'node:path';

export interface TransformOptions {
  /** Site base path, no trailing slash (`/typescript-to-gdscript`). */
  base: string;
  /** Blob URL of the repo's default branch, no trailing slash. */
  repoBlobUrl: string;
  /** Raw-file URL of the repo's default branch, for images outside `docs/`. */
  repoRawUrl: string;
  /** Edit URL of the repo's default branch, no trailing slash. */
  repoEditUrl: string;
}

const BACK_LINK = /^\[← Back to README\]\([^)]*\)\s*$/;
const BRIEF = /^>\s*Brief:\s*(.*)$/;
const FENCE = /^\s*(```|~~~)/;
const LINK = /(!?\[[^\]]*\]\()([^)\s]+)(\))/g;

/**
 * Turn a `docs/` Markdown file into a Starlight page. The `# Title` becomes
 * frontmatter; the `> Brief:` line feeds the description and stays in the
 * body; the "Back to README" link is dropped (the site navigation replaces
 * it); relative links are rewritten to site routes or, when they leave
 * `docs/`, to GitHub.
 *
 * `docPath` is the file's path relative to `docs/`, with `/` separators.
 */
export function transformDoc(
  markdown: string,
  docPath: string,
  opts: TransformOptions,
): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let title: string | undefined;
  let description: string | undefined;
  let inFence = false;
  const body: string[] = [];

  lines.forEach((line, index) => {
    if (FENCE.test(line)) inFence = !inFence;
    if (!inFence) {
      if (index === 0 && BACK_LINK.test(line)) return;
      const brief = title === undefined ? BRIEF.exec(line) : null;
      if (brief && description === undefined) {
        description = plainText(brief[1]);
      }
      if (title === undefined && line.startsWith('# ')) {
        title = plainText(line.slice(2));
        return;
      }
      body.push(
        line.replace(
          LINK,
          (_m, open: string, target: string, close: string) =>
            open +
            rewriteTarget(target, docPath, opts, open.startsWith('!')) +
            close,
        ),
      );
      return;
    }
    body.push(line);
  });

  if (title === undefined) {
    throw new Error(`${docPath}: no "# Title" heading outside code fences`);
  }
  while (body.length && body[0].trim() === '') body.shift();

  const front = [
    '---',
    `title: ${JSON.stringify(title)}`,
    ...(description ? [`description: ${JSON.stringify(description)}`] : []),
    `editUrl: ${JSON.stringify(`${opts.repoEditUrl}/docs/${docPath}`)}`,
    '---',
    '',
  ];
  return `${front.join('\n')}\n${body.join('\n')}`;
}

function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`/g, '')
    .trim();
}

function rewriteTarget(
  target: string,
  docPath: string,
  opts: TransformOptions,
  isImage: boolean,
): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#'))
    return target;
  const hashAt = target.indexOf('#');
  const path = hashAt === -1 ? target : target.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : target.slice(hashAt);
  const repoPath = posix.normalize(
    posix.join('docs', posix.dirname(docPath), path),
  );

  if (!repoPath.startsWith('docs/')) {
    const root = isImage ? opts.repoRawUrl : opts.repoBlobUrl;
    return `${root}/${repoPath}${hash}`;
  }
  if (!repoPath.endsWith('.md') && !isImage)
    return `${opts.repoBlobUrl}/${repoPath}${hash}`;
  if (!repoPath.endsWith('.md')) return target; // an image, copied alongside
  const route = repoPath
    .slice('docs/'.length, -'.md'.length)
    .replace(/(^|\/)index$/, '')
    .toLowerCase();
  return `${opts.base}/${route ? `${route}/` : ''}${hash}`;
}
