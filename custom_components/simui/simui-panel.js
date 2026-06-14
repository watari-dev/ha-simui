(function(){try{var s=document.createElement('style');s.textContent=".simui-tile.simui-input{gap:8px}.simui-input-value{color:var(--text);font-weight:500;font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\"}.simui-input-value .simui-unit{font-weight:500}.simui-input-step{margin-left:auto}.simui-input-seg{display:flex;width:100%}.simui-input-seg .simui-segbtn{flex:1 1 0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.simui-input-fsel{display:flex;width:100%}.simui-input-fsel .simui-fsel{flex:1;width:100%}.simui-root.simui-gallery-backdrop{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;justify-content:center;background:#00000080}.simui-gallery{display:flex;flex-direction:column;width:100%;max-width:920px;max-height:88vh;background:var(--surface);border:1px solid var(--faint);border-radius:20px 20px 0 0;overflow:hidden;box-shadow:0 -8px 40px #0006}@media(min-width:720px){.simui-root.simui-gallery-backdrop{align-items:center;padding:24px}.simui-gallery{border-radius:18px;box-shadow:0 12px 48px #00000073}}.simui-gallery-head{position:sticky;top:0;z-index:1;flex:none;display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--faint);background:var(--surface)}.simui-gallery-search{position:relative;flex:1;display:flex;align-items:center}.simui-gallery-search-ic{position:absolute;left:11px;color:var(--muted);pointer-events:none}.simui-gallery-input{flex:1;width:100%;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:9px 11px 9px 34px;color:var(--text);font:inherit;font-size:13px;outline:none;transition:border-color .12s ease}.simui-gallery-input::placeholder{color:var(--muted)}.simui-gallery-input:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-gallery-title-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.simui-gallery-grid{overflow:auto;padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;align-content:start}.simui-gallery-empty{grid-column:1 / -1;padding:40px 16px;text-align:center;font-size:13px;color:var(--muted)}.simui-gallery-card{display:flex;flex-direction:column;gap:0;padding:0;text-align:left;background:color-mix(in srgb,var(--text) 3%,var(--surface));border:1px solid var(--faint);border-radius:14px;overflow:hidden;cursor:pointer;font:inherit;color:inherit;transition:border-color .14s ease,background .14s ease,box-shadow .14s ease}.simui-gallery-card:hover{background:color-mix(in srgb,var(--text) 6%,var(--surface));border-color:color-mix(in srgb,var(--accent) 40%,var(--faint))}.simui-gallery-card:focus-visible{outline:none;border-color:color-mix(in srgb,var(--accent) 60%,var(--faint));box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 30%,transparent)}.simui-gallery-card:active{background:color-mix(in srgb,var(--text) 8%,var(--surface))}.simui-gallery-card[draggable=true]{cursor:grab}.simui-gallery-card[draggable=true]:active{cursor:grabbing}.simui-gallery-preview{position:relative;height:116px;overflow:hidden;background:radial-gradient(120% 120% at 50% 0%,color-mix(in srgb,var(--text) 4%,transparent),transparent 70%),var(--bg);border-bottom:1px solid var(--faint)}.simui-gallery-preview-scale{position:absolute;top:12px;left:12px;width:calc((100% - 24px) / .78);transform:scale(.78);transform-origin:top left;pointer-events:none;user-select:none}.simui-gallery-preview-scale .simui-chart,.simui-gallery-preview-scale .simui-metric-wall{min-height:0}.simui-gallery-preview-stub,.simui-eb-compact.simui-gallery-stub{height:100%}.simui-gallery-preview-stub{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted)}.simui-gallery-stub-ic{display:inline-flex;color:color-mix(in srgb,var(--text) 40%,transparent)}.simui-gallery-stub-label{font-size:11px;letter-spacing:.2px}.simui-gallery-meta{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:4px 7px;padding:10px 12px 12px}.simui-gallery-card-ic{display:inline-flex;color:var(--muted)}.simui-gallery-card-label{font-size:13px;font-weight:600;letter-spacing:-.1px;color:var(--text)}.simui-gallery-card-desc{grid-column:1 / -1;font-size:11.5px;line-height:1.35;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}@media(prefers-reduced-motion:reduce){.simui-gallery-card{transition:none}}.simui-alarm-state{display:inline-flex;align-items:center;gap:8px}\n";document.head.appendChild(s);}catch(e){}})();var hw = Object.defineProperty;
var dw = (s, t, i) => t in s ? hw(s, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[t] = i;
var ws = (s, t, i) => dw(s, typeof t != "symbol" ? t + "" : t, i);
function fw(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Rh = { exports: {} }, Tl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ug;
function mw() {
  if (ug) return Tl;
  ug = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function i(a, r, c) {
    var u = null;
    if (c !== void 0 && (u = "" + c), r.key !== void 0 && (u = "" + r.key), "key" in r) {
      c = {};
      for (var f in r)
        f !== "key" && (c[f] = r[f]);
    } else c = r;
    return r = c.ref, {
      $$typeof: s,
      type: a,
      key: u,
      ref: r !== void 0 ? r : null,
      props: c
    };
  }
  return Tl.Fragment = t, Tl.jsx = i, Tl.jsxs = i, Tl;
}
var hg;
function pw() {
  return hg || (hg = 1, Rh.exports = mw()), Rh.exports;
}
var h = pw(), Lh = { exports: {} }, Al = {}, Bh = { exports: {} }, Uh = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dg;
function vw() {
  return dg || (dg = 1, (function(s) {
    function t(L, Z) {
      var it = L.length;
      L.push(Z);
      t: for (; 0 < it; ) {
        var dt = it - 1 >>> 1, mt = L[dt];
        if (0 < r(mt, Z))
          L[dt] = Z, L[it] = mt, it = dt;
        else break t;
      }
    }
    function i(L) {
      return L.length === 0 ? null : L[0];
    }
    function a(L) {
      if (L.length === 0) return null;
      var Z = L[0], it = L.pop();
      if (it !== Z) {
        L[0] = it;
        t: for (var dt = 0, mt = L.length, E = mt >>> 1; dt < E; ) {
          var $ = 2 * (dt + 1) - 1, I = L[$], et = $ + 1, ft = L[et];
          if (0 > r(I, it))
            et < mt && 0 > r(ft, I) ? (L[dt] = ft, L[et] = it, dt = et) : (L[dt] = I, L[$] = it, dt = $);
          else if (et < mt && 0 > r(ft, it))
            L[dt] = ft, L[et] = it, dt = et;
          else break t;
        }
      }
      return Z;
    }
    function r(L, Z) {
      var it = L.sortIndex - Z.sortIndex;
      return it !== 0 ? it : L.id - Z.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      s.unstable_now = function() {
        return c.now();
      };
    } else {
      var u = Date, f = u.now();
      s.unstable_now = function() {
        return u.now() - f;
      };
    }
    var m = [], v = [], g = 1, b = null, y = 3, S = !1, w = !1, M = !1, N = !1, k = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, D = typeof setImmediate < "u" ? setImmediate : null;
    function O(L) {
      for (var Z = i(v); Z !== null; ) {
        if (Z.callback === null) a(v);
        else if (Z.startTime <= L)
          a(v), Z.sortIndex = Z.expirationTime, t(m, Z);
        else break;
        Z = i(v);
      }
    }
    function V(L) {
      if (M = !1, O(L), !w)
        if (i(m) !== null)
          w = !0, G || (G = !0, F());
        else {
          var Z = i(v);
          Z !== null && Ot(V, Z.startTime - L);
        }
    }
    var G = !1, R = -1, X = 5, P = -1;
    function rt() {
      return N ? !0 : !(s.unstable_now() - P < X);
    }
    function at() {
      if (N = !1, G) {
        var L = s.unstable_now();
        P = L;
        var Z = !0;
        try {
          t: {
            w = !1, M && (M = !1, T(R), R = -1), S = !0;
            var it = y;
            try {
              e: {
                for (O(L), b = i(m); b !== null && !(b.expirationTime > L && rt()); ) {
                  var dt = b.callback;
                  if (typeof dt == "function") {
                    b.callback = null, y = b.priorityLevel;
                    var mt = dt(
                      b.expirationTime <= L
                    );
                    if (L = s.unstable_now(), typeof mt == "function") {
                      b.callback = mt, O(L), Z = !0;
                      break e;
                    }
                    b === i(m) && a(m), O(L);
                  } else a(m);
                  b = i(m);
                }
                if (b !== null) Z = !0;
                else {
                  var E = i(v);
                  E !== null && Ot(
                    V,
                    E.startTime - L
                  ), Z = !1;
                }
              }
              break t;
            } finally {
              b = null, y = it, S = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? F() : G = !1;
        }
      }
    }
    var F;
    if (typeof D == "function")
      F = function() {
        D(at);
      };
    else if (typeof MessageChannel < "u") {
      var gt = new MessageChannel(), xt = gt.port2;
      gt.port1.onmessage = at, F = function() {
        xt.postMessage(null);
      };
    } else
      F = function() {
        k(at, 0);
      };
    function Ot(L, Z) {
      R = k(function() {
        L(s.unstable_now());
      }, Z);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, s.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : X = 0 < L ? Math.floor(1e3 / L) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return y;
    }, s.unstable_next = function(L) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = y;
      }
      var it = y;
      y = Z;
      try {
        return L();
      } finally {
        y = it;
      }
    }, s.unstable_requestPaint = function() {
      N = !0;
    }, s.unstable_runWithPriority = function(L, Z) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var it = y;
      y = L;
      try {
        return Z();
      } finally {
        y = it;
      }
    }, s.unstable_scheduleCallback = function(L, Z, it) {
      var dt = s.unstable_now();
      switch (typeof it == "object" && it !== null ? (it = it.delay, it = typeof it == "number" && 0 < it ? dt + it : dt) : it = dt, L) {
        case 1:
          var mt = -1;
          break;
        case 2:
          mt = 250;
          break;
        case 5:
          mt = 1073741823;
          break;
        case 4:
          mt = 1e4;
          break;
        default:
          mt = 5e3;
      }
      return mt = it + mt, L = {
        id: g++,
        callback: Z,
        priorityLevel: L,
        startTime: it,
        expirationTime: mt,
        sortIndex: -1
      }, it > dt ? (L.sortIndex = it, t(v, L), i(m) === null && L === i(v) && (M ? (T(R), R = -1) : M = !0, Ot(V, it - dt))) : (L.sortIndex = mt, t(m, L), w || S || (w = !0, G || (G = !0, F()))), L;
    }, s.unstable_shouldYield = rt, s.unstable_wrapCallback = function(L) {
      var Z = y;
      return function() {
        var it = y;
        y = Z;
        try {
          return L.apply(this, arguments);
        } finally {
          y = it;
        }
      };
    };
  })(Uh)), Uh;
}
var fg;
function gw() {
  return fg || (fg = 1, Bh.exports = vw()), Bh.exports;
}
var Hh = { exports: {} }, pt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mg;
function bw() {
  if (mg) return pt;
  mg = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), r = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), u = /* @__PURE__ */ Symbol.for("react.context"), f = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), b = /* @__PURE__ */ Symbol.for("react.activity"), y = Symbol.iterator;
  function S(E) {
    return E === null || typeof E != "object" ? null : (E = y && E[y] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, M = Object.assign, N = {};
  function k(E, $, I) {
    this.props = E, this.context = $, this.refs = N, this.updater = I || w;
  }
  k.prototype.isReactComponent = {}, k.prototype.setState = function(E, $) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, $, "setState");
  }, k.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function T() {
  }
  T.prototype = k.prototype;
  function D(E, $, I) {
    this.props = E, this.context = $, this.refs = N, this.updater = I || w;
  }
  var O = D.prototype = new T();
  O.constructor = D, M(O, k.prototype), O.isPureReactComponent = !0;
  var V = Array.isArray;
  function G() {
  }
  var R = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function P(E, $, I) {
    var et = I.ref;
    return {
      $$typeof: s,
      type: E,
      key: $,
      ref: et !== void 0 ? et : null,
      props: I
    };
  }
  function rt(E, $) {
    return P(E.type, $, E.props);
  }
  function at(E) {
    return typeof E == "object" && E !== null && E.$$typeof === s;
  }
  function F(E) {
    var $ = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(I) {
      return $[I];
    });
  }
  var gt = /\/+/g;
  function xt(E, $) {
    return typeof E == "object" && E !== null && E.key != null ? F("" + E.key) : $.toString(36);
  }
  function Ot(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(G, G) : (E.status = "pending", E.then(
          function($) {
            E.status === "pending" && (E.status = "fulfilled", E.value = $);
          },
          function($) {
            E.status === "pending" && (E.status = "rejected", E.reason = $);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function L(E, $, I, et, ft) {
    var ht = typeof E;
    (ht === "undefined" || ht === "boolean") && (E = null);
    var Ct = !1;
    if (E === null) Ct = !0;
    else
      switch (ht) {
        case "bigint":
        case "string":
        case "number":
          Ct = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case s:
            case t:
              Ct = !0;
              break;
            case g:
              return Ct = E._init, L(
                Ct(E._payload),
                $,
                I,
                et,
                ft
              );
          }
      }
    if (Ct)
      return ft = ft(E), Ct = et === "" ? "." + xt(E, 0) : et, V(ft) ? (I = "", Ct != null && (I = Ct.replace(gt, "$&/") + "/"), L(ft, $, I, "", function(Et) {
        return Et;
      })) : ft != null && (at(ft) && (ft = rt(
        ft,
        I + (ft.key == null || E && E.key === ft.key ? "" : ("" + ft.key).replace(
          gt,
          "$&/"
        ) + "/") + Ct
      )), $.push(ft)), 1;
    Ct = 0;
    var Kt = et === "" ? "." : et + ":";
    if (V(E))
      for (var Dt = 0; Dt < E.length; Dt++)
        et = E[Dt], ht = Kt + xt(et, Dt), Ct += L(
          et,
          $,
          I,
          ht,
          ft
        );
    else if (Dt = S(E), typeof Dt == "function")
      for (E = Dt.call(E), Dt = 0; !(et = E.next()).done; )
        et = et.value, ht = Kt + xt(et, Dt++), Ct += L(
          et,
          $,
          I,
          ht,
          ft
        );
    else if (ht === "object") {
      if (typeof E.then == "function")
        return L(
          Ot(E),
          $,
          I,
          et,
          ft
        );
      throw $ = String(E), Error(
        "Objects are not valid as a React child (found: " + ($ === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : $) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ct;
  }
  function Z(E, $, I) {
    if (E == null) return E;
    var et = [], ft = 0;
    return L(E, et, "", "", function(ht) {
      return $.call(I, ht, ft++);
    }), et;
  }
  function it(E) {
    if (E._status === -1) {
      var $ = E._result;
      $ = $(), $.then(
        function(I) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = I);
        },
        function(I) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = I);
        }
      ), E._status === -1 && (E._status = 0, E._result = $);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var dt = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var $ = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent($)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, mt = {
    map: Z,
    forEach: function(E, $, I) {
      Z(
        E,
        function() {
          $.apply(this, arguments);
        },
        I
      );
    },
    count: function(E) {
      var $ = 0;
      return Z(E, function() {
        $++;
      }), $;
    },
    toArray: function(E) {
      return Z(E, function($) {
        return $;
      }) || [];
    },
    only: function(E) {
      if (!at(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return pt.Activity = b, pt.Children = mt, pt.Component = k, pt.Fragment = i, pt.Profiler = r, pt.PureComponent = D, pt.StrictMode = a, pt.Suspense = m, pt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R, pt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return R.H.useMemoCache(E);
    }
  }, pt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, pt.cacheSignal = function() {
    return null;
  }, pt.cloneElement = function(E, $, I) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var et = M({}, E.props), ft = E.key;
    if ($ != null)
      for (ht in $.key !== void 0 && (ft = "" + $.key), $)
        !X.call($, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && $.ref === void 0 || (et[ht] = $[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) et.children = I;
    else if (1 < ht) {
      for (var Ct = Array(ht), Kt = 0; Kt < ht; Kt++)
        Ct[Kt] = arguments[Kt + 2];
      et.children = Ct;
    }
    return P(E.type, ft, et);
  }, pt.createContext = function(E) {
    return E = {
      $$typeof: u,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: c,
      _context: E
    }, E;
  }, pt.createElement = function(E, $, I) {
    var et, ft = {}, ht = null;
    if ($ != null)
      for (et in $.key !== void 0 && (ht = "" + $.key), $)
        X.call($, et) && et !== "key" && et !== "__self" && et !== "__source" && (ft[et] = $[et]);
    var Ct = arguments.length - 2;
    if (Ct === 1) ft.children = I;
    else if (1 < Ct) {
      for (var Kt = Array(Ct), Dt = 0; Dt < Ct; Dt++)
        Kt[Dt] = arguments[Dt + 2];
      ft.children = Kt;
    }
    if (E && E.defaultProps)
      for (et in Ct = E.defaultProps, Ct)
        ft[et] === void 0 && (ft[et] = Ct[et]);
    return P(E, ht, ft);
  }, pt.createRef = function() {
    return { current: null };
  }, pt.forwardRef = function(E) {
    return { $$typeof: f, render: E };
  }, pt.isValidElement = at, pt.lazy = function(E) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: E },
      _init: it
    };
  }, pt.memo = function(E, $) {
    return {
      $$typeof: v,
      type: E,
      compare: $ === void 0 ? null : $
    };
  }, pt.startTransition = function(E) {
    var $ = R.T, I = {};
    R.T = I;
    try {
      var et = E(), ft = R.S;
      ft !== null && ft(I, et), typeof et == "object" && et !== null && typeof et.then == "function" && et.then(G, dt);
    } catch (ht) {
      dt(ht);
    } finally {
      $ !== null && I.types !== null && ($.types = I.types), R.T = $;
    }
  }, pt.unstable_useCacheRefresh = function() {
    return R.H.useCacheRefresh();
  }, pt.use = function(E) {
    return R.H.use(E);
  }, pt.useActionState = function(E, $, I) {
    return R.H.useActionState(E, $, I);
  }, pt.useCallback = function(E, $) {
    return R.H.useCallback(E, $);
  }, pt.useContext = function(E) {
    return R.H.useContext(E);
  }, pt.useDebugValue = function() {
  }, pt.useDeferredValue = function(E, $) {
    return R.H.useDeferredValue(E, $);
  }, pt.useEffect = function(E, $) {
    return R.H.useEffect(E, $);
  }, pt.useEffectEvent = function(E) {
    return R.H.useEffectEvent(E);
  }, pt.useId = function() {
    return R.H.useId();
  }, pt.useImperativeHandle = function(E, $, I) {
    return R.H.useImperativeHandle(E, $, I);
  }, pt.useInsertionEffect = function(E, $) {
    return R.H.useInsertionEffect(E, $);
  }, pt.useLayoutEffect = function(E, $) {
    return R.H.useLayoutEffect(E, $);
  }, pt.useMemo = function(E, $) {
    return R.H.useMemo(E, $);
  }, pt.useOptimistic = function(E, $) {
    return R.H.useOptimistic(E, $);
  }, pt.useReducer = function(E, $, I) {
    return R.H.useReducer(E, $, I);
  }, pt.useRef = function(E) {
    return R.H.useRef(E);
  }, pt.useState = function(E) {
    return R.H.useState(E);
  }, pt.useSyncExternalStore = function(E, $, I) {
    return R.H.useSyncExternalStore(
      E,
      $,
      I
    );
  }, pt.useTransition = function() {
    return R.H.useTransition();
  }, pt.version = "19.2.7", pt;
}
var pg;
function $d() {
  return pg || (pg = 1, Hh.exports = bw()), Hh.exports;
}
var qh = { exports: {} }, Ne = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vg;
function xw() {
  if (vg) return Ne;
  vg = 1;
  var s = $d();
  function t(m) {
    var v = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        v += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + m + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var a = {
    d: {
      f: i,
      r: function() {
        throw Error(t(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, r = /* @__PURE__ */ Symbol.for("react.portal");
  function c(m, v, g) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : "" + b,
      children: m,
      containerInfo: v,
      implementation: g
    };
  }
  var u = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function f(m, v) {
    if (m === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Ne.createPortal = function(m, v) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(t(299));
    return c(m, v, null, g);
  }, Ne.flushSync = function(m) {
    var v = u.T, g = a.p;
    try {
      if (u.T = null, a.p = 2, m) return m();
    } finally {
      u.T = v, a.p = g, a.d.f();
    }
  }, Ne.preconnect = function(m, v) {
    typeof m == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, a.d.C(m, v));
  }, Ne.prefetchDNS = function(m) {
    typeof m == "string" && a.d.D(m);
  }, Ne.preinit = function(m, v) {
    if (typeof m == "string" && v && typeof v.as == "string") {
      var g = v.as, b = f(g, v.crossOrigin), y = typeof v.integrity == "string" ? v.integrity : void 0, S = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      g === "style" ? a.d.S(
        m,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: y,
          fetchPriority: S
        }
      ) : g === "script" && a.d.X(m, {
        crossOrigin: b,
        integrity: y,
        fetchPriority: S,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(m, v) {
    if (typeof m == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var g = f(
            v.as,
            v.crossOrigin
          );
          a.d.M(m, {
            crossOrigin: g,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && a.d.M(m);
  }, Ne.preload = function(m, v) {
    if (typeof m == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var g = v.as, b = f(g, v.crossOrigin);
      a.d.L(m, g, {
        crossOrigin: b,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Ne.preloadModule = function(m, v) {
    if (typeof m == "string")
      if (v) {
        var g = f(v.as, v.crossOrigin);
        a.d.m(m, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: g,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else a.d.m(m);
  }, Ne.requestFormReset = function(m) {
    a.d.r(m);
  }, Ne.unstable_batchedUpdates = function(m, v) {
    return m(v);
  }, Ne.useFormState = function(m, v, g) {
    return u.H.useFormState(m, v, g);
  }, Ne.useFormStatus = function() {
    return u.H.useHostTransitionStatus();
  }, Ne.version = "19.2.7", Ne;
}
var gg;
function fb() {
  if (gg) return qh.exports;
  gg = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), qh.exports = xw(), qh.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bg;
function yw() {
  if (bg) return Al;
  bg = 1;
  var s = gw(), t = $d(), i = fb();
  function a(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        n += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
    var n = e, l = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (l = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? l : null;
  }
  function u(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function f(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (c(e) !== e)
      throw Error(a(188));
  }
  function v(e) {
    var n = e.alternate;
    if (!n) {
      if (n = c(e), n === null) throw Error(a(188));
      return n !== e ? null : e;
    }
    for (var l = e, o = n; ; ) {
      var d = l.return;
      if (d === null) break;
      var p = d.alternate;
      if (p === null) {
        if (o = d.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (d.child === p.child) {
        for (p = d.child; p; ) {
          if (p === l) return m(d), e;
          if (p === o) return m(d), n;
          p = p.sibling;
        }
        throw Error(a(188));
      }
      if (l.return !== o.return) l = d, o = p;
      else {
        for (var x = !1, _ = d.child; _; ) {
          if (_ === l) {
            x = !0, l = d, o = p;
            break;
          }
          if (_ === o) {
            x = !0, o = d, l = p;
            break;
          }
          _ = _.sibling;
        }
        if (!x) {
          for (_ = p.child; _; ) {
            if (_ === l) {
              x = !0, l = p, o = d;
              break;
            }
            if (_ === o) {
              x = !0, o = p, l = d;
              break;
            }
            _ = _.sibling;
          }
          if (!x) throw Error(a(189));
        }
      }
      if (l.alternate !== o) throw Error(a(190));
    }
    if (l.tag !== 3) throw Error(a(188));
    return l.stateNode.current === l ? e : n;
  }
  function g(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = g(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, y = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), M = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), k = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), D = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), rt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), at = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object" ? null : (e = at && e[at] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var gt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function xt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === gt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case M:
        return "Fragment";
      case k:
        return "Profiler";
      case N:
        return "StrictMode";
      case V:
        return "Suspense";
      case G:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case D:
          return e.displayName || "Context";
        case T:
          return (e._context.displayName || "Context") + ".Consumer";
        case O:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case R:
          return n = e.displayName || null, n !== null ? n : xt(e.type) || "Memo";
        case X:
          n = e._payload, e = e._init;
          try {
            return xt(e(n));
          } catch {
          }
      }
    return null;
  }
  var Ot = Array.isArray, L = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, it = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, dt = [], mt = -1;
  function E(e) {
    return { current: e };
  }
  function $(e) {
    0 > mt || (e.current = dt[mt], dt[mt] = null, mt--);
  }
  function I(e, n) {
    mt++, dt[mt] = e.current, e.current = n;
  }
  var et = E(null), ft = E(null), ht = E(null), Ct = E(null);
  function Kt(e, n) {
    switch (I(ht, n), I(ft, e), I(et, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Ov(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Ov(n), e = Dv(n, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    $(et), I(et, e);
  }
  function Dt() {
    $(et), $(ft), $(ht);
  }
  function Et(e) {
    e.memoizedState !== null && I(Ct, e);
    var n = et.current, l = Dv(n, e.type);
    n !== l && (I(ft, e), I(et, l));
  }
  function Ci(e) {
    ft.current === e && ($(et), $(ft)), Ct.current === e && ($(Ct), Cl._currentValue = it);
  }
  var ze, Yi;
  function me(e) {
    if (ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var n = l.stack.trim().match(/\n( *(at )?)/);
        ze = n && n[1] || "", Yi = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ze + e + Yi;
  }
  var ki = !1;
  function Ei(e, n) {
    if (!e || ki) return "";
    ki = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var K = function() {
                throw Error();
              };
              if (Object.defineProperty(K.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(K, []);
                } catch (q) {
                  var H = q;
                }
                Reflect.construct(e, [], K);
              } else {
                try {
                  K.call();
                } catch (q) {
                  H = q;
                }
                e.call(K.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                H = q;
              }
              (K = e()) && typeof K.catch == "function" && K.catch(function() {
              });
            }
          } catch (q) {
            if (q && H && typeof q.stack == "string")
              return [q.stack, H.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      d && d.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var p = o.DetermineComponentFrameRoot(), x = p[0], _ = p[1];
      if (x && _) {
        var C = x.split(`
`), U = _.split(`
`);
        for (d = o = 0; o < C.length && !C[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; d < U.length && !U[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (o === C.length || d === U.length)
          for (o = C.length - 1, d = U.length - 1; 1 <= o && 0 <= d && C[o] !== U[d]; )
            d--;
        for (; 1 <= o && 0 <= d; o--, d--)
          if (C[o] !== U[d]) {
            if (o !== 1 || d !== 1)
              do
                if (o--, d--, 0 > d || C[o] !== U[d]) {
                  var Q = `
` + C[o].replace(" at new ", " at ");
                  return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), Q;
                }
              while (1 <= o && 0 <= d);
            break;
          }
      }
    } finally {
      ki = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? me(l) : "";
  }
  function ur(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return me(e.type);
      case 16:
        return me("Lazy");
      case 13:
        return e.child !== n && n !== null ? me("Suspense Fallback") : me("Suspense");
      case 19:
        return me("SuspenseList");
      case 0:
      case 15:
        return Ei(e.type, !1);
      case 11:
        return Ei(e.type.render, !1);
      case 1:
        return Ei(e.type, !0);
      case 31:
        return me("Activity");
      default:
        return "";
    }
  }
  function qa(e) {
    try {
      var n = "", l = null;
      do
        n += ur(e, l), l = e, e = e.return;
      while (e);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var es = Object.prototype.hasOwnProperty, ti = s.unstable_scheduleCallback, gn = s.unstable_cancelCallback, Ds = s.unstable_shouldYield, hr = s.unstable_requestPaint, _e = s.unstable_now, Sc = s.unstable_getCurrentPriorityLevel, dr = s.unstable_ImmediatePriority, Gi = s.unstable_UserBlockingPriority, gi = s.unstable_NormalPriority, is = s.unstable_LowPriority, $a = s.unstable_IdlePriority, zi = s.log, fr = s.unstable_setDisableYieldValue, ns = null, je = null;
  function ei(e) {
    if (typeof zi == "function" && fr(e), je && typeof je.setStrictMode == "function")
      try {
        je.setStrictMode(ns, e);
      } catch {
      }
  }
  var Se = Math.clz32 ? Math.clz32 : Nc, Mc = Math.log, mr = Math.LN2;
  function Nc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Mc(e) / mr | 0) | 0;
  }
  var Rs = 256, Ls = 262144, It = 4194304;
  function Ft(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ce(e, n, l) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var d = 0, p = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var _ = o & 134217727;
    return _ !== 0 ? (o = _ & ~p, o !== 0 ? d = Ft(o) : (x &= _, x !== 0 ? d = Ft(x) : l || (l = _ & ~e, l !== 0 && (d = Ft(l))))) : (_ = o & ~p, _ !== 0 ? d = Ft(_) : x !== 0 ? d = Ft(x) : l || (l = o & ~e, l !== 0 && (d = Ft(l)))), d === 0 ? 0 : n !== 0 && n !== d && (n & p) === 0 && (p = d & -d, l = n & -n, p >= l || p === 32 && (l & 4194048) !== 0) ? n : d;
  }
  function Te(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Ae(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Me() {
    var e = It;
    return It <<= 1, (It & 62914560) === 0 && (It = 4194304), e;
  }
  function Oe(e) {
    for (var n = [], l = 0; 31 > l; l++) n.push(e);
    return n;
  }
  function ii(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function le(e, n, l, o, d, p) {
    var x = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var _ = e.entanglements, C = e.expirationTimes, U = e.hiddenUpdates;
    for (l = x & ~l; 0 < l; ) {
      var Q = 31 - Se(l), K = 1 << Q;
      _[Q] = 0, C[Q] = -1;
      var H = U[Q];
      if (H !== null)
        for (U[Q] = null, Q = 0; Q < H.length; Q++) {
          var q = H[Q];
          q !== null && (q.lane &= -536870913);
        }
      l &= ~K;
    }
    o !== 0 && bi(e, o, 0), p !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= p & ~(x & ~n));
  }
  function bi(e, n, l) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var o = 31 - Se(n);
    e.entangledLanes |= n, e.entanglements[o] = e.entanglements[o] | 1073741824 | l & 261930;
  }
  function Ge(e, n) {
    var l = e.entangledLanes |= n;
    for (e = e.entanglements; l; ) {
      var o = 31 - Se(l), d = 1 << o;
      d & n | e[o] & n && (e[o] |= n), l &= ~d;
    }
  }
  function ni(e, n) {
    var l = n & -n;
    return l = (l & 42) !== 0 ? 1 : Ki(l), (l & (e.suspendedLanes | n)) !== 0 ? 0 : l;
  }
  function Ki(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Xi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function xi() {
    var e = Z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ng(e.type));
  }
  function bn(e, n) {
    var l = Z.p;
    try {
      return Z.p = e, n();
    } finally {
      Z.p = l;
    }
  }
  var si = Math.random().toString(36).slice(2), pe = "__reactFiber$" + si, De = "__reactProps$" + si, Bs = "__reactContainer$" + si, jc = "__reactEvents$" + si, tx = "__reactListeners$" + si, ex = "__reactHandles$" + si, yf = "__reactResources$" + si, Qa = "__reactMarker$" + si;
  function Cc(e) {
    delete e[pe], delete e[De], delete e[jc], delete e[tx], delete e[ex];
  }
  function Us(e) {
    var n = e[pe];
    if (n) return n;
    for (var l = e.parentNode; l; ) {
      if (n = l[Bs] || l[pe]) {
        if (l = n.alternate, n.child !== null || l !== null && l.child !== null)
          for (e = $v(e); e !== null; ) {
            if (l = e[pe]) return l;
            e = $v(e);
          }
        return n;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Hs(e) {
    if (e = e[pe] || e[Bs]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Va(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(a(33));
  }
  function qs(e) {
    var n = e[yf];
    return n || (n = e[yf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function ue(e) {
    e[Qa] = !0;
  }
  var wf = /* @__PURE__ */ new Set(), _f = {};
  function ss(e, n) {
    $s(e, n), $s(e + "Capture", n);
  }
  function $s(e, n) {
    for (_f[e] = n, e = 0; e < n.length; e++)
      wf.add(n[e]);
  }
  var ix = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Sf = {}, Mf = {};
  function nx(e) {
    return es.call(Mf, e) ? !0 : es.call(Sf, e) ? !1 : ix.test(e) ? Mf[e] = !0 : (Sf[e] = !0, !1);
  }
  function pr(e, n, l) {
    if (nx(n))
      if (l === null) e.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + l);
      }
  }
  function vr(e, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + l);
    }
  }
  function Zi(e, n, l, o) {
    if (o === null) e.removeAttribute(l);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(n, l, "" + o);
    }
  }
  function ai(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Nf(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function sx(e, n, l) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var d = o.get, p = o.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return d.call(this);
        },
        set: function(x) {
          l = "" + x, p.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(x) {
          l = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function kc(e) {
    if (!e._valueTracker) {
      var n = Nf(e) ? "checked" : "value";
      e._valueTracker = sx(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function jf(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var l = n.getValue(), o = "";
    return e && (o = Nf(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== l ? (n.setValue(e), !0) : !1;
  }
  function gr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ax = /[\n"\\]/g;
  function li(e) {
    return e.replace(
      ax,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ec(e, n, l, o, d, p, x, _) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + ai(n)) : e.value !== "" + ai(n) && (e.value = "" + ai(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? zc(e, x, ai(n)) : l != null ? zc(e, x, ai(l)) : o != null && e.removeAttribute("value"), d == null && p != null && (e.defaultChecked = !!p), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? e.name = "" + ai(_) : e.removeAttribute("name");
  }
  function Cf(e, n, l, o, d, p, x, _) {
    if (p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.type = p), n != null || l != null) {
      if (!(p !== "submit" && p !== "reset" || n != null)) {
        kc(e);
        return;
      }
      l = l != null ? "" + ai(l) : "", n = n != null ? "" + ai(n) : l, _ || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = o ?? d, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = _ ? e.checked : !!o, e.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), kc(e);
  }
  function zc(e, n, l) {
    n === "number" && gr(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Qs(e, n, l, o) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < l.length; d++)
        n["$" + l[d]] = !0;
      for (l = 0; l < e.length; l++)
        d = n.hasOwnProperty("$" + e[l].value), e[l].selected !== d && (e[l].selected = d), d && o && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + ai(l), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === l) {
          e[d].selected = !0, o && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function kf(e, n, l) {
    if (n != null && (n = "" + ai(n), n !== e.value && (e.value = n), l == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = l != null ? "" + ai(l) : "";
  }
  function Ef(e, n, l, o) {
    if (n == null) {
      if (o != null) {
        if (l != null) throw Error(a(92));
        if (Ot(o)) {
          if (1 < o.length) throw Error(a(93));
          o = o[0];
        }
        l = o;
      }
      l == null && (l = ""), n = l;
    }
    l = ai(n), e.defaultValue = l, o = e.textContent, o === l && o !== "" && o !== null && (e.value = o), kc(e);
  }
  function Vs(e, n) {
    if (n) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var lx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function zf(e, n, l) {
    var o = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? o ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : o ? e.setProperty(n, l) : typeof l != "number" || l === 0 || lx.has(n) ? n === "float" ? e.cssFloat = l : e[n] = ("" + l).trim() : e[n] = l + "px";
  }
  function Tf(e, n, l) {
    if (n != null && typeof n != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var o in l)
        !l.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var d in n)
        o = n[d], n.hasOwnProperty(d) && l[d] !== o && zf(e, d, o);
    } else
      for (var p in n)
        n.hasOwnProperty(p) && zf(e, p, n[p]);
  }
  function Tc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var rx = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ox = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function br(e) {
    return ox.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wi() {
  }
  var Ac = null;
  function Oc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ys = null, Gs = null;
  function Af(e) {
    var n = Hs(e);
    if (n && (e = n.stateNode)) {
      var l = e[De] || null;
      t: switch (e = n.stateNode, n.type) {
        case "input":
          if (Ec(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), n = l.name, l.type === "radio" && n != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + li(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < l.length; n++) {
              var o = l[n];
              if (o !== e && o.form === e.form) {
                var d = o[De] || null;
                if (!d) throw Error(a(90));
                Ec(
                  o,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name
                );
              }
            }
            for (n = 0; n < l.length; n++)
              o = l[n], o.form === e.form && jf(o);
          }
          break t;
        case "textarea":
          kf(e, l.value, l.defaultValue);
          break t;
        case "select":
          n = l.value, n != null && Qs(e, !!l.multiple, n, !1);
      }
    }
  }
  var Dc = !1;
  function Of(e, n, l) {
    if (Dc) return e(n, l);
    Dc = !0;
    try {
      var o = e(n);
      return o;
    } finally {
      if (Dc = !1, (Ys !== null || Gs !== null) && (ao(), Ys && (n = Ys, e = Gs, Gs = Ys = null, Af(n), e)))
        for (n = 0; n < e.length; n++) Af(e[n]);
    }
  }
  function Ya(e, n) {
    var l = e.stateNode;
    if (l === null) return null;
    var o = l[De] || null;
    if (o === null) return null;
    l = o[n];
    t: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break t;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        a(231, n, typeof l)
      );
    return l;
  }
  var Ii = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Rc = !1;
  if (Ii)
    try {
      var Ga = {};
      Object.defineProperty(Ga, "passive", {
        get: function() {
          Rc = !0;
        }
      }), window.addEventListener("test", Ga, Ga), window.removeEventListener("test", Ga, Ga);
    } catch {
      Rc = !1;
    }
  var xn = null, Lc = null, xr = null;
  function Df() {
    if (xr) return xr;
    var e, n = Lc, l = n.length, o, d = "value" in xn ? xn.value : xn.textContent, p = d.length;
    for (e = 0; e < l && n[e] === d[e]; e++) ;
    var x = l - e;
    for (o = 1; o <= x && n[l - o] === d[p - o]; o++) ;
    return xr = d.slice(e, 1 < o ? 1 - o : void 0);
  }
  function yr(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function wr() {
    return !0;
  }
  function Rf() {
    return !1;
  }
  function Re(e) {
    function n(l, o, d, p, x) {
      this._reactName = l, this._targetInst = d, this.type = o, this.nativeEvent = p, this.target = x, this.currentTarget = null;
      for (var _ in e)
        e.hasOwnProperty(_) && (l = e[_], this[_] = l ? l(p) : p[_]);
      return this.isDefaultPrevented = (p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1) ? wr : Rf, this.isPropagationStopped = Rf, this;
    }
    return b(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = wr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = wr);
      },
      persist: function() {
      },
      isPersistent: wr
    }), n;
  }
  var as = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _r = Re(as), Ka = b({}, as, { view: 0, detail: 0 }), cx = Re(Ka), Bc, Uc, Xa, Sr = b({}, Ka, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: qc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Xa && (Xa && e.type === "mousemove" ? (Bc = e.screenX - Xa.screenX, Uc = e.screenY - Xa.screenY) : Uc = Bc = 0, Xa = e), Bc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Uc;
    }
  }), Lf = Re(Sr), ux = b({}, Sr, { dataTransfer: 0 }), hx = Re(ux), dx = b({}, Ka, { relatedTarget: 0 }), Hc = Re(dx), fx = b({}, as, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mx = Re(fx), px = b({}, as, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), vx = Re(px), gx = b({}, as, { data: 0 }), Bf = Re(gx), bx = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, xx = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, yx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function wx(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = yx[e]) ? !!n[e] : !1;
  }
  function qc() {
    return wx;
  }
  var _x = b({}, Ka, {
    key: function(e) {
      if (e.key) {
        var n = bx[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = yr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xx[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: qc,
    charCode: function(e) {
      return e.type === "keypress" ? yr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? yr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Sx = Re(_x), Mx = b({}, Sr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Uf = Re(Mx), Nx = b({}, Ka, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: qc
  }), jx = Re(Nx), Cx = b({}, as, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kx = Re(Cx), Ex = b({}, Sr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zx = Re(Ex), Tx = b({}, as, {
    newState: 0,
    oldState: 0
  }), Ax = Re(Tx), Ox = [9, 13, 27, 32], $c = Ii && "CompositionEvent" in window, Za = null;
  Ii && "documentMode" in document && (Za = document.documentMode);
  var Dx = Ii && "TextEvent" in window && !Za, Hf = Ii && (!$c || Za && 8 < Za && 11 >= Za), qf = " ", $f = !1;
  function Qf(e, n) {
    switch (e) {
      case "keyup":
        return Ox.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ks = !1;
  function Rx(e, n) {
    switch (e) {
      case "compositionend":
        return Vf(n);
      case "keypress":
        return n.which !== 32 ? null : ($f = !0, qf);
      case "textInput":
        return e = n.data, e === qf && $f ? null : e;
      default:
        return null;
    }
  }
  function Lx(e, n) {
    if (Ks)
      return e === "compositionend" || !$c && Qf(e, n) ? (e = Df(), xr = Lc = xn = null, Ks = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Hf && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Bx = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Yf(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Bx[e.type] : n === "textarea";
  }
  function Gf(e, n, l, o) {
    Ys ? Gs ? Gs.push(o) : Gs = [o] : Ys = o, n = fo(n, "onChange"), 0 < n.length && (l = new _r(
      "onChange",
      "change",
      null,
      l,
      o
    ), e.push({ event: l, listeners: n }));
  }
  var Wa = null, Ia = null;
  function Ux(e) {
    Cv(e, 0);
  }
  function Mr(e) {
    var n = Va(e);
    if (jf(n)) return e;
  }
  function Kf(e, n) {
    if (e === "change") return n;
  }
  var Xf = !1;
  if (Ii) {
    var Qc;
    if (Ii) {
      var Vc = "oninput" in document;
      if (!Vc) {
        var Zf = document.createElement("div");
        Zf.setAttribute("oninput", "return;"), Vc = typeof Zf.oninput == "function";
      }
      Qc = Vc;
    } else Qc = !1;
    Xf = Qc && (!document.documentMode || 9 < document.documentMode);
  }
  function Wf() {
    Wa && (Wa.detachEvent("onpropertychange", If), Ia = Wa = null);
  }
  function If(e) {
    if (e.propertyName === "value" && Mr(Ia)) {
      var n = [];
      Gf(
        n,
        Ia,
        e,
        Oc(e)
      ), Of(Ux, n);
    }
  }
  function Hx(e, n, l) {
    e === "focusin" ? (Wf(), Wa = n, Ia = l, Wa.attachEvent("onpropertychange", If)) : e === "focusout" && Wf();
  }
  function qx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Mr(Ia);
  }
  function $x(e, n) {
    if (e === "click") return Mr(n);
  }
  function Qx(e, n) {
    if (e === "input" || e === "change")
      return Mr(n);
  }
  function Vx(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Ke = typeof Object.is == "function" ? Object.is : Vx;
  function Fa(e, n) {
    if (Ke(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var l = Object.keys(e), o = Object.keys(n);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var d = l[o];
      if (!es.call(n, d) || !Ke(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Ff(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Jf(e, n) {
    var l = Ff(e);
    e = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = e + l.textContent.length, e <= n && o >= n)
          return { node: l, offset: n - e };
        e = o;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Ff(l);
    }
  }
  function Pf(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Pf(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function tm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = gr(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof n.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = n.contentWindow;
      else break;
      n = gr(e.document);
    }
    return n;
  }
  function Yc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Yx = Ii && "documentMode" in document && 11 >= document.documentMode, Xs = null, Gc = null, Ja = null, Kc = !1;
  function em(e, n, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Kc || Xs == null || Xs !== gr(o) || (o = Xs, "selectionStart" in o && Yc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ja && Fa(Ja, o) || (Ja = o, o = fo(Gc, "onSelect"), 0 < o.length && (n = new _r(
      "onSelect",
      "select",
      null,
      n,
      l
    ), e.push({ event: n, listeners: o }), n.target = Xs)));
  }
  function ls(e, n) {
    var l = {};
    return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
  }
  var Zs = {
    animationend: ls("Animation", "AnimationEnd"),
    animationiteration: ls("Animation", "AnimationIteration"),
    animationstart: ls("Animation", "AnimationStart"),
    transitionrun: ls("Transition", "TransitionRun"),
    transitionstart: ls("Transition", "TransitionStart"),
    transitioncancel: ls("Transition", "TransitionCancel"),
    transitionend: ls("Transition", "TransitionEnd")
  }, Xc = {}, im = {};
  Ii && (im = document.createElement("div").style, "AnimationEvent" in window || (delete Zs.animationend.animation, delete Zs.animationiteration.animation, delete Zs.animationstart.animation), "TransitionEvent" in window || delete Zs.transitionend.transition);
  function rs(e) {
    if (Xc[e]) return Xc[e];
    if (!Zs[e]) return e;
    var n = Zs[e], l;
    for (l in n)
      if (n.hasOwnProperty(l) && l in im)
        return Xc[e] = n[l];
    return e;
  }
  var nm = rs("animationend"), sm = rs("animationiteration"), am = rs("animationstart"), Gx = rs("transitionrun"), Kx = rs("transitionstart"), Xx = rs("transitioncancel"), lm = rs("transitionend"), rm = /* @__PURE__ */ new Map(), Zc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Zc.push("scrollEnd");
  function yi(e, n) {
    rm.set(e, n), ss(n, [e]);
  }
  var Nr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, ri = [], Ws = 0, Wc = 0;
  function jr() {
    for (var e = Ws, n = Wc = Ws = 0; n < e; ) {
      var l = ri[n];
      ri[n++] = null;
      var o = ri[n];
      ri[n++] = null;
      var d = ri[n];
      ri[n++] = null;
      var p = ri[n];
      if (ri[n++] = null, o !== null && d !== null) {
        var x = o.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), o.pending = d;
      }
      p !== 0 && om(l, d, p);
    }
  }
  function Cr(e, n, l, o) {
    ri[Ws++] = e, ri[Ws++] = n, ri[Ws++] = l, ri[Ws++] = o, Wc |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Ic(e, n, l, o) {
    return Cr(e, n, l, o), kr(e);
  }
  function os(e, n) {
    return Cr(e, null, null, n), kr(e);
  }
  function om(e, n, l) {
    e.lanes |= l;
    var o = e.alternate;
    o !== null && (o.lanes |= l);
    for (var d = !1, p = e.return; p !== null; )
      p.childLanes |= l, o = p.alternate, o !== null && (o.childLanes |= l), p.tag === 22 && (e = p.stateNode, e === null || e._visibility & 1 || (d = !0)), e = p, p = p.return;
    return e.tag === 3 ? (p = e.stateNode, d && n !== null && (d = 31 - Se(l), e = p.hiddenUpdates, o = e[d], o === null ? e[d] = [n] : o.push(n), n.lane = l | 536870912), p) : null;
  }
  function kr(e) {
    if (50 < yl)
      throw yl = 0, ah = null, Error(a(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Is = {};
  function Zx(e, n, l, o) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xe(e, n, l, o) {
    return new Zx(e, n, l, o);
  }
  function Fc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Fi(e, n) {
    var l = e.alternate;
    return l === null ? (l = Xe(
      e.tag,
      n,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, n = e.dependencies, l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function cm(e, n) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, n = l.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Er(e, n, l, o, d, p) {
    var x = 0;
    if (o = e, typeof e == "function") Fc(e) && (x = 1);
    else if (typeof e == "string")
      x = Py(
        e,
        l,
        et.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case P:
          return e = Xe(31, l, n, d), e.elementType = P, e.lanes = p, e;
        case M:
          return cs(l.children, d, p, n);
        case N:
          x = 8, d |= 24;
          break;
        case k:
          return e = Xe(12, l, n, d | 2), e.elementType = k, e.lanes = p, e;
        case V:
          return e = Xe(13, l, n, d), e.elementType = V, e.lanes = p, e;
        case G:
          return e = Xe(19, l, n, d), e.elementType = G, e.lanes = p, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case D:
                x = 10;
                break t;
              case T:
                x = 9;
                break t;
              case O:
                x = 11;
                break t;
              case R:
                x = 14;
                break t;
              case X:
                x = 16, o = null;
                break t;
            }
          x = 29, l = Error(
            a(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return n = Xe(x, l, n, d), n.elementType = e, n.type = o, n.lanes = p, n;
  }
  function cs(e, n, l, o) {
    return e = Xe(7, e, o, n), e.lanes = l, e;
  }
  function Jc(e, n, l) {
    return e = Xe(6, e, null, n), e.lanes = l, e;
  }
  function um(e) {
    var n = Xe(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Pc(e, n, l) {
    return n = Xe(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = l, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var hm = /* @__PURE__ */ new WeakMap();
  function oi(e, n) {
    if (typeof e == "object" && e !== null) {
      var l = hm.get(e);
      return l !== void 0 ? l : (n = {
        value: e,
        source: n,
        stack: qa(n)
      }, hm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: qa(n)
    };
  }
  var Fs = [], Js = 0, zr = null, Pa = 0, ci = [], ui = 0, yn = null, Ti = 1, Ai = "";
  function Ji(e, n) {
    Fs[Js++] = Pa, Fs[Js++] = zr, zr = e, Pa = n;
  }
  function dm(e, n, l) {
    ci[ui++] = Ti, ci[ui++] = Ai, ci[ui++] = yn, yn = e;
    var o = Ti;
    e = Ai;
    var d = 32 - Se(o) - 1;
    o &= ~(1 << d), l += 1;
    var p = 32 - Se(n) + d;
    if (30 < p) {
      var x = d - d % 5;
      p = (o & (1 << x) - 1).toString(32), o >>= x, d -= x, Ti = 1 << 32 - Se(n) + d | l << d | o, Ai = p + e;
    } else
      Ti = 1 << p | l << d | o, Ai = e;
  }
  function tu(e) {
    e.return !== null && (Ji(e, 1), dm(e, 1, 0));
  }
  function eu(e) {
    for (; e === zr; )
      zr = Fs[--Js], Fs[Js] = null, Pa = Fs[--Js], Fs[Js] = null;
    for (; e === yn; )
      yn = ci[--ui], ci[ui] = null, Ai = ci[--ui], ci[ui] = null, Ti = ci[--ui], ci[ui] = null;
  }
  function fm(e, n) {
    ci[ui++] = Ti, ci[ui++] = Ai, ci[ui++] = yn, Ti = n.id, Ai = n.overflow, yn = e;
  }
  var ve = null, Yt = null, kt = !1, wn = null, hi = !1, iu = Error(a(519));
  function _n(e) {
    var n = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw tl(oi(n, e)), iu;
  }
  function mm(e) {
    var n = e.stateNode, l = e.type, o = e.memoizedProps;
    switch (n[pe] = e, n[De] = o, l) {
      case "dialog":
        _t("cancel", n), _t("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        _t("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < _l.length; l++)
          _t(_l[l], n);
        break;
      case "source":
        _t("error", n);
        break;
      case "img":
      case "image":
      case "link":
        _t("error", n), _t("load", n);
        break;
      case "details":
        _t("toggle", n);
        break;
      case "input":
        _t("invalid", n), Cf(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        _t("invalid", n);
        break;
      case "textarea":
        _t("invalid", n), Ef(n, o.value, o.defaultValue, o.children);
    }
    l = o.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || n.textContent === "" + l || o.suppressHydrationWarning === !0 || Tv(n.textContent, l) ? (o.popover != null && (_t("beforetoggle", n), _t("toggle", n)), o.onScroll != null && _t("scroll", n), o.onScrollEnd != null && _t("scrollend", n), o.onClick != null && (n.onclick = Wi), n = !0) : n = !1, n || _n(e, !0);
  }
  function pm(e) {
    for (ve = e.return; ve; )
      switch (ve.tag) {
        case 5:
        case 31:
        case 13:
          hi = !1;
          return;
        case 27:
        case 3:
          hi = !0;
          return;
        default:
          ve = ve.return;
      }
  }
  function Ps(e) {
    if (e !== ve) return !1;
    if (!kt) return pm(e), kt = !0, !1;
    var n = e.tag, l;
    if ((l = n !== 3 && n !== 27) && ((l = n === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || yh(e.type, e.memoizedProps)), l = !l), l && Yt && _n(e), pm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Yt = qv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Yt = qv(e);
    } else
      n === 27 ? (n = Yt, Ln(e.type) ? (e = Nh, Nh = null, Yt = e) : Yt = n) : Yt = ve ? fi(e.stateNode.nextSibling) : null;
    return !0;
  }
  function us() {
    Yt = ve = null, kt = !1;
  }
  function nu() {
    var e = wn;
    return e !== null && (He === null ? He = e : He.push.apply(
      He,
      e
    ), wn = null), e;
  }
  function tl(e) {
    wn === null ? wn = [e] : wn.push(e);
  }
  var su = E(null), hs = null, Pi = null;
  function Sn(e, n, l) {
    I(su, n._currentValue), n._currentValue = l;
  }
  function tn(e) {
    e._currentValue = su.current, $(su);
  }
  function au(e, n, l) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), e === l) break;
      e = e.return;
    }
  }
  function lu(e, n, l, o) {
    var d = e.child;
    for (d !== null && (d.return = e); d !== null; ) {
      var p = d.dependencies;
      if (p !== null) {
        var x = d.child;
        p = p.firstContext;
        t: for (; p !== null; ) {
          var _ = p;
          p = d;
          for (var C = 0; C < n.length; C++)
            if (_.context === n[C]) {
              p.lanes |= l, _ = p.alternate, _ !== null && (_.lanes |= l), au(
                p.return,
                l,
                e
              ), o || (x = null);
              break t;
            }
          p = _.next;
        }
      } else if (d.tag === 18) {
        if (x = d.return, x === null) throw Error(a(341));
        x.lanes |= l, p = x.alternate, p !== null && (p.lanes |= l), au(x, l, e), x = null;
      } else x = d.child;
      if (x !== null) x.return = d;
      else
        for (x = d; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (d = x.sibling, d !== null) {
            d.return = x.return, x = d;
            break;
          }
          x = x.return;
        }
      d = x;
    }
  }
  function ta(e, n, l, o) {
    e = null;
    for (var d = n, p = !1; d !== null; ) {
      if (!p) {
        if ((d.flags & 524288) !== 0) p = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var x = d.alternate;
        if (x === null) throw Error(a(387));
        if (x = x.memoizedProps, x !== null) {
          var _ = d.type;
          Ke(d.pendingProps.value, x.value) || (e !== null ? e.push(_) : e = [_]);
        }
      } else if (d === Ct.current) {
        if (x = d.alternate, x === null) throw Error(a(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Cl) : e = [Cl]);
      }
      d = d.return;
    }
    e !== null && lu(
      n,
      e,
      l,
      o
    ), n.flags |= 262144;
  }
  function Tr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ke(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ds(e) {
    hs = e, Pi = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ge(e) {
    return vm(hs, e);
  }
  function Ar(e, n) {
    return hs === null && ds(e), vm(e, n);
  }
  function vm(e, n) {
    var l = n._currentValue;
    if (n = { context: n, memoizedValue: l, next: null }, Pi === null) {
      if (e === null) throw Error(a(308));
      Pi = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Pi = Pi.next = n;
    return l;
  }
  var Wx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(l, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Ix = s.unstable_scheduleCallback, Fx = s.unstable_NormalPriority, ee = {
    $$typeof: D,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ru() {
    return {
      controller: new Wx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function el(e) {
    e.refCount--, e.refCount === 0 && Ix(Fx, function() {
      e.controller.abort();
    });
  }
  var il = null, ou = 0, ea = 0, ia = null;
  function Jx(e, n) {
    if (il === null) {
      var l = il = [];
      ou = 0, ea = hh(), ia = {
        status: "pending",
        value: void 0,
        then: function(o) {
          l.push(o);
        }
      };
    }
    return ou++, n.then(gm, gm), n;
  }
  function gm() {
    if (--ou === 0 && il !== null) {
      ia !== null && (ia.status = "fulfilled");
      var e = il;
      il = null, ea = 0, ia = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Px(e, n) {
    var l = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(d) {
        l.push(d);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var d = 0; d < l.length; d++) (0, l[d])(n);
      },
      function(d) {
        for (o.status = "rejected", o.reason = d, d = 0; d < l.length; d++)
          (0, l[d])(void 0);
      }
    ), o;
  }
  var bm = L.S;
  L.S = function(e, n) {
    ev = _e(), typeof n == "object" && n !== null && typeof n.then == "function" && Jx(e, n), bm !== null && bm(e, n);
  };
  var fs = E(null);
  function cu() {
    var e = fs.current;
    return e !== null ? e : Qt.pooledCache;
  }
  function Or(e, n) {
    n === null ? I(fs, fs.current) : I(fs, n.pool);
  }
  function xm() {
    var e = cu();
    return e === null ? null : { parent: ee._currentValue, pool: e };
  }
  var na = Error(a(460)), uu = Error(a(474)), Dr = Error(a(542)), Rr = { then: function() {
  } };
  function ym(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function wm(e, n, l) {
    switch (l = e[l], l === void 0 ? e.push(n) : l !== n && (n.then(Wi, Wi), n = l), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Sm(e), e;
      default:
        if (typeof n.status == "string") n.then(Wi, Wi);
        else {
          if (e = Qt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(a(482));
          e = n, e.status = "pending", e.then(
            function(o) {
              if (n.status === "pending") {
                var d = n;
                d.status = "fulfilled", d.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var d = n;
                d.status = "rejected", d.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, Sm(e), e;
        }
        throw ps = n, na;
    }
  }
  function ms(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (ps = l, na) : l;
    }
  }
  var ps = null;
  function _m() {
    if (ps === null) throw Error(a(459));
    var e = ps;
    return ps = null, e;
  }
  function Sm(e) {
    if (e === na || e === Dr)
      throw Error(a(483));
  }
  var sa = null, nl = 0;
  function Lr(e) {
    var n = nl;
    return nl += 1, sa === null && (sa = []), wm(sa, e, n);
  }
  function sl(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Br(e, n) {
    throw n.$$typeof === y ? Error(a(525)) : (e = Object.prototype.toString.call(n), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Mm(e) {
    function n(A, z) {
      if (e) {
        var B = A.deletions;
        B === null ? (A.deletions = [z], A.flags |= 16) : B.push(z);
      }
    }
    function l(A, z) {
      if (!e) return null;
      for (; z !== null; )
        n(A, z), z = z.sibling;
      return null;
    }
    function o(A) {
      for (var z = /* @__PURE__ */ new Map(); A !== null; )
        A.key !== null ? z.set(A.key, A) : z.set(A.index, A), A = A.sibling;
      return z;
    }
    function d(A, z) {
      return A = Fi(A, z), A.index = 0, A.sibling = null, A;
    }
    function p(A, z, B) {
      return A.index = B, e ? (B = A.alternate, B !== null ? (B = B.index, B < z ? (A.flags |= 67108866, z) : B) : (A.flags |= 67108866, z)) : (A.flags |= 1048576, z);
    }
    function x(A) {
      return e && A.alternate === null && (A.flags |= 67108866), A;
    }
    function _(A, z, B, Y) {
      return z === null || z.tag !== 6 ? (z = Jc(B, A.mode, Y), z.return = A, z) : (z = d(z, B), z.return = A, z);
    }
    function C(A, z, B, Y) {
      var ct = B.type;
      return ct === M ? Q(
        A,
        z,
        B.props.children,
        Y,
        B.key
      ) : z !== null && (z.elementType === ct || typeof ct == "object" && ct !== null && ct.$$typeof === X && ms(ct) === z.type) ? (z = d(z, B.props), sl(z, B), z.return = A, z) : (z = Er(
        B.type,
        B.key,
        B.props,
        null,
        A.mode,
        Y
      ), sl(z, B), z.return = A, z);
    }
    function U(A, z, B, Y) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== B.containerInfo || z.stateNode.implementation !== B.implementation ? (z = Pc(B, A.mode, Y), z.return = A, z) : (z = d(z, B.children || []), z.return = A, z);
    }
    function Q(A, z, B, Y, ct) {
      return z === null || z.tag !== 7 ? (z = cs(
        B,
        A.mode,
        Y,
        ct
      ), z.return = A, z) : (z = d(z, B), z.return = A, z);
    }
    function K(A, z, B) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = Jc(
          "" + z,
          A.mode,
          B
        ), z.return = A, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case S:
            return B = Er(
              z.type,
              z.key,
              z.props,
              null,
              A.mode,
              B
            ), sl(B, z), B.return = A, B;
          case w:
            return z = Pc(
              z,
              A.mode,
              B
            ), z.return = A, z;
          case X:
            return z = ms(z), K(A, z, B);
        }
        if (Ot(z) || F(z))
          return z = cs(
            z,
            A.mode,
            B,
            null
          ), z.return = A, z;
        if (typeof z.then == "function")
          return K(A, Lr(z), B);
        if (z.$$typeof === D)
          return K(
            A,
            Ar(A, z),
            B
          );
        Br(A, z);
      }
      return null;
    }
    function H(A, z, B, Y) {
      var ct = z !== null ? z.key : null;
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return ct !== null ? null : _(A, z, "" + B, Y);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return B.key === ct ? C(A, z, B, Y) : null;
          case w:
            return B.key === ct ? U(A, z, B, Y) : null;
          case X:
            return B = ms(B), H(A, z, B, Y);
        }
        if (Ot(B) || F(B))
          return ct !== null ? null : Q(A, z, B, Y, null);
        if (typeof B.then == "function")
          return H(
            A,
            z,
            Lr(B),
            Y
          );
        if (B.$$typeof === D)
          return H(
            A,
            z,
            Ar(A, B),
            Y
          );
        Br(A, B);
      }
      return null;
    }
    function q(A, z, B, Y, ct) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return A = A.get(B) || null, _(z, A, "" + Y, ct);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case S:
            return A = A.get(
              Y.key === null ? B : Y.key
            ) || null, C(z, A, Y, ct);
          case w:
            return A = A.get(
              Y.key === null ? B : Y.key
            ) || null, U(z, A, Y, ct);
          case X:
            return Y = ms(Y), q(
              A,
              z,
              B,
              Y,
              ct
            );
        }
        if (Ot(Y) || F(Y))
          return A = A.get(B) || null, Q(z, A, Y, ct, null);
        if (typeof Y.then == "function")
          return q(
            A,
            z,
            B,
            Lr(Y),
            ct
          );
        if (Y.$$typeof === D)
          return q(
            A,
            z,
            B,
            Ar(z, Y),
            ct
          );
        Br(z, Y);
      }
      return null;
    }
    function nt(A, z, B, Y) {
      for (var ct = null, zt = null, lt = z, yt = z = 0, Mt = null; lt !== null && yt < B.length; yt++) {
        lt.index > yt ? (Mt = lt, lt = null) : Mt = lt.sibling;
        var Tt = H(
          A,
          lt,
          B[yt],
          Y
        );
        if (Tt === null) {
          lt === null && (lt = Mt);
          break;
        }
        e && lt && Tt.alternate === null && n(A, lt), z = p(Tt, z, yt), zt === null ? ct = Tt : zt.sibling = Tt, zt = Tt, lt = Mt;
      }
      if (yt === B.length)
        return l(A, lt), kt && Ji(A, yt), ct;
      if (lt === null) {
        for (; yt < B.length; yt++)
          lt = K(A, B[yt], Y), lt !== null && (z = p(
            lt,
            z,
            yt
          ), zt === null ? ct = lt : zt.sibling = lt, zt = lt);
        return kt && Ji(A, yt), ct;
      }
      for (lt = o(lt); yt < B.length; yt++)
        Mt = q(
          lt,
          A,
          yt,
          B[yt],
          Y
        ), Mt !== null && (e && Mt.alternate !== null && lt.delete(
          Mt.key === null ? yt : Mt.key
        ), z = p(
          Mt,
          z,
          yt
        ), zt === null ? ct = Mt : zt.sibling = Mt, zt = Mt);
      return e && lt.forEach(function($n) {
        return n(A, $n);
      }), kt && Ji(A, yt), ct;
    }
    function ut(A, z, B, Y) {
      if (B == null) throw Error(a(151));
      for (var ct = null, zt = null, lt = z, yt = z = 0, Mt = null, Tt = B.next(); lt !== null && !Tt.done; yt++, Tt = B.next()) {
        lt.index > yt ? (Mt = lt, lt = null) : Mt = lt.sibling;
        var $n = H(A, lt, Tt.value, Y);
        if ($n === null) {
          lt === null && (lt = Mt);
          break;
        }
        e && lt && $n.alternate === null && n(A, lt), z = p($n, z, yt), zt === null ? ct = $n : zt.sibling = $n, zt = $n, lt = Mt;
      }
      if (Tt.done)
        return l(A, lt), kt && Ji(A, yt), ct;
      if (lt === null) {
        for (; !Tt.done; yt++, Tt = B.next())
          Tt = K(A, Tt.value, Y), Tt !== null && (z = p(Tt, z, yt), zt === null ? ct = Tt : zt.sibling = Tt, zt = Tt);
        return kt && Ji(A, yt), ct;
      }
      for (lt = o(lt); !Tt.done; yt++, Tt = B.next())
        Tt = q(lt, A, yt, Tt.value, Y), Tt !== null && (e && Tt.alternate !== null && lt.delete(Tt.key === null ? yt : Tt.key), z = p(Tt, z, yt), zt === null ? ct = Tt : zt.sibling = Tt, zt = Tt);
      return e && lt.forEach(function(uw) {
        return n(A, uw);
      }), kt && Ji(A, yt), ct;
    }
    function $t(A, z, B, Y) {
      if (typeof B == "object" && B !== null && B.type === M && B.key === null && (B = B.props.children), typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            t: {
              for (var ct = B.key; z !== null; ) {
                if (z.key === ct) {
                  if (ct = B.type, ct === M) {
                    if (z.tag === 7) {
                      l(
                        A,
                        z.sibling
                      ), Y = d(
                        z,
                        B.props.children
                      ), Y.return = A, A = Y;
                      break t;
                    }
                  } else if (z.elementType === ct || typeof ct == "object" && ct !== null && ct.$$typeof === X && ms(ct) === z.type) {
                    l(
                      A,
                      z.sibling
                    ), Y = d(z, B.props), sl(Y, B), Y.return = A, A = Y;
                    break t;
                  }
                  l(A, z);
                  break;
                } else n(A, z);
                z = z.sibling;
              }
              B.type === M ? (Y = cs(
                B.props.children,
                A.mode,
                Y,
                B.key
              ), Y.return = A, A = Y) : (Y = Er(
                B.type,
                B.key,
                B.props,
                null,
                A.mode,
                Y
              ), sl(Y, B), Y.return = A, A = Y);
            }
            return x(A);
          case w:
            t: {
              for (ct = B.key; z !== null; ) {
                if (z.key === ct)
                  if (z.tag === 4 && z.stateNode.containerInfo === B.containerInfo && z.stateNode.implementation === B.implementation) {
                    l(
                      A,
                      z.sibling
                    ), Y = d(z, B.children || []), Y.return = A, A = Y;
                    break t;
                  } else {
                    l(A, z);
                    break;
                  }
                else n(A, z);
                z = z.sibling;
              }
              Y = Pc(B, A.mode, Y), Y.return = A, A = Y;
            }
            return x(A);
          case X:
            return B = ms(B), $t(
              A,
              z,
              B,
              Y
            );
        }
        if (Ot(B))
          return nt(
            A,
            z,
            B,
            Y
          );
        if (F(B)) {
          if (ct = F(B), typeof ct != "function") throw Error(a(150));
          return B = ct.call(B), ut(
            A,
            z,
            B,
            Y
          );
        }
        if (typeof B.then == "function")
          return $t(
            A,
            z,
            Lr(B),
            Y
          );
        if (B.$$typeof === D)
          return $t(
            A,
            z,
            Ar(A, B),
            Y
          );
        Br(A, B);
      }
      return typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint" ? (B = "" + B, z !== null && z.tag === 6 ? (l(A, z.sibling), Y = d(z, B), Y.return = A, A = Y) : (l(A, z), Y = Jc(B, A.mode, Y), Y.return = A, A = Y), x(A)) : l(A, z);
    }
    return function(A, z, B, Y) {
      try {
        nl = 0;
        var ct = $t(
          A,
          z,
          B,
          Y
        );
        return sa = null, ct;
      } catch (lt) {
        if (lt === na || lt === Dr) throw lt;
        var zt = Xe(29, lt, null, A.mode);
        return zt.lanes = Y, zt.return = A, zt;
      }
    };
  }
  var vs = Mm(!0), Nm = Mm(!1), Mn = !1;
  function hu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function du(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Nn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function jn(e, n, l) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Rt & 2) !== 0) {
      var d = o.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), o.pending = n, n = kr(e), om(e, null, l), n;
    }
    return Cr(e, o, n, l), kr(e);
  }
  function al(e, n, l) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (l & 4194048) !== 0)) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, Ge(e, l);
    }
  }
  function fu(e, n) {
    var l = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var d = null, p = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var x = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          p === null ? d = p = x : p = p.next = x, l = l.next;
        } while (l !== null);
        p === null ? d = p = n : p = p.next = n;
      } else d = p = n;
      l = {
        baseState: o.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: p,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = n : e.next = n, l.lastBaseUpdate = n;
  }
  var mu = !1;
  function ll() {
    if (mu) {
      var e = ia;
      if (e !== null) throw e;
    }
  }
  function rl(e, n, l, o) {
    mu = !1;
    var d = e.updateQueue;
    Mn = !1;
    var p = d.firstBaseUpdate, x = d.lastBaseUpdate, _ = d.shared.pending;
    if (_ !== null) {
      d.shared.pending = null;
      var C = _, U = C.next;
      C.next = null, x === null ? p = U : x.next = U, x = C;
      var Q = e.alternate;
      Q !== null && (Q = Q.updateQueue, _ = Q.lastBaseUpdate, _ !== x && (_ === null ? Q.firstBaseUpdate = U : _.next = U, Q.lastBaseUpdate = C));
    }
    if (p !== null) {
      var K = d.baseState;
      x = 0, Q = U = C = null, _ = p;
      do {
        var H = _.lane & -536870913, q = H !== _.lane;
        if (q ? (St & H) === H : (o & H) === H) {
          H !== 0 && H === ea && (mu = !0), Q !== null && (Q = Q.next = {
            lane: 0,
            tag: _.tag,
            payload: _.payload,
            callback: null,
            next: null
          });
          t: {
            var nt = e, ut = _;
            H = n;
            var $t = l;
            switch (ut.tag) {
              case 1:
                if (nt = ut.payload, typeof nt == "function") {
                  K = nt.call($t, K, H);
                  break t;
                }
                K = nt;
                break t;
              case 3:
                nt.flags = nt.flags & -65537 | 128;
              case 0:
                if (nt = ut.payload, H = typeof nt == "function" ? nt.call($t, K, H) : nt, H == null) break t;
                K = b({}, K, H);
                break t;
              case 2:
                Mn = !0;
            }
          }
          H = _.callback, H !== null && (e.flags |= 64, q && (e.flags |= 8192), q = d.callbacks, q === null ? d.callbacks = [H] : q.push(H));
        } else
          q = {
            lane: H,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null
          }, Q === null ? (U = Q = q, C = K) : Q = Q.next = q, x |= H;
        if (_ = _.next, _ === null) {
          if (_ = d.shared.pending, _ === null)
            break;
          q = _, _ = q.next, q.next = null, d.lastBaseUpdate = q, d.shared.pending = null;
        }
      } while (!0);
      Q === null && (C = K), d.baseState = C, d.firstBaseUpdate = U, d.lastBaseUpdate = Q, p === null && (d.shared.lanes = 0), Tn |= x, e.lanes = x, e.memoizedState = K;
    }
  }
  function jm(e, n) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(n);
  }
  function Cm(e, n) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        jm(l[e], n);
  }
  var aa = E(null), Ur = E(0);
  function km(e, n) {
    e = un, I(Ur, e), I(aa, n), un = e | n.baseLanes;
  }
  function pu() {
    I(Ur, un), I(aa, aa.current);
  }
  function vu() {
    un = Ur.current, $(aa), $(Ur);
  }
  var Ze = E(null), di = null;
  function Cn(e) {
    var n = e.alternate;
    I(Jt, Jt.current & 1), I(Ze, e), di === null && (n === null || aa.current !== null || n.memoizedState !== null) && (di = e);
  }
  function gu(e) {
    I(Jt, Jt.current), I(Ze, e), di === null && (di = e);
  }
  function Em(e) {
    e.tag === 22 ? (I(Jt, Jt.current), I(Ze, e), di === null && (di = e)) : kn();
  }
  function kn() {
    I(Jt, Jt.current), I(Ze, Ze.current);
  }
  function We(e) {
    $(Ze), di === e && (di = null), $(Jt);
  }
  var Jt = E(0);
  function Hr(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Sh(l) || Mh(l)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var en = 0, bt = null, Ht = null, ie = null, qr = !1, la = !1, gs = !1, $r = 0, ol = 0, ra = null, ty = 0;
  function Zt() {
    throw Error(a(321));
  }
  function bu(e, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < e.length; l++)
      if (!Ke(e[l], n[l])) return !1;
    return !0;
  }
  function xu(e, n, l, o, d, p) {
    return en = p, bt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, L.H = e === null || e.memoizedState === null ? dp : Du, gs = !1, p = l(o, d), gs = !1, la && (p = Tm(
      n,
      l,
      o,
      d
    )), zm(e), p;
  }
  function zm(e) {
    L.H = hl;
    var n = Ht !== null && Ht.next !== null;
    if (en = 0, ie = Ht = bt = null, qr = !1, ol = 0, ra = null, n) throw Error(a(300));
    e === null || ne || (e = e.dependencies, e !== null && Tr(e) && (ne = !0));
  }
  function Tm(e, n, l, o) {
    bt = e;
    var d = 0;
    do {
      if (la && (ra = null), ol = 0, la = !1, 25 <= d) throw Error(a(301));
      if (d += 1, ie = Ht = null, e.updateQueue != null) {
        var p = e.updateQueue;
        p.lastEffect = null, p.events = null, p.stores = null, p.memoCache != null && (p.memoCache.index = 0);
      }
      L.H = fp, p = n(l, o);
    } while (la);
    return p;
  }
  function ey() {
    var e = L.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? cl(n) : n, e = e.useState()[0], (Ht !== null ? Ht.memoizedState : null) !== e && (bt.flags |= 1024), n;
  }
  function yu() {
    var e = $r !== 0;
    return $r = 0, e;
  }
  function wu(e, n, l) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l;
  }
  function _u(e) {
    if (qr) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      qr = !1;
    }
    en = 0, ie = Ht = bt = null, la = !1, ol = $r = 0, ra = null;
  }
  function Ce() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ie === null ? bt.memoizedState = ie = e : ie = ie.next = e, ie;
  }
  function Pt() {
    if (Ht === null) {
      var e = bt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ht.next;
    var n = ie === null ? bt.memoizedState : ie.next;
    if (n !== null)
      ie = n, Ht = e;
    else {
      if (e === null)
        throw bt.alternate === null ? Error(a(467)) : Error(a(310));
      Ht = e, e = {
        memoizedState: Ht.memoizedState,
        baseState: Ht.baseState,
        baseQueue: Ht.baseQueue,
        queue: Ht.queue,
        next: null
      }, ie === null ? bt.memoizedState = ie = e : ie = ie.next = e;
    }
    return ie;
  }
  function Qr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function cl(e) {
    var n = ol;
    return ol += 1, ra === null && (ra = []), e = wm(ra, e, n), n = bt, (ie === null ? n.memoizedState : ie.next) === null && (n = n.alternate, L.H = n === null || n.memoizedState === null ? dp : Du), e;
  }
  function Vr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return cl(e);
      if (e.$$typeof === D) return ge(e);
    }
    throw Error(a(438, String(e)));
  }
  function Su(e) {
    var n = null, l = bt.updateQueue;
    if (l !== null && (n = l.memoCache), n == null) {
      var o = bt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), l === null && (l = Qr(), bt.updateQueue = l), l.memoCache = n, l = n.data[n.index], l === void 0)
      for (l = n.data[n.index] = Array(e), o = 0; o < e; o++)
        l[o] = rt;
    return n.index++, l;
  }
  function nn(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function Yr(e) {
    var n = Pt();
    return Mu(n, Ht, e);
  }
  function Mu(e, n, l) {
    var o = e.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = l;
    var d = e.baseQueue, p = o.pending;
    if (p !== null) {
      if (d !== null) {
        var x = d.next;
        d.next = p.next, p.next = x;
      }
      n.baseQueue = d = p, o.pending = null;
    }
    if (p = e.baseState, d === null) e.memoizedState = p;
    else {
      n = d.next;
      var _ = x = null, C = null, U = n, Q = !1;
      do {
        var K = U.lane & -536870913;
        if (K !== U.lane ? (St & K) === K : (en & K) === K) {
          var H = U.revertLane;
          if (H === 0)
            C !== null && (C = C.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), K === ea && (Q = !0);
          else if ((en & H) === H) {
            U = U.next, H === ea && (Q = !0);
            continue;
          } else
            K = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, C === null ? (_ = C = K, x = p) : C = C.next = K, bt.lanes |= H, Tn |= H;
          K = U.action, gs && l(p, K), p = U.hasEagerState ? U.eagerState : l(p, K);
        } else
          H = {
            lane: K,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, C === null ? (_ = C = H, x = p) : C = C.next = H, bt.lanes |= K, Tn |= K;
        U = U.next;
      } while (U !== null && U !== n);
      if (C === null ? x = p : C.next = _, !Ke(p, e.memoizedState) && (ne = !0, Q && (l = ia, l !== null)))
        throw l;
      e.memoizedState = p, e.baseState = x, e.baseQueue = C, o.lastRenderedState = p;
    }
    return d === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function Nu(e) {
    var n = Pt(), l = n.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var o = l.dispatch, d = l.pending, p = n.memoizedState;
    if (d !== null) {
      l.pending = null;
      var x = d = d.next;
      do
        p = e(p, x.action), x = x.next;
      while (x !== d);
      Ke(p, n.memoizedState) || (ne = !0), n.memoizedState = p, n.baseQueue === null && (n.baseState = p), l.lastRenderedState = p;
    }
    return [p, o];
  }
  function Am(e, n, l) {
    var o = bt, d = Pt(), p = kt;
    if (p) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = n();
    var x = !Ke(
      (Ht || d).memoizedState,
      l
    );
    if (x && (d.memoizedState = l, ne = !0), d = d.queue, ku(Rm.bind(null, o, d, e), [
      e
    ]), d.getSnapshot !== n || x || ie !== null && ie.memoizedState.tag & 1) {
      if (o.flags |= 2048, oa(
        9,
        { destroy: void 0 },
        Dm.bind(
          null,
          o,
          d,
          l,
          n
        ),
        null
      ), Qt === null) throw Error(a(349));
      p || (en & 127) !== 0 || Om(o, n, l);
    }
    return l;
  }
  function Om(e, n, l) {
    e.flags |= 16384, e = { getSnapshot: n, value: l }, n = bt.updateQueue, n === null ? (n = Qr(), bt.updateQueue = n, n.stores = [e]) : (l = n.stores, l === null ? n.stores = [e] : l.push(e));
  }
  function Dm(e, n, l, o) {
    n.value = l, n.getSnapshot = o, Lm(n) && Bm(e);
  }
  function Rm(e, n, l) {
    return l(function() {
      Lm(n) && Bm(e);
    });
  }
  function Lm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var l = n();
      return !Ke(e, l);
    } catch {
      return !0;
    }
  }
  function Bm(e) {
    var n = os(e, 2);
    n !== null && qe(n, e, 2);
  }
  function ju(e) {
    var n = Ce();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), gs) {
        ei(!0);
        try {
          l();
        } finally {
          ei(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nn,
      lastRenderedState: e
    }, n;
  }
  function Um(e, n, l, o) {
    return e.baseState = l, Mu(
      e,
      Ht,
      typeof o == "function" ? o : nn
    );
  }
  function iy(e, n, l, o, d) {
    if (Xr(e)) throw Error(a(485));
    if (e = n.action, e !== null) {
      var p = {
        payload: d,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          p.listeners.push(x);
        }
      };
      L.T !== null ? l(!0) : p.isTransition = !1, o(p), l = n.pending, l === null ? (p.next = n.pending = p, Hm(n, p)) : (p.next = l.next, n.pending = l.next = p);
    }
  }
  function Hm(e, n) {
    var l = n.action, o = n.payload, d = e.state;
    if (n.isTransition) {
      var p = L.T, x = {};
      L.T = x;
      try {
        var _ = l(d, o), C = L.S;
        C !== null && C(x, _), qm(e, n, _);
      } catch (U) {
        Cu(e, n, U);
      } finally {
        p !== null && x.types !== null && (p.types = x.types), L.T = p;
      }
    } else
      try {
        p = l(d, o), qm(e, n, p);
      } catch (U) {
        Cu(e, n, U);
      }
  }
  function qm(e, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(o) {
        $m(e, n, o);
      },
      function(o) {
        return Cu(e, n, o);
      }
    ) : $m(e, n, l);
  }
  function $m(e, n, l) {
    n.status = "fulfilled", n.value = l, Qm(n), e.state = l, n = e.pending, n !== null && (l = n.next, l === n ? e.pending = null : (l = l.next, n.next = l, Hm(e, l)));
  }
  function Cu(e, n, l) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = l, Qm(n), n = n.next;
      while (n !== o);
    }
    e.action = null;
  }
  function Qm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Vm(e, n) {
    return n;
  }
  function Ym(e, n) {
    if (kt) {
      var l = Qt.formState;
      if (l !== null) {
        t: {
          var o = bt;
          if (kt) {
            if (Yt) {
              e: {
                for (var d = Yt, p = hi; d.nodeType !== 8; ) {
                  if (!p) {
                    d = null;
                    break e;
                  }
                  if (d = fi(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break e;
                  }
                }
                p = d.data, d = p === "F!" || p === "F" ? d : null;
              }
              if (d) {
                Yt = fi(
                  d.nextSibling
                ), o = d.data === "F!";
                break t;
              }
            }
            _n(o);
          }
          o = !1;
        }
        o && (n = l[0]);
      }
    }
    return l = Ce(), l.memoizedState = l.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vm,
      lastRenderedState: n
    }, l.queue = o, l = cp.bind(
      null,
      bt,
      o
    ), o.dispatch = l, o = ju(!1), p = Ou.bind(
      null,
      bt,
      !1,
      o.queue
    ), o = Ce(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = d, l = iy.bind(
      null,
      bt,
      d,
      p,
      l
    ), d.dispatch = l, o.memoizedState = e, [n, l, !1];
  }
  function Gm(e) {
    var n = Pt();
    return Km(n, Ht, e);
  }
  function Km(e, n, l) {
    if (n = Mu(
      e,
      n,
      Vm
    )[0], e = Yr(nn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = cl(n);
      } catch (x) {
        throw x === na ? Dr : x;
      }
    else o = n;
    n = Pt();
    var d = n.queue, p = d.dispatch;
    return l !== n.memoizedState && (bt.flags |= 2048, oa(
      9,
      { destroy: void 0 },
      ny.bind(null, d, l),
      null
    )), [o, p, e];
  }
  function ny(e, n) {
    e.action = n;
  }
  function Xm(e) {
    var n = Pt(), l = Ht;
    if (l !== null)
      return Km(n, l, e);
    Pt(), n = n.memoizedState, l = Pt();
    var o = l.queue.dispatch;
    return l.memoizedState = e, [n, o, !1];
  }
  function oa(e, n, l, o) {
    return e = { tag: e, create: l, deps: o, inst: n, next: null }, n = bt.updateQueue, n === null && (n = Qr(), bt.updateQueue = n), l = n.lastEffect, l === null ? n.lastEffect = e.next = e : (o = l.next, l.next = e, e.next = o, n.lastEffect = e), e;
  }
  function Zm() {
    return Pt().memoizedState;
  }
  function Gr(e, n, l, o) {
    var d = Ce();
    bt.flags |= e, d.memoizedState = oa(
      1 | n,
      { destroy: void 0 },
      l,
      o === void 0 ? null : o
    );
  }
  function Kr(e, n, l, o) {
    var d = Pt();
    o = o === void 0 ? null : o;
    var p = d.memoizedState.inst;
    Ht !== null && o !== null && bu(o, Ht.memoizedState.deps) ? d.memoizedState = oa(n, p, l, o) : (bt.flags |= e, d.memoizedState = oa(
      1 | n,
      p,
      l,
      o
    ));
  }
  function Wm(e, n) {
    Gr(8390656, 8, e, n);
  }
  function ku(e, n) {
    Kr(2048, 8, e, n);
  }
  function sy(e) {
    bt.flags |= 4;
    var n = bt.updateQueue;
    if (n === null)
      n = Qr(), bt.updateQueue = n, n.events = [e];
    else {
      var l = n.events;
      l === null ? n.events = [e] : l.push(e);
    }
  }
  function Im(e) {
    var n = Pt().memoizedState;
    return sy({ ref: n, nextImpl: e }), function() {
      if ((Rt & 2) !== 0) throw Error(a(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Fm(e, n) {
    return Kr(4, 2, e, n);
  }
  function Jm(e, n) {
    return Kr(4, 4, e, n);
  }
  function Pm(e, n) {
    if (typeof n == "function") {
      e = e();
      var l = n(e);
      return function() {
        typeof l == "function" ? l() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function tp(e, n, l) {
    l = l != null ? l.concat([e]) : null, Kr(4, 4, Pm.bind(null, n, e), l);
  }
  function Eu() {
  }
  function ep(e, n) {
    var l = Pt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    return n !== null && bu(n, o[1]) ? o[0] : (l.memoizedState = [e, n], e);
  }
  function ip(e, n) {
    var l = Pt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    if (n !== null && bu(n, o[1]))
      return o[0];
    if (o = e(), gs) {
      ei(!0);
      try {
        e();
      } finally {
        ei(!1);
      }
    }
    return l.memoizedState = [o, n], o;
  }
  function zu(e, n, l) {
    return l === void 0 || (en & 1073741824) !== 0 && (St & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = l, e = nv(), bt.lanes |= e, Tn |= e, l);
  }
  function np(e, n, l, o) {
    return Ke(l, n) ? l : aa.current !== null ? (e = zu(e, l, o), Ke(e, n) || (ne = !0), e) : (en & 42) === 0 || (en & 1073741824) !== 0 && (St & 261930) === 0 ? (ne = !0, e.memoizedState = l) : (e = nv(), bt.lanes |= e, Tn |= e, n);
  }
  function sp(e, n, l, o, d) {
    var p = Z.p;
    Z.p = p !== 0 && 8 > p ? p : 8;
    var x = L.T, _ = {};
    L.T = _, Ou(e, !1, n, l);
    try {
      var C = d(), U = L.S;
      if (U !== null && U(_, C), C !== null && typeof C == "object" && typeof C.then == "function") {
        var Q = Px(
          C,
          o
        );
        ul(
          e,
          n,
          Q,
          Je(e)
        );
      } else
        ul(
          e,
          n,
          o,
          Je(e)
        );
    } catch (K) {
      ul(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: K },
        Je()
      );
    } finally {
      Z.p = p, x !== null && _.types !== null && (x.types = _.types), L.T = x;
    }
  }
  function ay() {
  }
  function Tu(e, n, l, o) {
    if (e.tag !== 5) throw Error(a(476));
    var d = ap(e).queue;
    sp(
      e,
      d,
      n,
      it,
      l === null ? ay : function() {
        return lp(e), l(o);
      }
    );
  }
  function ap(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: it,
      baseState: it,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nn,
        lastRenderedState: it
      },
      next: null
    };
    var l = {};
    return n.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nn,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function lp(e) {
    var n = ap(e);
    n.next === null && (n = e.alternate.memoizedState), ul(
      e,
      n.next.queue,
      {},
      Je()
    );
  }
  function Au() {
    return ge(Cl);
  }
  function rp() {
    return Pt().memoizedState;
  }
  function op() {
    return Pt().memoizedState;
  }
  function ly(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Je();
          e = Nn(l);
          var o = jn(n, e, l);
          o !== null && (qe(o, n, l), al(o, n, l)), n = { cache: ru() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function ry(e, n, l) {
    var o = Je();
    l = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(e) ? up(n, l) : (l = Ic(e, n, l, o), l !== null && (qe(l, e, o), hp(l, n, o)));
  }
  function cp(e, n, l) {
    var o = Je();
    ul(e, n, l, o);
  }
  function ul(e, n, l, o) {
    var d = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xr(e)) up(n, d);
    else {
      var p = e.alternate;
      if (e.lanes === 0 && (p === null || p.lanes === 0) && (p = n.lastRenderedReducer, p !== null))
        try {
          var x = n.lastRenderedState, _ = p(x, l);
          if (d.hasEagerState = !0, d.eagerState = _, Ke(_, x))
            return Cr(e, n, d, 0), Qt === null && jr(), !1;
        } catch {
        }
      if (l = Ic(e, n, d, o), l !== null)
        return qe(l, e, o), hp(l, n, o), !0;
    }
    return !1;
  }
  function Ou(e, n, l, o) {
    if (o = {
      lane: 2,
      revertLane: hh(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(e)) {
      if (n) throw Error(a(479));
    } else
      n = Ic(
        e,
        l,
        o,
        2
      ), n !== null && qe(n, e, 2);
  }
  function Xr(e) {
    var n = e.alternate;
    return e === bt || n !== null && n === bt;
  }
  function up(e, n) {
    la = qr = !0;
    var l = e.pending;
    l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
  }
  function hp(e, n, l) {
    if ((l & 4194048) !== 0) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, Ge(e, l);
    }
  }
  var hl = {
    readContext: ge,
    use: Vr,
    useCallback: Zt,
    useContext: Zt,
    useEffect: Zt,
    useImperativeHandle: Zt,
    useLayoutEffect: Zt,
    useInsertionEffect: Zt,
    useMemo: Zt,
    useReducer: Zt,
    useRef: Zt,
    useState: Zt,
    useDebugValue: Zt,
    useDeferredValue: Zt,
    useTransition: Zt,
    useSyncExternalStore: Zt,
    useId: Zt,
    useHostTransitionStatus: Zt,
    useFormState: Zt,
    useActionState: Zt,
    useOptimistic: Zt,
    useMemoCache: Zt,
    useCacheRefresh: Zt
  };
  hl.useEffectEvent = Zt;
  var dp = {
    readContext: ge,
    use: Vr,
    useCallback: function(e, n) {
      return Ce().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ge,
    useEffect: Wm,
    useImperativeHandle: function(e, n, l) {
      l = l != null ? l.concat([e]) : null, Gr(
        4194308,
        4,
        Pm.bind(null, n, e),
        l
      );
    },
    useLayoutEffect: function(e, n) {
      return Gr(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      Gr(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var l = Ce();
      n = n === void 0 ? null : n;
      var o = e();
      if (gs) {
        ei(!0);
        try {
          e();
        } finally {
          ei(!1);
        }
      }
      return l.memoizedState = [o, n], o;
    },
    useReducer: function(e, n, l) {
      var o = Ce();
      if (l !== void 0) {
        var d = l(n);
        if (gs) {
          ei(!0);
          try {
            l(n);
          } finally {
            ei(!1);
          }
        }
      } else d = n;
      return o.memoizedState = o.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, o.queue = e, e = e.dispatch = ry.bind(
        null,
        bt,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var n = Ce();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = ju(e);
      var n = e.queue, l = cp.bind(null, bt, n);
      return n.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Eu,
    useDeferredValue: function(e, n) {
      var l = Ce();
      return zu(l, e, n);
    },
    useTransition: function() {
      var e = ju(!1);
      return e = sp.bind(
        null,
        bt,
        e.queue,
        !0,
        !1
      ), Ce().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, l) {
      var o = bt, d = Ce();
      if (kt) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = n(), Qt === null)
          throw Error(a(349));
        (St & 127) !== 0 || Om(o, n, l);
      }
      d.memoizedState = l;
      var p = { value: l, getSnapshot: n };
      return d.queue = p, Wm(Rm.bind(null, o, p, e), [
        e
      ]), o.flags |= 2048, oa(
        9,
        { destroy: void 0 },
        Dm.bind(
          null,
          o,
          p,
          l,
          n
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Ce(), n = Qt.identifierPrefix;
      if (kt) {
        var l = Ai, o = Ti;
        l = (o & ~(1 << 32 - Se(o) - 1)).toString(32) + l, n = "_" + n + "R_" + l, l = $r++, 0 < l && (n += "H" + l.toString(32)), n += "_";
      } else
        l = ty++, n = "_" + n + "r_" + l.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Au,
    useFormState: Ym,
    useActionState: Ym,
    useOptimistic: function(e) {
      var n = Ce();
      n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = l, n = Ou.bind(
        null,
        bt,
        !0,
        l
      ), l.dispatch = n, [e, n];
    },
    useMemoCache: Su,
    useCacheRefresh: function() {
      return Ce().memoizedState = ly.bind(
        null,
        bt
      );
    },
    useEffectEvent: function(e) {
      var n = Ce(), l = { impl: e };
      return n.memoizedState = l, function() {
        if ((Rt & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Du = {
    readContext: ge,
    use: Vr,
    useCallback: ep,
    useContext: ge,
    useEffect: ku,
    useImperativeHandle: tp,
    useInsertionEffect: Fm,
    useLayoutEffect: Jm,
    useMemo: ip,
    useReducer: Yr,
    useRef: Zm,
    useState: function() {
      return Yr(nn);
    },
    useDebugValue: Eu,
    useDeferredValue: function(e, n) {
      var l = Pt();
      return np(
        l,
        Ht.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Yr(nn)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : cl(e),
        n
      ];
    },
    useSyncExternalStore: Am,
    useId: rp,
    useHostTransitionStatus: Au,
    useFormState: Gm,
    useActionState: Gm,
    useOptimistic: function(e, n) {
      var l = Pt();
      return Um(l, Ht, e, n);
    },
    useMemoCache: Su,
    useCacheRefresh: op
  };
  Du.useEffectEvent = Im;
  var fp = {
    readContext: ge,
    use: Vr,
    useCallback: ep,
    useContext: ge,
    useEffect: ku,
    useImperativeHandle: tp,
    useInsertionEffect: Fm,
    useLayoutEffect: Jm,
    useMemo: ip,
    useReducer: Nu,
    useRef: Zm,
    useState: function() {
      return Nu(nn);
    },
    useDebugValue: Eu,
    useDeferredValue: function(e, n) {
      var l = Pt();
      return Ht === null ? zu(l, e, n) : np(
        l,
        Ht.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Nu(nn)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : cl(e),
        n
      ];
    },
    useSyncExternalStore: Am,
    useId: rp,
    useHostTransitionStatus: Au,
    useFormState: Xm,
    useActionState: Xm,
    useOptimistic: function(e, n) {
      var l = Pt();
      return Ht !== null ? Um(l, Ht, e, n) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Su,
    useCacheRefresh: op
  };
  fp.useEffectEvent = Im;
  function Ru(e, n, l, o) {
    n = e.memoizedState, l = l(o, n), l = l == null ? n : b({}, n, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Lu = {
    enqueueSetState: function(e, n, l) {
      e = e._reactInternals;
      var o = Je(), d = Nn(o);
      d.payload = n, l != null && (d.callback = l), n = jn(e, d, o), n !== null && (qe(n, e, o), al(n, e, o));
    },
    enqueueReplaceState: function(e, n, l) {
      e = e._reactInternals;
      var o = Je(), d = Nn(o);
      d.tag = 1, d.payload = n, l != null && (d.callback = l), n = jn(e, d, o), n !== null && (qe(n, e, o), al(n, e, o));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var l = Je(), o = Nn(l);
      o.tag = 2, n != null && (o.callback = n), n = jn(e, o, l), n !== null && (qe(n, e, l), al(n, e, l));
    }
  };
  function mp(e, n, l, o, d, p, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, p, x) : n.prototype && n.prototype.isPureReactComponent ? !Fa(l, o) || !Fa(d, p) : !0;
  }
  function pp(e, n, l, o) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== e && Lu.enqueueReplaceState(n, n.state, null);
  }
  function bs(e, n) {
    var l = n;
    if ("ref" in n) {
      l = {};
      for (var o in n)
        o !== "ref" && (l[o] = n[o]);
    }
    if (e = e.defaultProps) {
      l === n && (l = b({}, l));
      for (var d in e)
        l[d] === void 0 && (l[d] = e[d]);
    }
    return l;
  }
  function vp(e) {
    Nr(e);
  }
  function gp(e) {
    console.error(e);
  }
  function bp(e) {
    Nr(e);
  }
  function Zr(e, n) {
    try {
      var l = e.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function xp(e, n, l) {
    try {
      var o = e.onCaughtError;
      o(l.value, {
        componentStack: l.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  function Bu(e, n, l) {
    return l = Nn(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Zr(e, n);
    }, l;
  }
  function yp(e) {
    return e = Nn(e), e.tag = 3, e;
  }
  function wp(e, n, l, o) {
    var d = l.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var p = o.value;
      e.payload = function() {
        return d(p);
      }, e.callback = function() {
        xp(n, l, o);
      };
    }
    var x = l.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      xp(n, l, o), typeof d != "function" && (An === null ? An = /* @__PURE__ */ new Set([this]) : An.add(this));
      var _ = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: _ !== null ? _ : ""
      });
    });
  }
  function oy(e, n, l, o, d) {
    if (l.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = l.alternate, n !== null && ta(
        n,
        l,
        d,
        !0
      ), l = Ze.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return di === null ? lo() : l.alternate === null && Wt === 0 && (Wt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = d, o === Rr ? l.flags |= 16384 : (n = l.updateQueue, n === null ? l.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), oh(e, o, d)), !1;
          case 22:
            return l.flags |= 65536, o === Rr ? l.flags |= 16384 : (n = l.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, l.updateQueue = n) : (l = n.retryQueue, l === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : l.add(o)), oh(e, o, d)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return oh(e, o, d), lo(), !1;
    }
    if (kt)
      return n = Ze.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, o !== iu && (e = Error(a(422), { cause: o }), tl(oi(e, l)))) : (o !== iu && (n = Error(a(423), {
        cause: o
      }), tl(
        oi(n, l)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, o = oi(o, l), d = Bu(
        e.stateNode,
        o,
        d
      ), fu(e, d), Wt !== 4 && (Wt = 2)), !1;
    var p = Error(a(520), { cause: o });
    if (p = oi(p, l), xl === null ? xl = [p] : xl.push(p), Wt !== 4 && (Wt = 2), n === null) return !0;
    o = oi(o, l), l = n;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = d & -d, l.lanes |= e, e = Bu(l.stateNode, o, e), fu(l, e), !1;
        case 1:
          if (n = l.type, p = l.stateNode, (l.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (An === null || !An.has(p))))
            return l.flags |= 65536, d &= -d, l.lanes |= d, d = yp(d), wp(
              d,
              e,
              l,
              o
            ), fu(l, d), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Uu = Error(a(461)), ne = !1;
  function be(e, n, l, o) {
    n.child = e === null ? Nm(n, null, l, o) : vs(
      n,
      e.child,
      l,
      o
    );
  }
  function _p(e, n, l, o, d) {
    l = l.render;
    var p = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var _ in o)
        _ !== "ref" && (x[_] = o[_]);
    } else x = o;
    return ds(n), o = xu(
      e,
      n,
      l,
      x,
      p,
      d
    ), _ = yu(), e !== null && !ne ? (wu(e, n, d), sn(e, n, d)) : (kt && _ && tu(n), n.flags |= 1, be(e, n, o, d), n.child);
  }
  function Sp(e, n, l, o, d) {
    if (e === null) {
      var p = l.type;
      return typeof p == "function" && !Fc(p) && p.defaultProps === void 0 && l.compare === null ? (n.tag = 15, n.type = p, Mp(
        e,
        n,
        p,
        o,
        d
      )) : (e = Er(
        l.type,
        null,
        o,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (p = e.child, !Ku(e, d)) {
      var x = p.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Fa, l(x, o) && e.ref === n.ref)
        return sn(e, n, d);
    }
    return n.flags |= 1, e = Fi(p, o), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Mp(e, n, l, o, d) {
    if (e !== null) {
      var p = e.memoizedProps;
      if (Fa(p, o) && e.ref === n.ref)
        if (ne = !1, n.pendingProps = o = p, Ku(e, d))
          (e.flags & 131072) !== 0 && (ne = !0);
        else
          return n.lanes = e.lanes, sn(e, n, d);
    }
    return Hu(
      e,
      n,
      l,
      o,
      d
    );
  }
  function Np(e, n, l, o) {
    var d = o.children, p = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (p = p !== null ? p.baseLanes | l : l, e !== null) {
          for (o = n.child = e.child, d = 0; o !== null; )
            d = d | o.lanes | o.childLanes, o = o.sibling;
          o = d & ~p;
        } else o = 0, n.child = null;
        return jp(
          e,
          n,
          p,
          l,
          o
        );
      }
      if ((l & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Or(
          n,
          p !== null ? p.cachePool : null
        ), p !== null ? km(n, p) : pu(), Em(n);
      else
        return o = n.lanes = 536870912, jp(
          e,
          n,
          p !== null ? p.baseLanes | l : l,
          l,
          o
        );
    } else
      p !== null ? (Or(n, p.cachePool), km(n, p), kn(), n.memoizedState = null) : (e !== null && Or(n, null), pu(), kn());
    return be(e, n, d, l), n.child;
  }
  function dl(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function jp(e, n, l, o, d) {
    var p = cu();
    return p = p === null ? null : { parent: ee._currentValue, pool: p }, n.memoizedState = {
      baseLanes: l,
      cachePool: p
    }, e !== null && Or(n, null), pu(), Em(n), e !== null && ta(e, n, o, !0), n.childLanes = d, null;
  }
  function Wr(e, n) {
    return n = Fr(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Cp(e, n, l) {
    return vs(n, e.child, null, l), e = Wr(n, n.pendingProps), e.flags |= 2, We(n), n.memoizedState = null, e;
  }
  function cy(e, n, l) {
    var o = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (kt) {
        if (o.mode === "hidden")
          return e = Wr(n, o), n.lanes = 536870912, dl(null, e);
        if (gu(n), (e = Yt) ? (e = Hv(
          e,
          hi
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: yn !== null ? { id: Ti, overflow: Ai } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = um(e), l.return = n, n.child = l, ve = n, Yt = null)) : e = null, e === null) throw _n(n);
        return n.lanes = 536870912, null;
      }
      return Wr(n, o);
    }
    var p = e.memoizedState;
    if (p !== null) {
      var x = p.dehydrated;
      if (gu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Cp(
            e,
            n,
            l
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(a(558));
      else if (ne || ta(e, n, l, !1), d = (l & e.childLanes) !== 0, ne || d) {
        if (o = Qt, o !== null && (x = ni(o, l), x !== 0 && x !== p.retryLane))
          throw p.retryLane = x, os(e, x), qe(o, e, x), Uu;
        lo(), n = Cp(
          e,
          n,
          l
        );
      } else
        e = p.treeContext, Yt = fi(x.nextSibling), ve = n, kt = !0, wn = null, hi = !1, e !== null && fm(n, e), n = Wr(n, o), n.flags |= 4096;
      return n;
    }
    return e = Fi(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function Ir(e, n) {
    var l = n.ref;
    if (l === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (n.flags |= 4194816);
    }
  }
  function Hu(e, n, l, o, d) {
    return ds(n), l = xu(
      e,
      n,
      l,
      o,
      void 0,
      d
    ), o = yu(), e !== null && !ne ? (wu(e, n, d), sn(e, n, d)) : (kt && o && tu(n), n.flags |= 1, be(e, n, l, d), n.child);
  }
  function kp(e, n, l, o, d, p) {
    return ds(n), n.updateQueue = null, l = Tm(
      n,
      o,
      l,
      d
    ), zm(e), o = yu(), e !== null && !ne ? (wu(e, n, p), sn(e, n, p)) : (kt && o && tu(n), n.flags |= 1, be(e, n, l, p), n.child);
  }
  function Ep(e, n, l, o, d) {
    if (ds(n), n.stateNode === null) {
      var p = Is, x = l.contextType;
      typeof x == "object" && x !== null && (p = ge(x)), p = new l(o, p), n.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, p.updater = Lu, n.stateNode = p, p._reactInternals = n, p = n.stateNode, p.props = o, p.state = n.memoizedState, p.refs = {}, hu(n), x = l.contextType, p.context = typeof x == "object" && x !== null ? ge(x) : Is, p.state = n.memoizedState, x = l.getDerivedStateFromProps, typeof x == "function" && (Ru(
        n,
        l,
        x,
        o
      ), p.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (x = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), x !== p.state && Lu.enqueueReplaceState(p, p.state, null), rl(n, o, p, d), ll(), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (e === null) {
      p = n.stateNode;
      var _ = n.memoizedProps, C = bs(l, _);
      p.props = C;
      var U = p.context, Q = l.contextType;
      x = Is, typeof Q == "object" && Q !== null && (x = ge(Q));
      var K = l.getDerivedStateFromProps;
      Q = typeof K == "function" || typeof p.getSnapshotBeforeUpdate == "function", _ = n.pendingProps !== _, Q || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (_ || U !== x) && pp(
        n,
        p,
        o,
        x
      ), Mn = !1;
      var H = n.memoizedState;
      p.state = H, rl(n, o, p, d), ll(), U = n.memoizedState, _ || H !== U || Mn ? (typeof K == "function" && (Ru(
        n,
        l,
        K,
        o
      ), U = n.memoizedState), (C = Mn || mp(
        n,
        l,
        C,
        o,
        H,
        U,
        x
      )) ? (Q || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount()), typeof p.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof p.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = U), p.props = o, p.state = U, p.context = x, o = C) : (typeof p.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      p = n.stateNode, du(e, n), x = n.memoizedProps, Q = bs(l, x), p.props = Q, K = n.pendingProps, H = p.context, U = l.contextType, C = Is, typeof U == "object" && U !== null && (C = ge(U)), _ = l.getDerivedStateFromProps, (U = typeof _ == "function" || typeof p.getSnapshotBeforeUpdate == "function") || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (x !== K || H !== C) && pp(
        n,
        p,
        o,
        C
      ), Mn = !1, H = n.memoizedState, p.state = H, rl(n, o, p, d), ll();
      var q = n.memoizedState;
      x !== K || H !== q || Mn || e !== null && e.dependencies !== null && Tr(e.dependencies) ? (typeof _ == "function" && (Ru(
        n,
        l,
        _,
        o
      ), q = n.memoizedState), (Q = Mn || mp(
        n,
        l,
        Q,
        o,
        H,
        q,
        C
      ) || e !== null && e.dependencies !== null && Tr(e.dependencies)) ? (U || typeof p.UNSAFE_componentWillUpdate != "function" && typeof p.componentWillUpdate != "function" || (typeof p.componentWillUpdate == "function" && p.componentWillUpdate(o, q, C), typeof p.UNSAFE_componentWillUpdate == "function" && p.UNSAFE_componentWillUpdate(
        o,
        q,
        C
      )), typeof p.componentDidUpdate == "function" && (n.flags |= 4), typeof p.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof p.componentDidUpdate != "function" || x === e.memoizedProps && H === e.memoizedState || (n.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && H === e.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = q), p.props = o, p.state = q, p.context = C, o = Q) : (typeof p.componentDidUpdate != "function" || x === e.memoizedProps && H === e.memoizedState || (n.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && H === e.memoizedState || (n.flags |= 1024), o = !1);
    }
    return p = o, Ir(e, n), o = (n.flags & 128) !== 0, p || o ? (p = n.stateNode, l = o && typeof l.getDerivedStateFromError != "function" ? null : p.render(), n.flags |= 1, e !== null && o ? (n.child = vs(
      n,
      e.child,
      null,
      d
    ), n.child = vs(
      n,
      null,
      l,
      d
    )) : be(e, n, l, d), n.memoizedState = p.state, e = n.child) : e = sn(
      e,
      n,
      d
    ), e;
  }
  function zp(e, n, l, o) {
    return us(), n.flags |= 256, be(e, n, l, o), n.child;
  }
  var qu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function $u(e) {
    return { baseLanes: e, cachePool: xm() };
  }
  function Qu(e, n, l) {
    return e = e !== null ? e.childLanes & ~l : 0, n && (e |= Fe), e;
  }
  function Tp(e, n, l) {
    var o = n.pendingProps, d = !1, p = (n.flags & 128) !== 0, x;
    if ((x = p) || (x = e !== null && e.memoizedState === null ? !1 : (Jt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (kt) {
        if (d ? Cn(n) : kn(), (e = Yt) ? (e = Hv(
          e,
          hi
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: yn !== null ? { id: Ti, overflow: Ai } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = um(e), l.return = n, n.child = l, ve = n, Yt = null)) : e = null, e === null) throw _n(n);
        return Mh(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var _ = o.children;
      return o = o.fallback, d ? (kn(), d = n.mode, _ = Fr(
        { mode: "hidden", children: _ },
        d
      ), o = cs(
        o,
        d,
        l,
        null
      ), _.return = n, o.return = n, _.sibling = o, n.child = _, o = n.child, o.memoizedState = $u(l), o.childLanes = Qu(
        e,
        x,
        l
      ), n.memoizedState = qu, dl(null, o)) : (Cn(n), Vu(n, _));
    }
    var C = e.memoizedState;
    if (C !== null && (_ = C.dehydrated, _ !== null)) {
      if (p)
        n.flags & 256 ? (Cn(n), n.flags &= -257, n = Yu(
          e,
          n,
          l
        )) : n.memoizedState !== null ? (kn(), n.child = e.child, n.flags |= 128, n = null) : (kn(), _ = o.fallback, d = n.mode, o = Fr(
          { mode: "visible", children: o.children },
          d
        ), _ = cs(
          _,
          d,
          l,
          null
        ), _.flags |= 2, o.return = n, _.return = n, o.sibling = _, n.child = o, vs(
          n,
          e.child,
          null,
          l
        ), o = n.child, o.memoizedState = $u(l), o.childLanes = Qu(
          e,
          x,
          l
        ), n.memoizedState = qu, n = dl(null, o));
      else if (Cn(n), Mh(_)) {
        if (x = _.nextSibling && _.nextSibling.dataset, x) var U = x.dgst;
        x = U, o = Error(a(419)), o.stack = "", o.digest = x, tl({ value: o, source: null, stack: null }), n = Yu(
          e,
          n,
          l
        );
      } else if (ne || ta(e, n, l, !1), x = (l & e.childLanes) !== 0, ne || x) {
        if (x = Qt, x !== null && (o = ni(x, l), o !== 0 && o !== C.retryLane))
          throw C.retryLane = o, os(e, o), qe(x, e, o), Uu;
        Sh(_) || lo(), n = Yu(
          e,
          n,
          l
        );
      } else
        Sh(_) ? (n.flags |= 192, n.child = e.child, n = null) : (e = C.treeContext, Yt = fi(
          _.nextSibling
        ), ve = n, kt = !0, wn = null, hi = !1, e !== null && fm(n, e), n = Vu(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (kn(), _ = o.fallback, d = n.mode, C = e.child, U = C.sibling, o = Fi(C, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = C.subtreeFlags & 65011712, U !== null ? _ = Fi(
      U,
      _
    ) : (_ = cs(
      _,
      d,
      l,
      null
    ), _.flags |= 2), _.return = n, o.return = n, o.sibling = _, n.child = o, dl(null, o), o = n.child, _ = e.child.memoizedState, _ === null ? _ = $u(l) : (d = _.cachePool, d !== null ? (C = ee._currentValue, d = d.parent !== C ? { parent: C, pool: C } : d) : d = xm(), _ = {
      baseLanes: _.baseLanes | l,
      cachePool: d
    }), o.memoizedState = _, o.childLanes = Qu(
      e,
      x,
      l
    ), n.memoizedState = qu, dl(e.child, o)) : (Cn(n), l = e.child, e = l.sibling, l = Fi(l, {
      mode: "visible",
      children: o.children
    }), l.return = n, l.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = l, n.memoizedState = null, l);
  }
  function Vu(e, n) {
    return n = Fr(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function Fr(e, n) {
    return e = Xe(22, e, null, n), e.lanes = 0, e;
  }
  function Yu(e, n, l) {
    return vs(n, e.child, null, l), e = Vu(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Ap(e, n, l) {
    e.lanes |= n;
    var o = e.alternate;
    o !== null && (o.lanes |= n), au(e.return, n, l);
  }
  function Gu(e, n, l, o, d, p) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: l,
      tailMode: d,
      treeForkCount: p
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = o, x.tail = l, x.tailMode = d, x.treeForkCount = p);
  }
  function Op(e, n, l) {
    var o = n.pendingProps, d = o.revealOrder, p = o.tail;
    o = o.children;
    var x = Jt.current, _ = (x & 2) !== 0;
    if (_ ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, I(Jt, x), be(e, n, o, l), o = kt ? Pa : 0, !_ && e !== null && (e.flags & 128) !== 0)
      t: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ap(e, l, n);
        else if (e.tag === 19)
          Ap(e, l, n);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break t;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n)
            break t;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (d) {
      case "forwards":
        for (l = n.child, d = null; l !== null; )
          e = l.alternate, e !== null && Hr(e) === null && (d = l), l = l.sibling;
        l = d, l === null ? (d = n.child, n.child = null) : (d = l.sibling, l.sibling = null), Gu(
          n,
          !1,
          d,
          l,
          p,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, d = n.child, n.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && Hr(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = l, l = d, d = e;
        }
        Gu(
          n,
          !0,
          l,
          null,
          p,
          o
        );
        break;
      case "together":
        Gu(
          n,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function sn(e, n, l) {
    if (e !== null && (n.dependencies = e.dependencies), Tn |= n.lanes, (l & n.childLanes) === 0)
      if (e !== null) {
        if (ta(
          e,
          n,
          l,
          !1
        ), (l & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(a(153));
    if (n.child !== null) {
      for (e = n.child, l = Fi(e, e.pendingProps), n.child = l, l.return = n; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Fi(e, e.pendingProps), l.return = n;
      l.sibling = null;
    }
    return n.child;
  }
  function Ku(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Tr(e)));
  }
  function uy(e, n, l) {
    switch (n.tag) {
      case 3:
        Kt(n, n.stateNode.containerInfo), Sn(n, ee, e.memoizedState.cache), us();
        break;
      case 27:
      case 5:
        Et(n);
        break;
      case 4:
        Kt(n, n.stateNode.containerInfo);
        break;
      case 10:
        Sn(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, gu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Cn(n), n.flags |= 128, null) : (l & n.child.childLanes) !== 0 ? Tp(e, n, l) : (Cn(n), e = sn(
            e,
            n,
            l
          ), e !== null ? e.sibling : null);
        Cn(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (o = (l & n.childLanes) !== 0, o || (ta(
          e,
          n,
          l,
          !1
        ), o = (l & n.childLanes) !== 0), d) {
          if (o)
            return Op(
              e,
              n,
              l
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), I(Jt, Jt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, Np(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        Sn(n, ee, e.memoizedState.cache);
    }
    return sn(e, n, l);
  }
  function Dp(e, n, l) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        ne = !0;
      else {
        if (!Ku(e, l) && (n.flags & 128) === 0)
          return ne = !1, uy(
            e,
            n,
            l
          );
        ne = (e.flags & 131072) !== 0;
      }
    else
      ne = !1, kt && (n.flags & 1048576) !== 0 && dm(n, Pa, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (e = ms(n.elementType), n.type = e, typeof e == "function")
            Fc(e) ? (o = bs(e, o), n.tag = 1, n = Ep(
              null,
              n,
              e,
              o,
              l
            )) : (n.tag = 0, n = Hu(
              null,
              n,
              e,
              o,
              l
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === O) {
                n.tag = 11, n = _p(
                  null,
                  n,
                  e,
                  o,
                  l
                );
                break t;
              } else if (d === R) {
                n.tag = 14, n = Sp(
                  null,
                  n,
                  e,
                  o,
                  l
                );
                break t;
              }
            }
            throw n = xt(e) || e, Error(a(306, n, ""));
          }
        }
        return n;
      case 0:
        return Hu(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 1:
        return o = n.type, d = bs(
          o,
          n.pendingProps
        ), Ep(
          e,
          n,
          o,
          d,
          l
        );
      case 3:
        t: {
          if (Kt(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          o = n.pendingProps;
          var p = n.memoizedState;
          d = p.element, du(e, n), rl(n, o, null, l);
          var x = n.memoizedState;
          if (o = x.cache, Sn(n, ee, o), o !== p.cache && lu(
            n,
            [ee],
            l,
            !0
          ), ll(), o = x.element, p.isDehydrated)
            if (p = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = p, n.memoizedState = p, n.flags & 256) {
              n = zp(
                e,
                n,
                o,
                l
              );
              break t;
            } else if (o !== d) {
              d = oi(
                Error(a(424)),
                n
              ), tl(d), n = zp(
                e,
                n,
                o,
                l
              );
              break t;
            } else
              for (e = n.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Yt = fi(e.firstChild), ve = n, kt = !0, wn = null, hi = !0, l = Nm(
                n,
                null,
                o,
                l
              ), n.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (us(), o === d) {
              n = sn(
                e,
                n,
                l
              );
              break t;
            }
            be(e, n, o, l);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Ir(e, n), e === null ? (l = Gv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = l : kt || (l = n.type, e = n.pendingProps, o = mo(
          ht.current
        ).createElement(l), o[pe] = n, o[De] = e, xe(o, l, e), ue(o), n.stateNode = o) : n.memoizedState = Gv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Et(n), e === null && kt && (o = n.stateNode = Qv(
          n.type,
          n.pendingProps,
          ht.current
        ), ve = n, hi = !0, d = Yt, Ln(n.type) ? (Nh = d, Yt = fi(o.firstChild)) : Yt = d), be(
          e,
          n,
          n.pendingProps.children,
          l
        ), Ir(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && kt && ((d = o = Yt) && (o = qy(
          o,
          n.type,
          n.pendingProps,
          hi
        ), o !== null ? (n.stateNode = o, ve = n, Yt = fi(o.firstChild), hi = !1, d = !0) : d = !1), d || _n(n)), Et(n), d = n.type, p = n.pendingProps, x = e !== null ? e.memoizedProps : null, o = p.children, yh(d, p) ? o = null : x !== null && yh(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = xu(
          e,
          n,
          ey,
          null,
          null,
          l
        ), Cl._currentValue = d), Ir(e, n), be(e, n, o, l), n.child;
      case 6:
        return e === null && kt && ((e = l = Yt) && (l = $y(
          l,
          n.pendingProps,
          hi
        ), l !== null ? (n.stateNode = l, ve = n, Yt = null, e = !0) : e = !1), e || _n(n)), null;
      case 13:
        return Tp(e, n, l);
      case 4:
        return Kt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, e === null ? n.child = vs(
          n,
          null,
          o,
          l
        ) : be(e, n, o, l), n.child;
      case 11:
        return _p(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 7:
        return be(
          e,
          n,
          n.pendingProps,
          l
        ), n.child;
      case 8:
        return be(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 12:
        return be(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 10:
        return o = n.pendingProps, Sn(n, n.type, o.value), be(e, n, o.children, l), n.child;
      case 9:
        return d = n.type._context, o = n.pendingProps.children, ds(n), d = ge(d), o = o(d), n.flags |= 1, be(e, n, o, l), n.child;
      case 14:
        return Sp(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 15:
        return Mp(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 19:
        return Op(e, n, l);
      case 31:
        return cy(e, n, l);
      case 22:
        return Np(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        return ds(n), o = ge(ee), e === null ? (d = cu(), d === null && (d = Qt, p = ru(), d.pooledCache = p, p.refCount++, p !== null && (d.pooledCacheLanes |= l), d = p), n.memoizedState = { parent: o, cache: d }, hu(n), Sn(n, ee, d)) : ((e.lanes & l) !== 0 && (du(e, n), rl(n, null, null, l), ll()), d = e.memoizedState, p = n.memoizedState, d.parent !== o ? (d = { parent: o, cache: o }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Sn(n, ee, o)) : (o = p.cache, Sn(n, ee, o), o !== d.cache && lu(
          n,
          [ee],
          l,
          !0
        ))), be(
          e,
          n,
          n.pendingProps.children,
          l
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(a(156, n.tag));
  }
  function an(e) {
    e.flags |= 4;
  }
  function Xu(e, n, l, o, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (rv()) e.flags |= 8192;
        else
          throw ps = Rr, uu;
    } else e.flags &= -16777217;
  }
  function Rp(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Iv(n))
      if (rv()) e.flags |= 8192;
      else
        throw ps = Rr, uu;
  }
  function Jr(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Me() : 536870912, e.lanes |= n, da |= n);
  }
  function fl(e, n) {
    if (!kt)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var o = null; l !== null; )
            l.alternate !== null && (o = l), l = l.sibling;
          o === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Gt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, l = 0, o = 0;
    if (n)
      for (var d = e.child; d !== null; )
        l |= d.lanes | d.childLanes, o |= d.subtreeFlags & 65011712, o |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        l |= d.lanes | d.childLanes, o |= d.subtreeFlags, o |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= o, e.childLanes = l, n;
  }
  function hy(e, n, l) {
    var o = n.pendingProps;
    switch (eu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Gt(n), null;
      case 1:
        return Gt(n), null;
      case 3:
        return l = n.stateNode, o = null, e !== null && (o = e.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), tn(ee), Dt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Ps(n) ? an(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, nu())), Gt(n), null;
      case 26:
        var d = n.type, p = n.memoizedState;
        return e === null ? (an(n), p !== null ? (Gt(n), Rp(n, p)) : (Gt(n), Xu(
          n,
          d,
          null,
          o,
          l
        ))) : p ? p !== e.memoizedState ? (an(n), Gt(n), Rp(n, p)) : (Gt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== o && an(n), Gt(n), Xu(
          n,
          d,
          e,
          o,
          l
        )), null;
      case 27:
        if (Ci(n), l = ht.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && an(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Gt(n), null;
          }
          e = et.current, Ps(n) ? mm(n) : (e = Qv(d, o, l), n.stateNode = e, an(n));
        }
        return Gt(n), null;
      case 5:
        if (Ci(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && an(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Gt(n), null;
          }
          if (p = et.current, Ps(n))
            mm(n);
          else {
            var x = mo(
              ht.current
            );
            switch (p) {
              case 1:
                p = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  d
                );
                break;
              case 2:
                p = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  d
                );
                break;
              default:
                switch (d) {
                  case "svg":
                    p = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      d
                    );
                    break;
                  case "math":
                    p = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      d
                    );
                    break;
                  case "script":
                    p = x.createElement("div"), p.innerHTML = "<script><\/script>", p = p.removeChild(
                      p.firstChild
                    );
                    break;
                  case "select":
                    p = typeof o.is == "string" ? x.createElement("select", {
                      is: o.is
                    }) : x.createElement("select"), o.multiple ? p.multiple = !0 : o.size && (p.size = o.size);
                    break;
                  default:
                    p = typeof o.is == "string" ? x.createElement(d, { is: o.is }) : x.createElement(d);
                }
            }
            p[pe] = n, p[De] = o;
            t: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                p.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                x.child.return = x, x = x.child;
                continue;
              }
              if (x === n) break t;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === n)
                  break t;
                x = x.return;
              }
              x.sibling.return = x.return, x = x.sibling;
            }
            n.stateNode = p;
            t: switch (xe(p, d, o), d) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break t;
              case "img":
                o = !0;
                break t;
              default:
                o = !1;
            }
            o && an(n);
          }
        }
        return Gt(n), Xu(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          l
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== o && an(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(a(166));
          if (e = ht.current, Ps(n)) {
            if (e = n.stateNode, l = n.memoizedProps, o = null, d = ve, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  o = d.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === l || o !== null && o.suppressHydrationWarning === !0 || Tv(e.nodeValue, l)), e || _n(n, !0);
          } else
            e = mo(e).createTextNode(
              o
            ), e[pe] = n, n.stateNode = e;
        }
        return Gt(n), null;
      case 31:
        if (l = n.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Ps(n), l !== null) {
            if (e === null) {
              if (!o) throw Error(a(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[pe] = n;
            } else
              us(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Gt(n), e = !1;
          } else
            l = nu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return n.flags & 256 ? (We(n), n) : (We(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Gt(n), null;
      case 13:
        if (o = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = Ps(n), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(a(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(a(317));
              d[pe] = n;
            } else
              us(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Gt(n), d = !1;
          } else
            d = nu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (We(n), n) : (We(n), null);
        }
        return We(n), (n.flags & 128) !== 0 ? (n.lanes = l, n) : (l = o !== null, e = e !== null && e.memoizedState !== null, l && (o = n.child, d = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (d = o.alternate.memoizedState.cachePool.pool), p = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (p = o.memoizedState.cachePool.pool), p !== d && (o.flags |= 2048)), l !== e && l && (n.child.flags |= 8192), Jr(n, n.updateQueue), Gt(n), null);
      case 4:
        return Dt(), e === null && ph(n.stateNode.containerInfo), Gt(n), null;
      case 10:
        return tn(n.type), Gt(n), null;
      case 19:
        if ($(Jt), o = n.memoizedState, o === null) return Gt(n), null;
        if (d = (n.flags & 128) !== 0, p = o.rendering, p === null)
          if (d) fl(o, !1);
          else {
            if (Wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (p = Hr(e), p !== null) {
                  for (n.flags |= 128, fl(o, !1), e = p.updateQueue, n.updateQueue = e, Jr(n, e), n.subtreeFlags = 0, e = l, l = n.child; l !== null; )
                    cm(l, e), l = l.sibling;
                  return I(
                    Jt,
                    Jt.current & 1 | 2
                  ), kt && Ji(n, o.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            o.tail !== null && _e() > no && (n.flags |= 128, d = !0, fl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Hr(p), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, Jr(n, e), fl(o, !0), o.tail === null && o.tailMode === "hidden" && !p.alternate && !kt)
                return Gt(n), null;
            } else
              2 * _e() - o.renderingStartTime > no && l !== 536870912 && (n.flags |= 128, d = !0, fl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (p.sibling = n.child, n.child = p) : (e = o.last, e !== null ? e.sibling = p : n.child = p, o.last = p);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = _e(), e.sibling = null, l = Jt.current, I(
          Jt,
          d ? l & 1 | 2 : l & 1
        ), kt && Ji(n, o.treeForkCount), e) : (Gt(n), null);
      case 22:
      case 23:
        return We(n), vu(), o = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (l & 536870912) !== 0 && (n.flags & 128) === 0 && (Gt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Gt(n), l = n.updateQueue, l !== null && Jr(n, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== l && (n.flags |= 2048), e !== null && $(fs), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), tn(ee), Gt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, n.tag));
  }
  function dy(e, n) {
    switch (eu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return tn(ee), Dt(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ci(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (We(n), n.alternate === null)
            throw Error(a(340));
          us();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (We(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(a(340));
          us();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return $(Jt), null;
      case 4:
        return Dt(), null;
      case 10:
        return tn(n.type), null;
      case 22:
      case 23:
        return We(n), vu(), e !== null && $(fs), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return tn(ee), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Lp(e, n) {
    switch (eu(n), n.tag) {
      case 3:
        tn(ee), Dt();
        break;
      case 26:
      case 27:
      case 5:
        Ci(n);
        break;
      case 4:
        Dt();
        break;
      case 31:
        n.memoizedState !== null && We(n);
        break;
      case 13:
        We(n);
        break;
      case 19:
        $(Jt);
        break;
      case 10:
        tn(n.type);
        break;
      case 22:
      case 23:
        We(n), vu(), e !== null && $(fs);
        break;
      case 24:
        tn(ee);
    }
  }
  function ml(e, n) {
    try {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var d = o.next;
        l = d;
        do {
          if ((l.tag & e) === e) {
            o = void 0;
            var p = l.create, x = l.inst;
            o = p(), x.destroy = o;
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (_) {
      Ut(n, n.return, _);
    }
  }
  function En(e, n, l) {
    try {
      var o = n.updateQueue, d = o !== null ? o.lastEffect : null;
      if (d !== null) {
        var p = d.next;
        o = p;
        do {
          if ((o.tag & e) === e) {
            var x = o.inst, _ = x.destroy;
            if (_ !== void 0) {
              x.destroy = void 0, d = n;
              var C = l, U = _;
              try {
                U();
              } catch (Q) {
                Ut(
                  d,
                  C,
                  Q
                );
              }
            }
          }
          o = o.next;
        } while (o !== p);
      }
    } catch (Q) {
      Ut(n, n.return, Q);
    }
  }
  function Bp(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var l = e.stateNode;
      try {
        Cm(n, l);
      } catch (o) {
        Ut(e, e.return, o);
      }
    }
  }
  function Up(e, n, l) {
    l.props = bs(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (o) {
      Ut(e, n, o);
    }
  }
  function pl(e, n) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var o = e.stateNode;
            break;
          case 30:
            o = e.stateNode;
            break;
          default:
            o = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(o) : l.current = o;
      }
    } catch (d) {
      Ut(e, n, d);
    }
  }
  function Oi(e, n) {
    var l = e.ref, o = e.refCleanup;
    if (l !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (d) {
          Ut(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (d) {
          Ut(e, n, d);
        }
      else l.current = null;
  }
  function Hp(e) {
    var n = e.type, l = e.memoizedProps, o = e.stateNode;
    try {
      t: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && o.focus();
          break t;
        case "img":
          l.src ? o.src = l.src : l.srcSet && (o.srcset = l.srcSet);
      }
    } catch (d) {
      Ut(e, e.return, d);
    }
  }
  function Zu(e, n, l) {
    try {
      var o = e.stateNode;
      Dy(o, e.type, l, n), o[De] = n;
    } catch (d) {
      Ut(e, e.return, d);
    }
  }
  function qp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ln(e.type) || e.tag === 4;
  }
  function Wu(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || qp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ln(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Iu(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, n) : (n = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, n.appendChild(e), l = l._reactRootContainer, l != null || n.onclick !== null || (n.onclick = Wi));
    else if (o !== 4 && (o === 27 && Ln(e.type) && (l = e.stateNode, n = null), e = e.child, e !== null))
      for (Iu(e, n, l), e = e.sibling; e !== null; )
        Iu(e, n, l), e = e.sibling;
  }
  function Pr(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? l.insertBefore(e, n) : l.appendChild(e);
    else if (o !== 4 && (o === 27 && Ln(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Pr(e, n, l), e = e.sibling; e !== null; )
        Pr(e, n, l), e = e.sibling;
  }
  function $p(e) {
    var n = e.stateNode, l = e.memoizedProps;
    try {
      for (var o = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      xe(n, o, l), n[pe] = e, n[De] = l;
    } catch (p) {
      Ut(e, e.return, p);
    }
  }
  var ln = !1, se = !1, Fu = !1, Qp = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function fy(e, n) {
    if (e = e.containerInfo, bh = wo, e = tm(e), Yc(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        t: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var o = l.getSelection && l.getSelection();
          if (o && o.rangeCount !== 0) {
            l = o.anchorNode;
            var d = o.anchorOffset, p = o.focusNode;
            o = o.focusOffset;
            try {
              l.nodeType, p.nodeType;
            } catch {
              l = null;
              break t;
            }
            var x = 0, _ = -1, C = -1, U = 0, Q = 0, K = e, H = null;
            e: for (; ; ) {
              for (var q; K !== l || d !== 0 && K.nodeType !== 3 || (_ = x + d), K !== p || o !== 0 && K.nodeType !== 3 || (C = x + o), K.nodeType === 3 && (x += K.nodeValue.length), (q = K.firstChild) !== null; )
                H = K, K = q;
              for (; ; ) {
                if (K === e) break e;
                if (H === l && ++U === d && (_ = x), H === p && ++Q === o && (C = x), (q = K.nextSibling) !== null) break;
                K = H, H = K.parentNode;
              }
              K = q;
            }
            l = _ === -1 || C === -1 ? null : { start: _, end: C };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (xh = { focusedElem: e, selectionRange: l }, wo = !1, he = n; he !== null; )
      if (n = he, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, he = e;
      else
        for (; he !== null; ) {
          switch (n = he, p = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  d = e[l], d.ref.impl = d.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && p !== null) {
                e = void 0, l = n, d = p.memoizedProps, p = p.memoizedState, o = l.stateNode;
                try {
                  var nt = bs(
                    l.type,
                    d
                  );
                  e = o.getSnapshotBeforeUpdate(
                    nt,
                    p
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ut) {
                  Ut(
                    l,
                    l.return,
                    ut
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, l = e.nodeType, l === 9)
                  _h(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _h(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(a(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, he = e;
            break;
          }
          he = n.return;
        }
  }
  function Vp(e, n, l) {
    var o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        on(e, l), o & 4 && ml(5, l);
        break;
      case 1:
        if (on(e, l), o & 4)
          if (e = l.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              Ut(l, l.return, x);
            }
          else {
            var d = bs(
              l.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                d,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              Ut(
                l,
                l.return,
                x
              );
            }
          }
        o & 64 && Bp(l), o & 512 && pl(l, l.return);
        break;
      case 3:
        if (on(e, l), o & 64 && (e = l.updateQueue, e !== null)) {
          if (n = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                n = l.child.stateNode;
                break;
              case 1:
                n = l.child.stateNode;
            }
          try {
            Cm(e, n);
          } catch (x) {
            Ut(l, l.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && $p(l);
      case 26:
      case 5:
        on(e, l), n === null && o & 4 && Hp(l), o & 512 && pl(l, l.return);
        break;
      case 12:
        on(e, l);
        break;
      case 31:
        on(e, l), o & 4 && Kp(e, l);
        break;
      case 13:
        on(e, l), o & 4 && Xp(e, l), o & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = _y.bind(
          null,
          l
        ), Qy(e, l))));
        break;
      case 22:
        if (o = l.memoizedState !== null || ln, !o) {
          n = n !== null && n.memoizedState !== null || se, d = ln;
          var p = se;
          ln = o, (se = n) && !p ? cn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : on(e, l), ln = d, se = p;
        }
        break;
      case 30:
        break;
      default:
        on(e, l);
    }
  }
  function Yp(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Yp(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Cc(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Xt = null, Le = !1;
  function rn(e, n, l) {
    for (l = l.child; l !== null; )
      Gp(e, n, l), l = l.sibling;
  }
  function Gp(e, n, l) {
    if (je && typeof je.onCommitFiberUnmount == "function")
      try {
        je.onCommitFiberUnmount(ns, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        se || Oi(l, n), rn(
          e,
          n,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        se || Oi(l, n);
        var o = Xt, d = Le;
        Ln(l.type) && (Xt = l.stateNode, Le = !1), rn(
          e,
          n,
          l
        ), Ml(l.stateNode), Xt = o, Le = d;
        break;
      case 5:
        se || Oi(l, n);
      case 6:
        if (o = Xt, d = Le, Xt = null, rn(
          e,
          n,
          l
        ), Xt = o, Le = d, Xt !== null)
          if (Le)
            try {
              (Xt.nodeType === 9 ? Xt.body : Xt.nodeName === "HTML" ? Xt.ownerDocument.body : Xt).removeChild(l.stateNode);
            } catch (p) {
              Ut(
                l,
                n,
                p
              );
            }
          else
            try {
              Xt.removeChild(l.stateNode);
            } catch (p) {
              Ut(
                l,
                n,
                p
              );
            }
        break;
      case 18:
        Xt !== null && (Le ? (e = Xt, Bv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), ya(e)) : Bv(Xt, l.stateNode));
        break;
      case 4:
        o = Xt, d = Le, Xt = l.stateNode.containerInfo, Le = !0, rn(
          e,
          n,
          l
        ), Xt = o, Le = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        En(2, l, n), se || En(4, l, n), rn(
          e,
          n,
          l
        );
        break;
      case 1:
        se || (Oi(l, n), o = l.stateNode, typeof o.componentWillUnmount == "function" && Up(
          l,
          n,
          o
        )), rn(
          e,
          n,
          l
        );
        break;
      case 21:
        rn(
          e,
          n,
          l
        );
        break;
      case 22:
        se = (o = se) || l.memoizedState !== null, rn(
          e,
          n,
          l
        ), se = o;
        break;
      default:
        rn(
          e,
          n,
          l
        );
    }
  }
  function Kp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ya(e);
      } catch (l) {
        Ut(n, n.return, l);
      }
    }
  }
  function Xp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ya(e);
      } catch (l) {
        Ut(n, n.return, l);
      }
  }
  function my(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Qp()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Qp()), n;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function to(e, n) {
    var l = my(e);
    n.forEach(function(o) {
      if (!l.has(o)) {
        l.add(o);
        var d = Sy.bind(null, e, o);
        o.then(d, d);
      }
    });
  }
  function Be(e, n) {
    var l = n.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var d = l[o], p = e, x = n, _ = x;
        t: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (Ln(_.type)) {
                Xt = _.stateNode, Le = !1;
                break t;
              }
              break;
            case 5:
              Xt = _.stateNode, Le = !1;
              break t;
            case 3:
            case 4:
              Xt = _.stateNode.containerInfo, Le = !0;
              break t;
          }
          _ = _.return;
        }
        if (Xt === null) throw Error(a(160));
        Gp(p, x, d), Xt = null, Le = !1, p = d.alternate, p !== null && (p.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Zp(n, e), n = n.sibling;
  }
  var wi = null;
  function Zp(e, n) {
    var l = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Be(n, e), Ue(e), o & 4 && (En(3, e, e.return), ml(3, e), En(5, e, e.return));
        break;
      case 1:
        Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 64 && ln && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? o : l.concat(o))));
        break;
      case 26:
        var d = wi;
        if (Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 4) {
          var p = l !== null ? l.memoizedState : null;
          if (o = e.memoizedState, l === null)
            if (o === null)
              if (e.stateNode === null) {
                t: {
                  o = e.type, l = e.memoizedProps, d = d.ownerDocument || d;
                  e: switch (o) {
                    case "title":
                      p = d.getElementsByTagName("title")[0], (!p || p[Qa] || p[pe] || p.namespaceURI === "http://www.w3.org/2000/svg" || p.hasAttribute("itemprop")) && (p = d.createElement(o), d.head.insertBefore(
                        p,
                        d.querySelector("head > title")
                      )), xe(p, o, l), p[pe] = e, ue(p), o = p;
                      break t;
                    case "link":
                      var x = Zv(
                        "link",
                        "href",
                        d
                      ).get(o + (l.href || ""));
                      if (x) {
                        for (var _ = 0; _ < x.length; _++)
                          if (p = x[_], p.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && p.getAttribute("rel") === (l.rel == null ? null : l.rel) && p.getAttribute("title") === (l.title == null ? null : l.title) && p.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            x.splice(_, 1);
                            break e;
                          }
                      }
                      p = d.createElement(o), xe(p, o, l), d.head.appendChild(p);
                      break;
                    case "meta":
                      if (x = Zv(
                        "meta",
                        "content",
                        d
                      ).get(o + (l.content || ""))) {
                        for (_ = 0; _ < x.length; _++)
                          if (p = x[_], p.getAttribute("content") === (l.content == null ? null : "" + l.content) && p.getAttribute("name") === (l.name == null ? null : l.name) && p.getAttribute("property") === (l.property == null ? null : l.property) && p.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && p.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            x.splice(_, 1);
                            break e;
                          }
                      }
                      p = d.createElement(o), xe(p, o, l), d.head.appendChild(p);
                      break;
                    default:
                      throw Error(a(468, o));
                  }
                  p[pe] = e, ue(p), o = p;
                }
                e.stateNode = o;
              } else
                Wv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Xv(
                d,
                o,
                e.memoizedProps
              );
          else
            p !== o ? (p === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : p.count--, o === null ? Wv(
              d,
              e.type,
              e.stateNode
            ) : Xv(
              d,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Zu(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), l !== null && o & 4 && Zu(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            Vs(d, "");
          } catch (nt) {
            Ut(e, e.return, nt);
          }
        }
        o & 4 && e.stateNode != null && (d = e.memoizedProps, Zu(
          e,
          d,
          l !== null ? l.memoizedProps : d
        )), o & 1024 && (Fu = !0);
        break;
      case 6:
        if (Be(n, e), Ue(e), o & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          o = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = o;
          } catch (nt) {
            Ut(e, e.return, nt);
          }
        }
        break;
      case 3:
        if (go = null, d = wi, wi = po(n.containerInfo), Be(n, e), wi = d, Ue(e), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ya(n.containerInfo);
          } catch (nt) {
            Ut(e, e.return, nt);
          }
        Fu && (Fu = !1, Wp(e));
        break;
      case 4:
        o = wi, wi = po(
          e.stateNode.containerInfo
        ), Be(n, e), Ue(e), wi = o;
        break;
      case 12:
        Be(n, e), Ue(e);
        break;
      case 31:
        Be(n, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, to(e, o)));
        break;
      case 13:
        Be(n, e), Ue(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (io = _e()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, to(e, o)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var C = l !== null && l.memoizedState !== null, U = ln, Q = se;
        if (ln = U || d, se = Q || C, Be(n, e), se = Q, ln = U, Ue(e), o & 8192)
          t: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (l === null || C || ln || se || xs(e)), l = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (l === null) {
                C = l = n;
                try {
                  if (p = C.stateNode, d)
                    x = p.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    _ = C.stateNode;
                    var K = C.memoizedProps.style, H = K != null && K.hasOwnProperty("display") ? K.display : null;
                    _.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
                  }
                } catch (nt) {
                  Ut(C, C.return, nt);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                C = n;
                try {
                  C.stateNode.nodeValue = d ? "" : C.memoizedProps;
                } catch (nt) {
                  Ut(C, C.return, nt);
                }
              }
            } else if (n.tag === 18) {
              if (l === null) {
                C = n;
                try {
                  var q = C.stateNode;
                  d ? Uv(q, !0) : Uv(C.stateNode, !1);
                } catch (nt) {
                  Ut(C, C.return, nt);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break t;
              l === n && (l = null), n = n.return;
            }
            l === n && (l = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (l = o.retryQueue, l !== null && (o.retryQueue = null, to(e, l))));
        break;
      case 19:
        Be(n, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, to(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Be(n, e), Ue(e);
    }
  }
  function Ue(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var l, o = e.return; o !== null; ) {
          if (qp(o)) {
            l = o;
            break;
          }
          o = o.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var d = l.stateNode, p = Wu(e);
            Pr(e, p, d);
            break;
          case 5:
            var x = l.stateNode;
            l.flags & 32 && (Vs(x, ""), l.flags &= -33);
            var _ = Wu(e);
            Pr(e, _, x);
            break;
          case 3:
          case 4:
            var C = l.stateNode.containerInfo, U = Wu(e);
            Iu(
              e,
              U,
              C
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (Q) {
        Ut(e, e.return, Q);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Wp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Wp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function on(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Vp(e, n.alternate, n), n = n.sibling;
  }
  function xs(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          En(4, n, n.return), xs(n);
          break;
        case 1:
          Oi(n, n.return);
          var l = n.stateNode;
          typeof l.componentWillUnmount == "function" && Up(
            n,
            n.return,
            l
          ), xs(n);
          break;
        case 27:
          Ml(n.stateNode);
        case 26:
        case 5:
          Oi(n, n.return), xs(n);
          break;
        case 22:
          n.memoizedState === null && xs(n);
          break;
        case 30:
          xs(n);
          break;
        default:
          xs(n);
      }
      e = e.sibling;
    }
  }
  function cn(e, n, l) {
    for (l = l && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, d = e, p = n, x = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          cn(
            d,
            p,
            l
          ), ml(4, p);
          break;
        case 1:
          if (cn(
            d,
            p,
            l
          ), o = p, d = o.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (U) {
              Ut(o, o.return, U);
            }
          if (o = p, d = o.updateQueue, d !== null) {
            var _ = o.stateNode;
            try {
              var C = d.shared.hiddenCallbacks;
              if (C !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < C.length; d++)
                  jm(C[d], _);
            } catch (U) {
              Ut(o, o.return, U);
            }
          }
          l && x & 64 && Bp(p), pl(p, p.return);
          break;
        case 27:
          $p(p);
        case 26:
        case 5:
          cn(
            d,
            p,
            l
          ), l && o === null && x & 4 && Hp(p), pl(p, p.return);
          break;
        case 12:
          cn(
            d,
            p,
            l
          );
          break;
        case 31:
          cn(
            d,
            p,
            l
          ), l && x & 4 && Kp(d, p);
          break;
        case 13:
          cn(
            d,
            p,
            l
          ), l && x & 4 && Xp(d, p);
          break;
        case 22:
          p.memoizedState === null && cn(
            d,
            p,
            l
          ), pl(p, p.return);
          break;
        case 30:
          break;
        default:
          cn(
            d,
            p,
            l
          );
      }
      n = n.sibling;
    }
  }
  function Ju(e, n) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && el(l));
  }
  function Pu(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && el(e));
  }
  function _i(e, n, l, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Ip(
          e,
          n,
          l,
          o
        ), n = n.sibling;
  }
  function Ip(e, n, l, o) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        _i(
          e,
          n,
          l,
          o
        ), d & 2048 && ml(9, n);
        break;
      case 1:
        _i(
          e,
          n,
          l,
          o
        );
        break;
      case 3:
        _i(
          e,
          n,
          l,
          o
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && el(e)));
        break;
      case 12:
        if (d & 2048) {
          _i(
            e,
            n,
            l,
            o
          ), e = n.stateNode;
          try {
            var p = n.memoizedProps, x = p.id, _ = p.onPostCommit;
            typeof _ == "function" && _(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (C) {
            Ut(n, n.return, C);
          }
        } else
          _i(
            e,
            n,
            l,
            o
          );
        break;
      case 31:
        _i(
          e,
          n,
          l,
          o
        );
        break;
      case 13:
        _i(
          e,
          n,
          l,
          o
        );
        break;
      case 23:
        break;
      case 22:
        p = n.stateNode, x = n.alternate, n.memoizedState !== null ? p._visibility & 2 ? _i(
          e,
          n,
          l,
          o
        ) : vl(e, n) : p._visibility & 2 ? _i(
          e,
          n,
          l,
          o
        ) : (p._visibility |= 2, ca(
          e,
          n,
          l,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && Ju(x, n);
        break;
      case 24:
        _i(
          e,
          n,
          l,
          o
        ), d & 2048 && Pu(n.alternate, n);
        break;
      default:
        _i(
          e,
          n,
          l,
          o
        );
    }
  }
  function ca(e, n, l, o, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var p = e, x = n, _ = l, C = o, U = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          ca(
            p,
            x,
            _,
            C,
            d
          ), ml(8, x);
          break;
        case 23:
          break;
        case 22:
          var Q = x.stateNode;
          x.memoizedState !== null ? Q._visibility & 2 ? ca(
            p,
            x,
            _,
            C,
            d
          ) : vl(
            p,
            x
          ) : (Q._visibility |= 2, ca(
            p,
            x,
            _,
            C,
            d
          )), d && U & 2048 && Ju(
            x.alternate,
            x
          );
          break;
        case 24:
          ca(
            p,
            x,
            _,
            C,
            d
          ), d && U & 2048 && Pu(x.alternate, x);
          break;
        default:
          ca(
            p,
            x,
            _,
            C,
            d
          );
      }
      n = n.sibling;
    }
  }
  function vl(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = e, o = n, d = o.flags;
        switch (o.tag) {
          case 22:
            vl(l, o), d & 2048 && Ju(
              o.alternate,
              o
            );
            break;
          case 24:
            vl(l, o), d & 2048 && Pu(o.alternate, o);
            break;
          default:
            vl(l, o);
        }
        n = n.sibling;
      }
  }
  var gl = 8192;
  function ua(e, n, l) {
    if (e.subtreeFlags & gl)
      for (e = e.child; e !== null; )
        Fp(
          e,
          n,
          l
        ), e = e.sibling;
  }
  function Fp(e, n, l) {
    switch (e.tag) {
      case 26:
        ua(
          e,
          n,
          l
        ), e.flags & gl && e.memoizedState !== null && tw(
          l,
          wi,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ua(
          e,
          n,
          l
        );
        break;
      case 3:
      case 4:
        var o = wi;
        wi = po(e.stateNode.containerInfo), ua(
          e,
          n,
          l
        ), wi = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = gl, gl = 16777216, ua(
          e,
          n,
          l
        ), gl = o) : ua(
          e,
          n,
          l
        ));
        break;
      default:
        ua(
          e,
          n,
          l
        );
    }
  }
  function Jp(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function bl(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          he = o, tv(
            o,
            e
          );
        }
      Jp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Pp(e), e = e.sibling;
  }
  function Pp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        bl(e), e.flags & 2048 && En(9, e, e.return);
        break;
      case 3:
        bl(e);
        break;
      case 12:
        bl(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, eo(e)) : bl(e);
        break;
      default:
        bl(e);
    }
  }
  function eo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          he = o, tv(
            o,
            e
          );
        }
      Jp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          En(8, n, n.return), eo(n);
          break;
        case 22:
          l = n.stateNode, l._visibility & 2 && (l._visibility &= -3, eo(n));
          break;
        default:
          eo(n);
      }
      e = e.sibling;
    }
  }
  function tv(e, n) {
    for (; he !== null; ) {
      var l = he;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          En(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var o = l.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          el(l.memoizedState.cache);
      }
      if (o = l.child, o !== null) o.return = l, he = o;
      else
        t: for (l = e; he !== null; ) {
          o = he;
          var d = o.sibling, p = o.return;
          if (Yp(o), o === l) {
            he = null;
            break t;
          }
          if (d !== null) {
            d.return = p, he = d;
            break t;
          }
          he = p;
        }
    }
  }
  var py = {
    getCacheForType: function(e) {
      var n = ge(ee), l = n.data.get(e);
      return l === void 0 && (l = e(), n.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return ge(ee).controller.signal;
    }
  }, vy = typeof WeakMap == "function" ? WeakMap : Map, Rt = 0, Qt = null, wt = null, St = 0, Bt = 0, Ie = null, zn = !1, ha = !1, th = !1, un = 0, Wt = 0, Tn = 0, ys = 0, eh = 0, Fe = 0, da = 0, xl = null, He = null, ih = !1, io = 0, ev = 0, no = 1 / 0, so = null, An = null, re = 0, On = null, fa = null, hn = 0, nh = 0, sh = null, iv = null, yl = 0, ah = null;
  function Je() {
    return (Rt & 2) !== 0 && St !== 0 ? St & -St : L.T !== null ? hh() : xi();
  }
  function nv() {
    if (Fe === 0)
      if ((St & 536870912) === 0 || kt) {
        var e = Ls;
        Ls <<= 1, (Ls & 3932160) === 0 && (Ls = 262144), Fe = e;
      } else Fe = 536870912;
    return e = Ze.current, e !== null && (e.flags |= 32), Fe;
  }
  function qe(e, n, l) {
    (e === Qt && (Bt === 2 || Bt === 9) || e.cancelPendingCommit !== null) && (ma(e, 0), Dn(
      e,
      St,
      Fe,
      !1
    )), ii(e, l), ((Rt & 2) === 0 || e !== Qt) && (e === Qt && ((Rt & 2) === 0 && (ys |= l), Wt === 4 && Dn(
      e,
      St,
      Fe,
      !1
    )), Di(e));
  }
  function sv(e, n, l) {
    if ((Rt & 6) !== 0) throw Error(a(327));
    var o = !l && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Te(e, n), d = o ? xy(e, n) : rh(e, n, !0), p = o;
    do {
      if (d === 0) {
        ha && !o && Dn(e, n, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, p && !gy(l)) {
          d = rh(e, n, !1), p = !1;
          continue;
        }
        if (d === 2) {
          if (p = n, e.errorRecoveryDisabledLanes & p)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            t: {
              var _ = e;
              d = xl;
              var C = _.current.memoizedState.isDehydrated;
              if (C && (ma(_, x).flags |= 256), x = rh(
                _,
                x,
                !1
              ), x !== 2) {
                if (th && !C) {
                  _.errorRecoveryDisabledLanes |= p, ys |= p, d = 4;
                  break t;
                }
                p = He, He = d, p !== null && (He === null ? He = p : He.push.apply(
                  He,
                  p
                ));
              }
              d = x;
            }
            if (p = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          ma(e, 0), Dn(e, n, 0, !0);
          break;
        }
        t: {
          switch (o = e, p = d, p) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Dn(
                o,
                n,
                Fe,
                !zn
              );
              break t;
            case 2:
              He = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((n & 62914560) === n && (d = io + 300 - _e(), 10 < d)) {
            if (Dn(
              o,
              n,
              Fe,
              !zn
            ), ce(o, 0, !0) !== 0) break t;
            hn = n, o.timeoutHandle = Rv(
              av.bind(
                null,
                o,
                l,
                He,
                so,
                ih,
                n,
                Fe,
                ys,
                da,
                zn,
                p,
                "Throttled",
                -0,
                0
              ),
              d
            );
            break t;
          }
          av(
            o,
            l,
            He,
            so,
            ih,
            n,
            Fe,
            ys,
            da,
            zn,
            p,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Di(e);
  }
  function av(e, n, l, o, d, p, x, _, C, U, Q, K, H, q) {
    if (e.timeoutHandle = -1, K = n.subtreeFlags, K & 8192 || (K & 16785408) === 16785408) {
      K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wi
      }, Fp(
        n,
        p,
        K
      );
      var nt = (p & 62914560) === p ? io - _e() : (p & 4194048) === p ? ev - _e() : 0;
      if (nt = ew(
        K,
        nt
      ), nt !== null) {
        hn = p, e.cancelPendingCommit = nt(
          fv.bind(
            null,
            e,
            n,
            p,
            l,
            o,
            d,
            x,
            _,
            C,
            Q,
            K,
            null,
            H,
            q
          )
        ), Dn(e, p, x, !U);
        return;
      }
    }
    fv(
      e,
      n,
      p,
      l,
      o,
      d,
      x,
      _,
      C
    );
  }
  function gy(e) {
    for (var n = e; ; ) {
      var l = n.tag;
      if ((l === 0 || l === 11 || l === 15) && n.flags & 16384 && (l = n.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var o = 0; o < l.length; o++) {
          var d = l[o], p = d.getSnapshot;
          d = d.value;
          try {
            if (!Ke(p(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = n.child, n.subtreeFlags & 16384 && l !== null)
        l.return = n, n = l;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Dn(e, n, l, o) {
    n &= ~eh, n &= ~ys, e.suspendedLanes |= n, e.pingedLanes &= ~n, o && (e.warmLanes |= n), o = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var p = 31 - Se(d), x = 1 << p;
      o[p] = -1, d &= ~x;
    }
    l !== 0 && bi(e, l, n);
  }
  function ao() {
    return (Rt & 6) === 0 ? (wl(0), !1) : !0;
  }
  function lh() {
    if (wt !== null) {
      if (Bt === 0)
        var e = wt.return;
      else
        e = wt, Pi = hs = null, _u(e), sa = null, nl = 0, e = wt;
      for (; e !== null; )
        Lp(e.alternate, e), e = e.return;
      wt = null;
    }
  }
  function ma(e, n) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, By(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), hn = 0, lh(), Qt = e, wt = l = Fi(e.current, null), St = n, Bt = 0, Ie = null, zn = !1, ha = Te(e, n), th = !1, da = Fe = eh = ys = Tn = Wt = 0, He = xl = null, ih = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= n; 0 < o; ) {
        var d = 31 - Se(o), p = 1 << d;
        n |= e[d], o &= ~p;
      }
    return un = n, jr(), l;
  }
  function lv(e, n) {
    bt = null, L.H = hl, n === na || n === Dr ? (n = _m(), Bt = 3) : n === uu ? (n = _m(), Bt = 4) : Bt = n === Uu ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ie = n, wt === null && (Wt = 1, Zr(
      e,
      oi(n, e.current)
    ));
  }
  function rv() {
    var e = Ze.current;
    return e === null ? !0 : (St & 4194048) === St ? di === null : (St & 62914560) === St || (St & 536870912) !== 0 ? e === di : !1;
  }
  function ov() {
    var e = L.H;
    return L.H = hl, e === null ? hl : e;
  }
  function cv() {
    var e = L.A;
    return L.A = py, e;
  }
  function lo() {
    Wt = 4, zn || (St & 4194048) !== St && Ze.current !== null || (ha = !0), (Tn & 134217727) === 0 && (ys & 134217727) === 0 || Qt === null || Dn(
      Qt,
      St,
      Fe,
      !1
    );
  }
  function rh(e, n, l) {
    var o = Rt;
    Rt |= 2;
    var d = ov(), p = cv();
    (Qt !== e || St !== n) && (so = null, ma(e, n)), n = !1;
    var x = Wt;
    t: do
      try {
        if (Bt !== 0 && wt !== null) {
          var _ = wt, C = Ie;
          switch (Bt) {
            case 8:
              lh(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ze.current === null && (n = !0);
              var U = Bt;
              if (Bt = 0, Ie = null, pa(e, _, C, U), l && ha) {
                x = 0;
                break t;
              }
              break;
            default:
              U = Bt, Bt = 0, Ie = null, pa(e, _, C, U);
          }
        }
        by(), x = Wt;
        break;
      } catch (Q) {
        lv(e, Q);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Pi = hs = null, Rt = o, L.H = d, L.A = p, wt === null && (Qt = null, St = 0, jr()), x;
  }
  function by() {
    for (; wt !== null; ) uv(wt);
  }
  function xy(e, n) {
    var l = Rt;
    Rt |= 2;
    var o = ov(), d = cv();
    Qt !== e || St !== n ? (so = null, no = _e() + 500, ma(e, n)) : ha = Te(
      e,
      n
    );
    t: do
      try {
        if (Bt !== 0 && wt !== null) {
          n = wt;
          var p = Ie;
          e: switch (Bt) {
            case 1:
              Bt = 0, Ie = null, pa(e, n, p, 1);
              break;
            case 2:
            case 9:
              if (ym(p)) {
                Bt = 0, Ie = null, hv(n);
                break;
              }
              n = function() {
                Bt !== 2 && Bt !== 9 || Qt !== e || (Bt = 7), Di(e);
              }, p.then(n, n);
              break t;
            case 3:
              Bt = 7;
              break t;
            case 4:
              Bt = 5;
              break t;
            case 7:
              ym(p) ? (Bt = 0, Ie = null, hv(n)) : (Bt = 0, Ie = null, pa(e, n, p, 7));
              break;
            case 5:
              var x = null;
              switch (wt.tag) {
                case 26:
                  x = wt.memoizedState;
                case 5:
                case 27:
                  var _ = wt;
                  if (x ? Iv(x) : _.stateNode.complete) {
                    Bt = 0, Ie = null;
                    var C = _.sibling;
                    if (C !== null) wt = C;
                    else {
                      var U = _.return;
                      U !== null ? (wt = U, ro(U)) : wt = null;
                    }
                    break e;
                  }
              }
              Bt = 0, Ie = null, pa(e, n, p, 5);
              break;
            case 6:
              Bt = 0, Ie = null, pa(e, n, p, 6);
              break;
            case 8:
              lh(), Wt = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        yy();
        break;
      } catch (Q) {
        lv(e, Q);
      }
    while (!0);
    return Pi = hs = null, L.H = o, L.A = d, Rt = l, wt !== null ? 0 : (Qt = null, St = 0, jr(), Wt);
  }
  function yy() {
    for (; wt !== null && !Ds(); )
      uv(wt);
  }
  function uv(e) {
    var n = Dp(e.alternate, e, un);
    e.memoizedProps = e.pendingProps, n === null ? ro(e) : wt = n;
  }
  function hv(e) {
    var n = e, l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = kp(
          l,
          n,
          n.pendingProps,
          n.type,
          void 0,
          St
        );
        break;
      case 11:
        n = kp(
          l,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          St
        );
        break;
      case 5:
        _u(n);
      default:
        Lp(l, n), n = wt = cm(n, un), n = Dp(l, n, un);
    }
    e.memoizedProps = e.pendingProps, n === null ? ro(e) : wt = n;
  }
  function pa(e, n, l, o) {
    Pi = hs = null, _u(n), sa = null, nl = 0;
    var d = n.return;
    try {
      if (oy(
        e,
        d,
        n,
        l,
        St
      )) {
        Wt = 1, Zr(
          e,
          oi(l, e.current)
        ), wt = null;
        return;
      }
    } catch (p) {
      if (d !== null) throw wt = d, p;
      Wt = 1, Zr(
        e,
        oi(l, e.current)
      ), wt = null;
      return;
    }
    n.flags & 32768 ? (kt || o === 1 ? e = !0 : ha || (St & 536870912) !== 0 ? e = !1 : (zn = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ze.current, o !== null && o.tag === 13 && (o.flags |= 16384))), dv(n, e)) : ro(n);
  }
  function ro(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        dv(
          n,
          zn
        );
        return;
      }
      e = n.return;
      var l = hy(
        n.alternate,
        n,
        un
      );
      if (l !== null) {
        wt = l;
        return;
      }
      if (n = n.sibling, n !== null) {
        wt = n;
        return;
      }
      wt = n = e;
    } while (n !== null);
    Wt === 0 && (Wt = 5);
  }
  function dv(e, n) {
    do {
      var l = dy(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, wt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !n && (e = e.sibling, e !== null)) {
        wt = e;
        return;
      }
      wt = e = l;
    } while (e !== null);
    Wt = 6, wt = null;
  }
  function fv(e, n, l, o, d, p, x, _, C) {
    e.cancelPendingCommit = null;
    do
      oo();
    while (re !== 0);
    if ((Rt & 6) !== 0) throw Error(a(327));
    if (n !== null) {
      if (n === e.current) throw Error(a(177));
      if (p = n.lanes | n.childLanes, p |= Wc, le(
        e,
        l,
        p,
        x,
        _,
        C
      ), e === Qt && (wt = Qt = null, St = 0), fa = n, On = e, hn = l, nh = p, sh = d, iv = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, My(gi, function() {
        return bv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = L.T, L.T = null, d = Z.p, Z.p = 2, x = Rt, Rt |= 4;
        try {
          fy(e, n, l);
        } finally {
          Rt = x, Z.p = d, L.T = o;
        }
      }
      re = 1, mv(), pv(), vv();
    }
  }
  function mv() {
    if (re === 1) {
      re = 0;
      var e = On, n = fa, l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        l = L.T, L.T = null;
        var o = Z.p;
        Z.p = 2;
        var d = Rt;
        Rt |= 4;
        try {
          Zp(n, e);
          var p = xh, x = tm(e.containerInfo), _ = p.focusedElem, C = p.selectionRange;
          if (x !== _ && _ && _.ownerDocument && Pf(
            _.ownerDocument.documentElement,
            _
          )) {
            if (C !== null && Yc(_)) {
              var U = C.start, Q = C.end;
              if (Q === void 0 && (Q = U), "selectionStart" in _)
                _.selectionStart = U, _.selectionEnd = Math.min(
                  Q,
                  _.value.length
                );
              else {
                var K = _.ownerDocument || document, H = K && K.defaultView || window;
                if (H.getSelection) {
                  var q = H.getSelection(), nt = _.textContent.length, ut = Math.min(C.start, nt), $t = C.end === void 0 ? ut : Math.min(C.end, nt);
                  !q.extend && ut > $t && (x = $t, $t = ut, ut = x);
                  var A = Jf(
                    _,
                    ut
                  ), z = Jf(
                    _,
                    $t
                  );
                  if (A && z && (q.rangeCount !== 1 || q.anchorNode !== A.node || q.anchorOffset !== A.offset || q.focusNode !== z.node || q.focusOffset !== z.offset)) {
                    var B = K.createRange();
                    B.setStart(A.node, A.offset), q.removeAllRanges(), ut > $t ? (q.addRange(B), q.extend(z.node, z.offset)) : (B.setEnd(z.node, z.offset), q.addRange(B));
                  }
                }
              }
            }
            for (K = [], q = _; q = q.parentNode; )
              q.nodeType === 1 && K.push({
                element: q,
                left: q.scrollLeft,
                top: q.scrollTop
              });
            for (typeof _.focus == "function" && _.focus(), _ = 0; _ < K.length; _++) {
              var Y = K[_];
              Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
            }
          }
          wo = !!bh, xh = bh = null;
        } finally {
          Rt = d, Z.p = o, L.T = l;
        }
      }
      e.current = n, re = 2;
    }
  }
  function pv() {
    if (re === 2) {
      re = 0;
      var e = On, n = fa, l = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || l) {
        l = L.T, L.T = null;
        var o = Z.p;
        Z.p = 2;
        var d = Rt;
        Rt |= 4;
        try {
          Vp(e, n.alternate, n);
        } finally {
          Rt = d, Z.p = o, L.T = l;
        }
      }
      re = 3;
    }
  }
  function vv() {
    if (re === 4 || re === 3) {
      re = 0, hr();
      var e = On, n = fa, l = hn, o = iv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? re = 5 : (re = 0, fa = On = null, gv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (An = null), Xi(l), n = n.stateNode, je && typeof je.onCommitFiberRoot == "function")
        try {
          je.onCommitFiberRoot(
            ns,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = L.T, d = Z.p, Z.p = 2, L.T = null;
        try {
          for (var p = e.onRecoverableError, x = 0; x < o.length; x++) {
            var _ = o[x];
            p(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          L.T = n, Z.p = d;
        }
      }
      (hn & 3) !== 0 && oo(), Di(e), d = e.pendingLanes, (l & 261930) !== 0 && (d & 42) !== 0 ? e === ah ? yl++ : (yl = 0, ah = e) : yl = 0, wl(0);
    }
  }
  function gv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, el(n)));
  }
  function oo() {
    return mv(), pv(), vv(), bv();
  }
  function bv() {
    if (re !== 5) return !1;
    var e = On, n = nh;
    nh = 0;
    var l = Xi(hn), o = L.T, d = Z.p;
    try {
      Z.p = 32 > l ? 32 : l, L.T = null, l = sh, sh = null;
      var p = On, x = hn;
      if (re = 0, fa = On = null, hn = 0, (Rt & 6) !== 0) throw Error(a(331));
      var _ = Rt;
      if (Rt |= 4, Pp(p.current), Ip(
        p,
        p.current,
        x,
        l
      ), Rt = _, wl(0, !1), je && typeof je.onPostCommitFiberRoot == "function")
        try {
          je.onPostCommitFiberRoot(ns, p);
        } catch {
        }
      return !0;
    } finally {
      Z.p = d, L.T = o, gv(e, n);
    }
  }
  function xv(e, n, l) {
    n = oi(l, n), n = Bu(e.stateNode, n, 2), e = jn(e, n, 2), e !== null && (ii(e, 2), Di(e));
  }
  function Ut(e, n, l) {
    if (e.tag === 3)
      xv(e, e, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          xv(
            n,
            e,
            l
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (An === null || !An.has(o))) {
            e = oi(l, e), l = yp(2), o = jn(n, l, 2), o !== null && (wp(
              l,
              o,
              n,
              e
            ), ii(o, 2), Di(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function oh(e, n, l) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new vy();
      var d = /* @__PURE__ */ new Set();
      o.set(n, d);
    } else
      d = o.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), o.set(n, d));
    d.has(l) || (th = !0, d.add(l), e = wy.bind(null, e, n, l), n.then(e, e));
  }
  function wy(e, n, l) {
    var o = e.pingCache;
    o !== null && o.delete(n), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qt === e && (St & l) === l && (Wt === 4 || Wt === 3 && (St & 62914560) === St && 300 > _e() - io ? (Rt & 2) === 0 && ma(e, 0) : eh |= l, da === St && (da = 0)), Di(e);
  }
  function yv(e, n) {
    n === 0 && (n = Me()), e = os(e, n), e !== null && (ii(e, n), Di(e));
  }
  function _y(e) {
    var n = e.memoizedState, l = 0;
    n !== null && (l = n.retryLane), yv(e, l);
  }
  function Sy(e, n) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, d = e.memoizedState;
        d !== null && (l = d.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    o !== null && o.delete(n), yv(e, l);
  }
  function My(e, n) {
    return ti(e, n);
  }
  var co = null, va = null, ch = !1, uo = !1, uh = !1, Rn = 0;
  function Di(e) {
    e !== va && e.next === null && (va === null ? co = va = e : va = va.next = e), uo = !0, ch || (ch = !0, jy());
  }
  function wl(e, n) {
    if (!uh && uo) {
      uh = !0;
      do
        for (var l = !1, o = co; o !== null; ) {
          if (e !== 0) {
            var d = o.pendingLanes;
            if (d === 0) var p = 0;
            else {
              var x = o.suspendedLanes, _ = o.pingedLanes;
              p = (1 << 31 - Se(42 | e) + 1) - 1, p &= d & ~(x & ~_), p = p & 201326741 ? p & 201326741 | 1 : p ? p | 2 : 0;
            }
            p !== 0 && (l = !0, Mv(o, p));
          } else
            p = St, p = ce(
              o,
              o === Qt ? p : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (p & 3) === 0 || Te(o, p) || (l = !0, Mv(o, p));
          o = o.next;
        }
      while (l);
      uh = !1;
    }
  }
  function Ny() {
    wv();
  }
  function wv() {
    uo = ch = !1;
    var e = 0;
    Rn !== 0 && Ly() && (e = Rn);
    for (var n = _e(), l = null, o = co; o !== null; ) {
      var d = o.next, p = _v(o, n);
      p === 0 ? (o.next = null, l === null ? co = d : l.next = d, d === null && (va = l)) : (l = o, (e !== 0 || (p & 3) !== 0) && (uo = !0)), o = d;
    }
    re !== 0 && re !== 5 || wl(e), Rn !== 0 && (Rn = 0);
  }
  function _v(e, n) {
    for (var l = e.suspendedLanes, o = e.pingedLanes, d = e.expirationTimes, p = e.pendingLanes & -62914561; 0 < p; ) {
      var x = 31 - Se(p), _ = 1 << x, C = d[x];
      C === -1 ? ((_ & l) === 0 || (_ & o) !== 0) && (d[x] = Ae(_, n)) : C <= n && (e.expiredLanes |= _), p &= ~_;
    }
    if (n = Qt, l = St, l = ce(
      e,
      e === n ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, l === 0 || e === n && (Bt === 2 || Bt === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && gn(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Te(e, l)) {
      if (n = l & -l, n === e.callbackPriority) return n;
      switch (o !== null && gn(o), Xi(l)) {
        case 2:
        case 8:
          l = Gi;
          break;
        case 32:
          l = gi;
          break;
        case 268435456:
          l = $a;
          break;
        default:
          l = gi;
      }
      return o = Sv.bind(null, e), l = ti(l, o), e.callbackPriority = n, e.callbackNode = l, n;
    }
    return o !== null && o !== null && gn(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Sv(e, n) {
    if (re !== 0 && re !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (oo() && e.callbackNode !== l)
      return null;
    var o = St;
    return o = ce(
      e,
      e === Qt ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (sv(e, o, n), _v(e, _e()), e.callbackNode != null && e.callbackNode === l ? Sv.bind(null, e) : null);
  }
  function Mv(e, n) {
    if (oo()) return null;
    sv(e, n, !0);
  }
  function jy() {
    Uy(function() {
      (Rt & 6) !== 0 ? ti(
        dr,
        Ny
      ) : wv();
    });
  }
  function hh() {
    if (Rn === 0) {
      var e = ea;
      e === 0 && (e = Rs, Rs <<= 1, (Rs & 261888) === 0 && (Rs = 256)), Rn = e;
    }
    return Rn;
  }
  function Nv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : br("" + e);
  }
  function jv(e, n) {
    var l = n.ownerDocument.createElement("input");
    return l.name = n.name, l.value = n.value, e.id && l.setAttribute("form", e.id), n.parentNode.insertBefore(l, n), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function Cy(e, n, l, o, d) {
    if (n === "submit" && l && l.stateNode === d) {
      var p = Nv(
        (d[De] || null).action
      ), x = o.submitter;
      x && (n = (n = x[De] || null) ? Nv(n.formAction) : x.getAttribute("formAction"), n !== null && (p = n, x = null));
      var _ = new _r(
        "action",
        "action",
        null,
        o,
        d
      );
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Rn !== 0) {
                  var C = x ? jv(d, x) : new FormData(d);
                  Tu(
                    l,
                    {
                      pending: !0,
                      data: C,
                      method: d.method,
                      action: p
                    },
                    null,
                    C
                  );
                }
              } else
                typeof p == "function" && (_.preventDefault(), C = x ? jv(d, x) : new FormData(d), Tu(
                  l,
                  {
                    pending: !0,
                    data: C,
                    method: d.method,
                    action: p
                  },
                  p,
                  C
                ));
            },
            currentTarget: d
          }
        ]
      });
    }
  }
  for (var dh = 0; dh < Zc.length; dh++) {
    var fh = Zc[dh], ky = fh.toLowerCase(), Ey = fh[0].toUpperCase() + fh.slice(1);
    yi(
      ky,
      "on" + Ey
    );
  }
  yi(nm, "onAnimationEnd"), yi(sm, "onAnimationIteration"), yi(am, "onAnimationStart"), yi("dblclick", "onDoubleClick"), yi("focusin", "onFocus"), yi("focusout", "onBlur"), yi(Gx, "onTransitionRun"), yi(Kx, "onTransitionStart"), yi(Xx, "onTransitionCancel"), yi(lm, "onTransitionEnd"), $s("onMouseEnter", ["mouseout", "mouseover"]), $s("onMouseLeave", ["mouseout", "mouseover"]), $s("onPointerEnter", ["pointerout", "pointerover"]), $s("onPointerLeave", ["pointerout", "pointerover"]), ss(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ss(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ss("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ss(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ss(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ss(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var _l = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), zy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_l)
  );
  function Cv(e, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var o = e[l], d = o.event;
      o = o.listeners;
      t: {
        var p = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var _ = o[x], C = _.instance, U = _.currentTarget;
            if (_ = _.listener, C !== p && d.isPropagationStopped())
              break t;
            p = _, d.currentTarget = U;
            try {
              p(d);
            } catch (Q) {
              Nr(Q);
            }
            d.currentTarget = null, p = C;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (_ = o[x], C = _.instance, U = _.currentTarget, _ = _.listener, C !== p && d.isPropagationStopped())
              break t;
            p = _, d.currentTarget = U;
            try {
              p(d);
            } catch (Q) {
              Nr(Q);
            }
            d.currentTarget = null, p = C;
          }
      }
    }
  }
  function _t(e, n) {
    var l = n[jc];
    l === void 0 && (l = n[jc] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    l.has(o) || (kv(n, e, 2, !1), l.add(o));
  }
  function mh(e, n, l) {
    var o = 0;
    n && (o |= 4), kv(
      l,
      e,
      o,
      n
    );
  }
  var ho = "_reactListening" + Math.random().toString(36).slice(2);
  function ph(e) {
    if (!e[ho]) {
      e[ho] = !0, wf.forEach(function(l) {
        l !== "selectionchange" && (zy.has(l) || mh(l, !1, e), mh(l, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[ho] || (n[ho] = !0, mh("selectionchange", !1, n));
    }
  }
  function kv(e, n, l, o) {
    switch (ng(n)) {
      case 2:
        var d = sw;
        break;
      case 8:
        d = aw;
        break;
      default:
        d = zh;
    }
    l = d.bind(
      null,
      n,
      l,
      e
    ), d = void 0, !Rc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), o ? d !== void 0 ? e.addEventListener(n, l, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, l, !0) : d !== void 0 ? e.addEventListener(n, l, {
      passive: d
    }) : e.addEventListener(n, l, !1);
  }
  function vh(e, n, l, o, d) {
    var p = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var x = o.tag;
        if (x === 3 || x === 4) {
          var _ = o.stateNode.containerInfo;
          if (_ === d) break;
          if (x === 4)
            for (x = o.return; x !== null; ) {
              var C = x.tag;
              if ((C === 3 || C === 4) && x.stateNode.containerInfo === d)
                return;
              x = x.return;
            }
          for (; _ !== null; ) {
            if (x = Us(_), x === null) return;
            if (C = x.tag, C === 5 || C === 6 || C === 26 || C === 27) {
              o = p = x;
              continue t;
            }
            _ = _.parentNode;
          }
        }
        o = o.return;
      }
    Of(function() {
      var U = p, Q = Oc(l), K = [];
      t: {
        var H = rm.get(e);
        if (H !== void 0) {
          var q = _r, nt = e;
          switch (e) {
            case "keypress":
              if (yr(l) === 0) break t;
            case "keydown":
            case "keyup":
              q = Sx;
              break;
            case "focusin":
              nt = "focus", q = Hc;
              break;
            case "focusout":
              nt = "blur", q = Hc;
              break;
            case "beforeblur":
            case "afterblur":
              q = Hc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = Lf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = hx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = jx;
              break;
            case nm:
            case sm:
            case am:
              q = mx;
              break;
            case lm:
              q = kx;
              break;
            case "scroll":
            case "scrollend":
              q = cx;
              break;
            case "wheel":
              q = zx;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = vx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = Uf;
              break;
            case "toggle":
            case "beforetoggle":
              q = Ax;
          }
          var ut = (n & 4) !== 0, $t = !ut && (e === "scroll" || e === "scrollend"), A = ut ? H !== null ? H + "Capture" : null : H;
          ut = [];
          for (var z = U, B; z !== null; ) {
            var Y = z;
            if (B = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || B === null || A === null || (Y = Ya(z, A), Y != null && ut.push(
              Sl(z, Y, B)
            )), $t) break;
            z = z.return;
          }
          0 < ut.length && (H = new q(
            H,
            nt,
            null,
            l,
            Q
          ), K.push({ event: H, listeners: ut }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (H = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", H && l !== Ac && (nt = l.relatedTarget || l.fromElement) && (Us(nt) || nt[Bs]))
            break t;
          if ((q || H) && (H = Q.window === Q ? Q : (H = Q.ownerDocument) ? H.defaultView || H.parentWindow : window, q ? (nt = l.relatedTarget || l.toElement, q = U, nt = nt ? Us(nt) : null, nt !== null && ($t = c(nt), ut = nt.tag, nt !== $t || ut !== 5 && ut !== 27 && ut !== 6) && (nt = null)) : (q = null, nt = U), q !== nt)) {
            if (ut = Lf, Y = "onMouseLeave", A = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (ut = Uf, Y = "onPointerLeave", A = "onPointerEnter", z = "pointer"), $t = q == null ? H : Va(q), B = nt == null ? H : Va(nt), H = new ut(
              Y,
              z + "leave",
              q,
              l,
              Q
            ), H.target = $t, H.relatedTarget = B, Y = null, Us(Q) === U && (ut = new ut(
              A,
              z + "enter",
              nt,
              l,
              Q
            ), ut.target = B, ut.relatedTarget = $t, Y = ut), $t = Y, q && nt)
              e: {
                for (ut = Ty, A = q, z = nt, B = 0, Y = A; Y; Y = ut(Y))
                  B++;
                Y = 0;
                for (var ct = z; ct; ct = ut(ct))
                  Y++;
                for (; 0 < B - Y; )
                  A = ut(A), B--;
                for (; 0 < Y - B; )
                  z = ut(z), Y--;
                for (; B--; ) {
                  if (A === z || z !== null && A === z.alternate) {
                    ut = A;
                    break e;
                  }
                  A = ut(A), z = ut(z);
                }
                ut = null;
              }
            else ut = null;
            q !== null && Ev(
              K,
              H,
              q,
              ut,
              !1
            ), nt !== null && $t !== null && Ev(
              K,
              $t,
              nt,
              ut,
              !0
            );
          }
        }
        t: {
          if (H = U ? Va(U) : window, q = H.nodeName && H.nodeName.toLowerCase(), q === "select" || q === "input" && H.type === "file")
            var zt = Kf;
          else if (Yf(H))
            if (Xf)
              zt = Qx;
            else {
              zt = qx;
              var lt = Hx;
            }
          else
            q = H.nodeName, !q || q.toLowerCase() !== "input" || H.type !== "checkbox" && H.type !== "radio" ? U && Tc(U.elementType) && (zt = Kf) : zt = $x;
          if (zt && (zt = zt(e, U))) {
            Gf(
              K,
              zt,
              l,
              Q
            );
            break t;
          }
          lt && lt(e, H, U), e === "focusout" && U && H.type === "number" && U.memoizedProps.value != null && zc(H, "number", H.value);
        }
        switch (lt = U ? Va(U) : window, e) {
          case "focusin":
            (Yf(lt) || lt.contentEditable === "true") && (Xs = lt, Gc = U, Ja = null);
            break;
          case "focusout":
            Ja = Gc = Xs = null;
            break;
          case "mousedown":
            Kc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Kc = !1, em(K, l, Q);
            break;
          case "selectionchange":
            if (Yx) break;
          case "keydown":
          case "keyup":
            em(K, l, Q);
        }
        var yt;
        if ($c)
          t: {
            switch (e) {
              case "compositionstart":
                var Mt = "onCompositionStart";
                break t;
              case "compositionend":
                Mt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Mt = "onCompositionUpdate";
                break t;
            }
            Mt = void 0;
          }
        else
          Ks ? Qf(e, l) && (Mt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Mt = "onCompositionStart");
        Mt && (Hf && l.locale !== "ko" && (Ks || Mt !== "onCompositionStart" ? Mt === "onCompositionEnd" && Ks && (yt = Df()) : (xn = Q, Lc = "value" in xn ? xn.value : xn.textContent, Ks = !0)), lt = fo(U, Mt), 0 < lt.length && (Mt = new Bf(
          Mt,
          e,
          null,
          l,
          Q
        ), K.push({ event: Mt, listeners: lt }), yt ? Mt.data = yt : (yt = Vf(l), yt !== null && (Mt.data = yt)))), (yt = Dx ? Rx(e, l) : Lx(e, l)) && (Mt = fo(U, "onBeforeInput"), 0 < Mt.length && (lt = new Bf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          Q
        ), K.push({
          event: lt,
          listeners: Mt
        }), lt.data = yt)), Cy(
          K,
          e,
          U,
          l,
          Q
        );
      }
      Cv(K, n);
    });
  }
  function Sl(e, n, l) {
    return {
      instance: e,
      listener: n,
      currentTarget: l
    };
  }
  function fo(e, n) {
    for (var l = n + "Capture", o = []; e !== null; ) {
      var d = e, p = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || p === null || (d = Ya(e, l), d != null && o.unshift(
        Sl(e, d, p)
      ), d = Ya(e, n), d != null && o.push(
        Sl(e, d, p)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function Ty(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ev(e, n, l, o, d) {
    for (var p = n._reactName, x = []; l !== null && l !== o; ) {
      var _ = l, C = _.alternate, U = _.stateNode;
      if (_ = _.tag, C !== null && C === o) break;
      _ !== 5 && _ !== 26 && _ !== 27 || U === null || (C = U, d ? (U = Ya(l, p), U != null && x.unshift(
        Sl(l, U, C)
      )) : d || (U = Ya(l, p), U != null && x.push(
        Sl(l, U, C)
      ))), l = l.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Ay = /\r\n?/g, Oy = /\u0000|\uFFFD/g;
  function zv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ay, `
`).replace(Oy, "");
  }
  function Tv(e, n) {
    return n = zv(n), zv(e) === n;
  }
  function qt(e, n, l, o, d, p) {
    switch (l) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Vs(e, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Vs(e, "" + o);
        break;
      case "className":
        vr(e, "class", o);
        break;
      case "tabIndex":
        vr(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vr(e, l, o);
        break;
      case "style":
        Tf(e, o, p);
        break;
      case "data":
        if (n !== "object") {
          vr(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = br("" + o), e.setAttribute(l, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof p == "function" && (l === "formAction" ? (n !== "input" && qt(e, n, "name", d.name, d, null), qt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), qt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), qt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (qt(e, n, "encType", d.encType, d, null), qt(e, n, "method", d.method, d, null), qt(e, n, "target", d.target, d, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = br("" + o), e.setAttribute(l, o);
        break;
      case "onClick":
        o != null && (e.onclick = Wi);
        break;
      case "onScroll":
        o != null && _t("scroll", e);
        break;
      case "onScrollEnd":
        o != null && _t("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (l = o.__html, l != null) {
            if (d.children != null) throw Error(a(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = br("" + o), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, "" + o) : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(l, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(l, o) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(l, o) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(l) : e.setAttribute(l, o);
        break;
      case "popover":
        _t("beforetoggle", e), _t("toggle", e), pr(e, "popover", o);
        break;
      case "xlinkActuate":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Zi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Zi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Zi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Zi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        pr(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = rx.get(l) || l, pr(e, l, o));
    }
  }
  function gh(e, n, l, o, d, p) {
    switch (l) {
      case "style":
        Tf(e, o, p);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (l = o.__html, l != null) {
            if (d.children != null) throw Error(a(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Vs(e, o) : (typeof o == "number" || typeof o == "bigint") && Vs(e, "" + o);
        break;
      case "onScroll":
        o != null && _t("scroll", e);
        break;
      case "onScrollEnd":
        o != null && _t("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Wi);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!_f.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (d = l.endsWith("Capture"), n = l.slice(2, d ? l.length - 7 : void 0), p = e[De] || null, p = p != null ? p[l] : null, typeof p == "function" && e.removeEventListener(n, p, d), typeof o == "function")) {
              typeof p != "function" && p !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(n, o, d);
              break t;
            }
            l in e ? e[l] = o : o === !0 ? e.setAttribute(l, "") : pr(e, l, o);
          }
    }
  }
  function xe(e, n, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        _t("error", e), _t("load", e);
        var o = !1, d = !1, p;
        for (p in l)
          if (l.hasOwnProperty(p)) {
            var x = l[p];
            if (x != null)
              switch (p) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, n));
                default:
                  qt(e, n, p, x, l, null);
              }
          }
        d && qt(e, n, "srcSet", l.srcSet, l, null), o && qt(e, n, "src", l.src, l, null);
        return;
      case "input":
        _t("invalid", e);
        var _ = p = x = d = null, C = null, U = null;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var Q = l[o];
            if (Q != null)
              switch (o) {
                case "name":
                  d = Q;
                  break;
                case "type":
                  x = Q;
                  break;
                case "checked":
                  C = Q;
                  break;
                case "defaultChecked":
                  U = Q;
                  break;
                case "value":
                  p = Q;
                  break;
                case "defaultValue":
                  _ = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null)
                    throw Error(a(137, n));
                  break;
                default:
                  qt(e, n, o, Q, l, null);
              }
          }
        Cf(
          e,
          p,
          _,
          C,
          U,
          x,
          d,
          !1
        );
        return;
      case "select":
        _t("invalid", e), o = x = p = null;
        for (d in l)
          if (l.hasOwnProperty(d) && (_ = l[d], _ != null))
            switch (d) {
              case "value":
                p = _;
                break;
              case "defaultValue":
                x = _;
                break;
              case "multiple":
                o = _;
              default:
                qt(e, n, d, _, l, null);
            }
        n = p, l = x, e.multiple = !!o, n != null ? Qs(e, !!o, n, !1) : l != null && Qs(e, !!o, l, !0);
        return;
      case "textarea":
        _t("invalid", e), p = d = o = null;
        for (x in l)
          if (l.hasOwnProperty(x) && (_ = l[x], _ != null))
            switch (x) {
              case "value":
                o = _;
                break;
              case "defaultValue":
                d = _;
                break;
              case "children":
                p = _;
                break;
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(a(91));
                break;
              default:
                qt(e, n, x, _, l, null);
            }
        Ef(e, o, d, p);
        return;
      case "option":
        for (C in l)
          l.hasOwnProperty(C) && (o = l[C], o != null) && (C === "selected" ? e.selected = o && typeof o != "function" && typeof o != "symbol" : qt(e, n, C, o, l, null));
        return;
      case "dialog":
        _t("beforetoggle", e), _t("toggle", e), _t("cancel", e), _t("close", e);
        break;
      case "iframe":
      case "object":
        _t("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < _l.length; o++)
          _t(_l[o], e);
        break;
      case "image":
        _t("error", e), _t("load", e);
        break;
      case "details":
        _t("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        _t("error", e), _t("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (U in l)
          if (l.hasOwnProperty(U) && (o = l[U], o != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, n));
              default:
                qt(e, n, U, o, l, null);
            }
        return;
      default:
        if (Tc(n)) {
          for (Q in l)
            l.hasOwnProperty(Q) && (o = l[Q], o !== void 0 && gh(
              e,
              n,
              Q,
              o,
              l,
              void 0
            ));
          return;
        }
    }
    for (_ in l)
      l.hasOwnProperty(_) && (o = l[_], o != null && qt(e, n, _, o, l, null));
  }
  function Dy(e, n, l, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var d = null, p = null, x = null, _ = null, C = null, U = null, Q = null;
        for (q in l) {
          var K = l[q];
          if (l.hasOwnProperty(q) && K != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = K;
              default:
                o.hasOwnProperty(q) || qt(e, n, q, null, o, K);
            }
        }
        for (var H in o) {
          var q = o[H];
          if (K = l[H], o.hasOwnProperty(H) && (q != null || K != null))
            switch (H) {
              case "type":
                p = q;
                break;
              case "name":
                d = q;
                break;
              case "checked":
                U = q;
                break;
              case "defaultChecked":
                Q = q;
                break;
              case "value":
                x = q;
                break;
              case "defaultValue":
                _ = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(a(137, n));
                break;
              default:
                q !== K && qt(
                  e,
                  n,
                  H,
                  q,
                  o,
                  K
                );
            }
        }
        Ec(
          e,
          x,
          _,
          C,
          U,
          Q,
          p,
          d
        );
        return;
      case "select":
        q = x = _ = H = null;
        for (p in l)
          if (C = l[p], l.hasOwnProperty(p) && C != null)
            switch (p) {
              case "value":
                break;
              case "multiple":
                q = C;
              default:
                o.hasOwnProperty(p) || qt(
                  e,
                  n,
                  p,
                  null,
                  o,
                  C
                );
            }
        for (d in o)
          if (p = o[d], C = l[d], o.hasOwnProperty(d) && (p != null || C != null))
            switch (d) {
              case "value":
                H = p;
                break;
              case "defaultValue":
                _ = p;
                break;
              case "multiple":
                x = p;
              default:
                p !== C && qt(
                  e,
                  n,
                  d,
                  p,
                  o,
                  C
                );
            }
        n = _, l = x, o = q, H != null ? Qs(e, !!l, H, !1) : !!o != !!l && (n != null ? Qs(e, !!l, n, !0) : Qs(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        q = H = null;
        for (_ in l)
          if (d = l[_], l.hasOwnProperty(_) && d != null && !o.hasOwnProperty(_))
            switch (_) {
              case "value":
                break;
              case "children":
                break;
              default:
                qt(e, n, _, null, o, d);
            }
        for (x in o)
          if (d = o[x], p = l[x], o.hasOwnProperty(x) && (d != null || p != null))
            switch (x) {
              case "value":
                H = d;
                break;
              case "defaultValue":
                q = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(a(91));
                break;
              default:
                d !== p && qt(e, n, x, d, o, p);
            }
        kf(e, H, q);
        return;
      case "option":
        for (var nt in l)
          H = l[nt], l.hasOwnProperty(nt) && H != null && !o.hasOwnProperty(nt) && (nt === "selected" ? e.selected = !1 : qt(
            e,
            n,
            nt,
            null,
            o,
            H
          ));
        for (C in o)
          H = o[C], q = l[C], o.hasOwnProperty(C) && H !== q && (H != null || q != null) && (C === "selected" ? e.selected = H && typeof H != "function" && typeof H != "symbol" : qt(
            e,
            n,
            C,
            H,
            o,
            q
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ut in l)
          H = l[ut], l.hasOwnProperty(ut) && H != null && !o.hasOwnProperty(ut) && qt(e, n, ut, null, o, H);
        for (U in o)
          if (H = o[U], q = l[U], o.hasOwnProperty(U) && H !== q && (H != null || q != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(a(137, n));
                break;
              default:
                qt(
                  e,
                  n,
                  U,
                  H,
                  o,
                  q
                );
            }
        return;
      default:
        if (Tc(n)) {
          for (var $t in l)
            H = l[$t], l.hasOwnProperty($t) && H !== void 0 && !o.hasOwnProperty($t) && gh(
              e,
              n,
              $t,
              void 0,
              o,
              H
            );
          for (Q in o)
            H = o[Q], q = l[Q], !o.hasOwnProperty(Q) || H === q || H === void 0 && q === void 0 || gh(
              e,
              n,
              Q,
              H,
              o,
              q
            );
          return;
        }
    }
    for (var A in l)
      H = l[A], l.hasOwnProperty(A) && H != null && !o.hasOwnProperty(A) && qt(e, n, A, null, o, H);
    for (K in o)
      H = o[K], q = l[K], !o.hasOwnProperty(K) || H === q || H == null && q == null || qt(e, n, K, H, o, q);
  }
  function Av(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Ry() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, l = performance.getEntriesByType("resource"), o = 0; o < l.length; o++) {
        var d = l[o], p = d.transferSize, x = d.initiatorType, _ = d.duration;
        if (p && _ && Av(x)) {
          for (x = 0, _ = d.responseEnd, o += 1; o < l.length; o++) {
            var C = l[o], U = C.startTime;
            if (U > _) break;
            var Q = C.transferSize, K = C.initiatorType;
            Q && Av(K) && (C = C.responseEnd, x += Q * (C < _ ? 1 : (_ - U) / (C - U)));
          }
          if (--o, n += 8 * (p + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var bh = null, xh = null;
  function mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ov(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dv(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function yh(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var wh = null;
  function Ly() {
    var e = window.event;
    return e && e.type === "popstate" ? e === wh ? !1 : (wh = e, !0) : (wh = null, !1);
  }
  var Rv = typeof setTimeout == "function" ? setTimeout : void 0, By = typeof clearTimeout == "function" ? clearTimeout : void 0, Lv = typeof Promise == "function" ? Promise : void 0, Uy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lv < "u" ? function(e) {
    return Lv.resolve(null).then(e).catch(Hy);
  } : Rv;
  function Hy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ln(e) {
    return e === "head";
  }
  function Bv(e, n) {
    var l = n, o = 0;
    do {
      var d = l.nextSibling;
      if (e.removeChild(l), d && d.nodeType === 8)
        if (l = d.data, l === "/$" || l === "/&") {
          if (o === 0) {
            e.removeChild(d), ya(n);
            return;
          }
          o--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          o++;
        else if (l === "html")
          Ml(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Ml(l);
          for (var p = l.firstChild; p; ) {
            var x = p.nextSibling, _ = p.nodeName;
            p[Qa] || _ === "SCRIPT" || _ === "STYLE" || _ === "LINK" && p.rel.toLowerCase() === "stylesheet" || l.removeChild(p), p = x;
          }
        } else
          l === "body" && Ml(e.ownerDocument.body);
      l = d;
    } while (l);
    ya(n);
  }
  function Uv(e, n) {
    var l = e;
    e = 0;
    do {
      var o = l.nextSibling;
      if (l.nodeType === 1 ? n ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (n ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), o && o.nodeType === 8)
        if (l = o.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = o;
    } while (l);
  }
  function _h(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (n = n.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _h(l), Cc(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function qy(e, n, l, o) {
    for (; e.nodeType === 1; ) {
      var d = l;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Qa])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (p = e.getAttribute("rel"), p === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (p !== d.rel || e.getAttribute("href") !== (d.href == null || d.href === "" ? null : d.href) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin) || e.getAttribute("title") !== (d.title == null ? null : d.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (p = e.getAttribute("src"), (p !== (d.src == null ? null : d.src) || e.getAttribute("type") !== (d.type == null ? null : d.type) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin)) && p && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var p = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && e.getAttribute("name") === p)
          return e;
      } else return e;
      if (e = fi(e.nextSibling), e === null) break;
    }
    return null;
  }
  function $y(e, n, l) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function Hv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function Sh(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Mh(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Qy(e, n) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || l.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), l.removeEventListener("DOMContentLoaded", o);
      };
      l.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function fi(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return e;
  }
  var Nh = null;
  function qv(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (n === 0)
            return fi(e.nextSibling);
          n--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function $v(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (n === 0) return e;
          n--;
        } else l !== "/$" && l !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Qv(e, n, l) {
    switch (n = mo(l), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(a(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(a(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(a(454));
        return e;
      default:
        throw Error(a(451));
    }
  }
  function Ml(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Cc(e);
  }
  var mi = /* @__PURE__ */ new Map(), Vv = /* @__PURE__ */ new Set();
  function po(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var dn = Z.d;
  Z.d = {
    f: Vy,
    r: Yy,
    D: Gy,
    C: Ky,
    L: Xy,
    m: Zy,
    X: Iy,
    S: Wy,
    M: Fy
  };
  function Vy() {
    var e = dn.f(), n = ao();
    return e || n;
  }
  function Yy(e) {
    var n = Hs(e);
    n !== null && n.tag === 5 && n.type === "form" ? lp(n) : dn.r(e);
  }
  var ga = typeof document > "u" ? null : document;
  function Yv(e, n, l) {
    var o = ga;
    if (o && typeof n == "string" && n) {
      var d = li(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof l == "string" && (d += '[crossorigin="' + l + '"]'), Vv.has(d) || (Vv.add(d), e = { rel: e, crossOrigin: l, href: n }, o.querySelector(d) === null && (n = o.createElement("link"), xe(n, "link", e), ue(n), o.head.appendChild(n)));
    }
  }
  function Gy(e) {
    dn.D(e), Yv("dns-prefetch", e, null);
  }
  function Ky(e, n) {
    dn.C(e, n), Yv("preconnect", e, n);
  }
  function Xy(e, n, l) {
    dn.L(e, n, l);
    var o = ga;
    if (o && e && n) {
      var d = 'link[rel="preload"][as="' + li(n) + '"]';
      n === "image" && l && l.imageSrcSet ? (d += '[imagesrcset="' + li(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (d += '[imagesizes="' + li(
        l.imageSizes
      ) + '"]')) : d += '[href="' + li(e) + '"]';
      var p = d;
      switch (n) {
        case "style":
          p = ba(e);
          break;
        case "script":
          p = xa(e);
      }
      mi.has(p) || (e = b(
        {
          rel: "preload",
          href: n === "image" && l && l.imageSrcSet ? void 0 : e,
          as: n
        },
        l
      ), mi.set(p, e), o.querySelector(d) !== null || n === "style" && o.querySelector(Nl(p)) || n === "script" && o.querySelector(jl(p)) || (n = o.createElement("link"), xe(n, "link", e), ue(n), o.head.appendChild(n)));
    }
  }
  function Zy(e, n) {
    dn.m(e, n);
    var l = ga;
    if (l && e) {
      var o = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + li(o) + '"][href="' + li(e) + '"]', p = d;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          p = xa(e);
      }
      if (!mi.has(p) && (e = b({ rel: "modulepreload", href: e }, n), mi.set(p, e), l.querySelector(d) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(jl(p)))
              return;
        }
        o = l.createElement("link"), xe(o, "link", e), ue(o), l.head.appendChild(o);
      }
    }
  }
  function Wy(e, n, l) {
    dn.S(e, n, l);
    var o = ga;
    if (o && e) {
      var d = qs(o).hoistableStyles, p = ba(e);
      n = n || "default";
      var x = d.get(p);
      if (!x) {
        var _ = { loading: 0, preload: null };
        if (x = o.querySelector(
          Nl(p)
        ))
          _.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": n },
            l
          ), (l = mi.get(p)) && jh(e, l);
          var C = x = o.createElement("link");
          ue(C), xe(C, "link", e), C._p = new Promise(function(U, Q) {
            C.onload = U, C.onerror = Q;
          }), C.addEventListener("load", function() {
            _.loading |= 1;
          }), C.addEventListener("error", function() {
            _.loading |= 2;
          }), _.loading |= 4, vo(x, n, o);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: _
        }, d.set(p, x);
      }
    }
  }
  function Iy(e, n) {
    dn.X(e, n);
    var l = ga;
    if (l && e) {
      var o = qs(l).hoistableScripts, d = xa(e), p = o.get(d);
      p || (p = l.querySelector(jl(d)), p || (e = b({ src: e, async: !0 }, n), (n = mi.get(d)) && Ch(e, n), p = l.createElement("script"), ue(p), xe(p, "link", e), l.head.appendChild(p)), p = {
        type: "script",
        instance: p,
        count: 1,
        state: null
      }, o.set(d, p));
    }
  }
  function Fy(e, n) {
    dn.M(e, n);
    var l = ga;
    if (l && e) {
      var o = qs(l).hoistableScripts, d = xa(e), p = o.get(d);
      p || (p = l.querySelector(jl(d)), p || (e = b({ src: e, async: !0, type: "module" }, n), (n = mi.get(d)) && Ch(e, n), p = l.createElement("script"), ue(p), xe(p, "link", e), l.head.appendChild(p)), p = {
        type: "script",
        instance: p,
        count: 1,
        state: null
      }, o.set(d, p));
    }
  }
  function Gv(e, n, l, o) {
    var d = (d = ht.current) ? po(d) : null;
    if (!d) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (n = ba(l.href), l = qs(
          d
        ).hoistableStyles, o = l.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ba(l.href);
          var p = qs(
            d
          ).hoistableStyles, x = p.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, p.set(e, x), (p = d.querySelector(
            Nl(e)
          )) && !p._p && (x.instance = p, x.state.loading = 5), mi.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, mi.set(e, l), p || Jy(
            d,
            e,
            l,
            x.state
          ))), n && o === null)
            throw Error(a(528, ""));
          return x;
        }
        if (n && o !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return n = l.async, l = l.src, typeof l == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = xa(l), l = qs(
          d
        ).hoistableScripts, o = l.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, e));
    }
  }
  function ba(e) {
    return 'href="' + li(e) + '"';
  }
  function Nl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Kv(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Jy(e, n, l, o) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = e.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), xe(n, "link", l), ue(n), e.head.appendChild(n));
  }
  function xa(e) {
    return '[src="' + li(e) + '"]';
  }
  function jl(e) {
    return "script[async]" + e;
  }
  function Xv(e, n, l) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + li(l.href) + '"]'
          );
          if (o)
            return n.instance = o, ue(o), o;
          var d = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), ue(o), xe(o, "style", d), vo(o, l.precedence, e), n.instance = o;
        case "stylesheet":
          d = ba(l.href);
          var p = e.querySelector(
            Nl(d)
          );
          if (p)
            return n.state.loading |= 4, n.instance = p, ue(p), p;
          o = Kv(l), (d = mi.get(d)) && jh(o, d), p = (e.ownerDocument || e).createElement("link"), ue(p);
          var x = p;
          return x._p = new Promise(function(_, C) {
            x.onload = _, x.onerror = C;
          }), xe(p, "link", o), n.state.loading |= 4, vo(p, l.precedence, e), n.instance = p;
        case "script":
          return p = xa(l.src), (d = e.querySelector(
            jl(p)
          )) ? (n.instance = d, ue(d), d) : (o = l, (d = mi.get(p)) && (o = b({}, l), Ch(o, d)), e = e.ownerDocument || e, d = e.createElement("script"), ue(d), xe(d, "link", o), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(a(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, vo(o, l.precedence, e));
    return n.instance;
  }
  function vo(e, n, l) {
    for (var o = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = o.length ? o[o.length - 1] : null, p = d, x = 0; x < o.length; x++) {
      var _ = o[x];
      if (_.dataset.precedence === n) p = _;
      else if (p !== d) break;
    }
    p ? p.parentNode.insertBefore(e, p.nextSibling) : (n = l.nodeType === 9 ? l.head : l, n.insertBefore(e, n.firstChild));
  }
  function jh(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Ch(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var go = null;
  function Zv(e, n, l) {
    if (go === null) {
      var o = /* @__PURE__ */ new Map(), d = go = /* @__PURE__ */ new Map();
      d.set(l, o);
    } else
      d = go, o = d.get(l), o || (o = /* @__PURE__ */ new Map(), d.set(l, o));
    if (o.has(e)) return o;
    for (o.set(e, null), l = l.getElementsByTagName(e), d = 0; d < l.length; d++) {
      var p = l[d];
      if (!(p[Qa] || p[pe] || e === "link" && p.getAttribute("rel") === "stylesheet") && p.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = p.getAttribute(n) || "";
        x = e + x;
        var _ = o.get(x);
        _ ? _.push(p) : o.set(x, [p]);
      }
    }
    return o;
  }
  function Wv(e, n, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Py(e, n, l) {
    if (l === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        return n.rel === "stylesheet" ? (e = n.disabled, typeof n.precedence == "string" && e == null) : !0;
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Iv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function tw(e, n, l, o) {
    if (l.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var d = ba(o.href), p = n.querySelector(
          Nl(d)
        );
        if (p) {
          n = p._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = bo.bind(e), n.then(e, e)), l.state.loading |= 4, l.instance = p, ue(p);
          return;
        }
        p = n.ownerDocument || n, o = Kv(o), (d = mi.get(d)) && jh(o, d), p = p.createElement("link"), ue(p);
        var x = p;
        x._p = new Promise(function(_, C) {
          x.onload = _, x.onerror = C;
        }), xe(p, "link", o), l.instance = p;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, n), (n = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = bo.bind(e), n.addEventListener("load", l), n.addEventListener("error", l));
    }
  }
  var kh = 0;
  function ew(e, n) {
    return e.stylesheets && e.count === 0 && yo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var o = setTimeout(function() {
        if (e.stylesheets && yo(e, e.stylesheets), e.unsuspend) {
          var p = e.unsuspend;
          e.unsuspend = null, p();
        }
      }, 6e4 + n);
      0 < e.imgBytes && kh === 0 && (kh = 62500 * Ry());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && yo(e, e.stylesheets), e.unsuspend)) {
            var p = e.unsuspend;
            e.unsuspend = null, p();
          }
        },
        (e.imgBytes > kh ? 50 : 800) + n
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(d);
      };
    } : null;
  }
  function bo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) yo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var xo = null;
  function yo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, xo = /* @__PURE__ */ new Map(), n.forEach(iw, e), xo = null, bo.call(e));
  }
  function iw(e, n) {
    if (!(n.state.loading & 4)) {
      var l = xo.get(e);
      if (l) var o = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), xo.set(e, l);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), p = 0; p < d.length; p++) {
          var x = d[p];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (l.set(x.dataset.precedence, x), o = x);
        }
        o && l.set(null, o);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), p = l.get(x) || o, p === o && l.set(null, d), l.set(x, d), this.count++, o = bo.bind(this), d.addEventListener("load", o), d.addEventListener("error", o), p ? p.parentNode.insertBefore(d, p.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Cl = {
    $$typeof: D,
    Provider: null,
    Consumer: null,
    _currentValue: it,
    _currentValue2: it,
    _threadCount: 0
  };
  function nw(e, n, l, o, d, p, x, _, C) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Oe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oe(0), this.hiddenUpdates = Oe(null), this.identifierPrefix = o, this.onUncaughtError = d, this.onCaughtError = p, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Fv(e, n, l, o, d, p, x, _, C, U, Q, K) {
    return e = new nw(
      e,
      n,
      l,
      x,
      C,
      U,
      Q,
      K,
      _
    ), n = 1, p === !0 && (n |= 24), p = Xe(3, null, null, n), e.current = p, p.stateNode = e, n = ru(), n.refCount++, e.pooledCache = n, n.refCount++, p.memoizedState = {
      element: o,
      isDehydrated: l,
      cache: n
    }, hu(p), e;
  }
  function Jv(e) {
    return e ? (e = Is, e) : Is;
  }
  function Pv(e, n, l, o, d, p) {
    d = Jv(d), o.context === null ? o.context = d : o.pendingContext = d, o = Nn(n), o.payload = { element: l }, p = p === void 0 ? null : p, p !== null && (o.callback = p), l = jn(e, o, n), l !== null && (qe(l, e, n), al(l, e, n));
  }
  function tg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function Eh(e, n) {
    tg(e, n), (e = e.alternate) && tg(e, n);
  }
  function eg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = os(e, 67108864);
      n !== null && qe(n, e, 67108864), Eh(e, 67108864);
    }
  }
  function ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Je();
      n = Ki(n);
      var l = os(e, n);
      l !== null && qe(l, e, n), Eh(e, n);
    }
  }
  var wo = !0;
  function sw(e, n, l, o) {
    var d = L.T;
    L.T = null;
    var p = Z.p;
    try {
      Z.p = 2, zh(e, n, l, o);
    } finally {
      Z.p = p, L.T = d;
    }
  }
  function aw(e, n, l, o) {
    var d = L.T;
    L.T = null;
    var p = Z.p;
    try {
      Z.p = 8, zh(e, n, l, o);
    } finally {
      Z.p = p, L.T = d;
    }
  }
  function zh(e, n, l, o) {
    if (wo) {
      var d = Th(o);
      if (d === null)
        vh(
          e,
          n,
          o,
          _o,
          l
        ), sg(e, o);
      else if (rw(
        d,
        e,
        n,
        l,
        o
      ))
        o.stopPropagation();
      else if (sg(e, o), n & 4 && -1 < lw.indexOf(e)) {
        for (; d !== null; ) {
          var p = Hs(d);
          if (p !== null)
            switch (p.tag) {
              case 3:
                if (p = p.stateNode, p.current.memoizedState.isDehydrated) {
                  var x = Ft(p.pendingLanes);
                  if (x !== 0) {
                    var _ = p;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; x; ) {
                      var C = 1 << 31 - Se(x);
                      _.entanglements[1] |= C, x &= ~C;
                    }
                    Di(p), (Rt & 6) === 0 && (no = _e() + 500, wl(0));
                  }
                }
                break;
              case 31:
              case 13:
                _ = os(p, 2), _ !== null && qe(_, p, 2), ao(), Eh(p, 2);
            }
          if (p = Th(o), p === null && vh(
            e,
            n,
            o,
            _o,
            l
          ), p === d) break;
          d = p;
        }
        d !== null && o.stopPropagation();
      } else
        vh(
          e,
          n,
          o,
          null,
          l
        );
    }
  }
  function Th(e) {
    return e = Oc(e), Ah(e);
  }
  var _o = null;
  function Ah(e) {
    if (_o = null, e = Us(e), e !== null) {
      var n = c(e);
      if (n === null) e = null;
      else {
        var l = n.tag;
        if (l === 13) {
          if (e = u(n), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return _o = e, null;
  }
  function ng(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Sc()) {
          case dr:
            return 2;
          case Gi:
            return 8;
          case gi:
          case is:
            return 32;
          case $a:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Oh = !1, Bn = null, Un = null, Hn = null, kl = /* @__PURE__ */ new Map(), El = /* @__PURE__ */ new Map(), qn = [], lw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Bn = null;
        break;
      case "dragenter":
      case "dragleave":
        Un = null;
        break;
      case "mouseover":
      case "mouseout":
        Hn = null;
        break;
      case "pointerover":
      case "pointerout":
        kl.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        El.delete(n.pointerId);
    }
  }
  function zl(e, n, l, o, d, p) {
    return e === null || e.nativeEvent !== p ? (e = {
      blockedOn: n,
      domEventName: l,
      eventSystemFlags: o,
      nativeEvent: p,
      targetContainers: [d]
    }, n !== null && (n = Hs(n), n !== null && eg(n)), e) : (e.eventSystemFlags |= o, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function rw(e, n, l, o, d) {
    switch (n) {
      case "focusin":
        return Bn = zl(
          Bn,
          e,
          n,
          l,
          o,
          d
        ), !0;
      case "dragenter":
        return Un = zl(
          Un,
          e,
          n,
          l,
          o,
          d
        ), !0;
      case "mouseover":
        return Hn = zl(
          Hn,
          e,
          n,
          l,
          o,
          d
        ), !0;
      case "pointerover":
        var p = d.pointerId;
        return kl.set(
          p,
          zl(
            kl.get(p) || null,
            e,
            n,
            l,
            o,
            d
          )
        ), !0;
      case "gotpointercapture":
        return p = d.pointerId, El.set(
          p,
          zl(
            El.get(p) || null,
            e,
            n,
            l,
            o,
            d
          )
        ), !0;
    }
    return !1;
  }
  function ag(e) {
    var n = Us(e.target);
    if (n !== null) {
      var l = c(n);
      if (l !== null) {
        if (n = l.tag, n === 13) {
          if (n = u(l), n !== null) {
            e.blockedOn = n, bn(e.priority, function() {
              ig(l);
            });
            return;
          }
        } else if (n === 31) {
          if (n = f(l), n !== null) {
            e.blockedOn = n, bn(e.priority, function() {
              ig(l);
            });
            return;
          }
        } else if (n === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function So(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var l = Th(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var o = new l.constructor(
          l.type,
          l
        );
        Ac = o, l.target.dispatchEvent(o), Ac = null;
      } else
        return n = Hs(l), n !== null && eg(n), e.blockedOn = l, !1;
      n.shift();
    }
    return !0;
  }
  function lg(e, n, l) {
    So(e) && l.delete(n);
  }
  function ow() {
    Oh = !1, Bn !== null && So(Bn) && (Bn = null), Un !== null && So(Un) && (Un = null), Hn !== null && So(Hn) && (Hn = null), kl.forEach(lg), El.forEach(lg);
  }
  function Mo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Oh || (Oh = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      ow
    )));
  }
  var No = null;
  function rg(e) {
    No !== e && (No = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        No === e && (No = null);
        for (var n = 0; n < e.length; n += 3) {
          var l = e[n], o = e[n + 1], d = e[n + 2];
          if (typeof o != "function") {
            if (Ah(o || l) === null)
              continue;
            break;
          }
          var p = Hs(l);
          p !== null && (e.splice(n, 3), n -= 3, Tu(
            p,
            {
              pending: !0,
              data: d,
              method: l.method,
              action: o
            },
            o,
            d
          ));
        }
      }
    ));
  }
  function ya(e) {
    function n(C) {
      return Mo(C, e);
    }
    Bn !== null && Mo(Bn, e), Un !== null && Mo(Un, e), Hn !== null && Mo(Hn, e), kl.forEach(n), El.forEach(n);
    for (var l = 0; l < qn.length; l++) {
      var o = qn[l];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < qn.length && (l = qn[0], l.blockedOn === null); )
      ag(l), l.blockedOn === null && qn.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (o = 0; o < l.length; o += 3) {
        var d = l[o], p = l[o + 1], x = d[De] || null;
        if (typeof p == "function")
          x || rg(l);
        else if (x) {
          var _ = null;
          if (p && p.hasAttribute("formAction")) {
            if (d = p, x = p[De] || null)
              _ = x.formAction;
            else if (Ah(d) !== null) continue;
          } else _ = x.action;
          typeof _ == "function" ? l[o + 1] = _ : (l.splice(o, 3), o -= 3), rg(l);
        }
      }
  }
  function og() {
    function e(p) {
      p.canIntercept && p.info === "react-transition" && p.intercept({
        handler: function() {
          return new Promise(function(x) {
            return d = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      d !== null && (d(), d = null), o || setTimeout(l, 20);
    }
    function l() {
      if (!o && !navigation.transition) {
        var p = navigation.currentEntry;
        p && p.url != null && navigation.navigate(p.url, {
          state: p.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, d = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(l, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), d !== null && (d(), d = null);
      };
    }
  }
  function Dh(e) {
    this._internalRoot = e;
  }
  jo.prototype.render = Dh.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(a(409));
    var l = n.current, o = Je();
    Pv(l, o, e, n, null, null);
  }, jo.prototype.unmount = Dh.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Pv(e.current, 2, null, e, null, null), ao(), n[Bs] = null;
    }
  };
  function jo(e) {
    this._internalRoot = e;
  }
  jo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = xi();
      e = { blockedOn: null, target: e, priority: n };
      for (var l = 0; l < qn.length && n !== 0 && n < qn[l].priority; l++) ;
      qn.splice(l, 0, e), l === 0 && ag(e);
    }
  };
  var cg = t.version;
  if (cg !== "19.2.7")
    throw Error(
      a(
        527,
        cg,
        "19.2.7"
      )
    );
  Z.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = v(n), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var cw = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Co = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Co.isDisabled && Co.supportsFiber)
      try {
        ns = Co.inject(
          cw
        ), je = Co;
      } catch {
      }
  }
  return Al.createRoot = function(e, n) {
    if (!r(e)) throw Error(a(299));
    var l = !1, o = "", d = vp, p = gp, x = bp;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (p = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Fv(
      e,
      1,
      !1,
      null,
      null,
      l,
      o,
      null,
      d,
      p,
      x,
      og
    ), e[Bs] = n.current, ph(e), new Dh(n);
  }, Al.hydrateRoot = function(e, n, l) {
    if (!r(e)) throw Error(a(299));
    var o = !1, d = "", p = vp, x = gp, _ = bp, C = null;
    return l != null && (l.unstable_strictMode === !0 && (o = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onUncaughtError !== void 0 && (p = l.onUncaughtError), l.onCaughtError !== void 0 && (x = l.onCaughtError), l.onRecoverableError !== void 0 && (_ = l.onRecoverableError), l.formState !== void 0 && (C = l.formState)), n = Fv(
      e,
      1,
      !0,
      n,
      l ?? null,
      o,
      d,
      C,
      p,
      x,
      _,
      og
    ), n.context = Jv(null), l = n.current, o = Je(), o = Ki(o), d = Nn(o), d.callback = null, jn(l, d, o), l = o, n.current.lanes = l, ii(n, l), Di(n), e[Bs] = n.current, ph(e), new jo(n);
  }, Al.version = "19.2.7", Al;
}
var xg;
function ww() {
  if (xg) return Lh.exports;
  xg = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), Lh.exports = yw(), Lh.exports;
}
var _w = ww(), j = $d();
const $e = /* @__PURE__ */ fw(j);
var Gn = fb();
function Sw() {
  for (var s = arguments.length, t = new Array(s), i = 0; i < s; i++)
    t[i] = arguments[i];
  return j.useMemo(
    () => (a) => {
      t.forEach((r) => r(a));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  );
}
const oc = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ra(s) {
  const t = Object.prototype.toString.call(s);
  return t === "[object Window]" || // In Electron context the Window object serializes to [object global]
  t === "[object global]";
}
function Qd(s) {
  return "nodeType" in s;
}
function Ye(s) {
  var t, i;
  return s ? Ra(s) ? s : Qd(s) && (t = (i = s.ownerDocument) == null ? void 0 : i.defaultView) != null ? t : window : window;
}
function Vd(s) {
  const {
    Document: t
  } = Ye(s);
  return s instanceof t;
}
function tr(s) {
  return Ra(s) ? !1 : s instanceof Ye(s).HTMLElement;
}
function mb(s) {
  return s instanceof Ye(s).SVGElement;
}
function La(s) {
  return s ? Ra(s) ? s.document : Qd(s) ? Vd(s) ? s : tr(s) || mb(s) ? s.ownerDocument : document : document : document;
}
const $i = oc ? j.useLayoutEffect : j.useEffect;
function Yd(s) {
  const t = j.useRef(s);
  return $i(() => {
    t.current = s;
  }), j.useCallback(function() {
    for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++)
      a[r] = arguments[r];
    return t.current == null ? void 0 : t.current(...a);
  }, []);
}
function Mw() {
  const s = j.useRef(null), t = j.useCallback((a, r) => {
    s.current = setInterval(a, r);
  }, []), i = j.useCallback(() => {
    s.current !== null && (clearInterval(s.current), s.current = null);
  }, []);
  return [t, i];
}
function Kl(s, t) {
  t === void 0 && (t = [s]);
  const i = j.useRef(s);
  return $i(() => {
    i.current !== s && (i.current = s);
  }, t), i;
}
function er(s, t) {
  const i = j.useRef();
  return j.useMemo(
    () => {
      const a = s(i.current);
      return i.current = a, a;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...t]
  );
}
function Zo(s) {
  const t = Yd(s), i = j.useRef(null), a = j.useCallback(
    (r) => {
      r !== i.current && t?.(r, i.current), i.current = r;
    },
    //eslint-disable-next-line
    []
  );
  return [i, a];
}
function _d(s) {
  const t = j.useRef();
  return j.useEffect(() => {
    t.current = s;
  }, [s]), t.current;
}
let $h = {};
function ir(s, t) {
  return j.useMemo(() => {
    if (t)
      return t;
    const i = $h[s] == null ? 0 : $h[s] + 1;
    return $h[s] = i, s + "-" + i;
  }, [s, t]);
}
function pb(s) {
  return function(t) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      a[r - 1] = arguments[r];
    return a.reduce((c, u) => {
      const f = Object.entries(u);
      for (const [m, v] of f) {
        const g = c[m];
        g != null && (c[m] = g + s * v);
      }
      return c;
    }, {
      ...t
    });
  };
}
const Ca = /* @__PURE__ */ pb(1), Wo = /* @__PURE__ */ pb(-1);
function Nw(s) {
  return "clientX" in s && "clientY" in s;
}
function Gd(s) {
  if (!s)
    return !1;
  const {
    KeyboardEvent: t
  } = Ye(s.target);
  return t && s instanceof t;
}
function jw(s) {
  if (!s)
    return !1;
  const {
    TouchEvent: t
  } = Ye(s.target);
  return t && s instanceof t;
}
function Sd(s) {
  if (jw(s)) {
    if (s.touches && s.touches.length) {
      const {
        clientX: t,
        clientY: i
      } = s.touches[0];
      return {
        x: t,
        y: i
      };
    } else if (s.changedTouches && s.changedTouches.length) {
      const {
        clientX: t,
        clientY: i
      } = s.changedTouches[0];
      return {
        x: t,
        y: i
      };
    }
  }
  return Nw(s) ? {
    x: s.clientX,
    y: s.clientY
  } : null;
}
const Xl = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(s) {
      if (!s)
        return;
      const {
        x: t,
        y: i
      } = s;
      return "translate3d(" + (t ? Math.round(t) : 0) + "px, " + (i ? Math.round(i) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(s) {
      if (!s)
        return;
      const {
        scaleX: t,
        scaleY: i
      } = s;
      return "scaleX(" + t + ") scaleY(" + i + ")";
    }
  },
  Transform: {
    toString(s) {
      if (s)
        return [Xl.Translate.toString(s), Xl.Scale.toString(s)].join(" ");
    }
  },
  Transition: {
    toString(s) {
      let {
        property: t,
        duration: i,
        easing: a
      } = s;
      return t + " " + i + "ms " + a;
    }
  }
}), yg = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function Cw(s) {
  return s.matches(yg) ? s : s.querySelector(yg);
}
const kw = {
  display: "none"
};
function Ew(s) {
  let {
    id: t,
    value: i
  } = s;
  return $e.createElement("div", {
    id: t,
    style: kw
  }, i);
}
function zw(s) {
  let {
    id: t,
    announcement: i,
    ariaLiveType: a = "assertive"
  } = s;
  const r = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return $e.createElement("div", {
    id: t,
    style: r,
    role: "status",
    "aria-live": a,
    "aria-atomic": !0
  }, i);
}
function Tw() {
  const [s, t] = j.useState("");
  return {
    announce: j.useCallback((a) => {
      a != null && t(a);
    }, []),
    announcement: s
  };
}
const vb = /* @__PURE__ */ j.createContext(null);
function Aw(s) {
  const t = j.useContext(vb);
  j.useEffect(() => {
    if (!t)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return t(s);
  }, [s, t]);
}
function Ow() {
  const [s] = j.useState(() => /* @__PURE__ */ new Set()), t = j.useCallback((a) => (s.add(a), () => s.delete(a)), [s]);
  return [j.useCallback((a) => {
    let {
      type: r,
      event: c
    } = a;
    s.forEach((u) => {
      var f;
      return (f = u[r]) == null ? void 0 : f.call(u, c);
    });
  }, [s]), t];
}
const Dw = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, Rw = {
  onDragStart(s) {
    let {
      active: t
    } = s;
    return "Picked up draggable item " + t.id + ".";
  },
  onDragOver(s) {
    let {
      active: t,
      over: i
    } = s;
    return i ? "Draggable item " + t.id + " was moved over droppable area " + i.id + "." : "Draggable item " + t.id + " is no longer over a droppable area.";
  },
  onDragEnd(s) {
    let {
      active: t,
      over: i
    } = s;
    return i ? "Draggable item " + t.id + " was dropped over droppable area " + i.id : "Draggable item " + t.id + " was dropped.";
  },
  onDragCancel(s) {
    let {
      active: t
    } = s;
    return "Dragging was cancelled. Draggable item " + t.id + " was dropped.";
  }
};
function Lw(s) {
  let {
    announcements: t = Rw,
    container: i,
    hiddenTextDescribedById: a,
    screenReaderInstructions: r = Dw
  } = s;
  const {
    announce: c,
    announcement: u
  } = Tw(), f = ir("DndLiveRegion"), [m, v] = j.useState(!1);
  if (j.useEffect(() => {
    v(!0);
  }, []), Aw(j.useMemo(() => ({
    onDragStart(b) {
      let {
        active: y
      } = b;
      c(t.onDragStart({
        active: y
      }));
    },
    onDragMove(b) {
      let {
        active: y,
        over: S
      } = b;
      t.onDragMove && c(t.onDragMove({
        active: y,
        over: S
      }));
    },
    onDragOver(b) {
      let {
        active: y,
        over: S
      } = b;
      c(t.onDragOver({
        active: y,
        over: S
      }));
    },
    onDragEnd(b) {
      let {
        active: y,
        over: S
      } = b;
      c(t.onDragEnd({
        active: y,
        over: S
      }));
    },
    onDragCancel(b) {
      let {
        active: y,
        over: S
      } = b;
      c(t.onDragCancel({
        active: y,
        over: S
      }));
    }
  }), [c, t])), !m)
    return null;
  const g = $e.createElement($e.Fragment, null, $e.createElement(Ew, {
    id: a,
    value: r.draggable
  }), $e.createElement(zw, {
    id: f,
    announcement: u
  }));
  return i ? Gn.createPortal(g, i) : g;
}
var oe;
(function(s) {
  s.DragStart = "dragStart", s.DragMove = "dragMove", s.DragEnd = "dragEnd", s.DragCancel = "dragCancel", s.DragOver = "dragOver", s.RegisterDroppable = "registerDroppable", s.SetDroppableDisabled = "setDroppableDisabled", s.UnregisterDroppable = "unregisterDroppable";
})(oe || (oe = {}));
function Io() {
}
function Kd(s, t) {
  return j.useMemo(
    () => ({
      sensor: s,
      options: t ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s, t]
  );
}
function Xd() {
  for (var s = arguments.length, t = new Array(s), i = 0; i < s; i++)
    t[i] = arguments[i];
  return j.useMemo(
    () => [...t].filter((a) => a != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...t]
  );
}
const Mi = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function Bw(s, t) {
  return Math.sqrt(Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2));
}
function Uw(s, t) {
  let {
    data: {
      value: i
    }
  } = s, {
    data: {
      value: a
    }
  } = t;
  return i - a;
}
function Hw(s, t) {
  let {
    data: {
      value: i
    }
  } = s, {
    data: {
      value: a
    }
  } = t;
  return a - i;
}
function qw(s, t) {
  if (!s || s.length === 0)
    return null;
  const [i] = s;
  return i[t];
}
function wg(s, t, i) {
  return t === void 0 && (t = s.left), i === void 0 && (i = s.top), {
    x: t + s.width * 0.5,
    y: i + s.height * 0.5
  };
}
const Zd = (s) => {
  let {
    collisionRect: t,
    droppableRects: i,
    droppableContainers: a
  } = s;
  const r = wg(t, t.left, t.top), c = [];
  for (const u of a) {
    const {
      id: f
    } = u, m = i.get(f);
    if (m) {
      const v = Bw(wg(m), r);
      c.push({
        id: f,
        data: {
          droppableContainer: u,
          value: v
        }
      });
    }
  }
  return c.sort(Uw);
};
function $w(s, t) {
  const i = Math.max(t.top, s.top), a = Math.max(t.left, s.left), r = Math.min(t.left + t.width, s.left + s.width), c = Math.min(t.top + t.height, s.top + s.height), u = r - a, f = c - i;
  if (a < r && i < c) {
    const m = t.width * t.height, v = s.width * s.height, g = u * f, b = g / (m + v - g);
    return Number(b.toFixed(4));
  }
  return 0;
}
const Qw = (s) => {
  let {
    collisionRect: t,
    droppableRects: i,
    droppableContainers: a
  } = s;
  const r = [];
  for (const c of a) {
    const {
      id: u
    } = c, f = i.get(u);
    if (f) {
      const m = $w(f, t);
      m > 0 && r.push({
        id: u,
        data: {
          droppableContainer: c,
          value: m
        }
      });
    }
  }
  return r.sort(Hw);
};
function Vw(s, t, i) {
  return {
    ...s,
    scaleX: t && i ? t.width / i.width : 1,
    scaleY: t && i ? t.height / i.height : 1
  };
}
function gb(s, t) {
  return s && t ? {
    x: s.left - t.left,
    y: s.top - t.top
  } : Mi;
}
function Yw(s) {
  return function(i) {
    for (var a = arguments.length, r = new Array(a > 1 ? a - 1 : 0), c = 1; c < a; c++)
      r[c - 1] = arguments[c];
    return r.reduce((u, f) => ({
      ...u,
      top: u.top + s * f.y,
      bottom: u.bottom + s * f.y,
      left: u.left + s * f.x,
      right: u.right + s * f.x
    }), {
      ...i
    });
  };
}
const Gw = /* @__PURE__ */ Yw(1);
function Kw(s) {
  if (s.startsWith("matrix3d(")) {
    const t = s.slice(9, -1).split(/, /);
    return {
      x: +t[12],
      y: +t[13],
      scaleX: +t[0],
      scaleY: +t[5]
    };
  } else if (s.startsWith("matrix(")) {
    const t = s.slice(7, -1).split(/, /);
    return {
      x: +t[4],
      y: +t[5],
      scaleX: +t[0],
      scaleY: +t[3]
    };
  }
  return null;
}
function Xw(s, t, i) {
  const a = Kw(t);
  if (!a)
    return s;
  const {
    scaleX: r,
    scaleY: c,
    x: u,
    y: f
  } = a, m = s.left - u - (1 - r) * parseFloat(i), v = s.top - f - (1 - c) * parseFloat(i.slice(i.indexOf(" ") + 1)), g = r ? s.width / r : s.width, b = c ? s.height / c : s.height;
  return {
    width: g,
    height: b,
    top: v,
    right: m + g,
    bottom: v + b,
    left: m
  };
}
const Zw = {
  ignoreTransform: !1
};
function Ba(s, t) {
  t === void 0 && (t = Zw);
  let i = s.getBoundingClientRect();
  if (t.ignoreTransform) {
    const {
      transform: v,
      transformOrigin: g
    } = Ye(s).getComputedStyle(s);
    v && (i = Xw(i, v, g));
  }
  const {
    top: a,
    left: r,
    width: c,
    height: u,
    bottom: f,
    right: m
  } = i;
  return {
    top: a,
    left: r,
    width: c,
    height: u,
    bottom: f,
    right: m
  };
}
function _g(s) {
  return Ba(s, {
    ignoreTransform: !0
  });
}
function Ww(s) {
  const t = s.innerWidth, i = s.innerHeight;
  return {
    top: 0,
    left: 0,
    right: t,
    bottom: i,
    width: t,
    height: i
  };
}
function Iw(s, t) {
  return t === void 0 && (t = Ye(s).getComputedStyle(s)), t.position === "fixed";
}
function Fw(s, t) {
  t === void 0 && (t = Ye(s).getComputedStyle(s));
  const i = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((r) => {
    const c = t[r];
    return typeof c == "string" ? i.test(c) : !1;
  });
}
function Wd(s, t) {
  const i = [];
  function a(r) {
    if (t != null && i.length >= t || !r)
      return i;
    if (Vd(r) && r.scrollingElement != null && !i.includes(r.scrollingElement))
      return i.push(r.scrollingElement), i;
    if (!tr(r) || mb(r) || i.includes(r))
      return i;
    const c = Ye(s).getComputedStyle(r);
    return r !== s && Fw(r, c) && i.push(r), Iw(r, c) ? i : a(r.parentNode);
  }
  return s ? a(s) : i;
}
function bb(s) {
  const [t] = Wd(s, 1);
  return t ?? null;
}
function Qh(s) {
  return !oc || !s ? null : Ra(s) ? s : Qd(s) ? Vd(s) || s === La(s).scrollingElement ? window : tr(s) ? s : null : null;
}
function xb(s) {
  return Ra(s) ? s.scrollX : s.scrollLeft;
}
function yb(s) {
  return Ra(s) ? s.scrollY : s.scrollTop;
}
function Md(s) {
  return {
    x: xb(s),
    y: yb(s)
  };
}
var fe;
(function(s) {
  s[s.Forward = 1] = "Forward", s[s.Backward = -1] = "Backward";
})(fe || (fe = {}));
function wb(s) {
  return !oc || !s ? !1 : s === document.scrollingElement;
}
function _b(s) {
  const t = {
    x: 0,
    y: 0
  }, i = wb(s) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: s.clientHeight,
    width: s.clientWidth
  }, a = {
    x: s.scrollWidth - i.width,
    y: s.scrollHeight - i.height
  }, r = s.scrollTop <= t.y, c = s.scrollLeft <= t.x, u = s.scrollTop >= a.y, f = s.scrollLeft >= a.x;
  return {
    isTop: r,
    isLeft: c,
    isBottom: u,
    isRight: f,
    maxScroll: a,
    minScroll: t
  };
}
const Jw = {
  x: 0.2,
  y: 0.2
};
function Pw(s, t, i, a, r) {
  let {
    top: c,
    left: u,
    right: f,
    bottom: m
  } = i;
  a === void 0 && (a = 10), r === void 0 && (r = Jw);
  const {
    isTop: v,
    isBottom: g,
    isLeft: b,
    isRight: y
  } = _b(s), S = {
    x: 0,
    y: 0
  }, w = {
    x: 0,
    y: 0
  }, M = {
    height: t.height * r.y,
    width: t.width * r.x
  };
  return !v && c <= t.top + M.height ? (S.y = fe.Backward, w.y = a * Math.abs((t.top + M.height - c) / M.height)) : !g && m >= t.bottom - M.height && (S.y = fe.Forward, w.y = a * Math.abs((t.bottom - M.height - m) / M.height)), !y && f >= t.right - M.width ? (S.x = fe.Forward, w.x = a * Math.abs((t.right - M.width - f) / M.width)) : !b && u <= t.left + M.width && (S.x = fe.Backward, w.x = a * Math.abs((t.left + M.width - u) / M.width)), {
    direction: S,
    speed: w
  };
}
function t2(s) {
  if (s === document.scrollingElement) {
    const {
      innerWidth: c,
      innerHeight: u
    } = window;
    return {
      top: 0,
      left: 0,
      right: c,
      bottom: u,
      width: c,
      height: u
    };
  }
  const {
    top: t,
    left: i,
    right: a,
    bottom: r
  } = s.getBoundingClientRect();
  return {
    top: t,
    left: i,
    right: a,
    bottom: r,
    width: s.clientWidth,
    height: s.clientHeight
  };
}
function Sb(s) {
  return s.reduce((t, i) => Ca(t, Md(i)), Mi);
}
function e2(s) {
  return s.reduce((t, i) => t + xb(i), 0);
}
function i2(s) {
  return s.reduce((t, i) => t + yb(i), 0);
}
function n2(s, t) {
  if (t === void 0 && (t = Ba), !s)
    return;
  const {
    top: i,
    left: a,
    bottom: r,
    right: c
  } = t(s);
  bb(s) && (r <= 0 || c <= 0 || i >= window.innerHeight || a >= window.innerWidth) && s.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const s2 = [["x", ["left", "right"], e2], ["y", ["top", "bottom"], i2]];
class Id {
  constructor(t, i) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const a = Wd(i), r = Sb(a);
    this.rect = {
      ...t
    }, this.width = t.width, this.height = t.height;
    for (const [c, u, f] of s2)
      for (const m of u)
        Object.defineProperty(this, m, {
          get: () => {
            const v = f(a), g = r[c] - v;
            return this.rect[m] + g;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class Hl {
  constructor(t) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((i) => {
        var a;
        return (a = this.target) == null ? void 0 : a.removeEventListener(...i);
      });
    }, this.target = t;
  }
  add(t, i, a) {
    var r;
    (r = this.target) == null || r.addEventListener(t, i, a), this.listeners.push([t, i, a]);
  }
}
function a2(s) {
  const {
    EventTarget: t
  } = Ye(s);
  return s instanceof t ? s : La(s);
}
function Vh(s, t) {
  const i = Math.abs(s.x), a = Math.abs(s.y);
  return typeof t == "number" ? Math.sqrt(i ** 2 + a ** 2) > t : "x" in t && "y" in t ? i > t.x && a > t.y : "x" in t ? i > t.x : "y" in t ? a > t.y : !1;
}
var vi;
(function(s) {
  s.Click = "click", s.DragStart = "dragstart", s.Keydown = "keydown", s.ContextMenu = "contextmenu", s.Resize = "resize", s.SelectionChange = "selectionchange", s.VisibilityChange = "visibilitychange";
})(vi || (vi = {}));
function Sg(s) {
  s.preventDefault();
}
function l2(s) {
  s.stopPropagation();
}
var Lt;
(function(s) {
  s.Space = "Space", s.Down = "ArrowDown", s.Right = "ArrowRight", s.Left = "ArrowLeft", s.Up = "ArrowUp", s.Esc = "Escape", s.Enter = "Enter", s.Tab = "Tab";
})(Lt || (Lt = {}));
const Mb = {
  start: [Lt.Space, Lt.Enter],
  cancel: [Lt.Esc],
  end: [Lt.Space, Lt.Enter, Lt.Tab]
}, r2 = (s, t) => {
  let {
    currentCoordinates: i
  } = t;
  switch (s.code) {
    case Lt.Right:
      return {
        ...i,
        x: i.x + 25
      };
    case Lt.Left:
      return {
        ...i,
        x: i.x - 25
      };
    case Lt.Down:
      return {
        ...i,
        y: i.y + 25
      };
    case Lt.Up:
      return {
        ...i,
        y: i.y - 25
      };
  }
};
class Nb {
  constructor(t) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = t;
    const {
      event: {
        target: i
      }
    } = t;
    this.props = t, this.listeners = new Hl(La(i)), this.windowListeners = new Hl(Ye(i)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(vi.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: t,
      onStart: i
    } = this.props, a = t.node.current;
    a && n2(a), i(Mi);
  }
  handleKeyDown(t) {
    if (Gd(t)) {
      const {
        active: i,
        context: a,
        options: r
      } = this.props, {
        keyboardCodes: c = Mb,
        coordinateGetter: u = r2,
        scrollBehavior: f = "smooth"
      } = r, {
        code: m
      } = t;
      if (c.end.includes(m)) {
        this.handleEnd(t);
        return;
      }
      if (c.cancel.includes(m)) {
        this.handleCancel(t);
        return;
      }
      const {
        collisionRect: v
      } = a.current, g = v ? {
        x: v.left,
        y: v.top
      } : Mi;
      this.referenceCoordinates || (this.referenceCoordinates = g);
      const b = u(t, {
        active: i,
        context: a.current,
        currentCoordinates: g
      });
      if (b) {
        const y = Wo(b, g), S = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: w
        } = a.current;
        for (const M of w) {
          const N = t.code, {
            isTop: k,
            isRight: T,
            isLeft: D,
            isBottom: O,
            maxScroll: V,
            minScroll: G
          } = _b(M), R = t2(M), X = {
            x: Math.min(N === Lt.Right ? R.right - R.width / 2 : R.right, Math.max(N === Lt.Right ? R.left : R.left + R.width / 2, b.x)),
            y: Math.min(N === Lt.Down ? R.bottom - R.height / 2 : R.bottom, Math.max(N === Lt.Down ? R.top : R.top + R.height / 2, b.y))
          }, P = N === Lt.Right && !T || N === Lt.Left && !D, rt = N === Lt.Down && !O || N === Lt.Up && !k;
          if (P && X.x !== b.x) {
            const at = M.scrollLeft + y.x, F = N === Lt.Right && at <= V.x || N === Lt.Left && at >= G.x;
            if (F && !y.y) {
              M.scrollTo({
                left: at,
                behavior: f
              });
              return;
            }
            F ? S.x = M.scrollLeft - at : S.x = N === Lt.Right ? M.scrollLeft - V.x : M.scrollLeft - G.x, S.x && M.scrollBy({
              left: -S.x,
              behavior: f
            });
            break;
          } else if (rt && X.y !== b.y) {
            const at = M.scrollTop + y.y, F = N === Lt.Down && at <= V.y || N === Lt.Up && at >= G.y;
            if (F && !y.x) {
              M.scrollTo({
                top: at,
                behavior: f
              });
              return;
            }
            F ? S.y = M.scrollTop - at : S.y = N === Lt.Down ? M.scrollTop - V.y : M.scrollTop - G.y, S.y && M.scrollBy({
              top: -S.y,
              behavior: f
            });
            break;
          }
        }
        this.handleMove(t, Ca(Wo(b, this.referenceCoordinates), S));
      }
    }
  }
  handleMove(t, i) {
    const {
      onMove: a
    } = this.props;
    t.preventDefault(), a(i);
  }
  handleEnd(t) {
    const {
      onEnd: i
    } = this.props;
    t.preventDefault(), this.detach(), i();
  }
  handleCancel(t) {
    const {
      onCancel: i
    } = this.props;
    t.preventDefault(), this.detach(), i();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
Nb.activators = [{
  eventName: "onKeyDown",
  handler: (s, t, i) => {
    let {
      keyboardCodes: a = Mb,
      onActivation: r
    } = t, {
      active: c
    } = i;
    const {
      code: u
    } = s.nativeEvent;
    if (a.start.includes(u)) {
      const f = c.activatorNode.current;
      return f && s.target !== f ? !1 : (s.preventDefault(), r?.({
        event: s.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function Mg(s) {
  return !!(s && "distance" in s);
}
function Ng(s) {
  return !!(s && "delay" in s);
}
class Fd {
  constructor(t, i, a) {
    var r;
    a === void 0 && (a = a2(t.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = t, this.events = i;
    const {
      event: c
    } = t, {
      target: u
    } = c;
    this.props = t, this.events = i, this.document = La(u), this.documentListeners = new Hl(this.document), this.listeners = new Hl(a), this.windowListeners = new Hl(Ye(u)), this.initialCoordinates = (r = Sd(c)) != null ? r : Mi, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: t,
      props: {
        options: {
          activationConstraint: i,
          bypassActivationConstraint: a
        }
      }
    } = this;
    if (this.listeners.add(t.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(t.end.name, this.handleEnd), t.cancel && this.listeners.add(t.cancel.name, this.handleCancel), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.DragStart, Sg), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), this.windowListeners.add(vi.ContextMenu, Sg), this.documentListeners.add(vi.Keydown, this.handleKeydown), i) {
      if (a != null && a({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (Ng(i)) {
        this.timeoutId = setTimeout(this.handleStart, i.delay), this.handlePending(i);
        return;
      }
      if (Mg(i)) {
        this.handlePending(i);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(t, i) {
    const {
      active: a,
      onPending: r
    } = this.props;
    r(a, t, this.initialCoordinates, i);
  }
  handleStart() {
    const {
      initialCoordinates: t
    } = this, {
      onStart: i
    } = this.props;
    t && (this.activated = !0, this.documentListeners.add(vi.Click, l2, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(vi.SelectionChange, this.removeTextSelection), i(t));
  }
  handleMove(t) {
    var i;
    const {
      activated: a,
      initialCoordinates: r,
      props: c
    } = this, {
      onMove: u,
      options: {
        activationConstraint: f
      }
    } = c;
    if (!r)
      return;
    const m = (i = Sd(t)) != null ? i : Mi, v = Wo(r, m);
    if (!a && f) {
      if (Mg(f)) {
        if (f.tolerance != null && Vh(v, f.tolerance))
          return this.handleCancel();
        if (Vh(v, f.distance))
          return this.handleStart();
      }
      if (Ng(f) && Vh(v, f.tolerance))
        return this.handleCancel();
      this.handlePending(f, v);
      return;
    }
    t.cancelable && t.preventDefault(), u(m);
  }
  handleEnd() {
    const {
      onAbort: t,
      onEnd: i
    } = this.props;
    this.detach(), this.activated || t(this.props.active), i();
  }
  handleCancel() {
    const {
      onAbort: t,
      onCancel: i
    } = this.props;
    this.detach(), this.activated || t(this.props.active), i();
  }
  handleKeydown(t) {
    t.code === Lt.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var t;
    (t = this.document.getSelection()) == null || t.removeAllRanges();
  }
}
const o2 = {
  cancel: {
    name: "pointercancel"
  },
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
class nr extends Fd {
  constructor(t) {
    const {
      event: i
    } = t, a = La(i.target);
    super(t, o2, a);
  }
}
nr.activators = [{
  eventName: "onPointerDown",
  handler: (s, t) => {
    let {
      nativeEvent: i
    } = s, {
      onActivation: a
    } = t;
    return !i.isPrimary || i.button !== 0 ? !1 : (a?.({
      event: i
    }), !0);
  }
}];
const c2 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var Nd;
(function(s) {
  s[s.RightClick = 2] = "RightClick";
})(Nd || (Nd = {}));
class u2 extends Fd {
  constructor(t) {
    super(t, c2, La(t.event.target));
  }
}
u2.activators = [{
  eventName: "onMouseDown",
  handler: (s, t) => {
    let {
      nativeEvent: i
    } = s, {
      onActivation: a
    } = t;
    return i.button === Nd.RightClick ? !1 : (a?.({
      event: i
    }), !0);
  }
}];
const Yh = {
  cancel: {
    name: "touchcancel"
  },
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
class h2 extends Fd {
  constructor(t) {
    super(t, Yh);
  }
  static setup() {
    return window.addEventListener(Yh.move.name, t, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(Yh.move.name, t);
    };
    function t() {
    }
  }
}
h2.activators = [{
  eventName: "onTouchStart",
  handler: (s, t) => {
    let {
      nativeEvent: i
    } = s, {
      onActivation: a
    } = t;
    const {
      touches: r
    } = i;
    return r.length > 1 ? !1 : (a?.({
      event: i
    }), !0);
  }
}];
var ql;
(function(s) {
  s[s.Pointer = 0] = "Pointer", s[s.DraggableRect = 1] = "DraggableRect";
})(ql || (ql = {}));
var Fo;
(function(s) {
  s[s.TreeOrder = 0] = "TreeOrder", s[s.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Fo || (Fo = {}));
function d2(s) {
  let {
    acceleration: t,
    activator: i = ql.Pointer,
    canScroll: a,
    draggingRect: r,
    enabled: c,
    interval: u = 5,
    order: f = Fo.TreeOrder,
    pointerCoordinates: m,
    scrollableAncestors: v,
    scrollableAncestorRects: g,
    delta: b,
    threshold: y
  } = s;
  const S = m2({
    delta: b,
    disabled: !c
  }), [w, M] = Mw(), N = j.useRef({
    x: 0,
    y: 0
  }), k = j.useRef({
    x: 0,
    y: 0
  }), T = j.useMemo(() => {
    switch (i) {
      case ql.Pointer:
        return m ? {
          top: m.y,
          bottom: m.y,
          left: m.x,
          right: m.x
        } : null;
      case ql.DraggableRect:
        return r;
    }
  }, [i, r, m]), D = j.useRef(null), O = j.useCallback(() => {
    const G = D.current;
    if (!G)
      return;
    const R = N.current.x * k.current.x, X = N.current.y * k.current.y;
    G.scrollBy(R, X);
  }, []), V = j.useMemo(() => f === Fo.TreeOrder ? [...v].reverse() : v, [f, v]);
  j.useEffect(
    () => {
      if (!c || !v.length || !T) {
        M();
        return;
      }
      for (const G of V) {
        if (a?.(G) === !1)
          continue;
        const R = v.indexOf(G), X = g[R];
        if (!X)
          continue;
        const {
          direction: P,
          speed: rt
        } = Pw(G, X, T, t, y);
        for (const at of ["x", "y"])
          S[at][P[at]] || (rt[at] = 0, P[at] = 0);
        if (rt.x > 0 || rt.y > 0) {
          M(), D.current = G, w(O, u), N.current = rt, k.current = P;
          return;
        }
      }
      N.current = {
        x: 0,
        y: 0
      }, k.current = {
        x: 0,
        y: 0
      }, M();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      O,
      a,
      M,
      c,
      u,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(T),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(S),
      w,
      v,
      V,
      g,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(y)
    ]
  );
}
const f2 = {
  x: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  },
  y: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  }
};
function m2(s) {
  let {
    delta: t,
    disabled: i
  } = s;
  const a = _d(t);
  return er((r) => {
    if (i || !a || !r)
      return f2;
    const c = {
      x: Math.sign(t.x - a.x),
      y: Math.sign(t.y - a.y)
    };
    return {
      x: {
        [fe.Backward]: r.x[fe.Backward] || c.x === -1,
        [fe.Forward]: r.x[fe.Forward] || c.x === 1
      },
      y: {
        [fe.Backward]: r.y[fe.Backward] || c.y === -1,
        [fe.Forward]: r.y[fe.Forward] || c.y === 1
      }
    };
  }, [i, t, a]);
}
function p2(s, t) {
  const i = t != null ? s.get(t) : void 0, a = i ? i.node.current : null;
  return er((r) => {
    var c;
    return t == null ? null : (c = a ?? r) != null ? c : null;
  }, [a, t]);
}
function v2(s, t) {
  return j.useMemo(() => s.reduce((i, a) => {
    const {
      sensor: r
    } = a, c = r.activators.map((u) => ({
      eventName: u.eventName,
      handler: t(u.handler, a)
    }));
    return [...i, ...c];
  }, []), [s, t]);
}
var Zl;
(function(s) {
  s[s.Always = 0] = "Always", s[s.BeforeDragging = 1] = "BeforeDragging", s[s.WhileDragging = 2] = "WhileDragging";
})(Zl || (Zl = {}));
var jd;
(function(s) {
  s.Optimized = "optimized";
})(jd || (jd = {}));
const jg = /* @__PURE__ */ new Map();
function g2(s, t) {
  let {
    dragging: i,
    dependencies: a,
    config: r
  } = t;
  const [c, u] = j.useState(null), {
    frequency: f,
    measure: m,
    strategy: v
  } = r, g = j.useRef(s), b = N(), y = Kl(b), S = j.useCallback(function(k) {
    k === void 0 && (k = []), !y.current && u((T) => T === null ? k : T.concat(k.filter((D) => !T.includes(D))));
  }, [y]), w = j.useRef(null), M = er((k) => {
    if (b && !i)
      return jg;
    if (!k || k === jg || g.current !== s || c != null) {
      const T = /* @__PURE__ */ new Map();
      for (let D of s) {
        if (!D)
          continue;
        if (c && c.length > 0 && !c.includes(D.id) && D.rect.current) {
          T.set(D.id, D.rect.current);
          continue;
        }
        const O = D.node.current, V = O ? new Id(m(O), O) : null;
        D.rect.current = V, V && T.set(D.id, V);
      }
      return T;
    }
    return k;
  }, [s, c, i, b, m]);
  return j.useEffect(() => {
    g.current = s;
  }, [s]), j.useEffect(
    () => {
      b || S();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i, b]
  ), j.useEffect(
    () => {
      c && c.length > 0 && u(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(c)]
  ), j.useEffect(
    () => {
      b || typeof f != "number" || w.current !== null || (w.current = setTimeout(() => {
        S(), w.current = null;
      }, f));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, b, S, ...a]
  ), {
    droppableRects: M,
    measureDroppableContainers: S,
    measuringScheduled: c != null
  };
  function N() {
    switch (v) {
      case Zl.Always:
        return !1;
      case Zl.BeforeDragging:
        return i;
      default:
        return !i;
    }
  }
}
function jb(s, t) {
  return er((i) => s ? i || (typeof t == "function" ? t(s) : s) : null, [t, s]);
}
function b2(s, t) {
  return jb(s, t);
}
function x2(s) {
  let {
    callback: t,
    disabled: i
  } = s;
  const a = Yd(t), r = j.useMemo(() => {
    if (i || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: c
    } = window;
    return new c(a);
  }, [a, i]);
  return j.useEffect(() => () => r?.disconnect(), [r]), r;
}
function cc(s) {
  let {
    callback: t,
    disabled: i
  } = s;
  const a = Yd(t), r = j.useMemo(
    () => {
      if (i || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: c
      } = window;
      return new c(a);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i]
  );
  return j.useEffect(() => () => r?.disconnect(), [r]), r;
}
function y2(s) {
  return new Id(Ba(s), s);
}
function Cg(s, t, i) {
  t === void 0 && (t = y2);
  const [a, r] = j.useState(null);
  function c() {
    r((m) => {
      if (!s)
        return null;
      if (s.isConnected === !1) {
        var v;
        return (v = m ?? i) != null ? v : null;
      }
      const g = t(s);
      return JSON.stringify(m) === JSON.stringify(g) ? m : g;
    });
  }
  const u = x2({
    callback(m) {
      if (s)
        for (const v of m) {
          const {
            type: g,
            target: b
          } = v;
          if (g === "childList" && b instanceof HTMLElement && b.contains(s)) {
            c();
            break;
          }
        }
    }
  }), f = cc({
    callback: c
  });
  return $i(() => {
    c(), s ? (f?.observe(s), u?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (f?.disconnect(), u?.disconnect());
  }, [s]), a;
}
function w2(s) {
  const t = jb(s);
  return gb(s, t);
}
const kg = [];
function _2(s) {
  const t = j.useRef(s), i = er((a) => s ? a && a !== kg && s && t.current && s.parentNode === t.current.parentNode ? a : Wd(s) : kg, [s]);
  return j.useEffect(() => {
    t.current = s;
  }, [s]), i;
}
function S2(s) {
  const [t, i] = j.useState(null), a = j.useRef(s), r = j.useCallback((c) => {
    const u = Qh(c.target);
    u && i((f) => f ? (f.set(u, Md(u)), new Map(f)) : null);
  }, []);
  return j.useEffect(() => {
    const c = a.current;
    if (s !== c) {
      u(c);
      const f = s.map((m) => {
        const v = Qh(m);
        return v ? (v.addEventListener("scroll", r, {
          passive: !0
        }), [v, Md(v)]) : null;
      }).filter((m) => m != null);
      i(f.length ? new Map(f) : null), a.current = s;
    }
    return () => {
      u(s), u(c);
    };
    function u(f) {
      f.forEach((m) => {
        const v = Qh(m);
        v?.removeEventListener("scroll", r);
      });
    }
  }, [r, s]), j.useMemo(() => s.length ? t ? Array.from(t.values()).reduce((c, u) => Ca(c, u), Mi) : Sb(s) : Mi, [s, t]);
}
function Eg(s, t) {
  t === void 0 && (t = []);
  const i = j.useRef(null);
  return j.useEffect(
    () => {
      i.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), j.useEffect(() => {
    const a = s !== Mi;
    a && !i.current && (i.current = s), !a && i.current && (i.current = null);
  }, [s]), i.current ? Wo(s, i.current) : Mi;
}
function M2(s) {
  j.useEffect(
    () => {
      if (!oc)
        return;
      const t = s.map((i) => {
        let {
          sensor: a
        } = i;
        return a.setup == null ? void 0 : a.setup();
      });
      return () => {
        for (const i of t)
          i?.();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    s.map((t) => {
      let {
        sensor: i
      } = t;
      return i;
    })
  );
}
function N2(s, t) {
  return j.useMemo(() => s.reduce((i, a) => {
    let {
      eventName: r,
      handler: c
    } = a;
    return i[r] = (u) => {
      c(u, t);
    }, i;
  }, {}), [s, t]);
}
function Cb(s) {
  return j.useMemo(() => s ? Ww(s) : null, [s]);
}
const zg = [];
function j2(s, t) {
  t === void 0 && (t = Ba);
  const [i] = s, a = Cb(i ? Ye(i) : null), [r, c] = j.useState(zg);
  function u() {
    c(() => s.length ? s.map((m) => wb(m) ? a : new Id(t(m), m)) : zg);
  }
  const f = cc({
    callback: u
  });
  return $i(() => {
    f?.disconnect(), u(), s.forEach((m) => f?.observe(m));
  }, [s]), r;
}
function C2(s) {
  if (!s)
    return null;
  if (s.children.length > 1)
    return s;
  const t = s.children[0];
  return tr(t) ? t : s;
}
function k2(s) {
  let {
    measure: t
  } = s;
  const [i, a] = j.useState(null), r = j.useCallback((v) => {
    for (const {
      target: g
    } of v)
      if (tr(g)) {
        a((b) => {
          const y = t(g);
          return b ? {
            ...b,
            width: y.width,
            height: y.height
          } : y;
        });
        break;
      }
  }, [t]), c = cc({
    callback: r
  }), u = j.useCallback((v) => {
    const g = C2(v);
    c?.disconnect(), g && c?.observe(g), a(g ? t(g) : null);
  }, [t, c]), [f, m] = Zo(u);
  return j.useMemo(() => ({
    nodeRef: f,
    rect: i,
    setRef: m
  }), [i, f, m]);
}
const E2 = [{
  sensor: nr,
  options: {}
}, {
  sensor: Nb,
  options: {}
}], z2 = {
  current: {}
}, Qo = {
  draggable: {
    measure: _g
  },
  droppable: {
    measure: _g,
    strategy: Zl.WhileDragging,
    frequency: jd.Optimized
  },
  dragOverlay: {
    measure: Ba
  }
};
class $l extends Map {
  get(t) {
    var i;
    return t != null && (i = super.get(t)) != null ? i : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((t) => {
      let {
        disabled: i
      } = t;
      return !i;
    });
  }
  getNodeFor(t) {
    var i, a;
    return (i = (a = this.get(t)) == null ? void 0 : a.node.current) != null ? i : void 0;
  }
}
const T2 = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new $l(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Io
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Qo,
  measureDroppableContainers: Io,
  windowRect: null,
  measuringScheduled: !1
}, A2 = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Io,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Io
}, uc = /* @__PURE__ */ j.createContext(A2), kb = /* @__PURE__ */ j.createContext(T2);
function O2() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new $l()
    }
  };
}
function D2(s, t) {
  switch (t.type) {
    case oe.DragStart:
      return {
        ...s,
        draggable: {
          ...s.draggable,
          initialCoordinates: t.initialCoordinates,
          active: t.active
        }
      };
    case oe.DragMove:
      return s.draggable.active == null ? s : {
        ...s,
        draggable: {
          ...s.draggable,
          translate: {
            x: t.coordinates.x - s.draggable.initialCoordinates.x,
            y: t.coordinates.y - s.draggable.initialCoordinates.y
          }
        }
      };
    case oe.DragEnd:
    case oe.DragCancel:
      return {
        ...s,
        draggable: {
          ...s.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case oe.RegisterDroppable: {
      const {
        element: i
      } = t, {
        id: a
      } = i, r = new $l(s.droppable.containers);
      return r.set(a, i), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: r
        }
      };
    }
    case oe.SetDroppableDisabled: {
      const {
        id: i,
        key: a,
        disabled: r
      } = t, c = s.droppable.containers.get(i);
      if (!c || a !== c.key)
        return s;
      const u = new $l(s.droppable.containers);
      return u.set(i, {
        ...c,
        disabled: r
      }), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: u
        }
      };
    }
    case oe.UnregisterDroppable: {
      const {
        id: i,
        key: a
      } = t, r = s.droppable.containers.get(i);
      if (!r || a !== r.key)
        return s;
      const c = new $l(s.droppable.containers);
      return c.delete(i), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: c
        }
      };
    }
    default:
      return s;
  }
}
function R2(s) {
  let {
    disabled: t
  } = s;
  const {
    active: i,
    activatorEvent: a,
    draggableNodes: r
  } = j.useContext(uc), c = _d(a), u = _d(i?.id);
  return j.useEffect(() => {
    if (!t && !a && c && u != null) {
      if (!Gd(c) || document.activeElement === c.target)
        return;
      const f = r.get(u);
      if (!f)
        return;
      const {
        activatorNode: m,
        node: v
      } = f;
      if (!m.current && !v.current)
        return;
      requestAnimationFrame(() => {
        for (const g of [m.current, v.current]) {
          if (!g)
            continue;
          const b = Cw(g);
          if (b) {
            b.focus();
            break;
          }
        }
      });
    }
  }, [a, t, r, u, c]), null;
}
function L2(s, t) {
  let {
    transform: i,
    ...a
  } = t;
  return s != null && s.length ? s.reduce((r, c) => c({
    transform: r,
    ...a
  }), i) : i;
}
function B2(s) {
  return j.useMemo(
    () => ({
      draggable: {
        ...Qo.draggable,
        ...s?.draggable
      },
      droppable: {
        ...Qo.droppable,
        ...s?.droppable
      },
      dragOverlay: {
        ...Qo.dragOverlay,
        ...s?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s?.draggable, s?.droppable, s?.dragOverlay]
  );
}
function U2(s) {
  let {
    activeNode: t,
    measure: i,
    initialRect: a,
    config: r = !0
  } = s;
  const c = j.useRef(!1), {
    x: u,
    y: f
  } = typeof r == "boolean" ? {
    x: r,
    y: r
  } : r;
  $i(() => {
    if (!u && !f || !t) {
      c.current = !1;
      return;
    }
    if (c.current || !a)
      return;
    const v = t?.node.current;
    if (!v || v.isConnected === !1)
      return;
    const g = i(v), b = gb(g, a);
    if (u || (b.x = 0), f || (b.y = 0), c.current = !0, Math.abs(b.x) > 0 || Math.abs(b.y) > 0) {
      const y = bb(v);
      y && y.scrollBy({
        top: b.y,
        left: b.x
      });
    }
  }, [t, u, f, a, i]);
}
const Eb = /* @__PURE__ */ j.createContext({
  ...Mi,
  scaleX: 1,
  scaleY: 1
});
var Vn;
(function(s) {
  s[s.Uninitialized = 0] = "Uninitialized", s[s.Initializing = 1] = "Initializing", s[s.Initialized = 2] = "Initialized";
})(Vn || (Vn = {}));
const Jd = /* @__PURE__ */ j.memo(function(t) {
  var i, a, r, c;
  let {
    id: u,
    accessibility: f,
    autoScroll: m = !0,
    children: v,
    sensors: g = E2,
    collisionDetection: b = Qw,
    measuring: y,
    modifiers: S,
    ...w
  } = t;
  const M = j.useReducer(D2, void 0, O2), [N, k] = M, [T, D] = Ow(), [O, V] = j.useState(Vn.Uninitialized), G = O === Vn.Initialized, {
    draggable: {
      active: R,
      nodes: X,
      translate: P
    },
    droppable: {
      containers: rt
    }
  } = N, at = R != null ? X.get(R) : null, F = j.useRef({
    initial: null,
    translated: null
  }), gt = j.useMemo(() => {
    var It;
    return R != null ? {
      id: R,
      // It's possible for the active node to unmount while dragging
      data: (It = at?.data) != null ? It : z2,
      rect: F
    } : null;
  }, [R, at]), xt = j.useRef(null), [Ot, L] = j.useState(null), [Z, it] = j.useState(null), dt = Kl(w, Object.values(w)), mt = ir("DndDescribedBy", u), E = j.useMemo(() => rt.getEnabled(), [rt]), $ = B2(y), {
    droppableRects: I,
    measureDroppableContainers: et,
    measuringScheduled: ft
  } = g2(E, {
    dragging: G,
    dependencies: [P.x, P.y],
    config: $.droppable
  }), ht = p2(X, R), Ct = j.useMemo(() => Z ? Sd(Z) : null, [Z]), Kt = Ls(), Dt = b2(ht, $.draggable.measure);
  U2({
    activeNode: R != null ? X.get(R) : null,
    config: Kt.layoutShiftCompensation,
    initialRect: Dt,
    measure: $.draggable.measure
  });
  const Et = Cg(ht, $.draggable.measure, Dt), Ci = Cg(ht ? ht.parentElement : null), ze = j.useRef({
    activatorEvent: null,
    active: null,
    activeNode: ht,
    collisionRect: null,
    collisions: null,
    droppableRects: I,
    draggableNodes: X,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: rt,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), Yi = rt.getNodeFor((i = ze.current.over) == null ? void 0 : i.id), me = k2({
    measure: $.dragOverlay.measure
  }), ki = (a = me.nodeRef.current) != null ? a : ht, Ei = G ? (r = me.rect) != null ? r : Et : null, ur = !!(me.nodeRef.current && me.rect), qa = w2(ur ? null : Et), es = Cb(ki ? Ye(ki) : null), ti = _2(G ? Yi ?? ht : null), gn = j2(ti), Ds = L2(S, {
    transform: {
      x: P.x - qa.x,
      y: P.y - qa.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: Z,
    active: gt,
    activeNodeRect: Et,
    containerNodeRect: Ci,
    draggingNodeRect: Ei,
    over: ze.current.over,
    overlayNodeRect: me.rect,
    scrollableAncestors: ti,
    scrollableAncestorRects: gn,
    windowRect: es
  }), hr = Ct ? Ca(Ct, P) : null, _e = S2(ti), Sc = Eg(_e), dr = Eg(_e, [Et]), Gi = Ca(Ds, Sc), gi = Ei ? Gw(Ei, Ds) : null, is = gt && gi ? b({
    active: gt,
    collisionRect: gi,
    droppableRects: I,
    droppableContainers: E,
    pointerCoordinates: hr
  }) : null, $a = qw(is, "id"), [zi, fr] = j.useState(null), ns = ur ? Ds : Ca(Ds, dr), je = Vw(ns, (c = zi?.rect) != null ? c : null, Et), ei = j.useRef(null), Se = j.useCallback(
    (It, Ft) => {
      let {
        sensor: ce,
        options: Te
      } = Ft;
      if (xt.current == null)
        return;
      const Ae = X.get(xt.current);
      if (!Ae)
        return;
      const Me = It.nativeEvent, Oe = new ce({
        active: xt.current,
        activeNode: Ae,
        event: Me,
        options: Te,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: ze,
        onAbort(le) {
          if (!X.get(le))
            return;
          const {
            onDragAbort: Ge
          } = dt.current, ni = {
            id: le
          };
          Ge?.(ni), T({
            type: "onDragAbort",
            event: ni
          });
        },
        onPending(le, bi, Ge, ni) {
          if (!X.get(le))
            return;
          const {
            onDragPending: Xi
          } = dt.current, xi = {
            id: le,
            constraint: bi,
            initialCoordinates: Ge,
            offset: ni
          };
          Xi?.(xi), T({
            type: "onDragPending",
            event: xi
          });
        },
        onStart(le) {
          const bi = xt.current;
          if (bi == null)
            return;
          const Ge = X.get(bi);
          if (!Ge)
            return;
          const {
            onDragStart: ni
          } = dt.current, Ki = {
            activatorEvent: Me,
            active: {
              id: bi,
              data: Ge.data,
              rect: F
            }
          };
          Gn.unstable_batchedUpdates(() => {
            ni?.(Ki), V(Vn.Initializing), k({
              type: oe.DragStart,
              initialCoordinates: le,
              active: bi
            }), T({
              type: "onDragStart",
              event: Ki
            }), L(ei.current), it(Me);
          });
        },
        onMove(le) {
          k({
            type: oe.DragMove,
            coordinates: le
          });
        },
        onEnd: ii(oe.DragEnd),
        onCancel: ii(oe.DragCancel)
      });
      ei.current = Oe;
      function ii(le) {
        return async function() {
          const {
            active: Ge,
            collisions: ni,
            over: Ki,
            scrollAdjustedTranslate: Xi
          } = ze.current;
          let xi = null;
          if (Ge && Xi) {
            const {
              cancelDrop: bn
            } = dt.current;
            xi = {
              activatorEvent: Me,
              active: Ge,
              collisions: ni,
              delta: Xi,
              over: Ki
            }, le === oe.DragEnd && typeof bn == "function" && await Promise.resolve(bn(xi)) && (le = oe.DragCancel);
          }
          xt.current = null, Gn.unstable_batchedUpdates(() => {
            k({
              type: le
            }), V(Vn.Uninitialized), fr(null), L(null), it(null), ei.current = null;
            const bn = le === oe.DragEnd ? "onDragEnd" : "onDragCancel";
            if (xi) {
              const si = dt.current[bn];
              si?.(xi), T({
                type: bn,
                event: xi
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [X]
  ), Mc = j.useCallback((It, Ft) => (ce, Te) => {
    const Ae = ce.nativeEvent, Me = X.get(Te);
    if (
      // Another sensor is already instantiating
      xt.current !== null || // No active draggable
      !Me || // Event has already been captured
      Ae.dndKit || Ae.defaultPrevented
    )
      return;
    const Oe = {
      active: Me
    };
    It(ce, Ft.options, Oe) === !0 && (Ae.dndKit = {
      capturedBy: Ft.sensor
    }, xt.current = Te, Se(ce, Ft));
  }, [X, Se]), mr = v2(g, Mc);
  M2(g), $i(() => {
    Et && O === Vn.Initializing && V(Vn.Initialized);
  }, [Et, O]), j.useEffect(
    () => {
      const {
        onDragMove: It
      } = dt.current, {
        active: Ft,
        activatorEvent: ce,
        collisions: Te,
        over: Ae
      } = ze.current;
      if (!Ft || !ce)
        return;
      const Me = {
        active: Ft,
        activatorEvent: ce,
        collisions: Te,
        delta: {
          x: Gi.x,
          y: Gi.y
        },
        over: Ae
      };
      Gn.unstable_batchedUpdates(() => {
        It?.(Me), T({
          type: "onDragMove",
          event: Me
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Gi.x, Gi.y]
  ), j.useEffect(
    () => {
      const {
        active: It,
        activatorEvent: Ft,
        collisions: ce,
        droppableContainers: Te,
        scrollAdjustedTranslate: Ae
      } = ze.current;
      if (!It || xt.current == null || !Ft || !Ae)
        return;
      const {
        onDragOver: Me
      } = dt.current, Oe = Te.get($a), ii = Oe && Oe.rect.current ? {
        id: Oe.id,
        rect: Oe.rect.current,
        data: Oe.data,
        disabled: Oe.disabled
      } : null, le = {
        active: It,
        activatorEvent: Ft,
        collisions: ce,
        delta: {
          x: Ae.x,
          y: Ae.y
        },
        over: ii
      };
      Gn.unstable_batchedUpdates(() => {
        fr(ii), Me?.(le), T({
          type: "onDragOver",
          event: le
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [$a]
  ), $i(() => {
    ze.current = {
      activatorEvent: Z,
      active: gt,
      activeNode: ht,
      collisionRect: gi,
      collisions: is,
      droppableRects: I,
      draggableNodes: X,
      draggingNode: ki,
      draggingNodeRect: Ei,
      droppableContainers: rt,
      over: zi,
      scrollableAncestors: ti,
      scrollAdjustedTranslate: Gi
    }, F.current = {
      initial: Ei,
      translated: gi
    };
  }, [gt, ht, is, gi, X, ki, Ei, I, rt, zi, ti, Gi]), d2({
    ...Kt,
    delta: P,
    draggingRect: gi,
    pointerCoordinates: hr,
    scrollableAncestors: ti,
    scrollableAncestorRects: gn
  });
  const Nc = j.useMemo(() => ({
    active: gt,
    activeNode: ht,
    activeNodeRect: Et,
    activatorEvent: Z,
    collisions: is,
    containerNodeRect: Ci,
    dragOverlay: me,
    draggableNodes: X,
    droppableContainers: rt,
    droppableRects: I,
    over: zi,
    measureDroppableContainers: et,
    scrollableAncestors: ti,
    scrollableAncestorRects: gn,
    measuringConfiguration: $,
    measuringScheduled: ft,
    windowRect: es
  }), [gt, ht, Et, Z, is, Ci, me, X, rt, I, zi, et, ti, gn, $, ft, es]), Rs = j.useMemo(() => ({
    activatorEvent: Z,
    activators: mr,
    active: gt,
    activeNodeRect: Et,
    ariaDescribedById: {
      draggable: mt
    },
    dispatch: k,
    draggableNodes: X,
    over: zi,
    measureDroppableContainers: et
  }), [Z, mr, gt, Et, k, mt, X, zi, et]);
  return $e.createElement(vb.Provider, {
    value: D
  }, $e.createElement(uc.Provider, {
    value: Rs
  }, $e.createElement(kb.Provider, {
    value: Nc
  }, $e.createElement(Eb.Provider, {
    value: je
  }, v)), $e.createElement(R2, {
    disabled: f?.restoreFocus === !1
  })), $e.createElement(Lw, {
    ...f,
    hiddenTextDescribedById: mt
  }));
  function Ls() {
    const It = Ot?.autoScrollEnabled === !1, Ft = typeof m == "object" ? m.enabled === !1 : m === !1, ce = G && !It && !Ft;
    return typeof m == "object" ? {
      ...m,
      enabled: ce
    } : {
      enabled: ce
    };
  }
}), H2 = /* @__PURE__ */ j.createContext(null), Tg = "button", q2 = "Draggable";
function $2(s) {
  let {
    id: t,
    data: i,
    disabled: a = !1,
    attributes: r
  } = s;
  const c = ir(q2), {
    activators: u,
    activatorEvent: f,
    active: m,
    activeNodeRect: v,
    ariaDescribedById: g,
    draggableNodes: b,
    over: y
  } = j.useContext(uc), {
    role: S = Tg,
    roleDescription: w = "draggable",
    tabIndex: M = 0
  } = r ?? {}, N = m?.id === t, k = j.useContext(N ? Eb : H2), [T, D] = Zo(), [O, V] = Zo(), G = N2(u, t), R = Kl(i);
  $i(
    () => (b.set(t, {
      id: t,
      key: c,
      node: T,
      activatorNode: O,
      data: R
    }), () => {
      const P = b.get(t);
      P && P.key === c && b.delete(t);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [b, t]
  );
  const X = j.useMemo(() => ({
    role: S,
    tabIndex: M,
    "aria-disabled": a,
    "aria-pressed": N && S === Tg ? !0 : void 0,
    "aria-roledescription": w,
    "aria-describedby": g.draggable
  }), [a, S, M, N, w, g.draggable]);
  return {
    active: m,
    activatorEvent: f,
    activeNodeRect: v,
    attributes: X,
    isDragging: N,
    listeners: a ? void 0 : G,
    node: T,
    over: y,
    setNodeRef: D,
    setActivatorNodeRef: V,
    transform: k
  };
}
function Q2() {
  return j.useContext(kb);
}
const V2 = "Droppable", Y2 = {
  timeout: 25
};
function G2(s) {
  let {
    data: t,
    disabled: i = !1,
    id: a,
    resizeObserverConfig: r
  } = s;
  const c = ir(V2), {
    active: u,
    dispatch: f,
    over: m,
    measureDroppableContainers: v
  } = j.useContext(uc), g = j.useRef({
    disabled: i
  }), b = j.useRef(!1), y = j.useRef(null), S = j.useRef(null), {
    disabled: w,
    updateMeasurementsFor: M,
    timeout: N
  } = {
    ...Y2,
    ...r
  }, k = Kl(M ?? a), T = j.useCallback(
    () => {
      if (!b.current) {
        b.current = !0;
        return;
      }
      S.current != null && clearTimeout(S.current), S.current = setTimeout(() => {
        v(Array.isArray(k.current) ? k.current : [k.current]), S.current = null;
      }, N);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [N]
  ), D = cc({
    callback: T,
    disabled: w || !u
  }), O = j.useCallback((X, P) => {
    D && (P && (D.unobserve(P), b.current = !1), X && D.observe(X));
  }, [D]), [V, G] = Zo(O), R = Kl(t);
  return j.useEffect(() => {
    !D || !V.current || (D.disconnect(), b.current = !1, D.observe(V.current));
  }, [V, D]), j.useEffect(
    () => (f({
      type: oe.RegisterDroppable,
      element: {
        id: a,
        key: c,
        disabled: i,
        node: V,
        rect: y,
        data: R
      }
    }), () => f({
      type: oe.UnregisterDroppable,
      key: c,
      id: a
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [a]
  ), j.useEffect(() => {
    i !== g.current.disabled && (f({
      type: oe.SetDroppableDisabled,
      id: a,
      key: c,
      disabled: i
    }), g.current.disabled = i);
  }, [a, c, i, f]), {
    active: u,
    rect: y,
    isOver: m?.id === a,
    node: V,
    over: m,
    setNodeRef: G
  };
}
function Pd(s, t, i) {
  const a = s.slice();
  return a.splice(i < 0 ? a.length + i : i, 0, a.splice(t, 1)[0]), a;
}
function K2(s, t) {
  return s.reduce((i, a, r) => {
    const c = t.get(a);
    return c && (i[r] = c), i;
  }, Array(s.length));
}
function ko(s) {
  return s !== null && s >= 0;
}
function X2(s, t) {
  if (s === t)
    return !0;
  if (s.length !== t.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (s[i] !== t[i])
      return !1;
  return !0;
}
function Z2(s) {
  return typeof s == "boolean" ? {
    draggable: s,
    droppable: s
  } : s;
}
const sr = (s) => {
  let {
    rects: t,
    activeIndex: i,
    overIndex: a,
    index: r
  } = s;
  const c = Pd(t, a, i), u = t[r], f = c[r];
  return !f || !u ? null : {
    x: f.left - u.left,
    y: f.top - u.top,
    scaleX: f.width / u.width,
    scaleY: f.height / u.height
  };
}, zb = "Sortable", Tb = /* @__PURE__ */ $e.createContext({
  activeIndex: -1,
  containerId: zb,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: sr,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function tf(s) {
  let {
    children: t,
    id: i,
    items: a,
    strategy: r = sr,
    disabled: c = !1
  } = s;
  const {
    active: u,
    dragOverlay: f,
    droppableRects: m,
    over: v,
    measureDroppableContainers: g
  } = Q2(), b = ir(zb, i), y = f.rect !== null, S = j.useMemo(() => a.map((G) => typeof G == "object" && "id" in G ? G.id : G), [a]), w = u != null, M = u ? S.indexOf(u.id) : -1, N = v ? S.indexOf(v.id) : -1, k = j.useRef(S), T = !X2(S, k.current), D = N !== -1 && M === -1 || T, O = Z2(c);
  $i(() => {
    T && w && g(S);
  }, [T, S, w, g]), j.useEffect(() => {
    k.current = S;
  }, [S]);
  const V = j.useMemo(
    () => ({
      activeIndex: M,
      containerId: b,
      disabled: O,
      disableTransforms: D,
      items: S,
      overIndex: N,
      useDragOverlay: y,
      sortedRects: K2(S, m),
      strategy: r
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [M, b, O.draggable, O.droppable, D, S, N, m, y, r]
  );
  return $e.createElement(Tb.Provider, {
    value: V
  }, t);
}
const W2 = (s) => {
  let {
    id: t,
    items: i,
    activeIndex: a,
    overIndex: r
  } = s;
  return Pd(i, a, r).indexOf(t);
}, I2 = (s) => {
  let {
    containerId: t,
    isSorting: i,
    wasDragging: a,
    index: r,
    items: c,
    newIndex: u,
    previousItems: f,
    previousContainerId: m,
    transition: v
  } = s;
  return !v || !a || f !== c && r === u ? !1 : i ? !0 : u !== r && t === m;
}, F2 = {
  duration: 200,
  easing: "ease"
}, Ab = "transform", J2 = /* @__PURE__ */ Xl.Transition.toString({
  property: Ab,
  duration: 0,
  easing: "linear"
}), P2 = {
  roleDescription: "sortable"
};
function t_(s) {
  let {
    disabled: t,
    index: i,
    node: a,
    rect: r
  } = s;
  const [c, u] = j.useState(null), f = j.useRef(i);
  return $i(() => {
    if (!t && i !== f.current && a.current) {
      const m = r.current;
      if (m) {
        const v = Ba(a.current, {
          ignoreTransform: !0
        }), g = {
          x: m.left - v.left,
          y: m.top - v.top,
          scaleX: m.width / v.width,
          scaleY: m.height / v.height
        };
        (g.x || g.y) && u(g);
      }
    }
    i !== f.current && (f.current = i);
  }, [t, i, a, r]), j.useEffect(() => {
    c && u(null);
  }, [c]), c;
}
function e_(s) {
  let {
    animateLayoutChanges: t = I2,
    attributes: i,
    disabled: a,
    data: r,
    getNewIndex: c = W2,
    id: u,
    strategy: f,
    resizeObserverConfig: m,
    transition: v = F2
  } = s;
  const {
    items: g,
    containerId: b,
    activeIndex: y,
    disabled: S,
    disableTransforms: w,
    sortedRects: M,
    overIndex: N,
    useDragOverlay: k,
    strategy: T
  } = j.useContext(Tb), D = i_(a, S), O = g.indexOf(u), V = j.useMemo(() => ({
    sortable: {
      containerId: b,
      index: O,
      items: g
    },
    ...r
  }), [b, r, O, g]), G = j.useMemo(() => g.slice(g.indexOf(u)), [g, u]), {
    rect: R,
    node: X,
    isOver: P,
    setNodeRef: rt
  } = G2({
    id: u,
    data: V,
    disabled: D.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: G,
      ...m
    }
  }), {
    active: at,
    activatorEvent: F,
    activeNodeRect: gt,
    attributes: xt,
    setNodeRef: Ot,
    listeners: L,
    isDragging: Z,
    over: it,
    setActivatorNodeRef: dt,
    transform: mt
  } = $2({
    id: u,
    data: V,
    attributes: {
      ...P2,
      ...i
    },
    disabled: D.draggable
  }), E = Sw(rt, Ot), $ = !!at, I = $ && !w && ko(y) && ko(N), et = !k && Z, ft = et && I ? mt : null, Ct = I ? ft ?? (f ?? T)({
    rects: M,
    activeNodeRect: gt,
    activeIndex: y,
    overIndex: N,
    index: O
  }) : null, Kt = ko(y) && ko(N) ? c({
    id: u,
    items: g,
    activeIndex: y,
    overIndex: N
  }) : O, Dt = at?.id, Et = j.useRef({
    activeId: Dt,
    items: g,
    newIndex: Kt,
    containerId: b
  }), Ci = g !== Et.current.items, ze = t({
    active: at,
    containerId: b,
    isDragging: Z,
    isSorting: $,
    id: u,
    index: O,
    items: g,
    newIndex: Et.current.newIndex,
    previousItems: Et.current.items,
    previousContainerId: Et.current.containerId,
    transition: v,
    wasDragging: Et.current.activeId != null
  }), Yi = t_({
    disabled: !ze,
    index: O,
    node: X,
    rect: R
  });
  return j.useEffect(() => {
    $ && Et.current.newIndex !== Kt && (Et.current.newIndex = Kt), b !== Et.current.containerId && (Et.current.containerId = b), g !== Et.current.items && (Et.current.items = g);
  }, [$, Kt, b, g]), j.useEffect(() => {
    if (Dt === Et.current.activeId)
      return;
    if (Dt != null && Et.current.activeId == null) {
      Et.current.activeId = Dt;
      return;
    }
    const ki = setTimeout(() => {
      Et.current.activeId = Dt;
    }, 50);
    return () => clearTimeout(ki);
  }, [Dt]), {
    active: at,
    activeIndex: y,
    attributes: xt,
    data: V,
    rect: R,
    index: O,
    newIndex: Kt,
    items: g,
    isOver: P,
    isSorting: $,
    isDragging: Z,
    listeners: L,
    node: X,
    overIndex: N,
    over: it,
    setNodeRef: E,
    setActivatorNodeRef: dt,
    setDroppableNodeRef: rt,
    setDraggableNodeRef: Ot,
    transform: Yi ?? Ct,
    transition: me()
  };
  function me() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      Yi || // Or to prevent items jumping to back to their "new" position when items change
      Ci && Et.current.newIndex === O
    )
      return J2;
    if (!(et && !Gd(F) || !v) && ($ || ze))
      return Xl.Transition.toString({
        ...v,
        property: Ab
      });
  }
}
function i_(s, t) {
  var i, a;
  return typeof s == "boolean" ? {
    draggable: s,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (i = s?.draggable) != null ? i : t.draggable,
    droppable: (a = s?.droppable) != null ? a : t.droppable
  };
}
Lt.Down, Lt.Right, Lt.Up, Lt.Left;
const Ob = j.createContext(null);
function n_({ source: s, children: t }) {
  return /* @__PURE__ */ h.jsx(Ob.Provider, { value: s, children: t });
}
function ji() {
  const s = j.useContext(Ob);
  if (!s) throw new Error("useHassSource must be used inside <HassProvider>");
  return s;
}
function Ee(s) {
  const t = ji();
  return j.useSyncExternalStore(t.subscribe, () => t.getStates()[s]);
}
function ef() {
  const s = ji();
  return j.useSyncExternalStore(s.subscribe, s.getStates);
}
function Qe(s) {
  const t = ji();
  return j.useSyncExternalStore(t.subscribe, () => s(t.getStates()));
}
function jt() {
  return ji().callService;
}
function s_() {
  const t = ji().connection, i = (r) => t ? (t.addEventListener("ready", r), t.addEventListener("disconnected", r), t.addEventListener("reconnect-error", r), () => {
    t.removeEventListener("ready", r), t.removeEventListener("disconnected", r), t.removeEventListener("reconnect-error", r);
  }) : () => {
  }, a = () => !t || t.connected ? "live" : "reconnecting";
  return j.useSyncExternalStore(i, a);
}
function st(s) {
  return s.split(".")[0];
}
function J(s) {
  return s.attributes.friendly_name || s.entity_id;
}
function ot(s) {
  return s.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function vn(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toString() : s.toFixed(1).replace(/\.0$/, "");
}
function qi(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function hc(s, t = Date.now()) {
  if (!s) return "";
  const i = Date.parse(s);
  if (Number.isNaN(i)) return "";
  const a = Math.max(0, Math.round((t - i) / 1e3));
  if (a < 45) return "just now";
  const r = Math.round(a / 60);
  if (r < 60) return `${r}m ago`;
  const c = Math.round(r / 60);
  if (c < 24) return `${c}h ago`;
  const u = Math.round(c / 24);
  if (u < 7) return `${u}d ago`;
  const f = Math.round(u / 7);
  if (f < 5) return `${f}w ago`;
  const m = Math.round(u / 30);
  return m < 12 ? `${m}mo ago` : `${Math.round(u / 365)}y ago`;
}
function vt(s, t) {
  const i = s.attributes.supported_features;
  return i != null && (i & t) === t;
}
function Hi() {
  return crypto.randomUUID();
}
const a_ = [
  ["living", "Living Room"],
  ["kitchen", "Kitchen"],
  ["bedroom", "Bedroom"],
  ["bed_", "Bedroom"],
  ["office", "Office"],
  ["bath", "Bathroom"],
  ["hall", "Hallway"],
  ["garage", "Garage"],
  ["outside", "Outdoor"],
  ["outdoor", "Outdoor"],
  ["garden", "Garden"],
  ["backyard", "Outdoor"]
];
function Db(s) {
  return `heuristic:${s.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
}
function Rb(s) {
  const t = `${s.entity_id} ${J(s)}`.toLowerCase();
  for (const [i, a] of a_) if (t.includes(i)) return a;
  return "Home";
}
function l_(s) {
  const t = {};
  for (const i of Object.values(s)) {
    const a = Rb(i);
    t[i.entity_id] = { areaId: Db(a), areaName: a, floorId: null, floorName: null };
  }
  return t;
}
const Ag = /* @__PURE__ */ new WeakMap(), Og = /* @__PURE__ */ new WeakMap(), Dg = /* @__PURE__ */ new WeakMap();
function Lb(s) {
  let t = Ag.get(s);
  return t || (t = r_(s), Ag.set(s, t)), t;
}
async function r_(s) {
  const { connection: t } = s;
  if (!t) return null;
  try {
    const [i, a, r, c] = await Promise.all([
      t.sendMessagePromise({ type: "config/area_registry/list" }),
      t.sendMessagePromise({ type: "config/device_registry/list" }),
      t.sendMessagePromise({ type: "config/entity_registry/list" }),
      // Floors are newer; tolerate a server that doesn't know the command.
      t.sendMessagePromise({ type: "config/floor_registry/list" }).catch(() => [])
    ]);
    return { areas: i, devices: a, entities: r, floors: c };
  } catch {
    return null;
  }
}
function Bb(s) {
  let t = Og.get(s);
  return t || (t = o_(s), Og.set(s, t)), t;
}
async function o_(s) {
  const t = await Lb(s);
  if (!t) return l_(s.getStates());
  const { areas: i, devices: a, entities: r, floors: c } = t, u = /* @__PURE__ */ new Map();
  for (const w of c) u.set(w.floor_id, w.name || w.floor_id);
  const f = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
  for (const w of i)
    f.set(w.area_id, w.name || w.area_id), m.set(w.area_id, w.floor_id ?? null);
  const v = /* @__PURE__ */ new Map();
  for (const w of a) w.area_id && v.set(w.id, w.area_id);
  const g = (w) => {
    const M = m.get(w) ?? null;
    return { floorId: M, floorName: M ? u.get(M) ?? null : null };
  }, b = {}, y = /* @__PURE__ */ new Set();
  for (const w of r) {
    y.add(w.entity_id);
    const M = w.area_id ?? (w.device_id ? v.get(w.device_id) ?? null : null);
    M && (b[w.entity_id] = { areaId: M, areaName: f.get(M) ?? M, ...g(M) });
  }
  const S = s.getStates();
  for (const w of Object.values(S)) {
    if (b[w.entity_id] || y.has(w.entity_id)) continue;
    const M = Rb(w);
    b[w.entity_id] = { areaId: Db(M), areaName: M, floorId: null, floorName: null };
  }
  return b;
}
function dc() {
  const s = ji(), [t, i] = j.useState(void 0);
  return j.useEffect(() => {
    let a = !0;
    return Bb(s).then((r) => {
      a && i(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
function Ub(s) {
  let t = Dg.get(s);
  return t || (t = c_(s), Dg.set(s, t)), t;
}
async function c_(s) {
  const t = await Lb(s);
  if (!t) return {};
  const i = {};
  for (const a of t.entities)
    i[a.entity_id] = {
      entityCategory: a.entity_category ?? null,
      hidden: a.hidden_by != null,
      disabled: a.disabled_by != null
    };
  return i;
}
function u_() {
  const s = ji(), [t, i] = j.useState(void 0);
  return j.useEffect(() => {
    let a = !0;
    return Ub(s).then((r) => {
      a && i(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
const h_ = [
  /^browser_mod_/i,
  // browser_mod_* helper entities
  /\.browser_mod_/i,
  // domain.browser_mod_*
  /_signal_strength$/i,
  // RSSI / link telemetry
  /_link_?quality$/i,
  // Zigbee/Z-Wave LQI
  /^update\./i
  // update.* (firmware/HACS update entities)
], d_ = /\b(restart|reboot|identify|update|firmware|re-?index)\b/i, f_ = /* @__PURE__ */ new Set(["restart", "identify", "update"]);
function fc(s, t, i) {
  if (i && (i.entityCategory === "diagnostic" || i.entityCategory === "config" || i.hidden || i.disabled))
    return !1;
  for (const r of h_) if (r.test(s)) return !1;
  const a = st(s);
  if (a === "button" || a === "switch") {
    const r = t?.attributes.device_class ?? void 0;
    if (r && f_.has(r)) return !1;
    const c = `${s} ${t ? J(t) : ""}`;
    if (d_.test(c)) return !1;
  }
  return !0;
}
function ar(s, t, i) {
  return fc(s, t, i?.[s]);
}
const m_ = [
  ["living", "Living Room"],
  ["kitchen", "Kitchen"],
  ["bedroom", "Bedroom"],
  ["bed_", "Bedroom"],
  ["office", "Office"],
  ["bath", "Bathroom"],
  ["hall", "Hallway"],
  ["garage", "Garage"],
  ["outside", "Outdoor"],
  ["outdoor", "Outdoor"],
  ["garden", "Garden"],
  ["backyard", "Outdoor"]
], p_ = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor", "binary_sensor", "humidifier", "siren"]), Rg = ["Living Room", "Kitchen", "Bedroom", "Office", "Bathroom", "Hallway", "Garage", "Outdoor", "Garden", "Home"];
function v_(s, t) {
  const i = t?.[s.entity_id];
  if (i) return i.areaName;
  const a = `${s.entity_id} ${J(s)}`.toLowerCase();
  for (const [r, c] of m_) if (a.includes(r)) return c;
  return "Home";
}
function g_(s, t) {
  const i = t?.[s.entity_id];
  return i && !i.areaId.startsWith("heuristic:") ? i.areaId : null;
}
function b_(s) {
  const t = st(s);
  return t === "media_player" || t === "sensor" ? 2 : 1;
}
function x_(s, t, i) {
  const a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const u of Object.values(s)) {
    const f = st(u.entity_id);
    if (!p_.has(f) || f === "sensor" && !u.attributes.unit_of_measurement || !fc(u.entity_id, u, i?.[u.entity_id])) continue;
    const m = v_(u, t);
    let v = a.get(m);
    v || (v = [], a.set(m, v)), v.push(u), r.has(m) || r.set(m, g_(u, t));
  }
  const c = [];
  for (const [u, f] of a) {
    const m = (T) => f.filter((D) => st(D.entity_id) === T).sort((D, O) => J(D).localeCompare(J(O))), v = m("light"), g = m("climate"), b = m("media_player"), y = m("cover"), S = m("lock"), w = [...m("switch"), ...m("fan"), ...m("humidifier"), ...m("siren")], M = [...m("sensor"), ...m("binary_sensor")], N = [], k = (T, D, O, V) => {
      D.length && N.push({ id: Hi(), type: T, title: V, entityIds: D, span: O });
    };
    g.length && k("hero", [g[0].entity_id], 2), k("group", v.map((T) => T.entity_id), 2, "Lighting");
    for (const T of b) k("card", [T.entity_id], 2);
    g.length > 1 && k("list", g.slice(1).map((T) => T.entity_id), 1, "Climate"), k("list", [...S, ...y].map((T) => T.entity_id), 1, "Security & doors"), k("group", w.map((T) => T.entity_id), 1, "Switches & fans"), k("list", M.map((T) => T.entity_id), 1, "Sensors"), N.length && c.push({ id: Hi(), name: u, areaId: r.get(u) ?? null, blocks: N });
  }
  return c.sort((u, f) => {
    const m = Rg.indexOf(u.name), v = Rg.indexOf(f.name);
    return (m < 0 ? 99 : m) - (v < 0 ? 99 : v) || u.name.localeCompare(f.name);
  }), { version: 3, rooms: c, overrides: {} };
}
const Jo = "simui:dashboard:v2";
function Lg(s) {
  const t = s, i = s.span ?? t.size ?? 1, a = { ...s, span: i };
  return delete a.size, a;
}
function Bg(s) {
  const t = {};
  for (const [i, a] of Object.entries(s.overrides ?? {}))
    t[i] = { blocks: (a.blocks ?? []).map(Lg) };
  return {
    version: 3,
    overrides: t,
    rooms: (s.rooms ?? []).map((i) => ({ ...i, blocks: i.blocks.map(Lg) }))
  };
}
async function y_(s) {
  const t = s.connection;
  if (t)
    try {
      const i = await t.sendMessagePromise({ type: "frontend/get_user_data", key: Jo }), a = i?.value?.version;
      if (i && i.value && (a === 2 || a === 3)) return Bg(i.value);
    } catch {
    }
  try {
    const i = localStorage.getItem(Jo);
    if (i) {
      const a = JSON.parse(i), r = a.version;
      if (r === 2 || r === 3) return Bg(a);
    }
  } catch {
  }
  return null;
}
async function w_(s, t) {
  try {
    localStorage.setItem(Jo, JSON.stringify(t));
  } catch {
  }
  const i = s.connection;
  if (i)
    try {
      await i.sendMessagePromise({ type: "frontend/set_user_data", key: Jo, value: t });
    } catch {
    }
}
const __ = (s) => s === 1 ? 2 : s === 2 ? "full" : 1, Hb = j.createContext(null);
function Ts() {
  const s = j.useContext(Hb);
  if (!s) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return s;
}
function S_(s) {
  const t = s.replace(/^\/+/, ""), [i, a] = t.split("/");
  return i === "category" && a ? { kind: "category", id: a } : i === "room" && a ? { kind: "room", id: a } : { kind: "home" };
}
function M_({ children: s }) {
  const t = ji(), [i, a] = j.useState(null), [r, c] = j.useState({ kind: "home" }), [u, f] = j.useState(!1), [m, v] = j.useState(null), g = j.useRef(!1);
  j.useEffect(() => {
    let w = !0;
    return (async () => {
      const M = await y_(t), [N, k] = M ? [void 0, void 0] : await Promise.all([Bb(t), Ub(t)]), T = M ?? x_(t.getStates(), N, k);
      w && (a(T), g.current = !0);
    })(), () => {
      w = !1;
    };
  }, [t]), j.useEffect(() => {
    !g.current || !i || w_(t, i);
  }, [i, t]);
  const b = (w) => {
    a((M) => {
      if (!M) return M;
      if (r.kind === "home") {
        const N = M.overrides?.home;
        return N ? { ...M, overrides: { ...M.overrides, home: { blocks: w(N.blocks) } } } : M;
      }
      if (r.kind === "room")
        return { ...M, rooms: M.rooms.map((N) => N.id === r.id ? { ...N, blocks: w(N.blocks) } : N) };
      if (r.kind === "category") {
        const N = `category:${r.id}`, k = M.overrides?.[N];
        return k ? { ...M, overrides: { ...M.overrides, [N]: { blocks: w(k.blocks) } } } : M;
      }
      return M;
    });
  }, y = (w) => {
    f(!1), c(w), window.scrollTo?.(0, 0);
  }, S = {
    config: i,
    route: r,
    goHome: () => y({ kind: "home" }),
    openRoom: (w) => y({ kind: "room", id: w }),
    openCategory: (w) => y({ kind: "category", id: w }),
    navigate: (w) => y(S_(w)),
    editing: u,
    setEditing: f,
    reorderBlocks: (w, M) => b((N) => Pd(N, w, M)),
    removeBlock: (w) => b((M) => M.filter((N) => N.id !== w)),
    cycleBlockSpan: (w) => b((M) => M.map((N) => N.id === w ? { ...N, span: __(N.span) } : N)),
    addCard: (w) => b((M) => [...M, { id: Hi(), type: "card", entityIds: [w], span: b_(w) }]),
    addBlock: (w) => b((M) => [...M, w]),
    createOverride: (w, M) => a(
      (N) => N && {
        ...N,
        overrides: {
          ...N.overrides ?? {},
          // Fresh stable ids so the snapshot doesn't depend on the volatile
          // preset id scheme.
          [`category:${w}`]: { blocks: M.map((k) => ({ ...k, id: Hi() })) }
        }
      }
    ),
    resetOverride: (w) => a((M) => {
      if (!M?.overrides) return M;
      const N = { ...M.overrides };
      return delete N[`category:${w}`], { ...M, overrides: N };
    }),
    createHomeOverride: (w) => a(
      (M) => M && { ...M, overrides: { ...M.overrides ?? {}, home: { blocks: w.map((N) => ({ ...N, id: Hi() })) } } }
    ),
    resetHomeOverride: () => a((w) => {
      if (!w?.overrides) return w;
      const M = { ...w.overrides };
      return delete M.home, { ...w, overrides: M };
    }),
    sheetEntityId: m,
    openSheet: (w) => v(w),
    closeSheet: () => v(null)
  };
  return /* @__PURE__ */ h.jsx(Hb.Provider, { value: S, children: s });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qb = (...s) => s.filter((t, i, a) => !!t && t.trim() !== "" && a.indexOf(t) === i).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N_ = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j_ = (s) => s.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, i, a) => a ? a.toUpperCase() : i.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = (s) => {
  const t = j_(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Gh = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, k_ = j.createContext({}), E_ = () => j.useContext(k_), z_ = j.forwardRef(
  ({ color: s, size: t, strokeWidth: i, absoluteStrokeWidth: a, className: r = "", children: c, iconNode: u, ...f }, m) => {
    const {
      size: v = 24,
      strokeWidth: g = 2,
      absoluteStrokeWidth: b = !1,
      color: y = "currentColor",
      className: S = ""
    } = E_() ?? {}, w = a ?? b ? Number(i ?? g) * 24 / Number(t ?? v) : i ?? g;
    return j.createElement(
      "svg",
      {
        ref: m,
        ...Gh,
        width: t ?? v ?? Gh.width,
        height: t ?? v ?? Gh.height,
        stroke: s ?? y,
        strokeWidth: w,
        className: qb("lucide", S, r),
        ...!c && !C_(f) && { "aria-hidden": "true" },
        ...f
      },
      [
        ...u.map(([M, N]) => j.createElement(M, N)),
        ...Array.isArray(c) ? c : [c]
      ]
    );
  }
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = (s, t) => {
  const i = j.forwardRef(
    ({ className: a, ...r }, c) => j.createElement(z_, {
      ref: c,
      iconNode: t,
      className: qb(
        `lucide-${N_(Ug(s))}`,
        `lucide-${s}`,
        a
      ),
      ...r
    })
  );
  return i.displayName = Ug(s), i;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T_ = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], A_ = tt("activity", T_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O_ = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
], D_ = tt("alarm-clock-check", O_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R_ = [
  ["path", { d: "M10 4 8 6", key: "1rru8s" }],
  ["path", { d: "M17 19v2", key: "ts1sot" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M7 19v2", key: "12npes" }],
  [
    "path",
    {
      d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
      key: "14ym8i"
    }
  ]
], L_ = tt("bath", R_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B_ = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
], U_ = tt("bed-double", B_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H_ = [
  ["path", { d: "M3 3h18", key: "o7r712" }],
  ["path", { d: "M20 7H8", key: "gd2fo2" }],
  ["path", { d: "M20 11H8", key: "1ynp89" }],
  ["path", { d: "M10 19h10", key: "19hjk5" }],
  ["path", { d: "M8 15h12", key: "1yqzne" }],
  ["path", { d: "M4 3v14", key: "fggqzn" }],
  ["circle", { cx: "4", cy: "19", r: "2", key: "p3m9r0" }]
], nf = tt("blinds", H_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q_ = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
], $_ = tt("box", q_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q_ = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], V_ = tt("briefcase", Q_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y_ = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
], G_ = tt("car", Y_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K_ = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", key: "3zrzxg" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8", key: "g6cvee" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4", key: "1y1dii" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20", key: "xu2jvo" }]
], X_ = tt("cast", K_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], sf = tt("check", Z_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Qi = tt("chevron-down", W_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], $b = tt("chevron-left", I_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], J_ = tt("chevron-right", F_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P_ = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], za = tt("chevron-up", P_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], eS = tt("circle-check", tS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], Qb = tt("circle-dot", iS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nS = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
], sS = tt("clapperboard", nS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aS = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
], lS = tt("cloud-drizzle", aS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rS = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
], oS = tt("cloud-fog", rS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cS = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
], Hg = tt("cloud-lightning", cS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uS = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
], Kh = tt("cloud-snow", uS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hS = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
], dS = tt("cloud-rain", hS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fS = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Vb = tt("cloud", fS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mS = [
  ["path", { d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z", key: "44yre2" }],
  ["path", { d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61", key: "leugyv" }]
], pS = tt("cloudy", mS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vS = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }],
  ["path", { d: "M2 20h20", key: "owomy5" }]
], gS = tt("door-closed", vS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bS = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
], Yb = tt("door-open", bS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xS = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
], qg = tt("droplet", xS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yS = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
], wS = tt("droplets", yS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _S = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
], Ta = tt("fan", _S);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SS = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
], MS = tt("file-code", SS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NS = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], af = tt("flame", NS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jS = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], CS = tt("gauge", jS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kS = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
], mc = tt("house", kS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ES = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], zS = tt("info", ES);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TS = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Po = tt("lightbulb", TS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], Ua = tt("lock-open", AS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], Ns = tt("lock", OS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DS = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Cd = tt("map-pin", DS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RS = [["path", { d: "M5 12h14", key: "1ays0h" }]], pc = tt("minus", RS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LS = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], BS = tt("moon", LS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const US = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], $g = tt("octagon-alert", US);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HS = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], lf = tt("pause", HS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qS = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], rf = tt("pencil", qS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $S = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], js = tt("play", $S);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QS = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], As = tt("plus", QS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VS = [
  ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15", key: "dxknvb" }],
  ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68", key: "1x7qb5" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], YS = tt("power-off", VS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GS = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Wn = tt("power", GS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], XS = tt("refresh-cw", KS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], Gb = tt("rotate-ccw", ZS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WS = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], IS = tt("search", WS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FS = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], JS = tt("server", FS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PS = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
], Kb = tt("shield-alert", PS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], vc = tt("shield-check", tM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
], tc = tt("shield-off", eM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], nM = tt("shield", iM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sM = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], Xb = tt("skip-back", sM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], Zb = tt("skip-forward", aM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lM = [
  ["path", { d: "m10 20-1.25-2.5L6 18", key: "18frcb" }],
  ["path", { d: "M10 4 8.75 6.5 6 6", key: "7mghy3" }],
  ["path", { d: "m14 20 1.25-2.5L18 18", key: "1chtki" }],
  ["path", { d: "m14 4 1.25 2.5L18 6", key: "1b4wsy" }],
  ["path", { d: "m17 21-3-6h-4", key: "15hhxa" }],
  ["path", { d: "m17 3-3 6 1.5 3", key: "11697g" }],
  ["path", { d: "M2 12h6.5L10 9", key: "kv9z4n" }],
  ["path", { d: "m20 10-1.5 2 1.5 2", key: "1swlpi" }],
  ["path", { d: "M22 12h-6.5L14 15", key: "1mxi28" }],
  ["path", { d: "m4 10 1.5 2L4 14", key: "k9enpj" }],
  ["path", { d: "m7 21 3-6-1.5-3", key: "j8hb9u" }],
  ["path", { d: "m7 3 3 6h4", key: "1otusx" }]
], rM = tt("snowflake", lM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oM = [
  ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3", key: "1dgpiv" }],
  [
    "path",
    {
      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
      key: "xacw8m"
    }
  ],
  ["path", { d: "M4 18v2", key: "jwo5n2" }],
  ["path", { d: "M20 18v2", key: "1ar1qi" }],
  ["path", { d: "M12 4v9", key: "oqhhn3" }]
], cM = tt("sofa", oM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], hM = tt("sparkles", uM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dM = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], In = tt("square", dM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fM = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Vo = tt("sun", fM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mM = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], Aa = tt("thermometer", mM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pM = [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", key: "1l6gj6" }],
  ["path", { d: "M7 16v6", key: "1a82de" }],
  ["path", { d: "M13 19v3", key: "13sx9i" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
      key: "1sj9kv"
    }
  ]
], vM = tt("trees", pM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gM = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Wl = tt("triangle-alert", gM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bM = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
], xM = tt("tv", bM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yM = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], wM = tt("user-check", yM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _M = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
], SM = tt("user-x", _M);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MM = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
], NM = tt("utensils", MM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jM = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], CM = tt("video-off", jM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kM = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], Wb = tt("volume-2", kM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EM = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], Ib = tt("volume-x", EM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zM = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
], Yo = tt("wind", zM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], of = tt("x", TM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AM = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], OM = tt("zap", AM);
function Fb(s, t, i) {
  const a = [], r = s.blocks.find((f) => f.type === "hero")?.entityIds[0], c = r ? i[r]?.attributes.current_temperature : void 0;
  if (c != null && a.push(`${Math.round(Number(c))}°`), t.length) {
    const f = t.filter((m) => i[m]?.state === "on").length;
    f && a.push(`${f} ${f === 1 ? "light" : "lights"} on`);
  }
  const u = s.blocks.flatMap((f) => f.entityIds).filter((f) => f.startsWith("lock."));
  if (u.length) {
    const f = u.filter((m) => i[m]?.state === "unlocked").length;
    a.push(f ? `${f} unlocked` : "all locked");
  }
  return a.join(" · ");
}
function Jb(s) {
  return s.blocks.flatMap((t) => t.entityIds).filter((t) => t.startsWith("light."));
}
function DM(s) {
  const t = s.toLowerCase();
  return t.includes("living") ? cM : t.includes("kitchen") ? NM : t.includes("bed") ? U_ : t.includes("office") ? V_ : t.includes("bath") ? L_ : t.includes("hall") ? Yb : t.includes("garage") ? G_ : t.includes("outdoor") || t.includes("garden") ? vM : mc;
}
function RM({ room: s, onOpen: t }) {
  const i = j.useMemo(() => Jb(s), [s]), a = j.useMemo(() => s.blocks.flatMap((g) => g.entityIds).filter((g) => g.startsWith("lock.")), [s]), r = j.useMemo(() => new Set(s.blocks.flatMap((g) => g.entityIds)).size, [s]), c = Qe((g) => i.some((b) => g[b]?.state === "on")), u = Qe((g) => a.some((b) => g[b]?.state === "unlocked")), f = Qe((g) => Fb(s, i, g)), m = DM(s.name), v = c ? "warm" : u ? "amber" : "accent";
  return /* @__PURE__ */ h.jsxs("button", { className: `simui-roomcard${c ? " lit" : ""}`, onClick: t, children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-roomcard-top", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-roomcard-icon ${v}`, children: /* @__PURE__ */ h.jsx(m, { size: 18, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx(J_, { className: "simui-roomcard-go", size: 16 })
    ] }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-roomcard-name", children: s.name }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-roomcard-glance num", children: f || `${r} ${r === 1 ? "device" : "devices"}` })
  ] });
}
function LM(s, t) {
  switch (s.action) {
    case "call-service": {
      const [i, a] = s.service.split(".");
      if (!i || !a) return;
      t.callService(
        i,
        a,
        s.data,
        s.target
      );
      return;
    }
    case "url":
      window.open(s.url, "_blank", "noopener,noreferrer");
      return;
    case "navigate":
      t.navigate?.(s.path);
      return;
    case "more-info":
      t.entityId && t.openSheet?.(t.entityId);
      return;
    case "toggle":
      t.entityId && t.callService("homeassistant", "toggle", void 0, { entity_id: t.entityId });
      return;
    case "none":
      return;
  }
}
function Ha() {
  const s = jt(), { navigate: t, openSheet: i } = Ts();
  return j.useCallback(
    (a, r) => {
      LM(a, { callService: s, entityId: r, navigate: t, openSheet: i });
    },
    [s, t, i]
  );
}
function lr(s) {
  switch (s) {
    case "warm":
      return "var(--warm)";
    case "accent":
    case "primary":
      return "var(--accent)";
    case "cool":
      return "var(--cool)";
    case "warn":
      return "var(--warn)";
    case "up":
    case "green":
      return "var(--up)";
    case "down":
      return "var(--down)";
    case "violet":
      return "var(--violet)";
    case "cyan":
      return "var(--cyan)";
    case "pink":
      return "var(--pink)";
    case "teal":
      return "var(--teal)";
    case "slate":
      return "var(--slate)";
    default:
      return "var(--muted)";
  }
}
function rr(s) {
  return s ? (t) => {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), s());
  } : void 0;
}
function BM({ children: s }) {
  return /* @__PURE__ */ h.jsx("div", { className: "simui-strip", children: s });
}
function UM({
  label: s,
  count: t,
  iconOn: i,
  iconOff: a,
  activeColor: r = "warm",
  onTap: c
}) {
  const u = t > 0, f = u ? { "--pill-accent": lr(r) } : void 0;
  return /* @__PURE__ */ h.jsxs(
    "button",
    {
      type: "button",
      className: `simui-pill-count${u ? " is-active" : ""}`,
      style: f,
      onClick: c,
      onKeyDown: rr(c),
      "aria-label": `${t} ${s}`,
      "aria-pressed": u,
      disabled: !c,
      children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-ic", children: u ? i : a }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-num", children: t }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function HM({
  label: s,
  icon: t,
  accent: i = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": lr(i) };
  return /* @__PURE__ */ h.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-nav",
      style: r,
      onClick: a,
      onKeyDown: rr(a),
      "aria-label": s,
      disabled: !a,
      children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-ic", children: t }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function qM({
  icon: s,
  label: t,
  accent: i = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": lr(i) };
  return /* @__PURE__ */ h.jsx(
    "button",
    {
      type: "button",
      className: "simui-pill-action",
      style: r,
      onClick: a,
      onKeyDown: rr(a),
      "aria-label": t,
      title: t,
      disabled: !a,
      children: /* @__PURE__ */ h.jsx("span", { className: "simui-pill-ic", children: s })
    }
  );
}
function $M({
  label: s,
  icon: t,
  accent: i = "warn",
  visible: a
}) {
  if (!a) return null;
  const r = { "--pill-accent": lr(i) };
  return /* @__PURE__ */ h.jsxs("span", { className: "simui-pill-badge", style: r, children: [
    t && /* @__PURE__ */ h.jsx("span", { className: "simui-pill-ic", children: t }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-pill-label", children: s })
  ] });
}
function QM({
  entity: s,
  primary: t,
  secondary: i,
  icon: a,
  activeColor: r = "accent",
  onTap: c
}) {
  const u = Ee(s), f = !!u && u.state !== "off" && u.state !== "unavailable" && u.state !== "unknown" && u.state !== "", m = f ? { "--pill-accent": lr(r) } : void 0, v = t ?? (u ? ot(u.state) : "—"), g = i ?? (u ? J(u) : s), b = `simui-pill-status${f ? " is-active" : ""}${c ? " is-clickable" : ""}`, y = /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    a && /* @__PURE__ */ h.jsx("span", { className: `simui-pill-ic${f ? " is-on" : ""}`, children: a }),
    /* @__PURE__ */ h.jsxs("span", { className: "simui-pill-status-body", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-pill-status-primary", children: v }),
      g != null && g !== "" && /* @__PURE__ */ h.jsx("span", { className: "simui-pill-status-secondary", children: g })
    ] })
  ] });
  return c ? /* @__PURE__ */ h.jsx("button", { type: "button", className: b, style: m, onClick: c, onKeyDown: rr(c), children: y }) : /* @__PURE__ */ h.jsx("div", { className: b, style: m, children: y });
}
function VM({
  entity: s,
  name: t,
  onTap: i
}) {
  const a = Ee(s), r = t ?? (a ? J(a) : s), c = a && a.state !== "unavailable" && a.state !== "unknown" ? ot(a.state) : "—";
  return /* @__PURE__ */ h.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-select",
      onClick: i,
      onKeyDown: rr(i),
      "aria-label": `${r}: ${c}`,
      disabled: !i,
      children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-select-name", children: r }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-select-value", children: c }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-pill-select-caret", children: /* @__PURE__ */ h.jsx(Qi, { size: 13, strokeWidth: 2 }) })
      ]
    }
  );
}
const Pb = {
  lightbulb: Po,
  thermostat: Aa,
  thermometer: Aa,
  cast: X_,
  tv: xM,
  shield: nM,
  activity: A_,
  zap: OM,
  sparkles: hM,
  server: JS,
  fan: Ta,
  "lock-open": Ua,
  lock: Ns,
  "power-off": YS,
  power: Wn,
  "alert-triangle": Wl,
  "alert-octagon": $g,
  "alert-octagon-2": $g,
  box: $_,
  blinds: nf,
  gauge: CS,
  home: mc
};
function Fn(s, t = 15) {
  const i = s && Pb[s] || Qb;
  return /* @__PURE__ */ h.jsx(i, { size: t, strokeWidth: 2 });
}
function YM(s) {
  return Pb[s] || Qb;
}
const GM = [
  { id: "lights", name: "Lights", icon: "lightbulb", accent: "warm", present: (s) => pi(s, "light") },
  { id: "climate", name: "Climate", icon: "thermostat", accent: "accent", present: (s) => pi(s, "climate") || pi(s, "humidifier") },
  { id: "media", name: "Media", icon: "cast", accent: "accent", present: (s) => pi(s, "media_player") },
  { id: "security", name: "Security", icon: "shield", accent: "up", present: (s) => pi(s, "lock") || pi(s, "alarm_control_panel") || KM(s, "door", "window", "motion") },
  { id: "sensors", name: "Sensors", icon: "activity", accent: "up", present: (s) => XM(s) || pi(s, "binary_sensor") },
  { id: "power", name: "Power", icon: "zap", accent: "warn", present: (s) => ZM(s) },
  { id: "scenes", name: "Scenes", icon: "sparkles", accent: "accent", present: (s) => pi(s, "scene") || pi(s, "script") },
  { id: "server", name: "System", icon: "server", accent: "up", present: (s) => WM(s) }
];
function pi(s, t) {
  return or(s, (i) => st(i.entity_id) === t && ae(i));
}
function KM(s, ...t) {
  return or(s, (i) => st(i.entity_id) === "binary_sensor" && t.includes(i.attributes.device_class));
}
function XM(s) {
  return or(s, (t) => st(t.entity_id) === "sensor" && t.attributes.unit_of_measurement != null && ae(t));
}
function ZM(s) {
  return or(s, (t) => st(t.entity_id) === "sensor" && (t.attributes.device_class === "power" || t.attributes.device_class === "energy"));
}
function WM(s) {
  return or(s, (t) => /docker|proxmox|container|zfs|truenas|\bnas\b|\bpbs\b|server/i.test(`${t.entity_id} ${J(t)}`));
}
function t1(s) {
  const { states: t } = s, i = { blocks: [] }, a = [];
  pi(t, "light") && a.push({
    kind: "count",
    icon: "lightbulb",
    label: "lights on",
    accent: "warm",
    source: { include: [{ domain: "light", state: "on" }], hideWhenEmpty: !1 }
  }), pi(t, "fan") && a.push({
    kind: "count",
    icon: "fan",
    label: "fans on",
    accent: "accent",
    source: { include: [{ domain: "fan", state: "on" }], hideWhenEmpty: !1 }
  }), pi(t, "lock") && a.push({
    kind: "conditional",
    icon: "lock-open",
    label: "Door unlocked",
    accent: "warn",
    visibleWhen: IM(t, (y) => st(y.entity_id) === "lock", "unlocked")
  });
  const r = Object.values(t).find((y) => st(y.entity_id) === "weather" && ae(y));
  r && a.push({ kind: "status", entityId: r.entity_id, stateContent: ["state"] }), a.length && (i.statusStrip = a);
  const c = Object.values(t).find(
    (y) => st(y.entity_id) === "cover" && /garage|door|gate/i.test(J(y))
  );
  c && i.blocks.push({
    id: At("home-alert"),
    type: "hero",
    title: J(c),
    entityIds: [c.entity_id],
    span: "full",
    visibleWhen: { entity: c.entity_id, state: "open" }
  });
  const u = Object.values(t).filter((y) => (st(y.entity_id) === "scene" || st(y.entity_id) === "script") && ae(y)).map((y) => y.entity_id);
  u.length && i.blocks.push({
    id: At("home-scenes"),
    type: "group",
    title: "Scenes",
    axis: "function",
    entityIds: u.slice(0, 8),
    span: "full"
  });
  const f = GM.filter((y) => y.present(t));
  i.blocks.push({
    id: At("home-launcher"),
    type: "group",
    title: "Everything",
    axis: "none",
    entityIds: f.map((y) => `category.${y.id}`),
    span: "full"
  });
  const m = [], v = (y) => {
    const S = Object.values(t).find(y);
    S && m.push(S.entity_id);
  };
  v((y) => st(y.entity_id) === "sensor" && y.attributes.device_class === "power" && /house|home|total|load|consumption/i.test(J(y))), v((y) => st(y.entity_id) === "sensor" && /sol(ar)?|pv|generation/i.test(J(y)) && y.attributes.unit_of_measurement != null), v((y) => st(y.entity_id) === "sensor" && y.attributes.device_class === "battery");
  const g = Object.values(t).find((y) => /washer|dryer|dishwasher|laundry/i.test(J(y)) && ae(y));
  g && m.push(g.entity_id), m.length && i.blocks.push({
    id: At("home-live"),
    type: "group",
    title: "Live status",
    axis: "function",
    entityIds: m,
    span: 2
  });
  const b = Object.values(t).find((y) => st(y.entity_id) === "alarm_control_panel" && ae(y));
  if (b)
    i.blocks.push({
      id: At("home-security"),
      type: "hero",
      title: J(b),
      entityIds: [b.entity_id],
      span: "full"
    });
  else {
    const y = Object.values(t).filter((S) => st(S.entity_id) === "lock" && ae(S)).map((S) => S.entity_id);
    y.length && i.blocks.push({
      id: At("home-locks"),
      type: "list",
      title: "Security & doors",
      axis: "none",
      entityIds: y,
      span: 1
    });
  }
  return i;
}
function IM(s, t, i) {
  const a = Object.values(s).find(t);
  return { entity: a ? a.entity_id : "unknown.none", state: i };
}
const FM = 6;
function Qg(s, t) {
  const i = `${s} ${t}`.toLowerCase();
  return /group|all\b|_lights\b|\blights$/.test(i);
}
function Vg(s) {
  const t = s.filter((a) => Qg(a.id, a.name)), i = s.filter((a) => !Qg(a.id, a.name));
  return [...t, ...i].map((a) => a.id);
}
function JM(s) {
  const { states: t, areas: i, registry: a } = s, r = Object.values(t).filter(
    (u) => u.entity_id.startsWith("light.") && ar(u.entity_id, u, a)
  ), c = { blocks: [] };
  if (!r.length) return c;
  if (c.statusStrip = [
    {
      kind: "count",
      icon: "lightbulb",
      label: "on",
      accent: "warm",
      source: { include: [{ domain: "light", state: "on" }], hideWhenEmpty: !1 }
    },
    {
      kind: "action",
      icon: "power-off",
      label: "All off",
      action: { action: "call-service", service: "light.turn_off", target: { entity_id: "all" } }
    }
  ], r.length <= FM) {
    const u = Vg(r.map((f) => ({ id: f.entity_id, name: J(f) })));
    return c.blocks.push(Yg("Lights", u, "full")), c;
  }
  for (const [u, f] of c1(r, i)) {
    const m = Vg(f.map((v) => ({ id: v.entity_id, name: J(v) })));
    m.length && c.blocks.push(Yg(u, m, 2));
  }
  return c;
}
function Yg(s, t, i) {
  return { id: At("lights"), type: "group", title: s, axis: "room", tile: "slider", entityIds: t, span: i };
}
function PM(s) {
  return s.find((i) => /master|whole|home|main|house|hvac/i.test(J(i))) ?? s[0];
}
function tN(s, t, i) {
  const a = [], r = Object.values(s).filter(
    (c) => o1(c) && c.attributes.device_class === "temperature" && ar(c.entity_id, c, i)
  ).slice(0, 4);
  for (const c of r)
    a.push({ entity: c.entity_id, name: Zn(c), fill: "line", strokeWidth: 2 });
  if (!a.length)
    for (const c of t.slice(0, 3))
      a.push({ entity: c.entity_id, name: Zn(c), fill: "line", strokeWidth: 2 });
  return a;
}
function eN(s) {
  const { states: t, registry: i } = s, a = Xn(t, "climate", i).filter(ae), r = Xn(t, "humidifier", i).filter(ae), c = { blocks: [] };
  if (!a.length && !r.length) return c;
  if (c.statusStrip = [
    {
      kind: "count",
      icon: "thermostat",
      label: "active",
      accent: "accent",
      source: {
        include: [
          { domain: "climate", state: "heat" },
          { domain: "climate", state: "cool" },
          { domain: "climate", state: "heat_cool" }
        ],
        hideWhenEmpty: !1
      }
    }
  ], a.length) {
    const f = PM(a);
    c.blocks.push({
      id: At("climate-hero"),
      type: "hero",
      title: Zn(f),
      entityIds: [f.entity_id],
      span: "full"
    });
    const m = a.filter((v) => v.entity_id !== f.entity_id);
    m.length && c.blocks.push({
      id: At("climate-zones"),
      type: "group",
      title: "Zones",
      axis: "function",
      entityIds: m.map((v) => v.entity_id),
      span: 2
    });
  }
  r.length && c.blocks.push({
    id: At("climate-humidifier"),
    type: "group",
    title: "Humidity",
    axis: "function",
    entityIds: r.map((f) => f.entity_id),
    span: 1
  });
  const u = tN(t, a, i);
  if (u.length) {
    const f = {
      title: "Temperature trend",
      window: { value: 72, unit: "h" },
      bucket: "hour",
      reducer: "mean",
      backend: "history",
      header: { showCurrent: !0, colorize: !0 },
      axes: [{ id: "temp" }],
      series: u.map((m) => ({ ...m, axisId: "temp" })),
      // Comfort band (~19–24°C) — value-banded coloring per FRAMEWORK.md §5.
      thresholds: [
        { value: 19, color: "var(--up)" },
        { value: 24, color: "var(--warn)" }
      ]
    };
    c.blocks.push({
      id: At("climate-chart"),
      type: "chart",
      title: "Temperature trend",
      entityIds: u.map((m) => m.entity),
      span: "full",
      chart: f
    });
  }
  return c;
}
const iN = 8, e1 = [
  { key: "temperature", title: "Temperature", classes: ["temperature"], units: ["°C", "°F"] },
  { key: "humidity", title: "Humidity", classes: ["humidity"], units: ["%"] },
  { key: "air", title: "Air quality", classes: ["pm25", "pm10", "pm1", "co2", "carbon_dioxide", "volatile_organic_compounds", "aqi", "nitrogen_dioxide", "ozone"] },
  { key: "pressure", title: "Pressure", classes: ["pressure", "atmospheric_pressure"] },
  { key: "illuminance", title: "Light level", classes: ["illuminance"] },
  { key: "battery", title: "Battery", classes: ["battery"] },
  { key: "signal", title: "Signal", classes: ["signal_strength"] }
];
function nN(s) {
  const t = s.attributes.device_class, i = s.attributes.unit_of_measurement;
  for (const a of e1) {
    if (t && a.classes.includes(t)) return { key: a.key, title: a.title };
    if (!t && i && a.units?.includes(i)) return { key: a.key, title: a.title };
  }
}
function sN(s) {
  switch (s) {
    case "temperature":
      return "var(--warn)";
    case "humidity":
      return "var(--accent)";
    case "air":
      return "var(--up)";
    default:
      return;
  }
}
function aN(s) {
  const { states: t, areas: i, registry: a } = s, r = (g) => ar(g.entity_id, g, a), c = Object.values(t).filter((g) => o1(g) && r(g)), u = Object.values(t).filter(
    (g) => st(g.entity_id) === "binary_sensor" && ae(g) && r(g)
  ), f = { blocks: [] };
  if (!c.length && !u.length) return f;
  f.statusStrip = [
    {
      kind: "count",
      icon: "alert-triangle",
      label: "active",
      accent: "warn",
      source: {
        include: [
          { domain: "binary_sensor", state: "on" }
        ],
        exclude: [{ name: "*connectivity*" }],
        hideWhenEmpty: !1
      }
    }
  ];
  const m = /* @__PURE__ */ new Map(), v = [];
  for (const g of c) {
    const b = nN(g);
    if (!b) {
      v.push(g);
      continue;
    }
    let y = m.get(b.key);
    y || (y = { title: b.title, ents: [] }, m.set(b.key, y)), y.ents.push(g);
  }
  if (c.length >= iN) {
    const g = ["temperature", "humidity", "air"];
    for (const b of g) {
      const y = m.get(b);
      !y || y.ents.length < 2 || f.blocks.push(lN(y.title, b, y.ents.slice(0, 6)));
    }
  }
  for (const g of e1) {
    const b = m.get(g.key);
    !b || !b.ents.length || f.blocks.push({
      id: At(`sensors-${g.key}`),
      type: "group",
      title: b.title,
      axis: "metrics",
      // → MetricSpark data-viz wall (Phase 2, I6)
      entityIds: b.ents.map((y) => y.entity_id),
      span: 2
    });
  }
  if (v.length && f.blocks.push({
    id: At("sensors-misc"),
    type: "list",
    title: "Other measurements",
    axis: "none",
    entityIds: v.map((g) => g.entity_id),
    span: 1
  }), u.length)
    if (u.length <= 6)
      f.blocks.push(Gg("Status", u.map((g) => g.entity_id)));
    else
      for (const [g, b] of c1(u, i))
        f.blocks.push(Gg(g, b.map((y) => y.entity_id)));
  return f;
}
function lN(s, t, i) {
  const a = sN(t), r = i.map((u, f) => ({
    entity: u.entity_id,
    name: Zn(u),
    fill: "line",
    strokeWidth: 2,
    // First series gets the quantity's identity color; rest use the auto-palette.
    color: f === 0 ? a : void 0,
    axisId: "main"
  })), c = {
    title: s,
    window: { value: 48, unit: "h" },
    bucket: "hour",
    reducer: "mean",
    backend: "history",
    header: { showCurrent: !0, colorize: !0 },
    axes: [{ id: "main" }],
    series: r
  };
  return {
    id: At(`sensors-overview-${t}`),
    type: "chart",
    title: s,
    entityIds: i.map((u) => u.entity_id),
    span: "full",
    chart: c
  };
}
function Gg(s, t) {
  return {
    id: At("sensors-binary"),
    type: "list",
    title: s,
    axis: "room",
    entityIds: t,
    span: 1
  };
}
const rN = /* @__PURE__ */ new Set(["W", "kW"]), oN = /* @__PURE__ */ new Set(["Wh", "kWh", "MWh"]);
function cN(s) {
  if (st(s.entity_id) !== "sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class, i = s.attributes.unit_of_measurement;
  return t === "power" || t === "energy" || !!i && (rN.has(i) || oN.has(i));
}
function Ll(s, t) {
  return t.test(`${s.entity_id} ${J(s)}`);
}
function uN(s) {
  return Ll(s, /sol(ar)?|pv|generation|inverter/i) ? "solar" : Ll(s, /batt(ery)?|soc|state_of_charge/i) ? "battery" : Ll(s, /grid|import|export|mains|utility/i) ? "grid" : Ll(s, /house|home|total|load|consumption|whole/i) ? "load" : "circuit";
}
function hN(s) {
  const { states: t, registry: i } = s, a = (N) => ar(N.entity_id, N, i), r = Object.values(t).filter((N) => cN(N) && a(N)), c = { blocks: [] };
  if (!r.length) return c;
  const u = /* @__PURE__ */ new Map();
  for (const N of r) {
    const k = uN(N);
    let T = u.get(k);
    T || (T = [], u.set(k, T)), T.push(N);
  }
  const f = u.get("solar") ?? [], m = u.get("battery") ?? [], v = u.get("grid") ?? [], g = u.get("load") ?? [], b = u.get("circuit") ?? [], y = [];
  g.length && y.push({ kind: "status", entityId: g[0].entity_id, stateContent: ["state"] }), f.length && y.push({ kind: "status", entityId: f[0].entity_id, stateContent: ["state"] }), m.length && y.push({ kind: "status", entityId: m[0].entity_id, stateContent: ["state"] }), y.length && (c.statusStrip = y);
  const S = [];
  f.length && S.push({ entity: f[0].entity_id, name: Zn(f[0]), fill: "area", color: "var(--up)", opacity: 0.25, strokeWidth: 2, axisId: "power" });
  const w = g[0] ?? v[0];
  if (w && S.push({ entity: w.entity_id, name: Zn(w), fill: "line", color: "var(--warn)", strokeWidth: 2, axisId: "power" }), m.length && S.push({ entity: m[0].entity_id, name: Zn(m[0]), fill: "line", color: "var(--accent)", strokeWidth: 1, axisId: "battery" }), S.length) {
    const N = [{ id: "power" }];
    m.length && N.push({ id: "battery", min: 0, max: 100, opposite: !0 });
    const k = {
      title: "Power flow",
      window: { value: 24, unit: "h" },
      bucket: "hour",
      reducer: "mean",
      backend: "history",
      header: { showCurrent: !0, colorize: !0 },
      axes: N,
      series: S
    };
    c.blocks.push({
      id: At("power-flow"),
      type: "chart",
      title: "Power flow",
      entityIds: S.map((T) => T.entity),
      span: "full",
      chart: k
    });
  }
  b.length && c.blocks.push({
    id: At("power-circuits"),
    type: "group",
    title: "Circuits",
    axis: "metrics",
    // → per-circuit MetricSpark wall (Phase 2, I7)
    entityIds: b.map((N) => N.entity_id),
    span: 2
  });
  const M = Object.values(t).filter(
    (N) => (st(N.entity_id) === "switch" || st(N.entity_id) === "input_boolean") && ae(N) && a(N) && (N.attributes.device_class === "outlet" || Ll(N, /outlet|plug|gpo|socket/i))
  );
  return M.length && c.blocks.push({
    id: At("power-outlets"),
    type: "group",
    title: "Outlets",
    axis: "function",
    entityIds: M.map((N) => N.entity_id),
    span: 1
  }), c;
}
function Ni({
  value: s,
  since: t,
  tone: i = "muted"
}) {
  const a = t ? hc(t) : "";
  return /* @__PURE__ */ h.jsxs("span", { className: `simui-state${i !== "muted" ? ` ${i}` : ""}`, children: [
    s,
    a && /* @__PURE__ */ h.jsxs("span", { className: "simui-since", children: [
      " · ",
      a
    ] })
  ] });
}
const Ri = 8;
function ec({ items: s, x: t, y: i, onClose: a, header: r }) {
  const c = j.useRef(null), [u, f] = j.useState({ x: t, y: i }), [m, v] = j.useState(-1), g = s.map((w, M) => w.disabled ? -1 : M).filter((w) => w >= 0);
  j.useLayoutEffect(() => {
    const w = c.current;
    if (!w) return;
    const { width: M, height: N } = w.getBoundingClientRect(), k = window.innerWidth, T = window.innerHeight;
    let D = t, O = i;
    D + M > k - Ri && (D = Math.max(Ri, k - M - Ri)), O + N > T - Ri && (O = Math.max(Ri, T - N - Ri)), D < Ri && (D = Ri), O < Ri && (O = Ri), f({ x: D, y: O });
  }, [t, i, s.length]), j.useEffect(() => {
    c.current?.focus();
  }, []), j.useEffect(() => {
    const w = (N) => {
      c.current && !c.current.contains(N.target) && a();
    }, M = () => a();
    return window.addEventListener("mousedown", w, !0), window.addEventListener("touchstart", w, !0), window.addEventListener("contextmenu", w, !0), window.addEventListener("scroll", M, !0), window.addEventListener("resize", a), window.addEventListener("blur", a), () => {
      window.removeEventListener("mousedown", w, !0), window.removeEventListener("touchstart", w, !0), window.removeEventListener("contextmenu", w, !0), window.removeEventListener("scroll", M, !0), window.removeEventListener("resize", a), window.removeEventListener("blur", a);
    };
  }, [a]);
  const b = j.useCallback(
    (w) => {
      w.disabled || (a(), w.onClick());
    },
    [a]
  ), y = j.useCallback(
    (w) => {
      g.length !== 0 && v((M) => {
        const N = g.indexOf(M);
        if (N === -1) return w === 1 ? g[0] : g[g.length - 1];
        const k = (N + w + g.length) % g.length;
        return g[k];
      });
    },
    [g]
  ), S = (w) => {
    switch (w.key) {
      case "Escape":
        w.preventDefault(), a();
        break;
      case "ArrowDown":
        w.preventDefault(), y(1);
        break;
      case "ArrowUp":
        w.preventDefault(), y(-1);
        break;
      case "Home":
        w.preventDefault(), g.length && v(g[0]);
        break;
      case "End":
        w.preventDefault(), g.length && v(g[g.length - 1]);
        break;
      case "Enter":
      case " ":
        w.preventDefault(), m >= 0 && s[m] && b(s[m]);
        break;
      case "Tab":
        w.preventDefault(), y(w.shiftKey ? -1 : 1);
        break;
    }
  };
  return Gn.createPortal(
    // Wrap in `simui-root` so the scoped CSS applies even though we portal to
    // <body> (outside the app's React tree) — matching Sheet.tsx's pattern.
    /* @__PURE__ */ h.jsxs(
      "div",
      {
        ref: c,
        className: "simui-root simui-ctxmenu",
        role: "menu",
        tabIndex: -1,
        "aria-orientation": "vertical",
        style: { left: u.x, top: u.y },
        onKeyDown: S,
        onContextMenu: (w) => w.preventDefault(),
        children: [
          r && /* @__PURE__ */ h.jsx("div", { className: "simui-ctxhead", onKeyDown: (w) => w.stopPropagation(), children: r }),
          r && s.length > 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-ctxsep", role: "separator" }),
          s.map((w, M) => /* @__PURE__ */ h.jsxs("div", { role: "presentation", className: "simui-ctxgroup", children: [
            w.separator && M > 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-ctxsep", role: "separator" }),
            /* @__PURE__ */ h.jsxs(
              "button",
              {
                type: "button",
                role: "menuitem",
                className: [
                  "simui-ctxitem",
                  w.danger ? "danger" : "",
                  m === M ? "is-active" : ""
                ].filter(Boolean).join(" "),
                tabIndex: -1,
                disabled: w.disabled,
                "aria-disabled": w.disabled || void 0,
                onMouseEnter: () => !w.disabled && v(M),
                onClick: () => b(w),
                children: [
                  w.icon != null && /* @__PURE__ */ h.jsx("span", { className: "simui-ctxic", children: w.icon }),
                  /* @__PURE__ */ h.jsx("span", { className: "simui-ctxlabel", children: w.label })
                ]
              }
            )
          ] }, M))
        ]
      }
    ),
    document.body
  );
}
const Kg = { open: !1, x: 0, y: 0 }, dN = 480, Xg = 10;
function cf() {
  const [s, t] = j.useState(Kg), i = j.useRef(null), a = j.useRef(null), r = j.useCallback(() => {
    i.current != null && (clearTimeout(i.current), i.current = null), a.current = null;
  }, []), c = j.useCallback(() => t(Kg), []), u = j.useCallback((b, y) => t({ open: !0, x: b, y }), []), f = j.useCallback(
    (b) => {
      b.preventDefault(), b.stopPropagation(), u(b.clientX, b.clientY);
    },
    [u]
  ), m = j.useCallback(
    (b) => {
      const y = b.touches[0];
      y && (a.current = { x: y.clientX, y: y.clientY }, r(), i.current = setTimeout(() => {
        i.current = null, a.current && u(a.current.x, a.current.y);
      }, dN));
    },
    [r, u]
  ), v = j.useCallback(
    (b) => {
      const y = b.touches[0];
      if (!y || !a.current) return;
      const S = Math.abs(y.clientX - a.current.x), w = Math.abs(y.clientY - a.current.y);
      (S > Xg || w > Xg) && r();
    },
    [r]
  );
  j.useEffect(() => r, [r]);
  const g = {
    onContextMenu: f,
    onTouchStart: m,
    onTouchMove: v,
    onTouchEnd: r,
    onTouchCancel: r
  };
  return {
    open: s.open,
    menuProps: g,
    onContextMenu: f,
    onTouchStart: m,
    position: s.open ? { x: s.x, y: s.y } : null,
    openAt: u,
    close: c
  };
}
function ts({ entity: s, features: t }) {
  return t.length ? /* @__PURE__ */ h.jsx("div", { className: "simui-feats", children: t.map((i, a) => /* @__PURE__ */ h.jsx(fN, { entity: s, feature: i }, `${i.type}-${a}`)) }) : null;
}
function fN({ entity: s, feature: t }) {
  switch (t.type) {
    case "cover-open-close":
      return /* @__PURE__ */ h.jsx(mN, { entity: s });
    case "climate-hvac-modes":
      return /* @__PURE__ */ h.jsx(vN, { entity: s, modes: t.modes, style: t.style });
    case "climate-fan-modes":
      return /* @__PURE__ */ h.jsx(gN, { entity: s });
    case "target-temperature":
      return /* @__PURE__ */ h.jsx(bN, { entity: s });
    case "fan-speed":
      return /* @__PURE__ */ h.jsx(xN, { entity: s });
    case "fan-oscillate":
      return /* @__PURE__ */ h.jsx(yN, { entity: s });
    case "lock-commands":
      return /* @__PURE__ */ h.jsx(wN, { entity: s });
    case "alarm-modes":
      return /* @__PURE__ */ h.jsx(MN, { entity: s, modes: t.modes });
  }
}
const Eo = { OPEN: 1, CLOSE: 2 };
function mN({ entity: s }) {
  const t = jt(), i = s.attributes.supported_features ?? 0, a = s.state === "opening" || s.state === "closing", r = (c) => {
    t("cover", c, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-controls", children: [
    (i & Eo.OPEN) === Eo.OPEN && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => r("open_cover"), children: /* @__PURE__ */ h.jsx(za, { size: 15, strokeWidth: 2 }) }),
    /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", disabled: !a, onClick: () => r("stop_cover"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
    (i & Eo.CLOSE) === Eo.CLOSE && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => r("close_cover"), children: /* @__PURE__ */ h.jsx(Qi, { size: 15, strokeWidth: 2 }) })
  ] });
}
const pN = {
  heat: af,
  cool: rM,
  heat_cool: Vo,
  auto: Vo,
  dry: Vo,
  fan_only: Ta,
  off: Wn
};
function vN({
  entity: s,
  modes: t,
  style: i
}) {
  const a = jt(), r = (c) => {
    a("climate", "set_hvac_mode", { hvac_mode: c }, { entity_id: s.entity_id });
  };
  return i === "dropdown" ? /* @__PURE__ */ h.jsx(
    i1,
    {
      value: s.state,
      options: t,
      ariaLabel: "HVAC mode",
      onSelect: r
    }
  ) : /* @__PURE__ */ h.jsx("div", { className: "simui-seg", role: "group", "aria-label": "HVAC mode", children: t.map((c) => {
    const u = pN[c] ?? Wn, f = s.state === c;
    return /* @__PURE__ */ h.jsx(
      "button",
      {
        className: `simui-segbtn${f ? " is-active" : ""}`,
        "aria-pressed": f,
        "aria-label": ot(c),
        title: ot(c),
        onClick: () => r(c),
        children: i === "icons" ? /* @__PURE__ */ h.jsx(u, { size: 14, strokeWidth: 2 }) : ot(c)
      },
      c
    );
  }) });
}
function gN({ entity: s }) {
  const t = jt(), i = s.attributes.fan_modes ?? [], a = s.attributes.fan_mode;
  return i.length ? /* @__PURE__ */ h.jsx(
    i1,
    {
      value: a ?? "",
      options: i,
      ariaLabel: "Fan mode",
      onSelect: (r) => {
        t("climate", "set_fan_mode", { fan_mode: r }, { entity_id: s.entity_id });
      }
    }
  ) : null;
}
function bN({ entity: s }) {
  const t = jt(), i = s.attributes, a = i.temperature, r = i.target_temp_step ?? 0.5, c = i.min_temp ?? 7, u = i.max_temp ?? 35;
  if (a == null) return null;
  const f = (m) => {
    const v = qi(Math.round((a + m) / r) * r, c, u);
    t("climate", "set_temperature", { temperature: v }, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-step", children: [
    /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => f(-r), children: /* @__PURE__ */ h.jsx(pc, { size: 14, strokeWidth: 2.5 }) }),
    /* @__PURE__ */ h.jsxs("span", { className: "simui-target", children: [
      NN(a),
      "°"
    ] }),
    /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => f(r), children: /* @__PURE__ */ h.jsx(As, { size: 14, strokeWidth: 2.5 }) })
  ] });
}
function xN({ entity: s }) {
  const t = jt(), i = s.attributes.percentage ?? 0, a = s.attributes.percentage_step, r = a && a > 0 ? a : 1, c = {
    background: `linear-gradient(to right, var(--accent) ${i}%, var(--faint) ${i}%)`
  };
  return /* @__PURE__ */ h.jsx(
    "input",
    {
      className: "simui-slider",
      type: "range",
      min: 0,
      max: 100,
      step: r,
      value: i,
      "aria-label": "Fan speed",
      style: c,
      onChange: (u) => {
        t("fan", "set_percentage", { percentage: Number(u.target.value) }, { entity_id: s.entity_id });
      }
    }
  );
}
function yN({ entity: s }) {
  const t = jt(), i = !!s.attributes.oscillating;
  return /* @__PURE__ */ h.jsxs(
    "button",
    {
      className: `simui-ftoggle${i ? " is-active" : ""}`,
      role: "switch",
      "aria-checked": i,
      "aria-label": "Oscillate",
      onClick: () => {
        t("fan", "oscillate", { oscillating: !i }, { entity_id: s.entity_id });
      },
      children: [
        /* @__PURE__ */ h.jsx(Ta, { size: 14, strokeWidth: 2 }),
        /* @__PURE__ */ h.jsx("span", { children: "Oscillate" })
      ]
    }
  );
}
function wN({ entity: s }) {
  const t = jt(), i = s.state === "locked", a = s.state === "locking" || s.state === "unlocking", r = (c) => {
    t("lock", c, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-seg", role: "group", "aria-label": "Lock", children: [
    /* @__PURE__ */ h.jsxs(
      "button",
      {
        className: `simui-segbtn${i ? " is-active" : ""}`,
        "aria-pressed": i,
        disabled: a,
        onClick: () => r("lock"),
        children: [
          /* @__PURE__ */ h.jsx(Ns, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ h.jsx("span", { children: "Lock" })
        ]
      }
    ),
    /* @__PURE__ */ h.jsxs(
      "button",
      {
        className: `simui-segbtn${i ? "" : " is-active"}`,
        "aria-pressed": !i,
        disabled: a,
        onClick: () => r("unlock"),
        children: [
          /* @__PURE__ */ h.jsx(Ua, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ h.jsx("span", { children: "Unlock" })
        ]
      }
    )
  ] });
}
const _N = {
  disarmed: "alarm_disarm",
  armed_home: "alarm_arm_home",
  armed_away: "alarm_arm_away",
  armed_night: "alarm_arm_night",
  armed_vacation: "alarm_arm_vacation",
  armed_custom_bypass: "alarm_arm_custom_bypass"
}, SN = {
  disarmed: "Disarm",
  armed_home: "Home",
  armed_away: "Away",
  armed_night: "Night",
  armed_vacation: "Vacation",
  armed_custom_bypass: "Custom"
};
function MN({ entity: s, modes: t }) {
  const i = jt();
  return /* @__PURE__ */ h.jsx("div", { className: "simui-seg", role: "group", "aria-label": "Alarm mode", children: t.map((a) => {
    const r = _N[a];
    if (!r) return null;
    const c = s.state === a;
    return /* @__PURE__ */ h.jsx(
      "button",
      {
        className: `simui-segbtn${c ? " is-active" : ""}`,
        "aria-pressed": c,
        onClick: () => {
          i("alarm_control_panel", r, void 0, { entity_id: s.entity_id });
        },
        children: SN[a] ?? ot(a)
      },
      a
    );
  }) });
}
function i1({
  value: s,
  options: t,
  ariaLabel: i,
  onSelect: a
}) {
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-fsel-wrap", children: [
    /* @__PURE__ */ h.jsx(
      "select",
      {
        className: "simui-fsel",
        "aria-label": i,
        value: s,
        onChange: (r) => a(r.target.value),
        children: t.map((r) => /* @__PURE__ */ h.jsx("option", { value: r, children: ot(r) }, r))
      }
    ),
    /* @__PURE__ */ h.jsx(Qi, { className: "simui-fsel-caret", size: 13, strokeWidth: 2 })
  ] });
}
function NN(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const jN = /* @__PURE__ */ new Set(["light", "climate", "cover", "fan", "lock", "alarm_control_panel"]);
function Il(s) {
  return jN.has(st(s));
}
function Fl({ entityId: s, compact: t }) {
  const i = Ee(s);
  if (!i) return null;
  if (st(s) === "light") return /* @__PURE__ */ h.jsx(EN, { entity: i, compact: t });
  const a = CN(st(s), i);
  return a.length ? /* @__PURE__ */ h.jsx("div", { className: `simui-qc${t ? " compact" : ""}`, children: /* @__PURE__ */ h.jsx(ts, { entity: i, features: a }) }) : null;
}
function CN(s, t) {
  switch (s) {
    case "climate": {
      const i = t.attributes.hvac_modes ?? [], a = [];
      return i.length && a.push({ type: "climate-hvac-modes", modes: i, style: "icons" }), a.push({ type: "target-temperature" }), a;
    }
    case "cover":
      return [{ type: "cover-open-close" }];
    case "fan":
      return [{ type: "fan-speed" }, { type: "fan-oscillate" }];
    case "lock":
      return [{ type: "lock-commands" }];
    case "alarm_control_panel":
      return [{ type: "alarm-modes", modes: ["armed_home", "armed_away", "armed_night", "disarmed"] }];
    default:
      return [];
  }
}
const Zg = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]), kN = [
  { name: "Red", hs: [4, 86] },
  { name: "Orange", hs: [28, 88] },
  { name: "Amber", hs: [44, 90] },
  { name: "Green", hs: [128, 70] },
  { name: "Teal", hs: [172, 68] },
  { name: "Blue", hs: [218, 82] },
  { name: "Violet", hs: [268, 68] },
  { name: "Pink", hs: [322, 72] }
];
function EN({ entity: s, compact: t }) {
  const i = jt(), a = s.entity_id, r = s.attributes, c = s.state === "on", u = r.brightness ?? 0, f = c ? Math.max(1, Math.round(u / 255 * 100)) : 0, m = r.supported_color_modes ?? [], v = r.color_mode, g = (O) => r[O] != null, b = m.some((O) => Zg.has(O)) || v != null && Zg.has(v) || g("rgb_color") || g("hs_color") || g("rgbw_color") || g("rgbww_color") || g("xy_color"), y = m.includes("color_temp") || v === "color_temp" || g("color_temp") || g("color_temp_kelvin"), S = r.min_color_temp_kelvin ?? 2200, w = r.max_color_temp_kelvin ?? 6500, M = r.color_temp_kelvin ?? Math.round((S + w) / 2), N = (O) => {
    i("light", "turn_on", { brightness_pct: O }, { entity_id: a });
  }, k = (O) => {
    i("light", "turn_on", { color_temp_kelvin: O }, { entity_id: a });
  }, T = (O) => {
    i("light", "turn_on", { hs_color: O }, { entity_id: a });
  }, D = {
    background: `linear-gradient(to right, var(--warm) ${f}%, var(--faint) ${f}%)`
  };
  return /* @__PURE__ */ h.jsxs("div", { className: `simui-qc light${t ? " compact" : ""}`, children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-qc-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-val num", children: c ? `${f}%` : "Off" })
    ] }),
    /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: f,
        "aria-label": "Brightness",
        style: D,
        onChange: (O) => N(Number(O.target.value))
      }
    ),
    y && /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-temp-ribbon",
        type: "range",
        min: S,
        max: w,
        step: 50,
        value: M,
        "aria-label": "Colour temperature",
        onChange: (O) => k(Number(O.target.value))
      }
    ),
    b && /* @__PURE__ */ h.jsx("div", { className: "simui-qc-swatches", children: kN.map((O) => /* @__PURE__ */ h.jsx(
      "button",
      {
        type: "button",
        className: "simui-qc-swatch",
        "aria-label": O.name,
        title: O.name,
        style: { background: `hsl(${O.hs[0]} ${O.hs[1]}% 56%)` },
        onClick: () => T(O.hs)
      },
      O.name
    )) })
  ] });
}
const zN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), TN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), AN = /* @__PURE__ */ new Set(["moisture"]);
function n1(s) {
  const t = st(s.entity_id), i = s.attributes.device_class;
  if (t === "lock") {
    const r = s.state === "locked", c = s.state === "locking" || s.state === "unlocking";
    return {
      word: c ? ot(s.state) : r ? "Locked" : "Unlocked",
      tone: r ? "secure" : "warn",
      icon: r ? Ns : Ua,
      attention: !r && !c
    };
  }
  if (t === "cover") {
    const r = s.state === "closed";
    return {
      word: r ? "Closed" : ot(s.state),
      tone: r ? "secure" : "warn",
      icon: nf,
      attention: !r && s.state !== "unavailable"
    };
  }
  if (t === "alarm_control_panel") {
    const r = s.state === "triggered", c = s.state.startsWith("armed");
    return {
      word: r ? "Triggered" : ot(s.state),
      tone: r ? "alert" : c ? "secure" : "idle",
      icon: r ? Wl : c ? vc : D_,
      attention: r
    };
  }
  const a = s.state === "on";
  return i && TN.has(i) ? {
    word: a ? "Detected" : "Clear",
    tone: a ? "alert" : "secure",
    icon: af,
    attention: a
  } : i && AN.has(i) ? {
    word: a ? "Leak" : "Dry",
    tone: a ? "alert" : "secure",
    icon: wS,
    attention: a
  } : i && zN.has(i) ? {
    word: a ? "Open" : "Closed",
    tone: a ? "warn" : "secure",
    icon: a ? Yb : gS,
    attention: a
  } : i === "motion" || i === "occupancy" || i === "presence" ? {
    word: a ? "Motion" : "Clear",
    tone: a ? "warn" : "idle",
    icon: Yo,
    attention: !1
    // motion is informational, not an alert
  } : {
    word: a ? "On" : "Clear",
    tone: a ? "warn" : "secure",
    icon: a ? Wl : eS,
    attention: !1
  };
}
function s1({ entity: s, name: t, menuItems: i }) {
  const a = Ee(s), r = cf(), c = Ha();
  if (!a) return null;
  const u = t ?? J(a), f = a.state === "unavailable" || a.state === "unknown", m = [
    { label: "Details", onClick: () => c({ action: "more-info" }, s) },
    ...i ?? []
  ];
  if (f)
    return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
      /* @__PURE__ */ h.jsxs(
        "div",
        {
          className: "simui-statusboard tone-idle is-unavailable",
          role: "group",
          "aria-label": `${u}: Unavailable`,
          ...r.menuProps,
          children: [
            /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(Wl, { size: 22, strokeWidth: 2 }) }),
            /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-word", children: "Unavailable" }),
            /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-name", title: u, children: u }),
            /* @__PURE__ */ h.jsx(Ni, { value: "", since: a.last_changed, tone: "muted" })
          ]
        }
      ),
      r.open && r.position && /* @__PURE__ */ h.jsx(
        ec,
        {
          items: m,
          x: r.position.x,
          y: r.position.y,
          onClose: r.close,
          header: Il(s) ? /* @__PURE__ */ h.jsx(Fl, { entityId: s, compact: !0 }) : void 0
        }
      )
    ] });
  const v = n1(a), g = v.icon;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: `simui-statusboard tone-${v.tone}${v.attention ? " is-attn" : ""}`,
        role: "group",
        "aria-label": `${u}: ${v.word}`,
        ...r.menuProps,
        children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(g, { size: 22, strokeWidth: 2 }) }),
          /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-word", children: v.word }),
          /* @__PURE__ */ h.jsx("span", { className: "simui-statusboard-name", title: u, children: u }),
          /* @__PURE__ */ h.jsx(Ni, { value: "", since: a.last_changed, tone: v.tone === "alert" || v.tone === "warn" ? "warn" : "muted" })
        ]
      }
    ),
    r.open && r.position && /* @__PURE__ */ h.jsx(
      ec,
      {
        items: m,
        x: r.position.x,
        y: r.position.y,
        onClose: r.close,
        header: Il(s) ? /* @__PURE__ */ h.jsx(Fl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function ON({ entities: s, clearLabel: t }) {
  const i = Qe((c) => a1(c, s).join(",")), a = j.useMemo(() => i ? i.split(",") : [], [i]), r = s.length;
  if (a.length === 0) {
    const c = t ? t(r) : `All ${r} clear`;
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-attn is-clear", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-attn-ic", children: /* @__PURE__ */ h.jsx(vc, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-attn-clear", children: c })
    ] });
  }
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-attn is-active", role: "alert", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-attn-head", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-attn-ic warn", children: /* @__PURE__ */ h.jsx(Wl, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-attn-title", children: a.length === 1 ? "1 needs attention" : `${a.length} need attention` })
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-attn-tiles", children: a.map((c) => /* @__PURE__ */ h.jsx(s1, { entity: c }, c)) })
  ] });
}
function a1(s, t) {
  const i = [];
  for (const a of t) {
    const r = s[a];
    !r || r.state === "unavailable" || r.state === "unknown" || n1(r).attention && i.push(a);
  }
  return i;
}
const DN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), RN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), LN = /* @__PURE__ */ new Set(["moisture"]);
function BN(s) {
  if (st(s.entity_id) !== "binary_sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class;
  return !!t && (DN.has(t) || RN.has(t) || LN.has(t));
}
function UN(s) {
  if (!ae(s)) return !1;
  const t = s.attributes.device_class, i = `${s.entity_id} ${s.attributes.friendly_name ?? ""}`.toLowerCase();
  return t === "garage" || t === "door" || /garage|gate|front|back|exterior|entry/.test(i);
}
function HN(s) {
  const { states: t, registry: i } = s, a = Xn(t, "lock", i).filter(ae), r = Xn(t, "alarm_control_panel", i).filter(ae), c = Xn(t, "cover", i).filter(UN), u = Object.values(t).filter(
    (M) => BN(M) && ar(M.entity_id, M, i)
  ), f = [...r, ...a, ...c, ...u], m = { blocks: [] };
  if (!f.length) return m;
  const v = f.map((M) => M.entity_id), g = a1(t, v), b = new Set(g), y = [];
  r.length && y.push({
    kind: "conditional",
    icon: "alert-triangle",
    label: "Triggered",
    accent: "down",
    visibleWhen: { entity: r[0].entity_id, state: "triggered" }
  }), a.length && y.push({
    kind: "action",
    icon: "lock",
    label: "Lock all",
    accent: "green",
    action: { action: "call-service", service: "lock.lock", target: { entity_id: a.map((M) => M.entity_id) } }
  }), y.length && (m.statusStrip = y), m.blocks.push({
    id: At("security-attention"),
    type: "attention",
    entityIds: v,
    span: "full"
  });
  for (const M of r)
    m.blocks.push({
      id: At("security-alarm"),
      type: "hero",
      title: M.attributes.friendly_name ?? M.entity_id,
      entityIds: [M.entity_id],
      span: "full"
    });
  const w = [...a, ...c, ...u].map((M) => M.entity_id).sort((M, N) => (b.has(N) ? 1 : 0) - (b.has(M) ? 1 : 0));
  return w.length && m.blocks.push(qN("Doors & locks", w)), m;
}
function qN(s, t) {
  return {
    id: At("security-board"),
    type: "group",
    title: s,
    tile: "statusboard",
    // → StatusBoardTile grid (Phase 2, I5)
    entityIds: t,
    span: "full"
  };
}
function l1(s) {
  return `${s.entity_id} ${J(s)}`.toLowerCase();
}
function de(s, t) {
  return t.test(l1(s));
}
function $N(s) {
  const t = s.some((f) => de(f, /proxmox|\bpve\b|_vm_|\blxc\b|qemu/)), i = s.some((f) => de(f, /docker|container|portainer/)), a = s.some((f) => de(f, /zfs|truenas|\bpool\b|dataset|\bzpool\b/)), r = s.some((f) => de(f, /\bpbs\b|backup|proxmox_backup|datastore/)), c = s.some((f) => de(f, /unifi|udm|\bwan\b|\bpoe\b|gateway/)), u = /* @__PURE__ */ new Set();
  for (const f of s) {
    if (!de(f, /cpu|load|memory|mem_used|disk/) || !de(f, /server|node|host|nas|\bpve\b|proxmox|truenas/)) continue;
    const v = J(f).match(/^([A-Za-z][\w-]*(?:Server|NAS|Node|Host)?)/);
    v && u.add(v[1]);
  }
  return { proxmox: t, docker: i, zfs: a, backups: r, unifi: c, nodes: [...u].sort() };
}
function Wg() {
  return {
    // This list DELIBERATELY surfaces maintenance entities (firmware updates, etc.)
    // that the curation gate would otherwise drop — opt out so they're honoured.
    includeNoise: !0,
    include: [
      { domain: "binary_sensor", name: "*container*", state: "off" },
      // a down container
      { domain: "binary_sensor", name: "*backup*", state: "on" },
      // problem/stale flag
      { domain: "binary_sensor", name: "*update*", state: "on" },
      { domain: "update", state: "on" },
      { domain: "binary_sensor", name: "*scrub*", state: "on" },
      { domain: "binary_sensor", name: "*node*", state: "off" },
      { domain: "binary_sensor", name: "*host*", state: "off" }
    ],
    exclude: [{ state: "unavailable" }, { state: "unknown" }],
    hideWhenEmpty: !0,
    sort: "name"
  };
}
function QN(s) {
  const t = Object.values(s.states).filter(ae), i = $N(t), a = { blocks: [] };
  if (!i.proxmox && !i.docker && !i.zfs && !i.backups && !i.nodes.length)
    return a;
  const r = [
    {
      kind: "count",
      icon: "alert-octagon",
      label: "need attention",
      accent: "warn",
      source: Wg()
    }
  ];
  if ((i.proxmox || i.nodes.length) && r.push({
    kind: "count",
    icon: "server",
    label: "nodes up",
    accent: "up",
    source: { include: [{ domain: "binary_sensor", name: "*node*", state: "on" }, { domain: "binary_sensor", name: "*host*", state: "on" }], hideWhenEmpty: !1 }
  }), i.docker && r.push({
    kind: "count",
    icon: "box",
    label: "containers up",
    accent: "up",
    source: { include: [{ domain: "binary_sensor", name: "*container*", state: "on" }, { domain: "switch", name: "*docker*", state: "on" }], hideWhenEmpty: !1 }
  }), a.statusStrip = r, a.blocks.push({
    id: At("server-health"),
    type: "list",
    title: "Needs attention",
    span: "full",
    entityIds: [],
    source: Wg()
  }), i.nodes.length)
    for (const f of i.nodes) {
      const m = VN(t, f);
      m.length && a.blocks.push({
        id: At("server-node"),
        type: "group",
        title: f,
        axis: "function",
        entityIds: m,
        span: 2
      });
    }
  if (i.proxmox) {
    const f = t.filter((m) => (st(m.entity_id) === "switch" || st(m.entity_id) === "binary_sensor") && de(m, /_vm_|\blxc\b|qemu|guest/)).map((m) => m.entity_id);
    f.length && a.blocks.push({
      id: At("server-vms"),
      type: "group",
      title: "Virtual machines",
      axis: "function",
      entityIds: f,
      span: 2
    });
  }
  if (i.docker) {
    const f = t.filter((m) => st(m.entity_id) === "switch" && de(m, /docker|container/)).map((m) => m.entity_id);
    f.length && a.blocks.push({
      id: At("server-containers"),
      type: "group",
      title: "Containers",
      axis: "function",
      entityIds: f,
      span: 2
    });
  }
  if (i.zfs) {
    const f = t.filter((m) => st(m.entity_id) === "sensor" && de(m, /pool|dataset|zfs|free|used|capacity/) && de(m, /%|gb|tb|gib|tib|free|used|pool|dataset/i)).map((m) => m.entity_id);
    if (f.length) {
      a.blocks.push({
        id: At("server-zfs"),
        type: "group",
        title: "Storage",
        axis: "function",
        entityIds: f,
        span: 2
      });
      const m = t.find((v) => st(v.entity_id) === "sensor" && de(v, /pool/) && (v.attributes.unit_of_measurement === "%" || de(v, /used|free|capacity/)));
      if (m) {
        const v = {
          title: "Pool capacity (30d)",
          window: { value: 30, unit: "d" },
          bucket: "day",
          reducer: "max",
          backend: "statistics",
          header: { showCurrent: !0, colorize: !0 },
          axes: [{ id: "pct", min: 0, max: 100 }],
          series: [{ entity: m.entity_id, name: Zn(m), fill: "area", color: "var(--accent)", opacity: 0.2, strokeWidth: 2, axisId: "pct" }],
          thresholds: [{ value: 80, color: "var(--warn)" }]
        };
        a.blocks.push({
          id: At("server-zfs-trend"),
          type: "chart",
          title: "Pool capacity",
          entityIds: [m.entity_id],
          span: "full",
          chart: v
        });
      }
    }
  }
  if (i.backups) {
    const f = t.filter((m) => (st(m.entity_id) === "sensor" || st(m.entity_id) === "binary_sensor") && de(m, /backup|pbs|datastore/)).map((m) => m.entity_id);
    f.length && a.blocks.push({
      id: At("server-backups"),
      type: "list",
      title: "Backups",
      axis: "none",
      entityIds: f,
      span: 1
    });
  }
  const c = /immich|paperless|seafile|ocis|opencloud|plex|jellyfin|sonarr|radarr|sabnzbd|transmission|jdownloader|nginx|npm|proxy-manager|roon|portainer|cockpit|grafana|home-?assistant|vaultwarden|nextcloud/i, u = t.filter(
    (f) => st(f.entity_id) === "binary_sensor" && de(f, c) || st(f.entity_id) === "sensor" && de(f, c) && de(f, /status|up|online|reachable|ping/)
  ).map((f) => f.entity_id);
  if (u.length && a.blocks.push({
    id: At("server-launchpad"),
    type: "group",
    title: "Services",
    axis: "function",
    entityIds: u,
    span: 2
  }), i.unifi) {
    const f = t.filter((m) => de(m, /unifi|udm|\bwan\b|\bpoe\b|gateway|throughput|clients/) && (st(m.entity_id) === "sensor" || st(m.entity_id) === "binary_sensor" || st(m.entity_id) === "button" || st(m.entity_id) === "switch")).map((m) => m.entity_id);
    f.length && a.blocks.push({
      id: At("server-network"),
      type: "group",
      title: "Network",
      axis: "function",
      entityIds: f,
      span: 1
    });
  }
  return a;
}
function VN(s, t) {
  const i = t.toLowerCase();
  return s.filter((a) => {
    const r = l1(a);
    return r.includes(i) ? /cpu|load|memory|mem|disk|temp|uptime|vms|status|power/.test(r) : !1;
  }).map((a) => a.entity_id).sort();
}
const YN = [
  {
    id: "home",
    name: "Home summary",
    description: "The landing surface — status strip, scenes, a category launcher, live status, security.",
    accent: "accent",
    build: t1
  },
  {
    id: "lights",
    name: "Lights",
    description: "All your lights, grouped by room, with the room group tile leading each section.",
    accent: "warm",
    build: JM
  },
  {
    id: "climate",
    name: "Climate",
    description: "Feature-control tiles — mode and setpoint inline — plus a comfort trend.",
    accent: "accent",
    build: eN
  },
  {
    id: "sensors",
    name: "Sensors",
    description: "Split by data type — numeric sparklines, binary status tiles, overview charts.",
    accent: "up",
    build: aN
  },
  {
    id: "power",
    name: "Power",
    description: "Merged generation + consumption, a live flow chart, and a per-circuit sparkline wall.",
    accent: "warn",
    build: hN
  },
  {
    id: "security",
    name: "Security",
    description: "A presence-first status board — locks, doors and hazards — with an Attention escalation strip and the alarm hero.",
    accent: "green",
    build: HN
  },
  {
    id: "server",
    name: "Server / Homelab",
    description: "Node vitals, VM/container control, ZFS, backups and a service launchpad — auto-detected.",
    accent: "up",
    build: QN
  }
];
function GN(s) {
  return YN.find((t) => t.id === s);
}
let Ig = 0;
function At(s) {
  return Ig += 1, `preset-${s}-${Ig}`;
}
function Fg(s, t) {
  return s.includes("*") ? new RegExp(
    "^" + s.split("*").map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$",
    "i"
  ).test(t) : s === t;
}
function KN(s) {
  return s == null ? [] : Array.isArray(s) ? s : [s];
}
function Jg(s, t, i) {
  return !(t.entityId && !Fg(t.entityId, s.entity_id) || t.domain && st(s.entity_id) !== t.domain || t.state && !KN(t.state).includes(s.state) || t.name && !Fg(t.name, J(s)) || t.area && i?.(s.entity_id) !== t.area);
}
function r1(s, t, i, a) {
  const r = !s.includeNoise, c = [];
  for (const u of Object.values(t))
    r && !fc(u.entity_id, u, a?.[u.entity_id]) || s.include.some((f) => Jg(u, f, i)) && (s.exclude?.some((f) => Jg(u, f, i)) || c.push(u.entity_id));
  return c.sort();
}
function Xn(s, t, i) {
  return Object.values(s).filter((a) => st(a.entity_id) === t && fc(a.entity_id, a, i?.[a.entity_id])).sort((a, r) => J(a).localeCompare(J(r)));
}
function or(s, t) {
  for (const i of Object.values(s)) if (t(i)) return !0;
  return !1;
}
function ae(s) {
  return s.state !== "unavailable" && s.state !== "unknown";
}
function o1(s) {
  return st(s.entity_id) === "sensor" && s.attributes.unit_of_measurement != null && ae(s);
}
function Zn(s, t) {
  return J(s).trim() || J(s);
}
const XN = [
  ["living", "Living Room"],
  ["lounge", "Living Room"],
  ["kitchen", "Kitchen"],
  ["bedroom", "Bedroom"],
  ["bed_", "Bedroom"],
  ["master", "Bedroom"],
  ["office", "Office"],
  ["study", "Office"],
  ["bath", "Bathroom"],
  ["ensuite", "Bathroom"],
  ["hall", "Hallway"],
  ["entry", "Entryway"],
  ["garage", "Garage"],
  ["laundry", "Laundry"],
  ["dining", "Dining"],
  ["outside", "Outdoor"],
  ["outdoor", "Outdoor"],
  ["garden", "Garden"],
  ["backyard", "Outdoor"],
  ["patio", "Outdoor"],
  ["porch", "Outdoor"]
];
function ZN(s, t) {
  const i = t?.[s.entity_id];
  if (i) return i.areaName;
  const a = `${s.entity_id} ${J(s)}`.toLowerCase();
  for (const [r, c] of XN) if (a.includes(r)) return c;
  return "Home";
}
function c1(s, t) {
  const i = [
    "Living Room",
    "Kitchen",
    "Dining",
    "Bedroom",
    "Office",
    "Bathroom",
    "Hallway",
    "Entryway",
    "Laundry",
    "Garage",
    "Outdoor",
    "Garden",
    "Home"
  ], a = /* @__PURE__ */ new Map();
  for (const r of s) {
    const c = ZN(r, t);
    let u = a.get(c);
    u || (u = [], a.set(c, u)), u.push(r);
  }
  return [...a.entries()].sort((r, c) => {
    const u = i.indexOf(r[0]), f = i.indexOf(c[0]);
    return (u < 0 ? 99 : u) - (f < 0 ? 99 : f) || r[0].localeCompare(c[0]);
  });
}
function u1({ pills: s }) {
  return s.length ? /* @__PURE__ */ h.jsx(BM, { children: s.map((t, i) => /* @__PURE__ */ h.jsx(WN, { pill: t }, i)) }) : null;
}
function WN({ pill: s }) {
  const t = Ha();
  switch (s.kind) {
    case "count":
      return /* @__PURE__ */ h.jsx(IN, { pill: s });
    case "nav":
      return /* @__PURE__ */ h.jsx(
        HM,
        {
          icon: Fn(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t({ action: "navigate", path: s.path })
        }
      );
    case "action":
      return /* @__PURE__ */ h.jsx(
        qM,
        {
          icon: Fn(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t(s.action)
        }
      );
    case "conditional":
      return /* @__PURE__ */ h.jsx(FN, { pill: s });
    case "status":
      return /* @__PURE__ */ h.jsx(QM, { entity: s.entityId });
    case "select":
      return /* @__PURE__ */ h.jsx(
        VM,
        {
          entity: s.entityId,
          name: s.name,
          onTap: () => t({ action: "more-info" }, s.entityId)
        }
      );
  }
}
function IN({ pill: s }) {
  const t = Qe((i) => r1(s.source, i).length);
  return /* @__PURE__ */ h.jsx(
    UM,
    {
      label: s.label,
      count: t,
      iconOn: Fn(s.icon),
      iconOff: Fn(s.icon),
      activeColor: s.accent
    }
  );
}
function FN({ pill: s }) {
  const t = Qe((i) => {
    const a = s.visibleWhen, r = i[a.entity];
    if (!r || a.state != null && !(Array.isArray(a.state) ? a.state : [a.state]).includes(r.state))
      return !1;
    const c = Number(r.state);
    return !(a.above != null && !(c > a.above) || a.below != null && !(c < a.below));
  });
  return /* @__PURE__ */ h.jsx($M, { label: s.label, icon: Fn(s.icon), accent: s.accent, visible: t });
}
function JN({ block: s }) {
  const t = Ee(s.entityIds[0]);
  if (!t) return null;
  const i = t.attributes, a = st(t.entity_id);
  if (a === "climate" || i.current_temperature != null) {
    const u = i.current_temperature, f = i.temperature, m = i.hvac_action;
    let v = t.state.replace(/_/g, " ");
    return m === "heating" && f != null ? v = `Heating to ${Xh(f)}°` : m === "cooling" && f != null ? v = `Cooling to ${Xh(f)}°` : m === "idle" ? v = "Idle" : f != null && (v = `Set to ${Xh(f)}°`), /* @__PURE__ */ h.jsxs("div", { className: "simui-hero", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-hero-temp num", children: [
        u != null ? Math.round(u) : "—",
        /* @__PURE__ */ h.jsx("small", { children: "°" })
      ] }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-hero-sub", children: v })
    ] });
  }
  const c = PN(a, t.state);
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-hero is-state", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-hero-state num", children: ot(t.state) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-hero-sub", children: s.title ?? J(t) }),
    c.length > 0 && /* @__PURE__ */ h.jsx(ts, { entity: t, features: c })
  ] });
}
function PN(s, t) {
  return s === "alarm_control_panel" ? [{ type: "alarm-modes", modes: ["disarmed", "armed_home", "armed_away", "armed_night"] }] : s === "cover" ? [{ type: "cover-open-close" }] : s === "lock" ? [{ type: "lock-commands" }] : [];
}
function Xh(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function tj(s) {
  switch (s) {
    case "warm":
      return "var(--warm)";
    case "accent":
    case "primary":
      return "var(--accent)";
    case "cool":
      return "var(--cool)";
    case "warn":
      return "var(--warn)";
    case "up":
    case "green":
      return "var(--up)";
    case "down":
      return "var(--down)";
    case "violet":
      return "var(--violet)";
    case "cyan":
      return "var(--cyan)";
    case "pink":
      return "var(--pink)";
    case "teal":
      return "var(--teal)";
    case "slate":
      return "var(--slate)";
    default:
      return;
  }
}
function Nt({
  children: s,
  active: t,
  onClick: i,
  className: a = "",
  style: r,
  orientation: c = "horizontal",
  color: u,
  menuProps: f
}) {
  const m = i ? (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), i());
  } : void 0, v = tj(u), g = v ? { ...r, "--tile-accent": v } : r;
  return /* @__PURE__ */ h.jsx(
    "div",
    {
      className: [
        "simui-tile",
        c === "vertical" ? "is-vertical" : "",
        t ? "is-active" : "",
        v && t ? "is-tinted" : "",
        i ? "is-clickable" : "",
        a
      ].filter(Boolean).join(" "),
      onClick: i,
      onKeyDown: m,
      role: i ? "button" : void 0,
      tabIndex: i ? 0 : void 0,
      style: g,
      ...f,
      children: s
    }
  );
}
function ej({
  name: s,
  icon: t,
  color: i = "accent",
  orientation: a = "vertical",
  onTap: r
}) {
  return /* @__PURE__ */ h.jsxs(Nt, { orientation: a, color: i, active: !0, onClick: r, className: "is-launcher", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-launch-ic", children: Fn(t, a === "vertical" ? 20 : 16) }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-name simui-launch-name", title: s, children: s })
  ] });
}
function Zh({ iso: s }) {
  const t = hc(s);
  return t ? /* @__PURE__ */ h.jsxs("span", { className: "simui-since", children: [
    " · ",
    t
  ] }) : null;
}
const Pg = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "humidifier", "siren", "automation"]);
function ic({ entityId: s }) {
  const t = Ee(s), i = jt(), a = Ha(), r = cf(), c = st(s), u = t ? J(t) : s, f = !!t && t.state === "on", m = !!t && t.state === "locked", v = [
    ...c === "light" || Pg.has(c) ? [{ label: f ? "Turn off" : "Turn on", onClick: () => a({ action: "toggle" }, s) }] : [],
    ...c === "lock" ? [{ label: m ? "Unlock" : "Lock", onClick: () => {
      i("lock", m ? "unlock" : "lock", {}, { entity_id: s });
    } }] : [],
    { label: "Details", icon: /* @__PURE__ */ h.jsx(zS, { size: 14 }), onClick: () => a({ action: "more-info" }, s) }
  ], g = r.open && r.position && /* @__PURE__ */ h.jsx(
    ec,
    {
      items: v,
      x: r.position.x,
      y: r.position.y,
      onClose: r.close,
      header: Il(s) ? /* @__PURE__ */ h.jsx(Fl, { entityId: s, compact: !0 }) : void 0
    }
  );
  if (!t)
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name muted", children: s }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-state", children: "—" }),
      g
    ] });
  if (t.state === "unavailable" || t.state === "unknown")
    return /* @__PURE__ */ h.jsxs("button", { className: "simui-erow as-row is-unavailable", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-state", children: ot(t.state) }),
      g
    ] });
  if (c === "light") {
    const b = t.attributes.brightness ?? 0, y = f ? Math.max(1, Math.round(b / 255 * 100)) : 0, S = () => {
      i("light", f ? "turn_off" : "turn_on", {}, { entity_id: s });
    }, w = (M) => {
      i("light", "turn_on", { brightness_pct: Number(M.target.value) }, { entity_id: s });
    };
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("button", { className: "simui-erow-dot", "data-on": f, "aria-label": `Toggle ${u}`, onClick: S }),
      /* @__PURE__ */ h.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      f ? /* @__PURE__ */ h.jsx(
        "input",
        {
          className: "simui-slider warm mini",
          type: "range",
          min: 1,
          max: 100,
          value: y,
          "aria-label": `${u} brightness`,
          onChange: w,
          style: { background: `linear-gradient(to right, var(--warm) ${y}%, var(--faint) ${y}%)` }
        }
      ) : /* @__PURE__ */ h.jsx("span", { className: "simui-erow-state", children: "Off" }),
      g
    ] });
  }
  if (c === "lock") {
    const b = () => {
      i("lock", m ? "unlock" : "lock", {}, { entity_id: s });
    };
    return /* @__PURE__ */ h.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-erow-ic${m ? "" : " amber"}`, children: m ? /* @__PURE__ */ h.jsx(Ns, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ h.jsx(Ua, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsxs("span", { className: `simui-erow-state${m ? "" : " warn"}`, children: [
        m ? "Locked" : "Unlocked",
        /* @__PURE__ */ h.jsx(Zh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if (c === "cover") {
    const b = t.attributes.current_position, y = (S) => {
      i("cover", S, void 0, { entity_id: s });
    };
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-state", children: b != null ? `${b}%` : ot(t.state) }),
      vt(t, 1) && /* @__PURE__ */ h.jsx("button", { className: "simui-rbtn", "aria-label": "Open", onClick: () => y("open_cover"), children: /* @__PURE__ */ h.jsx(za, { size: 14 }) }),
      vt(t, 2) && /* @__PURE__ */ h.jsx("button", { className: "simui-rbtn", "aria-label": "Close", onClick: () => y("close_cover"), children: /* @__PURE__ */ h.jsx(Qi, { size: 14 }) }),
      g
    ] });
  }
  if (c === "climate") {
    const b = t.attributes.current_temperature, y = t.attributes.hvac_action ?? t.state, S = y === "heating" ? " warn" : y === "cooling" ? " on" : "";
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-erow climate", ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: `simui-erow-state${S}`, children: b != null ? `${Math.round(b)}°` : ot(t.state) }),
      /* @__PURE__ */ h.jsx(ts, { entity: t, features: [{ type: "target-temperature" }] }),
      g
    ] });
  }
  if (c === "sensor" || c === "binary_sensor") {
    const b = t.attributes.unit_of_measurement ?? "", y = c === "binary_sensor";
    return /* @__PURE__ */ h.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsxs("span", { className: y ? "simui-erow-state" : "simui-erow-val num", children: [
        ot(t.state),
        b ? ` ${b}` : "",
        y && /* @__PURE__ */ h.jsx(Zh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if (Pg.has(c) && (t.state === "on" || t.state === "off")) {
    const b = () => {
      i("homeassistant", f ? "turn_off" : "turn_on", {}, { entity_id: s });
    };
    return /* @__PURE__ */ h.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-erow-ic${f ? " cool" : ""}`, children: /* @__PURE__ */ h.jsx(Wn, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsxs("span", { className: `simui-erow-state${f ? " on" : ""}`, children: [
        f ? "On" : "Off",
        /* @__PURE__ */ h.jsx(Zh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  return /* @__PURE__ */ h.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-erow-name", children: u }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-erow-state", children: ot(t.state) }),
    g
  ] });
}
function Vt(s) {
  var t = s.width, i = s.height;
  if (t < 0)
    throw new Error("Negative width is not allowed for Size");
  if (i < 0)
    throw new Error("Negative height is not allowed for Size");
  return {
    width: t,
    height: i
  };
}
function Ms(s, t) {
  return s.width === t.width && s.height === t.height;
}
var ij = (
  /** @class */
  (function() {
    function s(t) {
      var i = this;
      this._resolutionListener = function() {
        return i._onResolutionChanged();
      }, this._resolutionMediaQueryList = null, this._observers = [], this._window = t, this._installResolutionListener();
    }
    return s.prototype.dispose = function() {
      this._uninstallResolutionListener(), this._window = null;
    }, Object.defineProperty(s.prototype, "value", {
      get: function() {
        return this._window.devicePixelRatio;
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.subscribe = function(t) {
      var i = this, a = { next: t };
      return this._observers.push(a), {
        unsubscribe: function() {
          i._observers = i._observers.filter(function(r) {
            return r !== a;
          });
        }
      };
    }, s.prototype._installResolutionListener = function() {
      if (this._resolutionMediaQueryList !== null)
        throw new Error("Resolution listener is already installed");
      var t = this._window.devicePixelRatio;
      this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")), this._resolutionMediaQueryList.addListener(this._resolutionListener);
    }, s.prototype._uninstallResolutionListener = function() {
      this._resolutionMediaQueryList !== null && (this._resolutionMediaQueryList.removeListener(this._resolutionListener), this._resolutionMediaQueryList = null);
    }, s.prototype._reinstallResolutionListener = function() {
      this._uninstallResolutionListener(), this._installResolutionListener();
    }, s.prototype._onResolutionChanged = function() {
      var t = this;
      this._observers.forEach(function(i) {
        return i.next(t._window.devicePixelRatio);
      }), this._reinstallResolutionListener();
    }, s;
  })()
);
function nj(s) {
  return new ij(s);
}
var sj = (
  /** @class */
  (function() {
    function s(t, i, a) {
      var r;
      this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = t, this._canvasElementClientSize = Vt({
        width: this._canvasElement.clientWidth,
        height: this._canvasElement.clientHeight
      }), this._transformBitmapSize = i ?? (function(c) {
        return c;
      }), this._allowResizeObserver = (r = a?.allowResizeObserver) !== null && r !== void 0 ? r : !0, this._chooseAndInitObserver();
    }
    return s.prototype.dispose = function() {
      var t, i;
      if (this._canvasElement === null)
        throw new Error("Object is disposed");
      (t = this._canvasElementResizeObserver) === null || t === void 0 || t.disconnect(), this._canvasElementResizeObserver = null, (i = this._devicePixelRatioObservable) === null || i === void 0 || i.dispose(), this._devicePixelRatioObservable = null, this._suggestedBitmapSizeChangedListeners.length = 0, this._bitmapSizeChangedListeners.length = 0, this._canvasElement = null;
    }, Object.defineProperty(s.prototype, "canvasElement", {
      get: function() {
        if (this._canvasElement === null)
          throw new Error("Object is disposed");
        return this._canvasElement;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "canvasElementClientSize", {
      get: function() {
        return this._canvasElementClientSize;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "bitmapSize", {
      get: function() {
        return Vt({
          width: this.canvasElement.width,
          height: this.canvasElement.height
        });
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.resizeCanvasElement = function(t) {
      this._canvasElementClientSize = Vt(t), this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"), this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"), this._invalidateBitmapSize();
    }, s.prototype.subscribeBitmapSizeChanged = function(t) {
      this._bitmapSizeChangedListeners.push(t);
    }, s.prototype.unsubscribeBitmapSizeChanged = function(t) {
      this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(i) {
        return i !== t;
      });
    }, Object.defineProperty(s.prototype, "suggestedBitmapSize", {
      get: function() {
        return this._suggestedBitmapSize;
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
      this._suggestedBitmapSizeChangedListeners.push(t);
    }, s.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
      this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(i) {
        return i !== t;
      });
    }, s.prototype.applySuggestedBitmapSize = function() {
      if (this._suggestedBitmapSize !== null) {
        var t = this._suggestedBitmapSize;
        this._suggestedBitmapSize = null, this._resizeBitmap(t), this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize);
      }
    }, s.prototype._resizeBitmap = function(t) {
      var i = this.bitmapSize;
      Ms(i, t) || (this.canvasElement.width = t.width, this.canvasElement.height = t.height, this._emitBitmapSizeChanged(i, t));
    }, s.prototype._emitBitmapSizeChanged = function(t, i) {
      var a = this;
      this._bitmapSizeChangedListeners.forEach(function(r) {
        return r.call(a, t, i);
      });
    }, s.prototype._suggestNewBitmapSize = function(t) {
      var i = this._suggestedBitmapSize, a = Vt(this._transformBitmapSize(t, this._canvasElementClientSize)), r = Ms(this.bitmapSize, a) ? null : a;
      i === null && r === null || i !== null && r !== null && Ms(i, r) || (this._suggestedBitmapSize = r, this._emitSuggestedBitmapSizeChanged(i, r));
    }, s.prototype._emitSuggestedBitmapSizeChanged = function(t, i) {
      var a = this;
      this._suggestedBitmapSizeChangedListeners.forEach(function(r) {
        return r.call(a, t, i);
      });
    }, s.prototype._chooseAndInitObserver = function() {
      var t = this;
      if (!this._allowResizeObserver) {
        this._initDevicePixelRatioObservable();
        return;
      }
      lj().then(function(i) {
        return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable();
      });
    }, s.prototype._initDevicePixelRatioObservable = function() {
      var t = this;
      if (this._canvasElement !== null) {
        var i = t0(this._canvasElement);
        if (i === null)
          throw new Error("No window is associated with the canvas");
        this._devicePixelRatioObservable = nj(i), this._devicePixelRatioObservable.subscribe(function() {
          return t._invalidateBitmapSize();
        }), this._invalidateBitmapSize();
      }
    }, s.prototype._invalidateBitmapSize = function() {
      var t, i;
      if (this._canvasElement !== null) {
        var a = t0(this._canvasElement);
        if (a !== null) {
          var r = (i = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && i !== void 0 ? i : a.devicePixelRatio, c = this._canvasElement.getClientRects(), u = (
            // eslint-disable-next-line no-negated-condition
            c[0] !== void 0 ? rj(c[0], r) : Vt({
              width: this._canvasElementClientSize.width * r,
              height: this._canvasElementClientSize.height * r
            })
          );
          this._suggestNewBitmapSize(u);
        }
      }
    }, s.prototype._initResizeObserver = function() {
      var t = this;
      this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(i) {
        var a = i.find(function(u) {
          return u.target === t._canvasElement;
        });
        if (!(!a || !a.devicePixelContentBoxSize || !a.devicePixelContentBoxSize[0])) {
          var r = a.devicePixelContentBoxSize[0], c = Vt({
            width: r.inlineSize,
            height: r.blockSize
          });
          t._suggestNewBitmapSize(c);
        }
      }), this._canvasElementResizeObserver.observe(this._canvasElement, { box: "device-pixel-content-box" }));
    }, s;
  })()
);
function aj(s, t) {
  return new sj(s, t.transform, t.options);
}
function t0(s) {
  return s.ownerDocument.defaultView;
}
function lj() {
  return new Promise(function(s) {
    var t = new ResizeObserver(function(i) {
      s(i.every(function(a) {
        return "devicePixelContentBoxSize" in a;
      })), t.disconnect();
    });
    t.observe(document.body, { box: "device-pixel-content-box" });
  }).catch(function() {
    return !1;
  });
}
function rj(s, t) {
  return Vt({
    width: Math.round(s.left * t + s.width * t) - Math.round(s.left * t),
    height: Math.round(s.top * t + s.height * t) - Math.round(s.top * t)
  });
}
var oj = (
  /** @class */
  (function() {
    function s(t, i, a) {
      if (i.width === 0 || i.height === 0)
        throw new TypeError("Rendering target could only be created on a media with positive width and height");
      if (this._mediaSize = i, a.width === 0 || a.height === 0)
        throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
      this._bitmapSize = a, this._context = t;
    }
    return s.prototype.useMediaCoordinateSpace = function(t) {
      try {
        return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio), t({
          context: this._context,
          mediaSize: this._mediaSize
        });
      } finally {
        this._context.restore();
      }
    }, s.prototype.useBitmapCoordinateSpace = function(t) {
      try {
        return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), t({
          context: this._context,
          mediaSize: this._mediaSize,
          bitmapSize: this._bitmapSize,
          horizontalPixelRatio: this._horizontalPixelRatio,
          verticalPixelRatio: this._verticalPixelRatio
        });
      } finally {
        this._context.restore();
      }
    }, Object.defineProperty(s.prototype, "_horizontalPixelRatio", {
      get: function() {
        return this._bitmapSize.width / this._mediaSize.width;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(s.prototype, "_verticalPixelRatio", {
      get: function() {
        return this._bitmapSize.height / this._mediaSize.height;
      },
      enumerable: !1,
      configurable: !0
    }), s;
  })()
);
function Cs(s, t) {
  var i = s.canvasElementClientSize;
  if (i.width === 0 || i.height === 0)
    return null;
  var a = s.bitmapSize;
  if (a.width === 0 || a.height === 0)
    return null;
  var r = s.canvasElement.getContext("2d", t);
  return r === null ? null : new oj(r, i, a);
}
/*!
 * @license
 * TradingView Lightweight Charts™ v5.2.0
 * Copyright (c) 2026 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
const h1 = { title: "", visible: !0, hitTestTolerance: 3, lastValueVisible: !0, priceLineVisible: !0, priceLineSource: 0, priceLineWidth: 1, priceLineColor: "", priceLineStyle: 2, baseLineVisible: !0, baseLineWidth: 1, baseLineColor: "#B2B5BE", baseLineStyle: 0, priceFormat: { type: "price", precision: 2, minMove: 0.01 } };
var e0, Ss;
function Jn(s, t) {
  const i = (function(a, r) {
    switch (a) {
      case 0:
      default:
        return [];
      case 1:
        return [r, r];
      case 2:
        return [2 * r, 2 * r];
      case 3:
        return [6 * r, 6 * r];
      case 4:
        return [r, 4 * r];
    }
  })(t, s.lineWidth);
  return s.setLineDash(i), i;
}
function d1(s, t, i, a) {
  s.beginPath();
  const r = s.lineWidth % 2 ? 0.5 : 0;
  s.moveTo(i, t + r), s.lineTo(a, t + r), s.stroke();
}
function we(s, t) {
  if (!s) throw new Error("Assertion failed" + (t ? ": " + t : ""));
}
function Ve(s) {
  if (s === void 0) throw new Error("Value is undefined");
  return s;
}
function W(s) {
  if (s === null) throw new Error("Value is null");
  return s;
}
function Kn(s) {
  return W(Ve(s));
}
(function(s) {
  s[s.Simple = 0] = "Simple", s[s.WithSteps = 1] = "WithSteps", s[s.Curved = 2] = "Curved";
})(e0 || (e0 = {})), (function(s) {
  s[s.Solid = 0] = "Solid", s[s.Dotted = 1] = "Dotted", s[s.Dashed = 2] = "Dashed", s[s.LargeDashed = 3] = "LargeDashed", s[s.SparseDotted = 4] = "SparseDotted";
})(Ss || (Ss = {}));
class te {
  constructor() {
    this.t = [];
  }
  i(t, i, a) {
    const r = { h: t, l: i, o: a === !0 };
    this.t.push(r);
  }
  _(t) {
    const i = this.t.findIndex(((a) => t === a.h));
    i > -1 && this.t.splice(i, 1);
  }
  u(t) {
    this.t = this.t.filter(((i) => i.l !== t));
  }
  p(t, i, a) {
    const r = [...this.t];
    this.t = this.t.filter(((c) => !c.o)), r.forEach(((c) => c.h(t, i, a)));
  }
  v() {
    return this.t.length > 0;
  }
  m() {
    this.t = [];
  }
}
function Pe(s, ...t) {
  for (const i of t) for (const a in i) i[a] !== void 0 && Object.prototype.hasOwnProperty.call(i, a) && !["__proto__", "constructor", "prototype"].includes(a) && (typeof i[a] != "object" || s[a] === void 0 || Array.isArray(i[a]) ? s[a] = i[a] : Pe(s[a], i[a]));
  return s;
}
function Oa(s) {
  return typeof s == "number" && isFinite(s);
}
function Jl(s) {
  return typeof s == "number" && s % 1 == 0;
}
function cr(s) {
  return typeof s == "string";
}
function zo(s) {
  return typeof s == "boolean";
}
function mn(s) {
  const t = s;
  if (!t || typeof t != "object") return t;
  let i, a, r;
  for (a in i = Array.isArray(t) ? [] : {}, t) t.hasOwnProperty(a) && (r = t[a], i[a] = r && typeof r == "object" ? mn(r) : r);
  return i;
}
function i0(s) {
  return s !== null;
}
function kd(s) {
  return s === null ? void 0 : s;
}
const f1 = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function nc(s, t, i) {
  return t === void 0 && (t = f1), `${i = i !== void 0 ? `${i} ` : ""}${s}px ${t}`;
}
class cj {
  constructor(t) {
    this.M = { S: 1, C: 5, k: NaN, P: "", T: "", R: "", D: "", I: 0, V: 0, B: 0, A: 0, L: 0 }, this.O = t;
  }
  N() {
    const t = this.M, i = this.F(), a = this.W();
    return t.k === i && t.T === a || (t.k = i, t.T = a, t.P = nc(i, a), t.A = 2.5 / 12 * i, t.I = t.A, t.V = i / 12 * t.C, t.B = i / 12 * t.C, t.L = 0), t.R = this.H(), t.D = this.U(), this.M;
  }
  H() {
    return this.O.N().layout.textColor;
  }
  U() {
    return this.O.$();
  }
  F() {
    return this.O.N().layout.fontSize;
  }
  W() {
    return this.O.N().layout.fontFamily;
  }
}
function Wh(s) {
  return s < 0 ? 0 : s > 255 ? 255 : Math.round(s) || 0;
}
function n0(s) {
  return 0.199 * s[0] + 0.687 * s[1] + 0.114 * s[2];
}
class uj {
  constructor(t, i) {
    this.j = /* @__PURE__ */ new Map(), this.q = t, i && (this.j = i);
  }
  Y(t, i) {
    if (t === "transparent") return t;
    const a = this.K(t), r = a[3];
    return `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${i * r})`;
  }
  Z(t) {
    const i = this.K(t);
    return { G: `rgb(${i[0]}, ${i[1]}, ${i[2]})`, X: n0(i) > 160 ? "black" : "white" };
  }
  J(t) {
    return n0(this.K(t));
  }
  tt(t, i, a) {
    const [r, c, u, f] = this.K(t), [m, v, g, b] = this.K(i), y = [Wh(r + a * (m - r)), Wh(c + a * (v - c)), Wh(u + a * (g - u)), (S = f + a * (b - f), S <= 0 || S > 1 ? Math.min(Math.max(S, 0), 1) : Math.round(1e4 * S) / 1e4)];
    var S;
    return `rgba(${y[0]}, ${y[1]}, ${y[2]}, ${y[3]})`;
  }
  K(t) {
    const i = this.j.get(t);
    if (i) return i;
    const a = (function(u) {
      const f = document.createElement("div");
      f.style.display = "none", document.body.appendChild(f), f.style.color = u;
      const m = window.getComputedStyle(f).color;
      return document.body.removeChild(f), m;
    })(t), r = a.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
    if (!r) {
      if (this.q.length) for (const u of this.q) {
        const f = u(t);
        if (f) return this.j.set(t, f), f;
      }
      throw new Error(`Failed to parse color: ${t}`);
    }
    const c = [parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10), r[4] ? parseFloat(r[4]) : 1];
    return this.j.set(t, c), c;
  }
}
class m1 {
  constructor() {
    this.it = [];
  }
  nt(t) {
    this.it = t;
  }
  st(t, i, a) {
    this.it.forEach(((r) => {
      r.st(t, i, a);
    }));
  }
}
class Os {
  st(t, i, a) {
    t.useBitmapCoordinateSpace(((r) => this.et(r, i, a)));
  }
}
class hj extends Os {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et({ context: t, horizontalPixelRatio: i, verticalPixelRatio: a }) {
    if (this.rt === null || this.rt.lt === null) return;
    const r = this.rt.lt, c = this.rt, u = Math.max(1, Math.floor(i)) % 2 / 2, f = (m) => {
      t.beginPath();
      for (let v = r.to - 1; v >= r.from; --v) {
        const g = c.ot[v], b = Math.round(g._t * i) + u, y = g.ut * a, S = m * a + u;
        t.moveTo(b, y), t.arc(b, y, S, 0, 2 * Math.PI);
      }
      t.fill();
    };
    c.ct > 0 && (t.fillStyle = c.dt, f(c.ft + c.ct)), t.fillStyle = c.vt, f(c.ft);
  }
}
function dj() {
  return { ot: [{ _t: 0, ut: 0, wt: 0, Mt: 0 }], vt: "", dt: "", ft: 0, ct: 0, lt: null };
}
const fj = { from: 0, to: 1 };
class mj {
  constructor(t, i, a) {
    this.gt = new m1(), this.bt = [], this.St = [], this.xt = !0, this.O = t, this.Ct = i, this.yt = a, this.gt.nt(this.bt);
  }
  kt(t) {
    this.Pt(), this.xt = !0;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = !1), this.gt;
  }
  Pt() {
    const t = this.yt.Dt();
    t.length !== this.bt.length && (this.St = t.map(dj), this.bt = this.St.map(((i) => {
      const a = new hj();
      return a.ht(i), a;
    })), this.gt.nt(this.bt));
  }
  Rt() {
    const t = this.Ct.N().mode === 2 || !this.Ct.It(), i = this.yt.Vt(), a = this.Ct.Bt(), r = this.O.Et();
    this.Pt(), i.forEach(((c, u) => {
      const f = this.St[u], m = c.At(a), v = c.Lt();
      !t && m !== null && c.It() && v !== null ? (f.vt = m.zt, f.ft = m.ft, f.ct = m.Ot, f.ot[0].Mt = m.Mt, f.ot[0].ut = c.Ft().Nt(m.Mt, v.Wt), f.dt = m.Ht ?? this.O.Ut(f.ot[0].ut / c.Ft().$t()), f.ot[0].wt = a, f.ot[0]._t = r.jt(a), f.lt = fj) : f.lt = null;
    }));
  }
}
class pj extends Os {
  constructor(t) {
    super(), this.qt = t;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const c = this.qt.Yt.It, u = this.qt.Kt.It;
    if (!c && !u) return;
    const f = Math.round(this.qt._t * a), m = Math.round(this.qt.ut * r);
    t.lineCap = "butt", c && f >= 0 && (t.lineWidth = Math.floor(this.qt.Yt.ct * a), t.strokeStyle = this.qt.Yt.R, t.fillStyle = this.qt.Yt.R, Jn(t, this.qt.Yt.Zt), (function(v, g, b, y) {
      v.beginPath();
      const S = v.lineWidth % 2 ? 0.5 : 0;
      v.moveTo(g + S, b), v.lineTo(g + S, y), v.stroke();
    })(t, f, 0, i.height)), u && m >= 0 && (t.lineWidth = Math.floor(this.qt.Kt.ct * r), t.strokeStyle = this.qt.Kt.R, t.fillStyle = this.qt.Kt.R, Jn(t, this.qt.Kt.Zt), d1(t, m, 0, i.width));
  }
}
class vj {
  constructor(t, i) {
    this.xt = !0, this.Gt = { Yt: { ct: 1, Zt: 0, R: "", It: !1 }, Kt: { ct: 1, Zt: 0, R: "", It: !1 }, _t: 0, ut: 0 }, this.Xt = new pj(this.Gt), this.Jt = t, this.yt = i;
  }
  kt() {
    this.xt = !0;
  }
  Tt(t) {
    return this.xt && (this.Rt(), this.xt = !1), this.Xt;
  }
  Rt() {
    const t = this.Jt.It(), i = this.yt.Qt().N().crosshair, a = this.Gt;
    if (i.mode === 2) return a.Kt.It = !1, void (a.Yt.It = !1);
    a.Kt.It = t && this.Jt.ti(this.yt), a.Yt.It = t && this.Jt.ii(), a.Kt.ct = i.horzLine.width, a.Kt.Zt = i.horzLine.style, a.Kt.R = i.horzLine.color, a.Yt.ct = i.vertLine.width, a.Yt.Zt = i.vertLine.style, a.Yt.R = i.vertLine.color, a._t = this.Jt.ni(), a.ut = this.Jt.si();
  }
}
function gc(s, t, i, a, r, c) {
  s.save(), s.globalCompositeOperation = "copy", s.fillStyle = c, s.fillRect(t, i, a, r), s.restore();
}
function s0(s, t, i, a, r, c) {
  s.beginPath(), s.roundRect ? s.roundRect(t, i, a, r, c) : (s.lineTo(t + a - c[1], i), c[1] !== 0 && s.arcTo(t + a, i, t + a, i + c[1], c[1]), s.lineTo(t + a, i + r - c[2]), c[2] !== 0 && s.arcTo(t + a, i + r, t + a - c[2], i + r, c[2]), s.lineTo(t + c[3], i + r), c[3] !== 0 && s.arcTo(t, i + r, t, i + r - c[3], c[3]), s.lineTo(t, i + c[0]), c[0] !== 0 && s.arcTo(t, i, t + c[0], i, c[0]));
}
function a0(s, t, i, a, r, c, u = 0, f = [0, 0, 0, 0], m = "") {
  if (s.save(), !u || !m || m === c) return s0(s, t, i, a, r, f), s.fillStyle = c, s.fill(), void s.restore();
  const v = u / 2;
  var g;
  s0(s, t + v, i + v, a - u, r - u, (g = -v, f.map(((b) => b === 0 ? b : b + g)))), c !== "transparent" && (s.fillStyle = c, s.fill()), m !== "transparent" && (s.lineWidth = u, s.strokeStyle = m, s.closePath(), s.stroke()), s.restore();
}
function p1(s, t, i, a, r, c, u) {
  s.save(), s.globalCompositeOperation = "copy";
  const f = s.createLinearGradient(0, 0, 0, r);
  f.addColorStop(0, c), f.addColorStop(1, u), s.fillStyle = f, s.fillRect(t, i, a, r), s.restore();
}
class l0 {
  constructor(t, i) {
    this.ht(t, i);
  }
  ht(t, i) {
    this.qt = t, this.ei = i;
  }
  $t(t, i) {
    return this.qt.It ? t.k + t.A + t.I : 0;
  }
  st(t, i, a, r) {
    if (!this.qt.It || this.qt.ri.length === 0) return;
    const c = this.qt.R, u = this.ei.G, f = t.useBitmapCoordinateSpace(((m) => {
      const v = m.context;
      v.font = i.P;
      const g = this.hi(m, i, a, r), b = g.ai;
      return g.li ? a0(v, b.oi, b._i, b.ui, b.ci, u, b.di, [b.ft, 0, 0, b.ft], u) : a0(v, b.fi, b._i, b.ui, b.ci, u, b.di, [0, b.ft, b.ft, 0], u), this.qt.pi && (v.fillStyle = c, v.fillRect(b.fi, b.mi, b.wi - b.fi, b.Mi)), this.qt.gi && (v.fillStyle = i.D, v.fillRect(g.li ? b.bi - b.di : 0, b._i, b.di, b.Si - b._i)), g;
    }));
    t.useMediaCoordinateSpace((({ context: m }) => {
      const v = f.xi;
      m.font = i.P, m.textAlign = f.li ? "right" : "left", m.textBaseline = "middle", m.fillStyle = c, m.fillText(this.qt.ri, v.Ci, (v._i + v.Si) / 2 + v.yi);
    }));
  }
  hi(t, i, a, r) {
    const { context: c, bitmapSize: u, mediaSize: f, horizontalPixelRatio: m, verticalPixelRatio: v } = t, g = this.qt.pi || !this.qt.ki ? i.C : 0, b = this.qt.Pi ? i.S : 0, y = i.A + this.ei.Ti, S = i.I + this.ei.Ri, w = i.V, M = i.B, N = this.qt.ri, k = i.k, T = a.Di(c, N), D = Math.ceil(a.Ii(c, N)), O = k + y + S, V = i.S + w + M + D + g, G = Math.max(1, Math.floor(v));
    let R = Math.round(O * v);
    R % 2 != G % 2 && (R += 1);
    const X = b > 0 ? Math.max(1, Math.floor(b * m)) : 0, P = Math.round(V * m), rt = Math.round(g * m), at = this.ei.Vi ?? this.ei.Bi ?? this.ei.Ei, F = Math.round(at * v) - Math.floor(0.5 * v), gt = Math.floor(F + G / 2 - R / 2), xt = gt + R, Ot = r === "right", L = Ot ? f.width - b : b, Z = Ot ? u.width - X : X;
    let it, dt, mt;
    return Ot ? (it = Z - P, dt = Z - rt, mt = L - g - w - b) : (it = Z + P, dt = Z + rt, mt = L + g + w), { li: Ot, ai: { _i: gt, mi: F, Si: xt, ui: P, ci: R, ft: 2 * m, di: X, oi: it, fi: Z, wi: dt, Mi: G, bi: u.width }, xi: { _i: gt / v, Si: xt / v, Ci: mt, yi: T } };
  }
}
class bc {
  constructor(t) {
    this.Ai = { Ei: 0, G: "#000", Ri: 0, Ti: 0 }, this.Li = { ri: "", It: !1, pi: !0, ki: !1, Ht: "", R: "#FFF", gi: !1, Pi: !1 }, this.zi = { ri: "", It: !1, pi: !1, ki: !0, Ht: "", R: "#FFF", gi: !0, Pi: !0 }, this.xt = !0, this.Oi = new (t || l0)(this.Li, this.Ai), this.Ni = new (t || l0)(this.zi, this.Ai);
  }
  ri() {
    return this.Fi(), this.Li.ri;
  }
  Ei() {
    return this.Fi(), this.Ai.Ei;
  }
  kt() {
    this.xt = !0;
  }
  $t(t, i = !1) {
    return Math.max(this.Oi.$t(t, i), this.Ni.$t(t, i));
  }
  Wi() {
    return this.Ai.Vi ?? null;
  }
  Hi() {
    return this.Ai.Vi ?? this.Ai.Bi ?? this.Ei();
  }
  Ui(t) {
    this.Ai.Bi = t ?? void 0;
  }
  $i() {
    return this.Fi(), this.Li.It || this.zi.It;
  }
  ji() {
    return this.Fi(), this.Li.It;
  }
  Tt(t) {
    return this.Fi(), this.Li.pi = this.Li.pi && t.N().ticksVisible, this.zi.pi = this.zi.pi && t.N().ticksVisible, this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Oi;
  }
  qi() {
    return this.Fi(), this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Ni;
  }
  Fi() {
    this.xt && (this.Li.pi = !0, this.zi.pi = !1, this.Yi(this.Li, this.zi, this.Ai));
  }
}
class gj extends bc {
  constructor(t, i, a) {
    super(), this.Jt = t, this.Ki = i, this.Zi = a;
  }
  Yi(t, i, a) {
    if (t.It = !1, this.Jt.N().mode === 2) return;
    const r = this.Jt.N().horzLine;
    if (!r.labelVisible) return;
    const c = this.Ki.Lt();
    if (!this.Jt.It() || this.Ki.Gi() || c === null) return;
    const u = this.Ki.Xi().Z(r.labelBackgroundColor);
    a.G = u.G, t.R = u.X;
    const f = 2 / 12 * this.Ki.k();
    a.Ti = f, a.Ri = f;
    const m = this.Zi(this.Ki);
    a.Ei = m.Ei, t.ri = this.Ki.Ji(m.Mt, c), t.It = !0;
  }
}
const bj = /[1-9]/g;
class v1 {
  constructor() {
    this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  st(t, i) {
    if (this.qt === null || this.qt.It === !1 || this.qt.ri.length === 0) return;
    const a = t.useMediaCoordinateSpace((({ context: y }) => (y.font = i.P, Math.round(i.Qi.Ii(y, W(this.qt).ri, bj)))));
    if (a <= 0) return;
    const r = i.tn, c = a + 2 * r, u = c / 2, f = this.qt.nn;
    let m = this.qt.Ei, v = Math.floor(m - u) + 0.5;
    v < 0 ? (m += Math.abs(0 - v), v = Math.floor(m - u) + 0.5) : v + c > f && (m -= Math.abs(f - (v + c)), v = Math.floor(m - u) + 0.5);
    const g = v + c, b = Math.ceil(0 + i.S + i.C + i.A + i.k + i.I);
    t.useBitmapCoordinateSpace((({ context: y, horizontalPixelRatio: S, verticalPixelRatio: w }) => {
      const M = W(this.qt);
      y.fillStyle = M.G;
      const N = Math.round(v * S), k = Math.round(0 * w), T = Math.round(g * S), D = Math.round(b * w), O = Math.round(2 * S);
      if (y.beginPath(), y.moveTo(N, k), y.lineTo(N, D - O), y.arcTo(N, D, N + O, D, O), y.lineTo(T - O, D), y.arcTo(T, D, T, D - O, O), y.lineTo(T, k), y.fill(), M.pi) {
        const V = Math.round(M.Ei * S), G = k, R = Math.round((G + i.C) * w);
        y.fillStyle = M.R;
        const X = Math.max(1, Math.floor(S)), P = Math.floor(0.5 * S);
        y.fillRect(V - P, G, X, R - G);
      }
    })), t.useMediaCoordinateSpace((({ context: y }) => {
      const S = W(this.qt), w = 0 + i.S + i.C + i.A + i.k / 2;
      y.font = i.P, y.textAlign = "left", y.textBaseline = "middle", y.fillStyle = S.R;
      const M = i.Qi.Di(y, "Apr0");
      y.translate(v + r, w + M), y.fillText(S.ri, 0, 0);
    }));
  }
}
class xj {
  constructor(t, i, a) {
    this.xt = !0, this.Xt = new v1(), this.Gt = { It: !1, G: "#4c525e", R: "white", ri: "", nn: 0, Ei: NaN, pi: !0 }, this.Ct = t, this.sn = i, this.Zi = a;
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = !1), this.Xt.ht(this.Gt), this.Xt;
  }
  Rt() {
    const t = this.Gt;
    if (t.It = !1, this.Ct.N().mode === 2) return;
    const i = this.Ct.N().vertLine;
    if (!i.labelVisible) return;
    const a = this.sn.Et();
    if (a.Gi()) return;
    t.nn = a.nn();
    const r = this.Zi();
    if (r === null) return;
    t.Ei = r.Ei;
    const c = a.en(this.Ct.Bt());
    t.ri = a.rn(W(c)), t.It = !0;
    const u = this.sn.Xi().Z(i.labelBackgroundColor);
    t.G = u.G, t.R = u.X, t.pi = a.N().ticksVisible;
  }
}
class g1 {
  constructor() {
    this.hn = null, this.an = 0;
  }
  ln() {
    return this.an;
  }
  _n(t) {
    this.an = t;
  }
  Ft() {
    return this.hn;
  }
  un(t) {
    this.hn = t;
  }
  cn(t) {
    return [];
  }
  dn() {
    return [];
  }
  It() {
    return !0;
  }
}
var Ed;
(function(s) {
  s[s.Normal = 0] = "Normal", s[s.Magnet = 1] = "Magnet", s[s.Hidden = 2] = "Hidden", s[s.MagnetOHLC = 3] = "MagnetOHLC";
})(Ed || (Ed = {}));
class yj extends g1 {
  constructor(t, i) {
    super(), this.yt = null, this.fn = NaN, this.pn = 0, this.vn = !1, this.mn = /* @__PURE__ */ new Map(), this.wn = !1, this.Mn = /* @__PURE__ */ new WeakMap(), this.gn = /* @__PURE__ */ new WeakMap(), this.bn = NaN, this.Sn = NaN, this.xn = NaN, this.Cn = NaN, this.sn = t, this.yn = i, this.kn = /* @__PURE__ */ ((r, c) => (u) => {
      const f = c(), m = r();
      if (u === W(this.yt).Pn()) return { Mt: m, Ei: f };
      {
        const v = W(u.Lt());
        return { Mt: u.Tn(f, v), Ei: f };
      }
    })((() => this.fn), (() => this.Sn));
    const a = /* @__PURE__ */ ((r, c) => () => {
      const u = this.sn.Et().Rn(r()), f = c();
      return u && Number.isFinite(f) ? { wt: u, Ei: f } : null;
    })((() => this.pn), (() => this.ni()));
    this.Dn = new xj(this, t, a);
  }
  N() {
    return this.yn;
  }
  In(t, i) {
    this.xn = t, this.Cn = i;
  }
  Vn() {
    this.xn = NaN, this.Cn = NaN;
  }
  Bn() {
    return this.xn;
  }
  En() {
    return this.Cn;
  }
  An(t, i, a) {
    this.wn || (this.wn = !0), this.vn = !0, this.Ln(t, i, a);
  }
  Bt() {
    return this.pn;
  }
  ni() {
    return this.bn;
  }
  si() {
    return this.Sn;
  }
  It() {
    return this.vn;
  }
  zn() {
    this.vn = !1, this.On(), this.fn = NaN, this.bn = NaN, this.Sn = NaN, this.yt = null, this.Vn(), this.Nn();
  }
  Fn(t) {
    if (!this.yn.doNotSnapToHiddenSeriesIndices) return t;
    const i = this.sn, a = i.Et();
    let r = null, c = null;
    for (const v of i.Wn()) {
      const g = v.Un().Hn(t, -1);
      if (g) {
        if (g.$n === t) return t;
        (r === null || g.$n > r) && (r = g.$n);
      }
      const b = v.Un().Hn(t, 1);
      if (b) {
        if (b.$n === t) return t;
        (c === null || b.$n < c) && (c = b.$n);
      }
    }
    const u = [r, c].filter(i0);
    if (u.length === 0) return t;
    const f = a.jt(t), m = u.map(((v) => Math.abs(f - a.jt(v))));
    return u[m.indexOf(Math.min(...m))];
  }
  jn(t) {
    let i = this.Mn.get(t);
    i || (i = new vj(this, t), this.Mn.set(t, i));
    let a = this.gn.get(t);
    return a || (a = new mj(this.sn, this, t), this.gn.set(t, a)), [i, a];
  }
  ti(t) {
    return t === this.yt && this.yn.horzLine.visible;
  }
  ii() {
    return this.yn.vertLine.visible;
  }
  qn(t, i) {
    this.vn && this.yt === t || this.mn.clear();
    const a = [];
    return this.yt === t && a.push(this.Yn(this.mn, i, this.kn)), a;
  }
  dn() {
    return this.vn ? [this.Dn] : [];
  }
  Kn() {
    return this.yt;
  }
  Nn() {
    this.sn.Zn().forEach(((t) => {
      this.Mn.get(t)?.kt(), this.gn.get(t)?.kt();
    })), this.mn.forEach(((t) => t.kt())), this.Dn.kt();
  }
  Gn(t) {
    return t && !t.Pn().Gi() ? t.Pn() : null;
  }
  Ln(t, i, a) {
    this.Xn(t, i, a) && this.Nn();
  }
  Xn(t, i, a) {
    const r = this.bn, c = this.Sn, u = this.fn, f = this.pn, m = this.yt, v = this.Gn(a);
    this.pn = t, this.bn = isNaN(t) ? NaN : this.sn.Et().jt(t), this.yt = a;
    const g = v !== null ? v.Lt() : null;
    return v !== null && g !== null ? (this.fn = i, this.Sn = v.Nt(i, g)) : (this.fn = NaN, this.Sn = NaN), r !== this.bn || c !== this.Sn || f !== this.pn || u !== this.fn || m !== this.yt;
  }
  On() {
    const t = this.sn.Jn().map(((a) => a.Un().Qn())).filter(i0), i = t.length === 0 ? null : Math.max(...t);
    this.pn = i !== null ? i : NaN;
  }
  Yn(t, i, a) {
    let r = t.get(i);
    return r === void 0 && (r = new gj(this, i, a), t.set(i, r)), r;
  }
}
function xc(s) {
  return s === "left" || s === "right";
}
class ye {
  constructor(t) {
    this.ts = /* @__PURE__ */ new Map(), this.ns = [], this.ss = t;
  }
  es(t, i) {
    const a = (function(r, c) {
      return r === void 0 ? c : { rs: Math.max(r.rs, c.rs), hs: r.hs || c.hs };
    })(this.ts.get(t), i);
    this.ts.set(t, a);
  }
  ls() {
    return this.ss;
  }
  _s(t) {
    const i = this.ts.get(t);
    return i === void 0 ? { rs: this.ss } : { rs: Math.max(this.ss, i.rs), hs: i.hs };
  }
  us() {
    this.cs(), this.ns = [{ ds: 0 }];
  }
  fs(t) {
    this.cs(), this.ns = [{ ds: 1, Wt: t }];
  }
  ps(t) {
    this.vs(), this.ns.push({ ds: 5, Wt: t });
  }
  cs() {
    this.vs(), this.ns.push({ ds: 6 });
  }
  ws() {
    this.cs(), this.ns = [{ ds: 4 }];
  }
  Ms(t) {
    this.cs(), this.ns.push({ ds: 2, Wt: t });
  }
  gs(t) {
    this.cs(), this.ns.push({ ds: 3, Wt: t });
  }
  bs() {
    return this.ns;
  }
  Ss(t) {
    for (const i of t.ns) this.xs(i);
    this.ss = Math.max(this.ss, t.ss), t.ts.forEach(((i, a) => {
      this.es(a, i);
    }));
  }
  static Cs() {
    return new ye(2);
  }
  static ys() {
    return new ye(3);
  }
  xs(t) {
    switch (t.ds) {
      case 0:
        this.us();
        break;
      case 1:
        this.fs(t.Wt);
        break;
      case 2:
        this.Ms(t.Wt);
        break;
      case 3:
        this.gs(t.Wt);
        break;
      case 4:
        this.ws();
        break;
      case 5:
        this.ps(t.Wt);
        break;
      case 6:
        this.vs();
    }
  }
  vs() {
    const t = this.ns.findIndex(((i) => i.ds === 5));
    t !== -1 && this.ns.splice(t, 1);
  }
}
class b1 {
  formatTickmarks(t) {
    return t.map(((i) => this.format(i)));
  }
}
const r0 = ".";
function pn(s, t) {
  if (!Oa(s)) return "n/a";
  if (!Jl(t)) throw new TypeError("invalid length");
  if (t < 0 || t > 16) throw new TypeError("invalid length");
  return t === 0 ? s.toString() : ("0000000000000000" + s.toString()).slice(-t);
}
class yc extends b1 {
  constructor(t, i) {
    if (super(), i || (i = 1), Oa(t) && Jl(t) || (t = 100), t < 0) throw new TypeError("invalid base");
    this.Ki = t, this.ks = i, this.Ps();
  }
  format(t) {
    const i = t < 0 ? "−" : "";
    return t = Math.abs(t), i + this.Ts(t);
  }
  Ps() {
    if (this.Rs = 0, this.Ki > 0 && this.ks > 0) {
      let t = this.Ki;
      for (; t > 1; ) t /= 10, this.Rs++;
    }
  }
  Ts(t) {
    const i = this.Ki / this.ks;
    let a = Math.floor(t), r = "";
    const c = this.Rs !== void 0 ? this.Rs : NaN;
    if (i > 1) {
      let u = +(Math.round(t * i) - a * i).toFixed(this.Rs);
      u >= i && (u -= i, a += 1), r = r0 + pn(+u.toFixed(this.Rs) * this.ks, c);
    } else a = Math.round(a * i) / i, c > 0 && (r = r0 + pn(0, c));
    return a.toFixed(0) + r;
  }
}
class x1 extends yc {
  constructor(t = 100) {
    super(t);
  }
  format(t) {
    return `${super.format(t)}%`;
  }
}
class wj extends b1 {
  constructor(t) {
    super(), this.Ds = t;
  }
  format(t) {
    let i = "";
    return t < 0 && (i = "-", t = -t), t < 995 ? i + this.Is(t) : t < 999995 ? i + this.Is(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), i + this.Is(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), i + this.Is(t / 1e9) + "B");
  }
  Is(t) {
    let i;
    const a = Math.pow(10, this.Ds);
    return i = (t = Math.round(t * a) / a) >= 1e-15 && t < 1 ? t.toFixed(this.Ds).replace(/\.?0+$/, "") : String(t), i.replace(/(\.[1-9]*)0+$/, ((r, c) => c));
  }
}
const _j = /[2-9]/g;
class sc {
  constructor(t = 50) {
    this.Vs = 0, this.Bs = 1, this.Es = 1, this.As = {}, this.Ls = /* @__PURE__ */ new Map(), this.zs = t;
  }
  Os() {
    this.Vs = 0, this.Ls.clear(), this.Bs = 1, this.Es = 1, this.As = {};
  }
  Ii(t, i, a) {
    return this.Ns(t, i, a).width;
  }
  Di(t, i, a) {
    const r = this.Ns(t, i, a);
    return ((r.actualBoundingBoxAscent || 0) - (r.actualBoundingBoxDescent || 0)) / 2;
  }
  Ns(t, i, a) {
    const r = a || _j, c = String(i).replace(r, "0");
    if (this.Ls.has(c)) return Ve(this.Ls.get(c)).Fs;
    if (this.Vs === this.zs) {
      const f = this.As[this.Es];
      delete this.As[this.Es], this.Ls.delete(f), this.Es++, this.Vs--;
    }
    t.save(), t.textBaseline = "middle";
    const u = t.measureText(c);
    return t.restore(), u.width === 0 && i.length || (this.Ls.set(c, { Fs: u, Ws: this.Bs }), this.As[this.Bs] = c, this.Vs++, this.Bs++), u;
  }
}
class Sj {
  constructor(t) {
    this.Hs = null, this.M = null, this.Us = "right", this.$s = t;
  }
  js(t, i, a) {
    this.Hs = t, this.M = i, this.Us = a;
  }
  st(t) {
    this.M !== null && this.Hs !== null && this.Hs.st(t, this.M, this.$s, this.Us);
  }
}
class y1 {
  constructor(t, i, a) {
    this.qs = t, this.$s = new sc(50), this.Ys = i, this.O = a, this.F = -1, this.Xt = new Sj(this.$s);
  }
  Tt() {
    const t = this.O.Ks(this.Ys);
    if (t === null) return null;
    const i = t.Zs(this.Ys) ? t.Gs() : this.Ys.Ft();
    if (i === null) return null;
    const a = t.Xs(i);
    if (a === "overlay") return null;
    const r = this.O.Js();
    return r.k !== this.F && (this.F = r.k, this.$s.Os()), this.Xt.js(this.qs.qi(), r, a), this.Xt;
  }
}
class Mj extends Os {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  Qs(t, i) {
    if (!this.qt?.It) return null;
    const { ut: a, ct: r, te: c } = this.qt;
    return i >= a - r - 7 && i <= a + r + 7 ? { ie: this.qt, ne: Math.abs(i - a), se: 2, ee: "price-line", te: c } : null;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null || this.qt.It === !1) return;
    const c = Math.round(this.qt.ut * r);
    c < 0 || c > i.height || (t.lineCap = "butt", t.strokeStyle = this.qt.R, t.lineWidth = Math.floor(this.qt.ct * a), Jn(t, this.qt.Zt), d1(t, c, 0, i.width));
  }
}
class uf {
  constructor(t) {
    this.re = { ut: 0, R: "rgba(0, 0, 0, 0)", ct: 1, Zt: 0, It: !1 }, this.he = new Mj(), this.xt = !0, this.ae = t, this.le = t.Qt(), this.he.ht(this.re);
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    return this.ae.It() ? (this.xt && (this.oe(), this.xt = !1), this.he) : null;
  }
}
class Nj extends uf {
  constructor(t) {
    super(t);
  }
  oe() {
    this.re.It = !1;
    const t = this.ae.Ft(), i = t._e()._e;
    if (i !== 2 && i !== 3) return;
    const a = this.ae.N();
    if (!a.baseLineVisible || !this.ae.It()) return;
    const r = this.ae.Lt();
    r !== null && (this.re.It = !0, this.re.ut = t.Nt(r.Wt, r.Wt), this.re.R = a.baseLineColor, this.re.ct = a.baseLineWidth, this.re.Zt = a.baseLineStyle);
  }
}
class jj extends Os {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  ue() {
    return this.qt;
  }
  et({ context: t, horizontalPixelRatio: i, verticalPixelRatio: a }) {
    const r = this.qt;
    if (r === null) return;
    const c = Math.max(1, Math.floor(i)), u = c % 2 / 2, f = Math.round(r.ce.x * i) + u, m = r.ce.y * a;
    t.fillStyle = r.de, t.beginPath();
    const v = Math.max(2, 1.5 * r.fe) * i;
    t.arc(f, m, v, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = r.pe, t.beginPath(), t.arc(f, m, r.ft * i, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = c, t.strokeStyle = r.ve, t.beginPath(), t.arc(f, m, r.ft * i + c / 2, 0, 2 * Math.PI, !1), t.stroke();
  }
}
const Cj = [{ me: 0, we: 0.25, Me: 4, ge: 10, be: 0.25, Se: 0, xe: 0.4, Ce: 0.8 }, { me: 0.25, we: 0.525, Me: 10, ge: 14, be: 0, Se: 0, xe: 0.8, Ce: 0 }, { me: 0.525, we: 1, Me: 14, ge: 14, be: 0, Se: 0, xe: 0, Ce: 0 }];
class kj {
  constructor(t) {
    this.Xt = new jj(), this.xt = !0, this.ye = !0, this.ke = performance.now(), this.Pe = this.ke - 1, this.Te = t;
  }
  Re() {
    this.Pe = this.ke - 1, this.kt();
  }
  De() {
    if (this.kt(), this.Te.N().lastPriceAnimation === 2) {
      const t = performance.now(), i = this.Pe - t;
      if (i > 0) return void (i < 650 && (this.Pe += 2600));
      this.ke = t, this.Pe = t + 2600;
    }
  }
  kt() {
    this.xt = !0;
  }
  Ie() {
    this.ye = !0;
  }
  It() {
    return this.Te.N().lastPriceAnimation !== 0;
  }
  Ve() {
    switch (this.Te.N().lastPriceAnimation) {
      case 0:
        return !1;
      case 1:
        return !0;
      case 2:
        return performance.now() <= this.Pe;
    }
  }
  Tt() {
    return this.xt ? (this.Rt(), this.xt = !1, this.ye = !1) : this.ye && (this.Be(), this.ye = !1), this.Xt;
  }
  Rt() {
    this.Xt.ht(null);
    const t = this.Te.Qt().Et(), i = t.Ee(), a = this.Te.Lt();
    if (i === null || a === null) return;
    const r = this.Te.Ae(!0);
    if (r.Le || !i.ze(r.$n)) return;
    const c = { x: t.jt(r.$n), y: this.Te.Ft().Nt(r.Mt, a.Wt) }, u = r.R, f = this.Te.N().lineWidth, m = this.Oe(this.Ne(), u);
    this.Xt.ht({ de: u, fe: f, pe: m.pe, ve: m.ve, ft: m.ft, ce: c });
  }
  Be() {
    const t = this.Xt.ue();
    if (t !== null) {
      const i = this.Oe(this.Ne(), t.de);
      t.pe = i.pe, t.ve = i.ve, t.ft = i.ft;
    }
  }
  Ne() {
    return this.Ve() ? performance.now() - this.ke : 2599;
  }
  Fe(t, i, a, r) {
    const c = a + (r - a) * i;
    return this.Te.Qt().Xi().Y(t, c);
  }
  Oe(t, i) {
    const a = t % 2600 / 2600;
    let r;
    for (const v of Cj) if (a >= v.me && a <= v.we) {
      r = v;
      break;
    }
    we(r !== void 0, "Last price animation internal logic error");
    const c = (a - r.me) / (r.we - r.me);
    return { pe: this.Fe(i, c, r.be, r.Se), ve: this.Fe(i, c, r.xe, r.Ce), ft: (u = c, f = r.Me, m = r.ge, f + (m - f) * u) };
    var u, f, m;
  }
}
class Ej extends uf {
  constructor(t) {
    super(t);
  }
  oe() {
    const t = this.re;
    t.It = !1;
    const i = this.ae.N();
    if (!i.priceLineVisible || !this.ae.It()) return;
    const a = this.ae.Ae(i.priceLineSource === 0);
    a.Le || (t.It = !0, t.ut = a.Ei, t.R = this.ae.We(a.R), t.ct = i.priceLineWidth, t.Zt = i.priceLineStyle);
  }
}
class zj extends bc {
  constructor(t) {
    super(), this.Jt = t;
  }
  Yi(t, i, a) {
    t.It = !1, i.It = !1;
    const r = this.Jt;
    if (!r.It()) return;
    const c = r.N(), u = c.lastValueVisible, f = r.He() !== "", m = c.seriesLastValueMode === 0, v = r.Ae(!1);
    if (v.Le) return;
    u && (t.ri = this.Ue(v, u, m), t.It = t.ri.length !== 0), (f || m) && (i.ri = this.$e(v, u, f, m), i.It = i.ri.length > 0);
    const g = r.We(v.R), b = this.Jt.Qt().Xi().Z(g);
    a.G = b.G, a.Ei = v.Ei, i.Ht = r.Qt().Ut(v.Ei / r.Ft().$t()), t.Ht = g, t.R = b.X, i.R = b.X;
  }
  $e(t, i, a, r) {
    let c = "";
    const u = this.Jt.He();
    return a && u.length !== 0 && (c += `${u} `), i && r && (c += this.Jt.Ft().je() ? t.qe : t.Ye), c.trim();
  }
  Ue(t, i, a) {
    return i ? a ? this.Jt.Ft().je() ? t.Ye : t.qe : t.ri : "";
  }
}
function o0(s, t, i, a) {
  const r = Number.isFinite(t), c = Number.isFinite(i);
  return r && c ? s(t, i) : r || c ? r ? t : i : a;
}
class ke {
  constructor(t, i) {
    this.Ke = t, this.Ze = i;
  }
  Ge(t) {
    return t !== null && this.Ke === t.Ke && this.Ze === t.Ze;
  }
  Xe() {
    return new ke(this.Ke, this.Ze);
  }
  Je() {
    return this.Ke;
  }
  Qe() {
    return this.Ze;
  }
  tr() {
    return this.Ze - this.Ke;
  }
  Gi() {
    return this.Ze === this.Ke || Number.isNaN(this.Ze) || Number.isNaN(this.Ke);
  }
  Ss(t) {
    return t === null ? this : new ke(o0(Math.min, this.Je(), t.Je(), -1 / 0), o0(Math.max, this.Qe(), t.Qe(), 1 / 0));
  }
  ir(t) {
    if (!Oa(t) || this.Ze - this.Ke === 0) return;
    const i = 0.5 * (this.Ze + this.Ke);
    let a = this.Ze - i, r = this.Ke - i;
    a *= t, r *= t, this.Ze = i + a, this.Ke = i + r;
  }
  nr(t) {
    Oa(t) && (this.Ze += t, this.Ke += t);
  }
  sr() {
    return { minValue: this.Ke, maxValue: this.Ze };
  }
  static er(t) {
    return t === null ? null : new ke(t.minValue, t.maxValue);
  }
}
class ac {
  constructor(t, i) {
    this.rr = t, this.hr = i || null;
  }
  ar() {
    return this.rr;
  }
  lr() {
    return this.hr;
  }
  sr() {
    return { priceRange: this.rr === null ? null : this.rr.sr(), margins: this.hr || void 0 };
  }
  static er(t) {
    return t === null ? null : new ac(ke.er(t.priceRange), t.margins);
  }
}
const Tj = [2, 4, 8, 16, 32, 64, 128, 256, 512], Aj = "Custom series with conflation reducer must have a priceValueBuilder method";
class Oj extends uf {
  constructor(t, i) {
    super(t), this._r = i;
  }
  oe() {
    const t = this.re;
    t.It = !1;
    const i = this._r.N();
    if (!this.ae.It() || !i.lineVisible) return;
    const a = this._r.ur();
    a !== null && (t.It = !0, t.ut = a, t.R = i.color, t.ct = i.lineWidth, t.Zt = i.lineStyle, t.te = this._r.N().id);
  }
}
class Dj extends bc {
  constructor(t, i) {
    super(), this.Te = t, this._r = i;
  }
  Yi(t, i, a) {
    t.It = !1, i.It = !1;
    const r = this._r.N(), c = r.axisLabelVisible, u = r.title !== "", f = this.Te;
    if (!c || !f.It()) return;
    const m = this._r.ur();
    if (m === null) return;
    u && (i.ri = r.title, i.It = !0), i.Ht = f.Qt().Ut(m / f.Ft().$t()), t.ri = this.cr(r.price), t.It = !0;
    const v = this.Te.Qt().Xi().Z(r.axisLabelColor || r.color);
    a.G = v.G;
    const g = r.axisLabelTextColor || v.X;
    t.R = g, i.R = g, a.Ei = m;
  }
  cr(t) {
    const i = this.Te.Lt();
    return i === null ? "" : this.Te.Ft().Ji(t, i.Wt);
  }
}
class Rj {
  constructor(t, i) {
    this.Te = t, this.yn = i, this.dr = new Oj(t, this), this.qs = new Dj(t, this), this.pr = new y1(this.qs, t, t.Qt());
  }
  vr(t) {
    Pe(this.yn, t), this.kt(), this.Te.Qt().mr();
  }
  N() {
    return this.yn;
  }
  wr() {
    return this.dr;
  }
  Mr() {
    return this.pr;
  }
  gr() {
    return this.qs;
  }
  kt() {
    this.dr.kt(), this.qs.kt();
  }
  ur() {
    const t = this.Te, i = t.Ft();
    if (t.Qt().Et().Gi() || i.Gi()) return null;
    const a = t.Lt();
    return a === null ? null : i.Nt(this.yn.price, a.Wt);
  }
}
class Lj {
  constructor() {
    this.br = /* @__PURE__ */ new WeakMap();
  }
  Sr(t, i, a) {
    const r = 1 / i * a;
    if (t >= r) return 1;
    const c = r / t, u = Math.pow(2, Math.floor(Math.log2(c)));
    return Math.min(u, 512);
  }
  Cr(t, i, a, r = !1, c) {
    if (t.length === 0 || i <= 1) return t;
    const u = this.yr(i);
    if (u <= 1) return t;
    const f = this.kr(t);
    let m = f.Pr.get(u);
    return m !== void 0 || (m = this.Tr(t, u, a, r, c, f.Pr), f.Pr.set(u, m)), m;
  }
  Rr(t, i, a, r, c = !1, u) {
    if (a < 1 || t.length === 0) return t;
    const f = this.kr(t), m = f.Pr.get(a);
    if (!m) return this.Cr(t, a, r, c, u);
    const v = this.Dr(t, i, a, m, c, r, u);
    return f.Pr.set(a, v), v;
  }
  yr(t) {
    if (t <= 2) return 2;
    for (const i of Tj) if (t <= i) return i;
    return 512;
  }
  Ir(t) {
    if (t.length === 0) return 0;
    const i = t[0], a = t[t.length - 1];
    return 31 * t.length + 17 * i.$n + 13 * a.$n;
  }
  Tr(t, i, a, r = !1, c, u = /* @__PURE__ */ new Map()) {
    if (i === 2) return this.Vr(t, 2, a, r, c);
    const f = i / 2;
    let m = u.get(f);
    return m || (m = this.Tr(t, f, a, r, c, u), u.set(f, m)), this.Br(m, a, r, c);
  }
  Vr(t, i, a, r = !1, c) {
    const u = this.Er(t, i, a, r, c);
    return this.Ar(u, r);
  }
  Br(t, i, a = !1, r) {
    const c = this.Er(t, 2, i, a, r);
    return this.Ar(c, a);
  }
  Er(t, i, a, r = !1, c) {
    const u = [];
    for (let f = 0; f < t.length; f += i)
      if (t.length - f >= i) {
        const m = this.Lr(t[f], t[f + 1], a, r, c);
        m.zr = !1, u.push(m);
      } else if (u.length === 0) u.push(this.Or(t[f], !0));
      else {
        const m = u[u.length - 1];
        u[u.length - 1] = this.Nr(m, t[f], a, r, c);
      }
    return u;
  }
  Fr(t, i) {
    return (t ?? 1) + (i ?? 1);
  }
  Lr(t, i, a, r = !1, c) {
    if (!r || !a || !c) {
      const v = t.Wt[1] > i.Wt[1] ? t.Wt[1] : i.Wt[1], g = t.Wt[2] < i.Wt[2] ? t.Wt[2] : i.Wt[2];
      return { Wr: t.$n, Hr: i.$n, Ur: t.wt, $r: i.wt, jr: t.Wt[0], qr: v, Yr: g, Kr: i.Wt[3], Zr: this.Fr(t.Zr, i.Zr), Gr: void 0, zr: !1 };
    }
    const u = a(this.Xr(t, c), this.Xr(i, c)), f = c(u), m = f.length ? f[f.length - 1] : 0;
    return { Wr: t.$n, Hr: i.$n, Ur: t.wt, $r: i.wt, jr: t.Wt[0], qr: Math.max(t.Wt[1], m), Yr: Math.min(t.Wt[2], m), Kr: m, Zr: this.Fr(t.Zr, i.Zr), Gr: u, zr: !1 };
  }
  Nr(t, i, a, r = !1, c) {
    if (!r || !a || !c) return { Wr: t.Wr, Hr: i.$n, Ur: t.Ur, $r: i.wt, jr: t.jr, qr: t.qr > i.Wt[1] ? t.qr : i.Wt[1], Yr: t.Yr < i.Wt[2] ? t.Yr : i.Wt[2], Kr: i.Wt[3], Zr: t.Zr + (i.Zr ?? 1), Gr: t.Gr, zr: !1 };
    const u = t.Gr, f = this.Xr(i, c), m = u ? { data: u, index: t.Wr, originalTime: t.Ur, time: t.Ur, priceValues: c(u) } : null, v = m ? a(m, f) : f.data, g = m ? c(v) : f.priceValues, b = g.length ? g[g.length - 1] : 0;
    return { Wr: t.Wr, Hr: i.$n, Ur: t.Ur, $r: i.wt, jr: t.jr, qr: Math.max(t.qr, b), Yr: Math.min(t.Yr, b), Kr: b, Zr: t.Zr + (i.Zr ?? 1), Gr: v, zr: !1 };
  }
  Jr(t, i, a, r, c, u, f = !1, m) {
    const v = i === r ? c : t[i];
    if (a - i == 1) return this.Or(v, !0);
    const g = i + 1 === r ? c : t[i + 1];
    let b = this.Lr(v, g, u, f, m);
    for (let y = i + 2; y < a; y++) {
      const S = y === r ? c : t[y];
      b = this.Nr(b, S, u, f, m);
    }
    return b;
  }
  Xr(t, i) {
    const a = t.ue ?? {};
    return { data: t.ue, index: t.$n, originalTime: t.Qr, time: t.wt, priceValues: i(a) };
  }
  th(t, i = !1) {
    const a = i === !0, r = !!t.Gr;
    return { $n: t.Wr, wt: t.Ur, Qr: t.Ur, Wt: [a ? t.Kr : t.jr, t.qr, t.Yr, t.Kr], Zr: t.Zr, ue: a ? r ? t.Gr : { wt: t.Ur } : void 0 };
  }
  Ar(t, i = !1) {
    return t.map(((a) => this.th(a, i)));
  }
  Dr(t, i, a, r, c = !1, u, f) {
    if (r.length === 0) return r;
    const m = t.length - 1, v = Math.floor(m / a) * a;
    if (Math.min(v + a, t.length) - v < a && t.length > a) {
      const g = t.slice();
      return g[g.length - 1] = i, this.Cr(g, a, u, c, f);
    }
    if (Math.floor((m - 1) / a) === Math.floor(m / a) || r.length === 1) {
      const g = Math.min(v + a, t.length), b = g - v;
      if (b <= 0) return r;
      const y = b === 1 ? this.Or(v === m ? i : t[v], !0) : this.Jr(t, v, g, m, i, u, c, f);
      return r[r.length - 1] = this.th(y, c), r;
    }
    {
      const g = t.slice();
      return g[g.length - 1] = i, this.Cr(g, a, u, c, f);
    }
  }
  Or(t, i = !1) {
    return { Wr: t.$n, Hr: t.$n, Ur: t.wt, $r: t.wt, jr: t.Wt[0], qr: t.Wt[1], Yr: t.Wt[2], Kr: t.Wt[3], Zr: t.Zr ?? 1, Gr: t.ue, zr: i };
  }
  kr(t) {
    const i = this.ih(t), a = this.Ir(t);
    return i.nh !== a && (i.Pr.clear(), i.nh = a), i;
  }
  ih(t) {
    let i = this.br.get(t);
    return i === void 0 && (i = { nh: this.Ir(t), Pr: /* @__PURE__ */ new Map() }, this.br.set(t, i)), i;
  }
}
class Bj extends g1 {
  constructor(t) {
    super(), this.sn = t;
  }
  Qt() {
    return this.sn;
  }
}
const Uj = { Bar: (s, t, i, a) => {
  const r = t.upColor, c = t.downColor, u = W(s(i, a)), f = Kn(u.Wt[0]) <= Kn(u.Wt[3]);
  return { sh: u.R ?? (f ? r : c) };
}, Candlestick: (s, t, i, a) => {
  const r = t.upColor, c = t.downColor, u = t.borderUpColor, f = t.borderDownColor, m = t.wickUpColor, v = t.wickDownColor, g = W(s(i, a)), b = Kn(g.Wt[0]) <= Kn(g.Wt[3]);
  return { sh: g.R ?? (b ? r : c), eh: g.Ht ?? (b ? u : f), rh: g.hh ?? (b ? m : v) };
}, Custom: (s, t, i, a) => ({ sh: W(s(i, a)).R ?? t.color }), Area: (s, t, i, a) => {
  const r = W(s(i, a));
  return { sh: r.vt ?? t.lineColor, vt: r.vt ?? t.lineColor, ah: r.ah ?? t.topColor, oh: r.oh ?? t.bottomColor };
}, Baseline: (s, t, i, a) => {
  const r = W(s(i, a));
  return { sh: r.Wt[3] >= t.baseValue.price ? t.topLineColor : t.bottomLineColor, _h: r._h ?? t.topLineColor, uh: r.uh ?? t.bottomLineColor, dh: r.dh ?? t.topFillColor1, fh: r.fh ?? t.topFillColor2, ph: r.ph ?? t.bottomFillColor1, mh: r.mh ?? t.bottomFillColor2 };
}, Line: (s, t, i, a) => {
  const r = W(s(i, a));
  return { sh: r.R ?? t.color, vt: r.R ?? t.color };
}, Histogram: (s, t, i, a) => ({ sh: W(s(i, a)).R ?? t.color }) };
class Hj {
  constructor(t) {
    this.wh = (i, a) => a !== void 0 ? a.Wt : this.Te.Un().Mh(i), this.Te = t, this.gh = Uj[t.bh()];
  }
  Sh(t, i) {
    return this.gh(this.wh, this.Te.N(), t, i);
  }
}
function w1(s, t, i, a, r = 0, c = t.length) {
  let u = c - r;
  for (; 0 < u; ) {
    const f = u >> 1, m = r + f;
    a(t[m], i) === s ? (r = m + 1, u -= f + 1) : u = f;
  }
  return r;
}
const ks = w1.bind(null, !0), hf = w1.bind(null, !1);
var c0;
(function(s) {
  s[s.NearestLeft = -1] = "NearestLeft", s[s.None = 0] = "None", s[s.NearestRight = 1] = "NearestRight";
})(c0 || (c0 = {}));
const Qn = 30;
class qj {
  constructor() {
    this.xh = [], this.Ch = /* @__PURE__ */ new Map(), this.yh = /* @__PURE__ */ new Map(), this.kh = [];
  }
  Ph() {
    return this.Th() > 0 ? this.xh[this.xh.length - 1] : null;
  }
  Rh() {
    return this.Th() > 0 ? this.Dh(0) : null;
  }
  Qn() {
    return this.Th() > 0 ? this.Dh(this.xh.length - 1) : null;
  }
  Th() {
    return this.xh.length;
  }
  Gi() {
    return this.Th() === 0;
  }
  ze(t) {
    return this.Ih(t, 0) !== null;
  }
  Mh(t) {
    return this.Hn(t);
  }
  Hn(t, i = 0) {
    const a = this.Ih(t, i);
    return a === null ? null : { ...this.Vh(a), $n: this.Dh(a) };
  }
  Bh() {
    return this.xh;
  }
  Eh(t, i, a) {
    if (this.Gi()) return null;
    let r = null;
    for (const c of a)
      r = To(r, this.Ah(t, i, c));
    return r;
  }
  ht(t) {
    this.yh.clear(), this.Ch.clear(), this.xh = t, this.kh = t.map(((i) => i.$n));
  }
  Lh() {
    return this.kh;
  }
  Dh(t) {
    return this.xh[t].$n;
  }
  Vh(t) {
    return this.xh[t];
  }
  Ih(t, i) {
    const a = this.zh(t);
    if (a === null && i !== 0) switch (i) {
      case -1:
        return this.Oh(t);
      case 1:
        return this.Nh(t);
      default:
        throw new TypeError("Unknown search mode");
    }
    return a;
  }
  Oh(t) {
    let i = this.Fh(t);
    return i > 0 && (i -= 1), i !== this.xh.length && this.Dh(i) < t ? i : null;
  }
  Nh(t) {
    const i = this.Wh(t);
    return i !== this.xh.length && t < this.Dh(i) ? i : null;
  }
  zh(t) {
    const i = this.Fh(t);
    return i === this.xh.length || t < this.xh[i].$n ? null : i;
  }
  Fh(t) {
    return ks(this.xh, t, ((i, a) => i.$n < a));
  }
  Wh(t) {
    return hf(this.xh, t, ((i, a) => i.$n > a));
  }
  Hh(t, i, a) {
    let r = null;
    for (let c = t; c < i; c++) {
      const u = this.xh[c].Wt[a];
      Number.isNaN(u) || (r === null ? r = { Uh: u, $h: u } : (u < r.Uh && (r.Uh = u), u > r.$h && (r.$h = u)));
    }
    return r;
  }
  Ah(t, i, a) {
    if (this.Gi()) return null;
    let r = null;
    const c = W(this.Rh()), u = W(this.Qn()), f = Math.max(t, c), m = Math.min(i, u), v = Math.ceil(f / Qn) * Qn, g = Math.max(v, Math.floor(m / Qn) * Qn);
    {
      const y = this.Fh(f), S = this.Wh(Math.min(m, v, i));
      r = To(r, this.Hh(y, S, a));
    }
    let b = this.Ch.get(a);
    b === void 0 && (b = /* @__PURE__ */ new Map(), this.Ch.set(a, b));
    for (let y = Math.max(v + 1, f); y < g; y += Qn) {
      const S = Math.floor(y / Qn);
      let w = b.get(S);
      if (w === void 0) {
        const M = this.Fh(S * Qn), N = this.Wh((S + 1) * Qn - 1);
        w = this.Hh(M, N, a), b.set(S, w);
      }
      r = To(r, w);
    }
    {
      const y = this.Fh(g), S = this.Wh(m);
      r = To(r, this.Hh(y, S, a));
    }
    return r;
  }
}
function To(s, t) {
  return s === null ? t : t === null ? s : { Uh: Math.min(s.Uh, t.Uh), $h: Math.max(s.$h, t.$h) };
}
function Ih() {
  return new qj();
}
const lc = { setLineStyle: Jn };
class $j {
  constructor(t) {
    this.jh = t;
  }
  st(t, i, a) {
    this.jh.draw(t, lc);
  }
  qh(t, i, a) {
    this.jh.drawBackground?.(t, lc);
  }
}
class Qj {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const i = new $j(t);
    return this.Ls = { Kh: t, Zh: i }, i;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
class _1 {
  constructor(t) {
    this.Xh = null, this.Jh = t;
  }
  Qh() {
    return this.Jh;
  }
  Nn() {
    this.Jh.updateAllViews?.();
  }
  jn() {
    const t = this.Jh.paneViews?.() ?? [];
    if (this.Xh?.Kh === t) return this.Xh.Zh;
    const i = t.map(((a) => new Qj(a)));
    return this.Xh = { Kh: t, Zh: i }, i;
  }
  Qs(t, i) {
    return this.Jh.hitTest?.(t, i) ?? null;
  }
}
let Vj = class extends _1 {
  cn() {
    return [];
  }
};
class Yj {
  constructor(t) {
    this.jh = t;
  }
  st(t, i, a) {
    this.jh.draw(t, lc);
  }
  qh(t, i, a) {
    this.jh.drawBackground?.(t, lc);
  }
}
class u0 {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const i = new Yj(t);
    return this.Ls = { Kh: t, Zh: i }, i;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
function S1(s) {
  return { ri: s.text(), Ei: s.coordinate(), Vi: s.fixedCoordinate?.(), R: s.textColor(), G: s.backColor(), It: s.visible?.() ?? !0, pi: s.tickVisible?.() ?? !0 };
}
class Gj {
  constructor(t, i) {
    this.Xt = new v1(), this.ta = t, this.ia = i;
  }
  Tt() {
    return this.Xt.ht({ nn: this.ia.nn(), ...S1(this.ta) }), this.Xt;
  }
}
class Kj extends bc {
  constructor(t, i) {
    super(), this.ta = t, this.Ki = i;
  }
  Yi(t, i, a) {
    const r = S1(this.ta);
    a.G = r.G, t.R = r.R;
    const c = 2 / 12 * this.Ki.k();
    a.Ti = c, a.Ri = c, a.Ei = r.Ei, a.Vi = r.Vi, t.ri = r.ri, t.It = r.It, t.pi = r.pi;
  }
}
class Xj extends _1 {
  constructor(t, i) {
    super(t), this.na = null, this.sa = null, this.ea = null, this.ra = null, this.Te = i;
  }
  dn() {
    const t = this.Jh.timeAxisViews?.() ?? [];
    if (this.na?.Kh === t) return this.na.Zh;
    const i = this.Te.Qt().Et(), a = t.map(((r) => new Gj(r, i)));
    return this.na = { Kh: t, Zh: a }, a;
  }
  qn() {
    const t = this.Jh.priceAxisViews?.() ?? [];
    if (this.sa?.Kh === t) return this.sa.Zh;
    const i = this.Te.Ft(), a = t.map(((r) => new Kj(r, i)));
    return this.sa = { Kh: t, Zh: a }, a;
  }
  ha() {
    const t = this.Jh.priceAxisPaneViews?.() ?? [];
    if (this.ea?.Kh === t) return this.ea.Zh;
    const i = t.map(((a) => new u0(a)));
    return this.ea = { Kh: t, Zh: i }, i;
  }
  aa() {
    const t = this.Jh.timeAxisPaneViews?.() ?? [];
    if (this.ra?.Kh === t) return this.ra.Zh;
    const i = t.map(((a) => new u0(a)));
    return this.ra = { Kh: t, Zh: i }, i;
  }
  la(t, i) {
    return this.Jh.autoscaleInfo?.(t, i) ?? null;
  }
}
function Fh(s, t, i, a) {
  s.forEach(((r) => {
    t(r).forEach(((c) => {
      c.Gh() === i && a.push(c);
    }));
  }));
}
function Jh(s) {
  return s.jn();
}
function Zj(s) {
  return s.ha();
}
function Wj(s) {
  return s.aa();
}
const Ij = ["Area", "Line", "Baseline"];
class wc extends Bj {
  constructor(t, i, a, r, c) {
    super(t), this.qt = Ih(), this.dr = new Ej(this), this.oa = [], this._a = new Nj(this), this.ua = null, this.ca = null, this.da = null, this.fa = [], this.pa = new Lj(), this.va = /* @__PURE__ */ new Map(), this.ma = null, this.yn = a, this.wa = i;
    const u = new zj(this);
    if (this.mn = [u], this.pr = new y1(u, this, t), Ij.includes(this.wa) && (this.ua = new kj(this)), this.Ma(), this.Yh = r(this, this.Qt(), c), this.wa === "Custom") {
      const f = this.Yh;
      f.ga && this.ba(f.ga);
    }
  }
  m() {
    this.da !== null && clearTimeout(this.da);
  }
  We(t) {
    return this.yn.priceLineColor || t;
  }
  Ae(t) {
    const i = { Le: !0 }, a = this.Ft();
    if (this.Qt().Et().Gi() || a.Gi() || this.qt.Gi()) return i;
    const r = this.Qt().Et().Ee(), c = this.Lt();
    if (r === null || c === null) return i;
    let u, f;
    if (t) {
      const b = this.qt.Ph();
      if (b === null) return i;
      u = b, f = b.$n;
    } else {
      const b = this.qt.Hn(r.bi(), -1);
      if (b === null || (u = this.qt.Mh(b.$n), u === null)) return i;
      f = b.$n;
    }
    const m = u.Wt[3], v = this.Sa().Sh(f, { Wt: u }), g = a.Nt(m, c.Wt);
    return { Le: !1, Mt: m, ri: a.Ji(m, c.Wt), qe: a.xa(m), Ye: a.Ca(m, c.Wt), R: v.sh, Ei: g, $n: f };
  }
  Sa() {
    return this.ca !== null || (this.ca = new Hj(this)), this.ca;
  }
  N() {
    return this.yn;
  }
  vr(t) {
    const i = this.Qt(), { priceScaleId: a, visible: r, priceFormat: c } = t;
    a !== void 0 && a !== this.yn.priceScaleId && i.ya(this, a), r !== void 0 && r !== this.yn.visible && i.ka();
    const u = t.conflationThresholdFactor !== void 0;
    Pe(this.yn, t), u && (this.va.clear(), this.Qt().mr()), c !== void 0 && (this.Ma(), i.Pa()), i.Ta(this), i.Ra(), this.Yh.kt("options");
  }
  ht(t, i) {
    this.qt.ht(t), this.va.clear();
    const a = this.Qt().Et().N();
    a.enableConflation && a.precomputeConflationOnInit && this.Da(a.precomputeConflationPriority), this.Yh.kt("data"), this.ua !== null && (i && i.Ia ? this.ua.De() : t.length === 0 && this.ua.Re());
    const r = this.Qt().Ks(this);
    this.Qt().Va(r), this.Qt().Ta(this), this.Qt().Ra(), this.Qt().mr();
  }
  Ba(t) {
    const i = new Rj(this, t);
    return this.oa.push(i), this.Qt().Ta(this), i;
  }
  Ea(t) {
    const i = this.oa.indexOf(t);
    i !== -1 && this.oa.splice(i, 1), this.Qt().Ta(this);
  }
  Aa() {
    return this.oa;
  }
  bh() {
    return this.wa;
  }
  Lt() {
    const t = this.La();
    return t === null ? null : { Wt: t.Wt[3], za: t.wt };
  }
  La() {
    const t = this.Qt().Et().Ee();
    if (t === null) return null;
    const i = t.Oa();
    return this.qt.Hn(i, 1);
  }
  Un() {
    return this.qt;
  }
  ba(t) {
    this.ma = t, this.va.clear();
  }
  Na() {
    return !!this.Qt().Et().N().enableConflation && this.Fa() > 1;
  }
  Rr(t) {
    if (!this.Na()) return;
    const i = this.Fa();
    if (!this.va.has(i)) return;
    const a = this.wa === "Custom", r = a && this.ma || void 0, c = a && this.Yh.Wa ? (m) => {
      const v = m, g = this.Yh.Wa(v);
      return Array.isArray(g) ? g : [typeof g == "number" ? g : 0];
    } : void 0, u = this.pa.Rr(this.qt.Bh(), t, i, r, a, c), f = Ih();
    f.ht(u), this.va.set(i, f);
  }
  Ha() {
    const t = this.Qt().Et().N().enableConflation;
    if (this.wa === "Custom" && this.ma === null) return this.qt;
    if (!t) return this.qt;
    const i = this.Fa(), a = this.va.get(i);
    return a || (this.Ua(i), this.va.get(i) ?? this.qt);
  }
  $a(t) {
    const i = this.qt.Mh(t);
    return i === null ? null : this.wa === "Bar" || this.wa === "Candlestick" || this.wa === "Custom" ? { jr: i.Wt[0], qr: i.Wt[1], Yr: i.Wt[2], Kr: i.Wt[3] } : i.Wt[3];
  }
  ja(t) {
    const i = [];
    Fh(this.fa, Jh, "top", i);
    const a = this.ua;
    return a !== null && a.It() && (this.da === null && a.Ve() && (this.da = setTimeout((() => {
      this.da = null, this.Qt().qa();
    }), 0)), a.Ie(), i.unshift(a)), i;
  }
  jn() {
    const t = [];
    this.Ya() || t.push(this._a), t.push(this.Yh, this.dr);
    const i = this.oa.map(((a) => a.wr()));
    return t.push(...i), Fh(this.fa, Jh, "normal", t), t;
  }
  Ka() {
    return this.Za(Jh, "bottom");
  }
  Ga(t) {
    return this.Za(Zj, t);
  }
  Xa(t) {
    return this.Za(Wj, t);
  }
  Ja(t, i) {
    return this.fa.map(((a) => a.Qs(t, i))).filter(((a) => a !== null));
  }
  cn() {
    return [this.pr, ...this.oa.map(((t) => t.Mr()))];
  }
  qn(t, i) {
    if (i !== this.hn && !this.Ya()) return [];
    const a = [...this.mn];
    for (const r of this.oa) a.push(r.gr());
    return this.fa.forEach(((r) => {
      a.push(...r.qn());
    })), a;
  }
  dn() {
    const t = [];
    return this.fa.forEach(((i) => {
      t.push(...i.dn());
    })), t;
  }
  la(t, i) {
    if (this.yn.autoscaleInfoProvider !== void 0) {
      const a = this.yn.autoscaleInfoProvider((() => {
        const r = this.Qa(t, i);
        return r === null ? null : r.sr();
      }));
      return ac.er(a);
    }
    return this.Qa(t, i);
  }
  Kh() {
    const t = this.yn.priceFormat;
    return t.base ?? 1 / t.minMove;
  }
  tl() {
    return this.il;
  }
  Nn() {
    this.Yh.kt();
    for (const t of this.mn) t.kt();
    for (const t of this.oa) t.kt();
    this.dr.kt(), this._a.kt(), this.ua?.kt(), this.fa.forEach(((t) => t.Nn()));
  }
  Ft() {
    return W(super.Ft());
  }
  At(t) {
    if (!((this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline") && this.yn.crosshairMarkerVisible)) return null;
    const i = this.qt.Mh(t);
    return i === null ? null : { Mt: i.Wt[3], ft: this.nl(), Ht: this.sl(), Ot: this.el(), zt: this.rl(t) };
  }
  He() {
    return this.yn.title;
  }
  It() {
    return this.yn.visible;
  }
  hl(t) {
    this.fa.push(new Xj(t, this));
  }
  al(t) {
    this.fa = this.fa.filter(((i) => i.Qh() !== t));
  }
  ll() {
    if (this.wa === "Custom") return (t) => this.Yh.Wa(t);
  }
  ol() {
    if (this.wa === "Custom") return (t) => this.Yh._l(t);
  }
  ul() {
    return this.qt.Lh();
  }
  Ya() {
    return !xc(this.Ft().cl());
  }
  Qa(t, i) {
    if (!Jl(t) || !Jl(i) || this.qt.Gi()) return null;
    const a = this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline" || this.wa === "Histogram" ? [3] : [2, 1], r = this.qt.Eh(t, i, a);
    let c = r !== null ? new ke(r.Uh, r.$h) : null, u = null;
    if (this.bh() === "Histogram") {
      const f = this.yn.base, m = new ke(f, f);
      c = c !== null ? c.Ss(m) : m;
    }
    return this.fa.forEach(((f) => {
      const m = f.la(t, i);
      if (m?.priceRange) {
        const v = new ke(m.priceRange.minValue, m.priceRange.maxValue);
        c = c !== null ? c.Ss(v) : v;
      }
      m?.margins && (u = m.margins);
    })), new ac(c, u);
  }
  nl() {
    switch (this.wa) {
      case "Line":
      case "Area":
      case "Baseline":
        return this.yn.crosshairMarkerRadius;
    }
    return 0;
  }
  sl() {
    switch (this.wa) {
      case "Line":
      case "Area":
      case "Baseline": {
        const t = this.yn.crosshairMarkerBorderColor;
        if (t.length !== 0) return t;
      }
    }
    return null;
  }
  el() {
    switch (this.wa) {
      case "Line":
      case "Area":
      case "Baseline":
        return this.yn.crosshairMarkerBorderWidth;
    }
    return 0;
  }
  rl(t) {
    switch (this.wa) {
      case "Line":
      case "Area":
      case "Baseline": {
        const i = this.yn.crosshairMarkerBackgroundColor;
        if (i.length !== 0) return i;
      }
    }
    return this.Sa().Sh(t).sh;
  }
  Ma() {
    switch (this.yn.priceFormat.type) {
      case "custom": {
        const t = this.yn.priceFormat.formatter;
        this.il = { format: t, formatTickmarks: this.yn.priceFormat.tickmarksFormatter ?? ((i) => i.map(t)) };
        break;
      }
      case "volume":
        this.il = new wj(this.yn.priceFormat.precision);
        break;
      case "percent":
        this.il = new x1(this.yn.priceFormat.precision);
        break;
      default: {
        const t = Math.pow(10, this.yn.priceFormat.precision);
        this.il = new yc(t, this.yn.priceFormat.minMove * t);
      }
    }
    this.hn !== null && this.hn.dl();
  }
  Za(t, i) {
    const a = [];
    return Fh(this.fa, t, i, a), a;
  }
  Fa() {
    const { fl: t, pl: i, vl: a } = this.ml();
    return this.pa.Sr(t, i, a);
  }
  ml() {
    const t = this.Qt().Et(), i = t.fl(), a = window.devicePixelRatio || 1, r = t.N().conflationThresholdFactor;
    return { fl: i, pl: a, vl: this.yn.conflationThresholdFactor ?? r ?? 1 };
  }
  wl(t) {
    const i = this.qt.Bh();
    let a;
    if (this.wa === "Custom" && this.ma !== null) {
      const c = this.ll();
      if (!c) throw new Error(Aj);
      a = this.pa.Cr(i, t, this.ma, !0, ((u) => c(u)));
    } else a = this.pa.Cr(i, t);
    const r = Ih();
    return r.ht(a), r;
  }
  Ua(t) {
    const i = this.wl(t);
    this.va.set(t, i);
  }
  Da(t) {
    if (this.wa === "Custom" && (this.ma === null || !this.ll())) return;
    this.va.clear();
    const i = this.Qt().Et().Ml();
    for (const a of i) {
      const r = () => {
        this.gl(a);
      }, c = typeof window == "object" && window || typeof self == "object" && self;
      c?.Sl?.bl ? c.Sl.bl((() => {
        r();
      }), { se: t }) : Promise.resolve().then((() => r()));
    }
  }
  gl(t) {
    if (this.va.has(t) || this.qt.Bh().length === 0) return;
    const i = this.wl(t);
    this.va.set(t, i);
  }
}
const Fj = [3], Jj = [0, 1, 2, 3];
class Pj {
  constructor(t) {
    this.yn = t;
  }
  xl(t, i, a) {
    let r = t;
    if (this.yn.mode === 0) return r;
    const c = a.Pn(), u = c.Lt();
    if (u === null) return r;
    const f = c.Nt(t, u), m = a.Cl().filter(((g) => g instanceof wc)).reduce(((g, b) => {
      if (a.Zs(b) || !b.It()) return g;
      const y = b.Ft(), S = b.Un();
      if (y.Gi() || !S.ze(i)) return g;
      const w = S.Mh(i);
      if (w === null) return g;
      const M = Kn(b.Lt()), N = this.yn.mode === 3 ? Jj : Fj;
      return g.concat(N.map(((k) => y.Nt(w.Wt[k], M.Wt))));
    }), []);
    if (m.length === 0) return r;
    m.sort(((g, b) => Math.abs(g - f) - Math.abs(b - f)));
    const v = m[0];
    return r = c.Tn(v, u), r;
  }
}
function ka(s, t, i) {
  return Math.min(Math.max(s, t), i);
}
function Ao(s, t, i) {
  return t - s <= i;
}
class tC extends Os {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const c = Math.max(1, Math.floor(a));
    t.lineWidth = c, (function(u, f) {
      u.save(), u.lineWidth % 2 && u.translate(0.5, 0.5), f(), u.restore();
    })(t, (() => {
      const u = W(this.qt);
      if (u.yl) {
        t.strokeStyle = u.kl, Jn(t, u.Pl), t.beginPath();
        for (const f of u.Tl) {
          const m = Math.round(f.Rl * a);
          t.moveTo(m, -c), t.lineTo(m, i.height + c);
        }
        t.stroke();
      }
      if (u.Dl) {
        t.strokeStyle = u.Il, Jn(t, u.Vl), t.beginPath();
        for (const f of u.Bl) {
          const m = Math.round(f.Rl * r);
          t.moveTo(-c, m), t.lineTo(i.width + c, m);
        }
        t.stroke();
      }
    }));
  }
}
class eC {
  constructor(t) {
    this.Xt = new tC(), this.xt = !0, this.yt = t;
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    if (this.xt) {
      const t = this.yt.Qt().N().grid, i = { Dl: t.horzLines.visible, yl: t.vertLines.visible, Il: t.horzLines.color, kl: t.vertLines.color, Vl: t.horzLines.style, Pl: t.vertLines.style, Bl: this.yt.Pn().El(), Tl: (this.yt.Qt().Et().El() || []).map(((a) => ({ Rl: a.coord }))) };
      this.Xt.ht(i), this.xt = !1;
    }
    return this.Xt;
  }
}
class iC {
  constructor(t) {
    this.Yh = new eC(t);
  }
  wr() {
    return this.Yh;
  }
}
const Ph = { Al: 4, Ll: 1e-4 };
function Na(s, t) {
  const i = 100 * (s - t) / t;
  return t < 0 ? -i : i;
}
function nC(s, t) {
  const i = Na(s.Je(), t), a = Na(s.Qe(), t);
  return new ke(i, a);
}
function Ql(s, t) {
  const i = 100 * (s - t) / t + 100;
  return t < 0 ? -i : i;
}
function sC(s, t) {
  const i = Ql(s.Je(), t), a = Ql(s.Qe(), t);
  return new ke(i, a);
}
function rc(s, t) {
  const i = Math.abs(s);
  if (i < 1e-15) return 0;
  const a = Math.log10(i + t.Ll) + t.Al;
  return s < 0 ? -a : a;
}
function Vl(s, t) {
  const i = Math.abs(s);
  if (i < 1e-15) return 0;
  const a = Math.pow(10, i - t.Al) - t.Ll;
  return s < 0 ? -a : a;
}
function Ol(s, t) {
  if (s === null) return null;
  const i = rc(s.Je(), t), a = rc(s.Qe(), t);
  return new ke(i, a);
}
function ja(s, t) {
  if (s === null) return null;
  const i = Vl(s.Je(), t), a = Vl(s.Qe(), t);
  return new ke(i, a);
}
function td(s) {
  if (s === null) return Ph;
  const t = Math.abs(s.Qe() - s.Je());
  if (t >= 1 || t < 1e-15) return Ph;
  const i = Math.ceil(Math.abs(Math.log10(t))), a = Ph.Al + i;
  return { Al: a, Ll: 1 / Math.pow(10, a) };
}
class ed {
  constructor(t, i) {
    if (this.zl = t, this.Ol = i, (function(a) {
      if (a < 0) return !1;
      if (a > 1e18) return !0;
      for (let r = a; r > 1; r /= 10) if (r % 10 != 0) return !1;
      return !0;
    })(this.zl)) this.Nl = [2, 2.5, 2];
    else {
      this.Nl = [];
      for (let a = this.zl; a !== 1; ) {
        if (a % 2 == 0) this.Nl.push(2), a /= 2;
        else {
          if (a % 5 != 0) throw new Error("unexpected base");
          this.Nl.push(2, 2.5), a /= 5;
        }
        if (this.Nl.length > 100) throw new Error("something wrong with base");
      }
    }
  }
  Fl(t, i, a) {
    const r = this.zl === 0 ? 0 : 1 / this.zl;
    let c = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i)))), u = 0, f = this.Ol[0];
    for (; ; ) {
      const b = Ao(c, r, 1e-14) && c > r + 1e-14, y = Ao(c, a * f, 1e-14), S = Ao(c, 1, 1e-14);
      if (!(b && y && S)) break;
      c /= f, f = this.Ol[++u % this.Ol.length];
    }
    if (c <= r + 1e-14 && (c = r), c = Math.max(1, c), this.Nl.length > 0 && (m = c, v = 1, g = 1e-14, Math.abs(m - v) < g)) for (u = 0, f = this.Nl[0]; Ao(c, a * f, 1e-14) && c > r + 1e-14; ) c /= f, f = this.Nl[++u % this.Nl.length];
    var m, v, g;
    return c;
  }
}
class h0 {
  constructor(t, i, a, r) {
    this.Wl = [], this.Ki = t, this.zl = i, this.Hl = a, this.Ul = r;
  }
  Fl(t, i) {
    if (t < i) throw new Error("high < low");
    const a = this.Ki.$t(), r = (t - i) * this.$l() / a, c = new ed(this.zl, [2, 2.5, 2]), u = new ed(this.zl, [2, 2, 2.5]), f = new ed(this.zl, [2.5, 2, 2]), m = [];
    return m.push(c.Fl(t, i, r), u.Fl(t, i, r), f.Fl(t, i, r)), (function(v) {
      if (v.length < 1) throw Error("array is empty");
      let g = v[0];
      for (let b = 1; b < v.length; ++b) v[b] < g && (g = v[b]);
      return g;
    })(m);
  }
  jl() {
    const t = this.Ki, i = t.Lt();
    if (i === null) return void (this.Wl = []);
    const a = t.$t(), r = this.Hl(a - 1, i), c = this.Hl(0, i), u = this.Ki.N().entireTextOnly ? this.ql() / 2 : 0, f = u, m = a - 1 - u, v = Math.max(r, c), g = Math.min(r, c);
    if (v === g) return void (this.Wl = []);
    const b = this.Fl(v, g);
    if (this.Yl(i, b, v, g, f, m), t.Kl() && this.Zl(b, g, v)) {
      const w = this.Ki.Gl();
      this.Xl(i, b, f, m, w, 2 * w);
    }
    const y = this.Wl.map(((w) => w.Jl)), S = this.Ki.Ql(y);
    for (let w = 0; w < this.Wl.length; w++) this.Wl[w].io = S[w];
  }
  El() {
    return this.Wl;
  }
  ql() {
    return this.Ki.k();
  }
  $l() {
    return Math.ceil(this.ql() * this.Ki.N().tickMarkDensity);
  }
  Yl(t, i, a, r, c, u) {
    const f = this.Wl, m = this.Ki;
    let v = a % i;
    v += v < 0 ? i : 0;
    const g = a >= r ? 1 : -1;
    let b = null, y = 0;
    for (let S = a - v; S > r; S -= i) {
      const w = this.Ul(S, t, !0);
      b !== null && Math.abs(w - b) < this.$l() || w < c || w > u || (y < f.length ? (f[y].Rl = w, f[y].io = m.no(S), f[y].Jl = S) : f.push({ Rl: w, io: m.no(S), Jl: S }), y++, b = w, m.so() && (i = this.Fl(S * g, r)));
    }
    f.length = y;
  }
  Xl(t, i, a, r, c, u) {
    const f = this.Wl, m = this.eo(t, a, c, u), v = this.eo(t, r, -u, -c), g = this.Ul(0, t, !0) - this.Ul(i, t, !0);
    f.length > 0 && f[0].Rl - m.Rl < g / 2 && f.shift(), f.length > 0 && v.Rl - f[f.length - 1].Rl < g / 2 && f.pop(), f.unshift(m), f.push(v);
  }
  eo(t, i, a, r) {
    const c = (a + r) / 2, u = this.Hl(i + a, t), f = this.Hl(i + r, t), m = Math.min(u, f), v = Math.max(u, f), g = Math.max(0.1, this.Fl(v, m)), b = this.Hl(i + c, t), y = b - b % g, S = this.Ul(y, t, !0);
    return { io: this.Ki.no(y), Rl: S, Jl: y };
  }
  Zl(t, i, a) {
    let r = Kn(this.Ki.ar());
    return this.Ki.so() && (r = ja(r, this.Ki.ro())), r.Je() - i < t && a - r.Qe() < t;
  }
}
function M1(s) {
  return s.slice().sort(((t, i) => W(t.ln()) - W(i.ln())));
}
var d0;
(function(s) {
  s[s.Normal = 0] = "Normal", s[s.Logarithmic = 1] = "Logarithmic", s[s.Percentage = 2] = "Percentage", s[s.IndexedTo100 = 3] = "IndexedTo100";
})(d0 || (d0 = {}));
const f0 = new x1(), m0 = new yc(100, 1);
class aC {
  constructor(t, i, a, r, c) {
    this.ho = 0, this.ao = null, this.rr = null, this.lo = null, this.oo = { _o: !1, uo: null }, this.co = !1, this.do = 0, this.fo = 0, this.po = new te(), this.vo = new te(), this.mo = [], this.wo = null, this.Mo = null, this.bo = null, this.So = null, this.xo = null, this.il = m0, this.Co = td(null), this.yo = t, this.yn = i, this.ko = a, this.Po = r, this.To = c, this.Ro = new h0(this, 100, this.Do.bind(this), this.Io.bind(this));
  }
  cl() {
    return this.yo;
  }
  N() {
    return this.yn;
  }
  vr(t) {
    if (Pe(this.yn, t), this.dl(), t.mode !== void 0 && this.Vo({ _e: t.mode }), t.scaleMargins !== void 0) {
      const i = Ve(t.scaleMargins.top), a = Ve(t.scaleMargins.bottom);
      if (i < 0 || i > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
      if (a < 0 || a > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${a}`);
      if (i + a > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + a}`);
      this.Bo(), this.bo = null;
    }
  }
  Eo() {
    return this.yn.autoScale;
  }
  Ao() {
    return this.co;
  }
  so() {
    return this.yn.mode === 1;
  }
  je() {
    return this.yn.mode === 2;
  }
  Lo() {
    return this.yn.mode === 3;
  }
  ro() {
    return this.Co;
  }
  _e() {
    return { hs: this.yn.autoScale, zo: this.yn.invertScale, _e: this.yn.mode };
  }
  Vo(t) {
    const i = this._e();
    let a = null;
    t.hs !== void 0 && (this.yn.autoScale = t.hs), t._e !== void 0 && (this.yn.mode = t._e, t._e !== 2 && t._e !== 3 || (this.yn.autoScale = !0), this.oo._o = !1), i._e === 1 && t._e !== i._e && ((function(c, u) {
      if (c === null) return !1;
      const f = Vl(c.Je(), u), m = Vl(c.Qe(), u);
      return isFinite(f) && isFinite(m);
    })(this.rr, this.Co) ? (a = ja(this.rr, this.Co), a !== null && this.Oo(a)) : this.yn.autoScale = !0), t._e === 1 && t._e !== i._e && (a = Ol(this.rr, this.Co), a !== null && this.Oo(a));
    const r = i._e !== this.yn.mode;
    r && (i._e === 2 || this.je()) && this.dl(), r && (i._e === 3 || this.Lo()) && this.dl(), t.zo !== void 0 && i.zo !== t.zo && (this.yn.invertScale = t.zo, this.No()), this.vo.p(i, this._e());
  }
  Fo() {
    return this.vo;
  }
  k() {
    return this.ko.fontSize;
  }
  $t() {
    return this.ho;
  }
  Wo(t) {
    this.ho !== t && (this.ho = t, this.Bo(), this.bo = null);
  }
  Ho() {
    if (this.ao) return this.ao;
    const t = this.$t() - this.Uo() - this.$o();
    return this.ao = t, t;
  }
  ar() {
    return this.jo(), this.rr;
  }
  Oo(t, i) {
    const a = this.rr;
    (i || a === null && t !== null || a !== null && !a.Ge(t)) && (this.bo = null, this.rr = t);
  }
  qo(t) {
    this.Oo(t), this.Yo(t !== null);
  }
  Gi() {
    return this.jo(), this.ho === 0 || !this.rr || this.rr.Gi();
  }
  Ko(t) {
    return this.zo() ? t : this.$t() - 1 - t;
  }
  Nt(t, i) {
    return this.je() ? t = Na(t, i) : this.Lo() && (t = Ql(t, i)), this.Io(t, i);
  }
  Zo(t, i, a) {
    this.jo();
    const r = this.$o(), c = W(this.ar()), u = c.Je(), f = c.Qe(), m = this.Ho() - 1, v = this.zo(), g = m / (f - u), b = a === void 0 ? 0 : a.from, y = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < y; w++) {
      const M = t[w], N = M.Mt;
      if (isNaN(N)) continue;
      let k = N;
      S !== null && (k = S(M.Mt, i));
      const T = r + g * (k - u), D = v ? T : this.ho - 1 - T;
      M.ut = D;
    }
  }
  Xo(t, i, a) {
    this.jo();
    const r = this.$o(), c = W(this.ar()), u = c.Je(), f = c.Qe(), m = this.Ho() - 1, v = this.zo(), g = m / (f - u), b = a === void 0 ? 0 : a.from, y = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < y; w++) {
      const M = t[w];
      let N = M.jr, k = M.qr, T = M.Yr, D = M.Kr;
      S !== null && (N = S(M.jr, i), k = S(M.qr, i), T = S(M.Yr, i), D = S(M.Kr, i));
      let O = r + g * (N - u), V = v ? O : this.ho - 1 - O;
      M.Jo = V, O = r + g * (k - u), V = v ? O : this.ho - 1 - O, M.Qo = V, O = r + g * (T - u), V = v ? O : this.ho - 1 - O, M.t_ = V, O = r + g * (D - u), V = v ? O : this.ho - 1 - O, M.i_ = V;
    }
  }
  Tn(t, i) {
    const a = this.Do(t, i);
    return this.n_(a, i);
  }
  n_(t, i) {
    let a = t;
    return this.je() ? a = (function(r, c) {
      return c < 0 && (r = -r), r / 100 * c + c;
    })(a, i) : this.Lo() && (a = (function(r, c) {
      return r -= 100, c < 0 && (r = -r), r / 100 * c + c;
    })(a, i)), a;
  }
  Cl() {
    return this.mo;
  }
  Dt() {
    return this.Mo || (this.Mo = M1(this.mo)), this.Mo;
  }
  s_(t) {
    this.mo.indexOf(t) === -1 && (this.mo.push(t), this.dl(), this.e_());
  }
  r_(t) {
    const i = this.mo.indexOf(t);
    if (i === -1) throw new Error("source is not attached to scale");
    this.mo.splice(i, 1), this.mo.length === 0 && (this.Vo({ hs: !0 }), this.Oo(null)), this.dl(), this.e_();
  }
  Lt() {
    let t = null;
    for (const i of this.mo) {
      const a = i.Lt();
      a !== null && (t === null || a.za < t.za) && (t = a);
    }
    return t === null ? null : t.Wt;
  }
  zo() {
    return this.yn.invertScale;
  }
  El() {
    const t = this.Lt() === null;
    if (this.bo !== null && (t || this.bo.h_ === t)) return this.bo.El;
    this.Ro.jl();
    const i = this.Ro.El();
    return this.bo = { El: i, h_: t }, this.po.p(), i;
  }
  a_() {
    return this.po;
  }
  l_(t) {
    this.je() || this.Lo() || this.So === null && this.lo === null && (this.Gi() || (this.So = this.ho - t, this.lo = W(this.ar()).Xe()));
  }
  o_(t) {
    if (this.je() || this.Lo() || this.So === null) return;
    this.Vo({ hs: !1 }), (t = this.ho - t) < 0 && (t = 0);
    let i = (this.So + 0.2 * (this.ho - 1)) / (t + 0.2 * (this.ho - 1));
    const a = W(this.lo).Xe();
    i = Math.max(i, 0.1), a.ir(i), this.Oo(a);
  }
  __() {
    this.je() || this.Lo() || (this.So = null, this.lo = null);
  }
  u_(t) {
    this.Eo() || this.xo === null && this.lo === null && (this.Gi() || (this.xo = t, this.lo = W(this.ar()).Xe()));
  }
  c_(t) {
    if (this.Eo() || this.xo === null) return;
    const i = W(this.ar()).tr() / (this.Ho() - 1);
    let a = t - this.xo;
    this.zo() && (a *= -1);
    const r = a * i, c = W(this.lo).Xe();
    c.nr(r), this.Oo(c, !0), this.bo = null;
  }
  d_() {
    this.Eo() || this.xo !== null && (this.xo = null, this.lo = null);
  }
  tl() {
    return this.il || this.dl(), this.il;
  }
  Ji(t, i) {
    switch (this.yn.mode) {
      case 2:
        return this.f_(Na(t, i));
      case 3:
        return this.tl().format(Ql(t, i));
      default:
        return this.cr(t);
    }
  }
  no(t) {
    switch (this.yn.mode) {
      case 2:
        return this.f_(t);
      case 3:
        return this.tl().format(t);
      default:
        return this.cr(t);
    }
  }
  Ql(t) {
    switch (this.yn.mode) {
      case 2:
        return this.p_(t);
      case 3:
        return this.tl().formatTickmarks(t);
      default:
        return this.v_(t);
    }
  }
  xa(t) {
    return this.cr(t, W(this.wo).tl());
  }
  Ca(t, i) {
    return t = Na(t, i), this.f_(t, f0);
  }
  m_() {
    return this.mo;
  }
  w_(t) {
    this.oo = { uo: t, _o: !1 };
  }
  Nn() {
    this.mo.forEach(((t) => t.Nn()));
  }
  Kl() {
    return this.yn.ensureEdgeTickMarksVisible && this.Eo();
  }
  Gl() {
    return this.k() / 2;
  }
  dl() {
    this.bo = null;
    let t = 1 / 0;
    this.wo = null;
    for (const a of this.mo) a.ln() < t && (t = a.ln(), this.wo = a);
    let i = 100;
    this.wo !== null && (i = Math.round(this.wo.Kh())), this.il = m0, this.je() ? (this.il = f0, i = 100) : this.Lo() ? (this.il = new yc(100, 1), i = 100) : this.wo !== null && (this.il = this.wo.tl()), this.Ro = new h0(this, i, this.Do.bind(this), this.Io.bind(this)), this.Ro.jl();
  }
  e_() {
    this.Mo = null;
  }
  M_() {
    return this.wo === null || this.je() || this.Lo() ? 1 : 1 / this.wo.Kh();
  }
  Xi() {
    return this.To;
  }
  Yo(t) {
    this.co = t;
  }
  Uo() {
    return this.zo() ? this.yn.scaleMargins.bottom * this.$t() + this.fo : this.yn.scaleMargins.top * this.$t() + this.do;
  }
  $o() {
    return this.zo() ? this.yn.scaleMargins.top * this.$t() + this.do : this.yn.scaleMargins.bottom * this.$t() + this.fo;
  }
  jo() {
    this.oo._o || (this.oo._o = !0, this.g_());
  }
  Bo() {
    this.ao = null;
  }
  Io(t, i) {
    if (this.jo(), this.Gi()) return 0;
    t = this.so() && t ? rc(t, this.Co) : t;
    const a = W(this.ar()), r = this.$o() + (this.Ho() - 1) * (t - a.Je()) / a.tr();
    return this.Ko(r);
  }
  Do(t, i) {
    if (this.jo(), this.Gi()) return 0;
    const a = this.Ko(t), r = W(this.ar()), c = r.Je() + r.tr() * ((a - this.$o()) / (this.Ho() - 1));
    return this.so() ? Vl(c, this.Co) : c;
  }
  No() {
    this.bo = null, this.Ro.jl();
  }
  g_() {
    if (this.Ao() && !this.Eo()) return;
    const t = this.oo.uo;
    if (t === null) return;
    let i = null;
    const a = this.m_();
    let r = 0, c = 0;
    for (const m of a) {
      if (!m.It()) continue;
      const v = m.Lt();
      if (v === null) continue;
      const g = m.la(t.Oa(), t.bi());
      let b = g && g.ar();
      if (b !== null) {
        switch (this.yn.mode) {
          case 1:
            b = Ol(b, this.Co);
            break;
          case 2:
            b = nC(b, v.Wt);
            break;
          case 3:
            b = sC(b, v.Wt);
        }
        if (i = i === null ? b : i.Ss(W(b)), g !== null) {
          const y = g.lr();
          y !== null && (r = Math.max(r, y.above), c = Math.max(c, y.below));
        }
      }
    }
    if (this.Kl() && (r = Math.max(r, this.Gl()), c = Math.max(c, this.Gl())), r === this.do && c === this.fo || (this.do = r, this.fo = c, this.bo = null, this.Bo()), i !== null) {
      if (i.Je() === i.Qe()) {
        const m = 5 * this.M_();
        this.so() && (i = ja(i, this.Co)), i = new ke(i.Je() - m, i.Qe() + m), this.so() && (i = Ol(i, this.Co));
      }
      if (this.so()) {
        const m = ja(i, this.Co), v = td(m);
        if (u = v, f = this.Co, u.Al !== f.Al || u.Ll !== f.Ll) {
          const g = this.lo !== null ? ja(this.lo, this.Co) : null;
          this.Co = v, i = Ol(m, v), g !== null && (this.lo = Ol(g, v));
        }
      }
      this.Oo(i);
    } else this.rr === null && (this.Oo(new ke(-0.5, 0.5)), this.Co = td(null));
    var u, f;
  }
  Go() {
    return this.je() ? Na : this.Lo() ? Ql : this.so() ? (t) => rc(t, this.Co) : null;
  }
  b_(t, i, a) {
    return i === void 0 ? (a === void 0 && (a = this.tl()), a.format(t)) : i(t);
  }
  S_(t, i, a) {
    return i === void 0 ? (a === void 0 && (a = this.tl()), a.formatTickmarks(t)) : i(t);
  }
  cr(t, i) {
    return this.b_(t, this.Po.priceFormatter, i);
  }
  v_(t, i) {
    const a = this.Po.priceFormatter;
    return this.S_(t, this.Po.tickmarksPriceFormatter ?? (a ? (r) => r.map(a) : void 0), i);
  }
  f_(t, i) {
    return this.b_(t, this.Po.percentageFormatter, i);
  }
  p_(t, i) {
    const a = this.Po.percentageFormatter;
    return this.S_(t, this.Po.tickmarksPercentageFormatter ?? (a ? (r) => r.map(a) : void 0), i);
  }
}
function p0(s) {
  return s instanceof wc;
}
class zd {
  constructor(t, i) {
    this.mo = [], this.x_ = /* @__PURE__ */ new Map(), this.ho = 0, this.C_ = 0, this.y_ = 1, this.Mo = null, this.k_ = null, this.P_ = !1, this.T_ = new te(), this.fa = [], this.ia = t, this.sn = i, this.R_ = new iC(this);
    const a = i.N();
    this.D_ = this.I_("left", a.leftPriceScale), this.V_ = this.I_("right", a.rightPriceScale), this.D_.Fo().i(this.B_.bind(this, this.D_), this), this.V_.Fo().i(this.B_.bind(this, this.V_), this), this.E_(a);
  }
  E_(t) {
    if (t.leftPriceScale && this.D_.vr(t.leftPriceScale), t.rightPriceScale && this.V_.vr(t.rightPriceScale), t.localization && (this.D_.dl(), this.V_.dl()), t.overlayPriceScales) {
      const i = Array.from(this.x_.values());
      for (const a of i) {
        const r = W(a[0].Ft());
        r.vr(t.overlayPriceScales), t.localization && r.dl();
      }
    }
  }
  A_(t) {
    switch (t) {
      case "left":
        return this.D_;
      case "right":
        return this.V_;
    }
    return this.x_.has(t) ? Ve(this.x_.get(t))[0].Ft() : null;
  }
  m() {
    this.Qt().L_().u(this), this.D_.Fo().u(this), this.V_.Fo().u(this), this.mo.forEach(((t) => {
      t.m && t.m();
    })), this.fa = this.fa.filter(((t) => {
      const i = t.Qh();
      return i.detached && i.detached(), !1;
    })), this.T_.p();
  }
  z_() {
    return this.y_;
  }
  O_(t) {
    this.y_ = t;
  }
  Qt() {
    return this.sn;
  }
  nn() {
    return this.C_;
  }
  $t() {
    return this.ho;
  }
  N_(t) {
    this.C_ = t, this.F_();
  }
  Wo(t) {
    this.ho = t, this.D_.Wo(t), this.V_.Wo(t), this.mo.forEach(((i) => {
      if (this.Zs(i)) {
        const a = i.Ft();
        a !== null && a.Wo(t);
      }
    })), this.F_();
  }
  W_(t) {
    this.P_ = t;
  }
  H_() {
    return this.P_;
  }
  U_() {
    return this.mo.filter(p0);
  }
  Cl() {
    return this.mo;
  }
  Zs(t) {
    const i = t.Ft();
    return i === null || this.D_ !== i && this.V_ !== i;
  }
  s_(t, i, a) {
    this.j_(t, i, a ? t.ln() : this.mo.length);
  }
  r_(t, i) {
    const a = this.mo.indexOf(t);
    we(a !== -1, "removeDataSource: invalid data source"), this.mo.splice(a, 1), i || this.mo.forEach(((u, f) => u._n(f)));
    const r = W(t.Ft()).cl();
    if (this.x_.has(r)) {
      const u = Ve(this.x_.get(r)), f = u.indexOf(t);
      f !== -1 && (u.splice(f, 1), u.length === 0 && this.x_.delete(r));
    }
    const c = t.Ft();
    c && c.Cl().indexOf(t) >= 0 && (c.r_(t), this.q_(c)), this.Y_();
  }
  Xs(t) {
    return t === this.D_ ? "left" : t === this.V_ ? "right" : "overlay";
  }
  K_() {
    return this.D_;
  }
  Z_() {
    return this.V_;
  }
  G_(t, i) {
    t.l_(i);
  }
  X_(t, i) {
    t.o_(i), this.F_();
  }
  J_(t) {
    t.__();
  }
  Q_(t, i) {
    t.u_(i);
  }
  tu(t, i) {
    t.c_(i), this.F_();
  }
  iu(t) {
    t.d_();
  }
  F_() {
    this.mo.forEach(((t) => {
      t.Nn();
    }));
  }
  Pn() {
    const [t, i] = this.nu();
    let a = null;
    return t.N().visible && t.Cl().length !== 0 ? a = t : i.N().visible && i.Cl().length !== 0 ? a = i : this.mo.length !== 0 && (a = this.mo[0].Ft()), a === null && (a = this.Gs() ?? t), a;
  }
  Gs() {
    const [t, i] = this.nu();
    return t.N().visible ? t : i.N().visible ? i : null;
  }
  q_(t) {
    t !== null && t.Eo() && this.su(t);
  }
  eu(t) {
    const i = this.ia.Ee();
    t.Vo({ hs: !0 }), i !== null && t.w_(i), this.F_();
  }
  ru() {
    this.su(this.D_), this.su(this.V_);
  }
  hu() {
    this.q_(this.D_), this.q_(this.V_), this.mo.forEach(((t) => {
      this.Zs(t) && this.q_(t.Ft());
    })), this.F_(), this.sn.mr();
  }
  Dt() {
    return this.Mo === null && (this.Mo = M1(this.mo)), this.Mo;
  }
  au() {
    const t = this.Dt(), i = this.sn.ou()?.lu, a = this.sn.N().hoveredSeriesOnTop, r = this.k_;
    if (r !== null && r.Kh === t && r._u === i && r.uu === a) return r.cu;
    const c = (function(u, f, m) {
      if (!m) return u;
      const v = u.indexOf(f);
      if (v === -1 || v === u.length - 1) return u;
      const g = [];
      for (let b = 0; b < u.length; b++) b !== v && g.push(u[b]);
      return g.push(u[v]), g;
    })(t, i, a);
    return this.k_ = { Kh: t, _u: i, uu: a, cu: c }, c;
  }
  du(t, i) {
    i = ka(i, 0, this.mo.length - 1);
    const a = this.mo.indexOf(t);
    we(a !== -1, "setSeriesOrder: invalid data source"), this.mo.splice(a, 1), this.mo.splice(i, 0, t), this.mo.forEach(((r, c) => r._n(c))), this.Y_();
    for (const r of [this.D_, this.V_]) r.e_(), r.dl();
    this.sn.mr();
  }
  Vt() {
    return this.Dt().filter(p0);
  }
  fu() {
    return this.T_;
  }
  pu() {
    return this.R_;
  }
  hl(t) {
    this.fa.push(new Vj(t));
  }
  al(t) {
    this.fa = this.fa.filter(((i) => i.Qh() !== t)), t.detached && t.detached(), this.sn.mr();
  }
  vu() {
    return this.fa;
  }
  Ja(t, i) {
    return this.fa.map(((a) => a.Qs(t, i))).filter(((a) => a !== null));
  }
  su(t) {
    const i = t.m_();
    if (i && i.length > 0 && !this.ia.Gi()) {
      const a = this.ia.Ee();
      a !== null && t.w_(a);
    }
    t.Nn();
  }
  j_(t, i, a) {
    let r = this.A_(i);
    if (r === null && (r = this.I_(i, this.sn.N().overlayPriceScales)), this.mo.splice(a, 0, t), !xc(i)) {
      const c = this.x_.get(i) || [];
      c.push(t), this.x_.set(i, c);
    }
    t._n(a), r.s_(t), t.un(r), this.q_(r), this.Y_();
  }
  Y_() {
    this.Mo = null, this.k_ = null;
  }
  nu() {
    return this.sn.N().defaultVisiblePriceScaleId === "left" ? [this.D_, this.V_] : [this.V_, this.D_];
  }
  B_(t, i, a) {
    i._e !== a._e && this.su(t);
  }
  I_(t, i) {
    const a = { visible: !0, autoScale: !0, ...mn(i) }, r = new aC(t, a, this.sn.N().layout, this.sn.N().localization, this.sn.Xi());
    return r.Wo(this.$t()), r;
  }
}
function Td(s, t) {
  return t === null || s.se === 2 && t.se !== 2 || (t.se !== 2 || s.se === 2) && s.ne !== t.ne && s.ne < t.ne;
}
function N1(s) {
  return { te: s.te, ie: s.ie };
}
function lC(s) {
  return { ne: s.distance ?? 0, se: s.hitTestPriority ?? (s.itemType === "marker" ? 2 : 0), ee: s.itemType ?? "primitive", mu: s.cursorStyle, te: s.externalId };
}
function Oo(s) {
  return { lu: s.lu, wu: N1(s.Mu), mu: s.Mu.mu, ee: s.Mu.ee ?? "primitive" };
}
function rC(s, t, i, a) {
  let r = null;
  for (const c of s) {
    let u = c.Qs?.(t, i, a) ?? null;
    if (u === null) {
      const f = c.Tt(a);
      u = f !== null && f.Qs ? f.Qs(t, i) : null;
    }
    if (u !== null) {
      const f = { gu: c, Mu: u };
      (r === null || Td(f.Mu, r.Mu)) && (r = f);
    }
  }
  return r;
}
function oC(s) {
  return s.jn !== void 0;
}
function j1(s, t, i) {
  const a = [s, ...s.Dt()].reverse(), r = (function(f, m, v) {
    let g, b, y;
    for (const M of f) {
      const N = M.Ja?.(m, v) ?? [];
      for (const k of N) {
        const T = lC(k);
        S = k.zOrder, w = g?.zOrder, (!w || S === "top" && w !== "top" || S === "normal" && w === "bottom" || k.zOrder === g?.zOrder && b !== void 0 && Td(T, b) || k.zOrder === g?.zOrder && b === void 0) && (g = k, b = T, y = M);
      }
    }
    var S, w;
    return g && y && b ? { Mu: b, bu: g, lu: y } : null;
  })(a, t, i);
  if (r?.bu.zOrder === "top") return Oo(r);
  let c = null, u = null;
  for (const f of a) {
    if (r && r.lu === f && r.bu.zOrder !== "bottom" && !r.bu.isBackground) return c ?? Oo(r);
    if (oC(f)) {
      const m = rC(f.jn(s), t, i, s);
      if (m !== null) {
        const v = { lu: f, gu: m.gu, wu: N1(m.Mu), mu: m.Mu.mu, ee: m.Mu.ee ?? "primitive" };
        (c === null || Td(m.Mu, u)) && (c = v, u = m.Mu);
      }
    }
    if (r && r.lu === f && r.bu.zOrder !== "bottom" && r.bu.isBackground) return c ?? Oo(r);
  }
  return c !== null ? c : r?.bu ? Oo(r) : null;
}
class cC {
  constructor(t, i, a = 50) {
    this.Vs = 0, this.Bs = 1, this.Es = 1, this.Ls = /* @__PURE__ */ new Map(), this.As = /* @__PURE__ */ new Map(), this.Su = t, this.xu = i, this.zs = a;
  }
  Cu(t) {
    const i = t.time, a = this.xu.cacheKey(i), r = this.Ls.get(a);
    if (r !== void 0) return r.yu;
    if (this.Vs === this.zs) {
      const u = this.As.get(this.Es);
      this.As.delete(this.Es), this.Ls.delete(Ve(u)), this.Es++, this.Vs--;
    }
    const c = this.Su(t);
    return this.Ls.set(a, { yu: c, Ws: this.Bs }), this.As.set(this.Bs, a), this.Vs++, this.Bs++, c;
  }
}
class Yl {
  constructor(t, i) {
    we(t <= i, "right should be >= left"), this.ku = t, this.Pu = i;
  }
  Oa() {
    return this.ku;
  }
  bi() {
    return this.Pu;
  }
  Tu() {
    return this.Pu - this.ku + 1;
  }
  ze(t) {
    return this.ku <= t && t <= this.Pu;
  }
  Ge(t) {
    return this.ku === t.Oa() && this.Pu === t.bi();
  }
}
function v0(s, t) {
  return s === null || t === null ? s === t : s.Ge(t);
}
class uC {
  constructor() {
    this.Ru = /* @__PURE__ */ new Map(), this.Ls = null, this.Du = !1;
  }
  Iu(t) {
    this.Du = t, this.Ls = null;
  }
  Vu(t, i) {
    this.Bu(i), this.Ls = null;
    for (let a = i; a < t.length; ++a) {
      const r = t[a];
      let c = this.Ru.get(r.timeWeight);
      c === void 0 && (c = [], this.Ru.set(r.timeWeight, c)), c.push({ index: a, time: r.time, weight: r.timeWeight, originalTime: r.originalTime });
    }
  }
  Eu(t, i, a, r, c) {
    const u = Math.ceil(i / t);
    return this.Ls !== null && this.Ls.Au === u && c === this.Ls.Lu && a === this.Ls.zu || (this.Ls = { Lu: c, zu: a, El: this.Ou(u, a, r), Au: u }), this.Ls.El;
  }
  Bu(t) {
    if (t === 0) return void this.Ru.clear();
    const i = [];
    this.Ru.forEach(((a, r) => {
      t <= a[0].index ? i.push(r) : a.splice(ks(a, t, ((c) => c.index < t)), 1 / 0);
    }));
    for (const a of i) this.Ru.delete(a);
  }
  Ou(t, i, a) {
    let r = [];
    const c = (u) => !i || a.has(u.index);
    for (const u of Array.from(this.Ru.keys()).sort(((f, m) => m - f))) {
      if (!this.Ru.get(u)) continue;
      const f = r;
      r = [];
      const m = f.length;
      let v = 0;
      const g = Ve(this.Ru.get(u)), b = g.length;
      let y = 1 / 0, S = -1 / 0;
      for (let w = 0; w < b; w++) {
        const M = g[w], N = M.index;
        for (; v < m; ) {
          const k = f[v], T = k.index;
          if (!(T < N && c(k))) {
            y = T;
            break;
          }
          v++, r.push(k), S = T, y = 1 / 0;
        }
        if (y - N >= t && N - S >= t && c(M)) r.push(M), S = N;
        else if (this.Du) return f;
      }
      for (; v < m; v++) c(f[v]) && r.push(f[v]);
    }
    return r;
  }
}
class Ea {
  constructor(t) {
    this.Nu = t;
  }
  Fu() {
    return this.Nu === null ? null : new Yl(Math.floor(this.Nu.Oa()), Math.ceil(this.Nu.bi()));
  }
  Wu() {
    return this.Nu;
  }
  static Hu() {
    return new Ea(null);
  }
}
function hC(s, t) {
  return s.weight > t.weight ? s : t;
}
class dC {
  constructor(t, i, a, r) {
    this.C_ = 0, this.Uu = null, this.$u = [], this.xo = null, this.So = null, this.ju = new uC(), this.qu = /* @__PURE__ */ new Map(), this.Yu = Ea.Hu(), this.Ku = !0, this.Zu = new te(), this.Gu = new te(), this.Xu = new te(), this.Ju = null, this.Qu = null, this.tc = /* @__PURE__ */ new Map(), this.nc = -1, this.sc = [], this.ec = 1, this.yn = i, this.Po = a, this.rc = i.rightOffset, this.hc = i.barSpacing, this.sn = t, this.ac(i), this.xu = r, this.lc(), this.ju.Iu(i.uniformDistribution), this.oc(), this._c();
  }
  N() {
    return this.yn;
  }
  uc(t) {
    Pe(this.Po, t), this.cc(), this.lc();
  }
  vr(t, i) {
    Pe(this.yn, t), this.yn.fixLeftEdge && this.dc(), this.yn.fixRightEdge && this.fc(), t.barSpacing !== void 0 && this.sn.Ms(t.barSpacing), t.rightOffset !== void 0 && this.sn.gs(t.rightOffset), this.ac(t), t.minBarSpacing === void 0 && t.maxBarSpacing === void 0 || this.sn.Ms(t.barSpacing ?? this.hc), t.ignoreWhitespaceIndices !== void 0 && t.ignoreWhitespaceIndices !== this.yn.ignoreWhitespaceIndices && this._c(), this.cc(), this.lc(), t.enableConflation === void 0 && t.conflationThresholdFactor === void 0 || this.oc(), this.Xu.p();
  }
  Rn(t) {
    return this.$u[t]?.time ?? null;
  }
  en(t) {
    return this.$u[t] ?? null;
  }
  vc(t, i) {
    if (this.$u.length < 1) return null;
    if (this.xu.key(t) > this.xu.key(this.$u[this.$u.length - 1].time)) return i ? this.$u.length - 1 : null;
    const a = ks(this.$u, this.xu.key(t), ((r, c) => this.xu.key(r.time) < c));
    return this.xu.key(t) < this.xu.key(this.$u[a].time) ? i ? a : null : a;
  }
  Gi() {
    return this.C_ === 0 || this.$u.length === 0 || this.Uu === null;
  }
  mc() {
    return this.$u.length > 0;
  }
  Ee() {
    return this.wc(), this.Yu.Fu();
  }
  Mc() {
    return this.wc(), this.Yu.Wu();
  }
  gc() {
    const t = this.Ee();
    if (t === null) return null;
    const i = { from: t.Oa(), to: t.bi() };
    return this.bc(i);
  }
  bc(t) {
    const i = Math.round(t.from), a = Math.round(t.to), r = W(this.Sc()), c = W(this.xc());
    return { from: W(this.en(Math.max(r, i))), to: W(this.en(Math.min(c, a))) };
  }
  Cc(t) {
    return { from: W(this.vc(t.from, !0)), to: W(this.vc(t.to, !0)) };
  }
  nn() {
    return this.C_;
  }
  N_(t) {
    if (!isFinite(t) || t <= 0 || this.C_ === t) return;
    const i = this.Mc(), a = this.C_;
    if (this.C_ = t, this.Ku = !0, this.yn.lockVisibleTimeRangeOnResize && a !== 0) {
      const r = this.hc * t / a;
      this.hc = r;
    }
    if (this.yn.fixLeftEdge && i !== null && i.Oa() <= 0) {
      const r = a - t;
      this.rc -= Math.round(r / this.hc) + 1, this.Ku = !0;
    }
    this.yc(), this.kc();
  }
  jt(t) {
    if (this.Gi() || !Jl(t)) return 0;
    const i = this.Pc() + this.rc - t;
    return this.C_ - (i + 0.5) * this.hc - 1;
  }
  Tc(t, i) {
    const a = this.Pc(), r = i === void 0 ? 0 : i.from, c = i === void 0 ? t.length : i.to;
    for (let u = r; u < c; u++) {
      const f = t[u].wt, m = a + this.rc - f, v = this.C_ - (m + 0.5) * this.hc - 1;
      t[u]._t = v;
    }
  }
  Rc(t, i) {
    const a = Math.ceil(this.Dc(t));
    return i && this.yn.ignoreWhitespaceIndices && !this.Ic(a) ? this.Vc(a) : a;
  }
  gs(t) {
    this.Ku = !0, this.rc = t, this.kc(), this.sn.Bc(), this.sn.mr();
  }
  fl() {
    return this.hc;
  }
  Ms(t) {
    const i = this.hc;
    if (this.Ec(t), this.yn.rightOffsetPixels !== void 0 && i !== 0) {
      const a = this.rc * i / this.hc;
      this.rc = a;
    }
    this.kc(), this.sn.Bc(), this.sn.mr();
  }
  Ac() {
    return this.rc;
  }
  El() {
    if (this.Gi()) return null;
    if (this.Qu !== null) return this.Qu;
    const t = this.hc, i = 5 * (this.sn.N().layout.fontSize + 4) / 8 * (this.yn.tickMarkMaxCharacterLength || 8), a = Math.round(i / t), r = W(this.Ee()), c = Math.max(r.Oa(), r.Oa() - a), u = Math.max(r.bi(), r.bi() - a), f = this.ju.Eu(t, i, this.yn.ignoreWhitespaceIndices, this.tc, this.nc), m = this.Sc() + a, v = this.xc() - a, g = this.Lc(), b = this.yn.fixLeftEdge || g, y = this.yn.fixRightEdge || g;
    let S = 0;
    for (const w of f) {
      if (!(c <= w.index && w.index <= u)) continue;
      let M;
      S < this.sc.length ? (M = this.sc[S], M.coord = this.jt(w.index), M.label = this.zc(w), M.weight = w.weight) : (M = { needAlignCoordinate: !1, coord: this.jt(w.index), label: this.zc(w), weight: w.weight }, this.sc.push(M)), this.hc > i / 2 && !g ? M.needAlignCoordinate = !1 : M.needAlignCoordinate = b && w.index <= m || y && w.index >= v, S++;
    }
    return this.sc.length = S, this.Qu = this.sc, this.sc;
  }
  Oc() {
    let t;
    this.Ku = !0, this.Ms(this.yn.barSpacing), t = this.yn.rightOffsetPixels !== void 0 ? this.yn.rightOffsetPixels / this.fl() : this.yn.rightOffset, this.gs(t);
  }
  Nc(t) {
    this.Ku = !0, this.Uu = t, this.kc(), this.dc();
  }
  Fc(t, i) {
    const a = this.Dc(t), r = this.fl(), c = r + i * (r / 10);
    this.Ms(c), this.yn.rightBarStaysOnScroll || this.gs(this.Ac() + (a - this.Dc(t)));
  }
  l_(t) {
    this.xo && this.d_(), this.So === null && this.Ju === null && (this.Gi() || (this.So = t, this.Wc()));
  }
  o_(t) {
    if (this.Ju === null) return;
    const i = ka(this.C_ - t, 0, this.C_), a = ka(this.C_ - W(this.So), 0, this.C_);
    i !== 0 && a !== 0 && this.Ms(this.Ju.fl * i / a);
  }
  __() {
    this.So !== null && (this.So = null, this.Hc());
  }
  u_(t) {
    this.xo === null && this.Ju === null && (this.Gi() || (this.xo = t, this.Wc()));
  }
  c_(t) {
    if (this.xo === null) return;
    const i = (this.xo - t) / this.fl();
    this.rc = W(this.Ju).Ac + i, this.Ku = !0, this.kc();
  }
  d_() {
    this.xo !== null && (this.xo = null, this.Hc());
  }
  Uc() {
    this.$c(this.yn.rightOffset);
  }
  $c(t, i = 400) {
    if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
    if (!isFinite(i) || i <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
    const a = this.rc, r = performance.now();
    this.sn.ps({ jc: (c) => (c - r) / i >= 1, qc: (c) => {
      const u = (c - r) / i;
      return u >= 1 ? t : a + (t - a) * u;
    } });
  }
  kt(t, i) {
    this.Ku = !0, this.$u = t, this.ju.Vu(t, i), this.kc();
  }
  Yc() {
    return this.Zu;
  }
  Kc() {
    return this.Gu;
  }
  Zc() {
    return this.Xu;
  }
  Pc() {
    return this.Uu || 0;
  }
  Gc(t, i) {
    const a = t.Tu(), r = i && this.yn.rightOffsetPixels || 0;
    this.Ec((this.C_ - r) / a), this.rc = t.bi() - this.Pc(), i && (this.rc = r ? r / this.fl() : this.yn.rightOffset), this.kc(), this.Ku = !0, this.sn.Bc(), this.sn.mr();
  }
  Xc() {
    const t = this.Sc(), i = this.xc();
    if (t === null || i === null) return;
    const a = !this.yn.rightOffsetPixels && this.yn.rightOffset || 0;
    this.Gc(new Yl(t, i + a), !0);
  }
  Jc(t) {
    const i = new Yl(t.from, t.to);
    this.Gc(i);
  }
  rn(t) {
    return this.Po.timeFormatter !== void 0 ? this.Po.timeFormatter(t.originalTime) : this.xu.formatHorzItem(t.time);
  }
  _c() {
    if (!this.yn.ignoreWhitespaceIndices) return;
    this.tc.clear();
    const t = this.sn.Jn();
    for (const i of t) for (const a of i.ul()) this.tc.set(a, !0);
    this.nc++;
  }
  Qc() {
    return this.ec;
  }
  Ml() {
    const t = 1 / (window.devicePixelRatio || 1), i = this.yn.minBarSpacing;
    if (i >= t) return [1];
    const a = [1];
    let r = 2;
    for (; r <= 512; )
      i < t / r && a.push(r), r *= 2;
    return a;
  }
  Lc() {
    const t = this.sn.N().handleScroll, i = this.sn.N().handleScale;
    return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch);
  }
  Sc() {
    return this.$u.length === 0 ? null : 0;
  }
  xc() {
    return this.$u.length === 0 ? null : this.$u.length - 1;
  }
  td(t) {
    return (this.C_ - 1 - t) / this.hc;
  }
  Dc(t) {
    const i = this.td(t), a = this.Pc() + this.rc - i;
    return Math.round(1e6 * a) / 1e6;
  }
  Ec(t) {
    const i = this.hc;
    this.hc = t, this.yc(), i !== this.hc && (this.Ku = !0, this.nd(), this.oc());
  }
  wc() {
    if (!this.Ku) return;
    if (this.Ku = !1, this.Gi()) return void this.sd(Ea.Hu());
    const t = this.Pc(), i = this.C_ / this.hc, a = this.rc + t, r = new Yl(a - i + 1, a);
    this.sd(new Ea(r));
  }
  yc() {
    const t = ka(this.hc, this.ed(), this.rd());
    this.hc !== t && (this.hc = t, this.Ku = !0);
  }
  rd() {
    return this.yn.maxBarSpacing > 0 ? this.yn.maxBarSpacing : 0.5 * this.C_;
  }
  ed() {
    return this.yn.fixLeftEdge && this.yn.fixRightEdge && this.$u.length !== 0 ? this.C_ / this.$u.length : this.yn.minBarSpacing;
  }
  oc() {
    if (!this.yn.enableConflation) return void (this.ec = 1);
    const t = 1 / (window.devicePixelRatio || 1) * (this.yn.conflationThresholdFactor ?? 1);
    if (this.hc >= t) return void (this.ec = 1);
    const i = t / this.hc, a = Math.pow(2, Math.floor(Math.log2(i)));
    this.ec = Math.min(a, 512);
  }
  kc() {
    const t = this.hd();
    t !== null && this.rc < t && (this.rc = t, this.Ku = !0);
    const i = this.ad();
    this.rc > i && (this.rc = i, this.Ku = !0);
  }
  hd() {
    const t = this.Sc(), i = this.Uu;
    return t === null || i === null ? null : t - i - 1 + (this.yn.fixLeftEdge ? this.C_ / this.hc : Math.min(2, this.$u.length));
  }
  ad() {
    return this.yn.fixRightEdge ? 0 : this.C_ / this.hc - Math.min(2, this.$u.length);
  }
  Wc() {
    this.Ju = { fl: this.fl(), Ac: this.Ac() };
  }
  Hc() {
    this.Ju = null;
  }
  zc(t) {
    let i = this.qu.get(t.weight);
    return i === void 0 && (i = new cC(((a) => this.ld(a)), this.xu), this.qu.set(t.weight, i)), i.Cu(t);
  }
  ld(t) {
    return this.xu.formatTickmark(t, this.Po);
  }
  sd(t) {
    const i = this.Yu;
    this.Yu = t, v0(i.Fu(), this.Yu.Fu()) || this.Zu.p(), v0(i.Wu(), this.Yu.Wu()) || this.Gu.p(), this.nd();
  }
  nd() {
    this.Qu = null;
  }
  cc() {
    this.nd(), this.qu.clear();
  }
  lc() {
    this.xu.updateFormatter(this.Po);
  }
  dc() {
    if (!this.yn.fixLeftEdge) return;
    const t = this.Sc();
    if (t === null) return;
    const i = this.Ee();
    if (i === null) return;
    const a = i.Oa() - t;
    if (a < 0) {
      const r = this.rc - a - 1;
      this.gs(r);
    }
    this.yc();
  }
  fc() {
    this.kc(), this.yc();
  }
  Ic(t) {
    return !this.yn.ignoreWhitespaceIndices || this.tc.get(t) || !1;
  }
  Vc(t) {
    const i = (function* (r) {
      const c = Math.round(r), u = c < r;
      let f = 1;
      for (; ; ) u ? (yield c + f, yield c - f) : (yield c - f, yield c + f), f++;
    })(t), a = this.xc();
    for (; a; ) {
      const r = i.next().value;
      if (this.tc.get(r)) return r;
      if (r < 0 || r > a) break;
    }
    return t;
  }
  ac(t) {
    if (t.rightOffsetPixels !== void 0) {
      const i = t.rightOffsetPixels / (t.barSpacing || this.hc);
      this.sn.gs(i);
    }
  }
}
var g0, b0, x0, Ad, y0;
(function(s) {
  s[s.OnTouchEnd = 0] = "OnTouchEnd", s[s.OnNextTap = 1] = "OnNextTap";
})(g0 || (g0 = {}));
class fC {
  constructor(t, i, a) {
    this.od = [], this._d = [], this.ud = null, this.C_ = 0, this.dd = null, this.fd = new te(), this.pd = new te(), this.vd = null, this.md = t, this.yn = i, this.xu = a, this.To = new uj(this.yn.layout.colorParsers), this.wd = new cj(this), this.ia = new dC(this, i.timeScale, this.yn.localization, a), this.Ct = new yj(this, i.crosshair), this.Md = new Pj(i.crosshair), i.addDefaultPane && (this.gd(0), this.od[0].O_(2)), this.bd = this.Sd(0), this.xd = this.Sd(1);
  }
  Pa() {
    this.Cd(ye.ys());
  }
  mr() {
    this.Cd(ye.Cs());
  }
  qa() {
    this.Cd(new ye(1));
  }
  Ta(t) {
    const i = this.yd(t);
    this.Cd(i);
  }
  ou() {
    return this.dd;
  }
  kd(t) {
    if (this.dd?.lu === t?.lu && this.dd?.wu?.te === t?.wu?.te && this.dd?.wu?.ie === t?.wu?.ie && this.dd?.mu === t?.mu && this.dd?.ee === t?.ee) return;
    const i = this.dd;
    this.dd = t, i !== null && this.Ta(i.lu), t !== null && t.lu !== i?.lu && this.Ta(t.lu);
  }
  N() {
    return this.yn;
  }
  vr(t) {
    Pe(this.yn, t), this.od.forEach(((i) => i.E_(t))), t.timeScale !== void 0 && this.ia.vr(t.timeScale), t.localization !== void 0 && this.ia.uc(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.fd.p(), this.bd = this.Sd(0), this.xd = this.Sd(1), this.Pa();
  }
  Pd(t, i, a = 0) {
    const r = this.od[a];
    if (r === void 0) return;
    if (t === "left") return Pe(this.yn, { leftPriceScale: i }), r.E_({ leftPriceScale: i }), this.fd.p(), void this.Pa();
    if (t === "right") return Pe(this.yn, { rightPriceScale: i }), r.E_({ rightPriceScale: i }), this.fd.p(), void this.Pa();
    const c = this.Td(t, a);
    c !== null && (c.Ft.vr(i), this.fd.p());
  }
  Td(t, i) {
    const a = this.od[i];
    if (a === void 0) return null;
    const r = a.A_(t);
    return r !== null ? { Kn: a, Ft: r } : null;
  }
  Et() {
    return this.ia;
  }
  Zn() {
    return this.od;
  }
  Rd() {
    return this.Ct;
  }
  Dd() {
    return this.pd;
  }
  Id(t, i) {
    t.Wo(i), this.Bc();
  }
  N_(t) {
    this.C_ = t, this.ia.N_(this.C_), this.od.forEach(((i) => i.N_(t))), this.Bc();
  }
  Vd(t) {
    this.od.length !== 1 && (we(t >= 0 && t < this.od.length, "Invalid pane index"), this.od.splice(t, 1), this.Pa());
  }
  Bd(t, i) {
    if (this.od.length < 2) return;
    we(t >= 0 && t < this.od.length, "Invalid pane index");
    const a = this.od[t], r = this.od.reduce(((b, y) => b + y.z_()), 0), c = this.od.reduce(((b, y) => b + y.$t()), 0), u = c - 30 * (this.od.length - 1);
    i = Math.min(u, Math.max(30, i));
    const f = r / c, m = a.$t();
    a.O_(i * f);
    let v = i - m, g = this.od.length - 1;
    for (const b of this.od) if (b !== a) {
      const y = Math.min(u, Math.max(30, b.$t() - v / g));
      v -= b.$t() - y, g -= 1;
      const S = y * f;
      b.O_(S);
    }
    this.Pa();
  }
  Ed(t, i) {
    we(t >= 0 && t < this.od.length && i >= 0 && i < this.od.length, "Invalid pane index");
    const a = this.od[t], r = this.od[i];
    this.od[t] = r, this.od[i] = a, this.Pa();
  }
  Ad(t, i) {
    if (we(t >= 0 && t < this.od.length && i >= 0 && i < this.od.length, "Invalid pane index"), t === i) return;
    const [a] = this.od.splice(t, 1);
    this.od.splice(i, 0, a), this.Pa();
  }
  G_(t, i, a) {
    t.G_(i, a);
  }
  X_(t, i, a) {
    t.X_(i, a), this.Ra(), this.Cd(this.Ld(t, 2));
  }
  J_(t, i) {
    t.J_(i), this.Cd(this.Ld(t, 2));
  }
  Q_(t, i, a) {
    i.Eo() || t.Q_(i, a);
  }
  tu(t, i, a) {
    i.Eo() || (t.tu(i, a), this.Ra(), this.Cd(this.Ld(t, 2)));
  }
  iu(t, i) {
    i.Eo() || (t.iu(i), this.Cd(this.Ld(t, 2)));
  }
  eu(t, i) {
    t.eu(i), this.Cd(this.Ld(t, 2));
  }
  zd(t) {
    this.ia.l_(t);
  }
  Od(t, i) {
    const a = this.Et();
    if (a.Gi() || i === 0) return;
    const r = a.nn();
    t = Math.max(1, Math.min(t, r)), a.Fc(t, i), this.Bc();
  }
  Nd(t) {
    this.Fd(0), this.Wd(t), this.Hd();
  }
  Ud(t) {
    this.ia.o_(t), this.Bc();
  }
  $d() {
    this.ia.__(), this.mr();
  }
  Fd(t) {
    this.ia.u_(t);
  }
  Wd(t) {
    this.ia.c_(t), this.Bc();
  }
  Hd() {
    this.ia.d_(), this.mr();
  }
  Jn() {
    return this._d;
  }
  Wn() {
    return this.ud === null && (this.ud = this._d.filter(((t) => t.It()))), this.ud;
  }
  ka() {
    this.ud = null;
  }
  jd(t, i, a, r, c) {
    this.Ct.In(t, i);
    let u = NaN, f = this.ia.Rc(t, !0);
    const m = this.ia.Ee();
    m !== null && (f = Math.min(Math.max(m.Oa(), f), m.bi())), f = this.Ct.Fn(f);
    const v = r.Pn(), g = v.Lt();
    if (g !== null && (u = v.Tn(i, g)), u = this.Md.xl(u, f, r), this.Ct.An(f, u, r), this.qa(), !c) {
      const b = j1(r, t, i);
      this.kd(b && { lu: b.lu, wu: b.wu, mu: b.mu || null, ee: b.ee }), this.pd.p(this.Ct.Bt(), { x: t, y: i }, a);
    }
  }
  qd(t, i, a) {
    const r = a.Pn(), c = r.Lt(), u = r.Nt(t, W(c)), f = this.ia.vc(i, !0), m = this.ia.jt(W(f));
    this.jd(m, u, null, a, !0);
  }
  Yd(t) {
    this.Rd().zn(), this.qa(), t || this.pd.p(null, null, null);
  }
  Ra() {
    const t = this.Ct.Kn();
    if (t !== null) {
      const i = this.Ct.Bn(), a = this.Ct.En();
      this.jd(i, a, null, t);
    }
    this.Ct.Nn();
  }
  Kd(t, i, a) {
    const r = this.ia.Rn(0);
    i !== void 0 && a !== void 0 && this.ia.kt(i, a);
    const c = this.ia.Rn(0), u = this.ia.Pc(), f = this.ia.Ee();
    if (f !== null && r !== null && c !== null) {
      const m = f.ze(u), v = this.xu.key(r) > this.xu.key(c), g = t !== null && t > u && !v, b = this.ia.N().allowShiftVisibleRangeOnWhitespaceReplacement, y = m && (a !== void 0 || b) && this.ia.N().shiftVisibleRangeOnNewBar;
      if (g && !y) {
        const S = t - u;
        this.ia.gs(this.ia.Ac() - S);
      }
    }
    this.ia.Nc(t);
  }
  Va(t) {
    t !== null && t.hu();
  }
  Ks(t) {
    if ((function(a) {
      return a instanceof zd;
    })(t)) return t;
    const i = this.od.find(((a) => a.Dt().includes(t)));
    return i === void 0 ? null : i;
  }
  Bc() {
    this.od.forEach(((t) => t.hu())), this.Ra();
  }
  m() {
    this.od.forEach(((t) => t.m())), this.od.length = 0, this.yn.localization.priceFormatter = void 0, this.yn.localization.percentageFormatter = void 0, this.yn.localization.timeFormatter = void 0;
  }
  Zd() {
    return this.wd;
  }
  Js() {
    return this.wd.N();
  }
  L_() {
    return this.fd;
  }
  Gd(t, i) {
    const a = this.gd(i);
    this.Xd(t, a), this._d.push(t), this.ka(), this._d.length === 1 ? this.Pa() : this.mr();
  }
  Jd(t) {
    const i = this.Ks(t), a = this._d.indexOf(t);
    we(a !== -1, "Series not found");
    const r = W(i);
    this._d.splice(a, 1), r.r_(t), t.m && t.m(), this.ka(), this.ia._c(), this.Qd(r);
  }
  ya(t, i) {
    const a = W(this.Ks(t));
    a.r_(t, !0), a.s_(t, i, !0);
  }
  Xc() {
    const t = ye.Cs();
    t.us(), this.Cd(t);
  }
  tf(t) {
    const i = ye.Cs();
    i.fs(t), this.Cd(i);
  }
  ws() {
    const t = ye.Cs();
    t.ws(), this.Cd(t);
  }
  Ms(t) {
    const i = ye.Cs();
    i.Ms(t), this.Cd(i);
  }
  gs(t) {
    const i = ye.Cs();
    i.gs(t), this.Cd(i);
  }
  ps(t) {
    const i = ye.Cs();
    i.ps(t), this.Cd(i);
  }
  cs() {
    const t = ye.Cs();
    t.cs(), this.Cd(t);
  }
  if() {
    const t = this.yn.defaultVisiblePriceScaleId, i = this.yn.leftPriceScale.visible;
    return i !== this.yn.rightPriceScale.visible ? i ? "left" : "right" : t;
  }
  nf(t, i) {
    if (we(i >= 0, "Index should be greater or equal to 0"), i === this.sf(t)) return;
    const a = W(this.Ks(t));
    a.r_(t);
    const r = this.gd(i);
    this.Xd(t, r);
    let c = !1;
    a.Cl().length === 0 && (c = this.Qd(a)), c || this.Pa();
  }
  ef() {
    return this.xd;
  }
  $() {
    return this.bd;
  }
  Ut(t) {
    const i = this.xd, a = this.bd;
    if (i === a) return i;
    if (t = Math.max(0, Math.min(100, Math.round(100 * t))), this.vd === null || this.vd.ah !== a || this.vd.oh !== i) this.vd = { ah: a, oh: i, rf: /* @__PURE__ */ new Map() };
    else {
      const c = this.vd.rf.get(t);
      if (c !== void 0) return c;
    }
    const r = this.To.tt(a, i, t / 100);
    return this.vd.rf.set(t, r), r;
  }
  hf(t) {
    return this.od.indexOf(t);
  }
  Xi() {
    return this.To;
  }
  af() {
    return this.lf();
  }
  lf(t) {
    const i = new zd(this.ia, this);
    this.od.push(i);
    const a = t ?? this.od.length - 1, r = ye.ys();
    return r.es(a, { rs: 0, hs: !0 }), this.Cd(r), i;
  }
  gd(t) {
    return we(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.od.length, t)) < this.od.length ? this.od[t] : this.lf(t);
  }
  sf(t) {
    return this.od.findIndex(((i) => i.U_().includes(t)));
  }
  Ld(t, i) {
    const a = new ye(i);
    if (t !== null) {
      const r = this.od.indexOf(t);
      a.es(r, { rs: i });
    }
    return a;
  }
  yd(t, i) {
    return i === void 0 && (i = 2), this.Ld(this.Ks(t), i);
  }
  Cd(t) {
    this.md && this.md(t), this.od.forEach(((i) => i.pu().wr().kt()));
  }
  Xd(t, i) {
    const a = t.N().priceScaleId, r = a !== void 0 ? a : this.if();
    i.s_(t, r), xc(r) || t.vr(t.N());
  }
  Sd(t) {
    const i = this.yn.layout;
    return i.background.type === "gradient" ? t === 0 ? i.background.topColor : i.background.bottomColor : i.background.color;
  }
  Qd(t) {
    return !t.H_() && t.Cl().length === 0 && this.od.length > 1 && (this.od.splice(this.hf(t), 1), this.Pa(), !0);
  }
}
function C1(s) {
  if (s >= 1) return 0;
  let t = 0;
  for (; t < 8; t++) {
    const i = Math.round(s);
    if (Math.abs(i - s) < 1e-8) return t;
    s *= 10;
  }
  return t;
}
function Od(s) {
  return !Oa(s) && !cr(s);
}
function k1(s) {
  return Oa(s);
}
(function(s) {
  s[s.Disabled = 0] = "Disabled", s[s.Continuous = 1] = "Continuous", s[s.OnDataUpdate = 2] = "OnDataUpdate";
})(b0 || (b0 = {})), (function(s) {
  s[s.LastBar = 0] = "LastBar", s[s.LastVisible = 1] = "LastVisible";
})(x0 || (x0 = {})), (function(s) {
  s.Solid = "solid", s.VerticalGradient = "gradient";
})(Ad || (Ad = {})), (function(s) {
  s[s.Year = 0] = "Year", s[s.Month = 1] = "Month", s[s.DayOfMonth = 2] = "DayOfMonth", s[s.Time = 3] = "Time", s[s.TimeWithSeconds = 4] = "TimeWithSeconds";
})(y0 || (y0 = {}));
const w0 = (s) => s.getUTCFullYear();
function mC(s, t, i) {
  return t.replace(/yyyy/g, ((a) => pn(w0(a), 4))(s)).replace(/yy/g, ((a) => pn(w0(a) % 100, 2))(s)).replace(/MMMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "long" }))(s, i)).replace(/MMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "short" }))(s, i)).replace(/MM/g, ((a) => pn(((r) => r.getUTCMonth() + 1)(a), 2))(s)).replace(/dd/g, ((a) => pn(((r) => r.getUTCDate())(a), 2))(s));
}
class E1 {
  constructor(t = "yyyy-MM-dd", i = "default") {
    this._f = t, this.uf = i;
  }
  Cu(t) {
    return mC(t, this._f, this.uf);
  }
}
class pC {
  constructor(t) {
    this.cf = t || "%h:%m:%s";
  }
  Cu(t) {
    return this.cf.replace("%h", pn(t.getUTCHours(), 2)).replace("%m", pn(t.getUTCMinutes(), 2)).replace("%s", pn(t.getUTCSeconds(), 2));
  }
}
const vC = { df: "yyyy-MM-dd", ff: "%h:%m:%s", pf: " ", vf: "default" };
class gC {
  constructor(t = {}) {
    const i = { ...vC, ...t };
    this.mf = new E1(i.df, i.vf), this.wf = new pC(i.ff), this.Mf = i.pf;
  }
  Cu(t) {
    return `${this.mf.Cu(t)}${this.Mf}${this.wf.Cu(t)}`;
  }
}
function Do(s) {
  return 60 * s * 60 * 1e3;
}
function id(s) {
  return 60 * s * 1e3;
}
const Ro = [{ gf: (_0 = 1, 1e3 * _0), bf: 10 }, { gf: id(1), bf: 20 }, { gf: id(5), bf: 21 }, { gf: id(30), bf: 22 }, { gf: Do(1), bf: 30 }, { gf: Do(3), bf: 31 }, { gf: Do(6), bf: 32 }, { gf: Do(12), bf: 33 }];
var _0;
function S0(s, t) {
  if (s.getUTCFullYear() !== t.getUTCFullYear()) return 70;
  if (s.getUTCMonth() !== t.getUTCMonth()) return 60;
  if (s.getUTCDate() !== t.getUTCDate()) return 50;
  for (let i = Ro.length - 1; i >= 0; --i) if (Math.floor(t.getTime() / Ro[i].gf) !== Math.floor(s.getTime() / Ro[i].gf)) return Ro[i].bf;
  return 0;
}
function nd(s) {
  let t = s;
  if (cr(s) && (t = df(s)), !Od(t)) throw new Error("time must be of type BusinessDay");
  const i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
  return { Sf: Math.round(i.getTime() / 1e3), xf: t };
}
function M0(s) {
  if (!k1(s)) throw new Error("time must be of type isUTCTimestamp");
  return { Sf: s };
}
function df(s) {
  const t = new Date(s);
  if (isNaN(t.getTime())) throw new Error(`Invalid date string=${s}, expected format=yyyy-mm-dd`);
  return { day: t.getUTCDate(), month: t.getUTCMonth() + 1, year: t.getUTCFullYear() };
}
function N0(s) {
  cr(s.time) && (s.time = df(s.time));
}
class j0 {
  options() {
    return this.yn;
  }
  setOptions(t) {
    this.yn = t, this.updateFormatter(t.localization);
  }
  preprocessData(t) {
    Array.isArray(t) ? (function(i) {
      i.forEach(N0);
    })(t) : N0(t);
  }
  createConverterToInternalObj(t) {
    return W((function(i) {
      return i.length === 0 ? null : Od(i[0].time) || cr(i[0].time) ? nd : M0;
    })(t));
  }
  key(t) {
    return typeof t == "object" && "Sf" in t ? t.Sf : this.key(this.convertHorzItemToInternal(t));
  }
  cacheKey(t) {
    const i = t;
    return i.xf === void 0 ? new Date(1e3 * i.Sf).getTime() : new Date(Date.UTC(i.xf.year, i.xf.month - 1, i.xf.day)).getTime();
  }
  convertHorzItemToInternal(t) {
    return k1(i = t) ? M0(i) : Od(i) ? nd(i) : nd(df(i));
    var i;
  }
  updateFormatter(t) {
    if (!this.yn) return;
    const i = t.dateFormat;
    this.yn.timeScale.timeVisible ? this.Cf = new gC({ df: i, ff: this.yn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m", pf: "   ", vf: t.locale }) : this.Cf = new E1(i, t.locale);
  }
  formatHorzItem(t) {
    const i = t;
    return this.Cf.Cu(new Date(1e3 * i.Sf));
  }
  formatTickmark(t, i) {
    const a = (function(c, u, f) {
      switch (c) {
        case 0:
        case 10:
          return u ? f ? 4 : 3 : 2;
        case 20:
        case 21:
        case 22:
        case 30:
        case 31:
        case 32:
        case 33:
          return u ? 3 : 2;
        case 50:
          return 2;
        case 60:
          return 1;
        case 70:
          return 0;
      }
    })(t.weight, this.yn.timeScale.timeVisible, this.yn.timeScale.secondsVisible), r = this.yn.timeScale;
    if (r.tickMarkFormatter !== void 0) {
      const c = r.tickMarkFormatter(t.originalTime, a, i.locale);
      if (c !== null) return c;
    }
    return (function(c, u, f) {
      const m = {};
      switch (u) {
        case 0:
          m.year = "numeric";
          break;
        case 1:
          m.month = "short";
          break;
        case 2:
          m.day = "numeric";
          break;
        case 3:
          m.hour12 = !1, m.hour = "2-digit", m.minute = "2-digit";
          break;
        case 4:
          m.hour12 = !1, m.hour = "2-digit", m.minute = "2-digit", m.second = "2-digit";
      }
      const v = c.xf === void 0 ? new Date(1e3 * c.Sf) : new Date(Date.UTC(c.xf.year, c.xf.month - 1, c.xf.day));
      return new Date(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()).toLocaleString(f, m);
    })(t.time, a, i.locale);
  }
  maxTickMarkWeight(t) {
    let i = t.reduce(hC, t[0]).weight;
    return i > 30 && i < 50 && (i = 30), i;
  }
  fillWeightsForPoints(t, i) {
    (function(a, r = 0) {
      if (a.length === 0) return;
      let c = r === 0 ? null : a[r - 1].time.Sf, u = c !== null ? new Date(1e3 * c) : null, f = 0;
      for (let m = r; m < a.length; ++m) {
        const v = a[m], g = new Date(1e3 * v.time.Sf);
        u !== null && (v.timeWeight = S0(g, u)), f += v.time.Sf - (c || v.time.Sf), c = v.time.Sf, u = g;
      }
      if (r === 0 && a.length > 1) {
        const m = Math.ceil(f / (a.length - 1)), v = new Date(1e3 * (a[0].time.Sf - m));
        a[0].timeWeight = S0(new Date(1e3 * a[0].time.Sf), v);
      }
    })(t, i);
  }
  static yf(t) {
    return Pe({ localization: { dateFormat: "dd MMM 'yy" } }, t ?? {});
  }
}
const Da = typeof window < "u";
function C0() {
  return !!Da && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function sd() {
  return !!Da && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function bC(s, t) {
  switch (s) {
    case "custom":
      return t !== void 0 ? "custom-object" : "series";
    case "price-line":
      return "custom-price-line";
    case "marker":
      return "series-marker";
    case "primitive":
      return "primitive";
    default:
      return "series";
  }
}
function Dd(s) {
  return s + s % 2;
}
function xC(s) {
  Da && window.chrome !== void 0 && s.addEventListener("mousedown", ((t) => {
    if (t.button === 1) return t.preventDefault(), !1;
  }));
}
class _c {
  constructor(t, i, a) {
    this.kf = 0, this.Pf = null, this.Tf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Rf = 0, this.Df = null, this.If = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Vf = null, this.Bf = !1, this.Ef = null, this.Af = null, this.Lf = !1, this.zf = !1, this.Of = !1, this.Nf = null, this.Ff = null, this.Wf = null, this.Hf = null, this.Uf = null, this.$f = null, this.jf = null, this.qf = 0, this.Yf = !1, this.Kf = !1, this.Zf = !1, this.Gf = 0, this.Xf = null, this.Jf = !sd(), this.Qf = (r) => {
      this.tp(r);
    }, this.ip = (r) => {
      if (this.np(r)) {
        const c = this.sp(r);
        if (++this.Rf, this.Df && this.Rf > 1) {
          const { ep: u } = this.rp(Li(r), this.If);
          u < 30 && !this.Of && this.hp(c, this.lp.ap), this.op();
        }
      } else {
        const c = this.sp(r);
        if (++this.kf, this.Pf && this.kf > 1) {
          const { ep: u } = this.rp(Li(r), this.Tf);
          u < 5 && !this.zf && this._p(c, this.lp.up), this.cp();
        }
      }
    }, this.dp = t, this.lp = i, this.yn = a, this.fp();
  }
  m() {
    this.Nf !== null && (this.Nf(), this.Nf = null), this.Ff !== null && (this.Ff(), this.Ff = null), this.Hf !== null && (this.Hf(), this.Hf = null), this.Uf !== null && (this.Uf(), this.Uf = null), this.$f !== null && (this.$f(), this.$f = null), this.Wf !== null && (this.Wf(), this.Wf = null), this.pp(), this.cp();
  }
  vp(t) {
    this.Hf && this.Hf();
    const i = this.mp.bind(this);
    if (this.Hf = () => {
      this.dp.removeEventListener("mousemove", i);
    }, this.dp.addEventListener("mousemove", i), this.np(t)) return;
    const a = this.sp(t);
    this._p(a, this.lp.wp), this.Jf = !0;
  }
  cp() {
    this.Pf !== null && clearTimeout(this.Pf), this.kf = 0, this.Pf = null, this.Tf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY };
  }
  op() {
    this.Df !== null && clearTimeout(this.Df), this.Rf = 0, this.Df = null, this.If = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY };
  }
  mp(t) {
    if (this.Zf || this.Af !== null || this.np(t)) return;
    const i = this.sp(t);
    this._p(i, this.lp.Mp), this.Jf = !0;
  }
  gp(t) {
    const i = ad(t.changedTouches, W(this.Xf));
    if (i === null || (this.Gf = Lo(t), this.jf !== null) || this.Kf) return;
    this.Yf = !0;
    const a = this.rp(Li(i), W(this.Af)), { bp: r, Sp: c, ep: u } = a;
    if (this.Lf || !(u < 5)) {
      if (!this.Lf) {
        const f = 0.5 * r, m = c >= f && !this.yn.xp(), v = f > c && !this.yn.Cp();
        m || v || (this.Kf = !0), this.Lf = !0, this.Of = !0, this.pp(), this.op();
      }
      if (!this.Kf) {
        const f = this.sp(t, i);
        this.hp(f, this.lp.yp), wa(t);
      }
    }
  }
  kp(t) {
    if (t.button !== 0) return;
    const i = this.rp(Li(t), W(this.Ef)), { ep: a } = i;
    if (a >= 5 && (this.zf = !0, this.cp()), this.zf) {
      const r = this.sp(t);
      this._p(r, this.lp.Pp);
    }
  }
  rp(t, i) {
    const a = Math.abs(i._t - t._t), r = Math.abs(i.ut - t.ut);
    return { bp: a, Sp: r, ep: a + r };
  }
  Tp(t) {
    let i = ad(t.changedTouches, W(this.Xf));
    if (i === null && t.touches.length === 0 && (i = t.changedTouches[0]), i === null) return;
    this.Xf = null, this.Gf = Lo(t), this.pp(), this.Af = null, this.$f && (this.$f(), this.$f = null);
    const a = this.sp(t, i);
    if (this.hp(a, this.lp.Rp), ++this.Rf, this.Df && this.Rf > 1) {
      const { ep: r } = this.rp(Li(i), this.If);
      r < 30 && !this.Of && this.hp(a, this.lp.ap), this.op();
    } else this.Of || (this.hp(a, this.lp.Dp), this.lp.Dp && wa(t));
    this.Rf === 0 && wa(t), t.touches.length === 0 && this.Bf && (this.Bf = !1, wa(t));
  }
  tp(t) {
    if (t.button !== 0) return;
    const i = this.sp(t);
    if (this.Ef = null, this.Zf = !1, this.Uf && (this.Uf(), this.Uf = null), C0() && this.dp.ownerDocument.documentElement.removeEventListener("mouseleave", this.Qf), !this.np(t)) if (this._p(i, this.lp.Ip), ++this.kf, this.Pf && this.kf > 1) {
      const { ep: a } = this.rp(Li(t), this.Tf);
      a < 5 && !this.zf && this._p(i, this.lp.up), this.cp();
    } else this.zf || this._p(i, this.lp.Vp);
  }
  pp() {
    this.Vf !== null && (clearTimeout(this.Vf), this.Vf = null);
  }
  Bp(t) {
    if (this.Xf !== null) return;
    const i = t.changedTouches[0];
    this.Xf = i.identifier, this.Gf = Lo(t);
    const a = this.dp.ownerDocument.documentElement;
    this.Of = !1, this.Lf = !1, this.Kf = !1, this.Af = Li(i), this.$f && (this.$f(), this.$f = null);
    {
      const c = this.gp.bind(this), u = this.Tp.bind(this);
      this.$f = () => {
        a.removeEventListener("touchmove", c), a.removeEventListener("touchend", u);
      }, a.addEventListener("touchmove", c, { passive: !1 }), a.addEventListener("touchend", u, { passive: !1 }), this.pp(), this.Vf = setTimeout(this.Ep.bind(this, t), 240);
    }
    const r = this.sp(t, i);
    this.hp(r, this.lp.Ap), this.Df || (this.Rf = 0, this.Df = setTimeout(this.op.bind(this), 500), this.If = Li(i));
  }
  Lp(t) {
    if (t.button !== 0) return;
    const i = this.dp.ownerDocument.documentElement;
    C0() && i.addEventListener("mouseleave", this.Qf), this.zf = !1, this.Ef = Li(t), this.Uf && (this.Uf(), this.Uf = null);
    {
      const r = this.kp.bind(this), c = this.tp.bind(this);
      this.Uf = () => {
        i.removeEventListener("mousemove", r), i.removeEventListener("mouseup", c);
      }, i.addEventListener("mousemove", r), i.addEventListener("mouseup", c);
    }
    if (this.Zf = !0, this.np(t)) return;
    const a = this.sp(t);
    this._p(a, this.lp.zp), this.Pf || (this.kf = 0, this.Pf = setTimeout(this.cp.bind(this), 500), this.Tf = Li(t));
  }
  fp() {
    this.dp.addEventListener("mouseenter", this.vp.bind(this)), this.dp.addEventListener("touchcancel", this.pp.bind(this));
    {
      const t = this.dp.ownerDocument, i = (a) => {
        this.lp.Op && (a.composed && this.dp.contains(a.composedPath()[0]) || a.target && this.dp.contains(a.target) || this.lp.Op());
      };
      this.Ff = () => {
        t.removeEventListener("touchstart", i);
      }, this.Nf = () => {
        t.removeEventListener("mousedown", i);
      }, t.addEventListener("mousedown", i), t.addEventListener("touchstart", i, { passive: !0 });
    }
    sd() && (this.Wf = () => {
      this.dp.removeEventListener("dblclick", this.ip);
    }, this.dp.addEventListener("dblclick", this.ip)), this.dp.addEventListener("mouseleave", this.Np.bind(this)), this.dp.addEventListener("touchstart", this.Bp.bind(this), { passive: !0 }), xC(this.dp), this.dp.addEventListener("mousedown", this.Lp.bind(this)), this.Fp(), this.dp.addEventListener("touchmove", (() => {
    }), { passive: !1 });
  }
  Fp() {
    this.lp.Wp === void 0 && this.lp.Hp === void 0 && this.lp.Up === void 0 || (this.dp.addEventListener("touchstart", ((t) => this.$p(t.touches)), { passive: !0 }), this.dp.addEventListener("touchmove", ((t) => {
      if (t.touches.length === 2 && this.jf !== null && this.lp.Hp !== void 0) {
        const i = k0(t.touches[0], t.touches[1]) / this.qf;
        this.lp.Hp(this.jf, i), wa(t);
      }
    }), { passive: !1 }), this.dp.addEventListener("touchend", ((t) => {
      this.$p(t.touches);
    })));
  }
  $p(t) {
    t.length === 1 && (this.Yf = !1), t.length !== 2 || this.Yf || this.Bf ? this.jp() : this.qp(t);
  }
  qp(t) {
    const i = this.dp.getBoundingClientRect() || { left: 0, top: 0 };
    this.jf = { _t: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2, ut: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2 }, this.qf = k0(t[0], t[1]), this.lp.Wp !== void 0 && this.lp.Wp(), this.pp();
  }
  jp() {
    this.jf !== null && (this.jf = null, this.lp.Up !== void 0 && this.lp.Up());
  }
  Np(t) {
    if (this.Hf && this.Hf(), this.np(t) || !this.Jf) return;
    const i = this.sp(t);
    this._p(i, this.lp.Yp), this.Jf = !sd();
  }
  Ep(t) {
    const i = ad(t.touches, W(this.Xf));
    if (i === null) return;
    const a = this.sp(t, i);
    this.hp(a, this.lp.Kp), this.Of = !0, this.Bf = !0;
  }
  np(t) {
    return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : Lo(t) < this.Gf + 500;
  }
  hp(t, i) {
    i && i.call(this.lp, t);
  }
  _p(t, i) {
    i && i.call(this.lp, t);
  }
  sp(t, i) {
    const a = i || t, r = this.dp.getBoundingClientRect() || { left: 0, top: 0 };
    return { clientX: a.clientX, clientY: a.clientY, pageX: a.pageX, pageY: a.pageY, screenX: a.screenX, screenY: a.screenY, localX: a.clientX - r.left, localY: a.clientY - r.top, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey, metaKey: t.metaKey, Zp: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click", Gp: t.type, Xp: a.target, gu: t.view, Jp: () => {
      t.type !== "touchstart" && wa(t);
    } };
  }
}
function k0(s, t) {
  const i = s.clientX - t.clientX, a = s.clientY - t.clientY;
  return Math.sqrt(i * i + a * a);
}
function wa(s) {
  s.cancelable && s.preventDefault();
}
function Li(s) {
  return { _t: s.pageX, ut: s.pageY };
}
function Lo(s) {
  return s.timeStamp || performance.now();
}
function ad(s, t) {
  for (let i = 0; i < s.length; ++i) if (s[i].identifier === t) return s[i];
  return null;
}
class yC {
  constructor(t, i, a) {
    this.Qp = null, this.tv = null, this.iv = !0, this.nv = null, this.sv = t, this.ev = t.rv()[i], this.hv = t.rv()[a], this.av = document.createElement("tr"), this.av.style.height = "1px", this.lv = document.createElement("td"), this.lv.style.position = "relative", this.lv.style.padding = "0", this.lv.style.margin = "0", this.lv.setAttribute("colspan", "3"), this.ov(), this.av.appendChild(this.lv), this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp = null, this.tv = null);
  }
  m() {
    this.tv !== null && this.tv.m();
  }
  uv() {
    return this.av;
  }
  cv() {
    return Vt({ width: this.ev.cv().width, height: 1 });
  }
  dv() {
    return Vt({ width: this.ev.dv().width, height: 1 * window.devicePixelRatio });
  }
  fv(t, i, a) {
    const r = this.dv();
    t.fillStyle = this.sv.N().layout.panes.separatorColor, t.fillRect(i, a, r.width, r.height);
  }
  kt() {
    this.ov(), this.sv.N().layout.panes.enableResize !== this.iv && (this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp !== null && (this.lv.removeChild(this.Qp.pv), this.lv.removeChild(this.Qp.vv), this.Qp = null), this.tv !== null && (this.tv.m(), this.tv = null)));
  }
  _v() {
    const t = document.createElement("div"), i = t.style;
    i.position = "fixed", i.display = "none", i.zIndex = "49", i.top = "0", i.left = "0", i.width = "100%", i.height = "100%", i.cursor = "row-resize", this.lv.appendChild(t);
    const a = document.createElement("div"), r = a.style;
    r.position = "absolute", r.zIndex = "50", r.top = "-4px", r.height = "9px", r.width = "100%", r.backgroundColor = "", r.cursor = "row-resize", this.lv.appendChild(a);
    const c = { wp: this.mv.bind(this), Yp: this.wv.bind(this), zp: this.Mv.bind(this), Ap: this.Mv.bind(this), Pp: this.gv.bind(this), yp: this.gv.bind(this), Ip: this.bv.bind(this), Rp: this.bv.bind(this) };
    this.tv = new _c(a, c, { xp: () => !1, Cp: () => !0 }), this.Qp = { vv: a, pv: t };
  }
  ov() {
    this.lv.style.background = this.sv.N().layout.panes.separatorColor;
  }
  mv(t) {
    this.Qp !== null && (this.Qp.vv.style.backgroundColor = this.sv.N().layout.panes.separatorHoverColor);
  }
  wv(t) {
    this.Qp !== null && this.nv === null && (this.Qp.vv.style.backgroundColor = "");
  }
  Mv(t) {
    if (this.Qp === null) return;
    const i = this.ev.Sv().z_() + this.hv.Sv().z_(), a = i / (this.ev.cv().height + this.hv.cv().height), r = 30 * a;
    i <= 2 * r || (this.nv = { xv: t.pageY, Cv: this.ev.Sv().z_(), yv: i - r, kv: i, Pv: a, Tv: r }, this.Qp.pv.style.display = "block");
  }
  gv(t) {
    const i = this.nv;
    if (i === null) return;
    const a = (t.pageY - i.xv) * i.Pv, r = ka(i.Cv + a, i.Tv, i.yv);
    this.ev.Sv().O_(r), this.hv.Sv().O_(i.kv - r), this.sv.Qt().Pa();
  }
  bv(t) {
    this.nv !== null && this.Qp !== null && (this.nv = null, this.Qp.pv.style.display = "none");
  }
}
function ld(s, t) {
  return s.Rv - t.Rv;
}
function rd(s, t, i) {
  const a = (s.Rv - t.Rv) / (s.wt - t.wt);
  return Math.sign(a) * Math.min(Math.abs(a), i);
}
class wC {
  constructor(t, i, a, r) {
    this.Dv = null, this.Iv = null, this.Vv = null, this.Bv = null, this.Ev = null, this.Av = 0, this.Lv = 0, this.zv = t, this.Ov = i, this.Nv = a, this.ks = r;
  }
  Fv(t, i) {
    if (this.Dv !== null) {
      if (this.Dv.wt === i) return void (this.Dv.Rv = t);
      if (Math.abs(this.Dv.Rv - t) < this.ks) return;
    }
    this.Bv = this.Vv, this.Vv = this.Iv, this.Iv = this.Dv, this.Dv = { wt: i, Rv: t };
  }
  me(t, i) {
    if (this.Dv === null || this.Iv === null || i - this.Dv.wt > 50) return;
    let a = 0;
    const r = rd(this.Dv, this.Iv, this.Ov), c = ld(this.Dv, this.Iv), u = [r], f = [c];
    if (a += c, this.Vv !== null) {
      const v = rd(this.Iv, this.Vv, this.Ov);
      if (Math.sign(v) === Math.sign(r)) {
        const g = ld(this.Iv, this.Vv);
        if (u.push(v), f.push(g), a += g, this.Bv !== null) {
          const b = rd(this.Vv, this.Bv, this.Ov);
          if (Math.sign(b) === Math.sign(r)) {
            const y = ld(this.Vv, this.Bv);
            u.push(b), f.push(y), a += y;
          }
        }
      }
    }
    let m = 0;
    for (let v = 0; v < u.length; ++v) m += f[v] / a * u[v];
    Math.abs(m) < this.zv || (this.Ev = { Rv: t, wt: i }, this.Lv = m, this.Av = (function(v, g) {
      const b = Math.log(g);
      return Math.log(1 * b / -v) / b;
    })(Math.abs(m), this.Nv));
  }
  qc(t) {
    const i = W(this.Ev), a = t - i.wt;
    return i.Rv + this.Lv * (Math.pow(this.Nv, a) - 1) / Math.log(this.Nv);
  }
  jc(t) {
    return this.Ev === null || this.Wv(t) === this.Av;
  }
  Wv(t) {
    const i = t - W(this.Ev).wt;
    return Math.min(i, this.Av);
  }
}
class _C {
  constructor(t, i) {
    this.Hv = void 0, this.Uv = void 0, this.$v = void 0, this.vn = !1, this.jv = t, this.qv = i, this.Yv();
  }
  kt() {
    this.Yv();
  }
  Kv() {
    this.Hv && this.jv.removeChild(this.Hv), this.Uv && this.jv.removeChild(this.Uv), this.Hv = void 0, this.Uv = void 0;
  }
  Zv() {
    return this.vn !== this.Gv() || this.$v !== this.Xv();
  }
  Xv() {
    return this.qv.Qt().Xi().J(this.qv.N().layout.textColor) > 160 ? "dark" : "light";
  }
  Gv() {
    return this.qv.N().layout.attributionLogo;
  }
  Jv() {
    const t = new URL(location.href);
    return t.hostname ? "&utm_source=" + t.hostname + t.pathname : "";
  }
  Yv() {
    this.Zv() && (this.Kv(), this.vn = this.Gv(), this.vn && (this.$v = this.Xv(), this.Uv = document.createElement("style"), this.Uv.innerText = "a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}", this.Hv = document.createElement("a"), this.Hv.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this.Jv()}`, this.Hv.title = "Charting by TradingView", this.Hv.id = "tv-attr-logo", this.Hv.target = "_blank", this.Hv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>', this.Hv.toggleAttribute("data-dark", this.$v === "dark"), this.jv.appendChild(this.Uv), this.jv.appendChild(this.Hv)));
  }
}
function Es(s, t) {
  const i = W(s.ownerDocument).createElement("canvas");
  s.appendChild(i);
  const a = aj(i, { options: { allowResizeObserver: !0 }, transform: (r, c) => ({ width: Math.max(r.width, c.width), height: Math.max(r.height, c.height) }) });
  return a.resizeCanvasElement(t), a;
}
function zs(s) {
  s.width = 1, s.height = 1, s.getContext("2d")?.clearRect(0, 0, 1, 1);
}
function Rd(s, t, i, a) {
  s.qh && s.qh(t, i, a);
}
function Go(s, t, i, a) {
  s.st(t, i, a);
}
function Ld(s, t, i, a) {
  const r = s(i, a);
  for (const c of r) {
    const u = c.Tt(a);
    u !== null && t(u);
  }
}
function od(s, t) {
  return (i) => (function(a) {
    return a.Ft !== void 0;
  })(i) ? (i.Ft()?.cl() ?? "") !== t ? [] : i.Ga?.(s) ?? [] : [];
}
function E0(s, t, i, a) {
  if (!s.length) return;
  let r = 0;
  const c = s[0].$t(a, !0);
  let u = t === 1 ? i / 2 - (s[0].Hi() - c / 2) : s[0].Hi() - c / 2 - i / 2;
  u = Math.max(0, u);
  for (let f = 1; f < s.length; f++) {
    const m = s[f], v = s[f - 1], g = v.$t(a, !1), b = m.Hi(), y = v.Hi();
    if (t === 1 ? b > y - g : b < y + g) {
      const S = y - g * t;
      m.Ui(S);
      const w = S - t * g / 2;
      if ((t === 1 ? w < 0 : w > i) && u > 0) {
        const M = t === 1 ? -1 - w : w - i, N = Math.min(M, u);
        for (let k = r; k < s.length; k++) s[k].Ui(s[k].Hi() + t * N);
        u -= N;
      }
    } else r = f, u = t === 1 ? y - g - b : b - (y + g);
  }
}
class z0 {
  constructor(t, i, a, r) {
    this.Ki = null, this.Qv = null, this.tm = !1, this.im = new sc(200), this.nm = null, this.sm = 0, this.rm = !1, this.hm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.lm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.yt = t, this.yn = i, this.ko = i.layout, this.wd = a, this.om = r === "left", this._m = od("normal", r), this.um = od("top", r), this.dm = od("bottom", r), this.lv = document.createElement("div"), this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.lv.style.width = "25px", this.lv.style.left = "0", this.lv.style.position = "relative", this.fm = Es(this.lv, Vt({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const c = this.fm.canvasElement;
    c.style.position = "absolute", c.style.zIndex = "1", c.style.left = "0", c.style.top = "0", this.pm = Es(this.lv, Vt({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const u = this.pm.canvasElement;
    u.style.position = "absolute", u.style.zIndex = "2", u.style.left = "0", u.style.top = "0";
    const f = { zp: this.Mv.bind(this), Ap: this.Mv.bind(this), Pp: this.gv.bind(this), yp: this.gv.bind(this), Op: this.vm.bind(this), Ip: this.bv.bind(this), Rp: this.bv.bind(this), up: this.wm.bind(this), ap: this.wm.bind(this), wp: this.Mm.bind(this), Yp: this.wv.bind(this) };
    this.tv = new _c(this.pm.canvasElement, f, { xp: () => !this.yn.handleScroll.vertTouchDrag, Cp: () => !0 });
  }
  m() {
    this.tv.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), zs(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), zs(this.fm.canvasElement), this.fm.dispose(), this.Ki !== null && this.Ki.a_().u(this), this.Ki = null;
  }
  uv() {
    return this.lv;
  }
  k() {
    return this.ko.fontSize;
  }
  gm() {
    const t = this.wd.N();
    return this.nm !== t.P && (this.im.Os(), this.nm = t.P), t;
  }
  bm() {
    if (this.Ki === null) return 0;
    let t = 0;
    const i = this.gm(), a = W(this.fm.canvasElement.getContext("2d", { colorSpace: this.yt.am().N().layout.colorSpace }));
    a.save();
    const r = this.Ki.El();
    a.font = this.Sm(), r.length > 0 && (t = Math.max(this.im.Ii(a, r[0].io), this.im.Ii(a, r[r.length - 1].io)));
    const c = this.xm();
    for (let v = c.length; v--; ) {
      const g = this.im.Ii(a, c[v].ri());
      g > t && (t = g);
    }
    const u = this.Ki.Lt();
    if (u !== null && this.Qv !== null && (f = this.yn.crosshair).mode !== 2 && f.horzLine.visible && f.horzLine.labelVisible) {
      const v = this.Ki.Tn(1, u), g = this.Ki.Tn(this.Qv.height - 2, u);
      t = Math.max(t, this.im.Ii(a, this.Ki.Ji(Math.floor(Math.min(v, g)) + 0.11111111111111, u)), this.im.Ii(a, this.Ki.Ji(Math.ceil(Math.max(v, g)) - 0.11111111111111, u)));
    }
    var f;
    a.restore();
    const m = t || 34;
    return Dd(Math.ceil(i.S + i.C + i.V + i.B + 5 + m));
  }
  Cm(t) {
    this.Qv !== null && Ms(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`);
  }
  ym() {
    return W(this.Qv).width;
  }
  un(t) {
    this.Ki !== t && (this.Ki !== null && this.Ki.a_().u(this), this.Ki = t, t.a_().i(this.po.bind(this), this));
  }
  Ft() {
    return this.Ki;
  }
  Os() {
    const t = this.yt.Sv();
    this.yt.am().Qt().eu(t, W(this.Ft()));
  }
  km(t) {
    if (this.Qv === null) return;
    const i = { colorSpace: this.yt.am().N().layout.colorSpace };
    if (t !== 1) {
      this.Pm(), this.fm.applySuggestedBitmapSize();
      const r = Cs(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((c) => {
        this.Tm(c), this.Rm(c);
      })), this.yt.Dm(r, this.dm), this.Im(r), this.yt.Dm(r, this._m), this.Vm(r));
    }
    this.pm.applySuggestedBitmapSize();
    const a = Cs(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: c }) => {
      r.clearRect(0, 0, c.width, c.height);
    })), this.Bm(a), this.yt.Dm(a, this.um));
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, i, a, r) {
    const c = this.dv();
    if (c.width > 0 && c.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const u = this.pm.canvasElement;
      t.drawImage(u, i, a);
    }
  }
  kt() {
    this.Ki?.El();
  }
  Mv(t) {
    if (this.Ki === null || this.Ki.Gi() || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const i = this.yt.am().Qt(), a = this.yt.Sv();
    this.tm = !0, i.G_(a, this.Ki, t.localY);
  }
  gv(t) {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const i = this.yt.am().Qt(), a = this.yt.Sv(), r = this.Ki;
    i.X_(a, r, t.localY);
  }
  vm() {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const t = this.yt.am().Qt(), i = this.yt.Sv(), a = this.Ki;
    this.tm && (this.tm = !1, t.J_(i, a));
  }
  bv(t) {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const i = this.yt.am().Qt(), a = this.yt.Sv();
    this.tm = !1, i.J_(a, this.Ki);
  }
  wm(t) {
    this.yn.handleScale.axisDoubleClickReset.price && this.Os();
  }
  Mm(t) {
    this.Ki !== null && (!this.yt.am().Qt().N().handleScale.axisPressedMouseMove.price || this.Ki.je() || this.Ki.Lo() || this.Em(1));
  }
  wv(t) {
    this.Em(0);
  }
  xm() {
    const t = [], i = this.Ki === null ? void 0 : this.Ki;
    return ((a) => {
      for (let r = 0; r < a.length; ++r) {
        const c = a[r].qn(this.yt.Sv(), i);
        for (let u = 0; u < c.length; u++) t.push(c[u]);
      }
    })(this.yt.Sv().Dt()), t;
  }
  Tm({ context: t, bitmapSize: i }) {
    const { width: a, height: r } = i, c = this.yt.Sv().Qt(), u = c.$(), f = c.ef();
    u === f ? gc(t, 0, 0, a, r, u) : p1(t, 0, 0, a, r, u, f);
  }
  Rm({ context: t, bitmapSize: i, horizontalPixelRatio: a }) {
    if (this.Qv === null || this.Ki === null || !this.Ki.N().borderVisible) return;
    t.fillStyle = this.Ki.N().borderColor;
    const r = Math.max(1, Math.floor(this.gm().S * a));
    let c;
    c = this.om ? i.width - r : 0, t.fillRect(c, 0, r, i.height);
  }
  Im(t) {
    if (this.Qv === null || this.Ki === null) return;
    const i = this.Ki.El(), a = this.Ki.N(), r = this.gm(), c = this.om ? this.Qv.width - r.C : 0;
    a.borderVisible && a.ticksVisible && t.useBitmapCoordinateSpace((({ context: u, horizontalPixelRatio: f, verticalPixelRatio: m }) => {
      u.fillStyle = a.borderColor;
      const v = Math.max(1, Math.floor(m)), g = Math.floor(0.5 * m), b = Math.round(r.C * f);
      u.beginPath();
      for (const y of i) u.rect(Math.floor(c * f), Math.round(y.Rl * m) - g, b, v);
      u.fill();
    })), t.useMediaCoordinateSpace((({ context: u }) => {
      u.font = this.Sm(), u.fillStyle = a.textColor ?? this.ko.textColor, u.textAlign = this.om ? "right" : "left", u.textBaseline = "middle";
      const f = this.om ? Math.round(c - r.V) : Math.round(c + r.C + r.V), m = i.map(((v) => this.im.Di(u, v.io)));
      for (let v = i.length; v--; ) {
        const g = i[v];
        u.fillText(g.io, f, g.Rl + m[v]);
      }
    }));
  }
  Pm() {
    if (this.Qv === null || this.Ki === null) return;
    let t = this.Qv.height / 2;
    const i = [], a = this.Ki.Dt().slice(), r = this.yt.Sv(), c = this.gm();
    this.Ki === r.Gs() && this.yt.Sv().Dt().forEach(((m) => {
      r.Zs(m) && a.push(m);
    }));
    const u = this.Ki.Cl()[0], f = this.Ki;
    a.forEach(((m) => {
      const v = m.qn(r, f);
      v.forEach(((g) => {
        g.$i() && g.Wi() === null && (g.Ui(null), i.push(g));
      })), u === m && v.length > 0 && (t = v[0].Ei());
    })), this.Ki.N().alignLabels && this.Am(i, c, t);
  }
  Am(t, i, a) {
    if (this.Qv === null) return;
    const r = t.filter(((u) => u.Ei() <= a)), c = t.filter(((u) => u.Ei() > a));
    r.sort(((u, f) => f.Ei() - u.Ei())), r.length && c.length && c.push(r[0]), c.sort(((u, f) => u.Ei() - f.Ei()));
    for (const u of t) {
      const f = Math.floor(u.$t(i) / 2), m = u.Ei();
      m > -f && m < f && u.Ui(f), m > this.Qv.height - f && m < this.Qv.height + f && u.Ui(this.Qv.height - f);
    }
    E0(r, 1, this.Qv.height, i), E0(c, -1, this.Qv.height, i);
  }
  Vm(t) {
    if (this.Qv === null) return;
    const i = this.xm(), a = this.gm(), r = this.om ? "right" : "left";
    i.forEach(((c) => {
      c.ji() && c.Tt(W(this.Ki)).st(t, a, this.im, r);
    }));
  }
  Bm(t) {
    if (this.Qv === null || this.Ki === null) return;
    const i = this.yt.am().Qt(), a = [], r = this.yt.Sv(), c = i.Rd().qn(r, this.Ki);
    c.length && a.push(c);
    const u = this.gm(), f = this.om ? "right" : "left";
    a.forEach(((m) => {
      m.forEach(((v) => {
        v.Tt(W(this.Ki)).st(t, u, this.im, f);
      }));
    }));
  }
  Em(t) {
    this.lv.style.cursor = t === 1 ? "ns-resize" : "default";
  }
  po() {
    const t = this.bm();
    this.sm < t && this.yt.am().Qt().Pa(), this.sm = t;
  }
  Sm() {
    return nc(this.ko.fontSize, this.ko.fontFamily);
  }
}
function SC(s, t) {
  return s.Ka?.(t) ?? [];
}
function T0(s, t) {
  return s.jn?.(t) ?? [];
}
function A0(s, t) {
  return s.cn?.(t) ?? [];
}
function MC(s, t) {
  return s.ja?.(t) ?? [];
}
class ff {
  constructor(t, i) {
    this.Qv = Vt({ width: 0, height: 0 }), this.Lm = null, this.zm = null, this.Om = null, this.Nm = null, this.Fm = !1, this.Wm = new te(), this.Hm = new te(), this.Um = 0, this.$m = !1, this.jm = null, this.qm = !1, this.Ym = null, this.Km = null, this.rm = !1, this.hm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.lm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.qv = t, this.Zm = i, this.Zm.fu().i(this.Gm.bind(this), this, !0), this.Xm = document.createElement("td"), this.Xm.style.padding = "0", this.Xm.style.position = "relative";
    const a = document.createElement("div");
    a.style.width = "100%", a.style.height = "100%", a.style.position = "relative", a.style.overflow = "hidden", this.Jm = document.createElement("td"), this.Jm.style.padding = "0", this.Qm = document.createElement("td"), this.Qm.style.padding = "0", this.Xm.appendChild(a), this.fm = Es(a, Vt({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const r = this.fm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "1", r.style.left = "0", r.style.top = "0", this.pm = Es(a, Vt({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const c = this.pm.canvasElement;
    c.style.position = "absolute", c.style.zIndex = "2", c.style.left = "0", c.style.top = "0", this.av = document.createElement("tr"), this.av.appendChild(this.Jm), this.av.appendChild(this.Xm), this.av.appendChild(this.Qm), this.tw(), this.tv = new _c(this.pm.canvasElement, this, { xp: () => this.jm === null && !this.qv.N().handleScroll.vertTouchDrag, Cp: () => this.jm === null && !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.Lm !== null && this.Lm.m(), this.zm !== null && this.zm.m(), this.Om = null, this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), zs(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), zs(this.fm.canvasElement), this.fm.dispose(), this.Zm !== null && (this.Zm.fu().u(this), this.Zm.m()), this.tv.m();
  }
  Sv() {
    return W(this.Zm);
  }
  iw(t) {
    this.Zm !== null && this.Zm.fu().u(this), this.Zm = t, this.Zm !== null && this.Zm.fu().i(ff.prototype.Gm.bind(this), this, !0), this.tw(), this.qv.rv().indexOf(this) === this.qv.rv().length - 1 ? (this.Om = this.Om ?? new _C(this.Xm, this.qv), this.Om.kt()) : (this.Om?.Kv(), this.Om = null);
  }
  am() {
    return this.qv;
  }
  uv() {
    return this.av;
  }
  tw() {
    if (this.Zm !== null && (this.nw(), this.sn().Jn().length !== 0)) {
      if (this.Lm !== null) {
        const t = this.Zm.K_();
        this.Lm.un(W(t));
      }
      if (this.zm !== null) {
        const t = this.Zm.Z_();
        this.zm.un(W(t));
      }
    }
  }
  sw() {
    this.Lm !== null && this.Lm.kt(), this.zm !== null && this.zm.kt();
  }
  z_() {
    return this.Zm !== null ? this.Zm.z_() : 0;
  }
  O_(t) {
    this.Zm && this.Zm.O_(t);
  }
  wp(t) {
    if (!this.Zm) return;
    this.ew();
    const i = t.localX, a = t.localY;
    this.rw(i, a, t);
  }
  zp(t) {
    this.ew(), this.hw(), this.rw(t.localX, t.localY, t);
  }
  Mp(t) {
    if (!this.Zm) return;
    this.ew();
    const i = t.localX, a = t.localY;
    this.rw(i, a, t);
  }
  Vp(t) {
    this.Zm !== null && (this.ew(), this.rw(t.localX, t.localY, t), this.aw(t));
  }
  up(t) {
    this.Zm !== null && this.lw(this.Hm, t);
  }
  ap(t) {
    this.up(t);
  }
  Pp(t) {
    this.ew(), this.ow(t), this.rw(t.localX, t.localY, t);
  }
  Ip(t) {
    this.Zm !== null && (this.ew(), this.$m = !1, this._w(t));
  }
  Dp(t) {
    this.Zm !== null && this.aw(t);
  }
  Kp(t) {
    if (this.$m = !0, this.jm === null) {
      const i = { x: t.localX, y: t.localY };
      this.uw(i, i, t);
    }
  }
  Yp(t) {
    this.Zm !== null && (this.ew(), this.Zm.Qt().kd(null), this.cw());
  }
  dw() {
    return this.Wm;
  }
  fw() {
    return this.Hm;
  }
  Wp() {
    this.Um = 1, this.sn().cs();
  }
  Hp(t, i) {
    if (!this.qv.N().handleScale.pinch) return;
    const a = 5 * (i - this.Um);
    this.Um = i, this.sn().Od(t._t, a);
  }
  Ap(t) {
    this.$m = !1, this.qm = this.jm !== null, this.hw();
    const i = this.sn().Rd();
    this.jm !== null && i.It() && (this.Ym = { x: i.ni(), y: i.si() }, this.jm = { x: t.localX, y: t.localY });
  }
  yp(t) {
    if (this.Zm === null) return;
    const i = t.localX, a = t.localY;
    if (this.jm === null) this.ow(t);
    else {
      this.qm = !1;
      const r = W(this.Ym), c = r.x + (i - this.jm.x), u = r.y + (a - this.jm.y);
      this.rw(c, u, t);
    }
  }
  Rp(t) {
    this.am().N().trackingMode.exitMode === 0 && (this.qm = !0), this.pw(), this._w(t);
  }
  Qs(t, i) {
    const a = this.Zm;
    return a === null ? null : j1(a, t, i);
  }
  mw(t, i) {
    W(i === "left" ? this.Lm : this.zm).Cm(Vt({ width: t, height: this.Qv.height }));
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    Ms(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.Xm.style.width = t.width + "px", this.Xm.style.height = t.height + "px");
  }
  ww() {
    const t = W(this.Zm);
    t.q_(t.K_()), t.q_(t.Z_());
    for (const i of t.Cl()) if (t.Zs(i)) {
      const a = i.Ft();
      a !== null && t.q_(a), i.Nn();
    }
    for (const i of t.vu()) i.Nn();
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, i, a, r) {
    const c = this.dv();
    if (c.width > 0 && c.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const u = this.pm.canvasElement;
      t !== null && t.drawImage(u, i, a);
    }
  }
  km(t) {
    if (t === 0 || this.Zm === null) return;
    t > 1 && this.ww(), this.Lm !== null && this.Lm.km(t), this.zm !== null && this.zm.km(t);
    const i = { colorSpace: this.qv.N().layout.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = Cs(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((c) => {
        this.Tm(c);
      })), this.Zm && (this.Mw(r, SC), this.gw(r), this.Mw(r, T0), this.Mw(r, A0)));
    }
    this.pm.applySuggestedBitmapSize();
    const a = Cs(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: c }) => {
      r.clearRect(0, 0, c.width, c.height);
    })), this.bw(a), this.Mw(a, MC), this.Mw(a, A0));
  }
  Sw() {
    return this.Lm;
  }
  xw() {
    return this.zm;
  }
  Dm(t, i) {
    this.Mw(t, i);
  }
  Gm() {
    this.Zm !== null && this.Zm.fu().u(this), this.Zm = null;
  }
  aw(t) {
    this.lw(this.Wm, t);
  }
  lw(t, i) {
    const a = i.localX, r = i.localY;
    t.v() && t.p(this.sn().Et().Rc(a), { x: a, y: r }, i);
  }
  Tm({ context: t, bitmapSize: i }) {
    const { width: a, height: r } = i, c = this.sn(), u = c.$(), f = c.ef();
    u === f ? gc(t, 0, 0, a, r, f) : p1(t, 0, 0, a, r, u, f);
  }
  gw(t) {
    const i = W(this.Zm), a = i.pu().wr().Tt(i);
    a !== null && a.st(t, !1);
  }
  bw(t) {
    this.Cw(t, T0, Go, this.sn().Rd());
  }
  Mw(t, i) {
    const a = W(this.Zm), r = a.au(), c = a.vu();
    for (const u of c) this.Cw(t, i, Rd, u);
    for (const u of r) this.Cw(t, i, Rd, u);
    for (const u of c) this.Cw(t, i, Go, u);
    for (const u of r) this.Cw(t, i, Go, u);
  }
  Cw(t, i, a, r) {
    const c = W(this.Zm), u = c.Qt().ou(), f = u !== null && u.lu === r, m = u !== null && f && u.wu !== void 0 ? u.wu.ie : void 0;
    Ld(i, ((v) => a(v, t, f, m)), r, c);
  }
  nw() {
    if (this.Zm === null) return;
    const t = this.qv, i = this.Zm.K_().N().visible, a = this.Zm.Z_().N().visible;
    i || this.Lm === null || (this.Jm.removeChild(this.Lm.uv()), this.Lm.m(), this.Lm = null), a || this.zm === null || (this.Qm.removeChild(this.zm.uv()), this.zm.m(), this.zm = null);
    const r = t.Qt().Zd();
    i && this.Lm === null && (this.Lm = new z0(this, t.N(), r, "left"), this.Jm.appendChild(this.Lm.uv())), a && this.zm === null && (this.zm = new z0(this, t.N(), r, "right"), this.Qm.appendChild(this.zm.uv()));
  }
  yw(t) {
    return t.Zp && this.$m || this.jm !== null;
  }
  rw(t, i, a) {
    t = Math.max(0, Math.min(t, this.Qv.width - 1)), i = Math.max(0, Math.min(i, this.Qv.height - 1)), this.sn().jd(t, i, a, W(this.Zm));
  }
  cw() {
    this.sn().Yd();
  }
  pw() {
    this.qm && (this.jm = null, this.cw());
  }
  uw(t, i, a) {
    this.jm = t, this.qm = !1, this.rw(i.x, i.y, a);
    const r = this.sn().Rd();
    this.Ym = { x: r.ni(), y: r.si() };
  }
  sn() {
    return this.qv.Qt();
  }
  _w(t) {
    if (!this.Fm) return;
    const i = this.sn(), a = this.Sv();
    if (i.iu(a, a.Pn()), this.Nm = null, this.Fm = !1, i.Hd(), this.Km !== null) {
      const r = performance.now(), c = i.Et();
      this.Km.me(c.Ac(), r), this.Km.jc(r) || i.ps(this.Km);
    }
  }
  ew() {
    this.jm = null;
  }
  hw() {
    if (this.Zm) {
      if (this.sn().cs(), document.activeElement !== document.body && document.activeElement !== document.documentElement) W(document.activeElement).blur();
      else {
        const t = document.getSelection();
        t !== null && t.removeAllRanges();
      }
      !this.Zm.Pn().Gi() && this.sn().Et().Gi();
    }
  }
  ow(t) {
    if (this.Zm === null) return;
    const i = this.sn(), a = i.Et();
    if (a.Gi()) return;
    const r = this.qv.N(), c = r.handleScroll, u = r.kineticScroll;
    if ((!c.pressedMouseMove || t.Zp) && (!c.horzTouchDrag && !c.vertTouchDrag || !t.Zp)) return;
    const f = this.Zm.Pn(), m = performance.now();
    if (this.Nm !== null || this.yw(t) || (this.Nm = { x: t.clientX, y: t.clientY, Sf: m, kw: t.localX, Pw: t.localY }), this.Nm !== null && !this.Fm && (this.Nm.x !== t.clientX || this.Nm.y !== t.clientY)) {
      if (t.Zp && u.touch || !t.Zp && u.mouse) {
        const v = a.fl();
        this.Km = new wC(0.2 / v, 7 / v, 0.997, 15 / v), this.Km.Fv(a.Ac(), this.Nm.Sf);
      } else this.Km = null;
      f.Gi() || i.Q_(this.Zm, f, t.localY), i.Fd(t.localX), this.Fm = !0;
    }
    this.Fm && (f.Gi() || i.tu(this.Zm, f, t.localY), i.Wd(t.localX), this.Km !== null && this.Km.Fv(a.Ac(), m));
  }
}
class O0 {
  constructor(t, i, a, r, c) {
    this.xt = !0, this.Qv = Vt({ width: 0, height: 0 }), this.hm = () => this.km(3), this.om = t === "left", this.wd = a.Zd, this.yn = i, this.Tw = r, this.Rw = c, this.lv = document.createElement("div"), this.lv.style.width = "25px", this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.fm = Es(this.lv, Vt({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
  }
  m() {
    this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), zs(this.fm.canvasElement), this.fm.dispose();
  }
  uv() {
    return this.lv;
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    Ms(this.Qv, t) || (this.Qv = t, this.fm.resizeCanvasElement(t), this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.xt = !0);
  }
  km(t) {
    if (t < 3 && !this.xt || this.Qv.width === 0 || this.Qv.height === 0) return;
    this.xt = !1, this.fm.applySuggestedBitmapSize();
    const i = Cs(this.fm, { colorSpace: this.yn.layout.colorSpace });
    i !== null && i.useBitmapCoordinateSpace(((a) => {
      this.Tm(a), this.Rm(a);
    }));
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, i, a) {
    const r = this.dv();
    r.width > 0 && r.height > 0 && t.drawImage(this.fm.canvasElement, i, a);
  }
  Rm({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (!this.Tw()) return;
    t.fillStyle = this.yn.timeScale.borderColor;
    const c = Math.floor(this.wd.N().S * a), u = Math.floor(this.wd.N().S * r), f = this.om ? i.width - c : 0;
    t.fillRect(f, 0, c, u);
  }
  Tm({ context: t, bitmapSize: i }) {
    gc(t, 0, 0, i.width, i.height, this.Rw());
  }
}
function mf(s) {
  return (t) => t.Xa?.(s) ?? [];
}
const NC = mf("normal"), jC = mf("top"), CC = mf("bottom");
class kC {
  constructor(t, i) {
    this.Dw = null, this.Iw = null, this.M = null, this.Vw = !1, this.Qv = Vt({ width: 0, height: 0 }), this.Bw = new te(), this.im = new sc(5), this.rm = !1, this.hm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.lm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.qv = t, this.xu = i, this.yn = t.N().layout, this.Hv = document.createElement("tr"), this.Ew = document.createElement("td"), this.Ew.style.padding = "0", this.Aw = document.createElement("td"), this.Aw.style.padding = "0", this.lv = document.createElement("td"), this.lv.style.height = "25px", this.lv.style.padding = "0", this.Lw = document.createElement("div"), this.Lw.style.width = "100%", this.Lw.style.height = "100%", this.Lw.style.position = "relative", this.Lw.style.overflow = "hidden", this.lv.appendChild(this.Lw), this.fm = Es(this.Lw, Vt({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const a = this.fm.canvasElement;
    a.style.position = "absolute", a.style.zIndex = "1", a.style.left = "0", a.style.top = "0", this.pm = Es(this.Lw, Vt({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const r = this.pm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0", this.Hv.appendChild(this.Ew), this.Hv.appendChild(this.lv), this.Hv.appendChild(this.Aw), this.zw(), this.qv.Qt().L_().i(this.zw.bind(this), this), this.tv = new _c(this.pm.canvasElement, this, { xp: () => !0, Cp: () => !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.tv.m(), this.Dw !== null && this.Dw.m(), this.Iw !== null && this.Iw.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), zs(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), zs(this.fm.canvasElement), this.fm.dispose();
  }
  uv() {
    return this.Hv;
  }
  Ow() {
    return this.Dw;
  }
  Nw() {
    return this.Iw;
  }
  zp(t) {
    if (this.Vw) return;
    this.Vw = !0;
    const i = this.qv.Qt();
    !i.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && i.zd(t.localX);
  }
  Ap(t) {
    this.zp(t);
  }
  Op() {
    const t = this.qv.Qt();
    !t.Et().Gi() && this.Vw && (this.Vw = !1, this.qv.N().handleScale.axisPressedMouseMove.time && t.$d());
  }
  Pp(t) {
    const i = this.qv.Qt();
    !i.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && i.Ud(t.localX);
  }
  yp(t) {
    this.Pp(t);
  }
  Ip() {
    this.Vw = !1;
    const t = this.qv.Qt();
    t.Et().Gi() && !this.qv.N().handleScale.axisPressedMouseMove.time || t.$d();
  }
  Rp() {
    this.Ip();
  }
  up() {
    this.qv.N().handleScale.axisDoubleClickReset.time && this.qv.Qt().ws();
  }
  ap() {
    this.up();
  }
  wp() {
    this.qv.Qt().N().handleScale.axisPressedMouseMove.time && this.Em(1);
  }
  Yp() {
    this.Em(0);
  }
  cv() {
    return this.Qv;
  }
  Fw() {
    return this.Bw;
  }
  Ww(t, i, a) {
    Ms(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.Bw.p(t)), this.Dw !== null && this.Dw.Cm(Vt({ width: i, height: t.height })), this.Iw !== null && this.Iw.Cm(Vt({ width: a, height: t.height }));
  }
  Hw() {
    const t = this.Uw();
    return Math.ceil(t.S + t.C + t.k + t.A + t.I + t.$w);
  }
  kt() {
    this.qv.Qt().Et().El();
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, i, a, r) {
    const c = this.dv();
    if (c.width > 0 && c.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const u = this.pm.canvasElement;
      t.drawImage(u, i, a);
    }
  }
  km(t) {
    if (t === 0) return;
    const i = { colorSpace: this.yn.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = Cs(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((c) => {
        this.Tm(c), this.Rm(c), this.jw(r, CC);
      })), this.Im(r), this.jw(r, NC)), this.Dw !== null && this.Dw.km(t), this.Iw !== null && this.Iw.km(t);
    }
    this.pm.applySuggestedBitmapSize();
    const a = Cs(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: c }) => {
      r.clearRect(0, 0, c.width, c.height);
    })), this.qw([...this.qv.Qt().Jn(), this.qv.Qt().Rd()], a), this.jw(a, jC));
  }
  jw(t, i) {
    const a = this.qv.Qt().Jn();
    for (const r of a) Ld(i, ((c) => Rd(c, t, !1, void 0)), r, void 0);
    for (const r of a) Ld(i, ((c) => Go(c, t, !1, void 0)), r, void 0);
  }
  Tm({ context: t, bitmapSize: i }) {
    gc(t, 0, 0, i.width, i.height, this.qv.Qt().ef());
  }
  Rm({ context: t, bitmapSize: i, verticalPixelRatio: a }) {
    if (this.qv.N().timeScale.borderVisible) {
      t.fillStyle = this.Yw();
      const r = Math.max(1, Math.floor(this.Uw().S * a));
      t.fillRect(0, 0, i.width, r);
    }
  }
  Im(t) {
    const i = this.qv.Qt().Et(), a = i.El();
    if (!a || a.length === 0) return;
    const r = this.xu.maxTickMarkWeight(a), c = this.Uw(), u = i.N();
    u.borderVisible && u.ticksVisible && t.useBitmapCoordinateSpace((({ context: f, horizontalPixelRatio: m, verticalPixelRatio: v }) => {
      f.strokeStyle = this.Yw(), f.fillStyle = this.Yw();
      const g = Math.max(1, Math.floor(m)), b = Math.floor(0.5 * m);
      f.beginPath();
      const y = Math.round(c.C * v);
      for (let S = a.length; S--; ) {
        const w = Math.round(a[S].coord * m);
        f.rect(w - b, 0, g, y);
      }
      f.fill();
    })), t.useMediaCoordinateSpace((({ context: f }) => {
      const m = c.S + c.C + c.A + c.k / 2;
      f.textAlign = "center", f.textBaseline = "middle", f.fillStyle = this.H(), f.font = this.Sm();
      for (const v of a) if (v.weight < r) {
        const g = v.needAlignCoordinate ? this.Kw(f, v.coord, v.label) : v.coord;
        f.fillText(v.label, g, m);
      }
      this.qv.N().timeScale.allowBoldLabels && (f.font = this.Zw());
      for (const v of a) if (v.weight >= r) {
        const g = v.needAlignCoordinate ? this.Kw(f, v.coord, v.label) : v.coord;
        f.fillText(v.label, g, m);
      }
    }));
  }
  Kw(t, i, a) {
    const r = this.im.Ii(t, a), c = r / 2, u = Math.floor(i - c) + 0.5;
    return u < 0 ? i += Math.abs(0 - u) : u + r > this.Qv.width && (i -= Math.abs(this.Qv.width - (u + r))), i;
  }
  qw(t, i) {
    const a = this.Uw();
    for (const r of t) for (const c of r.dn()) c.Tt().st(i, a);
  }
  Yw() {
    return this.qv.N().timeScale.borderColor;
  }
  H() {
    return this.yn.textColor;
  }
  F() {
    return this.yn.fontSize;
  }
  Sm() {
    return nc(this.F(), this.yn.fontFamily);
  }
  Zw() {
    return nc(this.F(), this.yn.fontFamily, "bold");
  }
  Uw() {
    this.M === null && (this.M = { S: 1, L: NaN, A: NaN, I: NaN, tn: NaN, C: 5, k: NaN, P: "", Qi: new sc(), $w: 0 });
    const t = this.M, i = this.Sm();
    if (t.P !== i) {
      const a = this.F();
      t.k = a, t.P = i, t.A = 3 * a / 12, t.I = 3 * a / 12, t.tn = 9 * a / 12, t.L = 0, t.$w = 4 * a / 12, t.Qi.Os();
    }
    return this.M;
  }
  Em(t) {
    this.lv.style.cursor = t === 1 ? "ew-resize" : "default";
  }
  zw() {
    const t = this.qv.Qt(), i = t.N();
    i.leftPriceScale.visible || this.Dw === null || (this.Ew.removeChild(this.Dw.uv()), this.Dw.m(), this.Dw = null), i.rightPriceScale.visible || this.Iw === null || (this.Aw.removeChild(this.Iw.uv()), this.Iw.m(), this.Iw = null);
    const a = { Zd: this.qv.Qt().Zd() }, r = () => i.leftPriceScale.borderVisible && t.Et().N().borderVisible, c = () => t.ef();
    i.leftPriceScale.visible && this.Dw === null && (this.Dw = new O0("left", i, a, r, c), this.Ew.appendChild(this.Dw.uv())), i.rightPriceScale.visible && this.Iw === null && (this.Iw = new O0("right", i, a, r, c), this.Aw.appendChild(this.Iw.uv()));
  }
}
const EC = !!Da && !!navigator.userAgentData && navigator.userAgentData.brands.some(((s) => s.brand.includes("Chromium"))) && !!Da && (navigator?.userAgentData?.platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
class zC {
  constructor(t, i, a) {
    var r;
    this.Gw = [], this.Xw = [], this.Jw = 0, this.ho = 0, this.C_ = 0, this.Qw = 0, this.tM = 0, this.iM = null, this.nM = !1, this.Wm = new te(), this.Hm = new te(), this.pd = new te(), this.sM = null, this.eM = null, this.jv = t, this.yn = i, this.xu = a, this.Hv = document.createElement("div"), this.Hv.classList.add("tv-lightweight-charts"), this.Hv.style.overflow = "hidden", this.Hv.style.direction = "ltr", this.Hv.style.width = "100%", this.Hv.style.height = "100%", (r = this.Hv).style.userSelect = "none", r.style.webkitUserSelect = "none", r.style.msUserSelect = "none", r.style.MozUserSelect = "none", r.style.webkitTapHighlightColor = "transparent", this.rM = document.createElement("table"), this.rM.setAttribute("cellspacing", "0"), this.Hv.appendChild(this.rM), this.hM = this.aM.bind(this), cd(this.yn) && this.lM(!0), this.sn = new fC(this.md.bind(this), this.yn, a), this.Qt().Dd().i(this.oM.bind(this), this), this._M = new kC(this, this.xu), this.rM.appendChild(this._M.uv());
    const c = i.autoSize && this.uM();
    let u = this.yn.width, f = this.yn.height;
    if (c || u === 0 || f === 0) {
      const m = t.getBoundingClientRect();
      u = u || m.width, f = f || m.height;
    }
    this.cM(u, f), this.dM(), t.appendChild(this.Hv), this.fM(), this.sn.Et().Zc().i(this.sn.Pa.bind(this.sn), this), this.sn.L_().i(this.sn.Pa.bind(this.sn), this);
  }
  Qt() {
    return this.sn;
  }
  N() {
    return this.yn;
  }
  rv() {
    return this.Gw;
  }
  pM() {
    return this._M;
  }
  m() {
    this.lM(!1), this.Jw !== 0 && window.cancelAnimationFrame(this.Jw), this.sn.Dd().u(this), this.sn.Et().Zc().u(this), this.sn.L_().u(this), this.sn.m();
    for (const t of this.Gw) this.rM.removeChild(t.uv()), t.dw().u(this), t.fw().u(this), t.m();
    this.Gw = [];
    for (const t of this.Xw) this.vM(t);
    this.Xw = [], W(this._M).m(), this.Hv.parentElement !== null && this.Hv.parentElement.removeChild(this.Hv), this.pd.m(), this.Wm.m(), this.Hm.m(), this.mM();
  }
  cM(t, i, a = !1) {
    if (this.ho === i && this.C_ === t) return;
    const r = (function(f) {
      const m = Math.floor(f.width), v = Math.floor(f.height);
      return Vt({ width: m - m % 2, height: v - v % 2 });
    })(Vt({ width: t, height: i }));
    this.ho = r.height, this.C_ = r.width;
    const c = this.ho + "px", u = this.C_ + "px";
    if (this.wM() || (W(this.Hv).style.height = c, W(this.Hv).style.width = u), this.rM.style.height = c, this.rM.style.width = u, a) {
      this.Jw !== 0 && (window.cancelAnimationFrame(this.Jw), this.Jw = 0), this.nM = !1;
      const f = ye.ys();
      this.iM !== null && (f.Ss(this.iM), this.iM = null), this.MM(f, performance.now());
    } else this.sn.Pa();
  }
  km(t) {
    t === void 0 && (t = ye.ys());
    for (let i = 0; i < this.Gw.length; i++) this.Gw[i].km(t._s(i).rs);
    this.yn.timeScale.visible && this._M.km(t.ls());
  }
  vr(t) {
    const i = cd(this.yn);
    this.sn.vr(t);
    const a = cd(this.yn);
    a !== i && this.lM(a), t.layout?.panes && this.gM(), this.fM(), this.bM(t);
  }
  dw() {
    return this.Wm;
  }
  fw() {
    return this.Hm;
  }
  Dd() {
    return this.pd;
  }
  SM(t = !1) {
    this.iM !== null && (this.MM(this.iM, performance.now()), this.iM = null);
    const i = this.xM(null), a = document.createElement("canvas");
    a.width = i.width, a.height = i.height;
    const r = W(a.getContext("2d"));
    return this.xM(r, t), a;
  }
  CM(t) {
    return t === "left" && !this.yM() || t === "right" && !this.kM() || this.Gw.length === 0 ? 0 : W(t === "left" ? this.Gw[0].Sw() : this.Gw[0].xw()).ym();
  }
  wM() {
    return this.yn.autoSize && this.sM !== null;
  }
  vv() {
    return this.Hv;
  }
  PM(t) {
    this.eM = t, this.eM ? this.vv().style.setProperty("cursor", t) : this.vv().style.removeProperty("cursor");
  }
  TM() {
    return this.eM;
  }
  RM(t) {
    return Ve(this.Gw[t]).cv();
  }
  gM() {
    this.Xw.forEach(((t) => {
      t.kt();
    }));
  }
  bM(t) {
    (t.autoSize !== void 0 || !this.sM || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.sM && this.uM(), t.autoSize === !1 && this.sM !== null && this.mM(), t.autoSize || t.width === void 0 && t.height === void 0 || this.cM(t.width || this.C_, t.height || this.ho));
  }
  xM(t, i) {
    let a = 0, r = 0;
    const c = this.Gw[0], u = (m, v) => {
      let g = 0;
      for (let b = 0; b < this.Gw.length; b++) {
        const y = this.Gw[b], S = W(m === "left" ? y.Sw() : y.xw()), w = S.dv();
        if (t !== null && S.fv(t, v, g, i), g += w.height, b < this.Gw.length - 1) {
          const M = this.Xw[b], N = M.dv();
          t !== null && M.fv(t, v, g), g += N.height;
        }
      }
    };
    this.yM() && (u("left", 0), a += W(c.Sw()).dv().width);
    for (let m = 0; m < this.Gw.length; m++) {
      const v = this.Gw[m], g = v.dv();
      if (t !== null && v.fv(t, a, r, i), r += g.height, m < this.Gw.length - 1) {
        const b = this.Xw[m], y = b.dv();
        t !== null && b.fv(t, a, r), r += y.height;
      }
    }
    a += c.dv().width, this.kM() && (u("right", a), a += W(c.xw()).dv().width);
    const f = (m, v, g) => {
      W(m === "left" ? this._M.Ow() : this._M.Nw()).fv(W(t), v, g);
    };
    if (this.yn.timeScale.visible) {
      const m = this._M.dv();
      if (t !== null) {
        let v = 0;
        this.yM() && (f("left", v, r), v = W(c.Sw()).dv().width), this._M.fv(t, v, r, i), v += m.width, this.kM() && f("right", v, r);
      }
      r += m.height;
    }
    return Vt({ width: a, height: r });
  }
  DM() {
    let t = 0, i = 0, a = 0;
    for (const N of this.Gw) this.yM() && (i = Math.max(i, W(N.Sw()).bm(), this.yn.leftPriceScale.minimumWidth)), this.kM() && (a = Math.max(a, W(N.xw()).bm(), this.yn.rightPriceScale.minimumWidth)), t += N.z_();
    i = Dd(i), a = Dd(a);
    const r = this.C_, c = this.ho, u = Math.max(r - i - a, 0), f = 1 * this.Xw.length, m = this.yn.timeScale.visible;
    let v = m ? Math.max(this._M.Hw(), this.yn.timeScale.minimumHeight) : 0;
    var g;
    v = (g = v) + g % 2;
    const b = f + v, y = c < b ? 0 : c - b, S = y / t;
    let w = 0;
    const M = window.devicePixelRatio || 1;
    for (let N = 0; N < this.Gw.length; ++N) {
      const k = this.Gw[N];
      k.iw(this.sn.Zn()[N]);
      let T = 0, D = 0;
      D = N === this.Gw.length - 1 ? Math.ceil((y - w) * M) / M : Math.round(k.z_() * S * M) / M, T = Math.max(D, 2), w += T, k.Cm(Vt({ width: u, height: T })), this.yM() && k.mw(i, "left"), this.kM() && k.mw(a, "right"), k.Sv() && this.sn.Id(k.Sv(), T);
    }
    this._M.Ww(Vt({ width: m ? u : 0, height: v }), m ? i : 0, m ? a : 0), this.sn.N_(u), this.Qw !== i && (this.Qw = i), this.tM !== a && (this.tM = a);
  }
  lM(t) {
    t ? this.Hv.addEventListener("wheel", this.hM, { passive: !1 }) : this.Hv.removeEventListener("wheel", this.hM);
  }
  IM(t) {
    switch (t.deltaMode) {
      case t.DOM_DELTA_PAGE:
        return 120;
      case t.DOM_DELTA_LINE:
        return 32;
    }
    return EC ? 1 / window.devicePixelRatio : 1;
  }
  aM(t) {
    if (!(t.deltaX !== 0 && this.yn.handleScroll.mouseWheel || t.deltaY !== 0 && this.yn.handleScale.mouseWheel)) return;
    const i = this.IM(t), a = i * t.deltaX / 100, r = -i * t.deltaY / 100;
    if (t.cancelable && t.preventDefault(), r !== 0 && this.yn.handleScale.mouseWheel) {
      const c = Math.sign(r) * Math.min(1, Math.abs(r)), u = t.clientX - this.Hv.getBoundingClientRect().left;
      this.Qt().Od(u, c);
    }
    a !== 0 && this.yn.handleScroll.mouseWheel && this.Qt().Nd(-80 * a);
  }
  MM(t, i) {
    const a = t.ls();
    a === 3 && this.VM(), a !== 3 && a !== 2 || (this.BM(t), this.EM(t, i), this._M.kt(), this.Gw.forEach(((r) => {
      r.sw();
    })), this.iM?.ls() === 3 && (this.iM.Ss(t), this.VM(), this.BM(this.iM), this.EM(this.iM, i), t = this.iM, this.iM = null)), this.km(t);
  }
  EM(t, i) {
    for (const a of t.bs()) this.xs(a, i);
  }
  BM(t) {
    const i = this.sn.Zn();
    for (let a = 0; a < i.length; a++) t._s(a).hs && i[a].ru();
  }
  xs(t, i) {
    const a = this.sn.Et();
    switch (t.ds) {
      case 0:
        a.Xc();
        break;
      case 1:
        a.Jc(t.Wt);
        break;
      case 2:
        a.Ms(t.Wt);
        break;
      case 3:
        a.gs(t.Wt);
        break;
      case 4:
        a.Oc();
        break;
      case 5:
        t.Wt.jc(i) || a.gs(t.Wt.qc(i));
    }
  }
  md(t) {
    this.iM !== null ? this.iM.Ss(t) : this.iM = t, this.nM || (this.nM = !0, this.Jw = window.requestAnimationFrame(((i) => {
      if (this.nM = !1, this.Jw = 0, this.iM !== null) {
        const a = this.iM;
        this.iM = null, this.MM(a, i);
        for (const r of a.bs()) if (r.ds === 5 && !r.Wt.jc(i)) {
          this.Qt().ps(r.Wt);
          break;
        }
      }
    })));
  }
  VM() {
    this.dM();
  }
  vM(t) {
    this.rM.removeChild(t.uv()), t.m();
  }
  dM() {
    const t = this.sn.Zn(), i = t.length, a = this.Gw.length;
    for (let r = i; r < a; r++) {
      const c = Ve(this.Gw.pop());
      this.rM.removeChild(c.uv()), c.dw().u(this), c.fw().u(this), c.m();
      const u = this.Xw.pop();
      u !== void 0 && this.vM(u);
    }
    for (let r = a; r < i; r++) {
      const c = new ff(this, t[r]);
      if (c.dw().i(this.AM.bind(this, c), this), c.fw().i(this.LM.bind(this, c), this), this.Gw.push(c), r > 0) {
        const u = new yC(this, r - 1, r);
        this.Xw.push(u), this.rM.insertBefore(u.uv(), this._M.uv());
      }
      this.rM.insertBefore(c.uv(), this._M.uv());
    }
    for (let r = 0; r < i; r++) {
      const c = t[r], u = this.Gw[r];
      u.Sv() !== c ? u.iw(c) : u.tw();
    }
    this.fM(), this.DM();
  }
  zM(t, i, a, r) {
    const c = /* @__PURE__ */ new Map();
    t !== null && this.sn.Jn().forEach(((g) => {
      const b = g.Un().Hn(t);
      b !== null && c.set(g, b);
    }));
    let u;
    if (t !== null) {
      const g = this.sn.Et().en(t)?.originalTime;
      g !== void 0 && (u = g);
    }
    const f = this.Qt().ou(), m = this.OM(r), v = (function(g, b) {
      const y = g !== null && g.lu instanceof wc ? g.lu : void 0, S = g?.wu?.te, w = b !== void 0 && b !== -1 ? b : void 0;
      return g === null || g.ee === void 0 ? { NM: y, FM: S } : { NM: y, FM: S, WM: { ds: g.ee, HM: (M = g.lu, N = g.ee, M instanceof zd ? "pane-primitive" : N === "marker" || N === "primitive" ? "series-primitive" : "series"), UM: bC(g.ee, S), U_: y, $M: S, jM: w } };
      var M, N;
    })(f, m);
    return { Qr: u, $n: t ?? void 0, qM: i ?? void 0, jM: m !== -1 ? m : void 0, NM: v.NM, YM: c, FM: v.FM, WM: v.WM, KM: a ?? void 0 };
  }
  OM(t) {
    let i = -1;
    if (t) i = this.Gw.indexOf(t);
    else {
      const a = this.Qt().Rd().Kn();
      a !== null && (i = this.Qt().Zn().indexOf(a));
    }
    return i;
  }
  AM(t, i, a, r) {
    this.Wm.p((() => this.zM(i, a, r, t)));
  }
  LM(t, i, a, r) {
    this.Hm.p((() => this.zM(i, a, r, t)));
  }
  oM(t, i, a) {
    this.PM(this.Qt().ou()?.mu ?? null), this.pd.p((() => this.zM(t, i, a)));
  }
  fM() {
    const t = this.yn.timeScale.visible ? "" : "none";
    this._M.uv().style.display = t;
  }
  yM() {
    return this.Gw[0].Sv().K_().N().visible;
  }
  kM() {
    return this.Gw[0].Sv().Z_().N().visible;
  }
  uM() {
    return "ResizeObserver" in window && (this.sM = new ResizeObserver(((t) => {
      const i = t[t.length - 1];
      if (!i) return;
      const a = i.contentRect.width, r = i.contentRect.height;
      this.cM(a, r, !0);
    })), this.sM.observe(this.jv, { box: "border-box" }), !0);
  }
  mM() {
    this.sM !== null && this.sM.disconnect(), this.sM = null;
  }
}
function cd(s) {
  return !!(s.handleScroll.mouseWheel || s.handleScale.mouseWheel);
}
function TC(s) {
  return s.open === void 0 && s.value === void 0;
}
function AC(s) {
  return (function(t) {
    return t.open !== void 0;
  })(s) || (function(t) {
    return t.value !== void 0;
  })(s);
}
function D0(s, t, i, a) {
  const r = i.value, c = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.color !== void 0 && (c.R = i.color), c;
}
function OC(s, t, i, a) {
  const r = i.value, c = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.lineColor !== void 0 && (c.vt = i.lineColor), i.topColor !== void 0 && (c.ah = i.topColor), i.bottomColor !== void 0 && (c.oh = i.bottomColor), c;
}
function DC(s, t, i, a) {
  const r = i.value, c = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.topLineColor !== void 0 && (c._h = i.topLineColor), i.bottomLineColor !== void 0 && (c.uh = i.bottomLineColor), i.topFillColor1 !== void 0 && (c.dh = i.topFillColor1), i.topFillColor2 !== void 0 && (c.fh = i.topFillColor2), i.bottomFillColor1 !== void 0 && (c.ph = i.bottomFillColor1), i.bottomFillColor2 !== void 0 && (c.mh = i.bottomFillColor2), c;
}
function RC(s, t, i, a) {
  const r = { $n: t, wt: s, Wt: [i.open, i.high, i.low, i.close], Qr: a };
  return i.color !== void 0 && (r.R = i.color), r;
}
function LC(s, t, i, a) {
  const r = { $n: t, wt: s, Wt: [i.open, i.high, i.low, i.close], Qr: a };
  return i.color !== void 0 && (r.R = i.color), i.borderColor !== void 0 && (r.Ht = i.borderColor), i.wickColor !== void 0 && (r.hh = i.wickColor), r;
}
function BC(s, t, i, a, r) {
  const c = Ve(r)(i), u = Math.max(...c), f = Math.min(...c), m = c[c.length - 1], v = [m, u, f, m], { time: g, color: b, ...y } = i;
  return { $n: t, wt: s, Wt: v, Qr: a, ue: y, R: b };
}
function _a(s) {
  return s.Wt !== void 0;
}
function R0(s, t) {
  return t.customValues !== void 0 && (s.ZM = t.customValues), s;
}
function _s(s) {
  return (t, i, a, r, c, u) => (function(f, m) {
    return m ? m(f) : TC(f);
  })(a, u) ? R0({ wt: t, $n: i, Qr: r }, a) : R0(s(t, i, a, r, c), a);
}
function L0(s) {
  return { Candlestick: _s(LC), Bar: _s(RC), Area: _s(OC), Baseline: _s(DC), Histogram: _s(D0), Line: _s(D0), Custom: _s(BC) }[s];
}
function B0(s) {
  return { $n: 0, GM: /* @__PURE__ */ new Map(), za: s };
}
function U0(s, t) {
  if (s !== void 0 && s.length !== 0) return { XM: t.key(s[0].wt), JM: t.key(s[s.length - 1].wt) };
}
function H0(s) {
  let t;
  return s.forEach(((i) => {
    t === void 0 && (t = i.Qr);
  })), Ve(t);
}
class UC {
  constructor(t) {
    this.QM = /* @__PURE__ */ new Map(), this.tg = /* @__PURE__ */ new Map(), this.ig = /* @__PURE__ */ new Map(), this.ng = [], this.xu = t;
  }
  m() {
    this.QM.clear(), this.tg.clear(), this.ig.clear(), this.ng = [];
  }
  sg(t, i) {
    let a = this.QM.size !== 0, r = !1;
    const c = this.tg.get(t);
    if (c !== void 0) if (this.tg.size === 1) a = !1, r = !0, this.QM.clear();
    else for (const m of this.ng) m.pointData.GM.delete(t) && (r = !0);
    let u = [];
    if (i.length !== 0) {
      const m = i.map(((S) => S.time)), v = this.xu.createConverterToInternalObj(i), g = L0(t.bh()), b = t.ll(), y = t.ol();
      u = i.map(((S, w) => {
        const M = v(S.time), N = this.xu.key(M);
        let k = this.QM.get(N);
        k === void 0 && (k = B0(M), this.QM.set(N, k), r = !0);
        const T = g(M, k.$n, S, m[w], b, y);
        return k.GM.set(t, T), T;
      }));
    }
    a && this.eg(), this.rg(t, u);
    let f = -1;
    if (r) {
      const m = [];
      this.QM.forEach(((v) => {
        m.push({ timeWeight: 0, time: v.za, pointData: v, originalTime: H0(v.GM) });
      })), m.sort(((v, g) => this.xu.key(v.time) - this.xu.key(g.time))), f = this.hg(m);
    }
    return this.ag(t, f, (function(m, v, g) {
      const b = U0(m, g), y = U0(v, g);
      if (b !== void 0 && y !== void 0) return { lg: !1, Ia: b.JM >= y.JM && b.XM >= y.XM };
    })(this.tg.get(t), c, this.xu));
  }
  Jd(t) {
    return this.sg(t, []);
  }
  og(t, i, a) {
    if (a && t.Na()) throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
    const r = i;
    (function(k) {
      k.Qr === void 0 && (k.Qr = k.time);
    })(r), this.xu.preprocessData(i);
    const c = this.xu.createConverterToInternalObj([i])(i.time), u = this.ig.get(t);
    if (!a && u !== void 0 && this.xu.key(c) < this.xu.key(u)) throw new Error(`Cannot update oldest data, last time=${u}, new time=${c}`);
    let f = this.QM.get(this.xu.key(c));
    if (a && f === void 0) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
    const m = f === void 0;
    f === void 0 && (f = B0(c), this.QM.set(this.xu.key(c), f));
    const v = L0(t.bh()), g = t.ll(), b = t.ol(), y = v(c, f.$n, i, r.Qr, g, b), S = !a && !m && u !== void 0 && this.xu.key(c) === this.xu.key(u);
    f.GM.set(t, y), a ? this._g(t, y, f.$n) : S && t.Na() && _a(y) ? (t.Rr(y), this.ug(t, y)) : this.ug(t, y);
    const w = { Ia: _a(y), lg: a };
    if (!m) return this.ag(t, -1, w);
    const M = { timeWeight: 0, time: f.za, pointData: f, originalTime: H0(f.GM) }, N = ks(this.ng, this.xu.key(M.time), ((k, T) => this.xu.key(k.time) < T));
    this.ng.splice(N, 0, M);
    for (let k = N; k < this.ng.length; ++k) Bo(this.ng[k].pointData, k);
    return this.xu.fillWeightsForPoints(this.ng, N), this.ag(t, N, w);
  }
  cg(t, i) {
    const a = this.tg.get(t);
    if (a === void 0 || i <= 0) return [[], this.dg()];
    i = Math.min(i, a.length);
    const r = a.splice(-i).reverse();
    a.length === 0 ? this.ig.delete(t) : this.ig.set(t, a[a.length - 1].wt);
    for (const c of r) {
      const u = this.QM.get(this.xu.key(c.wt));
      if (u && (u.GM.delete(t), u.GM.size === 0)) {
        this.QM.delete(this.xu.key(u.za)), this.ng.splice(u.$n, 1);
        for (let f = u.$n; f < this.ng.length; ++f) Bo(this.ng[f].pointData, f);
      }
    }
    return [r, this.ag(t, this.ng.length - 1, { lg: !1, Ia: !1 })];
  }
  ug(t, i) {
    let a = this.tg.get(t);
    a === void 0 && (a = [], this.tg.set(t, a));
    const r = a.length !== 0 ? a[a.length - 1] : null;
    r === null || this.xu.key(i.wt) > this.xu.key(r.wt) ? _a(i) && a.push(i) : _a(i) ? a[a.length - 1] = i : a.splice(-1, 1), this.ig.set(t, i.wt);
  }
  _g(t, i, a) {
    const r = this.tg.get(t);
    if (r === void 0) return;
    const c = ks(r, a, ((u, f) => u.$n < f));
    _a(i) ? r[c] = i : r.splice(c, 1);
  }
  rg(t, i) {
    i.length !== 0 ? (this.tg.set(t, i.filter(_a)), this.ig.set(t, i[i.length - 1].wt)) : (this.tg.delete(t), this.ig.delete(t));
  }
  eg() {
    for (const t of this.ng) t.pointData.GM.size === 0 && this.QM.delete(this.xu.key(t.time));
  }
  hg(t) {
    let i = -1;
    for (let a = 0; a < this.ng.length && a < t.length; ++a) {
      const r = this.ng[a], c = t[a];
      if (this.xu.key(r.time) !== this.xu.key(c.time)) {
        i = a;
        break;
      }
      c.timeWeight = r.timeWeight, Bo(c.pointData, a);
    }
    if (i === -1 && this.ng.length !== t.length && (i = Math.min(this.ng.length, t.length)), i === -1) return -1;
    for (let a = i; a < t.length; ++a) Bo(t[a].pointData, a);
    return this.xu.fillWeightsForPoints(t, i), this.ng = t, i;
  }
  fg() {
    if (this.tg.size === 0) return null;
    let t = 0;
    return this.tg.forEach(((i) => {
      i.length !== 0 && (t = Math.max(t, i[i.length - 1].$n));
    })), t;
  }
  ag(t, i, a) {
    const r = this.dg();
    if (i !== -1) this.tg.forEach(((c, u) => {
      r.U_.set(u, { ue: c, pg: u === t ? a : void 0 });
    })), this.tg.has(t) || r.U_.set(t, { ue: [], pg: a }), r.Et.vg = this.ng, r.Et.mg = i;
    else {
      const c = this.tg.get(t);
      r.U_.set(t, { ue: c || [], pg: a });
    }
    return r;
  }
  dg() {
    return { U_: /* @__PURE__ */ new Map(), Et: { Pc: this.fg() } };
  }
}
function Bo(s, t) {
  s.$n = t, s.GM.forEach(((i) => {
    i.$n = t;
  }));
}
function HC(s, t) {
  return s._t < t;
}
function qC(s, t) {
  return t < s._t;
}
function Bd(s, t, i, a) {
  return ks(s, t, HC, i, a);
}
function Ud(s, t, i, a) {
  return hf(s, t, qC, i, a);
}
function Ko(s, t, i) {
  return { ne: s, se: t, ee: i };
}
function q0(s, t, i, a) {
  return s >= t - a && s <= i + a;
}
function Bl(s, t, i, a, r, c) {
  const u = r - i, f = c - a;
  if (u === 0 && f === 0) return Math.hypot(s - i, t - a);
  const m = ((s - i) * u + (t - a) * f) / (u * u + f * f), v = Math.max(0, Math.min(1, m)), g = i + u * v, b = a + f * v;
  return Math.hypot(s - g, t - b);
}
const ud = [0, 0];
function $C(s, t, i) {
  return t === void 0 || t.wt !== s.wt - 1 ? s._t - i / 2 : (t._t + s._t) / 2;
}
function QC(s, t, i) {
  return t === void 0 || t.wt !== s.wt + 1 ? s._t + i / 2 : (s._t + t._t) / 2;
}
function VC(s, t, i, a, r, c, u) {
  if (t === null || t.from >= t.to || s.length === 0) return null;
  const f = r / 2 + c, m = Bd(s, i - f, t.from, t.to), v = Ud(s, i + f, m, t.to);
  if (m >= v) return null;
  let g = Number.POSITIVE_INFINITY;
  for (let b = m; b < v; b++) {
    const y = s[b], S = b > t.from ? s[b - 1] : void 0, w = b < t.to - 1 ? s[b + 1] : void 0, M = $C(y, S, r) - c, N = QC(y, w, r) + c;
    if (i < M || i > N) continue;
    u(y, ud);
    const k = ud[0], T = ud[1], D = Math.min(k, T), O = Math.max(k, T), V = D - c, G = O + c;
    if (a >= D && a <= O) g = Math.min(g, 0);
    else if (a >= V && a <= G) {
      const R = Math.min(Math.abs(a - D), Math.abs(O - a));
      g = Math.min(g, R);
    }
  }
  return Number.isFinite(g) ? Ko(g, 0, "series-range") : null;
}
function YC(s, t) {
  return s.wt < t;
}
function GC(s, t) {
  return t < s.wt;
}
function KC(s, t, i) {
  const a = t.Oa(), r = t.bi(), c = ks(s, a, YC), u = hf(s, r, GC);
  if (!i) return { from: c, to: u };
  let f = c, m = u;
  return c > 0 && c < s.length && s[c].wt >= a && (f = c - 1), u > 0 && u < s.length && s[u - 1].wt <= r && (m = u + 1), { from: f, to: m };
}
class z1 {
  constructor(t, i, a) {
    this.wg = !0, this.Mg = !0, this.gg = !0, this.bg = [], this.Sg = null, this.xg = -1, this.ae = t, this.le = i, this.Cg = a;
  }
  kt(t) {
    this.wg = !0, t === "data" && (this.Mg = !0), t === "options" && (this.gg = !0);
  }
  Tt() {
    return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.kg) : null;
  }
  Qs(t, i) {
    return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.Pg(t, i)) : null;
  }
  Pg(t, i) {
    return null;
  }
  Tg() {
    this.bg = this.bg.map(((t) => ({ ...t, ...this.ae.Sa().Sh(t.wt) })));
  }
  Rg() {
    this.Sg = null;
  }
  yg() {
    const t = this.le.Et(), i = t.N().enableConflation ? t.Qc() : 0;
    i !== this.xg && (this.Mg = !0, this.xg = i), this.Mg && (this.Dg(), this.Mg = !1), this.gg && (this.Tg(), this.gg = !1), this.wg && (this.Ig(), this.wg = !1);
  }
  Ig() {
    const t = this.ae.Ft(), i = this.le.Et();
    if (this.Rg(), i.Gi() || t.Gi()) return;
    const a = i.Ee();
    if (a === null || this.ae.Un().Th() === 0) return;
    const r = this.ae.Lt();
    r !== null && (this.Sg = KC(this.bg, a, this.Cg), this.Vg(t, i, r.Wt), this.Bg());
  }
}
class XC {
  constructor(t, i) {
    this.Eg = t, this.Ki = i;
  }
  st(t, i, a) {
    this.Eg.draw(t, this.Ki, i, a);
  }
}
function ZC(s) {
  switch (s) {
    case "point":
      return 2;
    case "range":
      return 0;
    default:
      return 1;
  }
}
class WC extends z1 {
  constructor(t, i, a) {
    super(t, i, !1), this.Yh = a, this.Eg = this.Yh.renderer(), this.kg = new XC(this.Eg, ((r) => this.Ag(r)));
  }
  get ga() {
    return this.Yh.conflationReducer;
  }
  Wa(t) {
    return this.Yh.priceValueBuilder(t);
  }
  _l(t) {
    return this.Yh.isWhitespace(t);
  }
  Pg(t, i) {
    const a = this.Eg.hitTest?.(t, i, ((u) => this.Ag(u)));
    if (a != null) return { ne: (r = a).distance, se: ZC(r.type), ee: "custom", mu: r.cursorStyle, te: r.objectId, ie: r.hitTestData };
    var r;
    const c = VC(this.bg, this.Sg, t, i, this.le.Et().fl(), this.ae.N().hitTestTolerance, ((u, f) => {
      const m = u.Lg;
      let v = NaN, g = NaN;
      if (m !== void 0 && !this.Yh.isWhitespace(m)) for (const b of this.Yh.priceValueBuilder(m)) {
        const y = this.Ag(b);
        y !== null && (v = Number.isNaN(v) ? y : Math.min(v, y), g = Number.isNaN(g) ? y : Math.max(g, y));
      }
      f[0] = v, f[1] = g;
    }));
    return c === null ? null : { ...c, ee: "custom" };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((i) => ({ wt: i.$n, _t: NaN, ...t.Sh(i.$n), Lg: i.ue })));
  }
  Vg(t, i) {
    i.Tc(this.bg, kd(this.Sg));
  }
  Bg() {
    this.Yh.update({ bars: this.bg.map(IC), barSpacing: this.le.Et().fl(), visibleRange: this.Sg, conflationFactor: this.le.Et().Qc() }, this.ae.N());
  }
  Ag(t) {
    const i = this.ae.Lt();
    return i === null ? null : this.ae.Ft().Nt(t, i.Wt);
  }
}
function IC(s) {
  return { x: s._t, time: s.wt, originalData: s.Lg, barColor: s.sh };
}
const FC = { color: "#2196f3" }, JC = (s, t, i) => {
  const a = Kn(i);
  return new WC(s, t, a);
};
function pf(s) {
  const t = { value: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function $0(s) {
  const t = pf(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function PC(s) {
  const t = pf(s);
  return s.vt !== void 0 && (t.lineColor = s.vt), s.ah !== void 0 && (t.topColor = s.ah), s.oh !== void 0 && (t.bottomColor = s.oh), t;
}
function tk(s) {
  const t = pf(s);
  return s._h !== void 0 && (t.topLineColor = s._h), s.uh !== void 0 && (t.bottomLineColor = s.uh), s.dh !== void 0 && (t.topFillColor1 = s.dh), s.fh !== void 0 && (t.topFillColor2 = s.fh), s.ph !== void 0 && (t.bottomFillColor1 = s.ph), s.mh !== void 0 && (t.bottomFillColor2 = s.mh), t;
}
function T1(s) {
  const t = { open: s.Wt[0], high: s.Wt[1], low: s.Wt[2], close: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function ek(s) {
  const t = T1(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function ik(s) {
  const t = T1(s), { R: i, Ht: a, hh: r } = s;
  return i !== void 0 && (t.color = i), a !== void 0 && (t.borderColor = a), r !== void 0 && (t.wickColor = r), t;
}
function Xo(s) {
  return { Area: PC, Line: $0, Baseline: tk, Histogram: $0, Bar: ek, Candlestick: ik, Custom: nk }[s];
}
function nk(s) {
  const t = s.Qr;
  return { ...s.ue, time: t };
}
const sk = { vertLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, horzLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, mode: 1, doNotSnapToHiddenSeriesIndices: !1 }, ak = { vertLines: { color: "#D6DCDE", style: 0, visible: !0 }, horzLines: { color: "#D6DCDE", style: 0, visible: !0 } }, lk = { background: { type: "solid", color: "#FFFFFF" }, textColor: "#191919", fontSize: 12, fontFamily: f1, panes: { enableResize: !0, separatorColor: "#E0E3EB", separatorHoverColor: "rgba(178, 181, 189, 0.2)" }, attributionLogo: !0, colorSpace: "srgb", colorParsers: [] }, hd = { autoScale: !0, mode: 0, invertScale: !1, alignLabels: !0, borderVisible: !0, borderColor: "#2B2B43", entireTextOnly: !1, visible: !1, ticksVisible: !1, scaleMargins: { bottom: 0.1, top: 0.2 }, minimumWidth: 0, ensureEdgeTickMarksVisible: !1, tickMarkDensity: 2.5 }, rk = { rightOffset: 0, barSpacing: 6, minBarSpacing: 0.5, maxBarSpacing: 0, fixLeftEdge: !1, fixRightEdge: !1, lockVisibleTimeRangeOnResize: !1, rightBarStaysOnScroll: !1, borderVisible: !0, borderColor: "#2B2B43", visible: !0, timeVisible: !1, secondsVisible: !0, shiftVisibleRangeOnNewBar: !0, allowShiftVisibleRangeOnWhitespaceReplacement: !1, ticksVisible: !1, uniformDistribution: !1, minimumHeight: 0, allowBoldLabels: !0, ignoreWhitespaceIndices: !1, enableConflation: !1, conflationThresholdFactor: 1, precomputeConflationOnInit: !1, precomputeConflationPriority: "background" };
function Q0() {
  return { addDefaultPane: !0, hoveredSeriesOnTop: !0, width: 0, height: 0, autoSize: !1, layout: lk, crosshair: sk, grid: ak, overlayPriceScales: { ...hd }, leftPriceScale: { ...hd, visible: !1 }, rightPriceScale: { ...hd, visible: !0 }, defaultVisiblePriceScaleId: "right", timeScale: rk, localization: { locale: Da ? navigator.language : "", dateFormat: "dd MMM 'yy" }, handleScroll: { mouseWheel: !0, pressedMouseMove: !0, horzTouchDrag: !0, vertTouchDrag: !0 }, handleScale: { axisPressedMouseMove: { time: !0, price: !0 }, axisDoubleClickReset: { time: !0, price: !0 }, mouseWheel: !0, pinch: !0 }, kineticScroll: { mouse: !1, touch: !0 }, trackingMode: { exitMode: 1 } };
}
class A1 {
  constructor(t, i, a) {
    this.sv = t, this.zg = i, this.Og = a ?? 0;
  }
  applyOptions(t) {
    this.sv.Qt().Pd(this.zg, t, this.Og);
  }
  options() {
    return this.Ki().N();
  }
  width() {
    return xc(this.zg) ? this.sv.CM(this.zg) : 0;
  }
  setVisibleRange(t) {
    this.setAutoScale(!1), this.Ki().qo(new ke(t.from, t.to));
  }
  getVisibleRange() {
    let t, i, a = this.Ki().ar();
    if (a === null) return null;
    if (this.Ki().so()) {
      const r = this.Ki().M_(), c = C1(r);
      a = ja(a, this.Ki().ro()), t = Number((Math.round(a.Je() / r) * r).toFixed(c)), i = Number((Math.round(a.Qe() / r) * r).toFixed(c));
    } else t = a.Je(), i = a.Qe();
    return { from: t, to: i };
  }
  setAutoScale(t) {
    this.applyOptions({ autoScale: t });
  }
  Ki() {
    return W(this.sv.Qt().Td(this.zg, this.Og)).Ft;
  }
}
class ok {
  constructor(t, i, a, r) {
    this.sv = t, this.yt = a, this.Ng = i, this.Fg = r;
  }
  getHeight() {
    return this.yt.$t();
  }
  setHeight(t) {
    const i = this.sv.Qt(), a = i.hf(this.yt);
    i.Bd(a, t);
  }
  getStretchFactor() {
    return this.yt.z_();
  }
  setStretchFactor(t) {
    this.yt.O_(t), this.sv.Qt().Pa();
  }
  paneIndex() {
    return this.sv.Qt().hf(this.yt);
  }
  moveTo(t) {
    const i = this.paneIndex();
    i !== t && (we(t >= 0 && t < this.sv.rv().length, "Invalid pane index"), this.sv.Qt().Ad(i, t));
  }
  getSeries() {
    return this.yt.U_().map(((t) => this.Ng(t))) ?? [];
  }
  getHTMLElement() {
    const t = this.sv.rv();
    return t && t.length !== 0 && t[this.paneIndex()] ? t[this.paneIndex()].uv() : null;
  }
  attachPrimitive(t) {
    this.yt.hl(t), t.attached && t.attached({ chart: this.Fg, requestUpdate: () => this.yt.Qt().Pa() });
  }
  detachPrimitive(t) {
    this.yt.al(t);
  }
  priceScale(t) {
    if (this.yt.A_(t) === null) throw new Error(`Cannot find price scale with id: ${t}`);
    return new A1(this.sv, t, this.paneIndex());
  }
  setPreserveEmptyPane(t) {
    this.yt.W_(t);
  }
  preserveEmptyPane() {
    return this.yt.H_();
  }
  addCustomSeries(t, i = {}, a = 0) {
    return this.Fg.addCustomSeries(t, i, a);
  }
  addSeries(t, i = {}) {
    return this.Fg.addSeries(t, i, this.paneIndex());
  }
}
const ck = { color: "#FF0000", price: 0, lineStyle: 2, lineWidth: 1, lineVisible: !0, axisLabelVisible: !0, title: "", axisLabelColor: "", axisLabelTextColor: "" };
class V0 {
  constructor(t) {
    this._r = t;
  }
  applyOptions(t) {
    this._r.vr(t);
  }
  options() {
    return this._r.N();
  }
  Wg() {
    return this._r;
  }
}
class uk {
  constructor(t, i, a, r, c, u) {
    this.Hg = new te(), this.ae = t, this.Ug = i, this.$g = a, this.xu = c, this.Fg = r, this.jg = u;
  }
  m() {
    this.Hg.m();
  }
  priceFormatter() {
    return this.ae.tl();
  }
  priceToCoordinate(t) {
    const i = this.ae.Lt();
    return i === null ? null : this.ae.Ft().Nt(t, i.Wt);
  }
  coordinateToPrice(t) {
    const i = this.ae.Lt();
    return i === null ? null : this.ae.Ft().Tn(t, i.Wt);
  }
  barsInLogicalRange(t) {
    if (t === null) return null;
    const i = new Ea(new Yl(t.from, t.to)).Fu(), a = this.ae.Un();
    if (a.Gi()) return null;
    const r = a.Hn(i.Oa(), 1), c = a.Hn(i.bi(), -1), u = W(a.Rh()), f = W(a.Qn());
    if (r !== null && c !== null && r.$n > c.$n) return { barsBefore: t.from - u, barsAfter: f - t.to };
    const m = { barsBefore: r === null || r.$n === u ? t.from - u : r.$n - u, barsAfter: c === null || c.$n === f ? f - t.to : f - c.$n };
    return r !== null && c !== null && (m.from = r.Qr, m.to = c.Qr), m;
  }
  setData(t) {
    this.xu, this.ae.bh(), this.Ug.qg(this.ae, t), this.Yg("full");
  }
  update(t, i = !1) {
    this.ae.bh(), this.Ug.Kg(this.ae, t, i), this.Yg("update");
  }
  pop(t = 1) {
    const i = this.Ug.Zg(this.ae, t);
    i.length !== 0 && this.Yg("update");
    const a = Xo(this.seriesType());
    return i.map(((r) => a(r)));
  }
  dataByIndex(t, i) {
    const a = this.ae.Un().Hn(t, i);
    return a === null ? null : Xo(this.seriesType())(a);
  }
  data() {
    const t = Xo(this.seriesType());
    return this.ae.Un().Bh().map(((i) => t(i)));
  }
  subscribeDataChanged(t) {
    this.Hg.i(t);
  }
  unsubscribeDataChanged(t) {
    this.Hg._(t);
  }
  applyOptions(t) {
    this.ae.vr(t);
  }
  options() {
    return mn(this.ae.N());
  }
  priceScale() {
    return this.$g.priceScale(this.ae.Ft().cl(), this.getPane().paneIndex());
  }
  createPriceLine(t) {
    const i = Pe(mn(ck), t), a = this.ae.Ba(i);
    return new V0(a);
  }
  removePriceLine(t) {
    this.ae.Ea(t.Wg());
  }
  priceLines() {
    return this.ae.Aa().map(((t) => new V0(t)));
  }
  seriesType() {
    return this.ae.bh();
  }
  lastValueData(t) {
    const i = this.ae.Ae(t);
    return i.Le ? { noData: !0 } : { noData: !1, price: i.Mt, color: i.R };
  }
  attachPrimitive(t) {
    this.ae.hl(t), t.attached && t.attached({ chart: this.Fg, series: this, requestUpdate: () => this.ae.Qt().Pa(), horzScaleBehavior: this.xu });
  }
  detachPrimitive(t) {
    this.ae.al(t), t.detached && t.detached(), this.ae.Qt().Pa();
  }
  getPane() {
    const t = this.ae, i = W(this.ae.Qt().Ks(t));
    return this.jg(i);
  }
  moveToPane(t) {
    this.ae.Qt().nf(this.ae, t);
  }
  seriesOrder() {
    const t = this.ae.Qt().Ks(this.ae);
    return t === null ? -1 : t.U_().indexOf(this.ae);
  }
  setSeriesOrder(t) {
    const i = this.ae.Qt().Ks(this.ae);
    i !== null && i.du(this.ae, t);
  }
  Yg(t) {
    this.Hg.v() && this.Hg.p(t);
  }
}
class hk {
  constructor(t, i, a) {
    this.Gg = new te(), this.Gu = new te(), this.Bw = new te(), this.sn = t, this.ia = t.Et(), this._M = i, this.ia.Yc().i(this.Xg.bind(this)), this.ia.Kc().i(this.Jg.bind(this)), this._M.Fw().i(this.Qg.bind(this)), this.xu = a;
  }
  m() {
    this.ia.Yc().u(this), this.ia.Kc().u(this), this._M.Fw().u(this), this.Gg.m(), this.Gu.m(), this.Bw.m();
  }
  scrollPosition() {
    return this.ia.Ac();
  }
  scrollToPosition(t, i) {
    i ? this.ia.$c(t, 1e3) : this.sn.gs(t);
  }
  scrollToRealTime() {
    this.ia.Uc();
  }
  getVisibleRange() {
    const t = this.ia.gc();
    return t === null ? null : { from: t.from.originalTime, to: t.to.originalTime };
  }
  setVisibleRange(t) {
    const i = { from: this.xu.convertHorzItemToInternal(t.from), to: this.xu.convertHorzItemToInternal(t.to) }, a = this.ia.Cc(i);
    this.sn.tf(a);
  }
  getVisibleLogicalRange() {
    const t = this.ia.Mc();
    return t === null ? null : { from: t.Oa(), to: t.bi() };
  }
  setVisibleLogicalRange(t) {
    we(t.from <= t.to, "The from index cannot be after the to index."), this.sn.tf(t);
  }
  resetTimeScale() {
    this.sn.ws();
  }
  fitContent() {
    this.sn.Xc();
  }
  logicalToCoordinate(t) {
    const i = this.sn.Et();
    return i.Gi() ? null : i.jt(t);
  }
  coordinateToLogical(t) {
    return this.ia.Gi() ? null : this.ia.Rc(t);
  }
  timeToIndex(t, i) {
    const a = this.xu.convertHorzItemToInternal(t);
    return this.ia.vc(a, i);
  }
  timeToCoordinate(t) {
    const i = this.timeToIndex(t, !1);
    return i === null ? null : this.ia.jt(i);
  }
  coordinateToTime(t) {
    const i = this.sn.Et(), a = i.Rc(t), r = i.en(a);
    return r === null ? null : r.originalTime;
  }
  width() {
    return this._M.cv().width;
  }
  height() {
    return this._M.cv().height;
  }
  subscribeVisibleTimeRangeChange(t) {
    this.Gg.i(t);
  }
  unsubscribeVisibleTimeRangeChange(t) {
    this.Gg._(t);
  }
  subscribeVisibleLogicalRangeChange(t) {
    this.Gu.i(t);
  }
  unsubscribeVisibleLogicalRangeChange(t) {
    this.Gu._(t);
  }
  subscribeSizeChange(t) {
    this.Bw.i(t);
  }
  unsubscribeSizeChange(t) {
    this.Bw._(t);
  }
  applyOptions(t) {
    this.ia.vr(t);
  }
  options() {
    return { ...mn(this.ia.N()), barSpacing: this.ia.fl() };
  }
  Xg() {
    this.Gg.v() && this.Gg.p(this.getVisibleRange());
  }
  Jg() {
    this.Gu.v() && this.Gu.p(this.getVisibleLogicalRange());
  }
  Qg(t) {
    this.Bw.p(t.width, t.height);
  }
}
function Y0(s) {
  return (function(t) {
    if (zo(t.handleScale)) {
      const a = t.handleScale;
      t.handleScale = { axisDoubleClickReset: { time: a, price: a }, axisPressedMouseMove: { time: a, price: a }, mouseWheel: a, pinch: a };
    } else if (t.handleScale !== void 0) {
      const { axisPressedMouseMove: a, axisDoubleClickReset: r } = t.handleScale;
      zo(a) && (t.handleScale.axisPressedMouseMove = { time: a, price: a }), zo(r) && (t.handleScale.axisDoubleClickReset = { time: r, price: r });
    }
    const i = t.handleScroll;
    zo(i) && (t.handleScroll = { horzTouchDrag: i, vertTouchDrag: i, mouseWheel: i, pressedMouseMove: i });
  })(s), s;
}
class dk {
  constructor(t, i, a) {
    this.tb = /* @__PURE__ */ new Map(), this.ib = /* @__PURE__ */ new Map(), this.nb = new te(), this.sb = new te(), this.eb = new te(), this.od = /* @__PURE__ */ new WeakMap(), this.rb = new UC(i);
    const r = a === void 0 ? mn(Q0()) : Pe(mn(Q0()), Y0(a));
    this.hb = i, this.sv = new zC(t, r, i), this.sv.dw().i(((u) => {
      this.nb.v() && this.nb.p(this.ab(u()));
    }), this), this.sv.fw().i(((u) => {
      this.sb.v() && this.sb.p(this.ab(u()));
    }), this), this.sv.Dd().i(((u) => {
      this.eb.v() && this.eb.p(this.ab(u()));
    }), this);
    const c = this.sv.Qt();
    this.lb = new hk(c, this.sv.pM(), this.hb);
  }
  remove() {
    this.sv.dw().u(this), this.sv.fw().u(this), this.sv.Dd().u(this), this.lb.m(), this.sv.m(), this.tb.clear(), this.ib.clear(), this.nb.m(), this.sb.m(), this.eb.m(), this.rb.m();
  }
  resize(t, i, a) {
    this.autoSizeActive() || this.sv.cM(t, i, a);
  }
  addCustomSeries(t, i = {}, a = 0) {
    const r = ((c) => ({ type: "Custom", isBuiltIn: !1, defaultOptions: { ...FC, ...c.defaultOptions() }, ob: JC, _b: c }))(Kn(t));
    return this.ub(r, i, a);
  }
  addSeries(t, i = {}, a = 0) {
    return this.ub(t, i, a);
  }
  removeSeries(t) {
    const i = Ve(this.tb.get(t)), a = this.rb.Jd(i);
    this.sv.Qt().Jd(i), this.cb(a), this.tb.delete(t), this.ib.delete(i);
  }
  qg(t, i) {
    this.cb(this.rb.sg(t, i));
  }
  Kg(t, i, a) {
    this.cb(this.rb.og(t, i, a));
  }
  Zg(t, i) {
    const [a, r] = this.rb.cg(t, i);
    return a.length !== 0 && this.cb(r), a;
  }
  subscribeClick(t) {
    this.nb.i(t);
  }
  unsubscribeClick(t) {
    this.nb._(t);
  }
  subscribeCrosshairMove(t) {
    this.eb.i(t);
  }
  unsubscribeCrosshairMove(t) {
    this.eb._(t);
  }
  subscribeDblClick(t) {
    this.sb.i(t);
  }
  unsubscribeDblClick(t) {
    this.sb._(t);
  }
  priceScale(t, i = 0) {
    return new A1(this.sv, t, i);
  }
  timeScale() {
    return this.lb;
  }
  applyOptions(t) {
    this.sv.vr(Y0(t));
  }
  options() {
    return this.sv.N();
  }
  takeScreenshot(t = !1, i = !1) {
    let a, r;
    try {
      i || (a = this.sv.Qt().N().crosshair.mode, this.sv.vr({ crosshair: { mode: 2 } })), r = this.sv.SM(t);
    } finally {
      i || a === void 0 || this.sv.Qt().vr({ crosshair: { mode: a } });
    }
    return r;
  }
  addPane(t = !1) {
    const i = this.sv.Qt().af();
    return i.W_(t), this.fb(i);
  }
  removePane(t) {
    this.sv.Qt().Vd(t);
  }
  swapPanes(t, i) {
    this.sv.Qt().Ed(t, i);
  }
  autoSizeActive() {
    return this.sv.wM();
  }
  chartElement() {
    return this.sv.vv();
  }
  panes() {
    return this.sv.Qt().Zn().map(((t) => this.fb(t)));
  }
  paneSize(t = 0) {
    const i = this.sv.RM(t);
    return { height: i.height, width: i.width };
  }
  setCrosshairPosition(t, i, a) {
    const r = this.tb.get(a);
    if (r === void 0) return;
    const c = this.sv.Qt().Ks(r);
    c !== null && this.sv.Qt().qd(t, i, c);
  }
  clearCrosshairPosition() {
    this.sv.Qt().Yd(!0);
  }
  horzBehaviour() {
    return this.hb;
  }
  ub(t, i = {}, a = 0) {
    we(t.ob !== void 0), (function(m) {
      if (m === void 0 || m.type === "custom") return;
      const v = m;
      v.minMove !== void 0 && v.precision === void 0 && (v.precision = C1(v.minMove));
    })(i.priceFormat), t.type === "Candlestick" && (function(m) {
      m.borderColor !== void 0 && (m.borderUpColor = m.borderColor, m.borderDownColor = m.borderColor), m.wickColor !== void 0 && (m.wickUpColor = m.wickColor, m.wickDownColor = m.wickColor);
    })(i);
    const r = Pe(mn(h1), mn(t.defaultOptions), i), c = t.ob, u = new wc(this.sv.Qt(), t.type, r, c, t._b);
    this.sv.Qt().Gd(u, a);
    const f = new uk(u, this, this, this, this.hb, ((m) => this.fb(m)));
    return this.tb.set(f, u), this.ib.set(u, f), f;
  }
  cb(t) {
    const i = this.sv.Qt();
    i.Kd(t.Et.Pc, t.Et.vg, t.Et.mg), t.U_.forEach(((a, r) => r.ht(a.ue, a.pg))), i.Et()._c(), i.Bc();
  }
  pb(t) {
    return Ve(this.ib.get(t));
  }
  mb(t) {
    return t !== void 0 && this.ib.has(t) ? this.pb(t) : void 0;
  }
  ab(t) {
    const i = /* @__PURE__ */ new Map();
    t.YM.forEach(((c, u) => {
      const f = u.bh(), m = Xo(f)(c);
      if (f !== "Custom") we(AC(m));
      else {
        const v = u.ol();
        we(!v || v(m) === !1);
      }
      i.set(this.pb(u), m);
    }));
    const a = this.mb(t.NM), r = t.WM === void 0 ? void 0 : { type: t.WM.ds, sourceKind: t.WM.HM, objectKind: t.WM.UM, series: this.mb(t.WM.U_), objectId: t.WM.$M, paneIndex: t.WM.jM };
    return { time: t.Qr, logical: t.$n, point: t.qM, paneIndex: t.jM, hoveredInfo: r, hoveredSeries: a, hoveredObjectId: t.FM, seriesData: i, sourceEvent: t.KM };
  }
  fb(t) {
    let i = this.od.get(t);
    return i || (i = new ok(this.sv, ((a) => this.pb(a)), t, this), this.od.set(t, i)), i;
  }
}
function fk(s) {
  if (cr(s)) {
    const t = document.getElementById(s);
    return we(t !== null, `Cannot find element in DOM with id=${s}`), t;
  }
  return s;
}
function mk(s, t, i) {
  const a = fk(s), r = new dk(a, t, i);
  return t.setOptions(r.options()), r;
}
function pk(s, t) {
  return mk(s, new j0(), j0.yf(t));
}
function Dl(s, t, i, a) {
  return Math.hypot(i - s, a - t);
}
function O1(s, t, i, a, r, c, u, f = 0) {
  if (t.length === 0 || a.from >= t.length || a.to <= 0) return;
  const { context: m, horizontalPixelRatio: v, verticalPixelRatio: g } = s, b = t[a.from];
  let y = c(s, b), S = b;
  if (a.to - a.from < 2) {
    const w = r / 2;
    m.beginPath();
    const M = { _t: b._t - w, ut: b.ut }, N = { _t: b._t + w, ut: b.ut };
    m.moveTo(M._t * v, M.ut * g), m.lineTo(N._t * v, N.ut * g), u(s, y, M, N);
  } else {
    const w = f > 0;
    let M = 0;
    const N = (T, D) => {
      if (u(s, y, S, D), m.beginPath(), y = T, S = D, w) {
        const O = M % f;
        m.lineDashOffset = O, M = O;
      }
    };
    let k = S;
    m.beginPath(), m.moveTo(b._t * v, b.ut * g);
    for (let T = a.from + 1; T < a.to; ++T) {
      k = t[T];
      const D = k._t * v, O = k.ut * g, V = c(s, k);
      switch (i) {
        case 0:
          if (m.lineTo(D, O), w) {
            const G = t[T - 1], R = G._t * v, X = G.ut * g;
            M += Dl(R, X, D, O);
          }
          break;
        case 1: {
          const G = t[T - 1], R = G.ut * g;
          m.lineTo(D, R), w && (M += Math.abs(k._t - G._t) * v), V !== y && (N(V, k), m.lineTo(D, R)), m.lineTo(D, O), w && (M += Math.abs(k.ut - G.ut) * g);
          break;
        }
        case 2: {
          const [G, R] = vf(t, T - 1, T), X = G._t * v, P = G.ut * g, rt = R._t * v, at = R.ut * g;
          if (m.bezierCurveTo(X, P, rt, at, D, O), w) {
            const F = t[T - 1], gt = F._t * v, xt = F.ut * g, Ot = Dl(gt, xt, D, O), L = Dl(gt, xt, X, P) + Dl(X, P, rt, at) + Dl(rt, at, D, O);
            M += (Ot + L) / 2;
          }
          break;
        }
      }
      i !== 1 && V !== y && (N(V, k), m.moveTo(D, O));
    }
    (S !== k || S === k && i === 1) && u(s, y, S, k), w && (m.lineDashOffset = 0);
  }
}
const G0 = 6;
function dd(s, t) {
  return { _t: s._t - t._t, ut: s.ut - t.ut };
}
function K0(s, t) {
  return { _t: s._t / t, ut: s.ut / t };
}
function vf(s, t, i) {
  const a = Math.max(0, t - 1), r = Math.min(s.length - 1, i + 1);
  var c, u;
  return [(c = s[t], u = K0(dd(s[i], s[a]), G0), { _t: c._t + u._t, ut: c.ut + u.ut }), dd(s[i], K0(dd(s[r], s[t]), G0))];
}
function vk(s, t) {
  const i = s.context;
  i.strokeStyle = t, i.stroke();
}
class gk extends Os {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: i, lt: a, wb: r, Mb: c, ct: u, Zt: f, gb: m } = this.rt;
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineWidth = u * t.verticalPixelRatio;
    const g = Jn(v, f);
    v.lineJoin = "round";
    const b = this.bb.bind(this), y = (function(S) {
      return S.reduce(((w, M) => w + M), 0);
    })(g);
    c !== void 0 && O1(t, i, c, a, r, b, vk, y), m && (function(S, w, M, N, k) {
      if (N.to - N.from <= 0) return;
      const { horizontalPixelRatio: T, verticalPixelRatio: D, context: O } = S;
      let V = null;
      const G = Math.max(1, Math.floor(T)) % 2 / 2, R = M * D + G;
      for (let X = N.to - 1; X >= N.from; --X) {
        const P = w[X];
        if (P) {
          const rt = k(S, P);
          rt !== V && (V !== null && O.fill(), O.beginPath(), O.fillStyle = rt, V = rt);
          const at = Math.round(P._t * T) + G, F = P.ut * D;
          O.moveTo(at, F), O.arc(at, F, R, 0, 2 * Math.PI);
        }
      }
      O.fill();
    })(t, i, m, a, b);
  }
}
class D1 extends gk {
  bb(t, i) {
    return i.vt;
  }
}
function X0(s, t, i, a, r) {
  const c = 1 - r;
  return c * c * c * s + 3 * c * c * r * t + 3 * c * r * r * i + r * r * r * a;
}
function bk(s, t, i, a, r) {
  if (i === 2) {
    const [c, u] = vf(a, r - 1, r);
    return [Math.min(s._t, t._t, c._t, u._t), Math.max(s._t, t._t, c._t, u._t)];
  }
  return [Math.min(s._t, t._t), Math.max(s._t, t._t)];
}
function xk(s, t, i, a, r, c, u, f) {
  switch (r) {
    case 1: {
      const m = Bl(s, t, i._t, i.ut, a._t, i.ut), v = Bl(s, t, a._t, i.ut, a._t, a.ut), g = Math.min(m, v);
      return g <= f ? g : null;
    }
    case 2: {
      const [m, v] = vf(c, u - 1, u), g = (function(b, y, S) {
        let w = Number.POSITIVE_INFINITY, M = S[0];
        for (let N = 1; N <= 12; N++) {
          const k = N / 12, T = { _t: X0(S[0]._t, S[1]._t, S[2]._t, S[3]._t, k), ut: X0(S[0].ut, S[1].ut, S[2].ut, S[3].ut, k) };
          w = Math.min(w, Bl(b, y, M._t, M.ut, T._t, T.ut)), M = T;
        }
        return w;
      })(s, t, [i, m, v, a]);
      return g <= f ? g : null;
    }
    default: {
      const m = Bl(s, t, i._t, i.ut, a._t, a.ut);
      return m <= f ? m : null;
    }
  }
}
class yk extends z1 {
  constructor(t, i) {
    super(t, i, !0);
  }
  Vg(t, i, a) {
    i.Tc(this.bg, kd(this.Sg)), t.Zo(this.bg, a, kd(this.Sg));
  }
  Sb(t, i) {
    return { wt: t, Mt: i, _t: NaN, ut: NaN };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((i) => {
      let a;
      if ((i.Zr ?? 1) > 1) {
        const r = i.Wt[1], c = i.Wt[2], u = i.Wt[3];
        a = Math.abs(r - u) > Math.abs(c - u) ? r : c;
      } else a = i.Wt[3];
      return this.xb(i.$n, a, t);
    }));
  }
}
class R1 extends yk {
  Pg(t, i) {
    const a = this.ae.N();
    return (function(r, c, u, f, m, v, g, b = 0, y = 0) {
      if (c === null || c.from >= c.to || r.length === 0) return null;
      const S = Math.max(v / 2, g ?? 0) + y;
      let w = Number.POSITIVE_INFINITY;
      if (g !== void 0) {
        const O = g + y, V = Bd(r, u - O, c.from, c.to), G = Ud(r, u + O, V, c.to);
        for (let R = V; R < G; R++) {
          const X = r[R];
          if (!q0(u, X._t, X._t, g + y)) continue;
          const P = Math.hypot(u - X._t, f - X.ut);
          P <= g + y && (w = Math.min(w, P));
        }
      }
      if (c.to - c.from < 2) {
        const O = r[c.from], V = Math.max(b / 2, S), G = Bl(u, f, O._t - V, O.ut, O._t + V, O.ut);
        return G <= S && (w = Math.min(w, G)), Number.isFinite(w) ? Ko(w, 2, "series-point") : null;
      }
      let M = Number.POSITIVE_INFINITY;
      const N = Bd(r, u - S, c.from, c.to), k = Ud(r, u + S, N, c.to), T = Math.max(c.from + 1, N), D = Math.min(c.to, k + 1);
      for (let O = T; O < D; O++) {
        const V = r[O - 1], G = r[O], [R, X] = bk(V, G, m, r, O);
        if (!q0(u, R, X, S)) continue;
        const P = xk(u, f, V, G, m, r, O, S);
        P !== null && (M = Math.min(M, P));
      }
      return Number.isFinite(w) ? Ko(w, 2, "series-point") : Number.isFinite(M) ? Ko(M, 1, "series-line") : null;
    })(this.bg, this.Sg, t, i, a.lineType, a.lineVisible ? a.lineWidth : 1, a.pointMarkersVisible ? a.pointMarkersRadius || a.lineWidth / 2 + 2 : void 0, this.le.Et().fl(), a.hitTestTolerance);
  }
}
class wk extends R1 {
  constructor() {
    super(...arguments), this.kg = new D1();
  }
  xb(t, i, a) {
    return { ...this.Sb(t, i), ...a.Sh(t) };
  }
  Bg() {
    const t = this.ae.N(), i = { ot: this.bg, Zt: t.lineStyle, Mb: t.lineVisible ? t.lineType : void 0, ct: t.lineWidth, gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0, lt: this.Sg, wb: this.le.Et().fl() };
    this.kg.ht(i);
  }
}
const _k = { type: "Line", isBuiltIn: !0, defaultOptions: { color: "#2196f3", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new wk(s, t) };
function Sk(s, t, i, a, r) {
  const { context: c, horizontalPixelRatio: u, verticalPixelRatio: f } = t;
  c.lineTo(r._t * u, s * f), c.lineTo(a._t * u, s * f), c.closePath(), c.fillStyle = i, c.fill();
}
class Mk extends Os {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: i, lt: a, wb: r, ct: c, Zt: u, Mb: f } = this.rt, m = this.rt.Db ?? (this.rt.Ib ? 0 : t.mediaSize.height);
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineJoin = "round", v.lineWidth = c, Jn(v, u), v.lineWidth = 1, O1(t, i, f, a, r, this.Vb.bind(this), Sk.bind(null, m));
  }
}
class Nk {
  Bb(t, i) {
    const a = this.Eb, { Ab: r, Lb: c, zb: u, Ob: f, Db: m, Nb: v, Fb: g } = i;
    if (this.Wb === void 0 || a === void 0 || a.Ab !== r || a.Lb !== c || a.zb !== u || a.Ob !== f || a.Db !== m || a.Nb !== v || a.Fb !== g) {
      const { verticalPixelRatio: b } = t, y = m || v > 0 ? b : 1, S = v * y, w = g === t.bitmapSize.height ? g : g * y, M = (m ?? 0) * y, N = t.context.createLinearGradient(0, S, 0, w);
      if (N.addColorStop(0, r), m != null) {
        const k = ka((M - S) / (w - S), 0, 1);
        N.addColorStop(k, c), N.addColorStop(k, u);
      }
      N.addColorStop(1, f), this.Wb = N, this.Eb = i;
    }
    return this.Wb;
  }
}
class jk extends Mk {
  constructor() {
    super(...arguments), this.Hb = new Nk();
  }
  Vb(t, i) {
    return this.Hb.Bb(t, { Ab: i.ah, Lb: "", zb: "", Ob: i.oh, Nb: this.rt?.Nb ?? 0, Fb: t.bitmapSize.height });
  }
}
class Ck extends R1 {
  constructor(t, i) {
    super(t, i), this.kg = new m1(), this.qb = new jk(), this.Yb = new D1(), this.kg.nt([this.qb, this.Yb]);
  }
  xb(t, i, a) {
    return { ...this.Sb(t, i), ...a.Sh(t) };
  }
  Bg() {
    const t = this.ae.N();
    if (this.Sg === null || this.bg.length === 0) return;
    let i;
    if (t.relativeGradient) {
      i = this.bg[this.Sg.from].ut;
      for (let a = this.Sg.from; a < this.Sg.to; a++) {
        const r = this.bg[a];
        r.ut < i && (i = r.ut);
      }
    }
    this.qb.ht({ Mb: t.lineType, ot: this.bg, Zt: t.lineStyle, ct: t.lineWidth, Db: null, Nb: i, Ib: t.invertFilledArea, lt: this.Sg, wb: this.le.Et().fl() }), this.Yb.ht({ Mb: t.lineVisible ? t.lineType : void 0, ot: this.bg, Zt: t.lineStyle, ct: t.lineWidth, lt: this.Sg, wb: this.le.Et().fl(), gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0 });
  }
}
const kk = { type: "Area", isBuiltIn: !0, defaultOptions: { topColor: "rgba( 46, 220, 135, 0.4)", bottomColor: "rgba( 40, 221, 100, 0)", invertFilledArea: !1, relativeGradient: !1, lineColor: "#33D778", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new Ck(s, t) };
({ ...h1 });
function L1(s) {
  return s.unit === "d" ? s.value * 24 * 36e5 : s.value * 36e5;
}
function B1(s) {
  if (s == null) return null;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : null;
}
function Ek(s) {
  let t = s >>> 0 || 1;
  return () => (t ^= t << 13, t ^= t >>> 17, t ^= t << 5, t >>>= 0, t / 4294967296);
}
function zk(s) {
  let t = 2166136261;
  for (let i = 0; i < s.length; i++)
    t ^= s.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function Tk(s, t, i) {
  const a = L1(i), r = i.unit === "d" ? Math.min(i.value * 24, 240) : Math.min(i.value * 12, 240), u = Date.now() - a, f = a / Math.max(1, r - 1), m = Ek(zk(s)), v = (Math.abs(t) || 1) * 0.12 + 0.5, g = new Array(r);
  g[r - 1] = t;
  for (let b = r - 2; b >= 0; b--)
    g[b] = g[b + 1] + (m() - 0.5) * v;
  return g.map((b, y) => ({ t: Math.round(u + y * f), v: Math.round(b * 100) / 100 }));
}
function Ak(s) {
  const t = B1(s.s ?? s.state);
  if (t == null) return null;
  const i = s.lu ?? s.last_updated;
  let a;
  if (typeof i == "number") a = i < 1e12 ? i * 1e3 : i;
  else if (typeof i == "string") a = Date.parse(i);
  else return null;
  return Number.isFinite(a) ? { t: a, v: t } : null;
}
function fd(s, t) {
  return t.map((i) => s[i]?.state ?? "").join("|");
}
function Ok(s, t) {
  const i = t.join(","), [a, r] = j.useState(() => fd(s.getStates(), t));
  return j.useEffect(() => (r(fd(s.getStates(), t)), s.subscribe(() => {
    const c = fd(s.getStates(), t);
    r((u) => u === c ? u : c);
  })), [s, i]), a;
}
function U1(s, t) {
  const i = ji(), a = s.filter(Boolean).join(","), r = `${t.value}${t.unit}`, c = j.useMemo(() => s.filter(Boolean), [a]), u = !!i.connection, [f, m] = j.useState({}), v = j.useRef(0);
  j.useEffect(() => {
    const b = i.connection;
    if (!b || c.length === 0) {
      m({});
      return;
    }
    const y = ++v.current, S = /* @__PURE__ */ new Date(), w = new Date(S.getTime() - L1(t));
    b.sendMessagePromise({
      type: "history/history_during_period",
      start_time: w.toISOString(),
      end_time: S.toISOString(),
      entity_ids: c,
      minimal_response: !0,
      no_attributes: !0,
      significant_changes_only: !1
    }).then((M) => {
      if (y !== v.current) return;
      const N = {};
      for (const k of c) {
        const T = M?.[k] ?? [], D = [];
        for (const O of T) {
          const V = Ak(O);
          V && D.push(V);
        }
        D.length && (N[k] = D);
      }
      m(N);
    }).catch(() => {
      y === v.current && m({});
    });
  }, [i, c, r]);
  const g = Ok(i, c);
  return j.useMemo(() => {
    const b = i.getStates(), y = {};
    for (const S of c) {
      if (f[S]?.length) {
        y[S] = f[S];
        continue;
      }
      const w = B1(b[S]?.state);
      w != null && (y[S] = Tk(S, w, t));
    }
    return y;
  }, [i, c, f, g, r, u]);
}
function H1({ spec: s }) {
  const t = j.useMemo(() => s.series.map((r) => r.entity), [s.series]), i = U1(t, s.window), a = s.title ?? `History chart: ${s.series.map((r) => r.name ?? $1(r.entity)).join(", ")}`;
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-chart", role: "group", "aria-label": a, children: [
    (s.title || s.header.showCurrent) && /* @__PURE__ */ h.jsxs("div", { className: "simui-chart-head", children: [
      s.title && /* @__PURE__ */ h.jsx("span", { className: "simui-chart-title", children: s.title }),
      s.header.showCurrent && /* @__PURE__ */ h.jsx("div", { className: "simui-chart-readout", children: s.series.map((r, c) => /* @__PURE__ */ h.jsx(
        Dk,
        {
          series: r,
          color: Bk(r, c),
          colorize: s.header.colorize
        },
        `${r.entity}-${c}`
      )) })
    ] }),
    /* @__PURE__ */ h.jsx(Rk, { spec: s, data: i })
  ] });
}
function Dk({
  series: s,
  color: t,
  colorize: i
}) {
  const a = Ee(s.entity), r = a?.state, c = r != null ? Number.parseFloat(r) : NaN, u = a?.attributes.unit_of_measurement, f = Number.isFinite(c) ? vn(c) : r ?? "—";
  return /* @__PURE__ */ h.jsxs("span", { className: "simui-chart-cur", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-chart-dot", style: { background: t } }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-chart-cur-name", children: s.name ?? $1(s.entity) }),
    /* @__PURE__ */ h.jsxs("span", { className: "simui-chart-cur-val", style: i ? { color: t } : void 0, children: [
      f,
      u && Number.isFinite(c) ? /* @__PURE__ */ h.jsxs("small", { children: [
        " ",
        u
      ] }) : null
    ] })
  ] });
}
function Rk({ spec: s, data: t }) {
  const i = j.useRef(null), a = j.useRef(null), r = j.useRef([]);
  return j.useEffect(() => {
    const c = i.current;
    if (!c) return;
    const u = getComputedStyle(c), f = (M, N) => u.getPropertyValue(M).trim() || N, m = f("--text", "#edeef2"), v = f("--muted", "#838996"), g = f("--faint", "#23262e"), b = pk(c, {
      layout: {
        background: { type: Ad.Solid, color: "transparent" },
        textColor: v,
        fontFamily: getComputedStyle(c).fontFamily,
        attributionLogo: !1
      },
      grid: {
        vertLines: { color: g, style: Ss.Solid },
        horzLines: { color: g, style: Ss.Solid }
      },
      rightPriceScale: { borderColor: g, visible: !0 },
      leftPriceScale: { borderColor: g, visible: !1 },
      timeScale: { borderColor: g, timeVisible: s.window.unit === "h", secondsVisible: !1 },
      crosshair: {
        mode: Ed.Magnet,
        vertLine: { color: v, width: 1, style: Ss.Dotted, labelBackgroundColor: g },
        horzLine: { color: v, width: 1, style: Ss.Dotted, labelBackgroundColor: g, labelVisible: !0 }
      },
      handleScale: !1,
      handleScroll: !1,
      autoSize: !1
    });
    b.applyOptions({ layout: { textColor: v } }), a.current = b;
    const y = (s.axes.length ? s.axes : [void 0]).some((M) => Z0(M) === "left");
    b.priceScale("left").applyOptions({ visible: y, borderColor: g, textColor: m }), b.priceScale("right").applyOptions({ borderColor: g, textColor: m }), r.current = s.series.map((M, N) => {
      const k = Lk(M, N, u), T = Uk(s, M), D = Z0(T), O = Hk(M.strokeWidth ?? 2);
      if (M.fill === "area") {
        const G = M.opacity ?? 0.18, R = b.addSeries(kk, {
          lineColor: k,
          topColor: I0(k, G),
          bottomColor: I0(k, 0),
          lineWidth: O,
          priceScaleId: D,
          priceLineVisible: !1,
          lastValueVisible: !0,
          crosshairMarkerVisible: !0
        });
        return W0(R, T), R;
      }
      const V = b.addSeries(_k, {
        color: k,
        lineWidth: O,
        priceScaleId: D,
        priceLineVisible: !1,
        lastValueVisible: !0,
        crosshairMarkerVisible: !0
      });
      return W0(V, T), V;
    });
    const S = r.current[0];
    if (S && s.thresholds?.length)
      for (const M of s.thresholds)
        S.createPriceLine({
          price: M.value,
          color: q1(M.color, u),
          lineWidth: 1,
          lineStyle: Ss.Dashed,
          axisLabelVisible: !1
        });
    const w = new ResizeObserver((M) => {
      const N = M[0]?.contentRect;
      if (!(!N || !a.current))
        try {
          a.current.resize(N.width, N.height);
        } catch {
        }
    });
    w.observe(c);
    try {
      b.resize(c.clientWidth || 1, c.clientHeight || 1);
    } catch {
    }
    return () => {
      w.disconnect();
      try {
        b.remove();
      } catch {
      }
      a.current = null, r.current = [];
    };
  }, [$k(s)]), j.useEffect(() => {
    const c = a.current;
    if (c)
      try {
        let u = !1;
        s.series.forEach((f, m) => {
          const v = r.current[m];
          if (!v) return;
          const g = t[f.entity] ?? [], b = qk(g).map((y) => ({
            time: Math.floor(y.t / 1e3),
            value: y.v
          }));
          v.setData(b), b.length && (u = !0);
        }), u && c.timeScale().fitContent();
      } catch {
      }
  }, [t, s.series]), /* @__PURE__ */ h.jsx("div", { className: "simui-chart-canvas", ref: i, "aria-hidden": "true" });
}
const Gl = ["--accent", "--warm", "--up", "--down", "--warn"];
function Lk(s, t, i) {
  if (s.color) return q1(s.color, i);
  const a = Gl[t % Gl.length], r = ["#5b8cff", "#ffb267", "#3fd08a", "#f0735e", "#f0a84b"][t % Gl.length];
  return i?.getPropertyValue(a).trim() || r;
}
function Bk(s, t) {
  return s.color ?? `var(${Gl[t % Gl.length]})`;
}
function q1(s, t) {
  const i = s.trim();
  if (i.startsWith("--")) return t?.getPropertyValue(i).trim() || i;
  const a = i.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  return a && t?.getPropertyValue(a[1]).trim() || i;
}
function $1(s) {
  return (s.split(".")[1] ?? s).replace(/_/g, " ").replace(/^\w/, (i) => i.toUpperCase());
}
function Uk(s, t) {
  return t.axisId ? s.axes.find((i) => i.id === t.axisId) : s.axes[0];
}
function Z0(s) {
  return s?.opposite ? "right" : "left";
}
function W0(s, t) {
  if (!t || t.min == null || t.max == null) return;
  const i = t.min, a = t.max;
  s.applyOptions({
    autoscaleInfoProvider: () => ({
      priceRange: { minValue: i, maxValue: a }
    })
  });
}
function Hk(s) {
  const t = Math.round(s);
  return t < 1 ? 1 : t > 4 ? 4 : t;
}
function I0(s, t) {
  const i = Math.max(0, Math.min(1, t)), a = s.trim();
  if (/^#([0-9a-f]{3})$/i.test(a)) {
    const c = parseInt(a[1] + a[1], 16), u = parseInt(a[2] + a[2], 16), f = parseInt(a[3] + a[3], 16);
    return `rgba(${c}, ${u}, ${f}, ${i})`;
  }
  if (/^#([0-9a-f]{6})$/i.test(a)) {
    const c = parseInt(a.slice(1, 3), 16), u = parseInt(a.slice(3, 5), 16), f = parseInt(a.slice(5, 7), 16);
    return `rgba(${c}, ${u}, ${f}, ${i})`;
  }
  const r = a.match(/^rgb\(([^)]+)\)$/i);
  return r ? `rgba(${r[1]}, ${i})` : `color-mix(in srgb, ${a} ${Math.round(i * 100)}%, transparent)`;
}
function qk(s) {
  const t = [...s].sort((r, c) => r.t - c.t), i = [];
  let a = -1;
  for (const r of t) {
    const c = Math.floor(r.t / 1e3);
    c === a ? i[i.length - 1] = r : (i.push(r), a = c);
  }
  return i;
}
function $k(s) {
  const t = s.series.map((r) => `${r.entity}:${r.fill}:${r.color ?? ""}:${r.strokeWidth ?? ""}:${r.axisId ?? ""}:${r.opacity ?? ""}`).join(","), i = s.axes.map((r) => `${r.id}:${r.opposite ? 1 : 0}:${r.min ?? ""}:${r.max ?? ""}:${r.ticks ?? ""}`).join(","), a = (s.thresholds ?? []).map((r) => `${r.value}:${r.color}`).join(",");
  return `${s.window.value}${s.window.unit}|${t}|${i}|${a}`;
}
const F0 = 'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function Q1({ open: s, title: t, onClose: i, children: a }) {
  const r = j.useRef(null), c = j.useRef(null), u = j.useId(), f = j.useCallback(
    (m) => {
      if (m.key === "Escape") {
        m.preventDefault(), i();
        return;
      }
      if (m.key !== "Tab") return;
      const v = r.current;
      if (!v) return;
      const g = v.querySelectorAll(F0);
      if (g.length === 0) {
        m.preventDefault(), v.focus();
        return;
      }
      const b = g[0], y = g[g.length - 1], S = document.activeElement;
      m.shiftKey && (S === b || !v.contains(S)) ? (m.preventDefault(), y.focus()) : !m.shiftKey && S === y && (m.preventDefault(), b.focus());
    },
    [i]
  );
  return j.useEffect(() => {
    if (!s) return;
    c.current = document.activeElement, document.addEventListener("keydown", f, !0);
    const m = r.current;
    return (m?.querySelector(F0) ?? m)?.focus(), () => {
      document.removeEventListener("keydown", f, !0), c.current?.focus?.();
    };
  }, [s, f]), s ? Gn.createPortal(
    /* @__PURE__ */ h.jsx("div", { className: "simui-root simui-sheet-backdrop", onClick: i, children: /* @__PURE__ */ h.jsxs(
      "div",
      {
        ref: r,
        className: "simui-sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t ? void 0 : "Details",
        "aria-labelledby": t ? u : void 0,
        tabIndex: -1,
        onClick: (m) => m.stopPropagation(),
        children: [
          t && /* @__PURE__ */ h.jsxs("header", { className: "simui-sheet-head", children: [
            /* @__PURE__ */ h.jsx("span", { id: u, className: "simui-sheet-title", children: t }),
            /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: i, "aria-label": "Close", children: /* @__PURE__ */ h.jsx(of, { size: 16 }) })
          ] }),
          /* @__PURE__ */ h.jsx("div", { className: "simui-sheet-body", children: a })
        ]
      }
    ) }),
    document.body
  ) : null;
}
const Qk = { value: 24, unit: "h" }, Vk = 140, Yk = 40;
function Gk({ entityId: s, band: t, window: i, name: a, accent: r, onExpand: c }) {
  const u = Ee(s), f = i ?? Qk, m = !!u && (u.state === "unavailable" || u.state === "unknown"), g = U1(m ? [] : [s], f)[s], b = u?.attributes.unit_of_measurement, y = u?.state, S = y != null ? Number.parseFloat(y) : NaN, w = !m && Number.isFinite(S), M = a ?? (u ? J(u) : s), { delta: N, outOfBand: k } = j.useMemo(() => {
    const G = (g ?? []).map((F) => F.v), R = G.length ? G[0] : void 0, X = w ? S : G.length ? G[G.length - 1] : void 0, P = R != null && X != null ? X - R : void 0, rt = w ? S : X, at = rt != null && t != null && (t.min != null && rt < t.min || t.max != null && rt > t.max);
    return { delta: P, outOfBand: !!at };
  }, [g, S, w, t]), T = k ? "var(--warn)" : r ?? "var(--muted)", D = `simui-metric-val num${k ? " oob" : ""}`;
  if (m)
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-metric is-unavailable", children: [
      /* @__PURE__ */ h.jsx("div", { className: "simui-metric-head", children: /* @__PURE__ */ h.jsx("span", { className: "simui-metric-name", title: M, children: M }) }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-metric-value", children: /* @__PURE__ */ h.jsx("span", { className: "simui-metric-val num", children: "—" }) })
    ] });
  const O = (G) => {
    c && (G.stopPropagation(), c());
  }, V = c ? (G) => {
    (G.key === "Enter" || G.key === " ") && (G.preventDefault(), c());
  } : void 0;
  return /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: `simui-metric${c ? " is-clickable" : ""}`,
      onClick: c ? O : void 0,
      onKeyDown: V,
      role: c ? "button" : void 0,
      tabIndex: c ? 0 : void 0,
      "aria-label": c ? `${M} — view chart` : void 0,
      style: { "--metric-accent": T },
      children: [
        /* @__PURE__ */ h.jsxs("div", { className: "simui-metric-head", children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-metric-name", title: M, children: M }),
          N != null && Math.abs(N) >= Kk && /* @__PURE__ */ h.jsxs("span", { className: `simui-metric-delta num ${N > 0 ? "up" : "down"}`, children: [
            N > 0 ? "+" : "−",
            vn(Math.abs(N))
          ] })
        ] }),
        /* @__PURE__ */ h.jsxs("div", { className: "simui-metric-value", children: [
          /* @__PURE__ */ h.jsx("span", { className: D, children: w ? vn(S) : y ?? "—" }),
          b && w && /* @__PURE__ */ h.jsx("span", { className: "simui-metric-unit", children: b })
        ] }),
        /* @__PURE__ */ h.jsx(
          Xk,
          {
            values: (g ?? []).map((G) => G.v),
            band: t,
            stroke: T
          }
        )
      ]
    }
  );
}
const Kk = 0.05;
function Xk({
  values: s,
  band: t,
  stroke: i,
  width: a = Vk,
  height: r = Yk
}) {
  const c = j.useMemo(() => `ms-${Math.random().toString(36).slice(2, 8)}`, []);
  if (s.length < 2)
    return /* @__PURE__ */ h.jsx("div", { className: "simui-metric-spark is-empty", style: { height: r }, "aria-hidden": "true" });
  const u = Math.min(...s), f = Math.max(...s), m = (f - u || Math.abs(f) || 1) * 0.12, v = u - m, b = f + m - v || 1, y = a / (s.length - 1), S = (T) => r - (T - v) / b * r, M = s.map((T, D) => `${(D * y).toFixed(1)},${S(T).toFixed(1)}`).join(" "), N = `0,${r} ${M} ${a},${r}`;
  let k = null;
  if (t && (t.min != null || t.max != null)) {
    const T = t.max != null ? J0(S(t.max), r) : 0, D = t.min != null ? J0(S(t.min), r) : r, O = Math.max(0, D - T);
    O > 0.5 && (k = { y: T, h: O });
  }
  return /* @__PURE__ */ h.jsxs(
    "svg",
    {
      className: "simui-metric-spark",
      width: "100%",
      height: r,
      viewBox: `0 0 ${a} ${r}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ h.jsx("defs", { children: /* @__PURE__ */ h.jsxs("linearGradient", { id: c, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ h.jsx("stop", { offset: "0%", stopColor: i, stopOpacity: "0.22" }),
          /* @__PURE__ */ h.jsx("stop", { offset: "100%", stopColor: i, stopOpacity: "0" })
        ] }) }),
        k && /* @__PURE__ */ h.jsx(
          "rect",
          {
            className: "simui-metric-band",
            x: "0",
            y: k.y.toFixed(1),
            width: a,
            height: k.h.toFixed(1)
          }
        ),
        /* @__PURE__ */ h.jsx("polygon", { points: N, fill: `url(#${c})`, stroke: "none" }),
        /* @__PURE__ */ h.jsx(
          "polyline",
          {
            points: M,
            fill: "none",
            stroke: i,
            strokeWidth: 1.5,
            strokeLinejoin: "round",
            strokeLinecap: "round",
            vectorEffect: "non-scaling-stroke"
          }
        )
      ]
    }
  );
}
function J0(s, t) {
  return s < 0 ? 0 : s > t ? t : s;
}
const md = [
  { id: "24h", label: "24h", window: { value: 24, unit: "h" } },
  { id: "7d", label: "7d", window: { value: 7, unit: "d" } },
  { id: "30d", label: "30d", window: { value: 30, unit: "d" } }
];
function V1({
  entityId: s,
  spec: t,
  band: i,
  accent: a,
  name: r,
  range: c = "24h",
  children: u
}) {
  const [f, m] = j.useState(!1), [v, g] = j.useState(c), b = Ee(s ?? ""), y = r ?? (b ? J(b) : s), S = md.find((k) => k.id === v)?.window ?? md[0].window, w = j.useMemo(() => t ? { ...t, window: S } : s ? Zk(s, y ?? s, S, a, i) : null, [t, s, y, S, a, i]), M = u ?? (s ? /* @__PURE__ */ h.jsx(
    Gk,
    {
      entityId: s,
      band: i,
      window: S,
      name: r,
      accent: a,
      onExpand: () => m(!0)
    }
  ) : null), N = u != null ? /* @__PURE__ */ h.jsx(
    "div",
    {
      className: "simui-expand-glance is-clickable",
      role: "button",
      tabIndex: 0,
      "aria-label": y ? `${y} — view chart` : "View chart",
      onClick: () => m(!0),
      onKeyDown: (k) => {
        (k.key === "Enter" || k.key === " ") && (k.preventDefault(), m(!0));
      },
      children: M
    }
  ) : M;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    N,
    /* @__PURE__ */ h.jsx(Q1, { open: f, title: y, onClose: () => m(!1), children: /* @__PURE__ */ h.jsxs("div", { className: "simui-expand-sheet", children: [
      /* @__PURE__ */ h.jsx("div", { className: "simui-range-toggle", role: "tablist", "aria-label": "Chart range", children: md.map((k) => /* @__PURE__ */ h.jsx(
        "button",
        {
          role: "tab",
          "aria-selected": v === k.id,
          className: `simui-range-btn${v === k.id ? " active" : ""}`,
          onClick: () => g(k.id),
          children: k.label
        },
        k.id
      )) }),
      w && /* @__PURE__ */ h.jsx("div", { className: "simui-expand-chart", children: /* @__PURE__ */ h.jsx(H1, { spec: w }) })
    ] }) })
  ] });
}
function Zk(s, t, i, a, r) {
  const c = [];
  return r?.min != null && c.push({ value: r.min, color: "var(--warn)" }), r?.max != null && c.push({ value: r.max, color: "var(--warn)" }), {
    title: t,
    window: i,
    bucket: i.unit === "d" ? "day" : "hour",
    reducer: "mean",
    backend: i.unit === "d" && i.value > 7 ? "statistics" : "history",
    header: { showCurrent: !0, colorize: !0 },
    axes: [{ id: "main" }],
    series: [
      {
        entity: s,
        name: t,
        fill: "area",
        opacity: 0.18,
        strokeWidth: 2,
        color: a,
        axisId: "main"
      }
    ],
    thresholds: c.length ? c : void 0
  };
}
function pd(s, t) {
  return t <= 0 ? qi(Math.round(s), 0, 100) : qi(Math.round(s / t) * t, 0, 100);
}
function Wk(s) {
  const { value: t, onCommit: i, axis: a = "auto", commitMs: r = 120, step: c = 1, disabled: u, threshold: f = 4 } = s, [m, v] = j.useState(() => pd(t, c)), [g, b] = j.useState(!1), [y, S] = j.useState(a === "auto" ? "vertical" : a), w = j.useRef(!1), M = j.useRef(m), N = j.useRef(null), k = j.useRef(a === "auto" ? null : a), T = j.useRef(null), D = j.useRef(null), O = j.useRef(!1), V = j.useRef(null), G = j.useRef(null), R = j.useRef(0), X = j.useRef(null), P = j.useRef(i);
  P.current = i;
  const rt = j.useCallback(() => {
    if (X.current != null && (clearTimeout(X.current), X.current = null), G.current != null) {
      const L = G.current;
      G.current = null, R.current = Date.now(), P.current(L);
    }
  }, []), at = j.useCallback(
    (L) => {
      G.current = L;
      const Z = Date.now(), it = Math.max(0, r - (Z - R.current));
      X.current != null && clearTimeout(X.current), X.current = setTimeout(rt, it);
    },
    [r, rt]
  );
  j.useEffect(() => {
    if (w.current || G.current != null) return;
    const L = pd(t, c);
    M.current = L, v(L);
  }, [t, c]);
  const F = j.useCallback(() => {
    V.current = null;
    const L = N.current, Z = D.current;
    if (!L || !Z) return;
    if (k.current == null && T.current) {
      const E = Math.abs(Z.x - T.current.x), $ = Math.abs(Z.y - T.current.y);
      if (E > f || $ > f) {
        const I = $ >= E ? "vertical" : "horizontal";
        k.current = I, S(I);
      }
    }
    const it = k.current ?? "vertical";
    let dt;
    it === "vertical" ? dt = L.height > 0 ? (L.bottom - Z.y) / L.height * 100 : 0 : dt = L.width > 0 ? (Z.x - L.left) / L.width * 100 : 0;
    const mt = pd(dt, c);
    mt !== M.current && (M.current = mt, v(mt), at(mt));
  }, [c, f, at]);
  j.useEffect(() => {
    if (!g) return;
    const L = (it) => {
      if (w.current) {
        if (it.preventDefault(), D.current = { x: it.clientX, y: it.clientY }, T.current && !O.current) {
          const dt = Math.abs(it.clientX - T.current.x), mt = Math.abs(it.clientY - T.current.y);
          (dt > f || mt > f) && (O.current = !0);
        }
        V.current == null && (V.current = requestAnimationFrame(F));
      }
    }, Z = () => {
      w.current = !1, b(!1), V.current != null && (cancelAnimationFrame(V.current), V.current = null), O.current && (G.current == null && (G.current = M.current), rt());
    };
    return window.addEventListener("pointermove", L, { passive: !1 }), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z), () => {
      window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z);
    };
  }, [g, f, F, rt]), j.useEffect(
    () => () => {
      V.current != null && cancelAnimationFrame(V.current), X.current != null && clearTimeout(X.current);
    },
    []
  );
  const gt = j.useCallback(
    (L) => {
      if (u || L.button != null && L.button !== 0) return;
      const Z = L.currentTarget;
      N.current = Z.getBoundingClientRect(), T.current = { x: L.clientX, y: L.clientY }, D.current = { x: L.clientX, y: L.clientY }, O.current = !1, k.current = a === "auto" ? null : a, w.current = !0, b(!0);
    },
    [u, a]
  ), xt = y === "horizontal" ? { width: `${m}%` } : { height: `${m}%` }, Ot = j.useCallback(() => O.current, []);
  return { value: m, dragging: g, moved: Ot, handlers: { onPointerDown: gt }, fillStyle: xt };
}
const P0 = 4, Ik = {
  light: {
    tint: "var(--warm)",
    read: (s) => {
      if (s.state !== "on") return 0;
      const t = s.attributes.brightness;
      return t != null ? Math.max(1, Math.round(t / 255 * 100)) : 100;
    },
    isOn: (s) => s.state === "on",
    icon: () => Po,
    commit: (s, t, i) => s("light", "turn_on", { brightness_pct: i }, { entity_id: t.entity_id }),
    toggle: (s, t, i) => s("light", i ? "turn_off" : "turn_on", {}, { entity_id: t.entity_id })
  },
  cover: {
    tint: "var(--accent)",
    read: (s) => {
      const t = s.attributes.current_position;
      return t ?? (s.state === "open" ? 100 : 0);
    },
    isOn: (s) => s.state === "open" || (s.attributes.current_position ?? 0) > 0,
    icon: () => nf,
    commit: (s, t, i) => s("cover", "set_cover_position", { position: i }, { entity_id: t.entity_id }),
    toggle: (s, t, i) => s("cover", i ? "close_cover" : "open_cover", void 0, { entity_id: t.entity_id })
  },
  fan: {
    tint: "var(--cool)",
    read: (s) => {
      if (s.state !== "on") return 0;
      const t = s.attributes.percentage;
      return t ?? 100;
    },
    isOn: (s) => s.state === "on",
    icon: () => Ta,
    commit: (s, t, i) => s("fan", "set_percentage", { percentage: i }, { entity_id: t.entity_id }),
    toggle: (s, t, i) => s("fan", i ? "turn_off" : "turn_on", {}, { entity_id: t.entity_id })
  },
  media_player: {
    tint: "var(--violet)",
    read: (s) => {
      const t = s.attributes.volume_level;
      return t != null ? Math.round(t * 100) : 0;
    },
    isOn: (s) => !s.attributes.is_volume_muted && s.state !== "off",
    icon: (s) => s ? Wb : Ib,
    commit: (s, t, i) => s("media_player", "volume_set", { volume_level: i / 100 }, { entity_id: t.entity_id }),
    toggle: (s, t, i) => s("media_player", "volume_mute", { is_volume_muted: i }, { entity_id: t.entity_id })
  }
};
function Fk({ entity: s, name: t, step: i = 1, menuItems: a }) {
  const r = Ee(s), c = jt(), u = cf(), f = Ha(), m = (F, gt, xt, Ot) => {
    c(F, gt, xt, Ot);
  }, v = st(s), g = Ik[v], b = !!r && (r.state === "unavailable" || r.state === "unknown"), y = r?.attributes.supported_features ?? 0, S = !!g && !b && (v !== "cover" || (y & P0) === P0), w = !!r && !!g && g.isOn(r), M = r && g ? g.read(r) ?? 0 : 0, N = Wk({
    value: M,
    axis: "vertical",
    step: i,
    disabled: !S || !r,
    onCommit: (F) => {
      r && g && g.commit(m, r, F);
    }
  }), k = j.useRef(!1);
  if (!r || !g) return null;
  const T = t ?? J(r), D = S ? N.value : w ? M : 0, O = g.icon(w), V = () => {
    if (k.current) {
      k.current = !1;
      return;
    }
    b || g.toggle(m, r, w);
  }, G = () => {
    N.moved() && (k.current = !0);
  }, R = (F) => {
    F.stopPropagation(), g.toggle(m, r, w);
  }, X = (F) => {
    const gt = Math.max(0, Math.min(100, Math.round(F)));
    g.commit(m, r, gt);
  }, P = (F) => {
    if (F.key === "Enter" || F.key === " ") {
      F.preventDefault(), b || g.toggle(m, r, w);
      return;
    }
    if (!S) return;
    const gt = 10;
    switch (F.key) {
      case "ArrowUp":
      case "ArrowRight":
        F.preventDefault(), X(D + i);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        F.preventDefault(), X(D - i);
        break;
      case "PageUp":
        F.preventDefault(), X(D + gt);
        break;
      case "PageDown":
        F.preventDefault(), X(D - gt);
        break;
      case "Home":
        F.preventDefault(), X(0);
        break;
      case "End":
        F.preventDefault(), X(100);
        break;
    }
  }, rt = { ...N.fillStyle, background: g.tint }, at = [
    { label: w ? eb(v) : tb(v), onClick: () => g.toggle(m, r, w) },
    { label: "Details", onClick: () => f({ action: "more-info" }, s) },
    ...a ?? []
  ];
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: `simui-slidertile${w ? " is-on" : ""}${N.dragging ? " is-dragging" : ""}${S ? "" : " is-static"}${b ? " is-unavailable" : ""}`,
        style: { "--slider-tint": g.tint },
        role: "slider",
        "aria-label": `${T} ${Jk(v)}`,
        "aria-orientation": "vertical",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": D,
        "aria-valuetext": `${D}%`,
        "aria-disabled": S ? void 0 : !0,
        tabIndex: 0,
        onClick: V,
        onKeyDown: P,
        onPointerUpCapture: G,
        ...S ? N.handlers : {},
        ...u.menuProps,
        children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-slidertile-fill", style: rt, "aria-hidden": "true" }),
          /* @__PURE__ */ h.jsxs("span", { className: "simui-slidertile-body", children: [
            /* @__PURE__ */ h.jsxs("span", { className: "simui-slidertile-head", children: [
              /* @__PURE__ */ h.jsx(
                "button",
                {
                  type: "button",
                  className: `simui-slidertile-ic${w ? " on" : ""}`,
                  "aria-label": w ? eb(v) : tb(v),
                  onClick: R,
                  onPointerDown: (F) => F.stopPropagation(),
                  children: /* @__PURE__ */ h.jsx(O, { size: 18, strokeWidth: 2 })
                }
              ),
              /* @__PURE__ */ h.jsx("span", { className: "simui-slidertile-pct num", children: Pk(v, w, D) })
            ] }),
            /* @__PURE__ */ h.jsx("span", { className: "simui-slidertile-name", title: T, children: T })
          ] })
        ]
      }
    ),
    u.open && u.position && /* @__PURE__ */ h.jsx(
      ec,
      {
        items: at,
        x: u.position.x,
        y: u.position.y,
        onClose: u.close,
        header: Il(s) ? /* @__PURE__ */ h.jsx(Fl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function Jk(s) {
  switch (s) {
    case "light":
      return "brightness";
    case "cover":
      return "position";
    case "fan":
      return "speed";
    case "media_player":
      return "volume";
  }
}
function Pk(s, t, i) {
  return (s === "light" || s === "fan") && !t ? "Off" : s === "media_player" && !t ? "Muted" : `${i}%`;
}
function tb(s) {
  switch (s) {
    case "cover":
      return "Open";
    case "media_player":
      return "Unmute";
    default:
      return "Turn on";
  }
}
function eb(s) {
  switch (s) {
    case "cover":
      return "Close";
    case "media_player":
      return "Mute";
    default:
      return "Turn off";
  }
}
const Y1 = "category.", tE = {
  lights: { name: "Lights", icon: "lightbulb", color: "warm" },
  climate: { name: "Climate", icon: "thermostat", color: "teal" },
  media: { name: "Media", icon: "cast", color: "violet" },
  security: { name: "Security", icon: "shield", color: "green" },
  sensors: { name: "Sensors", icon: "activity", color: "cyan" },
  power: { name: "Power", icon: "zap", color: "warn" },
  scenes: { name: "Scenes", icon: "sparkles", color: "pink" },
  server: { name: "System", icon: "server", color: "slate" }
};
function eE({ block: s }) {
  const t = s.entityIds;
  if (t.length && t.every((u) => u.startsWith(Y1)))
    return /* @__PURE__ */ h.jsx(sE, { block: s });
  if (t.length > 0 && t.every((u) => st(u) === "scene" || st(u) === "script"))
    return /* @__PURE__ */ h.jsx(aE, { block: s });
  if (s.axis === "metrics")
    return /* @__PURE__ */ h.jsx(cE, { block: s });
  if (s.tile === "statusboard")
    return /* @__PURE__ */ h.jsx(uE, { block: s });
  if (s.tile === "slider")
    return /* @__PURE__ */ h.jsx(hE, { block: s });
  const a = t.length > 0 && t.every((u) => st(u) === "light"), r = s.axis ?? "none", c = r === "room" || r === "floor" || r === "device-class";
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    a && /* @__PURE__ */ h.jsx(dE, { ids: t }),
    c ? /* @__PURE__ */ h.jsx(iE, { ids: t, axis: r }) : /* @__PURE__ */ h.jsx("div", { className: "simui-rows", children: t.map((u) => /* @__PURE__ */ h.jsx(ic, { entityId: u }, u)) })
  ] });
}
function iE({ ids: s, axis: t }) {
  const i = dc(), a = ji().getStates(), r = (u) => a[u]?.attributes.device_class, c = /* @__PURE__ */ new Map();
  for (const u of s) {
    const f = nE(u, t, i, r);
    let m = c.get(f);
    m || (m = [], c.set(f, m)), m.push(u);
  }
  return c.size <= 1 ? /* @__PURE__ */ h.jsx("div", { className: "simui-rows", children: s.map((u) => /* @__PURE__ */ h.jsx(ic, { entityId: u }, u)) }) : /* @__PURE__ */ h.jsx("div", { className: "simui-subgroups", children: [...c.entries()].map(([u, f]) => /* @__PURE__ */ h.jsxs("div", { className: "simui-subgroup", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-subhead", children: u }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-rows", children: f.map((m) => /* @__PURE__ */ h.jsx(ic, { entityId: m }, m)) })
  ] }, u)) });
}
function nE(s, t, i, a) {
  if (t === "floor")
    return i?.[s]?.floorName ?? i?.[s]?.areaName ?? "Home";
  if (t === "room")
    return i?.[s]?.areaName ?? "Other";
  if (t === "device-class") {
    const r = a(s);
    return ot(r || st(s));
  }
  return "Other";
}
function sE({ block: s }) {
  const { openCategory: t } = Ts(), i = s.entityIds.map((a) => a.slice(Y1.length));
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-launcher-grid", children: i.map((a) => {
      const r = tE[a] ?? { name: ot(a), icon: "home", color: "accent" };
      return /* @__PURE__ */ h.jsx(
        ej,
        {
          name: r.name,
          icon: r.icon,
          color: r.color,
          onTap: () => t(a)
        },
        a
      );
    }) })
  ] });
}
function aE({ block: s }) {
  const t = Ha();
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-launcher-grid", children: s.entityIds.map((i) => /* @__PURE__ */ h.jsx(lE, { entityId: i, onTap: () => t({ action: "call-service", service: `${st(i)}.turn_on`, target: { entity_id: i } }, i) }, i)) })
  ] });
}
function lE({ entityId: s, onTap: t }) {
  const i = Ee(s), a = YM("sparkles");
  return /* @__PURE__ */ h.jsxs("button", { className: "simui-scene-tile", onClick: t, "aria-label": i ? J(i) : s, children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-launch-ic", children: /* @__PURE__ */ h.jsx(a, { size: 18, strokeWidth: 2 }) }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-name simui-launch-name", children: i ? J(i) : s })
  ] });
}
function rE(s) {
  switch (s?.attributes.device_class) {
    case "humidity":
      return { min: 40, max: 60 };
    case "carbon_dioxide":
      return { max: 1e3 };
    case "pm25":
      return { max: 35 };
    case "pm10":
      return { max: 50 };
    case "battery":
      return { min: 20 };
    default:
      return;
  }
}
function oE(s) {
  switch (s?.attributes.device_class) {
    case "temperature":
      return "var(--warn)";
    case "humidity":
      return "var(--accent)";
    case "pm25":
    case "pm10":
    case "pm1":
    case "co2":
    case "carbon_dioxide":
    case "volatile_organic_compounds":
    case "aqi":
    case "nitrogen_dioxide":
    case "ozone":
      return "var(--up)";
    case "power":
    case "energy":
      return "var(--warn)";
    case "battery":
      return "var(--muted)";
    case "illuminance":
      return "var(--cyan)";
    default:
      return "var(--cyan)";
  }
}
function cE({ block: s }) {
  const t = ji().getStates();
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-metric-wall", children: s.entityIds.map((i) => {
      const a = t[i];
      return /* @__PURE__ */ h.jsx(V1, { entityId: i, band: rE(a), accent: oE(a) }, i);
    }) })
  ] });
}
function uE({ block: s }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-statusboard-grid", children: s.entityIds.map((t) => /* @__PURE__ */ h.jsx(s1, { entity: t }, t)) })
  ] });
}
function hE({ block: s }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-slider-wall", children: s.entityIds.map((t) => /* @__PURE__ */ h.jsx(Fk, { entity: t, step: st(t) === "light" ? 1 : 5 }, t)) })
  ] });
}
function dE({ ids: s }) {
  const t = jt(), i = Qe((r) => {
    const c = s.filter((f) => r[f]?.state === "on");
    if (!c.length) return 0;
    const u = c.reduce((f, m) => f + Number(r[m]?.attributes.brightness ?? 0), 0);
    return Math.round(u / c.length / 255 * 100);
  }), a = (r) => {
    const c = Number(r.target.value);
    s.forEach((u) => {
      t("light", "turn_on", { brightness_pct: c }, { entity_id: u });
    });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-master", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-master-label", children: "All" }),
    /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: i,
        "aria-label": "All lights brightness",
        onChange: a,
        style: { background: `linear-gradient(to right, var(--warm) ${i}%, var(--faint) ${i}%)` }
      }
    ),
    /* @__PURE__ */ h.jsxs("span", { className: "simui-master-val num", children: [
      i,
      "%"
    ] })
  ] });
}
function fE({ block: s }) {
  return s.source ? /* @__PURE__ */ h.jsx(mE, { block: s }) : /* @__PURE__ */ h.jsx(G1, { title: s.title, ids: s.entityIds });
}
function mE({ block: s }) {
  const t = dc(), i = s.source, a = Qe(
    (c) => r1(i, c, (u) => t?.[u]?.areaName).join(",")
  ), r = a ? a.split(",") : [];
  return !r.length && (i.hideWhenEmpty ?? !0) ? null : /* @__PURE__ */ h.jsx(G1, { title: s.title, ids: r, empty: "Nothing right now." });
}
function G1({ title: s, ids: t, empty: i }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-surface list", children: [
    s && /* @__PURE__ */ h.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ h.jsx("span", { children: s }) }),
    t.length ? /* @__PURE__ */ h.jsx("div", { className: "simui-rows divided", children: t.map((a) => /* @__PURE__ */ h.jsx(ic, { entityId: a }, a)) }) : i && /* @__PURE__ */ h.jsx("div", { className: "simui-list-empty", children: i })
  ] });
}
const pE = {
  scene: sS,
  script: MS,
  button: Wn,
  input_button: Wn
};
function vE(s) {
  return s === "scene" || s === "script" ? "turn_on" : "press";
}
function Uo({ entity: s }) {
  const t = jt(), i = st(s.entity_id), a = s.state === "unavailable" || s.state === "unknown", r = pE[i] ?? js, c = J(s), u = () => {
    a || t(i, vE(i), {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsx(
    Nt,
    {
      onClick: a ? void 0 : u,
      className: `simui-action${a ? " is-unavailable" : ""}`,
      children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(r, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: c, children: c }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-action-run", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(js, { size: 13, strokeWidth: 2, fill: "currentColor" }) })
      ] })
    }
  );
}
const gE = 1e4;
function bE({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", i = s.attributes.entity_picture, [a, r] = j.useState(() => Date.now());
  j.useEffect(() => {
    if (t || !i) return;
    const f = window.setInterval(() => r(Date.now()), gE);
    return () => window.clearInterval(f);
  }, [t, i]);
  const c = i ? `${i}${i.includes("?") ? "&" : "?"}_=${a}` : void 0, u = J(s);
  return /* @__PURE__ */ h.jsx(Nt, { className: `simui-camera${t ? " is-unavailable" : ""}`, children: /* @__PURE__ */ h.jsxs("div", { className: "simui-cam-frame", children: [
    c && !t ? /* @__PURE__ */ h.jsx("img", { className: "simui-cam-img", src: c, alt: u, loading: "lazy" }) : /* @__PURE__ */ h.jsx("div", { className: "simui-cam-empty", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(CM, { size: 20, strokeWidth: 1.75 }) }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-cam-cap", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-cam-name", title: u, children: u }),
      t && /* @__PURE__ */ h.jsx("span", { className: "simui-cam-state", children: ot(s.state) })
    ] })
  ] }) });
}
const xE = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, yE = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function wE({ entity: s }) {
  const t = jt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Aa, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
      ] }),
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsxs("span", { className: "simui-big", children: [
          "—",
          /* @__PURE__ */ h.jsx("span", { className: "simui-unit", children: "°" })
        ] }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: "Unavailable" })
      ] })
    ] });
  const a = s.attributes, r = a.hvac_action, c = a.current_temperature, u = a.temperature, f = a.target_temp_low, m = a.target_temp_high, v = a.target_temp_step ?? 0.5, g = a.min_temp ?? 7, b = a.max_temp ?? 35, y = r && xE[r] || yE[s.state] || "", S = (N) => {
    if (u == null) return;
    const k = qi(Math.round((u + N) / v) * v, g, b);
    t("climate", "set_temperature", { temperature: k }, { entity_id: s.entity_id });
  }, w = a.hvac_modes ?? [], M = w.length > 1 ? [{ type: "climate-hvac-modes", modes: w, style: "icons" }] : [];
  return /* @__PURE__ */ h.jsxs(Nt, { children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic ${y}`, children: /* @__PURE__ */ h.jsx(Aa, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsxs("span", { className: "simui-big", children: [
        c != null ? Math.round(c) : "—",
        /* @__PURE__ */ h.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      u != null ? /* @__PURE__ */ h.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => S(-v), children: /* @__PURE__ */ h.jsx(pc, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ h.jsxs("span", { className: "simui-target", children: [
          vd(u),
          "°"
        ] }),
        /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => S(v), children: /* @__PURE__ */ h.jsx(As, { size: 14, strokeWidth: 2.5 }) })
      ] }) : f != null && m != null ? /* @__PURE__ */ h.jsxs("span", { className: "simui-target", children: [
        vd(f),
        "–",
        vd(m),
        "°"
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx(ts, { entity: s, features: M })
  ] });
}
function vd(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const Ho = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function _E({ entity: s }) {
  const t = jt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: "Unavailable" })
    ] }) });
  const a = s.attributes.current_position, r = s.state === "open" || a != null && a > 0, c = vt(s, Ho.SET_POSITION) && a != null, u = (m, v) => {
    t("cover", m, v, { entity_id: s.entity_id });
  }, f = c ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0;
  return /* @__PURE__ */ h.jsxs(Nt, { className: r ? "is-on" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: a != null ? `${a}%` : ot(s.state) })
    ] }),
    c ? /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: a,
        "aria-label": "Position",
        style: f,
        onChange: (m) => u("set_cover_position", { position: Number(m.target.value) })
      }
    ) : /* @__PURE__ */ h.jsxs("div", { className: "simui-controls", children: [
      vt(s, Ho.OPEN) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => u("open_cover"), children: /* @__PURE__ */ h.jsx(za, { size: 15, strokeWidth: 2 }) }),
      vt(s, Ho.STOP) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => u("stop_cover"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
      vt(s, Ho.CLOSE) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => u("close_cover"), children: /* @__PURE__ */ h.jsx(Qi, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const SE = { SET_SPEED: 1 };
function ME({ entity: s }) {
  const t = jt(), i = s.state === "unavailable" || s.state === "unknown", a = s.state === "on", r = a ? s.attributes.percentage ?? 100 : 0, c = !i && vt(s, SE.SET_SPEED), u = J(s), f = () => {
    t("fan", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, m = (b) => {
    t("fan", "set_percentage", { percentage: Number(b.target.value) }, { entity_id: s.entity_id });
  }, g = {
    background: `linear-gradient(to right, ${a ? "var(--cool)" : "var(--faint)"} ${r}%, var(--faint) ${r}%)`
  };
  return i ? /* @__PURE__ */ h.jsx(Nt, { className: "simui-fan is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Ta, { size: 16, strokeWidth: 2 }) }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: u, children: u }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: ot(s.state) })
  ] }) }) : /* @__PURE__ */ h.jsxs(Nt, { onClick: f, className: `simui-fan${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${a ? " cool" : ""}`, children: /* @__PURE__ */ h.jsx(Ta, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: u, children: u }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${r}%` : "Off" })
    ] }),
    c && /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: r,
        "aria-label": `${u} speed`,
        style: g,
        onClick: (b) => b.stopPropagation(),
        onChange: m
      }
    )
  ] });
}
const NE = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function jE({ entity: s }) {
  const t = jt(), i = st(s.entity_id);
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsx("div", { className: "simui-row", children: /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }) }),
      /* @__PURE__ */ h.jsx(Ni, { value: "Unavailable" })
    ] });
  const r = s.state === "on" || s.state === "off", c = s.state === "on", u = NE.has(i) && r, f = s.attributes.unit_of_measurement ?? "", m = u ? () => {
    t("homeassistant", c ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  } : void 0;
  return /* @__PURE__ */ h.jsxs(Nt, { onClick: m, className: u && c ? "is-on" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      u && /* @__PURE__ */ h.jsx("span", { className: `simui-ic${c ? " cool" : ""}`, children: /* @__PURE__ */ h.jsx(Wn, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
    ] }),
    /* @__PURE__ */ h.jsx(
      Ni,
      {
        value: `${ot(s.state)}${f ? ` ${f}` : ""}`,
        since: r ? s.last_changed : void 0
      }
    )
  ] });
}
function CE({ entity: s }) {
  const t = jt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Po, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-pct", children: "Unavailable" })
    ] }) });
  const a = s.state === "on", r = s.attributes.brightness ?? 0, c = a ? Math.max(1, Math.round(r / 255 * 100)) : 0, u = () => {
    t("light", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, f = (g) => {
    t("light", "turn_on", { brightness_pct: Number(g.target.value) }, { entity_id: s.entity_id });
  }, v = { background: `linear-gradient(to right, ${a ? "var(--warm)" : "var(--faint)"} ${c}%, var(--faint) ${c}%)` };
  return /* @__PURE__ */ h.jsxs(Nt, { onClick: u, className: a ? "is-lit" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${a ? " warm" : ""}`, children: /* @__PURE__ */ h.jsx(Po, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${c}%` : "Off" })
    ] }),
    /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: c,
        "aria-label": `${J(s)} brightness`,
        style: v,
        onClick: (g) => g.stopPropagation(),
        onChange: f
      }
    )
  ] });
}
function kE({ entity: s }) {
  const t = jt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Ns, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
      ] }),
      /* @__PURE__ */ h.jsx(Ni, { value: "Unavailable", tone: "muted" })
    ] });
  const a = s.state === "locked", r = () => {
    t("lock", a ? "unlock" : "lock", {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsxs(Nt, { onClick: r, className: a ? "" : "is-unlocked", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${a ? "" : " amber"}`, children: a ? /* @__PURE__ */ h.jsx(Ns, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ h.jsx(Ua, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
    ] }),
    /* @__PURE__ */ h.jsx(Ni, { value: a ? "Locked" : "Unlocked", since: s.last_changed, tone: a ? "muted" : "warn" })
  ] });
}
const Sa = 16;
function EE(s, t) {
  return new Promise((i) => {
    if (!s || typeof document > "u") {
      i(null);
      return;
    }
    const a = new Image();
    a.crossOrigin = "anonymous", a.decoding = "async";
    const r = (c) => {
      a.onload = null, a.onerror = null, i(t?.aborted ? null : c);
    };
    a.onerror = () => r(null), a.onload = () => {
      if (t?.aborted) {
        r(null);
        return;
      }
      try {
        const c = document.createElement("canvas");
        c.width = Sa, c.height = Sa;
        const u = c.getContext("2d", { willReadFrequently: !0 });
        if (!u) {
          r(null);
          return;
        }
        u.drawImage(a, 0, 0, Sa, Sa);
        const { data: f } = u.getImageData(0, 0, Sa, Sa);
        r(zE(f));
      } catch {
        r(null);
      }
    }, a.src = s;
  });
}
function zE(s) {
  let t = 0, i = 0, a = 0, r = 0, c = 0, u = 0, f = 0, m = 0;
  for (let D = 0; D < s.length; D += 4) {
    const O = s[D], V = s[D + 1], G = s[D + 2], R = s[D + 3] / 255;
    if (R < 0.5) continue;
    const X = Math.max(O, V, G), P = Math.min(O, V, G);
    if (X < 18 || P > 240) {
      c += O * R, u += V * R, f += G * R, m += R;
      continue;
    }
    const rt = X === 0 ? 0 : (X - P) / X, at = rt * rt * R;
    t += O * at, i += V * at, a += G * at, r += at, c += O * R, u += V * R, f += G * R, m += R;
  }
  let v, g, b;
  if (r > 1e-3)
    v = t / r, g = i / r, b = a / r;
  else if (m > 0)
    v = c / m, g = u / m, b = f / m;
  else
    return null;
  const y = AE(v, g, b), S = y[0], w = TE(y[2], 0.32, 0.66), M = Math.max(y[1], 0.18);
  [v, g, b] = OE(S, M, w);
  const N = Math.round(v), k = Math.round(g), T = Math.round(b);
  return { rgb: `rgb(${N} ${k} ${T})`, r: N, g: k, b: T, h: S, s: M, l: w };
}
function TE(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function AE(s, t, i) {
  s /= 255, t /= 255, i /= 255;
  const a = Math.max(s, t, i), r = Math.min(s, t, i), c = a - r;
  let u = 0;
  c !== 0 && (a === s ? u = (t - i) / c % 6 : a === t ? u = (i - s) / c + 2 : u = (s - t) / c + 4, u *= 60, u < 0 && (u += 360));
  const f = (a + r) / 2, m = c === 0 ? 0 : c / (1 - Math.abs(2 * f - 1));
  return [u, m, f];
}
function OE(s, t, i) {
  const a = (1 - Math.abs(2 * i - 1)) * t, r = (s % 360 + 360) % 360 / 60, c = a * (1 - Math.abs(r % 2 - 1));
  let u = 0, f = 0, m = 0;
  r >= 0 && r < 1 ? [u, f, m] = [a, c, 0] : r < 2 ? [u, f, m] = [c, a, 0] : r < 3 ? [u, f, m] = [0, a, c] : r < 4 ? [u, f, m] = [0, c, a] : r < 5 ? [u, f, m] = [c, 0, a] : [u, f, m] = [a, 0, c];
  const v = i - a / 2;
  return [(u + v) * 255, (f + v) * 255, (m + v) * 255];
}
function K1(s) {
  const [t, i] = j.useState(null);
  return j.useEffect(() => {
    if (!s) {
      i(null);
      return;
    }
    const a = { aborted: !1 };
    return EE(s, a).then((r) => {
      a.aborted || i(r);
    }), () => {
      a.aborted = !0;
    };
  }, [s]), t;
}
function X1(s) {
  if (s)
    return { "--album-tint": s.rgb };
}
const ib = { PREV: 16, NEXT: 32 };
function DE({ entity: s }) {
  const t = jt(), i = s.attributes, a = s.state;
  if (a === "unavailable" || a === "unknown")
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: "Unavailable" })
    ] }) });
  const c = a === "playing", u = i.media_title, f = i.media_artist ?? i.media_album_name ?? i.app_name, m = i.entity_picture, v = !!u, g = K1(m), b = (y) => {
    t("media_player", y, void 0, { entity_id: s.entity_id });
  };
  return v ? /* @__PURE__ */ h.jsx(Nt, { style: X1(g), className: g ? "is-album-tinted" : "", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-np", children: [
    m ? /* @__PURE__ */ h.jsx("img", { className: "simui-art", src: m, alt: "" }) : /* @__PURE__ */ h.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-title", title: u, children: u }),
      f && /* @__PURE__ */ h.jsx("span", { className: "simui-artist", title: f, children: f })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-tp", children: [
      vt(s, ib.PREV) && /* @__PURE__ */ h.jsx("button", { "aria-label": "Previous", onClick: () => b("media_previous_track"), children: /* @__PURE__ */ h.jsx(Xb, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ h.jsx("button", { className: "play", "aria-label": c ? "Pause" : "Play", onClick: () => b("media_play_pause"), children: c ? /* @__PURE__ */ h.jsx(lf, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ h.jsx(js, { size: 15, fill: "currentColor" }) }),
      vt(s, ib.NEXT) && /* @__PURE__ */ h.jsx("button", { "aria-label": "Next", onClick: () => b("media_next_track"), children: /* @__PURE__ */ h.jsx(Zb, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ h.jsxs(Nt, { children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: ot(a) })
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ h.jsx("button", { className: "play", "aria-label": "Play", onClick: () => b("media_play_pause"), children: /* @__PURE__ */ h.jsx(js, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function RE({ values: s, width: t = 116, height: i = 26 }) {
  if (s.length < 2) return null;
  const a = Math.min(...s), c = Math.max(...s) - a || 1, u = t / (s.length - 1), f = s.map((m, v) => `${(v * u).toFixed(1)},${(i - (m - a) / c * i).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ h.jsx(
    "svg",
    {
      className: "simui-spark",
      width: t,
      height: i,
      viewBox: `0 0 ${t} ${i}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ h.jsx(
        "polyline",
        {
          points: f,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      )
    }
  );
}
const gd = /* @__PURE__ */ new Map(), LE = 40;
function BE({ entity: s }) {
  const t = s.attributes, i = t.unit_of_measurement ?? "", a = t.device_class === "temperature", r = s.state === "unavailable" || s.state === "unknown", c = Number(s.state), u = !r && s.state !== "" && !Number.isNaN(c), f = j.useRef(""), [, m] = j.useState(0);
  if (j.useEffect(() => {
    if (!u || f.current === s.state) return;
    f.current = s.state;
    const S = gd.get(s.entity_id) ?? [];
    for (S.push(c); S.length > LE; ) S.shift();
    gd.set(s.entity_id, S), m((w) => w + 1);
  }, [s.entity_id, s.state, u, c]), r)
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        a && /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Aa, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) })
      ] }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: /* @__PURE__ */ h.jsx("span", { className: "simui-big", children: "—" }) })
    ] });
  const v = gd.get(s.entity_id) ?? [], g = v.length > 1 ? c - v[0] : 0, b = u && Math.abs(g) >= 0.05, y = a ? "°" : "";
  return /* @__PURE__ */ h.jsxs(Nt, { children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      a && /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Aa, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: J(s), children: J(s) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      b && /* @__PURE__ */ h.jsxs("span", { className: `simui-delta ${g > 0 ? "up" : "down"}`, children: [
        g > 0 ? "▲" : "▼",
        " ",
        vn(Math.abs(g)),
        y
      ] })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ h.jsxs("span", { className: "simui-big", children: [
        u ? vn(c) : s.state,
        i ? /* @__PURE__ */ h.jsxs("span", { className: "simui-unit", children: [
          " ",
          i
        ] }) : null
      ] }),
      u && v.length > 1 && /* @__PURE__ */ h.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ h.jsx(RE, { values: v, width: 64, height: 22 }) })
    ] })
  ] });
}
const bd = { STOP: 8, RETURN_HOME: 16, START: 8192 }, UE = /* @__PURE__ */ new Set(["cleaning", "returning"]);
function HE({ entity: s }) {
  const t = jt(), i = s.state === "unavailable" || s.state === "unknown", a = UE.has(s.state), r = J(s), c = (u) => {
    t("vacuum", u, {}, { entity_id: s.entity_id });
  };
  return i ? /* @__PURE__ */ h.jsx(Nt, { className: "simui-vacuum is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: ot(s.state) })
  ] }) }) : /* @__PURE__ */ h.jsxs(Nt, { className: `simui-vacuum${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx(Ni, { value: ot(s.state), since: s.last_changed, tone: a ? "on" : "muted" })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-controls", children: [
      vt(s, bd.START) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Start", onClick: () => c("start"), children: /* @__PURE__ */ h.jsx(js, { size: 13, strokeWidth: 2, fill: "currentColor" }) }),
      vt(s, bd.STOP) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => c("stop"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
      vt(s, bd.RETURN_HOME) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Return to base", onClick: () => c("return_to_base"), children: /* @__PURE__ */ h.jsx(mc, { size: 14, strokeWidth: 2 }) })
    ] })
  ] });
}
const qE = {
  "clear-night": BS,
  cloudy: pS,
  exceptional: Yo,
  fog: oS,
  hail: Kh,
  lightning: Hg,
  "lightning-rainy": Hg,
  partlycloudy: Vb,
  pouring: dS,
  rainy: lS,
  snowy: Kh,
  "snowy-rainy": Kh,
  sunny: Vo,
  windy: Yo,
  "windy-variant": Yo
};
function nb(s) {
  return qE[s] ?? Vb;
}
function $E(s) {
  if (!s) return "";
  const t = Date.parse(s);
  return Number.isNaN(t) ? "" : new Date(t).toLocaleDateString(void 0, { weekday: "short" });
}
function QE({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", i = s.attributes, a = i.temperature, r = i.temperature_unit ?? "°", c = s.state, u = nb(c), f = J(s), m = (Array.isArray(i.forecast) ? i.forecast : []).slice(0, 4);
  return t ? /* @__PURE__ */ h.jsx(Nt, { className: "simui-weather is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: f, children: f }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: ot(s.state) })
  ] }) }) : /* @__PURE__ */ h.jsxs(Nt, { className: "simui-weather", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-wx-head", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-wx-ic", children: /* @__PURE__ */ h.jsx(u, { size: 26, strokeWidth: 1.75 }) }),
      /* @__PURE__ */ h.jsxs("div", { className: "simui-wx-now", children: [
        /* @__PURE__ */ h.jsxs("span", { className: "simui-wx-temp", children: [
          a != null ? vn(a) : "—",
          /* @__PURE__ */ h.jsx("span", { className: "simui-unit", children: r })
        ] }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-wx-cond", title: f, children: ot(c) })
      ] })
    ] }),
    m.length > 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-wx-fc", children: m.map((v, g) => {
      const b = nb(v.condition ?? "");
      return /* @__PURE__ */ h.jsxs("div", { className: "simui-wx-fcd", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-wx-fcl", children: $E(v.datetime) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-wx-fci", children: /* @__PURE__ */ h.jsx(b, { size: 14, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ h.jsxs("span", { className: "simui-wx-fct", children: [
          v.temperature != null ? vn(v.temperature) : "—",
          "°"
        ] })
      ] }, v.datetime ?? g);
    }) })
  ] });
}
const VE = [
  { bit: 1, mode: "armed_home" },
  { bit: 2, mode: "armed_away" },
  { bit: 4, mode: "armed_night" },
  { bit: 8, mode: "armed_custom_bypass" },
  { bit: 32, mode: "armed_vacation" }
], YE = "triggered", GE = /* @__PURE__ */ new Set(["arming", "pending", "disarming"]);
function KE({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", i = J(s);
  if (t)
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(tc, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: i, children: i })
      ] }),
      /* @__PURE__ */ h.jsx(Ni, { value: "Unavailable", tone: "muted" })
    ] });
  const a = s.state, r = a.startsWith("armed"), c = a === YE, u = GE.has(a), f = s.attributes.supported_features ?? 0, m = ["disarmed", ...VE.filter((w) => (f & w.bit) === w.bit).map((w) => w.mode)], v = m.length > 1 ? [{ type: "alarm-modes", modes: m }] : [], g = c ? Kb : r ? vc : tc, b = c ? " amber" : r ? " cool" : "", y = c ? "warn" : r ? "on" : "muted", S = c ? "is-unlocked" : r ? "is-on" : "";
  return /* @__PURE__ */ h.jsxs(Nt, { className: S, children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${b}`, children: /* @__PURE__ */ h.jsx(g, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: i, children: i })
    ] }),
    /* @__PURE__ */ h.jsx(
      Ni,
      {
        value: u ? ot(a) : r ? ot(a).replace(/^Armed /, "") : c ? "Triggered" : "Disarmed",
        since: s.last_changed,
        tone: y
      }
    ),
    /* @__PURE__ */ h.jsx(ts, { entity: s, features: v })
  ] });
}
function sb({ entity: s }) {
  const t = jt(), i = st(s.entity_id), a = s.state === "unavailable" || s.state === "unknown", r = J(s), c = s.attributes, u = c.min ?? 0, f = c.max ?? 100, m = c.step ?? 1, v = c.unit_of_measurement ?? "", g = c.mode ?? "auto", b = Number(s.state), y = Number.isFinite(b) ? b : u;
  if (a)
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable simui-input", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: "Unavailable" })
    ] }) });
  const S = (D) => {
    t(i, "set_value", { value: qi(D, u, f) }, { entity_id: s.entity_id });
  }, w = (D) => S(Math.round((y + D) / m) * m), M = f - u, N = g !== "box" && M > 0 && M / m <= 1e3, k = M > 0 ? qi((y - u) / M * 100, 0, 100) : 0, T = {
    background: `linear-gradient(to right, var(--accent) ${k}%, var(--faint) ${k}%)`
  };
  return /* @__PURE__ */ h.jsxs(Nt, { className: "simui-input", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsxs("span", { className: "simui-value simui-input-value", children: [
        vn(y),
        v && /* @__PURE__ */ h.jsxs("span", { className: "simui-unit", children: [
          " ",
          v
        ] })
      ] })
    ] }),
    N ? /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: u,
        max: f,
        step: m,
        value: y,
        "aria-label": r,
        style: T,
        onClick: (D) => D.stopPropagation(),
        onChange: (D) => S(Number(D.target.value))
      }
    ) : /* @__PURE__ */ h.jsxs("div", { className: "simui-step simui-input-step", children: [
      /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Decrease", disabled: y <= u, onClick: () => w(-m), children: /* @__PURE__ */ h.jsx(pc, { size: 14, strokeWidth: 2.5 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-target", children: vn(y) }),
      /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Increase", disabled: y >= f, onClick: () => w(m), children: /* @__PURE__ */ h.jsx(As, { size: 14, strokeWidth: 2.5 }) })
    ] })
  ] });
}
function ab({ entity: s }) {
  const t = Ha(), i = s.state === "unavailable" || s.state === "unknown", a = J(s);
  if (i)
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(Cd, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a })
      ] }),
      /* @__PURE__ */ h.jsx(Ni, { value: "Unavailable", tone: "muted" })
    ] });
  const r = s.state === "home", c = s.state === "not_home", u = r ? "Home" : c ? "Away" : ot(s.state), f = r ? wM : c ? SM : Cd, m = r ? " cool" : c ? "" : " amber";
  return /* @__PURE__ */ h.jsxs(Nt, { onClick: () => t({ action: "more-info" }, s.entity_id), className: r ? "is-on" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${m}`, children: /* @__PURE__ */ h.jsx(f, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a })
    ] }),
    /* @__PURE__ */ h.jsx(Ni, { value: u, since: s.last_changed, tone: r ? "on" : c ? "muted" : "warn" })
  ] });
}
function lb({ entity: s }) {
  const t = jt(), i = st(s.entity_id), a = s.state === "unavailable" || s.state === "unknown", r = J(s), c = s.attributes.options ?? [], u = s.state;
  if (a || c.length === 0)
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable simui-input", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: a ? "Unavailable" : ot(u) })
    ] }) });
  const f = (v) => {
    t(i, "select_option", { option: v }, { entity_id: s.entity_id });
  }, m = c.length <= 4 && c.every((v) => v.length <= 12);
  return /* @__PURE__ */ h.jsxs(Nt, { className: "simui-input", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: r, children: r }),
      !m && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: ot(u) })
      ] })
    ] }),
    m ? /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-input-seg", role: "group", "aria-label": r, children: c.map((v) => {
      const g = v === u;
      return /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-segbtn${g ? " is-active" : ""}`,
          "aria-pressed": g,
          title: ot(v),
          onClick: () => f(v),
          children: ot(v)
        },
        v
      );
    }) }) : /* @__PURE__ */ h.jsx("div", { className: "simui-feats", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-fsel-wrap simui-input-fsel", children: [
      /* @__PURE__ */ h.jsx(
        "select",
        {
          className: "simui-fsel",
          "aria-label": r,
          value: u,
          onChange: (v) => f(v.target.value),
          children: c.map((v) => /* @__PURE__ */ h.jsx("option", { value: v, children: ot(v) }, v))
        }
      ),
      /* @__PURE__ */ h.jsx(Qi, { className: "simui-fsel-caret", size: 13, strokeWidth: 2 })
    ] }) })
  ] });
}
const qo = { OPEN: 1, CLOSE: 2, STOP: 4, SET_POSITION: 8 };
function XE({ entity: s }) {
  const t = jt(), i = s.state === "unavailable" || s.state === "unknown", a = J(s);
  if (i)
    return /* @__PURE__ */ h.jsx(Nt, { className: "is-unavailable", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: "Unavailable" })
    ] }) });
  const r = s.attributes.current_position, c = s.state === "open" || r != null && r > 0, u = vt(s, qo.SET_POSITION) && r != null, f = (v, g) => {
    t("valve", v, g, { entity_id: s.entity_id });
  }, m = u ? { background: `linear-gradient(to right, var(--accent) ${r}%, var(--faint) ${r}%)` } : void 0;
  return /* @__PURE__ */ h.jsxs(Nt, { className: c ? "is-on" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-value", children: r != null ? `${r}%` : ot(s.state) })
    ] }),
    u ? /* @__PURE__ */ h.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: r,
        "aria-label": "Position",
        style: m,
        onChange: (v) => f("set_valve_position", { position: Number(v.target.value) })
      }
    ) : /* @__PURE__ */ h.jsxs("div", { className: "simui-controls", children: [
      vt(s, qo.OPEN) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => f("open_valve"), children: /* @__PURE__ */ h.jsx(za, { size: 15, strokeWidth: 2 }) }),
      vt(s, qo.STOP) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => f("stop_valve"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
      vt(s, qo.CLOSE) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => f("close_valve"), children: /* @__PURE__ */ h.jsx(Qi, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const rb = { TARGET_TEMPERATURE: 1 }, ZE = /* @__PURE__ */ new Set(["eco", "electric", "gas", "heat_pump", "high_demand", "performance", "on"]);
function WE({ entity: s }) {
  const t = jt(), i = s.state === "unavailable" || s.state === "unknown", a = J(s);
  if (i)
    return /* @__PURE__ */ h.jsxs(Nt, { className: "is-unavailable", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ h.jsx(qg, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a })
      ] }),
      /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ h.jsxs("span", { className: "simui-big", children: [
          "—",
          /* @__PURE__ */ h.jsx("span", { className: "simui-unit", children: "°" })
        ] }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: "Unavailable" })
      ] })
    ] });
  const r = s.attributes, c = r.current_temperature, u = r.temperature, f = r.target_temp_step ?? 1, m = r.min_temp ?? 30, v = r.max_temp ?? 80, g = r.operation_list ?? [], b = s.state, y = IE(r) && u != null, S = ZE.has(b), w = (N) => {
    if (u == null) return;
    const k = qi(Math.round((u + N) / f) * f, m, v);
    t("water_heater", "set_temperature", { temperature: k }, { entity_id: s.entity_id });
  }, M = (N) => {
    t("water_heater", "set_operation_mode", { operation_mode: N }, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ h.jsxs(Nt, { className: S ? "is-on" : "", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsx("span", { className: `simui-ic${S ? " warm" : ""}`, children: S ? /* @__PURE__ */ h.jsx(af, { size: 16, strokeWidth: 2 }) : /* @__PURE__ */ h.jsx(qg, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: a, children: a })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ h.jsxs("span", { className: "simui-big", children: [
        c != null ? Math.round(c) : "—",
        /* @__PURE__ */ h.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      y && /* @__PURE__ */ h.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => w(-f), children: /* @__PURE__ */ h.jsx(pc, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ h.jsxs("span", { className: "simui-target", children: [
          FE(u),
          "°"
        ] }),
        /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => w(f), children: /* @__PURE__ */ h.jsx(As, { size: 14, strokeWidth: 2.5 }) })
      ] })
    ] }),
    g.length > 1 && /* @__PURE__ */ h.jsx("div", { className: "simui-feats", children: /* @__PURE__ */ h.jsxs("div", { className: "simui-fsel-wrap", children: [
      /* @__PURE__ */ h.jsx(
        "select",
        {
          className: "simui-fsel",
          "aria-label": "Operation mode",
          value: b,
          onChange: (N) => M(N.target.value),
          children: g.map((N) => /* @__PURE__ */ h.jsx("option", { value: N, children: ot(N) }, N))
        }
      ),
      /* @__PURE__ */ h.jsx(Qi, { className: "simui-fsel-caret", size: 13, strokeWidth: 2 })
    ] }) })
  ] });
}
function IE(s) {
  const t = s.supported_features;
  return t != null && (t & rb.TARGET_TEMPERATURE) === rb.TARGET_TEMPERATURE;
}
function FE(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const JE = {
  light: CE,
  sensor: BE,
  climate: wE,
  media_player: DE,
  cover: _E,
  lock: kE,
  camera: bE,
  weather: QE,
  fan: ME,
  vacuum: HE,
  scene: Uo,
  script: Uo,
  button: Uo,
  input_button: Uo,
  valve: XE,
  person: ab,
  device_tracker: ab,
  water_heater: WE,
  alarm_control_panel: KE,
  number: sb,
  input_number: sb,
  select: lb,
  input_select: lb
};
function Z1(s) {
  return JE[s] ?? jE;
}
function PE({ block: s }) {
  const t = s.entityIds[0], i = Ee(t), a = Z1(st(t));
  return i ? /* @__PURE__ */ h.jsx(a, { entity: i }) : /* @__PURE__ */ h.jsxs("div", { className: "simui-tile", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-row", children: /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: t, children: t }) }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-state", children: "Unavailable" })
  ] });
}
class Pl extends j.Component {
  constructor() {
    super(...arguments);
    ws(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  // The boundary IS the handling — swallow rather than spew console noise.
  componentDidCatch(i, a) {
  }
  componentDidUpdate(i) {
    this.state.failed && (i.children !== this.props.children || i.resetKey !== this.props.resetKey) && this.setState({ failed: !1 });
  }
  render() {
    return this.state.failed ? this.props.fallback !== void 0 ? this.props.fallback : this.props.compact ? /* @__PURE__ */ h.jsx("div", { className: "simui-eb-compact", role: "status", children: this.props.label ? `${this.props.label} unavailable` : "Unavailable" }) : /* @__PURE__ */ h.jsxs("div", { className: "simui-eb-full", role: "alert", children: [
      /* @__PURE__ */ h.jsx("div", { className: "simui-eb-title", children: "Something went wrong" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-eb-body", children: "A part of the panel failed to render. Navigate away and back, or reload to recover." })
    ] }) : this.props.children;
  }
}
function tz({ block: s }) {
  return s.chart ? /* @__PURE__ */ h.jsx("div", { className: "simui-surface card", children: /* @__PURE__ */ h.jsx(Pl, { fallback: /* @__PURE__ */ h.jsx("div", { className: "simui-chart-fallback", children: "Chart unavailable" }), children: /* @__PURE__ */ h.jsx(H1, { spec: s.chart }) }) }) : null;
}
const W1 = (s) => s === 2 ? " span-2" : s === "full" ? " span-full" : "", ez = (s) => s === 2 ? "2×" : s === "full" ? "Full" : "1×";
function gf({ block: s }) {
  switch (s.type) {
    case "hero":
      return /* @__PURE__ */ h.jsx(JN, { block: s });
    case "group":
      return /* @__PURE__ */ h.jsx(eE, { block: s });
    case "list":
      return /* @__PURE__ */ h.jsx(fE, { block: s });
    case "chart":
      return /* @__PURE__ */ h.jsx(tz, { block: s });
    case "card":
      return /* @__PURE__ */ h.jsx(PE, { block: s });
    case "attention":
      return /* @__PURE__ */ h.jsx(ON, { entities: s.entityIds });
    default:
      return null;
  }
}
function I1({ block: s }) {
  return Qe((i) => {
    const a = s.visibleWhen;
    if (!a) return !0;
    const r = i[a.entity];
    return F1(a, r?.state, Number(r?.state));
  }) ? /* @__PURE__ */ h.jsx("div", { className: `simui-block${W1(s.span)}`, children: /* @__PURE__ */ h.jsx(gf, { block: s }) }) : null;
}
function F1(s, t, i) {
  if (s.state != null) {
    const a = Array.isArray(s.state) ? s.state : [s.state];
    if (t == null || !a.includes(t)) return !1;
  }
  return !(s.above != null && !(i > s.above) || s.below != null && !(i < s.below));
}
function bf({ block: s, editing: t }) {
  const { removeBlock: i, cycleBlockSpan: a } = Ts(), r = Qe((y) => {
    const S = s.visibleWhen;
    if (!S) return !0;
    const w = y[S.entity];
    return F1(S, w?.state, Number(w?.state));
  }), { attributes: c, listeners: u, setNodeRef: f, transform: m, transition: v, isDragging: g } = e_({
    id: s.id,
    disabled: !t
  });
  if (!r && !t) return null;
  const b = {
    transform: Xl.Transform.toString(m),
    transition: v,
    zIndex: g ? 20 : void 0
  };
  return /* @__PURE__ */ h.jsxs(
    "div",
    {
      ref: f,
      style: b,
      className: `simui-block${W1(s.span)}${t ? " editing" : ""}${g ? " dragging" : ""}`,
      children: [
        /* @__PURE__ */ h.jsx(gf, { block: s }),
        t && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx("div", { className: "simui-card-grab", ...c, ...u, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ h.jsx("button", { className: "simui-card-btn size", onPointerDown: (y) => y.stopPropagation(), onClick: () => a(s.id), "aria-label": "Cycle width", children: ez(s.span) }),
          /* @__PURE__ */ h.jsx("button", { className: "simui-card-btn x", onPointerDown: (y) => y.stopPropagation(), onClick: () => i(s.id), "aria-label": "Remove block", children: "×" })
        ] })
      ]
    }
  );
}
function J1({ existing: s, onAdd: t, onClose: i }) {
  const a = ef(), [r, c] = j.useState(""), u = new Set(s), f = r.toLowerCase(), m = Object.values(a).filter((v) => !u.has(v.entity_id)).filter((v) => J(v).toLowerCase().includes(f) || v.entity_id.includes(f)).sort((v, g) => J(v).localeCompare(J(g))).slice(0, 200);
  return /* @__PURE__ */ h.jsx("div", { className: "simui-modal", onClick: i, children: /* @__PURE__ */ h.jsxs("div", { className: "simui-modal-card", onClick: (v) => v.stopPropagation(), children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ h.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: r,
          onChange: (v) => c(v.target.value)
        }
      ),
      /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: i, "aria-label": "Close", children: /* @__PURE__ */ h.jsx(of, { size: 16 }) })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-modal-list", children: [
      m.map((v) => /* @__PURE__ */ h.jsxs("div", { className: "simui-add-row", onClick: () => t(v.entity_id), children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-name", title: v.entity_id, children: J(v) }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-add-dom", children: st(v.entity_id) })
      ] }, v.entity_id)),
      m.length === 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function iz(s, t) {
  return t === "above_horizon" ? s < 8 ? "dawn" : s >= 18 ? "dusk" : "day" : t === "below_horizon" ? s >= 5 && s < 8 ? "dawn" : s >= 18 && s < 21 ? "dusk" : "night" : s < 5 ? "night" : s < 8 ? "dawn" : s < 18 ? "day" : s < 21 ? "dusk" : "night";
}
const nz = {
  dawn: { hue: "var(--pink)", base: 0.55 },
  // rose first light
  day: { hue: "var(--warm)", base: 0.42 },
  // warm, low — daylight carries the room
  dusk: { hue: "var(--violet)", base: 0.62 },
  // violet wind-down
  night: { hue: "var(--slate)", base: 0.34 }
  // deep, cool, quiet
};
function sz(s, t) {
  const i = t && t.length ? t.filter((m) => m.startsWith("light.")) : Object.keys(s).filter((m) => m.startsWith("light."));
  let a = 0;
  if (i.length) {
    const m = i.reduce((v, g) => v + (s[g]?.state === "on" ? 1 : 0), 0);
    a = Math.round(m / i.length * 10);
  }
  let r = 0;
  for (const m in s)
    if (m.charCodeAt(0) === 99 && m.startsWith("climate.") && s[m]?.attributes?.hvac_action === "cooling") {
      r = 1;
      break;
    }
  const c = s["sun.sun"]?.state ?? "", u = iz((/* @__PURE__ */ new Date()).getHours(), String(c));
  return (u === "night" ? 0 : u === "dawn" ? 1 : u === "day" ? 2 : 3) * 100 + r * 20 + a;
}
function az(s) {
  const t = Math.floor(s / 100), i = t === 0 ? "night" : t === 1 ? "dawn" : t === 2 ? "day" : "dusk", a = Math.floor(s % 100 / 20) === 1, r = s % 20;
  return { phase: i, cooling: a, warm: r };
}
function P1({
  mode: s = "field",
  lightIds: t,
  maxOpacity: i,
  className: a
}) {
  const r = Qe((M) => sz(M, t)), { phase: c, cooling: u, warm: f } = j.useMemo(() => az(r), [r]), m = nz[c], v = f / 10, g = i ?? (s === "dots" ? 0.16 : 0.2), b = g * 0.3, y = Math.min(g, b + v * (g - b) * m.base * 1.6 + m.base * (g - b) * 0.5), S = Math.min(g, b + v * (g - b) * 1.2 + m.base * (g - b) * 0.4), w = {
    "--amb-phase": m.hue,
    // Warm bloom strength: present once any light is on, scaled by the fraction.
    "--amb-warm": v.toFixed(2),
    // Cool wash: only ignites while a climate entity is actively cooling.
    "--amb-cool": u ? "1" : "0",
    "--amb-opacity": (s === "dots" ? S : y).toFixed(3)
  };
  return /* @__PURE__ */ h.jsx(
    "div",
    {
      className: `simui-ambient-canvas is-${s}${a ? ` ${a}` : ""}`,
      "data-phase": c,
      "aria-hidden": "true",
      style: w
    }
  );
}
function lz() {
  const s = (/* @__PURE__ */ new Date()).getHours();
  return s < 5 ? "Good night" : s < 12 ? "Good morning" : s < 18 ? "Good afternoon" : "Good evening";
}
function rz() {
  const { config: s, openRoom: t, editing: i, setEditing: a, reorderBlocks: r, addCard: c, createHomeOverride: u, resetHomeOverride: f } = Ts(), m = ef(), v = dc(), [g, b] = j.useState(!1), y = Xd(Kd(nr, { activationConstraint: { distance: 5 } })), S = j.useMemo(() => Object.keys(m).sort().join(","), [m]), w = j.useMemo(() => t1({ states: m }), [S, v]), M = s ? s.rooms.map((R) => R.id).join(",") : "", N = j.useMemo(
    () => s ? s.rooms.flatMap((R) => R.blocks.flatMap((X) => X.entityIds)).filter((R) => R.startsWith("light.")) : [],
    [M]
    // eslint-disable-line react-hooks/exhaustive-deps
  ), k = s?.overrides?.home, T = k ? k.blocks : w.blocks, D = T.map((R) => R.id), O = () => {
    if (i) {
      a(!1);
      return;
    }
    k || u(w.blocks), a(!0);
  }, V = () => {
    f(), a(!1);
  }, G = (R) => {
    const { active: X, over: P } = R;
    if (!P || X.id === P.id) return;
    const rt = D.indexOf(String(X.id)), at = D.indexOf(String(P.id));
    rt >= 0 && at >= 0 && r(rt, at);
  };
  return s ? /* @__PURE__ */ h.jsxs("div", { className: "simui-app simui-home", children: [
    /* @__PURE__ */ h.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-head-title", children: lz() }),
      /* @__PURE__ */ h.jsx(oz, { config: s }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      i && k && /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: V, "aria-label": "Reset home", children: /* @__PURE__ */ h.jsx(Gb, { size: 15 }) }),
      i && /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: () => b(!0), "aria-label": "Add card", children: /* @__PURE__ */ h.jsx(As, { size: 16 }) }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-iconbtn-h${i ? " active" : ""}`,
          onClick: O,
          "aria-label": i ? "Done editing" : "Edit home",
          children: i ? /* @__PURE__ */ h.jsx(sf, { size: 16 }) : /* @__PURE__ */ h.jsx(rf, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-content simui-home-content", children: [
      /* @__PURE__ */ h.jsx(P1, { lightIds: N }),
      /* @__PURE__ */ h.jsxs("div", { className: "simui-home-layer", children: [
        w.statusStrip && w.statusStrip.length > 0 && /* @__PURE__ */ h.jsx(u1, { pills: w.statusStrip }),
        T.length > 0 && (k ? /* @__PURE__ */ h.jsx(Jd, { sensors: y, collisionDetection: Zd, onDragEnd: G, children: /* @__PURE__ */ h.jsx(tf, { items: D, strategy: sr, children: /* @__PURE__ */ h.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((R) => /* @__PURE__ */ h.jsx(bf, { block: R, editing: i }, R.id)) }) }) }) : /* @__PURE__ */ h.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((R) => /* @__PURE__ */ h.jsx(I1, { block: R }, R.id)) })),
        /* @__PURE__ */ h.jsx("div", { className: "simui-rooms-head", children: "Rooms" }),
        /* @__PURE__ */ h.jsx("div", { className: "simui-home-grid", children: s.rooms.map((R) => /* @__PURE__ */ h.jsx(RM, { room: R, onOpen: () => t(R.id) }, R.id)) })
      ] })
    ] }),
    g && /* @__PURE__ */ h.jsx(
      J1,
      {
        existing: T.flatMap((R) => R.entityIds),
        onAdd: c,
        onClose: () => b(!1)
      }
    )
  ] }) : null;
}
function oz({ config: s }) {
  const t = Qe((i) => {
    const r = s.rooms.flatMap((u) => u.blocks.flatMap((f) => f.entityIds)).filter((u) => u.startsWith("light.")).filter((u) => i[u]?.state === "on").length, c = s.rooms.length;
    return `${c} ${c === 1 ? "room" : "rooms"}${r ? ` · ${r} lights on` : ""}`;
  });
  return /* @__PURE__ */ h.jsx("span", { className: "simui-head-glance num", children: t });
}
function cz({ room: s }) {
  const { editing: t, setEditing: i, reorderBlocks: a, addCard: r, goHome: c } = Ts(), [u, f] = j.useState(!1), m = Xd(Kd(nr, { activationConstraint: { distance: 5 } })), v = s.blocks.map((y) => y.id), g = j.useMemo(() => Jb(s), [s]), b = (y) => {
    const { active: S, over: w } = y;
    if (!w || S.id === w.id) return;
    const M = v.indexOf(String(S.id)), N = v.indexOf(String(w.id));
    M >= 0 && N >= 0 && a(M, N);
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ h.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ h.jsx("button", { className: "simui-back", onClick: c, "aria-label": "Back to home", children: /* @__PURE__ */ h.jsx($b, { size: 18 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-head-title", children: s.name }),
      /* @__PURE__ */ h.jsx(uz, { room: s, lightIds: g }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      t && /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: () => f(!0), "aria-label": "Add card", children: /* @__PURE__ */ h.jsx(As, { size: 16 }) }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-iconbtn-h${t ? " active" : ""}`,
          onClick: () => i(!t),
          "aria-label": t ? "Done editing" : "Edit room",
          children: t ? /* @__PURE__ */ h.jsx(sf, { size: 16 }) : /* @__PURE__ */ h.jsx(rf, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-content simui-room", children: [
      /* @__PURE__ */ h.jsx(hz, { lightIds: g }),
      /* @__PURE__ */ h.jsx(Jd, { sensors: m, collisionDetection: Zd, onDragEnd: b, children: /* @__PURE__ */ h.jsx(tf, { items: v, strategy: sr, children: /* @__PURE__ */ h.jsx("div", { className: "simui-grid", children: s.blocks.map((y) => /* @__PURE__ */ h.jsx(bf, { block: y, editing: t }, y.id)) }) }) })
    ] }),
    u && /* @__PURE__ */ h.jsx(
      J1,
      {
        existing: s.blocks.flatMap((y) => y.entityIds),
        onAdd: r,
        onClose: () => f(!1)
      }
    )
  ] });
}
function uz({ room: s, lightIds: t }) {
  const i = Qe((a) => Fb(s, t, a));
  return i ? /* @__PURE__ */ h.jsx("span", { className: "simui-head-glance num", children: i }) : null;
}
function hz({ lightIds: s }) {
  const i = 0.04 + Qe((a) => {
    if (!s.length) return 0;
    const r = s.filter((c) => a[c]?.state === "on").length;
    return Math.round(r / s.length * 10) / 10;
  }) * 0.13;
  return /* @__PURE__ */ h.jsx("div", { className: "simui-ambient", style: { "--amb": String(i) } });
}
function dz({
  kinds: s,
  preview: t,
  onPick: i,
  onBeginPlace: a,
  query: r,
  onQueryChange: c,
  onClose: u
}) {
  const [f, m] = j.useState(""), v = r ?? f, g = c ?? m, b = j.useId(), y = v.trim().toLowerCase(), S = j.useMemo(() => y ? s.filter(
    (w) => w.label.toLowerCase().includes(y) || w.description.toLowerCase().includes(y) || w.id.toLowerCase().includes(y) || w.type.toLowerCase().includes(y)
  ) : s, [s, y]);
  return Gn.createPortal(
    /* @__PURE__ */ h.jsx("div", { className: "simui-root simui-gallery-backdrop", onClick: u, children: /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: "simui-gallery",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": b,
        onClick: (w) => w.stopPropagation(),
        children: [
          /* @__PURE__ */ h.jsxs("header", { className: "simui-gallery-head", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "simui-gallery-search", children: [
              /* @__PURE__ */ h.jsx(IS, { size: 15, className: "simui-gallery-search-ic", "aria-hidden": !0 }),
              /* @__PURE__ */ h.jsx(
                "input",
                {
                  autoFocus: !0,
                  className: "simui-gallery-input",
                  placeholder: "Add a card — search Group, Chart, Live list…",
                  value: v,
                  onChange: (w) => g(w.target.value),
                  "aria-label": "Search card types"
                }
              )
            ] }),
            /* @__PURE__ */ h.jsx("span", { id: b, className: "simui-gallery-title-sr", children: "Add a card" }),
            /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: u, "aria-label": "Close gallery", children: /* @__PURE__ */ h.jsx(of, { size: 16 }) })
          ] }),
          /* @__PURE__ */ h.jsxs("div", { className: "simui-gallery-grid", role: "list", children: [
            S.map((w) => /* @__PURE__ */ h.jsx(
              fz,
              {
                kind: w,
                preview: t,
                onPick: i,
                onBeginPlace: a
              },
              w.id
            )),
            S.length === 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-gallery-empty", children: s.length === 0 ? "No card types available for this surface." : `No card types match “${v}”.` })
          ] })
        ]
      }
    ) }),
    document.body
  );
}
function fz({
  kind: s,
  preview: t,
  onPick: i,
  onBeginPlace: a
}) {
  const r = j.useMemo(
    () => s.make(mz(s, t)),
    // `preview` identity is stable for the gallery's lifetime (built once by the
    // host from useAllStates); resampling only on a new kind is intentional.
    [s, t]
  ), c = (r.entityIds?.length ?? 0) > 0, u = !!a, f = (m) => {
    a?.(s);
    try {
      m.dataTransfer.setData("application/x-simui-card", s.id), m.dataTransfer.effectAllowed = "copy";
    } catch {
    }
  };
  return /* @__PURE__ */ h.jsxs(
    "button",
    {
      type: "button",
      role: "listitem",
      className: "simui-gallery-card",
      draggable: u,
      onDragStart: u ? f : void 0,
      onClick: () => i(s),
      "aria-label": `Add ${s.label} — ${s.description}`,
      children: [
        /* @__PURE__ */ h.jsx("div", { className: "simui-gallery-preview", "aria-hidden": !0, children: /* @__PURE__ */ h.jsx("div", { className: "simui-gallery-preview-scale", children: c ? /* @__PURE__ */ h.jsx(Pl, { fallback: /* @__PURE__ */ h.jsx(ob, { kind: s }), children: /* @__PURE__ */ h.jsx(gf, { block: r }) }) : /* @__PURE__ */ h.jsx(ob, { kind: s, empty: !0 }) }) }),
        /* @__PURE__ */ h.jsxs("div", { className: "simui-gallery-meta", children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-gallery-card-ic", "aria-hidden": !0, children: Fn(s.icon, 14) }),
          /* @__PURE__ */ h.jsx("span", { className: "simui-gallery-card-label", children: s.label }),
          /* @__PURE__ */ h.jsx("span", { className: "simui-gallery-card-desc", children: s.description })
        ] })
      ]
    }
  );
}
function ob({ kind: s, empty: t }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-gallery-preview-stub", children: [
    /* @__PURE__ */ h.jsx("span", { className: "simui-gallery-stub-ic", children: Fn(s.icon, 22) }),
    /* @__PURE__ */ h.jsx("span", { className: "simui-gallery-stub-label", children: t ? "Add entities after dropping" : s.label })
  ] });
}
function mz(s, t) {
  const i = pz(s.type), a = s.domains, r = t.sample(i, a);
  return r.length > 0 ? r : a ? t.sample(i) : r;
}
function pz(s) {
  switch (s) {
    case "chart":
    case "hero":
    case "card":
      return 1;
    case "list":
    case "group":
    case "attention":
      return 3;
    default:
      return 3;
  }
}
function vz(s) {
  return s === "card" || s === "hero" || s === "chart" ? 1 : 3;
}
function gz(s, t) {
  const i = vz(s.type), a = t.sample(i, s.domains);
  return a.length ? a : t.sample(i);
}
const bz = [
  {
    id: "group",
    type: "group",
    label: "Group",
    icon: "group",
    defaultSpan: "full",
    description: "A surface of related controls.",
    make: (s) => ({ id: Hi(), type: "group", title: "Group", entityIds: s, span: "full", axis: "none" })
  },
  {
    id: "list",
    type: "list",
    label: "List",
    icon: "list",
    defaultSpan: "full",
    description: "A hairline-divided list of entities.",
    make: (s) => ({ id: Hi(), type: "list", title: "List", entityIds: s, span: "full" })
  },
  {
    id: "chart",
    type: "chart",
    label: "History chart",
    icon: "activity",
    defaultSpan: "full",
    domains: ["sensor"],
    description: "A TradingView-grade history graph.",
    make: (s) => ({
      id: Hi(),
      type: "chart",
      span: "full",
      entityIds: s.slice(0, 1),
      chart: s[0] ? {
        window: { value: 24, unit: "h" },
        header: { showCurrent: !0, colorize: !0 },
        axes: [{ id: "left" }],
        series: [{ entity: s[0], fill: "area", axisId: "left" }]
      } : void 0
    })
  },
  {
    id: "hero",
    type: "hero",
    label: "Hero",
    icon: "thermometer",
    defaultSpan: 2,
    domains: ["climate"],
    description: "A big headline readout.",
    make: (s) => ({ id: Hi(), type: "hero", entityIds: s.slice(0, 1), span: 2 })
  },
  {
    id: "card",
    type: "card",
    label: "Card",
    icon: "box",
    defaultSpan: 1,
    description: "A single entity tile.",
    make: (s) => ({ id: Hi(), type: "card", entityIds: s.slice(0, 1), span: 1 })
  }
], xz = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function yz(s) {
  const t = Object.keys(s).sort();
  return {
    states: s,
    sample: (a, r) => {
      const c = [];
      for (const u of t) {
        if (r && !r.includes(st(u))) continue;
        const f = s[u];
        if (!(!f || xz.has(f.state)) && (c.push(u), c.length >= a))
          break;
      }
      return c;
    },
    resolve: (a) => s[a]
  };
}
const wz = /* @__PURE__ */ new Set(["lights", "climate"]), _z = {
  lights: "lights",
  climate: "climate",
  sensors: "sensors",
  power: "power",
  security: "security",
  server: "server"
}, Sz = {
  lights: "Lights",
  climate: "Climate",
  media: "Media",
  security: "Security",
  sensors: "Sensors",
  power: "Power",
  scenes: "Scenes",
  server: "System"
};
function Mz({ categoryId: s }) {
  const t = ef(), i = dc(), a = u_(), { config: r, goHome: c, editing: u, setEditing: f, reorderBlocks: m, addBlock: v, createOverride: g, resetOverride: b } = Ts(), [y, S] = j.useState(!1), w = Xd(Kd(nr, { activationConstraint: { distance: 5 } })), M = j.useMemo(() => Object.keys(t).sort().join(","), [t]), N = j.useMemo(() => {
    const F = _z[s], gt = F ? GN(F) : void 0;
    return gt ? gt.build({ states: t, areas: i, registry: a }) : Nz(s, t);
  }, [s, M, i, a]), k = r?.overrides?.[`category:${s}`], T = k ? k.blocks : N.blocks, D = T.map((F) => F.id), O = j.useMemo(() => yz(t), [M]), V = (F) => {
    v(F.make(gz(F, O))), S(!1);
  }, G = Sz[s] ?? s, R = wz.has(s), X = j.useMemo(
    () => R ? T.flatMap((F) => F.entityIds).filter((F) => F.startsWith("light.")) : [],
    [R, T]
  ), P = (F) => {
    const { active: gt, over: xt } = F;
    if (!xt || gt.id === xt.id) return;
    const Ot = D.indexOf(String(gt.id)), L = D.indexOf(String(xt.id));
    Ot >= 0 && L >= 0 && m(Ot, L);
  }, rt = () => {
    if (u) {
      f(!1);
      return;
    }
    k || g(s, N.blocks), f(!0);
  }, at = () => {
    b(s), f(!1);
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ h.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ h.jsx("button", { className: "simui-back", onClick: c, "aria-label": "Back to home", children: /* @__PURE__ */ h.jsx($b, { size: 18 }) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-head-title", children: G }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-spacer" }),
      u && k && /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: at, "aria-label": "Reset to preset", children: /* @__PURE__ */ h.jsx(Gb, { size: 15 }) }),
      u && /* @__PURE__ */ h.jsx("button", { className: "simui-iconbtn-h", onClick: () => S(!0), "aria-label": "Add card", children: /* @__PURE__ */ h.jsx(As, { size: 16 }) }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-iconbtn-h${u ? " active" : ""}`,
          onClick: rt,
          "aria-label": u ? "Done editing" : "Edit surface",
          children: u ? /* @__PURE__ */ h.jsx(sf, { size: 16 }) : /* @__PURE__ */ h.jsx(rf, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: `simui-content${R ? " simui-cat-content" : ""}`, children: [
      R && /* @__PURE__ */ h.jsx(P1, { mode: "field", lightIds: X, maxOpacity: 0.12 }),
      /* @__PURE__ */ h.jsxs("div", { className: R ? "simui-cat-layer" : void 0, children: [
        N.statusStrip && N.statusStrip.length > 0 && /* @__PURE__ */ h.jsx(u1, { pills: N.statusStrip }),
        T.length ? k ? /* @__PURE__ */ h.jsx(Jd, { sensors: w, collisionDetection: Zd, onDragEnd: P, children: /* @__PURE__ */ h.jsx(tf, { items: D, strategy: sr, children: /* @__PURE__ */ h.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((F) => /* @__PURE__ */ h.jsx(bf, { block: F, editing: u }, F.id)) }) }) }) : /* @__PURE__ */ h.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((F) => /* @__PURE__ */ h.jsx(I1, { block: F }, F.id)) }) : /* @__PURE__ */ h.jsxs("div", { className: "simui-msg", children: [
          "Nothing in ",
          G.toLowerCase(),
          " yet."
        ] })
      ] })
    ] }),
    y && /* @__PURE__ */ h.jsx(
      dz,
      {
        kinds: bz,
        preview: O,
        onPick: V,
        onClose: () => S(!1)
      }
    )
  ] });
}
function Nz(s, t) {
  const i = { blocks: [] };
  if (s === "media") {
    const a = Xn(t, "media_player").filter(ae);
    for (const r of a)
      i.blocks.push({ id: At("cat-media"), type: "card", entityIds: [r.entity_id], span: 2 });
    return i;
  }
  if (s === "scenes") {
    const a = [...Xn(t, "scene"), ...Xn(t, "script")].filter(ae).map((r) => r.entity_id);
    return a.length && i.blocks.push({ id: At("cat-scenes"), type: "group", title: "Scenes & scripts", axis: "function", entityIds: a, span: "full" }), i;
  }
  return i;
}
function jz({
  hs: s,
  onChange: t,
  size: i = 200,
  label: a = "Colour"
}) {
  const r = j.useRef(null), c = j.useRef(!1), u = j.useId(), [f, m] = s, v = f * Math.PI / 180, g = Math.min(1, Math.max(0, m / 100)), b = 0.5 + Math.cos(v) * 0.5 * g, y = 0.5 + Math.sin(v) * 0.5 * g, S = j.useCallback(
    (T, D) => {
      const O = r.current;
      if (!O) return s;
      const V = O.getBoundingClientRect(), G = (T - V.left) / V.width - 0.5, R = (D - V.top) / V.height - 0.5;
      let X = Math.atan2(R, G) * 180 / Math.PI;
      X < 0 && (X += 360);
      const P = Math.min(1, Math.hypot(G, R) / 0.5);
      return [Math.round(X), Math.round(P * 100)];
    },
    [s]
  ), w = j.useCallback(
    (T) => {
      T.preventDefault(), c.current = !0, T.currentTarget.setPointerCapture?.(T.pointerId), t(S(T.clientX, T.clientY));
    },
    [S, t]
  ), M = j.useCallback(
    (T) => {
      c.current && t(S(T.clientX, T.clientY));
    },
    [S, t]
  ), N = j.useCallback((T) => {
    c.current = !1, T.currentTarget.releasePointerCapture?.(T.pointerId);
  }, []), k = j.useCallback(
    (T) => {
      switch (T.key) {
        case "ArrowRight":
          T.preventDefault(), t([(f + 6) % 360, m]);
          break;
        case "ArrowLeft":
          T.preventDefault(), t([(f - 6 + 360) % 360, m]);
          break;
        case "ArrowUp":
          T.preventDefault(), t([f, Math.min(100, m + 6)]);
          break;
        case "ArrowDown":
          T.preventDefault(), t([f, Math.max(0, m - 6)]);
          break;
        case "Home":
          T.preventDefault(), t([f, 100]);
          break;
        case "End":
          T.preventDefault(), t([f, 0]);
          break;
      }
    },
    [f, m, t]
  );
  return /* @__PURE__ */ h.jsxs(
    "div",
    {
      ref: r,
      className: "simui-wheel",
      role: "slider",
      tabIndex: 0,
      "aria-label": a,
      "aria-labelledby": u,
      "aria-valuetext": `Hue ${f} degrees, saturation ${m} percent`,
      "aria-valuemin": 0,
      "aria-valuemax": 360,
      "aria-valuenow": f,
      style: { width: i, height: i },
      onPointerDown: w,
      onPointerMove: M,
      onPointerUp: N,
      onPointerCancel: N,
      onKeyDown: k,
      children: [
        /* @__PURE__ */ h.jsx("span", { id: u, className: "simui-sr-only", children: a }),
        /* @__PURE__ */ h.jsx("div", { className: "simui-wheel-disc", "aria-hidden": "true" }),
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: "simui-wheel-thumb",
            "aria-hidden": "true",
            style: {
              left: `${b * 100}%`,
              top: `${y * 100}%`,
              background: `hsl(${f} ${m}% 50%)`
            }
          }
        )
      ]
    }
  );
}
const fn = 270, Ma = 135, Ul = 200, Yn = Ul / 2, $o = 78, xd = 12;
function yd({
  value: s,
  min: t,
  max: i,
  step: a = 0.5,
  current: r,
  unit: c = "°",
  tint: u = "muted",
  label: f = "Target temperature",
  onChange: m,
  size: v = 200
}) {
  const g = j.useRef(null), b = j.useRef(!1), y = Math.max(1e-4, i - t), S = kz((s - t) / y), w = u === "warm" ? "var(--warm)" : u === "cool" ? "var(--cool)" : "var(--accent)", M = j.useCallback(
    (R) => {
      const X = Math.round((R - t) / a) * a + t, P = Math.round(X / a) * a;
      return Cz(Number(P.toFixed(4)), t, i);
    },
    [t, i, a]
  ), N = j.useCallback(
    (R, X) => {
      const P = g.current;
      if (!P) return s;
      const rt = P.getBoundingClientRect(), at = (R - rt.left) / rt.width * Ul - Yn, F = (X - rt.top) / rt.height * Ul - Yn;
      let xt = Math.atan2(F, at) * 180 / Math.PI - Ma;
      for (; xt < 0; ) xt += 360;
      return xt > fn && (xt = xt - fn > (360 - fn) / 2 ? 0 : fn), M(t + xt / fn * y);
    },
    [s, M, t, y]
  ), k = j.useCallback(
    (R) => {
      R.preventDefault(), b.current = !0, R.currentTarget.setPointerCapture?.(R.pointerId), m(N(R.clientX, R.clientY));
    },
    [N, m]
  ), T = j.useCallback(
    (R) => {
      b.current && m(N(R.clientX, R.clientY));
    },
    [N, m]
  ), D = j.useCallback((R) => {
    b.current = !1, R.currentTarget.releasePointerCapture?.(R.pointerId);
  }, []), O = j.useCallback(
    (R) => {
      switch (R.key) {
        case "ArrowRight":
        case "ArrowUp":
          R.preventDefault(), m(M(s + a));
          break;
        case "ArrowLeft":
        case "ArrowDown":
          R.preventDefault(), m(M(s - a));
          break;
        case "Home":
          R.preventDefault(), m(t);
          break;
        case "End":
          R.preventDefault(), m(i);
          break;
      }
    },
    [s, a, M, m, t, i]
  ), V = fn / 360 * 2 * Math.PI * $o, G = Hd(Ma + S * fn, $o);
  return /* @__PURE__ */ h.jsxs(
    "svg",
    {
      ref: g,
      className: "simui-dial",
      role: "slider",
      tabIndex: 0,
      "aria-label": f,
      "aria-valuemin": t,
      "aria-valuemax": i,
      "aria-valuenow": s,
      "aria-valuetext": `${wd(s)}${c}`,
      viewBox: `0 0 ${Ul} ${Ul}`,
      width: v,
      height: v,
      onPointerDown: k,
      onPointerMove: T,
      onPointerUp: D,
      onPointerCancel: D,
      onKeyDown: O,
      children: [
        /* @__PURE__ */ h.jsx(
          "path",
          {
            className: "simui-dial-track",
            d: cb(Ma, Ma + fn, $o),
            fill: "none",
            strokeWidth: xd,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ h.jsx(
          "path",
          {
            className: "simui-dial-prog",
            d: cb(Ma, Ma + S * fn, $o),
            fill: "none",
            stroke: w,
            strokeWidth: xd,
            strokeLinecap: "round",
            style: { strokeDasharray: V, transition: "stroke 0.2s ease" }
          }
        ),
        /* @__PURE__ */ h.jsx(
          "circle",
          {
            className: "simui-dial-knob",
            cx: G.x,
            cy: G.y,
            r: xd / 2 + 3,
            fill: w,
            style: { transition: "fill 0.2s ease" }
          }
        ),
        /* @__PURE__ */ h.jsxs("text", { className: "simui-dial-value", x: Yn, y: Yn - 2, textAnchor: "middle", fill: "var(--text)", children: [
          wd(s),
          /* @__PURE__ */ h.jsx("tspan", { className: "simui-dial-unit", fill: "var(--muted)", children: c })
        ] }),
        r != null && /* @__PURE__ */ h.jsxs("text", { className: "simui-dial-current", x: Yn, y: Yn + 24, textAnchor: "middle", fill: "var(--muted)", children: [
          wd(r),
          c,
          " now"
        ] })
      ]
    }
  );
}
function cb(s, t, i) {
  const a = Hd(s, i), r = Hd(t, i), c = Math.abs(t - s) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${i} ${i} 0 ${c} 1 ${r.x} ${r.y}`;
}
function Hd(s, t) {
  const i = s * Math.PI / 180;
  return { x: Yn + Math.cos(i) * t, y: Yn + Math.sin(i) * t };
}
function Cz(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function kz(s) {
  return Math.min(1, Math.max(0, s));
}
function wd(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function qd(s, t) {
  const i = j.useRef(s);
  i.current = s;
  const a = j.useRef(0), r = j.useRef(null), c = j.useRef(null);
  return j.useCallback(
    (...u) => {
      c.current = u;
      const f = performance.now(), m = t - (f - a.current);
      m <= 0 ? (a.current = f, c.current = null, i.current(...u)) : r.current == null && (r.current = setTimeout(() => {
        r.current = null, a.current = performance.now();
        const v = c.current;
        c.current = null, v && i.current(...v);
      }, m));
    },
    [t]
  );
}
const Ez = /* @__PURE__ */ new Set(["light", "climate"]);
function zz(s) {
  return Ez.has(st(s));
}
function xf({ entityId: s }) {
  const t = Ee(s);
  if (!t) return null;
  const i = st(s);
  return i === "light" ? /* @__PURE__ */ h.jsx(Tz, { entity: t }) : i === "climate" ? /* @__PURE__ */ h.jsx(Rz, { entity: t }) : /* @__PURE__ */ h.jsx(Lz, { entity: t, domain: i });
}
const ub = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]);
function Tz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes, r = s.state === "on", c = a.brightness ?? 0, u = r ? Math.max(1, Math.round(c / 255 * 100)) : 0, f = a.supported_color_modes ?? [], m = a.color_mode, v = (V) => a[V] != null, g = f.some((V) => ub.has(V)) || m != null && ub.has(m) || v("rgb_color") || v("hs_color") || v("rgbw_color") || v("rgbww_color") || v("xy_color"), b = f.includes("color_temp") || m === "color_temp" || v("color_temp") || v("color_temp_kelvin"), y = a.min_color_temp_kelvin ?? 2200, S = a.max_color_temp_kelvin ?? 6500, w = a.color_temp_kelvin ?? Math.round((y + S) / 2), N = a.hs_color ?? [40, 70], k = (V) => {
    t("light", "turn_on", { brightness_pct: V }, { entity_id: i });
  }, T = (V) => {
    t("light", "turn_on", { color_temp_kelvin: V }, { entity_id: i });
  }, D = qd(
    (V) => {
      t("light", "turn_on", { hs_color: V }, { entity_id: i });
    },
    110
  ), O = {
    background: `linear-gradient(to right, var(--warm) ${u}%, var(--faint) ${u}%)`
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom light", children: [
    g && /* @__PURE__ */ h.jsx("div", { className: "simui-bloom-wheelwrap", children: /* @__PURE__ */ h.jsx(jz, { hs: N, onChange: D, size: 208, label: "Light colour" }) }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom-sliders", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "simui-qc-row", children: [
        /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
        /* @__PURE__ */ h.jsx("span", { className: "simui-qc-val num", children: r ? `${u}%` : "Off" })
      ] }),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          className: "simui-slider warm",
          type: "range",
          min: 0,
          max: 100,
          value: u,
          "aria-label": "Brightness",
          style: O,
          onChange: (V) => k(Number(V.target.value))
        }
      ),
      b && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
        /* @__PURE__ */ h.jsxs("div", { className: "simui-qc-row", children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Temperature" }),
          /* @__PURE__ */ h.jsxs("span", { className: "simui-qc-val num", children: [
            w,
            "K"
          ] })
        ] }),
        /* @__PURE__ */ h.jsx(
          "input",
          {
            className: "simui-temp-ribbon",
            type: "range",
            min: y,
            max: S,
            step: 50,
            value: w,
            "aria-label": "Colour temperature",
            onChange: (V) => T(Number(V.target.value))
          }
        )
      ] })
    ] })
  ] });
}
const Az = /* @__PURE__ */ new Set(["heating", "heat"]), Oz = /* @__PURE__ */ new Set(["cooling", "cool", "fan"]);
function Dz(s) {
  const t = s.attributes.hvac_action, i = s.state;
  return t && Az.has(t) ? "warm" : t && Oz.has(t) ? "cool" : i === "heat" ? "warm" : i === "cool" ? "cool" : "muted";
}
function Rz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes, r = a.min_temp ?? 7, c = a.max_temp ?? 35, u = a.target_temp_step ?? 0.5, f = a.current_temperature, m = a.temperature, v = a.target_temp_low, g = a.target_temp_high, b = a.hvac_modes ?? [], y = Dz(s), S = qd(
    (M) => {
      t("climate", "set_temperature", { temperature: M }, { entity_id: i });
    },
    110
  ), w = qd(
    (M, N) => {
      t("climate", "set_temperature", { target_temp_low: M, target_temp_high: N }, { entity_id: i });
    },
    110
  );
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom climate", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-bloom-dialwrap", children: m != null ? /* @__PURE__ */ h.jsx(
      yd,
      {
        value: qi(m, r, c),
        min: r,
        max: c,
        step: u,
        current: f,
        tint: y,
        label: "Target temperature",
        onChange: S,
        size: 208
      }
    ) : v != null && g != null ? (
      // heat_cool: a heating dial + a cooling dial side by side (single-thumb each).
      /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom-dialpair", children: [
        /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Heat to" }),
          /* @__PURE__ */ h.jsx(
            yd,
            {
              value: qi(v, r, g),
              min: r,
              max: g,
              step: u,
              current: f,
              tint: "warm",
              label: "Heat to",
              onChange: (M) => w(M, g),
              size: 150
            }
          )
        ] }),
        /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Cool to" }),
          /* @__PURE__ */ h.jsx(
            yd,
            {
              value: qi(g, v, c),
              min: v,
              max: c,
              step: u,
              current: f,
              tint: "cool",
              label: "Cool to",
              onChange: (M) => w(v, M),
              size: 150
            }
          )
        ] })
      ] })
    ) : f != null && /* @__PURE__ */ h.jsxs("div", { className: "simui-bloom-readonly num", children: [
      f,
      "° now"
    ] }) }),
    b.length > 0 && /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-bloom-modes", role: "group", "aria-label": "HVAC mode", children: b.map((M) => {
      const N = s.state === M;
      return /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-segbtn${N ? " is-active" : ""}`,
          "aria-pressed": N,
          onClick: () => {
            t("climate", "set_hvac_mode", { hvac_mode: M }, { entity_id: i });
          },
          children: ot(M)
        },
        M
      );
    }) })
  ] });
}
function Lz({ entity: s, domain: t }) {
  const i = Bz(t);
  return i.length ? /* @__PURE__ */ h.jsx("div", { className: "simui-bloom feats", children: /* @__PURE__ */ h.jsx(ts, { entity: s, features: i }) }) : null;
}
function Bz(s) {
  switch (s) {
    case "cover":
      return [{ type: "cover-open-close" }];
    case "fan":
      return [{ type: "fan-speed" }, { type: "fan-oscillate" }];
    case "lock":
      return [{ type: "lock-commands" }];
    case "alarm_control_panel":
      return [{ type: "alarm-modes", modes: ["armed_home", "armed_away", "armed_night", "disarmed"] }];
    default:
      return [];
  }
}
function Vi({ entity: s, omit: t }) {
  const i = s.attributes, a = /* @__PURE__ */ new Set([
    "friendly_name",
    "icon",
    "supported_features",
    "entity_picture",
    ...t ?? []
  ]), r = Object.entries(i).filter(([c]) => !a.has(c)).filter(([, c]) => c != null && c !== "" && (typeof c != "object" || Array.isArray(c)));
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-attrs", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-key", children: "State" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-val num", children: ot(s.state) })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-key", children: "Changed" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-val num", children: hc(s.last_changed) || "—" })
    ] }),
    r.map(([c, u]) => /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-key", children: ot(c) }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-val num", children: Uz(u) })
    ] }, c)),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-key", children: "Entity" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-val muted", children: s.entity_id })
    ] })
  ] });
}
function Uz(s) {
  return Array.isArray(s) ? s.map((t) => String(t)).join(", ") : typeof s == "number" ? String(s) : typeof s == "boolean" ? s ? "Yes" : "No" : ot(String(s));
}
const Hz = [
  "brightness",
  "color_temp",
  "color_temp_kelvin",
  "min_color_temp_kelvin",
  "max_color_temp_kelvin",
  "hs_color",
  "rgb_color",
  "rgbw_color",
  "rgbww_color",
  "xy_color",
  "supported_color_modes"
];
function qz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes, r = a.effect_list ?? [], c = a.effect, u = a.color_mode;
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ h.jsx(xf, { entityId: i }) }),
    u && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-pillrow", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-pilllabel", children: "Colour mode" }),
      /* @__PURE__ */ h.jsx("span", { className: "simui-detail-pillval num", children: ot(u) })
    ] }),
    r.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Effect" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Effect", children: r.map((f) => {
        const m = c === f;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${m ? " is-active" : ""}`,
            "aria-pressed": m,
            onClick: () => {
              t("light", "turn_on", { effect: f }, { entity_id: i });
            },
            children: ot(f)
          },
          f
        );
      }) })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: [...Hz, "effect", "effect_list", "color_mode"] })
  ] });
}
function Pn({
  value: s,
  unit: t,
  sub: i,
  tone: a,
  since: r
}) {
  const c = r ? hc(r) : "";
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-dh", children: [
    /* @__PURE__ */ h.jsxs("div", { className: `simui-dh-value num${a ? ` ${a}` : ""}`, children: [
      s,
      t && /* @__PURE__ */ h.jsx("span", { className: "simui-dh-unit", children: t })
    ] }),
    i && /* @__PURE__ */ h.jsx("div", { className: "simui-dh-sub", children: i }),
    c && /* @__PURE__ */ h.jsx("div", { className: "simui-dh-since num", children: c })
  ] });
}
const $z = [
  "temperature",
  "target_temp_low",
  "target_temp_high",
  "target_temp_step",
  "min_temp",
  "max_temp",
  "hvac_modes",
  "hvac_action",
  "current_temperature",
  "current_humidity"
];
function Qz(s) {
  const t = s.attributes.hvac_action;
  if (t === "heating" || s.state === "heat") return "warm";
  if (t === "cooling" || t === "fan" || s.state === "cool") return "cool";
}
function Vz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes, r = a.current_temperature, c = a.current_humidity, u = a.hvac_action, f = a.preset_modes ?? [], m = a.preset_mode, v = a.fan_modes ?? [], g = a.fan_mode, b = [
    ot(u || s.state),
    c != null ? `${Math.round(c)}% humidity` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: r != null ? Math.round(r) : "—",
        unit: "°",
        sub: b || void 0,
        tone: Qz(s),
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ h.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ h.jsx(xf, { entityId: i }) }),
    f.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Preset" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Preset mode", children: f.map((y) => {
        const S = m === y;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_preset_mode", { preset_mode: y }, { entity_id: i });
            },
            children: ot(y)
          },
          y
        );
      }) })
    ] }),
    v.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Fan" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Fan mode", children: v.map((y) => {
        const S = g === y;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_fan_mode", { fan_mode: y }, { entity_id: i });
            },
            children: ot(y)
          },
          y
        );
      }) })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: [...$z, "preset_modes", "preset_mode", "fan_modes", "fan_mode"] })
  ] });
}
const Bi = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREV: 16,
  NEXT: 32,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384
};
function Yz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes, r = s.state, c = r === "playing", u = r === "off" || r === "idle" || r === "standby" || r === "unavailable", f = a.media_title, m = a.media_artist ?? a.media_album_name ?? a.app_name, v = a.entity_picture, g = K1(v), b = a.volume_level, y = a.is_volume_muted === !0, S = a.source_list ?? [], w = a.source, M = vt(s, Bi.PLAY) || vt(s, Bi.PAUSE) || vt(s, Bi.PREV) || vt(s, Bi.NEXT), N = (D, O) => {
    t("media_player", D, O, { entity_id: i });
  }, k = b != null ? Math.round(b * 100) : 0, T = {
    background: `linear-gradient(to right, var(--accent) ${k}%, var(--faint) ${k}%)`
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: `simui-md-now${g ? " is-album-tinted" : ""}`,
        style: g ? X1(g) : void 0,
        children: [
          v ? /* @__PURE__ */ h.jsx("img", { className: "simui-md-art", src: v, alt: "" }) : /* @__PURE__ */ h.jsx("div", { className: "simui-md-art" }),
          /* @__PURE__ */ h.jsxs("div", { className: "simui-md-meta", children: [
            f ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
              /* @__PURE__ */ h.jsx("span", { className: "simui-md-title", title: f, children: f }),
              m && /* @__PURE__ */ h.jsx("span", { className: "simui-md-artist", title: m, children: m })
            ] }) : /* @__PURE__ */ h.jsx("span", { className: "simui-md-title", children: ot(r) }),
            f && /* @__PURE__ */ h.jsx("span", { className: "simui-md-state num", children: ot(r) })
          ] })
        ]
      }
    ),
    M && /* @__PURE__ */ h.jsxs("div", { className: "simui-md-transport", children: [
      vt(s, Bi.PREV) && /* @__PURE__ */ h.jsx("button", { className: "simui-md-btn", "aria-label": "Previous", onClick: () => N("media_previous_track"), children: /* @__PURE__ */ h.jsx(Xb, { size: 20, fill: "currentColor" }) }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          className: "simui-md-btn play",
          "aria-label": c ? "Pause" : "Play",
          disabled: u,
          onClick: () => N("media_play_pause"),
          children: c ? /* @__PURE__ */ h.jsx(lf, { size: 18, fill: "currentColor" }) : /* @__PURE__ */ h.jsx(js, { size: 18, fill: "currentColor" })
        }
      ),
      vt(s, Bi.STOP) && /* @__PURE__ */ h.jsx("button", { className: "simui-md-btn", "aria-label": "Stop", onClick: () => N("media_stop"), children: /* @__PURE__ */ h.jsx(In, { size: 14, fill: "currentColor" }) }),
      vt(s, Bi.NEXT) && /* @__PURE__ */ h.jsx("button", { className: "simui-md-btn", "aria-label": "Next", onClick: () => N("media_next_track"), children: /* @__PURE__ */ h.jsx(Zb, { size: 20, fill: "currentColor" }) })
    ] }),
    (vt(s, Bi.VOLUME_SET) || b != null) && /* @__PURE__ */ h.jsxs("div", { className: "simui-md-volrow", children: [
      vt(s, Bi.VOLUME_MUTE) && /* @__PURE__ */ h.jsx(
        "button",
        {
          className: `simui-iconbtn-h${y ? " active" : ""}`,
          "aria-label": y ? "Unmute" : "Mute",
          "aria-pressed": y,
          onClick: () => N("volume_mute", { is_volume_muted: !y }),
          children: y ? /* @__PURE__ */ h.jsx(Ib, { size: 16 }) : /* @__PURE__ */ h.jsx(Wb, { size: 16 })
        }
      ),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: y ? 0 : k,
          "aria-label": "Volume",
          style: T,
          onChange: (D) => N("volume_set", { volume_level: Number(D.target.value) / 100 })
        }
      ),
      /* @__PURE__ */ h.jsxs("span", { className: "simui-qc-val num", children: [
        k,
        "%"
      ] })
    ] }),
    vt(s, Bi.SELECT_SOURCE) && S.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Source" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Source", children: S.map((D) => {
        const O = w === D;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${O ? " is-active" : ""}`,
            "aria-pressed": O,
            onClick: () => N("select_source", { source: D }),
            children: D
          },
          D
        );
      }) })
    ] }),
    /* @__PURE__ */ h.jsx(
      Vi,
      {
        entity: s,
        omit: [
          "media_title",
          "media_artist",
          "media_album_name",
          "volume_level",
          "is_volume_muted",
          "source",
          "source_list"
        ]
      }
    )
  ] });
}
const Si = {
  OPEN: 1,
  CLOSE: 2,
  SET_POSITION: 4,
  STOP: 8,
  OPEN_TILT: 16,
  CLOSE_TILT: 32,
  STOP_TILT: 64,
  SET_TILT_POSITION: 128
};
function Gz({ entity: s }) {
  const t = jt(), i = s.attributes, a = i.current_position, r = i.current_tilt_position, c = vt(s, Si.SET_POSITION) && a != null, u = vt(s, Si.SET_TILT_POSITION) || vt(s, Si.OPEN_TILT) || vt(s, Si.CLOSE_TILT), f = (g, b) => {
    t("cover", g, b, { entity_id: s.entity_id });
  }, m = a != null ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0, v = r != null ? { background: `linear-gradient(to right, var(--accent) ${r}%, var(--faint) ${r}%)` } : void 0;
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: a ?? ot(s.state),
        unit: a != null ? "%" : void 0,
        sub: a != null ? ot(s.state) : void 0,
        tone: s.state === "open" ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    c && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Position" }),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: a,
          "aria-label": "Position",
          style: m,
          onChange: (g) => f("set_cover_position", { position: Number(g.target.value) })
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-buttons", children: [
      vt(s, Si.OPEN) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => f("open_cover"), children: /* @__PURE__ */ h.jsx(za, { size: 16, strokeWidth: 2 }) }),
      vt(s, Si.STOP) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => f("stop_cover"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
      vt(s, Si.CLOSE) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => f("close_cover"), children: /* @__PURE__ */ h.jsx(Qi, { size: 16, strokeWidth: 2 }) })
    ] }),
    u && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsxs("span", { className: "simui-qc-label", children: [
        "Tilt",
        r != null ? ` · ${r}%` : ""
      ] }),
      vt(s, Si.SET_TILT_POSITION) && r != null && /* @__PURE__ */ h.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: r,
          "aria-label": "Tilt",
          style: v,
          onChange: (g) => f("set_cover_tilt_position", { tilt_position: Number(g.target.value) })
        }
      ),
      /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-buttons", children: [
        vt(s, Si.OPEN_TILT) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Open tilt", onClick: () => f("open_cover_tilt"), children: /* @__PURE__ */ h.jsx(za, { size: 16, strokeWidth: 2 }) }),
        vt(s, Si.STOP_TILT) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Stop tilt", onClick: () => f("stop_cover_tilt"), children: /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }) }),
        vt(s, Si.CLOSE_TILT) && /* @__PURE__ */ h.jsx("button", { className: "simui-sbtn", "aria-label": "Close tilt", onClick: () => f("close_cover_tilt"), children: /* @__PURE__ */ h.jsx(Qi, { size: 16, strokeWidth: 2 }) })
      ] })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: ["current_position", "current_tilt_position"] })
  ] });
}
function Kz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.state === "locked", r = s.state === "locking" || s.state === "unlocking", c = (u) => {
    t("lock", u, {}, { entity_id: i });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: ot(s.state),
        tone: a ? void 0 : "warn",
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-buttons wide", children: [
      /* @__PURE__ */ h.jsxs(
        "button",
        {
          className: `simui-segbtn lg${a ? " is-active" : ""}`,
          "aria-pressed": a,
          disabled: r,
          onClick: () => c("lock"),
          children: [
            /* @__PURE__ */ h.jsx(Ns, { size: 15, strokeWidth: 2 }),
            " Lock"
          ]
        }
      ),
      /* @__PURE__ */ h.jsxs(
        "button",
        {
          className: `simui-segbtn lg${!a && !r ? " is-active" : ""}`,
          "aria-pressed": !a && !r,
          disabled: r,
          onClick: () => c("unlock"),
          children: [
            /* @__PURE__ */ h.jsx(Ua, { size: 15, strokeWidth: 2 }),
            " Unlock"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s })
  ] });
}
function Xz({ entity: s }) {
  const i = s.attributes.unit_of_measurement, a = Number.parseFloat(s.state), r = st(s.entity_id) === "sensor" && s.state !== "" && Number.isFinite(a), c = s.state === "on";
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    r ? /* @__PURE__ */ h.jsx(Pn, { value: Zz(a), unit: i, since: s.last_changed }) : /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: ot(s.state),
        tone: c ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    r && /* @__PURE__ */ h.jsx("div", { className: "simui-detail-chart", children: /* @__PURE__ */ h.jsx(V1, { entityId: s.entity_id, accent: "var(--cyan)" }) }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s })
  ] });
}
function Zz(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toLocaleString() : s.toFixed(1).replace(/\.0$/, "");
}
const hb = { SET_SPEED: 1, OSCILLATE: 2 }, Wz = ["percentage", "percentage_step", "oscillating", "preset_modes", "preset_mode"];
function Iz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.state === "on", r = s.state === "unavailable" || s.state === "unknown", c = s.attributes, u = a ? c.percentage ?? 100 : 0, f = c.preset_modes ?? [], m = c.preset_mode, v = [];
  vt(s, hb.SET_SPEED) && v.push({ type: "fan-speed" }), vt(s, hb.OSCILLATE) && v.push({ type: "fan-oscillate" });
  const g = () => {
    t("fan", a ? "turn_off" : "turn_on", {}, { entity_id: i });
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: a ? u : ot(s.state),
        unit: a ? "%" : void 0,
        sub: a ? ot(s.state) : void 0,
        tone: a ? "cool" : void 0,
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ h.jsx("div", { className: "simui-detail-buttons wide", children: /* @__PURE__ */ h.jsxs(
      "button",
      {
        className: `simui-segbtn lg${a ? " is-active" : ""}`,
        "aria-pressed": a,
        disabled: r,
        onClick: g,
        children: [
          /* @__PURE__ */ h.jsx(Wn, { size: 15, strokeWidth: 2 }),
          " ",
          a ? "On" : "Off"
        ]
      }
    ) }),
    v.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Speed" }),
      /* @__PURE__ */ h.jsx(ts, { entity: s, features: v })
    ] }),
    f.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Preset" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Fan preset", children: f.map((b) => {
        const y = m === b;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${y ? " is-active" : ""}`,
            "aria-pressed": y,
            onClick: () => {
              t("fan", "set_preset_mode", { preset_mode: b }, { entity_id: i });
            },
            children: ot(b)
          },
          b
        );
      }) })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: Wz })
  ] });
}
const Rl = {
  PAUSE: 4,
  STOP: 8,
  RETURN_HOME: 16,
  LOCATE: 512,
  START: 8192
}, Fz = /* @__PURE__ */ new Set(["cleaning", "returning"]), Jz = ["battery_level", "battery_icon", "fan_speed", "fan_speed_list"];
function Pz({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.state === "unavailable" || s.state === "unknown", r = Fz.has(s.state), c = s.attributes, u = c.battery_level, f = c.fan_speed, m = c.fan_speed_list ?? [], v = (b, y) => {
    t("vacuum", b, y, { entity_id: i });
  }, g = u != null ? `${Math.round(u)}% battery` : void 0;
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: ot(s.state),
        sub: g,
        tone: r ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    !a && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-buttons wide", children: [
      vt(s, Rl.START) && /* @__PURE__ */ h.jsxs(
        "button",
        {
          className: `simui-segbtn${r ? " is-active" : ""}`,
          "aria-label": "Start",
          onClick: () => v("start"),
          children: [
            /* @__PURE__ */ h.jsx(js, { size: 14, strokeWidth: 2, fill: "currentColor" }),
            " Start"
          ]
        }
      ),
      vt(s, Rl.PAUSE) && /* @__PURE__ */ h.jsxs("button", { className: "simui-segbtn", "aria-label": "Pause", onClick: () => v("pause"), children: [
        /* @__PURE__ */ h.jsx(lf, { size: 14, strokeWidth: 2 }),
        " Pause"
      ] }),
      vt(s, Rl.STOP) && /* @__PURE__ */ h.jsxs("button", { className: "simui-segbtn", "aria-label": "Stop", onClick: () => v("stop"), children: [
        /* @__PURE__ */ h.jsx(In, { size: 12, strokeWidth: 2 }),
        " Stop"
      ] }),
      vt(s, Rl.RETURN_HOME) && /* @__PURE__ */ h.jsxs("button", { className: "simui-segbtn", "aria-label": "Return to base", onClick: () => v("return_to_base"), children: [
        /* @__PURE__ */ h.jsx(mc, { size: 14, strokeWidth: 2 }),
        " Dock"
      ] }),
      vt(s, Rl.LOCATE) && /* @__PURE__ */ h.jsxs("button", { className: "simui-segbtn", "aria-label": "Locate", onClick: () => v("locate"), children: [
        /* @__PURE__ */ h.jsx(Cd, { size: 14, strokeWidth: 2 }),
        " Locate"
      ] })
    ] }),
    m.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Suction" }),
      /* @__PURE__ */ h.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Fan speed", children: m.map((b) => {
        const y = f === b;
        return /* @__PURE__ */ h.jsx(
          "button",
          {
            className: `simui-segbtn${y ? " is-active" : ""}`,
            "aria-pressed": y,
            onClick: () => v("set_fan_speed", { fan_speed: b }),
            children: ot(b)
          },
          b
        );
      }) })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: Jz })
  ] });
}
const Ui = {
  ARM_HOME: 1,
  ARM_AWAY: 2,
  ARM_NIGHT: 4,
  ARM_CUSTOM_BYPASS: 16,
  ARM_VACATION: 32
}, t5 = ["code_format", "code_arm_required", "changed_by"];
function db(s) {
  if (s === "triggered" || s === "pending" || s === "arming") return "warn";
  if (s.startsWith("armed")) return "accent";
}
function e5({ entity: s }) {
  const t = jt(), i = s.entity_id, a = s.attributes.supported_features ?? 0, r = s.state === "disarmed", c = s.attributes.changed_by, u = [];
  (a & Ui.ARM_HOME) === Ui.ARM_HOME && u.push("armed_home"), (a & Ui.ARM_AWAY) === Ui.ARM_AWAY && u.push("armed_away"), (a & Ui.ARM_NIGHT) === Ui.ARM_NIGHT && u.push("armed_night"), (a & Ui.ARM_VACATION) === Ui.ARM_VACATION && u.push("armed_vacation"), (a & Ui.ARM_CUSTOM_BYPASS) === Ui.ARM_CUSTOM_BYPASS && u.push("armed_custom_bypass"), u.length === 0 && u.push("armed_home", "armed_away", "armed_night");
  const f = r ? tc : db(s.state) === "warn" ? Kb : vc, m = c ? `by ${c}` : void 0;
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx(
      Pn,
      {
        value: /* @__PURE__ */ h.jsxs("span", { className: "simui-alarm-state", children: [
          /* @__PURE__ */ h.jsx(f, { size: 20, strokeWidth: 2 }),
          ot(s.state)
        ] }),
        sub: m,
        tone: db(s.state),
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ h.jsx("div", { className: "simui-detail-buttons wide", children: /* @__PURE__ */ h.jsxs(
      "button",
      {
        className: `simui-segbtn lg${r ? " is-active" : ""}`,
        "aria-pressed": r,
        onClick: () => {
          t("alarm_control_panel", "alarm_disarm", void 0, { entity_id: i });
        },
        children: [
          /* @__PURE__ */ h.jsx(tc, { size: 15, strokeWidth: 2 }),
          " Disarm"
        ]
      }
    ) }),
    /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ h.jsx("span", { className: "simui-qc-label", children: "Arm" }),
      /* @__PURE__ */ h.jsx(ts, { entity: s, features: [{ type: "alarm-modes", modes: u }] })
    ] }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s, omit: t5 })
  ] });
}
function i5({ entityId: s }) {
  const t = Ee(s);
  if (!t)
    return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail-empty", children: [
      s,
      " is unavailable."
    ] });
  switch (st(s)) {
    case "light":
      return /* @__PURE__ */ h.jsx(qz, { entity: t });
    case "climate":
      return /* @__PURE__ */ h.jsx(Vz, { entity: t });
    case "media_player":
      return /* @__PURE__ */ h.jsx(Yz, { entity: t });
    case "cover":
      return /* @__PURE__ */ h.jsx(Gz, { entity: t });
    case "lock":
      return /* @__PURE__ */ h.jsx(Kz, { entity: t });
    case "sensor":
    case "binary_sensor":
      return /* @__PURE__ */ h.jsx(Xz, { entity: t });
    case "fan":
      return /* @__PURE__ */ h.jsx(Iz, { entity: t });
    case "vacuum":
      return /* @__PURE__ */ h.jsx(Pz, { entity: t });
    case "alarm_control_panel":
      return /* @__PURE__ */ h.jsx(e5, { entity: t });
    default:
      return /* @__PURE__ */ h.jsx(n5, { entity: t });
  }
}
function n5({ entity: s }) {
  const t = s.entity_id, i = Z1(st(t));
  return /* @__PURE__ */ h.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ h.jsx("div", { className: "simui-detail-widget", children: zz(t) ? /* @__PURE__ */ h.jsx(xf, { entityId: t }) : Il(t) ? /* @__PURE__ */ h.jsx(Fl, { entityId: t }) : /* @__PURE__ */ h.jsx(i, { entity: s }) }),
    /* @__PURE__ */ h.jsx(Vi, { entity: s })
  ] });
}
function s5() {
  const { config: s, route: t, sheetEntityId: i, closeSheet: a } = Ts(), r = t.kind === "home" ? "home" : `${t.kind}/${t.id}`;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(Pl, { compact: !0, label: "This view", resetKey: r, children: /* @__PURE__ */ h.jsx(c, {}) }),
    /* @__PURE__ */ h.jsx(Pl, { compact: !0, label: "Detail", resetKey: i ?? "", children: /* @__PURE__ */ h.jsx(a5, { entityId: i, onClose: a }) })
  ] });
  function c() {
    if (!s) return /* @__PURE__ */ h.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
    if (t.kind === "category") return /* @__PURE__ */ h.jsx(Mz, { categoryId: t.id });
    if (!s.rooms.length) return /* @__PURE__ */ h.jsx("div", { className: "simui-msg", children: "No rooms to show yet." });
    if (t.kind === "home") return /* @__PURE__ */ h.jsx(rz, {});
    const u = s.rooms.find((f) => f.id === t.id) ?? s.rooms[0];
    return /* @__PURE__ */ h.jsx(cz, { room: u }, u.id);
  }
}
function a5({ entityId: s, onClose: t }) {
  const i = Ee(s ?? ""), a = s ? i ? J(i) : s : void 0;
  return /* @__PURE__ */ h.jsx(Q1, { open: !!s, title: a, onClose: t, children: s && /* @__PURE__ */ h.jsx(i5, { entityId: s }) });
}
function l5() {
  return s_() === "live" ? null : /* @__PURE__ */ h.jsxs("div", { className: "simui-conn-banner", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ h.jsx(XS, { size: 13, className: "simui-conn-ic", "aria-hidden": "true" }),
    /* @__PURE__ */ h.jsx("span", { children: "Reconnecting to Home Assistant…" })
  ] });
}
function r5() {
  return /* @__PURE__ */ h.jsxs(Pl, { children: [
    /* @__PURE__ */ h.jsx(l5, {}),
    /* @__PURE__ */ h.jsx(M_, { children: /* @__PURE__ */ h.jsx(s5, {}) })
  ] });
}
const o5 = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--cool: #5ec8e6;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--violet: #a78bfa;--cyan: #5ec8e6;--pink: #ec8fb8;--teal: #34c0a8;--slate: #7c93c8;--hairline: var(--divider-color, rgba(255,255,255,.06));--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:0 0 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:color-mix(in srgb,var(--text) 4%,var(--surface));border:1px solid transparent;border-radius:16px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease,border-color .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{background:color-mix(in srgb,var(--text) 7.5%,var(--surface))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-erow.is-unavailable,.simui-slidertile.is-unavailable,.simui-tile.is-unavailable,.simui-statusboard.is-unavailable,.simui-metric.is-unavailable{opacity:.4}.simui-slidertile.is-unavailable{cursor:default}.simui-slidertile.is-unavailable .simui-slidertile-fill{display:none}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-state.on{color:var(--accent)}.simui-since{color:var(--muted);opacity:.62;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}.simui-topbar{display:flex;align-items:center;gap:8px;padding:6px 2px 10px}.simui-pills{display:flex;gap:6px;overflow-x:auto;min-width:0;scrollbar-width:none}.simui-pills::-webkit-scrollbar{display:none}.simui-pill{flex:none;padding:6px 13px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,background .12s ease}.simui-pill:hover{color:var(--text)}.simui-pill.active{color:var(--text);background:var(--surface);border-color:var(--faint)}.simui-room{position:relative}.simui-ambient{position:absolute;inset:0 -16px auto;height:300px;z-index:0;pointer-events:none;opacity:var(--amb, .06);background:radial-gradient(120% 80% at 26% 0%,var(--warm),transparent 62%)}.simui-room>.simui-room-head,.simui-room>.simui-grid{position:relative;z-index:1}.simui-room-head{display:flex;align-items:baseline;gap:12px;padding:8px 2px 16px}.simui-room-name{font-size:22px;font-weight:600;letter-spacing:-.3px}.simui-room-glance{font-size:12px;color:var(--muted)}.simui-block{position:relative}.simui-block.span-2{grid-column:span 2}.simui-block.span-full{grid-column:1 / -1}.simui-block.editing .simui-surface,.simui-block.editing .simui-tile,.simui-block.editing .simui-hero{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px;border-radius:var(--radius)}.simui-block.dragging{opacity:.55}.simui-hero{padding:2px 6px 18px}.simui-hero-temp{font-size:46px;font-weight:300;letter-spacing:-1.5px;line-height:.9}.simui-hero-temp small{font-size:20px;color:var(--muted);font-weight:400}.simui-hero-sub{margin-top:8px;font-size:12px;color:var(--muted)}.simui-hero-state{font-size:30px;font-weight:400;letter-spacing:-.8px;line-height:1}.simui-hero.is-state .simui-feats{margin-top:14px}.simui-surface{background:var(--group, rgba(255, 255, 255, .035));border:none;border-radius:20px;padding:15px 16px}.simui-surface-head{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:11px;font-weight:500}.simui-rows{display:flex;flex-direction:column}.simui-rows.divided .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-master{display:flex;align-items:center;gap:10px;margin-bottom:10px}.simui-master-label{font-size:12px;color:var(--muted);width:26px}.simui-master-val{font-size:12px;color:var(--text);min-width:34px;text-align:right}.simui-erow{display:flex;align-items:center;gap:10px;padding:8px 0;min-width:0;width:100%;background:none;border:none;color:inherit;font:inherit;text-align:left}button.simui-erow,.simui-erow.as-row{cursor:pointer}.simui-erow-name{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-erow-name.as-btn{background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-align:left;min-width:0}.simui-erow-name.muted{color:var(--muted)}.simui-erow-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-erow-ic.amber{color:var(--warn)}.simui-erow-ic.cool{color:var(--accent)}.simui-erow-dot{flex:none;width:9px;height:9px;padding:0;border:none;border-radius:50%;background:#4b4f57;cursor:pointer}.simui-erow-dot[data-on=true]{background:var(--warm);box-shadow:0 0 0 3px color-mix(in srgb,var(--warm) 20%,transparent)}.simui-erow-state{font-size:12px;color:var(--muted)}.simui-erow-state.warn{color:var(--warn)}.simui-erow-state.on{color:var(--accent)}.simui-erow-val{font-size:13px;color:var(--text)}.simui-slider.mini{max-width:96px}.simui-rbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer}.simui-rbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--bg);border-bottom:1px solid var(--faint)}.simui-head-title{font-size:20px;font-weight:600;letter-spacing:-.3px;white-space:nowrap}.simui-head-glance{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-back{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;margin-left:-6px;border-radius:9px;border:none;background:transparent;color:var(--muted);cursor:pointer}.simui-back:hover{color:var(--text);background:var(--surface)}.simui-content{padding:16px}.simui-home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}.simui-roomcard{position:relative;display:flex;flex-direction:column;gap:10px;min-height:122px;padding:15px 16px;text-align:left;color:var(--text);background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border:1px solid transparent;border-radius:20px;cursor:pointer;overflow:hidden;transition:background .18s ease,transform .12s ease,box-shadow .18s ease}.simui-roomcard:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface));transform:translateY(-1px);box-shadow:0 6px 22px #00000038}.simui-roomcard:active{transform:translateY(0) scale(.995)}.simui-roomcard.lit{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 20%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 5%,var(--surface))}.simui-roomcard.lit:hover{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 26%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 7%,var(--surface))}.simui-roomcard-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.simui-roomcard-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:40px;height:40px;border-radius:13px;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-icon.warm{color:var(--warm);background:color-mix(in srgb,var(--warm) 16%,transparent)}.simui-roomcard-icon.amber{color:var(--warn);background:color-mix(in srgb,var(--warn) 16%,transparent)}.simui-roomcard-icon.accent{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-name{font-size:15px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-roomcard-go{color:var(--muted);flex:none;opacity:.5}.simui-roomcard-glance{font-size:12px;color:var(--muted);margin-top:auto}.simui-feats{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.simui-feats:empty{display:none}.simui-seg{display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-segbtn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-width:26px;height:24px;padding:0 8px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,background .12s ease}.simui-segbtn:hover:not(:disabled){color:var(--text)}.simui-segbtn.is-active{background:var(--surface);color:var(--accent)}.simui-segbtn:disabled{opacity:.45;cursor:default}.simui-ftoggle{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--faint);background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-ftoggle.is-active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-fsel-wrap{position:relative;display:inline-flex;align-items:center}.simui-fsel{appearance:none;-webkit-appearance:none;height:26px;padding:0 26px 0 10px;border-radius:8px;border:1px solid var(--faint);background:var(--surface-2);color:var(--text);font-size:12px;font-weight:500;cursor:pointer;outline:none}.simui-fsel:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-fsel-caret{position:absolute;right:8px;pointer-events:none;color:var(--muted)}.simui-strip{display:flex;align-items:stretch;gap:8px;overflow-x:auto;min-width:0;margin-bottom:14px;padding-bottom:2px;scrollbar-width:none}.simui-strip::-webkit-scrollbar{display:none}.simui-pill-count,.simui-pill-nav,.simui-pill-action,.simui-pill-badge,.simui-pill-status,.simui-pill-select{--pill-accent: var(--muted);flex:none;display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 13px;border-radius:999px;border:1px solid var(--faint);background:var(--surface);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,border-color .12s ease,background .12s ease}.simui-pill-count:disabled,.simui-pill-nav:disabled,.simui-pill-action:disabled,.simui-pill-select:disabled{cursor:default}.simui-pill-count:hover:not(:disabled),.simui-pill-nav:hover:not(:disabled),.simui-pill-action:hover:not(:disabled),.simui-pill-status.is-clickable:hover,.simui-pill-select:hover:not(:disabled){color:var(--text);border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-pill-ic{display:inline-flex;align-items:center;color:var(--muted)}.simui-pill-num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum";font-weight:600;color:var(--text)}.simui-pill-label{color:var(--muted)}.simui-pill-count.is-active{color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 9%,var(--surface))}.simui-pill-count.is-active .simui-pill-ic,.simui-pill-nav .simui-pill-ic{color:var(--pill-accent)}.simui-pill-action{width:36px;padding:0;justify-content:center}.simui-pill-action .simui-pill-ic{color:var(--pill-accent)}.simui-pill-badge{cursor:default;color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 10%,var(--surface))}.simui-pill-badge .simui-pill-ic{color:var(--pill-accent)}.simui-pill-status{cursor:default;align-items:center}.simui-pill-status.is-clickable{cursor:pointer}.simui-pill-status.is-active{border-color:color-mix(in srgb,var(--pill-accent) 35%,var(--faint))}.simui-pill-ic.is-on{color:var(--pill-accent)}.simui-pill-status-body{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15}.simui-pill-status-primary{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums}.simui-pill-status-secondary{color:var(--muted);font-size:11px}.simui-pill-select{gap:6px}.simui-pill-select-name{color:var(--muted)}.simui-pill-select-value{color:var(--text);font-weight:600}.simui-pill-select-caret{display:inline-flex;color:var(--muted)}.simui-sheet-backdrop{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;justify-content:center;background:#00000080}.simui-sheet{display:flex;flex-direction:column;width:100%;max-width:540px;max-height:88vh;background:var(--surface);border:1px solid var(--faint);border-radius:20px 20px 0 0;overflow:hidden;box-shadow:0 -8px 40px #0006}.simui-sheet-head{position:sticky;top:0;flex:none;display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--faint);background:var(--surface)}.simui-sheet-title{flex:1;font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-sheet-body{overflow:auto;padding:16px}@media(min-width:720px){.simui-sheet-backdrop{align-items:center;padding:24px}.simui-sheet{border-radius:18px;max-width:480px}}.simui-detail{display:flex;flex-direction:column;gap:16px}.simui-detail-widget .simui-tile{background:var(--surface-2)}.simui-detail-empty{color:var(--muted);font-size:14px}.simui-detail-attrs{display:flex;flex-direction:column;gap:1px;border-top:1px solid var(--faint)}.simui-detail-attr{display:flex;align-items:baseline;gap:12px;padding:8px 2px;border-bottom:1px solid var(--faint)}.simui-detail-key{flex:none;min-width:120px;color:var(--muted);font-size:12px;text-transform:capitalize}.simui-detail-val{flex:1;text-align:right;font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;word-break:break-word}.simui-detail-val.muted{color:var(--muted)}.simui-qc{display:flex;flex-direction:column;gap:11px}.simui-qc.compact{gap:9px}.simui-qc-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px}.simui-qc-label{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-qc-val{font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-qc-swatches{display:flex;flex-wrap:wrap;gap:8px}.simui-qc-swatch{width:26px;height:26px;padding:0;border-radius:50%;border:1px solid var(--hairline);cursor:pointer;transition:transform .1s ease,box-shadow .12s ease}.simui-qc-swatch:hover{transform:scale(1.12);box-shadow:0 0 0 2px color-mix(in srgb,var(--text) 18%,transparent)}.simui-qc.compact .simui-qc-swatch{width:22px;height:22px}.simui-temp-ribbon{-webkit-appearance:none;appearance:none;width:100%;height:14px;border-radius:999px;cursor:pointer;outline:none;background:linear-gradient(to right,#ffb46b,#fff4e6,#cfe0ff)}.simui-temp-ribbon::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28);box-shadow:0 1px 4px #00000073}.simui-temp-ribbon::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28)}.simui-erow.climate .simui-feats{flex:none;margin-left:10px}.simui-ctxmenu{position:fixed;z-index:200;box-sizing:border-box;display:flex;flex-direction:column;width:max-content;min-width:200px;max-width:min(280px,calc(100vw - 16px));min-height:0;max-height:calc(100vh - 16px);overflow-y:auto;padding:6px;background:var(--surface-2);border:1px solid var(--hairline);border-radius:14px;box-shadow:0 14px 40px #00000080;outline:none}.simui-ctxgroup{display:contents}.simui-ctxhead{padding:4px 6px 8px}.simui-ctxhead+.simui-ctxitem{margin-top:0}.simui-ctxsep{height:1px;margin:5px 6px;background:var(--hairline)}.simui-ctxitem{display:flex;align-items:center;gap:9px;width:100%;min-width:0;padding:8px 9px;border:none;border-radius:9px;background:transparent;color:var(--text);font-size:13px;text-align:left;cursor:pointer}.simui-ctxitem:hover:not(:disabled),.simui-ctxitem.is-active{background:var(--surface)}.simui-ctxitem:disabled{opacity:.4;cursor:default}.simui-ctxitem.danger{color:var(--down)}.simui-ctxic{display:inline-flex;flex:none;color:var(--muted)}.simui-ctxitem.danger .simui-ctxic{color:var(--down)}.simui-ctxlabel{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-chart{display:flex;flex-direction:column;gap:8px;width:100%}.simui-chart-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 16px}.simui-chart-title{font-size:13px;font-weight:600;color:var(--text)}.simui-chart-readout{display:flex;flex-wrap:wrap;gap:6px 16px;margin-left:auto}.simui-chart-cur{display:inline-flex;align-items:center;gap:6px;font-size:12px}.simui-chart-dot{width:8px;height:8px;border-radius:50%;flex:none}.simui-chart-cur-name{color:var(--muted)}.simui-chart-cur-val{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-chart-cur-val small{color:var(--muted);font-weight:500}.simui-chart-canvas{width:100%;height:220px}.simui-chart-fallback{padding:18px 4px;color:var(--muted);font-size:13px}.simui-surface-grid{align-items:start}.simui-surface.card{padding:12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius)}.simui-subgroups{display:flex;flex-direction:column;gap:12px}.simui-subhead{font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500;margin:2px 0 6px}.simui-list-empty{padding:4px 2px;font-size:13px;color:var(--muted)}.simui-launcher-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px}.simui-tile.is-vertical{align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px}.simui-tile.is-launcher{cursor:pointer}.simui-tile.is-launcher.is-tinted{background:color-mix(in srgb,var(--tile-accent) 10%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 28%,var(--faint))}.simui-launch-ic{display:inline-flex;align-items:center;justify-content:center;color:var(--tile-accent, var(--accent))}.simui-launch-name{font-size:12px;font-weight:600;max-width:100%}.simui-scene-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);color:var(--text);cursor:pointer;transition:border-color .15s ease,background .15s ease}.simui-scene-tile:hover{border-color:color-mix(in srgb,var(--accent) 30%,var(--faint))}.simui-scene-tile .simui-launch-ic,.simui-ic.on{color:var(--accent)}.simui-tile.is-tinted{background:color-mix(in srgb,var(--tile-accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 22%,var(--faint))}.simui-rooms-head{margin:18px 2px 10px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-home-summary{margin-bottom:4px}.simui-home-content{position:relative}.simui-home-layer{position:relative;z-index:1}.simui-home-summary{display:flex;flex-direction:column;align-items:stretch;gap:22px;margin-bottom:10px}.simui-home-summary>.simui-block{min-width:0;width:100%}.simui-home-summary .simui-surface,.simui-home-summary .simui-surface.list,.simui-home-summary .simui-surface.card{background:transparent;border:none;padding:0;border-radius:0}.simui-home-summary .simui-surface-head{margin:0 2px 10px}.simui-home-summary .simui-launcher-grid{gap:4px;grid-template-columns:repeat(auto-fill,minmax(78px,1fr))}.simui-home-summary .simui-tile.is-launcher,.simui-home-summary .simui-tile.is-launcher.is-tinted,.simui-home-summary .simui-tile.is-launcher.is-active{background:transparent;border:none;min-height:80px;gap:9px;padding:8px 4px;border-radius:16px;transition:background .15s ease,transform .12s ease}.simui-home-summary .simui-tile.is-launcher:hover{background:color-mix(in srgb,var(--text) 5%,transparent)}.simui-home-summary .simui-tile.is-launcher:active{transform:scale(.97)}.simui-home-summary .simui-launch-ic{width:48px;height:48px;border-radius:16px;color:var(--tile-accent, var(--accent));background:color-mix(in srgb,var(--tile-accent, var(--accent)) 15%,transparent)}.simui-home-summary .simui-launch-name{color:var(--text);font-size:12px;font-weight:500}.simui-home-summary .simui-rows .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-home-layer .simui-pill-count,.simui-home-layer .simui-pill-nav,.simui-home-layer .simui-pill-action,.simui-home-layer .simui-pill-select{background:color-mix(in srgb,var(--text) 3%,transparent);border-color:color-mix(in srgb,var(--text) 9%,transparent)}.simui-rooms-head{margin:26px 2px 12px}.simui-metric-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.simui-metric{--metric-accent: var(--muted);display:flex;flex-direction:column;gap:5px;padding:11px 12px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border-radius:14px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease}.simui-metric.is-clickable{cursor:pointer}.simui-metric.is-clickable:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface))}.simui-metric.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-metric-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;min-width:0}.simui-metric-name{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-metric-delta{flex:none;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-delta.up{color:var(--up)}.simui-metric-delta.down{color:var(--down)}.simui-metric-value{display:flex;align-items:baseline;gap:4px}.simui-metric-val{font-size:22px;font-weight:300;letter-spacing:-.5px;line-height:1;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-val.oob{color:var(--warn)}.simui-metric-unit{font-size:11px;color:var(--muted)}.simui-metric-spark{display:block;width:100%;margin-top:2px;color:var(--metric-accent)}.simui-metric-spark.is-empty{background:linear-gradient(var(--hairline),var(--hairline)) center / 100% 1px no-repeat}.simui-metric-band{fill:color-mix(in srgb,var(--up) 12%,transparent)}.simui-expand-glance.is-clickable{cursor:pointer}.simui-expand-glance.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:2px;border-radius:14px}.simui-expand-sheet{display:flex;flex-direction:column;gap:14px}.simui-expand-chart{width:100%}.simui-range-toggle{display:inline-flex;align-self:flex-start;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-range-btn{min-width:44px;height:26px;padding:0 10px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;font-variant-numeric:tabular-nums;transition:color .12s ease,background .12s ease}.simui-range-btn:hover{color:var(--text)}.simui-range-btn.active{background:var(--surface);color:var(--accent)}.simui-slider-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.simui-slidertile{--slider-tint: var(--warm);position:relative;display:flex;min-height:92px;padding:0;overflow:hidden;border-radius:16px;background:color-mix(in srgb,var(--text) 4%,var(--surface));box-shadow:inset 0 .5px #ffffff0f;cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;transition:box-shadow .15s ease}.simui-slidertile.is-on{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 24%,transparent)}.simui-slidertile.is-dragging{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 42%,transparent)}.simui-slidertile.is-static{cursor:default;touch-action:auto}.simui-slidertile:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-slidertile-fill{position:absolute;left:0;right:0;bottom:0;height:0;opacity:.18;pointer-events:none;transition:height .04s linear,opacity .15s ease}.simui-slidertile.is-on .simui-slidertile-fill{opacity:.28}.simui-slidertile.is-dragging .simui-slidertile-fill{transition:none}.simui-slidertile-body{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;gap:8px;width:100%;padding:11px 12px}.simui-slidertile-head{display:flex;align-items:center;gap:8px}.simui-slidertile-ic{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;padding:0;border:none;border-radius:9px;background:color-mix(in srgb,var(--text) 6%,transparent);color:var(--muted);cursor:pointer;transition:color .12s ease,background .12s ease}.simui-slidertile-ic.on{color:var(--slider-tint);background:color-mix(in srgb,var(--slider-tint) 16%,transparent)}.simui-slidertile-pct{margin-left:auto;font-size:13px;font-weight:500;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-slidertile-name{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-statusboard{--board-tint: var(--muted);display:flex;flex-direction:column;gap:6px;min-height:96px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));box-shadow:inset 0 .5px #ffffff0d;cursor:default;transition:background .18s ease,box-shadow .18s ease}.simui-statusboard.tone-secure{--board-tint: var(--up)}.simui-statusboard.tone-warn{--board-tint: var(--warn)}.simui-statusboard.tone-alert{--board-tint: var(--down)}.simui-statusboard.tone-idle{--board-tint: var(--muted)}.simui-statusboard.is-attn{background:color-mix(in srgb,var(--board-tint) 10%,var(--surface));box-shadow:inset 0 .5px #ffffff12,0 0 0 1px color-mix(in srgb,var(--board-tint) 30%,transparent),0 4px 18px color-mix(in srgb,var(--board-tint) 16%,transparent)}.simui-statusboard-ic{display:inline-flex;color:var(--muted)}.simui-statusboard.is-attn .simui-statusboard-ic{color:var(--board-tint)}.simui-statusboard-word{font-size:17px;font-weight:500;letter-spacing:-.2px;color:var(--text)}.simui-statusboard.is-attn .simui-statusboard-word{color:var(--board-tint)}.simui-statusboard-name{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard .simui-state{font-size:11px}.simui-attn{margin-bottom:2px}.simui-attn.is-clear{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:14px;background:color-mix(in srgb,var(--text) 3%,var(--surface))}.simui-attn-ic{display:inline-flex;color:var(--up)}.simui-attn-ic.warn{color:var(--warn)}.simui-attn-clear{font-size:13px;color:var(--muted)}.simui-attn.is-active{display:flex;flex-direction:column;gap:10px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--warn) 8%,var(--surface));box-shadow:0 0 0 1px color-mix(in srgb,var(--warn) 26%,transparent)}.simui-attn-head{display:flex;align-items:center;gap:8px}.simui-attn-title{font-size:13px;font-weight:600;color:var(--warn)}.simui-attn-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-ambient-canvas{position:absolute;inset:-16px 0 auto;height:460px;z-index:0;pointer-events:none;opacity:var(--amb-opacity, .12);transition:opacity .6s ease,background .6s ease}.simui-ambient-canvas.is-field{background:radial-gradient(120% 80% at 18% -10%,color-mix(in srgb,var(--warm) 70%,transparent),transparent 56%),radial-gradient(130% 90% at 84% -4%,var(--amb-phase, var(--slate)),transparent 60%)}.simui-ambient-canvas.is-field:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background:radial-gradient(120% 80% at 30% 0%,var(--warm),transparent 58%)}.simui-ambient-canvas.is-field:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:calc(var(--amb-cool, 0) * .7);background:radial-gradient(120% 90% at 80% 6%,var(--cool),transparent 60%)}.simui-ambient-canvas.is-dots{inset:0;height:auto;background-image:radial-gradient(color-mix(in srgb,var(--amb-phase, var(--warm)) 80%,transparent) .9px,transparent 1px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%);mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%)}.simui-ambient-canvas.is-dots:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background-image:radial-gradient(var(--warm) 1px,transparent 1.4px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,transparent 70%);mask-image:linear-gradient(to bottom,#000 0%,transparent 70%)}.simui-cat-content{position:relative}.simui-cat-layer{position:relative;z-index:1}.simui-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.simui-bloom{display:flex;flex-direction:column;gap:18px;align-items:stretch}.simui-bloom.light .simui-bloom-wheelwrap,.simui-bloom-dialwrap{display:flex;justify-content:center}.simui-bloom-sliders{display:flex;flex-direction:column;gap:9px}.simui-bloom-modes{align-self:stretch;flex-wrap:wrap}.simui-bloom-dialpair{display:flex;gap:18px;justify-content:center}.simui-bloom-dialcol{display:flex;flex-direction:column;align-items:center;gap:6px}.simui-bloom-readonly{font-size:30px;font-weight:300;color:var(--text);text-align:center;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wheel{position:relative;flex:none;border-radius:50%;cursor:pointer;touch-action:none;outline:none}.simui-wheel:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 55%,transparent)}.simui-wheel-disc{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at center,#fff,#fff0 70%),conic-gradient(from 90deg,red,#ff0,#0f0,#0ff,#00f,#f0f,red);box-shadow:inset 0 0 0 1px var(--hairline)}.simui-wheel-thumb{position:absolute;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid #fff;box-shadow:0 1px 5px #00000080;pointer-events:none}.simui-dial{flex:none;cursor:pointer;touch-action:none;outline:none}.simui-dial:focus-visible{filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 70%,transparent))}.simui-dial-track{stroke:var(--faint)}.simui-dial-knob{stroke:var(--surface);stroke-width:2}.simui-dial-value{font-size:40px;font-weight:300;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-dial-unit{font-size:20px}.simui-dial-current{font-size:12px}.simui-tile.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 12%,var(--surface));box-shadow:inset 0 .5px #ffffff0f,inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 22%,transparent)}.simui-tile.is-album-tinted .simui-art{box-shadow:0 2px 16px color-mix(in srgb,var(--album-tint) 38%,transparent)}.simui-dh{display:flex;flex-direction:column;gap:2px}.simui-dh-value{display:flex;align-items:baseline;gap:4px;font-size:44px;font-weight:300;line-height:1;letter-spacing:-1px;color:var(--text)}.simui-dh-value.warm{color:var(--warm)}.simui-dh-value.cool{color:var(--cool)}.simui-dh-value.accent{color:var(--accent)}.simui-dh-value.warn{color:var(--warn)}.simui-dh-value.up{color:var(--up)}.simui-dh-value.down{color:var(--down)}.simui-dh-unit{font-size:20px;font-weight:400;color:var(--muted)}.simui-dh-sub{font-size:13px;color:var(--muted)}.simui-dh-since{font-size:12px;color:var(--muted);opacity:.7}.simui-detail-field{display:flex;flex-direction:column;gap:8px}.simui-detail-seg{flex-wrap:wrap;align-self:flex-start;max-width:100%}.simui-detail-chart .simui-metric{background:var(--surface-2);border-radius:12px;padding:12px}.simui-detail-pillrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px}.simui-detail-pilllabel{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-detail-pillval{font-size:13px;color:var(--text)}.simui-detail-buttons{display:flex;align-items:center;gap:8px}.simui-detail-buttons .simui-sbtn{width:36px;height:30px}.simui-detail-buttons.wide{gap:10px}.simui-segbtn.lg{height:38px;flex:1;gap:7px;font-size:13px}.simui-md-now{display:flex;align-items:center;gap:14px;padding:12px;border-radius:16px;background:var(--surface-2)}.simui-md-now.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 14%,var(--surface));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 24%,transparent)}.simui-md-art{flex:none;width:84px;height:84px;border-radius:12px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-md-now.is-album-tinted .simui-md-art{box-shadow:0 2px 18px color-mix(in srgb,var(--album-tint) 40%,transparent)}.simui-md-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.simui-md-title{font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-artist{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-state{margin-top:2px;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)}.simui-md-transport{display:flex;align-items:center;justify-content:center;gap:22px}.simui-md-btn{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer;transition:color .12s ease}.simui-md-btn:hover:not(:disabled){color:var(--accent)}.simui-md-btn:disabled{opacity:.4;cursor:default}.simui-md-btn.play{width:48px;height:48px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-md-btn.play:hover:not(:disabled){color:var(--surface);opacity:.88}.simui-md-volrow{display:flex;align-items:center;gap:12px}.simui-md-volrow .simui-slider{flex:1}.simui-md-volrow .simui-qc-val{flex:none;min-width:38px;text-align:right}.simui-root{--focus-ring: 0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-ctxitem:focus-visible,.simui-segbtn:focus-visible,.simui-ftoggle:focus-visible,.simui-sbtn:focus-visible,.simui-iconbtn-h:focus-visible,.simui-range-btn:focus-visible,.simui-card-grab:focus-visible,.simui-card-btn:focus-visible,.simui-qc-swatch:focus-visible,.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{outline:none;box-shadow:var(--focus-ring)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-qc-swatch:focus-visible{border-radius:999px}.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{border-radius:999px}.simui-sheet:focus-visible,.simui-ctxmenu:focus-visible{outline:none;box-shadow:var(--focus-ring)}@media(prefers-reduced-motion:reduce){.simui-root *,.simui-root *:before,.simui-root *:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;transition-delay:0ms!important;scroll-behavior:auto!important}}.simui-camera{padding:0;overflow:hidden;gap:0}.simui-cam-frame{position:relative;width:100%;aspect-ratio:16 / 10;min-height:96px;background:var(--surface-2)}.simui-cam-img{display:block;width:100%;height:100%;object-fit:cover}.simui-cam-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--muted);background:var(--surface-2)}.simui-cam-cap{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:8px;padding:18px 12px 8px;background:linear-gradient(to top,rgba(0,0,0,.55),transparent)}.simui-cam-name{font-size:12px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0,0,0,.5)}.simui-cam-state{margin-left:auto;font-size:11px;color:#fffc}.simui-weather{gap:10px}.simui-wx-head{display:flex;align-items:center;gap:11px}.simui-wx-ic{display:inline-flex;flex:none;color:var(--cool)}.simui-wx-now{display:flex;flex-direction:column;gap:1px;min-width:0}.simui-wx-temp{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wx-cond{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-wx-fc{display:flex;gap:6px}.simui-wx-fcd{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border-radius:9px;background:color-mix(in srgb,var(--text) 4%,transparent)}.simui-wx-fcl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px}.simui-wx-fci{display:inline-flex;color:var(--muted)}.simui-wx-fct{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge{align-items:stretch;gap:6px}.simui-gauge-wrap{position:relative;display:flex;align-items:center;justify-content:center}.simui-gauge-svg{display:block}.simui-gauge-track{stroke:var(--faint)}.simui-gauge-fill{stroke:var(--accent);transition:stroke-dasharray .25s ease}.simui-gauge-readout{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none}.simui-gauge-val{font-size:20px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge-unit{font-size:11px;color:var(--muted);font-weight:500}.simui-action{justify-content:center}.simui-action.is-clickable:hover .simui-action-run{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-action-run{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:999px;border:1px solid var(--faint);color:var(--muted);transition:color .12s ease,border-color .12s ease}.simui-eb-full{max-width:480px;margin:48px auto;padding:20px 22px;background:var(--surface);border:1px solid var(--hairline);border-radius:var(--radius);color:var(--text)}.simui-eb-title{font-size:15px;font-weight:600;letter-spacing:-.2px;margin-bottom:6px}.simui-eb-body{font-size:13px;line-height:1.5;color:var(--muted)}.simui-eb-compact{margin:8px 2px;padding:10px 12px;font-size:12px;color:var(--muted);background:color-mix(in srgb,var(--text) 3%,var(--surface));border:1px solid var(--hairline);border-radius:10px}.simui-conn-banner{display:flex;align-items:center;gap:8px;margin:0 0 12px;padding:7px 12px;font-size:12px;font-weight:500;color:var(--warn);background:color-mix(in srgb,var(--warn) 9%,var(--surface));border:1px solid color-mix(in srgb,var(--warn) 28%,var(--faint));border-radius:10px}.simui-conn-ic{flex:none;color:var(--warn)}';
class c5 extends HTMLElement {
  constructor() {
    super(...arguments);
    ws(this, "_root");
    ws(this, "_mount");
    ws(this, "_hass");
    ws(this, "_listeners", /* @__PURE__ */ new Set());
    ws(this, "_source");
  }
  set hass(i) {
    this._hass = i, this._listeners.forEach((a) => a());
  }
  get hass() {
    return this._hass;
  }
  set narrow(i) {
  }
  set route(i) {
  }
  set panel(i) {
  }
  connectedCallback() {
    if (!this._source) {
      const i = this;
      this._source = {
        subscribe(a) {
          return i._listeners.add(a), () => i._listeners.delete(a);
        },
        getStates: () => i._hass ? i._hass.states : {},
        callService: (a, r, c, u) => i._hass.callService(a, r, c, u),
        get connection() {
          return i._hass ? i._hass.connection : void 0;
        }
      };
    }
    if (!this._mount) {
      const i = document.createElement("style");
      i.textContent = o5, this.appendChild(i), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = _w.createRoot(this._mount), this._root.render(
        /* @__PURE__ */ h.jsx(n_, { source: this._source, children: /* @__PURE__ */ h.jsx(r5, {}) })
      );
    }
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", c5);
