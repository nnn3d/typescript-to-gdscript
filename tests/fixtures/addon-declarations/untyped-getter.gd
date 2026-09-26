extends RefCounted
class_name UntypedGetter

var hp: int = 10

# A property with no GDScript type: GD→TS annotates the accessor pair as
# `unknown` itself, so there is nothing left for declaration emit to
# infer — even though the getter's body would give `number`.
var doubled:
	get:
		return hp * 2
