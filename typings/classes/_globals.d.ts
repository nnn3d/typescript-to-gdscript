// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

// @GlobalScope — global functions and constants

/**
 * Override: Global functions — adds generic type parameters to polymorphic functions.
 */
declare function abs<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
/** Returns the absolute value of float parameter `x` (i.e. positive value). */
declare function absf(x: float): float;
/** Returns the absolute value of int parameter `x` (i.e. positive value). */
declare function absi(x: int): int;
/**
 * Returns the arc cosine of `x` in radians. Use to get the angle of cosine `x`. `x` will be clamped between `-1.0` and `1.0` (inclusive), in order to prevent {@link acos} from returning {@link @GDScript.NAN}.
 */
declare function acos(x: float): float;
/**
 * Returns the hyperbolic arc (also called inverse) cosine of `x`, returning a value in radians. Use it to get the angle from an angle's cosine in hyperbolic space if `x` is larger or equal to 1. For values of `x` lower than 1, it will return 0, in order to prevent {@link acosh} from returning {@link @GDScript.NAN}.
 */
declare function acosh(x: float): float;
/**
 * Returns the difference between the two angles (in radians), in the range of `[-PI, +PI]`. When `from` and `to` are opposite, returns `-PI` if `from` is smaller than `to`, or `PI` otherwise.
 */
declare function angle_difference(from_: float, to: float): float;
/**
 * Returns the arc sine of `x` in radians. Use to get the angle of sine `x`. `x` will be clamped between `-1.0` and `1.0` (inclusive), in order to prevent {@link asin} from returning {@link @GDScript.NAN}.
 */
declare function asin(x: float): float;
/**
 * Returns the hyperbolic arc (also called inverse) sine of `x`, returning a value in radians. Use it to get the angle from an angle's sine in hyperbolic space.
 */
declare function asinh(x: float): float;
/**
 * Returns the arc tangent of `x` in radians. Use it to get the angle from an angle's tangent in trigonometry.
 * The method cannot know in which quadrant the angle should fall. See {@link atan2} if you have both `y` and [code skip-lint]x[/code].
 * If `x` is between `-PI / 2` and `PI / 2` (inclusive), `atan(tan(x))` is equal to `x`.
 */
declare function atan(x: float): float;
/**
 * Returns the arc tangent of `y/x` in radians. Use to get the angle of tangent `y/x`. To compute the value, the method takes into account the sign of both arguments in order to determine the quadrant.
 * Important note: The Y coordinate comes first, by convention.
 */
declare function atan2(y: float, x: float): float;
/**
 * Returns the hyperbolic arc (also called inverse) tangent of `x`, returning a value in radians. Use it to get the angle from an angle's tangent in hyperbolic space if `x` is between -1 and 1 (non-inclusive).
 * In mathematics, the inverse hyperbolic tangent is only defined for -1 < `x` < 1 in the real set, so values equal or lower to -1 for `x` return negative {@link @GDScript.INF} and values equal or higher than 1 return positive {@link @GDScript.INF} in order to prevent {@link atanh} from returning {@link @GDScript.NAN}.
 */
declare function atanh(x: float): float;
/**
 * Returns the derivative at the given `t` on a one-dimensional Bézier curve (https://en.wikipedia.org/wiki/B%C3%A9zier_curve) defined by the given `control_1`, `control_2`, and `end` points.
 */
declare function bezier_derivative(start: float, control_1: float, control_2: float, end: float, t: float): float;
/**
 * Returns the point at the given `t` on a one-dimensional Bézier curve (https://en.wikipedia.org/wiki/B%C3%A9zier_curve) defined by the given `control_1`, `control_2`, and `end` points.
 */
declare function bezier_interpolate(start: float, control_1: float, control_2: float, end: float, t: float): float;
/**
 * Decodes a byte array back to a {@link Variant} value, without decoding objects.
 * **Note:** If you need object deserialization, see {@link bytes_to_var_with_objects}.
 */
declare function bytes_to_var(bytes: PackedByteArray): unknown;
/**
 * Decodes a byte array back to a {@link Variant} value. Decoding objects is allowed.
 * **Warning:** Deserialized object can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats (remote code execution).
 */
declare function bytes_to_var_with_objects(bytes: PackedByteArray): unknown;
/**
 * Rounds `x` upward (towards positive infinity), returning the smallest whole number that is not less than `x`. Supported types: [int], [float], {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}.
 * See also {@link floor}, {@link round}, and {@link snapped}.
 * **Note:** For better type safety, use {@link ceilf}, {@link ceili}, {@link Vector2.ceil}, {@link Vector3.ceil}, or {@link Vector4.ceil}.
 */
declare function ceil<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
/**
 * Rounds `x` upward (towards positive infinity), returning the smallest whole number that is not less than `x`.
 * A type-safe version of {@link ceil}, returning a [float].
 */
declare function ceilf(x: float): float;
/**
 * Rounds `x` upward (towards positive infinity), returning the smallest whole number that is not less than `x`.
 * A type-safe version of {@link ceil}, returning an [int].
 */
declare function ceili(x: float): int;
/**
 * Clamps the `value`, returning a {@link Variant} not less than `min` and not more than `max`. Any values that can be compared with the less than and greater than operators will work.
 * **Note:** For better type safety, use {@link clampf}, {@link clampi}, {@link Vector2.clamp}, {@link Vector2i.clamp}, {@link Vector3.clamp}, {@link Vector3i.clamp}, {@link Vector4.clamp}, {@link Vector4i.clamp}, or {@link Color.clamp} (not currently supported by this method).
 * **Note:** When using this on vectors it will *not* perform component-wise clamping, and will pick `min` if `value < min` or `max` if `value > max`. To perform component-wise clamping use the methods listed above.
 */
declare function clamp<T extends int | float>(value: T, min: T, max: T): T;
/** Clamps the `value`, returning a [float] not less than `min` and not more than `max`. */
declare function clampf(value: float, min: float, max: float): float;
/** Clamps the `value`, returning an [int] not less than `min` and not more than `max`. */
declare function clampi(value: int, min: int, max: int): int;
/** Returns the cosine of angle `angle_rad` in radians. */
declare function cos(angle_rad: float): float;
/** Returns the hyperbolic cosine of `x` in radians. */
declare function cosh(x: float): float;
/**
 * Cubic interpolates between two values by the factor defined in `weight` with `pre` and `post` values.
 */
declare function cubic_interpolate(from_: float, to: float, pre: float, post: float, weight: float): float;
/**
 * Cubic interpolates between two rotation values with shortest path by the factor defined in `weight` with `pre` and `post` values. See also {@link lerp_angle}.
 */
declare function cubic_interpolate_angle(from_: float, to: float, pre: float, post: float, weight: float): float;
/**
 * Cubic interpolates between two rotation values with shortest path by the factor defined in `weight` with `pre` and `post` values. See also {@link lerp_angle}.
 * It can perform smoother interpolation than {@link cubic_interpolate} by the time values.
 */
declare function cubic_interpolate_angle_in_time(from_: float, to: float, pre: float, post: float, weight: float, to_t: float, pre_t: float, post_t: float): float;
/**
 * Cubic interpolates between two values by the factor defined in `weight` with `pre` and `post` values.
 * It can perform smoother interpolation than {@link cubic_interpolate} by the time values.
 */
declare function cubic_interpolate_in_time(from_: float, to: float, pre: float, post: float, weight: float, to_t: float, pre_t: float, post_t: float): float;
/** Converts from decibels to linear energy (audio). */
declare function db_to_linear(db: float): float;
/** Converts an angle expressed in degrees to radians. */
declare function deg_to_rad(deg: float): float;
/**
 * Returns an "eased" value of `x` based on an easing function defined with `curve`. This easing function is based on an exponent. The `curve` can be any floating-point number, with specific values leading to the following behaviors:
 * [codeblock lang=text]
 * - Lower than -1.0 (exclusive): Ease in-out
 * - -1.0: Linear
 * - Between -1.0 and 0.0 (exclusive): Ease out-in
 * - 0.0: Constant
 * - Between 0.0 to 1.0 (exclusive): Ease out
 * - 1.0: Linear
 * - Greater than 1.0 (exclusive): Ease in
 * [/codeblock]
 * ease() curve values cheatsheet (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/ease_cheatsheet.png)
 * See also {@link smoothstep}. If you need to perform more advanced transitions, use {@link Tween.interpolate_value}.
 */
declare function ease(x: float, curve: float): float;
/** Returns a human-readable name for the given {@link Error} code. */
declare function error_string(error: int): string;
/**
 * The natural exponential function. It raises the mathematical constant *e* to the power of `x` and returns it.
 * *e* has an approximate value of 2.71828, and can be obtained with `exp(1)`.
 * For exponents to other bases use the method {@link pow}.
 */
declare function exp(x: float): float;
/**
 * Rounds `x` downward (towards negative infinity), returning the largest whole number that is not more than `x`. Supported types: [int], [float], {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}.
 * See also {@link ceil}, {@link round}, and {@link snapped}.
 * **Note:** For better type safety, use {@link floorf}, {@link floori}, {@link Vector2.floor}, {@link Vector3.floor}, or {@link Vector4.floor}.
 */
declare function floor<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
/**
 * Rounds `x` downward (towards negative infinity), returning the largest whole number that is not more than `x`.
 * A type-safe version of {@link floor}, returning a [float].
 */
declare function floorf(x: float): float;
/**
 * Rounds `x` downward (towards negative infinity), returning the largest whole number that is not more than `x`.
 * A type-safe version of {@link floor}, returning an [int].
 * **Note:** This function is *not* the same as `int(x)`, which rounds towards 0.
 */
declare function floori(x: float): int;
/**
 * Returns the floating-point remainder of `x` divided by `y`, keeping the sign of `x`.
 * For the integer remainder operation, use the `%` operator.
 */
declare function fmod(x: float, y: float): float;
/**
 * Returns the floating-point modulus of `x` divided by `y`, wrapping equally in positive and negative.
 * Prints:
 * [codeblock lang=text]
 * (x)  (fmod(x, 1.5))   (fposmod(x, 1.5))
 * -1.5           -0.0  |  0.0
 * -1.0           -1.0  |  0.5
 * -0.5           -0.5  |  1.0
 * 0.0            0.0  |  0.0
 * 0.5            0.5  |  0.5
 * 1.0            1.0  |  1.0
 * 1.5            0.0  |  0.0
 * [/codeblock]
 */
declare function fposmod(x: float, y: float): float;
/** Returns the integer hash of the passed `variable`. */
declare function hash(variable: unknown): int;
/**
 * Returns the {@link Object} that corresponds to `instance_id`. All Objects have a unique instance ID. See also {@link Object.get_instance_id}.
 */
declare function instance_from_id(instance_id: int): GodotObject;
/**
 * Returns an interpolation or extrapolation factor considering the range specified in `from` and `to`, and the interpolated value specified in `weight`. The returned value will be between `0.0` and `1.0` if `weight` is between `from` and `to` (inclusive). If `weight` is located outside this range, then an extrapolation factor will be returned (return value lower than `0.0` or greater than `1.0`). Use {@link clamp} on the result of {@link inverse_lerp} if this is not desired.
 * See also {@link lerp}, which performs the reverse of this operation, and {@link remap} to map a continuous series of values to another.
 */
declare function inverse_lerp(from_: float, to: float, weight: float): float;
/**
 * Returns `true` if `a` and `b` are approximately equal to each other.
 * Here, "approximately equal" means that `a` and `b` are within a small internal epsilon of each other, which scales with the magnitude of the numbers.
 * Infinity values of the same sign are considered equal.
 */
declare function is_equal_approx(a: float, b: float): boolean;
/**
 * Returns whether `x` is a finite value, i.e. it is not {@link @GDScript.NAN}, positive infinity, or negative infinity. See also {@link is_inf} and {@link is_nan}.
 */
declare function is_finite(x: float): boolean;
/**
 * Returns `true` if `x` is either positive infinity or negative infinity. See also {@link is_finite} and {@link is_nan}.
 */
declare function is_inf(x: float): boolean;
/**
 * Returns `true` if the Object that corresponds to `id` is a valid object (e.g. has not been deleted from memory). All Objects have a unique instance ID.
 */
declare function is_instance_id_valid(id: int): boolean;
/** Returns `true` if `instance` is a valid Object (e.g. has not been deleted from memory). */
declare function is_instance_valid(instance: unknown): boolean;
/**
 * Returns `true` if `x` is a NaN ("Not a Number" or invalid) value. This method is needed as {@link @GDScript.NAN} is not equal to itself, which means `x == NAN` can't be used to check whether a value is a NaN.
 */
declare function is_nan(x: float): boolean;
/**
 * Returns `true`, for value types, if `a` and `b` share the same value. Returns `true`, for reference types, if the references of `a` and `b` are the same.
 * These are {@link Variant} value types: `null`, [bool], [int], [float], {@link String}, {@link StringName}, {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}, {@link Rect2}, {@link Rect2i}, {@link Transform2D}, {@link Transform3D}, {@link Plane}, {@link Quaternion}, {@link AABB}, {@link Basis}, {@link Projection}, {@link Color}, {@link NodePath}, {@link RID}, {@link Callable} and {@link Signal}.
 * These are {@link Variant} reference types: {@link Object}, {@link Dictionary}, {@link Array}, {@link PackedByteArray}, {@link PackedInt32Array}, {@link PackedInt64Array}, {@link PackedFloat32Array}, {@link PackedFloat64Array}, {@link PackedStringArray}, {@link PackedVector2Array}, {@link PackedVector3Array}, {@link PackedVector4Array}, and {@link PackedColorArray}.
 */
declare function is_same(a: unknown, b: unknown): boolean;
/**
 * Returns `true` if `x` is zero or almost zero. The comparison is done using a tolerance calculation with a small internal epsilon.
 * This function is faster than using {@link is_equal_approx} with one value as zero.
 */
declare function is_zero_approx(x: float): boolean;
/**
 * Linearly interpolates between two values by the factor defined in `weight`. To perform interpolation, `weight` should be between `0.0` and `1.0` (inclusive). However, values outside this range are allowed and can be used to perform *extrapolation*. If this is not desired, use {@link clampf} to limit `weight`.
 * Both `from` and `to` must be the same type. Supported types: [int], [float], {@link Vector2}, {@link Vector3}, {@link Vector4}, {@link Color}, {@link Quaternion}, {@link Basis}, {@link Transform2D}, {@link Transform3D}.
 * See also {@link inverse_lerp} which performs the reverse of this operation. To perform eased interpolation with {@link lerp}, combine it with {@link ease} or {@link smoothstep}. See also {@link remap} to map a continuous series of values to another.
 * **Note:** For better type safety, use {@link lerpf}, {@link Vector2.lerp}, {@link Vector3.lerp}, {@link Vector4.lerp}, {@link Color.lerp}, {@link Quaternion.slerp}, {@link Basis.slerp}, {@link Transform2D.interpolate_with}, or {@link Transform3D.interpolate_with}.
 */
declare function lerp<T extends int | float | Vector2 | Vector3 | Vector4 | Color | Quaternion | Basis | Transform2D | Transform3D>(from_: T, to: T, weight: float): T;
/**
 * Linearly interpolates between two angles (in radians) by a `weight` value between 0.0 and 1.0.
 * Similar to {@link lerp}, but interpolates correctly when the angles wrap around {@link @GDScript.TAU}. To perform eased interpolation with {@link lerp_angle}, combine it with {@link ease} or {@link smoothstep}.
 * **Note:** This function lerps through the shortest path between `from` and `to`. However, when these two angles are approximately `PI + k * TAU` apart for any integer `k`, it's not obvious which way they lerp due to floating-point precision errors. For example, `lerp_angle(0, PI, weight)` lerps counter-clockwise, while `lerp_angle(0, PI + 5 * TAU, weight)` lerps clockwise.
 */
