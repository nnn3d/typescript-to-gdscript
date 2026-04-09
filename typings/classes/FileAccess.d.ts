// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides methods for file reading and writing operations. */
declare class FileAccess extends RefCounted {
  /**
   * If `true`, the file is read with big-endian endianness (https://en.wikipedia.org/wiki/Endianness). If `false`, the file is read with little-endian endianness. If in doubt, leave this to `false` as most files are written with little-endian endianness.
   * **Note:** This is always reset to system endianness, which is little-endian on all supported platforms, whenever you open the file. Therefore, you must set {@link big_endian} *after* opening the file, not before.
   */
  big_endian: boolean;
  set_big_endian(value: boolean): void;
  is_big_endian(): boolean;

  /**
   * Closes the currently opened file and prevents subsequent read/write operations. Use {@link flush} to persist the data to disk without closing the file.
   * **Note:** {@link FileAccess} will automatically close when it's freed, which happens when it goes out of scope or when it gets assigned with `null`. In C# the reference must be disposed after we are done using it, this can be done with the `using` statement or calling the `Dispose` method directly.
   */
  close(): void;
  /**
   * Creates a temporary file. This file will be freed when the returned {@link FileAccess} is freed.
   * If `prefix` is not empty, it will be prefixed to the file name, separated by a `-`.
   * If `extension` is not empty, it will be appended to the temporary file name.
   * If `keep` is `true`, the file is not deleted when the returned {@link FileAccess} is freed.
   * Returns `null` if opening the file failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static create_temp(mode_flags: int, prefix?: string, extension?: string, keep?: boolean): FileAccess | null;
  /**
   * Returns `true` if the file cursor has already read past the end of the file.
   * **Note:** `eof_reached() == false` cannot be used to check whether there is more data available. To loop while there is more data available, use:
   */
  eof_reached(): boolean;
  /**
   * Returns `true` if the file exists in the given path.
   * **Note:** Many resources types are imported (e.g. textures or sound files), and their source asset will not be included in the exported game, as only the imported version is used. See {@link ResourceLoader.exists} for an alternative approach that takes resource remapping into account.
   * For a non-static, relative equivalent, use {@link DirAccess.file_exists}.
   */
  static file_exists(path: string): boolean;
  /**
   * Writes the file's buffer to disk. Flushing is automatically performed when the file is closed. This means you don't need to call {@link flush} manually before closing a file. Still, calling {@link flush} can be used to ensure the data is safe even if the project crashes instead of being closed gracefully.
   * **Note:** Only call {@link flush} when you actually need it. Otherwise, it will decrease performance due to constant disk writes.
   */
  flush(): void;
  /**
   * Returns the next 8 bits from the file as an integer. This advances the file cursor by 1 byte. See {@link store_8} for details on what values can be stored and retrieved this way.
   */
  get_8(): int;
  /**
   * Returns the next 16 bits from the file as an integer. This advances the file cursor by 2 bytes. See {@link store_16} for details on what values can be stored and retrieved this way.
   */
  get_16(): int;
  /**
   * Returns the next 32 bits from the file as an integer. This advances the file cursor by 4 bytes. See {@link store_32} for details on what values can be stored and retrieved this way.
   */
  get_32(): int;
  /**
   * Returns the next 64 bits from the file as an integer. This advances the file cursor by 8 bytes. See {@link store_64} for details on what values can be stored and retrieved this way.
   */
  get_64(): int;
  /**
   * Returns the last time the `file` was accessed in Unix timestamp format, or `0` on error. This Unix timestamp can be converted to another format using the {@link Time} singleton.
   */
  static get_access_time(file: string): int;
  /**
   * Returns the whole file as a {@link String}. Text is interpreted as being UTF-8 encoded. This ignores the file cursor and does not affect it.
   */
  get_as_text(): string;
  /**
   * Returns next `length` bytes of the file as a {@link PackedByteArray}. This advances the file cursor by `length` bytes.
   */
  get_buffer(length: int): PackedByteArray;
  /**
   * Returns the next value of the file in CSV (Comma-Separated Values) format. You can pass a different delimiter `delim` to use other than the default `","` (comma). This delimiter must be one-character long, and cannot be a double quotation mark.
   * Text is interpreted as being UTF-8 encoded. Text values must be enclosed in double quotes if they include the delimiter character. Double quotes within a text value can be escaped by doubling their occurrence. This advances the file cursor to after the newline character at the end of the line.
   * For example, the following CSV lines are valid and will be properly parsed as two strings each:
   * [codeblock lang=text]
   * Alice,"Hello, Bob!"
   * Bob,Alice! What a surprise!
   * Alice,"I thought you'd reply with ""Hello, world""."
   * [/codeblock]
   * Note how the second line can omit the enclosing quotes as it does not include the delimiter. However it *could* very well use quotes, it was only written without for demonstration purposes. The third line must use `""` for each quotation mark that needs to be interpreted as such instead of the end of a text value.
   */
  get_csv_line(delim?: string): PackedStringArray;
  /**
   * Returns the next 64 bits from the file as a floating-point number. This advances the file cursor by 8 bytes.
   */
  get_double(): float;
  /**
   * Returns the last error that happened when trying to perform operations. Compare with the `ERR_FILE_*` constants from {@link Error}.
   */
  get_error(): int;
  /**
   * Reads the file extended attribute with name `attribute_name` as a byte array.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static get_extended_attribute(file: string, attribute_name: string): PackedByteArray;
  /**
   * Reads the file extended attribute with name `attribute_name` as a UTF-8 encoded string.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static get_extended_attribute_string(file: string, attribute_name: string): string;
  /**
   * Returns a list of file extended attributes.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static get_extended_attributes_list(file: string): PackedStringArray;
  /**
   * Returns the whole `path` file contents as a {@link PackedByteArray} without any decoding.
   * Returns an empty {@link PackedByteArray} if an error occurred while opening the file. You can use {@link get_open_error} to check the error that occurred.
   */
  static get_file_as_bytes(path: string): PackedByteArray;
  /**
   * Returns the whole `path` file contents as a {@link String}. Text is interpreted as being UTF-8 encoded.
   * Returns an empty {@link String} if an error occurred while opening the file. You can use {@link get_open_error} to check the error that occurred.
   */
  static get_file_as_string(path: string): string;
  /**
   * Returns the next 32 bits from the file as a floating-point number. This advances the file cursor by 4 bytes.
   */
  get_float(): float;
  /**
   * Returns the next 16 bits from the file as a half-precision floating-point number. This advances the file cursor by 2 bytes.
   */
  get_half(): float;
  /**
   * Returns `true` if the **hidden** attribute is set on the file at the given path.
   * **Note:** This method is implemented on iOS, BSD, macOS, and Windows.
   */
  static get_hidden_attribute(file: string): boolean;
  /**
   * Returns the size of the file in bytes. For a pipe, returns the number of bytes available for reading from the pipe.
   */
  get_length(): int;
  /**
   * Returns the next line of the file as a {@link String}. The returned string doesn't include newline (`\n`) or carriage return (`\r`) characters, but does include any other leading or trailing whitespace. This advances the file cursor to after the newline character at the end of the line.
   * Text is interpreted as being UTF-8 encoded.
   */
  get_line(): string;
  /**
   * Returns an MD5 String representing the file at the given path or an empty {@link String} on failure.
   */
  static get_md5(path: string): string;
  /**
   * Returns the last time the `file` was modified in Unix timestamp format, or `0` on error. This Unix timestamp can be converted to another format using the {@link Time} singleton.
   */
  static get_modified_time(file: string): int;
  /** Returns the result of the last {@link open} call in the current thread. */
  static get_open_error(): int;
  /**
   * Returns a {@link String} saved in Pascal format from the file, meaning that the length of the string is explicitly stored at the start. See {@link store_pascal_string}. This may include newline characters. The file cursor is advanced after the bytes read.
   * Text is interpreted as being UTF-8 encoded.
   */
  get_pascal_string(): string;
  /** Returns the path as a {@link String} for the current open file. */
  get_path(): string;
  /** Returns the absolute path as a {@link String} for the current open file. */
  get_path_absolute(): string;
  /**
   * Returns the file cursor's position in bytes from the beginning of the file. This is the file reading/writing cursor set by {@link seek} or {@link seek_end} and advanced by read/write operations.
   */
  get_position(): int;
  /**
   * Returns `true` if the **read only** attribute is set on the file at the given path.
   * **Note:** This method is implemented on iOS, BSD, macOS, and Windows.
   */
  static get_read_only_attribute(file: string): boolean;
  /**
   * Returns the next bits from the file as a floating-point number. This advances the file cursor by either 4 or 8 bytes, depending on the precision used by the Godot build that saved the file.
   * If the file was saved by a Godot build compiled with the `precision=single` option (the default), the number of read bits for that file is 32. Otherwise, if compiled with the `precision=double` option, the number of read bits is 64.
   */
  get_real(): float;
  /**
   * Returns an SHA-256 {@link String} representing the file at the given path or an empty {@link String} on failure.
   */
  static get_sha256(path: string): string;
  /** Returns the size of the file at the given path, in bytes, or `-1` on error. */
  static get_size(file: string): int;
  /**
   * Returns the UNIX permissions of the file at the given path.
   * **Note:** This method is implemented on iOS, Linux/BSD, and macOS.
   */
  static get_unix_permissions(file: string): int;
  /**
   * Returns the next {@link Variant} value from the file. If `allow_objects` is `true`, decoding objects is allowed. This advances the file cursor by the number of bytes read.
   * Internally, this uses the same decoding mechanism as the {@link @GlobalScope.bytes_to_var} method, as described in the Binary serialization API ($DOCS_URL/tutorials/io/binary_serialization_api.html) documentation.
   * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
   */
  get_var(allow_objects?: boolean): unknown;
  /** Returns `true` if the file is currently opened. */
  is_open(): boolean;
  /**
   * Creates a new {@link FileAccess} object and opens the file for writing or reading, depending on the flags.
   * Returns `null` if opening the file failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static open(path: string, flags: int): FileAccess | null;
  /**
   * Creates a new {@link FileAccess} object and opens a compressed file for reading or writing.
   * **Note:** {@link open_compressed} can only read files that were saved by Godot, not third-party compression formats. See GitHub issue #28999 (https://github.com/godotengine/godot/issues/28999) for a workaround.
   * Returns `null` if opening the file failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static open_compressed(path: string, mode_flags: int, compression_mode: int): FileAccess | null;
  /**
   * Creates a new {@link FileAccess} object and opens an encrypted file in write or read mode. You need to pass a binary key to encrypt/decrypt it.
   * **Note:** The provided key must be 32 bytes long.
   * Returns `null` if opening the file failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static open_encrypted(path: string, mode_flags: int, key: PackedByteArray | Array<unknown>, iv?: PackedByteArray | Array<unknown>): FileAccess | null;
  /**
   * Creates a new {@link FileAccess} object and opens an encrypted file in write or read mode. You need to pass a password to encrypt/decrypt it.
   * Returns `null` if opening the file failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static open_encrypted_with_pass(path: string, mode_flags: int, pass: string): FileAccess | null;
  /**
   * Removes file extended attribute with name `attribute_name`.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static remove_extended_attribute(file: string, attribute_name: string): int;
  /**
   * Resizes the file to a specified length. The file must be open in a mode that permits writing. If the file is extended, NUL characters are appended. If the file is truncated, all data from the end file to the original length of the file is lost.
   */
  resize(length: int): int;
  /**
   * Sets the file cursor to the specified position in bytes, from the beginning of the file. This changes the value returned by {@link get_position}.
   */
  seek(position: int): void;
  /**
   * Sets the file cursor to the specified position in bytes, from the end of the file. This changes the value returned by {@link get_position}.
   * **Note:** This is an offset, so you should use negative numbers otherwise the file cursor will move past the end of the file.
   */
  seek_end(position?: int): void;
  /**
   * Writes file extended attribute with name `attribute_name` as a byte array.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static set_extended_attribute(file: string, attribute_name: string, data: PackedByteArray | Array<unknown>): int;
  /**
   * Writes file extended attribute with name `attribute_name` as a UTF-8 encoded string.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Extended attributes support depends on the file system. Attributes will be lost when the file is moved between incompatible file systems.
   * **Note:** On Linux, only "user" namespace attributes are accessible, namespace prefix should not be included.
   * **Note:** On Windows, alternate data streams are used to store extended attributes.
   */
  static set_extended_attribute_string(file: string, attribute_name: string, data: string): int;
  /**
   * Sets file **hidden** attribute.
   * **Note:** This method is implemented on iOS, BSD, macOS, and Windows.
   */
  static set_hidden_attribute(file: string, hidden: boolean): int;
  /**
   * Sets file **read only** attribute.
   * **Note:** This method is implemented on iOS, BSD, macOS, and Windows.
   */
  static set_read_only_attribute(file: string, ro: boolean): int;
  /**
   * Sets file UNIX permissions.
   * **Note:** This method is implemented on iOS, Linux/BSD, and macOS.
   */
  static set_unix_permissions(file: string, permissions: int): int;
  /**
   * Stores an integer as 8 bits in the file. This advances the file cursor by 1 byte. Returns `true` if the operation is successful.
   * **Note:** The `value` should lie in the interval `[0, 255]`. Any other value will overflow and wrap around.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   * To store a signed integer, use {@link store_64}, or convert it manually (see {@link store_16} for an example).
   */
  store_8(value: int): boolean;
  /**
   * Stores an integer as 16 bits in the file. This advances the file cursor by 2 bytes. Returns `true` if the operation is successful.
   * **Note:** The `value` should lie in the interval `[0, 2^16 - 1]`. Any other value will overflow and wrap around.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   * To store a signed integer, use {@link store_64} or store a signed integer from the interval `[-2^15, 2^15 - 1]` (i.e. keeping one bit for the signedness) and compute its sign manually when reading. For example:
   */
  store_16(value: int): boolean;
  /**
   * Stores an integer as 32 bits in the file. This advances the file cursor by 4 bytes. Returns `true` if the operation is successful.
   * **Note:** The `value` should lie in the interval `[0, 2^32 - 1]`. Any other value will overflow and wrap around.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   * To store a signed integer, use {@link store_64}, or convert it manually (see {@link store_16} for an example).
   */
  store_32(value: int): boolean;
  /**
   * Stores an integer as 64 bits in the file. This advances the file cursor by 8 bytes. Returns `true` if the operation is successful.
   * **Note:** The `value` must lie in the interval `[-2^63, 2^63 - 1]` (i.e. be a valid [int] value).
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_64(value: int): boolean;
  /**
   * Stores the given array of bytes in the file. This advances the file cursor by the number of bytes written. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_buffer(buffer: PackedByteArray | Array<unknown>): boolean;
  /**
   * Stores the given {@link PackedStringArray} in the file as a line formatted in the CSV (Comma-Separated Values) format. You can pass a different delimiter `delim` to use other than the default `","` (comma). This delimiter must be one-character long.
   * Text will be encoded as UTF-8. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_csv_line(values: PackedStringArray | Array<unknown>, delim?: string): boolean;
  /**
   * Stores a floating-point number as 64 bits in the file. This advances the file cursor by 8 bytes. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_double(value: float): boolean;
  /**
   * Stores a floating-point number as 32 bits in the file. This advances the file cursor by 4 bytes. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_float(value: float): boolean;
  /**
   * Stores a half-precision floating-point number as 16 bits in the file. This advances the file cursor by 2 bytes. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_half(value: float): boolean;
  /**
   * Stores `line` in the file followed by a newline character (`\n`), encoding the text as UTF-8. This advances the file cursor by the length of the line, after the newline character. The amount of bytes written depends on the UTF-8 encoded bytes, which may be different from {@link String.length} which counts the number of UTF-32 codepoints. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_line(line: string): boolean;
  /**
   * Stores the given {@link String} as a line in the file in Pascal format (i.e. also store the length of the string). Text will be encoded as UTF-8. This advances the file cursor by the number of bytes written depending on the UTF-8 encoded bytes, which may be different from {@link String.length} which counts the number of UTF-32 codepoints. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_pascal_string(string: string): boolean;
  /**
   * Stores a floating-point number in the file. This advances the file cursor by either 4 or 8 bytes, depending on the precision used by the current Godot build.
   * If using a Godot build compiled with the `precision=single` option (the default), this method will save a 32-bit float. Otherwise, if compiled with the `precision=double` option, this will save a 64-bit float. Returns `true` if the operation is successful.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_real(value: float): boolean;
  /**
   * Stores `string` in the file without a newline character (`\n`), encoding the text as UTF-8. This advances the file cursor by the length of the string in UTF-8 encoded bytes, which may be different from {@link String.length} which counts the number of UTF-32 codepoints. Returns `true` if the operation is successful.
   * **Note:** This method is intended to be used to write text files. The string is stored as a UTF-8 encoded buffer without string length or terminating zero, which means that it can't be loaded back easily. If you want to store a retrievable string in a binary file, consider using {@link store_pascal_string} instead. For retrieving strings from a text file, you can use `get_buffer(length).get_string_from_utf8()` (if you know the length) or {@link get_as_text}.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_string(string: string): boolean;
  /**
   * Stores any Variant value in the file. If `full_objects` is `true`, encoding objects is allowed (and can potentially include code). This advances the file cursor by the number of bytes written. Returns `true` if the operation is successful.
   * Internally, this uses the same encoding mechanism as the {@link @GlobalScope.var_to_bytes} method, as described in the Binary serialization API ($DOCS_URL/tutorials/io/binary_serialization_api.html) documentation.
   * **Note:** Not all properties are included. Only properties that are configured with the {@link PROPERTY_USAGE_STORAGE} flag set will be serialized. You can add a new usage flag to a property by overriding the {@link Object._get_property_list} method in your class. You can also check how property usage is configured by calling {@link Object._get_property_list}. See {@link PropertyUsageFlags} for the possible usage flags.
   * **Note:** If an error occurs, the resulting value of the file position indicator is indeterminate.
   */
  store_var(value: unknown, full_objects?: boolean): boolean;

