import { defineConfig } from "eslint/config";
import { join } from "path";

import tsParser from "@typescript-eslint/parser";
import plugin from "../../src/eslint/plugin.ts";
import path from 'node:path'

const __dirname = path.dirname(import.meta.url);
const FIXTURES_DIR = join(__dirname, "fixtures");

export default defineConfig([{
  files: ["**/*.ts"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  plugins: {
    ts2gd: plugin,
  },
  rules: {
    "ts2gd/convert": [
      "error",
      {
        rootDir: FIXTURES_DIR,
      },
    ],
  },
}])
