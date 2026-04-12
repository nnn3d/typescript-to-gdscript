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
		key1 + key2: "value",
	}
	var dict3 = {
		"key": "value",
		"key2": "value",
	}
	var dict4 = {
		"it's": "value",
		"say \"hello\"": "value",
	}

func test_optional_access():
	var d = {
		"b": 1,
	}
	# Optional prop → .get()
	var a = d.get("a")
	# Non-optional prop → stays dot access
	var b = d.b
	# Optional element access → .get()
	var c = d.get("a")
	# Standalone optional → .get()
	var e = {}
	var f = e.get("f")
	# Chained access — no .get() (used as object for further access)
	var g = e.f.g
	if e.get("f"):
		var g2 = e.f.g
	# Call on optional — no .get() (used as callee)
	var h = {}
	h.fn()
	if h.get("fn"):
		h.fn()
	# Class field — no .get() (always defined in GDScript)
	var node = Node2D.new()
	var pos = node.position
