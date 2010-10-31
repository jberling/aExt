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

});
