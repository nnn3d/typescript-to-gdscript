// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

declare class ImporterMeshInstance3D<Tree extends object = any> extends Node3D<Tree> {
  cast_shadow: int;
  layer_mask: int;
  mesh: ImporterMesh;
  skeleton_path: string;
  skin: Skin;
  visibility_range_begin: float;
  visibility_range_begin_margin: float;
  visibility_range_end: float;
  visibility_range_end_margin: float;
  visibility_range_fade_mode: int;
  set_cast_shadows_setting(value: int): void;
  get_cast_shadows_setting(): int;
  set_layer_mask(value: int): void;
  get_layer_mask(): int;
  set_mesh(value: ImporterMesh): void;
  get_mesh(): ImporterMesh;
  set_skeleton_path(value: string): void;
  get_skeleton_path(): string;
  set_skin(value: Skin): void;
  get_skin(): Skin;
  set_visibility_range_begin(value: float): void;
  get_visibility_range_begin(): float;
  set_visibility_range_begin_margin(value: float): void;
  get_visibility_range_begin_margin(): float;
  set_visibility_range_end(value: float): void;
  get_visibility_range_end(): float;
  set_visibility_range_end_margin(value: float): void;
  get_visibility_range_end_margin(): float;
  set_visibility_range_fade_mode(value: int): void;
  get_visibility_range_fade_mode(): int;
}