  // enum ModeFlags
  /** Opens the file for read operations. The file cursor is positioned at the beginning of the file. */
  static readonly READ: int;
  /**
   * Opens the file for write operations. If the file exists, it is truncated to zero length and its contents are cleared. Otherwise, it is created.
   * **Note:** When creating a file it must be in an already existing directory. To recursively create directories for a file path, see {@link DirAccess.make_dir_recursive}.
   */
  static readonly WRITE: int;
  /**
   * Opens the file for read and write operations. Does not truncate the file. The file cursor is positioned at the beginning of the file.
   */
  static readonly READ_WRITE: int;
  /**
   * Opens the file for read and write operations. If the file exists, it is truncated to zero length and its contents are cleared. Otherwise, it is created. The file cursor is positioned at the beginning of the file.
   * **Note:** When creating a file it must be in an already existing directory. To recursively create directories for a file path, see {@link DirAccess.make_dir_recursive}.
   */
  static readonly WRITE_READ: int;
  // enum CompressionMode
  /** Uses the FastLZ (https://fastlz.org/) compression method. */
  static readonly COMPRESSION_FASTLZ: int;
  /** Uses the DEFLATE (https://en.wikipedia.org/wiki/DEFLATE) compression method. */
  static readonly COMPRESSION_DEFLATE: int;
  /** Uses the Zstandard (https://facebook.github.io/zstd/) compression method. */
  static readonly COMPRESSION_ZSTD: int;
  /** Uses the gzip (https://www.gzip.org/) compression method. */
  static readonly COMPRESSION_GZIP: int;
  /**
   * Uses the brotli (https://github.com/google/brotli) compression method (only decompression is supported).
   */
  static readonly COMPRESSION_BROTLI: int;
  // enum UnixPermissionFlags
  /** Read for owner bit. */
  static readonly UNIX_READ_OWNER: int;
  /** Write for owner bit. */
  static readonly UNIX_WRITE_OWNER: int;
  /** Execute for owner bit. */
  static readonly UNIX_EXECUTE_OWNER: int;
  /** Read for group bit. */
  static readonly UNIX_READ_GROUP: int;
  /** Write for group bit. */
  static readonly UNIX_WRITE_GROUP: int;
  /** Execute for group bit. */
  static readonly UNIX_EXECUTE_GROUP: int;
  /** Read for other bit. */
  static readonly UNIX_READ_OTHER: int;
  /** Write for other bit. */
  static readonly UNIX_WRITE_OTHER: int;
  /** Execute for other bit. */
  static readonly UNIX_EXECUTE_OTHER: int;
  /** Set user id on execution bit. */
  static readonly UNIX_SET_USER_ID: int;
  /** Set group id on execution bit. */
  static readonly UNIX_SET_GROUP_ID: int;
  /** Restricted deletion (sticky) bit. */
  static readonly UNIX_RESTRICTED_DELETE: int;
}
