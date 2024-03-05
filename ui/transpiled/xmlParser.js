"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  _createClass(_class, [{
    key: "_parseFromString",
    value: function _parseFromString(xmlText) {
      var _this = this;
      xmlText = this._encodeCDATAValues(xmlText);
      var cleanXmlText = xmlText.replace(/\s{2,}/g, ' ').replace(/\\t\\n\\r/g, '').replace(/>/g, '>\n').replace(/\]\]/g, ']]\n');
      var rawXmlData = [];
      cleanXmlText.split('\n').map(function (element) {
        element = element.trim();
        if (!element || element.indexOf('?xml') > -1) {
          return;
        }
        if (element.indexOf('<') == 0 && element.indexOf('CDATA') < 0) {
          var parsedTag = _this._parseTag(element);
          rawXmlData.push(parsedTag);
          if (element.match(/\/\s*>$/)) {
            rawXmlData.push(_this._parseTag('</' + parsedTag.name + '>'));
          }
        } else {
          rawXmlData[rawXmlData.length - 1].value += " ".concat(_this._parseValue(element));
        }
      });
      return this._convertTagsArrayToTree(rawXmlData)[0];
    }
  }, {
    key: "_encodeCDATAValues",
    value: function _encodeCDATAValues(xmlText) {
      var cdataRegex = new RegExp(/<!\[CDATA\[([^\]\]]+)\]\]/gi);
      var result = cdataRegex.exec(xmlText);
      while (result) {
        if (result.length > 1) {
          xmlText = xmlText.replace(result[1], encodeURIComponent(result[1]));
        }
        result = cdataRegex.exec(xmlText);
      }
      return xmlText;
    }
  }, {
    key: "_getElementsByTagName",
    value: function _getElementsByTagName(tagName) {
      var matches = [];
      if (tagName == '*' || this.name.toLowerCase() === tagName.toLowerCase()) {
        matches.push(this);
      }
      this.children.map(function (child) {
        matches = matches.concat(child.getElementsByTagName(tagName));
      });
      return matches;
    }
  }, {
    key: "_parseTag",
    value: function _parseTag(tagText, parent) {
      var cleanTagText = tagText.match(/([^\s]*)=('([^']*?)'|"([^"]*?)")|([\/?\w\-\:]+)/g);
      var tag = {
        name: cleanTagText.shift().replace(/\/\s*$/, ''),
        attributes: {},
        children: [],
        value: '',
        getElementsByTagName: this._getElementsByTagName
      };
      cleanTagText.map(function (attribute) {
        var attributeKeyVal = attribute.split('=');
        if (attributeKeyVal.length < 2) {
          return;
        }
        var attributeKey = attributeKeyVal[0];
        var attributeVal = '';
        if (attributeKeyVal.length === 2) {
          attributeVal = attributeKeyVal[1];
        } else {
          attributeKeyVal = attributeKeyVal.slice(1);
          attributeVal = attributeKeyVal.join('=');
        }
        tag.attributes[attributeKey] = 'string' === typeof attributeVal ? attributeVal.replace(/^"/g, '').replace(/^'/g, '').replace(/"$/g, '').replace(/'$/g, '').trim() : attributeVal;
      });
      return tag;
    }
  }, {
    key: "_parseValue",
    value: function _parseValue(tagValue) {
      if (tagValue.indexOf('CDATA') < 0) {
        return tagValue.trim();
      }
      return tagValue.substring(tagValue.lastIndexOf('[') + 1, tagValue.indexOf(']'));
    }
  }, {
    key: "_convertTagsArrayToTree",
    value: function _convertTagsArrayToTree(xml) {
      var xmlTree = [];
      while (xml.length > 0) {
        var tag = xml.shift();
        if (tag.value.indexOf('</') > -1 || tag.name.match(/\/$/)) {
          tag.name = tag.name.replace(/\/$/, '').trim();
          tag.value = tag.value.substring(0, tag.value.indexOf('</')).trim();
          xmlTree.push(tag);
          continue;
        }
        if (tag.name.indexOf('/') == 0) {
          break;
        }
        xmlTree.push(tag);
        tag.children = this._convertTagsArrayToTree(xml);
        tag.value = decodeURIComponent(tag.value.trim());
      }
      return xmlTree;
    }
  }, {
    key: "_toString",
    value: function _toString(xml) {
      var _this2 = this;
      var xmlText = this._convertTagToText(xml);
      if (xml.children.length > 0) {
        xml.children.map(function (child) {
          xmlText += _this2._toString(child);
        });
        xmlText += '</' + xml.name + '>';
      }
      return xmlText;
    }
  }, {
    key: "_convertTagToText",
    value: function _convertTagToText(tag) {
      var tagText = '<' + tag.name;
      var attributesText = [];
      for (var attribute in tag.attributes) {
        tagText += ' ' + attribute + '="' + tag.attributes[attribute] + '"';
      }
      if (tag.value.length > 0) {
        tagText += '>' + tag.value;
      } else {
        tagText += '>';
      }
      if (tag.children.length === 0) {
        tagText += '</' + tag.name + '>';
      }
      return tagText;
    }
  }, {
    key: "parseFromString",
    value: function parseFromString(xmlText) {
      return this._parseFromString(xmlText);
    }
  }, {
    key: "toString",
    value: function toString(xml) {
      return this._toString(xml);
    }
  }]);
  return _class;
}();