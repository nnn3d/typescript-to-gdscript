// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A singleton that manages all {@link InputEventAction}s. */
declare interface InputMap extends GodotObject {
  /** Adds an {@link InputEvent} to an action. This {@link InputEvent} will trigger the action. */
  action_add_event(action: string, event: InputEvent): void;
  /** Removes an {@link InputEvent} from an action. */
  action_erase_event(action: string, event: InputEvent): void;
  /** Removes all events from an action. */
  action_erase_events(action: string): void;
  /** Returns a deadzone value for the action. */
  action_get_deadzone(action: string): float;
  /**
   * Returns an array of {@link InputEvent}s associated with a given action.
   * **Note:** When used in the editor (e.g. a tool script or {@link EditorPlugin}), this method will return events for the editor action. If you want to access your project's input binds from the editor, read the `input/*` settings from {@link ProjectSettings}.
   */
  action_get_events(action: string): unknown;
  /** Returns `true` if the action has the given {@link InputEvent} associated with it. */
  action_has_event(action: string, event: InputEvent): boolean;
  /** Sets a deadzone value for the action. */
  action_set_deadzone(action: string, deadzone: float): void;
  /**
   * Adds an empty action to the {@link InputMap} with a configurable `deadzone`.
   * An {@link InputEvent} can then be added to this action with {@link action_add_event}.
   */
  add_action(action: string, deadzone?: float): void;
  /** Removes an action from the {@link InputMap}. */
  erase_action(action: string): void;
  /**
   * Returns `true` if the given event is part of an existing action. This method ignores keyboard modifiers if the given {@link InputEvent} is not pressed (for proper release detection). See {@link action_has_event} if you don't want this behavior.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  event_is_action(event: InputEvent, action: string, exact_match?: boolean): boolean;
  /** Returns the human-readable description of the given action. */
  get_action_description(action: string): string;
  /** Returns an array of all actions in the {@link InputMap}. */
  get_actions(): unknown;
  /** Returns `true` if the {@link InputMap} has a registered action with the given name. */
  has_action(action: string): boolean;
  /**
   * Clears all {@link InputEventAction} in the {@link InputMap} and load it anew from {@link ProjectSettings}.
   */
  load_from_project_settings(): void;

  /** Emitted when the {@link ProjectSettings} {@link InputMap} has been loaded. */
  project_settings_loaded: Signal<[]>;
}
declare const InputMap: InputMap;

