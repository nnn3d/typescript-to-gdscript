export class NullableSetterParam extends Node {
  get target(): Node | null {
    return this.target;
  }

  set target(value: Node | null) {
    this.target = value;
  }

  get position(): Vector2 {
    return this.position;
  }

  set position(value: Vector2) {
    this.position = value;
  }

  get count(): int {
    return this.count;
  }

  set count(value: int) {
    this.count = value;
  }
}
