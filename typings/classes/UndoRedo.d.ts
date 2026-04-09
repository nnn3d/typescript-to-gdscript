// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides a high-level interface for implementing undo and redo operations. */
declare class UndoRedo extends GodotObject {
  /**
   * The maximum number of steps that can be stored in the undo/redo history. If the number of stored steps exceeds this limit, older steps are removed from history and can no longer be reached by calling {@link undo}. A value of `0` or lower means no limit.
   */
  max_steps: int;
  set_max_steps(value: int): void;
  get_max_steps(): int;

  /** Register a {@link Callable} that will be called when the action is committed. */
  add_do_method(callable: Callable): void;
  /** Register a `property` that would change its value to `value` when the action is committed. */
  add_do_property(object: GodotObject, property: string, value: unknown): void;
  /**
   * Register a reference to an object that will be erased if the "do" history is deleted. This is useful for objects added by the "do" action and removed by the "undo" action.
   * When the "do" history is deleted, if the object is a {@link RefCounted}, it will be unreferenced. Otherwise, it will be freed. Do not use for resources.
   */
  add_do_reference(object: GodotObject): void;
  /** Register a {@link Callable} that will be called when the action is undone. */
  add_undo_method(callable: Callable): void;
  /** Register a `property` that would change its value to `value` when the action is undone. */
  add_undo_property(object: GodotObject, property: string, value: unknown): void;
  /**
   * Register a reference to an object that will be erased if the "undo" history is deleted. This is useful for objects added by the "undo" action and removed by the "do" action.
   * When the "undo" history is deleted, if the object is a {@link RefCounted}, it will be unreferenced. Otherwise, it will be freed. Do not use for resources.
   */
  add_undo_reference(object: GodotObject): void;
  /**
   * Clear the undo/redo history and associated references.
   * Passing `false` to `increase_version` will prevent the version number from increasing when the history is cleared.
   */
  clear_history(increase_version?: boolean): void;
  /**
   * Commit the action. If `execute` is `true` (which it is by default), all "do" methods/properties are called/set when this function is called.
   */
  commit_action(execute?: boolean): void;
  /**
   * Create a new action. After this is called, do all your calls to {@link add_do_method}, {@link add_undo_method}, {@link add_do_property}, and {@link add_undo_property}, then commit the action with {@link commit_action}.
   * The way actions are merged is dictated by `merge_mode`.
   * The way undo operation are ordered in actions is dictated by `backward_undo_ops`. When `backward_undo_ops` is `false` undo option are ordered in the same order they were added. Which means the first operation to be added will be the first to be undone.
   */
  create_action(name: string, merge_mode: int, backward_undo_ops?: boolean): void;
  /**
   * Stops marking operations as to be processed even if the action gets merged with another in the {@link MERGE_ENDS} mode. See {@link start_force_keep_in_merge_ends}.
   */
  end_force_keep_in_merge_ends(): void;
  /** Gets the action name from its index. */
  get_action_name(id: int): string;
  /** Gets the index of the current action. */
  get_current_action(): int;
  /** Gets the name of the current action, equivalent to `get_action_name(get_current_action())`. */
  get_current_action_name(): string;
  /** Returns how many elements are in the history. */
  get_history_count(): int;
  /**
   * Gets the version. Every time a new action is committed, the {@link UndoRedo}'s version number is increased automatically.
   * This is useful mostly to check if something changed from a saved version.
   */
  get_version(): int;
  /** Returns `true` if a "redo" action is available. */
  has_redo(): boolean;
  /** Returns `true` if an "undo" action is available. */
  has_undo(): boolean;
  /**
   * Returns `true` if the {@link UndoRedo} is currently committing the action, i.e. running its "do" method or property change (see {@link commit_action}).
   */
  is_committing_action(): boolean;
  /** Redo the last action. */
  redo(): boolean;
  /**
   * Marks the next "do" and "undo" operations to be processed even if the action gets merged with another in the {@link MERGE_ENDS} mode. Return to normal operation using {@link end_force_keep_in_merge_ends}.
   */
  start_force_keep_in_merge_ends(): void;
  /** Undo the last action. */
  undo(): boolean;

  /** Called when {@link undo} or {@link redo} was called. */
  version_changed: Signal<[]>;

  // enum MergeMode
  /** Makes "do"/"undo" operations stay in separate actions. */
  static readonly MERGE_DISABLE: int;
  /**
   * Merges this action with the previous one if they have the same name. Keeps only the first action's "undo" operations and the last action's "do" operations. Useful for sequential changes to a single value.
   */
  static readonly MERGE_ENDS: int;
  /** Merges this action with the previous one if they have the same name. */
  static readonly MERGE_ALL: int;
}
