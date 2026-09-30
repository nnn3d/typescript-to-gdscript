import { useEffect, useRef } from 'preact/hooks';
import type * as Monaco from 'monaco-editor';
import { currentMonacoTheme } from './monaco-setup.ts';

interface EditorProps {
  monaco: typeof Monaco;
  value: string;
  language: 'typescript' | 'gdscript';
  uri?: string;
  readOnly?: boolean;
  dimmed?: boolean;
  onChange?(value: string): void;
  onMount?(editor: Monaco.editor.IStandaloneCodeEditor): void;
}

export function Editor({
  monaco,
  value,
  language,
  uri,
  readOnly,
  dimmed,
  onChange,
  onMount,
}: EditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor>();
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const model = monaco.editor.createModel(
      value,
      language,
      uri ? monaco.Uri.parse(uri) : undefined,
    );
    const editor = monaco.editor.create(host.current!, {
      model,
      readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      // Let the wheel scroll the page once the editor is at its top or bottom.
      scrollbar: { alwaysConsumeMouseWheel: false },
      fontSize: 14,
      tabSize: language === 'gdscript' ? 4 : 2,
      theme: currentMonacoTheme(),
    });
    editorRef.current = editor;
    const sub = editor.onDidChangeModelContent(() =>
      onChangeRef.current?.(editor.getValue()),
    );
    onMount?.(editor);
    return () => {
      sub.dispose();
      editor.dispose();
      model.dispose();
    };
  }, []);

  // Only a read-only editor follows `value`. For an editable one, `value` is the
  // initial text: syncing it back would race the user, since the effect runs
  // after paint and could overwrite keystrokes typed in between with stale text.
  // Replace an editable editor's text with `replaceText` instead.
  useEffect(() => {
    const editor = editorRef.current;
    if (!readOnly || !editor || editor.getValue() === value) return;
    editor.setValue(value);
  }, [value]);

  return (
    <div ref={host} class={dimmed ? 'pg-editor pg-dimmed' : 'pg-editor'} />
  );
}

/** Replace all text as one undoable edit, unlike `setValue`. */
export function replaceText(
  editor: Monaco.editor.IStandaloneCodeEditor,
  text: string,
) {
  const model = editor.getModel();
  if (!model || model.getValue() === text) return;
  editor.pushUndoStop();
  editor.executeEdits('external', [{ range: model.getFullModelRange(), text }]);
  editor.pushUndoStop();
}
