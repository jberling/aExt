var aExt = {

  disableWarnings: false,

  warn: function(msg){
    if (window.console && !this.disableWarnings) {
      window.console.warn(msg);
    }
  },

  zip : function(array, zipper) {

    if (array.length === 0) return [];

    var inner = function (acc, rest) {

      var current = rest.map(function(item){
        return item[0];
      });

      var cont = rest.every(function(item, index){
        return item.length > 0;
      });

      if (cont) {
        var rest = rest.map(function(item) {
          return item.slice(1);
        });
        var acc = acc.length > 0
            ? acc.concat([current]) : [current];
        return inner(acc, rest);
      }
      else return acc;
    };

    var zipped = inner ([], array);

    return zipper ? zipped.map(zipper) : zipped;

  }
};

// combines an array of arrays into pairs. Add a "zipper" function to tell how to
// combine the items.
(function(){

  if(!Array.prototype.map) this.warn("Array.prototype.map not implemented");
  if(!Array.prototype.every) this.warn("Array.prototype.every not implemented");

  if (Array.prototype.zip) {
    this.warn("Array.prototype.zip already defined. Use aExt.zip instead.");
  } else {
    Array.prototype.zip = function(zipper) {
      return aExt.zip(this, zipper);
    };
  }

})();