extends Node
class_name TestAddon

enum AddonState {
	IDLE,
	RUNNING,
	STOPPED
}

const Helper = preload("res://addons/TestAddon/addon_helper.gd")

var state: AddonState

func start():
	state = AddonState.RUNNING

func stop():
	state = AddonState.STOPPED
