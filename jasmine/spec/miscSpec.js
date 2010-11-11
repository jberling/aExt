describe("miscellaneous tests", function(){

  it('flatten empty array', function(){
    var result = [].flatten();
    expect(result).toEqual([]);
  });

  it('flatten array', function(){
    var result = [ [1, 2, []], ["a", 3, [[], []], [4, "b", [5]]], "c", [ "d", [[[]]] ] ].flatten();
    expect(result).toEqual([1, 2, "a", 3, 4, "b", 5, "c", "d"]);
  });

  it('flatten array with one item', function(){
    var result = [5].flatten();
    expect(result).toEqual([5]);
  });

  it('compact and remove empty arrays', function(){
    var result = [false, [], "a", 1, undefined, null, [[]], 2].compact(true);
    expect(result).toEqual([false, "a", 1, [[]], 2]);
  });

  it('compact but keep empty arrays', function(){
    var result = [false, [], "a", 1, undefined, null, [[]], 2].compact(false);
    expect(result).toEqual([false, [], "a", 1, [[]], 2]);
  });

  it('none, being true', function(){
    var result = [ 1, 2, 3 ].none(function(item, index, array){
      return item === index || index === array.length;
    });
    expect(result).toEqual(true);
  });

  it('none, being false', function(){
    var result = [ 1, 2, 3 ].none(function(item, index, array){
      return item === array.length && index === array.length-1;
    });
    expect(result).toEqual(false);
  });

  it('none, with thisArg', function(){
    var result = [ 1, 2, 3 ].none(function(item, index, array){
      return item === this.value;
    }, {value:2});
    expect(result).toEqual(false);
  });

  it('first', function(){
    var result = ["a", "b", "c"].first();
    expect(result).toEqual("a");
  });

  it('last', function(){
    var result = ["a", "b", "c"].last();
    expect(result).toEqual("c");
  });

//  it('invert', function(){
//    var result = ["a", "b", [[]], "c"].invert();
//    expect(result).toEqual(["c", [[]], "b", "a"]);
//  });

//  it('max, strings and empty array', function(){
//    var result = ["a", "b", [], "c"].max();
//    expect(result).toEqual("c");
//  });
//
//  it('max, numbers', function(){
//    var result = [1, 2, 3].max();
//    expect(result).toEqual(3);
//  });
//
//  it('max, property', function(){
//    var result = [
//      {age: 23, name: "John"},
//      {age: 24, name: "Gusten"},
//      {age:12, eyeColor: "brown"}
//    ].max("age");
//    expect(result).toEqual(24);
//  });
//
//  it('max, numbers and strings', function() {
//    var result = [1, 2, "a", "b"].max();
//    expect(result).toEqual(false) // ska ge ett felmeddelande.
//  });
//
//  it('max with comparer', function(){
//
//  })
//
//  it('min, strings and empty array', function(){
//    var result = ["a", "b", [], "c"].min;
//    expect(result).toEqual([]);
//  });
//
//  it('min, numbers', function(){
//    var result = [2, 1, 3].min();
//    expect(result).toEqual(1);
//  });
//
//  it('min, property', function(){
//    var result = [
//      {age: 23, name: "John"},
//      {age: 24, name: "Gusten"},
//      {age:12, eyeColor: "brown"}
//    ].max("age");
//    expect(result).toEqual(12);
//  });
//
//  it('min, numbers and strings', function() {
//    var result = [1, 2, "a", "b"]
//    expect(result).toEqual(false) // ska ge ett felmeddelande.
//  });
//
//  it('range, numbers', function(){
//    var result = [1, 2, 4, 3].range();
//    expect(result).toEqual([1, 4]);
//  })
//
//  it('recurrence', function(){
//    var result = [1, 2, 3, 2, 1, 4, 5].notUnique();
//    expect(result).toEqual([1, 2]);
//  })

});
