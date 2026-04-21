export class Foo extends Node {
  test() {
    let obj: Node = this;
    let x = obj?.get_name();
  }
}
