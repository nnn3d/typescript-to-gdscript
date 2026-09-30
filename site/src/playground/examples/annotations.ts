// Decorators become annotations. `@exports` stands in for `@export`,
// which is a reserved word in TypeScript.
export class Enemy extends Node2D {
  @exports speed: float = 120.0;
  @export_range(0, 100) health: int = 100;
  @onready sprite: Sprite2D | null = gd.as(this.get_node('Sprite2D'), Sprite2D);
}
