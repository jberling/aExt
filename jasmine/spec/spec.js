describe("aExt", function(){

  it("reduce function, no initval", function () {
    var result = aExt.reduce(["a", "b", "b", "a"], function (acc, item) {
      return acc + ", " + item;
    });
    expect(result).toEqual("a, b, b, a");
  });

  it("reduce function with one item array, noinitval", function() {
    var result = aExt.reduce(["a"]);
    expect(result).toEqual("a");
  });

  it("reduce function with empty array, noinitval", function() {
    var result = aExt.reduce([]);
    expect(result).toEqual(undefined);
  });

  it("reduce function", function () {
    var result = aExt.reduce(["a", "b", "b", "a"], function (acc, item) {
      return acc + ", " + item;
    }, "init");
    expect(result).toEqual("init, a, b, b, a");
  });

  it("reduce function with one item array", function() {
    var result = aExt.reduce(["a"], null, "init and ");
    expect(result).toEqual("init and a");
  });

  it("reduce function with empty array", function() {
    var result = aExt.reduce([], null, "init");
    expect(result).toEqual("init");
  });

  it("map function", function() {
    var result = aExt.map(["a", "b"], function(item, i, l) {
      return item + i + l;
    });
    expect(result).toEqual(["a02", "b12"]);
  });

  it("map function, empty array", function() {
    var result = aExt.map([], function(item, i, l) {
      return item + i + length;
    })
    expect(result).toEqual([]);
  });

  it("test extend", function(){
    aExt.extend();
    var result = [ "a", "b", "c"].reduce(function(acc, item){
      return acc + item;
    });
  })

})