// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A sphere shape collision that interacts with {@link SpringBoneSimulator3D}. */
declare class SpringBoneCollisionSphere3D<Tree extends object = any> extends SpringBoneCollision3D<Tree> {
  /** If `true`, the collision acts to trap the joint within the collision. */
  inside: boolean;
  /** The sphere's radius. */
  radius: float;
  set_inside(value: boolean): void;
  is_inside(): boolean;
  set_radius(value: float): void;
  get_radius(): float;
}
