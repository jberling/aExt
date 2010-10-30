var aExt = {

  disableWarnings: false, // change this if you don't want any warnings.

  warn: function(msg){
    if (window.console && !this.disableWarnings) {
      window.console.warn(msg);
    }
  },

  zip : function(array, zipMap) { // also works as unzip

    if (array.length) {
      var zipped = array.reduce(function(acc, rest){
        return acc.map(function(item, index){
          item = item instanceof Array ? item : [item];
          if (rest[index]) return item.concat(rest[index]);
        })
      });

      zipped = zipped.filter(function(item){return item ? true : false});

      if (zipMap) {
        return zipped.map(function(item){
          return zipMap.apply(this, item);
        })
      } else return zipped;
    } else return [];
  }
};

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