export class NullableSignalParams extends Node {
  node_entered = gd.signal<[Node | null, int]>();
  value_changed = gd.signal<[Vector2, Vector2]>();
  resource_loaded = gd.signal<[Resource | null]>();
  typed_packed = gd.signal<[PackedStringArray]>();
  untyped = gd.signal<[any]>();
  no_params = gd.signal();
}
