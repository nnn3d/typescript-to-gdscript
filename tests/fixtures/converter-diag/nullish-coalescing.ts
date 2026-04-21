export class Foo extends Node {
  test() {
    let a: Node = this;
    let b = a ?? this;
  }
}
