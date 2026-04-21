export class UsesExplicitPromise extends Node {
  // FORBIDDEN: property type annotation
  cached: Promise<number> | null = null;

  // ALLOWED: async function return type
  async loadOk(): Promise<number> {
    return 42;
  }

  // FORBIDDEN: non-async function return type
  loadBad(): Promise<number> {
    return 42 as unknown as Promise<number>;
  }

  // FORBIDDEN: parameter type
  consume(p: Promise<number>) {
    this.cached = p;
  }

  // FORBIDDEN: local variable annotation
  run(source: number) {
    let x: Promise<number> = this.loadOk();
    this.cached = x;
  }

  // FORBIDDEN: nested inside otherwise-allowed async return
  async nested(): Promise<Promise<number>> {
    return this.loadOk() as unknown as Promise<number>;
  }
}
