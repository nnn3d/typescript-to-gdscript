// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

declare class Skin extends Resource {
  add_bind(bone: int, pose: Transform3D): void;
  add_named_bind(name: string, pose: Transform3D): void;
  clear_binds(): void;
  get_bind_bone(bind_index: int): int;
  get_bind_count(): int;
  get_bind_name(bind_index: int): string;
  get_bind_pose(bind_index: int): Transform3D;
  set_bind_bone(bind_index: int, bone: int): void;
  set_bind_count(bind_count: int): void;
  set_bind_name(bind_index: int, name: string): void;
  set_bind_pose(bind_index: int, pose: Transform3D): void;
}
