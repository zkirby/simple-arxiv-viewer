"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function (e, n) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = n();else if ("function" == typeof define && define.amd) define([], n);else {
    var r = n();
    for (var t in r) ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[t] = r[t];
  }
}(window, function () {
  return function (e) {
    var n = {};
    function r(t) {
      if (n[t]) return n[t].exports;
      var o = n[t] = {
        i: t,
        l: !1,
        exports: {}
      };
      return e[t].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    return r.m = e, r.c = n, r.d = function (e, n, t) {
      r.o(e, n) || Object.defineProperty(e, n, {
        enumerable: !0,
        get: t
      });
    }, r.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, r.t = function (e, n) {
      if (1 & n && (e = r(e)), 8 & n) return e;
      if (4 & n && "object" == _typeof(e) && e && e.__esModule) return e;
      var t = Object.create(null);
      if (r.r(t), Object.defineProperty(t, "default", {
        enumerable: !0,
        value: e
      }), 2 & n && "string" != typeof e) for (var o in e) r.d(t, o, function (n) {
        return e[n];
      }.bind(null, o));
      return t;
    }, r.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return r.d(n, "a", n), n;
    }, r.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }, r.p = "", r(r.s = 0);
  }({
    "./xmlParser.js": function xmlParserJs(e, n) {
      function r(e, n) {
        for (var r = 0; r < n.length; r++) {
          var t = n[r];
          t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(e, t.key, t);
        }
      }
      e.exports = function () {
        function e() {
          !function (e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
          }(this, e);
        }
        var n, t, o;
        return n = e, (t = [{
          key: "_parseFromString",
          value: function value(e) {
            var n = this,
              r = (e = this._encodeCDATAValues(e)).replace(/\s{2,}/g, " ").replace(/\\t\\n\\r/g, "").replace(/>/g, ">\n").replace(/\]\]/g, "]]\n"),
              t = [];
            return r.split("\n").map(function (e) {
              if ((e = e.trim()) && !(e.indexOf("?xml") > -1)) if (0 == e.indexOf("<") && e.indexOf("CDATA") < 0) {
                var r = n._parseTag(e);
                t.push(r), e.match(/\/\s*>$/) && t.push(n._parseTag("</" + r.name + ">"));
              } else t[t.length - 1].value += " ".concat(n._parseValue(e));
            }), this._convertTagsArrayToTree(t)[0];
          }
        }, {
          key: "_encodeCDATAValues",
          value: function value(e) {
            for (var n = new RegExp(/<!\[CDATA\[([^\]\]]+)\]\]/gi), r = n.exec(e); r;) r.length > 1 && (e = e.replace(r[1], encodeURIComponent(r[1]))), r = n.exec(e);
            return e;
          }
        }, {
          key: "_getElementsByTagName",
          value: function value(e) {
            var n = [];
            return "*" != e && this.name.toLowerCase() !== e.toLowerCase() || n.push(this), this.children.map(function (r) {
              n = n.concat(r.getElementsByTagName(e));
            }), n;
          }
        }, {
          key: "_parseTag",
          value: function value(e, n) {
            var r = e.match(/([^\s]*)=('([^']*?)'|"([^"]*?)")|([\/?\w\-\:]+)/g),
              t = {
                name: r.shift().replace(/\/\s*$/, ""),
                attributes: {},
                children: [],
                value: "",
                getElementsByTagName: this._getElementsByTagName
              };
            return r.map(function (e) {
              var n = e.split("=");
              if (!(n.length < 2)) {
                var r = n[0],
                  o = "";
                o = 2 === n.length ? n[1] : (n = n.slice(1)).join("="), t.attributes[r] = "string" == typeof o ? o.replace(/^"/g, "").replace(/^'/g, "").replace(/"$/g, "").replace(/'$/g, "").trim() : o;
              }
            }), t;
          }
        }, {
          key: "_parseValue",
          value: function value(e) {
            return e.indexOf("CDATA") < 0 ? e.trim() : e.substring(e.lastIndexOf("[") + 1, e.indexOf("]"));
          }
        }, {
          key: "_convertTagsArrayToTree",
          value: function value(e) {
            for (var n = []; e.length > 0;) {
              var r = e.shift();
              if (r.value.indexOf("</") > -1 || r.name.match(/\/$/)) r.name = r.name.replace(/\/$/, "").trim(), r.value = r.value.substring(0, r.value.indexOf("</")).trim(), n.push(r);else {
                if (0 == r.name.indexOf("/")) break;
                n.push(r), r.children = this._convertTagsArrayToTree(e), r.value = decodeURIComponent(r.value.trim());
              }
            }
            return n;
          }
        }, {
          key: "_toString",
          value: function value(e) {
            var n = this,
              r = this._convertTagToText(e);
            return e.children.length > 0 && (e.children.map(function (e) {
              r += n._toString(e);
            }), r += "</" + e.name + ">"), r;
          }
        }, {
          key: "_convertTagToText",
          value: function value(e) {
            var n = "<" + e.name;
            for (var r in e.attributes) n += " " + r + '="' + e.attributes[r] + '"';
            return e.value.length > 0 ? n += ">" + e.value : n += ">", 0 === e.children.length && (n += "</" + e.name + ">"), n;
          }
        }, {
          key: "parseFromString",
          value: function value(e) {
            return this._parseFromString(e);
          }
        }, {
          key: "toString",
          value: function value(e) {
            return this._toString(e);
          }
        }]) && r(n.prototype, t), o && r(n, o), e;
      }();
    },
    0: function _(e, n, r) {
      e.exports = r("./xmlParser.js");
    }
  });
});