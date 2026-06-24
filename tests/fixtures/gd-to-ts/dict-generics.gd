extends Node
class_name DictGenerics

signal data_ready(payload: Dictionary[String, int])

var untyped: Dictionary = {}
var simple: Dictionary[String, int] = {}
var name_keys: Dictionary[StringName, Node2D] = {}
var array_values: Dictionary[String, Array[int]] = {}
var nested: Dictionary[int, Dictionary[String, float]] = {}
var dict_in_array: Array[Dictionary[String, int]] = []

func process(data: Dictionary[String, int]) -> Dictionary[int, String]:
	var local: Dictionary[StringName, Node2D] = {}
	return {}
