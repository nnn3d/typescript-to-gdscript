// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

// Operator overloads for int/float (number type)
interface Number {
  [__ne]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__mul]: { right: Color; ret: Color } | { right: Quaternion; ret: Quaternion } | { right: Vector2; ret: Vector2 } | { right: Vector2i; ret: Vector2i } | { right: Vector3; ret: Vector3 } | { right: Vector3i; ret: Vector3i } | { right: Vector4; ret: Vector4 } | { right: Vector4i; ret: Vector4i } | { right: float; ret: float } | { right: int; ret: int } | { right: Vector2i; ret: Vector2 } | { right: Vector3i; ret: Vector3 } | { right: Vector4i; ret: Vector4 } | { right: int; ret: float };
  [__add]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__sub]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__div]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__lt]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__lte]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__eq]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__gt]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__gte]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__plus]: { ret: int } | { ret: float };
  [__minus]: { ret: int } | { ret: float };
}
