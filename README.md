## zip ##

The zip combines an array of arrays. 
All first item in every sub array will be associated with each others, the second item in every
sub array will be associated with every other second item and so forth. 

If you want to, you can define a "zipper" function. It maps the associated items into the returned
result. If no "zipper" function is defined the associated items will be placed in an array.

    var fruits = 
        [ ["apple", "pear", "banana"], 
          ["red", "green", "yellow"] 
        ].zip(function(name, color) {
	  return { name: name, color: color };
        });

The code above will result in this:

    [ { name: "apple",  color: "red"    },
      { name: "pear",   color: "green"  },
      { name: "banana", color: "yellow" } ]