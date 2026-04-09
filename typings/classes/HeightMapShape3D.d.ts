// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 3D heightmap shape used for physics collision. */
declare class HeightMapShape3D extends Shape3D {
  /**
   * Heightmap data. The array's size must be equal to {@link map_width} multiplied by {@link map_depth}.
   */
  map_data: PackedFloat32Array;
  /** Number of vertices in the depth of the heightmap. Changing this will resize the {@link map_data}. */
  map_depth: int;
  /** Number of vertices in the width of the heightmap. Changing this will resize the {@link map_data}. */
  map_width: int;
  set_map_data(value: PackedFloat32Array): void;
  get_map_data(): PackedFloat32Array;
  set_map_depth(value: int): void;
  get_map_depth(): int;
  set_map_width(value: int): void;
  get_map_width(): int;

  /**
   * Returns the largest height value found in {@link map_data}. Recalculates only when {@link map_data} changes.
   */
  get_max_height(): float;
  /**
   * Returns the smallest height value found in {@link map_data}. Recalculates only when {@link map_data} changes.
   */
  get_min_height(): float;
  /**
   * Updates {@link map_data} with data read from an {@link Image} reference. Automatically resizes heightmap {@link map_width} and {@link map_depth} to fit the full image width and height.
   * The image needs to be in either {@link Image.FORMAT_RF} (32 bit), {@link Image.FORMAT_RH} (16 bit), or {@link Image.FORMAT_R8} (8 bit).
   * Each image pixel is read in as a float on the range from `0.0` (black pixel) to `1.0` (white pixel). This range value gets remapped to `height_min` and `height_max` to form the final height value.
   * **Note:** Using a heightmap with 16-bit or 32-bit data, stored in EXR or HDR format is recommended. Using 8-bit height data, or a format like PNG that Godot imports as 8-bit, will result in a terraced terrain.
   */
  update_map_data_from_image(image: Image, height_min: float, height_max: float): void;
}
