extends Node
class_name Merged

const FIRST = 1

enum Color { RED, BLUE }

const SECOND = 2

class Inner:
	const TAG = "inner"
	var value: int = 0

var first: int = self.FIRST
var second: int = self.SECOND
var color: Color = self.Color.RED

func pick():
	return self.FIRST + self.SECOND
