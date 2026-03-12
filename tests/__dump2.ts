import {convertTsToGd} from '../src/converter/ts-to-gd/index.js';
import {readFileSync} from 'fs';
import {join} from 'path';
const fp = join('tests/fixtures/ts-to-gd/functions.ts');
const r = convertTsToGd({filePath: fp, rootDir: 'tests/fixtures/ts-to-gd'});
r.code.split('\n').forEach((l: string, i: number) => console.log((i+1).toString().padStart(3)+': '+JSON.stringify(l)));
r.diagnostics.forEach(d => console.log(`  [${d.severity}] ${d.message}`));
