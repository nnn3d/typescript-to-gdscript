export namespace Order {
  export enum Enum1 { TEST }
  export enum Enum2 { TEST }
}

export class Order extends Node {
  static STATIC1 = 1;
  static readonly CONST1 = 1;
  field1 = 1;
  signal1 = gd.signal();

  func1() {
    return 1;
  }

  signal2 = gd.signal();
  field2 = 2;
  static readonly CONST2 = 2;
  static STATIC2 = 2;

  func2() {
    return 2;
  }
}