declare function lerp_angle(from_: float, to: float, weight: float): float;
/**
 * Linearly interpolates between two values by the factor defined in `weight`. To perform interpolation, `weight` should be between `0.0` and `1.0` (inclusive). However, values outside this range are allowed and can be used to perform *extrapolation*. If this is not desired, use {@link clampf} on the result of this function.
 * See also {@link inverse_lerp} which performs the reverse of this operation. To perform eased interpolation with {@link lerp}, combine it with {@link ease} or {@link smoothstep}.
 */
declare function lerpf(from_: float, to: float, weight: float): float;
/**
 * Converts from linear energy to decibels (audio). Since volume is not normally linear, this can be used to implement volume sliders that behave as expected.
 * **Example:** Change the Master bus's volume through a {@link Slider} node, which ranges from `0.0` to `1.0`:
 */
declare function linear_to_db(lin: float): float;
/**
 * Returns the natural logarithm (https://en.wikipedia.org/wiki/Natural_logarithm) of `x` (base *e* (https://en.wikipedia.org/wiki/E_(mathematical_constant)), with *e* being approximately 2.71828). This is the amount of time needed to reach a certain level of continuous growth.
 * **Note:** This is not the same as the "log" function on most calculators, which uses a base 10 logarithm. To use base 10 logarithm, use `log(x) / log(10)`.
 * **Note:** The logarithm of `0` returns `-inf`, while negative values return `-nan`.
 */
declare function log(x: float): float;
/**
 * Returns the maximum of the given numeric values. This function can take any number of arguments.
 * **Note:** When using this on vectors it will *not* perform component-wise maximum, and will pick the largest value when compared using `x < y`. To perform component-wise maximum, use {@link Vector2.max}, {@link Vector2i.max}, {@link Vector3.max}, {@link Vector3i.max}, {@link Vector4.max}, and {@link Vector4i.max}.
 */
declare function max<T extends int | float>(...args: T[]): T;
/** Returns the maximum of two [float] values. */
declare function maxf(a: float, b: float): float;
/** Returns the maximum of two [int] values. */
declare function maxi(a: int, b: int): int;
/**
 * Returns the minimum of the given numeric values. This function can take any number of arguments.
 * **Note:** When using this on vectors it will *not* perform component-wise minimum, and will pick the smallest value when compared using `x < y`. To perform component-wise minimum, use {@link Vector2.min}, {@link Vector2i.min}, {@link Vector3.min}, {@link Vector3i.min}, {@link Vector4.min}, and {@link Vector4i.min}.
 */
declare function min<T extends int | float>(...args: T[]): T;
/** Returns the minimum of two [float] values. */
declare function minf(a: float, b: float): float;
/** Returns the minimum of two [int] values. */
declare function mini(a: int, b: int): int;
/**
 * Moves `from` toward `to` by the `delta` amount. Will not go past `to`.
 * Use a negative `delta` value to move away.
 */
declare function move_toward(from_: float, to: float, delta: float): float;
/**
 * Returns the smallest integer power of 2 that is greater than or equal to `value`.
 * **Warning:** Due to its implementation, this method returns `0` rather than `1` for values less than or equal to `0`, with an exception for `value` being the smallest negative 64-bit integer (`-9223372036854775808`) in which case the `value` is returned unchanged.
 */
declare function nearest_po2(value: int): int;
/**
 * Wraps `value` between `0` and the `length`. If the limit is reached, the next value the function returns is decreased to the `0` side or increased to the `length` side (like a triangle wave). If `length` is less than zero, it becomes positive.
 */
declare function pingpong(value: float, length: float): float;
/**
 * Returns the integer modulus of `x` divided by `y` that wraps equally in positive and negative.
 * Prints:
 * [codeblock lang=text]
 * (i)  (i % 3)   (posmod(i, 3))
 * -3        0  |  0
 * -2       -2  |  1
 * -1       -1  |  2
 * 0        0  |  0
 * 1        1  |  1
 * 2        2  |  2
 * 3        0  |  0
 * [/codeblock]
 */
declare function posmod(x: int, y: int): int;
/**
 * Returns the result of `base` raised to the power of `exp`.
 * In GDScript, this is the equivalent of the `**` operator.
 */
declare function pow(base: float, exp: float): float;
/**
 * Converts one or more arguments of any type to string in the best way possible and prints them to the console.
 * **Note:** Consider using {@link push_error} and {@link push_warning} to print error and warning messages instead of {@link print} or {@link print_rich}. This distinguishes them from print messages used for debugging purposes, while also displaying a stack trace when an error or warning is printed. See also {@link Engine.print_to_stdout} and {@link ProjectSettings.application/run/disable_stdout}.
 */
declare function print(...args: any[]): void;
/**
 * Converts one or more arguments of any type to string in the best way possible and prints them to the console.
 * The following BBCode tags are supported: `b`, `i`, `u`, `s`, `indent`, `code`, `url`, `center`, `right`, `color`, `bgcolor`, `fgcolor`.
 * URL tags only support URLs wrapped by a URL tag, not URLs with a different title.
 * When printing to standard output, the supported subset of BBCode is converted to ANSI escape codes for the terminal emulator to display. Support for ANSI escape codes varies across terminal emulators, especially for italic and strikethrough. In standard output, `code` is represented with faint text but without any font change. Unsupported tags are left as-is in standard output.
 * **Note:** Consider using {@link push_error} and {@link push_warning} to print error and warning messages instead of {@link print} or {@link print_rich}. This distinguishes them from print messages used for debugging purposes, while also displaying a stack trace when an error or warning is printed.
 * **Note:** Output displayed in the editor supports clickable [code skip-lint]text (address)[/code] tags. The [code skip-lint][url][/code] tag's `address` value is handled by {@link OS.shell_open} when clicked.
 */
declare function print_rich(...args: any[]): void;
/**
 * If verbose mode is enabled ({@link OS.is_stdout_verbose} returning `true`), converts one or more arguments of any type to string in the best way possible and prints them to the console.
 */
declare function print_verbose(...args: any[]): void;
/** Prints one or more arguments to strings in the best way possible to standard error line. */
declare function printerr(...args: any[]): void;
/**
 * Prints one or more arguments to strings in the best way possible to the OS terminal. Unlike {@link print}, no newline is automatically added at the end.
 * **Note:** The OS terminal is *not* the same as the editor's Output dock. The output sent to the OS terminal can be seen when running Godot from a terminal. On Windows, this requires using the `console.exe` executable.
 */
declare function printraw(...args: any[]): void;
/** Prints one or more arguments to the console with a space between each argument. */
declare function prints(...args: any[]): void;
/** Prints one or more arguments to the console with a tab between each argument. */
declare function printt(...args: any[]): void;
/**
 * Pushes an error message to Godot's built-in debugger and to the OS terminal.
 * **Note:** This function does not pause project execution. To print an error message and pause project execution in debug builds, use `assert(false, "test error")` instead.
 */
declare function push_error(...args: any[]): void;
/** Pushes a warning message to Godot's built-in debugger and to the OS terminal. */
declare function push_warning(...args: any[]): void;
/** Converts an angle expressed in radians to degrees. */
declare function rad_to_deg(rad: float): float;
/**
 * Given a `seed`, returns a {@link PackedInt64Array} of size `2`, where its first element is the randomized [int] value, and the second element is the same as `seed`. Passing the same `seed` consistently returns the same array.
 * **Note:** "Seed" here refers to the internal state of the pseudo random number generator, currently implemented as a 64 bit integer.
 */
declare function rand_from_seed(seed: int): PackedInt64Array;
/** Returns a random floating-point value between `0.0` and `1.0` (inclusive). */
declare function randf(): float;
/** Returns a random floating-point value between `from` and `to` (inclusive). */
declare function randf_range(from_: float, to: float): float;
/**
 * Returns a normally-distributed (https://en.wikipedia.org/wiki/Normal_distribution), pseudo-random floating-point value from the specified `mean` and a standard `deviation`. This is also known as a Gaussian distribution.
 * **Note:** This method uses the Box-Muller transform (https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) algorithm.
 */
declare function randfn(mean: float, deviation: float): float;
/**
 * Returns a random unsigned 32-bit integer. Use remainder to obtain a random value in the interval `[0, N - 1]` (where N is smaller than 2^32).
 */
declare function randi(): int;
/**
 * Returns a random signed 32-bit integer between `from` and `to` (inclusive). If `to` is lesser than `from`, they are swapped.
 */
declare function randi_range(from_: int, to: int): int;
/**
 * Randomizes the seed (or the internal state) of the random number generator. The current implementation uses a number based on the device's time.
 * **Note:** This function is called automatically when the project is run. If you need to fix the seed to have consistent, reproducible results, use {@link seed} to initialize the random number generator.
 */
declare function randomize(): void;
/**
 * Maps a `value` from range `[istart, istop]` to `[ostart, ostop]`. See also {@link lerp} and {@link inverse_lerp}. If `value` is outside `[istart, istop]`, then the resulting value will also be outside `[ostart, ostop]`. If this is not desired, use {@link clamp} on the result of this function.
 * For complex use cases where multiple ranges are needed, consider using {@link Curve} or {@link Gradient} instead.
 * **Note:** If `istart == istop`, the return value is undefined (most likely NaN, INF, or -INF).
 */
declare function remap(value: float, istart: float, istop: float, ostart: float, ostop: float): float;
/**
 * Allocates a unique ID which can be used by the implementation to construct an RID. This is used mainly from native extensions to implement servers.
 */
declare function rid_allocate_id(): int;
/** Creates an RID from a `base`. This is used mainly from native extensions to build servers. */
declare function rid_from_int64(base: int): RID;
/**
 * Rotates `from` toward `to` by the `delta` amount. Will not go past `to`.
 * Similar to {@link move_toward}, but interpolates correctly when the angles wrap around {@link @GDScript.TAU}.
 * If `delta` is negative, this function will rotate away from `to`, toward the opposite angle, and will not go past the opposite angle.
 */
declare function rotate_toward(from_: float, to: float, delta: float): float;
/**
 * Rounds `x` to the nearest whole number, with halfway cases rounded away from 0. Supported types: [int], [float], {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}.
 * See also {@link floor}, {@link ceil}, and {@link snapped}.
 * **Note:** For better type safety, use {@link roundf}, {@link roundi}, {@link Vector2.round}, {@link Vector3.round}, or {@link Vector4.round}.
 */
declare function round<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
/**
 * Rounds `x` to the nearest whole number, with halfway cases rounded away from 0.
 * A type-safe version of {@link round}, returning a [float].
 */
declare function roundf(x: float): float;
/**
 * Rounds `x` to the nearest whole number, with halfway cases rounded away from 0.
 * A type-safe version of {@link round}, returning an [int].
 */
declare function roundi(x: float): int;
/**
 * Sets the seed for the random number generator to `base`. Setting the seed manually can ensure consistent, repeatable results for most random functions.
 */
declare function seed(base: int): void;
/**
 * Returns the same type of {@link Variant} as `x`, with `-1` for negative values, `1` for positive values, and `0` for zeros. For `nan` values it returns 0.
 * Supported types: [int], [float], {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}.
 * **Note:** For better type safety, use {@link signf}, {@link signi}, {@link Vector2.sign}, {@link Vector2i.sign}, {@link Vector3.sign}, {@link Vector3i.sign}, {@link Vector4.sign}, or {@link Vector4i.sign}.
 */
declare function sign<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T): T;
/**
 * Returns `-1.0` if `x` is negative, `1.0` if `x` is positive, and `0.0` if `x` is zero. For `nan` values of `x` it returns 0.0.
 */
declare function signf(x: float): float;
/** Returns `-1` if `x` is negative, `1` if `x` is positive, and `0` if `x` is zero. */
declare function signi(x: int): int;
/** Returns the sine of angle `angle_rad` in radians. */
declare function sin(angle_rad: float): float;
/** Returns the hyperbolic sine of `x`. */
declare function sinh(x: float): float;
/**
 * Returns a smooth cubic Hermite interpolation between `0` and `1`.
 * For positive ranges (when `from <= to`) the return value is `0` when `x <= from`, and `1` when `x >= to`. If `x` lies between `from` and `to`, the return value follows an S-shaped curve that smoothly transitions from `0` to `1`.
 * For negative ranges (when `from > to`) the function is mirrored and returns `1` when `x <= to` and `0` when `x >= from`.
 * This S-shaped curve is the cubic Hermite interpolator, given by `f(y) = 3*y^2 - 2*y^3` where `y = (x-from) / (to-from)`.
 * Compared to {@link ease} with a curve value of `-1.6521`, {@link smoothstep} returns the smoothest possible curve with no sudden changes in the derivative. If you need to perform more advanced transitions, use {@link Tween} or {@link AnimationPlayer}.
 * Comparison between smoothstep() and ease(x, -1.6521) return values (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/smoothstep_ease_comparison.png)
 * Smoothstep() return values with positive, zero, and negative ranges (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/smoothstep_range.webp)
 */
declare function smoothstep(from_: float, to: float, x: float): float;
/**
 * Returns the multiple of `step` that is the closest to `x`. This can also be used to round a floating-point number to an arbitrary number of decimals.
 * The returned value is the same type of {@link Variant} as `step`. Supported types: [int], [float], {@link Vector2}, {@link Vector2i}, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}.
 * See also {@link ceil}, {@link floor}, and {@link round}.
 * **Note:** For better type safety, use {@link snappedf}, {@link snappedi}, {@link Vector2.snapped}, {@link Vector2i.snapped}, {@link Vector3.snapped}, {@link Vector3i.snapped}, {@link Vector4.snapped}, or {@link Vector4i.snapped}.
 */
declare function snapped<T extends int | float | Vector2 | Vector2i | Vector3 | Vector3i | Vector4 | Vector4i>(x: T, step: T): T;
/**
 * Returns the multiple of `step` that is the closest to `x`. This can also be used to round a floating-point number to an arbitrary number of decimals.
 * A type-safe version of {@link snapped}, returning a [float].
 */
declare function snappedf(x: float, step: float): float;
/**
 * Returns the multiple of `step` that is the closest to `x`.
 * A type-safe version of {@link snapped}, returning an [int].
 */
declare function snappedi(x: float, step: int): int;
/**
 * Returns the square root of `x`, where `x` is a non-negative number.
 * **Note:** Negative values of `x` return NaN ("Not a Number"). In C#, if you need negative inputs, use `System.Numerics.Complex`.
 */
declare function sqrt(x: float): float;
/**
 * Returns the position of the first non-zero digit, after the decimal point. Note that the maximum return value is 10, which is a design decision in the implementation.
 */
declare function step_decimals(x: float): int;
/**
 * Converts one or more arguments of any {@link Variant} type to a {@link String} in the best way possible.
 */
declare function str(...args: any[]): string;
/**
 * Converts a formatted `string` that was returned by {@link var_to_str} to the original {@link Variant}.
 */
declare function str_to_var(string: string): unknown;
/** Returns the tangent of angle `angle_rad` in radians. */
declare function tan(angle_rad: float): float;
/** Returns the hyperbolic tangent of `x`. */
declare function tanh(x: float): float;
/**
 * Converts the given `variant` to the given `type`, using the {@link Variant.Type} values. This method is generous with how it handles types, it can automatically convert between array types, convert numeric {@link String}s to [int], and converting most things to {@link String}.
 * If the type conversion cannot be done, this method will return the default value for that type, for example converting {@link Rect2} to {@link Vector2} will always return {@link Vector2.ZERO}. This method will never show error messages as long as `type` is a valid Variant type.
 * The returned value is a {@link Variant}, but the data inside and its type will be the same as the requested type.
 */
