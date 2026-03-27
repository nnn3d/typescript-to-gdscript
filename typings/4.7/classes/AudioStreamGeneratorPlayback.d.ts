// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Plays back audio generated using {@link AudioStreamGenerator}. */
declare class AudioStreamGeneratorPlayback extends AudioStreamPlaybackResampled {
  /**
   * Returns `true` if a buffer of the size `amount` can be pushed to the audio sample data buffer without overflowing it, `false` otherwise.
   */
  can_push_buffer(amount: int): boolean;
  /** Clears the audio sample data buffer. */
  clear_buffer(): void;
  /**
   * Returns the number of frames that can be pushed to the audio sample data buffer without overflowing it. If the result is `0`, the buffer is full.
   */
  get_frames_available(): int;
  /**
   * Returns the number of times the playback skipped due to a buffer underrun in the audio sample data. This value is reset at the start of the playback.
   */
  get_skips(): int;
  /**
   * Pushes several audio data frames to the buffer. This is usually more efficient than {@link push_frame} in C# and compiled languages via GDExtension, but {@link push_buffer} may be *less* efficient in GDScript.
   */
  push_buffer(frames: PackedVector2Array): boolean;
  /**
   * Pushes a single audio data frame to the buffer. This is usually less efficient than {@link push_buffer} in C# and compiled languages via GDExtension, but {@link push_frame} may be *more* efficient in GDScript.
   */
  push_frame(frame: Vector2): boolean;
}
