// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Server keeping track of different cameras accessible in Godot. */
declare interface CameraServer extends GodotObject {
  /**
   * If `true`, the server is actively monitoring available camera feeds.
   * This has a performance cost, so only set it to `true` when you're actively accessing the camera.
   * **Note:** After setting it to `true`, you can receive updated camera feeds through the {@link camera_feeds_updated} signal.
   */
  monitoring_feeds: boolean;

  /** Adds the camera `feed` to the camera server. */
  add_feed(feed: CameraFeed): void;
  /** Returns an array of {@link CameraFeed}s. */
  feeds(): unknown;
  /** Returns the {@link CameraFeed} corresponding to the camera with the given `index`. */
  get_feed(index: int): CameraFeed;
  /** Returns the number of {@link CameraFeed}s registered. */
  get_feed_count(): int;
  /** Removes the specified camera `feed`. */
  remove_feed(feed: CameraFeed): void;

  /** Emitted when a {@link CameraFeed} is added (e.g. a webcam is plugged in). */
  camera_feed_added: Signal<[int]>;
  /** Emitted when a {@link CameraFeed} is removed (e.g. a webcam is unplugged). */
  camera_feed_removed: Signal<[int]>;
  /** Emitted when camera feeds are updated. */
  camera_feeds_updated: Signal<[]>;

  // enum FeedImage
  /** The RGBA camera image. */
  readonly FEED_RGBA_IMAGE: int;
  /** The YCbCr (https://en.wikipedia.org/wiki/YCbCr) camera image. */
  readonly FEED_YCBCR_IMAGE: int;
  /** The Y component camera image. */
  readonly FEED_Y_IMAGE: int;
  /** The CbCr component camera image. */
  readonly FEED_CBCR_IMAGE: int;
}
declare const CameraServer: CameraServer;

