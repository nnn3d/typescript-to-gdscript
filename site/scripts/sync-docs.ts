// site/scripts/sync-docs.ts
import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BASE,
  REPO_BLOB_URL,
  REPO_EDIT_URL,
  REPO_RAW_URL,
  UNSYNCED_DOC_DIRS,
} from '../constants.ts';
import { transformDoc } from './docs-transform.ts';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = join(SITE, '..');
const DOCS = join(REPO, 'docs');
const HAND_WRITTEN = join(SITE, 'content');
const OUT = join(SITE, 'src', 'content', 'docs');
const OPTS = {
  base: BASE,
  repoBlobUrl: REPO_BLOB_URL,
  repoEditUrl: REPO_EDIT_URL,
  repoRawUrl: REPO_RAW_URL,
};

const toPosix = (p: string) => p.split(sep).join('/');
const routeOf = (rel: string) => rel.replace(/\.mdx?$/, '').toLowerCase();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const handWrittenRoutes = new Set<string>();
const handWrittenFiles = new Set<string>();
cpSync(HAND_WRITTEN, OUT, { recursive: true });
for (const file of readdirSync(HAND_WRITTEN, {
  recursive: true,
  encoding: 'utf-8',
})) {
  handWrittenFiles.add(toPosix(file));
  if (/\.mdx?$/.test(file)) handWrittenRoutes.add(routeOf(toPosix(file)));
}

let pages = 0;
const walk = (dir: string) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    const rel = toPosix(relative(DOCS, full));
    if (entry.isDirectory()) {
      if (dir === DOCS && UNSYNCED_DOC_DIRS.has(entry.name)) continue;
      walk(full);
      continue;
    }
    const target = join(OUT, rel);
    mkdirSync(dirname(target), { recursive: true });
    if (!rel.endsWith('.md')) {
      if (handWrittenFiles.has(rel)) {
        throw new Error(
          `docs/${rel} collides with a hand-written file in site/content/`,
        );
      }
      cpSync(full, target);
      continue;
    }
    if (handWrittenRoutes.has(routeOf(rel))) {
      throw new Error(
        `docs/${rel} collides with a hand-written page in site/content/`,
      );
    }
    writeFileSync(target, transformDoc(readFileSync(full, 'utf-8'), rel, OPTS));
    pages += 1;
  }
};
walk(DOCS);
console.log(
  `sync-docs: ${pages} docs pages + ${handWrittenRoutes.size} site pages`,
);
