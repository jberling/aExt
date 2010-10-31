describe("ECMA-262 functions tests", function(){

  it('aExt.reduce with initval', function(){
    var result = aExt.reduce(["a", "b", "c"],
        function(acc, item, index, array){
          return acc + " " + item + ", " + index + ", " + array.length + ";";
        }, "");
    expect(result).toEqual(" a, 0, 3; b, 1, 3; c, 2, 3;");
  });

  it('reduce with initval', function(){
    var result = ["a", "b", "c"].reduce(function(acc, item, index, array){
      return acc + " " + item + ", " + index + ", " + array.length + ";";
    }, "");
    expect(result).toEqual(" a, 0, 3; b, 1, 3; c, 2, 3;");
  });

  it('reduce with initval 2', function(){
    var result = ["a", "b", "c"].reduce(function(acc, item, index, array){
      return acc + " " + item + ", " + index + ", " + array.length + ";";
    }, "test:");
    expect(result).toEqual("test: a, 0, 3; b, 1, 3; c, 2, 3;");
  });

  it('reduce without initial value', function(){
    var result = ["a", "b", "c"].reduce(function(acc, item){
      return acc + ", " + item;
    });
    expect(result).toEqual("a, b, c");
  });

  it('filter', function(){
    var result = ["a", "b", "c", "d", "e"].filter(function(item, index, array){
      return item === "a" || index === 2 || item === array[4];
    });
    expect(result).toEqual(["a", "c", "e"]);
  });

  it('filter with thisArg', function(){
    var result = ["a", "b", "c"].filter(function(item){
      return item === this.str;
    }, {str: "b"});
    expect(result).toEqual(["b"]);
  });

  it('map', function(){
    var result = ["a", "b", "c"].map(function(item, index, array){
      return { one: item, two: index, three: array.length };
    });
    expect(result).toEqual([
      { one: "a", two: 0, three: 3 },
      { one: "b", two: 1, three: 3 },
      { one: "c", two: 2, three: 3 }
    ])
  });

  it('map to array', function(item, index, array) {
    var result = ["a", "b", "c"].map(function(item, index, array){
      return [item, index, array.length];
    });
    expect(result).toEqual([
      ["a", 0, 3],
      ["b", 1, 3],
      ["c", 2, 3]
    ]);
  });

  it('map with thisArg', function(){
    var result = ["a", "b", "c"].map(function(item){
      return item + ": " + this;
    }, "I am that this");
    expect(result).toEqual([
      "a: I am that this", "b: I am that this", "c: I am that this"
    ]);
  });

  it('every, being true', function(){
    var result = [ 0, 1, 2 ].every(function (item, index, array){
      return item === index && index < array.length;
    });
    expect(result).toEqual(true);
  });

  it('every, with thisArg', function(){
    var result = [ 0, 1, 2 ].every(function (item, index, array){
      return item < this.number
    }, { number: 3 });
    expect(result).toEqual(true);
  });

});
