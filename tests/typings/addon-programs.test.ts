/**
 * What the TypeScript programs over addon code see: which project files
 * they take in, and what the check of the emitted declarations still
 * catches under the project's own compiler settings.
 */

import { describe, it, expect } from 'vitest';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { generateAddonTypings } from '../../src/typings/addons.js';
import { cleanUpProjectsAfterEach, makeProject } from './addon-test-project.js';

cleanUpProjectsAfterEach();

describe('Addon typings programs', () => {
  it("still checks the declarations when the user's tsconfig sets skipLibCheck", () => {
    // `skipLibCheck` skips every `.d.ts`, and the check of the output looks
    // at nothing else — with it honoured, an unresolvable `extends` would
    // ship as a `Resource` base (not a constructor) without a word.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/child.gd': 'extends "res://scripts/missing.gd"\n\nfunc ping():\n\tpass\n',
    });
    const cfg = JSON.parse(readFileSync(tsConfigPath, 'utf-8'));
    cfg.compilerOptions.skipLibCheck = true;
    writeFileSync(tsConfigPath, JSON.stringify(cfg));

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].message).toContain('TS2507');
  });

  it('lets addons see hand-written declarations kept in the addon typings folder', () => {
    // The README's fix for a badly converted addon leaves a hand-written
    // declaration in `<typingsDir>/addons`. What keeps the previous run's
    // output out of the programs must go by origin, as the sweep does, not
    // by folder — or every addon using the fixed one loses its types.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/User/user.gd': [
        'extends Node',
        'class_name HandFixedUser',
        '',
        'func get_value():',
        '\treturn HandFixed.new().value()',
        '',
      ].join('\n'),
    });
    const handWritten = join(outputDir, 'addons/Fixed/fixed.d.ts');
    mkdirSync(join(outputDir, 'addons/Fixed'), { recursive: true });
    writeFileSync(
      handWritten,
      'declare global {\n  class HandFixed extends RefCounted {\n    value(): string;\n  }\n}\nexport {};\n',
    );

    const { diagnostics } = generateAddonTypings({ rootDir, outputDir, tsConfigPath });

    expect(diagnostics).toEqual([]);
    const decl = readFileSync(join(outputDir, 'addons/User/user.d.ts'), 'utf-8');
    expect(decl).toMatch(/get_value\(\)\s*:\s*string/);
    expect(existsSync(handWritten)).toBe(true);
  });

  it('names the cause when a project declaration imports an addon declaration by path', () => {
    // No root filter can keep out a file that is imported: once the
    // declaration exists, a project `.d.ts` importing it pulls it into the
    // emit program, and TypeScript refuses to overwrite its own input
    // (TS5055) with nothing but an options diagnostic to show for it.
    const { rootDir, outputDir, tsConfigPath } = makeProject({
      'addons/Demo/widget.gd': 'extends Node\nclass_name Widget\n\nvar hp: int = 1\n',
      'types/project/uses_widget.d.ts':
        'import type { Widget } from "../addons/Demo/widget";\nexport declare const widget: Widget;\n',
    });

    const first = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    expect(first.diagnostics).toEqual([]);

    const second = generateAddonTypings({ rootDir, outputDir, tsConfigPath });
    expect(second.diagnostics.some((d) => d.message.startsWith('TS5055'))).toBe(true);
  });
});
