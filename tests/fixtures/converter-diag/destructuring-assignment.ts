export class Foo extends Node {
  a: int = 0;
  b: int = 0;

  test() {
    let arr = [1, 2];
    [this.a, this.b] = arr;
    ({ a: this.a } = { a: 3 });
  }
}
