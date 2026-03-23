export class Annotations extends Node {
  @exports
  health: int = 100;
  @exports
  speed: float = 5.0;
  @onready
  label: Label = this.get_node("Label");
}
