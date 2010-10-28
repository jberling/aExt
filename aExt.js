var aExt = {

    error: function(msg) {
      var console = console;
      if (console) console.error(msg);
    },

    log: function(msg) {
      var console = console;
      if (console) console.log(msg);
    },

    browserImplementations: {
      reduce : !Array.prototype.reduce
    },

    extend: function () {
      if (this.browserImplementations.reduce) {
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
        aExt.log ("Browser implements reduce, aExt reduce not used.");
      }
    },

    reduce: function (array, f, initval) {

      var f = f || function (a, i) { return a + i; };

      if (this.browserImplementations.reduce) {

        return array.reduce(f, initval);

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
    }
};