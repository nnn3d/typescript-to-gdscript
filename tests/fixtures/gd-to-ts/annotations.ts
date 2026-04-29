export namespace Annotations {
  export const v = 0;
}
@tool
export class Annotations extends Node {
  @export_group("group")
  @exports
  health: int = 100;
  @export_file()
  name: string;
  @export_file("*.txt")
  info: string;
  @onready
  label: Label = this.get_node("Label");

  test() {
    // @gd.eval: @warning_ignore("integer_division")
    let a = 11 / 2;
  }
}
