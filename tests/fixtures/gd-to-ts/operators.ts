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
    let _a1 = gd.ops.add(this.a1, this.a2);
    let _a2 = this.get_tree().get_nodes_in_group("a") + this.get_tree().get_nodes_in_group("b");
    for (let n of gd.ops.add(this.get_tree().get_nodes_in_group("a"), this.get_tree().get_nodes_in_group("b"))) {
      print(n);
    }
    for (let n of gd.ops.add(gd.ops.add(this.get_tree().get_nodes_in_group("a"), this.get_tree().get_nodes_in_group("b")), this.get_tree().get_nodes_in_group("c"))) {
      print(n);
    }
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

  test_logical_value(arg_a, arg_b) {
    let a: int = 10;
    let b: int = 3;
    // Value context — should wrap in bool()
    let x = bool(a || b);
    let y = bool(a && b);
    // Boolean context — no bool() needed
    if (a || b) {

    }
    // Bool result (comparisons) — no bool() needed
    let z: boolean = a > 0 && b > 0;
    // Nested chain — only outermost wraps
    let w = bool(a || b && a);
    return bool(arg_a || arg_b);
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
