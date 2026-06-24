extends Node
class_name ReservedWords

func handle(delete: int) -> void:
	var default = delete + 1
	for function in [1, 2, 3]:
		print(function, default)
	push_error("""line one
line two""")
