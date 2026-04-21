export class Foo extends Node {
  test(a: undefined) {}
  test2(a: number | undefined) {}
  test3(v?: number) {
    let v2 = v;
    this.test(v);
    this.test(v2);
  }
}
