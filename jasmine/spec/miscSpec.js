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

});
