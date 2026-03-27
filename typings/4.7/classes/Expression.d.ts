// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A class that stores an expression you can execute. */
declare class Expression extends RefCounted {
  /**
   * Executes the expression that was previously parsed by {@link parse} and returns the result. Before you use the returned object, you should check if the method failed by calling {@link has_execute_failed}.
   * If you defined input variables in {@link parse}, you can specify their values in the inputs array, in the same order.
   */
  execute(inputs?: Array<unknown>, base_instance?: GodotObject, show_error?: boolean, const_calls_only?: boolean): unknown;
  /** Returns the error text if {@link parse} or {@link execute} has failed. */
  get_error_text(): string;
  /** Returns `true` if {@link execute} has failed. */
  has_execute_failed(): boolean;
  /**
   * Parses the expression and returns an {@link Error} code.
   * You can optionally specify names of variables that may appear in the expression with `input_names`, so that you can bind them when it gets executed.
   */
  parse(expression: string, input_names?: PackedStringArray): int;
}
