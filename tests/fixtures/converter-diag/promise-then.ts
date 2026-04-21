export class UsesPromiseThen extends Node {
  async load(): Promise<number> {
    return 42;
  }

  run() {
    const p = this.load();
    p.then(v => v + 1);
    p.catch(e => e);
    p.finally(() => {});
  }
}
