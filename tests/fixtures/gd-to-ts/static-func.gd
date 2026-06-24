extends RefCounted
class_name Factory

const MAX_ID = 100

static var count: int = 0

enum Kind { BASIC, ADVANCED }

class Blueprint:
	var label: String = ""

var id: int

static func create(id: int) -> Factory:
	var f = Factory.new()
	f.id = id
	return f

func clone_via_factory() -> Factory:
	return create(self.id)

static func wait_for(sig: Signal) -> void:
	await sig

static func make_async(sig: Signal) -> Factory:
	await sig
	return new()

static func reset():
	count = 0

static func ping(sig: Signal):
	await sig

func describe() -> String:
	var k: Kind = Kind.BASIC
	var limit = MAX_ID
	var n = count
	var bp: Blueprint = Blueprint.new()
	return str(n)
