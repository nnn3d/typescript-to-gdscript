// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Boolean matrix. */
declare class BitMap extends Resource {
  /**
   * Returns an image of the same size as the bitmap and with an {@link Image.Format} of type {@link Image.FORMAT_L8}. `true` bits of the bitmap are being converted into white pixels, and `false` bits into black.
   */
  convert_to_image(): Image;
  /** Creates a bitmap with the specified size, filled with `false`. */
  create(size: Vector2i): void;
  /**
   * Creates a bitmap that matches the given image dimensions, every element of the bitmap is set to `false` if the alpha value of the image at that position is equal to `threshold` or less, and `true` in other case.
   */
  create_from_image_alpha(image: Image, threshold?: float): void;
  /** Returns bitmap's value at the specified position. */
  get_bit(x: int, y: int): boolean;
  /** Returns bitmap's value at the specified position. */
  get_bitv(position: Vector2i): boolean;
  /** Returns bitmap's dimensions. */
  get_size(): Vector2i;
  /** Returns the number of bitmap elements that are set to `true`. */
  get_true_bit_count(): int;
  /**
   * Applies morphological dilation or erosion to the bitmap. If `pixels` is positive, dilation is applied to the bitmap. If `pixels` is negative, erosion is applied to the bitmap. `rect` defines the area where the morphological operation is applied. Pixels located outside the `rect` are unaffected by {@link grow_mask}.
   */
  grow_mask(pixels: int, rect: Rect2i): void;
  /**
   * Creates an {@link Array} of polygons covering a rectangular portion of the bitmap. It uses a marching squares algorithm, followed by Ramer-Douglas-Peucker (RDP) reduction of the number of vertices. Each polygon is described as a {@link PackedVector2Array} of its vertices.
   * To get polygons covering the whole bitmap, pass:
   * `epsilon` is passed to RDP to control how accurately the polygons cover the bitmap: a lower `epsilon` corresponds to more points in the polygons.
   */
  opaque_to_polygons(rect: Rect2i, epsilon?: float): Array<PackedVector2Array>;
  /** Resizes the image to `new_size`. */
  resize(new_size: Vector2i): void;
  /** Sets the bitmap's element at the specified position, to the specified value. */
  set_bit(x: int, y: int, bit: boolean): void;
  /** Sets a rectangular portion of the bitmap to the specified value. */
  set_bit_rect(rect: Rect2i, bit: boolean): void;
  /** Sets the bitmap's element at the specified position, to the specified value. */
  set_bitv(position: Vector2i, bit: boolean): void;
}
