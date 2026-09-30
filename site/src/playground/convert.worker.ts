import {
  createBrowserConverter,
  type BrowserConverter,
} from '../../../src/browser/index.ts';
import type { WorkerRequest, WorkerResponse } from './protocol.ts';

let converter: BrowserConverter | undefined;

const post = (message: WorkerResponse) => self.postMessage(message);
const describe = (err: unknown) =>
  err instanceof Error ? (err.stack ?? err.message) : String(err);

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;
  if (msg.type === 'init') {
    try {
      converter = createBrowserConverter(msg.bundle);
      converter.convert(''); // builds the program over the typings once, up front
      post({ type: 'ready' });
    } catch (err) {
      post({ type: 'fatal', error: describe(err) });
    }
    return;
  }
  if (!converter) {
    post({
      type: 'result',
      id: msg.id,
      ok: false,
      error: 'The converter is not initialized.',
    });
    return;
  }
  try {
    const { code, diagnostics } = converter.convert(msg.source);
    post({ type: 'result', id: msg.id, ok: true, code, diagnostics });
  } catch (err) {
    post({ type: 'result', id: msg.id, ok: false, error: describe(err) });
  }
};
