export interface ShownDiagnostic {
  tag: 'TS' | 'Converter' | 'Internal';
  severity: string;
  line: number;
  column: number;
  message: string;
  /** Set on internal errors: a prefilled GitHub issue. */
  issueUrl?: string;
}

interface DiagnosticsProps {
  items: ShownDiagnostic[];
  onPick(line: number, column: number): void;
}

export function Diagnostics({ items, onPick }: DiagnosticsProps) {
  if (items.length === 0) {
    return <p class="pg-diagnostics pg-diagnostics-empty">No problems.</p>;
  }
  return (
    <ul class="pg-diagnostics">
      {items.map((d, i) => (
        <li key={i} class={`pg-diag pg-diag-${d.severity}`}>
          <button
            type="button"
            class="pg-diag-pos"
            aria-label={`Go to line ${d.line}, column ${d.column}`}
            onClick={() => onPick(d.line, d.column)}
          >
            {d.line}:{d.column}
          </button>
          <span class="pg-diag-tag">{d.tag}</span>
          <span class="pg-diag-msg">{d.message}</span>
          {d.issueUrl && (
            <a
              class="pg-diag-issue"
              href={d.issueUrl}
              target="_blank"
              rel="noopener"
            >
              Report an issue
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
