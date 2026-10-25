class_name MyClass
extends Node

func test_casting():
	var node: Node = self
	var sprite = node as Sprite2D
	if sprite != null:
		print("It is a Sprite2D")
	var satisfies = "string"

# `as` binds looser than everything but assignment and takes the whole
# expression to its LEFT as the value, so it is bare only in a slot
# delimited on both sides. As a receiver, `node as Sprite2D.texture`
# reads `Sprite2D.texture` as a type path; as a right-hand operand,
# `count / total as float` casts the quotient (0.0, not 0.5).
func test_as_grouping(node: Node, count: int, total: int, c: bool, w: float, v: float, packed: PackedInt32Array):
	var texture = (node as Sprite2D).texture
	var rect = (node as Sprite2D).get_rect()
	var first = (packed as Array)[0]
	var ratio = count / (total as float)
	var pick = w if c else (v as int)
	var same = (node as Sprite2D) == null

# Delimited on both sides — the cast stays bare.
func test_as_bare(node: Node, path: NodePath):
	var sprite = node as Sprite2D
	var text = path as String
	print(node as Sprite2D)
	var list = [node as Sprite2D]

# `is` binds tighter than everything but `.`, `[]` and `()`, so it
# stays bare as an operand — only its VALUE needs grouping when that
# is itself infix, or the `is` binds to the last piece of it.
func test_is_grouping(value, c: bool, a: int, b: float):
	if value is int and c:
		print("int")
	var flipped = not value is int
	var picked = (a if c else b) is float
	# `!` goes out as `not` and a template as a `+` chain — both bind
	# looser than `is`, which would otherwise test only their last piece.
	var negated = (not c) is bool
	var text = ("a = " + str(a)) is String
	# `-`, `+` and `~` bind looser than `is` as well.
	var negative = (-a) is int
	# A lambda's body runs to the end of the line, so a bare one would
	# swallow the operator after it.
	var wrapped = (func(): return a) as Callable
