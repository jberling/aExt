var aExt = {
  _doWarn: true, _doLog: true, _extendArray: true, _clashPrefix: "aExt_",


  _warn: function(msg){
    if (window.console && this._doWarn) {
      window.console.warn(msg);
    }
  },

  _log: function(msg){
    if (window.console && this._doLog) {
      window.console.log(msg);
    }
  },

  filter: function(array, func, thisArg) {
    return this.reduce(array, function(acc, item, index, array){
      var keep = func.apply(thisArg, [item, index, array]);
      if(keep){
        return acc.concat(item instanceof Array ? [item] : item);
      } else return acc;
    }, [])
  },

  reduce: function (array, func, initval) {
    var inner = function (acc, rest, func, index) {
      var result = rest.length > 0 ?
          func(acc, rest[0], index, array) : acc;
      return rest.length > 0
              ? inner(result, rest.slice(1), func, index + 1)
              : result;
    };

    return !(initval === null || initval === undefined)
        ? inner(initval, array, func, 0)
        : inner(array[0], array.slice(1), func, 0);
  },

  map: function (array, func, thisArg) {
    return this.reduce(array, function(acc, item, index, array){
      var mapped = func.apply(thisArg, [item, index, array]);
      return acc.concat(mapped instanceof Array ? [mapped] : mapped);
    },[]);
  },

  forEach: function(array, func, thisArg) {
    for(var i = 0; i < array.length; i++){
      func.apply(thisArg, [array[i], i, array]);
    }
    return array;
  },

  every: function(array, func, thisArg) {
    var inner = function(rest, func, index) {
      if (rest.length === 0) {
        return true;
      } else {
        var res = func.apply(thisArg, [rest[0], index, array]);
        return res ? inner(rest.slice(1), func, index + 1) : false;
      }
    };
    return inner(array, func, 0);
  },

  some: function(array, func, thisArg) {
    var inner = function(rest, func, index) {
      if(rest.length === 0) {
        return false;
      }
      else {
        var res = func.apply(thisArg, [rest[0], index, array]);
        return res ? true : inner(rest.slice(1), func, index + 1);
      }
    };
    return inner(array, func, 0)
  },

  none: function(array, func, thisArg) {
    return !array.some(func, thisArg);
  },

  zip : function(array, zipMap) { // also works as unzip

    if (array.length > 0) {
      var zipped = array.reduce(function(acc, rest){
        return acc.map(function(item, index){
          item = item instanceof Array ? item : [item];
          if (rest[index]) return item.concat(rest[index]);
        })
      });

      zipped = zipped.compact(false);

      if (zipMap) {
        return zipped.map(function(item){
          return zipMap.apply(this, item);
        })
      } else return zipped;
    } else return [];
  },

  flatten: function (array) {
    if (array.length > 0) {
      return array.reduce(function(acc, item){
        var flattened = item instanceof Array ?
            item.flatten().compact(true) : item;
        return acc instanceof Array ? acc.concat(flattened)
            : [acc, flattened];
      }, []);
    } else return [];
  },

  compact: function(array, removeEmpty) {
    if(array.length>0) {
      return array.filter(function(item){
        if (removeEmpty && item instanceof Array) {
          return item.length > 0;
        } else return item !== undefined && item !== null;
      });
    }
  }

  // Todo: Implement these
  // distinct : remove similar
  // invert : like inverse, but not changing the "original".
  // order : like sort, but not changing the "original".
  // orderBy: like order, but order on specific property.
  //          [ {name: "John", age: 23}, {name: "Pjotr", age: 12} ].orderBy("age", "name")
  //          instead of thenBy, use more variables. To order descending: orderBy("> age")
  // average: returns the average value.
  // contains: or does it exists already?
  // except: [1, 2, 3].except([2]) --> [1, 3]
  // groupBy: gruppera items som resulterar i samma resultat.
  // intersect: [1, 2, 3, 4].intersect([2, 3, 5]) --> [2, 3]
  // joinSets: [1, 2, 3, 4].joinSets([2, 3, 4]) --> [1, 2, 3, 4, 5]
  // difference: [1, 2, 3, 4].difference([3, 4, 5]) --> [1, 2]
  // symmetricDiff: [1, 2, 3, 4].symmetricDiff([3, 4, 5]) --> [1, 2, 5]
  // first and last?
  // max: get the one with biggest number
  // min: opposite of max
  // skipTil: [1, 2, 3, 4].skipWhile(function(item){ return item < 3; }
  // 
  // ECMA: forEach
  // ECMA: reduceRight
  // ECMA: indexOf, lastIndexOf
};

(function(){
  // Todo: Check out [[DefineOwnProperty]](p, desc, throw) to see if that's a better way of handling things.

  if (aExt._extendArray) {

    var extendArray = function(name, method){
      if (Array.prototype[name]) aExt._log(
          "Array.prototype." + name + " already implemented. Use Array.prototype."
          + aExt._clashPrefix + name + " if you want to use aExt's implementation.");
      else {
        Array.prototype[name] = method;
      }
    };

    var methods = [
      ["filter", function(func, thisArg) {
        return aExt.filter(this, func, thisArg);
      }],

      ["reduce", function(func, initVal) {
        return aExt.reduce(this, func, initVal);
      }],

      ["map", function(func, thisArg) {
        return aExt.map(this, func, thisArg);
      }],

      ["forEach", function(func, thisArg) {
        return aExt.forEach(this, func, thisArg);
      }],

      ["every", function(func, thisArg) { return aExt.every(this, func, thisArg); }],

      ["some", function(func, thisArg) { return aExt.some(this, func, thisArg); }],

      ["none", function(func, thisArg) { return aExt.none(this, func, thisArg); }],

      ["zip", function(zipMap){ return aExt.zip(this, zipMap); }],

      ["flatten", function(){ return aExt.flatten(this); }],

      ["compact", function(removeEmpty){ return aExt.compact(this, removeEmpty); }]
    ];

    for (var i = 0; i < methods.length; i++){
      extendArray(methods[i][0], methods[i][1]);
    }
  }
})();