// site/astro.config.ts
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import preact from '@astrojs/preact';
import { browserShims } from './vite/browser-shims.ts';
import { BASE, REPO_URL, SITE_ORIGIN } from './constants.ts';
import { buildSidebar, DOCS_DIR } from './sidebar.ts';

/** Paste the Google Search Console verification token here to emit the meta tag. */
const googleSiteVerification = '';

export default defineConfig({
  site: SITE_ORIGIN,
  base: BASE,
  integrations: [
    starlight({
      title: 'typescript-to-gdscript',
      description:
        'Write Godot 4 scripts in TypeScript and convert them to GDScript.',
      logo: { src: './src/assets/logo.png', alt: '' },
      favicon: '/favicon.png',
      customCss: ['./src/styles/code-frames.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: REPO_URL,
        },
      ],
      sidebar: buildSidebar(DOCS_DIR),
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            href: `${BASE}/apple-touch-icon.png`,
          },
        },
        ...(googleSiteVerification
          ? [
              {
                tag: 'meta' as const,
                attrs: {
                  name: 'google-site-verification',
                  content: googleSiteVerification,
                },
              },
            ]
          : []),
      ],
    }),
    preact(),
  ],
  vite: {
    plugins: [browserShims()],
    worker: { format: 'es', plugins: () => [browserShims()] },
    server: { fs: { allow: ['..'] } },
    // The playground's deps are reached through `../src` and a worker, which
    // dev discovers only at runtime; crawling them up front avoids a
    // mid-session re-optimize that reloads the page and breaks the worker.
    optimizeDeps: {
      entries: [
        'src/playground/Playground.tsx',
        'src/playground/convert.worker.ts',
      ],
      include: ['path-browserify'],
    },
  },
});
