/**
 * Override: Global functions — adds generic type parameters to polymorphic functions.
 */
declare function abs<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function ceil<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function clamp<T extends int | float>(value: T, min: T, max: T): T;

declare function floor<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function lerp<T extends int | float | Vector2 | Vector3 | Vector4 | Color | Quaternion | Basis | Transform2D | Transform3D>(from_: T, to: T, weight: float): T;

declare function load<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function load<T extends Resource = Resource>(path: string): T;

declare function max<T extends int | float>(...args: T[]): T;

declare function min<T extends int | float>(...args: T[]): T;

declare function preload<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function preload<T extends Resource = Resource>(path: string): T;

declare function range(end: int): Array<int>;
declare function range(begin: int, end: int): Array<int>;
declare function range(begin: int, end: int, step: int): Array<int>;

declare function round<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function sign<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;

declare function snapped<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T, step: T): T;

declare function weakref(obj: GodotObject): WeakRef;

declare function wrap<T extends int | float>(value: T, min: T, max: T): T;

declare function assert(condition: boolean, message?: string): void;
