(function(window, undefined) {
   window.external = window.external || function(path, namespace) {
      if (typeof path !== 'string') {
         throw new Error('Path is not a string');
      }
      if (path.length === 0) {
         throw new Error('Empty path')
      }
      if (typeof namespace !== 'string') {
         throw new Error('Namespace is not a string');
      }
      if (namespace.length === 0) {
         throw new Error('Empty namespace')
      }
      if (/^http(s)?:\/\//.test(path)) {
         if ('XMLHttpRequest' in window) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('progress', function(xhr, code, status) {
               if (status == 4) {
                  if (code == 200 || code == 302) {
                     Package(namespace, eval(xhr.responseText));
                  }
               }
            });
            xhr.open('GET', path, true);
            xhr.send(null);
            return true;
         }
      } else if (/^ls:\/\//.test(path)) {
         if ('localStorage' in window) {
            Package(namespace, eval(localStorage.getItem(path.substring(5))));
            return true;
         }
      }
      return false;
   }
})(window);
