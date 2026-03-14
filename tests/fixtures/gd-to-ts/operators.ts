class Operators extends Node {
  v1 = Vector2(1, 2);
  v2 = Vector2(3, 4);
  i1 = 1;
  i2 = 2;

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

  test_vector_math() {
    var v3 = gd.math.add(this.v1, this.v2);
    var v4 = gd.math.mul(this.v1, this.v2);
    var v5 = gd.math.sub(this.v1, this.v2);
    var i3 = this.i1 + this.i2;
  }
}
