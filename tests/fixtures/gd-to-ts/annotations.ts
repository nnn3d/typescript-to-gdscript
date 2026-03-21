export class Annotations extends Node {
  @gd.export
  health: int = 100;
  @gd.export
  speed: float = 5.0;
  @gd.onready
  label: Label = this.getNode("Label");
}
