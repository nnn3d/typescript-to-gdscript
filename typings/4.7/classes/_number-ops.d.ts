// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

// Operator overloads for int/float (number type)
declare interface Number {
  [__ops_ne]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_rem]: { right: int; ret: int };
  [__ops_mul]: { right: Color; ret: Color } | { right: Quaternion; ret: Quaternion } | { right: Vector2; ret: Vector2 } | { right: Vector2i; ret: Vector2i } | { right: Vector3; ret: Vector3 } | { right: Vector3i; ret: Vector3i } | { right: Vector4; ret: Vector4 } | { right: Vector4i; ret: Vector4i } | { right: float; ret: float } | { right: int; ret: int } | { right: Vector2i; ret: Vector2 } | { right: Vector3i; ret: Vector3 } | { right: Vector4i; ret: Vector4 } | { right: int; ret: float };
  [__ops_add]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__ops_sub]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__ops_div]: { right: float; ret: float } | { right: int; ret: int } | { right: int; ret: float };
  [__ops_lt]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_lte]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_eq]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_gt]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_gte]: { right: float; ret: boolean } | { right: int; ret: boolean };
  [__ops_plus]: { ret: int } | { ret: float };
  [__ops_minus]: { ret: int } | { ret: float };
}
