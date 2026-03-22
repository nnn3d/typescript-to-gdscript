// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** This object contains all data related to a pose on a tracked object. */
declare class XRPose extends RefCounted {
  /** The angular velocity for this pose. */
  angular_velocity: Vector3;
  /**
   * If `true` our tracking data is up to date. If `false` we're no longer receiving new tracking data and our state is whatever that last valid state was.
   */
  has_tracking_data: boolean;
  /** The linear velocity of this pose. */
  linear_velocity: Vector3;
  /**
   * The name of this pose. Usually, this name is derived from an action map set up by the user. Godot also suggests some pose names that {@link XRInterface} objects are expected to implement:
   * - `root` is the root location, often used for tracked objects that do not have further nodes.
   * - `aim` is the tip of a controller with its orientation pointing outwards, often used for raycasts.
   * - `grip` is the location where the user grips the controller.
   * - `skeleton` is the root location for a hand mesh, when using hand tracking and an animated skeleton is supplied by the XR runtime.
   */
  name: string;
  /**
   * The tracking confidence for this pose, provides insight on how accurate the spatial positioning of this record is.
   */
  tracking_confidence: int;
  /** The transform containing the original and transform as reported by the XR runtime. */
  transform: Transform3D;
  set_angular_velocity(value: Vector3): void;
  get_angular_velocity(): Vector3;
  set_has_tracking_data(value: boolean): void;
  get_has_tracking_data(): boolean;
  set_linear_velocity(value: Vector3): void;
  get_linear_velocity(): Vector3;
  set_name(value: string): void;
  get_name(): string;
  set_tracking_confidence(value: int): void;
  get_tracking_confidence(): int;
  set_transform(value: Transform3D): void;
  get_transform(): Transform3D;

  /**
   * Returns the {@link transform} with world scale and our reference frame applied. This is the transform used to position {@link XRNode3D} objects.
   */
  get_adjusted_transform(): Transform3D;

  // enum TrackingConfidence
  /** No tracking information is available for this pose. */
  static readonly XR_TRACKING_CONFIDENCE_NONE: int;
  /**
   * Tracking information may be inaccurate or estimated. For example, with inside out tracking this would indicate a controller may be (partially) obscured.
   */
  static readonly XR_TRACKING_CONFIDENCE_LOW: int;
  /** Tracking information is considered accurate and up to date. */
  static readonly XR_TRACKING_CONFIDENCE_HIGH: int;
}
