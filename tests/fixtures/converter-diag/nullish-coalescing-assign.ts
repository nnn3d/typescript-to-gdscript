export class Foo extends Node {
  test() {
    let a: Node = this;
    a ??= this;
  }
}
