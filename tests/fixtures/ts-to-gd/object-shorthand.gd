class_name ObjectShorthand
extends Node

func make_dict(param: int):
	var local: int = 2
	return {
		"single": {
		"local": local,
	},
		"explicit": param,
		"local": local,
		"nested": {
		"param": param,
		"local": local,
	},
		"GodotObject": Object,
	}

func shadow(GodotObject: int):
	return {
		"GodotObject": GodotObject,
	}
