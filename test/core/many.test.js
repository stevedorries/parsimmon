"use strict";

suite("many", function() {
  test("simple case", function() {
    var letters = Parsimmon.letter.many();
    assert.deepEqual(letters.parse("x").value, ["x"]);
    assert.deepEqual(letters.parse("xyz").value, ["x", "y", "z"]);
    assert.deepEqual(letters.parse("").value, []);
    assert.ok(!letters.parse("1").status);
    assert.ok(!letters.parse("xyz1").status);
  });

  test("followed by then", function() {
    var parser = Parsimmon.string("x")
      .many()
      .then(Parsimmon.string("y"));
    assert.equal(parser.parse("y").value, "y");
    assert.equal(parser.parse("xy").value, "y");
    assert.equal(parser.parse("xxxxxy").value, "y");
  });

  test("throws on parsers that accept zero characters", function() {
    var parser = Parsimmon.regexp(/a*/).many();
    assert.throws(function() {
      parser.parse("a");
    });
    assert.throws(function() {
      parser.parse("b");
    });
    assert.throws(function() {
      parser.parse("");
    });
  });
});
