// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A tracked object. */
declare class XRTracker extends RefCounted {
  /** The description of this tracker. */
  description: string;
  /**
   * The unique name of this tracker. The trackers that are available differ between various XR runtimes and can often be configured by the user. Godot maintains a number of reserved names that it expects the {@link XRInterface} to implement if applicable:
   * - `"head"` identifies the {@link XRPositionalTracker} of the player's head
   * - `"left_hand"` identifies the {@link XRControllerTracker} in the player's left hand
   * - `"right_hand"` identifies the {@link XRControllerTracker} in the player's right hand
   * - `"/user/hand_tracker/left"` identifies the {@link XRHandTracker} for the player's left hand
   * - `"/user/hand_tracker/right"` identifies the {@link XRHandTracker} for the player's right hand
   * - `"/user/body_tracker"` identifies the {@link XRBodyTracker} for the player's body
   * - `"/user/face_tracker"` identifies the {@link XRFaceTracker} for the player's face
   */
  name: string;
  /** The type of tracker. */
  type: int;
  set_tracker_desc(value: string | NodePath): void;
  get_tracker_desc(): string;
  set_tracker_name(value: string): void;
  get_tracker_name(): string;
  set_tracker_type(value: int): void;
  get_tracker_type(): int;
}
