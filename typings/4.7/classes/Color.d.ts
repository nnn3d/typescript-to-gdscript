// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A color represented in RGBA format. */
declare interface Color {
  /**
   * The color's alpha component, typically on the range of 0 to 1. A value of 0 means that the color is fully transparent. A value of 1 means that the color is fully opaque.
   * **Note:** The alpha channel is always stored with linear encoding, regardless of the encoding of the other color channels. The {@link linear_to_srgb} and {@link srgb_to_linear} methods do not affect the alpha channel.
   */
  a: float;
  /** Wrapper for {@link a} that uses the range 0 to 255, instead of 0 to 1. */
  a8: int;
  /** The color's blue component, typically on the range of 0 to 1. */
  b: float;
  /** Wrapper for {@link b} that uses the range 0 to 255, instead of 0 to 1. */
  b8: int;
  /** The color's green component, typically on the range of 0 to 1. */
  g: float;
  /** Wrapper for {@link g} that uses the range 0 to 255, instead of 0 to 1. */
  g8: int;
  /** The HSV hue of this color, on the range 0 to 1. */
  h: float;
  /** The OKHSL hue of this color, on the range 0 to 1. */
  ok_hsl_h: float;
  /** The OKHSL lightness of this color, on the range 0 to 1. */
  ok_hsl_l: float;
  /** The OKHSL saturation of this color, on the range 0 to 1. */
  ok_hsl_s: float;
  /** The color's red component, typically on the range of 0 to 1. */
  r: float;
  /** Wrapper for {@link r} that uses the range 0 to 255, instead of 0 to 1. */
  r8: int;
  /** The HSV saturation of this color, on the range 0 to 1. */
  s: float;
  /** The HSV value (brightness) of this color, on the range 0 to 1. */
  v: float;

  /**
   * Returns a new color resulting from overlaying this color over the given color. In a painting program, you can imagine it as the `over` color painted over this color (including alpha).
   */
  blend(over: Color): Color;
  /**
   * Returns a new color with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min?: Color, max?: Color): Color;
  /**
   * Returns a new color resulting from making this color darker by the specified `amount` (ratio from 0.0 to 1.0). See also {@link lightened}.
   */
  darkened(amount: float): Color;
  /**
   * Returns the light intensity of the color, as a value between 0.0 and 1.0 (inclusive). This is useful when determining light or dark color. Colors with a luminance smaller than 0.5 can be generally considered dark.
   * **Note:** {@link get_luminance} relies on the color using linear encoding to return an accurate relative luminance value. If the color uses the default nonlinear sRGB encoding, use {@link srgb_to_linear} to convert it to linear encoding first.
   */
  get_luminance(): float;
  /**
   * Returns the color with its {@link r}, {@link g}, and {@link b} components inverted (`(1 - r, 1 - g, 1 - b, a)`).
   */
  inverted(): Color;
  /**
   * Returns `true` if this color and `to` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(to: Color): boolean;
  /**
   * Returns the linear interpolation between this color's components and `to`'s components. The interpolation factor `weight` should be between 0.0 and 1.0 (inclusive). See also {@link @GlobalScope.lerp}.
   */
  lerp(to: Color, weight: float): Color;
  /**
   * Returns a new color resulting from making this color lighter by the specified `amount`, which should be a ratio from 0.0 to 1.0. See also {@link darkened}.
   */
  lightened(amount: float): Color;
  /**
   * Returns a copy of the color that is encoded using the nonlinear sRGB transfer function (https://en.wikipedia.org/wiki/SRGB). This method requires the original color to use linear encoding. See also {@link srgb_to_linear} which performs the opposite operation.
   * **Note:** The color's alpha channel ({@link a}) is not affected. The alpha channel is always stored with linear encoding, regardless of the color space of the other color channels.
   */
  linear_to_srgb(): Color;
  /**
   * Returns a copy of the color that uses linear encoding. This method requires the original color to be encoded using the nonlinear sRGB transfer function (https://en.wikipedia.org/wiki/SRGB). See also {@link linear_to_srgb} which performs the opposite operation.
   * **Note:** The color's alpha channel ({@link a}) is not affected. The alpha channel is always stored with linear encoding, regardless of the color space of the other color channels.
   */
  srgb_to_linear(): Color;
  /**
   * Returns the color converted to a 32-bit integer in ABGR format (each component is 8 bits). ABGR is the reversed version of the default RGBA format.
   */
  to_abgr32(): int;
  /**
   * Returns the color converted to a 64-bit integer in ABGR format (each component is 16 bits). ABGR is the reversed version of the default RGBA format.
   */
  to_abgr64(): int;
  /**
   * Returns the color converted to a 32-bit integer in ARGB format (each component is 8 bits). ARGB is more compatible with DirectX.
   */
  to_argb32(): int;
  /**
   * Returns the color converted to a 64-bit integer in ARGB format (each component is 16 bits). ARGB is more compatible with DirectX.
   */
  to_argb64(): int;
  /**
   * Returns the color converted to an HTML hexadecimal color {@link String} in RGBA format, without the hash (`#`) prefix.
   * Setting `with_alpha` to `false`, excludes alpha from the hexadecimal string, using RGB format instead of RGBA format.
   */
  to_html(with_alpha?: boolean): string;
  /**
   * Returns the color converted to a 32-bit integer in RGBA format (each component is 8 bits). RGBA is Godot's default format. This method is the inverse of {@link hex}.
   */
  to_rgba32(): int;
  /**
   * Returns the color converted to a 64-bit integer in RGBA format (each component is 16 bits). RGBA is Godot's default format. This method is the inverse of {@link hex64}.
   */
  to_rgba64(): int;

