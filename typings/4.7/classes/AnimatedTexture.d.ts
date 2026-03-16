// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Proxy texture for simple frame-based animations. */
declare class AnimatedTexture extends Texture2D {
  /**
   * Sets the currently visible frame of the texture. Setting this frame while playing resets the current frame time, so the newly selected frame plays for its whole configured frame duration.
   */
  current_frame: int;
  /**
   * Number of frames to use in the animation. While you can create the frames independently with {@link set_frame_texture}, you need to set this value for the animation to take new frames into account. The maximum number of frames is {@link MAX_FRAMES}.
   */
  frames: int;
  /**
   * If `true`, the animation will only play once and will not loop back to the first frame after reaching the end. Note that reaching the end will not set {@link pause} to `true`.
   */
  one_shot: boolean;
  /**
   * If `true`, the animation will pause where it currently is (i.e. at {@link current_frame}). The animation will continue from where it was paused when changing this property to `false`.
   */
  pause: boolean;
  /**
   * <member name="speed_scale" type="float" setter="set_speed_scale" getter="get_speed_scale" default="1.0">
   * The animation speed is multiplied by this value. If set to a negative value, the animation is played in reverse.
   */
  resource_local_to_scene: boolean;

  /** Returns the given `frame`'s duration, in seconds. */
  get_frame_duration(frame: int): float;
  /** Returns the given frame's {@link Texture2D}. */
  get_frame_texture(frame: int): Texture2D;
  /**
   * Sets the duration of any given `frame`. The final duration is affected by the {@link speed_scale}. If set to `0`, the frame is skipped during playback.
   */
  set_frame_duration(frame: int, duration: float): void;
  /**
   * Assigns a {@link Texture2D} to the given frame. Frame IDs start at 0, so the first frame has ID 0, and the last frame of the animation has ID {@link frames} - 1.
   * You can define any number of textures up to {@link MAX_FRAMES}, but keep in mind that only frames from 0 to {@link frames} - 1 will be part of the animation.
   */
  set_frame_texture(frame: int, texture: Texture2D): void;

  /**
   * The maximum number of frames supported by {@link AnimatedTexture}. If you need more frames in your animation, use {@link AnimationPlayer} or {@link AnimatedSprite2D}.
   */
  static readonly MAX_FRAMES: int;
}
