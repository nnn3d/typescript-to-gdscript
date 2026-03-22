// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Simple texture that uses a mesh to draw itself. */
declare class MeshTexture extends Texture2D {
  /** Sets the base texture that the Mesh will use to draw. */
  base_texture: Texture2D;
  /** Sets the size of the image, needed for reference. */
  image_size: Vector2;
  /** Sets the mesh used to draw. It must be a mesh using 2D vertices. */
  mesh: Mesh;
  resource_local_to_scene: boolean;
  set_base_texture(value: Texture2D): void;
  get_base_texture(): Texture2D;
  set_image_size(value: Vector2): void;
  get_image_size(): Vector2;
  set_mesh(value: Mesh): void;
  get_mesh(): Mesh;
}
