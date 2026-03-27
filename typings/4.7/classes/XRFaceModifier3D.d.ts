// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A node for driving standard face meshes from {@link XRFaceTracker} weights. */
declare class XRFaceModifier3D<Tree extends object = any> extends Node3D<Tree> {
  /** The {@link XRFaceTracker} path. */
  face_tracker: string;
  /** The {@link NodePath} of the face {@link MeshInstance3D}. */
  target: string;
  set_face_tracker(value: string): void;
  get_face_tracker(): string;
  set_target(value: string): void;
  get_target(): string;
}
