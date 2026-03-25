extends Node
class_name MyClass

func test_strings():
	var simple: String = "Hello, World!"
	var with_quotes: String = "He said \"hi\""
	var concat = "Hello" + " " + "World"
	var sn = StringName("my_action")
	var np = NodePath("Sprite2D/AnimationPlayer")
	var unique = self.get_node("%UniqueNode")
