// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A reference-counted holder object for a skeleton RID used in the {@link RenderingServer}. */
declare class SkinReference extends RefCounted {
  /**
   * Returns the {@link RID} owned by this SkinReference, as returned by {@link RenderingServer.skeleton_create}.
   */
  get_skeleton(): RID;
  /**
   * Returns the {@link Skin} connected to this SkinReference. In the case of {@link MeshInstance3D} with no {@link MeshInstance3D.skin} assigned, this will reference an internal default {@link Skin} owned by that {@link MeshInstance3D}.
   * Note that a single {@link Skin} may have more than one {@link SkinReference} in the case that it is shared by meshes across multiple {@link Skeleton3D} nodes.
   */
  get_skin(): Skin | null;
}
