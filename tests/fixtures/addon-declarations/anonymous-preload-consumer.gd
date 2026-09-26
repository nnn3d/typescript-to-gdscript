extends Node
class_name AnonymousPreloadConsumer

# Every reference below names an anonymous addon script through its module,
# and every one must stay relative — never an absolute path into the temp
# folder the pipeline builds in. The field and the return type are written
# into the converted source by ts-helpers before the emit, which is where
# such a path used to come from; declaration emit then reuses whatever
# specifier it finds for all references to the same module.

const Helper = preload("res://addons/Fixtures/anonymous-preload-helper.gd")

var assigned_in_ready

func _ready():
	assigned_in_ready = Helper.new()

func make(flag: bool):
	if flag:
		return Helper.new()
