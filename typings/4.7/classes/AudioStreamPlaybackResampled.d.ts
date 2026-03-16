// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Playback class used for resampled {@link AudioStream}s. */
declare class AudioStreamPlaybackResampled extends AudioStreamPlayback {
  /** Returns an {@link AudioStream}'s sample rate, in Hz. Used to perform resampling. */
  _get_stream_sampling_rate(): float;
  /**
   * Called by {@link begin_resample} to mix an {@link AudioStream} to {@link AudioServer.get_mix_rate}. Uses {@link _get_stream_sampling_rate} as the source sample rate. Returns the number of mixed frames.
   */
  _mix_resampled(dst_buffer: unknown, frame_count: int): int;
  /**
   * Called when an {@link AudioStream} is played. Clears the cubic interpolation history and starts mixing by calling {@link _mix_resampled}.
   */
  begin_resample(): void;
}
