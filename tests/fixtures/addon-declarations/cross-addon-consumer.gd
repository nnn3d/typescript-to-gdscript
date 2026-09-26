extends RefCounted
class_name CrossAddonConsumer

# Inference that crosses into another addon file. These resolve through
# the other addon's `.gd.d.ts`, so they only come out right when those
# are in the program while the declarations are emitted.

const Provider = preload("res://addons/Fixtures/cross-addon-provider.gd")

func through_class_name():
	return CrossAddonProvider.new().make()

func through_untyped_method():
	return CrossAddonProvider.new().make_untyped()

func through_preload():
	return Provider.new()
