var Jx = Object.defineProperty;
var Px = (s, t, i) => t in s ? Jx(s, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[t] = i;
var hs = (s, t, i) => Px(s, typeof t != "symbol" ? t + "" : t, i);
function tw(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Eh = { exports: {} }, Nl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eg;
function ew() {
  if (eg) return Nl;
  eg = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function i(a, r, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), r.key !== void 0 && (c = "" + r.key), "key" in r) {
      u = {};
      for (var d in r)
        d !== "key" && (u[d] = r[d]);
    } else u = r;
    return r = u.ref, {
      $$typeof: s,
      type: a,
      key: c,
      ref: r !== void 0 ? r : null,
      props: u
    };
  }
  return Nl.Fragment = t, Nl.jsx = i, Nl.jsxs = i, Nl;
}
var ig;
function iw() {
  return ig || (ig = 1, Eh.exports = ew()), Eh.exports;
}
var m = iw(), kh = { exports: {} }, Cl = {}, zh = { exports: {} }, Th = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ng;
function nw() {
  return ng || (ng = 1, (function(s) {
    function t(L, Z) {
      var it = L.length;
      L.push(Z);
      t: for (; 0 < it; ) {
        var ht = it - 1 >>> 1, ft = L[ht];
        if (0 < r(ft, Z))
          L[ht] = Z, L[it] = ft, it = ht;
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
        t: for (var ht = 0, ft = L.length, k = ft >>> 1; ht < k; ) {
          var Q = 2 * (ht + 1) - 1, I = L[Q], tt = Q + 1, dt = L[tt];
          if (0 > r(I, it))
            tt < ft && 0 > r(dt, I) ? (L[ht] = dt, L[tt] = it, ht = tt) : (L[ht] = I, L[Q] = it, ht = Q);
          else if (tt < ft && 0 > r(dt, it))
            L[ht] = dt, L[tt] = it, ht = tt;
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
      var u = performance;
      s.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, d = c.now();
      s.unstable_now = function() {
        return c.now() - d;
      };
    }
    var p = [], v = [], g = 1, b = null, x = 3, S = !1, w = !1, M = !1, N = !1, E = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function D(L) {
      for (var Z = i(v); Z !== null; ) {
        if (Z.callback === null) a(v);
        else if (Z.startTime <= L)
          a(v), Z.sortIndex = Z.expirationTime, t(p, Z);
        else break;
        Z = i(v);
      }
    }
    function V(L) {
      if (M = !1, D(L), !w)
        if (i(p) !== null)
          w = !0, G || (G = !0, F());
        else {
          var Z = i(v);
          Z !== null && Tt(V, Z.startTime - L);
        }
    }
    var G = !1, A = -1, X = 5, J = -1;
    function rt() {
      return N ? !0 : !(s.unstable_now() - J < X);
    }
    function st() {
      if (N = !1, G) {
        var L = s.unstable_now();
        J = L;
        var Z = !0;
        try {
          t: {
            w = !1, M && (M = !1, T(A), A = -1), S = !0;
            var it = x;
            try {
              e: {
                for (D(L), b = i(p); b !== null && !(b.expirationTime > L && rt()); ) {
                  var ht = b.callback;
                  if (typeof ht == "function") {
                    b.callback = null, x = b.priorityLevel;
                    var ft = ht(
                      b.expirationTime <= L
                    );
                    if (L = s.unstable_now(), typeof ft == "function") {
                      b.callback = ft, D(L), Z = !0;
                      break e;
                    }
                    b === i(p) && a(p), D(L);
                  } else a(p);
                  b = i(p);
                }
                if (b !== null) Z = !0;
                else {
                  var k = i(v);
                  k !== null && Tt(
                    V,
                    k.startTime - L
                  ), Z = !1;
                }
              }
              break t;
            } finally {
              b = null, x = it, S = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? F() : G = !1;
        }
      }
    }
    var F;
    if (typeof R == "function")
      F = function() {
        R(st);
      };
    else if (typeof MessageChannel < "u") {
      var vt = new MessageChannel(), bt = vt.port2;
      vt.port1.onmessage = st, F = function() {
        bt.postMessage(null);
      };
    } else
      F = function() {
        E(st, 0);
      };
    function Tt(L, Z) {
      A = E(function() {
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
      return x;
    }, s.unstable_next = function(L) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = x;
      }
      var it = x;
      x = Z;
      try {
        return L();
      } finally {
        x = it;
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
      var it = x;
      x = L;
      try {
        return Z();
      } finally {
        x = it;
      }
    }, s.unstable_scheduleCallback = function(L, Z, it) {
      var ht = s.unstable_now();
      switch (typeof it == "object" && it !== null ? (it = it.delay, it = typeof it == "number" && 0 < it ? ht + it : ht) : it = ht, L) {
        case 1:
          var ft = -1;
          break;
        case 2:
          ft = 250;
          break;
        case 5:
          ft = 1073741823;
          break;
        case 4:
          ft = 1e4;
          break;
        default:
          ft = 5e3;
      }
      return ft = it + ft, L = {
        id: g++,
        callback: Z,
        priorityLevel: L,
        startTime: it,
        expirationTime: ft,
        sortIndex: -1
      }, it > ht ? (L.sortIndex = it, t(v, L), i(p) === null && L === i(v) && (M ? (T(A), A = -1) : M = !0, Tt(V, it - ht))) : (L.sortIndex = ft, t(p, L), w || S || (w = !0, G || (G = !0, F()))), L;
    }, s.unstable_shouldYield = rt, s.unstable_wrapCallback = function(L) {
      var Z = x;
      return function() {
        var it = x;
        x = Z;
        try {
          return L.apply(this, arguments);
        } finally {
          x = it;
        }
      };
    };
  })(Th)), Th;
}
var sg;
function sw() {
  return sg || (sg = 1, zh.exports = nw()), zh.exports;
}
var Oh = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ag;
function aw() {
  if (ag) return mt;
  ag = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), i = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), r = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.consumer"), c = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), b = /* @__PURE__ */ Symbol.for("react.activity"), x = Symbol.iterator;
  function S(k) {
    return k === null || typeof k != "object" ? null : (k = x && k[x] || k["@@iterator"], typeof k == "function" ? k : null);
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
  function E(k, Q, I) {
    this.props = k, this.context = Q, this.refs = N, this.updater = I || w;
  }
  E.prototype.isReactComponent = {}, E.prototype.setState = function(k, Q) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, Q, "setState");
  }, E.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function T() {
  }
  T.prototype = E.prototype;
  function R(k, Q, I) {
    this.props = k, this.context = Q, this.refs = N, this.updater = I || w;
  }
  var D = R.prototype = new T();
  D.constructor = R, M(D, E.prototype), D.isPureReactComponent = !0;
  var V = Array.isArray;
  function G() {
  }
  var A = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function J(k, Q, I) {
    var tt = I.ref;
    return {
      $$typeof: s,
      type: k,
      key: Q,
      ref: tt !== void 0 ? tt : null,
      props: I
    };
  }
  function rt(k, Q) {
    return J(k.type, Q, k.props);
  }
  function st(k) {
    return typeof k == "object" && k !== null && k.$$typeof === s;
  }
  function F(k) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(I) {
      return Q[I];
    });
  }
  var vt = /\/+/g;
  function bt(k, Q) {
    return typeof k == "object" && k !== null && k.key != null ? F("" + k.key) : Q.toString(36);
  }
  function Tt(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(G, G) : (k.status = "pending", k.then(
          function(Q) {
            k.status === "pending" && (k.status = "fulfilled", k.value = Q);
          },
          function(Q) {
            k.status === "pending" && (k.status = "rejected", k.reason = Q);
          }
        )), k.status) {
          case "fulfilled":
            return k.value;
          case "rejected":
            throw k.reason;
        }
    }
    throw k;
  }
  function L(k, Q, I, tt, dt) {
    var ct = typeof k;
    (ct === "undefined" || ct === "boolean") && (k = null);
    var Mt = !1;
    if (k === null) Mt = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          Mt = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case s:
            case t:
              Mt = !0;
              break;
            case g:
              return Mt = k._init, L(
                Mt(k._payload),
                Q,
                I,
                tt,
                dt
              );
          }
      }
    if (Mt)
      return dt = dt(k), Mt = tt === "" ? "." + bt(k, 0) : tt, V(dt) ? (I = "", Mt != null && (I = Mt.replace(vt, "$&/") + "/"), L(dt, Q, I, "", function(Ct) {
        return Ct;
      })) : dt != null && (st(dt) && (dt = rt(
        dt,
        I + (dt.key == null || k && k.key === dt.key ? "" : ("" + dt.key).replace(
          vt,
          "$&/"
        ) + "/") + Mt
      )), Q.push(dt)), 1;
    Mt = 0;
    var Gt = tt === "" ? "." : tt + ":";
    if (V(k))
      for (var Ot = 0; Ot < k.length; Ot++)
        tt = k[Ot], ct = Gt + bt(tt, Ot), Mt += L(
          tt,
          Q,
          I,
          ct,
          dt
        );
    else if (Ot = S(k), typeof Ot == "function")
      for (k = Ot.call(k), Ot = 0; !(tt = k.next()).done; )
        tt = tt.value, ct = Gt + bt(tt, Ot++), Mt += L(
          tt,
          Q,
          I,
          ct,
          dt
        );
    else if (ct === "object") {
      if (typeof k.then == "function")
        return L(
          Tt(k),
          Q,
          I,
          tt,
          dt
        );
      throw Q = String(k), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Mt;
  }
  function Z(k, Q, I) {
    if (k == null) return k;
    var tt = [], dt = 0;
    return L(k, tt, "", "", function(ct) {
      return Q.call(I, ct, dt++);
    }), tt;
  }
  function it(k) {
    if (k._status === -1) {
      var Q = k._result;
      Q = Q(), Q.then(
        function(I) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = I);
        },
        function(I) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = I);
        }
      ), k._status === -1 && (k._status = 0, k._result = Q);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, ft = {
    map: Z,
    forEach: function(k, Q, I) {
      Z(
        k,
        function() {
          Q.apply(this, arguments);
        },
        I
      );
    },
    count: function(k) {
      var Q = 0;
      return Z(k, function() {
        Q++;
      }), Q;
    },
    toArray: function(k) {
      return Z(k, function(Q) {
        return Q;
      }) || [];
    },
    only: function(k) {
      if (!st(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return mt.Activity = b, mt.Children = ft, mt.Component = E, mt.Fragment = i, mt.Profiler = r, mt.PureComponent = R, mt.StrictMode = a, mt.Suspense = p, mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, mt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return A.H.useMemoCache(k);
    }
  }, mt.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, mt.cacheSignal = function() {
    return null;
  }, mt.cloneElement = function(k, Q, I) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var tt = M({}, k.props), dt = k.key;
    if (Q != null)
      for (ct in Q.key !== void 0 && (dt = "" + Q.key), Q)
        !X.call(Q, ct) || ct === "key" || ct === "__self" || ct === "__source" || ct === "ref" && Q.ref === void 0 || (tt[ct] = Q[ct]);
    var ct = arguments.length - 2;
    if (ct === 1) tt.children = I;
    else if (1 < ct) {
      for (var Mt = Array(ct), Gt = 0; Gt < ct; Gt++)
        Mt[Gt] = arguments[Gt + 2];
      tt.children = Mt;
    }
    return J(k.type, dt, tt);
  }, mt.createContext = function(k) {
    return k = {
      $$typeof: c,
      _currentValue: k,
      _currentValue2: k,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, k.Provider = k, k.Consumer = {
      $$typeof: u,
      _context: k
    }, k;
  }, mt.createElement = function(k, Q, I) {
    var tt, dt = {}, ct = null;
    if (Q != null)
      for (tt in Q.key !== void 0 && (ct = "" + Q.key), Q)
        X.call(Q, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (dt[tt] = Q[tt]);
    var Mt = arguments.length - 2;
    if (Mt === 1) dt.children = I;
    else if (1 < Mt) {
      for (var Gt = Array(Mt), Ot = 0; Ot < Mt; Ot++)
        Gt[Ot] = arguments[Ot + 2];
      dt.children = Gt;
    }
    if (k && k.defaultProps)
      for (tt in Mt = k.defaultProps, Mt)
        dt[tt] === void 0 && (dt[tt] = Mt[tt]);
    return J(k, ct, dt);
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(k) {
    return { $$typeof: d, render: k };
  }, mt.isValidElement = st, mt.lazy = function(k) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: k },
      _init: it
    };
  }, mt.memo = function(k, Q) {
    return {
      $$typeof: v,
      type: k,
      compare: Q === void 0 ? null : Q
    };
  }, mt.startTransition = function(k) {
    var Q = A.T, I = {};
    A.T = I;
    try {
      var tt = k(), dt = A.S;
      dt !== null && dt(I, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(G, ht);
    } catch (ct) {
      ht(ct);
    } finally {
      Q !== null && I.types !== null && (Q.types = I.types), A.T = Q;
    }
  }, mt.unstable_useCacheRefresh = function() {
    return A.H.useCacheRefresh();
  }, mt.use = function(k) {
    return A.H.use(k);
  }, mt.useActionState = function(k, Q, I) {
    return A.H.useActionState(k, Q, I);
  }, mt.useCallback = function(k, Q) {
    return A.H.useCallback(k, Q);
  }, mt.useContext = function(k) {
    return A.H.useContext(k);
  }, mt.useDebugValue = function() {
  }, mt.useDeferredValue = function(k, Q) {
    return A.H.useDeferredValue(k, Q);
  }, mt.useEffect = function(k, Q) {
    return A.H.useEffect(k, Q);
  }, mt.useEffectEvent = function(k) {
    return A.H.useEffectEvent(k);
  }, mt.useId = function() {
    return A.H.useId();
  }, mt.useImperativeHandle = function(k, Q, I) {
    return A.H.useImperativeHandle(k, Q, I);
  }, mt.useInsertionEffect = function(k, Q) {
    return A.H.useInsertionEffect(k, Q);
  }, mt.useLayoutEffect = function(k, Q) {
    return A.H.useLayoutEffect(k, Q);
  }, mt.useMemo = function(k, Q) {
    return A.H.useMemo(k, Q);
  }, mt.useOptimistic = function(k, Q) {
    return A.H.useOptimistic(k, Q);
  }, mt.useReducer = function(k, Q, I) {
    return A.H.useReducer(k, Q, I);
  }, mt.useRef = function(k) {
    return A.H.useRef(k);
  }, mt.useState = function(k) {
    return A.H.useState(k);
  }, mt.useSyncExternalStore = function(k, Q, I) {
    return A.H.useSyncExternalStore(
      k,
      Q,
      I
    );
  }, mt.useTransition = function() {
    return A.H.useTransition();
  }, mt.version = "19.2.7", mt;
}
var lg;
function Dd() {
  return lg || (lg = 1, Oh.exports = aw()), Oh.exports;
}
var Dh = { exports: {} }, Ne = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rg;
function lw() {
  if (rg) return Ne;
  rg = 1;
  var s = Dd();
  function t(p) {
    var v = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        v += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + p + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(p, v, g) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : "" + b,
      children: p,
      containerInfo: v,
      implementation: g
    };
  }
  var c = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, v) {
    if (p === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Ne.createPortal = function(p, v) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(t(299));
    return u(p, v, null, g);
  }, Ne.flushSync = function(p) {
    var v = c.T, g = a.p;
    try {
      if (c.T = null, a.p = 2, p) return p();
    } finally {
      c.T = v, a.p = g, a.d.f();
    }
  }, Ne.preconnect = function(p, v) {
    typeof p == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, a.d.C(p, v));
  }, Ne.prefetchDNS = function(p) {
    typeof p == "string" && a.d.D(p);
  }, Ne.preinit = function(p, v) {
    if (typeof p == "string" && v && typeof v.as == "string") {
      var g = v.as, b = d(g, v.crossOrigin), x = typeof v.integrity == "string" ? v.integrity : void 0, S = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      g === "style" ? a.d.S(
        p,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: x,
          fetchPriority: S
        }
      ) : g === "script" && a.d.X(p, {
        crossOrigin: b,
        integrity: x,
        fetchPriority: S,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(p, v) {
    if (typeof p == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var g = d(
            v.as,
            v.crossOrigin
          );
          a.d.M(p, {
            crossOrigin: g,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && a.d.M(p);
  }, Ne.preload = function(p, v) {
    if (typeof p == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var g = v.as, b = d(g, v.crossOrigin);
      a.d.L(p, g, {
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
  }, Ne.preloadModule = function(p, v) {
    if (typeof p == "string")
      if (v) {
        var g = d(v.as, v.crossOrigin);
        a.d.m(p, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: g,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else a.d.m(p);
  }, Ne.requestFormReset = function(p) {
    a.d.r(p);
  }, Ne.unstable_batchedUpdates = function(p, v) {
    return p(v);
  }, Ne.useFormState = function(p, v, g) {
    return c.H.useFormState(p, v, g);
  }, Ne.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Ne.version = "19.2.7", Ne;
}
var og;
function F0() {
  if (og) return Dh.exports;
  og = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), Dh.exports = lw(), Dh.exports;
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
var ug;
function rw() {
  if (ug) return Cl;
  ug = 1;
  var s = sw(), t = Dd(), i = F0();
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
  function u(e) {
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
  function c(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (u(e) !== e)
      throw Error(a(188));
  }
  function v(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(a(188));
      return n !== e ? null : e;
    }
    for (var l = e, o = n; ; ) {
      var h = l.return;
      if (h === null) break;
      var f = h.alternate;
      if (f === null) {
        if (o = h.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (h.child === f.child) {
        for (f = h.child; f; ) {
          if (f === l) return p(h), e;
          if (f === o) return p(h), n;
          f = f.sibling;
        }
        throw Error(a(188));
      }
      if (l.return !== o.return) l = h, o = f;
      else {
        for (var y = !1, _ = h.child; _; ) {
          if (_ === l) {
            y = !0, l = h, o = f;
            break;
          }
          if (_ === o) {
            y = !0, o = h, l = f;
            break;
          }
          _ = _.sibling;
        }
        if (!y) {
          for (_ = f.child; _; ) {
            if (_ === l) {
              y = !0, l = f, o = h;
              break;
            }
            if (_ === o) {
              y = !0, o = f, l = h;
              break;
            }
            _ = _.sibling;
          }
          if (!y) throw Error(a(189));
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
  var b = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), M = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), R = /* @__PURE__ */ Symbol.for("react.context"), D = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), A = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), J = /* @__PURE__ */ Symbol.for("react.activity"), rt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), st = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object" ? null : (e = st && e[st] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var vt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function bt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === vt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case M:
        return "Fragment";
      case E:
        return "Profiler";
      case N:
        return "StrictMode";
      case V:
        return "Suspense";
      case G:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case R:
          return e.displayName || "Context";
        case T:
          return (e._context.displayName || "Context") + ".Consumer";
        case D:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case A:
          return n = e.displayName || null, n !== null ? n : bt(e.type) || "Memo";
        case X:
          n = e._payload, e = e._init;
          try {
            return bt(e(n));
          } catch {
          }
      }
    return null;
  }
  var Tt = Array.isArray, L = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, it = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], ft = -1;
  function k(e) {
    return { current: e };
  }
  function Q(e) {
    0 > ft || (e.current = ht[ft], ht[ft] = null, ft--);
  }
  function I(e, n) {
    ft++, ht[ft] = e.current, e.current = n;
  }
  var tt = k(null), dt = k(null), ct = k(null), Mt = k(null);
  function Gt(e, n) {
    switch (I(ct, n), I(dt, e), I(tt, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Mv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Mv(n), e = Nv(n, e);
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
    Q(tt), I(tt, e);
  }
  function Ot() {
    Q(tt), Q(dt), Q(ct);
  }
  function Ct(e) {
    e.memoizedState !== null && I(Mt, e);
    var n = tt.current, l = Nv(n, e.type);
    n !== l && (I(dt, e), I(tt, l));
  }
  function Ci(e) {
    dt.current === e && (Q(tt), Q(dt)), Mt.current === e && (Q(Mt), wl._currentValue = it);
  }
  var ze, Hi;
  function me(e) {
    if (ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var n = l.stack.trim().match(/\n( *(at )?)/);
        ze = n && n[1] || "", Hi = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ze + e + Hi;
  }
  var ji = !1;
  function Ei(e, n) {
    if (!e || ji) return "";
    ji = !0;
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
      var h = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      h && h.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = o.DetermineComponentFrameRoot(), y = f[0], _ = f[1];
      if (y && _) {
        var j = y.split(`
`), U = _.split(`
`);
        for (h = o = 0; o < j.length && !j[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; h < U.length && !U[h].includes(
          "DetermineComponentFrameRoot"
        ); )
          h++;
        if (o === j.length || h === U.length)
          for (o = j.length - 1, h = U.length - 1; 1 <= o && 0 <= h && j[o] !== U[h]; )
            h--;
        for (; 1 <= o && 0 <= h; o--, h--)
          if (j[o] !== U[h]) {
            if (o !== 1 || h !== 1)
              do
                if (o--, h--, 0 > h || j[o] !== U[h]) {
                  var $ = `
` + j[o].replace(" at new ", " at ");
                  return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), $;
                }
              while (1 <= o && 0 <= h);
            break;
          }
      }
    } finally {
      ji = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? me(l) : "";
  }
  function or(e, n) {
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
  function Aa(e) {
    try {
      var n = "", l = null;
      do
        n += or(e, l), l = e, e = e.return;
      while (e);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Gn = Object.prototype.hasOwnProperty, ti = s.unstable_scheduleCallback, hn = s.unstable_cancelCallback, Es = s.unstable_shouldYield, ur = s.unstable_requestPaint, _e = s.unstable_now, vu = s.unstable_getCurrentPriorityLevel, cr = s.unstable_ImmediatePriority, qi = s.unstable_UserBlockingPriority, gi = s.unstable_NormalPriority, Kn = s.unstable_LowPriority, Ra = s.unstable_IdlePriority, ki = s.log, hr = s.unstable_setDisableYieldValue, Xn = null, Ce = null;
  function ei(e) {
    if (typeof ki == "function" && hr(e), Ce && typeof Ce.setStrictMode == "function")
      try {
        Ce.setStrictMode(Xn, e);
      } catch {
      }
  }
  var Se = Math.clz32 ? Math.clz32 : bu, gu = Math.log, dr = Math.LN2;
  function bu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gu(e) / dr | 0) | 0;
  }
  var ks = 256, zs = 262144, It = 4194304;
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
  function ue(e, n, l) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var h = 0, f = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var _ = o & 134217727;
    return _ !== 0 ? (o = _ & ~f, o !== 0 ? h = Ft(o) : (y &= _, y !== 0 ? h = Ft(y) : l || (l = _ & ~e, l !== 0 && (h = Ft(l))))) : (_ = o & ~f, _ !== 0 ? h = Ft(_) : y !== 0 ? h = Ft(y) : l || (l = o & ~e, l !== 0 && (h = Ft(l)))), h === 0 ? 0 : n !== 0 && n !== h && (n & f) === 0 && (f = h & -h, l = n & -n, f >= l || f === 32 && (l & 4194048) !== 0) ? n : h;
  }
  function Te(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Oe(e, n) {
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
  function De(e) {
    for (var n = [], l = 0; 31 > l; l++) n.push(e);
    return n;
  }
  function ii(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function le(e, n, l, o, h, f) {
    var y = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var _ = e.entanglements, j = e.expirationTimes, U = e.hiddenUpdates;
    for (l = y & ~l; 0 < l; ) {
      var $ = 31 - Se(l), K = 1 << $;
      _[$] = 0, j[$] = -1;
      var H = U[$];
      if (H !== null)
        for (U[$] = null, $ = 0; $ < H.length; $++) {
          var q = H[$];
          q !== null && (q.lane &= -536870913);
        }
      l &= ~K;
    }
    o !== 0 && bi(e, o, 0), f !== 0 && h === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(y & ~n));
  }
  function bi(e, n, l) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var o = 31 - Se(n);
    e.entangledLanes |= n, e.entanglements[o] = e.entanglements[o] | 1073741824 | l & 261930;
  }
  function Ge(e, n) {
    var l = e.entangledLanes |= n;
    for (e = e.entanglements; l; ) {
      var o = 31 - Se(l), h = 1 << o;
      h & n | e[o] & n && (e[o] |= n), l &= ~h;
    }
  }
  function ni(e, n) {
    var l = n & -n;
    return l = (l & 42) !== 0 ? 1 : Qi(l), (l & (e.suspendedLanes | n)) !== 0 ? 0 : l;
  }
  function Qi(e) {
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
  function $i(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function yi() {
    var e = Z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Zv(e.type));
  }
  function dn(e, n) {
    var l = Z.p;
    try {
      return Z.p = e, n();
    } finally {
      Z.p = l;
    }
  }
  var si = Math.random().toString(36).slice(2), pe = "__reactFiber$" + si, Ae = "__reactProps$" + si, Ts = "__reactContainer$" + si, yu = "__reactEvents$" + si, Q1 = "__reactListeners$" + si, $1 = "__reactHandles$" + si, hf = "__reactResources$" + si, La = "__reactMarker$" + si;
  function xu(e) {
    delete e[pe], delete e[Ae], delete e[yu], delete e[Q1], delete e[$1];
  }
  function Os(e) {
    var n = e[pe];
    if (n) return n;
    for (var l = e.parentNode; l; ) {
      if (n = l[Ts] || l[pe]) {
        if (l = n.alternate, n.child !== null || l !== null && l.child !== null)
          for (e = Ov(e); e !== null; ) {
            if (l = e[pe]) return l;
            e = Ov(e);
          }
        return n;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Ds(e) {
    if (e = e[pe] || e[Ts]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Ba(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(a(33));
  }
  function As(e) {
    var n = e[hf];
    return n || (n = e[hf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function ce(e) {
    e[La] = !0;
  }
  var df = /* @__PURE__ */ new Set(), ff = {};
  function Zn(e, n) {
    Rs(e, n), Rs(e + "Capture", n);
  }
  function Rs(e, n) {
    for (ff[e] = n, e = 0; e < n.length; e++)
      df.add(n[e]);
  }
  var V1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), mf = {}, pf = {};
  function Y1(e) {
    return Gn.call(pf, e) ? !0 : Gn.call(mf, e) ? !1 : V1.test(e) ? pf[e] = !0 : (mf[e] = !0, !1);
  }
  function fr(e, n, l) {
    if (Y1(n))
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
  function mr(e, n, l) {
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
  function Vi(e, n, l, o) {
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
  function vf(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function G1(e, n, l) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var h = o.get, f = o.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return h.call(this);
        },
        set: function(y) {
          l = "" + y, f.call(this, y);
        }
      }), Object.defineProperty(e, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(y) {
          l = "" + y;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function wu(e) {
    if (!e._valueTracker) {
      var n = vf(e) ? "checked" : "value";
      e._valueTracker = G1(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function gf(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var l = n.getValue(), o = "";
    return e && (o = vf(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== l ? (n.setValue(e), !0) : !1;
  }
  function pr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var K1 = /[\n"\\]/g;
  function li(e) {
    return e.replace(
      K1,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function _u(e, n, l, o, h, f, y, _) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), n != null ? y === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + ai(n)) : e.value !== "" + ai(n) && (e.value = "" + ai(n)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), n != null ? Su(e, y, ai(n)) : l != null ? Su(e, y, ai(l)) : o != null && e.removeAttribute("value"), h == null && f != null && (e.defaultChecked = !!f), h != null && (e.checked = h && typeof h != "function" && typeof h != "symbol"), _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? e.name = "" + ai(_) : e.removeAttribute("name");
  }
  function bf(e, n, l, o, h, f, y, _) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || l != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        wu(e);
        return;
      }
      l = l != null ? "" + ai(l) : "", n = n != null ? "" + ai(n) : l, _ || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = o ?? h, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = _ ? e.checked : !!o, e.defaultChecked = !!o, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), wu(e);
  }
  function Su(e, n, l) {
    n === "number" && pr(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Ls(e, n, l, o) {
    if (e = e.options, n) {
      n = {};
      for (var h = 0; h < l.length; h++)
        n["$" + l[h]] = !0;
      for (l = 0; l < e.length; l++)
        h = n.hasOwnProperty("$" + e[l].value), e[l].selected !== h && (e[l].selected = h), h && o && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + ai(l), n = null, h = 0; h < e.length; h++) {
        if (e[h].value === l) {
          e[h].selected = !0, o && (e[h].defaultSelected = !0);
          return;
        }
        n !== null || e[h].disabled || (n = e[h]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function yf(e, n, l) {
    if (n != null && (n = "" + ai(n), n !== e.value && (e.value = n), l == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = l != null ? "" + ai(l) : "";
  }
  function xf(e, n, l, o) {
    if (n == null) {
      if (o != null) {
        if (l != null) throw Error(a(92));
        if (Tt(o)) {
          if (1 < o.length) throw Error(a(93));
          o = o[0];
        }
        l = o;
      }
      l == null && (l = ""), n = l;
    }
    l = ai(n), e.defaultValue = l, o = e.textContent, o === l && o !== "" && o !== null && (e.value = o), wu(e);
  }
  function Bs(e, n) {
    if (n) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var X1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function wf(e, n, l) {
    var o = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? o ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : o ? e.setProperty(n, l) : typeof l != "number" || l === 0 || X1.has(n) ? n === "float" ? e.cssFloat = l : e[n] = ("" + l).trim() : e[n] = l + "px";
  }
  function _f(e, n, l) {
    if (n != null && typeof n != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var o in l)
        !l.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var h in n)
        o = n[h], n.hasOwnProperty(h) && l[h] !== o && wf(e, h, o);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && wf(e, f, n[f]);
  }
  function Mu(e) {
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
  var Z1 = /* @__PURE__ */ new Map([
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
  ]), W1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vr(e) {
    return W1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Yi() {
  }
  var Nu = null;
  function Cu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Us = null, Hs = null;
  function Sf(e) {
    var n = Ds(e);
    if (n && (e = n.stateNode)) {
      var l = e[Ae] || null;
      t: switch (e = n.stateNode, n.type) {
        case "input":
          if (_u(
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
                var h = o[Ae] || null;
                if (!h) throw Error(a(90));
                _u(
                  o,
                  h.value,
                  h.defaultValue,
                  h.defaultValue,
                  h.checked,
                  h.defaultChecked,
                  h.type,
                  h.name
                );
              }
            }
            for (n = 0; n < l.length; n++)
              o = l[n], o.form === e.form && gf(o);
          }
          break t;
        case "textarea":
          yf(e, l.value, l.defaultValue);
          break t;
        case "select":
          n = l.value, n != null && Ls(e, !!l.multiple, n, !1);
      }
    }
  }
  var ju = !1;
  function Mf(e, n, l) {
    if (ju) return e(n, l);
    ju = !0;
    try {
      var o = e(n);
      return o;
    } finally {
      if (ju = !1, (Us !== null || Hs !== null) && (no(), Us && (n = Us, e = Hs, Hs = Us = null, Sf(n), e)))
        for (n = 0; n < e.length; n++) Sf(e[n]);
    }
  }
  function Ua(e, n) {
    var l = e.stateNode;
    if (l === null) return null;
    var o = l[Ae] || null;
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
  var Gi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Eu = !1;
  if (Gi)
    try {
      var Ha = {};
      Object.defineProperty(Ha, "passive", {
        get: function() {
          Eu = !0;
        }
      }), window.addEventListener("test", Ha, Ha), window.removeEventListener("test", Ha, Ha);
    } catch {
      Eu = !1;
    }
  var fn = null, ku = null, gr = null;
  function Nf() {
    if (gr) return gr;
    var e, n = ku, l = n.length, o, h = "value" in fn ? fn.value : fn.textContent, f = h.length;
    for (e = 0; e < l && n[e] === h[e]; e++) ;
    var y = l - e;
    for (o = 1; o <= y && n[l - o] === h[f - o]; o++) ;
    return gr = h.slice(e, 1 < o ? 1 - o : void 0);
  }
  function br(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function yr() {
    return !0;
  }
  function Cf() {
    return !1;
  }
  function Re(e) {
    function n(l, o, h, f, y) {
      this._reactName = l, this._targetInst = h, this.type = o, this.nativeEvent = f, this.target = y, this.currentTarget = null;
      for (var _ in e)
        e.hasOwnProperty(_) && (l = e[_], this[_] = l ? l(f) : f[_]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? yr : Cf, this.isPropagationStopped = Cf, this;
    }
    return b(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = yr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = yr);
      },
      persist: function() {
      },
      isPersistent: yr
    }), n;
  }
  var Wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, xr = Re(Wn), qa = b({}, Wn, { view: 0, detail: 0 }), I1 = Re(qa), zu, Tu, Qa, wr = b({}, qa, {
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
    getModifierState: Du,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Qa && (Qa && e.type === "mousemove" ? (zu = e.screenX - Qa.screenX, Tu = e.screenY - Qa.screenY) : Tu = zu = 0, Qa = e), zu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Tu;
    }
  }), jf = Re(wr), F1 = b({}, wr, { dataTransfer: 0 }), J1 = Re(F1), P1 = b({}, qa, { relatedTarget: 0 }), Ou = Re(P1), ty = b({}, Wn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ey = Re(ty), iy = b({}, Wn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ny = Re(iy), sy = b({}, Wn, { data: 0 }), Ef = Re(sy), ay = {
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
  }, ly = {
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
  }, ry = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function oy(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = ry[e]) ? !!n[e] : !1;
  }
  function Du() {
    return oy;
  }
  var uy = b({}, qa, {
    key: function(e) {
      if (e.key) {
        var n = ay[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = br(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ly[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Du,
    charCode: function(e) {
      return e.type === "keypress" ? br(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? br(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), cy = Re(uy), hy = b({}, wr, {
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
  }), kf = Re(hy), dy = b({}, qa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), fy = Re(dy), my = b({}, Wn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), py = Re(my), vy = b({}, wr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gy = Re(vy), by = b({}, Wn, {
    newState: 0,
    oldState: 0
  }), yy = Re(by), xy = [9, 13, 27, 32], Au = Gi && "CompositionEvent" in window, $a = null;
  Gi && "documentMode" in document && ($a = document.documentMode);
  var wy = Gi && "TextEvent" in window && !$a, zf = Gi && (!Au || $a && 8 < $a && 11 >= $a), Tf = " ", Of = !1;
  function Df(e, n) {
    switch (e) {
      case "keyup":
        return xy.indexOf(n.keyCode) !== -1;
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
  function Af(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var qs = !1;
  function _y(e, n) {
    switch (e) {
      case "compositionend":
        return Af(n);
      case "keypress":
        return n.which !== 32 ? null : (Of = !0, Tf);
      case "textInput":
        return e = n.data, e === Tf && Of ? null : e;
      default:
        return null;
    }
  }
  function Sy(e, n) {
    if (qs)
      return e === "compositionend" || !Au && Df(e, n) ? (e = Nf(), gr = ku = fn = null, qs = !1, e) : null;
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
        return zf && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var My = {
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
  function Rf(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!My[e.type] : n === "textarea";
  }
  function Lf(e, n, l, o) {
    Us ? Hs ? Hs.push(o) : Hs = [o] : Us = o, n = co(n, "onChange"), 0 < n.length && (l = new xr(
      "onChange",
      "change",
      null,
      l,
      o
    ), e.push({ event: l, listeners: n }));
  }
  var Va = null, Ya = null;
  function Ny(e) {
    bv(e, 0);
  }
  function _r(e) {
    var n = Ba(e);
    if (gf(n)) return e;
  }
  function Bf(e, n) {
    if (e === "change") return n;
  }
  var Uf = !1;
  if (Gi) {
    var Ru;
    if (Gi) {
      var Lu = "oninput" in document;
      if (!Lu) {
        var Hf = document.createElement("div");
        Hf.setAttribute("oninput", "return;"), Lu = typeof Hf.oninput == "function";
      }
      Ru = Lu;
    } else Ru = !1;
    Uf = Ru && (!document.documentMode || 9 < document.documentMode);
  }
  function qf() {
    Va && (Va.detachEvent("onpropertychange", Qf), Ya = Va = null);
  }
  function Qf(e) {
    if (e.propertyName === "value" && _r(Ya)) {
      var n = [];
      Lf(
        n,
        Ya,
        e,
        Cu(e)
      ), Mf(Ny, n);
    }
  }
  function Cy(e, n, l) {
    e === "focusin" ? (qf(), Va = n, Ya = l, Va.attachEvent("onpropertychange", Qf)) : e === "focusout" && qf();
  }
  function jy(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return _r(Ya);
  }
  function Ey(e, n) {
    if (e === "click") return _r(n);
  }
  function ky(e, n) {
    if (e === "input" || e === "change")
      return _r(n);
  }
  function zy(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Ke = typeof Object.is == "function" ? Object.is : zy;
  function Ga(e, n) {
    if (Ke(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var l = Object.keys(e), o = Object.keys(n);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var h = l[o];
      if (!Gn.call(n, h) || !Ke(e[h], n[h]))
        return !1;
    }
    return !0;
  }
  function $f(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Vf(e, n) {
    var l = $f(e);
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
      l = $f(l);
    }
  }
  function Yf(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Yf(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Gf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = pr(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof n.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = n.contentWindow;
      else break;
      n = pr(e.document);
    }
    return n;
  }
  function Bu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Ty = Gi && "documentMode" in document && 11 >= document.documentMode, Qs = null, Uu = null, Ka = null, Hu = !1;
  function Kf(e, n, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Hu || Qs == null || Qs !== pr(o) || (o = Qs, "selectionStart" in o && Bu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ka && Ga(Ka, o) || (Ka = o, o = co(Uu, "onSelect"), 0 < o.length && (n = new xr(
      "onSelect",
      "select",
      null,
      n,
      l
    ), e.push({ event: n, listeners: o }), n.target = Qs)));
  }
  function In(e, n) {
    var l = {};
    return l[e.toLowerCase()] = n.toLowerCase(), l["Webkit" + e] = "webkit" + n, l["Moz" + e] = "moz" + n, l;
  }
  var $s = {
    animationend: In("Animation", "AnimationEnd"),
    animationiteration: In("Animation", "AnimationIteration"),
    animationstart: In("Animation", "AnimationStart"),
    transitionrun: In("Transition", "TransitionRun"),
    transitionstart: In("Transition", "TransitionStart"),
    transitioncancel: In("Transition", "TransitionCancel"),
    transitionend: In("Transition", "TransitionEnd")
  }, qu = {}, Xf = {};
  Gi && (Xf = document.createElement("div").style, "AnimationEvent" in window || (delete $s.animationend.animation, delete $s.animationiteration.animation, delete $s.animationstart.animation), "TransitionEvent" in window || delete $s.transitionend.transition);
  function Fn(e) {
    if (qu[e]) return qu[e];
    if (!$s[e]) return e;
    var n = $s[e], l;
    for (l in n)
      if (n.hasOwnProperty(l) && l in Xf)
        return qu[e] = n[l];
    return e;
  }
  var Zf = Fn("animationend"), Wf = Fn("animationiteration"), If = Fn("animationstart"), Oy = Fn("transitionrun"), Dy = Fn("transitionstart"), Ay = Fn("transitioncancel"), Ff = Fn("transitionend"), Jf = /* @__PURE__ */ new Map(), Qu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Qu.push("scrollEnd");
  function xi(e, n) {
    Jf.set(e, n), Zn(n, [e]);
  }
  var Sr = typeof reportError == "function" ? reportError : function(e) {
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
  }, ri = [], Vs = 0, $u = 0;
  function Mr() {
    for (var e = Vs, n = $u = Vs = 0; n < e; ) {
      var l = ri[n];
      ri[n++] = null;
      var o = ri[n];
      ri[n++] = null;
      var h = ri[n];
      ri[n++] = null;
      var f = ri[n];
      if (ri[n++] = null, o !== null && h !== null) {
        var y = o.pending;
        y === null ? h.next = h : (h.next = y.next, y.next = h), o.pending = h;
      }
      f !== 0 && Pf(l, h, f);
    }
  }
  function Nr(e, n, l, o) {
    ri[Vs++] = e, ri[Vs++] = n, ri[Vs++] = l, ri[Vs++] = o, $u |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Vu(e, n, l, o) {
    return Nr(e, n, l, o), Cr(e);
  }
  function Jn(e, n) {
    return Nr(e, null, null, n), Cr(e);
  }
  function Pf(e, n, l) {
    e.lanes |= l;
    var o = e.alternate;
    o !== null && (o.lanes |= l);
    for (var h = !1, f = e.return; f !== null; )
      f.childLanes |= l, o = f.alternate, o !== null && (o.childLanes |= l), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (h = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, h && n !== null && (h = 31 - Se(l), e = f.hiddenUpdates, o = e[h], o === null ? e[h] = [n] : o.push(n), n.lane = l | 536870912), f) : null;
  }
  function Cr(e) {
    if (50 < ml)
      throw ml = 0, Jc = null, Error(a(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ys = {};
  function Ry(e, n, l, o) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xe(e, n, l, o) {
    return new Ry(e, n, l, o);
  }
  function Yu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ki(e, n) {
    var l = e.alternate;
    return l === null ? (l = Xe(
      e.tag,
      n,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = n, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, n = e.dependencies, l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function tm(e, n) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, n = l.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function jr(e, n, l, o, h, f) {
    var y = 0;
    if (o = e, typeof e == "function") Yu(e) && (y = 1);
    else if (typeof e == "string")
      y = qx(
        e,
        l,
        tt.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case J:
          return e = Xe(31, l, n, h), e.elementType = J, e.lanes = f, e;
        case M:
          return Pn(l.children, h, f, n);
        case N:
          y = 8, h |= 24;
          break;
        case E:
          return e = Xe(12, l, n, h | 2), e.elementType = E, e.lanes = f, e;
        case V:
          return e = Xe(13, l, n, h), e.elementType = V, e.lanes = f, e;
        case G:
          return e = Xe(19, l, n, h), e.elementType = G, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
                y = 10;
                break t;
              case T:
                y = 9;
                break t;
              case D:
                y = 11;
                break t;
              case A:
                y = 14;
                break t;
              case X:
                y = 16, o = null;
                break t;
            }
          y = 29, l = Error(
            a(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return n = Xe(y, l, n, h), n.elementType = e, n.type = o, n.lanes = f, n;
  }
  function Pn(e, n, l, o) {
    return e = Xe(7, e, o, n), e.lanes = l, e;
  }
  function Gu(e, n, l) {
    return e = Xe(6, e, null, n), e.lanes = l, e;
  }
  function em(e) {
    var n = Xe(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Ku(e, n, l) {
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
  var im = /* @__PURE__ */ new WeakMap();
  function oi(e, n) {
    if (typeof e == "object" && e !== null) {
      var l = im.get(e);
      return l !== void 0 ? l : (n = {
        value: e,
        source: n,
        stack: Aa(n)
      }, im.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Aa(n)
    };
  }
  var Gs = [], Ks = 0, Er = null, Xa = 0, ui = [], ci = 0, mn = null, zi = 1, Ti = "";
  function Xi(e, n) {
    Gs[Ks++] = Xa, Gs[Ks++] = Er, Er = e, Xa = n;
  }
  function nm(e, n, l) {
    ui[ci++] = zi, ui[ci++] = Ti, ui[ci++] = mn, mn = e;
    var o = zi;
    e = Ti;
    var h = 32 - Se(o) - 1;
    o &= ~(1 << h), l += 1;
    var f = 32 - Se(n) + h;
    if (30 < f) {
      var y = h - h % 5;
      f = (o & (1 << y) - 1).toString(32), o >>= y, h -= y, zi = 1 << 32 - Se(n) + h | l << h | o, Ti = f + e;
    } else
      zi = 1 << f | l << h | o, Ti = e;
  }
  function Xu(e) {
    e.return !== null && (Xi(e, 1), nm(e, 1, 0));
  }
  function Zu(e) {
    for (; e === Er; )
      Er = Gs[--Ks], Gs[Ks] = null, Xa = Gs[--Ks], Gs[Ks] = null;
    for (; e === mn; )
      mn = ui[--ci], ui[ci] = null, Ti = ui[--ci], ui[ci] = null, zi = ui[--ci], ui[ci] = null;
  }
  function sm(e, n) {
    ui[ci++] = zi, ui[ci++] = Ti, ui[ci++] = mn, zi = n.id, Ti = n.overflow, mn = e;
  }
  var ve = null, Vt = null, Nt = !1, pn = null, hi = !1, Wu = Error(a(519));
  function vn(e) {
    var n = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Za(oi(n, e)), Wu;
  }
  function am(e) {
    var n = e.stateNode, l = e.type, o = e.memoizedProps;
    switch (n[pe] = e, n[Ae] = o, l) {
      case "dialog":
        wt("cancel", n), wt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        wt("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < vl.length; l++)
          wt(vl[l], n);
        break;
      case "source":
        wt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        wt("error", n), wt("load", n);
        break;
      case "details":
        wt("toggle", n);
        break;
      case "input":
        wt("invalid", n), bf(
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
        wt("invalid", n);
        break;
      case "textarea":
        wt("invalid", n), xf(n, o.value, o.defaultValue, o.children);
    }
    l = o.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || n.textContent === "" + l || o.suppressHydrationWarning === !0 || _v(n.textContent, l) ? (o.popover != null && (wt("beforetoggle", n), wt("toggle", n)), o.onScroll != null && wt("scroll", n), o.onScrollEnd != null && wt("scrollend", n), o.onClick != null && (n.onclick = Yi), n = !0) : n = !1, n || vn(e, !0);
  }
  function lm(e) {
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
  function Xs(e) {
    if (e !== ve) return !1;
    if (!Nt) return lm(e), Nt = !0, !1;
    var n = e.tag, l;
    if ((l = n !== 3 && n !== 27) && ((l = n === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || fh(e.type, e.memoizedProps)), l = !l), l && Vt && vn(e), lm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Vt = Tv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Vt = Tv(e);
    } else
      n === 27 ? (n = Vt, zn(e.type) ? (e = bh, bh = null, Vt = e) : Vt = n) : Vt = ve ? fi(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ts() {
    Vt = ve = null, Nt = !1;
  }
  function Iu() {
    var e = pn;
    return e !== null && (He === null ? He = e : He.push.apply(
      He,
      e
    ), pn = null), e;
  }
  function Za(e) {
    pn === null ? pn = [e] : pn.push(e);
  }
  var Fu = k(null), es = null, Zi = null;
  function gn(e, n, l) {
    I(Fu, n._currentValue), n._currentValue = l;
  }
  function Wi(e) {
    e._currentValue = Fu.current, Q(Fu);
  }
  function Ju(e, n, l) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), e === l) break;
      e = e.return;
    }
  }
  function Pu(e, n, l, o) {
    var h = e.child;
    for (h !== null && (h.return = e); h !== null; ) {
      var f = h.dependencies;
      if (f !== null) {
        var y = h.child;
        f = f.firstContext;
        t: for (; f !== null; ) {
          var _ = f;
          f = h;
          for (var j = 0; j < n.length; j++)
            if (_.context === n[j]) {
              f.lanes |= l, _ = f.alternate, _ !== null && (_.lanes |= l), Ju(
                f.return,
                l,
                e
              ), o || (y = null);
              break t;
            }
          f = _.next;
        }
      } else if (h.tag === 18) {
        if (y = h.return, y === null) throw Error(a(341));
        y.lanes |= l, f = y.alternate, f !== null && (f.lanes |= l), Ju(y, l, e), y = null;
      } else y = h.child;
      if (y !== null) y.return = h;
      else
        for (y = h; y !== null; ) {
          if (y === e) {
            y = null;
            break;
          }
          if (h = y.sibling, h !== null) {
            h.return = y.return, y = h;
            break;
          }
          y = y.return;
        }
      h = y;
    }
  }
  function Zs(e, n, l, o) {
    e = null;
    for (var h = n, f = !1; h !== null; ) {
      if (!f) {
        if ((h.flags & 524288) !== 0) f = !0;
        else if ((h.flags & 262144) !== 0) break;
      }
      if (h.tag === 10) {
        var y = h.alternate;
        if (y === null) throw Error(a(387));
        if (y = y.memoizedProps, y !== null) {
          var _ = h.type;
          Ke(h.pendingProps.value, y.value) || (e !== null ? e.push(_) : e = [_]);
        }
      } else if (h === Mt.current) {
        if (y = h.alternate, y === null) throw Error(a(387));
        y.memoizedState.memoizedState !== h.memoizedState.memoizedState && (e !== null ? e.push(wl) : e = [wl]);
      }
      h = h.return;
    }
    e !== null && Pu(
      n,
      e,
      l,
      o
    ), n.flags |= 262144;
  }
  function kr(e) {
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
  function is(e) {
    es = e, Zi = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ge(e) {
    return rm(es, e);
  }
  function zr(e, n) {
    return es === null && is(e), rm(e, n);
  }
  function rm(e, n) {
    var l = n._currentValue;
    if (n = { context: n, memoizedValue: l, next: null }, Zi === null) {
      if (e === null) throw Error(a(308));
      Zi = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Zi = Zi.next = n;
    return l;
  }
  var Ly = typeof AbortController < "u" ? AbortController : function() {
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
  }, By = s.unstable_scheduleCallback, Uy = s.unstable_NormalPriority, ee = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tc() {
    return {
      controller: new Ly(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wa(e) {
    e.refCount--, e.refCount === 0 && By(Uy, function() {
      e.controller.abort();
    });
  }
  var Ia = null, ec = 0, Ws = 0, Is = null;
  function Hy(e, n) {
    if (Ia === null) {
      var l = Ia = [];
      ec = 0, Ws = sh(), Is = {
        status: "pending",
        value: void 0,
        then: function(o) {
          l.push(o);
        }
      };
    }
    return ec++, n.then(om, om), n;
  }
  function om() {
    if (--ec === 0 && Ia !== null) {
      Is !== null && (Is.status = "fulfilled");
      var e = Ia;
      Ia = null, Ws = 0, Is = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function qy(e, n) {
    var l = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(h) {
        l.push(h);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var h = 0; h < l.length; h++) (0, l[h])(n);
      },
      function(h) {
        for (o.status = "rejected", o.reason = h, h = 0; h < l.length; h++)
          (0, l[h])(void 0);
      }
    ), o;
  }
  var um = L.S;
  L.S = function(e, n) {
    Kp = _e(), typeof n == "object" && n !== null && typeof n.then == "function" && Hy(e, n), um !== null && um(e, n);
  };
  var ns = k(null);
  function ic() {
    var e = ns.current;
    return e !== null ? e : Qt.pooledCache;
  }
  function Tr(e, n) {
    n === null ? I(ns, ns.current) : I(ns, n.pool);
  }
  function cm() {
    var e = ic();
    return e === null ? null : { parent: ee._currentValue, pool: e };
  }
  var Fs = Error(a(460)), nc = Error(a(474)), Or = Error(a(542)), Dr = { then: function() {
  } };
  function hm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function dm(e, n, l) {
    switch (l = e[l], l === void 0 ? e.push(n) : l !== n && (n.then(Yi, Yi), n = l), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, mm(e), e;
      default:
        if (typeof n.status == "string") n.then(Yi, Yi);
        else {
          if (e = Qt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(a(482));
          e = n, e.status = "pending", e.then(
            function(o) {
              if (n.status === "pending") {
                var h = n;
                h.status = "fulfilled", h.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var h = n;
                h.status = "rejected", h.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, mm(e), e;
        }
        throw as = n, Fs;
    }
  }
  function ss(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (as = l, Fs) : l;
    }
  }
  var as = null;
  function fm() {
    if (as === null) throw Error(a(459));
    var e = as;
    return as = null, e;
  }
  function mm(e) {
    if (e === Fs || e === Or)
      throw Error(a(483));
  }
  var Js = null, Fa = 0;
  function Ar(e) {
    var n = Fa;
    return Fa += 1, Js === null && (Js = []), dm(Js, e, n);
  }
  function Ja(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Rr(e, n) {
    throw n.$$typeof === x ? Error(a(525)) : (e = Object.prototype.toString.call(n), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function pm(e) {
    function n(O, z) {
      if (e) {
        var B = O.deletions;
        B === null ? (O.deletions = [z], O.flags |= 16) : B.push(z);
      }
    }
    function l(O, z) {
      if (!e) return null;
      for (; z !== null; )
        n(O, z), z = z.sibling;
      return null;
    }
    function o(O) {
      for (var z = /* @__PURE__ */ new Map(); O !== null; )
        O.key !== null ? z.set(O.key, O) : z.set(O.index, O), O = O.sibling;
      return z;
    }
    function h(O, z) {
      return O = Ki(O, z), O.index = 0, O.sibling = null, O;
    }
    function f(O, z, B) {
      return O.index = B, e ? (B = O.alternate, B !== null ? (B = B.index, B < z ? (O.flags |= 67108866, z) : B) : (O.flags |= 67108866, z)) : (O.flags |= 1048576, z);
    }
    function y(O) {
      return e && O.alternate === null && (O.flags |= 67108866), O;
    }
    function _(O, z, B, Y) {
      return z === null || z.tag !== 6 ? (z = Gu(B, O.mode, Y), z.return = O, z) : (z = h(z, B), z.return = O, z);
    }
    function j(O, z, B, Y) {
      var ot = B.type;
      return ot === M ? $(
        O,
        z,
        B.props.children,
        Y,
        B.key
      ) : z !== null && (z.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === X && ss(ot) === z.type) ? (z = h(z, B.props), Ja(z, B), z.return = O, z) : (z = jr(
        B.type,
        B.key,
        B.props,
        null,
        O.mode,
        Y
      ), Ja(z, B), z.return = O, z);
    }
    function U(O, z, B, Y) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== B.containerInfo || z.stateNode.implementation !== B.implementation ? (z = Ku(B, O.mode, Y), z.return = O, z) : (z = h(z, B.children || []), z.return = O, z);
    }
    function $(O, z, B, Y, ot) {
      return z === null || z.tag !== 7 ? (z = Pn(
        B,
        O.mode,
        Y,
        ot
      ), z.return = O, z) : (z = h(z, B), z.return = O, z);
    }
    function K(O, z, B) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = Gu(
          "" + z,
          O.mode,
          B
        ), z.return = O, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case S:
            return B = jr(
              z.type,
              z.key,
              z.props,
              null,
              O.mode,
              B
            ), Ja(B, z), B.return = O, B;
          case w:
            return z = Ku(
              z,
              O.mode,
              B
            ), z.return = O, z;
          case X:
            return z = ss(z), K(O, z, B);
        }
        if (Tt(z) || F(z))
          return z = Pn(
            z,
            O.mode,
            B,
            null
          ), z.return = O, z;
        if (typeof z.then == "function")
          return K(O, Ar(z), B);
        if (z.$$typeof === R)
          return K(
            O,
            zr(O, z),
            B
          );
        Rr(O, z);
      }
      return null;
    }
    function H(O, z, B, Y) {
      var ot = z !== null ? z.key : null;
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return ot !== null ? null : _(O, z, "" + B, Y);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return B.key === ot ? j(O, z, B, Y) : null;
          case w:
            return B.key === ot ? U(O, z, B, Y) : null;
          case X:
            return B = ss(B), H(O, z, B, Y);
        }
        if (Tt(B) || F(B))
          return ot !== null ? null : $(O, z, B, Y, null);
        if (typeof B.then == "function")
          return H(
            O,
            z,
            Ar(B),
            Y
          );
        if (B.$$typeof === R)
          return H(
            O,
            z,
            zr(O, B),
            Y
          );
        Rr(O, B);
      }
      return null;
    }
    function q(O, z, B, Y, ot) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return O = O.get(B) || null, _(z, O, "" + Y, ot);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case S:
            return O = O.get(
              Y.key === null ? B : Y.key
            ) || null, j(z, O, Y, ot);
          case w:
            return O = O.get(
              Y.key === null ? B : Y.key
            ) || null, U(z, O, Y, ot);
          case X:
            return Y = ss(Y), q(
              O,
              z,
              B,
              Y,
              ot
            );
        }
        if (Tt(Y) || F(Y))
          return O = O.get(B) || null, $(z, O, Y, ot, null);
        if (typeof Y.then == "function")
          return q(
            O,
            z,
            B,
            Ar(Y),
            ot
          );
        if (Y.$$typeof === R)
          return q(
            O,
            z,
            B,
            zr(z, Y),
            ot
          );
        Rr(z, Y);
      }
      return null;
    }
    function nt(O, z, B, Y) {
      for (var ot = null, Et = null, lt = z, yt = z = 0, St = null; lt !== null && yt < B.length; yt++) {
        lt.index > yt ? (St = lt, lt = null) : St = lt.sibling;
        var kt = H(
          O,
          lt,
          B[yt],
          Y
        );
        if (kt === null) {
          lt === null && (lt = St);
          break;
        }
        e && lt && kt.alternate === null && n(O, lt), z = f(kt, z, yt), Et === null ? ot = kt : Et.sibling = kt, Et = kt, lt = St;
      }
      if (yt === B.length)
        return l(O, lt), Nt && Xi(O, yt), ot;
      if (lt === null) {
        for (; yt < B.length; yt++)
          lt = K(O, B[yt], Y), lt !== null && (z = f(
            lt,
            z,
            yt
          ), Et === null ? ot = lt : Et.sibling = lt, Et = lt);
        return Nt && Xi(O, yt), ot;
      }
      for (lt = o(lt); yt < B.length; yt++)
        St = q(
          lt,
          O,
          yt,
          B[yt],
          Y
        ), St !== null && (e && St.alternate !== null && lt.delete(
          St.key === null ? yt : St.key
        ), z = f(
          St,
          z,
          yt
        ), Et === null ? ot = St : Et.sibling = St, Et = St);
      return e && lt.forEach(function(Rn) {
        return n(O, Rn);
      }), Nt && Xi(O, yt), ot;
    }
    function ut(O, z, B, Y) {
      if (B == null) throw Error(a(151));
      for (var ot = null, Et = null, lt = z, yt = z = 0, St = null, kt = B.next(); lt !== null && !kt.done; yt++, kt = B.next()) {
        lt.index > yt ? (St = lt, lt = null) : St = lt.sibling;
        var Rn = H(O, lt, kt.value, Y);
        if (Rn === null) {
          lt === null && (lt = St);
          break;
        }
        e && lt && Rn.alternate === null && n(O, lt), z = f(Rn, z, yt), Et === null ? ot = Rn : Et.sibling = Rn, Et = Rn, lt = St;
      }
      if (kt.done)
        return l(O, lt), Nt && Xi(O, yt), ot;
      if (lt === null) {
        for (; !kt.done; yt++, kt = B.next())
          kt = K(O, kt.value, Y), kt !== null && (z = f(kt, z, yt), Et === null ? ot = kt : Et.sibling = kt, Et = kt);
        return Nt && Xi(O, yt), ot;
      }
      for (lt = o(lt); !kt.done; yt++, kt = B.next())
        kt = q(lt, O, yt, kt.value, Y), kt !== null && (e && kt.alternate !== null && lt.delete(kt.key === null ? yt : kt.key), z = f(kt, z, yt), Et === null ? ot = kt : Et.sibling = kt, Et = kt);
      return e && lt.forEach(function(Fx) {
        return n(O, Fx);
      }), Nt && Xi(O, yt), ot;
    }
    function qt(O, z, B, Y) {
      if (typeof B == "object" && B !== null && B.type === M && B.key === null && (B = B.props.children), typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            t: {
              for (var ot = B.key; z !== null; ) {
                if (z.key === ot) {
                  if (ot = B.type, ot === M) {
                    if (z.tag === 7) {
                      l(
                        O,
                        z.sibling
                      ), Y = h(
                        z,
                        B.props.children
                      ), Y.return = O, O = Y;
                      break t;
                    }
                  } else if (z.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === X && ss(ot) === z.type) {
                    l(
                      O,
                      z.sibling
                    ), Y = h(z, B.props), Ja(Y, B), Y.return = O, O = Y;
                    break t;
                  }
                  l(O, z);
                  break;
                } else n(O, z);
                z = z.sibling;
              }
              B.type === M ? (Y = Pn(
                B.props.children,
                O.mode,
                Y,
                B.key
              ), Y.return = O, O = Y) : (Y = jr(
                B.type,
                B.key,
                B.props,
                null,
                O.mode,
                Y
              ), Ja(Y, B), Y.return = O, O = Y);
            }
            return y(O);
          case w:
            t: {
              for (ot = B.key; z !== null; ) {
                if (z.key === ot)
                  if (z.tag === 4 && z.stateNode.containerInfo === B.containerInfo && z.stateNode.implementation === B.implementation) {
                    l(
                      O,
                      z.sibling
                    ), Y = h(z, B.children || []), Y.return = O, O = Y;
                    break t;
                  } else {
                    l(O, z);
                    break;
                  }
                else n(O, z);
                z = z.sibling;
              }
              Y = Ku(B, O.mode, Y), Y.return = O, O = Y;
            }
            return y(O);
          case X:
            return B = ss(B), qt(
              O,
              z,
              B,
              Y
            );
        }
        if (Tt(B))
          return nt(
            O,
            z,
            B,
            Y
          );
        if (F(B)) {
          if (ot = F(B), typeof ot != "function") throw Error(a(150));
          return B = ot.call(B), ut(
            O,
            z,
            B,
            Y
          );
        }
        if (typeof B.then == "function")
          return qt(
            O,
            z,
            Ar(B),
            Y
          );
        if (B.$$typeof === R)
          return qt(
            O,
            z,
            zr(O, B),
            Y
          );
        Rr(O, B);
      }
      return typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint" ? (B = "" + B, z !== null && z.tag === 6 ? (l(O, z.sibling), Y = h(z, B), Y.return = O, O = Y) : (l(O, z), Y = Gu(B, O.mode, Y), Y.return = O, O = Y), y(O)) : l(O, z);
    }
    return function(O, z, B, Y) {
      try {
        Fa = 0;
        var ot = qt(
          O,
          z,
          B,
          Y
        );
        return Js = null, ot;
      } catch (lt) {
        if (lt === Fs || lt === Or) throw lt;
        var Et = Xe(29, lt, null, O.mode);
        return Et.lanes = Y, Et.return = O, Et;
      }
    };
  }
  var ls = pm(!0), vm = pm(!1), bn = !1;
  function sc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ac(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function yn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function xn(e, n, l) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Dt & 2) !== 0) {
      var h = o.pending;
      return h === null ? n.next = n : (n.next = h.next, h.next = n), o.pending = n, n = Cr(e), Pf(e, null, l), n;
    }
    return Nr(e, o, n, l), Cr(e);
  }
  function Pa(e, n, l) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (l & 4194048) !== 0)) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, Ge(e, l);
    }
  }
  function lc(e, n) {
    var l = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var h = null, f = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var y = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          f === null ? h = f = y : f = f.next = y, l = l.next;
        } while (l !== null);
        f === null ? h = f = n : f = f.next = n;
      } else h = f = n;
      l = {
        baseState: o.baseState,
        firstBaseUpdate: h,
        lastBaseUpdate: f,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = n : e.next = n, l.lastBaseUpdate = n;
  }
  var rc = !1;
  function tl() {
    if (rc) {
      var e = Is;
      if (e !== null) throw e;
    }
  }
  function el(e, n, l, o) {
    rc = !1;
    var h = e.updateQueue;
    bn = !1;
    var f = h.firstBaseUpdate, y = h.lastBaseUpdate, _ = h.shared.pending;
    if (_ !== null) {
      h.shared.pending = null;
      var j = _, U = j.next;
      j.next = null, y === null ? f = U : y.next = U, y = j;
      var $ = e.alternate;
      $ !== null && ($ = $.updateQueue, _ = $.lastBaseUpdate, _ !== y && (_ === null ? $.firstBaseUpdate = U : _.next = U, $.lastBaseUpdate = j));
    }
    if (f !== null) {
      var K = h.baseState;
      y = 0, $ = U = j = null, _ = f;
      do {
        var H = _.lane & -536870913, q = H !== _.lane;
        if (q ? (_t & H) === H : (o & H) === H) {
          H !== 0 && H === Ws && (rc = !0), $ !== null && ($ = $.next = {
            lane: 0,
            tag: _.tag,
            payload: _.payload,
            callback: null,
            next: null
          });
          t: {
            var nt = e, ut = _;
            H = n;
            var qt = l;
            switch (ut.tag) {
              case 1:
                if (nt = ut.payload, typeof nt == "function") {
                  K = nt.call(qt, K, H);
                  break t;
                }
                K = nt;
                break t;
              case 3:
                nt.flags = nt.flags & -65537 | 128;
              case 0:
                if (nt = ut.payload, H = typeof nt == "function" ? nt.call(qt, K, H) : nt, H == null) break t;
                K = b({}, K, H);
                break t;
              case 2:
                bn = !0;
            }
          }
          H = _.callback, H !== null && (e.flags |= 64, q && (e.flags |= 8192), q = h.callbacks, q === null ? h.callbacks = [H] : q.push(H));
        } else
          q = {
            lane: H,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null
          }, $ === null ? (U = $ = q, j = K) : $ = $.next = q, y |= H;
        if (_ = _.next, _ === null) {
          if (_ = h.shared.pending, _ === null)
            break;
          q = _, _ = q.next, q.next = null, h.lastBaseUpdate = q, h.shared.pending = null;
        }
      } while (!0);
      $ === null && (j = K), h.baseState = j, h.firstBaseUpdate = U, h.lastBaseUpdate = $, f === null && (h.shared.lanes = 0), Nn |= y, e.lanes = y, e.memoizedState = K;
    }
  }
  function gm(e, n) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(n);
  }
  function bm(e, n) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        gm(l[e], n);
  }
  var Ps = k(null), Lr = k(0);
  function ym(e, n) {
    e = an, I(Lr, e), I(Ps, n), an = e | n.baseLanes;
  }
  function oc() {
    I(Lr, an), I(Ps, Ps.current);
  }
  function uc() {
    an = Lr.current, Q(Ps), Q(Lr);
  }
  var Ze = k(null), di = null;
  function wn(e) {
    var n = e.alternate;
    I(Jt, Jt.current & 1), I(Ze, e), di === null && (n === null || Ps.current !== null || n.memoizedState !== null) && (di = e);
  }
  function cc(e) {
    I(Jt, Jt.current), I(Ze, e), di === null && (di = e);
  }
  function xm(e) {
    e.tag === 22 ? (I(Jt, Jt.current), I(Ze, e), di === null && (di = e)) : _n();
  }
  function _n() {
    I(Jt, Jt.current), I(Ze, Ze.current);
  }
  function We(e) {
    Q(Ze), di === e && (di = null), Q(Jt);
  }
  var Jt = k(0);
  function Br(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || vh(l) || gh(l)))
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
  var Ii = 0, gt = null, Ut = null, ie = null, Ur = !1, ta = !1, rs = !1, Hr = 0, il = 0, ea = null, Qy = 0;
  function Zt() {
    throw Error(a(321));
  }
  function hc(e, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < e.length; l++)
      if (!Ke(e[l], n[l])) return !1;
    return !0;
  }
  function dc(e, n, l, o, h, f) {
    return Ii = f, gt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, L.H = e === null || e.memoizedState === null ? np : jc, rs = !1, f = l(o, h), rs = !1, ta && (f = _m(
      n,
      l,
      o,
      h
    )), wm(e), f;
  }
  function wm(e) {
    L.H = al;
    var n = Ut !== null && Ut.next !== null;
    if (Ii = 0, ie = Ut = gt = null, Ur = !1, il = 0, ea = null, n) throw Error(a(300));
    e === null || ne || (e = e.dependencies, e !== null && kr(e) && (ne = !0));
  }
  function _m(e, n, l, o) {
    gt = e;
    var h = 0;
    do {
      if (ta && (ea = null), il = 0, ta = !1, 25 <= h) throw Error(a(301));
      if (h += 1, ie = Ut = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      L.H = sp, f = n(l, o);
    } while (ta);
    return f;
  }
  function $y() {
    var e = L.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? nl(n) : n, e = e.useState()[0], (Ut !== null ? Ut.memoizedState : null) !== e && (gt.flags |= 1024), n;
  }
  function fc() {
    var e = Hr !== 0;
    return Hr = 0, e;
  }
  function mc(e, n, l) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~l;
  }
  function pc(e) {
    if (Ur) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      Ur = !1;
    }
    Ii = 0, ie = Ut = gt = null, ta = !1, il = Hr = 0, ea = null;
  }
  function je() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ie === null ? gt.memoizedState = ie = e : ie = ie.next = e, ie;
  }
  function Pt() {
    if (Ut === null) {
      var e = gt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ut.next;
    var n = ie === null ? gt.memoizedState : ie.next;
    if (n !== null)
      ie = n, Ut = e;
    else {
      if (e === null)
        throw gt.alternate === null ? Error(a(467)) : Error(a(310));
      Ut = e, e = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      }, ie === null ? gt.memoizedState = ie = e : ie = ie.next = e;
    }
    return ie;
  }
  function qr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function nl(e) {
    var n = il;
    return il += 1, ea === null && (ea = []), e = dm(ea, e, n), n = gt, (ie === null ? n.memoizedState : ie.next) === null && (n = n.alternate, L.H = n === null || n.memoizedState === null ? np : jc), e;
  }
  function Qr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return nl(e);
      if (e.$$typeof === R) return ge(e);
    }
    throw Error(a(438, String(e)));
  }
  function vc(e) {
    var n = null, l = gt.updateQueue;
    if (l !== null && (n = l.memoCache), n == null) {
      var o = gt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(h) {
          return h.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), l === null && (l = qr(), gt.updateQueue = l), l.memoCache = n, l = n.data[n.index], l === void 0)
      for (l = n.data[n.index] = Array(e), o = 0; o < e; o++)
        l[o] = rt;
    return n.index++, l;
  }
  function Fi(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function $r(e) {
    var n = Pt();
    return gc(n, Ut, e);
  }
  function gc(e, n, l) {
    var o = e.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = l;
    var h = e.baseQueue, f = o.pending;
    if (f !== null) {
      if (h !== null) {
        var y = h.next;
        h.next = f.next, f.next = y;
      }
      n.baseQueue = h = f, o.pending = null;
    }
    if (f = e.baseState, h === null) e.memoizedState = f;
    else {
      n = h.next;
      var _ = y = null, j = null, U = n, $ = !1;
      do {
        var K = U.lane & -536870913;
        if (K !== U.lane ? (_t & K) === K : (Ii & K) === K) {
          var H = U.revertLane;
          if (H === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), K === Ws && ($ = !0);
          else if ((Ii & H) === H) {
            U = U.next, H === Ws && ($ = !0);
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
            }, j === null ? (_ = j = K, y = f) : j = j.next = K, gt.lanes |= H, Nn |= H;
          K = U.action, rs && l(f, K), f = U.hasEagerState ? U.eagerState : l(f, K);
        } else
          H = {
            lane: K,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, j === null ? (_ = j = H, y = f) : j = j.next = H, gt.lanes |= K, Nn |= K;
        U = U.next;
      } while (U !== null && U !== n);
      if (j === null ? y = f : j.next = _, !Ke(f, e.memoizedState) && (ne = !0, $ && (l = Is, l !== null)))
        throw l;
      e.memoizedState = f, e.baseState = y, e.baseQueue = j, o.lastRenderedState = f;
    }
    return h === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function bc(e) {
    var n = Pt(), l = n.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var o = l.dispatch, h = l.pending, f = n.memoizedState;
    if (h !== null) {
      l.pending = null;
      var y = h = h.next;
      do
        f = e(f, y.action), y = y.next;
      while (y !== h);
      Ke(f, n.memoizedState) || (ne = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), l.lastRenderedState = f;
    }
    return [f, o];
  }
  function Sm(e, n, l) {
    var o = gt, h = Pt(), f = Nt;
    if (f) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = n();
    var y = !Ke(
      (Ut || h).memoizedState,
      l
    );
    if (y && (h.memoizedState = l, ne = !0), h = h.queue, wc(Cm.bind(null, o, h, e), [
      e
    ]), h.getSnapshot !== n || y || ie !== null && ie.memoizedState.tag & 1) {
      if (o.flags |= 2048, ia(
        9,
        { destroy: void 0 },
        Nm.bind(
          null,
          o,
          h,
          l,
          n
        ),
        null
      ), Qt === null) throw Error(a(349));
      f || (Ii & 127) !== 0 || Mm(o, n, l);
    }
    return l;
  }
  function Mm(e, n, l) {
    e.flags |= 16384, e = { getSnapshot: n, value: l }, n = gt.updateQueue, n === null ? (n = qr(), gt.updateQueue = n, n.stores = [e]) : (l = n.stores, l === null ? n.stores = [e] : l.push(e));
  }
  function Nm(e, n, l, o) {
    n.value = l, n.getSnapshot = o, jm(n) && Em(e);
  }
  function Cm(e, n, l) {
    return l(function() {
      jm(n) && Em(e);
    });
  }
  function jm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var l = n();
      return !Ke(e, l);
    } catch {
      return !0;
    }
  }
  function Em(e) {
    var n = Jn(e, 2);
    n !== null && qe(n, e, 2);
  }
  function yc(e) {
    var n = je();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), rs) {
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
      lastRenderedReducer: Fi,
      lastRenderedState: e
    }, n;
  }
  function km(e, n, l, o) {
    return e.baseState = l, gc(
      e,
      Ut,
      typeof o == "function" ? o : Fi
    );
  }
  function Vy(e, n, l, o, h) {
    if (Gr(e)) throw Error(a(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: h,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          f.listeners.push(y);
        }
      };
      L.T !== null ? l(!0) : f.isTransition = !1, o(f), l = n.pending, l === null ? (f.next = n.pending = f, zm(n, f)) : (f.next = l.next, n.pending = l.next = f);
    }
  }
  function zm(e, n) {
    var l = n.action, o = n.payload, h = e.state;
    if (n.isTransition) {
      var f = L.T, y = {};
      L.T = y;
      try {
        var _ = l(h, o), j = L.S;
        j !== null && j(y, _), Tm(e, n, _);
      } catch (U) {
        xc(e, n, U);
      } finally {
        f !== null && y.types !== null && (f.types = y.types), L.T = f;
      }
    } else
      try {
        f = l(h, o), Tm(e, n, f);
      } catch (U) {
        xc(e, n, U);
      }
  }
  function Tm(e, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(o) {
        Om(e, n, o);
      },
      function(o) {
        return xc(e, n, o);
      }
    ) : Om(e, n, l);
  }
  function Om(e, n, l) {
    n.status = "fulfilled", n.value = l, Dm(n), e.state = l, n = e.pending, n !== null && (l = n.next, l === n ? e.pending = null : (l = l.next, n.next = l, zm(e, l)));
  }
  function xc(e, n, l) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = l, Dm(n), n = n.next;
      while (n !== o);
    }
    e.action = null;
  }
  function Dm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Am(e, n) {
    return n;
  }
  function Rm(e, n) {
    if (Nt) {
      var l = Qt.formState;
      if (l !== null) {
        t: {
          var o = gt;
          if (Nt) {
            if (Vt) {
              e: {
                for (var h = Vt, f = hi; h.nodeType !== 8; ) {
                  if (!f) {
                    h = null;
                    break e;
                  }
                  if (h = fi(
                    h.nextSibling
                  ), h === null) {
                    h = null;
                    break e;
                  }
                }
                f = h.data, h = f === "F!" || f === "F" ? h : null;
              }
              if (h) {
                Vt = fi(
                  h.nextSibling
                ), o = h.data === "F!";
                break t;
              }
            }
            vn(o);
          }
          o = !1;
        }
        o && (n = l[0]);
      }
    }
    return l = je(), l.memoizedState = l.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Am,
      lastRenderedState: n
    }, l.queue = o, l = tp.bind(
      null,
      gt,
      o
    ), o.dispatch = l, o = yc(!1), f = Cc.bind(
      null,
      gt,
      !1,
      o.queue
    ), o = je(), h = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = h, l = Vy.bind(
      null,
      gt,
      h,
      f,
      l
    ), h.dispatch = l, o.memoizedState = e, [n, l, !1];
  }
  function Lm(e) {
    var n = Pt();
    return Bm(n, Ut, e);
  }
  function Bm(e, n, l) {
    if (n = gc(
      e,
      n,
      Am
    )[0], e = $r(Fi)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = nl(n);
      } catch (y) {
        throw y === Fs ? Or : y;
      }
    else o = n;
    n = Pt();
    var h = n.queue, f = h.dispatch;
    return l !== n.memoizedState && (gt.flags |= 2048, ia(
      9,
      { destroy: void 0 },
      Yy.bind(null, h, l),
      null
    )), [o, f, e];
  }
  function Yy(e, n) {
    e.action = n;
  }
  function Um(e) {
    var n = Pt(), l = Ut;
    if (l !== null)
      return Bm(n, l, e);
    Pt(), n = n.memoizedState, l = Pt();
    var o = l.queue.dispatch;
    return l.memoizedState = e, [n, o, !1];
  }
  function ia(e, n, l, o) {
    return e = { tag: e, create: l, deps: o, inst: n, next: null }, n = gt.updateQueue, n === null && (n = qr(), gt.updateQueue = n), l = n.lastEffect, l === null ? n.lastEffect = e.next = e : (o = l.next, l.next = e, e.next = o, n.lastEffect = e), e;
  }
  function Hm() {
    return Pt().memoizedState;
  }
  function Vr(e, n, l, o) {
    var h = je();
    gt.flags |= e, h.memoizedState = ia(
      1 | n,
      { destroy: void 0 },
      l,
      o === void 0 ? null : o
    );
  }
  function Yr(e, n, l, o) {
    var h = Pt();
    o = o === void 0 ? null : o;
    var f = h.memoizedState.inst;
    Ut !== null && o !== null && hc(o, Ut.memoizedState.deps) ? h.memoizedState = ia(n, f, l, o) : (gt.flags |= e, h.memoizedState = ia(
      1 | n,
      f,
      l,
      o
    ));
  }
  function qm(e, n) {
    Vr(8390656, 8, e, n);
  }
  function wc(e, n) {
    Yr(2048, 8, e, n);
  }
  function Gy(e) {
    gt.flags |= 4;
    var n = gt.updateQueue;
    if (n === null)
      n = qr(), gt.updateQueue = n, n.events = [e];
    else {
      var l = n.events;
      l === null ? n.events = [e] : l.push(e);
    }
  }
  function Qm(e) {
    var n = Pt().memoizedState;
    return Gy({ ref: n, nextImpl: e }), function() {
      if ((Dt & 2) !== 0) throw Error(a(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function $m(e, n) {
    return Yr(4, 2, e, n);
  }
  function Vm(e, n) {
    return Yr(4, 4, e, n);
  }
  function Ym(e, n) {
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
  function Gm(e, n, l) {
    l = l != null ? l.concat([e]) : null, Yr(4, 4, Ym.bind(null, n, e), l);
  }
  function _c() {
  }
  function Km(e, n) {
    var l = Pt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    return n !== null && hc(n, o[1]) ? o[0] : (l.memoizedState = [e, n], e);
  }
  function Xm(e, n) {
    var l = Pt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    if (n !== null && hc(n, o[1]))
      return o[0];
    if (o = e(), rs) {
      ei(!0);
      try {
        e();
      } finally {
        ei(!1);
      }
    }
    return l.memoizedState = [o, n], o;
  }
  function Sc(e, n, l) {
    return l === void 0 || (Ii & 1073741824) !== 0 && (_t & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = l, e = Zp(), gt.lanes |= e, Nn |= e, l);
  }
  function Zm(e, n, l, o) {
    return Ke(l, n) ? l : Ps.current !== null ? (e = Sc(e, l, o), Ke(e, n) || (ne = !0), e) : (Ii & 42) === 0 || (Ii & 1073741824) !== 0 && (_t & 261930) === 0 ? (ne = !0, e.memoizedState = l) : (e = Zp(), gt.lanes |= e, Nn |= e, n);
  }
  function Wm(e, n, l, o, h) {
    var f = Z.p;
    Z.p = f !== 0 && 8 > f ? f : 8;
    var y = L.T, _ = {};
    L.T = _, Cc(e, !1, n, l);
    try {
      var j = h(), U = L.S;
      if (U !== null && U(_, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var $ = qy(
          j,
          o
        );
        sl(
          e,
          n,
          $,
          Je(e)
        );
      } else
        sl(
          e,
          n,
          o,
          Je(e)
        );
    } catch (K) {
      sl(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: K },
        Je()
      );
    } finally {
      Z.p = f, y !== null && _.types !== null && (y.types = _.types), L.T = y;
    }
  }
  function Ky() {
  }
  function Mc(e, n, l, o) {
    if (e.tag !== 5) throw Error(a(476));
    var h = Im(e).queue;
    Wm(
      e,
      h,
      n,
      it,
      l === null ? Ky : function() {
        return Fm(e), l(o);
      }
    );
  }
  function Im(e) {
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
        lastRenderedReducer: Fi,
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
        lastRenderedReducer: Fi,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Fm(e) {
    var n = Im(e);
    n.next === null && (n = e.alternate.memoizedState), sl(
      e,
      n.next.queue,
      {},
      Je()
    );
  }
  function Nc() {
    return ge(wl);
  }
  function Jm() {
    return Pt().memoizedState;
  }
  function Pm() {
    return Pt().memoizedState;
  }
  function Xy(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Je();
          e = yn(l);
          var o = xn(n, e, l);
          o !== null && (qe(o, n, l), Pa(o, n, l)), n = { cache: tc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Zy(e, n, l) {
    var o = Je();
    l = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gr(e) ? ep(n, l) : (l = Vu(e, n, l, o), l !== null && (qe(l, e, o), ip(l, n, o)));
  }
  function tp(e, n, l) {
    var o = Je();
    sl(e, n, l, o);
  }
  function sl(e, n, l, o) {
    var h = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Gr(e)) ep(n, h);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var y = n.lastRenderedState, _ = f(y, l);
          if (h.hasEagerState = !0, h.eagerState = _, Ke(_, y))
            return Nr(e, n, h, 0), Qt === null && Mr(), !1;
        } catch {
        }
      if (l = Vu(e, n, h, o), l !== null)
        return qe(l, e, o), ip(l, n, o), !0;
    }
    return !1;
  }
  function Cc(e, n, l, o) {
    if (o = {
      lane: 2,
      revertLane: sh(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gr(e)) {
      if (n) throw Error(a(479));
    } else
      n = Vu(
        e,
        l,
        o,
        2
      ), n !== null && qe(n, e, 2);
  }
  function Gr(e) {
    var n = e.alternate;
    return e === gt || n !== null && n === gt;
  }
  function ep(e, n) {
    ta = Ur = !0;
    var l = e.pending;
    l === null ? n.next = n : (n.next = l.next, l.next = n), e.pending = n;
  }
  function ip(e, n, l) {
    if ((l & 4194048) !== 0) {
      var o = n.lanes;
      o &= e.pendingLanes, l |= o, n.lanes = l, Ge(e, l);
    }
  }
  var al = {
    readContext: ge,
    use: Qr,
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
  al.useEffectEvent = Zt;
  var np = {
    readContext: ge,
    use: Qr,
    useCallback: function(e, n) {
      return je().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ge,
    useEffect: qm,
    useImperativeHandle: function(e, n, l) {
      l = l != null ? l.concat([e]) : null, Vr(
        4194308,
        4,
        Ym.bind(null, n, e),
        l
      );
    },
    useLayoutEffect: function(e, n) {
      return Vr(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      Vr(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var l = je();
      n = n === void 0 ? null : n;
      var o = e();
      if (rs) {
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
      var o = je();
      if (l !== void 0) {
        var h = l(n);
        if (rs) {
          ei(!0);
          try {
            l(n);
          } finally {
            ei(!1);
          }
        }
      } else h = n;
      return o.memoizedState = o.baseState = h, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: h
      }, o.queue = e, e = e.dispatch = Zy.bind(
        null,
        gt,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var n = je();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = yc(e);
      var n = e.queue, l = tp.bind(null, gt, n);
      return n.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var l = je();
      return Sc(l, e, n);
    },
    useTransition: function() {
      var e = yc(!1);
      return e = Wm.bind(
        null,
        gt,
        e.queue,
        !0,
        !1
      ), je().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, l) {
      var o = gt, h = je();
      if (Nt) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = n(), Qt === null)
          throw Error(a(349));
        (_t & 127) !== 0 || Mm(o, n, l);
      }
      h.memoizedState = l;
      var f = { value: l, getSnapshot: n };
      return h.queue = f, qm(Cm.bind(null, o, f, e), [
        e
      ]), o.flags |= 2048, ia(
        9,
        { destroy: void 0 },
        Nm.bind(
          null,
          o,
          f,
          l,
          n
        ),
        null
      ), l;
    },
    useId: function() {
      var e = je(), n = Qt.identifierPrefix;
      if (Nt) {
        var l = Ti, o = zi;
        l = (o & ~(1 << 32 - Se(o) - 1)).toString(32) + l, n = "_" + n + "R_" + l, l = Hr++, 0 < l && (n += "H" + l.toString(32)), n += "_";
      } else
        l = Qy++, n = "_" + n + "r_" + l.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Nc,
    useFormState: Rm,
    useActionState: Rm,
    useOptimistic: function(e) {
      var n = je();
      n.memoizedState = n.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = l, n = Cc.bind(
        null,
        gt,
        !0,
        l
      ), l.dispatch = n, [e, n];
    },
    useMemoCache: vc,
    useCacheRefresh: function() {
      return je().memoizedState = Xy.bind(
        null,
        gt
      );
    },
    useEffectEvent: function(e) {
      var n = je(), l = { impl: e };
      return n.memoizedState = l, function() {
        if ((Dt & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, jc = {
    readContext: ge,
    use: Qr,
    useCallback: Km,
    useContext: ge,
    useEffect: wc,
    useImperativeHandle: Gm,
    useInsertionEffect: $m,
    useLayoutEffect: Vm,
    useMemo: Xm,
    useReducer: $r,
    useRef: Hm,
    useState: function() {
      return $r(Fi);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var l = Pt();
      return Zm(
        l,
        Ut.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = $r(Fi)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : nl(e),
        n
      ];
    },
    useSyncExternalStore: Sm,
    useId: Jm,
    useHostTransitionStatus: Nc,
    useFormState: Lm,
    useActionState: Lm,
    useOptimistic: function(e, n) {
      var l = Pt();
      return km(l, Ut, e, n);
    },
    useMemoCache: vc,
    useCacheRefresh: Pm
  };
  jc.useEffectEvent = Qm;
  var sp = {
    readContext: ge,
    use: Qr,
    useCallback: Km,
    useContext: ge,
    useEffect: wc,
    useImperativeHandle: Gm,
    useInsertionEffect: $m,
    useLayoutEffect: Vm,
    useMemo: Xm,
    useReducer: bc,
    useRef: Hm,
    useState: function() {
      return bc(Fi);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, n) {
      var l = Pt();
      return Ut === null ? Sc(l, e, n) : Zm(
        l,
        Ut.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = bc(Fi)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : nl(e),
        n
      ];
    },
    useSyncExternalStore: Sm,
    useId: Jm,
    useHostTransitionStatus: Nc,
    useFormState: Um,
    useActionState: Um,
    useOptimistic: function(e, n) {
      var l = Pt();
      return Ut !== null ? km(l, Ut, e, n) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: vc,
    useCacheRefresh: Pm
  };
  sp.useEffectEvent = Qm;
  function Ec(e, n, l, o) {
    n = e.memoizedState, l = l(o, n), l = l == null ? n : b({}, n, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var kc = {
    enqueueSetState: function(e, n, l) {
      e = e._reactInternals;
      var o = Je(), h = yn(o);
      h.payload = n, l != null && (h.callback = l), n = xn(e, h, o), n !== null && (qe(n, e, o), Pa(n, e, o));
    },
    enqueueReplaceState: function(e, n, l) {
      e = e._reactInternals;
      var o = Je(), h = yn(o);
      h.tag = 1, h.payload = n, l != null && (h.callback = l), n = xn(e, h, o), n !== null && (qe(n, e, o), Pa(n, e, o));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var l = Je(), o = yn(l);
      o.tag = 2, n != null && (o.callback = n), n = xn(e, o, l), n !== null && (qe(n, e, l), Pa(n, e, l));
    }
  };
  function ap(e, n, l, o, h, f, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, f, y) : n.prototype && n.prototype.isPureReactComponent ? !Ga(l, o) || !Ga(h, f) : !0;
  }
  function lp(e, n, l, o) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(l, o), n.state !== e && kc.enqueueReplaceState(n, n.state, null);
  }
  function os(e, n) {
    var l = n;
    if ("ref" in n) {
      l = {};
      for (var o in n)
        o !== "ref" && (l[o] = n[o]);
    }
    if (e = e.defaultProps) {
      l === n && (l = b({}, l));
      for (var h in e)
        l[h] === void 0 && (l[h] = e[h]);
    }
    return l;
  }
  function rp(e) {
    Sr(e);
  }
  function op(e) {
    console.error(e);
  }
  function up(e) {
    Sr(e);
  }
  function Kr(e, n) {
    try {
      var l = e.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function cp(e, n, l) {
    try {
      var o = e.onCaughtError;
      o(l.value, {
        componentStack: l.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (h) {
      setTimeout(function() {
        throw h;
      });
    }
  }
  function zc(e, n, l) {
    return l = yn(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Kr(e, n);
    }, l;
  }
  function hp(e) {
    return e = yn(e), e.tag = 3, e;
  }
  function dp(e, n, l, o) {
    var h = l.type.getDerivedStateFromError;
    if (typeof h == "function") {
      var f = o.value;
      e.payload = function() {
        return h(f);
      }, e.callback = function() {
        cp(n, l, o);
      };
    }
    var y = l.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      cp(n, l, o), typeof h != "function" && (Cn === null ? Cn = /* @__PURE__ */ new Set([this]) : Cn.add(this));
      var _ = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: _ !== null ? _ : ""
      });
    });
  }
  function Wy(e, n, l, o, h) {
    if (l.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = l.alternate, n !== null && Zs(
        n,
        l,
        h,
        !0
      ), l = Ze.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return di === null ? so() : l.alternate === null && Wt === 0 && (Wt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = h, o === Dr ? l.flags |= 16384 : (n = l.updateQueue, n === null ? l.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), eh(e, o, h)), !1;
          case 22:
            return l.flags |= 65536, o === Dr ? l.flags |= 16384 : (n = l.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, l.updateQueue = n) : (l = n.retryQueue, l === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : l.add(o)), eh(e, o, h)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return eh(e, o, h), so(), !1;
    }
    if (Nt)
      return n = Ze.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = h, o !== Wu && (e = Error(a(422), { cause: o }), Za(oi(e, l)))) : (o !== Wu && (n = Error(a(423), {
        cause: o
      }), Za(
        oi(n, l)
      )), e = e.current.alternate, e.flags |= 65536, h &= -h, e.lanes |= h, o = oi(o, l), h = zc(
        e.stateNode,
        o,
        h
      ), lc(e, h), Wt !== 4 && (Wt = 2)), !1;
    var f = Error(a(520), { cause: o });
    if (f = oi(f, l), fl === null ? fl = [f] : fl.push(f), Wt !== 4 && (Wt = 2), n === null) return !0;
    o = oi(o, l), l = n;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = h & -h, l.lanes |= e, e = zc(l.stateNode, o, e), lc(l, e), !1;
        case 1:
          if (n = l.type, f = l.stateNode, (l.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Cn === null || !Cn.has(f))))
            return l.flags |= 65536, h &= -h, l.lanes |= h, h = hp(h), dp(
              h,
              e,
              l,
              o
            ), lc(l, h), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Tc = Error(a(461)), ne = !1;
  function be(e, n, l, o) {
    n.child = e === null ? vm(n, null, l, o) : ls(
      n,
      e.child,
      l,
      o
    );
  }
  function fp(e, n, l, o, h) {
    l = l.render;
    var f = n.ref;
    if ("ref" in o) {
      var y = {};
      for (var _ in o)
        _ !== "ref" && (y[_] = o[_]);
    } else y = o;
    return is(n), o = dc(
      e,
      n,
      l,
      y,
      f,
      h
    ), _ = fc(), e !== null && !ne ? (mc(e, n, h), Ji(e, n, h)) : (Nt && _ && Xu(n), n.flags |= 1, be(e, n, o, h), n.child);
  }
  function mp(e, n, l, o, h) {
    if (e === null) {
      var f = l.type;
      return typeof f == "function" && !Yu(f) && f.defaultProps === void 0 && l.compare === null ? (n.tag = 15, n.type = f, pp(
        e,
        n,
        f,
        o,
        h
      )) : (e = jr(
        l.type,
        null,
        o,
        n,
        n.mode,
        h
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !Hc(e, h)) {
      var y = f.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ga, l(y, o) && e.ref === n.ref)
        return Ji(e, n, h);
    }
    return n.flags |= 1, e = Ki(f, o), e.ref = n.ref, e.return = n, n.child = e;
  }
  function pp(e, n, l, o, h) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Ga(f, o) && e.ref === n.ref)
        if (ne = !1, n.pendingProps = o = f, Hc(e, h))
          (e.flags & 131072) !== 0 && (ne = !0);
        else
          return n.lanes = e.lanes, Ji(e, n, h);
    }
    return Oc(
      e,
      n,
      l,
      o,
      h
    );
  }
  function vp(e, n, l, o) {
    var h = o.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | l : l, e !== null) {
          for (o = n.child = e.child, h = 0; o !== null; )
            h = h | o.lanes | o.childLanes, o = o.sibling;
          o = h & ~f;
        } else o = 0, n.child = null;
        return gp(
          e,
          n,
          f,
          l,
          o
        );
      }
      if ((l & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Tr(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? ym(n, f) : oc(), xm(n);
      else
        return o = n.lanes = 536870912, gp(
          e,
          n,
          f !== null ? f.baseLanes | l : l,
          l,
          o
        );
    } else
      f !== null ? (Tr(n, f.cachePool), ym(n, f), _n(), n.memoizedState = null) : (e !== null && Tr(n, null), oc(), _n());
    return be(e, n, h, l), n.child;
  }
  function ll(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function gp(e, n, l, o, h) {
    var f = ic();
    return f = f === null ? null : { parent: ee._currentValue, pool: f }, n.memoizedState = {
      baseLanes: l,
      cachePool: f
    }, e !== null && Tr(n, null), oc(), xm(n), e !== null && Zs(e, n, o, !0), n.childLanes = h, null;
  }
  function Xr(e, n) {
    return n = Wr(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function bp(e, n, l) {
    return ls(n, e.child, null, l), e = Xr(n, n.pendingProps), e.flags |= 2, We(n), n.memoizedState = null, e;
  }
  function Iy(e, n, l) {
    var o = n.pendingProps, h = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Nt) {
        if (o.mode === "hidden")
          return e = Xr(n, o), n.lanes = 536870912, ll(null, e);
        if (cc(n), (e = Vt) ? (e = zv(
          e,
          hi
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mn !== null ? { id: zi, overflow: Ti } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = em(e), l.return = n, n.child = l, ve = n, Vt = null)) : e = null, e === null) throw vn(n);
        return n.lanes = 536870912, null;
      }
      return Xr(n, o);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var y = f.dehydrated;
      if (cc(n), h)
        if (n.flags & 256)
          n.flags &= -257, n = bp(
            e,
            n,
            l
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(a(558));
      else if (ne || Zs(e, n, l, !1), h = (l & e.childLanes) !== 0, ne || h) {
        if (o = Qt, o !== null && (y = ni(o, l), y !== 0 && y !== f.retryLane))
          throw f.retryLane = y, Jn(e, y), qe(o, e, y), Tc;
        so(), n = bp(
          e,
          n,
          l
        );
      } else
        e = f.treeContext, Vt = fi(y.nextSibling), ve = n, Nt = !0, pn = null, hi = !1, e !== null && sm(n, e), n = Xr(n, o), n.flags |= 4096;
      return n;
    }
    return e = Ki(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function Zr(e, n) {
    var l = n.ref;
    if (l === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (n.flags |= 4194816);
    }
  }
  function Oc(e, n, l, o, h) {
    return is(n), l = dc(
      e,
      n,
      l,
      o,
      void 0,
      h
    ), o = fc(), e !== null && !ne ? (mc(e, n, h), Ji(e, n, h)) : (Nt && o && Xu(n), n.flags |= 1, be(e, n, l, h), n.child);
  }
  function yp(e, n, l, o, h, f) {
    return is(n), n.updateQueue = null, l = _m(
      n,
      o,
      l,
      h
    ), wm(e), o = fc(), e !== null && !ne ? (mc(e, n, f), Ji(e, n, f)) : (Nt && o && Xu(n), n.flags |= 1, be(e, n, l, f), n.child);
  }
  function xp(e, n, l, o, h) {
    if (is(n), n.stateNode === null) {
      var f = Ys, y = l.contextType;
      typeof y == "object" && y !== null && (f = ge(y)), f = new l(o, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = kc, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = o, f.state = n.memoizedState, f.refs = {}, sc(n), y = l.contextType, f.context = typeof y == "object" && y !== null ? ge(y) : Ys, f.state = n.memoizedState, y = l.getDerivedStateFromProps, typeof y == "function" && (Ec(
        n,
        l,
        y,
        o
      ), f.state = n.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (y = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), y !== f.state && kc.enqueueReplaceState(f, f.state, null), el(n, o, f, h), tl(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (e === null) {
      f = n.stateNode;
      var _ = n.memoizedProps, j = os(l, _);
      f.props = j;
      var U = f.context, $ = l.contextType;
      y = Ys, typeof $ == "object" && $ !== null && (y = ge($));
      var K = l.getDerivedStateFromProps;
      $ = typeof K == "function" || typeof f.getSnapshotBeforeUpdate == "function", _ = n.pendingProps !== _, $ || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (_ || U !== y) && lp(
        n,
        f,
        o,
        y
      ), bn = !1;
      var H = n.memoizedState;
      f.state = H, el(n, o, f, h), tl(), U = n.memoizedState, _ || H !== U || bn ? (typeof K == "function" && (Ec(
        n,
        l,
        K,
        o
      ), U = n.memoizedState), (j = bn || ap(
        n,
        l,
        j,
        o,
        H,
        U,
        y
      )) ? ($ || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = U), f.props = o, f.state = U, f.context = y, o = j) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      f = n.stateNode, ac(e, n), y = n.memoizedProps, $ = os(l, y), f.props = $, K = n.pendingProps, H = f.context, U = l.contextType, j = Ys, typeof U == "object" && U !== null && (j = ge(U)), _ = l.getDerivedStateFromProps, (U = typeof _ == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== K || H !== j) && lp(
        n,
        f,
        o,
        j
      ), bn = !1, H = n.memoizedState, f.state = H, el(n, o, f, h), tl();
      var q = n.memoizedState;
      y !== K || H !== q || bn || e !== null && e.dependencies !== null && kr(e.dependencies) ? (typeof _ == "function" && (Ec(
        n,
        l,
        _,
        o
      ), q = n.memoizedState), ($ = bn || ap(
        n,
        l,
        $,
        o,
        H,
        q,
        j
      ) || e !== null && e.dependencies !== null && kr(e.dependencies)) ? (U || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, q, j), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        o,
        q,
        j
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = q), f.props = o, f.state = q, f.context = j, o = $) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (n.flags |= 1024), o = !1);
    }
    return f = o, Zr(e, n), o = (n.flags & 128) !== 0, f || o ? (f = n.stateNode, l = o && typeof l.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && o ? (n.child = ls(
      n,
      e.child,
      null,
      h
    ), n.child = ls(
      n,
      null,
      l,
      h
    )) : be(e, n, l, h), n.memoizedState = f.state, e = n.child) : e = Ji(
      e,
      n,
      h
    ), e;
  }
  function wp(e, n, l, o) {
    return ts(), n.flags |= 256, be(e, n, l, o), n.child;
  }
  var Dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ac(e) {
    return { baseLanes: e, cachePool: cm() };
  }
  function Rc(e, n, l) {
    return e = e !== null ? e.childLanes & ~l : 0, n && (e |= Fe), e;
  }
  function _p(e, n, l) {
    var o = n.pendingProps, h = !1, f = (n.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (Jt.current & 2) !== 0), y && (h = !0, n.flags &= -129), y = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Nt) {
        if (h ? wn(n) : _n(), (e = Vt) ? (e = zv(
          e,
          hi
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: mn !== null ? { id: zi, overflow: Ti } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = em(e), l.return = n, n.child = l, ve = n, Vt = null)) : e = null, e === null) throw vn(n);
        return gh(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var _ = o.children;
      return o = o.fallback, h ? (_n(), h = n.mode, _ = Wr(
        { mode: "hidden", children: _ },
        h
      ), o = Pn(
        o,
        h,
        l,
        null
      ), _.return = n, o.return = n, _.sibling = o, n.child = _, o = n.child, o.memoizedState = Ac(l), o.childLanes = Rc(
        e,
        y,
        l
      ), n.memoizedState = Dc, ll(null, o)) : (wn(n), Lc(n, _));
    }
    var j = e.memoizedState;
    if (j !== null && (_ = j.dehydrated, _ !== null)) {
      if (f)
        n.flags & 256 ? (wn(n), n.flags &= -257, n = Bc(
          e,
          n,
          l
        )) : n.memoizedState !== null ? (_n(), n.child = e.child, n.flags |= 128, n = null) : (_n(), _ = o.fallback, h = n.mode, o = Wr(
          { mode: "visible", children: o.children },
          h
        ), _ = Pn(
          _,
          h,
          l,
          null
        ), _.flags |= 2, o.return = n, _.return = n, o.sibling = _, n.child = o, ls(
          n,
          e.child,
          null,
          l
        ), o = n.child, o.memoizedState = Ac(l), o.childLanes = Rc(
          e,
          y,
          l
        ), n.memoizedState = Dc, n = ll(null, o));
      else if (wn(n), gh(_)) {
        if (y = _.nextSibling && _.nextSibling.dataset, y) var U = y.dgst;
        y = U, o = Error(a(419)), o.stack = "", o.digest = y, Za({ value: o, source: null, stack: null }), n = Bc(
          e,
          n,
          l
        );
      } else if (ne || Zs(e, n, l, !1), y = (l & e.childLanes) !== 0, ne || y) {
        if (y = Qt, y !== null && (o = ni(y, l), o !== 0 && o !== j.retryLane))
          throw j.retryLane = o, Jn(e, o), qe(y, e, o), Tc;
        vh(_) || so(), n = Bc(
          e,
          n,
          l
        );
      } else
        vh(_) ? (n.flags |= 192, n.child = e.child, n = null) : (e = j.treeContext, Vt = fi(
          _.nextSibling
        ), ve = n, Nt = !0, pn = null, hi = !1, e !== null && sm(n, e), n = Lc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return h ? (_n(), _ = o.fallback, h = n.mode, j = e.child, U = j.sibling, o = Ki(j, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = j.subtreeFlags & 65011712, U !== null ? _ = Ki(
      U,
      _
    ) : (_ = Pn(
      _,
      h,
      l,
      null
    ), _.flags |= 2), _.return = n, o.return = n, o.sibling = _, n.child = o, ll(null, o), o = n.child, _ = e.child.memoizedState, _ === null ? _ = Ac(l) : (h = _.cachePool, h !== null ? (j = ee._currentValue, h = h.parent !== j ? { parent: j, pool: j } : h) : h = cm(), _ = {
      baseLanes: _.baseLanes | l,
      cachePool: h
    }), o.memoizedState = _, o.childLanes = Rc(
      e,
      y,
      l
    ), n.memoizedState = Dc, ll(e.child, o)) : (wn(n), l = e.child, e = l.sibling, l = Ki(l, {
      mode: "visible",
      children: o.children
    }), l.return = n, l.sibling = null, e !== null && (y = n.deletions, y === null ? (n.deletions = [e], n.flags |= 16) : y.push(e)), n.child = l, n.memoizedState = null, l);
  }
  function Lc(e, n) {
    return n = Wr(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function Wr(e, n) {
    return e = Xe(22, e, null, n), e.lanes = 0, e;
  }
  function Bc(e, n, l) {
    return ls(n, e.child, null, l), e = Lc(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Sp(e, n, l) {
    e.lanes |= n;
    var o = e.alternate;
    o !== null && (o.lanes |= n), Ju(e.return, n, l);
  }
  function Uc(e, n, l, o, h, f) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: l,
      tailMode: h,
      treeForkCount: f
    } : (y.isBackwards = n, y.rendering = null, y.renderingStartTime = 0, y.last = o, y.tail = l, y.tailMode = h, y.treeForkCount = f);
  }
  function Mp(e, n, l) {
    var o = n.pendingProps, h = o.revealOrder, f = o.tail;
    o = o.children;
    var y = Jt.current, _ = (y & 2) !== 0;
    if (_ ? (y = y & 1 | 2, n.flags |= 128) : y &= 1, I(Jt, y), be(e, n, o, l), o = Nt ? Xa : 0, !_ && e !== null && (e.flags & 128) !== 0)
      t: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Sp(e, l, n);
        else if (e.tag === 19)
          Sp(e, l, n);
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
    switch (h) {
      case "forwards":
        for (l = n.child, h = null; l !== null; )
          e = l.alternate, e !== null && Br(e) === null && (h = l), l = l.sibling;
        l = h, l === null ? (h = n.child, n.child = null) : (h = l.sibling, l.sibling = null), Uc(
          n,
          !1,
          h,
          l,
          f,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, h = n.child, n.child = null; h !== null; ) {
          if (e = h.alternate, e !== null && Br(e) === null) {
            n.child = h;
            break;
          }
          e = h.sibling, h.sibling = l, l = h, h = e;
        }
        Uc(
          n,
          !0,
          l,
          null,
          f,
          o
        );
        break;
      case "together":
        Uc(
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
  function Ji(e, n, l) {
    if (e !== null && (n.dependencies = e.dependencies), Nn |= n.lanes, (l & n.childLanes) === 0)
      if (e !== null) {
        if (Zs(
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
      for (e = n.child, l = Ki(e, e.pendingProps), n.child = l, l.return = n; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Ki(e, e.pendingProps), l.return = n;
      l.sibling = null;
    }
    return n.child;
  }
  function Hc(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && kr(e)));
  }
  function Fy(e, n, l) {
    switch (n.tag) {
      case 3:
        Gt(n, n.stateNode.containerInfo), gn(n, ee, e.memoizedState.cache), ts();
        break;
      case 27:
      case 5:
        Ct(n);
        break;
      case 4:
        Gt(n, n.stateNode.containerInfo);
        break;
      case 10:
        gn(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, cc(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (wn(n), n.flags |= 128, null) : (l & n.child.childLanes) !== 0 ? _p(e, n, l) : (wn(n), e = Ji(
            e,
            n,
            l
          ), e !== null ? e.sibling : null);
        wn(n);
        break;
      case 19:
        var h = (e.flags & 128) !== 0;
        if (o = (l & n.childLanes) !== 0, o || (Zs(
          e,
          n,
          l,
          !1
        ), o = (l & n.childLanes) !== 0), h) {
          if (o)
            return Mp(
              e,
              n,
              l
            );
          n.flags |= 128;
        }
        if (h = n.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), I(Jt, Jt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, vp(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        gn(n, ee, e.memoizedState.cache);
    }
    return Ji(e, n, l);
  }
  function Np(e, n, l) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        ne = !0;
      else {
        if (!Hc(e, l) && (n.flags & 128) === 0)
          return ne = !1, Fy(
            e,
            n,
            l
          );
        ne = (e.flags & 131072) !== 0;
      }
    else
      ne = !1, Nt && (n.flags & 1048576) !== 0 && nm(n, Xa, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (e = ss(n.elementType), n.type = e, typeof e == "function")
            Yu(e) ? (o = os(e, o), n.tag = 1, n = xp(
              null,
              n,
              e,
              o,
              l
            )) : (n.tag = 0, n = Oc(
              null,
              n,
              e,
              o,
              l
            ));
          else {
            if (e != null) {
              var h = e.$$typeof;
              if (h === D) {
                n.tag = 11, n = fp(
                  null,
                  n,
                  e,
                  o,
                  l
                );
                break t;
              } else if (h === A) {
                n.tag = 14, n = mp(
                  null,
                  n,
                  e,
                  o,
                  l
                );
                break t;
              }
            }
            throw n = bt(e) || e, Error(a(306, n, ""));
          }
        }
        return n;
      case 0:
        return Oc(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 1:
        return o = n.type, h = os(
          o,
          n.pendingProps
        ), xp(
          e,
          n,
          o,
          h,
          l
        );
      case 3:
        t: {
          if (Gt(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          o = n.pendingProps;
          var f = n.memoizedState;
          h = f.element, ac(e, n), el(n, o, null, l);
          var y = n.memoizedState;
          if (o = y.cache, gn(n, ee, o), o !== f.cache && Pu(
            n,
            [ee],
            l,
            !0
          ), tl(), o = y.element, f.isDehydrated)
            if (f = {
              element: o,
              isDehydrated: !1,
              cache: y.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = wp(
                e,
                n,
                o,
                l
              );
              break t;
            } else if (o !== h) {
              h = oi(
                Error(a(424)),
                n
              ), Za(h), n = wp(
                e,
                n,
                o,
                l
              );
              break t;
            } else
              for (e = n.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Vt = fi(e.firstChild), ve = n, Nt = !0, pn = null, hi = !0, l = vm(
                n,
                null,
                o,
                l
              ), n.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (ts(), o === h) {
              n = Ji(
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
        return Zr(e, n), e === null ? (l = Lv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = l : Nt || (l = n.type, e = n.pendingProps, o = ho(
          ct.current
        ).createElement(l), o[pe] = n, o[Ae] = e, ye(o, l, e), ce(o), n.stateNode = o) : n.memoizedState = Lv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ct(n), e === null && Nt && (o = n.stateNode = Dv(
          n.type,
          n.pendingProps,
          ct.current
        ), ve = n, hi = !0, h = Vt, zn(n.type) ? (bh = h, Vt = fi(o.firstChild)) : Vt = h), be(
          e,
          n,
          n.pendingProps.children,
          l
        ), Zr(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Nt && ((h = o = Vt) && (o = jx(
          o,
          n.type,
          n.pendingProps,
          hi
        ), o !== null ? (n.stateNode = o, ve = n, Vt = fi(o.firstChild), hi = !1, h = !0) : h = !1), h || vn(n)), Ct(n), h = n.type, f = n.pendingProps, y = e !== null ? e.memoizedProps : null, o = f.children, fh(h, f) ? o = null : y !== null && fh(h, y) && (n.flags |= 32), n.memoizedState !== null && (h = dc(
          e,
          n,
          $y,
          null,
          null,
          l
        ), wl._currentValue = h), Zr(e, n), be(e, n, o, l), n.child;
      case 6:
        return e === null && Nt && ((e = l = Vt) && (l = Ex(
          l,
          n.pendingProps,
          hi
        ), l !== null ? (n.stateNode = l, ve = n, Vt = null, e = !0) : e = !1), e || vn(n)), null;
      case 13:
        return _p(e, n, l);
      case 4:
        return Gt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, e === null ? n.child = ls(
          n,
          null,
          o,
          l
        ) : be(e, n, o, l), n.child;
      case 11:
        return fp(
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
        return o = n.pendingProps, gn(n, n.type, o.value), be(e, n, o.children, l), n.child;
      case 9:
        return h = n.type._context, o = n.pendingProps.children, is(n), h = ge(h), o = o(h), n.flags |= 1, be(e, n, o, l), n.child;
      case 14:
        return mp(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 15:
        return pp(
          e,
          n,
          n.type,
          n.pendingProps,
          l
        );
      case 19:
        return Mp(e, n, l);
      case 31:
        return Iy(e, n, l);
      case 22:
        return vp(
          e,
          n,
          l,
          n.pendingProps
        );
      case 24:
        return is(n), o = ge(ee), e === null ? (h = ic(), h === null && (h = Qt, f = tc(), h.pooledCache = f, f.refCount++, f !== null && (h.pooledCacheLanes |= l), h = f), n.memoizedState = { parent: o, cache: h }, sc(n), gn(n, ee, h)) : ((e.lanes & l) !== 0 && (ac(e, n), el(n, null, null, l), tl()), h = e.memoizedState, f = n.memoizedState, h.parent !== o ? (h = { parent: o, cache: o }, n.memoizedState = h, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = h), gn(n, ee, o)) : (o = f.cache, gn(n, ee, o), o !== h.cache && Pu(
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
  function Pi(e) {
    e.flags |= 4;
  }
  function qc(e, n, l, o, h) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (h & 335544128) === h)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jp()) e.flags |= 8192;
        else
          throw as = Dr, nc;
    } else e.flags &= -16777217;
  }
  function Cp(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Qv(n))
      if (Jp()) e.flags |= 8192;
      else
        throw as = Dr, nc;
  }
  function Ir(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Me() : 536870912, e.lanes |= n, la |= n);
  }
  function rl(e, n) {
    if (!Nt)
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
  function Yt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, l = 0, o = 0;
    if (n)
      for (var h = e.child; h !== null; )
        l |= h.lanes | h.childLanes, o |= h.subtreeFlags & 65011712, o |= h.flags & 65011712, h.return = e, h = h.sibling;
    else
      for (h = e.child; h !== null; )
        l |= h.lanes | h.childLanes, o |= h.subtreeFlags, o |= h.flags, h.return = e, h = h.sibling;
    return e.subtreeFlags |= o, e.childLanes = l, n;
  }
  function Jy(e, n, l) {
    var o = n.pendingProps;
    switch (Zu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Yt(n), null;
      case 1:
        return Yt(n), null;
      case 3:
        return l = n.stateNode, o = null, e !== null && (o = e.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Wi(ee), Ot(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Xs(n) ? Pi(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Iu())), Yt(n), null;
      case 26:
        var h = n.type, f = n.memoizedState;
        return e === null ? (Pi(n), f !== null ? (Yt(n), Cp(n, f)) : (Yt(n), qc(
          n,
          h,
          null,
          o,
          l
        ))) : f ? f !== e.memoizedState ? (Pi(n), Yt(n), Cp(n, f)) : (Yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== o && Pi(n), Yt(n), qc(
          n,
          h,
          e,
          o,
          l
        )), null;
      case 27:
        if (Ci(n), l = ct.current, h = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Pi(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Yt(n), null;
          }
          e = tt.current, Xs(n) ? am(n) : (e = Dv(h, o, l), n.stateNode = e, Pi(n));
        }
        return Yt(n), null;
      case 5:
        if (Ci(n), h = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Pi(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Yt(n), null;
          }
          if (f = tt.current, Xs(n))
            am(n);
          else {
            var y = ho(
              ct.current
            );
            switch (f) {
              case 1:
                f = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  h
                );
                break;
              case 2:
                f = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  h
                );
                break;
              default:
                switch (h) {
                  case "svg":
                    f = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      h
                    );
                    break;
                  case "math":
                    f = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      h
                    );
                    break;
                  case "script":
                    f = y.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof o.is == "string" ? y.createElement("select", {
                      is: o.is
                    }) : y.createElement("select"), o.multiple ? f.multiple = !0 : o.size && (f.size = o.size);
                    break;
                  default:
                    f = typeof o.is == "string" ? y.createElement(h, { is: o.is }) : y.createElement(h);
                }
            }
            f[pe] = n, f[Ae] = o;
            t: for (y = n.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                f.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                y.child.return = y, y = y.child;
                continue;
              }
              if (y === n) break t;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === n)
                  break t;
                y = y.return;
              }
              y.sibling.return = y.return, y = y.sibling;
            }
            n.stateNode = f;
            t: switch (ye(f, h, o), h) {
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
            o && Pi(n);
          }
        }
        return Yt(n), qc(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          l
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== o && Pi(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(a(166));
          if (e = ct.current, Xs(n)) {
            if (e = n.stateNode, l = n.memoizedProps, o = null, h = ve, h !== null)
              switch (h.tag) {
                case 27:
                case 5:
                  o = h.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === l || o !== null && o.suppressHydrationWarning === !0 || _v(e.nodeValue, l)), e || vn(n, !0);
          } else
            e = ho(e).createTextNode(
              o
            ), e[pe] = n, n.stateNode = e;
        }
        return Yt(n), null;
      case 31:
        if (l = n.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Xs(n), l !== null) {
            if (e === null) {
              if (!o) throw Error(a(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[pe] = n;
            } else
              ts(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Yt(n), e = !1;
          } else
            l = Iu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return n.flags & 256 ? (We(n), n) : (We(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Yt(n), null;
      case 13:
        if (o = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (h = Xs(n), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!h) throw Error(a(318));
              if (h = n.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(a(317));
              h[pe] = n;
            } else
              ts(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Yt(n), h = !1;
          } else
            h = Iu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = h), h = !0;
          if (!h)
            return n.flags & 256 ? (We(n), n) : (We(n), null);
        }
        return We(n), (n.flags & 128) !== 0 ? (n.lanes = l, n) : (l = o !== null, e = e !== null && e.memoizedState !== null, l && (o = n.child, h = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (h = o.alternate.memoizedState.cachePool.pool), f = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (f = o.memoizedState.cachePool.pool), f !== h && (o.flags |= 2048)), l !== e && l && (n.child.flags |= 8192), Ir(n, n.updateQueue), Yt(n), null);
      case 4:
        return Ot(), e === null && oh(n.stateNode.containerInfo), Yt(n), null;
      case 10:
        return Wi(n.type), Yt(n), null;
      case 19:
        if (Q(Jt), o = n.memoizedState, o === null) return Yt(n), null;
        if (h = (n.flags & 128) !== 0, f = o.rendering, f === null)
          if (h) rl(o, !1);
          else {
            if (Wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = Br(e), f !== null) {
                  for (n.flags |= 128, rl(o, !1), e = f.updateQueue, n.updateQueue = e, Ir(n, e), n.subtreeFlags = 0, e = l, l = n.child; l !== null; )
                    tm(l, e), l = l.sibling;
                  return I(
                    Jt,
                    Jt.current & 1 | 2
                  ), Nt && Xi(n, o.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            o.tail !== null && _e() > eo && (n.flags |= 128, h = !0, rl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!h)
            if (e = Br(f), e !== null) {
              if (n.flags |= 128, h = !0, e = e.updateQueue, n.updateQueue = e, Ir(n, e), rl(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !Nt)
                return Yt(n), null;
            } else
              2 * _e() - o.renderingStartTime > eo && l !== 536870912 && (n.flags |= 128, h = !0, rl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (f.sibling = n.child, n.child = f) : (e = o.last, e !== null ? e.sibling = f : n.child = f, o.last = f);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = _e(), e.sibling = null, l = Jt.current, I(
          Jt,
          h ? l & 1 | 2 : l & 1
        ), Nt && Xi(n, o.treeForkCount), e) : (Yt(n), null);
      case 22:
      case 23:
        return We(n), uc(), o = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (l & 536870912) !== 0 && (n.flags & 128) === 0 && (Yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Yt(n), l = n.updateQueue, l !== null && Ir(n, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== l && (n.flags |= 2048), e !== null && Q(ns), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Wi(ee), Yt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, n.tag));
  }
  function Py(e, n) {
    switch (Zu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Wi(ee), Ot(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ci(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (We(n), n.alternate === null)
            throw Error(a(340));
          ts();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (We(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(a(340));
          ts();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return Q(Jt), null;
      case 4:
        return Ot(), null;
      case 10:
        return Wi(n.type), null;
      case 22:
      case 23:
        return We(n), uc(), e !== null && Q(ns), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Wi(ee), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function jp(e, n) {
    switch (Zu(n), n.tag) {
      case 3:
        Wi(ee), Ot();
        break;
      case 26:
      case 27:
      case 5:
        Ci(n);
        break;
      case 4:
        Ot();
        break;
      case 31:
        n.memoizedState !== null && We(n);
        break;
      case 13:
        We(n);
        break;
      case 19:
        Q(Jt);
        break;
      case 10:
        Wi(n.type);
        break;
      case 22:
      case 23:
        We(n), uc(), e !== null && Q(ns);
        break;
      case 24:
        Wi(ee);
    }
  }
  function ol(e, n) {
    try {
      var l = n.updateQueue, o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var h = o.next;
        l = h;
        do {
          if ((l.tag & e) === e) {
            o = void 0;
            var f = l.create, y = l.inst;
            o = f(), y.destroy = o;
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (_) {
      Lt(n, n.return, _);
    }
  }
  function Sn(e, n, l) {
    try {
      var o = n.updateQueue, h = o !== null ? o.lastEffect : null;
      if (h !== null) {
        var f = h.next;
        o = f;
        do {
          if ((o.tag & e) === e) {
            var y = o.inst, _ = y.destroy;
            if (_ !== void 0) {
              y.destroy = void 0, h = n;
              var j = l, U = _;
              try {
                U();
              } catch ($) {
                Lt(
                  h,
                  j,
                  $
                );
              }
            }
          }
          o = o.next;
        } while (o !== f);
      }
    } catch ($) {
      Lt(n, n.return, $);
    }
  }
  function Ep(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var l = e.stateNode;
      try {
        bm(n, l);
      } catch (o) {
        Lt(e, e.return, o);
      }
    }
  }
  function kp(e, n, l) {
    l.props = os(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (o) {
      Lt(e, n, o);
    }
  }
  function ul(e, n) {
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
    } catch (h) {
      Lt(e, n, h);
    }
  }
  function Oi(e, n) {
    var l = e.ref, o = e.refCleanup;
    if (l !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (h) {
          Lt(e, n, h);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (h) {
          Lt(e, n, h);
        }
      else l.current = null;
  }
  function zp(e) {
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
    } catch (h) {
      Lt(e, e.return, h);
    }
  }
  function Qc(e, n, l) {
    try {
      var o = e.stateNode;
      wx(o, e.type, l, n), o[Ae] = n;
    } catch (h) {
      Lt(e, e.return, h);
    }
  }
  function Tp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && zn(e.type) || e.tag === 4;
  }
  function $c(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Tp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && zn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Vc(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, n) : (n = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, n.appendChild(e), l = l._reactRootContainer, l != null || n.onclick !== null || (n.onclick = Yi));
    else if (o !== 4 && (o === 27 && zn(e.type) && (l = e.stateNode, n = null), e = e.child, e !== null))
      for (Vc(e, n, l), e = e.sibling; e !== null; )
        Vc(e, n, l), e = e.sibling;
  }
  function Fr(e, n, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? l.insertBefore(e, n) : l.appendChild(e);
    else if (o !== 4 && (o === 27 && zn(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Fr(e, n, l), e = e.sibling; e !== null; )
        Fr(e, n, l), e = e.sibling;
  }
  function Op(e) {
    var n = e.stateNode, l = e.memoizedProps;
    try {
      for (var o = e.type, h = n.attributes; h.length; )
        n.removeAttributeNode(h[0]);
      ye(n, o, l), n[pe] = e, n[Ae] = l;
    } catch (f) {
      Lt(e, e.return, f);
    }
  }
  var tn = !1, se = !1, Yc = !1, Dp = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function tx(e, n) {
    if (e = e.containerInfo, hh = yo, e = Gf(e), Bu(e)) {
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
            var h = o.anchorOffset, f = o.focusNode;
            o = o.focusOffset;
            try {
              l.nodeType, f.nodeType;
            } catch {
              l = null;
              break t;
            }
            var y = 0, _ = -1, j = -1, U = 0, $ = 0, K = e, H = null;
            e: for (; ; ) {
              for (var q; K !== l || h !== 0 && K.nodeType !== 3 || (_ = y + h), K !== f || o !== 0 && K.nodeType !== 3 || (j = y + o), K.nodeType === 3 && (y += K.nodeValue.length), (q = K.firstChild) !== null; )
                H = K, K = q;
              for (; ; ) {
                if (K === e) break e;
                if (H === l && ++U === h && (_ = y), H === f && ++$ === o && (j = y), (q = K.nextSibling) !== null) break;
                K = H, H = K.parentNode;
              }
              K = q;
            }
            l = _ === -1 || j === -1 ? null : { start: _, end: j };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (dh = { focusedElem: e, selectionRange: l }, yo = !1, he = n; he !== null; )
      if (n = he, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, he = e;
      else
        for (; he !== null; ) {
          switch (n = he, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  h = e[l], h.ref.impl = h.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, l = n, h = f.memoizedProps, f = f.memoizedState, o = l.stateNode;
                try {
                  var nt = os(
                    l.type,
                    h
                  );
                  e = o.getSnapshotBeforeUpdate(
                    nt,
                    f
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ut) {
                  Lt(
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
                  ph(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ph(e);
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
  function Ap(e, n, l) {
    var o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        nn(e, l), o & 4 && ol(5, l);
        break;
      case 1:
        if (nn(e, l), o & 4)
          if (e = l.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (y) {
              Lt(l, l.return, y);
            }
          else {
            var h = os(
              l.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                h,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Lt(
                l,
                l.return,
                y
              );
            }
          }
        o & 64 && Ep(l), o & 512 && ul(l, l.return);
        break;
      case 3:
        if (nn(e, l), o & 64 && (e = l.updateQueue, e !== null)) {
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
            bm(e, n);
          } catch (y) {
            Lt(l, l.return, y);
          }
        }
        break;
      case 27:
        n === null && o & 4 && Op(l);
      case 26:
      case 5:
        nn(e, l), n === null && o & 4 && zp(l), o & 512 && ul(l, l.return);
        break;
      case 12:
        nn(e, l);
        break;
      case 31:
        nn(e, l), o & 4 && Bp(e, l);
        break;
      case 13:
        nn(e, l), o & 4 && Up(e, l), o & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = ux.bind(
          null,
          l
        ), kx(e, l))));
        break;
      case 22:
        if (o = l.memoizedState !== null || tn, !o) {
          n = n !== null && n.memoizedState !== null || se, h = tn;
          var f = se;
          tn = o, (se = n) && !f ? sn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : nn(e, l), tn = h, se = f;
        }
        break;
      case 30:
        break;
      default:
        nn(e, l);
    }
  }
  function Rp(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Rp(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && xu(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Kt = null, Le = !1;
  function en(e, n, l) {
    for (l = l.child; l !== null; )
      Lp(e, n, l), l = l.sibling;
  }
  function Lp(e, n, l) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function")
      try {
        Ce.onCommitFiberUnmount(Xn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        se || Oi(l, n), en(
          e,
          n,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        se || Oi(l, n);
        var o = Kt, h = Le;
        zn(l.type) && (Kt = l.stateNode, Le = !1), en(
          e,
          n,
          l
        ), bl(l.stateNode), Kt = o, Le = h;
        break;
      case 5:
        se || Oi(l, n);
      case 6:
        if (o = Kt, h = Le, Kt = null, en(
          e,
          n,
          l
        ), Kt = o, Le = h, Kt !== null)
          if (Le)
            try {
              (Kt.nodeType === 9 ? Kt.body : Kt.nodeName === "HTML" ? Kt.ownerDocument.body : Kt).removeChild(l.stateNode);
            } catch (f) {
              Lt(
                l,
                n,
                f
              );
            }
          else
            try {
              Kt.removeChild(l.stateNode);
            } catch (f) {
              Lt(
                l,
                n,
                f
              );
            }
        break;
      case 18:
        Kt !== null && (Le ? (e = Kt, Ev(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), ma(e)) : Ev(Kt, l.stateNode));
        break;
      case 4:
        o = Kt, h = Le, Kt = l.stateNode.containerInfo, Le = !0, en(
          e,
          n,
          l
        ), Kt = o, Le = h;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Sn(2, l, n), se || Sn(4, l, n), en(
          e,
          n,
          l
        );
        break;
      case 1:
        se || (Oi(l, n), o = l.stateNode, typeof o.componentWillUnmount == "function" && kp(
          l,
          n,
          o
        )), en(
          e,
          n,
          l
        );
        break;
      case 21:
        en(
          e,
          n,
          l
        );
        break;
      case 22:
        se = (o = se) || l.memoizedState !== null, en(
          e,
          n,
          l
        ), se = o;
        break;
      default:
        en(
          e,
          n,
          l
        );
    }
  }
  function Bp(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ma(e);
      } catch (l) {
        Lt(n, n.return, l);
      }
    }
  }
  function Up(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ma(e);
      } catch (l) {
        Lt(n, n.return, l);
      }
  }
  function ex(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Dp()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Dp()), n;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function Jr(e, n) {
    var l = ex(e);
    n.forEach(function(o) {
      if (!l.has(o)) {
        l.add(o);
        var h = cx.bind(null, e, o);
        o.then(h, h);
      }
    });
  }
  function Be(e, n) {
    var l = n.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var h = l[o], f = e, y = n, _ = y;
        t: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (zn(_.type)) {
                Kt = _.stateNode, Le = !1;
                break t;
              }
              break;
            case 5:
              Kt = _.stateNode, Le = !1;
              break t;
            case 3:
            case 4:
              Kt = _.stateNode.containerInfo, Le = !0;
              break t;
          }
          _ = _.return;
        }
        if (Kt === null) throw Error(a(160));
        Lp(f, y, h), Kt = null, Le = !1, f = h.alternate, f !== null && (f.return = null), h.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Hp(n, e), n = n.sibling;
  }
  var wi = null;
  function Hp(e, n) {
    var l = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Be(n, e), Ue(e), o & 4 && (Sn(3, e, e.return), ol(3, e), Sn(5, e, e.return));
        break;
      case 1:
        Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 64 && tn && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? o : l.concat(o))));
        break;
      case 26:
        var h = wi;
        if (Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 4) {
          var f = l !== null ? l.memoizedState : null;
          if (o = e.memoizedState, l === null)
            if (o === null)
              if (e.stateNode === null) {
                t: {
                  o = e.type, l = e.memoizedProps, h = h.ownerDocument || h;
                  e: switch (o) {
                    case "title":
                      f = h.getElementsByTagName("title")[0], (!f || f[La] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = h.createElement(o), h.head.insertBefore(
                        f,
                        h.querySelector("head > title")
                      )), ye(f, o, l), f[pe] = e, ce(f), o = f;
                      break t;
                    case "link":
                      var y = Hv(
                        "link",
                        "href",
                        h
                      ).get(o + (l.href || ""));
                      if (y) {
                        for (var _ = 0; _ < y.length; _++)
                          if (f = y[_], f.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && f.getAttribute("rel") === (l.rel == null ? null : l.rel) && f.getAttribute("title") === (l.title == null ? null : l.title) && f.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            y.splice(_, 1);
                            break e;
                          }
                      }
                      f = h.createElement(o), ye(f, o, l), h.head.appendChild(f);
                      break;
                    case "meta":
                      if (y = Hv(
                        "meta",
                        "content",
                        h
                      ).get(o + (l.content || ""))) {
                        for (_ = 0; _ < y.length; _++)
                          if (f = y[_], f.getAttribute("content") === (l.content == null ? null : "" + l.content) && f.getAttribute("name") === (l.name == null ? null : l.name) && f.getAttribute("property") === (l.property == null ? null : l.property) && f.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && f.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            y.splice(_, 1);
                            break e;
                          }
                      }
                      f = h.createElement(o), ye(f, o, l), h.head.appendChild(f);
                      break;
                    default:
                      throw Error(a(468, o));
                  }
                  f[pe] = e, ce(f), o = f;
                }
                e.stateNode = o;
              } else
                qv(
                  h,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Uv(
                h,
                o,
                e.memoizedProps
              );
          else
            f !== o ? (f === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : f.count--, o === null ? qv(
              h,
              e.type,
              e.stateNode
            ) : Uv(
              h,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Qc(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), l !== null && o & 4 && Qc(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Be(n, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), e.flags & 32) {
          h = e.stateNode;
          try {
            Bs(h, "");
          } catch (nt) {
            Lt(e, e.return, nt);
          }
        }
        o & 4 && e.stateNode != null && (h = e.memoizedProps, Qc(
          e,
          h,
          l !== null ? l.memoizedProps : h
        )), o & 1024 && (Yc = !0);
        break;
      case 6:
        if (Be(n, e), Ue(e), o & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          o = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = o;
          } catch (nt) {
            Lt(e, e.return, nt);
          }
        }
        break;
      case 3:
        if (po = null, h = wi, wi = fo(n.containerInfo), Be(n, e), wi = h, Ue(e), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ma(n.containerInfo);
          } catch (nt) {
            Lt(e, e.return, nt);
          }
        Yc && (Yc = !1, qp(e));
        break;
      case 4:
        o = wi, wi = fo(
          e.stateNode.containerInfo
        ), Be(n, e), Ue(e), wi = o;
        break;
      case 12:
        Be(n, e), Ue(e);
        break;
      case 31:
        Be(n, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jr(e, o)));
        break;
      case 13:
        Be(n, e), Ue(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (to = _e()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jr(e, o)));
        break;
      case 22:
        h = e.memoizedState !== null;
        var j = l !== null && l.memoizedState !== null, U = tn, $ = se;
        if (tn = U || h, se = $ || j, Be(n, e), se = $, tn = U, Ue(e), o & 8192)
          t: for (n = e.stateNode, n._visibility = h ? n._visibility & -2 : n._visibility | 1, h && (l === null || j || tn || se || us(e)), l = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (l === null) {
                j = l = n;
                try {
                  if (f = j.stateNode, h)
                    y = f.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    _ = j.stateNode;
                    var K = j.memoizedProps.style, H = K != null && K.hasOwnProperty("display") ? K.display : null;
                    _.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
                  }
                } catch (nt) {
                  Lt(j, j.return, nt);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                j = n;
                try {
                  j.stateNode.nodeValue = h ? "" : j.memoizedProps;
                } catch (nt) {
                  Lt(j, j.return, nt);
                }
              }
            } else if (n.tag === 18) {
              if (l === null) {
                j = n;
                try {
                  var q = j.stateNode;
                  h ? kv(q, !0) : kv(j.stateNode, !1);
                } catch (nt) {
                  Lt(j, j.return, nt);
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
        o & 4 && (o = e.updateQueue, o !== null && (l = o.retryQueue, l !== null && (o.retryQueue = null, Jr(e, l))));
        break;
      case 19:
        Be(n, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jr(e, o)));
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
          if (Tp(o)) {
            l = o;
            break;
          }
          o = o.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var h = l.stateNode, f = $c(e);
            Fr(e, f, h);
            break;
          case 5:
            var y = l.stateNode;
            l.flags & 32 && (Bs(y, ""), l.flags &= -33);
            var _ = $c(e);
            Fr(e, _, y);
            break;
          case 3:
          case 4:
            var j = l.stateNode.containerInfo, U = $c(e);
            Vc(
              e,
              U,
              j
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch ($) {
        Lt(e, e.return, $);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function qp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        qp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function nn(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ap(e, n.alternate, n), n = n.sibling;
  }
  function us(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Sn(4, n, n.return), us(n);
          break;
        case 1:
          Oi(n, n.return);
          var l = n.stateNode;
          typeof l.componentWillUnmount == "function" && kp(
            n,
            n.return,
            l
          ), us(n);
          break;
        case 27:
          bl(n.stateNode);
        case 26:
        case 5:
          Oi(n, n.return), us(n);
          break;
        case 22:
          n.memoizedState === null && us(n);
          break;
        case 30:
          us(n);
          break;
        default:
          us(n);
      }
      e = e.sibling;
    }
  }
  function sn(e, n, l) {
    for (l = l && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, h = e, f = n, y = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          sn(
            h,
            f,
            l
          ), ol(4, f);
          break;
        case 1:
          if (sn(
            h,
            f,
            l
          ), o = f, h = o.stateNode, typeof h.componentDidMount == "function")
            try {
              h.componentDidMount();
            } catch (U) {
              Lt(o, o.return, U);
            }
          if (o = f, h = o.updateQueue, h !== null) {
            var _ = o.stateNode;
            try {
              var j = h.shared.hiddenCallbacks;
              if (j !== null)
                for (h.shared.hiddenCallbacks = null, h = 0; h < j.length; h++)
                  gm(j[h], _);
            } catch (U) {
              Lt(o, o.return, U);
            }
          }
          l && y & 64 && Ep(f), ul(f, f.return);
          break;
        case 27:
          Op(f);
        case 26:
        case 5:
          sn(
            h,
            f,
            l
          ), l && o === null && y & 4 && zp(f), ul(f, f.return);
          break;
        case 12:
          sn(
            h,
            f,
            l
          );
          break;
        case 31:
          sn(
            h,
            f,
            l
          ), l && y & 4 && Bp(h, f);
          break;
        case 13:
          sn(
            h,
            f,
            l
          ), l && y & 4 && Up(h, f);
          break;
        case 22:
          f.memoizedState === null && sn(
            h,
            f,
            l
          ), ul(f, f.return);
          break;
        case 30:
          break;
        default:
          sn(
            h,
            f,
            l
          );
      }
      n = n.sibling;
    }
  }
  function Gc(e, n) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Wa(l));
  }
  function Kc(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Wa(e));
  }
  function _i(e, n, l, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Qp(
          e,
          n,
          l,
          o
        ), n = n.sibling;
  }
  function Qp(e, n, l, o) {
    var h = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        _i(
          e,
          n,
          l,
          o
        ), h & 2048 && ol(9, n);
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
        ), h & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Wa(e)));
        break;
      case 12:
        if (h & 2048) {
          _i(
            e,
            n,
            l,
            o
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, y = f.id, _ = f.onPostCommit;
            typeof _ == "function" && _(
              y,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (j) {
            Lt(n, n.return, j);
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
        f = n.stateNode, y = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? _i(
          e,
          n,
          l,
          o
        ) : cl(e, n) : f._visibility & 2 ? _i(
          e,
          n,
          l,
          o
        ) : (f._visibility |= 2, na(
          e,
          n,
          l,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), h & 2048 && Gc(y, n);
        break;
      case 24:
        _i(
          e,
          n,
          l,
          o
        ), h & 2048 && Kc(n.alternate, n);
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
  function na(e, n, l, o, h) {
    for (h = h && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, y = n, _ = l, j = o, U = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          na(
            f,
            y,
            _,
            j,
            h
          ), ol(8, y);
          break;
        case 23:
          break;
        case 22:
          var $ = y.stateNode;
          y.memoizedState !== null ? $._visibility & 2 ? na(
            f,
            y,
            _,
            j,
            h
          ) : cl(
            f,
            y
          ) : ($._visibility |= 2, na(
            f,
            y,
            _,
            j,
            h
          )), h && U & 2048 && Gc(
            y.alternate,
            y
          );
          break;
        case 24:
          na(
            f,
            y,
            _,
            j,
            h
          ), h && U & 2048 && Kc(y.alternate, y);
          break;
        default:
          na(
            f,
            y,
            _,
            j,
            h
          );
      }
      n = n.sibling;
    }
  }
  function cl(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = e, o = n, h = o.flags;
        switch (o.tag) {
          case 22:
            cl(l, o), h & 2048 && Gc(
              o.alternate,
              o
            );
            break;
          case 24:
            cl(l, o), h & 2048 && Kc(o.alternate, o);
            break;
          default:
            cl(l, o);
        }
        n = n.sibling;
      }
  }
  var hl = 8192;
  function sa(e, n, l) {
    if (e.subtreeFlags & hl)
      for (e = e.child; e !== null; )
        $p(
          e,
          n,
          l
        ), e = e.sibling;
  }
  function $p(e, n, l) {
    switch (e.tag) {
      case 26:
        sa(
          e,
          n,
          l
        ), e.flags & hl && e.memoizedState !== null && Qx(
          l,
          wi,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        sa(
          e,
          n,
          l
        );
        break;
      case 3:
      case 4:
        var o = wi;
        wi = fo(e.stateNode.containerInfo), sa(
          e,
          n,
          l
        ), wi = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = hl, hl = 16777216, sa(
          e,
          n,
          l
        ), hl = o) : sa(
          e,
          n,
          l
        ));
        break;
      default:
        sa(
          e,
          n,
          l
        );
    }
  }
  function Vp(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function dl(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          he = o, Gp(
            o,
            e
          );
        }
      Vp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Yp(e), e = e.sibling;
  }
  function Yp(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        dl(e), e.flags & 2048 && Sn(9, e, e.return);
        break;
      case 3:
        dl(e);
        break;
      case 12:
        dl(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, Pr(e)) : dl(e);
        break;
      default:
        dl(e);
    }
  }
  function Pr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          he = o, Gp(
            o,
            e
          );
        }
      Vp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Sn(8, n, n.return), Pr(n);
          break;
        case 22:
          l = n.stateNode, l._visibility & 2 && (l._visibility &= -3, Pr(n));
          break;
        default:
          Pr(n);
      }
      e = e.sibling;
    }
  }
  function Gp(e, n) {
    for (; he !== null; ) {
      var l = he;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Sn(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var o = l.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Wa(l.memoizedState.cache);
      }
      if (o = l.child, o !== null) o.return = l, he = o;
      else
        t: for (l = e; he !== null; ) {
          o = he;
          var h = o.sibling, f = o.return;
          if (Rp(o), o === l) {
            he = null;
            break t;
          }
          if (h !== null) {
            h.return = f, he = h;
            break t;
          }
          he = f;
        }
    }
  }
  var ix = {
    getCacheForType: function(e) {
      var n = ge(ee), l = n.data.get(e);
      return l === void 0 && (l = e(), n.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return ge(ee).controller.signal;
    }
  }, nx = typeof WeakMap == "function" ? WeakMap : Map, Dt = 0, Qt = null, xt = null, _t = 0, Rt = 0, Ie = null, Mn = !1, aa = !1, Xc = !1, an = 0, Wt = 0, Nn = 0, cs = 0, Zc = 0, Fe = 0, la = 0, fl = null, He = null, Wc = !1, to = 0, Kp = 0, eo = 1 / 0, io = null, Cn = null, re = 0, jn = null, ra = null, ln = 0, Ic = 0, Fc = null, Xp = null, ml = 0, Jc = null;
  function Je() {
    return (Dt & 2) !== 0 && _t !== 0 ? _t & -_t : L.T !== null ? sh() : yi();
  }
  function Zp() {
    if (Fe === 0)
      if ((_t & 536870912) === 0 || Nt) {
        var e = zs;
        zs <<= 1, (zs & 3932160) === 0 && (zs = 262144), Fe = e;
      } else Fe = 536870912;
    return e = Ze.current, e !== null && (e.flags |= 32), Fe;
  }
  function qe(e, n, l) {
    (e === Qt && (Rt === 2 || Rt === 9) || e.cancelPendingCommit !== null) && (oa(e, 0), En(
      e,
      _t,
      Fe,
      !1
    )), ii(e, l), ((Dt & 2) === 0 || e !== Qt) && (e === Qt && ((Dt & 2) === 0 && (cs |= l), Wt === 4 && En(
      e,
      _t,
      Fe,
      !1
    )), Di(e));
  }
  function Wp(e, n, l) {
    if ((Dt & 6) !== 0) throw Error(a(327));
    var o = !l && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Te(e, n), h = o ? lx(e, n) : th(e, n, !0), f = o;
    do {
      if (h === 0) {
        aa && !o && En(e, n, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, f && !sx(l)) {
          h = th(e, n, !1), f = !1;
          continue;
        }
        if (h === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            n = y;
            t: {
              var _ = e;
              h = fl;
              var j = _.current.memoizedState.isDehydrated;
              if (j && (oa(_, y).flags |= 256), y = th(
                _,
                y,
                !1
              ), y !== 2) {
                if (Xc && !j) {
                  _.errorRecoveryDisabledLanes |= f, cs |= f, h = 4;
                  break t;
                }
                f = He, He = h, f !== null && (He === null ? He = f : He.push.apply(
                  He,
                  f
                ));
              }
              h = y;
            }
            if (f = !1, h !== 2) continue;
          }
        }
        if (h === 1) {
          oa(e, 0), En(e, n, 0, !0);
          break;
        }
        t: {
          switch (o = e, f = h, f) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              En(
                o,
                n,
                Fe,
                !Mn
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
          if ((n & 62914560) === n && (h = to + 300 - _e(), 10 < h)) {
            if (En(
              o,
              n,
              Fe,
              !Mn
            ), ue(o, 0, !0) !== 0) break t;
            ln = n, o.timeoutHandle = Cv(
              Ip.bind(
                null,
                o,
                l,
                He,
                io,
                Wc,
                n,
                Fe,
                cs,
                la,
                Mn,
                f,
                "Throttled",
                -0,
                0
              ),
              h
            );
            break t;
          }
          Ip(
            o,
            l,
            He,
            io,
            Wc,
            n,
            Fe,
            cs,
            la,
            Mn,
            f,
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
  function Ip(e, n, l, o, h, f, y, _, j, U, $, K, H, q) {
    if (e.timeoutHandle = -1, K = n.subtreeFlags, K & 8192 || (K & 16785408) === 16785408) {
      K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yi
      }, $p(
        n,
        f,
        K
      );
      var nt = (f & 62914560) === f ? to - _e() : (f & 4194048) === f ? Kp - _e() : 0;
      if (nt = $x(
        K,
        nt
      ), nt !== null) {
        ln = f, e.cancelPendingCommit = nt(
          sv.bind(
            null,
            e,
            n,
            f,
            l,
            o,
            h,
            y,
            _,
            j,
            $,
            K,
            null,
            H,
            q
          )
        ), En(e, f, y, !U);
        return;
      }
    }
    sv(
      e,
      n,
      f,
      l,
      o,
      h,
      y,
      _,
      j
    );
  }
  function sx(e) {
    for (var n = e; ; ) {
      var l = n.tag;
      if ((l === 0 || l === 11 || l === 15) && n.flags & 16384 && (l = n.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var o = 0; o < l.length; o++) {
          var h = l[o], f = h.getSnapshot;
          h = h.value;
          try {
            if (!Ke(f(), h)) return !1;
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
  function En(e, n, l, o) {
    n &= ~Zc, n &= ~cs, e.suspendedLanes |= n, e.pingedLanes &= ~n, o && (e.warmLanes |= n), o = e.expirationTimes;
    for (var h = n; 0 < h; ) {
      var f = 31 - Se(h), y = 1 << f;
      o[f] = -1, h &= ~y;
    }
    l !== 0 && bi(e, l, n);
  }
  function no() {
    return (Dt & 6) === 0 ? (pl(0), !1) : !0;
  }
  function Pc() {
    if (xt !== null) {
      if (Rt === 0)
        var e = xt.return;
      else
        e = xt, Zi = es = null, pc(e), Js = null, Fa = 0, e = xt;
      for (; e !== null; )
        jp(e.alternate, e), e = e.return;
      xt = null;
    }
  }
  function oa(e, n) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, Mx(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ln = 0, Pc(), Qt = e, xt = l = Ki(e.current, null), _t = n, Rt = 0, Ie = null, Mn = !1, aa = Te(e, n), Xc = !1, la = Fe = Zc = cs = Nn = Wt = 0, He = fl = null, Wc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= n; 0 < o; ) {
        var h = 31 - Se(o), f = 1 << h;
        n |= e[h], o &= ~f;
      }
    return an = n, Mr(), l;
  }
  function Fp(e, n) {
    gt = null, L.H = al, n === Fs || n === Or ? (n = fm(), Rt = 3) : n === nc ? (n = fm(), Rt = 4) : Rt = n === Tc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ie = n, xt === null && (Wt = 1, Kr(
      e,
      oi(n, e.current)
    ));
  }
  function Jp() {
    var e = Ze.current;
    return e === null ? !0 : (_t & 4194048) === _t ? di === null : (_t & 62914560) === _t || (_t & 536870912) !== 0 ? e === di : !1;
  }
  function Pp() {
    var e = L.H;
    return L.H = al, e === null ? al : e;
  }
  function tv() {
    var e = L.A;
    return L.A = ix, e;
  }
  function so() {
    Wt = 4, Mn || (_t & 4194048) !== _t && Ze.current !== null || (aa = !0), (Nn & 134217727) === 0 && (cs & 134217727) === 0 || Qt === null || En(
      Qt,
      _t,
      Fe,
      !1
    );
  }
  function th(e, n, l) {
    var o = Dt;
    Dt |= 2;
    var h = Pp(), f = tv();
    (Qt !== e || _t !== n) && (io = null, oa(e, n)), n = !1;
    var y = Wt;
    t: do
      try {
        if (Rt !== 0 && xt !== null) {
          var _ = xt, j = Ie;
          switch (Rt) {
            case 8:
              Pc(), y = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ze.current === null && (n = !0);
              var U = Rt;
              if (Rt = 0, Ie = null, ua(e, _, j, U), l && aa) {
                y = 0;
                break t;
              }
              break;
            default:
              U = Rt, Rt = 0, Ie = null, ua(e, _, j, U);
          }
        }
        ax(), y = Wt;
        break;
      } catch ($) {
        Fp(e, $);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Zi = es = null, Dt = o, L.H = h, L.A = f, xt === null && (Qt = null, _t = 0, Mr()), y;
  }
  function ax() {
    for (; xt !== null; ) ev(xt);
  }
  function lx(e, n) {
    var l = Dt;
    Dt |= 2;
    var o = Pp(), h = tv();
    Qt !== e || _t !== n ? (io = null, eo = _e() + 500, oa(e, n)) : aa = Te(
      e,
      n
    );
    t: do
      try {
        if (Rt !== 0 && xt !== null) {
          n = xt;
          var f = Ie;
          e: switch (Rt) {
            case 1:
              Rt = 0, Ie = null, ua(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (hm(f)) {
                Rt = 0, Ie = null, iv(n);
                break;
              }
              n = function() {
                Rt !== 2 && Rt !== 9 || Qt !== e || (Rt = 7), Di(e);
              }, f.then(n, n);
              break t;
            case 3:
              Rt = 7;
              break t;
            case 4:
              Rt = 5;
              break t;
            case 7:
              hm(f) ? (Rt = 0, Ie = null, iv(n)) : (Rt = 0, Ie = null, ua(e, n, f, 7));
              break;
            case 5:
              var y = null;
              switch (xt.tag) {
                case 26:
                  y = xt.memoizedState;
                case 5:
                case 27:
                  var _ = xt;
                  if (y ? Qv(y) : _.stateNode.complete) {
                    Rt = 0, Ie = null;
                    var j = _.sibling;
                    if (j !== null) xt = j;
                    else {
                      var U = _.return;
                      U !== null ? (xt = U, ao(U)) : xt = null;
                    }
                    break e;
                  }
              }
              Rt = 0, Ie = null, ua(e, n, f, 5);
              break;
            case 6:
              Rt = 0, Ie = null, ua(e, n, f, 6);
              break;
            case 8:
              Pc(), Wt = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        rx();
        break;
      } catch ($) {
        Fp(e, $);
      }
    while (!0);
    return Zi = es = null, L.H = o, L.A = h, Dt = l, xt !== null ? 0 : (Qt = null, _t = 0, Mr(), Wt);
  }
  function rx() {
    for (; xt !== null && !Es(); )
      ev(xt);
  }
  function ev(e) {
    var n = Np(e.alternate, e, an);
    e.memoizedProps = e.pendingProps, n === null ? ao(e) : xt = n;
  }
  function iv(e) {
    var n = e, l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = yp(
          l,
          n,
          n.pendingProps,
          n.type,
          void 0,
          _t
        );
        break;
      case 11:
        n = yp(
          l,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          _t
        );
        break;
      case 5:
        pc(n);
      default:
        jp(l, n), n = xt = tm(n, an), n = Np(l, n, an);
    }
    e.memoizedProps = e.pendingProps, n === null ? ao(e) : xt = n;
  }
  function ua(e, n, l, o) {
    Zi = es = null, pc(n), Js = null, Fa = 0;
    var h = n.return;
    try {
      if (Wy(
        e,
        h,
        n,
        l,
        _t
      )) {
        Wt = 1, Kr(
          e,
          oi(l, e.current)
        ), xt = null;
        return;
      }
    } catch (f) {
      if (h !== null) throw xt = h, f;
      Wt = 1, Kr(
        e,
        oi(l, e.current)
      ), xt = null;
      return;
    }
    n.flags & 32768 ? (Nt || o === 1 ? e = !0 : aa || (_t & 536870912) !== 0 ? e = !1 : (Mn = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ze.current, o !== null && o.tag === 13 && (o.flags |= 16384))), nv(n, e)) : ao(n);
  }
  function ao(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        nv(
          n,
          Mn
        );
        return;
      }
      e = n.return;
      var l = Jy(
        n.alternate,
        n,
        an
      );
      if (l !== null) {
        xt = l;
        return;
      }
      if (n = n.sibling, n !== null) {
        xt = n;
        return;
      }
      xt = n = e;
    } while (n !== null);
    Wt === 0 && (Wt = 5);
  }
  function nv(e, n) {
    do {
      var l = Py(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, xt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !n && (e = e.sibling, e !== null)) {
        xt = e;
        return;
      }
      xt = e = l;
    } while (e !== null);
    Wt = 6, xt = null;
  }
  function sv(e, n, l, o, h, f, y, _, j) {
    e.cancelPendingCommit = null;
    do
      lo();
    while (re !== 0);
    if ((Dt & 6) !== 0) throw Error(a(327));
    if (n !== null) {
      if (n === e.current) throw Error(a(177));
      if (f = n.lanes | n.childLanes, f |= $u, le(
        e,
        l,
        f,
        y,
        _,
        j
      ), e === Qt && (xt = Qt = null, _t = 0), ra = n, jn = e, ln = l, Ic = f, Fc = h, Xp = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, hx(gi, function() {
        return uv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = L.T, L.T = null, h = Z.p, Z.p = 2, y = Dt, Dt |= 4;
        try {
          tx(e, n, l);
        } finally {
          Dt = y, Z.p = h, L.T = o;
        }
      }
      re = 1, av(), lv(), rv();
    }
  }
  function av() {
    if (re === 1) {
      re = 0;
      var e = jn, n = ra, l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        l = L.T, L.T = null;
        var o = Z.p;
        Z.p = 2;
        var h = Dt;
        Dt |= 4;
        try {
          Hp(n, e);
          var f = dh, y = Gf(e.containerInfo), _ = f.focusedElem, j = f.selectionRange;
          if (y !== _ && _ && _.ownerDocument && Yf(
            _.ownerDocument.documentElement,
            _
          )) {
            if (j !== null && Bu(_)) {
              var U = j.start, $ = j.end;
              if ($ === void 0 && ($ = U), "selectionStart" in _)
                _.selectionStart = U, _.selectionEnd = Math.min(
                  $,
                  _.value.length
                );
              else {
                var K = _.ownerDocument || document, H = K && K.defaultView || window;
                if (H.getSelection) {
                  var q = H.getSelection(), nt = _.textContent.length, ut = Math.min(j.start, nt), qt = j.end === void 0 ? ut : Math.min(j.end, nt);
                  !q.extend && ut > qt && (y = qt, qt = ut, ut = y);
                  var O = Vf(
                    _,
                    ut
                  ), z = Vf(
                    _,
                    qt
                  );
                  if (O && z && (q.rangeCount !== 1 || q.anchorNode !== O.node || q.anchorOffset !== O.offset || q.focusNode !== z.node || q.focusOffset !== z.offset)) {
                    var B = K.createRange();
                    B.setStart(O.node, O.offset), q.removeAllRanges(), ut > qt ? (q.addRange(B), q.extend(z.node, z.offset)) : (B.setEnd(z.node, z.offset), q.addRange(B));
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
          yo = !!hh, dh = hh = null;
        } finally {
          Dt = h, Z.p = o, L.T = l;
        }
      }
      e.current = n, re = 2;
    }
  }
  function lv() {
    if (re === 2) {
      re = 0;
      var e = jn, n = ra, l = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || l) {
        l = L.T, L.T = null;
        var o = Z.p;
        Z.p = 2;
        var h = Dt;
        Dt |= 4;
        try {
          Ap(e, n.alternate, n);
        } finally {
          Dt = h, Z.p = o, L.T = l;
        }
      }
      re = 3;
    }
  }
  function rv() {
    if (re === 4 || re === 3) {
      re = 0, ur();
      var e = jn, n = ra, l = ln, o = Xp;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? re = 5 : (re = 0, ra = jn = null, ov(e, e.pendingLanes));
      var h = e.pendingLanes;
      if (h === 0 && (Cn = null), $i(l), n = n.stateNode, Ce && typeof Ce.onCommitFiberRoot == "function")
        try {
          Ce.onCommitFiberRoot(
            Xn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = L.T, h = Z.p, Z.p = 2, L.T = null;
        try {
          for (var f = e.onRecoverableError, y = 0; y < o.length; y++) {
            var _ = o[y];
            f(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          L.T = n, Z.p = h;
        }
      }
      (ln & 3) !== 0 && lo(), Di(e), h = e.pendingLanes, (l & 261930) !== 0 && (h & 42) !== 0 ? e === Jc ? ml++ : (ml = 0, Jc = e) : ml = 0, pl(0);
    }
  }
  function ov(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Wa(n)));
  }
  function lo() {
    return av(), lv(), rv(), uv();
  }
  function uv() {
    if (re !== 5) return !1;
    var e = jn, n = Ic;
    Ic = 0;
    var l = $i(ln), o = L.T, h = Z.p;
    try {
      Z.p = 32 > l ? 32 : l, L.T = null, l = Fc, Fc = null;
      var f = jn, y = ln;
      if (re = 0, ra = jn = null, ln = 0, (Dt & 6) !== 0) throw Error(a(331));
      var _ = Dt;
      if (Dt |= 4, Yp(f.current), Qp(
        f,
        f.current,
        y,
        l
      ), Dt = _, pl(0, !1), Ce && typeof Ce.onPostCommitFiberRoot == "function")
        try {
          Ce.onPostCommitFiberRoot(Xn, f);
        } catch {
        }
      return !0;
    } finally {
      Z.p = h, L.T = o, ov(e, n);
    }
  }
  function cv(e, n, l) {
    n = oi(l, n), n = zc(e.stateNode, n, 2), e = xn(e, n, 2), e !== null && (ii(e, 2), Di(e));
  }
  function Lt(e, n, l) {
    if (e.tag === 3)
      cv(e, e, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          cv(
            n,
            e,
            l
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Cn === null || !Cn.has(o))) {
            e = oi(l, e), l = hp(2), o = xn(n, l, 2), o !== null && (dp(
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
  function eh(e, n, l) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new nx();
      var h = /* @__PURE__ */ new Set();
      o.set(n, h);
    } else
      h = o.get(n), h === void 0 && (h = /* @__PURE__ */ new Set(), o.set(n, h));
    h.has(l) || (Xc = !0, h.add(l), e = ox.bind(null, e, n, l), n.then(e, e));
  }
  function ox(e, n, l) {
    var o = e.pingCache;
    o !== null && o.delete(n), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qt === e && (_t & l) === l && (Wt === 4 || Wt === 3 && (_t & 62914560) === _t && 300 > _e() - to ? (Dt & 2) === 0 && oa(e, 0) : Zc |= l, la === _t && (la = 0)), Di(e);
  }
  function hv(e, n) {
    n === 0 && (n = Me()), e = Jn(e, n), e !== null && (ii(e, n), Di(e));
  }
  function ux(e) {
    var n = e.memoizedState, l = 0;
    n !== null && (l = n.retryLane), hv(e, l);
  }
  function cx(e, n) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, h = e.memoizedState;
        h !== null && (l = h.retryLane);
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
    o !== null && o.delete(n), hv(e, l);
  }
  function hx(e, n) {
    return ti(e, n);
  }
  var ro = null, ca = null, ih = !1, oo = !1, nh = !1, kn = 0;
  function Di(e) {
    e !== ca && e.next === null && (ca === null ? ro = ca = e : ca = ca.next = e), oo = !0, ih || (ih = !0, fx());
  }
  function pl(e, n) {
    if (!nh && oo) {
      nh = !0;
      do
        for (var l = !1, o = ro; o !== null; ) {
          if (e !== 0) {
            var h = o.pendingLanes;
            if (h === 0) var f = 0;
            else {
              var y = o.suspendedLanes, _ = o.pingedLanes;
              f = (1 << 31 - Se(42 | e) + 1) - 1, f &= h & ~(y & ~_), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (l = !0, pv(o, f));
          } else
            f = _t, f = ue(
              o,
              o === Qt ? f : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (f & 3) === 0 || Te(o, f) || (l = !0, pv(o, f));
          o = o.next;
        }
      while (l);
      nh = !1;
    }
  }
  function dx() {
    dv();
  }
  function dv() {
    oo = ih = !1;
    var e = 0;
    kn !== 0 && Sx() && (e = kn);
    for (var n = _e(), l = null, o = ro; o !== null; ) {
      var h = o.next, f = fv(o, n);
      f === 0 ? (o.next = null, l === null ? ro = h : l.next = h, h === null && (ca = l)) : (l = o, (e !== 0 || (f & 3) !== 0) && (oo = !0)), o = h;
    }
    re !== 0 && re !== 5 || pl(e), kn !== 0 && (kn = 0);
  }
  function fv(e, n) {
    for (var l = e.suspendedLanes, o = e.pingedLanes, h = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var y = 31 - Se(f), _ = 1 << y, j = h[y];
      j === -1 ? ((_ & l) === 0 || (_ & o) !== 0) && (h[y] = Oe(_, n)) : j <= n && (e.expiredLanes |= _), f &= ~_;
    }
    if (n = Qt, l = _t, l = ue(
      e,
      e === n ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, l === 0 || e === n && (Rt === 2 || Rt === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && hn(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Te(e, l)) {
      if (n = l & -l, n === e.callbackPriority) return n;
      switch (o !== null && hn(o), $i(l)) {
        case 2:
        case 8:
          l = qi;
          break;
        case 32:
          l = gi;
          break;
        case 268435456:
          l = Ra;
          break;
        default:
          l = gi;
      }
      return o = mv.bind(null, e), l = ti(l, o), e.callbackPriority = n, e.callbackNode = l, n;
    }
    return o !== null && o !== null && hn(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function mv(e, n) {
    if (re !== 0 && re !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (lo() && e.callbackNode !== l)
      return null;
    var o = _t;
    return o = ue(
      e,
      e === Qt ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (Wp(e, o, n), fv(e, _e()), e.callbackNode != null && e.callbackNode === l ? mv.bind(null, e) : null);
  }
  function pv(e, n) {
    if (lo()) return null;
    Wp(e, n, !0);
  }
  function fx() {
    Nx(function() {
      (Dt & 6) !== 0 ? ti(
        cr,
        dx
      ) : dv();
    });
  }
  function sh() {
    if (kn === 0) {
      var e = Ws;
      e === 0 && (e = ks, ks <<= 1, (ks & 261888) === 0 && (ks = 256)), kn = e;
    }
    return kn;
  }
  function vv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : vr("" + e);
  }
  function gv(e, n) {
    var l = n.ownerDocument.createElement("input");
    return l.name = n.name, l.value = n.value, e.id && l.setAttribute("form", e.id), n.parentNode.insertBefore(l, n), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function mx(e, n, l, o, h) {
    if (n === "submit" && l && l.stateNode === h) {
      var f = vv(
        (h[Ae] || null).action
      ), y = o.submitter;
      y && (n = (n = y[Ae] || null) ? vv(n.formAction) : y.getAttribute("formAction"), n !== null && (f = n, y = null));
      var _ = new xr(
        "action",
        "action",
        null,
        o,
        h
      );
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (kn !== 0) {
                  var j = y ? gv(h, y) : new FormData(h);
                  Mc(
                    l,
                    {
                      pending: !0,
                      data: j,
                      method: h.method,
                      action: f
                    },
                    null,
                    j
                  );
                }
              } else
                typeof f == "function" && (_.preventDefault(), j = y ? gv(h, y) : new FormData(h), Mc(
                  l,
                  {
                    pending: !0,
                    data: j,
                    method: h.method,
                    action: f
                  },
                  f,
                  j
                ));
            },
            currentTarget: h
          }
        ]
      });
    }
  }
  for (var ah = 0; ah < Qu.length; ah++) {
    var lh = Qu[ah], px = lh.toLowerCase(), vx = lh[0].toUpperCase() + lh.slice(1);
    xi(
      px,
      "on" + vx
    );
  }
  xi(Zf, "onAnimationEnd"), xi(Wf, "onAnimationIteration"), xi(If, "onAnimationStart"), xi("dblclick", "onDoubleClick"), xi("focusin", "onFocus"), xi("focusout", "onBlur"), xi(Oy, "onTransitionRun"), xi(Dy, "onTransitionStart"), xi(Ay, "onTransitionCancel"), xi(Ff, "onTransitionEnd"), Rs("onMouseEnter", ["mouseout", "mouseover"]), Rs("onMouseLeave", ["mouseout", "mouseover"]), Rs("onPointerEnter", ["pointerout", "pointerover"]), Rs("onPointerLeave", ["pointerout", "pointerover"]), Zn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Zn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Zn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Zn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Zn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Zn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var vl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), gx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vl)
  );
  function bv(e, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var o = e[l], h = o.event;
      o = o.listeners;
      t: {
        var f = void 0;
        if (n)
          for (var y = o.length - 1; 0 <= y; y--) {
            var _ = o[y], j = _.instance, U = _.currentTarget;
            if (_ = _.listener, j !== f && h.isPropagationStopped())
              break t;
            f = _, h.currentTarget = U;
            try {
              f(h);
            } catch ($) {
              Sr($);
            }
            h.currentTarget = null, f = j;
          }
        else
          for (y = 0; y < o.length; y++) {
            if (_ = o[y], j = _.instance, U = _.currentTarget, _ = _.listener, j !== f && h.isPropagationStopped())
              break t;
            f = _, h.currentTarget = U;
            try {
              f(h);
            } catch ($) {
              Sr($);
            }
            h.currentTarget = null, f = j;
          }
      }
    }
  }
  function wt(e, n) {
    var l = n[yu];
    l === void 0 && (l = n[yu] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    l.has(o) || (yv(n, e, 2, !1), l.add(o));
  }
  function rh(e, n, l) {
    var o = 0;
    n && (o |= 4), yv(
      l,
      e,
      o,
      n
    );
  }
  var uo = "_reactListening" + Math.random().toString(36).slice(2);
  function oh(e) {
    if (!e[uo]) {
      e[uo] = !0, df.forEach(function(l) {
        l !== "selectionchange" && (gx.has(l) || rh(l, !1, e), rh(l, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[uo] || (n[uo] = !0, rh("selectionchange", !1, n));
    }
  }
  function yv(e, n, l, o) {
    switch (Zv(n)) {
      case 2:
        var h = Gx;
        break;
      case 8:
        h = Kx;
        break;
      default:
        h = Sh;
    }
    l = h.bind(
      null,
      n,
      l,
      e
    ), h = void 0, !Eu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (h = !0), o ? h !== void 0 ? e.addEventListener(n, l, {
      capture: !0,
      passive: h
    }) : e.addEventListener(n, l, !0) : h !== void 0 ? e.addEventListener(n, l, {
      passive: h
    }) : e.addEventListener(n, l, !1);
  }
  function uh(e, n, l, o, h) {
    var f = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var y = o.tag;
        if (y === 3 || y === 4) {
          var _ = o.stateNode.containerInfo;
          if (_ === h) break;
          if (y === 4)
            for (y = o.return; y !== null; ) {
              var j = y.tag;
              if ((j === 3 || j === 4) && y.stateNode.containerInfo === h)
                return;
              y = y.return;
            }
          for (; _ !== null; ) {
            if (y = Os(_), y === null) return;
            if (j = y.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              o = f = y;
              continue t;
            }
            _ = _.parentNode;
          }
        }
        o = o.return;
      }
    Mf(function() {
      var U = f, $ = Cu(l), K = [];
      t: {
        var H = Jf.get(e);
        if (H !== void 0) {
          var q = xr, nt = e;
          switch (e) {
            case "keypress":
              if (br(l) === 0) break t;
            case "keydown":
            case "keyup":
              q = cy;
              break;
            case "focusin":
              nt = "focus", q = Ou;
              break;
            case "focusout":
              nt = "blur", q = Ou;
              break;
            case "beforeblur":
            case "afterblur":
              q = Ou;
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
              q = jf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = J1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = fy;
              break;
            case Zf:
            case Wf:
            case If:
              q = ey;
              break;
            case Ff:
              q = py;
              break;
            case "scroll":
            case "scrollend":
              q = I1;
              break;
            case "wheel":
              q = gy;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = ny;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = kf;
              break;
            case "toggle":
            case "beforetoggle":
              q = yy;
          }
          var ut = (n & 4) !== 0, qt = !ut && (e === "scroll" || e === "scrollend"), O = ut ? H !== null ? H + "Capture" : null : H;
          ut = [];
          for (var z = U, B; z !== null; ) {
            var Y = z;
            if (B = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || B === null || O === null || (Y = Ua(z, O), Y != null && ut.push(
              gl(z, Y, B)
            )), qt) break;
            z = z.return;
          }
          0 < ut.length && (H = new q(
            H,
            nt,
            null,
            l,
            $
          ), K.push({ event: H, listeners: ut }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (H = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", H && l !== Nu && (nt = l.relatedTarget || l.fromElement) && (Os(nt) || nt[Ts]))
            break t;
          if ((q || H) && (H = $.window === $ ? $ : (H = $.ownerDocument) ? H.defaultView || H.parentWindow : window, q ? (nt = l.relatedTarget || l.toElement, q = U, nt = nt ? Os(nt) : null, nt !== null && (qt = u(nt), ut = nt.tag, nt !== qt || ut !== 5 && ut !== 27 && ut !== 6) && (nt = null)) : (q = null, nt = U), q !== nt)) {
            if (ut = jf, Y = "onMouseLeave", O = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (ut = kf, Y = "onPointerLeave", O = "onPointerEnter", z = "pointer"), qt = q == null ? H : Ba(q), B = nt == null ? H : Ba(nt), H = new ut(
              Y,
              z + "leave",
              q,
              l,
              $
            ), H.target = qt, H.relatedTarget = B, Y = null, Os($) === U && (ut = new ut(
              O,
              z + "enter",
              nt,
              l,
              $
            ), ut.target = B, ut.relatedTarget = qt, Y = ut), qt = Y, q && nt)
              e: {
                for (ut = bx, O = q, z = nt, B = 0, Y = O; Y; Y = ut(Y))
                  B++;
                Y = 0;
                for (var ot = z; ot; ot = ut(ot))
                  Y++;
                for (; 0 < B - Y; )
                  O = ut(O), B--;
                for (; 0 < Y - B; )
                  z = ut(z), Y--;
                for (; B--; ) {
                  if (O === z || z !== null && O === z.alternate) {
                    ut = O;
                    break e;
                  }
                  O = ut(O), z = ut(z);
                }
                ut = null;
              }
            else ut = null;
            q !== null && xv(
              K,
              H,
              q,
              ut,
              !1
            ), nt !== null && qt !== null && xv(
              K,
              qt,
              nt,
              ut,
              !0
            );
          }
        }
        t: {
          if (H = U ? Ba(U) : window, q = H.nodeName && H.nodeName.toLowerCase(), q === "select" || q === "input" && H.type === "file")
            var Et = Bf;
          else if (Rf(H))
            if (Uf)
              Et = ky;
            else {
              Et = jy;
              var lt = Cy;
            }
          else
            q = H.nodeName, !q || q.toLowerCase() !== "input" || H.type !== "checkbox" && H.type !== "radio" ? U && Mu(U.elementType) && (Et = Bf) : Et = Ey;
          if (Et && (Et = Et(e, U))) {
            Lf(
              K,
              Et,
              l,
              $
            );
            break t;
          }
          lt && lt(e, H, U), e === "focusout" && U && H.type === "number" && U.memoizedProps.value != null && Su(H, "number", H.value);
        }
        switch (lt = U ? Ba(U) : window, e) {
          case "focusin":
            (Rf(lt) || lt.contentEditable === "true") && (Qs = lt, Uu = U, Ka = null);
            break;
          case "focusout":
            Ka = Uu = Qs = null;
            break;
          case "mousedown":
            Hu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hu = !1, Kf(K, l, $);
            break;
          case "selectionchange":
            if (Ty) break;
          case "keydown":
          case "keyup":
            Kf(K, l, $);
        }
        var yt;
        if (Au)
          t: {
            switch (e) {
              case "compositionstart":
                var St = "onCompositionStart";
                break t;
              case "compositionend":
                St = "onCompositionEnd";
                break t;
              case "compositionupdate":
                St = "onCompositionUpdate";
                break t;
            }
            St = void 0;
          }
        else
          qs ? Df(e, l) && (St = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (St = "onCompositionStart");
        St && (zf && l.locale !== "ko" && (qs || St !== "onCompositionStart" ? St === "onCompositionEnd" && qs && (yt = Nf()) : (fn = $, ku = "value" in fn ? fn.value : fn.textContent, qs = !0)), lt = co(U, St), 0 < lt.length && (St = new Ef(
          St,
          e,
          null,
          l,
          $
        ), K.push({ event: St, listeners: lt }), yt ? St.data = yt : (yt = Af(l), yt !== null && (St.data = yt)))), (yt = wy ? _y(e, l) : Sy(e, l)) && (St = co(U, "onBeforeInput"), 0 < St.length && (lt = new Ef(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          $
        ), K.push({
          event: lt,
          listeners: St
        }), lt.data = yt)), mx(
          K,
          e,
          U,
          l,
          $
        );
      }
      bv(K, n);
    });
  }
  function gl(e, n, l) {
    return {
      instance: e,
      listener: n,
      currentTarget: l
    };
  }
  function co(e, n) {
    for (var l = n + "Capture", o = []; e !== null; ) {
      var h = e, f = h.stateNode;
      if (h = h.tag, h !== 5 && h !== 26 && h !== 27 || f === null || (h = Ua(e, l), h != null && o.unshift(
        gl(e, h, f)
      ), h = Ua(e, n), h != null && o.push(
        gl(e, h, f)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function bx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xv(e, n, l, o, h) {
    for (var f = n._reactName, y = []; l !== null && l !== o; ) {
      var _ = l, j = _.alternate, U = _.stateNode;
      if (_ = _.tag, j !== null && j === o) break;
      _ !== 5 && _ !== 26 && _ !== 27 || U === null || (j = U, h ? (U = Ua(l, f), U != null && y.unshift(
        gl(l, U, j)
      )) : h || (U = Ua(l, f), U != null && y.push(
        gl(l, U, j)
      ))), l = l.return;
    }
    y.length !== 0 && e.push({ event: n, listeners: y });
  }
  var yx = /\r\n?/g, xx = /\u0000|\uFFFD/g;
  function wv(e) {
    return (typeof e == "string" ? e : "" + e).replace(yx, `
`).replace(xx, "");
  }
  function _v(e, n) {
    return n = wv(n), wv(e) === n;
  }
  function Ht(e, n, l, o, h, f) {
    switch (l) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Bs(e, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Bs(e, "" + o);
        break;
      case "className":
        mr(e, "class", o);
        break;
      case "tabIndex":
        mr(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mr(e, l, o);
        break;
      case "style":
        _f(e, o, f);
        break;
      case "data":
        if (n !== "object") {
          mr(e, "data", o);
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
        o = vr("" + o), e.setAttribute(l, o);
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
          typeof f == "function" && (l === "formAction" ? (n !== "input" && Ht(e, n, "name", h.name, h, null), Ht(
            e,
            n,
            "formEncType",
            h.formEncType,
            h,
            null
          ), Ht(
            e,
            n,
            "formMethod",
            h.formMethod,
            h,
            null
          ), Ht(
            e,
            n,
            "formTarget",
            h.formTarget,
            h,
            null
          )) : (Ht(e, n, "encType", h.encType, h, null), Ht(e, n, "method", h.method, h, null), Ht(e, n, "target", h.target, h, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = vr("" + o), e.setAttribute(l, o);
        break;
      case "onClick":
        o != null && (e.onclick = Yi);
        break;
      case "onScroll":
        o != null && wt("scroll", e);
        break;
      case "onScrollEnd":
        o != null && wt("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (l = o.__html, l != null) {
            if (h.children != null) throw Error(a(60));
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
        l = vr("" + o), e.setAttributeNS(
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
        wt("beforetoggle", e), wt("toggle", e), fr(e, "popover", o);
        break;
      case "xlinkActuate":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Vi(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Vi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Vi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Vi(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        fr(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Z1.get(l) || l, fr(e, l, o));
    }
  }
  function ch(e, n, l, o, h, f) {
    switch (l) {
      case "style":
        _f(e, o, f);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (l = o.__html, l != null) {
            if (h.children != null) throw Error(a(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Bs(e, o) : (typeof o == "number" || typeof o == "bigint") && Bs(e, "" + o);
        break;
      case "onScroll":
        o != null && wt("scroll", e);
        break;
      case "onScrollEnd":
        o != null && wt("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Yi);
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
        if (!ff.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (h = l.endsWith("Capture"), n = l.slice(2, h ? l.length - 7 : void 0), f = e[Ae] || null, f = f != null ? f[l] : null, typeof f == "function" && e.removeEventListener(n, f, h), typeof o == "function")) {
              typeof f != "function" && f !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(n, o, h);
              break t;
            }
            l in e ? e[l] = o : o === !0 ? e.setAttribute(l, "") : fr(e, l, o);
          }
    }
  }
  function ye(e, n, l) {
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
        wt("error", e), wt("load", e);
        var o = !1, h = !1, f;
        for (f in l)
          if (l.hasOwnProperty(f)) {
            var y = l[f];
            if (y != null)
              switch (f) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  h = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, n));
                default:
                  Ht(e, n, f, y, l, null);
              }
          }
        h && Ht(e, n, "srcSet", l.srcSet, l, null), o && Ht(e, n, "src", l.src, l, null);
        return;
      case "input":
        wt("invalid", e);
        var _ = f = y = h = null, j = null, U = null;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var $ = l[o];
            if ($ != null)
              switch (o) {
                case "name":
                  h = $;
                  break;
                case "type":
                  y = $;
                  break;
                case "checked":
                  j = $;
                  break;
                case "defaultChecked":
                  U = $;
                  break;
                case "value":
                  f = $;
                  break;
                case "defaultValue":
                  _ = $;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if ($ != null)
                    throw Error(a(137, n));
                  break;
                default:
                  Ht(e, n, o, $, l, null);
              }
          }
        bf(
          e,
          f,
          _,
          j,
          U,
          y,
          h,
          !1
        );
        return;
      case "select":
        wt("invalid", e), o = y = f = null;
        for (h in l)
          if (l.hasOwnProperty(h) && (_ = l[h], _ != null))
            switch (h) {
              case "value":
                f = _;
                break;
              case "defaultValue":
                y = _;
                break;
              case "multiple":
                o = _;
              default:
                Ht(e, n, h, _, l, null);
            }
        n = f, l = y, e.multiple = !!o, n != null ? Ls(e, !!o, n, !1) : l != null && Ls(e, !!o, l, !0);
        return;
      case "textarea":
        wt("invalid", e), f = h = o = null;
        for (y in l)
          if (l.hasOwnProperty(y) && (_ = l[y], _ != null))
            switch (y) {
              case "value":
                o = _;
                break;
              case "defaultValue":
                h = _;
                break;
              case "children":
                f = _;
                break;
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(a(91));
                break;
              default:
                Ht(e, n, y, _, l, null);
            }
        xf(e, o, h, f);
        return;
      case "option":
        for (j in l)
          l.hasOwnProperty(j) && (o = l[j], o != null) && (j === "selected" ? e.selected = o && typeof o != "function" && typeof o != "symbol" : Ht(e, n, j, o, l, null));
        return;
      case "dialog":
        wt("beforetoggle", e), wt("toggle", e), wt("cancel", e), wt("close", e);
        break;
      case "iframe":
      case "object":
        wt("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < vl.length; o++)
          wt(vl[o], e);
        break;
      case "image":
        wt("error", e), wt("load", e);
        break;
      case "details":
        wt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        wt("error", e), wt("load", e);
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
                Ht(e, n, U, o, l, null);
            }
        return;
      default:
        if (Mu(n)) {
          for ($ in l)
            l.hasOwnProperty($) && (o = l[$], o !== void 0 && ch(
              e,
              n,
              $,
              o,
              l,
              void 0
            ));
          return;
        }
    }
    for (_ in l)
      l.hasOwnProperty(_) && (o = l[_], o != null && Ht(e, n, _, o, l, null));
  }
  function wx(e, n, l, o) {
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
        var h = null, f = null, y = null, _ = null, j = null, U = null, $ = null;
        for (q in l) {
          var K = l[q];
          if (l.hasOwnProperty(q) && K != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = K;
              default:
                o.hasOwnProperty(q) || Ht(e, n, q, null, o, K);
            }
        }
        for (var H in o) {
          var q = o[H];
          if (K = l[H], o.hasOwnProperty(H) && (q != null || K != null))
            switch (H) {
              case "type":
                f = q;
                break;
              case "name":
                h = q;
                break;
              case "checked":
                U = q;
                break;
              case "defaultChecked":
                $ = q;
                break;
              case "value":
                y = q;
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
                q !== K && Ht(
                  e,
                  n,
                  H,
                  q,
                  o,
                  K
                );
            }
        }
        _u(
          e,
          y,
          _,
          j,
          U,
          $,
          f,
          h
        );
        return;
      case "select":
        q = y = _ = H = null;
        for (f in l)
          if (j = l[f], l.hasOwnProperty(f) && j != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                q = j;
              default:
                o.hasOwnProperty(f) || Ht(
                  e,
                  n,
                  f,
                  null,
                  o,
                  j
                );
            }
        for (h in o)
          if (f = o[h], j = l[h], o.hasOwnProperty(h) && (f != null || j != null))
            switch (h) {
              case "value":
                H = f;
                break;
              case "defaultValue":
                _ = f;
                break;
              case "multiple":
                y = f;
              default:
                f !== j && Ht(
                  e,
                  n,
                  h,
                  f,
                  o,
                  j
                );
            }
        n = _, l = y, o = q, H != null ? Ls(e, !!l, H, !1) : !!o != !!l && (n != null ? Ls(e, !!l, n, !0) : Ls(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        q = H = null;
        for (_ in l)
          if (h = l[_], l.hasOwnProperty(_) && h != null && !o.hasOwnProperty(_))
            switch (_) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ht(e, n, _, null, o, h);
            }
        for (y in o)
          if (h = o[y], f = l[y], o.hasOwnProperty(y) && (h != null || f != null))
            switch (y) {
              case "value":
                H = h;
                break;
              case "defaultValue":
                q = h;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(a(91));
                break;
              default:
                h !== f && Ht(e, n, y, h, o, f);
            }
        yf(e, H, q);
        return;
      case "option":
        for (var nt in l)
          H = l[nt], l.hasOwnProperty(nt) && H != null && !o.hasOwnProperty(nt) && (nt === "selected" ? e.selected = !1 : Ht(
            e,
            n,
            nt,
            null,
            o,
            H
          ));
        for (j in o)
          H = o[j], q = l[j], o.hasOwnProperty(j) && H !== q && (H != null || q != null) && (j === "selected" ? e.selected = H && typeof H != "function" && typeof H != "symbol" : Ht(
            e,
            n,
            j,
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
          H = l[ut], l.hasOwnProperty(ut) && H != null && !o.hasOwnProperty(ut) && Ht(e, n, ut, null, o, H);
        for (U in o)
          if (H = o[U], q = l[U], o.hasOwnProperty(U) && H !== q && (H != null || q != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(a(137, n));
                break;
              default:
                Ht(
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
        if (Mu(n)) {
          for (var qt in l)
            H = l[qt], l.hasOwnProperty(qt) && H !== void 0 && !o.hasOwnProperty(qt) && ch(
              e,
              n,
              qt,
              void 0,
              o,
              H
            );
          for ($ in o)
            H = o[$], q = l[$], !o.hasOwnProperty($) || H === q || H === void 0 && q === void 0 || ch(
              e,
              n,
              $,
              H,
              o,
              q
            );
          return;
        }
    }
    for (var O in l)
      H = l[O], l.hasOwnProperty(O) && H != null && !o.hasOwnProperty(O) && Ht(e, n, O, null, o, H);
    for (K in o)
      H = o[K], q = l[K], !o.hasOwnProperty(K) || H === q || H == null && q == null || Ht(e, n, K, H, o, q);
  }
  function Sv(e) {
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
  function _x() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, l = performance.getEntriesByType("resource"), o = 0; o < l.length; o++) {
        var h = l[o], f = h.transferSize, y = h.initiatorType, _ = h.duration;
        if (f && _ && Sv(y)) {
          for (y = 0, _ = h.responseEnd, o += 1; o < l.length; o++) {
            var j = l[o], U = j.startTime;
            if (U > _) break;
            var $ = j.transferSize, K = j.initiatorType;
            $ && Sv(K) && (j = j.responseEnd, y += $ * (j < _ ? 1 : (_ - U) / (j - U)));
          }
          if (--o, n += 8 * (f + y) / (h.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hh = null, dh = null;
  function ho(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Nv(e, n) {
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
  function fh(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var mh = null;
  function Sx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === mh ? !1 : (mh = e, !0) : (mh = null, !1);
  }
  var Cv = typeof setTimeout == "function" ? setTimeout : void 0, Mx = typeof clearTimeout == "function" ? clearTimeout : void 0, jv = typeof Promise == "function" ? Promise : void 0, Nx = typeof queueMicrotask == "function" ? queueMicrotask : typeof jv < "u" ? function(e) {
    return jv.resolve(null).then(e).catch(Cx);
  } : Cv;
  function Cx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function zn(e) {
    return e === "head";
  }
  function Ev(e, n) {
    var l = n, o = 0;
    do {
      var h = l.nextSibling;
      if (e.removeChild(l), h && h.nodeType === 8)
        if (l = h.data, l === "/$" || l === "/&") {
          if (o === 0) {
            e.removeChild(h), ma(n);
            return;
          }
          o--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          o++;
        else if (l === "html")
          bl(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, bl(l);
          for (var f = l.firstChild; f; ) {
            var y = f.nextSibling, _ = f.nodeName;
            f[La] || _ === "SCRIPT" || _ === "STYLE" || _ === "LINK" && f.rel.toLowerCase() === "stylesheet" || l.removeChild(f), f = y;
          }
        } else
          l === "body" && bl(e.ownerDocument.body);
      l = h;
    } while (l);
    ma(n);
  }
  function kv(e, n) {
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
  function ph(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (n = n.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ph(l), xu(l);
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
  function jx(e, n, l, o) {
    for (; e.nodeType === 1; ) {
      var h = l;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[La])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== h.rel || e.getAttribute("href") !== (h.href == null || h.href === "" ? null : h.href) || e.getAttribute("crossorigin") !== (h.crossOrigin == null ? null : h.crossOrigin) || e.getAttribute("title") !== (h.title == null ? null : h.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (h.src == null ? null : h.src) || e.getAttribute("type") !== (h.type == null ? null : h.type) || e.getAttribute("crossorigin") !== (h.crossOrigin == null ? null : h.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var f = h.name == null ? null : "" + h.name;
        if (h.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = fi(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Ex(e, n, l) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function zv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function vh(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function gh(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function kx(e, n) {
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
  var bh = null;
  function Tv(e) {
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
  function Ov(e) {
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
  function Dv(e, n, l) {
    switch (n = ho(l), e) {
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
  function bl(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    xu(e);
  }
  var mi = /* @__PURE__ */ new Map(), Av = /* @__PURE__ */ new Set();
  function fo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var rn = Z.d;
  Z.d = {
    f: zx,
    r: Tx,
    D: Ox,
    C: Dx,
    L: Ax,
    m: Rx,
    X: Bx,
    S: Lx,
    M: Ux
  };
  function zx() {
    var e = rn.f(), n = no();
    return e || n;
  }
  function Tx(e) {
    var n = Ds(e);
    n !== null && n.tag === 5 && n.type === "form" ? Fm(n) : rn.r(e);
  }
  var ha = typeof document > "u" ? null : document;
  function Rv(e, n, l) {
    var o = ha;
    if (o && typeof n == "string" && n) {
      var h = li(n);
      h = 'link[rel="' + e + '"][href="' + h + '"]', typeof l == "string" && (h += '[crossorigin="' + l + '"]'), Av.has(h) || (Av.add(h), e = { rel: e, crossOrigin: l, href: n }, o.querySelector(h) === null && (n = o.createElement("link"), ye(n, "link", e), ce(n), o.head.appendChild(n)));
    }
  }
  function Ox(e) {
    rn.D(e), Rv("dns-prefetch", e, null);
  }
  function Dx(e, n) {
    rn.C(e, n), Rv("preconnect", e, n);
  }
  function Ax(e, n, l) {
    rn.L(e, n, l);
    var o = ha;
    if (o && e && n) {
      var h = 'link[rel="preload"][as="' + li(n) + '"]';
      n === "image" && l && l.imageSrcSet ? (h += '[imagesrcset="' + li(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (h += '[imagesizes="' + li(
        l.imageSizes
      ) + '"]')) : h += '[href="' + li(e) + '"]';
      var f = h;
      switch (n) {
        case "style":
          f = da(e);
          break;
        case "script":
          f = fa(e);
      }
      mi.has(f) || (e = b(
        {
          rel: "preload",
          href: n === "image" && l && l.imageSrcSet ? void 0 : e,
          as: n
        },
        l
      ), mi.set(f, e), o.querySelector(h) !== null || n === "style" && o.querySelector(yl(f)) || n === "script" && o.querySelector(xl(f)) || (n = o.createElement("link"), ye(n, "link", e), ce(n), o.head.appendChild(n)));
    }
  }
  function Rx(e, n) {
    rn.m(e, n);
    var l = ha;
    if (l && e) {
      var o = n && typeof n.as == "string" ? n.as : "script", h = 'link[rel="modulepreload"][as="' + li(o) + '"][href="' + li(e) + '"]', f = h;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = fa(e);
      }
      if (!mi.has(f) && (e = b({ rel: "modulepreload", href: e }, n), mi.set(f, e), l.querySelector(h) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(xl(f)))
              return;
        }
        o = l.createElement("link"), ye(o, "link", e), ce(o), l.head.appendChild(o);
      }
    }
  }
  function Lx(e, n, l) {
    rn.S(e, n, l);
    var o = ha;
    if (o && e) {
      var h = As(o).hoistableStyles, f = da(e);
      n = n || "default";
      var y = h.get(f);
      if (!y) {
        var _ = { loading: 0, preload: null };
        if (y = o.querySelector(
          yl(f)
        ))
          _.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": n },
            l
          ), (l = mi.get(f)) && yh(e, l);
          var j = y = o.createElement("link");
          ce(j), ye(j, "link", e), j._p = new Promise(function(U, $) {
            j.onload = U, j.onerror = $;
          }), j.addEventListener("load", function() {
            _.loading |= 1;
          }), j.addEventListener("error", function() {
            _.loading |= 2;
          }), _.loading |= 4, mo(y, n, o);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: _
        }, h.set(f, y);
      }
    }
  }
  function Bx(e, n) {
    rn.X(e, n);
    var l = ha;
    if (l && e) {
      var o = As(l).hoistableScripts, h = fa(e), f = o.get(h);
      f || (f = l.querySelector(xl(h)), f || (e = b({ src: e, async: !0 }, n), (n = mi.get(h)) && xh(e, n), f = l.createElement("script"), ce(f), ye(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(h, f));
    }
  }
  function Ux(e, n) {
    rn.M(e, n);
    var l = ha;
    if (l && e) {
      var o = As(l).hoistableScripts, h = fa(e), f = o.get(h);
      f || (f = l.querySelector(xl(h)), f || (e = b({ src: e, async: !0, type: "module" }, n), (n = mi.get(h)) && xh(e, n), f = l.createElement("script"), ce(f), ye(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(h, f));
    }
  }
  function Lv(e, n, l, o) {
    var h = (h = ct.current) ? fo(h) : null;
    if (!h) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (n = da(l.href), l = As(
          h
        ).hoistableStyles, o = l.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = da(l.href);
          var f = As(
            h
          ).hoistableStyles, y = f.get(e);
          if (y || (h = h.ownerDocument || h, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, y), (f = h.querySelector(
            yl(e)
          )) && !f._p && (y.instance = f, y.state.loading = 5), mi.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, mi.set(e, l), f || Hx(
            h,
            e,
            l,
            y.state
          ))), n && o === null)
            throw Error(a(528, ""));
          return y;
        }
        if (n && o !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return n = l.async, l = l.src, typeof l == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = fa(l), l = As(
          h
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
  function da(e) {
    return 'href="' + li(e) + '"';
  }
  function yl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Bv(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Hx(e, n, l, o) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = e.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), ye(n, "link", l), ce(n), e.head.appendChild(n));
  }
  function fa(e) {
    return '[src="' + li(e) + '"]';
  }
  function xl(e) {
    return "script[async]" + e;
  }
  function Uv(e, n, l) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + li(l.href) + '"]'
          );
          if (o)
            return n.instance = o, ce(o), o;
          var h = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), ce(o), ye(o, "style", h), mo(o, l.precedence, e), n.instance = o;
        case "stylesheet":
          h = da(l.href);
          var f = e.querySelector(
            yl(h)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, ce(f), f;
          o = Bv(l), (h = mi.get(h)) && yh(o, h), f = (e.ownerDocument || e).createElement("link"), ce(f);
          var y = f;
          return y._p = new Promise(function(_, j) {
            y.onload = _, y.onerror = j;
          }), ye(f, "link", o), n.state.loading |= 4, mo(f, l.precedence, e), n.instance = f;
        case "script":
          return f = fa(l.src), (h = e.querySelector(
            xl(f)
          )) ? (n.instance = h, ce(h), h) : (o = l, (h = mi.get(f)) && (o = b({}, l), xh(o, h)), e = e.ownerDocument || e, h = e.createElement("script"), ce(h), ye(h, "link", o), e.head.appendChild(h), n.instance = h);
        case "void":
          return null;
        default:
          throw Error(a(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, mo(o, l.precedence, e));
    return n.instance;
  }
  function mo(e, n, l) {
    for (var o = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), h = o.length ? o[o.length - 1] : null, f = h, y = 0; y < o.length; y++) {
      var _ = o[y];
      if (_.dataset.precedence === n) f = _;
      else if (f !== h) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = l.nodeType === 9 ? l.head : l, n.insertBefore(e, n.firstChild));
  }
  function yh(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function xh(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var po = null;
  function Hv(e, n, l) {
    if (po === null) {
      var o = /* @__PURE__ */ new Map(), h = po = /* @__PURE__ */ new Map();
      h.set(l, o);
    } else
      h = po, o = h.get(l), o || (o = /* @__PURE__ */ new Map(), h.set(l, o));
    if (o.has(e)) return o;
    for (o.set(e, null), l = l.getElementsByTagName(e), h = 0; h < l.length; h++) {
      var f = l[h];
      if (!(f[La] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = f.getAttribute(n) || "";
        y = e + y;
        var _ = o.get(y);
        _ ? _.push(f) : o.set(y, [f]);
      }
    }
    return o;
  }
  function qv(e, n, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function qx(e, n, l) {
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
  function Qv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Qx(e, n, l, o) {
    if (l.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var h = da(o.href), f = n.querySelector(
          yl(h)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = vo.bind(e), n.then(e, e)), l.state.loading |= 4, l.instance = f, ce(f);
          return;
        }
        f = n.ownerDocument || n, o = Bv(o), (h = mi.get(h)) && yh(o, h), f = f.createElement("link"), ce(f);
        var y = f;
        y._p = new Promise(function(_, j) {
          y.onload = _, y.onerror = j;
        }), ye(f, "link", o), l.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, n), (n = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = vo.bind(e), n.addEventListener("load", l), n.addEventListener("error", l));
    }
  }
  var wh = 0;
  function $x(e, n) {
    return e.stylesheets && e.count === 0 && bo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var o = setTimeout(function() {
        if (e.stylesheets && bo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && wh === 0 && (wh = 62500 * _x());
      var h = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && bo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > wh ? 50 : 800) + n
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(h);
      };
    } : null;
  }
  function vo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) bo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var go = null;
  function bo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, go = /* @__PURE__ */ new Map(), n.forEach(Vx, e), go = null, vo.call(e));
  }
  function Vx(e, n) {
    if (!(n.state.loading & 4)) {
      var l = go.get(e);
      if (l) var o = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), go.set(e, l);
        for (var h = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < h.length; f++) {
          var y = h[f];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (l.set(y.dataset.precedence, y), o = y);
        }
        o && l.set(null, o);
      }
      h = n.instance, y = h.getAttribute("data-precedence"), f = l.get(y) || o, f === o && l.set(null, h), l.set(y, h), this.count++, o = vo.bind(this), h.addEventListener("load", o), h.addEventListener("error", o), f ? f.parentNode.insertBefore(h, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(h, e.firstChild)), n.state.loading |= 4;
    }
  }
  var wl = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: it,
    _currentValue2: it,
    _threadCount: 0
  };
  function Yx(e, n, l, o, h, f, y, _, j) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = De(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = De(0), this.hiddenUpdates = De(null), this.identifierPrefix = o, this.onUncaughtError = h, this.onCaughtError = f, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function $v(e, n, l, o, h, f, y, _, j, U, $, K) {
    return e = new Yx(
      e,
      n,
      l,
      y,
      j,
      U,
      $,
      K,
      _
    ), n = 1, f === !0 && (n |= 24), f = Xe(3, null, null, n), e.current = f, f.stateNode = e, n = tc(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: o,
      isDehydrated: l,
      cache: n
    }, sc(f), e;
  }
  function Vv(e) {
    return e ? (e = Ys, e) : Ys;
  }
  function Yv(e, n, l, o, h, f) {
    h = Vv(h), o.context === null ? o.context = h : o.pendingContext = h, o = yn(n), o.payload = { element: l }, f = f === void 0 ? null : f, f !== null && (o.callback = f), l = xn(e, o, n), l !== null && (qe(l, e, n), Pa(l, e, n));
  }
  function Gv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function _h(e, n) {
    Gv(e, n), (e = e.alternate) && Gv(e, n);
  }
  function Kv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Jn(e, 67108864);
      n !== null && qe(n, e, 67108864), _h(e, 67108864);
    }
  }
  function Xv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Je();
      n = Qi(n);
      var l = Jn(e, n);
      l !== null && qe(l, e, n), _h(e, n);
    }
  }
  var yo = !0;
  function Gx(e, n, l, o) {
    var h = L.T;
    L.T = null;
    var f = Z.p;
    try {
      Z.p = 2, Sh(e, n, l, o);
    } finally {
      Z.p = f, L.T = h;
    }
  }
  function Kx(e, n, l, o) {
    var h = L.T;
    L.T = null;
    var f = Z.p;
    try {
      Z.p = 8, Sh(e, n, l, o);
    } finally {
      Z.p = f, L.T = h;
    }
  }
  function Sh(e, n, l, o) {
    if (yo) {
      var h = Mh(o);
      if (h === null)
        uh(
          e,
          n,
          o,
          xo,
          l
        ), Wv(e, o);
      else if (Zx(
        h,
        e,
        n,
        l,
        o
      ))
        o.stopPropagation();
      else if (Wv(e, o), n & 4 && -1 < Xx.indexOf(e)) {
        for (; h !== null; ) {
          var f = Ds(h);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var y = Ft(f.pendingLanes);
                  if (y !== 0) {
                    var _ = f;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; y; ) {
                      var j = 1 << 31 - Se(y);
                      _.entanglements[1] |= j, y &= ~j;
                    }
                    Di(f), (Dt & 6) === 0 && (eo = _e() + 500, pl(0));
                  }
                }
                break;
              case 31:
              case 13:
                _ = Jn(f, 2), _ !== null && qe(_, f, 2), no(), _h(f, 2);
            }
          if (f = Mh(o), f === null && uh(
            e,
            n,
            o,
            xo,
            l
          ), f === h) break;
          h = f;
        }
        h !== null && o.stopPropagation();
      } else
        uh(
          e,
          n,
          o,
          null,
          l
        );
    }
  }
  function Mh(e) {
    return e = Cu(e), Nh(e);
  }
  var xo = null;
  function Nh(e) {
    if (xo = null, e = Os(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var l = n.tag;
        if (l === 13) {
          if (e = c(n), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = d(n), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return xo = e, null;
  }
  function Zv(e) {
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
        switch (vu()) {
          case cr:
            return 2;
          case qi:
            return 8;
          case gi:
          case Kn:
            return 32;
          case Ra:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ch = !1, Tn = null, On = null, Dn = null, _l = /* @__PURE__ */ new Map(), Sl = /* @__PURE__ */ new Map(), An = [], Xx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Wv(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Tn = null;
        break;
      case "dragenter":
      case "dragleave":
        On = null;
        break;
      case "mouseover":
      case "mouseout":
        Dn = null;
        break;
      case "pointerover":
      case "pointerout":
        _l.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Sl.delete(n.pointerId);
    }
  }
  function Ml(e, n, l, o, h, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: l,
      eventSystemFlags: o,
      nativeEvent: f,
      targetContainers: [h]
    }, n !== null && (n = Ds(n), n !== null && Kv(n)), e) : (e.eventSystemFlags |= o, n = e.targetContainers, h !== null && n.indexOf(h) === -1 && n.push(h), e);
  }
  function Zx(e, n, l, o, h) {
    switch (n) {
      case "focusin":
        return Tn = Ml(
          Tn,
          e,
          n,
          l,
          o,
          h
        ), !0;
      case "dragenter":
        return On = Ml(
          On,
          e,
          n,
          l,
          o,
          h
        ), !0;
      case "mouseover":
        return Dn = Ml(
          Dn,
          e,
          n,
          l,
          o,
          h
        ), !0;
      case "pointerover":
        var f = h.pointerId;
        return _l.set(
          f,
          Ml(
            _l.get(f) || null,
            e,
            n,
            l,
            o,
            h
          )
        ), !0;
      case "gotpointercapture":
        return f = h.pointerId, Sl.set(
          f,
          Ml(
            Sl.get(f) || null,
            e,
            n,
            l,
            o,
            h
          )
        ), !0;
    }
    return !1;
  }
  function Iv(e) {
    var n = Os(e.target);
    if (n !== null) {
      var l = u(n);
      if (l !== null) {
        if (n = l.tag, n === 13) {
          if (n = c(l), n !== null) {
            e.blockedOn = n, dn(e.priority, function() {
              Xv(l);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(l), n !== null) {
            e.blockedOn = n, dn(e.priority, function() {
              Xv(l);
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
  function wo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var l = Mh(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var o = new l.constructor(
          l.type,
          l
        );
        Nu = o, l.target.dispatchEvent(o), Nu = null;
      } else
        return n = Ds(l), n !== null && Kv(n), e.blockedOn = l, !1;
      n.shift();
    }
    return !0;
  }
  function Fv(e, n, l) {
    wo(e) && l.delete(n);
  }
  function Wx() {
    Ch = !1, Tn !== null && wo(Tn) && (Tn = null), On !== null && wo(On) && (On = null), Dn !== null && wo(Dn) && (Dn = null), _l.forEach(Fv), Sl.forEach(Fv);
  }
  function _o(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Ch || (Ch = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      Wx
    )));
  }
  var So = null;
  function Jv(e) {
    So !== e && (So = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        So === e && (So = null);
        for (var n = 0; n < e.length; n += 3) {
          var l = e[n], o = e[n + 1], h = e[n + 2];
          if (typeof o != "function") {
            if (Nh(o || l) === null)
              continue;
            break;
          }
          var f = Ds(l);
          f !== null && (e.splice(n, 3), n -= 3, Mc(
            f,
            {
              pending: !0,
              data: h,
              method: l.method,
              action: o
            },
            o,
            h
          ));
        }
      }
    ));
  }
  function ma(e) {
    function n(j) {
      return _o(j, e);
    }
    Tn !== null && _o(Tn, e), On !== null && _o(On, e), Dn !== null && _o(Dn, e), _l.forEach(n), Sl.forEach(n);
    for (var l = 0; l < An.length; l++) {
      var o = An[l];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < An.length && (l = An[0], l.blockedOn === null); )
      Iv(l), l.blockedOn === null && An.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (o = 0; o < l.length; o += 3) {
        var h = l[o], f = l[o + 1], y = h[Ae] || null;
        if (typeof f == "function")
          y || Jv(l);
        else if (y) {
          var _ = null;
          if (f && f.hasAttribute("formAction")) {
            if (h = f, y = f[Ae] || null)
              _ = y.formAction;
            else if (Nh(h) !== null) continue;
          } else _ = y.action;
          typeof _ == "function" ? l[o + 1] = _ : (l.splice(o, 3), o -= 3), Jv(l);
        }
      }
  }
  function Pv() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(y) {
            return h = y;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      h !== null && (h(), h = null), o || setTimeout(l, 20);
    }
    function l() {
      if (!o && !navigation.transition) {
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, h = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(l, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), h !== null && (h(), h = null);
      };
    }
  }
  function jh(e) {
    this._internalRoot = e;
  }
  Mo.prototype.render = jh.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(a(409));
    var l = n.current, o = Je();
    Yv(l, o, e, n, null, null);
  }, Mo.prototype.unmount = jh.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Yv(e.current, 2, null, e, null, null), no(), n[Ts] = null;
    }
  };
  function Mo(e) {
    this._internalRoot = e;
  }
  Mo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = yi();
      e = { blockedOn: null, target: e, priority: n };
      for (var l = 0; l < An.length && n !== 0 && n < An[l].priority; l++) ;
      An.splice(l, 0, e), l === 0 && Iv(e);
    }
  };
  var tg = t.version;
  if (tg !== "19.2.7")
    throw Error(
      a(
        527,
        tg,
        "19.2.7"
      )
    );
  Z.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = v(n), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Ix = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var No = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!No.isDisabled && No.supportsFiber)
      try {
        Xn = No.inject(
          Ix
        ), Ce = No;
      } catch {
      }
  }
  return Cl.createRoot = function(e, n) {
    if (!r(e)) throw Error(a(299));
    var l = !1, o = "", h = rp, f = op, y = up;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (h = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError)), n = $v(
      e,
      1,
      !1,
      null,
      null,
      l,
      o,
      null,
      h,
      f,
      y,
      Pv
    ), e[Ts] = n.current, oh(e), new jh(n);
  }, Cl.hydrateRoot = function(e, n, l) {
    if (!r(e)) throw Error(a(299));
    var o = !1, h = "", f = rp, y = op, _ = up, j = null;
    return l != null && (l.unstable_strictMode === !0 && (o = !0), l.identifierPrefix !== void 0 && (h = l.identifierPrefix), l.onUncaughtError !== void 0 && (f = l.onUncaughtError), l.onCaughtError !== void 0 && (y = l.onCaughtError), l.onRecoverableError !== void 0 && (_ = l.onRecoverableError), l.formState !== void 0 && (j = l.formState)), n = $v(
      e,
      1,
      !0,
      n,
      l ?? null,
      o,
      h,
      j,
      f,
      y,
      _,
      Pv
    ), n.context = Vv(null), l = n.current, o = Je(), o = Qi(o), h = yn(o), h.callback = null, xn(l, h, o), l = o, n.current.lanes = l, ii(n, l), Di(n), e[Ts] = n.current, oh(e), new Mo(n);
  }, Cl.version = "19.2.7", Cl;
}
var cg;
function ow() {
  if (cg) return kh.exports;
  cg = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), kh.exports = rw(), kh.exports;
}
var uw = ow(), C = Dd();
const Qe = /* @__PURE__ */ tw(C);
var Hn = F0();
function cw() {
  for (var s = arguments.length, t = new Array(s), i = 0; i < s; i++)
    t[i] = arguments[i];
  return C.useMemo(
    () => (a) => {
      t.forEach((r) => r(a));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  );
}
const su = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function za(s) {
  const t = Object.prototype.toString.call(s);
  return t === "[object Window]" || // In Electron context the Window object serializes to [object global]
  t === "[object global]";
}
function Ad(s) {
  return "nodeType" in s;
}
function Ye(s) {
  var t, i;
  return s ? za(s) ? s : Ad(s) && (t = (i = s.ownerDocument) == null ? void 0 : i.defaultView) != null ? t : window : window;
}
function Rd(s) {
  const {
    Document: t
  } = Ye(s);
  return s instanceof t;
}
function Wl(s) {
  return za(s) ? !1 : s instanceof Ye(s).HTMLElement;
}
function J0(s) {
  return s instanceof Ye(s).SVGElement;
}
function Ta(s) {
  return s ? za(s) ? s.document : Ad(s) ? Rd(s) ? s : Wl(s) || J0(s) ? s.ownerDocument : document : document : document;
}
const Ui = su ? C.useLayoutEffect : C.useEffect;
function Ld(s) {
  const t = C.useRef(s);
  return Ui(() => {
    t.current = s;
  }), C.useCallback(function() {
    for (var i = arguments.length, a = new Array(i), r = 0; r < i; r++)
      a[r] = arguments[r];
    return t.current == null ? void 0 : t.current(...a);
  }, []);
}
function hw() {
  const s = C.useRef(null), t = C.useCallback((a, r) => {
    s.current = setInterval(a, r);
  }, []), i = C.useCallback(() => {
    s.current !== null && (clearInterval(s.current), s.current = null);
  }, []);
  return [t, i];
}
function Hl(s, t) {
  t === void 0 && (t = [s]);
  const i = C.useRef(s);
  return Ui(() => {
    i.current !== s && (i.current = s);
  }, t), i;
}
function Il(s, t) {
  const i = C.useRef();
  return C.useMemo(
    () => {
      const a = s(i.current);
      return i.current = a, a;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...t]
  );
}
function Go(s) {
  const t = Ld(s), i = C.useRef(null), a = C.useCallback(
    (r) => {
      r !== i.current && t?.(r, i.current), i.current = r;
    },
    //eslint-disable-next-line
    []
  );
  return [i, a];
}
function pd(s) {
  const t = C.useRef();
  return C.useEffect(() => {
    t.current = s;
  }, [s]), t.current;
}
let Ah = {};
function Fl(s, t) {
  return C.useMemo(() => {
    if (t)
      return t;
    const i = Ah[s] == null ? 0 : Ah[s] + 1;
    return Ah[s] = i, s + "-" + i;
  }, [s, t]);
}
function P0(s) {
  return function(t) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      a[r - 1] = arguments[r];
    return a.reduce((u, c) => {
      const d = Object.entries(c);
      for (const [p, v] of d) {
        const g = u[p];
        g != null && (u[p] = g + s * v);
      }
      return u;
    }, {
      ...t
    });
  };
}
const wa = /* @__PURE__ */ P0(1), Ko = /* @__PURE__ */ P0(-1);
function dw(s) {
  return "clientX" in s && "clientY" in s;
}
function Bd(s) {
  if (!s)
    return !1;
  const {
    KeyboardEvent: t
  } = Ye(s.target);
  return t && s instanceof t;
}
function fw(s) {
  if (!s)
    return !1;
  const {
    TouchEvent: t
  } = Ye(s.target);
  return t && s instanceof t;
}
function vd(s) {
  if (fw(s)) {
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
  return dw(s) ? {
    x: s.clientX,
    y: s.clientY
  } : null;
}
const ql = /* @__PURE__ */ Object.freeze({
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
        return [ql.Translate.toString(s), ql.Scale.toString(s)].join(" ");
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
}), hg = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function mw(s) {
  return s.matches(hg) ? s : s.querySelector(hg);
}
const pw = {
  display: "none"
};
function vw(s) {
  let {
    id: t,
    value: i
  } = s;
  return Qe.createElement("div", {
    id: t,
    style: pw
  }, i);
}
function gw(s) {
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
  return Qe.createElement("div", {
    id: t,
    style: r,
    role: "status",
    "aria-live": a,
    "aria-atomic": !0
  }, i);
}
function bw() {
  const [s, t] = C.useState("");
  return {
    announce: C.useCallback((a) => {
      a != null && t(a);
    }, []),
    announcement: s
  };
}
const tb = /* @__PURE__ */ C.createContext(null);
function yw(s) {
  const t = C.useContext(tb);
  C.useEffect(() => {
    if (!t)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return t(s);
  }, [s, t]);
}
function xw() {
  const [s] = C.useState(() => /* @__PURE__ */ new Set()), t = C.useCallback((a) => (s.add(a), () => s.delete(a)), [s]);
  return [C.useCallback((a) => {
    let {
      type: r,
      event: u
    } = a;
    s.forEach((c) => {
      var d;
      return (d = c[r]) == null ? void 0 : d.call(c, u);
    });
  }, [s]), t];
}
const ww = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, _w = {
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
function Sw(s) {
  let {
    announcements: t = _w,
    container: i,
    hiddenTextDescribedById: a,
    screenReaderInstructions: r = ww
  } = s;
  const {
    announce: u,
    announcement: c
  } = bw(), d = Fl("DndLiveRegion"), [p, v] = C.useState(!1);
  if (C.useEffect(() => {
    v(!0);
  }, []), yw(C.useMemo(() => ({
    onDragStart(b) {
      let {
        active: x
      } = b;
      u(t.onDragStart({
        active: x
      }));
    },
    onDragMove(b) {
      let {
        active: x,
        over: S
      } = b;
      t.onDragMove && u(t.onDragMove({
        active: x,
        over: S
      }));
    },
    onDragOver(b) {
      let {
        active: x,
        over: S
      } = b;
      u(t.onDragOver({
        active: x,
        over: S
      }));
    },
    onDragEnd(b) {
      let {
        active: x,
        over: S
      } = b;
      u(t.onDragEnd({
        active: x,
        over: S
      }));
    },
    onDragCancel(b) {
      let {
        active: x,
        over: S
      } = b;
      u(t.onDragCancel({
        active: x,
        over: S
      }));
    }
  }), [u, t])), !p)
    return null;
  const g = Qe.createElement(Qe.Fragment, null, Qe.createElement(vw, {
    id: a,
    value: r.draggable
  }), Qe.createElement(gw, {
    id: d,
    announcement: c
  }));
  return i ? Hn.createPortal(g, i) : g;
}
var oe;
(function(s) {
  s.DragStart = "dragStart", s.DragMove = "dragMove", s.DragEnd = "dragEnd", s.DragCancel = "dragCancel", s.DragOver = "dragOver", s.RegisterDroppable = "registerDroppable", s.SetDroppableDisabled = "setDroppableDisabled", s.UnregisterDroppable = "unregisterDroppable";
})(oe || (oe = {}));
function Xo() {
}
function Ud(s, t) {
  return C.useMemo(
    () => ({
      sensor: s,
      options: t ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s, t]
  );
}
function Hd() {
  for (var s = arguments.length, t = new Array(s), i = 0; i < s; i++)
    t[i] = arguments[i];
  return C.useMemo(
    () => [...t].filter((a) => a != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...t]
  );
}
const Mi = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function Mw(s, t) {
  return Math.sqrt(Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2));
}
function Nw(s, t) {
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
function Cw(s, t) {
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
function jw(s, t) {
  if (!s || s.length === 0)
    return null;
  const [i] = s;
  return i[t];
}
function dg(s, t, i) {
  return t === void 0 && (t = s.left), i === void 0 && (i = s.top), {
    x: t + s.width * 0.5,
    y: i + s.height * 0.5
  };
}
const qd = (s) => {
  let {
    collisionRect: t,
    droppableRects: i,
    droppableContainers: a
  } = s;
  const r = dg(t, t.left, t.top), u = [];
  for (const c of a) {
    const {
      id: d
    } = c, p = i.get(d);
    if (p) {
      const v = Mw(dg(p), r);
      u.push({
        id: d,
        data: {
          droppableContainer: c,
          value: v
        }
      });
    }
  }
  return u.sort(Nw);
};
function Ew(s, t) {
  const i = Math.max(t.top, s.top), a = Math.max(t.left, s.left), r = Math.min(t.left + t.width, s.left + s.width), u = Math.min(t.top + t.height, s.top + s.height), c = r - a, d = u - i;
  if (a < r && i < u) {
    const p = t.width * t.height, v = s.width * s.height, g = c * d, b = g / (p + v - g);
    return Number(b.toFixed(4));
  }
  return 0;
}
const kw = (s) => {
  let {
    collisionRect: t,
    droppableRects: i,
    droppableContainers: a
  } = s;
  const r = [];
  for (const u of a) {
    const {
      id: c
    } = u, d = i.get(c);
    if (d) {
      const p = Ew(d, t);
      p > 0 && r.push({
        id: c,
        data: {
          droppableContainer: u,
          value: p
        }
      });
    }
  }
  return r.sort(Cw);
};
function zw(s, t, i) {
  return {
    ...s,
    scaleX: t && i ? t.width / i.width : 1,
    scaleY: t && i ? t.height / i.height : 1
  };
}
function eb(s, t) {
  return s && t ? {
    x: s.left - t.left,
    y: s.top - t.top
  } : Mi;
}
function Tw(s) {
  return function(i) {
    for (var a = arguments.length, r = new Array(a > 1 ? a - 1 : 0), u = 1; u < a; u++)
      r[u - 1] = arguments[u];
    return r.reduce((c, d) => ({
      ...c,
      top: c.top + s * d.y,
      bottom: c.bottom + s * d.y,
      left: c.left + s * d.x,
      right: c.right + s * d.x
    }), {
      ...i
    });
  };
}
const Ow = /* @__PURE__ */ Tw(1);
function Dw(s) {
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
function Aw(s, t, i) {
  const a = Dw(t);
  if (!a)
    return s;
  const {
    scaleX: r,
    scaleY: u,
    x: c,
    y: d
  } = a, p = s.left - c - (1 - r) * parseFloat(i), v = s.top - d - (1 - u) * parseFloat(i.slice(i.indexOf(" ") + 1)), g = r ? s.width / r : s.width, b = u ? s.height / u : s.height;
  return {
    width: g,
    height: b,
    top: v,
    right: p + g,
    bottom: v + b,
    left: p
  };
}
const Rw = {
  ignoreTransform: !1
};
function Oa(s, t) {
  t === void 0 && (t = Rw);
  let i = s.getBoundingClientRect();
  if (t.ignoreTransform) {
    const {
      transform: v,
      transformOrigin: g
    } = Ye(s).getComputedStyle(s);
    v && (i = Aw(i, v, g));
  }
  const {
    top: a,
    left: r,
    width: u,
    height: c,
    bottom: d,
    right: p
  } = i;
  return {
    top: a,
    left: r,
    width: u,
    height: c,
    bottom: d,
    right: p
  };
}
function fg(s) {
  return Oa(s, {
    ignoreTransform: !0
  });
}
function Lw(s) {
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
function Bw(s, t) {
  return t === void 0 && (t = Ye(s).getComputedStyle(s)), t.position === "fixed";
}
function Uw(s, t) {
  t === void 0 && (t = Ye(s).getComputedStyle(s));
  const i = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((r) => {
    const u = t[r];
    return typeof u == "string" ? i.test(u) : !1;
  });
}
function Qd(s, t) {
  const i = [];
  function a(r) {
    if (t != null && i.length >= t || !r)
      return i;
    if (Rd(r) && r.scrollingElement != null && !i.includes(r.scrollingElement))
      return i.push(r.scrollingElement), i;
    if (!Wl(r) || J0(r) || i.includes(r))
      return i;
    const u = Ye(s).getComputedStyle(r);
    return r !== s && Uw(r, u) && i.push(r), Bw(r, u) ? i : a(r.parentNode);
  }
  return s ? a(s) : i;
}
function ib(s) {
  const [t] = Qd(s, 1);
  return t ?? null;
}
function Rh(s) {
  return !su || !s ? null : za(s) ? s : Ad(s) ? Rd(s) || s === Ta(s).scrollingElement ? window : Wl(s) ? s : null : null;
}
function nb(s) {
  return za(s) ? s.scrollX : s.scrollLeft;
}
function sb(s) {
  return za(s) ? s.scrollY : s.scrollTop;
}
function gd(s) {
  return {
    x: nb(s),
    y: sb(s)
  };
}
var fe;
(function(s) {
  s[s.Forward = 1] = "Forward", s[s.Backward = -1] = "Backward";
})(fe || (fe = {}));
function ab(s) {
  return !su || !s ? !1 : s === document.scrollingElement;
}
function lb(s) {
  const t = {
    x: 0,
    y: 0
  }, i = ab(s) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: s.clientHeight,
    width: s.clientWidth
  }, a = {
    x: s.scrollWidth - i.width,
    y: s.scrollHeight - i.height
  }, r = s.scrollTop <= t.y, u = s.scrollLeft <= t.x, c = s.scrollTop >= a.y, d = s.scrollLeft >= a.x;
  return {
    isTop: r,
    isLeft: u,
    isBottom: c,
    isRight: d,
    maxScroll: a,
    minScroll: t
  };
}
const Hw = {
  x: 0.2,
  y: 0.2
};
function qw(s, t, i, a, r) {
  let {
    top: u,
    left: c,
    right: d,
    bottom: p
  } = i;
  a === void 0 && (a = 10), r === void 0 && (r = Hw);
  const {
    isTop: v,
    isBottom: g,
    isLeft: b,
    isRight: x
  } = lb(s), S = {
    x: 0,
    y: 0
  }, w = {
    x: 0,
    y: 0
  }, M = {
    height: t.height * r.y,
    width: t.width * r.x
  };
  return !v && u <= t.top + M.height ? (S.y = fe.Backward, w.y = a * Math.abs((t.top + M.height - u) / M.height)) : !g && p >= t.bottom - M.height && (S.y = fe.Forward, w.y = a * Math.abs((t.bottom - M.height - p) / M.height)), !x && d >= t.right - M.width ? (S.x = fe.Forward, w.x = a * Math.abs((t.right - M.width - d) / M.width)) : !b && c <= t.left + M.width && (S.x = fe.Backward, w.x = a * Math.abs((t.left + M.width - c) / M.width)), {
    direction: S,
    speed: w
  };
}
function Qw(s) {
  if (s === document.scrollingElement) {
    const {
      innerWidth: u,
      innerHeight: c
    } = window;
    return {
      top: 0,
      left: 0,
      right: u,
      bottom: c,
      width: u,
      height: c
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
function rb(s) {
  return s.reduce((t, i) => wa(t, gd(i)), Mi);
}
function $w(s) {
  return s.reduce((t, i) => t + nb(i), 0);
}
function Vw(s) {
  return s.reduce((t, i) => t + sb(i), 0);
}
function Yw(s, t) {
  if (t === void 0 && (t = Oa), !s)
    return;
  const {
    top: i,
    left: a,
    bottom: r,
    right: u
  } = t(s);
  ib(s) && (r <= 0 || u <= 0 || i >= window.innerHeight || a >= window.innerWidth) && s.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const Gw = [["x", ["left", "right"], $w], ["y", ["top", "bottom"], Vw]];
class $d {
  constructor(t, i) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const a = Qd(i), r = rb(a);
    this.rect = {
      ...t
    }, this.width = t.width, this.height = t.height;
    for (const [u, c, d] of Gw)
      for (const p of c)
        Object.defineProperty(this, p, {
          get: () => {
            const v = d(a), g = r[u] - v;
            return this.rect[p] + g;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class Ol {
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
function Kw(s) {
  const {
    EventTarget: t
  } = Ye(s);
  return s instanceof t ? s : Ta(s);
}
function Lh(s, t) {
  const i = Math.abs(s.x), a = Math.abs(s.y);
  return typeof t == "number" ? Math.sqrt(i ** 2 + a ** 2) > t : "x" in t && "y" in t ? i > t.x && a > t.y : "x" in t ? i > t.x : "y" in t ? a > t.y : !1;
}
var vi;
(function(s) {
  s.Click = "click", s.DragStart = "dragstart", s.Keydown = "keydown", s.ContextMenu = "contextmenu", s.Resize = "resize", s.SelectionChange = "selectionchange", s.VisibilityChange = "visibilitychange";
})(vi || (vi = {}));
function mg(s) {
  s.preventDefault();
}
function Xw(s) {
  s.stopPropagation();
}
var At;
(function(s) {
  s.Space = "Space", s.Down = "ArrowDown", s.Right = "ArrowRight", s.Left = "ArrowLeft", s.Up = "ArrowUp", s.Esc = "Escape", s.Enter = "Enter", s.Tab = "Tab";
})(At || (At = {}));
const ob = {
  start: [At.Space, At.Enter],
  cancel: [At.Esc],
  end: [At.Space, At.Enter, At.Tab]
}, Zw = (s, t) => {
  let {
    currentCoordinates: i
  } = t;
  switch (s.code) {
    case At.Right:
      return {
        ...i,
        x: i.x + 25
      };
    case At.Left:
      return {
        ...i,
        x: i.x - 25
      };
    case At.Down:
      return {
        ...i,
        y: i.y + 25
      };
    case At.Up:
      return {
        ...i,
        y: i.y - 25
      };
  }
};
class ub {
  constructor(t) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = t;
    const {
      event: {
        target: i
      }
    } = t;
    this.props = t, this.listeners = new Ol(Ta(i)), this.windowListeners = new Ol(Ye(i)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(vi.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: t,
      onStart: i
    } = this.props, a = t.node.current;
    a && Yw(a), i(Mi);
  }
  handleKeyDown(t) {
    if (Bd(t)) {
      const {
        active: i,
        context: a,
        options: r
      } = this.props, {
        keyboardCodes: u = ob,
        coordinateGetter: c = Zw,
        scrollBehavior: d = "smooth"
      } = r, {
        code: p
      } = t;
      if (u.end.includes(p)) {
        this.handleEnd(t);
        return;
      }
      if (u.cancel.includes(p)) {
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
      const b = c(t, {
        active: i,
        context: a.current,
        currentCoordinates: g
      });
      if (b) {
        const x = Ko(b, g), S = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: w
        } = a.current;
        for (const M of w) {
          const N = t.code, {
            isTop: E,
            isRight: T,
            isLeft: R,
            isBottom: D,
            maxScroll: V,
            minScroll: G
          } = lb(M), A = Qw(M), X = {
            x: Math.min(N === At.Right ? A.right - A.width / 2 : A.right, Math.max(N === At.Right ? A.left : A.left + A.width / 2, b.x)),
            y: Math.min(N === At.Down ? A.bottom - A.height / 2 : A.bottom, Math.max(N === At.Down ? A.top : A.top + A.height / 2, b.y))
          }, J = N === At.Right && !T || N === At.Left && !R, rt = N === At.Down && !D || N === At.Up && !E;
          if (J && X.x !== b.x) {
            const st = M.scrollLeft + x.x, F = N === At.Right && st <= V.x || N === At.Left && st >= G.x;
            if (F && !x.y) {
              M.scrollTo({
                left: st,
                behavior: d
              });
              return;
            }
            F ? S.x = M.scrollLeft - st : S.x = N === At.Right ? M.scrollLeft - V.x : M.scrollLeft - G.x, S.x && M.scrollBy({
              left: -S.x,
              behavior: d
            });
            break;
          } else if (rt && X.y !== b.y) {
            const st = M.scrollTop + x.y, F = N === At.Down && st <= V.y || N === At.Up && st >= G.y;
            if (F && !x.x) {
              M.scrollTo({
                top: st,
                behavior: d
              });
              return;
            }
            F ? S.y = M.scrollTop - st : S.y = N === At.Down ? M.scrollTop - V.y : M.scrollTop - G.y, S.y && M.scrollBy({
              top: -S.y,
              behavior: d
            });
            break;
          }
        }
        this.handleMove(t, wa(Ko(b, this.referenceCoordinates), S));
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
ub.activators = [{
  eventName: "onKeyDown",
  handler: (s, t, i) => {
    let {
      keyboardCodes: a = ob,
      onActivation: r
    } = t, {
      active: u
    } = i;
    const {
      code: c
    } = s.nativeEvent;
    if (a.start.includes(c)) {
      const d = u.activatorNode.current;
      return d && s.target !== d ? !1 : (s.preventDefault(), r?.({
        event: s.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function pg(s) {
  return !!(s && "distance" in s);
}
function vg(s) {
  return !!(s && "delay" in s);
}
class Vd {
  constructor(t, i, a) {
    var r;
    a === void 0 && (a = Kw(t.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = t, this.events = i;
    const {
      event: u
    } = t, {
      target: c
    } = u;
    this.props = t, this.events = i, this.document = Ta(c), this.documentListeners = new Ol(this.document), this.listeners = new Ol(a), this.windowListeners = new Ol(Ye(c)), this.initialCoordinates = (r = vd(u)) != null ? r : Mi, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
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
    }), this.listeners.add(t.end.name, this.handleEnd), t.cancel && this.listeners.add(t.cancel.name, this.handleCancel), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.DragStart, mg), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), this.windowListeners.add(vi.ContextMenu, mg), this.documentListeners.add(vi.Keydown, this.handleKeydown), i) {
      if (a != null && a({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (vg(i)) {
        this.timeoutId = setTimeout(this.handleStart, i.delay), this.handlePending(i);
        return;
      }
      if (pg(i)) {
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
    t && (this.activated = !0, this.documentListeners.add(vi.Click, Xw, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(vi.SelectionChange, this.removeTextSelection), i(t));
  }
  handleMove(t) {
    var i;
    const {
      activated: a,
      initialCoordinates: r,
      props: u
    } = this, {
      onMove: c,
      options: {
        activationConstraint: d
      }
    } = u;
    if (!r)
      return;
    const p = (i = vd(t)) != null ? i : Mi, v = Ko(r, p);
    if (!a && d) {
      if (pg(d)) {
        if (d.tolerance != null && Lh(v, d.tolerance))
          return this.handleCancel();
        if (Lh(v, d.distance))
          return this.handleStart();
      }
      if (vg(d) && Lh(v, d.tolerance))
        return this.handleCancel();
      this.handlePending(d, v);
      return;
    }
    t.cancelable && t.preventDefault(), c(p);
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
    t.code === At.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var t;
    (t = this.document.getSelection()) == null || t.removeAllRanges();
  }
}
const Ww = {
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
class Jl extends Vd {
  constructor(t) {
    const {
      event: i
    } = t, a = Ta(i.target);
    super(t, Ww, a);
  }
}
Jl.activators = [{
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
const Iw = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var bd;
(function(s) {
  s[s.RightClick = 2] = "RightClick";
})(bd || (bd = {}));
class Fw extends Vd {
  constructor(t) {
    super(t, Iw, Ta(t.event.target));
  }
}
Fw.activators = [{
  eventName: "onMouseDown",
  handler: (s, t) => {
    let {
      nativeEvent: i
    } = s, {
      onActivation: a
    } = t;
    return i.button === bd.RightClick ? !1 : (a?.({
      event: i
    }), !0);
  }
}];
const Bh = {
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
class Jw extends Vd {
  constructor(t) {
    super(t, Bh);
  }
  static setup() {
    return window.addEventListener(Bh.move.name, t, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(Bh.move.name, t);
    };
    function t() {
    }
  }
}
Jw.activators = [{
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
var Dl;
(function(s) {
  s[s.Pointer = 0] = "Pointer", s[s.DraggableRect = 1] = "DraggableRect";
})(Dl || (Dl = {}));
var Zo;
(function(s) {
  s[s.TreeOrder = 0] = "TreeOrder", s[s.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Zo || (Zo = {}));
function Pw(s) {
  let {
    acceleration: t,
    activator: i = Dl.Pointer,
    canScroll: a,
    draggingRect: r,
    enabled: u,
    interval: c = 5,
    order: d = Zo.TreeOrder,
    pointerCoordinates: p,
    scrollableAncestors: v,
    scrollableAncestorRects: g,
    delta: b,
    threshold: x
  } = s;
  const S = e2({
    delta: b,
    disabled: !u
  }), [w, M] = hw(), N = C.useRef({
    x: 0,
    y: 0
  }), E = C.useRef({
    x: 0,
    y: 0
  }), T = C.useMemo(() => {
    switch (i) {
      case Dl.Pointer:
        return p ? {
          top: p.y,
          bottom: p.y,
          left: p.x,
          right: p.x
        } : null;
      case Dl.DraggableRect:
        return r;
    }
  }, [i, r, p]), R = C.useRef(null), D = C.useCallback(() => {
    const G = R.current;
    if (!G)
      return;
    const A = N.current.x * E.current.x, X = N.current.y * E.current.y;
    G.scrollBy(A, X);
  }, []), V = C.useMemo(() => d === Zo.TreeOrder ? [...v].reverse() : v, [d, v]);
  C.useEffect(
    () => {
      if (!u || !v.length || !T) {
        M();
        return;
      }
      for (const G of V) {
        if (a?.(G) === !1)
          continue;
        const A = v.indexOf(G), X = g[A];
        if (!X)
          continue;
        const {
          direction: J,
          speed: rt
        } = qw(G, X, T, t, x);
        for (const st of ["x", "y"])
          S[st][J[st]] || (rt[st] = 0, J[st] = 0);
        if (rt.x > 0 || rt.y > 0) {
          M(), R.current = G, w(D, c), N.current = rt, E.current = J;
          return;
        }
      }
      N.current = {
        x: 0,
        y: 0
      }, E.current = {
        x: 0,
        y: 0
      }, M();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      D,
      a,
      M,
      u,
      c,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(T),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(S),
      w,
      v,
      V,
      g,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(x)
    ]
  );
}
const t2 = {
  x: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  },
  y: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  }
};
function e2(s) {
  let {
    delta: t,
    disabled: i
  } = s;
  const a = pd(t);
  return Il((r) => {
    if (i || !a || !r)
      return t2;
    const u = {
      x: Math.sign(t.x - a.x),
      y: Math.sign(t.y - a.y)
    };
    return {
      x: {
        [fe.Backward]: r.x[fe.Backward] || u.x === -1,
        [fe.Forward]: r.x[fe.Forward] || u.x === 1
      },
      y: {
        [fe.Backward]: r.y[fe.Backward] || u.y === -1,
        [fe.Forward]: r.y[fe.Forward] || u.y === 1
      }
    };
  }, [i, t, a]);
}
function i2(s, t) {
  const i = t != null ? s.get(t) : void 0, a = i ? i.node.current : null;
  return Il((r) => {
    var u;
    return t == null ? null : (u = a ?? r) != null ? u : null;
  }, [a, t]);
}
function n2(s, t) {
  return C.useMemo(() => s.reduce((i, a) => {
    const {
      sensor: r
    } = a, u = r.activators.map((c) => ({
      eventName: c.eventName,
      handler: t(c.handler, a)
    }));
    return [...i, ...u];
  }, []), [s, t]);
}
var Ql;
(function(s) {
  s[s.Always = 0] = "Always", s[s.BeforeDragging = 1] = "BeforeDragging", s[s.WhileDragging = 2] = "WhileDragging";
})(Ql || (Ql = {}));
var yd;
(function(s) {
  s.Optimized = "optimized";
})(yd || (yd = {}));
const gg = /* @__PURE__ */ new Map();
function s2(s, t) {
  let {
    dragging: i,
    dependencies: a,
    config: r
  } = t;
  const [u, c] = C.useState(null), {
    frequency: d,
    measure: p,
    strategy: v
  } = r, g = C.useRef(s), b = N(), x = Hl(b), S = C.useCallback(function(E) {
    E === void 0 && (E = []), !x.current && c((T) => T === null ? E : T.concat(E.filter((R) => !T.includes(R))));
  }, [x]), w = C.useRef(null), M = Il((E) => {
    if (b && !i)
      return gg;
    if (!E || E === gg || g.current !== s || u != null) {
      const T = /* @__PURE__ */ new Map();
      for (let R of s) {
        if (!R)
          continue;
        if (u && u.length > 0 && !u.includes(R.id) && R.rect.current) {
          T.set(R.id, R.rect.current);
          continue;
        }
        const D = R.node.current, V = D ? new $d(p(D), D) : null;
        R.rect.current = V, V && T.set(R.id, V);
      }
      return T;
    }
    return E;
  }, [s, u, i, b, p]);
  return C.useEffect(() => {
    g.current = s;
  }, [s]), C.useEffect(
    () => {
      b || S();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i, b]
  ), C.useEffect(
    () => {
      u && u.length > 0 && c(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(u)]
  ), C.useEffect(
    () => {
      b || typeof d != "number" || w.current !== null || (w.current = setTimeout(() => {
        S(), w.current = null;
      }, d));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [d, b, S, ...a]
  ), {
    droppableRects: M,
    measureDroppableContainers: S,
    measuringScheduled: u != null
  };
  function N() {
    switch (v) {
      case Ql.Always:
        return !1;
      case Ql.BeforeDragging:
        return i;
      default:
        return !i;
    }
  }
}
function cb(s, t) {
  return Il((i) => s ? i || (typeof t == "function" ? t(s) : s) : null, [t, s]);
}
function a2(s, t) {
  return cb(s, t);
}
function l2(s) {
  let {
    callback: t,
    disabled: i
  } = s;
  const a = Ld(t), r = C.useMemo(() => {
    if (i || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: u
    } = window;
    return new u(a);
  }, [a, i]);
  return C.useEffect(() => () => r?.disconnect(), [r]), r;
}
function au(s) {
  let {
    callback: t,
    disabled: i
  } = s;
  const a = Ld(t), r = C.useMemo(
    () => {
      if (i || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: u
      } = window;
      return new u(a);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i]
  );
  return C.useEffect(() => () => r?.disconnect(), [r]), r;
}
function r2(s) {
  return new $d(Oa(s), s);
}
function bg(s, t, i) {
  t === void 0 && (t = r2);
  const [a, r] = C.useState(null);
  function u() {
    r((p) => {
      if (!s)
        return null;
      if (s.isConnected === !1) {
        var v;
        return (v = p ?? i) != null ? v : null;
      }
      const g = t(s);
      return JSON.stringify(p) === JSON.stringify(g) ? p : g;
    });
  }
  const c = l2({
    callback(p) {
      if (s)
        for (const v of p) {
          const {
            type: g,
            target: b
          } = v;
          if (g === "childList" && b instanceof HTMLElement && b.contains(s)) {
            u();
            break;
          }
        }
    }
  }), d = au({
    callback: u
  });
  return Ui(() => {
    u(), s ? (d?.observe(s), c?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (d?.disconnect(), c?.disconnect());
  }, [s]), a;
}
function o2(s) {
  const t = cb(s);
  return eb(s, t);
}
const yg = [];
function u2(s) {
  const t = C.useRef(s), i = Il((a) => s ? a && a !== yg && s && t.current && s.parentNode === t.current.parentNode ? a : Qd(s) : yg, [s]);
  return C.useEffect(() => {
    t.current = s;
  }, [s]), i;
}
function c2(s) {
  const [t, i] = C.useState(null), a = C.useRef(s), r = C.useCallback((u) => {
    const c = Rh(u.target);
    c && i((d) => d ? (d.set(c, gd(c)), new Map(d)) : null);
  }, []);
  return C.useEffect(() => {
    const u = a.current;
    if (s !== u) {
      c(u);
      const d = s.map((p) => {
        const v = Rh(p);
        return v ? (v.addEventListener("scroll", r, {
          passive: !0
        }), [v, gd(v)]) : null;
      }).filter((p) => p != null);
      i(d.length ? new Map(d) : null), a.current = s;
    }
    return () => {
      c(s), c(u);
    };
    function c(d) {
      d.forEach((p) => {
        const v = Rh(p);
        v?.removeEventListener("scroll", r);
      });
    }
  }, [r, s]), C.useMemo(() => s.length ? t ? Array.from(t.values()).reduce((u, c) => wa(u, c), Mi) : rb(s) : Mi, [s, t]);
}
function xg(s, t) {
  t === void 0 && (t = []);
  const i = C.useRef(null);
  return C.useEffect(
    () => {
      i.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), C.useEffect(() => {
    const a = s !== Mi;
    a && !i.current && (i.current = s), !a && i.current && (i.current = null);
  }, [s]), i.current ? Ko(s, i.current) : Mi;
}
function h2(s) {
  C.useEffect(
    () => {
      if (!su)
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
function d2(s, t) {
  return C.useMemo(() => s.reduce((i, a) => {
    let {
      eventName: r,
      handler: u
    } = a;
    return i[r] = (c) => {
      u(c, t);
    }, i;
  }, {}), [s, t]);
}
function hb(s) {
  return C.useMemo(() => s ? Lw(s) : null, [s]);
}
const wg = [];
function f2(s, t) {
  t === void 0 && (t = Oa);
  const [i] = s, a = hb(i ? Ye(i) : null), [r, u] = C.useState(wg);
  function c() {
    u(() => s.length ? s.map((p) => ab(p) ? a : new $d(t(p), p)) : wg);
  }
  const d = au({
    callback: c
  });
  return Ui(() => {
    d?.disconnect(), c(), s.forEach((p) => d?.observe(p));
  }, [s]), r;
}
function m2(s) {
  if (!s)
    return null;
  if (s.children.length > 1)
    return s;
  const t = s.children[0];
  return Wl(t) ? t : s;
}
function p2(s) {
  let {
    measure: t
  } = s;
  const [i, a] = C.useState(null), r = C.useCallback((v) => {
    for (const {
      target: g
    } of v)
      if (Wl(g)) {
        a((b) => {
          const x = t(g);
          return b ? {
            ...b,
            width: x.width,
            height: x.height
          } : x;
        });
        break;
      }
  }, [t]), u = au({
    callback: r
  }), c = C.useCallback((v) => {
    const g = m2(v);
    u?.disconnect(), g && u?.observe(g), a(g ? t(g) : null);
  }, [t, u]), [d, p] = Go(c);
  return C.useMemo(() => ({
    nodeRef: d,
    rect: i,
    setRef: p
  }), [i, d, p]);
}
const v2 = [{
  sensor: Jl,
  options: {}
}, {
  sensor: ub,
  options: {}
}], g2 = {
  current: {}
}, Ho = {
  draggable: {
    measure: fg
  },
  droppable: {
    measure: fg,
    strategy: Ql.WhileDragging,
    frequency: yd.Optimized
  },
  dragOverlay: {
    measure: Oa
  }
};
class Al extends Map {
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
const b2 = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new Al(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Xo
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Ho,
  measureDroppableContainers: Xo,
  windowRect: null,
  measuringScheduled: !1
}, y2 = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Xo,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Xo
}, lu = /* @__PURE__ */ C.createContext(y2), db = /* @__PURE__ */ C.createContext(b2);
function x2() {
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
      containers: new Al()
    }
  };
}
function w2(s, t) {
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
      } = i, r = new Al(s.droppable.containers);
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
      } = t, u = s.droppable.containers.get(i);
      if (!u || a !== u.key)
        return s;
      const c = new Al(s.droppable.containers);
      return c.set(i, {
        ...u,
        disabled: r
      }), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: c
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
      const u = new Al(s.droppable.containers);
      return u.delete(i), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: u
        }
      };
    }
    default:
      return s;
  }
}
function _2(s) {
  let {
    disabled: t
  } = s;
  const {
    active: i,
    activatorEvent: a,
    draggableNodes: r
  } = C.useContext(lu), u = pd(a), c = pd(i?.id);
  return C.useEffect(() => {
    if (!t && !a && u && c != null) {
      if (!Bd(u) || document.activeElement === u.target)
        return;
      const d = r.get(c);
      if (!d)
        return;
      const {
        activatorNode: p,
        node: v
      } = d;
      if (!p.current && !v.current)
        return;
      requestAnimationFrame(() => {
        for (const g of [p.current, v.current]) {
          if (!g)
            continue;
          const b = mw(g);
          if (b) {
            b.focus();
            break;
          }
        }
      });
    }
  }, [a, t, r, c, u]), null;
}
function S2(s, t) {
  let {
    transform: i,
    ...a
  } = t;
  return s != null && s.length ? s.reduce((r, u) => u({
    transform: r,
    ...a
  }), i) : i;
}
function M2(s) {
  return C.useMemo(
    () => ({
      draggable: {
        ...Ho.draggable,
        ...s?.draggable
      },
      droppable: {
        ...Ho.droppable,
        ...s?.droppable
      },
      dragOverlay: {
        ...Ho.dragOverlay,
        ...s?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s?.draggable, s?.droppable, s?.dragOverlay]
  );
}
function N2(s) {
  let {
    activeNode: t,
    measure: i,
    initialRect: a,
    config: r = !0
  } = s;
  const u = C.useRef(!1), {
    x: c,
    y: d
  } = typeof r == "boolean" ? {
    x: r,
    y: r
  } : r;
  Ui(() => {
    if (!c && !d || !t) {
      u.current = !1;
      return;
    }
    if (u.current || !a)
      return;
    const v = t?.node.current;
    if (!v || v.isConnected === !1)
      return;
    const g = i(v), b = eb(g, a);
    if (c || (b.x = 0), d || (b.y = 0), u.current = !0, Math.abs(b.x) > 0 || Math.abs(b.y) > 0) {
      const x = ib(v);
      x && x.scrollBy({
        top: b.y,
        left: b.x
      });
    }
  }, [t, c, d, a, i]);
}
const fb = /* @__PURE__ */ C.createContext({
  ...Mi,
  scaleX: 1,
  scaleY: 1
});
var Bn;
(function(s) {
  s[s.Uninitialized = 0] = "Uninitialized", s[s.Initializing = 1] = "Initializing", s[s.Initialized = 2] = "Initialized";
})(Bn || (Bn = {}));
const Yd = /* @__PURE__ */ C.memo(function(t) {
  var i, a, r, u;
  let {
    id: c,
    accessibility: d,
    autoScroll: p = !0,
    children: v,
    sensors: g = v2,
    collisionDetection: b = kw,
    measuring: x,
    modifiers: S,
    ...w
  } = t;
  const M = C.useReducer(w2, void 0, x2), [N, E] = M, [T, R] = xw(), [D, V] = C.useState(Bn.Uninitialized), G = D === Bn.Initialized, {
    draggable: {
      active: A,
      nodes: X,
      translate: J
    },
    droppable: {
      containers: rt
    }
  } = N, st = A != null ? X.get(A) : null, F = C.useRef({
    initial: null,
    translated: null
  }), vt = C.useMemo(() => {
    var It;
    return A != null ? {
      id: A,
      // It's possible for the active node to unmount while dragging
      data: (It = st?.data) != null ? It : g2,
      rect: F
    } : null;
  }, [A, st]), bt = C.useRef(null), [Tt, L] = C.useState(null), [Z, it] = C.useState(null), ht = Hl(w, Object.values(w)), ft = Fl("DndDescribedBy", c), k = C.useMemo(() => rt.getEnabled(), [rt]), Q = M2(x), {
    droppableRects: I,
    measureDroppableContainers: tt,
    measuringScheduled: dt
  } = s2(k, {
    dragging: G,
    dependencies: [J.x, J.y],
    config: Q.droppable
  }), ct = i2(X, A), Mt = C.useMemo(() => Z ? vd(Z) : null, [Z]), Gt = zs(), Ot = a2(ct, Q.draggable.measure);
  N2({
    activeNode: A != null ? X.get(A) : null,
    config: Gt.layoutShiftCompensation,
    initialRect: Ot,
    measure: Q.draggable.measure
  });
  const Ct = bg(ct, Q.draggable.measure, Ot), Ci = bg(ct ? ct.parentElement : null), ze = C.useRef({
    activatorEvent: null,
    active: null,
    activeNode: ct,
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
  }), Hi = rt.getNodeFor((i = ze.current.over) == null ? void 0 : i.id), me = p2({
    measure: Q.dragOverlay.measure
  }), ji = (a = me.nodeRef.current) != null ? a : ct, Ei = G ? (r = me.rect) != null ? r : Ct : null, or = !!(me.nodeRef.current && me.rect), Aa = o2(or ? null : Ct), Gn = hb(ji ? Ye(ji) : null), ti = u2(G ? Hi ?? ct : null), hn = f2(ti), Es = S2(S, {
    transform: {
      x: J.x - Aa.x,
      y: J.y - Aa.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: Z,
    active: vt,
    activeNodeRect: Ct,
    containerNodeRect: Ci,
    draggingNodeRect: Ei,
    over: ze.current.over,
    overlayNodeRect: me.rect,
    scrollableAncestors: ti,
    scrollableAncestorRects: hn,
    windowRect: Gn
  }), ur = Mt ? wa(Mt, J) : null, _e = c2(ti), vu = xg(_e), cr = xg(_e, [Ct]), qi = wa(Es, vu), gi = Ei ? Ow(Ei, Es) : null, Kn = vt && gi ? b({
    active: vt,
    collisionRect: gi,
    droppableRects: I,
    droppableContainers: k,
    pointerCoordinates: ur
  }) : null, Ra = jw(Kn, "id"), [ki, hr] = C.useState(null), Xn = or ? Es : wa(Es, cr), Ce = zw(Xn, (u = ki?.rect) != null ? u : null, Ct), ei = C.useRef(null), Se = C.useCallback(
    (It, Ft) => {
      let {
        sensor: ue,
        options: Te
      } = Ft;
      if (bt.current == null)
        return;
      const Oe = X.get(bt.current);
      if (!Oe)
        return;
      const Me = It.nativeEvent, De = new ue({
        active: bt.current,
        activeNode: Oe,
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
          } = ht.current, ni = {
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
            onDragPending: $i
          } = ht.current, yi = {
            id: le,
            constraint: bi,
            initialCoordinates: Ge,
            offset: ni
          };
          $i?.(yi), T({
            type: "onDragPending",
            event: yi
          });
        },
        onStart(le) {
          const bi = bt.current;
          if (bi == null)
            return;
          const Ge = X.get(bi);
          if (!Ge)
            return;
          const {
            onDragStart: ni
          } = ht.current, Qi = {
            activatorEvent: Me,
            active: {
              id: bi,
              data: Ge.data,
              rect: F
            }
          };
          Hn.unstable_batchedUpdates(() => {
            ni?.(Qi), V(Bn.Initializing), E({
              type: oe.DragStart,
              initialCoordinates: le,
              active: bi
            }), T({
              type: "onDragStart",
              event: Qi
            }), L(ei.current), it(Me);
          });
        },
        onMove(le) {
          E({
            type: oe.DragMove,
            coordinates: le
          });
        },
        onEnd: ii(oe.DragEnd),
        onCancel: ii(oe.DragCancel)
      });
      ei.current = De;
      function ii(le) {
        return async function() {
          const {
            active: Ge,
            collisions: ni,
            over: Qi,
            scrollAdjustedTranslate: $i
          } = ze.current;
          let yi = null;
          if (Ge && $i) {
            const {
              cancelDrop: dn
            } = ht.current;
            yi = {
              activatorEvent: Me,
              active: Ge,
              collisions: ni,
              delta: $i,
              over: Qi
            }, le === oe.DragEnd && typeof dn == "function" && await Promise.resolve(dn(yi)) && (le = oe.DragCancel);
          }
          bt.current = null, Hn.unstable_batchedUpdates(() => {
            E({
              type: le
            }), V(Bn.Uninitialized), hr(null), L(null), it(null), ei.current = null;
            const dn = le === oe.DragEnd ? "onDragEnd" : "onDragCancel";
            if (yi) {
              const si = ht.current[dn];
              si?.(yi), T({
                type: dn,
                event: yi
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [X]
  ), gu = C.useCallback((It, Ft) => (ue, Te) => {
    const Oe = ue.nativeEvent, Me = X.get(Te);
    if (
      // Another sensor is already instantiating
      bt.current !== null || // No active draggable
      !Me || // Event has already been captured
      Oe.dndKit || Oe.defaultPrevented
    )
      return;
    const De = {
      active: Me
    };
    It(ue, Ft.options, De) === !0 && (Oe.dndKit = {
      capturedBy: Ft.sensor
    }, bt.current = Te, Se(ue, Ft));
  }, [X, Se]), dr = n2(g, gu);
  h2(g), Ui(() => {
    Ct && D === Bn.Initializing && V(Bn.Initialized);
  }, [Ct, D]), C.useEffect(
    () => {
      const {
        onDragMove: It
      } = ht.current, {
        active: Ft,
        activatorEvent: ue,
        collisions: Te,
        over: Oe
      } = ze.current;
      if (!Ft || !ue)
        return;
      const Me = {
        active: Ft,
        activatorEvent: ue,
        collisions: Te,
        delta: {
          x: qi.x,
          y: qi.y
        },
        over: Oe
      };
      Hn.unstable_batchedUpdates(() => {
        It?.(Me), T({
          type: "onDragMove",
          event: Me
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [qi.x, qi.y]
  ), C.useEffect(
    () => {
      const {
        active: It,
        activatorEvent: Ft,
        collisions: ue,
        droppableContainers: Te,
        scrollAdjustedTranslate: Oe
      } = ze.current;
      if (!It || bt.current == null || !Ft || !Oe)
        return;
      const {
        onDragOver: Me
      } = ht.current, De = Te.get(Ra), ii = De && De.rect.current ? {
        id: De.id,
        rect: De.rect.current,
        data: De.data,
        disabled: De.disabled
      } : null, le = {
        active: It,
        activatorEvent: Ft,
        collisions: ue,
        delta: {
          x: Oe.x,
          y: Oe.y
        },
        over: ii
      };
      Hn.unstable_batchedUpdates(() => {
        hr(ii), Me?.(le), T({
          type: "onDragOver",
          event: le
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Ra]
  ), Ui(() => {
    ze.current = {
      activatorEvent: Z,
      active: vt,
      activeNode: ct,
      collisionRect: gi,
      collisions: Kn,
      droppableRects: I,
      draggableNodes: X,
      draggingNode: ji,
      draggingNodeRect: Ei,
      droppableContainers: rt,
      over: ki,
      scrollableAncestors: ti,
      scrollAdjustedTranslate: qi
    }, F.current = {
      initial: Ei,
      translated: gi
    };
  }, [vt, ct, Kn, gi, X, ji, Ei, I, rt, ki, ti, qi]), Pw({
    ...Gt,
    delta: J,
    draggingRect: gi,
    pointerCoordinates: ur,
    scrollableAncestors: ti,
    scrollableAncestorRects: hn
  });
  const bu = C.useMemo(() => ({
    active: vt,
    activeNode: ct,
    activeNodeRect: Ct,
    activatorEvent: Z,
    collisions: Kn,
    containerNodeRect: Ci,
    dragOverlay: me,
    draggableNodes: X,
    droppableContainers: rt,
    droppableRects: I,
    over: ki,
    measureDroppableContainers: tt,
    scrollableAncestors: ti,
    scrollableAncestorRects: hn,
    measuringConfiguration: Q,
    measuringScheduled: dt,
    windowRect: Gn
  }), [vt, ct, Ct, Z, Kn, Ci, me, X, rt, I, ki, tt, ti, hn, Q, dt, Gn]), ks = C.useMemo(() => ({
    activatorEvent: Z,
    activators: dr,
    active: vt,
    activeNodeRect: Ct,
    ariaDescribedById: {
      draggable: ft
    },
    dispatch: E,
    draggableNodes: X,
    over: ki,
    measureDroppableContainers: tt
  }), [Z, dr, vt, Ct, E, ft, X, ki, tt]);
  return Qe.createElement(tb.Provider, {
    value: R
  }, Qe.createElement(lu.Provider, {
    value: ks
  }, Qe.createElement(db.Provider, {
    value: bu
  }, Qe.createElement(fb.Provider, {
    value: Ce
  }, v)), Qe.createElement(_2, {
    disabled: d?.restoreFocus === !1
  })), Qe.createElement(Sw, {
    ...d,
    hiddenTextDescribedById: ft
  }));
  function zs() {
    const It = Tt?.autoScrollEnabled === !1, Ft = typeof p == "object" ? p.enabled === !1 : p === !1, ue = G && !It && !Ft;
    return typeof p == "object" ? {
      ...p,
      enabled: ue
    } : {
      enabled: ue
    };
  }
}), C2 = /* @__PURE__ */ C.createContext(null), _g = "button", j2 = "Draggable";
function E2(s) {
  let {
    id: t,
    data: i,
    disabled: a = !1,
    attributes: r
  } = s;
  const u = Fl(j2), {
    activators: c,
    activatorEvent: d,
    active: p,
    activeNodeRect: v,
    ariaDescribedById: g,
    draggableNodes: b,
    over: x
  } = C.useContext(lu), {
    role: S = _g,
    roleDescription: w = "draggable",
    tabIndex: M = 0
  } = r ?? {}, N = p?.id === t, E = C.useContext(N ? fb : C2), [T, R] = Go(), [D, V] = Go(), G = d2(c, t), A = Hl(i);
  Ui(
    () => (b.set(t, {
      id: t,
      key: u,
      node: T,
      activatorNode: D,
      data: A
    }), () => {
      const J = b.get(t);
      J && J.key === u && b.delete(t);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [b, t]
  );
  const X = C.useMemo(() => ({
    role: S,
    tabIndex: M,
    "aria-disabled": a,
    "aria-pressed": N && S === _g ? !0 : void 0,
    "aria-roledescription": w,
    "aria-describedby": g.draggable
  }), [a, S, M, N, w, g.draggable]);
  return {
    active: p,
    activatorEvent: d,
    activeNodeRect: v,
    attributes: X,
    isDragging: N,
    listeners: a ? void 0 : G,
    node: T,
    over: x,
    setNodeRef: R,
    setActivatorNodeRef: V,
    transform: E
  };
}
function k2() {
  return C.useContext(db);
}
const z2 = "Droppable", T2 = {
  timeout: 25
};
function O2(s) {
  let {
    data: t,
    disabled: i = !1,
    id: a,
    resizeObserverConfig: r
  } = s;
  const u = Fl(z2), {
    active: c,
    dispatch: d,
    over: p,
    measureDroppableContainers: v
  } = C.useContext(lu), g = C.useRef({
    disabled: i
  }), b = C.useRef(!1), x = C.useRef(null), S = C.useRef(null), {
    disabled: w,
    updateMeasurementsFor: M,
    timeout: N
  } = {
    ...T2,
    ...r
  }, E = Hl(M ?? a), T = C.useCallback(
    () => {
      if (!b.current) {
        b.current = !0;
        return;
      }
      S.current != null && clearTimeout(S.current), S.current = setTimeout(() => {
        v(Array.isArray(E.current) ? E.current : [E.current]), S.current = null;
      }, N);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [N]
  ), R = au({
    callback: T,
    disabled: w || !c
  }), D = C.useCallback((X, J) => {
    R && (J && (R.unobserve(J), b.current = !1), X && R.observe(X));
  }, [R]), [V, G] = Go(D), A = Hl(t);
  return C.useEffect(() => {
    !R || !V.current || (R.disconnect(), b.current = !1, R.observe(V.current));
  }, [V, R]), C.useEffect(
    () => (d({
      type: oe.RegisterDroppable,
      element: {
        id: a,
        key: u,
        disabled: i,
        node: V,
        rect: x,
        data: A
      }
    }), () => d({
      type: oe.UnregisterDroppable,
      key: u,
      id: a
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [a]
  ), C.useEffect(() => {
    i !== g.current.disabled && (d({
      type: oe.SetDroppableDisabled,
      id: a,
      key: u,
      disabled: i
    }), g.current.disabled = i);
  }, [a, u, i, d]), {
    active: c,
    rect: x,
    isOver: p?.id === a,
    node: V,
    over: p,
    setNodeRef: G
  };
}
function Gd(s, t, i) {
  const a = s.slice();
  return a.splice(i < 0 ? a.length + i : i, 0, a.splice(t, 1)[0]), a;
}
function D2(s, t) {
  return s.reduce((i, a, r) => {
    const u = t.get(a);
    return u && (i[r] = u), i;
  }, Array(s.length));
}
function Co(s) {
  return s !== null && s >= 0;
}
function A2(s, t) {
  if (s === t)
    return !0;
  if (s.length !== t.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (s[i] !== t[i])
      return !1;
  return !0;
}
function R2(s) {
  return typeof s == "boolean" ? {
    draggable: s,
    droppable: s
  } : s;
}
const Pl = (s) => {
  let {
    rects: t,
    activeIndex: i,
    overIndex: a,
    index: r
  } = s;
  const u = Gd(t, a, i), c = t[r], d = u[r];
  return !d || !c ? null : {
    x: d.left - c.left,
    y: d.top - c.top,
    scaleX: d.width / c.width,
    scaleY: d.height / c.height
  };
}, mb = "Sortable", pb = /* @__PURE__ */ Qe.createContext({
  activeIndex: -1,
  containerId: mb,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Pl,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function Kd(s) {
  let {
    children: t,
    id: i,
    items: a,
    strategy: r = Pl,
    disabled: u = !1
  } = s;
  const {
    active: c,
    dragOverlay: d,
    droppableRects: p,
    over: v,
    measureDroppableContainers: g
  } = k2(), b = Fl(mb, i), x = d.rect !== null, S = C.useMemo(() => a.map((G) => typeof G == "object" && "id" in G ? G.id : G), [a]), w = c != null, M = c ? S.indexOf(c.id) : -1, N = v ? S.indexOf(v.id) : -1, E = C.useRef(S), T = !A2(S, E.current), R = N !== -1 && M === -1 || T, D = R2(u);
  Ui(() => {
    T && w && g(S);
  }, [T, S, w, g]), C.useEffect(() => {
    E.current = S;
  }, [S]);
  const V = C.useMemo(
    () => ({
      activeIndex: M,
      containerId: b,
      disabled: D,
      disableTransforms: R,
      items: S,
      overIndex: N,
      useDragOverlay: x,
      sortedRects: D2(S, p),
      strategy: r
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [M, b, D.draggable, D.droppable, R, S, N, p, x, r]
  );
  return Qe.createElement(pb.Provider, {
    value: V
  }, t);
}
const L2 = (s) => {
  let {
    id: t,
    items: i,
    activeIndex: a,
    overIndex: r
  } = s;
  return Gd(i, a, r).indexOf(t);
}, B2 = (s) => {
  let {
    containerId: t,
    isSorting: i,
    wasDragging: a,
    index: r,
    items: u,
    newIndex: c,
    previousItems: d,
    previousContainerId: p,
    transition: v
  } = s;
  return !v || !a || d !== u && r === c ? !1 : i ? !0 : c !== r && t === p;
}, U2 = {
  duration: 200,
  easing: "ease"
}, vb = "transform", H2 = /* @__PURE__ */ ql.Transition.toString({
  property: vb,
  duration: 0,
  easing: "linear"
}), q2 = {
  roleDescription: "sortable"
};
function Q2(s) {
  let {
    disabled: t,
    index: i,
    node: a,
    rect: r
  } = s;
  const [u, c] = C.useState(null), d = C.useRef(i);
  return Ui(() => {
    if (!t && i !== d.current && a.current) {
      const p = r.current;
      if (p) {
        const v = Oa(a.current, {
          ignoreTransform: !0
        }), g = {
          x: p.left - v.left,
          y: p.top - v.top,
          scaleX: p.width / v.width,
          scaleY: p.height / v.height
        };
        (g.x || g.y) && c(g);
      }
    }
    i !== d.current && (d.current = i);
  }, [t, i, a, r]), C.useEffect(() => {
    u && c(null);
  }, [u]), u;
}
function $2(s) {
  let {
    animateLayoutChanges: t = B2,
    attributes: i,
    disabled: a,
    data: r,
    getNewIndex: u = L2,
    id: c,
    strategy: d,
    resizeObserverConfig: p,
    transition: v = U2
  } = s;
  const {
    items: g,
    containerId: b,
    activeIndex: x,
    disabled: S,
    disableTransforms: w,
    sortedRects: M,
    overIndex: N,
    useDragOverlay: E,
    strategy: T
  } = C.useContext(pb), R = V2(a, S), D = g.indexOf(c), V = C.useMemo(() => ({
    sortable: {
      containerId: b,
      index: D,
      items: g
    },
    ...r
  }), [b, r, D, g]), G = C.useMemo(() => g.slice(g.indexOf(c)), [g, c]), {
    rect: A,
    node: X,
    isOver: J,
    setNodeRef: rt
  } = O2({
    id: c,
    data: V,
    disabled: R.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: G,
      ...p
    }
  }), {
    active: st,
    activatorEvent: F,
    activeNodeRect: vt,
    attributes: bt,
    setNodeRef: Tt,
    listeners: L,
    isDragging: Z,
    over: it,
    setActivatorNodeRef: ht,
    transform: ft
  } = E2({
    id: c,
    data: V,
    attributes: {
      ...q2,
      ...i
    },
    disabled: R.draggable
  }), k = cw(rt, Tt), Q = !!st, I = Q && !w && Co(x) && Co(N), tt = !E && Z, dt = tt && I ? ft : null, Mt = I ? dt ?? (d ?? T)({
    rects: M,
    activeNodeRect: vt,
    activeIndex: x,
    overIndex: N,
    index: D
  }) : null, Gt = Co(x) && Co(N) ? u({
    id: c,
    items: g,
    activeIndex: x,
    overIndex: N
  }) : D, Ot = st?.id, Ct = C.useRef({
    activeId: Ot,
    items: g,
    newIndex: Gt,
    containerId: b
  }), Ci = g !== Ct.current.items, ze = t({
    active: st,
    containerId: b,
    isDragging: Z,
    isSorting: Q,
    id: c,
    index: D,
    items: g,
    newIndex: Ct.current.newIndex,
    previousItems: Ct.current.items,
    previousContainerId: Ct.current.containerId,
    transition: v,
    wasDragging: Ct.current.activeId != null
  }), Hi = Q2({
    disabled: !ze,
    index: D,
    node: X,
    rect: A
  });
  return C.useEffect(() => {
    Q && Ct.current.newIndex !== Gt && (Ct.current.newIndex = Gt), b !== Ct.current.containerId && (Ct.current.containerId = b), g !== Ct.current.items && (Ct.current.items = g);
  }, [Q, Gt, b, g]), C.useEffect(() => {
    if (Ot === Ct.current.activeId)
      return;
    if (Ot != null && Ct.current.activeId == null) {
      Ct.current.activeId = Ot;
      return;
    }
    const ji = setTimeout(() => {
      Ct.current.activeId = Ot;
    }, 50);
    return () => clearTimeout(ji);
  }, [Ot]), {
    active: st,
    activeIndex: x,
    attributes: bt,
    data: V,
    rect: A,
    index: D,
    newIndex: Gt,
    items: g,
    isOver: J,
    isSorting: Q,
    isDragging: Z,
    listeners: L,
    node: X,
    overIndex: N,
    over: it,
    setNodeRef: k,
    setActivatorNodeRef: ht,
    setDroppableNodeRef: rt,
    setDraggableNodeRef: Tt,
    transform: Hi ?? Mt,
    transition: me()
  };
  function me() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      Hi || // Or to prevent items jumping to back to their "new" position when items change
      Ci && Ct.current.newIndex === D
    )
      return H2;
    if (!(tt && !Bd(F) || !v) && (Q || ze))
      return ql.Transition.toString({
        ...v,
        property: vb
      });
  }
}
function V2(s, t) {
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
At.Down, At.Right, At.Up, At.Left;
const gb = C.createContext(null);
function Y2({ source: s, children: t }) {
  return /* @__PURE__ */ m.jsx(gb.Provider, { value: s, children: t });
}
function Ni() {
  const s = C.useContext(gb);
  if (!s) throw new Error("useHassSource must be used inside <HassProvider>");
  return s;
}
function ke(s) {
  const t = Ni();
  return C.useSyncExternalStore(t.subscribe, () => t.getStates()[s]);
}
function Xd() {
  const s = Ni();
  return C.useSyncExternalStore(s.subscribe, s.getStates);
}
function $e(s) {
  const t = Ni();
  return C.useSyncExternalStore(t.subscribe, () => s(t.getStates()));
}
function Bt() {
  return Ni().callService;
}
function G2() {
  const t = Ni().connection, i = (r) => t ? (t.addEventListener("ready", r), t.addEventListener("disconnected", r), t.addEventListener("reconnect-error", r), () => {
    t.removeEventListener("ready", r), t.removeEventListener("disconnected", r), t.removeEventListener("reconnect-error", r);
  }) : () => {
  }, a = () => !t || t.connected ? "live" : "reconnecting";
  return C.useSyncExternalStore(i, a);
}
function at(s) {
  return s.split(".")[0];
}
function P(s) {
  return s.attributes.friendly_name || s.entity_id;
}
function pt(s) {
  return s.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function vs(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toString() : s.toFixed(1).replace(/\.0$/, "");
}
function ms(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function ru(s, t = Date.now()) {
  if (!s) return "";
  const i = Date.parse(s);
  if (Number.isNaN(i)) return "";
  const a = Math.max(0, Math.round((t - i) / 1e3));
  if (a < 45) return "just now";
  const r = Math.round(a / 60);
  if (r < 60) return `${r}m ago`;
  const u = Math.round(r / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.round(u / 24);
  if (c < 7) return `${c}d ago`;
  const d = Math.round(c / 7);
  if (d < 5) return `${d}w ago`;
  const p = Math.round(c / 30);
  return p < 12 ? `${p}mo ago` : `${Math.round(c / 365)}y ago`;
}
function jt(s, t) {
  const i = s.attributes.supported_features;
  return i != null && (i & t) === t;
}
function Bi() {
  return crypto.randomUUID();
}
const K2 = [
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
function bb(s) {
  return `heuristic:${s.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
}
function yb(s) {
  const t = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [i, a] of K2) if (t.includes(i)) return a;
  return "Home";
}
function X2(s) {
  const t = {};
  for (const i of Object.values(s)) {
    const a = yb(i);
    t[i.entity_id] = { areaId: bb(a), areaName: a, floorId: null, floorName: null };
  }
  return t;
}
const Sg = /* @__PURE__ */ new WeakMap(), Mg = /* @__PURE__ */ new WeakMap(), Ng = /* @__PURE__ */ new WeakMap();
function xb(s) {
  let t = Sg.get(s);
  return t || (t = Z2(s), Sg.set(s, t)), t;
}
async function Z2(s) {
  const { connection: t } = s;
  if (!t) return null;
  try {
    const [i, a, r, u] = await Promise.all([
      t.sendMessagePromise({ type: "config/area_registry/list" }),
      t.sendMessagePromise({ type: "config/device_registry/list" }),
      t.sendMessagePromise({ type: "config/entity_registry/list" }),
      // Floors are newer; tolerate a server that doesn't know the command.
      t.sendMessagePromise({ type: "config/floor_registry/list" }).catch(() => [])
    ]);
    return { areas: i, devices: a, entities: r, floors: u };
  } catch {
    return null;
  }
}
function wb(s) {
  let t = Mg.get(s);
  return t || (t = W2(s), Mg.set(s, t)), t;
}
async function W2(s) {
  const t = await xb(s);
  if (!t) return X2(s.getStates());
  const { areas: i, devices: a, entities: r, floors: u } = t, c = /* @__PURE__ */ new Map();
  for (const w of u) c.set(w.floor_id, w.name || w.floor_id);
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const w of i)
    d.set(w.area_id, w.name || w.area_id), p.set(w.area_id, w.floor_id ?? null);
  const v = /* @__PURE__ */ new Map();
  for (const w of a) w.area_id && v.set(w.id, w.area_id);
  const g = (w) => {
    const M = p.get(w) ?? null;
    return { floorId: M, floorName: M ? c.get(M) ?? null : null };
  }, b = {}, x = /* @__PURE__ */ new Set();
  for (const w of r) {
    x.add(w.entity_id);
    const M = w.area_id ?? (w.device_id ? v.get(w.device_id) ?? null : null);
    M && (b[w.entity_id] = { areaId: M, areaName: d.get(M) ?? M, ...g(M) });
  }
  const S = s.getStates();
  for (const w of Object.values(S)) {
    if (b[w.entity_id] || x.has(w.entity_id)) continue;
    const M = yb(w);
    b[w.entity_id] = { areaId: bb(M), areaName: M, floorId: null, floorName: null };
  }
  return b;
}
function ou() {
  const s = Ni(), [t, i] = C.useState(void 0);
  return C.useEffect(() => {
    let a = !0;
    return wb(s).then((r) => {
      a && i(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
function _b(s) {
  let t = Ng.get(s);
  return t || (t = I2(s), Ng.set(s, t)), t;
}
async function I2(s) {
  const t = await xb(s);
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
function F2() {
  const s = Ni(), [t, i] = C.useState(void 0);
  return C.useEffect(() => {
    let a = !0;
    return _b(s).then((r) => {
      a && i(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
const J2 = [
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
], P2 = /\b(restart|reboot|identify|update|firmware|re-?index)\b/i, t_ = /* @__PURE__ */ new Set(["restart", "identify", "update"]);
function uu(s, t, i) {
  if (i && (i.entityCategory === "diagnostic" || i.entityCategory === "config" || i.hidden || i.disabled))
    return !1;
  for (const r of J2) if (r.test(s)) return !1;
  const a = at(s);
  if (a === "button" || a === "switch") {
    const r = t?.attributes.device_class ?? void 0;
    if (r && t_.has(r)) return !1;
    const u = `${s} ${t ? P(t) : ""}`;
    if (P2.test(u)) return !1;
  }
  return !0;
}
function tr(s, t, i) {
  return uu(s, t, i?.[s]);
}
const e_ = [
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
], i_ = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor", "binary_sensor", "humidifier", "siren"]), Cg = ["Living Room", "Kitchen", "Bedroom", "Office", "Bathroom", "Hallway", "Garage", "Outdoor", "Garden", "Home"];
function n_(s, t) {
  const i = t?.[s.entity_id];
  if (i) return i.areaName;
  const a = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [r, u] of e_) if (a.includes(r)) return u;
  return "Home";
}
function s_(s, t) {
  const i = t?.[s.entity_id];
  return i && !i.areaId.startsWith("heuristic:") ? i.areaId : null;
}
function a_(s) {
  const t = at(s);
  return t === "media_player" || t === "sensor" ? 2 : 1;
}
function l_(s, t, i) {
  const a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of Object.values(s)) {
    const d = at(c.entity_id);
    if (!i_.has(d) || d === "sensor" && !c.attributes.unit_of_measurement || !uu(c.entity_id, c, i?.[c.entity_id])) continue;
    const p = n_(c, t);
    let v = a.get(p);
    v || (v = [], a.set(p, v)), v.push(c), r.has(p) || r.set(p, s_(c, t));
  }
  const u = [];
  for (const [c, d] of a) {
    const p = (T) => d.filter((R) => at(R.entity_id) === T).sort((R, D) => P(R).localeCompare(P(D))), v = p("light"), g = p("climate"), b = p("media_player"), x = p("cover"), S = p("lock"), w = [...p("switch"), ...p("fan"), ...p("humidifier"), ...p("siren")], M = [...p("sensor"), ...p("binary_sensor")], N = [], E = (T, R, D, V) => {
      R.length && N.push({ id: Bi(), type: T, title: V, entityIds: R, span: D });
    };
    g.length && E("hero", [g[0].entity_id], 2), E("group", v.map((T) => T.entity_id), 2, "Lighting");
    for (const T of b) E("card", [T.entity_id], 2);
    g.length > 1 && E("list", g.slice(1).map((T) => T.entity_id), 1, "Climate"), E("list", [...S, ...x].map((T) => T.entity_id), 1, "Security & doors"), E("group", w.map((T) => T.entity_id), 1, "Switches & fans"), E("list", M.map((T) => T.entity_id), 1, "Sensors"), N.length && u.push({ id: Bi(), name: c, areaId: r.get(c) ?? null, blocks: N });
  }
  return u.sort((c, d) => {
    const p = Cg.indexOf(c.name), v = Cg.indexOf(d.name);
    return (p < 0 ? 99 : p) - (v < 0 ? 99 : v) || c.name.localeCompare(d.name);
  }), { version: 3, rooms: u, overrides: {} };
}
const Wo = "simui:dashboard:v2";
function jg(s) {
  const t = s, i = s.span ?? t.size ?? 1, a = { ...s, span: i };
  return delete a.size, a;
}
function Eg(s) {
  const t = {};
  for (const [i, a] of Object.entries(s.overrides ?? {}))
    t[i] = { blocks: (a.blocks ?? []).map(jg) };
  return {
    version: 3,
    overrides: t,
    rooms: (s.rooms ?? []).map((i) => ({ ...i, blocks: i.blocks.map(jg) }))
  };
}
async function r_(s) {
  const t = s.connection;
  if (t)
    try {
      const i = await t.sendMessagePromise({ type: "frontend/get_user_data", key: Wo }), a = i?.value?.version;
      if (i && i.value && (a === 2 || a === 3)) return Eg(i.value);
    } catch {
    }
  try {
    const i = localStorage.getItem(Wo);
    if (i) {
      const a = JSON.parse(i), r = a.version;
      if (r === 2 || r === 3) return Eg(a);
    }
  } catch {
  }
  return null;
}
async function o_(s, t) {
  try {
    localStorage.setItem(Wo, JSON.stringify(t));
  } catch {
  }
  const i = s.connection;
  if (i)
    try {
      await i.sendMessagePromise({ type: "frontend/set_user_data", key: Wo, value: t });
    } catch {
    }
}
const u_ = (s) => s === 1 ? 2 : s === 2 ? "full" : 1, Sb = C.createContext(null);
function Ns() {
  const s = C.useContext(Sb);
  if (!s) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return s;
}
function c_(s) {
  const t = s.replace(/^\/+/, ""), [i, a] = t.split("/");
  return i === "category" && a ? { kind: "category", id: a } : i === "room" && a ? { kind: "room", id: a } : { kind: "home" };
}
function h_({ children: s }) {
  const t = Ni(), [i, a] = C.useState(null), [r, u] = C.useState({ kind: "home" }), [c, d] = C.useState(!1), [p, v] = C.useState(null), g = C.useRef(!1);
  C.useEffect(() => {
    let w = !0;
    return (async () => {
      const M = await r_(t), [N, E] = M ? [void 0, void 0] : await Promise.all([wb(t), _b(t)]), T = M ?? l_(t.getStates(), N, E);
      w && (a(T), g.current = !0);
    })(), () => {
      w = !1;
    };
  }, [t]), C.useEffect(() => {
    !g.current || !i || o_(t, i);
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
        const N = `category:${r.id}`, E = M.overrides?.[N];
        return E ? { ...M, overrides: { ...M.overrides, [N]: { blocks: w(E.blocks) } } } : M;
      }
      return M;
    });
  }, x = (w) => {
    d(!1), u(w), window.scrollTo?.(0, 0);
  }, S = {
    config: i,
    route: r,
    goHome: () => x({ kind: "home" }),
    openRoom: (w) => x({ kind: "room", id: w }),
    openCategory: (w) => x({ kind: "category", id: w }),
    navigate: (w) => x(c_(w)),
    editing: c,
    setEditing: d,
    reorderBlocks: (w, M) => b((N) => Gd(N, w, M)),
    removeBlock: (w) => b((M) => M.filter((N) => N.id !== w)),
    cycleBlockSpan: (w) => b((M) => M.map((N) => N.id === w ? { ...N, span: u_(N.span) } : N)),
    addCard: (w) => b((M) => [...M, { id: Bi(), type: "card", entityIds: [w], span: a_(w) }]),
    addBlock: (w) => b((M) => [...M, w]),
    createOverride: (w, M) => a(
      (N) => N && {
        ...N,
        overrides: {
          ...N.overrides ?? {},
          // Fresh stable ids so the snapshot doesn't depend on the volatile
          // preset id scheme.
          [`category:${w}`]: { blocks: M.map((E) => ({ ...E, id: Bi() })) }
        }
      }
    ),
    resetOverride: (w) => a((M) => {
      if (!M?.overrides) return M;
      const N = { ...M.overrides };
      return delete N[`category:${w}`], { ...M, overrides: N };
    }),
    createHomeOverride: (w) => a(
      (M) => M && { ...M, overrides: { ...M.overrides ?? {}, home: { blocks: w.map((N) => ({ ...N, id: Bi() })) } } }
    ),
    resetHomeOverride: () => a((w) => {
      if (!w?.overrides) return w;
      const M = { ...w.overrides };
      return delete M.home, { ...w, overrides: M };
    }),
    sheetEntityId: p,
    openSheet: (w) => v(w),
    closeSheet: () => v(null)
  };
  return /* @__PURE__ */ m.jsx(Sb.Provider, { value: S, children: s });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mb = (...s) => s.filter((t, i, a) => !!t && t.trim() !== "" && a.indexOf(t) === i).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d_ = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f_ = (s) => s.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, i, a) => a ? a.toUpperCase() : i.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = (s) => {
  const t = f_(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Uh = {
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
const m_ = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, p_ = C.createContext({}), v_ = () => C.useContext(p_), g_ = C.forwardRef(
  ({ color: s, size: t, strokeWidth: i, absoluteStrokeWidth: a, className: r = "", children: u, iconNode: c, ...d }, p) => {
    const {
      size: v = 24,
      strokeWidth: g = 2,
      absoluteStrokeWidth: b = !1,
      color: x = "currentColor",
      className: S = ""
    } = v_() ?? {}, w = a ?? b ? Number(i ?? g) * 24 / Number(t ?? v) : i ?? g;
    return C.createElement(
      "svg",
      {
        ref: p,
        ...Uh,
        width: t ?? v ?? Uh.width,
        height: t ?? v ?? Uh.height,
        stroke: s ?? x,
        strokeWidth: w,
        className: Mb("lucide", S, r),
        ...!u && !m_(d) && { "aria-hidden": "true" },
        ...d
      },
      [
        ...c.map(([M, N]) => C.createElement(M, N)),
        ...Array.isArray(u) ? u : [u]
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
const et = (s, t) => {
  const i = C.forwardRef(
    ({ className: a, ...r }, u) => C.createElement(g_, {
      ref: u,
      iconNode: t,
      className: Mb(
        `lucide-${d_(kg(s))}`,
        `lucide-${s}`,
        a
      ),
      ...r
    })
  );
  return i.displayName = kg(s), i;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b_ = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], y_ = et("activity", b_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x_ = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
], w_ = et("alarm-clock-check", x_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __ = [
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
], S_ = et("bath", __);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M_ = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
], N_ = et("bed-double", M_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = [
  ["path", { d: "M3 3h18", key: "o7r712" }],
  ["path", { d: "M20 7H8", key: "gd2fo2" }],
  ["path", { d: "M20 11H8", key: "1ynp89" }],
  ["path", { d: "M10 19h10", key: "19hjk5" }],
  ["path", { d: "M8 15h12", key: "1yqzne" }],
  ["path", { d: "M4 3v14", key: "fggqzn" }],
  ["circle", { cx: "4", cy: "19", r: "2", key: "p3m9r0" }]
], Zd = et("blinds", C_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j_ = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
], E_ = et("box", j_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k_ = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], z_ = et("briefcase", k_);
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
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
], O_ = et("car", T_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D_ = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", key: "3zrzxg" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8", key: "g6cvee" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4", key: "1y1dii" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20", key: "xu2jvo" }]
], A_ = et("cast", D_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Wd = et("check", R_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], gs = et("chevron-down", L_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B_ = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Nb = et("chevron-left", B_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], H_ = et("chevron-right", U_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q_ = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], $l = et("chevron-up", q_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], $_ = et("circle-check", Q_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], Cb = et("circle-dot", V_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y_ = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
], G_ = et("clapperboard", Y_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
], X_ = et("cloud-drizzle", K_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
], W_ = et("cloud-fog", Z_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
], zg = et("cloud-lightning", I_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
], Hh = et("cloud-snow", F_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
], P_ = et("cloud-rain", J_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tS = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], jb = et("cloud", tS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eS = [
  ["path", { d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z", key: "44yre2" }],
  ["path", { d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61", key: "leugyv" }]
], iS = et("cloudy", eS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nS = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }],
  ["path", { d: "M2 20h20", key: "owomy5" }]
], sS = et("door-closed", nS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aS = [
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
], Eb = et("door-open", aS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lS = [
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
], rS = et("droplets", lS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oS = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
], Ma = et("fan", oS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uS = [
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
], cS = et("file-code", uS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hS = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], kb = et("flame", hS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dS = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], fS = et("gauge", dS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mS = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
], Id = et("house", mS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], vS = et("info", pS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gS = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Io = et("lightbulb", gS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], Da = et("lock-open", bS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], bs = et("lock", yS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xS = [["path", { d: "M5 12h14", key: "1ays0h" }]], zb = et("minus", xS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wS = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], _S = et("moon", wS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SS = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], Tg = et("octagon-alert", SS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MS = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Tb = et("pause", MS);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], Fd = et("pencil", NS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CS = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Na = et("play", CS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jS = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], er = et("plus", jS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ES = [
  ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15", key: "dxknvb" }],
  ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68", key: "1x7qb5" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], kS = et("power-off", ES);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zS = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], ys = et("power", zS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], OS = et("refresh-cw", TS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], Ob = et("rotate-ccw", DS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AS = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], RS = et("search", AS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LS = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], BS = et("server", LS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const US = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Db = et("shield-check", US);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HS = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], qS = et("shield", HS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QS = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], Ab = et("skip-back", QS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $S = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], Rb = et("skip-forward", $S);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VS = [
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
], YS = et("snowflake", VS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GS = [
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
], KS = et("sofa", GS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XS = [
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
], ZS = et("sparkles", XS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WS = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Ca = et("square", WS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IS = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], qo = et("sun", IS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FS = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], ja = et("thermometer", FS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JS = [
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
], PS = et("trees", JS);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Vl = et("triangle-alert", tM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
], iM = et("tv", eM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nM = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
], sM = et("utensils", nM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], lM = et("video-off", aM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rM = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], Lb = et("volume-2", rM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oM = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], Bb = et("volume-x", oM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
], Qo = et("wind", uM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Jd = et("x", cM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], dM = et("zap", hM);
function Ub(s, t, i) {
  const a = [], r = s.blocks.find((d) => d.type === "hero")?.entityIds[0], u = r ? i[r]?.attributes.current_temperature : void 0;
  if (u != null && a.push(`${Math.round(Number(u))}°`), t.length) {
    const d = t.filter((p) => i[p]?.state === "on").length;
    d && a.push(`${d} ${d === 1 ? "light" : "lights"} on`);
  }
  const c = s.blocks.flatMap((d) => d.entityIds).filter((d) => d.startsWith("lock."));
  if (c.length) {
    const d = c.filter((p) => i[p]?.state === "unlocked").length;
    a.push(d ? `${d} unlocked` : "all locked");
  }
  return a.join(" · ");
}
function Hb(s) {
  return s.blocks.flatMap((t) => t.entityIds).filter((t) => t.startsWith("light."));
}
function fM(s) {
  const t = s.toLowerCase();
  return t.includes("living") ? KS : t.includes("kitchen") ? sM : t.includes("bed") ? N_ : t.includes("office") ? z_ : t.includes("bath") ? S_ : t.includes("hall") ? Eb : t.includes("garage") ? O_ : t.includes("outdoor") || t.includes("garden") ? PS : Id;
}
function mM({ room: s, onOpen: t }) {
  const i = C.useMemo(() => Hb(s), [s]), a = C.useMemo(() => s.blocks.flatMap((g) => g.entityIds).filter((g) => g.startsWith("lock.")), [s]), r = C.useMemo(() => new Set(s.blocks.flatMap((g) => g.entityIds)).size, [s]), u = $e((g) => i.some((b) => g[b]?.state === "on")), c = $e((g) => a.some((b) => g[b]?.state === "unlocked")), d = $e((g) => Ub(s, i, g)), p = fM(s.name), v = u ? "warm" : c ? "amber" : "accent";
  return /* @__PURE__ */ m.jsxs("button", { className: `simui-roomcard${u ? " lit" : ""}`, onClick: t, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-roomcard-top", children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-roomcard-icon ${v}`, children: /* @__PURE__ */ m.jsx(p, { size: 18, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx(H_, { className: "simui-roomcard-go", size: 16 })
    ] }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-roomcard-name", children: s.name }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-roomcard-glance num", children: d || `${r} ${r === 1 ? "device" : "devices"}` })
  ] });
}
function pM(s, t) {
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
function ir() {
  const s = Bt(), { navigate: t, openSheet: i } = Ns();
  return C.useCallback(
    (a, r) => {
      pM(a, { callService: s, entityId: r, navigate: t, openSheet: i });
    },
    [s, t, i]
  );
}
function nr(s) {
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
function sr(s) {
  return s ? (t) => {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), s());
  } : void 0;
}
function vM({ children: s }) {
  return /* @__PURE__ */ m.jsx("div", { className: "simui-strip", children: s });
}
function gM({
  label: s,
  count: t,
  iconOn: i,
  iconOff: a,
  activeColor: r = "warm",
  onTap: u
}) {
  const c = t > 0, d = c ? { "--pill-accent": nr(r) } : void 0;
  return /* @__PURE__ */ m.jsxs(
    "button",
    {
      type: "button",
      className: `simui-pill-count${c ? " is-active" : ""}`,
      style: d,
      onClick: u,
      onKeyDown: sr(u),
      "aria-label": `${t} ${s}`,
      "aria-pressed": c,
      disabled: !u,
      children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-ic", children: c ? i : a }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-num", children: t }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function bM({
  label: s,
  icon: t,
  accent: i = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": nr(i) };
  return /* @__PURE__ */ m.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-nav",
      style: r,
      onClick: a,
      onKeyDown: sr(a),
      "aria-label": s,
      disabled: !a,
      children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-ic", children: t }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function yM({
  icon: s,
  label: t,
  accent: i = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": nr(i) };
  return /* @__PURE__ */ m.jsx(
    "button",
    {
      type: "button",
      className: "simui-pill-action",
      style: r,
      onClick: a,
      onKeyDown: sr(a),
      "aria-label": t,
      title: t,
      disabled: !a,
      children: /* @__PURE__ */ m.jsx("span", { className: "simui-pill-ic", children: s })
    }
  );
}
function xM({
  label: s,
  icon: t,
  accent: i = "warn",
  visible: a
}) {
  if (!a) return null;
  const r = { "--pill-accent": nr(i) };
  return /* @__PURE__ */ m.jsxs("span", { className: "simui-pill-badge", style: r, children: [
    t && /* @__PURE__ */ m.jsx("span", { className: "simui-pill-ic", children: t }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-pill-label", children: s })
  ] });
}
function wM({
  entity: s,
  primary: t,
  secondary: i,
  icon: a,
  activeColor: r = "accent",
  onTap: u
}) {
  const c = ke(s), d = !!c && c.state !== "off" && c.state !== "unavailable" && c.state !== "unknown" && c.state !== "", p = d ? { "--pill-accent": nr(r) } : void 0, v = t ?? (c ? pt(c.state) : "—"), g = i ?? (c ? P(c) : s), b = `simui-pill-status${d ? " is-active" : ""}${u ? " is-clickable" : ""}`, x = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    a && /* @__PURE__ */ m.jsx("span", { className: `simui-pill-ic${d ? " is-on" : ""}`, children: a }),
    /* @__PURE__ */ m.jsxs("span", { className: "simui-pill-status-body", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-pill-status-primary", children: v }),
      g != null && g !== "" && /* @__PURE__ */ m.jsx("span", { className: "simui-pill-status-secondary", children: g })
    ] })
  ] });
  return u ? /* @__PURE__ */ m.jsx("button", { type: "button", className: b, style: p, onClick: u, onKeyDown: sr(u), children: x }) : /* @__PURE__ */ m.jsx("div", { className: b, style: p, children: x });
}
function _M({
  entity: s,
  name: t,
  onTap: i
}) {
  const a = ke(s), r = t ?? (a ? P(a) : s), u = a && a.state !== "unavailable" && a.state !== "unknown" ? pt(a.state) : "—";
  return /* @__PURE__ */ m.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-select",
      onClick: i,
      onKeyDown: sr(i),
      "aria-label": `${r}: ${u}`,
      disabled: !i,
      children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-select-name", children: r }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-select-value", children: u }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-pill-select-caret", children: /* @__PURE__ */ m.jsx(gs, { size: 13, strokeWidth: 2 }) })
      ]
    }
  );
}
const qb = {
  lightbulb: Io,
  thermostat: ja,
  thermometer: ja,
  cast: A_,
  tv: iM,
  shield: qS,
  activity: y_,
  zap: dM,
  sparkles: ZS,
  server: BS,
  fan: Ma,
  "lock-open": Da,
  lock: bs,
  "power-off": kS,
  power: ys,
  "alert-triangle": Vl,
  "alert-octagon": Tg,
  "alert-octagon-2": Tg,
  box: E_,
  blinds: Zd,
  gauge: fS,
  home: Id
};
function Vn(s, t = 15) {
  const i = s && qb[s] || Cb;
  return /* @__PURE__ */ m.jsx(i, { size: t, strokeWidth: 2 });
}
function SM(s) {
  return qb[s] || Cb;
}
const MM = [
  { id: "lights", name: "Lights", icon: "lightbulb", accent: "warm", present: (s) => pi(s, "light") },
  { id: "climate", name: "Climate", icon: "thermostat", accent: "accent", present: (s) => pi(s, "climate") || pi(s, "humidifier") },
  { id: "media", name: "Media", icon: "cast", accent: "accent", present: (s) => pi(s, "media_player") },
  { id: "security", name: "Security", icon: "shield", accent: "up", present: (s) => pi(s, "lock") || pi(s, "alarm_control_panel") || NM(s, "door", "window", "motion") },
  { id: "sensors", name: "Sensors", icon: "activity", accent: "up", present: (s) => CM(s) || pi(s, "binary_sensor") },
  { id: "power", name: "Power", icon: "zap", accent: "warn", present: (s) => jM(s) },
  { id: "scenes", name: "Scenes", icon: "sparkles", accent: "accent", present: (s) => pi(s, "scene") || pi(s, "script") },
  { id: "server", name: "System", icon: "server", accent: "up", present: (s) => EM(s) }
];
function pi(s, t) {
  return lr(s, (i) => at(i.entity_id) === t && ae(i));
}
function NM(s, ...t) {
  return lr(s, (i) => at(i.entity_id) === "binary_sensor" && t.includes(i.attributes.device_class));
}
function CM(s) {
  return lr(s, (t) => at(t.entity_id) === "sensor" && t.attributes.unit_of_measurement != null && ae(t));
}
function jM(s) {
  return lr(s, (t) => at(t.entity_id) === "sensor" && (t.attributes.device_class === "power" || t.attributes.device_class === "energy"));
}
function EM(s) {
  return lr(s, (t) => /docker|proxmox|container|zfs|truenas|\bnas\b|\bpbs\b|server/i.test(`${t.entity_id} ${P(t)}`));
}
function Qb(s) {
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
    visibleWhen: kM(t, (x) => at(x.entity_id) === "lock", "unlocked")
  });
  const r = Object.values(t).find((x) => at(x.entity_id) === "weather" && ae(x));
  r && a.push({ kind: "status", entityId: r.entity_id, stateContent: ["state"] }), a.length && (i.statusStrip = a);
  const u = Object.values(t).find(
    (x) => at(x.entity_id) === "cover" && /garage|door|gate/i.test(P(x))
  );
  u && i.blocks.push({
    id: zt("home-alert"),
    type: "hero",
    title: P(u),
    entityIds: [u.entity_id],
    span: "full",
    visibleWhen: { entity: u.entity_id, state: "open" }
  });
  const c = Object.values(t).filter((x) => (at(x.entity_id) === "scene" || at(x.entity_id) === "script") && ae(x)).map((x) => x.entity_id);
  c.length && i.blocks.push({
    id: zt("home-scenes"),
    type: "group",
    title: "Scenes",
    axis: "function",
    entityIds: c.slice(0, 8),
    span: "full"
  });
  const d = MM.filter((x) => x.present(t));
  i.blocks.push({
    id: zt("home-launcher"),
    type: "group",
    title: "Everything",
    axis: "none",
    entityIds: d.map((x) => `category.${x.id}`),
    span: "full"
  });
  const p = [], v = (x) => {
    const S = Object.values(t).find(x);
    S && p.push(S.entity_id);
  };
  v((x) => at(x.entity_id) === "sensor" && x.attributes.device_class === "power" && /house|home|total|load|consumption/i.test(P(x))), v((x) => at(x.entity_id) === "sensor" && /sol(ar)?|pv|generation/i.test(P(x)) && x.attributes.unit_of_measurement != null), v((x) => at(x.entity_id) === "sensor" && x.attributes.device_class === "battery");
  const g = Object.values(t).find((x) => /washer|dryer|dishwasher|laundry/i.test(P(x)) && ae(x));
  g && p.push(g.entity_id), p.length && i.blocks.push({
    id: zt("home-live"),
    type: "group",
    title: "Live status",
    axis: "function",
    entityIds: p,
    span: 2
  });
  const b = Object.values(t).find((x) => at(x.entity_id) === "alarm_control_panel" && ae(x));
  if (b)
    i.blocks.push({
      id: zt("home-security"),
      type: "hero",
      title: P(b),
      entityIds: [b.entity_id],
      span: "full"
    });
  else {
    const x = Object.values(t).filter((S) => at(S.entity_id) === "lock" && ae(S)).map((S) => S.entity_id);
    x.length && i.blocks.push({
      id: zt("home-locks"),
      type: "list",
      title: "Security & doors",
      axis: "none",
      entityIds: x,
      span: 1
    });
  }
  return i;
}
function kM(s, t, i) {
  const a = Object.values(s).find(t);
  return { entity: a ? a.entity_id : "unknown.none", state: i };
}
const zM = 6;
function Og(s, t) {
  const i = `${s} ${t}`.toLowerCase();
  return /group|all\b|_lights\b|\blights$/.test(i);
}
function Dg(s) {
  const t = s.filter((a) => Og(a.id, a.name)), i = s.filter((a) => !Og(a.id, a.name));
  return [...t, ...i].map((a) => a.id);
}
function TM(s) {
  const { states: t, areas: i, registry: a } = s, r = Object.values(t).filter(
    (c) => c.entity_id.startsWith("light.") && tr(c.entity_id, c, a)
  ), u = { blocks: [] };
  if (!r.length) return u;
  if (u.statusStrip = [
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
  ], r.length <= zM) {
    const c = Dg(r.map((d) => ({ id: d.entity_id, name: P(d) })));
    return u.blocks.push(Ag("Lights", c, "full")), u;
  }
  for (const [c, d] of Ib(r, i)) {
    const p = Dg(d.map((v) => ({ id: v.entity_id, name: P(v) })));
    p.length && u.blocks.push(Ag(c, p, 2));
  }
  return u;
}
function Ag(s, t, i) {
  return { id: zt("lights"), type: "group", title: s, axis: "room", tile: "slider", entityIds: t, span: i };
}
function OM(s) {
  return s.find((i) => /master|whole|home|main|house|hvac/i.test(P(i))) ?? s[0];
}
function DM(s, t, i) {
  const a = [], r = Object.values(s).filter(
    (u) => Wb(u) && u.attributes.device_class === "temperature" && tr(u.entity_id, u, i)
  ).slice(0, 4);
  for (const u of r)
    a.push({ entity: u.entity_id, name: $n(u), fill: "line", strokeWidth: 2 });
  if (!a.length)
    for (const u of t.slice(0, 3))
      a.push({ entity: u.entity_id, name: $n(u), fill: "line", strokeWidth: 2 });
  return a;
}
function AM(s) {
  const { states: t, registry: i } = s, a = Qn(t, "climate", i).filter(ae), r = Qn(t, "humidifier", i).filter(ae), u = { blocks: [] };
  if (!a.length && !r.length) return u;
  if (u.statusStrip = [
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
    const d = OM(a);
    u.blocks.push({
      id: zt("climate-hero"),
      type: "hero",
      title: $n(d),
      entityIds: [d.entity_id],
      span: "full"
    });
    const p = a.filter((v) => v.entity_id !== d.entity_id);
    p.length && u.blocks.push({
      id: zt("climate-zones"),
      type: "group",
      title: "Zones",
      axis: "function",
      entityIds: p.map((v) => v.entity_id),
      span: 2
    });
  }
  r.length && u.blocks.push({
    id: zt("climate-humidifier"),
    type: "group",
    title: "Humidity",
    axis: "function",
    entityIds: r.map((d) => d.entity_id),
    span: 1
  });
  const c = DM(t, a, i);
  if (c.length) {
    const d = {
      title: "Temperature trend",
      window: { value: 72, unit: "h" },
      bucket: "hour",
      reducer: "mean",
      backend: "history",
      header: { showCurrent: !0, colorize: !0 },
      axes: [{ id: "temp" }],
      series: c.map((p) => ({ ...p, axisId: "temp" })),
      // Comfort band (~19–24°C) — value-banded coloring per FRAMEWORK.md §5.
      thresholds: [
        { value: 19, color: "var(--up)" },
        { value: 24, color: "var(--warn)" }
      ]
    };
    u.blocks.push({
      id: zt("climate-chart"),
      type: "chart",
      title: "Temperature trend",
      entityIds: c.map((p) => p.entity),
      span: "full",
      chart: d
    });
  }
  return u;
}
const RM = 8, $b = [
  { key: "temperature", title: "Temperature", classes: ["temperature"], units: ["°C", "°F"] },
  { key: "humidity", title: "Humidity", classes: ["humidity"], units: ["%"] },
  { key: "air", title: "Air quality", classes: ["pm25", "pm10", "pm1", "co2", "carbon_dioxide", "volatile_organic_compounds", "aqi", "nitrogen_dioxide", "ozone"] },
  { key: "pressure", title: "Pressure", classes: ["pressure", "atmospheric_pressure"] },
  { key: "illuminance", title: "Light level", classes: ["illuminance"] },
  { key: "battery", title: "Battery", classes: ["battery"] },
  { key: "signal", title: "Signal", classes: ["signal_strength"] }
];
function LM(s) {
  const t = s.attributes.device_class, i = s.attributes.unit_of_measurement;
  for (const a of $b) {
    if (t && a.classes.includes(t)) return { key: a.key, title: a.title };
    if (!t && i && a.units?.includes(i)) return { key: a.key, title: a.title };
  }
}
function BM(s) {
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
function UM(s) {
  const { states: t, areas: i, registry: a } = s, r = (g) => tr(g.entity_id, g, a), u = Object.values(t).filter((g) => Wb(g) && r(g)), c = Object.values(t).filter(
    (g) => at(g.entity_id) === "binary_sensor" && ae(g) && r(g)
  ), d = { blocks: [] };
  if (!u.length && !c.length) return d;
  d.statusStrip = [
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
  const p = /* @__PURE__ */ new Map(), v = [];
  for (const g of u) {
    const b = LM(g);
    if (!b) {
      v.push(g);
      continue;
    }
    let x = p.get(b.key);
    x || (x = { title: b.title, ents: [] }, p.set(b.key, x)), x.ents.push(g);
  }
  if (u.length >= RM) {
    const g = ["temperature", "humidity", "air"];
    for (const b of g) {
      const x = p.get(b);
      !x || x.ents.length < 2 || d.blocks.push(HM(x.title, b, x.ents.slice(0, 6)));
    }
  }
  for (const g of $b) {
    const b = p.get(g.key);
    !b || !b.ents.length || d.blocks.push({
      id: zt(`sensors-${g.key}`),
      type: "group",
      title: b.title,
      axis: "metrics",
      // → MetricSpark data-viz wall (Phase 2, I6)
      entityIds: b.ents.map((x) => x.entity_id),
      span: 2
    });
  }
  if (v.length && d.blocks.push({
    id: zt("sensors-misc"),
    type: "list",
    title: "Other measurements",
    axis: "none",
    entityIds: v.map((g) => g.entity_id),
    span: 1
  }), c.length)
    if (c.length <= 6)
      d.blocks.push(Rg("Status", c.map((g) => g.entity_id)));
    else
      for (const [g, b] of Ib(c, i))
        d.blocks.push(Rg(g, b.map((x) => x.entity_id)));
  return d;
}
function HM(s, t, i) {
  const a = BM(t), r = i.map((c, d) => ({
    entity: c.entity_id,
    name: $n(c),
    fill: "line",
    strokeWidth: 2,
    // First series gets the quantity's identity color; rest use the auto-palette.
    color: d === 0 ? a : void 0,
    axisId: "main"
  })), u = {
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
    id: zt(`sensors-overview-${t}`),
    type: "chart",
    title: s,
    entityIds: i.map((c) => c.entity_id),
    span: "full",
    chart: u
  };
}
function Rg(s, t) {
  return {
    id: zt("sensors-binary"),
    type: "list",
    title: s,
    axis: "room",
    entityIds: t,
    span: 1
  };
}
const qM = /* @__PURE__ */ new Set(["W", "kW"]), QM = /* @__PURE__ */ new Set(["Wh", "kWh", "MWh"]);
function $M(s) {
  if (at(s.entity_id) !== "sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class, i = s.attributes.unit_of_measurement;
  return t === "power" || t === "energy" || !!i && (qM.has(i) || QM.has(i));
}
function kl(s, t) {
  return t.test(`${s.entity_id} ${P(s)}`);
}
function VM(s) {
  return kl(s, /sol(ar)?|pv|generation|inverter/i) ? "solar" : kl(s, /batt(ery)?|soc|state_of_charge/i) ? "battery" : kl(s, /grid|import|export|mains|utility/i) ? "grid" : kl(s, /house|home|total|load|consumption|whole/i) ? "load" : "circuit";
}
function YM(s) {
  const { states: t, registry: i } = s, a = (N) => tr(N.entity_id, N, i), r = Object.values(t).filter((N) => $M(N) && a(N)), u = { blocks: [] };
  if (!r.length) return u;
  const c = /* @__PURE__ */ new Map();
  for (const N of r) {
    const E = VM(N);
    let T = c.get(E);
    T || (T = [], c.set(E, T)), T.push(N);
  }
  const d = c.get("solar") ?? [], p = c.get("battery") ?? [], v = c.get("grid") ?? [], g = c.get("load") ?? [], b = c.get("circuit") ?? [], x = [];
  g.length && x.push({ kind: "status", entityId: g[0].entity_id, stateContent: ["state"] }), d.length && x.push({ kind: "status", entityId: d[0].entity_id, stateContent: ["state"] }), p.length && x.push({ kind: "status", entityId: p[0].entity_id, stateContent: ["state"] }), x.length && (u.statusStrip = x);
  const S = [];
  d.length && S.push({ entity: d[0].entity_id, name: $n(d[0]), fill: "area", color: "var(--up)", opacity: 0.25, strokeWidth: 2, axisId: "power" });
  const w = g[0] ?? v[0];
  if (w && S.push({ entity: w.entity_id, name: $n(w), fill: "line", color: "var(--warn)", strokeWidth: 2, axisId: "power" }), p.length && S.push({ entity: p[0].entity_id, name: $n(p[0]), fill: "line", color: "var(--accent)", strokeWidth: 1, axisId: "battery" }), S.length) {
    const N = [{ id: "power" }];
    p.length && N.push({ id: "battery", min: 0, max: 100, opposite: !0 });
    const E = {
      title: "Power flow",
      window: { value: 24, unit: "h" },
      bucket: "hour",
      reducer: "mean",
      backend: "history",
      header: { showCurrent: !0, colorize: !0 },
      axes: N,
      series: S
    };
    u.blocks.push({
      id: zt("power-flow"),
      type: "chart",
      title: "Power flow",
      entityIds: S.map((T) => T.entity),
      span: "full",
      chart: E
    });
  }
  b.length && u.blocks.push({
    id: zt("power-circuits"),
    type: "group",
    title: "Circuits",
    axis: "metrics",
    // → per-circuit MetricSpark wall (Phase 2, I7)
    entityIds: b.map((N) => N.entity_id),
    span: 2
  });
  const M = Object.values(t).filter(
    (N) => (at(N.entity_id) === "switch" || at(N.entity_id) === "input_boolean") && ae(N) && a(N) && (N.attributes.device_class === "outlet" || kl(N, /outlet|plug|gpo|socket/i))
  );
  return M.length && u.blocks.push({
    id: zt("power-outlets"),
    type: "group",
    title: "Outlets",
    axis: "function",
    entityIds: M.map((N) => N.entity_id),
    span: 1
  }), u;
}
function xs({
  value: s,
  since: t,
  tone: i = "muted"
}) {
  const a = t ? ru(t) : "";
  return /* @__PURE__ */ m.jsxs("span", { className: `simui-state${i !== "muted" ? ` ${i}` : ""}`, children: [
    s,
    a && /* @__PURE__ */ m.jsxs("span", { className: "simui-since", children: [
      " · ",
      a
    ] })
  ] });
}
const Ai = 8;
function Fo({ items: s, x: t, y: i, onClose: a, header: r }) {
  const u = C.useRef(null), [c, d] = C.useState({ x: t, y: i }), [p, v] = C.useState(-1), g = s.map((w, M) => w.disabled ? -1 : M).filter((w) => w >= 0);
  C.useLayoutEffect(() => {
    const w = u.current;
    if (!w) return;
    const { width: M, height: N } = w.getBoundingClientRect(), E = window.innerWidth, T = window.innerHeight;
    let R = t, D = i;
    R + M > E - Ai && (R = Math.max(Ai, E - M - Ai)), D + N > T - Ai && (D = Math.max(Ai, T - N - Ai)), R < Ai && (R = Ai), D < Ai && (D = Ai), d({ x: R, y: D });
  }, [t, i, s.length]), C.useEffect(() => {
    u.current?.focus();
  }, []), C.useEffect(() => {
    const w = (N) => {
      u.current && !u.current.contains(N.target) && a();
    }, M = () => a();
    return window.addEventListener("mousedown", w, !0), window.addEventListener("touchstart", w, !0), window.addEventListener("contextmenu", w, !0), window.addEventListener("scroll", M, !0), window.addEventListener("resize", a), window.addEventListener("blur", a), () => {
      window.removeEventListener("mousedown", w, !0), window.removeEventListener("touchstart", w, !0), window.removeEventListener("contextmenu", w, !0), window.removeEventListener("scroll", M, !0), window.removeEventListener("resize", a), window.removeEventListener("blur", a);
    };
  }, [a]);
  const b = C.useCallback(
    (w) => {
      w.disabled || (a(), w.onClick());
    },
    [a]
  ), x = C.useCallback(
    (w) => {
      g.length !== 0 && v((M) => {
        const N = g.indexOf(M);
        if (N === -1) return w === 1 ? g[0] : g[g.length - 1];
        const E = (N + w + g.length) % g.length;
        return g[E];
      });
    },
    [g]
  ), S = (w) => {
    switch (w.key) {
      case "Escape":
        w.preventDefault(), a();
        break;
      case "ArrowDown":
        w.preventDefault(), x(1);
        break;
      case "ArrowUp":
        w.preventDefault(), x(-1);
        break;
      case "Home":
        w.preventDefault(), g.length && v(g[0]);
        break;
      case "End":
        w.preventDefault(), g.length && v(g[g.length - 1]);
        break;
      case "Enter":
      case " ":
        w.preventDefault(), p >= 0 && s[p] && b(s[p]);
        break;
      case "Tab":
        w.preventDefault(), x(w.shiftKey ? -1 : 1);
        break;
    }
  };
  return Hn.createPortal(
    // Wrap in `simui-root` so the scoped CSS applies even though we portal to
    // <body> (outside the app's React tree) — matching Sheet.tsx's pattern.
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        ref: u,
        className: "simui-root simui-ctxmenu",
        role: "menu",
        tabIndex: -1,
        "aria-orientation": "vertical",
        style: { left: c.x, top: c.y },
        onKeyDown: S,
        onContextMenu: (w) => w.preventDefault(),
        children: [
          r && /* @__PURE__ */ m.jsx("div", { className: "simui-ctxhead", onKeyDown: (w) => w.stopPropagation(), children: r }),
          r && s.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-ctxsep", role: "separator" }),
          s.map((w, M) => /* @__PURE__ */ m.jsxs("div", { role: "presentation", className: "simui-ctxgroup", children: [
            w.separator && M > 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-ctxsep", role: "separator" }),
            /* @__PURE__ */ m.jsxs(
              "button",
              {
                type: "button",
                role: "menuitem",
                className: [
                  "simui-ctxitem",
                  w.danger ? "danger" : "",
                  p === M ? "is-active" : ""
                ].filter(Boolean).join(" "),
                tabIndex: -1,
                disabled: w.disabled,
                "aria-disabled": w.disabled || void 0,
                onMouseEnter: () => !w.disabled && v(M),
                onClick: () => b(w),
                children: [
                  w.icon != null && /* @__PURE__ */ m.jsx("span", { className: "simui-ctxic", children: w.icon }),
                  /* @__PURE__ */ m.jsx("span", { className: "simui-ctxlabel", children: w.label })
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
const Lg = { open: !1, x: 0, y: 0 }, GM = 480, Bg = 10;
function Pd() {
  const [s, t] = C.useState(Lg), i = C.useRef(null), a = C.useRef(null), r = C.useCallback(() => {
    i.current != null && (clearTimeout(i.current), i.current = null), a.current = null;
  }, []), u = C.useCallback(() => t(Lg), []), c = C.useCallback((b, x) => t({ open: !0, x: b, y: x }), []), d = C.useCallback(
    (b) => {
      b.preventDefault(), b.stopPropagation(), c(b.clientX, b.clientY);
    },
    [c]
  ), p = C.useCallback(
    (b) => {
      const x = b.touches[0];
      x && (a.current = { x: x.clientX, y: x.clientY }, r(), i.current = setTimeout(() => {
        i.current = null, a.current && c(a.current.x, a.current.y);
      }, GM));
    },
    [r, c]
  ), v = C.useCallback(
    (b) => {
      const x = b.touches[0];
      if (!x || !a.current) return;
      const S = Math.abs(x.clientX - a.current.x), w = Math.abs(x.clientY - a.current.y);
      (S > Bg || w > Bg) && r();
    },
    [r]
  );
  C.useEffect(() => r, [r]);
  const g = {
    onContextMenu: d,
    onTouchStart: p,
    onTouchMove: v,
    onTouchEnd: r,
    onTouchCancel: r
  };
  return {
    open: s.open,
    menuProps: g,
    onContextMenu: d,
    onTouchStart: p,
    position: s.open ? { x: s.x, y: s.y } : null,
    openAt: c,
    close: u
  };
}
function ar({ entity: s, features: t }) {
  return t.length ? /* @__PURE__ */ m.jsx("div", { className: "simui-feats", children: t.map((i, a) => /* @__PURE__ */ m.jsx(KM, { entity: s, feature: i }, `${i.type}-${a}`)) }) : null;
}
function KM({ entity: s, feature: t }) {
  switch (t.type) {
    case "cover-open-close":
      return /* @__PURE__ */ m.jsx(XM, { entity: s });
    case "climate-hvac-modes":
      return /* @__PURE__ */ m.jsx(WM, { entity: s, modes: t.modes, style: t.style });
    case "climate-fan-modes":
      return /* @__PURE__ */ m.jsx(IM, { entity: s });
    case "target-temperature":
      return /* @__PURE__ */ m.jsx(FM, { entity: s });
    case "fan-speed":
      return /* @__PURE__ */ m.jsx(JM, { entity: s });
    case "fan-oscillate":
      return /* @__PURE__ */ m.jsx(PM, { entity: s });
    case "lock-commands":
      return /* @__PURE__ */ m.jsx(tN, { entity: s });
    case "alarm-modes":
      return /* @__PURE__ */ m.jsx(nN, { entity: s, modes: t.modes });
  }
}
const jo = { OPEN: 1, CLOSE: 2 };
function XM({ entity: s }) {
  const t = Bt(), i = s.attributes.supported_features ?? 0, a = s.state === "opening" || s.state === "closing", r = (u) => {
    t("cover", u, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-controls", children: [
    (i & jo.OPEN) === jo.OPEN && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => r("open_cover"), children: /* @__PURE__ */ m.jsx($l, { size: 15, strokeWidth: 2 }) }),
    /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", disabled: !a, onClick: () => r("stop_cover"), children: /* @__PURE__ */ m.jsx(Ca, { size: 12, strokeWidth: 2 }) }),
    (i & jo.CLOSE) === jo.CLOSE && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => r("close_cover"), children: /* @__PURE__ */ m.jsx(gs, { size: 15, strokeWidth: 2 }) })
  ] });
}
const ZM = {
  heat: kb,
  cool: YS,
  heat_cool: qo,
  auto: qo,
  dry: qo,
  fan_only: Ma,
  off: ys
};
function WM({
  entity: s,
  modes: t,
  style: i
}) {
  const a = Bt(), r = (u) => {
    a("climate", "set_hvac_mode", { hvac_mode: u }, { entity_id: s.entity_id });
  };
  return i === "dropdown" ? /* @__PURE__ */ m.jsx(
    Vb,
    {
      value: s.state,
      options: t,
      ariaLabel: "HVAC mode",
      onSelect: r
    }
  ) : /* @__PURE__ */ m.jsx("div", { className: "simui-seg", role: "group", "aria-label": "HVAC mode", children: t.map((u) => {
    const c = ZM[u] ?? ys, d = s.state === u;
    return /* @__PURE__ */ m.jsx(
      "button",
      {
        className: `simui-segbtn${d ? " is-active" : ""}`,
        "aria-pressed": d,
        "aria-label": pt(u),
        title: pt(u),
        onClick: () => r(u),
        children: i === "icons" ? /* @__PURE__ */ m.jsx(c, { size: 14, strokeWidth: 2 }) : pt(u)
      },
      u
    );
  }) });
}
function IM({ entity: s }) {
  const t = Bt(), i = s.attributes.fan_modes ?? [], a = s.attributes.fan_mode;
  return i.length ? /* @__PURE__ */ m.jsx(
    Vb,
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
function FM({ entity: s }) {
  const t = Bt(), i = s.attributes, a = i.temperature, r = i.target_temp_step ?? 0.5, u = i.min_temp ?? 7, c = i.max_temp ?? 35;
  if (a == null) return null;
  const d = (p) => {
    const v = ms(Math.round((a + p) / r) * r, u, c);
    t("climate", "set_temperature", { temperature: v }, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-step", children: [
    /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => d(-r), children: /* @__PURE__ */ m.jsx(zb, { size: 14, strokeWidth: 2.5 }) }),
    /* @__PURE__ */ m.jsxs("span", { className: "simui-target", children: [
      sN(a),
      "°"
    ] }),
    /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => d(r), children: /* @__PURE__ */ m.jsx(er, { size: 14, strokeWidth: 2.5 }) })
  ] });
}
function JM({ entity: s }) {
  const t = Bt(), i = s.attributes.percentage ?? 0, a = s.attributes.percentage_step, r = a && a > 0 ? a : 1, u = {
    background: `linear-gradient(to right, var(--accent) ${i}%, var(--faint) ${i}%)`
  };
  return /* @__PURE__ */ m.jsx(
    "input",
    {
      className: "simui-slider",
      type: "range",
      min: 0,
      max: 100,
      step: r,
      value: i,
      "aria-label": "Fan speed",
      style: u,
      onChange: (c) => {
        t("fan", "set_percentage", { percentage: Number(c.target.value) }, { entity_id: s.entity_id });
      }
    }
  );
}
function PM({ entity: s }) {
  const t = Bt(), i = !!s.attributes.oscillating;
  return /* @__PURE__ */ m.jsxs(
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
        /* @__PURE__ */ m.jsx(Ma, { size: 14, strokeWidth: 2 }),
        /* @__PURE__ */ m.jsx("span", { children: "Oscillate" })
      ]
    }
  );
}
function tN({ entity: s }) {
  const t = Bt(), i = s.state === "locked", a = s.state === "locking" || s.state === "unlocking", r = (u) => {
    t("lock", u, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-seg", role: "group", "aria-label": "Lock", children: [
    /* @__PURE__ */ m.jsxs(
      "button",
      {
        className: `simui-segbtn${i ? " is-active" : ""}`,
        "aria-pressed": i,
        disabled: a,
        onClick: () => r("lock"),
        children: [
          /* @__PURE__ */ m.jsx(bs, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ m.jsx("span", { children: "Lock" })
        ]
      }
    ),
    /* @__PURE__ */ m.jsxs(
      "button",
      {
        className: `simui-segbtn${i ? "" : " is-active"}`,
        "aria-pressed": !i,
        disabled: a,
        onClick: () => r("unlock"),
        children: [
          /* @__PURE__ */ m.jsx(Da, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ m.jsx("span", { children: "Unlock" })
        ]
      }
    )
  ] });
}
const eN = {
  disarmed: "alarm_disarm",
  armed_home: "alarm_arm_home",
  armed_away: "alarm_arm_away",
  armed_night: "alarm_arm_night",
  armed_vacation: "alarm_arm_vacation",
  armed_custom_bypass: "alarm_arm_custom_bypass"
}, iN = {
  disarmed: "Disarm",
  armed_home: "Home",
  armed_away: "Away",
  armed_night: "Night",
  armed_vacation: "Vacation",
  armed_custom_bypass: "Custom"
};
function nN({ entity: s, modes: t }) {
  const i = Bt();
  return /* @__PURE__ */ m.jsx("div", { className: "simui-seg", role: "group", "aria-label": "Alarm mode", children: t.map((a) => {
    const r = eN[a];
    if (!r) return null;
    const u = s.state === a;
    return /* @__PURE__ */ m.jsx(
      "button",
      {
        className: `simui-segbtn${u ? " is-active" : ""}`,
        "aria-pressed": u,
        onClick: () => {
          i("alarm_control_panel", r, void 0, { entity_id: s.entity_id });
        },
        children: iN[a] ?? pt(a)
      },
      a
    );
  }) });
}
function Vb({
  value: s,
  options: t,
  ariaLabel: i,
  onSelect: a
}) {
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-fsel-wrap", children: [
    /* @__PURE__ */ m.jsx(
      "select",
      {
        className: "simui-fsel",
        "aria-label": i,
        value: s,
        onChange: (r) => a(r.target.value),
        children: t.map((r) => /* @__PURE__ */ m.jsx("option", { value: r, children: pt(r) }, r))
      }
    ),
    /* @__PURE__ */ m.jsx(gs, { className: "simui-fsel-caret", size: 13, strokeWidth: 2 })
  ] });
}
function sN(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const aN = /* @__PURE__ */ new Set(["light", "climate", "cover", "fan", "lock", "alarm_control_panel"]);
function Yl(s) {
  return aN.has(at(s));
}
function Gl({ entityId: s, compact: t }) {
  const i = ke(s);
  if (!i) return null;
  if (at(s) === "light") return /* @__PURE__ */ m.jsx(oN, { entity: i, compact: t });
  const a = lN(at(s), i);
  return a.length ? /* @__PURE__ */ m.jsx("div", { className: `simui-qc${t ? " compact" : ""}`, children: /* @__PURE__ */ m.jsx(ar, { entity: i, features: a }) }) : null;
}
function lN(s, t) {
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
const Ug = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]), rN = [
  { name: "Red", hs: [4, 86] },
  { name: "Orange", hs: [28, 88] },
  { name: "Amber", hs: [44, 90] },
  { name: "Green", hs: [128, 70] },
  { name: "Teal", hs: [172, 68] },
  { name: "Blue", hs: [218, 82] },
  { name: "Violet", hs: [268, 68] },
  { name: "Pink", hs: [322, 72] }
];
function oN({ entity: s, compact: t }) {
  const i = Bt(), a = s.entity_id, r = s.attributes, u = s.state === "on", c = r.brightness ?? 0, d = u ? Math.max(1, Math.round(c / 255 * 100)) : 0, p = r.supported_color_modes ?? [], v = r.color_mode, g = (D) => r[D] != null, b = p.some((D) => Ug.has(D)) || v != null && Ug.has(v) || g("rgb_color") || g("hs_color") || g("rgbw_color") || g("rgbww_color") || g("xy_color"), x = p.includes("color_temp") || v === "color_temp" || g("color_temp") || g("color_temp_kelvin"), S = r.min_color_temp_kelvin ?? 2200, w = r.max_color_temp_kelvin ?? 6500, M = r.color_temp_kelvin ?? Math.round((S + w) / 2), N = (D) => {
    i("light", "turn_on", { brightness_pct: D }, { entity_id: a });
  }, E = (D) => {
    i("light", "turn_on", { color_temp_kelvin: D }, { entity_id: a });
  }, T = (D) => {
    i("light", "turn_on", { hs_color: D }, { entity_id: a });
  }, R = {
    background: `linear-gradient(to right, var(--warm) ${d}%, var(--faint) ${d}%)`
  };
  return /* @__PURE__ */ m.jsxs("div", { className: `simui-qc light${t ? " compact" : ""}`, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-qc-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-val num", children: u ? `${d}%` : "Off" })
    ] }),
    /* @__PURE__ */ m.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: d,
        "aria-label": "Brightness",
        style: R,
        onChange: (D) => N(Number(D.target.value))
      }
    ),
    x && /* @__PURE__ */ m.jsx(
      "input",
      {
        className: "simui-temp-ribbon",
        type: "range",
        min: S,
        max: w,
        step: 50,
        value: M,
        "aria-label": "Colour temperature",
        onChange: (D) => E(Number(D.target.value))
      }
    ),
    b && /* @__PURE__ */ m.jsx("div", { className: "simui-qc-swatches", children: rN.map((D) => /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: "simui-qc-swatch",
        "aria-label": D.name,
        title: D.name,
        style: { background: `hsl(${D.hs[0]} ${D.hs[1]}% 56%)` },
        onClick: () => T(D.hs)
      },
      D.name
    )) })
  ] });
}
const uN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), cN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), hN = /* @__PURE__ */ new Set(["moisture"]);
function Yb(s) {
  const t = at(s.entity_id), i = s.attributes.device_class;
  if (t === "lock") {
    const r = s.state === "locked", u = s.state === "locking" || s.state === "unlocking";
    return {
      word: u ? pt(s.state) : r ? "Locked" : "Unlocked",
      tone: r ? "secure" : "warn",
      icon: r ? bs : Da,
      attention: !r && !u
    };
  }
  if (t === "cover") {
    const r = s.state === "closed";
    return {
      word: r ? "Closed" : pt(s.state),
      tone: r ? "secure" : "warn",
      icon: Zd,
      attention: !r && s.state !== "unavailable"
    };
  }
  if (t === "alarm_control_panel") {
    const r = s.state === "triggered", u = s.state.startsWith("armed");
    return {
      word: r ? "Triggered" : pt(s.state),
      tone: r ? "alert" : u ? "secure" : "idle",
      icon: r ? Vl : u ? Db : w_,
      attention: r
    };
  }
  const a = s.state === "on";
  return i && cN.has(i) ? {
    word: a ? "Detected" : "Clear",
    tone: a ? "alert" : "secure",
    icon: kb,
    attention: a
  } : i && hN.has(i) ? {
    word: a ? "Leak" : "Dry",
    tone: a ? "alert" : "secure",
    icon: rS,
    attention: a
  } : i && uN.has(i) ? {
    word: a ? "Open" : "Closed",
    tone: a ? "warn" : "secure",
    icon: a ? Eb : sS,
    attention: a
  } : i === "motion" || i === "occupancy" || i === "presence" ? {
    word: a ? "Motion" : "Clear",
    tone: a ? "warn" : "idle",
    icon: Qo,
    attention: !1
    // motion is informational, not an alert
  } : {
    word: a ? "On" : "Clear",
    tone: a ? "warn" : "secure",
    icon: a ? Vl : $_,
    attention: !1
  };
}
function Gb({ entity: s, name: t, menuItems: i }) {
  const a = ke(s), r = Pd(), u = ir();
  if (!a) return null;
  const c = t ?? P(a), d = a.state === "unavailable" || a.state === "unknown", p = [
    { label: "Details", onClick: () => u({ action: "more-info" }, s) },
    ...i ?? []
  ];
  if (d)
    return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsxs(
        "div",
        {
          className: "simui-statusboard tone-idle is-unavailable",
          role: "group",
          "aria-label": `${c}: Unavailable`,
          ...r.menuProps,
          children: [
            /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(Vl, { size: 22, strokeWidth: 2 }) }),
            /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-word", children: "Unavailable" }),
            /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-name", title: c, children: c }),
            /* @__PURE__ */ m.jsx(xs, { value: "", since: a.last_changed, tone: "muted" })
          ]
        }
      ),
      r.open && r.position && /* @__PURE__ */ m.jsx(
        Fo,
        {
          items: p,
          x: r.position.x,
          y: r.position.y,
          onClose: r.close,
          header: Yl(s) ? /* @__PURE__ */ m.jsx(Gl, { entityId: s, compact: !0 }) : void 0
        }
      )
    ] });
  const v = Yb(a), g = v.icon;
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: `simui-statusboard tone-${v.tone}${v.attention ? " is-attn" : ""}`,
        role: "group",
        "aria-label": `${c}: ${v.word}`,
        ...r.menuProps,
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(g, { size: 22, strokeWidth: 2 }) }),
          /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-word", children: v.word }),
          /* @__PURE__ */ m.jsx("span", { className: "simui-statusboard-name", title: c, children: c }),
          /* @__PURE__ */ m.jsx(xs, { value: "", since: a.last_changed, tone: v.tone === "alert" || v.tone === "warn" ? "warn" : "muted" })
        ]
      }
    ),
    r.open && r.position && /* @__PURE__ */ m.jsx(
      Fo,
      {
        items: p,
        x: r.position.x,
        y: r.position.y,
        onClose: r.close,
        header: Yl(s) ? /* @__PURE__ */ m.jsx(Gl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function dN({ entities: s, clearLabel: t }) {
  const i = $e((u) => Kb(u, s).join(",")), a = C.useMemo(() => i ? i.split(",") : [], [i]), r = s.length;
  if (a.length === 0) {
    const u = t ? t(r) : `All ${r} clear`;
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-attn is-clear", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-attn-ic", children: /* @__PURE__ */ m.jsx(Db, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-attn-clear", children: u })
    ] });
  }
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-attn is-active", role: "alert", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-attn-head", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-attn-ic warn", children: /* @__PURE__ */ m.jsx(Vl, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-attn-title", children: a.length === 1 ? "1 needs attention" : `${a.length} need attention` })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-attn-tiles", children: a.map((u) => /* @__PURE__ */ m.jsx(Gb, { entity: u }, u)) })
  ] });
}
function Kb(s, t) {
  const i = [];
  for (const a of t) {
    const r = s[a];
    !r || r.state === "unavailable" || r.state === "unknown" || Yb(r).attention && i.push(a);
  }
  return i;
}
const fN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), mN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), pN = /* @__PURE__ */ new Set(["moisture"]);
function vN(s) {
  if (at(s.entity_id) !== "binary_sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class;
  return !!t && (fN.has(t) || mN.has(t) || pN.has(t));
}
function gN(s) {
  if (!ae(s)) return !1;
  const t = s.attributes.device_class, i = `${s.entity_id} ${s.attributes.friendly_name ?? ""}`.toLowerCase();
  return t === "garage" || t === "door" || /garage|gate|front|back|exterior|entry/.test(i);
}
function bN(s) {
  const { states: t, registry: i } = s, a = Qn(t, "lock", i).filter(ae), r = Qn(t, "alarm_control_panel", i).filter(ae), u = Qn(t, "cover", i).filter(gN), c = Object.values(t).filter(
    (M) => vN(M) && tr(M.entity_id, M, i)
  ), d = [...r, ...a, ...u, ...c], p = { blocks: [] };
  if (!d.length) return p;
  const v = d.map((M) => M.entity_id), g = Kb(t, v), b = new Set(g), x = [];
  r.length && x.push({
    kind: "conditional",
    icon: "alert-triangle",
    label: "Triggered",
    accent: "down",
    visibleWhen: { entity: r[0].entity_id, state: "triggered" }
  }), a.length && x.push({
    kind: "action",
    icon: "lock",
    label: "Lock all",
    accent: "green",
    action: { action: "call-service", service: "lock.lock", target: { entity_id: a.map((M) => M.entity_id) } }
  }), x.length && (p.statusStrip = x), p.blocks.push({
    id: zt("security-attention"),
    type: "attention",
    entityIds: v,
    span: "full"
  });
  for (const M of r)
    p.blocks.push({
      id: zt("security-alarm"),
      type: "hero",
      title: M.attributes.friendly_name ?? M.entity_id,
      entityIds: [M.entity_id],
      span: "full"
    });
  const w = [...a, ...u, ...c].map((M) => M.entity_id).sort((M, N) => (b.has(N) ? 1 : 0) - (b.has(M) ? 1 : 0));
  return w.length && p.blocks.push(yN("Doors & locks", w)), p;
}
function yN(s, t) {
  return {
    id: zt("security-board"),
    type: "group",
    title: s,
    tile: "statusboard",
    // → StatusBoardTile grid (Phase 2, I5)
    entityIds: t,
    span: "full"
  };
}
function Xb(s) {
  return `${s.entity_id} ${P(s)}`.toLowerCase();
}
function de(s, t) {
  return t.test(Xb(s));
}
function xN(s) {
  const t = s.some((d) => de(d, /proxmox|\bpve\b|_vm_|\blxc\b|qemu/)), i = s.some((d) => de(d, /docker|container|portainer/)), a = s.some((d) => de(d, /zfs|truenas|\bpool\b|dataset|\bzpool\b/)), r = s.some((d) => de(d, /\bpbs\b|backup|proxmox_backup|datastore/)), u = s.some((d) => de(d, /unifi|udm|\bwan\b|\bpoe\b|gateway/)), c = /* @__PURE__ */ new Set();
  for (const d of s) {
    if (!de(d, /cpu|load|memory|mem_used|disk/) || !de(d, /server|node|host|nas|\bpve\b|proxmox|truenas/)) continue;
    const v = P(d).match(/^([A-Za-z][\w-]*(?:Server|NAS|Node|Host)?)/);
    v && c.add(v[1]);
  }
  return { proxmox: t, docker: i, zfs: a, backups: r, unifi: u, nodes: [...c].sort() };
}
function Hg() {
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
function wN(s) {
  const t = Object.values(s.states).filter(ae), i = xN(t), a = { blocks: [] };
  if (!i.proxmox && !i.docker && !i.zfs && !i.backups && !i.nodes.length)
    return a;
  const r = [
    {
      kind: "count",
      icon: "alert-octagon",
      label: "need attention",
      accent: "warn",
      source: Hg()
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
    id: zt("server-health"),
    type: "list",
    title: "Needs attention",
    span: "full",
    entityIds: [],
    source: Hg()
  }), i.nodes.length)
    for (const d of i.nodes) {
      const p = _N(t, d);
      p.length && a.blocks.push({
        id: zt("server-node"),
        type: "group",
        title: d,
        axis: "function",
        entityIds: p,
        span: 2
      });
    }
  if (i.proxmox) {
    const d = t.filter((p) => (at(p.entity_id) === "switch" || at(p.entity_id) === "binary_sensor") && de(p, /_vm_|\blxc\b|qemu|guest/)).map((p) => p.entity_id);
    d.length && a.blocks.push({
      id: zt("server-vms"),
      type: "group",
      title: "Virtual machines",
      axis: "function",
      entityIds: d,
      span: 2
    });
  }
  if (i.docker) {
    const d = t.filter((p) => at(p.entity_id) === "switch" && de(p, /docker|container/)).map((p) => p.entity_id);
    d.length && a.blocks.push({
      id: zt("server-containers"),
      type: "group",
      title: "Containers",
      axis: "function",
      entityIds: d,
      span: 2
    });
  }
  if (i.zfs) {
    const d = t.filter((p) => at(p.entity_id) === "sensor" && de(p, /pool|dataset|zfs|free|used|capacity/) && de(p, /%|gb|tb|gib|tib|free|used|pool|dataset/i)).map((p) => p.entity_id);
    if (d.length) {
      a.blocks.push({
        id: zt("server-zfs"),
        type: "group",
        title: "Storage",
        axis: "function",
        entityIds: d,
        span: 2
      });
      const p = t.find((v) => at(v.entity_id) === "sensor" && de(v, /pool/) && (v.attributes.unit_of_measurement === "%" || de(v, /used|free|capacity/)));
      if (p) {
        const v = {
          title: "Pool capacity (30d)",
          window: { value: 30, unit: "d" },
          bucket: "day",
          reducer: "max",
          backend: "statistics",
          header: { showCurrent: !0, colorize: !0 },
          axes: [{ id: "pct", min: 0, max: 100 }],
          series: [{ entity: p.entity_id, name: $n(p), fill: "area", color: "var(--accent)", opacity: 0.2, strokeWidth: 2, axisId: "pct" }],
          thresholds: [{ value: 80, color: "var(--warn)" }]
        };
        a.blocks.push({
          id: zt("server-zfs-trend"),
          type: "chart",
          title: "Pool capacity",
          entityIds: [p.entity_id],
          span: "full",
          chart: v
        });
      }
    }
  }
  if (i.backups) {
    const d = t.filter((p) => (at(p.entity_id) === "sensor" || at(p.entity_id) === "binary_sensor") && de(p, /backup|pbs|datastore/)).map((p) => p.entity_id);
    d.length && a.blocks.push({
      id: zt("server-backups"),
      type: "list",
      title: "Backups",
      axis: "none",
      entityIds: d,
      span: 1
    });
  }
  const u = /immich|paperless|seafile|ocis|opencloud|plex|jellyfin|sonarr|radarr|sabnzbd|transmission|jdownloader|nginx|npm|proxy-manager|roon|portainer|cockpit|grafana|home-?assistant|vaultwarden|nextcloud/i, c = t.filter(
    (d) => at(d.entity_id) === "binary_sensor" && de(d, u) || at(d.entity_id) === "sensor" && de(d, u) && de(d, /status|up|online|reachable|ping/)
  ).map((d) => d.entity_id);
  if (c.length && a.blocks.push({
    id: zt("server-launchpad"),
    type: "group",
    title: "Services",
    axis: "function",
    entityIds: c,
    span: 2
  }), i.unifi) {
    const d = t.filter((p) => de(p, /unifi|udm|\bwan\b|\bpoe\b|gateway|throughput|clients/) && (at(p.entity_id) === "sensor" || at(p.entity_id) === "binary_sensor" || at(p.entity_id) === "button" || at(p.entity_id) === "switch")).map((p) => p.entity_id);
    d.length && a.blocks.push({
      id: zt("server-network"),
      type: "group",
      title: "Network",
      axis: "function",
      entityIds: d,
      span: 1
    });
  }
  return a;
}
function _N(s, t) {
  const i = t.toLowerCase();
  return s.filter((a) => {
    const r = Xb(a);
    return r.includes(i) ? /cpu|load|memory|mem|disk|temp|uptime|vms|status|power/.test(r) : !1;
  }).map((a) => a.entity_id).sort();
}
const SN = [
  {
    id: "home",
    name: "Home summary",
    description: "The landing surface — status strip, scenes, a category launcher, live status, security.",
    accent: "accent",
    build: Qb
  },
  {
    id: "lights",
    name: "Lights",
    description: "All your lights, grouped by room, with the room group tile leading each section.",
    accent: "warm",
    build: TM
  },
  {
    id: "climate",
    name: "Climate",
    description: "Feature-control tiles — mode and setpoint inline — plus a comfort trend.",
    accent: "accent",
    build: AM
  },
  {
    id: "sensors",
    name: "Sensors",
    description: "Split by data type — numeric sparklines, binary status tiles, overview charts.",
    accent: "up",
    build: UM
  },
  {
    id: "power",
    name: "Power",
    description: "Merged generation + consumption, a live flow chart, and a per-circuit sparkline wall.",
    accent: "warn",
    build: YM
  },
  {
    id: "security",
    name: "Security",
    description: "A presence-first status board — locks, doors and hazards — with an Attention escalation strip and the alarm hero.",
    accent: "green",
    build: bN
  },
  {
    id: "server",
    name: "Server / Homelab",
    description: "Node vitals, VM/container control, ZFS, backups and a service launchpad — auto-detected.",
    accent: "up",
    build: wN
  }
];
function MN(s) {
  return SN.find((t) => t.id === s);
}
let qg = 0;
function zt(s) {
  return qg += 1, `preset-${s}-${qg}`;
}
function Qg(s, t) {
  return s.includes("*") ? new RegExp(
    "^" + s.split("*").map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$",
    "i"
  ).test(t) : s === t;
}
function NN(s) {
  return s == null ? [] : Array.isArray(s) ? s : [s];
}
function $g(s, t, i) {
  return !(t.entityId && !Qg(t.entityId, s.entity_id) || t.domain && at(s.entity_id) !== t.domain || t.state && !NN(t.state).includes(s.state) || t.name && !Qg(t.name, P(s)) || t.area && i?.(s.entity_id) !== t.area);
}
function Zb(s, t, i, a) {
  const r = !s.includeNoise, u = [];
  for (const c of Object.values(t))
    r && !uu(c.entity_id, c, a?.[c.entity_id]) || s.include.some((d) => $g(c, d, i)) && (s.exclude?.some((d) => $g(c, d, i)) || u.push(c.entity_id));
  return u.sort();
}
function Qn(s, t, i) {
  return Object.values(s).filter((a) => at(a.entity_id) === t && uu(a.entity_id, a, i?.[a.entity_id])).sort((a, r) => P(a).localeCompare(P(r)));
}
function lr(s, t) {
  for (const i of Object.values(s)) if (t(i)) return !0;
  return !1;
}
function ae(s) {
  return s.state !== "unavailable" && s.state !== "unknown";
}
function Wb(s) {
  return at(s.entity_id) === "sensor" && s.attributes.unit_of_measurement != null && ae(s);
}
function $n(s, t) {
  return P(s).trim() || P(s);
}
const CN = [
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
function jN(s, t) {
  const i = t?.[s.entity_id];
  if (i) return i.areaName;
  const a = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [r, u] of CN) if (a.includes(r)) return u;
  return "Home";
}
function Ib(s, t) {
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
    const u = jN(r, t);
    let c = a.get(u);
    c || (c = [], a.set(u, c)), c.push(r);
  }
  return [...a.entries()].sort((r, u) => {
    const c = i.indexOf(r[0]), d = i.indexOf(u[0]);
    return (c < 0 ? 99 : c) - (d < 0 ? 99 : d) || r[0].localeCompare(u[0]);
  });
}
function Fb({ pills: s }) {
  return s.length ? /* @__PURE__ */ m.jsx(vM, { children: s.map((t, i) => /* @__PURE__ */ m.jsx(EN, { pill: t }, i)) }) : null;
}
function EN({ pill: s }) {
  const t = ir();
  switch (s.kind) {
    case "count":
      return /* @__PURE__ */ m.jsx(kN, { pill: s });
    case "nav":
      return /* @__PURE__ */ m.jsx(
        bM,
        {
          icon: Vn(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t({ action: "navigate", path: s.path })
        }
      );
    case "action":
      return /* @__PURE__ */ m.jsx(
        yM,
        {
          icon: Vn(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t(s.action)
        }
      );
    case "conditional":
      return /* @__PURE__ */ m.jsx(zN, { pill: s });
    case "status":
      return /* @__PURE__ */ m.jsx(wM, { entity: s.entityId });
    case "select":
      return /* @__PURE__ */ m.jsx(
        _M,
        {
          entity: s.entityId,
          name: s.name,
          onTap: () => t({ action: "more-info" }, s.entityId)
        }
      );
  }
}
function kN({ pill: s }) {
  const t = $e((i) => Zb(s.source, i).length);
  return /* @__PURE__ */ m.jsx(
    gM,
    {
      label: s.label,
      count: t,
      iconOn: Vn(s.icon),
      iconOff: Vn(s.icon),
      activeColor: s.accent
    }
  );
}
function zN({ pill: s }) {
  const t = $e((i) => {
    const a = s.visibleWhen, r = i[a.entity];
    if (!r || a.state != null && !(Array.isArray(a.state) ? a.state : [a.state]).includes(r.state))
      return !1;
    const u = Number(r.state);
    return !(a.above != null && !(u > a.above) || a.below != null && !(u < a.below));
  });
  return /* @__PURE__ */ m.jsx(xM, { label: s.label, icon: Vn(s.icon), accent: s.accent, visible: t });
}
function TN({ block: s }) {
  const t = ke(s.entityIds[0]);
  if (!t) return null;
  const i = t.attributes, a = at(t.entity_id);
  if (a === "climate" || i.current_temperature != null) {
    const c = i.current_temperature, d = i.temperature, p = i.hvac_action;
    let v = t.state.replace(/_/g, " ");
    return p === "heating" && d != null ? v = `Heating to ${qh(d)}°` : p === "cooling" && d != null ? v = `Cooling to ${qh(d)}°` : p === "idle" ? v = "Idle" : d != null && (v = `Set to ${qh(d)}°`), /* @__PURE__ */ m.jsxs("div", { className: "simui-hero", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "simui-hero-temp num", children: [
        c != null ? Math.round(c) : "—",
        /* @__PURE__ */ m.jsx("small", { children: "°" })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-hero-sub", children: v })
    ] });
  }
  const u = ON(a, t.state);
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-hero is-state", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-hero-state num", children: pt(t.state) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-hero-sub", children: s.title ?? P(t) }),
    u.length > 0 && /* @__PURE__ */ m.jsx(ar, { entity: t, features: u })
  ] });
}
function ON(s, t) {
  return s === "alarm_control_panel" ? [{ type: "alarm-modes", modes: ["disarmed", "armed_home", "armed_away", "armed_night"] }] : s === "cover" ? [{ type: "cover-open-close" }] : s === "lock" ? [{ type: "lock-commands" }] : [];
}
function qh(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function DN(s) {
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
function Xt({
  children: s,
  active: t,
  onClick: i,
  className: a = "",
  style: r,
  orientation: u = "horizontal",
  color: c,
  menuProps: d
}) {
  const p = i ? (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), i());
  } : void 0, v = DN(c), g = v ? { ...r, "--tile-accent": v } : r;
  return /* @__PURE__ */ m.jsx(
    "div",
    {
      className: [
        "simui-tile",
        u === "vertical" ? "is-vertical" : "",
        t ? "is-active" : "",
        v && t ? "is-tinted" : "",
        i ? "is-clickable" : "",
        a
      ].filter(Boolean).join(" "),
      onClick: i,
      onKeyDown: p,
      role: i ? "button" : void 0,
      tabIndex: i ? 0 : void 0,
      style: g,
      ...d,
      children: s
    }
  );
}
function AN({
  name: s,
  icon: t,
  color: i = "accent",
  orientation: a = "vertical",
  onTap: r
}) {
  return /* @__PURE__ */ m.jsxs(Xt, { orientation: a, color: i, active: !0, onClick: r, className: "is-launcher", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-launch-ic", children: Vn(t, a === "vertical" ? 20 : 16) }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-name simui-launch-name", title: s, children: s })
  ] });
}
function Qh({ iso: s }) {
  const t = ru(s);
  return t ? /* @__PURE__ */ m.jsxs("span", { className: "simui-since", children: [
    " · ",
    t
  ] }) : null;
}
const Vg = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "humidifier", "siren", "automation"]);
function Jo({ entityId: s }) {
  const t = ke(s), i = Bt(), a = ir(), r = Pd(), u = at(s), c = t ? P(t) : s, d = !!t && t.state === "on", p = !!t && t.state === "locked", v = [
    ...u === "light" || Vg.has(u) ? [{ label: d ? "Turn off" : "Turn on", onClick: () => a({ action: "toggle" }, s) }] : [],
    ...u === "lock" ? [{ label: p ? "Unlock" : "Lock", onClick: () => {
      i("lock", p ? "unlock" : "lock", {}, { entity_id: s });
    } }] : [],
    { label: "Details", icon: /* @__PURE__ */ m.jsx(vS, { size: 14 }), onClick: () => a({ action: "more-info" }, s) }
  ], g = r.open && r.position && /* @__PURE__ */ m.jsx(
    Fo,
    {
      items: v,
      x: r.position.x,
      y: r.position.y,
      onClose: r.close,
      header: Yl(s) ? /* @__PURE__ */ m.jsx(Gl, { entityId: s, compact: !0 }) : void 0
    }
  );
  if (!t)
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name muted", children: s }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-state", children: "—" }),
      g
    ] });
  if (t.state === "unavailable" || t.state === "unknown")
    return /* @__PURE__ */ m.jsxs("button", { className: "simui-erow as-row is-unavailable", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-state", children: pt(t.state) }),
      g
    ] });
  if (u === "light") {
    const b = t.attributes.brightness ?? 0, x = d ? Math.max(1, Math.round(b / 255 * 100)) : 0, S = () => {
      i("light", d ? "turn_off" : "turn_on", {}, { entity_id: s });
    }, w = (M) => {
      i("light", "turn_on", { brightness_pct: Number(M.target.value) }, { entity_id: s });
    };
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("button", { className: "simui-erow-dot", "data-on": d, "aria-label": `Toggle ${c}`, onClick: S }),
      /* @__PURE__ */ m.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      d ? /* @__PURE__ */ m.jsx(
        "input",
        {
          className: "simui-slider warm mini",
          type: "range",
          min: 1,
          max: 100,
          value: x,
          "aria-label": `${c} brightness`,
          onChange: w,
          style: { background: `linear-gradient(to right, var(--warm) ${x}%, var(--faint) ${x}%)` }
        }
      ) : /* @__PURE__ */ m.jsx("span", { className: "simui-erow-state", children: "Off" }),
      g
    ] });
  }
  if (u === "lock") {
    const b = () => {
      i("lock", p ? "unlock" : "lock", {}, { entity_id: s });
    };
    return /* @__PURE__ */ m.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-erow-ic${p ? "" : " amber"}`, children: p ? /* @__PURE__ */ m.jsx(bs, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ m.jsx(Da, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsxs("span", { className: `simui-erow-state${p ? "" : " warn"}`, children: [
        p ? "Locked" : "Unlocked",
        /* @__PURE__ */ m.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if (u === "cover") {
    const b = t.attributes.current_position, x = (S) => {
      i("cover", S, void 0, { entity_id: s });
    };
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-state", children: b != null ? `${b}%` : pt(t.state) }),
      jt(t, 1) && /* @__PURE__ */ m.jsx("button", { className: "simui-rbtn", "aria-label": "Open", onClick: () => x("open_cover"), children: /* @__PURE__ */ m.jsx($l, { size: 14 }) }),
      jt(t, 2) && /* @__PURE__ */ m.jsx("button", { className: "simui-rbtn", "aria-label": "Close", onClick: () => x("close_cover"), children: /* @__PURE__ */ m.jsx(gs, { size: 14 }) }),
      g
    ] });
  }
  if (u === "climate") {
    const b = t.attributes.current_temperature, x = t.attributes.hvac_action ?? t.state, S = x === "heating" ? " warn" : x === "cooling" ? " on" : "";
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-erow climate", ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: `simui-erow-state${S}`, children: b != null ? `${Math.round(b)}°` : pt(t.state) }),
      /* @__PURE__ */ m.jsx(ar, { entity: t, features: [{ type: "target-temperature" }] }),
      g
    ] });
  }
  if (u === "sensor" || u === "binary_sensor") {
    const b = t.attributes.unit_of_measurement ?? "", x = u === "binary_sensor";
    return /* @__PURE__ */ m.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsxs("span", { className: x ? "simui-erow-state" : "simui-erow-val num", children: [
        pt(t.state),
        b ? ` ${b}` : "",
        x && /* @__PURE__ */ m.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if (Vg.has(u) && (t.state === "on" || t.state === "off")) {
    const b = () => {
      i("homeassistant", d ? "turn_off" : "turn_on", {}, { entity_id: s });
    };
    return /* @__PURE__ */ m.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-erow-ic${d ? " cool" : ""}`, children: /* @__PURE__ */ m.jsx(ys, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsxs("span", { className: `simui-erow-state${d ? " on" : ""}`, children: [
        d ? "On" : "Off",
        /* @__PURE__ */ m.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  return /* @__PURE__ */ m.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-erow-name", children: c }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-erow-state", children: pt(t.state) }),
    g
  ] });
}
function $t(s) {
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
function ps(s, t) {
  return s.width === t.width && s.height === t.height;
}
var RN = (
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
function LN(s) {
  return new RN(s);
}
var BN = (
  /** @class */
  (function() {
    function s(t, i, a) {
      var r;
      this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = t, this._canvasElementClientSize = $t({
        width: this._canvasElement.clientWidth,
        height: this._canvasElement.clientHeight
      }), this._transformBitmapSize = i ?? (function(u) {
        return u;
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
        return $t({
          width: this.canvasElement.width,
          height: this.canvasElement.height
        });
      },
      enumerable: !1,
      configurable: !0
    }), s.prototype.resizeCanvasElement = function(t) {
      this._canvasElementClientSize = $t(t), this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"), this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"), this._invalidateBitmapSize();
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
      ps(i, t) || (this.canvasElement.width = t.width, this.canvasElement.height = t.height, this._emitBitmapSizeChanged(i, t));
    }, s.prototype._emitBitmapSizeChanged = function(t, i) {
      var a = this;
      this._bitmapSizeChangedListeners.forEach(function(r) {
        return r.call(a, t, i);
      });
    }, s.prototype._suggestNewBitmapSize = function(t) {
      var i = this._suggestedBitmapSize, a = $t(this._transformBitmapSize(t, this._canvasElementClientSize)), r = ps(this.bitmapSize, a) ? null : a;
      i === null && r === null || i !== null && r !== null && ps(i, r) || (this._suggestedBitmapSize = r, this._emitSuggestedBitmapSizeChanged(i, r));
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
      HN().then(function(i) {
        return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable();
      });
    }, s.prototype._initDevicePixelRatioObservable = function() {
      var t = this;
      if (this._canvasElement !== null) {
        var i = Yg(this._canvasElement);
        if (i === null)
          throw new Error("No window is associated with the canvas");
        this._devicePixelRatioObservable = LN(i), this._devicePixelRatioObservable.subscribe(function() {
          return t._invalidateBitmapSize();
        }), this._invalidateBitmapSize();
      }
    }, s.prototype._invalidateBitmapSize = function() {
      var t, i;
      if (this._canvasElement !== null) {
        var a = Yg(this._canvasElement);
        if (a !== null) {
          var r = (i = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && i !== void 0 ? i : a.devicePixelRatio, u = this._canvasElement.getClientRects(), c = (
            // eslint-disable-next-line no-negated-condition
            u[0] !== void 0 ? qN(u[0], r) : $t({
              width: this._canvasElementClientSize.width * r,
              height: this._canvasElementClientSize.height * r
            })
          );
          this._suggestNewBitmapSize(c);
        }
      }
    }, s.prototype._initResizeObserver = function() {
      var t = this;
      this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(i) {
        var a = i.find(function(c) {
          return c.target === t._canvasElement;
        });
        if (!(!a || !a.devicePixelContentBoxSize || !a.devicePixelContentBoxSize[0])) {
          var r = a.devicePixelContentBoxSize[0], u = $t({
            width: r.inlineSize,
            height: r.blockSize
          });
          t._suggestNewBitmapSize(u);
        }
      }), this._canvasElementResizeObserver.observe(this._canvasElement, { box: "device-pixel-content-box" }));
    }, s;
  })()
);
function UN(s, t) {
  return new BN(s, t.transform, t.options);
}
function Yg(s) {
  return s.ownerDocument.defaultView;
}
function HN() {
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
function qN(s, t) {
  return $t({
    width: Math.round(s.left * t + s.width * t) - Math.round(s.left * t),
    height: Math.round(s.top * t + s.height * t) - Math.round(s.top * t)
  });
}
var QN = (
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
function ws(s, t) {
  var i = s.canvasElementClientSize;
  if (i.width === 0 || i.height === 0)
    return null;
  var a = s.bitmapSize;
  if (a.width === 0 || a.height === 0)
    return null;
  var r = s.canvasElement.getContext("2d", t);
  return r === null ? null : new QN(r, i, a);
}
/*!
 * @license
 * TradingView Lightweight Charts™ v5.2.0
 * Copyright (c) 2026 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
const Jb = { title: "", visible: !0, hitTestTolerance: 3, lastValueVisible: !0, priceLineVisible: !0, priceLineSource: 0, priceLineWidth: 1, priceLineColor: "", priceLineStyle: 2, baseLineVisible: !0, baseLineWidth: 1, baseLineColor: "#B2B5BE", baseLineStyle: 0, priceFormat: { type: "price", precision: 2, minMove: 0.01 } };
var Gg, fs;
function Yn(s, t) {
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
function Pb(s, t, i, a) {
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
function qn(s) {
  return W(Ve(s));
}
(function(s) {
  s[s.Simple = 0] = "Simple", s[s.WithSteps = 1] = "WithSteps", s[s.Curved = 2] = "Curved";
})(Gg || (Gg = {})), (function(s) {
  s[s.Solid = 0] = "Solid", s[s.Dotted = 1] = "Dotted", s[s.Dashed = 2] = "Dashed", s[s.LargeDashed = 3] = "LargeDashed", s[s.SparseDotted = 4] = "SparseDotted";
})(fs || (fs = {}));
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
    this.t = this.t.filter(((u) => !u.o)), r.forEach(((u) => u.h(t, i, a)));
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
function Ea(s) {
  return typeof s == "number" && isFinite(s);
}
function Kl(s) {
  return typeof s == "number" && s % 1 == 0;
}
function rr(s) {
  return typeof s == "string";
}
function Eo(s) {
  return typeof s == "boolean";
}
function un(s) {
  const t = s;
  if (!t || typeof t != "object") return t;
  let i, a, r;
  for (a in i = Array.isArray(t) ? [] : {}, t) t.hasOwnProperty(a) && (r = t[a], i[a] = r && typeof r == "object" ? un(r) : r);
  return i;
}
function Kg(s) {
  return s !== null;
}
function xd(s) {
  return s === null ? void 0 : s;
}
const t1 = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function Po(s, t, i) {
  return t === void 0 && (t = t1), `${i = i !== void 0 ? `${i} ` : ""}${s}px ${t}`;
}
class $N {
  constructor(t) {
    this.M = { S: 1, C: 5, k: NaN, P: "", T: "", R: "", D: "", I: 0, V: 0, B: 0, A: 0, L: 0 }, this.O = t;
  }
  N() {
    const t = this.M, i = this.F(), a = this.W();
    return t.k === i && t.T === a || (t.k = i, t.T = a, t.P = Po(i, a), t.A = 2.5 / 12 * i, t.I = t.A, t.V = i / 12 * t.C, t.B = i / 12 * t.C, t.L = 0), t.R = this.H(), t.D = this.U(), this.M;
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
function $h(s) {
  return s < 0 ? 0 : s > 255 ? 255 : Math.round(s) || 0;
}
function Xg(s) {
  return 0.199 * s[0] + 0.687 * s[1] + 0.114 * s[2];
}
class VN {
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
    return { G: `rgb(${i[0]}, ${i[1]}, ${i[2]})`, X: Xg(i) > 160 ? "black" : "white" };
  }
  J(t) {
    return Xg(this.K(t));
  }
  tt(t, i, a) {
    const [r, u, c, d] = this.K(t), [p, v, g, b] = this.K(i), x = [$h(r + a * (p - r)), $h(u + a * (v - u)), $h(c + a * (g - c)), (S = d + a * (b - d), S <= 0 || S > 1 ? Math.min(Math.max(S, 0), 1) : Math.round(1e4 * S) / 1e4)];
    var S;
    return `rgba(${x[0]}, ${x[1]}, ${x[2]}, ${x[3]})`;
  }
  K(t) {
    const i = this.j.get(t);
    if (i) return i;
    const a = (function(c) {
      const d = document.createElement("div");
      d.style.display = "none", document.body.appendChild(d), d.style.color = c;
      const p = window.getComputedStyle(d).color;
      return document.body.removeChild(d), p;
    })(t), r = a.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
    if (!r) {
      if (this.q.length) for (const c of this.q) {
        const d = c(t);
        if (d) return this.j.set(t, d), d;
      }
      throw new Error(`Failed to parse color: ${t}`);
    }
    const u = [parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10), r[4] ? parseFloat(r[4]) : 1];
    return this.j.set(t, u), u;
  }
}
class e1 {
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
class Cs {
  st(t, i, a) {
    t.useBitmapCoordinateSpace(((r) => this.et(r, i, a)));
  }
}
class YN extends Cs {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et({ context: t, horizontalPixelRatio: i, verticalPixelRatio: a }) {
    if (this.rt === null || this.rt.lt === null) return;
    const r = this.rt.lt, u = this.rt, c = Math.max(1, Math.floor(i)) % 2 / 2, d = (p) => {
      t.beginPath();
      for (let v = r.to - 1; v >= r.from; --v) {
        const g = u.ot[v], b = Math.round(g._t * i) + c, x = g.ut * a, S = p * a + c;
        t.moveTo(b, x), t.arc(b, x, S, 0, 2 * Math.PI);
      }
      t.fill();
    };
    u.ct > 0 && (t.fillStyle = u.dt, d(u.ft + u.ct)), t.fillStyle = u.vt, d(u.ft);
  }
}
function GN() {
  return { ot: [{ _t: 0, ut: 0, wt: 0, Mt: 0 }], vt: "", dt: "", ft: 0, ct: 0, lt: null };
}
const KN = { from: 0, to: 1 };
class XN {
  constructor(t, i, a) {
    this.gt = new e1(), this.bt = [], this.St = [], this.xt = !0, this.O = t, this.Ct = i, this.yt = a, this.gt.nt(this.bt);
  }
  kt(t) {
    this.Pt(), this.xt = !0;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = !1), this.gt;
  }
  Pt() {
    const t = this.yt.Dt();
    t.length !== this.bt.length && (this.St = t.map(GN), this.bt = this.St.map(((i) => {
      const a = new YN();
      return a.ht(i), a;
    })), this.gt.nt(this.bt));
  }
  Rt() {
    const t = this.Ct.N().mode === 2 || !this.Ct.It(), i = this.yt.Vt(), a = this.Ct.Bt(), r = this.O.Et();
    this.Pt(), i.forEach(((u, c) => {
      const d = this.St[c], p = u.At(a), v = u.Lt();
      !t && p !== null && u.It() && v !== null ? (d.vt = p.zt, d.ft = p.ft, d.ct = p.Ot, d.ot[0].Mt = p.Mt, d.ot[0].ut = u.Ft().Nt(p.Mt, v.Wt), d.dt = p.Ht ?? this.O.Ut(d.ot[0].ut / u.Ft().$t()), d.ot[0].wt = a, d.ot[0]._t = r.jt(a), d.lt = KN) : d.lt = null;
    }));
  }
}
class ZN extends Cs {
  constructor(t) {
    super(), this.qt = t;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const u = this.qt.Yt.It, c = this.qt.Kt.It;
    if (!u && !c) return;
    const d = Math.round(this.qt._t * a), p = Math.round(this.qt.ut * r);
    t.lineCap = "butt", u && d >= 0 && (t.lineWidth = Math.floor(this.qt.Yt.ct * a), t.strokeStyle = this.qt.Yt.R, t.fillStyle = this.qt.Yt.R, Yn(t, this.qt.Yt.Zt), (function(v, g, b, x) {
      v.beginPath();
      const S = v.lineWidth % 2 ? 0.5 : 0;
      v.moveTo(g + S, b), v.lineTo(g + S, x), v.stroke();
    })(t, d, 0, i.height)), c && p >= 0 && (t.lineWidth = Math.floor(this.qt.Kt.ct * r), t.strokeStyle = this.qt.Kt.R, t.fillStyle = this.qt.Kt.R, Yn(t, this.qt.Kt.Zt), Pb(t, p, 0, i.width));
  }
}
class WN {
  constructor(t, i) {
    this.xt = !0, this.Gt = { Yt: { ct: 1, Zt: 0, R: "", It: !1 }, Kt: { ct: 1, Zt: 0, R: "", It: !1 }, _t: 0, ut: 0 }, this.Xt = new ZN(this.Gt), this.Jt = t, this.yt = i;
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
function cu(s, t, i, a, r, u) {
  s.save(), s.globalCompositeOperation = "copy", s.fillStyle = u, s.fillRect(t, i, a, r), s.restore();
}
function Zg(s, t, i, a, r, u) {
  s.beginPath(), s.roundRect ? s.roundRect(t, i, a, r, u) : (s.lineTo(t + a - u[1], i), u[1] !== 0 && s.arcTo(t + a, i, t + a, i + u[1], u[1]), s.lineTo(t + a, i + r - u[2]), u[2] !== 0 && s.arcTo(t + a, i + r, t + a - u[2], i + r, u[2]), s.lineTo(t + u[3], i + r), u[3] !== 0 && s.arcTo(t, i + r, t, i + r - u[3], u[3]), s.lineTo(t, i + u[0]), u[0] !== 0 && s.arcTo(t, i, t + u[0], i, u[0]));
}
function Wg(s, t, i, a, r, u, c = 0, d = [0, 0, 0, 0], p = "") {
  if (s.save(), !c || !p || p === u) return Zg(s, t, i, a, r, d), s.fillStyle = u, s.fill(), void s.restore();
  const v = c / 2;
  var g;
  Zg(s, t + v, i + v, a - c, r - c, (g = -v, d.map(((b) => b === 0 ? b : b + g)))), u !== "transparent" && (s.fillStyle = u, s.fill()), p !== "transparent" && (s.lineWidth = c, s.strokeStyle = p, s.closePath(), s.stroke()), s.restore();
}
function i1(s, t, i, a, r, u, c) {
  s.save(), s.globalCompositeOperation = "copy";
  const d = s.createLinearGradient(0, 0, 0, r);
  d.addColorStop(0, u), d.addColorStop(1, c), s.fillStyle = d, s.fillRect(t, i, a, r), s.restore();
}
class Ig {
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
    const u = this.qt.R, c = this.ei.G, d = t.useBitmapCoordinateSpace(((p) => {
      const v = p.context;
      v.font = i.P;
      const g = this.hi(p, i, a, r), b = g.ai;
      return g.li ? Wg(v, b.oi, b._i, b.ui, b.ci, c, b.di, [b.ft, 0, 0, b.ft], c) : Wg(v, b.fi, b._i, b.ui, b.ci, c, b.di, [0, b.ft, b.ft, 0], c), this.qt.pi && (v.fillStyle = u, v.fillRect(b.fi, b.mi, b.wi - b.fi, b.Mi)), this.qt.gi && (v.fillStyle = i.D, v.fillRect(g.li ? b.bi - b.di : 0, b._i, b.di, b.Si - b._i)), g;
    }));
    t.useMediaCoordinateSpace((({ context: p }) => {
      const v = d.xi;
      p.font = i.P, p.textAlign = d.li ? "right" : "left", p.textBaseline = "middle", p.fillStyle = u, p.fillText(this.qt.ri, v.Ci, (v._i + v.Si) / 2 + v.yi);
    }));
  }
  hi(t, i, a, r) {
    const { context: u, bitmapSize: c, mediaSize: d, horizontalPixelRatio: p, verticalPixelRatio: v } = t, g = this.qt.pi || !this.qt.ki ? i.C : 0, b = this.qt.Pi ? i.S : 0, x = i.A + this.ei.Ti, S = i.I + this.ei.Ri, w = i.V, M = i.B, N = this.qt.ri, E = i.k, T = a.Di(u, N), R = Math.ceil(a.Ii(u, N)), D = E + x + S, V = i.S + w + M + R + g, G = Math.max(1, Math.floor(v));
    let A = Math.round(D * v);
    A % 2 != G % 2 && (A += 1);
    const X = b > 0 ? Math.max(1, Math.floor(b * p)) : 0, J = Math.round(V * p), rt = Math.round(g * p), st = this.ei.Vi ?? this.ei.Bi ?? this.ei.Ei, F = Math.round(st * v) - Math.floor(0.5 * v), vt = Math.floor(F + G / 2 - A / 2), bt = vt + A, Tt = r === "right", L = Tt ? d.width - b : b, Z = Tt ? c.width - X : X;
    let it, ht, ft;
    return Tt ? (it = Z - J, ht = Z - rt, ft = L - g - w - b) : (it = Z + J, ht = Z + rt, ft = L + g + w), { li: Tt, ai: { _i: vt, mi: F, Si: bt, ui: J, ci: A, ft: 2 * p, di: X, oi: it, fi: Z, wi: ht, Mi: G, bi: c.width }, xi: { _i: vt / v, Si: bt / v, Ci: ft, yi: T } };
  }
}
class hu {
  constructor(t) {
    this.Ai = { Ei: 0, G: "#000", Ri: 0, Ti: 0 }, this.Li = { ri: "", It: !1, pi: !0, ki: !1, Ht: "", R: "#FFF", gi: !1, Pi: !1 }, this.zi = { ri: "", It: !1, pi: !1, ki: !0, Ht: "", R: "#FFF", gi: !0, Pi: !0 }, this.xt = !0, this.Oi = new (t || Ig)(this.Li, this.Ai), this.Ni = new (t || Ig)(this.zi, this.Ai);
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
class IN extends hu {
  constructor(t, i, a) {
    super(), this.Jt = t, this.Ki = i, this.Zi = a;
  }
  Yi(t, i, a) {
    if (t.It = !1, this.Jt.N().mode === 2) return;
    const r = this.Jt.N().horzLine;
    if (!r.labelVisible) return;
    const u = this.Ki.Lt();
    if (!this.Jt.It() || this.Ki.Gi() || u === null) return;
    const c = this.Ki.Xi().Z(r.labelBackgroundColor);
    a.G = c.G, t.R = c.X;
    const d = 2 / 12 * this.Ki.k();
    a.Ti = d, a.Ri = d;
    const p = this.Zi(this.Ki);
    a.Ei = p.Ei, t.ri = this.Ki.Ji(p.Mt, u), t.It = !0;
  }
}
const FN = /[1-9]/g;
class n1 {
  constructor() {
    this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  st(t, i) {
    if (this.qt === null || this.qt.It === !1 || this.qt.ri.length === 0) return;
    const a = t.useMediaCoordinateSpace((({ context: x }) => (x.font = i.P, Math.round(i.Qi.Ii(x, W(this.qt).ri, FN)))));
    if (a <= 0) return;
    const r = i.tn, u = a + 2 * r, c = u / 2, d = this.qt.nn;
    let p = this.qt.Ei, v = Math.floor(p - c) + 0.5;
    v < 0 ? (p += Math.abs(0 - v), v = Math.floor(p - c) + 0.5) : v + u > d && (p -= Math.abs(d - (v + u)), v = Math.floor(p - c) + 0.5);
    const g = v + u, b = Math.ceil(0 + i.S + i.C + i.A + i.k + i.I);
    t.useBitmapCoordinateSpace((({ context: x, horizontalPixelRatio: S, verticalPixelRatio: w }) => {
      const M = W(this.qt);
      x.fillStyle = M.G;
      const N = Math.round(v * S), E = Math.round(0 * w), T = Math.round(g * S), R = Math.round(b * w), D = Math.round(2 * S);
      if (x.beginPath(), x.moveTo(N, E), x.lineTo(N, R - D), x.arcTo(N, R, N + D, R, D), x.lineTo(T - D, R), x.arcTo(T, R, T, R - D, D), x.lineTo(T, E), x.fill(), M.pi) {
        const V = Math.round(M.Ei * S), G = E, A = Math.round((G + i.C) * w);
        x.fillStyle = M.R;
        const X = Math.max(1, Math.floor(S)), J = Math.floor(0.5 * S);
        x.fillRect(V - J, G, X, A - G);
      }
    })), t.useMediaCoordinateSpace((({ context: x }) => {
      const S = W(this.qt), w = 0 + i.S + i.C + i.A + i.k / 2;
      x.font = i.P, x.textAlign = "left", x.textBaseline = "middle", x.fillStyle = S.R;
      const M = i.Qi.Di(x, "Apr0");
      x.translate(v + r, w + M), x.fillText(S.ri, 0, 0);
    }));
  }
}
class JN {
  constructor(t, i, a) {
    this.xt = !0, this.Xt = new n1(), this.Gt = { It: !1, G: "#4c525e", R: "white", ri: "", nn: 0, Ei: NaN, pi: !0 }, this.Ct = t, this.sn = i, this.Zi = a;
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
    const u = a.en(this.Ct.Bt());
    t.ri = a.rn(W(u)), t.It = !0;
    const c = this.sn.Xi().Z(i.labelBackgroundColor);
    t.G = c.G, t.R = c.X, t.pi = a.N().ticksVisible;
  }
}
class s1 {
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
var wd;
(function(s) {
  s[s.Normal = 0] = "Normal", s[s.Magnet = 1] = "Magnet", s[s.Hidden = 2] = "Hidden", s[s.MagnetOHLC = 3] = "MagnetOHLC";
})(wd || (wd = {}));
class PN extends s1 {
  constructor(t, i) {
    super(), this.yt = null, this.fn = NaN, this.pn = 0, this.vn = !1, this.mn = /* @__PURE__ */ new Map(), this.wn = !1, this.Mn = /* @__PURE__ */ new WeakMap(), this.gn = /* @__PURE__ */ new WeakMap(), this.bn = NaN, this.Sn = NaN, this.xn = NaN, this.Cn = NaN, this.sn = t, this.yn = i, this.kn = /* @__PURE__ */ ((r, u) => (c) => {
      const d = u(), p = r();
      if (c === W(this.yt).Pn()) return { Mt: p, Ei: d };
      {
        const v = W(c.Lt());
        return { Mt: c.Tn(d, v), Ei: d };
      }
    })((() => this.fn), (() => this.Sn));
    const a = /* @__PURE__ */ ((r, u) => () => {
      const c = this.sn.Et().Rn(r()), d = u();
      return c && Number.isFinite(d) ? { wt: c, Ei: d } : null;
    })((() => this.pn), (() => this.ni()));
    this.Dn = new JN(this, t, a);
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
    let r = null, u = null;
    for (const v of i.Wn()) {
      const g = v.Un().Hn(t, -1);
      if (g) {
        if (g.$n === t) return t;
        (r === null || g.$n > r) && (r = g.$n);
      }
      const b = v.Un().Hn(t, 1);
      if (b) {
        if (b.$n === t) return t;
        (u === null || b.$n < u) && (u = b.$n);
      }
    }
    const c = [r, u].filter(Kg);
    if (c.length === 0) return t;
    const d = a.jt(t), p = c.map(((v) => Math.abs(d - a.jt(v))));
    return c[p.indexOf(Math.min(...p))];
  }
  jn(t) {
    let i = this.Mn.get(t);
    i || (i = new WN(this, t), this.Mn.set(t, i));
    let a = this.gn.get(t);
    return a || (a = new XN(this.sn, this, t), this.gn.set(t, a)), [i, a];
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
    const r = this.bn, u = this.Sn, c = this.fn, d = this.pn, p = this.yt, v = this.Gn(a);
    this.pn = t, this.bn = isNaN(t) ? NaN : this.sn.Et().jt(t), this.yt = a;
    const g = v !== null ? v.Lt() : null;
    return v !== null && g !== null ? (this.fn = i, this.Sn = v.Nt(i, g)) : (this.fn = NaN, this.Sn = NaN), r !== this.bn || u !== this.Sn || d !== this.pn || c !== this.fn || p !== this.yt;
  }
  On() {
    const t = this.sn.Jn().map(((a) => a.Un().Qn())).filter(Kg), i = t.length === 0 ? null : Math.max(...t);
    this.pn = i !== null ? i : NaN;
  }
  Yn(t, i, a) {
    let r = t.get(i);
    return r === void 0 && (r = new IN(this, i, a), t.set(i, r)), r;
  }
}
function du(s) {
  return s === "left" || s === "right";
}
class xe {
  constructor(t) {
    this.ts = /* @__PURE__ */ new Map(), this.ns = [], this.ss = t;
  }
  es(t, i) {
    const a = (function(r, u) {
      return r === void 0 ? u : { rs: Math.max(r.rs, u.rs), hs: r.hs || u.hs };
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
    return new xe(2);
  }
  static ys() {
    return new xe(3);
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
class a1 {
  formatTickmarks(t) {
    return t.map(((i) => this.format(i)));
  }
}
const Fg = ".";
function cn(s, t) {
  if (!Ea(s)) return "n/a";
  if (!Kl(t)) throw new TypeError("invalid length");
  if (t < 0 || t > 16) throw new TypeError("invalid length");
  return t === 0 ? s.toString() : ("0000000000000000" + s.toString()).slice(-t);
}
class fu extends a1 {
  constructor(t, i) {
    if (super(), i || (i = 1), Ea(t) && Kl(t) || (t = 100), t < 0) throw new TypeError("invalid base");
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
    const u = this.Rs !== void 0 ? this.Rs : NaN;
    if (i > 1) {
      let c = +(Math.round(t * i) - a * i).toFixed(this.Rs);
      c >= i && (c -= i, a += 1), r = Fg + cn(+c.toFixed(this.Rs) * this.ks, u);
    } else a = Math.round(a * i) / i, u > 0 && (r = Fg + cn(0, u));
    return a.toFixed(0) + r;
  }
}
class l1 extends fu {
  constructor(t = 100) {
    super(t);
  }
  format(t) {
    return `${super.format(t)}%`;
  }
}
class tC extends a1 {
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
    return i = (t = Math.round(t * a) / a) >= 1e-15 && t < 1 ? t.toFixed(this.Ds).replace(/\.?0+$/, "") : String(t), i.replace(/(\.[1-9]*)0+$/, ((r, u) => u));
  }
}
const eC = /[2-9]/g;
class tu {
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
    const r = a || eC, u = String(i).replace(r, "0");
    if (this.Ls.has(u)) return Ve(this.Ls.get(u)).Fs;
    if (this.Vs === this.zs) {
      const d = this.As[this.Es];
      delete this.As[this.Es], this.Ls.delete(d), this.Es++, this.Vs--;
    }
    t.save(), t.textBaseline = "middle";
    const c = t.measureText(u);
    return t.restore(), c.width === 0 && i.length || (this.Ls.set(u, { Fs: c, Ws: this.Bs }), this.As[this.Bs] = u, this.Vs++, this.Bs++), c;
  }
}
class iC {
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
class r1 {
  constructor(t, i, a) {
    this.qs = t, this.$s = new tu(50), this.Ys = i, this.O = a, this.F = -1, this.Xt = new iC(this.$s);
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
class nC extends Cs {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  Qs(t, i) {
    if (!this.qt?.It) return null;
    const { ut: a, ct: r, te: u } = this.qt;
    return i >= a - r - 7 && i <= a + r + 7 ? { ie: this.qt, ne: Math.abs(i - a), se: 2, ee: "price-line", te: u } : null;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null || this.qt.It === !1) return;
    const u = Math.round(this.qt.ut * r);
    u < 0 || u > i.height || (t.lineCap = "butt", t.strokeStyle = this.qt.R, t.lineWidth = Math.floor(this.qt.ct * a), Yn(t, this.qt.Zt), Pb(t, u, 0, i.width));
  }
}
class tf {
  constructor(t) {
    this.re = { ut: 0, R: "rgba(0, 0, 0, 0)", ct: 1, Zt: 0, It: !1 }, this.he = new nC(), this.xt = !0, this.ae = t, this.le = t.Qt(), this.he.ht(this.re);
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    return this.ae.It() ? (this.xt && (this.oe(), this.xt = !1), this.he) : null;
  }
}
class sC extends tf {
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
class aC extends Cs {
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
    const u = Math.max(1, Math.floor(i)), c = u % 2 / 2, d = Math.round(r.ce.x * i) + c, p = r.ce.y * a;
    t.fillStyle = r.de, t.beginPath();
    const v = Math.max(2, 1.5 * r.fe) * i;
    t.arc(d, p, v, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = r.pe, t.beginPath(), t.arc(d, p, r.ft * i, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = u, t.strokeStyle = r.ve, t.beginPath(), t.arc(d, p, r.ft * i + u / 2, 0, 2 * Math.PI, !1), t.stroke();
  }
}
const lC = [{ me: 0, we: 0.25, Me: 4, ge: 10, be: 0.25, Se: 0, xe: 0.4, Ce: 0.8 }, { me: 0.25, we: 0.525, Me: 10, ge: 14, be: 0, Se: 0, xe: 0.8, Ce: 0 }, { me: 0.525, we: 1, Me: 14, ge: 14, be: 0, Se: 0, xe: 0, Ce: 0 }];
class rC {
  constructor(t) {
    this.Xt = new aC(), this.xt = !0, this.ye = !0, this.ke = performance.now(), this.Pe = this.ke - 1, this.Te = t;
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
    const u = { x: t.jt(r.$n), y: this.Te.Ft().Nt(r.Mt, a.Wt) }, c = r.R, d = this.Te.N().lineWidth, p = this.Oe(this.Ne(), c);
    this.Xt.ht({ de: c, fe: d, pe: p.pe, ve: p.ve, ft: p.ft, ce: u });
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
    const u = a + (r - a) * i;
    return this.Te.Qt().Xi().Y(t, u);
  }
  Oe(t, i) {
    const a = t % 2600 / 2600;
    let r;
    for (const v of lC) if (a >= v.me && a <= v.we) {
      r = v;
      break;
    }
    we(r !== void 0, "Last price animation internal logic error");
    const u = (a - r.me) / (r.we - r.me);
    return { pe: this.Fe(i, u, r.be, r.Se), ve: this.Fe(i, u, r.xe, r.Ce), ft: (c = u, d = r.Me, p = r.ge, d + (p - d) * c) };
    var c, d, p;
  }
}
class oC extends tf {
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
class uC extends hu {
  constructor(t) {
    super(), this.Jt = t;
  }
  Yi(t, i, a) {
    t.It = !1, i.It = !1;
    const r = this.Jt;
    if (!r.It()) return;
    const u = r.N(), c = u.lastValueVisible, d = r.He() !== "", p = u.seriesLastValueMode === 0, v = r.Ae(!1);
    if (v.Le) return;
    c && (t.ri = this.Ue(v, c, p), t.It = t.ri.length !== 0), (d || p) && (i.ri = this.$e(v, c, d, p), i.It = i.ri.length > 0);
    const g = r.We(v.R), b = this.Jt.Qt().Xi().Z(g);
    a.G = b.G, a.Ei = v.Ei, i.Ht = r.Qt().Ut(v.Ei / r.Ft().$t()), t.Ht = g, t.R = b.X, i.R = b.X;
  }
  $e(t, i, a, r) {
    let u = "";
    const c = this.Jt.He();
    return a && c.length !== 0 && (u += `${c} `), i && r && (u += this.Jt.Ft().je() ? t.qe : t.Ye), u.trim();
  }
  Ue(t, i, a) {
    return i ? a ? this.Jt.Ft().je() ? t.Ye : t.qe : t.ri : "";
  }
}
function Jg(s, t, i, a) {
  const r = Number.isFinite(t), u = Number.isFinite(i);
  return r && u ? s(t, i) : r || u ? r ? t : i : a;
}
class Ee {
  constructor(t, i) {
    this.Ke = t, this.Ze = i;
  }
  Ge(t) {
    return t !== null && this.Ke === t.Ke && this.Ze === t.Ze;
  }
  Xe() {
    return new Ee(this.Ke, this.Ze);
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
    return t === null ? this : new Ee(Jg(Math.min, this.Je(), t.Je(), -1 / 0), Jg(Math.max, this.Qe(), t.Qe(), 1 / 0));
  }
  ir(t) {
    if (!Ea(t) || this.Ze - this.Ke === 0) return;
    const i = 0.5 * (this.Ze + this.Ke);
    let a = this.Ze - i, r = this.Ke - i;
    a *= t, r *= t, this.Ze = i + a, this.Ke = i + r;
  }
  nr(t) {
    Ea(t) && (this.Ze += t, this.Ke += t);
  }
  sr() {
    return { minValue: this.Ke, maxValue: this.Ze };
  }
  static er(t) {
    return t === null ? null : new Ee(t.minValue, t.maxValue);
  }
}
class eu {
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
    return t === null ? null : new eu(Ee.er(t.priceRange), t.margins);
  }
}
const cC = [2, 4, 8, 16, 32, 64, 128, 256, 512], hC = "Custom series with conflation reducer must have a priceValueBuilder method";
class dC extends tf {
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
class fC extends hu {
  constructor(t, i) {
    super(), this.Te = t, this._r = i;
  }
  Yi(t, i, a) {
    t.It = !1, i.It = !1;
    const r = this._r.N(), u = r.axisLabelVisible, c = r.title !== "", d = this.Te;
    if (!u || !d.It()) return;
    const p = this._r.ur();
    if (p === null) return;
    c && (i.ri = r.title, i.It = !0), i.Ht = d.Qt().Ut(p / d.Ft().$t()), t.ri = this.cr(r.price), t.It = !0;
    const v = this.Te.Qt().Xi().Z(r.axisLabelColor || r.color);
    a.G = v.G;
    const g = r.axisLabelTextColor || v.X;
    t.R = g, i.R = g, a.Ei = p;
  }
  cr(t) {
    const i = this.Te.Lt();
    return i === null ? "" : this.Te.Ft().Ji(t, i.Wt);
  }
}
class mC {
  constructor(t, i) {
    this.Te = t, this.yn = i, this.dr = new dC(t, this), this.qs = new fC(t, this), this.pr = new r1(this.qs, t, t.Qt());
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
class pC {
  constructor() {
    this.br = /* @__PURE__ */ new WeakMap();
  }
  Sr(t, i, a) {
    const r = 1 / i * a;
    if (t >= r) return 1;
    const u = r / t, c = Math.pow(2, Math.floor(Math.log2(u)));
    return Math.min(c, 512);
  }
  Cr(t, i, a, r = !1, u) {
    if (t.length === 0 || i <= 1) return t;
    const c = this.yr(i);
    if (c <= 1) return t;
    const d = this.kr(t);
    let p = d.Pr.get(c);
    return p !== void 0 || (p = this.Tr(t, c, a, r, u, d.Pr), d.Pr.set(c, p)), p;
  }
  Rr(t, i, a, r, u = !1, c) {
    if (a < 1 || t.length === 0) return t;
    const d = this.kr(t), p = d.Pr.get(a);
    if (!p) return this.Cr(t, a, r, u, c);
    const v = this.Dr(t, i, a, p, u, r, c);
    return d.Pr.set(a, v), v;
  }
  yr(t) {
    if (t <= 2) return 2;
    for (const i of cC) if (t <= i) return i;
    return 512;
  }
  Ir(t) {
    if (t.length === 0) return 0;
    const i = t[0], a = t[t.length - 1];
    return 31 * t.length + 17 * i.$n + 13 * a.$n;
  }
  Tr(t, i, a, r = !1, u, c = /* @__PURE__ */ new Map()) {
    if (i === 2) return this.Vr(t, 2, a, r, u);
    const d = i / 2;
    let p = c.get(d);
    return p || (p = this.Tr(t, d, a, r, u, c), c.set(d, p)), this.Br(p, a, r, u);
  }
  Vr(t, i, a, r = !1, u) {
    const c = this.Er(t, i, a, r, u);
    return this.Ar(c, r);
  }
  Br(t, i, a = !1, r) {
    const u = this.Er(t, 2, i, a, r);
    return this.Ar(u, a);
  }
  Er(t, i, a, r = !1, u) {
    const c = [];
    for (let d = 0; d < t.length; d += i)
      if (t.length - d >= i) {
        const p = this.Lr(t[d], t[d + 1], a, r, u);
        p.zr = !1, c.push(p);
      } else if (c.length === 0) c.push(this.Or(t[d], !0));
      else {
        const p = c[c.length - 1];
        c[c.length - 1] = this.Nr(p, t[d], a, r, u);
      }
    return c;
  }
  Fr(t, i) {
    return (t ?? 1) + (i ?? 1);
  }
  Lr(t, i, a, r = !1, u) {
    if (!r || !a || !u) {
      const v = t.Wt[1] > i.Wt[1] ? t.Wt[1] : i.Wt[1], g = t.Wt[2] < i.Wt[2] ? t.Wt[2] : i.Wt[2];
      return { Wr: t.$n, Hr: i.$n, Ur: t.wt, $r: i.wt, jr: t.Wt[0], qr: v, Yr: g, Kr: i.Wt[3], Zr: this.Fr(t.Zr, i.Zr), Gr: void 0, zr: !1 };
    }
    const c = a(this.Xr(t, u), this.Xr(i, u)), d = u(c), p = d.length ? d[d.length - 1] : 0;
    return { Wr: t.$n, Hr: i.$n, Ur: t.wt, $r: i.wt, jr: t.Wt[0], qr: Math.max(t.Wt[1], p), Yr: Math.min(t.Wt[2], p), Kr: p, Zr: this.Fr(t.Zr, i.Zr), Gr: c, zr: !1 };
  }
  Nr(t, i, a, r = !1, u) {
    if (!r || !a || !u) return { Wr: t.Wr, Hr: i.$n, Ur: t.Ur, $r: i.wt, jr: t.jr, qr: t.qr > i.Wt[1] ? t.qr : i.Wt[1], Yr: t.Yr < i.Wt[2] ? t.Yr : i.Wt[2], Kr: i.Wt[3], Zr: t.Zr + (i.Zr ?? 1), Gr: t.Gr, zr: !1 };
    const c = t.Gr, d = this.Xr(i, u), p = c ? { data: c, index: t.Wr, originalTime: t.Ur, time: t.Ur, priceValues: u(c) } : null, v = p ? a(p, d) : d.data, g = p ? u(v) : d.priceValues, b = g.length ? g[g.length - 1] : 0;
    return { Wr: t.Wr, Hr: i.$n, Ur: t.Ur, $r: i.wt, jr: t.jr, qr: Math.max(t.qr, b), Yr: Math.min(t.Yr, b), Kr: b, Zr: t.Zr + (i.Zr ?? 1), Gr: v, zr: !1 };
  }
  Jr(t, i, a, r, u, c, d = !1, p) {
    const v = i === r ? u : t[i];
    if (a - i == 1) return this.Or(v, !0);
    const g = i + 1 === r ? u : t[i + 1];
    let b = this.Lr(v, g, c, d, p);
    for (let x = i + 2; x < a; x++) {
      const S = x === r ? u : t[x];
      b = this.Nr(b, S, c, d, p);
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
  Dr(t, i, a, r, u = !1, c, d) {
    if (r.length === 0) return r;
    const p = t.length - 1, v = Math.floor(p / a) * a;
    if (Math.min(v + a, t.length) - v < a && t.length > a) {
      const g = t.slice();
      return g[g.length - 1] = i, this.Cr(g, a, c, u, d);
    }
    if (Math.floor((p - 1) / a) === Math.floor(p / a) || r.length === 1) {
      const g = Math.min(v + a, t.length), b = g - v;
      if (b <= 0) return r;
      const x = b === 1 ? this.Or(v === p ? i : t[v], !0) : this.Jr(t, v, g, p, i, c, u, d);
      return r[r.length - 1] = this.th(x, u), r;
    }
    {
      const g = t.slice();
      return g[g.length - 1] = i, this.Cr(g, a, c, u, d);
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
class vC extends s1 {
  constructor(t) {
    super(), this.sn = t;
  }
  Qt() {
    return this.sn;
  }
}
const gC = { Bar: (s, t, i, a) => {
  const r = t.upColor, u = t.downColor, c = W(s(i, a)), d = qn(c.Wt[0]) <= qn(c.Wt[3]);
  return { sh: c.R ?? (d ? r : u) };
}, Candlestick: (s, t, i, a) => {
  const r = t.upColor, u = t.downColor, c = t.borderUpColor, d = t.borderDownColor, p = t.wickUpColor, v = t.wickDownColor, g = W(s(i, a)), b = qn(g.Wt[0]) <= qn(g.Wt[3]);
  return { sh: g.R ?? (b ? r : u), eh: g.Ht ?? (b ? c : d), rh: g.hh ?? (b ? p : v) };
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
class bC {
  constructor(t) {
    this.wh = (i, a) => a !== void 0 ? a.Wt : this.Te.Un().Mh(i), this.Te = t, this.gh = gC[t.bh()];
  }
  Sh(t, i) {
    return this.gh(this.wh, this.Te.N(), t, i);
  }
}
function o1(s, t, i, a, r = 0, u = t.length) {
  let c = u - r;
  for (; 0 < c; ) {
    const d = c >> 1, p = r + d;
    a(t[p], i) === s ? (r = p + 1, c -= d + 1) : c = d;
  }
  return r;
}
const _s = o1.bind(null, !0), ef = o1.bind(null, !1);
var Pg;
(function(s) {
  s[s.NearestLeft = -1] = "NearestLeft", s[s.None = 0] = "None", s[s.NearestRight = 1] = "NearestRight";
})(Pg || (Pg = {}));
const Ln = 30;
class yC {
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
    for (const u of a)
      r = ko(r, this.Ah(t, i, u));
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
    return _s(this.xh, t, ((i, a) => i.$n < a));
  }
  Wh(t) {
    return ef(this.xh, t, ((i, a) => i.$n > a));
  }
  Hh(t, i, a) {
    let r = null;
    for (let u = t; u < i; u++) {
      const c = this.xh[u].Wt[a];
      Number.isNaN(c) || (r === null ? r = { Uh: c, $h: c } : (c < r.Uh && (r.Uh = c), c > r.$h && (r.$h = c)));
    }
    return r;
  }
  Ah(t, i, a) {
    if (this.Gi()) return null;
    let r = null;
    const u = W(this.Rh()), c = W(this.Qn()), d = Math.max(t, u), p = Math.min(i, c), v = Math.ceil(d / Ln) * Ln, g = Math.max(v, Math.floor(p / Ln) * Ln);
    {
      const x = this.Fh(d), S = this.Wh(Math.min(p, v, i));
      r = ko(r, this.Hh(x, S, a));
    }
    let b = this.Ch.get(a);
    b === void 0 && (b = /* @__PURE__ */ new Map(), this.Ch.set(a, b));
    for (let x = Math.max(v + 1, d); x < g; x += Ln) {
      const S = Math.floor(x / Ln);
      let w = b.get(S);
      if (w === void 0) {
        const M = this.Fh(S * Ln), N = this.Wh((S + 1) * Ln - 1);
        w = this.Hh(M, N, a), b.set(S, w);
      }
      r = ko(r, w);
    }
    {
      const x = this.Fh(g), S = this.Wh(p);
      r = ko(r, this.Hh(x, S, a));
    }
    return r;
  }
}
function ko(s, t) {
  return s === null ? t : t === null ? s : { Uh: Math.min(s.Uh, t.Uh), $h: Math.max(s.$h, t.$h) };
}
function Vh() {
  return new yC();
}
const iu = { setLineStyle: Yn };
class xC {
  constructor(t) {
    this.jh = t;
  }
  st(t, i, a) {
    this.jh.draw(t, iu);
  }
  qh(t, i, a) {
    this.jh.drawBackground?.(t, iu);
  }
}
class wC {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const i = new xC(t);
    return this.Ls = { Kh: t, Zh: i }, i;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
class u1 {
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
    const i = t.map(((a) => new wC(a)));
    return this.Xh = { Kh: t, Zh: i }, i;
  }
  Qs(t, i) {
    return this.Jh.hitTest?.(t, i) ?? null;
  }
}
let _C = class extends u1 {
  cn() {
    return [];
  }
};
class SC {
  constructor(t) {
    this.jh = t;
  }
  st(t, i, a) {
    this.jh.draw(t, iu);
  }
  qh(t, i, a) {
    this.jh.drawBackground?.(t, iu);
  }
}
class t0 {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const i = new SC(t);
    return this.Ls = { Kh: t, Zh: i }, i;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
function c1(s) {
  return { ri: s.text(), Ei: s.coordinate(), Vi: s.fixedCoordinate?.(), R: s.textColor(), G: s.backColor(), It: s.visible?.() ?? !0, pi: s.tickVisible?.() ?? !0 };
}
class MC {
  constructor(t, i) {
    this.Xt = new n1(), this.ta = t, this.ia = i;
  }
  Tt() {
    return this.Xt.ht({ nn: this.ia.nn(), ...c1(this.ta) }), this.Xt;
  }
}
class NC extends hu {
  constructor(t, i) {
    super(), this.ta = t, this.Ki = i;
  }
  Yi(t, i, a) {
    const r = c1(this.ta);
    a.G = r.G, t.R = r.R;
    const u = 2 / 12 * this.Ki.k();
    a.Ti = u, a.Ri = u, a.Ei = r.Ei, a.Vi = r.Vi, t.ri = r.ri, t.It = r.It, t.pi = r.pi;
  }
}
class CC extends u1 {
  constructor(t, i) {
    super(t), this.na = null, this.sa = null, this.ea = null, this.ra = null, this.Te = i;
  }
  dn() {
    const t = this.Jh.timeAxisViews?.() ?? [];
    if (this.na?.Kh === t) return this.na.Zh;
    const i = this.Te.Qt().Et(), a = t.map(((r) => new MC(r, i)));
    return this.na = { Kh: t, Zh: a }, a;
  }
  qn() {
    const t = this.Jh.priceAxisViews?.() ?? [];
    if (this.sa?.Kh === t) return this.sa.Zh;
    const i = this.Te.Ft(), a = t.map(((r) => new NC(r, i)));
    return this.sa = { Kh: t, Zh: a }, a;
  }
  ha() {
    const t = this.Jh.priceAxisPaneViews?.() ?? [];
    if (this.ea?.Kh === t) return this.ea.Zh;
    const i = t.map(((a) => new t0(a)));
    return this.ea = { Kh: t, Zh: i }, i;
  }
  aa() {
    const t = this.Jh.timeAxisPaneViews?.() ?? [];
    if (this.ra?.Kh === t) return this.ra.Zh;
    const i = t.map(((a) => new t0(a)));
    return this.ra = { Kh: t, Zh: i }, i;
  }
  la(t, i) {
    return this.Jh.autoscaleInfo?.(t, i) ?? null;
  }
}
function Yh(s, t, i, a) {
  s.forEach(((r) => {
    t(r).forEach(((u) => {
      u.Gh() === i && a.push(u);
    }));
  }));
}
function Gh(s) {
  return s.jn();
}
function jC(s) {
  return s.ha();
}
function EC(s) {
  return s.aa();
}
const kC = ["Area", "Line", "Baseline"];
class mu extends vC {
  constructor(t, i, a, r, u) {
    super(t), this.qt = Vh(), this.dr = new oC(this), this.oa = [], this._a = new sC(this), this.ua = null, this.ca = null, this.da = null, this.fa = [], this.pa = new pC(), this.va = /* @__PURE__ */ new Map(), this.ma = null, this.yn = a, this.wa = i;
    const c = new uC(this);
    if (this.mn = [c], this.pr = new r1(c, this, t), kC.includes(this.wa) && (this.ua = new rC(this)), this.Ma(), this.Yh = r(this, this.Qt(), u), this.wa === "Custom") {
      const d = this.Yh;
      d.ga && this.ba(d.ga);
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
    const r = this.Qt().Et().Ee(), u = this.Lt();
    if (r === null || u === null) return i;
    let c, d;
    if (t) {
      const b = this.qt.Ph();
      if (b === null) return i;
      c = b, d = b.$n;
    } else {
      const b = this.qt.Hn(r.bi(), -1);
      if (b === null || (c = this.qt.Mh(b.$n), c === null)) return i;
      d = b.$n;
    }
    const p = c.Wt[3], v = this.Sa().Sh(d, { Wt: c }), g = a.Nt(p, u.Wt);
    return { Le: !1, Mt: p, ri: a.Ji(p, u.Wt), qe: a.xa(p), Ye: a.Ca(p, u.Wt), R: v.sh, Ei: g, $n: d };
  }
  Sa() {
    return this.ca !== null || (this.ca = new bC(this)), this.ca;
  }
  N() {
    return this.yn;
  }
  vr(t) {
    const i = this.Qt(), { priceScaleId: a, visible: r, priceFormat: u } = t;
    a !== void 0 && a !== this.yn.priceScaleId && i.ya(this, a), r !== void 0 && r !== this.yn.visible && i.ka();
    const c = t.conflationThresholdFactor !== void 0;
    Pe(this.yn, t), c && (this.va.clear(), this.Qt().mr()), u !== void 0 && (this.Ma(), i.Pa()), i.Ta(this), i.Ra(), this.Yh.kt("options");
  }
  ht(t, i) {
    this.qt.ht(t), this.va.clear();
    const a = this.Qt().Et().N();
    a.enableConflation && a.precomputeConflationOnInit && this.Da(a.precomputeConflationPriority), this.Yh.kt("data"), this.ua !== null && (i && i.Ia ? this.ua.De() : t.length === 0 && this.ua.Re());
    const r = this.Qt().Ks(this);
    this.Qt().Va(r), this.Qt().Ta(this), this.Qt().Ra(), this.Qt().mr();
  }
  Ba(t) {
    const i = new mC(this, t);
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
    const a = this.wa === "Custom", r = a && this.ma || void 0, u = a && this.Yh.Wa ? (p) => {
      const v = p, g = this.Yh.Wa(v);
      return Array.isArray(g) ? g : [typeof g == "number" ? g : 0];
    } : void 0, c = this.pa.Rr(this.qt.Bh(), t, i, r, a, u), d = Vh();
    d.ht(c), this.va.set(i, d);
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
    Yh(this.fa, Gh, "top", i);
    const a = this.ua;
    return a !== null && a.It() && (this.da === null && a.Ve() && (this.da = setTimeout((() => {
      this.da = null, this.Qt().qa();
    }), 0)), a.Ie(), i.unshift(a)), i;
  }
  jn() {
    const t = [];
    this.Ya() || t.push(this._a), t.push(this.Yh, this.dr);
    const i = this.oa.map(((a) => a.wr()));
    return t.push(...i), Yh(this.fa, Gh, "normal", t), t;
  }
  Ka() {
    return this.Za(Gh, "bottom");
  }
  Ga(t) {
    return this.Za(jC, t);
  }
  Xa(t) {
    return this.Za(EC, t);
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
      return eu.er(a);
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
    this.fa.push(new CC(t, this));
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
    return !du(this.Ft().cl());
  }
  Qa(t, i) {
    if (!Kl(t) || !Kl(i) || this.qt.Gi()) return null;
    const a = this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline" || this.wa === "Histogram" ? [3] : [2, 1], r = this.qt.Eh(t, i, a);
    let u = r !== null ? new Ee(r.Uh, r.$h) : null, c = null;
    if (this.bh() === "Histogram") {
      const d = this.yn.base, p = new Ee(d, d);
      u = u !== null ? u.Ss(p) : p;
    }
    return this.fa.forEach(((d) => {
      const p = d.la(t, i);
      if (p?.priceRange) {
        const v = new Ee(p.priceRange.minValue, p.priceRange.maxValue);
        u = u !== null ? u.Ss(v) : v;
      }
      p?.margins && (c = p.margins);
    })), new eu(u, c);
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
        this.il = new tC(this.yn.priceFormat.precision);
        break;
      case "percent":
        this.il = new l1(this.yn.priceFormat.precision);
        break;
      default: {
        const t = Math.pow(10, this.yn.priceFormat.precision);
        this.il = new fu(t, this.yn.priceFormat.minMove * t);
      }
    }
    this.hn !== null && this.hn.dl();
  }
  Za(t, i) {
    const a = [];
    return Yh(this.fa, t, i, a), a;
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
      const u = this.ll();
      if (!u) throw new Error(hC);
      a = this.pa.Cr(i, t, this.ma, !0, ((c) => u(c)));
    } else a = this.pa.Cr(i, t);
    const r = Vh();
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
      }, u = typeof window == "object" && window || typeof self == "object" && self;
      u?.Sl?.bl ? u.Sl.bl((() => {
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
const zC = [3], TC = [0, 1, 2, 3];
class OC {
  constructor(t) {
    this.yn = t;
  }
  xl(t, i, a) {
    let r = t;
    if (this.yn.mode === 0) return r;
    const u = a.Pn(), c = u.Lt();
    if (c === null) return r;
    const d = u.Nt(t, c), p = a.Cl().filter(((g) => g instanceof mu)).reduce(((g, b) => {
      if (a.Zs(b) || !b.It()) return g;
      const x = b.Ft(), S = b.Un();
      if (x.Gi() || !S.ze(i)) return g;
      const w = S.Mh(i);
      if (w === null) return g;
      const M = qn(b.Lt()), N = this.yn.mode === 3 ? TC : zC;
      return g.concat(N.map(((E) => x.Nt(w.Wt[E], M.Wt))));
    }), []);
    if (p.length === 0) return r;
    p.sort(((g, b) => Math.abs(g - d) - Math.abs(b - d)));
    const v = p[0];
    return r = u.Tn(v, c), r;
  }
}
function _a(s, t, i) {
  return Math.min(Math.max(s, t), i);
}
function zo(s, t, i) {
  return t - s <= i;
}
class DC extends Cs {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  et({ context: t, bitmapSize: i, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const u = Math.max(1, Math.floor(a));
    t.lineWidth = u, (function(c, d) {
      c.save(), c.lineWidth % 2 && c.translate(0.5, 0.5), d(), c.restore();
    })(t, (() => {
      const c = W(this.qt);
      if (c.yl) {
        t.strokeStyle = c.kl, Yn(t, c.Pl), t.beginPath();
        for (const d of c.Tl) {
          const p = Math.round(d.Rl * a);
          t.moveTo(p, -u), t.lineTo(p, i.height + u);
        }
        t.stroke();
      }
      if (c.Dl) {
        t.strokeStyle = c.Il, Yn(t, c.Vl), t.beginPath();
        for (const d of c.Bl) {
          const p = Math.round(d.Rl * r);
          t.moveTo(-u, p), t.lineTo(i.width + u, p);
        }
        t.stroke();
      }
    }));
  }
}
class AC {
  constructor(t) {
    this.Xt = new DC(), this.xt = !0, this.yt = t;
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
class RC {
  constructor(t) {
    this.Yh = new AC(t);
  }
  wr() {
    return this.Yh;
  }
}
const Kh = { Al: 4, Ll: 1e-4 };
function ya(s, t) {
  const i = 100 * (s - t) / t;
  return t < 0 ? -i : i;
}
function LC(s, t) {
  const i = ya(s.Je(), t), a = ya(s.Qe(), t);
  return new Ee(i, a);
}
function Rl(s, t) {
  const i = 100 * (s - t) / t + 100;
  return t < 0 ? -i : i;
}
function BC(s, t) {
  const i = Rl(s.Je(), t), a = Rl(s.Qe(), t);
  return new Ee(i, a);
}
function nu(s, t) {
  const i = Math.abs(s);
  if (i < 1e-15) return 0;
  const a = Math.log10(i + t.Ll) + t.Al;
  return s < 0 ? -a : a;
}
function Ll(s, t) {
  const i = Math.abs(s);
  if (i < 1e-15) return 0;
  const a = Math.pow(10, i - t.Al) - t.Ll;
  return s < 0 ? -a : a;
}
function jl(s, t) {
  if (s === null) return null;
  const i = nu(s.Je(), t), a = nu(s.Qe(), t);
  return new Ee(i, a);
}
function xa(s, t) {
  if (s === null) return null;
  const i = Ll(s.Je(), t), a = Ll(s.Qe(), t);
  return new Ee(i, a);
}
function Xh(s) {
  if (s === null) return Kh;
  const t = Math.abs(s.Qe() - s.Je());
  if (t >= 1 || t < 1e-15) return Kh;
  const i = Math.ceil(Math.abs(Math.log10(t))), a = Kh.Al + i;
  return { Al: a, Ll: 1 / Math.pow(10, a) };
}
class Zh {
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
    let u = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i)))), c = 0, d = this.Ol[0];
    for (; ; ) {
      const b = zo(u, r, 1e-14) && u > r + 1e-14, x = zo(u, a * d, 1e-14), S = zo(u, 1, 1e-14);
      if (!(b && x && S)) break;
      u /= d, d = this.Ol[++c % this.Ol.length];
    }
    if (u <= r + 1e-14 && (u = r), u = Math.max(1, u), this.Nl.length > 0 && (p = u, v = 1, g = 1e-14, Math.abs(p - v) < g)) for (c = 0, d = this.Nl[0]; zo(u, a * d, 1e-14) && u > r + 1e-14; ) u /= d, d = this.Nl[++c % this.Nl.length];
    var p, v, g;
    return u;
  }
}
class e0 {
  constructor(t, i, a, r) {
    this.Wl = [], this.Ki = t, this.zl = i, this.Hl = a, this.Ul = r;
  }
  Fl(t, i) {
    if (t < i) throw new Error("high < low");
    const a = this.Ki.$t(), r = (t - i) * this.$l() / a, u = new Zh(this.zl, [2, 2.5, 2]), c = new Zh(this.zl, [2, 2, 2.5]), d = new Zh(this.zl, [2.5, 2, 2]), p = [];
    return p.push(u.Fl(t, i, r), c.Fl(t, i, r), d.Fl(t, i, r)), (function(v) {
      if (v.length < 1) throw Error("array is empty");
      let g = v[0];
      for (let b = 1; b < v.length; ++b) v[b] < g && (g = v[b]);
      return g;
    })(p);
  }
  jl() {
    const t = this.Ki, i = t.Lt();
    if (i === null) return void (this.Wl = []);
    const a = t.$t(), r = this.Hl(a - 1, i), u = this.Hl(0, i), c = this.Ki.N().entireTextOnly ? this.ql() / 2 : 0, d = c, p = a - 1 - c, v = Math.max(r, u), g = Math.min(r, u);
    if (v === g) return void (this.Wl = []);
    const b = this.Fl(v, g);
    if (this.Yl(i, b, v, g, d, p), t.Kl() && this.Zl(b, g, v)) {
      const w = this.Ki.Gl();
      this.Xl(i, b, d, p, w, 2 * w);
    }
    const x = this.Wl.map(((w) => w.Jl)), S = this.Ki.Ql(x);
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
  Yl(t, i, a, r, u, c) {
    const d = this.Wl, p = this.Ki;
    let v = a % i;
    v += v < 0 ? i : 0;
    const g = a >= r ? 1 : -1;
    let b = null, x = 0;
    for (let S = a - v; S > r; S -= i) {
      const w = this.Ul(S, t, !0);
      b !== null && Math.abs(w - b) < this.$l() || w < u || w > c || (x < d.length ? (d[x].Rl = w, d[x].io = p.no(S), d[x].Jl = S) : d.push({ Rl: w, io: p.no(S), Jl: S }), x++, b = w, p.so() && (i = this.Fl(S * g, r)));
    }
    d.length = x;
  }
  Xl(t, i, a, r, u, c) {
    const d = this.Wl, p = this.eo(t, a, u, c), v = this.eo(t, r, -c, -u), g = this.Ul(0, t, !0) - this.Ul(i, t, !0);
    d.length > 0 && d[0].Rl - p.Rl < g / 2 && d.shift(), d.length > 0 && v.Rl - d[d.length - 1].Rl < g / 2 && d.pop(), d.unshift(p), d.push(v);
  }
  eo(t, i, a, r) {
    const u = (a + r) / 2, c = this.Hl(i + a, t), d = this.Hl(i + r, t), p = Math.min(c, d), v = Math.max(c, d), g = Math.max(0.1, this.Fl(v, p)), b = this.Hl(i + u, t), x = b - b % g, S = this.Ul(x, t, !0);
    return { io: this.Ki.no(x), Rl: S, Jl: x };
  }
  Zl(t, i, a) {
    let r = qn(this.Ki.ar());
    return this.Ki.so() && (r = xa(r, this.Ki.ro())), r.Je() - i < t && a - r.Qe() < t;
  }
}
function h1(s) {
  return s.slice().sort(((t, i) => W(t.ln()) - W(i.ln())));
}
var i0;
(function(s) {
  s[s.Normal = 0] = "Normal", s[s.Logarithmic = 1] = "Logarithmic", s[s.Percentage = 2] = "Percentage", s[s.IndexedTo100 = 3] = "IndexedTo100";
})(i0 || (i0 = {}));
const n0 = new l1(), s0 = new fu(100, 1);
class UC {
  constructor(t, i, a, r, u) {
    this.ho = 0, this.ao = null, this.rr = null, this.lo = null, this.oo = { _o: !1, uo: null }, this.co = !1, this.do = 0, this.fo = 0, this.po = new te(), this.vo = new te(), this.mo = [], this.wo = null, this.Mo = null, this.bo = null, this.So = null, this.xo = null, this.il = s0, this.Co = Xh(null), this.yo = t, this.yn = i, this.ko = a, this.Po = r, this.To = u, this.Ro = new e0(this, 100, this.Do.bind(this), this.Io.bind(this));
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
    t.hs !== void 0 && (this.yn.autoScale = t.hs), t._e !== void 0 && (this.yn.mode = t._e, t._e !== 2 && t._e !== 3 || (this.yn.autoScale = !0), this.oo._o = !1), i._e === 1 && t._e !== i._e && ((function(u, c) {
      if (u === null) return !1;
      const d = Ll(u.Je(), c), p = Ll(u.Qe(), c);
      return isFinite(d) && isFinite(p);
    })(this.rr, this.Co) ? (a = xa(this.rr, this.Co), a !== null && this.Oo(a)) : this.yn.autoScale = !0), t._e === 1 && t._e !== i._e && (a = jl(this.rr, this.Co), a !== null && this.Oo(a));
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
    return this.je() ? t = ya(t, i) : this.Lo() && (t = Rl(t, i)), this.Io(t, i);
  }
  Zo(t, i, a) {
    this.jo();
    const r = this.$o(), u = W(this.ar()), c = u.Je(), d = u.Qe(), p = this.Ho() - 1, v = this.zo(), g = p / (d - c), b = a === void 0 ? 0 : a.from, x = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < x; w++) {
      const M = t[w], N = M.Mt;
      if (isNaN(N)) continue;
      let E = N;
      S !== null && (E = S(M.Mt, i));
      const T = r + g * (E - c), R = v ? T : this.ho - 1 - T;
      M.ut = R;
    }
  }
  Xo(t, i, a) {
    this.jo();
    const r = this.$o(), u = W(this.ar()), c = u.Je(), d = u.Qe(), p = this.Ho() - 1, v = this.zo(), g = p / (d - c), b = a === void 0 ? 0 : a.from, x = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < x; w++) {
      const M = t[w];
      let N = M.jr, E = M.qr, T = M.Yr, R = M.Kr;
      S !== null && (N = S(M.jr, i), E = S(M.qr, i), T = S(M.Yr, i), R = S(M.Kr, i));
      let D = r + g * (N - c), V = v ? D : this.ho - 1 - D;
      M.Jo = V, D = r + g * (E - c), V = v ? D : this.ho - 1 - D, M.Qo = V, D = r + g * (T - c), V = v ? D : this.ho - 1 - D, M.t_ = V, D = r + g * (R - c), V = v ? D : this.ho - 1 - D, M.i_ = V;
    }
  }
  Tn(t, i) {
    const a = this.Do(t, i);
    return this.n_(a, i);
  }
  n_(t, i) {
    let a = t;
    return this.je() ? a = (function(r, u) {
      return u < 0 && (r = -r), r / 100 * u + u;
    })(a, i) : this.Lo() && (a = (function(r, u) {
      return r -= 100, u < 0 && (r = -r), r / 100 * u + u;
    })(a, i)), a;
  }
  Cl() {
    return this.mo;
  }
  Dt() {
    return this.Mo || (this.Mo = h1(this.mo)), this.Mo;
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
    const r = a * i, u = W(this.lo).Xe();
    u.nr(r), this.Oo(u, !0), this.bo = null;
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
        return this.f_(ya(t, i));
      case 3:
        return this.tl().format(Rl(t, i));
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
    return t = ya(t, i), this.f_(t, n0);
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
    this.wo !== null && (i = Math.round(this.wo.Kh())), this.il = s0, this.je() ? (this.il = n0, i = 100) : this.Lo() ? (this.il = new fu(100, 1), i = 100) : this.wo !== null && (this.il = this.wo.tl()), this.Ro = new e0(this, i, this.Do.bind(this), this.Io.bind(this)), this.Ro.jl();
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
    t = this.so() && t ? nu(t, this.Co) : t;
    const a = W(this.ar()), r = this.$o() + (this.Ho() - 1) * (t - a.Je()) / a.tr();
    return this.Ko(r);
  }
  Do(t, i) {
    if (this.jo(), this.Gi()) return 0;
    const a = this.Ko(t), r = W(this.ar()), u = r.Je() + r.tr() * ((a - this.$o()) / (this.Ho() - 1));
    return this.so() ? Ll(u, this.Co) : u;
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
    let r = 0, u = 0;
    for (const p of a) {
      if (!p.It()) continue;
      const v = p.Lt();
      if (v === null) continue;
      const g = p.la(t.Oa(), t.bi());
      let b = g && g.ar();
      if (b !== null) {
        switch (this.yn.mode) {
          case 1:
            b = jl(b, this.Co);
            break;
          case 2:
            b = LC(b, v.Wt);
            break;
          case 3:
            b = BC(b, v.Wt);
        }
        if (i = i === null ? b : i.Ss(W(b)), g !== null) {
          const x = g.lr();
          x !== null && (r = Math.max(r, x.above), u = Math.max(u, x.below));
        }
      }
    }
    if (this.Kl() && (r = Math.max(r, this.Gl()), u = Math.max(u, this.Gl())), r === this.do && u === this.fo || (this.do = r, this.fo = u, this.bo = null, this.Bo()), i !== null) {
      if (i.Je() === i.Qe()) {
        const p = 5 * this.M_();
        this.so() && (i = xa(i, this.Co)), i = new Ee(i.Je() - p, i.Qe() + p), this.so() && (i = jl(i, this.Co));
      }
      if (this.so()) {
        const p = xa(i, this.Co), v = Xh(p);
        if (c = v, d = this.Co, c.Al !== d.Al || c.Ll !== d.Ll) {
          const g = this.lo !== null ? xa(this.lo, this.Co) : null;
          this.Co = v, i = jl(p, v), g !== null && (this.lo = jl(g, v));
        }
      }
      this.Oo(i);
    } else this.rr === null && (this.Oo(new Ee(-0.5, 0.5)), this.Co = Xh(null));
    var c, d;
  }
  Go() {
    return this.je() ? ya : this.Lo() ? Rl : this.so() ? (t) => nu(t, this.Co) : null;
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
function a0(s) {
  return s instanceof mu;
}
class _d {
  constructor(t, i) {
    this.mo = [], this.x_ = /* @__PURE__ */ new Map(), this.ho = 0, this.C_ = 0, this.y_ = 1, this.Mo = null, this.k_ = null, this.P_ = !1, this.T_ = new te(), this.fa = [], this.ia = t, this.sn = i, this.R_ = new RC(this);
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
    return this.mo.filter(a0);
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
    we(a !== -1, "removeDataSource: invalid data source"), this.mo.splice(a, 1), i || this.mo.forEach(((c, d) => c._n(d)));
    const r = W(t.Ft()).cl();
    if (this.x_.has(r)) {
      const c = Ve(this.x_.get(r)), d = c.indexOf(t);
      d !== -1 && (c.splice(d, 1), c.length === 0 && this.x_.delete(r));
    }
    const u = t.Ft();
    u && u.Cl().indexOf(t) >= 0 && (u.r_(t), this.q_(u)), this.Y_();
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
    return this.Mo === null && (this.Mo = h1(this.mo)), this.Mo;
  }
  au() {
    const t = this.Dt(), i = this.sn.ou()?.lu, a = this.sn.N().hoveredSeriesOnTop, r = this.k_;
    if (r !== null && r.Kh === t && r._u === i && r.uu === a) return r.cu;
    const u = (function(c, d, p) {
      if (!p) return c;
      const v = c.indexOf(d);
      if (v === -1 || v === c.length - 1) return c;
      const g = [];
      for (let b = 0; b < c.length; b++) b !== v && g.push(c[b]);
      return g.push(c[v]), g;
    })(t, i, a);
    return this.k_ = { Kh: t, _u: i, uu: a, cu: u }, u;
  }
  du(t, i) {
    i = _a(i, 0, this.mo.length - 1);
    const a = this.mo.indexOf(t);
    we(a !== -1, "setSeriesOrder: invalid data source"), this.mo.splice(a, 1), this.mo.splice(i, 0, t), this.mo.forEach(((r, u) => r._n(u))), this.Y_();
    for (const r of [this.D_, this.V_]) r.e_(), r.dl();
    this.sn.mr();
  }
  Vt() {
    return this.Dt().filter(a0);
  }
  fu() {
    return this.T_;
  }
  pu() {
    return this.R_;
  }
  hl(t) {
    this.fa.push(new _C(t));
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
    if (r === null && (r = this.I_(i, this.sn.N().overlayPriceScales)), this.mo.splice(a, 0, t), !du(i)) {
      const u = this.x_.get(i) || [];
      u.push(t), this.x_.set(i, u);
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
    const a = { visible: !0, autoScale: !0, ...un(i) }, r = new UC(t, a, this.sn.N().layout, this.sn.N().localization, this.sn.Xi());
    return r.Wo(this.$t()), r;
  }
}
function Sd(s, t) {
  return t === null || s.se === 2 && t.se !== 2 || (t.se !== 2 || s.se === 2) && s.ne !== t.ne && s.ne < t.ne;
}
function d1(s) {
  return { te: s.te, ie: s.ie };
}
function HC(s) {
  return { ne: s.distance ?? 0, se: s.hitTestPriority ?? (s.itemType === "marker" ? 2 : 0), ee: s.itemType ?? "primitive", mu: s.cursorStyle, te: s.externalId };
}
function To(s) {
  return { lu: s.lu, wu: d1(s.Mu), mu: s.Mu.mu, ee: s.Mu.ee ?? "primitive" };
}
function qC(s, t, i, a) {
  let r = null;
  for (const u of s) {
    let c = u.Qs?.(t, i, a) ?? null;
    if (c === null) {
      const d = u.Tt(a);
      c = d !== null && d.Qs ? d.Qs(t, i) : null;
    }
    if (c !== null) {
      const d = { gu: u, Mu: c };
      (r === null || Sd(d.Mu, r.Mu)) && (r = d);
    }
  }
  return r;
}
function QC(s) {
  return s.jn !== void 0;
}
function f1(s, t, i) {
  const a = [s, ...s.Dt()].reverse(), r = (function(d, p, v) {
    let g, b, x;
    for (const M of d) {
      const N = M.Ja?.(p, v) ?? [];
      for (const E of N) {
        const T = HC(E);
        S = E.zOrder, w = g?.zOrder, (!w || S === "top" && w !== "top" || S === "normal" && w === "bottom" || E.zOrder === g?.zOrder && b !== void 0 && Sd(T, b) || E.zOrder === g?.zOrder && b === void 0) && (g = E, b = T, x = M);
      }
    }
    var S, w;
    return g && x && b ? { Mu: b, bu: g, lu: x } : null;
  })(a, t, i);
  if (r?.bu.zOrder === "top") return To(r);
  let u = null, c = null;
  for (const d of a) {
    if (r && r.lu === d && r.bu.zOrder !== "bottom" && !r.bu.isBackground) return u ?? To(r);
    if (QC(d)) {
      const p = qC(d.jn(s), t, i, s);
      if (p !== null) {
        const v = { lu: d, gu: p.gu, wu: d1(p.Mu), mu: p.Mu.mu, ee: p.Mu.ee ?? "primitive" };
        (u === null || Sd(p.Mu, c)) && (u = v, c = p.Mu);
      }
    }
    if (r && r.lu === d && r.bu.zOrder !== "bottom" && r.bu.isBackground) return u ?? To(r);
  }
  return u !== null ? u : r?.bu ? To(r) : null;
}
class $C {
  constructor(t, i, a = 50) {
    this.Vs = 0, this.Bs = 1, this.Es = 1, this.Ls = /* @__PURE__ */ new Map(), this.As = /* @__PURE__ */ new Map(), this.Su = t, this.xu = i, this.zs = a;
  }
  Cu(t) {
    const i = t.time, a = this.xu.cacheKey(i), r = this.Ls.get(a);
    if (r !== void 0) return r.yu;
    if (this.Vs === this.zs) {
      const c = this.As.get(this.Es);
      this.As.delete(this.Es), this.Ls.delete(Ve(c)), this.Es++, this.Vs--;
    }
    const u = this.Su(t);
    return this.Ls.set(a, { yu: u, Ws: this.Bs }), this.As.set(this.Bs, a), this.Vs++, this.Bs++, u;
  }
}
class Bl {
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
function l0(s, t) {
  return s === null || t === null ? s === t : s.Ge(t);
}
class VC {
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
      let u = this.Ru.get(r.timeWeight);
      u === void 0 && (u = [], this.Ru.set(r.timeWeight, u)), u.push({ index: a, time: r.time, weight: r.timeWeight, originalTime: r.originalTime });
    }
  }
  Eu(t, i, a, r, u) {
    const c = Math.ceil(i / t);
    return this.Ls !== null && this.Ls.Au === c && u === this.Ls.Lu && a === this.Ls.zu || (this.Ls = { Lu: u, zu: a, El: this.Ou(c, a, r), Au: c }), this.Ls.El;
  }
  Bu(t) {
    if (t === 0) return void this.Ru.clear();
    const i = [];
    this.Ru.forEach(((a, r) => {
      t <= a[0].index ? i.push(r) : a.splice(_s(a, t, ((u) => u.index < t)), 1 / 0);
    }));
    for (const a of i) this.Ru.delete(a);
  }
  Ou(t, i, a) {
    let r = [];
    const u = (c) => !i || a.has(c.index);
    for (const c of Array.from(this.Ru.keys()).sort(((d, p) => p - d))) {
      if (!this.Ru.get(c)) continue;
      const d = r;
      r = [];
      const p = d.length;
      let v = 0;
      const g = Ve(this.Ru.get(c)), b = g.length;
      let x = 1 / 0, S = -1 / 0;
      for (let w = 0; w < b; w++) {
        const M = g[w], N = M.index;
        for (; v < p; ) {
          const E = d[v], T = E.index;
          if (!(T < N && u(E))) {
            x = T;
            break;
          }
          v++, r.push(E), S = T, x = 1 / 0;
        }
        if (x - N >= t && N - S >= t && u(M)) r.push(M), S = N;
        else if (this.Du) return d;
      }
      for (; v < p; v++) u(d[v]) && r.push(d[v]);
    }
    return r;
  }
}
class Sa {
  constructor(t) {
    this.Nu = t;
  }
  Fu() {
    return this.Nu === null ? null : new Bl(Math.floor(this.Nu.Oa()), Math.ceil(this.Nu.bi()));
  }
  Wu() {
    return this.Nu;
  }
  static Hu() {
    return new Sa(null);
  }
}
function YC(s, t) {
  return s.weight > t.weight ? s : t;
}
class GC {
  constructor(t, i, a, r) {
    this.C_ = 0, this.Uu = null, this.$u = [], this.xo = null, this.So = null, this.ju = new VC(), this.qu = /* @__PURE__ */ new Map(), this.Yu = Sa.Hu(), this.Ku = !0, this.Zu = new te(), this.Gu = new te(), this.Xu = new te(), this.Ju = null, this.Qu = null, this.tc = /* @__PURE__ */ new Map(), this.nc = -1, this.sc = [], this.ec = 1, this.yn = i, this.Po = a, this.rc = i.rightOffset, this.hc = i.barSpacing, this.sn = t, this.ac(i), this.xu = r, this.lc(), this.ju.Iu(i.uniformDistribution), this.oc(), this._c();
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
    const a = _s(this.$u, this.xu.key(t), ((r, u) => this.xu.key(r.time) < u));
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
    const i = Math.round(t.from), a = Math.round(t.to), r = W(this.Sc()), u = W(this.xc());
    return { from: W(this.en(Math.max(r, i))), to: W(this.en(Math.min(u, a))) };
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
    if (this.Gi() || !Kl(t)) return 0;
    const i = this.Pc() + this.rc - t;
    return this.C_ - (i + 0.5) * this.hc - 1;
  }
  Tc(t, i) {
    const a = this.Pc(), r = i === void 0 ? 0 : i.from, u = i === void 0 ? t.length : i.to;
    for (let c = r; c < u; c++) {
      const d = t[c].wt, p = a + this.rc - d, v = this.C_ - (p + 0.5) * this.hc - 1;
      t[c]._t = v;
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
    const t = this.hc, i = 5 * (this.sn.N().layout.fontSize + 4) / 8 * (this.yn.tickMarkMaxCharacterLength || 8), a = Math.round(i / t), r = W(this.Ee()), u = Math.max(r.Oa(), r.Oa() - a), c = Math.max(r.bi(), r.bi() - a), d = this.ju.Eu(t, i, this.yn.ignoreWhitespaceIndices, this.tc, this.nc), p = this.Sc() + a, v = this.xc() - a, g = this.Lc(), b = this.yn.fixLeftEdge || g, x = this.yn.fixRightEdge || g;
    let S = 0;
    for (const w of d) {
      if (!(u <= w.index && w.index <= c)) continue;
      let M;
      S < this.sc.length ? (M = this.sc[S], M.coord = this.jt(w.index), M.label = this.zc(w), M.weight = w.weight) : (M = { needAlignCoordinate: !1, coord: this.jt(w.index), label: this.zc(w), weight: w.weight }, this.sc.push(M)), this.hc > i / 2 && !g ? M.needAlignCoordinate = !1 : M.needAlignCoordinate = b && w.index <= p || x && w.index >= v, S++;
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
    const a = this.Dc(t), r = this.fl(), u = r + i * (r / 10);
    this.Ms(u), this.yn.rightBarStaysOnScroll || this.gs(this.Ac() + (a - this.Dc(t)));
  }
  l_(t) {
    this.xo && this.d_(), this.So === null && this.Ju === null && (this.Gi() || (this.So = t, this.Wc()));
  }
  o_(t) {
    if (this.Ju === null) return;
    const i = _a(this.C_ - t, 0, this.C_), a = _a(this.C_ - W(this.So), 0, this.C_);
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
    this.sn.ps({ jc: (u) => (u - r) / i >= 1, qc: (u) => {
      const c = (u - r) / i;
      return c >= 1 ? t : a + (t - a) * c;
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
    this.Gc(new Bl(t, i + a), !0);
  }
  Jc(t) {
    const i = new Bl(t.from, t.to);
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
    if (this.Ku = !1, this.Gi()) return void this.sd(Sa.Hu());
    const t = this.Pc(), i = this.C_ / this.hc, a = this.rc + t, r = new Bl(a - i + 1, a);
    this.sd(new Sa(r));
  }
  yc() {
    const t = _a(this.hc, this.ed(), this.rd());
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
    return i === void 0 && (i = new $C(((a) => this.ld(a)), this.xu), this.qu.set(t.weight, i)), i.Cu(t);
  }
  ld(t) {
    return this.xu.formatTickmark(t, this.Po);
  }
  sd(t) {
    const i = this.Yu;
    this.Yu = t, l0(i.Fu(), this.Yu.Fu()) || this.Zu.p(), l0(i.Wu(), this.Yu.Wu()) || this.Gu.p(), this.nd();
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
      const u = Math.round(r), c = u < r;
      let d = 1;
      for (; ; ) c ? (yield u + d, yield u - d) : (yield u - d, yield u + d), d++;
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
var r0, o0, u0, Md, c0;
(function(s) {
  s[s.OnTouchEnd = 0] = "OnTouchEnd", s[s.OnNextTap = 1] = "OnNextTap";
})(r0 || (r0 = {}));
class KC {
  constructor(t, i, a) {
    this.od = [], this._d = [], this.ud = null, this.C_ = 0, this.dd = null, this.fd = new te(), this.pd = new te(), this.vd = null, this.md = t, this.yn = i, this.xu = a, this.To = new VN(this.yn.layout.colorParsers), this.wd = new $N(this), this.ia = new GC(this, i.timeScale, this.yn.localization, a), this.Ct = new PN(this, i.crosshair), this.Md = new OC(i.crosshair), i.addDefaultPane && (this.gd(0), this.od[0].O_(2)), this.bd = this.Sd(0), this.xd = this.Sd(1);
  }
  Pa() {
    this.Cd(xe.ys());
  }
  mr() {
    this.Cd(xe.Cs());
  }
  qa() {
    this.Cd(new xe(1));
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
    const u = this.Td(t, a);
    u !== null && (u.Ft.vr(i), this.fd.p());
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
    const a = this.od[t], r = this.od.reduce(((b, x) => b + x.z_()), 0), u = this.od.reduce(((b, x) => b + x.$t()), 0), c = u - 30 * (this.od.length - 1);
    i = Math.min(c, Math.max(30, i));
    const d = r / u, p = a.$t();
    a.O_(i * d);
    let v = i - p, g = this.od.length - 1;
    for (const b of this.od) if (b !== a) {
      const x = Math.min(c, Math.max(30, b.$t() - v / g));
      v -= b.$t() - x, g -= 1;
      const S = x * d;
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
  jd(t, i, a, r, u) {
    this.Ct.In(t, i);
    let c = NaN, d = this.ia.Rc(t, !0);
    const p = this.ia.Ee();
    p !== null && (d = Math.min(Math.max(p.Oa(), d), p.bi())), d = this.Ct.Fn(d);
    const v = r.Pn(), g = v.Lt();
    if (g !== null && (c = v.Tn(i, g)), c = this.Md.xl(c, d, r), this.Ct.An(d, c, r), this.qa(), !u) {
      const b = f1(r, t, i);
      this.kd(b && { lu: b.lu, wu: b.wu, mu: b.mu || null, ee: b.ee }), this.pd.p(this.Ct.Bt(), { x: t, y: i }, a);
    }
  }
  qd(t, i, a) {
    const r = a.Pn(), u = r.Lt(), c = r.Nt(t, W(u)), d = this.ia.vc(i, !0), p = this.ia.jt(W(d));
    this.jd(p, c, null, a, !0);
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
    const u = this.ia.Rn(0), c = this.ia.Pc(), d = this.ia.Ee();
    if (d !== null && r !== null && u !== null) {
      const p = d.ze(c), v = this.xu.key(r) > this.xu.key(u), g = t !== null && t > c && !v, b = this.ia.N().allowShiftVisibleRangeOnWhitespaceReplacement, x = p && (a !== void 0 || b) && this.ia.N().shiftVisibleRangeOnNewBar;
      if (g && !x) {
        const S = t - c;
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
      return a instanceof _d;
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
    const t = xe.Cs();
    t.us(), this.Cd(t);
  }
  tf(t) {
    const i = xe.Cs();
    i.fs(t), this.Cd(i);
  }
  ws() {
    const t = xe.Cs();
    t.ws(), this.Cd(t);
  }
  Ms(t) {
    const i = xe.Cs();
    i.Ms(t), this.Cd(i);
  }
  gs(t) {
    const i = xe.Cs();
    i.gs(t), this.Cd(i);
  }
  ps(t) {
    const i = xe.Cs();
    i.ps(t), this.Cd(i);
  }
  cs() {
    const t = xe.Cs();
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
    let u = !1;
    a.Cl().length === 0 && (u = this.Qd(a)), u || this.Pa();
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
      const u = this.vd.rf.get(t);
      if (u !== void 0) return u;
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
    const i = new _d(this.ia, this);
    this.od.push(i);
    const a = t ?? this.od.length - 1, r = xe.ys();
    return r.es(a, { rs: 0, hs: !0 }), this.Cd(r), i;
  }
  gd(t) {
    return we(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.od.length, t)) < this.od.length ? this.od[t] : this.lf(t);
  }
  sf(t) {
    return this.od.findIndex(((i) => i.U_().includes(t)));
  }
  Ld(t, i) {
    const a = new xe(i);
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
    i.s_(t, r), du(r) || t.vr(t.N());
  }
  Sd(t) {
    const i = this.yn.layout;
    return i.background.type === "gradient" ? t === 0 ? i.background.topColor : i.background.bottomColor : i.background.color;
  }
  Qd(t) {
    return !t.H_() && t.Cl().length === 0 && this.od.length > 1 && (this.od.splice(this.hf(t), 1), this.Pa(), !0);
  }
}
function m1(s) {
  if (s >= 1) return 0;
  let t = 0;
  for (; t < 8; t++) {
    const i = Math.round(s);
    if (Math.abs(i - s) < 1e-8) return t;
    s *= 10;
  }
  return t;
}
function Nd(s) {
  return !Ea(s) && !rr(s);
}
function p1(s) {
  return Ea(s);
}
(function(s) {
  s[s.Disabled = 0] = "Disabled", s[s.Continuous = 1] = "Continuous", s[s.OnDataUpdate = 2] = "OnDataUpdate";
})(o0 || (o0 = {})), (function(s) {
  s[s.LastBar = 0] = "LastBar", s[s.LastVisible = 1] = "LastVisible";
})(u0 || (u0 = {})), (function(s) {
  s.Solid = "solid", s.VerticalGradient = "gradient";
})(Md || (Md = {})), (function(s) {
  s[s.Year = 0] = "Year", s[s.Month = 1] = "Month", s[s.DayOfMonth = 2] = "DayOfMonth", s[s.Time = 3] = "Time", s[s.TimeWithSeconds = 4] = "TimeWithSeconds";
})(c0 || (c0 = {}));
const h0 = (s) => s.getUTCFullYear();
function XC(s, t, i) {
  return t.replace(/yyyy/g, ((a) => cn(h0(a), 4))(s)).replace(/yy/g, ((a) => cn(h0(a) % 100, 2))(s)).replace(/MMMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "long" }))(s, i)).replace(/MMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "short" }))(s, i)).replace(/MM/g, ((a) => cn(((r) => r.getUTCMonth() + 1)(a), 2))(s)).replace(/dd/g, ((a) => cn(((r) => r.getUTCDate())(a), 2))(s));
}
class v1 {
  constructor(t = "yyyy-MM-dd", i = "default") {
    this._f = t, this.uf = i;
  }
  Cu(t) {
    return XC(t, this._f, this.uf);
  }
}
class ZC {
  constructor(t) {
    this.cf = t || "%h:%m:%s";
  }
  Cu(t) {
    return this.cf.replace("%h", cn(t.getUTCHours(), 2)).replace("%m", cn(t.getUTCMinutes(), 2)).replace("%s", cn(t.getUTCSeconds(), 2));
  }
}
const WC = { df: "yyyy-MM-dd", ff: "%h:%m:%s", pf: " ", vf: "default" };
class IC {
  constructor(t = {}) {
    const i = { ...WC, ...t };
    this.mf = new v1(i.df, i.vf), this.wf = new ZC(i.ff), this.Mf = i.pf;
  }
  Cu(t) {
    return `${this.mf.Cu(t)}${this.Mf}${this.wf.Cu(t)}`;
  }
}
function Oo(s) {
  return 60 * s * 60 * 1e3;
}
function Wh(s) {
  return 60 * s * 1e3;
}
const Do = [{ gf: (d0 = 1, 1e3 * d0), bf: 10 }, { gf: Wh(1), bf: 20 }, { gf: Wh(5), bf: 21 }, { gf: Wh(30), bf: 22 }, { gf: Oo(1), bf: 30 }, { gf: Oo(3), bf: 31 }, { gf: Oo(6), bf: 32 }, { gf: Oo(12), bf: 33 }];
var d0;
function f0(s, t) {
  if (s.getUTCFullYear() !== t.getUTCFullYear()) return 70;
  if (s.getUTCMonth() !== t.getUTCMonth()) return 60;
  if (s.getUTCDate() !== t.getUTCDate()) return 50;
  for (let i = Do.length - 1; i >= 0; --i) if (Math.floor(t.getTime() / Do[i].gf) !== Math.floor(s.getTime() / Do[i].gf)) return Do[i].bf;
  return 0;
}
function Ih(s) {
  let t = s;
  if (rr(s) && (t = nf(s)), !Nd(t)) throw new Error("time must be of type BusinessDay");
  const i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
  return { Sf: Math.round(i.getTime() / 1e3), xf: t };
}
function m0(s) {
  if (!p1(s)) throw new Error("time must be of type isUTCTimestamp");
  return { Sf: s };
}
function nf(s) {
  const t = new Date(s);
  if (isNaN(t.getTime())) throw new Error(`Invalid date string=${s}, expected format=yyyy-mm-dd`);
  return { day: t.getUTCDate(), month: t.getUTCMonth() + 1, year: t.getUTCFullYear() };
}
function p0(s) {
  rr(s.time) && (s.time = nf(s.time));
}
class v0 {
  options() {
    return this.yn;
  }
  setOptions(t) {
    this.yn = t, this.updateFormatter(t.localization);
  }
  preprocessData(t) {
    Array.isArray(t) ? (function(i) {
      i.forEach(p0);
    })(t) : p0(t);
  }
  createConverterToInternalObj(t) {
    return W((function(i) {
      return i.length === 0 ? null : Nd(i[0].time) || rr(i[0].time) ? Ih : m0;
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
    return p1(i = t) ? m0(i) : Nd(i) ? Ih(i) : Ih(nf(i));
    var i;
  }
  updateFormatter(t) {
    if (!this.yn) return;
    const i = t.dateFormat;
    this.yn.timeScale.timeVisible ? this.Cf = new IC({ df: i, ff: this.yn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m", pf: "   ", vf: t.locale }) : this.Cf = new v1(i, t.locale);
  }
  formatHorzItem(t) {
    const i = t;
    return this.Cf.Cu(new Date(1e3 * i.Sf));
  }
  formatTickmark(t, i) {
    const a = (function(u, c, d) {
      switch (u) {
        case 0:
        case 10:
          return c ? d ? 4 : 3 : 2;
        case 20:
        case 21:
        case 22:
        case 30:
        case 31:
        case 32:
        case 33:
          return c ? 3 : 2;
        case 50:
          return 2;
        case 60:
          return 1;
        case 70:
          return 0;
      }
    })(t.weight, this.yn.timeScale.timeVisible, this.yn.timeScale.secondsVisible), r = this.yn.timeScale;
    if (r.tickMarkFormatter !== void 0) {
      const u = r.tickMarkFormatter(t.originalTime, a, i.locale);
      if (u !== null) return u;
    }
    return (function(u, c, d) {
      const p = {};
      switch (c) {
        case 0:
          p.year = "numeric";
          break;
        case 1:
          p.month = "short";
          break;
        case 2:
          p.day = "numeric";
          break;
        case 3:
          p.hour12 = !1, p.hour = "2-digit", p.minute = "2-digit";
          break;
        case 4:
          p.hour12 = !1, p.hour = "2-digit", p.minute = "2-digit", p.second = "2-digit";
      }
      const v = u.xf === void 0 ? new Date(1e3 * u.Sf) : new Date(Date.UTC(u.xf.year, u.xf.month - 1, u.xf.day));
      return new Date(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()).toLocaleString(d, p);
    })(t.time, a, i.locale);
  }
  maxTickMarkWeight(t) {
    let i = t.reduce(YC, t[0]).weight;
    return i > 30 && i < 50 && (i = 30), i;
  }
  fillWeightsForPoints(t, i) {
    (function(a, r = 0) {
      if (a.length === 0) return;
      let u = r === 0 ? null : a[r - 1].time.Sf, c = u !== null ? new Date(1e3 * u) : null, d = 0;
      for (let p = r; p < a.length; ++p) {
        const v = a[p], g = new Date(1e3 * v.time.Sf);
        c !== null && (v.timeWeight = f0(g, c)), d += v.time.Sf - (u || v.time.Sf), u = v.time.Sf, c = g;
      }
      if (r === 0 && a.length > 1) {
        const p = Math.ceil(d / (a.length - 1)), v = new Date(1e3 * (a[0].time.Sf - p));
        a[0].timeWeight = f0(new Date(1e3 * a[0].time.Sf), v);
      }
    })(t, i);
  }
  static yf(t) {
    return Pe({ localization: { dateFormat: "dd MMM 'yy" } }, t ?? {});
  }
}
const ka = typeof window < "u";
function g0() {
  return !!ka && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function Fh() {
  return !!ka && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function FC(s, t) {
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
function Cd(s) {
  return s + s % 2;
}
function JC(s) {
  ka && window.chrome !== void 0 && s.addEventListener("mousedown", ((t) => {
    if (t.button === 1) return t.preventDefault(), !1;
  }));
}
class pu {
  constructor(t, i, a) {
    this.kf = 0, this.Pf = null, this.Tf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Rf = 0, this.Df = null, this.If = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Vf = null, this.Bf = !1, this.Ef = null, this.Af = null, this.Lf = !1, this.zf = !1, this.Of = !1, this.Nf = null, this.Ff = null, this.Wf = null, this.Hf = null, this.Uf = null, this.$f = null, this.jf = null, this.qf = 0, this.Yf = !1, this.Kf = !1, this.Zf = !1, this.Gf = 0, this.Xf = null, this.Jf = !Fh(), this.Qf = (r) => {
      this.tp(r);
    }, this.ip = (r) => {
      if (this.np(r)) {
        const u = this.sp(r);
        if (++this.Rf, this.Df && this.Rf > 1) {
          const { ep: c } = this.rp(Ri(r), this.If);
          c < 30 && !this.Of && this.hp(u, this.lp.ap), this.op();
        }
      } else {
        const u = this.sp(r);
        if (++this.kf, this.Pf && this.kf > 1) {
          const { ep: c } = this.rp(Ri(r), this.Tf);
          c < 5 && !this.zf && this._p(u, this.lp.up), this.cp();
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
    const i = Jh(t.changedTouches, W(this.Xf));
    if (i === null || (this.Gf = Ao(t), this.jf !== null) || this.Kf) return;
    this.Yf = !0;
    const a = this.rp(Ri(i), W(this.Af)), { bp: r, Sp: u, ep: c } = a;
    if (this.Lf || !(c < 5)) {
      if (!this.Lf) {
        const d = 0.5 * r, p = u >= d && !this.yn.xp(), v = d > u && !this.yn.Cp();
        p || v || (this.Kf = !0), this.Lf = !0, this.Of = !0, this.pp(), this.op();
      }
      if (!this.Kf) {
        const d = this.sp(t, i);
        this.hp(d, this.lp.yp), pa(t);
      }
    }
  }
  kp(t) {
    if (t.button !== 0) return;
    const i = this.rp(Ri(t), W(this.Ef)), { ep: a } = i;
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
    let i = Jh(t.changedTouches, W(this.Xf));
    if (i === null && t.touches.length === 0 && (i = t.changedTouches[0]), i === null) return;
    this.Xf = null, this.Gf = Ao(t), this.pp(), this.Af = null, this.$f && (this.$f(), this.$f = null);
    const a = this.sp(t, i);
    if (this.hp(a, this.lp.Rp), ++this.Rf, this.Df && this.Rf > 1) {
      const { ep: r } = this.rp(Ri(i), this.If);
      r < 30 && !this.Of && this.hp(a, this.lp.ap), this.op();
    } else this.Of || (this.hp(a, this.lp.Dp), this.lp.Dp && pa(t));
    this.Rf === 0 && pa(t), t.touches.length === 0 && this.Bf && (this.Bf = !1, pa(t));
  }
  tp(t) {
    if (t.button !== 0) return;
    const i = this.sp(t);
    if (this.Ef = null, this.Zf = !1, this.Uf && (this.Uf(), this.Uf = null), g0() && this.dp.ownerDocument.documentElement.removeEventListener("mouseleave", this.Qf), !this.np(t)) if (this._p(i, this.lp.Ip), ++this.kf, this.Pf && this.kf > 1) {
      const { ep: a } = this.rp(Ri(t), this.Tf);
      a < 5 && !this.zf && this._p(i, this.lp.up), this.cp();
    } else this.zf || this._p(i, this.lp.Vp);
  }
  pp() {
    this.Vf !== null && (clearTimeout(this.Vf), this.Vf = null);
  }
  Bp(t) {
    if (this.Xf !== null) return;
    const i = t.changedTouches[0];
    this.Xf = i.identifier, this.Gf = Ao(t);
    const a = this.dp.ownerDocument.documentElement;
    this.Of = !1, this.Lf = !1, this.Kf = !1, this.Af = Ri(i), this.$f && (this.$f(), this.$f = null);
    {
      const u = this.gp.bind(this), c = this.Tp.bind(this);
      this.$f = () => {
        a.removeEventListener("touchmove", u), a.removeEventListener("touchend", c);
      }, a.addEventListener("touchmove", u, { passive: !1 }), a.addEventListener("touchend", c, { passive: !1 }), this.pp(), this.Vf = setTimeout(this.Ep.bind(this, t), 240);
    }
    const r = this.sp(t, i);
    this.hp(r, this.lp.Ap), this.Df || (this.Rf = 0, this.Df = setTimeout(this.op.bind(this), 500), this.If = Ri(i));
  }
  Lp(t) {
    if (t.button !== 0) return;
    const i = this.dp.ownerDocument.documentElement;
    g0() && i.addEventListener("mouseleave", this.Qf), this.zf = !1, this.Ef = Ri(t), this.Uf && (this.Uf(), this.Uf = null);
    {
      const r = this.kp.bind(this), u = this.tp.bind(this);
      this.Uf = () => {
        i.removeEventListener("mousemove", r), i.removeEventListener("mouseup", u);
      }, i.addEventListener("mousemove", r), i.addEventListener("mouseup", u);
    }
    if (this.Zf = !0, this.np(t)) return;
    const a = this.sp(t);
    this._p(a, this.lp.zp), this.Pf || (this.kf = 0, this.Pf = setTimeout(this.cp.bind(this), 500), this.Tf = Ri(t));
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
    Fh() && (this.Wf = () => {
      this.dp.removeEventListener("dblclick", this.ip);
    }, this.dp.addEventListener("dblclick", this.ip)), this.dp.addEventListener("mouseleave", this.Np.bind(this)), this.dp.addEventListener("touchstart", this.Bp.bind(this), { passive: !0 }), JC(this.dp), this.dp.addEventListener("mousedown", this.Lp.bind(this)), this.Fp(), this.dp.addEventListener("touchmove", (() => {
    }), { passive: !1 });
  }
  Fp() {
    this.lp.Wp === void 0 && this.lp.Hp === void 0 && this.lp.Up === void 0 || (this.dp.addEventListener("touchstart", ((t) => this.$p(t.touches)), { passive: !0 }), this.dp.addEventListener("touchmove", ((t) => {
      if (t.touches.length === 2 && this.jf !== null && this.lp.Hp !== void 0) {
        const i = b0(t.touches[0], t.touches[1]) / this.qf;
        this.lp.Hp(this.jf, i), pa(t);
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
    this.jf = { _t: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2, ut: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2 }, this.qf = b0(t[0], t[1]), this.lp.Wp !== void 0 && this.lp.Wp(), this.pp();
  }
  jp() {
    this.jf !== null && (this.jf = null, this.lp.Up !== void 0 && this.lp.Up());
  }
  Np(t) {
    if (this.Hf && this.Hf(), this.np(t) || !this.Jf) return;
    const i = this.sp(t);
    this._p(i, this.lp.Yp), this.Jf = !Fh();
  }
  Ep(t) {
    const i = Jh(t.touches, W(this.Xf));
    if (i === null) return;
    const a = this.sp(t, i);
    this.hp(a, this.lp.Kp), this.Of = !0, this.Bf = !0;
  }
  np(t) {
    return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : Ao(t) < this.Gf + 500;
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
      t.type !== "touchstart" && pa(t);
    } };
  }
}
function b0(s, t) {
  const i = s.clientX - t.clientX, a = s.clientY - t.clientY;
  return Math.sqrt(i * i + a * a);
}
function pa(s) {
  s.cancelable && s.preventDefault();
}
function Ri(s) {
  return { _t: s.pageX, ut: s.pageY };
}
function Ao(s) {
  return s.timeStamp || performance.now();
}
function Jh(s, t) {
  for (let i = 0; i < s.length; ++i) if (s[i].identifier === t) return s[i];
  return null;
}
class PC {
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
    return $t({ width: this.ev.cv().width, height: 1 });
  }
  dv() {
    return $t({ width: this.ev.dv().width, height: 1 * window.devicePixelRatio });
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
    const u = { wp: this.mv.bind(this), Yp: this.wv.bind(this), zp: this.Mv.bind(this), Ap: this.Mv.bind(this), Pp: this.gv.bind(this), yp: this.gv.bind(this), Ip: this.bv.bind(this), Rp: this.bv.bind(this) };
    this.tv = new pu(a, u, { xp: () => !1, Cp: () => !0 }), this.Qp = { vv: a, pv: t };
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
    const a = (t.pageY - i.xv) * i.Pv, r = _a(i.Cv + a, i.Tv, i.yv);
    this.ev.Sv().O_(r), this.hv.Sv().O_(i.kv - r), this.sv.Qt().Pa();
  }
  bv(t) {
    this.nv !== null && this.Qp !== null && (this.nv = null, this.Qp.pv.style.display = "none");
  }
}
function Ph(s, t) {
  return s.Rv - t.Rv;
}
function td(s, t, i) {
  const a = (s.Rv - t.Rv) / (s.wt - t.wt);
  return Math.sign(a) * Math.min(Math.abs(a), i);
}
class tj {
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
    const r = td(this.Dv, this.Iv, this.Ov), u = Ph(this.Dv, this.Iv), c = [r], d = [u];
    if (a += u, this.Vv !== null) {
      const v = td(this.Iv, this.Vv, this.Ov);
      if (Math.sign(v) === Math.sign(r)) {
        const g = Ph(this.Iv, this.Vv);
        if (c.push(v), d.push(g), a += g, this.Bv !== null) {
          const b = td(this.Vv, this.Bv, this.Ov);
          if (Math.sign(b) === Math.sign(r)) {
            const x = Ph(this.Vv, this.Bv);
            c.push(b), d.push(x), a += x;
          }
        }
      }
    }
    let p = 0;
    for (let v = 0; v < c.length; ++v) p += d[v] / a * c[v];
    Math.abs(p) < this.zv || (this.Ev = { Rv: t, wt: i }, this.Lv = p, this.Av = (function(v, g) {
      const b = Math.log(g);
      return Math.log(1 * b / -v) / b;
    })(Math.abs(p), this.Nv));
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
class ej {
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
function Ss(s, t) {
  const i = W(s.ownerDocument).createElement("canvas");
  s.appendChild(i);
  const a = UN(i, { options: { allowResizeObserver: !0 }, transform: (r, u) => ({ width: Math.max(r.width, u.width), height: Math.max(r.height, u.height) }) });
  return a.resizeCanvasElement(t), a;
}
function Ms(s) {
  s.width = 1, s.height = 1, s.getContext("2d")?.clearRect(0, 0, 1, 1);
}
function jd(s, t, i, a) {
  s.qh && s.qh(t, i, a);
}
function $o(s, t, i, a) {
  s.st(t, i, a);
}
function Ed(s, t, i, a) {
  const r = s(i, a);
  for (const u of r) {
    const c = u.Tt(a);
    c !== null && t(c);
  }
}
function ed(s, t) {
  return (i) => (function(a) {
    return a.Ft !== void 0;
  })(i) ? (i.Ft()?.cl() ?? "") !== t ? [] : i.Ga?.(s) ?? [] : [];
}
function y0(s, t, i, a) {
  if (!s.length) return;
  let r = 0;
  const u = s[0].$t(a, !0);
  let c = t === 1 ? i / 2 - (s[0].Hi() - u / 2) : s[0].Hi() - u / 2 - i / 2;
  c = Math.max(0, c);
  for (let d = 1; d < s.length; d++) {
    const p = s[d], v = s[d - 1], g = v.$t(a, !1), b = p.Hi(), x = v.Hi();
    if (t === 1 ? b > x - g : b < x + g) {
      const S = x - g * t;
      p.Ui(S);
      const w = S - t * g / 2;
      if ((t === 1 ? w < 0 : w > i) && c > 0) {
        const M = t === 1 ? -1 - w : w - i, N = Math.min(M, c);
        for (let E = r; E < s.length; E++) s[E].Ui(s[E].Hi() + t * N);
        c -= N;
      }
    } else r = d, c = t === 1 ? x - g - b : b - (x + g);
  }
}
class x0 {
  constructor(t, i, a, r) {
    this.Ki = null, this.Qv = null, this.tm = !1, this.im = new tu(200), this.nm = null, this.sm = 0, this.rm = !1, this.hm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.lm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.yt = t, this.yn = i, this.ko = i.layout, this.wd = a, this.om = r === "left", this._m = ed("normal", r), this.um = ed("top", r), this.dm = ed("bottom", r), this.lv = document.createElement("div"), this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.lv.style.width = "25px", this.lv.style.left = "0", this.lv.style.position = "relative", this.fm = Ss(this.lv, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const u = this.fm.canvasElement;
    u.style.position = "absolute", u.style.zIndex = "1", u.style.left = "0", u.style.top = "0", this.pm = Ss(this.lv, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const c = this.pm.canvasElement;
    c.style.position = "absolute", c.style.zIndex = "2", c.style.left = "0", c.style.top = "0";
    const d = { zp: this.Mv.bind(this), Ap: this.Mv.bind(this), Pp: this.gv.bind(this), yp: this.gv.bind(this), Op: this.vm.bind(this), Ip: this.bv.bind(this), Rp: this.bv.bind(this), up: this.wm.bind(this), ap: this.wm.bind(this), wp: this.Mm.bind(this), Yp: this.wv.bind(this) };
    this.tv = new pu(this.pm.canvasElement, d, { xp: () => !this.yn.handleScroll.vertTouchDrag, Cp: () => !0 });
  }
  m() {
    this.tv.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), Ms(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), Ms(this.fm.canvasElement), this.fm.dispose(), this.Ki !== null && this.Ki.a_().u(this), this.Ki = null;
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
    const u = this.xm();
    for (let v = u.length; v--; ) {
      const g = this.im.Ii(a, u[v].ri());
      g > t && (t = g);
    }
    const c = this.Ki.Lt();
    if (c !== null && this.Qv !== null && (d = this.yn.crosshair).mode !== 2 && d.horzLine.visible && d.horzLine.labelVisible) {
      const v = this.Ki.Tn(1, c), g = this.Ki.Tn(this.Qv.height - 2, c);
      t = Math.max(t, this.im.Ii(a, this.Ki.Ji(Math.floor(Math.min(v, g)) + 0.11111111111111, c)), this.im.Ii(a, this.Ki.Ji(Math.ceil(Math.max(v, g)) - 0.11111111111111, c)));
    }
    var d;
    a.restore();
    const p = t || 34;
    return Cd(Math.ceil(i.S + i.C + i.V + i.B + 5 + p));
  }
  Cm(t) {
    this.Qv !== null && ps(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`);
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
      const r = ws(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u), this.Rm(u);
      })), this.yt.Dm(r, this.dm), this.Im(r), this.yt.Dm(r, this._m), this.Vm(r));
    }
    this.pm.applySuggestedBitmapSize();
    const a = ws(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.Bm(a), this.yt.Dm(a, this.um));
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, i, a, r) {
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const c = this.pm.canvasElement;
      t.drawImage(c, i, a);
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
        const u = a[r].qn(this.yt.Sv(), i);
        for (let c = 0; c < u.length; c++) t.push(u[c]);
      }
    })(this.yt.Sv().Dt()), t;
  }
  Tm({ context: t, bitmapSize: i }) {
    const { width: a, height: r } = i, u = this.yt.Sv().Qt(), c = u.$(), d = u.ef();
    c === d ? cu(t, 0, 0, a, r, c) : i1(t, 0, 0, a, r, c, d);
  }
  Rm({ context: t, bitmapSize: i, horizontalPixelRatio: a }) {
    if (this.Qv === null || this.Ki === null || !this.Ki.N().borderVisible) return;
    t.fillStyle = this.Ki.N().borderColor;
    const r = Math.max(1, Math.floor(this.gm().S * a));
    let u;
    u = this.om ? i.width - r : 0, t.fillRect(u, 0, r, i.height);
  }
  Im(t) {
    if (this.Qv === null || this.Ki === null) return;
    const i = this.Ki.El(), a = this.Ki.N(), r = this.gm(), u = this.om ? this.Qv.width - r.C : 0;
    a.borderVisible && a.ticksVisible && t.useBitmapCoordinateSpace((({ context: c, horizontalPixelRatio: d, verticalPixelRatio: p }) => {
      c.fillStyle = a.borderColor;
      const v = Math.max(1, Math.floor(p)), g = Math.floor(0.5 * p), b = Math.round(r.C * d);
      c.beginPath();
      for (const x of i) c.rect(Math.floor(u * d), Math.round(x.Rl * p) - g, b, v);
      c.fill();
    })), t.useMediaCoordinateSpace((({ context: c }) => {
      c.font = this.Sm(), c.fillStyle = a.textColor ?? this.ko.textColor, c.textAlign = this.om ? "right" : "left", c.textBaseline = "middle";
      const d = this.om ? Math.round(u - r.V) : Math.round(u + r.C + r.V), p = i.map(((v) => this.im.Di(c, v.io)));
      for (let v = i.length; v--; ) {
        const g = i[v];
        c.fillText(g.io, d, g.Rl + p[v]);
      }
    }));
  }
  Pm() {
    if (this.Qv === null || this.Ki === null) return;
    let t = this.Qv.height / 2;
    const i = [], a = this.Ki.Dt().slice(), r = this.yt.Sv(), u = this.gm();
    this.Ki === r.Gs() && this.yt.Sv().Dt().forEach(((p) => {
      r.Zs(p) && a.push(p);
    }));
    const c = this.Ki.Cl()[0], d = this.Ki;
    a.forEach(((p) => {
      const v = p.qn(r, d);
      v.forEach(((g) => {
        g.$i() && g.Wi() === null && (g.Ui(null), i.push(g));
      })), c === p && v.length > 0 && (t = v[0].Ei());
    })), this.Ki.N().alignLabels && this.Am(i, u, t);
  }
  Am(t, i, a) {
    if (this.Qv === null) return;
    const r = t.filter(((c) => c.Ei() <= a)), u = t.filter(((c) => c.Ei() > a));
    r.sort(((c, d) => d.Ei() - c.Ei())), r.length && u.length && u.push(r[0]), u.sort(((c, d) => c.Ei() - d.Ei()));
    for (const c of t) {
      const d = Math.floor(c.$t(i) / 2), p = c.Ei();
      p > -d && p < d && c.Ui(d), p > this.Qv.height - d && p < this.Qv.height + d && c.Ui(this.Qv.height - d);
    }
    y0(r, 1, this.Qv.height, i), y0(u, -1, this.Qv.height, i);
  }
  Vm(t) {
    if (this.Qv === null) return;
    const i = this.xm(), a = this.gm(), r = this.om ? "right" : "left";
    i.forEach(((u) => {
      u.ji() && u.Tt(W(this.Ki)).st(t, a, this.im, r);
    }));
  }
  Bm(t) {
    if (this.Qv === null || this.Ki === null) return;
    const i = this.yt.am().Qt(), a = [], r = this.yt.Sv(), u = i.Rd().qn(r, this.Ki);
    u.length && a.push(u);
    const c = this.gm(), d = this.om ? "right" : "left";
    a.forEach(((p) => {
      p.forEach(((v) => {
        v.Tt(W(this.Ki)).st(t, c, this.im, d);
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
    return Po(this.ko.fontSize, this.ko.fontFamily);
  }
}
function ij(s, t) {
  return s.Ka?.(t) ?? [];
}
function w0(s, t) {
  return s.jn?.(t) ?? [];
}
function _0(s, t) {
  return s.cn?.(t) ?? [];
}
function nj(s, t) {
  return s.ja?.(t) ?? [];
}
class sf {
  constructor(t, i) {
    this.Qv = $t({ width: 0, height: 0 }), this.Lm = null, this.zm = null, this.Om = null, this.Nm = null, this.Fm = !1, this.Wm = new te(), this.Hm = new te(), this.Um = 0, this.$m = !1, this.jm = null, this.qm = !1, this.Ym = null, this.Km = null, this.rm = !1, this.hm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.lm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.qv = t, this.Zm = i, this.Zm.fu().i(this.Gm.bind(this), this, !0), this.Xm = document.createElement("td"), this.Xm.style.padding = "0", this.Xm.style.position = "relative";
    const a = document.createElement("div");
    a.style.width = "100%", a.style.height = "100%", a.style.position = "relative", a.style.overflow = "hidden", this.Jm = document.createElement("td"), this.Jm.style.padding = "0", this.Qm = document.createElement("td"), this.Qm.style.padding = "0", this.Xm.appendChild(a), this.fm = Ss(a, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const r = this.fm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "1", r.style.left = "0", r.style.top = "0", this.pm = Ss(a, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const u = this.pm.canvasElement;
    u.style.position = "absolute", u.style.zIndex = "2", u.style.left = "0", u.style.top = "0", this.av = document.createElement("tr"), this.av.appendChild(this.Jm), this.av.appendChild(this.Xm), this.av.appendChild(this.Qm), this.tw(), this.tv = new pu(this.pm.canvasElement, this, { xp: () => this.jm === null && !this.qv.N().handleScroll.vertTouchDrag, Cp: () => this.jm === null && !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.Lm !== null && this.Lm.m(), this.zm !== null && this.zm.m(), this.Om = null, this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), Ms(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), Ms(this.fm.canvasElement), this.fm.dispose(), this.Zm !== null && (this.Zm.fu().u(this), this.Zm.m()), this.tv.m();
  }
  Sv() {
    return W(this.Zm);
  }
  iw(t) {
    this.Zm !== null && this.Zm.fu().u(this), this.Zm = t, this.Zm !== null && this.Zm.fu().i(sf.prototype.Gm.bind(this), this, !0), this.tw(), this.qv.rv().indexOf(this) === this.qv.rv().length - 1 ? (this.Om = this.Om ?? new ej(this.Xm, this.qv), this.Om.kt()) : (this.Om?.Kv(), this.Om = null);
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
      const r = W(this.Ym), u = r.x + (i - this.jm.x), c = r.y + (a - this.jm.y);
      this.rw(u, c, t);
    }
  }
  Rp(t) {
    this.am().N().trackingMode.exitMode === 0 && (this.qm = !0), this.pw(), this._w(t);
  }
  Qs(t, i) {
    const a = this.Zm;
    return a === null ? null : f1(a, t, i);
  }
  mw(t, i) {
    W(i === "left" ? this.Lm : this.zm).Cm($t({ width: t, height: this.Qv.height }));
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    ps(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.Xm.style.width = t.width + "px", this.Xm.style.height = t.height + "px");
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
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const c = this.pm.canvasElement;
      t !== null && t.drawImage(c, i, a);
    }
  }
  km(t) {
    if (t === 0 || this.Zm === null) return;
    t > 1 && this.ww(), this.Lm !== null && this.Lm.km(t), this.zm !== null && this.zm.km(t);
    const i = { colorSpace: this.qv.N().layout.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = ws(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u);
      })), this.Zm && (this.Mw(r, ij), this.gw(r), this.Mw(r, w0), this.Mw(r, _0)));
    }
    this.pm.applySuggestedBitmapSize();
    const a = ws(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.bw(a), this.Mw(a, nj), this.Mw(a, _0));
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
    const { width: a, height: r } = i, u = this.sn(), c = u.$(), d = u.ef();
    c === d ? cu(t, 0, 0, a, r, d) : i1(t, 0, 0, a, r, c, d);
  }
  gw(t) {
    const i = W(this.Zm), a = i.pu().wr().Tt(i);
    a !== null && a.st(t, !1);
  }
  bw(t) {
    this.Cw(t, w0, $o, this.sn().Rd());
  }
  Mw(t, i) {
    const a = W(this.Zm), r = a.au(), u = a.vu();
    for (const c of u) this.Cw(t, i, jd, c);
    for (const c of r) this.Cw(t, i, jd, c);
    for (const c of u) this.Cw(t, i, $o, c);
    for (const c of r) this.Cw(t, i, $o, c);
  }
  Cw(t, i, a, r) {
    const u = W(this.Zm), c = u.Qt().ou(), d = c !== null && c.lu === r, p = c !== null && d && c.wu !== void 0 ? c.wu.ie : void 0;
    Ed(i, ((v) => a(v, t, d, p)), r, u);
  }
  nw() {
    if (this.Zm === null) return;
    const t = this.qv, i = this.Zm.K_().N().visible, a = this.Zm.Z_().N().visible;
    i || this.Lm === null || (this.Jm.removeChild(this.Lm.uv()), this.Lm.m(), this.Lm = null), a || this.zm === null || (this.Qm.removeChild(this.zm.uv()), this.zm.m(), this.zm = null);
    const r = t.Qt().Zd();
    i && this.Lm === null && (this.Lm = new x0(this, t.N(), r, "left"), this.Jm.appendChild(this.Lm.uv())), a && this.zm === null && (this.zm = new x0(this, t.N(), r, "right"), this.Qm.appendChild(this.zm.uv()));
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
      const r = performance.now(), u = i.Et();
      this.Km.me(u.Ac(), r), this.Km.jc(r) || i.ps(this.Km);
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
    const r = this.qv.N(), u = r.handleScroll, c = r.kineticScroll;
    if ((!u.pressedMouseMove || t.Zp) && (!u.horzTouchDrag && !u.vertTouchDrag || !t.Zp)) return;
    const d = this.Zm.Pn(), p = performance.now();
    if (this.Nm !== null || this.yw(t) || (this.Nm = { x: t.clientX, y: t.clientY, Sf: p, kw: t.localX, Pw: t.localY }), this.Nm !== null && !this.Fm && (this.Nm.x !== t.clientX || this.Nm.y !== t.clientY)) {
      if (t.Zp && c.touch || !t.Zp && c.mouse) {
        const v = a.fl();
        this.Km = new tj(0.2 / v, 7 / v, 0.997, 15 / v), this.Km.Fv(a.Ac(), this.Nm.Sf);
      } else this.Km = null;
      d.Gi() || i.Q_(this.Zm, d, t.localY), i.Fd(t.localX), this.Fm = !0;
    }
    this.Fm && (d.Gi() || i.tu(this.Zm, d, t.localY), i.Wd(t.localX), this.Km !== null && this.Km.Fv(a.Ac(), p));
  }
}
class S0 {
  constructor(t, i, a, r, u) {
    this.xt = !0, this.Qv = $t({ width: 0, height: 0 }), this.hm = () => this.km(3), this.om = t === "left", this.wd = a.Zd, this.yn = i, this.Tw = r, this.Rw = u, this.lv = document.createElement("div"), this.lv.style.width = "25px", this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.fm = Ss(this.lv, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
  }
  m() {
    this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), Ms(this.fm.canvasElement), this.fm.dispose();
  }
  uv() {
    return this.lv;
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    ps(this.Qv, t) || (this.Qv = t, this.fm.resizeCanvasElement(t), this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.xt = !0);
  }
  km(t) {
    if (t < 3 && !this.xt || this.Qv.width === 0 || this.Qv.height === 0) return;
    this.xt = !1, this.fm.applySuggestedBitmapSize();
    const i = ws(this.fm, { colorSpace: this.yn.layout.colorSpace });
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
    const u = Math.floor(this.wd.N().S * a), c = Math.floor(this.wd.N().S * r), d = this.om ? i.width - u : 0;
    t.fillRect(d, 0, u, c);
  }
  Tm({ context: t, bitmapSize: i }) {
    cu(t, 0, 0, i.width, i.height, this.Rw());
  }
}
function af(s) {
  return (t) => t.Xa?.(s) ?? [];
}
const sj = af("normal"), aj = af("top"), lj = af("bottom");
class rj {
  constructor(t, i) {
    this.Dw = null, this.Iw = null, this.M = null, this.Vw = !1, this.Qv = $t({ width: 0, height: 0 }), this.Bw = new te(), this.im = new tu(5), this.rm = !1, this.hm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.lm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.qv = t, this.xu = i, this.yn = t.N().layout, this.Hv = document.createElement("tr"), this.Ew = document.createElement("td"), this.Ew.style.padding = "0", this.Aw = document.createElement("td"), this.Aw.style.padding = "0", this.lv = document.createElement("td"), this.lv.style.height = "25px", this.lv.style.padding = "0", this.Lw = document.createElement("div"), this.Lw.style.width = "100%", this.Lw.style.height = "100%", this.Lw.style.position = "relative", this.Lw.style.overflow = "hidden", this.lv.appendChild(this.Lw), this.fm = Ss(this.Lw, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const a = this.fm.canvasElement;
    a.style.position = "absolute", a.style.zIndex = "1", a.style.left = "0", a.style.top = "0", this.pm = Ss(this.Lw, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const r = this.pm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0", this.Hv.appendChild(this.Ew), this.Hv.appendChild(this.lv), this.Hv.appendChild(this.Aw), this.zw(), this.qv.Qt().L_().i(this.zw.bind(this), this), this.tv = new pu(this.pm.canvasElement, this, { xp: () => !0, Cp: () => !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.tv.m(), this.Dw !== null && this.Dw.m(), this.Iw !== null && this.Iw.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), Ms(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), Ms(this.fm.canvasElement), this.fm.dispose();
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
    ps(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.Bw.p(t)), this.Dw !== null && this.Dw.Cm($t({ width: i, height: t.height })), this.Iw !== null && this.Iw.Cm($t({ width: a, height: t.height }));
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
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, i, a), r)) {
      const c = this.pm.canvasElement;
      t.drawImage(c, i, a);
    }
  }
  km(t) {
    if (t === 0) return;
    const i = { colorSpace: this.yn.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = ws(this.fm, i);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u), this.Rm(u), this.jw(r, lj);
      })), this.Im(r), this.jw(r, sj)), this.Dw !== null && this.Dw.km(t), this.Iw !== null && this.Iw.km(t);
    }
    this.pm.applySuggestedBitmapSize();
    const a = ws(this.pm, i);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.qw([...this.qv.Qt().Jn(), this.qv.Qt().Rd()], a), this.jw(a, aj));
  }
  jw(t, i) {
    const a = this.qv.Qt().Jn();
    for (const r of a) Ed(i, ((u) => jd(u, t, !1, void 0)), r, void 0);
    for (const r of a) Ed(i, ((u) => $o(u, t, !1, void 0)), r, void 0);
  }
  Tm({ context: t, bitmapSize: i }) {
    cu(t, 0, 0, i.width, i.height, this.qv.Qt().ef());
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
    const r = this.xu.maxTickMarkWeight(a), u = this.Uw(), c = i.N();
    c.borderVisible && c.ticksVisible && t.useBitmapCoordinateSpace((({ context: d, horizontalPixelRatio: p, verticalPixelRatio: v }) => {
      d.strokeStyle = this.Yw(), d.fillStyle = this.Yw();
      const g = Math.max(1, Math.floor(p)), b = Math.floor(0.5 * p);
      d.beginPath();
      const x = Math.round(u.C * v);
      for (let S = a.length; S--; ) {
        const w = Math.round(a[S].coord * p);
        d.rect(w - b, 0, g, x);
      }
      d.fill();
    })), t.useMediaCoordinateSpace((({ context: d }) => {
      const p = u.S + u.C + u.A + u.k / 2;
      d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = this.H(), d.font = this.Sm();
      for (const v of a) if (v.weight < r) {
        const g = v.needAlignCoordinate ? this.Kw(d, v.coord, v.label) : v.coord;
        d.fillText(v.label, g, p);
      }
      this.qv.N().timeScale.allowBoldLabels && (d.font = this.Zw());
      for (const v of a) if (v.weight >= r) {
        const g = v.needAlignCoordinate ? this.Kw(d, v.coord, v.label) : v.coord;
        d.fillText(v.label, g, p);
      }
    }));
  }
  Kw(t, i, a) {
    const r = this.im.Ii(t, a), u = r / 2, c = Math.floor(i - u) + 0.5;
    return c < 0 ? i += Math.abs(0 - c) : c + r > this.Qv.width && (i -= Math.abs(this.Qv.width - (c + r))), i;
  }
  qw(t, i) {
    const a = this.Uw();
    for (const r of t) for (const u of r.dn()) u.Tt().st(i, a);
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
    return Po(this.F(), this.yn.fontFamily);
  }
  Zw() {
    return Po(this.F(), this.yn.fontFamily, "bold");
  }
  Uw() {
    this.M === null && (this.M = { S: 1, L: NaN, A: NaN, I: NaN, tn: NaN, C: 5, k: NaN, P: "", Qi: new tu(), $w: 0 });
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
    const a = { Zd: this.qv.Qt().Zd() }, r = () => i.leftPriceScale.borderVisible && t.Et().N().borderVisible, u = () => t.ef();
    i.leftPriceScale.visible && this.Dw === null && (this.Dw = new S0("left", i, a, r, u), this.Ew.appendChild(this.Dw.uv())), i.rightPriceScale.visible && this.Iw === null && (this.Iw = new S0("right", i, a, r, u), this.Aw.appendChild(this.Iw.uv()));
  }
}
const oj = !!ka && !!navigator.userAgentData && navigator.userAgentData.brands.some(((s) => s.brand.includes("Chromium"))) && !!ka && (navigator?.userAgentData?.platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
class uj {
  constructor(t, i, a) {
    var r;
    this.Gw = [], this.Xw = [], this.Jw = 0, this.ho = 0, this.C_ = 0, this.Qw = 0, this.tM = 0, this.iM = null, this.nM = !1, this.Wm = new te(), this.Hm = new te(), this.pd = new te(), this.sM = null, this.eM = null, this.jv = t, this.yn = i, this.xu = a, this.Hv = document.createElement("div"), this.Hv.classList.add("tv-lightweight-charts"), this.Hv.style.overflow = "hidden", this.Hv.style.direction = "ltr", this.Hv.style.width = "100%", this.Hv.style.height = "100%", (r = this.Hv).style.userSelect = "none", r.style.webkitUserSelect = "none", r.style.msUserSelect = "none", r.style.MozUserSelect = "none", r.style.webkitTapHighlightColor = "transparent", this.rM = document.createElement("table"), this.rM.setAttribute("cellspacing", "0"), this.Hv.appendChild(this.rM), this.hM = this.aM.bind(this), id(this.yn) && this.lM(!0), this.sn = new KC(this.md.bind(this), this.yn, a), this.Qt().Dd().i(this.oM.bind(this), this), this._M = new rj(this, this.xu), this.rM.appendChild(this._M.uv());
    const u = i.autoSize && this.uM();
    let c = this.yn.width, d = this.yn.height;
    if (u || c === 0 || d === 0) {
      const p = t.getBoundingClientRect();
      c = c || p.width, d = d || p.height;
    }
    this.cM(c, d), this.dM(), t.appendChild(this.Hv), this.fM(), this.sn.Et().Zc().i(this.sn.Pa.bind(this.sn), this), this.sn.L_().i(this.sn.Pa.bind(this.sn), this);
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
    const r = (function(d) {
      const p = Math.floor(d.width), v = Math.floor(d.height);
      return $t({ width: p - p % 2, height: v - v % 2 });
    })($t({ width: t, height: i }));
    this.ho = r.height, this.C_ = r.width;
    const u = this.ho + "px", c = this.C_ + "px";
    if (this.wM() || (W(this.Hv).style.height = u, W(this.Hv).style.width = c), this.rM.style.height = u, this.rM.style.width = c, a) {
      this.Jw !== 0 && (window.cancelAnimationFrame(this.Jw), this.Jw = 0), this.nM = !1;
      const d = xe.ys();
      this.iM !== null && (d.Ss(this.iM), this.iM = null), this.MM(d, performance.now());
    } else this.sn.Pa();
  }
  km(t) {
    t === void 0 && (t = xe.ys());
    for (let i = 0; i < this.Gw.length; i++) this.Gw[i].km(t._s(i).rs);
    this.yn.timeScale.visible && this._M.km(t.ls());
  }
  vr(t) {
    const i = id(this.yn);
    this.sn.vr(t);
    const a = id(this.yn);
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
    const u = this.Gw[0], c = (p, v) => {
      let g = 0;
      for (let b = 0; b < this.Gw.length; b++) {
        const x = this.Gw[b], S = W(p === "left" ? x.Sw() : x.xw()), w = S.dv();
        if (t !== null && S.fv(t, v, g, i), g += w.height, b < this.Gw.length - 1) {
          const M = this.Xw[b], N = M.dv();
          t !== null && M.fv(t, v, g), g += N.height;
        }
      }
    };
    this.yM() && (c("left", 0), a += W(u.Sw()).dv().width);
    for (let p = 0; p < this.Gw.length; p++) {
      const v = this.Gw[p], g = v.dv();
      if (t !== null && v.fv(t, a, r, i), r += g.height, p < this.Gw.length - 1) {
        const b = this.Xw[p], x = b.dv();
        t !== null && b.fv(t, a, r), r += x.height;
      }
    }
    a += u.dv().width, this.kM() && (c("right", a), a += W(u.xw()).dv().width);
    const d = (p, v, g) => {
      W(p === "left" ? this._M.Ow() : this._M.Nw()).fv(W(t), v, g);
    };
    if (this.yn.timeScale.visible) {
      const p = this._M.dv();
      if (t !== null) {
        let v = 0;
        this.yM() && (d("left", v, r), v = W(u.Sw()).dv().width), this._M.fv(t, v, r, i), v += p.width, this.kM() && d("right", v, r);
      }
      r += p.height;
    }
    return $t({ width: a, height: r });
  }
  DM() {
    let t = 0, i = 0, a = 0;
    for (const N of this.Gw) this.yM() && (i = Math.max(i, W(N.Sw()).bm(), this.yn.leftPriceScale.minimumWidth)), this.kM() && (a = Math.max(a, W(N.xw()).bm(), this.yn.rightPriceScale.minimumWidth)), t += N.z_();
    i = Cd(i), a = Cd(a);
    const r = this.C_, u = this.ho, c = Math.max(r - i - a, 0), d = 1 * this.Xw.length, p = this.yn.timeScale.visible;
    let v = p ? Math.max(this._M.Hw(), this.yn.timeScale.minimumHeight) : 0;
    var g;
    v = (g = v) + g % 2;
    const b = d + v, x = u < b ? 0 : u - b, S = x / t;
    let w = 0;
    const M = window.devicePixelRatio || 1;
    for (let N = 0; N < this.Gw.length; ++N) {
      const E = this.Gw[N];
      E.iw(this.sn.Zn()[N]);
      let T = 0, R = 0;
      R = N === this.Gw.length - 1 ? Math.ceil((x - w) * M) / M : Math.round(E.z_() * S * M) / M, T = Math.max(R, 2), w += T, E.Cm($t({ width: c, height: T })), this.yM() && E.mw(i, "left"), this.kM() && E.mw(a, "right"), E.Sv() && this.sn.Id(E.Sv(), T);
    }
    this._M.Ww($t({ width: p ? c : 0, height: v }), p ? i : 0, p ? a : 0), this.sn.N_(c), this.Qw !== i && (this.Qw = i), this.tM !== a && (this.tM = a);
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
    return oj ? 1 / window.devicePixelRatio : 1;
  }
  aM(t) {
    if (!(t.deltaX !== 0 && this.yn.handleScroll.mouseWheel || t.deltaY !== 0 && this.yn.handleScale.mouseWheel)) return;
    const i = this.IM(t), a = i * t.deltaX / 100, r = -i * t.deltaY / 100;
    if (t.cancelable && t.preventDefault(), r !== 0 && this.yn.handleScale.mouseWheel) {
      const u = Math.sign(r) * Math.min(1, Math.abs(r)), c = t.clientX - this.Hv.getBoundingClientRect().left;
      this.Qt().Od(c, u);
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
      const u = Ve(this.Gw.pop());
      this.rM.removeChild(u.uv()), u.dw().u(this), u.fw().u(this), u.m();
      const c = this.Xw.pop();
      c !== void 0 && this.vM(c);
    }
    for (let r = a; r < i; r++) {
      const u = new sf(this, t[r]);
      if (u.dw().i(this.AM.bind(this, u), this), u.fw().i(this.LM.bind(this, u), this), this.Gw.push(u), r > 0) {
        const c = new PC(this, r - 1, r);
        this.Xw.push(c), this.rM.insertBefore(c.uv(), this._M.uv());
      }
      this.rM.insertBefore(u.uv(), this._M.uv());
    }
    for (let r = 0; r < i; r++) {
      const u = t[r], c = this.Gw[r];
      c.Sv() !== u ? c.iw(u) : c.tw();
    }
    this.fM(), this.DM();
  }
  zM(t, i, a, r) {
    const u = /* @__PURE__ */ new Map();
    t !== null && this.sn.Jn().forEach(((g) => {
      const b = g.Un().Hn(t);
      b !== null && u.set(g, b);
    }));
    let c;
    if (t !== null) {
      const g = this.sn.Et().en(t)?.originalTime;
      g !== void 0 && (c = g);
    }
    const d = this.Qt().ou(), p = this.OM(r), v = (function(g, b) {
      const x = g !== null && g.lu instanceof mu ? g.lu : void 0, S = g?.wu?.te, w = b !== void 0 && b !== -1 ? b : void 0;
      return g === null || g.ee === void 0 ? { NM: x, FM: S } : { NM: x, FM: S, WM: { ds: g.ee, HM: (M = g.lu, N = g.ee, M instanceof _d ? "pane-primitive" : N === "marker" || N === "primitive" ? "series-primitive" : "series"), UM: FC(g.ee, S), U_: x, $M: S, jM: w } };
      var M, N;
    })(d, p);
    return { Qr: c, $n: t ?? void 0, qM: i ?? void 0, jM: p !== -1 ? p : void 0, NM: v.NM, YM: u, FM: v.FM, WM: v.WM, KM: a ?? void 0 };
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
function id(s) {
  return !!(s.handleScroll.mouseWheel || s.handleScale.mouseWheel);
}
function cj(s) {
  return s.open === void 0 && s.value === void 0;
}
function hj(s) {
  return (function(t) {
    return t.open !== void 0;
  })(s) || (function(t) {
    return t.value !== void 0;
  })(s);
}
function M0(s, t, i, a) {
  const r = i.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.color !== void 0 && (u.R = i.color), u;
}
function dj(s, t, i, a) {
  const r = i.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.lineColor !== void 0 && (u.vt = i.lineColor), i.topColor !== void 0 && (u.ah = i.topColor), i.bottomColor !== void 0 && (u.oh = i.bottomColor), u;
}
function fj(s, t, i, a) {
  const r = i.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return i.topLineColor !== void 0 && (u._h = i.topLineColor), i.bottomLineColor !== void 0 && (u.uh = i.bottomLineColor), i.topFillColor1 !== void 0 && (u.dh = i.topFillColor1), i.topFillColor2 !== void 0 && (u.fh = i.topFillColor2), i.bottomFillColor1 !== void 0 && (u.ph = i.bottomFillColor1), i.bottomFillColor2 !== void 0 && (u.mh = i.bottomFillColor2), u;
}
function mj(s, t, i, a) {
  const r = { $n: t, wt: s, Wt: [i.open, i.high, i.low, i.close], Qr: a };
  return i.color !== void 0 && (r.R = i.color), r;
}
function pj(s, t, i, a) {
  const r = { $n: t, wt: s, Wt: [i.open, i.high, i.low, i.close], Qr: a };
  return i.color !== void 0 && (r.R = i.color), i.borderColor !== void 0 && (r.Ht = i.borderColor), i.wickColor !== void 0 && (r.hh = i.wickColor), r;
}
function vj(s, t, i, a, r) {
  const u = Ve(r)(i), c = Math.max(...u), d = Math.min(...u), p = u[u.length - 1], v = [p, c, d, p], { time: g, color: b, ...x } = i;
  return { $n: t, wt: s, Wt: v, Qr: a, ue: x, R: b };
}
function va(s) {
  return s.Wt !== void 0;
}
function N0(s, t) {
  return t.customValues !== void 0 && (s.ZM = t.customValues), s;
}
function ds(s) {
  return (t, i, a, r, u, c) => (function(d, p) {
    return p ? p(d) : cj(d);
  })(a, c) ? N0({ wt: t, $n: i, Qr: r }, a) : N0(s(t, i, a, r, u), a);
}
function C0(s) {
  return { Candlestick: ds(pj), Bar: ds(mj), Area: ds(dj), Baseline: ds(fj), Histogram: ds(M0), Line: ds(M0), Custom: ds(vj) }[s];
}
function j0(s) {
  return { $n: 0, GM: /* @__PURE__ */ new Map(), za: s };
}
function E0(s, t) {
  if (s !== void 0 && s.length !== 0) return { XM: t.key(s[0].wt), JM: t.key(s[s.length - 1].wt) };
}
function k0(s) {
  let t;
  return s.forEach(((i) => {
    t === void 0 && (t = i.Qr);
  })), Ve(t);
}
class gj {
  constructor(t) {
    this.QM = /* @__PURE__ */ new Map(), this.tg = /* @__PURE__ */ new Map(), this.ig = /* @__PURE__ */ new Map(), this.ng = [], this.xu = t;
  }
  m() {
    this.QM.clear(), this.tg.clear(), this.ig.clear(), this.ng = [];
  }
  sg(t, i) {
    let a = this.QM.size !== 0, r = !1;
    const u = this.tg.get(t);
    if (u !== void 0) if (this.tg.size === 1) a = !1, r = !0, this.QM.clear();
    else for (const p of this.ng) p.pointData.GM.delete(t) && (r = !0);
    let c = [];
    if (i.length !== 0) {
      const p = i.map(((S) => S.time)), v = this.xu.createConverterToInternalObj(i), g = C0(t.bh()), b = t.ll(), x = t.ol();
      c = i.map(((S, w) => {
        const M = v(S.time), N = this.xu.key(M);
        let E = this.QM.get(N);
        E === void 0 && (E = j0(M), this.QM.set(N, E), r = !0);
        const T = g(M, E.$n, S, p[w], b, x);
        return E.GM.set(t, T), T;
      }));
    }
    a && this.eg(), this.rg(t, c);
    let d = -1;
    if (r) {
      const p = [];
      this.QM.forEach(((v) => {
        p.push({ timeWeight: 0, time: v.za, pointData: v, originalTime: k0(v.GM) });
      })), p.sort(((v, g) => this.xu.key(v.time) - this.xu.key(g.time))), d = this.hg(p);
    }
    return this.ag(t, d, (function(p, v, g) {
      const b = E0(p, g), x = E0(v, g);
      if (b !== void 0 && x !== void 0) return { lg: !1, Ia: b.JM >= x.JM && b.XM >= x.XM };
    })(this.tg.get(t), u, this.xu));
  }
  Jd(t) {
    return this.sg(t, []);
  }
  og(t, i, a) {
    if (a && t.Na()) throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
    const r = i;
    (function(E) {
      E.Qr === void 0 && (E.Qr = E.time);
    })(r), this.xu.preprocessData(i);
    const u = this.xu.createConverterToInternalObj([i])(i.time), c = this.ig.get(t);
    if (!a && c !== void 0 && this.xu.key(u) < this.xu.key(c)) throw new Error(`Cannot update oldest data, last time=${c}, new time=${u}`);
    let d = this.QM.get(this.xu.key(u));
    if (a && d === void 0) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
    const p = d === void 0;
    d === void 0 && (d = j0(u), this.QM.set(this.xu.key(u), d));
    const v = C0(t.bh()), g = t.ll(), b = t.ol(), x = v(u, d.$n, i, r.Qr, g, b), S = !a && !p && c !== void 0 && this.xu.key(u) === this.xu.key(c);
    d.GM.set(t, x), a ? this._g(t, x, d.$n) : S && t.Na() && va(x) ? (t.Rr(x), this.ug(t, x)) : this.ug(t, x);
    const w = { Ia: va(x), lg: a };
    if (!p) return this.ag(t, -1, w);
    const M = { timeWeight: 0, time: d.za, pointData: d, originalTime: k0(d.GM) }, N = _s(this.ng, this.xu.key(M.time), ((E, T) => this.xu.key(E.time) < T));
    this.ng.splice(N, 0, M);
    for (let E = N; E < this.ng.length; ++E) Ro(this.ng[E].pointData, E);
    return this.xu.fillWeightsForPoints(this.ng, N), this.ag(t, N, w);
  }
  cg(t, i) {
    const a = this.tg.get(t);
    if (a === void 0 || i <= 0) return [[], this.dg()];
    i = Math.min(i, a.length);
    const r = a.splice(-i).reverse();
    a.length === 0 ? this.ig.delete(t) : this.ig.set(t, a[a.length - 1].wt);
    for (const u of r) {
      const c = this.QM.get(this.xu.key(u.wt));
      if (c && (c.GM.delete(t), c.GM.size === 0)) {
        this.QM.delete(this.xu.key(c.za)), this.ng.splice(c.$n, 1);
        for (let d = c.$n; d < this.ng.length; ++d) Ro(this.ng[d].pointData, d);
      }
    }
    return [r, this.ag(t, this.ng.length - 1, { lg: !1, Ia: !1 })];
  }
  ug(t, i) {
    let a = this.tg.get(t);
    a === void 0 && (a = [], this.tg.set(t, a));
    const r = a.length !== 0 ? a[a.length - 1] : null;
    r === null || this.xu.key(i.wt) > this.xu.key(r.wt) ? va(i) && a.push(i) : va(i) ? a[a.length - 1] = i : a.splice(-1, 1), this.ig.set(t, i.wt);
  }
  _g(t, i, a) {
    const r = this.tg.get(t);
    if (r === void 0) return;
    const u = _s(r, a, ((c, d) => c.$n < d));
    va(i) ? r[u] = i : r.splice(u, 1);
  }
  rg(t, i) {
    i.length !== 0 ? (this.tg.set(t, i.filter(va)), this.ig.set(t, i[i.length - 1].wt)) : (this.tg.delete(t), this.ig.delete(t));
  }
  eg() {
    for (const t of this.ng) t.pointData.GM.size === 0 && this.QM.delete(this.xu.key(t.time));
  }
  hg(t) {
    let i = -1;
    for (let a = 0; a < this.ng.length && a < t.length; ++a) {
      const r = this.ng[a], u = t[a];
      if (this.xu.key(r.time) !== this.xu.key(u.time)) {
        i = a;
        break;
      }
      u.timeWeight = r.timeWeight, Ro(u.pointData, a);
    }
    if (i === -1 && this.ng.length !== t.length && (i = Math.min(this.ng.length, t.length)), i === -1) return -1;
    for (let a = i; a < t.length; ++a) Ro(t[a].pointData, a);
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
    if (i !== -1) this.tg.forEach(((u, c) => {
      r.U_.set(c, { ue: u, pg: c === t ? a : void 0 });
    })), this.tg.has(t) || r.U_.set(t, { ue: [], pg: a }), r.Et.vg = this.ng, r.Et.mg = i;
    else {
      const u = this.tg.get(t);
      r.U_.set(t, { ue: u || [], pg: a });
    }
    return r;
  }
  dg() {
    return { U_: /* @__PURE__ */ new Map(), Et: { Pc: this.fg() } };
  }
}
function Ro(s, t) {
  s.$n = t, s.GM.forEach(((i) => {
    i.$n = t;
  }));
}
function bj(s, t) {
  return s._t < t;
}
function yj(s, t) {
  return t < s._t;
}
function kd(s, t, i, a) {
  return _s(s, t, bj, i, a);
}
function zd(s, t, i, a) {
  return ef(s, t, yj, i, a);
}
function Vo(s, t, i) {
  return { ne: s, se: t, ee: i };
}
function z0(s, t, i, a) {
  return s >= t - a && s <= i + a;
}
function zl(s, t, i, a, r, u) {
  const c = r - i, d = u - a;
  if (c === 0 && d === 0) return Math.hypot(s - i, t - a);
  const p = ((s - i) * c + (t - a) * d) / (c * c + d * d), v = Math.max(0, Math.min(1, p)), g = i + c * v, b = a + d * v;
  return Math.hypot(s - g, t - b);
}
const nd = [0, 0];
function xj(s, t, i) {
  return t === void 0 || t.wt !== s.wt - 1 ? s._t - i / 2 : (t._t + s._t) / 2;
}
function wj(s, t, i) {
  return t === void 0 || t.wt !== s.wt + 1 ? s._t + i / 2 : (s._t + t._t) / 2;
}
function _j(s, t, i, a, r, u, c) {
  if (t === null || t.from >= t.to || s.length === 0) return null;
  const d = r / 2 + u, p = kd(s, i - d, t.from, t.to), v = zd(s, i + d, p, t.to);
  if (p >= v) return null;
  let g = Number.POSITIVE_INFINITY;
  for (let b = p; b < v; b++) {
    const x = s[b], S = b > t.from ? s[b - 1] : void 0, w = b < t.to - 1 ? s[b + 1] : void 0, M = xj(x, S, r) - u, N = wj(x, w, r) + u;
    if (i < M || i > N) continue;
    c(x, nd);
    const E = nd[0], T = nd[1], R = Math.min(E, T), D = Math.max(E, T), V = R - u, G = D + u;
    if (a >= R && a <= D) g = Math.min(g, 0);
    else if (a >= V && a <= G) {
      const A = Math.min(Math.abs(a - R), Math.abs(D - a));
      g = Math.min(g, A);
    }
  }
  return Number.isFinite(g) ? Vo(g, 0, "series-range") : null;
}
function Sj(s, t) {
  return s.wt < t;
}
function Mj(s, t) {
  return t < s.wt;
}
function Nj(s, t, i) {
  const a = t.Oa(), r = t.bi(), u = _s(s, a, Sj), c = ef(s, r, Mj);
  if (!i) return { from: u, to: c };
  let d = u, p = c;
  return u > 0 && u < s.length && s[u].wt >= a && (d = u - 1), c > 0 && c < s.length && s[c - 1].wt <= r && (p = c + 1), { from: d, to: p };
}
class g1 {
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
    r !== null && (this.Sg = Nj(this.bg, a, this.Cg), this.Vg(t, i, r.Wt), this.Bg());
  }
}
class Cj {
  constructor(t, i) {
    this.Eg = t, this.Ki = i;
  }
  st(t, i, a) {
    this.Eg.draw(t, this.Ki, i, a);
  }
}
function jj(s) {
  switch (s) {
    case "point":
      return 2;
    case "range":
      return 0;
    default:
      return 1;
  }
}
class Ej extends g1 {
  constructor(t, i, a) {
    super(t, i, !1), this.Yh = a, this.Eg = this.Yh.renderer(), this.kg = new Cj(this.Eg, ((r) => this.Ag(r)));
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
    const a = this.Eg.hitTest?.(t, i, ((c) => this.Ag(c)));
    if (a != null) return { ne: (r = a).distance, se: jj(r.type), ee: "custom", mu: r.cursorStyle, te: r.objectId, ie: r.hitTestData };
    var r;
    const u = _j(this.bg, this.Sg, t, i, this.le.Et().fl(), this.ae.N().hitTestTolerance, ((c, d) => {
      const p = c.Lg;
      let v = NaN, g = NaN;
      if (p !== void 0 && !this.Yh.isWhitespace(p)) for (const b of this.Yh.priceValueBuilder(p)) {
        const x = this.Ag(b);
        x !== null && (v = Number.isNaN(v) ? x : Math.min(v, x), g = Number.isNaN(g) ? x : Math.max(g, x));
      }
      d[0] = v, d[1] = g;
    }));
    return u === null ? null : { ...u, ee: "custom" };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((i) => ({ wt: i.$n, _t: NaN, ...t.Sh(i.$n), Lg: i.ue })));
  }
  Vg(t, i) {
    i.Tc(this.bg, xd(this.Sg));
  }
  Bg() {
    this.Yh.update({ bars: this.bg.map(kj), barSpacing: this.le.Et().fl(), visibleRange: this.Sg, conflationFactor: this.le.Et().Qc() }, this.ae.N());
  }
  Ag(t) {
    const i = this.ae.Lt();
    return i === null ? null : this.ae.Ft().Nt(t, i.Wt);
  }
}
function kj(s) {
  return { x: s._t, time: s.wt, originalData: s.Lg, barColor: s.sh };
}
const zj = { color: "#2196f3" }, Tj = (s, t, i) => {
  const a = qn(i);
  return new Ej(s, t, a);
};
function lf(s) {
  const t = { value: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function T0(s) {
  const t = lf(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function Oj(s) {
  const t = lf(s);
  return s.vt !== void 0 && (t.lineColor = s.vt), s.ah !== void 0 && (t.topColor = s.ah), s.oh !== void 0 && (t.bottomColor = s.oh), t;
}
function Dj(s) {
  const t = lf(s);
  return s._h !== void 0 && (t.topLineColor = s._h), s.uh !== void 0 && (t.bottomLineColor = s.uh), s.dh !== void 0 && (t.topFillColor1 = s.dh), s.fh !== void 0 && (t.topFillColor2 = s.fh), s.ph !== void 0 && (t.bottomFillColor1 = s.ph), s.mh !== void 0 && (t.bottomFillColor2 = s.mh), t;
}
function b1(s) {
  const t = { open: s.Wt[0], high: s.Wt[1], low: s.Wt[2], close: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function Aj(s) {
  const t = b1(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function Rj(s) {
  const t = b1(s), { R: i, Ht: a, hh: r } = s;
  return i !== void 0 && (t.color = i), a !== void 0 && (t.borderColor = a), r !== void 0 && (t.wickColor = r), t;
}
function Yo(s) {
  return { Area: Oj, Line: T0, Baseline: Dj, Histogram: T0, Bar: Aj, Candlestick: Rj, Custom: Lj }[s];
}
function Lj(s) {
  const t = s.Qr;
  return { ...s.ue, time: t };
}
const Bj = { vertLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, horzLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, mode: 1, doNotSnapToHiddenSeriesIndices: !1 }, Uj = { vertLines: { color: "#D6DCDE", style: 0, visible: !0 }, horzLines: { color: "#D6DCDE", style: 0, visible: !0 } }, Hj = { background: { type: "solid", color: "#FFFFFF" }, textColor: "#191919", fontSize: 12, fontFamily: t1, panes: { enableResize: !0, separatorColor: "#E0E3EB", separatorHoverColor: "rgba(178, 181, 189, 0.2)" }, attributionLogo: !0, colorSpace: "srgb", colorParsers: [] }, sd = { autoScale: !0, mode: 0, invertScale: !1, alignLabels: !0, borderVisible: !0, borderColor: "#2B2B43", entireTextOnly: !1, visible: !1, ticksVisible: !1, scaleMargins: { bottom: 0.1, top: 0.2 }, minimumWidth: 0, ensureEdgeTickMarksVisible: !1, tickMarkDensity: 2.5 }, qj = { rightOffset: 0, barSpacing: 6, minBarSpacing: 0.5, maxBarSpacing: 0, fixLeftEdge: !1, fixRightEdge: !1, lockVisibleTimeRangeOnResize: !1, rightBarStaysOnScroll: !1, borderVisible: !0, borderColor: "#2B2B43", visible: !0, timeVisible: !1, secondsVisible: !0, shiftVisibleRangeOnNewBar: !0, allowShiftVisibleRangeOnWhitespaceReplacement: !1, ticksVisible: !1, uniformDistribution: !1, minimumHeight: 0, allowBoldLabels: !0, ignoreWhitespaceIndices: !1, enableConflation: !1, conflationThresholdFactor: 1, precomputeConflationOnInit: !1, precomputeConflationPriority: "background" };
function O0() {
  return { addDefaultPane: !0, hoveredSeriesOnTop: !0, width: 0, height: 0, autoSize: !1, layout: Hj, crosshair: Bj, grid: Uj, overlayPriceScales: { ...sd }, leftPriceScale: { ...sd, visible: !1 }, rightPriceScale: { ...sd, visible: !0 }, defaultVisiblePriceScaleId: "right", timeScale: qj, localization: { locale: ka ? navigator.language : "", dateFormat: "dd MMM 'yy" }, handleScroll: { mouseWheel: !0, pressedMouseMove: !0, horzTouchDrag: !0, vertTouchDrag: !0 }, handleScale: { axisPressedMouseMove: { time: !0, price: !0 }, axisDoubleClickReset: { time: !0, price: !0 }, mouseWheel: !0, pinch: !0 }, kineticScroll: { mouse: !1, touch: !0 }, trackingMode: { exitMode: 1 } };
}
class y1 {
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
    return du(this.zg) ? this.sv.CM(this.zg) : 0;
  }
  setVisibleRange(t) {
    this.setAutoScale(!1), this.Ki().qo(new Ee(t.from, t.to));
  }
  getVisibleRange() {
    let t, i, a = this.Ki().ar();
    if (a === null) return null;
    if (this.Ki().so()) {
      const r = this.Ki().M_(), u = m1(r);
      a = xa(a, this.Ki().ro()), t = Number((Math.round(a.Je() / r) * r).toFixed(u)), i = Number((Math.round(a.Qe() / r) * r).toFixed(u));
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
class Qj {
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
    return new y1(this.sv, t, this.paneIndex());
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
const $j = { color: "#FF0000", price: 0, lineStyle: 2, lineWidth: 1, lineVisible: !0, axisLabelVisible: !0, title: "", axisLabelColor: "", axisLabelTextColor: "" };
class D0 {
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
class Vj {
  constructor(t, i, a, r, u, c) {
    this.Hg = new te(), this.ae = t, this.Ug = i, this.$g = a, this.xu = u, this.Fg = r, this.jg = c;
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
    const i = new Sa(new Bl(t.from, t.to)).Fu(), a = this.ae.Un();
    if (a.Gi()) return null;
    const r = a.Hn(i.Oa(), 1), u = a.Hn(i.bi(), -1), c = W(a.Rh()), d = W(a.Qn());
    if (r !== null && u !== null && r.$n > u.$n) return { barsBefore: t.from - c, barsAfter: d - t.to };
    const p = { barsBefore: r === null || r.$n === c ? t.from - c : r.$n - c, barsAfter: u === null || u.$n === d ? d - t.to : d - u.$n };
    return r !== null && u !== null && (p.from = r.Qr, p.to = u.Qr), p;
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
    const a = Yo(this.seriesType());
    return i.map(((r) => a(r)));
  }
  dataByIndex(t, i) {
    const a = this.ae.Un().Hn(t, i);
    return a === null ? null : Yo(this.seriesType())(a);
  }
  data() {
    const t = Yo(this.seriesType());
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
    return un(this.ae.N());
  }
  priceScale() {
    return this.$g.priceScale(this.ae.Ft().cl(), this.getPane().paneIndex());
  }
  createPriceLine(t) {
    const i = Pe(un($j), t), a = this.ae.Ba(i);
    return new D0(a);
  }
  removePriceLine(t) {
    this.ae.Ea(t.Wg());
  }
  priceLines() {
    return this.ae.Aa().map(((t) => new D0(t)));
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
class Yj {
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
    return { ...un(this.ia.N()), barSpacing: this.ia.fl() };
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
function A0(s) {
  return (function(t) {
    if (Eo(t.handleScale)) {
      const a = t.handleScale;
      t.handleScale = { axisDoubleClickReset: { time: a, price: a }, axisPressedMouseMove: { time: a, price: a }, mouseWheel: a, pinch: a };
    } else if (t.handleScale !== void 0) {
      const { axisPressedMouseMove: a, axisDoubleClickReset: r } = t.handleScale;
      Eo(a) && (t.handleScale.axisPressedMouseMove = { time: a, price: a }), Eo(r) && (t.handleScale.axisDoubleClickReset = { time: r, price: r });
    }
    const i = t.handleScroll;
    Eo(i) && (t.handleScroll = { horzTouchDrag: i, vertTouchDrag: i, mouseWheel: i, pressedMouseMove: i });
  })(s), s;
}
class Gj {
  constructor(t, i, a) {
    this.tb = /* @__PURE__ */ new Map(), this.ib = /* @__PURE__ */ new Map(), this.nb = new te(), this.sb = new te(), this.eb = new te(), this.od = /* @__PURE__ */ new WeakMap(), this.rb = new gj(i);
    const r = a === void 0 ? un(O0()) : Pe(un(O0()), A0(a));
    this.hb = i, this.sv = new uj(t, r, i), this.sv.dw().i(((c) => {
      this.nb.v() && this.nb.p(this.ab(c()));
    }), this), this.sv.fw().i(((c) => {
      this.sb.v() && this.sb.p(this.ab(c()));
    }), this), this.sv.Dd().i(((c) => {
      this.eb.v() && this.eb.p(this.ab(c()));
    }), this);
    const u = this.sv.Qt();
    this.lb = new Yj(u, this.sv.pM(), this.hb);
  }
  remove() {
    this.sv.dw().u(this), this.sv.fw().u(this), this.sv.Dd().u(this), this.lb.m(), this.sv.m(), this.tb.clear(), this.ib.clear(), this.nb.m(), this.sb.m(), this.eb.m(), this.rb.m();
  }
  resize(t, i, a) {
    this.autoSizeActive() || this.sv.cM(t, i, a);
  }
  addCustomSeries(t, i = {}, a = 0) {
    const r = ((u) => ({ type: "Custom", isBuiltIn: !1, defaultOptions: { ...zj, ...u.defaultOptions() }, ob: Tj, _b: u }))(qn(t));
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
    return new y1(this.sv, t, i);
  }
  timeScale() {
    return this.lb;
  }
  applyOptions(t) {
    this.sv.vr(A0(t));
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
    const u = this.sv.Qt().Ks(r);
    u !== null && this.sv.Qt().qd(t, i, u);
  }
  clearCrosshairPosition() {
    this.sv.Qt().Yd(!0);
  }
  horzBehaviour() {
    return this.hb;
  }
  ub(t, i = {}, a = 0) {
    we(t.ob !== void 0), (function(p) {
      if (p === void 0 || p.type === "custom") return;
      const v = p;
      v.minMove !== void 0 && v.precision === void 0 && (v.precision = m1(v.minMove));
    })(i.priceFormat), t.type === "Candlestick" && (function(p) {
      p.borderColor !== void 0 && (p.borderUpColor = p.borderColor, p.borderDownColor = p.borderColor), p.wickColor !== void 0 && (p.wickUpColor = p.wickColor, p.wickDownColor = p.wickColor);
    })(i);
    const r = Pe(un(Jb), un(t.defaultOptions), i), u = t.ob, c = new mu(this.sv.Qt(), t.type, r, u, t._b);
    this.sv.Qt().Gd(c, a);
    const d = new Vj(c, this, this, this, this.hb, ((p) => this.fb(p)));
    return this.tb.set(d, c), this.ib.set(c, d), d;
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
    t.YM.forEach(((u, c) => {
      const d = c.bh(), p = Yo(d)(u);
      if (d !== "Custom") we(hj(p));
      else {
        const v = c.ol();
        we(!v || v(p) === !1);
      }
      i.set(this.pb(c), p);
    }));
    const a = this.mb(t.NM), r = t.WM === void 0 ? void 0 : { type: t.WM.ds, sourceKind: t.WM.HM, objectKind: t.WM.UM, series: this.mb(t.WM.U_), objectId: t.WM.$M, paneIndex: t.WM.jM };
    return { time: t.Qr, logical: t.$n, point: t.qM, paneIndex: t.jM, hoveredInfo: r, hoveredSeries: a, hoveredObjectId: t.FM, seriesData: i, sourceEvent: t.KM };
  }
  fb(t) {
    let i = this.od.get(t);
    return i || (i = new Qj(this.sv, ((a) => this.pb(a)), t, this), this.od.set(t, i)), i;
  }
}
function Kj(s) {
  if (rr(s)) {
    const t = document.getElementById(s);
    return we(t !== null, `Cannot find element in DOM with id=${s}`), t;
  }
  return s;
}
function Xj(s, t, i) {
  const a = Kj(s), r = new Gj(a, t, i);
  return t.setOptions(r.options()), r;
}
function Zj(s, t) {
  return Xj(s, new v0(), v0.yf(t));
}
function El(s, t, i, a) {
  return Math.hypot(i - s, a - t);
}
function x1(s, t, i, a, r, u, c, d = 0) {
  if (t.length === 0 || a.from >= t.length || a.to <= 0) return;
  const { context: p, horizontalPixelRatio: v, verticalPixelRatio: g } = s, b = t[a.from];
  let x = u(s, b), S = b;
  if (a.to - a.from < 2) {
    const w = r / 2;
    p.beginPath();
    const M = { _t: b._t - w, ut: b.ut }, N = { _t: b._t + w, ut: b.ut };
    p.moveTo(M._t * v, M.ut * g), p.lineTo(N._t * v, N.ut * g), c(s, x, M, N);
  } else {
    const w = d > 0;
    let M = 0;
    const N = (T, R) => {
      if (c(s, x, S, R), p.beginPath(), x = T, S = R, w) {
        const D = M % d;
        p.lineDashOffset = D, M = D;
      }
    };
    let E = S;
    p.beginPath(), p.moveTo(b._t * v, b.ut * g);
    for (let T = a.from + 1; T < a.to; ++T) {
      E = t[T];
      const R = E._t * v, D = E.ut * g, V = u(s, E);
      switch (i) {
        case 0:
          if (p.lineTo(R, D), w) {
            const G = t[T - 1], A = G._t * v, X = G.ut * g;
            M += El(A, X, R, D);
          }
          break;
        case 1: {
          const G = t[T - 1], A = G.ut * g;
          p.lineTo(R, A), w && (M += Math.abs(E._t - G._t) * v), V !== x && (N(V, E), p.lineTo(R, A)), p.lineTo(R, D), w && (M += Math.abs(E.ut - G.ut) * g);
          break;
        }
        case 2: {
          const [G, A] = rf(t, T - 1, T), X = G._t * v, J = G.ut * g, rt = A._t * v, st = A.ut * g;
          if (p.bezierCurveTo(X, J, rt, st, R, D), w) {
            const F = t[T - 1], vt = F._t * v, bt = F.ut * g, Tt = El(vt, bt, R, D), L = El(vt, bt, X, J) + El(X, J, rt, st) + El(rt, st, R, D);
            M += (Tt + L) / 2;
          }
          break;
        }
      }
      i !== 1 && V !== x && (N(V, E), p.moveTo(R, D));
    }
    (S !== E || S === E && i === 1) && c(s, x, S, E), w && (p.lineDashOffset = 0);
  }
}
const R0 = 6;
function ad(s, t) {
  return { _t: s._t - t._t, ut: s.ut - t.ut };
}
function L0(s, t) {
  return { _t: s._t / t, ut: s.ut / t };
}
function rf(s, t, i) {
  const a = Math.max(0, t - 1), r = Math.min(s.length - 1, i + 1);
  var u, c;
  return [(u = s[t], c = L0(ad(s[i], s[a]), R0), { _t: u._t + c._t, ut: u.ut + c.ut }), ad(s[i], L0(ad(s[r], s[t]), R0))];
}
function Wj(s, t) {
  const i = s.context;
  i.strokeStyle = t, i.stroke();
}
class Ij extends Cs {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: i, lt: a, wb: r, Mb: u, ct: c, Zt: d, gb: p } = this.rt;
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineWidth = c * t.verticalPixelRatio;
    const g = Yn(v, d);
    v.lineJoin = "round";
    const b = this.bb.bind(this), x = (function(S) {
      return S.reduce(((w, M) => w + M), 0);
    })(g);
    u !== void 0 && x1(t, i, u, a, r, b, Wj, x), p && (function(S, w, M, N, E) {
      if (N.to - N.from <= 0) return;
      const { horizontalPixelRatio: T, verticalPixelRatio: R, context: D } = S;
      let V = null;
      const G = Math.max(1, Math.floor(T)) % 2 / 2, A = M * R + G;
      for (let X = N.to - 1; X >= N.from; --X) {
        const J = w[X];
        if (J) {
          const rt = E(S, J);
          rt !== V && (V !== null && D.fill(), D.beginPath(), D.fillStyle = rt, V = rt);
          const st = Math.round(J._t * T) + G, F = J.ut * R;
          D.moveTo(st, F), D.arc(st, F, A, 0, 2 * Math.PI);
        }
      }
      D.fill();
    })(t, i, p, a, b);
  }
}
class w1 extends Ij {
  bb(t, i) {
    return i.vt;
  }
}
function B0(s, t, i, a, r) {
  const u = 1 - r;
  return u * u * u * s + 3 * u * u * r * t + 3 * u * r * r * i + r * r * r * a;
}
function Fj(s, t, i, a, r) {
  if (i === 2) {
    const [u, c] = rf(a, r - 1, r);
    return [Math.min(s._t, t._t, u._t, c._t), Math.max(s._t, t._t, u._t, c._t)];
  }
  return [Math.min(s._t, t._t), Math.max(s._t, t._t)];
}
function Jj(s, t, i, a, r, u, c, d) {
  switch (r) {
    case 1: {
      const p = zl(s, t, i._t, i.ut, a._t, i.ut), v = zl(s, t, a._t, i.ut, a._t, a.ut), g = Math.min(p, v);
      return g <= d ? g : null;
    }
    case 2: {
      const [p, v] = rf(u, c - 1, c), g = (function(b, x, S) {
        let w = Number.POSITIVE_INFINITY, M = S[0];
        for (let N = 1; N <= 12; N++) {
          const E = N / 12, T = { _t: B0(S[0]._t, S[1]._t, S[2]._t, S[3]._t, E), ut: B0(S[0].ut, S[1].ut, S[2].ut, S[3].ut, E) };
          w = Math.min(w, zl(b, x, M._t, M.ut, T._t, T.ut)), M = T;
        }
        return w;
      })(s, t, [i, p, v, a]);
      return g <= d ? g : null;
    }
    default: {
      const p = zl(s, t, i._t, i.ut, a._t, a.ut);
      return p <= d ? p : null;
    }
  }
}
class Pj extends g1 {
  constructor(t, i) {
    super(t, i, !0);
  }
  Vg(t, i, a) {
    i.Tc(this.bg, xd(this.Sg)), t.Zo(this.bg, a, xd(this.Sg));
  }
  Sb(t, i) {
    return { wt: t, Mt: i, _t: NaN, ut: NaN };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((i) => {
      let a;
      if ((i.Zr ?? 1) > 1) {
        const r = i.Wt[1], u = i.Wt[2], c = i.Wt[3];
        a = Math.abs(r - c) > Math.abs(u - c) ? r : u;
      } else a = i.Wt[3];
      return this.xb(i.$n, a, t);
    }));
  }
}
class _1 extends Pj {
  Pg(t, i) {
    const a = this.ae.N();
    return (function(r, u, c, d, p, v, g, b = 0, x = 0) {
      if (u === null || u.from >= u.to || r.length === 0) return null;
      const S = Math.max(v / 2, g ?? 0) + x;
      let w = Number.POSITIVE_INFINITY;
      if (g !== void 0) {
        const D = g + x, V = kd(r, c - D, u.from, u.to), G = zd(r, c + D, V, u.to);
        for (let A = V; A < G; A++) {
          const X = r[A];
          if (!z0(c, X._t, X._t, g + x)) continue;
          const J = Math.hypot(c - X._t, d - X.ut);
          J <= g + x && (w = Math.min(w, J));
        }
      }
      if (u.to - u.from < 2) {
        const D = r[u.from], V = Math.max(b / 2, S), G = zl(c, d, D._t - V, D.ut, D._t + V, D.ut);
        return G <= S && (w = Math.min(w, G)), Number.isFinite(w) ? Vo(w, 2, "series-point") : null;
      }
      let M = Number.POSITIVE_INFINITY;
      const N = kd(r, c - S, u.from, u.to), E = zd(r, c + S, N, u.to), T = Math.max(u.from + 1, N), R = Math.min(u.to, E + 1);
      for (let D = T; D < R; D++) {
        const V = r[D - 1], G = r[D], [A, X] = Fj(V, G, p, r, D);
        if (!z0(c, A, X, S)) continue;
        const J = Jj(c, d, V, G, p, r, D, S);
        J !== null && (M = Math.min(M, J));
      }
      return Number.isFinite(w) ? Vo(w, 2, "series-point") : Number.isFinite(M) ? Vo(M, 1, "series-line") : null;
    })(this.bg, this.Sg, t, i, a.lineType, a.lineVisible ? a.lineWidth : 1, a.pointMarkersVisible ? a.pointMarkersRadius || a.lineWidth / 2 + 2 : void 0, this.le.Et().fl(), a.hitTestTolerance);
  }
}
class tE extends _1 {
  constructor() {
    super(...arguments), this.kg = new w1();
  }
  xb(t, i, a) {
    return { ...this.Sb(t, i), ...a.Sh(t) };
  }
  Bg() {
    const t = this.ae.N(), i = { ot: this.bg, Zt: t.lineStyle, Mb: t.lineVisible ? t.lineType : void 0, ct: t.lineWidth, gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0, lt: this.Sg, wb: this.le.Et().fl() };
    this.kg.ht(i);
  }
}
const eE = { type: "Line", isBuiltIn: !0, defaultOptions: { color: "#2196f3", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new tE(s, t) };
function iE(s, t, i, a, r) {
  const { context: u, horizontalPixelRatio: c, verticalPixelRatio: d } = t;
  u.lineTo(r._t * c, s * d), u.lineTo(a._t * c, s * d), u.closePath(), u.fillStyle = i, u.fill();
}
class nE extends Cs {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: i, lt: a, wb: r, ct: u, Zt: c, Mb: d } = this.rt, p = this.rt.Db ?? (this.rt.Ib ? 0 : t.mediaSize.height);
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineJoin = "round", v.lineWidth = u, Yn(v, c), v.lineWidth = 1, x1(t, i, d, a, r, this.Vb.bind(this), iE.bind(null, p));
  }
}
class sE {
  Bb(t, i) {
    const a = this.Eb, { Ab: r, Lb: u, zb: c, Ob: d, Db: p, Nb: v, Fb: g } = i;
    if (this.Wb === void 0 || a === void 0 || a.Ab !== r || a.Lb !== u || a.zb !== c || a.Ob !== d || a.Db !== p || a.Nb !== v || a.Fb !== g) {
      const { verticalPixelRatio: b } = t, x = p || v > 0 ? b : 1, S = v * x, w = g === t.bitmapSize.height ? g : g * x, M = (p ?? 0) * x, N = t.context.createLinearGradient(0, S, 0, w);
      if (N.addColorStop(0, r), p != null) {
        const E = _a((M - S) / (w - S), 0, 1);
        N.addColorStop(E, u), N.addColorStop(E, c);
      }
      N.addColorStop(1, d), this.Wb = N, this.Eb = i;
    }
    return this.Wb;
  }
}
class aE extends nE {
  constructor() {
    super(...arguments), this.Hb = new sE();
  }
  Vb(t, i) {
    return this.Hb.Bb(t, { Ab: i.ah, Lb: "", zb: "", Ob: i.oh, Nb: this.rt?.Nb ?? 0, Fb: t.bitmapSize.height });
  }
}
class lE extends _1 {
  constructor(t, i) {
    super(t, i), this.kg = new e1(), this.qb = new aE(), this.Yb = new w1(), this.kg.nt([this.qb, this.Yb]);
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
const rE = { type: "Area", isBuiltIn: !0, defaultOptions: { topColor: "rgba( 46, 220, 135, 0.4)", bottomColor: "rgba( 40, 221, 100, 0)", invertFilledArea: !1, relativeGradient: !1, lineColor: "#33D778", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new lE(s, t) };
({ ...Jb });
function S1(s) {
  return s.unit === "d" ? s.value * 24 * 36e5 : s.value * 36e5;
}
function M1(s) {
  if (s == null) return null;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : null;
}
function oE(s) {
  let t = s >>> 0 || 1;
  return () => (t ^= t << 13, t ^= t >>> 17, t ^= t << 5, t >>>= 0, t / 4294967296);
}
function uE(s) {
  let t = 2166136261;
  for (let i = 0; i < s.length; i++)
    t ^= s.charCodeAt(i), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function cE(s, t, i) {
  const a = S1(i), r = i.unit === "d" ? Math.min(i.value * 24, 240) : Math.min(i.value * 12, 240), c = Date.now() - a, d = a / Math.max(1, r - 1), p = oE(uE(s)), v = (Math.abs(t) || 1) * 0.12 + 0.5, g = new Array(r);
  g[r - 1] = t;
  for (let b = r - 2; b >= 0; b--)
    g[b] = g[b + 1] + (p() - 0.5) * v;
  return g.map((b, x) => ({ t: Math.round(c + x * d), v: Math.round(b * 100) / 100 }));
}
function hE(s) {
  const t = M1(s.s ?? s.state);
  if (t == null) return null;
  const i = s.lu ?? s.last_updated;
  let a;
  if (typeof i == "number") a = i < 1e12 ? i * 1e3 : i;
  else if (typeof i == "string") a = Date.parse(i);
  else return null;
  return Number.isFinite(a) ? { t: a, v: t } : null;
}
function ld(s, t) {
  return t.map((i) => s[i]?.state ?? "").join("|");
}
function dE(s, t) {
  const i = t.join(","), [a, r] = C.useState(() => ld(s.getStates(), t));
  return C.useEffect(() => (r(ld(s.getStates(), t)), s.subscribe(() => {
    const u = ld(s.getStates(), t);
    r((c) => c === u ? c : u);
  })), [s, i]), a;
}
function N1(s, t) {
  const i = Ni(), a = s.filter(Boolean).join(","), r = `${t.value}${t.unit}`, u = C.useMemo(() => s.filter(Boolean), [a]), c = !!i.connection, [d, p] = C.useState({}), v = C.useRef(0);
  C.useEffect(() => {
    const b = i.connection;
    if (!b || u.length === 0) {
      p({});
      return;
    }
    const x = ++v.current, S = /* @__PURE__ */ new Date(), w = new Date(S.getTime() - S1(t));
    b.sendMessagePromise({
      type: "history/history_during_period",
      start_time: w.toISOString(),
      end_time: S.toISOString(),
      entity_ids: u,
      minimal_response: !0,
      no_attributes: !0,
      significant_changes_only: !1
    }).then((M) => {
      if (x !== v.current) return;
      const N = {};
      for (const E of u) {
        const T = M?.[E] ?? [], R = [];
        for (const D of T) {
          const V = hE(D);
          V && R.push(V);
        }
        R.length && (N[E] = R);
      }
      p(N);
    }).catch(() => {
      x === v.current && p({});
    });
  }, [i, u, r]);
  const g = dE(i, u);
  return C.useMemo(() => {
    const b = i.getStates(), x = {};
    for (const S of u) {
      if (d[S]?.length) {
        x[S] = d[S];
        continue;
      }
      const w = M1(b[S]?.state);
      w != null && (x[S] = cE(S, w, t));
    }
    return x;
  }, [i, u, d, g, r, c]);
}
function C1({ spec: s }) {
  const t = C.useMemo(() => s.series.map((r) => r.entity), [s.series]), i = N1(t, s.window), a = s.title ?? `History chart: ${s.series.map((r) => r.name ?? E1(r.entity)).join(", ")}`;
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-chart", role: "group", "aria-label": a, children: [
    (s.title || s.header.showCurrent) && /* @__PURE__ */ m.jsxs("div", { className: "simui-chart-head", children: [
      s.title && /* @__PURE__ */ m.jsx("span", { className: "simui-chart-title", children: s.title }),
      s.header.showCurrent && /* @__PURE__ */ m.jsx("div", { className: "simui-chart-readout", children: s.series.map((r, u) => /* @__PURE__ */ m.jsx(
        fE,
        {
          series: r,
          color: vE(r, u),
          colorize: s.header.colorize
        },
        `${r.entity}-${u}`
      )) })
    ] }),
    /* @__PURE__ */ m.jsx(mE, { spec: s, data: i })
  ] });
}
function fE({
  series: s,
  color: t,
  colorize: i
}) {
  const a = ke(s.entity), r = a?.state, u = r != null ? Number.parseFloat(r) : NaN, c = a?.attributes.unit_of_measurement, d = Number.isFinite(u) ? vs(u) : r ?? "—";
  return /* @__PURE__ */ m.jsxs("span", { className: "simui-chart-cur", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-chart-dot", style: { background: t } }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-chart-cur-name", children: s.name ?? E1(s.entity) }),
    /* @__PURE__ */ m.jsxs("span", { className: "simui-chart-cur-val", style: i ? { color: t } : void 0, children: [
      d,
      c && Number.isFinite(u) ? /* @__PURE__ */ m.jsxs("small", { children: [
        " ",
        c
      ] }) : null
    ] })
  ] });
}
function mE({ spec: s, data: t }) {
  const i = C.useRef(null), a = C.useRef(null), r = C.useRef([]);
  return C.useEffect(() => {
    const u = i.current;
    if (!u) return;
    const c = getComputedStyle(u), d = (M, N) => c.getPropertyValue(M).trim() || N, p = d("--text", "#edeef2"), v = d("--muted", "#838996"), g = d("--faint", "#23262e"), b = Zj(u, {
      layout: {
        background: { type: Md.Solid, color: "transparent" },
        textColor: v,
        fontFamily: getComputedStyle(u).fontFamily,
        attributionLogo: !1
      },
      grid: {
        vertLines: { color: g, style: fs.Solid },
        horzLines: { color: g, style: fs.Solid }
      },
      rightPriceScale: { borderColor: g, visible: !0 },
      leftPriceScale: { borderColor: g, visible: !1 },
      timeScale: { borderColor: g, timeVisible: s.window.unit === "h", secondsVisible: !1 },
      crosshair: {
        mode: wd.Magnet,
        vertLine: { color: v, width: 1, style: fs.Dotted, labelBackgroundColor: g },
        horzLine: { color: v, width: 1, style: fs.Dotted, labelBackgroundColor: g, labelVisible: !0 }
      },
      handleScale: !1,
      handleScroll: !1,
      autoSize: !1
    });
    b.applyOptions({ layout: { textColor: v } }), a.current = b;
    const x = (s.axes.length ? s.axes : [void 0]).some((M) => U0(M) === "left");
    b.priceScale("left").applyOptions({ visible: x, borderColor: g, textColor: p }), b.priceScale("right").applyOptions({ borderColor: g, textColor: p }), r.current = s.series.map((M, N) => {
      const E = pE(M, N, c), T = gE(s, M), R = U0(T), D = bE(M.strokeWidth ?? 2);
      if (M.fill === "area") {
        const G = M.opacity ?? 0.18, A = b.addSeries(rE, {
          lineColor: E,
          topColor: q0(E, G),
          bottomColor: q0(E, 0),
          lineWidth: D,
          priceScaleId: R,
          priceLineVisible: !1,
          lastValueVisible: !0,
          crosshairMarkerVisible: !0
        });
        return H0(A, T), A;
      }
      const V = b.addSeries(eE, {
        color: E,
        lineWidth: D,
        priceScaleId: R,
        priceLineVisible: !1,
        lastValueVisible: !0,
        crosshairMarkerVisible: !0
      });
      return H0(V, T), V;
    });
    const S = r.current[0];
    if (S && s.thresholds?.length)
      for (const M of s.thresholds)
        S.createPriceLine({
          price: M.value,
          color: j1(M.color, c),
          lineWidth: 1,
          lineStyle: fs.Dashed,
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
    w.observe(u);
    try {
      b.resize(u.clientWidth || 1, u.clientHeight || 1);
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
  }, [xE(s)]), C.useEffect(() => {
    const u = a.current;
    if (u)
      try {
        let c = !1;
        s.series.forEach((d, p) => {
          const v = r.current[p];
          if (!v) return;
          const g = t[d.entity] ?? [], b = yE(g).map((x) => ({
            time: Math.floor(x.t / 1e3),
            value: x.v
          }));
          v.setData(b), b.length && (c = !0);
        }), c && u.timeScale().fitContent();
      } catch {
      }
  }, [t, s.series]), /* @__PURE__ */ m.jsx("div", { className: "simui-chart-canvas", ref: i, "aria-hidden": "true" });
}
const Ul = ["--accent", "--warm", "--up", "--down", "--warn"];
function pE(s, t, i) {
  if (s.color) return j1(s.color, i);
  const a = Ul[t % Ul.length], r = ["#5b8cff", "#ffb267", "#3fd08a", "#f0735e", "#f0a84b"][t % Ul.length];
  return i?.getPropertyValue(a).trim() || r;
}
function vE(s, t) {
  return s.color ?? `var(${Ul[t % Ul.length]})`;
}
function j1(s, t) {
  const i = s.trim();
  if (i.startsWith("--")) return t?.getPropertyValue(i).trim() || i;
  const a = i.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  return a && t?.getPropertyValue(a[1]).trim() || i;
}
function E1(s) {
  return (s.split(".")[1] ?? s).replace(/_/g, " ").replace(/^\w/, (i) => i.toUpperCase());
}
function gE(s, t) {
  return t.axisId ? s.axes.find((i) => i.id === t.axisId) : s.axes[0];
}
function U0(s) {
  return s?.opposite ? "right" : "left";
}
function H0(s, t) {
  if (!t || t.min == null || t.max == null) return;
  const i = t.min, a = t.max;
  s.applyOptions({
    autoscaleInfoProvider: () => ({
      priceRange: { minValue: i, maxValue: a }
    })
  });
}
function bE(s) {
  const t = Math.round(s);
  return t < 1 ? 1 : t > 4 ? 4 : t;
}
function q0(s, t) {
  const i = Math.max(0, Math.min(1, t)), a = s.trim();
  if (/^#([0-9a-f]{3})$/i.test(a)) {
    const u = parseInt(a[1] + a[1], 16), c = parseInt(a[2] + a[2], 16), d = parseInt(a[3] + a[3], 16);
    return `rgba(${u}, ${c}, ${d}, ${i})`;
  }
  if (/^#([0-9a-f]{6})$/i.test(a)) {
    const u = parseInt(a.slice(1, 3), 16), c = parseInt(a.slice(3, 5), 16), d = parseInt(a.slice(5, 7), 16);
    return `rgba(${u}, ${c}, ${d}, ${i})`;
  }
  const r = a.match(/^rgb\(([^)]+)\)$/i);
  return r ? `rgba(${r[1]}, ${i})` : `color-mix(in srgb, ${a} ${Math.round(i * 100)}%, transparent)`;
}
function yE(s) {
  const t = [...s].sort((r, u) => r.t - u.t), i = [];
  let a = -1;
  for (const r of t) {
    const u = Math.floor(r.t / 1e3);
    u === a ? i[i.length - 1] = r : (i.push(r), a = u);
  }
  return i;
}
function xE(s) {
  const t = s.series.map((r) => `${r.entity}:${r.fill}:${r.color ?? ""}:${r.strokeWidth ?? ""}:${r.axisId ?? ""}:${r.opacity ?? ""}`).join(","), i = s.axes.map((r) => `${r.id}:${r.opposite ? 1 : 0}:${r.min ?? ""}:${r.max ?? ""}:${r.ticks ?? ""}`).join(","), a = (s.thresholds ?? []).map((r) => `${r.value}:${r.color}`).join(",");
  return `${s.window.value}${s.window.unit}|${t}|${i}|${a}`;
}
const Q0 = 'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function k1({ open: s, title: t, onClose: i, children: a }) {
  const r = C.useRef(null), u = C.useRef(null), c = C.useId(), d = C.useCallback(
    (p) => {
      if (p.key === "Escape") {
        p.preventDefault(), i();
        return;
      }
      if (p.key !== "Tab") return;
      const v = r.current;
      if (!v) return;
      const g = v.querySelectorAll(Q0);
      if (g.length === 0) {
        p.preventDefault(), v.focus();
        return;
      }
      const b = g[0], x = g[g.length - 1], S = document.activeElement;
      p.shiftKey && (S === b || !v.contains(S)) ? (p.preventDefault(), x.focus()) : !p.shiftKey && S === x && (p.preventDefault(), b.focus());
    },
    [i]
  );
  return C.useEffect(() => {
    if (!s) return;
    u.current = document.activeElement, document.addEventListener("keydown", d, !0);
    const p = r.current;
    return (p?.querySelector(Q0) ?? p)?.focus(), () => {
      document.removeEventListener("keydown", d, !0), u.current?.focus?.();
    };
  }, [s, d]), s ? Hn.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "simui-root simui-sheet-backdrop", onClick: i, children: /* @__PURE__ */ m.jsxs(
      "div",
      {
        ref: r,
        className: "simui-sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t ? void 0 : "Details",
        "aria-labelledby": t ? c : void 0,
        tabIndex: -1,
        onClick: (p) => p.stopPropagation(),
        children: [
          t && /* @__PURE__ */ m.jsxs("header", { className: "simui-sheet-head", children: [
            /* @__PURE__ */ m.jsx("span", { id: c, className: "simui-sheet-title", children: t }),
            /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: i, "aria-label": "Close", children: /* @__PURE__ */ m.jsx(Jd, { size: 16 }) })
          ] }),
          /* @__PURE__ */ m.jsx("div", { className: "simui-sheet-body", children: a })
        ]
      }
    ) }),
    document.body
  ) : null;
}
const wE = { value: 24, unit: "h" }, _E = 140, SE = 40;
function ME({ entityId: s, band: t, window: i, name: a, accent: r, onExpand: u }) {
  const c = ke(s), d = i ?? wE, p = !!c && (c.state === "unavailable" || c.state === "unknown"), g = N1(p ? [] : [s], d)[s], b = c?.attributes.unit_of_measurement, x = c?.state, S = x != null ? Number.parseFloat(x) : NaN, w = !p && Number.isFinite(S), M = a ?? (c ? P(c) : s), { delta: N, outOfBand: E } = C.useMemo(() => {
    const G = (g ?? []).map((F) => F.v), A = G.length ? G[0] : void 0, X = w ? S : G.length ? G[G.length - 1] : void 0, J = A != null && X != null ? X - A : void 0, rt = w ? S : X, st = rt != null && t != null && (t.min != null && rt < t.min || t.max != null && rt > t.max);
    return { delta: J, outOfBand: !!st };
  }, [g, S, w, t]), T = E ? "var(--warn)" : r ?? "var(--muted)", R = `simui-metric-val num${E ? " oob" : ""}`;
  if (p)
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-metric is-unavailable", children: [
      /* @__PURE__ */ m.jsx("div", { className: "simui-metric-head", children: /* @__PURE__ */ m.jsx("span", { className: "simui-metric-name", title: M, children: M }) }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-metric-value", children: /* @__PURE__ */ m.jsx("span", { className: "simui-metric-val num", children: "—" }) })
    ] });
  const D = (G) => {
    u && (G.stopPropagation(), u());
  }, V = u ? (G) => {
    (G.key === "Enter" || G.key === " ") && (G.preventDefault(), u());
  } : void 0;
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: `simui-metric${u ? " is-clickable" : ""}`,
      onClick: u ? D : void 0,
      onKeyDown: V,
      role: u ? "button" : void 0,
      tabIndex: u ? 0 : void 0,
      "aria-label": u ? `${M} — view chart` : void 0,
      style: { "--metric-accent": T },
      children: [
        /* @__PURE__ */ m.jsxs("div", { className: "simui-metric-head", children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-metric-name", title: M, children: M }),
          N != null && Math.abs(N) >= NE && /* @__PURE__ */ m.jsxs("span", { className: `simui-metric-delta num ${N > 0 ? "up" : "down"}`, children: [
            N > 0 ? "+" : "−",
            vs(Math.abs(N))
          ] })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "simui-metric-value", children: [
          /* @__PURE__ */ m.jsx("span", { className: R, children: w ? vs(S) : x ?? "—" }),
          b && w && /* @__PURE__ */ m.jsx("span", { className: "simui-metric-unit", children: b })
        ] }),
        /* @__PURE__ */ m.jsx(
          CE,
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
const NE = 0.05;
function CE({
  values: s,
  band: t,
  stroke: i,
  width: a = _E,
  height: r = SE
}) {
  const u = C.useMemo(() => `ms-${Math.random().toString(36).slice(2, 8)}`, []);
  if (s.length < 2)
    return /* @__PURE__ */ m.jsx("div", { className: "simui-metric-spark is-empty", style: { height: r }, "aria-hidden": "true" });
  const c = Math.min(...s), d = Math.max(...s), p = (d - c || Math.abs(d) || 1) * 0.12, v = c - p, b = d + p - v || 1, x = a / (s.length - 1), S = (T) => r - (T - v) / b * r, M = s.map((T, R) => `${(R * x).toFixed(1)},${S(T).toFixed(1)}`).join(" "), N = `0,${r} ${M} ${a},${r}`;
  let E = null;
  if (t && (t.min != null || t.max != null)) {
    const T = t.max != null ? $0(S(t.max), r) : 0, R = t.min != null ? $0(S(t.min), r) : r, D = Math.max(0, R - T);
    D > 0.5 && (E = { y: T, h: D });
  }
  return /* @__PURE__ */ m.jsxs(
    "svg",
    {
      className: "simui-metric-spark",
      width: "100%",
      height: r,
      viewBox: `0 0 ${a} ${r}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ m.jsx("defs", { children: /* @__PURE__ */ m.jsxs("linearGradient", { id: u, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ m.jsx("stop", { offset: "0%", stopColor: i, stopOpacity: "0.22" }),
          /* @__PURE__ */ m.jsx("stop", { offset: "100%", stopColor: i, stopOpacity: "0" })
        ] }) }),
        E && /* @__PURE__ */ m.jsx(
          "rect",
          {
            className: "simui-metric-band",
            x: "0",
            y: E.y.toFixed(1),
            width: a,
            height: E.h.toFixed(1)
          }
        ),
        /* @__PURE__ */ m.jsx("polygon", { points: N, fill: `url(#${u})`, stroke: "none" }),
        /* @__PURE__ */ m.jsx(
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
function $0(s, t) {
  return s < 0 ? 0 : s > t ? t : s;
}
const rd = [
  { id: "24h", label: "24h", window: { value: 24, unit: "h" } },
  { id: "7d", label: "7d", window: { value: 7, unit: "d" } },
  { id: "30d", label: "30d", window: { value: 30, unit: "d" } }
];
function z1({
  entityId: s,
  spec: t,
  band: i,
  accent: a,
  name: r,
  range: u = "24h",
  children: c
}) {
  const [d, p] = C.useState(!1), [v, g] = C.useState(u), b = ke(s ?? ""), x = r ?? (b ? P(b) : s), S = rd.find((E) => E.id === v)?.window ?? rd[0].window, w = C.useMemo(() => t ? { ...t, window: S } : s ? jE(s, x ?? s, S, a, i) : null, [t, s, x, S, a, i]), M = c ?? (s ? /* @__PURE__ */ m.jsx(
    ME,
    {
      entityId: s,
      band: i,
      window: S,
      name: r,
      accent: a,
      onExpand: () => p(!0)
    }
  ) : null), N = c != null ? /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "simui-expand-glance is-clickable",
      role: "button",
      tabIndex: 0,
      "aria-label": x ? `${x} — view chart` : "View chart",
      onClick: () => p(!0),
      onKeyDown: (E) => {
        (E.key === "Enter" || E.key === " ") && (E.preventDefault(), p(!0));
      },
      children: M
    }
  ) : M;
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    N,
    /* @__PURE__ */ m.jsx(k1, { open: d, title: x, onClose: () => p(!1), children: /* @__PURE__ */ m.jsxs("div", { className: "simui-expand-sheet", children: [
      /* @__PURE__ */ m.jsx("div", { className: "simui-range-toggle", role: "tablist", "aria-label": "Chart range", children: rd.map((E) => /* @__PURE__ */ m.jsx(
        "button",
        {
          role: "tab",
          "aria-selected": v === E.id,
          className: `simui-range-btn${v === E.id ? " active" : ""}`,
          onClick: () => g(E.id),
          children: E.label
        },
        E.id
      )) }),
      w && /* @__PURE__ */ m.jsx("div", { className: "simui-expand-chart", children: /* @__PURE__ */ m.jsx(C1, { spec: w }) })
    ] }) })
  ] });
}
function jE(s, t, i, a, r) {
  const u = [];
  return r?.min != null && u.push({ value: r.min, color: "var(--warn)" }), r?.max != null && u.push({ value: r.max, color: "var(--warn)" }), {
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
    thresholds: u.length ? u : void 0
  };
}
function od(s, t) {
  return t <= 0 ? ms(Math.round(s), 0, 100) : ms(Math.round(s / t) * t, 0, 100);
}
function EE(s) {
  const { value: t, onCommit: i, axis: a = "auto", commitMs: r = 120, step: u = 1, disabled: c, threshold: d = 4 } = s, [p, v] = C.useState(() => od(t, u)), [g, b] = C.useState(!1), [x, S] = C.useState(a === "auto" ? "vertical" : a), w = C.useRef(!1), M = C.useRef(p), N = C.useRef(null), E = C.useRef(a === "auto" ? null : a), T = C.useRef(null), R = C.useRef(null), D = C.useRef(!1), V = C.useRef(null), G = C.useRef(null), A = C.useRef(0), X = C.useRef(null), J = C.useRef(i);
  J.current = i;
  const rt = C.useCallback(() => {
    if (X.current != null && (clearTimeout(X.current), X.current = null), G.current != null) {
      const L = G.current;
      G.current = null, A.current = Date.now(), J.current(L);
    }
  }, []), st = C.useCallback(
    (L) => {
      G.current = L;
      const Z = Date.now(), it = Math.max(0, r - (Z - A.current));
      X.current != null && clearTimeout(X.current), X.current = setTimeout(rt, it);
    },
    [r, rt]
  );
  C.useEffect(() => {
    if (w.current || G.current != null) return;
    const L = od(t, u);
    M.current = L, v(L);
  }, [t, u]);
  const F = C.useCallback(() => {
    V.current = null;
    const L = N.current, Z = R.current;
    if (!L || !Z) return;
    if (E.current == null && T.current) {
      const k = Math.abs(Z.x - T.current.x), Q = Math.abs(Z.y - T.current.y);
      if (k > d || Q > d) {
        const I = Q >= k ? "vertical" : "horizontal";
        E.current = I, S(I);
      }
    }
    const it = E.current ?? "vertical";
    let ht;
    it === "vertical" ? ht = L.height > 0 ? (L.bottom - Z.y) / L.height * 100 : 0 : ht = L.width > 0 ? (Z.x - L.left) / L.width * 100 : 0;
    const ft = od(ht, u);
    ft !== M.current && (M.current = ft, v(ft), st(ft));
  }, [u, d, st]);
  C.useEffect(() => {
    if (!g) return;
    const L = (it) => {
      if (w.current) {
        if (it.preventDefault(), R.current = { x: it.clientX, y: it.clientY }, T.current && !D.current) {
          const ht = Math.abs(it.clientX - T.current.x), ft = Math.abs(it.clientY - T.current.y);
          (ht > d || ft > d) && (D.current = !0);
        }
        V.current == null && (V.current = requestAnimationFrame(F));
      }
    }, Z = () => {
      w.current = !1, b(!1), V.current != null && (cancelAnimationFrame(V.current), V.current = null), D.current && (G.current == null && (G.current = M.current), rt());
    };
    return window.addEventListener("pointermove", L, { passive: !1 }), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z), () => {
      window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z);
    };
  }, [g, d, F, rt]), C.useEffect(
    () => () => {
      V.current != null && cancelAnimationFrame(V.current), X.current != null && clearTimeout(X.current);
    },
    []
  );
  const vt = C.useCallback(
    (L) => {
      if (c || L.button != null && L.button !== 0) return;
      const Z = L.currentTarget;
      N.current = Z.getBoundingClientRect(), T.current = { x: L.clientX, y: L.clientY }, R.current = { x: L.clientX, y: L.clientY }, D.current = !1, E.current = a === "auto" ? null : a, w.current = !0, b(!0);
    },
    [c, a]
  ), bt = x === "horizontal" ? { width: `${p}%` } : { height: `${p}%` }, Tt = C.useCallback(() => D.current, []);
  return { value: p, dragging: g, moved: Tt, handlers: { onPointerDown: vt }, fillStyle: bt };
}
const V0 = 4, kE = {
  light: {
    tint: "var(--warm)",
    read: (s) => {
      if (s.state !== "on") return 0;
      const t = s.attributes.brightness;
      return t != null ? Math.max(1, Math.round(t / 255 * 100)) : 100;
    },
    isOn: (s) => s.state === "on",
    icon: () => Io,
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
    icon: () => Zd,
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
    icon: () => Ma,
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
    icon: (s) => s ? Lb : Bb,
    commit: (s, t, i) => s("media_player", "volume_set", { volume_level: i / 100 }, { entity_id: t.entity_id }),
    toggle: (s, t, i) => s("media_player", "volume_mute", { is_volume_muted: i }, { entity_id: t.entity_id })
  }
};
function zE({ entity: s, name: t, step: i = 1, menuItems: a }) {
  const r = ke(s), u = Bt(), c = Pd(), d = ir(), p = (F, vt, bt, Tt) => {
    u(F, vt, bt, Tt);
  }, v = at(s), g = kE[v], b = !!r && (r.state === "unavailable" || r.state === "unknown"), x = r?.attributes.supported_features ?? 0, S = !!g && !b && (v !== "cover" || (x & V0) === V0), w = !!r && !!g && g.isOn(r), M = r && g ? g.read(r) ?? 0 : 0, N = EE({
    value: M,
    axis: "vertical",
    step: i,
    disabled: !S || !r,
    onCommit: (F) => {
      r && g && g.commit(p, r, F);
    }
  }), E = C.useRef(!1);
  if (!r || !g) return null;
  const T = t ?? P(r), R = S ? N.value : w ? M : 0, D = g.icon(w), V = () => {
    if (E.current) {
      E.current = !1;
      return;
    }
    b || g.toggle(p, r, w);
  }, G = () => {
    N.moved() && (E.current = !0);
  }, A = (F) => {
    F.stopPropagation(), g.toggle(p, r, w);
  }, X = (F) => {
    const vt = Math.max(0, Math.min(100, Math.round(F)));
    g.commit(p, r, vt);
  }, J = (F) => {
    if (F.key === "Enter" || F.key === " ") {
      F.preventDefault(), b || g.toggle(p, r, w);
      return;
    }
    if (!S) return;
    const vt = 10;
    switch (F.key) {
      case "ArrowUp":
      case "ArrowRight":
        F.preventDefault(), X(R + i);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        F.preventDefault(), X(R - i);
        break;
      case "PageUp":
        F.preventDefault(), X(R + vt);
        break;
      case "PageDown":
        F.preventDefault(), X(R - vt);
        break;
      case "Home":
        F.preventDefault(), X(0);
        break;
      case "End":
        F.preventDefault(), X(100);
        break;
    }
  }, rt = { ...N.fillStyle, background: g.tint }, st = [
    { label: w ? G0(v) : Y0(v), onClick: () => g.toggle(p, r, w) },
    { label: "Details", onClick: () => d({ action: "more-info" }, s) },
    ...a ?? []
  ];
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: `simui-slidertile${w ? " is-on" : ""}${N.dragging ? " is-dragging" : ""}${S ? "" : " is-static"}${b ? " is-unavailable" : ""}`,
        style: { "--slider-tint": g.tint },
        role: "slider",
        "aria-label": `${T} ${TE(v)}`,
        "aria-orientation": "vertical",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": R,
        "aria-valuetext": `${R}%`,
        "aria-disabled": S ? void 0 : !0,
        tabIndex: 0,
        onClick: V,
        onKeyDown: J,
        onPointerUpCapture: G,
        ...S ? N.handlers : {},
        ...c.menuProps,
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-slidertile-fill", style: rt, "aria-hidden": "true" }),
          /* @__PURE__ */ m.jsxs("span", { className: "simui-slidertile-body", children: [
            /* @__PURE__ */ m.jsxs("span", { className: "simui-slidertile-head", children: [
              /* @__PURE__ */ m.jsx(
                "button",
                {
                  type: "button",
                  className: `simui-slidertile-ic${w ? " on" : ""}`,
                  "aria-label": w ? G0(v) : Y0(v),
                  onClick: A,
                  onPointerDown: (F) => F.stopPropagation(),
                  children: /* @__PURE__ */ m.jsx(D, { size: 18, strokeWidth: 2 })
                }
              ),
              /* @__PURE__ */ m.jsx("span", { className: "simui-slidertile-pct num", children: OE(v, w, R) })
            ] }),
            /* @__PURE__ */ m.jsx("span", { className: "simui-slidertile-name", title: T, children: T })
          ] })
        ]
      }
    ),
    c.open && c.position && /* @__PURE__ */ m.jsx(
      Fo,
      {
        items: st,
        x: c.position.x,
        y: c.position.y,
        onClose: c.close,
        header: Yl(s) ? /* @__PURE__ */ m.jsx(Gl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function TE(s) {
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
function OE(s, t, i) {
  return (s === "light" || s === "fan") && !t ? "Off" : s === "media_player" && !t ? "Muted" : `${i}%`;
}
function Y0(s) {
  switch (s) {
    case "cover":
      return "Open";
    case "media_player":
      return "Unmute";
    default:
      return "Turn on";
  }
}
function G0(s) {
  switch (s) {
    case "cover":
      return "Close";
    case "media_player":
      return "Mute";
    default:
      return "Turn off";
  }
}
const T1 = "category.", DE = {
  lights: { name: "Lights", icon: "lightbulb", color: "warm" },
  climate: { name: "Climate", icon: "thermostat", color: "teal" },
  media: { name: "Media", icon: "cast", color: "violet" },
  security: { name: "Security", icon: "shield", color: "green" },
  sensors: { name: "Sensors", icon: "activity", color: "cyan" },
  power: { name: "Power", icon: "zap", color: "warn" },
  scenes: { name: "Scenes", icon: "sparkles", color: "pink" },
  server: { name: "System", icon: "server", color: "slate" }
};
function AE({ block: s }) {
  const t = s.entityIds;
  if (t.length && t.every((c) => c.startsWith(T1)))
    return /* @__PURE__ */ m.jsx(BE, { block: s });
  if (t.length > 0 && t.every((c) => at(c) === "scene" || at(c) === "script"))
    return /* @__PURE__ */ m.jsx(UE, { block: s });
  if (s.axis === "metrics")
    return /* @__PURE__ */ m.jsx($E, { block: s });
  if (s.tile === "statusboard")
    return /* @__PURE__ */ m.jsx(VE, { block: s });
  if (s.tile === "slider")
    return /* @__PURE__ */ m.jsx(YE, { block: s });
  const a = t.length > 0 && t.every((c) => at(c) === "light"), r = s.axis ?? "none", u = r === "room" || r === "floor" || r === "device-class";
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    a && /* @__PURE__ */ m.jsx(GE, { ids: t }),
    u ? /* @__PURE__ */ m.jsx(RE, { ids: t, axis: r }) : /* @__PURE__ */ m.jsx("div", { className: "simui-rows", children: t.map((c) => /* @__PURE__ */ m.jsx(Jo, { entityId: c }, c)) })
  ] });
}
function RE({ ids: s, axis: t }) {
  const i = ou(), a = Ni().getStates(), r = (c) => a[c]?.attributes.device_class, u = /* @__PURE__ */ new Map();
  for (const c of s) {
    const d = LE(c, t, i, r);
    let p = u.get(d);
    p || (p = [], u.set(d, p)), p.push(c);
  }
  return u.size <= 1 ? /* @__PURE__ */ m.jsx("div", { className: "simui-rows", children: s.map((c) => /* @__PURE__ */ m.jsx(Jo, { entityId: c }, c)) }) : /* @__PURE__ */ m.jsx("div", { className: "simui-subgroups", children: [...u.entries()].map(([c, d]) => /* @__PURE__ */ m.jsxs("div", { className: "simui-subgroup", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-subhead", children: c }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-rows", children: d.map((p) => /* @__PURE__ */ m.jsx(Jo, { entityId: p }, p)) })
  ] }, c)) });
}
function LE(s, t, i, a) {
  if (t === "floor")
    return i?.[s]?.floorName ?? i?.[s]?.areaName ?? "Home";
  if (t === "room")
    return i?.[s]?.areaName ?? "Other";
  if (t === "device-class") {
    const r = a(s);
    return pt(r || at(s));
  }
  return "Other";
}
function BE({ block: s }) {
  const { openCategory: t } = Ns(), i = s.entityIds.map((a) => a.slice(T1.length));
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-launcher-grid", children: i.map((a) => {
      const r = DE[a] ?? { name: pt(a), icon: "home", color: "accent" };
      return /* @__PURE__ */ m.jsx(
        AN,
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
function UE({ block: s }) {
  const t = ir();
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-launcher-grid", children: s.entityIds.map((i) => /* @__PURE__ */ m.jsx(HE, { entityId: i, onTap: () => t({ action: "call-service", service: `${at(i)}.turn_on`, target: { entity_id: i } }, i) }, i)) })
  ] });
}
function HE({ entityId: s, onTap: t }) {
  const i = ke(s), a = SM("sparkles");
  return /* @__PURE__ */ m.jsxs("button", { className: "simui-scene-tile", onClick: t, "aria-label": i ? P(i) : s, children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-launch-ic", children: /* @__PURE__ */ m.jsx(a, { size: 18, strokeWidth: 2 }) }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-name simui-launch-name", children: i ? P(i) : s })
  ] });
}
function qE(s) {
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
function QE(s) {
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
function $E({ block: s }) {
  const t = Ni().getStates();
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-metric-wall", children: s.entityIds.map((i) => {
      const a = t[i];
      return /* @__PURE__ */ m.jsx(z1, { entityId: i, band: qE(a), accent: QE(a) }, i);
    }) })
  ] });
}
function VE({ block: s }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-statusboard-grid", children: s.entityIds.map((t) => /* @__PURE__ */ m.jsx(Gb, { entity: t }, t)) })
  ] });
}
function YE({ block: s }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-slider-wall", children: s.entityIds.map((t) => /* @__PURE__ */ m.jsx(zE, { entity: t, step: at(t) === "light" ? 1 : 5 }, t)) })
  ] });
}
function GE({ ids: s }) {
  const t = Bt(), i = $e((r) => {
    const u = s.filter((d) => r[d]?.state === "on");
    if (!u.length) return 0;
    const c = u.reduce((d, p) => d + Number(r[p]?.attributes.brightness ?? 0), 0);
    return Math.round(c / u.length / 255 * 100);
  }), a = (r) => {
    const u = Number(r.target.value);
    s.forEach((c) => {
      t("light", "turn_on", { brightness_pct: u }, { entity_id: c });
    });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-master", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-master-label", children: "All" }),
    /* @__PURE__ */ m.jsx(
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
    /* @__PURE__ */ m.jsxs("span", { className: "simui-master-val num", children: [
      i,
      "%"
    ] })
  ] });
}
function KE({ block: s }) {
  return s.source ? /* @__PURE__ */ m.jsx(XE, { block: s }) : /* @__PURE__ */ m.jsx(O1, { title: s.title, ids: s.entityIds });
}
function XE({ block: s }) {
  const t = ou(), i = s.source, a = $e(
    (u) => Zb(i, u, (c) => t?.[c]?.areaName).join(",")
  ), r = a ? a.split(",") : [];
  return !r.length && (i.hideWhenEmpty ?? !0) ? null : /* @__PURE__ */ m.jsx(O1, { title: s.title, ids: r, empty: "Nothing right now." });
}
function O1({ title: s, ids: t, empty: i }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-surface list", children: [
    s && /* @__PURE__ */ m.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ m.jsx("span", { children: s }) }),
    t.length ? /* @__PURE__ */ m.jsx("div", { className: "simui-rows divided", children: t.map((a) => /* @__PURE__ */ m.jsx(Jo, { entityId: a }, a)) }) : i && /* @__PURE__ */ m.jsx("div", { className: "simui-list-empty", children: i })
  ] });
}
const ZE = {
  scene: G_,
  script: cS,
  button: ys,
  input_button: ys
};
function WE(s) {
  return s === "scene" || s === "script" ? "turn_on" : "press";
}
function Lo({ entity: s }) {
  const t = Bt(), i = at(s.entity_id), a = s.state === "unavailable" || s.state === "unknown", r = ZE[i] ?? Na, u = P(s), c = () => {
    a || t(i, WE(i), {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ m.jsx(
    Xt,
    {
      onClick: a ? void 0 : c,
      className: `simui-action${a ? " is-unavailable" : ""}`,
      children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(r, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: u, children: u }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-action-run", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(Na, { size: 13, strokeWidth: 2, fill: "currentColor" }) })
      ] })
    }
  );
}
const IE = 1e4;
function FE({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", i = s.attributes.entity_picture, [a, r] = C.useState(() => Date.now());
  C.useEffect(() => {
    if (t || !i) return;
    const d = window.setInterval(() => r(Date.now()), IE);
    return () => window.clearInterval(d);
  }, [t, i]);
  const u = i ? `${i}${i.includes("?") ? "&" : "?"}_=${a}` : void 0, c = P(s);
  return /* @__PURE__ */ m.jsx(Xt, { className: `simui-camera${t ? " is-unavailable" : ""}`, children: /* @__PURE__ */ m.jsxs("div", { className: "simui-cam-frame", children: [
    u && !t ? /* @__PURE__ */ m.jsx("img", { className: "simui-cam-img", src: u, alt: c, loading: "lazy" }) : /* @__PURE__ */ m.jsx("div", { className: "simui-cam-empty", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(lM, { size: 20, strokeWidth: 1.75 }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-cam-cap", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-cam-name", title: c, children: c }),
      t && /* @__PURE__ */ m.jsx("span", { className: "simui-cam-state", children: pt(s.state) })
    ] })
  ] }) });
}
const JE = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, PE = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function tk({ entity: s }) {
  const t = Bt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ m.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(ja, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "simui-big", children: [
          "—",
          /* @__PURE__ */ m.jsx("span", { className: "simui-unit", children: "°" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: "Unavailable" })
      ] })
    ] });
  const a = s.attributes, r = a.hvac_action, u = a.current_temperature, c = a.temperature, d = a.target_temp_low, p = a.target_temp_high, v = a.target_temp_step ?? 0.5, g = a.min_temp ?? 7, b = a.max_temp ?? 35, x = r && JE[r] || PE[s.state] || "", S = (N) => {
    if (c == null) return;
    const E = ms(Math.round((c + N) / v) * v, g, b);
    t("climate", "set_temperature", { temperature: E }, { entity_id: s.entity_id });
  }, w = a.hvac_modes ?? [], M = w.length > 1 ? [{ type: "climate-hvac-modes", modes: w, style: "icons" }] : [];
  return /* @__PURE__ */ m.jsxs(Xt, { children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-ic ${x}`, children: /* @__PURE__ */ m.jsx(ja, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsxs("span", { className: "simui-big", children: [
        u != null ? Math.round(u) : "—",
        /* @__PURE__ */ m.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      c != null ? /* @__PURE__ */ m.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => S(-v), children: /* @__PURE__ */ m.jsx(zb, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ m.jsxs("span", { className: "simui-target", children: [
          ud(c),
          "°"
        ] }),
        /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => S(v), children: /* @__PURE__ */ m.jsx(er, { size: 14, strokeWidth: 2.5 }) })
      ] }) : d != null && p != null ? /* @__PURE__ */ m.jsxs("span", { className: "simui-target", children: [
        ud(d),
        "–",
        ud(p),
        "°"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx(ar, { entity: s, features: M })
  ] });
}
function ud(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const Bo = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function ek({ entity: s }) {
  const t = Bt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ m.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-value", children: "Unavailable" })
    ] }) });
  const a = s.attributes.current_position, r = s.state === "open" || a != null && a > 0, u = jt(s, Bo.SET_POSITION) && a != null, c = (p, v) => {
    t("cover", p, v, { entity_id: s.entity_id });
  }, d = u ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0;
  return /* @__PURE__ */ m.jsxs(Xt, { className: r ? "is-on" : "", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-value", children: a != null ? `${a}%` : pt(s.state) })
    ] }),
    u ? /* @__PURE__ */ m.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: a,
        "aria-label": "Position",
        style: d,
        onChange: (p) => c("set_cover_position", { position: Number(p.target.value) })
      }
    ) : /* @__PURE__ */ m.jsxs("div", { className: "simui-controls", children: [
      jt(s, Bo.OPEN) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => c("open_cover"), children: /* @__PURE__ */ m.jsx($l, { size: 15, strokeWidth: 2 }) }),
      jt(s, Bo.STOP) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => c("stop_cover"), children: /* @__PURE__ */ m.jsx(Ca, { size: 12, strokeWidth: 2 }) }),
      jt(s, Bo.CLOSE) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => c("close_cover"), children: /* @__PURE__ */ m.jsx(gs, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const ik = { SET_SPEED: 1 };
function nk({ entity: s }) {
  const t = Bt(), i = s.state === "unavailable" || s.state === "unknown", a = s.state === "on", r = a ? s.attributes.percentage ?? 100 : 0, u = !i && jt(s, ik.SET_SPEED), c = P(s), d = () => {
    t("fan", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, p = (b) => {
    t("fan", "set_percentage", { percentage: Number(b.target.value) }, { entity_id: s.entity_id });
  }, g = {
    background: `linear-gradient(to right, ${a ? "var(--cool)" : "var(--faint)"} ${r}%, var(--faint) ${r}%)`
  };
  return i ? /* @__PURE__ */ m.jsx(Xt, { className: "simui-fan is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(Ma, { size: 16, strokeWidth: 2 }) }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: c, children: c }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ m.jsxs(Xt, { onClick: d, className: `simui-fan${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-ic${a ? " cool" : ""}`, children: /* @__PURE__ */ m.jsx(Ma, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: c, children: c }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${r}%` : "Off" })
    ] }),
    u && /* @__PURE__ */ m.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: r,
        "aria-label": `${c} speed`,
        style: g,
        onClick: (b) => b.stopPropagation(),
        onChange: p
      }
    )
  ] });
}
const sk = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function ak({ entity: s }) {
  const t = Bt(), i = at(s.entity_id);
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ m.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ m.jsx("div", { className: "simui-row", children: /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }) }),
      /* @__PURE__ */ m.jsx(xs, { value: "Unavailable" })
    ] });
  const r = s.state === "on" || s.state === "off", u = s.state === "on", c = sk.has(i) && r, d = s.attributes.unit_of_measurement ?? "", p = c ? () => {
    t("homeassistant", u ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  } : void 0;
  return /* @__PURE__ */ m.jsxs(Xt, { onClick: p, className: c && u ? "is-on" : "", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      c && /* @__PURE__ */ m.jsx("span", { className: `simui-ic${u ? " cool" : ""}`, children: /* @__PURE__ */ m.jsx(ys, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ m.jsx(
      xs,
      {
        value: `${pt(s.state)}${d ? ` ${d}` : ""}`,
        since: r ? s.last_changed : void 0
      }
    )
  ] });
}
function lk({ entity: s }) {
  const t = Bt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ m.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(Io, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-pct", children: "Unavailable" })
    ] }) });
  const a = s.state === "on", r = s.attributes.brightness ?? 0, u = a ? Math.max(1, Math.round(r / 255 * 100)) : 0, c = () => {
    t("light", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, d = (g) => {
    t("light", "turn_on", { brightness_pct: Number(g.target.value) }, { entity_id: s.entity_id });
  }, v = { background: `linear-gradient(to right, ${a ? "var(--warm)" : "var(--faint)"} ${u}%, var(--faint) ${u}%)` };
  return /* @__PURE__ */ m.jsxs(Xt, { onClick: c, className: a ? "is-lit" : "", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-ic${a ? " warm" : ""}`, children: /* @__PURE__ */ m.jsx(Io, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${u}%` : "Off" })
    ] }),
    /* @__PURE__ */ m.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: u,
        "aria-label": `${P(s)} brightness`,
        style: v,
        onClick: (g) => g.stopPropagation(),
        onChange: d
      }
    )
  ] });
}
function rk({ entity: s }) {
  const t = Bt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ m.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(bs, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ m.jsx(xs, { value: "Unavailable", tone: "muted" })
    ] });
  const a = s.state === "locked", r = () => {
    t("lock", a ? "unlock" : "lock", {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ m.jsxs(Xt, { onClick: r, className: a ? "" : "is-unlocked", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: `simui-ic${a ? "" : " amber"}`, children: a ? /* @__PURE__ */ m.jsx(bs, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ m.jsx(Da, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ m.jsx(xs, { value: a ? "Locked" : "Unlocked", since: s.last_changed, tone: a ? "muted" : "warn" })
  ] });
}
const ga = 16;
function ok(s, t) {
  return new Promise((i) => {
    if (!s || typeof document > "u") {
      i(null);
      return;
    }
    const a = new Image();
    a.crossOrigin = "anonymous", a.decoding = "async";
    const r = (u) => {
      a.onload = null, a.onerror = null, i(t?.aborted ? null : u);
    };
    a.onerror = () => r(null), a.onload = () => {
      if (t?.aborted) {
        r(null);
        return;
      }
      try {
        const u = document.createElement("canvas");
        u.width = ga, u.height = ga;
        const c = u.getContext("2d", { willReadFrequently: !0 });
        if (!c) {
          r(null);
          return;
        }
        c.drawImage(a, 0, 0, ga, ga);
        const { data: d } = c.getImageData(0, 0, ga, ga);
        r(uk(d));
      } catch {
        r(null);
      }
    }, a.src = s;
  });
}
function uk(s) {
  let t = 0, i = 0, a = 0, r = 0, u = 0, c = 0, d = 0, p = 0;
  for (let R = 0; R < s.length; R += 4) {
    const D = s[R], V = s[R + 1], G = s[R + 2], A = s[R + 3] / 255;
    if (A < 0.5) continue;
    const X = Math.max(D, V, G), J = Math.min(D, V, G);
    if (X < 18 || J > 240) {
      u += D * A, c += V * A, d += G * A, p += A;
      continue;
    }
    const rt = X === 0 ? 0 : (X - J) / X, st = rt * rt * A;
    t += D * st, i += V * st, a += G * st, r += st, u += D * A, c += V * A, d += G * A, p += A;
  }
  let v, g, b;
  if (r > 1e-3)
    v = t / r, g = i / r, b = a / r;
  else if (p > 0)
    v = u / p, g = c / p, b = d / p;
  else
    return null;
  const x = hk(v, g, b), S = x[0], w = ck(x[2], 0.32, 0.66), M = Math.max(x[1], 0.18);
  [v, g, b] = dk(S, M, w);
  const N = Math.round(v), E = Math.round(g), T = Math.round(b);
  return { rgb: `rgb(${N} ${E} ${T})`, r: N, g: E, b: T, h: S, s: M, l: w };
}
function ck(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function hk(s, t, i) {
  s /= 255, t /= 255, i /= 255;
  const a = Math.max(s, t, i), r = Math.min(s, t, i), u = a - r;
  let c = 0;
  u !== 0 && (a === s ? c = (t - i) / u % 6 : a === t ? c = (i - s) / u + 2 : c = (s - t) / u + 4, c *= 60, c < 0 && (c += 360));
  const d = (a + r) / 2, p = u === 0 ? 0 : u / (1 - Math.abs(2 * d - 1));
  return [c, p, d];
}
function dk(s, t, i) {
  const a = (1 - Math.abs(2 * i - 1)) * t, r = (s % 360 + 360) % 360 / 60, u = a * (1 - Math.abs(r % 2 - 1));
  let c = 0, d = 0, p = 0;
  r >= 0 && r < 1 ? [c, d, p] = [a, u, 0] : r < 2 ? [c, d, p] = [u, a, 0] : r < 3 ? [c, d, p] = [0, a, u] : r < 4 ? [c, d, p] = [0, u, a] : r < 5 ? [c, d, p] = [u, 0, a] : [c, d, p] = [a, 0, u];
  const v = i - a / 2;
  return [(c + v) * 255, (d + v) * 255, (p + v) * 255];
}
function D1(s) {
  const [t, i] = C.useState(null);
  return C.useEffect(() => {
    if (!s) {
      i(null);
      return;
    }
    const a = { aborted: !1 };
    return ok(s, a).then((r) => {
      a.aborted || i(r);
    }), () => {
      a.aborted = !0;
    };
  }, [s]), t;
}
function A1(s) {
  if (s)
    return { "--album-tint": s.rgb };
}
const K0 = { PREV: 16, NEXT: 32 };
function fk({ entity: s }) {
  const t = Bt(), i = s.attributes, a = s.state;
  if (a === "unavailable" || a === "unknown")
    return /* @__PURE__ */ m.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: "Unavailable" })
    ] }) });
  const u = a === "playing", c = i.media_title, d = i.media_artist ?? i.media_album_name ?? i.app_name, p = i.entity_picture, v = !!c, g = D1(p), b = (x) => {
    t("media_player", x, void 0, { entity_id: s.entity_id });
  };
  return v ? /* @__PURE__ */ m.jsx(Xt, { style: A1(g), className: g ? "is-album-tinted" : "", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-np", children: [
    p ? /* @__PURE__ */ m.jsx("img", { className: "simui-art", src: p, alt: "" }) : /* @__PURE__ */ m.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-title", title: c, children: c }),
      d && /* @__PURE__ */ m.jsx("span", { className: "simui-artist", title: d, children: d })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-tp", children: [
      jt(s, K0.PREV) && /* @__PURE__ */ m.jsx("button", { "aria-label": "Previous", onClick: () => b("media_previous_track"), children: /* @__PURE__ */ m.jsx(Ab, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ m.jsx("button", { className: "play", "aria-label": u ? "Pause" : "Play", onClick: () => b("media_play_pause"), children: u ? /* @__PURE__ */ m.jsx(Tb, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ m.jsx(Na, { size: 15, fill: "currentColor" }) }),
      jt(s, K0.NEXT) && /* @__PURE__ */ m.jsx("button", { "aria-label": "Next", onClick: () => b("media_next_track"), children: /* @__PURE__ */ m.jsx(Rb, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ m.jsxs(Xt, { children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: pt(a) })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ m.jsx("button", { className: "play", "aria-label": "Play", onClick: () => b("media_play_pause"), children: /* @__PURE__ */ m.jsx(Na, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function mk({ values: s, width: t = 116, height: i = 26 }) {
  if (s.length < 2) return null;
  const a = Math.min(...s), u = Math.max(...s) - a || 1, c = t / (s.length - 1), d = s.map((p, v) => `${(v * c).toFixed(1)},${(i - (p - a) / u * i).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ m.jsx(
    "svg",
    {
      className: "simui-spark",
      width: t,
      height: i,
      viewBox: `0 0 ${t} ${i}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx(
        "polyline",
        {
          points: d,
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
const cd = /* @__PURE__ */ new Map(), pk = 40;
function vk({ entity: s }) {
  const t = s.attributes, i = t.unit_of_measurement ?? "", a = t.device_class === "temperature", r = s.state === "unavailable" || s.state === "unknown", u = Number(s.state), c = !r && s.state !== "" && !Number.isNaN(u), d = C.useRef(""), [, p] = C.useState(0);
  if (C.useEffect(() => {
    if (!c || d.current === s.state) return;
    d.current = s.state;
    const S = cd.get(s.entity_id) ?? [];
    for (S.push(u); S.length > pk; ) S.shift();
    cd.set(s.entity_id, S), p((w) => w + 1);
  }, [s.entity_id, s.state, c, u]), r)
    return /* @__PURE__ */ m.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
        a && /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(ja, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: /* @__PURE__ */ m.jsx("span", { className: "simui-big", children: "—" }) })
    ] });
  const v = cd.get(s.entity_id) ?? [], g = v.length > 1 ? u - v[0] : 0, b = c && Math.abs(g) >= 0.05, x = a ? "°" : "";
  return /* @__PURE__ */ m.jsxs(Xt, { children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      a && /* @__PURE__ */ m.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ m.jsx(ja, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      b && /* @__PURE__ */ m.jsxs("span", { className: `simui-delta ${g > 0 ? "up" : "down"}`, children: [
        g > 0 ? "▲" : "▼",
        " ",
        vs(Math.abs(g)),
        x
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ m.jsxs("span", { className: "simui-big", children: [
        c ? vs(u) : s.state,
        i ? /* @__PURE__ */ m.jsxs("span", { className: "simui-unit", children: [
          " ",
          i
        ] }) : null
      ] }),
      c && v.length > 1 && /* @__PURE__ */ m.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ m.jsx(mk, { values: v, width: 64, height: 22 }) })
    ] })
  ] });
}
const hd = { STOP: 8, RETURN_HOME: 16, START: 8192 }, gk = /* @__PURE__ */ new Set(["cleaning", "returning"]);
function bk({ entity: s }) {
  const t = Bt(), i = s.state === "unavailable" || s.state === "unknown", a = gk.has(s.state), r = P(s), u = (c) => {
    t("vacuum", c, {}, { entity_id: s.entity_id });
  };
  return i ? /* @__PURE__ */ m.jsx(Xt, { className: "simui-vacuum is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: r, children: r }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ m.jsxs(Xt, { className: `simui-vacuum${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ m.jsx(xs, { value: pt(s.state), since: s.last_changed, tone: a ? "on" : "muted" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-controls", children: [
      jt(s, hd.START) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Start", onClick: () => u("start"), children: /* @__PURE__ */ m.jsx(Na, { size: 13, strokeWidth: 2, fill: "currentColor" }) }),
      jt(s, hd.STOP) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => u("stop"), children: /* @__PURE__ */ m.jsx(Ca, { size: 12, strokeWidth: 2 }) }),
      jt(s, hd.RETURN_HOME) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Return to base", onClick: () => u("return_to_base"), children: /* @__PURE__ */ m.jsx(Id, { size: 14, strokeWidth: 2 }) })
    ] })
  ] });
}
const yk = {
  "clear-night": _S,
  cloudy: iS,
  exceptional: Qo,
  fog: W_,
  hail: Hh,
  lightning: zg,
  "lightning-rainy": zg,
  partlycloudy: jb,
  pouring: P_,
  rainy: X_,
  snowy: Hh,
  "snowy-rainy": Hh,
  sunny: qo,
  windy: Qo,
  "windy-variant": Qo
};
function X0(s) {
  return yk[s] ?? jb;
}
function xk(s) {
  if (!s) return "";
  const t = Date.parse(s);
  return Number.isNaN(t) ? "" : new Date(t).toLocaleDateString(void 0, { weekday: "short" });
}
function wk({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", i = s.attributes, a = i.temperature, r = i.temperature_unit ?? "°", u = s.state, c = X0(u), d = P(s), p = (Array.isArray(i.forecast) ? i.forecast : []).slice(0, 4);
  return t ? /* @__PURE__ */ m.jsx(Xt, { className: "simui-weather is-unavailable", children: /* @__PURE__ */ m.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: d, children: d }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ m.jsxs(Xt, { className: "simui-weather", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-wx-head", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-wx-ic", children: /* @__PURE__ */ m.jsx(c, { size: 26, strokeWidth: 1.75 }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "simui-wx-now", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "simui-wx-temp", children: [
          a != null ? vs(a) : "—",
          /* @__PURE__ */ m.jsx("span", { className: "simui-unit", children: r })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-wx-cond", title: d, children: pt(u) })
      ] })
    ] }),
    p.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-wx-fc", children: p.map((v, g) => {
      const b = X0(v.condition ?? "");
      return /* @__PURE__ */ m.jsxs("div", { className: "simui-wx-fcd", children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-wx-fcl", children: xk(v.datetime) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-wx-fci", children: /* @__PURE__ */ m.jsx(b, { size: 14, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ m.jsxs("span", { className: "simui-wx-fct", children: [
          v.temperature != null ? vs(v.temperature) : "—",
          "°"
        ] })
      ] }, v.datetime ?? g);
    }) })
  ] });
}
const _k = {
  light: lk,
  sensor: vk,
  climate: tk,
  media_player: fk,
  cover: ek,
  lock: rk,
  camera: FE,
  weather: wk,
  fan: nk,
  vacuum: bk,
  scene: Lo,
  script: Lo,
  button: Lo,
  input_button: Lo
};
function R1(s) {
  return _k[s] ?? ak;
}
function Sk({ block: s }) {
  const t = s.entityIds[0], i = ke(t), a = R1(at(t));
  return i ? /* @__PURE__ */ m.jsx(a, { entity: i }) : /* @__PURE__ */ m.jsxs("div", { className: "simui-tile", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-row", children: /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: t, children: t }) }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-state", children: "Unavailable" })
  ] });
}
class Xl extends C.Component {
  constructor() {
    super(...arguments);
    hs(this, "state", { failed: !1 });
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
    return this.state.failed ? this.props.fallback !== void 0 ? this.props.fallback : this.props.compact ? /* @__PURE__ */ m.jsx("div", { className: "simui-eb-compact", role: "status", children: this.props.label ? `${this.props.label} unavailable` : "Unavailable" }) : /* @__PURE__ */ m.jsxs("div", { className: "simui-eb-full", role: "alert", children: [
      /* @__PURE__ */ m.jsx("div", { className: "simui-eb-title", children: "Something went wrong" }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-eb-body", children: "A part of the panel failed to render. Navigate away and back, or reload to recover." })
    ] }) : this.props.children;
  }
}
function Mk({ block: s }) {
  return s.chart ? /* @__PURE__ */ m.jsx("div", { className: "simui-surface card", children: /* @__PURE__ */ m.jsx(Xl, { fallback: /* @__PURE__ */ m.jsx("div", { className: "simui-chart-fallback", children: "Chart unavailable" }), children: /* @__PURE__ */ m.jsx(C1, { spec: s.chart }) }) }) : null;
}
const L1 = (s) => s === 2 ? " span-2" : s === "full" ? " span-full" : "", Nk = (s) => s === 2 ? "2×" : s === "full" ? "Full" : "1×";
function of({ block: s }) {
  switch (s.type) {
    case "hero":
      return /* @__PURE__ */ m.jsx(TN, { block: s });
    case "group":
      return /* @__PURE__ */ m.jsx(AE, { block: s });
    case "list":
      return /* @__PURE__ */ m.jsx(KE, { block: s });
    case "chart":
      return /* @__PURE__ */ m.jsx(Mk, { block: s });
    case "card":
      return /* @__PURE__ */ m.jsx(Sk, { block: s });
    case "attention":
      return /* @__PURE__ */ m.jsx(dN, { entities: s.entityIds });
    default:
      return null;
  }
}
function B1({ block: s }) {
  return $e((i) => {
    const a = s.visibleWhen;
    if (!a) return !0;
    const r = i[a.entity];
    return U1(a, r?.state, Number(r?.state));
  }) ? /* @__PURE__ */ m.jsx("div", { className: `simui-block${L1(s.span)}`, children: /* @__PURE__ */ m.jsx(of, { block: s }) }) : null;
}
function U1(s, t, i) {
  if (s.state != null) {
    const a = Array.isArray(s.state) ? s.state : [s.state];
    if (t == null || !a.includes(t)) return !1;
  }
  return !(s.above != null && !(i > s.above) || s.below != null && !(i < s.below));
}
function uf({ block: s, editing: t }) {
  const { removeBlock: i, cycleBlockSpan: a } = Ns(), r = $e((x) => {
    const S = s.visibleWhen;
    if (!S) return !0;
    const w = x[S.entity];
    return U1(S, w?.state, Number(w?.state));
  }), { attributes: u, listeners: c, setNodeRef: d, transform: p, transition: v, isDragging: g } = $2({
    id: s.id,
    disabled: !t
  });
  if (!r && !t) return null;
  const b = {
    transform: ql.Transform.toString(p),
    transition: v,
    zIndex: g ? 20 : void 0
  };
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      ref: d,
      style: b,
      className: `simui-block${L1(s.span)}${t ? " editing" : ""}${g ? " dragging" : ""}`,
      children: [
        /* @__PURE__ */ m.jsx(of, { block: s }),
        t && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx("div", { className: "simui-card-grab", ...u, ...c, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ m.jsx("button", { className: "simui-card-btn size", onPointerDown: (x) => x.stopPropagation(), onClick: () => a(s.id), "aria-label": "Cycle width", children: Nk(s.span) }),
          /* @__PURE__ */ m.jsx("button", { className: "simui-card-btn x", onPointerDown: (x) => x.stopPropagation(), onClick: () => i(s.id), "aria-label": "Remove block", children: "×" })
        ] })
      ]
    }
  );
}
function H1({ existing: s, onAdd: t, onClose: i }) {
  const a = Xd(), [r, u] = C.useState(""), c = new Set(s), d = r.toLowerCase(), p = Object.values(a).filter((v) => !c.has(v.entity_id)).filter((v) => P(v).toLowerCase().includes(d) || v.entity_id.includes(d)).sort((v, g) => P(v).localeCompare(P(g))).slice(0, 200);
  return /* @__PURE__ */ m.jsx("div", { className: "simui-modal", onClick: i, children: /* @__PURE__ */ m.jsxs("div", { className: "simui-modal-card", onClick: (v) => v.stopPropagation(), children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ m.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: r,
          onChange: (v) => u(v.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: i, "aria-label": "Close", children: /* @__PURE__ */ m.jsx(Jd, { size: 16 }) })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-modal-list", children: [
      p.map((v) => /* @__PURE__ */ m.jsxs("div", { className: "simui-add-row", onClick: () => t(v.entity_id), children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-name", title: v.entity_id, children: P(v) }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-add-dom", children: at(v.entity_id) })
      ] }, v.entity_id)),
      p.length === 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function Ck(s, t) {
  return t === "above_horizon" ? s < 8 ? "dawn" : s >= 18 ? "dusk" : "day" : t === "below_horizon" ? s >= 5 && s < 8 ? "dawn" : s >= 18 && s < 21 ? "dusk" : "night" : s < 5 ? "night" : s < 8 ? "dawn" : s < 18 ? "day" : s < 21 ? "dusk" : "night";
}
const jk = {
  dawn: { hue: "var(--pink)", base: 0.55 },
  // rose first light
  day: { hue: "var(--warm)", base: 0.42 },
  // warm, low — daylight carries the room
  dusk: { hue: "var(--violet)", base: 0.62 },
  // violet wind-down
  night: { hue: "var(--slate)", base: 0.34 }
  // deep, cool, quiet
};
function Ek(s, t) {
  const i = t && t.length ? t.filter((p) => p.startsWith("light.")) : Object.keys(s).filter((p) => p.startsWith("light."));
  let a = 0;
  if (i.length) {
    const p = i.reduce((v, g) => v + (s[g]?.state === "on" ? 1 : 0), 0);
    a = Math.round(p / i.length * 10);
  }
  let r = 0;
  for (const p in s)
    if (p.charCodeAt(0) === 99 && p.startsWith("climate.") && s[p]?.attributes?.hvac_action === "cooling") {
      r = 1;
      break;
    }
  const u = s["sun.sun"]?.state ?? "", c = Ck((/* @__PURE__ */ new Date()).getHours(), String(u));
  return (c === "night" ? 0 : c === "dawn" ? 1 : c === "day" ? 2 : 3) * 100 + r * 20 + a;
}
function kk(s) {
  const t = Math.floor(s / 100), i = t === 0 ? "night" : t === 1 ? "dawn" : t === 2 ? "day" : "dusk", a = Math.floor(s % 100 / 20) === 1, r = s % 20;
  return { phase: i, cooling: a, warm: r };
}
function q1({
  mode: s = "field",
  lightIds: t,
  maxOpacity: i,
  className: a
}) {
  const r = $e((M) => Ek(M, t)), { phase: u, cooling: c, warm: d } = C.useMemo(() => kk(r), [r]), p = jk[u], v = d / 10, g = i ?? (s === "dots" ? 0.16 : 0.2), b = g * 0.3, x = Math.min(g, b + v * (g - b) * p.base * 1.6 + p.base * (g - b) * 0.5), S = Math.min(g, b + v * (g - b) * 1.2 + p.base * (g - b) * 0.4), w = {
    "--amb-phase": p.hue,
    // Warm bloom strength: present once any light is on, scaled by the fraction.
    "--amb-warm": v.toFixed(2),
    // Cool wash: only ignites while a climate entity is actively cooling.
    "--amb-cool": c ? "1" : "0",
    "--amb-opacity": (s === "dots" ? S : x).toFixed(3)
  };
  return /* @__PURE__ */ m.jsx(
    "div",
    {
      className: `simui-ambient-canvas is-${s}${a ? ` ${a}` : ""}`,
      "data-phase": u,
      "aria-hidden": "true",
      style: w
    }
  );
}
function zk() {
  const s = (/* @__PURE__ */ new Date()).getHours();
  return s < 5 ? "Good night" : s < 12 ? "Good morning" : s < 18 ? "Good afternoon" : "Good evening";
}
function Tk() {
  const { config: s, openRoom: t, editing: i, setEditing: a, reorderBlocks: r, addCard: u, createHomeOverride: c, resetHomeOverride: d } = Ns(), p = Xd(), v = ou(), [g, b] = C.useState(!1), x = Hd(Ud(Jl, { activationConstraint: { distance: 5 } })), S = C.useMemo(() => Object.keys(p).sort().join(","), [p]), w = C.useMemo(() => Qb({ states: p }), [S, v]), M = s ? s.rooms.map((A) => A.id).join(",") : "", N = C.useMemo(
    () => s ? s.rooms.flatMap((A) => A.blocks.flatMap((X) => X.entityIds)).filter((A) => A.startsWith("light.")) : [],
    [M]
    // eslint-disable-line react-hooks/exhaustive-deps
  ), E = s?.overrides?.home, T = E ? E.blocks : w.blocks, R = T.map((A) => A.id), D = () => {
    if (i) {
      a(!1);
      return;
    }
    E || c(w.blocks), a(!0);
  }, V = () => {
    d(), a(!1);
  }, G = (A) => {
    const { active: X, over: J } = A;
    if (!J || X.id === J.id) return;
    const rt = R.indexOf(String(X.id)), st = R.indexOf(String(J.id));
    rt >= 0 && st >= 0 && r(rt, st);
  };
  return s ? /* @__PURE__ */ m.jsxs("div", { className: "simui-app simui-home", children: [
    /* @__PURE__ */ m.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-head-title", children: zk() }),
      /* @__PURE__ */ m.jsx(Ok, { config: s }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      i && E && /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: V, "aria-label": "Reset home", children: /* @__PURE__ */ m.jsx(Ob, { size: 15 }) }),
      i && /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: () => b(!0), "aria-label": "Add card", children: /* @__PURE__ */ m.jsx(er, { size: 16 }) }),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `simui-iconbtn-h${i ? " active" : ""}`,
          onClick: D,
          "aria-label": i ? "Done editing" : "Edit home",
          children: i ? /* @__PURE__ */ m.jsx(Wd, { size: 16 }) : /* @__PURE__ */ m.jsx(Fd, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-content simui-home-content", children: [
      /* @__PURE__ */ m.jsx(q1, { lightIds: N }),
      /* @__PURE__ */ m.jsxs("div", { className: "simui-home-layer", children: [
        w.statusStrip && w.statusStrip.length > 0 && /* @__PURE__ */ m.jsx(Fb, { pills: w.statusStrip }),
        T.length > 0 && (E ? /* @__PURE__ */ m.jsx(Yd, { sensors: x, collisionDetection: qd, onDragEnd: G, children: /* @__PURE__ */ m.jsx(Kd, { items: R, strategy: Pl, children: /* @__PURE__ */ m.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((A) => /* @__PURE__ */ m.jsx(uf, { block: A, editing: i }, A.id)) }) }) }) : /* @__PURE__ */ m.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((A) => /* @__PURE__ */ m.jsx(B1, { block: A }, A.id)) })),
        /* @__PURE__ */ m.jsx("div", { className: "simui-rooms-head", children: "Rooms" }),
        /* @__PURE__ */ m.jsx("div", { className: "simui-home-grid", children: s.rooms.map((A) => /* @__PURE__ */ m.jsx(mM, { room: A, onOpen: () => t(A.id) }, A.id)) })
      ] })
    ] }),
    g && /* @__PURE__ */ m.jsx(
      H1,
      {
        existing: T.flatMap((A) => A.entityIds),
        onAdd: u,
        onClose: () => b(!1)
      }
    )
  ] }) : null;
}
function Ok({ config: s }) {
  const t = $e((i) => {
    const r = s.rooms.flatMap((c) => c.blocks.flatMap((d) => d.entityIds)).filter((c) => c.startsWith("light.")).filter((c) => i[c]?.state === "on").length, u = s.rooms.length;
    return `${u} ${u === 1 ? "room" : "rooms"}${r ? ` · ${r} lights on` : ""}`;
  });
  return /* @__PURE__ */ m.jsx("span", { className: "simui-head-glance num", children: t });
}
function Dk({ room: s }) {
  const { editing: t, setEditing: i, reorderBlocks: a, addCard: r, goHome: u } = Ns(), [c, d] = C.useState(!1), p = Hd(Ud(Jl, { activationConstraint: { distance: 5 } })), v = s.blocks.map((x) => x.id), g = C.useMemo(() => Hb(s), [s]), b = (x) => {
    const { active: S, over: w } = x;
    if (!w || S.id === w.id) return;
    const M = v.indexOf(String(S.id)), N = v.indexOf(String(w.id));
    M >= 0 && N >= 0 && a(M, N);
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ m.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ m.jsx("button", { className: "simui-back", onClick: u, "aria-label": "Back to home", children: /* @__PURE__ */ m.jsx(Nb, { size: 18 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-head-title", children: s.name }),
      /* @__PURE__ */ m.jsx(Ak, { room: s, lightIds: g }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      t && /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: () => d(!0), "aria-label": "Add card", children: /* @__PURE__ */ m.jsx(er, { size: 16 }) }),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `simui-iconbtn-h${t ? " active" : ""}`,
          onClick: () => i(!t),
          "aria-label": t ? "Done editing" : "Edit room",
          children: t ? /* @__PURE__ */ m.jsx(Wd, { size: 16 }) : /* @__PURE__ */ m.jsx(Fd, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-content simui-room", children: [
      /* @__PURE__ */ m.jsx(Rk, { lightIds: g }),
      /* @__PURE__ */ m.jsx(Yd, { sensors: p, collisionDetection: qd, onDragEnd: b, children: /* @__PURE__ */ m.jsx(Kd, { items: v, strategy: Pl, children: /* @__PURE__ */ m.jsx("div", { className: "simui-grid", children: s.blocks.map((x) => /* @__PURE__ */ m.jsx(uf, { block: x, editing: t }, x.id)) }) }) })
    ] }),
    c && /* @__PURE__ */ m.jsx(
      H1,
      {
        existing: s.blocks.flatMap((x) => x.entityIds),
        onAdd: r,
        onClose: () => d(!1)
      }
    )
  ] });
}
function Ak({ room: s, lightIds: t }) {
  const i = $e((a) => Ub(s, t, a));
  return i ? /* @__PURE__ */ m.jsx("span", { className: "simui-head-glance num", children: i }) : null;
}
function Rk({ lightIds: s }) {
  const i = 0.04 + $e((a) => {
    if (!s.length) return 0;
    const r = s.filter((u) => a[u]?.state === "on").length;
    return Math.round(r / s.length * 10) / 10;
  }) * 0.13;
  return /* @__PURE__ */ m.jsx("div", { className: "simui-ambient", style: { "--amb": String(i) } });
}
function Lk({
  kinds: s,
  preview: t,
  onPick: i,
  onBeginPlace: a,
  query: r,
  onQueryChange: u,
  onClose: c
}) {
  const [d, p] = C.useState(""), v = r ?? d, g = u ?? p, b = C.useId(), x = v.trim().toLowerCase(), S = C.useMemo(() => x ? s.filter(
    (w) => w.label.toLowerCase().includes(x) || w.description.toLowerCase().includes(x) || w.id.toLowerCase().includes(x) || w.type.toLowerCase().includes(x)
  ) : s, [s, x]);
  return Hn.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "simui-root simui-gallery-backdrop", onClick: c, children: /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: "simui-gallery",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": b,
        onClick: (w) => w.stopPropagation(),
        children: [
          /* @__PURE__ */ m.jsxs("header", { className: "simui-gallery-head", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "simui-gallery-search", children: [
              /* @__PURE__ */ m.jsx(RS, { size: 15, className: "simui-gallery-search-ic", "aria-hidden": !0 }),
              /* @__PURE__ */ m.jsx(
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
            /* @__PURE__ */ m.jsx("span", { id: b, className: "simui-gallery-title-sr", children: "Add a card" }),
            /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: c, "aria-label": "Close gallery", children: /* @__PURE__ */ m.jsx(Jd, { size: 16 }) })
          ] }),
          /* @__PURE__ */ m.jsxs("div", { className: "simui-gallery-grid", role: "list", children: [
            S.map((w) => /* @__PURE__ */ m.jsx(
              Bk,
              {
                kind: w,
                preview: t,
                onPick: i,
                onBeginPlace: a
              },
              w.id
            )),
            S.length === 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-gallery-empty", children: s.length === 0 ? "No card types available for this surface." : `No card types match “${v}”.` })
          ] })
        ]
      }
    ) }),
    document.body
  );
}
function Bk({
  kind: s,
  preview: t,
  onPick: i,
  onBeginPlace: a
}) {
  const r = C.useMemo(
    () => s.make(Uk(s, t)),
    // `preview` identity is stable for the gallery's lifetime (built once by the
    // host from useAllStates); resampling only on a new kind is intentional.
    [s, t]
  ), u = (r.entityIds?.length ?? 0) > 0, c = !!a, d = (p) => {
    a?.(s);
    try {
      p.dataTransfer.setData("application/x-simui-card", s.id), p.dataTransfer.effectAllowed = "copy";
    } catch {
    }
  };
  return /* @__PURE__ */ m.jsxs(
    "button",
    {
      type: "button",
      role: "listitem",
      className: "simui-gallery-card",
      draggable: c,
      onDragStart: c ? d : void 0,
      onClick: () => i(s),
      "aria-label": `Add ${s.label} — ${s.description}`,
      children: [
        /* @__PURE__ */ m.jsx("div", { className: "simui-gallery-preview", "aria-hidden": !0, children: /* @__PURE__ */ m.jsx("div", { className: "simui-gallery-preview-scale", children: u ? /* @__PURE__ */ m.jsx(Xl, { fallback: /* @__PURE__ */ m.jsx(Z0, { kind: s }), children: /* @__PURE__ */ m.jsx(of, { block: r }) }) : /* @__PURE__ */ m.jsx(Z0, { kind: s, empty: !0 }) }) }),
        /* @__PURE__ */ m.jsxs("div", { className: "simui-gallery-meta", children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-gallery-card-ic", "aria-hidden": !0, children: Vn(s.icon, 14) }),
          /* @__PURE__ */ m.jsx("span", { className: "simui-gallery-card-label", children: s.label }),
          /* @__PURE__ */ m.jsx("span", { className: "simui-gallery-card-desc", children: s.description })
        ] })
      ]
    }
  );
}
function Z0({ kind: s, empty: t }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-gallery-preview-stub", children: [
    /* @__PURE__ */ m.jsx("span", { className: "simui-gallery-stub-ic", children: Vn(s.icon, 22) }),
    /* @__PURE__ */ m.jsx("span", { className: "simui-gallery-stub-label", children: t ? "Add entities after dropping" : s.label })
  ] });
}
function Uk(s, t) {
  const i = Hk(s.type), a = s.domains, r = t.sample(i, a);
  return r.length > 0 ? r : a ? t.sample(i) : r;
}
function Hk(s) {
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
function qk(s) {
  return s === "card" || s === "hero" || s === "chart" ? 1 : 3;
}
function Qk(s, t) {
  const i = qk(s.type), a = t.sample(i, s.domains);
  return a.length ? a : t.sample(i);
}
const $k = [
  {
    id: "group",
    type: "group",
    label: "Group",
    icon: "group",
    defaultSpan: "full",
    description: "A surface of related controls.",
    make: (s) => ({ id: Bi(), type: "group", title: "Group", entityIds: s, span: "full", axis: "none" })
  },
  {
    id: "list",
    type: "list",
    label: "List",
    icon: "list",
    defaultSpan: "full",
    description: "A hairline-divided list of entities.",
    make: (s) => ({ id: Bi(), type: "list", title: "List", entityIds: s, span: "full" })
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
      id: Bi(),
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
    make: (s) => ({ id: Bi(), type: "hero", entityIds: s.slice(0, 1), span: 2 })
  },
  {
    id: "card",
    type: "card",
    label: "Card",
    icon: "box",
    defaultSpan: 1,
    description: "A single entity tile.",
    make: (s) => ({ id: Bi(), type: "card", entityIds: s.slice(0, 1), span: 1 })
  }
], Vk = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Yk(s) {
  const t = Object.keys(s).sort();
  return {
    states: s,
    sample: (a, r) => {
      const u = [];
      for (const c of t) {
        if (r && !r.includes(at(c))) continue;
        const d = s[c];
        if (!(!d || Vk.has(d.state)) && (u.push(c), u.length >= a))
          break;
      }
      return u;
    },
    resolve: (a) => s[a]
  };
}
const Gk = /* @__PURE__ */ new Set(["lights", "climate"]), Kk = {
  lights: "lights",
  climate: "climate",
  sensors: "sensors",
  power: "power",
  security: "security",
  server: "server"
}, Xk = {
  lights: "Lights",
  climate: "Climate",
  media: "Media",
  security: "Security",
  sensors: "Sensors",
  power: "Power",
  scenes: "Scenes",
  server: "System"
};
function Zk({ categoryId: s }) {
  const t = Xd(), i = ou(), a = F2(), { config: r, goHome: u, editing: c, setEditing: d, reorderBlocks: p, addBlock: v, createOverride: g, resetOverride: b } = Ns(), [x, S] = C.useState(!1), w = Hd(Ud(Jl, { activationConstraint: { distance: 5 } })), M = C.useMemo(() => Object.keys(t).sort().join(","), [t]), N = C.useMemo(() => {
    const F = Kk[s], vt = F ? MN(F) : void 0;
    return vt ? vt.build({ states: t, areas: i, registry: a }) : Wk(s, t);
  }, [s, M, i, a]), E = r?.overrides?.[`category:${s}`], T = E ? E.blocks : N.blocks, R = T.map((F) => F.id), D = C.useMemo(() => Yk(t), [M]), V = (F) => {
    v(F.make(Qk(F, D))), S(!1);
  }, G = Xk[s] ?? s, A = Gk.has(s), X = C.useMemo(
    () => A ? T.flatMap((F) => F.entityIds).filter((F) => F.startsWith("light.")) : [],
    [A, T]
  ), J = (F) => {
    const { active: vt, over: bt } = F;
    if (!bt || vt.id === bt.id) return;
    const Tt = R.indexOf(String(vt.id)), L = R.indexOf(String(bt.id));
    Tt >= 0 && L >= 0 && p(Tt, L);
  }, rt = () => {
    if (c) {
      d(!1);
      return;
    }
    E || g(s, N.blocks), d(!0);
  }, st = () => {
    b(s), d(!1);
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ m.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ m.jsx("button", { className: "simui-back", onClick: u, "aria-label": "Back to home", children: /* @__PURE__ */ m.jsx(Nb, { size: 18 }) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-head-title", children: G }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-spacer" }),
      c && E && /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: st, "aria-label": "Reset to preset", children: /* @__PURE__ */ m.jsx(Ob, { size: 15 }) }),
      c && /* @__PURE__ */ m.jsx("button", { className: "simui-iconbtn-h", onClick: () => S(!0), "aria-label": "Add card", children: /* @__PURE__ */ m.jsx(er, { size: 16 }) }),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `simui-iconbtn-h${c ? " active" : ""}`,
          onClick: rt,
          "aria-label": c ? "Done editing" : "Edit surface",
          children: c ? /* @__PURE__ */ m.jsx(Wd, { size: 16 }) : /* @__PURE__ */ m.jsx(Fd, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: `simui-content${A ? " simui-cat-content" : ""}`, children: [
      A && /* @__PURE__ */ m.jsx(q1, { mode: "field", lightIds: X, maxOpacity: 0.12 }),
      /* @__PURE__ */ m.jsxs("div", { className: A ? "simui-cat-layer" : void 0, children: [
        N.statusStrip && N.statusStrip.length > 0 && /* @__PURE__ */ m.jsx(Fb, { pills: N.statusStrip }),
        T.length ? E ? /* @__PURE__ */ m.jsx(Yd, { sensors: w, collisionDetection: qd, onDragEnd: J, children: /* @__PURE__ */ m.jsx(Kd, { items: R, strategy: Pl, children: /* @__PURE__ */ m.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((F) => /* @__PURE__ */ m.jsx(uf, { block: F, editing: c }, F.id)) }) }) }) : /* @__PURE__ */ m.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((F) => /* @__PURE__ */ m.jsx(B1, { block: F }, F.id)) }) : /* @__PURE__ */ m.jsxs("div", { className: "simui-msg", children: [
          "Nothing in ",
          G.toLowerCase(),
          " yet."
        ] })
      ] })
    ] }),
    x && /* @__PURE__ */ m.jsx(
      Lk,
      {
        kinds: $k,
        preview: D,
        onPick: V,
        onClose: () => S(!1)
      }
    )
  ] });
}
function Wk(s, t) {
  const i = { blocks: [] };
  if (s === "media") {
    const a = Qn(t, "media_player").filter(ae);
    for (const r of a)
      i.blocks.push({ id: zt("cat-media"), type: "card", entityIds: [r.entity_id], span: 2 });
    return i;
  }
  if (s === "scenes") {
    const a = [...Qn(t, "scene"), ...Qn(t, "script")].filter(ae).map((r) => r.entity_id);
    return a.length && i.blocks.push({ id: zt("cat-scenes"), type: "group", title: "Scenes & scripts", axis: "function", entityIds: a, span: "full" }), i;
  }
  return i;
}
function Ik({
  hs: s,
  onChange: t,
  size: i = 200,
  label: a = "Colour"
}) {
  const r = C.useRef(null), u = C.useRef(!1), c = C.useId(), [d, p] = s, v = d * Math.PI / 180, g = Math.min(1, Math.max(0, p / 100)), b = 0.5 + Math.cos(v) * 0.5 * g, x = 0.5 + Math.sin(v) * 0.5 * g, S = C.useCallback(
    (T, R) => {
      const D = r.current;
      if (!D) return s;
      const V = D.getBoundingClientRect(), G = (T - V.left) / V.width - 0.5, A = (R - V.top) / V.height - 0.5;
      let X = Math.atan2(A, G) * 180 / Math.PI;
      X < 0 && (X += 360);
      const J = Math.min(1, Math.hypot(G, A) / 0.5);
      return [Math.round(X), Math.round(J * 100)];
    },
    [s]
  ), w = C.useCallback(
    (T) => {
      T.preventDefault(), u.current = !0, T.currentTarget.setPointerCapture?.(T.pointerId), t(S(T.clientX, T.clientY));
    },
    [S, t]
  ), M = C.useCallback(
    (T) => {
      u.current && t(S(T.clientX, T.clientY));
    },
    [S, t]
  ), N = C.useCallback((T) => {
    u.current = !1, T.currentTarget.releasePointerCapture?.(T.pointerId);
  }, []), E = C.useCallback(
    (T) => {
      switch (T.key) {
        case "ArrowRight":
          T.preventDefault(), t([(d + 6) % 360, p]);
          break;
        case "ArrowLeft":
          T.preventDefault(), t([(d - 6 + 360) % 360, p]);
          break;
        case "ArrowUp":
          T.preventDefault(), t([d, Math.min(100, p + 6)]);
          break;
        case "ArrowDown":
          T.preventDefault(), t([d, Math.max(0, p - 6)]);
          break;
        case "Home":
          T.preventDefault(), t([d, 100]);
          break;
        case "End":
          T.preventDefault(), t([d, 0]);
          break;
      }
    },
    [d, p, t]
  );
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      ref: r,
      className: "simui-wheel",
      role: "slider",
      tabIndex: 0,
      "aria-label": a,
      "aria-labelledby": c,
      "aria-valuetext": `Hue ${d} degrees, saturation ${p} percent`,
      "aria-valuemin": 0,
      "aria-valuemax": 360,
      "aria-valuenow": d,
      style: { width: i, height: i },
      onPointerDown: w,
      onPointerMove: M,
      onPointerUp: N,
      onPointerCancel: N,
      onKeyDown: E,
      children: [
        /* @__PURE__ */ m.jsx("span", { id: c, className: "simui-sr-only", children: a }),
        /* @__PURE__ */ m.jsx("div", { className: "simui-wheel-disc", "aria-hidden": "true" }),
        /* @__PURE__ */ m.jsx(
          "div",
          {
            className: "simui-wheel-thumb",
            "aria-hidden": "true",
            style: {
              left: `${b * 100}%`,
              top: `${x * 100}%`,
              background: `hsl(${d} ${p}% 50%)`
            }
          }
        )
      ]
    }
  );
}
const on = 270, ba = 135, Tl = 200, Un = Tl / 2, Uo = 78, dd = 12;
function fd({
  value: s,
  min: t,
  max: i,
  step: a = 0.5,
  current: r,
  unit: u = "°",
  tint: c = "muted",
  label: d = "Target temperature",
  onChange: p,
  size: v = 200
}) {
  const g = C.useRef(null), b = C.useRef(!1), x = Math.max(1e-4, i - t), S = Jk((s - t) / x), w = c === "warm" ? "var(--warm)" : c === "cool" ? "var(--cool)" : "var(--accent)", M = C.useCallback(
    (A) => {
      const X = Math.round((A - t) / a) * a + t, J = Math.round(X / a) * a;
      return Fk(Number(J.toFixed(4)), t, i);
    },
    [t, i, a]
  ), N = C.useCallback(
    (A, X) => {
      const J = g.current;
      if (!J) return s;
      const rt = J.getBoundingClientRect(), st = (A - rt.left) / rt.width * Tl - Un, F = (X - rt.top) / rt.height * Tl - Un;
      let bt = Math.atan2(F, st) * 180 / Math.PI - ba;
      for (; bt < 0; ) bt += 360;
      return bt > on && (bt = bt - on > (360 - on) / 2 ? 0 : on), M(t + bt / on * x);
    },
    [s, M, t, x]
  ), E = C.useCallback(
    (A) => {
      A.preventDefault(), b.current = !0, A.currentTarget.setPointerCapture?.(A.pointerId), p(N(A.clientX, A.clientY));
    },
    [N, p]
  ), T = C.useCallback(
    (A) => {
      b.current && p(N(A.clientX, A.clientY));
    },
    [N, p]
  ), R = C.useCallback((A) => {
    b.current = !1, A.currentTarget.releasePointerCapture?.(A.pointerId);
  }, []), D = C.useCallback(
    (A) => {
      switch (A.key) {
        case "ArrowRight":
        case "ArrowUp":
          A.preventDefault(), p(M(s + a));
          break;
        case "ArrowLeft":
        case "ArrowDown":
          A.preventDefault(), p(M(s - a));
          break;
        case "Home":
          A.preventDefault(), p(t);
          break;
        case "End":
          A.preventDefault(), p(i);
          break;
      }
    },
    [s, a, M, p, t, i]
  ), V = on / 360 * 2 * Math.PI * Uo, G = Td(ba + S * on, Uo);
  return /* @__PURE__ */ m.jsxs(
    "svg",
    {
      ref: g,
      className: "simui-dial",
      role: "slider",
      tabIndex: 0,
      "aria-label": d,
      "aria-valuemin": t,
      "aria-valuemax": i,
      "aria-valuenow": s,
      "aria-valuetext": `${md(s)}${u}`,
      viewBox: `0 0 ${Tl} ${Tl}`,
      width: v,
      height: v,
      onPointerDown: E,
      onPointerMove: T,
      onPointerUp: R,
      onPointerCancel: R,
      onKeyDown: D,
      children: [
        /* @__PURE__ */ m.jsx(
          "path",
          {
            className: "simui-dial-track",
            d: W0(ba, ba + on, Uo),
            fill: "none",
            strokeWidth: dd,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ m.jsx(
          "path",
          {
            className: "simui-dial-prog",
            d: W0(ba, ba + S * on, Uo),
            fill: "none",
            stroke: w,
            strokeWidth: dd,
            strokeLinecap: "round",
            style: { strokeDasharray: V, transition: "stroke 0.2s ease" }
          }
        ),
        /* @__PURE__ */ m.jsx(
          "circle",
          {
            className: "simui-dial-knob",
            cx: G.x,
            cy: G.y,
            r: dd / 2 + 3,
            fill: w,
            style: { transition: "fill 0.2s ease" }
          }
        ),
        /* @__PURE__ */ m.jsxs("text", { className: "simui-dial-value", x: Un, y: Un - 2, textAnchor: "middle", fill: "var(--text)", children: [
          md(s),
          /* @__PURE__ */ m.jsx("tspan", { className: "simui-dial-unit", fill: "var(--muted)", children: u })
        ] }),
        r != null && /* @__PURE__ */ m.jsxs("text", { className: "simui-dial-current", x: Un, y: Un + 24, textAnchor: "middle", fill: "var(--muted)", children: [
          md(r),
          u,
          " now"
        ] })
      ]
    }
  );
}
function W0(s, t, i) {
  const a = Td(s, i), r = Td(t, i), u = Math.abs(t - s) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${i} ${i} 0 ${u} 1 ${r.x} ${r.y}`;
}
function Td(s, t) {
  const i = s * Math.PI / 180;
  return { x: Un + Math.cos(i) * t, y: Un + Math.sin(i) * t };
}
function Fk(s, t, i) {
  return Math.min(i, Math.max(t, s));
}
function Jk(s) {
  return Math.min(1, Math.max(0, s));
}
function md(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function Od(s, t) {
  const i = C.useRef(s);
  i.current = s;
  const a = C.useRef(0), r = C.useRef(null), u = C.useRef(null);
  return C.useCallback(
    (...c) => {
      u.current = c;
      const d = performance.now(), p = t - (d - a.current);
      p <= 0 ? (a.current = d, u.current = null, i.current(...c)) : r.current == null && (r.current = setTimeout(() => {
        r.current = null, a.current = performance.now();
        const v = u.current;
        u.current = null, v && i.current(...v);
      }, p));
    },
    [t]
  );
}
const Pk = /* @__PURE__ */ new Set(["light", "climate"]);
function tz(s) {
  return Pk.has(at(s));
}
function cf({ entityId: s }) {
  const t = ke(s);
  if (!t) return null;
  const i = at(s);
  return i === "light" ? /* @__PURE__ */ m.jsx(ez, { entity: t }) : i === "climate" ? /* @__PURE__ */ m.jsx(az, { entity: t }) : /* @__PURE__ */ m.jsx(lz, { entity: t, domain: i });
}
const I0 = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]);
function ez({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.attributes, r = s.state === "on", u = a.brightness ?? 0, c = r ? Math.max(1, Math.round(u / 255 * 100)) : 0, d = a.supported_color_modes ?? [], p = a.color_mode, v = (V) => a[V] != null, g = d.some((V) => I0.has(V)) || p != null && I0.has(p) || v("rgb_color") || v("hs_color") || v("rgbw_color") || v("rgbww_color") || v("xy_color"), b = d.includes("color_temp") || p === "color_temp" || v("color_temp") || v("color_temp_kelvin"), x = a.min_color_temp_kelvin ?? 2200, S = a.max_color_temp_kelvin ?? 6500, w = a.color_temp_kelvin ?? Math.round((x + S) / 2), N = a.hs_color ?? [40, 70], E = (V) => {
    t("light", "turn_on", { brightness_pct: V }, { entity_id: i });
  }, T = (V) => {
    t("light", "turn_on", { color_temp_kelvin: V }, { entity_id: i });
  }, R = Od(
    (V) => {
      t("light", "turn_on", { hs_color: V }, { entity_id: i });
    },
    110
  ), D = {
    background: `linear-gradient(to right, var(--warm) ${c}%, var(--faint) ${c}%)`
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom light", children: [
    g && /* @__PURE__ */ m.jsx("div", { className: "simui-bloom-wheelwrap", children: /* @__PURE__ */ m.jsx(Ik, { hs: N, onChange: R, size: 208, label: "Light colour" }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom-sliders", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "simui-qc-row", children: [
        /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
        /* @__PURE__ */ m.jsx("span", { className: "simui-qc-val num", children: r ? `${c}%` : "Off" })
      ] }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          className: "simui-slider warm",
          type: "range",
          min: 0,
          max: 100,
          value: c,
          "aria-label": "Brightness",
          style: D,
          onChange: (V) => E(Number(V.target.value))
        }
      ),
      b && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsxs("div", { className: "simui-qc-row", children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Temperature" }),
          /* @__PURE__ */ m.jsxs("span", { className: "simui-qc-val num", children: [
            w,
            "K"
          ] })
        ] }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            className: "simui-temp-ribbon",
            type: "range",
            min: x,
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
const iz = /* @__PURE__ */ new Set(["heating", "heat"]), nz = /* @__PURE__ */ new Set(["cooling", "cool", "fan"]);
function sz(s) {
  const t = s.attributes.hvac_action, i = s.state;
  return t && iz.has(t) ? "warm" : t && nz.has(t) ? "cool" : i === "heat" ? "warm" : i === "cool" ? "cool" : "muted";
}
function az({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.attributes, r = a.min_temp ?? 7, u = a.max_temp ?? 35, c = a.target_temp_step ?? 0.5, d = a.current_temperature, p = a.temperature, v = a.target_temp_low, g = a.target_temp_high, b = a.hvac_modes ?? [], x = sz(s), S = Od(
    (M) => {
      t("climate", "set_temperature", { temperature: M }, { entity_id: i });
    },
    110
  ), w = Od(
    (M, N) => {
      t("climate", "set_temperature", { target_temp_low: M, target_temp_high: N }, { entity_id: i });
    },
    110
  );
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom climate", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-bloom-dialwrap", children: p != null ? /* @__PURE__ */ m.jsx(
      fd,
      {
        value: ms(p, r, u),
        min: r,
        max: u,
        step: c,
        current: d,
        tint: x,
        label: "Target temperature",
        onChange: S,
        size: 208
      }
    ) : v != null && g != null ? (
      // heat_cool: a heating dial + a cooling dial side by side (single-thumb each).
      /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom-dialpair", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Heat to" }),
          /* @__PURE__ */ m.jsx(
            fd,
            {
              value: ms(v, r, g),
              min: r,
              max: g,
              step: c,
              current: d,
              tint: "warm",
              label: "Heat to",
              onChange: (M) => w(M, g),
              size: 150
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Cool to" }),
          /* @__PURE__ */ m.jsx(
            fd,
            {
              value: ms(g, v, u),
              min: v,
              max: u,
              step: c,
              current: d,
              tint: "cool",
              label: "Cool to",
              onChange: (M) => w(v, M),
              size: 150
            }
          )
        ] })
      ] })
    ) : d != null && /* @__PURE__ */ m.jsxs("div", { className: "simui-bloom-readonly num", children: [
      d,
      "° now"
    ] }) }),
    b.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "simui-seg simui-bloom-modes", role: "group", "aria-label": "HVAC mode", children: b.map((M) => {
      const N = s.state === M;
      return /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `simui-segbtn${N ? " is-active" : ""}`,
          "aria-pressed": N,
          onClick: () => {
            t("climate", "set_hvac_mode", { hvac_mode: M }, { entity_id: i });
          },
          children: pt(M)
        },
        M
      );
    }) })
  ] });
}
function lz({ entity: s, domain: t }) {
  const i = rz(t);
  return i.length ? /* @__PURE__ */ m.jsx("div", { className: "simui-bloom feats", children: /* @__PURE__ */ m.jsx(ar, { entity: s, features: i }) }) : null;
}
function rz(s) {
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
function js({ entity: s, omit: t }) {
  const i = s.attributes, a = /* @__PURE__ */ new Set([
    "friendly_name",
    "icon",
    "supported_features",
    "entity_picture",
    ...t ?? []
  ]), r = Object.entries(i).filter(([u]) => !a.has(u)).filter(([, u]) => u != null && u !== "" && (typeof u != "object" || Array.isArray(u)));
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-attrs", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-key", children: "State" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-val num", children: pt(s.state) })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-key", children: "Changed" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-val num", children: ru(s.last_changed) || "—" })
    ] }),
    r.map(([u, c]) => /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-key", children: pt(u) }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-val num", children: oz(c) })
    ] }, u)),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-key", children: "Entity" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-val muted", children: s.entity_id })
    ] })
  ] });
}
function oz(s) {
  return Array.isArray(s) ? s.map((t) => String(t)).join(", ") : typeof s == "number" ? String(s) : typeof s == "boolean" ? s ? "Yes" : "No" : pt(String(s));
}
const uz = [
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
function cz({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.attributes, r = a.effect_list ?? [], u = a.effect, c = a.color_mode;
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ m.jsx(cf, { entityId: i }) }),
    c && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-pillrow", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-pilllabel", children: "Colour mode" }),
      /* @__PURE__ */ m.jsx("span", { className: "simui-detail-pillval num", children: pt(c) })
    ] }),
    r.length > 0 && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Effect" }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Effect", children: r.map((d) => {
        const p = u === d;
        return /* @__PURE__ */ m.jsx(
          "button",
          {
            className: `simui-segbtn${p ? " is-active" : ""}`,
            "aria-pressed": p,
            onClick: () => {
              t("light", "turn_on", { effect: d }, { entity_id: i });
            },
            children: pt(d)
          },
          d
        );
      }) })
    ] }),
    /* @__PURE__ */ m.jsx(js, { entity: s, omit: [...uz, "effect", "effect_list", "color_mode"] })
  ] });
}
function Zl({
  value: s,
  unit: t,
  sub: i,
  tone: a,
  since: r
}) {
  const u = r ? ru(r) : "";
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-dh", children: [
    /* @__PURE__ */ m.jsxs("div", { className: `simui-dh-value num${a ? ` ${a}` : ""}`, children: [
      s,
      t && /* @__PURE__ */ m.jsx("span", { className: "simui-dh-unit", children: t })
    ] }),
    i && /* @__PURE__ */ m.jsx("div", { className: "simui-dh-sub", children: i }),
    u && /* @__PURE__ */ m.jsx("div", { className: "simui-dh-since num", children: u })
  ] });
}
const hz = [
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
function dz(s) {
  const t = s.attributes.hvac_action;
  if (t === "heating" || s.state === "heat") return "warm";
  if (t === "cooling" || t === "fan" || s.state === "cool") return "cool";
}
function fz({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.attributes, r = a.current_temperature, u = a.current_humidity, c = a.hvac_action, d = a.preset_modes ?? [], p = a.preset_mode, v = a.fan_modes ?? [], g = a.fan_mode, b = [
    pt(c || s.state),
    u != null ? `${Math.round(u)}% humidity` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsx(
      Zl,
      {
        value: r != null ? Math.round(r) : "—",
        unit: "°",
        sub: b || void 0,
        tone: dz(s),
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ m.jsx(cf, { entityId: i }) }),
    d.length > 0 && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Preset" }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Preset mode", children: d.map((x) => {
        const S = p === x;
        return /* @__PURE__ */ m.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_preset_mode", { preset_mode: x }, { entity_id: i });
            },
            children: pt(x)
          },
          x
        );
      }) })
    ] }),
    v.length > 0 && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Fan" }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Fan mode", children: v.map((x) => {
        const S = g === x;
        return /* @__PURE__ */ m.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_fan_mode", { fan_mode: x }, { entity_id: i });
            },
            children: pt(x)
          },
          x
        );
      }) })
    ] }),
    /* @__PURE__ */ m.jsx(js, { entity: s, omit: [...hz, "preset_modes", "preset_mode", "fan_modes", "fan_mode"] })
  ] });
}
const Li = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREV: 16,
  NEXT: 32,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384
};
function mz({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.attributes, r = s.state, u = r === "playing", c = r === "off" || r === "idle" || r === "standby" || r === "unavailable", d = a.media_title, p = a.media_artist ?? a.media_album_name ?? a.app_name, v = a.entity_picture, g = D1(v), b = a.volume_level, x = a.is_volume_muted === !0, S = a.source_list ?? [], w = a.source, M = jt(s, Li.PLAY) || jt(s, Li.PAUSE) || jt(s, Li.PREV) || jt(s, Li.NEXT), N = (R, D) => {
    t("media_player", R, D, { entity_id: i });
  }, E = b != null ? Math.round(b * 100) : 0, T = {
    background: `linear-gradient(to right, var(--accent) ${E}%, var(--faint) ${E}%)`
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: `simui-md-now${g ? " is-album-tinted" : ""}`,
        style: g ? A1(g) : void 0,
        children: [
          v ? /* @__PURE__ */ m.jsx("img", { className: "simui-md-art", src: v, alt: "" }) : /* @__PURE__ */ m.jsx("div", { className: "simui-md-art" }),
          /* @__PURE__ */ m.jsxs("div", { className: "simui-md-meta", children: [
            d ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
              /* @__PURE__ */ m.jsx("span", { className: "simui-md-title", title: d, children: d }),
              p && /* @__PURE__ */ m.jsx("span", { className: "simui-md-artist", title: p, children: p })
            ] }) : /* @__PURE__ */ m.jsx("span", { className: "simui-md-title", children: pt(r) }),
            d && /* @__PURE__ */ m.jsx("span", { className: "simui-md-state num", children: pt(r) })
          ] })
        ]
      }
    ),
    M && /* @__PURE__ */ m.jsxs("div", { className: "simui-md-transport", children: [
      jt(s, Li.PREV) && /* @__PURE__ */ m.jsx("button", { className: "simui-md-btn", "aria-label": "Previous", onClick: () => N("media_previous_track"), children: /* @__PURE__ */ m.jsx(Ab, { size: 20, fill: "currentColor" }) }),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "simui-md-btn play",
          "aria-label": u ? "Pause" : "Play",
          disabled: c,
          onClick: () => N("media_play_pause"),
          children: u ? /* @__PURE__ */ m.jsx(Tb, { size: 18, fill: "currentColor" }) : /* @__PURE__ */ m.jsx(Na, { size: 18, fill: "currentColor" })
        }
      ),
      jt(s, Li.STOP) && /* @__PURE__ */ m.jsx("button", { className: "simui-md-btn", "aria-label": "Stop", onClick: () => N("media_stop"), children: /* @__PURE__ */ m.jsx(Ca, { size: 14, fill: "currentColor" }) }),
      jt(s, Li.NEXT) && /* @__PURE__ */ m.jsx("button", { className: "simui-md-btn", "aria-label": "Next", onClick: () => N("media_next_track"), children: /* @__PURE__ */ m.jsx(Rb, { size: 20, fill: "currentColor" }) })
    ] }),
    (jt(s, Li.VOLUME_SET) || b != null) && /* @__PURE__ */ m.jsxs("div", { className: "simui-md-volrow", children: [
      jt(s, Li.VOLUME_MUTE) && /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `simui-iconbtn-h${x ? " active" : ""}`,
          "aria-label": x ? "Unmute" : "Mute",
          "aria-pressed": x,
          onClick: () => N("volume_mute", { is_volume_muted: !x }),
          children: x ? /* @__PURE__ */ m.jsx(Bb, { size: 16 }) : /* @__PURE__ */ m.jsx(Lb, { size: 16 })
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: x ? 0 : E,
          "aria-label": "Volume",
          style: T,
          onChange: (R) => N("volume_set", { volume_level: Number(R.target.value) / 100 })
        }
      ),
      /* @__PURE__ */ m.jsxs("span", { className: "simui-qc-val num", children: [
        E,
        "%"
      ] })
    ] }),
    jt(s, Li.SELECT_SOURCE) && S.length > 0 && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Source" }),
      /* @__PURE__ */ m.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Source", children: S.map((R) => {
        const D = w === R;
        return /* @__PURE__ */ m.jsx(
          "button",
          {
            className: `simui-segbtn${D ? " is-active" : ""}`,
            "aria-pressed": D,
            onClick: () => N("select_source", { source: R }),
            children: R
          },
          R
        );
      }) })
    ] }),
    /* @__PURE__ */ m.jsx(
      js,
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
function pz({ entity: s }) {
  const t = Bt(), i = s.attributes, a = i.current_position, r = i.current_tilt_position, u = jt(s, Si.SET_POSITION) && a != null, c = jt(s, Si.SET_TILT_POSITION) || jt(s, Si.OPEN_TILT) || jt(s, Si.CLOSE_TILT), d = (g, b) => {
    t("cover", g, b, { entity_id: s.entity_id });
  }, p = a != null ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0, v = r != null ? { background: `linear-gradient(to right, var(--accent) ${r}%, var(--faint) ${r}%)` } : void 0;
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsx(
      Zl,
      {
        value: a ?? pt(s.state),
        unit: a != null ? "%" : void 0,
        sub: a != null ? pt(s.state) : void 0,
        tone: s.state === "open" ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    u && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsx("span", { className: "simui-qc-label", children: "Position" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: a,
          "aria-label": "Position",
          style: p,
          onChange: (g) => d("set_cover_position", { position: Number(g.target.value) })
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-buttons", children: [
      jt(s, Si.OPEN) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => d("open_cover"), children: /* @__PURE__ */ m.jsx($l, { size: 16, strokeWidth: 2 }) }),
      jt(s, Si.STOP) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => d("stop_cover"), children: /* @__PURE__ */ m.jsx(Ca, { size: 12, strokeWidth: 2 }) }),
      jt(s, Si.CLOSE) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => d("close_cover"), children: /* @__PURE__ */ m.jsx(gs, { size: 16, strokeWidth: 2 }) })
    ] }),
    c && /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ m.jsxs("span", { className: "simui-qc-label", children: [
        "Tilt",
        r != null ? ` · ${r}%` : ""
      ] }),
      jt(s, Si.SET_TILT_POSITION) && r != null && /* @__PURE__ */ m.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: r,
          "aria-label": "Tilt",
          style: v,
          onChange: (g) => d("set_cover_tilt_position", { tilt_position: Number(g.target.value) })
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-buttons", children: [
        jt(s, Si.OPEN_TILT) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Open tilt", onClick: () => d("open_cover_tilt"), children: /* @__PURE__ */ m.jsx($l, { size: 16, strokeWidth: 2 }) }),
        jt(s, Si.STOP_TILT) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Stop tilt", onClick: () => d("stop_cover_tilt"), children: /* @__PURE__ */ m.jsx(Ca, { size: 12, strokeWidth: 2 }) }),
        jt(s, Si.CLOSE_TILT) && /* @__PURE__ */ m.jsx("button", { className: "simui-sbtn", "aria-label": "Close tilt", onClick: () => d("close_cover_tilt"), children: /* @__PURE__ */ m.jsx(gs, { size: 16, strokeWidth: 2 }) })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(js, { entity: s, omit: ["current_position", "current_tilt_position"] })
  ] });
}
function vz({ entity: s }) {
  const t = Bt(), i = s.entity_id, a = s.state === "locked", r = s.state === "locking" || s.state === "unlocking", u = (c) => {
    t("lock", c, {}, { entity_id: i });
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsx(
      Zl,
      {
        value: pt(s.state),
        tone: a ? void 0 : "warn",
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-buttons wide", children: [
      /* @__PURE__ */ m.jsxs(
        "button",
        {
          className: `simui-segbtn lg${a ? " is-active" : ""}`,
          "aria-pressed": a,
          disabled: r,
          onClick: () => u("lock"),
          children: [
            /* @__PURE__ */ m.jsx(bs, { size: 15, strokeWidth: 2 }),
            " Lock"
          ]
        }
      ),
      /* @__PURE__ */ m.jsxs(
        "button",
        {
          className: `simui-segbtn lg${!a && !r ? " is-active" : ""}`,
          "aria-pressed": !a && !r,
          disabled: r,
          onClick: () => u("unlock"),
          children: [
            /* @__PURE__ */ m.jsx(Da, { size: 15, strokeWidth: 2 }),
            " Unlock"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ m.jsx(js, { entity: s })
  ] });
}
function gz({ entity: s }) {
  const i = s.attributes.unit_of_measurement, a = Number.parseFloat(s.state), r = at(s.entity_id) === "sensor" && s.state !== "" && Number.isFinite(a), u = s.state === "on";
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    r ? /* @__PURE__ */ m.jsx(Zl, { value: bz(a), unit: i, since: s.last_changed }) : /* @__PURE__ */ m.jsx(
      Zl,
      {
        value: pt(s.state),
        tone: u ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    r && /* @__PURE__ */ m.jsx("div", { className: "simui-detail-chart", children: /* @__PURE__ */ m.jsx(z1, { entityId: s.entity_id, accent: "var(--cyan)" }) }),
    /* @__PURE__ */ m.jsx(js, { entity: s })
  ] });
}
function bz(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toLocaleString() : s.toFixed(1).replace(/\.0$/, "");
}
function yz({ entityId: s }) {
  const t = ke(s);
  if (!t)
    return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail-empty", children: [
      s,
      " is unavailable."
    ] });
  switch (at(s)) {
    case "light":
      return /* @__PURE__ */ m.jsx(cz, { entity: t });
    case "climate":
      return /* @__PURE__ */ m.jsx(fz, { entity: t });
    case "media_player":
      return /* @__PURE__ */ m.jsx(mz, { entity: t });
    case "cover":
      return /* @__PURE__ */ m.jsx(pz, { entity: t });
    case "lock":
      return /* @__PURE__ */ m.jsx(vz, { entity: t });
    case "sensor":
    case "binary_sensor":
      return /* @__PURE__ */ m.jsx(gz, { entity: t });
    default:
      return /* @__PURE__ */ m.jsx(xz, { entity: t });
  }
}
function xz({ entity: s }) {
  const t = s.entity_id, i = R1(at(t));
  return /* @__PURE__ */ m.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ m.jsx("div", { className: "simui-detail-widget", children: tz(t) ? /* @__PURE__ */ m.jsx(cf, { entityId: t }) : Yl(t) ? /* @__PURE__ */ m.jsx(Gl, { entityId: t }) : /* @__PURE__ */ m.jsx(i, { entity: s }) }),
    /* @__PURE__ */ m.jsx(js, { entity: s })
  ] });
}
function wz() {
  const { config: s, route: t, sheetEntityId: i, closeSheet: a } = Ns(), r = t.kind === "home" ? "home" : `${t.kind}/${t.id}`;
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(Xl, { compact: !0, label: "This view", resetKey: r, children: /* @__PURE__ */ m.jsx(u, {}) }),
    /* @__PURE__ */ m.jsx(Xl, { compact: !0, label: "Detail", resetKey: i ?? "", children: /* @__PURE__ */ m.jsx(_z, { entityId: i, onClose: a }) })
  ] });
  function u() {
    if (!s) return /* @__PURE__ */ m.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
    if (t.kind === "category") return /* @__PURE__ */ m.jsx(Zk, { categoryId: t.id });
    if (!s.rooms.length) return /* @__PURE__ */ m.jsx("div", { className: "simui-msg", children: "No rooms to show yet." });
    if (t.kind === "home") return /* @__PURE__ */ m.jsx(Tk, {});
    const c = s.rooms.find((d) => d.id === t.id) ?? s.rooms[0];
    return /* @__PURE__ */ m.jsx(Dk, { room: c }, c.id);
  }
}
function _z({ entityId: s, onClose: t }) {
  const i = ke(s ?? ""), a = s ? i ? P(i) : s : void 0;
  return /* @__PURE__ */ m.jsx(k1, { open: !!s, title: a, onClose: t, children: s && /* @__PURE__ */ m.jsx(yz, { entityId: s }) });
}
function Sz() {
  return G2() === "live" ? null : /* @__PURE__ */ m.jsxs("div", { className: "simui-conn-banner", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ m.jsx(OS, { size: 13, className: "simui-conn-ic", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx("span", { children: "Reconnecting to Home Assistant…" })
  ] });
}
function Mz() {
  return /* @__PURE__ */ m.jsxs(Xl, { children: [
    /* @__PURE__ */ m.jsx(Sz, {}),
    /* @__PURE__ */ m.jsx(h_, { children: /* @__PURE__ */ m.jsx(wz, {}) })
  ] });
}
const Nz = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--cool: #5ec8e6;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--violet: #a78bfa;--cyan: #5ec8e6;--pink: #ec8fb8;--teal: #34c0a8;--slate: #7c93c8;--hairline: var(--divider-color, rgba(255,255,255,.06));--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:0 0 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:color-mix(in srgb,var(--text) 4%,var(--surface));border:1px solid transparent;border-radius:16px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease,border-color .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{background:color-mix(in srgb,var(--text) 7.5%,var(--surface))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-erow.is-unavailable,.simui-slidertile.is-unavailable,.simui-tile.is-unavailable,.simui-statusboard.is-unavailable,.simui-metric.is-unavailable{opacity:.4}.simui-slidertile.is-unavailable{cursor:default}.simui-slidertile.is-unavailable .simui-slidertile-fill{display:none}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-state.on{color:var(--accent)}.simui-since{color:var(--muted);opacity:.62;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}.simui-topbar{display:flex;align-items:center;gap:8px;padding:6px 2px 10px}.simui-pills{display:flex;gap:6px;overflow-x:auto;min-width:0;scrollbar-width:none}.simui-pills::-webkit-scrollbar{display:none}.simui-pill{flex:none;padding:6px 13px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,background .12s ease}.simui-pill:hover{color:var(--text)}.simui-pill.active{color:var(--text);background:var(--surface);border-color:var(--faint)}.simui-room{position:relative}.simui-ambient{position:absolute;inset:0 -16px auto;height:300px;z-index:0;pointer-events:none;opacity:var(--amb, .06);background:radial-gradient(120% 80% at 26% 0%,var(--warm),transparent 62%)}.simui-room>.simui-room-head,.simui-room>.simui-grid{position:relative;z-index:1}.simui-room-head{display:flex;align-items:baseline;gap:12px;padding:8px 2px 16px}.simui-room-name{font-size:22px;font-weight:600;letter-spacing:-.3px}.simui-room-glance{font-size:12px;color:var(--muted)}.simui-block{position:relative}.simui-block.span-2{grid-column:span 2}.simui-block.span-full{grid-column:1 / -1}.simui-block.editing .simui-surface,.simui-block.editing .simui-tile,.simui-block.editing .simui-hero{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px;border-radius:var(--radius)}.simui-block.dragging{opacity:.55}.simui-hero{padding:2px 6px 18px}.simui-hero-temp{font-size:46px;font-weight:300;letter-spacing:-1.5px;line-height:.9}.simui-hero-temp small{font-size:20px;color:var(--muted);font-weight:400}.simui-hero-sub{margin-top:8px;font-size:12px;color:var(--muted)}.simui-hero-state{font-size:30px;font-weight:400;letter-spacing:-.8px;line-height:1}.simui-hero.is-state .simui-feats{margin-top:14px}.simui-surface{background:var(--group, rgba(255, 255, 255, .035));border:none;border-radius:20px;padding:15px 16px}.simui-surface-head{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:11px;font-weight:500}.simui-rows{display:flex;flex-direction:column}.simui-rows.divided .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-master{display:flex;align-items:center;gap:10px;margin-bottom:10px}.simui-master-label{font-size:12px;color:var(--muted);width:26px}.simui-master-val{font-size:12px;color:var(--text);min-width:34px;text-align:right}.simui-erow{display:flex;align-items:center;gap:10px;padding:8px 0;min-width:0;width:100%;background:none;border:none;color:inherit;font:inherit;text-align:left}button.simui-erow,.simui-erow.as-row{cursor:pointer}.simui-erow-name{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-erow-name.as-btn{background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-align:left;min-width:0}.simui-erow-name.muted{color:var(--muted)}.simui-erow-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-erow-ic.amber{color:var(--warn)}.simui-erow-ic.cool{color:var(--accent)}.simui-erow-dot{flex:none;width:9px;height:9px;padding:0;border:none;border-radius:50%;background:#4b4f57;cursor:pointer}.simui-erow-dot[data-on=true]{background:var(--warm);box-shadow:0 0 0 3px color-mix(in srgb,var(--warm) 20%,transparent)}.simui-erow-state{font-size:12px;color:var(--muted)}.simui-erow-state.warn{color:var(--warn)}.simui-erow-state.on{color:var(--accent)}.simui-erow-val{font-size:13px;color:var(--text)}.simui-slider.mini{max-width:96px}.simui-rbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer}.simui-rbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--bg);border-bottom:1px solid var(--faint)}.simui-head-title{font-size:20px;font-weight:600;letter-spacing:-.3px;white-space:nowrap}.simui-head-glance{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-back{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;margin-left:-6px;border-radius:9px;border:none;background:transparent;color:var(--muted);cursor:pointer}.simui-back:hover{color:var(--text);background:var(--surface)}.simui-content{padding:16px}.simui-home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}.simui-roomcard{position:relative;display:flex;flex-direction:column;gap:10px;min-height:122px;padding:15px 16px;text-align:left;color:var(--text);background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border:1px solid transparent;border-radius:20px;cursor:pointer;overflow:hidden;transition:background .18s ease,transform .12s ease,box-shadow .18s ease}.simui-roomcard:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface));transform:translateY(-1px);box-shadow:0 6px 22px #00000038}.simui-roomcard:active{transform:translateY(0) scale(.995)}.simui-roomcard.lit{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 20%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 5%,var(--surface))}.simui-roomcard.lit:hover{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 26%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 7%,var(--surface))}.simui-roomcard-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.simui-roomcard-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:40px;height:40px;border-radius:13px;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-icon.warm{color:var(--warm);background:color-mix(in srgb,var(--warm) 16%,transparent)}.simui-roomcard-icon.amber{color:var(--warn);background:color-mix(in srgb,var(--warn) 16%,transparent)}.simui-roomcard-icon.accent{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-name{font-size:15px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-roomcard-go{color:var(--muted);flex:none;opacity:.5}.simui-roomcard-glance{font-size:12px;color:var(--muted);margin-top:auto}.simui-feats{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.simui-feats:empty{display:none}.simui-seg{display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-segbtn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-width:26px;height:24px;padding:0 8px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,background .12s ease}.simui-segbtn:hover:not(:disabled){color:var(--text)}.simui-segbtn.is-active{background:var(--surface);color:var(--accent)}.simui-segbtn:disabled{opacity:.45;cursor:default}.simui-ftoggle{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--faint);background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-ftoggle.is-active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-fsel-wrap{position:relative;display:inline-flex;align-items:center}.simui-fsel{appearance:none;-webkit-appearance:none;height:26px;padding:0 26px 0 10px;border-radius:8px;border:1px solid var(--faint);background:var(--surface-2);color:var(--text);font-size:12px;font-weight:500;cursor:pointer;outline:none}.simui-fsel:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-fsel-caret{position:absolute;right:8px;pointer-events:none;color:var(--muted)}.simui-strip{display:flex;align-items:stretch;gap:8px;overflow-x:auto;min-width:0;margin-bottom:14px;padding-bottom:2px;scrollbar-width:none}.simui-strip::-webkit-scrollbar{display:none}.simui-pill-count,.simui-pill-nav,.simui-pill-action,.simui-pill-badge,.simui-pill-status,.simui-pill-select{--pill-accent: var(--muted);flex:none;display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 13px;border-radius:999px;border:1px solid var(--faint);background:var(--surface);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,border-color .12s ease,background .12s ease}.simui-pill-count:disabled,.simui-pill-nav:disabled,.simui-pill-action:disabled,.simui-pill-select:disabled{cursor:default}.simui-pill-count:hover:not(:disabled),.simui-pill-nav:hover:not(:disabled),.simui-pill-action:hover:not(:disabled),.simui-pill-status.is-clickable:hover,.simui-pill-select:hover:not(:disabled){color:var(--text);border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-pill-ic{display:inline-flex;align-items:center;color:var(--muted)}.simui-pill-num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum";font-weight:600;color:var(--text)}.simui-pill-label{color:var(--muted)}.simui-pill-count.is-active{color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 9%,var(--surface))}.simui-pill-count.is-active .simui-pill-ic,.simui-pill-nav .simui-pill-ic{color:var(--pill-accent)}.simui-pill-action{width:36px;padding:0;justify-content:center}.simui-pill-action .simui-pill-ic{color:var(--pill-accent)}.simui-pill-badge{cursor:default;color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 10%,var(--surface))}.simui-pill-badge .simui-pill-ic{color:var(--pill-accent)}.simui-pill-status{cursor:default;align-items:center}.simui-pill-status.is-clickable{cursor:pointer}.simui-pill-status.is-active{border-color:color-mix(in srgb,var(--pill-accent) 35%,var(--faint))}.simui-pill-ic.is-on{color:var(--pill-accent)}.simui-pill-status-body{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15}.simui-pill-status-primary{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums}.simui-pill-status-secondary{color:var(--muted);font-size:11px}.simui-pill-select{gap:6px}.simui-pill-select-name{color:var(--muted)}.simui-pill-select-value{color:var(--text);font-weight:600}.simui-pill-select-caret{display:inline-flex;color:var(--muted)}.simui-sheet-backdrop{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;justify-content:center;background:#00000080}.simui-sheet{display:flex;flex-direction:column;width:100%;max-width:540px;max-height:88vh;background:var(--surface);border:1px solid var(--faint);border-radius:20px 20px 0 0;overflow:hidden;box-shadow:0 -8px 40px #0006}.simui-sheet-head{position:sticky;top:0;flex:none;display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--faint);background:var(--surface)}.simui-sheet-title{flex:1;font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-sheet-body{overflow:auto;padding:16px}@media(min-width:720px){.simui-sheet-backdrop{align-items:center;padding:24px}.simui-sheet{border-radius:18px;max-width:480px}}.simui-detail{display:flex;flex-direction:column;gap:16px}.simui-detail-widget .simui-tile{background:var(--surface-2)}.simui-detail-empty{color:var(--muted);font-size:14px}.simui-detail-attrs{display:flex;flex-direction:column;gap:1px;border-top:1px solid var(--faint)}.simui-detail-attr{display:flex;align-items:baseline;gap:12px;padding:8px 2px;border-bottom:1px solid var(--faint)}.simui-detail-key{flex:none;min-width:120px;color:var(--muted);font-size:12px;text-transform:capitalize}.simui-detail-val{flex:1;text-align:right;font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;word-break:break-word}.simui-detail-val.muted{color:var(--muted)}.simui-qc{display:flex;flex-direction:column;gap:11px}.simui-qc.compact{gap:9px}.simui-qc-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px}.simui-qc-label{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-qc-val{font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-qc-swatches{display:flex;flex-wrap:wrap;gap:8px}.simui-qc-swatch{width:26px;height:26px;padding:0;border-radius:50%;border:1px solid var(--hairline);cursor:pointer;transition:transform .1s ease,box-shadow .12s ease}.simui-qc-swatch:hover{transform:scale(1.12);box-shadow:0 0 0 2px color-mix(in srgb,var(--text) 18%,transparent)}.simui-qc.compact .simui-qc-swatch{width:22px;height:22px}.simui-temp-ribbon{-webkit-appearance:none;appearance:none;width:100%;height:14px;border-radius:999px;cursor:pointer;outline:none;background:linear-gradient(to right,#ffb46b,#fff4e6,#cfe0ff)}.simui-temp-ribbon::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28);box-shadow:0 1px 4px #00000073}.simui-temp-ribbon::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28)}.simui-erow.climate .simui-feats{flex:none;margin-left:10px}.simui-ctxmenu{position:fixed;z-index:200;box-sizing:border-box;display:flex;flex-direction:column;width:max-content;min-width:200px;max-width:min(280px,calc(100vw - 16px));min-height:0;max-height:calc(100vh - 16px);overflow-y:auto;padding:6px;background:var(--surface-2);border:1px solid var(--hairline);border-radius:14px;box-shadow:0 14px 40px #00000080;outline:none}.simui-ctxgroup{display:contents}.simui-ctxhead{padding:4px 6px 8px}.simui-ctxhead+.simui-ctxitem{margin-top:0}.simui-ctxsep{height:1px;margin:5px 6px;background:var(--hairline)}.simui-ctxitem{display:flex;align-items:center;gap:9px;width:100%;min-width:0;padding:8px 9px;border:none;border-radius:9px;background:transparent;color:var(--text);font-size:13px;text-align:left;cursor:pointer}.simui-ctxitem:hover:not(:disabled),.simui-ctxitem.is-active{background:var(--surface)}.simui-ctxitem:disabled{opacity:.4;cursor:default}.simui-ctxitem.danger{color:var(--down)}.simui-ctxic{display:inline-flex;flex:none;color:var(--muted)}.simui-ctxitem.danger .simui-ctxic{color:var(--down)}.simui-ctxlabel{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-chart{display:flex;flex-direction:column;gap:8px;width:100%}.simui-chart-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 16px}.simui-chart-title{font-size:13px;font-weight:600;color:var(--text)}.simui-chart-readout{display:flex;flex-wrap:wrap;gap:6px 16px;margin-left:auto}.simui-chart-cur{display:inline-flex;align-items:center;gap:6px;font-size:12px}.simui-chart-dot{width:8px;height:8px;border-radius:50%;flex:none}.simui-chart-cur-name{color:var(--muted)}.simui-chart-cur-val{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-chart-cur-val small{color:var(--muted);font-weight:500}.simui-chart-canvas{width:100%;height:220px}.simui-chart-fallback{padding:18px 4px;color:var(--muted);font-size:13px}.simui-surface-grid{align-items:start}.simui-surface.card{padding:12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius)}.simui-subgroups{display:flex;flex-direction:column;gap:12px}.simui-subhead{font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500;margin:2px 0 6px}.simui-list-empty{padding:4px 2px;font-size:13px;color:var(--muted)}.simui-launcher-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px}.simui-tile.is-vertical{align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px}.simui-tile.is-launcher{cursor:pointer}.simui-tile.is-launcher.is-tinted{background:color-mix(in srgb,var(--tile-accent) 10%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 28%,var(--faint))}.simui-launch-ic{display:inline-flex;align-items:center;justify-content:center;color:var(--tile-accent, var(--accent))}.simui-launch-name{font-size:12px;font-weight:600;max-width:100%}.simui-scene-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);color:var(--text);cursor:pointer;transition:border-color .15s ease,background .15s ease}.simui-scene-tile:hover{border-color:color-mix(in srgb,var(--accent) 30%,var(--faint))}.simui-scene-tile .simui-launch-ic,.simui-ic.on{color:var(--accent)}.simui-tile.is-tinted{background:color-mix(in srgb,var(--tile-accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 22%,var(--faint))}.simui-rooms-head{margin:18px 2px 10px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-home-summary{margin-bottom:4px}.simui-home-content{position:relative}.simui-home-layer{position:relative;z-index:1}.simui-home-summary{display:flex;flex-direction:column;align-items:stretch;gap:22px;margin-bottom:10px}.simui-home-summary>.simui-block{min-width:0;width:100%}.simui-home-summary .simui-surface,.simui-home-summary .simui-surface.list,.simui-home-summary .simui-surface.card{background:transparent;border:none;padding:0;border-radius:0}.simui-home-summary .simui-surface-head{margin:0 2px 10px}.simui-home-summary .simui-launcher-grid{gap:4px;grid-template-columns:repeat(auto-fill,minmax(78px,1fr))}.simui-home-summary .simui-tile.is-launcher,.simui-home-summary .simui-tile.is-launcher.is-tinted,.simui-home-summary .simui-tile.is-launcher.is-active{background:transparent;border:none;min-height:80px;gap:9px;padding:8px 4px;border-radius:16px;transition:background .15s ease,transform .12s ease}.simui-home-summary .simui-tile.is-launcher:hover{background:color-mix(in srgb,var(--text) 5%,transparent)}.simui-home-summary .simui-tile.is-launcher:active{transform:scale(.97)}.simui-home-summary .simui-launch-ic{width:48px;height:48px;border-radius:16px;color:var(--tile-accent, var(--accent));background:color-mix(in srgb,var(--tile-accent, var(--accent)) 15%,transparent)}.simui-home-summary .simui-launch-name{color:var(--text);font-size:12px;font-weight:500}.simui-home-summary .simui-rows .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-home-layer .simui-pill-count,.simui-home-layer .simui-pill-nav,.simui-home-layer .simui-pill-action,.simui-home-layer .simui-pill-select{background:color-mix(in srgb,var(--text) 3%,transparent);border-color:color-mix(in srgb,var(--text) 9%,transparent)}.simui-rooms-head{margin:26px 2px 12px}.simui-metric-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.simui-metric{--metric-accent: var(--muted);display:flex;flex-direction:column;gap:5px;padding:11px 12px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border-radius:14px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease}.simui-metric.is-clickable{cursor:pointer}.simui-metric.is-clickable:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface))}.simui-metric.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-metric-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;min-width:0}.simui-metric-name{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-metric-delta{flex:none;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-delta.up{color:var(--up)}.simui-metric-delta.down{color:var(--down)}.simui-metric-value{display:flex;align-items:baseline;gap:4px}.simui-metric-val{font-size:22px;font-weight:300;letter-spacing:-.5px;line-height:1;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-val.oob{color:var(--warn)}.simui-metric-unit{font-size:11px;color:var(--muted)}.simui-metric-spark{display:block;width:100%;margin-top:2px;color:var(--metric-accent)}.simui-metric-spark.is-empty{background:linear-gradient(var(--hairline),var(--hairline)) center / 100% 1px no-repeat}.simui-metric-band{fill:color-mix(in srgb,var(--up) 12%,transparent)}.simui-expand-glance.is-clickable{cursor:pointer}.simui-expand-glance.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:2px;border-radius:14px}.simui-expand-sheet{display:flex;flex-direction:column;gap:14px}.simui-expand-chart{width:100%}.simui-range-toggle{display:inline-flex;align-self:flex-start;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-range-btn{min-width:44px;height:26px;padding:0 10px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;font-variant-numeric:tabular-nums;transition:color .12s ease,background .12s ease}.simui-range-btn:hover{color:var(--text)}.simui-range-btn.active{background:var(--surface);color:var(--accent)}.simui-slider-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.simui-slidertile{--slider-tint: var(--warm);position:relative;display:flex;min-height:92px;padding:0;overflow:hidden;border-radius:16px;background:color-mix(in srgb,var(--text) 4%,var(--surface));box-shadow:inset 0 .5px #ffffff0f;cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;transition:box-shadow .15s ease}.simui-slidertile.is-on{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 24%,transparent)}.simui-slidertile.is-dragging{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 42%,transparent)}.simui-slidertile.is-static{cursor:default;touch-action:auto}.simui-slidertile:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-slidertile-fill{position:absolute;left:0;right:0;bottom:0;height:0;opacity:.18;pointer-events:none;transition:height .04s linear,opacity .15s ease}.simui-slidertile.is-on .simui-slidertile-fill{opacity:.28}.simui-slidertile.is-dragging .simui-slidertile-fill{transition:none}.simui-slidertile-body{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;gap:8px;width:100%;padding:11px 12px}.simui-slidertile-head{display:flex;align-items:center;gap:8px}.simui-slidertile-ic{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;padding:0;border:none;border-radius:9px;background:color-mix(in srgb,var(--text) 6%,transparent);color:var(--muted);cursor:pointer;transition:color .12s ease,background .12s ease}.simui-slidertile-ic.on{color:var(--slider-tint);background:color-mix(in srgb,var(--slider-tint) 16%,transparent)}.simui-slidertile-pct{margin-left:auto;font-size:13px;font-weight:500;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-slidertile-name{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-statusboard{--board-tint: var(--muted);display:flex;flex-direction:column;gap:6px;min-height:96px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));box-shadow:inset 0 .5px #ffffff0d;cursor:default;transition:background .18s ease,box-shadow .18s ease}.simui-statusboard.tone-secure{--board-tint: var(--up)}.simui-statusboard.tone-warn{--board-tint: var(--warn)}.simui-statusboard.tone-alert{--board-tint: var(--down)}.simui-statusboard.tone-idle{--board-tint: var(--muted)}.simui-statusboard.is-attn{background:color-mix(in srgb,var(--board-tint) 10%,var(--surface));box-shadow:inset 0 .5px #ffffff12,0 0 0 1px color-mix(in srgb,var(--board-tint) 30%,transparent),0 4px 18px color-mix(in srgb,var(--board-tint) 16%,transparent)}.simui-statusboard-ic{display:inline-flex;color:var(--muted)}.simui-statusboard.is-attn .simui-statusboard-ic{color:var(--board-tint)}.simui-statusboard-word{font-size:17px;font-weight:500;letter-spacing:-.2px;color:var(--text)}.simui-statusboard.is-attn .simui-statusboard-word{color:var(--board-tint)}.simui-statusboard-name{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard .simui-state{font-size:11px}.simui-attn{margin-bottom:2px}.simui-attn.is-clear{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:14px;background:color-mix(in srgb,var(--text) 3%,var(--surface))}.simui-attn-ic{display:inline-flex;color:var(--up)}.simui-attn-ic.warn{color:var(--warn)}.simui-attn-clear{font-size:13px;color:var(--muted)}.simui-attn.is-active{display:flex;flex-direction:column;gap:10px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--warn) 8%,var(--surface));box-shadow:0 0 0 1px color-mix(in srgb,var(--warn) 26%,transparent)}.simui-attn-head{display:flex;align-items:center;gap:8px}.simui-attn-title{font-size:13px;font-weight:600;color:var(--warn)}.simui-attn-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-ambient-canvas{position:absolute;inset:-16px 0 auto;height:460px;z-index:0;pointer-events:none;opacity:var(--amb-opacity, .12);transition:opacity .6s ease,background .6s ease}.simui-ambient-canvas.is-field{background:radial-gradient(120% 80% at 18% -10%,color-mix(in srgb,var(--warm) 70%,transparent),transparent 56%),radial-gradient(130% 90% at 84% -4%,var(--amb-phase, var(--slate)),transparent 60%)}.simui-ambient-canvas.is-field:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background:radial-gradient(120% 80% at 30% 0%,var(--warm),transparent 58%)}.simui-ambient-canvas.is-field:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:calc(var(--amb-cool, 0) * .7);background:radial-gradient(120% 90% at 80% 6%,var(--cool),transparent 60%)}.simui-ambient-canvas.is-dots{inset:0;height:auto;background-image:radial-gradient(color-mix(in srgb,var(--amb-phase, var(--warm)) 80%,transparent) .9px,transparent 1px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%);mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%)}.simui-ambient-canvas.is-dots:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background-image:radial-gradient(var(--warm) 1px,transparent 1.4px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,transparent 70%);mask-image:linear-gradient(to bottom,#000 0%,transparent 70%)}.simui-cat-content{position:relative}.simui-cat-layer{position:relative;z-index:1}.simui-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.simui-bloom{display:flex;flex-direction:column;gap:18px;align-items:stretch}.simui-bloom.light .simui-bloom-wheelwrap,.simui-bloom-dialwrap{display:flex;justify-content:center}.simui-bloom-sliders{display:flex;flex-direction:column;gap:9px}.simui-bloom-modes{align-self:stretch;flex-wrap:wrap}.simui-bloom-dialpair{display:flex;gap:18px;justify-content:center}.simui-bloom-dialcol{display:flex;flex-direction:column;align-items:center;gap:6px}.simui-bloom-readonly{font-size:30px;font-weight:300;color:var(--text);text-align:center;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wheel{position:relative;flex:none;border-radius:50%;cursor:pointer;touch-action:none;outline:none}.simui-wheel:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 55%,transparent)}.simui-wheel-disc{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at center,#fff,#fff0 70%),conic-gradient(from 90deg,red,#ff0,#0f0,#0ff,#00f,#f0f,red);box-shadow:inset 0 0 0 1px var(--hairline)}.simui-wheel-thumb{position:absolute;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid #fff;box-shadow:0 1px 5px #00000080;pointer-events:none}.simui-dial{flex:none;cursor:pointer;touch-action:none;outline:none}.simui-dial:focus-visible{filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 70%,transparent))}.simui-dial-track{stroke:var(--faint)}.simui-dial-knob{stroke:var(--surface);stroke-width:2}.simui-dial-value{font-size:40px;font-weight:300;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-dial-unit{font-size:20px}.simui-dial-current{font-size:12px}.simui-tile.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 12%,var(--surface));box-shadow:inset 0 .5px #ffffff0f,inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 22%,transparent)}.simui-tile.is-album-tinted .simui-art{box-shadow:0 2px 16px color-mix(in srgb,var(--album-tint) 38%,transparent)}.simui-dh{display:flex;flex-direction:column;gap:2px}.simui-dh-value{display:flex;align-items:baseline;gap:4px;font-size:44px;font-weight:300;line-height:1;letter-spacing:-1px;color:var(--text)}.simui-dh-value.warm{color:var(--warm)}.simui-dh-value.cool{color:var(--cool)}.simui-dh-value.accent{color:var(--accent)}.simui-dh-value.warn{color:var(--warn)}.simui-dh-value.up{color:var(--up)}.simui-dh-value.down{color:var(--down)}.simui-dh-unit{font-size:20px;font-weight:400;color:var(--muted)}.simui-dh-sub{font-size:13px;color:var(--muted)}.simui-dh-since{font-size:12px;color:var(--muted);opacity:.7}.simui-detail-field{display:flex;flex-direction:column;gap:8px}.simui-detail-seg{flex-wrap:wrap;align-self:flex-start;max-width:100%}.simui-detail-chart .simui-metric{background:var(--surface-2);border-radius:12px;padding:12px}.simui-detail-pillrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px}.simui-detail-pilllabel{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-detail-pillval{font-size:13px;color:var(--text)}.simui-detail-buttons{display:flex;align-items:center;gap:8px}.simui-detail-buttons .simui-sbtn{width:36px;height:30px}.simui-detail-buttons.wide{gap:10px}.simui-segbtn.lg{height:38px;flex:1;gap:7px;font-size:13px}.simui-md-now{display:flex;align-items:center;gap:14px;padding:12px;border-radius:16px;background:var(--surface-2)}.simui-md-now.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 14%,var(--surface));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 24%,transparent)}.simui-md-art{flex:none;width:84px;height:84px;border-radius:12px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-md-now.is-album-tinted .simui-md-art{box-shadow:0 2px 18px color-mix(in srgb,var(--album-tint) 40%,transparent)}.simui-md-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.simui-md-title{font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-artist{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-state{margin-top:2px;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)}.simui-md-transport{display:flex;align-items:center;justify-content:center;gap:22px}.simui-md-btn{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer;transition:color .12s ease}.simui-md-btn:hover:not(:disabled){color:var(--accent)}.simui-md-btn:disabled{opacity:.4;cursor:default}.simui-md-btn.play{width:48px;height:48px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-md-btn.play:hover:not(:disabled){color:var(--surface);opacity:.88}.simui-md-volrow{display:flex;align-items:center;gap:12px}.simui-md-volrow .simui-slider{flex:1}.simui-md-volrow .simui-qc-val{flex:none;min-width:38px;text-align:right}.simui-root{--focus-ring: 0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-ctxitem:focus-visible,.simui-segbtn:focus-visible,.simui-ftoggle:focus-visible,.simui-sbtn:focus-visible,.simui-iconbtn-h:focus-visible,.simui-range-btn:focus-visible,.simui-card-grab:focus-visible,.simui-card-btn:focus-visible,.simui-qc-swatch:focus-visible,.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{outline:none;box-shadow:var(--focus-ring)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-qc-swatch:focus-visible{border-radius:999px}.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{border-radius:999px}.simui-sheet:focus-visible,.simui-ctxmenu:focus-visible{outline:none;box-shadow:var(--focus-ring)}@media(prefers-reduced-motion:reduce){.simui-root *,.simui-root *:before,.simui-root *:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;transition-delay:0ms!important;scroll-behavior:auto!important}}.simui-camera{padding:0;overflow:hidden;gap:0}.simui-cam-frame{position:relative;width:100%;aspect-ratio:16 / 10;min-height:96px;background:var(--surface-2)}.simui-cam-img{display:block;width:100%;height:100%;object-fit:cover}.simui-cam-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--muted);background:var(--surface-2)}.simui-cam-cap{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:8px;padding:18px 12px 8px;background:linear-gradient(to top,rgba(0,0,0,.55),transparent)}.simui-cam-name{font-size:12px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0,0,0,.5)}.simui-cam-state{margin-left:auto;font-size:11px;color:#fffc}.simui-weather{gap:10px}.simui-wx-head{display:flex;align-items:center;gap:11px}.simui-wx-ic{display:inline-flex;flex:none;color:var(--cool)}.simui-wx-now{display:flex;flex-direction:column;gap:1px;min-width:0}.simui-wx-temp{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wx-cond{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-wx-fc{display:flex;gap:6px}.simui-wx-fcd{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border-radius:9px;background:color-mix(in srgb,var(--text) 4%,transparent)}.simui-wx-fcl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px}.simui-wx-fci{display:inline-flex;color:var(--muted)}.simui-wx-fct{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge{align-items:stretch;gap:6px}.simui-gauge-wrap{position:relative;display:flex;align-items:center;justify-content:center}.simui-gauge-svg{display:block}.simui-gauge-track{stroke:var(--faint)}.simui-gauge-fill{stroke:var(--accent);transition:stroke-dasharray .25s ease}.simui-gauge-readout{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none}.simui-gauge-val{font-size:20px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge-unit{font-size:11px;color:var(--muted);font-weight:500}.simui-action{justify-content:center}.simui-action.is-clickable:hover .simui-action-run{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-action-run{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:999px;border:1px solid var(--faint);color:var(--muted);transition:color .12s ease,border-color .12s ease}.simui-eb-full{max-width:480px;margin:48px auto;padding:20px 22px;background:var(--surface);border:1px solid var(--hairline);border-radius:var(--radius);color:var(--text)}.simui-eb-title{font-size:15px;font-weight:600;letter-spacing:-.2px;margin-bottom:6px}.simui-eb-body{font-size:13px;line-height:1.5;color:var(--muted)}.simui-eb-compact{margin:8px 2px;padding:10px 12px;font-size:12px;color:var(--muted);background:color-mix(in srgb,var(--text) 3%,var(--surface));border:1px solid var(--hairline);border-radius:10px}.simui-conn-banner{display:flex;align-items:center;gap:8px;margin:0 0 12px;padding:7px 12px;font-size:12px;font-weight:500;color:var(--warn);background:color-mix(in srgb,var(--warn) 9%,var(--surface));border:1px solid color-mix(in srgb,var(--warn) 28%,var(--faint));border-radius:10px}.simui-conn-ic{flex:none;color:var(--warn)}';
class Cz extends HTMLElement {
  constructor() {
    super(...arguments);
    hs(this, "_root");
    hs(this, "_mount");
    hs(this, "_hass");
    hs(this, "_listeners", /* @__PURE__ */ new Set());
    hs(this, "_source");
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
        callService: (a, r, u, c) => i._hass.callService(a, r, u, c),
        get connection() {
          return i._hass ? i._hass.connection : void 0;
        }
      };
    }
    if (!this._mount) {
      const i = document.createElement("style");
      i.textContent = Nz, this.appendChild(i), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = uw.createRoot(this._mount), this._root.render(
        /* @__PURE__ */ m.jsx(Y2, { source: this._source, children: /* @__PURE__ */ m.jsx(Mz, {}) })
      );
    }
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", Cz);
