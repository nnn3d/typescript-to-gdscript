// site/scripts/bundle-typings.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { readTypingsBundle } from '../../src/browser/read-typings.ts';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(SITE, 'src', 'generated');

const bundle = readTypingsBundle(join(SITE, '..', 'typings'));
const json = JSON.stringify(bundle);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'typings-bundle.json'), json);

const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
console.log(
  `bundle-typings: ${Object.keys(bundle.typings).length} files, ` +
    `${mb(json.length)} MB raw, ${mb(gzipSync(json).length)} MB gzipped`,
);
