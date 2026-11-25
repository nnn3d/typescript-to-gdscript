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
# An optional field starts empty, so it follows the same rule.
var opt_count
var opt_label
var opt_mode
var opt_scores
var opt_target: Node2D
var opt_nullable: Node2D
@export
var opt_exported: Variant
static var opt_shared

func pick(amount, node: Node):
	if node == null:
		return amount
	return 0

func find_target() -> Node2D:
	return self.target

