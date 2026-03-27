// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Node that instances a {@link MultiMesh}. */
declare class MultiMeshInstance3D<Tree extends object = any> extends GeometryInstance3D<Tree> {
  /**
   * The {@link MultiMesh} resource that will be used and shared among all instances of the {@link MultiMeshInstance3D}.
   */
  multimesh: MultiMesh;
  set_multimesh(value: MultiMesh): void;
  get_multimesh(): MultiMesh;
}
