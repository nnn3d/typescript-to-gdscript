/**
 * Override: Global functions — adds generic type parameters to polymorphic functions.
 */

declare function abs<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function load<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function load(path: string): Resource;

declare function preload<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function preload(path: string): Resource;

declare function range(end: int): Array<int>;
declare function range(begin: int, end: int): Array<int>;
declare function range(begin: int, end: int, step: int): Array<int>;

declare function assert(condition: boolean, message?: string): void;