declare function type_convert(variant: unknown, type_: int): unknown;
/**
 * Returns a human-readable name of the given `type`, using the {@link Variant.Type} values.
 * See also {@link typeof}.
 */
declare function type_string(type_: int): string;
/**
 * Returns the internal type of the given `variable`, using the {@link Variant.Type} values.
 * See also {@link type_string}.
 */
declare function typeof_(variable: unknown): int;
/**
 * Encodes a {@link Variant} value to a byte array, without encoding objects. Deserialization can be done with {@link bytes_to_var}.
 * **Note:** If you need object serialization, see {@link var_to_bytes_with_objects}.
 * **Note:** Encoding {@link Callable} is not supported and will result in an empty value, regardless of the data.
 */
declare function var_to_bytes(variable: unknown): PackedByteArray;
/**
 * Encodes a {@link Variant} value to a byte array. Encoding objects is allowed (and can potentially include executable code). Deserialization can be done with {@link bytes_to_var_with_objects}.
 * **Note:** Encoding {@link Callable} is not supported and will result in an empty value, regardless of the data.
 */
declare function var_to_bytes_with_objects(variable: unknown): PackedByteArray;
/**
 * Converts a {@link Variant} `variable` to a formatted {@link String} that can then be parsed using {@link str_to_var}.
 * Prints:
 * [codeblock lang=text]
 * {
 * "a": 1,
 * "b": 2
 * }
 * [/codeblock]
 * **Note:** Converting {@link Signal} or {@link Callable} is not supported and will result in an empty value for these types, regardless of their data.
 */
declare function var_to_str(variable: unknown): string;
/**
 * Returns a {@link WeakRef} instance holding a weak reference to `obj`. Returns an empty {@link WeakRef} instance if `obj` is `null`. Prints an error and returns `null` if `obj` is neither {@link Object}-derived nor `null`.
 * A weak reference to an object is not enough to keep the object alive: when the only remaining references to a referent are weak references, garbage collection is free to destroy the referent and reuse its memory for something else. However, until the object is actually destroyed the weak reference may return the object even if there are no strong references to it.
 */
declare function weakref(obj: GodotObject): WeakRef;
/**
 * Wraps the {@link Variant} `value` between `min` and `max`. `min` is *inclusive* while `max` is *exclusive*. This can be used for creating loop-like behavior or infinite surfaces.
 * Variant types [int] and [float] are supported. If any of the arguments is [float], this function returns a [float], otherwise it returns an [int].
 */
declare function wrap<T extends int | float>(value: T, min: T, max: T): T;
/**
 * Wraps the float `value` between `min` and `max`. `min` is *inclusive* while `max` is *exclusive*. This can be used for creating loop-like behavior or infinite surfaces.
 * **Note:** If `min` is `0`, this is equivalent to {@link fposmod}, so prefer using that instead. {@link wrapf} is more flexible than using the {@link fposmod} approach by giving the user control over the minimum value.
 */
declare function wrapf(value: float, min: float, max: float): float;
/**
 * Wraps the integer `value` between `min` and `max`. `min` is *inclusive* while `max` is *exclusive*. This can be used for creating loop-like behavior or infinite surfaces.
 */
declare function wrapi(value: int, min: int, max: int): int;

declare const enum Side {
  /** Left side, usually used for {@link Control} or {@link StyleBox}-derived classes. */
  SIDE_LEFT = 0,
  /** Top side, usually used for {@link Control} or {@link StyleBox}-derived classes. */
  SIDE_TOP = 1,
  /** Right side, usually used for {@link Control} or {@link StyleBox}-derived classes. */
  SIDE_RIGHT = 2,
  /** Bottom side, usually used for {@link Control} or {@link StyleBox}-derived classes. */
  SIDE_BOTTOM = 3,
}

declare const enum Corner {
  /** Top-left corner. */
  CORNER_TOP_LEFT = 0,
  /** Top-right corner. */
  CORNER_TOP_RIGHT = 1,
  /** Bottom-right corner. */
  CORNER_BOTTOM_RIGHT = 2,
  /** Bottom-left corner. */
  CORNER_BOTTOM_LEFT = 3,
}

declare const enum Orientation {
  /**
   * General vertical alignment, usually used for {@link Separator}, {@link ScrollBar}, {@link Slider}, etc.
   */
  VERTICAL = 1,
  /**
   * General horizontal alignment, usually used for {@link Separator}, {@link ScrollBar}, {@link Slider}, etc.
   */
  HORIZONTAL = 0,
}

declare const enum ClockDirection {
  /** Clockwise rotation. Used by some methods (e.g. {@link Image.rotate_90}). */
  CLOCKWISE = 0,
  /** Counter-clockwise rotation. Used by some methods (e.g. {@link Image.rotate_90}). */
  COUNTERCLOCKWISE = 1,
}

declare const enum HorizontalAlignment {
  /** Horizontal left alignment, usually for text-derived classes. */
  HORIZONTAL_ALIGNMENT_LEFT = 0,
  /** Horizontal center alignment, usually for text-derived classes. */
  HORIZONTAL_ALIGNMENT_CENTER = 1,
  /** Horizontal right alignment, usually for text-derived classes. */
  HORIZONTAL_ALIGNMENT_RIGHT = 2,
  /** Expand row to fit width, usually for text-derived classes. */
  HORIZONTAL_ALIGNMENT_FILL = 3,
}

declare const enum VerticalAlignment {
  /** Vertical top alignment, usually for text-derived classes. */
  VERTICAL_ALIGNMENT_TOP = 0,
  /** Vertical center alignment, usually for text-derived classes. */
  VERTICAL_ALIGNMENT_CENTER = 1,
  /** Vertical bottom alignment, usually for text-derived classes. */
  VERTICAL_ALIGNMENT_BOTTOM = 2,
  /** Expand rows to fit height, usually for text-derived classes. */
  VERTICAL_ALIGNMENT_FILL = 3,
}

declare const enum InlineAlignment {
  /**
   * Aligns the top of the inline object (e.g. image, table) to the position of the text specified by `INLINE_ALIGNMENT_TO_*` constant.
   */
  INLINE_ALIGNMENT_TOP_TO = 0,
  /**
   * Aligns the center of the inline object (e.g. image, table) to the position of the text specified by `INLINE_ALIGNMENT_TO_*` constant.
   */
  INLINE_ALIGNMENT_CENTER_TO = 1,
  /**
   * Aligns the baseline (user defined) of the inline object (e.g. image, table) to the position of the text specified by `INLINE_ALIGNMENT_TO_*` constant.
   */
  INLINE_ALIGNMENT_BASELINE_TO = 3,
  /**
   * Aligns the bottom of the inline object (e.g. image, table) to the position of the text specified by `INLINE_ALIGNMENT_TO_*` constant.
   */
  INLINE_ALIGNMENT_BOTTOM_TO = 2,
  /**
   * Aligns the position of the inline object (e.g. image, table) specified by `INLINE_ALIGNMENT_*_TO` constant to the top of the text.
   */
  INLINE_ALIGNMENT_TO_TOP = 0,
  /**
   * Aligns the position of the inline object (e.g. image, table) specified by `INLINE_ALIGNMENT_*_TO` constant to the center of the text.
   */
  INLINE_ALIGNMENT_TO_CENTER = 4,
  /**
   * Aligns the position of the inline object (e.g. image, table) specified by `INLINE_ALIGNMENT_*_TO` constant to the baseline of the text.
   */
  INLINE_ALIGNMENT_TO_BASELINE = 8,
  /** Aligns inline object (e.g. image, table) to the bottom of the text. */
  INLINE_ALIGNMENT_TO_BOTTOM = 12,
  /**
   * Aligns top of the inline object (e.g. image, table) to the top of the text. Equivalent to `INLINE_ALIGNMENT_TOP_TO | INLINE_ALIGNMENT_TO_TOP`.
   */
  INLINE_ALIGNMENT_TOP = 0,
  /**
   * Aligns center of the inline object (e.g. image, table) to the center of the text. Equivalent to `INLINE_ALIGNMENT_CENTER_TO | INLINE_ALIGNMENT_TO_CENTER`.
   */
  INLINE_ALIGNMENT_CENTER = 5,
  /**
   * Aligns bottom of the inline object (e.g. image, table) to the bottom of the text. Equivalent to `INLINE_ALIGNMENT_BOTTOM_TO | INLINE_ALIGNMENT_TO_BOTTOM`.
   */
  INLINE_ALIGNMENT_BOTTOM = 14,
  /** A bit mask for `INLINE_ALIGNMENT_*_TO` alignment constants. */
  INLINE_ALIGNMENT_IMAGE_MASK = 3,
  /** A bit mask for `INLINE_ALIGNMENT_TO_*` alignment constants. */
  INLINE_ALIGNMENT_TEXT_MASK = 12,
}

declare const enum EulerOrder {
  /**
   * Specifies that Euler angles should be in XYZ order. When composing, the order is X, Y, Z. When decomposing, the order is reversed, first Z, then Y, and X last.
   */
  EULER_ORDER_XYZ = 0,
  /**
   * Specifies that Euler angles should be in XZY order. When composing, the order is X, Z, Y. When decomposing, the order is reversed, first Y, then Z, and X last.
   */
  EULER_ORDER_XZY = 1,
  /**
   * Specifies that Euler angles should be in YXZ order. When composing, the order is Y, X, Z. When decomposing, the order is reversed, first Z, then X, and Y last.
   */
  EULER_ORDER_YXZ = 2,
  /**
   * Specifies that Euler angles should be in YZX order. When composing, the order is Y, Z, X. When decomposing, the order is reversed, first X, then Z, and Y last.
   */
  EULER_ORDER_YZX = 3,
  /**
   * Specifies that Euler angles should be in ZXY order. When composing, the order is Z, X, Y. When decomposing, the order is reversed, first Y, then X, and Z last.
   */
  EULER_ORDER_ZXY = 4,
  /**
   * Specifies that Euler angles should be in ZYX order. When composing, the order is Z, Y, X. When decomposing, the order is reversed, first X, then Y, and Z last.
   */
  EULER_ORDER_ZYX = 5,
}

