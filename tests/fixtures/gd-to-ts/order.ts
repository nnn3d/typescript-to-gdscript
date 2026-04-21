export namespace Order {
  export const CONST1 = 1;
  export enum enum1 { TEST }
  export enum enum2 { TEST }
  export const CONST2 = 2;
}

export class Order extends Node {
  static STATIC1 = 1;
  field1 = 1;
  signal1 = gd.signal();

  func1() {
    return 1;
  }

  signal2 = gd.signal();
  field2 = 2;
  static STATIC2 = 2;

  func2() {
    return 2;
  }
}
