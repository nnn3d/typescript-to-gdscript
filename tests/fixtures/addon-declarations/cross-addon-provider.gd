extends RefCounted
class_name CrossAddonProvider

var cached: Node

# Annotated, but returns null on one path: the nullable helper widens it.
func make() -> Node:
	if cached == null:
		return null
	return cached

func make_untyped():
	return cached
