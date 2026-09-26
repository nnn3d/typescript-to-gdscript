extends Node
class_name AddonAccessors

# Properties with getters and setters. A declaration keeps the accessor
# pair, typed the same on both sides.

var inline_pair: int:
	get:
		return inline_pair
	set(value):
		inline_pair = value

var with_initializer: int = 10:
	get:
		return with_initializer
	set(value):
		with_initializer = value

var named_accessors: int:
	get = get_named, set = set_named

var getter_only: int:
	get:
		return getter_only

var setter_only: int:
	set(value):
		setter_only = value

func get_named() -> int:
	return 10

func set_named(v: int):
	pass
