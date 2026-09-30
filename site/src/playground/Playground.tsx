import { useEffect, useRef, useState } from 'preact/hooks';
import type * as Monaco from 'monaco-editor';
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import bundleUrl from '../generated/typings-bundle.json?url';
import type { TypingsBundle } from '../../../src/browser/index.ts';
import { REPO_URL } from '../../constants.ts';
import {
  addGodotTypings,
  currentMonacoTheme,
  setupMonaco,
} from './monaco-setup.ts';
import { createWorkerClient, type WorkerClient } from './worker-client.ts';
import type { ConvertOutcome } from './protocol.ts';
import { Editor, replaceText } from './Editor.tsx';
import { Diagnostics, type ShownDiagnostic } from './Diagnostics.tsx';
import { EXAMPLE_GROUPS, EXAMPLES } from './examples.ts';
import './playground.css';

const STORAGE_KEY = 'tstogd-playground-source';
const HASH_PREFIX = '#code=';
/**
 * Share-link limits. LZ decoding can't stop early and its output can grow far
 * faster than its input, so a crafted link could otherwise decode to hundreds
 * of millions of characters and kill the tab. Real code compresses well: the
 * 130-line enemy example needs about 2 KB.
 */
const MAX_HASH_LENGTH = 16 * 1024;
const MAX_SHARED_SOURCE_LENGTH = 256 * 1024;
const ISSUES_URL = `${REPO_URL}/issues/new`;
/** Width of the TypeScript pane, in percent of the workspace. */
const SPLIT_DEFAULT = 50;
const SPLIT_MIN = 25;
const SPLIT_MAX = 75;

type Status = 'loading' | 'ready' | 'converting' | 'fatal';

const clampSplit = (value: number) =>
  Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, value));

function sharedSource(): string | undefined {
  if (!location.hash.startsWith(HASH_PREFIX)) return undefined;
  const encoded = location.hash.slice(HASH_PREFIX.length);
  if (encoded.length > MAX_HASH_LENGTH) {
    console.warn('Playground: the shared link is too long; ignoring it.');
    return undefined;
  }
  try {
    const decoded = decompressFromEncodedURIComponent(encoded);
    if (decoded && decoded.length <= MAX_SHARED_SOURCE_LENGTH) return decoded;
    if (decoded)
      console.warn('Playground: the shared code is too large; ignoring it.');
  } catch {
    /* malformed link: fall back to the saved draft */
  }
  return undefined;
}

function initialSource(): string {
  const shared = sharedSource();
  if (shared !== undefined) return shared;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch {
    /* storage unavailable */
  }
  return EXAMPLES[0].source;
}

function save(source: string) {
  try {
    localStorage.setItem(STORAGE_KEY, source);
  } catch {
    /* storage unavailable */
  }
}

function issueUrl(error: string): string {
  const body = `The playground hit an internal converter error:\n\n\`\`\`\n${error.slice(0, 1500)}\n\`\`\`\n`;
  return `${ISSUES_URL}?title=${encodeURIComponent('Playground: internal converter error')}&body=${encodeURIComponent(body)}`;
}

