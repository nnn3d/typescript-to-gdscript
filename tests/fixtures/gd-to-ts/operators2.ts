class Operators2 extends Operators {
  test_vector_math() {
    let v3 = gd.ops.add(this.v1, this.v2);
    let v4 = gd.ops.mul(this.v1, this.v2);
    let v5 = gd.ops.sub(this.v1, this.v2);
    let v6 = gd.ops.mul(this.v1, 1);
    let i3 = this.i1 + this.i2;
  }
}
