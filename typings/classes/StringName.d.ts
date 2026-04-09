// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A built-in type for unique strings. */
declare class StringName {
  /** Returns `true` if the string begins with the given `text`. See also {@link ends_with}. */
  begins_with(text: string): boolean;
  /** Returns an array containing the bigrams (pairs of consecutive characters) of this string. */
  bigrams(): PackedStringArray;
  /**
   * Converts the string representing a binary number into an [int]. The string may optionally be prefixed with `"0b"`, and an additional `-` prefix for negative numbers.
   */
  bin_to_int(): int;
  /** Returns a copy of the string with special characters escaped using the C language standard. */
  c_escape(): string;
  /**
   * Returns a copy of the string with escaped characters replaced by their meanings. Supported escape sequences are `\'`, `\"`, `\\`, `\a`, `\b`, `\f`, `\n`, `\r`, `\t`, `\v`.
   * **Note:** Unlike the GDScript parser, this method doesn't support the `\uXXXX` escape sequence.
   */
  c_unescape(): string;
  /**
   * Changes the appearance of the string: replaces underscores (`_`) with spaces, adds spaces before uppercase letters in the middle of a word, converts all letters to lowercase, then converts the first one and each one following a space to uppercase.
   */
  capitalize(): string;
  /**
   * Performs a case-sensitive comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "Less than" and "greater than" are determined by the Unicode code points (https://en.wikipedia.org/wiki/List_of_Unicode_characters) of each string, which roughly matches the alphabetical order.
   * With different string lengths, returns `1` if this string is longer than the `to` string, or `-1` if shorter. Note that the length of empty strings is *always* `0`.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link nocasecmp_to}, {@link filecasecmp_to}, and {@link naturalcasecmp_to}.
   */
  casecmp_to(to: string): int;
  /**
   * Returns `true` if the string contains `what`. In GDScript, this corresponds to the `in` operator.
   * If you need to know where `what` is within the string, use {@link find}. See also {@link containsn}.
   */
  contains(what: string): boolean;
  /**
   * Returns `true` if the string contains `what`, **ignoring case**.
   * If you need to know where `what` is within the string, use {@link findn}. See also {@link contains}.
   */
  containsn(what: string): boolean;
  /**
   * Returns the number of occurrences of the substring `what` between `from` and `to` positions. If `to` is 0, the search continues until the end of the string.
   */
  count(what: string, from_?: int, to?: int): int;
  /**
   * Returns the number of occurrences of the substring `what` between `from` and `to` positions, **ignoring case**. If `to` is 0, the search continues until the end of the string.
   */
  countn(what: string, from_?: int, to?: int): int;
  /**
   * Returns a copy of the string with indentation (leading tabs and spaces) removed. See also {@link indent} to add indentation.
   */
  dedent(): string;
  /** Returns `true` if the string ends with the given `text`. See also {@link begins_with}. */
  ends_with(text: string): boolean;
  /**
   * Returns a string with `chars` characters erased starting from `position`. If `chars` goes beyond the string's length given the specified `position`, fewer characters will be erased from the returned string. Returns an empty string if either `position` or `chars` is negative. Returns the original string unmodified if `chars` is `0`.
   */
  erase(position: int, chars?: int): string;
  /**
   * Like {@link naturalcasecmp_to} but prioritizes strings that begin with periods (`.`) and underscores (`_`) before any other character. Useful when sorting folders or file names.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link filenocasecmp_to}, {@link naturalcasecmp_to}, and {@link casecmp_to}.
   */
  filecasecmp_to(to: string): int;
  /**
   * Like {@link naturalnocasecmp_to} but prioritizes strings that begin with periods (`.`) and underscores (`_`) before any other character. Useful when sorting folders or file names.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link filecasecmp_to}, {@link naturalnocasecmp_to}, and {@link nocasecmp_to}.
   */
  filenocasecmp_to(to: string): int;
  /**
   * Returns the index of the **first** occurrence of `what` in this string, or `-1` if there are none. The search's start can be specified with `from`, continuing to the end of the string.
   * **Note:** If you just want to know whether the string contains `what`, use {@link contains}. In GDScript, you may also use the `in` operator.
   * **Note:** A negative value of `from` is converted to a starting index by counting back from the last possible index with enough space to find `what`.
   */
  find(what: string, from_?: int): int;
  /**
   * Returns the index of the **first** **case-insensitive** occurrence of `what` in this string, or `-1` if there are none. The starting search index can be specified with `from`, continuing to the end of the string.
   */
  findn(what: string, from_?: int): int;
  /**
   * Formats the string by replacing all occurrences of `placeholder` with the elements of `values`.
   * `values` can be a {@link Dictionary}, an {@link Array}, or an {@link Object}. Any underscores in `placeholder` will be replaced with the corresponding keys in advance. Array elements use their index as keys.
   * Some additional handling is performed when `values` is an {@link Array}. If `placeholder` does not contain an underscore, the elements of the `values` array will be used to replace one occurrence of the placeholder in order; If an element of `values` is another 2-element array, it'll be interpreted as a key-value pair.
   * When passing an {@link Object}, the property names from {@link Object.get_property_list} are used as keys.
   * See also the GDScript format string ($DOCS_URL/tutorials/scripting/gdscript/gdscript_format_string.html) tutorial.
   * **Note:** Each replacement is done sequentially for each element of `values`, **not** all at once. This means that if any element is inserted and it contains another placeholder, it may be changed by the next replacement. While this can be very useful, it often causes unexpected results. If not necessary, make sure `values`'s elements do not contain placeholders.
   * **Note:** In C#, it's recommended to interpolate strings with "$" (https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated), instead.
   */
  format(values: unknown, placeholder?: string): string;
  /** If the string is a valid file path, returns the base directory name. */
  get_base_dir(): string;
  /** If the string is a valid file path, returns the full file path, without the extension. */
  get_basename(): string;
  /**
   * If the string is a valid file name or path, returns the file extension without the leading period (`.`). Otherwise, returns an empty string.
   */
  get_extension(): string;
  /** If the string is a valid file path, returns the file name, including the extension. */
  get_file(): string;
  /**
   * Splits the string using a `delimiter` and returns the substring at index `slice`. Returns the original string if `delimiter` does not occur in the string. Returns an empty string if the `slice` does not exist.
   * This is faster than {@link split}, if you only need one substring.
   */
  get_slice(delimiter: string, slice: int): string;
  /**
   * Returns the total number of slices when the string is split with the given `delimiter` (see {@link split}).
   */
  get_slice_count(delimiter: string): int;
  /**
   * Splits the string using a Unicode character with code `delimiter` and returns the substring at index `slice`. Returns an empty string if the `slice` does not exist.
   * This is faster than {@link split}, if you only need one substring.
   */
  get_slicec(delimiter: int, slice: int): string;
  /**
   * Returns the 32-bit hash value representing the string's contents.
   * **Note:** Strings with equal hash values are *not* guaranteed to be the same, as a result of hash collisions. On the contrary, strings with different hash values are guaranteed to be different.
   */
  hash(): int;
  /** Decodes a hexadecimal string as a {@link PackedByteArray}. */
  hex_decode(): PackedByteArray;
  /**
   * Converts the string representing a hexadecimal number into an [int]. The string may be optionally prefixed with `"0x"`, and an additional `-` prefix for negative numbers.
   */
  hex_to_int(): int;
  /**
   * Indents every line of the string with the given `prefix`. Empty lines are not indented. See also {@link dedent} to remove indentation.
   * For example, the string can be indented with two tabulations using `"\t\t"`, or four spaces using `"    "`.
   */
  indent(prefix: string): string;
  /** Inserts `what` at the given `position` in the string. */
  insert(position: int, what: string): string;
  /**
   * Returns `true` if the string is a path to a file or directory, and its starting point is explicitly defined. This method is the opposite of {@link is_relative_path}.
   * This includes all paths starting with `"res://"`, `"user://"`, `"C:\"`, `"/"`, etc.
   */
  is_absolute_path(): boolean;
  /** Returns `true` if the string's length is `0` (`""`). See also {@link length}. */
  is_empty(): boolean;
  /**
   * Returns `true` if the string is a path, and its starting point is dependent on context. The path could begin from the current directory, or the current {@link Node} (if the string is derived from a {@link NodePath}), and may sometimes be prefixed with `"./"`. This method is the opposite of {@link is_absolute_path}.
   */
  is_relative_path(): boolean;
  /**
   * Returns `true` if all characters of this string can be found in `text` in their original order. This is not the same as {@link contains}.
   */
  is_subsequence_of(text: string): boolean;
  /**
   * Returns `true` if all characters of this string can be found in `text` in their original order, **ignoring case**. This is not the same as {@link containsn}.
   */
  is_subsequence_ofn(text: string): boolean;
  /**
   * Returns `true` if this string is a valid ASCII identifier. A valid ASCII identifier may contain only letters, digits, and underscores (`_`), and the first character may not be a digit.
   * See also {@link is_valid_unicode_identifier}.
   */
  is_valid_ascii_identifier(): boolean;
  /**
   * Returns `true` if this string is a valid file name. A valid file name cannot be empty, begin or end with space characters, or contain characters that are not allowed (`:` `/` `\` `?` `*` `"` `|` `%` `<` `>`).
   */
  is_valid_filename(): boolean;
  /**
   * Returns `true` if this string represents a valid floating-point number. A valid float may contain only digits, one decimal point (`.`), and the exponent letter (`e`). It may also be prefixed with a positive (`+`) or negative (`-`) sign. Any valid integer is also a valid float (see {@link is_valid_int}). See also {@link to_float}.
   */
  is_valid_float(): boolean;
  /**
   * Returns `true` if this string is a valid hexadecimal number. A valid hexadecimal number only contains digits or letters `A` to `F` (either uppercase or lowercase), and may be prefixed with a positive (`+`) or negative (`-`) sign.
   * If `with_prefix` is `true`, the hexadecimal number needs to prefixed by `"0x"` to be considered valid.
   */
  is_valid_hex_number(with_prefix?: boolean): boolean;
  /**
   * Returns `true` if this string is a valid color in hexadecimal HTML notation. The string must be a hexadecimal value (see {@link is_valid_hex_number}) of either 3, 4, 6 or 8 digits, and may be prefixed by a hash sign (`#`). Other HTML notations for colors, such as names or `hsl()`, are not considered valid. See also {@link Color.html}.
   */
  is_valid_html_color(): boolean;
  /**
   * Returns `true` if this string is a valid identifier. A valid identifier may contain only letters, digits and underscores (`_`), and the first character may not be a digit.
   */
  is_valid_identifier(): boolean;
  /**
   * Returns `true` if this string represents a valid integer. A valid integer only contains digits, and may be prefixed with a positive (`+`) or negative (`-`) sign. See also {@link to_int}.
   */
  is_valid_int(): boolean;
  /**
   * Returns `true` if this string represents a well-formatted IPv4 or IPv6 address. This method considers reserved IP addresses (https://en.wikipedia.org/wiki/Reserved_IP_addresses) such as `"0.0.0.0"` and `"ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"` as valid.
   */
  is_valid_ip_address(): boolean;
  /**
   * Returns `true` if this string is a valid Unicode identifier.
   * A valid Unicode identifier must begin with a Unicode character of class `XID_Start` or `"_"`, and may contain Unicode characters of class `XID_Continue` in the other positions.
   * See also {@link is_valid_ascii_identifier}.
   * **Note:** This method checks identifiers the same way as GDScript. See {@link TextServer.is_valid_identifier} for more advanced checks.
   */
  is_valid_unicode_identifier(): boolean;
  /**
   * Returns the concatenation of `parts`' elements, with each element separated by the string calling this method. This method is the opposite of {@link split}.
   */
  join(parts: PackedStringArray): string;
  /**
   * Returns a copy of the string with special characters escaped using the JSON standard. Because it closely matches the C standard, it is possible to use {@link c_unescape} to unescape the string, if necessary.
   */
  json_escape(): string;
  /**
   * Returns the first `length` characters from the beginning of the string. If `length` is negative, strips the last `length` characters from the string's end.
   */
  left(length: int): string;
  /**
   * Returns the number of characters in the string. Empty strings (`""`) always return `0`. See also {@link is_empty}.
   */
  length(): int;
  /**
   * Formats the string to be at least `min_length` long by adding `character`s to the left of the string, if necessary. See also {@link rpad}.
   */
  lpad(min_length: int, character?: string): string;
  /**
   * Removes a set of characters defined in `chars` from the string's beginning. See also {@link rstrip}.
   * **Note:** `chars` is not a prefix. Use {@link trim_prefix} to remove a single prefix, rather than a set of characters.
   */
  lstrip(chars: string): string;
  /**
   * Does a simple expression match (also called "glob" or "globbing"), where `*` matches zero or more arbitrary characters and `?` matches any single character except a period (`.`). An empty string or empty expression always evaluates to `false`.
   */
  match(expr: string): boolean;
  /**
   * Does a simple **case-insensitive** expression match, where `*` matches zero or more arbitrary characters and `?` matches any single character except a period (`.`). An empty string or empty expression always evaluates to `false`.
   */
  matchn(expr: string): boolean;
  /**
   * Returns the MD5 hash (https://en.wikipedia.org/wiki/MD5) of the string as a {@link PackedByteArray}.
   */
  md5_buffer(): PackedByteArray;
  /** Returns the MD5 hash (https://en.wikipedia.org/wiki/MD5) of the string as another {@link String}. */
  md5_text(): string;
  /**
   * Performs a **case-sensitive**, *natural order* comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "Less than" or "greater than" are determined by the Unicode code points (https://en.wikipedia.org/wiki/List_of_Unicode_characters) of each string, which roughly matches the alphabetical order.
   * When used for sorting, natural order comparison orders sequences of numbers by the combined value of each digit as is often expected, instead of the single digit's value. A sorted sequence of numbered strings will be `["1", "2", "3", ...]`, not `["1", "10", "2", "3", ...]`.
   * With different string lengths, returns `1` if this string is longer than the `to` string, or `-1` if shorter. Note that the length of empty strings is *always* `0`.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link naturalnocasecmp_to}, {@link filecasecmp_to}, and {@link nocasecmp_to}.
   */
  naturalcasecmp_to(to: string): int;
  /**
   * Performs a **case-insensitive**, *natural order* comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "Less than" or "greater than" are determined by the Unicode code points (https://en.wikipedia.org/wiki/List_of_Unicode_characters) of each string, which roughly matches the alphabetical order. Internally, lowercase characters are converted to uppercase for the comparison.
   * When used for sorting, natural order comparison orders sequences of numbers by the combined value of each digit as is often expected, instead of the single digit's value. A sorted sequence of numbered strings will be `["1", "2", "3", ...]`, not `["1", "10", "2", "3", ...]`.
   * With different string lengths, returns `1` if this string is longer than the `to` string, or `-1` if shorter. Note that the length of empty strings is *always* `0`.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link naturalcasecmp_to}, {@link filenocasecmp_to}, and {@link casecmp_to}.
   */
  naturalnocasecmp_to(to: string): int;
  /**
   * Performs a **case-insensitive** comparison to another string. Returns `-1` if less than, `1` if greater than, or `0` if equal. "Less than" or "greater than" are determined by the Unicode code points (https://en.wikipedia.org/wiki/List_of_Unicode_characters) of each string, which roughly matches the alphabetical order. Internally, lowercase characters are converted to uppercase for the comparison.
   * With different string lengths, returns `1` if this string is longer than the `to` string, or `-1` if shorter. Note that the length of empty strings is *always* `0`.
   * To get a [bool] result from a string comparison, use the `==` operator instead. See also {@link casecmp_to}, {@link filenocasecmp_to}, and {@link naturalnocasecmp_to}.
   */
  nocasecmp_to(to: string): int;
  /**
   * Formats the string representing a number to have an exact number of `digits` *after* the decimal point.
   */
  pad_decimals(digits: int): string;
  /**
   * Formats the string representing a number to have an exact number of `digits` *before* the decimal point.
   */
  pad_zeros(digits: int): string;
  /**
   * Concatenates `path` at the end of the string as a subpath, adding `/` if necessary.
   * **Example:** `"this/is".path_join("path") == "this/is/path"`.
   */
  path_join(path: string): string;
  /**
   * Removes all occurrences of the Unicode character with code `what`. Faster version of {@link replace} when the key is only one character long and the replacement is `""`.
   */
  remove_char(what: int): string;
  /** Removes all occurrences of the characters in `chars`. See also {@link remove_char}. */
  remove_chars(chars: string): string;
  /**
   * Repeats this string a number of times. `count` needs to be greater than `0`. Otherwise, returns an empty string.
   */
  repeat(count: int): string;
  /** Replaces all occurrences of `what` inside the string with the given `forwhat`. */
  replace(what: string, forwhat: string): string;
  /**
   * Replaces all occurrences of the Unicode character with code `key` with the Unicode character with code `with`. Faster version of {@link replace} when the key is only one character long. To get a single character use `"X".unicode_at(0)` (note that some strings, like compound letters and emoji, can be composed of multiple unicode codepoints, and will not work with this method, use {@link length} to make sure).
   */
  replace_char(key: int, with_: int): string;
  /**
   * Replaces any occurrence of the characters in `keys` with the Unicode character with code `with`. See also {@link replace_char}.
   */
  replace_chars(keys: string, with_: int): string;
  /** Replaces all **case-insensitive** occurrences of `what` inside the string with the given `forwhat`. */
  replacen(what: string, forwhat: string): string;
  /**
   * Returns the copy of this string in reverse order. This operation works on unicode codepoints, rather than sequences of codepoints, and may break things like compound letters or emojis.
   */
  reverse(): string;
  /**
   * Returns the index of the **last** occurrence of `what` in this string, or `-1` if there are none. The search's start can be specified with `from`, continuing to the beginning of the string. This method is the reverse of {@link find}.
   * **Note:** A negative value of `from` is converted to a starting index by counting back from the last possible index with enough space to find `what`.
   * **Note:** A value of `from` that is greater than the last possible index with enough space to find `what` is considered out-of-bounds, and returns `-1`.
   */
  rfind(what: string, from_?: int): int;
  /**
   * Returns the index of the **last** **case-insensitive** occurrence of `what` in this string, or `-1` if there are none. The starting search index can be specified with `from`, continuing to the beginning of the string. This method is the reverse of {@link findn}.
   */
  rfindn(what: string, from_?: int): int;
  /**
   * Returns the last `length` characters from the end of the string. If `length` is negative, strips the first `length` characters from the string's beginning.
   */
  right(length: int): string;
  /**
   * Formats the string to be at least `min_length` long, by adding `character`s to the right of the string, if necessary. See also {@link lpad}.
   */
  rpad(min_length: int, character?: string): string;
  /**
   * Splits the string using a `delimiter` and returns an array of the substrings, starting from the end of the string. The splits in the returned array appear in the same order as the original string. If `delimiter` is an empty string, each substring will be a single character.
   * If `allow_empty` is `false`, empty strings between adjacent delimiters are excluded from the array.
   * If `maxsplit` is greater than `0`, the number of splits may not exceed `maxsplit`. By default, the entire string is split, which is mostly identical to {@link split}.
   */
  rsplit(delimiter?: string, allow_empty?: boolean, maxsplit?: int): PackedStringArray;
  /**
   * Removes a set of characters defined in `chars` from the string's end. See also {@link lstrip}.
   * **Note:** `chars` is not a suffix. Use {@link trim_suffix} to remove a single suffix, rather than a set of characters.
   */
  rstrip(chars: string): string;
  /**
   * Returns the SHA-1 (https://en.wikipedia.org/wiki/SHA-1) hash of the string as a {@link PackedByteArray}.
   */
  sha1_buffer(): PackedByteArray;
  /**
   * Returns the SHA-1 (https://en.wikipedia.org/wiki/SHA-1) hash of the string as another {@link String}.
   */
  sha1_text(): string;
  /**
   * Returns the SHA-256 (https://en.wikipedia.org/wiki/SHA-2) hash of the string as a {@link PackedByteArray}.
   */
  sha256_buffer(): PackedByteArray;
  /**
   * Returns the SHA-256 (https://en.wikipedia.org/wiki/SHA-2) hash of the string as another {@link String}.
   */
  sha256_text(): string;
  /**
   * Returns the similarity index (Sørensen-Dice coefficient (https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)) of this string compared to another. A result of `1.0` means totally similar, while `0.0` means totally dissimilar.
   */
  similarity(text: string): float;
  /**
   * If the string is a valid file path, converts the string into a canonical path. This is the shortest possible path, without `"./"`, and all the unnecessary `".."` and `"/"`.
   */
  simplify_path(): string;
  /**
   * Splits the string using a `delimiter` and returns an array of the substrings. If `delimiter` is an empty string, each substring will be a single character. This method is the opposite of {@link join}.
   * If `allow_empty` is `false`, empty strings between adjacent delimiters are excluded from the array.
   * If `maxsplit` is greater than `0`, the number of splits may not exceed `maxsplit`. By default, the entire string is split.
   * **Note:** If you only need one substring from the array, consider using {@link get_slice} which is faster. If you need to split strings with more complex rules, use the {@link RegEx} class instead.
   */
  split(delimiter?: string, allow_empty?: boolean, maxsplit?: int): PackedStringArray;
  /**
   * Splits the string into floats by using a `delimiter` and returns a {@link PackedFloat64Array}.
   * If `allow_empty` is `false`, empty or invalid [float] conversions between adjacent delimiters are excluded.
   */
  split_floats(delimiter: string, allow_empty?: boolean): PackedFloat64Array;
  /**
   * Strips all non-printable characters from the beginning and the end of the string. These include spaces, tabulations (`\t`), and newlines (`\n` `\r`).
   * If `left` is `false`, ignores the string's beginning. Likewise, if `right` is `false`, ignores the string's end.
   */
  strip_edges(left?: boolean, right?: boolean): string;
  /**
   * Strips all escape characters from the string. These include all non-printable control characters of the first page of the ASCII table (values from 0 to 31), such as tabulation (`\t`) and newline (`\n`, `\r`) characters, but *not* spaces.
   */
  strip_escapes(): string;
  /**
   * Returns part of the string from the position `from` with length `len`. If `len` is `-1` (as by default), returns the rest of the string starting from the given position.
   */
  substr(from_: int, len?: int): string;
  /**
   * Converts the string to an ASCII (https://en.wikipedia.org/wiki/ASCII)/Latin-1 encoded {@link PackedByteArray}. This method is slightly faster than {@link to_utf8_buffer}, but replaces all unsupported characters with spaces. This is the inverse of {@link PackedByteArray.get_string_from_ascii}.
   */
  to_ascii_buffer(): PackedByteArray;
  /** Returns the string converted to `camelCase`. */
  to_camel_case(): string;
  /**
   * Converts the string representing a decimal number into a [float]. This method stops on the first non-number character, except the first decimal point (`.`) and the exponent letter (`e`). See also {@link is_valid_float}.
   */
  to_float(): float;
  /**
   * Converts the string representing an integer number into an [int]. This method removes any non-number character and stops at the first decimal point (`.`). See also {@link is_valid_int}.
   */
  to_int(): int;
  /**
   * Returns the string converted to `kebab-case`.
   * **Note:** Numbers followed by a *single* letter are not separated in the conversion to keep some words (such as "2D") together.
   */
  to_kebab_case(): string;
  /** Returns the string converted to `lowercase`. */
  to_lower(): string;
  /**
   * Converts the string to system multibyte code page encoded {@link PackedByteArray}. If conversion fails, empty array is returned.
   * The values permitted for `encoding` are system dependent. If `encoding` is empty string, system default encoding is used.
   * - For Windows, see Code Page Identifiers (https://learn.microsoft.com/en-us/windows/win32/Intl/code-page-identifiers) .NET names.
   * - For macOS and Linux/BSD, see `libiconv` library documentation and `iconv --list` for a list of supported encodings.
   */
  to_multibyte_char_buffer(encoding?: string): PackedByteArray;
  /** Returns the string converted to `PascalCase`. */
  to_pascal_case(): string;
  /**
   * Returns the string converted to `snake_case`.
   * **Note:** Numbers followed by a *single* letter are not separated in the conversion to keep some words (such as "2D") together.
   */
  to_snake_case(): string;
  /** Returns the string converted to `UPPERCASE`. */
  to_upper(): string;
  /**
   * Converts the string to a UTF-8 (https://en.wikipedia.org/wiki/UTF-8) encoded {@link PackedByteArray}. This method is slightly slower than {@link to_ascii_buffer}, but supports all UTF-8 characters. For most cases, prefer using this method. This is the inverse of {@link PackedByteArray.get_string_from_utf8}.
   */
  to_utf8_buffer(): PackedByteArray;
  /**
   * Converts the string to a UTF-16 (https://en.wikipedia.org/wiki/UTF-16) encoded {@link PackedByteArray}. This is the inverse of {@link PackedByteArray.get_string_from_utf16}.
   */
  to_utf16_buffer(): PackedByteArray;
  /**
   * Converts the string to a UTF-32 (https://en.wikipedia.org/wiki/UTF-32) encoded {@link PackedByteArray}. This is the inverse of {@link PackedByteArray.get_string_from_utf32}.
   */
  to_utf32_buffer(): PackedByteArray;
  /**
   * Converts the string to a wide character (https://en.wikipedia.org/wiki/Wide_character) (`wchar_t`, UTF-16 on Windows, UTF-32 on other platforms) encoded {@link PackedByteArray}. This is the inverse of {@link PackedByteArray.get_string_from_wchar}.
   */
  to_wchar_buffer(): PackedByteArray;
  /** Removes the given `prefix` from the start of the string, or returns the string unchanged. */
  trim_prefix(prefix: string): string;
  /** Removes the given `suffix` from the end of the string, or returns the string unchanged. */
  trim_suffix(suffix: string): string;
  /**
   * Returns the character code at position `at`.
   * See also {@link String.chr}, {@link @GDScript.char}, and {@link @GDScript.ord}.
   */
  unicode_at(at: int): int;
  /**
   * Decodes the string from its URL-encoded format. This method is meant to properly decode the parameters in a URL when receiving an HTTP request. See also {@link uri_encode}.
   * **Note:** This method decodes `+` as space.
   */
  uri_decode(): string;
  /**
   * Encodes the string to URL-friendly format. This method is meant to properly encode the parameters in a URL when sending an HTTP request. See also {@link uri_decode}.
   */
  uri_encode(): string;
  /**
   * Decodes the file path from its URL-encoded format. Unlike {@link uri_decode} this method leaves `+` as is.
   */
  uri_file_decode(): string;
  /**
   * Returns a copy of the string with all characters that are not allowed in {@link is_valid_filename} replaced with underscores.
   */
  validate_filename(): string;
  /**
   * Returns a copy of the string with all characters that are not allowed in {@link Node.name} (`.` `:` `@` `/` `"` `%`) replaced with underscores.
   */
  validate_node_name(): string;
  /**
   * Returns a copy of the string with special characters escaped using the XML standard. If `escape_quotes` is `true`, the single quote (`'`) and double quote (`"`) characters are also escaped.
   */
  xml_escape(escape_quotes?: boolean): string;
  /**
   * Returns a copy of the string with escaped characters replaced by their meanings according to the XML standard.
   */
  xml_unescape(): string;

  // Operator overloads
  [__ops_ne]: { right: string; ret: boolean } | { right: string; ret: boolean };
  [__ops_rem]: { right: unknown; ret: string };
  [__ops_add]: { right: string; ret: string } | { right: string; ret: string };
  [__ops_lt]: { right: string; ret: boolean };
  [__ops_lte]: { right: string; ret: boolean };
  [__ops_eq]: { right: string; ret: boolean } | { right: string; ret: boolean };
  [__ops_gt]: { right: string; ret: boolean };
  [__ops_gte]: { right: string; ret: boolean };
}
