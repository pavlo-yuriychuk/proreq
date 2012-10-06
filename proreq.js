;
(function (window, undefined) {
    "use strict";

    /**
     * Root for namespaces
     * @type {Object}
     * @private
     */
    var _namespaces = {_:window, __:""},
        _cache = {"":_namespaces};

    /**
     * Export namespace
     * @param {String} path
     * @param {*} entity
     * @param {Object} [options]
     * @return {*}
     */
    window.Provide = window.Provide || function (path, entity, options) {
        if (typeof path !== 'string' || !entity) {
            return false;
        }
        var parts = path.split('.'),
            part,
            root = _namespaces,
            length = parts.length,
            i;

        if (length < 2) {
            root[parts[0]] = entity;
            return true;
        }

        var last = length - 1;
        for (i = 0; i < last; i++) {
            part = parts[i];
            root = root[part] = (root[part] || {_:root, __:part});
        }

        var key = parts[last];

        if (options) {
            if (options.package === true) {
                entity['_'] = root;
                entity['__'] = key;
            }
            if (options.override === true) {
                delete root[key];
                delete _cache[path];
            }
            if (options.cache === true) {
                _cache[path] = entity;
            }
        }

        root[key] = entity;
        return true;
    };

    /**
     * Return the reference to the namespace
     * @param {String} path
     * @return {*}
     */
    window.Require = window.Require || function (path) {
        if (_cache.hasOwnProperty(path)) {
            return _cache[path];
        }

        var parts = path.split('.'),
            part,
            root = _namespaces,
            length = parts.length,
            i;
        for (i = 0; i < length; i++) {
            part = parts[i];
            root = root[part];
            if (!root) {
                return null;
            }
        }
        return root;
    };

    /**
     * Create new package
     * @param {String} path
     * @returns {Boolean}
     */
    window.Package = window.Package = function (path) {
        if (_cache.hasOwnProperty(path)) {
            delete _cache[path];
        }

        return provide(path, {}, {cache:true, override:true, package:true});
    };

    /**
     * Compose fully qualified name of given entity
     * @param {*} entity
     * @returns {String}
     */
    window.fqn = window.fqn || function (entity) {
        if (!isPackage(entity)) {
            return "" + entity;
        }

        var result = [];

        while (entity !== _namespaces) {
            result.unshift(entity.__);
            entity = entity._;
        }

        return result.join('.');

    };

    /**
     * Checks if given entity is a package
     * @param {*} value
     * @returns {Boolean}
     */
    window.isPackage = window.isPackage || function (value) {
        return value !== null && typeof value === "object" && value._ !== undefined && value._ !== null;
    };

    window.__ns = window.__ns || _namespaces;

})(window);