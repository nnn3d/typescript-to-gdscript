export class Order extends Node {
  static STATIC1 = 1;
  static readonly CONST1 = 1;
  field1 = 1;
  static enum1 = gd.enum('TEST');
  signal1 = gd.signal();

  func1() {
    return 1;
  }

  signal2 = gd.signal();
  static enum2 = gd.enum('TEST');
  field2 = 2;
  static readonly CONST2 = 2;
  static STATIC2 = 2;

  func2() {
    return 2;
  }
}
