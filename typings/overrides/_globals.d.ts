/**
 * Override: Global functions — adds generic type parameters to polymorphic functions.
 */

/** Returns the absolute value of a parameter. Supported types: {@link int}, {@link float}, {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}. */
declare function abs<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
