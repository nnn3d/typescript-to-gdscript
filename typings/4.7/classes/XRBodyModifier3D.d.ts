// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node for driving body meshes from {@link XRBodyTracker} data. */
declare class XRBodyModifier3D extends SkeletonModifier3D {
  /**
   * The name of the {@link XRBodyTracker} registered with {@link XRServer} to obtain the body tracking data from.
   */
  body_tracker: string;
  /** Specifies the body parts to update. */
  body_update: int;
  /** Specifies the type of updates to perform on the bones. */
  bone_update: int;
  set_body_tracker(value: string): void;
  get_body_tracker(): string;
  set_body_update(value: int): void;
  get_body_update(): int;
  set_bone_update(value: int): void;
  get_bone_update(): int;

  // enum BodyUpdate
  /** The skeleton's upper body joints are updated. */
  static readonly BODY_UPDATE_UPPER_BODY: int;
  /** The skeleton's lower body joints are updated. */
  static readonly BODY_UPDATE_LOWER_BODY: int;
  /** The skeleton's hand joints are updated. */
  static readonly BODY_UPDATE_HANDS: int;
  // enum BoneUpdate
  /** The skeleton's bones are fully updated (both position and rotation) to match the tracked bones. */
  static readonly BONE_UPDATE_FULL: int;
  /** The skeleton's bones are only rotated to align with the tracked bones, preserving bone length. */
  static readonly BONE_UPDATE_ROTATION_ONLY: int;
  /** Represents the size of the {@link BoneUpdate} enum. */
  static readonly BONE_UPDATE_MAX: int;
}
