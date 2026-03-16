// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A comparison function for common types within the visual shader graph. */
declare class VisualShaderNodeCompare extends VisualShaderNode {
  /** Extra condition which is applied if {@link type} is set to {@link CTYPE_VECTOR_3D}. */
  condition: int;
  /** A comparison function. */
  function: int;
  /** The type to be used in the comparison. */
  type: int;

  // enum ComparisonType
  /** A floating-point scalar. */
  static readonly CTYPE_SCALAR: int;
  /** An integer scalar. */
  static readonly CTYPE_SCALAR_INT: int;
  /** An unsigned integer scalar. */
  static readonly CTYPE_SCALAR_UINT: int;
  /** A 2D vector type. */
  static readonly CTYPE_VECTOR_2D: int;
  /** A 3D vector type. */
  static readonly CTYPE_VECTOR_3D: int;
  /** A 4D vector type. */
  static readonly CTYPE_VECTOR_4D: int;
  /** A boolean type. */
  static readonly CTYPE_BOOLEAN: int;
  /** A transform (`mat4`) type. */
  static readonly CTYPE_TRANSFORM: int;
  /** Represents the size of the {@link ComparisonType} enum. */
  static readonly CTYPE_MAX: int;
  // enum Function
  /** Comparison for equality (`a == b`). */
  static readonly FUNC_EQUAL: int;
  /** Comparison for inequality (`a != b`). */
  static readonly FUNC_NOT_EQUAL: int;
  /**
   * Comparison for greater than (`a > b`). Cannot be used if {@link type} set to {@link CTYPE_BOOLEAN} or {@link CTYPE_TRANSFORM}.
   */
  static readonly FUNC_GREATER_THAN: int;
  /**
   * Comparison for greater than or equal (`a >= b`). Cannot be used if {@link type} set to {@link CTYPE_BOOLEAN} or {@link CTYPE_TRANSFORM}.
   */
  static readonly FUNC_GREATER_THAN_EQUAL: int;
  /**
   * Comparison for less than (`a < b`). Cannot be used if {@link type} set to {@link CTYPE_BOOLEAN} or {@link CTYPE_TRANSFORM}.
   */
  static readonly FUNC_LESS_THAN: int;
  /**
   * Comparison for less than or equal (`a <= b`). Cannot be used if {@link type} set to {@link CTYPE_BOOLEAN} or {@link CTYPE_TRANSFORM}.
   */
  static readonly FUNC_LESS_THAN_EQUAL: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
  // enum Condition
  /** The result will be `true` if all components in the vector satisfy the comparison condition. */
  static readonly COND_ALL: int;
  /** The result will be `true` if any component in the vector satisfies the comparison condition. */
  static readonly COND_ANY: int;
  /** Represents the size of the {@link Condition} enum. */
  static readonly COND_MAX: int;
}
