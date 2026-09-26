extends RefCounted

# No class_name: the class has no global name, so a declaration can only
# refer to it through the module that exports it.

func assist() -> int:
	return 1
