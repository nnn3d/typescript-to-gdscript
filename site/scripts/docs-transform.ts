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
/** An opening fence and its language: `  ```ts nocheck` → `ts`. */
const FENCE_LANG = /^\s*(?:```|~~~)(\w+)/;
/**
 * The frame title shown for a language, so the TypeScript and the GDScript
 * of an example read apart at a glance.
 */
const LANGUAGE_TITLES: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  gdscript: 'GDScript',
};

/**
 * Turn a `docs/` Markdown file into a Starlight page. The `# Title` becomes
 * frontmatter; the `> Brief:` line feeds the description and stays in the
 * body; the "Back to README" link is dropped (the site navigation replaces
 * it); relative links are rewritten to site routes or, when they leave
 * `docs/`, to GitHub; TypeScript and GDScript code blocks get a titled frame.
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
    if (FENCE.test(line)) {
      inFence = !inFence;
      if (inFence) {
        body.push(titledFence(line));
        return;
      }
    }
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
  description ??= firstParagraph(body);

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

/** An opening fence with a `title="…"` added for its language, if it has none. */
function titledFence(line: string): string {
  const lang = FENCE_LANG.exec(line)?.[1];
  const title = lang ? LANGUAGE_TITLES[lang] : undefined;
  if (!title || /\btitle=/.test(line)) return line;
  return `${line.trimEnd()} title="${title}"`;
}

/** Search engines show about this much of a description. */
const DESCRIPTION_MAX = 160;

/**
 * The page's opening paragraph as plain text, for pages without a `> Brief:`
 * line (the guides). None when the page opens with something other than
 * prose — code, a list, a quote, a table or a heading.
 */
function firstParagraph(body: string[]): string | undefined {
  const lines: string[] = [];
  for (const line of body) {
    if (line.trim() === '') break;
    lines.push(line.trim());
  }
  if (!lines.length || /^([#>|<!-]|```|~~~|\d+\.\s|\*\s)/.test(lines[0])) {
    return undefined;
  }
  const text = plainText(lines.join(' '));
  if (text.length <= DESCRIPTION_MAX) return text;
  const cut = text.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
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
