extends Node
class_name InferredReturns

# No function here has a `-> Type`, so every return type in the
# declaration is what TypeScript inferred from the body before the body
# was dropped.

enum Mode { A, B }

var typed_hp: int = 10
var untyped_hp = 10
var target: Node

# A lone literal widens to its base type. `int` / `float` are aliases of
# `number`, and TypeScript erases primitive aliases when it infers, so an
# int comes out as `number` — the same as in a consumer's own code.
func int_literal():
	return 1

func float_literal():
	return 1.5

func string_literal():
	return "hi"

func bool_literal():
	return true

func null_literal():
	return null

func constructed_value():
	return Vector2(1, 2)

# A member's declared type carries through; a reference type keeps the
# `| null` the nullable helper gave the field.
func typed_member():
	return typed_hp

func untyped_member():
	return untyped_hp

func reference_member():
	return target

func self_reference():
	return self

func new_instance():
	return InferredReturns.new()

func enum_value():
	return Mode.B

func array_literal():
	return [1, 2, 3]

func dictionary_literal():
	return {"a": 1}

func global_function():
	return len([1, 2])

func inherited_method():
	return get_child_count()

func unknown_node():
	return get_node("Child")

func chained_inference():
	return int_literal()

func lambda():
	return func(x): return x * 2

func typed_lambda():
	return func(x: int) -> int: return x * 2

func no_return():
	print("x")

static func static_function():
	return 42

# A coroutine converts to an `async` method, so callers `await` it.
func coroutine():
	await get_tree().process_frame
	return 1

func untyped_passthrough(value):
	return value

func typed_passthrough(value: String):
	return value
