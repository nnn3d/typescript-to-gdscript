class Operators extends Node {
  test_operators() {
    var a: int = 10;
    var b: int = 3;
    var c: boolean = a > b && a !== 0;
    var d: boolean = a < b || b === 0;
    var e: boolean = !c;
    var f: int = a + b;
    var g: float = a / b;
    var h: int = a % b;
  }
}
