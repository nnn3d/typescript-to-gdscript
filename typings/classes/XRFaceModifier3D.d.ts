// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node for driving standard face meshes from {@link XRFaceTracker} weights. */
declare class XRFaceModifier3D extends Node3D {
  /** The {@link XRFaceTracker} path. */
  face_tracker: string;
  /** The {@link NodePath} of the face {@link MeshInstance3D}. */
  target: NodePath;
  set_face_tracker(value: string): void;
  get_face_tracker(): string;
  set_target(value: NodePath | string): void;
  get_target(): NodePath;
}
