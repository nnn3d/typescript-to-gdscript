extends Node
class_name Operators

func test_operators():
	var a: int = 10
	var b: int = 3
	var c: bool = a > b and a != 0
	var d: bool = a < b or b == 0
	var e: bool = not c
	var f: int = a + b
	var g: float = a / b
	var h: int = a % b
