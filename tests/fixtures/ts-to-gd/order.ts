// Class-level GD `const` comes from the paired namespace block.
// `static` fields stay as `static var`; `readonly` (whether on its own
// or combined with `static`) is a TS-only contract and emits a plain
// `var` / `static var` on the GD side.
export namespace Order {
  export enum Enum1 { TEST }
  export enum Enum2 { TEST }
  export const CONST1 = 1;
  export const CONST2 = 2;
}

export class Order extends Node {
  static STATIC1 = 1;
  static readonly CONST_STATIC1 = 1;
  field1 = 1;
  signal1 = gd.signal();

  func1() {
    return 1;
  }

  signal2 = gd.signal();
  field2 = 2;
  static readonly CONST_STATIC2 = 2;
  static STATIC2 = 2;

  func2() {
    return 2;
  }
}
