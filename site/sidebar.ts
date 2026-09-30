// site/sidebar.ts
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type starlight from '@astrojs/starlight';
import { SIDEBAR_HIDDEN_DIRS } from './constants.ts';

type SidebarItem = NonNullable<
  Parameters<typeof starlight>[0]['sidebar']
>[number];

type Entry = string | { slug: string; label: string };

/**
 * The docs pages, by group, in reading order. A renamed or deleted file fails
 * the build here; a page nobody listed still shows up, under "More".
 */
const GROUPS: { label: string; items: Entry[] }[] = [
  {
    label: 'Basics',
    items: [
      'guide/getting-started',
      'guide/how-it-works',
      'guide/editor-setup',
    ],
  },
  {
    label: 'Writing scripts',
    items: [
      'guide/scripts-and-classes',
      'guide/variables-and-types',
      'guide/functions-and-lambdas',
      'guide/signals',
      'guide/nodes-and-scenes',
      'guide/exports-and-annotations',
      'guide/coroutines',
      'guide/math-and-value-types',
      'guide/arrays-and-dictionaries',
      'guide/enums-constants-inner-classes',
    ],
  },
  {
    label: 'Going further',
    items: [
      'guide/migrating-from-gdscript',
      'guide/shared-packages',
      'guide/addons',
      'guide/custom-godot-builds',
      'guide/escape-hatches',
      'guide/caveats',
      'guide/faq',
    ],
  },
  {
    label: 'Reference',
    items: [
      { slug: 'reference/transform-rules', label: 'Conversion rules' },
      { slug: 'reference/gd-helpers', label: '`gd` namespace' },
      { slug: 'reference/cli', label: 'CLI' },
      { slug: 'reference/configuration', label: 'Configuration' },
      { slug: 'reference/typings', label: 'Typings' },
      { slug: 'reference/ide-integration', label: 'IDE integration' },
    ],
  },
  { label: 'Contributing', items: ['development'] },
];

const slugOf = (entry: Entry) =>
  typeof entry === 'string' ? entry : entry.slug;

/** Every Markdown page under `docs/`, as a slug (`guide/signals`). */
function allSlugs(dir: string, prefix = ''): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return SIDEBAR_HIDDEN_DIRS.has(entry.name)
        ? []
        : allSlugs(join(dir, entry.name), `${prefix}${entry.name}/`);
    }
    return entry.name.endsWith('.md')
      ? [`${prefix}${entry.name.slice(0, -'.md'.length)}`]
      : [];
  });
}

export function buildSidebar(docsDir: string): SidebarItem[] {
  const listed = new Set(GROUPS.flatMap((g) => g.items.map(slugOf)));
  const unlisted = allSlugs(docsDir).filter((slug) => !listed.has(slug));

  return [
    { label: 'Playground', link: '/playground/' },
    ...GROUPS.map((g) => ({ label: g.label, items: g.items.map(toItem) })),
    ...(unlisted.length
      ? [{ label: 'More', items: unlisted.map((slug) => ({ slug })) }]
      : []),
  ];
}

function toItem(entry: Entry): SidebarItem {
  return typeof entry === 'string' ? { slug: entry } : entry;
}

// `import.meta.dirname` is not reliable when Astro bundles its config.
export const DOCS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'docs',
);
