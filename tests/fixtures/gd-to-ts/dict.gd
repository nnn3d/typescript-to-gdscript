extends Node
class_name MyClass

func test_dict():
	var key1 = "key"
	var key2 = Vector2.DOWN
	var key3 = Node2D.new()

	var dict = {
		key1: "value",
		key2: "value",
		key3: "value",
		"key": "value",
	}

	var dict2 = {
		key1: "value",
		"key2": "value",
	}