  // Operator overloads
  [__ne]: { right: Color; ret: boolean };
  [__mul]: { right: Color; ret: Color } | { right: float; ret: Color } | { right: int; ret: Color };
  [__add]: { right: Color; ret: Color };
  [__sub]: { right: Color; ret: Color };
  [__div]: { right: Color; ret: Color } | { right: float; ret: Color } | { right: int; ret: Color };
  [__eq]: { right: Color; ret: boolean };
  [__plus]: { ret: Color };
  [__minus]: { ret: Color };

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  clear: never;
  duplicate: never;
  duplicate_deep: never;
  erase: never;
  find_key: never;
  get: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has: never;
  has_all: never;
  hash: never;
  is_empty: never;
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
  set: never;
  size: never;
  sort: never;
  values: never;
}

declare interface ColorConstructor {
  /**
   * Constructs a default {@link Color} from opaque black. This is the same as {@link BLACK}.
   * **Note:** In C#, this constructs a {@link Color} with all of its components set to `0.0` (transparent black).
   */
  (): Color;
  /** Constructs a {@link Color} from the existing color, with {@link a} set to the given `alpha` value. */
  (from_: Color, alpha: float): Color;
  /** Constructs a {@link Color} as a copy of the given {@link Color}. */
  (from_: Color): Color;
  /**
   * Constructs a {@link Color} either from an HTML color code or from a standardized color name. The supported color names are the same as the constants.
   */
  (code: string): Color;
  /**
   * Constructs a {@link Color} either from an HTML color code or from a standardized color name, with `alpha` on the range of 0.0 to 1.0. The supported color names are the same as the constants.
   */
  (code: string, alpha: float): Color;
  /** Constructs a {@link Color} from RGB values, typically between 0.0 and 1.0. {@link a} is set to 1.0. */
  (r: float, g: float, b: float): Color;
  /** Constructs a {@link Color} from RGBA values, typically between 0.0 and 1.0. */
  (r: float, g: float, b: float, a: float): Color;
  /**
   * Constructs a color from an HSV profile (https://en.wikipedia.org/wiki/HSL_and_HSV). The hue (`h`), saturation (`s`), and value (`v`) are typically between 0.0 and 1.0.
   */
  from_hsv(h: float, s: float, v: float, alpha?: float): Color;
  /**
   * Constructs a color from an OK HSL profile (https://bottosson.github.io/posts/colorpicker/). The hue (`h`), saturation (`s`), and lightness (`l`) are typically between 0.0 and 1.0.
   */
  from_ok_hsl(h: float, s: float, l: float, alpha?: float): Color;
  /**
   * Returns a {@link Color} constructed from red (`r8`), green (`g8`), blue (`b8`), and optionally alpha (`a8`) integer channels, each divided by `255.0` for their final value.
   * **Note:** Due to the lower precision of {@link from_rgba8} compared to the standard {@link Color} constructor, a color created with {@link from_rgba8} will generally not be equal to the same color created with the standard {@link Color} constructor. Use {@link is_equal_approx} for comparisons to avoid issues with floating-point precision error.
   */
  from_rgba8(r8: int, g8: int, b8: int, a8?: int): Color;
  /** Decodes a {@link Color} from an RGBE9995 format integer. See {@link Image.FORMAT_RGBE9995}. */
  from_rgbe9995(rgbe: int): Color;
  /**
   * Creates a {@link Color} from the given string, which can be either an HTML color code or a named color (case-insensitive). Returns `default` if the color cannot be inferred from the string.
   * If you want to create a color from String in a constant expression, use the equivalent constructor instead (i.e. `Color("color string")`).
   */
  from_string(str: string, default_: Color): Color;
  /**
   * Returns the {@link Color} associated with the provided `hex` integer in 32-bit RGBA format (8 bits per channel). This method is the inverse of {@link to_rgba32}.
   * In GDScript and C#, the [int] is best visualized with hexadecimal notation (`"0x"` prefix, making it `"0xRRGGBBAA"`).
   * If you want to use hex notation in a constant expression, use the equivalent constructor instead (i.e. `Color(0xRRGGBBAA)`).
   */
  hex(hex: int): Color;
  /**
   * Returns the {@link Color} associated with the provided `hex` integer in 64-bit RGBA format (16 bits per channel). This method is the inverse of {@link to_rgba64}.
   * In GDScript and C#, the [int] is best visualized with hexadecimal notation (`"0x"` prefix, making it `"0xRRRRGGGGBBBBAAAA"`).
   */
  hex64(hex: int): Color;
  /**
   * Returns a new color from `rgba`, an HTML hexadecimal color string. `rgba` is not case-sensitive, and may be prefixed by a hash sign (`#`).
   * `rgba` must be a valid three-digit or six-digit hexadecimal color string, and may contain an alpha channel value. If `rgba` does not contain an alpha channel value, an alpha channel value of 1.0 is applied. If `rgba` is invalid, returns an empty color.
   */
  html(rgba: string): Color;
  /**
   * Returns `true` if `color` is a valid HTML hexadecimal color string. The string must be a hexadecimal value (case-insensitive) of either 3, 4, 6 or 8 digits, and may be prefixed by a hash sign (`#`). This method is identical to {@link String.is_valid_html_color}.
   */
  html_is_valid(color: string): boolean;