declare const enum Key {
  /**
   * Enum value which doesn't correspond to any key. This is used to initialize {@link Key} properties with a generic state.
   */
  KEY_NONE = 0,
  /** Keycodes with this bit applied are non-printable. */
  KEY_SPECIAL = 4194304,
  /** Escape key. */
  KEY_ESCAPE = 4194305,
  /** Tab key. */
  KEY_TAB = 4194306,
  /** Shift + Tab key. */
  KEY_BACKTAB = 4194307,
  /** Backspace key. */
  KEY_BACKSPACE = 4194308,
  /** Return key (on the main keyboard). */
  KEY_ENTER = 4194309,
  /** Enter key on the numeric keypad. */
  KEY_KP_ENTER = 4194310,
  /** Insert key. */
  KEY_INSERT = 4194311,
  /** Delete key. */
  KEY_DELETE = 4194312,
  /** Pause key. */
  KEY_PAUSE = 4194313,
  /** Print Screen key. */
  KEY_PRINT = 4194314,
  /** System Request key. */
  KEY_SYSREQ = 4194315,
  /** Clear key. */
  KEY_CLEAR = 4194316,
  /** Home key. */
  KEY_HOME = 4194317,
  /** End key. */
  KEY_END = 4194318,
  /** Left arrow key. */
  KEY_LEFT = 4194319,
  /** Up arrow key. */
  KEY_UP = 4194320,
  /** Right arrow key. */
  KEY_RIGHT = 4194321,
  /** Down arrow key. */
  KEY_DOWN = 4194322,
  /** Page Up key. */
  KEY_PAGEUP = 4194323,
  /** Page Down key. */
  KEY_PAGEDOWN = 4194324,
  /** Shift key. */
  KEY_SHIFT = 4194325,
  /** Control key. */
  KEY_CTRL = 4194326,
  /** Meta key. */
  KEY_META = 4194327,
  /** Alt key. */
  KEY_ALT = 4194328,
  /** Caps Lock key. */
  KEY_CAPSLOCK = 4194329,
  /** Num Lock key. */
  KEY_NUMLOCK = 4194330,
  /** Scroll Lock key. */
  KEY_SCROLLLOCK = 4194331,
  /** F1 key. */
  KEY_F1 = 4194332,
  /** F2 key. */
  KEY_F2 = 4194333,
  /** F3 key. */
  KEY_F3 = 4194334,
  /** F4 key. */
  KEY_F4 = 4194335,
  /** F5 key. */
  KEY_F5 = 4194336,
  /** F6 key. */
  KEY_F6 = 4194337,
  /** F7 key. */
  KEY_F7 = 4194338,
  /** F8 key. */
  KEY_F8 = 4194339,
  /** F9 key. */
  KEY_F9 = 4194340,
  /** F10 key. */
  KEY_F10 = 4194341,
  /** F11 key. */
  KEY_F11 = 4194342,
  /** F12 key. */
  KEY_F12 = 4194343,
  /** F13 key. */
  KEY_F13 = 4194344,
  /** F14 key. */
  KEY_F14 = 4194345,
  /** F15 key. */
  KEY_F15 = 4194346,
  /** F16 key. */
  KEY_F16 = 4194347,
  /** F17 key. */
  KEY_F17 = 4194348,
  /** F18 key. */
  KEY_F18 = 4194349,
  /** F19 key. */
  KEY_F19 = 4194350,
  /** F20 key. */
  KEY_F20 = 4194351,
  /** F21 key. */
  KEY_F21 = 4194352,
  /** F22 key. */
  KEY_F22 = 4194353,
  /** F23 key. */
  KEY_F23 = 4194354,
  /** F24 key. */
  KEY_F24 = 4194355,
  /** F25 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F25 = 4194356,
  /** F26 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F26 = 4194357,
  /** F27 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F27 = 4194358,
  /** F28 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F28 = 4194359,
  /** F29 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F29 = 4194360,
  /** F30 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F30 = 4194361,
  /** F31 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F31 = 4194362,
  /** F32 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F32 = 4194363,
  /** F33 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F33 = 4194364,
  /** F34 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F34 = 4194365,
  /** F35 key. Only supported on macOS and Linux due to a Windows limitation. */
  KEY_F35 = 4194366,
  /** Multiply (*) key on the numeric keypad. */
  KEY_KP_MULTIPLY = 4194433,
  /** Divide (/) key on the numeric keypad. */
  KEY_KP_DIVIDE = 4194434,
  /** Subtract (-) key on the numeric keypad. */
  KEY_KP_SUBTRACT = 4194435,
  /** Period (.) key on the numeric keypad. */
  KEY_KP_PERIOD = 4194436,
  /** Add (+) key on the numeric keypad. */
  KEY_KP_ADD = 4194437,
  /** Number 0 on the numeric keypad. */
  KEY_KP_0 = 4194438,
  /** Number 1 on the numeric keypad. */
  KEY_KP_1 = 4194439,
  /** Number 2 on the numeric keypad. */
  KEY_KP_2 = 4194440,
  /** Number 3 on the numeric keypad. */
  KEY_KP_3 = 4194441,
  /** Number 4 on the numeric keypad. */
  KEY_KP_4 = 4194442,
  /** Number 5 on the numeric keypad. */
  KEY_KP_5 = 4194443,
  /** Number 6 on the numeric keypad. */
  KEY_KP_6 = 4194444,
  /** Number 7 on the numeric keypad. */
  KEY_KP_7 = 4194445,
  /** Number 8 on the numeric keypad. */
  KEY_KP_8 = 4194446,
  /** Number 9 on the numeric keypad. */
  KEY_KP_9 = 4194447,
  /** Context menu key. */
  KEY_MENU = 4194370,
  /** Hyper key. (On Linux/X11 only). */
  KEY_HYPER = 4194371,
  /** Help key. */
  KEY_HELP = 4194373,
  /** Back key. */
  KEY_BACK = 4194376,
  /** Forward key. */
  KEY_FORWARD = 4194377,
  /** Media stop key. */
  KEY_STOP = 4194378,
  /** Refresh key. */
  KEY_REFRESH = 4194379,
  /** Volume down key. */
  KEY_VOLUMEDOWN = 4194380,
  /** Mute volume key. */
  KEY_VOLUMEMUTE = 4194381,
  /** Volume up key. */
  KEY_VOLUMEUP = 4194382,
  /** Media play key. */
  KEY_MEDIAPLAY = 4194388,
  /** Media stop key. */
  KEY_MEDIASTOP = 4194389,
  /** Previous song key. */
  KEY_MEDIAPREVIOUS = 4194390,
  /** Next song key. */
  KEY_MEDIANEXT = 4194391,
  /** Media record key. */
  KEY_MEDIARECORD = 4194392,
  /** Home page key. */
  KEY_HOMEPAGE = 4194393,
  /** Favorites key. */
  KEY_FAVORITES = 4194394,
  /** Search key. */
  KEY_SEARCH = 4194395,
  /** Standby key. */
  KEY_STANDBY = 4194396,
  /** Open URL / Launch Browser key. */
  KEY_OPENURL = 4194397,
  /** Launch Mail key. */
  KEY_LAUNCHMAIL = 4194398,
  /** Launch Media key. */
  KEY_LAUNCHMEDIA = 4194399,
  /** Launch Shortcut 0 key. */
  KEY_LAUNCH0 = 4194400,
  /** Launch Shortcut 1 key. */
  KEY_LAUNCH1 = 4194401,
  /** Launch Shortcut 2 key. */
  KEY_LAUNCH2 = 4194402,
  /** Launch Shortcut 3 key. */
  KEY_LAUNCH3 = 4194403,
  /** Launch Shortcut 4 key. */
  KEY_LAUNCH4 = 4194404,
  /** Launch Shortcut 5 key. */
  KEY_LAUNCH5 = 4194405,
  /** Launch Shortcut 6 key. */
  KEY_LAUNCH6 = 4194406,
  /** Launch Shortcut 7 key. */
  KEY_LAUNCH7 = 4194407,
  /** Launch Shortcut 8 key. */
  KEY_LAUNCH8 = 4194408,
  /** Launch Shortcut 9 key. */
  KEY_LAUNCH9 = 4194409,
  /** Launch Shortcut A key. */
  KEY_LAUNCHA = 4194410,
  /** Launch Shortcut B key. */
  KEY_LAUNCHB = 4194411,
  /** Launch Shortcut C key. */
  KEY_LAUNCHC = 4194412,
  /** Launch Shortcut D key. */
  KEY_LAUNCHD = 4194413,
  /** Launch Shortcut E key. */
  KEY_LAUNCHE = 4194414,
  /** Launch Shortcut F key. */
  KEY_LAUNCHF = 4194415,
  /** "Globe" key on Mac / iPad keyboard. */
  KEY_GLOBE = 4194416,
  /** "On-screen keyboard" key on iPad keyboard. */
  KEY_KEYBOARD = 4194417,
  /** 英数 key on Mac keyboard. */
  KEY_JIS_EISU = 4194418,
  /** かな key on Mac keyboard. */
  KEY_JIS_KANA = 4194419,
  /** Unknown key. */
  KEY_UNKNOWN = 8388607,
  /** Space key. */
  KEY_SPACE = 32,
  /** Exclamation mark (`!`) key. */
  KEY_EXCLAM = 33,
  /** Double quotation mark (`"`) key. */
  KEY_QUOTEDBL = 34,
  /** Number sign or *hash* (`#`) key. */
  KEY_NUMBERSIGN = 35,
  /** Dollar sign (`$`) key. */
  KEY_DOLLAR = 36,
  /** Percent sign (`%`) key. */
  KEY_PERCENT = 37,
  /** Ampersand (`&`) key. */
  KEY_AMPERSAND = 38,
  /** Apostrophe (`'`) key. */
  KEY_APOSTROPHE = 39,
  /** Left parenthesis (`(`) key. */
  KEY_PARENLEFT = 40,
  /** Right parenthesis (`)`) key. */
  KEY_PARENRIGHT = 41,
  /** Asterisk (`*`) key. */
  KEY_ASTERISK = 42,
  /** Plus (`+`) key. */
  KEY_PLUS = 43,
  /** Comma (`,`) key. */
  KEY_COMMA = 44,
  /** Minus (`-`) key. */
  KEY_MINUS = 45,
  /** Period (`.`) key. */
  KEY_PERIOD = 46,
  /** Slash (`/`) key. */
  KEY_SLASH = 47,
  /** Number 0 key. */
  KEY_0 = 48,
  /** Number 1 key. */
  KEY_1 = 49,
  /** Number 2 key. */
  KEY_2 = 50,
  /** Number 3 key. */
  KEY_3 = 51,
  /** Number 4 key. */
  KEY_4 = 52,
  /** Number 5 key. */
  KEY_5 = 53,
  /** Number 6 key. */
  KEY_6 = 54,
  /** Number 7 key. */
  KEY_7 = 55,
  /** Number 8 key. */
  KEY_8 = 56,
  /** Number 9 key. */
  KEY_9 = 57,
  /** Colon (`:`) key. */
  KEY_COLON = 58,
  /** Semicolon (`;`) key. */
  KEY_SEMICOLON = 59,
  /** Less-than sign (`<`) key. */
  KEY_LESS = 60,
  /** Equal sign (`=`) key. */
  KEY_EQUAL = 61,
  /** Greater-than sign (`>`) key. */
  KEY_GREATER = 62,
  /** Question mark (`?`) key. */
  KEY_QUESTION = 63,
  /** At sign (`@`) key. */
  KEY_AT = 64,
  /** A key. */
  KEY_A = 65,
  /** B key. */
  KEY_B = 66,
  /** C key. */
  KEY_C = 67,
  /** D key. */
  KEY_D = 68,
  /** E key. */
  KEY_E = 69,
  /** F key. */
  KEY_F = 70,
  /** G key. */
  KEY_G = 71,
  /** H key. */
  KEY_H = 72,
  /** I key. */
  KEY_I = 73,
  /** J key. */
  KEY_J = 74,
  /** K key. */
  KEY_K = 75,
  /** L key. */
  KEY_L = 76,
  /** M key. */
  KEY_M = 77,
  /** N key. */
  KEY_N = 78,
  /** O key. */
  KEY_O = 79,
  /** P key. */
  KEY_P = 80,
  /** Q key. */
  KEY_Q = 81,
  /** R key. */
  KEY_R = 82,
  /** S key. */
  KEY_S = 83,
  /** T key. */
  KEY_T = 84,
  /** U key. */
  KEY_U = 85,
  /** V key. */
  KEY_V = 86,
  /** W key. */
  KEY_W = 87,
  /** X key. */
  KEY_X = 88,
  /** Y key. */
  KEY_Y = 89,
  /** Z key. */
  KEY_Z = 90,
  /** Left bracket (`[lb]`) key. */
  KEY_BRACKETLEFT = 91,
  /** Backslash (`\`) key. */
  KEY_BACKSLASH = 92,
  /** Right bracket (`[rb]`) key. */
  KEY_BRACKETRIGHT = 93,
  /** Caret (`^`) key. */
  KEY_ASCIICIRCUM = 94,
  /** Underscore (`_`) key. */
  KEY_UNDERSCORE = 95,
  /** Backtick (```) key. */
  KEY_QUOTELEFT = 96,
  /** Left brace (`{`) key. */
  KEY_BRACELEFT = 123,
  /** Vertical bar or *pipe* (`|`) key. */
  KEY_BAR = 124,
  /** Right brace (`}`) key. */
  KEY_BRACERIGHT = 125,
  /** Tilde (`~`) key. */
  KEY_ASCIITILDE = 126,
  /** Yen symbol (`¥`) key. */
  KEY_YEN = 165,
  /** Section sign (`§`) key. */
  KEY_SECTION = 167,
}

declare const enum KeyModifierMask {
  /** Key Code mask. */
  KEY_CODE_MASK = 8388607,
  /** Modifier key mask. */
  KEY_MODIFIER_MASK = 2130706432,
  /**
   * Automatically remapped to {@link KEY_META} on macOS and {@link KEY_CTRL} on other platforms, this mask is never set in the actual events, and should be used for key mapping only.
   */
  KEY_MASK_CMD_OR_CTRL = 16777216,
  /** Shift key mask. */
  KEY_MASK_SHIFT = 33554432,
  /** Alt or Option (on macOS) key mask. */
  KEY_MASK_ALT = 67108864,
  /** Command (on macOS) or Meta/Windows key mask. */
  KEY_MASK_META = 134217728,
  /** Control key mask. */
  KEY_MASK_CTRL = 268435456,
  /** Keypad key mask. */
  KEY_MASK_KPAD = 536870912,
  /** Group Switch key mask. */
  KEY_MASK_GROUP_SWITCH = 1073741824,
}

declare const enum KeyLocation {
  /**
   * Used for keys which only appear once, or when a comparison doesn't need to differentiate the `LEFT` and `RIGHT` versions.
   * For example, when using {@link InputEvent.is_match}, an event which has {@link KEY_LOCATION_UNSPECIFIED} will match any {@link KeyLocation} on the passed event.
   */
  KEY_LOCATION_UNSPECIFIED = 0,
  /** A key which is to the left of its twin. */
  KEY_LOCATION_LEFT = 1,
  /** A key which is to the right of its twin. */
  KEY_LOCATION_RIGHT = 2,
}

declare const enum MouseButton {
  /**
   * Enum value which doesn't correspond to any mouse button. This is used to initialize {@link MouseButton} properties with a generic state.
   */
  MOUSE_BUTTON_NONE = 0,
  /** Primary mouse button, usually assigned to the left button. */
  MOUSE_BUTTON_LEFT = 1,
  /** Secondary mouse button, usually assigned to the right button. */
  MOUSE_BUTTON_RIGHT = 2,
  /** Middle mouse button. */
  MOUSE_BUTTON_MIDDLE = 3,
  /** Mouse wheel scrolling up. */
  MOUSE_BUTTON_WHEEL_UP = 4,
  /** Mouse wheel scrolling down. */
  MOUSE_BUTTON_WHEEL_DOWN = 5,
  /** Mouse wheel left button (only present on some mice). */
  MOUSE_BUTTON_WHEEL_LEFT = 6,
  /** Mouse wheel right button (only present on some mice). */
  MOUSE_BUTTON_WHEEL_RIGHT = 7,
  /** Extra mouse button 1. This is sometimes present, usually to the sides of the mouse. */
  MOUSE_BUTTON_XBUTTON1 = 8,
  /** Extra mouse button 2. This is sometimes present, usually to the sides of the mouse. */
  MOUSE_BUTTON_XBUTTON2 = 9,
}

declare const enum MouseButtonMask {
  /** Primary mouse button mask, usually for the left button. */
  MOUSE_BUTTON_MASK_LEFT = 1,
  /** Secondary mouse button mask, usually for the right button. */
  MOUSE_BUTTON_MASK_RIGHT = 2,
  /** Middle mouse button mask. */
  MOUSE_BUTTON_MASK_MIDDLE = 4,
  /** Extra mouse button 1 mask. */
  MOUSE_BUTTON_MASK_MB_XBUTTON1 = 128,
  /** Extra mouse button 2 mask. */
  MOUSE_BUTTON_MASK_MB_XBUTTON2 = 256,
}

declare const enum JoyButton {
  /** An invalid game controller button. */
  JOY_BUTTON_INVALID = -1,
  /**
   * Game controller SDL button A. Corresponds to the bottom action button: Sony Cross, Xbox A, Nintendo B.
   */
  JOY_BUTTON_A = 0,
  /**
   * Game controller SDL button B. Corresponds to the right action button: Sony Circle, Xbox B, Nintendo A.
   */
  JOY_BUTTON_B = 1,
  /**
   * Game controller SDL button X. Corresponds to the left action button: Sony Square, Xbox X, Nintendo Y.
   */
  JOY_BUTTON_X = 2,
  /**
   * Game controller SDL button Y. Corresponds to the top action button: Sony Triangle, Xbox Y, Nintendo X.
   */
  JOY_BUTTON_Y = 3,
  /** Game controller SDL back button. Corresponds to the Sony Select, Xbox Back, Nintendo - button. */
  JOY_BUTTON_BACK = 4,
  /** Game controller SDL guide button. Corresponds to the Sony PS, Xbox Home button. */
  JOY_BUTTON_GUIDE = 5,
  /** Game controller SDL start button. Corresponds to the Sony Options, Xbox Menu, Nintendo + button. */
  JOY_BUTTON_START = 6,
  /** Game controller SDL left stick button. Corresponds to the Sony L3, Xbox L/LS button. */
  JOY_BUTTON_LEFT_STICK = 7,
  /** Game controller SDL right stick button. Corresponds to the Sony R3, Xbox R/RS button. */
  JOY_BUTTON_RIGHT_STICK = 8,
  /** Game controller SDL left shoulder button. Corresponds to the Sony L1, Xbox LB button. */
  JOY_BUTTON_LEFT_SHOULDER = 9,
  /** Game controller SDL right shoulder button. Corresponds to the Sony R1, Xbox RB button. */
  JOY_BUTTON_RIGHT_SHOULDER = 10,
  /** Game controller D-pad up button. */
  JOY_BUTTON_DPAD_UP = 11,
  /** Game controller D-pad down button. */
  JOY_BUTTON_DPAD_DOWN = 12,
  /** Game controller D-pad left button. */
  JOY_BUTTON_DPAD_LEFT = 13,
  /** Game controller D-pad right button. */
  JOY_BUTTON_DPAD_RIGHT = 14,
  /**
   * Game controller SDL miscellaneous button. Corresponds to Xbox share button, PS5 microphone button, Nintendo Switch capture button.
   */
  JOY_BUTTON_MISC1 = 15,
  /** Game controller SDL paddle 1 button. */
  JOY_BUTTON_PADDLE1 = 16,
  /** Game controller SDL paddle 2 button. */
  JOY_BUTTON_PADDLE2 = 17,
  /** Game controller SDL paddle 3 button. */
  JOY_BUTTON_PADDLE3 = 18,
  /** Game controller SDL paddle 4 button. */
  JOY_BUTTON_PADDLE4 = 19,
  /** Game controller SDL touchpad button. */
  JOY_BUTTON_TOUCHPAD = 20,
  /**
   * Game controller SDL miscellaneous button. Used by Nintendo Switch 2 Pro Controller and Horipad Steam controllers.
   */
  JOY_BUTTON_MISC2 = 21,
  /** Game controller SDL miscellaneous button. */
  JOY_BUTTON_MISC3 = 22,
  /** Game controller SDL miscellaneous button. */
  JOY_BUTTON_MISC4 = 23,
  /** Game controller SDL miscellaneous button. */
  JOY_BUTTON_MISC5 = 24,
  /** Game controller SDL miscellaneous button. */
  JOY_BUTTON_MISC6 = 25,
  /** The number of SDL game controller buttons. */
  JOY_BUTTON_SDL_MAX = 26,
  /**
   * The maximum number of game controller buttons supported by the engine. The actual limit may be lower on specific platforms:
   * - **Android:** Up to 36 buttons.
   * - **Linux:** Up to 80 buttons.
   * - **Windows** and **macOS:** Up to 128 buttons.
   */
  JOY_BUTTON_MAX = 128,
}

