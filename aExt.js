var aExt = {

  disableWarnings: false, // change this if you don't want any warnings.

  warn: function(msg){
    if (window.console && !this.disableWarnings) {
      window.console.warn(msg);
    }
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
        if (removeEmpty&& item instanceof Array) {
          return item.length > 0;
        } else return item !== undefined && item !== null;
      });
    }
  }

  // unique : function (array) {

};

(function(){
  if(!aExt.disableWarnings) {
    if(!Array.prototype.filter) aExt.warn("Array.prototype.filter not implemented");
    if(!Array.prototype.map) aExt.warn("Array.prototype.map not implemented");
    if(!Array.prototype.every) aExt.warn("Array.prototype.every not implemented");
    if(!Array.prototype.concat) aExt.warn("Array.prototype.concat not implemented");
  }

  var extendArray = function(name, method){
    if (Array.prototype[name]) aExt.warn(
        "Array.prototype." + name + " already implemented. You can use aExt."
        + name + " instead.");
    else {
      Array.prototype[name] = method;
    }
  };

  var methods = [
    ["zip", function(zipMap){ return aExt.zip(this, zipMap); }],
    ["flatten", function(){ return aExt.flatten(this); }],
    ["compact", function(removeEmpty){ return aExt.compact(this, removeEmpty); }]
  ];

  for (var i = 0; i < methods.length; i++){
    extendArray(methods[i][0], methods[i][1]);
  }

})();