(function(window, undefined){
   var Stub = window.Stub = window.Stub || function(name) {
      this.name = name;
      this.currentMethodName = undefined;
      this.currentParameterName = undefined;
      this.currentPropertyName = undefined;
      this.currentParameterName = undefined;
      this.currentIteratorName = undefined;
      this.methods = {};
      this.properties = {};
      this.iterators = {};
   };


   Stub.ANY = '*';

   Stub.prototype = {
      method: function(name) {
         var methodObj = {name:name};
         this.methods[name] = methodObj;
         this.currentMethodName = name;
         return this;
      },
      property: function(name, value, type) {
         var propertyObj = {name:name, type:(type || Stub.ANY), value:(value || undefined), constant:false};
         this.currentPropertyName = name;
         this.properties[name] = propertyObj;
         return this;
      },
      type: function(value) {
         var propertyObj = this.properties[this.currentPropertyName];
         propertyObj.type = value;
         return this;
      },
      value: function(value) {
         var propertyObj = this.properties[this.currentPropertyName];
         propertyObj.value = value;
         return this;
      },
      constant: function() {
         var propertyObj = this.properties[this.currentPropertyName];
         propertyObj.constant = true;
         return this;
      },
      variable: function() {
         var propertyObj = this.properties[this.currentPropertyName];
         propertyObj.constant = false;
         return this;
      },
      when: function(value) {
         var methodObj = this.methods[this.currentMethodName];
         methodObj.when = methodObj.when || {};
         value = JSON.stringify(Array.prototype.slice.apply(arguments));
         methodObj.when[value] = true;
         this.currentParameterName = value;
         return this;
      },
      returns: function(value) {
         if (this.currentIteratorName) {
            return this;
         };

         var methodObj = this.methods[this.currentMethodName];
         methodObj.when = methodObj.when || {};
         if (methodObj.otherwise === true) {
            methodObj.otherwise = value;
            this.currentParameterName = undefined;
         } else if (methodObj.always === true) {
            methodObj.always = value;
            this.currentParameterName = undefined;
         };
         if (this.currentParameterName && methodObj.when[this.currentParameterName]) {
            methodObj.when[this.currentParameterName] = value || undefined;
         };
         return this;
      },
      otherwise: function() {
         var methodObj = this.methods[this.currentMethodName];
         methodObj.otherwise = true;
         return this;
      },
      always: function() {
         if (this.currentMethodName) {
            var methodObj = this.methods[this.currentMethodName];
            methodObj.always = true;
         } else if (this.currentIteratorName) {
            var iteratorObj = this.iterators[this.currentIteratorName];
            iteratorObj.always = true;
         };
         return this;
      },
      iterator: function(name) {
         var iteratorObj = {name:name, yields:[]};
         this.currentIteratorName = name;
         this.iterators[name] = iteratorObj;
         return this;
      },
      yields: function(value) {
         var iteratorObj = this.iterators[this.currentIteratorName];
         if (iteratorObj.always === true) {
            iteratorObj.always = value;
         };
         iteratorObj.yields.push(value);
         return this;
      },
      bindTo: function(value) {
         var iteratorObj = this.iterators[this.currentIteratorName];
         if (value instanceof Array) {
            iteratorObj.yields = value;
         } else if (typeof value === 'string' && value !== '') {
            if (this.properties[value].value instanceof Array) {
               iteratorObj.yields = this.properties[value].value;
            };
         };
         return this;
      },
      done: function() {
         if (this.currentMethodName) {
            var methodObj = this.methods[this.currentMethodName];
            methodObj.when = methodObj.when || {};
            if (methodObj.always === true) {
               methodObj.always = undefined;
            };
            if (methodObj.otherwise === true) {
               methodObj.otherwise = undefined;
            };
            this[this.currentMethodName] = function() {
               return methodObj.always || methodObj.when[JSON.stringify(Array.prototype.slice.apply(arguments))] || methodObj.otherwise;
            };
         } else if (this.currentPropertyName) {
            var propertyObj = this.properties[this.currentPropertyName];
            if (propertyObj.constant) {
               Object.defineProperty(this, this.currentPropertyName, {
                  writable : false,
                  get: function() {
                     return propertyObj.value;
                  }
               });
            } else {
               Object.defineProperty(this, this.currentPropertyName, {
                  get: function() {
                     return propertyObj.value;
                  },
                  set: function(value) {
                     if (typeof value === propertyObj.type) {
                        propertyObj.value = value;
                     }
                  }
               });
            };
         } else if (this.currentIteratorName) {
            var iteratorObj = this.iterators[this.currentIteratorName];
            if (iteratorObj.always === true) {
               iteratorObj.always = undefined;
            }
            this[this.currentIteratorName] = {
               next: function() {
                  if (this.always) {
                     return this.always;
                  } else if (this.yields.length > 0) {
                     return this.yields.shift();
                  } else {
                     return null;
                  };
               }.bind(iteratorObj)
            };
         };
         this.currentMethodName = undefined;
         this.currentParameterName = undefined;
         this.currentPropertyName = undefined;
         this.currentParameterName = undefined;
         this.currentIteratorName = undefined;
         return true;
      }
   }

})(window);
