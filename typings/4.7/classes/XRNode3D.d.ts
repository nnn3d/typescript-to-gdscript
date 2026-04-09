// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 3D node that has its position automatically updated by the {@link XRServer}. */
declare class XRNode3D extends Node3D {
  /**
   * <member name="pose" type="StringName" setter="set_pose_name" getter="get_pose_name" default="&&quot;default&quot;">
   * The name of the pose we're bound to. Which poses a tracker supports is not known during design time.
   * Godot defines number of standard pose names such as `aim` and `grip` but other may be configured within a given {@link XRInterface}.
   */
  physics_interpolation_mode: int;
  /** Enables showing the node when tracking starts, and hiding the node when tracking is lost. */
  show_when_tracked: boolean;
  /**
   * The name of the tracker we're bound to. Which trackers are available is not known during design time.
   * Godot defines a number of standard trackers such as `left_hand` and `right_hand` but others may be configured within a given {@link XRInterface}.
   */
  tracker: string;
  set_show_when_tracked(value: boolean): void;
  get_show_when_tracked(): boolean;
  set_tracker(value: string): void;
  get_tracker(): string;

  /** Returns `true` if the {@link tracker} has current tracking data for the {@link pose} being tracked. */
  get_has_tracking_data(): boolean;
  /** Returns `true` if the {@link tracker} has been registered and the {@link pose} is being tracked. */
  get_is_active(): boolean;
  /**
   * Returns the {@link XRPose} containing the current state of the pose being tracked. This gives access to additional properties of this pose.
   */
  get_pose(): XRPose | null;
  /**
   * Triggers a haptic pulse on a device associated with this interface.
   * `action_name` is the name of the action for this pulse.
   * `frequency` is the frequency of the pulse, set to `0.0` to have the system use a default frequency.
   * `amplitude` is the amplitude of the pulse between `0.0` and `1.0`.
   * `duration_sec` is the duration of the pulse in seconds.
   * `delay_sec` is a delay in seconds before the pulse is given.
   */
  trigger_haptic_pulse(action_name: string, frequency: float, amplitude: float, duration_sec: float, delay_sec: float): void;

  /**
   * Emitted when the {@link tracker} starts or stops receiving updated tracking data for the {@link pose} being tracked. The `tracking` argument indicates whether the tracker is getting updated tracking data.
   */
  tracking_changed: Signal<[boolean]>;
}
