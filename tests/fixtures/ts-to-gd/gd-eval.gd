extends Node

func test_eval():
	var a = 10
	var b = 20
	var c = 40
	if c > 20:
		c = 50
	var d = 10
	if d > 10:
		d = 30
	var d2 = 10
	if d2 > 10:
		d2 = 30
	var e = 10
	if e > 10:
		e = 30
	var e2 = 10
	if e2 > 10:
		e2 = 30
	var f = 10
	if f > 10:
		f = 30
	else:
		f += 10
		if f > 10:
			f = 30
	print(f)
