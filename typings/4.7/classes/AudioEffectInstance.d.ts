// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Manipulates the audio it receives for a given effect. */
declare class AudioEffectInstance extends RefCounted {
  /**
   * Called by the {@link AudioServer} to process this effect. When {@link _process_silence} is not overridden or it returns `false`, this method is called only when the bus is active.
   * **Note:** It is not useful to override this method in GDScript or C#. Only GDExtension can take advantage of it.
   */
  _process(src_buffer: void, dst_buffer: unknown, frame_count: int): void;
  /**
   * Override this method to customize the processing behavior of this effect instance.
   * Should return `true` to force the {@link AudioServer} to always call {@link _process}, even if the bus has been muted or cannot otherwise be heard.
   */
  _process_silence(): boolean;
}
