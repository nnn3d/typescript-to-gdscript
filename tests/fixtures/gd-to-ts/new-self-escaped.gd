extends RefCounted
class_name _Esc

var hp: int

func make() -> _Esc:
	var copy: _Esc = _Esc.new()
	copy.hp = self.hp
	return copy

func clone() -> _Esc:
	return new()
