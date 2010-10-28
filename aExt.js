var aExt = {

    error: function(msg) {
      var console = window.console;
      if (console) console.error(msg);
    },

    log: function(msg) {
      var console = window.console;
      if (console) console.log(msg);
    },

    browserImplements: {
      map:          Array.prototype.map,        // ECMA-262.pdf p 135
      sort:         Array.prototype.sort,       // ECMA-262.pdf p 128
      indexOf:      Array.prototype.indexOf,    // ECMA-262.pdf p 132
      every:        Array.prototype.every,      // ECMA-262.pdf p 133
      some:         Array.prototype.some,       // ECMA-262.pdf p 134
      forEach:      Array.prototype.forEach,    // ECMA-262.pdf p 135
      filter:       Array.prototype.filter,     // ECMA-262.pdf p 136
      reduce :      Array.prototype.reduce,     // ECMA-262.pdf p 137
      reduceRight : Array.prototype.reduceRight // ECMA-262.pdf p 138
      /*
      zip
      unzip
       */
    },

    extend: function () {
      if (!this.browserImplements.reduce) {
        Array.prototype.reduce = function(f, initval) {
          // reduce function must be defined,
          // since native reduce implementation require this.
          if (!f) {
            aExt.error("Reduce function must be defined.");
          }
          else {
            return aExt.reduce(this, f, initval);
          }
        }
      }
      else {
        aExt.log ("Browser implements reduce, aExt.reduce not used.");
      }
    },

    reduce: function (array, f, initval) {

      var f = f || function (a, i) { return a + i; };

      if (this.browserImplements.reduce) {
        return initval && array.length > 0
            ? array.reduce(f, initval)
            : array.length > 0 ? array.reduce(f) : initval;
      } else {
        var inner = function (acc, array, f) {
          var result = array.length > 0 ? f(acc, array[0]) : acc;
          return array.length > 0
                  ? inner(result, array.slice(1), f)
                  : result;
        };
       
        return initval ? inner(initval, array, f)
                       : inner(array[0], array.slice(1), f);
      }
    },

    map: function (array, f) {

      if (this.browserImplements.map){
        return array.map(f);
      } else {
        var inner = function (acc, array, f, i, len) {
          var res = array.length > 0 ? f(acc, array[0])
        }
      }
    }
};