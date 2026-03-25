// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A widget that provides an interface for selecting or modifying a color. */
declare class ColorPicker<Tree extends object = any> extends VBoxContainer<Tree> {
  /**
   * If `true`, it's possible to add presets under Swatches. If `false`, the button to add presets is disabled.
   */
  can_add_swatches: boolean;
  /** The currently selected color. */
  color: Color;
  /** The currently selected color mode. */
  color_mode: int;
  /** If `true`, the color mode buttons are visible. */
  color_modes_visible: boolean;
  /**
   * If `true`, the color will apply only after the user releases the mouse button, otherwise it will apply immediately even in mouse motion event (which can cause performance issues).
   */
  deferred_mode: boolean;
  /** If `true`, shows an alpha channel slider (opacity). */
  edit_alpha: boolean;
  /**
   * If `true`, shows an intensity slider. The intensity is applied as follows: convert the color to linear encoding, multiply it by `2 ** intensity`, and then convert it back to nonlinear sRGB encoding.
   */
  edit_intensity: boolean;
  /** If `true`, the hex color code input field is visible. */
  hex_visible: boolean;
  /** The shape of the color space view. */
  picker_shape: int;
  /** If `true`, the Swatches and Recent Colors presets are visible. */
  presets_visible: boolean;
  /** If `true`, the color sampler and color preview are visible. */
  sampler_visible: boolean;
  /** If `true`, the color sliders are visible. */
  sliders_visible: boolean;
  set_can_add_swatches(value: boolean): void;
  are_swatches_enabled(): boolean;
  set_pick_color(value: Color): void;
  get_pick_color(): Color;
  set_color_mode(value: int): void;
  get_color_mode(): int;
  set_modes_visible(value: boolean): void;
  are_modes_visible(): boolean;
  set_deferred_mode(value: boolean): void;
  is_deferred_mode(): boolean;
  set_edit_alpha(value: boolean): void;
  is_editing_alpha(): boolean;
  set_edit_intensity(value: boolean): void;
  is_editing_intensity(): boolean;
  set_hex_visible(value: boolean): void;
  is_hex_visible(): boolean;
  set_picker_shape(value: int): void;
  get_picker_shape(): int;
  set_presets_visible(value: boolean): void;
  are_presets_visible(): boolean;
  set_sampler_visible(value: boolean): void;
  is_sampler_visible(): boolean;
  set_sliders_visible(value: boolean): void;
  are_sliders_visible(): boolean;

  /**
   * Adds the given color to a list of color presets. The presets are displayed in the color picker and the user will be able to select them.
   * **Note:** The presets list is only for *this* color picker.
   */
  add_preset(color: Color): void;
  /**
   * Adds the given color to a list of color recent presets so that it can be picked later. Recent presets are the colors that were picked recently, a new preset is automatically created and added to recent presets when you pick a new color.
   * **Note:** The recent presets list is only for *this* color picker.
   */
  add_recent_preset(color: Color): void;
  /** Removes the given color from the list of color presets of this color picker. */
  erase_preset(color: Color): void;
  /** Removes the given color from the list of color recent presets of this color picker. */
  erase_recent_preset(color: Color): void;
  /** Returns the list of colors in the presets of the color picker. */
  get_presets(): PackedColorArray;
  /** Returns the list of colors in the recent presets of the color picker. */
  get_recent_presets(): PackedColorArray;

  /** Emitted when the color is changed. */
  color_changed: Signal<[Color]>;
  /** Emitted when a preset is added. */
  preset_added: Signal<[Color]>;
  /** Emitted when a preset is removed. */
  preset_removed: Signal<[Color]>;

  // enum ColorModeType
  /** Allows editing the color with Red/Green/Blue sliders in sRGB color space. */
  static readonly MODE_RGB: int;
  /** Allows editing the color with Hue/Saturation/Value sliders. */
  static readonly MODE_HSV: int;
  static readonly MODE_RAW: int;
  /** Allows editing the color with Red/Green/Blue sliders in linear color space. */
  static readonly MODE_LINEAR: int;
  /**
   * Allows editing the color with Hue/Saturation/Lightness sliders.
   * OKHSL is a new color space similar to HSL but that better match perception by leveraging the Oklab color space which is designed to be simple to use, while doing a good job at predicting perceived lightness, chroma and hue.
   * Okhsv and Okhsl color spaces (https://bottosson.github.io/posts/colorpicker/)
   */
  static readonly MODE_OKHSL: int;
  // enum PickerShapeType
  /** HSV Color Model rectangle color space. */
  static readonly SHAPE_HSV_RECTANGLE: int;
  /** HSV Color Model rectangle color space with a wheel. */
  static readonly SHAPE_HSV_WHEEL: int;
  /** HSV Color Model circle color space. Use Saturation as a radius. */
  static readonly SHAPE_VHS_CIRCLE: int;
  /** HSL OK Color Model circle color space. */
  static readonly SHAPE_OKHSL_CIRCLE: int;
  /**
   * The color space shape and the shape select button are hidden. Can't be selected from the shapes popup.
   */
  static readonly SHAPE_NONE: int;
  /** OKHSL Color Model rectangle with constant lightness. */
  static readonly SHAPE_OK_HS_RECTANGLE: int;
  /** OKHSL Color Model rectangle with constant saturation. */
  static readonly SHAPE_OK_HL_RECTANGLE: int;
}
