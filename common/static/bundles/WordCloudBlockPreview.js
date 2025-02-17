(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([23],{

/***/ "./common/lib/xmodule/xmodule/assets/word_cloud/src/js/d3.layout.cloud.js":
/***/ (function(module, exports, __webpack_require__) {

/*
 * Word cloud layout by Jason Davies
 * https://github.com/jasondavies/d3-cloud
 * 
 *
 * Copyright (c) 2012, Jason Davies.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 *   * Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 * 
 *   * Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 * 
 *   * The name Jason Davies may not be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL JASON DAVIES BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function (exports) {
  function cloud() {
    var size = [256, 256],
        text = cloudText,
        font = cloudFont,
        fontSize = cloudFontSize,
        fontStyle = cloudFontNormal,
        fontWeight = cloudFontNormal,
        rotate = cloudRotate,
        padding = cloudPadding,
        spiral = archimedeanSpiral,
        words = [],
        timeInterval = Infinity,
        event = d3.dispatch("word", "end"),
        timer = null,
        cloud = {};

    cloud.start = function () {
      var board = zeroArray((size[0] >> 5) * size[1]),
          bounds = null,
          n = words.length,
          i = -1,
          tags = [],
          data = words.map(function (d, i) {
        d.text = text.call(this, d, i);
        d.font = font.call(this, d, i);
        d.style = fontStyle.call(this, d, i);
        d.weight = fontWeight.call(this, d, i);
        d.rotate = rotate.call(this, d, i);
        d.size = ~~fontSize.call(this, d, i);
        d.padding = cloudPadding.call(this, d, i);
        return d;
      }).sort(function (a, b) {
        return b.size - a.size;
      });

      if (timer) clearInterval(timer);
      timer = setInterval(step, 0);
      step();

      return cloud;

      function step() {
        var start = +new Date(),
            d;
        while (+new Date() - start < timeInterval && ++i < n && timer) {
          d = data[i];
          d.x = size[0] * (Math.random() + .5) >> 1;
          d.y = size[1] * (Math.random() + .5) >> 1;
          cloudSprite(d, data, i);
          if (place(board, d, bounds)) {
            tags.push(d);
            event.word(d);
            if (bounds) cloudBounds(bounds, d);else bounds = [{ x: d.x + d.x0, y: d.y + d.y0 }, { x: d.x + d.x1, y: d.y + d.y1 }];
            // Temporary hack
            d.x -= size[0] >> 1;
            d.y -= size[1] >> 1;
          }
        }
        if (i >= n) {
          cloud.stop();
          event.end(tags, bounds);
        }
      }
    };

    cloud.stop = function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return cloud;
    };

    cloud.timeInterval = function (x) {
      if (!arguments.length) return timeInterval;
      timeInterval = x == null ? Infinity : x;
      return cloud;
    };

    function place(board, tag, bounds) {
      var perimeter = [{ x: 0, y: 0 }, { x: size[0], y: size[1] }],
          startX = tag.x,
          startY = tag.y,
          maxDelta = Math.sqrt(size[0] * size[0] + size[1] * size[1]),
          s = spiral(size),
          dt = Math.random() < .5 ? 1 : -1,
          t = -dt,
          dxdy,
          dx,
          dy;

      while (dxdy = s(t += dt)) {
        dx = ~~dxdy[0];
        dy = ~~dxdy[1];

        if (Math.min(dx, dy) > maxDelta) break;

        tag.x = startX + dx;
        tag.y = startY + dy;

        if (tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 || tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) continue;
        // TODO only check for collisions within current bounds.
        if (!bounds || !cloudCollide(tag, board, size[0])) {
          if (!bounds || collideRects(tag, bounds)) {
            var sprite = tag.sprite,
                w = tag.width >> 5,
                sw = size[0] >> 5,
                lx = tag.x - (w << 4),
                sx = lx & 0x7f,
                msx = 32 - sx,
                h = tag.y1 - tag.y0,
                x = (tag.y + tag.y0) * sw + (lx >> 5),
                last;
            for (var j = 0; j < h; j++) {
              last = 0;
              for (var i = 0; i <= w; i++) {
                board[x + i] |= last << msx | (i < w ? (last = sprite[j * w + i]) >>> sx : 0);
              }
              x += sw;
            }
            delete tag.sprite;
            return true;
          }
        }
      }
      return false;
    }

    cloud.words = function (x) {
      if (!arguments.length) return words;
      words = x;
      return cloud;
    };

    cloud.size = function (x) {
      if (!arguments.length) return size;
      size = [+x[0], +x[1]];
      return cloud;
    };

    cloud.font = function (x) {
      if (!arguments.length) return font;
      font = d3.functor(x);
      return cloud;
    };

    cloud.fontStyle = function (x) {
      if (!arguments.length) return fontStyle;
      fontStyle = d3.functor(x);
      return cloud;
    };

    cloud.fontWeight = function (x) {
      if (!arguments.length) return fontWeight;
      fontWeight = d3.functor(x);
      return cloud;
    };

    cloud.rotate = function (x) {
      if (!arguments.length) return rotate;
      rotate = d3.functor(x);
      return cloud;
    };

    cloud.text = function (x) {
      if (!arguments.length) return text;
      text = d3.functor(x);
      return cloud;
    };

    cloud.spiral = function (x) {
      if (!arguments.length) return spiral;
      spiral = spirals[x + ""] || x;
      return cloud;
    };

    cloud.fontSize = function (x) {
      if (!arguments.length) return fontSize;
      fontSize = d3.functor(x);
      return cloud;
    };

    cloud.padding = function (x) {
      if (!arguments.length) return padding;
      padding = d3.functor(x);
      return cloud;
    };

    return d3.rebind(cloud, event, "on");
  }

  function cloudText(d) {
    return d.text;
  }

  function cloudFont() {
    return "serif";
  }

  function cloudFontNormal() {
    return "normal";
  }

  function cloudFontSize(d) {
    return Math.sqrt(d.value);
  }

  function cloudRotate() {
    return (~~(Math.random() * 6) - 3) * 30;
  }

  function cloudPadding() {
    return 1;
  }

  // Fetches a monochrome sprite bitmap for the specified text.
  // Load in batches for speed.
  function cloudSprite(d, data, di) {
    if (d.sprite) return;
    c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
    var x = 0,
        y = 0,
        maxh = 0,
        n = data.length;
    di--;
    while (++di < n) {
      d = data[di];
      c.save();
      c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font;
      var w = c.measureText(d.text + "m").width * ratio,
          h = d.size << 1;
      if (d.rotate) {
        var sr = Math.sin(d.rotate * cloudRadians),
            cr = Math.cos(d.rotate * cloudRadians),
            wcr = w * cr,
            wsr = w * sr,
            hcr = h * cr,
            hsr = h * sr;
        w = Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 0x1f >> 5 << 5;
        h = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
      } else {
        w = w + 0x1f >> 5 << 5;
      }
      if (h > maxh) maxh = h;
      if (x + w >= cw << 5) {
        x = 0;
        y += maxh;
        maxh = 0;
      }
      if (y + h >= ch) break;
      c.translate((x + (w >> 1)) / ratio, (y + (h >> 1)) / ratio);
      if (d.rotate) c.rotate(d.rotate * cloudRadians);
      c.fillText(d.text, 0, 0);
      c.restore();
      d.width = w;
      d.height = h;
      d.xoff = x;
      d.yoff = y;
      d.x1 = w >> 1;
      d.y1 = h >> 1;
      d.x0 = -d.x1;
      d.y0 = -d.y1;
      x += w;
    }
    var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data,
        sprite = [];
    while (--di >= 0) {
      d = data[di];
      var w = d.width,
          w32 = w >> 5,
          h = d.y1 - d.y0,
          p = d.padding;
      // Zero the buffer
      for (var i = 0; i < h * w32; i++) {
        sprite[i] = 0;
      }x = d.xoff;
      if (x == null) return;
      y = d.yoff;
      var seen = 0,
          seenRow = -1;
      for (var j = 0; j < h; j++) {
        for (var i = 0; i < w; i++) {
          var k = w32 * j + (i >> 5),
              m = pixels[(y + j) * (cw << 5) + (x + i) << 2] ? 1 << 31 - i % 32 : 0;
          if (p) {
            if (j) sprite[k - w32] |= m;
            if (j < w - 1) sprite[k + w32] |= m;
            m |= m << 1 | m >> 1;
          }
          sprite[k] |= m;
          seen |= m;
        }
        if (seen) seenRow = j;else {
          d.y0++;
          h--;
          j--;
          y++;
        }
      }
      d.y1 = d.y0 + seenRow;
      d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
    }
  }

  // Use mask-based collision detection.
  function cloudCollide(tag, board, sw) {
    sw >>= 5;
    var sprite = tag.sprite,
        w = tag.width >> 5,
        lx = tag.x - (w << 4),
        sx = lx & 0x7f,
        msx = 32 - sx,
        h = tag.y1 - tag.y0,
        x = (tag.y + tag.y0) * sw + (lx >> 5),
        last;
    for (var j = 0; j < h; j++) {
      last = 0;
      for (var i = 0; i <= w; i++) {
        if ((last << msx | (i < w ? (last = sprite[j * w + i]) >>> sx : 0)) & board[x + i]) return true;
      }
      x += sw;
    }
    return false;
  }

  function cloudBounds(bounds, d) {
    var b0 = bounds[0],
        b1 = bounds[1];
    if (d.x + d.x0 < b0.x) b0.x = d.x + d.x0;
    if (d.y + d.y0 < b0.y) b0.y = d.y + d.y0;
    if (d.x + d.x1 > b1.x) b1.x = d.x + d.x1;
    if (d.y + d.y1 > b1.y) b1.y = d.y + d.y1;
  }

  function collideRects(a, b) {
    return a.x + a.x1 > b[0].x && a.x + a.x0 < b[1].x && a.y + a.y1 > b[0].y && a.y + a.y0 < b[1].y;
  }

  function archimedeanSpiral(size) {
    var e = size[0] / size[1];
    return function (t) {
      return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
    };
  }

  function rectangularSpiral(size) {
    var dy = 4,
        dx = dy * size[0] / size[1],
        x = 0,
        y = 0;
    return function (t) {
      var sign = t < 0 ? -1 : 1;
      // See triangular numbers: T_n = n * (n + 1) / 2.
      switch (Math.sqrt(1 + 4 * sign * t) - sign & 3) {
        case 0:
          x += dx;break;
        case 1:
          y += dy;break;
        case 2:
          x -= dx;break;
        default:
          y -= dy;break;
      }
      return [x, y];
    };
  }

  // TODO reuse arrays?
  function zeroArray(n) {
    var a = [],
        i = -1;
    while (++i < n) {
      a[i] = 0;
    }return a;
  }

  var cloudRadians = Math.PI / 180,
      cw = 1 << 11 >> 5,
      ch = 1 << 11,
      canvas,
      ratio = 1;

  if (typeof document !== "undefined") {
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    ratio = Math.sqrt(canvas.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
    canvas.width = (cw << 5) / ratio;
    canvas.height = ch / ratio;
  } else {
    // node-canvas support
    var Canvas = __webpack_require__(10);
    canvas = new Canvas(cw << 5, ch);
  }

  var c = canvas.getContext("2d"),
      spirals = {
    archimedean: archimedeanSpiral,
    rectangular: rectangularSpiral
  };
  c.fillStyle = "red";
  c.textAlign = "center";

  exports.cloud = cloud;
})( false ? d3.layout || (d3.layout = {}) : exports);

/***/ }),

/***/ "./common/lib/xmodule/xmodule/assets/word_cloud/src/js/d3.min.js":
/***/ (function(module, exports) {

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/*
 * d3 - Data-Driven Documents
 * https://github.com/mbostock/d3
 * 
 * 
 * Copyright (c) 2013, Michael Bostock
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * The name Michael Bostock may not be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
d3 = function () {
  function n(n) {
    return null != n && !isNaN(n);
  }function t(n) {
    return n.length;
  }function e(n) {
    for (var t = 1; n * t % 1;) {
      t *= 10;
    }return t;
  }function r(n, t) {
    try {
      for (var e in t) {
        Object.defineProperty(n.prototype, e, { value: t[e], enumerable: !1 });
      }
    } catch (r) {
      n.prototype = t;
    }
  }function u() {}function i() {}function a(n, t, e) {
    return function () {
      var r = e.apply(t, arguments);return r === t ? n : r;
    };
  }function o() {}function c(n) {
    function t() {
      for (var t, r = e, u = -1, i = r.length; ++u < i;) {
        (t = r[u].on) && t.apply(this, arguments);
      }return n;
    }var e = [],
        r = new u();return t.on = function (t, u) {
      var i,
          a = r.get(t);return arguments.length < 2 ? a && a.on : (a && (a.on = null, e = e.slice(0, i = e.indexOf(a)).concat(e.slice(i + 1)), r.remove(t)), u && e.push(r.set(t, { on: u })), n);
    }, t;
  }function l() {
    oa.event.stopPropagation(), oa.event.preventDefault();
  }function f() {
    for (var n, t = oa.event; n = t.sourceEvent;) {
      t = n;
    }return t;
  }function s(n) {
    for (var t = new o(), e = 0, r = arguments.length; ++e < r;) {
      t[arguments[e]] = c(t);
    }return t.of = function (e, r) {
      return function (u) {
        try {
          var i = u.sourceEvent = oa.event;u.target = n, oa.event = u, t[u.type].apply(e, r);
        } finally {
          oa.event = i;
        }
      };
    }, t;
  }function h(n, t) {
    var e = n.ownerSVGElement || n;if (e.createSVGPoint) {
      var r = e.createSVGPoint();if (0 > ma && (la.scrollX || la.scrollY)) {
        e = oa.select(ca.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);var u = e[0][0].getScreenCTM();ma = !(u.f || u.e), e.remove();
      }return ma ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y];
    }var i = n.getBoundingClientRect();return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop];
  }function g(n) {
    for (var t = -1, e = n.length, r = []; ++t < e;) {
      r.push(n[t]);
    }return r;
  }function p(n) {
    return Array.prototype.slice.call(n);
  }function d(n) {
    return Ma(n, Ea), n;
  }function m(n) {
    return function () {
      return xa(n, this);
    };
  }function v(n) {
    return function () {
      return ba(n, this);
    };
  }function y(n, t) {
    function e() {
      this.removeAttribute(n);
    }function r() {
      this.removeAttributeNS(n.space, n.local);
    }function u() {
      this.setAttribute(n, t);
    }function i() {
      this.setAttributeNS(n.space, n.local, t);
    }function a() {
      var e = t.apply(this, arguments);null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
    }function o() {
      var e = t.apply(this, arguments);null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
    }return n = oa.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? o : a : n.local ? i : u;
  }function M(n) {
    return n.trim().replace(/\s+/g, " ");
  }function x(n) {
    return RegExp("(?:^|\\s+)" + oa.requote(n) + "(?:\\s+|$)", "g");
  }function _(n, t) {
    function e() {
      for (var e = -1; ++e < u;) {
        n[e](this, t);
      }
    }function r() {
      for (var e = -1, r = t.apply(this, arguments); ++e < u;) {
        n[e](this, r);
      }
    }n = n.trim().split(/\s+/).map(w);var u = n.length;return "function" == typeof t ? r : e;
  }function w(n) {
    var t = x(n);return function (e, r) {
      if (u = e.classList) return r ? u.add(n) : u.remove(n);var u = e.getAttribute("class") || "";r ? (t.lastIndex = 0, t.test(u) || e.setAttribute("class", M(u + " " + n))) : e.setAttribute("class", M(u.replace(t, " ")));
    };
  }function S(n, t, e) {
    function r() {
      this.style.removeProperty(n);
    }function u() {
      this.style.setProperty(n, t, e);
    }function i() {
      var r = t.apply(this, arguments);null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
    }return null == t ? r : "function" == typeof t ? i : u;
  }function E(n, t) {
    function e() {
      delete this[n];
    }function r() {
      this[n] = t;
    }function u() {
      var e = t.apply(this, arguments);null == e ? delete this[n] : this[n] = e;
    }return null == t ? e : "function" == typeof t ? u : r;
  }function k(n) {
    return { __data__: n };
  }function A(n) {
    return function () {
      return Sa(this, n);
    };
  }function q(n) {
    return arguments.length || (n = oa.ascending), function (t, e) {
      return !t - !e || n(t.__data__, e.__data__);
    };
  }function N() {}function T(n, t, e) {
    function r() {
      var t = this[a];t && (this.removeEventListener(n, t, t.$), delete this[a]);
    }function u() {
      var u = c(t, va(arguments));r.call(this), this.addEventListener(n, this[a] = u, u.$ = e), u._ = t;
    }function i() {
      var t,
          e = RegExp("^__on([^.]+)" + oa.requote(n) + "$");for (var r in this) {
        if (t = r.match(e)) {
          var u = this[r];this.removeEventListener(t[1], u, u.$), delete this[r];
        }
      }
    }var a = "__on" + n,
        o = n.indexOf("."),
        c = C;o > 0 && (n = n.substring(0, o));var l = qa.get(n);return l && (n = l, c = z), o ? t ? u : r : t ? N : i;
  }function C(n, t) {
    return function (e) {
      var r = oa.event;oa.event = e, t[0] = this.__data__;try {
        n.apply(this, t);
      } finally {
        oa.event = r;
      }
    };
  }function z(n, t) {
    var e = C(n, t);return function (n) {
      var t = this,
          r = n.relatedTarget;r && (r === t || r.compareDocumentPosition(t) & 8) || e.call(t, n);
    };
  }function D(n, t) {
    for (var e = 0, r = n.length; r > e; e++) {
      for (var u, i = n[e], a = 0, o = i.length; o > a; a++) {
        (u = i[a]) && t(u, a, e);
      }
    }return n;
  }function j(n) {
    return Ma(n, Na), n;
  }function L() {}function F(n, t, e) {
    return new H(n, t, e);
  }function H(n, t, e) {
    this.h = n, this.s = t, this.l = e;
  }function P(n, t, e) {
    function r(n) {
      return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? i + (a - i) * n / 60 : 180 > n ? a : 240 > n ? i + (a - i) * (240 - n) / 60 : i;
    }function u(n) {
      return Math.round(r(n) * 255);
    }var i, a;return n %= 360, 0 > n && (n += 360), t = 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, a = .5 >= e ? e * (1 + t) : e + t - e * t, i = 2 * e - a, tt(u(n + 120), u(n), u(n - 120));
  }function R(n) {
    return n > 0 ? 1 : 0 > n ? -1 : 0;
  }function O(n) {
    return Math.acos(Math.max(-1, Math.min(1, n)));
  }function Y(n) {
    return n > 1 ? La / 2 : -1 > n ? -La / 2 : Math.asin(n);
  }function U(n) {
    return (Math.exp(n) - Math.exp(-n)) / 2;
  }function I(n) {
    return (Math.exp(n) + Math.exp(-n)) / 2;
  }function V(n) {
    return (n = Math.sin(n / 2)) * n;
  }function X(n, t, e) {
    return new Z(n, t, e);
  }function Z(n, t, e) {
    this.h = n, this.c = t, this.l = e;
  }function B(n, t, e) {
    return $(e, Math.cos(n *= Ha) * t, Math.sin(n) * t);
  }function $(n, t, e) {
    return new J(n, t, e);
  }function J(n, t, e) {
    this.l = n, this.a = t, this.b = e;
  }function G(n, t, e) {
    var r = (n + 16) / 116,
        u = r + t / 500,
        i = r - e / 200;return u = W(u) * Ya, r = W(r) * Ua, i = W(i) * Ia, tt(nt(3.2404542 * u - 1.5371385 * r - .4985314 * i), nt(-.969266 * u + 1.8760108 * r + .041556 * i), nt(.0556434 * u - .2040259 * r + 1.0572252 * i));
  }function K(n, t, e) {
    return X(Math.atan2(e, t) * Pa, Math.sqrt(t * t + e * e), n);
  }function W(n) {
    return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037;
  }function Q(n) {
    return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29;
  }function nt(n) {
    return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055));
  }function tt(n, t, e) {
    return new et(n, t, e);
  }function et(n, t, e) {
    this.r = n, this.g = t, this.b = e;
  }function rt(n) {
    return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16);
  }function ut(n, t, e) {
    var r,
        u,
        i,
        a = 0,
        o = 0,
        c = 0;if (r = /([a-z]+)\((.*)\)/i.exec(n)) switch (u = r[2].split(","), r[1]) {case "hsl":
        return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);case "rgb":
        return t(ct(u[0]), ct(u[1]), ct(u[2]));}return (i = Za.get(n)) ? t(i.r, i.g, i.b) : (null != n && n.charAt(0) === "#" && (n.length === 4 ? (a = n.charAt(1), a += a, o = n.charAt(2), o += o, c = n.charAt(3), c += c) : n.length === 7 && (a = n.substring(1, 3), o = n.substring(3, 5), c = n.substring(5, 7)), a = parseInt(a, 16), o = parseInt(o, 16), c = parseInt(c, 16)), t(a, o, c));
  }function it(n, t, e) {
    var r,
        u,
        i = Math.min(n /= 255, t /= 255, e /= 255),
        a = Math.max(n, t, e),
        o = a - i,
        c = (a + i) / 2;return o ? (u = .5 > c ? o / (a + i) : o / (2 - a - i), r = n == a ? (t - e) / o + (e > t ? 6 : 0) : t == a ? (e - n) / o + 2 : (n - t) / o + 4, r *= 60) : u = r = 0, F(r, u, c);
  }function at(n, t, e) {
    n = ot(n), t = ot(t), e = ot(e);var r = Q((.4124564 * n + .3575761 * t + .1804375 * e) / Ya),
        u = Q((.2126729 * n + .7151522 * t + .072175 * e) / Ua),
        i = Q((.0193339 * n + .119192 * t + .9503041 * e) / Ia);return $(116 * u - 16, 500 * (r - u), 200 * (u - i));
  }function ot(n) {
    return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
  }function ct(n) {
    var t = parseFloat(n);return n.charAt(n.length - 1) === "%" ? Math.round(2.55 * t) : t;
  }function lt(n) {
    return "function" == typeof n ? n : function () {
      return n;
    };
  }function ft(n) {
    return n;
  }function st(n) {
    return n.length === 1 ? function (t, e) {
      n(null == t ? e : null);
    } : n;
  }function ht(n, t) {
    function e(n, e, i) {
      arguments.length < 3 && (i = e, e = null);var a = oa.xhr(n, t, i);return a.row = function (n) {
        return arguments.length ? a.response((e = n) == null ? r : u(n)) : e;
      }, a.row(e);
    }function r(n) {
      return e.parse(n.responseText);
    }function u(n) {
      return function (t) {
        return e.parse(t.responseText, n);
      };
    }function a(t) {
      return t.map(o).join(n);
    }function o(n) {
      return c.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n;
    }var c = RegExp('["' + n + "\n]"),
        l = n.charCodeAt(0);return e.parse = function (n, t) {
      var r;return e.parseRows(n, function (n, e) {
        if (r) return r(n, e - 1);var u = Function("d", "return {" + n.map(function (n, t) {
          return JSON.stringify(n) + ": d[" + t + "]";
        }).join(",") + "}");r = t ? function (n, e) {
          return t(u(n), e);
        } : u;
      });
    }, e.parseRows = function (n, t) {
      function e() {
        if (f >= c) return a;if (u) return u = !1, i;var t = f;if (n.charCodeAt(t) === 34) {
          for (var e = t; e++ < c;) {
            if (n.charCodeAt(e) === 34) {
              if (n.charCodeAt(e + 1) !== 34) break;++e;
            }
          }f = e + 2;var r = n.charCodeAt(e + 1);return 13 === r ? (u = !0, n.charCodeAt(e + 2) === 10 && ++f) : 10 === r && (u = !0), n.substring(t + 1, e).replace(/""/g, '"');
        }for (; c > f;) {
          var r = n.charCodeAt(f++),
              o = 1;if (10 === r) u = !0;else if (13 === r) u = !0, n.charCodeAt(f) === 10 && (++f, ++o);else if (r !== l) continue;return n.substring(t, f - o);
        }return n.substring(t);
      }for (var r, u, i = {}, a = {}, o = [], c = n.length, f = 0, s = 0; (r = e()) !== a;) {
        for (var h = []; r !== i && r !== a;) {
          h.push(r), r = e();
        }(!t || (h = t(h, s++))) && o.push(h);
      }return o;
    }, e.format = function (t) {
      if (Array.isArray(t[0])) return e.formatRows(t);var r = new i(),
          u = [];return t.forEach(function (n) {
        for (var t in n) {
          r.has(t) || u.push(r.add(t));
        }
      }), [u.map(o).join(n)].concat(t.map(function (t) {
        return u.map(function (n) {
          return o(t[n]);
        }).join(n);
      })).join("\n");
    }, e.formatRows = function (n) {
      return n.map(a).join("\n");
    }, e;
  }function gt() {
    for (var n, t = Date.now(), e = Ka; e;) {
      n = t - e.then, n >= e.delay && (e.flush = e.callback(n)), e = e.next;
    }var r = pt() - t;r > 24 ? (isFinite(r) && (clearTimeout($a), $a = setTimeout(gt, r)), Ba = 0) : (Ba = 1, Wa(gt));
  }function pt() {
    for (var n = null, t = Ka, e = 1 / 0; t;) {
      t.flush ? (delete Ga[t.callback.id], t = n ? n.next = t.next : Ka = t.next) : (e = Math.min(e, t.then + t.delay), t = (n = t).next);
    }return e;
  }function dt(n, t) {
    var e = Math.pow(10, Math.abs(8 - t) * 3);return { scale: t > 8 ? function (n) {
        return n / e;
      } : function (n) {
        return n * e;
      }, symbol: n };
  }function mt(n, t) {
    return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1);
  }function vt(n) {
    return n + "";
  }function yt(n, t) {
    co.hasOwnProperty(n.type) && co[n.type](n, t);
  }function Mt(n, t, e) {
    var r,
        u = -1,
        i = n.length - e;for (t.lineStart(); ++u < i;) {
      r = n[u], t.point(r[0], r[1]);
    }t.lineEnd();
  }function xt(n, t) {
    var e = -1,
        r = n.length;for (t.polygonStart(); ++e < r;) {
      Mt(n[e], t, 1);
    }t.polygonEnd();
  }function bt() {
    function n(n, t) {
      n *= Ha, t = t * Ha / 2 + La / 4;var e = n - r,
          a = Math.cos(t),
          o = Math.sin(t),
          c = i * o,
          l = fo,
          f = so,
          s = u * a + c * Math.cos(e),
          h = c * Math.sin(e);fo = l * s - f * h, so = f * s + l * h, r = n, u = a, i = o;
    }var t, e, r, u, i;ho.point = function (a, o) {
      ho.point = n, r = (t = a) * Ha, u = Math.cos(o = (e = o) * Ha / 2 + La / 4), i = Math.sin(o);
    }, ho.lineEnd = function () {
      n(t, e);
    };
  }function _t(n) {
    function t(n, t) {
      r > n && (r = n), n > i && (i = n), u > t && (u = t), t > a && (a = t);
    }function e() {
      o.point = o.lineEnd = N;
    }var r,
        u,
        i,
        a,
        o = { point: t, lineStart: N, lineEnd: N, polygonStart: function polygonStart() {
        o.lineEnd = e;
      }, polygonEnd: function polygonEnd() {
        o.point = t;
      } };return function (t) {
      return a = i = -(r = u = 1 / 0), oa.geo.stream(t, n(o)), [[r, u], [i, a]];
    };
  }function wt(n, t) {
    if (!go) {
      ++po, n *= Ha;var e = Math.cos(t *= Ha);mo += (e * Math.cos(n) - mo) / po, vo += (e * Math.sin(n) - vo) / po, yo += (Math.sin(t) - yo) / po;
    }
  }function St() {
    var n, t;go = 1, Et(), go = 2;var e = Mo.point;Mo.point = function (r, u) {
      e(n = r, t = u);
    }, Mo.lineEnd = function () {
      Mo.point(n, t), kt(), Mo.lineEnd = kt;
    };
  }function Et() {
    function n(n, u) {
      n *= Ha;var i = Math.cos(u *= Ha),
          a = i * Math.cos(n),
          o = i * Math.sin(n),
          c = Math.sin(u),
          l = Math.atan2(Math.sqrt((l = e * c - r * o) * l + (l = r * a - t * c) * l + (l = t * o - e * a) * l), t * a + e * o + r * c);po += l, mo += l * (t + (t = a)), vo += l * (e + (e = o)), yo += l * (r + (r = c));
    }var t, e, r;go > 1 || (1 > go && (go = 1, po = mo = vo = yo = 0), Mo.point = function (u, i) {
      u *= Ha;var a = Math.cos(i *= Ha);t = a * Math.cos(u), e = a * Math.sin(u), r = Math.sin(i), Mo.point = n;
    });
  }function kt() {
    Mo.point = wt;
  }function At(n) {
    var t = n[0],
        e = n[1],
        r = Math.cos(e);return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)];
  }function qt(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
  }function Nt(n, t) {
    return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]];
  }function Tt(n, t) {
    n[0] += t[0], n[1] += t[1], n[2] += t[2];
  }function Ct(n, t) {
    return [n[0] * t, n[1] * t, n[2] * t];
  }function zt(n) {
    var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);n[0] /= t, n[1] /= t, n[2] /= t;
  }function Dt() {
    return !0;
  }function jt(n) {
    return [Math.atan2(n[1], n[0]), Math.asin(Math.max(-1, Math.min(1, n[2])))];
  }function Lt(n, t) {
    return Math.abs(n[0] - t[0]) < Fa && Math.abs(n[1] - t[1]) < Fa;
  }function Ft(n, t, e, r, u) {
    var i = [],
        a = [];if (n.forEach(function (n) {
      if (!((t = n.length - 1) <= 0)) {
        var t,
            e = n[0],
            r = n[t];if (Lt(e, r)) {
          u.lineStart();for (var o = 0; t > o; ++o) {
            u.point((e = n[o])[0], e[1]);
          }return u.lineEnd(), void 0;
        }var c = { point: e, points: n, other: null, visited: !1, entry: !0, subject: !0 },
            l = { point: e, points: [e], other: c, visited: !1, entry: !1, subject: !1 };c.other = l, i.push(c), a.push(l), c = { point: r, points: [r], other: null, visited: !1, entry: !1, subject: !0 }, l = { point: r, points: [r], other: c, visited: !1, entry: !0, subject: !1 }, c.other = l, i.push(c), a.push(l);
      }
    }), a.sort(t), Ht(i), Ht(a), i.length) {
      if (e) for (var o = 1, c = !e(a[0].point), l = a.length; l > o; ++o) {
        a[o].entry = c = !c;
      }for (var f, s, h, g = i[0];;) {
        for (f = g; f.visited;) {
          if ((f = f.next) === g) return;
        }s = f.points, u.lineStart();do {
          if (f.visited = f.other.visited = !0, f.entry) {
            if (f.subject) for (var o = 0; o < s.length; o++) {
              u.point((h = s[o])[0], h[1]);
            } else r(f.point, f.next.point, 1, u);f = f.next;
          } else {
            if (f.subject) {
              s = f.prev.points;for (var o = s.length; --o >= 0;) {
                u.point((h = s[o])[0], h[1]);
              }
            } else r(f.point, f.prev.point, -1, u);f = f.prev;
          }f = f.other, s = f.points;
        } while (!f.visited);u.lineEnd();
      }
    }
  }function Ht(n) {
    if (t = n.length) {
      for (var t, e, r = 0, u = n[0]; ++r < t;) {
        u.next = e = n[r], e.prev = u, u = e;
      }u.next = e = n[0], e.prev = u;
    }
  }function Pt(n, t, e) {
    return function (r) {
      function u(t, e) {
        n(t, e) && r.point(t, e);
      }function i(n, t) {
        m.point(n, t);
      }function a() {
        v.point = i, m.lineStart();
      }function o() {
        v.point = u, m.lineEnd();
      }function c(n, t) {
        M.point(n, t), d.push([n, t]);
      }function l() {
        M.lineStart(), d = [];
      }function f() {
        c(d[0][0], d[0][1]), M.lineEnd();var n,
            t = M.clean(),
            e = y.buffer(),
            u = e.length;if (!u) return p = !0, g += Yt(d, -1), d = null, void 0;if (d = null, 1 & t) {
          n = e[0], h += Yt(n, 1);var i,
              u = n.length - 1,
              a = -1;for (r.lineStart(); ++a < u;) {
            r.point((i = n[a])[0], i[1]);
          }return r.lineEnd(), void 0;
        }u > 1 && 2 & t && e.push(e.pop().concat(e.shift())), s.push(e.filter(Rt));
      }var s,
          h,
          g,
          p,
          d,
          m = t(r),
          v = { point: u, lineStart: a, lineEnd: o, polygonStart: function polygonStart() {
          v.point = c, v.lineStart = l, v.lineEnd = f, p = !1, g = h = 0, s = [], r.polygonStart();
        }, polygonEnd: function polygonEnd() {
          v.point = u, v.lineStart = a, v.lineEnd = o, s = oa.merge(s), s.length ? Ft(s, Ut, null, e, r) : (-Fa > h || p && -Fa > g) && (r.lineStart(), e(null, null, 1, r), r.lineEnd()), r.polygonEnd(), s = null;
        }, sphere: function sphere() {
          r.polygonStart(), r.lineStart(), e(null, null, 1, r), r.lineEnd(), r.polygonEnd();
        } },
          y = Ot(),
          M = t(y);return v;
    };
  }function Rt(n) {
    return n.length > 1;
  }function Ot() {
    var n,
        t = [];return { lineStart: function lineStart() {
        t.push(n = []);
      }, point: function point(t, e) {
        n.push([t, e]);
      }, lineEnd: N, buffer: function buffer() {
        var e = t;return t = [], n = null, e;
      }, rejoin: function rejoin() {
        t.length > 1 && t.push(t.pop().concat(t.shift()));
      } };
  }function Yt(n, t) {
    if (!(e = n.length)) return 0;for (var e, r, u, i = 0, a = 0, o = n[0], c = o[0], l = o[1], f = Math.cos(l), s = Math.atan2(t * Math.sin(c) * f, Math.sin(l)), h = 1 - t * Math.cos(c) * f, g = s; ++i < e;) {
      o = n[i], f = Math.cos(l = o[1]), r = Math.atan2(t * Math.sin(c = o[0]) * f, Math.sin(l)), u = 1 - t * Math.cos(c) * f, Math.abs(h - 2) < Fa && Math.abs(u - 2) < Fa || (Math.abs(u) < Fa || Math.abs(h) < Fa || (Math.abs(Math.abs(r - s) - La) < Fa ? u + h > 2 && (a += 4 * (r - s)) : a += Math.abs(h - 2) < Fa ? 4 * (r - g) : ((3 * La + r - s) % (2 * La) - La) * (h + u)), g = s, s = r, h = u);
    }return a;
  }function Ut(n, t) {
    return ((n = n.point)[0] < 0 ? n[1] - La / 2 - Fa : La / 2 - n[1]) - ((t = t.point)[0] < 0 ? t[1] - La / 2 - Fa : La / 2 - t[1]);
  }function It(n) {
    var t,
        e = 0 / 0,
        r = 0 / 0,
        u = 0 / 0;return { lineStart: function lineStart() {
        n.lineStart(), t = 1;
      }, point: function point(i, a) {
        var o = i > 0 ? La : -La,
            c = Math.abs(i - e);Math.abs(c - La) < Fa ? (n.point(e, r = (r + a) / 2 > 0 ? La / 2 : -La / 2), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(o, r), n.point(i, r), t = 0) : u !== o && c >= La && (Math.abs(e - u) < Fa && (e -= u * Fa), Math.abs(i - o) < Fa && (i -= o * Fa), r = Vt(e, r, i, a), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(o, r), t = 0), n.point(e = i, r = a), u = o;
      }, lineEnd: function lineEnd() {
        n.lineEnd(), e = r = 0 / 0;
      }, clean: function clean() {
        return 2 - t;
      } };
  }function Vt(n, t, e, r) {
    var u,
        i,
        a = Math.sin(n - e);return Math.abs(a) > Fa ? Math.atan((Math.sin(t) * (i = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (u = Math.cos(t)) * Math.sin(n)) / (u * i * a)) : (t + r) / 2;
  }function Xt(n, t, e, r) {
    var u;if (null == n) u = e * La / 2, r.point(-La, u), r.point(0, u), r.point(La, u), r.point(La, 0), r.point(La, -u), r.point(0, -u), r.point(-La, -u), r.point(-La, 0), r.point(-La, u);else if (Math.abs(n[0] - t[0]) > Fa) {
      var i = (n[0] < t[0] ? 1 : -1) * La;u = e * i / 2, r.point(-i, u), r.point(0, u), r.point(i, u);
    } else r.point(t[0], t[1]);
  }function Zt(n) {
    function t(n, t) {
      return Math.cos(n) * Math.cos(t) > i;
    }function e(n) {
      var e, i, c, l, f;return { lineStart: function lineStart() {
          l = c = !1, f = 1;
        }, point: function point(s, h) {
          var g,
              p = [s, h],
              d = t(s, h),
              m = a ? d ? 0 : u(s, h) : d ? u(s + (0 > s ? La : -La), h) : 0;if (!e && (l = c = d) && n.lineStart(), d !== c && (g = r(e, p), (Lt(e, g) || Lt(p, g)) && (p[0] += Fa, p[1] += Fa, d = t(p[0], p[1]))), d !== c) f = 0, d ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g;else if (o && e && a ^ d) {
            var v;m & i || !(v = r(p, e, !0)) || (f = 0, a ? (n.lineStart(), n.point(v[0][0], v[0][1]), n.point(v[1][0], v[1][1]), n.lineEnd()) : (n.point(v[1][0], v[1][1]), n.lineEnd(), n.lineStart(), n.point(v[0][0], v[0][1])));
          }!d || e && Lt(e, p) || n.point(p[0], p[1]), e = p, c = d, i = m;
        }, lineEnd: function lineEnd() {
          c && n.lineEnd(), e = null;
        }, clean: function clean() {
          return f | (l && c) << 1;
        } };
    }function r(n, t, e) {
      var r = At(n),
          u = At(t),
          a = [1, 0, 0],
          o = Nt(r, u),
          c = qt(o, o),
          l = o[0],
          f = c - l * l;if (!f) return !e && n;var s = i * c / f,
          h = -i * l / f,
          g = Nt(a, o),
          p = Ct(a, s),
          d = Ct(o, h);Tt(p, d);var m = g,
          v = qt(p, m),
          y = qt(m, m),
          M = v * v - y * (qt(p, p) - 1);if (!(0 > M)) {
        var x = Math.sqrt(M),
            b = Ct(m, (-v - x) / y);if (Tt(b, p), b = jt(b), !e) return b;var _,
            w = n[0],
            S = t[0],
            E = n[1],
            k = t[1];w > S && (_ = w, w = S, S = _);var A = S - w,
            q = Math.abs(A - La) < Fa,
            N = q || Fa > A;if (!q && E > k && (_ = E, E = k, k = _), N ? q ? E + k > 0 ^ b[1] < (Math.abs(b[0] - w) < Fa ? E : k) : E <= b[1] && b[1] <= k : A > La ^ (w <= b[0] && b[0] <= S)) {
          var T = Ct(m, (-v + x) / y);return Tt(T, p), [b, jt(T)];
        }
      }
    }function u(t, e) {
      var r = a ? n : La - n,
          u = 0;return -r > t ? u |= 1 : t > r && (u |= 2), -r > e ? u |= 4 : e > r && (u |= 8), u;
    }var i = Math.cos(n),
        a = i > 0,
        o = Math.abs(i) > Fa,
        c = ie(n, 6 * Ha);return Pt(t, e, c);
  }function Bt(n, t, e, r) {
    function u(r, u) {
      return Math.abs(r[0] - n) < Fa ? u > 0 ? 0 : 3 : Math.abs(r[0] - e) < Fa ? u > 0 ? 2 : 1 : Math.abs(r[1] - t) < Fa ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2;
    }function i(n, t) {
      return a(n.point, t.point);
    }function a(n, t) {
      var e = u(n, 1),
          r = u(t, 1);return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0];
    }function o(u, i) {
      var a = i[0] - u[0],
          o = i[1] - u[1],
          c = [0, 1];return Math.abs(a) < Fa && Math.abs(o) < Fa ? n <= u[0] && u[0] <= e && t <= u[1] && u[1] <= r : $t(n - u[0], a, c) && $t(u[0] - e, -a, c) && $t(t - u[1], o, c) && $t(u[1] - r, -o, c) ? (c[1] < 1 && (i[0] = u[0] + c[1] * a, i[1] = u[1] + c[1] * o), c[0] > 0 && (u[0] += c[0] * a, u[1] += c[0] * o), !0) : !1;
    }return function (c) {
      function l(i) {
        var a = u(i, -1),
            o = f([0 === a || 3 === a ? n : e, a > 1 ? r : t]);return o;
      }function f(n) {
        for (var t = 0, e = M.length, r = n[1], u = 0; e > u; ++u) {
          for (var i = 1, a = M[u], o = a.length, c = a[0]; o > i; ++i) {
            b = a[i], c[1] <= r ? b[1] > r && s(c, b, n) > 0 && ++t : b[1] <= r && s(c, b, n) < 0 && --t, c = b;
          }
        }return 0 !== t;
      }function s(n, t, e) {
        return (t[0] - n[0]) * (e[1] - n[1]) - (e[0] - n[0]) * (t[1] - n[1]);
      }function h(i, o, c, l) {
        var f = 0,
            s = 0;if (null == i || (f = u(i, c)) !== (s = u(o, c)) || a(i, o) < 0 ^ c > 0) {
          do {
            l.point(0 === f || 3 === f ? n : e, f > 1 ? r : t);
          } while ((f = (f + c + 4) % 4) !== s);
        } else l.point(o[0], o[1]);
      }function g(u, i) {
        return u >= n && e >= u && i >= t && r >= i;
      }function p(n, t) {
        g(n, t) && c.point(n, t);
      }function d() {
        C.point = v, M && M.push(x = []), q = !0, A = !1, E = k = 0 / 0;
      }function m() {
        y && (v(_, w), S && A && T.rejoin(), y.push(T.buffer())), C.point = p, A && c.lineEnd();
      }function v(n, t) {
        n = Math.max(-bo, Math.min(bo, n)), t = Math.max(-bo, Math.min(bo, t));var e = g(n, t);if (M && x.push([n, t]), q) _ = n, w = t, S = e, q = !1, e && (c.lineStart(), c.point(n, t));else if (e && A) c.point(n, t);else {
          var r = [E, k],
              u = [n, t];o(r, u) ? (A || (c.lineStart(), c.point(r[0], r[1])), c.point(u[0], u[1]), e || c.lineEnd()) : (c.lineStart(), c.point(n, t));
        }E = n, k = t, A = e;
      }var y,
          M,
          x,
          _,
          w,
          S,
          E,
          k,
          A,
          q,
          N = c,
          T = Ot(),
          C = { point: p, lineStart: d, lineEnd: m, polygonStart: function polygonStart() {
          c = T, y = [], M = [];
        }, polygonEnd: function polygonEnd() {
          c = N, (y = oa.merge(y)).length ? (c.polygonStart(), Ft(y, i, l, h, c), c.polygonEnd()) : f([n, t]) && (c.polygonStart(), c.lineStart(), h(null, null, 1, c), c.lineEnd(), c.polygonEnd()), y = M = x = null;
        } };return C;
    };
  }function $t(n, t, e) {
    if (Math.abs(t) < Fa) return 0 >= n;var r = n / t;if (t > 0) {
      if (r > e[1]) return !1;r > e[0] && (e[0] = r);
    } else {
      if (r < e[0]) return !1;r < e[1] && (e[1] = r);
    }return !0;
  }function Jt(n, t) {
    function e(e, r) {
      return e = n(e, r), t(e[0], e[1]);
    }return n.invert && t.invert && (e.invert = function (e, r) {
      return e = t.invert(e, r), e && n.invert(e[0], e[1]);
    }), e;
  }function Gt(n) {
    function t(t) {
      function r(e, r) {
        e = n(e, r), t.point(e[0], e[1]);
      }function i() {
        f = 0 / 0, d.point = a, t.lineStart();
      }function a(r, i) {
        var a = At([r, i]),
            o = n(r, i);e(f, s, l, h, g, p, f = o[0], s = o[1], l = r, h = a[0], g = a[1], p = a[2], u, t), t.point(f, s);
      }function o() {
        d.point = r, t.lineEnd();
      }function c() {
        var n, r, c, m, v, y, M;i(), d.point = function (t, e) {
          a(n = t, r = e), c = f, m = s, v = h, y = g, M = p, d.point = a;
        }, d.lineEnd = function () {
          e(f, s, l, h, g, p, c, m, n, v, y, M, u, t), d.lineEnd = o, o();
        };
      }var l,
          f,
          s,
          h,
          g,
          p,
          d = { point: r, lineStart: i, lineEnd: o, polygonStart: function polygonStart() {
          t.polygonStart(), d.lineStart = c;
        }, polygonEnd: function polygonEnd() {
          t.polygonEnd(), d.lineStart = i;
        } };return d;
    }function e(t, u, i, a, o, c, l, f, s, h, g, p, d, m) {
      var v = l - t,
          y = f - u,
          M = v * v + y * y;if (M > 4 * r && d--) {
        var x = a + h,
            b = o + g,
            _ = c + p,
            w = Math.sqrt(x * x + b * b + _ * _),
            S = Math.asin(_ /= w),
            E = Math.abs(Math.abs(_) - 1) < Fa ? (i + s) / 2 : Math.atan2(b, x),
            k = n(E, S),
            A = k[0],
            q = k[1],
            N = A - t,
            T = q - u,
            C = y * N - v * T;(C * C / M > r || Math.abs((v * N + y * T) / M - .5) > .3) && (e(t, u, i, a, o, c, A, q, E, x /= w, b /= w, _, d, m), m.point(A, q), e(A, q, E, x, b, _, l, f, s, h, g, p, d, m));
      }
    }var r = .5,
        u = 16;return t.precision = function (n) {
      return arguments.length ? (u = (r = n * n) > 0 && 16, t) : Math.sqrt(r);
    }, t;
  }function Kt(n) {
    return Wt(function () {
      return n;
    })();
  }function Wt(n) {
    function t(n) {
      return n = a(n[0] * Ha, n[1] * Ha), [n[0] * f + o, c - n[1] * f];
    }function e(n) {
      return n = a.invert((n[0] - o) / f, (c - n[1]) / f), n && [n[0] * Pa, n[1] * Pa];
    }function r() {
      a = Jt(i = te(d, m, v), u);var n = u(g, p);return o = s - n[0] * f, c = h + n[1] * f, t;
    }var u,
        i,
        a,
        o,
        c,
        l = Gt(function (n, t) {
      return n = u(n, t), [n[0] * f + o, c - n[1] * f];
    }),
        f = 150,
        s = 480,
        h = 250,
        g = 0,
        p = 0,
        d = 0,
        m = 0,
        v = 0,
        y = xo,
        M = ft,
        x = null,
        b = null;return t.stream = function (n) {
      return Qt(i, y(l(M(n))));
    }, t.clipAngle = function (n) {
      return arguments.length ? (y = null == n ? (x = n, xo) : Zt((x = +n) * Ha), t) : x;
    }, t.clipExtent = function (n) {
      return arguments.length ? (b = n, M = null == n ? ft : Bt(n[0][0], n[0][1], n[1][0], n[1][1]), t) : b;
    }, t.scale = function (n) {
      return arguments.length ? (f = +n, r()) : f;
    }, t.translate = function (n) {
      return arguments.length ? (s = +n[0], h = +n[1], r()) : [s, h];
    }, t.center = function (n) {
      return arguments.length ? (g = n[0] % 360 * Ha, p = n[1] % 360 * Ha, r()) : [g * Pa, p * Pa];
    }, t.rotate = function (n) {
      return arguments.length ? (d = n[0] % 360 * Ha, m = n[1] % 360 * Ha, v = n.length > 2 ? n[2] % 360 * Ha : 0, r()) : [d * Pa, m * Pa, v * Pa];
    }, oa.rebind(t, l, "precision"), function () {
      return u = n.apply(this, arguments), t.invert = u.invert && e, r();
    };
  }function Qt(n, t) {
    return { point: function point(e, r) {
        r = n(e * Ha, r * Ha), e = r[0], t.point(e > La ? e - 2 * La : -La > e ? e + 2 * La : e, r[1]);
      }, sphere: function sphere() {
        t.sphere();
      }, lineStart: function lineStart() {
        t.lineStart();
      }, lineEnd: function lineEnd() {
        t.lineEnd();
      }, polygonStart: function polygonStart() {
        t.polygonStart();
      }, polygonEnd: function polygonEnd() {
        t.polygonEnd();
      } };
  }function ne(n, t) {
    return [n, t];
  }function te(n, t, e) {
    return n ? t || e ? Jt(re(n), ue(t, e)) : re(n) : t || e ? ue(t, e) : ne;
  }function ee(n) {
    return function (t, e) {
      return t += n, [t > La ? t - 2 * La : -La > t ? t + 2 * La : t, e];
    };
  }function re(n) {
    var t = ee(n);return t.invert = ee(-n), t;
  }function ue(n, t) {
    function e(n, t) {
      var e = Math.cos(t),
          o = Math.cos(n) * e,
          c = Math.sin(n) * e,
          l = Math.sin(t),
          f = l * r + o * u;return [Math.atan2(c * i - f * a, o * r - l * u), Math.asin(Math.max(-1, Math.min(1, f * i + c * a)))];
    }var r = Math.cos(n),
        u = Math.sin(n),
        i = Math.cos(t),
        a = Math.sin(t);return e.invert = function (n, t) {
      var e = Math.cos(t),
          o = Math.cos(n) * e,
          c = Math.sin(n) * e,
          l = Math.sin(t),
          f = l * i - c * a;return [Math.atan2(c * i + l * a, o * r + f * u), Math.asin(Math.max(-1, Math.min(1, f * r - o * u)))];
    }, e;
  }function ie(n, t) {
    var e = Math.cos(n),
        r = Math.sin(n);return function (u, i, a, o) {
      null != u ? (u = ae(e, u), i = ae(e, i), (a > 0 ? i > u : u > i) && (u += 2 * a * La)) : (u = n + 2 * a * La, i = n);for (var c, l = a * t, f = u; a > 0 ? f > i : i > f; f -= l) {
        o.point((c = jt([e, -r * Math.cos(f), -r * Math.sin(f)]))[0], c[1]);
      }
    };
  }function ae(n, t) {
    var e = At(t);e[0] -= n, zt(e);var r = O(-e[1]);return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Fa) % (2 * Math.PI);
  }function oe(n, t, e) {
    var r = oa.range(n, t - Fa, e).concat(t);return function (n) {
      return r.map(function (t) {
        return [n, t];
      });
    };
  }function ce(n, t, e) {
    var r = oa.range(n, t - Fa, e).concat(t);return function (n) {
      return r.map(function (t) {
        return [t, n];
      });
    };
  }function le(n) {
    return n.source;
  }function fe(n) {
    return n.target;
  }function se(n, t, e, r) {
    var u = Math.cos(t),
        i = Math.sin(t),
        a = Math.cos(r),
        o = Math.sin(r),
        c = u * Math.cos(n),
        l = u * Math.sin(n),
        f = a * Math.cos(e),
        s = a * Math.sin(e),
        h = 2 * Math.asin(Math.sqrt(V(r - t) + u * a * V(e - n))),
        g = 1 / Math.sin(h),
        p = h ? function (n) {
      var t = Math.sin(n *= h) * g,
          e = Math.sin(h - n) * g,
          r = e * c + t * f,
          u = e * l + t * s,
          a = e * i + t * o;return [Math.atan2(u, r) * Pa, Math.atan2(a, Math.sqrt(r * r + u * u)) * Pa];
    } : function () {
      return [n * Pa, t * Pa];
    };return p.distance = h, p;
  }function he() {
    function n(n, u) {
      var i = Math.sin(u *= Ha),
          a = Math.cos(u),
          o = Math.abs((n *= Ha) - t),
          c = Math.cos(o);_o += Math.atan2(Math.sqrt((o = a * Math.sin(o)) * o + (o = r * i - e * a * c) * o), e * i + r * a * c), t = n, e = i, r = a;
    }var t, e, r;wo.point = function (u, i) {
      t = u * Ha, e = Math.sin(i *= Ha), r = Math.cos(i), wo.point = n;
    }, wo.lineEnd = function () {
      wo.point = wo.lineEnd = N;
    };
  }function ge(n) {
    var t = 0,
        e = La / 3,
        r = Wt(n),
        u = r(t, e);return u.parallels = function (n) {
      return arguments.length ? r(t = n[0] * La / 180, e = n[1] * La / 180) : [180 * (t / La), 180 * (e / La)];
    }, u;
  }function pe(n, t) {
    function e(n, t) {
      var e = Math.sqrt(i - 2 * u * Math.sin(t)) / u;return [e * Math.sin(n *= u), a - e * Math.cos(n)];
    }var r = Math.sin(n),
        u = (r + Math.sin(t)) / 2,
        i = 1 + r * (2 * u - r),
        a = Math.sqrt(i) / u;return e.invert = function (n, t) {
      var e = a - t;return [Math.atan2(n, e) / u, Math.asin((i - (n * n + e * e) * u * u) / (2 * u))];
    }, e;
  }function de(n, t) {
    var e = n(t[0]),
        r = n([.5 * (t[0][0] + t[1][0]), t[0][1]]),
        u = n([t[1][0], t[0][1]]),
        i = n(t[1]),
        a = r[1] - e[1],
        o = r[0] - e[0],
        c = u[1] - r[1],
        l = u[0] - r[0],
        f = a / o,
        s = c / l,
        h = .5 * (f * s * (e[1] - u[1]) + s * (e[0] + r[0]) - f * (r[0] + u[0])) / (s - f),
        g = (.5 * (e[0] + r[0]) - h) / f + .5 * (e[1] + r[1]),
        p = i[0] - h,
        d = i[1] - g,
        m = e[0] - h,
        v = e[1] - g,
        y = p * p + d * d,
        M = m * m + v * v,
        x = Math.atan2(d, p),
        b = Math.atan2(v, m);return function (t) {
      var e = t[0] - h,
          r = t[1] - g,
          u = e * e + r * r,
          i = Math.atan2(r, e);return u > y && M > u && i > x && b > i ? n.invert(t) : void 0;
    };
  }function me() {
    function n(n, t) {
      Eo += u * n - r * t, r = n, u = t;
    }var t, e, r, u;ko.point = function (i, a) {
      ko.point = n, t = r = i, e = u = a;
    }, ko.lineEnd = function () {
      n(t, e);
    };
  }function ve() {
    function n(n, t) {
      a.push("M", n, ",", t, i);
    }function t(n, t) {
      a.push("M", n, ",", t), o.point = e;
    }function e(n, t) {
      a.push("L", n, ",", t);
    }function r() {
      o.point = n;
    }function u() {
      a.push("Z");
    }var i = we(4.5),
        a = [],
        o = { point: n, lineStart: function lineStart() {
        o.point = t;
      }, lineEnd: r, polygonStart: function polygonStart() {
        o.lineEnd = u;
      }, polygonEnd: function polygonEnd() {
        o.lineEnd = r, o.point = n;
      }, pointRadius: function pointRadius(n) {
        return i = we(n), o;
      }, result: function result() {
        if (a.length) {
          var n = a.join("");return a = [], n;
        }
      } };return o;
  }function ye(n, t) {
    go || (mo += n, vo += t, ++yo);
  }function Me() {
    function n(n, r) {
      var u = n - t,
          i = r - e,
          a = Math.sqrt(u * u + i * i);mo += a * (t + n) / 2, vo += a * (e + r) / 2, yo += a, t = n, e = r;
    }var t, e;if (1 !== go) {
      if (!(1 > go)) return;go = 1, mo = vo = yo = 0;
    }Ao.point = function (r, u) {
      Ao.point = n, t = r, e = u;
    };
  }function xe() {
    Ao.point = ye;
  }function be() {
    function n(n, t) {
      var e = u * n - r * t;mo += e * (r + n), vo += e * (u + t), yo += 3 * e, r = n, u = t;
    }var t, e, r, u;2 > go && (go = 2, mo = vo = yo = 0), Ao.point = function (i, a) {
      Ao.point = n, t = r = i, e = u = a;
    }, Ao.lineEnd = function () {
      n(t, e);
    };
  }function _e(n) {
    function t(t, e) {
      n.moveTo(t, e), n.arc(t, e, a, 0, 2 * La);
    }function e(t, e) {
      n.moveTo(t, e), o.point = r;
    }function r(t, e) {
      n.lineTo(t, e);
    }function u() {
      o.point = t;
    }function i() {
      n.closePath();
    }var a = 4.5,
        o = { point: t, lineStart: function lineStart() {
        o.point = e;
      }, lineEnd: u, polygonStart: function polygonStart() {
        o.lineEnd = i;
      }, polygonEnd: function polygonEnd() {
        o.lineEnd = u, o.point = t;
      }, pointRadius: function pointRadius(n) {
        return a = n, o;
      }, result: N };return o;
  }function we(n) {
    return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z";
  }function Se(n) {
    var t = Gt(function (t, e) {
      return n([t * Pa, e * Pa]);
    });return function (n) {
      return n = t(n), { point: function point(t, e) {
          n.point(t * Ha, e * Ha);
        }, sphere: function sphere() {
          n.sphere();
        }, lineStart: function lineStart() {
          n.lineStart();
        }, lineEnd: function lineEnd() {
          n.lineEnd();
        }, polygonStart: function polygonStart() {
          n.polygonStart();
        }, polygonEnd: function polygonEnd() {
          n.polygonEnd();
        } };
    };
  }function Ee(n, t) {
    function e(t, e) {
      var r = Math.cos(t),
          u = Math.cos(e),
          i = n(r * u);return [i * u * Math.sin(t), i * Math.sin(e)];
    }return e.invert = function (n, e) {
      var r = Math.sqrt(n * n + e * e),
          u = t(r),
          i = Math.sin(u),
          a = Math.cos(u);return [Math.atan2(n * i, r * a), Math.asin(r && e * i / r)];
    }, e;
  }function ke(n, t) {
    function e(n, t) {
      var e = Math.abs(Math.abs(t) - La / 2) < Fa ? 0 : a / Math.pow(u(t), i);return [e * Math.sin(i * n), a - e * Math.cos(i * n)];
    }var r = Math.cos(n),
        u = function u(n) {
      return Math.tan(La / 4 + n / 2);
    },
        i = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(u(t) / u(n)),
        a = r * Math.pow(u(n), i) / i;return i ? (e.invert = function (n, t) {
      var e = a - t,
          r = R(i) * Math.sqrt(n * n + e * e);return [Math.atan2(n, e) / i, 2 * Math.atan(Math.pow(a / r, 1 / i)) - La / 2];
    }, e) : qe;
  }function Ae(n, t) {
    function e(n, t) {
      var e = i - t;return [e * Math.sin(u * n), i - e * Math.cos(u * n)];
    }var r = Math.cos(n),
        u = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
        i = r / u + n;return Math.abs(u) < Fa ? ne : (e.invert = function (n, t) {
      var e = i - t;return [Math.atan2(n, e) / u, i - R(u) * Math.sqrt(n * n + e * e)];
    }, e);
  }function qe(n, t) {
    return [n, Math.log(Math.tan(La / 4 + t / 2))];
  }function Ne(n) {
    var t,
        e = Kt(n),
        r = e.scale,
        u = e.translate,
        i = e.clipExtent;return e.scale = function () {
      var n = r.apply(e, arguments);return n === e ? t ? e.clipExtent(null) : e : n;
    }, e.translate = function () {
      var n = u.apply(e, arguments);return n === e ? t ? e.clipExtent(null) : e : n;
    }, e.clipExtent = function (n) {
      var a = i.apply(e, arguments);if (a === e) {
        if (t = null == n) {
          var o = La * r(),
              c = u();i([[c[0] - o, c[1] - o], [c[0] + o, c[1] + o]]);
        }
      } else t && (a = null);return a;
    }, e.clipExtent(null);
  }function Te(n, t) {
    var e = Math.cos(t) * Math.sin(n);return [Math.log((1 + e) / (1 - e)) / 2, Math.atan2(Math.tan(t), Math.cos(n))];
  }function Ce(n) {
    function t(t) {
      function a() {
        l.push("M", i(n(f), o));
      }for (var c, l = [], f = [], s = -1, h = t.length, g = lt(e), p = lt(r); ++s < h;) {
        u.call(this, c = t[s], s) ? f.push([+g.call(this, c, s), +p.call(this, c, s)]) : f.length && (a(), f = []);
      }return f.length && a(), l.length ? l.join("") : null;
    }var e = ze,
        r = De,
        u = Dt,
        i = je,
        a = i.key,
        o = .7;return t.x = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.y = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t.defined = function (n) {
      return arguments.length ? (u = n, t) : u;
    }, t.interpolate = function (n) {
      return arguments.length ? (a = "function" == typeof n ? i = n : (i = Do.get(n) || je).key, t) : a;
    }, t.tension = function (n) {
      return arguments.length ? (o = n, t) : o;
    }, t;
  }function ze(n) {
    return n[0];
  }function De(n) {
    return n[1];
  }function je(n) {
    return n.join("L");
  }function Le(n) {
    return je(n) + "Z";
  }function Fe(n) {
    for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) {
      u.push("V", (r = n[t])[1], "H", r[0]);
    }return u.join("");
  }function He(n) {
    for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) {
      u.push("H", (r = n[t])[0], "V", r[1]);
    }return u.join("");
  }function Pe(n, t) {
    return n.length < 4 ? je(n) : n[1] + Ye(n.slice(1, n.length - 1), Ue(n, t));
  }function Re(n, t) {
    return n.length < 3 ? je(n) : n[0] + Ye((n.push(n[0]), n), Ue([n[n.length - 2]].concat(n, [n[1]]), t));
  }function Oe(n, t) {
    return n.length < 3 ? je(n) : n[0] + Ye(n, Ue(n, t));
  }function Ye(n, t) {
    if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return je(n);var e = n.length != t.length,
        r = "",
        u = n[0],
        i = n[1],
        a = t[0],
        o = a,
        c = 1;if (e && (r += "Q" + (i[0] - a[0] * 2 / 3) + "," + (i[1] - a[1] * 2 / 3) + "," + i[0] + "," + i[1], u = n[1], c = 2), t.length > 1) {
      o = t[1], i = n[c], c++, r += "C" + (u[0] + a[0]) + "," + (u[1] + a[1]) + "," + (i[0] - o[0]) + "," + (i[1] - o[1]) + "," + i[0] + "," + i[1];for (var l = 2; l < t.length; l++, c++) {
        i = n[c], o = t[l], r += "S" + (i[0] - o[0]) + "," + (i[1] - o[1]) + "," + i[0] + "," + i[1];
      }
    }if (e) {
      var f = n[c];r += "Q" + (i[0] + o[0] * 2 / 3) + "," + (i[1] + o[1] * 2 / 3) + "," + f[0] + "," + f[1];
    }return r;
  }function Ue(n, t) {
    for (var e, r = [], u = (1 - t) / 2, i = n[0], a = n[1], o = 1, c = n.length; ++o < c;) {
      e = i, i = a, a = n[o], r.push([u * (a[0] - e[0]), u * (a[1] - e[1])]);
    }return r;
  }function Ie(n) {
    if (n.length < 3) return je(n);var t = 1,
        e = n.length,
        r = n[0],
        u = r[0],
        i = r[1],
        a = [u, u, u, (r = n[1])[0]],
        o = [i, i, i, r[1]],
        c = [u, ",", i];for ($e(c, a, o); ++t < e;) {
      r = n[t], a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), $e(c, a, o);
    }for (t = -1; ++t < 2;) {
      a.shift(), a.push(r[0]), o.shift(), o.push(r[1]), $e(c, a, o);
    }return c.join("");
  }function Ve(n) {
    if (n.length < 4) return je(n);for (var t, e = [], r = -1, u = n.length, i = [0], a = [0]; ++r < 3;) {
      t = n[r], i.push(t[0]), a.push(t[1]);
    }for (e.push(Be(Fo, i) + "," + Be(Fo, a)), --r; ++r < u;) {
      t = n[r], i.shift(), i.push(t[0]), a.shift(), a.push(t[1]), $e(e, i, a);
    }return e.join("");
  }function Xe(n) {
    for (var t, e, r = -1, u = n.length, i = u + 4, a = [], o = []; ++r < 4;) {
      e = n[r % u], a.push(e[0]), o.push(e[1]);
    }for (t = [Be(Fo, a), ",", Be(Fo, o)], --r; ++r < i;) {
      e = n[r % u], a.shift(), a.push(e[0]), o.shift(), o.push(e[1]), $e(t, a, o);
    }return t.join("");
  }function Ze(n, t) {
    var e = n.length - 1;if (e) for (var r, u, i = n[0][0], a = n[0][1], o = n[e][0] - i, c = n[e][1] - a, l = -1; ++l <= e;) {
      r = n[l], u = l / e, r[0] = t * r[0] + (1 - t) * (i + u * o), r[1] = t * r[1] + (1 - t) * (a + u * c);
    }return Ie(n);
  }function Be(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3];
  }function $e(n, t, e) {
    n.push("C", Be(jo, t), ",", Be(jo, e), ",", Be(Lo, t), ",", Be(Lo, e), ",", Be(Fo, t), ",", Be(Fo, e));
  }function Je(n, t) {
    return (t[1] - n[1]) / (t[0] - n[0]);
  }function Ge(n) {
    for (var t = 0, e = n.length - 1, r = [], u = n[0], i = n[1], a = r[0] = Je(u, i); ++t < e;) {
      r[t] = (a + (a = Je(u = i, i = n[t + 1]))) / 2;
    }return r[t] = a, r;
  }function Ke(n) {
    for (var t, e, r, u, i = [], a = Ge(n), o = -1, c = n.length - 1; ++o < c;) {
      t = Je(n[o], n[o + 1]), Math.abs(t) < 1e-6 ? a[o] = a[o + 1] = 0 : (e = a[o] / t, r = a[o + 1] / t, u = e * e + r * r, u > 9 && (u = 3 * t / Math.sqrt(u), a[o] = u * e, a[o + 1] = u * r));
    }for (o = -1; ++o <= c;) {
      u = (n[Math.min(c, o + 1)][0] - n[Math.max(0, o - 1)][0]) / (6 * (1 + a[o] * a[o])), i.push([u || 0, a[o] * u || 0]);
    }return i;
  }function We(n) {
    return n.length < 3 ? je(n) : n[0] + Ye(n, Ke(n));
  }function Qe(n, t, e, r) {
    var u, i, a, o, c, l, f;return u = r[n], i = u[0], a = u[1], u = r[t], o = u[0], c = u[1], u = r[e], l = u[0], f = u[1], (f - a) * (o - i) - (c - a) * (l - i) > 0;
  }function nr(n, t, e) {
    return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]);
  }function tr(n, t, e, r) {
    var u = n[0],
        i = e[0],
        a = t[0] - u,
        o = r[0] - i,
        c = n[1],
        l = e[1],
        f = t[1] - c,
        s = r[1] - l,
        h = (o * (c - l) - s * (u - i)) / (s * a - o * f);
    return [u + h * a, c + h * f];
  }function er(n, t) {
    var e = { list: n.map(function (n, t) {
        return { index: t, x: n[0], y: n[1] };
      }).sort(function (n, t) {
        return n.y < t.y ? -1 : n.y > t.y ? 1 : n.x < t.x ? -1 : n.x > t.x ? 1 : 0;
      }), bottomSite: null },
        r = { list: [], leftEnd: null, rightEnd: null, init: function init() {
        r.leftEnd = r.createHalfEdge(null, "l"), r.rightEnd = r.createHalfEdge(null, "l"), r.leftEnd.r = r.rightEnd, r.rightEnd.l = r.leftEnd, r.list.unshift(r.leftEnd, r.rightEnd);
      }, createHalfEdge: function createHalfEdge(n, t) {
        return { edge: n, side: t, vertex: null, l: null, r: null };
      }, insert: function insert(n, t) {
        t.l = n, t.r = n.r, n.r.l = t, n.r = t;
      }, leftBound: function leftBound(n) {
        var t = r.leftEnd;do {
          t = t.r;
        } while (t != r.rightEnd && u.rightOf(t, n));return t = t.l;
      }, del: function del(n) {
        n.l.r = n.r, n.r.l = n.l, n.edge = null;
      }, right: function right(n) {
        return n.r;
      }, left: function left(n) {
        return n.l;
      }, leftRegion: function leftRegion(n) {
        return n.edge == null ? e.bottomSite : n.edge.region[n.side];
      }, rightRegion: function rightRegion(n) {
        return n.edge == null ? e.bottomSite : n.edge.region[Ho[n.side]];
      } },
        u = { bisect: function bisect(n, t) {
        var e = { region: { l: n, r: t }, ep: { l: null, r: null } },
            r = t.x - n.x,
            u = t.y - n.y,
            i = r > 0 ? r : -r,
            a = u > 0 ? u : -u;return e.c = n.x * r + n.y * u + .5 * (r * r + u * u), i > a ? (e.a = 1, e.b = u / r, e.c /= r) : (e.b = 1, e.a = r / u, e.c /= u), e;
      }, intersect: function intersect(n, t) {
        var e = n.edge,
            r = t.edge;if (!e || !r || e.region.r == r.region.r) return null;var u = e.a * r.b - e.b * r.a;if (Math.abs(u) < 1e-10) return null;var i,
            a,
            o = (e.c * r.b - r.c * e.b) / u,
            c = (r.c * e.a - e.c * r.a) / u,
            l = e.region.r,
            f = r.region.r;l.y < f.y || l.y == f.y && l.x < f.x ? (i = n, a = e) : (i = t, a = r);var s = o >= a.region.r.x;return s && i.side === "l" || !s && i.side === "r" ? null : { x: o, y: c };
      }, rightOf: function rightOf(n, t) {
        var e = n.edge,
            r = e.region.r,
            u = t.x > r.x;if (u && n.side === "l") return 1;if (!u && n.side === "r") return 0;if (e.a === 1) {
          var i = t.y - r.y,
              a = t.x - r.x,
              o = 0,
              c = 0;if (!u && e.b < 0 || u && e.b >= 0 ? c = o = i >= e.b * a : (c = t.x + t.y * e.b > e.c, e.b < 0 && (c = !c), c || (o = 1)), !o) {
            var l = r.x - e.region.l.x;c = e.b * (a * a - i * i) < l * i * (1 + 2 * a / l + e.b * e.b), e.b < 0 && (c = !c);
          }
        } else {
          var f = e.c - e.a * t.x,
              s = t.y - f,
              h = t.x - r.x,
              g = f - r.y;c = s * s > h * h + g * g;
        }return n.side === "l" ? c : !c;
      }, endPoint: function endPoint(n, e, r) {
        n.ep[e] = r, n.ep[Ho[e]] && t(n);
      }, distance: function distance(n, t) {
        var e = n.x - t.x,
            r = n.y - t.y;return Math.sqrt(e * e + r * r);
      } },
        i = { list: [], insert: function insert(n, t, e) {
        n.vertex = t, n.ystar = t.y + e;for (var r = 0, u = i.list, a = u.length; a > r; r++) {
          var o = u[r];if (!(n.ystar > o.ystar || n.ystar == o.ystar && t.x > o.vertex.x)) break;
        }u.splice(r, 0, n);
      }, del: function del(n) {
        for (var t = 0, e = i.list, r = e.length; r > t && e[t] != n; ++t) {}e.splice(t, 1);
      }, empty: function empty() {
        return i.list.length === 0;
      }, nextEvent: function nextEvent(n) {
        for (var t = 0, e = i.list, r = e.length; r > t; ++t) {
          if (e[t] == n) return e[t + 1];
        }return null;
      }, min: function min() {
        var n = i.list[0];return { x: n.vertex.x, y: n.ystar };
      }, extractMin: function extractMin() {
        return i.list.shift();
      } };r.init(), e.bottomSite = e.list.shift();for (var a, o, c, l, f, s, h, g, p, d, m, v, y, M = e.list.shift();;) {
      if (i.empty() || (a = i.min()), M && (i.empty() || M.y < a.y || M.y == a.y && M.x < a.x)) o = r.leftBound(M), c = r.right(o), h = r.rightRegion(o), v = u.bisect(h, M), s = r.createHalfEdge(v, "l"), r.insert(o, s), d = u.intersect(o, s), d && (i.del(o), i.insert(o, d, u.distance(d, M))), o = s, s = r.createHalfEdge(v, "r"), r.insert(o, s), d = u.intersect(s, c), d && i.insert(s, d, u.distance(d, M)), M = e.list.shift();else {
        if (i.empty()) break;o = i.extractMin(), l = r.left(o), c = r.right(o), f = r.right(c), h = r.leftRegion(o), g = r.rightRegion(c), m = o.vertex, u.endPoint(o.edge, o.side, m), u.endPoint(c.edge, c.side, m), r.del(o), i.del(c), r.del(c), y = "l", h.y > g.y && (p = h, h = g, g = p, y = "r"), v = u.bisect(h, g), s = r.createHalfEdge(v, y), r.insert(l, s), u.endPoint(v, Ho[y], m), d = u.intersect(l, s), d && (i.del(l), i.insert(l, d, u.distance(d, h))), d = u.intersect(s, f), d && i.insert(s, d, u.distance(d, h));
      }
    }for (o = r.right(r.leftEnd); o != r.rightEnd; o = r.right(o)) {
      t(o.edge);
    }
  }function rr(n) {
    return n.x;
  }function ur(n) {
    return n.y;
  }function ir() {
    return { leaf: !0, nodes: [], point: null, x: null, y: null };
  }function ar(n, t, e, r, u, i) {
    if (!n(t, e, r, u, i)) {
      var a = .5 * (e + u),
          o = .5 * (r + i),
          c = t.nodes;c[0] && ar(n, c[0], e, r, a, o), c[1] && ar(n, c[1], a, r, u, o), c[2] && ar(n, c[2], e, o, a, i), c[3] && ar(n, c[3], a, o, u, i);
    }
  }function or(n, t) {
    n = oa.rgb(n), t = oa.rgb(t);var e = n.r,
        r = n.g,
        u = n.b,
        i = t.r - e,
        a = t.g - r,
        o = t.b - u;return function (n) {
      return "#" + rt(Math.round(e + i * n)) + rt(Math.round(r + a * n)) + rt(Math.round(u + o * n));
    };
  }function cr(n) {
    var t = [n.a, n.b],
        e = [n.c, n.d],
        r = fr(t),
        u = lr(t, e),
        i = fr(sr(e, t, -u)) || 0;t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Pa, this.translate = [n.e, n.f], this.scale = [r, i], this.skew = i ? Math.atan2(u, i) * Pa : 0;
  }function lr(n, t) {
    return n[0] * t[0] + n[1] * t[1];
  }function fr(n) {
    var t = Math.sqrt(lr(n, n));return t && (n[0] /= t, n[1] /= t), t;
  }function sr(n, t, e) {
    return n[0] += e * t[0], n[1] += e * t[1], n;
  }function hr(n, t) {
    return t -= n, function (e) {
      return n + t * e;
    };
  }function gr(n, t) {
    var e,
        r = [],
        u = [],
        i = oa.transform(n),
        a = oa.transform(t),
        o = i.translate,
        c = a.translate,
        l = i.rotate,
        f = a.rotate,
        s = i.skew,
        h = a.skew,
        g = i.scale,
        p = a.scale;return o[0] != c[0] || o[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), u.push({ i: 1, x: hr(o[0], c[0]) }, { i: 3, x: hr(o[1], c[1]) })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), l != f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), u.push({ i: r.push(r.pop() + "rotate(", null, ")") - 2, x: hr(l, f) })) : f && r.push(r.pop() + "rotate(" + f + ")"), s != h ? u.push({ i: r.push(r.pop() + "skewX(", null, ")") - 2, x: hr(s, h) }) : h && r.push(r.pop() + "skewX(" + h + ")"), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), u.push({ i: e - 4, x: hr(g[0], p[0]) }, { i: e - 2, x: hr(g[1], p[1]) })) : (p[0] != 1 || p[1] != 1) && r.push(r.pop() + "scale(" + p + ")"), e = u.length, function (n) {
      for (var t, i = -1; ++i < e;) {
        r[(t = u[i]).i] = t.x(n);
      }return r.join("");
    };
  }function pr(n, t) {
    var e,
        r = {},
        u = {};for (e in n) {
      e in t ? r[e] = vr(e)(n[e], t[e]) : u[e] = n[e];
    }for (e in t) {
      e in n || (u[e] = t[e]);
    }return function (n) {
      for (e in r) {
        u[e] = r[e](n);
      }return u;
    };
  }function dr(n, t) {
    var e,
        r,
        u,
        i,
        a,
        o = 0,
        c = 0,
        l = [],
        f = [];for (Ro.lastIndex = 0, r = 0; e = Ro.exec(t); ++r) {
      e.index && l.push(t.substring(o, c = e.index)), f.push({ i: l.length, x: e[0] }), l.push(null), o = Ro.lastIndex;
    }for (o < t.length && l.push(t.substring(o)), r = 0, i = f.length; (e = Ro.exec(n)) && i > r; ++r) {
      if (a = f[r], a.x == e[0]) {
        if (a.i) {
          if (l[a.i + 1] == null) for (l[a.i - 1] += a.x, l.splice(a.i, 1), u = r + 1; i > u; ++u) {
            f[u].i--;
          } else for (l[a.i - 1] += a.x + l[a.i + 1], l.splice(a.i, 2), u = r + 1; i > u; ++u) {
            f[u].i -= 2;
          }
        } else if (l[a.i + 1] == null) l[a.i] = a.x;else for (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1), u = r + 1; i > u; ++u) {
          f[u].i--;
        }f.splice(r, 1), i--, r--;
      } else a.x = hr(parseFloat(e[0]), parseFloat(a.x));
    }for (; i > r;) {
      a = f.pop(), l[a.i + 1] == null ? l[a.i] = a.x : (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1)), i--;
    }return l.length === 1 ? l[0] == null ? f[0].x : function () {
      return t;
    } : function (n) {
      for (r = 0; i > r; ++r) {
        l[(a = f[r]).i] = a.x(n);
      }return l.join("");
    };
  }function mr(n, t) {
    for (var e, r = oa.interpolators.length; --r >= 0 && !(e = oa.interpolators[r](n, t));) {}return e;
  }function vr(n) {
    return "transform" == n ? gr : mr;
  }function yr(n, t) {
    var e,
        r = [],
        u = [],
        i = n.length,
        a = t.length,
        o = Math.min(n.length, t.length);for (e = 0; o > e; ++e) {
      r.push(mr(n[e], t[e]));
    }for (; i > e; ++e) {
      u[e] = n[e];
    }for (; a > e; ++e) {
      u[e] = t[e];
    }return function (n) {
      for (e = 0; o > e; ++e) {
        u[e] = r[e](n);
      }return u;
    };
  }function Mr(n) {
    return function (t) {
      return 0 >= t ? 0 : t >= 1 ? 1 : n(t);
    };
  }function xr(n) {
    return function (t) {
      return 1 - n(1 - t);
    };
  }function br(n) {
    return function (t) {
      return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t));
    };
  }function _r(n) {
    return n * n;
  }function wr(n) {
    return n * n * n;
  }function Sr(n) {
    if (0 >= n) return 0;if (n >= 1) return 1;var t = n * n,
        e = t * n;return 4 * (.5 > n ? e : 3 * (n - t) + e - .75);
  }function Er(n) {
    return function (t) {
      return Math.pow(t, n);
    };
  }function kr(n) {
    return 1 - Math.cos(n * La / 2);
  }function Ar(n) {
    return Math.pow(2, 10 * (n - 1));
  }function qr(n) {
    return 1 - Math.sqrt(1 - n * n);
  }function Nr(n, t) {
    var e;return arguments.length < 2 && (t = .45), arguments.length ? e = t / (2 * La) * Math.asin(1 / n) : (n = 1, e = t / 4), function (r) {
      return 1 + n * Math.pow(2, 10 * -r) * Math.sin(2 * (r - e) * La / t);
    };
  }function Tr(n) {
    return n || (n = 1.70158), function (t) {
      return t * t * ((n + 1) * t - n);
    };
  }function Cr(n) {
    return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
  }function zr(n, t) {
    n = oa.hcl(n), t = oa.hcl(t);var e = n.h,
        r = n.c,
        u = n.l,
        i = t.h - e,
        a = t.c - r,
        o = t.l - u;return i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) {
      return B(e + i * n, r + a * n, u + o * n) + "";
    };
  }function Dr(n, t) {
    n = oa.hsl(n), t = oa.hsl(t);var e = n.h,
        r = n.s,
        u = n.l,
        i = t.h - e,
        a = t.s - r,
        o = t.l - u;return i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) {
      return P(e + i * n, r + a * n, u + o * n) + "";
    };
  }function jr(n, t) {
    n = oa.lab(n), t = oa.lab(t);var e = n.l,
        r = n.a,
        u = n.b,
        i = t.l - e,
        a = t.a - r,
        o = t.b - u;return function (n) {
      return G(e + i * n, r + a * n, u + o * n) + "";
    };
  }function Lr(n, t) {
    return t -= n, function (e) {
      return Math.round(n + t * e);
    };
  }function Fr(n, t) {
    return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) {
      return (e - n) * t;
    };
  }function Hr(n, t) {
    return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) {
      return Math.max(0, Math.min(1, (e - n) * t));
    };
  }function Pr(n) {
    for (var t = n.source, e = n.target, r = Or(t, e), u = [t]; t !== r;) {
      t = t.parent, u.push(t);
    }for (var i = u.length; e !== r;) {
      u.splice(i, 0, e), e = e.parent;
    }return u;
  }function Rr(n) {
    for (var t = [], e = n.parent; null != e;) {
      t.push(n), n = e, e = e.parent;
    }return t.push(n), t;
  }function Or(n, t) {
    if (n === t) return n;for (var e = Rr(n), r = Rr(t), u = e.pop(), i = r.pop(), a = null; u === i;) {
      a = u, u = e.pop(), i = r.pop();
    }return a;
  }function Yr(n) {
    n.fixed |= 2;
  }function Ur(n) {
    n.fixed &= -7;
  }function Ir(n) {
    n.fixed |= 4, n.px = n.x, n.py = n.y;
  }function Vr(n) {
    n.fixed &= -5;
  }function Xr(n, t, e) {
    var r = 0,
        u = 0;if (n.charge = 0, !n.leaf) for (var i, a = n.nodes, o = a.length, c = -1; ++c < o;) {
      i = a[c], null != i && (Xr(i, t, e), n.charge += i.charge, r += i.charge * i.cx, u += i.charge * i.cy);
    }if (n.point) {
      n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);var l = t * e[n.point.index];n.charge += n.pointCharge = l, r += l * n.point.x, u += l * n.point.y;
    }n.cx = r / n.charge, n.cy = u / n.charge;
  }function Zr(n, t) {
    return oa.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = Gr, n;
  }function Br(n) {
    return n.children;
  }function $r(n) {
    return n.value;
  }function Jr(n, t) {
    return t.value - n.value;
  }function Gr(n) {
    return oa.merge(n.map(function (n) {
      return (n.children || []).map(function (t) {
        return { source: n, target: t };
      });
    }));
  }function Kr(n) {
    return n.x;
  }function Wr(n) {
    return n.y;
  }function Qr(n, t, e) {
    n.y0 = t, n.y = e;
  }function nu(n) {
    return oa.range(n.length);
  }function tu(n) {
    for (var t = -1, e = n[0].length, r = []; ++t < e;) {
      r[t] = 0;
    }return r;
  }function eu(n) {
    for (var t, e = 1, r = 0, u = n[0][1], i = n.length; i > e; ++e) {
      (t = n[e][1]) > u && (r = e, u = t);
    }return r;
  }function ru(n) {
    return n.reduce(uu, 0);
  }function uu(n, t) {
    return n + t[1];
  }function iu(n, t) {
    return au(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1));
  }function au(n, t) {
    for (var e = -1, r = +n[0], u = (n[1] - r) / t, i = []; ++e <= t;) {
      i[e] = u * e + r;
    }return i;
  }function ou(n) {
    return [oa.min(n), oa.max(n)];
  }function cu(n, t) {
    return n.parent == t.parent ? 1 : 2;
  }function lu(n) {
    var t = n.children;return t && t.length ? t[0] : n._tree.thread;
  }function fu(n) {
    var t,
        e = n.children;return e && (t = e.length) ? e[t - 1] : n._tree.thread;
  }function su(n, t) {
    var e = n.children;if (e && (u = e.length)) for (var r, u, i = -1; ++i < u;) {
      t(r = su(e[i], t), n) > 0 && (n = r);
    }return n;
  }function hu(n, t) {
    return n.x - t.x;
  }function gu(n, t) {
    return t.x - n.x;
  }function pu(n, t) {
    return n.depth - t.depth;
  }function du(n, t) {
    function e(n, r) {
      var u = n.children;if (u && (a = u.length)) for (var i, a, o = null, c = -1; ++c < a;) {
        i = u[c], e(i, o), o = i;
      }t(n, r);
    }e(n, null);
  }function mu(n) {
    for (var t, e = 0, r = 0, u = n.children, i = u.length; --i >= 0;) {
      t = u[i]._tree, t.prelim += e, t.mod += e, e += t.shift + (r += t.change);
    }
  }function vu(n, t, e) {
    n = n._tree, t = t._tree;var r = e / (t.number - n.number);n.change += r, t.change -= r, t.shift += e, t.prelim += e, t.mod += e;
  }function yu(n, t, e) {
    return n._tree.ancestor.parent == t.parent ? n._tree.ancestor : e;
  }function Mu(n, t) {
    return n.value - t.value;
  }function xu(n, t) {
    var e = n._pack_next;n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t;
  }function bu(n, t) {
    n._pack_next = t, t._pack_prev = n;
  }function _u(n, t) {
    var e = t.x - n.x,
        r = t.y - n.y,
        u = n.r + t.r;return u * u - e * e - r * r > .001;
  }function wu(n) {
    function t(n) {
      f = Math.min(n.x - n.r, f), s = Math.max(n.x + n.r, s), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g);
    }if ((e = n.children) && (l = e.length)) {
      var e,
          r,
          u,
          i,
          a,
          o,
          c,
          l,
          f = 1 / 0,
          s = -1 / 0,
          h = 1 / 0,
          g = -1 / 0;if (e.forEach(Su), r = e[0], r.x = -r.r, r.y = 0, t(r), l > 1 && (u = e[1], u.x = u.r, u.y = 0, t(u), l > 2)) for (i = e[2], Au(r, u, i), t(i), xu(r, i), r._pack_prev = i, xu(i, u), u = r._pack_next, a = 3; l > a; a++) {
        Au(r, u, i = e[a]);var p = 0,
            d = 1,
            m = 1;for (o = u._pack_next; o !== u; o = o._pack_next, d++) {
          if (_u(o, i)) {
            p = 1;break;
          }
        }if (1 == p) for (c = r._pack_prev; c !== o._pack_prev && !_u(c, i); c = c._pack_prev, m++) {}p ? (m > d || d == m && u.r < r.r ? bu(r, u = o) : bu(r = c, u), a--) : (xu(r, i), u = i, t(i));
      }var v = (f + s) / 2,
          y = (h + g) / 2,
          M = 0;for (a = 0; l > a; a++) {
        i = e[a], i.x -= v, i.y -= y, M = Math.max(M, i.r + Math.sqrt(i.x * i.x + i.y * i.y));
      }n.r = M, e.forEach(Eu);
    }
  }function Su(n) {
    n._pack_next = n._pack_prev = n;
  }function Eu(n) {
    delete n._pack_next, delete n._pack_prev;
  }function ku(n, t, e, r) {
    var u = n.children;if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, u) for (var i = -1, a = u.length; ++i < a;) {
      ku(u[i], t, e, r);
    }
  }function Au(n, t, e) {
    var r = n.r + e.r,
        u = t.x - n.x,
        i = t.y - n.y;if (r && (u || i)) {
      var a = t.r + e.r,
          o = u * u + i * i;a *= a, r *= r;var c = .5 + (r - a) / (2 * o),
          l = Math.sqrt(Math.max(0, 2 * a * (r + o) - (r -= o) * r - a * a)) / (2 * o);e.x = n.x + c * u + l * i, e.y = n.y + c * i - l * u;
    } else e.x = n.x + r, e.y = n.y;
  }function qu(n) {
    return 1 + oa.max(n, function (n) {
      return n.y;
    });
  }function Nu(n) {
    return n.reduce(function (n, t) {
      return n + t.x;
    }, 0) / n.length;
  }function Tu(n) {
    var t = n.children;return t && t.length ? Tu(t[0]) : n;
  }function Cu(n) {
    var t,
        e = n.children;return e && (t = e.length) ? Cu(e[t - 1]) : n;
  }function zu(n) {
    return { x: n.x, y: n.y, dx: n.dx, dy: n.dy };
  }function Du(n, t) {
    var e = n.x + t[3],
        r = n.y + t[0],
        u = n.dx - t[1] - t[3],
        i = n.dy - t[0] - t[2];return 0 > u && (e += u / 2, u = 0), 0 > i && (r += i / 2, i = 0), { x: e, y: r, dx: u, dy: i };
  }function ju(n) {
    var t = n[0],
        e = n[n.length - 1];return e > t ? [t, e] : [e, t];
  }function Lu(n) {
    return n.rangeExtent ? n.rangeExtent() : ju(n.range());
  }function Fu(n, t, e, r) {
    var u = e(n[0], n[1]),
        i = r(t[0], t[1]);return function (n) {
      return i(u(n));
    };
  }function Hu(n, t) {
    var e,
        r = 0,
        u = n.length - 1,
        i = n[r],
        a = n[u];return i > a && (e = r, r = u, u = e, e = i, i = a, a = e), (t = t(a - i)) && (n[r] = t.floor(i), n[u] = t.ceil(a)), n;
  }function Pu(n, t, e, r) {
    var u = [],
        i = [],
        a = 0,
        o = Math.min(n.length, t.length) - 1;for (n[o] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a <= o;) {
      u.push(e(n[a - 1], n[a])), i.push(r(t[a - 1], t[a]));
    }return function (t) {
      var e = oa.bisect(n, t, 1, o) - 1;return i[e](u[e](t));
    };
  }function Ru(n, t, e, r) {
    function u() {
      var u = Math.min(n.length, t.length) > 2 ? Pu : Fu,
          c = r ? Hr : Fr;return a = u(n, t, c, e), o = u(t, n, c, mr), i;
    }function i(n) {
      return a(n);
    }var a, o;return i.invert = function (n) {
      return o(n);
    }, i.domain = function (t) {
      return arguments.length ? (n = t.map(Number), u()) : n;
    }, i.range = function (n) {
      return arguments.length ? (t = n, u()) : t;
    }, i.rangeRound = function (n) {
      return i.range(n).interpolate(Lr);
    }, i.clamp = function (n) {
      return arguments.length ? (r = n, u()) : r;
    }, i.interpolate = function (n) {
      return arguments.length ? (e = n, u()) : e;
    }, i.ticks = function (t) {
      return Iu(n, t);
    }, i.tickFormat = function (t, e) {
      return Vu(n, t, e);
    }, i.nice = function () {
      return Hu(n, Yu), u();
    }, i.copy = function () {
      return Ru(n, t, e, r);
    }, u();
  }function Ou(n, t) {
    return oa.rebind(n, t, "range", "rangeRound", "interpolate", "clamp");
  }function Yu(n) {
    return n = Math.pow(10, Math.round(Math.log(n) / Math.LN10) - 1), n && { floor: function floor(t) {
        return Math.floor(t / n) * n;
      }, ceil: function ceil(t) {
        return Math.ceil(t / n) * n;
      } };
  }function Uu(n, t) {
    var e = ju(n),
        r = e[1] - e[0],
        u = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
        i = t / r * u;return .15 >= i ? u *= 10 : .35 >= i ? u *= 5 : .75 >= i && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + .5 * u, e[2] = u, e;
  }function Iu(n, t) {
    return oa.range.apply(oa, Uu(n, t));
  }function Vu(n, t, e) {
    var r = -Math.floor(Math.log(Uu(n, t)[2]) / Math.LN10 + .01);return oa.format(e ? e.replace(ro, function (n, t, e, u, i, a, o, c, l, f) {
      return [t, e, u, i, a, o, c, l || "." + (r - 2 * ("%" === f)), f].join("");
    }) : ",." + r + "f");
  }function Xu(n, t, e, r) {
    function u(t) {
      return n(e(t));
    }return u.invert = function (t) {
      return r(n.invert(t));
    }, u.domain = function (t) {
      return arguments.length ? (t[0] < 0 ? (e = $u, r = Ju) : (e = Zu, r = Bu), n.domain(t.map(e)), u) : n.domain().map(r);
    }, u.base = function (n) {
      return arguments.length ? (t = +n, u) : t;
    }, u.nice = function () {
      return n.domain(Hu(n.domain(), Gu(t))), u;
    }, u.ticks = function () {
      var u = ju(n.domain()),
          i = [];if (u.every(isFinite)) {
        var a = Math.log(t),
            o = Math.floor(u[0] / a),
            c = Math.ceil(u[1] / a),
            l = r(u[0]),
            f = r(u[1]),
            s = t % 1 ? 2 : t;if (e === $u) for (i.push(-Math.pow(t, -o)); o++ < c;) {
          for (var h = s - 1; h > 0; h--) {
            i.push(-Math.pow(t, -o) * h);
          }
        } else {
          for (; c > o; o++) {
            for (var h = 1; s > h; h++) {
              i.push(Math.pow(t, o) * h);
            }
          }i.push(Math.pow(t, o));
        }for (o = 0; i[o] < l; o++) {}for (c = i.length; i[c - 1] > f; c--) {}i = i.slice(o, c);
      }return i;
    }, u.tickFormat = function (n, i) {
      if (arguments.length < 2 && (i = $o), !arguments.length) return i;var a,
          o = Math.log(t),
          c = Math.max(.1, n / u.ticks().length),
          l = e === $u ? (a = -1e-12, Math.floor) : (a = 1e-12, Math.ceil);return function (n) {
        return n / r(o * l(e(n) / o + a)) <= c ? i(n) : "";
      };
    }, u.copy = function () {
      return Xu(n.copy(), t, e, r);
    }, Ou(u, n);
  }function Zu(n) {
    return Math.log(0 > n ? 0 : n);
  }function Bu(n) {
    return Math.exp(n);
  }function $u(n) {
    return -Math.log(n > 0 ? 0 : -n);
  }function Ju(n) {
    return -Math.exp(-n);
  }function Gu(n) {
    n = Math.log(n);var t = { floor: function floor(t) {
        return Math.floor(t / n) * n;
      }, ceil: function ceil(t) {
        return Math.ceil(t / n) * n;
      } };return function () {
      return t;
    };
  }function Ku(n, t) {
    function e(t) {
      return n(r(t));
    }var r = Wu(t),
        u = Wu(1 / t);return e.invert = function (t) {
      return u(n.invert(t));
    }, e.domain = function (t) {
      return arguments.length ? (n.domain(t.map(r)), e) : n.domain().map(u);
    }, e.ticks = function (n) {
      return Iu(e.domain(), n);
    }, e.tickFormat = function (n, t) {
      return Vu(e.domain(), n, t);
    }, e.nice = function () {
      return e.domain(Hu(e.domain(), Yu));
    }, e.exponent = function (n) {
      if (!arguments.length) return t;var i = e.domain();return r = Wu(t = n), u = Wu(1 / t), e.domain(i);
    }, e.copy = function () {
      return Ku(n.copy(), t);
    }, Ou(e, n);
  }function Wu(n) {
    return function (t) {
      return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n);
    };
  }function Qu(n, t) {
    function e(t) {
      return a[((i.get(t) || i.set(t, n.push(t))) - 1) % a.length];
    }function r(t, e) {
      return oa.range(n.length).map(function (n) {
        return t + e * n;
      });
    }var i, a, o;return e.domain = function (r) {
      if (!arguments.length) return n;n = [], i = new u();for (var a, o = -1, c = r.length; ++o < c;) {
        i.has(a = r[o]) || i.set(a, n.push(a));
      }return e[t.t].apply(e, t.a);
    }, e.range = function (n) {
      return arguments.length ? (a = n, o = 0, t = { t: "range", a: arguments }, e) : a;
    }, e.rangePoints = function (u, i) {
      arguments.length < 2 && (i = 0);var c = u[0],
          l = u[1],
          f = (l - c) / (Math.max(1, n.length - 1) + i);return a = r(n.length < 2 ? (c + l) / 2 : c + f * i / 2, f), o = 0, t = { t: "rangePoints", a: arguments }, e;
    }, e.rangeBands = function (u, i, c) {
      arguments.length < 2 && (i = 0), arguments.length < 3 && (c = i);var l = u[1] < u[0],
          f = u[l - 0],
          s = u[1 - l],
          h = (s - f) / (n.length - i + 2 * c);return a = r(f + h * c, h), l && a.reverse(), o = h * (1 - i), t = { t: "rangeBands", a: arguments }, e;
    }, e.rangeRoundBands = function (u, i, c) {
      arguments.length < 2 && (i = 0), arguments.length < 3 && (c = i);var l = u[1] < u[0],
          f = u[l - 0],
          s = u[1 - l],
          h = Math.floor((s - f) / (n.length - i + 2 * c)),
          g = s - f - (n.length - i) * h;return a = r(f + Math.round(g / 2), h), l && a.reverse(), o = Math.round(h * (1 - i)), t = { t: "rangeRoundBands", a: arguments }, e;
    }, e.rangeBand = function () {
      return o;
    }, e.rangeExtent = function () {
      return ju(t.a[0]);
    }, e.copy = function () {
      return Qu(n, t);
    }, e.domain(n);
  }function ni(n, t) {
    function e() {
      var e = 0,
          i = t.length;for (u = []; ++e < i;) {
        u[e - 1] = oa.quantile(n, e / i);
      }return r;
    }function r(n) {
      return isNaN(n = +n) ? 0 / 0 : t[oa.bisect(u, n)];
    }var u;return r.domain = function (t) {
      return arguments.length ? (n = t.filter(function (n) {
        return !isNaN(n);
      }).sort(oa.ascending), e()) : n;
    }, r.range = function (n) {
      return arguments.length ? (t = n, e()) : t;
    }, r.quantiles = function () {
      return u;
    }, r.copy = function () {
      return ni(n, t);
    }, e();
  }function ti(n, t, e) {
    function r(t) {
      return e[Math.max(0, Math.min(a, Math.floor(i * (t - n))))];
    }function u() {
      return i = e.length / (t - n), a = e.length - 1, r;
    }var i, a;return r.domain = function (e) {
      return arguments.length ? (n = +e[0], t = +e[e.length - 1], u()) : [n, t];
    }, r.range = function (n) {
      return arguments.length ? (e = n, u()) : e;
    }, r.copy = function () {
      return ti(n, t, e);
    }, u();
  }function ei(n, t) {
    function e(e) {
      return t[oa.bisect(n, e)];
    }return e.domain = function (t) {
      return arguments.length ? (n = t, e) : n;
    }, e.range = function (n) {
      return arguments.length ? (t = n, e) : t;
    }, e.copy = function () {
      return ei(n, t);
    }, e;
  }function ri(n) {
    function t(n) {
      return +n;
    }return t.invert = t, t.domain = t.range = function (e) {
      return arguments.length ? (n = e.map(t), t) : n;
    }, t.ticks = function (t) {
      return Iu(n, t);
    }, t.tickFormat = function (t, e) {
      return Vu(n, t, e);
    }, t.copy = function () {
      return ri(n);
    }, t;
  }function ui(n) {
    return n.innerRadius;
  }function ii(n) {
    return n.outerRadius;
  }function ai(n) {
    return n.startAngle;
  }function oi(n) {
    return n.endAngle;
  }function ci(n) {
    for (var t, e, r, u = -1, i = n.length; ++u < i;) {
      t = n[u], e = t[0], r = t[1] + Qo, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
    }return n;
  }function li(n) {
    function t(t) {
      function c() {
        d.push("M", o(n(v), s), f, l(n(m.reverse()), s), "Z");
      }for (var h, g, p, d = [], m = [], v = [], y = -1, M = t.length, x = lt(e), b = lt(u), _ = e === r ? function () {
        return g;
      } : lt(r), w = u === i ? function () {
        return p;
      } : lt(i); ++y < M;) {
        a.call(this, h = t[y], y) ? (m.push([g = +x.call(this, h, y), p = +b.call(this, h, y)]), v.push([+_.call(this, h, y), +w.call(this, h, y)])) : m.length && (c(), m = [], v = []);
      }return m.length && c(), d.length ? d.join("") : null;
    }var e = ze,
        r = ze,
        u = 0,
        i = De,
        a = Dt,
        o = je,
        c = o.key,
        l = o,
        f = "L",
        s = .7;return t.x = function (n) {
      return arguments.length ? (e = r = n, t) : r;
    }, t.x0 = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.x1 = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t.y = function (n) {
      return arguments.length ? (u = i = n, t) : i;
    }, t.y0 = function (n) {
      return arguments.length ? (u = n, t) : u;
    }, t.y1 = function (n) {
      return arguments.length ? (i = n, t) : i;
    }, t.defined = function (n) {
      return arguments.length ? (a = n, t) : a;
    }, t.interpolate = function (n) {
      return arguments.length ? (c = "function" == typeof n ? o = n : (o = Do.get(n) || je).key, l = o.reverse || o, f = o.closed ? "M" : "L", t) : c;
    }, t.tension = function (n) {
      return arguments.length ? (s = n, t) : s;
    }, t;
  }function fi(n) {
    return n.radius;
  }function si(n) {
    return [n.x, n.y];
  }function hi(n) {
    return function () {
      var t = n.apply(this, arguments),
          e = t[0],
          r = t[1] + Qo;return [e * Math.cos(r), e * Math.sin(r)];
    };
  }function gi() {
    return 64;
  }function pi() {
    return "circle";
  }function di(n) {
    var t = Math.sqrt(n / La);return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z";
  }function mi(n, t) {
    return Ma(n, ic), n.id = t, n;
  }function vi(n, t, e, r) {
    var u = n.id;return D(n, "function" == typeof e ? function (n, i, a) {
      n.__transition__[u].tween.set(t, r(e.call(n, n.__data__, i, a)));
    } : (e = r(e), function (n) {
      n.__transition__[u].tween.set(t, e);
    }));
  }function yi(n) {
    return null == n && (n = ""), function () {
      this.textContent = n;
    };
  }function Mi(n, t, e, r) {
    var i = n.__transition__ || (n.__transition__ = { active: 0, count: 0 }),
        a = i[e];if (!a) {
      var o = r.time;return a = i[e] = { tween: new u(), event: oa.dispatch("start", "end"), time: o, ease: r.ease, delay: r.delay, duration: r.duration }, ++i.count, oa.timer(function (r) {
        function u(r) {
          return i.active > e ? l() : (i.active = e, h.start.call(n, f, t), a.tween.forEach(function (e, r) {
            (r = r.call(n, f, t)) && d.push(r);
          }), c(r) || oa.timer(c, 0, o), 1);
        }function c(r) {
          if (i.active !== e) return l();for (var u = (r - g) / p, a = s(u), o = d.length; o > 0;) {
            d[--o].call(n, a);
          }return u >= 1 ? (l(), h.end.call(n, f, t), 1) : void 0;
        }function l() {
          return --i.count ? delete i[e] : delete n.__transition__, 1;
        }var f = n.__data__,
            s = a.ease,
            h = a.event,
            g = a.delay,
            p = a.duration,
            d = [];return r >= g ? u(r) : oa.timer(u, g, o), 1;
      }, 0, o), a;
    }
  }function xi(n, t) {
    n.attr("transform", function (n) {
      return "translate(" + t(n) + ",0)";
    });
  }function bi(n, t) {
    n.attr("transform", function (n) {
      return "translate(0," + t(n) + ")";
    });
  }function _i(n, t, e) {
    if (r = [], e && t.length > 1) {
      for (var r, u, i, a = ju(n.domain()), o = -1, c = t.length, l = (t[1] - t[0]) / ++e; ++o < c;) {
        for (u = e; --u > 0;) {
          (i = +t[o] - u * l) >= a[0] && r.push(i);
        }
      }for (--o, u = 0; ++u < e && (i = +t[o] + u * l) < a[1];) {
        r.push(i);
      }
    }return r;
  }function wi() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }function Si(n, t, e) {
    function r(t) {
      var e = n(t),
          r = i(e, 1);return r - t > t - e ? e : r;
    }function u(e) {
      return t(e = n(new hc(e - 1)), 1), e;
    }function i(n, e) {
      return t(n = new hc(+n), e), n;
    }function a(n, r, i) {
      var a = u(n),
          o = [];if (i > 1) for (; r > a;) {
        e(a) % i || o.push(new Date(+a)), t(a, 1);
      } else for (; r > a;) {
        o.push(new Date(+a)), t(a, 1);
      }return o;
    }function o(n, t, e) {
      try {
        hc = wi;var r = new wi();return r._ = n, a(r, t, e);
      } finally {
        hc = Date;
      }
    }n.floor = n, n.round = r, n.ceil = u, n.offset = i, n.range = a;var c = n.utc = Ei(n);return c.floor = c, c.round = Ei(r), c.ceil = Ei(u), c.offset = Ei(i), c.range = o, n;
  }function Ei(n) {
    return function (t, e) {
      try {
        hc = wi;var r = new wi();return r._ = t, n(r, e)._;
      } finally {
        hc = Date;
      }
    };
  }function ki(n, t, e, r) {
    for (var u, i, a = 0, o = t.length, c = e.length; o > a;) {
      if (r >= c) return -1;if (u = t.charCodeAt(a++), 37 === u) {
        if (i = Tc[t.charAt(a++)], !i || (r = i(n, e, r)) < 0) return -1;
      } else if (u != e.charCodeAt(r++)) return -1;
    }return r;
  }function Ai(n) {
    return RegExp("^(?:" + n.map(oa.requote).join("|") + ")", "i");
  }function qi(n) {
    for (var t = new u(), e = -1, r = n.length; ++e < r;) {
      t.set(n[e].toLowerCase(), e);
    }return t;
  }function Ni(n, t, e) {
    n += "";var r = n.length;return e > r ? Array(e - r + 1).join(t) + n : n;
  }function Ti(n, t, e) {
    wc.lastIndex = 0;var r = wc.exec(t.substring(e));return r ? e += r[0].length : -1;
  }function Ci(n, t, e) {
    _c.lastIndex = 0;var r = _c.exec(t.substring(e));return r ? e += r[0].length : -1;
  }function zi(n, t, e) {
    kc.lastIndex = 0;var r = kc.exec(t.substring(e));return r ? (n.m = Ac.get(r[0].toLowerCase()), e += r[0].length) : -1;
  }function Di(n, t, e) {
    Sc.lastIndex = 0;var r = Sc.exec(t.substring(e));return r ? (n.m = Ec.get(r[0].toLowerCase()), e += r[0].length) : -1;
  }function ji(n, t, e) {
    return ki(n, "" + Nc.c, t, e);
  }function Li(n, t, e) {
    return ki(n, "" + Nc.x, t, e);
  }function Fi(n, t, e) {
    return ki(n, "" + Nc.X, t, e);
  }function Hi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 4));return r ? (n.y = +r[0], e += r[0].length) : -1;
  }function Pi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.y = Ri(+r[0]), e += r[0].length) : -1;
  }function Ri(n) {
    return n + (n > 68 ? 1900 : 2e3);
  }function Oi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.m = r[0] - 1, e += r[0].length) : -1;
  }function Yi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.d = +r[0], e += r[0].length) : -1;
  }function Ui(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.H = +r[0], e += r[0].length) : -1;
  }function Ii(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.M = +r[0], e += r[0].length) : -1;
  }function Vi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 2));return r ? (n.S = +r[0], e += r[0].length) : -1;
  }function Xi(n, t, e) {
    Cc.lastIndex = 0;var r = Cc.exec(t.substring(e, e + 3));return r ? (n.L = +r[0], e += r[0].length) : -1;
  }function Zi(n, t, e) {
    var r = zc.get(t.substring(e, e += 2).toLowerCase());return null == r ? -1 : (n.p = r, e);
  }function Bi(n) {
    var t = n.getTimezoneOffset(),
        e = t > 0 ? "-" : "+",
        r = ~~(Math.abs(t) / 60),
        u = Math.abs(t) % 60;return e + Ni(r, "0", 2) + Ni(u, "0", 2);
  }function $i(n) {
    return n.toISOString();
  }function Ji(n, t, e) {
    function r(t) {
      return n(t);
    }return r.invert = function (t) {
      return Ki(n.invert(t));
    }, r.domain = function (t) {
      return arguments.length ? (n.domain(t), r) : n.domain().map(Ki);
    }, r.nice = function (n) {
      return r.domain(Hu(r.domain(), function () {
        return n;
      }));
    }, r.ticks = function (e, u) {
      var i = Gi(r.domain());if ("function" != typeof e) {
        var a = i[1] - i[0],
            o = a / e,
            c = oa.bisect(jc, o);if (c == jc.length) return t.year(i, e);if (!c) return n.ticks(e).map(Ki);Math.log(o / jc[c - 1]) < Math.log(jc[c] / o) && --c, e = t[c], u = e[1], e = e[0].range;
      }return e(i[0], new Date(+i[1] + 1), u);
    }, r.tickFormat = function () {
      return e;
    }, r.copy = function () {
      return Ji(n.copy(), t, e);
    }, oa.rebind(r, n, "range", "rangeRound", "interpolate", "clamp");
  }function Gi(n) {
    var t = n[0],
        e = n[n.length - 1];return e > t ? [t, e] : [e, t];
  }function Ki(n) {
    return new Date(n);
  }function Wi(n) {
    return function (t) {
      for (var e = n.length - 1, r = n[e]; !r[1](t);) {
        r = n[--e];
      }return r[0](t);
    };
  }function Qi(n) {
    var t = new Date(n, 0, 1);return t.setFullYear(n), t;
  }function na(n) {
    var t = n.getFullYear(),
        e = Qi(t),
        r = Qi(t + 1);return t + (n - e) / (r - e);
  }function ta(n) {
    var t = new Date(Date.UTC(n, 0, 1));return t.setUTCFullYear(n), t;
  }function ea(n) {
    var t = n.getUTCFullYear(),
        e = ta(t),
        r = ta(t + 1);return t + (n - e) / (r - e);
  }function ra(n) {
    return n.responseText;
  }function ua(n) {
    return JSON.parse(n.responseText);
  }function ia(n) {
    var t = ca.createRange();return t.selectNode(ca.body), t.createContextualFragment(n.responseText);
  }function aa(n) {
    return n.responseXML;
  }var oa = { version: "3.1.4" };Date.now || (Date.now = function () {
    return +new Date();
  });var ca = document,
      la = window;try {
    ca.createElement("div").style.setProperty("opacity", 0, "");
  } catch (fa) {
    var sa = la.CSSStyleDeclaration.prototype,
        ha = sa.setProperty;sa.setProperty = function (n, t, e) {
      ha.call(this, n, t + "", e);
    };
  }oa.ascending = function (n, t) {
    return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0;
  }, oa.descending = function (n, t) {
    return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0;
  }, oa.min = function (n, t) {
    var e,
        r,
        u = -1,
        i = n.length;if (arguments.length === 1) {
      for (; ++u < i && ((e = n[u]) == null || e != e);) {
        e = void 0;
      }for (; ++u < i;) {
        (r = n[u]) != null && e > r && (e = r);
      }
    } else {
      for (; ++u < i && ((e = t.call(n, n[u], u)) == null || e != e);) {
        e = void 0;
      }for (; ++u < i;) {
        (r = t.call(n, n[u], u)) != null && e > r && (e = r);
      }
    }return e;
  }, oa.max = function (n, t) {
    var e,
        r,
        u = -1,
        i = n.length;if (arguments.length === 1) {
      for (; ++u < i && ((e = n[u]) == null || e != e);) {
        e = void 0;
      }for (; ++u < i;) {
        (r = n[u]) != null && r > e && (e = r);
      }
    } else {
      for (; ++u < i && ((e = t.call(n, n[u], u)) == null || e != e);) {
        e = void 0;
      }for (; ++u < i;) {
        (r = t.call(n, n[u], u)) != null && r > e && (e = r);
      }
    }return e;
  }, oa.extent = function (n, t) {
    var e,
        r,
        u,
        i = -1,
        a = n.length;if (arguments.length === 1) {
      for (; ++i < a && ((e = u = n[i]) == null || e != e);) {
        e = u = void 0;
      }for (; ++i < a;) {
        (r = n[i]) != null && (e > r && (e = r), r > u && (u = r));
      }
    } else {
      for (; ++i < a && ((e = u = t.call(n, n[i], i)) == null || e != e);) {
        e = void 0;
      }for (; ++i < a;) {
        (r = t.call(n, n[i], i)) != null && (e > r && (e = r), r > u && (u = r));
      }
    }return [e, u];
  }, oa.sum = function (n, t) {
    var e,
        r = 0,
        u = n.length,
        i = -1;if (arguments.length === 1) for (; ++i < u;) {
      isNaN(e = +n[i]) || (r += e);
    } else for (; ++i < u;) {
      isNaN(e = +t.call(n, n[i], i)) || (r += e);
    }return r;
  }, oa.mean = function (t, e) {
    var r,
        u = t.length,
        i = 0,
        a = -1,
        o = 0;if (arguments.length === 1) for (; ++a < u;) {
      n(r = t[a]) && (i += (r - i) / ++o);
    } else for (; ++a < u;) {
      n(r = e.call(t, t[a], a)) && (i += (r - i) / ++o);
    }return o ? i : void 0;
  }, oa.quantile = function (n, t) {
    var e = (n.length - 1) * t + 1,
        r = Math.floor(e),
        u = +n[r - 1],
        i = e - r;return i ? u + i * (n[r] - u) : u;
  }, oa.median = function (t, e) {
    return arguments.length > 1 && (t = t.map(e)), t = t.filter(n), t.length ? oa.quantile(t.sort(oa.ascending), .5) : void 0;
  }, oa.bisector = function (n) {
    return { left: function left(t, e, r, u) {
        for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
          var i = r + u >>> 1;n.call(t, t[i], i) < e ? r = i + 1 : u = i;
        }return r;
      }, right: function right(t, e, r, u) {
        for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
          var i = r + u >>> 1;e < n.call(t, t[i], i) ? u = i : r = i + 1;
        }return r;
      } };
  };var ga = oa.bisector(function (n) {
    return n;
  });oa.bisectLeft = ga.left, oa.bisect = oa.bisectRight = ga.right, oa.shuffle = function (n) {
    for (var t, e, r = n.length; r;) {
      e = Math.random() * r-- | 0, t = n[r], n[r] = n[e], n[e] = t;
    }return n;
  }, oa.permute = function (n, t) {
    for (var e = [], r = -1, u = t.length; ++r < u;) {
      e[r] = n[t[r]];
    }return e;
  }, oa.zip = function () {
    if (!(u = arguments.length)) return [];for (var n = -1, e = oa.min(arguments, t), r = Array(e); ++n < e;) {
      for (var u, i = -1, a = r[n] = Array(u); ++i < u;) {
        a[i] = arguments[i][n];
      }
    }return r;
  }, oa.transpose = function (n) {
    return oa.zip.apply(oa, n);
  }, oa.keys = function (n) {
    var t = [];for (var e in n) {
      t.push(e);
    }return t;
  }, oa.values = function (n) {
    var t = [];for (var e in n) {
      t.push(n[e]);
    }return t;
  }, oa.entries = function (n) {
    var t = [];for (var e in n) {
      t.push({ key: e, value: n[e] });
    }return t;
  }, oa.merge = function (n) {
    return Array.prototype.concat.apply([], n);
  }, oa.range = function (n, t, r) {
    if (arguments.length < 3 && (r = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / r) throw Error("infinite range");var u,
        i = [],
        a = e(Math.abs(r)),
        o = -1;if (n *= a, t *= a, r *= a, 0 > r) for (; (u = n + r * ++o) > t;) {
      i.push(u / a);
    } else for (; (u = n + r * ++o) < t;) {
      i.push(u / a);
    }return i;
  }, oa.map = function (n) {
    var t = new u();for (var e in n) {
      t.set(e, n[e]);
    }return t;
  }, r(u, { has: function has(n) {
      return pa + n in this;
    }, get: function get(n) {
      return this[pa + n];
    }, set: function set(n, t) {
      return this[pa + n] = t;
    }, remove: function remove(n) {
      return n = pa + n, n in this && delete this[n];
    }, keys: function keys() {
      var n = [];return this.forEach(function (t) {
        n.push(t);
      }), n;
    }, values: function values() {
      var n = [];return this.forEach(function (t, e) {
        n.push(e);
      }), n;
    }, entries: function entries() {
      var n = [];return this.forEach(function (t, e) {
        n.push({ key: t, value: e });
      }), n;
    }, forEach: function forEach(n) {
      for (var t in this) {
        t.charCodeAt(0) === da && n.call(this, t.substring(1), this[t]);
      }
    } });var pa = "\0",
      da = pa.charCodeAt(0);oa.nest = function () {
    function n(t, o, c) {
      if (c >= a.length) return r ? r.call(i, o) : e ? o.sort(e) : o;for (var l, f, s, h, g = -1, p = o.length, d = a[c++], m = new u(); ++g < p;) {
        (h = m.get(l = d(f = o[g]))) ? h.push(f) : m.set(l, [f]);
      }return t ? (f = t(), s = function s(e, r) {
        f.set(e, n(t, r, c));
      }) : (f = {}, s = function s(e, r) {
        f[e] = n(t, r, c);
      }), m.forEach(s), f;
    }function t(n, e) {
      if (e >= a.length) return n;var r = [],
          u = o[e++];return n.forEach(function (n, u) {
        r.push({ key: n, values: t(u, e) });
      }), u ? r.sort(function (n, t) {
        return u(n.key, t.key);
      }) : r;
    }var e,
        r,
        i = {},
        a = [],
        o = [];return i.map = function (t, e) {
      return n(e, t, 0);
    }, i.entries = function (e) {
      return t(n(oa.map, e, 0), 0);
    }, i.key = function (n) {
      return a.push(n), i;
    }, i.sortKeys = function (n) {
      return o[a.length - 1] = n, i;
    }, i.sortValues = function (n) {
      return e = n, i;
    }, i.rollup = function (n) {
      return r = n, i;
    }, i;
  }, oa.set = function (n) {
    var t = new i();if (n) for (var e = 0; e < n.length; e++) {
      t.add(n[e]);
    }return t;
  }, r(i, { has: function has(n) {
      return pa + n in this;
    }, add: function add(n) {
      return this[pa + n] = !0, n;
    }, remove: function remove(n) {
      return n = pa + n, n in this && delete this[n];
    }, values: function values() {
      var n = [];return this.forEach(function (t) {
        n.push(t);
      }), n;
    }, forEach: function forEach(n) {
      for (var t in this) {
        t.charCodeAt(0) === da && n.call(this, t.substring(1));
      }
    } }), oa.behavior = {}, oa.rebind = function (n, t) {
    for (var e, r = 1, u = arguments.length; ++r < u;) {
      n[e = arguments[r]] = a(n, t, t[e]);
    }return n;
  }, oa.dispatch = function () {
    for (var n = new o(), t = -1, e = arguments.length; ++t < e;) {
      n[arguments[t]] = c(n);
    }return n;
  }, o.prototype.on = function (n, t) {
    var e = n.indexOf("."),
        r = "";if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);if (arguments.length === 2) {
      if (null == t) for (n in this) {
        this.hasOwnProperty(n) && this[n].on(r, null);
      }return this;
    }
  }, oa.event = null, oa.mouse = function (n) {
    return h(n, f());
  };var ma = /WebKit/.test(la.navigator.userAgent) ? -1 : 0,
      va = p;
  try {
    va(ca.documentElement.childNodes)[0].nodeType;
  } catch (ya) {
    va = g;
  }var Ma = [].__proto__ ? function (n, t) {
    n.__proto__ = t;
  } : function (n, t) {
    for (var e in t) {
      n[e] = t[e];
    }
  };oa.touches = function (n, t) {
    return arguments.length < 2 && (t = f().touches), t ? va(t).map(function (t) {
      var e = h(n, t);return e.identifier = t.identifier, e;
    }) : [];
  }, oa.behavior.drag = function () {
    function n() {
      this.on("mousedown.drag", t).on("touchstart.drag", t);
    }function t() {
      function n() {
        var n = o.parentNode;return null != s ? oa.touches(n).filter(function (n) {
          return n.identifier === s;
        })[0] : oa.mouse(n);
      }function t() {
        if (!o.parentNode) return u();var t = n(),
            e = t[0] - h[0],
            r = t[1] - h[1];g |= e | r, h = t, l(), c({ type: "drag", x: t[0] + a[0], y: t[1] + a[1], dx: e, dy: r });
      }function u() {
        c({ type: "dragend" }), g && (l(), oa.event.target === f && p.on("click.drag", i, !0)), p.on(null != s ? "touchmove.drag-" + s : "mousemove.drag", null).on(null != s ? "touchend.drag-" + s : "mouseup.drag", null);
      }function i() {
        l(), p.on("click.drag", null);
      }var a,
          o = this,
          c = e.of(o, arguments),
          f = oa.event.target,
          s = oa.event.touches ? oa.event.changedTouches[0].identifier : null,
          h = n(),
          g = 0,
          p = oa.select(la).on(null != s ? "touchmove.drag-" + s : "mousemove.drag", t).on(null != s ? "touchend.drag-" + s : "mouseup.drag", u, !0);r ? (a = r.apply(o, arguments), a = [a.x - h[0], a.y - h[1]]) : a = [0, 0], null == s && l(), c({ type: "dragstart" });
    }var e = s(n, "drag", "dragstart", "dragend"),
        r = null;return n.origin = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, oa.rebind(n, e, "on");
  };var xa = function xa(n, t) {
    return t.querySelector(n);
  },
      ba = function ba(n, t) {
    return t.querySelectorAll(n);
  },
      _a = ca.documentElement,
      wa = _a.matchesSelector || _a.webkitMatchesSelector || _a.mozMatchesSelector || _a.msMatchesSelector || _a.oMatchesSelector,
      Sa = function Sa(n, t) {
    return wa.call(n, t);
  };"function" == typeof Sizzle && (xa = function xa(n, t) {
    return Sizzle(n, t)[0] || null;
  }, ba = function ba(n, t) {
    return Sizzle.uniqueSort(Sizzle(n, t));
  }, Sa = Sizzle.matchesSelector);var Ea = [];oa.selection = function () {
    return Ta;
  }, oa.selection.prototype = Ea, Ea.select = function (n) {
    var t,
        e,
        r,
        u,
        i = [];"function" != typeof n && (n = m(n));for (var a = -1, o = this.length; ++a < o;) {
      i.push(t = []), t.parentNode = (r = this[a]).parentNode;for (var c = -1, l = r.length; ++c < l;) {
        (u = r[c]) ? (t.push(e = n.call(u, u.__data__, c)), e && "__data__" in u && (e.__data__ = u.__data__)) : t.push(null);
      }
    }return d(i);
  }, Ea.selectAll = function (n) {
    var t,
        e,
        r = [];"function" != typeof n && (n = v(n));for (var u = -1, i = this.length; ++u < i;) {
      for (var a = this[u], o = -1, c = a.length; ++o < c;) {
        (e = a[o]) && (r.push(t = va(n.call(e, e.__data__, o))), t.parentNode = e);
      }
    }return d(r);
  };var ka = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };oa.ns = { prefix: ka, qualify: function qualify(n) {
      var t = n.indexOf(":"),
          e = n;return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), ka.hasOwnProperty(e) ? { space: ka[e], local: n } : n;
    } }, Ea.attr = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) {
        var e = this.node();return n = oa.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n);
      }for (t in n) {
        this.each(y(t, n[t]));
      }return this;
    }return this.each(y(n, t));
  }, oa.requote = function (n) {
    return n.replace(Aa, "\\$&");
  };var Aa = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;Ea.classed = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) {
        var e = this.node(),
            r = (n = n.trim().split(/^|\s+/g)).length,
            u = -1;if (t = e.classList) {
          for (; ++u < r;) {
            if (!t.contains(n[u])) return !1;
          }
        } else for (t = e.getAttribute("class"); ++u < r;) {
          if (!x(n[u]).test(t)) return !1;
        }return !0;
      }for (t in n) {
        this.each(_(t, n[t]));
      }return this;
    }return this.each(_(n, t));
  }, Ea.style = function (n, t, e) {
    var r = arguments.length;if (3 > r) {
      if ("string" != typeof n) {
        2 > r && (t = "");for (e in n) {
          this.each(S(e, n[e], t));
        }return this;
      }if (2 > r) return la.getComputedStyle(this.node(), null).getPropertyValue(n);e = "";
    }return this.each(S(n, t, e));
  }, Ea.property = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) return this.node()[n];for (t in n) {
        this.each(E(t, n[t]));
      }return this;
    }return this.each(E(n, t));
  }, Ea.text = function (n) {
    return arguments.length ? this.each("function" == typeof n ? function () {
      var t = n.apply(this, arguments);this.textContent = null == t ? "" : t;
    } : null == n ? function () {
      this.textContent = "";
    } : function () {
      this.textContent = n;
    }) : this.node().textContent;
  }, Ea.html = function (n) {
    return arguments.length ? this.each("function" == typeof n ? function () {
      var t = n.apply(this, arguments);this.innerHTML = null == t ? "" : t;
    } : null == n ? function () {
      this.innerHTML = "";
    } : function () {
      this.innerHTML = n;
    }) : this.node().innerHTML;
  }, Ea.append = function (n) {
    function t() {
      return this.appendChild(ca.createElementNS(this.namespaceURI, n));
    }function e() {
      return this.appendChild(ca.createElementNS(n.space, n.local));
    }return n = oa.ns.qualify(n), this.select(n.local ? e : t);
  }, Ea.insert = function (n, t) {
    function e(e, r) {
      return this.insertBefore(ca.createElementNS(this.namespaceURI, n), t.call(this, e, r));
    }function r(e, r) {
      return this.insertBefore(ca.createElementNS(n.space, n.local), t.call(this, e, r));
    }return n = oa.ns.qualify(n), "function" != typeof t && (t = m(t)), this.select(n.local ? r : e);
  }, Ea.remove = function () {
    return this.each(function () {
      var n = this.parentNode;n && n.removeChild(this);
    });
  }, Ea.data = function (n, t) {
    function e(n, e) {
      var r,
          i,
          a,
          o = n.length,
          s = e.length,
          h = Math.min(o, s),
          g = Array(s),
          p = Array(s),
          d = Array(o);if (t) {
        var m,
            v = new u(),
            y = new u(),
            M = [];for (r = -1; ++r < o;) {
          m = t.call(i = n[r], i.__data__, r), v.has(m) ? d[r] = i : v.set(m, i), M.push(m);
        }for (r = -1; ++r < s;) {
          m = t.call(e, a = e[r], r), (i = v.get(m)) ? (g[r] = i, i.__data__ = a) : y.has(m) || (p[r] = k(a)), y.set(m, a), v.remove(m);
        }for (r = -1; ++r < o;) {
          v.has(M[r]) && (d[r] = n[r]);
        }
      } else {
        for (r = -1; ++r < h;) {
          i = n[r], a = e[r], i ? (i.__data__ = a, g[r] = i) : p[r] = k(a);
        }for (; s > r; ++r) {
          p[r] = k(e[r]);
        }for (; o > r; ++r) {
          d[r] = n[r];
        }
      }p.update = g, p.parentNode = g.parentNode = d.parentNode = n.parentNode, c.push(p), l.push(g), f.push(d);
    }var r,
        i,
        a = -1,
        o = this.length;if (!arguments.length) {
      for (n = Array(o = (r = this[0]).length); ++a < o;) {
        (i = r[a]) && (n[a] = i.__data__);
      }return n;
    }var c = j([]),
        l = d([]),
        f = d([]);if ("function" == typeof n) for (; ++a < o;) {
      e(r = this[a], n.call(r, r.parentNode.__data__, a));
    } else for (; ++a < o;) {
      e(r = this[a], n);
    }return l.enter = function () {
      return c;
    }, l.exit = function () {
      return f;
    }, l;
  }, Ea.datum = function (n) {
    return arguments.length ? this.property("__data__", n) : this.property("__data__");
  }, Ea.filter = function (n) {
    var t,
        e,
        r,
        u = [];"function" != typeof n && (n = A(n));for (var i = 0, a = this.length; a > i; i++) {
      u.push(t = []), t.parentNode = (e = this[i]).parentNode;for (var o = 0, c = e.length; c > o; o++) {
        (r = e[o]) && n.call(r, r.__data__, o) && t.push(r);
      }
    }return d(u);
  }, Ea.order = function () {
    for (var n = -1, t = this.length; ++n < t;) {
      for (var e, r = this[n], u = r.length - 1, i = r[u]; --u >= 0;) {
        (e = r[u]) && (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i), i = e);
      }
    }return this;
  }, Ea.sort = function (n) {
    n = q.apply(this, arguments);for (var t = -1, e = this.length; ++t < e;) {
      this[t].sort(n);
    }return this.order();
  }, Ea.on = function (n, t, e) {
    var r = arguments.length;if (3 > r) {
      if ("string" != typeof n) {
        2 > r && (t = !1);for (e in n) {
          this.each(T(e, n[e], t));
        }return this;
      }if (2 > r) return (r = this.node()["__on" + n]) && r._;e = !1;
    }return this.each(T(n, t, e));
  };var qa = oa.map({ mouseenter: "mouseover", mouseleave: "mouseout" });qa.forEach(function (n) {
    "on" + n in ca && qa.remove(n);
  }), Ea.each = function (n) {
    return D(this, function (t, e, r) {
      n.call(t, t.__data__, e, r);
    });
  }, Ea.call = function (n) {
    var t = va(arguments);return n.apply(t[0] = this, t), this;
  }, Ea.empty = function () {
    return !this.node();
  }, Ea.node = function () {
    for (var n = 0, t = this.length; t > n; n++) {
      for (var e = this[n], r = 0, u = e.length; u > r; r++) {
        var i = e[r];if (i) return i;
      }
    }return null;
  };var Na = [];oa.selection.enter = j, oa.selection.enter.prototype = Na, Na.append = Ea.append, Na.insert = Ea.insert, Na.empty = Ea.empty, Na.node = Ea.node, Na.select = function (n) {
    for (var t, e, r, u, i, a = [], o = -1, c = this.length; ++o < c;) {
      r = (u = this[o]).update, a.push(t = []), t.parentNode = u.parentNode;for (var l = -1, f = u.length; ++l < f;) {
        (i = u[l]) ? (t.push(r[l] = e = n.call(u.parentNode, i.__data__, l)), e.__data__ = i.__data__) : t.push(null);
      }
    }return d(a);
  }, Ea.transition = function () {
    var n,
        t,
        e = ec || ++ac,
        r = [],
        u = Object.create(oc);u.time = Date.now();for (var i = -1, a = this.length; ++i < a;) {
      r.push(n = []);for (var o = this[i], c = -1, l = o.length; ++c < l;) {
        (t = o[c]) && Mi(t, c, e, u), n.push(t);
      }
    }return mi(r, e);
  };var Ta = d([[ca]]);Ta[0].parentNode = _a, oa.select = function (n) {
    return "string" == typeof n ? Ta.select(n) : d([[n]]);
  }, oa.selectAll = function (n) {
    return "string" == typeof n ? Ta.selectAll(n) : d([va(n)]);
  }, oa.behavior.zoom = function () {
    function n() {
      this.on("mousedown.zoom", o).on("mousemove.zoom", f).on(Da + ".zoom", c).on("dblclick.zoom", h).on("touchstart.zoom", g).on("touchmove.zoom", p).on("touchend.zoom", g);
    }function t(n) {
      return [(n[0] - _[0]) / w, (n[1] - _[1]) / w];
    }function e(n) {
      return [n[0] * w + _[0], n[1] * w + _[1]];
    }function r(n) {
      w = Math.max(S[0], Math.min(S[1], n));
    }function u(n, t) {
      t = e(t), _[0] += n[0] - t[0], _[1] += n[1] - t[1];
    }function i() {
      y && y.domain(v.range().map(function (n) {
        return (n - _[0]) / w;
      }).map(v.invert)), x && x.domain(M.range().map(function (n) {
        return (n - _[1]) / w;
      }).map(M.invert));
    }function a(n) {
      i(), oa.event.preventDefault(), n({ type: "zoom", scale: w, translate: _ });
    }function o() {
      function n() {
        f = 1, u(oa.mouse(i), h), a(o);
      }function e() {
        f && l(), s.on("mousemove.zoom", null).on("mouseup.zoom", null), f && oa.event.target === c && s.on("click.zoom", r, !0);
      }function r() {
        l(), s.on("click.zoom", null);
      }var i = this,
          o = E.of(i, arguments),
          c = oa.event.target,
          f = 0,
          s = oa.select(la).on("mousemove.zoom", n).on("mouseup.zoom", e),
          h = t(oa.mouse(i));la.focus(), l();
    }function c() {
      d || (d = t(oa.mouse(this))), r(Math.pow(2, Ca() * .002) * w), u(oa.mouse(this), d), a(E.of(this, arguments));
    }function f() {
      d = null;
    }function h() {
      var n = oa.mouse(this),
          e = t(n),
          i = Math.log(w) / Math.LN2;r(Math.pow(2, oa.event.shiftKey ? Math.ceil(i) - 1 : Math.floor(i) + 1)), u(n, e), a(E.of(this, arguments));
    }function g() {
      var n = oa.touches(this),
          e = Date.now();if (m = w, d = {}, n.forEach(function (n) {
        d[n.identifier] = t(n);
      }), l(), n.length === 1) {
        if (500 > e - b) {
          var i = n[0],
              o = t(n[0]);r(2 * w), u(i, o), a(E.of(this, arguments));
        }b = e;
      }
    }function p() {
      var n = oa.touches(this),
          t = n[0],
          e = d[t.identifier];if (i = n[1]) {
        var i,
            o = d[i.identifier];t = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], r(oa.event.scale * m);
      }u(t, e), b = null, a(E.of(this, arguments));
    }var d,
        m,
        v,
        y,
        M,
        x,
        b,
        _ = [0, 0],
        w = 1,
        S = za,
        E = s(n, "zoom");return n.translate = function (t) {
      return arguments.length ? (_ = t.map(Number), i(), n) : _;
    }, n.scale = function (t) {
      return arguments.length ? (w = +t, i(), n) : w;
    }, n.scaleExtent = function (t) {
      return arguments.length ? (S = null == t ? za : t.map(Number), n) : S;
    }, n.x = function (t) {
      return arguments.length ? (y = t, v = t.copy(), _ = [0, 0], w = 1, n) : y;
    }, n.y = function (t) {
      return arguments.length ? (x = t, M = t.copy(), _ = [0, 0], w = 1, n) : x;
    }, oa.rebind(n, E, "on");
  };var Ca,
      za = [0, 1 / 0],
      Da = "onwheel" in ca ? (Ca = function Ca() {
    return -oa.event.deltaY * (oa.event.deltaMode ? 120 : 1);
  }, "wheel") : "onmousewheel" in ca ? (Ca = function Ca() {
    return oa.event.wheelDelta;
  }, "mousewheel") : (Ca = function Ca() {
    return -oa.event.detail;
  }, "MozMousePixelScroll");L.prototype.toString = function () {
    return this.rgb() + "";
  }, oa.hsl = function (n, t, e) {
    return arguments.length === 1 ? n instanceof H ? F(n.h, n.s, n.l) : ut("" + n, it, F) : F(+n, +t, +e);
  };var ja = H.prototype = new L();ja.brighter = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), F(this.h, this.s, this.l / n);
  }, ja.darker = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), F(this.h, this.s, n * this.l);
  }, ja.rgb = function () {
    return P(this.h, this.s, this.l);
  };var La = Math.PI,
      Fa = 1e-6,
      Ha = La / 180,
      Pa = 180 / La;oa.hcl = function (n, t, e) {
    return arguments.length === 1 ? n instanceof Z ? X(n.h, n.c, n.l) : n instanceof J ? K(n.l, n.a, n.b) : K((n = at((n = oa.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : X(+n, +t, +e);
  };var Ra = Z.prototype = new L();Ra.brighter = function (n) {
    return X(this.h, this.c, Math.min(100, this.l + Oa * (arguments.length ? n : 1)));
  }, Ra.darker = function (n) {
    return X(this.h, this.c, Math.max(0, this.l - Oa * (arguments.length ? n : 1)));
  }, Ra.rgb = function () {
    return B(this.h, this.c, this.l).rgb();
  }, oa.lab = function (n, t, e) {
    return arguments.length === 1 ? n instanceof J ? $(n.l, n.a, n.b) : n instanceof Z ? B(n.l, n.c, n.h) : at((n = oa.rgb(n)).r, n.g, n.b) : $(+n, +t, +e);
  };var Oa = 18,
      Ya = .95047,
      Ua = 1,
      Ia = 1.08883,
      Va = J.prototype = new L();Va.brighter = function (n) {
    return $(Math.min(100, this.l + Oa * (arguments.length ? n : 1)), this.a, this.b);
  }, Va.darker = function (n) {
    return $(Math.max(0, this.l - Oa * (arguments.length ? n : 1)), this.a, this.b);
  }, Va.rgb = function () {
    return G(this.l, this.a, this.b);
  }, oa.rgb = function (n, t, e) {
    return arguments.length === 1 ? n instanceof et ? tt(n.r, n.g, n.b) : ut("" + n, tt, P) : tt(~~n, ~~t, ~~e);
  };var Xa = et.prototype = new L();Xa.brighter = function (n) {
    n = Math.pow(.7, arguments.length ? n : 1);var t = this.r,
        e = this.g,
        r = this.b,
        u = 30;return t || e || r ? (t && u > t && (t = u), e && u > e && (e = u), r && u > r && (r = u), tt(Math.min(255, Math.floor(t / n)), Math.min(255, Math.floor(e / n)), Math.min(255, Math.floor(r / n)))) : tt(u, u, u);
  }, Xa.darker = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), tt(Math.floor(n * this.r), Math.floor(n * this.g), Math.floor(n * this.b));
  }, Xa.hsl = function () {
    return it(this.r, this.g, this.b);
  }, Xa.toString = function () {
    return "#" + rt(this.r) + rt(this.g) + rt(this.b);
  };var Za = oa.map({ aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#ffffff", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32" });Za.forEach(function (n, t) {
    Za.set(n, ut(t, tt, P));
  }), oa.functor = lt, oa.xhr = function (n, t, e) {
    function r() {
      var n = c.status;!n && c.responseText || n >= 200 && 300 > n || 304 === n ? i.load.call(u, o.call(u, c)) : i.error.call(u, c);
    }var u = {},
        i = oa.dispatch("progress", "load", "error"),
        a = {},
        o = ft,
        c = new (la.XDomainRequest && /^(http(s)?:)?\/\//.test(n) ? XDomainRequest : XMLHttpRequest)();return "onload" in c ? c.onload = c.onerror = r : c.onreadystatechange = function () {
      c.readyState > 3 && r();
    }, c.onprogress = function (n) {
      var t = oa.event;oa.event = n;try {
        i.progress.call(u, c);
      } finally {
        oa.event = t;
      }
    }, u.header = function (n, t) {
      return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", u);
    }, u.mimeType = function (n) {
      return arguments.length ? (t = null == n ? null : n + "", u) : t;
    }, u.response = function (n) {
      return o = n, u;
    }, ["get", "post"].forEach(function (n) {
      u[n] = function () {
        return u.send.apply(u, [n].concat(va(arguments)));
      };
    }), u.send = function (e, r, i) {
      if (arguments.length === 2 && "function" == typeof r && (i = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader) for (var o in a) {
        c.setRequestHeader(o, a[o]);
      }return null != t && c.overrideMimeType && c.overrideMimeType(t), null != i && u.on("error", i).on("load", function (n) {
        i(null, n);
      }), c.send(null == r ? null : r), u;
    }, u.abort = function () {
      return c.abort(), u;
    }, oa.rebind(u, i, "on"), arguments.length === 2 && "function" == typeof t && (e = t, t = null), null == e ? u : u.get(st(e));
  }, oa.csv = ht(",", "text/csv"), oa.tsv = ht("	", "text/tab-separated-values");var Ba,
      $a,
      Ja = 0,
      Ga = {},
      Ka = null;oa.timer = function (n, t, e) {
    if (arguments.length < 3) {
      if (arguments.length < 2) t = 0;else if (!isFinite(t)) return;e = Date.now();
    }var r = Ga[n.id];r && r.callback === n ? (r.then = e, r.delay = t) : Ga[n.id = ++Ja] = Ka = { callback: n, then: e, delay: t, next: Ka }, Ba || ($a = clearTimeout($a), Ba = 1, Wa(gt));
  }, oa.timer.flush = function () {
    for (var n, t = Date.now(), e = Ka; e;) {
      n = t - e.then, e.delay || (e.flush = e.callback(n)), e = e.next;
    }pt();
  };var Wa = la.requestAnimationFrame || la.webkitRequestAnimationFrame || la.mozRequestAnimationFrame || la.oRequestAnimationFrame || la.msRequestAnimationFrame || function (n) {
    setTimeout(n, 17);
  },
      Qa = ".",
      no = ",",
      to = [3, 3],
      eo = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(dt);oa.formatPrefix = function (n, t) {
    var e = 0;return n && (0 > n && (n *= -1), t && (n = oa.round(n, mt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, Math.floor((0 >= e ? e + 1 : e - 1) / 3) * 3))), eo[8 + e / 3];
  }, oa.round = function (n, t) {
    return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n);
  }, oa.format = function (n) {
    var t = ro.exec(n),
        e = t[1] || " ",
        r = t[2] || ">",
        u = t[3] || "",
        i = t[4] || "",
        a = t[5],
        o = +t[6],
        c = t[7],
        l = t[8],
        f = t[9],
        s = 1,
        h = "",
        g = !1;switch (l && (l = +l.substring(1)), (a || "0" === e && "=" === r) && (a = e = "0", r = "=", c && (o -= Math.floor((o - 1) / 4))), f) {case "n":
        c = !0, f = "g";break;case "%":
        s = 100, h = "%", f = "f";break;case "p":
        s = 100, h = "%", f = "r";break;case "b":case "o":case "x":case "X":
        i && (i = "0" + f.toLowerCase());case "c":case "d":
        g = !0, l = 0;break;case "s":
        s = -1, f = "r";}"#" === i && (i = ""), "r" != f || l || (f = "g"), null != l && ("g" == f ? l = Math.max(1, Math.min(21, l)) : ("e" == f || "f" == f) && (l = Math.max(0, Math.min(20, l)))), f = uo.get(f) || vt;var p = a && c;return function (n) {
      if (g && n % 1) return "";var t = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : u;if (0 > s) {
        var d = oa.formatPrefix(n, l);n = d.scale(n), h = d.symbol;
      } else n *= s;n = f(n, l), !a && c && (n = io(n));var m = i.length + n.length + (p ? 0 : t.length),
          v = o > m ? Array(m = o - m + 1).join(e) : "";return p && (n = io(v + n)), Qa && n.replace(".", Qa), t += i, ("<" === r ? t + n + v : ">" === r ? v + t + n : "^" === r ? v.substring(0, m >>= 1) + t + n + v.substring(m) : t + (p ? n : v + n)) + h;
    };
  };var ro = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
      uo = oa.map({ b: function b(n) {
      return n.toString(2);
    }, c: function c(n) {
      return String.fromCharCode(n);
    }, o: function o(n) {
      return n.toString(8);
    }, x: function x(n) {
      return n.toString(16);
    }, X: function X(n) {
      return n.toString(16).toUpperCase();
    }, g: function g(n, t) {
      return n.toPrecision(t);
    }, e: function e(n, t) {
      return n.toExponential(t);
    }, f: function f(n, t) {
      return n.toFixed(t);
    }, r: function r(n, t) {
      return (n = oa.round(n, mt(n, t))).toFixed(Math.max(0, Math.min(20, mt(n * (1 + 1e-15), t))));
    } }),
      io = ft;if (to) {
    var ao = to.length;io = function io(n) {
      for (var t = n.lastIndexOf("."), e = t >= 0 ? "." + n.substring(t + 1) : (t = n.length, ""), r = [], u = 0, i = to[0]; t > 0 && i > 0;) {
        r.push(n.substring(t -= i, t + i)), i = to[u = (u + 1) % ao];
      }return r.reverse().join(no || "") + e;
    };
  }oa.geo = {}, oa.geo.stream = function (n, t) {
    oo.hasOwnProperty(n.type) ? oo[n.type](n, t) : yt(n, t);
  };var oo = { Feature: function Feature(n, t) {
      yt(n.geometry, t);
    }, FeatureCollection: function FeatureCollection(n, t) {
      for (var e = n.features, r = -1, u = e.length; ++r < u;) {
        yt(e[r].geometry, t);
      }
    } },
      co = { Sphere: function Sphere(n, t) {
      t.sphere();
    }, Point: function Point(n, t) {
      var e = n.coordinates;t.point(e[0], e[1]);
    }, MultiPoint: function MultiPoint(n, t) {
      for (var e, r = n.coordinates, u = -1, i = r.length; ++u < i;) {
        e = r[u], t.point(e[0], e[1]);
      }
    }, LineString: function LineString(n, t) {
      Mt(n.coordinates, t, 0);
    }, MultiLineString: function MultiLineString(n, t) {
      for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) {
        Mt(e[r], t, 0);
      }
    }, Polygon: function Polygon(n, t) {
      xt(n.coordinates, t);
    }, MultiPolygon: function MultiPolygon(n, t) {
      for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) {
        xt(e[r], t);
      }
    }, GeometryCollection: function GeometryCollection(n, t) {
      for (var e = n.geometries, r = -1, u = e.length; ++r < u;) {
        yt(e[r], t);
      }
    } };oa.geo.area = function (n) {
    return lo = 0, oa.geo.stream(n, ho), lo;
  };var lo,
      fo,
      so,
      ho = { sphere: function sphere() {
      lo += 4 * La;
    }, point: N, lineStart: N, lineEnd: N, polygonStart: function polygonStart() {
      fo = 1, so = 0, ho.lineStart = bt;
    }, polygonEnd: function polygonEnd() {
      var n = 2 * Math.atan2(so, fo);lo += 0 > n ? 4 * La + n : n, ho.lineStart = ho.lineEnd = ho.point = N;
    } };oa.geo.bounds = _t(ft), oa.geo.centroid = function (n) {
    go = po = mo = vo = yo = 0, oa.geo.stream(n, Mo);var t;return po && Math.abs(t = Math.sqrt(mo * mo + vo * vo + yo * yo)) > Fa ? [Math.atan2(vo, mo) * Pa, Math.asin(Math.max(-1, Math.min(1, yo / t))) * Pa] : void 0;
  };var go,
      po,
      mo,
      vo,
      yo,
      Mo = { sphere: function sphere() {
      2 > go && (go = 2, po = mo = vo = yo = 0);
    }, point: wt, lineStart: Et, lineEnd: kt, polygonStart: function polygonStart() {
      2 > go && (go = 2, po = mo = vo = yo = 0), Mo.lineStart = St;
    }, polygonEnd: function polygonEnd() {
      Mo.lineStart = Et;
    } },
      xo = Pt(Dt, It, Xt),
      bo = 1e9;oa.geo.projection = Kt, oa.geo.projectionMutator = Wt, (oa.geo.equirectangular = function () {
    return Kt(ne);
  }).raw = ne.invert = ne, oa.geo.rotation = function (n) {
    function t(t) {
      return t = n(t[0] * Ha, t[1] * Ha), t[0] *= Pa, t[1] *= Pa, t;
    }return n = te(n[0] % 360 * Ha, n[1] * Ha, n.length > 2 ? n[2] * Ha : 0), t.invert = function (t) {
      return t = n.invert(t[0] * Ha, t[1] * Ha), t[0] *= Pa, t[1] *= Pa, t;
    }, t;
  }, oa.geo.circle = function () {
    function n() {
      var n = "function" == typeof r ? r.apply(this, arguments) : r,
          t = te(-n[0] * Ha, -n[1] * Ha, 0).invert,
          u = [];return e(null, null, 1, { point: function point(n, e) {
          u.push(n = t(n, e)), n[0] *= Pa, n[1] *= Pa;
        } }), { type: "Polygon", coordinates: [u] };
    }var t,
        e,
        r = [0, 0],
        u = 6;return n.origin = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.angle = function (r) {
      return arguments.length ? (e = ie((t = +r) * Ha, u * Ha), n) : t;
    }, n.precision = function (r) {
      return arguments.length ? (e = ie(t * Ha, (u = +r) * Ha), n) : u;
    }, n.angle(90);
  }, oa.geo.distance = function (n, t) {
    var e,
        r = (t[0] - n[0]) * Ha,
        u = n[1] * Ha,
        i = t[1] * Ha,
        a = Math.sin(r),
        o = Math.cos(r),
        c = Math.sin(u),
        l = Math.cos(u),
        f = Math.sin(i),
        s = Math.cos(i);return Math.atan2(Math.sqrt((e = s * a) * e + (e = l * f - c * s * o) * e), c * f + l * s * o);
  }, oa.geo.graticule = function () {
    function n() {
      return { type: "MultiLineString", coordinates: t() };
    }function t() {
      return oa.range(Math.ceil(i / m) * m, u, m).map(h).concat(oa.range(Math.ceil(l / v) * v, c, v).map(g)).concat(oa.range(Math.ceil(r / p) * p, e, p).filter(function (n) {
        return Math.abs(n % m) > Fa;
      }).map(f)).concat(oa.range(Math.ceil(o / d) * d, a, d).filter(function (n) {
        return Math.abs(n % v) > Fa;
      }).map(s));
    }var e,
        r,
        u,
        i,
        a,
        o,
        c,
        l,
        f,
        s,
        h,
        g,
        p = 10,
        d = p,
        m = 90,
        v = 360,
        y = 2.5;return n.lines = function () {
      return t().map(function (n) {
        return { type: "LineString", coordinates: n };
      });
    }, n.outline = function () {
      return { type: "Polygon", coordinates: [h(i).concat(g(c).slice(1), h(u).reverse().slice(1), g(l).reverse().slice(1))] };
    }, n.extent = function (t) {
      return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent();
    }, n.majorExtent = function (t) {
      return arguments.length ? (i = +t[0][0], u = +t[1][0], l = +t[0][1], c = +t[1][1], i > u && (t = i, i = u, u = t), l > c && (t = l, l = c, c = t), n.precision(y)) : [[i, l], [u, c]];
    }, n.minorExtent = function (t) {
      return arguments.length ? (r = +t[0][0], e = +t[1][0], o = +t[0][1], a = +t[1][1], r > e && (t = r, r = e, e = t), o > a && (t = o, o = a, a = t), n.precision(y)) : [[r, o], [e, a]];
    }, n.step = function (t) {
      return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep();
    }, n.majorStep = function (t) {
      return arguments.length ? (m = +t[0], v = +t[1], n) : [m, v];
    }, n.minorStep = function (t) {
      return arguments.length ? (p = +t[0], d = +t[1], n) : [p, d];
    }, n.precision = function (t) {
      return arguments.length ? (y = +t, f = oe(o, a, 90), s = ce(r, e, y), h = oe(l, c, 90), g = ce(i, u, y), n) : y;
    }, n.majorExtent([[-180, -90 + Fa], [180, 90 - Fa]]).minorExtent([[-180, -80 - Fa], [180, 80 + Fa]]);
  }, oa.geo.greatArc = function () {
    function n() {
      return { type: "LineString", coordinates: [t || r.apply(this, arguments), e || u.apply(this, arguments)] };
    }var t,
        e,
        r = le,
        u = fe;return n.distance = function () {
      return oa.geo.distance(t || r.apply(this, arguments), e || u.apply(this, arguments));
    }, n.source = function (e) {
      return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r;
    }, n.target = function (t) {
      return arguments.length ? (u = t, e = "function" == typeof t ? null : t, n) : u;
    }, n.precision = function () {
      return arguments.length ? n : 0;
    }, n;
  }, oa.geo.interpolate = function (n, t) {
    return se(n[0] * Ha, n[1] * Ha, t[0] * Ha, t[1] * Ha);
  }, oa.geo.length = function (n) {
    return _o = 0, oa.geo.stream(n, wo), _o;
  };var _o,
      wo = { sphere: N, point: N, lineStart: he, lineEnd: N, polygonStart: N, polygonEnd: N };(oa.geo.conicEqualArea = function () {
    return ge(pe);
  }).raw = pe, oa.geo.albersUsa = function () {
    function n(n) {
      return t(n)(n);
    }function t(n) {
      var t = n[0],
          e = n[1];return e > 50 ? a : -140 > t ? o : 21 > e ? c : i;
    }var e,
        r,
        u,
        i = oa.geo.conicEqualArea().rotate([98, 0]).center([0, 38]).parallels([29.5, 45.5]),
        a = oa.geo.conicEqualArea().rotate([160, 0]).center([0, 60]).parallels([55, 65]),
        o = oa.geo.conicEqualArea().rotate([160, 0]).center([0, 20]).parallels([8, 18]),
        c = oa.geo.conicEqualArea().rotate([60, 0]).center([0, 10]).parallels([8, 18]);return n.invert = function (n) {
      return e(n) || r(n) || u(n) || i.invert(n);
    }, n.scale = function (t) {
      return arguments.length ? (i.scale(t), a.scale(.6 * t), o.scale(t), c.scale(1.5 * t), n.translate(i.translate())) : i.scale();
    }, n.translate = function (t) {
      if (!arguments.length) return i.translate();var l = i.scale(),
          f = t[0],
          s = t[1];return i.translate(t), a.translate([f - .4 * l, s + .17 * l]), o.translate([f - .19 * l, s + .2 * l]), c.translate([f + .58 * l, s + .43 * l]), e = de(a, [[-180, 50], [-130, 72]]), r = de(o, [[-164, 18], [-154, 24]]), u = de(c, [[-67.5, 17.5], [-65, 19]]), n;
    }, n.scale(1e3);
  };var So,
      Eo,
      ko = { point: N, lineStart: N, lineEnd: N, polygonStart: function polygonStart() {
      Eo = 0, ko.lineStart = me;
    }, polygonEnd: function polygonEnd() {
      ko.lineStart = ko.lineEnd = ko.point = N, So += Math.abs(Eo / 2);
    } },
      Ao = { point: ye, lineStart: Me, lineEnd: xe, polygonStart: function polygonStart() {
      Ao.lineStart = be;
    }, polygonEnd: function polygonEnd() {
      Ao.point = ye, Ao.lineStart = Me, Ao.lineEnd = xe;
    } };oa.geo.path = function () {
    function n(n) {
      return n && oa.geo.stream(n, r(u.pointRadius("function" == typeof i ? +i.apply(this, arguments) : i))), u.result();
    }var t,
        e,
        r,
        u,
        i = 4.5;return n.area = function (n) {
      return So = 0, oa.geo.stream(n, r(ko)), So;
    }, n.centroid = function (n) {
      return go = mo = vo = yo = 0, oa.geo.stream(n, r(Ao)), yo ? [mo / yo, vo / yo] : void 0;
    }, n.bounds = function (n) {
      return _t(r)(n);
    }, n.projection = function (e) {
      return arguments.length ? (r = (t = e) ? e.stream || Se(e) : ft, n) : t;
    }, n.context = function (t) {
      return arguments.length ? (u = (e = t) == null ? new ve() : new _e(t), n) : e;
    }, n.pointRadius = function (t) {
      return arguments.length ? (i = "function" == typeof t ? t : +t, n) : i;
    }, n.projection(oa.geo.albersUsa()).context(null);
  }, oa.geo.albers = function () {
    return oa.geo.conicEqualArea().parallels([29.5, 45.5]).rotate([98, 0]).center([0, 38]).scale(1e3);
  };var qo = Ee(function (n) {
    return Math.sqrt(2 / (1 + n));
  }, function (n) {
    return 2 * Math.asin(n / 2);
  });(oa.geo.azimuthalEqualArea = function () {
    return Kt(qo);
  }).raw = qo;var No = Ee(function (n) {
    var t = Math.acos(n);return t && t / Math.sin(t);
  }, ft);(oa.geo.azimuthalEquidistant = function () {
    return Kt(No);
  }).raw = No, (oa.geo.conicConformal = function () {
    return ge(ke);
  }).raw = ke, (oa.geo.conicEquidistant = function () {
    return ge(Ae);
  }).raw = Ae;var To = Ee(function (n) {
    return 1 / n;
  }, Math.atan);(oa.geo.gnomonic = function () {
    return Kt(To);
  }).raw = To, qe.invert = function (n, t) {
    return [n, 2 * Math.atan(Math.exp(t)) - La / 2];
  }, (oa.geo.mercator = function () {
    return Ne(qe);
  }).raw = qe;var Co = Ee(function () {
    return 1;
  }, Math.asin);(oa.geo.orthographic = function () {
    return Kt(Co);
  }).raw = Co;var zo = Ee(function (n) {
    return 1 / (1 + n);
  }, function (n) {
    return 2 * Math.atan(n);
  });(oa.geo.stereographic = function () {
    return Kt(zo);
  }).raw = zo, Te.invert = function (n, t) {
    return [Math.atan2(U(n), Math.cos(t)), Y(Math.sin(t) / I(n))];
  }, (oa.geo.transverseMercator = function () {
    return Ne(Te);
  }).raw = Te, oa.geom = {}, oa.svg = {}, oa.svg.line = function () {
    return Ce(ft);
  };var Do = oa.map({ linear: je, "linear-closed": Le, "step-before": Fe, "step-after": He, basis: Ie, "basis-open": Ve, "basis-closed": Xe, bundle: Ze, cardinal: Oe, "cardinal-open": Pe, "cardinal-closed": Re, monotone: We });Do.forEach(function (n, t) {
    t.key = n, t.closed = /-closed$/.test(n);
  });var jo = [0, 2 / 3, 1 / 3, 0],
      Lo = [0, 1 / 3, 2 / 3, 0],
      Fo = [0, 1 / 6, 2 / 3, 1 / 6];oa.geom.hull = function (n) {
    function t(n) {
      if (n.length < 3) return [];var t,
          u,
          i,
          a,
          o,
          c,
          l,
          f,
          s,
          h,
          g,
          p,
          d = lt(e),
          m = lt(r),
          v = n.length,
          y = v - 1,
          M = [],
          x = [],
          b = 0;if (d === ze && r === De) t = n;else for (i = 0, t = []; v > i; ++i) {
        t.push([+d.call(this, u = n[i], i), +m.call(this, u, i)]);
      }for (i = 1; v > i; ++i) {
        t[i][1] < t[b][1] ? b = i : t[i][1] == t[b][1] && (b = t[i][0] < t[b][0] ? i : b);
      }for (i = 0; v > i; ++i) {
        i !== b && (c = t[i][1] - t[b][1], o = t[i][0] - t[b][0], M.push({ angle: Math.atan2(c, o), index: i }));
      }for (M.sort(function (n, t) {
        return n.angle - t.angle;
      }), g = M[0].angle, h = M[0].index, s = 0, i = 1; y > i; ++i) {
        a = M[i].index, g == M[i].angle ? (o = t[h][0] - t[b][0], c = t[h][1] - t[b][1], l = t[a][0] - t[b][0], f = t[a][1] - t[b][1], o * o + c * c >= l * l + f * f ? M[i].index = -1 : (M[s].index = -1, g = M[i].angle, s = i, h = a)) : (g = M[i].angle, s = i, h = a);
      }for (x.push(b), i = 0, a = 0; 2 > i; ++a) {
        M[a].index !== -1 && (x.push(M[a].index), i++);
      }for (p = x.length; y > a; ++a) {
        if (M[a].index !== -1) {
          for (; !Qe(x[p - 2], x[p - 1], M[a].index, t);) {
            --p;
          }x[p++] = M[a].index;
        }
      }var _ = [];for (i = 0; p > i; ++i) {
        _.push(n[x[i]]);
      }return _;
    }var e = ze,
        r = De;return arguments.length ? t(n) : (t.x = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.y = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t);
  }, oa.geom.polygon = function (n) {
    return n.area = function () {
      for (var t = 0, e = n.length, r = n[e - 1][1] * n[0][0] - n[e - 1][0] * n[0][1]; ++t < e;) {
        r += n[t - 1][1] * n[t][0] - n[t - 1][0] * n[t][1];
      }return .5 * r;
    }, n.centroid = function (t) {
      var e,
          r,
          u = -1,
          i = n.length,
          a = 0,
          o = 0,
          c = n[i - 1];for (arguments.length || (t = -1 / (6 * n.area())); ++u < i;) {
        e = c, c = n[u], r = e[0] * c[1] - c[0] * e[1], a += (e[0] + c[0]) * r, o += (e[1] + c[1]) * r;
      }return [a * t, o * t];
    }, n.clip = function (t) {
      for (var e, r, u, i, a, o, c = -1, l = n.length, f = n[l - 1]; ++c < l;) {
        for (e = t.slice(), t.length = 0, i = n[c], a = e[(u = e.length) - 1], r = -1; ++r < u;) {
          o = e[r], nr(o, f, i) ? (nr(a, f, i) || t.push(tr(a, o, f, i)), t.push(o)) : nr(a, f, i) && t.push(tr(a, o, f, i)), a = o;
        }f = i;
      }return t;
    }, n;
  }, oa.geom.delaunay = function (n) {
    var t = n.map(function () {
      return [];
    }),
        e = [];return er(n, function (e) {
      t[e.region.l.index].push(n[e.region.r.index]);
    }), t.forEach(function (t, r) {
      var u = n[r],
          i = u[0],
          a = u[1];t.forEach(function (n) {
        n.angle = Math.atan2(n[0] - i, n[1] - a);
      }), t.sort(function (n, t) {
        return n.angle - t.angle;
      });for (var o = 0, c = t.length - 1; c > o; o++) {
        e.push([u, t[o], t[o + 1]]);
      }
    }), e;
  }, oa.geom.voronoi = function (n) {
    function t(n) {
      var t,
          r,
          a,
          o = n.map(function () {
        return [];
      }),
          c = lt(u),
          l = lt(i),
          f = n.length,
          s = 1e6;if (c === ze && l === De) t = n;else for (t = [], a = 0; f > a; ++a) {
        t.push([+c.call(this, r = n[a], a), +l.call(this, r, a)]);
      }if (er(t, function (n) {
        var t, e, r, u, i, a;n.a === 1 && n.b >= 0 ? (t = n.ep.r, e = n.ep.l) : (t = n.ep.l, e = n.ep.r), n.a === 1 ? (i = t ? t.y : -s, r = n.c - n.b * i, a = e ? e.y : s, u = n.c - n.b * a) : (r = t ? t.x : -s, i = n.c - n.a * r, u = e ? e.x : s, a = n.c - n.a * u);var c = [r, i],
            l = [u, a];o[n.region.l.index].push(c, l), o[n.region.r.index].push(c, l);
      }), o = o.map(function (n, e) {
        var r = t[e][0],
            u = t[e][1],
            i = n.map(function (n) {
          return Math.atan2(n[0] - r, n[1] - u);
        }),
            a = oa.range(n.length).sort(function (n, t) {
          return i[n] - i[t];
        });return a.filter(function (n, t) {
          return !t || i[n] - i[a[t - 1]] > Fa;
        }).map(function (t) {
          return n[t];
        });
      }), o.forEach(function (n, e) {
        var r = n.length;if (!r) return n.push([-s, -s], [-s, s], [s, s], [s, -s]);if (!(r > 2)) {
          var u = t[e],
              i = n[0],
              a = n[1],
              o = u[0],
              c = u[1],
              l = i[0],
              f = i[1],
              h = a[0],
              g = a[1],
              p = Math.abs(h - l),
              d = g - f;if (Math.abs(d) < Fa) {
            var m = f > c ? -s : s;n.push([-s, m], [s, m]);
          } else if (Fa > p) {
            var v = l > o ? -s : s;n.push([v, -s], [v, s]);
          } else {
            var m = (l - o) * (g - f) > (h - l) * (f - c) ? s : -s,
                y = Math.abs(d) - p;Math.abs(y) < Fa ? n.push([0 > d ? m : -m, m]) : (y > 0 && (m *= -1), n.push([-s, m], [s, m]));
          }
        }
      }), e) for (a = 0; f > a; ++a) {
        e(o[a]);
      }for (a = 0; f > a; ++a) {
        o[a].point = n[a];
      }return o;
    }var e,
        r = null,
        u = ze,
        i = De;return arguments.length ? t(n) : (t.x = function (n) {
      return arguments.length ? (u = n, t) : u;
    }, t.y = function (n) {
      return arguments.length ? (i = n, t) : i;
    }, t.size = function (n) {
      return arguments.length ? (null == n ? e = null : (r = [+n[0], +n[1]], e = oa.geom.polygon([[0, 0], [0, r[1]], r, [r[0], 0]]).clip), t) : r;
    }, t.links = function (n) {
      var t,
          e,
          r,
          a = n.map(function () {
        return [];
      }),
          o = [],
          c = lt(u),
          l = lt(i),
          f = n.length;if (c === ze && l === De) t = n;else for (r = 0; f > r; ++r) {
        t.push([+c.call(this, e = n[r], r), +l.call(this, e, r)]);
      }return er(t, function (t) {
        var e = t.region.l.index,
            r = t.region.r.index;a[e][r] || (a[e][r] = a[r][e] = !0, o.push({ source: n[e], target: n[r] }));
      }), o;
    }, t.triangles = function (n) {
      if (u === ze && i === De) return oa.geom.delaunay(n);var t,
          e,
          r,
          a,
          o,
          c = lt(u),
          l = lt(i);for (a = 0, t = [], o = n.length; o > a; ++a) {
        e = [+c.call(this, r = n[a], a), +l.call(this, r, a)], e.data = r, t.push(e);
      }return oa.geom.delaunay(t).map(function (n) {
        return n.map(function (n) {
          return n.data;
        });
      });
    }, t);
  };var Ho = { l: "r", r: "l" };oa.geom.quadtree = function (n, t, e, r, u) {
    function i(n) {
      function i(n, t, e, r, u, i, a, o) {
        if (!isNaN(e) && !isNaN(r)) if (n.leaf) {
          var c = n.x,
              f = n.y;
          if (null != c) {
            if (Math.abs(c - e) + Math.abs(f - r) < .01) l(n, t, e, r, u, i, a, o);else {
              var s = n.point;n.x = n.y = n.point = null, l(n, s, c, f, u, i, a, o), l(n, t, e, r, u, i, a, o);
            }
          } else n.x = e, n.y = r, n.point = t;
        } else l(n, t, e, r, u, i, a, o);
      }function l(n, t, e, r, u, a, o, c) {
        var l = .5 * (u + o),
            f = .5 * (a + c),
            s = e >= l,
            h = r >= f,
            g = (h << 1) + s;n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = ir()), s ? u = l : o = l, h ? a = f : c = f, i(n, t, e, r, u, a, o, c);
      }var f,
          s,
          h,
          g,
          p,
          d,
          m,
          v,
          y,
          M = lt(o),
          x = lt(c);if (null != t) d = t, m = e, v = r, y = u;else if (v = y = -(d = m = 1 / 0), s = [], h = [], p = n.length, a) for (g = 0; p > g; ++g) {
        f = n[g], f.x < d && (d = f.x), f.y < m && (m = f.y), f.x > v && (v = f.x), f.y > y && (y = f.y), s.push(f.x), h.push(f.y);
      } else for (g = 0; p > g; ++g) {
        var b = +M(f = n[g], g),
            _ = +x(f, g);d > b && (d = b), m > _ && (m = _), b > v && (v = b), _ > y && (y = _), s.push(b), h.push(_);
      }var w = v - d,
          S = y - m;w > S ? y = m + w : v = d + S;var E = ir();if (E.add = function (n) {
        i(E, n, +M(n, ++g), +x(n, g), d, m, v, y);
      }, E.visit = function (n) {
        ar(n, E, d, m, v, y);
      }, g = -1, null == t) {
        for (; ++g < p;) {
          i(E, n[g], s[g], h[g], d, m, v, y);
        }--g;
      } else n.forEach(E.add);return s = h = n = f = null, E;
    }var a,
        o = ze,
        c = De;return (a = arguments.length) ? (o = rr, c = ur, 3 === a && (u = e, r = t, e = t = 0), i(n)) : (i.x = function (n) {
      return arguments.length ? (o = n, i) : o;
    }, i.y = function (n) {
      return arguments.length ? (c = n, i) : c;
    }, i.size = function (n) {
      return arguments.length ? (null == n ? t = e = r = u = null : (t = e = 0, r = +n[0], u = +n[1]), i) : null == t ? null : [r, u];
    }, i);
  }, oa.interpolateRgb = or, oa.transform = function (n) {
    var t = ca.createElementNS(oa.ns.prefix.svg, "g");return (oa.transform = function (n) {
      t.setAttribute("transform", n);var e = t.transform.baseVal.consolidate();return new cr(e ? e.matrix : Po);
    })(n);
  }, cr.prototype.toString = function () {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };var Po = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };oa.interpolateNumber = hr, oa.interpolateTransform = gr, oa.interpolateObject = pr, oa.interpolateString = dr;var Ro = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;oa.interpolate = mr, oa.interpolators = [pr, function (n, t) {
    return Array.isArray(t) && yr(n, t);
  }, function (n, t) {
    return ("string" == typeof n || "string" == typeof t) && dr(n + "", t + "");
  }, function (n, t) {
    return ("string" == typeof t ? Za.has(t) || /^(#|rgb\(|hsl\()/.test(t) : t instanceof L) && or(n, t);
  }, function (n, t) {
    return !isNaN(n = +n) && !isNaN(t = +t) && hr(n, t);
  }], oa.interpolateArray = yr;var Oo = function Oo() {
    return ft;
  },
      Yo = oa.map({ linear: Oo, poly: Er, quad: function quad() {
      return _r;
    }, cubic: function cubic() {
      return wr;
    }, sin: function sin() {
      return kr;
    }, exp: function exp() {
      return Ar;
    }, circle: function circle() {
      return qr;
    }, elastic: Nr, back: Tr, bounce: function bounce() {
      return Cr;
    } }),
      Uo = oa.map({ "in": ft, out: xr, "in-out": br, "out-in": function outIn(n) {
      return br(xr(n));
    } });oa.ease = function (n) {
    var t = n.indexOf("-"),
        e = t >= 0 ? n.substring(0, t) : n,
        r = t >= 0 ? n.substring(t + 1) : "in";return e = Yo.get(e) || Oo, r = Uo.get(r) || ft, Mr(r(e.apply(null, Array.prototype.slice.call(arguments, 1))));
  }, oa.interpolateHcl = zr, oa.interpolateHsl = Dr, oa.interpolateLab = jr, oa.interpolateRound = Lr, oa.layout = {}, oa.layout.bundle = function () {
    return function (n) {
      for (var t = [], e = -1, r = n.length; ++e < r;) {
        t.push(Pr(n[e]));
      }return t;
    };
  }, oa.layout.chord = function () {
    function n() {
      var n,
          l,
          s,
          h,
          g,
          p = {},
          d = [],
          m = oa.range(i),
          v = [];for (e = [], r = [], n = 0, h = -1; ++h < i;) {
        for (l = 0, g = -1; ++g < i;) {
          l += u[h][g];
        }d.push(l), v.push(oa.range(i)), n += l;
      }for (a && m.sort(function (n, t) {
        return a(d[n], d[t]);
      }), o && v.forEach(function (n, t) {
        n.sort(function (n, e) {
          return o(u[t][n], u[t][e]);
        });
      }), n = (2 * La - f * i) / n, l = 0, h = -1; ++h < i;) {
        for (s = l, g = -1; ++g < i;) {
          var y = m[h],
              M = v[y][g],
              x = u[y][M],
              b = l,
              _ = l += x * n;p[y + "-" + M] = { index: y, subindex: M, startAngle: b, endAngle: _, value: x };
        }r[y] = { index: y, startAngle: s, endAngle: l, value: (l - s) / n }, l += f;
      }for (h = -1; ++h < i;) {
        for (g = h - 1; ++g < i;) {
          var w = p[h + "-" + g],
              S = p[g + "-" + h];(w.value || S.value) && e.push(w.value < S.value ? { source: S, target: w } : { source: w, target: S });
        }
      }c && t();
    }function t() {
      e.sort(function (n, t) {
        return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2);
      });
    }var e,
        r,
        u,
        i,
        a,
        o,
        c,
        l = {},
        f = 0;return l.matrix = function (n) {
      return arguments.length ? (i = (u = n) && u.length, e = r = null, l) : u;
    }, l.padding = function (n) {
      return arguments.length ? (f = n, e = r = null, l) : f;
    }, l.sortGroups = function (n) {
      return arguments.length ? (a = n, e = r = null, l) : a;
    }, l.sortSubgroups = function (n) {
      return arguments.length ? (o = n, e = null, l) : o;
    }, l.sortChords = function (n) {
      return arguments.length ? (c = n, e && t(), l) : c;
    }, l.chords = function () {
      return e || n(), e;
    }, l.groups = function () {
      return r || n(), r;
    }, l;
  }, oa.layout.force = function () {
    function n(n) {
      return function (t, e, r, u) {
        if (t.point !== n) {
          var i = t.cx - n.x,
              a = t.cy - n.y,
              o = 1 / Math.sqrt(i * i + a * a);if (d > (u - e) * o) {
            var c = t.charge * o * o;return n.px -= i * c, n.py -= a * c, !0;
          }if (t.point && isFinite(o)) {
            var c = t.pointCharge * o * o;n.px -= i * c, n.py -= a * c;
          }
        }return !t.charge;
      };
    }function t(n) {
      n.px = oa.event.x, n.py = oa.event.y, o.resume();
    }var e,
        r,
        u,
        i,
        a,
        o = {},
        c = oa.dispatch("start", "tick", "end"),
        l = [1, 1],
        f = .9,
        s = Io,
        h = Vo,
        g = -30,
        p = .1,
        d = .8,
        m = [],
        v = [];return o.tick = function () {
      if ((r *= .99) < .005) return c.end({ type: "end", alpha: r = 0 }), !0;var t,
          e,
          o,
          s,
          h,
          d,
          y,
          M,
          x,
          b = m.length,
          _ = v.length;for (e = 0; _ > e; ++e) {
        o = v[e], s = o.source, h = o.target, M = h.x - s.x, x = h.y - s.y, (d = M * M + x * x) && (d = r * i[e] * ((d = Math.sqrt(d)) - u[e]) / d, M *= d, x *= d, h.x -= M * (y = s.weight / (h.weight + s.weight)), h.y -= x * y, s.x += M * (y = 1 - y), s.y += x * y);
      }if ((y = r * p) && (M = l[0] / 2, x = l[1] / 2, e = -1, y)) for (; ++e < b;) {
        o = m[e], o.x += (M - o.x) * y, o.y += (x - o.y) * y;
      }if (g) for (Xr(t = oa.geom.quadtree(m), r, a), e = -1; ++e < b;) {
        (o = m[e]).fixed || t.visit(n(o));
      }for (e = -1; ++e < b;) {
        o = m[e], o.fixed ? (o.x = o.px, o.y = o.py) : (o.x -= (o.px - (o.px = o.x)) * f, o.y -= (o.py - (o.py = o.y)) * f);
      }c.tick({ type: "tick", alpha: r });
    }, o.nodes = function (n) {
      return arguments.length ? (m = n, o) : m;
    }, o.links = function (n) {
      return arguments.length ? (v = n, o) : v;
    }, o.size = function (n) {
      return arguments.length ? (l = n, o) : l;
    }, o.linkDistance = function (n) {
      return arguments.length ? (s = "function" == typeof n ? n : +n, o) : s;
    }, o.distance = o.linkDistance, o.linkStrength = function (n) {
      return arguments.length ? (h = "function" == typeof n ? n : +n, o) : h;
    }, o.friction = function (n) {
      return arguments.length ? (f = +n, o) : f;
    }, o.charge = function (n) {
      return arguments.length ? (g = "function" == typeof n ? n : +n, o) : g;
    }, o.gravity = function (n) {
      return arguments.length ? (p = +n, o) : p;
    }, o.theta = function (n) {
      return arguments.length ? (d = +n, o) : d;
    }, o.alpha = function (n) {
      return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({ type: "start", alpha: r = n }), oa.timer(o.tick)), o) : r;
    }, o.start = function () {
      function n(n, r) {
        for (var u, i = t(e), a = -1, o = i.length; ++a < o;) {
          if (!isNaN(u = i[a][n])) return u;
        }return Math.random() * r;
      }function t() {
        if (!c) {
          for (c = [], r = 0; p > r; ++r) {
            c[r] = [];
          }for (r = 0; d > r; ++r) {
            var n = v[r];c[n.source.index].push(n.target), c[n.target.index].push(n.source);
          }
        }return c[e];
      }var e,
          r,
          c,
          f,
          p = m.length,
          d = v.length,
          y = l[0],
          M = l[1];for (e = 0; p > e; ++e) {
        (f = m[e]).index = e, f.weight = 0;
      }for (e = 0; d > e; ++e) {
        f = v[e], typeof f.source == "number" && (f.source = m[f.source]), typeof f.target == "number" && (f.target = m[f.target]), ++f.source.weight, ++f.target.weight;
      }for (e = 0; p > e; ++e) {
        f = m[e], isNaN(f.x) && (f.x = n("x", y)), isNaN(f.y) && (f.y = n("y", M)), isNaN(f.px) && (f.px = f.x), isNaN(f.py) && (f.py = f.y);
      }if (u = [], "function" == typeof s) for (e = 0; d > e; ++e) {
        u[e] = +s.call(this, v[e], e);
      } else for (e = 0; d > e; ++e) {
        u[e] = s;
      }if (i = [], "function" == typeof h) for (e = 0; d > e; ++e) {
        i[e] = +h.call(this, v[e], e);
      } else for (e = 0; d > e; ++e) {
        i[e] = h;
      }if (a = [], "function" == typeof g) for (e = 0; p > e; ++e) {
        a[e] = +g.call(this, m[e], e);
      } else for (e = 0; p > e; ++e) {
        a[e] = g;
      }return o.resume();
    }, o.resume = function () {
      return o.alpha(.1);
    }, o.stop = function () {
      return o.alpha(0);
    }, o.drag = function () {
      return e || (e = oa.behavior.drag().origin(ft).on("dragstart.force", Yr).on("drag.force", t).on("dragend.force", Ur)), arguments.length ? (this.on("mouseover.force", Ir).on("mouseout.force", Vr).call(e), void 0) : e;
    }, oa.rebind(o, c, "on");
  };var Io = 20,
      Vo = 1;oa.layout.hierarchy = function () {
    function n(t, a, o) {
      var c = u.call(e, t, a);if (t.depth = a, o.push(t), c && (l = c.length)) {
        for (var l, f, s = -1, h = t.children = [], g = 0, p = a + 1; ++s < l;) {
          f = n(c[s], p, o), f.parent = t, h.push(f), g += f.value;
        }r && h.sort(r), i && (t.value = g);
      } else i && (t.value = +i.call(e, t, a) || 0);return t;
    }function t(n, r) {
      var u = n.children,
          a = 0;if (u && (o = u.length)) for (var o, c = -1, l = r + 1; ++c < o;) {
        a += t(u[c], l);
      } else i && (a = +i.call(e, n, r) || 0);return i && (n.value = a), a;
    }function e(t) {
      var e = [];return n(t, 0, e), e;
    }var r = Jr,
        u = Br,
        i = $r;return e.sort = function (n) {
      return arguments.length ? (r = n, e) : r;
    }, e.children = function (n) {
      return arguments.length ? (u = n, e) : u;
    }, e.value = function (n) {
      return arguments.length ? (i = n, e) : i;
    }, e.revalue = function (n) {
      return t(n, 0), n;
    }, e;
  }, oa.layout.partition = function () {
    function n(t, e, r, u) {
      var i = t.children;if (t.x = e, t.y = t.depth * u, t.dx = r, t.dy = u, i && (a = i.length)) {
        var a,
            o,
            c,
            l = -1;for (r = t.value ? r / t.value : 0; ++l < a;) {
          n(o = i[l], e, c = o.value * r, u), e += c;
        }
      }
    }function t(n) {
      var e = n.children,
          r = 0;if (e && (u = e.length)) for (var u, i = -1; ++i < u;) {
        r = Math.max(r, t(e[i]));
      }return 1 + r;
    }function e(e, i) {
      var a = r.call(this, e, i);return n(a[0], 0, u[0], u[1] / t(a[0])), a;
    }var r = oa.layout.hierarchy(),
        u = [1, 1];return e.size = function (n) {
      return arguments.length ? (u = n, e) : u;
    }, Zr(e, r);
  }, oa.layout.pie = function () {
    function n(i) {
      var a = i.map(function (e, r) {
        return +t.call(n, e, r);
      }),
          o = +("function" == typeof r ? r.apply(this, arguments) : r),
          c = (("function" == typeof u ? u.apply(this, arguments) : u) - o) / oa.sum(a),
          l = oa.range(i.length);null != e && l.sort(e === Xo ? function (n, t) {
        return a[t] - a[n];
      } : function (n, t) {
        return e(i[n], i[t]);
      });var f = [];return l.forEach(function (n) {
        var t;f[n] = { data: i[n], value: t = a[n], startAngle: o, endAngle: o += t * c };
      }), f;
    }var t = Number,
        e = Xo,
        r = 0,
        u = 2 * La;return n.value = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.sort = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.startAngle = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.endAngle = function (t) {
      return arguments.length ? (u = t, n) : u;
    }, n;
  };var Xo = {};oa.layout.stack = function () {
    function n(o, c) {
      var l = o.map(function (e, r) {
        return t.call(n, e, r);
      }),
          f = l.map(function (t) {
        return t.map(function (t, e) {
          return [i.call(n, t, e), a.call(n, t, e)];
        });
      }),
          s = e.call(n, f, c);l = oa.permute(l, s), f = oa.permute(f, s);var h,
          g,
          p,
          d = r.call(n, f, c),
          m = l.length,
          v = l[0].length;for (g = 0; v > g; ++g) {
        for (u.call(n, l[0][g], p = d[g], f[0][g][1]), h = 1; m > h; ++h) {
          u.call(n, l[h][g], p += f[h - 1][g][1], f[h][g][1]);
        }
      }return o;
    }var t = ft,
        e = nu,
        r = tu,
        u = Qr,
        i = Kr,
        a = Wr;return n.values = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.order = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : Zo.get(t) || nu, n) : e;
    }, n.offset = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : Bo.get(t) || tu, n) : r;
    }, n.x = function (t) {
      return arguments.length ? (i = t, n) : i;
    }, n.y = function (t) {
      return arguments.length ? (a = t, n) : a;
    }, n.out = function (t) {
      return arguments.length ? (u = t, n) : u;
    }, n;
  };var Zo = oa.map({ "inside-out": function insideOut(n) {
      var t,
          e,
          r = n.length,
          u = n.map(eu),
          i = n.map(ru),
          a = oa.range(r).sort(function (n, t) {
        return u[n] - u[t];
      }),
          o = 0,
          c = 0,
          l = [],
          f = [];for (t = 0; r > t; ++t) {
        e = a[t], c > o ? (o += i[e], l.push(e)) : (c += i[e], f.push(e));
      }return f.reverse().concat(l);
    }, reverse: function reverse(n) {
      return oa.range(n.length).reverse();
    }, "default": nu }),
      Bo = oa.map({ silhouette: function silhouette(n) {
      var t,
          e,
          r,
          u = n.length,
          i = n[0].length,
          a = [],
          o = 0,
          c = [];for (e = 0; i > e; ++e) {
        for (t = 0, r = 0; u > t; t++) {
          r += n[t][e][1];
        }r > o && (o = r), a.push(r);
      }for (e = 0; i > e; ++e) {
        c[e] = (o - a[e]) / 2;
      }return c;
    }, wiggle: function wiggle(n) {
      var t,
          e,
          r,
          u,
          i,
          a,
          o,
          c,
          l,
          f = n.length,
          s = n[0],
          h = s.length,
          g = [];for (g[0] = c = l = 0, e = 1; h > e; ++e) {
        for (t = 0, u = 0; f > t; ++t) {
          u += n[t][e][1];
        }for (t = 0, i = 0, o = s[e][0] - s[e - 1][0]; f > t; ++t) {
          for (r = 0, a = (n[t][e][1] - n[t][e - 1][1]) / (2 * o); t > r; ++r) {
            a += (n[r][e][1] - n[r][e - 1][1]) / o;
          }i += a * n[t][e][1];
        }g[e] = c -= u ? i / u * o : 0, l > c && (l = c);
      }for (e = 0; h > e; ++e) {
        g[e] -= l;
      }return g;
    }, expand: function expand(n) {
      var t,
          e,
          r,
          u = n.length,
          i = n[0].length,
          a = 1 / u,
          o = [];for (e = 0; i > e; ++e) {
        for (t = 0, r = 0; u > t; t++) {
          r += n[t][e][1];
        }if (r) for (t = 0; u > t; t++) {
          n[t][e][1] /= r;
        } else for (t = 0; u > t; t++) {
          n[t][e][1] = a;
        }
      }for (e = 0; i > e; ++e) {
        o[e] = 0;
      }return o;
    }, zero: tu });oa.layout.histogram = function () {
    function n(n, i) {
      for (var a, o, c = [], l = n.map(e, this), f = r.call(this, l, i), s = u.call(this, f, l, i), i = -1, h = l.length, g = s.length - 1, p = t ? 1 : 1 / h; ++i < g;) {
        a = c[i] = [], a.dx = s[i + 1] - (a.x = s[i]), a.y = 0;
      }if (g > 0) for (i = -1; ++i < h;) {
        o = l[i], o >= f[0] && o <= f[1] && (a = c[oa.bisect(s, o, 1, g) - 1], a.y += p, a.push(n[i]));
      }return c;
    }var t = !0,
        e = Number,
        r = ou,
        u = iu;return n.value = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.range = function (t) {
      return arguments.length ? (r = lt(t), n) : r;
    }, n.bins = function (t) {
      return arguments.length ? (u = "number" == typeof t ? function (n) {
        return au(n, t);
      } : lt(t), n) : u;
    }, n.frequency = function (e) {
      return arguments.length ? (t = !!e, n) : t;
    }, n;
  }, oa.layout.tree = function () {
    function n(n, u) {
      function i(n, t) {
        var r = n.children,
            u = n._tree;if (r && (a = r.length)) {
          for (var a, c, l, f = r[0], s = f, h = -1; ++h < a;) {
            l = r[h], i(l, c), s = o(l, c, s), c = l;
          }mu(n);var g = .5 * (f._tree.prelim + l._tree.prelim);t ? (u.prelim = t._tree.prelim + e(n, t), u.mod = u.prelim - g) : u.prelim = g;
        } else t && (u.prelim = t._tree.prelim + e(n, t));
      }function a(n, t) {
        n.x = n._tree.prelim + t;var e = n.children;if (e && (r = e.length)) {
          var r,
              u = -1;for (t += n._tree.mod; ++u < r;) {
            a(e[u], t);
          }
        }
      }function o(n, t, r) {
        if (t) {
          for (var u, i = n, a = n, o = t, c = n.parent.children[0], l = i._tree.mod, f = a._tree.mod, s = o._tree.mod, h = c._tree.mod; o = fu(o), i = lu(i), o && i;) {
            c = lu(c), a = fu(a), a._tree.ancestor = n, u = o._tree.prelim + s - i._tree.prelim - l + e(o, i), u > 0 && (vu(yu(o, n, r), n, u), l += u, f += u), s += o._tree.mod, l += i._tree.mod, h += c._tree.mod, f += a._tree.mod;
          }o && !fu(a) && (a._tree.thread = o, a._tree.mod += s - f), i && !lu(c) && (c._tree.thread = i, c._tree.mod += l - h, r = n);
        }return r;
      }var c = t.call(this, n, u),
          l = c[0];du(l, function (n, t) {
        n._tree = { ancestor: n, prelim: 0, mod: 0, change: 0, shift: 0, number: t ? t._tree.number + 1 : 0 };
      }), i(l), a(l, -l._tree.prelim);var f = su(l, gu),
          s = su(l, hu),
          h = su(l, pu),
          g = f.x - e(f, s) / 2,
          p = s.x + e(s, f) / 2,
          d = h.depth || 1;return du(l, function (n) {
        n.x = (n.x - g) / (p - g) * r[0], n.y = n.depth / d * r[1], delete n._tree;
      }), c;
    }var t = oa.layout.hierarchy().sort(null).value(null),
        e = cu,
        r = [1, 1];return n.separation = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.size = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, Zr(n, t);
  }, oa.layout.pack = function () {
    function n(n, u) {
      var i = t.call(this, n, u),
          a = i[0];a.x = 0, a.y = 0, du(a, function (n) {
        n.r = Math.sqrt(n.value);
      }), du(a, wu);var o = r[0],
          c = r[1],
          l = Math.max(2 * a.r / o, 2 * a.r / c);if (e > 0) {
        var f = e * l / 2;du(a, function (n) {
          n.r += f;
        }), du(a, wu), du(a, function (n) {
          n.r -= f;
        }), l = Math.max(2 * a.r / o, 2 * a.r / c);
      }return ku(a, o / 2, c / 2, 1 / l), i;
    }var t = oa.layout.hierarchy().sort(Mu),
        e = 0,
        r = [1, 1];return n.size = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.padding = function (t) {
      return arguments.length ? (e = +t, n) : e;
    }, Zr(n, t);
  }, oa.layout.cluster = function () {
    function n(n, u) {
      var i,
          a = t.call(this, n, u),
          o = a[0],
          c = 0;du(o, function (n) {
        var t = n.children;t && t.length ? (n.x = Nu(t), n.y = qu(t)) : (n.x = i ? c += e(n, i) : 0, n.y = 0, i = n);
      });var l = Tu(o),
          f = Cu(o),
          s = l.x - e(l, f) / 2,
          h = f.x + e(f, l) / 2;return du(o, function (n) {
        n.x = (n.x - s) / (h - s) * r[0], n.y = (1 - (o.y ? n.y / o.y : 1)) * r[1];
      }), a;
    }var t = oa.layout.hierarchy().sort(null).value(null),
        e = cu,
        r = [1, 1];return n.separation = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.size = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, Zr(n, t);
  }, oa.layout.treemap = function () {
    function n(n, t) {
      for (var e, r, u = -1, i = n.length; ++u < i;) {
        r = (e = n[u]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r;
      }
    }function t(e) {
      var i = e.children;if (i && i.length) {
        var a,
            o,
            c,
            l = s(e),
            f = [],
            h = i.slice(),
            p = 1 / 0,
            d = "slice" === g ? l.dx : "dice" === g ? l.dy : "slice-dice" === g ? e.depth & 1 ? l.dy : l.dx : Math.min(l.dx, l.dy);for (n(h, l.dx * l.dy / e.value), f.area = 0; (c = h.length) > 0;) {
          f.push(a = h[c - 1]), f.area += a.area, "squarify" !== g || (o = r(f, d)) <= p ? (h.pop(), p = o) : (f.area -= f.pop().area, u(f, d, l, !1), d = Math.min(l.dx, l.dy), f.length = f.area = 0, p = 1 / 0);
        }f.length && (u(f, d, l, !0), f.length = f.area = 0), i.forEach(t);
      }
    }function e(t) {
      var r = t.children;if (r && r.length) {
        var i,
            a = s(t),
            o = r.slice(),
            c = [];for (n(o, a.dx * a.dy / t.value), c.area = 0; i = o.pop();) {
          c.push(i), c.area += i.area, i.z != null && (u(c, i.z ? a.dx : a.dy, a, !o.length), c.length = c.area = 0);
        }r.forEach(e);
      }
    }function r(n, t) {
      for (var e, r = n.area, u = 0, i = 1 / 0, a = -1, o = n.length; ++a < o;) {
        (e = n[a].area) && (i > e && (i = e), e > u && (u = e));
      }return r *= r, t *= t, r ? Math.max(t * u * p / r, r / (t * i * p)) : 1 / 0;
    }function u(n, t, e, r) {
      var u,
          i = -1,
          a = n.length,
          o = e.x,
          l = e.y,
          f = t ? c(n.area / t) : 0;if (t == e.dx) {
        for ((r || f > e.dy) && (f = e.dy); ++i < a;) {
          u = n[i], u.x = o, u.y = l, u.dy = f, o += u.dx = Math.min(e.x + e.dx - o, f ? c(u.area / f) : 0);
        }u.z = !0, u.dx += e.x + e.dx - o, e.y += f, e.dy -= f;
      } else {
        for ((r || f > e.dx) && (f = e.dx); ++i < a;) {
          u = n[i], u.x = o, u.y = l, u.dx = f, l += u.dy = Math.min(e.y + e.dy - l, f ? c(u.area / f) : 0);
        }u.z = !1, u.dy += e.y + e.dy - l, e.x += f, e.dx -= f;
      }
    }function i(r) {
      var u = a || o(r),
          i = u[0];return i.x = 0, i.y = 0, i.dx = l[0], i.dy = l[1], a && o.revalue(i), n([i], i.dx * i.dy / i.value), (a ? e : t)(i), h && (a = u), u;
    }var a,
        o = oa.layout.hierarchy(),
        c = Math.round,
        l = [1, 1],
        f = null,
        s = zu,
        h = !1,
        g = "squarify",
        p = .5 * (1 + Math.sqrt(5));return i.size = function (n) {
      return arguments.length ? (l = n, i) : l;
    }, i.padding = function (n) {
      function t(t) {
        var e = n.call(i, t, t.depth);return null == e ? zu(t) : Du(t, "number" == typeof e ? [e, e, e, e] : e);
      }function e(t) {
        return Du(t, n);
      }if (!arguments.length) return f;var r;return s = (f = n) == null ? zu : (r = typeof n === "undefined" ? "undefined" : _typeof(n)) == "function" ? t : "number" === r ? (n = [n, n, n, n], e) : e, i;
    }, i.round = function (n) {
      return arguments.length ? (c = n ? Math.round : Number, i) : c != Number;
    }, i.sticky = function (n) {
      return arguments.length ? (h = n, a = null, i) : h;
    }, i.ratio = function (n) {
      return arguments.length ? (p = n, i) : p;
    }, i.mode = function (n) {
      return arguments.length ? (g = n + "", i) : g;
    }, Zr(i, o);
  }, oa.random = { normal: function normal(n, t) {
      var e = arguments.length;return 2 > e && (t = 1), 1 > e && (n = 0), function () {
        var e, r, u;do {
          e = Math.random() * 2 - 1, r = Math.random() * 2 - 1, u = e * e + r * r;
        } while (!u || u > 1);return n + t * e * Math.sqrt(-2 * Math.log(u) / u);
      };
    }, logNormal: function logNormal() {
      var n = oa.random.normal.apply(oa, arguments);return function () {
        return Math.exp(n());
      };
    }, irwinHall: function irwinHall(n) {
      return function () {
        for (var t = 0, e = 0; n > e; e++) {
          t += Math.random();
        }return t / n;
      };
    } }, oa.scale = {}, oa.scale.linear = function () {
    return Ru([0, 1], [0, 1], mr, !1);
  }, oa.scale.log = function () {
    return Xu(oa.scale.linear().domain([0, Math.LN10]), 10, Zu, Bu);
  };var $o = oa.format(".0e");oa.scale.pow = function () {
    return Ku(oa.scale.linear(), 1);
  }, oa.scale.sqrt = function () {
    return oa.scale.pow().exponent(.5);
  }, oa.scale.ordinal = function () {
    return Qu([], { t: "range", a: [[]] });
  }, oa.scale.category10 = function () {
    return oa.scale.ordinal().range(Jo);
  }, oa.scale.category20 = function () {
    return oa.scale.ordinal().range(Go);
  }, oa.scale.category20b = function () {
    return oa.scale.ordinal().range(Ko);
  }, oa.scale.category20c = function () {
    return oa.scale.ordinal().range(Wo);
  };var Jo = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
      Go = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
      Ko = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
      Wo = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];oa.scale.quantile = function () {
    return ni([], []);
  }, oa.scale.quantize = function () {
    return ti(0, 1, [0, 1]);
  }, oa.scale.threshold = function () {
    return ei([.5], [0, 1]);
  }, oa.scale.identity = function () {
    return ri([0, 1]);
  }, oa.svg.arc = function () {
    function n() {
      var n = t.apply(this, arguments),
          i = e.apply(this, arguments),
          a = r.apply(this, arguments) + Qo,
          o = u.apply(this, arguments) + Qo,
          c = (a > o && (c = a, a = o, o = c), o - a),
          l = La > c ? "0" : "1",
          f = Math.cos(a),
          s = Math.sin(a),
          h = Math.cos(o),
          g = Math.sin(o);return c >= nc ? n ? "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "Z" : n ? "M" + i * f + "," + i * s + "A" + i + "," + i + " 0 " + l + ",1 " + i * h + "," + i * g + "L" + n * h + "," + n * g + "A" + n + "," + n + " 0 " + l + ",0 " + n * f + "," + n * s + "Z" : "M" + i * f + "," + i * s + "A" + i + "," + i + " 0 " + l + ",1 " + i * h + "," + i * g + "L0,0" + "Z";
    }var t = ui,
        e = ii,
        r = ai,
        u = oi;return n.innerRadius = function (e) {
      return arguments.length ? (t = lt(e), n) : t;
    }, n.outerRadius = function (t) {
      return arguments.length ? (e = lt(t), n) : e;
    }, n.startAngle = function (t) {
      return arguments.length ? (r = lt(t), n) : r;
    }, n.endAngle = function (t) {
      return arguments.length ? (u = lt(t), n) : u;
    }, n.centroid = function () {
      var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2,
          i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + Qo;return [Math.cos(i) * n, Math.sin(i) * n];
    }, n;
  };var Qo = -La / 2,
      nc = 2 * La - 1e-6;oa.svg.line.radial = function () {
    var n = Ce(ci);return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n;
  }, Fe.reverse = He, He.reverse = Fe, oa.svg.area = function () {
    return li(ft);
  }, oa.svg.area.radial = function () {
    var n = li(ci);return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n;
  }, oa.svg.chord = function () {
    function n(n, o) {
      var c = t(this, i, n, o),
          l = t(this, a, n, o);return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, l) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, l.r, l.p0) + r(l.r, l.p1, l.a1 - l.a0) + u(l.r, l.p1, c.r, c.p0)) + "Z";
    }function t(n, t, e, r) {
      var u = t.call(n, e, r),
          i = o.call(n, u, r),
          a = c.call(n, u, r) + Qo,
          f = l.call(n, u, r) + Qo;return { r: i, a0: a, a1: f, p0: [i * Math.cos(a), i * Math.sin(a)], p1: [i * Math.cos(f), i * Math.sin(f)] };
    }function e(n, t) {
      return n.a0 == t.a0 && n.a1 == t.a1;
    }function r(n, t, e) {
      return "A" + n + "," + n + " 0 " + +(e > La) + ",1 " + t;
    }function u(n, t, e, r) {
      return "Q 0,0 " + r;
    }var i = le,
        a = fe,
        o = fi,
        c = ai,
        l = oi;return n.radius = function (t) {
      return arguments.length ? (o = lt(t), n) : o;
    }, n.source = function (t) {
      return arguments.length ? (i = lt(t), n) : i;
    }, n.target = function (t) {
      return arguments.length ? (a = lt(t), n) : a;
    }, n.startAngle = function (t) {
      return arguments.length ? (c = lt(t), n) : c;
    }, n.endAngle = function (t) {
      return arguments.length ? (l = lt(t), n) : l;
    }, n;
  }, oa.svg.diagonal = function () {
    function n(n, u) {
      var i = t.call(this, n, u),
          a = e.call(this, n, u),
          o = (i.y + a.y) / 2,
          c = [i, { x: i.x, y: o }, { x: a.x, y: o }, a];return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3];
    }var t = le,
        e = fe,
        r = si;return n.source = function (e) {
      return arguments.length ? (t = lt(e), n) : t;
    }, n.target = function (t) {
      return arguments.length ? (e = lt(t), n) : e;
    }, n.projection = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n;
  }, oa.svg.diagonal.radial = function () {
    var n = oa.svg.diagonal(),
        t = si,
        e = n.projection;return n.projection = function (n) {
      return arguments.length ? e(hi(t = n)) : t;
    }, n;
  }, oa.svg.symbol = function () {
    function n(n, r) {
      return (tc.get(t.call(this, n, r)) || di)(e.call(this, n, r));
    }var t = pi,
        e = gi;return n.type = function (e) {
      return arguments.length ? (t = lt(e), n) : t;
    }, n.size = function (t) {
      return arguments.length ? (e = lt(t), n) : e;
    }, n;
  };var tc = oa.map({ circle: di, cross: function cross(n) {
      var t = Math.sqrt(n / 5) / 2;return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z";
    }, diamond: function diamond(n) {
      var t = Math.sqrt(n / (2 * uc)),
          e = t * uc;return "M0," + -t + "L" + e + ",0" + " 0," + t + " " + -e + ",0" + "Z";
    }, square: function square(n) {
      var t = Math.sqrt(n) / 2;return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z";
    }, "triangle-down": function triangleDown(n) {
      var t = Math.sqrt(n / rc),
          e = t * rc / 2;return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z";
    }, "triangle-up": function triangleUp(n) {
      var t = Math.sqrt(n / rc),
          e = t * rc / 2;return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z";
    } });oa.svg.symbolTypes = tc.keys();var ec,
      rc = Math.sqrt(3),
      uc = Math.tan(30 * Ha),
      ic = [],
      ac = 0,
      oc = { ease: Sr, delay: 0, duration: 250 };ic.call = Ea.call, ic.empty = Ea.empty, ic.node = Ea.node, oa.transition = function (n) {
    return arguments.length ? ec ? n.transition() : n : Ta.transition();
  }, oa.transition.prototype = ic, ic.select = function (n) {
    var t,
        e,
        r,
        u = this.id,
        i = [];"function" != typeof n && (n = m(n));for (var a = -1, o = this.length; ++a < o;) {
      i.push(t = []);for (var c = this[a], l = -1, f = c.length; ++l < f;) {
        (r = c[l]) && (e = n.call(r, r.__data__, l)) ? ("__data__" in r && (e.__data__ = r.__data__), Mi(e, l, u, r.__transition__[u]), t.push(e)) : t.push(null);
      }
    }return mi(i, u);
  }, ic.selectAll = function (n) {
    var t,
        e,
        r,
        u,
        i,
        a = this.id,
        o = [];"function" != typeof n && (n = v(n));for (var c = -1, l = this.length; ++c < l;) {
      for (var f = this[c], s = -1, h = f.length; ++s < h;) {
        if (r = f[s]) {
          i = r.__transition__[a], e = n.call(r, r.__data__, s), o.push(t = []);for (var g = -1, p = e.length; ++g < p;) {
            Mi(u = e[g], g, a, i), t.push(u);
          }
        }
      }
    }return mi(o, a);
  }, ic.filter = function (n) {
    var t,
        e,
        r,
        u = [];"function" != typeof n && (n = A(n));for (var i = 0, a = this.length; a > i; i++) {
      u.push(t = []);for (var e = this[i], o = 0, c = e.length; c > o; o++) {
        (r = e[o]) && n.call(r, r.__data__, o) && t.push(r);
      }
    }return mi(u, this.id, this.time).ease(this.ease());
  }, ic.tween = function (n, t) {
    var e = this.id;return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : D(this, null == t ? function (t) {
      t.__transition__[e].tween.remove(n);
    } : function (r) {
      r.__transition__[e].tween.set(n, t);
    });
  }, ic.attr = function (n, t) {
    function e() {
      this.removeAttribute(i);
    }function r() {
      this.removeAttributeNS(i.space, i.local);
    }if (arguments.length < 2) {
      for (t in n) {
        this.attr(t, n[t]);
      }return this;
    }var u = vr(n),
        i = oa.ns.qualify(n);return vi(this, "attr." + n, t, function (n) {
      function t() {
        var t,
            e = this.getAttribute(i);return e !== n && (t = u(e, n), function (n) {
          this.setAttribute(i, t(n));
        });
      }function a() {
        var t,
            e = this.getAttributeNS(i.space, i.local);return e !== n && (t = u(e, n), function (n) {
          this.setAttributeNS(i.space, i.local, t(n));
        });
      }return null == n ? i.local ? r : e : (n += "", i.local ? a : t);
    });
  }, ic.attrTween = function (n, t) {
    function e(n, e) {
      var r = t.call(this, n, e, this.getAttribute(u));return r && function (n) {
        this.setAttribute(u, r(n));
      };
    }function r(n, e) {
      var r = t.call(this, n, e, this.getAttributeNS(u.space, u.local));return r && function (n) {
        this.setAttributeNS(u.space, u.local, r(n));
      };
    }var u = oa.ns.qualify(n);return this.tween("attr." + n, u.local ? r : e);
  }, ic.style = function (n, t, e) {
    function r() {
      this.style.removeProperty(n);
    }var u = arguments.length;if (3 > u) {
      if ("string" != typeof n) {
        2 > u && (t = "");for (e in n) {
          this.style(e, n[e], t);
        }return this;
      }e = "";
    }var i = vr(n);return vi(this, "style." + n, t, function (t) {
      function u() {
        var r,
            u = la.getComputedStyle(this, null).getPropertyValue(n);return u !== t && (r = i(u, t), function (t) {
          this.style.setProperty(n, r(t), e);
        });
      }return null == t ? r : (t += "", u);
    });
  }, ic.styleTween = function (n, t, e) {
    return arguments.length < 3 && (e = ""), this.tween("style." + n, function (r, u) {
      var i = t.call(this, r, u, la.getComputedStyle(this, null).getPropertyValue(n));return i && function (t) {
        this.style.setProperty(n, i(t), e);
      };
    });
  }, ic.text = function (n) {
    return vi(this, "text", n, yi);
  }, ic.remove = function () {
    return this.each("end.transition", function () {
      var n;!this.__transition__ && (n = this.parentNode) && n.removeChild(this);
    });
  }, ic.ease = function (n) {
    var t = this.id;return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = oa.ease.apply(oa, arguments)), D(this, function (e) {
      e.__transition__[t].ease = n;
    }));
  }, ic.delay = function (n) {
    var t = this.id;return D(this, "function" == typeof n ? function (e, r, u) {
      e.__transition__[t].delay = n.call(e, e.__data__, r, u) | 0;
    } : (n |= 0, function (e) {
      e.__transition__[t].delay = n;
    }));
  }, ic.duration = function (n) {
    var t = this.id;return D(this, "function" == typeof n ? function (e, r, u) {
      e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, u) | 0);
    } : (n = Math.max(1, 0 | n), function (e) {
      e.__transition__[t].duration = n;
    }));
  }, ic.each = function (n, t) {
    var e = this.id;if (arguments.length < 2) {
      var r = oc,
          u = ec;ec = e, D(this, function (t, r, u) {
        oc = t.__transition__[e], n.call(t, t.__data__, r, u);
      }), oc = r, ec = u;
    } else D(this, function (r) {
      r.__transition__[e].event.on(n, t);
    });return this;
  }, ic.transition = function () {
    for (var n, t, e, r, u = this.id, i = ++ac, a = [], o = 0, c = this.length; c > o; o++) {
      a.push(n = []);for (var t = this[o], l = 0, f = t.length; f > l; l++) {
        (e = t[l]) && (r = Object.create(e.__transition__[u]), r.delay += r.duration, Mi(e, l, i, r)), n.push(e);
      }
    }return mi(a, i);
  }, oa.svg.axis = function () {
    function n(n) {
      n.each(function () {
        var n,
            s = oa.select(this),
            h = null == l ? e.ticks ? e.ticks.apply(e, c) : e.domain() : l,
            g = null == t ? e.tickFormat ? e.tickFormat.apply(e, c) : String : t,
            p = _i(e, h, f),
            d = s.selectAll(".tick.minor").data(p, String),
            m = d.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6),
            v = oa.transition(d.exit()).style("opacity", 1e-6).remove(),
            y = oa.transition(d).style("opacity", 1),
            M = s.selectAll(".tick.major").data(h, String),
            x = M.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6),
            b = oa.transition(M.exit()).style("opacity", 1e-6).remove(),
            _ = oa.transition(M).style("opacity", 1),
            w = Lu(e),
            S = s.selectAll(".domain").data([0]),
            E = (S.enter().append("path").attr("class", "domain"), oa.transition(S)),
            k = e.copy(),
            A = this.__chart__ || k;this.__chart__ = k, x.append("line"), x.append("text");var q = x.select("line"),
            N = _.select("line"),
            T = M.select("text").text(g),
            C = x.select("text"),
            z = _.select("text");switch (r) {case "bottom":
            n = xi, m.attr("y2", i), y.attr("x2", 0).attr("y2", i), q.attr("y2", u), C.attr("y", Math.max(u, 0) + o), N.attr("x2", 0).attr("y2", u), z.attr("x", 0).attr("y", Math.max(u, 0) + o), T.attr("dy", ".71em").style("text-anchor", "middle"), E.attr("d", "M" + w[0] + "," + a + "V0H" + w[1] + "V" + a);break;case "top":
            n = xi, m.attr("y2", -i), y.attr("x2", 0).attr("y2", -i), q.attr("y2", -u), C.attr("y", -(Math.max(u, 0) + o)), N.attr("x2", 0).attr("y2", -u), z.attr("x", 0).attr("y", -(Math.max(u, 0) + o)), T.attr("dy", "0em").style("text-anchor", "middle"), E.attr("d", "M" + w[0] + "," + -a + "V0H" + w[1] + "V" + -a);break;case "left":
            n = bi, m.attr("x2", -i), y.attr("x2", -i).attr("y2", 0), q.attr("x2", -u), C.attr("x", -(Math.max(u, 0) + o)), N.attr("x2", -u).attr("y2", 0), z.attr("x", -(Math.max(u, 0) + o)).attr("y", 0), T.attr("dy", ".32em").style("text-anchor", "end"), E.attr("d", "M" + -a + "," + w[0] + "H0V" + w[1] + "H" + -a);break;case "right":
            n = bi, m.attr("x2", i), y.attr("x2", i).attr("y2", 0), q.attr("x2", u), C.attr("x", Math.max(u, 0) + o), N.attr("x2", u).attr("y2", 0), z.attr("x", Math.max(u, 0) + o).attr("y", 0), T.attr("dy", ".32em").style("text-anchor", "start"), E.attr("d", "M" + a + "," + w[0] + "H0V" + w[1] + "H" + a);}if (e.ticks) x.call(n, A), _.call(n, k), b.call(n, k), m.call(n, A), y.call(n, k), v.call(n, k);else {
          var D = k.rangeBand() / 2,
              j = function j(n) {
            return k(n) + D;
          };x.call(n, j), _.call(n, j);
        }
      });
    }var t,
        e = oa.scale.linear(),
        r = cc,
        u = 6,
        i = 6,
        a = 6,
        o = 3,
        c = [10],
        l = null,
        f = 0;return n.scale = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.orient = function (t) {
      return arguments.length ? (r = t in lc ? t + "" : cc, n) : r;
    }, n.ticks = function () {
      return arguments.length ? (c = arguments, n) : c;
    }, n.tickValues = function (t) {
      return arguments.length ? (l = t, n) : l;
    }, n.tickFormat = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.tickSize = function (t, e) {
      if (!arguments.length) return u;var r = arguments.length - 1;return u = +t, i = r > 1 ? +e : u, a = r > 0 ? +arguments[r] : u, n;
    }, n.tickPadding = function (t) {
      return arguments.length ? (o = +t, n) : o;
    }, n.tickSubdivide = function (t) {
      return arguments.length ? (f = +t, n) : f;
    }, n;
  };var cc = "bottom",
      lc = { top: 1, right: 1, bottom: 1, left: 1 };oa.svg.brush = function () {
    function n(i) {
      i.each(function () {
        var i,
            a = oa.select(this),
            l = a.selectAll(".background").data([0]),
            s = a.selectAll(".extent").data([0]),
            h = a.selectAll(".resize").data(f, String);a.style("pointer-events", "all").on("mousedown.brush", u).on("touchstart.brush", u), l.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), s.enter().append("rect").attr("class", "extent").style("cursor", "move"), h.enter().append("g").attr("class", function (n) {
          return "resize " + n;
        }).style("cursor", function (n) {
          return fc[n];
        }).append("rect").attr("x", function (n) {
          return (/[ew]$/.test(n) ? -3 : null
          );
        }).attr("y", function (n) {
          return (/^[ns]/.test(n) ? -3 : null
          );
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), h.style("display", n.empty() ? "none" : null), h.exit().remove(), o && (i = Lu(o), l.attr("x", i[0]).attr("width", i[1] - i[0]), e(a)), c && (i = Lu(c), l.attr("y", i[0]).attr("height", i[1] - i[0]), r(a)), t(a);
      });
    }function t(n) {
      n.selectAll(".resize").attr("transform", function (n) {
        return "translate(" + h[+/e$/.test(n)][0] + "," + h[+/^s/.test(n)][1] + ")";
      });
    }function e(n) {
      n.select(".extent").attr("x", h[0][0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", h[1][0] - h[0][0]);
    }function r(n) {
      n.select(".extent").attr("y", h[0][1]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1][1] - h[0][1]);
    }function u() {
      function u() {
        var n = oa.event.changedTouches;return n ? oa.touches(y, n)[0] : oa.mouse(y);
      }function f() {
        oa.event.keyCode == 32 && (E || (m = null, k[0] -= h[1][0], k[1] -= h[1][1], E = 2), l());
      }function s() {
        oa.event.keyCode == 32 && 2 == E && (k[0] += h[1][0], k[1] += h[1][1], E = 0, l());
      }function g() {
        var n = u(),
            i = !1;v && (n[0] += v[0], n[1] += v[1]), E || (oa.event.altKey ? (m || (m = [(h[0][0] + h[1][0]) / 2, (h[0][1] + h[1][1]) / 2]), k[0] = h[+(n[0] < m[0])][0], k[1] = h[+(n[1] < m[1])][1]) : m = null), w && p(n, o, 0) && (e(b), i = !0), S && p(n, c, 1) && (r(b), i = !0), i && (t(b), x({ type: "brush", mode: E ? "move" : "resize" }));
      }function p(n, t, e) {
        var r,
            u,
            a = Lu(t),
            o = a[0],
            c = a[1],
            l = k[e],
            f = h[1][e] - h[0][e];return E && (o -= l, c -= f + l), r = Math.max(o, Math.min(c, n[e])), E ? u = (r += l) + f : (m && (l = Math.max(o, Math.min(c, 2 * m[e] - r))), r > l ? (u = r, r = l) : u = l), h[0][e] !== r || h[1][e] !== u ? (i = null, h[0][e] = r, h[1][e] = u, !0) : void 0;
      }function d() {
        g(), b.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), oa.select("body").style("cursor", null), A.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), x({ type: "brushend" }), l();
      }var m,
          v,
          y = this,
          M = oa.select(oa.event.target),
          x = a.of(y, arguments),
          b = oa.select(y),
          _ = M.datum(),
          w = !/^(n|s)$/.test(_) && o,
          S = !/^(e|w)$/.test(_) && c,
          E = M.classed("extent"),
          k = u(),
          A = oa.select(la).on("mousemove.brush", g).on("mouseup.brush", d).on("touchmove.brush", g).on("touchend.brush", d).on("keydown.brush", f).on("keyup.brush", s);if (E) k[0] = h[0][0] - k[0], k[1] = h[0][1] - k[1];else if (_) {
        var q = +/w$/.test(_),
            N = +/^n/.test(_);v = [h[1 - q][0] - k[0], h[1 - N][1] - k[1]], k[0] = h[q][0], k[1] = h[N][1];
      } else oa.event.altKey && (m = k.slice());b.style("pointer-events", "none").selectAll(".resize").style("display", null), oa.select("body").style("cursor", M.style("cursor")), x({ type: "brushstart" }), g(), l();
    }var i,
        a = s(n, "brushstart", "brush", "brushend"),
        o = null,
        c = null,
        f = sc[0],
        h = [[0, 0], [0, 0]];return n.x = function (t) {
      return arguments.length ? (o = t, f = sc[!o << 1 | !c], n) : o;
    }, n.y = function (t) {
      return arguments.length ? (c = t, f = sc[!o << 1 | !c], n) : c;
    }, n.extent = function (t) {
      var e, r, u, a, l;return arguments.length ? (i = [[0, 0], [0, 0]], o && (e = t[0], r = t[1], c && (e = e[0], r = r[0]), i[0][0] = e, i[1][0] = r, o.invert && (e = o(e), r = o(r)), e > r && (l = e, e = r, r = l), h[0][0] = 0 | e, h[1][0] = 0 | r), c && (u = t[0], a = t[1], o && (u = u[1], a = a[1]), i[0][1] = u, i[1][1] = a, c.invert && (u = c(u), a = c(a)), u > a && (l = u, u = a, a = l), h[0][1] = 0 | u, h[1][1] = 0 | a), n) : (t = i || h, o && (e = t[0][0], r = t[1][0], i || (e = h[0][0], r = h[1][0], o.invert && (e = o.invert(e), r = o.invert(r)), e > r && (l = e, e = r, r = l))), c && (u = t[0][1], a = t[1][1], i || (u = h[0][1], a = h[1][1], c.invert && (u = c.invert(u), a = c.invert(a)), u > a && (l = u, u = a, a = l))), o && c ? [[e, u], [r, a]] : o ? [e, r] : c && [u, a]);
    }, n.clear = function () {
      return i = null, h[0][0] = h[0][1] = h[1][0] = h[1][1] = 0, n;
    }, n.empty = function () {
      return o && h[0][0] === h[1][0] || c && h[0][1] === h[1][1];
    }, oa.rebind(n, a, "on");
  };var fc = { n: "ns-resize", e: "ew-resize", s: "ns-resize", w: "ew-resize", nw: "nwse-resize", ne: "nesw-resize", se: "nwse-resize", sw: "nesw-resize" },
      sc = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []];oa.time = {};var hc = Date,
      gc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];wi.prototype = { getDate: function getDate() {
      return this._.getUTCDate();
    }, getDay: function getDay() {
      return this._.getUTCDay();
    }, getFullYear: function getFullYear() {
      return this._.getUTCFullYear();
    }, getHours: function getHours() {
      return this._.getUTCHours();
    }, getMilliseconds: function getMilliseconds() {
      return this._.getUTCMilliseconds();
    }, getMinutes: function getMinutes() {
      return this._.getUTCMinutes();
    }, getMonth: function getMonth() {
      return this._.getUTCMonth();
    }, getSeconds: function getSeconds() {
      return this._.getUTCSeconds();
    }, getTime: function getTime() {
      return this._.getTime();
    }, getTimezoneOffset: function getTimezoneOffset() {
      return 0;
    }, valueOf: function valueOf() {
      return this._.valueOf();
    }, setDate: function setDate() {
      pc.setUTCDate.apply(this._, arguments);
    }, setDay: function setDay() {
      pc.setUTCDay.apply(this._, arguments);
    }, setFullYear: function setFullYear() {
      pc.setUTCFullYear.apply(this._, arguments);
    }, setHours: function setHours() {
      pc.setUTCHours.apply(this._, arguments);
    }, setMilliseconds: function setMilliseconds() {
      pc.setUTCMilliseconds.apply(this._, arguments);
    }, setMinutes: function setMinutes() {
      pc.setUTCMinutes.apply(this._, arguments);
    }, setMonth: function setMonth() {
      pc.setUTCMonth.apply(this._, arguments);
    }, setSeconds: function setSeconds() {
      pc.setUTCSeconds.apply(this._, arguments);
    }, setTime: function setTime() {
      pc.setTime.apply(this._, arguments);
    } };var pc = Date.prototype,
      dc = "%a %b %e %X %Y",
      mc = "%m/%d/%Y",
      vc = "%H:%M:%S",
      yc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      Mc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      xc = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      bc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];oa.time.year = Si(function (n) {
    return n = oa.time.day(n), n.setMonth(0, 1), n;
  }, function (n, t) {
    n.setFullYear(n.getFullYear() + t);
  }, function (n) {
    return n.getFullYear();
  }), oa.time.years = oa.time.year.range, oa.time.years.utc = oa.time.year.utc.range, oa.time.day = Si(function (n) {
    var t = new hc(1970, 0);return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t;
  }, function (n, t) {
    n.setDate(n.getDate() + t);
  }, function (n) {
    return n.getDate() - 1;
  }), oa.time.days = oa.time.day.range, oa.time.days.utc = oa.time.day.utc.range, oa.time.dayOfYear = function (n) {
    var t = oa.time.year(n);return Math.floor((n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * 6e4) / 864e5);
  }, gc.forEach(function (n, t) {
    n = n.toLowerCase(), t = 7 - t;var e = oa.time[n] = Si(function (n) {
      return (n = oa.time.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n;
    }, function (n, t) {
      n.setDate(n.getDate() + Math.floor(t) * 7);
    }, function (n) {
      var e = oa.time.year(n).getDay();return Math.floor((oa.time.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t);
    });oa.time[n + "s"] = e.range, oa.time[n + "s"].utc = e.utc.range, oa.time[n + "OfYear"] = function (n) {
      var e = oa.time.year(n).getDay();return Math.floor((oa.time.dayOfYear(n) + (e + t) % 7) / 7);
    };
  }), oa.time.week = oa.time.sunday, oa.time.weeks = oa.time.sunday.range, oa.time.weeks.utc = oa.time.sunday.utc.range, oa.time.weekOfYear = oa.time.sundayOfYear, oa.time.format = function (n) {
    function t(t) {
      for (var r, u, i, a = [], o = -1, c = 0; ++o < e;) {
        n.charCodeAt(o) === 37 && (a.push(n.substring(c, o)), (u = qc[r = n.charAt(++o)]) != null && (r = n.charAt(++o)), (i = Nc[r]) && (r = i(t, null == u ? "e" === r ? " " : "0" : u)), a.push(r), c = o + 1);
      }return a.push(n.substring(c, o)), a.join("");
    }var e = n.length;return t.parse = function (t) {
      var e = { y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 },
          r = ki(e, n, t, 0);if (r != t.length) return null;"p" in e && (e.H = e.H % 12 + e.p * 12);var u = new hc();return u.setFullYear(e.y, e.m, e.d), u.setHours(e.H, e.M, e.S, e.L), u;
    }, t.toString = function () {
      return n;
    }, t;
  };var _c = Ai(yc),
      wc = Ai(Mc),
      Sc = Ai(xc),
      Ec = qi(xc),
      kc = Ai(bc),
      Ac = qi(bc),
      qc = { "-": "", _: " ", 0: "0" },
      Nc = { a: function a(n) {
      return Mc[n.getDay()];
    }, A: function A(n) {
      return yc[n.getDay()];
    }, b: function b(n) {
      return bc[n.getMonth()];
    }, B: function B(n) {
      return xc[n.getMonth()];
    }, c: oa.time.format(dc), d: function d(n, t) {
      return Ni(n.getDate(), t, 2);
    }, e: function e(n, t) {
      return Ni(n.getDate(), t, 2);
    }, H: function H(n, t) {
      return Ni(n.getHours(), t, 2);
    }, I: function I(n, t) {
      return Ni(n.getHours() % 12 || 12, t, 2);
    }, j: function j(n, t) {
      return Ni(1 + oa.time.dayOfYear(n), t, 3);
    }, L: function L(n, t) {
      return Ni(n.getMilliseconds(), t, 3);
    }, m: function m(n, t) {
      return Ni(n.getMonth() + 1, t, 2);
    }, M: function M(n, t) {
      return Ni(n.getMinutes(), t, 2);
    }, p: function p(n) {
      return n.getHours() >= 12 ? "PM" : "AM";
    }, S: function S(n, t) {
      return Ni(n.getSeconds(), t, 2);
    }, U: function U(n, t) {
      return Ni(oa.time.sundayOfYear(n), t, 2);
    }, w: function w(n) {
      return n.getDay();
    }, W: function W(n, t) {
      return Ni(oa.time.mondayOfYear(n), t, 2);
    }, x: oa.time.format(mc), X: oa.time.format(vc), y: function y(n, t) {
      return Ni(n.getFullYear() % 100, t, 2);
    }, Y: function Y(n, t) {
      return Ni(n.getFullYear() % 1e4, t, 4);
    }, Z: Bi, "%": function _() {
      return "%";
    } },
      Tc = { a: Ti, A: Ci, b: zi, B: Di, c: ji, d: Yi, e: Yi, H: Ui, I: Ui, L: Xi, m: Oi, M: Ii, p: Zi, S: Vi, x: Li, X: Fi, y: Pi, Y: Hi },
      Cc = /^\s*\d+/,
      zc = oa.map({ am: 0, pm: 1 });oa.time.format.utc = function (n) {
    function t(n) {
      try {
        hc = wi;var t = new hc();return t._ = n, e(t);
      } finally {
        hc = Date;
      }
    }var e = oa.time.format(n);return t.parse = function (n) {
      try {
        hc = wi;var t = e.parse(n);return t && t._;
      } finally {
        hc = Date;
      }
    }, t.toString = e.toString, t;
  };var Dc = oa.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");oa.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? $i : Dc, $i.parse = function (n) {
    var t = new Date(n);return isNaN(t) ? null : t;
  }, $i.toString = Dc.toString, oa.time.second = Si(function (n) {
    return new hc(Math.floor(n / 1e3) * 1e3);
  }, function (n, t) {
    n.setTime(n.getTime() + Math.floor(t) * 1e3);
  }, function (n) {
    return n.getSeconds();
  }), oa.time.seconds = oa.time.second.range, oa.time.seconds.utc = oa.time.second.utc.range, oa.time.minute = Si(function (n) {
    return new hc(Math.floor(n / 6e4) * 6e4);
  }, function (n, t) {
    n.setTime(n.getTime() + Math.floor(t) * 6e4);
  }, function (n) {
    return n.getMinutes();
  }), oa.time.minutes = oa.time.minute.range, oa.time.minutes.utc = oa.time.minute.utc.range, oa.time.hour = Si(function (n) {
    var t = n.getTimezoneOffset() / 60;return new hc((Math.floor(n / 36e5 - t) + t) * 36e5);
  }, function (n, t) {
    n.setTime(n.getTime() + Math.floor(t) * 36e5);
  }, function (n) {
    return n.getHours();
  }), oa.time.hours = oa.time.hour.range, oa.time.hours.utc = oa.time.hour.utc.range, oa.time.month = Si(function (n) {
    return n = oa.time.day(n), n.setDate(1), n;
  }, function (n, t) {
    n.setMonth(n.getMonth() + t);
  }, function (n) {
    return n.getMonth();
  }), oa.time.months = oa.time.month.range, oa.time.months.utc = oa.time.month.utc.range;var jc = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
      Lc = [[oa.time.second, 1], [oa.time.second, 5], [oa.time.second, 15], [oa.time.second, 30], [oa.time.minute, 1], [oa.time.minute, 5], [oa.time.minute, 15], [oa.time.minute, 30], [oa.time.hour, 1], [oa.time.hour, 3], [oa.time.hour, 6], [oa.time.hour, 12], [oa.time.day, 1], [oa.time.day, 2], [oa.time.week, 1], [oa.time.month, 1], [oa.time.month, 3], [oa.time.year, 1]],
      Fc = [[oa.time.format("%Y"), Dt], [oa.time.format("%B"), function (n) {
    return n.getMonth();
  }], [oa.time.format("%b %d"), function (n) {
    return n.getDate() != 1;
  }], [oa.time.format("%a %d"), function (n) {
    return n.getDay() && n.getDate() != 1;
  }], [oa.time.format("%I %p"), function (n) {
    return n.getHours();
  }], [oa.time.format("%I:%M"), function (n) {
    return n.getMinutes();
  }], [oa.time.format(":%S"), function (n) {
    return n.getSeconds();
  }], [oa.time.format(".%L"), function (n) {
    return n.getMilliseconds();
  }]],
      Hc = oa.scale.linear(),
      Pc = Wi(Fc);Lc.year = function (n, t) {
    return Hc.domain(n.map(na)).ticks(t).map(Qi);
  }, oa.time.scale = function () {
    return Ji(oa.scale.linear(), Lc, Pc);
  };var Rc = Lc.map(function (n) {
    return [n[0].utc, n[1]];
  }),
      Oc = [[oa.time.format.utc("%Y"), Dt], [oa.time.format.utc("%B"), function (n) {
    return n.getUTCMonth();
  }], [oa.time.format.utc("%b %d"), function (n) {
    return n.getUTCDate() != 1;
  }], [oa.time.format.utc("%a %d"), function (n) {
    return n.getUTCDay() && n.getUTCDate() != 1;
  }], [oa.time.format.utc("%I %p"), function (n) {
    return n.getUTCHours();
  }], [oa.time.format.utc("%I:%M"), function (n) {
    return n.getUTCMinutes();
  }], [oa.time.format.utc(":%S"), function (n) {
    return n.getUTCSeconds();
  }], [oa.time.format.utc(".%L"), function (n) {
    return n.getUTCMilliseconds();
  }]],
      Yc = Wi(Oc);return Rc.year = function (n, t) {
    return Hc.domain(n.map(ea)).ticks(t).map(ta);
  }, oa.time.scale.utc = function () {
    return Ji(oa.scale.linear(), Rc, Yc);
  }, oa.text = function () {
    return oa.xhr.apply(oa, arguments).response(ra);
  }, oa.json = function (n, t) {
    return oa.xhr(n, "application/json", t).response(ua);
  }, oa.html = function (n, t) {
    return oa.xhr(n, "text/html", t).response(ia);
  }, oa.xml = function () {
    return oa.xhr.apply(oa, arguments).response(aa);
  }, oa;
}();

/*** EXPORTS FROM exports-loader ***/
module.exports = d3;

/***/ }),

/***/ "./common/lib/xmodule/xmodule/assets/word_cloud/src/js/word_cloud_main.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__ = __webpack_require__("./node_modules/edx-ui-toolkit/src/js/utils/html-utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_min__ = __webpack_require__("./common/lib/xmodule/xmodule/assets/word_cloud/src/js/d3.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_layout_cloud__ = __webpack_require__("./common/lib/xmodule/xmodule/assets/word_cloud/src/js/d3.layout.cloud.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_layout_cloud___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_layout_cloud__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gettext__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gettext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_gettext__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @file The main module definition for Word Cloud XModule.
*
*  Defines a constructor function which operates on a DOM element. Either
*  show the user text inputs so he can enter words, or render his selected
*  words along with the word cloud representing the top words.
*
*  @module WordCloudMain
*
*  @exports WordCloudMain
*
*  @external $
*/






function generateUniqueId(wordCloudId, counter) {
  return '_wc_' + wordCloudId + '_' + counter;
}

/**
* @function WordCloudMain
*
* This function will process all the attributes from the DOM element passed, taking all of
* the configuration attributes. It will either then attach a callback handler for the click
* event on the button in the case when the user needs to enter words, or it will call the
* appropriate mehtod to generate and render a word cloud from user's enetered words along with
* all of the other words.
*
* @constructor
*
* @param {jQuery} el DOM element where the word cloud will be processed and created.
*/

var WordCloudMain = function () {
  function WordCloudMain(el) {
    var _this = this;

    _classCallCheck(this, WordCloudMain);

    this.wordCloudEl = $(el).find('.word_cloud');

    // Get the URL to which we will post the users words.
    this.ajax_url = this.wordCloudEl.data('ajax-url');

    // Dimensions of the box where the word cloud will be drawn.
    this.width = 635;
    this.height = 635;

    // Hide WordCloud container before Ajax request done
    this.wordCloudEl.hide();

    // Retriveing response from the server as an AJAX request. Attach a callback that will
    // be fired on server's response.
    $.postWithPrefix(this.ajax_url + '/get_state', null, function (response) {
      if (response.status !== 'success') {
        return;
      }

      _this.configJson = response;
    }).done(function () {
      // Show WordCloud container after Ajax request done
      _this.wordCloudEl.show();

      if (_this.configJson && _this.configJson.submitted) {
        _this.showWordCloud(_this.configJson);
      }
    });

    $(el).find('.save').on('click', function () {
      _this.submitAnswer();
    });
  }

  /**
  * @function submitAnswer
  *
  * Callback to be executed when the user eneter his words. It will send user entries to the
  * server, and upon receiving correct response, will call the function to generate the
  * word cloud.
  */


  _createClass(WordCloudMain, [{
    key: 'submitAnswer',
    value: function submitAnswer() {
      var _this2 = this;

      var data = { student_words: [] };

      // Populate the data to be sent to the server with user's words.
      this.wordCloudEl.find('input.input-cloud').each(function (index, value) {
        data.student_words.push($(value).val());
      });

      // Send the data to the server as an AJAX request. Attach a callback that will
      // be fired on server's response.
      $.postWithPrefix(this.ajax_url + '/submit', $.param(data), function (response) {
        if (response.status !== 'success') {
          return;
        }

        _this2.showWordCloud(response);
      });
    }

    /**
    * @function showWordCloud
    *
    * @param {object} response The response from the server that contains the user's entered words
    * along with all of the top words.
    *
    * This function will set up everything for d3 and launch the draw method. Among other things,
    * iw will determine maximum word size.
    */

  }, {
    key: 'showWordCloud',
    value: function showWordCloud(response) {
      var _this3 = this;

      var words = response.top_words;
      var maxSize = 0;
      var minSize = 10000;
      var scaleFactor = 1;
      var maxFontSize = 200;
      var minFontSize = 16;

      this.wordCloudEl.find('.input_cloud_section').hide();

      // Find the word with the maximum percentage. I.e. the most popular word.
      $.each(words, function (index, word) {
        if (word.size > maxSize) {
          maxSize = word.size;
        }
        if (word.size < minSize) {
          minSize = word.size;
        }
      });

      // Find the longest word, and calculate the scale appropriately. This is
      // required so that even long words fit into the drawing area.
      //
      // This is a fix for: if the word is very long and/or big, it is discarded by
      // for unknown reason.
      $.each(words, function (index, word) {
        var tempScaleFactor = 1.0;
        var size = word.size / maxSize * maxFontSize;

        if (size * 0.7 * word.text.length > _this3.width) {
          tempScaleFactor = _this3.width / word.text.length / 0.7 / size;
        }

        if (scaleFactor > tempScaleFactor) {
          scaleFactor = tempScaleFactor;
        }
      });

      // Update the maximum font size based on the longest word.
      maxFontSize *= scaleFactor;

      // Generate the word cloud.
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_layout_cloud__["cloud"])().size([this.width, this.height]).words(words).rotate(function () {
        return Math.floor(Math.random() * 2) * 90;
      }).font('Impact').fontSize(function (d) {
        var size = d.size / maxSize * maxFontSize;

        size = size >= minFontSize ? size : minFontSize;

        return size;
      })
      // Draw the word cloud.
      .on('end', function (wds, bounds) {
        return _this3.drawWordCloud(response, wds, bounds);
      }).start();
    }

    /**
    * @function drawWordCloud
    *
    * This function will be called when d3 has finished initing the state for our word cloud,
    * and it is ready to hand off the process to the drawing routine. Basically set up everything
    * necessary for the actual drwing of the words.
    *
    * @param {object} response The response from the server that contains the user's entered words
    * along with all of the top words.
    *
    * @param {array} words An array of objects. Each object must have two properties. One property
    * is 'text' (the actual word), and the other property is 'size' which represents the number that the
    * word was enetered by the students.
    *
    * @param {array} bounds An array of two objects. First object is the top-left coordinates of the bounding
    * box where all of the words fir, second object is the bottom-right coordinates of the bounding box. Each
    * coordinate object contains two properties: 'x', and 'y'.
    */

  }, {
    key: 'drawWordCloud',
    value: function drawWordCloud(response, words, bounds) {
      var _this4 = this;

      // Color words in different colors.
      var fill = __WEBPACK_IMPORTED_MODULE_1_d3_min___default.a.scale.category20();

      // Will be populated by words the user enetered.
      var studentWordsKeys = [];

      // By default we do not scale.
      var scale = 1;

      // Caсhing of DOM element
      var cloudSectionEl = this.wordCloudEl.find('.result_cloud_section');

      // Iterator for word cloud count for uniqueness
      var wcCount = 0;

      // If bounding rectangle is given, scale based on the bounding box of all the words.
      if (bounds) {
        scale = 0.5 * Math.min(this.width / Math.abs(bounds[1].x - this.width / 2), this.width / Math.abs(bounds[0].x - this.width / 2), this.height / Math.abs(bounds[1].y - this.height / 2), this.height / Math.abs(bounds[0].y - this.height / 2));
      }

      $.each(response.student_words, function (word, stat) {
        var percent = response.display_student_percents ? ' ' + Math.round(100 * (stat / response.total_count)) + '%' : '';

        studentWordsKeys.push(__WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["interpolateHtml"]('{listStart}{startTag}{word}{endTag}{percent}{listEnd}', {
          listStart: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('<li>'),
          startTag: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('<strong>'),
          word: word,
          endTag: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('</strong>'),
          percent: percent,
          listEnd: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('</li>')
        }).toString());
      });

      // Comma separated string of user enetered words.
      var studentWordsStr = studentWordsKeys.join('');

      cloudSectionEl.addClass('active');

      __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["setHtml"](cloudSectionEl.find('.your_words'), __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"](studentWordsStr));

      __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["setHtml"](cloudSectionEl.find('.your_words').end().find('.total_num_words'), __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["interpolateHtml"](__WEBPACK_IMPORTED_MODULE_3_gettext___default()('{start_strong}{total}{end_strong} words submitted in total.'), {
        start_strong: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('<strong>'),
        end_strong: __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["HTML"]('</strong>'),
        total: response.total_count
      }));

      $(cloudSectionEl.attr('id') + ' .word_cloud').empty();

      // Actual drawing of word cloud.
      var groupEl = __WEBPACK_IMPORTED_MODULE_1_d3_min___default.a.select('#' + cloudSectionEl.attr('id') + ' .word_cloud').append('svg').attr('width', this.width).attr('height', this.height).append('g').attr('transform', 'translate(' + 0.5 * this.width + ',' + 0.5 * this.height + ')').selectAll('text').data(words).enter().append('g').attr('data-id', function () {
        wcCount += 1;
        return wcCount;
      }).attr('aria-describedby', function () {
        return __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["interpolateHtml"](__WEBPACK_IMPORTED_MODULE_3_gettext___default()('text_word_{uniqueId} title_word_{uniqueId}'), {
          uniqueId: generateUniqueId(cloudSectionEl.attr('id'), $(_this4).data('id'))
        });
      });

      groupEl.append('title').attr('id', function () {
        return __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["interpolateHtml"](__WEBPACK_IMPORTED_MODULE_3_gettext___default()('title_word_{uniqueId}'), {
          uniqueId: generateUniqueId(cloudSectionEl.attr('id'), $(_this4).parent().data('id'))
        });
      }).text(function (d) {
        var res = '';

        $.each(response.top_words, function (index, value) {
          if (value.text === d.text) {
            res = value.percent + '%';
          }
        });

        return res;
      });

      groupEl.append('text').attr('id', function () {
        return __WEBPACK_IMPORTED_MODULE_0_edx_ui_toolkit_js_utils_html_utils__["interpolateHtml"](__WEBPACK_IMPORTED_MODULE_3_gettext___default()('text_word_{uniqueId}'), {
          uniqueId: generateUniqueId(cloudSectionEl.attr('id'), $(_this4).parent().data('id'))
        });
      }).style('font-size', function (d) {
        return d.size + 'px';
      }).style('font-family', 'Impact').style('fill', function (d, i) {
        return fill(i);
      }).attr('text-anchor', 'middle').attr('transform', function (d) {
        return 'translate(' + d.x + ', ' + d.y + ')rotate(' + d.rotate + ')scale(' + scale + ')';
      }).text(function (d) {
        return d.text;
      });
    }
  }]);

  return WordCloudMain;
}();

/* harmony default export */ __webpack_exports__["default"] = (WordCloudMain);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/xmodule/modules/js/001-ce60a84636ea45ab98f1d6e5bfc70965.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
(function () {

  var WordCloudMain = __webpack_require__("./common/lib/xmodule/xmodule/assets/word_cloud/src/js/word_cloud_main.js");

  window.WordCloud = WordCloudMain.default;
}).call(window);

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

(function() { module.exports = window["canvas"]; }());

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./common/static/xmodule/modules/js/000-58032517f54c5c1a704a908d850cbe64.js");
module.exports = __webpack_require__("./common/static/xmodule/modules/js/001-ce60a84636ea45ab98f1d6e5bfc70965.js");


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

(function() { module.exports = window["gettext"]; }());

/***/ })

},[20])));
//# sourceMappingURL=WordCloudBlockPreview.js.map