// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Manages undo history of scenes opened in the editor. */
declare class EditorUndoRedoManager extends GodotObject {
  /**
   * Register a method that will be called when the action is committed (i.e. the "do" action).
   * If this is the first operation, the `object` will be used to deduce target undo history.
   */
  add_do_method(object: GodotObject, method: string, ...args: any[]): void;
  /**
   * Register a property value change for "do".
   * If this is the first operation, the `object` will be used to deduce target undo history.
   */
  add_do_property(object: GodotObject, property: string, value: unknown): void;
  /**
   * Register a reference for "do" that will be erased if the "do" history is lost. This is useful mostly for new nodes created for the "do" call. Do not use for resources.
   */
  add_do_reference(object: GodotObject): void;
  /**
   * Register a method that will be called when the action is undone (i.e. the "undo" action).
   * If this is the first operation, the `object` will be used to deduce target undo history.
   */
  add_undo_method(object: GodotObject, method: string, ...args: any[]): void;
  /**
   * Register a property value change for "undo".
   * If this is the first operation, the `object` will be used to deduce target undo history.
   */
  add_undo_property(object: GodotObject, property: string, value: unknown): void;
  /**
   * Register a reference for "undo" that will be erased if the "undo" history is lost. This is useful mostly for nodes removed with the "do" call (not the "undo" call!).
   */
  add_undo_reference(object: GodotObject): void;
  /**
   * Clears the given undo history. You can clear history for a specific scene, global history, or for all histories at once (except {@link REMOTE_HISTORY}) if `id` is {@link INVALID_HISTORY}.
   * If `increase_version` is `true`, the undo history version will be increased, marking it as unsaved. Useful for operations that modify the scene, but don't support undo.
   * **Note:** If you want to mark an edited scene as unsaved without clearing its history, use {@link EditorInterface.mark_scene_as_unsaved} instead.
   */
  clear_history(id?: int, increase_version?: boolean): void;
  /**
   * Commits the action. If `execute` is `true` (default), all "do" methods/properties are called/set when this function is called.
   */
  commit_action(execute?: boolean): void;
  /**
   * Create a new action. After this is called, do all your calls to {@link add_do_method}, {@link add_undo_method}, {@link add_do_property}, and {@link add_undo_property}, then commit the action with {@link commit_action}.
   * The way actions are merged is dictated by the `merge_mode` argument.
   * If `custom_context` object is provided, it will be used for deducing target history (instead of using the first operation).
   * The way undo operation are ordered in actions is dictated by `backward_undo_ops`. When `backward_undo_ops` is `false` undo option are ordered in the same order they were added. Which means the first operation to be added will be the first to be undone.
   * If `mark_unsaved` is `false`, the action will not mark the history as unsaved. This is useful for example for actions that change a selection, or a setting that will be saved automatically. Otherwise, this should be left to `true` if the action requires saving by the user or if it can cause data loss when left unsaved.
   */
  create_action(name: string, merge_mode: int, custom_context?: GodotObject, backward_undo_ops?: boolean, mark_unsaved?: boolean): void;
  /**
   * Forces the next operation (e.g. {@link add_do_method}) to use the action's history rather than guessing it from the object. This is sometimes needed when a history can't be correctly determined, like for a nested resource that doesn't have a path yet.
   * This method should only be used when absolutely necessary, otherwise it might cause invalid history state. For most of complex cases, the `custom_context` parameter of {@link create_action} is sufficient.
   */
  force_fixed_history(): void;
  /**
   * Returns the {@link UndoRedo} object associated with the given history `id`.
   * `id` above `0` are mapped to the opened scene tabs (but it doesn't match their order). `id` of `0` or lower have special meaning (see {@link SpecialHistory}).
   * Best used with {@link get_object_history_id}. This method is only provided in case you need some more advanced methods of {@link UndoRedo} (but keep in mind that directly operating on the {@link UndoRedo} object might affect editor's stability).
   */
  get_history_undo_redo(id: int): UndoRedo | null;
  /**
   * Returns the history ID deduced from the given `object`. It can be used with {@link get_history_undo_redo}.
   */
  get_object_history_id(object: GodotObject): int;
  /**
   * Returns `true` if the {@link EditorUndoRedoManager} is currently committing the action, i.e. running its "do" method or property change (see {@link commit_action}).
   */
  is_committing_action(): boolean;

  /**
   * Emitted when the list of actions in any history has changed, either when an action is committed or a history is cleared.
   */
  history_changed: Signal<[]>;
  /** Emitted when the version of any history has changed as a result of undo or redo call. */
  version_changed: Signal<[]>;

  // enum SpecialHistory
  /** Global history not associated with any scene, but with external resources etc. */
  static readonly GLOBAL_HISTORY: int;
  /** History associated with remote inspector. Used when live editing a running project. */
  static readonly REMOTE_HISTORY: int;
  /** Invalid "null" history. It's a special value, not associated with any object. */
  static readonly INVALID_HISTORY: int;
}
