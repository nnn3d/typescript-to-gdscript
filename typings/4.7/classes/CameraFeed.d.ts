// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A camera feed gives you access to a single physical camera attached to your device. */
declare class CameraFeed extends RefCounted {
  /** If `true`, the feed is active. */
  feed_is_active: boolean;
  /** The transform applied to the camera's image. */
  feed_transform: Transform2D;
  /** Formats supported by the feed. Each entry is a {@link Dictionary} describing format parameters. */
  formats: Array<unknown>;

  /** Called when the camera feed is activated. */
  _activate_feed(): boolean;
  /** Called when the camera feed is deactivated. */
  _deactivate_feed(): void;
  /** Override this method to define supported formats of the camera feed. */
  _get_formats(): Array<unknown>;
  /** Override this method to set the format of the camera feed. */
  _set_format(index: int, parameters: Dictionary): boolean;
  /** Returns feed image data type. */
  get_datatype(): int;
  /** Returns the unique ID for this feed. */
  get_id(): int;
  /** Returns the camera's name. */
  get_name(): string;
  /** Returns the position of camera on the device. */
  get_position(): int;
  /**
   * Returns the texture backend ID (usable by some external libraries that need a handle to a texture to write data).
   */
  get_texture_tex_id(feed_image_type: int): int;
  /** Sets the feed as external feed provided by another library. */
  set_external(width: int, height: int): void;
  /**
   * Sets the feed format parameters for the given `index` in the {@link formats} array. Returns `true` on success. By default, the YUYV encoded stream is transformed to {@link FEED_RGB}. The YUYV encoded stream output format can be changed by setting `parameters`'s `output` entry to one of the following:
   * - `"separate"` will result in {@link FEED_YCBCR_SEP};
   * - `"grayscale"` will result in desaturated {@link FEED_RGB};
   * - `"copy"` will result in {@link FEED_YCBCR}.
   */
  set_format(index: int, parameters: Dictionary): boolean;
  /** Sets the camera's name. */
  set_name(name: string): void;
  /** Sets the position of this camera. */
  set_position(position: int): void;
  /** Sets RGB image for this feed. */
  set_rgb_image(rgb_image: Image): void;
  /** Sets YCbCr image for this feed. */
  set_ycbcr_image(ycbcr_image: Image): void;
  /** Sets Y and CbCr images for this feed. */
  set_ycbcr_images(y_image: Image, cbcr_image: Image): void;

  /** Emitted when the format has changed. */
  format_changed: Signal<[]>;
  /** Emitted when a new frame is available. */
  frame_changed: Signal<[]>;

  // enum FeedDataType
  /** No image set for the feed. */
  static readonly FEED_NOIMAGE: int;
  /** Feed supplies RGB images. */
  static readonly FEED_RGB: int;
  /** Feed supplies YCbCr images that need to be converted to RGB. */
  static readonly FEED_YCBCR: int;
  /** Feed supplies separate Y and CbCr images that need to be combined and converted to RGB. */
  static readonly FEED_YCBCR_SEP: int;
  /** Feed supplies external image. */
  static readonly FEED_EXTERNAL: int;
  // enum FeedPosition
  /** Unspecified position. */
  static readonly FEED_UNSPECIFIED: int;
  /** Camera is mounted at the front of the device. */
  static readonly FEED_FRONT: int;
  /** Camera is mounted at the back of the device. */
  static readonly FEED_BACK: int;
}
