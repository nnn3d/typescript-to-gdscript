// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A packed array of bytes. */
declare interface PackedByteArray {
  /** Appends an element at the end of the array (alias of {@link push_back}). */
  append(value: int): boolean;
  /** Appends a {@link PackedByteArray} at the end of this array. */
  append_array(array: PackedByteArray | Array<unknown>): void;
  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a `before` specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   * **Note:** Calling {@link bsearch} on an unsorted array results in unexpected behavior.
   */
  bsearch(value: int, before?: boolean): int;
  /**
   * Swaps the byte order of `count` 16-bit segments of the array starting at `offset`. Swap is done in-place. If `count` is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 2, the byte after the last processed 16-bit segment is not modified.
   */
  bswap16(offset?: int, count?: int): void;
  /**
   * Swaps the byte order of `count` 32-bit segments of the array starting at `offset`. Swap is done in-place. If `count` is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 4, bytes after the last processed 32-bit segment are not modified.
   */
  bswap32(offset?: int, count?: int): void;
  /**
   * Swaps the byte order of `count` 64-bit segments of the array starting at `offset`. Swap is done in-place. If `count` is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 8, bytes after the last processed 64-bit segment are not modified.
   */
  bswap64(offset?: int, count?: int): void;
  /** Clears the array. This is equivalent to using {@link resize} with a size of `0`. */
  clear(): void;
  /**
   * Returns a new {@link PackedByteArray} with the data compressed. Set the compression mode using one of {@link FileAccess.CompressionMode}'s constants.
   */
  compress(compression_mode?: int): PackedByteArray;
  /** Returns the number of times an element is in the array. */
  count(value: int): int;
  /**
   * Decodes a 64-bit floating-point number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0.0` if a valid number can't be decoded.
   */
  decode_double(byte_offset: int): float;
  /**
   * Decodes a 32-bit floating-point number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0.0` if a valid number can't be decoded.
   */
  decode_float(byte_offset: int): float;
  /**
   * Decodes a 16-bit floating-point number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0.0` if a valid number can't be decoded.
   */
  decode_half(byte_offset: int): float;
  /**
   * Decodes a 8-bit signed integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_s8(byte_offset: int): int;
  /**
   * Decodes a 16-bit signed integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_s16(byte_offset: int): int;
  /**
   * Decodes a 32-bit signed integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_s32(byte_offset: int): int;
  /**
   * Decodes a 64-bit signed integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_s64(byte_offset: int): int;
  /**
   * Decodes a 8-bit unsigned integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_u8(byte_offset: int): int;
  /**
   * Decodes a 16-bit unsigned integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_u16(byte_offset: int): int;
  /**
   * Decodes a 32-bit unsigned integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_u32(byte_offset: int): int;
  /**
   * Decodes a 64-bit unsigned integer number from the bytes starting at `byte_offset`. Fails if the byte count is insufficient. Returns `0` if a valid number can't be decoded.
   */
  decode_u64(byte_offset: int): int;
  /**
   * Decodes a {@link Variant} from the bytes starting at `byte_offset`. Returns `null` if a valid variant can't be decoded or the value is {@link Object}-derived and `allow_objects` is `false`.
   */
  decode_var(byte_offset: int, allow_objects?: boolean): unknown;
  /**
   * Decodes a size of a {@link Variant} from the bytes starting at `byte_offset`. Requires at least 4 bytes of data starting at the offset, otherwise fails.
   */
  decode_var_size(byte_offset: int, allow_objects?: boolean): int;
  /**
   * Returns a new {@link PackedByteArray} with the data decompressed. Set `buffer_size` to the size of the uncompressed data. Set the compression mode using one of {@link FileAccess.CompressionMode}'s constants.
   * **Note:** Decompression is not guaranteed to work with data not compressed by Godot, for example if data compressed with the deflate compression mode lacks a checksum or header.
   */
  decompress(buffer_size: int, compression_mode?: int): PackedByteArray;
  /**
   * Returns a new {@link PackedByteArray} with the data decompressed. Set the compression mode using one of {@link FileAccess.CompressionMode}'s constants. **This method only accepts brotli, gzip, and deflate compression modes.**
   * This method is potentially slower than {@link decompress}, as it may have to re-allocate its output buffer multiple times while decompressing, whereas {@link decompress} knows it's output buffer size from the beginning.
   * GZIP has a maximal compression ratio of 1032:1, meaning it's very possible for a small compressed payload to decompress to a potentially very large output. To guard against this, you may provide a maximum size this function is allowed to allocate in bytes via `max_output_size`. Passing -1 will allow for unbounded output. If any positive value is passed, and the decompression exceeds that amount in bytes, then an error will be returned.
   * **Note:** Decompression is not guaranteed to work with data not compressed by Godot, for example if data compressed with the deflate compression mode lacks a checksum or header.
   */
  decompress_dynamic(max_output_size: int, compression_mode?: int): PackedByteArray;
  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedByteArray;
  /**
   * Encodes a 64-bit floating-point number as bytes at the index of `byte_offset` bytes. The array must have at least 8 bytes of allocated space, starting at the offset.
   */
  encode_double(byte_offset: int, value: float): void;
  /**
   * Encodes a 32-bit floating-point number as bytes at the index of `byte_offset` bytes. The array must have at least 4 bytes of space, starting at the offset.
   */
  encode_float(byte_offset: int, value: float): void;
  /**
   * Encodes a 16-bit floating-point number as bytes at the index of `byte_offset` bytes. The array must have at least 2 bytes of space, starting at the offset.
   */
  encode_half(byte_offset: int, value: float): void;
  /**
   * Encodes a 8-bit signed integer number (signed byte) at the index of `byte_offset` bytes. The array must have at least 1 byte of space, starting at the offset.
   */
  encode_s8(byte_offset: int, value: int): void;
  /**
   * Encodes a 16-bit signed integer number as bytes at the index of `byte_offset` bytes. The array must have at least 2 bytes of space, starting at the offset.
   */
  encode_s16(byte_offset: int, value: int): void;
  /**
   * Encodes a 32-bit signed integer number as bytes at the index of `byte_offset` bytes. The array must have at least 4 bytes of space, starting at the offset.
   */
  encode_s32(byte_offset: int, value: int): void;
  /**
   * Encodes a 64-bit signed integer number as bytes at the index of `byte_offset` bytes. The array must have at least 8 bytes of space, starting at the offset.
   */
  encode_s64(byte_offset: int, value: int): void;
  /**
   * Encodes a 8-bit unsigned integer number (byte) at the index of `byte_offset` bytes. The array must have at least 1 byte of space, starting at the offset.
   */
  encode_u8(byte_offset: int, value: int): void;
  /**
   * Encodes a 16-bit unsigned integer number as bytes at the index of `byte_offset` bytes. The array must have at least 2 bytes of space, starting at the offset.
   */
  encode_u16(byte_offset: int, value: int): void;
  /**
   * Encodes a 32-bit unsigned integer number as bytes at the index of `byte_offset` bytes. The array must have at least 4 bytes of space, starting at the offset.
   */
  encode_u32(byte_offset: int, value: int): void;
  /**
   * Encodes a 64-bit unsigned integer number as bytes at the index of `byte_offset` bytes. The array must have at least 8 bytes of space, starting at the offset.
   */
  encode_u64(byte_offset: int, value: int): void;
  /**
   * Encodes a {@link Variant} at the index of `byte_offset` bytes. A sufficient space must be allocated, depending on the encoded variant's size. If `allow_objects` is `false`, {@link Object}-derived values are not permitted and will instead be serialized as ID-only.
   */
  encode_var(byte_offset: int, value: unknown, allow_objects?: boolean): int;
  /**
   * Removes the first occurrence of a value from the array and returns `true`. If the value does not exist in the array, nothing happens and `false` is returned. To remove an element by index, use {@link remove_at} instead.
   */
  erase(value: int): boolean;
  /**
   * Assigns the given value to all elements in the array. This can typically be used together with {@link resize} to create an array with a given size and initialized elements.
   */
  fill(value: int): void;
  /**
   * Searches the array for a value and returns its index or `-1` if not found. Optionally, the initial search index can be passed.
   */
  find(value: int, from_?: int): int;
  /**
   * Returns the byte at the given `index` in the array. If `index` is out-of-bounds or negative, this method fails and returns `0`.
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   */
  get(index: int): int;
  /**
   * Converts ASCII/Latin-1 encoded array to {@link String}. Fast alternative to {@link get_string_from_utf8} if the content is ASCII/Latin-1 only. Unlike the UTF-8 function this function maps every byte to a character in the array. Multibyte sequences will not be interpreted correctly. For parsing user input always use {@link get_string_from_utf8}. This is the inverse of {@link String.to_ascii_buffer}.
   */
  get_string_from_ascii(): string;
  /**
   * Converts system multibyte code page encoded array to {@link String}. If conversion fails, empty string is returned. This is the inverse of {@link String.to_multibyte_char_buffer}.
   * The values permitted for `encoding` are system dependent. If `encoding` is empty string, system default encoding is used.
   * - For Windows, see Code Page Identifiers (https://learn.microsoft.com/en-us/windows/win32/Intl/code-page-identifiers) .NET names.
   * - For macOS and Linux/BSD, see `libiconv` library documentation and `iconv --list` for a list of supported encodings.
   */
  get_string_from_multibyte_char(encoding?: string | NodePath): string;
  /**
   * Converts UTF-8 encoded array to {@link String}. Slower than {@link get_string_from_ascii} but supports UTF-8 encoded data. Use this function if you are unsure about the source of the data. For user input this function should always be preferred. Returns empty string if source array is not valid UTF-8 string. This is the inverse of {@link String.to_utf8_buffer}.
   */
  get_string_from_utf8(): string;
  /**
   * Converts UTF-16 encoded array to {@link String}. If the BOM is missing, little-endianness is assumed. Returns empty string if source array is not valid UTF-16 string. This is the inverse of {@link String.to_utf16_buffer}.
   */
  get_string_from_utf16(): string;
  /**
   * Converts UTF-32 encoded array to {@link String}. Returns empty string if source array is not valid UTF-32 string. This is the inverse of {@link String.to_utf32_buffer}.
   */
  get_string_from_utf32(): string;
  /**
   * Converts wide character (`wchar_t`, UTF-16 on Windows, UTF-32 on other platforms) encoded array to {@link String}. Returns empty string if source array is not valid wide string. This is the inverse of {@link String.to_wchar_buffer}.
   */
  get_string_from_wchar(): string;
  /** Returns `true` if the array contains `value`. */
  has(value: int): boolean;
  /**
   * Returns `true` if a valid {@link Variant} value can be decoded at the `byte_offset`. Returns `false` otherwise or when the value is {@link Object}-derived and `allow_objects` is `false`.
   */
  has_encoded_var(byte_offset: int, allow_objects?: boolean): boolean;
  /** Returns a hexadecimal representation of this array as a {@link String}. */
  hex_encode(): string;
  /**
   * Inserts a new element at a given position in the array. The position must be valid, or at the end of the array (`idx == size()`).
   */
  insert(at_index: int, value: int): int;
  /** Returns `true` if the array is empty. */
  is_empty(): boolean;
  /** Appends an element at the end of the array. */
  push_back(value: int): boolean;
  /** Removes an element from the array by index. */
  remove_at(index: int): void;
  /**
   * Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. Calling {@link resize} once and assigning the new values is faster than adding new elements one by one.
   * Returns {@link OK} on success, or one of the following {@link Error} constants if this method fails: {@link ERR_INVALID_PARAMETER} if the size is negative, or {@link ERR_OUT_OF_MEMORY} if allocations fail. Use {@link size} to find the actual size of the array after resize.
   */
  resize(new_size: int): int;
  /** Reverses the order of the elements in the array. */
  reverse(): void;
  /**
   * Searches the array in reverse order. Optionally, a start search index can be passed. If negative, the start index is considered relative to the end of the array.
   */
  rfind(value: int, from_?: int): int;
  /** Changes the byte at the given index. */
  set(index: int, value: int): void;
  /** Returns the number of elements in the array. */
  size(): int;
  /**
   * Returns the slice of the {@link PackedByteArray}, from `begin` (inclusive) to `end` (exclusive), as a new {@link PackedByteArray}.
   * The absolute value of `begin` and `end` will be clamped to the array size, so the default value for `end` makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   * If either `begin` or `end` are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   */
  slice(begin: int, end?: int): PackedByteArray;
  /** Sorts the elements of the array in ascending order. */
  sort(): void;
  /**
   * Returns a copy of the data converted to a {@link PackedColorArray}, where each block of 16 bytes has been converted to a {@link Color} variant.
   * **Note:** The size of the input array must be a multiple of 16 (size of four 32-bit float variables). The size of the new array will be `byte_array.size() / 16`. If the original data can't be converted to {@link Color} variants, the resulting data is undefined.
   */
  to_color_array(): PackedColorArray;
  /**
   * Returns a copy of the data converted to a {@link PackedFloat32Array}, where each block of 4 bytes has been converted to a 32-bit float (C++ [code skip-lint]float[/code]).
   * The size of the input array must be a multiple of 4 (size of 32-bit float). The size of the new array will be `byte_array.size() / 4`.
   * If the original data can't be converted to 32-bit floats, the resulting data is undefined.
   */
  to_float32_array(): PackedFloat32Array;
  /**
   * Returns a copy of the data converted to a {@link PackedFloat64Array}, where each block of 8 bytes has been converted to a 64-bit float (C++ `double`, Godot [float]).
   * The size of the input array must be a multiple of 8 (size of 64-bit double). The size of the new array will be `byte_array.size() / 8`.
   * If the original data can't be converted to 64-bit floats, the resulting data is undefined.
   */
  to_float64_array(): PackedFloat64Array;
  /**
   * Returns a copy of the data converted to a {@link PackedInt32Array}, where each block of 4 bytes has been converted to a signed 32-bit integer (C++ `int32_t`).
   * The size of the input array must be a multiple of 4 (size of 32-bit integer). The size of the new array will be `byte_array.size() / 4`.
   * If the original data can't be converted to signed 32-bit integers, the resulting data is undefined.
   */
  to_int32_array(): PackedInt32Array;
  /**
   * Returns a copy of the data converted to a {@link PackedInt64Array}, where each block of 8 bytes has been converted to a signed 64-bit integer (C++ `int64_t`, Godot [int]).
   * The size of the input array must be a multiple of 8 (size of 64-bit integer). The size of the new array will be `byte_array.size() / 8`.
   * If the original data can't be converted to signed 64-bit integers, the resulting data is undefined.
   */
  to_int64_array(): PackedInt64Array;
  /**
   * Returns a copy of the data converted to a {@link PackedVector2Array}, where each block of 8 bytes or 16 bytes (32-bit or 64-bit) has been converted to a {@link Vector2} variant.
   * **Note:** The size of the input array must be a multiple of 8 or 16 (depending on the build settings, see {@link Vector2} for more details). The size of the new array will be `byte_array.size() / (8 or 16)`. If the original data can't be converted to {@link Vector2} variants, the resulting data is undefined.
   */
  to_vector2_array(): PackedVector2Array;
  /**
   * Returns a copy of the data converted to a {@link PackedVector3Array}, where each block of 12 or 24 bytes (32-bit or 64-bit) has been converted to a {@link Vector3} variant.
   * **Note:** The size of the input array must be a multiple of 12 or 24 (depending on the build settings, see {@link Vector3} for more details). The size of the new array will be `byte_array.size() / (12 or 24)`. If the original data can't be converted to {@link Vector3} variants, the resulting data is undefined.
   */
  to_vector3_array(): PackedVector3Array;
  /**
   * Returns a copy of the data converted to a {@link PackedVector4Array}, where each block of 16 or 32 bytes (32-bit or 64-bit) has been converted to a {@link Vector4} variant.
   * **Note:** The size of the input array must be a multiple of 16 or 32 (depending on the build settings, see {@link Vector4} for more details). The size of the new array will be `byte_array.size() / (16 or 32)`. If the original data can't be converted to {@link Vector4} variants, the resulting data is undefined.
   */
  to_vector4_array(): PackedVector4Array;