declare const enum JoyAxis {
  /** An invalid game controller axis. */
  JOY_AXIS_INVALID = -1,
  /** Game controller left joystick x-axis. */
  JOY_AXIS_LEFT_X = 0,
  /** Game controller left joystick y-axis. */
  JOY_AXIS_LEFT_Y = 1,
  /** Game controller right joystick x-axis. */
  JOY_AXIS_RIGHT_X = 2,
  /** Game controller right joystick y-axis. */
  JOY_AXIS_RIGHT_Y = 3,
  /** Game controller left trigger axis. */
  JOY_AXIS_TRIGGER_LEFT = 4,
  /** Game controller right trigger axis. */
  JOY_AXIS_TRIGGER_RIGHT = 5,
  /** The number of SDL game controller axes. */
  JOY_AXIS_SDL_MAX = 6,
  /**
   * The maximum number of game controller axes: OpenVR supports up to 5 Joysticks making a total of 10 axes.
   */
  JOY_AXIS_MAX = 10,
}

declare const enum MIDIMessage {
  /**
   * Does not correspond to any MIDI message. This is the default value of {@link InputEventMIDI.message}.
   */
  MIDI_MESSAGE_NONE = 0,
  /**
   * MIDI message sent when a note is released.
   * **Note:** Not all MIDI devices send this message; some may send {@link MIDI_MESSAGE_NOTE_ON} with {@link InputEventMIDI.velocity} set to `0`.
   */
  MIDI_MESSAGE_NOTE_OFF = 8,
  /** MIDI message sent when a note is pressed. */
  MIDI_MESSAGE_NOTE_ON = 9,
  /**
   * MIDI message sent to indicate a change in pressure while a note is being pressed down, also called aftertouch.
   */
  MIDI_MESSAGE_AFTERTOUCH = 10,
  /**
   * MIDI message sent when a controller value changes. In a MIDI device, a controller is any input that doesn't play notes. These may include sliders for volume, balance, and panning, as well as switches and pedals. See the General MIDI specification (https://en.wikipedia.org/wiki/General_MIDI#Controller_events) for a small list.
   */
  MIDI_MESSAGE_CONTROL_CHANGE = 11,
  /**
   * MIDI message sent when the MIDI device changes its current instrument (also called *program* or *preset*).
   */
  MIDI_MESSAGE_PROGRAM_CHANGE = 12,
  /**
   * MIDI message sent to indicate a change in pressure for the whole channel. Some MIDI devices may send this instead of {@link MIDI_MESSAGE_AFTERTOUCH}.
   */
  MIDI_MESSAGE_CHANNEL_PRESSURE = 13,
  /** MIDI message sent when the value of the pitch bender changes, usually a wheel on the MIDI device. */
  MIDI_MESSAGE_PITCH_BEND = 14,
  /**
   * MIDI system exclusive (SysEx) message. This type of message is not standardized and it's highly dependent on the MIDI device sending it.
   * **Note:** Getting this message's data from {@link InputEventMIDI} is not implemented.
   */
  MIDI_MESSAGE_SYSTEM_EXCLUSIVE = 240,
  /**
   * MIDI message sent every quarter frame to keep connected MIDI devices synchronized. Related to {@link MIDI_MESSAGE_TIMING_CLOCK}.
   * **Note:** Getting this message's data from {@link InputEventMIDI} is not implemented.
   */
  MIDI_MESSAGE_QUARTER_FRAME = 241,
  /**
   * MIDI message sent to jump onto a new position in the current sequence or song.
   * **Note:** Getting this message's data from {@link InputEventMIDI} is not implemented.
   */
  MIDI_MESSAGE_SONG_POSITION_POINTER = 242,
  /**
   * MIDI message sent to select a sequence or song to play.
   * **Note:** Getting this message's data from {@link InputEventMIDI} is not implemented.
   */
  MIDI_MESSAGE_SONG_SELECT = 243,
  /**
   * MIDI message sent to request a tuning calibration. Used on analog synthesizers. Most modern MIDI devices do not need this message.
   */
  MIDI_MESSAGE_TUNE_REQUEST = 246,
  /**
   * MIDI message sent 24 times after {@link MIDI_MESSAGE_QUARTER_FRAME}, to keep connected MIDI devices synchronized.
   */
  MIDI_MESSAGE_TIMING_CLOCK = 248,
  /** MIDI message sent to start the current sequence or song from the beginning. */
  MIDI_MESSAGE_START = 250,
  /** MIDI message sent to resume from the point the current sequence or song was paused. */
  MIDI_MESSAGE_CONTINUE = 251,
  /** MIDI message sent to pause the current sequence or song. */
  MIDI_MESSAGE_STOP = 252,
  /**
   * MIDI message sent repeatedly while the MIDI device is idle, to tell the receiver that the connection is alive. Most MIDI devices do not send this message.
   */
  MIDI_MESSAGE_ACTIVE_SENSING = 254,
  /**
   * MIDI message sent to reset a MIDI device to its default state, as if it was just turned on. It should not be sent when the MIDI device is being turned on.
   */
  MIDI_MESSAGE_SYSTEM_RESET = 255,
}

declare const enum Error {
  /**
   * Methods that return {@link Error} return {@link OK} when no error occurred.
   * Since {@link OK} has value `0`, and all other error constants are positive integers, it can also be used in boolean checks.
   * **Note:** Many functions do not return an error code, but will print error messages to standard output.
   */
  OK = 0,
  /** Generic error. */
  FAILED = 1,
  /** Unavailable error. */
  ERR_UNAVAILABLE = 2,
  /** Unconfigured error. */
  ERR_UNCONFIGURED = 3,
  /** Unauthorized error. */
  ERR_UNAUTHORIZED = 4,
  /** Parameter range error. */
  ERR_PARAMETER_RANGE_ERROR = 5,
  /** Out of memory (OOM) error. */
  ERR_OUT_OF_MEMORY = 6,
  /** File: Not found error. */
  ERR_FILE_NOT_FOUND = 7,
  /** File: Bad drive error. */
  ERR_FILE_BAD_DRIVE = 8,
  /** File: Bad path error. */
  ERR_FILE_BAD_PATH = 9,
  /** File: No permission error. */
  ERR_FILE_NO_PERMISSION = 10,
  /** File: Already in use error. */
  ERR_FILE_ALREADY_IN_USE = 11,
  /** File: Can't open error. */
  ERR_FILE_CANT_OPEN = 12,
  /** File: Can't write error. */
  ERR_FILE_CANT_WRITE = 13,
  /** File: Can't read error. */
  ERR_FILE_CANT_READ = 14,
  /** File: Unrecognized error. */
  ERR_FILE_UNRECOGNIZED = 15,
  /** File: Corrupt error. */
  ERR_FILE_CORRUPT = 16,
  /** File: Missing dependencies error. */
  ERR_FILE_MISSING_DEPENDENCIES = 17,
  /** File: End of file (EOF) error. */
  ERR_FILE_EOF = 18,
  /** Can't open error. */
  ERR_CANT_OPEN = 19,
  /** Can't create error. */
  ERR_CANT_CREATE = 20,
  /** Query failed error. */
  ERR_QUERY_FAILED = 21,
  /** Already in use error. */
  ERR_ALREADY_IN_USE = 22,
  /** Locked error. */
  ERR_LOCKED = 23,
  /** Timeout error. */
  ERR_TIMEOUT = 24,
  /** Can't connect error. */
  ERR_CANT_CONNECT = 25,
  /** Can't resolve error. */
  ERR_CANT_RESOLVE = 26,
  /** Connection error. */
  ERR_CONNECTION_ERROR = 27,
  /** Can't acquire resource error. */
  ERR_CANT_ACQUIRE_RESOURCE = 28,
  /** Can't fork process error. */
  ERR_CANT_FORK = 29,
  /** Invalid data error. */
  ERR_INVALID_DATA = 30,
  /** Invalid parameter error. */
  ERR_INVALID_PARAMETER = 31,
  /** Already exists error. */
  ERR_ALREADY_EXISTS = 32,
  /** Does not exist error. */
  ERR_DOES_NOT_EXIST = 33,
  /** Database: Read error. */
  ERR_DATABASE_CANT_READ = 34,
  /** Database: Write error. */
  ERR_DATABASE_CANT_WRITE = 35,
  /** Compilation failed error. */
  ERR_COMPILATION_FAILED = 36,
  /** Method not found error. */
  ERR_METHOD_NOT_FOUND = 37,
  /** Linking failed error. */
  ERR_LINK_FAILED = 38,
  /** Script failed error. */
  ERR_SCRIPT_FAILED = 39,
  /** Cycling link (import cycle) error. */
  ERR_CYCLIC_LINK = 40,
  /** Invalid declaration error. */
  ERR_INVALID_DECLARATION = 41,
  /** Duplicate symbol error. */
  ERR_DUPLICATE_SYMBOL = 42,
  /** Parse error. */
  ERR_PARSE_ERROR = 43,
  /** Busy error. */
  ERR_BUSY = 44,
  /** Skip error. */
  ERR_SKIP = 45,
  /** Help error. Used internally when passing `--version` or `--help` as executable options. */
  ERR_HELP = 46,
  /**
   * Bug error, caused by an implementation issue in the method.
   * **Note:** If a built-in method returns this code, please open an issue on the GitHub Issue Tracker (https://github.com/godotengine/godot/issues).
   */
  ERR_BUG = 47,
  /** Printer on fire error (This is an easter egg, no built-in methods return this error code). */
  ERR_PRINTER_ON_FIRE = 48,
}

