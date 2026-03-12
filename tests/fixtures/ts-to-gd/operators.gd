extends Node
class_name MyClass

func test_arithmetic():
	var a: int = 10
	var b: int = 3
	var sum = a + b
	var diff = a - b
	var prod = a * b
	var quot = a / b
	var remainder = a % b
	var power = a ** b

func test_comparison():
	var x: int = 5
	var is_equal = x == 5
	var not_equal = x != 3
	var greater = x > 3
	var less = x < 10
	var gte = x >= 5
	var lte = x <= 5

func test_logical():
	var a: bool = true
	var b: bool = false
	var and_result = a and b
	var or_result = a or b
	var not_result = not a

func test_assignment():
	var x: int = 10
	x += 5
	x -= 3
	x *= 2
	x /= 4
	x %= 3

func test_vector_math():
	var v1 = Vector2(1, 2)
	var v2 = Vector2(3, 4)
	var v3 = (v1 + v2)
	var v4 = (v1 * v2)
	var v5 = (v1 - v2)
