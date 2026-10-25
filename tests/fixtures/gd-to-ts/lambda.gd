extends Node
class_name Lambda

var count: int = 0

func test_lambda():
	var double = func(x: int) -> int: return x * 2
	var greet = func(): print("hello")

func call_lambda() -> int:
	# `call` and `bind` keep the lambda's own types: its parameters, its
	# return, and Godot's bind from the end.
	var double = func(x: int) -> int: return x * 2
	var add = func(a: int, b: int) -> int: return a + b
	var add_one = add.bind(1)
	return double.call(3) + add_one.call(2)

func lambda_assignments():
	# A one-line body may be an assignment, which is a statement in GDScript.
	var bump = func(): count += 1
	var reset = func(): count = 0
	bump.call()
	reset.call()
