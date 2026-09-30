class_name NullableTypes
extends Node

enum Mode { IDLE, BUSY }

var count = null
var label = null
var offset = null
var scores = null
var key = null
var mode = null
var target: Node2D = null

func pick(amount, node: Node):
	if node == null:
		return amount
	return 0

func find_target() -> Node2D:
	return self.target