export function Playground() {
  // Bundle-independent, so the TS editor works even if the typings never load.
  const [monaco] = useState(setupMonaco);
  const [status, setStatus] = useState<Status>('loading');
  const [fatal, setFatal] = useState<string>();
  const [source, setSource] = useState(initialSource);
  const [gdCode, setGdCode] = useState('');
  const [stale, setStale] = useState(false);
  const [diagnostics, setDiagnostics] = useState<ShownDiagnostic[]>([]);
  // Narrow screens show one side at a time; the output side has its own tabs.
  const [side, setSide] = useState<'ts' | 'output'>('ts');
  const [outputTab, setOutputTab] = useState<'gd' | 'problems'>('gd');
  const [split, setSplit] = useState(SPLIT_DEFAULT);
  const [shareLabel, setShareLabel] = useState('Share');
  const panes = useRef<HTMLDivElement>(null);
  const client = useRef<WorkerClient>();
  const failed = useRef(false);
  const shareLabelTimer = useRef<ReturnType<typeof setTimeout>>();
  const tsEditor = useRef<Monaco.editor.IStandaloneCodeEditor>();
  const sourceRef = useRef(source);
  sourceRef.current = source;

  useEffect(() => {
    let disposed = false;
    fetch(bundleUrl)
      .then((r) => {
        if (!r.ok)
          throw new Error(
            `Could not load the Godot typings (HTTP ${r.status}).`,
          );
        return r.json() as Promise<TypingsBundle>;
      })
      .then((bundle) => {
        if (disposed) return;
        addGodotTypings(bundle);
        client.current = createWorkerClient(bundle, {
          onReady: () => {
            setStatus('converting');
            client.current!.convert(sourceRef.current, 0);
          },
          onResult: (outcome) => showOutcome(outcome),
          onFatal: (error) => {
            failed.current = true;
            setFatal(error);
            setStatus('fatal');
          },
        });
      })
      .catch((err: unknown) => {
        if (disposed) return;
        failed.current = true;
        setFatal(err instanceof Error ? err.message : String(err));
        setStatus('fatal');
      });
    return () => {
      disposed = true;
      client.current?.dispose();
      clearTimeout(shareLabelTimer.current);
    };
  }, []);

  // Follow Starlight's light/dark switch.
  useEffect(() => {
    const observer = new MutationObserver(() =>
      monaco.editor.setTheme(currentMonacoTheme()),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, [monaco]);

  // Diagnostics as editor markers.
  useEffect(() => {
    const model = tsEditor.current?.getModel();
    if (!model) return;
    monaco.editor.setModelMarkers(
      model,
      'tstogd',
      diagnostics.map((d) => ({
        // Clamped: the source may have changed since this conversion.
        ...model.validateRange(
          new monaco.Range(d.line, d.column, d.line, Number.MAX_SAFE_INTEGER),
        ),
        message: `${d.tag}: ${d.message}`,
        severity:
          d.severity === 'warning'
            ? monaco.MarkerSeverity.Warning
            : monaco.MarkerSeverity.Error,
      })),
    );
    return () => {
      if (!model.isDisposed())
        monaco.editor.setModelMarkers(model, 'tstogd', []);
    };
  }, [monaco, diagnostics]);

  function showOutcome(outcome: ConvertOutcome) {
    setStatus('ready');
    if (outcome.ok) {
      setGdCode(outcome.code);
      setStale(false);
      setDiagnostics(
        outcome.diagnostics
          .filter((d) => d.severity !== 'info')
          .map((d) => ({
            tag: d.source === 'ts' ? 'TS' : 'Converter',
            severity: d.severity,
            line: Math.max(1, d.line),
            column: Math.max(1, d.column),
            message: d.message,
          })),
      );
    } else {
      setStale(true);
      setDiagnostics([
        {
          tag: 'Internal',
          severity: 'error',
          line: 1,
          column: 1,
          message: outcome.error.split('\n')[0],
          issueUrl: issueUrl(outcome.error),
        },
      ]);
    }
  }

  function onSourceChange(next: string) {
    setSource(next);
    save(next);
    // The shared code is now older than the draft; a reload must not bring it back.
    if (location.hash.startsWith(HASH_PREFIX)) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    // The worker queues a convert behind its init, so only a failure stops it.
    if (client.current && !failed.current) {
      setStatus((s) => (s === 'loading' ? s : 'converting'));
      client.current.convert(next);
    }
  }

  function pickExample(id: string) {
    const example = EXAMPLES.find((e) => e.id === id);
    // The editor's change event then updates the source like a keystroke.
    if (example && tsEditor.current)
      replaceText(tsEditor.current, example.source);
  }

  function flashShareLabel(label: string) {
    setShareLabel(label);
    clearTimeout(shareLabelTimer.current);
    shareLabelTimer.current = setTimeout(() => setShareLabel('Share'), 2000);
  }

  async function share() {
    const encoded = compressToEncodedURIComponent(source);
    // A link the page would refuse to load is worse than no link.
    if (
      encoded.length > MAX_HASH_LENGTH ||
      source.length > MAX_SHARED_SOURCE_LENGTH
    ) {
      flashShareLabel('Too large to share');
      return;
    }
    history.replaceState(null, '', HASH_PREFIX + encoded);
    try {
      await navigator.clipboard.writeText(location.href);
      flashShareLabel('Link copied');
    } catch {
      /* clipboard blocked: the URL is still updated */
    }
  }

  function jumpTo(line: number, column: number) {
    const editor = tsEditor.current;
    if (!editor) return;
    setSide('ts');
    // After the tab switch has shown the pane, so the editor has a size.
    requestAnimationFrame(() => {
      editor.layout();
      editor.setPosition({ lineNumber: line, column });
      editor.revealLineInCenter(line);
      editor.focus();
    });
  }

  function startResize(event: PointerEvent) {
    const bounds = panes.current?.getBoundingClientRect();
    if (!bounds) return;
    const handle = event.currentTarget as HTMLElement;
    handle.setPointerCapture(event.pointerId);
    const move = (e: PointerEvent) =>
      setSplit(clampSplit(((e.clientX - bounds.left) / bounds.width) * 100));
    // `lostpointercapture` also fires after a cancelled touch or pen drag,
    // which never sends `pointerup`.
    const stop = () => {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('lostpointercapture', stop);
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('lostpointercapture', stop);
  }

  function resizeByKey(event: KeyboardEvent) {
    const step =
      event.key === 'ArrowLeft' ? -5 : event.key === 'ArrowRight' ? 5 : 0;
    if (!step) return;
    event.preventDefault();
    setSplit((s) => clampSplit(s + step));
  }

  const problemCount = diagnostics.length;

  const statusText = {
    loading: 'Loading Godot typings…',
    ready: 'Ready',
    converting: 'Converting…',
    fatal: 'Error',
  }[status];

  return (
    <div class="pg-root not-content" data-side={side}>
      <div class="pg-toolbar">
        <label>
          Example{' '}
          <select
            onChange={(e) => pickExample((e.target as HTMLSelectElement).value)}
            value=""
          >
            <option value="" disabled>
              Choose…
            </option>
            {EXAMPLE_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.examples.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <button type="button" onClick={share}>
          {shareLabel}
        </button>
        <span class="pg-status" role="status">
          {statusText}
        </span>
      </div>
      <div class="pg-sides pg-tabs" role="tablist" aria-label="Side">
        <button
          type="button"
          role="tab"
          id="pg-side-ts"
          aria-controls="pg-pane-ts"
          aria-selected={side === 'ts'}
          onClick={() => setSide('ts')}
        >
          TypeScript
        </button>
        <button
          type="button"
          role="tab"
          id="pg-side-output"
          aria-controls="pg-pane-output"
          aria-selected={side === 'output'}
          onClick={() => setSide('output')}
        >
          Output
        </button>
      </div>
      <div class="pg-panes" ref={panes} style={{ '--pg-split': `${split}%` }}>
        <section
          class="pg-pane pg-pane-ts"
          id="pg-pane-ts"
          role="tabpanel"
          aria-labelledby="pg-side-ts"
        >
          <div class="pg-pane-bar">
            <span class="pg-pane-title">TypeScript</span>
          </div>
          <Editor
            monaco={monaco}
            value={source}
            language="typescript"
            uri="file:///src/main.ts"
            onChange={onSourceChange}
            onMount={(e) => (tsEditor.current = e)}
          />
        </section>
        <div
          class="pg-divider"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panes"
          aria-valuemin={SPLIT_MIN}
          aria-valuemax={SPLIT_MAX}
          aria-valuenow={Math.round(split)}
          tabIndex={0}
          onPointerDown={startResize}
          onKeyDown={resizeByKey}
          onDblClick={() => setSplit(SPLIT_DEFAULT)}
        />
        <section
          class="pg-pane pg-pane-output"
          id="pg-pane-output"
          role="tabpanel"
          aria-labelledby="pg-side-output"
        >
          <div class="pg-pane-bar pg-tabs" role="tablist" aria-label="Output">
            <button
              type="button"
              role="tab"
              id="pg-out-gd"
              aria-controls="pg-out-gd-panel"
              aria-selected={outputTab === 'gd'}
              onClick={() => setOutputTab('gd')}
            >
              GDScript
            </button>
            <button
              type="button"
              role="tab"
              id="pg-out-problems"
              aria-controls="pg-out-problems-panel"
              aria-selected={outputTab === 'problems'}
              onClick={() => setOutputTab('problems')}
            >
              Problems
              {problemCount > 0 && <span class="pg-count">{problemCount}</span>}
            </button>
          </div>
          <div
            class="pg-out-panel pg-out-problems"
            id="pg-out-problems-panel"
            role="tabpanel"
            aria-labelledby="pg-out-problems"
            hidden={outputTab !== 'problems'}
          >
            <Diagnostics items={diagnostics} onPick={jumpTo} />
          </div>
          <div
            class="pg-out-panel"
            id="pg-out-gd-panel"
            role="tabpanel"
            aria-labelledby="pg-out-gd"
            hidden={outputTab !== 'gd'}
          >
            {fatal ? (
              <div class="pg-fatal">
                <p>The converter stopped working.</p>
                <pre>{fatal}</pre>
                <button type="button" onClick={() => location.reload()}>
                  Reload
                </button>
              </div>
            ) : status === 'loading' ? (
              <div class="pg-editor pg-placeholder">{statusText}</div>
            ) : (
              <Editor
                monaco={monaco}
                value={gdCode}
                language="gdscript"
                readOnly
                dimmed={stale}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
