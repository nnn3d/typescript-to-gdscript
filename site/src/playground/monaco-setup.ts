// Only the editor core and the TypeScript language: the full
// `monaco-editor` entry also pulls in every other language.
import 'monaco-editor/esm/vs/editor/editor.all';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import type { TypingsBundle } from '../../../src/browser/index.ts';
import { registerGdscript } from './gdscript-lang.ts';

let configured = false;

/**
 * Monaco's own TypeScript service gives completion and hover over the
 * Godot typings. Its validation is off: every squiggle comes from the
 * converter worker, so the editor never disagrees with the converter.
 * Needs no typings, so the editors work even if the bundle never loads.
 */
export function setupMonaco(): typeof monaco {
  if (configured) return monaco;
  configured = true;

  self.MonacoEnvironment = {
    getWorker: (_id, label) =>
      label === 'typescript' || label === 'javascript'
        ? new TsWorker()
        : new EditorWorker(),
  };

  const tsDefaults = monaco.languages.typescript.typescriptDefaults;
  const tsApi = monaco.languages.typescript;
  tsDefaults.setCompilerOptions({
    target: tsApi.ScriptTarget.ESNext,
    module: tsApi.ModuleKind.ESNext,
    moduleResolution: tsApi.ModuleResolutionKind.Classic,
    noLib: true,
    strict: true,
    allowNonTsExtensions: true,
  });
  tsDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  registerGdscript(monaco);
  return monaco;
}

/** Feed the Godot typings to Monaco's TypeScript service. */
export function addGodotTypings(bundle: TypingsBundle) {
  monaco.languages.typescript.typescriptDefaults.setExtraLibs(
    Object.entries(bundle.typings).map(([path, content]) => ({
      filePath: `file://${path}`,
      content,
    })),
  );
}

export function currentMonacoTheme(): string {
  return document.documentElement.dataset.theme === 'light' ? 'vs' : 'vs-dark';
}
