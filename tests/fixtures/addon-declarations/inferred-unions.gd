extends RefCounted
class_name InferredUnions

# Returns that differ by branch. TypeScript keeps a union of literals
# as literals — narrower than GDScript's own view, but exact: these
# functions really only ever return those values.

func value_or_null(flag: bool):
	if flag:
		return 1
	return null

func int_or_float(flag: bool):
	if flag:
		return 1
	return 1.5

func ternary(flag: bool):
	return 1 if flag else "a"

# A function whose return type depends on itself can't be inferred and
# degrades to `any` (TS7023): less precise, never wrong.
func recursive(n: int):
	if n <= 0:
		return 0
	return recursive(n - 1) + 1
