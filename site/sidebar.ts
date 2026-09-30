// site/sidebar.ts
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type starlight from '@astrojs/starlight';
import { SIDEBAR_HIDDEN_DIRS } from './constants.ts';

type SidebarItem = NonNullable<
  Parameters<typeof starlight>[0]['sidebar']
>[number];

/** Top-level docs pages, by group. A renamed file fails the build here. */
const GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: 'Guides',
    slugs: [
      'transform-rules',
      'gd-helpers',
      'typings',
      'ide-integration',
      'gd-to-ts-migration',
    ],
  },
  { label: 'Reference', slugs: ['cli', 'configuration'] },
  { label: 'Development', slugs: ['development'] },
];

export function buildSidebar(docsDir: string): SidebarItem[] {
  const entries = readdirSync(docsDir, { withFileTypes: true });
  const listed = new Set(GROUPS.flatMap((g) => g.slugs));
  const unlisted = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name.slice(0, -'.md'.length))
    .filter((slug) => !listed.has(slug));
  const folders = entries
    .filter((e) => e.isDirectory() && !SIDEBAR_HIDDEN_DIRS.has(e.name))
    .map((e) => e.name);

  return [
    { label: 'Playground', link: '/playground/' },
    { label: 'Getting started', slug: 'getting-started' },
    ...GROUPS.map((g) => ({
      label: g.label,
      items: g.slugs.map((slug) => ({ slug })),
    })),
    ...(unlisted.length
      ? [{ label: 'More', items: unlisted.map((slug) => ({ slug })) }]
      : []),
    ...folders.map((dir) => ({
      label: dir.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      items: [{ autogenerate: { directory: dir } }],
    })),
  ];
}

// `import.meta.dirname` is not reliable when Astro bundles its config.
export const DOCS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'docs',
);
