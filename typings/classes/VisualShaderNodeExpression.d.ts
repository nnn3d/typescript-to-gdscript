// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A custom visual shader graph expression written in Godot Shading Language. */
declare class VisualShaderNodeExpression extends VisualShaderNodeGroupBase {
  /**
   * An expression in Godot Shading Language, which will be injected at the start of the graph's matching shader function (`vertex`, `fragment`, or `light`), and thus cannot be used to declare functions, varyings, uniforms, or global constants.
   */
  expression: string;
  set_expression(value: string | NodePath): void;
  get_expression(): string;
}
