/**
 * Override: Global functions — adds generic type parameters to polymorphic functions.
 */

declare function abs<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
