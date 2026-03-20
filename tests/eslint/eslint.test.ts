import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import { readFileSync, readdirSync } from 'fs';
import { join, basename, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import plugin from '../../src/eslint/plugin.js';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, 'fixtures');

interface ExpectedMessage {
  message: string;
  severity: 1 | 2; // 1 = warning, 2 = error
}

// Discover fixture pairs
const converterFixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.ts') && !f.startsWith('godot-'))
  .sort();

const godotFixtures = readdirSync(FIXTURES_DIR)
  .filter((f) => f.endsWith('.ts') && f.startsWith('godot-'))
  .sort();

// ─── Converter Diagnostics via ESLint ────────────────────────

describe('ESLint Plugin: Converter diagnostics', () => {
  for (const tsFile of converterFixtures) {
    const fixtureName = basename(tsFile, '.ts');
    const jsonFile = tsFile.replace('.ts', '.json');

    it(`should report correct errors: ${fixtureName}`, async () => {
      const expected: ExpectedMessage[] = JSON.parse(
        readFileSync(join(FIXTURES_DIR, jsonFile), 'utf-8'),
      );

      const filePath = resolve(FIXTURES_DIR, tsFile);

      const eslint = new ESLint({
        overrideConfigFile: join(__dirname, './eslint.config.ts'),
      });

      const results = await eslint.lintFiles([filePath]);
      const messages = results[0]?.messages ?? [];

      expect(
        messages.length,
        `Expected to have ${expected.length} errors, but got ${messages.length}:` +
          `\nErrors:\n` +
          messages +
          `\nExpected:\n` +
          expected,
      ).toBe(expected.length);

      if (expected.length === 0) {
        // Filter to only ts2gd messages
        const ts2gdMessages = messages.filter(
          (m) => m.ruleId === 'ts2gd/convert',
        );
        expect(
          ts2gdMessages,
          `Expected no ts2gd errors for ${fixtureName}, got:\n` +
            ts2gdMessages
              .map((m) => `  [${m.severity}] ${m.message}`)
              .join('\n'),
        ).toHaveLength(0);
      } else {
        for (const exp of expected) {
          const match = messages.find(
            (m) =>
              m.ruleId === 'ts2gd/convert' &&
              m.message.includes(exp.message) &&
              m.severity === exp.severity,
          );
          expect(
            match,
            `Expected message containing "${exp.message}" with severity ${exp.severity} in ${fixtureName}.\n` +
              `Actual messages:\n` +
              messages
                .map((m) => `  [${m.severity}] (${m.ruleId}) ${m.message}`)
                .join('\n'),
          ).toBeDefined();
        }
      }
    });
  }
});

// ─── Godot Validation via ESLint ─────────────────────────────

describe('ESLint Plugin: Godot validation', () => {
  for (const tsFile of godotFixtures) {
    const fixtureName = basename(tsFile, '.ts');
    const jsonFile = tsFile.replace('.ts', '.json');

    it(`should report Godot errors: ${fixtureName}`, async () => {
      const expected: ExpectedMessage[] = JSON.parse(
        readFileSync(join(FIXTURES_DIR, jsonFile), 'utf-8'),
      );

      const filePath = resolve(FIXTURES_DIR, tsFile);

      const eslint = new ESLint({
        overrideConfigFile: join(__dirname, './eslint.config.ts'),
      });

      const results = await eslint.lintFiles([filePath]);
      const messages = results[0]?.messages ?? [];

      expect(
        messages.length,
        `Expected to have ${expected.length} errors, but got ${messages.length}:` +
          `\nErrors:\n` +
          JSON.stringify(messages, null, 2) +
          `\nExpected:\n` +
          JSON.stringify(expected, null, 2),
      ).toBe(expected.length);

      for (const exp of expected) {
        const match = messages.find(
          (m) =>
            m.ruleId === 'ts2gd/convert' &&
            m.message.includes(exp.message) &&
            m.severity === exp.severity,
        );
        expect(
          match,
          `Expected message containing "${exp.message}" with severity ${exp.severity} in ${fixtureName}.\n` +
            `Actual messages:\n` +
            messages
              .map((m) => `  [${m.severity}] (${m.ruleId}) ${m.message}`)
              .join('\n'),
        ).toBeDefined();
      }
    });
  }
});
