export class __CLASS__ extends Node {
  async produce(): Promise<int> {
    return 1;
  }

  consume(fn: () => Promise<int>) {
    // ❌ Promise assigned to a variable without await
    let a = this.produce();
    // ❌ Promise passed as an argument without await
    print(this.produce());
    // ❌ Promise returned without await (no auto-unwrap in GD)
    return fn();
  }

  good() {
    // ✅ Discarded as statement
    this.produce();
  }
}
