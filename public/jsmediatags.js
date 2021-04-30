var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
    ? Object.defineProperty
    : function (v, h, p) {
        v != Array.prototype && v != Object.prototype && (v[h] = p.value);
      };
$jscomp.getGlobal = function (v) {
  return 'undefined' != typeof window && window === v
    ? v
    : 'undefined' != typeof global && null != global
    ? global
    : v;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (v, h, p, n) {
  if (h) {
    p = $jscomp.global;
    v = v.split('.');
    for (n = 0; n < v.length - 1; n++) {
      var m = v[n];
      m in p || (p[m] = {});
      p = p[m];
    }
    v = v[v.length - 1];
    n = p[v];
    h = h(n);
    h != n &&
      null != h &&
      $jscomp.defineProperty(p, v, {
        configurable: !0,
        writable: !0,
        value: h,
      });
  }
};
$jscomp.polyfill(
  'Object.setPrototypeOf',
  function (v) {
    return v
      ? v
      : 'object' != typeof ''.__proto__
      ? null
      : function (h, p) {
          h.__proto__ = p;
          if (h.__proto__ !== p) throw new TypeError(h + ' is not extensible');
          return h;
        };
  },
  'es6',
  'es5',
);
(function (v) {
  'object' === typeof exports && 'undefined' !== typeof module
    ? (module.exports = v())
    : 'function' === typeof define && define.amd
    ? define([], v)
    : (('undefined' !== typeof window
        ? window
        : 'undefined' !== typeof global
        ? global
        : 'undefined' !== typeof self
        ? self
        : this
      ).jsmediatags = v());
})(function () {
  return (function h(p, n, m) {
    function q(c, b) {
      if (!n[c]) {
        if (!p[c]) {
          var g = 'function' == typeof require && require;
          if (!b && g) return g(c, !0);
          if (t) return t(c, !0);
          b = Error("Cannot find module '" + c + "'");
          throw ((b.code = 'MODULE_NOT_FOUND'), b);
        }
        b = n[c] = { exports: {} };
        p[c][0].call(
          b.exports,
          function (b) {
            var k = p[c][1][b];
            return q(k ? k : b);
          },
          b,
          b.exports,
          h,
          p,
          n,
          m,
        );
      }
      return n[c].exports;
    }
    for (
      var t = 'function' == typeof require && require, f = 0;
      f < m.length;
      f++
    )
      q(m[f]);
    return q;
  })(
    {
      1: [function (h, p, n) {}, {}],
      2: [
        function (h, p, n) {
          p.exports = XMLHttpRequest;
        },
        {},
      ],
      3: [
        function (h, p, n) {
          function m(b) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(b);
          }
          function q(b, a) {
            for (var e = 0; e < a.length; e++) {
              var d = a[e];
              d.enumerable = d.enumerable || !1;
              d.configurable = !0;
              'value' in d && (d.writable = !0);
              Object.defineProperty(b, d.key, d);
            }
          }
          function t(b, a, e) {
            a && q(b.prototype, a);
            e && q(b, e);
            return b;
          }
          function f(b) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(b);
          }
          function c(b) {
            if (void 0 === b)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return b;
          }
          function b(b, a) {
            if ('function' !== typeof a && null !== a)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            b.prototype = Object.create(a && a.prototype, {
              constructor: { value: b, writable: !0, configurable: !0 },
            });
            a && g(b, a);
          }
          function g(b, a) {
            g =
              Object.setPrototypeOf ||
              function (a, d) {
                a.__proto__ = d;
                return a;
              };
            return g(b, a);
          }
          function k(b, a, e) {
            a in b
              ? Object.defineProperty(b, a, {
                  value: e,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (b[a] = e);
            return b;
          }
          h = (function (g) {
            function a(e) {
              if (!(this instanceof a))
                throw new TypeError('Cannot call a class as a function');
              var d = f(a).call(this);
              d =
                !d || ('object' !== m(d) && 'function' !== typeof d)
                  ? c(this)
                  : d;
              k(c(d), '_array', void 0);
              k(c(d), '_size', void 0);
              d._array = e;
              d._size = e.length;
              d._isInitialized = !0;
              return d;
            }
            b(a, g);
            t(
              a,
              [
                {
                  key: 'init',
                  value: function (a) {
                    setTimeout(a.onSuccess, 0);
                  },
                },
                {
                  key: 'loadRange',
                  value: function (a, d) {
                    setTimeout(d.onSuccess, 0);
                  },
                },
                {
                  key: 'getByteAt',
                  value: function (a) {
                    if (a >= this._array.length)
                      throw Error('Offset ' + a + " hasn't been loaded yet.");
                    return this._array[a];
                  },
                },
              ],
              [
                {
                  key: 'canReadFile',
                  value: function (a) {
                    return (
                      Array.isArray(a) ||
                      ('function' === typeof Buffer && Buffer.isBuffer(a))
                    );
                  },
                },
              ],
            );
            return a;
          })(h('./MediaFileReader'));
          p.exports = h;
        },
        { './MediaFileReader': 11 },
      ],
      4: [
        function (h, p, n) {
          function m(a) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(a);
          }
          function q(a, e) {
            for (var d = 0; d < e.length; d++) {
              var l = e[d];
              l.enumerable = l.enumerable || !1;
              l.configurable = !0;
              'value' in l && (l.writable = !0);
              Object.defineProperty(a, l.key, l);
            }
          }
          function t(a, e, d) {
            e && q(a.prototype, e);
            d && q(a, d);
            return a;
          }
          function f(a) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(a);
          }
          function c(a) {
            if (void 0 === a)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return a;
          }
          function b(a, e) {
            if ('function' !== typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            a.prototype = Object.create(e && e.prototype, {
              constructor: { value: a, writable: !0, configurable: !0 },
            });
            e && g(a, e);
          }
          function g(a, e) {
            g =
              Object.setPrototypeOf ||
              function (d, a) {
                d.__proto__ = a;
                return d;
              };
            return g(a, e);
          }
          function k(a, e, d) {
            e in a
              ? Object.defineProperty(a, e, {
                  value: d,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (a[e] = d);
            return a;
          }
          var r = h('./ChunkedFileData');
          h = (function (a) {
            function e(d) {
              if (!(this instanceof e))
                throw new TypeError('Cannot call a class as a function');
              var a = f(e).call(this);
              a =
                !a || ('object' !== m(a) && 'function' !== typeof a)
                  ? c(this)
                  : a;
              k(c(a), '_blob', void 0);
              k(c(a), '_fileData', void 0);
              a._blob = d;
              a._fileData = new r();
              return a;
            }
            b(e, a);
            t(
              e,
              [
                {
                  key: '_init',
                  value: function (d) {
                    this._size = this._blob.size;
                    setTimeout(d.onSuccess, 1);
                  },
                },
                {
                  key: 'loadRange',
                  value: function (d, a) {
                    var e = this,
                      l = (
                        this._blob.slice ||
                        this._blob.mozSlice ||
                        this._blob.webkitSlice
                      ).call(this._blob, d[0], d[1] + 1),
                      b = new FileReader();
                    b.onloadend = function (l) {
                      l = new Uint8Array(b.result);
                      e._fileData.addData(d[0], l);
                      a.onSuccess();
                    };
                    b.onerror = b.onabort = function (d) {
                      if (a.onError) a.onError({ type: 'blob', info: b.error });
                    };
                    b.readAsArrayBuffer(l);
                  },
                },
                {
                  key: 'getByteAt',
                  value: function (a) {
                    return this._fileData.getByteAt(a);
                  },
                },
              ],
              [
                {
                  key: 'canReadFile',
                  value: function (a) {
                    return (
                      ('undefined' !== typeof Blob && a instanceof Blob) ||
                      ('undefined' !== typeof File && a instanceof File)
                    );
                  },
                },
              ],
            );
            return e;
          })(h('./MediaFileReader'));
          p.exports = h;
        },
        { './ChunkedFileData': 5, './MediaFileReader': 11 },
      ],
      5: [
        function (h, p, n) {
          function m(h, f) {
            for (var c = 0; c < f.length; c++) {
              var b = f[c];
              b.enumerable = b.enumerable || !1;
              b.configurable = !0;
              'value' in b && (b.writable = !0);
              Object.defineProperty(h, b.key, b);
            }
          }
          function q(h, f, c) {
            f && m(h.prototype, f);
            c && m(h, c);
            return h;
          }
          h = (function () {
            function h() {
              if (!(this instanceof h))
                throw new TypeError('Cannot call a class as a function');
              '_fileData' in this
                ? Object.defineProperty(this, '_fileData', {
                    value: void 0,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (this._fileData = void 0);
              this._fileData = [];
            }
            q(h, null, [
              {
                key: 'NOT_FOUND',
                get: function () {
                  return -1;
                },
              },
            ]);
            q(h, [
              {
                key: 'addData',
                value: function (f, c) {
                  var b = f + c.length - 1,
                    g = this._getChunkRange(f, b);
                  if (-1 === g.startIx)
                    this._fileData.splice(g.insertIx || 0, 0, {
                      offset: f,
                      data: c,
                    });
                  else {
                    var k = this._fileData[g.startIx],
                      r = this._fileData[g.endIx];
                    b = b < r.offset + r.data.length - 1;
                    var a = { offset: Math.min(f, k.offset), data: c };
                    f > k.offset &&
                      ((f = this._sliceData(k.data, 0, f - k.offset)),
                      (a.data = this._concatData(f, c)));
                    b &&
                      ((f = this._sliceData(a.data, 0, r.offset - a.offset)),
                      (a.data = this._concatData(f, r.data)));
                    this._fileData.splice(
                      g.startIx,
                      g.endIx - g.startIx + 1,
                      a,
                    );
                  }
                },
              },
              {
                key: '_concatData',
                value: function (f, c) {
                  if (
                    'undefined' !== typeof ArrayBuffer &&
                    ArrayBuffer.isView &&
                    ArrayBuffer.isView(f)
                  ) {
                    var b = new f.constructor(f.length + c.length);
                    b.set(f, 0);
                    b.set(c, f.length);
                    return b;
                  }
                  return f.concat(c);
                },
              },
              {
                key: '_sliceData',
                value: function (f, c, b) {
                  return f.slice ? f.slice(c, b) : f.subarray(c, b);
                },
              },
              {
                key: '_getChunkRange',
                value: function (f, c) {
                  for (
                    var b, g, k = -1, r = -1, a = 0, e = 0;
                    e < this._fileData.length;
                    e++, a = e
                  ) {
                    g = this._fileData[e].offset;
                    b = g + this._fileData[e].data.length;
                    if (c < g - 1) break;
                    if (f <= b + 1 && c >= g - 1) {
                      k = e;
                      break;
                    }
                  }
                  if (-1 === k) return { startIx: -1, endIx: -1, insertIx: a };
                  for (
                    e = k;
                    e < this._fileData.length &&
                    !((g = this._fileData[e].offset),
                    (b = g + this._fileData[e].data.length),
                    c >= g - 1 && (r = e),
                    c <= b + 1);
                    e++
                  );
                  -1 === r && (r = k);
                  return { startIx: k, endIx: r };
                },
              },
              {
                key: 'hasDataRange',
                value: function (f, c) {
                  for (var b = 0; b < this._fileData.length; b++) {
                    var g = this._fileData[b];
                    if (c < g.offset) break;
                    if (f >= g.offset && c < g.offset + g.data.length)
                      return !0;
                  }
                  return !1;
                },
              },
              {
                key: 'getByteAt',
                value: function (f) {
                  for (var c, b = 0; b < this._fileData.length; b++) {
                    var g = this._fileData[b].offset,
                      k = g + this._fileData[b].data.length - 1;
                    if (f >= g && f <= k) {
                      c = this._fileData[b];
                      break;
                    }
                  }
                  if (c) return c.data[f - c.offset];
                  throw Error('Offset ' + f + " hasn't been loaded yet.");
                },
              },
            ]);
            return h;
          })();
          p.exports = h;
        },
        {},
      ],
      6: [
        function (h, p, n) {
          function m(a) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(a);
          }
          function q(a, e) {
            for (var d = 0; d < e.length; d++) {
              var b = e[d];
              b.enumerable = b.enumerable || !1;
              b.configurable = !0;
              'value' in b && (b.writable = !0);
              Object.defineProperty(a, b.key, b);
            }
          }
          function t(a, e, b) {
            e && q(a.prototype, e);
            b && q(a, b);
            return a;
          }
          function f(a) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(a);
          }
          function c(a) {
            if (void 0 === a)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return a;
          }
          function b(a, e) {
            if ('function' !== typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            a.prototype = Object.create(e && e.prototype, {
              constructor: { value: a, writable: !0, configurable: !0 },
            });
            e && g(a, e);
          }
          function g(a, e) {
            g =
              Object.setPrototypeOf ||
              function (a, d) {
                a.__proto__ = d;
                return a;
              };
            return g(a, e);
          }
          function k(a, e, b) {
            e in a
              ? Object.defineProperty(a, e, {
                  value: b,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (a[e] = b);
            return a;
          }
          var r = [4, 132],
            a = [6, 134],
            e = "Other;32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. label side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(
              ';',
            );
          h = (function (d) {
            function l() {
              var a;
              if (!(this instanceof l))
                throw new TypeError('Cannot call a class as a function');
              for (var d = arguments.length, e = Array(d), b = 0; b < d; b++)
                e[b] = arguments[b];
              d = (a = f(l)).call.apply(a, [this].concat(e));
              a =
                !d || ('object' !== m(d) && 'function' !== typeof d)
                  ? c(this)
                  : d;
              k(c(a), '_commentOffset', void 0);
              k(c(a), '_pictureOffset', void 0);
              return a;
            }
            b(l, d);
            t(
              l,
              [
                {
                  key: '_loadData',
                  value: function (a, d) {
                    var e = this;
                    a.loadRange([4, 7], {
                      onSuccess: function () {
                        e._loadBlock(a, 4, d);
                      },
                    });
                  },
                },
                {
                  key: '_loadBlock',
                  value: function (d, e, b) {
                    var l = this,
                      c = d.getByteAt(e),
                      k = d.getInteger24At(e + 1, !0);
                    if (-1 !== r.indexOf(c)) {
                      var g = e + 4;
                      d.loadRange([g, g + k], {
                        onSuccess: function () {
                          l._commentOffset = g;
                          l._nextBlock(d, e, c, k, b);
                        },
                      });
                    } else
                      -1 !== a.indexOf(c)
                        ? ((g = e + 4),
                          d.loadRange([g, g + k], {
                            onSuccess: function () {
                              l._pictureOffset = g;
                              l._nextBlock(d, e, c, k, b);
                            },
                          }))
                        : l._nextBlock(d, e, c, k, b);
                  },
                },
                {
                  key: '_nextBlock',
                  value: function (a, d, e, b, l) {
                    var c = this;
                    if (127 < e)
                      if (c._commentOffset) l.onSuccess();
                      else
                        l.onError({
                          type: 'loadData',
                          info: 'Comment block could not be found.',
                        });
                    else
                      a.loadRange([d + 4 + b, d + 4 + 4 + b], {
                        onSuccess: function () {
                          c._loadBlock(a, d + 4 + b, l);
                        },
                      });
                  },
                },
                {
                  key: '_parseData',
                  value: function (a, d) {
                    var b =
                      a.getLongAt(this._commentOffset, !1) +
                      (this._commentOffset + 4);
                    d = a.getLongAt(b, !1);
                    b += 4;
                    for (var l, c, k, g, u, r, f = 0; f < d; f++) {
                      var w = a.getLongAt(b, !1),
                        h = a
                          .getStringWithCharsetAt(b + 4, w, 'utf-8')
                          .toString(),
                        m = h.indexOf('=');
                      h = [h.slice(0, m), h.slice(m + 1)];
                      switch (h[0].toUpperCase()) {
                        case 'TITLE':
                          l = h[1];
                          break;
                        case 'ARTIST':
                          c = h[1];
                          break;
                        case 'ALBUM':
                          k = h[1];
                          break;
                        case 'TRACKNUMBER':
                          g = h[1];
                          break;
                        case 'GENRE':
                          u = h[1];
                      }
                      b += 4 + w;
                    }
                    this._pictureOffset &&
                      ((r = a.getLongAt(this._pictureOffset, !0)),
                      (d = this._pictureOffset + 4),
                      (b = a.getLongAt(d, !0)),
                      (f = d + 4),
                      (d = a.getStringAt(f, b)),
                      (b = f + b),
                      (f = a.getLongAt(b, !0)),
                      (w = b + 4),
                      (b = a.getStringWithCharsetAt(w, f, 'utf-8').toString()),
                      (f = w + f + 16),
                      (w = a.getLongAt(f, !0)),
                      (a = a.getBytesAt(f + 4, w, !0)),
                      (r = { format: d, type: e[r], description: b, data: a }));
                    return {
                      type: 'FLAC',
                      version: '1',
                      tags: {
                        title: l,
                        artist: c,
                        album: k,
                        track: g,
                        genre: u,
                        picture: r,
                      },
                    };
                  },
                },
              ],
              [
                {
                  key: 'getTagIdentifierByteRange',
                  value: function () {
                    return { offset: 0, length: 4 };
                  },
                },
                {
                  key: 'canReadTagFormat',
                  value: function (a) {
                    return (
                      'fLaC' ===
                      String.fromCharCode.apply(String, a.slice(0, 4))
                    );
                  },
                },
              ],
            );
            return l;
          })(h('./MediaTagReader'));
          p.exports = h;
        },
        { './MediaTagReader': 12 },
      ],
      7: [
        function (h, p, n) {
          function m(b) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (b) {
                    return typeof b;
                  }
                : function (b) {
                    return b &&
                      'function' === typeof Symbol &&
                      b.constructor === Symbol &&
                      b !== Symbol.prototype
                      ? 'symbol'
                      : typeof b;
                  };
            return m(b);
          }
          function q(b, c) {
            for (var a = 0; a < c.length; a++) {
              var e = c[a];
              e.enumerable = e.enumerable || !1;
              e.configurable = !0;
              'value' in e && (e.writable = !0);
              Object.defineProperty(b, e.key, e);
            }
          }
          function t(b, c, a) {
            c && q(b.prototype, c);
            a && q(b, a);
            return b;
          }
          function f(b) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (b) {
                  return b.__proto__ || Object.getPrototypeOf(b);
                };
            return f(b);
          }
          function c(c, g) {
            if ('function' !== typeof g && null !== g)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            c.prototype = Object.create(g && g.prototype, {
              constructor: { value: c, writable: !0, configurable: !0 },
            });
            g && b(c, g);
          }
          function b(c, g) {
            b =
              Object.setPrototypeOf ||
              function (a, e) {
                a.__proto__ = e;
                return a;
              };
            return b(c, g);
          }
          n = h('./MediaTagReader');
          h('./MediaFileReader');
          h = (function (b) {
            function k() {
              if (!(this instanceof k))
                throw new TypeError('Cannot call a class as a function');
              var a = f(k).apply(this, arguments);
              if (!a || ('object' !== m(a) && 'function' !== typeof a)) {
                if (void 0 === this)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                a = this;
              }
              return a;
            }
            c(k, b);
            t(
              k,
              [
                {
                  key: '_loadData',
                  value: function (a, e) {
                    var d = a.getSize();
                    a.loadRange([d - 128, d - 1], e);
                  },
                },
                {
                  key: '_parseData',
                  value: function (a, e) {
                    var d = a.getSize() - 128,
                      b = a.getStringWithCharsetAt(d + 3, 30).toString(),
                      c = a.getStringWithCharsetAt(d + 33, 30).toString(),
                      k = a.getStringWithCharsetAt(d + 63, 30).toString(),
                      f = a.getStringWithCharsetAt(d + 93, 4).toString();
                    var h = a.getByteAt(d + 97 + 28);
                    e = a.getByteAt(d + 97 + 29);
                    if (0 == h && 0 != e) {
                      var r = '1.1';
                      h = a.getStringWithCharsetAt(d + 97, 28).toString();
                    } else
                      (r = '1.0'),
                        (h = a.getStringWithCharsetAt(d + 97, 30).toString()),
                        (e = 0);
                    a = a.getByteAt(d + 97 + 30);
                    a = {
                      type: 'ID3',
                      version: r,
                      tags: {
                        title: b,
                        artist: c,
                        album: k,
                        year: f,
                        comment: h,
                        genre: 255 > a ? g[a] : '',
                      },
                    };
                    e && (a.tags.track = e);
                    return a;
                  },
                },
              ],
              [
                {
                  key: 'getTagIdentifierByteRange',
                  value: function () {
                    return { offset: -128, length: 128 };
                  },
                },
                {
                  key: 'canReadTagFormat',
                  value: function (a) {
                    return (
                      'TAG' === String.fromCharCode.apply(String, a.slice(0, 3))
                    );
                  },
                },
              ],
            );
            return k;
          })(n);
          var g = 'Blues;Classic Rock;Country;Dance;Disco;Funk;Grunge;Hip-Hop;Jazz;Metal;New Age;Oldies;Other;Pop;R&B;Rap;Reggae;Rock;Techno;Industrial;Alternative;Ska;Death Metal;Pranks;Soundtrack;Euro-Techno;Ambient;Trip-Hop;Vocal;Jazz+Funk;Fusion;Trance;Classical;Instrumental;Acid;House;Game;Sound Clip;Gospel;Noise;AlternRock;Bass;Soul;Punk;Space;Meditative;Instrumental Pop;Instrumental Rock;Ethnic;Gothic;Darkwave;Techno-Industrial;Electronic;Pop-Folk;Eurodance;Dream;Southern Rock;Comedy;Cult;Gangsta;Top 40;Christian Rap;Pop/Funk;Jungle;Native American;Cabaret;New Wave;Psychadelic;Rave;Showtunes;Trailer;Lo-Fi;Tribal;Acid Punk;Acid Jazz;Polka;Retro;Musical;Rock & Roll;Hard Rock;Folk;Folk-Rock;National Folk;Swing;Fast Fusion;Bebob;Latin;Revival;Celtic;Bluegrass;Avantgarde;Gothic Rock;Progressive Rock;Psychedelic Rock;Symphonic Rock;Slow Rock;Big Band;Chorus;Easy Listening;Acoustic;Humour;Speech;Chanson;Opera;Chamber Music;Sonata;Symphony;Booty Bass;Primus;Porn Groove;Satire;Slow Jam;Club;Tango;Samba;Folklore;Ballad;Power Ballad;Rhythmic Soul;Freestyle;Duet;Punk Rock;Drum Solo;Acapella;Euro-House;Dance Hall'.split(
            ';',
          );
          p.exports = h;
        },
        { './MediaFileReader': 11, './MediaTagReader': 12 },
      ],
      8: [
        function (h, p, n) {
          function m(a, e) {
            for (var d = 0; d < e.length; d++) {
              var b = e[d];
              b.enumerable = b.enumerable || !1;
              b.configurable = !0;
              'value' in b && (b.writable = !0);
              Object.defineProperty(a, b.key, b);
            }
          }
          function q(a, e, d) {
            e && m(a.prototype, e);
            d && m(a, d);
            return a;
          }
          function t(a) {
            switch (a) {
              case 0:
                a = 'iso-8859-1';
                break;
              case 1:
                a = 'utf-16';
                break;
              case 2:
                a = 'utf-16be';
                break;
              case 3:
                a = 'utf-8';
                break;
              default:
                a = 'iso-8859-1';
            }
            return a;
          }
          function f(a, e, d, b) {
            var l = d.getStringWithCharsetAt(a + 1, e - 1, b);
            a = d.getStringWithCharsetAt(
              a + 1 + l.bytesReadCount,
              e - 1 - l.bytesReadCount,
              b,
            );
            return { user_description: l.toString(), data: a.toString() };
          }
          h('./MediaFileReader');
          var c = h('./StringUtils'),
            b = h('./ArrayFileReader'),
            g = {
              BUF: 'Recommended buffer size',
              CNT: 'Play counter',
              COM: 'Comments',
              CRA: 'Audio encryption',
              CRM: 'Encrypted meta frame',
              ETC: 'Event timing codes',
              EQU: 'Equalization',
              GEO: 'General encapsulated object',
              IPL: 'Involved people list',
              LNK: 'Linked information',
              MCI: 'Music CD Identifier',
              MLL: 'MPEG location lookup table',
              PIC: 'Attached picture',
              POP: 'Popularimeter',
              REV: 'Reverb',
              RVA: 'Relative volume adjustment',
              SLT: 'Synchronized lyric/text',
              STC: 'Synced tempo codes',
              TAL: 'Album/Movie/Show title',
              TBP: 'BPM (Beats Per Minute)',
              TCM: 'Composer',
              TCO: 'Content type',
              TCR: 'Copyright message',
              TDA: 'Date',
              TDY: 'Playlist delay',
              TEN: 'Encoded by',
              TFT: 'File type',
              TIM: 'Time',
              TKE: 'Initial key',
              TLA: 'Language(s)',
              TLE: 'Length',
              TMT: 'Media type',
              TOA: 'Original artist(s)/performer(s)',
              TOF: 'Original filename',
              TOL: 'Original Lyricist(s)/text writer(s)',
              TOR: 'Original release year',
              TOT: 'Original album/Movie/Show title',
              TP1:
                'Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group',
              TP2: 'Band/Orchestra/Accompaniment',
              TP3: 'Conductor/Performer refinement',
              TP4: 'Interpreted, remixed, or otherwise modified by',
              TPA: 'Part of a set',
              TPB: 'Publisher',
              TRC: 'ISRC (International Standard Recording Code)',
              TRD: 'Recording dates',
              TRK: 'Track number/Position in set',
              TSI: 'Size',
              TSS: 'Software/hardware and settings used for encoding',
              TT1: 'Content group description',
              TT2: 'Title/Songname/Content description',
              TT3: 'Subtitle/Description refinement',
              TXT: 'Lyricist/text writer',
              TXX: 'User defined text information frame',
              TYE: 'Year',
              UFI: 'Unique file identifier',
              ULT: 'Unsychronized lyric/text transcription',
              WAF: 'Official audio file webpage',
              WAR: 'Official artist/performer webpage',
              WAS: 'Official audio source webpage',
              WCM: 'Commercial information',
              WCP: 'Copyright/Legal information',
              WPB: 'Publishers official webpage',
              WXX: 'User defined URL link frame',
              AENC: 'Audio encryption',
              APIC: 'Attached picture',
              ASPI: 'Audio seek point index',
              CHAP: 'Chapter',
              CTOC: 'Table of contents',
              COMM: 'Comments',
              COMR: 'Commercial frame',
              ENCR: 'Encryption method registration',
              EQU2: 'Equalisation (2)',
              EQUA: 'Equalization',
              ETCO: 'Event timing codes',
              GEOB: 'General encapsulated object',
              GRID: 'Group identification registration',
              IPLS: 'Involved people list',
              LINK: 'Linked information',
              MCDI: 'Music CD identifier',
              MLLT: 'MPEG location lookup table',
              OWNE: 'Ownership frame',
              PRIV: 'Private frame',
              PCNT: 'Play counter',
              POPM: 'Popularimeter',
              POSS: 'Position synchronisation frame',
              RBUF: 'Recommended buffer size',
              RVA2: 'Relative volume adjustment (2)',
              RVAD: 'Relative volume adjustment',
              RVRB: 'Reverb',
              SEEK: 'Seek frame',
              SYLT: 'Synchronized lyric/text',
              SYTC: 'Synchronized tempo codes',
              TALB: 'Album/Movie/Show title',
              TBPM: 'BPM (beats per minute)',
              TCOM: 'Composer',
              TCON: 'Content type',
              TCOP: 'Copyright message',
              TDAT: 'Date',
              TDLY: 'Playlist delay',
              TDRC: 'Recording time',
              TDRL: 'Release time',
              TDTG: 'Tagging time',
              TENC: 'Encoded by',
              TEXT: 'Lyricist/Text writer',
              TFLT: 'File type',
              TIME: 'Time',
              TIPL: 'Involved people list',
              TIT1: 'Content group description',
              TIT2: 'Title/songname/content description',
              TIT3: 'Subtitle/Description refinement',
              TKEY: 'Initial key',
              TLAN: 'Language(s)',
              TLEN: 'Length',
              TMCL: 'Musician credits list',
              TMED: 'Media type',
              TMOO: 'Mood',
              TOAL: 'Original album/movie/show title',
              TOFN: 'Original filename',
              TOLY: 'Original lyricist(s)/text writer(s)',
              TOPE: 'Original artist(s)/performer(s)',
              TORY: 'Original release year',
              TOWN: 'File owner/licensee',
              TPE1: 'Lead performer(s)/Soloist(s)',
              TPE2: 'Band/orchestra/accompaniment',
              TPE3: 'Conductor/performer refinement',
              TPE4: 'Interpreted, remixed, or otherwise modified by',
              TPOS: 'Part of a set',
              TPRO: 'Produced notice',
              TPUB: 'Publisher',
              TRCK: 'Track number/Position in set',
              TRDA: 'Recording dates',
              TRSN: 'Internet radio station name',
              TRSO: 'Internet radio station owner',
              TSOA: 'Album sort order',
              TSOP: 'Performer sort order',
              TSOT: 'Title sort order',
              TSIZ: 'Size',
              TSRC: 'ISRC (international standard recording code)',
              TSSE: 'Software/Hardware and settings used for encoding',
              TSST: 'Set subtitle',
              TYER: 'Year',
              TXXX: 'User defined text information frame',
              UFID: 'Unique file identifier',
              USER: 'Terms of use',
              USLT: 'Unsychronized lyric/text transcription',
              WCOM: 'Commercial information',
              WCOP: 'Copyright/Legal information',
              WOAF: 'Official audio file webpage',
              WOAR: 'Official artist/performer webpage',
              WOAS: 'Official audio source webpage',
              WORS: 'Official internet radio station homepage',
              WPAY: 'Payment',
              WPUB: 'Publishers official webpage',
              WXXX: 'User defined URL link frame',
            };
          h = (function () {
            function a() {
              if (!(this instanceof a))
                throw new TypeError('Cannot call a class as a function');
            }
            q(a, null, [
              {
                key: 'getFrameReaderFunction',
                value: function (a) {
                  return a in k
                    ? k[a]
                    : 'T' === a[0]
                    ? k['T*']
                    : 'W' === a[0]
                    ? k['W*']
                    : null;
                },
              },
              {
                key: 'readFrames',
                value: function (e, d, b, c, g) {
                  for (
                    var l = {}, k = this._getFrameHeaderSize(c);
                    e < d - k;

                  ) {
                    var f = this._readFrameHeader(b, e, c),
                      u = f.id;
                    if (!u) break;
                    var h = f.flags,
                      w = f.size,
                      r = e + f.headerSize,
                      m = b;
                    e += f.headerSize + f.size;
                    if (!g || -1 !== g.indexOf(u)) {
                      if (
                        'MP3e' === u ||
                        '\x00MP3' === u ||
                        '\x00\x00MP' === u ||
                        ' MP3' === u
                      )
                        break;
                      h &&
                        h.format.unsynchronisation &&
                        !c.flags.unsynchronisation &&
                        ((m = this.getUnsyncFileReader(m, r, w)),
                        (r = 0),
                        (w = m.getSize()));
                      h &&
                        h.format.data_length_indicator &&
                        ((r += 4), (w -= 4));
                      h = (f = a.getFrameReaderFunction(u))
                        ? f.apply(this, [r, w, m, h, c])
                        : null;
                      r = this._getFrameDescription(u);
                      w = { id: u, size: w, description: r, data: h };
                      u in l
                        ? (l[u].id && (l[u] = [l[u]]), l[u].push(w))
                        : (l[u] = w);
                    }
                  }
                  return l;
                },
              },
              {
                key: '_getFrameHeaderSize',
                value: function (a) {
                  a = a.major;
                  return 2 == a ? 6 : 3 == a || 4 == a ? 10 : 0;
                },
              },
              {
                key: '_readFrameHeader',
                value: function (a, d, b) {
                  var e = b.major,
                    l = null;
                  b = this._getFrameHeaderSize(b);
                  switch (e) {
                    case 2:
                      var c = a.getStringAt(d, 3);
                      var g = a.getInteger24At(d + 3, !0);
                      break;
                    case 3:
                      c = a.getStringAt(d, 4);
                      g = a.getLongAt(d + 4, !0);
                      break;
                    case 4:
                      (c = a.getStringAt(d, 4)),
                        (g = a.getSynchsafeInteger32At(d + 4));
                  }
                  if (
                    c == String.fromCharCode(0, 0, 0) ||
                    c == String.fromCharCode(0, 0, 0, 0)
                  )
                    c = '';
                  c && 2 < e && (l = this._readFrameFlags(a, d + 8));
                  return {
                    id: c || '',
                    size: g || 0,
                    headerSize: b || 0,
                    flags: l,
                  };
                },
              },
              {
                key: '_readFrameFlags',
                value: function (a, d) {
                  return {
                    message: {
                      tag_alter_preservation: a.isBitSetAt(d, 6),
                      file_alter_preservation: a.isBitSetAt(d, 5),
                      read_only: a.isBitSetAt(d, 4),
                    },
                    format: {
                      grouping_identity: a.isBitSetAt(d + 1, 7),
                      compression: a.isBitSetAt(d + 1, 3),
                      encryption: a.isBitSetAt(d + 1, 2),
                      unsynchronisation: a.isBitSetAt(d + 1, 1),
                      data_length_indicator: a.isBitSetAt(d + 1, 0),
                    },
                  };
                },
              },
              {
                key: '_getFrameDescription',
                value: function (a) {
                  return a in g ? g[a] : 'Unknown';
                },
              },
              {
                key: 'getUnsyncFileReader',
                value: function (a, d, l) {
                  a = a.getBytesAt(d, l);
                  for (d = 0; d < a.length - 1; d++)
                    255 === a[d] && 0 === a[d + 1] && a.splice(d + 1, 1);
                  return new b(a);
                },
              },
            ]);
            return a;
          })();
          var k = {
            APIC: function (a, b, d, l, c) {
              l = a;
              var e = t(d.getByteAt(a));
              switch (c && c.major) {
                case 2:
                  c = d.getStringAt(a + 1, 3);
                  a += 4;
                  break;
                case 3:
                case 4:
                  c = d.getStringWithCharsetAt(a + 1, b - 1);
                  a += 1 + c.bytesReadCount;
                  break;
                default:
                  throw Error("Couldn't read ID3v2 major version.");
              }
              var g = d.getByteAt(a);
              g = r[g];
              e = d.getStringWithCharsetAt(a + 1, b - (a - l) - 1, e);
              a += 1 + e.bytesReadCount;
              return {
                format: c.toString(),
                type: g,
                description: e.toString(),
                data: d.getBytesAt(a, l + b - a),
              };
            },
            CHAP: function (a, b, d, l, g) {
              l = a;
              var e = {},
                k = c.readNullTerminatedString(d.getBytesAt(a, b));
              e.id = k.toString();
              a += k.bytesReadCount;
              e.startTime = d.getLongAt(a, !0);
              a += 4;
              e.endTime = d.getLongAt(a, !0);
              a += 4;
              e.startOffset = d.getLongAt(a, !0);
              a += 4;
              e.endOffset = d.getLongAt(a, !0);
              a += 4;
              e.subFrames = this.readFrames(a, a + (b - (a - l)), d, g);
              return e;
            },
            CTOC: function (a, b, d, l, g) {
              l = a;
              var e = {
                  childElementIds: [],
                  id: void 0,
                  topLevel: void 0,
                  ordered: void 0,
                  entryCount: void 0,
                  subFrames: void 0,
                },
                k = c.readNullTerminatedString(d.getBytesAt(a, b));
              e.id = k.toString();
              a += k.bytesReadCount;
              e.topLevel = d.isBitSetAt(a, 1);
              e.ordered = d.isBitSetAt(a, 0);
              a++;
              e.entryCount = d.getByteAt(a);
              a++;
              for (k = 0; k < e.entryCount; k++) {
                var f = c.readNullTerminatedString(
                  d.getBytesAt(a, b - (a - l)),
                );
                e.childElementIds.push(f.toString());
                a += f.bytesReadCount;
              }
              e.subFrames = this.readFrames(a, a + (b - (a - l)), d, g);
              return e;
            },
            COMM: function (a, b, d, l, c) {
              var e = a,
                g = t(d.getByteAt(a));
              l = d.getStringAt(a + 1, 3);
              c = d.getStringWithCharsetAt(a + 4, b - 4, g);
              a += 4 + c.bytesReadCount;
              a = d.getStringWithCharsetAt(a, e + b - a, g);
              return {
                language: l,
                short_description: c.toString(),
                text: a.toString(),
              };
            },
          };
          k.COM = k.COMM;
          k.PIC = function (a, b, d, l, c) {
            return k.APIC(a, b, d, l, c);
          };
          k.PCNT = function (a, b, d, l, c) {
            return d.getLongAt(a, !1);
          };
          k.CNT = k.PCNT;
          k['T*'] = function (a, b, d, l, c) {
            l = t(d.getByteAt(a));
            return d.getStringWithCharsetAt(a + 1, b - 1, l).toString();
          };
          k.TXXX = function (a, b, d, l, c) {
            l = t(d.getByteAt(a));
            return f(a, b, d, l);
          };
          k.WXXX = function (a, b, d, l, c) {
            if (0 === b) return null;
            l = t(d.getByteAt(a));
            return f(a, b, d, l);
          };
          k['W*'] = function (a, b, d, l, c) {
            return 0 === b
              ? null
              : d.getStringWithCharsetAt(a, b, 'iso-8859-1').toString();
          };
          k.TCON = function (a, b, d, l) {
            return k['T*'].apply(this, arguments).replace(/^\(\d+\)/, '');
          };
          k.TCO = k.TCON;
          k.USLT = function (a, b, d, l, c) {
            var e = a,
              g = t(d.getByteAt(a));
            l = d.getStringAt(a + 1, 3);
            c = d.getStringWithCharsetAt(a + 4, b - 4, g);
            a += 4 + c.bytesReadCount;
            a = d.getStringWithCharsetAt(a, e + b - a, g);
            return {
              language: l,
              descriptor: c.toString(),
              lyrics: a.toString(),
            };
          };
          k.ULT = k.USLT;
          k.UFID = function (a, b, d, l, g) {
            l = c.readNullTerminatedString(d.getBytesAt(a, b));
            a += l.bytesReadCount;
            a = d.getBytesAt(a, b - l.bytesReadCount);
            return { ownerIdentifier: l.toString(), identifier: a };
          };
          var r = "Other;32x32 pixels 'file icon' (PNG only);Other file icon;Cover (front);Cover (back);Leaflet page;Media (e.g. label side of CD);Lead artist/lead performer/soloist;Artist/performer;Conductor;Band/Orchestra;Composer;Lyricist/text writer;Recording Location;During recording;During performance;Movie/video screen capture;A bright coloured fish;Illustration;Band/artist logotype;Publisher/Studio logotype".split(
            ';',
          );
          p.exports = h;
        },
        {
          './ArrayFileReader': 3,
          './MediaFileReader': 11,
          './StringUtils': 13,
        },
      ],
      9: [
        function (h, p, n) {
          function m(b) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(b);
          }
          function q(b, a) {
            for (var e = 0; e < a.length; e++) {
              var d = a[e];
              d.enumerable = d.enumerable || !1;
              d.configurable = !0;
              'value' in d && (d.writable = !0);
              Object.defineProperty(b, d.key, d);
            }
          }
          function t(b, a, e) {
            a && q(b.prototype, a);
            e && q(b, e);
            return b;
          }
          function f(b) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(b);
          }
          function c(c, a) {
            if ('function' !== typeof a && null !== a)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            c.prototype = Object.create(a && a.prototype, {
              constructor: { value: c, writable: !0, configurable: !0 },
            });
            a && b(c, a);
          }
          function b(c, a) {
            b =
              Object.setPrototypeOf ||
              function (a, d) {
                a.__proto__ = d;
                return a;
              };
            return b(c, a);
          }
          n = h('./MediaTagReader');
          h('./MediaFileReader');
          var g = h('./ID3v2FrameReader');
          h = (function (b) {
            function a() {
              if (!(this instanceof a))
                throw new TypeError('Cannot call a class as a function');
              var b = f(a).apply(this, arguments);
              if (!b || ('object' !== m(b) && 'function' !== typeof b)) {
                if (void 0 === this)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                b = this;
              }
              return b;
            }
            c(a, b);
            t(
              a,
              [
                {
                  key: '_loadData',
                  value: function (a, b) {
                    a.loadRange([6, 9], {
                      onSuccess: function () {
                        a.loadRange(
                          [0, 10 + a.getSynchsafeInteger32At(6) - 1],
                          b,
                        );
                      },
                      onError: b.onError,
                    });
                  },
                },
                {
                  key: '_parseData',
                  value: function (a, b) {
                    var d,
                      e = 0,
                      c = a.getByteAt(e + 3);
                    if (4 < c)
                      return { type: 'ID3', version: '>2.4', tags: {} };
                    var f = a.getByteAt(e + 4),
                      h = a.isBitSetAt(e + 5, 7),
                      r = a.isBitSetAt(e + 5, 6),
                      m = a.isBitSetAt(e + 5, 5),
                      p = a.getSynchsafeInteger32At(e + 6);
                    e += 10;
                    if (r)
                      if (4 === c) {
                        var n = a.getSynchsafeInteger32At(e);
                        e += n;
                      } else (n = a.getLongAt(e, !0)), (e += n + 4);
                    n = {
                      type: 'ID3',
                      version: '2.' + c + '.' + f,
                      major: c,
                      revision: f,
                      flags: {
                        unsynchronisation: h,
                        extended_header: r,
                        experimental_indicator: m,
                        footer_present: !1,
                      },
                      size: p,
                      tags: {},
                    };
                    b && (d = this._expandShortcutTags(b));
                    b = p + 10;
                    n.flags.unsynchronisation &&
                      ((a = g.getUnsyncFileReader(a, e, p)),
                      (e = 0),
                      (b = a.getSize()));
                    a = g.readFrames(e, b, a, n, d);
                    for (var q in k)
                      k.hasOwnProperty(q) &&
                        (d = this._getFrameData(a, k[q])) &&
                        (n.tags[q] = d);
                    for (var t in a) a.hasOwnProperty(t) && (n.tags[t] = a[t]);
                    return n;
                  },
                },
                {
                  key: '_getFrameData',
                  value: function (a, b) {
                    for (var d = 0, e; (e = b[d]); d++)
                      if (e in a)
                        return (
                          (a = a[e] instanceof Array ? a[e][0] : a[e]), a.data
                        );
                  },
                },
                {
                  key: 'getShortcuts',
                  value: function () {
                    return k;
                  },
                },
              ],
              [
                {
                  key: 'getTagIdentifierByteRange',
                  value: function () {
                    return { offset: 0, length: 10 };
                  },
                },
                {
                  key: 'canReadTagFormat',
                  value: function (a) {
                    return (
                      'ID3' === String.fromCharCode.apply(String, a.slice(0, 3))
                    );
                  },
                },
              ],
            );
            return a;
          })(n);
          var k = {
            title: ['TIT2', 'TT2'],
            artist: ['TPE1', 'TP1'],
            album: ['TALB', 'TAL'],
            year: ['TYER', 'TYE'],
            comment: ['COMM', 'COM'],
            track: ['TRCK', 'TRK'],
            genre: ['TCON', 'TCO'],
            picture: ['APIC', 'PIC'],
            lyrics: ['USLT', 'ULT'],
          };
          p.exports = h;
        },
        {
          './ID3v2FrameReader': 8,
          './MediaFileReader': 11,
          './MediaTagReader': 12,
        },
      ],
      10: [
        function (h, p, n) {
          function m(a) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(a);
          }
          function q(a, b) {
            for (var d = 0; d < b.length; d++) {
              var e = b[d];
              e.enumerable = e.enumerable || !1;
              e.configurable = !0;
              'value' in e && (e.writable = !0);
              Object.defineProperty(a, e.key, e);
            }
          }
          function t(a, b, d) {
            b && q(a.prototype, b);
            d && q(a, d);
            return a;
          }
          function f(a) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(a);
          }
          function c(a, e) {
            if ('function' !== typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            a.prototype = Object.create(e && e.prototype, {
              constructor: { value: a, writable: !0, configurable: !0 },
            });
            e && b(a, e);
          }
          function b(a, e) {
            b =
              Object.setPrototypeOf ||
              function (a, b) {
                a.__proto__ = b;
                return a;
              };
            return b(a, e);
          }
          n = h('./MediaTagReader');
          h('./MediaFileReader');
          h = (function (a) {
            function b() {
              if (!(this instanceof b))
                throw new TypeError('Cannot call a class as a function');
              var a = f(b).apply(this, arguments);
              if (!a || ('object' !== m(a) && 'function' !== typeof a)) {
                if (void 0 === this)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                a = this;
              }
              return a;
            }
            c(b, a);
            t(
              b,
              [
                {
                  key: '_loadData',
                  value: function (a, b) {
                    var d = this;
                    a.loadRange([0, 16], {
                      onSuccess: function () {
                        d._loadAtom(a, 0, '', b);
                      },
                      onError: b.onError,
                    });
                  },
                },
                {
                  key: '_loadAtom',
                  value: function (a, b, e, c) {
                    if (b >= a.getSize()) c.onSuccess();
                    else {
                      var d = this,
                        l = a.getLongAt(b, !0);
                      if (0 == l || isNaN(l)) c.onSuccess();
                      else {
                        var g = a.getStringAt(b + 4, 4);
                        if (this._isContainerAtom(g)) {
                          'meta' == g && (b += 4);
                          var k = (e ? e + '.' : '') + g;
                          'moov.udta.meta.ilst' === k
                            ? a.loadRange([b, b + l], c)
                            : a.loadRange([b + 8, b + 8 + 8], {
                                onSuccess: function () {
                                  d._loadAtom(a, b + 8, k, c);
                                },
                                onError: c.onError,
                              });
                        } else
                          a.loadRange([b + l, b + l + 8], {
                            onSuccess: function () {
                              d._loadAtom(a, b + l, e, c);
                            },
                            onError: c.onError,
                          });
                      }
                    }
                  },
                },
                {
                  key: '_isContainerAtom',
                  value: function (a) {
                    return 0 <= ['moov', 'udta', 'meta', 'ilst'].indexOf(a);
                  },
                },
                {
                  key: '_canReadAtom',
                  value: function (a) {
                    return '----' !== a;
                  },
                },
                {
                  key: '_parseData',
                  value: function (a, b) {
                    var d = {};
                    b = this._expandShortcutTags(b);
                    this._readAtom(d, a, 0, a.getSize(), b);
                    for (var e in r)
                      r.hasOwnProperty(e) &&
                        (b = d[r[e]]) &&
                        (d[e] = 'track' === e ? b.data.track : b.data);
                    return {
                      type: 'MP4',
                      ftyp: a.getStringAt(8, 4),
                      version: a.getLongAt(12, !0),
                      tags: d,
                    };
                  },
                },
                {
                  key: '_readAtom',
                  value: function (a, b, e, c, g, k, f) {
                    f = void 0 === f ? '' : f + '  ';
                    for (var d = e; d < e + c; ) {
                      var l = b.getLongAt(d, !0);
                      if (0 == l) break;
                      var h = b.getStringAt(d + 4, 4);
                      if (this._isContainerAtom(h)) {
                        'meta' == h && (d += 4);
                        this._readAtom(
                          a,
                          b,
                          d + 8,
                          l - 8,
                          g,
                          (k ? k + '.' : '') + h,
                          f,
                        );
                        break;
                      }
                      (!g || 0 <= g.indexOf(h)) &&
                        'moov.udta.meta.ilst' === k &&
                        this._canReadAtom(h) &&
                        (a[h] = this._readMetadataAtom(b, d));
                      d += l;
                    }
                  },
                },
                {
                  key: '_readMetadataAtom',
                  value: function (a, b) {
                    var d = a.getLongAt(b, !0),
                      e = a.getStringAt(b + 4, 4),
                      c = a.getInteger24At(b + 16 + 1, !0);
                    c = g[c];
                    if ('trkn' == e)
                      var l = {
                        track: a.getByteAt(b + 16 + 11),
                        total: a.getByteAt(b + 16 + 13),
                      };
                    else if ('disk' == e)
                      l = {
                        disk: a.getByteAt(b + 16 + 11),
                        total: a.getByteAt(b + 16 + 13),
                      };
                    else {
                      b += 24;
                      var f = d - 24;
                      'covr' === e && 'uint8' === c && (c = 'jpeg');
                      switch (c) {
                        case 'text':
                          l = a
                            .getStringWithCharsetAt(b, f, 'utf-8')
                            .toString();
                          break;
                        case 'uint8':
                          l = a.getShortAt(b, !1);
                          break;
                        case 'int':
                        case 'uint':
                          l = ('int' == c
                            ? 1 == f
                              ? a.getSByteAt
                              : 2 == f
                              ? a.getSShortAt
                              : 4 == f
                              ? a.getSLongAt
                              : a.getLongAt
                            : 1 == f
                            ? a.getByteAt
                            : 2 == f
                            ? a.getShortAt
                            : a.getLongAt
                          ).call(a, b + (8 == f ? 4 : 0), !0);
                          break;
                        case 'jpeg':
                        case 'png':
                          l = {
                            format: 'image/' + c,
                            data: a.getBytesAt(b, f),
                          };
                      }
                    }
                    return {
                      id: e,
                      size: d,
                      description: k[e] || 'Unknown',
                      data: l,
                    };
                  },
                },
                {
                  key: 'getShortcuts',
                  value: function () {
                    return r;
                  },
                },
              ],
              [
                {
                  key: 'getTagIdentifierByteRange',
                  value: function () {
                    return { offset: 0, length: 16 };
                  },
                },
                {
                  key: 'canReadTagFormat',
                  value: function (a) {
                    return (
                      'ftyp' ===
                      String.fromCharCode.apply(String, a.slice(4, 8))
                    );
                  },
                },
              ],
            );
            return b;
          })(n);
          var g = {
              0: 'uint8',
              1: 'text',
              13: 'jpeg',
              14: 'png',
              21: 'int',
              22: 'uint',
            },
            k = {
              '\u00a9alb': 'Album',
              '\u00a9ART': 'Artist',
              aART: 'Album Artist',
              '\u00a9day': 'Release Date',
              '\u00a9nam': 'Title',
              '\u00a9gen': 'Genre',
              gnre: 'Genre',
              trkn: 'Track Number',
              '\u00a9wrt': 'Composer',
              '\u00a9too': 'Encoding Tool',
              '\u00a9enc': 'Encoded By',
              cprt: 'Copyright',
              covr: 'Cover Art',
              '\u00a9grp': 'Grouping',
              keyw: 'Keywords',
              '\u00a9lyr': 'Lyrics',
              '\u00a9cmt': 'Comment',
              tmpo: 'Tempo',
              cpil: 'Compilation',
              disk: 'Disc Number',
              tvsh: 'TV Show Name',
              tven: 'TV Episode ID',
              tvsn: 'TV Season',
              tves: 'TV Episode',
              tvnn: 'TV Network',
              desc: 'Description',
              ldes: 'Long Description',
              sonm: 'Sort Name',
              soar: 'Sort Artist',
              soaa: 'Sort Album',
              soco: 'Sort Composer',
              sosn: 'Sort Show',
              purd: 'Purchase Date',
              pcst: 'Podcast',
              purl: 'Podcast URL',
              catg: 'Category',
              hdvd: 'HD Video',
              stik: 'Media Type',
              rtng: 'Content Rating',
              pgap: 'Gapless Playback',
              apID: 'Purchase Account',
              sfID: 'Country Code',
              atID: 'Artist ID',
              cnID: 'Catalog ID',
              plID: 'Collection ID',
              geID: 'Genre ID',
              'xid ': 'Vendor Information',
              flvr: 'Codec Flavor',
            },
            r = {
              title: '\u00a9nam',
              artist: '\u00a9ART',
              album: '\u00a9alb',
              year: '\u00a9day',
              comment: '\u00a9cmt',
              track: 'trkn',
              genre: '\u00a9gen',
              picture: 'covr',
              lyrics: '\u00a9lyr',
            };
          p.exports = h;
        },
        { './MediaFileReader': 11, './MediaTagReader': 12 },
      ],
      11: [
        function (h, p, n) {
          function m(c, b) {
            for (var g = 0; g < b.length; g++) {
              var k = b[g];
              k.enumerable = k.enumerable || !1;
              k.configurable = !0;
              'value' in k && (k.writable = !0);
              Object.defineProperty(c, k.key, k);
            }
          }
          function q(c, b, g) {
            b && m(c.prototype, b);
            g && m(c, g);
            return c;
          }
          function t(c, b, g) {
            b in c
              ? Object.defineProperty(c, b, {
                  value: g,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (c[b] = g);
            return c;
          }
          var f = h('./StringUtils');
          h = (function () {
            function c(b) {
              if (!(this instanceof c))
                throw new TypeError('Cannot call a class as a function');
              t(this, '_isInitialized', void 0);
              t(this, '_size', void 0);
              this._isInitialized = !1;
              this._size = 0;
            }
            q(
              c,
              [
                {
                  key: 'init',
                  value: function (b) {
                    var c = this;
                    if (this._isInitialized) setTimeout(b.onSuccess, 1);
                    else
                      return this._init({
                        onSuccess: function () {
                          c._isInitialized = !0;
                          b.onSuccess();
                        },
                        onError: b.onError,
                      });
                  },
                },
                {
                  key: '_init',
                  value: function (b) {
                    throw Error('Must implement init function');
                  },
                },
                {
                  key: 'loadRange',
                  value: function (b, c) {
                    throw Error('Must implement loadRange function');
                  },
                },
                {
                  key: 'getSize',
                  value: function () {
                    if (!this._isInitialized)
                      throw Error('init() must be called first.');
                    return this._size;
                  },
                },
                {
                  key: 'getByteAt',
                  value: function (b) {
                    throw Error('Must implement getByteAt function');
                  },
                },
                {
                  key: 'getBytesAt',
                  value: function (b, c) {
                    for (var g = Array(c), f = 0; f < c; f++)
                      g[f] = this.getByteAt(b + f);
                    return g;
                  },
                },
                {
                  key: 'isBitSetAt',
                  value: function (b, c) {
                    return 0 != (this.getByteAt(b) & (1 << c));
                  },
                },
                {
                  key: 'getSByteAt',
                  value: function (b) {
                    b = this.getByteAt(b);
                    return 127 < b ? b - 256 : b;
                  },
                },
                {
                  key: 'getShortAt',
                  value: function (b, c) {
                    b = c
                      ? (this.getByteAt(b) << 8) + this.getByteAt(b + 1)
                      : (this.getByteAt(b + 1) << 8) + this.getByteAt(b);
                    0 > b && (b += 65536);
                    return b;
                  },
                },
                {
                  key: 'getSShortAt',
                  value: function (b, c) {
                    b = this.getShortAt(b, c);
                    return 32767 < b ? b - 65536 : b;
                  },
                },
                {
                  key: 'getLongAt',
                  value: function (b, c) {
                    var g = this.getByteAt(b),
                      f = this.getByteAt(b + 1),
                      a = this.getByteAt(b + 2);
                    b = this.getByteAt(b + 3);
                    c = c
                      ? (((((g << 8) + f) << 8) + a) << 8) + b
                      : (((((b << 8) + a) << 8) + f) << 8) + g;
                    0 > c && (c += 4294967296);
                    return c;
                  },
                },
                {
                  key: 'getSLongAt',
                  value: function (b, c) {
                    b = this.getLongAt(b, c);
                    return 2147483647 < b ? b - 4294967296 : b;
                  },
                },
                {
                  key: 'getInteger24At',
                  value: function (b, c) {
                    var g = this.getByteAt(b),
                      f = this.getByteAt(b + 1);
                    b = this.getByteAt(b + 2);
                    c = c
                      ? (((g << 8) + f) << 8) + b
                      : (((b << 8) + f) << 8) + g;
                    0 > c && (c += 16777216);
                    return c;
                  },
                },
                {
                  key: 'getStringAt',
                  value: function (b, c) {
                    for (var g = [], f = b, a = 0; f < b + c; f++, a++)
                      g[a] = String.fromCharCode(this.getByteAt(f));
                    return g.join('');
                  },
                },
                {
                  key: 'getStringWithCharsetAt',
                  value: function (b, c, k) {
                    b = this.getBytesAt(b, c);
                    switch ((k || '').toLowerCase()) {
                      case 'utf-16':
                      case 'utf-16le':
                      case 'utf-16be':
                        k = f.readUTF16String(b, 'utf-16be' === k);
                        break;
                      case 'utf-8':
                        k = f.readUTF8String(b);
                        break;
                      default:
                        k = f.readNullTerminatedString(b);
                    }
                    return k;
                  },
                },
                {
                  key: 'getCharAt',
                  value: function (b) {
                    return String.fromCharCode(this.getByteAt(b));
                  },
                },
                {
                  key: 'getSynchsafeInteger32At',
                  value: function (b) {
                    var c = this.getByteAt(b),
                      f = this.getByteAt(b + 1),
                      h = this.getByteAt(b + 2);
                    return (
                      (this.getByteAt(b + 3) & 127) |
                      ((h & 127) << 7) |
                      ((f & 127) << 14) |
                      ((c & 127) << 21)
                    );
                  },
                },
              ],
              [
                {
                  key: 'canReadFile',
                  value: function (b) {
                    throw Error('Must implement canReadFile function');
                  },
                },
              ],
            );
            return c;
          })();
          p.exports = h;
        },
        { './StringUtils': 13 },
      ],
      12: [
        function (h, p, n) {
          function m(f, c) {
            for (var b = 0; b < c.length; b++) {
              var g = c[b];
              g.enumerable = g.enumerable || !1;
              g.configurable = !0;
              'value' in g && (g.writable = !0);
              Object.defineProperty(f, g.key, g);
            }
          }
          function q(f, c, b) {
            c && m(f.prototype, c);
            b && m(f, b);
            return f;
          }
          function t(f, c, b) {
            c in f
              ? Object.defineProperty(f, c, {
                  value: b,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (f[c] = b);
            return f;
          }
          h('./MediaFileReader');
          h = (function () {
            function f(c) {
              if (!(this instanceof f))
                throw new TypeError('Cannot call a class as a function');
              t(this, '_mediaFileReader', void 0);
              t(this, '_tags', void 0);
              this._mediaFileReader = c;
              this._tags = null;
            }
            q(
              f,
              [
                {
                  key: 'setTagsToRead',
                  value: function (c) {
                    this._tags = c;
                    return this;
                  },
                },
                {
                  key: 'read',
                  value: function (c) {
                    var b = this;
                    this._mediaFileReader.init({
                      onSuccess: function () {
                        b._loadData(b._mediaFileReader, {
                          onSuccess: function () {
                            try {
                              var g = b._parseData(b._mediaFileReader, b._tags);
                            } catch (k) {
                              if (c.onError) {
                                c.onError({
                                  type: 'parseData',
                                  info: k.message,
                                });
                                return;
                              }
                            }
                            c.onSuccess(g);
                          },
                          onError: c.onError,
                        });
                      },
                      onError: c.onError,
                    });
                  },
                },
                {
                  key: 'getShortcuts',
                  value: function () {
                    return {};
                  },
                },
                {
                  key: '_loadData',
                  value: function (c, b) {
                    throw Error('Must implement _loadData function');
                  },
                },
                {
                  key: '_parseData',
                  value: function (c, b) {
                    throw Error('Must implement _parseData function');
                  },
                },
                {
                  key: '_expandShortcutTags',
                  value: function (c) {
                    if (!c) return null;
                    for (
                      var b = [], g = this.getShortcuts(), f = 0, h;
                      (h = c[f]);
                      f++
                    )
                      b = b.concat(g[h] || [h]);
                    return b;
                  },
                },
              ],
              [
                {
                  key: 'getTagIdentifierByteRange',
                  value: function () {
                    throw Error('Must implement');
                  },
                },
                {
                  key: 'canReadTagFormat',
                  value: function (c) {
                    throw Error('Must implement');
                  },
                },
              ],
            );
            return f;
          })();
          p.exports = h;
        },
        { './MediaFileReader': 11 },
      ],
      13: [
        function (h, p, n) {
          function m(c, b) {
            for (var g = 0; g < b.length; g++) {
              var f = b[g];
              f.enumerable = f.enumerable || !1;
              f.configurable = !0;
              'value' in f && (f.writable = !0);
              Object.defineProperty(c, f.key, f);
            }
          }
          function q(c, b, f) {
            b && m(c.prototype, b);
            f && m(c, f);
            return c;
          }
          function t(c, b, f) {
            b in c
              ? Object.defineProperty(c, b, {
                  value: f,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (c[b] = f);
            return c;
          }
          var f = (function () {
            function c(b, f) {
              if (!(this instanceof c))
                throw new TypeError('Cannot call a class as a function');
              t(this, '_value', void 0);
              t(this, 'bytesReadCount', void 0);
              t(this, 'length', void 0);
              this._value = b;
              this.bytesReadCount = f;
              this.length = b.length;
            }
            q(c, [
              {
                key: 'toString',
                value: function () {
                  return this._value;
                },
              },
            ]);
            return c;
          })();
          p.exports = {
            readUTF16String: function (c, b, g) {
              var k = 0,
                h = 1,
                a = 0;
              g = Math.min(g || c.length, c.length);
              254 == c[0] && 255 == c[1]
                ? ((b = !0), (k = 2))
                : 255 == c[0] && 254 == c[1] && ((b = !1), (k = 2));
              b && ((h = 0), (a = 1));
              b = [];
              for (var e = 0; k < g; e++) {
                var d = c[k + h],
                  l = (d << 8) + c[k + a];
                k += 2;
                if (0 == l) break;
                else
                  216 > d || 224 <= d
                    ? (b[e] = String.fromCharCode(l))
                    : ((d = (c[k + h] << 8) + c[k + a]),
                      (k += 2),
                      (b[e] = String.fromCharCode(l, d)));
              }
              return new f(b.join(''), k);
            },
            readUTF8String: function (c, b) {
              var g = 0;
              b = Math.min(b || c.length, c.length);
              239 == c[0] && 187 == c[1] && 191 == c[2] && (g = 3);
              for (var h = [], m = 0; g < b; m++) {
                var a = c[g++];
                if (0 == a) break;
                else if (128 > a) h[m] = String.fromCharCode(a);
                else if (194 <= a && 224 > a) {
                  var e = c[g++];
                  h[m] = String.fromCharCode(((a & 31) << 6) + (e & 63));
                } else if (224 <= a && 240 > a) {
                  e = c[g++];
                  var d = c[g++];
                  h[m] = String.fromCharCode(
                    ((a & 255) << 12) + ((e & 63) << 6) + (d & 63),
                  );
                } else if (240 <= a && 245 > a) {
                  e = c[g++];
                  d = c[g++];
                  var l = c[g++];
                  d =
                    ((a & 7) << 18) +
                    ((e & 63) << 12) +
                    ((d & 63) << 6) +
                    (l & 63) -
                    65536;
                  h[m] = String.fromCharCode(
                    (d >> 10) + 55296,
                    (d & 1023) + 56320,
                  );
                }
              }
              return new f(h.join(''), g);
            },
            readNullTerminatedString: function (c, b) {
              var g = [];
              b = b || c.length;
              for (var h = 0; h < b; ) {
                var m = c[h++];
                if (0 == m) break;
                g[h - 1] = String.fromCharCode(m);
              }
              return new f(g.join(''), h);
            },
          };
        },
        {},
      ],
      14: [
        function (h, p, n) {
          function m(a) {
            m =
              'function' === typeof Symbol &&
              'symbol' === typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      'function' === typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? 'symbol'
                      : typeof a;
                  };
            return m(a);
          }
          function q(a, b) {
            for (var d = 0; d < b.length; d++) {
              var c = b[d];
              c.enumerable = c.enumerable || !1;
              c.configurable = !0;
              'value' in c && (c.writable = !0);
              Object.defineProperty(a, c.key, c);
            }
          }
          function t(a, b, d) {
            b && q(a.prototype, b);
            d && q(a, d);
            return a;
          }
          function f(a) {
            f = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                };
            return f(a);
          }
          function c(a) {
            if (void 0 === a)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return a;
          }
          function b(a, b) {
            if ('function' !== typeof b && null !== b)
              throw new TypeError(
                'Super expression must either be null or a function',
              );
            a.prototype = Object.create(b && b.prototype, {
              constructor: { value: a, writable: !0, configurable: !0 },
            });
            b && g(a, b);
          }
          function g(a, b) {
            g =
              Object.setPrototypeOf ||
              function (a, b) {
                a.__proto__ = b;
                return a;
              };
            return g(a, b);
          }
          function k(a, b, d) {
            b in a
              ? Object.defineProperty(a, b, {
                  value: d,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (a[b] = d);
            return a;
          }
          var r = h('./ChunkedFileData');
          n = (function (a) {
            function e(a) {
              if (!(this instanceof e))
                throw new TypeError('Cannot call a class as a function');
              var b = f(e).call(this);
              b =
                !b || ('object' !== m(b) && 'function' !== typeof b)
                  ? c(this)
                  : b;
              k(c(b), '_url', void 0);
              k(c(b), '_fileData', void 0);
              b._url = a;
              b._fileData = new r();
              return b;
            }
            b(e, a);
            t(
              e,
              [
                {
                  key: '_init',
                  value: function (a) {
                    e._config.avoidHeadRequests
                      ? this._fetchSizeWithGetRequest(a)
                      : this._fetchSizeWithHeadRequest(a);
                  },
                },
                {
                  key: '_fetchSizeWithHeadRequest',
                  value: function (a) {
                    var b = this;
                    this._makeXHRRequest('HEAD', null, {
                      onSuccess: function (d) {
                        (d = b._parseContentLength(d))
                          ? ((b._size = d), a.onSuccess())
                          : b._fetchSizeWithGetRequest(a);
                      },
                      onError: a.onError,
                    });
                  },
                },
                {
                  key: '_fetchSizeWithGetRequest',
                  value: function (a) {
                    var b = this,
                      d = this._roundRangeToChunkMultiple([0, 0]);
                    this._makeXHRRequest('GET', d, {
                      onSuccess: function (d) {
                        var c = b._parseContentRange(d);
                        d = b._getXhrResponseContent(d);
                        if (c) {
                          if (null == c.instanceLength) {
                            b._fetchEntireFile(a);
                            return;
                          }
                          b._size = c.instanceLength;
                        } else b._size = d.length;
                        b._fileData.addData(0, d);
                        a.onSuccess();
                      },
                      onError: a.onError,
                    });
                  },
                },
                {
                  key: '_fetchEntireFile',
                  value: function (a) {
                    var b = this;
                    this._makeXHRRequest('GET', null, {
                      onSuccess: function (d) {
                        d = b._getXhrResponseContent(d);
                        b._size = d.length;
                        b._fileData.addData(0, d);
                        a.onSuccess();
                      },
                      onError: a.onError,
                    });
                  },
                },
                {
                  key: '_getXhrResponseContent',
                  value: function (a) {
                    return a.responseBody || a.responseText || '';
                  },
                },
                {
                  key: '_parseContentLength',
                  value: function (a) {
                    a = this._getResponseHeader(a, 'Content-Length');
                    return null == a ? a : parseInt(a, 10);
                  },
                },
                {
                  key: '_parseContentRange',
                  value: function (a) {
                    if ((a = this._getResponseHeader(a, 'Content-Range'))) {
                      var b = a.match(/bytes (\d+)-(\d+)\/(?:(\d+)|\*)/i);
                      if (!b)
                        throw Error(
                          'FIXME: Unknown Content-Range syntax: ' + a,
                        );
                      return {
                        firstBytePosition: parseInt(b[1], 10),
                        lastBytePosition: parseInt(b[2], 10),
                        instanceLength: b[3] ? parseInt(b[3], 10) : null,
                      };
                    }
                    return null;
                  },
                },
                {
                  key: 'loadRange',
                  value: function (a, b) {
                    var d = this;
                    d._fileData.hasDataRange(a[0], Math.min(d._size, a[1]))
                      ? setTimeout(b.onSuccess, 1)
                      : ((a = this._roundRangeToChunkMultiple(a)),
                        (a[1] = Math.min(d._size, a[1])),
                        this._makeXHRRequest('GET', a, {
                          onSuccess: function (c) {
                            c = d._getXhrResponseContent(c);
                            d._fileData.addData(a[0], c);
                            b.onSuccess();
                          },
                          onError: b.onError,
                        }));
                  },
                },
                {
                  key: '_roundRangeToChunkMultiple',
                  value: function (a) {
                    return [
                      a[0],
                      a[0] + 1024 * Math.ceil((a[1] - a[0] + 1) / 1024) - 1,
                    ];
                  },
                },
                {
                  key: '_makeXHRRequest',
                  value: function (a, b, c) {
                    var d = this._createXHRObject();
                    d.open(a, this._url);
                    var f = function () {
                      if (200 === d.status || 206 === d.status) c.onSuccess(d);
                      else if (c.onError)
                        c.onError({
                          type: 'xhr',
                          info: 'Unexpected HTTP status ' + d.status + '.',
                          xhr: d,
                        });
                      d = null;
                    };
                    'undefined' !== typeof d.onload
                      ? ((d.onload = f),
                        (d.onerror = function () {
                          if (c.onError)
                            c.onError({
                              type: 'xhr',
                              info: 'Generic XHR error, check xhr object.',
                              xhr: d,
                            });
                        }))
                      : (d.onreadystatechange = function () {
                          4 === d.readyState && f();
                        });
                    e._config.timeoutInSec &&
                      ((d.timeout = 1e3 * e._config.timeoutInSec),
                      (d.ontimeout = function () {
                        if (c.onError)
                          c.onError({
                            type: 'xhr',
                            info:
                              'Timeout after ' +
                              d.timeout / 1e3 +
                              's. Use jsmediatags.Config.setXhrTimeout to override.',
                            xhr: d,
                          });
                      }));
                    d.overrideMimeType('text/plain; charset=x-user-defined');
                    b &&
                      this._setRequestHeader(
                        d,
                        'Range',
                        'bytes=' + b[0] + '-' + b[1],
                      );
                    this._setRequestHeader(
                      d,
                      'If-Modified-Since',
                      'Sat, 01 Jan 1970 00:00:00 GMT',
                    );
                    d.send(null);
                  },
                },
                {
                  key: '_setRequestHeader',
                  value: function (a, b, c) {
                    0 >
                      e._config.disallowedXhrHeaders.indexOf(b.toLowerCase()) &&
                      a.setRequestHeader(b, c);
                  },
                },
                {
                  key: '_hasResponseHeader',
                  value: function (a, b) {
                    a = a.getAllResponseHeaders();
                    if (!a) return !1;
                    a = a.split('\r\n');
                    for (var d = [], c = 0; c < a.length; c++)
                      d[c] = a[c].split(':')[0].toLowerCase();
                    return 0 <= d.indexOf(b.toLowerCase());
                  },
                },
                {
                  key: '_getResponseHeader',
                  value: function (a, b) {
                    return this._hasResponseHeader(a, b)
                      ? a.getResponseHeader(b)
                      : null;
                  },
                },
                {
                  key: 'getByteAt',
                  value: function (a) {
                    return this._fileData.getByteAt(a).charCodeAt(0) & 255;
                  },
                },
                {
                  key: '_isWebWorker',
                  value: function () {
                    return (
                      'undefined' !== typeof WorkerGlobalScope &&
                      self instanceof WorkerGlobalScope
                    );
                  },
                },
                {
                  key: '_createXHRObject',
                  value: function () {
                    if ('undefined' === typeof window && !this._isWebWorker())
                      return new (h('xhr2').XMLHttpRequest)();
                    if ('undefined' !== typeof XMLHttpRequest)
                      return new XMLHttpRequest();
                    throw Error('XMLHttpRequest is not supported');
                  },
                },
              ],
              [
                {
                  key: 'canReadFile',
                  value: function (a) {
                    return 'string' === typeof a && /^[a-z]+:\/\//i.test(a);
                  },
                },
                {
                  key: 'setConfig',
                  value: function (a) {
                    for (var b in a)
                      a.hasOwnProperty(b) && (this._config[b] = a[b]);
                    a = this._config.disallowedXhrHeaders;
                    for (b = 0; b < a.length; b++) a[b] = a[b].toLowerCase();
                  },
                },
              ],
            );
            return e;
          })(h('./MediaFileReader'));
          k(n, '_config', void 0);
          n._config = {
            avoidHeadRequests: !1,
            disallowedXhrHeaders: [],
            timeoutInSec: 30,
          };
          p.exports = n;
        },
        { './ChunkedFileData': 5, './MediaFileReader': 11, xhr2: 2 },
      ],
      15: [
        function (h, p, n) {
          function m(a, b) {
            if (!(a instanceof b))
              throw new TypeError('Cannot call a class as a function');
          }
          function q(a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.enumerable = d.enumerable || !1;
              d.configurable = !0;
              'value' in d && (d.writable = !0);
              Object.defineProperty(a, d.key, d);
            }
          }
          function t(a, b, c) {
            b && q(a.prototype, b);
            c && q(a, c);
            return a;
          }
          function f(a, b, c) {
            b in a
              ? Object.defineProperty(a, b, {
                  value: c,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (a[b] = c);
            return a;
          }
          function c(a, b) {
            var c = 0 > a.offset && (-a.offset > b || 0 < a.offset + a.length);
            return !((0 <= a.offset && a.offset + a.length >= b) || c);
          }
          h('./MediaFileReader');
          var b = h('./XhrFileReader'),
            g = h('./BlobFileReader'),
            k = h('./ArrayFileReader');
          h('./MediaTagReader');
          var r = h('./ID3v1TagReader'),
            a = h('./ID3v2TagReader'),
            e = h('./MP4TagReader'),
            d = h('./FLACTagReader'),
            l = [],
            u = [],
            w = (function () {
              function a(b) {
                m(this, a);
                f(this, '_file', void 0);
                f(this, '_tagsToRead', void 0);
                f(this, '_fileReader', void 0);
                f(this, '_tagReader', void 0);
                this._file = b;
              }
              t(a, [
                {
                  key: 'setTagsToRead',
                  value: function (a) {
                    this._tagsToRead = a;
                    return this;
                  },
                },
                {
                  key: 'setFileReader',
                  value: function (a) {
                    this._fileReader = a;
                    return this;
                  },
                },
                {
                  key: 'setTagReader',
                  value: function (a) {
                    this._tagReader = a;
                    return this;
                  },
                },
                {
                  key: 'read',
                  value: function (a) {
                    var b = new (this._getFileReader())(this._file),
                      c = this;
                    b.init({
                      onSuccess: function () {
                        c._getTagReader(b, {
                          onSuccess: function (d) {
                            new d(b).setTagsToRead(c._tagsToRead).read(a);
                          },
                          onError: a.onError,
                        });
                      },
                      onError: a.onError,
                    });
                  },
                },
                {
                  key: '_getFileReader',
                  value: function () {
                    return this._fileReader
                      ? this._fileReader
                      : this._findFileReader();
                  },
                },
                {
                  key: '_findFileReader',
                  value: function () {
                    for (var a = 0; a < l.length; a++)
                      if (l[a].canReadFile(this._file)) return l[a];
                    throw Error(
                      'No suitable file reader found for ' + this._file,
                    );
                  },
                },
                {
                  key: '_getTagReader',
                  value: function (a, b) {
                    if (this._tagReader) {
                      var c = this._tagReader;
                      setTimeout(function () {
                        b.onSuccess(c);
                      }, 1);
                    } else this._findTagReader(a, b);
                  },
                },
                {
                  key: '_findTagReader',
                  value: function (a, b) {
                    for (
                      var d = [], e = [], f = a.getSize(), g = 0;
                      g < u.length;
                      g++
                    ) {
                      var h = u[g].getTagIdentifierByteRange();
                      c(h, f) &&
                        ((0 <= h.offset && h.offset < f / 2) ||
                        (0 > h.offset && h.offset < -f / 2)
                          ? d.push(u[g])
                          : e.push(u[g]));
                    }
                    var k = !1;
                    g = {
                      onSuccess: function () {
                        if (k) {
                          for (var d = 0; d < u.length; d++) {
                            var e = u[d].getTagIdentifierByteRange();
                            if (c(e, f)) {
                              try {
                                var g = a.getBytesAt(
                                  0 <= e.offset ? e.offset : e.offset + f,
                                  e.length,
                                );
                              } catch (x) {
                                if (b.onError)
                                  b.onError({
                                    type: 'fileReader',
                                    info: x.message,
                                  });
                                return;
                              }
                              if (u[d].canReadTagFormat(g)) {
                                b.onSuccess(u[d]);
                                return;
                              }
                            }
                          }
                          if (b.onError)
                            b.onError({
                              type: 'tagFormat',
                              info: 'No suitable tag reader found',
                            });
                        } else k = !0;
                      },
                      onError: b.onError,
                    };
                    this._loadTagIdentifierRanges(a, d, g);
                    this._loadTagIdentifierRanges(a, e, g);
                  },
                },
                {
                  key: '_loadTagIdentifierRanges',
                  value: function (a, b, c) {
                    if (0 === b.length) setTimeout(c.onSuccess, 1);
                    else {
                      for (
                        var d = [Number.MAX_VALUE, 0], e = a.getSize(), f = 0;
                        f < b.length;
                        f++
                      ) {
                        var g = b[f].getTagIdentifierByteRange(),
                          h = 0 <= g.offset ? g.offset : g.offset + e;
                        g = h + g.length - 1;
                        d[0] = Math.min(h, d[0]);
                        d[1] = Math.max(g, d[1]);
                      }
                      a.loadRange(d, c);
                    }
                  },
                },
              ]);
              return a;
            })();
          n = (function () {
            function a() {
              m(this, a);
            }
            t(a, null, [
              {
                key: 'addFileReader',
                value: function (b) {
                  l.push(b);
                  return a;
                },
              },
              {
                key: 'addTagReader',
                value: function (b) {
                  u.push(b);
                  return a;
                },
              },
              {
                key: 'removeTagReader',
                value: function (b) {
                  b = u.indexOf(b);
                  0 <= b && u.splice(b, 1);
                  return a;
                },
              },
              {
                key: 'EXPERIMENTAL_avoidHeadRequests',
                value: function () {
                  b.setConfig({ avoidHeadRequests: !0 });
                },
              },
              {
                key: 'setDisallowedXhrHeaders',
                value: function (a) {
                  b.setConfig({ disallowedXhrHeaders: a });
                },
              },
              {
                key: 'setXhrTimeoutInSec',
                value: function (a) {
                  b.setConfig({ timeoutInSec: a });
                },
              },
            ]);
            return a;
          })();
          n.addFileReader(b)
            .addFileReader(g)
            .addFileReader(k)
            .addTagReader(a)
            .addTagReader(r)
            .addTagReader(e)
            .addTagReader(d);
          'undefined' === typeof process ||
            process.browser ||
            ((h =
              'undefined' !== typeof navigator &&
              'ReactNative' === navigator.product
                ? h('./ReactNativeFileReader')
                : h('./NodeFileReader')),
            n.addFileReader(h));
          p.exports = {
            read: function (a, b) {
              new w(a).read(b);
            },
            Reader: w,
            Config: n,
          };
        },
        {
          './ArrayFileReader': 3,
          './BlobFileReader': 4,
          './FLACTagReader': 6,
          './ID3v1TagReader': 7,
          './ID3v2TagReader': 9,
          './MP4TagReader': 10,
          './MediaFileReader': 11,
          './MediaTagReader': 12,
          './NodeFileReader': 1,
          './ReactNativeFileReader': 1,
          './XhrFileReader': 14,
        },
      ],
    },
    {},
    [15],
  )(15);
});
