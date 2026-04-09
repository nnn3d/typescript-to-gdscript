// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A resource used for styling/skinning {@link Control}s and {@link Window}s. */
declare class Theme extends Resource {
  /**
   * The default base scale factor of this theme resource. Used by some controls to scale their visual properties based on the global scale factor. If this value is set to `0.0`, the global scale factor is used (see {@link ThemeDB.fallback_base_scale}).
   * Use {@link has_default_base_scale} to check if this value is valid.
   */
  default_base_scale: float;
  /**
   * The default font of this theme resource. Used as the default value when trying to fetch a font resource that doesn't exist in this theme or is in invalid state. If the default font is also missing or invalid, the engine fallback value is used (see {@link ThemeDB.fallback_font}).
   * Use {@link has_default_font} to check if this value is valid.
   */
  default_font: Font | null;
  /**
   * The default font size of this theme resource. Used as the default value when trying to fetch a font size value that doesn't exist in this theme or is in invalid state. If the default font size is also missing or invalid, the engine fallback value is used (see {@link ThemeDB.fallback_font_size}).
   * Values below `1` are invalid and can be used to unset the property. Use {@link has_default_font_size} to check if this value is valid.
   */
  default_font_size: int;
  set_default_base_scale(value: float): void;
  get_default_base_scale(): float;
  set_default_font(value: Font | null): void;
  get_default_font(): Font | null;
  set_default_font_size(value: int): void;
  get_default_font_size(): int;

