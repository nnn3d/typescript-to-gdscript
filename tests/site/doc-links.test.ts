import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative, resolve, sep } from 'path';
import { fileURLToPath } from 'url';
import { BASE, SITE_ORIGIN } from '../../site/constants.js';

/**
 * Every relative link in the user docs must reach an existing file, and an
 * `#anchor` must match a heading there. The docs are read on GitHub and on
 * the site, and both render a dead link silently. Links to the site itself
 * (the README's documentation links) are checked against the page's source.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DOCS = join(ROOT, 'docs');
/** Working notes, never published. */
const SKIPPED_DIRS = new Set([join(DOCS, 'superpowers')]);
const SITE_URL = `${SITE_ORIGIN}${BASE}/`;

function markdownFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      return SKIPPED_DIRS.has(full) ? [] : markdownFiles(full);
    }
    return name.endsWith('.md') ? [full] : [];
  });
}

/** Lines outside fenced code blocks. */
function proseLines(text: string): string[] {
  let inFence = false;
  return text.split(/\r?\n/).filter((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return false;
    }
    return !inFence;
  });
}

/** GitHub's heading slug: lowercase, punctuation dropped, spaces to dashes. */
function slug(heading: string): string {
  return heading
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/ /g, '-');
}

function anchorsOf(file: string): Set<string> {
  const seen = new Map<string, number>();
  const anchors = new Set<string>();
  for (const line of proseLines(readFileSync(file, 'utf-8'))) {
    const heading = /^#{1,6}\s+(.*?)\s*#*$/.exec(line);
    if (!heading) continue;
    const base = slug(heading[1]);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    anchors.add(count === 0 ? base : `${base}-${count}`);
  }
  return anchors;
}

function linksOf(file: string): string[] {
  const links: string[] = [];
  for (const line of proseLines(readFileSync(file, 'utf-8'))) {
    // Inline code can show link syntax without being a link.
    const text = line.replace(/`[^`]*`/g, '');
    for (const match of text.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      links.push(match[1]);
    }
  }
  return links;
}

/** The file a site page is built from: a synced doc or one of the site's own pages. */
function sitePageSource(route: string): string | undefined {
  const path = route.replace(/\/$/, '');
  return [
    join(DOCS, `${path}.md`),
    join(DOCS, path, 'index.md'),
    join(ROOT, 'site', 'src', 'pages', `${path}.astro`),
    join(ROOT, 'site', 'content', `${path || 'index'}.mdx`),
  ].find((candidate) => existsSync(candidate));
}

function brokenLinks(file: string): string[] {
  const broken: string[] = [];
  for (const target of linksOf(file)) {
    let resolved: string | undefined;
    let anchor: string | undefined;
    if (target.startsWith(SITE_URL)) {
      let route: string;
      [route, anchor] = target.slice(SITE_URL.length).split('#');
      resolved = sitePageSource(route);
      if (!resolved) {
        broken.push(`${target} (no such page)`);
        continue;
      }
    } else if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
      continue; // external
    } else {
      let path: string;
      [path, anchor] = target.split('#');
      resolved = path ? resolve(dirname(file), path) : file;
      if (!existsSync(resolved)) {
        broken.push(`${target} (no such file)`);
        continue;
      }
    }
    if (anchor !== undefined && resolved.endsWith('.md')) {
      if (!anchorsOf(resolved).has(anchor)) {
        broken.push(`${target} (no heading "#${anchor}")`);
      }
    }
  }
  return broken;
}

const FILES = [join(ROOT, 'README.md'), ...markdownFiles(DOCS)];

describe('doc links', () => {
  it('finds the docs', () => {
    expect(FILES.length).toBeGreaterThan(5);
  });

  for (const file of FILES) {
    const name = relative(ROOT, file).split(sep).join('/');
    it(name, () => {
      expect(brokenLinks(file), `${name} has broken links`).toEqual([]);
    });
  }
});
