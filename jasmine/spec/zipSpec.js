describe("zip tests", function(){

  it('zip via aExt object', function(){
    var result =
      aExt.zip([
        ["a", "b", "c", "d"],
        [1, 2, 3, 4],
        ["-", "--", "---", "----"]
      ]);
    expect(result).toEqual(
      [
        ["a", 1, "-"],
        ["b", 2, "--"],
        ["c", 3, "---"],
        ["d", 4, "----"]
      ]
    );
  });

  it('zip with no zipper function', function(){
    var result = [
      ["a", "b", "c", "d"],
      [1, 2, 3, 4],
      ["-", "--", "---", "----"]
    ].zip();
    expect(result).toEqual(
      [
        ["a", 1, "-"],
        ["b", 2, "--"],
        ["c", 3, "---"],
        ["d", 4, "----"]
      ]
    );
  });

  it('zip with zipper function', function() {

    var result = [
      ["a", "b", "c"],
      [1, 2, 3]
    ].zip(function(letter, number){
      return { first: letter, second: number }
    });

    expect(result).toEqual(
      [ {first: "a", second: 1},
        {first: "b", second: 2},
        {first: "c", second: 3} ]    
    )
  });

  it('zip arrays of different length', function(){
    var result = [ ["a", "b"], [1, 2, 3]].zip();
    expect(result).toEqual([ ["a", 1], ["b", 2] ]);
  });

    it('zip arrays of different length - 2', function(){
    var result = [ ["a", "b", "c"], [1, 2] ].zip();
    expect(result).toEqual([ ["a", 1], ["b", 2] ]);
  });

  it('zip empty array', function(){
    var result = [].zip();
    expect(result).toEqual([]);
  });

});