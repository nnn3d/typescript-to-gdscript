// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Container for {@link Animation} resources. */
declare class AnimationLibrary extends Resource {
  /** Adds the `animation` to the library, accessible by the key `name`. */
  add_animation(name: string, animation: Animation): int;
  /**
   * Returns the {@link Animation} with the key `name`. If the animation does not exist, `null` is returned and an error is logged.
   */
  get_animation(name: string): Animation;
  /** Returns the keys for the {@link Animation}s stored in the library. */
  get_animation_list(): unknown;
  /** Returns the key count for the {@link Animation}s stored in the library. */
  get_animation_list_size(): int;
  /** Returns `true` if the library stores an {@link Animation} with `name` as the key. */
  has_animation(name: string): boolean;
  /** Removes the {@link Animation} with the key `name`. */
  remove_animation(name: string): void;
  /** Changes the key of the {@link Animation} associated with the key `name` to `newname`. */
  rename_animation(name: string, newname: string): void;

  /** Emitted when an {@link Animation} is added, under the key `name`. */
  animation_added: Signal<[string]>;
  /**
   * Emitted when there's a change in one of the animations, e.g. tracks are added, moved or have changed paths. `name` is the key of the animation that was changed.
   * See also {@link Resource.changed}, which this acts as a relay for.
   */
  animation_changed: Signal<[string]>;
  /** Emitted when an {@link Animation} stored with the key `name` is removed. */
  animation_removed: Signal<[string]>;
  /** Emitted when the key for an {@link Animation} is changed, from `name` to `to_name`. */
  animation_renamed: Signal<[string, string]>;
}
