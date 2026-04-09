// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A tracked object. */
declare class XRPositionalTracker extends XRTracker {
  /** Defines which hand this tracker relates to. */
  hand: int;
  /**
   * The profile associated with this tracker, interface dependent but will indicate the type of controller being tracked.
   */
  profile: string;
  set_tracker_hand(value: int): void;
  get_tracker_hand(): int;
  set_tracker_profile(value: string): void;
  get_tracker_profile(): string;

  /**
   * Returns an input for this tracker. It can return a boolean, float or {@link Vector2} value depending on whether the input is a button, trigger or thumbstick/thumbpad.
   */
  get_input(name: string): unknown;
  /** Returns the current {@link XRPose} state object for the bound `name` pose. */
  get_pose(name: string): XRPose | null;
  /** Returns `true` if the tracker is available and is currently tracking the bound `name` pose. */
  has_pose(name: string): boolean;
  /**
   * Marks this pose as invalid, we don't clear the last reported state but it allows users to decide if trackers need to be hidden if we lose tracking or just remain at their last known position.
   */
  invalidate_pose(name: string): void;
  /**
   * Changes the value for the given input. This method is called by an {@link XRInterface} implementation and should not be used directly.
   */
  set_input(name: string, value: unknown): void;
  /**
   * Sets the transform, linear velocity, angular velocity and tracking confidence for the given pose. This method is called by an {@link XRInterface} implementation and should not be used directly.
   */
  set_pose(name: string, transform: Transform3D, linear_velocity: Vector3, angular_velocity: Vector3, tracking_confidence: int): void;

  /**
   * Emitted when a button on this tracker is pressed. Note that many XR runtimes allow other inputs to be mapped to buttons.
   */
  button_pressed: Signal<[string]>;
  /** Emitted when a button on this tracker is released. */
  button_released: Signal<[string]>;
  /** Emitted when a trigger or similar input on this tracker changes value. */
  input_float_changed: Signal<[string, float]>;
  /** Emitted when a thumbstick or thumbpad on this tracker moves. */
  input_vector2_changed: Signal<[string, Vector2]>;
  /** Emitted when the state of a pose tracked by this tracker changes. */
  pose_changed: Signal<[XRPose]>;
  /** Emitted when a pose tracked by this tracker stops getting updated tracking data. */
  pose_lost_tracking: Signal<[XRPose]>;
  /** Emitted when the profile of our tracker changes. */
  profile_changed: Signal<[string]>;

  // enum TrackerHand
  /** The hand this tracker is held in is unknown or not applicable. */
  static readonly TRACKER_HAND_UNKNOWN: int;
  /** This tracker is the left hand controller. */
  static readonly TRACKER_HAND_LEFT: int;
  /** This tracker is the right hand controller. */
  static readonly TRACKER_HAND_RIGHT: int;
  /** Represents the size of the {@link TrackerHand} enum. */
  static readonly TRACKER_HAND_MAX: int;
}
