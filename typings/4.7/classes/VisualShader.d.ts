// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A custom shader program with a visual editor. */
declare class VisualShader extends Shader {
  /** Deprecated. */
  graph_offset: Vector2;

  /** Adds the specified `node` to the shader. */
  add_node(type_: int, node: VisualShaderNode, position: Vector2, id: int): void;
  /** Adds a new varying value node to the shader. */
  add_varying(name: string, mode: int, type_: int): void;
  /** Attaches the given node to the given frame. */
  attach_node_to_frame(type_: int, id: int, frame: int): void;
  /** Returns `true` if the specified nodes and ports can be connected together. */
  can_connect_nodes(type_: int, from_node: int, from_port: int, to_node: int, to_port: int): boolean;
  /** Connects the specified nodes and ports. */
  connect_nodes(type_: int, from_node: int, from_port: int, to_node: int, to_port: int): int;
  /**
   * Connects the specified nodes and ports, even if they can't be connected. Such connection is invalid and will not function properly.
   */
  connect_nodes_forced(type_: int, from_node: int, from_port: int, to_node: int, to_port: int): void;
  /** Detaches the given node from the frame it is attached to. */
  detach_node_from_frame(type_: int, id: int): void;
  /** Connects the specified nodes and ports. */
  disconnect_nodes(type_: int, from_node: int, from_port: int, to_node: int, to_port: int): void;
  /** Returns the shader node instance with specified `type` and `id`. */
  get_node(type_: int, id: int): VisualShaderNode;
  /** Returns the list of connected nodes with the specified type. */
  get_node_connections(type_: int): Dictionary;
  /** Returns the list of all nodes in the shader with the specified type. */
  get_node_list(type_: int): PackedInt32Array;
  /** Returns the position of the specified node within the shader graph. */
  get_node_position(type_: int, id: int): Vector2;
  /** Returns next valid node ID that can be added to the shader graph. */
  get_valid_node_id(type_: int): int;
  /** Returns `true` if the shader has a varying with the given `name`. */
  has_varying(name: string): boolean;
  /** Returns `true` if the specified node and port connection exist. */
  is_node_connection(type_: int, from_node: int, from_port: int, to_node: int, to_port: int): boolean;
  /** Removes the specified node from the shader. */
  remove_node(type_: int, id: int): void;
  /**
   * Removes a varying value node with the given `name`. Prints an error if a node with this name is not found.
   */
  remove_varying(name: string): void;
  /** Replaces the specified node with a node of new class type. */
  replace_node(type_: int, id: int, new_class: string): void;
  /** Sets the mode of this shader. */
  set_mode(mode: int): void;
  /** Sets the position of the specified node. */
  set_node_position(type_: int, id: int, position: Vector2): void;

  // enum Type
  /** A vertex shader, operating on vertices. */
  static readonly TYPE_VERTEX: int;
  /** A fragment shader, operating on fragments (pixels). */
  static readonly TYPE_FRAGMENT: int;
  /** A shader for light calculations. */
  static readonly TYPE_LIGHT: int;
  /** A function for the "start" stage of particle shader. */
  static readonly TYPE_START: int;
  /** A function for the "process" stage of particle shader. */
  static readonly TYPE_PROCESS: int;
  /** A function for the "collide" stage (particle collision handler) of particle shader. */
  static readonly TYPE_COLLIDE: int;
  /** A function for the "start" stage of particle shader, with customized output. */
  static readonly TYPE_START_CUSTOM: int;
  /** A function for the "process" stage of particle shader, with customized output. */
  static readonly TYPE_PROCESS_CUSTOM: int;
  /** A shader for 3D environment's sky. */
  static readonly TYPE_SKY: int;
  /** A compute shader that runs for each froxel of the volumetric fog map. */
  static readonly TYPE_FOG: int;
  /** A shader used to process blit calls to a DrawableTexture. */
  static readonly TYPE_TEXTURE_BLIT: int;
  /** Represents the size of the {@link Type} enum. */
  static readonly TYPE_MAX: int;
  // enum VaryingMode
  /** Varying is passed from `Vertex` function to `Fragment` and `Light` functions. */
  static readonly VARYING_MODE_VERTEX_TO_FRAG_LIGHT: int;
  /** Varying is passed from `Fragment` function to `Light` function. */
  static readonly VARYING_MODE_FRAG_TO_LIGHT: int;
  /** Represents the size of the {@link VaryingMode} enum. */
  static readonly VARYING_MODE_MAX: int;
  // enum VaryingType
  /** Varying is of type [float]. */
  static readonly VARYING_TYPE_FLOAT: int;
  /** Varying is of type [int]. */
  static readonly VARYING_TYPE_INT: int;
  /** Varying is of type unsigned [int]. */
  static readonly VARYING_TYPE_UINT: int;
  /** Varying is of type {@link Vector2}. */
  static readonly VARYING_TYPE_VECTOR_2D: int;
  /** Varying is of type {@link Vector3}. */
  static readonly VARYING_TYPE_VECTOR_3D: int;
  /** Varying is of type {@link Vector4}. */
  static readonly VARYING_TYPE_VECTOR_4D: int;
  /** Varying is of type [bool]. */
  static readonly VARYING_TYPE_BOOLEAN: int;
  /** Varying is of type {@link Transform3D}. */
  static readonly VARYING_TYPE_TRANSFORM: int;
  /** Represents the size of the {@link VaryingType} enum. */
  static readonly VARYING_TYPE_MAX: int;

  /** Indicates an invalid {@link VisualShader} node. */
  static readonly NODE_ID_INVALID: int;
  /** Indicates an output node of {@link VisualShader}. */
  static readonly NODE_ID_OUTPUT: int;
}
