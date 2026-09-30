import type { TypingsBundle } from '../../../src/browser/index.ts';
import type {
  ConvertOutcome,
  WorkerRequest,
  WorkerResponse,
} from './protocol.ts';

/**
 * A conversion takes milliseconds; one still running after this is stuck.
 * The worker shares the tab's process, so a stuck and allocating worker can
 * take the whole tab down — it is replaced instead.
 */
const CONVERT_TIMEOUT_MS = 10_000;

export interface WorkerHandlers {
  onReady(): void;
  onResult(outcome: ConvertOutcome): void;
  onFatal(error: string): void;
}

export interface WorkerClient {
  /** Convert after `delayMs` of quiet; a newer call cancels a pending one. */
  convert(source: string, delayMs?: number): void;
  dispose(): void;
}

export function createWorkerClient(
  bundle: TypingsBundle,
  handlers: WorkerHandlers,
): WorkerClient {
  let worker: Worker;
  let latestId = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let watchdog: ReturnType<typeof setTimeout> | undefined;
  // The newest request sent; the worker answers in order, so the watchdog
  // guards this one and only its answer clears it.
  let sentId = 0;
  // A replacement worker reports `ready` again; the page must not reconvert
  // the source that just hung, so that `ready` is swallowed.
  let replacing = false;

  const send = (message: WorkerRequest) => worker.postMessage(message);

  function start() {
    worker = new Worker(new URL('./convert.worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data;
      if (msg.type === 'ready') {
        if (replacing) replacing = false;
        else handlers.onReady();
      } else if (msg.type === 'fatal') {
        handlers.onFatal(msg.error);
      } else {
        if (msg.id === sentId) clearTimeout(watchdog);
        if (msg.id === latestId) handlers.onResult(msg); // older answers are stale
      }
    };
    worker.onerror = (event) =>
      handlers.onFatal(event.message || 'The converter worker crashed.');
    send({ type: 'init', bundle });
  }

  function replaceStuckWorker(id: number) {
    worker.terminate();
    replacing = true;
    start();
    if (id === latestId) {
      handlers.onResult({
        ok: false,
        error: `The conversion did not finish within ${CONVERT_TIMEOUT_MS / 1000} s and was stopped.`,
      });
    }
  }

  start();

  return {
    convert(source, delayMs = 300) {
      clearTimeout(timer);
      // Taken now, so a result for older source is dropped as soon as a
      // newer edit arrives, not only once its own request is sent.
      const id = ++latestId;
      timer = setTimeout(() => {
        send({ type: 'convert', id, source });
        sentId = id;
        clearTimeout(watchdog);
        watchdog = setTimeout(() => replaceStuckWorker(id), CONVERT_TIMEOUT_MS);
      }, delayMs);
    },
    dispose() {
      clearTimeout(timer);
      clearTimeout(watchdog);
      worker.terminate();
    },
  };
}
