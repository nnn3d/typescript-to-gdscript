// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for {@link VisualShader} nodes. Not related to scene nodes. */
declare class VisualShaderNode extends Resource {
  /**
   * Represents the index of the frame this node is linked to. If set to `-1` the node is not linked to any frame.
   */
  linked_parent_graph_frame: int;
  /**
   * Sets the output port index which will be showed for preview. If set to `-1` no port will be open for preview.
   */
  output_port_for_preview: int;
  set_frame(value: int): void;
  get_frame(): int;
  set_output_port_for_preview(value: int): void;
  get_output_port_for_preview(): int;

  /** Clears the default input ports value. */
  clear_default_input_values(): void;
  /**
   * Returns the input port which should be connected by default when this node is created as a result of dragging a connection from an existing node to the empty space on the graph.
   */
  get_default_input_port(type_: int): int;
  /**
   * Returns an {@link Array} containing default values for all of the input ports of the node in the form `[index0, value0, index1, value1, ...]`.
   */
  get_default_input_values(): Array<unknown>;
  /** Returns the default value of the input `port`. */
  get_input_port_default_value(port: int): unknown;
  /** Removes the default value of the input `port`. */
  remove_input_port_default_value(port: int): void;
  /**
   * Sets the default input ports values using an {@link Array} of the form `[index0, value0, index1, value1, ...]`. For example: `[0, Vector3(0, 0, 0), 1, Vector3(0, 0, 0)]`.
   */
  set_default_input_values(values: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /** Sets the default `value` for the selected input `port`. */
  set_input_port_default_value(port: int, value: unknown, prev_value?: unknown): void;

  // enum PortType
  /** Floating-point scalar. Translated to [code skip-lint]float[/code] type in shader code. */
  static readonly PORT_TYPE_SCALAR: int;
  /** Integer scalar. Translated to [code skip-lint]int[/code] type in shader code. */
  static readonly PORT_TYPE_SCALAR_INT: int;
  /** Unsigned integer scalar. Translated to [code skip-lint]uint[/code] type in shader code. */
  static readonly PORT_TYPE_SCALAR_UINT: int;
  /** 2D vector of floating-point values. Translated to [code skip-lint]vec2[/code] type in shader code. */
  static readonly PORT_TYPE_VECTOR_2D: int;
  /** 3D vector of floating-point values. Translated to [code skip-lint]vec3[/code] type in shader code. */
  static readonly PORT_TYPE_VECTOR_3D: int;
  /** 4D vector of floating-point values. Translated to [code skip-lint]vec4[/code] type in shader code. */
  static readonly PORT_TYPE_VECTOR_4D: int;
  /** Boolean type. Translated to [code skip-lint]bool[/code] type in shader code. */
  static readonly PORT_TYPE_BOOLEAN: int;
  /** Transform type. Translated to [code skip-lint]mat4[/code] type in shader code. */
  static readonly PORT_TYPE_TRANSFORM: int;
  /**
   * Sampler type. Translated to reference of sampler uniform in shader code. Can only be used for input ports in non-uniform nodes.
   */
  static readonly PORT_TYPE_SAMPLER: int;
  /** Represents the size of the {@link PortType} enum. */
  static readonly PORT_TYPE_MAX: int;
}
