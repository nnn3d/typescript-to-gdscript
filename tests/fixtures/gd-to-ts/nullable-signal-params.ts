export class NullableSignalParams extends Node {
  node_entered = gd.signal<[body: Node | null, count: int]>();
  value_changed = gd.signal<[old_value: Vector2, new_value: Vector2]>();
  resource_loaded = gd.signal<[res: Resource | null]>();
  typed_packed = gd.signal<[data: PackedStringArray]>();
  untyped = gd.signal<[val: any]>();
  no_params = gd.signal();
}
