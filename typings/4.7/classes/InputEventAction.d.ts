// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An input event type for actions. */
declare class InputEventAction extends InputEvent {
  /**
   * The action's name. This is usually the name of an existing action in the {@link InputMap} which you want this custom event to match.
   */
  action: string;
  /**
   * The real event index in action this event corresponds to (from events defined for this action in the {@link InputMap}). If `-1`, a unique ID will be used and actions pressed with this ID will need to be released with another {@link InputEventAction}.
   */
  event_index: int;
  /** If `true`, the action's state is pressed. If `false`, the action's state is released. */
  pressed: boolean;
  /**
   * The action's strength between 0 and 1. This value is considered as equal to 0 if pressed is `false`. The event strength allows faking analog joypad motion events, by specifying how strongly the joypad axis is bent or pressed.
   */
  strength: float;
  set_action(value: string): void;
  get_action(): string;
  set_event_index(value: int): void;
  get_event_index(): int;
  set_pressed(value: boolean): void;
  set_strength(value: float): void;
  get_strength(): float;
}
