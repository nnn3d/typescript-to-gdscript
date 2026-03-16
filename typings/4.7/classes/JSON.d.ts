// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Helper class for creating and parsing JSON data. */
declare class GodotJSON extends Resource {
  /** Contains the parsed JSON data in {@link Variant} form. */
  data: unknown;

  /**
   * Converts a native engine type to a JSON-compliant value.
   * By default, objects are ignored for security reasons, unless `full_objects` is `true`.
   * You can convert a native value to a JSON string like this:
   */
  static from_native(variant: unknown, full_objects?: boolean): unknown;
  /**
   * Returns `0` if the last call to {@link parse} was successful, or the line number where the parse failed.
   */
  get_error_line(): int;
  /**
   * Returns an empty string if the last call to {@link parse} was successful, or the error message if it failed.
   */
  get_error_message(): string;
  /** Return the text parsed by {@link parse} (requires passing `keep_text` to {@link parse}). */
  get_parsed_text(): string;
  /**
   * Attempts to parse the `json_text` provided.
   * Returns an {@link Error}. If the parse was successful, it returns {@link OK} and the result can be retrieved using {@link data}. If unsuccessful, use {@link get_error_line} and {@link get_error_message} to identify the source of the failure.
   * Non-static variant of {@link parse_string}, if you want custom error handling.
   * The optional `keep_text` argument instructs the parser to keep a copy of the original text. This text can be obtained later by using the {@link get_parsed_text} function and is used when saving the resource (instead of generating new text from {@link data}).
   */
  parse(json_text: string, keep_text?: boolean): int;
  /**
   * Attempts to parse the `json_string` provided and returns the parsed data. Returns `null` if parse failed.
   */
  static parse_string(json_string: string): unknown;
  /**
   * Converts a {@link Variant} var to JSON text and returns the result. Useful for serializing data to store or send over the network.
   * **Note:** The JSON specification does not define integer or float types, but only a *number* type. Therefore, converting a Variant to JSON text will convert all numerical values to [float] types.
   * **Note:** If `full_precision` is `true`, when stringifying floats, the unreliable digits are stringified in addition to the reliable digits to guarantee exact decoding.
   * The `indent` parameter controls if and how something is indented; its contents will be used where there should be an indent in the output. Even spaces like `"   "` will work. `\t` and `\n` can also be used for a tab indent, or to make a newline for each indent respectively.
   * **Warning:** Non-finite numbers are not supported in JSON. Any occurrences of {@link @GDScript.INF} will be replaced with `1e99999`, and negative {@link @GDScript.INF} will be replaced with `-1e99999`, but they will be interpreted correctly as infinity by most JSON parsers. {@link @GDScript.NAN} will be replaced with `null`, and it will not be interpreted as NaN in JSON parsers. If you expect non-finite numbers, consider passing your data through {@link from_native} first.
   * **Example output:**
   */
  static stringify(data: unknown, indent?: string, sort_keys?: boolean, full_precision?: boolean): string;
  /**
   * Converts a JSON-compliant value that was created with {@link from_native} back to native engine types.
   * By default, objects are ignored for security reasons, unless `allow_objects` is `true`.
   * You can convert a JSON string back to a native value like this:
   */
  static to_native(json: unknown, allow_objects?: boolean): unknown;
}
