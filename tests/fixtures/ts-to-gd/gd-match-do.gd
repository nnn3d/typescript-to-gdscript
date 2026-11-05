class_name GdMatchDo
extends Node

var n: int = 0

func value() -> int:
	return 1

func expression_body(v: int):
	match v:
		1:
			print("one")
		2:
			self.n = 2
		3:
			self.value()
		4:
			print("four")
		5, 6:
			print("many")
		var x when x > 10:
			print(x)

func guard_without_binding(v: int):
	match v:
		1 when self.n > 0:
			print("guarded")
		2, 3 when self.n > 0:
			print("many guarded")

func nested(v: int, w: int):
	match v:
		1:
			match w:
				2:
					print("two")
