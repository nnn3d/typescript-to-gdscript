class_name LiteralTypes
extends Node

@export
var team: String = "player"
var rarity: String = "common"
var id: String = "item_1"
var stat: String = "hp"
var enabled: bool = true
var flag: bool = false
var rarities: Array[String] = []
var maybe = null
var level = 1
var mixed = 0

func set_rarity(value: String) -> String:
	self.rarity = value
	return value

func first(values: Array):
	return values[0]
