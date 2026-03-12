extends Node
class_name MyClass

func test_casting():
	var node: Node = self
	var sprite = node as Sprite2D
	if sprite != null:
		print("It is a Sprite2D")
