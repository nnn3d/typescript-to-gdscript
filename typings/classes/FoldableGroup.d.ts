// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A group of foldable containers that doesn't allow more than one container to be expanded at a time. */
declare class FoldableGroup extends Resource {
  /** If `true`, it is possible to fold all containers in this FoldableGroup. */
  allow_folding_all: boolean;
  resource_local_to_scene: boolean;
  set_allow_folding_all(value: boolean): void;
  is_allow_folding_all(): boolean;

  /**
   * Returns an {@link Array} of {@link FoldableContainer}s that have this as their FoldableGroup (see {@link FoldableContainer.foldable_group}). This is equivalent to {@link ButtonGroup} but for FoldableContainers.
   */
  get_containers(): Array<FoldableContainer>;
  /** Returns the current expanded container. */
  get_expanded_container(): FoldableContainer | null;

  /** Emitted when one of the containers of the group is expanded. */
  expanded: Signal<[FoldableContainer]>;
}
