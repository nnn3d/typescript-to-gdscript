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

var test_dict_value: Node

func test_optional_access():
	var d = {
		"b": 1,
	}
	# Optional prop → .get()
	var a = d.get("a")
	# Non-optional prop → also .get() (plain objects are Dictionaries in GD)
	var b = d.get("b")
	# Assignment target — stays dot access (valid for Dictionary and Object)
	d.a = 5
	d.b += 1
	d.b += 1
	d["a"] = 2
	d["b"] += 3
	# Optional element access → .get()
	var c = d.get("a")
	# Standalone optional → .get()
	var e = {}
	var f = e.get("f")
	# Chained access — inner link stays dot, final read → .get()
	var g = e.f.get("g")
	if e.get("f"):
		var g2 = e.f.get("g")
	# Call on optional — no .get() (used as callee)
	var h = {}
	h.fn()
	if h.get("fn"):
		h.fn()
	var i = self.test_dict_value
	# Class field — no .get() (always defined in GDScript)
	var node = Node2D.new()
	var pos = node.position

func test_plain_object_members(obj):
	var n = obj.get("name")
	var c = obj.get("count")
	obj.count = 2
	obj.count *= 3
	return obj.get("name")
