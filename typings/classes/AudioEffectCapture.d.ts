// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Captures audio from an audio bus in real-time. */
declare class AudioEffectCapture extends AudioEffect {
  /**
   * Length of the internal ring buffer, in seconds. Setting the buffer length will have no effect if already initialized.
   */
  buffer_length: float;
  set_buffer_length(value: float): void;
  get_buffer_length(): float;

  /** Returns `true` if at least `frames` audio frames are available to read in the internal ring buffer. */
  can_get_buffer(frames: int): boolean;
  /**
   * Clears the internal ring buffer.
   * **Note:** Calling this during a capture can cause the loss of samples which causes popping in the playback.
   */
  clear_buffer(): void;
  /**
   * Gets the next `frames` audio samples from the internal ring buffer.
   * Returns a {@link PackedVector2Array} containing exactly `frames` audio samples if available, or an empty {@link PackedVector2Array} if insufficient data was available.
   * The samples are signed floating-point PCM between `-1` and `1`. You will have to scale them if you want to use them as 8 or 16-bit integer samples. (`v = 0x7fff * samples[0].x`)
   */
  get_buffer(frames: int): PackedVector2Array;
  /** Returns the total size of the internal ring buffer in frames. */
  get_buffer_length_frames(): int;
  /** Returns the number of audio frames discarded from the audio bus due to full buffer. */
  get_discarded_frames(): int;
  /** Returns the number of frames available to read using {@link get_buffer}. */
  get_frames_available(): int;
  /** Returns the number of audio frames inserted from the audio bus. */
  get_pushed_frames(): int;
}