declare const enum PropertyHint {
  /** The property has no hint for the editor. */
  PROPERTY_HINT_NONE = 0,
  /**
   * Hints that an [int] or [float] property should be within a range specified via the hint string `"min,max"` or `"min,max,step"`. The hint string can optionally include `"or_greater"` and/or `"or_less"` to allow manual input going respectively above the max or below the min values.
   * **Example:** `"-360,360,1,or_greater,or_less"`.
   * Additionally, other keywords can be included: `"exp"` for exponential range editing, `"radians_as_degrees"` for editing radian angles in degrees (the range values are also in degrees), `"degrees"` to hint at an angle, `"prefer_slider"` to show the slider for integers, `"hide_control"` to hide the slider or up-down arrows, and `"suffix:px/s"` to display a suffix indicating the value's unit (e.g. `px/s` for pixels per second).
   */
  PROPERTY_HINT_RANGE = 1,
  /**
   * Hints that an [int], {@link String}, or {@link StringName} property is an enumerated value to pick in a list specified via a hint string.
   * The hint string is a comma separated list of names such as `"Hello,Something,Else"`. Whitespace is **not** removed from either end of a name. For integer properties, the first name in the list has value 0, the next 1, and so on. Explicit values can also be specified by appending `:integer` to the name, e.g. `"Zero,One,Three:3,Four,Six:6"`.
   */
  PROPERTY_HINT_ENUM = 2,
  /**
   * Hints that a {@link String} or {@link StringName} property can be an enumerated value to pick in a list specified via a hint string such as `"Hello,Something,Else"`. See {@link PROPERTY_HINT_ENUM} for details.
   * Unlike {@link PROPERTY_HINT_ENUM}, a property with this hint still accepts arbitrary values and can be empty. The list of values serves to suggest possible values.
   */
  PROPERTY_HINT_ENUM_SUGGESTION = 3,
  /**
   * Hints that a [float] property should be edited via an exponential easing function. The hint string can include `"attenuation"` to flip the curve horizontally and/or `"positive_only"` to exclude in/out easing and limit values to be greater than or equal to zero.
   */
  PROPERTY_HINT_EXP_EASING = 4,
  /**
   * Hints that a vector property should allow its components to be linked. For example, this allows {@link Vector2.x} and {@link Vector2.y} to be edited together.
   */
  PROPERTY_HINT_LINK = 5,
  /**
   * Hints that an [int] property is a bitmask with named bit flags.
   * The hint string is a comma separated list of names such as `"Bit0,Bit1,Bit2,Bit3"`. Whitespace is **not** removed from either end of a name. The first name in the list has value 1, the next 2, then 4, 8, 16 and so on. Explicit values can also be specified by appending `:integer` to the name, e.g. `"A:4,B:8,C:16"`. You can also combine several flags (`"A:4,B:8,AB:12,C:16"`).
   * **Note:** A flag value must be at least `1` and at most `2 ** 32 - 1`.
   * **Note:** Unlike {@link PROPERTY_HINT_ENUM}, the previous explicit value is not taken into account. For the hint `"A:16,B,C"`, A is 16, B is 2, C is 4.
   */
  PROPERTY_HINT_FLAGS = 6,
  /** Hints that an [int] property is a bitmask using the optionally named 2D render layers. */
  PROPERTY_HINT_LAYERS_2D_RENDER = 7,
  /** Hints that an [int] property is a bitmask using the optionally named 2D physics layers. */
  PROPERTY_HINT_LAYERS_2D_PHYSICS = 8,
  /** Hints that an [int] property is a bitmask using the optionally named 2D navigation layers. */
  PROPERTY_HINT_LAYERS_2D_NAVIGATION = 9,
  /** Hints that an [int] property is a bitmask using the optionally named 3D render layers. */
  PROPERTY_HINT_LAYERS_3D_RENDER = 10,
  /** Hints that an [int] property is a bitmask using the optionally named 3D physics layers. */
  PROPERTY_HINT_LAYERS_3D_PHYSICS = 11,
  /** Hints that an [int] property is a bitmask using the optionally named 3D navigation layers. */
  PROPERTY_HINT_LAYERS_3D_NAVIGATION = 12,
  /** Hints that an integer property is a bitmask using the optionally named avoidance layers. */
  PROPERTY_HINT_LAYERS_AVOIDANCE = 37,
  /**
   * Hints that a {@link String} property is a path to a file. Editing it will show a file dialog for picking the path. The hint string can be a set of filters with wildcards like `"*.png,*.jpg"`. By default the file will be stored as UID whenever available. You can use {@link ResourceUID} methods to convert it back to path. For storing a raw path, use {@link PROPERTY_HINT_FILE_PATH}.
   */
  PROPERTY_HINT_FILE = 13,
  /**
   * Hints that a {@link String} property is a path to a directory. Editing it will show a file dialog for picking the path.
   */
  PROPERTY_HINT_DIR = 14,
  /**
   * Hints that a {@link String} property is an absolute path to a file outside the project folder. Editing it will show a file dialog for picking the path. The hint string can be a set of filters with wildcards, like `"*.png,*.jpg"`.
   */
  PROPERTY_HINT_GLOBAL_FILE = 15,
  /**
   * Hints that a {@link String} property is an absolute path to a directory outside the project folder. Editing it will show a file dialog for picking the path.
   */
  PROPERTY_HINT_GLOBAL_DIR = 16,
  /**
   * Hints that a property is an instance of a {@link Resource}-derived type, optionally specified via the hint string (e.g. `"Texture2D"`). Editing it will show a popup menu of valid resource types to instantiate.
   */
  PROPERTY_HINT_RESOURCE_TYPE = 17,
  /**
   * Hints that a {@link String} property is text with line breaks. Editing it will show a text input field where line breaks can be typed.
   * The hint string can be set to `"monospace"` to force the input field to use a monospaced font.
   * If the hint string `"no_wrap"` is set, the input field will not wrap lines at boundaries, instead resorting to making the area scrollable.
   */
  PROPERTY_HINT_MULTILINE_TEXT = 18,
  /** Hints that a {@link String} property is an {@link Expression}. */
  PROPERTY_HINT_EXPRESSION = 19,
  /**
   * Hints that a {@link String} property should show a placeholder text on its input field, if empty. The hint string is the placeholder text to use.
   */
  PROPERTY_HINT_PLACEHOLDER_TEXT = 20,
  /**
   * Hints that a {@link Color} property should be edited without affecting its transparency ({@link Color.a} is not editable).
   */
  PROPERTY_HINT_COLOR_NO_ALPHA = 21,
  /**
   * Hints that the property's value is an object encoded as object ID, with its type specified in the hint string. Used by the debugger.
   */
  PROPERTY_HINT_OBJECT_ID = 22,
  /**
   * If a property is {@link String}, hints that the property represents a particular type (class). This allows to select a type from the create dialog. The property will store the selected type as a string.
   * If a property is {@link Array}, hints the editor how to show elements. The `hint_string` must encode nested types using `":"` and `"/"`.
   * If a property is {@link Dictionary}, hints the editor how to show elements. The `hint_string` is the same as {@link Array}, with a `";"` separating the key and value.
   * **Examples:**
   * **Note:** The trailing colon is required for properly detecting built-in types.
   */
  PROPERTY_HINT_TYPE_STRING = 23,
  PROPERTY_HINT_NODE_PATH_TO_EDITED_NODE = 24,
  /** Hints that an object is too big to be sent via the debugger. */
  PROPERTY_HINT_OBJECT_TOO_BIG = 25,
  /** Hints that the hint string specifies valid node types for property of type {@link NodePath}. */
  PROPERTY_HINT_NODE_PATH_VALID_TYPES = 26,
  /**
   * Hints that a {@link String} property is a path to a file. Editing it will show a file dialog for picking the path for the file to be saved at. The dialog has access to the project's directory. The hint string can be a set of filters with wildcards like `"*.png,*.jpg"`. See also {@link FileDialog.filters}.
   */
  PROPERTY_HINT_SAVE_FILE = 27,
  /**
   * Hints that a {@link String} property is a path to a file. Editing it will show a file dialog for picking the path for the file to be saved at. The dialog has access to the entire filesystem. The hint string can be a set of filters with wildcards like `"*.png,*.jpg"`. See also {@link FileDialog.filters}.
   */
  PROPERTY_HINT_GLOBAL_SAVE_FILE = 28,
  PROPERTY_HINT_INT_IS_OBJECTID = 29,
  /** Hints that an [int] property is a pointer. Used by GDExtension. */
  PROPERTY_HINT_INT_IS_POINTER = 30,
  /**
   * Hints that a property is an {@link Array} with the stored type specified in the hint string. The hint string contains the type of the array (e.g. `"String"`).
   * Use the hint string format from {@link PROPERTY_HINT_TYPE_STRING} for more control over the stored type.
   */
  PROPERTY_HINT_ARRAY_TYPE = 31,
  /**
   * Hints that a property is a {@link Dictionary} with the stored types specified in the hint string. The hint string contains the key and value types separated by a semicolon (e.g. `"int;String"`).
   * Use the hint string format from {@link PROPERTY_HINT_TYPE_STRING} for more control over the stored types.
   */
  PROPERTY_HINT_DICTIONARY_TYPE = 38,
  /**
   * Hints that a string property is a locale code. Editing it will show a locale dialog for picking language and country.
   */
  PROPERTY_HINT_LOCALE_ID = 32,
  /**
   * Hints that a dictionary property is string translation map. Dictionary keys are locale codes and, values are translated strings.
   */
  PROPERTY_HINT_LOCALIZABLE_STRING = 33,
  /**
   * Hints that a property is an instance of a {@link Node}-derived type, optionally specified via the hint string (e.g. `"Node2D"`). Editing it will show a dialog for picking a node from the scene.
   */
  PROPERTY_HINT_NODE_TYPE = 34,
  /** Hints that a quaternion property should disable the temporary euler editor. */
  PROPERTY_HINT_HIDE_QUATERNION_EDIT = 35,
  /**
   * Hints that a string property is a password, and every character is replaced with the secret character.
   */
  PROPERTY_HINT_PASSWORD = 36,
  /**
   * Hints that a {@link Callable} property should be displayed as a clickable button. When the button is pressed, the callable is called. The hint string specifies the button text and optionally an icon from the `"EditorIcons"` theme type.
   * [codeblock lang=text]
   * "Click me!" - A button with the text "Click me!" and the default "Callable" icon.
   * "Click me!,ColorRect" - A button with the text "Click me!" and the "ColorRect" icon.
   * [/codeblock]
   * **Note:** A {@link Callable} cannot be properly serialized and stored in a file, so it is recommended to use {@link PROPERTY_USAGE_EDITOR} instead of {@link PROPERTY_USAGE_DEFAULT}.
   */
  PROPERTY_HINT_TOOL_BUTTON = 39,
  /**
   * Hints that a property will be changed on its own after setting, such as {@link AudioStreamPlayer.playing} or {@link GPUParticles3D.emitting}.
   */
  PROPERTY_HINT_ONESHOT = 40,
  /**
   * Hints that a boolean property will enable the feature associated with the group that it occurs in. The property will be displayed as a checkbox on the group header. Only works within a group or subgroup.
   * By default, disabling the property hides all properties in the group. Use the optional hint string `"checkbox_only"` to disable this behavior.
   */
  PROPERTY_HINT_GROUP_ENABLE = 42,
  /**
   * Hints that a {@link String} or {@link StringName} property is the name of an input action. This allows the selection of any action name from the Input Map in the Project Settings. The hint string may contain two options separated by commas:
   * - If it contains `"show_builtin"`, built-in input actions are included in the selection.
   * - If it contains `"loose_mode"`, loose mode is enabled. This allows inserting any action name even if it's not present in the input map.
   */
  PROPERTY_HINT_INPUT_NAME = 43,
  /**
   * Like {@link PROPERTY_HINT_FILE}, but the property is stored as a raw path, not UID. That means the reference will be broken if you move the file. Consider using {@link PROPERTY_HINT_FILE} when possible.
   */
  PROPERTY_HINT_FILE_PATH = 44,
  /** Represents the size of the {@link PropertyHint} enum. */
  PROPERTY_HINT_MAX = 45,
}

declare const enum PropertyUsageFlags {
  /**
   * The property is not stored, and does not display in the editor. This is the default for non-exported properties.
   */
  PROPERTY_USAGE_NONE = 0,
  /** The property is serialized and saved in the scene file (default for exported properties). */
  PROPERTY_USAGE_STORAGE = 2,
  /** The property is shown in the {@link EditorInspector} (default for exported properties). */
  PROPERTY_USAGE_EDITOR = 4,
  /** The property is excluded from the class reference. */
  PROPERTY_USAGE_INTERNAL = 8,
  /** The property can be checked in the {@link EditorInspector}. */
  PROPERTY_USAGE_CHECKABLE = 16,
  /** The property is checked in the {@link EditorInspector}. */
  PROPERTY_USAGE_CHECKED = 32,
  /** Used to group properties together in the editor. See {@link EditorInspector}. */
  PROPERTY_USAGE_GROUP = 64,
  /** Used to categorize properties together in the editor. */
  PROPERTY_USAGE_CATEGORY = 128,
  /**
   * Used to group properties together in the editor in a subgroup (under a group). See {@link EditorInspector}.
   */
  PROPERTY_USAGE_SUBGROUP = 256,
  /** The property is a bitfield, i.e. it contains multiple flags represented as bits. */
  PROPERTY_USAGE_CLASS_IS_BITFIELD = 512,
  /** The property does not save its state in {@link PackedScene}. */
  PROPERTY_USAGE_NO_INSTANCE_STATE = 1024,
  /** Editing the property prompts the user for restarting the editor. */
  PROPERTY_USAGE_RESTART_IF_CHANGED = 2048,
  /**
   * The property is a script variable. {@link PROPERTY_USAGE_SCRIPT_VARIABLE} can be used to distinguish between exported script variables from built-in variables (which don't have this usage flag). By default, {@link PROPERTY_USAGE_SCRIPT_VARIABLE} is **not** applied to variables that are created by overriding {@link Object._get_property_list} in a script.
   */
  PROPERTY_USAGE_SCRIPT_VARIABLE = 4096,
  /** The property value of type {@link Object} will be stored even if its value is `null`. */
  PROPERTY_USAGE_STORE_IF_NULL = 8192,
  /** If this property is modified, all inspector fields will be refreshed. */
  PROPERTY_USAGE_UPDATE_ALL_IF_MODIFIED = 16384,
  PROPERTY_USAGE_SCRIPT_DEFAULT_VALUE = 32768,
  /**
   * The property is a variable of enum type, i.e. it only takes named integer constants from its associated enumeration.
   */
  PROPERTY_USAGE_CLASS_IS_ENUM = 65536,
  /** If property has `nil` as default value, its type will be {@link Variant}. */
  PROPERTY_USAGE_NIL_IS_VARIANT = 131072,
  /**
   * The property is the element count of a property array, i.e. a list of groups of related properties. Properties defined with this usage also need a specific `class_name` field in the form of `label,prefix`. The field may also include additional comma-separated options:
   * - `page_size=N`: Overrides {@link EditorSettings.interface/inspector/max_array_dictionary_items_per_page} for this array.
   * - `add_button_text=text`: The text displayed by the "Add Element" button.
   * - `static`: The elements can't be re-arranged.
   * - `const`: New elements can't be added.
   * - `numbered`: An index will appear next to each element.
   * - `unfoldable`: The array can't be folded.
   * - `swap_method=method_name`: The method that will be called when two elements switch places. The method should take 2 [int] parameters, which will be indices of the elements being swapped.
   * Note that making a full-fledged property array requires boilerplate code involving {@link Object._get_property_list}.
   */
  PROPERTY_USAGE_ARRAY = 262144,
  /**
   * When duplicating a resource with {@link Resource.duplicate}, and this flag is set on a property of that resource, the property should always be duplicated, regardless of the `subresources` bool parameter.
   */
  PROPERTY_USAGE_ALWAYS_DUPLICATE = 524288,
  /**
   * When duplicating a resource with {@link Resource.duplicate}, and this flag is set on a property of that resource, the property should never be duplicated, regardless of the `subresources` bool parameter.
   */
  PROPERTY_USAGE_NEVER_DUPLICATE = 1048576,
  /**
   * The property is only shown in the editor if modern renderers are supported (the Compatibility rendering method is excluded).
   */
  PROPERTY_USAGE_HIGH_END_GFX = 2097152,
  /**
   * The {@link NodePath} property will always be relative to the scene's root. Mostly useful for local resources.
   */
  PROPERTY_USAGE_NODE_PATH_FROM_SCENE_ROOT = 4194304,
  /**
   * Use when a resource is created on the fly, i.e. the getter will always return a different instance. {@link ResourceSaver} needs this information to properly save such resources.
   */
  PROPERTY_USAGE_RESOURCE_NOT_PERSISTENT = 8388608,
  /**
   * Inserting an animation key frame of this property will automatically increment the value, allowing to easily keyframe multiple values in a row.
   */
  PROPERTY_USAGE_KEYING_INCREMENTS = 16777216,
  PROPERTY_USAGE_DEFERRED_SET_RESOURCE = 33554432,
  /**
   * When this property is a {@link Resource} and base object is a {@link Node}, a resource instance will be automatically created whenever the node is created in the editor.
   */
  PROPERTY_USAGE_EDITOR_INSTANTIATE_OBJECT = 67108864,
  /**
   * The property is considered a basic setting and will appear even when advanced mode is disabled. Used for project settings.
   */
  PROPERTY_USAGE_EDITOR_BASIC_SETTING = 134217728,
  /** The property is read-only in the {@link EditorInspector}. */
  PROPERTY_USAGE_READ_ONLY = 268435456,
  /**
   * An export preset property with this flag contains confidential information and is stored separately from the rest of the export preset configuration.
   */
  PROPERTY_USAGE_SECRET = 536870912,
  /** Default usage (storage and editor). */
  PROPERTY_USAGE_DEFAULT = 6,
  /** Default usage but without showing the property in the editor (storage). */
  PROPERTY_USAGE_NO_EDITOR = 2,
}

declare const enum MethodFlags {
  /** Flag for a normal method. */
  METHOD_FLAG_NORMAL = 1,
  /** Flag for an editor method. */
  METHOD_FLAG_EDITOR = 2,
  /** Flag for a constant method. */
  METHOD_FLAG_CONST = 4,
  /** Flag for a virtual method. */
  METHOD_FLAG_VIRTUAL = 8,
  /** Flag for a method with a variable number of arguments. */
  METHOD_FLAG_VARARG = 16,
  /** Flag for a static method. */
  METHOD_FLAG_STATIC = 32,
  /**
   * Used internally. Allows to not dump core virtual methods (such as {@link Object._notification}) to the JSON API.
   */
  METHOD_FLAG_OBJECT_CORE = 64,
  /** Flag for a virtual method that is required. In GDScript, this flag is set for abstract functions. */
  METHOD_FLAG_VIRTUAL_REQUIRED = 128,
  /** Default method flags (normal). */
  METHOD_FLAGS_DEFAULT = 1,
}

declare const enum Variant_Type {
  /** Variable is `null`. */
  TYPE_NIL = 0,
  /** Variable is of type [bool]. */
  TYPE_BOOL = 1,
  /** Variable is of type [int]. */
  TYPE_INT = 2,
  /** Variable is of type [float]. */
  TYPE_FLOAT = 3,
  /** Variable is of type {@link String}. */
  TYPE_STRING = 4,
  /** Variable is of type {@link Vector2}. */
  TYPE_VECTOR2 = 5,
  /** Variable is of type {@link Vector2i}. */
  TYPE_VECTOR2I = 6,
  /** Variable is of type {@link Rect2}. */
  TYPE_RECT2 = 7,
  /** Variable is of type {@link Rect2i}. */
  TYPE_RECT2I = 8,
  /** Variable is of type {@link Vector3}. */
  TYPE_VECTOR3 = 9,
  /** Variable is of type {@link Vector3i}. */
  TYPE_VECTOR3I = 10,
  /** Variable is of type {@link Transform2D}. */
  TYPE_TRANSFORM2D = 11,
  /** Variable is of type {@link Vector4}. */
  TYPE_VECTOR4 = 12,
  /** Variable is of type {@link Vector4i}. */
  TYPE_VECTOR4I = 13,
  /** Variable is of type {@link Plane}. */
  TYPE_PLANE = 14,
  /** Variable is of type {@link Quaternion}. */
  TYPE_QUATERNION = 15,
  /** Variable is of type {@link AABB}. */
  TYPE_AABB = 16,
  /** Variable is of type {@link Basis}. */
  TYPE_BASIS = 17,
  /** Variable is of type {@link Transform3D}. */
  TYPE_TRANSFORM3D = 18,
  /** Variable is of type {@link Projection}. */
  TYPE_PROJECTION = 19,
  /** Variable is of type {@link Color}. */
  TYPE_COLOR = 20,
  /** Variable is of type {@link StringName}. */
  TYPE_STRING_NAME = 21,
  /** Variable is of type {@link NodePath}. */
  TYPE_NODE_PATH = 22,
  /** Variable is of type {@link RID}. */
  TYPE_RID = 23,
  /** Variable is of type {@link Object}. */
  TYPE_OBJECT = 24,
  /** Variable is of type {@link Callable}. */
  TYPE_CALLABLE = 25,
  /** Variable is of type {@link Signal}. */
  TYPE_SIGNAL = 26,
  /** Variable is of type {@link Dictionary}. */
  TYPE_DICTIONARY = 27,
  /** Variable is of type {@link Array}. */
  TYPE_ARRAY = 28,
  /** Variable is of type {@link PackedByteArray}. */
  TYPE_PACKED_BYTE_ARRAY = 29,
  /** Variable is of type {@link PackedInt32Array}. */
  TYPE_PACKED_INT32_ARRAY = 30,
  /** Variable is of type {@link PackedInt64Array}. */
  TYPE_PACKED_INT64_ARRAY = 31,
  /** Variable is of type {@link PackedFloat32Array}. */
  TYPE_PACKED_FLOAT32_ARRAY = 32,
  /** Variable is of type {@link PackedFloat64Array}. */
  TYPE_PACKED_FLOAT64_ARRAY = 33,
  /** Variable is of type {@link PackedStringArray}. */
  TYPE_PACKED_STRING_ARRAY = 34,
  /** Variable is of type {@link PackedVector2Array}. */
  TYPE_PACKED_VECTOR2_ARRAY = 35,
  /** Variable is of type {@link PackedVector3Array}. */
  TYPE_PACKED_VECTOR3_ARRAY = 36,
  /** Variable is of type {@link PackedColorArray}. */
  TYPE_PACKED_COLOR_ARRAY = 37,
  /** Variable is of type {@link PackedVector4Array}. */
  TYPE_PACKED_VECTOR4_ARRAY = 38,
  /** Represents the size of the {@link Variant.Type} enum. */
  TYPE_MAX = 39,
}

