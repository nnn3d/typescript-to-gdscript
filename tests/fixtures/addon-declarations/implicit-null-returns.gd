extends RefCounted
class_name ImplicitNullReturns

# A GDScript function yields null on a path that ends in a bare `return`
# or falls off the end. The declaration says `null` there too, never
# `undefined`, which GDScript doesn't have.

func bare_return(flag: bool):
	if flag:
		return
	return 1

func fall_through(flag: bool):
	if flag:
		return 1

func coroutine(flag: bool):
	await Engine.get_main_loop().process_frame
	if flag:
		return "done"

# No value on any path: stays void.
func early_exit_only(flag: bool):
	if flag:
		return
	print("x")
