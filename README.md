# aExt #

aExt is a collection of methods that extends the JavaScript Array. They have been tested on
Chrome 7, Firefox 3.6 and Opera 10.6. The methods do not work very well with IE8, yet.

## ECMA-262 ##

The ECMA-262 specification (http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
defines several useful array methods. aExt only Implements these methods for browsers who doesn't implement them natively.
So far aExt offers implementations of filter, map, reduce and every.

## Beyond ECMA

### compact ###

The compact method removes undefined and null values from an array. The optional
parameter decides if empty arrays should be removed also.

This method is not recursive, and will only remove instances the highest level.

    [ "a", null, false, undefined, 1, [], [[]] ].compact()

The code above will result in the code below.

    [ "a", false, 1, [], [[]] ]


### flatten ###

Flatten returns an array where all sub arrays have been replaced with their items. This way
a "one-dimensional" array is created. It removes empty arrays.

    [ [ "a", ["b"] ], "c", [] ].flatten()

will result in

    [ "a", "b", "c" ]

### zip (and unzip) ###

The zip method combines an array of arrays.
All first item in every sub array will be associated with each others, the second item in every
sub array will be associated with every other second item and so forth. 

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