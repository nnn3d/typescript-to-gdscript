export class Match extends Node {
  x: any;
  TYPE_FLOAT = "float";
  TYPE_STRING = "string";
  TYPE_ARRAY = "array";

  test_expression_pattern() {
    gd.match(this.x, [
      {
        match: this.TYPE_FLOAT,
        do() {
          print("float");
        },
      },
      {
        match: this.TYPE_STRING,
        do() {
          print("text");
        },
      },
      {
        match: this.TYPE_ARRAY,
        do() {
          print("array");
        },
      },
      (new_var) => ({
        match: new_var,
        do() {
          print("it's ", new_var);
        },
      }),
    ]);
  }

  test_wildcard() {
    gd.match(this.x, [
      {
        match: 1,
        do() {
          print("It's one!");
        },
      },
      {
        match: 2,
        do() {
          print("It's one times two!");
        },
      },
      {
        match: undefined,
        do() {
          print("It's not 1 or 2. I don't care to be honest.");
        },
      },
    ]);
  }

  test_match_pattern() {
    gd.match(this.x, [
      {
        match: [],
        do() {
          print("Empty array");
        },
      },
      {
        match: [1, 3, "test", null],
        do() {
          print("Very specific array");
        },
      },
      (start) => ({
        match: [start, undefined, "test"],
        do() {
          print("First element is ", start, ", and the last is \"test\"");
        },
      }),
      {
        match: [42, ...[]],
        do() {
          print("Open ended array");
        },
      },
      (x, y) => ({
        match: [x, y],
        when: y === x,
        do() {
          print("Point on line y = x");
        },
      }),
      (x, y) => ({
        match: [x, y],
        when: y === -x,
        do() {
          print("Point on line y = -x");
        },
      }),
      (age) => ({
        match: { name: "Dennis", age: age },
        do() {
          print("Dennis is ", age, " years old.");
        },
      }),
      {
        match: { name: undefined, age: undefined },
        do() {
          print("Has a name and an age, but it's not Dennis :(");
        },
      },
      {
        match: { key: "godotisawesome", ...{} },
        do() {
          print("I only checked for one entry and ignored the rest");
        },
      },
      {
        matchMany: [1, 2, 3],
        do() {
          print("It's 1 - 3");
        },
      },
      {
        matchMany: ["Sword", "Splash potion", "Fist"],
        do() {
          print("Yep, you've taken damage");
        },
      },
    ]);
  }
}
