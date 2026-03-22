extends Node
class_name Expressions

func test_expressions():
	var arr = [1, 2, 3]
	var dict = {"key": "value", "num": 42}
	var sn = &"my_name"
	var np = ^"path/to/node"
	var result = 42 if health > 0 else -1
	var node = $Label as Label
	var child = $"Path/To/Node"
	var unique = %UniqueNode
	var unique2 = %"UniqueNode"
