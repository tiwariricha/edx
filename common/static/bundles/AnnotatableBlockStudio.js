(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([45,46,47],{

/***/ "./common/static/xmodule/descriptors/js/001-f7c2cfb3cff0dd3aefa932f8e02d1435.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(CodeMirror, $) {/*** IMPORTS FROM imports-loader ***/
(function () {

  // Once generated by CoffeeScript 1.9.3, but now lives as pure JS
  /* eslint-disable */
  (function () {
    var extend = function extend(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
      }function ctor() {
        this.constructor = child;
      }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
    },
        hasProp = {}.hasOwnProperty;

    this.XMLEditingDescriptor = function (superClass) {
      extend(XMLEditingDescriptor, superClass);

      function XMLEditingDescriptor(element) {
        this.element = element;
        this.edit_box = CodeMirror.fromTextArea($(".edit-box", this.element)[0], {
          mode: "xml",
          lineNumbers: true,
          lineWrapping: true
        });
      }

      XMLEditingDescriptor.prototype.save = function () {
        return {
          data: this.edit_box.getValue()
        };
      };

      return XMLEditingDescriptor;
    }(XModule.Descriptor);
  }).call(this);
}).call(window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./common/static/js/vendor/codemirror-compressed.js"), __webpack_require__(0)))

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./common/static/xmodule/descriptors/js/000-58032517f54c5c1a704a908d850cbe64.js");
module.exports = __webpack_require__("./common/static/xmodule/descriptors/js/001-f7c2cfb3cff0dd3aefa932f8e02d1435.js");


/***/ })

},[7])));
//# sourceMappingURL=AnnotatableBlockStudio.js.map