export class Operators extends Node {
  v1 = Vector2(1, 2);
  v2 = Vector2(3, 4);
  i1 = 1;
  i2 = 2;
  a1 = [0, 1];
  a2 = ['a', 'b'];

  test_operators() {
    let a: int = 10;
    let b: int = 3;
    let c: boolean = a > b && a !== 0;
    let d: boolean = a < b || b === 0;
    let e: boolean = !c;
    let f: int = a + b;
    let g: float = a / b;
    let h: int = a % b;
    let i: boolean = a > b && !(a === 0);
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
    let v7 = gd.ops.add(this.a1, this.a2);
  }

  test_not_precedence() {
    let a: int = 10;
    let b: int = 3;
    let c: boolean = !(a === 0);
    let d: boolean = !(a !== 0);
    let e: boolean = !(a > b);
    let f: boolean = !(a >= b);
    let g: boolean = !(a < b);
    let h: boolean = !(a <= b);
  }

  test_ops_helpers() {
    let v3 = gd.ops.gt(this.v1, this.v2);
    let v4 = gd.ops.gte(this.v1, this.v2);
    let v5 = gd.ops.lt(this.v1, this.v2);
    let v6 = gd.ops.lte(this.v1, this.v2);
  }

  test_remainder() {
    let vi1 = Vector2i(10, 20);
    let vi2 = Vector2i(3, 7);
    let vi3 = gd.ops.rem(vi1, vi2);
    let a: int = 10;
    let b: int = 3;
    let c = a % b;
  }
}
