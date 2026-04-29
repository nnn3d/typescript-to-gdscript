export class NullableValueTypes extends RefCounted {
  changed = gd.signal<[Vector2, Color, PackedInt32Array]>();

  take_vector(v: Vector2): void {
  }

  take_color(c: Color): void {
  }

  take_packed(a: PackedByteArray, b: PackedVector2Array): void {
  }

  take_transform(t: Transform2D, t3: Transform3D): void {
  }

  take_rid(r: RID): void {
  }

  take_stringname(n: StringName): void {
  }

  take_nodepath(p: NodePath): void {
  }

  take_array_dict(a: Array<any>, d: Dictionary): void {
  }
}
