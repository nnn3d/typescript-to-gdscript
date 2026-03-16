class Operators extends Node {
  v1 = Vector2(1, 2);
  v2 = Vector2(3, 4);
  i1 = 1;
  i2 = 2;

  test_operators() {
    let a: int = 10;
    let b: int = 3;
    let c: boolean = a > b && a !== 0;
    let d: boolean = a < b || b === 0;
    let e: boolean = !c;
    let f: int = a + b;
    let g: float = a / b;
    let h: int = a % b;
  }

  test_vector_math() {
    let v3 = gd.ops.add(this.v1, this.v2);
    let v4 = gd.ops.mul(this.v1, this.v2);
    let v5 = gd.ops.sub(this.v1, this.v2);
    let i3 = this.i1 + this.i2;
  }

  test_multiple_vector_math() {
    let v3 = gd.ops.add(gd.ops.add(this.v1, this.v2), this.v1);
    let v4 = gd.ops.sub(gd.ops.mul(this.v1, this.v2), this.v1);
    let v5 = gd.ops.add(gd.ops.sub(this.v1, gd.ops.mul(this.v2, this.v2)), gd.ops.div(this.v1, this.v2));
    let v6 = gd.ops.add(gd.ops.sub(this.v1, 2 * 1), gd.ops.div(this.v1, this.v2));
  }

  test_ops_helpers() {
    let v3 = gd.ops.gt(this.v1, this.v2);
    let v4 = gd.ops.gte(this.v1, this.v2);
    let v5 = gd.ops.lt(this.v1, this.v2);
    let v6 = gd.ops.lte(this.v1, this.v2);
  }
}
