describe("unzip tests", function(){
  // It seems zip also works as zip. These tests verify that.
  it('unzip array via aExt object', function(){
    var result =
      aExt.zip([
        ["a", 1, "-"],
        ["b", 2, "--"],
        ["c", 3, "---"]
      ]);
    expect(result).toEqual([
      ["a", "b", "c"], [1, 2, 3], ["-", "--", "---"]
    ]);
  });

  it('unzip arrays of different length', function(){
    var result = [ ["a", 1], ["b", 2, "--"] ].zip();
    expect(result).toEqual([
      ["a", "b"], [1, 2]
    ]);
  });

  it('unzip arrays of different length - 2', function(){
    var result = [ ["a", 1, "-"], ["b", 2] ].zip();
    expect(result).toEqual([
      ["a", "b"], [1, 2]
    ]);
  });

  it('unzip emtpy array', function(){
    var result = [].zip();
    expect(result).toEqual([]);
  });

});