declare const enum Variant_Operator {
  /** Equality operator (`==`). */
  OP_EQUAL = 0,
  /** Inequality operator (`!=`). */
  OP_NOT_EQUAL = 1,
  /** Less than operator (`<`). */
  OP_LESS = 2,
  /** Less than or equal operator (`<=`). */
  OP_LESS_EQUAL = 3,
  /** Greater than operator (`>`). */
  OP_GREATER = 4,
  /** Greater than or equal operator (`>=`). */
  OP_GREATER_EQUAL = 5,
  /** Addition operator (`+`). */
  OP_ADD = 6,
  /** Subtraction operator (`-`). */
  OP_SUBTRACT = 7,
  /** Multiplication operator (`*`). */
  OP_MULTIPLY = 8,
  /** Division operator (`/`). */
  OP_DIVIDE = 9,
  /** Unary negation operator (`-`). */
  OP_NEGATE = 10,
  /** Unary plus operator (`+`). */
  OP_POSITIVE = 11,
  /** Remainder/modulo operator (`%`). */
  OP_MODULE = 12,
  /** Power operator (`**`). */
  OP_POWER = 13,
  /** Left shift operator (`<<`). */
  OP_SHIFT_LEFT = 14,
  /** Right shift operator (`>>`). */
  OP_SHIFT_RIGHT = 15,
  /** Bitwise AND operator (`&`). */
  OP_BIT_AND = 16,
  /** Bitwise OR operator (`|`). */
  OP_BIT_OR = 17,
  /** Bitwise XOR operator (`^`). */
  OP_BIT_XOR = 18,
  /** Bitwise NOT operator (`~`). */
  OP_BIT_NEGATE = 19,
  /** Logical AND operator (`and` or `&&`). */
  OP_AND = 20,
  /** Logical OR operator (`or` or `||`). */
  OP_OR = 21,
  /** Logical XOR operator (not implemented in GDScript). */
  OP_XOR = 22,
  /** Logical NOT operator (`not` or `!`). */
  OP_NOT = 23,
  /** Logical IN operator (`in`). */
  OP_IN = 24,
  /** Represents the size of the {@link Variant.Operator} enum. */
  OP_MAX = 25,
}


/** Maximum value of an 8-bit unsigned integer. */
declare const UINT8_MAX: int;
/** Maximum value of a 16-bit unsigned integer. */
declare const UINT16_MAX: int;
/** Maximum value of a 32-bit unsigned integer. */
declare const UINT32_MAX: int;
/** Minimum value of an 8-bit signed integer. */
declare const INT8_MIN: int;
/** Maximum value of an 8-bit signed integer. */
declare const INT8_MAX: int;
/** Minimum value of a 16-bit signed integer. */
declare const INT16_MIN: int;
/** Maximum value of a 16-bit signed integer. */
declare const INT16_MAX: int;
/** Minimum value of a 32-bit signed integer. */
declare const INT32_MIN: int;
/** Maximum value of a 32-bit signed integer. */
declare const INT32_MAX: int;
/** Minimum value of a 64-bit signed integer. */
declare const INT64_MIN: int;
/** Maximum value of a 64-bit signed integer. */
declare const INT64_MAX: int;
// @GDScript — built-in constants, functions, and annotations

/**
 * Constant that represents how many times the diameter of a circle fits around its perimeter. This is equivalent to `TAU / 2`, or 180 degrees in rotations.
 */
declare const PI: float;
/**
 * The circle constant, the circumference of the unit circle in radians. This is equivalent to `PI * 2`, or 360 degrees in rotations.
 */
declare const TAU: float;
/**
 * Positive floating-point infinity. This is the result of floating-point division when the divisor is `0.0`. For negative infinity, use `-INF`. Dividing by `-0.0` will result in negative infinity if the numerator is positive, so dividing by `0.0` is not the same as dividing by `-0.0` (despite `0.0 == -0.0` returning `true`).
 * **Warning:** Numeric infinity is only a concept with floating-point numbers, and has no equivalent for integers. Dividing an integer number by `0` will not result in {@link INF} and will result in a run-time error instead.
 */
declare const INF: float;
/**
 * "Not a Number", an invalid floating-point value. It is returned by some invalid operations, such as dividing floating-point `0.0` by `0.0`.
 * {@link NAN} has special properties, including that `!=` always returns `true`, while other comparison operators always return `false`. This is true even when comparing with itself (`NAN == NAN` returns `false` and `NAN != NAN` returns `true`). Due to this, you must use {@link @GlobalScope.is_nan} to check whether a number is equal to {@link NAN}.
 * **Warning:** "Not a Number" is only a concept with floating-point numbers, and has no equivalent for integers. Dividing an integer `0` by `0` will not result in {@link NAN} and will result in a run-time error instead.
 */
declare const NAN: float;

/**
 * Returns a {@link Color} constructed from red (`r8`), green (`g8`), blue (`b8`), and optionally alpha (`a8`) integer channels, each divided by `255.0` for their final value. Using {@link Color8} instead of the standard {@link Color} constructor is useful when you need to match exact color values in an {@link Image}.
 * **Note:** Due to the lower precision of {@link Color8} compared to the standard {@link Color} constructor, a color created with {@link Color8} will generally not be equal to the same color created with the standard {@link Color} constructor. Use {@link Color.is_equal_approx} for comparisons to avoid issues with floating-point precision error.
 */
declare function Color8(r8: int, g8: int, b8: int, a8?: int): Color;
/**
 * Asserts that the `condition` is `true`. If the `condition` is `false`, an error is generated. When running from the editor, the running project will also be paused until you resume it. This can be used as a stronger form of {@link @GlobalScope.push_error} for reporting errors to project developers or add-on users.
 * An optional `message` can be shown in addition to the generic "Assertion failed" message. You can use this to provide additional details about why the assertion failed.
 * **Warning:** For performance reasons, the code inside {@link assert} is only executed in debug builds or when running the project from the editor. Don't include code that has side effects in an {@link assert} call. Otherwise, the project will behave differently when exported in release mode.
 * **Note:** {@link assert} is a keyword, not a function. So you cannot access it as a {@link Callable} or use it inside expressions.
 */
declare function assert(condition: boolean, message?: string): void;
/**
 * Returns a single character (as a {@link String} of length 1) of the given Unicode code point `code`.
 * This is the inverse of {@link ord}. See also {@link String.chr} and {@link String.unicode_at}.
 */
declare function char(code: int): string;
/**
 * Converts `what` to `type` in the best way possible. The `type` uses the {@link Variant.Type} values.
 */
declare function convert(what: unknown, type_: int): unknown;
/**
 * Converts a `dictionary` (created with {@link inst_to_dict}) back to an Object instance. Can be useful for deserializing.
 */
declare function dict_to_inst(dictionary: Dictionary): GodotObject;
/**
 * Returns an array of dictionaries representing the current call stack.
 * Starting from `_ready()`, `bar()` would print:
 * [codeblock lang=text]
 * [{function:bar, line:12, source:res://script.gd}, {function:foo, line:9, source:res://script.gd}, {function:_ready, line:6, source:res://script.gd}]
 * [/codeblock]
 * See also {@link print_debug}, {@link print_stack}, and {@link Engine.capture_script_backtraces}.
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable {@link ProjectSettings.debug/settings/gdscript/always_track_call_stacks}.
 */
declare function get_stack(): Array<unknown>;
/**
 * Returns the passed `instance` converted to a {@link Dictionary}. Can be useful for serializing.
 * Prints out:
 * [codeblock lang=text]
 * [@subpath, @path, foo]
 * [, res://test.gd, bar]
 * [/codeblock]
 * **Note:** This function can only be used to serialize objects with an attached {@link GDScript} stored in a separate file. Objects without an attached script, with a script written in another language, or with a built-in script are not supported.
 * **Note:** This function is not recursive, which means that nested objects will not be represented as dictionaries. Also, properties passed by reference ({@link Object}, {@link Dictionary}, {@link Array}, and packed arrays) are copied by reference, not duplicated.
 */
declare function inst_to_dict(instance: GodotObject): Dictionary;
/**
 * Returns `true` if `value` is an instance of `type`. The `type` value must be one of the following:
 * - A constant from the {@link Variant.Type} enumeration, for example {@link TYPE_INT}.
 * - An {@link Object}-derived class which exists in {@link ClassDB}, for example {@link Node}.
 * - A {@link Script} (you can use any class, including inner one).
 * Unlike the right operand of the `is` operator, `type` can be a non-constant value. The `is` operator supports more features (such as typed arrays). Use the operator instead of this method if you do not need to check the type dynamically.
 * **Examples:**
 * **Note:** If `value` and/or `type` are freed objects (see {@link @GlobalScope.is_instance_valid}), or `type` is not one of the above options, this method will raise a runtime error.
 * See also {@link @GlobalScope.typeof}, {@link type_exists}, {@link Array.is_same_typed} (and other {@link Array} methods).
 */
declare function is_instance_of(value: unknown, type_: unknown): boolean;
/**
 * Returns the length of the given Variant `var`. The length can be the character count of a {@link String} or {@link StringName}, the element count of any array type, or the size of a {@link Dictionary}. For every other Variant type, a run-time error is generated and execution is stopped.
 */
declare function len(var_: unknown): int;
/**
 * Returns a {@link Resource} from the filesystem located at the absolute `path`. Unless it's already referenced elsewhere (such as in another script or in the scene), the resource is loaded from disk on function call, which might cause a slight delay, especially when loading large scenes. To avoid unnecessary delays when loading something multiple times, either store the resource in a variable or use {@link preload}. This method is equivalent of using {@link ResourceLoader.load} with {@link ResourceLoader.CACHE_MODE_REUSE}.
 * **Note:** Resource paths can be obtained by right-clicking on a resource in the FileSystem dock and choosing "Copy Path", or by dragging the file from the FileSystem dock into the current script.
 * **Important:** Relative paths are *not* relative to the script calling this method, instead it is prefixed with `"res://"`. Loading from relative paths might not work as expected.
 * This function is a simplified version of {@link ResourceLoader.load}, which can be used for more advanced scenarios.
 * **Note:** Files have to be imported into the engine first to load them using this function. If you want to load {@link Image}s at run-time, you may use {@link Image.load}. If you want to import audio files, you can use the snippet described in {@link AudioStreamMP3.data}.
 * **Note:** If {@link ProjectSettings.editor/export/convert_text_resources_to_binary} is `true`, {@link @GDScript.load} will not be able to read converted files in an exported project. If you rely on run-time loading of files present within the PCK, set {@link ProjectSettings.editor/export/convert_text_resources_to_binary} to `false`.
 */
declare function load<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function load<T extends Resource = Resource>(path: string): T;
/**
 * Returns an integer representing the Unicode code point of the given character `char`, which should be a string of length 1.
 * This is the inverse of {@link char}. See also {@link String.chr} and {@link String.unicode_at}.
 */
declare function ord(char: string): int;
/**
 * Returns a {@link Resource} from the filesystem located at `path`. During run-time, the resource is loaded when the script is being parsed. This function effectively acts as a reference to that resource. Note that this function requires `path` to be a constant {@link String}. If you want to load a resource from a dynamic/variable path, use {@link load}.
 * **Note:** Resource paths can be obtained by right-clicking on a resource in the Assets Panel and choosing "Copy Path", or by dragging the file from the FileSystem dock into the current script.
 * **Note:** {@link preload} is a keyword, not a function. So you cannot access it as a {@link Callable}.
 */
declare function preload<P extends keyof GodotResources>(path: P): GodotResources[P];
declare function preload<T extends Resource = Resource>(path: string): T;
/**
 * Like {@link @GlobalScope.print}, but includes the current stack frame when running with the debugger turned on.
 * The output in the console may look like the following:
 * [codeblock lang=text]
 * Test print
 * At: res://test.gd:15:_process()
 * [/codeblock]
 * See also {@link print_stack}, {@link get_stack}, and {@link Engine.capture_script_backtraces}.
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable {@link ProjectSettings.debug/settings/gdscript/always_track_call_stacks}.
 */
declare function print_debug(...args: any[]): void;
/**
 * Prints a stack trace at the current code location.
 * The output in the console may look like the following:
 * [codeblock lang=text]
 * Frame 0 - res://test.gd:16 in function '_process'
 * [/codeblock]
 * See also {@link print_debug}, {@link get_stack}, and {@link Engine.capture_script_backtraces}.
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable {@link ProjectSettings.debug/settings/gdscript/always_track_call_stacks}.
 */
declare function print_stack(): void;
/**
 * Returns an array with the given range. {@link range} can be called in three ways:
 * `range(n: int)`: Starts from 0, increases by steps of 1, and stops *before* `n`. The argument `n` is **exclusive**.
 * `range(b: int, n: int)`: Starts from `b`, increases by steps of 1, and stops *before* `n`. The arguments `b` and `n` are **inclusive** and **exclusive**, respectively.
 * `range(b: int, n: int, s: int)`: Starts from `b`, increases/decreases by steps of `s`, and stops *before* `n`. The arguments `b` and `n` are **inclusive** and **exclusive**, respectively. The argument `s` **can** be negative, but not `0`. If `s` is `0`, an error message is printed.
 * {@link range} converts all arguments to [int] before processing.
 * **Note:** Returns an empty array if no value meets the value constraint (e.g. `range(2, 5, -1)` or `range(5, 5, 1)`).
 * **Examples:**
 * To iterate over an {@link Array} backwards, use:
 * Output:
 * [codeblock lang=text]
 * 9
 * 6
 * 3
 * [/codeblock]
 * To iterate over [float], convert them in the loop.
 * Output:
 * [codeblock lang=text]
 * 0.3
 * 0.2
 * 0.1
 * [/codeblock]
 */
declare function range(end: int): Array<int>;
declare function range(begin: int, end: int): Array<int>;
declare function range(begin: int, end: int, step: int): Array<int>;
/**
 * Returns `true` if the given {@link Object}-derived class exists in {@link ClassDB}. Note that {@link Variant} data types are not registered in {@link ClassDB}.
 */
declare function type_exists(type_: string): boolean;

