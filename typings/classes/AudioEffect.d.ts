// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for audio effect resources. */
declare class AudioEffect extends Resource {
  /**
   * Override this method to customize the {@link AudioEffectInstance} created when this effect is applied on a bus in the editor's Audio panel, or through {@link AudioServer.add_bus_effect}.
   * **Note:** It is recommended to keep a reference to the original {@link AudioEffect} in the new instance. Depending on the implementation this allows the effect instance to listen for changes at run-time and be modified accordingly.
   */
  _instantiate(): AudioEffectInstance | null;
}
