// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Base class for a family of nodes with variable number of input and output ports within the visual shader graph.
 */
declare class VisualShaderNodeGroupBase extends VisualShaderNodeResizableBase {
  /** Adds an input port with the specified `type` (see {@link VisualShaderNode.PortType}) and `name`. */
  add_input_port(id: int, type_: int, name: string | NodePath): void;
  /** Adds an output port with the specified `type` (see {@link VisualShaderNode.PortType}) and `name`. */
  add_output_port(id: int, type_: int, name: string | NodePath): void;
  /** Removes all previously specified input ports. */
  clear_input_ports(): void;
  /** Removes all previously specified output ports. */
  clear_output_ports(): void;
  /** Returns a free input port ID which can be used in {@link add_input_port}. */
  get_free_input_port_id(): int;
  /** Returns a free output port ID which can be used in {@link add_output_port}. */
  get_free_output_port_id(): int;
  /** Returns the number of input ports in use. Alternative for {@link get_free_input_port_id}. */
  get_input_port_count(): int;
  /**
   * Returns a {@link String} description of the input ports as a colon-separated list using the format `id,type,name;` (see {@link add_input_port}).
   */
  get_inputs(): string;
  /** Returns the number of output ports in use. Alternative for {@link get_free_output_port_id}. */
  get_output_port_count(): int;
  /**
   * Returns a {@link String} description of the output ports as a colon-separated list using the format `id,type,name;` (see {@link add_output_port}).
   */
  get_outputs(): string;
  /** Returns `true` if the specified input port exists. */
  has_input_port(id: int): boolean;
  /** Returns `true` if the specified output port exists. */
  has_output_port(id: int): boolean;
  /**
   * Returns `true` if the specified port name does not override an existed port name and is valid within the shader.
   */
  is_valid_port_name(name: string | NodePath): boolean;
  /** Removes the specified input port. */
  remove_input_port(id: int): void;
  /** Removes the specified output port. */
  remove_output_port(id: int): void;
  /** Renames the specified input port. */
  set_input_port_name(id: int, name: string | NodePath): void;
  /** Sets the specified input port's type (see {@link VisualShaderNode.PortType}). */
  set_input_port_type(id: int, type_: int): void;
  /**
   * Defines all input ports using a {@link String} formatted as a colon-separated list: `id,type,name;` (see {@link add_input_port}).
   */
  set_inputs(inputs: string | NodePath): void;
  /** Renames the specified output port. */
  set_output_port_name(id: int, name: string | NodePath): void;
  /** Sets the specified output port's type (see {@link VisualShaderNode.PortType}). */
  set_output_port_type(id: int, type_: int): void;
  /**
   * Defines all output ports using a {@link String} formatted as a colon-separated list: `id,type,name;` (see {@link add_output_port}).
   */
  set_outputs(outputs: string | NodePath): void;
}
