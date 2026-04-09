extends Node
class_name GetsetTest

var a: int:
	get:
		return a
	set(value):
		a = value

var b: int = 10:
	get:
		return b
	set(value):
		b = value

var c: int:
	get = get_c, set = set_c

var d: int:
	get:
		return d

var e: int:
	set(value):
		e = value

var f = e:
	get:
		return f

func get_c() -> int:
	return 10

func set_c(v: int):
	pass
