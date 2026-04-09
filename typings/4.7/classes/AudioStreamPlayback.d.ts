// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Meta class for playing back audio. */
declare class AudioStreamPlayback extends RefCounted {
  /**
   * Overridable method. Should return how many times this audio stream has looped. Most built-in playbacks always return `0`.
   */
  _get_loop_count(): int;
  /**
   * Return the current value of a playback parameter by name (see {@link AudioStream._get_parameter_list}).
   */
  _get_parameter(name: string): unknown;
  /** Overridable method. Should return the current progress along the audio stream, in seconds. */
  _get_playback_position(): float;
  /** Overridable method. Should return `true` if this playback is active and playing its audio stream. */
  _is_playing(): boolean;
  /**
   * Override this method to customize how the audio stream is mixed. This method is called even if the playback is not active.
   * **Note:** It is not useful to override this method in GDScript or C#. Only GDExtension can take advantage of it.
   */
  _mix(buffer: unknown, rate_scale: float, frames: int): int;
  /**
   * Override this method to customize what happens when seeking this audio stream at the given `position`, such as by calling {@link AudioStreamPlayer.seek}.
   */
  _seek(position: float): void;
  /**
   * Set the current value of a playback parameter by name (see {@link AudioStream._get_parameter_list}).
   */
  _set_parameter(name: string, value: unknown): void;
  /**
   * Override this method to customize what happens when the playback starts at the given position, such as by calling {@link AudioStreamPlayer.play}.
   */
  _start(from_pos: float): void;
  /**
   * Override this method to customize what happens when the playback is stopped, such as by calling {@link AudioStreamPlayer.stop}.
   */
  _stop(): void;
  /**
   * Overridable method. Called whenever the audio stream is mixed if the playback is active and {@link AudioServer.set_enable_tagging_used_audio_streams} has been set to `true`. Editor plugins may use this method to "tag" the current position along the audio stream and display it in a preview.
   */
  _tag_used_streams(): void;
  /** Returns the number of times the stream has looped. */
  get_loop_count(): int;
  /** Returns the current position in the stream, in seconds. */
  get_playback_position(): float;
  /**
   * Returns the {@link AudioSamplePlayback} associated with this {@link AudioStreamPlayback} for playing back the audio sample of this stream.
   */
  get_sample_playback(): AudioSamplePlayback | null;
  /** Returns `true` if the stream is playing. */
  is_playing(): boolean;
  /**
   * Mixes up to `frames` of audio from the stream from the current position, at a rate of `rate_scale`, advancing the stream.
   * Returns a {@link PackedVector2Array} where each element holds the left and right channel volume levels of each frame.
   * **Note:** Can return fewer frames than requested, make sure to use the size of the return value.
   */
  mix_audio(rate_scale: float, frames: int): PackedVector2Array;
  /** Seeks the stream at the given `time`, in seconds. */
  seek(time?: float): void;
  /**
   * Associates {@link AudioSamplePlayback} to this {@link AudioStreamPlayback} for playing back the audio sample of this stream.
   */
  set_sample_playback(playback_sample: AudioSamplePlayback): void;
  /** Starts the stream from the given `from_pos`, in seconds. */
  start(from_pos?: float): void;
  /** Stops the stream. */
  stop(): void;
}
