// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A control used for video playback. */
declare class VideoStreamPlayer<Tree extends object = any> extends Control<Tree> {
  /** The embedded audio track to play. */
  audio_track: int;
  /** If `true`, playback starts when the scene loads. */
  autoplay: boolean;
  /** Amount of time in milliseconds to store in buffer while playing. */
  buffering_msec: int;
  /** Audio bus to use for sound playback. */
  bus: string;
  /**
   * If `true`, the video scales to the control size. Otherwise, the control minimum size will be automatically adjusted to match the video stream's dimensions.
   */
  expand: boolean;
  /** If `true`, the video restarts when it reaches its end. */
  loop: boolean;
  /** If `true`, the video is paused. */
  paused: boolean;
  /**
   * The stream's current speed scale. `1.0` is the normal speed, while `2.0` is double speed and `0.5` is half speed. A speed scale of `0.0` pauses the video, similar to setting {@link paused} to `true`.
   */
  speed_scale: float;
  /** The assigned video stream. See description for supported formats. */
  stream: VideoStream;
  /** The current position of the stream, in seconds. */
  stream_position: float;
  /** Audio volume as a linear value. */
  volume: float;
  /** Audio volume in dB. */
  volume_db: float;
  set_audio_track(value: int): void;
  get_audio_track(): int;
  set_autoplay(value: boolean): void;
  has_autoplay(): boolean;
  set_buffering_msec(value: int): void;
  get_buffering_msec(): int;
  set_bus(value: string): void;
  get_bus(): string;
  set_expand(value: boolean): void;
  has_expand(): boolean;
  set_loop(value: boolean): void;
  has_loop(): boolean;
  set_paused(value: boolean): void;
  is_paused(): boolean;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;
  set_stream(value: VideoStream): void;
  get_stream(): VideoStream;
  set_stream_position(value: float): void;
  get_stream_position(): float;
  set_volume(value: float): void;
  get_volume(): float;
  set_volume_db(value: float): void;
  get_volume_db(): float;

  /** The length of the current stream, in seconds. */
  get_stream_length(): float;
  /** Returns the video stream's name, or `"<No Stream>"` if no video stream is assigned. */
  get_stream_name(): string;
  /** Returns the current frame as a {@link Texture2D}. */
  get_video_texture(): Texture2D;
  /**
   * Returns `true` if the video is playing.
   * **Note:** The video is still considered playing if paused during playback.
   */
  is_playing(): boolean;
  /**
   * Starts the video playback from the beginning. If the video is paused, this will not unpause the video.
   */
  play(): void;
  /**
   * Stops the video playback and sets the stream position to 0.
   * **Note:** Although the stream position will be set to 0, the first frame of the video stream won't become the current frame.
   */
  stop(): void;

  /** Emitted when playback is finished. */
  finished: Signal<[]>;
}
