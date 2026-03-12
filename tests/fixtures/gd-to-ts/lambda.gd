extends Node
class_name Lambda

func test_lambda():
	var double = func(x: int) -> int: return x * 2
	var greet = func(): print("hello")
