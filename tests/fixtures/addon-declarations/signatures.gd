extends RefCounted
class_name AddonSignatures

# Parameter shapes. A default value makes the parameter optional in the
# declaration; varargs become a rest parameter.

func with_default(name: String, hp: int = 100):
	print(name, hp)

func varargs_untyped(...args):
	pass

func varargs_typed(a: int, ...rest: Array):
	pass

func optional_args(a: int = 0, b = null, c = '', d: Node = null):
	pass