  /**
   * Adds an empty theme type for every valid data type.
   * **Note:** Empty types are not saved with the theme. This method only exists to perform in-memory changes to the resource. Use available `set_*` methods to add theme items.
   */
  add_type(theme_type: string): void;
  /** Removes all the theme properties defined on the theme resource. */
  clear(): void;
  /**
   * Removes the {@link Color} property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_color} to check for existence.
   */
  clear_color(name: string, theme_type: string): void;
  /**
   * Removes the constant property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_constant} to check for existence.
   */
  clear_constant(name: string, theme_type: string): void;
  /**
   * Removes the {@link Font} property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_font} to check for existence.
   */
  clear_font(name: string, theme_type: string): void;
  /**
   * Removes the font size property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_font_size} to check for existence.
   */
  clear_font_size(name: string, theme_type: string): void;
  /**
   * Removes the icon property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_icon} to check for existence.
   */
  clear_icon(name: string, theme_type: string): void;
  /**
   * Removes the {@link StyleBox} property defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_stylebox} to check for existence.
   */
  clear_stylebox(name: string, theme_type: string): void;
  /**
   * Removes the theme property of `data_type` defined by `name` and `theme_type`, if it exists.
   * Fails if it doesn't exist. Use {@link has_theme_item} to check for existence.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  clear_theme_item(data_type: int, name: string, theme_type: string): void;
  /** Unmarks `theme_type` as being a variation of another theme type. See {@link set_type_variation}. */
  clear_type_variation(theme_type: string): void;
  /**
   * Returns the {@link Color} property defined by `name` and `theme_type`, if it exists.
   * Returns the default color value if the property doesn't exist. Use {@link has_color} to check for existence.
   */
  get_color(name: string, theme_type: string): Color;
  /**
   * Returns a list of names for {@link Color} properties defined with `theme_type`. Use {@link get_color_type_list} to get a list of possible theme type names.
   */
  get_color_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for {@link Color} properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_color_type_list(): PackedStringArray;
  /**
   * Returns the constant property defined by `name` and `theme_type`, if it exists.
   * Returns `0` if the property doesn't exist. Use {@link has_constant} to check for existence.
   */
  get_constant(name: string, theme_type: string): int;
  /**
   * Returns a list of names for constant properties defined with `theme_type`. Use {@link get_constant_type_list} to get a list of possible theme type names.
   */
  get_constant_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for constant properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_constant_type_list(): PackedStringArray;
  /**
   * Returns the {@link Font} property defined by `name` and `theme_type`, if it exists.
   * Returns the default theme font if the property doesn't exist and the default theme font is set up (see {@link default_font}). Use {@link has_font} to check for existence of the property and {@link has_default_font} to check for existence of the default theme font.
   * Returns the engine fallback font value, if neither exist (see {@link ThemeDB.fallback_font}).
   */
  get_font(name: string, theme_type: string): Font | null;
  /**
   * Returns a list of names for {@link Font} properties defined with `theme_type`. Use {@link get_font_type_list} to get a list of possible theme type names.
   */
  get_font_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns the font size property defined by `name` and `theme_type`, if it exists.
   * Returns the default theme font size if the property doesn't exist and the default theme font size is set up (see {@link default_font_size}). Use {@link has_font_size} to check for existence of the property and {@link has_default_font_size} to check for existence of the default theme font.
   * Returns the engine fallback font size value, if neither exist (see {@link ThemeDB.fallback_font_size}).
   */
  get_font_size(name: string, theme_type: string): int;
  /**
   * Returns a list of names for font size properties defined with `theme_type`. Use {@link get_font_size_type_list} to get a list of possible theme type names.
   */
  get_font_size_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for font size properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_font_size_type_list(): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for {@link Font} properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_font_type_list(): PackedStringArray;
  /**
   * Returns the icon property defined by `name` and `theme_type`, if it exists.
   * Returns the engine fallback icon value if the property doesn't exist (see {@link ThemeDB.fallback_icon}). Use {@link has_icon} to check for existence.
   */
  get_icon(name: string, theme_type: string): Texture2D | null;
  /**
   * Returns a list of names for icon properties defined with `theme_type`. Use {@link get_icon_type_list} to get a list of possible theme type names.
   */
  get_icon_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for icon properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_icon_type_list(): PackedStringArray;
  /**
   * Returns the {@link StyleBox} property defined by `name` and `theme_type`, if it exists.
   * Returns the engine fallback stylebox value if the property doesn't exist (see {@link ThemeDB.fallback_stylebox}). Use {@link has_stylebox} to check for existence.
   */
  get_stylebox(name: string, theme_type: string): StyleBox | null;
  /**
   * Returns a list of names for {@link StyleBox} properties defined with `theme_type`. Use {@link get_stylebox_type_list} to get a list of possible theme type names.
   */
  get_stylebox_list(theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for {@link StyleBox} properties. Use {@link get_type_list} to get a list of all unique theme types.
   */
  get_stylebox_type_list(): PackedStringArray;
  /**
   * Returns the theme property of `data_type` defined by `name` and `theme_type`, if it exists.
   * Returns the engine fallback value if the property doesn't exist (see {@link ThemeDB}). Use {@link has_theme_item} to check for existence.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  get_theme_item(data_type: int, name: string, theme_type: string): unknown;
  /**
   * Returns a list of names for properties of `data_type` defined with `theme_type`. Use {@link get_theme_item_type_list} to get a list of possible theme type names.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  get_theme_item_list(data_type: int, theme_type: string | NodePath): PackedStringArray;
  /**
   * Returns a list of all unique theme type names for `data_type` properties. Use {@link get_type_list} to get a list of all unique theme types.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  get_theme_item_type_list(data_type: int): PackedStringArray;
  /**
   * Returns a list of all unique theme type names. Use the appropriate `get_*_type_list` method to get a list of unique theme types for a single data type.
   */
  get_type_list(): PackedStringArray;
  /**
   * Returns the name of the base theme type if `theme_type` is a valid variation type. Returns an empty string otherwise.
   */
  get_type_variation_base(theme_type: string): string;
  /** Returns a list of all type variations for the given `base_type`. */
  get_type_variation_list(base_type: string): PackedStringArray;
  /**
   * Returns `true` if the {@link Color} property defined by `name` and `theme_type` exists.
   * Returns `false` if it doesn't exist. Use {@link set_color} to define it.
   */
  has_color(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if the constant property defined by `name` and `theme_type` exists.
   * Returns `false` if it doesn't exist. Use {@link set_constant} to define it.
   */
  has_constant(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if {@link default_base_scale} has a valid value.
   * Returns `false` if it doesn't. The value must be greater than `0.0` to be considered valid.
   */
  has_default_base_scale(): boolean;
  /**
   * Returns `true` if {@link default_font} has a valid value.
   * Returns `false` if it doesn't.
   */
  has_default_font(): boolean;
  /**
   * Returns `true` if {@link default_font_size} has a valid value.
   * Returns `false` if it doesn't. The value must be greater than `0` to be considered valid.
   */
  has_default_font_size(): boolean;
  /**
   * Returns `true` if the {@link Font} property defined by `name` and `theme_type` exists, or if the default theme font is set up (see {@link has_default_font}).
   * Returns `false` if neither exist. Use {@link set_font} to define the property.
   */
  has_font(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if the font size property defined by `name` and `theme_type` exists, or if the default theme font size is set up (see {@link has_default_font_size}).
   * Returns `false` if neither exist. Use {@link set_font_size} to define the property.
   */
  has_font_size(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if the icon property defined by `name` and `theme_type` exists.
   * Returns `false` if it doesn't exist. Use {@link set_icon} to define it.
   */
  has_icon(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if the {@link StyleBox} property defined by `name` and `theme_type` exists.
   * Returns `false` if it doesn't exist. Use {@link set_stylebox} to define it.
   */
  has_stylebox(name: string, theme_type: string): boolean;
  /**
   * Returns `true` if the theme property of `data_type` defined by `name` and `theme_type` exists.
   * Returns `false` if it doesn't exist. Use {@link set_theme_item} to define it.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  has_theme_item(data_type: int, name: string, theme_type: string): boolean;
  /** Returns `true` if `theme_type` is marked as a variation of `base_type`. */
  is_type_variation(theme_type: string, base_type: string): boolean;
  /**
   * Adds missing and overrides existing definitions with values from the `other` theme resource.
   * **Note:** This modifies the current theme. If you want to merge two themes together without modifying either one, create a new empty theme and merge the other two into it one after another.
   */
  merge_with(other: Theme): void;
  /**
   * Removes the theme type, gracefully discarding defined theme items. If the type is a variation, this information is also erased. If the type is a base for type variations, those variations lose their base.
   */
  remove_type(theme_type: string): void;
  /**
   * Renames the {@link Color} property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_color} to check for existence, and {@link clear_color} to remove the existing property.
   */
  rename_color(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the constant property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_constant} to check for existence, and {@link clear_constant} to remove the existing property.
   */
  rename_constant(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the {@link Font} property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_font} to check for existence, and {@link clear_font} to remove the existing property.
   */
  rename_font(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the font size property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_font_size} to check for existence, and {@link clear_font_size} to remove the existing property.
   */
  rename_font_size(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the icon property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_icon} to check for existence, and {@link clear_icon} to remove the existing property.
   */
  rename_icon(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the {@link StyleBox} property defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_stylebox} to check for existence, and {@link clear_stylebox} to remove the existing property.
   */
  rename_stylebox(old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the theme property of `data_type` defined by `old_name` and `theme_type` to `name`, if it exists.
   * Fails if it doesn't exist, or if a similar property with the new name already exists. Use {@link has_theme_item} to check for existence, and {@link clear_theme_item} to remove the existing property.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  rename_theme_item(data_type: int, old_name: string, name: string, theme_type: string): void;
  /**
   * Renames the theme type `old_theme_type` to `theme_type`, if the old type exists and the new one doesn't exist.
   * **Note:** Renaming a theme type to an empty name or a variation to a type associated with a built-in class removes type variation connections in a way that cannot be undone by reversing the rename alone.
   */
  rename_type(old_theme_type: string, theme_type: string): void;
  /**
   * Creates or changes the value of the {@link Color} property defined by `name` and `theme_type`. Use {@link clear_color} to remove the property.
   */
  set_color(name: string, theme_type: string, color: Color): void;
  /**
   * Creates or changes the value of the constant property defined by `name` and `theme_type`. Use {@link clear_constant} to remove the property.
   */
  set_constant(name: string, theme_type: string, constant: int): void;
  /**
   * Creates or changes the value of the {@link Font} property defined by `name` and `theme_type`. Use {@link clear_font} to remove the property.
   */
  set_font(name: string, theme_type: string, font: Font): void;
  /**
   * Creates or changes the value of the font size property defined by `name` and `theme_type`. Use {@link clear_font_size} to remove the property.
   */
  set_font_size(name: string, theme_type: string, font_size: int): void;
  /**
   * Creates or changes the value of the icon property defined by `name` and `theme_type`. Use {@link clear_icon} to remove the property.
   */
  set_icon(name: string, theme_type: string, texture: Texture2D): void;
  /**
   * Creates or changes the value of the {@link StyleBox} property defined by `name` and `theme_type`. Use {@link clear_stylebox} to remove the property.
   */
  set_stylebox(name: string, theme_type: string, texture: StyleBox): void;
  /**
   * Creates or changes the value of the theme property of `data_type` defined by `name` and `theme_type`. Use {@link clear_theme_item} to remove the property.
   * Fails if the `value` type is not accepted by `data_type`.
   * **Note:** This method is analogous to calling the corresponding data type specific method, but can be used for more generalized logic.
   */
  set_theme_item(data_type: int, name: string, theme_type: string, value: unknown): void;
  /**
   * Marks `theme_type` as a variation of `base_type`.
   * This adds `theme_type` as a suggested option for {@link Control.theme_type_variation} on a {@link Control} that is of the `base_type` class.
   * Variations can also be nested, i.e. `base_type` can be another variation. If a chain of variations ends with a `base_type` matching the class of the {@link Control}, the whole chain is going to be suggested as options.
   * **Note:** Suggestions only show up if this theme resource is set as the project default theme. See {@link ProjectSettings.gui/theme/custom}.
   */
  set_type_variation(theme_type: string, base_type: string): void;

  // enum DataType
  /** Theme's {@link Color} item type. */
  static readonly DATA_TYPE_COLOR: int;
  /** Theme's constant item type. */
  static readonly DATA_TYPE_CONSTANT: int;
  /** Theme's {@link Font} item type. */
  static readonly DATA_TYPE_FONT: int;
  /** Theme's font size item type. */
  static readonly DATA_TYPE_FONT_SIZE: int;
  /** Theme's icon {@link Texture2D} item type. */
  static readonly DATA_TYPE_ICON: int;
  /** Theme's {@link StyleBox} item type. */
  static readonly DATA_TYPE_STYLEBOX: int;
  /** Maximum value for the DataType enum. */
  static readonly DATA_TYPE_MAX: int;
}
