# aExt #

aExt is a collection of methods that extends the JavaScript Array. So far they have been tested on
Chrome 7, Firefox 3.6, Opera 10.6 and IE8.

They are intended to be used with a functional approach. The methods will treat the caller
as if it was immutable, and will therefor not change it.

It was inspired by F#, LINQ, Prototype and the ECMA-262 specification.

## ECMA-262 ##
The ECMA-262 specification (http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
defines several useful array methods. aExt only Implements these methods for browsers who doesn't implement them natively.
So far aExt offers implementations of filter, map, forEach, reduce, some and every. (reduceRight, indexOf and lastIndexOf
will also be implemented eventually.)

## Beyond ECMA-262

### none ###
The opposite of some.

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

### first ###
Get the first item in the array.

### last ###
Get the last item in the array.

### invert ###
Like reverse, but instead of changing the caller it returns a reversed copy and leaves the
caller unchanged.

### max ###
returns the biggest value. By default each items is compared as they are, but if a string
is passed as an argument, the items will be treated as an object and the value of the property
with the same name as the string will be compared.

    [1, 3, 6, 12, 4].max(); // will return 12
    ["a", "z", "q", "b"].max(); // will return "z"
    [{name: "John", age: 46}, {name:"Stephano", age:23}].max("age"); // will return 46

### To come... ###
distinct, order, orderBy, groupBy, average, contains, except, intersect, min, equal


