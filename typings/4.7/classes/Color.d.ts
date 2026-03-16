// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A color represented in RGBA format. */
declare class Color {
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
   * Constructs a color from an HSV profile (https://en.wikipedia.org/wiki/HSL_and_HSV). The hue (`h`), saturation (`s`), and value (`v`) are typically between 0.0 and 1.0.
   */
  static from_hsv(h: float, s: float, v: float, alpha?: float): Color;
  /**
   * Constructs a color from an OK HSL profile (https://bottosson.github.io/posts/colorpicker/). The hue (`h`), saturation (`s`), and lightness (`l`) are typically between 0.0 and 1.0.
   */
  static from_ok_hsl(h: float, s: float, l: float, alpha?: float): Color;
  /**
   * Returns a {@link Color} constructed from red (`r8`), green (`g8`), blue (`b8`), and optionally alpha (`a8`) integer channels, each divided by `255.0` for their final value.
   * **Note:** Due to the lower precision of {@link from_rgba8} compared to the standard {@link Color} constructor, a color created with {@link from_rgba8} will generally not be equal to the same color created with the standard {@link Color} constructor. Use {@link is_equal_approx} for comparisons to avoid issues with floating-point precision error.
   */
  static from_rgba8(r8: int, g8: int, b8: int, a8?: int): Color;
  /** Decodes a {@link Color} from an RGBE9995 format integer. See {@link Image.FORMAT_RGBE9995}. */
  static from_rgbe9995(rgbe: int): Color;
  /**
   * Creates a {@link Color} from the given string, which can be either an HTML color code or a named color (case-insensitive). Returns `default` if the color cannot be inferred from the string.
   * If you want to create a color from String in a constant expression, use the equivalent constructor instead (i.e. `Color("color string")`).
   */
  static from_string(str: string, default_: Color): Color;
  /**
   * Returns the light intensity of the color, as a value between 0.0 and 1.0 (inclusive). This is useful when determining light or dark color. Colors with a luminance smaller than 0.5 can be generally considered dark.
   * **Note:** {@link get_luminance} relies on the color using linear encoding to return an accurate relative luminance value. If the color uses the default nonlinear sRGB encoding, use {@link srgb_to_linear} to convert it to linear encoding first.
   */
  get_luminance(): float;
  /**
   * Returns the {@link Color} associated with the provided `hex` integer in 32-bit RGBA format (8 bits per channel). This method is the inverse of {@link to_rgba32}.
   * In GDScript and C#, the [int] is best visualized with hexadecimal notation (`"0x"` prefix, making it `"0xRRGGBBAA"`).
   * If you want to use hex notation in a constant expression, use the equivalent constructor instead (i.e. `Color(0xRRGGBBAA)`).
   */
  static hex(hex: int): Color;
  /**
   * Returns the {@link Color} associated with the provided `hex` integer in 64-bit RGBA format (16 bits per channel). This method is the inverse of {@link to_rgba64}.
   * In GDScript and C#, the [int] is best visualized with hexadecimal notation (`"0x"` prefix, making it `"0xRRRRGGGGBBBBAAAA"`).
   */
  static hex64(hex: int): Color;
  /**
   * Returns a new color from `rgba`, an HTML hexadecimal color string. `rgba` is not case-sensitive, and may be prefixed by a hash sign (`#`).
   * `rgba` must be a valid three-digit or six-digit hexadecimal color string, and may contain an alpha channel value. If `rgba` does not contain an alpha channel value, an alpha channel value of 1.0 is applied. If `rgba` is invalid, returns an empty color.
   */
  static html(rgba: string): Color;
  /**
   * Returns `true` if `color` is a valid HTML hexadecimal color string. The string must be a hexadecimal value (case-insensitive) of either 3, 4, 6 or 8 digits, and may be prefixed by a hash sign (`#`). This method is identical to {@link String.is_valid_html_color}.
   */
  static html_is_valid(color: string): boolean;
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

  /** Alice blue color. */
  static readonly ALICE_BLUE: int;
  /** Antique white color. */
  static readonly ANTIQUE_WHITE: int;
  /** Aqua color. */
  static readonly AQUA: int;
  /** Aquamarine color. */
  static readonly AQUAMARINE: int;
  /** Azure color. */
  static readonly AZURE: int;
  /** Beige color. */
  static readonly BEIGE: int;
  /** Bisque color. */
  static readonly BISQUE: int;
  /** Black color. In GDScript, this is the default value of any color. */
  static readonly BLACK: int;
  /** Blanched almond color. */
  static readonly BLANCHED_ALMOND: int;
  /** Blue color. */
  static readonly BLUE: int;
  /** Blue violet color. */
  static readonly BLUE_VIOLET: int;
  /** Brown color. */
  static readonly BROWN: int;
  /** Burlywood color. */
  static readonly BURLYWOOD: int;
  /** Cadet blue color. */
  static readonly CADET_BLUE: int;
  /** Chartreuse color. */
  static readonly CHARTREUSE: int;
  /** Chocolate color. */
  static readonly CHOCOLATE: int;
  /** Coral color. */
  static readonly CORAL: int;
  /** Cornflower blue color. */
  static readonly CORNFLOWER_BLUE: int;
  /** Cornsilk color. */
  static readonly CORNSILK: int;
  /** Crimson color. */
  static readonly CRIMSON: int;
  /** Cyan color. */
  static readonly CYAN: int;
  /** Dark blue color. */
  static readonly DARK_BLUE: int;
  /** Dark cyan color. */
  static readonly DARK_CYAN: int;
  /** Dark goldenrod color. */
  static readonly DARK_GOLDENROD: int;
  /** Dark gray color. */
  static readonly DARK_GRAY: int;
  /** Dark green color. */
  static readonly DARK_GREEN: int;
  /** Dark khaki color. */
  static readonly DARK_KHAKI: int;
  /** Dark magenta color. */
  static readonly DARK_MAGENTA: int;
  /** Dark olive green color. */
  static readonly DARK_OLIVE_GREEN: int;
  /** Dark orange color. */
  static readonly DARK_ORANGE: int;
  /** Dark orchid color. */
  static readonly DARK_ORCHID: int;
  /** Dark red color. */
  static readonly DARK_RED: int;
  /** Dark salmon color. */
  static readonly DARK_SALMON: int;
  /** Dark sea green color. */
  static readonly DARK_SEA_GREEN: int;
  /** Dark slate blue color. */
  static readonly DARK_SLATE_BLUE: int;
  /** Dark slate gray color. */
  static readonly DARK_SLATE_GRAY: int;
  /** Dark turquoise color. */
  static readonly DARK_TURQUOISE: int;
  /** Dark violet color. */
  static readonly DARK_VIOLET: int;
  /** Deep pink color. */
  static readonly DEEP_PINK: int;
  /** Deep sky blue color. */
  static readonly DEEP_SKY_BLUE: int;
  /** Dim gray color. */
  static readonly DIM_GRAY: int;
  /** Dodger blue color. */
  static readonly DODGER_BLUE: int;
  /** Firebrick color. */
  static readonly FIREBRICK: int;
  /** Floral white color. */
  static readonly FLORAL_WHITE: int;
  /** Forest green color. */
  static readonly FOREST_GREEN: int;
  /** Fuchsia color. */
  static readonly FUCHSIA: int;
  /** Gainsboro color. */
  static readonly GAINSBORO: int;
  /** Ghost white color. */
  static readonly GHOST_WHITE: int;
  /** Gold color. */
  static readonly GOLD: int;
  /** Goldenrod color. */
  static readonly GOLDENROD: int;
  /** Gray color. */
  static readonly GRAY: int;
  /** Green color. */
  static readonly GREEN: int;
  /** Green yellow color. */
  static readonly GREEN_YELLOW: int;
  /** Honeydew color. */
  static readonly HONEYDEW: int;
  /** Hot pink color. */
  static readonly HOT_PINK: int;
  /** Indian red color. */
  static readonly INDIAN_RED: int;
  /** Indigo color. */
  static readonly INDIGO: int;
  /** Ivory color. */
  static readonly IVORY: int;
  /** Khaki color. */
  static readonly KHAKI: int;
  /** Lavender color. */
  static readonly LAVENDER: int;
  /** Lavender blush color. */
  static readonly LAVENDER_BLUSH: int;
  /** Lawn green color. */
  static readonly LAWN_GREEN: int;
  /** Lemon chiffon color. */
  static readonly LEMON_CHIFFON: int;
  /** Light blue color. */
  static readonly LIGHT_BLUE: int;
  /** Light coral color. */
  static readonly LIGHT_CORAL: int;
  /** Light cyan color. */
  static readonly LIGHT_CYAN: int;
  /** Light goldenrod color. */
  static readonly LIGHT_GOLDENROD: int;
  /** Light gray color. */
  static readonly LIGHT_GRAY: int;
  /** Light green color. */
  static readonly LIGHT_GREEN: int;
  /** Light pink color. */
  static readonly LIGHT_PINK: int;
  /** Light salmon color. */
  static readonly LIGHT_SALMON: int;
  /** Light sea green color. */
  static readonly LIGHT_SEA_GREEN: int;
  /** Light sky blue color. */
  static readonly LIGHT_SKY_BLUE: int;
  /** Light slate gray color. */
  static readonly LIGHT_SLATE_GRAY: int;
  /** Light steel blue color. */
  static readonly LIGHT_STEEL_BLUE: int;
  /** Light yellow color. */
  static readonly LIGHT_YELLOW: int;
  /** Lime color. */
  static readonly LIME: int;
  /** Lime green color. */
  static readonly LIME_GREEN: int;
  /** Linen color. */
  static readonly LINEN: int;
  /** Magenta color. */
  static readonly MAGENTA: int;
  /** Maroon color. */
  static readonly MAROON: int;
  /** Medium aquamarine color. */
  static readonly MEDIUM_AQUAMARINE: int;
  /** Medium blue color. */
  static readonly MEDIUM_BLUE: int;
  /** Medium orchid color. */
  static readonly MEDIUM_ORCHID: int;
  /** Medium purple color. */
  static readonly MEDIUM_PURPLE: int;
  /** Medium sea green color. */
  static readonly MEDIUM_SEA_GREEN: int;
  /** Medium slate blue color. */
  static readonly MEDIUM_SLATE_BLUE: int;
  /** Medium spring green color. */
  static readonly MEDIUM_SPRING_GREEN: int;
  /** Medium turquoise color. */
  static readonly MEDIUM_TURQUOISE: int;
  /** Medium violet red color. */
  static readonly MEDIUM_VIOLET_RED: int;
  /** Midnight blue color. */
  static readonly MIDNIGHT_BLUE: int;
  /** Mint cream color. */
  static readonly MINT_CREAM: int;
  /** Misty rose color. */
  static readonly MISTY_ROSE: int;
  /** Moccasin color. */
  static readonly MOCCASIN: int;
  /** Navajo white color. */
  static readonly NAVAJO_WHITE: int;
  /** Navy blue color. */
  static readonly NAVY_BLUE: int;
  /** Old lace color. */
  static readonly OLD_LACE: int;
  /** Olive color. */
  static readonly OLIVE: int;
  /** Olive drab color. */
  static readonly OLIVE_DRAB: int;
  /** Orange color. */
  static readonly ORANGE: int;
  /** Orange red color. */
  static readonly ORANGE_RED: int;
  /** Orchid color. */
  static readonly ORCHID: int;
  /** Pale goldenrod color. */
  static readonly PALE_GOLDENROD: int;
  /** Pale green color. */
  static readonly PALE_GREEN: int;
  /** Pale turquoise color. */
  static readonly PALE_TURQUOISE: int;
  /** Pale violet red color. */
  static readonly PALE_VIOLET_RED: int;
  /** Papaya whip color. */
  static readonly PAPAYA_WHIP: int;
  /** Peach puff color. */
  static readonly PEACH_PUFF: int;
  /** Peru color. */
  static readonly PERU: int;
  /** Pink color. */
  static readonly PINK: int;
  /** Plum color. */
  static readonly PLUM: int;
  /** Powder blue color. */
  static readonly POWDER_BLUE: int;
  /** Purple color. */
  static readonly PURPLE: int;
  /** Rebecca purple color. */
  static readonly REBECCA_PURPLE: int;
  /** Red color. */
  static readonly RED: int;
  /** Rosy brown color. */
  static readonly ROSY_BROWN: int;
  /** Royal blue color. */
  static readonly ROYAL_BLUE: int;
  /** Saddle brown color. */
  static readonly SADDLE_BROWN: int;
  /** Salmon color. */
  static readonly SALMON: int;
  /** Sandy brown color. */
  static readonly SANDY_BROWN: int;
  /** Sea green color. */
  static readonly SEA_GREEN: int;
  /** Seashell color. */
  static readonly SEASHELL: int;
  /** Sienna color. */
  static readonly SIENNA: int;
  /** Silver color. */
  static readonly SILVER: int;
  /** Sky blue color. */
  static readonly SKY_BLUE: int;
  /** Slate blue color. */
  static readonly SLATE_BLUE: int;
  /** Slate gray color. */
  static readonly SLATE_GRAY: int;
  /** Snow color. */
  static readonly SNOW: int;
  /** Spring green color. */
  static readonly SPRING_GREEN: int;
  /** Steel blue color. */
  static readonly STEEL_BLUE: int;
  /** Tan color. */
  static readonly TAN: int;
  /** Teal color. */
  static readonly TEAL: int;
  /** Thistle color. */
  static readonly THISTLE: int;
  /** Tomato color. */
  static readonly TOMATO: int;
  /** Transparent color (white with zero alpha). */
  static readonly TRANSPARENT: int;
  /** Turquoise color. */
  static readonly TURQUOISE: int;
  /** Violet color. */
  static readonly VIOLET: int;
  /** Web gray color. */
  static readonly WEB_GRAY: int;
  /** Web green color. */
  static readonly WEB_GREEN: int;
  /** Web maroon color. */
  static readonly WEB_MAROON: int;
  /** Web purple color. */
  static readonly WEB_PURPLE: int;
  /** Wheat color. */
  static readonly WHEAT: int;
  /** White color. */
  static readonly WHITE: int;
  /** White smoke color. */
  static readonly WHITE_SMOKE: int;
  /** Yellow color. */
  static readonly YELLOW: int;
  /** Yellow green color. */
  static readonly YELLOW_GREEN: int;

  // Operator overloads
  [__ne]: { right: Color; ret: boolean };
  [__mul]: { right: Color; ret: Color } | { right: float; ret: Color } | { right: int; ret: Color };
  [__add]: { right: Color; ret: Color };
  [__sub]: { right: Color; ret: Color };
  [__div]: { right: Color; ret: Color } | { right: float; ret: Color } | { right: int; ret: Color };
  [__eq]: { right: Color; ret: boolean };
  [__plus]: { ret: Color };
  [__minus]: { ret: Color };
}
