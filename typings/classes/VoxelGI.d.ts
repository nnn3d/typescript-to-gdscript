// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Real-time global illumination (GI) probe. */
declare class VoxelGI extends VisualInstance3D {
  /**
   * The {@link CameraAttributes} resource that specifies exposure levels to bake at. Auto-exposure and non exposure properties will be ignored. Exposure settings should be used to reduce the dynamic range present when baking. If exposure is too high, the {@link VoxelGI} will have banding artifacts or may have over-exposure artifacts.
   */
  camera_attributes: CameraAttributes | null;
  /** The {@link VoxelGIData} resource that holds the data for this {@link VoxelGI}. */
  data: VoxelGIData | null;
  /**
   * The size of the area covered by the {@link VoxelGI}. This must be `1.0` or greater on each axis.
   * **Note:** If you make the size larger without increasing the number of subdivisions with {@link subdiv}, the size of each cell will increase and result in less detailed lighting.
   */
  size: Vector3;
  /**
   * Number of times to subdivide the grid that the {@link VoxelGI} operates on. A higher number results in finer detail and thus higher visual quality, while lower numbers result in better performance.
   */
  subdiv: int;
  set_camera_attributes(value: CameraAttributes | null): void;
  get_camera_attributes(): CameraAttributes | null;
  set_probe_data(value: VoxelGIData | null): void;
  get_probe_data(): VoxelGIData | null;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;
  set_subdiv(value: int): void;
  get_subdiv(): int;

  /**
   * Bakes the effect from all {@link GeometryInstance3D}s marked with {@link GeometryInstance3D.GI_MODE_STATIC} and {@link Light3D}s marked with either {@link Light3D.BAKE_STATIC} or {@link Light3D.BAKE_DYNAMIC}. If `create_visual_debug` is `true`, after baking the light, this will generate a {@link MultiMesh} that has a cube representing each solid cell with each cube colored to the cell's albedo color. This can be used to visualize the {@link VoxelGI}'s data and debug any issues that may be occurring.
   * **Note:** {@link bake} works from the editor and in exported projects. This makes it suitable for procedurally generated or user-built levels. Baking a {@link VoxelGI} node generally takes from 5 to 20 seconds in most scenes. Reducing {@link subdiv} can speed up baking.
   * **Note:** {@link GeometryInstance3D}s and {@link Light3D}s must be fully ready before {@link bake} is called. If you are procedurally creating those and some meshes or lights are missing from your baked {@link VoxelGI}, use `call_deferred("bake")` instead of calling {@link bake} directly.
   */
  bake(from_node?: Node, create_visual_debug?: boolean): void;
  /** Calls {@link bake} with `create_visual_debug` enabled. */
  debug_bake(): void;

  // enum Subdiv
  /**
   * Use 64 subdivisions. This is the lowest quality setting, but the fastest. Use it if you can, but especially use it on lower-end hardware.
   */
  static readonly SUBDIV_64: int;
  /** Use 128 subdivisions. This is the default quality setting. */
  static readonly SUBDIV_128: int;
  /** Use 256 subdivisions. */
  static readonly SUBDIV_256: int;
  /**
   * Use 512 subdivisions. This is the highest quality setting, but the slowest. On lower-end hardware, this could cause the GPU to stall.
   */
  static readonly SUBDIV_512: int;
  /** Represents the size of the {@link Subdiv} enum. */
  static readonly SUBDIV_MAX: int;
}
