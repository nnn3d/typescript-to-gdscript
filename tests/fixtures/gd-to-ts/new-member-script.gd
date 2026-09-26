extends RefCounted
class_name NewMemberScript

const Helper = preload("res://helper.gd")

func make_helper():
	return Helper.new()

func make_helper_via_self():
	return self.Helper.new()

func make_local(Helper):
	return Helper.new()
