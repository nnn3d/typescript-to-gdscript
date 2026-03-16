// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A handle for a {@link Resource}'s unique identifier. */
declare class RID {
  /** Returns the ID of the referenced low-level resource. */
  get_id(): int;
  /** Returns `true` if the {@link RID} is not `0`. */
  is_valid(): boolean;

  // Operator overloads
  [__ne]: { right: RID; ret: boolean };
  [__lt]: { right: RID; ret: boolean };
  [__lte]: { right: RID; ret: boolean };
  [__eq]: { right: RID; ret: boolean };
  [__gt]: { right: RID; ret: boolean };
  [__gte]: { right: RID; ret: boolean };
}
