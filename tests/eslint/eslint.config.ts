import { defineConfig } from 'eslint/config';
import { dirname, join } from 'path';

import tsParser from '@typescript-eslint/parser';
import plugin from '../../src/eslint/plugin.ts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, 'fixtures');

export default defineConfig([
  {
    files: ['**/fixtures/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      ts2gd: plugin,
    },
    rules: {
      'ts2gd/convert': [
        'error',
        {
          rootDir: FIXTURES_DIR,
          godotPath: 'godot',
          projectRoot: FIXTURES_DIR,
        },
      ],
    },
  },
]);