  // Operator overloads
  [__ops_ne]: { right: PackedByteArray; ret: boolean };
  [__ops_add]: { right: PackedByteArray; ret: PackedByteArray };
  [__ops_eq]: { right: PackedByteArray; ret: boolean };

  [__variant_converts]: PackedByteArray | Array<unknown>;

  [Symbol.iterator](): IterableIterator<int>;

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  duplicate_deep: never;
  find_key: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has_all: never;
  hash: never;
  is_read_only: never;
  is_same_typed: never;
  is_same_typed_key: never;
  is_same_typed_value: never;
  is_typed: never;
  is_typed_key: never;
  is_typed_value: never;
  keys: never;
  make_read_only: never;
  merge: never;
  merged: never;
  recursive_equal: never;
  values: never;
}

declare interface PackedByteArrayConstructor {
  readonly prototype: PackedByteArray;
  /** Constructs an empty {@link PackedByteArray}. */
  (): PackedByteArray;
  /** Constructs a {@link PackedByteArray} as a copy of the given {@link PackedByteArray}. */
  (from_: PackedByteArray): PackedByteArray;
  /**
   * Constructs a new {@link PackedByteArray}. Optionally, you can pass in a generic {@link Array} that will be converted.
   */
  (from_: Array<unknown>): PackedByteArray;
}
declare const PackedByteArray: PackedByteArrayConstructor;