// GDScript annotations as TypeScript decorators
/**
 * Marks a class or a method as abstract.
 * An abstract class is a class that cannot be instantiated directly. Instead, it is meant to be inherited by other classes. Attempting to instantiate an abstract class will result in an error.
 * An abstract method is a method that has no implementation. Therefore, a newline or a semicolon is expected after the function header. This defines a contract that inheriting classes must conform to, because the method signature must be compatible when overriding.
 * Inheriting classes must either provide implementations for all abstract methods, or the inheriting class must be marked as abstract. If a class has at least one abstract method (either its own or an unimplemented inherited one), then it must also be marked as abstract. However, the reverse is not true: an abstract class is allowed to have no abstract methods.
 */
declare function abstract(target: any, context: any): void;
/**
 * Mark the following property as exported (editable in the Inspector dock and saved to disk). To control the type of the exported property, use the type hint notation.
 * **Note:** Custom resources and nodes should be registered as global classes using `class_name`, since the Inspector currently only supports global classes. Otherwise, a less specific type will be exported instead.
 * **Note:** Node export is only supported in {@link Node}-derived classes and has a number of other limitations.
 */
declare function exports(target: any, context: any): void;
/**
 * Define a new category for the following exported properties. This helps to organize properties in the Inspector dock.
 * See also {@link PROPERTY_USAGE_CATEGORY}.
 * **Note:** Categories in the Inspector dock's list usually divide properties coming from different classes (Node, Node2D, Sprite, etc.). For better clarity, it's recommended to use  and , instead.
 */
declare function export_category(name: string): (target: any, context: any) => void;
/**
 * Export a {@link Color}, {@link Array}[lb]{@link Color}[rb], or {@link PackedColorArray} property without allowing its transparency ({@link Color.a}) to be edited.
 * See also {@link PROPERTY_HINT_COLOR_NO_ALPHA}.
 */
declare function export_color_no_alpha(target: any, context: any): void;
/**
 * Allows you to set a custom hint, hint string, and usage flags for the exported property. Note that there's no validation done in GDScript, it will just pass the parameters to the editor.
 * **Note:** Regardless of the `usage` value, the {@link PROPERTY_USAGE_SCRIPT_VARIABLE} flag is always added, as with any explicitly declared script variable.
 */
declare function export_custom(hint: int, hint_string: string, usage: int): (target: any, context: any) => void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], or {@link PackedStringArray} property as a path to a directory. The path will be limited to the project folder and its subfolders. See  to allow picking from the entire filesystem.
 * See also {@link PROPERTY_HINT_DIR}.
 */
declare function export_dir(target: any, context: any): void;
/**
 * Export an [int], {@link String}, {@link Array}[lb][int][rb], {@link Array}[lb]{@link String}[rb], {@link PackedByteArray}, {@link PackedInt32Array}, {@link PackedInt64Array}, or {@link PackedStringArray} property as an enumerated list of options (or an array of options). If the property is an [int], then the index of the value is stored, in the same order the values are provided. You can add explicit values using a colon. If the property is a {@link String}, then the value is stored.
 * See also {@link PROPERTY_HINT_ENUM}.
 * If you want to set an initial value, you must specify it explicitly:
 * If you want to use named GDScript enums, then use  instead:
 */
declare function export_enum(names: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export a floating-point property with an easing editor widget. Additional hints can be provided to adjust the behavior of the widget. `"attenuation"` flips the curve, which makes it more intuitive for editing attenuation properties. `"positive_only"` limits values to only be greater than or equal to zero.
 * See also {@link PROPERTY_HINT_EXP_EASING}.
 */
declare function export_exp_easing(hints?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], or {@link PackedStringArray} property as a path to a file. The path will be limited to the project folder and its subfolders. See  to allow picking from the entire filesystem.
 * If `filter` is provided, only matching files will be available for picking.
 * See also {@link PROPERTY_HINT_FILE}.
 * **Note:** The file will be stored and referenced as UID, if available. This ensures that the reference is valid even when the file is moved. You can use {@link ResourceUID} methods to convert it to path.
 */
declare function export_file(filter?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Same as , except the file will be stored as a raw path. This means that it may become invalid when the file is moved. If you are exporting a {@link Resource} path, consider using  instead.
 */
declare function export_file_path(filter?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export an integer property as a bit flag field. This allows to store several "checked" or `true` values with one property, and comfortably select them from the Inspector dock.
 * See also {@link PROPERTY_HINT_FLAGS}.
 * You can add explicit values using a colon:
 * You can also combine several flags:
 * **Note:** A flag value must be at least `1` and at most `2 ** 32 - 1`.
 * **Note:** Unlike , the previous explicit value is not taken into account. In the following example, A is 16, B is 2, C is 4.
 * You can also use the annotation on {@link Array}[lb][int][rb], {@link PackedByteArray}, {@link PackedInt32Array}, and {@link PackedInt64Array}
 */
declare function export_flags(names: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export an integer property as a bit flag field for 2D navigation layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/2d_navigation/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_2D_NAVIGATION}.
 */
declare function export_flags_2d_navigation(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for 2D physics layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/2d_physics/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_2D_PHYSICS}.
 */
declare function export_flags_2d_physics(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for 2D render layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/2d_render/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_2D_RENDER}.
 */
declare function export_flags_2d_render(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for 3D navigation layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/3d_navigation/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_3D_NAVIGATION}.
 */
declare function export_flags_3d_navigation(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for 3D physics layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/3d_physics/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_3D_PHYSICS}.
 */
declare function export_flags_3d_physics(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for 3D render layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/3d_render/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_3D_RENDER}.
 */
declare function export_flags_3d_render(target: any, context: any): void;
/**
 * Export an integer property as a bit flag field for navigation avoidance layers. The widget in the Inspector dock will use the layer names defined in {@link ProjectSettings.layer_names/avoidance/layer_1}.
 * See also {@link PROPERTY_HINT_LAYERS_AVOIDANCE}.
 */
declare function export_flags_avoidance(target: any, context: any): void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], or {@link PackedStringArray} property as an absolute path to a directory. The path can be picked from the entire filesystem. See  to limit it to the project folder and its subfolders.
 * See also {@link PROPERTY_HINT_GLOBAL_DIR}.
 */
declare function export_global_dir(target: any, context: any): void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], or {@link PackedStringArray} property as an absolute path to a file. The path can be picked from the entire filesystem. See  to limit it to the project folder and its subfolders.
 * If `filter` is provided, only matching files will be available for picking.
 * See also {@link PROPERTY_HINT_GLOBAL_FILE}.
 */
declare function export_global_file(filter?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Define a new group for the following exported properties. This helps to organize properties in the Inspector dock. Groups can be added with an optional `prefix`, which would make group to only consider properties that have this prefix. The grouping will break on the first property that doesn't have a prefix. The prefix is also removed from the property's name in the Inspector dock.
 * If no `prefix` is provided, then every following property will be added to the group. The group ends when then next group or category is defined. You can also force end a group by using this annotation with empty strings for parameters, `@export_group("", "")`.
 * Groups cannot be nested, use  to add subgroups within groups.
 * See also {@link PROPERTY_USAGE_GROUP}.
 */
declare function export_group(name: string, prefix?: string): (target: any, context: any) => void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], {@link PackedStringArray}, {@link Dictionary} or {@link Array}[lb]{@link Dictionary}[rb] property with a large {@link TextEdit} widget instead of a {@link LineEdit}. This adds support for multiline content and makes it easier to edit large amount of text stored in the property.
 * See also {@link PROPERTY_HINT_MULTILINE_TEXT}.
 */
declare function export_multiline(hint?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export a {@link NodePath} or {@link Array}[lb]{@link NodePath}[rb] property with a filter for allowed node types.
 * See also {@link PROPERTY_HINT_NODE_PATH_VALID_TYPES}.
 * **Note:** The type must be a native class or a globally registered script (using the `class_name` keyword) that inherits {@link Node}.
 */
declare function export_node_path(type_?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export a {@link String}, {@link Array}[lb]{@link String}[rb], or {@link PackedStringArray} property with a placeholder text displayed in the editor widget when no value is present.
 * See also {@link PROPERTY_HINT_PLACEHOLDER_TEXT}.
 */
declare function export_placeholder(placeholder: string): (target: any, context: any) => void;
/**
 * Export an [int], [float], {@link Array}[lb][int][rb], {@link Array}[lb][float][rb], {@link PackedByteArray}, {@link PackedInt32Array}, {@link PackedInt64Array}, {@link PackedFloat32Array}, or {@link PackedFloat64Array} property as a range value. The range must be defined by `min` and `max`, as well as an optional `step` and a variety of extra hints. The `step` defaults to `1` for integer properties. For floating-point numbers this value depends on your {@link EditorSettings.interface/inspector/default_float_step} setting.
 * If hints `"or_greater"` and `"or_less"` are provided, the editor widget will not cap the value at range boundaries. The `"exp"` hint will make the edited values on range to change exponentially. The `"prefer_slider"` hint will make integer values use the slider instead of arrows for editing, while `"hide_control"` will hide the element controlling the value of the editor widget.
 * Hints also allow to indicate the units for the edited value. Using `"radians_as_degrees"` you can specify that the actual value is in radians, but should be displayed in degrees in the Inspector dock (the range values are also in degrees). `"degrees"` allows to add a degree sign as a unit suffix (the value is unchanged). Finally, a custom suffix can be provided using `"suffix:unit"`, where "unit" can be any string.
 * See also {@link PROPERTY_HINT_RANGE}.
 */
declare function export_range(min: float, max: float, step?: float, extra_hints?: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Export a property with {@link PROPERTY_USAGE_STORAGE} flag. The property is not displayed in the editor, but it is serialized and stored in the scene or resource file. This can be useful for  scripts. Also the property value is copied when {@link Resource.duplicate} or {@link Node.duplicate} is called, unlike non-exported variables.
 */
declare function export_storage(target: any, context: any): void;
/**
 * Define a new subgroup for the following exported properties. This helps to organize properties in the Inspector dock. Subgroups work exactly like groups, except they need a parent group to exist. See .
 * See also {@link PROPERTY_USAGE_SUBGROUP}.
 * **Note:** Subgroups cannot be nested, but you can use the slash separator (`/`) to achieve the desired effect:
 */
declare function export_subgroup(name: string, prefix?: string): (target: any, context: any) => void;
/**
 * Export a {@link Callable} property as a clickable button with the label `text`. When the button is pressed, the callable is called.
 * If `icon` is specified, it is used to fetch an icon for the button via {@link Control.get_theme_icon}, from the `"EditorIcons"` theme type. If `icon` is omitted, the default `"Callable"` icon is used instead.
 * Consider using the {@link EditorUndoRedoManager} to allow the action to be reverted safely.
 * See also {@link PROPERTY_HINT_TOOL_BUTTON}.
 * **Note:** The property is exported without the {@link PROPERTY_USAGE_STORAGE} flag because a {@link Callable} cannot be properly serialized and stored in a file.
 * **Note:** In an exported project neither {@link EditorInterface} nor {@link EditorUndoRedoManager} exist, which may cause some scripts to break. To prevent this, you can use {@link Engine.get_singleton} and omit the static type from the variable declaration:
 * **Note:** Avoid storing lambda callables in member variables of {@link RefCounted}-based classes (e.g. resources), as this can lead to memory leaks. Use only method callables and optionally {@link Callable.bind} or {@link Callable.unbind}.
 */
declare function export_tool_button(text: string, icon?: string): (target: any, context: any) => void;
/**
 * Add a custom icon to the current script. The icon specified at `icon_path` is displayed in the Scene dock for every node of that class, as well as in various editor dialogs.
 * **Note:** Only the script can have a custom icon. Inner classes are not supported.
 * **Note:** As annotations describe their subject, the  annotation must be placed before the class definition and inheritance.
 * **Note:** Unlike most other annotations, the argument of the  annotation must be a string literal (constant expressions are not supported).
 */
declare function icon(icon_path: string): (target: any, context: any) => void;
/**
 * Mark the following property as assigned when the {@link Node} is ready. Values for these properties are not assigned immediately when the node is initialized ({@link Object._init}), and instead are computed and stored right before {@link Node._ready}.
 */
declare function onready(target: any, context: any): void;
/**
 * Mark the following method for remote procedure calls. See High-level multiplayer ($DOCS_URL/tutorials/networking/high_level_multiplayer.html).
 * If `mode` is set as `"any_peer"`, allows any peer to call this RPC function. Otherwise, only the authority peer is allowed to call it and `mode` should be kept as `"authority"`. When configuring functions as RPCs with {@link Node.rpc_config}, each of these modes respectively corresponds to the {@link MultiplayerAPI.RPC_MODE_AUTHORITY} and {@link MultiplayerAPI.RPC_MODE_ANY_PEER} RPC modes. See {@link MultiplayerAPI.RPCMode}. If a peer that is not the authority tries to call a function that is only allowed for the authority, the function will not be executed. If the error can be detected locally (when the RPC configuration is consistent between the local and the remote peer), an error message will be displayed on the sender peer. Otherwise, the remote peer will detect the error and print an error there.
 * If `sync` is set as `"call_remote"`, the function will only be executed on the remote peer, but not locally. To run this function locally too, set `sync` to `"call_local"`. When configuring functions as RPCs with {@link Node.rpc_config}, this is equivalent to setting `call_local` to `true`.
 * The `transfer_mode` accepted values are `"unreliable"`, `"unreliable_ordered"`, or `"reliable"`. It sets the transfer mode of the underlying {@link MultiplayerPeer}. See {@link MultiplayerPeer.transfer_mode}.
 * The `transfer_channel` defines the channel of the underlying {@link MultiplayerPeer}. See {@link MultiplayerPeer.transfer_channel}.
 * The order of `mode`, `sync` and `transfer_mode` does not matter, but values related to the same argument must not be used more than once. `transfer_channel` always has to be the 4th argument (you must specify 3 preceding arguments).
 * **Note:** Methods annotated with  cannot receive objects which define required parameters in {@link Object._init}. See {@link Object._init} for more details.
 */
declare function rpc(mode?: string, sync?: string, transfer_mode?: string, transfer_channel?: int): (target: any, context: any) => void;
/**
 * Make a script with static variables to not persist after all references are lost. If the script is loaded again the static variables will revert to their default values.
 * **Note:** As annotations describe their subject, the  annotation must be placed before the class definition and inheritance.
 * **Warning:** Currently, due to a bug, scripts are never freed, even if  annotation is used.
 */
declare function static_unload(target: any, context: any): void;
/**
 * Mark the current script as a tool script, allowing it to be loaded and executed by the editor. See Running code in the editor ($DOCS_URL/tutorials/plugins/running_code_in_the_editor.html).
 * **Note:** As annotations describe their subject, the  annotation must be placed before the class definition and inheritance.
 */
declare function tool(target: any, context: any): void;
/**
 * Mark the following statement to ignore the specified `warning`. See GDScript warning system ($DOCS_URL/tutorials/scripting/gdscript/warning_system.html).
 * See also  and .
 */
declare function warning_ignore(warning: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Stops ignoring the listed warning types after . Ignoring the specified warning types will be reset to Project Settings. This annotation can be omitted to ignore the warning types until the end of the file.
 * **Note:** Unlike most other annotations, arguments of the  annotation must be string literals (constant expressions are not supported).
 */
declare function warning_ignore_restore(warning: string, ...args: any[]): (target: any, context: any) => void;
/**
 * Starts ignoring the listed warning types until the end of the file or the  annotation with the given warning type.
 * **Note:** To suppress a single warning, use  instead.
 * **Note:** Unlike most other annotations, arguments of the  annotation must be string literals (constant expressions are not supported).
 */
declare function warning_ignore_start(warning: string, ...args: any[]): (target: any, context: any) => void;
