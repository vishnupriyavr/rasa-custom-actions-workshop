(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    "+ntK": function (t, e, n) {
      var i,
        r = n("Tnqc"),
        s = n("WLGk"),
        o = n("ypnn"),
        a = n("zMFY"),
        l = n("44nb");
      "undefined" != typeof ArrayBuffer && (i = n("g5Dd"));
      var c =
          "undefined" != typeof navigator &&
          /Android/i.test(navigator.userAgent),
        h =
          "undefined" != typeof navigator &&
          /PhantomJS/i.test(navigator.userAgent),
        u = c || h;
      e.protocol = 3;
      var d = (e.packets = {
          open: 0,
          close: 1,
          ping: 2,
          pong: 3,
          message: 4,
          upgrade: 5,
          noop: 6,
        }),
        p = r(d),
        f = { type: "error", data: "parser error" },
        m = n("14A5");
      function g(t, e, n) {
        for (
          var i = new Array(t.length),
            r = a(t.length, n),
            s = function (t, n, r) {
              e(n, function (e, n) {
                (i[t] = n), r(e, i);
              });
            },
            o = 0;
          o < t.length;
          o++
        )
          s(o, t[o], r);
      }
      (e.encodePacket = function (t, n, i, r) {
        "function" == typeof n && ((r = n), (n = !1)),
          "function" == typeof i && ((r = i), (i = null));
        var s = void 0 === t.data ? void 0 : t.data.buffer || t.data;
        if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer)
          return (function (t, n, i) {
            if (!n) return e.encodeBase64Packet(t, i);
            var r = t.data,
              s = new Uint8Array(r),
              o = new Uint8Array(1 + r.byteLength);
            o[0] = d[t.type];
            for (var a = 0; a < s.length; a++) o[a + 1] = s[a];
            return i(o.buffer);
          })(t, n, r);
        if (void 0 !== m && s instanceof m)
          return (function (t, n, i) {
            if (!n) return e.encodeBase64Packet(t, i);
            if (u)
              return (function (t, n, i) {
                if (!n) return e.encodeBase64Packet(t, i);
                var r = new FileReader();
                return (
                  (r.onload = function () {
                    e.encodePacket({ type: t.type, data: r.result }, n, !0, i);
                  }),
                  r.readAsArrayBuffer(t.data)
                );
              })(t, n, i);
            var r = new Uint8Array(1);
            return (r[0] = d[t.type]), i(new m([r.buffer, t.data]));
          })(t, n, r);
        if (s && s.base64)
          return (function (t, n) {
            return n("b" + e.packets[t.type] + t.data.data);
          })(t, r);
        var o = d[t.type];
        return (
          void 0 !== t.data &&
            (o += i
              ? l.encode(String(t.data), { strict: !1 })
              : String(t.data)),
          r("" + o)
        );
      }),
        (e.encodeBase64Packet = function (t, n) {
          var i,
            r = "b" + e.packets[t.type];
          if (void 0 !== m && t.data instanceof m) {
            var s = new FileReader();
            return (
              (s.onload = function () {
                var t = s.result.split(",")[1];
                n(r + t);
              }),
              s.readAsDataURL(t.data)
            );
          }
          try {
            i = String.fromCharCode.apply(null, new Uint8Array(t.data));
          } catch (c) {
            for (
              var o = new Uint8Array(t.data), a = new Array(o.length), l = 0;
              l < o.length;
              l++
            )
              a[l] = o[l];
            i = String.fromCharCode.apply(null, a);
          }
          return (r += btoa(i)), n(r);
        }),
        (e.decodePacket = function (t, n, i) {
          if (void 0 === t) return f;
          if ("string" == typeof t) {
            if ("b" === t.charAt(0))
              return e.decodeBase64Packet(t.substr(1), n);
            if (
              i &&
              !1 ===
                (t = (function (t) {
                  try {
                    t = l.decode(t, { strict: !1 });
                  } catch (e) {
                    return !1;
                  }
                  return t;
                })(t))
            )
              return f;
            var r = t.charAt(0);
            return Number(r) == r && p[r]
              ? t.length > 1
                ? { type: p[r], data: t.substring(1) }
                : { type: p[r] }
              : f;
          }
          r = new Uint8Array(t)[0];
          var s = o(t, 1);
          return m && "blob" === n && (s = new m([s])), { type: p[r], data: s };
        }),
        (e.decodeBase64Packet = function (t, e) {
          var n = p[t.charAt(0)];
          if (!i) return { type: n, data: { base64: !0, data: t.substr(1) } };
          var r = i.decode(t.substr(1));
          return "blob" === e && m && (r = new m([r])), { type: n, data: r };
        }),
        (e.encodePayload = function (t, n, i) {
          "function" == typeof n && ((i = n), (n = null));
          var r = s(t);
          return n && r
            ? m && !u
              ? e.encodePayloadAsBlob(t, i)
              : e.encodePayloadAsArrayBuffer(t, i)
            : t.length
            ? void g(
                t,
                function (t, i) {
                  e.encodePacket(t, !!r && n, !1, function (t) {
                    i(
                      null,
                      (function (t) {
                        return t.length + ":" + t;
                      })(t)
                    );
                  });
                },
                function (t, e) {
                  return i(e.join(""));
                }
              )
            : i("0:");
        }),
        (e.decodePayload = function (t, n, i) {
          if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, i);
          var r;
          if (("function" == typeof n && ((i = n), (n = null)), "" === t))
            return i(f, 0, 1);
          for (var s, o, a = "", l = 0, c = t.length; l < c; l++) {
            var h = t.charAt(l);
            if (":" === h) {
              if ("" === a || a != (s = Number(a))) return i(f, 0, 1);
              if (a != (o = t.substr(l + 1, s)).length) return i(f, 0, 1);
              if (o.length) {
                if (
                  ((r = e.decodePacket(o, n, !1)),
                  f.type === r.type && f.data === r.data)
                )
                  return i(f, 0, 1);
                if (!1 === i(r, l + s, c)) return;
              }
              (l += s), (a = "");
            } else a += h;
          }
          return "" !== a ? i(f, 0, 1) : void 0;
        }),
        (e.encodePayloadAsArrayBuffer = function (t, n) {
          if (!t.length) return n(new ArrayBuffer(0));
          g(
            t,
            function (t, n) {
              e.encodePacket(t, !0, !0, function (t) {
                return n(null, t);
              });
            },
            function (t, e) {
              var i = e.reduce(function (t, e) {
                  var n;
                  return (
                    t +
                    (n =
                      "string" == typeof e ? e.length : e.byteLength).toString()
                      .length +
                    n +
                    2
                  );
                }, 0),
                r = new Uint8Array(i),
                s = 0;
              return (
                e.forEach(function (t) {
                  var e = "string" == typeof t,
                    n = t;
                  if (e) {
                    for (
                      var i = new Uint8Array(t.length), o = 0;
                      o < t.length;
                      o++
                    )
                      i[o] = t.charCodeAt(o);
                    n = i.buffer;
                  }
                  r[s++] = e ? 0 : 1;
                  var a = n.byteLength.toString();
                  for (o = 0; o < a.length; o++) r[s++] = parseInt(a[o]);
                  for (
                    r[s++] = 255, i = new Uint8Array(n), o = 0;
                    o < i.length;
                    o++
                  )
                    r[s++] = i[o];
                }),
                n(r.buffer)
              );
            }
          );
        }),
        (e.encodePayloadAsBlob = function (t, n) {
          g(
            t,
            function (t, n) {
              e.encodePacket(t, !0, !0, function (t) {
                var e = new Uint8Array(1);
                if (((e[0] = 1), "string" == typeof t)) {
                  for (
                    var i = new Uint8Array(t.length), r = 0;
                    r < t.length;
                    r++
                  )
                    i[r] = t.charCodeAt(r);
                  (t = i.buffer), (e[0] = 0);
                }
                var s = (t instanceof ArrayBuffer
                    ? t.byteLength
                    : t.size
                  ).toString(),
                  o = new Uint8Array(s.length + 1);
                for (r = 0; r < s.length; r++) o[r] = parseInt(s[r]);
                if (((o[s.length] = 255), m)) {
                  var a = new m([e.buffer, o.buffer, t]);
                  n(null, a);
                }
              });
            },
            function (t, e) {
              return n(new m(e));
            }
          );
        }),
        (e.decodePayloadAsBinary = function (t, n, i) {
          "function" == typeof n && ((i = n), (n = null));
          for (var r = t, s = []; r.byteLength > 0; ) {
            for (
              var a = new Uint8Array(r), l = 0 === a[0], c = "", h = 1;
              255 !== a[h];
              h++
            ) {
              if (c.length > 310) return i(f, 0, 1);
              c += a[h];
            }
            (r = o(r, 2 + c.length)), (c = parseInt(c));
            var u = o(r, 0, c);
            if (l)
              try {
                u = String.fromCharCode.apply(null, new Uint8Array(u));
              } catch (m) {
                var d = new Uint8Array(u);
                for (u = "", h = 0; h < d.length; h++)
                  u += String.fromCharCode(d[h]);
              }
            s.push(u), (r = o(r, c));
          }
          var p = s.length;
          s.forEach(function (t, r) {
            i(e.decodePacket(t, n, !0), r, p);
          });
        });
    },
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    "0KJs": function (t, e, n) {
      function i() {
        var t;
        try {
          t = e.storage.debug;
        } catch (n) {}
        return (
          !t &&
            "undefined" != typeof process &&
            "env" in process &&
            (t = process.env.DEBUG),
          t
        );
      }
      ((e = t.exports = n("FXYA")).log = function () {
        return (
          "object" == typeof console &&
          console.log &&
          Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (e.formatArgs = function (t) {
          var n = this.useColors;
          if (
            ((t[0] =
              (n ? "%c" : "") +
              this.namespace +
              (n ? " %c" : " ") +
              t[0] +
              (n ? "%c " : " ") +
              "+" +
              e.humanize(this.diff)),
            n)
          ) {
            var i = "color: " + this.color;
            t.splice(1, 0, i, "color: inherit");
            var r = 0,
              s = 0;
            t[0].replace(/%[a-zA-Z%]/g, function (t) {
              "%%" !== t && (r++, "%c" === t && (s = r));
            }),
              t.splice(s, 0, i);
          }
        }),
        (e.save = function (t) {
          try {
            null == t ? e.storage.removeItem("debug") : (e.storage.debug = t);
          } catch (n) {}
        }),
        (e.load = i),
        (e.useColors = function () {
          return (
            !(
              "undefined" == typeof window ||
              !window.process ||
              "renderer" !== window.process.type
            ) ||
            (("undefined" == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }),
        (e.storage =
          "undefined" != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function () {
                try {
                  return window.localStorage;
                } catch (t) {}
              })()),
        (e.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (e.formatters.j = function (t) {
          try {
            return JSON.stringify(t);
          } catch (e) {
            return "[UnexpectedJSONParseError]: " + e.message;
          }
        }),
        e.enable(i());
    },
    "0z79": function (t, e, n) {
      var i = n("AdPF"),
        r = n("CUme"),
        s = n("1Mk5"),
        o = n("Yvos"),
        a = n("NOtv")("engine.io-client:polling-xhr"),
        l = n("2UHX");
      function c() {}
      function h(t) {
        if (
          (r.call(this, t),
          (this.requestTimeout = t.requestTimeout),
          (this.extraHeaders = t.extraHeaders),
          "undefined" != typeof location)
        ) {
          var e = "https:" === location.protocol,
            n = location.port;
          n || (n = e ? 443 : 80),
            (this.xd =
              ("undefined" != typeof location &&
                t.hostname !== location.hostname) ||
              n !== t.port),
            (this.xs = t.secure !== e);
        }
      }
      function u(t) {
        (this.method = t.method || "GET"),
          (this.uri = t.uri),
          (this.xd = !!t.xd),
          (this.xs = !!t.xs),
          (this.async = !1 !== t.async),
          (this.data = void 0 !== t.data ? t.data : null),
          (this.agent = t.agent),
          (this.isBinary = t.isBinary),
          (this.supportsBinary = t.supportsBinary),
          (this.enablesXDR = t.enablesXDR),
          (this.withCredentials = t.withCredentials),
          (this.requestTimeout = t.requestTimeout),
          (this.pfx = t.pfx),
          (this.key = t.key),
          (this.passphrase = t.passphrase),
          (this.cert = t.cert),
          (this.ca = t.ca),
          (this.ciphers = t.ciphers),
          (this.rejectUnauthorized = t.rejectUnauthorized),
          (this.extraHeaders = t.extraHeaders),
          this.create();
      }
      function d() {
        for (var t in u.requests)
          u.requests.hasOwnProperty(t) && u.requests[t].abort();
      }
      (t.exports = h),
        (t.exports.Request = u),
        o(h, r),
        (h.prototype.supportsBinary = !0),
        (h.prototype.request = function (t) {
          return (
            ((t = t || {}).uri = this.uri()),
            (t.xd = this.xd),
            (t.xs = this.xs),
            (t.agent = this.agent || !1),
            (t.supportsBinary = this.supportsBinary),
            (t.enablesXDR = this.enablesXDR),
            (t.withCredentials = this.withCredentials),
            (t.pfx = this.pfx),
            (t.key = this.key),
            (t.passphrase = this.passphrase),
            (t.cert = this.cert),
            (t.ca = this.ca),
            (t.ciphers = this.ciphers),
            (t.rejectUnauthorized = this.rejectUnauthorized),
            (t.requestTimeout = this.requestTimeout),
            (t.extraHeaders = this.extraHeaders),
            new u(t)
          );
        }),
        (h.prototype.doWrite = function (t, e) {
          var n = this.request({
              method: "POST",
              data: t,
              isBinary: "string" != typeof t && void 0 !== t,
            }),
            i = this;
          n.on("success", e),
            n.on("error", function (t) {
              i.onError("xhr post error", t);
            }),
            (this.sendXhr = n);
        }),
        (h.prototype.doPoll = function () {
          a("xhr poll");
          var t = this.request(),
            e = this;
          t.on("data", function (t) {
            e.onData(t);
          }),
            t.on("error", function (t) {
              e.onError("xhr poll error", t);
            }),
            (this.pollXhr = t);
        }),
        s(u.prototype),
        (u.prototype.create = function () {
          var t = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR,
          };
          (t.pfx = this.pfx),
            (t.key = this.key),
            (t.passphrase = this.passphrase),
            (t.cert = this.cert),
            (t.ca = this.ca),
            (t.ciphers = this.ciphers),
            (t.rejectUnauthorized = this.rejectUnauthorized);
          var e = (this.xhr = new i(t)),
            n = this;
          try {
            a("xhr open %s: %s", this.method, this.uri),
              e.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders)
                for (var r in (e.setDisableHeaderCheck &&
                  e.setDisableHeaderCheck(!0),
                this.extraHeaders))
                  this.extraHeaders.hasOwnProperty(r) &&
                    e.setRequestHeader(r, this.extraHeaders[r]);
            } catch (s) {}
            if ("POST" === this.method)
              try {
                e.setRequestHeader(
                  "Content-type",
                  this.isBinary
                    ? "application/octet-stream"
                    : "text/plain;charset=UTF-8"
                );
              } catch (s) {}
            try {
              e.setRequestHeader("Accept", "*/*");
            } catch (s) {}
            "withCredentials" in e &&
              (e.withCredentials = this.withCredentials),
              this.requestTimeout && (e.timeout = this.requestTimeout),
              this.hasXDR()
                ? ((e.onload = function () {
                    n.onLoad();
                  }),
                  (e.onerror = function () {
                    n.onError(e.responseText);
                  }))
                : (e.onreadystatechange = function () {
                    if (2 === e.readyState)
                      try {
                        var t = e.getResponseHeader("Content-Type");
                        ((n.supportsBinary &&
                          "application/octet-stream" === t) ||
                          "application/octet-stream; charset=UTF-8" === t) &&
                          (e.responseType = "arraybuffer");
                      } catch (s) {}
                    4 === e.readyState &&
                      (200 === e.status || 1223 === e.status
                        ? n.onLoad()
                        : setTimeout(function () {
                            n.onError(
                              "number" == typeof e.status ? e.status : 0
                            );
                          }, 0));
                  }),
              a("xhr data %s", this.data),
              e.send(this.data);
          } catch (s) {
            return void setTimeout(function () {
              n.onError(s);
            }, 0);
          }
          "undefined" != typeof document &&
            ((this.index = u.requestsCount++), (u.requests[this.index] = this));
        }),
        (u.prototype.onSuccess = function () {
          this.emit("success"), this.cleanup();
        }),
        (u.prototype.onData = function (t) {
          this.emit("data", t), this.onSuccess();
        }),
        (u.prototype.onError = function (t) {
          this.emit("error", t), this.cleanup(!0);
        }),
        (u.prototype.cleanup = function (t) {
          if (null != this.xhr) {
            if (
              (this.hasXDR()
                ? (this.xhr.onload = this.xhr.onerror = c)
                : (this.xhr.onreadystatechange = c),
              t)
            )
              try {
                this.xhr.abort();
              } catch (e) {}
            "undefined" != typeof document && delete u.requests[this.index],
              (this.xhr = null);
          }
        }),
        (u.prototype.onLoad = function () {
          var t;
          try {
            var e;
            try {
              e = this.xhr.getResponseHeader("Content-Type");
            } catch (n) {}
            t =
              (("application/octet-stream" === e ||
                "application/octet-stream; charset=UTF-8" === e) &&
                this.xhr.response) ||
              this.xhr.responseText;
          } catch (n) {
            this.onError(n);
          }
          null != t && this.onData(t);
        }),
        (u.prototype.hasXDR = function () {
          return (
            "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
          );
        }),
        (u.prototype.abort = function () {
          this.cleanup();
        }),
        (u.requestsCount = 0),
        (u.requests = {}),
        "undefined" != typeof document &&
          ("function" == typeof attachEvent
            ? attachEvent("onunload", d)
            : "function" == typeof addEventListener &&
              addEventListener(
                "onpagehide" in l ? "pagehide" : "unload",
                d,
                !1
              ));
    },
    1: function (t, e) {},
    "14A5": function (t, e) {
      var n =
          void 0 !== n
            ? n
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : "undefined" != typeof MSBlobBuilder
            ? MSBlobBuilder
            : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        i = (function () {
          try {
            return 2 === new Blob(["hi"]).size;
          } catch (t) {
            return !1;
          }
        })(),
        r =
          i &&
          (function () {
            try {
              return 2 === new Blob([new Uint8Array([1, 2])]).size;
            } catch (t) {
              return !1;
            }
          })(),
        s = n && n.prototype.append && n.prototype.getBlob;
      function o(t) {
        return t.map(function (t) {
          if (t.buffer instanceof ArrayBuffer) {
            var e = t.buffer;
            if (t.byteLength !== e.byteLength) {
              var n = new Uint8Array(t.byteLength);
              n.set(new Uint8Array(e, t.byteOffset, t.byteLength)),
                (e = n.buffer);
            }
            return e;
          }
          return t;
        });
      }
      function a(t, e) {
        e = e || {};
        var i = new n();
        return (
          o(t).forEach(function (t) {
            i.append(t);
          }),
          e.type ? i.getBlob(e.type) : i.getBlob()
        );
      }
      function l(t, e) {
        return new Blob(o(t), e || {});
      }
      "undefined" != typeof Blob &&
        ((a.prototype = Blob.prototype), (l.prototype = Blob.prototype)),
        (t.exports = i ? (r ? Blob : l) : s ? a : void 0);
    },
    "1Mk5": function (t, e, n) {
      function i(t) {
        if (t)
          return (function (t) {
            for (var e in i.prototype) t[e] = i.prototype[e];
            return t;
          })(t);
      }
      (t.exports = i),
        (i.prototype.on = i.prototype.addEventListener = function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (i.prototype.once = function (t, e) {
          function n() {
            this.off(t, n), e.apply(this, arguments);
          }
          return (n.fn = e), this.on(t, n), this;
        }),
        (i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function (
          t,
          e
        ) {
          if (
            ((this._callbacks = this._callbacks || {}), 0 == arguments.length)
          )
            return (this._callbacks = {}), this;
          var n,
            i = this._callbacks["$" + t];
          if (!i) return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t], this;
          for (var r = 0; r < i.length; r++)
            if ((n = i[r]) === e || n.fn === e) {
              i.splice(r, 1);
              break;
            }
          return this;
        }),
        (i.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          var e = [].slice.call(arguments, 1),
            n = this._callbacks["$" + t];
          if (n)
            for (var i = 0, r = (n = n.slice(0)).length; i < r; ++i)
              n[i].apply(this, e);
          return this;
        }),
        (i.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (i.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
    },
    "2Dig": function (t, e) {
      t.exports = function (t, e, n) {
        return (
          t.on(e, n),
          {
            destroy: function () {
              t.removeListener(e, n);
            },
          }
        );
      };
    },
    "2UHX": function (t, e) {
      t.exports =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : Function("return this")();
    },
    "2pII": function (t, e, n) {
      var i = n("akSB"),
        r = n("1Mk5"),
        s = n("NOtv")("engine.io-client:socket"),
        o = n("7jRU"),
        a = n("+ntK"),
        l = n("Uxeu"),
        c = n("TypT");
      function h(t, e) {
        if (!(this instanceof h)) return new h(t, e);
        (e = e || {}),
          t && "object" == typeof t && ((e = t), (t = null)),
          t
            ? ((t = l(t)),
              (e.hostname = t.host),
              (e.secure = "https" === t.protocol || "wss" === t.protocol),
              (e.port = t.port),
              t.query && (e.query = t.query))
            : e.host && (e.hostname = l(e.host).host),
          (this.secure =
            null != e.secure
              ? e.secure
              : "undefined" != typeof location &&
                "https:" === location.protocol),
          e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
          (this.agent = e.agent || !1),
          (this.hostname =
            e.hostname ||
            ("undefined" != typeof location
              ? location.hostname
              : "35.192.198.9")),
          (this.port =
            e.port ||
            ("undefined" != typeof location && location.port
              ? location.port
              : this.secure
              ? 443
              : 80)),
          (this.query = e.query || {}),
          "string" == typeof this.query && (this.query = c.decode(this.query)),
          (this.upgrade = !1 !== e.upgrade),
          (this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/"),
          (this.forceJSONP = !!e.forceJSONP),
          (this.jsonp = !1 !== e.jsonp),
          (this.forceBase64 = !!e.forceBase64),
          (this.enablesXDR = !!e.enablesXDR),
          (this.withCredentials = !1 !== e.withCredentials),
          (this.timestampParam = e.timestampParam || "t"),
          (this.timestampRequests = e.timestampRequests),
          (this.transports = e.transports || ["polling", "websocket"]),
          (this.transportOptions = e.transportOptions || {}),
          (this.readyState = ""),
          (this.writeBuffer = []),
          (this.prevBufferLen = 0),
          (this.policyPort = e.policyPort || 843),
          (this.rememberUpgrade = e.rememberUpgrade || !1),
          (this.binaryType = null),
          (this.onlyBinaryUpgrades = e.onlyBinaryUpgrades),
          (this.perMessageDeflate =
            !1 !== e.perMessageDeflate && (e.perMessageDeflate || {})),
          !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
          this.perMessageDeflate &&
            null == this.perMessageDeflate.threshold &&
            (this.perMessageDeflate.threshold = 1024),
          (this.pfx = e.pfx || null),
          (this.key = e.key || null),
          (this.passphrase = e.passphrase || null),
          (this.cert = e.cert || null),
          (this.ca = e.ca || null),
          (this.ciphers = e.ciphers || null),
          (this.rejectUnauthorized =
            void 0 === e.rejectUnauthorized || e.rejectUnauthorized),
          (this.forceNode = !!e.forceNode),
          (this.isReactNative =
            "undefined" != typeof navigator &&
            "string" == typeof navigator.product &&
            "reactnative" === navigator.product.toLowerCase()),
          ("undefined" == typeof self || this.isReactNative) &&
            (e.extraHeaders &&
              Object.keys(e.extraHeaders).length > 0 &&
              (this.extraHeaders = e.extraHeaders),
            e.localAddress && (this.localAddress = e.localAddress)),
          (this.id = null),
          (this.upgrades = null),
          (this.pingInterval = null),
          (this.pingTimeout = null),
          (this.pingIntervalTimer = null),
          (this.pingTimeoutTimer = null),
          this.open();
      }
      (t.exports = h),
        (h.priorWebsocketSuccess = !1),
        r(h.prototype),
        (h.protocol = a.protocol),
        (h.Socket = h),
        (h.Transport = n("Gbct")),
        (h.transports = n("akSB")),
        (h.parser = n("+ntK")),
        (h.prototype.createTransport = function (t) {
          s('creating transport "%s"', t);
          var e = (function (t) {
            var e = {};
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e;
          })(this.query);
          (e.EIO = a.protocol), (e.transport = t);
          var n = this.transportOptions[t] || {};
          return (
            this.id && (e.sid = this.id),
            new i[t]({
              query: e,
              socket: this,
              agent: n.agent || this.agent,
              hostname: n.hostname || this.hostname,
              port: n.port || this.port,
              secure: n.secure || this.secure,
              path: n.path || this.path,
              forceJSONP: n.forceJSONP || this.forceJSONP,
              jsonp: n.jsonp || this.jsonp,
              forceBase64: n.forceBase64 || this.forceBase64,
              enablesXDR: n.enablesXDR || this.enablesXDR,
              withCredentials: n.withCredentials || this.withCredentials,
              timestampRequests: n.timestampRequests || this.timestampRequests,
              timestampParam: n.timestampParam || this.timestampParam,
              policyPort: n.policyPort || this.policyPort,
              pfx: n.pfx || this.pfx,
              key: n.key || this.key,
              passphrase: n.passphrase || this.passphrase,
              cert: n.cert || this.cert,
              ca: n.ca || this.ca,
              ciphers: n.ciphers || this.ciphers,
              rejectUnauthorized:
                n.rejectUnauthorized || this.rejectUnauthorized,
              perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
              extraHeaders: n.extraHeaders || this.extraHeaders,
              forceNode: n.forceNode || this.forceNode,
              localAddress: n.localAddress || this.localAddress,
              requestTimeout: n.requestTimeout || this.requestTimeout,
              protocols: n.protocols || void 0,
              isReactNative: this.isReactNative,
            })
          );
        }),
        (h.prototype.open = function () {
          var t;
          if (
            this.rememberUpgrade &&
            h.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            t = "websocket";
          else {
            if (0 === this.transports.length) {
              var e = this;
              return void setTimeout(function () {
                e.emit("error", "No transports available");
              }, 0);
            }
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (n) {
            return this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }),
        (h.prototype.setTransport = function (t) {
          s("setting transport %s", t.name);
          var e = this;
          this.transport &&
            (s("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            (this.transport = t),
            t
              .on("drain", function () {
                e.onDrain();
              })
              .on("packet", function (t) {
                e.onPacket(t);
              })
              .on("error", function (t) {
                e.onError(t);
              })
              .on("close", function () {
                e.onClose("transport close");
              });
        }),
        (h.prototype.probe = function (t) {
          s('probing transport "%s"', t);
          var e = this.createTransport(t, { probe: 1 }),
            n = !1,
            i = this;
          function r() {
            i.onlyBinaryUpgrades &&
              (n = n || (!this.supportsBinary && i.transport.supportsBinary)),
              n ||
                (s('probe transport "%s" opened', t),
                e.send([{ type: "ping", data: "probe" }]),
                e.once("packet", function (r) {
                  if (!n)
                    if ("pong" === r.type && "probe" === r.data) {
                      if (
                        (s('probe transport "%s" pong', t),
                        (i.upgrading = !0),
                        i.emit("upgrading", e),
                        !e)
                      )
                        return;
                      (h.priorWebsocketSuccess = "websocket" === e.name),
                        s('pausing current transport "%s"', i.transport.name),
                        i.transport.pause(function () {
                          n ||
                            ("closed" !== i.readyState &&
                              (s(
                                "changing transport and sending upgrade packet"
                              ),
                              d(),
                              i.setTransport(e),
                              e.send([{ type: "upgrade" }]),
                              i.emit("upgrade", e),
                              (e = null),
                              (i.upgrading = !1),
                              i.flush()));
                        });
                    } else {
                      s('probe transport "%s" failed', t);
                      var o = new Error("probe error");
                      (o.transport = e.name), i.emit("upgradeError", o);
                    }
                }));
          }
          function o() {
            n || ((n = !0), d(), e.close(), (e = null));
          }
          function a(n) {
            var r = new Error("probe error: " + n);
            (r.transport = e.name),
              o(),
              s('probe transport "%s" failed because of error: %s', t, n),
              i.emit("upgradeError", r);
          }
          function l() {
            a("transport closed");
          }
          function c() {
            a("socket closed");
          }
          function u(t) {
            e &&
              t.name !== e.name &&
              (s('"%s" works - aborting "%s"', t.name, e.name), o());
          }
          function d() {
            e.removeListener("open", r),
              e.removeListener("error", a),
              e.removeListener("close", l),
              i.removeListener("close", c),
              i.removeListener("upgrading", u);
          }
          (h.priorWebsocketSuccess = !1),
            e.once("open", r),
            e.once("error", a),
            e.once("close", l),
            this.once("close", c),
            this.once("upgrading", u),
            e.open();
        }),
        (h.prototype.onOpen = function () {
          if (
            (s("socket open"),
            (this.readyState = "open"),
            (h.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause)
          ) {
            s("starting upgrade probes");
            for (var t = 0, e = this.upgrades.length; t < e; t++)
              this.probe(this.upgrades[t]);
          }
        }),
        (h.prototype.onPacket = function (t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (s('socket receive: type "%s", data "%s"', t.type, t.data),
              this.emit("packet", t),
              this.emit("heartbeat"),
              t.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
              case "pong":
                this.setPing(), this.emit("pong");
                break;
              case "error":
                var e = new Error("server error");
                (e.code = t.data), this.onError(e);
                break;
              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
            }
          else
            s('packet received with socket readyState "%s"', this.readyState);
        }),
        (h.prototype.onHandshake = function (t) {
          this.emit("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState &&
              (this.setPing(),
              this.removeListener("heartbeat", this.onHeartbeat),
              this.on("heartbeat", this.onHeartbeat));
        }),
        (h.prototype.onHeartbeat = function (t) {
          clearTimeout(this.pingTimeoutTimer);
          var e = this;
          e.pingTimeoutTimer = setTimeout(function () {
            "closed" !== e.readyState && e.onClose("ping timeout");
          }, t || e.pingInterval + e.pingTimeout);
        }),
        (h.prototype.setPing = function () {
          var t = this;
          clearTimeout(t.pingIntervalTimer),
            (t.pingIntervalTimer = setTimeout(function () {
              s(
                "writing ping packet - expecting pong within %sms",
                t.pingTimeout
              ),
                t.ping(),
                t.onHeartbeat(t.pingTimeout);
            }, t.pingInterval));
        }),
        (h.prototype.ping = function () {
          var t = this;
          this.sendPacket("ping", function () {
            t.emit("ping");
          });
        }),
        (h.prototype.onDrain = function () {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }),
        (h.prototype.flush = function () {
          "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (s("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit("flush"));
        }),
        (h.prototype.write = h.prototype.send = function (t, e, n) {
          return this.sendPacket("message", t, e, n), this;
        }),
        (h.prototype.sendPacket = function (t, e, n, i) {
          if (
            ("function" == typeof e && ((i = e), (e = void 0)),
            "function" == typeof n && ((i = n), (n = null)),
            "closing" !== this.readyState && "closed" !== this.readyState)
          ) {
            (n = n || {}).compress = !1 !== n.compress;
            var r = { type: t, data: e, options: n };
            this.emit("packetCreate", r),
              this.writeBuffer.push(r),
              i && this.once("flush", i),
              this.flush();
          }
        }),
        (h.prototype.close = function () {
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var t = this;
            this.writeBuffer.length
              ? this.once("drain", function () {
                  this.upgrading ? i() : e();
                })
              : this.upgrading
              ? i()
              : e();
          }
          function e() {
            t.onClose("forced close"),
              s("socket closing - telling transport to close"),
              t.transport.close();
          }
          function n() {
            t.removeListener("upgrade", n),
              t.removeListener("upgradeError", n),
              e();
          }
          function i() {
            t.once("upgrade", n), t.once("upgradeError", n);
          }
          return this;
        }),
        (h.prototype.onError = function (t) {
          s("socket error %j", t),
            (h.priorWebsocketSuccess = !1),
            this.emit("error", t),
            this.onClose("transport error", t);
        }),
        (h.prototype.onClose = function (t, e) {
          ("opening" !== this.readyState &&
            "open" !== this.readyState &&
            "closing" !== this.readyState) ||
            (s('socket close with reason: "%s"', t),
            clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            (this.readyState = "closed"),
            (this.id = null),
            this.emit("close", t, e),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
        }),
        (h.prototype.filterUpgrades = function (t) {
          for (var e = [], n = 0, i = t.length; n < i; n++)
            ~o(this.transports, t[n]) && e.push(t[n]);
          return e;
        });
    },
    "2xqC": function (t, e, n) {
      function i(t) {
        if (t)
          return (function (t) {
            for (var e in i.prototype) t[e] = i.prototype[e];
            return t;
          })(t);
      }
      (t.exports = i),
        (i.prototype.on = i.prototype.addEventListener = function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (i.prototype.once = function (t, e) {
          function n() {
            this.off(t, n), e.apply(this, arguments);
          }
          return (n.fn = e), this.on(t, n), this;
        }),
        (i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function (
          t,
          e
        ) {
          if (
            ((this._callbacks = this._callbacks || {}), 0 == arguments.length)
          )
            return (this._callbacks = {}), this;
          var n,
            i = this._callbacks["$" + t];
          if (!i) return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t], this;
          for (var r = 0; r < i.length; r++)
            if ((n = i[r]) === e || n.fn === e) {
              i.splice(r, 1);
              break;
            }
          return this;
        }),
        (i.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          var e = [].slice.call(arguments, 1),
            n = this._callbacks["$" + t];
          if (n)
            for (var i = 0, r = (n = n.slice(0)).length; i < r; ++i)
              n[i].apply(this, e);
          return this;
        }),
        (i.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (i.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
    },
    "3JDX": function (t, e, n) {
      t.exports = function (t) {
        function e(t) {
          let e = 0;
          for (let n = 0; n < t.length; n++)
            (e = (e << 5) - e + t.charCodeAt(n)), (e |= 0);
          return i.colors[Math.abs(e) % i.colors.length];
        }
        function i(t) {
          let n;
          function o(...t) {
            if (!o.enabled) return;
            const e = o,
              r = Number(new Date());
            (e.diff = r - (n || r)),
              (e.prev = n),
              (e.curr = r),
              (n = r),
              (t[0] = i.coerce(t[0])),
              "string" != typeof t[0] && t.unshift("%O");
            let s = 0;
            (t[0] = t[0].replace(/%([a-zA-Z%])/g, (n, r) => {
              if ("%%" === n) return n;
              s++;
              const o = i.formatters[r];
              return (
                "function" == typeof o &&
                  ((n = o.call(e, t[s])), t.splice(s, 1), s--),
                n
              );
            })),
              i.formatArgs.call(e, t),
              (e.log || i.log).apply(e, t);
          }
          return (
            (o.namespace = t),
            (o.enabled = i.enabled(t)),
            (o.useColors = i.useColors()),
            (o.color = e(t)),
            (o.destroy = r),
            (o.extend = s),
            "function" == typeof i.init && i.init(o),
            i.instances.push(o),
            o
          );
        }
        function r() {
          const t = i.instances.indexOf(this);
          return -1 !== t && (i.instances.splice(t, 1), !0);
        }
        function s(t, e) {
          const n = i(this.namespace + (void 0 === e ? ":" : e) + t);
          return (n.log = this.log), n;
        }
        function o(t) {
          return t
            .toString()
            .substring(2, t.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        return (
          (i.debug = i),
          (i.default = i),
          (i.coerce = function (t) {
            return t instanceof Error ? t.stack || t.message : t;
          }),
          (i.disable = function () {
            const t = [
              ...i.names.map(o),
              ...i.skips.map(o).map((t) => "-" + t),
            ].join(",");
            return i.enable(""), t;
          }),
          (i.enable = function (t) {
            let e;
            i.save(t), (i.names = []), (i.skips = []);
            const n = ("string" == typeof t ? t : "").split(/[\s,]+/),
              r = n.length;
            for (e = 0; e < r; e++)
              n[e] &&
                ("-" === (t = n[e].replace(/\*/g, ".*?"))[0]
                  ? i.skips.push(new RegExp("^" + t.substr(1) + "$"))
                  : i.names.push(new RegExp("^" + t + "$")));
            for (e = 0; e < i.instances.length; e++) {
              const t = i.instances[e];
              t.enabled = i.enabled(t.namespace);
            }
          }),
          (i.enabled = function (t) {
            if ("*" === t[t.length - 1]) return !0;
            let e, n;
            for (e = 0, n = i.skips.length; e < n; e++)
              if (i.skips[e].test(t)) return !1;
            for (e = 0, n = i.names.length; e < n; e++)
              if (i.names[e].test(t)) return !0;
            return !1;
          }),
          (i.humanize = n("FGiv")),
          Object.keys(t).forEach((e) => {
            i[e] = t[e];
          }),
          (i.instances = []),
          (i.names = []),
          (i.skips = []),
          (i.formatters = {}),
          (i.selectColor = e),
          i.enable(i.load()),
          i
        );
      };
    },
    "44nb": function (t, e) {
      var n,
        i,
        r,
        s = String.fromCharCode;
      function o(t) {
        for (var e, n, i = [], r = 0, s = t.length; r < s; )
          (e = t.charCodeAt(r++)) >= 55296 && e <= 56319 && r < s
            ? 56320 == (64512 & (n = t.charCodeAt(r++)))
              ? i.push(((1023 & e) << 10) + (1023 & n) + 65536)
              : (i.push(e), r--)
            : i.push(e);
        return i;
      }
      function a(t, e) {
        if (t >= 55296 && t <= 57343) {
          if (e)
            throw Error(
              "Lone surrogate U+" +
                t.toString(16).toUpperCase() +
                " is not a scalar value"
            );
          return !1;
        }
        return !0;
      }
      function l(t, e) {
        return s(((t >> e) & 63) | 128);
      }
      function c(t, e) {
        if (0 == (4294967168 & t)) return s(t);
        var n = "";
        return (
          0 == (4294965248 & t)
            ? (n = s(((t >> 6) & 31) | 192))
            : 0 == (4294901760 & t)
            ? (a(t, e) || (t = 65533),
              (n = s(((t >> 12) & 15) | 224)),
              (n += l(t, 6)))
            : 0 == (4292870144 & t) &&
              ((n = s(((t >> 18) & 7) | 240)), (n += l(t, 12)), (n += l(t, 6))),
          n + s((63 & t) | 128)
        );
      }
      function h() {
        if (r >= i) throw Error("Invalid byte index");
        var t = 255 & n[r];
        if ((r++, 128 == (192 & t))) return 63 & t;
        throw Error("Invalid continuation byte");
      }
      function u(t) {
        var e, s;
        if (r > i) throw Error("Invalid byte index");
        if (r == i) return !1;
        if (((e = 255 & n[r]), r++, 0 == (128 & e))) return e;
        if (192 == (224 & e)) {
          if ((s = ((31 & e) << 6) | h()) >= 128) return s;
          throw Error("Invalid continuation byte");
        }
        if (224 == (240 & e)) {
          if ((s = ((15 & e) << 12) | (h() << 6) | h()) >= 2048)
            return a(s, t) ? s : 65533;
          throw Error("Invalid continuation byte");
        }
        if (
          240 == (248 & e) &&
          (s = ((7 & e) << 18) | (h() << 12) | (h() << 6) | h()) >= 65536 &&
          s <= 1114111
        )
          return s;
        throw Error("Invalid UTF-8 detected");
      }
      t.exports = {
        version: "2.1.2",
        encode: function (t, e) {
          for (
            var n = !1 !== (e = e || {}).strict,
              i = o(t),
              r = i.length,
              s = -1,
              a = "";
            ++s < r;

          )
            a += c(i[s], n);
          return a;
        },
        decode: function (t, e) {
          var a = !1 !== (e = e || {}).strict;
          (n = o(t)), (i = n.length), (r = 0);
          for (var l, c = []; !1 !== (l = u(a)); ) c.push(l);
          return (function (t) {
            for (var e, n = t.length, i = -1, r = ""; ++i < n; )
              (e = t[i]) > 65535 &&
                ((r += s((((e -= 65536) >>> 10) & 1023) | 55296)),
                (e = 56320 | (1023 & e))),
                (r += s(e));
            return r;
          })(c);
        },
      };
    },
    "5LH7": function (t, e) {
      var n = 1e3,
        i = 6e4,
        r = 60 * i,
        s = 24 * r;
      function o(t, e, n) {
        if (!(t < e))
          return t < 1.5 * e
            ? Math.floor(t / e) + " " + n
            : Math.ceil(t / e) + " " + n + "s";
      }
      t.exports = function (t, e) {
        e = e || {};
        var a,
          l = typeof t;
        if ("string" === l && t.length > 0)
          return (function (t) {
            if (!((t = String(t)).length > 100)) {
              var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                t
              );
              if (e) {
                var o = parseFloat(e[1]);
                switch ((e[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return 315576e5 * o;
                  case "days":
                  case "day":
                  case "d":
                    return o * s;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return o * r;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return o * i;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return o * n;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return o;
                  default:
                    return;
                }
              }
            }
          })(t);
        if ("number" === l && !1 === isNaN(t))
          return e.long
            ? o((a = t), s, "day") ||
                o(a, r, "hour") ||
                o(a, i, "minute") ||
                o(a, n, "second") ||
                a + " ms"
            : (function (t) {
                return t >= s
                  ? Math.round(t / s) + "d"
                  : t >= r
                  ? Math.round(t / r) + "h"
                  : t >= i
                  ? Math.round(t / i) + "m"
                  : t >= n
                  ? Math.round(t / n) + "s"
                  : t + "ms";
              })(t);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(t)
        );
      };
    },
    "6C75": function (t, e) {
      var n = {}.toString;
      t.exports =
        Array.isArray ||
        function (t) {
          return "[object Array]" == n.call(t);
        };
    },
    "7jRU": function (t, e) {
      var n = [].indexOf;
      t.exports = function (t, e) {
        if (n) return t.indexOf(e);
        for (var i = 0; i < t.length; ++i) if (t[i] === e) return i;
        return -1;
      };
    },
    AdPF: function (t, e, n) {
      var i = n("yeub"),
        r = n("2UHX");
      t.exports = function (t) {
        var e = t.xdomain,
          n = t.xscheme,
          s = t.enablesXDR;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!e || i))
            return new XMLHttpRequest();
        } catch (o) {}
        try {
          if ("undefined" != typeof XDomainRequest && !n && s)
            return new XDomainRequest();
        } catch (o) {}
        if (!e)
          try {
            return new r[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (o) {}
      };
    },
    Aplp: function (t, e, n) {
      "use strict";
      var i,
        r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
          ""
        ),
        s = {},
        o = 0,
        a = 0;
      function l(t) {
        var e = "";
        do {
          (e = r[t % 64] + e), (t = Math.floor(t / 64));
        } while (t > 0);
        return e;
      }
      function c() {
        var t = l(+new Date());
        return t !== i ? ((o = 0), (i = t)) : t + "." + l(o++);
      }
      for (; a < 64; a++) s[r[a]] = a;
      (c.encode = l),
        (c.decode = function (t) {
          var e = 0;
          for (a = 0; a < t.length; a++) e = 64 * e + s[t.charAt(a)];
          return e;
        }),
        (t.exports = c);
    },
    C2QD: function (t, e) {
      function n(t) {
        (this.ms = (t = t || {}).min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (t.exports = n),
        (n.prototype.duration = function () {
          var t = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var e = Math.random(),
              n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
          }
          return 0 | Math.min(t, this.max);
        }),
        (n.prototype.reset = function () {
          this.attempts = 0;
        }),
        (n.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (n.prototype.setMax = function (t) {
          this.max = t;
        }),
        (n.prototype.setJitter = function (t) {
          this.jitter = t;
        });
    },
    CIKq: function (t, e, n) {
      var i,
        r,
        s = n("Gbct"),
        o = n("+ntK"),
        a = n("TypT"),
        l = n("Yvos"),
        c = n("Aplp"),
        h = n("NOtv")("engine.io-client:websocket");
      if (
        ("undefined" != typeof WebSocket
          ? (i = WebSocket)
          : "undefined" != typeof self &&
            (i = self.WebSocket || self.MozWebSocket),
        "undefined" == typeof window)
      )
        try {
          r = n(1);
        } catch (p) {}
      var u = i || r;
      function d(t) {
        t && t.forceBase64 && (this.supportsBinary = !1),
          (this.perMessageDeflate = t.perMessageDeflate),
          (this.usingBrowserWebSocket = i && !t.forceNode),
          (this.protocols = t.protocols),
          this.usingBrowserWebSocket || (u = r),
          s.call(this, t);
      }
      (t.exports = d),
        l(d, s),
        (d.prototype.name = "websocket"),
        (d.prototype.supportsBinary = !0),
        (d.prototype.doOpen = function () {
          if (this.check()) {
            var t = this.uri(),
              e = this.protocols,
              n = {
                agent: this.agent,
                perMessageDeflate: this.perMessageDeflate,
              };
            (n.pfx = this.pfx),
              (n.key = this.key),
              (n.passphrase = this.passphrase),
              (n.cert = this.cert),
              (n.ca = this.ca),
              (n.ciphers = this.ciphers),
              (n.rejectUnauthorized = this.rejectUnauthorized),
              this.extraHeaders && (n.headers = this.extraHeaders),
              this.localAddress && (n.localAddress = this.localAddress);
            try {
              this.ws =
                this.usingBrowserWebSocket && !this.isReactNative
                  ? e
                    ? new u(t, e)
                    : new u(t)
                  : new u(t, e, n);
            } catch (i) {
              return this.emit("error", i);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0),
                  (this.ws.binaryType = "nodebuffer"))
                : (this.ws.binaryType = "arraybuffer"),
              this.addEventListeners();
          }
        }),
        (d.prototype.addEventListeners = function () {
          var t = this;
          (this.ws.onopen = function () {
            t.onOpen();
          }),
            (this.ws.onclose = function () {
              t.onClose();
            }),
            (this.ws.onmessage = function (e) {
              t.onData(e.data);
            }),
            (this.ws.onerror = function (e) {
              t.onError("websocket error", e);
            });
        }),
        (d.prototype.write = function (t) {
          var e = this;
          this.writable = !1;
          for (var n = t.length, i = 0, r = n; i < r; i++)
            !(function (t) {
              o.encodePacket(t, e.supportsBinary, function (i) {
                if (!e.usingBrowserWebSocket) {
                  var r = {};
                  t.options && (r.compress = t.options.compress),
                    e.perMessageDeflate &&
                      ("string" == typeof i ? Buffer.byteLength(i) : i.length) <
                        e.perMessageDeflate.threshold &&
                      (r.compress = !1);
                }
                try {
                  e.usingBrowserWebSocket ? e.ws.send(i) : e.ws.send(i, r);
                } catch (p) {
                  h("websocket closed before onclose event");
                }
                --n ||
                  (e.emit("flush"),
                  setTimeout(function () {
                    (e.writable = !0), e.emit("drain");
                  }, 0));
              });
            })(t[i]);
        }),
        (d.prototype.onClose = function () {
          s.prototype.onClose.call(this);
        }),
        (d.prototype.doClose = function () {
          void 0 !== this.ws && this.ws.close();
        }),
        (d.prototype.uri = function () {
          var t = this.query || {},
            e = this.secure ? "wss" : "ws",
            n = "";
          return (
            this.port &&
              (("wss" === e && 443 !== Number(this.port)) ||
                ("ws" === e && 80 !== Number(this.port))) &&
              (n = ":" + this.port),
            this.timestampRequests && (t[this.timestampParam] = c()),
            this.supportsBinary || (t.b64 = 1),
            (t = a.encode(t)).length && (t = "?" + t),
            e +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              n +
              this.path +
              t
          );
        }),
        (d.prototype.check = function () {
          return !(
            !u ||
            ("__initialize" in u && this.name === d.prototype.name)
          );
        });
    },
    CUme: function (t, e, n) {
      var i = n("Gbct"),
        r = n("TypT"),
        s = n("+ntK"),
        o = n("Yvos"),
        a = n("Aplp"),
        l = n("NOtv")("engine.io-client:polling");
      t.exports = h;
      var c = null != new (n("AdPF"))({ xdomain: !1 }).responseType;
      function h(t) {
        (c && !(t && t.forceBase64)) || (this.supportsBinary = !1),
          i.call(this, t);
      }
      o(h, i),
        (h.prototype.name = "polling"),
        (h.prototype.doOpen = function () {
          this.poll();
        }),
        (h.prototype.pause = function (t) {
          var e = this;
          function n() {
            l("paused"), (e.readyState = "paused"), t();
          }
          if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            var i = 0;
            this.polling &&
              (l("we are currently polling - waiting to pause"),
              i++,
              this.once("pollComplete", function () {
                l("pre-pause polling complete"), --i || n();
              })),
              this.writable ||
                (l("we are currently writing - waiting to pause"),
                i++,
                this.once("drain", function () {
                  l("pre-pause writing complete"), --i || n();
                }));
          } else n();
        }),
        (h.prototype.poll = function () {
          l("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
        }),
        (h.prototype.onData = function (t) {
          var e = this;
          l("polling got data %s", t),
            s.decodePayload(t, this.socket.binaryType, function (t, n, i) {
              if (
                ("opening" === e.readyState && e.onOpen(), "close" === t.type)
              )
                return e.onClose(), !1;
              e.onPacket(t);
            }),
            "closed" !== this.readyState &&
              ((this.polling = !1),
              this.emit("pollComplete"),
              "open" === this.readyState
                ? this.poll()
                : l('ignoring poll - transport state "%s"', this.readyState));
        }),
        (h.prototype.doClose = function () {
          var t = this;
          function e() {
            l("writing close packet"), t.write([{ type: "close" }]);
          }
          "open" === this.readyState
            ? (l("transport open - closing"), e())
            : (l("transport not open - deferring close"), this.once("open", e));
        }),
        (h.prototype.write = function (t) {
          var e = this;
          this.writable = !1;
          var n = function () {
            (e.writable = !0), e.emit("drain");
          };
          s.encodePayload(t, this.supportsBinary, function (t) {
            e.doWrite(t, n);
          });
        }),
        (h.prototype.uri = function () {
          var t = this.query || {},
            e = this.secure ? "https" : "http",
            n = "";
          return (
            !1 !== this.timestampRequests && (t[this.timestampParam] = a()),
            this.supportsBinary || t.sid || (t.b64 = 1),
            (t = r.encode(t)),
            this.port &&
              (("https" === e && 443 !== Number(this.port)) ||
                ("http" === e && 80 !== Number(this.port))) &&
              (n = ":" + this.port),
            t.length && (t = "?" + t),
            e +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              n +
              this.path +
              t
          );
        });
    },
    Cl5A: function (t, e, n) {
      var i = n("CUme"),
        r = n("Yvos"),
        s = n("2UHX");
      t.exports = h;
      var o,
        a = /\n/g,
        l = /\\n/g;
      function c() {}
      function h(t) {
        i.call(this, t),
          (this.query = this.query || {}),
          o || (o = s.___eio = s.___eio || []),
          (this.index = o.length);
        var e = this;
        o.push(function (t) {
          e.onData(t);
        }),
          (this.query.j = this.index),
          "function" == typeof addEventListener &&
            addEventListener(
              "beforeunload",
              function () {
                e.script && (e.script.onerror = c);
              },
              !1
            );
      }
      r(h, i),
        (h.prototype.supportsBinary = !1),
        (h.prototype.doClose = function () {
          this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            this.form &&
              (this.form.parentNode.removeChild(this.form),
              (this.form = null),
              (this.iframe = null)),
            i.prototype.doClose.call(this);
        }),
        (h.prototype.doPoll = function () {
          var t = this,
            e = document.createElement("script");
          this.script &&
            (this.script.parentNode.removeChild(this.script),
            (this.script = null)),
            (e.async = !0),
            (e.src = this.uri()),
            (e.onerror = function (e) {
              t.onError("jsonp poll error", e);
            });
          var n = document.getElementsByTagName("script")[0];
          n
            ? n.parentNode.insertBefore(e, n)
            : (document.head || document.body).appendChild(e),
            (this.script = e),
            "undefined" != typeof navigator &&
              /gecko/i.test(navigator.userAgent) &&
              setTimeout(function () {
                var t = document.createElement("iframe");
                document.body.appendChild(t), document.body.removeChild(t);
              }, 100);
        }),
        (h.prototype.doWrite = function (t, e) {
          var n = this;
          if (!this.form) {
            var i,
              r = document.createElement("form"),
              s = document.createElement("textarea"),
              o = (this.iframeId = "eio_iframe_" + this.index);
            (r.className = "socketio"),
              (r.style.position = "absolute"),
              (r.style.top = "-1000px"),
              (r.style.left = "-1000px"),
              (r.target = o),
              (r.method = "POST"),
              r.setAttribute("accept-charset", "utf-8"),
              (s.name = "d"),
              r.appendChild(s),
              document.body.appendChild(r),
              (this.form = r),
              (this.area = s);
          }
          function c() {
            h(), e();
          }
          function h() {
            if (n.iframe)
              try {
                n.form.removeChild(n.iframe);
              } catch (t) {
                n.onError("jsonp polling iframe removal error", t);
              }
            try {
              i = document.createElement(
                '<iframe src="javascript:0" name="' + n.iframeId + '">'
              );
            } catch (t) {
              ((i = document.createElement("iframe")).name = n.iframeId),
                (i.src = "javascript:0");
            }
            (i.id = n.iframeId), n.form.appendChild(i), (n.iframe = i);
          }
          (this.form.action = this.uri()),
            h(),
            (t = t.replace(l, "\\\n")),
            (this.area.value = t.replace(a, "\\n"));
          try {
            this.form.submit();
          } catch (u) {}
          this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function () {
                "complete" === n.iframe.readyState && c();
              })
            : (this.iframe.onload = c);
        });
    },
    FGiv: function (t, e) {
      var n = 1e3,
        i = 6e4,
        r = 60 * i,
        s = 24 * r;
      function o(t, e, n, i) {
        var r = e >= 1.5 * n;
        return Math.round(t / n) + " " + i + (r ? "s" : "");
      }
      t.exports = function (t, e) {
        e = e || {};
        var a,
          l,
          c = typeof t;
        if ("string" === c && t.length > 0)
          return (function (t) {
            if (!((t = String(t)).length > 100)) {
              var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                t
              );
              if (e) {
                var o = parseFloat(e[1]);
                switch ((e[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return 315576e5 * o;
                  case "weeks":
                  case "week":
                  case "w":
                    return 6048e5 * o;
                  case "days":
                  case "day":
                  case "d":
                    return o * s;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return o * r;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return o * i;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return o * n;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return o;
                  default:
                    return;
                }
              }
            }
          })(t);
        if ("number" === c && isFinite(t))
          return e.long
            ? ((a = t),
              (l = Math.abs(a)) >= s
                ? o(a, l, s, "day")
                : l >= r
                ? o(a, l, r, "hour")
                : l >= i
                ? o(a, l, i, "minute")
                : l >= n
                ? o(a, l, n, "second")
                : a + " ms")
            : (function (t) {
                var e = Math.abs(t);
                return e >= s
                  ? Math.round(t / s) + "d"
                  : e >= r
                  ? Math.round(t / r) + "h"
                  : e >= i
                  ? Math.round(t / i) + "m"
                  : e >= n
                  ? Math.round(t / n) + "s"
                  : t + "ms";
              })(t);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(t)
        );
      };
    },
    FXYA: function (t, e, n) {
      function i(t) {
        var n;
        function i() {
          if (i.enabled) {
            var t = i,
              r = +new Date(),
              s = r - (n || r);
            (t.diff = s), (t.prev = n), (t.curr = r), (n = r);
            for (var o = new Array(arguments.length), a = 0; a < o.length; a++)
              o[a] = arguments[a];
            (o[0] = e.coerce(o[0])), "string" != typeof o[0] && o.unshift("%O");
            var l = 0;
            (o[0] = o[0].replace(/%([a-zA-Z%])/g, function (n, i) {
              if ("%%" === n) return n;
              l++;
              var r = e.formatters[i];
              return (
                "function" == typeof r &&
                  ((n = r.call(t, o[l])), o.splice(l, 1), l--),
                n
              );
            })),
              e.formatArgs.call(t, o);
            var c = i.log || e.log || console.log.bind(console);
            c.apply(t, o);
          }
        }
        return (
          (i.namespace = t),
          (i.enabled = e.enabled(t)),
          (i.useColors = e.useColors()),
          (i.color = (function (t) {
            var n,
              i = 0;
            for (n in t) (i = (i << 5) - i + t.charCodeAt(n)), (i |= 0);
            return e.colors[Math.abs(i) % e.colors.length];
          })(t)),
          (i.destroy = r),
          "function" == typeof e.init && e.init(i),
          e.instances.push(i),
          i
        );
      }
      function r() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1), !0);
      }
      ((e = t.exports = i.debug = i.default = i).coerce = function (t) {
        return t instanceof Error ? t.stack || t.message : t;
      }),
        (e.disable = function () {
          e.enable("");
        }),
        (e.enable = function (t) {
          var n;
          e.save(t), (e.names = []), (e.skips = []);
          var i = ("string" == typeof t ? t : "").split(/[\s,]+/),
            r = i.length;
          for (n = 0; n < r; n++)
            i[n] &&
              ("-" === (t = i[n].replace(/\*/g, ".*?"))[0]
                ? e.skips.push(new RegExp("^" + t.substr(1) + "$"))
                : e.names.push(new RegExp("^" + t + "$")));
          for (n = 0; n < e.instances.length; n++) {
            var s = e.instances[n];
            s.enabled = e.enabled(s.namespace);
          }
        }),
        (e.enabled = function (t) {
          if ("*" === t[t.length - 1]) return !0;
          var n, i;
          for (n = 0, i = e.skips.length; n < i; n++)
            if (e.skips[n].test(t)) return !1;
          for (n = 0, i = e.names.length; n < i; n++)
            if (e.names[n].test(t)) return !0;
          return !1;
        }),
        (e.humanize = n("5LH7")),
        (e.instances = []),
        (e.names = []),
        (e.skips = []),
        (e.formatters = {});
    },
    Gbct: function (t, e, n) {
      var i = n("+ntK"),
        r = n("1Mk5");
      function s(t) {
        (this.path = t.path),
          (this.hostname = t.hostname),
          (this.port = t.port),
          (this.secure = t.secure),
          (this.query = t.query),
          (this.timestampParam = t.timestampParam),
          (this.timestampRequests = t.timestampRequests),
          (this.readyState = ""),
          (this.agent = t.agent || !1),
          (this.socket = t.socket),
          (this.enablesXDR = t.enablesXDR),
          (this.withCredentials = t.withCredentials),
          (this.pfx = t.pfx),
          (this.key = t.key),
          (this.passphrase = t.passphrase),
          (this.cert = t.cert),
          (this.ca = t.ca),
          (this.ciphers = t.ciphers),
          (this.rejectUnauthorized = t.rejectUnauthorized),
          (this.forceNode = t.forceNode),
          (this.isReactNative = t.isReactNative),
          (this.extraHeaders = t.extraHeaders),
          (this.localAddress = t.localAddress);
      }
      (t.exports = s),
        r(s.prototype),
        (s.prototype.onError = function (t, e) {
          var n = new Error(t);
          return (
            (n.type = "TransportError"),
            (n.description = e),
            this.emit("error", n),
            this
          );
        }),
        (s.prototype.open = function () {
          return (
            ("closed" !== this.readyState && "" !== this.readyState) ||
              ((this.readyState = "opening"), this.doOpen()),
            this
          );
        }),
        (s.prototype.close = function () {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              (this.doClose(), this.onClose()),
            this
          );
        }),
        (s.prototype.send = function (t) {
          if ("open" !== this.readyState) throw new Error("Transport not open");
          this.write(t);
        }),
        (s.prototype.onOpen = function () {
          (this.readyState = "open"), (this.writable = !0), this.emit("open");
        }),
        (s.prototype.onData = function (t) {
          var e = i.decodePacket(t, this.socket.binaryType);
          this.onPacket(e);
        }),
        (s.prototype.onPacket = function (t) {
          this.emit("packet", t);
        }),
        (s.prototype.onClose = function () {
          (this.readyState = "closed"), this.emit("close");
        });
    },
    KFGy: function (t, e, n) {
      var i = n("Uwu7"),
        r = n("2xqC"),
        s = n("kSER"),
        o = n("2Dig"),
        a = n("QN7Q"),
        l = n("NOtv")("socket.io-client:socket"),
        c = n("TypT"),
        h = n("WLGk");
      t.exports = p;
      var u = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1,
        },
        d = r.prototype.emit;
      function p(t, e, n) {
        (this.io = t),
          (this.nsp = e),
          (this.json = this),
          (this.ids = 0),
          (this.acks = {}),
          (this.receiveBuffer = []),
          (this.sendBuffer = []),
          (this.connected = !1),
          (this.disconnected = !0),
          (this.flags = {}),
          n && n.query && (this.query = n.query),
          this.io.autoConnect && this.open();
      }
      r(p.prototype),
        (p.prototype.subEvents = function () {
          if (!this.subs) {
            var t = this.io;
            this.subs = [
              o(t, "open", a(this, "onopen")),
              o(t, "packet", a(this, "onpacket")),
              o(t, "close", a(this, "onclose")),
            ];
          }
        }),
        (p.prototype.open = p.prototype.connect = function () {
          return (
            this.connected ||
              (this.subEvents(),
              this.io.open(),
              "open" === this.io.readyState && this.onopen(),
              this.emit("connecting")),
            this
          );
        }),
        (p.prototype.send = function () {
          var t = s(arguments);
          return t.unshift("message"), this.emit.apply(this, t), this;
        }),
        (p.prototype.emit = function (t) {
          if (u.hasOwnProperty(t)) return d.apply(this, arguments), this;
          var e = s(arguments),
            n = {
              type: (void 0 !== this.flags.binary ? this.flags.binary : h(e))
                ? i.BINARY_EVENT
                : i.EVENT,
              data: e,
              options: {},
            };
          return (
            (n.options.compress = !this.flags || !1 !== this.flags.compress),
            "function" == typeof e[e.length - 1] &&
              (l("emitting packet with ack id %d", this.ids),
              (this.acks[this.ids] = e.pop()),
              (n.id = this.ids++)),
            this.connected ? this.packet(n) : this.sendBuffer.push(n),
            (this.flags = {}),
            this
          );
        }),
        (p.prototype.packet = function (t) {
          (t.nsp = this.nsp), this.io.packet(t);
        }),
        (p.prototype.onopen = function () {
          if ((l("transport is open - connecting"), "/" !== this.nsp))
            if (this.query) {
              var t =
                "object" == typeof this.query
                  ? c.encode(this.query)
                  : this.query;
              l("sending connect packet with query %s", t),
                this.packet({ type: i.CONNECT, query: t });
            } else this.packet({ type: i.CONNECT });
        }),
        (p.prototype.onclose = function (t) {
          l("close (%s)", t),
            (this.connected = !1),
            (this.disconnected = !0),
            delete this.id,
            this.emit("disconnect", t);
        }),
        (p.prototype.onpacket = function (t) {
          if (t.nsp === this.nsp || (t.type === i.ERROR && "/" === t.nsp))
            switch (t.type) {
              case i.CONNECT:
                this.onconnect();
                break;
              case i.EVENT:
              case i.BINARY_EVENT:
                this.onevent(t);
                break;
              case i.ACK:
              case i.BINARY_ACK:
                this.onack(t);
                break;
              case i.DISCONNECT:
                this.ondisconnect();
                break;
              case i.ERROR:
                this.emit("error", t.data);
            }
        }),
        (p.prototype.onevent = function (t) {
          var e = t.data || [];
          l("emitting event %j", e),
            null != t.id &&
              (l("attaching ack callback to event"), e.push(this.ack(t.id))),
            this.connected ? d.apply(this, e) : this.receiveBuffer.push(e);
        }),
        (p.prototype.ack = function (t) {
          var e = this,
            n = !1;
          return function () {
            if (!n) {
              n = !0;
              var r = s(arguments);
              l("sending ack %j", r),
                e.packet({ type: h(r) ? i.BINARY_ACK : i.ACK, id: t, data: r });
            }
          };
        }),
        (p.prototype.onack = function (t) {
          var e = this.acks[t.id];
          "function" == typeof e
            ? (l("calling ack %s with %j", t.id, t.data),
              e.apply(this, t.data),
              delete this.acks[t.id])
            : l("bad ack %s", t.id);
        }),
        (p.prototype.onconnect = function () {
          (this.connected = !0),
            (this.disconnected = !1),
            this.emit("connect"),
            this.emitBuffered();
        }),
        (p.prototype.emitBuffered = function () {
          var t;
          for (t = 0; t < this.receiveBuffer.length; t++)
            d.apply(this, this.receiveBuffer[t]);
          for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++)
            this.packet(this.sendBuffer[t]);
          this.sendBuffer = [];
        }),
        (p.prototype.ondisconnect = function () {
          l("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect");
        }),
        (p.prototype.destroy = function () {
          if (this.subs) {
            for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }),
        (p.prototype.close = p.prototype.disconnect = function () {
          return (
            this.connected &&
              (l("performing disconnect (%s)", this.nsp),
              this.packet({ type: i.DISCONNECT })),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
          );
        }),
        (p.prototype.compress = function (t) {
          return (this.flags.compress = t), this;
        }),
        (p.prototype.binary = function (t) {
          return (this.flags.binary = t), this;
        });
    },
    NOtv: function (t, e, n) {
      (e.log = function (...t) {
        return "object" == typeof console && console.log && console.log(...t);
      }),
        (e.formatArgs = function (e) {
          if (
            ((e[0] =
              (this.useColors ? "%c" : "") +
              this.namespace +
              (this.useColors ? " %c" : " ") +
              e[0] +
              (this.useColors ? "%c " : " ") +
              "+" +
              t.exports.humanize(this.diff)),
            !this.useColors)
          )
            return;
          const n = "color: " + this.color;
          e.splice(1, 0, n, "color: inherit");
          let i = 0,
            r = 0;
          e[0].replace(/%[a-zA-Z%]/g, (t) => {
            "%%" !== t && (i++, "%c" === t && (r = i));
          }),
            e.splice(r, 0, n);
        }),
        (e.save = function (t) {
          try {
            t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
          } catch (n) {}
        }),
        (e.load = function () {
          let t;
          try {
            t = e.storage.getItem("debug");
          } catch (n) {}
          return (
            !t &&
              "undefined" != typeof process &&
              "env" in process &&
              (t = process.env.DEBUG),
            t
          );
        }),
        (e.useColors = function () {
          return (
            !(
              "undefined" == typeof window ||
              !window.process ||
              ("renderer" !== window.process.type && !window.process.__nwjs)
            ) ||
            (("undefined" == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }),
        (e.storage = (function () {
          try {
            return localStorage;
          } catch (t) {}
        })()),
        (e.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (t.exports = n("3JDX")(e));
      const { formatters: i } = t.exports;
      i.j = function (t) {
        try {
          return JSON.stringify(t);
        } catch (e) {
          return "[UnexpectedJSONParseError]: " + e.message;
        }
      };
    },
    Njrz: function (t, e, n) {
      var i = n("luTP"),
        r = n("qGlh"),
        s = Object.prototype.toString,
        o =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === s.call(Blob)),
        a =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === s.call(File));
      (e.deconstructPacket = function (t) {
        var e = [],
          n = t;
        return (
          (n.data = (function t(e, n) {
            if (!e) return e;
            if (r(e)) {
              var s = { _placeholder: !0, num: n.length };
              return n.push(e), s;
            }
            if (i(e)) {
              for (var o = new Array(e.length), a = 0; a < e.length; a++)
                o[a] = t(e[a], n);
              return o;
            }
            if ("object" == typeof e && !(e instanceof Date)) {
              for (var l in ((o = {}), e)) o[l] = t(e[l], n);
              return o;
            }
            return e;
          })(t.data, e)),
          (n.attachments = e.length),
          { packet: n, buffers: e }
        );
      }),
        (e.reconstructPacket = function (t, e) {
          return (
            (t.data = (function t(e, n) {
              if (!e) return e;
              if (e && e._placeholder) return n[e.num];
              if (i(e)) for (var r = 0; r < e.length; r++) e[r] = t(e[r], n);
              else if ("object" == typeof e) for (var s in e) e[s] = t(e[s], n);
              return e;
            })(t.data, e)),
            (t.attachments = void 0),
            t
          );
        }),
        (e.removeBlobs = function (t, e) {
          var n = 0,
            s = t;
          !(function t(l, c, h) {
            if (!l) return l;
            if ((o && l instanceof Blob) || (a && l instanceof File)) {
              n++;
              var u = new FileReader();
              (u.onload = function () {
                h ? (h[c] = this.result) : (s = this.result), --n || e(s);
              }),
                u.readAsArrayBuffer(l);
            } else if (i(l)) for (var d = 0; d < l.length; d++) t(l[d], d, l);
            else if ("object" == typeof l && !r(l))
              for (var p in l) t(l[p], p, l);
          })(s),
            n || e(s);
        });
    },
    QN7Q: function (t, e) {
      var n = [].slice;
      t.exports = function (t, e) {
        if (("string" == typeof e && (e = t[e]), "function" != typeof e))
          throw new Error("bind() requires a function");
        var i = n.call(arguments, 2);
        return function () {
          return e.apply(t, i.concat(n.call(arguments)));
        };
      };
    },
    Tnqc: function (t, e) {
      t.exports =
        Object.keys ||
        function (t) {
          var e = [],
            n = Object.prototype.hasOwnProperty;
          for (var i in t) n.call(t, i) && e.push(i);
          return e;
        };
    },
    TypT: function (t, e) {
      (e.encode = function (t) {
        var e = "";
        for (var n in t)
          t.hasOwnProperty(n) &&
            (e.length && (e += "&"),
            (e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])));
        return e;
      }),
        (e.decode = function (t) {
          for (var e = {}, n = t.split("&"), i = 0, r = n.length; i < r; i++) {
            var s = n[i].split("=");
            e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
          }
          return e;
        });
    },
    Uwu7: function (t, e, n) {
      var i = n("0KJs")("socket.io-parser"),
        r = n("2xqC"),
        s = n("Njrz"),
        o = n("luTP"),
        a = n("qGlh");
      function l() {}
      (e.protocol = 4),
        (e.types = [
          "CONNECT",
          "DISCONNECT",
          "EVENT",
          "ACK",
          "ERROR",
          "BINARY_EVENT",
          "BINARY_ACK",
        ]),
        (e.CONNECT = 0),
        (e.DISCONNECT = 1),
        (e.EVENT = 2),
        (e.ACK = 3),
        (e.ERROR = 4),
        (e.BINARY_EVENT = 5),
        (e.BINARY_ACK = 6),
        (e.Encoder = l),
        (e.Decoder = u);
      var c = e.ERROR + '"encode error"';
      function h(t) {
        var n = "" + t.type;
        if (
          ((e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type) ||
            (n += t.attachments + "-"),
          t.nsp && "/" !== t.nsp && (n += t.nsp + ","),
          null != t.id && (n += t.id),
          null != t.data)
        ) {
          var r = (function (t) {
            try {
              return JSON.stringify(t);
            } catch (e) {
              return !1;
            }
          })(t.data);
          if (!1 === r) return c;
          n += r;
        }
        return i("encoded %j as %s", t, n), n;
      }
      function u() {
        this.reconstructor = null;
      }
      function d(t) {
        (this.reconPack = t), (this.buffers = []);
      }
      function p(t) {
        return { type: e.ERROR, data: "parser error: " + t };
      }
      (l.prototype.encode = function (t, n) {
        i("encoding packet %j", t),
          e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type
            ? (function (t, e) {
                s.removeBlobs(t, function (t) {
                  var n = s.deconstructPacket(t),
                    i = h(n.packet),
                    r = n.buffers;
                  r.unshift(i), e(r);
                });
              })(t, n)
            : n([h(t)]);
      }),
        r(u.prototype),
        (u.prototype.add = function (t) {
          var n;
          if ("string" == typeof t)
            (n = (function (t) {
              var n = 0,
                r = { type: Number(t.charAt(0)) };
              if (null == e.types[r.type])
                return p("unknown packet type " + r.type);
              if (e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type) {
                for (
                  var s = "";
                  "-" !== t.charAt(++n) && ((s += t.charAt(n)), n != t.length);

                );
                if (s != Number(s) || "-" !== t.charAt(n))
                  throw new Error("Illegal attachments");
                r.attachments = Number(s);
              }
              if ("/" === t.charAt(n + 1))
                for (
                  r.nsp = "";
                  ++n &&
                  "," !== (l = t.charAt(n)) &&
                  ((r.nsp += l), n !== t.length);

                );
              else r.nsp = "/";
              var a = t.charAt(n + 1);
              if ("" !== a && Number(a) == a) {
                for (r.id = ""; ++n; ) {
                  var l;
                  if (null == (l = t.charAt(n)) || Number(l) != l) {
                    --n;
                    break;
                  }
                  if (((r.id += t.charAt(n)), n === t.length)) break;
                }
                r.id = Number(r.id);
              }
              if (t.charAt(++n)) {
                var c = (function (t) {
                  try {
                    return JSON.parse(t);
                  } catch (e) {
                    return !1;
                  }
                })(t.substr(n));
                if (!1 === c || (r.type !== e.ERROR && !o(c)))
                  return p("invalid payload");
                r.data = c;
              }
              return i("decoded %s as %j", t, r), r;
            })(t)),
              e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type
                ? ((this.reconstructor = new d(n)),
                  0 === this.reconstructor.reconPack.attachments &&
                    this.emit("decoded", n))
                : this.emit("decoded", n);
          else {
            if (!a(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (n = this.reconstructor.takeBinaryData(t)) &&
              ((this.reconstructor = null), this.emit("decoded", n));
          }
        }),
        (u.prototype.destroy = function () {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }),
        (d.prototype.takeBinaryData = function (t) {
          if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
          ) {
            var e = s.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), e;
          }
          return null;
        }),
        (d.prototype.finishedReconstruction = function () {
          (this.reconPack = null), (this.buffers = []);
        });
    },
    Uxeu: function (t, e) {
      var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        i = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      t.exports = function (t) {
        var e = t,
          r = t.indexOf("["),
          s = t.indexOf("]");
        -1 != r &&
          -1 != s &&
          (t =
            t.substring(0, r) +
            t.substring(r, s).replace(/:/g, ";") +
            t.substring(s, t.length));
        for (var o = n.exec(t || ""), a = {}, l = 14; l--; )
          a[i[l]] = o[l] || "";
        return (
          -1 != r &&
            -1 != s &&
            ((a.source = e),
            (a.host = a.host
              .substring(1, a.host.length - 1)
              .replace(/;/g, ":")),
            (a.authority = a.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (a.ipv6uri = !0)),
          a
        );
      };
    },
    WLGk: function (t, e, n) {
      var i = n("6C75"),
        r = Object.prototype.toString,
        s =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === r.call(Blob)),
        o =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === r.call(File));
      t.exports = function t(e) {
        if (!e || "object" != typeof e) return !1;
        if (i(e)) {
          for (var n = 0, r = e.length; n < r; n++) if (t(e[n])) return !0;
          return !1;
        }
        if (
          ("function" == typeof Buffer &&
            Buffer.isBuffer &&
            Buffer.isBuffer(e)) ||
          ("function" == typeof ArrayBuffer && e instanceof ArrayBuffer) ||
          (s && e instanceof Blob) ||
          (o && e instanceof File)
        )
          return !0;
        if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length)
          return t(e.toJSON(), !0);
        for (var a in e)
          if (Object.prototype.hasOwnProperty.call(e, a) && t(e[a])) return !0;
        return !1;
      };
    },
    Yvos: function (t, e) {
      t.exports = function (t, e) {
        var n = function () {};
        (n.prototype = e.prototype),
          (t.prototype = new n()),
          (t.prototype.constructor = t);
      };
    },
    akSB: function (t, e, n) {
      var i = n("AdPF"),
        r = n("0z79"),
        s = n("Cl5A"),
        o = n("CIKq");
      (e.polling = function (t) {
        var e = !1,
          n = !1,
          o = !1 !== t.jsonp;
        if ("undefined" != typeof location) {
          var a = "https:" === location.protocol,
            l = location.port;
          l || (l = a ? 443 : 80),
            (e = t.hostname !== location.hostname || l !== t.port),
            (n = t.secure !== a);
        }
        if (
          ((t.xdomain = e),
          (t.xscheme = n),
          "open" in new i(t) && !t.forceJSONP)
        )
          return new r(t);
        if (!o) throw new Error("JSONP disabled");
        return new s(t);
      }),
        (e.websocket = o);
    },
    eOtv: function (t, e, n) {
      var i = n("lKxJ"),
        r = n("KFGy"),
        s = n("2xqC"),
        o = n("Uwu7"),
        a = n("2Dig"),
        l = n("QN7Q"),
        c = n("NOtv")("socket.io-client:manager"),
        h = n("7jRU"),
        u = n("C2QD"),
        d = Object.prototype.hasOwnProperty;
      function p(t, e) {
        if (!(this instanceof p)) return new p(t, e);
        t && "object" == typeof t && ((e = t), (t = void 0)),
          ((e = e || {}).path = e.path || "/socket.io"),
          (this.nsps = {}),
          (this.subs = []),
          (this.opts = e),
          this.reconnection(!1 !== e.reconnection),
          this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
          this.reconnectionDelay(e.reconnectionDelay || 1e3),
          this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
          this.randomizationFactor(e.randomizationFactor || 0.5),
          (this.backoff = new u({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
          })),
          this.timeout(null == e.timeout ? 2e4 : e.timeout),
          (this.readyState = "closed"),
          (this.uri = t),
          (this.connecting = []),
          (this.lastPing = null),
          (this.encoding = !1),
          (this.packetBuffer = []);
        var n = e.parser || o;
        (this.encoder = new n.Encoder()),
          (this.decoder = new n.Decoder()),
          (this.autoConnect = !1 !== e.autoConnect),
          this.autoConnect && this.open();
      }
      (t.exports = p),
        (p.prototype.emitAll = function () {
          for (var t in (this.emit.apply(this, arguments), this.nsps))
            d.call(this.nsps, t) &&
              this.nsps[t].emit.apply(this.nsps[t], arguments);
        }),
        (p.prototype.updateSocketIds = function () {
          for (var t in this.nsps)
            d.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
        }),
        (p.prototype.generateId = function (t) {
          return ("/" === t ? "" : t + "#") + this.engine.id;
        }),
        s(p.prototype),
        (p.prototype.reconnection = function (t) {
          return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
        }),
        (p.prototype.reconnectionAttempts = function (t) {
          return arguments.length
            ? ((this._reconnectionAttempts = t), this)
            : this._reconnectionAttempts;
        }),
        (p.prototype.reconnectionDelay = function (t) {
          return arguments.length
            ? ((this._reconnectionDelay = t),
              this.backoff && this.backoff.setMin(t),
              this)
            : this._reconnectionDelay;
        }),
        (p.prototype.randomizationFactor = function (t) {
          return arguments.length
            ? ((this._randomizationFactor = t),
              this.backoff && this.backoff.setJitter(t),
              this)
            : this._randomizationFactor;
        }),
        (p.prototype.reconnectionDelayMax = function (t) {
          return arguments.length
            ? ((this._reconnectionDelayMax = t),
              this.backoff && this.backoff.setMax(t),
              this)
            : this._reconnectionDelayMax;
        }),
        (p.prototype.timeout = function (t) {
          return arguments.length ? ((this._timeout = t), this) : this._timeout;
        }),
        (p.prototype.maybeReconnectOnOpen = function () {
          !this.reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }),
        (p.prototype.open = p.prototype.connect = function (t, e) {
          if (
            (c("readyState %s", this.readyState),
            ~this.readyState.indexOf("open"))
          )
            return this;
          c("opening %s", this.uri), (this.engine = i(this.uri, this.opts));
          var n = this.engine,
            r = this;
          (this.readyState = "opening"), (this.skipReconnect = !1);
          var s = a(n, "open", function () {
              r.onopen(), t && t();
            }),
            o = a(n, "error", function (e) {
              if (
                (c("connect_error"),
                r.cleanup(),
                (r.readyState = "closed"),
                r.emitAll("connect_error", e),
                t)
              ) {
                var n = new Error("Connection error");
                (n.data = e), t(n);
              } else r.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            var l = this._timeout;
            c("connect attempt will timeout after %d", l);
            var h = setTimeout(function () {
              c("connect attempt timed out after %d", l),
                s.destroy(),
                n.close(),
                n.emit("error", "timeout"),
                r.emitAll("connect_timeout", l);
            }, l);
            this.subs.push({
              destroy: function () {
                clearTimeout(h);
              },
            });
          }
          return this.subs.push(s), this.subs.push(o), this;
        }),
        (p.prototype.onopen = function () {
          c("open"),
            this.cleanup(),
            (this.readyState = "open"),
            this.emit("open");
          var t = this.engine;
          this.subs.push(a(t, "data", l(this, "ondata"))),
            this.subs.push(a(t, "ping", l(this, "onping"))),
            this.subs.push(a(t, "pong", l(this, "onpong"))),
            this.subs.push(a(t, "error", l(this, "onerror"))),
            this.subs.push(a(t, "close", l(this, "onclose"))),
            this.subs.push(a(this.decoder, "decoded", l(this, "ondecoded")));
        }),
        (p.prototype.onping = function () {
          (this.lastPing = new Date()), this.emitAll("ping");
        }),
        (p.prototype.onpong = function () {
          this.emitAll("pong", new Date() - this.lastPing);
        }),
        (p.prototype.ondata = function (t) {
          this.decoder.add(t);
        }),
        (p.prototype.ondecoded = function (t) {
          this.emit("packet", t);
        }),
        (p.prototype.onerror = function (t) {
          c("error", t), this.emitAll("error", t);
        }),
        (p.prototype.socket = function (t, e) {
          var n = this.nsps[t];
          if (!n) {
            (n = new r(this, t, e)), (this.nsps[t] = n);
            var i = this;
            n.on("connecting", s),
              n.on("connect", function () {
                n.id = i.generateId(t);
              }),
              this.autoConnect && s();
          }
          function s() {
            ~h(i.connecting, n) || i.connecting.push(n);
          }
          return n;
        }),
        (p.prototype.destroy = function (t) {
          var e = h(this.connecting, t);
          ~e && this.connecting.splice(e, 1),
            this.connecting.length || this.close();
        }),
        (p.prototype.packet = function (t) {
          c("writing packet %j", t);
          var e = this;
          t.query && 0 === t.type && (t.nsp += "?" + t.query),
            e.encoding
              ? e.packetBuffer.push(t)
              : ((e.encoding = !0),
                this.encoder.encode(t, function (n) {
                  for (var i = 0; i < n.length; i++)
                    e.engine.write(n[i], t.options);
                  (e.encoding = !1), e.processPacketQueue();
                }));
        }),
        (p.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var t = this.packetBuffer.shift();
            this.packet(t);
          }
        }),
        (p.prototype.cleanup = function () {
          c("cleanup");
          for (var t = this.subs.length, e = 0; e < t; e++)
            this.subs.shift().destroy();
          (this.packetBuffer = []),
            (this.encoding = !1),
            (this.lastPing = null),
            this.decoder.destroy();
        }),
        (p.prototype.close = p.prototype.disconnect = function () {
          c("disconnect"),
            (this.skipReconnect = !0),
            (this.reconnecting = !1),
            "opening" === this.readyState && this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.engine && this.engine.close();
        }),
        (p.prototype.onclose = function (t) {
          c("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.emit("close", t),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }),
        (p.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;
          var t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            c("reconnect failed"),
              this.backoff.reset(),
              this.emitAll("reconnect_failed"),
              (this.reconnecting = !1);
          else {
            var e = this.backoff.duration();
            c("will wait %dms before reconnect attempt", e),
              (this.reconnecting = !0);
            var n = setTimeout(function () {
              t.skipReconnect ||
                (c("attempting reconnect"),
                t.emitAll("reconnect_attempt", t.backoff.attempts),
                t.emitAll("reconnecting", t.backoff.attempts),
                t.skipReconnect ||
                  t.open(function (e) {
                    e
                      ? (c("reconnect attempt error"),
                        (t.reconnecting = !1),
                        t.reconnect(),
                        t.emitAll("reconnect_error", e.data))
                      : (c("reconnect success"), t.onreconnect());
                  }));
            }, e);
            this.subs.push({
              destroy: function () {
                clearTimeout(n);
              },
            });
          }
        }),
        (p.prototype.onreconnect = function () {
          var t = this.backoff.attempts;
          (this.reconnecting = !1),
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", t);
        });
    },
    g5Dd: function (t, e) {
      !(function () {
        "use strict";
        for (
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            n = new Uint8Array(256),
            i = 0;
          i < t.length;
          i++
        )
          n[t.charCodeAt(i)] = i;
        (e.encode = function (e) {
          var n,
            i = new Uint8Array(e),
            r = i.length,
            s = "";
          for (n = 0; n < r; n += 3)
            (s += t[i[n] >> 2]),
              (s += t[((3 & i[n]) << 4) | (i[n + 1] >> 4)]),
              (s += t[((15 & i[n + 1]) << 2) | (i[n + 2] >> 6)]),
              (s += t[63 & i[n + 2]]);
          return (
            r % 3 == 2
              ? (s = s.substring(0, s.length - 1) + "=")
              : r % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="),
            s
          );
        }),
          (e.decode = function (t) {
            var e,
              i,
              r,
              s,
              o,
              a = 0.75 * t.length,
              l = t.length,
              c = 0;
            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
            var h = new ArrayBuffer(a),
              u = new Uint8Array(h);
            for (e = 0; e < l; e += 4)
              (i = n[t.charCodeAt(e)]),
                (r = n[t.charCodeAt(e + 1)]),
                (s = n[t.charCodeAt(e + 2)]),
                (o = n[t.charCodeAt(e + 3)]),
                (u[c++] = (i << 2) | (r >> 4)),
                (u[c++] = ((15 & r) << 4) | (s >> 2)),
                (u[c++] = ((3 & s) << 6) | (63 & o));
            return h;
          });
      })();
    },
    gFX4: function (t, e, n) {
      var i = n("zJ60"),
        r = n("Uwu7"),
        s = n("eOtv"),
        o = n("NOtv")("socket.io-client");
      t.exports = e = l;
      var a = (e.managers = {});
      function l(t, e) {
        "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
        var n,
          r = i(t),
          l = r.source,
          c = r.id;
        return (
          e.forceNew ||
          e["force new connection"] ||
          !1 === e.multiplex ||
          (a[c] && r.path in a[c].nsps)
            ? (o("ignoring socket cache for %s", l), (n = s(l, e)))
            : (a[c] || (o("new io instance for %s", l), (a[c] = s(l, e))),
              (n = a[c])),
          r.query && !e.query && (e.query = r.query),
          n.socket(r.path, e)
        );
      }
      (e.protocol = r.protocol),
        (e.connect = l),
        (e.Manager = n("eOtv")),
        (e.Socket = n("KFGy"));
    },
    kSER: function (t, e) {
      t.exports = function (t, e) {
        for (var n = [], i = (e = e || 0) || 0; i < t.length; i++)
          n[i - e] = t[i];
        return n;
      };
    },
    lKxJ: function (t, e, n) {
      (t.exports = n("2pII")), (t.exports.parser = n("+ntK"));
    },
    luTP: function (t, e) {
      var n = {}.toString;
      t.exports =
        Array.isArray ||
        function (t) {
          return "[object Array]" == n.call(t);
        };
    },
    qGlh: function (t, e) {
      t.exports = function (t) {
        return (
          (n && Buffer.isBuffer(t)) ||
          (i &&
            (t instanceof ArrayBuffer ||
              (function (t) {
                return "function" == typeof ArrayBuffer.isView
                  ? ArrayBuffer.isView(t)
                  : t.buffer instanceof ArrayBuffer;
              })(t)))
        );
      };
      var n =
          "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
        i = "function" == typeof ArrayBuffer;
    },
    yeub: function (t, e) {
      try {
        t.exports =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (n) {
        t.exports = !1;
      }
    },
    ypnn: function (t, e) {
      t.exports = function (t, e, n) {
        var i = t.byteLength;
        if (((e = e || 0), (n = n || i), t.slice)) return t.slice(e, n);
        if (
          (e < 0 && (e += i),
          n < 0 && (n += i),
          n > i && (n = i),
          e >= i || e >= n || 0 === i)
        )
          return new ArrayBuffer(0);
        for (
          var r = new Uint8Array(t), s = new Uint8Array(n - e), o = e, a = 0;
          o < n;
          o++, a++
        )
          s[a] = r[o];
        return s.buffer;
      };
    },
    zJ60: function (t, e, n) {
      var i = n("Uxeu"),
        r = n("NOtv")("socket.io-client:url");
      t.exports = function (t, e) {
        var n = t;
        (e = e || ("undefined" != typeof location && location)),
          null == t && (t = e.protocol + "//" + e.host),
          "string" == typeof t &&
            ("/" === t.charAt(0) &&
              (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t),
            /^(https?|wss?):\/\//.test(t) ||
              (r("protocol-less url %s", t),
              (t = void 0 !== e ? e.protocol + "//" + t : "https://" + t)),
            r("parse %s", t),
            (n = i(t))),
          n.port ||
            (/^(http|ws)$/.test(n.protocol)
              ? (n.port = "80")
              : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
          (n.path = n.path || "/");
        var s = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return (
          (n.id = n.protocol + "://" + s + ":" + n.port),
          (n.href =
            n.protocol +
            "://" +
            s +
            (e && e.port === n.port ? "" : ":" + n.port)),
          n
        );
      };
    },
    zMFY: function (t, e) {
      function n() {}
      t.exports = function (t, e, i) {
        var r = !1;
        return (i = i || n), (s.count = t), 0 === t ? e() : s;
        function s(t, n) {
          if (s.count <= 0) throw new Error("after called too many times");
          --s.count,
            t ? ((r = !0), e(t), (e = i)) : 0 !== s.count || r || e(null, n);
        }
      };
    },
    zUnb: function (t, e, n) {
      "use strict";
      function i(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let r = !1;
      const s = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            r &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          r = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (s.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const h = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let u = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: r,
              _subscriptions: s,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (i(r))
              try {
                r.call(this);
              } catch (o) {
                e = o instanceof h ? d(o.errors) : [o];
              }
            if (l(s)) {
              let t = -1,
                n = s.length;
              for (; ++t < n; ) {
                const n = s[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (o) {
                    (e = e || []),
                      o instanceof h ? (e = e.concat(d(o.errors))) : e.push(o);
                  }
              }
            }
            if (e) throw new h(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: i } = n;
            if (null === i) n._parentOrParents = this;
            else if (i instanceof t) {
              if (i === this) return n;
              n._parentOrParents = [i, this];
            } else {
              if (-1 !== i.indexOf(this)) return n;
              i.push(this);
            }
            const r = this._subscriptions;
            return null === r ? (this._subscriptions = [n]) : r.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends u {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const i = new f(t, e, n);
          return (i.syncErrorThrowable = !1), i;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class m extends f {
        constructor(t, e, n, r) {
          let s;
          super(), (this._parentSubscriber = t);
          let o = this;
          i(e)
            ? (s = e)
            : e &&
              ((s = e.next),
              (n = e.error),
              (r = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                i(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = s),
            (this._error = n),
            (this._complete = r);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            s.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = s;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              s.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), s.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!s.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (i) {
            return s.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
              : (o(i), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const g = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function _(t) {
        return t;
      }
      let y = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: i } = this,
              r = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (r.add(
                i
                  ? i.call(r, this.source)
                  : this.source ||
                    (s.useDeprecatedSynchronousErrorHandling &&
                      !r.syncErrorThrowable)
                  ? this._subscribe(r)
                  : this._trySubscribe(r)
              ),
              s.useDeprecatedSynchronousErrorHandling &&
                r.syncErrorThrowable &&
                ((r.syncErrorThrowable = !1), r.syncErrorThrown))
            )
              throw r.syncErrorValue;
            return r;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              s.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: i } = t;
                    if (e || i) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = b(e))((e, n) => {
              let i;
              i = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (r) {
                    n(r), i && i.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [g]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? _
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = b(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function b(t) {
        if ((t || (t = s.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends u {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class C extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let E = (() => {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new C(this);
          }
          lift(t) {
            const e = new x(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                i = e.slice();
              for (let r = 0; r < n; r++) i[r].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              i = e.slice();
            for (let r = 0; r < n; r++) i[r].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let i = 0; i < e; i++) n[i].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), u.EMPTY)
              : this.isStopped
              ? (t.complete(), u.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new x(t, e)), t;
      })();
      class x extends E {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : u.EMPTY;
        }
      }
      function k(t) {
        return t && "function" == typeof t.schedule;
      }
      class S extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const A = (t) => (e) => {
        for (let n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function T() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const O = T(),
        I = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function D(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const F = (t) => {
        if (t && "function" == typeof t[g])
          return (
            (i = t),
            (t) => {
              const e = i[g]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (I(t)) return A(t);
        if (D(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[O])
          return (
            (e = t),
            (t) => {
              const n = e[O]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
        var e, n, i;
      };
      function R(t, e, n, i, r = new S(t, n, i)) {
        if (!r.closed) return e instanceof y ? e.subscribe(r) : F(e)(r);
      }
      class P extends f {
        notifyNext(t, e, n, i, r) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function N(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new M(t, e));
        };
      }
      class M {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new L(t, this.project, this.thisArg));
        }
      }
      class L extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function V(t, e) {
        return new y((n) => {
          const i = new u();
          let r = 0;
          return (
            i.add(
              e.schedule(function () {
                r !== t.length
                  ? (n.next(t[r++]), n.closed || i.add(this.schedule()))
                  : n.complete();
              })
            ),
            i
          );
        });
      }
      function B(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[g];
                  })(t)
                )
                  return (function (t, e) {
                    return new y((n) => {
                      const i = new u();
                      return (
                        i.add(
                          e.schedule(() => {
                            const r = t[g]();
                            i.add(
                              r.subscribe({
                                next(t) {
                                  i.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  i.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  i.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (D(t))
                  return (function (t, e) {
                    return new y((n) => {
                      const i = new u();
                      return (
                        i.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                i.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      i.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                i.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (I(t)) return V(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[O];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new y((n) => {
                      const i = new u();
                      let r;
                      return (
                        i.add(() => {
                          r && "function" == typeof r.return && r.return();
                        }),
                        i.add(
                          e.schedule(() => {
                            (r = t[O]()),
                              i.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = r.next();
                                    (t = n.value), (e = n.done);
                                  } catch (i) {
                                    return void n.error(i);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof y
          ? t
          : new y(F(t));
      }
      function j(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (i) =>
              i.pipe(
                j((n, i) => B(t(n, i)).pipe(N((t, r) => e(n, t, i, r))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new H(t, n)));
      }
      class H {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new z(t, this.project, this.concurrent));
        }
      }
      class z extends P {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (i) {
            return void this.destination.error(i);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const i = new S(this, e, n),
            r = this.destination;
          r.add(i);
          const s = R(this, t, void 0, void 0, i);
          s !== i && r.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, i, r) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function q(t = Number.POSITIVE_INFINITY) {
        return j(_, t);
      }
      function $(t, e) {
        return e ? V(t, e) : new y(A(t));
      }
      function U(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          i = t[t.length - 1];
        return (
          k(i)
            ? ((n = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (e = t.pop()))
            : "number" == typeof i && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof y
            ? t[0]
            : q(e)($(t, n))
        );
      }
      function W() {
        return function (t) {
          return t.lift(new G(t));
        };
      }
      class G {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const i = new K(t, n),
            r = e.subscribe(i);
          return i.closed || (i.connection = n.connect()), r;
        }
      }
      class K extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            i = t._connection;
          (this.connection = null), !i || (n && i !== n) || i.unsubscribe();
        }
      }
      class Z extends y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new u()),
              t.add(this.source.subscribe(new Y(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = u.EMPTY))),
            t
          );
        }
        refCount() {
          return W()(this);
        }
      }
      const Q = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Y extends C {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function X() {
        return new E();
      }
      function J() {
        return (t) => {
          return W()(
            ((e = X),
            function (t) {
              let n;
              n =
                "function" == typeof e
                  ? e
                  : function () {
                      return e;
                    };
              const i = Object.create(t, Q);
              return (i.source = t), (i.subjectFactory = n), i;
            })(t)
          );
          var e;
        };
      }
      function tt(t) {
        return { toString: t }.toString();
      }
      function et(t, e, n) {
        return tt(() => {
          const i = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function r(...t) {
            if (this instanceof r) return i.apply(this, t), this;
            const e = new r(...t);
            return (n.annotation = e), n;
            function n(t, n, i) {
              const r = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; r.length <= i; ) r.push(null);
              return (r[i] = r[i] || []).push(e), t;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = t),
            (r.annotationCls = r),
            r
          );
        });
      }
      const nt = et("Inject", (t) => ({ token: t })),
        it = et("Optional"),
        rt = et("Self"),
        st = et("SkipSelf");
      var ot = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function at(t) {
        for (let e in t) if (t[e] === at) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function lt(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ht(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ut(t) {
        return dt(t, t[ft]) || dt(t, t[_t]);
      }
      function dt(t, e) {
        return e && e.token === t ? e : null;
      }
      function pt(t) {
        return t && (t.hasOwnProperty(mt) || t.hasOwnProperty(yt))
          ? t[mt]
          : null;
      }
      const ft = at({ "\u0275prov": at }),
        mt = at({ "\u0275inj": at }),
        gt = at({ "\u0275provFallback": at }),
        _t = at({ ngInjectableDef: at }),
        yt = at({ ngInjectorDef: at });
      function bt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(bt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function vt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const wt = at({ __forward_ref__: at });
      function Ct(t) {
        return (
          (t.__forward_ref__ = Ct),
          (t.toString = function () {
            return bt(this());
          }),
          t
        );
      }
      function Et(t) {
        return xt(t) ? t() : t;
      }
      function xt(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(wt) &&
          t.__forward_ref__ === Ct
        );
      }
      const kt = "undefined" != typeof globalThis && globalThis,
        St = "undefined" != typeof window && window,
        At =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Tt = "undefined" != typeof global && global,
        Ot = kt || Tt || St || At,
        It = at({ "\u0275cmp": at }),
        Dt = at({ "\u0275dir": at }),
        Ft = at({ "\u0275pipe": at }),
        Rt = at({ "\u0275mod": at }),
        Pt = at({ "\u0275loc": at }),
        Nt = at({ "\u0275fac": at }),
        Mt = at({ __NG_ELEMENT_ID__: at });
      class Lt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ct({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Vt = new Lt("INJECTOR", -1),
        Bt = {},
        jt = /\n/gm,
        Ht = at({ provide: String, useValue: at });
      let zt,
        qt = void 0;
      function $t(t) {
        const e = qt;
        return (qt = t), e;
      }
      function Ut(t) {
        const e = zt;
        return (zt = t), e;
      }
      function Wt(t, e = ot.Default) {
        if (void 0 === qt)
          throw new Error("inject() must be called from an injection context");
        return null === qt
          ? Zt(t, void 0, e)
          : qt.get(t, e & ot.Optional ? null : void 0, e);
      }
      function Gt(t, e = ot.Default) {
        return (zt || Wt)(Et(t), e);
      }
      const Kt = Gt;
      function Zt(t, e, n) {
        const i = ut(t);
        if (i && "root" == i.providedIn)
          return void 0 === i.value ? (i.value = i.factory()) : i.value;
        if (n & ot.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${bt(t)}]`);
      }
      function Qt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = Et(t[n]);
          if (Array.isArray(i)) {
            if (0 === i.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = ot.Default;
            for (let e = 0; e < i.length; e++) {
              const r = i[e];
              r instanceof it || "Optional" === r.ngMetadataName || r === it
                ? (n |= ot.Optional)
                : r instanceof st || "SkipSelf" === r.ngMetadataName || r === st
                ? (n |= ot.SkipSelf)
                : r instanceof rt || "Self" === r.ngMetadataName || r === rt
                ? (n |= ot.Self)
                : (t = r instanceof nt || r === nt ? r.token : r);
            }
            e.push(Gt(t, n));
          } else e.push(Gt(i));
        }
        return e;
      }
      class Yt {
        get(t, e = Bt) {
          if (e === Bt) {
            const e = new Error(`NullInjectorError: No provider for ${bt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Xt {}
      function Jt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Jt(t, e) : e(t)));
      }
      function te(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ee(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ne(t, e) {
        const n = [];
        for (let i = 0; i < t; i++) n.push(e);
        return n;
      }
      function ie(t, e, n) {
        let i = se(t, e);
        return (
          i >= 0
            ? (t[1 | i] = n)
            : ((i = ~i),
              (function (t, e, n, i) {
                let r = t.length;
                if (r == e) t.push(n, i);
                else if (1 === r) t.push(i, t[0]), (t[0] = n);
                else {
                  for (r--, t.push(t[r - 1], t[r]); r > e; )
                    (t[r] = t[r - 2]), r--;
                  (t[e] = n), (t[e + 1] = i);
                }
              })(t, i, e, n)),
          i
        );
      }
      function re(t, e) {
        const n = se(t, e);
        if (n >= 0) return t[1 | n];
      }
      function se(t, e) {
        return (function (t, e, n) {
          let i = 0,
            r = t.length >> 1;
          for (; r !== i; ) {
            const n = i + ((r - i) >> 1),
              s = t[n << 1];
            if (e === s) return n << 1;
            s > e ? (r = n) : (i = n + 1);
          }
          return ~(r << 1);
        })(t, e);
      }
      const oe = (function () {
          var t = { OnPush: 0, Default: 1 };
          return (t[t.OnPush] = "OnPush"), (t[t.Default] = "Default"), t;
        })(),
        ae = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        le = {},
        ce = [];
      let he = 0;
      function ue(t) {
        return tt(() => {
          const e = t.type,
            n = e.prototype,
            i = {},
            r = {
              type: e,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onChanges: null,
              onInit: n.ngOnInit || null,
              doCheck: n.ngDoCheck || null,
              afterContentInit: n.ngAfterContentInit || null,
              afterContentChecked: n.ngAfterContentChecked || null,
              afterViewInit: n.ngAfterViewInit || null,
              afterViewChecked: n.ngAfterViewChecked || null,
              onDestroy: n.ngOnDestroy || null,
              onPush: t.changeDetection === oe.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ce,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || ae.Emulated,
              id: "c",
              styles: t.styles || ce,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            s = t.directives,
            o = t.features,
            a = t.pipes;
          return (
            (r.id += he++),
            (r.inputs = ge(t.inputs, i)),
            (r.outputs = ge(t.outputs)),
            o && o.forEach((t) => t(r)),
            (r.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(de)
              : null),
            (r.pipeDefs = a
              ? () => ("function" == typeof a ? a() : a).map(pe)
              : null),
            r
          );
        });
      }
      function de(t) {
        return (
          ye(t) ||
          (function (t) {
            return t[Dt] || null;
          })(t)
        );
      }
      function pe(t) {
        return (function (t) {
          return t[Ft] || null;
        })(t);
      }
      const fe = {};
      function me(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || ce,
          declarations: t.declarations || ce,
          imports: t.imports || ce,
          exports: t.exports || ce,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            tt(() => {
              fe[t.id] = t.type;
            }),
          e
        );
      }
      function ge(t, e) {
        if (null == t) return le;
        const n = {};
        for (const i in t)
          if (t.hasOwnProperty(i)) {
            let r = t[i],
              s = r;
            Array.isArray(r) && ((s = r[1]), (r = r[0])),
              (n[r] = i),
              e && (e[r] = s);
          }
        return n;
      }
      const _e = ue;
      function ye(t) {
        return t[It] || null;
      }
      function be(t, e) {
        return t.hasOwnProperty(Nt) ? t[Nt] : null;
      }
      function ve(t, e) {
        const n = t[Rt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${bt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function we(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Ce(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Ee(t) {
        return 0 != (8 & t.flags);
      }
      function xe(t) {
        return 2 == (2 & t.flags);
      }
      function ke(t) {
        return 1 == (1 & t.flags);
      }
      function Se(t) {
        return null !== t.template;
      }
      function Ae(t) {
        return 0 != (512 & t[2]);
      }
      let Te = void 0;
      function Oe() {
        return void 0 !== Te
          ? Te
          : "undefined" != typeof document
          ? document
          : void 0;
      }
      function Ie(t) {
        return !!t.listen;
      }
      const De = { createRenderer: (t, e) => Oe() };
      function Fe(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Re(t, e) {
        return Fe(e[t + 19]);
      }
      function Pe(t, e) {
        return Fe(e[t.index]);
      }
      function Ne(t, e) {
        return t.data[e + 19];
      }
      function Me(t, e) {
        const n = e[t];
        return we(n) ? n : n[0];
      }
      function Le(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Ve(t) {
        return 4 == (4 & t[2]);
      }
      function Be(t) {
        return 128 == (128 & t[2]);
      }
      function je(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function He(t) {
        t[18] = 0;
      }
      const ze = {
        lFrame: an(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function qe() {
        return ze.bindingsEnabled;
      }
      function $e() {
        return ze.lFrame.lView;
      }
      function Ue() {
        return ze.lFrame.tView;
      }
      function We(t) {
        ze.lFrame.contextLView = t;
      }
      function Ge() {
        return ze.lFrame.previousOrParentTNode;
      }
      function Ke(t, e) {
        (ze.lFrame.previousOrParentTNode = t), (ze.lFrame.isParent = e);
      }
      function Ze() {
        return ze.lFrame.isParent;
      }
      function Qe() {
        ze.lFrame.isParent = !1;
      }
      function Ye() {
        return ze.checkNoChangesMode;
      }
      function Xe(t) {
        ze.checkNoChangesMode = t;
      }
      function Je() {
        return ze.lFrame.bindingIndex++;
      }
      function tn(t, e) {
        const n = ze.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t),
          (n.currentDirectiveIndex = e);
      }
      function en() {
        return ze.lFrame.currentQueryIndex;
      }
      function nn(t) {
        ze.lFrame.currentQueryIndex = t;
      }
      function rn(t, e) {
        const n = on();
        (ze.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function sn(t, e) {
        const n = on(),
          i = t[1];
        (ze.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = i),
          (n.contextLView = t),
          (n.bindingIndex = i.bindingStartIndex);
      }
      function on() {
        const t = ze.lFrame,
          e = null === t ? null : t.child;
        return null === e ? an(t) : e;
      }
      function an(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentSanitizer: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function ln() {
        const t = ze.lFrame;
        return (
          (ze.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const cn = ln;
      function hn() {
        const t = ln();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.currentSanitizer = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function un() {
        return ze.lFrame.selectedIndex;
      }
      function dn(t) {
        ze.lFrame.selectedIndex = t;
      }
      function pn() {
        const t = ze.lFrame;
        return Ne(t.tView, t.selectedIndex);
      }
      function fn(t, e) {
        for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
          const e = t.data[n];
          e.afterContentInit &&
            (t.contentHooks || (t.contentHooks = [])).push(
              -n,
              e.afterContentInit
            ),
            e.afterContentChecked &&
              ((t.contentHooks || (t.contentHooks = [])).push(
                n,
                e.afterContentChecked
              ),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(
                n,
                e.afterContentChecked
              )),
            e.afterViewInit &&
              (t.viewHooks || (t.viewHooks = [])).push(-n, e.afterViewInit),
            e.afterViewChecked &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                n,
                e.afterViewChecked
              )),
            null != e.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
        }
      }
      function mn(t, e, n) {
        yn(t, e, 3, n);
      }
      function gn(t, e, n, i) {
        (3 & t[2]) === n && yn(t, e, n, i);
      }
      function _n(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 1023), (n += 1), (t[2] = n));
      }
      function yn(t, e, n, i) {
        const r = null != i ? i : -1;
        let s = 0;
        for (let o = void 0 !== i ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((s = e[o]), null != i && s >= i)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (s < r || -1 == r) &&
                (bn(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function bn(t, e, n, i) {
        const r = n[i] < 0,
          s = n[i + 1],
          o = t[r ? -n[i] : n[i]];
        r
          ? t[2] >> 10 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 1024), s.call(o))
          : s.call(o);
      }
      class vn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function wn(t, e, n) {
        const i = Ie(t);
        let r = 0;
        for (; r < n.length; ) {
          const s = n[r];
          if ("number" == typeof s) {
            if (0 !== s) break;
            r++;
            const o = n[r++],
              a = n[r++],
              l = n[r++];
            i ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = n[++r];
            En(o)
              ? i && t.setProperty(e, o, a)
              : i
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function Cn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function En(t) {
        return 64 === t.charCodeAt(0);
      }
      function xn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let i = 0; i < e.length; i++) {
            const r = e[i];
            "number" == typeof r
              ? (n = r)
              : 0 === n ||
                kn(t, n, r, null, -1 === n || 2 === n ? e[++i] : null);
          }
        }
        return t;
      }
      function kn(t, e, n, i, r) {
        let s = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; s < t.length; ) {
            const n = t[s++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < t.length; ) {
          const e = t[s];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === i) return void (null !== r && (t[s + 1] = r));
            if (i === t[s + 1]) return void (t[s + 2] = r);
          }
          s++, null !== i && s++, null !== r && s++;
        }
        -1 !== o && (t.splice(o, 0, e), (s = o + 1)),
          t.splice(s++, 0, n),
          null !== i && t.splice(s++, 0, i),
          null !== r && t.splice(s++, 0, r);
      }
      function Sn(t) {
        return -1 !== t;
      }
      function An(t) {
        return 32767 & t;
      }
      function Tn(t) {
        return t >> 16;
      }
      function On(t, e) {
        let n = Tn(t),
          i = e;
        for (; n > 0; ) (i = i[15]), n--;
        return i;
      }
      function In(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function Dn(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : In(t);
      }
      const Fn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Ot))();
      function Rn(t) {
        return t instanceof Function ? t() : t;
      }
      let Pn = !0;
      function Nn(t) {
        const e = Pn;
        return (Pn = t), e;
      }
      let Mn = 0;
      function Ln(t, e) {
        const n = Bn(t, e);
        if (-1 !== n) return n;
        const i = e[1];
        i.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Vn(i.data, t),
          Vn(e, null),
          Vn(i.blueprint, null));
        const r = jn(t, e),
          s = t.injectorIndex;
        if (Sn(r)) {
          const t = An(r),
            n = On(r, e),
            i = n[1].data;
          for (let r = 0; r < 8; r++) e[s + r] = n[t + r] | i[t + r];
        }
        return (e[s + 8] = r), s;
      }
      function Vn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Bn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function jn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          i = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), i++;
        return n ? n.injectorIndex | (i << 16) : -1;
      }
      function Hn(t, e, n) {
        !(function (t, e, n) {
          let i = "string" != typeof n ? n[Mt] : n.charCodeAt(0) || 0;
          null == i && (i = n[Mt] = Mn++);
          const r = 255 & i,
            s = 1 << r,
            o = 64 & r,
            a = 32 & r,
            l = e.data;
          128 & r
            ? o
              ? a
                ? (l[t + 7] |= s)
                : (l[t + 6] |= s)
              : a
              ? (l[t + 5] |= s)
              : (l[t + 4] |= s)
            : o
            ? a
              ? (l[t + 3] |= s)
              : (l[t + 2] |= s)
            : a
            ? (l[t + 1] |= s)
            : (l[t] |= s);
        })(t, e, n);
      }
      function zn(t, e, n, i = ot.Default, r) {
        if (null !== t) {
          const r = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t[Mt];
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof r) {
            rn(e, t);
            try {
              const t = r();
              if (null != t || i & ot.Optional) return t;
              throw new Error(`No provider for ${Dn(n)}!`);
            } finally {
              cn();
            }
          } else if ("number" == typeof r) {
            if (-1 === r) return new Zn(t, e);
            let s = null,
              o = Bn(t, e),
              a = -1,
              l = i & ot.Host ? e[16][6] : null;
            for (
              (-1 === o || i & ot.SkipSelf) &&
              ((a = -1 === o ? jn(t, e) : e[o + 8]),
              Kn(i, !1) ? ((s = e[1]), (o = An(a)), (e = On(a, e))) : (o = -1));
              -1 !== o;

            ) {
              a = e[o + 8];
              const t = e[1];
              if (Gn(r, o, t.data)) {
                const t = $n(o, e, n, s, i, l);
                if (t !== qn) return t;
              }
              Kn(i, e[1].data[o + 8] === l) && Gn(r, o, e)
                ? ((s = t), (o = An(a)), (e = On(a, e)))
                : (o = -1);
            }
          }
        }
        if (
          (i & ot.Optional && void 0 === r && (r = null),
          0 == (i & (ot.Self | ot.Host)))
        ) {
          const t = e[9],
            s = Ut(void 0);
          try {
            return t ? t.get(n, r, i & ot.Optional) : Zt(n, r, i & ot.Optional);
          } finally {
            Ut(s);
          }
        }
        if (i & ot.Optional) return r;
        throw new Error(`NodeInjector: NOT_FOUND [${Dn(n)}]`);
      }
      const qn = {};
      function $n(t, e, n, i, r, s) {
        const o = e[1],
          a = o.data[t + 8],
          l = Un(
            a,
            o,
            n,
            null == i ? xe(a) && Pn : i != o && 3 === a.type,
            r & ot.Host && s === a
          );
        return null !== l ? Wn(e, o, l, a) : qn;
      }
      function Un(t, e, n, i, r) {
        const s = t.providerIndexes,
          o = e.data,
          a = 65535 & s,
          l = t.directiveStart,
          c = s >> 16,
          h = r ? a + c : t.directiveEnd;
        for (let u = i ? a : a + c; u < h; u++) {
          const t = o[u];
          if ((u < l && n === t) || (u >= l && t.type === n)) return u;
        }
        if (r) {
          const t = o[l];
          if (t && Se(t) && t.type === n) return l;
        }
        return null;
      }
      function Wn(t, e, n, i) {
        let r = t[n];
        const s = e.data;
        if (r instanceof vn) {
          const o = r;
          if (o.resolving) throw new Error(`Circular dep for ${Dn(s[n])}`);
          const a = Nn(o.canSeeViewProviders);
          let l;
          (o.resolving = !0), o.injectImpl && (l = Ut(o.injectImpl)), rn(t, i);
          try {
            (r = t[n] = o.factory(void 0, s, t, i)),
              e.firstCreatePass &&
                n >= i.directiveStart &&
                (function (t, e, n) {
                  const { onChanges: i, onInit: r, doCheck: s } = e;
                  i &&
                    ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                    (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                      t,
                      i
                    )),
                    r &&
                      (n.preOrderHooks || (n.preOrderHooks = [])).push(-t, r),
                    s &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s));
                })(n, s[n], e);
          } finally {
            o.injectImpl && Ut(l), Nn(a), (o.resolving = !1), cn();
          }
        }
        return r;
      }
      function Gn(t, e, n) {
        const i = 64 & t,
          r = 32 & t;
        let s;
        return (
          (s =
            128 & t
              ? i
                ? r
                  ? n[e + 7]
                  : n[e + 6]
                : r
                ? n[e + 5]
                : n[e + 4]
              : i
              ? r
                ? n[e + 3]
                : n[e + 2]
              : r
              ? n[e + 1]
              : n[e]),
          !!(s & (1 << t))
        );
      }
      function Kn(t, e) {
        return !(t & ot.Self || (t & ot.Host && e));
      }
      class Zn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return zn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Qn(t) {
        return tt(() => {
          const e = Object.getPrototypeOf(t.prototype).constructor,
            n =
              e[Nt] ||
              (function t(e) {
                const n = e;
                if (xt(e))
                  return () => {
                    const e = t(Et(n));
                    return e ? e() : null;
                  };
                let i = be(n);
                if (null === i) {
                  const t = pt(n);
                  i = t && t.factory;
                }
                return i || null;
              })(e);
          return null !== n ? n : (t) => new t();
        });
      }
      function Yn(t) {
        return t.ngDebugContext;
      }
      function Xn(t) {
        return t.ngOriginalError;
      }
      function Jn(t, ...e) {
        t.error(...e);
      }
      class ti {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            i = (function (t) {
              return t.ngErrorLogger || Jn;
            })(t);
          i(this._console, "ERROR", t),
            e && i(this._console, "ORIGINAL ERROR", e),
            n && i(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (Yn(t) ? Yn(t) : this._findContext(Xn(t))) : null;
        }
        _findOriginalError(t) {
          let e = Xn(t);
          for (; e && Xn(e); ) e = Xn(e);
          return e;
        }
      }
      class ei {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class ni extends ei {
        getTypeName() {
          return "HTML";
        }
      }
      class ii extends ei {
        getTypeName() {
          return "Style";
        }
      }
      class ri extends ei {
        getTypeName() {
          return "Script";
        }
      }
      class si extends ei {
        getTypeName() {
          return "URL";
        }
      }
      class oi extends ei {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function ai(t) {
        return t instanceof ei ? t.changingThisBreaksApplicationSecurity : t;
      }
      function li(t, e) {
        const n = ci(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      function ci(t) {
        return (t instanceof ei && t.getTypeName()) || null;
      }
      let hi = !0,
        ui = !1;
      function di() {
        return (ui = !0), hi;
      }
      class pi {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            ));
          let e = this.inertDocument.body;
          if (null == e) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t),
              (e = this.inertDocument.createElement("body")),
              t.appendChild(e);
          }
          (e.innerHTML =
            '<svg><g onload="this.parentNode.remove()"></g></svg>'),
            !e.querySelector || e.querySelector("svg")
              ? ((e.innerHTML =
                  '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                (this.getInertBodyElement =
                  e.querySelector &&
                  e.querySelector("svg img") &&
                  (function () {
                    try {
                      return !!window.DOMParser;
                    } catch (t) {
                      return !1;
                    }
                  })()
                    ? this.getInertBodyElement_DOMParser
                    : this.getInertBodyElement_InertDocument))
              : (this.getInertBodyElement = this.getInertBodyElement_XHR);
        }
        getInertBodyElement_XHR(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            t = encodeURI(t);
          } catch (i) {
            return null;
          }
          const e = new XMLHttpRequest();
          (e.responseType = "document"),
            e.open("GET", "data:text/html;charset=utf-8," + t, !1),
            e.send(void 0);
          const n = e.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            const e = new window.DOMParser().parseFromString(t, "text/html")
              .body;
            return e.removeChild(e.firstChild), e;
          } catch (e) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = t), e;
          const n = this.inertDocument.createElement("body");
          return (
            (n.innerHTML = t),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let i = e.length - 1; 0 < i; i--) {
            const n = e.item(i).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const fi = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        mi = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function gi(t) {
        return (t = String(t)).match(fi) || t.match(mi)
          ? t
          : (di() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      function _i(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function yi(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const bi = _i("area,br,col,hr,img,wbr"),
        vi = _i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        wi = _i("rp,rt"),
        Ci = yi(wi, vi),
        Ei = yi(
          bi,
          yi(
            vi,
            _i(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          yi(
            wi,
            _i(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Ci
        ),
        xi = _i("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        ki = _i("srcset"),
        Si = yi(
          xi,
          ki,
          _i(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          _i(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Ai = _i("script,style,template");
      class Ti {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Ei.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Ai.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r),
              e = t.name,
              s = e.toLowerCase();
            if (!Si.hasOwnProperty(s)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            xi[s] && (o = gi(o)),
              ki[s] &&
                ((i = o),
                (o = (i = String(i))
                  .split(",")
                  .map((t) => gi(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', Di(o), '"');
          }
          var i;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Ei.hasOwnProperty(e) &&
            !bi.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Di(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const Oi = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Ii = /([^\#-~ |!])/g;
      function Di(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(Oi, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Ii, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Fi;
      function Ri(t, e) {
        let n = null;
        try {
          Fi = Fi || new pi(t);
          let i = e ? String(e) : "";
          n = Fi.getInertBodyElement(i);
          let r = 5,
            s = i;
          do {
            if (0 === r)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            r--, (i = s), (s = n.innerHTML), (n = Fi.getInertBodyElement(i));
          } while (i !== s);
          const o = new Ti(),
            a = o.sanitizeChildren(Pi(n) || n);
          return (
            di() &&
              o.sanitizedSomething &&
              console.warn(
                "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
              ),
            a
          );
        } finally {
          if (n) {
            const t = Pi(n) || n;
            for (; t.firstChild; ) t.removeChild(t.firstChild);
          }
        }
      }
      function Pi(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      const Ni = (function () {
          var t = {
            NONE: 0,
            HTML: 1,
            STYLE: 2,
            SCRIPT: 3,
            URL: 4,
            RESOURCE_URL: 5,
          };
          return (
            (t[t.NONE] = "NONE"),
            (t[t.HTML] = "HTML"),
            (t[t.STYLE] = "STYLE"),
            (t[t.SCRIPT] = "SCRIPT"),
            (t[t.URL] = "URL"),
            (t[t.RESOURCE_URL] = "RESOURCE_URL"),
            t
          );
        })(),
        Mi = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|Z|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:attr|calc|var))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        Li = /^url\(([^)]+)\)$/;
      function Vi(t) {
        const e = (function () {
          const t = $e();
          return t && t[12];
        })();
        return e
          ? e.sanitize(Ni.HTML, t) || ""
          : li(t, "HTML")
          ? ai(t)
          : Ri(Oe(), In(t));
      }
      function Bi(t, e) {
        t.__ngContext__ = e;
      }
      function ji(t) {
        throw new Error(
          `Multiple components match node with tagname ${t.tagName}`
        );
      }
      function Hi() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function zi(t, e, n) {
        let i = t.length;
        for (;;) {
          const r = t.indexOf(e, n);
          if (-1 === r) return r;
          if (0 === r || t.charCodeAt(r - 1) <= 32) {
            const n = e.length;
            if (r + n === i || t.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      function qi(t, e, n) {
        let i = 0;
        for (; i < t.length; ) {
          let r = t[i++];
          if (n && "class" === r) {
            if (((r = t[i]), -1 !== zi(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; i < t.length && "string" == typeof (r = t[i++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function $i(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function Ui(t, e, n) {
        let i = 4;
        const r = t.attrs || [],
          s = (function (t) {
            for (let e = 0; e < t.length; e++) if (Cn(t[e])) return e;
            return t.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !$i(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Wi(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== t.attrs) {
                  if (!qi(t.attrs, c, n)) {
                    if (Wi(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const h = Gi(
                  8 & i ? "class" : l,
                  r,
                  0 == t.type && "ng-template" !== t.tagName,
                  n
                );
                if (-1 === h) {
                  if (Wi(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = h > s ? "" : r[h + 1].toLowerCase();
                  const e = 8 & i ? t : null;
                  if ((e && -1 !== zi(e, c, 0)) || (2 & i && c !== t)) {
                    if (Wi(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Wi(i) && !Wi(l)) return !1;
            if (o && Wi(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return Wi(i) || o;
      }
      function Wi(t) {
        return 0 == (1 & t);
      }
      function Gi(t, e, n, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !n) {
          let n = !1;
          for (; r < e.length; ) {
            const i = e[r];
            if (i === t) return r;
            if (3 === i || 6 === i) n = !0;
            else {
              if (1 === i || 2 === i) {
                let t = e[++r];
                for (; "string" == typeof t; ) t = e[++r];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              if (t[n] === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Ki(t, e, n = !1) {
        for (let i = 0; i < e.length; i++) if (Ui(t, e[i], n)) return !0;
        return !1;
      }
      function Zi(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const i = e[n];
          if (t.length === i.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function Qi(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Yi(t) {
        let e = t[0],
          n = 1,
          i = 2,
          r = "",
          s = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & i) {
              const e = t[++n];
              r += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & i ? (r += "." + o) : 4 & i && (r += " " + o);
          else
            "" === r || Wi(o) || ((e += Qi(s, r)), (r = "")),
              (i = o),
              (s = s || !Wi(i));
          n++;
        }
        return "" !== r && (e += Qi(s, r)), e;
      }
      const Xi = {};
      function Ji(t) {
        const e = t[3];
        return Ce(e) ? e[3] : e;
      }
      function tr(t) {
        er(Ue(), $e(), un() + t, Ye());
      }
      function er(t, e, n, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const i = t.preOrderCheckHooks;
            null !== i && mn(e, i, n);
          } else {
            const i = t.preOrderHooks;
            null !== i && gn(e, i, 0, n);
          }
        dn(n);
      }
      function nr(t, e) {
        return (t << 17) | (e << 2);
      }
      function ir(t) {
        return (t >> 17) & 32767;
      }
      function rr(t) {
        return 2 | t;
      }
      function sr(t) {
        return (131068 & t) >> 2;
      }
      function or(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function ar(t) {
        return 1 | t;
      }
      function lr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) {
            const r = n[i],
              s = n[i + 1];
            if (-1 !== s) {
              const n = t.data[s];
              nn(r), n.contentQueries(2, e[s], s);
            }
          }
      }
      function cr(t, e, n) {
        return Ie(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function hr(t, e, n, i, r, s, o, a, l, c) {
        const h = e.blueprint.slice();
        return (
          (h[0] = r),
          (h[2] = 140 | i),
          He(h),
          (h[3] = h[15] = t),
          (h[8] = n),
          (h[10] = o || (t && t[10])),
          (h[11] = a || (t && t[11])),
          (h[12] = l || (t && t[12]) || null),
          (h[9] = c || (t && t[9]) || null),
          (h[6] = s),
          (h[16] = 2 == e.type ? t[16] : h),
          h
        );
      }
      function ur(t, e, n, i, r, s) {
        const o = n + 19,
          a =
            t.data[o] ||
            (function (t, e, n, i, r, s) {
              const o = Ge(),
                a = Ze(),
                l = a ? o : o && o.parent,
                c = (t.data[n] = wr(0, l && l !== e ? l : null, i, n, r, s));
              return (
                null === t.firstChild && (t.firstChild = c),
                o &&
                  (!a || null != o.child || (null === c.parent && 2 !== o.type)
                    ? a || (o.next = c)
                    : (o.child = c)),
                c
              );
            })(t, e, o, i, r, s);
        return Ke(a, !0), a;
      }
      function dr(t, e, n) {
        sn(e, e[6]);
        try {
          const i = t.viewQuery;
          null !== i && $r(1, i, n);
          const r = t.template;
          null !== r && mr(t, e, r, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && lr(t, e),
            t.staticViewQueries && $r(2, t.viewQuery, n);
          const s = t.components;
          null !== s &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Br(t, e[n]);
            })(e, s);
        } finally {
          (e[2] &= -5), hn();
        }
      }
      function pr(t, e, n, i) {
        const r = e[2];
        if (256 == (256 & r)) return;
        sn(e, e[6]);
        const s = Ye();
        try {
          He(e),
            (ze.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && mr(t, e, n, 2, i);
          const o = 3 == (3 & r);
          if (!s)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && mn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && gn(e, n, 0, null), _n(e, 0);
            }
          if (
            ((function (t) {
              let e = t[13];
              for (; null !== e; ) {
                let n;
                if (Ce(e) && (n = e[2]) >> 1 == -1) {
                  for (let t = 9; t < e.length; t++) {
                    const n = e[t],
                      i = n[1];
                    Be(n) && pr(i, n, i.template, n[8]);
                  }
                  0 != (1 & n) && Lr(e, t[16]);
                }
                e = e[4];
              }
            })(e),
            null !== t.contentQueries && lr(t, e),
            !s)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && mn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && gn(e, n, 1), _n(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let i = t.expandoStartIndex,
                  r = -1,
                  s = -1;
                for (let t = 0; t < n.length; t++) {
                  const o = n[t];
                  "number" == typeof o
                    ? o <= 0
                      ? ((s = 0 - o), dn(s), (i += 9 + n[++t]), (r = i))
                      : (i += o)
                    : (null !== o && (tn(i, r), o(2, e[r])), r++);
                }
              }
            } finally {
              dn(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Vr(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && $r(2, l, i), !s))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && mn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && gn(e, n, 2), _n(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            s || (e[2] &= -73);
        } finally {
          hn();
        }
      }
      function fr(t, e, n, i) {
        const r = e[10],
          s = !Ye(),
          o = Ve(e);
        try {
          s && !o && r.begin && r.begin(), o && dr(t, e, i), pr(t, e, n, i);
        } finally {
          s && !o && r.end && r.end();
        }
      }
      function mr(t, e, n, i, r) {
        const s = un();
        try {
          dn(-1), 2 & i && e.length > 19 && er(t, e, 0, Ye()), n(i, r);
        } finally {
          dn(s);
        }
      }
      function gr(t, e, n) {
        if (Ee(e)) {
          const i = e.directiveEnd;
          for (let r = e.directiveStart; r < i; r++) {
            const e = t.data[r];
            e.contentQueries && e.contentQueries(1, n[r], r);
          }
        }
      }
      function _r(t, e, n) {
        qe() &&
          ((function (t, e, n, i) {
            const r = n.directiveStart,
              s = n.directiveEnd;
            t.firstCreatePass || Ln(n, e), Bi(i, e);
            const o = n.initialInputs;
            for (let a = r; a < s; a++) {
              const i = t.data[a],
                s = Se(i);
              s && Rr(e, n, i);
              const l = Wn(e, t, a, n);
              Bi(l, e),
                null !== o && Pr(0, a - r, l, i, 0, o),
                s && (Me(n.index, e)[8] = l);
            }
          })(t, e, n, Pe(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const i = n.directiveStart,
                r = n.directiveEnd,
                s = t.expandoInstructions,
                o = t.firstCreatePass,
                a = n.index - 19;
              try {
                dn(a);
                for (let n = i; n < r; n++) {
                  const i = t.data[n],
                    r = e[n];
                  null !== i.hostBindings ||
                  0 !== i.hostVars ||
                  null !== i.hostAttrs
                    ? Ar(i, r)
                    : o && s.push(null);
                }
              } finally {
                dn(-1);
              }
            })(t, e, n));
      }
      function yr(t, e, n = Pe) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let s = 0; s < i.length; s += 2) {
            const o = i[s + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[r++] = a;
          }
        }
      }
      function br(t) {
        return (
          t.tView ||
          (t.tView = vr(
            1,
            -1,
            t.template,
            t.decls,
            t.vars,
            t.directiveDefs,
            t.pipeDefs,
            t.viewQuery,
            t.schemas,
            t.consts
          ))
        );
      }
      function vr(t, e, n, i, r, s, o, a, l, c) {
        const h = 19 + i,
          u = h + r,
          d = (function (t, e) {
            const n = [];
            for (let i = 0; i < e; i++) n.push(i < t ? null : Xi);
            return n;
          })(h, u);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, h),
          bindingStartIndex: h,
          expandoStartIndex: u,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: c,
        });
      }
      function wr(t, e, n, i, r, s) {
        return {
          type: n,
          index: i,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: r,
          attrs: s,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          residualStyles: void 0,
          classes: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function Cr(t, e, n) {
        for (let i in t)
          if (t.hasOwnProperty(i)) {
            const r = t[i];
            (n = null === n ? {} : n).hasOwnProperty(i)
              ? n[i].push(e, r)
              : (n[i] = [e, r]);
          }
        return n;
      }
      function Er(t, e, n, i, r, s, o, a) {
        const l = Pe(e, n);
        let c,
          h = e.inputs;
        var u;
        !a && null != h && (c = h[i])
          ? (Qr(t, n, c, i, r),
            xe(e) &&
              (function (t, e) {
                const n = Me(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((i =
              "class" === (u = i)
                ? "className"
                : "for" === u
                ? "htmlFor"
                : "formaction" === u
                ? "formAction"
                : "innerHtml" === u
                ? "innerHTML"
                : "readonly" === u
                ? "readOnly"
                : "tabindex" === u
                ? "tabIndex"
                : u),
            (r = null != o ? o(r, e.tagName || "", i) : r),
            Ie(s)
              ? s.setProperty(l, i, r)
              : En(i) || (l.setProperty ? l.setProperty(i, r) : (l[i] = r)));
      }
      function xr(t, e, n, i) {
        let r = !1;
        if (qe()) {
          const s = (function (t, e, n) {
              const i = t.directiveRegistry;
              let r = null;
              if (i)
                for (let s = 0; s < i.length; s++) {
                  const o = i[s];
                  Ki(n, o.selectors, !1) &&
                    (r || (r = []),
                    Hn(Ln(n, e), t, o.type),
                    Se(o)
                      ? (2 & n.flags && ji(n), Or(t, n), r.unshift(o))
                      : r.push(o));
                }
              return r;
            })(t, e, n),
            o = null === i ? null : { "": -1 };
          if (null !== s) {
            let i = 0;
            (r = !0), Dr(n, t.data.length, s.length);
            for (let t = 0; t < s.length; t++) {
              const e = s[t];
              e.providersResolver && e.providersResolver(e);
            }
            Tr(t, n, s.length);
            let a = !1,
              l = !1;
            for (let r = 0; r < s.length; r++) {
              const c = s[r];
              (n.mergedAttrs = xn(n.mergedAttrs, c.hostAttrs)),
                Fr(t, e, c),
                Ir(t.data.length - 1, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128),
                !a &&
                  (c.onChanges || c.onInit || c.doCheck) &&
                  ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                    n.index - 19
                  ),
                  (a = !0)),
                l ||
                  (!c.onChanges && !c.doCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 19
                  ),
                  (l = !0)),
                kr(t, c),
                (i += c.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                i = t.data,
                r = e.attrs,
                s = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = i[l],
                  e = t.inputs;
                s.push(null !== r ? Nr(e, r) : null),
                  (o = Cr(e, l, o)),
                  (a = Cr(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = s),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n),
              Sr(t, e, i);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const i = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const r = n[e[t + 1]];
                  if (null == r)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  i.push(e[t], r);
                }
              }
            })(n, i, o);
        }
        return (n.mergedAttrs = xn(n.mergedAttrs, n.attrs)), r;
      }
      function kr(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function Sr(t, e, n) {
        for (let i = 0; i < n; i++)
          e.push(Xi), t.blueprint.push(Xi), t.data.push(null);
      }
      function Ar(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Tr(t, e, n) {
        const i = 19 - e.index,
          r = t.data.length - (65535 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(i, r, n);
      }
      function Or(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function Ir(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
          Se(e) && (n[""] = t);
        }
      }
      function Dr(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Fr(t, e, n) {
        t.data.push(n);
        const i = n.factory || (n.factory = be(n.type)),
          r = new vn(i, Se(n), null);
        t.blueprint.push(r), e.push(r);
      }
      function Rr(t, e, n) {
        const i = Pe(e, t),
          r = br(n),
          s = t[10],
          o = jr(
            t,
            hr(t, r, null, n.onPush ? 64 : 16, i, e, s, s.createRenderer(i, n))
          );
        t[e.index] = o;
      }
      function Pr(t, e, n, i, r, s) {
        const o = s[e];
        if (null !== o) {
          const t = i.setInput;
          for (let e = 0; e < o.length; ) {
            const r = o[e++],
              s = o[e++],
              a = o[e++];
            null !== t ? i.setInput(n, a, r, s) : (n[s] = a);
          }
        }
      }
      function Nr(t, e) {
        let n = null,
          i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              t.hasOwnProperty(r) &&
                (null === n && (n = []), n.push(r, t[r], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return n;
      }
      function Mr(t, e, n, i) {
        return new Array(t, !0, -2, e, null, null, i, n, null);
      }
      function Lr(t, e) {
        const n = t[5];
        for (let i = 0; i < n.length; i++) {
          const t = n[i],
            r = t[3][3][16];
          if (r !== e && 0 == (16 & r[2])) {
            const e = t[1];
            pr(e, t, e.template, t[8]);
          }
        }
      }
      function Vr(t, e) {
        const n = Me(e, t);
        if (Be(n) && 80 & n[2]) {
          const t = n[1];
          pr(t, n, t.template, n[8]);
        }
      }
      function Br(t, e) {
        const n = Me(e, t),
          i = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(i, n),
          dr(i, n, n[8]);
      }
      function jr(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Hr(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Ji(t);
          if (Ae(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function zr(t, e, n) {
        const i = e[10];
        i.begin && i.begin();
        try {
          pr(t, e, t.template, n);
        } catch (r) {
          throw (Zr(e, r), r);
        } finally {
          i.end && i.end();
        }
      }
      function qr(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              i = Le(n),
              r = i[1];
            fr(r, i, r.template, n);
          }
        })(t[8]);
      }
      function $r(t, e, n) {
        nn(0), e(t, n);
      }
      const Ur = (() => Promise.resolve(null))();
      function Wr(t) {
        return t[7] || (t[7] = []);
      }
      function Gr(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Kr(t, e) {
        return (function (t) {
          for (; Array.isArray(t); ) {
            if ("object" == typeof t[1]) return t;
            t = t[0];
          }
          return null;
        })(e[t.index])[11];
      }
      function Zr(t, e) {
        const n = t[9],
          i = n ? n.get(ti, null) : null;
        i && i.handleError(e);
      }
      function Qr(t, e, n, i, r) {
        for (let s = 0; s < n.length; ) {
          const o = n[s++],
            a = n[s++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function Yr(t, e) {
        const n = e[3];
        return -1 === t.index ? (Ce(n) ? n : null) : n;
      }
      function Xr(t, e) {
        const n = Yr(t, e);
        return n ? hs(e[11], n[7]) : null;
      }
      function Jr(t, e, n, i, r) {
        if (null != i) {
          let s,
            o = !1;
          Ce(i) ? (s = i) : we(i) && ((o = !0), (i = i[0]));
          const a = Fe(i);
          0 === t && null !== n
            ? null == r
              ? ls(e, n, a)
              : as(e, n, a, r || null)
            : 1 === t && null !== n
            ? as(e, n, a, r || null)
            : 2 === t
            ? (function (t, e, n) {
                const i = hs(t, e);
                i &&
                  (function (t, e, n, i) {
                    Ie(t) ? t.removeChild(e, n, i) : e.removeChild(n);
                  })(t, i, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != s &&
              (function (t, e, n, i, r) {
                const s = n[7];
                s !== Fe(n) && Jr(e, t, i, s, r);
                for (let o = 9; o < n.length; o++) {
                  const r = n[o];
                  ms(r[1], r, t, e, i, s);
                }
              })(e, t, s, n, r);
        }
      }
      function ts(t, e, n, i) {
        const r = Xr(t.node, e);
        r && ms(t, e, e[11], n ? 1 : 2, r, i);
      }
      function es(t, e) {
        const n = t[5],
          i = n.indexOf(e);
        n.splice(i, 1);
      }
      function ns(t, e) {
        if (t.length <= 9) return;
        const n = 9 + e,
          i = t[n];
        if (i) {
          const r = i[17];
          null !== r && r !== t && es(r, i), e > 0 && (t[n - 1][4] = i[4]);
          const s = ee(t, 9 + e);
          ts(i[1], i, !1, null);
          const o = s[5];
          null !== o && o.detachView(s[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function is(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Ie(n) && n.destroyNode && ms(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return ss(t[1], t);
              for (; e; ) {
                let n = null;
                if (we(e)) n = e[13];
                else {
                  const t = e[9];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    we(e) && ss(e[1], e), (e = rs(e, t));
                  null === e && (e = t), we(e) && ss(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function rs(t, e) {
        let n;
        return we(t) && (n = t[6]) && 2 === n.type
          ? Yr(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function ss(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let i = 0; i < n.length; i += 2) {
                  const t = e[n[i]];
                  if (!(t instanceof vn)) {
                    const e = n[i + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const r = n[i + 1],
                      s = "function" == typeof r ? r(e) : Fe(e[r]),
                      o = t[n[i + 2]],
                      a = n[i + 3];
                    "boolean" == typeof a
                      ? s.removeEventListener(n[i], o, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (i += 2);
                  } else n[i].call(t[n[i + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Ie(e[11]) && e[11].destroy();
          const i = e[17];
          if (null !== i && Ce(e[3])) {
            i !== e[3] && es(i, e);
            const n = e[5];
            null !== n && n.detachView(t);
          }
        }
      }
      function os(t, e, n) {
        let i = e.parent;
        for (; null != i && (4 === i.type || 5 === i.type); )
          i = (e = i).parent;
        if (null == i) {
          const t = n[6];
          return 2 === t.type ? Xr(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return Pe(e, n).parentNode;
        if (2 & i.flags) {
          const e = t.data,
            n = e[e[i.index].directiveStart].encapsulation;
          if (n !== ae.ShadowDom && n !== ae.Native) return null;
        }
        return Pe(i, n);
      }
      function as(t, e, n, i) {
        Ie(t) ? t.insertBefore(e, n, i) : e.insertBefore(n, i, !0);
      }
      function ls(t, e, n) {
        Ie(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function cs(t, e, n, i) {
        null !== i ? as(t, e, n, i) : ls(t, e, n);
      }
      function hs(t, e) {
        return Ie(t) ? t.parentNode(e) : e.parentNode;
      }
      function us(t, e) {
        if (2 === t.type) {
          const n = Yr(t, e);
          return null === n ? null : ps(n.indexOf(e, 9) - 9, n);
        }
        return 4 === t.type || 5 === t.type ? Pe(t, e) : null;
      }
      function ds(t, e, n, i) {
        const r = os(t, i, e);
        if (null != r) {
          const t = e[11],
            s = us(i.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) cs(t, r, n[e], s);
          else cs(t, r, n, s);
        }
      }
      function ps(t, e) {
        const n = 9 + t + 1;
        if (n < e.length) {
          const t = e[n],
            i = t[1].firstChild;
          if (null !== i)
            return (function t(e, n) {
              if (null !== n) {
                const i = n.type;
                if (3 === i) return Pe(n, e);
                if (0 === i) return ps(-1, e[n.index]);
                if (4 === i || 5 === i) {
                  const i = n.child;
                  if (null !== i) return t(e, i);
                  {
                    const t = e[n.index];
                    return Ce(t) ? ps(-1, t) : Fe(t);
                  }
                }
                {
                  const i = e[16],
                    r = i[6],
                    s = Ji(i),
                    o = r.projection[n.projection];
                  return null != o ? t(s, o) : t(e, n.next);
                }
              }
              return null;
            })(t, i);
        }
        return e[7];
      }
      function fs(t, e, n, i, r, s, o) {
        for (; null != n; ) {
          const a = i[n.index],
            l = n.type;
          o && 0 === e && (a && Bi(Fe(a), i), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (fs(t, e, n.child, i, r, s, !1), Jr(e, t, r, a, s))
                : 1 === l
                ? gs(t, e, i, n, r, s)
                : Jr(e, t, r, a, s)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function ms(t, e, n, i, r, s) {
        fs(n, i, t.node.child, e, r, s, !1);
      }
      function gs(t, e, n, i, r, s) {
        const o = n[16],
          a = o[6].projection[i.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Jr(e, t, r, a[l], s);
        else fs(t, e, a, o[3], r, s, !0);
      }
      function _s(t, e, n) {
        Ie(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function ys(t, e, n) {
        Ie(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class bs {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null),
            (this._tViewNode = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, i, r, s = !1) {
                for (; null !== i; ) {
                  const o = n[i.index];
                  if ((null !== o && r.push(Fe(o)), Ce(o)))
                    for (let e = 9; e < o.length; e++) {
                      const n = o[e],
                        i = n[1].firstChild;
                      null !== i && t(n[1], n, i, r);
                    }
                  const a = i.type;
                  if (4 === a || 5 === a) t(e, n, i.child, r);
                  else if (1 === a) {
                    const e = n[16],
                      s = e[6],
                      o = Ji(e);
                    let a = s.projection[i.projection];
                    null !== a && null !== o && t(o[1], o, a, r, !0);
                  }
                  i = s ? i.projectionNext : i.next;
                }
                return r;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          is(this._lView[1], this._lView);
        }
        onDestroy(t) {
          var e, n, i;
          (e = this._lView[1]),
            (i = t),
            Wr((n = this._lView)).push(i),
            e.firstCreatePass && Gr(e).push(n[7].length - 1, null);
        }
        markForCheck() {
          Hr(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          zr(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Xe(!0);
            try {
              zr(t, e, n);
            } finally {
              Xe(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            ms(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class vs extends bs {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          qr(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Xe(!0);
            try {
              qr(t);
            } finally {
              Xe(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let ws, Cs, Es;
      function xs(t, e, n) {
        return ws || (ws = class extends t {}), new ws(Pe(e, n));
      }
      function ks(t, e, n, i) {
        return (
          Cs ||
            (Cs = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = hr(this._declarationView, e, t, 16, null, e.node);
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const i = this._declarationView[5];
                null !== i && (n[5] = i.createEmbeddedView(e)), dr(e, n, t);
                const r = new bs(n);
                return (r._tViewNode = n[6]), r;
              }
            }),
          0 === n.type ? new Cs(i, n, xs(e, n, i)) : null
        );
      }
      function Ss(t, e, n, i) {
        let r;
        Es ||
          (Es = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return xs(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new Zn(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = jn(this._hostTNode, this._hostView),
                e = On(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let i = Tn(t),
                    r = e,
                    s = e[6];
                  for (; i > 1; ) (r = r[15]), (s = r[6]), i--;
                  return s;
                })(t, this._hostView, this._hostTNode);
              return Sn(t) && null != n
                ? new Zn(n, e)
                : new Zn(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - 9;
            }
            createEmbeddedView(t, e, n) {
              const i = t.createEmbeddedView(e || {});
              return this.insert(i, n), i;
            }
            createComponent(t, e, n, i, r) {
              const s = n || this.parentInjector;
              if (!r && null == t.ngModule && s) {
                const t = s.get(Xt, null);
                t && (r = t);
              }
              const o = t.create(s, i, void 0, r);
              return this.insert(o.hostView, e), o;
            }
            insert(t, e) {
              const n = t._lView,
                i = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Ce(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    i = new Es(e, e[6], e[3]);
                  i.detach(i.indexOf(t));
                }
              }
              const r = this._adjustIndex(e);
              return (
                (function (t, e, n, i) {
                  const r = 9 + i,
                    s = n.length;
                  i > 0 && (n[r - 1][4] = e),
                    i < s - 9
                      ? ((e[4] = n[r]), te(n, 9 + i, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const o = e[17];
                  null !== o &&
                    n !== o &&
                    (function (t, e) {
                      const n = t[5],
                        i = e[3][3][16];
                      16 != (16 & i[2]) && e[16] !== i && (t[2] |= 1),
                        null === n ? (t[5] = [e]) : n.push(e);
                    })(o, e);
                  const a = e[5];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(i, n, this._lContainer, r),
                ts(i, n, !0, ps(r, this._lContainer)),
                t.attachToViewContainerRef(this),
                te(this._lContainer[8], r, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1);
              (function (t, e) {
                const n = ns(t, e);
                n && is(n[1], n);
              })(this._lContainer, e),
                ee(this._lContainer[8], e);
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = ns(this._lContainer, e);
              return n && null != ee(this._lContainer[8], e) ? new bs(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const s = i[n.index];
        if (Ce(s))
          (r = s),
            (function (t, e) {
              t[2] = -2;
            })(r);
        else {
          let t;
          if (4 === n.type) t = Fe(s);
          else if (((t = i[11].createComment("")), Ae(i))) {
            const e = i[11],
              r = Pe(n, i);
            as(
              e,
              hs(e, r),
              t,
              (function (t, e) {
                return Ie(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, r)
            );
          } else ds(i[1], i, t, n);
          (i[n.index] = r = Mr(s, i, t, n)), jr(i, r);
        }
        return new Es(r, n, i);
      }
      let As = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Ts()), t;
      })();
      const Ts = function (t = !1) {
          return (function (t, e, n) {
            if (!n && xe(t)) {
              const n = Me(t.index, e);
              return new bs(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new bs(e[16], e)
              : null;
          })(Ge(), $e(), t);
        },
        Os = new Lt("Set Injector scope."),
        Is = {},
        Ds = {},
        Fs = [];
      let Rs = void 0;
      function Ps() {
        return void 0 === Rs && (Rs = new Yt()), Rs;
      }
      function Ns(t, e = null, n = null, i) {
        return new Ms(t, n, e || Ps(), i);
      }
      class Ms {
        constructor(t, e, n, i = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          e && Jt(e, (n) => this.processProvider(n, t, e)),
            Jt([t], (t) => this.processInjectorType(t, [], r)),
            this.records.set(Vt, Bs(void 0, this));
          const s = this.records.get(Os);
          (this.scope = null != s ? s.value : null),
            (this.source = i || ("object" == typeof t ? null : bt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Bt, n = ot.Default) {
          this.assertNotDestroyed();
          const i = $t(this);
          try {
            if (!(n & ot.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (r = t) ||
                    ("object" == typeof r && r instanceof Lt)) &&
                  ut(t);
                (e = n && this.injectableDefInScope(n) ? Bs(Ls(t), Is) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & ot.Self ? Ps() : this.parent).get(
              t,
              (e = n & ot.Optional && e === Bt ? null : e)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (
                ((s.ngTempTokenPath = s.ngTempTokenPath || []).unshift(bt(t)),
                i)
              )
                throw s;
              return (function (t, e, n, i) {
                const r = t.ngTempTokenPath;
                throw (
                  (e.__source && r.unshift(e.__source),
                  (t.message = (function (t, e, n, i = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let r = bt(e);
                    if (Array.isArray(e)) r = e.map(bt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let i = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof i ? JSON.stringify(i) : bt(i))
                          );
                        }
                      r = `{${t.join(", ")}}`;
                    }
                    return `${n}${i ? "(" + i + ")" : ""}[${r}]: ${t.replace(
                      jt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, r, n, i)),
                  (t.ngTokenPath = r),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            $t(i);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(bt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = Et(t))) return !1;
          let i = pt(t);
          const r = (null == i && t.ngModule) || void 0,
            s = void 0 === r ? t : r,
            o = -1 !== n.indexOf(s);
          if ((void 0 !== r && (i = pt(r)), null == i)) return !1;
          if (null != i.imports && !o) {
            let t;
            n.push(s);
            try {
              Jt(i.imports, (i) => {
                this.processInjectorType(i, e, n) &&
                  (void 0 === t && (t = []), t.push(i));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: i } = t[e];
                Jt(i, (t) => this.processProvider(t, n, i || Fs));
              }
          }
          this.injectorDefTypes.add(s), this.records.set(s, Bs(i.factory, Is));
          const a = i.providers;
          if (null != a && !o) {
            const e = t;
            Jt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== r && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let i = Hs((t = Et(t))) ? t : Et(t && t.provide);
          const r = (function (t, e, n) {
            return js(t) ? Bs(void 0, t.useValue) : Bs(Vs(t, e, n), Is);
          })(t, e, n);
          if (Hs(t) || !0 !== t.multi) {
            const t = this.records.get(i);
            t && void 0 !== t.multi && Hi();
          } else {
            let e = this.records.get(i);
            e
              ? void 0 === e.multi && Hi()
              : ((e = Bs(void 0, Is, !0)),
                (e.factory = () => Qt(e.multi)),
                this.records.set(i, e)),
              (i = t),
              e.multi.push(t);
          }
          this.records.set(i, r);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Ds
              ? (function (t) {
                  throw new Error(`Cannot instantiate cyclic dependency! ${t}`);
                })(bt(t))
              : e.value === Is && ((e.value = Ds), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Ls(t) {
        const e = ut(t),
          n = null !== e ? e.factory : be(t);
        if (null !== n) return n;
        const i = pt(t);
        if (null !== i) return i.factory;
        if (t instanceof Lt)
          throw new Error(`Token ${bt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = ne(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${bt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ft] || t[_t] || (t[gt] && t[gt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                      `This will become an error in v10. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Vs(t, e, n) {
        let i = void 0;
        if (Hs(t)) {
          const e = Et(t);
          return be(e) || Ls(e);
        }
        if (js(t)) i = () => Et(t.useValue);
        else if ((r = t) && r.useFactory)
          i = () => t.useFactory(...Qt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          i = () => Gt(Et(t.useExisting));
        else {
          const r = Et(t && (t.useClass || t.provide));
          if (
            (r ||
              (function (t, e, n) {
                let i = "";
                throw (
                  (t &&
                    e &&
                    (i = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${bt(t)}'` + i))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return be(r) || Ls(r);
          i = () => new r(...Qt(t.deps));
        }
        var r;
        return i;
      }
      function Bs(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function js(t) {
        return null !== t && "object" == typeof t && Ht in t;
      }
      function Hs(t) {
        return "function" == typeof t;
      }
      const zs = function (t, e, n) {
        return (function (t, e = null, n = null, i) {
          const r = Ns(t, e, n, i);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, e, t, n);
      };
      let qs = (() => {
          class t {
            static create(t, e) {
              return Array.isArray(t)
                ? zs(t, e, "")
                : zs(t.providers, t.parent, t.name || "");
            }
          }
          return (
            (t.THROW_IF_NOT_FOUND = Bt),
            (t.NULL = new Yt()),
            (t.ɵprov = ct({
              token: t,
              providedIn: "any",
              factory: () => Gt(Vt),
            })),
            (t.__NG_ELEMENT_ID__ = -1),
            t
          );
        })(),
        $s = new Map();
      const Us = new Set();
      function Ws(t) {
        return "string" == typeof t ? t : t.text();
      }
      function Gs(t, e) {
        let n = t.styles,
          i = t.classes,
          r = 0;
        for (let s = 0; s < e.length; s++) {
          const t = e[s];
          "number" == typeof t
            ? (r = t)
            : 1 == r
            ? (i = vt(i, t))
            : 2 == r && (n = vt(n, t + ": " + e[++s] + ";"));
        }
        null !== n && (t.styles = n), null !== i && (t.classes = i);
      }
      let Ks = null;
      function Zs() {
        if (!Ks) {
          const t = Ot.Symbol;
          if (t && t.iterator) Ks = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Ks = n);
            }
          }
        }
        return Ks;
      }
      function Qs(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      function Ys(t) {
        return (
          !!Xs(t) && (Array.isArray(t) || (!(t instanceof Map) && Zs() in t))
        );
      }
      function Xs(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Js(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function to(t, e, n, i) {
        const r = $e();
        return (
          Js(r, Je(), e) &&
            (Ue(),
            (function (t, e, n, i, r, s) {
              const o = Pe(t, e),
                a = e[11];
              if (null == i)
                Ie(a) ? a.removeAttribute(o, n, s) : o.removeAttribute(n);
              else {
                const e = null == r ? In(i) : r(i, t.tagName || "", n);
                Ie(a)
                  ? a.setAttribute(o, n, e, s)
                  : s
                  ? o.setAttributeNS(s, n, e)
                  : o.setAttribute(n, e);
              }
            })(pn(), r, t, e, n, i)),
          to
        );
      }
      function eo(t, e, n, i) {
        return Js(t, Je(), n) ? e + In(n) + i : Xi;
      }
      function no(t, e, n, i, r, s, o, a) {
        const l = $e(),
          c = Ue(),
          h = t + 19,
          u = c.firstCreatePass
            ? (function (t, e, n, i, r, s, o, a, l) {
                const c = e.consts,
                  h = ur(e, n[6], t, 0, o || null, je(c, a));
                xr(e, n, h, je(c, l)), fn(e, h);
                const u = (h.tViews = vr(
                    2,
                    -1,
                    i,
                    r,
                    s,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    c
                  )),
                  d = wr(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = h.injectorIndex),
                  (u.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, h),
                    (u.queries = e.queries.embeddedTView(h))),
                  h
                );
              })(t, c, l, e, n, i, r, s, o)
            : c.data[h];
        Ke(u, !1);
        const d = l[11].createComment("");
        ds(c, l, d, u),
          Bi(d, l),
          jr(l, (l[h] = Mr(d, l, d, u))),
          ke(u) && _r(c, l, u),
          null != o && yr(l, u, a);
      }
      function io(t, e = ot.Default) {
        const n = $e();
        return null == n ? Gt(t, e) : zn(Ge(), n, Et(t), e);
      }
      function ro(t, e, n) {
        const i = $e();
        return Js(i, Je(), e) && Er(Ue(), pn(), i, t, e, i[11], n, !1), ro;
      }
      function so(t, e, n, i, r) {
        const s = r ? "class" : "style";
        Qr(t, n, e.inputs[s], s, i);
      }
      function oo(t, e, n, i) {
        const r = $e(),
          s = Ue(),
          o = 19 + t,
          a = r[11],
          l = (r[o] = cr(e, a, ze.lFrame.currentNamespace)),
          c = s.firstCreatePass
            ? (function (t, e, n, i, r, s, o) {
                const a = e.consts,
                  l = je(a, s),
                  c = ur(e, n[6], t, 3, r, l);
                return (
                  xr(e, n, c, je(a, o)),
                  null !== c.mergedAttrs && Gs(c, c.mergedAttrs),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, s, r, 0, e, n, i)
            : s.data[o];
        Ke(c, !0);
        const h = c.mergedAttrs;
        null !== h && wn(a, l, h);
        const u = c.classes;
        null !== u && ys(a, l, u);
        const d = c.styles;
        null !== d && _s(a, l, d),
          ds(s, r, l, c),
          0 === ze.lFrame.elementDepthCount && Bi(l, r),
          ze.lFrame.elementDepthCount++,
          ke(c) && (_r(s, r, c), gr(s, c, r)),
          null !== i && yr(r, c);
      }
      function ao() {
        let t = Ge();
        Ze() ? Qe() : ((t = t.parent), Ke(t, !1));
        const e = t;
        ze.lFrame.elementDepthCount--;
        const n = Ue();
        n.firstCreatePass && (fn(n, t), Ee(t) && n.queries.elementEnd(t)),
          null !== e.classes &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            so(n, e, $e(), e.classes, !0),
          null !== e.styles &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            so(n, e, $e(), e.styles, !1);
      }
      function lo(t, e, n, i) {
        oo(t, e, n, i), ao();
      }
      function co(t, e, n) {
        const i = $e(),
          r = Ue(),
          s = t + 19,
          o = r.firstCreatePass
            ? (function (t, e, n, i, r) {
                const s = e.consts,
                  o = je(s, i),
                  a = ur(e, n[6], t, 4, "ng-container", o);
                return (
                  null !== o && Gs(a, o),
                  xr(e, n, a, je(s, r)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(t, r, i, e, n)
            : r.data[s];
        Ke(o, !0);
        const a = (i[s] = i[11].createComment(""));
        ds(r, i, a, o),
          Bi(a, i),
          ke(o) && (_r(r, i, o), gr(r, o, i)),
          null != n && yr(i, o);
      }
      function ho() {
        let t = Ge();
        const e = Ue();
        Ze() ? Qe() : ((t = t.parent), Ke(t, !1)),
          e.firstCreatePass && (fn(e, t), Ee(t) && e.queries.elementEnd(t));
      }
      function uo() {
        return $e();
      }
      function po(t) {
        return !!t && "function" == typeof t.then;
      }
      function fo(t, e, n = !1, i) {
        const r = $e(),
          s = Ue(),
          o = Ge();
        return go(s, r, r[11], o, t, e, n, i), fo;
      }
      function mo(t, e, n = !1, i) {
        const r = Ge(),
          s = $e(),
          o = Kr(r, s);
        return go(Ue(), s, o, r, t, e, n, i), mo;
      }
      function go(t, e, n, i, r, s, o = !1, a) {
        const l = ke(i),
          c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
          h = Wr(e);
        let u = !0;
        if (3 === i.type) {
          const d = Pe(i, e),
            p = a ? a(d) : le,
            f = p.target || d,
            m = h.length,
            g = a ? (t) => a(Fe(t[i.index])).target : i.index;
          if (Ie(n)) {
            let o = null;
            if (
              (!a &&
                l &&
                (o = (function (t, e, n, i) {
                  const r = t.cleanup;
                  if (null != r)
                    for (let s = 0; s < r.length - 1; s += 2) {
                      const t = r[s];
                      if (t === n && r[s + 1] === i) {
                        const t = e[7],
                          n = r[s + 2];
                        return t.length > n ? t[n] : null;
                      }
                      "string" == typeof t && (s += 2);
                    }
                  return null;
                })(t, e, r, i.index)),
              null !== o)
            )
              ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = s),
                (o.__ngLastListenerFn__ = s),
                (u = !1);
            else {
              s = yo(i, e, s, !1);
              const t = n.listen(p.name || f, r, s);
              h.push(s, t), c && c.push(r, g, m, m + 1);
            }
          } else
            (s = yo(i, e, s, !0)),
              f.addEventListener(r, s, o),
              h.push(s),
              c && c.push(r, g, m, o);
        }
        const d = i.outputs;
        let p;
        if (u && null !== d && (p = d[r])) {
          const t = p.length;
          if (t)
            for (let n = 0; n < t; n += 2) {
              const t = e[p[n]][p[n + 1]].subscribe(s),
                o = h.length;
              h.push(s, t), c && c.push(r, i.index, o, -(o + 1));
            }
        }
      }
      function _o(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (i) {
          return Zr(t, i), !1;
        }
      }
      function yo(t, e, n, i) {
        return function r(s) {
          if (s === Function) return n;
          const o = 2 & t.flags ? Me(t.index, e) : e;
          0 == (32 & e[2]) && Hr(o);
          let a = _o(e, n, s),
            l = r.__ngNextListenerFn__;
          for (; l; ) (a = _o(e, l, s) && a), (l = l.__ngNextListenerFn__);
          return i && !1 === a && (s.preventDefault(), (s.returnValue = !1)), a;
        };
      }
      function bo(t = 1) {
        return (function (t) {
          return (ze.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, ze.lFrame.contextLView))[8];
        })(t);
      }
      function vo(t, e) {
        let n = null;
        const i = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let r = 0; r < e.length; r++) {
          const s = e[r];
          if ("*" !== s) {
            if (null === i ? Ki(t, s, !0) : Zi(i, s)) return r;
          } else n = r;
        }
        return n;
      }
      function wo(t) {
        const e = $e()[16][6];
        if (!e.projection) {
          const n = (e.projection = ne(t ? t.length : 1, null)),
            i = n.slice();
          let r = e.child;
          for (; null !== r; ) {
            const e = t ? vo(r, t) : 0;
            null !== e &&
              (i[e] ? (i[e].projectionNext = r) : (n[e] = r), (i[e] = r)),
              (r = r.next);
          }
        }
      }
      function Co(t, e = 0, n) {
        const i = $e(),
          r = Ue(),
          s = ur(r, i[6], t, 1, null, n || null);
        null === s.projection && (s.projection = e),
          Qe(),
          (function (t, e, n) {
            gs(e[11], 0, e, n, os(t, n, e), us(n.parent || e[6], e));
          })(r, i, s);
      }
      function Eo(t, e, n) {
        return xo(t, "", e, "", n), Eo;
      }
      function xo(t, e, n, i, r) {
        const s = $e(),
          o = eo(s, e, n, i);
        return o !== Xi && Er(Ue(), pn(), s, t, o, s[11], r, !1), xo;
      }
      const ko = [];
      function So(t, e, n, i, r) {
        const s = t[n + 1],
          o = null === e;
        let a = i ? ir(s) : sr(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          Ao(t[a], e) && ((l = !0), (t[a + 1] = i ? ar(n) : rr(n))),
            (a = i ? ir(n) : sr(n));
        }
        l && (t[n + 1] = i ? rr(s) : ar(s));
      }
      function Ao(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && se(t, e) >= 0)
        );
      }
      function To(t, e, n) {
        return Io(t, e, n, !1), To;
      }
      function Oo(t, e) {
        return Io(t, e, null, !0), Oo;
      }
      function Io(t, e, n, i) {
        const r = $e(),
          s = Ue(),
          o = (function (t) {
            const e = ze.lFrame,
              n = e.bindingIndex;
            return (e.bindingIndex = e.bindingIndex + 2), n;
          })();
        if (
          (s.firstUpdatePass &&
            (function (t, e, n, i) {
              const r = t.data;
              if (null === r[n + 1]) {
                const s = r[un() + 19],
                  o = (function (t, e) {
                    return e >= t.expandoStartIndex;
                  })(t, n);
                (function (t, e) {
                  return 0 != (t.flags & (e ? 16 : 32));
                })(s, i) &&
                  null === e &&
                  !o &&
                  (e = !1),
                  (e = (function (t, e, n, i) {
                    const r = (function (t) {
                      const e = ze.lFrame.currentDirectiveIndex;
                      return -1 === e ? null : t[e];
                    })(t);
                    let s = i ? e.residualClasses : e.residualStyles;
                    if (null === r)
                      0 === (i ? e.classBindings : e.styleBindings) &&
                        ((n = Fo((n = Do(null, t, e, n, i)), e.attrs, i)),
                        (s = null));
                    else {
                      const o = e.directiveStylingLast;
                      if (-1 === o || t[o] !== r)
                        if (((n = Do(r, t, e, n, i)), null === s)) {
                          let n = (function (t, e, n) {
                            const i = n ? e.classBindings : e.styleBindings;
                            if (0 !== sr(i)) return t[ir(i)];
                          })(t, e, i);
                          void 0 !== n &&
                            Array.isArray(n) &&
                            ((n = Do(null, t, e, n[1], i)),
                            (n = Fo(n, e.attrs, i)),
                            (function (t, e, n, i) {
                              t[ir(n ? e.classBindings : e.styleBindings)] = i;
                            })(t, e, i, n));
                        } else
                          s = (function (t, e, n) {
                            let i = void 0;
                            const r = e.directiveEnd;
                            for (let s = 1 + e.directiveStylingLast; s < r; s++)
                              i = Fo(i, t[s].hostAttrs, n);
                            return Fo(i, e.attrs, n);
                          })(t, e, i);
                    }
                    return (
                      void 0 !== s &&
                        (i ? (e.residualClasses = s) : (e.residualStyles = s)),
                      n
                    );
                  })(r, s, e, i)),
                  (function (t, e, n, i, r, s) {
                    let o = s ? e.classBindings : e.styleBindings,
                      a = ir(o),
                      l = sr(o);
                    t[i] = n;
                    let c,
                      h = !1;
                    if (Array.isArray(n)) {
                      const t = n;
                      (c = t[1]), (null === c || se(t, c) > 0) && (h = !0);
                    } else c = n;
                    if (r)
                      if (0 !== l) {
                        const e = ir(t[a + 1]);
                        (t[i + 1] = nr(e, a)),
                          0 !== e && (t[e + 1] = or(t[e + 1], i)),
                          (t[a + 1] = (131071 & t[a + 1]) | (i << 17));
                      } else
                        (t[i + 1] = nr(a, 0)),
                          0 !== a && (t[a + 1] = or(t[a + 1], i)),
                          (a = i);
                    else
                      (t[i + 1] = nr(l, 0)),
                        0 === a ? (a = i) : (t[l + 1] = or(t[l + 1], i)),
                        (l = i);
                    h && (t[i + 1] = rr(t[i + 1])),
                      So(t, c, i, !0),
                      So(t, c, i, !1),
                      (function (t, e, n, i, r) {
                        const s = r ? t.residualClasses : t.residualStyles;
                        null != s &&
                          "string" == typeof e &&
                          se(s, e) >= 0 &&
                          (n[i + 1] = ar(n[i + 1]));
                      })(e, c, t, i, s),
                      (o = nr(a, l)),
                      s ? (e.classBindings = o) : (e.styleBindings = o);
                  })(r, s, e, n, o, i);
              }
            })(s, t, o, i),
          e !== Xi && Js(r, o, e))
        ) {
          let a;
          null == n &&
            (a = (function () {
              const t = ze.lFrame;
              return null === t ? null : t.currentSanitizer;
            })()) &&
            (n = a),
            (function (t, e, n, i, r, s, o, a) {
              if (3 !== e.type) return;
              const l = t.data,
                c = l[a + 1];
              Po(1 == (1 & c) ? Ro(l, e, n, r, sr(c), o) : void 0) ||
                (Po(s) ||
                  ((function (t) {
                    return 2 == (2 & t);
                  })(c) &&
                    (s = Ro(l, null, n, r, a, o))),
                (function (t, e, n, i, r) {
                  const s = Ie(t);
                  if (e)
                    r
                      ? s
                        ? t.addClass(n, i)
                        : n.classList.add(i)
                      : s
                      ? t.removeClass(n, i)
                      : n.classList.remove(i);
                  else {
                    const e = -1 == i.indexOf("-") ? void 0 : 2;
                    null == r
                      ? s
                        ? t.removeStyle(n, i, e)
                        : n.style.removeProperty(i)
                      : s
                      ? t.setStyle(n, i, r, e)
                      : n.style.setProperty(i, r);
                  }
                })(i, o, Re(un(), n), r, s));
            })(
              s,
              s.data[un() + 19],
              r,
              r[11],
              t,
              (r[o + 1] = (function (t, e) {
                return (
                  null == t ||
                    ("function" == typeof e
                      ? (t = e(t))
                      : "string" == typeof e
                      ? (t += e)
                      : "object" == typeof t && (t = bt(ai(t)))),
                  t
                );
              })(e, n)),
              i,
              o
            );
        }
      }
      function Do(t, e, n, i, r) {
        let s = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((s = e[a]), (i = Fo(i, s.hostAttrs, r)), s !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), i;
      }
      function Fo(t, e, n) {
        const i = n ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o
              ? (r = o)
              : r === i &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                ie(t, o, !!n || e[++s]));
          }
        return void 0 === t ? null : t;
      }
      function Ro(t, e, n, i, r, s) {
        const o = null === e;
        let a = void 0;
        for (; r > 0; ) {
          const e = t[r],
            s = Array.isArray(e),
            l = s ? e[1] : e,
            c = null === l;
          let h = n[r + 1];
          h === Xi && (h = c ? ko : void 0);
          let u = c ? re(h, i) : l === i ? h : void 0;
          if ((s && !Po(u) && (u = re(e, i)), Po(u) && ((a = u), o))) return a;
          const d = t[r + 1];
          r = o ? ir(d) : sr(d);
        }
        if (null !== e) {
          let t = s ? e.residualClasses : e.residualStyles;
          null != t && (a = re(t, i));
        }
        return a;
      }
      function Po(t) {
        return void 0 !== t;
      }
      function No(t, e = "") {
        const n = $e(),
          i = Ue(),
          r = t + 19,
          s = i.firstCreatePass ? ur(i, n[6], t, 3, null, null) : i.data[r],
          o = (n[r] = (function (t, e) {
            return Ie(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        ds(i, n, o, s), Ke(s, !1);
      }
      function Mo(t) {
        return Lo("", t, ""), Mo;
      }
      function Lo(t, e, n) {
        const i = $e(),
          r = eo(i, t, e, n);
        return (
          r !== Xi &&
            (function (t, e, n) {
              const i = Re(e, t),
                r = t[11];
              Ie(r) ? r.setValue(i, n) : (i.textContent = n);
            })(i, un(), r),
          Lo
        );
      }
      function Vo(t, e, n) {
        const i = $e();
        return Js(i, Je(), e) && Er(Ue(), pn(), i, t, e, i[11], n, !0), Vo;
      }
      function Bo(t, e, n) {
        const i = $e();
        if (Js(i, Je(), e)) {
          const r = Ue(),
            s = pn();
          Er(r, s, i, t, e, Kr(s, i), n, !0);
        }
        return Bo;
      }
      function jo(t, e) {
        const n = Le(t)[1],
          i = n.data.length - 1;
        fn(n, { directiveStart: i, directiveEnd: i + 1 });
      }
      function Ho(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const i = [t];
        for (; e; ) {
          let r = void 0;
          if (Se(t)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            r = e.ɵdir;
          }
          if (r) {
            if (n) {
              i.push(r);
              const e = t;
              (e.inputs = zo(t.inputs)),
                (e.declaredInputs = zo(t.declaredInputs)),
                (e.outputs = zo(t.outputs));
              const n = r.hostBindings;
              n && Uo(t, n);
              const s = r.viewQuery,
                o = r.contentQueries;
              if (
                (s && qo(t, s),
                o && $o(t, o),
                lt(t.inputs, r.inputs),
                lt(t.declaredInputs, r.declaredInputs),
                lt(t.outputs, r.outputs),
                Se(r) && r.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(r.data.animation);
              }
              (e.afterContentChecked =
                e.afterContentChecked || r.afterContentChecked),
                (e.afterContentInit = t.afterContentInit || r.afterContentInit),
                (e.afterViewChecked = t.afterViewChecked || r.afterViewChecked),
                (e.afterViewInit = t.afterViewInit || r.afterViewInit),
                (e.doCheck = t.doCheck || r.doCheck),
                (e.onDestroy = t.onDestroy || r.onDestroy),
                (e.onInit = t.onInit || r.onInit);
            }
            const e = r.features;
            if (e)
              for (let i = 0; i < e.length; i++) {
                const r = e[i];
                r && r.ngInherit && r(t), r === Ho && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let i = t.length - 1; i >= 0; i--) {
            const r = t[i];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = xn(r.hostAttrs, (n = xn(n, r.hostAttrs))));
          }
        })(i);
      }
      function zo(t) {
        return t === le ? {} : t === ce ? [] : t;
      }
      function qo(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      function $o(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, i, r) => {
              e(t, i, r), n(t, i, r);
            }
          : e;
      }
      function Uo(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      class Wo {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Go(t) {
        t.type.prototype.ngOnChanges &&
          ((t.setInput = Ko),
          (t.onChanges = function () {
            const t = Zo(this),
              e = t && t.current;
            if (e) {
              const n = t.previous;
              if (n === le) t.previous = e;
              else for (let t in e) n[t] = e[t];
              (t.current = null), this.ngOnChanges(e);
            }
          }));
      }
      function Ko(t, e, n, i) {
        const r =
            Zo(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: le, current: null }),
          s = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (s[a] = new Wo(l && l.currentValue, e, o === le)), (t[i] = e);
      }
      function Zo(t) {
        return t.__ngSimpleChanges__ || null;
      }
      function Qo(t, e, n, i, r) {
        if (((t = Et(t)), Array.isArray(t)))
          for (let s = 0; s < t.length; s++) Qo(t[s], e, n, i, r);
        else {
          const s = Ue(),
            o = $e();
          let a = Hs(t) ? t : Et(t.provide),
            l = Vs(t);
          const c = Ge(),
            h = 65535 & c.providerIndexes,
            u = c.directiveStart,
            d = c.providerIndexes >> 16;
          if (Hs(t) || !t.multi) {
            const i = new vn(l, r, io),
              p = Jo(a, e, r ? h : h + d, u);
            -1 === p
              ? (Hn(Ln(c, o), s, a),
                Yo(s, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 65536),
                n.push(i),
                o.push(i))
              : ((n[p] = i), (o[p] = i));
          } else {
            const p = Jo(a, e, h + d, u),
              f = Jo(a, e, h, h + d),
              m = p >= 0 && n[p],
              g = f >= 0 && n[f];
            if ((r && !g) || (!r && !m)) {
              Hn(Ln(c, o), s, a);
              const h = (function (t, e, n, i, r) {
                const s = new vn(t, n, io);
                return (
                  (s.multi = []),
                  (s.index = e),
                  (s.componentProviders = 0),
                  Xo(s, r, i && !n),
                  s
                );
              })(r ? ea : ta, n.length, r, i, l);
              !r && g && (n[f].providerFactory = h),
                Yo(s, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 65536),
                n.push(h),
                o.push(h);
            } else Yo(s, t, p > -1 ? p : f, Xo(n[r ? f : p], l, !r && i));
            !r && i && g && n[f].componentProviders++;
          }
        }
      }
      function Yo(t, e, n, i) {
        const r = Hs(e);
        if (r || e.useClass) {
          const s = (e.useClass || e).prototype.ngOnDestroy;
          if (s) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!r && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [i, s]) : o[t + 1].push(i, s);
            } else o.push(n, s);
          }
        }
      }
      function Xo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Jo(t, e, n, i) {
        for (let r = n; r < i; r++) if (e[r] === t) return r;
        return -1;
      }
      function ta(t, e, n, i) {
        return na(this.multi, []);
      }
      function ea(t, e, n, i) {
        const r = this.multi;
        let s;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Wn(n, n[1], this.providerFactory.index, i);
          (s = e.slice(0, t)), na(r, s);
          for (let n = t; n < e.length; n++) s.push(e[n]);
        } else (s = []), na(r, s);
        return s;
      }
      function na(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function ia(t, e = []) {
        return (n) => {
          n.providersResolver = (n, i) =>
            (function (t, e, n) {
              const i = Ue();
              if (i.firstCreatePass) {
                const r = Se(t);
                Qo(n, i.data, i.blueprint, r, !0),
                  Qo(e, i.data, i.blueprint, r, !1);
              }
            })(n, i ? i(t) : t, e);
        };
      }
      Go.ngInherit = !0;
      class ra {}
      class sa {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${bt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let oa = (() => {
          class t {}
          return (t.NULL = new sa()), t;
        })(),
        aa = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => la(t)), t;
        })();
      const la = function (t) {
        return xs(t, Ge(), $e());
      };
      class ca {}
      const ha = (function () {
        var t = { Important: 1, DashCase: 2 };
        return (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t;
      })();
      let ua = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => da()), t;
      })();
      const da = function () {
        const t = $e(),
          e = Me(Ge().index, t);
        return (function (t) {
          const e = t[11];
          if (Ie(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(we(e) ? e : t);
      };
      let pa = (() => {
        class t {}
        return (
          (t.ɵprov = ct({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class fa {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const ma = new fa("9.1.2");
      class ga {
        constructor() {}
        supports(t) {
          return Ys(t);
        }
        create(t) {
          return new ya(t);
        }
      }
      const _a = (t, e) => e;
      class ya {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || _a);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            i = 0,
            r = null;
          for (; e || n; ) {
            const s = !n || (e && e.currentIndex < Ca(n, i, r)) ? e : n,
              o = Ca(s, i, r),
              a = s.currentIndex;
            if (s === n) i--, (n = n._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) i++;
            else {
              r || (r = []);
              const t = o - i,
                e = a - i;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const i = n < r.length ? r[n] : (r[n] = 0),
                    s = i + n;
                  e <= s && s < t && (r[n] = i + 1);
                }
                r[s.previousIndex] = e - t;
              }
            }
            o !== a && t(s, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Ys(t)))
            throw new Error(
              `Error trying to diff '${bt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            i,
            r = this._itHead,
            s = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (i = this._trackByFn(e, n)),
                null !== r && Qs(r.trackById, i)
                  ? (s && (r = this._verifyReinsertion(r, n, i, e)),
                    Qs(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, i, e)), (s = !0)),
                (r = r._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Zs()]();
                  let i;
                  for (; !(i = n.next()).done; ) e(i.value);
                }
              })(t, (t) => {
                (i = this._trackByFn(e, t)),
                  null !== r && Qs(r.trackById, i)
                    ? (s && (r = this._verifyReinsertion(r, t, i, e)),
                      Qs(r.item, t) || this._addIdentityChange(r, t))
                    : ((r = this._mismatch(r, t, i, e)), (s = !0)),
                  (r = r._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, i) {
          let r;
          return (
            null === t ? (r = this._itTail) : ((r = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, i))
              ? (Qs(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, r, i))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Qs(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, r, i))
              : (t = this._addAfter(new ba(e, n), r, i)),
            t
          );
        }
        _verifyReinsertion(t, e, n, i) {
          let r =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (t = this._reinsertAfter(r, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            r = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = r) : (i._nextRemoved = r),
            null === r ? (this._removalsTail = i) : (r._prevRemoved = i),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const i = null === e ? this._itHead : e._next;
          return (
            (t._next = i),
            (t._prev = e),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new wa()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new wa()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ba {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class va {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Qs(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class wa {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new va()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Ca(t, e, n) {
        const i = t.previousIndex;
        if (null === i) return i;
        let r = 0;
        return n && i < n.length && (r = n[i]), i + e + r;
      }
      class Ea {
        constructor() {}
        supports(t) {
          return t instanceof Map || Xs(t);
        }
        create() {
          return new xa();
        }
      }
      class xa {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Xs(t)))
              throw new Error(
                `Error trying to diff '${bt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const i = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, i);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const i = n._prev,
              r = n._next;
            return (
              i && (i._next = r),
              r && (r._prev = i),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new ka(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Qs(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class ka {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let Sa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new ga()]),
            })),
            t
          );
        })(),
        Aa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new it()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new Ea()]),
            })),
            t
          );
        })();
      const Ta = [new Ea()],
        Oa = new Sa([new ga()]),
        Ia = new Aa(Ta);
      let Da = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Fa(t, aa)), t;
      })();
      const Fa = function (t, e) {
        return ks(t, e, Ge(), $e());
      };
      let Ra = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Pa(t, aa)), t;
      })();
      const Pa = function (t, e) {
          return Ss(t, e, Ge(), $e());
        },
        Na = {};
      class Ma extends oa {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ye(t);
          return new Ba(e, this.ngModule);
        }
      }
      function La(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const Va = new Lt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Fn,
      });
      class Ba extends ra {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Yi).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return La(this.componentDef.inputs);
        }
        get outputs() {
          return La(this.componentDef.outputs);
        }
        create(t, e, n, i) {
          const r = (i = i || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, i, r) => {
                      const s = t.get(n, Na, r);
                      return s !== Na || i === Na ? s : e.get(n, i, r);
                    },
                  };
                })(t, i.injector)
              : t,
            s = r.get(ca, De),
            o = r.get(pa, null),
            a = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (Ie(t)) return t.selectRootElement(e, n === ae.ShadowDom);
                  let i = "string" == typeof e ? t.querySelector(e) : e;
                  return (i.textContent = ""), i;
                })(a, n, this.componentDef.encapsulation)
              : cr(
                  l,
                  s.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            h = this.componentDef.onPush ? 576 : 528,
            u =
              "string" == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
            d = {
              components: [],
              scheduler: Fn,
              clean: Ur,
              playerHandler: null,
              flags: 0,
            },
            p = vr(0, -1, null, 1, 0, null, null, null, null, null),
            f = hr(null, p, d, h, null, null, s, a, o, r);
          let m, g;
          sn(f, null);
          try {
            const t = (function (t, e, n, i, r, s) {
              const o = n[1];
              n[19] = t;
              const a = ur(o, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Gs(a, l),
                null !== t &&
                  (wn(r, t, l),
                  null !== a.classes && ys(r, t, a.classes),
                  null !== a.styles && _s(r, t, a.styles)));
              const c = i.createRenderer(t, e),
                h = hr(
                  n,
                  br(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[19],
                  a,
                  i,
                  c,
                  void 0
                );
              return (
                o.firstCreatePass &&
                  (Hn(Ln(a, n), o, e.type), Or(o, a), Dr(a, n.length, 1)),
                jr(n, h),
                (n[19] = h)
              );
            })(c, this.componentDef, f, s, a);
            if (c)
              if (n) wn(a, c, ["ng-version", ma.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let i = 1,
                    r = 2;
                  for (; i < t.length; ) {
                    let s = t[i];
                    if ("string" == typeof s)
                      2 === r
                        ? "" !== s && e.push(s, t[++i])
                        : 8 === r && n.push(s);
                    else {
                      if (!Wi(r)) break;
                      r = s;
                    }
                    i++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && wn(a, c, t), e && e.length > 0 && ys(a, c, e.join(" "));
              }
            (g = Ne(f[1], 0)),
              e && (g.projection = e.map((t) => Array.from(t))),
              (m = (function (t, e, n, i, r) {
                const s = n[1],
                  o = (function (t, e, n) {
                    const i = Ge();
                    t.firstCreatePass &&
                      (n.providersResolver && n.providersResolver(n),
                      Tr(t, i, 1),
                      Fr(t, e, n));
                    const r = Wn(e, t, e.length - 1, i);
                    Bi(r, e);
                    const s = Pe(i, e);
                    return s && Bi(s, e), r;
                  })(s, n, e);
                i.components.push(o),
                  (t[8] = o),
                  r && r.forEach((t) => t(o, e)),
                  e.contentQueries && e.contentQueries(1, o, n.length - 1);
                const a = Ge();
                if (
                  s.firstCreatePass &&
                  (null !== e.hostBindings || null !== e.hostAttrs)
                ) {
                  dn(a.index - 19);
                  const t = n[1];
                  kr(t, e), Sr(t, n, e.hostVars), Ar(e, o);
                }
                return o;
              })(t, this.componentDef, f, d, [jo])),
              dr(p, f, null);
          } finally {
            hn();
          }
          const _ = new ja(this.componentType, m, xs(aa, g, f), f, g);
          return (n && !u) || (_.hostView._tViewNode.child = g), _;
        }
      }
      class ja extends class {} {
        constructor(t, e, n, i, r) {
          super(),
            (this.location = n),
            (this._rootLView = i),
            (this._tNode = r),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new vs(i)),
            (this.hostView._tViewNode = (function (t, e, n, i) {
              let r = t.node;
              return (
                null == r && (t.node = r = wr(0, null, 2, -1, null, null)),
                (i[6] = r)
              );
            })(i[1], 0, 0, i)),
            (this.componentType = t);
        }
        get injector() {
          return new Zn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const Ha = void 0;
      var za = [
        "en",
        [["a", "p"], ["AM", "PM"], Ha],
        [["AM", "PM"], Ha, Ha],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Ha,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Ha,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Ha, "{1} 'at' {0}", Ha],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let qa = {};
      function $a(t) {
        return (
          t in qa ||
            (qa[t] =
              Ot.ng &&
              Ot.ng.common &&
              Ot.ng.common.locales &&
              Ot.ng.common.locales[t]),
          qa[t]
        );
      }
      const Ua = (function () {
        var t = {
          LocaleId: 0,
          DayPeriodsFormat: 1,
          DayPeriodsStandalone: 2,
          DaysFormat: 3,
          DaysStandalone: 4,
          MonthsFormat: 5,
          MonthsStandalone: 6,
          Eras: 7,
          FirstDayOfWeek: 8,
          WeekendRange: 9,
          DateFormat: 10,
          TimeFormat: 11,
          DateTimeFormat: 12,
          NumberSymbols: 13,
          NumberFormats: 14,
          CurrencyCode: 15,
          CurrencySymbol: 16,
          CurrencyName: 17,
          Currencies: 18,
          Directionality: 19,
          PluralCase: 20,
          ExtraData: 21,
        };
        return (
          (t[t.LocaleId] = "LocaleId"),
          (t[t.DayPeriodsFormat] = "DayPeriodsFormat"),
          (t[t.DayPeriodsStandalone] = "DayPeriodsStandalone"),
          (t[t.DaysFormat] = "DaysFormat"),
          (t[t.DaysStandalone] = "DaysStandalone"),
          (t[t.MonthsFormat] = "MonthsFormat"),
          (t[t.MonthsStandalone] = "MonthsStandalone"),
          (t[t.Eras] = "Eras"),
          (t[t.FirstDayOfWeek] = "FirstDayOfWeek"),
          (t[t.WeekendRange] = "WeekendRange"),
          (t[t.DateFormat] = "DateFormat"),
          (t[t.TimeFormat] = "TimeFormat"),
          (t[t.DateTimeFormat] = "DateTimeFormat"),
          (t[t.NumberSymbols] = "NumberSymbols"),
          (t[t.NumberFormats] = "NumberFormats"),
          (t[t.CurrencyCode] = "CurrencyCode"),
          (t[t.CurrencySymbol] = "CurrencySymbol"),
          (t[t.CurrencyName] = "CurrencyName"),
          (t[t.Currencies] = "Currencies"),
          (t[t.Directionality] = "Directionality"),
          (t[t.PluralCase] = "PluralCase"),
          (t[t.ExtraData] = "ExtraData"),
          t
        );
      })();
      let Wa = "en-US";
      function Ga(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, i) {
              throw new Error(
                `ASSERTION ERROR: ${t}` + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Wa = t.toLowerCase().replace(/_/g, "-"));
      }
      const Ka = new Map();
      class Za extends Xt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ma(this));
          const n = ve(t),
            i = t[Pt] || null;
          i && Ga(i),
            (this._bootstrapComponents = Rn(n.bootstrap)),
            (this._r3Injector = Ns(
              t,
              e,
              [
                { provide: Xt, useValue: this },
                { provide: oa, useValue: this.componentFactoryResolver },
              ],
              bt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = qs.THROW_IF_NOT_FOUND, n = ot.Default) {
          return t === qs || t === Xt || t === Vt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Qa extends class {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== ve(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${bt(
                          e
                        )} vs ${bt(e.name)}`
                      );
                  })(t, Ka.get(t), e),
                    Ka.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Za(this.moduleType, t);
        }
      }
      class Ya extends E {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let i,
            r = (t) => null,
            s = () => null;
          t && "object" == typeof t
            ? ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (s = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (r = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (s = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(i, r, s);
          return t instanceof u && t.add(o), o;
        }
      }
      function Xa() {
        return this._results[Zs()]();
      }
      class Ja {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Ya()),
            (this.length = 0);
          const t = Zs(),
            e = Ja.prototype;
          e[t] || (e[t] = Xa);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let i = 0; i < e.length; i++) {
              let r = e[i];
              Array.isArray(r)
                ? (n === e && (n = e.slice(0, i)), t(r, n))
                : n !== e && n.push(r);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class tl {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new tl(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class el {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              i = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              i.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new el(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== yl(t, e).matches && this.queries[e].setDirty();
        }
      }
      class nl {
        constructor(t, e, n, i = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = i);
        }
      }
      class il {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const i = null !== e ? e.length : 0,
              r = this.getByIndex(n).embeddedTView(t, i);
            r &&
              ((r.indexInDeclarationView = n),
              null !== e ? e.push(r) : (e = [r]));
          }
          return null !== e ? new il(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class rl {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new rl(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          if (Array.isArray(this.metadata.predicate)) {
            const n = this.metadata.predicate;
            for (let i = 0; i < n.length; i++)
              this.matchTNodeWithReadOption(t, e, sl(e, n[i]));
          } else {
            const n = this.metadata.predicate;
            n === Da
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Un(e, t, n, !1, !1));
          }
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === aa || i === Ra || (i === Da && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = Un(e, t, i, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function sl(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) if (n[i] === e) return n[i + 1];
        return null;
      }
      function ol(t, e, n, i) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? xs(aa, t, e)
                : 0 === t.type
                ? ks(Da, aa, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === aa
                ? xs(aa, e, t)
                : n === Da
                ? ks(Da, aa, e, t)
                : n === Ra
                ? Ss(Ra, aa, e, t)
                : void 0;
            })(t, e, i)
          : Wn(t, t[1], n, e);
      }
      function al(t, e, n, i) {
        const r = e[5].queries[i];
        if (null === r.matches) {
          const i = t.data,
            s = n.matches,
            o = [];
          for (let t = 0; t < s.length; t += 2) {
            const r = s[t];
            o.push(r < 0 ? null : ol(e, i[r], s[t + 1], n.metadata.read));
          }
          r.matches = o;
        }
        return r.matches;
      }
      function ll(t) {
        const e = $e(),
          n = Ue(),
          i = en();
        nn(i + 1);
        const r = yl(n, i);
        if (t.dirty && Ve(e) === r.metadata.isStatic) {
          if (null === r.matches) t.reset([]);
          else {
            const s = r.crossesNgTemplate
              ? (function t(e, n, i, r) {
                  const s = e.queries.getByIndex(i),
                    o = s.matches;
                  if (null !== o) {
                    const a = al(e, n, s, i);
                    for (let e = 0; e < o.length; e += 2) {
                      const i = o[e];
                      if (i > 0) r.push(a[e / 2]);
                      else {
                        const s = o[e + 1],
                          a = n[-i];
                        for (let e = 9; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, s, r);
                        }
                        if (null !== a[5]) {
                          const e = a[5];
                          for (let n = 0; n < e.length; n++) {
                            const i = e[n];
                            t(i[1], i, s, r);
                          }
                        }
                      }
                    }
                  }
                  return r;
                })(n, e, i, [])
              : al(n, e, r, i);
            t.reset(s), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function cl(t, e, n) {
        ul(Ue(), $e(), t, e, n, !0);
      }
      function hl(t, e, n) {
        ul(Ue(), $e(), t, e, n, !1);
      }
      function ul(t, e, n, i, r, s) {
        t.firstCreatePass &&
          (_l(t, new nl(n, i, s, r), -1), s && (t.staticViewQueries = !0)),
          gl(t, e);
      }
      function dl(t, e, n, i) {
        fl(Ue(), $e(), e, n, i, !1, Ge(), t);
      }
      function pl(t, e, n, i) {
        fl(Ue(), $e(), e, n, i, !0, Ge(), t);
      }
      function fl(t, e, n, i, r, s, o, a) {
        t.firstCreatePass &&
          (_l(t, new nl(n, i, s, r), o.index),
          (function (t, e) {
            const n = t.contentQueries || (t.contentQueries = []);
            e !== (t.contentQueries.length ? n[n.length - 1] : -1) &&
              n.push(t.queries.length - 1, e);
          })(t, a),
          s && (t.staticContentQueries = !0)),
          gl(t, e);
      }
      function ml() {
        return (t = $e()), (e = en()), t[5].queries[e].queryList;
        var t, e;
      }
      function gl(t, e) {
        const n = new Ja();
        !(function (t, e, n, i) {
          const r = Wr(e);
          r.push(n), t.firstCreatePass && Gr(t).push(i, r.length - 1);
        })(t, e, n, n.destroy),
          null === e[5] && (e[5] = new el()),
          e[5].queries.push(new tl(n));
      }
      function _l(t, e, n) {
        null === t.queries && (t.queries = new il()),
          t.queries.track(new rl(e, n));
      }
      function yl(t, e) {
        return t.queries.getByIndex(e);
      }
      const bl = new Lt("Application Initializer");
      let vl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                po(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(bl, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const wl = new Lt("AppId"),
        Cl = {
          provide: wl,
          useFactory: function () {
            return `${El()}${El()}${El()}`;
          },
          deps: [],
        };
      function El() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const xl = new Lt("Platform Initializer"),
        kl = new Lt("Platform ID"),
        Sl = new Lt("appBootstrapListener");
      let Al = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Tl = new Lt("LocaleId"),
        Ol = new Lt("DefaultCurrencyCode");
      class Il {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const Dl = function (t) {
          return new Qa(t);
        },
        Fl = Dl,
        Rl = function (t) {
          return Promise.resolve(Dl(t));
        },
        Pl = function (t) {
          const e = Dl(t),
            n = Rn(ve(t).declarations).reduce((t, e) => {
              const n = ye(e);
              return n && t.push(new Ba(n)), t;
            }, []);
          return new Il(e, n);
        },
        Nl = Pl,
        Ml = function (t) {
          return Promise.resolve(Pl(t));
        };
      let Ll = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = Fl),
              (this.compileModuleAsync = Rl),
              (this.compileModuleAndAllComponentsSync = Nl),
              (this.compileModuleAndAllComponentsAsync = Ml);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Vl = new Lt("compilerOptions"),
        Bl = (() => Promise.resolve(0))();
      function jl(t) {
        "undefined" == typeof Zone
          ? Bl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Hl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ya(!1)),
            (this.onMicrotaskEmpty = new Ya(!1)),
            (this.onStable = new Ya(!1)),
            (this.onError = new Ya(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = Ot.requestAnimationFrame,
                e = Ot.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        Ot,
                        () => {
                          (t.lastRequestAnimationFrameId = -1), Ul(t), $l(t);
                        }
                      )),
                      Ul(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, i, r, s, o, a) => {
                  try {
                    return Wl(t), n.invokeTask(r, s, o, a);
                  } finally {
                    e && "eventTask" === s.type && e(), Gl(t);
                  }
                },
                onInvoke: (e, n, i, r, s, o, a) => {
                  try {
                    return Wl(t), e.invoke(i, r, s, o, a);
                  } finally {
                    Gl(t);
                  }
                },
                onHasTask: (e, n, i, r) => {
                  e.hasTask(i, r),
                    n === i &&
                      ("microTask" == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask),
                          Ul(t),
                          $l(t))
                        : "macroTask" == r.change &&
                          (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (e, n, i, r) => (
                  e.handleError(i, r),
                  t.runOutsideAngular(() => t.onError.emit(r)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Hl.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Hl.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, i) {
          const r = this._inner,
            s = r.scheduleEventTask("NgZoneEvent: " + i, t, ql, zl, zl);
          try {
            return r.runTask(s, e, n);
          } finally {
            r.cancelTask(s);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function zl() {}
      const ql = {};
      function $l(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Ul(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Wl(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Gl(t) {
        t._nesting--, $l(t);
      }
      class Kl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ya()),
            (this.onMicrotaskEmpty = new Ya()),
            (this.onStable = new Ya()),
            (this.onError = new Ya());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, i) {
          return t.apply(e, n);
        }
      }
      let Zl = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Hl.assertNotInAngularZone(),
                        jl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                jl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let i = -1;
              e &&
                e > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Hl));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ql = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Jl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Jl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Yl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Xl,
        Jl = new Yl(),
        tc = function (t, e, n) {
          const i = t.get(Vl, []).concat(e),
            r = new Qa(n);
          if (0 === $s.size) return Promise.resolve(r);
          const s = (function (t) {
            const e = [];
            return t.forEach((t) => t && e.push(...t)), e;
          })(i.map((t) => t.providers));
          if (0 === s.length) return Promise.resolve(r);
          const o = (function () {
              const t = Ot.ng;
              if (!t || !t.ɵcompilerFacade)
                throw new Error(
                  "Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping."
                );
              return t.ɵcompilerFacade;
            })(),
            a = qs.create({ providers: s }).get(o.ResourceLoader);
          return (function (t) {
            const e = [],
              n = new Map();
            function i(t) {
              let e = n.get(t);
              if (!e) {
                const i = ((t) => Promise.resolve(a.get(t)))(t);
                n.set(t, (e = i.then(Ws)));
              }
              return e;
            }
            return (
              $s.forEach((t, n) => {
                const r = [];
                t.templateUrl &&
                  r.push(
                    i(t.templateUrl).then((e) => {
                      t.template = e;
                    })
                  );
                const s = t.styleUrls,
                  o = t.styles || (t.styles = []),
                  a = t.styles.length;
                s &&
                  s.forEach((e, n) => {
                    o.push(""),
                      r.push(
                        i(e).then((i) => {
                          (o[a + n] = i),
                            s.splice(s.indexOf(e), 1),
                            0 == s.length && (t.styleUrls = void 0);
                        })
                      );
                  });
                const l = Promise.all(r).then(() =>
                  (function (t) {
                    Us.delete(t);
                  })(n)
                );
                e.push(l);
              }),
              ($s = new Map()),
              Promise.all(e).then(() => {})
            );
          })().then(() => r);
        };
      const ec = new Lt("AllowMultipleToken");
      function nc(t, e, n = []) {
        const i = `Platform: ${e}`,
          r = new Lt(i);
        return (e = []) => {
          let s = ic();
          if (!s || s.injector.get(ec, !1))
            if (t) t(n.concat(e).concat({ provide: r, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: Os, useValue: "platform" }
                );
              !(function (t) {
                if (Xl && !Xl.destroyed && !Xl.injector.get(ec, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Xl = t.get(rc);
                const e = t.get(xl, null);
                e && e.forEach((t) => t());
              })(qs.create({ providers: t, name: i }));
            }
          return (function (t) {
            const e = ic();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(r);
        };
      }
      function ic() {
        return Xl && !Xl.destroyed ? Xl : null;
      }
      let rc = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Kl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Hl({
                          enableLongStackTrace: di(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              i = [{ provide: Hl, useValue: n }];
            return n.run(() => {
              const e = qs.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                r = t.create(e),
                s = r.injector.get(ti, null);
              if (!s)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                r.onDestroy(() => ac(this._modules, r)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      s.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const i = n();
                    return po(i)
                      ? i.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => t.handleError(i)), i);
                  }
                })(s, n, () => {
                  const t = r.injector.get(vl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Ga(r.injector.get(Tl, "en-US") || "en-US"),
                        this._moduleDoBootstrap(r),
                        r
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = sc({}, e);
            return tc(this.injector, n, t).then((t) =>
              this.bootstrapModuleFactory(t, n)
            );
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(oc);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${bt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    "Please define one of these."
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(qs));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function sc(t, e) {
        return Array.isArray(e)
          ? e.reduce(sc, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let oc = (() => {
        class t {
          constructor(t, e, n, i, r, s) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = r),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = di()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Hl.assertNotInAngularZone(),
                      jl(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Hl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = U(o, a.pipe(J()));
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof ra
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const i = n.isBoundToModule ? void 0 : this._injector.get(Xt),
              r = n.create(qs.NULL, [], e || n.selector, i);
            r.onDestroy(() => {
              this._unloadComponent(r);
            });
            const s = r.injector.get(Zl, null);
            return (
              s &&
                r.injector
                  .get(Ql)
                  .registerApplication(r.location.nativeElement, s),
              this._loadComponent(r),
              di() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              r
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            ac(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Sl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), ac(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Hl), Gt(Al), Gt(qs), Gt(ti), Gt(oa), Gt(vl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function ac(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const lc = nc(null, "core", [
          { provide: kl, useValue: "unknown" },
          { provide: rc, deps: [qs] },
          { provide: Ql, deps: [] },
          { provide: Al, deps: [] },
        ]),
        cc = [
          { provide: oc, useClass: oc, deps: [Hl, Al, qs, ti, oa, vl] },
          {
            provide: Va,
            deps: [Hl],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: vl, useClass: vl, deps: [[new it(), bl]] },
          { provide: Ll, useClass: Ll, deps: [] },
          Cl,
          {
            provide: Sa,
            useFactory: function () {
              return Oa;
            },
            deps: [],
          },
          {
            provide: Aa,
            useFactory: function () {
              return Ia;
            },
            deps: [],
          },
          {
            provide: Tl,
            useFactory: function (t) {
              return (
                Ga(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new nt(Tl), new it(), new st()]],
          },
          { provide: Ol, useValue: "USD" },
        ];
      let hc = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)(Gt(oc));
              },
              providers: cc,
            })),
            t
          );
        })(),
        uc = null;
      function dc() {
        return uc;
      }
      const pc = new Lt("DocumentToken");
      let fc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: mc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function mc() {
        return Gt(gc);
      }
      let gc = (() => {
        class t extends fc {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = dc().getLocation()),
              (this._history = dc().getHistory());
          }
          getBaseHrefFromDOM() {
            return dc().getBaseHref(this._doc);
          }
          onPopState(t) {
            dc()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            dc()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            _c() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            _c()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(pc));
          }),
          (t.ɵprov = ct({ factory: yc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function _c() {
        return !!window.history.pushState;
      }
      function yc() {
        return new gc(Gt(pc));
      }
      function bc(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function vc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function wc(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let Cc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: Ec, token: t, providedIn: "root" })),
          t
        );
      })();
      function Ec(t) {
        const e = Gt(pc).location;
        return new kc(Gt(fc), (e && e.origin) || "");
      }
      const xc = new Lt("appBaseHref");
      let kc = (() => {
          class t extends Cc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return bc(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  wc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, i) {
              const r = this.prepareExternalUrl(n + wc(i));
              this._platformLocation.pushState(t, e, r);
            }
            replaceState(t, e, n, i) {
              const r = this.prepareExternalUrl(n + wc(i));
              this._platformLocation.replaceState(t, e, r);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(fc), Gt(xc, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Sc = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Ya()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = vc(Tc(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + wc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, Tc(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + wc(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + wc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this.subscribe((t) => {
                  this._notifyUrlChangeListeners(t.url, t.state);
                });
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Cc), Gt(fc));
            }),
            (t.normalizeQueryParams = wc),
            (t.joinWithSlash = bc),
            (t.stripTrailingSlash = vc),
            (t.ɵprov = ct({ factory: Ac, token: t, providedIn: "root" })),
            t
          );
        })();
      function Ac() {
        return new Sc(Gt(Cc), Gt(fc));
      }
      function Tc(t) {
        return t.replace(/\/index.html$/, "");
      }
      const Oc = (function () {
        var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
        return (
          (t[t.Zero] = "Zero"),
          (t[t.One] = "One"),
          (t[t.Two] = "Two"),
          (t[t.Few] = "Few"),
          (t[t.Many] = "Many"),
          (t[t.Other] = "Other"),
          t
        );
      })();
      class Ic {}
      let Dc = (() => {
          class t extends Ic {
            constructor(t) {
              super(), (this.locale = t);
            }
            getPluralCategory(t, e) {
              switch (
                (function (t) {
                  return (function (t) {
                    const e = (function (t) {
                      return t.toLowerCase().replace(/_/g, "-");
                    })(t);
                    let n = $a(e);
                    if (n) return n;
                    const i = e.split("-")[0];
                    if (((n = $a(i)), n)) return n;
                    if ("en" === i) return za;
                    throw new Error(
                      `Missing locale data for the locale "${t}".`
                    );
                  })(t)[Ua.PluralCase];
                })(e || this.locale)(t)
              ) {
                case Oc.Zero:
                  return "zero";
                case Oc.One:
                  return "one";
                case Oc.Two:
                  return "two";
                case Oc.Few:
                  return "few";
                case Oc.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Tl));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Fc = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._iterableDiffers = t),
                (this._keyValueDiffers = e),
                (this._ngEl = n),
                (this._renderer = i),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(t) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof t ? t.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(t) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                this._rawClass &&
                  (Ys(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t);
              } else if (this._keyValueDiffer) {
                const t = this._keyValueDiffer.diff(this._rawClass);
                t && this._applyKeyValueChanges(t);
              }
            }
            _applyKeyValueChanges(t) {
              t.forEachAddedItem((t) =>
                this._toggleClass(t.key, t.currentValue)
              ),
                t.forEachChangedItem((t) =>
                  this._toggleClass(t.key, t.currentValue)
                ),
                t.forEachRemovedItem((t) => {
                  t.previousValue && this._toggleClass(t.key, !1);
                });
            }
            _applyIterableChanges(t) {
              t.forEachAddedItem((t) => {
                if ("string" != typeof t.item)
                  throw new Error(
                    `NgClass can only toggle CSS classes expressed as strings, got ${bt(
                      t.item
                    )}`
                  );
                this._toggleClass(t.item, !0);
              }),
                t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
            }
            _applyClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((t) => this._toggleClass(t, !0))
                  : Object.keys(t).forEach((e) =>
                      this._toggleClass(e, !!t[e])
                    ));
            }
            _removeClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((t) => this._toggleClass(t, !1))
                  : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
            }
            _toggleClass(t, e) {
              (t = t.trim()) &&
                t.split(/\s+/g).forEach((t) => {
                  e
                    ? this._renderer.addClass(this._ngEl.nativeElement, t)
                    : this._renderer.removeClass(this._ngEl.nativeElement, t);
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(Sa), io(Aa), io(aa), io(ua));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            t
          );
        })();
      class Rc {
        constructor(t, e, n, i) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Pc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            di() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. ` +
                  "See https://angular.io/api/common/NgForOf#change-propagation for more information."
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, i) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Rc(null, this._ngForOf, -1, -1),
                    null === i ? void 0 : i
                  ),
                  r = new Nc(t, n);
                e.push(r);
              } else if (null == i)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const r = this._viewContainer.get(n);
                this._viewContainer.move(r, i);
                const s = new Nc(t, r);
                e.push(s);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, i = this._viewContainer.length; n < i; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = i),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Ra), io(Da), io(Sa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class Nc {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Mc = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Lc()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Vc("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Vc("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Ra), io(Da));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Lc {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Vc(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${bt(e)}'.`
          );
      }
      class Bc {
        constructor(t, e) {
          (this._viewContainerRef = t),
            (this._templateRef = e),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let jc = (() => {
          class t {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(t) {
              (this._ngSwitch = t),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(t) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(t);
            }
            _matchCase(t) {
              const e = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || e),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                e
              );
            }
            _updateDefaultCases(t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (let e = 0; e < this._defaultViews.length; e++)
                  this._defaultViews[e].enforceState(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
            })),
            t
          );
        })(),
        Hc = (() => {
          class t {
            constructor(t, e, n) {
              (this.ngSwitch = n), n._addCase(), (this._view = new Bc(t, e));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(Ra), io(Da), io(jc, 1));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
            })),
            t
          );
        })(),
        zc = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: Ic, useClass: Dc }],
            })),
            t
          );
        })();
      class qc extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new qc()), uc || (uc = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Uc || ((Uc = document.querySelector("base")), Uc)
              ? Uc.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              $c || ($c = document.createElement("a")),
              $c.setAttribute("href", n),
              "/" === $c.pathname.charAt(0) ? $c.pathname : "/" + $c.pathname);
          var n;
        }
        resetBaseElement() {
          Uc = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [i, r] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (i.trim() === e) return decodeURIComponent(r);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let $c,
        Uc = null;
      const Wc = new Lt("TRANSITION_ID"),
        Gc = [
          {
            provide: bl,
            useFactory: function (t, e, n) {
              return () => {
                n.get(vl).donePromise.then(() => {
                  const n = dc();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [Wc, pc, qs],
            multi: !0,
          },
        ];
      class Kc {
        static init() {
          var t;
          (t = new Kc()), (Jl = t);
        }
        addToWindow(t) {
          (Ot.getAngularTestability = (e, n = !0) => {
            const i = t.findTestabilityInTree(e, n);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (Ot.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Ot.getAllAngularRootElements = () => t.getAllRootElements()),
            Ot.frameworkStabilizers || (Ot.frameworkStabilizers = []),
            Ot.frameworkStabilizers.push((t) => {
              const e = Ot.getAllAngularTestabilities();
              let n = e.length,
                i = !1;
              const r = function (e) {
                (i = i || e), n--, 0 == n && t(i);
              };
              e.forEach(function (t) {
                t.whenStable(r);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const i = t.getTestability(e);
          return null != i
            ? i
            : n
            ? dc().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Zc = new Lt("EventManagerPlugins");
      let Qc = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let i = 0; i < n.length; i++) {
              const e = n[i];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Zc), Gt(Hl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Yc {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const i = dc().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${e}`);
          return this.addEventListener(i, e, n);
        }
      }
      let Xc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Jc = (() => {
          class t extends Xc {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => dc().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(pc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const th = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        eh = /%COMP%/g;
      function nh(t, e, n) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? nh(t, r, n) : ((r = r.replace(eh, t)), n.push(r));
        }
        return n;
      }
      function ih(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let rh = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new sh(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case ae.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new oh(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case ae.Native:
              case ae.ShadowDom:
                return new ah(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = nh(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Qc), Gt(Jc), Gt(wl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class sh {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(th[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, i) {
          if (i) {
            e = i + ":" + e;
            const r = th[i];
            r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const i = th[n];
            i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, i) {
          i & ha.DashCase
            ? t.style.setProperty(e, n, i & ha.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & ha.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, ih(n))
            : this.eventManager.addEventListener(t, e, ih(n));
        }
      }
      class oh extends sh {
        constructor(t, e, n, i) {
          super(t), (this.component = n);
          const r = nh(i + "-" + n.id, n.styles, []);
          e.addStyles(r),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              eh,
              i + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(eh, t);
            })(i + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class ah extends sh {
        constructor(t, e, n, i) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = i),
            (this.shadowRoot =
              i.encapsulation === ae.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = nh(i.id, i.styles, []);
          for (let s = 0; s < r.length; s++) {
            const t = document.createElement("style");
            (t.textContent = r[s]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let lh = (() => {
        class t extends Yc {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(pc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ch = ["alt", "control", "meta", "shift"],
        hh = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        uh = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        dh = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let ph = (() => {
          class t extends Yc {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, i) {
              const r = t.parseEventName(n),
                s = t.eventCallback(r.fullKey, i, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() =>
                  dc().onAndCancel(e, r.domEventName, s)
                );
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split("."),
                i = n.shift();
              if (0 === n.length || ("keydown" !== i && "keyup" !== i))
                return null;
              const r = t._normalizeKey(n.pop());
              let s = "";
              if (
                (ch.forEach((t) => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (s += t + "."));
                }),
                (s += r),
                0 != n.length || 0 === r.length)
              )
                return null;
              const o = {};
              return (o.domEventName = i), (o.fullKey = s), o;
            }
            static getEventFullKey(t) {
              let e = "",
                n = (function (t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e))
                      return "Unidentified";
                    e.startsWith("U+") &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && uh.hasOwnProperty(e) && (e = uh[e]));
                  }
                  return hh[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                " " === n ? (n = "space") : "." === n && (n = "dot"),
                ch.forEach((i) => {
                  i != n && (0, dh[i])(t) && (e += i + ".");
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, i) {
              return (r) => {
                t.getEventFullKey(r) === e && i.runGuarded(() => n(r));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t;
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(pc));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        fh = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return Gt(mh);
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        mh = (() => {
          class t extends fh {
            constructor(t) {
              super(), (this._doc = t);
            }
            sanitize(t, e) {
              if (null == e) return null;
              switch (t) {
                case Ni.NONE:
                  return e;
                case Ni.HTML:
                  return li(e, "HTML") ? ai(e) : Ri(this._doc, String(e));
                case Ni.STYLE:
                  return li(e, "Style")
                    ? ai(e)
                    : (function (t) {
                        if (!(t = String(t).trim())) return "";
                        const e = t.match(Li);
                        return (e && gi(e[1]) === e[1]) ||
                          (t.match(Mi) &&
                            (function (t) {
                              let e = !0,
                                n = !0;
                              for (let i = 0; i < t.length; i++) {
                                const r = t.charAt(i);
                                "'" === r && n
                                  ? (e = !e)
                                  : '"' === r && e && (n = !n);
                              }
                              return e && n;
                            })(t))
                          ? t
                          : (di() &&
                              console.warn(
                                `WARNING: sanitizing unsafe style value ${t} (see http://g.co/ng/security#xss).`
                              ),
                            "unsafe");
                      })(e);
                case Ni.SCRIPT:
                  if (li(e, "Script")) return ai(e);
                  throw new Error("unsafe value used in a script context");
                case Ni.URL:
                  return ci(e), li(e, "URL") ? ai(e) : gi(String(e));
                case Ni.RESOURCE_URL:
                  if (li(e, "ResourceURL")) return ai(e);
                  throw new Error(
                    "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${t} (see http://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(t) {
              return new ni(t);
            }
            bypassSecurityTrustStyle(t) {
              return new ii(t);
            }
            bypassSecurityTrustScript(t) {
              return new ri(t);
            }
            bypassSecurityTrustUrl(t) {
              return new si(t);
            }
            bypassSecurityTrustResourceUrl(t) {
              return new oi(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(pc));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return (t = Gt(Vt)), new mh(t.get(pc));
                var t;
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const gh = nc(lc, "browser", [
          { provide: kl, useValue: "browser" },
          {
            provide: xl,
            useValue: function () {
              qc.makeCurrent(), Kc.init();
            },
            multi: !0,
          },
          {
            provide: pc,
            useFactory: function () {
              return (
                (function (t) {
                  Te = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        _h = [
          [],
          { provide: Os, useValue: "root" },
          {
            provide: ti,
            useFactory: function () {
              return new ti();
            },
            deps: [],
          },
          { provide: Zc, useClass: lh, multi: !0, deps: [pc, Hl, kl] },
          { provide: Zc, useClass: ph, multi: !0, deps: [pc] },
          [],
          { provide: rh, useClass: rh, deps: [Qc, Jc, wl] },
          { provide: ca, useExisting: rh },
          { provide: Xc, useExisting: Jc },
          { provide: Jc, useClass: Jc, deps: [pc] },
          { provide: Zl, useClass: Zl, deps: [Hl] },
          { provide: Qc, useClass: Qc, deps: [Zc, Hl] },
          [],
        ];
      let yh = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: wl, useValue: e.appId },
                { provide: Wc, useExisting: wl },
                Gc,
              ],
            };
          }
        }
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ht({
            factory: function (e) {
              return new (e || t)(Gt(t, 12));
            },
            providers: _h,
            imports: [zc, hc],
          })),
          t
        );
      })();
      "undefined" != typeof window && window;
      let bh = (() => {
        class t {
          constructor(t) {
            this.viewContainerRef = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Ra));
          }),
          (t.ɵdir = _e({ type: t, selectors: [["", "appChatHost", ""]] })),
          t
        );
      })();
      function vh(...t) {
        if (1 === t.length) {
          const e = t[0];
          if (l(e)) return wh(e, null);
          if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
            const t = Object.keys(e);
            return wh(
              t.map((t) => e[t]),
              t
            );
          }
        }
        if ("function" == typeof t[t.length - 1]) {
          const e = t.pop();
          return wh((t = 1 === t.length && l(t[0]) ? t[0] : t), null).pipe(
            N((t) => e(...t))
          );
        }
        return wh(t, null);
      }
      function wh(t, e) {
        return new y((n) => {
          const i = t.length;
          if (0 === i) return void n.complete();
          const r = new Array(i);
          let s = 0,
            o = 0;
          for (let a = 0; a < i; a++) {
            const l = B(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), o++), (r[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  s++,
                    (s !== i && c) ||
                      (o === i &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = r[n]), t), {}) : r
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      const Ch = new Lt("NgValueAccessor"),
        Eh = { provide: Ch, useExisting: Ct(() => xh), multi: !0 };
      let xh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(ua), io(aa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                fo("change", function (t) {
                  return e.onChange(t.target.checked);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ia([Eh])],
          })),
          t
        );
      })();
      const kh = { provide: Ch, useExisting: Ct(() => Ah), multi: !0 },
        Sh = new Lt("CompositionEventMode");
      let Ah = (() => {
          class t {
            constructor(t, e, n) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._compositionMode = n),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._composing = !1),
                null == this._compositionMode &&
                  (this._compositionMode = !(function () {
                    const t = dc() ? dc().getUserAgent() : "";
                    return /android (\d+)/.test(t.toLowerCase());
                  })());
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _handleInput(t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }
            _compositionStart() {
              this._composing = !0;
            }
            _compositionEnd(t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(ua), io(aa), io(Sh, 8));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["input", "formControlName", "", 3, "type", "checkbox"],
                ["textarea", "formControlName", ""],
                ["input", "formControl", "", 3, "type", "checkbox"],
                ["textarea", "formControl", ""],
                ["input", "ngModel", "", 3, "type", "checkbox"],
                ["textarea", "ngModel", ""],
                ["", "ngDefaultControl", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  fo("input", function (t) {
                    return e._handleInput(t.target.value);
                  })("blur", function () {
                    return e.onTouched();
                  })("compositionstart", function () {
                    return e._compositionStart();
                  })("compositionend", function (t) {
                    return e._compositionEnd(t.target.value);
                  });
              },
              features: [ia([kh])],
            })),
            t
          );
        })(),
        Th = (() => {
          class t {
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t })),
            t
          );
        })(),
        Oh = (() => {
          class t extends Th {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return Ih(e || t);
            }),
            (t.ɵdir = _e({ type: t, features: [Ho] })),
            t
          );
        })();
      const Ih = Qn(Oh);
      function Dh() {
        throw new Error("unimplemented");
      }
      class Fh extends Th {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return Dh();
        }
        get asyncValidator() {
          return Dh();
        }
      }
      let Rh = (() => {
        class t extends class {
          constructor(t) {
            this._cd = t;
          }
          get ngClassUntouched() {
            return !!this._cd.control && this._cd.control.untouched;
          }
          get ngClassTouched() {
            return !!this._cd.control && this._cd.control.touched;
          }
          get ngClassPristine() {
            return !!this._cd.control && this._cd.control.pristine;
          }
          get ngClassDirty() {
            return !!this._cd.control && this._cd.control.dirty;
          }
          get ngClassValid() {
            return !!this._cd.control && this._cd.control.valid;
          }
          get ngClassInvalid() {
            return !!this._cd.control && this._cd.control.invalid;
          }
          get ngClassPending() {
            return !!this._cd.control && this._cd.control.pending;
          }
        } {
          constructor(t) {
            super(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Fh, 2));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (t, e) {
              2 & t &&
                Oo("ng-untouched", e.ngClassUntouched)(
                  "ng-touched",
                  e.ngClassTouched
                )("ng-pristine", e.ngClassPristine)("ng-dirty", e.ngClassDirty)(
                  "ng-valid",
                  e.ngClassValid
                )("ng-invalid", e.ngClassInvalid)(
                  "ng-pending",
                  e.ngClassPending
                );
            },
            features: [Ho],
          })),
          t
        );
      })();
      function Ph(t) {
        return null == t || 0 === t.length;
      }
      const Nh = new Lt("NgValidators"),
        Mh = new Lt("NgAsyncValidators"),
        Lh = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Vh {
        static min(t) {
          return (e) => {
            if (Ph(e.value) || Ph(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (Ph(e.value) || Ph(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Ph(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Ph(t.value) || Lh.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) => {
            if (Ph(e.value)) return null;
            const n = e.value ? e.value.length : 0;
            return n < t
              ? { minlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static maxLength(t) {
          return (e) => {
            const n = e.value ? e.value.length : 0;
            return n > t
              ? { maxlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static pattern(t) {
          if (!t) return Vh.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (Ph(t.value)) return null;
              const i = t.value;
              return e.test(i)
                ? null
                : { pattern: { requiredPattern: n, actualValue: i } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(Bh);
          return 0 == e.length
            ? null
            : function (t) {
                return Hh(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(Bh);
          return 0 == e.length
            ? null
            : function (t) {
                return vh(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e).map(jh)
                ).pipe(N(Hh));
              };
        }
      }
      function Bh(t) {
        return null != t;
      }
      function jh(t) {
        const e = po(t) ? B(t) : t;
        if (!(n = e) || "function" != typeof n.subscribe)
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        var n;
        return e;
      }
      function Hh(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function zh(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function qh(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      const $h = { provide: Ch, useExisting: Ct(() => Uh), multi: !0 };
      let Uh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(ua), io(aa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                fo("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ia([$h])],
          })),
          t
        );
      })();
      const Wh = { provide: Ch, useExisting: Ct(() => Kh), multi: !0 };
      let Gh = (() => {
          class t {
            constructor() {
              this._accessors = [];
            }
            add(t, e) {
              this._accessors.push([t, e]);
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }
            select(t) {
              this._accessors.forEach((e) => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value);
              });
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Kh = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = i),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(Fh)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }
            _throwNameError() {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(ua), io(aa), io(Gh), io(qs));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  fo("change", function () {
                    return e.onChange();
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value",
              },
              features: [ia([Wh])],
            })),
            t
          );
        })();
      const Zh = { provide: Ch, useExisting: Ct(() => Qh), multi: !0 };
      let Qh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t)
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(ua), io(aa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                fo("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ia([Zh])],
          })),
          t
        );
      })();
      const Yh =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        Xh =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        Jh =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>';
      class tu {
        static controlParentException() {
          throw new Error(
            `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${Yh}`
          );
        }
        static ngModelGroupException() {
          throw new Error(
            `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${Xh}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ${Jh}`
          );
        }
        static missingFormException() {
          throw new Error(
            `formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ${Yh}`
          );
        }
        static groupParentException() {
          throw new Error(
            `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${Xh}`
          );
        }
        static arrayParentException() {
          throw new Error(
            'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
          );
        }
        static disabledAttrWarning() {
          console.warn(
            "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
          );
        }
        static ngModelWarning(t) {
          console.warn(
            `\n    It looks like you're using ngModel on the same form field as ${t}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
              "formControl" === t ? "FormControlDirective" : "FormControlName"
            }#use-with-ngmodel\n    `
          );
        }
      }
      const eu = { provide: Ch, useExisting: Ct(() => nu), multi: !0 };
      let nu = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Qs);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            this.value = t;
            const e = this._getOptionId(t);
            null == e &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function (t, e) {
              return null == t
                ? `${e}`
                : (e && "object" == typeof e && (e = "Object"),
                  `${t}: ${e}`.slice(0, 50));
            })(e, t);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              (this.value = this._getOptionValue(e)), t(this.value);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e), t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e) : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(ua), io(aa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["select", "formControlName", "", 3, "multiple", ""],
              ["select", "formControl", "", 3, "multiple", ""],
              ["select", "ngModel", "", 3, "multiple", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                fo("change", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [ia([eu])],
          })),
          t
        );
      })();
      const iu = { provide: Ch, useExisting: Ct(() => ru), multi: !0 };
      let ru = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Qs);
          }
          set compareWith(t) {
            if ("function" != typeof t)
              throw new Error(
                `compareWith must be a function, but received ${JSON.stringify(
                  t
                )}`
              );
            this._compareWith = t;
          }
          writeValue(t) {
            let e;
            if (((this.value = t), Array.isArray(t))) {
              const n = t.map((t) => this._getOptionId(t));
              e = (t, e) => {
                t._setSelected(n.indexOf(e.toString()) > -1);
              };
            } else
              e = (t, e) => {
                t._setSelected(!1);
              };
            this._optionMap.forEach(e);
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              const n = [];
              if (e.hasOwnProperty("selectedOptions")) {
                const t = e.selectedOptions;
                for (let e = 0; e < t.length; e++) {
                  const i = t.item(e),
                    r = this._getOptionValue(i.value);
                  n.push(r);
                }
              } else {
                const t = e.options;
                for (let e = 0; e < t.length; e++) {
                  const i = t.item(e);
                  if (i.selected) {
                    const t = this._getOptionValue(i.value);
                    n.push(t);
                  }
                }
              }
              (this.value = n), t(n);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption(t) {
            const e = (this._idCounter++).toString();
            return this._optionMap.set(e, t), e;
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e)._value, t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function (t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(ua), io(aa));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["select", "multiple", "", "formControlName", ""],
              ["select", "multiple", "", "formControl", ""],
              ["select", "multiple", "", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                fo("change", function (t) {
                  return e.onChange(t.target);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [ia([iu])],
          })),
          t
        );
      })();
      function su(t, e) {
        return [...e.path, t];
      }
      function ou(t, e) {
        t || hu(e, "Cannot find control with"),
          e.valueAccessor || hu(e, "No value accessor for form control with"),
          (t.validator = Vh.compose([t.validator, e.validator])),
          (t.asyncValidator = Vh.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && au(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange((t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && au(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange((t) => {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          }),
          e._rawAsyncValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          });
      }
      function au(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function lu(t, e) {
        null == t && hu(e, "Cannot find control with"),
          (t.validator = Vh.compose([t.validator, e.validator])),
          (t.asyncValidator = Vh.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ]));
      }
      function cu(t) {
        return hu(
          t,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function hu(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function uu(t) {
        return null != t ? Vh.compose(t.map(zh)) : null;
      }
      function du(t) {
        return null != t ? Vh.composeAsync(t.map(qh)) : null;
      }
      function pu(t, e) {
        if (!t.hasOwnProperty("model")) return !1;
        const n = t.model;
        return !!n.isFirstChange() || !Qs(e, n.currentValue);
      }
      const fu = [xh, Qh, Uh, nu, ru, Kh];
      function mu(t, e) {
        t._syncPendingControls(),
          e.forEach((t) => {
            const e = t.control;
            "submit" === e.updateOn &&
              e._pendingChange &&
              (t.viewToModelUpdate(e._pendingValue), (e._pendingChange = !1));
          });
      }
      function gu(t, e) {
        if (!e) return null;
        Array.isArray(e) ||
          hu(
            t,
            "Value accessor was not provided as an array for form control with"
          );
        let n = void 0,
          i = void 0,
          r = void 0;
        return (
          e.forEach((e) => {
            var s;
            e.constructor === Ah
              ? (n = e)
              : ((s = e),
                fu.some((t) => s.constructor === t)
                  ? (i &&
                      hu(
                        t,
                        "More than one built-in value accessor matches form control with"
                      ),
                    (i = e))
                  : (r &&
                      hu(
                        t,
                        "More than one custom value accessor matches form control with"
                      ),
                    (r = e)));
          }),
          r ||
            i ||
            n ||
            (hu(t, "No valid value accessor for form control with"), null)
        );
      }
      function _u(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      function yu(t) {
        const e = vu(t) ? t.validators : t;
        return Array.isArray(e) ? uu(e) : e || null;
      }
      function bu(t, e) {
        const n = vu(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? du(n) : n || null;
      }
      function vu(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class wu {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = yu(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = bu(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = "PENDING"),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const e = jh(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let i = t;
            return (
              e.forEach((t) => {
                i =
                  i instanceof Eu
                    ? i.controls.hasOwnProperty(t)
                      ? i.controls[t]
                      : null
                    : (i instanceof xu && i.at(t)) || null;
              }),
              i
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Ya()), (this.statusChanges = new Ya());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          vu(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class Cu extends wu {
        constructor(t = null, e, n) {
          super(yu(e), bu(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class Eu extends wu {
        constructor(t, e, n) {
          super(yu(e), bu(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof Cu ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          let e = !1;
          return (
            this._forEachChild((n, i) => {
              e = e || (this.contains(i) && t(n));
            }),
            e
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, i) => {
              n = e(n, t, i);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class xu extends wu {
        constructor(t, e, n) {
          super(yu(e), bu(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof Cu ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const ku = { provide: Oh, useExisting: Ct(() => Au) },
        Su = (() => Promise.resolve(null))();
      let Au = (() => {
          class t extends Oh {
            constructor(t, e) {
              super(),
                (this.submitted = !1),
                (this._directives = []),
                (this.ngSubmit = new Ya()),
                (this.form = new Eu({}, uu(t), du(e)));
            }
            ngAfterViewInit() {
              this._setUpdateStrategy();
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            get controls() {
              return this.form.controls;
            }
            addControl(t) {
              Su.then(() => {
                const e = this._findContainer(t.path);
                (t.control = e.registerControl(t.name, t.control)),
                  ou(t.control, t),
                  t.control.updateValueAndValidity({ emitEvent: !1 }),
                  this._directives.push(t);
              });
            }
            getControl(t) {
              return this.form.get(t.path);
            }
            removeControl(t) {
              Su.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name), _u(this._directives, t);
              });
            }
            addFormGroup(t) {
              Su.then(() => {
                const e = this._findContainer(t.path),
                  n = new Eu({});
                lu(n, t),
                  e.registerControl(t.name, n),
                  n.updateValueAndValidity({ emitEvent: !1 });
              });
            }
            removeFormGroup(t) {
              Su.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name);
              });
            }
            getFormGroup(t) {
              return this.form.get(t.path);
            }
            updateModel(t, e) {
              Su.then(() => {
                this.form.get(t.path).setValue(e);
              });
            }
            setValue(t) {
              this.control.setValue(t);
            }
            onSubmit(t) {
              return (
                (this.submitted = !0),
                mu(this.form, this._directives),
                this.ngSubmit.emit(t),
                !1
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(t) {
              this.form.reset(t), (this.submitted = !1);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.form._updateOn = this.options.updateOn);
            }
            _findContainer(t) {
              return t.pop(), t.length ? this.form.get(t) : this.form;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(Nh, 10), io(Mh, 10));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                ["ng-form"],
                ["", "ngForm", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  fo("submit", function (t) {
                    return e.onSubmit(t);
                  })("reset", function () {
                    return e.onReset();
                  });
              },
              inputs: { options: ["ngFormOptions", "options"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [ia([ku]), Ho],
            })),
            t
          );
        })(),
        Tu = (() => {
          class t extends Oh {
            ngOnInit() {
              this._checkParentType(), this.formDirective.addFormGroup(this);
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeFormGroup(this);
            }
            get control() {
              return this.formDirective.getFormGroup(this);
            }
            get path() {
              return su(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return uu(this._validators);
            }
            get asyncValidator() {
              return du(this._asyncValidators);
            }
            _checkParentType() {}
          }
          return (
            (t.ɵfac = function (e) {
              return Ou(e || t);
            }),
            (t.ɵdir = _e({ type: t, features: [Ho] })),
            t
          );
        })();
      const Ou = Qn(Tu);
      class Iu {
        static modelParentException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive "formControlName" instead.  Example:\n\n      ${Yh}\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  `
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${Xh}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${Jh}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${Xh}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${Jh}`
          );
        }
      }
      const Du = { provide: Oh, useExisting: Ct(() => Fu) };
      let Fu = (() => {
        class t extends Tu {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          _checkParentType() {
            this._parent instanceof t ||
              this._parent instanceof Au ||
              Iu.modelGroupParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Oh, 5), io(Nh, 10), io(Mh, 10));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngModelGroup", ""]],
            inputs: { name: ["ngModelGroup", "name"] },
            exportAs: ["ngModelGroup"],
            features: [ia([Du]), Ho],
          })),
          t
        );
      })();
      const Ru = { provide: Fh, useExisting: Ct(() => Nu) },
        Pu = (() => Promise.resolve(null))();
      let Nu = (() => {
        class t extends Fh {
          constructor(t, e, n, i) {
            super(),
              (this.control = new Cu()),
              (this._registered = !1),
              (this.update = new Ya()),
              (this._parent = t),
              (this._rawValidators = e || []),
              (this._rawAsyncValidators = n || []),
              (this.valueAccessor = gu(this, i));
          }
          ngOnChanges(t) {
            this._checkForErrors(),
              this._registered || this._setUpControl(),
              "isDisabled" in t && this._updateDisabled(t),
              pu(t, this.viewModel) &&
                (this._updateValue(this.model), (this.viewModel = this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          get path() {
            return this._parent ? su(this.name, this._parent) : [this.name];
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get validator() {
            return uu(this._rawValidators);
          }
          get asyncValidator() {
            return du(this._rawAsyncValidators);
          }
          viewToModelUpdate(t) {
            (this.viewModel = t), this.update.emit(t);
          }
          _setUpControl() {
            this._setUpdateStrategy(),
              this._isStandalone()
                ? this._setUpStandalone()
                : this.formDirective.addControl(this),
              (this._registered = !0);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.control._updateOn = this.options.updateOn);
          }
          _isStandalone() {
            return (
              !this._parent || !(!this.options || !this.options.standalone)
            );
          }
          _setUpStandalone() {
            ou(this.control, this),
              this.control.updateValueAndValidity({ emitEvent: !1 });
          }
          _checkForErrors() {
            this._isStandalone() || this._checkParentType(), this._checkName();
          }
          _checkParentType() {
            !(this._parent instanceof Fu) && this._parent instanceof Tu
              ? Iu.formGroupNameException()
              : this._parent instanceof Fu ||
                this._parent instanceof Au ||
                Iu.modelParentException();
          }
          _checkName() {
            this.options &&
              this.options.name &&
              (this.name = this.options.name),
              this._isStandalone() || this.name || Iu.missingNameException();
          }
          _updateValue(t) {
            Pu.then(() => {
              this.control.setValue(t, { emitViewToModelChange: !1 });
            });
          }
          _updateDisabled(t) {
            const e = t.isDisabled.currentValue,
              n = "" === e || (e && "false" !== e);
            Pu.then(() => {
              n && !this.control.disabled
                ? this.control.disable()
                : !n && this.control.disabled && this.control.enable();
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Oh, 9), io(Nh, 10), io(Mh, 10), io(Ch, 10));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              [
                "",
                "ngModel",
                "",
                3,
                "formControlName",
                "",
                3,
                "formControl",
                "",
              ],
            ],
            inputs: {
              name: "name",
              isDisabled: ["disabled", "isDisabled"],
              model: ["ngModel", "model"],
              options: ["ngModelOptions", "options"],
            },
            outputs: { update: "ngModelChange" },
            exportAs: ["ngModel"],
            features: [ia([Ru]), Ho, Go],
          })),
          t
        );
      })();
      const Mu = new Lt("NgModelWithFormControlWarning"),
        Lu = { provide: Fh, useExisting: Ct(() => Vu) };
      let Vu = (() => {
        class t extends Fh {
          constructor(t, e, n, i) {
            super(),
              (this._ngModelWarningConfig = i),
              (this.update = new Ya()),
              (this._ngModelWarningSent = !1),
              (this._rawValidators = t || []),
              (this._rawAsyncValidators = e || []),
              (this.valueAccessor = gu(this, n));
          }
          set isDisabled(t) {
            tu.disabledAttrWarning();
          }
          ngOnChanges(e) {
            var n, i;
            this._isControlChanged(e) &&
              (ou(this.form, this),
              this.control.disabled &&
                this.valueAccessor.setDisabledState &&
                this.valueAccessor.setDisabledState(!0),
              this.form.updateValueAndValidity({ emitEvent: !1 })),
              pu(e, this.viewModel) &&
                ("formControl",
                (n = t),
                this,
                (i = this._ngModelWarningConfig),
                di() &&
                  "never" !== i &&
                  ((((null !== i && "once" !== i) ||
                    n._ngModelWarningSentOnce) &&
                    ("always" !== i || this._ngModelWarningSent)) ||
                    (tu.ngModelWarning("formControl"),
                    (n._ngModelWarningSentOnce = !0),
                    (this._ngModelWarningSent = !0))),
                this.form.setValue(this.model),
                (this.viewModel = this.model));
          }
          get path() {
            return [];
          }
          get validator() {
            return uu(this._rawValidators);
          }
          get asyncValidator() {
            return du(this._rawAsyncValidators);
          }
          get control() {
            return this.form;
          }
          viewToModelUpdate(t) {
            (this.viewModel = t), this.update.emit(t);
          }
          _isControlChanged(t) {
            return t.hasOwnProperty("form");
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Nh, 10), io(Mh, 10), io(Ch, 10), io(Mu, 8));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "formControl", ""]],
            inputs: {
              isDisabled: ["disabled", "isDisabled"],
              form: ["formControl", "form"],
              model: ["ngModel", "model"],
            },
            outputs: { update: "ngModelChange" },
            exportAs: ["ngForm"],
            features: [ia([Lu]), Ho, Go],
          })),
          (t._ngModelWarningSentOnce = !1),
          t
        );
      })();
      const Bu = { provide: Oh, useExisting: Ct(() => ju) };
      let ju = (() => {
        class t extends Oh {
          constructor(t, e) {
            super(),
              (this._validators = t),
              (this._asyncValidators = e),
              (this.submitted = !1),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Ya());
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations());
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const e = this.form.get(t.path);
            return (
              ou(e, t),
              e.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              e
            );
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            _u(this.directives, t);
          }
          addFormGroup(t) {
            const e = this.form.get(t.path);
            lu(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormGroup(t) {}
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            const e = this.form.get(t.path);
            lu(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormArray(t) {}
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, e) {
            this.form.get(t.path).setValue(e);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              mu(this.form, this.directives),
              this.ngSubmit.emit(t),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((t) => {
              const e = this.form.get(t.path);
              t.control !== e &&
                ((function (t, e) {
                  e.valueAccessor.registerOnChange(() => cu(e)),
                    e.valueAccessor.registerOnTouched(() => cu(e)),
                    e._rawValidators.forEach((t) => {
                      t.registerOnValidatorChange &&
                        t.registerOnValidatorChange(null);
                    }),
                    e._rawAsyncValidators.forEach((t) => {
                      t.registerOnValidatorChange &&
                        t.registerOnValidatorChange(null);
                    }),
                    t && t._clearChangeFns();
                })(t.control, t),
                e && ou(e, t),
                (t.control = e));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(() => this._updateDomValue()),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {}),
              (this._oldForm = this.form);
          }
          _updateValidators() {
            const t = uu(this._validators);
            this.form.validator = Vh.compose([this.form.validator, t]);
            const e = du(this._asyncValidators);
            this.form.asyncValidator = Vh.composeAsync([
              this.form.asyncValidator,
              e,
            ]);
          }
          _checkFormPresent() {
            this.form || tu.missingFormException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Nh, 10), io(Mh, 10));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (t, e) {
              1 & t &&
                fo("submit", function (t) {
                  return e.onSubmit(t);
                })("reset", function () {
                  return e.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ia([Bu]), Ho, Go],
          })),
          t
        );
      })();
      const Hu = { provide: Nh, useExisting: Ct(() => zu), multi: !0 };
      let zu = (() => {
          class t {
            get required() {
              return this._required;
            }
            set required(t) {
              (this._required = null != t && !1 !== t && "false" !== `${t}`),
                this._onChange && this._onChange();
            }
            validate(t) {
              return this.required ? Vh.required(t) : null;
            }
            registerOnValidatorChange(t) {
              this._onChange = t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                [
                  "",
                  "required",
                  "",
                  "formControlName",
                  "",
                  3,
                  "type",
                  "checkbox",
                ],
                ["", "required", "", "formControl", "", 3, "type", "checkbox"],
                ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
              ],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && to("required", e.required ? "" : null);
              },
              inputs: { required: "required" },
              features: [ia([Hu])],
            })),
            t
          );
        })(),
        qu = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        $u = (() => {
          class t {
            group(t, e = null) {
              const n = this._reduceControls(t);
              let i = null,
                r = null,
                s = void 0;
              return (
                null != e &&
                  ((function (t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((i = null != e.validators ? e.validators : null),
                      (r =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (s = null != e.updateOn ? e.updateOn : void 0))
                    : ((i = null != e.validator ? e.validator : null),
                      (r =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new Eu(n, { asyncValidators: r, updateOn: s, validators: i })
              );
            }
            control(t, e, n) {
              return new Cu(t, e, n);
            }
            array(t, e, n) {
              const i = t.map((t) => this._createControl(t));
              return new xu(i, e, n);
            }
            _reduceControls(t) {
              const e = {};
              return (
                Object.keys(t).forEach((n) => {
                  e[n] = this._createControl(t[n]);
                }),
                e
              );
            }
            _createControl(t) {
              return t instanceof Cu || t instanceof Eu || t instanceof xu
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Uu = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Gh],
              imports: [qu],
            })),
            t
          );
        })(),
        Wu = (() => {
          class t {
            static withConfig(e) {
              return {
                ngModule: t,
                providers: [
                  { provide: Mu, useValue: e.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [$u, Gh],
              imports: [qu],
            })),
            t
          );
        })();
      class Gu {
        static replyMessage(t, e) {
          const n = new Gu();
          return (n.text = t.replace(/\n/g, "<br>")), (n.styleClass = e), n;
        }
        static inputMessage(t) {
          const e = new Gu();
          return (
            (e.type = t.type),
            (e.submitLabel = t.submitLabel),
            (e.styleClass = "reply"),
            (e.ctrl = new Cu("", [Vh.required])),
            "number" === t.type && ((e.min = t.min), (e.max = t.max)),
            e
          );
        }
        static typingMessage() {
          const t = new Gu();
          return (t.type = "typing"), t;
        }
      }
      var Ku = n("gFX4");
      let Zu = (() => {
        class t {
          constructor() {
            this.messagesQueue = [];
          }
          connect(t, e, n) {
            (this.userId = t),
              (this.socket = Ku("http://35.192.198.9:5005", {
                path: "/socket.io/",
              })),
              this.socket.on("connect_error", (t) => {
                e(),
                  n({ text: "Sorry, looks like the service is down" }),
                  n({ text: "Please try later" }),
                  this.socket.close();
              }),
              this.socket.on("bot_uttered", n),
              this.socket.on("connect", () => {
                console.log(`connect:${this.socket.id}`),
                  e(),
                  this.messagesQueue.push("Hello"),
                  (this.intervalId = setInterval(() => this.dispatch(), 500));
              });
          }
          disconnect() {
            clearInterval(this.intervalId),
              (this.intervalId = null),
              this.socket.close(),
              (this.messagesQueue = []),
              (this.userId = null);
          }
          send(t) {
            this.messagesQueue.push(t);
          }
          dispatch() {
            this.socket.connected &&
              0 !== this.messagesQueue.length &&
              this.socket.emit("user_uttered", {
                message: this.messagesQueue.shift(),
                session_id: this.socket.id,
                metadata: { userId: this.userId },
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function Qu(...t) {
        let e = t[t.length - 1];
        return k(e) ? (t.pop(), V(t, e)) : $(t);
      }
      function Yu(t, ...e) {
        return e.length
          ? e.some((e) => t[e])
          : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
      }
      function Xu() {}
      function Ju(t, e, n) {
        return function (i) {
          return i.lift(new td(t, e, n));
        };
      }
      class td {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new ed(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class ed extends f {
        constructor(t, e, n, r) {
          super(t),
            (this._tapNext = Xu),
            (this._tapError = Xu),
            (this._tapComplete = Xu),
            (this._tapError = n || Xu),
            (this._tapComplete = r || Xu),
            i(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || Xu),
                (this._tapError = e.error || Xu),
                (this._tapComplete = e.complete || Xu));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class nd extends u {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class id extends nd {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            i = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(i, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(i, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            i = void 0;
          try {
            this.work(t);
          } catch (r) {
            (n = !0), (i = (!!r && r) || new Error(r));
          }
          if (n) return this.unsubscribe(), i;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            i = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== i && n.splice(i, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      let rd = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class sd extends rd {
        constructor(t, e = rd.now) {
          super(t, () =>
            sd.delegate && sd.delegate !== this ? sd.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return sd.delegate && sd.delegate !== this
            ? sd.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      const od = new sd(id);
      function ad(t, e = od) {
        return (n) => n.lift(new ld(t, e));
      }
      class ld {
        constructor(t, e) {
          (this.dueTime = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new cd(t, this.dueTime, this.scheduler));
        }
      }
      class cd extends f {
        constructor(t, e, n) {
          super(t),
            (this.dueTime = e),
            (this.scheduler = n),
            (this.debouncedSubscription = null),
            (this.lastValue = null),
            (this.hasValue = !1);
        }
        _next(t) {
          this.clearDebounce(),
            (this.lastValue = t),
            (this.hasValue = !0),
            this.add(
              (this.debouncedSubscription = this.scheduler.schedule(
                hd,
                this.dueTime,
                this
              ))
            );
        }
        _complete() {
          this.debouncedNext(), this.destination.complete();
        }
        debouncedNext() {
          if ((this.clearDebounce(), this.hasValue)) {
            const { lastValue: t } = this;
            (this.lastValue = null),
              (this.hasValue = !1),
              this.destination.next(t);
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription;
          null !== t &&
            (this.remove(t),
            t.unsubscribe(),
            (this.debouncedSubscription = null));
        }
      }
      function hd(t) {
        t.debouncedNext();
      }
      function ud(t, e) {
        return function (n) {
          return n.lift(new dd(t, e));
        };
      }
      class dd {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new pd(t, this.predicate, this.thisArg));
        }
      }
      class pd extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const fd = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "argument out of range"),
              (this.name = "ArgumentOutOfRangeError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        md = new y((t) => t.complete());
      function gd(t) {
        return t
          ? (function (t) {
              return new y((e) => t.schedule(() => e.complete()));
            })(t)
          : md;
      }
      function _d(t) {
        return (e) => (0 === t ? gd() : e.lift(new yd(t)));
      }
      class yd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new fd();
        }
        call(t, e) {
          return e.subscribe(new bd(t, this.total));
        }
      }
      class bd extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function vd(t) {
        return null != t && "false" !== `${t}`;
      }
      function wd(t, e = 0) {
        return (function (t) {
          return !isNaN(parseFloat(t)) && !isNaN(Number(t));
        })(t)
          ? Number(t)
          : e;
      }
      function Cd(t) {
        return Array.isArray(t) ? t : [t];
      }
      function Ed(t) {
        return null == t ? "" : "string" == typeof t ? t : `${t}px`;
      }
      function xd(t) {
        return t instanceof aa ? t.nativeElement : t;
      }
      let kd;
      try {
        kd = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (qb) {
        kd = !1;
      }
      let Sd,
        Ad = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? "browser" === this._platformId
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !kd) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(kl, 8));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(kl, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Td = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      const Od = [
        "color",
        "button",
        "checkbox",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ];
      function Id() {
        if (Sd) return Sd;
        if ("object" != typeof document || !document)
          return (Sd = new Set(Od)), Sd;
        let t = document.createElement("input");
        return (
          (Sd = new Set(
            Od.filter((e) => (t.setAttribute("type", e), t.type === e))
          )),
          Sd
        );
      }
      let Dd, Fd;
      function Rd(t) {
        return (function () {
          if (null == Dd && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Dd = !0) })
              );
            } finally {
              Dd = Dd || !1;
            }
          return Dd;
        })()
          ? t
          : !!t.capture;
      }
      function Pd() {
        if ("object" != typeof document || !document) return 0;
        if (null == Fd) {
          const t = document.createElement("div"),
            e = t.style;
          (t.dir = "rtl"),
            (e.height = "1px"),
            (e.width = "1px"),
            (e.overflow = "auto"),
            (e.visibility = "hidden"),
            (e.pointerEvents = "none"),
            (e.position = "absolute");
          const n = document.createElement("div"),
            i = n.style;
          (i.width = "2px"),
            (i.height = "1px"),
            t.appendChild(n),
            document.body.appendChild(t),
            (Fd = 0),
            0 === t.scrollLeft &&
              ((t.scrollLeft = 1), (Fd = 0 === t.scrollLeft ? 1 : 2)),
            t.parentNode.removeChild(t);
        }
        return Fd;
      }
      let Nd = (() => {
          class t {
            create(t) {
              return "undefined" == typeof MutationObserver
                ? null
                : new MutationObserver(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Md = (() => {
          class t {
            constructor(t) {
              (this._mutationObserverFactory = t),
                (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, e) =>
                this._cleanupObserver(e)
              );
            }
            observe(t) {
              const e = xd(t);
              return new y((t) => {
                const n = this._observeElement(e).subscribe(t);
                return () => {
                  n.unsubscribe(), this._unobserveElement(e);
                };
              });
            }
            _observeElement(t) {
              if (this._observedElements.has(t))
                this._observedElements.get(t).count++;
              else {
                const e = new E(),
                  n = this._mutationObserverFactory.create((t) => e.next(t));
                n &&
                  n.observe(t, {
                    characterData: !0,
                    childList: !0,
                    subtree: !0,
                  }),
                  this._observedElements.set(t, {
                    observer: n,
                    stream: e,
                    count: 1,
                  });
              }
              return this._observedElements.get(t).stream;
            }
            _unobserveElement(t) {
              this._observedElements.has(t) &&
                (this._observedElements.get(t).count--,
                this._observedElements.get(t).count ||
                  this._cleanupObserver(t));
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const { observer: e, stream: n } = this._observedElements.get(
                  t
                );
                e && e.disconnect(),
                  n.complete(),
                  this._observedElements.delete(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Nd));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Nd));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Ld = (() => {
          class t {
            constructor(t, e, n) {
              (this._contentObserver = t),
                (this._elementRef = e),
                (this._ngZone = n),
                (this.event = new Ya()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = vd(t)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(t) {
              (this._debounce = wd(t)), this._subscribe();
            }
            ngAfterContentInit() {
              this._currentSubscription || this.disabled || this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce
                  ? t.pipe(ad(this.debounce))
                  : t
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              this._currentSubscription &&
                this._currentSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(Md), io(aa), io(Hl));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "cdkObserveContent", ""]],
              inputs: {
                disabled: ["cdkObserveContentDisabled", "disabled"],
                debounce: "debounce",
              },
              outputs: { event: "cdkObserveContent" },
              exportAs: ["cdkObserveContent"],
            })),
            t
          );
        })(),
        Vd = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Nd],
            })),
            t
          );
        })(),
        Bd = (() => {
          class t {
            constructor(t) {
              this._platform = t;
            }
            isDisabled(t) {
              return t.hasAttribute("disabled");
            }
            isVisible(t) {
              return (
                (function (t) {
                  return !!(
                    t.offsetWidth ||
                    t.offsetHeight ||
                    ("function" == typeof t.getClientRects &&
                      t.getClientRects().length)
                  );
                })(t) && "visible" === getComputedStyle(t).visibility
              );
            }
            isTabbable(t) {
              if (!this._platform.isBrowser) return !1;
              const e = (function (t) {
                try {
                  return t.frameElement;
                } catch (qb) {
                  return null;
                }
              })(
                ((n = t).ownerDocument && n.ownerDocument.defaultView) || window
              );
              var n;
              if (e) {
                const t = e && e.nodeName.toLowerCase();
                if (-1 === Hd(e)) return !1;
                if (
                  (this._platform.BLINK || this._platform.WEBKIT) &&
                  "object" === t
                )
                  return !1;
                if (
                  (this._platform.BLINK || this._platform.WEBKIT) &&
                  !this.isVisible(e)
                )
                  return !1;
              }
              let i = t.nodeName.toLowerCase(),
                r = Hd(t);
              if (t.hasAttribute("contenteditable")) return -1 !== r;
              if ("iframe" === i) return !1;
              if ("audio" === i) {
                if (!t.hasAttribute("controls")) return !1;
                if (this._platform.BLINK) return !0;
              }
              if ("video" === i) {
                if (!t.hasAttribute("controls") && this._platform.TRIDENT)
                  return !1;
                if (this._platform.BLINK || this._platform.FIREFOX) return !0;
              }
              return (
                ("object" !== i ||
                  (!this._platform.BLINK && !this._platform.WEBKIT)) &&
                !(
                  this._platform.WEBKIT &&
                  this._platform.IOS &&
                  !(function (t) {
                    let e = t.nodeName.toLowerCase(),
                      n = "input" === e && t.type;
                    return (
                      "text" === n ||
                      "password" === n ||
                      "select" === e ||
                      "textarea" === e
                    );
                  })(t)
                ) &&
                t.tabIndex >= 0
              );
            }
            isFocusable(t) {
              return (
                (function (t) {
                  return (
                    !(function (t) {
                      return (
                        (function (t) {
                          return "input" == t.nodeName.toLowerCase();
                        })(t) && "hidden" == t.type
                      );
                    })(t) &&
                    ((function (t) {
                      let e = t.nodeName.toLowerCase();
                      return (
                        "input" === e ||
                        "select" === e ||
                        "button" === e ||
                        "textarea" === e
                      );
                    })(t) ||
                      (function (t) {
                        return (
                          (function (t) {
                            return "a" == t.nodeName.toLowerCase();
                          })(t) && t.hasAttribute("href")
                        );
                      })(t) ||
                      t.hasAttribute("contenteditable") ||
                      jd(t))
                  );
                })(t) &&
                !this.isDisabled(t) &&
                this.isVisible(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Ad));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Ad));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      function jd(t) {
        if (!t.hasAttribute("tabindex") || void 0 === t.tabIndex) return !1;
        let e = t.getAttribute("tabindex");
        return "-32768" != e && !(!e || isNaN(parseInt(e, 10)));
      }
      function Hd(t) {
        if (!jd(t)) return null;
        const e = parseInt(t.getAttribute("tabindex") || "", 10);
        return isNaN(e) ? -1 : e;
      }
      class zd {
        constructor(t, e, n, i, r = !1) {
          (this._element = t),
            (this._checker = e),
            (this._ngZone = n),
            (this._document = i),
            (this._hasAttached = !1),
            (this.startAnchorListener = () => this.focusLastTabbableElement()),
            (this.endAnchorListener = () => this.focusFirstTabbableElement()),
            (this._enabled = !0),
            r || this.attachAnchors();
        }
        get enabled() {
          return this._enabled;
        }
        set enabled(t) {
          (this._enabled = t),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(t, this._startAnchor),
              this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        destroy() {
          const t = this._startAnchor,
            e = this._endAnchor;
          t &&
            (t.removeEventListener("focus", this.startAnchorListener),
            t.parentNode && t.parentNode.removeChild(t)),
            e &&
              (e.removeEventListener("focus", this.endAnchorListener),
              e.parentNode && e.parentNode.removeChild(e)),
            (this._startAnchor = this._endAnchor = null);
        }
        attachAnchors() {
          return (
            !!this._hasAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._startAnchor ||
                ((this._startAnchor = this._createAnchor()),
                this._startAnchor.addEventListener(
                  "focus",
                  this.startAnchorListener
                )),
                this._endAnchor ||
                  ((this._endAnchor = this._createAnchor()),
                  this._endAnchor.addEventListener(
                    "focus",
                    this.endAnchorListener
                  ));
            }),
            this._element.parentNode &&
              (this._element.parentNode.insertBefore(
                this._startAnchor,
                this._element
              ),
              this._element.parentNode.insertBefore(
                this._endAnchor,
                this._element.nextSibling
              ),
              (this._hasAttached = !0)),
            this._hasAttached)
          );
        }
        focusInitialElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusInitialElement()));
          });
        }
        focusFirstTabbableElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusFirstTabbableElement()));
          });
        }
        focusLastTabbableElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusLastTabbableElement()));
          });
        }
        _getRegionBoundary(t) {
          let e = this._element.querySelectorAll(
            `[cdk-focus-region-${t}], ` +
              `[cdkFocusRegion${t}], ` +
              `[cdk-focus-${t}]`
          );
          for (let n = 0; n < e.length; n++)
            e[n].hasAttribute(`cdk-focus-${t}`)
              ? console.warn(
                  `Found use of deprecated attribute 'cdk-focus-${t}', ` +
                    `use 'cdkFocusRegion${t}' instead. The deprecated ` +
                    "attribute will be removed in 8.0.0.",
                  e[n]
                )
              : e[n].hasAttribute(`cdk-focus-region-${t}`) &&
                console.warn(
                  `Found use of deprecated attribute 'cdk-focus-region-${t}', ` +
                    `use 'cdkFocusRegion${t}' instead. The deprecated attribute ` +
                    "will be removed in 8.0.0.",
                  e[n]
                );
          return "start" == t
            ? e.length
              ? e[0]
              : this._getFirstTabbableElement(this._element)
            : e.length
            ? e[e.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement() {
          const t = this._element.querySelector(
            "[cdk-focus-initial], [cdkFocusInitial]"
          );
          return t
            ? (t.hasAttribute("cdk-focus-initial") &&
                console.warn(
                  "Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",
                  t
                ),
              di() &&
                !this._checker.isFocusable(t) &&
                console.warn(
                  "Element matching '[cdkFocusInitial]' is not focusable.",
                  t
                ),
              t.focus(),
              !0)
            : this.focusFirstTabbableElement();
        }
        focusFirstTabbableElement() {
          const t = this._getRegionBoundary("start");
          return t && t.focus(), !!t;
        }
        focusLastTabbableElement() {
          const t = this._getRegionBoundary("end");
          return t && t.focus(), !!t;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          let e = t.children || t.childNodes;
          for (let n = 0; n < e.length; n++) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _getLastTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          let e = t.children || t.childNodes;
          for (let n = e.length - 1; n >= 0; n--) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _createAnchor() {
          const t = this._document.createElement("div");
          return (
            this._toggleAnchorTabIndex(this._enabled, t),
            t.classList.add("cdk-visually-hidden"),
            t.classList.add("cdk-focus-trap-anchor"),
            t.setAttribute("aria-hidden", "true"),
            t
          );
        }
        _toggleAnchorTabIndex(t, e) {
          t ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
        }
        toggleAnchors(t) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(t, this._startAnchor),
            this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        _executeOnStable(t) {
          this._ngZone.isStable
            ? t()
            : this._ngZone.onStable.asObservable().pipe(_d(1)).subscribe(t);
        }
      }
      let qd = (() => {
        class t {
          constructor(t, e, n) {
            (this._checker = t), (this._ngZone = e), (this._document = n);
          }
          create(t, e = !1) {
            return new zd(t, this._checker, this._ngZone, this._document, e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Bd), Gt(Hl), Gt(pc));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(Gt(Bd), Gt(Hl), Gt(pc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function $d(t) {
        return 0 === t.buttons;
      }
      "undefined" != typeof Element && Element;
      const Ud = new Lt("cdk-focus-monitor-default-options"),
        Wd = Rd({ passive: !0, capture: !0 });
      let Gd = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._ngZone = t),
                (this._platform = e),
                (this._origin = null),
                (this._windowFocused = !1),
                (this._elementInfo = new Map()),
                (this._monitoredElementCount = 0),
                (this._documentKeydownListener = () => {
                  (this._lastTouchTarget = null),
                    this._setOriginForCurrentEventQueue("keyboard");
                }),
                (this._documentMousedownListener = (t) => {
                  if (!this._lastTouchTarget) {
                    const e = $d(t) ? "keyboard" : "mouse";
                    this._setOriginForCurrentEventQueue(e);
                  }
                }),
                (this._documentTouchstartListener = (t) => {
                  null != this._touchTimeoutId &&
                    clearTimeout(this._touchTimeoutId),
                    (this._lastTouchTarget = t.composedPath
                      ? t.composedPath()[0]
                      : t.target),
                    (this._touchTimeoutId = setTimeout(
                      () => (this._lastTouchTarget = null),
                      650
                    ));
                }),
                (this._windowFocusListener = () => {
                  (this._windowFocused = !0),
                    (this._windowFocusTimeoutId = setTimeout(
                      () => (this._windowFocused = !1)
                    ));
                }),
                (this._documentFocusAndBlurListener = (t) => {
                  const e = "focus" === t.type ? this._onFocus : this._onBlur;
                  for (let n = t.target; n; n = n.parentElement)
                    e.call(this, t, n);
                }),
                (this._document = n),
                (this._detectionMode =
                  (null == i ? void 0 : i.detectionMode) || 0);
            }
            monitor(t, e = !1) {
              if (!this._platform.isBrowser) return Qu(null);
              const n = xd(t);
              if (this._elementInfo.has(n)) {
                const t = this._elementInfo.get(n);
                return (t.checkChildren = e), t.subject.asObservable();
              }
              const i = { checkChildren: e, subject: new E() };
              return (
                this._elementInfo.set(n, i),
                this._incrementMonitoredElementCount(),
                i.subject.asObservable()
              );
            }
            stopMonitoring(t) {
              const e = xd(t),
                n = this._elementInfo.get(e);
              n &&
                (n.subject.complete(),
                this._setClasses(e),
                this._elementInfo.delete(e),
                this._decrementMonitoredElementCount());
            }
            focusVia(t, e, n) {
              const i = xd(t);
              this._setOriginForCurrentEventQueue(e),
                "function" == typeof i.focus && i.focus(n);
            }
            ngOnDestroy() {
              this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
            }
            _getDocument() {
              return this._document || document;
            }
            _getWindow() {
              return this._getDocument().defaultView || window;
            }
            _toggleClass(t, e, n) {
              n ? t.classList.add(e) : t.classList.remove(e);
            }
            _getFocusOrigin(t) {
              return this._origin
                ? this._origin
                : this._windowFocused && this._lastFocusOrigin
                ? this._lastFocusOrigin
                : this._wasCausedByTouch(t)
                ? "touch"
                : "program";
            }
            _setClasses(t, e) {
              this._toggleClass(t, "cdk-focused", !!e),
                this._toggleClass(t, "cdk-touch-focused", "touch" === e),
                this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
                this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
                this._toggleClass(t, "cdk-program-focused", "program" === e);
            }
            _setOriginForCurrentEventQueue(t) {
              this._ngZone.runOutsideAngular(() => {
                (this._origin = t),
                  0 === this._detectionMode &&
                    (this._originTimeoutId = setTimeout(
                      () => (this._origin = null),
                      1
                    ));
              });
            }
            _wasCausedByTouch(t) {
              let e = t.target;
              return (
                this._lastTouchTarget instanceof Node &&
                e instanceof Node &&
                (e === this._lastTouchTarget ||
                  e.contains(this._lastTouchTarget))
              );
            }
            _onFocus(t, e) {
              const n = this._elementInfo.get(e);
              if (!n || (!n.checkChildren && e !== t.target)) return;
              const i = this._getFocusOrigin(t);
              this._setClasses(e, i),
                this._emitOrigin(n.subject, i),
                (this._lastFocusOrigin = i);
            }
            _onBlur(t, e) {
              const n = this._elementInfo.get(e);
              !n ||
                (n.checkChildren &&
                  t.relatedTarget instanceof Node &&
                  e.contains(t.relatedTarget)) ||
                (this._setClasses(e), this._emitOrigin(n.subject, null));
            }
            _emitOrigin(t, e) {
              this._ngZone.run(() => t.next(e));
            }
            _incrementMonitoredElementCount() {
              1 == ++this._monitoredElementCount &&
                this._platform.isBrowser &&
                this._ngZone.runOutsideAngular(() => {
                  const t = this._getDocument(),
                    e = this._getWindow();
                  t.addEventListener(
                    "focus",
                    this._documentFocusAndBlurListener,
                    Wd
                  ),
                    t.addEventListener(
                      "blur",
                      this._documentFocusAndBlurListener,
                      Wd
                    ),
                    t.addEventListener(
                      "keydown",
                      this._documentKeydownListener,
                      Wd
                    ),
                    t.addEventListener(
                      "mousedown",
                      this._documentMousedownListener,
                      Wd
                    ),
                    t.addEventListener(
                      "touchstart",
                      this._documentTouchstartListener,
                      Wd
                    ),
                    e.addEventListener("focus", this._windowFocusListener);
                });
            }
            _decrementMonitoredElementCount() {
              if (!--this._monitoredElementCount) {
                const t = this._getDocument(),
                  e = this._getWindow();
                t.removeEventListener(
                  "focus",
                  this._documentFocusAndBlurListener,
                  Wd
                ),
                  t.removeEventListener(
                    "blur",
                    this._documentFocusAndBlurListener,
                    Wd
                  ),
                  t.removeEventListener(
                    "keydown",
                    this._documentKeydownListener,
                    Wd
                  ),
                  t.removeEventListener(
                    "mousedown",
                    this._documentMousedownListener,
                    Wd
                  ),
                  t.removeEventListener(
                    "touchstart",
                    this._documentTouchstartListener,
                    Wd
                  ),
                  e.removeEventListener("focus", this._windowFocusListener),
                  clearTimeout(this._windowFocusTimeoutId),
                  clearTimeout(this._touchTimeoutId),
                  clearTimeout(this._originTimeoutId);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Hl), Gt(Ad), Gt(pc, 8), Gt(Ud, 8));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Hl), Gt(Ad), Gt(pc, 8), Gt(Ud, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Kd = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t), (this._document = e);
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement("div");
              (t.style.backgroundColor = "rgb(1,2,3)"),
                (t.style.position = "absolute"),
                this._document.body.appendChild(t);
              const e = this._document.defaultView || window,
                n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                i = ((n && n.backgroundColor) || "").replace(/ /g, "");
              switch ((this._document.body.removeChild(t), i)) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1;
              }
              return 0;
            }
            _applyBodyHighContrastModeCssClasses() {
              if (this._platform.isBrowser && this._document.body) {
                const t = this._document.body.classList;
                t.remove("cdk-high-contrast-active"),
                  t.remove("cdk-high-contrast-black-on-white"),
                  t.remove("cdk-high-contrast-white-on-black");
                const e = this.getHighContrastMode();
                1 === e
                  ? (t.add("cdk-high-contrast-active"),
                    t.add("cdk-high-contrast-black-on-white"))
                  : 2 === e &&
                    (t.add("cdk-high-contrast-active"),
                    t.add("cdk-high-contrast-white-on-black"));
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Ad), Gt(pc));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Ad), Gt(pc));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Zd = (() => {
          class t {
            constructor(t) {
              t._applyBodyHighContrastModeCssClasses();
            }
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)(Gt(Kd));
              },
              imports: [[Td, Vd]],
            })),
            t
          );
        })();
      const Qd = new Lt("cdk-dir-doc", {
        providedIn: "root",
        factory: function () {
          return Kt(pc);
        },
      });
      let Yd = (() => {
          class t {
            constructor(t) {
              if (((this.value = "ltr"), (this.change = new Ya()), t)) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e;
                this.value = "ltr" === n || "rtl" === n ? n : "ltr";
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Qd, 8));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Qd, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Xd = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      const Jd = new fa("9.2.1");
      function tp(...t) {
        return q(1)(Qu(...t));
      }
      function ep(...t) {
        const e = t[t.length - 1];
        return k(e) ? (t.pop(), (n) => tp(t, n, e)) : (e) => tp(t, e);
      }
      class np {}
      function ip(t, e) {
        return { type: 7, name: t, definitions: e, options: {} };
      }
      function rp(t, e = null) {
        return { type: 4, styles: e, timings: t };
      }
      function sp(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function op(t) {
        return { type: 6, styles: t, offset: null };
      }
      function ap(t, e, n) {
        return { type: 0, name: t, styles: e, options: n };
      }
      function lp(t, e, n = null) {
        return { type: 1, expr: t, animation: e, options: n };
      }
      function cp(t) {
        Promise.resolve(null).then(t);
      }
      class hp {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          cp(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(t) {}
        getPosition() {
          return 0;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class up {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            i = 0;
          const r = this.players.length;
          0 == r
            ? cp(() => this._onFinish())
            : this.players.forEach((t) => {
                t.onDone(() => {
                  ++e == r && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == r && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++i == r && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (t, e) => Math.max(t, e.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((t) => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          let t = 0;
          return (
            this.players.forEach((e) => {
              const n = e.getPosition();
              t = Math.min(n, t);
            }),
            t
          );
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      function dp() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function pp(t) {
        switch (t.length) {
          case 0:
            return new hp();
          case 1:
            return t[0];
          default:
            return new up(t);
        }
      }
      function fp(t, e, n, i, r = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((t) => {
            const n = t.offset,
              i = n == l,
              h = (i && c) || {};
            Object.keys(t).forEach((n) => {
              let i = n,
                a = t[n];
              if ("offset" !== n)
                switch (((i = e.normalizePropertyName(i, o)), a)) {
                  case "!":
                    a = r[n];
                    break;
                  case "*":
                    a = s[n];
                    break;
                  default:
                    a = e.normalizeStyleValue(n, i, a, o);
                }
              h[i] = a;
            }),
              i || a.push(h),
              (c = h),
              (l = n);
          }),
          o.length)
        ) {
          const t = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${t}${o.join(t)}`
          );
        }
        return a;
      }
      function mp(t, e, n, i) {
        switch (e) {
          case "start":
            t.onStart(() => i(n && gp(n, "start", t)));
            break;
          case "done":
            t.onDone(() => i(n && gp(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => i(n && gp(n, "destroy", t)));
        }
      }
      function gp(t, e, n) {
        const i = n.totalTime,
          r = _p(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == i ? t.totalTime : i,
            !!n.disabled
          ),
          s = t._data;
        return null != s && (r._data = s), r;
      }
      function _p(t, e, n, i, r = "", s = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: i,
          phaseName: r,
          totalTime: s,
          disabled: !!o,
        };
      }
      function yp(t, e, n) {
        let i;
        return (
          t instanceof Map
            ? ((i = t.get(e)), i || t.set(e, (i = n)))
            : ((i = t[e]), i || (i = t[e] = n)),
          i
        );
      }
      function bp(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let vp = (t, e) => !1,
        wp = (t, e) => !1,
        Cp = (t, e, n) => [];
      const Ep = dp();
      (Ep || "undefined" != typeof Element) &&
        ((vp = (t, e) => t.contains(e)),
        (wp = (() => {
          if (Ep || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : wp;
          }
        })()),
        (Cp = (t, e, n) => {
          let i = [];
          if (n) i.push(...t.querySelectorAll(e));
          else {
            const n = t.querySelector(e);
            n && i.push(n);
          }
          return i;
        }));
      let xp = null,
        kp = !1;
      function Sp(t) {
        xp ||
          ((xp = ("undefined" != typeof document ? document.body : null) || {}),
          (kp = !!xp.style && "WebkitAppearance" in xp.style));
        let e = !0;
        return (
          xp.style &&
            !(function (t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in xp.style), !e && kp) &&
            (e =
              "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in xp.style),
          e
        );
      }
      const Ap = wp,
        Tp = vp,
        Op = Cp;
      function Ip(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const i = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[i] = t[n];
          }),
          e
        );
      }
      let Dp = (() => {
          class t {
            validateStyleProperty(t) {
              return Sp(t);
            }
            matchesElement(t, e) {
              return Ap(t, e);
            }
            containsElement(t, e) {
              return Tp(t, e);
            }
            query(t, e, n) {
              return Op(t, e, n);
            }
            computeStyle(t, e, n) {
              return n || "";
            }
            animate(t, e, n, i, r, s = [], o) {
              return new hp(n, i);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Fp = (() => {
          class t {}
          return (t.NOOP = new Dp()), t;
        })();
      function Rp(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Pp(parseFloat(e[1]), e[2]);
      }
      function Pp(t, e) {
        switch (e) {
          case "s":
            return 1e3 * t;
          default:
            return t;
        }
      }
      function Np(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function (t, e, n) {
              let i,
                r = 0,
                s = "";
              if ("string" == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                i = Pp(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (r = Pp(parseFloat(o), n[4]));
                const a = n[5];
                a && (s = a);
              } else i = t;
              if (!n) {
                let n = !1,
                  s = e.length;
                i < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  r < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    e.splice(
                      s,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: i, delay: r, easing: s };
            })(t, e, n);
      }
      function Mp(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function Lp(t, e, n = {}) {
        if (e) for (let i in t) n[i] = t[i];
        else Mp(t, n);
        return n;
      }
      function Vp(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function Bp(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const i = t.style.item(n);
          e += Vp(0, i, t.style.getPropertyValue(i));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += Vp(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              t.style[n]
            ));
        t.setAttribute("style", e);
      }
      function jp(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((i) => {
            const r = Kp(i);
            n && !n.hasOwnProperty(i) && (n[i] = t.style[r]),
              (t.style[r] = e[i]);
          }),
          dp() && Bp(t));
      }
      function Hp(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = Kp(e);
            t.style[n] = "";
          }),
          dp() && Bp(t));
      }
      function zp(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : sp(t)) : t;
      }
      const qp = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function $p(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = qp.exec(t)); ) e.push(n[1]);
          qp.lastIndex = 0;
        }
        return e;
      }
      function Up(t, e, n) {
        const i = t.toString(),
          r = i.replace(qp, (t, i) => {
            let r = e[i];
            return (
              e.hasOwnProperty(i) ||
                (n.push(`Please provide a value for the animation param ${i}`),
                (r = "")),
              r.toString()
            );
          });
        return r == i ? t : r;
      }
      function Wp(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const Gp = /-+([a-z0-9])/g;
      function Kp(t) {
        return t.replace(Gp, (...t) => t[1].toUpperCase());
      }
      function Zp(t, e) {
        return 0 === t || 0 === e;
      }
      function Qp(t, e, n) {
        const i = Object.keys(n);
        if (i.length && e.length) {
          let s = e[0],
            o = [];
          if (
            (i.forEach((t) => {
              s.hasOwnProperty(t) || o.push(t), (s[t] = n[t]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let n = e[r];
              o.forEach(function (e) {
                n[e] = Xp(t, e);
              });
            }
        }
        return e;
      }
      function Yp(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function Xp(t, e) {
        return window.getComputedStyle(t)[e];
      }
      function Jp(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((t) =>
                (function (t, e, n) {
                  if (":" == t[0]) {
                    const i = (function (t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ":decrement":
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof i) return void e.push(i);
                    t = i;
                  }
                  const i = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const r = i[1],
                    s = i[2],
                    o = i[3];
                  e.push(nf(r, o)),
                    "<" != s[0] || ("*" == r && "*" == o) || e.push(nf(o, r));
                })(t, n, e)
              )
            : n.push(t),
          n
        );
      }
      const tf = new Set(["true", "1"]),
        ef = new Set(["false", "0"]);
      function nf(t, e) {
        const n = tf.has(t) || ef.has(t),
          i = tf.has(e) || ef.has(e);
        return (r, s) => {
          let o = "*" == t || t == r,
            a = "*" == e || e == s;
          return (
            !o && n && "boolean" == typeof r && (o = r ? tf.has(t) : ef.has(t)),
            !a && i && "boolean" == typeof s && (a = s ? tf.has(e) : ef.has(e)),
            o && a
          );
        };
      }
      const rf = new RegExp("s*:selfs*,?", "g");
      function sf(t, e, n) {
        return new of(t).build(e, n);
      }
      class of {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new af(e);
          return this._resetContextStyleTimingState(n), Yp(this, zp(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = {}),
            (t.collectedStyles[""] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            i = (e.depCount = 0);
          const r = [],
            s = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach((t) => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  i = n.name;
                i
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((t) => {
                    (n.name = t), r.push(this.visitState(n, e));
                  }),
                  (n.name = i);
              } else if (1 == t.type) {
                const r = this.visitTransition(t, e);
                (n += r.queryCount), (i += r.depCount), s.push(r);
              } else
                e.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: t.name,
              states: r,
              transitions: s,
              queryCount: n,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            i = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const r = new Set(),
              s = i || {};
            if (
              (n.styles.forEach((t) => {
                if (lf(t)) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    $p(e[t]).forEach((t) => {
                      s.hasOwnProperty(t) || r.add(t);
                    });
                  });
                }
              }),
              r.size)
            ) {
              const n = Wp(r.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = Yp(this, zp(t.animation), e);
          return {
            type: 1,
            matchers: Jp(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: cf(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((t) => Yp(this, t, e)),
            options: cf(t.options),
          };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let i = 0;
          const r = t.steps.map((t) => {
            e.currentTime = n;
            const r = Yp(this, t, e);
            return (i = Math.max(i, e.currentTime)), r;
          });
          return (
            (e.currentTime = i), { type: 3, steps: r, options: cf(t.options) }
          );
        }
        visitAnimate(t, e) {
          const n = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return hf(Np(t, e).duration, 0, "");
            const i = t;
            if (
              i
                .split(/\s+/)
                .some((t) => "{" == t.charAt(0) && "{" == t.charAt(1))
            ) {
              const t = hf(0, 0, "");
              return (t.dynamic = !0), (t.strValue = i), t;
            }
            return (n = n || Np(i, e)), hf(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let i;
          e.currentAnimateTimings = n;
          let r = t.styles ? t.styles : op({});
          if (5 == r.type) i = this.visitKeyframes(r, e);
          else {
            let r = t.styles,
              s = !1;
            if (!r) {
              s = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (r = op(t));
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(r, e);
            (o.isEmptyStep = s), (i = o);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: n, style: i, options: null }
          );
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((t) => {
                "string" == typeof t
                  ? "*" == t
                    ? n.push(t)
                    : e.errors.push(
                        `The provided style string value ${t} is not allowed.`
                      )
                  : n.push(t);
              })
            : n.push(t.styles);
          let i = !1,
            r = null;
          return (
            n.forEach((t) => {
              if (lf(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((r = n), delete e.easing), !i))
                  for (let t in e)
                    if (e[t].toString().indexOf("{{") >= 0) {
                      i = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: r,
              offset: t.offset,
              containsDynamicStyles: i,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let i = e.currentTime,
            r = e.currentTime;
          n && r > 0 && (r -= n.duration + n.delay),
            t.styles.forEach((t) => {
              "string" != typeof t &&
                Object.keys(t).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const s = e.collectedStyles[e.currentQuerySelector],
                    o = s[n];
                  let a = !0;
                  o &&
                    (r != i &&
                      r >= o.startTime &&
                      i <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${r}ms" and "${i}ms"`
                      ),
                      (a = !1)),
                    (r = o.startTime)),
                    a && (s[n] = { startTime: r, endTime: i }),
                    e.options &&
                      (function (t, e, n) {
                        const i = e.params || {},
                          r = $p(t);
                        r.length &&
                          r.forEach((t) => {
                            i.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let i = 0;
          const r = [];
          let s = !1,
            o = !1,
            a = 0;
          const l = t.steps.map((t) => {
            const n = this._makeStyleAst(t, e);
            let l =
                null != n.offset
                  ? n.offset
                  : (function (t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((t) => {
                          if (lf(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (lf(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              c = 0;
            return (
              null != l && (i++, (c = n.offset = l)),
              (o = o || c < 0 || c > 1),
              (s = s || c < a),
              (a = c),
              r.push(c),
              n
            );
          });
          o &&
            e.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            s &&
              e.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const c = t.steps.length;
          let h = 0;
          i > 0 && i < c
            ? e.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == i && (h = 1 / (c - 1));
          const u = c - 1,
            d = e.currentTime,
            p = e.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((t, i) => {
              const s = h > 0 ? (i == u ? 1 : h * i) : r[i],
                o = s * f;
              (e.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = s),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Yp(this, zp(t.animation), e),
            options: cf(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: cf(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: cf(t.options),
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            i = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [r, s] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (t = t.replace(rf, "")),
              [
                (t = t
                  .replace(/@\*/g, ".ng-trigger")
                  .replace(/@\w+/g, (t) => ".ng-trigger-" + t.substr(1))
                  .replace(/:animating/g, ".ng-animating")),
                e,
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + " " + r : r),
            yp(e.collectedStyles, e.currentQuerySelector, {});
          const o = Yp(this, zp(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: r,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: s,
              animation: o,
              originalSelector: t.selector,
              options: cf(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Np(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Yp(this, zp(t.animation), e),
            timings: n,
            options: null,
          };
        }
      }
      class af {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function lf(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function cf(t) {
        var e;
        return (
          t
            ? (t = Mp(t)).params && (t.params = (e = t.params) ? Mp(e) : null)
            : (t = {}),
          t
        );
      }
      function hf(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function uf(t, e, n, i, r, s, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: i,
          duration: r,
          delay: s,
          totalTime: r + s,
          easing: o,
          subTimeline: a,
        };
      }
      class df {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const pf = new RegExp(":enter", "g"),
        ff = new RegExp(":leave", "g");
      function mf(t, e, n, i, r, s = {}, o = {}, a, l, c = []) {
        return new gf().buildKeyframes(t, e, n, i, r, s, o, a, l, c);
      }
      class gf {
        buildKeyframes(t, e, n, i, r, s, o, a, l, c = []) {
          l = l || new df();
          const h = new yf(t, e, l, i, r, c, []);
          (h.options = a),
            h.currentTimeline.setStyles([s], null, h.errors, a),
            Yp(this, n, h);
          const u = h.timelines.filter((t) => t.containsAnimation());
          if (u.length && Object.keys(o).length) {
            const t = u[u.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, h.errors, a);
          }
          return u.length
            ? u.map((t) => t.buildKeyframes())
            : [uf(e, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const i = e.createSubContext(t.options),
              r = e.currentTimeline.currentTime,
              s = this._visitSubInstructions(n, i, i.options);
            r != s && e.transformIntoNewTimeline(s);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let i = e.currentTimeline.currentTime;
          const r = null != n.duration ? Rp(n.duration) : null,
            s = null != n.delay ? Rp(n.delay) : null;
          return (
            0 !== r &&
              t.forEach((t) => {
                const n = e.appendInstructionToTimeline(t, r, s);
                i = Math.max(i, n.duration + n.delay);
              }),
            i
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            Yp(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let i = e;
          const r = t.options;
          if (
            r &&
            (r.params || r.delay) &&
            ((i = e.createSubContext(r)),
            i.transformIntoNewTimeline(),
            null != r.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = _f));
            const t = Rp(r.delay);
            i.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach((t) => Yp(this, t, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > n && i.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let i = e.currentTimeline.currentTime;
          const r = t.options && t.options.delay ? Rp(t.options.delay) : 0;
          t.steps.forEach((s) => {
            const o = e.createSubContext(t.options);
            r && o.delayNextStep(r),
              Yp(this, s, o),
              (i = Math.max(i, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((t) => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(i),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return Np(e.params ? Up(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            i = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), i.snapshotCurrentStyles());
          const r = t.style;
          5 == r.type
            ? this.visitKeyframes(r, e)
            : (e.incrementTime(n.duration),
              this.visitStyle(r, e),
              i.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            i = e.currentAnimateTimings;
          !i && n.getCurrentStyleProperties().length && n.forwardFrame();
          const r = (i && i.easing) || t.easing;
          t.isEmptyStep
            ? n.applyEmptyStep(r)
            : n.setStyles(t.styles, r, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            i = e.currentTimeline.duration,
            r = n.duration,
            s = e.createSubContext().currentTimeline;
          (s.easing = n.easing),
            t.styles.forEach((t) => {
              s.forwardTime((t.offset || 0) * r),
                s.setStyles(t.styles, t.easing, e.errors, e.options),
                s.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(s),
            e.transformIntoNewTimeline(i + r),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            i = t.options || {},
            r = i.delay ? Rp(i.delay) : 0;
          r &&
            (6 === e.previousNode.type ||
              (0 == n &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = _f));
          let s = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!i.optional,
            e.errors
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, i) => {
            e.currentQueryIndex = i;
            const o = e.createSubContext(t.options, n);
            r && o.delayNextStep(r),
              n === e.element && (a = o.currentTimeline),
              Yp(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(s),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            i = e.currentTimeline,
            r = t.timings,
            s = Math.abs(r.duration),
            o = s * (e.currentQueryTotal - 1);
          let a = s * e.currentQueryIndex;
          switch (r.duration < 0 ? "reverse" : r.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime;
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          Yp(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              i.currentTime - c + (i.startTime - n.currentTimeline.startTime));
        }
      }
      const _f = {};
      class yf {
        constructor(t, e, n, i, r, s, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = i),
            (this._leaveClassName = r),
            (this.errors = s),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = _f),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new bf(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let i = this.options;
          null != n.duration && (i.duration = Rp(n.duration)),
            null != n.delay && (i.delay = Rp(n.delay));
          const r = n.params;
          if (r) {
            let t = i.params;
            t || (t = this.options.params = {}),
              Object.keys(r).forEach((n) => {
                (e && t.hasOwnProperty(n)) || (t[n] = Up(r[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach((t) => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const i = e || this.element,
            r = new yf(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, n || 0)
            );
          return (
            (r.previousNode = this.previousNode),
            (r.currentAnimateTimings = this.currentAnimateTimings),
            (r.options = this._copyOptions()),
            r.updateOptions(t),
            (r.currentQueryIndex = this.currentQueryIndex),
            (r.currentQueryTotal = this.currentQueryTotal),
            (r.parentContext = this),
            this.subContextCount++,
            r
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = _f),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const i = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                t.delay,
              easing: "",
            },
            r = new vf(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              i,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(r), i;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, i, r, s) {
          let o = [];
          if ((i && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(pf, "." + this._enterClassName)).replace(
              ff,
              "." + this._leaveClassName
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n &&
              (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
              o.push(...e);
          }
          return (
            r ||
              0 != o.length ||
              s.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class bf {
        constructor(t, e, n, i) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              e
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new bf(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || "*"),
                (this._currentKeyframe[t] = "*");
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, i) {
          e && (this._previousKeyframe.easing = e);
          const r = (i && i.params) || {},
            s = (function (t, e) {
              const n = {};
              let i;
              return (
                t.forEach((t) => {
                  "*" === t
                    ? ((i = i || Object.keys(e)),
                      i.forEach((t) => {
                        n[t] = "*";
                      }))
                    : Lp(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(s).forEach((t) => {
            const e = Up(s[t], r, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(
                  t
                )
                  ? this._globalTimelineStyles[t]
                  : "*"),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((e) => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach((t) => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const n = this._styleSummary[e],
              i = t._styleSummary[e];
            (!n || i.time > n.time) && this._updateStyle(e, i.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((r, s) => {
            const o = Lp(r, !0);
            Object.keys(o).forEach((n) => {
              const i = o[n];
              "!" == i ? t.add(n) : "*" == i && e.add(n);
            }),
              n || (o.offset = s / this.duration),
              i.push(o);
          });
          const r = t.size ? Wp(t.values()) : [],
            s = e.size ? Wp(e.values()) : [];
          if (n) {
            const t = i[0],
              e = Mp(t);
            (t.offset = 0), (e.offset = 1), (i = [t, e]);
          }
          return uf(
            this.element,
            i,
            r,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class vf extends bf {
        constructor(t, e, n, i, r, s, o = !1) {
          super(t, e, s.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = i),
            (this.postStyleProps = r),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const r = [],
              s = n + e,
              o = e / s,
              a = Lp(t[0], !1);
            (a.offset = 0), r.push(a);
            const l = Lp(t[0], !1);
            (l.offset = wf(o)), r.push(l);
            const c = t.length - 1;
            for (let i = 1; i <= c; i++) {
              let o = Lp(t[i], !1);
              (o.offset = wf((e + o.offset * n) / s)), r.push(o);
            }
            (n = s), (e = 0), (i = ""), (t = r);
          }
          return uf(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            n,
            e,
            i,
            !0
          );
        }
      }
      function wf(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Cf {}
      class Ef extends Cf {
        normalizePropertyName(t, e) {
          return Kp(t);
        }
        normalizeStyleValue(t, e, n, i) {
          let r = "";
          const s = n.toString().trim();
          if (xf[e] && 0 !== n && "0" !== n)
            if ("number" == typeof n) r = "px";
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                i.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return s + r;
        }
      }
      const xf = (() =>
        (function (t) {
          const e = {};
          return t.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function kf(t, e, n, i, r, s, o, a, l, c, h, u, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: r,
          fromState: n,
          fromStyles: s,
          toState: i,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: h,
          totalTime: u,
          errors: d,
        };
      }
      const Sf = {};
      class Af {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, i) {
          return (function (t, e, n, i, r) {
            return t.some((t) => t(e, n, i, r));
          })(this.ast.matchers, t, e, n, i);
        }
        buildStyles(t, e, n) {
          const i = this._stateStyles["*"],
            r = this._stateStyles[t],
            s = i ? i.buildStyles(e, n) : {};
          return r ? r.buildStyles(e, n) : s;
        }
        build(t, e, n, i, r, s, o, a, l, c) {
          const h = [],
            u = (this.ast.options && this.ast.options.params) || Sf,
            d = this.buildStyles(n, (o && o.params) || Sf, h),
            p = (a && a.params) || Sf,
            f = this.buildStyles(i, p, h),
            m = new Set(),
            g = new Map(),
            _ = new Map(),
            y = "void" === i,
            b = { params: Object.assign(Object.assign({}, u), p) },
            v = c ? [] : mf(t, e, this.ast.animation, r, s, d, f, b, l, h);
          let w = 0;
          if (
            (v.forEach((t) => {
              w = Math.max(t.duration + t.delay, w);
            }),
            h.length)
          )
            return kf(e, this._triggerName, n, i, y, d, f, [], [], g, _, w, h);
          v.forEach((t) => {
            const n = t.element,
              i = yp(g, n, {});
            t.preStyleProps.forEach((t) => (i[t] = !0));
            const r = yp(_, n, {});
            t.postStyleProps.forEach((t) => (r[t] = !0)), n !== e && m.add(n);
          });
          const C = Wp(m.values());
          return kf(e, this._triggerName, n, i, y, d, f, v, C, g, _, w);
        }
      }
      class Tf {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            i = Mp(this.defaultParams);
          return (
            Object.keys(t).forEach((e) => {
              const n = t[e];
              null != n && (i[e] = n);
            }),
            this.styles.styles.forEach((t) => {
              if ("string" != typeof t) {
                const r = t;
                Object.keys(r).forEach((t) => {
                  let s = r[t];
                  s.length > 1 && (s = Up(s, i, e)), (n[t] = s);
                });
              }
            }),
            n
          );
        }
      }
      class Of {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((t) => {
              this.states[t.name] = new Tf(
                t.style,
                (t.options && t.options.params) || {}
              );
            }),
            If(this.states, "true", "1"),
            If(this.states, "false", "0"),
            e.transitions.forEach((e) => {
              this.transitionFactories.push(new Af(t, e, this.states));
            }),
            (this.fallbackTransition = new Af(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, i) {
          return (
            this.transitionFactories.find((r) => r.match(t, e, n, i)) || null
          );
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function If(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const Df = new df();
      class Ff {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            i = sf(this._driver, e, n);
          if (n.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${n.join(
                "\n"
              )}`
            );
          this._animations[t] = i;
        }
        _buildPlayer(t, e, n) {
          const i = t.element,
            r = fp(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(
            i,
            r,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, n = {}) {
          const i = [],
            r = this._animations[t];
          let s;
          const o = new Map();
          if (
            (r
              ? ((s = mf(
                  this._driver,
                  e,
                  r,
                  "ng-enter",
                  "ng-leave",
                  {},
                  {},
                  n,
                  Df,
                  i
                )),
                s.forEach((t) => {
                  const e = yp(o, t.element, {});
                  t.postStyleProps.forEach((t) => (e[t] = null));
                }))
              : (i.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (s = [])),
            i.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${i.join(
                "\n"
              )}`
            );
          o.forEach((t, e) => {
            Object.keys(t).forEach((n) => {
              t[n] = this._driver.computeStyle(e, n, "*");
            });
          });
          const a = pp(
            s.map((t) => {
              const e = o.get(t.element);
              return this._buildPlayer(t, {}, e);
            })
          );
          return (
            (this._playersById[t] = a),
            a.onDestroy(() => this.destroy(t)),
            this.players.push(a),
            a
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              `Unable to find the timeline player referenced by ${t}`
            );
          return e;
        }
        listen(t, e, n, i) {
          const r = _p(e, "", "", "");
          return mp(this._getPlayer(t), n, r, i), () => {};
        }
        command(t, e, n, i) {
          if ("register" == n) return void this.register(t, i[0]);
          if ("create" == n) return void this.create(t, e, i[0] || {});
          const r = this._getPlayer(t);
          switch (n) {
            case "play":
              r.play();
              break;
            case "pause":
              r.pause();
              break;
            case "reset":
              r.reset();
              break;
            case "restart":
              r.restart();
              break;
            case "finish":
              r.finish();
              break;
            case "init":
              r.init();
              break;
            case "setPosition":
              r.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const Rf = [],
        Pf = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Nf = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class Mf {
        constructor(t, e = "") {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty("value");
          if (((this.value = null != (i = n ? t.value : t) ? i : null), n)) {
            const e = Mp(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var i;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach((n) => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const Lf = new Mf("void");
      class Vf {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            Uf(e, this._hostClassName);
        }
        listen(t, e, n, i) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if ("start" != (r = n) && "done" != r)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
            );
          var r;
          const s = yp(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: i };
          s.push(o);
          const a = yp(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (Uf(t, "ng-trigger"), Uf(t, "ng-trigger-" + e), (a[e] = Lf)),
            () => {
              this._engine.afterFlush(() => {
                const t = s.indexOf(o);
                t >= 0 && s.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, n, i = !0) {
          const r = this._getTrigger(e),
            s = new jf(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (Uf(t, "ng-trigger"),
            Uf(t, "ng-trigger-" + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const l = new Mf(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              a &&
              l.absorbOptions(a.options),
            (o[e] = l),
            a || (a = Lf),
            "void" !== l.value && a.value === l.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  i = Object.keys(e);
                if (n.length != i.length) return !1;
                for (let r = 0; r < n.length; r++) {
                  const i = n[r];
                  if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const e = [],
                n = r.matchStyles(a.value, a.params, e),
                i = r.matchStyles(l.value, l.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    Hp(t, n), jp(t, i);
                  });
            }
            return;
          }
          const c = yp(this._engine.playersByElement, t, []);
          c.forEach((t) => {
            t.namespaceId == this.id &&
              t.triggerName == e &&
              t.queued &&
              t.destroy();
          });
          let h = r.matchTransition(a.value, l.value, t, l.params),
            u = !1;
          if (!h) {
            if (!i) return;
            (h = r.fallbackTransition), (u = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: h,
              fromState: a,
              toState: l,
              player: s,
              isFallbackTransition: u,
            }),
            u ||
              (Uf(t, "ng-animate-queued"),
              s.onStart(() => {
                Wf(t, "ng-animate-queued");
              })),
            s.onDone(() => {
              let e = this.players.indexOf(s);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(s);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(s),
            c.push(s),
            s
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(
                n,
                e.filter((e) => e.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((t) => t.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, ".ng-trigger", !0);
          n.forEach((t) => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((t) => this.clearElementCache(t))
            );
        }
        triggerLeaveAnimation(t, e, n, i) {
          const r = this._engine.statesByElement.get(t);
          if (r) {
            const s = [];
            if (
              (Object.keys(r).forEach((e) => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, "void", i);
                  n && s.push(n);
                }
              }),
              s.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && pp(s).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t);
          if (e) {
            const n = new Set();
            e.forEach((e) => {
              const i = e.name;
              if (n.has(i)) return;
              n.add(i);
              const r = this._triggers[i].fallbackTransition,
                s = this._engine.statesByElement.get(t)[i] || Lf,
                o = new Mf("void"),
                a = new jf(this.id, i, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: i,
                  transition: r,
                  fromState: s,
                  toState: o,
                  player: a,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let i = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) i = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), i))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const i = t.__ng_removed;
            (i && i !== Pf) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          Uf(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((n) => {
              const i = n.player;
              if (i.destroyed) return;
              const r = n.element,
                s = this._elementListeners.get(r);
              s &&
                s.forEach((e) => {
                  if (e.name == n.triggerName) {
                    const i = _p(
                      r,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (i._data = t), mp(n.player, e.phase, i, e.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                i = e.transition.ast.depCount;
              return 0 == n || 0 == i
                ? n - i
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((e) => e.element === t) || e),
            e
          );
        }
      }
      class Bf {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((e) => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new Vf(t, e, this);
          return (
            e.parentNode
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let i = !1;
            for (let r = n; r >= 0; r--)
              if (
                this.driver.containsElement(
                  this._namespaceList[r].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(r + 1, 0, t), (i = !0);
                break;
              }
            i || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let i = this._namespaceLookup[t];
          i && i.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let i = 0; i < t.length; i++) {
              const r = n[t[i]].namespaceId;
              if (r) {
                const t = this._fetchNamespace(r);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, i) {
          if (Hf(e)) {
            const r = this._fetchNamespace(t);
            if (r) return r.trigger(e, n, i), !0;
          }
          return !1;
        }
        insertNode(t, e, n, i) {
          if (!Hf(e)) return;
          const r = e.__ng_removed;
          if (r && r.setForRemoval) {
            (r.setForRemoval = !1), (r.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const i = this._fetchNamespace(t);
            i && i.insertNode(e, n);
          }
          i && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), Uf(t, "ng-animate-disabled"))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), Wf(t, "ng-animate-disabled"));
        }
        removeNode(t, e, n, i) {
          if (Hf(e)) {
            const r = t ? this._fetchNamespace(t) : null;
            if (
              (r ? r.removeNode(e, i) : this.markElementAsRemoved(t, e, !1, i),
              n)
            ) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, i);
            }
          } else this._onRemovalComplete(e, i);
        }
        markElementAsRemoved(t, e, n, i) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: i,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(t, e, n, i, r) {
          return Hf(e) ? this._fetchNamespace(t).listen(e, n, i, r) : () => {};
        }
        _buildInstruction(t, e, n, i, r) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            i,
            t.fromState.options,
            t.toState.options,
            e,
            r
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, ".ng-trigger", !0);
          e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, ".ng-animating", !0)),
              e.forEach((t) => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((t) => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((t) => t.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return pp(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = Pf), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, ".ng-animate-disabled") &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((t) => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) =>
                this._balanceNamespaceList(t, e)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              Uf(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((t) => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? pp(e).onDone(() => {
                    t.forEach((t) => t());
                  })
                : t.forEach((t) => t());
          }
        }
        reportError(t) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${t.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(t, e) {
          const n = new df(),
            i = [],
            r = new Map(),
            s = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            c = new Set();
          this.disabledNodes.forEach((t) => {
            c.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) c.add(e[n]);
          });
          const h = this.bodyNode,
            u = Array.from(this.statesByElement.keys()),
            d = $f(u, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((t, e) => {
            const n = "ng-enter" + f++;
            p.set(e, n), t.forEach((t) => Uf(t, n));
          });
          const m = [],
            g = new Set(),
            _ = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const t = this.collectedLeaveElements[I],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (m.push(t),
              g.add(t),
              e.hasAnimation
                ? this.driver
                    .query(t, ".ng-star-inserted", !0)
                    .forEach((t) => g.add(t))
                : _.add(t));
          }
          const y = new Map(),
            b = $f(u, Array.from(g));
          b.forEach((t, e) => {
            const n = "ng-leave" + f++;
            y.set(e, n), t.forEach((t) => Uf(t, n));
          }),
            t.push(() => {
              d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach((t) => Wf(t, n));
              }),
                b.forEach((t, e) => {
                  const n = y.get(e);
                  t.forEach((t) => Wf(t, n));
                }),
                m.forEach((t) => {
                  this.processLeaveNode(t);
                });
            });
          const v = [],
            w = [];
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(e).forEach((t) => {
              const e = t.player,
                r = t.element;
              if ((v.push(e), this.collectedEnterElements.length)) {
                const t = r.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const c = !h || !this.driver.containsElement(h, r),
                u = y.get(r),
                d = p.get(r),
                f = this._buildInstruction(t, n, d, u, c);
              if (!f.errors || !f.errors.length)
                return c || t.isFallbackTransition
                  ? (e.onStart(() => Hp(r, f.fromStyles)),
                    e.onDestroy(() => jp(r, f.toStyles)),
                    void i.push(e))
                  : (f.timelines.forEach(
                      (t) => (t.stretchStartingKeyframe = !0)
                    ),
                    n.append(r, f.timelines),
                    s.push({ instruction: f, player: e, element: r }),
                    f.queriedElements.forEach((t) => yp(o, t, []).push(e)),
                    f.preStyleProps.forEach((t, e) => {
                      const n = Object.keys(t);
                      if (n.length) {
                        let t = a.get(e);
                        t || a.set(e, (t = new Set())),
                          n.forEach((e) => t.add(e));
                      }
                    }),
                    void f.postStyleProps.forEach((t, e) => {
                      const n = Object.keys(t);
                      let i = l.get(e);
                      i || l.set(e, (i = new Set())),
                        n.forEach((t) => i.add(t));
                    }));
              w.push(f);
            });
          if (w.length) {
            const t = [];
            w.forEach((e) => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach((e) => t.push(`- ${e}\n`));
            }),
              v.forEach((t) => t.destroy()),
              this.reportError(t);
          }
          const C = new Map(),
            E = new Map();
          s.forEach((t) => {
            const e = t.element;
            n.has(e) &&
              (E.set(e, e),
              this._beforeAnimationBuild(
                t.player.namespaceId,
                t.instruction,
                C
              ));
          }),
            i.forEach((t) => {
              const e = t.element;
              this._getPreviousPlayers(
                e,
                !1,
                t.namespaceId,
                t.triggerName,
                null
              ).forEach((t) => {
                yp(C, e, []).push(t), t.destroy();
              });
            });
          const x = m.filter((t) => Kf(t, a, l)),
            k = new Map();
          qf(k, this.driver, _, l, "*").forEach((t) => {
            Kf(t, a, l) && x.push(t);
          });
          const S = new Map();
          d.forEach((t, e) => {
            qf(S, this.driver, new Set(t), a, "!");
          }),
            x.forEach((t) => {
              const e = k.get(t),
                n = S.get(t);
              k.set(t, Object.assign(Object.assign({}, e), n));
            });
          const A = [],
            T = [],
            O = {};
          s.forEach((t) => {
            const { element: e, player: s, instruction: o } = t;
            if (n.has(e)) {
              if (c.has(e))
                return (
                  s.onDestroy(() => jp(e, o.toStyles)),
                  (s.disabled = !0),
                  s.overrideTotalTime(o.totalTime),
                  void i.push(s)
                );
              let t = O;
              if (E.size > 1) {
                let n = e;
                const i = [];
                for (; (n = n.parentNode); ) {
                  const e = E.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  i.push(n);
                }
                i.forEach((e) => E.set(e, t));
              }
              const n = this._buildAnimation(s.namespaceId, o, C, r, S, k);
              if ((s.setRealPlayer(n), t === O)) A.push(s);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (s.parentPlayer = pp(e)), i.push(s);
              }
            } else
              Hp(e, o.fromStyles),
                s.onDestroy(() => jp(e, o.toStyles)),
                T.push(s),
                c.has(e) && i.push(s);
          }),
            T.forEach((t) => {
              const e = r.get(t.element);
              if (e && e.length) {
                const n = pp(e);
                t.setRealPlayer(n);
              }
            }),
            i.forEach((t) => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let I = 0; I < m.length; I++) {
            const t = m[I],
              e = t.__ng_removed;
            if ((Wf(t, "ng-leave"), e && e.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let i = this.driver.query(t, ".ng-animating", !0);
              for (let t = 0; t < i.length; t++) {
                let e = o.get(i[t]);
                e && e.length && n.push(...e);
              }
            }
            const i = n.filter((t) => !t.destroyed);
            i.length ? Gf(this, t, i) : this.processLeaveNode(t);
          }
          return (
            (m.length = 0),
            A.forEach((t) => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            A
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const i = e.__ng_removed;
          return (
            i && i.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, i, r) {
          let s = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (s = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !r || "void" == r;
              e.forEach((e) => {
                e.queued || ((t || e.triggerName == i) && s.push(e));
              });
            }
          }
          return (
            (n || i) &&
              (s = s.filter(
                (t) => !((n && n != t.namespaceId) || (i && i != t.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const i = e.element,
            r = e.isRemovalTransition ? void 0 : t,
            s = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== i,
              l = yp(n, t, []);
            this._getPreviousPlayers(t, a, r, s, e.toState).forEach((t) => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
            });
          }
          Hp(i, e.fromStyles);
        }
        _buildAnimation(t, e, n, i, r, s) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            c = new Set(),
            h = new Set(),
            u = e.timelines.map((e) => {
              const u = e.element;
              c.add(u);
              const d = u.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new hp(e.duration, e.delay);
              const p = u !== a,
                f = (function (t) {
                  const e = [];
                  return (
                    (function t(e, n) {
                      for (let i = 0; i < e.length; i++) {
                        const r = e[i];
                        r instanceof up ? t(r.players, n) : n.push(r);
                      }
                    })(t, e),
                    e
                  );
                })((n.get(u) || Rf).map((t) => t.getRealPlayer())).filter(
                  (t) => !!t.element && t.element === u
                ),
                m = r.get(u),
                g = s.get(u),
                _ = fp(0, this._normalizer, 0, e.keyframes, m, g),
                y = this._buildPlayer(e, _, f);
              if ((e.subTimeline && i && h.add(u), p)) {
                const e = new jf(t, o, u);
                e.setRealPlayer(y), l.push(e);
              }
              return y;
            });
          l.forEach((t) => {
            yp(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function (t, e, n) {
                  let i;
                  if (t instanceof Map) {
                    if (((i = t.get(e)), i)) {
                      if (i.length) {
                        const t = i.indexOf(n);
                        i.splice(t, 1);
                      }
                      0 == i.length && t.delete(e);
                    }
                  } else if (((i = t[e]), i)) {
                    if (i.length) {
                      const t = i.indexOf(n);
                      i.splice(t, 1);
                    }
                    0 == i.length && delete t[e];
                  }
                  return i;
                })(this.playersByQueriedElement, t.element, t)
              );
          }),
            c.forEach((t) => Uf(t, "ng-animating"));
          const d = pp(u);
          return (
            d.onDestroy(() => {
              c.forEach((t) => Wf(t, "ng-animating")), jp(a, e.toStyles);
            }),
            h.forEach((t) => {
              yp(i, t, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                n
              )
            : new hp(t.duration, t.delay);
        }
      }
      class jf {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new hp()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((n) => mp(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          yp(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Hf(t) {
        return t && 1 === t.nodeType;
      }
      function zf(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function qf(t, e, n, i, r) {
        const s = [];
        n.forEach((t) => s.push(zf(t)));
        const o = [];
        i.forEach((n, i) => {
          const s = {};
          n.forEach((t) => {
            const n = (s[t] = e.computeStyle(i, t, r));
            (n && 0 != n.length) || ((i.__ng_removed = Nf), o.push(i));
          }),
            t.set(i, s);
        });
        let a = 0;
        return n.forEach((t) => zf(t, s[a++])), o;
      }
      function $f(t, e) {
        const n = new Map();
        if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
        const i = new Set(e),
          r = new Map();
        return (
          e.forEach((t) => {
            const e = (function t(e) {
              if (!e) return 1;
              let s = r.get(e);
              if (s) return s;
              const o = e.parentNode;
              return (s = n.has(o) ? o : i.has(o) ? 1 : t(o)), r.set(e, s), s;
            })(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function Uf(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function Wf(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function Gf(t, e, n) {
        pp(n).onDone(() => t.processLeaveNode(e));
      }
      function Kf(t, e, n) {
        const i = n.get(t);
        if (!i) return !1;
        let r = e.get(t);
        return r ? i.forEach((t) => r.add(t)) : e.set(t, i), n.delete(t), !0;
      }
      class Zf {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new Bf(t, e, n)),
            (this._timelineEngine = new Ff(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) =>
              this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, i, r) {
          const s = t + "-" + i;
          let o = this._triggerCache[s];
          if (!o) {
            const t = [],
              e = sf(this._driver, r, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${i}" has failed to build due to the following errors:\n - ${t.join(
                  "\n - "
                )}`
              );
            (o = (function (t, e) {
              return new Of(t, e);
            })(i, e)),
              (this._triggerCache[s] = o);
          }
          this._transitionEngine.registerTrigger(e, i, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, i) {
          this._transitionEngine.insertNode(t, e, n, i);
        }
        onRemove(t, e, n, i) {
          this._transitionEngine.removeNode(t, e, i || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, i) {
          if ("@" == n.charAt(0)) {
            const [t, r] = bp(n);
            this._timelineEngine.command(t, e, r, i);
          } else this._transitionEngine.trigger(t, e, n, i);
        }
        listen(t, e, n, i, r) {
          if ("@" == n.charAt(0)) {
            const [t, i] = bp(n);
            return this._timelineEngine.listen(t, e, i, r);
          }
          return this._transitionEngine.listen(t, e, n, i, r);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Qf(t, e) {
        let n = null,
          i = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = Xf(e[0])), e.length > 1 && (i = Xf(e[e.length - 1])))
            : e && (n = Xf(e)),
          n || i ? new Yf(t, n, i) : null
        );
      }
      let Yf = (() => {
        class t {
          constructor(e, n, i) {
            (this._element = e),
              (this._startStyles = n),
              (this._endStyles = i),
              (this._state = 0);
            let r = t.initialStylesByElement.get(e);
            r || t.initialStylesByElement.set(e, (r = {})),
              (this._initialStyles = r);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                jp(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (jp(this._element, this._initialStyles),
                this._endStyles &&
                  (jp(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Hp(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Hp(this._element, this._endStyles),
                  (this._endStyles = null)),
                jp(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function Xf(t) {
        let e = null;
        const n = Object.keys(t);
        for (let i = 0; i < n.length; i++) {
          const r = n[i];
          Jf(r) && ((e = e || {}), (e[r] = t[r]));
        }
        return e;
      }
      function Jf(t) {
        return "display" === t || "position" === t;
      }
      class tm {
        constructor(t, e, n, i, r, s, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = i),
            (this._easing = r),
            (this._fillMode = s),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (t) => this._handleCallback(t));
        }
        apply() {
          !(function (t, e) {
            const n = om(t, "").trim();
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let i = 0; i < t.length; i++) "," === t.charAt(i) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              sm(t, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            rm(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          em(this._element, this._name, "paused");
        }
        resume() {
          em(this._element, this._name, "running");
        }
        setPosition(t) {
          const e = nm(this._element, this._name);
          (this._position = t * this._duration),
            sm(this._element, "Delay", `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            rm(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const n = om(t, "").split(","),
                i = im(n, e);
              i >= 0 && (n.splice(i, 1), sm(t, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function em(t, e, n) {
        sm(t, "PlayState", n, nm(t, e));
      }
      function nm(t, e) {
        const n = om(t, "");
        return n.indexOf(",") > 0 ? im(n.split(","), e) : im([n], e);
      }
      function im(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function rm(t, e, n) {
        n
          ? t.removeEventListener("animationend", e)
          : t.addEventListener("animationend", e);
      }
      function sm(t, e, n, i) {
        const r = "animation" + e;
        if (null != i) {
          const e = t.style[r];
          if (e.length) {
            const t = e.split(",");
            (t[i] = n), (n = t.join(","));
          }
        }
        t.style[r] = n;
      }
      function om(t, e) {
        return t.style["animation" + e];
      }
      class am {
        constructor(t, e, n, i, r, s, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = i),
            (this._delay = r),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = s || "linear"),
            (this.totalTime = i + r),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new tm(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              "offset" != n &&
                (t[n] = e ? this._finalStyles[n] : Xp(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class lm extends hp {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = Ip(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class cm {
        constructor() {
          (this._count = 0),
            (this._head = document.querySelector("head")),
            (this._warningIssued = !1);
        }
        validateStyleProperty(t) {
          return Sp(t);
        }
        matchesElement(t, e) {
          return Ap(t, e);
        }
        containsElement(t, e) {
          return Tp(t, e);
        }
        query(t, e, n) {
          return Op(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map((t) => Ip(t));
          let i = `@keyframes ${e} {\n`,
            r = "";
          n.forEach((t) => {
            r = " ";
            const e = parseFloat(t.offset);
            (i += `${r}${100 * e}% {\n`),
              (r += " "),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                switch (e) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (i += `${r}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (i += `${r}${e}: ${n};\n`);
                }
              }),
              (i += `${r}}\n`);
          }),
            (i += "}\n");
          const s = document.createElement("style");
          return (s.innerHTML = i), s;
        }
        animate(t, e, n, i, r, s = [], o) {
          o && this._notifyFaultyScrubber();
          const a = s.filter((t) => t instanceof am),
            l = {};
          Zp(n, i) &&
            a.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const c = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((t) => {
                  Object.keys(t).forEach((n) => {
                    "offset" != n && "easing" != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = Qp(t, e, l)));
          if (0 == n) return new lm(t, c);
          const h = `gen_css_kf_${this._count++}`,
            u = this.buildKeyframeElement(t, h, e);
          document.querySelector("head").appendChild(u);
          const d = Qf(t, e),
            p = new am(t, e, h, n, i, r, c, d);
          return (
            p.onDestroy(() => {
              var t;
              (t = u).parentNode.removeChild(t);
            }),
            p
          );
        }
        _notifyFaultyScrubber() {
          this._warningIssued ||
            (console.warn(
              "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
              "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
            ),
            (this._warningIssued = !0));
        }
      }
      class hm {
        constructor(t, e, n, i) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          this.domPlayer.currentTime = t * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((e) => {
              "offset" != e &&
                (t[e] = this._finished
                  ? this._finalKeyframe[e]
                  : Xp(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class um {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            dm().toString()
          )),
            (this._cssKeyframesDriver = new cm());
        }
        validateStyleProperty(t) {
          return Sp(t);
        }
        matchesElement(t, e) {
          return Ap(t, e);
        }
        containsElement(t, e) {
          return Tp(t, e);
        }
        query(t, e, n) {
          return Op(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, i, r, s = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, n, i, r, s);
          const a = {
            duration: n,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          r && (a.easing = r);
          const l = {},
            c = s.filter((t) => t instanceof hm);
          Zp(n, i) &&
            c.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const h = Qf(t, (e = Qp(t, (e = e.map((t) => Lp(t, !1))), l)));
          return new hm(t, e, a, h);
        }
      }
      function dm() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      let pm = (() => {
        class t extends np {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: "0",
                encapsulation: ae.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? sp(t) : t;
            return (
              gm(this._renderer, null, e, "register", [n]),
              new fm(e, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ca), Gt(pc));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class fm extends class {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new mm(this._id, t, e || {}, this._renderer);
        }
      }
      class mm {
        constructor(t, e, n, i) {
          (this.id = t),
            (this.element = e),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return gm(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return 0;
        }
      }
      function gm(t, e, n, i, r) {
        return t.setProperty(e, `@@${n}:${i}`, r);
      }
      let _m = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return (
                t ||
                  ((t = new ym("", n, this.engine)),
                  this._rendererCache.set(n, t)),
                t
              );
            }
            const i = e.id,
              r = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(r, t);
            const s = (e) => {
              Array.isArray(e)
                ? e.forEach(s)
                : this.engine.registerTrigger(i, r, t, e.name, e);
            };
            return e.data.animation.forEach(s), new bm(this, r, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((t) => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ca), Gt(Zf), Gt(Hl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class ym {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (t) => e.destroyNode(t)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n) {
          this.delegate.insertBefore(t, e, n),
            this.engine.onInsert(this.namespaceId, e, t, !0);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, i) {
          this.delegate.setAttribute(t, e, n, i);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, i) {
          this.delegate.setStyle(t, e, n, i);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          "@" == e.charAt(0) && "@.disabled" == e
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class bm extends ym {
        constructor(t, e, n, i) {
          super(e, n, i), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          "@" == e.charAt(0)
            ? "." == e.charAt(1) && "@.disabled" == e
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if ("@" == e.charAt(0)) {
            const i = (function (t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(t);
            let r = e.substr(1),
              s = "";
            return (
              "@" != r.charAt(0) &&
                ([r, s] = (function (t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(r)),
              this.engine.listen(this.namespaceId, i, r, s, (t) => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let vm = (() => {
        class t extends Zf {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(pc), Gt(Fp), Gt(Cf));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const wm = new Lt("AnimationModuleType"),
        Cm = [
          {
            provide: Fp,
            useFactory: function () {
              return "function" == typeof dm() ? new um() : new cm();
            },
          },
          { provide: wm, useValue: "BrowserAnimations" },
          { provide: np, useClass: pm },
          {
            provide: Cf,
            useFactory: function () {
              return new Ef();
            },
          },
          { provide: Zf, useClass: vm },
          {
            provide: ca,
            useFactory: function (t, e, n) {
              return new _m(t, e, n);
            },
            deps: [rh, Zf, Hl],
          },
        ];
      let Em = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ht({
            factory: function (e) {
              return new (e || t)();
            },
            providers: Cm,
            imports: [yh],
          })),
          t
        );
      })();
      const xm = new fa("9.2.1"),
        km = new Lt("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        });
      let Sm,
        Am = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _getDocument() {
              const t = this._document || document;
              return "object" == typeof t && t ? t : null;
            }
            _getWindow() {
              const t = this._getDocument(),
                e = (null == t ? void 0 : t.defaultView) || window;
              return "object" == typeof e && e ? e : null;
            }
            _checksAreEnabled() {
              return di() && !this._isTestEnv();
            }
            _isTestEnv() {
              const t = this._getWindow();
              return t && (t.__karma__ || t.jasmine);
            }
            _checkDoctypeIsDefined() {
              const t =
                  this._checksAreEnabled() &&
                  (!0 === this._sanityChecks || this._sanityChecks.doctype),
                e = this._getDocument();
              t &&
                e &&
                !e.doctype &&
                console.warn(
                  "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
                );
            }
            _checkThemeIsPresent() {
              const t =
                  !this._checksAreEnabled() ||
                  !1 === this._sanityChecks ||
                  !this._sanityChecks.theme,
                e = this._getDocument();
              if (t || !e || !e.body || "function" != typeof getComputedStyle)
                return;
              const n = e.createElement("div");
              n.classList.add("mat-theme-loaded-marker"), e.body.appendChild(n);
              const i = getComputedStyle(n);
              i &&
                "none" !== i.display &&
                console.warn(
                  "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
                ),
                e.body.removeChild(n);
            }
            _checkCdkVersionMatch() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.version) &&
                xm.full !== Jd.full &&
                console.warn(
                  "The Angular Material version (" +
                    xm.full +
                    ") does not match the Angular CDK version (" +
                    Jd.full +
                    ").\nPlease ensure the versions of these two packages exactly match."
                );
            }
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)(Gt(Kd), Gt(km, 8), Gt(pc, 8));
              },
              imports: [[Xd], Xd],
            })),
            t
          );
        })();
      function Tm(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = vd(t);
          }
        };
      }
      function Om(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const n = t || e;
            n !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              n && this._elementRef.nativeElement.classList.add(`mat-${n}`),
              (this._color = n));
          }
        };
      }
      function Im(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = vd(t);
          }
        };
      }
      function Dm(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.errorState = !1), (this.stateChanges = new E());
          }
          updateErrorState() {
            const t = this.errorState,
              e = (
                this.errorStateMatcher || this._defaultErrorStateMatcher
              ).isErrorState(
                this.ngControl ? this.ngControl.control : null,
                this._parentFormGroup || this._parentForm
              );
            e !== t && ((this.errorState = e), this.stateChanges.next());
          }
        };
      }
      try {
        Sm = "undefined" != typeof Intl;
      } catch (qb) {
        Sm = !1;
      }
      let Fm = (() => {
          class t {
            isErrorState(t, e) {
              return !!(t && t.invalid && (t.touched || (e && e.submitted)));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Rm = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am], Am],
            })),
            t
          );
        })();
      class Pm {
        constructor(t, e, n) {
          (this._renderer = t),
            (this.element = e),
            (this.config = n),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const Nm = { enterDuration: 450, exitDuration: 400 },
        Mm = Rd({ passive: !0 }),
        Lm = ["mousedown", "touchstart"],
        Vm = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class Bm {
        constructor(t, e, n, i) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            i.isBrowser && (this._containerElement = xd(n));
        }
        fadeInRipple(t, e, n = {}) {
          const i = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            r = Object.assign(Object.assign({}, Nm), n.animation);
          n.centered &&
            ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
          const s =
              n.radius ||
              (function (t, e, n) {
                const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  r = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(i * i + r * r);
              })(t, e, i),
            o = t - i.left,
            a = e - i.top,
            l = r.enterDuration,
            c = document.createElement("div");
          c.classList.add("mat-ripple-element"),
            (c.style.left = `${o - s}px`),
            (c.style.top = `${a - s}px`),
            (c.style.height = `${2 * s}px`),
            (c.style.width = `${2 * s}px`),
            null != n.color && (c.style.backgroundColor = n.color),
            (c.style.transitionDuration = `${l}ms`),
            this._containerElement.appendChild(c),
            window.getComputedStyle(c).getPropertyValue("opacity"),
            (c.style.transform = "scale(1)");
          const h = new Pm(this, c, n);
          return (
            (h.state = 0),
            this._activeRipples.add(h),
            n.persistent || (this._mostRecentTransientRipple = h),
            this._runTimeoutOutsideZone(() => {
              const t = h === this._mostRecentTransientRipple;
              (h.state = 1),
                n.persistent || (t && this._isPointerDown) || h.fadeOut();
            }, l),
            h
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            i = Object.assign(Object.assign({}, Nm), t.config.animation);
          (n.style.transitionDuration = `${i.exitDuration}ms`),
            (n.style.opacity = "0"),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, i.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        setupTriggerEvents(t) {
          const e = xd(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(Lm));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(Vm),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = $d(t),
            n =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++)
              this.fadeInRipple(
                e[t].clientX,
                e[t].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((t) => {
              this._triggerElement.addEventListener(t, this, Mm);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (Lm.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, Mm);
            }),
            this._pointerUpEventsRegistered &&
              Vm.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, Mm);
              }));
        }
      }
      const jm = new Lt("mat-ripple-global-options");
      let Hm = (() => {
          class t {
            constructor(t, e, n, i, r) {
              (this._elementRef = t),
                (this._animationMode = r),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = i || {}),
                (this._rippleRenderer = new Bm(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    e,
                    Object.assign(Object.assign({}, this.rippleConfig), n)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(aa), io(Hl), io(Ad), io(jm, 8), io(wm, 8));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Oo("mat-ripple-unbounded", e.unbounded);
              },
              inputs: {
                radius: ["matRippleRadius", "radius"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                animation: ["matRippleAnimation", "animation"],
              },
              exportAs: ["matRipple"],
            })),
            t
          );
        })(),
        zm = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am, Td], Am],
            })),
            t
          );
        })(),
        qm = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        $m = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[zm, zc, qm]],
            })),
            t
          );
        })();
      const Um = new Lt("mat-label-global-options"),
        Wm = ["mat-button", ""],
        Gm = ["*"],
        Km = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ];
      class Zm {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const Qm = Om(Tm(Im(Zm)));
      let Ym = (() => {
          class t extends Qm {
            constructor(t, e, n) {
              super(t),
                (this._focusMonitor = e),
                (this._animationMode = n),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton = this._hasHostAttributes(
                  "mat-icon-button"
                ));
              for (const i of Km)
                this._hasHostAttributes(i) &&
                  this._getHostElement().classList.add(i);
              t.nativeElement.classList.add("mat-button-base"),
                this._focusMonitor.monitor(this._elementRef, !0),
                this.isRoundButton && (this.color = "accent");
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t = "program", e) {
              this._focusMonitor.focusVia(this._getHostElement(), t, e);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((t) => this._getHostElement().hasAttribute(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(aa), io(Gd), io(wm, 8));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (t, e) {
                var n;
                1 & t && hl(Hm, !0),
                  2 & t && ll((n = ml())) && (e.ripple = n.first);
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 3,
              hostBindings: function (t, e) {
                2 & t &&
                  (to("disabled", e.disabled || null),
                  Oo(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  ));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [Ho],
              attrs: Wm,
              ngContentSelectors: Gm,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (t, e) {
                1 & t &&
                  (wo(),
                  oo(0, "span", 0),
                  Co(1),
                  ao(),
                  lo(2, "div", 1),
                  lo(3, "div", 2)),
                  2 & t &&
                    (tr(2),
                    Oo(
                      "mat-button-ripple-round",
                      e.isRoundButton || e.isIconButton
                    ),
                    ro("matRippleDisabled", e._isRippleDisabled())(
                      "matRippleCentered",
                      e.isIconButton
                    )("matRippleTrigger", e._getHostElement()));
              },
              directives: [Hm],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button[disabled],.mat-icon-button[disabled],.mat-stroked-button[disabled],.mat-flat-button[disabled]{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button[disabled]{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab[disabled]{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab[disabled]{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.cdk-high-contrast-active .mat-button-focus-overlay{background-color:#fff}.cdk-high-contrast-black-on-white .mat-button-focus-overlay{background-color:#000}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Xm = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[zm, Am], Am],
            })),
            t
          );
        })();
      class Jm {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new tg(t, this.selector, this.caught));
        }
      }
      class tg extends P {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const i = new S(this, void 0, void 0);
            this.add(i);
            const r = R(this, n, void 0, void 0, i);
            r !== i && this.add(r);
          }
        }
      }
      class eg {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new ng(t, this.callback));
        }
      }
      class ng extends f {
        constructor(t, e) {
          super(t), this.add(new u(e));
        }
      }
      class ig {}
      class rg {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                i = n.toLowerCase(),
                                r = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(r)
                                  : this.headers.set(i, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const i = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(i, n),
                                this.maybeSetNormalizedName(e, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof rg
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new rg();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof rg
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const i = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              i.push(...n), this.headers.set(e, i);
              break;
            case "d":
              const r = t.value;
              if (r) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === r.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class sg {
        encodeKey(t) {
          return og(t);
        }
        encodeValue(t) {
          return og(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function og(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class ag {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new sg()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const i = t.indexOf("="),
                      [r, s] =
                        -1 == i
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, i)),
                              e.decodeValue(t.slice(i + 1)),
                            ],
                      o = n.get(r) || [];
                    o.push(s), n.set(r, o);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new ag({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function lg(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function cg(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function hg(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class ug {
        constructor(t, e, n, i) {
          let r;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== n ? n : null), (r = i))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new rg()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new ag()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : lg(this.body) ||
              cg(this.body) ||
              hg(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof ag
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || hg(this.body)
            ? null
            : cg(this.body)
            ? this.body.type || null
            : lg(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof ag
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            i = t.responseType || this.responseType,
            r = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new ug(e, n, r, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      const dg = (function () {
        var t = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5,
        };
        return (
          (t[t.Sent] = "Sent"),
          (t[t.UploadProgress] = "UploadProgress"),
          (t[t.ResponseHeader] = "ResponseHeader"),
          (t[t.DownloadProgress] = "DownloadProgress"),
          (t[t.Response] = "Response"),
          (t[t.User] = "User"),
          t
        );
      })();
      class pg extends class {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new rg()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      } {
        constructor(t = {}) {
          super(t),
            (this.type = dg.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new pg({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      function fg(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let mg = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let i;
            if (t instanceof ug) i = t;
            else {
              let r = void 0;
              r = n.headers instanceof rg ? n.headers : new rg(n.headers);
              let s = void 0;
              n.params &&
                (s =
                  n.params instanceof ag
                    ? n.params
                    : new ag({ fromObject: n.params })),
                (i = new ug(t, e, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  params: s,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const r = Qu(i).pipe(j((t) => this.handler.handle(t), void 0, 1));
            if (t instanceof ug || "events" === n.observe) return r;
            const s = r.pipe(ud((t) => t instanceof pg));
            switch (n.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return s.pipe(
                      N((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return s.pipe(
                      N((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return s.pipe(
                      N((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return s.pipe(N((t) => t.body));
                }
              case "response":
                return s;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new ag().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, fg(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, fg(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, fg(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(ig));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const gg = ["*"];
      function _g(t) {
        return Error(`Unable to find icon with the name "${t}"`);
      }
      function yg(t) {
        return Error(
          "The URL provided to MatIconRegistry was not trusted as a resource URL " +
            `via Angular's DomSanitizer. Attempted URL was "${t}".`
        );
      }
      function bg(t) {
        return Error(
          "The literal provided to MatIconRegistry was not trusted as safe HTML by " +
            `Angular's DomSanitizer. Attempted literal was "${t}".`
        );
      }
      class vg {
        constructor(t, e) {
          (this.options = e),
            t.nodeName ? (this.svgElement = t) : (this.url = t);
        }
      }
      let wg = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._httpClient = t),
              (this._sanitizer = e),
              (this._errorHandler = i),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._defaultFontSetClass = "material-icons"),
              (this._document = n);
          }
          addSvgIcon(t, e, n) {
            return this.addSvgIconInNamespace("", t, e, n);
          }
          addSvgIconLiteral(t, e, n) {
            return this.addSvgIconLiteralInNamespace("", t, e, n);
          }
          addSvgIconInNamespace(t, e, n, i) {
            return this._addSvgIconConfig(t, e, new vg(n, i));
          }
          addSvgIconLiteralInNamespace(t, e, n, i) {
            const r = this._sanitizer.sanitize(Ni.HTML, n);
            if (!r) throw bg(n);
            const s = this._createSvgElementForSingleIcon(r, i);
            return this._addSvgIconConfig(t, e, new vg(s, i));
          }
          addSvgIconSet(t, e) {
            return this.addSvgIconSetInNamespace("", t, e);
          }
          addSvgIconSetLiteral(t, e) {
            return this.addSvgIconSetLiteralInNamespace("", t, e);
          }
          addSvgIconSetInNamespace(t, e, n) {
            return this._addSvgIconSetConfig(t, new vg(e, n));
          }
          addSvgIconSetLiteralInNamespace(t, e, n) {
            const i = this._sanitizer.sanitize(Ni.HTML, e);
            if (!i) throw bg(e);
            const r = this._svgElementFromString(i);
            return this._addSvgIconSetConfig(t, new vg(r, n));
          }
          registerFontClassAlias(t, e = t) {
            return this._fontCssClassesByAlias.set(t, e), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const e = this._sanitizer.sanitize(Ni.RESOURCE_URL, t);
            if (!e) throw yg(t);
            const n = this._cachedIconsByUrl.get(e);
            return n
              ? Qu(Cg(n))
              : this._loadSvgIconFromConfig(new vg(t)).pipe(
                  Ju((t) => this._cachedIconsByUrl.set(e, t)),
                  N((t) => Cg(t))
                );
          }
          getNamedSvgIcon(t, e = "") {
            const n = Eg(e, t),
              i = this._svgIconConfigs.get(n);
            if (i) return this._getSvgFromConfig(i);
            const r = this._iconSetConfigs.get(e);
            return r
              ? this._getSvgFromIconSetConfigs(t, r)
              : ((s = _g(n)), new y((t) => t.error(s)));
            var s;
          }
          ngOnDestroy() {
            this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgElement
              ? Qu(Cg(t.svgElement))
              : this._loadSvgIconFromConfig(t).pipe(
                  Ju((e) => (t.svgElement = e)),
                  N((t) => Cg(t))
                );
          }
          _getSvgFromIconSetConfigs(t, e) {
            const n = this._extractIconWithNameFromAnySet(t, e);
            return n
              ? Qu(n)
              : vh(
                  e
                    .filter((t) => !t.svgElement)
                    .map((t) => {
                      return this._loadSvgIconSetFromConfig(t).pipe(
                        ((e = (e) => {
                          const n = `Loading icon set URL: ${this._sanitizer.sanitize(
                            Ni.RESOURCE_URL,
                            t.url
                          )} failed: ${e.message}`;
                          return (
                            this._errorHandler
                              ? this._errorHandler.handleError(new Error(n))
                              : console.error(n),
                            Qu(null)
                          );
                        }),
                        function (t) {
                          const n = new Jm(e),
                            i = t.lift(n);
                          return (n.caught = i);
                        })
                      );
                      var e;
                    })
                ).pipe(
                  N(() => {
                    const n = this._extractIconWithNameFromAnySet(t, e);
                    if (!n) throw _g(t);
                    return n;
                  })
                );
          }
          _extractIconWithNameFromAnySet(t, e) {
            for (let n = e.length - 1; n >= 0; n--) {
              const i = e[n];
              if (i.svgElement) {
                const e = this._extractSvgIconFromSet(
                  i.svgElement,
                  t,
                  i.options
                );
                if (e) return e;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchUrl(t.url).pipe(
              N((e) => this._createSvgElementForSingleIcon(e, t.options))
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgElement
              ? Qu(t.svgElement)
              : this._fetchUrl(t.url).pipe(
                  N(
                    (e) => (
                      t.svgElement ||
                        (t.svgElement = this._svgElementFromString(e)),
                      t.svgElement
                    )
                  )
                );
          }
          _createSvgElementForSingleIcon(t, e) {
            const n = this._svgElementFromString(t);
            return this._setSvgAttributes(n, e), n;
          }
          _extractSvgIconFromSet(t, e, n) {
            const i = t.querySelector(`[id="${e}"]`);
            if (!i) return null;
            const r = i.cloneNode(!0);
            if ((r.removeAttribute("id"), "svg" === r.nodeName.toLowerCase()))
              return this._setSvgAttributes(r, n);
            if ("symbol" === r.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(r), n);
            const s = this._svgElementFromString("<svg></svg>");
            return s.appendChild(r), this._setSvgAttributes(s, n);
          }
          _svgElementFromString(t) {
            const e = this._document.createElement("DIV");
            e.innerHTML = t;
            const n = e.querySelector("svg");
            if (!n) throw Error("<svg> tag not found");
            return n;
          }
          _toSvgElement(t) {
            const e = this._svgElementFromString("<svg></svg>"),
              n = t.attributes;
            for (let i = 0; i < n.length; i++) {
              const { name: t, value: r } = n[i];
              "id" !== t && e.setAttribute(t, r);
            }
            for (let i = 0; i < t.childNodes.length; i++)
              t.childNodes[i].nodeType === this._document.ELEMENT_NODE &&
                e.appendChild(t.childNodes[i].cloneNode(!0));
            return e;
          }
          _setSvgAttributes(t, e) {
            return (
              t.setAttribute("fit", ""),
              t.setAttribute("height", "100%"),
              t.setAttribute("width", "100%"),
              t.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              t.setAttribute("focusable", "false"),
              e && e.viewBox && t.setAttribute("viewBox", e.viewBox),
              t
            );
          }
          _fetchUrl(t) {
            if (!this._httpClient)
              throw Error(
                "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
              );
            if (null == t) throw Error(`Cannot fetch icon from URL "${t}".`);
            const e = this._sanitizer.sanitize(Ni.RESOURCE_URL, t);
            if (!e) throw yg(t);
            const n = this._inProgressUrlFetches.get(e);
            if (n) return n;
            const i = this._httpClient
              .get(e, { responseType: "text" })
              .pipe(
                ((r = () => this._inProgressUrlFetches.delete(e)),
                (t) => t.lift(new eg(r))),
                J()
              );
            var r;
            return this._inProgressUrlFetches.set(e, i), i;
          }
          _addSvgIconConfig(t, e, n) {
            return this._svgIconConfigs.set(Eg(t, e), n), this;
          }
          _addSvgIconSetConfig(t, e) {
            const n = this._iconSetConfigs.get(t);
            return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(mg, 8), Gt(fh), Gt(pc, 8), Gt(ti, 8));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(Gt(mg, 8), Gt(fh), Gt(pc, 8), Gt(ti, 8));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function Cg(t) {
        return t.cloneNode(!0);
      }
      function Eg(t, e) {
        return t + ":" + e;
      }
      class xg {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const kg = Om(xg),
        Sg = new Lt("mat-icon-location", {
          providedIn: "root",
          factory: function () {
            const t = Kt(pc),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : "") };
          },
        }),
        Ag = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        Tg = Ag.map((t) => `[${t}]`).join(", "),
        Og = /^url\(['"]?#(.*?)['"]?\)$/;
      let Ig = (() => {
          class t extends kg {
            constructor(t, e, n, i, r) {
              super(t),
                (this._iconRegistry = e),
                (this._location = i),
                (this._errorHandler = r),
                (this._inline = !1),
                n || t.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = vd(t);
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              this._fontSet = this._cleanupFontValue(t);
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              this._fontIcon = this._cleanupFontValue(t);
            }
            _splitIconName(t) {
              if (!t) return ["", ""];
              const e = t.split(":");
              switch (e.length) {
                case 1:
                  return ["", e[0]];
                case 2:
                  return e;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnChanges(t) {
              const e = t.svgIcon;
              if (e)
                if (this.svgIcon) {
                  const [t, e] = this._splitIconName(this.svgIcon);
                  this._iconRegistry
                    .getNamedSvgIcon(e, t)
                    .pipe(_d(1))
                    .subscribe(
                      (t) => this._setSvgElement(t),
                      (n) => {
                        const i = `Error retrieving icon ${t}:${e}! ${n.message}`;
                        this._errorHandler
                          ? this._errorHandler.handleError(new Error(i))
                          : console.error(i);
                      }
                    );
                } else e.previousValue && this._clearSvgElement();
              this._usingFontIcon() && this._updateFontIconClasses();
            }
            ngOnInit() {
              this._usingFontIcon() && this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && this._location && t.size) {
                const t = this._location.getPathname();
                t !== this._previousPath &&
                  ((this._previousPath = t), this._prependPathToReferences(t));
              }
            }
            ngOnDestroy() {
              this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(t) {
              this._clearSvgElement();
              const e = t.querySelectorAll("style");
              for (let n = 0; n < e.length; n++) e[n].textContent += " ";
              if (this._location) {
                const e = this._location.getPathname();
                (this._previousPath = e),
                  this._cacheChildrenWithExternalReferences(t),
                  this._prependPathToReferences(e);
              }
              this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let e = t.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                e--;

              ) {
                const n = t.childNodes[e];
                (1 === n.nodeType && "svg" !== n.nodeName.toLowerCase()) ||
                  t.removeChild(n);
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                e = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              e != this._previousFontSetClass &&
                (this._previousFontSetClass &&
                  t.classList.remove(this._previousFontSetClass),
                e && t.classList.add(e),
                (this._previousFontSetClass = e)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass &&
                    t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return "string" == typeof t ? t.trim().split(" ")[0] : t;
            }
            _prependPathToReferences(t) {
              const e = this._elementsWithExternalReferences;
              e &&
                e.forEach((e, n) => {
                  e.forEach((e) => {
                    n.setAttribute(e.name, `url('${t}#${e.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const e = t.querySelectorAll(Tg),
                n = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let i = 0; i < e.length; i++)
                Ag.forEach((t) => {
                  const r = e[i],
                    s = r.getAttribute(t),
                    o = s ? s.match(Og) : null;
                  if (o) {
                    let e = n.get(r);
                    e || ((e = []), n.set(r, e)),
                      e.push({ name: t, value: o[1] });
                  }
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(aa),
                io(wg),
                ("aria-hidden",
                (function (t, e) {
                  const n = t.attrs;
                  if (n) {
                    const t = n.length;
                    let e = 0;
                    for (; e < t; ) {
                      const i = n[e];
                      if (Cn(i)) break;
                      if (0 === i) e += 2;
                      else if ("number" == typeof i)
                        for (e++; e < t && "string" == typeof n[e]; ) e++;
                      else {
                        if ("aria-hidden" === i) return n[e + 1];
                        e += 2;
                      }
                    }
                  }
                  return null;
                })(Ge())),
                io(Sg, 8),
                io(ti, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  Oo("mat-icon-inline", e.inline)(
                    "mat-icon-no-color",
                    "primary" !== e.color &&
                      "accent" !== e.color &&
                      "warn" !== e.color
                  );
              },
              inputs: {
                color: "color",
                inline: "inline",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
                svgIcon: "svgIcon",
              },
              exportAs: ["matIcon"],
              features: [Ho, Go],
              ngContentSelectors: gg,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (wo(), Co(0));
              },
              styles: [
                ".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Dg = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am], Am],
            })),
            t
          );
        })();
      function Fg(t, e, n, r) {
        return (
          i(n) && ((r = n), (n = void 0)),
          r
            ? Fg(t, e, n).pipe(N((t) => (l(t) ? r(...t) : r(t))))
            : new y((i) => {
                !(function t(e, n, i, r, s) {
                  let o;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addEventListener(n, i, s),
                      (o = () => t.removeEventListener(n, i, s));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.on(n, i), (o = () => t.off(n, i));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addListener(n, i), (o = () => t.removeListener(n, i));
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (let o = 0, a = e.length; o < a; o++)
                      t(e[o], n, i, r, s);
                  }
                  r.add(o);
                })(
                  t,
                  e,
                  function (t) {
                    i.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : t
                    );
                  },
                  i,
                  n
                );
              })
        );
      }
      function Rg(t) {
        return (e) => e.lift(new Pg(t));
      }
      class Pg {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new Ng(t),
            i = R(n, this.notifier);
          return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
        }
      }
      class Ng extends P {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext(t, e, n, i, r) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const Mg = ["underline"],
        Lg = ["connectionContainer"],
        Vg = ["inputContainer"],
        Bg = ["label"];
      function jg(t, e) {
        1 & t &&
          (co(0),
          oo(1, "div", 14),
          lo(2, "div", 15),
          lo(3, "div", 16),
          lo(4, "div", 17),
          ao(),
          oo(5, "div", 18),
          lo(6, "div", 15),
          lo(7, "div", 16),
          lo(8, "div", 17),
          ao(),
          ho());
      }
      function Hg(t, e) {
        1 & t && (oo(0, "div", 19), Co(1, 1), ao());
      }
      function zg(t, e) {
        if (
          (1 & t && (co(0), Co(1, 2), oo(2, "span"), No(3), ao(), ho()), 2 & t)
        ) {
          const t = bo(2);
          tr(3), Mo(t._control.placeholder);
        }
      }
      function qg(t, e) {
        1 & t && Co(0, 3, ["*ngSwitchCase", "true"]);
      }
      function $g(t, e) {
        1 & t && (oo(0, "span", 23), No(1, " *"), ao());
      }
      function Ug(t, e) {
        if (1 & t) {
          const t = uo();
          oo(0, "label", 20, 21),
            fo("cdkObserveContent", function () {
              return We(t), bo().updateOutlineGap();
            }),
            no(2, zg, 4, 1, "ng-container", 12),
            no(3, qg, 1, 0, void 0, 12),
            no(4, $g, 2, 0, "span", 22),
            ao();
        }
        if (2 & t) {
          const t = bo();
          Oo("mat-empty", t._control.empty && !t._shouldAlwaysFloat)(
            "mat-form-field-empty",
            t._control.empty && !t._shouldAlwaysFloat
          )("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color),
            ro("cdkObserveContentDisabled", "outline" != t.appearance)(
              "id",
              t._labelId
            )("ngSwitch", t._hasLabel()),
            to("for", t._control.id)("aria-owns", t._control.id),
            tr(2),
            ro("ngSwitchCase", !1),
            tr(1),
            ro("ngSwitchCase", !0),
            tr(1),
            ro(
              "ngIf",
              !t.hideRequiredMarker &&
                t._control.required &&
                !t._control.disabled
            );
        }
      }
      function Wg(t, e) {
        1 & t && (oo(0, "div", 24), Co(1, 4), ao());
      }
      function Gg(t, e) {
        if ((1 & t && (oo(0, "div", 25, 26), lo(2, "span", 27), ao()), 2 & t)) {
          const t = bo();
          tr(2),
            Oo("mat-accent", "accent" == t.color)(
              "mat-warn",
              "warn" == t.color
            );
        }
      }
      function Kg(t, e) {
        1 & t && (oo(0, "div"), Co(1, 5), ao()),
          2 & t && ro("@transitionMessages", bo()._subscriptAnimationState);
      }
      function Zg(t, e) {
        if ((1 & t && (oo(0, "div", 31), No(1), ao()), 2 & t)) {
          const t = bo(2);
          ro("id", t._hintLabelId), tr(1), Mo(t.hintLabel);
        }
      }
      function Qg(t, e) {
        if (
          (1 & t &&
            (oo(0, "div", 28),
            no(1, Zg, 2, 2, "div", 29),
            Co(2, 6),
            lo(3, "div", 30),
            Co(4, 7),
            ao()),
          2 & t)
        ) {
          const t = bo();
          ro("@transitionMessages", t._subscriptAnimationState),
            tr(1),
            ro("ngIf", t.hintLabel);
        }
      }
      const Yg = [
          "*",
          [["", "matPrefix", ""]],
          [["mat-placeholder"]],
          [["mat-label"]],
          [["", "matSuffix", ""]],
          [["mat-error"]],
          [["mat-hint", 3, "align", "end"]],
          [["mat-hint", "align", "end"]],
        ],
        Xg = [
          "*",
          "[matPrefix]",
          "mat-placeholder",
          "mat-label",
          "[matSuffix]",
          "mat-error",
          "mat-hint:not([align='end'])",
          "mat-hint[align='end']",
        ];
      let Jg = 0,
        t_ = (() => {
          class t {
            constructor() {
              this.id = `mat-error-${Jg++}`;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-error"]],
              hostAttrs: ["role", "alert", 1, "mat-error"],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && to("id", e.id);
              },
              inputs: { id: "id" },
            })),
            t
          );
        })();
      const e_ = {
        transitionMessages: ip("transitionMessages", [
          ap("enter", op({ opacity: 1, transform: "translateY(0%)" })),
          lp("void => enter", [
            op({ opacity: 0, transform: "translateY(-100%)" }),
            rp("300ms cubic-bezier(0.55, 0, 0.55, 0.2)"),
          ]),
        ]),
      };
      let n_ = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = _e({ type: t })),
          t
        );
      })();
      function i_(t) {
        return Error(`A hint was already declared for 'align="${t}"'.`);
      }
      let r_ = 0,
        s_ = (() => {
          class t {
            constructor() {
              (this.align = "start"), (this.id = `mat-hint-${r_++}`);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-hint"]],
              hostAttrs: [1, "mat-hint"],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  (to("id", e.id)("align", null),
                  Oo("mat-right", "end" == e.align));
              },
              inputs: { align: "align", id: "id" },
            })),
            t
          );
        })(),
        o_ = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["mat-label"]] })),
            t
          );
        })(),
        a_ = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["mat-placeholder"]] })),
            t
          );
        })(),
        l_ = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["", "matPrefix", ""]] })),
            t
          );
        })(),
        c_ = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["", "matSuffix", ""]] })),
            t
          );
        })(),
        h_ = 0;
      class u_ {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const d_ = Om(u_, "primary"),
        p_ = new Lt("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
        f_ = new Lt("MatFormField");
      let m_ = (() => {
          class t extends d_ {
            constructor(t, e, n, i, r, s, o, a) {
              super(t),
                (this._elementRef = t),
                (this._changeDetectorRef = e),
                (this._dir = i),
                (this._defaults = r),
                (this._platform = s),
                (this._ngZone = o),
                (this._outlineGapCalculationNeededImmediately = !1),
                (this._outlineGapCalculationNeededOnStable = !1),
                (this._destroyed = new E()),
                (this._showAlwaysAnimate = !1),
                (this._subscriptAnimationState = ""),
                (this._hintLabel = ""),
                (this._hintLabelId = `mat-hint-${h_++}`),
                (this._labelId = `mat-form-field-label-${h_++}`),
                (this._labelOptions = n || {}),
                (this.floatLabel = this._getDefaultFloatLabelState()),
                (this._animationsEnabled = "NoopAnimations" !== a),
                (this.appearance = r && r.appearance ? r.appearance : "legacy"),
                (this._hideRequiredMarker =
                  !(!r || null == r.hideRequiredMarker) &&
                  r.hideRequiredMarker);
            }
            get appearance() {
              return this._appearance;
            }
            set appearance(t) {
              const e = this._appearance;
              (this._appearance =
                t || (this._defaults && this._defaults.appearance) || "legacy"),
                "outline" === this._appearance &&
                  e !== t &&
                  (this._outlineGapCalculationNeededOnStable = !0);
            }
            get hideRequiredMarker() {
              return this._hideRequiredMarker;
            }
            set hideRequiredMarker(t) {
              this._hideRequiredMarker = vd(t);
            }
            get _shouldAlwaysFloat() {
              return "always" === this.floatLabel && !this._showAlwaysAnimate;
            }
            get _canLabelFloat() {
              return "never" !== this.floatLabel;
            }
            get hintLabel() {
              return this._hintLabel;
            }
            set hintLabel(t) {
              (this._hintLabel = t), this._processHints();
            }
            get floatLabel() {
              return "legacy" !== this.appearance &&
                "never" === this._floatLabel
                ? "auto"
                : this._floatLabel;
            }
            set floatLabel(t) {
              t !== this._floatLabel &&
                ((this._floatLabel = t || this._getDefaultFloatLabelState()),
                this._changeDetectorRef.markForCheck());
            }
            get _control() {
              return (
                this._explicitFormFieldControl ||
                this._controlNonStatic ||
                this._controlStatic
              );
            }
            set _control(t) {
              this._explicitFormFieldControl = t;
            }
            get _labelChild() {
              return this._labelChildNonStatic || this._labelChildStatic;
            }
            getConnectedOverlayOrigin() {
              return this._connectionContainerRef || this._elementRef;
            }
            ngAfterContentInit() {
              this._validateControlChild();
              const t = this._control;
              t.controlType &&
                this._elementRef.nativeElement.classList.add(
                  `mat-form-field-type-${t.controlType}`
                ),
                t.stateChanges.pipe(ep(null)).subscribe(() => {
                  this._validatePlaceholders(),
                    this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                t.ngControl &&
                  t.ngControl.valueChanges &&
                  t.ngControl.valueChanges
                    .pipe(Rg(this._destroyed))
                    .subscribe(() => this._changeDetectorRef.markForCheck()),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable
                    .asObservable()
                    .pipe(Rg(this._destroyed))
                    .subscribe(() => {
                      this._outlineGapCalculationNeededOnStable &&
                        this.updateOutlineGap();
                    });
                }),
                U(
                  this._prefixChildren.changes,
                  this._suffixChildren.changes
                ).subscribe(() => {
                  (this._outlineGapCalculationNeededOnStable = !0),
                    this._changeDetectorRef.markForCheck();
                }),
                this._hintChildren.changes.pipe(ep(null)).subscribe(() => {
                  this._processHints(), this._changeDetectorRef.markForCheck();
                }),
                this._errorChildren.changes.pipe(ep(null)).subscribe(() => {
                  this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._dir &&
                  this._dir.change.pipe(Rg(this._destroyed)).subscribe(() => {
                    "function" == typeof requestAnimationFrame
                      ? this._ngZone.runOutsideAngular(() => {
                          requestAnimationFrame(() => this.updateOutlineGap());
                        })
                      : this.updateOutlineGap();
                  });
            }
            ngAfterContentChecked() {
              this._validateControlChild(),
                this._outlineGapCalculationNeededImmediately &&
                  this.updateOutlineGap();
            }
            ngAfterViewInit() {
              (this._subscriptAnimationState = "enter"),
                this._changeDetectorRef.detectChanges();
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            _shouldForward(t) {
              const e = this._control ? this._control.ngControl : null;
              return e && e[t];
            }
            _hasPlaceholder() {
              return !!(
                (this._control && this._control.placeholder) ||
                this._placeholderChild
              );
            }
            _hasLabel() {
              return !!this._labelChild;
            }
            _shouldLabelFloat() {
              return (
                this._canLabelFloat &&
                (this._control.shouldLabelFloat || this._shouldAlwaysFloat)
              );
            }
            _hideControlPlaceholder() {
              return (
                ("legacy" === this.appearance && !this._hasLabel()) ||
                (this._hasLabel() && !this._shouldLabelFloat())
              );
            }
            _hasFloatingLabel() {
              return (
                this._hasLabel() ||
                ("legacy" === this.appearance && this._hasPlaceholder())
              );
            }
            _getDisplayedMessages() {
              return this._errorChildren &&
                this._errorChildren.length > 0 &&
                this._control.errorState
                ? "error"
                : "hint";
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() &&
                this._canLabelFloat &&
                (this._animationsEnabled &&
                  this._label &&
                  ((this._showAlwaysAnimate = !0),
                  Fg(this._label.nativeElement, "transitionend")
                    .pipe(_d(1))
                    .subscribe(() => {
                      this._showAlwaysAnimate = !1;
                    })),
                (this.floatLabel = "always"),
                this._changeDetectorRef.markForCheck());
            }
            _validatePlaceholders() {
              if (this._control.placeholder && this._placeholderChild)
                throw Error(
                  "Placeholder attribute and child element were both specified."
                );
            }
            _processHints() {
              this._validateHints(), this._syncDescribedByIds();
            }
            _validateHints() {
              if (this._hintChildren) {
                let t, e;
                this._hintChildren.forEach((n) => {
                  if ("start" === n.align) {
                    if (t || this.hintLabel) throw i_("start");
                    t = n;
                  } else if ("end" === n.align) {
                    if (e) throw i_("end");
                    e = n;
                  }
                });
              }
            }
            _getDefaultFloatLabelState() {
              return (
                (this._defaults && this._defaults.floatLabel) ||
                this._labelOptions.float ||
                "auto"
              );
            }
            _syncDescribedByIds() {
              if (this._control) {
                let t = [];
                if ("hint" === this._getDisplayedMessages()) {
                  const e = this._hintChildren
                      ? this._hintChildren.find((t) => "start" === t.align)
                      : null,
                    n = this._hintChildren
                      ? this._hintChildren.find((t) => "end" === t.align)
                      : null;
                  e
                    ? t.push(e.id)
                    : this._hintLabel && t.push(this._hintLabelId),
                    n && t.push(n.id);
                } else
                  this._errorChildren &&
                    (t = this._errorChildren.map((t) => t.id));
                this._control.setDescribedByIds(t);
              }
            }
            _validateControlChild() {
              if (!this._control)
                throw Error(
                  "mat-form-field must contain a MatFormFieldControl."
                );
            }
            updateOutlineGap() {
              const t = this._label ? this._label.nativeElement : null;
              if (
                "outline" !== this.appearance ||
                !t ||
                !t.children.length ||
                !t.textContent.trim()
              )
                return;
              if (!this._platform.isBrowser) return;
              if (!this._isAttachedToDOM())
                return void (this._outlineGapCalculationNeededImmediately = !0);
              let e = 0,
                n = 0;
              const i = this._connectionContainerRef.nativeElement,
                r = i.querySelectorAll(".mat-form-field-outline-start"),
                s = i.querySelectorAll(".mat-form-field-outline-gap");
              if (this._label && this._label.nativeElement.children.length) {
                const r = i.getBoundingClientRect();
                if (0 === r.width && 0 === r.height)
                  return (
                    (this._outlineGapCalculationNeededOnStable = !0),
                    void (this._outlineGapCalculationNeededImmediately = !1)
                  );
                const s = this._getStartEnd(r),
                  o = this._getStartEnd(t.children[0].getBoundingClientRect());
                let a = 0;
                for (const e of t.children) a += e.offsetWidth;
                (e = Math.abs(o - s) - 5), (n = a > 0 ? 0.75 * a + 10 : 0);
              }
              for (let o = 0; o < r.length; o++) r[o].style.width = `${e}px`;
              for (let o = 0; o < s.length; o++) s[o].style.width = `${n}px`;
              this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1;
            }
            _getStartEnd(t) {
              return this._dir && "rtl" === this._dir.value ? t.right : t.left;
            }
            _isAttachedToDOM() {
              const t = this._elementRef.nativeElement;
              if (t.getRootNode) {
                const e = t.getRootNode();
                return e && e !== t;
              }
              return document.documentElement.contains(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(aa),
                io(As),
                io(Um, 8),
                io(Yd, 8),
                io(p_, 8),
                io(Ad),
                io(Hl),
                io(wm, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-form-field"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t &&
                  (dl(n, n_, !0),
                  pl(n, n_, !0),
                  dl(n, o_, !0),
                  pl(n, o_, !0),
                  dl(n, a_, !0),
                  dl(n, t_, !0),
                  dl(n, s_, !0),
                  dl(n, l_, !0),
                  dl(n, c_, !0)),
                  2 & t &&
                    (ll((i = ml())) && (e._controlNonStatic = i.first),
                    ll((i = ml())) && (e._controlStatic = i.first),
                    ll((i = ml())) && (e._labelChildNonStatic = i.first),
                    ll((i = ml())) && (e._labelChildStatic = i.first),
                    ll((i = ml())) && (e._placeholderChild = i.first),
                    ll((i = ml())) && (e._errorChildren = i),
                    ll((i = ml())) && (e._hintChildren = i),
                    ll((i = ml())) && (e._prefixChildren = i),
                    ll((i = ml())) && (e._suffixChildren = i));
              },
              viewQuery: function (t, e) {
                var n;
                1 & t && (hl(Mg, !0), cl(Lg, !0), hl(Vg, !0), hl(Bg, !0)),
                  2 & t &&
                    (ll((n = ml())) && (e.underlineRef = n.first),
                    ll((n = ml())) && (e._connectionContainerRef = n.first),
                    ll((n = ml())) && (e._inputContainerRef = n.first),
                    ll((n = ml())) && (e._label = n.first));
              },
              hostAttrs: [1, "mat-form-field"],
              hostVars: 44,
              hostBindings: function (t, e) {
                2 & t &&
                  Oo(
                    "mat-form-field-appearance-standard",
                    "standard" == e.appearance
                  )("mat-form-field-appearance-fill", "fill" == e.appearance)(
                    "mat-form-field-appearance-outline",
                    "outline" == e.appearance
                  )(
                    "mat-form-field-appearance-legacy",
                    "legacy" == e.appearance
                  )("mat-form-field-invalid", e._control.errorState)(
                    "mat-form-field-can-float",
                    e._canLabelFloat
                  )("mat-form-field-should-float", e._shouldLabelFloat())(
                    "mat-form-field-has-label",
                    e._hasFloatingLabel()
                  )(
                    "mat-form-field-hide-placeholder",
                    e._hideControlPlaceholder()
                  )("mat-form-field-disabled", e._control.disabled)(
                    "mat-form-field-autofilled",
                    e._control.autofilled
                  )("mat-focused", e._control.focused)(
                    "mat-accent",
                    "accent" == e.color
                  )("mat-warn", "warn" == e.color)(
                    "ng-untouched",
                    e._shouldForward("untouched")
                  )("ng-touched", e._shouldForward("touched"))(
                    "ng-pristine",
                    e._shouldForward("pristine")
                  )("ng-dirty", e._shouldForward("dirty"))(
                    "ng-valid",
                    e._shouldForward("valid")
                  )("ng-invalid", e._shouldForward("invalid"))(
                    "ng-pending",
                    e._shouldForward("pending")
                  )("_mat-animation-noopable", !e._animationsEnabled);
              },
              inputs: {
                color: "color",
                floatLabel: "floatLabel",
                appearance: "appearance",
                hideRequiredMarker: "hideRequiredMarker",
                hintLabel: "hintLabel",
              },
              exportAs: ["matFormField"],
              features: [ia([{ provide: f_, useExisting: t }]), Ho],
              ngContentSelectors: Xg,
              decls: 15,
              vars: 8,
              consts: [
                [1, "mat-form-field-wrapper"],
                [1, "mat-form-field-flex", 3, "click"],
                ["connectionContainer", ""],
                [4, "ngIf"],
                ["class", "mat-form-field-prefix", 4, "ngIf"],
                [1, "mat-form-field-infix"],
                ["inputContainer", ""],
                [1, "mat-form-field-label-wrapper"],
                [
                  "class",
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "mat-empty",
                  "mat-form-field-empty",
                  "mat-accent",
                  "mat-warn",
                  "ngSwitch",
                  "cdkObserveContent",
                  4,
                  "ngIf",
                ],
                ["class", "mat-form-field-suffix", 4, "ngIf"],
                ["class", "mat-form-field-underline", 4, "ngIf"],
                [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
                [1, "mat-form-field-outline"],
                [1, "mat-form-field-outline-start"],
                [1, "mat-form-field-outline-gap"],
                [1, "mat-form-field-outline-end"],
                [1, "mat-form-field-outline", "mat-form-field-outline-thick"],
                [1, "mat-form-field-prefix"],
                [
                  1,
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "ngSwitch",
                  "cdkObserveContent",
                ],
                ["label", ""],
                [
                  "class",
                  "mat-placeholder-required mat-form-field-required-marker",
                  "aria-hidden",
                  "true",
                  4,
                  "ngIf",
                ],
                [
                  "aria-hidden",
                  "true",
                  1,
                  "mat-placeholder-required",
                  "mat-form-field-required-marker",
                ],
                [1, "mat-form-field-suffix"],
                [1, "mat-form-field-underline"],
                ["underline", ""],
                [1, "mat-form-field-ripple"],
                [1, "mat-form-field-hint-wrapper"],
                ["class", "mat-hint", 3, "id", 4, "ngIf"],
                [1, "mat-form-field-hint-spacer"],
                [1, "mat-hint", 3, "id"],
              ],
              template: function (t, e) {
                1 & t &&
                  (wo(Yg),
                  oo(0, "div", 0),
                  oo(1, "div", 1, 2),
                  fo("click", function (t) {
                    return (
                      e._control.onContainerClick &&
                      e._control.onContainerClick(t)
                    );
                  }),
                  no(3, jg, 9, 0, "ng-container", 3),
                  no(4, Hg, 2, 0, "div", 4),
                  oo(5, "div", 5, 6),
                  Co(7),
                  oo(8, "span", 7),
                  no(9, Ug, 5, 16, "label", 8),
                  ao(),
                  ao(),
                  no(10, Wg, 2, 0, "div", 9),
                  ao(),
                  no(11, Gg, 3, 4, "div", 10),
                  oo(12, "div", 11),
                  no(13, Kg, 2, 1, "div", 12),
                  no(14, Qg, 5, 2, "div", 13),
                  ao(),
                  ao()),
                  2 & t &&
                    (tr(3),
                    ro("ngIf", "outline" == e.appearance),
                    tr(1),
                    ro("ngIf", e._prefixChildren.length),
                    tr(5),
                    ro("ngIf", e._hasFloatingLabel()),
                    tr(1),
                    ro("ngIf", e._suffixChildren.length),
                    tr(1),
                    ro("ngIf", "outline" != e.appearance),
                    tr(1),
                    ro("ngSwitch", e._getDisplayedMessages()),
                    tr(1),
                    ro("ngSwitchCase", "error"),
                    tr(1),
                    ro("ngSwitchCase", "hint"));
              },
              directives: [Mc, jc, Hc, Ld],
              styles: [
                ".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:scaleX(1);transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n",
                '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n',
                '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n',
                ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n",
                ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n",
                ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n",
              ],
              encapsulation: 2,
              data: { animation: [e_.transitionMessages] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        g_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[zc, Vd]],
            })),
            t
          );
        })();
      class __ {
        constructor(t) {
          this.durationSelector = t;
        }
        call(t, e) {
          return e.subscribe(new y_(t, this.durationSelector));
        }
      }
      class y_ extends P {
        constructor(t, e) {
          super(t), (this.durationSelector = e), (this.hasValue = !1);
        }
        _next(t) {
          if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
            let n;
            try {
              const { durationSelector: e } = this;
              n = e(t);
            } catch (e) {
              return this.destination.error(e);
            }
            const i = R(this, n);
            !i || i.closed
              ? this.clearThrottle()
              : this.add((this.throttled = i));
          }
        }
        clearThrottle() {
          const { value: t, hasValue: e, throttled: n } = this;
          n && (this.remove(n), (this.throttled = null), n.unsubscribe()),
            e &&
              ((this.value = null),
              (this.hasValue = !1),
              this.destination.next(t));
        }
        notifyNext(t, e, n, i) {
          this.clearThrottle();
        }
        notifyComplete() {
          this.clearThrottle();
        }
      }
      function b_(t) {
        return !l(t) && t - parseFloat(t) + 1 >= 0;
      }
      function v_(t) {
        const { index: e, period: n, subscriber: i } = t;
        if ((i.next(e), !i.closed)) {
          if (-1 === n) return i.complete();
          (t.index = e + 1), this.schedule(t, n);
        }
      }
      function w_(t, e = od) {
        return (
          (n = () =>
            (function (t = 0, e, n) {
              let i = -1;
              return (
                b_(e) ? (i = Number(e) < 1 ? 1 : Number(e)) : k(e) && (n = e),
                k(n) || (n = od),
                new y((e) => {
                  const r = b_(t) ? t : +t - n.now();
                  return n.schedule(v_, r, {
                    index: 0,
                    period: i,
                    subscriber: e,
                  });
                })
              );
            })(t, e)),
          function (t) {
            return t.lift(new __(n));
          }
        );
        var n;
      }
      const C_ = Rd({ passive: !0 });
      let E_ = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t),
                (this._ngZone = e),
                (this._monitoredElements = new Map());
            }
            monitor(t) {
              if (!this._platform.isBrowser) return md;
              const e = xd(t),
                n = this._monitoredElements.get(e);
              if (n) return n.subject.asObservable();
              const i = new E(),
                r = "cdk-text-field-autofilled",
                s = (t) => {
                  "cdk-text-field-autofill-start" !== t.animationName ||
                  e.classList.contains(r)
                    ? "cdk-text-field-autofill-end" === t.animationName &&
                      e.classList.contains(r) &&
                      (e.classList.remove(r),
                      this._ngZone.run(() =>
                        i.next({ target: t.target, isAutofilled: !1 })
                      ))
                    : (e.classList.add(r),
                      this._ngZone.run(() =>
                        i.next({ target: t.target, isAutofilled: !0 })
                      ));
                };
              return (
                this._ngZone.runOutsideAngular(() => {
                  e.addEventListener("animationstart", s, C_),
                    e.classList.add("cdk-text-field-autofill-monitored");
                }),
                this._monitoredElements.set(e, {
                  subject: i,
                  unlisten: () => {
                    e.removeEventListener("animationstart", s, C_);
                  },
                }),
                i.asObservable()
              );
            }
            stopMonitoring(t) {
              const e = xd(t),
                n = this._monitoredElements.get(e);
              n &&
                (n.unlisten(),
                n.subject.complete(),
                e.classList.remove("cdk-text-field-autofill-monitored"),
                e.classList.remove("cdk-text-field-autofilled"),
                this._monitoredElements.delete(e));
            }
            ngOnDestroy() {
              this._monitoredElements.forEach((t, e) => this.stopMonitoring(e));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Ad), Gt(Hl));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Ad), Gt(Hl));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        x_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Td]],
            })),
            t
          );
        })();
      const k_ = new Lt("MAT_INPUT_VALUE_ACCESSOR"),
        S_ = [
          "button",
          "checkbox",
          "file",
          "hidden",
          "image",
          "radio",
          "range",
          "reset",
          "submit",
        ];
      let A_ = 0;
      class T_ {
        constructor(t, e, n, i) {
          (this._defaultErrorStateMatcher = t),
            (this._parentForm = e),
            (this._parentFormGroup = n),
            (this.ngControl = i);
        }
      }
      const O_ = Dm(T_);
      let I_ = (() => {
          class t extends O_ {
            constructor(t, e, n, i, r, s, o, a, l) {
              super(s, i, r, n),
                (this._elementRef = t),
                (this._platform = e),
                (this.ngControl = n),
                (this._autofillMonitor = a),
                (this._uid = `mat-input-${A_++}`),
                (this._isServer = !1),
                (this._isNativeSelect = !1),
                (this.focused = !1),
                (this.stateChanges = new E()),
                (this.controlType = "mat-input"),
                (this.autofilled = !1),
                (this._disabled = !1),
                (this._required = !1),
                (this._type = "text"),
                (this._readonly = !1),
                (this._neverEmptyInputTypes = [
                  "date",
                  "datetime",
                  "datetime-local",
                  "month",
                  "time",
                  "week",
                ].filter((t) => Id().has(t)));
              const c = this._elementRef.nativeElement;
              (this._inputValueAccessor = o || c),
                (this._previousNativeValue = this.value),
                (this.id = this.id),
                e.IOS &&
                  l.runOutsideAngular(() => {
                    t.nativeElement.addEventListener("keyup", (t) => {
                      let e = t.target;
                      e.value ||
                        e.selectionStart ||
                        e.selectionEnd ||
                        (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0));
                    });
                  }),
                (this._isServer = !this._platform.isBrowser),
                (this._isNativeSelect = "select" === c.nodeName.toLowerCase()),
                this._isNativeSelect &&
                  (this.controlType = c.multiple
                    ? "mat-native-select-multiple"
                    : "mat-native-select");
            }
            get disabled() {
              return this.ngControl && null !== this.ngControl.disabled
                ? this.ngControl.disabled
                : this._disabled;
            }
            set disabled(t) {
              (this._disabled = vd(t)),
                this.focused && ((this.focused = !1), this.stateChanges.next());
            }
            get id() {
              return this._id;
            }
            set id(t) {
              this._id = t || this._uid;
            }
            get required() {
              return this._required;
            }
            set required(t) {
              this._required = vd(t);
            }
            get type() {
              return this._type;
            }
            set type(t) {
              (this._type = t || "text"),
                this._validateType(),
                !this._isTextarea() &&
                  Id().has(this._type) &&
                  (this._elementRef.nativeElement.type = this._type);
            }
            get value() {
              return this._inputValueAccessor.value;
            }
            set value(t) {
              t !== this.value &&
                ((this._inputValueAccessor.value = t),
                this.stateChanges.next());
            }
            get readonly() {
              return this._readonly;
            }
            set readonly(t) {
              this._readonly = vd(t);
            }
            ngOnInit() {
              this._platform.isBrowser &&
                this._autofillMonitor
                  .monitor(this._elementRef.nativeElement)
                  .subscribe((t) => {
                    (this.autofilled = t.isAutofilled),
                      this.stateChanges.next();
                  });
            }
            ngOnChanges() {
              this.stateChanges.next();
            }
            ngOnDestroy() {
              this.stateChanges.complete(),
                this._platform.isBrowser &&
                  this._autofillMonitor.stopMonitoring(
                    this._elementRef.nativeElement
                  );
            }
            ngDoCheck() {
              this.ngControl && this.updateErrorState(),
                this._dirtyCheckNativeValue();
            }
            focus(t) {
              this._elementRef.nativeElement.focus(t);
            }
            _focusChanged(t) {
              t === this.focused ||
                (this.readonly && t) ||
                ((this.focused = t), this.stateChanges.next());
            }
            _onInput() {}
            _isTextarea() {
              return (
                "textarea" ===
                this._elementRef.nativeElement.nodeName.toLowerCase()
              );
            }
            _dirtyCheckNativeValue() {
              const t = this._elementRef.nativeElement.value;
              this._previousNativeValue !== t &&
                ((this._previousNativeValue = t), this.stateChanges.next());
            }
            _validateType() {
              if (S_.indexOf(this._type) > -1)
                throw Error(
                  `Input type "${this._type}" isn't supported by matInput.`
                );
            }
            _isNeverEmpty() {
              return this._neverEmptyInputTypes.indexOf(this._type) > -1;
            }
            _isBadInput() {
              let t = this._elementRef.nativeElement.validity;
              return t && t.badInput;
            }
            get empty() {
              return !(
                this._isNeverEmpty() ||
                this._elementRef.nativeElement.value ||
                this._isBadInput() ||
                this.autofilled
              );
            }
            get shouldLabelFloat() {
              if (this._isNativeSelect) {
                const t = this._elementRef.nativeElement,
                  e = t.options[0];
                return (
                  this.focused ||
                  t.multiple ||
                  !this.empty ||
                  !!(t.selectedIndex > -1 && e && e.label)
                );
              }
              return this.focused || !this.empty;
            }
            setDescribedByIds(t) {
              this._ariaDescribedby = t.join(" ");
            }
            onContainerClick() {
              this.focused || this.focus();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(aa),
                io(Ad),
                io(Fh, 10),
                io(Au, 8),
                io(ju, 8),
                io(Fm),
                io(k_, 10),
                io(E_),
                io(Hl)
              );
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["input", "matInput", ""],
                ["textarea", "matInput", ""],
                ["select", "matNativeControl", ""],
                ["input", "matNativeControl", ""],
                ["textarea", "matNativeControl", ""],
              ],
              hostAttrs: [
                1,
                "mat-input-element",
                "mat-form-field-autofill-control",
              ],
              hostVars: 10,
              hostBindings: function (t, e) {
                1 & t &&
                  fo("blur", function () {
                    return e._focusChanged(!1);
                  })("focus", function () {
                    return e._focusChanged(!0);
                  })("input", function () {
                    return e._onInput();
                  }),
                  2 & t &&
                    (Vo("disabled", e.disabled)("required", e.required),
                    to("id", e.id)("placeholder", e.placeholder)(
                      "readonly",
                      (e.readonly && !e._isNativeSelect) || null
                    )("aria-describedby", e._ariaDescribedby || null)(
                      "aria-invalid",
                      e.errorState
                    )("aria-required", e.required.toString()),
                    Oo("mat-input-server", e._isServer));
              },
              inputs: {
                id: "id",
                disabled: "disabled",
                required: "required",
                type: "type",
                value: "value",
                readonly: "readonly",
                placeholder: "placeholder",
                errorStateMatcher: "errorStateMatcher",
              },
              exportAs: ["matInput"],
              features: [ia([{ provide: n_, useExisting: t }]), Ho, Go],
            })),
            t
          );
        })(),
        D_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Fm],
              imports: [[x_, g_], x_, g_],
            })),
            t
          );
        })();
      function F_(t, e) {
        if ((1 & t && lo(0, "div", 4), 2 & t)) {
          const t = bo();
          ro("ngClass", t.message.styleClass)("innerHTML", t.message.text, Vi);
        }
      }
      function R_(t, e) {
        if (1 & t) {
          const t = uo();
          oo(0, "div", 5),
            oo(1, "mat-form-field", 6),
            lo(2, "textarea", 7, 8),
            ao(),
            oo(4, "button", 9),
            fo("click", function () {
              return We(t), bo().parent.send();
            }),
            oo(5, "mat-icon"),
            No(6, "save"),
            ao(),
            No(7),
            ao(),
            ao();
        }
        if (2 & t) {
          const t = bo();
          ro("ngClass", t.message.styleClass),
            tr(2),
            ro("formControl", t.message.ctrl),
            tr(5),
            Lo("\xa0", t.message.submitLabel, " ");
        }
      }
      function P_(t, e) {
        if (1 & t) {
          const t = uo();
          oo(0, "div", 5),
            oo(1, "mat-form-field", 6),
            lo(2, "input", 10, 8),
            ao(),
            oo(4, "button", 9),
            fo("click", function () {
              return We(t), bo().parent.send();
            }),
            oo(5, "mat-icon"),
            No(6, "save"),
            ao(),
            No(7),
            ao(),
            ao();
        }
        if (2 & t) {
          const t = bo();
          ro("ngClass", t.message.styleClass),
            tr(2),
            Eo("min", t.message.min),
            Eo("max", t.message.max),
            ro("formControl", t.message.ctrl),
            tr(5),
            Lo("\xa0", t.message.submitLabel, " ");
        }
      }
      function N_(t, e) {
        1 & t &&
          (oo(0, "div", 11),
          oo(1, "div", 12),
          lo(2, "span", 13),
          lo(3, "span", 13),
          lo(4, "span", 13),
          ao(),
          ao());
      }
      let M_ = (() => {
        class t {
          constructor() {}
          ngOnInit() {}
          ngAfterViewInit() {
            (this.container = document.getElementById("msgContainer")),
              (this.container.scrollTop = this.container.scrollHeight);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-chat-message"]],
            inputs: { message: "message", parent: "parent" },
            decls: 5,
            vars: 4,
            consts: [
              [1, "message-box"],
              [3, "ngClass", "innerHTML", 4, "ngIf"],
              ["class", "alternate-theme", 3, "ngClass", 4, "ngIf"],
              ["class", "message-typing", 4, "ngIf"],
              [3, "ngClass", "innerHTML"],
              [1, "alternate-theme", 3, "ngClass"],
              [1, "full-width"],
              ["matInput", "", "required", "", 3, "formControl"],
              ["rspInput", ""],
              ["mat-raised-button", "", 1, "submit", 3, "click"],
              [
                "matInput",
                "",
                "required",
                "",
                "type",
                "number",
                3,
                "formControl",
                "min",
                "max",
              ],
              [1, "message-typing"],
              ["id", "typing"],
              [1, "typing-dot"],
            ],
            template: function (t, e) {
              1 & t &&
                (oo(0, "div", 0),
                no(1, F_, 1, 2, "div", 1),
                no(2, R_, 8, 3, "div", 2),
                no(3, P_, 8, 5, "div", 2),
                no(4, N_, 5, 0, "div", 3),
                ao()),
                2 & t &&
                  (tr(1),
                  ro("ngIf", e.message.text),
                  tr(1),
                  ro("ngIf", "textbox" === e.message.type),
                  tr(1),
                  ro("ngIf", "number" === e.message.type),
                  tr(1),
                  ro("ngIf", "typing" === e.message.type));
            },
            directives: [Mc, Fc, m_, I_, Ah, zu, Rh, Vu, Ym, Ig, Uh],
            styles: [
              ".message-box[_ngcontent-%COMP%]{margin-bottom:8px}.message[_ngcontent-%COMP%], .message-typing[_ngcontent-%COMP%]{background:rgb(92 108 191);color:#fff;border-radius:0 16px 16px 16px;padding:8px 16px;max-width:300px;white-space:pre-wrap}.message-typing[_ngcontent-%COMP%]{width:24px}.reply[_ngcontent-%COMP%]{background:#d1dff5;color:#000;border-radius:16px 0 16px 16px;padding:8px 16px;max-width:300px;margin-left:auto;overflow-wrap:break-word;display:flex;flex-direction:column}.submit[_ngcontent-%COMP%]{width:100px;align-self:flex-end}.full-width[_ngcontent-%COMP%]{width:100%}#typing[_ngcontent-%COMP%]{text-align:center}.typing-dot[_ngcontent-%COMP%]{display:inline-block;width:5px;height:5px;border-radius:50%;margin-right:3px;background:hsla(0,0%,88.2%,.9);-webkit-animation:typing 1.6s linear infinite;animation:typing 1.6s linear infinite}.typing-dot[_ngcontent-%COMP%]:nth-child(2){-webkit-animation-delay:-1.4s;animation-delay:-1.4s}.typing-dot[_ngcontent-%COMP%]:nth-child(3){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}@-webkit-keyframes typing{0%,60%,to{transform:none}30%{transform:translateY(-5px)}}@keyframes typing{0%,60%,to{transform:none}30%{transform:translateY(-5px)}}",
            ],
          })),
          t
        );
      })();
      const L_ = ["chatInput"];
      function V_(t, e) {
        if ((1 & t && lo(0, "app-chat-message", 10), 2 & t)) {
          const t = e.$implicit,
            n = bo();
          ro("message", t)("parent", n);
        }
      }
      let B_ = (() => {
        class t {
          constructor(t) {
            this.botBuilderService = t;
          }
          ngOnInit() {
            this.messages = [];
            const t = this.parent.userId;
            this.clearMessage(),
              this.botBuilderService.connect(
                t,
                () => {
                  this.messages.push(Gu.typingMessage());
                },
                (t) => {
                  "typing" === this.messages[this.messages.length - 1].type &&
                    this.messages.pop(),
                    t && this.buildMessage(t);
                }
              );
          }
          ngAfterViewInit() {
            this.input && this.input.nativeElement.focus();
          }
          ngOnDestroy() {
            this.botBuilderService.disconnect(), (this.messages = []);
          }
          send() {
            if (!this.message.ctrl.value) return;
            const t = "" + this.message.ctrl.value,
              e = Gu.replyMessage(t, "reply");
            this.messages.push(e),
              this.messages.push(Gu.typingMessage()),
              this.clearMessage(),
              this.input && this.input.nativeElement.focus(),
              this.botBuilderService.send(t);
          }
          clear() {
            this.parent.clearChat();
          }
          trackByFn(t, e) {
            return t;
          }
          buildMessage(t) {
            const e = new Gu();
            if (t.text)
              (e.text = t.text),
                (e.styleClass = "message"),
                this.messages.push(e);
            else if (t.length > 0)
              if (
                ((e.text = t[0].text),
                (e.styleClass = "message"),
                this.messages.push(e),
                "close" === t[0].type)
              )
                this.messages.push(Gu.typingMessage()),
                  this.parent.generateBot();
              else {
                const e = Gu.inputMessage(t[0]);
                this.messages.push(e);
              }
          }
          clearMessage() {
            (this.message = new Gu()), (this.message.ctrl = new Cu(""));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(io(Zu));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-chat"]],
            viewQuery: function (t, e) {
              var n;
              1 & t && hl(L_, !0),
                2 & t && ll((n = ml())) && (e.input = n.first);
            },
            inputs: { message: "message" },
            decls: 18,
            vars: 3,
            consts: [
              [1, "spacer"],
              [1, "msg-header"],
              ["mat-icon-button", "", "color", "accent", 3, "click"],
              ["id", "msgContainer", 1, "msg-container"],
              ["ngFor", "", 3, "ngForOf", "ngForTrackBy"],
              [1, "msg-action"],
              [1, "fill"],
              ["matInput", "", "type", "text", 3, "formControl", "keyup.enter"],
              ["chatInput", ""],
              [
                "mat-raised-button",
                "",
                "color",
                "primary",
                1,
                "send",
                3,
                "click",
              ],
              [3, "message", "parent"],
            ],
            template: function (t, e) {
              1 & t &&
                (lo(0, "span", 0),
                oo(1, "div"),
                oo(2, "div", 1),
                oo(3, "h4"),
                No(4, "CHAT WINDOW"),
                ao(),
                lo(5, "span", 0),
                oo(6, "button", 2),
                fo("click", function () {
                  return e.clear();
                }),
                oo(7, "mat-icon"),
                No(8, "clear"),
                ao(),
                ao(),
                ao(),
                oo(9, "div", 3),
                no(10, V_, 1, 2, "ng-template", 4),
                ao(),
                oo(11, "div", 5),
                oo(12, "mat-form-field", 6),
                oo(13, "input", 7, 8),
                fo("keyup.enter", function () {
                  return e.send();
                }),
                ao(),
                ao(),
                oo(15, "button", 9),
                fo("click", function () {
                  return e.send();
                }),
                oo(16, "mat-icon"),
                No(17, "send"),
                ao(),
                ao(),
                ao(),
                ao()),
                2 & t &&
                  (tr(10),
                  ro("ngForOf", e.messages)("ngForTrackBy", e.trackByFn),
                  tr(3),
                  ro("formControl", e.message.ctrl));
            },
            directives: [Ym, Ig, Pc, m_, I_, Ah, Rh, Vu, M_],
            styles: [
              ".msg-container[_ngcontent-%COMP%]{flex:1;overflow:scroll;padding:0 8px}.msg-header[_ngcontent-%COMP%]{align-items:baseline;margin-bottom:16px;color:#1a237e}.msg-action[_ngcontent-%COMP%], .msg-header[_ngcontent-%COMP%]{display:flex;padding:8px}.msg-action[_ngcontent-%COMP%]{border-radius:16px 0 16px 16px;overflow-wrap:break-word}.fill[_ngcontent-%COMP%]{flex:1;margin-right:16px}.send[_ngcontent-%COMP%]{width:45px;align-self:flex-end}@media (max-width:479px){.msg-container[_ngcontent-%COMP%]{flex:3}}",
            ],
          })),
          t
        );
      })();
      const j_ = ["*", [["mat-toolbar-row"]]],
        H_ = ["*", "mat-toolbar-row"];
      class z_ {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const q_ = Om(z_);
      let $_ = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-toolbar-row"]],
              hostAttrs: [1, "mat-toolbar-row"],
              exportAs: ["matToolbarRow"],
            })),
            t
          );
        })(),
        U_ = (() => {
          class t extends q_ {
            constructor(t, e, n) {
              super(t), (this._platform = e), (this._document = n);
            }
            ngAfterViewInit() {
              di() &&
                this._platform.isBrowser &&
                (this._checkToolbarMixedModes(),
                this._toolbarRows.changes.subscribe(() =>
                  this._checkToolbarMixedModes()
                ));
            }
            _checkToolbarMixedModes() {
              this._toolbarRows.length &&
                Array.from(this._elementRef.nativeElement.childNodes)
                  .filter(
                    (t) =>
                      !(t.classList && t.classList.contains("mat-toolbar-row"))
                  )
                  .filter(
                    (t) =>
                      t.nodeType !==
                      (this._document ? this._document.COMMENT_NODE : 8)
                  )
                  .some((t) => !(!t.textContent || !t.textContent.trim())) &&
                (function () {
                  throw Error(
                    "MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row."
                  );
                })();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(aa), io(Ad), io(pc));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-toolbar"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t && dl(n, $_, !0),
                  2 & t && ll((i = ml())) && (e._toolbarRows = i);
              },
              hostAttrs: [1, "mat-toolbar"],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  Oo("mat-toolbar-multiple-rows", e._toolbarRows.length > 0)(
                    "mat-toolbar-single-row",
                    0 === e._toolbarRows.length
                  );
              },
              inputs: { color: "color" },
              exportAs: ["matToolbar"],
              features: [Ho],
              ngContentSelectors: H_,
              decls: 2,
              vars: 0,
              template: function (t, e) {
                1 & t && (wo(j_), Co(0), Co(1, 1));
              },
              styles: [
                ".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}.mat-toolbar-multiple-rows{min-height:64px}.mat-toolbar-row,.mat-toolbar-single-row{height:64px}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:56px}.mat-toolbar-row,.mat-toolbar-single-row{height:56px}}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        W_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am], Am],
            })),
            t
          );
        })();
      class G_ {
        constructor(t, e) {
          (this.compare = t), (this.keySelector = e);
        }
        call(t, e) {
          return e.subscribe(new K_(t, this.compare, this.keySelector));
        }
      }
      class K_ extends f {
        constructor(t, e, n) {
          super(t),
            (this.keySelector = n),
            (this.hasKey = !1),
            "function" == typeof e && (this.compare = e);
        }
        compare(t, e) {
          return t === e;
        }
        _next(t) {
          let e;
          try {
            const { keySelector: n } = this;
            e = n ? n(t) : t;
          } catch (i) {
            return this.destination.error(i);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: t } = this;
              n = t(this.key, e);
            } catch (i) {
              return this.destination.error(i);
            }
          else this.hasKey = !0;
          n || ((this.key = e), this.destination.next(t));
        }
      }
      let Z_ = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngZone = t),
                (this._platform = e),
                (this._scrolled = new E()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = n);
            }
            register(t) {
              this.scrollContainers.has(t) ||
                this.scrollContainers.set(
                  t,
                  t.elementScrolled().subscribe(() => this._scrolled.next(t))
                );
            }
            deregister(t) {
              const e = this.scrollContainers.get(t);
              e && (e.unsubscribe(), this.scrollContainers.delete(t));
            }
            scrolled(t = 20) {
              return this._platform.isBrowser
                ? new y((e) => {
                    this._globalSubscription || this._addGlobalListener();
                    const n =
                      t > 0
                        ? this._scrolled.pipe(w_(t)).subscribe(e)
                        : this._scrolled.subscribe(e);
                    return (
                      this._scrolledCount++,
                      () => {
                        n.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : Qu();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((t, e) => this.deregister(e)),
                this._scrolled.complete();
            }
            ancestorScrolled(t, e) {
              const n = this.getAncestorScrollContainers(t);
              return this.scrolled(e).pipe(ud((t) => !t || n.indexOf(t) > -1));
            }
            getAncestorScrollContainers(t) {
              const e = [];
              return (
                this.scrollContainers.forEach((n, i) => {
                  this._scrollableContainsElement(i, t) && e.push(i);
                }),
                e
              );
            }
            _getDocument() {
              return this._document || document;
            }
            _getWindow() {
              return this._getDocument().defaultView || window;
            }
            _scrollableContainsElement(t, e) {
              let n = e.nativeElement,
                i = t.getElementRef().nativeElement;
              do {
                if (n == i) return !0;
              } while ((n = n.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                Fg(this._getWindow().document, "scroll").subscribe(() =>
                  this._scrolled.next()
                )
              );
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(),
                (this._globalSubscription = null));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Hl), Gt(Ad), Gt(pc, 8));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Hl), Gt(Ad), Gt(pc, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Q_ = (() => {
          class t {
            constructor(t, e, n, i) {
              (this.elementRef = t),
                (this.scrollDispatcher = e),
                (this.ngZone = n),
                (this.dir = i),
                (this._destroyed = new E()),
                (this._elementScrolled = new y((t) =>
                  this.ngZone.runOutsideAngular(() =>
                    Fg(this.elementRef.nativeElement, "scroll")
                      .pipe(Rg(this._destroyed))
                      .subscribe(t)
                  )
                ));
            }
            ngOnInit() {
              this.scrollDispatcher.register(this);
            }
            ngOnDestroy() {
              this.scrollDispatcher.deregister(this),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            elementScrolled() {
              return this._elementScrolled;
            }
            getElementRef() {
              return this.elementRef;
            }
            scrollTo(t) {
              const e = this.elementRef.nativeElement,
                n = this.dir && "rtl" == this.dir.value;
              null == t.left && (t.left = n ? t.end : t.start),
                null == t.right && (t.right = n ? t.start : t.end),
                null != t.bottom &&
                  (t.top = e.scrollHeight - e.clientHeight - t.bottom),
                n && 0 != Pd()
                  ? (null != t.left &&
                      (t.right = e.scrollWidth - e.clientWidth - t.left),
                    2 == Pd()
                      ? (t.left = t.right)
                      : 1 == Pd() && (t.left = t.right ? -t.right : t.right))
                  : null != t.right &&
                    (t.left = e.scrollWidth - e.clientWidth - t.right),
                this._applyScrollToOptions(t);
            }
            _applyScrollToOptions(t) {
              const e = this.elementRef.nativeElement;
              "object" == typeof document &&
              "scrollBehavior" in document.documentElement.style
                ? e.scrollTo(t)
                : (null != t.top && (e.scrollTop = t.top),
                  null != t.left && (e.scrollLeft = t.left));
            }
            measureScrollOffset(t) {
              const e = this.elementRef.nativeElement;
              if ("top" == t) return e.scrollTop;
              if ("bottom" == t)
                return e.scrollHeight - e.clientHeight - e.scrollTop;
              const n = this.dir && "rtl" == this.dir.value;
              return (
                "start" == t
                  ? (t = n ? "right" : "left")
                  : "end" == t && (t = n ? "left" : "right"),
                n && 2 == Pd()
                  ? "left" == t
                    ? e.scrollWidth - e.clientWidth - e.scrollLeft
                    : e.scrollLeft
                  : n && 1 == Pd()
                  ? "left" == t
                    ? e.scrollLeft + e.scrollWidth - e.clientWidth
                    : -e.scrollLeft
                  : "left" == t
                  ? e.scrollLeft
                  : e.scrollWidth - e.clientWidth - e.scrollLeft
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(aa), io(Z_), io(Hl), io(Yd, 8));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["", "cdk-scrollable", ""],
                ["", "cdkScrollable", ""],
              ],
            })),
            t
          );
        })(),
        Y_ = (() => {
          class t {
            constructor(t, e, n) {
              (this._platform = t),
                (this._document = n),
                e.runOutsideAngular(() => {
                  const e = this._getWindow();
                  (this._change = t.isBrowser
                    ? U(Fg(e, "resize"), Fg(e, "orientationchange"))
                    : Qu()),
                    (this._invalidateCache = this.change().subscribe(() =>
                      this._updateViewportSize()
                    ));
                });
            }
            ngOnDestroy() {
              this._invalidateCache.unsubscribe();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), t;
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                { width: e, height: n } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + n,
                right: t.left + e,
                height: n,
                width: e,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const t = this._getDocument(),
                e = this._getWindow(),
                n = t.documentElement,
                i = n.getBoundingClientRect();
              return {
                top:
                  -i.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                left:
                  -i.left ||
                  t.body.scrollLeft ||
                  e.scrollX ||
                  n.scrollLeft ||
                  0,
              };
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe(w_(t)) : this._change;
            }
            _getDocument() {
              return this._document || document;
            }
            _getWindow() {
              return this._getDocument().defaultView || window;
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: t.innerWidth, height: t.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Ad), Gt(Hl), Gt(pc, 8));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Ad), Gt(Hl), Gt(pc, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        X_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Xd, Td], Xd],
            })),
            t
          );
        })();
      const J_ = ["*"];
      function ty(t, e) {
        if (1 & t) {
          const t = uo();
          oo(0, "div", 2),
            fo("click", function () {
              return We(t), bo()._onBackdropClicked();
            }),
            ao();
        }
        2 & t && Oo("mat-drawer-shown", bo()._isShowingBackdrop());
      }
      function ey(t, e) {
        1 & t && (oo(0, "mat-drawer-content"), Co(1, 2), ao());
      }
      const ny = [[["mat-drawer"]], [["mat-drawer-content"]], "*"],
        iy = ["mat-drawer", "mat-drawer-content", "*"];
      function ry(t, e) {
        if (1 & t) {
          const t = uo();
          oo(0, "div", 2),
            fo("click", function () {
              return We(t), bo()._onBackdropClicked();
            }),
            ao();
        }
        2 & t && Oo("mat-drawer-shown", bo()._isShowingBackdrop());
      }
      function sy(t, e) {
        1 & t && (oo(0, "mat-sidenav-content", 3), Co(1, 2), ao());
      }
      const oy = [[["mat-sidenav"]], [["mat-sidenav-content"]], "*"],
        ay = ["mat-sidenav", "mat-sidenav-content", "*"],
        ly = {
          transformDrawer: ip("transform", [
            ap(
              "open, open-instant",
              op({ transform: "none", visibility: "visible" })
            ),
            ap("void", op({ "box-shadow": "none", visibility: "hidden" })),
            lp("void => open-instant", rp("0ms")),
            lp(
              "void <=> open, open-instant => void",
              rp("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")
            ),
          ]),
        };
      function cy(t) {
        throw Error(`A drawer was already declared for 'position="${t}"'`);
      }
      const hy = new Lt("MAT_DRAWER_DEFAULT_AUTOSIZE", {
          providedIn: "root",
          factory: function () {
            return !1;
          },
        }),
        uy = new Lt("MAT_DRAWER_CONTAINER");
      let dy = (() => {
          class t extends Q_ {
            constructor(t, e, n, i, r) {
              super(n, i, r),
                (this._changeDetectorRef = t),
                (this._container = e);
            }
            ngAfterContentInit() {
              this._container._contentMarginChanges.subscribe(() => {
                this._changeDetectorRef.markForCheck();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(As),
                io(Ct(() => fy)),
                io(aa),
                io(Z_),
                io(Hl)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-drawer-content"]],
              hostAttrs: [1, "mat-drawer-content"],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  To("margin-left", e._container._contentMargins.left, "px")(
                    "margin-right",
                    e._container._contentMargins.right,
                    "px"
                  );
              },
              features: [Ho],
              ngContentSelectors: J_,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (wo(), Co(0));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        py = (() => {
          class t {
            constructor(t, e, n, i, r, s, o) {
              var a;
              (this._elementRef = t),
                (this._focusTrapFactory = e),
                (this._focusMonitor = n),
                (this._platform = i),
                (this._ngZone = r),
                (this._doc = s),
                (this._container = o),
                (this._elementFocusedBeforeDrawerWasOpened = null),
                (this._enableAnimations = !1),
                (this._position = "start"),
                (this._mode = "over"),
                (this._disableClose = !1),
                (this._opened = !1),
                (this._animationStarted = new E()),
                (this._animationEnd = new E()),
                (this._animationState = "void"),
                (this.openedChange = new Ya(!0)),
                (this._destroyed = new E()),
                (this.onPositionChanged = new Ya()),
                (this._modeChanged = new E()),
                this.openedChange.subscribe((t) => {
                  t
                    ? (this._doc &&
                        (this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement),
                      this._takeFocus())
                    : this._restoreFocus();
                }),
                this._ngZone.runOutsideAngular(() => {
                  Fg(this._elementRef.nativeElement, "keydown")
                    .pipe(
                      ud(
                        (t) => 27 === t.keyCode && !this.disableClose && !Yu(t)
                      ),
                      Rg(this._destroyed)
                    )
                    .subscribe((t) =>
                      this._ngZone.run(() => {
                        this.close(), t.stopPropagation(), t.preventDefault();
                      })
                    );
                }),
                this._animationEnd
                  .pipe(
                    ((a = (t, e) =>
                      t.fromState === e.fromState && t.toState === e.toState),
                    (t) => t.lift(new G_(a, void 0)))
                  )
                  .subscribe((t) => {
                    const { fromState: e, toState: n } = t;
                    ((0 === n.indexOf("open") && "void" === e) ||
                      ("void" === n && 0 === e.indexOf("open"))) &&
                      this.openedChange.emit(this._opened);
                  });
            }
            get position() {
              return this._position;
            }
            set position(t) {
              (t = "end" === t ? "end" : "start") != this._position &&
                ((this._position = t), this.onPositionChanged.emit());
            }
            get mode() {
              return this._mode;
            }
            set mode(t) {
              (this._mode = t),
                this._updateFocusTrapState(),
                this._modeChanged.next();
            }
            get disableClose() {
              return this._disableClose;
            }
            set disableClose(t) {
              this._disableClose = vd(t);
            }
            get autoFocus() {
              const t = this._autoFocus;
              return null == t ? "side" !== this.mode : t;
            }
            set autoFocus(t) {
              this._autoFocus = vd(t);
            }
            get opened() {
              return this._opened;
            }
            set opened(t) {
              this.toggle(vd(t));
            }
            get _openedStream() {
              return this.openedChange.pipe(
                ud((t) => t),
                N(() => {})
              );
            }
            get openedStart() {
              return this._animationStarted.pipe(
                ud(
                  (t) =>
                    t.fromState !== t.toState && 0 === t.toState.indexOf("open")
                ),
                N(() => {})
              );
            }
            get _closedStream() {
              return this.openedChange.pipe(
                ud((t) => !t),
                N(() => {})
              );
            }
            get closedStart() {
              return this._animationStarted.pipe(
                ud((t) => t.fromState !== t.toState && "void" === t.toState),
                N(() => {})
              );
            }
            _takeFocus() {
              this.autoFocus &&
                this._focusTrap &&
                this._focusTrap.focusInitialElementWhenReady().then((t) => {
                  t ||
                    "function" != typeof this._elementRef.nativeElement.focus ||
                    this._elementRef.nativeElement.focus();
                });
            }
            _restoreFocus() {
              if (!this.autoFocus) return;
              const t = this._doc && this._doc.activeElement;
              t &&
                this._elementRef.nativeElement.contains(t) &&
                (this._elementFocusedBeforeDrawerWasOpened
                  ? this._focusMonitor.focusVia(
                      this._elementFocusedBeforeDrawerWasOpened,
                      this._openedVia
                    )
                  : this._elementRef.nativeElement.blur()),
                (this._elementFocusedBeforeDrawerWasOpened = null),
                (this._openedVia = null);
            }
            ngAfterContentInit() {
              (this._focusTrap = this._focusTrapFactory.create(
                this._elementRef.nativeElement
              )),
                this._updateFocusTrapState();
            }
            ngAfterContentChecked() {
              this._platform.isBrowser && (this._enableAnimations = !0);
            }
            ngOnDestroy() {
              this._focusTrap && this._focusTrap.destroy(),
                this._animationStarted.complete(),
                this._animationEnd.complete(),
                this._modeChanged.complete(),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            open(t) {
              return this.toggle(!0, t);
            }
            close() {
              return this.toggle(!1);
            }
            toggle(t = !this.opened, e = "program") {
              return (
                (this._opened = t),
                t
                  ? ((this._animationState = this._enableAnimations
                      ? "open"
                      : "open-instant"),
                    (this._openedVia = e))
                  : ((this._animationState = "void"), this._restoreFocus()),
                this._updateFocusTrapState(),
                new Promise((t) => {
                  this.openedChange
                    .pipe(_d(1))
                    .subscribe((e) => t(e ? "open" : "close"));
                })
              );
            }
            get _width() {
              return (
                (this._elementRef.nativeElement &&
                  this._elementRef.nativeElement.offsetWidth) ||
                0
              );
            }
            _updateFocusTrapState() {
              this._focusTrap &&
                (this._focusTrap.enabled = this.opened && "side" !== this.mode);
            }
            _animationStartListener(t) {
              this._animationStarted.next(t);
            }
            _animationDoneListener(t) {
              this._animationEnd.next(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(aa),
                io(qd),
                io(Gd),
                io(Ad),
                io(Hl),
                io(pc, 8),
                io(uy, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-drawer"]],
              hostAttrs: ["tabIndex", "-1", 1, "mat-drawer"],
              hostVars: 12,
              hostBindings: function (t, e) {
                1 & t &&
                  mo("@transform.start", function (t) {
                    return e._animationStartListener(t);
                  })("@transform.done", function (t) {
                    return e._animationDoneListener(t);
                  }),
                  2 & t &&
                    (to("align", null),
                    Bo("@transform", e._animationState),
                    Oo("mat-drawer-end", "end" === e.position)(
                      "mat-drawer-over",
                      "over" === e.mode
                    )("mat-drawer-push", "push" === e.mode)(
                      "mat-drawer-side",
                      "side" === e.mode
                    )("mat-drawer-opened", e.opened));
              },
              inputs: {
                position: "position",
                mode: "mode",
                disableClose: "disableClose",
                autoFocus: "autoFocus",
                opened: "opened",
              },
              outputs: {
                openedChange: "openedChange",
                onPositionChanged: "positionChanged",
                _openedStream: "opened",
                openedStart: "openedStart",
                _closedStream: "closed",
                closedStart: "closedStart",
              },
              exportAs: ["matDrawer"],
              ngContentSelectors: J_,
              decls: 2,
              vars: 0,
              consts: [[1, "mat-drawer-inner-container"]],
              template: function (t, e) {
                1 & t && (wo(), oo(0, "div", 0), Co(1), ao());
              },
              encapsulation: 2,
              data: { animation: [ly.transformDrawer] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        fy = (() => {
          class t {
            constructor(t, e, n, i, r, s = !1, o) {
              (this._dir = t),
                (this._element = e),
                (this._ngZone = n),
                (this._changeDetectorRef = i),
                (this._animationMode = o),
                (this._drawers = new Ja()),
                (this.backdropClick = new Ya()),
                (this._destroyed = new E()),
                (this._doCheckSubject = new E()),
                (this._contentMargins = { left: null, right: null }),
                (this._contentMarginChanges = new E()),
                t &&
                  t.change.pipe(Rg(this._destroyed)).subscribe(() => {
                    this._validateDrawers(), this.updateContentMargins();
                  }),
                r
                  .change()
                  .pipe(Rg(this._destroyed))
                  .subscribe(() => this.updateContentMargins()),
                (this._autosize = s);
            }
            get start() {
              return this._start;
            }
            get end() {
              return this._end;
            }
            get autosize() {
              return this._autosize;
            }
            set autosize(t) {
              this._autosize = vd(t);
            }
            get hasBackdrop() {
              return null == this._backdropOverride
                ? !this._start ||
                    "side" !== this._start.mode ||
                    !this._end ||
                    "side" !== this._end.mode
                : this._backdropOverride;
            }
            set hasBackdrop(t) {
              this._backdropOverride = null == t ? null : vd(t);
            }
            get scrollable() {
              return this._userContent || this._content;
            }
            ngAfterContentInit() {
              this._allDrawers.changes
                .pipe(ep(this._allDrawers), Rg(this._destroyed))
                .subscribe((t) => {
                  this._drawers.reset(
                    t.filter((t) => !t._container || t._container === this)
                  ),
                    this._drawers.notifyOnChanges();
                }),
                this._drawers.changes.pipe(ep(null)).subscribe(() => {
                  this._validateDrawers(),
                    this._drawers.forEach((t) => {
                      this._watchDrawerToggle(t),
                        this._watchDrawerPosition(t),
                        this._watchDrawerMode(t);
                    }),
                    (!this._drawers.length ||
                      this._isDrawerOpen(this._start) ||
                      this._isDrawerOpen(this._end)) &&
                      this.updateContentMargins(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._doCheckSubject
                  .pipe(ad(10), Rg(this._destroyed))
                  .subscribe(() => this.updateContentMargins());
            }
            ngOnDestroy() {
              this._contentMarginChanges.complete(),
                this._doCheckSubject.complete(),
                this._drawers.destroy(),
                this._destroyed.next(),
                this._destroyed.complete();
            }
            open() {
              this._drawers.forEach((t) => t.open());
            }
            close() {
              this._drawers.forEach((t) => t.close());
            }
            updateContentMargins() {
              let t = 0,
                e = 0;
              if (this._left && this._left.opened)
                if ("side" == this._left.mode) t += this._left._width;
                else if ("push" == this._left.mode) {
                  const n = this._left._width;
                  (t += n), (e -= n);
                }
              if (this._right && this._right.opened)
                if ("side" == this._right.mode) e += this._right._width;
                else if ("push" == this._right.mode) {
                  const n = this._right._width;
                  (e += n), (t -= n);
                }
              (t = t || null),
                (e = e || null),
                (t === this._contentMargins.left &&
                  e === this._contentMargins.right) ||
                  ((this._contentMargins = { left: t, right: e }),
                  this._ngZone.run(() =>
                    this._contentMarginChanges.next(this._contentMargins)
                  ));
            }
            ngDoCheck() {
              this._autosize &&
                this._isPushed() &&
                this._ngZone.runOutsideAngular(() =>
                  this._doCheckSubject.next()
                );
            }
            _watchDrawerToggle(t) {
              t._animationStarted
                .pipe(
                  ud((t) => t.fromState !== t.toState),
                  Rg(this._drawers.changes)
                )
                .subscribe((t) => {
                  "open-instant" !== t.toState &&
                    "NoopAnimations" !== this._animationMode &&
                    this._element.nativeElement.classList.add(
                      "mat-drawer-transition"
                    ),
                    this.updateContentMargins(),
                    this._changeDetectorRef.markForCheck();
                }),
                "side" !== t.mode &&
                  t.openedChange
                    .pipe(Rg(this._drawers.changes))
                    .subscribe(() => this._setContainerClass(t.opened));
            }
            _watchDrawerPosition(t) {
              t &&
                t.onPositionChanged
                  .pipe(Rg(this._drawers.changes))
                  .subscribe(() => {
                    this._ngZone.onMicrotaskEmpty
                      .asObservable()
                      .pipe(_d(1))
                      .subscribe(() => {
                        this._validateDrawers();
                      });
                  });
            }
            _watchDrawerMode(t) {
              t &&
                t._modeChanged
                  .pipe(Rg(U(this._drawers.changes, this._destroyed)))
                  .subscribe(() => {
                    this.updateContentMargins(),
                      this._changeDetectorRef.markForCheck();
                  });
            }
            _setContainerClass(t) {
              const e = this._element.nativeElement.classList,
                n = "mat-drawer-container-has-open";
              t ? e.add(n) : e.remove(n);
            }
            _validateDrawers() {
              (this._start = this._end = null),
                this._drawers.forEach((t) => {
                  "end" == t.position
                    ? (null != this._end && cy("end"), (this._end = t))
                    : (null != this._start && cy("start"), (this._start = t));
                }),
                (this._right = this._left = null),
                this._dir && "rtl" === this._dir.value
                  ? ((this._left = this._end), (this._right = this._start))
                  : ((this._left = this._start), (this._right = this._end));
            }
            _isPushed() {
              return (
                (this._isDrawerOpen(this._start) &&
                  "over" != this._start.mode) ||
                (this._isDrawerOpen(this._end) && "over" != this._end.mode)
              );
            }
            _onBackdropClicked() {
              this.backdropClick.emit(), this._closeModalDrawer();
            }
            _closeModalDrawer() {
              [this._start, this._end]
                .filter((t) => t && !t.disableClose && this._canHaveBackdrop(t))
                .forEach((t) => t.close());
            }
            _isShowingBackdrop() {
              return (
                (this._isDrawerOpen(this._start) &&
                  this._canHaveBackdrop(this._start)) ||
                (this._isDrawerOpen(this._end) &&
                  this._canHaveBackdrop(this._end))
              );
            }
            _canHaveBackdrop(t) {
              return "side" !== t.mode || !!this._backdropOverride;
            }
            _isDrawerOpen(t) {
              return null != t && t.opened;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(Yd, 8),
                io(aa),
                io(Hl),
                io(As),
                io(Y_),
                io(hy),
                io(wm, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-drawer-container"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t && (dl(n, dy, !0), dl(n, py, !0)),
                  2 & t &&
                    (ll((i = ml())) && (e._content = i.first),
                    ll((i = ml())) && (e._allDrawers = i));
              },
              viewQuery: function (t, e) {
                var n;
                1 & t && hl(dy, !0),
                  2 & t && ll((n = ml())) && (e._userContent = n.first);
              },
              hostAttrs: [1, "mat-drawer-container"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t &&
                  Oo(
                    "mat-drawer-container-explicit-backdrop",
                    e._backdropOverride
                  );
              },
              inputs: { autosize: "autosize", hasBackdrop: "hasBackdrop" },
              outputs: { backdropClick: "backdropClick" },
              exportAs: ["matDrawerContainer"],
              features: [ia([{ provide: uy, useExisting: t }])],
              ngContentSelectors: iy,
              decls: 4,
              vars: 2,
              consts: [
                [
                  "class",
                  "mat-drawer-backdrop",
                  3,
                  "mat-drawer-shown",
                  "click",
                  4,
                  "ngIf",
                ],
                [4, "ngIf"],
                [1, "mat-drawer-backdrop", 3, "click"],
              ],
              template: function (t, e) {
                1 & t &&
                  (wo(ny),
                  no(0, ty, 1, 2, "div", 0),
                  Co(1),
                  Co(2, 1),
                  no(3, ey, 2, 0, "mat-drawer-content", 1)),
                  2 & t &&
                    (ro("ngIf", e.hasBackdrop), tr(3), ro("ngIf", !e._content));
              },
              directives: [Mc, dy],
              styles: [
                ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        my = (() => {
          class t extends dy {
            constructor(t, e, n, i, r) {
              super(t, e, n, i, r);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                io(As),
                io(Ct(() => yy)),
                io(aa),
                io(Z_),
                io(Hl)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-sidenav-content"]],
              hostAttrs: [1, "mat-drawer-content", "mat-sidenav-content"],
              hostVars: 4,
              hostBindings: function (t, e) {
                2 & t &&
                  To("margin-left", e._container._contentMargins.left, "px")(
                    "margin-right",
                    e._container._contentMargins.right,
                    "px"
                  );
              },
              features: [Ho],
              ngContentSelectors: J_,
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && (wo(), Co(0));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        gy = (() => {
          class t extends py {
            constructor() {
              super(...arguments),
                (this._fixedInViewport = !1),
                (this._fixedTopGap = 0),
                (this._fixedBottomGap = 0);
            }
            get fixedInViewport() {
              return this._fixedInViewport;
            }
            set fixedInViewport(t) {
              this._fixedInViewport = vd(t);
            }
            get fixedTopGap() {
              return this._fixedTopGap;
            }
            set fixedTopGap(t) {
              this._fixedTopGap = wd(t);
            }
            get fixedBottomGap() {
              return this._fixedBottomGap;
            }
            set fixedBottomGap(t) {
              this._fixedBottomGap = wd(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return _y(e || t);
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-sidenav"]],
              hostAttrs: ["tabIndex", "-1", 1, "mat-drawer", "mat-sidenav"],
              hostVars: 17,
              hostBindings: function (t, e) {
                2 & t &&
                  (to("align", null),
                  To("top", e.fixedInViewport ? e.fixedTopGap : null, "px")(
                    "bottom",
                    e.fixedInViewport ? e.fixedBottomGap : null,
                    "px"
                  ),
                  Oo("mat-drawer-end", "end" === e.position)(
                    "mat-drawer-over",
                    "over" === e.mode
                  )("mat-drawer-push", "push" === e.mode)(
                    "mat-drawer-side",
                    "side" === e.mode
                  )("mat-drawer-opened", e.opened)(
                    "mat-sidenav-fixed",
                    e.fixedInViewport
                  ));
              },
              inputs: {
                fixedInViewport: "fixedInViewport",
                fixedTopGap: "fixedTopGap",
                fixedBottomGap: "fixedBottomGap",
              },
              exportAs: ["matSidenav"],
              features: [Ho],
              ngContentSelectors: J_,
              decls: 2,
              vars: 0,
              consts: [[1, "mat-drawer-inner-container"]],
              template: function (t, e) {
                1 & t && (wo(), oo(0, "div", 0), Co(1), ao());
              },
              encapsulation: 2,
              data: { animation: [ly.transformDrawer] },
              changeDetection: 0,
            })),
            t
          );
        })();
      const _y = Qn(gy);
      let yy = (() => {
        class t extends fy {}
        return (
          (t.ɵfac = function (e) {
            return by(e || t);
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["mat-sidenav-container"]],
            contentQueries: function (t, e, n) {
              var i;
              1 & t && (dl(n, my, !0), dl(n, gy, !0)),
                2 & t &&
                  (ll((i = ml())) && (e._content = i.first),
                  ll((i = ml())) && (e._allDrawers = i));
            },
            hostAttrs: [1, "mat-drawer-container", "mat-sidenav-container"],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t &&
                Oo(
                  "mat-drawer-container-explicit-backdrop",
                  e._backdropOverride
                );
            },
            exportAs: ["matSidenavContainer"],
            features: [ia([{ provide: uy, useExisting: t }]), Ho],
            ngContentSelectors: ay,
            decls: 4,
            vars: 2,
            consts: [
              [
                "class",
                "mat-drawer-backdrop",
                3,
                "mat-drawer-shown",
                "click",
                4,
                "ngIf",
              ],
              ["cdkScrollable", "", 4, "ngIf"],
              [1, "mat-drawer-backdrop", 3, "click"],
              ["cdkScrollable", ""],
            ],
            template: function (t, e) {
              1 & t &&
                (wo(oy),
                no(0, ry, 1, 2, "div", 0),
                Co(1),
                Co(2, 1),
                no(3, sy, 2, 0, "mat-sidenav-content", 1)),
                2 & t &&
                  (ro("ngIf", e.hasBackdrop), tr(3), ro("ngIf", !e._content));
            },
            directives: [Mc, my, Q_],
            styles: [
              ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n",
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        );
      })();
      const by = Qn(yy);
      let vy = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ht({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[zc, Am, X_, Td], Am],
          })),
          t
        );
      })();
      const wy = ["*", [["mat-card-footer"]]],
        Cy = ["*", "mat-card-footer"];
      let Ey = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["mat-card-content"],
                ["", "mat-card-content", ""],
                ["", "matCardContent", ""],
              ],
              hostAttrs: [1, "mat-card-content"],
            })),
            t
          );
        })(),
        xy = (() => {
          class t {
            constructor() {
              this.align = "start";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-card-actions"]],
              hostAttrs: [1, "mat-card-actions"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && Oo("mat-card-actions-align-end", "end" === e.align);
              },
              inputs: { align: "align" },
              exportAs: ["matCardActions"],
            })),
            t
          );
        })(),
        ky = (() => {
          class t {
            constructor(t) {
              this._animationMode = t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(wm, 8));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-card"]],
              hostAttrs: [1, "mat-card", "mat-focus-indicator"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t &&
                  Oo(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  );
              },
              exportAs: ["matCard"],
              ngContentSelectors: Cy,
              decls: 2,
              vars: 0,
              template: function (t, e) {
                1 & t && (wo(wy), Co(0), Co(1, 1));
              },
              styles: [
                ".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        Sy = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am], Am],
            })),
            t
          );
        })();
      function Ay(t, e) {}
      let Ty = (() => {
          class t {
            constructor(t) {
              this.componentFactoryResolver = t;
            }
            clearChat() {
              this.chatHost.viewContainerRef.clear();
            }
            loadChat() {
              const t = this.componentFactoryResolver.resolveComponentFactory(
                  B_
                ),
                e = this.chatHost.viewContainerRef;
              e.clear(), (e.createComponent(t).instance.parent = this);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(oa));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-root"]],
              viewQuery: function (t, e) {
                var n;
                1 & t && cl(bh, !0),
                  2 & t && ll((n = ml())) && (e.chatHost = n.first);
              },
              decls: 22,
              vars: 3,
              consts: [
                [1, "fcc-layout"],
                ["color", "primary"],
                [1, "app-name"],
                [1, "spacer"],
                [1, "sidenav-container"],
                [1, "detail"],
                [1, "user-id-field"],
                ["matInput", "", "type", "text", 3, "ngModel", "ngModelChange"],
                ["mat-raised-button", "", "color", "primary", 3, "click"],
                ["appChatHost", ""],
              ],
              template: function (t, e) {
                1 & t &&
                  (oo(0, "div", 0),
                  oo(1, "mat-toolbar", 1),
                  oo(2, "div", 2),
                  No(
                    3,
                    "Rasa Advanced Certification - Custom Channel (Web Socket)"
                  ),
                  ao(),
                  lo(4, "span", 3),
                  ao(),
                  oo(5, "mat-sidenav-container", 4),
                  oo(6, "mat-sidenav-content"),
                  oo(7, "div"),
                  oo(8, "mat-card", 5),
                  oo(9, "mat-card-content"),
                  oo(10, "h4"),
                  No(11, "Simulate single signon (SSO)"),
                  ao(),
                  oo(12, "mat-form-field", 6),
                  oo(13, "mat-label"),
                  No(14, "Set 'sys_id' from ServiceNow and click \"Chat\""),
                  ao(),
                  oo(15, "input", 7),
                  fo("ngModelChange", function (t) {
                    return (e.userId = t);
                  }),
                  ao(),
                  ao(),
                  ao(),
                  oo(16, "mat-card-actions"),
                  oo(17, "button", 8),
                  fo("click", function () {
                    return e.loadChat();
                  }),
                  oo(18, "mat-icon"),
                  No(19, "chat"),
                  ao(),
                  No(20, "\xa0Chat "),
                  ao(),
                  ao(),
                  ao(),
                  ao(),
                  no(21, Ay, 0, 0, "ng-template", 9),
                  ao(),
                  ao(),
                  ao()),
                  2 & t &&
                    (tr(5),
                    To("margin-top", 0, "px"),
                    tr(10),
                    ro("ngModel", e.userId));
              },
              directives: [
                U_,
                yy,
                my,
                ky,
                Ey,
                m_,
                o_,
                I_,
                Ah,
                Rh,
                Nu,
                xy,
                Ym,
                Ig,
                bh,
              ],
              styles: [
                ".mat-toolbar.mat-primary[_ngcontent-%COMP%]{background:#fff;border-bottom:1px solid rgba(0,0,0,.2)}.mat-toolbar-row[_ngcontent-%COMP%], .mat-toolbar-single-row[_ngcontent-%COMP%]{height:56px}.mat-drawer-container[_ngcontent-%COMP%]{flex:1;background:#fff}.mat-drawer-content[_ngcontent-%COMP%]{display:flex;flex-direction:column}.app-name[_ngcontent-%COMP%]{margin-left:4px;color:#5c6bc0}.fcc-sidenav-button[_ngcontent-%COMP%]{width:200px;text-align:left}.fcc-layout[_ngcontent-%COMP%]{display:flex;flex:1;flex-direction:column}.mat-drawer-side[_ngcontent-%COMP%]{border:0}.mat-list[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{height:36px}.nav-menu-selected-item[_ngcontent-%COMP%]{background:rgba(249,168,37,.2);border-bottom-right-radius:24px;border-top-right-radius:24px}.detail[_ngcontent-%COMP%]{margin:4px}.user-id-field[_ngcontent-%COMP%]{width:400px}.mat-card-actions[_ngcontent-%COMP%]{margin:0;text-align:right}.mat-card[_ngcontent-%COMP%] > .mat-card-actions[_ngcontent-%COMP%]:last-child{margin-bottom:0}.mat-card-content[_ngcontent-%COMP%]{margin-left:16px}@media (max-width:479px){.detail[_ngcontent-%COMP%]{margin-top:16px;margin-left:16px;margin-right:16px}}",
              ],
            })),
            t
          );
        })(),
        Oy = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        Iy = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am, zc], Am],
            })),
            t
          );
        })();
      function Dy() {
        throw Error("Host already has a portal attached");
      }
      class Fy {
        attach(t) {
          return (
            null == t &&
              (function () {
                throw Error(
                  "Attempting to attach a portal to a null PortalOutlet"
                );
              })(),
            t.hasAttached() && Dy(),
            (this._attachedHost = t),
            t.attach(this)
          );
        }
        detach() {
          let t = this._attachedHost;
          null == t
            ? (function () {
                throw Error(
                  "Attempting to detach a portal that is not attached to a host"
                );
              })()
            : ((this._attachedHost = null), t.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class Ry extends Fy {
        constructor(t, e, n, i) {
          super(),
            (this.component = t),
            (this.viewContainerRef = e),
            (this.injector = n),
            (this.componentFactoryResolver = i);
        }
      }
      class Py extends Fy {
        constructor(t, e, n) {
          super(),
            (this.templateRef = t),
            (this.viewContainerRef = e),
            (this.context = n);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(t, e = this.context) {
          return (this.context = e), super.attach(t);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class Ny extends Fy {
        constructor(t) {
          super(), (this.element = t instanceof aa ? t.nativeElement : t);
        }
      }
      class My {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(t) {
          return (
            t ||
              (function () {
                throw Error("Must provide a portal to attach");
              })(),
            this.hasAttached() && Dy(),
            this._isDisposed &&
              (function () {
                throw Error("This PortalOutlet has already been disposed");
              })(),
            t instanceof Ry
              ? ((this._attachedPortal = t), this.attachComponentPortal(t))
              : t instanceof Py
              ? ((this._attachedPortal = t), this.attachTemplatePortal(t))
              : this.attachDomPortal && t instanceof Ny
              ? ((this._attachedPortal = t), this.attachDomPortal(t))
              : void (function () {
                  throw Error(
                    "Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal."
                  );
                })()
          );
        }
        detach() {
          this._attachedPortal &&
            (this._attachedPortal.setAttachedHost(null),
            (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(),
            this._invokeDisposeFn(),
            (this._isDisposed = !0);
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      }
      class Ly extends My {
        constructor(t, e, n, i, r) {
          super(),
            (this.outletElement = t),
            (this._componentFactoryResolver = e),
            (this._appRef = n),
            (this._defaultInjector = i),
            (this.attachDomPortal = (t) => {
              if (!this._document)
                throw Error(
                  "Cannot attach DOM portal without _document constructor parameter"
                );
              const e = t.element;
              if (!e.parentNode)
                throw Error(
                  "DOM portal content must be attached to a parent node."
                );
              const n = this._document.createComment("dom-portal");
              e.parentNode.insertBefore(n, e),
                this.outletElement.appendChild(e),
                super.setDisposeFn(() => {
                  n.parentNode && n.parentNode.replaceChild(e, n);
                });
            }),
            (this._document = r);
        }
        attachComponentPortal(t) {
          const e = (
            t.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(t.component);
          let n;
          return (
            t.viewContainerRef
              ? ((n = t.viewContainerRef.createComponent(
                  e,
                  t.viewContainerRef.length,
                  t.injector || t.viewContainerRef.injector
                )),
                this.setDisposeFn(() => n.destroy()))
              : ((n = e.create(t.injector || this._defaultInjector)),
                this._appRef.attachView(n.hostView),
                this.setDisposeFn(() => {
                  this._appRef.detachView(n.hostView), n.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(n)),
            n
          );
        }
        attachTemplatePortal(t) {
          let e = t.viewContainerRef,
            n = e.createEmbeddedView(t.templateRef, t.context);
          return (
            n.detectChanges(),
            n.rootNodes.forEach((t) => this.outletElement.appendChild(t)),
            this.setDisposeFn(() => {
              let t = e.indexOf(n);
              -1 !== t && e.remove(t);
            }),
            n
          );
        }
        dispose() {
          super.dispose(),
            null != this.outletElement.parentNode &&
              this.outletElement.parentNode.removeChild(this.outletElement);
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let Vy = (() => {
          class t extends My {
            constructor(t, e, n) {
              super(),
                (this._componentFactoryResolver = t),
                (this._viewContainerRef = e),
                (this._isInitialized = !1),
                (this.attached = new Ya()),
                (this.attachDomPortal = (t) => {
                  if (!this._document)
                    throw Error(
                      "Cannot attach DOM portal without _document constructor parameter"
                    );
                  const e = t.element;
                  if (!e.parentNode)
                    throw Error(
                      "DOM portal content must be attached to a parent node."
                    );
                  const n = this._document.createComment("dom-portal");
                  t.setAttachedHost(this),
                    e.parentNode.insertBefore(n, e),
                    this._getRootNode().appendChild(e),
                    super.setDisposeFn(() => {
                      n.parentNode && n.parentNode.replaceChild(e, n);
                    });
                }),
                (this._document = n);
            }
            get portal() {
              return this._attachedPortal;
            }
            set portal(t) {
              (!this.hasAttached() || t || this._isInitialized) &&
                (this.hasAttached() && super.detach(),
                t && super.attach(t),
                (this._attachedPortal = t));
            }
            get attachedRef() {
              return this._attachedRef;
            }
            ngOnInit() {
              this._isInitialized = !0;
            }
            ngOnDestroy() {
              super.dispose(),
                (this._attachedPortal = null),
                (this._attachedRef = null);
            }
            attachComponentPortal(t) {
              t.setAttachedHost(this);
              const e =
                  null != t.viewContainerRef
                    ? t.viewContainerRef
                    : this._viewContainerRef,
                n = (
                  t.componentFactoryResolver || this._componentFactoryResolver
                ).resolveComponentFactory(t.component),
                i = e.createComponent(n, e.length, t.injector || e.injector);
              return (
                e !== this._viewContainerRef &&
                  this._getRootNode().appendChild(i.hostView.rootNodes[0]),
                super.setDisposeFn(() => i.destroy()),
                (this._attachedPortal = t),
                (this._attachedRef = i),
                this.attached.emit(i),
                i
              );
            }
            attachTemplatePortal(t) {
              t.setAttachedHost(this);
              const e = this._viewContainerRef.createEmbeddedView(
                t.templateRef,
                t.context
              );
              return (
                super.setDisposeFn(() => this._viewContainerRef.clear()),
                (this._attachedPortal = t),
                (this._attachedRef = e),
                this.attached.emit(e),
                e
              );
            }
            _getRootNode() {
              const t = this._viewContainerRef.element.nativeElement;
              return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(oa), io(Ra), io(pc));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "cdkPortalOutlet", ""]],
              inputs: { portal: ["cdkPortalOutlet", "portal"] },
              outputs: { attached: "attached" },
              exportAs: ["cdkPortalOutlet"],
              features: [Ho],
            })),
            t
          );
        })(),
        By = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      class jy {
        constructor(t, e) {
          (this._viewportRuler = t),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = e);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const t = this._document.documentElement;
            (this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = t.style.left || ""),
              (this._previousHTMLStyles.top = t.style.top || ""),
              (t.style.left = Ed(-this._previousScrollPosition.left)),
              (t.style.top = Ed(-this._previousScrollPosition.top)),
              t.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const t = this._document.documentElement,
              e = t.style,
              n = this._document.body.style,
              i = e.scrollBehavior || "",
              r = n.scrollBehavior || "";
            (this._isEnabled = !1),
              (e.left = this._previousHTMLStyles.left),
              (e.top = this._previousHTMLStyles.top),
              t.classList.remove("cdk-global-scrollblock"),
              (e.scrollBehavior = n.scrollBehavior = "auto"),
              window.scroll(
                this._previousScrollPosition.left,
                this._previousScrollPosition.top
              ),
              (e.scrollBehavior = i),
              (n.scrollBehavior = r);
          }
        }
        _canBeEnabled() {
          if (
            this._document.documentElement.classList.contains(
              "cdk-global-scrollblock"
            ) ||
            this._isEnabled
          )
            return !1;
          const t = this._document.body,
            e = this._viewportRuler.getViewportSize();
          return t.scrollHeight > e.height || t.scrollWidth > e.width;
        }
      }
      function Hy() {
        return Error("Scroll strategy has already been attached.");
      }
      class zy {
        constructor(t, e, n, i) {
          (this._scrollDispatcher = t),
            (this._ngZone = e),
            (this._viewportRuler = n),
            (this._config = i),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(t) {
          if (this._overlayRef) throw Hy();
          this._overlayRef = t;
        }
        enable() {
          if (this._scrollSubscription) return;
          const t = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = t.subscribe(() => {
                const t = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(t - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = t.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class qy {
        enable() {}
        disable() {}
        attach() {}
      }
      function $y(t, e) {
        return e.some(
          (e) =>
            t.bottom < e.top ||
            t.top > e.bottom ||
            t.right < e.left ||
            t.left > e.right
        );
      }
      function Uy(t, e) {
        return e.some(
          (e) =>
            t.top < e.top ||
            t.bottom > e.bottom ||
            t.left < e.left ||
            t.right > e.right
        );
      }
      class Wy {
        constructor(t, e, n, i) {
          (this._scrollDispatcher = t),
            (this._viewportRuler = e),
            (this._ngZone = n),
            (this._config = i),
            (this._scrollSubscription = null);
        }
        attach(t) {
          if (this._overlayRef) throw Hy();
          this._overlayRef = t;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if (
                  (this._overlayRef.updatePosition(),
                  this._config && this._config.autoClose)
                ) {
                  const t = this._overlayRef.overlayElement.getBoundingClientRect(),
                    {
                      width: e,
                      height: n,
                    } = this._viewportRuler.getViewportSize();
                  $y(t, [
                    {
                      width: e,
                      height: n,
                      bottom: n,
                      right: e,
                      top: 0,
                      left: 0,
                    },
                  ]) &&
                    (this.disable(),
                    this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let Gy = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._scrollDispatcher = t),
              (this._viewportRuler = e),
              (this._ngZone = n),
              (this.noop = () => new qy()),
              (this.close = (t) =>
                new zy(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  t
                )),
              (this.block = () => new jy(this._viewportRuler, this._document)),
              (this.reposition = (t) =>
                new Wy(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  t
                )),
              (this._document = i);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(Z_), Gt(Y_), Gt(Hl), Gt(pc));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(Gt(Z_), Gt(Y_), Gt(Hl), Gt(pc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class Ky {
        constructor(t) {
          if (
            ((this.scrollStrategy = new qy()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            t)
          ) {
            const e = Object.keys(t);
            for (const n of e) void 0 !== t[n] && (this[n] = t[n]);
          }
        }
      }
      class Zy {
        constructor(t, e, n, i, r) {
          (this.offsetX = n),
            (this.offsetY = i),
            (this.panelClass = r),
            (this.originX = t.originX),
            (this.originY = t.originY),
            (this.overlayX = e.overlayX),
            (this.overlayY = e.overlayY);
        }
      }
      class Qy {
        constructor(t, e) {
          (this.connectionPair = t), (this.scrollableViewProperties = e);
        }
      }
      function Yy(t, e) {
        if ("top" !== e && "bottom" !== e && "center" !== e)
          throw Error(
            `ConnectedPosition: Invalid ${t} "${e}". ` +
              'Expected "top", "bottom" or "center".'
          );
      }
      function Xy(t, e) {
        if ("start" !== e && "end" !== e && "center" !== e)
          throw Error(
            `ConnectedPosition: Invalid ${t} "${e}". ` +
              'Expected "start", "end" or "center".'
          );
      }
      let Jy = (() => {
        class t {
          constructor(t) {
            (this._attachedOverlays = []),
              (this._keydownListener = (t) => {
                const e = this._attachedOverlays;
                for (let n = e.length - 1; n > -1; n--)
                  if (e[n]._keydownEventSubscriptions > 0) {
                    e[n]._keydownEvents.next(t);
                    break;
                  }
              }),
              (this._document = t);
          }
          ngOnDestroy() {
            this._detach();
          }
          add(t) {
            this.remove(t),
              this._isAttached ||
                (this._document.body.addEventListener(
                  "keydown",
                  this._keydownListener
                ),
                (this._isAttached = !0)),
              this._attachedOverlays.push(t);
          }
          remove(t) {
            const e = this._attachedOverlays.indexOf(t);
            e > -1 && this._attachedOverlays.splice(e, 1),
              0 === this._attachedOverlays.length && this._detach();
          }
          _detach() {
            this._isAttached &&
              (this._document.body.removeEventListener(
                "keydown",
                this._keydownListener
              ),
              (this._isAttached = !1));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(pc));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(Gt(pc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      const tb = !(
        "undefined" == typeof window ||
        !window ||
        (!window.__karma__ && !window.jasmine)
      );
      let eb = (() => {
        class t {
          constructor(t, e) {
            (this._platform = e), (this._document = t);
          }
          ngOnDestroy() {
            const t = this._containerElement;
            t && t.parentNode && t.parentNode.removeChild(t);
          }
          getContainerElement() {
            return (
              this._containerElement || this._createContainer(),
              this._containerElement
            );
          }
          _createContainer() {
            const t = this._platform
              ? this._platform.isBrowser
              : "undefined" != typeof window;
            if (t || tb) {
              const t = this._document.querySelectorAll(
                '.cdk-overlay-container[platform="server"], .cdk-overlay-container[platform="test"]'
              );
              for (let e = 0; e < t.length; e++)
                t[e].parentNode.removeChild(t[e]);
            }
            const e = this._document.createElement("div");
            e.classList.add("cdk-overlay-container"),
              tb
                ? e.setAttribute("platform", "test")
                : t || e.setAttribute("platform", "server"),
              this._document.body.appendChild(e),
              (this._containerElement = e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gt(pc), Gt(Ad));
          }),
          (t.ɵprov = ct({
            factory: function () {
              return new t(Gt(pc), Gt(Ad));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class nb {
        constructor(t, e, n, i, r, s, o, a) {
          (this._portalOutlet = t),
            (this._host = e),
            (this._pane = n),
            (this._config = i),
            (this._ngZone = r),
            (this._keyboardDispatcher = s),
            (this._document = o),
            (this._location = a),
            (this._backdropElement = null),
            (this._backdropClick = new E()),
            (this._attachments = new E()),
            (this._detachments = new E()),
            (this._locationChanges = u.EMPTY),
            (this._backdropClickHandler = (t) => this._backdropClick.next(t)),
            (this._keydownEventsObservable = new y((t) => {
              const e = this._keydownEvents.subscribe(t);
              return (
                this._keydownEventSubscriptions++,
                () => {
                  e.unsubscribe(), this._keydownEventSubscriptions--;
                }
              );
            })),
            (this._keydownEvents = new E()),
            (this._keydownEventSubscriptions = 0),
            i.scrollStrategy &&
              ((this._scrollStrategy = i.scrollStrategy),
              this._scrollStrategy.attach(this)),
            (this._positionStrategy = i.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(t) {
          let e = this._portalOutlet.attach(t);
          return (
            !this._host.parentElement &&
              this._previousHostParent &&
              this._previousHostParent.appendChild(this._host),
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable
              .asObservable()
              .pipe(_d(1))
              .subscribe(() => {
                this.hasAttached() && this.updatePosition();
              }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass &&
              this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              this._location &&
              (this._locationChanges = this._location.subscribe(() =>
                this.dispose()
              )),
            e
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy &&
              this._positionStrategy.detach &&
              this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const t = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            t
          );
        }
        dispose() {
          const t = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this.detachBackdrop(),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._host &&
              this._host.parentNode &&
              (this._host.parentNode.removeChild(this._host),
              (this._host = null)),
            (this._previousHostParent = this._pane = null),
            t && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick.asObservable();
        }
        attachments() {
          return this._attachments.asObservable();
        }
        detachments() {
          return this._detachments.asObservable();
        }
        keydownEvents() {
          return this._keydownEventsObservable;
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(t) {
          t !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = t),
            this.hasAttached() && (t.attach(this), this.updatePosition()));
        }
        updateSize(t) {
          (this._config = Object.assign(Object.assign({}, this._config), t)),
            this._updateElementSize();
        }
        setDirection(t) {
          (this._config = Object.assign(Object.assign({}, this._config), {
            direction: t,
          })),
            this._updateElementDirection();
        }
        addPanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !0);
        }
        removePanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !1);
        }
        getDirection() {
          const t = this._config.direction;
          return t ? ("string" == typeof t ? t : t.value) : "ltr";
        }
        updateScrollStrategy(t) {
          t !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = t),
            this.hasAttached() && (t.attach(this), t.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const t = this._pane.style;
          (t.width = Ed(this._config.width)),
            (t.height = Ed(this._config.height)),
            (t.minWidth = Ed(this._config.minWidth)),
            (t.minHeight = Ed(this._config.minHeight)),
            (t.maxWidth = Ed(this._config.maxWidth)),
            (t.maxHeight = Ed(this._config.maxHeight));
        }
        _togglePointerEvents(t) {
          this._pane.style.pointerEvents = t ? "auto" : "none";
        }
        _attachBackdrop() {
          (this._backdropElement = this._document.createElement("div")),
            this._backdropElement.classList.add("cdk-overlay-backdrop"),
            this._config.backdropClass &&
              this._toggleClasses(
                this._backdropElement,
                this._config.backdropClass,
                !0
              ),
            this._host.parentElement.insertBefore(
              this._backdropElement,
              this._host
            ),
            this._backdropElement.addEventListener(
              "click",
              this._backdropClickHandler
            ),
            "undefined" != typeof requestAnimationFrame
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement &&
                      this._backdropElement.classList.add(
                        "cdk-overlay-backdrop-showing"
                      );
                  });
                })
              : this._backdropElement.classList.add(
                  "cdk-overlay-backdrop-showing"
                );
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          let t,
            e = this._backdropElement;
          if (!e) return;
          let n = () => {
            e &&
              (e.removeEventListener("click", this._backdropClickHandler),
              e.removeEventListener("transitionend", n),
              e.parentNode && e.parentNode.removeChild(e)),
              this._backdropElement == e && (this._backdropElement = null),
              this._config.backdropClass &&
                this._toggleClasses(e, this._config.backdropClass, !1),
              clearTimeout(t);
          };
          e.classList.remove("cdk-overlay-backdrop-showing"),
            this._ngZone.runOutsideAngular(() => {
              e.addEventListener("transitionend", n);
            }),
            (e.style.pointerEvents = "none"),
            (t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500)));
        }
        _toggleClasses(t, e, n) {
          const i = t.classList;
          Cd(e).forEach((t) => {
            t && (n ? i.add(t) : i.remove(t));
          });
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const t = this._ngZone.onStable
              .asObservable()
              .pipe(Rg(U(this._attachments, this._detachments)))
              .subscribe(() => {
                (this._pane &&
                  this._host &&
                  0 !== this._pane.children.length) ||
                  (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                      this._pane,
                      this._config.panelClass,
                      !1
                    ),
                  this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._previousHostParent.removeChild(this._host)),
                  t.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const t = this._scrollStrategy;
          t && (t.disable(), t.detach && t.detach());
        }
      }
      const ib = /([A-Za-z%]+)$/;
      class rb {
        constructor(t, e, n, i, r) {
          (this._viewportRuler = e),
            (this._document = n),
            (this._platform = i),
            (this._overlayContainer = r),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new E()),
            (this._resizeSubscription = u.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges.asObservable()),
            this.setOrigin(t);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          if (this._overlayRef && t !== this._overlayRef)
            throw Error(
              "This position strategy is already attached to an overlay"
            );
          this._validatePositions(),
            t.hostElement.classList.add(
              "cdk-overlay-connected-position-bounding-box"
            ),
            (this._overlayRef = t),
            (this._boundingBox = t.hostElement),
            (this._pane = t.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
              .change()
              .subscribe(() => {
                (this._isInitialRender = !0), this.apply();
              }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
          )
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect());
          const t = this._originRect,
            e = this._overlayRect,
            n = this._viewportRect,
            i = [];
          let r;
          for (let s of this._preferredPositions) {
            let o = this._getOriginPoint(t, s),
              a = this._getOverlayPoint(o, e, s),
              l = this._getOverlayFit(a, e, n, s);
            if (l.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(s, o);
            this._canFitWithFlexibleDimensions(l, a, n)
              ? i.push({
                  position: s,
                  origin: o,
                  overlayRect: e,
                  boundingBoxRect: this._calculateBoundingBoxRect(o, s),
                })
              : (!r || r.overlayFit.visibleArea < l.visibleArea) &&
                (r = {
                  overlayFit: l,
                  overlayPoint: a,
                  originPoint: o,
                  position: s,
                  overlayRect: e,
                });
          }
          if (i.length) {
            let t = null,
              e = -1;
            for (const n of i) {
              const i =
                n.boundingBoxRect.width *
                n.boundingBoxRect.height *
                (n.position.weight || 1);
              i > e && ((e = i), (t = n));
            }
            return (
              (this._isPushed = !1),
              void this._applyPosition(t.position, t.origin)
            );
          }
          if (this._canPush)
            return (
              (this._isPushed = !0),
              void this._applyPosition(r.position, r.originPoint)
            );
          this._applyPosition(r.position, r.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              sb(this._boundingBox.style, {
                top: "",
                left: "",
                right: "",
                bottom: "",
                height: "",
                width: "",
                alignItems: "",
                justifyContent: "",
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
              this._overlayRef.hostElement.classList.remove(
                "cdk-overlay-connected-position-bounding-box"
              ),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (
            !this._isDisposed &&
            (!this._platform || this._platform.isBrowser)
          ) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect());
            const t = this._lastPosition || this._preferredPositions[0],
              e = this._getOriginPoint(this._originRect, t);
            this._applyPosition(t, e);
          }
        }
        withScrollableContainers(t) {
          return (this._scrollables = t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t),
            -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(t) {
          return (this._viewportMargin = t), this;
        }
        withFlexibleDimensions(t = !0) {
          return (this._hasFlexibleDimensions = t), this;
        }
        withGrowAfterOpen(t = !0) {
          return (this._growAfterOpen = t), this;
        }
        withPush(t = !0) {
          return (this._canPush = t), this;
        }
        withLockedPosition(t = !0) {
          return (this._positionLocked = t), this;
        }
        setOrigin(t) {
          return (this._origin = t), this;
        }
        withDefaultOffsetX(t) {
          return (this._offsetX = t), this;
        }
        withDefaultOffsetY(t) {
          return (this._offsetY = t), this;
        }
        withTransformOriginOn(t) {
          return (this._transformOriginSelector = t), this;
        }
        _getOriginPoint(t, e) {
          let n, i;
          if ("center" == e.originX) n = t.left + t.width / 2;
          else {
            const i = this._isRtl() ? t.right : t.left,
              r = this._isRtl() ? t.left : t.right;
            n = "start" == e.originX ? i : r;
          }
          return (
            (i =
              "center" == e.originY
                ? t.top + t.height / 2
                : "top" == e.originY
                ? t.top
                : t.bottom),
            { x: n, y: i }
          );
        }
        _getOverlayPoint(t, e, n) {
          let i, r;
          return (
            (i =
              "center" == n.overlayX
                ? -e.width / 2
                : "start" === n.overlayX
                ? this._isRtl()
                  ? -e.width
                  : 0
                : this._isRtl()
                ? 0
                : -e.width),
            (r =
              "center" == n.overlayY
                ? -e.height / 2
                : "top" == n.overlayY
                ? 0
                : -e.height),
            { x: t.x + i, y: t.y + r }
          );
        }
        _getOverlayFit(t, e, n, i) {
          let { x: r, y: s } = t,
            o = this._getOffset(i, "x"),
            a = this._getOffset(i, "y");
          o && (r += o), a && (s += a);
          let l = 0 - s,
            c = s + e.height - n.height,
            h = this._subtractOverflows(e.width, 0 - r, r + e.width - n.width),
            u = this._subtractOverflows(e.height, l, c),
            d = h * u;
          return {
            visibleArea: d,
            isCompletelyWithinViewport: e.width * e.height === d,
            fitsInViewportVertically: u === e.height,
            fitsInViewportHorizontally: h == e.width,
          };
        }
        _canFitWithFlexibleDimensions(t, e, n) {
          if (this._hasFlexibleDimensions) {
            const i = n.bottom - e.y,
              r = n.right - e.x,
              s = ob(this._overlayRef.getConfig().minHeight),
              o = ob(this._overlayRef.getConfig().minWidth),
              a = t.fitsInViewportHorizontally || (null != o && o <= r);
            return (t.fitsInViewportVertically || (null != s && s <= i)) && a;
          }
          return !1;
        }
        _pushOverlayOnScreen(t, e, n) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: t.x + this._previousPushAmount.x,
              y: t.y + this._previousPushAmount.y,
            };
          const i = this._viewportRect,
            r = Math.max(t.x + e.width - i.right, 0),
            s = Math.max(t.y + e.height - i.bottom, 0),
            o = Math.max(i.top - n.top - t.y, 0),
            a = Math.max(i.left - n.left - t.x, 0);
          let l = 0,
            c = 0;
          return (
            (l =
              e.width <= i.width
                ? a || -r
                : t.x < this._viewportMargin
                ? i.left - n.left - t.x
                : 0),
            (c =
              e.height <= i.height
                ? o || -s
                : t.y < this._viewportMargin
                ? i.top - n.top - t.y
                : 0),
            (this._previousPushAmount = { x: l, y: c }),
            { x: t.x + l, y: t.y + c }
          );
        }
        _applyPosition(t, e) {
          if (
            (this._setTransformOrigin(t),
            this._setOverlayElementStyles(e, t),
            this._setBoundingBoxStyles(e, t),
            t.panelClass && this._addPanelClasses(t.panelClass),
            (this._lastPosition = t),
            this._positionChanges.observers.length)
          ) {
            const e = this._getScrollVisibility(),
              n = new Qy(t, e);
            this._positionChanges.next(n);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(t) {
          if (!this._transformOriginSelector) return;
          const e = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let n,
            i = t.overlayY;
          n =
            "center" === t.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === t.overlayX
                ? "right"
                : "left"
              : "start" === t.overlayX
              ? "left"
              : "right";
          for (let r = 0; r < e.length; r++)
            e[r].style.transformOrigin = `${n} ${i}`;
        }
        _calculateBoundingBoxRect(t, e) {
          const n = this._viewportRect,
            i = this._isRtl();
          let r, s, o, a, l, c;
          if ("top" === e.overlayY)
            (s = t.y), (r = n.height - s + this._viewportMargin);
          else if ("bottom" === e.overlayY)
            (o = n.height - t.y + 2 * this._viewportMargin),
              (r = n.height - o + this._viewportMargin);
          else {
            const e = Math.min(n.bottom - t.y + n.top, t.y),
              i = this._lastBoundingBoxSize.height;
            (r = 2 * e),
              (s = t.y - e),
              r > i &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (s = t.y - i / 2);
          }
          if (("end" === e.overlayX && !i) || ("start" === e.overlayX && i))
            (c = n.width - t.x + this._viewportMargin),
              (a = t.x - this._viewportMargin);
          else if (
            ("start" === e.overlayX && !i) ||
            ("end" === e.overlayX && i)
          )
            (l = t.x), (a = n.right - t.x);
          else {
            const e = Math.min(n.right - t.x + n.left, t.x),
              i = this._lastBoundingBoxSize.width;
            (a = 2 * e),
              (l = t.x - e),
              a > i &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (l = t.x - i / 2);
          }
          return { top: s, left: l, bottom: o, right: c, width: a, height: r };
        }
        _setBoundingBoxStyles(t, e) {
          const n = this._calculateBoundingBoxRect(t, e);
          this._isInitialRender ||
            this._growAfterOpen ||
            ((n.height = Math.min(n.height, this._lastBoundingBoxSize.height)),
            (n.width = Math.min(n.width, this._lastBoundingBoxSize.width)));
          const i = {};
          if (this._hasExactPosition())
            (i.top = i.left = "0"),
              (i.bottom = i.right = i.maxHeight = i.maxWidth = ""),
              (i.width = i.height = "100%");
          else {
            const t = this._overlayRef.getConfig().maxHeight,
              r = this._overlayRef.getConfig().maxWidth;
            (i.height = Ed(n.height)),
              (i.top = Ed(n.top)),
              (i.bottom = Ed(n.bottom)),
              (i.width = Ed(n.width)),
              (i.left = Ed(n.left)),
              (i.right = Ed(n.right)),
              (i.alignItems =
                "center" === e.overlayX
                  ? "center"
                  : "end" === e.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (i.justifyContent =
                "center" === e.overlayY
                  ? "center"
                  : "bottom" === e.overlayY
                  ? "flex-end"
                  : "flex-start"),
              t && (i.maxHeight = Ed(t)),
              r && (i.maxWidth = Ed(r));
          }
          (this._lastBoundingBoxSize = n), sb(this._boundingBox.style, i);
        }
        _resetBoundingBoxStyles() {
          sb(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          });
        }
        _resetOverlayElementStyles() {
          sb(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
          });
        }
        _setOverlayElementStyles(t, e) {
          const n = {},
            i = this._hasExactPosition(),
            r = this._hasFlexibleDimensions,
            s = this._overlayRef.getConfig();
          if (i) {
            const i = this._viewportRuler.getViewportScrollPosition();
            sb(n, this._getExactOverlayY(e, t, i)),
              sb(n, this._getExactOverlayX(e, t, i));
          } else n.position = "static";
          let o = "",
            a = this._getOffset(e, "x"),
            l = this._getOffset(e, "y");
          a && (o += `translateX(${a}px) `),
            l && (o += `translateY(${l}px)`),
            (n.transform = o.trim()),
            s.maxHeight &&
              (i ? (n.maxHeight = Ed(s.maxHeight)) : r && (n.maxHeight = "")),
            s.maxWidth &&
              (i ? (n.maxWidth = Ed(s.maxWidth)) : r && (n.maxWidth = "")),
            sb(this._pane.style, n);
        }
        _getExactOverlayY(t, e, n) {
          let i = { top: "", bottom: "" },
            r = this._getOverlayPoint(e, this._overlayRect, t);
          this._isPushed &&
            (r = this._pushOverlayOnScreen(r, this._overlayRect, n));
          let s = this._overlayContainer
            .getContainerElement()
            .getBoundingClientRect().top;
          return (
            (r.y -= s),
            "bottom" === t.overlayY
              ? (i.bottom = `${
                  this._document.documentElement.clientHeight -
                  (r.y + this._overlayRect.height)
                }px`)
              : (i.top = Ed(r.y)),
            i
          );
        }
        _getExactOverlayX(t, e, n) {
          let i,
            r = { left: "", right: "" },
            s = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, n)),
            (i = this._isRtl()
              ? "end" === t.overlayX
                ? "left"
                : "right"
              : "end" === t.overlayX
              ? "right"
              : "left"),
            "right" === i
              ? (r.right = `${
                  this._document.documentElement.clientWidth -
                  (s.x + this._overlayRect.width)
                }px`)
              : (r.left = Ed(s.x)),
            r
          );
        }
        _getScrollVisibility() {
          const t = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            n = this._scrollables.map((t) =>
              t.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: Uy(t, n),
            isOriginOutsideView: $y(t, n),
            isOverlayClipped: Uy(e, n),
            isOverlayOutsideView: $y(e, n),
          };
        }
        _subtractOverflows(t, ...e) {
          return e.reduce((t, e) => t - Math.max(e, 0), t);
        }
        _getNarrowedViewportRect() {
          const t = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            n = this._viewportRuler.getViewportScrollPosition();
          return {
            top: n.top + this._viewportMargin,
            left: n.left + this._viewportMargin,
            right: n.left + t - this._viewportMargin,
            bottom: n.top + e - this._viewportMargin,
            width: t - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(t, e) {
          return "x" === e
            ? null == t.offsetX
              ? this._offsetX
              : t.offsetX
            : null == t.offsetY
            ? this._offsetY
            : t.offsetY;
        }
        _validatePositions() {
          if (!this._preferredPositions.length)
            throw Error(
              "FlexibleConnectedPositionStrategy: At least one position is required."
            );
          this._preferredPositions.forEach((t) => {
            Xy("originX", t.originX),
              Yy("originY", t.originY),
              Xy("overlayX", t.overlayX),
              Yy("overlayY", t.overlayY);
          });
        }
        _addPanelClasses(t) {
          this._pane &&
            Cd(t).forEach((t) => {
              "" !== t &&
                -1 === this._appliedPanelClasses.indexOf(t) &&
                (this._appliedPanelClasses.push(t),
                this._pane.classList.add(t));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((t) => {
              this._pane.classList.remove(t);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const t = this._origin;
          if (t instanceof aa) return t.nativeElement.getBoundingClientRect();
          if (t instanceof Element) return t.getBoundingClientRect();
          const e = t.width || 0,
            n = t.height || 0;
          return {
            top: t.y,
            bottom: t.y + n,
            left: t.x,
            right: t.x + e,
            height: n,
            width: e,
          };
        }
      }
      function sb(t, e) {
        for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
      }
      function ob(t) {
        if ("number" != typeof t && null != t) {
          const [e, n] = t.split(ib);
          return n && "px" !== n ? null : parseFloat(e);
        }
        return t || null;
      }
      class ab {
        constructor(t, e, n, i, r, s, o) {
          (this._preferredPositions = []),
            (this._positionStrategy = new rb(n, i, r, s, o)
              .withFlexibleDimensions(!1)
              .withPush(!1)
              .withViewportMargin(0)),
            this.withFallbackPosition(t, e);
        }
        get _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        get onPositionChange() {
          return this._positionStrategy.positionChanges;
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          (this._overlayRef = t),
            this._positionStrategy.attach(t),
            this._direction &&
              (t.setDirection(this._direction), (this._direction = null));
        }
        dispose() {
          this._positionStrategy.dispose();
        }
        detach() {
          this._positionStrategy.detach();
        }
        apply() {
          this._positionStrategy.apply();
        }
        recalculateLastPosition() {
          this._positionStrategy.reapplyLastPosition();
        }
        withScrollableContainers(t) {
          this._positionStrategy.withScrollableContainers(t);
        }
        withFallbackPosition(t, e, n, i) {
          const r = new Zy(t, e, n, i);
          return (
            this._preferredPositions.push(r),
            this._positionStrategy.withPositions(this._preferredPositions),
            this
          );
        }
        withDirection(t) {
          return (
            this._overlayRef
              ? this._overlayRef.setDirection(t)
              : (this._direction = t),
            this
          );
        }
        withOffsetX(t) {
          return this._positionStrategy.withDefaultOffsetX(t), this;
        }
        withOffsetY(t) {
          return this._positionStrategy.withDefaultOffsetY(t), this;
        }
        withLockedPosition(t) {
          return this._positionStrategy.withLockedPosition(t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t.slice()),
            this._positionStrategy.withPositions(this._preferredPositions),
            this
          );
        }
        setOrigin(t) {
          return this._positionStrategy.setOrigin(t), this;
        }
      }
      class lb {
        constructor() {
          (this._cssPosition = "static"),
            (this._topOffset = ""),
            (this._bottomOffset = ""),
            (this._leftOffset = ""),
            (this._rightOffset = ""),
            (this._alignItems = ""),
            (this._justifyContent = ""),
            (this._width = ""),
            (this._height = "");
        }
        attach(t) {
          const e = t.getConfig();
          (this._overlayRef = t),
            this._width && !e.width && t.updateSize({ width: this._width }),
            this._height && !e.height && t.updateSize({ height: this._height }),
            t.hostElement.classList.add("cdk-global-overlay-wrapper"),
            (this._isDisposed = !1);
        }
        top(t = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = t),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(t = "") {
          return (
            (this._rightOffset = ""),
            (this._leftOffset = t),
            (this._justifyContent = "flex-start"),
            this
          );
        }
        bottom(t = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = t),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(t = "") {
          return (
            (this._leftOffset = ""),
            (this._rightOffset = t),
            (this._justifyContent = "flex-end"),
            this
          );
        }
        width(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: t })
              : (this._width = t),
            this
          );
        }
        height(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: t })
              : (this._height = t),
            this
          );
        }
        centerHorizontally(t = "") {
          return this.left(t), (this._justifyContent = "center"), this;
        }
        centerVertically(t = "") {
          return this.top(t), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement.style,
            n = this._overlayRef.getConfig(),
            { width: i, height: r, maxWidth: s, maxHeight: o } = n,
            a = !(
              ("100%" !== i && "100vw" !== i) ||
              (s && "100%" !== s && "100vw" !== s)
            ),
            l = !(
              ("100%" !== r && "100vh" !== r) ||
              (o && "100%" !== o && "100vh" !== o)
            );
          (t.position = this._cssPosition),
            (t.marginLeft = a ? "0" : this._leftOffset),
            (t.marginTop = l ? "0" : this._topOffset),
            (t.marginBottom = this._bottomOffset),
            (t.marginRight = this._rightOffset),
            a
              ? (e.justifyContent = "flex-start")
              : "center" === this._justifyContent
              ? (e.justifyContent = "center")
              : "rtl" === this._overlayRef.getConfig().direction
              ? "flex-start" === this._justifyContent
                ? (e.justifyContent = "flex-end")
                : "flex-end" === this._justifyContent &&
                  (e.justifyContent = "flex-start")
              : (e.justifyContent = this._justifyContent),
            (e.alignItems = l ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement,
            n = e.style;
          e.classList.remove("cdk-global-overlay-wrapper"),
            (n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position =
              ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let cb = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._viewportRuler = t),
                (this._document = e),
                (this._platform = n),
                (this._overlayContainer = i);
            }
            global() {
              return new lb();
            }
            connectedTo(t, e, n) {
              return new ab(
                e,
                n,
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
            flexibleConnectedTo(t) {
              return new rb(
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gt(Y_), Gt(pc), Gt(Ad), Gt(eb));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Gt(Y_), Gt(pc), Gt(Ad), Gt(eb));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        hb = 0,
        ub = (() => {
          class t {
            constructor(t, e, n, i, r, s, o, a, l, c) {
              (this.scrollStrategies = t),
                (this._overlayContainer = e),
                (this._componentFactoryResolver = n),
                (this._positionBuilder = i),
                (this._keyboardDispatcher = r),
                (this._injector = s),
                (this._ngZone = o),
                (this._document = a),
                (this._directionality = l),
                (this._location = c);
            }
            create(t) {
              const e = this._createHostElement(),
                n = this._createPaneElement(e),
                i = this._createPortalOutlet(n),
                r = new Ky(t);
              return (
                (r.direction = r.direction || this._directionality.value),
                new nb(
                  i,
                  e,
                  n,
                  r,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(t) {
              const e = this._document.createElement("div");
              return (
                (e.id = `cdk-overlay-${hb++}`),
                e.classList.add("cdk-overlay-pane"),
                t.appendChild(e),
                e
              );
            }
            _createHostElement() {
              const t = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(t), t
              );
            }
            _createPortalOutlet(t) {
              return (
                this._appRef || (this._appRef = this._injector.get(oc)),
                new Ly(
                  t,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Gt(Gy),
                Gt(eb),
                Gt(oa),
                Gt(cb),
                Gt(Jy),
                Gt(qs),
                Gt(Hl),
                Gt(pc),
                Gt(Yd),
                Gt(Sc, 8)
              );
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const db = {
        provide: new Lt("cdk-connected-overlay-scroll-strategy"),
        deps: [ub],
        useFactory: function (t) {
          return () => t.scrollStrategies.reposition();
        },
      };
      let pb = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ht({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [ub, db],
            imports: [[Xd, By, X_], X_],
          })),
          t
        );
      })();
      const fb = {
        provide: new Lt("mat-tooltip-scroll-strategy"),
        deps: [ub],
        useFactory: function (t) {
          return () => t.scrollStrategies.reposition({ scrollThrottle: 20 });
        },
      };
      let mb = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ht({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [fb],
            imports: [[Zd, zc, pb, Am], Am],
          })),
          t
        );
      })();
      const gb = {
        provide: new Lt("mat-menu-scroll-strategy"),
        deps: [ub],
        useFactory: function (t) {
          return () => t.scrollStrategies.reposition();
        },
      };
      let _b = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [gb],
              imports: [Am],
            })),
            t
          );
        })(),
        yb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [gb],
              imports: [[zc, Am, zm, pb, _b], _b],
            })),
            t
          );
        })(),
        bb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Am], Am],
            })),
            t
          );
        })(),
        vb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Rm, zm, Am, qm, zc], Rm, Am, qm, bb],
            })),
            t
          );
        })();
      const wb = {
        provide: new Lt("mat-select-scroll-strategy"),
        deps: [ub],
        useFactory: function (t) {
          return () => t.scrollStrategies.reposition();
        },
      };
      let Cb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [wb],
              imports: [[zc, pb, $m, Am], g_, $m, Am],
            })),
            t
          );
        })(),
        Eb = (() => {
          class t {
            constructor() {
              (this.changes = new E()),
                (this.itemsPerPageLabel = "Items per page:"),
                (this.nextPageLabel = "Next page"),
                (this.previousPageLabel = "Previous page"),
                (this.firstPageLabel = "First page"),
                (this.lastPageLabel = "Last page"),
                (this.getRangeLabel = (t, e, n) => {
                  if (0 == n || 0 == e) return `0 of ${n}`;
                  const i = t * e;
                  return `${i + 1} \u2013 ${
                    i < (n = Math.max(n, 0)) ? Math.min(i + e, n) : i + e
                  } of ${n}`;
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const xb = {
        provide: Eb,
        deps: [[new it(), new st(), Eb]],
        useFactory: function (t) {
          return t || new Eb();
        },
      };
      let kb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [xb],
              imports: [[zc, Xm, Cb, mb]],
            })),
            t
          );
        })(),
        Sb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Rm, Am], Rm, Am],
            })),
            t
          );
        })(),
        Ab = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[pb, By, zc, Xm, Am], Am],
            })),
            t
          );
        })(),
        Tb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [
                [
                  Oy,
                  Xm,
                  yb,
                  W_,
                  Dg,
                  Sy,
                  vy,
                  bb,
                  Iy,
                  vb,
                  kb,
                  Cb,
                  mb,
                  Sb,
                  g_,
                  D_,
                  Ab,
                ],
                Oy,
                Xm,
                yb,
                W_,
                Dg,
                Sy,
                vy,
                bb,
                Iy,
                vb,
                kb,
                Cb,
                mb,
                Sb,
                g_,
                D_,
                Ab,
              ],
            })),
            t
          );
        })();
      function Ob(t, e) {}
      class Ib {
        constructor() {
          (this.role = "dialog"),
            (this.panelClass = ""),
            (this.hasBackdrop = !0),
            (this.backdropClass = ""),
            (this.disableClose = !1),
            (this.width = ""),
            (this.height = ""),
            (this.maxWidth = "80vw"),
            (this.data = null),
            (this.ariaDescribedBy = null),
            (this.ariaLabelledBy = null),
            (this.ariaLabel = null),
            (this.autoFocus = !0),
            (this.restoreFocus = !0),
            (this.closeOnNavigation = !0);
        }
      }
      const Db = {
        dialogContainer: ip("dialogContainer", [
          ap("void, exit", op({ opacity: 0, transform: "scale(0.7)" })),
          ap("enter", op({ transform: "none" })),
          lp(
            "* => enter",
            rp(
              "150ms cubic-bezier(0, 0, 0.2, 1)",
              op({ transform: "none", opacity: 1 })
            )
          ),
          lp(
            "* => void, * => exit",
            rp("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", op({ opacity: 0 }))
          ),
        ]),
      };
      function Fb() {
        throw Error(
          "Attempting to attach dialog content after content is already attached"
        );
      }
      let Rb = (() => {
          class t extends My {
            constructor(t, e, n, i, r) {
              super(),
                (this._elementRef = t),
                (this._focusTrapFactory = e),
                (this._changeDetectorRef = n),
                (this._config = r),
                (this._elementFocusedBeforeDialogWasOpened = null),
                (this._state = "enter"),
                (this._animationStateChanged = new Ya()),
                (this.attachDomPortal = (t) => (
                  this._portalOutlet.hasAttached() && Fb(),
                  this._savePreviouslyFocusedElement(),
                  this._portalOutlet.attachDomPortal(t)
                )),
                (this._ariaLabelledBy = r.ariaLabelledBy || null),
                (this._document = i);
            }
            attachComponentPortal(t) {
              return (
                this._portalOutlet.hasAttached() && Fb(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachComponentPortal(t)
              );
            }
            attachTemplatePortal(t) {
              return (
                this._portalOutlet.hasAttached() && Fb(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachTemplatePortal(t)
              );
            }
            _recaptureFocus() {
              this._containsFocus() ||
                this._getFocusTrap().focusInitialElement() ||
                this._elementRef.nativeElement.focus();
            }
            _trapFocus() {
              this._config.autoFocus
                ? this._getFocusTrap().focusInitialElementWhenReady()
                : this._containsFocus() ||
                  this._elementRef.nativeElement.focus();
            }
            _restoreFocus() {
              const t = this._elementFocusedBeforeDialogWasOpened;
              if (
                this._config.restoreFocus &&
                t &&
                "function" == typeof t.focus
              ) {
                const e = this._document.activeElement,
                  n = this._elementRef.nativeElement;
                (e && e !== this._document.body && e !== n && !n.contains(e)) ||
                  t.focus();
              }
              this._focusTrap && this._focusTrap.destroy();
            }
            _savePreviouslyFocusedElement() {
              this._document &&
                ((this._elementFocusedBeforeDialogWasOpened = this._document.activeElement),
                this._elementRef.nativeElement.focus &&
                  Promise.resolve().then(() =>
                    this._elementRef.nativeElement.focus()
                  ));
            }
            _containsFocus() {
              const t = this._elementRef.nativeElement,
                e = this._document.activeElement;
              return t === e || t.contains(e);
            }
            _getFocusTrap() {
              return (
                this._focusTrap ||
                  (this._focusTrap = this._focusTrapFactory.create(
                    this._elementRef.nativeElement
                  )),
                this._focusTrap
              );
            }
            _onAnimationDone(t) {
              "enter" === t.toState
                ? this._trapFocus()
                : "exit" === t.toState && this._restoreFocus(),
                this._animationStateChanged.emit(t);
            }
            _onAnimationStart(t) {
              this._animationStateChanged.emit(t);
            }
            _startExitAnimation() {
              (this._state = "exit"), this._changeDetectorRef.markForCheck();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(io(aa), io(qd), io(As), io(pc, 8), io(Ib));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-dialog-container"]],
              viewQuery: function (t, e) {
                var n;
                1 & t && cl(Vy, !0),
                  2 & t && ll((n = ml())) && (e._portalOutlet = n.first);
              },
              hostAttrs: [
                "tabindex",
                "-1",
                "aria-modal",
                "true",
                1,
                "mat-dialog-container",
              ],
              hostVars: 6,
              hostBindings: function (t, e) {
                1 & t &&
                  mo("@dialogContainer.start", function (t) {
                    return e._onAnimationStart(t);
                  })("@dialogContainer.done", function (t) {
                    return e._onAnimationDone(t);
                  }),
                  2 & t &&
                    (to("id", e._id)("role", e._config.role)(
                      "aria-labelledby",
                      e._config.ariaLabel ? null : e._ariaLabelledBy
                    )("aria-label", e._config.ariaLabel)(
                      "aria-describedby",
                      e._config.ariaDescribedBy || null
                    ),
                    Bo("@dialogContainer", e._state));
              },
              features: [Ho],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (t, e) {
                1 & t && no(0, Ob, 0, 0, "ng-template", 0);
              },
              directives: [Vy],
              styles: [
                ".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n",
              ],
              encapsulation: 2,
              data: { animation: [Db.dialogContainer] },
            })),
            t
          );
        })(),
        Pb = 0;
      class Nb {
        constructor(t, e, n = `mat-dialog-${Pb++}`) {
          (this._overlayRef = t),
            (this._containerInstance = e),
            (this.id = n),
            (this.disableClose = this._containerInstance._config.disableClose),
            (this._afterOpened = new E()),
            (this._afterClosed = new E()),
            (this._beforeClosed = new E()),
            (this._state = 0),
            (e._id = n),
            e._animationStateChanged
              .pipe(
                ud((t) => "done" === t.phaseName && "enter" === t.toState),
                _d(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            e._animationStateChanged
              .pipe(
                ud((t) => "done" === t.phaseName && "exit" === t.toState),
                _d(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout),
                  this._overlayRef.dispose();
              }),
            t.detachments().subscribe(() => {
              this._beforeClosed.next(this._result),
                this._beforeClosed.complete(),
                this._afterClosed.next(this._result),
                this._afterClosed.complete(),
                (this.componentInstance = null),
                this._overlayRef.dispose();
            }),
            t
              .keydownEvents()
              .pipe(ud((t) => 27 === t.keyCode && !this.disableClose && !Yu(t)))
              .subscribe((t) => {
                t.preventDefault(), this.close();
              }),
            t.backdropClick().subscribe(() => {
              this.disableClose
                ? this._containerInstance._recaptureFocus()
                : this.close();
            });
        }
        close(t) {
          (this._result = t),
            this._containerInstance._animationStateChanged
              .pipe(
                ud((t) => "start" === t.phaseName),
                _d(1)
              )
              .subscribe((e) => {
                this._beforeClosed.next(t),
                  this._beforeClosed.complete(),
                  (this._state = 2),
                  this._overlayRef.detachBackdrop(),
                  (this._closeFallbackTimeout = setTimeout(() => {
                    this._overlayRef.dispose();
                  }, e.totalTime + 100));
              }),
            this._containerInstance._startExitAnimation(),
            (this._state = 1);
        }
        afterOpened() {
          return this._afterOpened.asObservable();
        }
        afterClosed() {
          return this._afterClosed.asObservable();
        }
        beforeClosed() {
          return this._beforeClosed.asObservable();
        }
        backdropClick() {
          return this._overlayRef.backdropClick();
        }
        keydownEvents() {
          return this._overlayRef.keydownEvents();
        }
        updatePosition(t) {
          let e = this._getPositionStrategy();
          return (
            t && (t.left || t.right)
              ? t.left
                ? e.left(t.left)
                : e.right(t.right)
              : e.centerHorizontally(),
            t && (t.top || t.bottom)
              ? t.top
                ? e.top(t.top)
                : e.bottom(t.bottom)
              : e.centerVertically(),
            this._overlayRef.updatePosition(),
            this
          );
        }
        updateSize(t = "", e = "") {
          return (
            this._getPositionStrategy().width(t).height(e),
            this._overlayRef.updatePosition(),
            this
          );
        }
        addPanelClass(t) {
          return this._overlayRef.addPanelClass(t), this;
        }
        removePanelClass(t) {
          return this._overlayRef.removePanelClass(t), this;
        }
        getState() {
          return this._state;
        }
        _getPositionStrategy() {
          return this._overlayRef.getConfig().positionStrategy;
        }
      }
      const Mb = new Lt("MatDialogData"),
        Lb = new Lt("mat-dialog-default-options"),
        Vb = new Lt("mat-dialog-scroll-strategy"),
        Bb = {
          provide: Vb,
          deps: [ub],
          useFactory: function (t) {
            return () => t.scrollStrategies.block();
          },
        };
      let jb = (() => {
          class t {
            constructor(t, e, n, i, r, s, o) {
              var a;
              (this._overlay = t),
                (this._injector = e),
                (this._defaultOptions = i),
                (this._parentDialog = s),
                (this._overlayContainer = o),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new E()),
                (this._afterOpenedAtThisLevel = new E()),
                (this._ariaHiddenElements = new Map()),
                (this.afterAllClosed =
                  ((a = () =>
                    this.openDialogs.length
                      ? this._afterAllClosed
                      : this._afterAllClosed.pipe(ep(void 0))),
                  new y((t) => {
                    let e;
                    try {
                      e = a();
                    } catch (n) {
                      return void t.error(n);
                    }
                    return (e ? B(e) : gd()).subscribe(t);
                  }))),
                (this._scrollStrategy = r);
            }
            get openDialogs() {
              return this._parentDialog
                ? this._parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
            }
            get afterOpened() {
              return this._parentDialog
                ? this._parentDialog.afterOpened
                : this._afterOpenedAtThisLevel;
            }
            get _afterAllClosed() {
              const t = this._parentDialog;
              return t ? t._afterAllClosed : this._afterAllClosedAtThisLevel;
            }
            open(t, e) {
              if (
                (e = (function (t, e) {
                  return Object.assign(Object.assign({}, e), t);
                })(e, this._defaultOptions || new Ib())).id &&
                this.getDialogById(e.id)
              )
                throw Error(
                  `Dialog with id "${e.id}" exists already. The dialog id must be unique.`
                );
              const n = this._createOverlay(e),
                i = this._attachDialogContainer(n, e),
                r = this._attachDialogContent(t, i, n, e);
              return (
                this.openDialogs.length ||
                  this._hideNonDialogContentFromAssistiveTechnology(),
                this.openDialogs.push(r),
                r.afterClosed().subscribe(() => this._removeOpenDialog(r)),
                this.afterOpened.next(r),
                r
              );
            }
            closeAll() {
              this._closeDialogs(this.openDialogs);
            }
            getDialogById(t) {
              return this.openDialogs.find((e) => e.id === t);
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete();
            }
            _createOverlay(t) {
              const e = this._getOverlayConfig(t);
              return this._overlay.create(e);
            }
            _getOverlayConfig(t) {
              const e = new Ky({
                positionStrategy: this._overlay.position().global(),
                scrollStrategy: t.scrollStrategy || this._scrollStrategy(),
                panelClass: t.panelClass,
                hasBackdrop: t.hasBackdrop,
                direction: t.direction,
                minWidth: t.minWidth,
                minHeight: t.minHeight,
                maxWidth: t.maxWidth,
                maxHeight: t.maxHeight,
                disposeOnNavigation: t.closeOnNavigation,
              });
              return t.backdropClass && (e.backdropClass = t.backdropClass), e;
            }
            _attachDialogContainer(t, e) {
              const n = qs.create({
                  parent:
                    (e && e.viewContainerRef && e.viewContainerRef.injector) ||
                    this._injector,
                  providers: [{ provide: Ib, useValue: e }],
                }),
                i = new Ry(
                  Rb,
                  e.viewContainerRef,
                  n,
                  e.componentFactoryResolver
                );
              return t.attach(i).instance;
            }
            _attachDialogContent(t, e, n, i) {
              const r = new Nb(n, e, i.id);
              if (t instanceof Da)
                e.attachTemplatePortal(
                  new Py(t, null, { $implicit: i.data, dialogRef: r })
                );
              else {
                const n = this._createInjector(i, r, e),
                  s = e.attachComponentPortal(new Ry(t, i.viewContainerRef, n));
                r.componentInstance = s.instance;
              }
              return (
                r.updateSize(i.width, i.height).updatePosition(i.position), r
              );
            }
            _createInjector(t, e, n) {
              const i = t && t.viewContainerRef && t.viewContainerRef.injector,
                r = [
                  { provide: Rb, useValue: n },
                  { provide: Mb, useValue: t.data },
                  { provide: Nb, useValue: e },
                ];
              return (
                !t.direction ||
                  (i && i.get(Yd, null)) ||
                  r.push({
                    provide: Yd,
                    useValue: { value: t.direction, change: Qu() },
                  }),
                qs.create({ parent: i || this._injector, providers: r })
              );
            }
            _removeOpenDialog(t) {
              const e = this.openDialogs.indexOf(t);
              e > -1 &&
                (this.openDialogs.splice(e, 1),
                this.openDialogs.length ||
                  (this._ariaHiddenElements.forEach((t, e) => {
                    t
                      ? e.setAttribute("aria-hidden", t)
                      : e.removeAttribute("aria-hidden");
                  }),
                  this._ariaHiddenElements.clear(),
                  this._afterAllClosed.next()));
            }
            _hideNonDialogContentFromAssistiveTechnology() {
              const t = this._overlayContainer.getContainerElement();
              if (t.parentElement) {
                const e = t.parentElement.children;
                for (let n = e.length - 1; n > -1; n--) {
                  let i = e[n];
                  i === t ||
                    "SCRIPT" === i.nodeName ||
                    "STYLE" === i.nodeName ||
                    i.hasAttribute("aria-live") ||
                    (this._ariaHiddenElements.set(
                      i,
                      i.getAttribute("aria-hidden")
                    ),
                    i.setAttribute("aria-hidden", "true"));
                }
              }
            }
            _closeDialogs(t) {
              let e = t.length;
              for (; e--; ) t[e].close();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Gt(ub),
                Gt(qs),
                Gt(Sc, 8),
                Gt(Lb, 8),
                Gt(Vb),
                Gt(t, 12),
                Gt(eb)
              );
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Hb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [jb, Bb],
              imports: [[pb, By, Am], Am],
            })),
            t
          );
        })(),
        zb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t, bootstrap: [Ty] })),
            (t.ɵinj = ht({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [],
              imports: [[yh, Tb, Em, zc, Uu, Wu, Hb]],
            })),
            t
          );
        })();
      (function () {
        if (ui)
          throw new Error("Cannot enable prod mode after platform setup.");
        hi = !1;
      })(),
        gh()
          .bootstrapModule(zb)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