  /** Alice blue color. */
  readonly ALICE_BLUE: Color;
  /** Antique white color. */
  readonly ANTIQUE_WHITE: Color;
  /** Aqua color. */
  readonly AQUA: Color;
  /** Aquamarine color. */
  readonly AQUAMARINE: Color;
  /** Azure color. */
  readonly AZURE: Color;
  /** Beige color. */
  readonly BEIGE: Color;
  /** Bisque color. */
  readonly BISQUE: Color;
  /** Black color. In GDScript, this is the default value of any color. */
  readonly BLACK: Color;
  /** Blanched almond color. */
  readonly BLANCHED_ALMOND: Color;
  /** Blue color. */
  readonly BLUE: Color;
  /** Blue violet color. */
  readonly BLUE_VIOLET: Color;
  /** Brown color. */
  readonly BROWN: Color;
  /** Burlywood color. */
  readonly BURLYWOOD: Color;
  /** Cadet blue color. */
  readonly CADET_BLUE: Color;
  /** Chartreuse color. */
  readonly CHARTREUSE: Color;
  /** Chocolate color. */
  readonly CHOCOLATE: Color;
  /** Coral color. */
  readonly CORAL: Color;
  /** Cornflower blue color. */
  readonly CORNFLOWER_BLUE: Color;
  /** Cornsilk color. */
  readonly CORNSILK: Color;
  /** Crimson color. */
  readonly CRIMSON: Color;
  /** Cyan color. */
  readonly CYAN: Color;
  /** Dark blue color. */
  readonly DARK_BLUE: Color;
  /** Dark cyan color. */
  readonly DARK_CYAN: Color;
  /** Dark goldenrod color. */
  readonly DARK_GOLDENROD: Color;
  /** Dark gray color. */
  readonly DARK_GRAY: Color;
  /** Dark green color. */
  readonly DARK_GREEN: Color;
  /** Dark khaki color. */
  readonly DARK_KHAKI: Color;
  /** Dark magenta color. */
  readonly DARK_MAGENTA: Color;
  /** Dark olive green color. */
  readonly DARK_OLIVE_GREEN: Color;
  /** Dark orange color. */
  readonly DARK_ORANGE: Color;
  /** Dark orchid color. */
  readonly DARK_ORCHID: Color;
  /** Dark red color. */
  readonly DARK_RED: Color;
  /** Dark salmon color. */
  readonly DARK_SALMON: Color;
  /** Dark sea green color. */
  readonly DARK_SEA_GREEN: Color;
  /** Dark slate blue color. */
  readonly DARK_SLATE_BLUE: Color;
  /** Dark slate gray color. */
  readonly DARK_SLATE_GRAY: Color;
  /** Dark turquoise color. */
  readonly DARK_TURQUOISE: Color;
  /** Dark violet color. */
  readonly DARK_VIOLET: Color;
  /** Deep pink color. */
  readonly DEEP_PINK: Color;
  /** Deep sky blue color. */
  readonly DEEP_SKY_BLUE: Color;
  /** Dim gray color. */
  readonly DIM_GRAY: Color;
  /** Dodger blue color. */
  readonly DODGER_BLUE: Color;
  /** Firebrick color. */
  readonly FIREBRICK: Color;
  /** Floral white color. */
  readonly FLORAL_WHITE: Color;
  /** Forest green color. */
  readonly FOREST_GREEN: Color;
  /** Fuchsia color. */
  readonly FUCHSIA: Color;
  /** Gainsboro color. */
  readonly GAINSBORO: Color;
  /** Ghost white color. */
  readonly GHOST_WHITE: Color;
  /** Gold color. */
  readonly GOLD: Color;
  /** Goldenrod color. */
  readonly GOLDENROD: Color;
  /** Gray color. */
  readonly GRAY: Color;
  /** Green color. */
  readonly GREEN: Color;
  /** Green yellow color. */
  readonly GREEN_YELLOW: Color;
  /** Honeydew color. */
  readonly HONEYDEW: Color;
  /** Hot pink color. */
  readonly HOT_PINK: Color;
  /** Indian red color. */
  readonly INDIAN_RED: Color;
  /** Indigo color. */
  readonly INDIGO: Color;
  /** Ivory color. */
  readonly IVORY: Color;
  /** Khaki color. */
  readonly KHAKI: Color;
  /** Lavender color. */
  readonly LAVENDER: Color;
  /** Lavender blush color. */
  readonly LAVENDER_BLUSH: Color;
  /** Lawn green color. */
  readonly LAWN_GREEN: Color;
  /** Lemon chiffon color. */
  readonly LEMON_CHIFFON: Color;
  /** Light blue color. */
  readonly LIGHT_BLUE: Color;
  /** Light coral color. */
  readonly LIGHT_CORAL: Color;
  /** Light cyan color. */
  readonly LIGHT_CYAN: Color;
  /** Light goldenrod color. */
  readonly LIGHT_GOLDENROD: Color;
  /** Light gray color. */
  readonly LIGHT_GRAY: Color;
  /** Light green color. */
  readonly LIGHT_GREEN: Color;
  /** Light pink color. */
  readonly LIGHT_PINK: Color;
  /** Light salmon color. */
  readonly LIGHT_SALMON: Color;
  /** Light sea green color. */
  readonly LIGHT_SEA_GREEN: Color;
  /** Light sky blue color. */
  readonly LIGHT_SKY_BLUE: Color;
  /** Light slate gray color. */
  readonly LIGHT_SLATE_GRAY: Color;
  /** Light steel blue color. */
  readonly LIGHT_STEEL_BLUE: Color;
  /** Light yellow color. */
  readonly LIGHT_YELLOW: Color;
  /** Lime color. */
  readonly LIME: Color;
  /** Lime green color. */
  readonly LIME_GREEN: Color;
  /** Linen color. */
  readonly LINEN: Color;
  /** Magenta color. */
  readonly MAGENTA: Color;
  /** Maroon color. */
  readonly MAROON: Color;
  /** Medium aquamarine color. */
  readonly MEDIUM_AQUAMARINE: Color;
  /** Medium blue color. */
  readonly MEDIUM_BLUE: Color;
  /** Medium orchid color. */
  readonly MEDIUM_ORCHID: Color;
  /** Medium purple color. */
  readonly MEDIUM_PURPLE: Color;
  /** Medium sea green color. */
  readonly MEDIUM_SEA_GREEN: Color;
  /** Medium slate blue color. */
  readonly MEDIUM_SLATE_BLUE: Color;
  /** Medium spring green color. */
  readonly MEDIUM_SPRING_GREEN: Color;
  /** Medium turquoise color. */
  readonly MEDIUM_TURQUOISE: Color;
  /** Medium violet red color. */
  readonly MEDIUM_VIOLET_RED: Color;
  /** Midnight blue color. */
  readonly MIDNIGHT_BLUE: Color;
  /** Mint cream color. */
  readonly MINT_CREAM: Color;
  /** Misty rose color. */
  readonly MISTY_ROSE: Color;
  /** Moccasin color. */
  readonly MOCCASIN: Color;
  /** Navajo white color. */
  readonly NAVAJO_WHITE: Color;
  /** Navy blue color. */
  readonly NAVY_BLUE: Color;
  /** Old lace color. */
  readonly OLD_LACE: Color;
  /** Olive color. */
  readonly OLIVE: Color;
  /** Olive drab color. */
  readonly OLIVE_DRAB: Color;
  /** Orange color. */
  readonly ORANGE: Color;
  /** Orange red color. */
  readonly ORANGE_RED: Color;
  /** Orchid color. */
  readonly ORCHID: Color;
  /** Pale goldenrod color. */
  readonly PALE_GOLDENROD: Color;
  /** Pale green color. */
  readonly PALE_GREEN: Color;
  /** Pale turquoise color. */
  readonly PALE_TURQUOISE: Color;
  /** Pale violet red color. */
  readonly PALE_VIOLET_RED: Color;
  /** Papaya whip color. */
  readonly PAPAYA_WHIP: Color;
  /** Peach puff color. */
  readonly PEACH_PUFF: Color;
  /** Peru color. */
  readonly PERU: Color;
  /** Pink color. */
  readonly PINK: Color;
  /** Plum color. */
  readonly PLUM: Color;
  /** Powder blue color. */
  readonly POWDER_BLUE: Color;
  /** Purple color. */
  readonly PURPLE: Color;
  /** Rebecca purple color. */
  readonly REBECCA_PURPLE: Color;
  /** Red color. */
  readonly RED: Color;
  /** Rosy brown color. */
  readonly ROSY_BROWN: Color;
  /** Royal blue color. */
  readonly ROYAL_BLUE: Color;
  /** Saddle brown color. */
  readonly SADDLE_BROWN: Color;
  /** Salmon color. */
  readonly SALMON: Color;
  /** Sandy brown color. */
  readonly SANDY_BROWN: Color;
  /** Sea green color. */
  readonly SEA_GREEN: Color;
  /** Seashell color. */
  readonly SEASHELL: Color;
  /** Sienna color. */
  readonly SIENNA: Color;
  /** Silver color. */
  readonly SILVER: Color;
  /** Sky blue color. */
  readonly SKY_BLUE: Color;
  /** Slate blue color. */
  readonly SLATE_BLUE: Color;
  /** Slate gray color. */
  readonly SLATE_GRAY: Color;
  /** Snow color. */
  readonly SNOW: Color;
  /** Spring green color. */
  readonly SPRING_GREEN: Color;
  /** Steel blue color. */
  readonly STEEL_BLUE: Color;
  /** Tan color. */
  readonly TAN: Color;
  /** Teal color. */
  readonly TEAL: Color;
  /** Thistle color. */
  readonly THISTLE: Color;
  /** Tomato color. */
  readonly TOMATO: Color;
  /** Transparent color (white with zero alpha). */
  readonly TRANSPARENT: Color;
  /** Turquoise color. */
  readonly TURQUOISE: Color;
  /** Violet color. */
  readonly VIOLET: Color;
  /** Web gray color. */
  readonly WEB_GRAY: Color;
  /** Web green color. */
  readonly WEB_GREEN: Color;
  /** Web maroon color. */
  readonly WEB_MAROON: Color;
  /** Web purple color. */
  readonly WEB_PURPLE: Color;
  /** Wheat color. */
  readonly WHEAT: Color;
  /** White color. */
  readonly WHITE: Color;
  /** White smoke color. */
  readonly WHITE_SMOKE: Color;
  /** Yellow color. */
  readonly YELLOW: Color;
  /** Yellow green color. */
  readonly YELLOW_GREEN: Color;
}
declare const Color: ColorConstructor;
