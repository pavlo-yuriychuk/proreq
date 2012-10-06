(function (e, t) {
    "use strict";
    var n = {_:e, __:""}, r = {"":n};
    e.Provide = e.Provide || function (e, t, i) {
        if (typeof e != "string" || !t)return!1;
        var s = e.split("."), o, u = n, a = s.length, f;
        if (a < 2)return u[s[0]] = t, !0;
        var l = a - 1;
        for (f = 0; f < l; f++)o = s[f], u = u[o] = u[o] || {_:u, __:o};
        var c = s[l];
        return i && (i.package === !0 && (t._ = u, t.__ = c), i.override === !0 && (delete u[c], delete r[e]), i.cache === !0 && (r[e] = t)), u[c] = t, !0
    }, e.Require = e.Require || function (e) {
        if (r.hasOwnProperty(e))return r[e];
        var t = e.split("."), i, s = n, o = t.length, u;
        for (u = 0; u < o; u++) {
            i = t[u], s = s[i];
            if (!s)return null
        }
        return s
    }, e.Package = e.Package = function (e) {
        return r.hasOwnProperty(e) && delete r[e], provide(e, {}, {cache:!0, override:!0, "package":!0})
    }, e.fqn = e.fqn || function (e) {
        if (!isPackage(e))return"" + e;
        var t = [];
        while (e !== n)t.unshift(e.__), e = e._;
        return t.join(".")
    }, e.isPackage = e.isPackage || function (e) {
        return e !== null && typeof e == "object" && e._ !== t && e._ !== null
    }, e.__ns = e.__ns || n
})(window)