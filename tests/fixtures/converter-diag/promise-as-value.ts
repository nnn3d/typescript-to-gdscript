export class Foo extends Node {
  async produce(): Promise<number> {
    return 1;
  }

  consume(fn: () => Promise<number>) {
    // ❌ Promise assigned to a variable without await
    let a = this.produce();
    // ❌ Promise passed as a function argument without await
    print(this.produce());
    // ❌ Promise in a return statement without await (even in async fn — GD won't auto-unwrap)
    return fn();
  }

  good() {
    // ✅ Plain expression statement — value discarded, no Promise misuse
    this.produce();
    // ✅ Awaited
    let b: number = 0;
    // (b = await this.produce();  — skipped to keep fixture free of unrelated TS errors)
  }
}
