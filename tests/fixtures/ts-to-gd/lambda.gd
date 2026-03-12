extends Node
class_name MyClass

func test_lambda():
	var double = func(x: int) -> int: return x * 2
	var numbers = [1, 2, 3]
	numbers.map(func(n: int) -> int: return n * 2)
