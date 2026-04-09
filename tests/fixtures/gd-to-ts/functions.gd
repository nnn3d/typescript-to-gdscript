extends RefCounted
class_name Functions

func no_args():
	pass

func with_args(a: int, b: String):
	print(a, b)

func with_return() -> float:
	return 3.14

func with_default(name: String, hp: int = 100):
	print(name, hp)

func calculate(a: float, b: float) -> float:
	return a + b

func varargs_untyped(...args):
	pass

func varargs_typed(a: int, ...rest: Array):
	pass
