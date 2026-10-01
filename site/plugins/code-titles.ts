// site/plugins/code-titles.ts
import type { ExpressiveCodePlugin } from '@astrojs/starlight/expressive-code';

/**
 * TypeScript and GDScript examples sit next to each other on almost every
 * page. This Expressive Code plugin titles their frames "TypeScript" and
 * "GDScript" so the two read apart at a glance (`src/styles/code-frames.css`
 * colours them). A block with a `title="…"` of its own keeps it.
 */
const LANGUAGE_TITLES: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  gdscript: 'GDScript',
};

export const codeTitles: ExpressiveCodePlugin = {
  name: 'Code titles',
  hooks: {
    preprocessMetadata: ({ codeBlock }) => {
      // `title` is the frames plugin's prop; it reads `title="…"` from the meta.
      const props = codeBlock.props as { title?: string };
      const title = LANGUAGE_TITLES[codeBlock.language];
      if (title && props.title === undefined) props.title = title;
    },
  },
};
