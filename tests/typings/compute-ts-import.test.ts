import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { computeTsImport } from '../../src/typings/scene-utils.ts';

describe('computeTsImport', () => {
  const outputDir = join('/project', 'types');

  it('strips .ts from a converted source', () => {
    const target = join(outputDir, 'addons', 'Demo', 'widget.ts');
    expect(computeTsImport(outputDir, 'addons/Demo/widget.gd.d.ts', target)).toBe('./widget');
  });

  it('strips .d.ts from an emitted declaration to the same specifier', () => {
    // Addon typings point at the declaration now; the extensionless
    // specifier has to come out identical so it resolves to either form.
    const target = join(outputDir, 'addons', 'Demo', 'widget.d.ts');
    expect(computeTsImport(outputDir, 'addons/Demo/widget.gd.d.ts', target)).toBe('./widget');
  });

  it('keeps a `.d` that is part of the name, not the extension', () => {
    const source = join(outputDir, 'addons', 'Demo', 'my.d.helper.ts');
    expect(computeTsImport(outputDir, 'addons/Demo/widget.gd.d.ts', source)).toBe('./my.d.helper');
  });
});
