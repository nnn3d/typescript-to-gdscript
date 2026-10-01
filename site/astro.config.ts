// site/astro.config.ts
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import preact from '@astrojs/preact';
import { browserShims } from './vite/browser-shims.ts';
import { BASE, REPO_EDIT_URL, SITE_ORIGIN } from './constants.ts';
import { buildSidebar, DOCS_DIR } from './sidebar.ts';
import { codeTitles } from './plugins/code-titles.ts';

/** Paste the Google Search Console verification token here to emit the meta tag. */
const googleSiteVerification = '6S4CIbn8V8PV_gO7Yz-BTPqBL_C-8NsI0IKFPqiGPAM';

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
      expressiveCode: { plugins: [codeTitles] },
      components: { SocialIcons: './src/components/SocialIcons.astro' },
      // Pages live in site/src/content/docs, and Starlight appends that path.
      editLink: { baseUrl: `${REPO_EDIT_URL}/site/` },
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
