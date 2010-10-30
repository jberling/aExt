## zip ##

The zip combines an array of arrays. 
All first item in every sub array will be associated with each others, the second item in every
sub array will be associated with every other second item and so forth. 

    var fruits =
      [ ["apple" , "pear"   , "banana"],
        ["red"   , "green"  , "yellow"],
        ["Sweden", "Holland", "Kenya" ]
      ].zip()

The code above will result in this:

    [ ["apple" , "red"   , "Sweden" ],
      ["pear"  , "green" , "Holland"],
      ["banana", "yellow", "Kenya"  ]
    ]

If you want to reverse the process, you can call zip again, since it also works as an "unzip" function.

There is also a possibility to define a "zipMap" function, if you don't want to
place the zipped values in an array.

    var fruits =
      [ ["apple" , "pear"   , "banana"],
        ["red"   , "green"  , "yellow"],
        ["Sweden", "Holland", "Kenya" ]
      ].zip(function(name, color, origin) {
	      return {name: name, color: color, origin: origin};
      });

The code above will result in this:

    [ {name: "apple" , color: "red"   , origin: "Sweden" },
      {name: "pear"  , color: "green" , origin: "Holland"},
      {name: "banana", color: "yellow", origin: "Kenya"  }
    ]