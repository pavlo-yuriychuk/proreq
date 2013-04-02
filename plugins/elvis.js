(function(window, undefined) {
   'use strict';

   window.elvis = window.elvis || function(object, path, value) {
      if (object === null || object === undefined) {
         throw new Error("Null object passed");
      }
      if (typeof path !== 'string') {
         throw new Error("Path parameter is not a string");
      }
      if (path.length == 0) {
         throw new Error("Empty path is passed");
      }
      var parts = path.split('.'),
          part,
          root = object,
          property = path.length > 0 ? parts.pop() : path,
          previousRoot = object,
          previousPart = property;
      while (part = parts.shift()) {
         previousRoot = root;
         root = root[part] = root[part] || {};
         previousPart = part;
      }
      if (value !== undefined) {
         if (typeof root !== 'object') {
             delete previousRoot[previousPart];
             root = previousRoot[previousPart] = {};
         }
         root[property] = value;
         return root;
      } else {
         return root[property];
      }
   };

   Object.prototype.elvis = function(path, value) {
      return elvis(this, path, value);
   }

})(window);