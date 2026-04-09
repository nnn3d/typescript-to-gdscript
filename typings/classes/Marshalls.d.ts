// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Data transformation (marshaling) and encoding helpers. */
declare interface Marshalls extends GodotObject {
  /** Returns a decoded {@link PackedByteArray} corresponding to the Base64-encoded string `base64_str`. */
  base64_to_raw(base64_str: string | NodePath): PackedByteArray;
  /** Returns a decoded string corresponding to the Base64-encoded string `base64_str`. */
  base64_to_utf8(base64_str: string | NodePath): string;
  /**
   * Returns a decoded {@link Variant} corresponding to the Base64-encoded string `base64_str`. If `allow_objects` is `true`, decoding objects is allowed.
   * Internally, this uses the same decoding mechanism as the {@link @GlobalScope.bytes_to_var} method.
   * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
   */
  base64_to_variant(base64_str: string | NodePath, allow_objects?: boolean): unknown;
  /** Returns a Base64-encoded string of a given {@link PackedByteArray}. */
  raw_to_base64(array: PackedByteArray | Array<unknown>): string;
  /** Returns a Base64-encoded string of the UTF-8 string `utf8_str`. */
  utf8_to_base64(utf8_str: string | NodePath): string;
  /**
   * Returns a Base64-encoded string of the {@link Variant} `variant`. If `full_objects` is `true`, encoding objects is allowed (and can potentially include code).
   * Internally, this uses the same encoding mechanism as the {@link @GlobalScope.var_to_bytes} method.
   */
  variant_to_base64(variant: unknown, full_objects?: boolean): string;
}
declare const Marshalls: Marshalls;

