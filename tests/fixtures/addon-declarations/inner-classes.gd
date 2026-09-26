extends Node
class_name AddonInnerClasses

# Inner classes and constants live in a namespace merged with the class,
# so consumers reach them as `AddonInnerClasses.Inner` and
# `AddonInnerClasses.LIMIT`, the way GDScript does.

const LIMIT = 100

func limit():
	return LIMIT

class Inner extends RefCounted:
	func describe():
		return "inner"
