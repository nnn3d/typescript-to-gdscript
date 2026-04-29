extends RefCounted
class_name NullableValueTypes

signal changed(v: Vector2, c: Color, arr: PackedInt32Array)

func take_vector(v: Vector2) -> void:
	pass

func take_color(c: Color) -> void:
	pass

func take_packed(a: PackedByteArray, b: PackedVector2Array) -> void:
	pass

func take_transform(t: Transform2D, t3: Transform3D) -> void:
	pass

func take_rid(r: RID) -> void:
	pass

func take_stringname(n: StringName) -> void:
	pass

func take_nodepath(p: NodePath) -> void:
	pass

func take_array_dict(a: Array, d: Dictionary) -> void:
	pass
