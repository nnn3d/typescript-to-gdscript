// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node for driving hand meshes from {@link XRHandTracker} data. */
declare class XRHandModifier3D<Tree extends object = any> extends SkeletonModifier3D<Tree> {
  /** Specifies the type of updates to perform on the bones. */
  bone_update: int;
  /**
   * The name of the {@link XRHandTracker} registered with {@link XRServer} to obtain the hand tracking data from.
   */
  hand_tracker: string;
  set_bone_update(value: int): void;
  get_bone_update(): int;
  set_hand_tracker(value: string): void;
  get_hand_tracker(): string;

  // enum BoneUpdate
  /** The skeleton's bones are fully updated (both position and rotation) to match the tracked bones. */
  static readonly BONE_UPDATE_FULL: int;
  /** The skeleton's bones are only rotated to align with the tracked bones, preserving bone length. */
  static readonly BONE_UPDATE_ROTATION_ONLY: int;
  /** Represents the size of the {@link BoneUpdate} enum. */
  static readonly BONE_UPDATE_MAX: int;
}
