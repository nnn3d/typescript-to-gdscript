export class __CLASS__ extends Node {
  test_eval() {
    gd.eval('var a = 10');
    gd.eval(`
var b = 20
var c = 40
if c > 20:
\tc = 50
    `);
    gd.eval(`
\tvar d = 10
\tif d > 10:
\t\td = 30
`);
    gd.eval(`var d2 = 10
if d2 > 10:
\td2 = 30
`);
    gd.eval(`
var e = 10
if e > 10:
  e = 30
`);
    gd.eval(`var e2 = 10
if e2 > 10:
  e2 = 30
`);
    gd.eval(`
  var f = 10
  if f > 10:
     f = 30
   else:
    f += 10
    if f > 10:
     f = 30
  print(f)
`);
  }
}
