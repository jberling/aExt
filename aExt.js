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

  _isEmptyArray: function(o){
    return o instanceof Array && o.length === 0;
  },
  
  filter: function(array, func, thisArg) {
    return this.reduce(array, function(acc, item, index, array){
      var keep = func.apply(thisArg, [item, index, array]);
      if(keep){
        return acc.concat(item instanceof Array ? [item] : item);
      } else {
        return acc;
      }
    }, [])
  },

  reduce: function (array, func, initval) {
    var i = 0, acc;

    if (initval !== null && initval !== undefined) {
      acc = initval;
    } else {
      acc = array[0];
      i++;
    }

    for (i; i < array.length; i++) {
      acc = func(acc, array[i], i, array);
    }
    
    return acc;
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

  first: function(array) { return array[0]; },

  last: function(array) { return array[array.length-1]; },

  zip : function(array, zipMap) { // also works as unzip

    if (array.length > 0) {
      var zipped = array.reduce(function(acc, rest){
        return acc.map(function(item, index){
          arrayItem = item instanceof Array ? item : [item];
          if (rest[index]) {
            return arrayItem.concat(rest[index]);
          }
        })
      });

      zipped = zipped.compact(false);

      if (zipMap) {
        return zipped.map(function(item){
          return zipMap.apply(this, item);
        })
      } else {
        return zipped;
      }
    } else {
      return [];
    }
  },

  flatten: function (array) {
    if (array.length > 0) {
      return array.reduce(function(acc, item){
        var flattened = item instanceof Array ?
            item.flatten().compact(true) : item;
        return acc instanceof Array ? acc.concat(flattened)
            : [acc, flattened];
      }, []);
    } else {
      return [];
    }
  },

  compact: function(array, removeEmpty) {
    if(array.length>0) {
      return array.filter(function(item){
        if (removeEmpty && item instanceof Array) {
          return item.length > 0;
        } else {
          return item !== undefined && item !== null;
        }
      });
    }
  },

  invert : function(array) {
    return array.reduce(function(acc, item){
      return [item].concat(acc);
    }, []);
  },

  max: function(array, propertyName) {

    if (propertyName && typeof(propertyName) === "string") {
      return array.reduce(function(acc, item){
        if (typeof(acc[propertyName]) !== typeof(item[propertyName])) {
          if (!aExt._isEmptyArray(item)) {
            aExt._warn ("max is called by an array containing items of different type.");
          }
        }
        return item[propertyName] > acc[propertyName] ? item: acc;
      })
    } else {
      return array.reduce(function(acc, item){
        if (typeof(acc) !== typeof(item)) {
          if (!aExt._isEmptyArray(item)) {
            aExt._warn ("max is called by an array containing items of different type.");
          }
        }
        return item > acc ? item: acc;
      })
    }
  },

  min: function(array, propertyName) {
    if (propertyName && typeof(propertyName) === "string") {
      return array.reduce(function(acc, item){
        if (typeof(acc[propertyName]) !== typeof(item[propertyName])) {
          if (!aExt._isEmptyArray(item)) {
            aExt._warn ("min is called by an array containing items of different type.");
          }
        }
        return item[propertyName] < acc[propertyName] ? item: acc;
      })
    } else {
      return array.reduce(function(acc, item){
        if (typeof(acc) !== typeof(item)) {
          if (!aExt._isEmptyArray(item)) {
            aExt._warn ("min is called by an array containing items of different type.");
          }
        }
        return item < acc ? item: acc;
      })
    }
  },

  distinct: function(array){
    var sorted =  array.order();
    
    return sorted.reduce(function(acc, item){
      if (acc.last() === item) {
        return acc;
      } else {
        return acc.concat(item);
      }
    }, []);
  },

  order: function(array, comparer) {
    var clone = array.slice();
    return clone.sort(comparer);
  },

  orderBy: function(array, propertyName) {

    var splitted = propertyName.split(" "),
        desc = splitted.first().match(/:desc */),
        prop = splitted.last();

    return array.order(function(x, y){
      return desc ? x[prop] < y[prop] :  x[prop] > y[prop];
    })
  }

  // Todo: Implement these

  // orderBy: instead of thenBy, use more variables. persons.orderBy("age, desc:income")
  // average: returns the average value.
  // contains: or does it exists already?
  // except: [1, 2, 3].except([2]) --> [1, 3]
  // groupBy: group items returning the same result.
  // intersect: [1, 2, 3, 4].intersect([2, 3, 5]) --> [2, 3]
  // joinSets: [1, 2, 3, 4].joinSets([2, 3, 4]) --> [1, 2, 3, 4, 5]
  // difference: [1, 2, 3, 4].difference([3, 4, 5]) --> [1, 2]
  // symmetricDiff: [1, 2, 3, 4].symmetricDiff([3, 4, 5]) --> [1, 2, 5]
  // skipTil: [1, 2, 3, 4].skipWhile(function(item){ return item < 3; }
  // 
  // ECMA: reduceRight
  // ECMA: indexOf, lastIndexOf
};

(function(){
  // Todo: Check out [[DefineOwnProperty]](p, desc, throw) to see if that's a better way of handling things.

  if (aExt._extendArray) {

    var extendArray = function(name, method){
      if (Array.prototype[name]) {
        var clashName = aExt._clashPrefix + name;
        aExt._log(
          "Array.prototype." + name + " already implemented. Use Array.prototype."
          + clashName + " if you want to use aExt's implementation.");
          Array.prototype[clashName] = method;
      }
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

      ["first", function() {
        return aExt.first(this);
      }],

      ["last", function() {
        return aExt.last(this);
      }],

      ["every", function(func, thisArg) { return aExt.every(this, func, thisArg); }],

      ["some", function(func, thisArg) { return aExt.some(this, func, thisArg); }],

      ["none", function(func, thisArg) { return aExt.none(this, func, thisArg); }],

      ["zip", function(zipMap){ return aExt.zip(this, zipMap); }],

      ["flatten", function(){ return aExt.flatten(this); }],

      ["invert", function() { return aExt.invert(this); }],

      ["max", function(propertyName) { return aExt.max(this, propertyName); }],

      ["min", function(propertyName) { return aExt.min(this, propertyName); }],  

      ["compact", function(removeEmpty){ return aExt.compact(this, removeEmpty); }],

      ["distinct", function() { return aExt.distinct(this); }],

      ["order", function(comparer) { return aExt.order(this, comparer); }],

      ["orderBy", function(propertyName) { return aExt.orderBy(this, propertyName); }]  

    ];

    for (var i = 0; i < methods.length; i++){
      extendArray(methods[i][0], methods[i][1]);
    }
  }
})();