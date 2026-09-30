import type {
  PlaygroundDiagnostic,
  TypingsBundle,
} from '../../../src/browser/index.ts';

export type WorkerRequest =
  | { type: 'init'; bundle: TypingsBundle }
  | { type: 'convert'; id: number; source: string };

export type ConvertOutcome =
  | { ok: true; code: string; diagnostics: PlaygroundDiagnostic[] }
  | { ok: false; error: string };

export type WorkerResponse =
  | { type: 'ready' }
  | { type: 'fatal'; error: string }
  | ({ type: 'result'; id: number } & ConvertOutcome);
