var Ix = Object.defineProperty;
var Fx = (s, t, n) => t in s ? Ix(s, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[t] = n;
var os = (s, t, n) => Fx(s, typeof t != "symbol" ? t + "" : t, n);
function Px(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var jh = { exports: {} }, Ml = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tg;
function tw() {
  if (tg) return Ml;
  tg = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(a, r, u) {
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
  return Ml.Fragment = t, Ml.jsx = n, Ml.jsxs = n, Ml;
}
var eg;
function ew() {
  return eg || (eg = 1, jh.exports = tw()), jh.exports;
}
var p = ew(), kh = { exports: {} }, Nl = {}, zh = { exports: {} }, Th = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ig;
function iw() {
  return ig || (ig = 1, (function(s) {
    function t(B, Z) {
      var st = B.length;
      B.push(Z);
      t: for (; 0 < st; ) {
        var ht = st - 1 >>> 1, ft = B[ht];
        if (0 < r(ft, Z))
          B[ht] = Z, B[st] = ft, st = ht;
        else break t;
      }
    }
    function n(B) {
      return B.length === 0 ? null : B[0];
    }
    function a(B) {
      if (B.length === 0) return null;
      var Z = B[0], st = B.pop();
      if (st !== Z) {
        B[0] = st;
        t: for (var ht = 0, ft = B.length, k = ft >>> 1; ht < k; ) {
          var Q = 2 * (ht + 1) - 1, J = B[Q], tt = Q + 1, dt = B[tt];
          if (0 > r(J, st))
            tt < ft && 0 > r(dt, J) ? (B[ht] = dt, B[tt] = st, ht = tt) : (B[ht] = J, B[Q] = st, ht = Q);
          else if (tt < ft && 0 > r(dt, st))
            B[ht] = dt, B[tt] = st, ht = tt;
          else break t;
        }
      }
      return Z;
    }
    function r(B, Z) {
      var st = B.sortIndex - Z.sortIndex;
      return st !== 0 ? st : B.id - Z.id;
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
    var m = [], v = [], g = 1, b = null, x = 3, S = !1, w = !1, M = !1, N = !1, j = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function D(B) {
      for (var Z = n(v); Z !== null; ) {
        if (Z.callback === null) a(v);
        else if (Z.startTime <= B)
          a(v), Z.sortIndex = Z.expirationTime, t(m, Z);
        else break;
        Z = n(v);
      }
    }
    function $(B) {
      if (M = !1, D(B), !w)
        if (n(m) !== null)
          w = !0, G || (G = !0, nt());
        else {
          var Z = n(v);
          Z !== null && Bt($, Z.startTime - B);
        }
    }
    var G = !1, A = -1, X = 5, F = -1;
    function I() {
      return N ? !0 : !(s.unstable_now() - F < X);
    }
    function it() {
      if (N = !1, G) {
        var B = s.unstable_now();
        F = B;
        var Z = !0;
        try {
          t: {
            w = !1, M && (M = !1, T(A), A = -1), S = !0;
            var st = x;
            try {
              e: {
                for (D(B), b = n(m); b !== null && !(b.expirationTime > B && I()); ) {
                  var ht = b.callback;
                  if (typeof ht == "function") {
                    b.callback = null, x = b.priorityLevel;
                    var ft = ht(
                      b.expirationTime <= B
                    );
                    if (B = s.unstable_now(), typeof ft == "function") {
                      b.callback = ft, D(B), Z = !0;
                      break e;
                    }
                    b === n(m) && a(m), D(B);
                  } else a(m);
                  b = n(m);
                }
                if (b !== null) Z = !0;
                else {
                  var k = n(v);
                  k !== null && Bt(
                    $,
                    k.startTime - B
                  ), Z = !1;
                }
              }
              break t;
            } finally {
              b = null, x = st, S = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? nt() : G = !1;
        }
      }
    }
    var nt;
    if (typeof R == "function")
      nt = function() {
        R(it);
      };
    else if (typeof MessageChannel < "u") {
      var yt = new MessageChannel(), bt = yt.port2;
      yt.port1.onmessage = it, nt = function() {
        bt.postMessage(null);
      };
    } else
      nt = function() {
        j(it, 0);
      };
    function Bt(B, Z) {
      A = j(function() {
        B(s.unstable_now());
      }, Z);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, s.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : X = 0 < B ? Math.floor(1e3 / B) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, s.unstable_next = function(B) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = x;
      }
      var st = x;
      x = Z;
      try {
        return B();
      } finally {
        x = st;
      }
    }, s.unstable_requestPaint = function() {
      N = !0;
    }, s.unstable_runWithPriority = function(B, Z) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var st = x;
      x = B;
      try {
        return Z();
      } finally {
        x = st;
      }
    }, s.unstable_scheduleCallback = function(B, Z, st) {
      var ht = s.unstable_now();
      switch (typeof st == "object" && st !== null ? (st = st.delay, st = typeof st == "number" && 0 < st ? ht + st : ht) : st = ht, B) {
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
      return ft = st + ft, B = {
        id: g++,
        callback: Z,
        priorityLevel: B,
        startTime: st,
        expirationTime: ft,
        sortIndex: -1
      }, st > ht ? (B.sortIndex = st, t(v, B), n(m) === null && B === n(v) && (M ? (T(A), A = -1) : M = !0, Bt($, st - ht))) : (B.sortIndex = ft, t(m, B), w || S || (w = !0, G || (G = !0, nt()))), B;
    }, s.unstable_shouldYield = I, s.unstable_wrapCallback = function(B) {
      var Z = x;
      return function() {
        var st = x;
        x = Z;
        try {
          return B.apply(this, arguments);
        } finally {
          x = st;
        }
      };
    };
  })(Th)), Th;
}
var ng;
function nw() {
  return ng || (ng = 1, zh.exports = iw()), zh.exports;
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
var sg;
function sw() {
  if (sg) return mt;
  sg = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.portal"), n = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), r = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.consumer"), c = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), b = /* @__PURE__ */ Symbol.for("react.activity"), x = Symbol.iterator;
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
  function j(k, Q, J) {
    this.props = k, this.context = Q, this.refs = N, this.updater = J || w;
  }
  j.prototype.isReactComponent = {}, j.prototype.setState = function(k, Q) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, Q, "setState");
  }, j.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function T() {
  }
  T.prototype = j.prototype;
  function R(k, Q, J) {
    this.props = k, this.context = Q, this.refs = N, this.updater = J || w;
  }
  var D = R.prototype = new T();
  D.constructor = R, M(D, j.prototype), D.isPureReactComponent = !0;
  var $ = Array.isArray;
  function G() {
  }
  var A = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function F(k, Q, J) {
    var tt = J.ref;
    return {
      $$typeof: s,
      type: k,
      key: Q,
      ref: tt !== void 0 ? tt : null,
      props: J
    };
  }
  function I(k, Q) {
    return F(k.type, Q, k.props);
  }
  function it(k) {
    return typeof k == "object" && k !== null && k.$$typeof === s;
  }
  function nt(k) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(J) {
      return Q[J];
    });
  }
  var yt = /\/+/g;
  function bt(k, Q) {
    return typeof k == "object" && k !== null && k.key != null ? nt("" + k.key) : Q.toString(36);
  }
  function Bt(k) {
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
  function B(k, Q, J, tt, dt) {
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
              return Mt = k._init, B(
                Mt(k._payload),
                Q,
                J,
                tt,
                dt
              );
          }
      }
    if (Mt)
      return dt = dt(k), Mt = tt === "" ? "." + bt(k, 0) : tt, $(dt) ? (J = "", Mt != null && (J = Mt.replace(yt, "$&/") + "/"), B(dt, Q, J, "", function(Ct) {
        return Ct;
      })) : dt != null && (it(dt) && (dt = I(
        dt,
        J + (dt.key == null || k && k.key === dt.key ? "" : ("" + dt.key).replace(
          yt,
          "$&/"
        ) + "/") + Mt
      )), Q.push(dt)), 1;
    Mt = 0;
    var Gt = tt === "" ? "." : tt + ":";
    if ($(k))
      for (var Tt = 0; Tt < k.length; Tt++)
        tt = k[Tt], ct = Gt + bt(tt, Tt), Mt += B(
          tt,
          Q,
          J,
          ct,
          dt
        );
    else if (Tt = S(k), typeof Tt == "function")
      for (k = Tt.call(k), Tt = 0; !(tt = k.next()).done; )
        tt = tt.value, ct = Gt + bt(tt, Tt++), Mt += B(
          tt,
          Q,
          J,
          ct,
          dt
        );
    else if (ct === "object") {
      if (typeof k.then == "function")
        return B(
          Bt(k),
          Q,
          J,
          tt,
          dt
        );
      throw Q = String(k), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Mt;
  }
  function Z(k, Q, J) {
    if (k == null) return k;
    var tt = [], dt = 0;
    return B(k, tt, "", "", function(ct) {
      return Q.call(J, ct, dt++);
    }), tt;
  }
  function st(k) {
    if (k._status === -1) {
      var Q = k._result;
      Q = Q(), Q.then(
        function(J) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = J);
        },
        function(J) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = J);
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
    forEach: function(k, Q, J) {
      Z(
        k,
        function() {
          Q.apply(this, arguments);
        },
        J
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
      if (!it(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return mt.Activity = b, mt.Children = ft, mt.Component = j, mt.Fragment = n, mt.Profiler = r, mt.PureComponent = R, mt.StrictMode = a, mt.Suspense = m, mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, mt.__COMPILER_RUNTIME = {
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
  }, mt.cloneElement = function(k, Q, J) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var tt = M({}, k.props), dt = k.key;
    if (Q != null)
      for (ct in Q.key !== void 0 && (dt = "" + Q.key), Q)
        !X.call(Q, ct) || ct === "key" || ct === "__self" || ct === "__source" || ct === "ref" && Q.ref === void 0 || (tt[ct] = Q[ct]);
    var ct = arguments.length - 2;
    if (ct === 1) tt.children = J;
    else if (1 < ct) {
      for (var Mt = Array(ct), Gt = 0; Gt < ct; Gt++)
        Mt[Gt] = arguments[Gt + 2];
      tt.children = Mt;
    }
    return F(k.type, dt, tt);
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
  }, mt.createElement = function(k, Q, J) {
    var tt, dt = {}, ct = null;
    if (Q != null)
      for (tt in Q.key !== void 0 && (ct = "" + Q.key), Q)
        X.call(Q, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (dt[tt] = Q[tt]);
    var Mt = arguments.length - 2;
    if (Mt === 1) dt.children = J;
    else if (1 < Mt) {
      for (var Gt = Array(Mt), Tt = 0; Tt < Mt; Tt++)
        Gt[Tt] = arguments[Tt + 2];
      dt.children = Gt;
    }
    if (k && k.defaultProps)
      for (tt in Mt = k.defaultProps, Mt)
        dt[tt] === void 0 && (dt[tt] = Mt[tt]);
    return F(k, ct, dt);
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(k) {
    return { $$typeof: d, render: k };
  }, mt.isValidElement = it, mt.lazy = function(k) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: k },
      _init: st
    };
  }, mt.memo = function(k, Q) {
    return {
      $$typeof: v,
      type: k,
      compare: Q === void 0 ? null : Q
    };
  }, mt.startTransition = function(k) {
    var Q = A.T, J = {};
    A.T = J;
    try {
      var tt = k(), dt = A.S;
      dt !== null && dt(J, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(G, ht);
    } catch (ct) {
      ht(ct);
    } finally {
      Q !== null && J.types !== null && (Q.types = J.types), A.T = Q;
    }
  }, mt.unstable_useCacheRefresh = function() {
    return A.H.useCacheRefresh();
  }, mt.use = function(k) {
    return A.H.use(k);
  }, mt.useActionState = function(k, Q, J) {
    return A.H.useActionState(k, Q, J);
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
  }, mt.useImperativeHandle = function(k, Q, J) {
    return A.H.useImperativeHandle(k, Q, J);
  }, mt.useInsertionEffect = function(k, Q) {
    return A.H.useInsertionEffect(k, Q);
  }, mt.useLayoutEffect = function(k, Q) {
    return A.H.useLayoutEffect(k, Q);
  }, mt.useMemo = function(k, Q) {
    return A.H.useMemo(k, Q);
  }, mt.useOptimistic = function(k, Q) {
    return A.H.useOptimistic(k, Q);
  }, mt.useReducer = function(k, Q, J) {
    return A.H.useReducer(k, Q, J);
  }, mt.useRef = function(k) {
    return A.H.useRef(k);
  }, mt.useState = function(k) {
    return A.H.useState(k);
  }, mt.useSyncExternalStore = function(k, Q, J) {
    return A.H.useSyncExternalStore(
      k,
      Q,
      J
    );
  }, mt.useTransition = function() {
    return A.H.useTransition();
  }, mt.version = "19.2.7", mt;
}
var ag;
function Dd() {
  return ag || (ag = 1, Oh.exports = sw()), Oh.exports;
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
var lg;
function aw() {
  if (lg) return Ne;
  lg = 1;
  var s = Dd();
  function t(m) {
    var v = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        v += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + m + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function n() {
  }
  var a = {
    d: {
      f: n,
      r: function() {
        throw Error(t(522));
      },
      D: n,
      C: n,
      L: n,
      m: n,
      X: n,
      S: n,
      M: n
    },
    p: 0,
    findDOMNode: null
  }, r = /* @__PURE__ */ Symbol.for("react.portal");
  function u(m, v, g) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : "" + b,
      children: m,
      containerInfo: v,
      implementation: g
    };
  }
  var c = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(m, v) {
    if (m === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Ne.createPortal = function(m, v) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(t(299));
    return u(m, v, null, g);
  }, Ne.flushSync = function(m) {
    var v = c.T, g = a.p;
    try {
      if (c.T = null, a.p = 2, m) return m();
    } finally {
      c.T = v, a.p = g, a.d.f();
    }
  }, Ne.preconnect = function(m, v) {
    typeof m == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, a.d.C(m, v));
  }, Ne.prefetchDNS = function(m) {
    typeof m == "string" && a.d.D(m);
  }, Ne.preinit = function(m, v) {
    if (typeof m == "string" && v && typeof v.as == "string") {
      var g = v.as, b = d(g, v.crossOrigin), x = typeof v.integrity == "string" ? v.integrity : void 0, S = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      g === "style" ? a.d.S(
        m,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: x,
          fetchPriority: S
        }
      ) : g === "script" && a.d.X(m, {
        crossOrigin: b,
        integrity: x,
        fetchPriority: S,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(m, v) {
    if (typeof m == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var g = d(
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
      var g = v.as, b = d(g, v.crossOrigin);
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
        var g = d(v.as, v.crossOrigin);
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
    return c.H.useFormState(m, v, g);
  }, Ne.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Ne.version = "19.2.7", Ne;
}
var rg;
function W0() {
  if (rg) return Dh.exports;
  rg = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), Dh.exports = aw(), Dh.exports;
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
var og;
function lw() {
  if (og) return Nl;
  og = 1;
  var s = nw(), t = Dd(), n = W0();
  function a(e) {
    var i = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      i += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        i += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + i + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var i = e, l = e;
    if (e.alternate) for (; i.return; ) i = i.return;
    else {
      e = i;
      do
        i = e, (i.flags & 4098) !== 0 && (l = i.return), e = i.return;
      while (e);
    }
    return i.tag === 3 ? l : null;
  }
  function c(e) {
    if (e.tag === 13) {
      var i = e.memoizedState;
      if (i === null && (e = e.alternate, e !== null && (i = e.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function d(e) {
    if (e.tag === 31) {
      var i = e.memoizedState;
      if (i === null && (e = e.alternate, e !== null && (i = e.memoizedState)), i !== null) return i.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (u(e) !== e)
      throw Error(a(188));
  }
  function v(e) {
    var i = e.alternate;
    if (!i) {
      if (i = u(e), i === null) throw Error(a(188));
      return i !== e ? null : e;
    }
    for (var l = e, o = i; ; ) {
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
          if (f === l) return m(h), e;
          if (f === o) return m(h), i;
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
    return l.stateNode.current === l ? e : i;
  }
  function g(e) {
    var i = e.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return e;
    for (e = e.child; e !== null; ) {
      if (i = g(e), i !== null) return i;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), M = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), j = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), R = /* @__PURE__ */ Symbol.for("react.context"), D = /* @__PURE__ */ Symbol.for("react.forward_ref"), $ = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), A = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), F = /* @__PURE__ */ Symbol.for("react.activity"), I = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), it = Symbol.iterator;
  function nt(e) {
    return e === null || typeof e != "object" ? null : (e = it && e[it] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var yt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function bt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === yt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case M:
        return "Fragment";
      case j:
        return "Profiler";
      case N:
        return "StrictMode";
      case $:
        return "Suspense";
      case G:
        return "SuspenseList";
      case F:
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
          var i = e.render;
          return e = e.displayName, e || (e = i.displayName || i.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case A:
          return i = e.displayName || null, i !== null ? i : bt(e.type) || "Memo";
        case X:
          i = e._payload, e = e._init;
          try {
            return bt(e(i));
          } catch {
          }
      }
    return null;
  }
  var Bt = Array.isArray, B = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, st = {
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
  function J(e, i) {
    ft++, ht[ft] = e.current, e.current = i;
  }
  var tt = k(null), dt = k(null), ct = k(null), Mt = k(null);
  function Gt(e, i) {
    switch (J(ct, i), J(dt, e), J(tt, null), i.nodeType) {
      case 9:
      case 11:
        e = (e = i.documentElement) && (e = e.namespaceURI) ? Sv(e) : 0;
        break;
      default:
        if (e = i.tagName, i = i.namespaceURI)
          i = Sv(i), e = Mv(i, e);
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
    Q(tt), J(tt, e);
  }
  function Tt() {
    Q(tt), Q(dt), Q(ct);
  }
  function Ct(e) {
    e.memoizedState !== null && J(Mt, e);
    var i = tt.current, l = Mv(i, e.type);
    i !== l && (J(dt, e), J(tt, l));
  }
  function Ci(e) {
    dt.current === e && (Q(tt), Q(dt)), Mt.current === e && (Q(Mt), xl._currentValue = st);
  }
  var ze, Ui;
  function me(e) {
    if (ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var i = l.stack.trim().match(/\n( *(at )?)/);
        ze = i && i[1] || "", Ui = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ze + e + Ui;
  }
  var Ei = !1;
  function ji(e, i) {
    if (!e || Ei) return "";
    Ei = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (i) {
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
        var E = y.split(`
`), U = _.split(`
`);
        for (h = o = 0; o < E.length && !E[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; h < U.length && !U[h].includes(
          "DetermineComponentFrameRoot"
        ); )
          h++;
        if (o === E.length || h === U.length)
          for (o = E.length - 1, h = U.length - 1; 1 <= o && 0 <= h && E[o] !== U[h]; )
            h--;
        for (; 1 <= o && 0 <= h; o--, h--)
          if (E[o] !== U[h]) {
            if (o !== 1 || h !== 1)
              do
                if (o--, h--, 0 > h || E[o] !== U[h]) {
                  var Y = `
` + E[o].replace(" at new ", " at ");
                  return e.displayName && Y.includes("<anonymous>") && (Y = Y.replace("<anonymous>", e.displayName)), Y;
                }
              while (1 <= o && 0 <= h);
            break;
          }
      }
    } finally {
      Ei = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? me(l) : "";
  }
  function rr(e, i) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return me(e.type);
      case 16:
        return me("Lazy");
      case 13:
        return e.child !== i && i !== null ? me("Suspense Fallback") : me("Suspense");
      case 19:
        return me("SuspenseList");
      case 0:
      case 15:
        return ji(e.type, !1);
      case 11:
        return ji(e.type.render, !1);
      case 1:
        return ji(e.type, !0);
      case 31:
        return me("Activity");
      default:
        return "";
    }
  }
  function Da(e) {
    try {
      var i = "", l = null;
      do
        i += rr(e, l), l = e, e = e.return;
      while (e);
      return i;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var $n = Object.prototype.hasOwnProperty, ti = s.unstable_scheduleCallback, cn = s.unstable_cancelCallback, Cs = s.unstable_shouldYield, or = s.unstable_requestPaint, _e = s.unstable_now, vu = s.unstable_getCurrentPriorityLevel, ur = s.unstable_ImmediatePriority, Hi = s.unstable_UserBlockingPriority, gi = s.unstable_NormalPriority, Yn = s.unstable_LowPriority, Aa = s.unstable_IdlePriority, ki = s.log, cr = s.unstable_setDisableYieldValue, Vn = null, Ce = null;
  function ei(e) {
    if (typeof ki == "function" && cr(e), Ce && typeof Ce.setStrictMode == "function")
      try {
        Ce.setStrictMode(Vn, e);
      } catch {
      }
  }
  var Se = Math.clz32 ? Math.clz32 : bu, gu = Math.log, hr = Math.LN2;
  function bu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (gu(e) / hr | 0) | 0;
  }
  var Es = 256, js = 262144, Jt = 4194304;
  function It(e) {
    var i = e & 42;
    if (i !== 0) return i;
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
  function ue(e, i, l) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var h = 0, f = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var _ = o & 134217727;
    return _ !== 0 ? (o = _ & ~f, o !== 0 ? h = It(o) : (y &= _, y !== 0 ? h = It(y) : l || (l = _ & ~e, l !== 0 && (h = It(l))))) : (_ = o & ~f, _ !== 0 ? h = It(_) : y !== 0 ? h = It(y) : l || (l = o & ~e, l !== 0 && (h = It(l)))), h === 0 ? 0 : i !== 0 && i !== h && (i & f) === 0 && (f = h & -h, l = i & -i, f >= l || f === 32 && (l & 4194048) !== 0) ? i : h;
  }
  function Te(e, i) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & i) === 0;
  }
  function Oe(e, i) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return i + 250;
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
        return i + 5e3;
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
    var e = Jt;
    return Jt <<= 1, (Jt & 62914560) === 0 && (Jt = 4194304), e;
  }
  function De(e) {
    for (var i = [], l = 0; 31 > l; l++) i.push(e);
    return i;
  }
  function ii(e, i) {
    e.pendingLanes |= i, i !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function le(e, i, l, o, h, f) {
    var y = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var _ = e.entanglements, E = e.expirationTimes, U = e.hiddenUpdates;
    for (l = y & ~l; 0 < l; ) {
      var Y = 31 - Se(l), K = 1 << Y;
      _[Y] = 0, E[Y] = -1;
      var H = U[Y];
      if (H !== null)
        for (U[Y] = null, Y = 0; Y < H.length; Y++) {
          var q = H[Y];
          q !== null && (q.lane &= -536870913);
        }
      l &= ~K;
    }
    o !== 0 && bi(e, o, 0), f !== 0 && h === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(y & ~i));
  }
  function bi(e, i, l) {
    e.pendingLanes |= i, e.suspendedLanes &= ~i;
    var o = 31 - Se(i);
    e.entangledLanes |= i, e.entanglements[o] = e.entanglements[o] | 1073741824 | l & 261930;
  }
  function Ge(e, i) {
    var l = e.entangledLanes |= i;
    for (e = e.entanglements; l; ) {
      var o = 31 - Se(l), h = 1 << o;
      h & i | e[o] & i && (e[o] |= i), l &= ~h;
    }
  }
  function ni(e, i) {
    var l = i & -i;
    return l = (l & 42) !== 0 ? 1 : qi(l), (l & (e.suspendedLanes | i)) !== 0 ? 0 : l;
  }
  function qi(e) {
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
  function Qi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function yi() {
    var e = Z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Xv(e.type));
  }
  function hn(e, i) {
    var l = Z.p;
    try {
      return Z.p = e, i();
    } finally {
      Z.p = l;
    }
  }
  var si = Math.random().toString(36).slice(2), pe = "__reactFiber$" + si, Ae = "__reactProps$" + si, ks = "__reactContainer$" + si, yu = "__reactEvents$" + si, q1 = "__reactListeners$" + si, Q1 = "__reactHandles$" + si, cf = "__reactResources$" + si, Ra = "__reactMarker$" + si;
  function xu(e) {
    delete e[pe], delete e[Ae], delete e[yu], delete e[q1], delete e[Q1];
  }
  function zs(e) {
    var i = e[pe];
    if (i) return i;
    for (var l = e.parentNode; l; ) {
      if (i = l[ks] || l[pe]) {
        if (l = i.alternate, i.child !== null || l !== null && l.child !== null)
          for (e = Tv(e); e !== null; ) {
            if (l = e[pe]) return l;
            e = Tv(e);
          }
        return i;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Ts(e) {
    if (e = e[pe] || e[ks]) {
      var i = e.tag;
      if (i === 5 || i === 6 || i === 13 || i === 31 || i === 26 || i === 27 || i === 3)
        return e;
    }
    return null;
  }
  function La(e) {
    var i = e.tag;
    if (i === 5 || i === 26 || i === 27 || i === 6) return e.stateNode;
    throw Error(a(33));
  }
  function Os(e) {
    var i = e[cf];
    return i || (i = e[cf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), i;
  }
  function ce(e) {
    e[Ra] = !0;
  }
  var hf = /* @__PURE__ */ new Set(), df = {};
  function Gn(e, i) {
    Ds(e, i), Ds(e + "Capture", i);
  }
  function Ds(e, i) {
    for (df[e] = i, e = 0; e < i.length; e++)
      hf.add(i[e]);
  }
  var $1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ff = {}, mf = {};
  function Y1(e) {
    return $n.call(mf, e) ? !0 : $n.call(ff, e) ? !1 : $1.test(e) ? mf[e] = !0 : (ff[e] = !0, !1);
  }
  function dr(e, i, l) {
    if (Y1(i))
      if (l === null) e.removeAttribute(i);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(i);
            return;
          case "boolean":
            var o = i.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(i);
              return;
            }
        }
        e.setAttribute(i, "" + l);
      }
  }
  function fr(e, i, l) {
    if (l === null) e.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttribute(i, "" + l);
    }
  }
  function $i(e, i, l, o) {
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
      e.setAttributeNS(i, l, "" + o);
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
  function pf(e) {
    var i = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (i === "checkbox" || i === "radio");
  }
  function V1(e, i, l) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      i
    );
    if (!e.hasOwnProperty(i) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var h = o.get, f = o.set;
      return Object.defineProperty(e, i, {
        configurable: !0,
        get: function() {
          return h.call(this);
        },
        set: function(y) {
          l = "" + y, f.call(this, y);
        }
      }), Object.defineProperty(e, i, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(y) {
          l = "" + y;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[i];
        }
      };
    }
  }
  function wu(e) {
    if (!e._valueTracker) {
      var i = pf(e) ? "checked" : "value";
      e._valueTracker = V1(
        e,
        i,
        "" + e[i]
      );
    }
  }
  function vf(e) {
    if (!e) return !1;
    var i = e._valueTracker;
    if (!i) return !0;
    var l = i.getValue(), o = "";
    return e && (o = pf(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== l ? (i.setValue(e), !0) : !1;
  }
  function mr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var G1 = /[\n"\\]/g;
  function li(e) {
    return e.replace(
      G1,
      function(i) {
        return "\\" + i.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function _u(e, i, l, o, h, f, y, _) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), i != null ? y === "number" ? (i === 0 && e.value === "" || e.value != i) && (e.value = "" + ai(i)) : e.value !== "" + ai(i) && (e.value = "" + ai(i)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), i != null ? Su(e, y, ai(i)) : l != null ? Su(e, y, ai(l)) : o != null && e.removeAttribute("value"), h == null && f != null && (e.defaultChecked = !!f), h != null && (e.checked = h && typeof h != "function" && typeof h != "symbol"), _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? e.name = "" + ai(_) : e.removeAttribute("name");
  }
  function gf(e, i, l, o, h, f, y, _) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), i != null || l != null) {
      if (!(f !== "submit" && f !== "reset" || i != null)) {
        wu(e);
        return;
      }
      l = l != null ? "" + ai(l) : "", i = i != null ? "" + ai(i) : l, _ || i === e.value || (e.value = i), e.defaultValue = i;
    }
    o = o ?? h, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = _ ? e.checked : !!o, e.defaultChecked = !!o, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), wu(e);
  }
  function Su(e, i, l) {
    i === "number" && mr(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function As(e, i, l, o) {
    if (e = e.options, i) {
      i = {};
      for (var h = 0; h < l.length; h++)
        i["$" + l[h]] = !0;
      for (l = 0; l < e.length; l++)
        h = i.hasOwnProperty("$" + e[l].value), e[l].selected !== h && (e[l].selected = h), h && o && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + ai(l), i = null, h = 0; h < e.length; h++) {
        if (e[h].value === l) {
          e[h].selected = !0, o && (e[h].defaultSelected = !0);
          return;
        }
        i !== null || e[h].disabled || (i = e[h]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function bf(e, i, l) {
    if (i != null && (i = "" + ai(i), i !== e.value && (e.value = i), l == null)) {
      e.defaultValue !== i && (e.defaultValue = i);
      return;
    }
    e.defaultValue = l != null ? "" + ai(l) : "";
  }
  function yf(e, i, l, o) {
    if (i == null) {
      if (o != null) {
        if (l != null) throw Error(a(92));
        if (Bt(o)) {
          if (1 < o.length) throw Error(a(93));
          o = o[0];
        }
        l = o;
      }
      l == null && (l = ""), i = l;
    }
    l = ai(i), e.defaultValue = l, o = e.textContent, o === l && o !== "" && o !== null && (e.value = o), wu(e);
  }
  function Rs(e, i) {
    if (i) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = i;
        return;
      }
    }
    e.textContent = i;
  }
  var K1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function xf(e, i, l) {
    var o = i.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? o ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "" : o ? e.setProperty(i, l) : typeof l != "number" || l === 0 || K1.has(i) ? i === "float" ? e.cssFloat = l : e[i] = ("" + l).trim() : e[i] = l + "px";
  }
  function wf(e, i, l) {
    if (i != null && typeof i != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var o in l)
        !l.hasOwnProperty(o) || i != null && i.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var h in i)
        o = i[h], i.hasOwnProperty(h) && l[h] !== o && xf(e, h, o);
    } else
      for (var f in i)
        i.hasOwnProperty(f) && xf(e, f, i[f]);
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
  var X1 = /* @__PURE__ */ new Map([
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
  ]), Z1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function pr(e) {
    return Z1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Yi() {
  }
  var Nu = null;
  function Cu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ls = null, Bs = null;
  function _f(e) {
    var i = Ts(e);
    if (i && (e = i.stateNode)) {
      var l = e[Ae] || null;
      t: switch (e = i.stateNode, i.type) {
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
          ), i = l.name, l.type === "radio" && i != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + li(
                "" + i
              ) + '"][type="radio"]'
            ), i = 0; i < l.length; i++) {
              var o = l[i];
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
            for (i = 0; i < l.length; i++)
              o = l[i], o.form === e.form && vf(o);
          }
          break t;
        case "textarea":
          bf(e, l.value, l.defaultValue);
          break t;
        case "select":
          i = l.value, i != null && As(e, !!l.multiple, i, !1);
      }
    }
  }
  var Eu = !1;
  function Sf(e, i, l) {
    if (Eu) return e(i, l);
    Eu = !0;
    try {
      var o = e(i);
      return o;
    } finally {
      if (Eu = !1, (Ls !== null || Bs !== null) && (io(), Ls && (i = Ls, e = Bs, Bs = Ls = null, _f(i), e)))
        for (i = 0; i < e.length; i++) _f(e[i]);
    }
  }
  function Ba(e, i) {
    var l = e.stateNode;
    if (l === null) return null;
    var o = l[Ae] || null;
    if (o === null) return null;
    l = o[i];
    t: switch (i) {
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
        a(231, i, typeof l)
      );
    return l;
  }
  var Vi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ju = !1;
  if (Vi)
    try {
      var Ua = {};
      Object.defineProperty(Ua, "passive", {
        get: function() {
          ju = !0;
        }
      }), window.addEventListener("test", Ua, Ua), window.removeEventListener("test", Ua, Ua);
    } catch {
      ju = !1;
    }
  var dn = null, ku = null, vr = null;
  function Mf() {
    if (vr) return vr;
    var e, i = ku, l = i.length, o, h = "value" in dn ? dn.value : dn.textContent, f = h.length;
    for (e = 0; e < l && i[e] === h[e]; e++) ;
    var y = l - e;
    for (o = 1; o <= y && i[l - o] === h[f - o]; o++) ;
    return vr = h.slice(e, 1 < o ? 1 - o : void 0);
  }
  function gr(e) {
    var i = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && i === 13 && (e = 13)) : e = i, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function br() {
    return !0;
  }
  function Nf() {
    return !1;
  }
  function Re(e) {
    function i(l, o, h, f, y) {
      this._reactName = l, this._targetInst = h, this.type = o, this.nativeEvent = f, this.target = y, this.currentTarget = null;
      for (var _ in e)
        e.hasOwnProperty(_) && (l = e[_], this[_] = l ? l(f) : f[_]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? br : Nf, this.isPropagationStopped = Nf, this;
    }
    return b(i.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = br);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = br);
      },
      persist: function() {
      },
      isPersistent: br
    }), i;
  }
  var Kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, yr = Re(Kn), Ha = b({}, Kn, { view: 0, detail: 0 }), W1 = Re(Ha), zu, Tu, qa, xr = b({}, Ha, {
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
      return "movementX" in e ? e.movementX : (e !== qa && (qa && e.type === "mousemove" ? (zu = e.screenX - qa.screenX, Tu = e.screenY - qa.screenY) : Tu = zu = 0, qa = e), zu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Tu;
    }
  }), Cf = Re(xr), J1 = b({}, xr, { dataTransfer: 0 }), I1 = Re(J1), F1 = b({}, Ha, { relatedTarget: 0 }), Ou = Re(F1), P1 = b({}, Kn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ty = Re(P1), ey = b({}, Kn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), iy = Re(ey), ny = b({}, Kn, { data: 0 }), Ef = Re(ny), sy = {
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
  }, ay = {
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
  }, ly = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ry(e) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(e) : (e = ly[e]) ? !!i[e] : !1;
  }
  function Du() {
    return ry;
  }
  var oy = b({}, Ha, {
    key: function(e) {
      if (e.key) {
        var i = sy[e.key] || e.key;
        if (i !== "Unidentified") return i;
      }
      return e.type === "keypress" ? (e = gr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ay[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? gr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? gr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), uy = Re(oy), cy = b({}, xr, {
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
  }), jf = Re(cy), hy = b({}, Ha, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), dy = Re(hy), fy = b({}, Kn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), my = Re(fy), py = b({}, xr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vy = Re(py), gy = b({}, Kn, {
    newState: 0,
    oldState: 0
  }), by = Re(gy), yy = [9, 13, 27, 32], Au = Vi && "CompositionEvent" in window, Qa = null;
  Vi && "documentMode" in document && (Qa = document.documentMode);
  var xy = Vi && "TextEvent" in window && !Qa, kf = Vi && (!Au || Qa && 8 < Qa && 11 >= Qa), zf = " ", Tf = !1;
  function Of(e, i) {
    switch (e) {
      case "keyup":
        return yy.indexOf(i.keyCode) !== -1;
      case "keydown":
        return i.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Df(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Us = !1;
  function wy(e, i) {
    switch (e) {
      case "compositionend":
        return Df(i);
      case "keypress":
        return i.which !== 32 ? null : (Tf = !0, zf);
      case "textInput":
        return e = i.data, e === zf && Tf ? null : e;
      default:
        return null;
    }
  }
  function _y(e, i) {
    if (Us)
      return e === "compositionend" || !Au && Of(e, i) ? (e = Mf(), vr = ku = dn = null, Us = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(i.ctrlKey || i.altKey || i.metaKey) || i.ctrlKey && i.altKey) {
          if (i.char && 1 < i.char.length)
            return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case "compositionend":
        return kf && i.locale !== "ko" ? null : i.data;
      default:
        return null;
    }
  }
  var Sy = {
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
  function Af(e) {
    var i = e && e.nodeName && e.nodeName.toLowerCase();
    return i === "input" ? !!Sy[e.type] : i === "textarea";
  }
  function Rf(e, i, l, o) {
    Ls ? Bs ? Bs.push(o) : Bs = [o] : Ls = o, i = uo(i, "onChange"), 0 < i.length && (l = new yr(
      "onChange",
      "change",
      null,
      l,
      o
    ), e.push({ event: l, listeners: i }));
  }
  var $a = null, Ya = null;
  function My(e) {
    gv(e, 0);
  }
  function wr(e) {
    var i = La(e);
    if (vf(i)) return e;
  }
  function Lf(e, i) {
    if (e === "change") return i;
  }
  var Bf = !1;
  if (Vi) {
    var Ru;
    if (Vi) {
      var Lu = "oninput" in document;
      if (!Lu) {
        var Uf = document.createElement("div");
        Uf.setAttribute("oninput", "return;"), Lu = typeof Uf.oninput == "function";
      }
      Ru = Lu;
    } else Ru = !1;
    Bf = Ru && (!document.documentMode || 9 < document.documentMode);
  }
  function Hf() {
    $a && ($a.detachEvent("onpropertychange", qf), Ya = $a = null);
  }
  function qf(e) {
    if (e.propertyName === "value" && wr(Ya)) {
      var i = [];
      Rf(
        i,
        Ya,
        e,
        Cu(e)
      ), Sf(My, i);
    }
  }
  function Ny(e, i, l) {
    e === "focusin" ? (Hf(), $a = i, Ya = l, $a.attachEvent("onpropertychange", qf)) : e === "focusout" && Hf();
  }
  function Cy(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return wr(Ya);
  }
  function Ey(e, i) {
    if (e === "click") return wr(i);
  }
  function jy(e, i) {
    if (e === "input" || e === "change")
      return wr(i);
  }
  function ky(e, i) {
    return e === i && (e !== 0 || 1 / e === 1 / i) || e !== e && i !== i;
  }
  var Ke = typeof Object.is == "function" ? Object.is : ky;
  function Va(e, i) {
    if (Ke(e, i)) return !0;
    if (typeof e != "object" || e === null || typeof i != "object" || i === null)
      return !1;
    var l = Object.keys(e), o = Object.keys(i);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var h = l[o];
      if (!$n.call(i, h) || !Ke(e[h], i[h]))
        return !1;
    }
    return !0;
  }
  function Qf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $f(e, i) {
    var l = Qf(e);
    e = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = e + l.textContent.length, e <= i && o >= i)
          return { node: l, offset: i - e };
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
      l = Qf(l);
    }
  }
  function Yf(e, i) {
    return e && i ? e === i ? !0 : e && e.nodeType === 3 ? !1 : i && i.nodeType === 3 ? Yf(e, i.parentNode) : "contains" in e ? e.contains(i) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(i) & 16) : !1 : !1;
  }
  function Vf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var i = mr(e.document); i instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof i.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = i.contentWindow;
      else break;
      i = mr(e.document);
    }
    return i;
  }
  function Bu(e) {
    var i = e && e.nodeName && e.nodeName.toLowerCase();
    return i && (i === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || i === "textarea" || e.contentEditable === "true");
  }
  var zy = Vi && "documentMode" in document && 11 >= document.documentMode, Hs = null, Uu = null, Ga = null, Hu = !1;
  function Gf(e, i, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Hu || Hs == null || Hs !== mr(o) || (o = Hs, "selectionStart" in o && Bu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ga && Va(Ga, o) || (Ga = o, o = uo(Uu, "onSelect"), 0 < o.length && (i = new yr(
      "onSelect",
      "select",
      null,
      i,
      l
    ), e.push({ event: i, listeners: o }), i.target = Hs)));
  }
  function Xn(e, i) {
    var l = {};
    return l[e.toLowerCase()] = i.toLowerCase(), l["Webkit" + e] = "webkit" + i, l["Moz" + e] = "moz" + i, l;
  }
  var qs = {
    animationend: Xn("Animation", "AnimationEnd"),
    animationiteration: Xn("Animation", "AnimationIteration"),
    animationstart: Xn("Animation", "AnimationStart"),
    transitionrun: Xn("Transition", "TransitionRun"),
    transitionstart: Xn("Transition", "TransitionStart"),
    transitioncancel: Xn("Transition", "TransitionCancel"),
    transitionend: Xn("Transition", "TransitionEnd")
  }, qu = {}, Kf = {};
  Vi && (Kf = document.createElement("div").style, "AnimationEvent" in window || (delete qs.animationend.animation, delete qs.animationiteration.animation, delete qs.animationstart.animation), "TransitionEvent" in window || delete qs.transitionend.transition);
  function Zn(e) {
    if (qu[e]) return qu[e];
    if (!qs[e]) return e;
    var i = qs[e], l;
    for (l in i)
      if (i.hasOwnProperty(l) && l in Kf)
        return qu[e] = i[l];
    return e;
  }
  var Xf = Zn("animationend"), Zf = Zn("animationiteration"), Wf = Zn("animationstart"), Ty = Zn("transitionrun"), Oy = Zn("transitionstart"), Dy = Zn("transitioncancel"), Jf = Zn("transitionend"), If = /* @__PURE__ */ new Map(), Qu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Qu.push("scrollEnd");
  function xi(e, i) {
    If.set(e, i), Gn(i, [e]);
  }
  var _r = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var i = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(i)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, ri = [], Qs = 0, $u = 0;
  function Sr() {
    for (var e = Qs, i = $u = Qs = 0; i < e; ) {
      var l = ri[i];
      ri[i++] = null;
      var o = ri[i];
      ri[i++] = null;
      var h = ri[i];
      ri[i++] = null;
      var f = ri[i];
      if (ri[i++] = null, o !== null && h !== null) {
        var y = o.pending;
        y === null ? h.next = h : (h.next = y.next, y.next = h), o.pending = h;
      }
      f !== 0 && Ff(l, h, f);
    }
  }
  function Mr(e, i, l, o) {
    ri[Qs++] = e, ri[Qs++] = i, ri[Qs++] = l, ri[Qs++] = o, $u |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Yu(e, i, l, o) {
    return Mr(e, i, l, o), Nr(e);
  }
  function Wn(e, i) {
    return Mr(e, null, null, i), Nr(e);
  }
  function Ff(e, i, l) {
    e.lanes |= l;
    var o = e.alternate;
    o !== null && (o.lanes |= l);
    for (var h = !1, f = e.return; f !== null; )
      f.childLanes |= l, o = f.alternate, o !== null && (o.childLanes |= l), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (h = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, h && i !== null && (h = 31 - Se(l), e = f.hiddenUpdates, o = e[h], o === null ? e[h] = [i] : o.push(i), i.lane = l | 536870912), f) : null;
  }
  function Nr(e) {
    if (50 < fl)
      throw fl = 0, Fc = null, Error(a(185));
    for (var i = e.return; i !== null; )
      e = i, i = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var $s = {};
  function Ay(e, i, l, o) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = i, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xe(e, i, l, o) {
    return new Ay(e, i, l, o);
  }
  function Vu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Gi(e, i) {
    var l = e.alternate;
    return l === null ? (l = Xe(
      e.tag,
      i,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = i, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, i = e.dependencies, l.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Pf(e, i) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = i, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, i = l.dependencies, e.dependencies = i === null ? null : {
      lanes: i.lanes,
      firstContext: i.firstContext
    }), e;
  }
  function Cr(e, i, l, o, h, f) {
    var y = 0;
    if (o = e, typeof e == "function") Vu(e) && (y = 1);
    else if (typeof e == "string")
      y = Hx(
        e,
        l,
        tt.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case F:
          return e = Xe(31, l, i, h), e.elementType = F, e.lanes = f, e;
        case M:
          return Jn(l.children, h, f, i);
        case N:
          y = 8, h |= 24;
          break;
        case j:
          return e = Xe(12, l, i, h | 2), e.elementType = j, e.lanes = f, e;
        case $:
          return e = Xe(13, l, i, h), e.elementType = $, e.lanes = f, e;
        case G:
          return e = Xe(19, l, i, h), e.elementType = G, e.lanes = f, e;
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
    return i = Xe(y, l, i, h), i.elementType = e, i.type = o, i.lanes = f, i;
  }
  function Jn(e, i, l, o) {
    return e = Xe(7, e, o, i), e.lanes = l, e;
  }
  function Gu(e, i, l) {
    return e = Xe(6, e, null, i), e.lanes = l, e;
  }
  function tm(e) {
    var i = Xe(18, null, null, 0);
    return i.stateNode = e, i;
  }
  function Ku(e, i, l) {
    return i = Xe(
      4,
      e.children !== null ? e.children : [],
      e.key,
      i
    ), i.lanes = l, i.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, i;
  }
  var em = /* @__PURE__ */ new WeakMap();
  function oi(e, i) {
    if (typeof e == "object" && e !== null) {
      var l = em.get(e);
      return l !== void 0 ? l : (i = {
        value: e,
        source: i,
        stack: Da(i)
      }, em.set(e, i), i);
    }
    return {
      value: e,
      source: i,
      stack: Da(i)
    };
  }
  var Ys = [], Vs = 0, Er = null, Ka = 0, ui = [], ci = 0, fn = null, zi = 1, Ti = "";
  function Ki(e, i) {
    Ys[Vs++] = Ka, Ys[Vs++] = Er, Er = e, Ka = i;
  }
  function im(e, i, l) {
    ui[ci++] = zi, ui[ci++] = Ti, ui[ci++] = fn, fn = e;
    var o = zi;
    e = Ti;
    var h = 32 - Se(o) - 1;
    o &= ~(1 << h), l += 1;
    var f = 32 - Se(i) + h;
    if (30 < f) {
      var y = h - h % 5;
      f = (o & (1 << y) - 1).toString(32), o >>= y, h -= y, zi = 1 << 32 - Se(i) + h | l << h | o, Ti = f + e;
    } else
      zi = 1 << f | l << h | o, Ti = e;
  }
  function Xu(e) {
    e.return !== null && (Ki(e, 1), im(e, 1, 0));
  }
  function Zu(e) {
    for (; e === Er; )
      Er = Ys[--Vs], Ys[Vs] = null, Ka = Ys[--Vs], Ys[Vs] = null;
    for (; e === fn; )
      fn = ui[--ci], ui[ci] = null, Ti = ui[--ci], ui[ci] = null, zi = ui[--ci], ui[ci] = null;
  }
  function nm(e, i) {
    ui[ci++] = zi, ui[ci++] = Ti, ui[ci++] = fn, zi = i.id, Ti = i.overflow, fn = e;
  }
  var ve = null, Yt = null, Nt = !1, mn = null, hi = !1, Wu = Error(a(519));
  function pn(e) {
    var i = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Xa(oi(i, e)), Wu;
  }
  function sm(e) {
    var i = e.stateNode, l = e.type, o = e.memoizedProps;
    switch (i[pe] = e, i[Ae] = o, l) {
      case "dialog":
        wt("cancel", i), wt("close", i);
        break;
      case "iframe":
      case "object":
      case "embed":
        wt("load", i);
        break;
      case "video":
      case "audio":
        for (l = 0; l < pl.length; l++)
          wt(pl[l], i);
        break;
      case "source":
        wt("error", i);
        break;
      case "img":
      case "image":
      case "link":
        wt("error", i), wt("load", i);
        break;
      case "details":
        wt("toggle", i);
        break;
      case "input":
        wt("invalid", i), gf(
          i,
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
        wt("invalid", i);
        break;
      case "textarea":
        wt("invalid", i), yf(i, o.value, o.defaultValue, o.children);
    }
    l = o.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || i.textContent === "" + l || o.suppressHydrationWarning === !0 || wv(i.textContent, l) ? (o.popover != null && (wt("beforetoggle", i), wt("toggle", i)), o.onScroll != null && wt("scroll", i), o.onScrollEnd != null && wt("scrollend", i), o.onClick != null && (i.onclick = Yi), i = !0) : i = !1, i || pn(e, !0);
  }
  function am(e) {
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
  function Gs(e) {
    if (e !== ve) return !1;
    if (!Nt) return am(e), Nt = !0, !1;
    var i = e.tag, l;
    if ((l = i !== 3 && i !== 27) && ((l = i === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || fh(e.type, e.memoizedProps)), l = !l), l && Yt && pn(e), am(e), i === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Yt = zv(e);
    } else if (i === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Yt = zv(e);
    } else
      i === 27 ? (i = Yt, kn(e.type) ? (e = bh, bh = null, Yt = e) : Yt = i) : Yt = ve ? fi(e.stateNode.nextSibling) : null;
    return !0;
  }
  function In() {
    Yt = ve = null, Nt = !1;
  }
  function Ju() {
    var e = mn;
    return e !== null && (He === null ? He = e : He.push.apply(
      He,
      e
    ), mn = null), e;
  }
  function Xa(e) {
    mn === null ? mn = [e] : mn.push(e);
  }
  var Iu = k(null), Fn = null, Xi = null;
  function vn(e, i, l) {
    J(Iu, i._currentValue), i._currentValue = l;
  }
  function Zi(e) {
    e._currentValue = Iu.current, Q(Iu);
  }
  function Fu(e, i, l) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & i) !== i ? (e.childLanes |= i, o !== null && (o.childLanes |= i)) : o !== null && (o.childLanes & i) !== i && (o.childLanes |= i), e === l) break;
      e = e.return;
    }
  }
  function Pu(e, i, l, o) {
    var h = e.child;
    for (h !== null && (h.return = e); h !== null; ) {
      var f = h.dependencies;
      if (f !== null) {
        var y = h.child;
        f = f.firstContext;
        t: for (; f !== null; ) {
          var _ = f;
          f = h;
          for (var E = 0; E < i.length; E++)
            if (_.context === i[E]) {
              f.lanes |= l, _ = f.alternate, _ !== null && (_.lanes |= l), Fu(
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
        y.lanes |= l, f = y.alternate, f !== null && (f.lanes |= l), Fu(y, l, e), y = null;
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
  function Ks(e, i, l, o) {
    e = null;
    for (var h = i, f = !1; h !== null; ) {
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
        y.memoizedState.memoizedState !== h.memoizedState.memoizedState && (e !== null ? e.push(xl) : e = [xl]);
      }
      h = h.return;
    }
    e !== null && Pu(
      i,
      e,
      l,
      o
    ), i.flags |= 262144;
  }
  function jr(e) {
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
  function Pn(e) {
    Fn = e, Xi = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ge(e) {
    return lm(Fn, e);
  }
  function kr(e, i) {
    return Fn === null && Pn(e), lm(e, i);
  }
  function lm(e, i) {
    var l = i._currentValue;
    if (i = { context: i, memoizedValue: l, next: null }, Xi === null) {
      if (e === null) throw Error(a(308));
      Xi = i, e.dependencies = { lanes: 0, firstContext: i }, e.flags |= 524288;
    } else Xi = Xi.next = i;
    return l;
  }
  var Ry = typeof AbortController < "u" ? AbortController : function() {
    var e = [], i = this.signal = {
      aborted: !1,
      addEventListener: function(l, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      i.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Ly = s.unstable_scheduleCallback, By = s.unstable_NormalPriority, ee = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tc() {
    return {
      controller: new Ry(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Za(e) {
    e.refCount--, e.refCount === 0 && Ly(By, function() {
      e.controller.abort();
    });
  }
  var Wa = null, ec = 0, Xs = 0, Zs = null;
  function Uy(e, i) {
    if (Wa === null) {
      var l = Wa = [];
      ec = 0, Xs = sh(), Zs = {
        status: "pending",
        value: void 0,
        then: function(o) {
          l.push(o);
        }
      };
    }
    return ec++, i.then(rm, rm), i;
  }
  function rm() {
    if (--ec === 0 && Wa !== null) {
      Zs !== null && (Zs.status = "fulfilled");
      var e = Wa;
      Wa = null, Xs = 0, Zs = null;
      for (var i = 0; i < e.length; i++) (0, e[i])();
    }
  }
  function Hy(e, i) {
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
        o.status = "fulfilled", o.value = i;
        for (var h = 0; h < l.length; h++) (0, l[h])(i);
      },
      function(h) {
        for (o.status = "rejected", o.reason = h, h = 0; h < l.length; h++)
          (0, l[h])(void 0);
      }
    ), o;
  }
  var om = B.S;
  B.S = function(e, i) {
    Gp = _e(), typeof i == "object" && i !== null && typeof i.then == "function" && Uy(e, i), om !== null && om(e, i);
  };
  var ts = k(null);
  function ic() {
    var e = ts.current;
    return e !== null ? e : Qt.pooledCache;
  }
  function zr(e, i) {
    i === null ? J(ts, ts.current) : J(ts, i.pool);
  }
  function um() {
    var e = ic();
    return e === null ? null : { parent: ee._currentValue, pool: e };
  }
  var Ws = Error(a(460)), nc = Error(a(474)), Tr = Error(a(542)), Or = { then: function() {
  } };
  function cm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function hm(e, i, l) {
    switch (l = e[l], l === void 0 ? e.push(i) : l !== i && (i.then(Yi, Yi), i = l), i.status) {
      case "fulfilled":
        return i.value;
      case "rejected":
        throw e = i.reason, fm(e), e;
      default:
        if (typeof i.status == "string") i.then(Yi, Yi);
        else {
          if (e = Qt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(a(482));
          e = i, e.status = "pending", e.then(
            function(o) {
              if (i.status === "pending") {
                var h = i;
                h.status = "fulfilled", h.value = o;
              }
            },
            function(o) {
              if (i.status === "pending") {
                var h = i;
                h.status = "rejected", h.reason = o;
              }
            }
          );
        }
        switch (i.status) {
          case "fulfilled":
            return i.value;
          case "rejected":
            throw e = i.reason, fm(e), e;
        }
        throw is = i, Ws;
    }
  }
  function es(e) {
    try {
      var i = e._init;
      return i(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (is = l, Ws) : l;
    }
  }
  var is = null;
  function dm() {
    if (is === null) throw Error(a(459));
    var e = is;
    return is = null, e;
  }
  function fm(e) {
    if (e === Ws || e === Tr)
      throw Error(a(483));
  }
  var Js = null, Ja = 0;
  function Dr(e) {
    var i = Ja;
    return Ja += 1, Js === null && (Js = []), hm(Js, e, i);
  }
  function Ia(e, i) {
    i = i.props.ref, e.ref = i !== void 0 ? i : null;
  }
  function Ar(e, i) {
    throw i.$$typeof === x ? Error(a(525)) : (e = Object.prototype.toString.call(i), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : e
      )
    ));
  }
  function mm(e) {
    function i(O, z) {
      if (e) {
        var L = O.deletions;
        L === null ? (O.deletions = [z], O.flags |= 16) : L.push(z);
      }
    }
    function l(O, z) {
      if (!e) return null;
      for (; z !== null; )
        i(O, z), z = z.sibling;
      return null;
    }
    function o(O) {
      for (var z = /* @__PURE__ */ new Map(); O !== null; )
        O.key !== null ? z.set(O.key, O) : z.set(O.index, O), O = O.sibling;
      return z;
    }
    function h(O, z) {
      return O = Gi(O, z), O.index = 0, O.sibling = null, O;
    }
    function f(O, z, L) {
      return O.index = L, e ? (L = O.alternate, L !== null ? (L = L.index, L < z ? (O.flags |= 67108866, z) : L) : (O.flags |= 67108866, z)) : (O.flags |= 1048576, z);
    }
    function y(O) {
      return e && O.alternate === null && (O.flags |= 67108866), O;
    }
    function _(O, z, L, V) {
      return z === null || z.tag !== 6 ? (z = Gu(L, O.mode, V), z.return = O, z) : (z = h(z, L), z.return = O, z);
    }
    function E(O, z, L, V) {
      var ot = L.type;
      return ot === M ? Y(
        O,
        z,
        L.props.children,
        V,
        L.key
      ) : z !== null && (z.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === X && es(ot) === z.type) ? (z = h(z, L.props), Ia(z, L), z.return = O, z) : (z = Cr(
        L.type,
        L.key,
        L.props,
        null,
        O.mode,
        V
      ), Ia(z, L), z.return = O, z);
    }
    function U(O, z, L, V) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== L.containerInfo || z.stateNode.implementation !== L.implementation ? (z = Ku(L, O.mode, V), z.return = O, z) : (z = h(z, L.children || []), z.return = O, z);
    }
    function Y(O, z, L, V, ot) {
      return z === null || z.tag !== 7 ? (z = Jn(
        L,
        O.mode,
        V,
        ot
      ), z.return = O, z) : (z = h(z, L), z.return = O, z);
    }
    function K(O, z, L) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = Gu(
          "" + z,
          O.mode,
          L
        ), z.return = O, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case S:
            return L = Cr(
              z.type,
              z.key,
              z.props,
              null,
              O.mode,
              L
            ), Ia(L, z), L.return = O, L;
          case w:
            return z = Ku(
              z,
              O.mode,
              L
            ), z.return = O, z;
          case X:
            return z = es(z), K(O, z, L);
        }
        if (Bt(z) || nt(z))
          return z = Jn(
            z,
            O.mode,
            L,
            null
          ), z.return = O, z;
        if (typeof z.then == "function")
          return K(O, Dr(z), L);
        if (z.$$typeof === R)
          return K(
            O,
            kr(O, z),
            L
          );
        Ar(O, z);
      }
      return null;
    }
    function H(O, z, L, V) {
      var ot = z !== null ? z.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return ot !== null ? null : _(O, z, "" + L, V);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case S:
            return L.key === ot ? E(O, z, L, V) : null;
          case w:
            return L.key === ot ? U(O, z, L, V) : null;
          case X:
            return L = es(L), H(O, z, L, V);
        }
        if (Bt(L) || nt(L))
          return ot !== null ? null : Y(O, z, L, V, null);
        if (typeof L.then == "function")
          return H(
            O,
            z,
            Dr(L),
            V
          );
        if (L.$$typeof === R)
          return H(
            O,
            z,
            kr(O, L),
            V
          );
        Ar(O, L);
      }
      return null;
    }
    function q(O, z, L, V, ot) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return O = O.get(L) || null, _(z, O, "" + V, ot);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case S:
            return O = O.get(
              V.key === null ? L : V.key
            ) || null, E(z, O, V, ot);
          case w:
            return O = O.get(
              V.key === null ? L : V.key
            ) || null, U(z, O, V, ot);
          case X:
            return V = es(V), q(
              O,
              z,
              L,
              V,
              ot
            );
        }
        if (Bt(V) || nt(V))
          return O = O.get(L) || null, Y(z, O, V, ot, null);
        if (typeof V.then == "function")
          return q(
            O,
            z,
            L,
            Dr(V),
            ot
          );
        if (V.$$typeof === R)
          return q(
            O,
            z,
            L,
            kr(z, V),
            ot
          );
        Ar(z, V);
      }
      return null;
    }
    function at(O, z, L, V) {
      for (var ot = null, jt = null, lt = z, gt = z = 0, St = null; lt !== null && gt < L.length; gt++) {
        lt.index > gt ? (St = lt, lt = null) : St = lt.sibling;
        var kt = H(
          O,
          lt,
          L[gt],
          V
        );
        if (kt === null) {
          lt === null && (lt = St);
          break;
        }
        e && lt && kt.alternate === null && i(O, lt), z = f(kt, z, gt), jt === null ? ot = kt : jt.sibling = kt, jt = kt, lt = St;
      }
      if (gt === L.length)
        return l(O, lt), Nt && Ki(O, gt), ot;
      if (lt === null) {
        for (; gt < L.length; gt++)
          lt = K(O, L[gt], V), lt !== null && (z = f(
            lt,
            z,
            gt
          ), jt === null ? ot = lt : jt.sibling = lt, jt = lt);
        return Nt && Ki(O, gt), ot;
      }
      for (lt = o(lt); gt < L.length; gt++)
        St = q(
          lt,
          O,
          gt,
          L[gt],
          V
        ), St !== null && (e && St.alternate !== null && lt.delete(
          St.key === null ? gt : St.key
        ), z = f(
          St,
          z,
          gt
        ), jt === null ? ot = St : jt.sibling = St, jt = St);
      return e && lt.forEach(function(An) {
        return i(O, An);
      }), Nt && Ki(O, gt), ot;
    }
    function ut(O, z, L, V) {
      if (L == null) throw Error(a(151));
      for (var ot = null, jt = null, lt = z, gt = z = 0, St = null, kt = L.next(); lt !== null && !kt.done; gt++, kt = L.next()) {
        lt.index > gt ? (St = lt, lt = null) : St = lt.sibling;
        var An = H(O, lt, kt.value, V);
        if (An === null) {
          lt === null && (lt = St);
          break;
        }
        e && lt && An.alternate === null && i(O, lt), z = f(An, z, gt), jt === null ? ot = An : jt.sibling = An, jt = An, lt = St;
      }
      if (kt.done)
        return l(O, lt), Nt && Ki(O, gt), ot;
      if (lt === null) {
        for (; !kt.done; gt++, kt = L.next())
          kt = K(O, kt.value, V), kt !== null && (z = f(kt, z, gt), jt === null ? ot = kt : jt.sibling = kt, jt = kt);
        return Nt && Ki(O, gt), ot;
      }
      for (lt = o(lt); !kt.done; gt++, kt = L.next())
        kt = q(lt, O, gt, kt.value, V), kt !== null && (e && kt.alternate !== null && lt.delete(kt.key === null ? gt : kt.key), z = f(kt, z, gt), jt === null ? ot = kt : jt.sibling = kt, jt = kt);
      return e && lt.forEach(function(Jx) {
        return i(O, Jx);
      }), Nt && Ki(O, gt), ot;
    }
    function qt(O, z, L, V) {
      if (typeof L == "object" && L !== null && L.type === M && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case S:
            t: {
              for (var ot = L.key; z !== null; ) {
                if (z.key === ot) {
                  if (ot = L.type, ot === M) {
                    if (z.tag === 7) {
                      l(
                        O,
                        z.sibling
                      ), V = h(
                        z,
                        L.props.children
                      ), V.return = O, O = V;
                      break t;
                    }
                  } else if (z.elementType === ot || typeof ot == "object" && ot !== null && ot.$$typeof === X && es(ot) === z.type) {
                    l(
                      O,
                      z.sibling
                    ), V = h(z, L.props), Ia(V, L), V.return = O, O = V;
                    break t;
                  }
                  l(O, z);
                  break;
                } else i(O, z);
                z = z.sibling;
              }
              L.type === M ? (V = Jn(
                L.props.children,
                O.mode,
                V,
                L.key
              ), V.return = O, O = V) : (V = Cr(
                L.type,
                L.key,
                L.props,
                null,
                O.mode,
                V
              ), Ia(V, L), V.return = O, O = V);
            }
            return y(O);
          case w:
            t: {
              for (ot = L.key; z !== null; ) {
                if (z.key === ot)
                  if (z.tag === 4 && z.stateNode.containerInfo === L.containerInfo && z.stateNode.implementation === L.implementation) {
                    l(
                      O,
                      z.sibling
                    ), V = h(z, L.children || []), V.return = O, O = V;
                    break t;
                  } else {
                    l(O, z);
                    break;
                  }
                else i(O, z);
                z = z.sibling;
              }
              V = Ku(L, O.mode, V), V.return = O, O = V;
            }
            return y(O);
          case X:
            return L = es(L), qt(
              O,
              z,
              L,
              V
            );
        }
        if (Bt(L))
          return at(
            O,
            z,
            L,
            V
          );
        if (nt(L)) {
          if (ot = nt(L), typeof ot != "function") throw Error(a(150));
          return L = ot.call(L), ut(
            O,
            z,
            L,
            V
          );
        }
        if (typeof L.then == "function")
          return qt(
            O,
            z,
            Dr(L),
            V
          );
        if (L.$$typeof === R)
          return qt(
            O,
            z,
            kr(O, L),
            V
          );
        Ar(O, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint" ? (L = "" + L, z !== null && z.tag === 6 ? (l(O, z.sibling), V = h(z, L), V.return = O, O = V) : (l(O, z), V = Gu(L, O.mode, V), V.return = O, O = V), y(O)) : l(O, z);
    }
    return function(O, z, L, V) {
      try {
        Ja = 0;
        var ot = qt(
          O,
          z,
          L,
          V
        );
        return Js = null, ot;
      } catch (lt) {
        if (lt === Ws || lt === Tr) throw lt;
        var jt = Xe(29, lt, null, O.mode);
        return jt.lanes = V, jt.return = O, jt;
      }
    };
  }
  var ns = mm(!0), pm = mm(!1), gn = !1;
  function sc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ac(e, i) {
    e = e.updateQueue, i.updateQueue === e && (i.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function bn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function yn(e, i, l) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Ot & 2) !== 0) {
      var h = o.pending;
      return h === null ? i.next = i : (i.next = h.next, h.next = i), o.pending = i, i = Nr(e), Ff(e, null, l), i;
    }
    return Mr(e, o, i, l), Nr(e);
  }
  function Fa(e, i, l) {
    if (i = i.updateQueue, i !== null && (i = i.shared, (l & 4194048) !== 0)) {
      var o = i.lanes;
      o &= e.pendingLanes, l |= o, i.lanes = l, Ge(e, l);
    }
  }
  function lc(e, i) {
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
        f === null ? h = f = i : f = f.next = i;
      } else h = f = i;
      l = {
        baseState: o.baseState,
        firstBaseUpdate: h,
        lastBaseUpdate: f,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = i : e.next = i, l.lastBaseUpdate = i;
  }
  var rc = !1;
  function Pa() {
    if (rc) {
      var e = Zs;
      if (e !== null) throw e;
    }
  }
  function tl(e, i, l, o) {
    rc = !1;
    var h = e.updateQueue;
    gn = !1;
    var f = h.firstBaseUpdate, y = h.lastBaseUpdate, _ = h.shared.pending;
    if (_ !== null) {
      h.shared.pending = null;
      var E = _, U = E.next;
      E.next = null, y === null ? f = U : y.next = U, y = E;
      var Y = e.alternate;
      Y !== null && (Y = Y.updateQueue, _ = Y.lastBaseUpdate, _ !== y && (_ === null ? Y.firstBaseUpdate = U : _.next = U, Y.lastBaseUpdate = E));
    }
    if (f !== null) {
      var K = h.baseState;
      y = 0, Y = U = E = null, _ = f;
      do {
        var H = _.lane & -536870913, q = H !== _.lane;
        if (q ? (_t & H) === H : (o & H) === H) {
          H !== 0 && H === Xs && (rc = !0), Y !== null && (Y = Y.next = {
            lane: 0,
            tag: _.tag,
            payload: _.payload,
            callback: null,
            next: null
          });
          t: {
            var at = e, ut = _;
            H = i;
            var qt = l;
            switch (ut.tag) {
              case 1:
                if (at = ut.payload, typeof at == "function") {
                  K = at.call(qt, K, H);
                  break t;
                }
                K = at;
                break t;
              case 3:
                at.flags = at.flags & -65537 | 128;
              case 0:
                if (at = ut.payload, H = typeof at == "function" ? at.call(qt, K, H) : at, H == null) break t;
                K = b({}, K, H);
                break t;
              case 2:
                gn = !0;
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
          }, Y === null ? (U = Y = q, E = K) : Y = Y.next = q, y |= H;
        if (_ = _.next, _ === null) {
          if (_ = h.shared.pending, _ === null)
            break;
          q = _, _ = q.next, q.next = null, h.lastBaseUpdate = q, h.shared.pending = null;
        }
      } while (!0);
      Y === null && (E = K), h.baseState = E, h.firstBaseUpdate = U, h.lastBaseUpdate = Y, f === null && (h.shared.lanes = 0), Mn |= y, e.lanes = y, e.memoizedState = K;
    }
  }
  function vm(e, i) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(i);
  }
  function gm(e, i) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        vm(l[e], i);
  }
  var Is = k(null), Rr = k(0);
  function bm(e, i) {
    e = sn, J(Rr, e), J(Is, i), sn = e | i.baseLanes;
  }
  function oc() {
    J(Rr, sn), J(Is, Is.current);
  }
  function uc() {
    sn = Rr.current, Q(Is), Q(Rr);
  }
  var Ze = k(null), di = null;
  function xn(e) {
    var i = e.alternate;
    J(Ft, Ft.current & 1), J(Ze, e), di === null && (i === null || Is.current !== null || i.memoizedState !== null) && (di = e);
  }
  function cc(e) {
    J(Ft, Ft.current), J(Ze, e), di === null && (di = e);
  }
  function ym(e) {
    e.tag === 22 ? (J(Ft, Ft.current), J(Ze, e), di === null && (di = e)) : wn();
  }
  function wn() {
    J(Ft, Ft.current), J(Ze, Ze.current);
  }
  function We(e) {
    Q(Ze), di === e && (di = null), Q(Ft);
  }
  var Ft = k(0);
  function Lr(e) {
    for (var i = e; i !== null; ) {
      if (i.tag === 13) {
        var l = i.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || vh(l) || gh(l)))
          return i;
      } else if (i.tag === 19 && (i.memoizedProps.revealOrder === "forwards" || i.memoizedProps.revealOrder === "backwards" || i.memoizedProps.revealOrder === "unstable_legacy-backwards" || i.memoizedProps.revealOrder === "together")) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        i.child.return = i, i = i.child;
        continue;
      }
      if (i === e) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === e) return null;
        i = i.return;
      }
      i.sibling.return = i.return, i = i.sibling;
    }
    return null;
  }
  var Wi = 0, vt = null, Ut = null, ie = null, Br = !1, Fs = !1, ss = !1, Ur = 0, el = 0, Ps = null, qy = 0;
  function Zt() {
    throw Error(a(321));
  }
  function hc(e, i) {
    if (i === null) return !1;
    for (var l = 0; l < i.length && l < e.length; l++)
      if (!Ke(e[l], i[l])) return !1;
    return !0;
  }
  function dc(e, i, l, o, h, f) {
    return Wi = f, vt = i, i.memoizedState = null, i.updateQueue = null, i.lanes = 0, B.H = e === null || e.memoizedState === null ? ip : Ec, ss = !1, f = l(o, h), ss = !1, Fs && (f = wm(
      i,
      l,
      o,
      h
    )), xm(e), f;
  }
  function xm(e) {
    B.H = sl;
    var i = Ut !== null && Ut.next !== null;
    if (Wi = 0, ie = Ut = vt = null, Br = !1, el = 0, Ps = null, i) throw Error(a(300));
    e === null || ne || (e = e.dependencies, e !== null && jr(e) && (ne = !0));
  }
  function wm(e, i, l, o) {
    vt = e;
    var h = 0;
    do {
      if (Fs && (Ps = null), el = 0, Fs = !1, 25 <= h) throw Error(a(301));
      if (h += 1, ie = Ut = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      B.H = np, f = i(l, o);
    } while (Fs);
    return f;
  }
  function Qy() {
    var e = B.H, i = e.useState()[0];
    return i = typeof i.then == "function" ? il(i) : i, e = e.useState()[0], (Ut !== null ? Ut.memoizedState : null) !== e && (vt.flags |= 1024), i;
  }
  function fc() {
    var e = Ur !== 0;
    return Ur = 0, e;
  }
  function mc(e, i, l) {
    i.updateQueue = e.updateQueue, i.flags &= -2053, e.lanes &= ~l;
  }
  function pc(e) {
    if (Br) {
      for (e = e.memoizedState; e !== null; ) {
        var i = e.queue;
        i !== null && (i.pending = null), e = e.next;
      }
      Br = !1;
    }
    Wi = 0, ie = Ut = vt = null, Fs = !1, el = Ur = 0, Ps = null;
  }
  function Ee() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ie === null ? vt.memoizedState = ie = e : ie = ie.next = e, ie;
  }
  function Pt() {
    if (Ut === null) {
      var e = vt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ut.next;
    var i = ie === null ? vt.memoizedState : ie.next;
    if (i !== null)
      ie = i, Ut = e;
    else {
      if (e === null)
        throw vt.alternate === null ? Error(a(467)) : Error(a(310));
      Ut = e, e = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      }, ie === null ? vt.memoizedState = ie = e : ie = ie.next = e;
    }
    return ie;
  }
  function Hr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function il(e) {
    var i = el;
    return el += 1, Ps === null && (Ps = []), e = hm(Ps, e, i), i = vt, (ie === null ? i.memoizedState : ie.next) === null && (i = i.alternate, B.H = i === null || i.memoizedState === null ? ip : Ec), e;
  }
  function qr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return il(e);
      if (e.$$typeof === R) return ge(e);
    }
    throw Error(a(438, String(e)));
  }
  function vc(e) {
    var i = null, l = vt.updateQueue;
    if (l !== null && (i = l.memoCache), i == null) {
      var o = vt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (i = {
        data: o.data.map(function(h) {
          return h.slice();
        }),
        index: 0
      })));
    }
    if (i == null && (i = { data: [], index: 0 }), l === null && (l = Hr(), vt.updateQueue = l), l.memoCache = i, l = i.data[i.index], l === void 0)
      for (l = i.data[i.index] = Array(e), o = 0; o < e; o++)
        l[o] = I;
    return i.index++, l;
  }
  function Ji(e, i) {
    return typeof i == "function" ? i(e) : i;
  }
  function Qr(e) {
    var i = Pt();
    return gc(i, Ut, e);
  }
  function gc(e, i, l) {
    var o = e.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = l;
    var h = e.baseQueue, f = o.pending;
    if (f !== null) {
      if (h !== null) {
        var y = h.next;
        h.next = f.next, f.next = y;
      }
      i.baseQueue = h = f, o.pending = null;
    }
    if (f = e.baseState, h === null) e.memoizedState = f;
    else {
      i = h.next;
      var _ = y = null, E = null, U = i, Y = !1;
      do {
        var K = U.lane & -536870913;
        if (K !== U.lane ? (_t & K) === K : (Wi & K) === K) {
          var H = U.revertLane;
          if (H === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), K === Xs && (Y = !0);
          else if ((Wi & H) === H) {
            U = U.next, H === Xs && (Y = !0);
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
            }, E === null ? (_ = E = K, y = f) : E = E.next = K, vt.lanes |= H, Mn |= H;
          K = U.action, ss && l(f, K), f = U.hasEagerState ? U.eagerState : l(f, K);
        } else
          H = {
            lane: K,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, E === null ? (_ = E = H, y = f) : E = E.next = H, vt.lanes |= K, Mn |= K;
        U = U.next;
      } while (U !== null && U !== i);
      if (E === null ? y = f : E.next = _, !Ke(f, e.memoizedState) && (ne = !0, Y && (l = Zs, l !== null)))
        throw l;
      e.memoizedState = f, e.baseState = y, e.baseQueue = E, o.lastRenderedState = f;
    }
    return h === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function bc(e) {
    var i = Pt(), l = i.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var o = l.dispatch, h = l.pending, f = i.memoizedState;
    if (h !== null) {
      l.pending = null;
      var y = h = h.next;
      do
        f = e(f, y.action), y = y.next;
      while (y !== h);
      Ke(f, i.memoizedState) || (ne = !0), i.memoizedState = f, i.baseQueue === null && (i.baseState = f), l.lastRenderedState = f;
    }
    return [f, o];
  }
  function _m(e, i, l) {
    var o = vt, h = Pt(), f = Nt;
    if (f) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = i();
    var y = !Ke(
      (Ut || h).memoizedState,
      l
    );
    if (y && (h.memoizedState = l, ne = !0), h = h.queue, wc(Nm.bind(null, o, h, e), [
      e
    ]), h.getSnapshot !== i || y || ie !== null && ie.memoizedState.tag & 1) {
      if (o.flags |= 2048, ta(
        9,
        { destroy: void 0 },
        Mm.bind(
          null,
          o,
          h,
          l,
          i
        ),
        null
      ), Qt === null) throw Error(a(349));
      f || (Wi & 127) !== 0 || Sm(o, i, l);
    }
    return l;
  }
  function Sm(e, i, l) {
    e.flags |= 16384, e = { getSnapshot: i, value: l }, i = vt.updateQueue, i === null ? (i = Hr(), vt.updateQueue = i, i.stores = [e]) : (l = i.stores, l === null ? i.stores = [e] : l.push(e));
  }
  function Mm(e, i, l, o) {
    i.value = l, i.getSnapshot = o, Cm(i) && Em(e);
  }
  function Nm(e, i, l) {
    return l(function() {
      Cm(i) && Em(e);
    });
  }
  function Cm(e) {
    var i = e.getSnapshot;
    e = e.value;
    try {
      var l = i();
      return !Ke(e, l);
    } catch {
      return !0;
    }
  }
  function Em(e) {
    var i = Wn(e, 2);
    i !== null && qe(i, e, 2);
  }
  function yc(e) {
    var i = Ee();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), ss) {
        ei(!0);
        try {
          l();
        } finally {
          ei(!1);
        }
      }
    }
    return i.memoizedState = i.baseState = e, i.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ji,
      lastRenderedState: e
    }, i;
  }
  function jm(e, i, l, o) {
    return e.baseState = l, gc(
      e,
      Ut,
      typeof o == "function" ? o : Ji
    );
  }
  function $y(e, i, l, o, h) {
    if (Vr(e)) throw Error(a(485));
    if (e = i.action, e !== null) {
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
      B.T !== null ? l(!0) : f.isTransition = !1, o(f), l = i.pending, l === null ? (f.next = i.pending = f, km(i, f)) : (f.next = l.next, i.pending = l.next = f);
    }
  }
  function km(e, i) {
    var l = i.action, o = i.payload, h = e.state;
    if (i.isTransition) {
      var f = B.T, y = {};
      B.T = y;
      try {
        var _ = l(h, o), E = B.S;
        E !== null && E(y, _), zm(e, i, _);
      } catch (U) {
        xc(e, i, U);
      } finally {
        f !== null && y.types !== null && (f.types = y.types), B.T = f;
      }
    } else
      try {
        f = l(h, o), zm(e, i, f);
      } catch (U) {
        xc(e, i, U);
      }
  }
  function zm(e, i, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(o) {
        Tm(e, i, o);
      },
      function(o) {
        return xc(e, i, o);
      }
    ) : Tm(e, i, l);
  }
  function Tm(e, i, l) {
    i.status = "fulfilled", i.value = l, Om(i), e.state = l, i = e.pending, i !== null && (l = i.next, l === i ? e.pending = null : (l = l.next, i.next = l, km(e, l)));
  }
  function xc(e, i, l) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        i.status = "rejected", i.reason = l, Om(i), i = i.next;
      while (i !== o);
    }
    e.action = null;
  }
  function Om(e) {
    e = e.listeners;
    for (var i = 0; i < e.length; i++) (0, e[i])();
  }
  function Dm(e, i) {
    return i;
  }
  function Am(e, i) {
    if (Nt) {
      var l = Qt.formState;
      if (l !== null) {
        t: {
          var o = vt;
          if (Nt) {
            if (Yt) {
              e: {
                for (var h = Yt, f = hi; h.nodeType !== 8; ) {
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
                Yt = fi(
                  h.nextSibling
                ), o = h.data === "F!";
                break t;
              }
            }
            pn(o);
          }
          o = !1;
        }
        o && (i = l[0]);
      }
    }
    return l = Ee(), l.memoizedState = l.baseState = i, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dm,
      lastRenderedState: i
    }, l.queue = o, l = Pm.bind(
      null,
      vt,
      o
    ), o.dispatch = l, o = yc(!1), f = Cc.bind(
      null,
      vt,
      !1,
      o.queue
    ), o = Ee(), h = {
      state: i,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = h, l = $y.bind(
      null,
      vt,
      h,
      f,
      l
    ), h.dispatch = l, o.memoizedState = e, [i, l, !1];
  }
  function Rm(e) {
    var i = Pt();
    return Lm(i, Ut, e);
  }
  function Lm(e, i, l) {
    if (i = gc(
      e,
      i,
      Dm
    )[0], e = Qr(Ji)[0], typeof i == "object" && i !== null && typeof i.then == "function")
      try {
        var o = il(i);
      } catch (y) {
        throw y === Ws ? Tr : y;
      }
    else o = i;
    i = Pt();
    var h = i.queue, f = h.dispatch;
    return l !== i.memoizedState && (vt.flags |= 2048, ta(
      9,
      { destroy: void 0 },
      Yy.bind(null, h, l),
      null
    )), [o, f, e];
  }
  function Yy(e, i) {
    e.action = i;
  }
  function Bm(e) {
    var i = Pt(), l = Ut;
    if (l !== null)
      return Lm(i, l, e);
    Pt(), i = i.memoizedState, l = Pt();
    var o = l.queue.dispatch;
    return l.memoizedState = e, [i, o, !1];
  }
  function ta(e, i, l, o) {
    return e = { tag: e, create: l, deps: o, inst: i, next: null }, i = vt.updateQueue, i === null && (i = Hr(), vt.updateQueue = i), l = i.lastEffect, l === null ? i.lastEffect = e.next = e : (o = l.next, l.next = e, e.next = o, i.lastEffect = e), e;
  }
  function Um() {
    return Pt().memoizedState;
  }
  function $r(e, i, l, o) {
    var h = Ee();
    vt.flags |= e, h.memoizedState = ta(
      1 | i,
      { destroy: void 0 },
      l,
      o === void 0 ? null : o
    );
  }
  function Yr(e, i, l, o) {
    var h = Pt();
    o = o === void 0 ? null : o;
    var f = h.memoizedState.inst;
    Ut !== null && o !== null && hc(o, Ut.memoizedState.deps) ? h.memoizedState = ta(i, f, l, o) : (vt.flags |= e, h.memoizedState = ta(
      1 | i,
      f,
      l,
      o
    ));
  }
  function Hm(e, i) {
    $r(8390656, 8, e, i);
  }
  function wc(e, i) {
    Yr(2048, 8, e, i);
  }
  function Vy(e) {
    vt.flags |= 4;
    var i = vt.updateQueue;
    if (i === null)
      i = Hr(), vt.updateQueue = i, i.events = [e];
    else {
      var l = i.events;
      l === null ? i.events = [e] : l.push(e);
    }
  }
  function qm(e) {
    var i = Pt().memoizedState;
    return Vy({ ref: i, nextImpl: e }), function() {
      if ((Ot & 2) !== 0) throw Error(a(440));
      return i.impl.apply(void 0, arguments);
    };
  }
  function Qm(e, i) {
    return Yr(4, 2, e, i);
  }
  function $m(e, i) {
    return Yr(4, 4, e, i);
  }
  function Ym(e, i) {
    if (typeof i == "function") {
      e = e();
      var l = i(e);
      return function() {
        typeof l == "function" ? l() : i(null);
      };
    }
    if (i != null)
      return e = e(), i.current = e, function() {
        i.current = null;
      };
  }
  function Vm(e, i, l) {
    l = l != null ? l.concat([e]) : null, Yr(4, 4, Ym.bind(null, i, e), l);
  }
  function _c() {
  }
  function Gm(e, i) {
    var l = Pt();
    i = i === void 0 ? null : i;
    var o = l.memoizedState;
    return i !== null && hc(i, o[1]) ? o[0] : (l.memoizedState = [e, i], e);
  }
  function Km(e, i) {
    var l = Pt();
    i = i === void 0 ? null : i;
    var o = l.memoizedState;
    if (i !== null && hc(i, o[1]))
      return o[0];
    if (o = e(), ss) {
      ei(!0);
      try {
        e();
      } finally {
        ei(!1);
      }
    }
    return l.memoizedState = [o, i], o;
  }
  function Sc(e, i, l) {
    return l === void 0 || (Wi & 1073741824) !== 0 && (_t & 261930) === 0 ? e.memoizedState = i : (e.memoizedState = l, e = Xp(), vt.lanes |= e, Mn |= e, l);
  }
  function Xm(e, i, l, o) {
    return Ke(l, i) ? l : Is.current !== null ? (e = Sc(e, l, o), Ke(e, i) || (ne = !0), e) : (Wi & 42) === 0 || (Wi & 1073741824) !== 0 && (_t & 261930) === 0 ? (ne = !0, e.memoizedState = l) : (e = Xp(), vt.lanes |= e, Mn |= e, i);
  }
  function Zm(e, i, l, o, h) {
    var f = Z.p;
    Z.p = f !== 0 && 8 > f ? f : 8;
    var y = B.T, _ = {};
    B.T = _, Cc(e, !1, i, l);
    try {
      var E = h(), U = B.S;
      if (U !== null && U(_, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var Y = Hy(
          E,
          o
        );
        nl(
          e,
          i,
          Y,
          Fe(e)
        );
      } else
        nl(
          e,
          i,
          o,
          Fe(e)
        );
    } catch (K) {
      nl(
        e,
        i,
        { then: function() {
        }, status: "rejected", reason: K },
        Fe()
      );
    } finally {
      Z.p = f, y !== null && _.types !== null && (y.types = _.types), B.T = y;
    }
  }
  function Gy() {
  }
  function Mc(e, i, l, o) {
    if (e.tag !== 5) throw Error(a(476));
    var h = Wm(e).queue;
    Zm(
      e,
      h,
      i,
      st,
      l === null ? Gy : function() {
        return Jm(e), l(o);
      }
    );
  }
  function Wm(e) {
    var i = e.memoizedState;
    if (i !== null) return i;
    i = {
      memoizedState: st,
      baseState: st,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ji,
        lastRenderedState: st
      },
      next: null
    };
    var l = {};
    return i.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ji,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = i, e = e.alternate, e !== null && (e.memoizedState = i), i;
  }
  function Jm(e) {
    var i = Wm(e);
    i.next === null && (i = e.alternate.memoizedState), nl(
      e,
      i.next.queue,
      {},
      Fe()
    );
  }
  function Nc() {
    return ge(xl);
  }
  function Im() {
    return Pt().memoizedState;
  }
  function Fm() {
    return Pt().memoizedState;
  }
  function Ky(e) {
    for (var i = e.return; i !== null; ) {
      switch (i.tag) {
        case 24:
        case 3:
          var l = Fe();
          e = bn(l);
          var o = yn(i, e, l);
          o !== null && (qe(o, i, l), Fa(o, i, l)), i = { cache: tc() }, e.payload = i;
          return;
      }
      i = i.return;
    }
  }
  function Xy(e, i, l) {
    var o = Fe();
    l = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Vr(e) ? tp(i, l) : (l = Yu(e, i, l, o), l !== null && (qe(l, e, o), ep(l, i, o)));
  }
  function Pm(e, i, l) {
    var o = Fe();
    nl(e, i, l, o);
  }
  function nl(e, i, l, o) {
    var h = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Vr(e)) tp(i, h);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = i.lastRenderedReducer, f !== null))
        try {
          var y = i.lastRenderedState, _ = f(y, l);
          if (h.hasEagerState = !0, h.eagerState = _, Ke(_, y))
            return Mr(e, i, h, 0), Qt === null && Sr(), !1;
        } catch {
        }
      if (l = Yu(e, i, h, o), l !== null)
        return qe(l, e, o), ep(l, i, o), !0;
    }
    return !1;
  }
  function Cc(e, i, l, o) {
    if (o = {
      lane: 2,
      revertLane: sh(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Vr(e)) {
      if (i) throw Error(a(479));
    } else
      i = Yu(
        e,
        l,
        o,
        2
      ), i !== null && qe(i, e, 2);
  }
  function Vr(e) {
    var i = e.alternate;
    return e === vt || i !== null && i === vt;
  }
  function tp(e, i) {
    Fs = Br = !0;
    var l = e.pending;
    l === null ? i.next = i : (i.next = l.next, l.next = i), e.pending = i;
  }
  function ep(e, i, l) {
    if ((l & 4194048) !== 0) {
      var o = i.lanes;
      o &= e.pendingLanes, l |= o, i.lanes = l, Ge(e, l);
    }
  }
  var sl = {
    readContext: ge,
    use: qr,
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
  sl.useEffectEvent = Zt;
  var ip = {
    readContext: ge,
    use: qr,
    useCallback: function(e, i) {
      return Ee().memoizedState = [
        e,
        i === void 0 ? null : i
      ], e;
    },
    useContext: ge,
    useEffect: Hm,
    useImperativeHandle: function(e, i, l) {
      l = l != null ? l.concat([e]) : null, $r(
        4194308,
        4,
        Ym.bind(null, i, e),
        l
      );
    },
    useLayoutEffect: function(e, i) {
      return $r(4194308, 4, e, i);
    },
    useInsertionEffect: function(e, i) {
      $r(4, 2, e, i);
    },
    useMemo: function(e, i) {
      var l = Ee();
      i = i === void 0 ? null : i;
      var o = e();
      if (ss) {
        ei(!0);
        try {
          e();
        } finally {
          ei(!1);
        }
      }
      return l.memoizedState = [o, i], o;
    },
    useReducer: function(e, i, l) {
      var o = Ee();
      if (l !== void 0) {
        var h = l(i);
        if (ss) {
          ei(!0);
          try {
            l(i);
          } finally {
            ei(!1);
          }
        }
      } else h = i;
      return o.memoizedState = o.baseState = h, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: h
      }, o.queue = e, e = e.dispatch = Xy.bind(
        null,
        vt,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var i = Ee();
      return e = { current: e }, i.memoizedState = e;
    },
    useState: function(e) {
      e = yc(e);
      var i = e.queue, l = Pm.bind(null, vt, i);
      return i.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: _c,
    useDeferredValue: function(e, i) {
      var l = Ee();
      return Sc(l, e, i);
    },
    useTransition: function() {
      var e = yc(!1);
      return e = Zm.bind(
        null,
        vt,
        e.queue,
        !0,
        !1
      ), Ee().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, i, l) {
      var o = vt, h = Ee();
      if (Nt) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = i(), Qt === null)
          throw Error(a(349));
        (_t & 127) !== 0 || Sm(o, i, l);
      }
      h.memoizedState = l;
      var f = { value: l, getSnapshot: i };
      return h.queue = f, Hm(Nm.bind(null, o, f, e), [
        e
      ]), o.flags |= 2048, ta(
        9,
        { destroy: void 0 },
        Mm.bind(
          null,
          o,
          f,
          l,
          i
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Ee(), i = Qt.identifierPrefix;
      if (Nt) {
        var l = Ti, o = zi;
        l = (o & ~(1 << 32 - Se(o) - 1)).toString(32) + l, i = "_" + i + "R_" + l, l = Ur++, 0 < l && (i += "H" + l.toString(32)), i += "_";
      } else
        l = qy++, i = "_" + i + "r_" + l.toString(32) + "_";
      return e.memoizedState = i;
    },
    useHostTransitionStatus: Nc,
    useFormState: Am,
    useActionState: Am,
    useOptimistic: function(e) {
      var i = Ee();
      i.memoizedState = i.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return i.queue = l, i = Cc.bind(
        null,
        vt,
        !0,
        l
      ), l.dispatch = i, [e, i];
    },
    useMemoCache: vc,
    useCacheRefresh: function() {
      return Ee().memoizedState = Ky.bind(
        null,
        vt
      );
    },
    useEffectEvent: function(e) {
      var i = Ee(), l = { impl: e };
      return i.memoizedState = l, function() {
        if ((Ot & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Ec = {
    readContext: ge,
    use: qr,
    useCallback: Gm,
    useContext: ge,
    useEffect: wc,
    useImperativeHandle: Vm,
    useInsertionEffect: Qm,
    useLayoutEffect: $m,
    useMemo: Km,
    useReducer: Qr,
    useRef: Um,
    useState: function() {
      return Qr(Ji);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, i) {
      var l = Pt();
      return Xm(
        l,
        Ut.memoizedState,
        e,
        i
      );
    },
    useTransition: function() {
      var e = Qr(Ji)[0], i = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : il(e),
        i
      ];
    },
    useSyncExternalStore: _m,
    useId: Im,
    useHostTransitionStatus: Nc,
    useFormState: Rm,
    useActionState: Rm,
    useOptimistic: function(e, i) {
      var l = Pt();
      return jm(l, Ut, e, i);
    },
    useMemoCache: vc,
    useCacheRefresh: Fm
  };
  Ec.useEffectEvent = qm;
  var np = {
    readContext: ge,
    use: qr,
    useCallback: Gm,
    useContext: ge,
    useEffect: wc,
    useImperativeHandle: Vm,
    useInsertionEffect: Qm,
    useLayoutEffect: $m,
    useMemo: Km,
    useReducer: bc,
    useRef: Um,
    useState: function() {
      return bc(Ji);
    },
    useDebugValue: _c,
    useDeferredValue: function(e, i) {
      var l = Pt();
      return Ut === null ? Sc(l, e, i) : Xm(
        l,
        Ut.memoizedState,
        e,
        i
      );
    },
    useTransition: function() {
      var e = bc(Ji)[0], i = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : il(e),
        i
      ];
    },
    useSyncExternalStore: _m,
    useId: Im,
    useHostTransitionStatus: Nc,
    useFormState: Bm,
    useActionState: Bm,
    useOptimistic: function(e, i) {
      var l = Pt();
      return Ut !== null ? jm(l, Ut, e, i) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: vc,
    useCacheRefresh: Fm
  };
  np.useEffectEvent = qm;
  function jc(e, i, l, o) {
    i = e.memoizedState, l = l(o, i), l = l == null ? i : b({}, i, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var kc = {
    enqueueSetState: function(e, i, l) {
      e = e._reactInternals;
      var o = Fe(), h = bn(o);
      h.payload = i, l != null && (h.callback = l), i = yn(e, h, o), i !== null && (qe(i, e, o), Fa(i, e, o));
    },
    enqueueReplaceState: function(e, i, l) {
      e = e._reactInternals;
      var o = Fe(), h = bn(o);
      h.tag = 1, h.payload = i, l != null && (h.callback = l), i = yn(e, h, o), i !== null && (qe(i, e, o), Fa(i, e, o));
    },
    enqueueForceUpdate: function(e, i) {
      e = e._reactInternals;
      var l = Fe(), o = bn(l);
      o.tag = 2, i != null && (o.callback = i), i = yn(e, o, l), i !== null && (qe(i, e, l), Fa(i, e, l));
    }
  };
  function sp(e, i, l, o, h, f, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, f, y) : i.prototype && i.prototype.isPureReactComponent ? !Va(l, o) || !Va(h, f) : !0;
  }
  function ap(e, i, l, o) {
    e = i.state, typeof i.componentWillReceiveProps == "function" && i.componentWillReceiveProps(l, o), typeof i.UNSAFE_componentWillReceiveProps == "function" && i.UNSAFE_componentWillReceiveProps(l, o), i.state !== e && kc.enqueueReplaceState(i, i.state, null);
  }
  function as(e, i) {
    var l = i;
    if ("ref" in i) {
      l = {};
      for (var o in i)
        o !== "ref" && (l[o] = i[o]);
    }
    if (e = e.defaultProps) {
      l === i && (l = b({}, l));
      for (var h in e)
        l[h] === void 0 && (l[h] = e[h]);
    }
    return l;
  }
  function lp(e) {
    _r(e);
  }
  function rp(e) {
    console.error(e);
  }
  function op(e) {
    _r(e);
  }
  function Gr(e, i) {
    try {
      var l = e.onUncaughtError;
      l(i.value, { componentStack: i.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function up(e, i, l) {
    try {
      var o = e.onCaughtError;
      o(l.value, {
        componentStack: l.stack,
        errorBoundary: i.tag === 1 ? i.stateNode : null
      });
    } catch (h) {
      setTimeout(function() {
        throw h;
      });
    }
  }
  function zc(e, i, l) {
    return l = bn(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Gr(e, i);
    }, l;
  }
  function cp(e) {
    return e = bn(e), e.tag = 3, e;
  }
  function hp(e, i, l, o) {
    var h = l.type.getDerivedStateFromError;
    if (typeof h == "function") {
      var f = o.value;
      e.payload = function() {
        return h(f);
      }, e.callback = function() {
        up(i, l, o);
      };
    }
    var y = l.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      up(i, l, o), typeof h != "function" && (Nn === null ? Nn = /* @__PURE__ */ new Set([this]) : Nn.add(this));
      var _ = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: _ !== null ? _ : ""
      });
    });
  }
  function Zy(e, i, l, o, h) {
    if (l.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (i = l.alternate, i !== null && Ks(
        i,
        l,
        h,
        !0
      ), l = Ze.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return di === null ? no() : l.alternate === null && Wt === 0 && (Wt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = h, o === Or ? l.flags |= 16384 : (i = l.updateQueue, i === null ? l.updateQueue = /* @__PURE__ */ new Set([o]) : i.add(o), eh(e, o, h)), !1;
          case 22:
            return l.flags |= 65536, o === Or ? l.flags |= 16384 : (i = l.updateQueue, i === null ? (i = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, l.updateQueue = i) : (l = i.retryQueue, l === null ? i.retryQueue = /* @__PURE__ */ new Set([o]) : l.add(o)), eh(e, o, h)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return eh(e, o, h), no(), !1;
    }
    if (Nt)
      return i = Ze.current, i !== null ? ((i.flags & 65536) === 0 && (i.flags |= 256), i.flags |= 65536, i.lanes = h, o !== Wu && (e = Error(a(422), { cause: o }), Xa(oi(e, l)))) : (o !== Wu && (i = Error(a(423), {
        cause: o
      }), Xa(
        oi(i, l)
      )), e = e.current.alternate, e.flags |= 65536, h &= -h, e.lanes |= h, o = oi(o, l), h = zc(
        e.stateNode,
        o,
        h
      ), lc(e, h), Wt !== 4 && (Wt = 2)), !1;
    var f = Error(a(520), { cause: o });
    if (f = oi(f, l), dl === null ? dl = [f] : dl.push(f), Wt !== 4 && (Wt = 2), i === null) return !0;
    o = oi(o, l), l = i;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = h & -h, l.lanes |= e, e = zc(l.stateNode, o, e), lc(l, e), !1;
        case 1:
          if (i = l.type, f = l.stateNode, (l.flags & 128) === 0 && (typeof i.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Nn === null || !Nn.has(f))))
            return l.flags |= 65536, h &= -h, l.lanes |= h, h = cp(h), hp(
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
  function be(e, i, l, o) {
    i.child = e === null ? pm(i, null, l, o) : ns(
      i,
      e.child,
      l,
      o
    );
  }
  function dp(e, i, l, o, h) {
    l = l.render;
    var f = i.ref;
    if ("ref" in o) {
      var y = {};
      for (var _ in o)
        _ !== "ref" && (y[_] = o[_]);
    } else y = o;
    return Pn(i), o = dc(
      e,
      i,
      l,
      y,
      f,
      h
    ), _ = fc(), e !== null && !ne ? (mc(e, i, h), Ii(e, i, h)) : (Nt && _ && Xu(i), i.flags |= 1, be(e, i, o, h), i.child);
  }
  function fp(e, i, l, o, h) {
    if (e === null) {
      var f = l.type;
      return typeof f == "function" && !Vu(f) && f.defaultProps === void 0 && l.compare === null ? (i.tag = 15, i.type = f, mp(
        e,
        i,
        f,
        o,
        h
      )) : (e = Cr(
        l.type,
        null,
        o,
        i,
        i.mode,
        h
      ), e.ref = i.ref, e.return = i, i.child = e);
    }
    if (f = e.child, !Hc(e, h)) {
      var y = f.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Va, l(y, o) && e.ref === i.ref)
        return Ii(e, i, h);
    }
    return i.flags |= 1, e = Gi(f, o), e.ref = i.ref, e.return = i, i.child = e;
  }
  function mp(e, i, l, o, h) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Va(f, o) && e.ref === i.ref)
        if (ne = !1, i.pendingProps = o = f, Hc(e, h))
          (e.flags & 131072) !== 0 && (ne = !0);
        else
          return i.lanes = e.lanes, Ii(e, i, h);
    }
    return Oc(
      e,
      i,
      l,
      o,
      h
    );
  }
  function pp(e, i, l, o) {
    var h = o.children, f = e !== null ? e.memoizedState : null;
    if (e === null && i.stateNode === null && (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((i.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | l : l, e !== null) {
          for (o = i.child = e.child, h = 0; o !== null; )
            h = h | o.lanes | o.childLanes, o = o.sibling;
          o = h & ~f;
        } else o = 0, i.child = null;
        return vp(
          e,
          i,
          f,
          l,
          o
        );
      }
      if ((l & 536870912) !== 0)
        i.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && zr(
          i,
          f !== null ? f.cachePool : null
        ), f !== null ? bm(i, f) : oc(), ym(i);
      else
        return o = i.lanes = 536870912, vp(
          e,
          i,
          f !== null ? f.baseLanes | l : l,
          l,
          o
        );
    } else
      f !== null ? (zr(i, f.cachePool), bm(i, f), wn(), i.memoizedState = null) : (e !== null && zr(i, null), oc(), wn());
    return be(e, i, h, l), i.child;
  }
  function al(e, i) {
    return e !== null && e.tag === 22 || i.stateNode !== null || (i.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.sibling;
  }
  function vp(e, i, l, o, h) {
    var f = ic();
    return f = f === null ? null : { parent: ee._currentValue, pool: f }, i.memoizedState = {
      baseLanes: l,
      cachePool: f
    }, e !== null && zr(i, null), oc(), ym(i), e !== null && Ks(e, i, o, !0), i.childLanes = h, null;
  }
  function Kr(e, i) {
    return i = Zr(
      { mode: i.mode, children: i.children },
      e.mode
    ), i.ref = e.ref, e.child = i, i.return = e, i;
  }
  function gp(e, i, l) {
    return ns(i, e.child, null, l), e = Kr(i, i.pendingProps), e.flags |= 2, We(i), i.memoizedState = null, e;
  }
  function Wy(e, i, l) {
    var o = i.pendingProps, h = (i.flags & 128) !== 0;
    if (i.flags &= -129, e === null) {
      if (Nt) {
        if (o.mode === "hidden")
          return e = Kr(i, o), i.lanes = 536870912, al(null, e);
        if (cc(i), (e = Yt) ? (e = kv(
          e,
          hi
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (i.memoizedState = {
          dehydrated: e,
          treeContext: fn !== null ? { id: zi, overflow: Ti } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = tm(e), l.return = i, i.child = l, ve = i, Yt = null)) : e = null, e === null) throw pn(i);
        return i.lanes = 536870912, null;
      }
      return Kr(i, o);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var y = f.dehydrated;
      if (cc(i), h)
        if (i.flags & 256)
          i.flags &= -257, i = gp(
            e,
            i,
            l
          );
        else if (i.memoizedState !== null)
          i.child = e.child, i.flags |= 128, i = null;
        else throw Error(a(558));
      else if (ne || Ks(e, i, l, !1), h = (l & e.childLanes) !== 0, ne || h) {
        if (o = Qt, o !== null && (y = ni(o, l), y !== 0 && y !== f.retryLane))
          throw f.retryLane = y, Wn(e, y), qe(o, e, y), Tc;
        no(), i = gp(
          e,
          i,
          l
        );
      } else
        e = f.treeContext, Yt = fi(y.nextSibling), ve = i, Nt = !0, mn = null, hi = !1, e !== null && nm(i, e), i = Kr(i, o), i.flags |= 4096;
      return i;
    }
    return e = Gi(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = i.ref, i.child = e, e.return = i, e;
  }
  function Xr(e, i) {
    var l = i.ref;
    if (l === null)
      e !== null && e.ref !== null && (i.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (i.flags |= 4194816);
    }
  }
  function Oc(e, i, l, o, h) {
    return Pn(i), l = dc(
      e,
      i,
      l,
      o,
      void 0,
      h
    ), o = fc(), e !== null && !ne ? (mc(e, i, h), Ii(e, i, h)) : (Nt && o && Xu(i), i.flags |= 1, be(e, i, l, h), i.child);
  }
  function bp(e, i, l, o, h, f) {
    return Pn(i), i.updateQueue = null, l = wm(
      i,
      o,
      l,
      h
    ), xm(e), o = fc(), e !== null && !ne ? (mc(e, i, f), Ii(e, i, f)) : (Nt && o && Xu(i), i.flags |= 1, be(e, i, l, f), i.child);
  }
  function yp(e, i, l, o, h) {
    if (Pn(i), i.stateNode === null) {
      var f = $s, y = l.contextType;
      typeof y == "object" && y !== null && (f = ge(y)), f = new l(o, f), i.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = kc, i.stateNode = f, f._reactInternals = i, f = i.stateNode, f.props = o, f.state = i.memoizedState, f.refs = {}, sc(i), y = l.contextType, f.context = typeof y == "object" && y !== null ? ge(y) : $s, f.state = i.memoizedState, y = l.getDerivedStateFromProps, typeof y == "function" && (jc(
        i,
        l,
        y,
        o
      ), f.state = i.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (y = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), y !== f.state && kc.enqueueReplaceState(f, f.state, null), tl(i, o, f, h), Pa(), f.state = i.memoizedState), typeof f.componentDidMount == "function" && (i.flags |= 4194308), o = !0;
    } else if (e === null) {
      f = i.stateNode;
      var _ = i.memoizedProps, E = as(l, _);
      f.props = E;
      var U = f.context, Y = l.contextType;
      y = $s, typeof Y == "object" && Y !== null && (y = ge(Y));
      var K = l.getDerivedStateFromProps;
      Y = typeof K == "function" || typeof f.getSnapshotBeforeUpdate == "function", _ = i.pendingProps !== _, Y || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (_ || U !== y) && ap(
        i,
        f,
        o,
        y
      ), gn = !1;
      var H = i.memoizedState;
      f.state = H, tl(i, o, f, h), Pa(), U = i.memoizedState, _ || H !== U || gn ? (typeof K == "function" && (jc(
        i,
        l,
        K,
        o
      ), U = i.memoizedState), (E = gn || sp(
        i,
        l,
        E,
        o,
        H,
        U,
        y
      )) ? (Y || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (i.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (i.flags |= 4194308), i.memoizedProps = o, i.memoizedState = U), f.props = o, f.state = U, f.context = y, o = E) : (typeof f.componentDidMount == "function" && (i.flags |= 4194308), o = !1);
    } else {
      f = i.stateNode, ac(e, i), y = i.memoizedProps, Y = as(l, y), f.props = Y, K = i.pendingProps, H = f.context, U = l.contextType, E = $s, typeof U == "object" && U !== null && (E = ge(U)), _ = l.getDerivedStateFromProps, (U = typeof _ == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== K || H !== E) && ap(
        i,
        f,
        o,
        E
      ), gn = !1, H = i.memoizedState, f.state = H, tl(i, o, f, h), Pa();
      var q = i.memoizedState;
      y !== K || H !== q || gn || e !== null && e.dependencies !== null && jr(e.dependencies) ? (typeof _ == "function" && (jc(
        i,
        l,
        _,
        o
      ), q = i.memoizedState), (Y = gn || sp(
        i,
        l,
        Y,
        o,
        H,
        q,
        E
      ) || e !== null && e.dependencies !== null && jr(e.dependencies)) ? (U || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(o, q, E), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        o,
        q,
        E
      )), typeof f.componentDidUpdate == "function" && (i.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (i.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (i.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (i.flags |= 1024), i.memoizedProps = o, i.memoizedState = q), f.props = o, f.state = q, f.context = E, o = Y) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (i.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && H === e.memoizedState || (i.flags |= 1024), o = !1);
    }
    return f = o, Xr(e, i), o = (i.flags & 128) !== 0, f || o ? (f = i.stateNode, l = o && typeof l.getDerivedStateFromError != "function" ? null : f.render(), i.flags |= 1, e !== null && o ? (i.child = ns(
      i,
      e.child,
      null,
      h
    ), i.child = ns(
      i,
      null,
      l,
      h
    )) : be(e, i, l, h), i.memoizedState = f.state, e = i.child) : e = Ii(
      e,
      i,
      h
    ), e;
  }
  function xp(e, i, l, o) {
    return In(), i.flags |= 256, be(e, i, l, o), i.child;
  }
  var Dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ac(e) {
    return { baseLanes: e, cachePool: um() };
  }
  function Rc(e, i, l) {
    return e = e !== null ? e.childLanes & ~l : 0, i && (e |= Ie), e;
  }
  function wp(e, i, l) {
    var o = i.pendingProps, h = !1, f = (i.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (Ft.current & 2) !== 0), y && (h = !0, i.flags &= -129), y = (i.flags & 32) !== 0, i.flags &= -33, e === null) {
      if (Nt) {
        if (h ? xn(i) : wn(), (e = Yt) ? (e = kv(
          e,
          hi
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (i.memoizedState = {
          dehydrated: e,
          treeContext: fn !== null ? { id: zi, overflow: Ti } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = tm(e), l.return = i, i.child = l, ve = i, Yt = null)) : e = null, e === null) throw pn(i);
        return gh(e) ? i.lanes = 32 : i.lanes = 536870912, null;
      }
      var _ = o.children;
      return o = o.fallback, h ? (wn(), h = i.mode, _ = Zr(
        { mode: "hidden", children: _ },
        h
      ), o = Jn(
        o,
        h,
        l,
        null
      ), _.return = i, o.return = i, _.sibling = o, i.child = _, o = i.child, o.memoizedState = Ac(l), o.childLanes = Rc(
        e,
        y,
        l
      ), i.memoizedState = Dc, al(null, o)) : (xn(i), Lc(i, _));
    }
    var E = e.memoizedState;
    if (E !== null && (_ = E.dehydrated, _ !== null)) {
      if (f)
        i.flags & 256 ? (xn(i), i.flags &= -257, i = Bc(
          e,
          i,
          l
        )) : i.memoizedState !== null ? (wn(), i.child = e.child, i.flags |= 128, i = null) : (wn(), _ = o.fallback, h = i.mode, o = Zr(
          { mode: "visible", children: o.children },
          h
        ), _ = Jn(
          _,
          h,
          l,
          null
        ), _.flags |= 2, o.return = i, _.return = i, o.sibling = _, i.child = o, ns(
          i,
          e.child,
          null,
          l
        ), o = i.child, o.memoizedState = Ac(l), o.childLanes = Rc(
          e,
          y,
          l
        ), i.memoizedState = Dc, i = al(null, o));
      else if (xn(i), gh(_)) {
        if (y = _.nextSibling && _.nextSibling.dataset, y) var U = y.dgst;
        y = U, o = Error(a(419)), o.stack = "", o.digest = y, Xa({ value: o, source: null, stack: null }), i = Bc(
          e,
          i,
          l
        );
      } else if (ne || Ks(e, i, l, !1), y = (l & e.childLanes) !== 0, ne || y) {
        if (y = Qt, y !== null && (o = ni(y, l), o !== 0 && o !== E.retryLane))
          throw E.retryLane = o, Wn(e, o), qe(y, e, o), Tc;
        vh(_) || no(), i = Bc(
          e,
          i,
          l
        );
      } else
        vh(_) ? (i.flags |= 192, i.child = e.child, i = null) : (e = E.treeContext, Yt = fi(
          _.nextSibling
        ), ve = i, Nt = !0, mn = null, hi = !1, e !== null && nm(i, e), i = Lc(
          i,
          o.children
        ), i.flags |= 4096);
      return i;
    }
    return h ? (wn(), _ = o.fallback, h = i.mode, E = e.child, U = E.sibling, o = Gi(E, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = E.subtreeFlags & 65011712, U !== null ? _ = Gi(
      U,
      _
    ) : (_ = Jn(
      _,
      h,
      l,
      null
    ), _.flags |= 2), _.return = i, o.return = i, o.sibling = _, i.child = o, al(null, o), o = i.child, _ = e.child.memoizedState, _ === null ? _ = Ac(l) : (h = _.cachePool, h !== null ? (E = ee._currentValue, h = h.parent !== E ? { parent: E, pool: E } : h) : h = um(), _ = {
      baseLanes: _.baseLanes | l,
      cachePool: h
    }), o.memoizedState = _, o.childLanes = Rc(
      e,
      y,
      l
    ), i.memoizedState = Dc, al(e.child, o)) : (xn(i), l = e.child, e = l.sibling, l = Gi(l, {
      mode: "visible",
      children: o.children
    }), l.return = i, l.sibling = null, e !== null && (y = i.deletions, y === null ? (i.deletions = [e], i.flags |= 16) : y.push(e)), i.child = l, i.memoizedState = null, l);
  }
  function Lc(e, i) {
    return i = Zr(
      { mode: "visible", children: i },
      e.mode
    ), i.return = e, e.child = i;
  }
  function Zr(e, i) {
    return e = Xe(22, e, null, i), e.lanes = 0, e;
  }
  function Bc(e, i, l) {
    return ns(i, e.child, null, l), e = Lc(
      i,
      i.pendingProps.children
    ), e.flags |= 2, i.memoizedState = null, e;
  }
  function _p(e, i, l) {
    e.lanes |= i;
    var o = e.alternate;
    o !== null && (o.lanes |= i), Fu(e.return, i, l);
  }
  function Uc(e, i, l, o, h, f) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: i,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: l,
      tailMode: h,
      treeForkCount: f
    } : (y.isBackwards = i, y.rendering = null, y.renderingStartTime = 0, y.last = o, y.tail = l, y.tailMode = h, y.treeForkCount = f);
  }
  function Sp(e, i, l) {
    var o = i.pendingProps, h = o.revealOrder, f = o.tail;
    o = o.children;
    var y = Ft.current, _ = (y & 2) !== 0;
    if (_ ? (y = y & 1 | 2, i.flags |= 128) : y &= 1, J(Ft, y), be(e, i, o, l), o = Nt ? Ka : 0, !_ && e !== null && (e.flags & 128) !== 0)
      t: for (e = i.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && _p(e, l, i);
        else if (e.tag === 19)
          _p(e, l, i);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === i) break t;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === i)
            break t;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (h) {
      case "forwards":
        for (l = i.child, h = null; l !== null; )
          e = l.alternate, e !== null && Lr(e) === null && (h = l), l = l.sibling;
        l = h, l === null ? (h = i.child, i.child = null) : (h = l.sibling, l.sibling = null), Uc(
          i,
          !1,
          h,
          l,
          f,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, h = i.child, i.child = null; h !== null; ) {
          if (e = h.alternate, e !== null && Lr(e) === null) {
            i.child = h;
            break;
          }
          e = h.sibling, h.sibling = l, l = h, h = e;
        }
        Uc(
          i,
          !0,
          l,
          null,
          f,
          o
        );
        break;
      case "together":
        Uc(
          i,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        i.memoizedState = null;
    }
    return i.child;
  }
  function Ii(e, i, l) {
    if (e !== null && (i.dependencies = e.dependencies), Mn |= i.lanes, (l & i.childLanes) === 0)
      if (e !== null) {
        if (Ks(
          e,
          i,
          l,
          !1
        ), (l & i.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && i.child !== e.child)
      throw Error(a(153));
    if (i.child !== null) {
      for (e = i.child, l = Gi(e, e.pendingProps), i.child = l, l.return = i; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Gi(e, e.pendingProps), l.return = i;
      l.sibling = null;
    }
    return i.child;
  }
  function Hc(e, i) {
    return (e.lanes & i) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && jr(e)));
  }
  function Jy(e, i, l) {
    switch (i.tag) {
      case 3:
        Gt(i, i.stateNode.containerInfo), vn(i, ee, e.memoizedState.cache), In();
        break;
      case 27:
      case 5:
        Ct(i);
        break;
      case 4:
        Gt(i, i.stateNode.containerInfo);
        break;
      case 10:
        vn(
          i,
          i.type,
          i.memoizedProps.value
        );
        break;
      case 31:
        if (i.memoizedState !== null)
          return i.flags |= 128, cc(i), null;
        break;
      case 13:
        var o = i.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (xn(i), i.flags |= 128, null) : (l & i.child.childLanes) !== 0 ? wp(e, i, l) : (xn(i), e = Ii(
            e,
            i,
            l
          ), e !== null ? e.sibling : null);
        xn(i);
        break;
      case 19:
        var h = (e.flags & 128) !== 0;
        if (o = (l & i.childLanes) !== 0, o || (Ks(
          e,
          i,
          l,
          !1
        ), o = (l & i.childLanes) !== 0), h) {
          if (o)
            return Sp(
              e,
              i,
              l
            );
          i.flags |= 128;
        }
        if (h = i.memoizedState, h !== null && (h.rendering = null, h.tail = null, h.lastEffect = null), J(Ft, Ft.current), o) break;
        return null;
      case 22:
        return i.lanes = 0, pp(
          e,
          i,
          l,
          i.pendingProps
        );
      case 24:
        vn(i, ee, e.memoizedState.cache);
    }
    return Ii(e, i, l);
  }
  function Mp(e, i, l) {
    if (e !== null)
      if (e.memoizedProps !== i.pendingProps)
        ne = !0;
      else {
        if (!Hc(e, l) && (i.flags & 128) === 0)
          return ne = !1, Jy(
            e,
            i,
            l
          );
        ne = (e.flags & 131072) !== 0;
      }
    else
      ne = !1, Nt && (i.flags & 1048576) !== 0 && im(i, Ka, i.index);
    switch (i.lanes = 0, i.tag) {
      case 16:
        t: {
          var o = i.pendingProps;
          if (e = es(i.elementType), i.type = e, typeof e == "function")
            Vu(e) ? (o = as(e, o), i.tag = 1, i = yp(
              null,
              i,
              e,
              o,
              l
            )) : (i.tag = 0, i = Oc(
              null,
              i,
              e,
              o,
              l
            ));
          else {
            if (e != null) {
              var h = e.$$typeof;
              if (h === D) {
                i.tag = 11, i = dp(
                  null,
                  i,
                  e,
                  o,
                  l
                );
                break t;
              } else if (h === A) {
                i.tag = 14, i = fp(
                  null,
                  i,
                  e,
                  o,
                  l
                );
                break t;
              }
            }
            throw i = bt(e) || e, Error(a(306, i, ""));
          }
        }
        return i;
      case 0:
        return Oc(
          e,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 1:
        return o = i.type, h = as(
          o,
          i.pendingProps
        ), yp(
          e,
          i,
          o,
          h,
          l
        );
      case 3:
        t: {
          if (Gt(
            i,
            i.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          o = i.pendingProps;
          var f = i.memoizedState;
          h = f.element, ac(e, i), tl(i, o, null, l);
          var y = i.memoizedState;
          if (o = y.cache, vn(i, ee, o), o !== f.cache && Pu(
            i,
            [ee],
            l,
            !0
          ), Pa(), o = y.element, f.isDehydrated)
            if (f = {
              element: o,
              isDehydrated: !1,
              cache: y.cache
            }, i.updateQueue.baseState = f, i.memoizedState = f, i.flags & 256) {
              i = xp(
                e,
                i,
                o,
                l
              );
              break t;
            } else if (o !== h) {
              h = oi(
                Error(a(424)),
                i
              ), Xa(h), i = xp(
                e,
                i,
                o,
                l
              );
              break t;
            } else
              for (e = i.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Yt = fi(e.firstChild), ve = i, Nt = !0, mn = null, hi = !0, l = pm(
                i,
                null,
                o,
                l
              ), i.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (In(), o === h) {
              i = Ii(
                e,
                i,
                l
              );
              break t;
            }
            be(e, i, o, l);
          }
          i = i.child;
        }
        return i;
      case 26:
        return Xr(e, i), e === null ? (l = Rv(
          i.type,
          null,
          i.pendingProps,
          null
        )) ? i.memoizedState = l : Nt || (l = i.type, e = i.pendingProps, o = co(
          ct.current
        ).createElement(l), o[pe] = i, o[Ae] = e, ye(o, l, e), ce(o), i.stateNode = o) : i.memoizedState = Rv(
          i.type,
          e.memoizedProps,
          i.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ct(i), e === null && Nt && (o = i.stateNode = Ov(
          i.type,
          i.pendingProps,
          ct.current
        ), ve = i, hi = !0, h = Yt, kn(i.type) ? (bh = h, Yt = fi(o.firstChild)) : Yt = h), be(
          e,
          i,
          i.pendingProps.children,
          l
        ), Xr(e, i), e === null && (i.flags |= 4194304), i.child;
      case 5:
        return e === null && Nt && ((h = o = Yt) && (o = Cx(
          o,
          i.type,
          i.pendingProps,
          hi
        ), o !== null ? (i.stateNode = o, ve = i, Yt = fi(o.firstChild), hi = !1, h = !0) : h = !1), h || pn(i)), Ct(i), h = i.type, f = i.pendingProps, y = e !== null ? e.memoizedProps : null, o = f.children, fh(h, f) ? o = null : y !== null && fh(h, y) && (i.flags |= 32), i.memoizedState !== null && (h = dc(
          e,
          i,
          Qy,
          null,
          null,
          l
        ), xl._currentValue = h), Xr(e, i), be(e, i, o, l), i.child;
      case 6:
        return e === null && Nt && ((e = l = Yt) && (l = Ex(
          l,
          i.pendingProps,
          hi
        ), l !== null ? (i.stateNode = l, ve = i, Yt = null, e = !0) : e = !1), e || pn(i)), null;
      case 13:
        return wp(e, i, l);
      case 4:
        return Gt(
          i,
          i.stateNode.containerInfo
        ), o = i.pendingProps, e === null ? i.child = ns(
          i,
          null,
          o,
          l
        ) : be(e, i, o, l), i.child;
      case 11:
        return dp(
          e,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 7:
        return be(
          e,
          i,
          i.pendingProps,
          l
        ), i.child;
      case 8:
        return be(
          e,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 12:
        return be(
          e,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 10:
        return o = i.pendingProps, vn(i, i.type, o.value), be(e, i, o.children, l), i.child;
      case 9:
        return h = i.type._context, o = i.pendingProps.children, Pn(i), h = ge(h), o = o(h), i.flags |= 1, be(e, i, o, l), i.child;
      case 14:
        return fp(
          e,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 15:
        return mp(
          e,
          i,
          i.type,
          i.pendingProps,
          l
        );
      case 19:
        return Sp(e, i, l);
      case 31:
        return Wy(e, i, l);
      case 22:
        return pp(
          e,
          i,
          l,
          i.pendingProps
        );
      case 24:
        return Pn(i), o = ge(ee), e === null ? (h = ic(), h === null && (h = Qt, f = tc(), h.pooledCache = f, f.refCount++, f !== null && (h.pooledCacheLanes |= l), h = f), i.memoizedState = { parent: o, cache: h }, sc(i), vn(i, ee, h)) : ((e.lanes & l) !== 0 && (ac(e, i), tl(i, null, null, l), Pa()), h = e.memoizedState, f = i.memoizedState, h.parent !== o ? (h = { parent: o, cache: o }, i.memoizedState = h, i.lanes === 0 && (i.memoizedState = i.updateQueue.baseState = h), vn(i, ee, o)) : (o = f.cache, vn(i, ee, o), o !== h.cache && Pu(
          i,
          [ee],
          l,
          !0
        ))), be(
          e,
          i,
          i.pendingProps.children,
          l
        ), i.child;
      case 29:
        throw i.pendingProps;
    }
    throw Error(a(156, i.tag));
  }
  function Fi(e) {
    e.flags |= 4;
  }
  function qc(e, i, l, o, h) {
    if ((i = (e.mode & 32) !== 0) && (i = !1), i) {
      if (e.flags |= 16777216, (h & 335544128) === h)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ip()) e.flags |= 8192;
        else
          throw is = Or, nc;
    } else e.flags &= -16777217;
  }
  function Np(e, i) {
    if (i.type !== "stylesheet" || (i.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !qv(i))
      if (Ip()) e.flags |= 8192;
      else
        throw is = Or, nc;
  }
  function Wr(e, i) {
    i !== null && (e.flags |= 4), e.flags & 16384 && (i = e.tag !== 22 ? Me() : 536870912, e.lanes |= i, sa |= i);
  }
  function ll(e, i) {
    if (!Nt)
      switch (e.tailMode) {
        case "hidden":
          i = e.tail;
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var o = null; l !== null; )
            l.alternate !== null && (o = l), l = l.sibling;
          o === null ? i || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Vt(e) {
    var i = e.alternate !== null && e.alternate.child === e.child, l = 0, o = 0;
    if (i)
      for (var h = e.child; h !== null; )
        l |= h.lanes | h.childLanes, o |= h.subtreeFlags & 65011712, o |= h.flags & 65011712, h.return = e, h = h.sibling;
    else
      for (h = e.child; h !== null; )
        l |= h.lanes | h.childLanes, o |= h.subtreeFlags, o |= h.flags, h.return = e, h = h.sibling;
    return e.subtreeFlags |= o, e.childLanes = l, i;
  }
  function Iy(e, i, l) {
    var o = i.pendingProps;
    switch (Zu(i), i.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Vt(i), null;
      case 1:
        return Vt(i), null;
      case 3:
        return l = i.stateNode, o = null, e !== null && (o = e.memoizedState.cache), i.memoizedState.cache !== o && (i.flags |= 2048), Zi(ee), Tt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Gs(i) ? Fi(i) : e === null || e.memoizedState.isDehydrated && (i.flags & 256) === 0 || (i.flags |= 1024, Ju())), Vt(i), null;
      case 26:
        var h = i.type, f = i.memoizedState;
        return e === null ? (Fi(i), f !== null ? (Vt(i), Np(i, f)) : (Vt(i), qc(
          i,
          h,
          null,
          o,
          l
        ))) : f ? f !== e.memoizedState ? (Fi(i), Vt(i), Np(i, f)) : (Vt(i), i.flags &= -16777217) : (e = e.memoizedProps, e !== o && Fi(i), Vt(i), qc(
          i,
          h,
          e,
          o,
          l
        )), null;
      case 27:
        if (Ci(i), l = ct.current, h = i.type, e !== null && i.stateNode != null)
          e.memoizedProps !== o && Fi(i);
        else {
          if (!o) {
            if (i.stateNode === null)
              throw Error(a(166));
            return Vt(i), null;
          }
          e = tt.current, Gs(i) ? sm(i) : (e = Ov(h, o, l), i.stateNode = e, Fi(i));
        }
        return Vt(i), null;
      case 5:
        if (Ci(i), h = i.type, e !== null && i.stateNode != null)
          e.memoizedProps !== o && Fi(i);
        else {
          if (!o) {
            if (i.stateNode === null)
              throw Error(a(166));
            return Vt(i), null;
          }
          if (f = tt.current, Gs(i))
            sm(i);
          else {
            var y = co(
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
            f[pe] = i, f[Ae] = o;
            t: for (y = i.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                f.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                y.child.return = y, y = y.child;
                continue;
              }
              if (y === i) break t;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === i)
                  break t;
                y = y.return;
              }
              y.sibling.return = y.return, y = y.sibling;
            }
            i.stateNode = f;
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
            o && Fi(i);
          }
        }
        return Vt(i), qc(
          i,
          i.type,
          e === null ? null : e.memoizedProps,
          i.pendingProps,
          l
        ), null;
      case 6:
        if (e && i.stateNode != null)
          e.memoizedProps !== o && Fi(i);
        else {
          if (typeof o != "string" && i.stateNode === null)
            throw Error(a(166));
          if (e = ct.current, Gs(i)) {
            if (e = i.stateNode, l = i.memoizedProps, o = null, h = ve, h !== null)
              switch (h.tag) {
                case 27:
                case 5:
                  o = h.memoizedProps;
              }
            e[pe] = i, e = !!(e.nodeValue === l || o !== null && o.suppressHydrationWarning === !0 || wv(e.nodeValue, l)), e || pn(i, !0);
          } else
            e = co(e).createTextNode(
              o
            ), e[pe] = i, i.stateNode = e;
        }
        return Vt(i), null;
      case 31:
        if (l = i.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Gs(i), l !== null) {
            if (e === null) {
              if (!o) throw Error(a(318));
              if (e = i.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[pe] = i;
            } else
              In(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Vt(i), e = !1;
          } else
            l = Ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return i.flags & 256 ? (We(i), i) : (We(i), null);
          if ((i.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Vt(i), null;
      case 13:
        if (o = i.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (h = Gs(i), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!h) throw Error(a(318));
              if (h = i.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(a(317));
              h[pe] = i;
            } else
              In(), (i.flags & 128) === 0 && (i.memoizedState = null), i.flags |= 4;
            Vt(i), h = !1;
          } else
            h = Ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = h), h = !0;
          if (!h)
            return i.flags & 256 ? (We(i), i) : (We(i), null);
        }
        return We(i), (i.flags & 128) !== 0 ? (i.lanes = l, i) : (l = o !== null, e = e !== null && e.memoizedState !== null, l && (o = i.child, h = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (h = o.alternate.memoizedState.cachePool.pool), f = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (f = o.memoizedState.cachePool.pool), f !== h && (o.flags |= 2048)), l !== e && l && (i.child.flags |= 8192), Wr(i, i.updateQueue), Vt(i), null);
      case 4:
        return Tt(), e === null && oh(i.stateNode.containerInfo), Vt(i), null;
      case 10:
        return Zi(i.type), Vt(i), null;
      case 19:
        if (Q(Ft), o = i.memoizedState, o === null) return Vt(i), null;
        if (h = (i.flags & 128) !== 0, f = o.rendering, f === null)
          if (h) ll(o, !1);
          else {
            if (Wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = i.child; e !== null; ) {
                if (f = Lr(e), f !== null) {
                  for (i.flags |= 128, ll(o, !1), e = f.updateQueue, i.updateQueue = e, Wr(i, e), i.subtreeFlags = 0, e = l, l = i.child; l !== null; )
                    Pf(l, e), l = l.sibling;
                  return J(
                    Ft,
                    Ft.current & 1 | 2
                  ), Nt && Ki(i, o.treeForkCount), i.child;
                }
                e = e.sibling;
              }
            o.tail !== null && _e() > to && (i.flags |= 128, h = !0, ll(o, !1), i.lanes = 4194304);
          }
        else {
          if (!h)
            if (e = Lr(f), e !== null) {
              if (i.flags |= 128, h = !0, e = e.updateQueue, i.updateQueue = e, Wr(i, e), ll(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !Nt)
                return Vt(i), null;
            } else
              2 * _e() - o.renderingStartTime > to && l !== 536870912 && (i.flags |= 128, h = !0, ll(o, !1), i.lanes = 4194304);
          o.isBackwards ? (f.sibling = i.child, i.child = f) : (e = o.last, e !== null ? e.sibling = f : i.child = f, o.last = f);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = _e(), e.sibling = null, l = Ft.current, J(
          Ft,
          h ? l & 1 | 2 : l & 1
        ), Nt && Ki(i, o.treeForkCount), e) : (Vt(i), null);
      case 22:
      case 23:
        return We(i), uc(), o = i.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (i.flags |= 8192) : o && (i.flags |= 8192), o ? (l & 536870912) !== 0 && (i.flags & 128) === 0 && (Vt(i), i.subtreeFlags & 6 && (i.flags |= 8192)) : Vt(i), l = i.updateQueue, l !== null && Wr(i, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), o = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (o = i.memoizedState.cachePool.pool), o !== l && (i.flags |= 2048), e !== null && Q(ts), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), i.memoizedState.cache !== l && (i.flags |= 2048), Zi(ee), Vt(i), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, i.tag));
  }
  function Fy(e, i) {
    switch (Zu(i), i.tag) {
      case 1:
        return e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
      case 3:
        return Zi(ee), Tt(), e = i.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (i.flags = e & -65537 | 128, i) : null;
      case 26:
      case 27:
      case 5:
        return Ci(i), null;
      case 31:
        if (i.memoizedState !== null) {
          if (We(i), i.alternate === null)
            throw Error(a(340));
          In();
        }
        return e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
      case 13:
        if (We(i), e = i.memoizedState, e !== null && e.dehydrated !== null) {
          if (i.alternate === null)
            throw Error(a(340));
          In();
        }
        return e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
      case 19:
        return Q(Ft), null;
      case 4:
        return Tt(), null;
      case 10:
        return Zi(i.type), null;
      case 22:
      case 23:
        return We(i), uc(), e !== null && Q(ts), e = i.flags, e & 65536 ? (i.flags = e & -65537 | 128, i) : null;
      case 24:
        return Zi(ee), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Cp(e, i) {
    switch (Zu(i), i.tag) {
      case 3:
        Zi(ee), Tt();
        break;
      case 26:
      case 27:
      case 5:
        Ci(i);
        break;
      case 4:
        Tt();
        break;
      case 31:
        i.memoizedState !== null && We(i);
        break;
      case 13:
        We(i);
        break;
      case 19:
        Q(Ft);
        break;
      case 10:
        Zi(i.type);
        break;
      case 22:
      case 23:
        We(i), uc(), e !== null && Q(ts);
        break;
      case 24:
        Zi(ee);
    }
  }
  function rl(e, i) {
    try {
      var l = i.updateQueue, o = l !== null ? l.lastEffect : null;
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
      Rt(i, i.return, _);
    }
  }
  function _n(e, i, l) {
    try {
      var o = i.updateQueue, h = o !== null ? o.lastEffect : null;
      if (h !== null) {
        var f = h.next;
        o = f;
        do {
          if ((o.tag & e) === e) {
            var y = o.inst, _ = y.destroy;
            if (_ !== void 0) {
              y.destroy = void 0, h = i;
              var E = l, U = _;
              try {
                U();
              } catch (Y) {
                Rt(
                  h,
                  E,
                  Y
                );
              }
            }
          }
          o = o.next;
        } while (o !== f);
      }
    } catch (Y) {
      Rt(i, i.return, Y);
    }
  }
  function Ep(e) {
    var i = e.updateQueue;
    if (i !== null) {
      var l = e.stateNode;
      try {
        gm(i, l);
      } catch (o) {
        Rt(e, e.return, o);
      }
    }
  }
  function jp(e, i, l) {
    l.props = as(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (o) {
      Rt(e, i, o);
    }
  }
  function ol(e, i) {
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
      Rt(e, i, h);
    }
  }
  function Oi(e, i) {
    var l = e.ref, o = e.refCleanup;
    if (l !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (h) {
          Rt(e, i, h);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (h) {
          Rt(e, i, h);
        }
      else l.current = null;
  }
  function kp(e) {
    var i = e.type, l = e.memoizedProps, o = e.stateNode;
    try {
      t: switch (i) {
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
      Rt(e, e.return, h);
    }
  }
  function Qc(e, i, l) {
    try {
      var o = e.stateNode;
      xx(o, e.type, l, i), o[Ae] = i;
    } catch (h) {
      Rt(e, e.return, h);
    }
  }
  function zp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && kn(e.type) || e.tag === 4;
  }
  function $c(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || zp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && kn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Yc(e, i, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, i ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, i) : (i = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, i.appendChild(e), l = l._reactRootContainer, l != null || i.onclick !== null || (i.onclick = Yi));
    else if (o !== 4 && (o === 27 && kn(e.type) && (l = e.stateNode, i = null), e = e.child, e !== null))
      for (Yc(e, i, l), e = e.sibling; e !== null; )
        Yc(e, i, l), e = e.sibling;
  }
  function Jr(e, i, l) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, i ? l.insertBefore(e, i) : l.appendChild(e);
    else if (o !== 4 && (o === 27 && kn(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Jr(e, i, l), e = e.sibling; e !== null; )
        Jr(e, i, l), e = e.sibling;
  }
  function Tp(e) {
    var i = e.stateNode, l = e.memoizedProps;
    try {
      for (var o = e.type, h = i.attributes; h.length; )
        i.removeAttributeNode(h[0]);
      ye(i, o, l), i[pe] = e, i[Ae] = l;
    } catch (f) {
      Rt(e, e.return, f);
    }
  }
  var Pi = !1, se = !1, Vc = !1, Op = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function Py(e, i) {
    if (e = e.containerInfo, hh = bo, e = Vf(e), Bu(e)) {
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
            var y = 0, _ = -1, E = -1, U = 0, Y = 0, K = e, H = null;
            e: for (; ; ) {
              for (var q; K !== l || h !== 0 && K.nodeType !== 3 || (_ = y + h), K !== f || o !== 0 && K.nodeType !== 3 || (E = y + o), K.nodeType === 3 && (y += K.nodeValue.length), (q = K.firstChild) !== null; )
                H = K, K = q;
              for (; ; ) {
                if (K === e) break e;
                if (H === l && ++U === h && (_ = y), H === f && ++Y === o && (E = y), (q = K.nextSibling) !== null) break;
                K = H, H = K.parentNode;
              }
              K = q;
            }
            l = _ === -1 || E === -1 ? null : { start: _, end: E };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (dh = { focusedElem: e, selectionRange: l }, bo = !1, he = i; he !== null; )
      if (i = he, e = i.child, (i.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = i, he = e;
      else
        for (; he !== null; ) {
          switch (i = he, f = i.alternate, e = i.flags, i.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = i.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  h = e[l], h.ref.impl = h.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, l = i, h = f.memoizedProps, f = f.memoizedState, o = l.stateNode;
                try {
                  var at = as(
                    l.type,
                    h
                  );
                  e = o.getSnapshotBeforeUpdate(
                    at,
                    f
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ut) {
                  Rt(
                    l,
                    l.return,
                    ut
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = i.stateNode.containerInfo, l = e.nodeType, l === 9)
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
          if (e = i.sibling, e !== null) {
            e.return = i.return, he = e;
            break;
          }
          he = i.return;
        }
  }
  function Dp(e, i, l) {
    var o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        en(e, l), o & 4 && rl(5, l);
        break;
      case 1:
        if (en(e, l), o & 4)
          if (e = l.stateNode, i === null)
            try {
              e.componentDidMount();
            } catch (y) {
              Rt(l, l.return, y);
            }
          else {
            var h = as(
              l.type,
              i.memoizedProps
            );
            i = i.memoizedState;
            try {
              e.componentDidUpdate(
                h,
                i,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Rt(
                l,
                l.return,
                y
              );
            }
          }
        o & 64 && Ep(l), o & 512 && ol(l, l.return);
        break;
      case 3:
        if (en(e, l), o & 64 && (e = l.updateQueue, e !== null)) {
          if (i = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                i = l.child.stateNode;
                break;
              case 1:
                i = l.child.stateNode;
            }
          try {
            gm(e, i);
          } catch (y) {
            Rt(l, l.return, y);
          }
        }
        break;
      case 27:
        i === null && o & 4 && Tp(l);
      case 26:
      case 5:
        en(e, l), i === null && o & 4 && kp(l), o & 512 && ol(l, l.return);
        break;
      case 12:
        en(e, l);
        break;
      case 31:
        en(e, l), o & 4 && Lp(e, l);
        break;
      case 13:
        en(e, l), o & 4 && Bp(e, l), o & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = ox.bind(
          null,
          l
        ), jx(e, l))));
        break;
      case 22:
        if (o = l.memoizedState !== null || Pi, !o) {
          i = i !== null && i.memoizedState !== null || se, h = Pi;
          var f = se;
          Pi = o, (se = i) && !f ? nn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : en(e, l), Pi = h, se = f;
        }
        break;
      case 30:
        break;
      default:
        en(e, l);
    }
  }
  function Ap(e) {
    var i = e.alternate;
    i !== null && (e.alternate = null, Ap(i)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (i = e.stateNode, i !== null && xu(i)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Kt = null, Le = !1;
  function tn(e, i, l) {
    for (l = l.child; l !== null; )
      Rp(e, i, l), l = l.sibling;
  }
  function Rp(e, i, l) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function")
      try {
        Ce.onCommitFiberUnmount(Vn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        se || Oi(l, i), tn(
          e,
          i,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        se || Oi(l, i);
        var o = Kt, h = Le;
        kn(l.type) && (Kt = l.stateNode, Le = !1), tn(
          e,
          i,
          l
        ), gl(l.stateNode), Kt = o, Le = h;
        break;
      case 5:
        se || Oi(l, i);
      case 6:
        if (o = Kt, h = Le, Kt = null, tn(
          e,
          i,
          l
        ), Kt = o, Le = h, Kt !== null)
          if (Le)
            try {
              (Kt.nodeType === 9 ? Kt.body : Kt.nodeName === "HTML" ? Kt.ownerDocument.body : Kt).removeChild(l.stateNode);
            } catch (f) {
              Rt(
                l,
                i,
                f
              );
            }
          else
            try {
              Kt.removeChild(l.stateNode);
            } catch (f) {
              Rt(
                l,
                i,
                f
              );
            }
        break;
      case 18:
        Kt !== null && (Le ? (e = Kt, Ev(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), da(e)) : Ev(Kt, l.stateNode));
        break;
      case 4:
        o = Kt, h = Le, Kt = l.stateNode.containerInfo, Le = !0, tn(
          e,
          i,
          l
        ), Kt = o, Le = h;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        _n(2, l, i), se || _n(4, l, i), tn(
          e,
          i,
          l
        );
        break;
      case 1:
        se || (Oi(l, i), o = l.stateNode, typeof o.componentWillUnmount == "function" && jp(
          l,
          i,
          o
        )), tn(
          e,
          i,
          l
        );
        break;
      case 21:
        tn(
          e,
          i,
          l
        );
        break;
      case 22:
        se = (o = se) || l.memoizedState !== null, tn(
          e,
          i,
          l
        ), se = o;
        break;
      default:
        tn(
          e,
          i,
          l
        );
    }
  }
  function Lp(e, i) {
    if (i.memoizedState === null && (e = i.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        da(e);
      } catch (l) {
        Rt(i, i.return, l);
      }
    }
  }
  function Bp(e, i) {
    if (i.memoizedState === null && (e = i.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        da(e);
      } catch (l) {
        Rt(i, i.return, l);
      }
  }
  function tx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var i = e.stateNode;
        return i === null && (i = e.stateNode = new Op()), i;
      case 22:
        return e = e.stateNode, i = e._retryCache, i === null && (i = e._retryCache = new Op()), i;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function Ir(e, i) {
    var l = tx(e);
    i.forEach(function(o) {
      if (!l.has(o)) {
        l.add(o);
        var h = ux.bind(null, e, o);
        o.then(h, h);
      }
    });
  }
  function Be(e, i) {
    var l = i.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var h = l[o], f = e, y = i, _ = y;
        t: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (kn(_.type)) {
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
        Rp(f, y, h), Kt = null, Le = !1, f = h.alternate, f !== null && (f.return = null), h.return = null;
      }
    if (i.subtreeFlags & 13886)
      for (i = i.child; i !== null; )
        Up(i, e), i = i.sibling;
  }
  var wi = null;
  function Up(e, i) {
    var l = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Be(i, e), Ue(e), o & 4 && (_n(3, e, e.return), rl(3, e), _n(5, e, e.return));
        break;
      case 1:
        Be(i, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 64 && Pi && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? o : l.concat(o))));
        break;
      case 26:
        var h = wi;
        if (Be(i, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), o & 4) {
          var f = l !== null ? l.memoizedState : null;
          if (o = e.memoizedState, l === null)
            if (o === null)
              if (e.stateNode === null) {
                t: {
                  o = e.type, l = e.memoizedProps, h = h.ownerDocument || h;
                  e: switch (o) {
                    case "title":
                      f = h.getElementsByTagName("title")[0], (!f || f[Ra] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = h.createElement(o), h.head.insertBefore(
                        f,
                        h.querySelector("head > title")
                      )), ye(f, o, l), f[pe] = e, ce(f), o = f;
                      break t;
                    case "link":
                      var y = Uv(
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
                      if (y = Uv(
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
                Hv(
                  h,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Bv(
                h,
                o,
                e.memoizedProps
              );
          else
            f !== o ? (f === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : f.count--, o === null ? Hv(
              h,
              e.type,
              e.stateNode
            ) : Bv(
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
        Be(i, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), l !== null && o & 4 && Qc(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Be(i, e), Ue(e), o & 512 && (se || l === null || Oi(l, l.return)), e.flags & 32) {
          h = e.stateNode;
          try {
            Rs(h, "");
          } catch (at) {
            Rt(e, e.return, at);
          }
        }
        o & 4 && e.stateNode != null && (h = e.memoizedProps, Qc(
          e,
          h,
          l !== null ? l.memoizedProps : h
        )), o & 1024 && (Vc = !0);
        break;
      case 6:
        if (Be(i, e), Ue(e), o & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          o = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = o;
          } catch (at) {
            Rt(e, e.return, at);
          }
        }
        break;
      case 3:
        if (mo = null, h = wi, wi = ho(i.containerInfo), Be(i, e), wi = h, Ue(e), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            da(i.containerInfo);
          } catch (at) {
            Rt(e, e.return, at);
          }
        Vc && (Vc = !1, Hp(e));
        break;
      case 4:
        o = wi, wi = ho(
          e.stateNode.containerInfo
        ), Be(i, e), Ue(e), wi = o;
        break;
      case 12:
        Be(i, e), Ue(e);
        break;
      case 31:
        Be(i, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ir(e, o)));
        break;
      case 13:
        Be(i, e), Ue(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Pr = _e()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ir(e, o)));
        break;
      case 22:
        h = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null, U = Pi, Y = se;
        if (Pi = U || h, se = Y || E, Be(i, e), se = Y, Pi = U, Ue(e), o & 8192)
          t: for (i = e.stateNode, i._visibility = h ? i._visibility & -2 : i._visibility | 1, h && (l === null || E || Pi || se || ls(e)), l = null, i = e; ; ) {
            if (i.tag === 5 || i.tag === 26) {
              if (l === null) {
                E = l = i;
                try {
                  if (f = E.stateNode, h)
                    y = f.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    _ = E.stateNode;
                    var K = E.memoizedProps.style, H = K != null && K.hasOwnProperty("display") ? K.display : null;
                    _.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
                  }
                } catch (at) {
                  Rt(E, E.return, at);
                }
              }
            } else if (i.tag === 6) {
              if (l === null) {
                E = i;
                try {
                  E.stateNode.nodeValue = h ? "" : E.memoizedProps;
                } catch (at) {
                  Rt(E, E.return, at);
                }
              }
            } else if (i.tag === 18) {
              if (l === null) {
                E = i;
                try {
                  var q = E.stateNode;
                  h ? jv(q, !0) : jv(E.stateNode, !1);
                } catch (at) {
                  Rt(E, E.return, at);
                }
              }
            } else if ((i.tag !== 22 && i.tag !== 23 || i.memoizedState === null || i === e) && i.child !== null) {
              i.child.return = i, i = i.child;
              continue;
            }
            if (i === e) break t;
            for (; i.sibling === null; ) {
              if (i.return === null || i.return === e) break t;
              l === i && (l = null), i = i.return;
            }
            l === i && (l = null), i.sibling.return = i.return, i = i.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (l = o.retryQueue, l !== null && (o.retryQueue = null, Ir(e, l))));
        break;
      case 19:
        Be(i, e), Ue(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ir(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Be(i, e), Ue(e);
    }
  }
  function Ue(e) {
    var i = e.flags;
    if (i & 2) {
      try {
        for (var l, o = e.return; o !== null; ) {
          if (zp(o)) {
            l = o;
            break;
          }
          o = o.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var h = l.stateNode, f = $c(e);
            Jr(e, f, h);
            break;
          case 5:
            var y = l.stateNode;
            l.flags & 32 && (Rs(y, ""), l.flags &= -33);
            var _ = $c(e);
            Jr(e, _, y);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, U = $c(e);
            Yc(
              e,
              U,
              E
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (Y) {
        Rt(e, e.return, Y);
      }
      e.flags &= -3;
    }
    i & 4096 && (e.flags &= -4097);
  }
  function Hp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var i = e;
        Hp(i), i.tag === 5 && i.flags & 1024 && i.stateNode.reset(), e = e.sibling;
      }
  }
  function en(e, i) {
    if (i.subtreeFlags & 8772)
      for (i = i.child; i !== null; )
        Dp(e, i.alternate, i), i = i.sibling;
  }
  function ls(e) {
    for (e = e.child; e !== null; ) {
      var i = e;
      switch (i.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          _n(4, i, i.return), ls(i);
          break;
        case 1:
          Oi(i, i.return);
          var l = i.stateNode;
          typeof l.componentWillUnmount == "function" && jp(
            i,
            i.return,
            l
          ), ls(i);
          break;
        case 27:
          gl(i.stateNode);
        case 26:
        case 5:
          Oi(i, i.return), ls(i);
          break;
        case 22:
          i.memoizedState === null && ls(i);
          break;
        case 30:
          ls(i);
          break;
        default:
          ls(i);
      }
      e = e.sibling;
    }
  }
  function nn(e, i, l) {
    for (l = l && (i.subtreeFlags & 8772) !== 0, i = i.child; i !== null; ) {
      var o = i.alternate, h = e, f = i, y = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          nn(
            h,
            f,
            l
          ), rl(4, f);
          break;
        case 1:
          if (nn(
            h,
            f,
            l
          ), o = f, h = o.stateNode, typeof h.componentDidMount == "function")
            try {
              h.componentDidMount();
            } catch (U) {
              Rt(o, o.return, U);
            }
          if (o = f, h = o.updateQueue, h !== null) {
            var _ = o.stateNode;
            try {
              var E = h.shared.hiddenCallbacks;
              if (E !== null)
                for (h.shared.hiddenCallbacks = null, h = 0; h < E.length; h++)
                  vm(E[h], _);
            } catch (U) {
              Rt(o, o.return, U);
            }
          }
          l && y & 64 && Ep(f), ol(f, f.return);
          break;
        case 27:
          Tp(f);
        case 26:
        case 5:
          nn(
            h,
            f,
            l
          ), l && o === null && y & 4 && kp(f), ol(f, f.return);
          break;
        case 12:
          nn(
            h,
            f,
            l
          );
          break;
        case 31:
          nn(
            h,
            f,
            l
          ), l && y & 4 && Lp(h, f);
          break;
        case 13:
          nn(
            h,
            f,
            l
          ), l && y & 4 && Bp(h, f);
          break;
        case 22:
          f.memoizedState === null && nn(
            h,
            f,
            l
          ), ol(f, f.return);
          break;
        case 30:
          break;
        default:
          nn(
            h,
            f,
            l
          );
      }
      i = i.sibling;
    }
  }
  function Gc(e, i) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (e = i.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Za(l));
  }
  function Kc(e, i) {
    e = null, i.alternate !== null && (e = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== e && (i.refCount++, e != null && Za(e));
  }
  function _i(e, i, l, o) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; )
        qp(
          e,
          i,
          l,
          o
        ), i = i.sibling;
  }
  function qp(e, i, l, o) {
    var h = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        _i(
          e,
          i,
          l,
          o
        ), h & 2048 && rl(9, i);
        break;
      case 1:
        _i(
          e,
          i,
          l,
          o
        );
        break;
      case 3:
        _i(
          e,
          i,
          l,
          o
        ), h & 2048 && (e = null, i.alternate !== null && (e = i.alternate.memoizedState.cache), i = i.memoizedState.cache, i !== e && (i.refCount++, e != null && Za(e)));
        break;
      case 12:
        if (h & 2048) {
          _i(
            e,
            i,
            l,
            o
          ), e = i.stateNode;
          try {
            var f = i.memoizedProps, y = f.id, _ = f.onPostCommit;
            typeof _ == "function" && _(
              y,
              i.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (E) {
            Rt(i, i.return, E);
          }
        } else
          _i(
            e,
            i,
            l,
            o
          );
        break;
      case 31:
        _i(
          e,
          i,
          l,
          o
        );
        break;
      case 13:
        _i(
          e,
          i,
          l,
          o
        );
        break;
      case 23:
        break;
      case 22:
        f = i.stateNode, y = i.alternate, i.memoizedState !== null ? f._visibility & 2 ? _i(
          e,
          i,
          l,
          o
        ) : ul(e, i) : f._visibility & 2 ? _i(
          e,
          i,
          l,
          o
        ) : (f._visibility |= 2, ea(
          e,
          i,
          l,
          o,
          (i.subtreeFlags & 10256) !== 0 || !1
        )), h & 2048 && Gc(y, i);
        break;
      case 24:
        _i(
          e,
          i,
          l,
          o
        ), h & 2048 && Kc(i.alternate, i);
        break;
      default:
        _i(
          e,
          i,
          l,
          o
        );
    }
  }
  function ea(e, i, l, o, h) {
    for (h = h && ((i.subtreeFlags & 10256) !== 0 || !1), i = i.child; i !== null; ) {
      var f = e, y = i, _ = l, E = o, U = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ea(
            f,
            y,
            _,
            E,
            h
          ), rl(8, y);
          break;
        case 23:
          break;
        case 22:
          var Y = y.stateNode;
          y.memoizedState !== null ? Y._visibility & 2 ? ea(
            f,
            y,
            _,
            E,
            h
          ) : ul(
            f,
            y
          ) : (Y._visibility |= 2, ea(
            f,
            y,
            _,
            E,
            h
          )), h && U & 2048 && Gc(
            y.alternate,
            y
          );
          break;
        case 24:
          ea(
            f,
            y,
            _,
            E,
            h
          ), h && U & 2048 && Kc(y.alternate, y);
          break;
        default:
          ea(
            f,
            y,
            _,
            E,
            h
          );
      }
      i = i.sibling;
    }
  }
  function ul(e, i) {
    if (i.subtreeFlags & 10256)
      for (i = i.child; i !== null; ) {
        var l = e, o = i, h = o.flags;
        switch (o.tag) {
          case 22:
            ul(l, o), h & 2048 && Gc(
              o.alternate,
              o
            );
            break;
          case 24:
            ul(l, o), h & 2048 && Kc(o.alternate, o);
            break;
          default:
            ul(l, o);
        }
        i = i.sibling;
      }
  }
  var cl = 8192;
  function ia(e, i, l) {
    if (e.subtreeFlags & cl)
      for (e = e.child; e !== null; )
        Qp(
          e,
          i,
          l
        ), e = e.sibling;
  }
  function Qp(e, i, l) {
    switch (e.tag) {
      case 26:
        ia(
          e,
          i,
          l
        ), e.flags & cl && e.memoizedState !== null && qx(
          l,
          wi,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ia(
          e,
          i,
          l
        );
        break;
      case 3:
      case 4:
        var o = wi;
        wi = ho(e.stateNode.containerInfo), ia(
          e,
          i,
          l
        ), wi = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = cl, cl = 16777216, ia(
          e,
          i,
          l
        ), cl = o) : ia(
          e,
          i,
          l
        ));
        break;
      default:
        ia(
          e,
          i,
          l
        );
    }
  }
  function $p(e) {
    var i = e.alternate;
    if (i !== null && (e = i.child, e !== null)) {
      i.child = null;
      do
        i = e.sibling, e.sibling = null, e = i;
      while (e !== null);
    }
  }
  function hl(e) {
    var i = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var o = i[l];
          he = o, Vp(
            o,
            e
          );
        }
      $p(e);
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
        hl(e), e.flags & 2048 && _n(9, e, e.return);
        break;
      case 3:
        hl(e);
        break;
      case 12:
        hl(e);
        break;
      case 22:
        var i = e.stateNode;
        e.memoizedState !== null && i._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (i._visibility &= -3, Fr(e)) : hl(e);
        break;
      default:
        hl(e);
    }
  }
  function Fr(e) {
    var i = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var o = i[l];
          he = o, Vp(
            o,
            e
          );
        }
      $p(e);
    }
    for (e = e.child; e !== null; ) {
      switch (i = e, i.tag) {
        case 0:
        case 11:
        case 15:
          _n(8, i, i.return), Fr(i);
          break;
        case 22:
          l = i.stateNode, l._visibility & 2 && (l._visibility &= -3, Fr(i));
          break;
        default:
          Fr(i);
      }
      e = e.sibling;
    }
  }
  function Vp(e, i) {
    for (; he !== null; ) {
      var l = he;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          _n(8, l, i);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var o = l.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Za(l.memoizedState.cache);
      }
      if (o = l.child, o !== null) o.return = l, he = o;
      else
        t: for (l = e; he !== null; ) {
          o = he;
          var h = o.sibling, f = o.return;
          if (Ap(o), o === l) {
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
  var ex = {
    getCacheForType: function(e) {
      var i = ge(ee), l = i.data.get(e);
      return l === void 0 && (l = e(), i.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return ge(ee).controller.signal;
    }
  }, ix = typeof WeakMap == "function" ? WeakMap : Map, Ot = 0, Qt = null, xt = null, _t = 0, At = 0, Je = null, Sn = !1, na = !1, Xc = !1, sn = 0, Wt = 0, Mn = 0, rs = 0, Zc = 0, Ie = 0, sa = 0, dl = null, He = null, Wc = !1, Pr = 0, Gp = 0, to = 1 / 0, eo = null, Nn = null, re = 0, Cn = null, aa = null, an = 0, Jc = 0, Ic = null, Kp = null, fl = 0, Fc = null;
  function Fe() {
    return (Ot & 2) !== 0 && _t !== 0 ? _t & -_t : B.T !== null ? sh() : yi();
  }
  function Xp() {
    if (Ie === 0)
      if ((_t & 536870912) === 0 || Nt) {
        var e = js;
        js <<= 1, (js & 3932160) === 0 && (js = 262144), Ie = e;
      } else Ie = 536870912;
    return e = Ze.current, e !== null && (e.flags |= 32), Ie;
  }
  function qe(e, i, l) {
    (e === Qt && (At === 2 || At === 9) || e.cancelPendingCommit !== null) && (la(e, 0), En(
      e,
      _t,
      Ie,
      !1
    )), ii(e, l), ((Ot & 2) === 0 || e !== Qt) && (e === Qt && ((Ot & 2) === 0 && (rs |= l), Wt === 4 && En(
      e,
      _t,
      Ie,
      !1
    )), Di(e));
  }
  function Zp(e, i, l) {
    if ((Ot & 6) !== 0) throw Error(a(327));
    var o = !l && (i & 127) === 0 && (i & e.expiredLanes) === 0 || Te(e, i), h = o ? ax(e, i) : th(e, i, !0), f = o;
    do {
      if (h === 0) {
        na && !o && En(e, i, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, f && !nx(l)) {
          h = th(e, i, !1), f = !1;
          continue;
        }
        if (h === 2) {
          if (f = i, e.errorRecoveryDisabledLanes & f)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            i = y;
            t: {
              var _ = e;
              h = dl;
              var E = _.current.memoizedState.isDehydrated;
              if (E && (la(_, y).flags |= 256), y = th(
                _,
                y,
                !1
              ), y !== 2) {
                if (Xc && !E) {
                  _.errorRecoveryDisabledLanes |= f, rs |= f, h = 4;
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
          la(e, 0), En(e, i, 0, !0);
          break;
        }
        t: {
          switch (o = e, f = h, f) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((i & 4194048) !== i) break;
            case 6:
              En(
                o,
                i,
                Ie,
                !Sn
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
          if ((i & 62914560) === i && (h = Pr + 300 - _e(), 10 < h)) {
            if (En(
              o,
              i,
              Ie,
              !Sn
            ), ue(o, 0, !0) !== 0) break t;
            an = i, o.timeoutHandle = Nv(
              Wp.bind(
                null,
                o,
                l,
                He,
                eo,
                Wc,
                i,
                Ie,
                rs,
                sa,
                Sn,
                f,
                "Throttled",
                -0,
                0
              ),
              h
            );
            break t;
          }
          Wp(
            o,
            l,
            He,
            eo,
            Wc,
            i,
            Ie,
            rs,
            sa,
            Sn,
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
  function Wp(e, i, l, o, h, f, y, _, E, U, Y, K, H, q) {
    if (e.timeoutHandle = -1, K = i.subtreeFlags, K & 8192 || (K & 16785408) === 16785408) {
      K = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yi
      }, Qp(
        i,
        f,
        K
      );
      var at = (f & 62914560) === f ? Pr - _e() : (f & 4194048) === f ? Gp - _e() : 0;
      if (at = Qx(
        K,
        at
      ), at !== null) {
        an = f, e.cancelPendingCommit = at(
          nv.bind(
            null,
            e,
            i,
            f,
            l,
            o,
            h,
            y,
            _,
            E,
            Y,
            K,
            null,
            H,
            q
          )
        ), En(e, f, y, !U);
        return;
      }
    }
    nv(
      e,
      i,
      f,
      l,
      o,
      h,
      y,
      _,
      E
    );
  }
  function nx(e) {
    for (var i = e; ; ) {
      var l = i.tag;
      if ((l === 0 || l === 11 || l === 15) && i.flags & 16384 && (l = i.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var o = 0; o < l.length; o++) {
          var h = l[o], f = h.getSnapshot;
          h = h.value;
          try {
            if (!Ke(f(), h)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = i.child, i.subtreeFlags & 16384 && l !== null)
        l.return = i, i = l;
      else {
        if (i === e) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e) return !0;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    return !0;
  }
  function En(e, i, l, o) {
    i &= ~Zc, i &= ~rs, e.suspendedLanes |= i, e.pingedLanes &= ~i, o && (e.warmLanes |= i), o = e.expirationTimes;
    for (var h = i; 0 < h; ) {
      var f = 31 - Se(h), y = 1 << f;
      o[f] = -1, h &= ~y;
    }
    l !== 0 && bi(e, l, i);
  }
  function io() {
    return (Ot & 6) === 0 ? (ml(0), !1) : !0;
  }
  function Pc() {
    if (xt !== null) {
      if (At === 0)
        var e = xt.return;
      else
        e = xt, Xi = Fn = null, pc(e), Js = null, Ja = 0, e = xt;
      for (; e !== null; )
        Cp(e.alternate, e), e = e.return;
      xt = null;
    }
  }
  function la(e, i) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, Sx(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), an = 0, Pc(), Qt = e, xt = l = Gi(e.current, null), _t = i, At = 0, Je = null, Sn = !1, na = Te(e, i), Xc = !1, sa = Ie = Zc = rs = Mn = Wt = 0, He = dl = null, Wc = !1, (i & 8) !== 0 && (i |= i & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= i; 0 < o; ) {
        var h = 31 - Se(o), f = 1 << h;
        i |= e[h], o &= ~f;
      }
    return sn = i, Sr(), l;
  }
  function Jp(e, i) {
    vt = null, B.H = sl, i === Ws || i === Tr ? (i = dm(), At = 3) : i === nc ? (i = dm(), At = 4) : At = i === Tc ? 8 : i !== null && typeof i == "object" && typeof i.then == "function" ? 6 : 1, Je = i, xt === null && (Wt = 1, Gr(
      e,
      oi(i, e.current)
    ));
  }
  function Ip() {
    var e = Ze.current;
    return e === null ? !0 : (_t & 4194048) === _t ? di === null : (_t & 62914560) === _t || (_t & 536870912) !== 0 ? e === di : !1;
  }
  function Fp() {
    var e = B.H;
    return B.H = sl, e === null ? sl : e;
  }
  function Pp() {
    var e = B.A;
    return B.A = ex, e;
  }
  function no() {
    Wt = 4, Sn || (_t & 4194048) !== _t && Ze.current !== null || (na = !0), (Mn & 134217727) === 0 && (rs & 134217727) === 0 || Qt === null || En(
      Qt,
      _t,
      Ie,
      !1
    );
  }
  function th(e, i, l) {
    var o = Ot;
    Ot |= 2;
    var h = Fp(), f = Pp();
    (Qt !== e || _t !== i) && (eo = null, la(e, i)), i = !1;
    var y = Wt;
    t: do
      try {
        if (At !== 0 && xt !== null) {
          var _ = xt, E = Je;
          switch (At) {
            case 8:
              Pc(), y = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ze.current === null && (i = !0);
              var U = At;
              if (At = 0, Je = null, ra(e, _, E, U), l && na) {
                y = 0;
                break t;
              }
              break;
            default:
              U = At, At = 0, Je = null, ra(e, _, E, U);
          }
        }
        sx(), y = Wt;
        break;
      } catch (Y) {
        Jp(e, Y);
      }
    while (!0);
    return i && e.shellSuspendCounter++, Xi = Fn = null, Ot = o, B.H = h, B.A = f, xt === null && (Qt = null, _t = 0, Sr()), y;
  }
  function sx() {
    for (; xt !== null; ) tv(xt);
  }
  function ax(e, i) {
    var l = Ot;
    Ot |= 2;
    var o = Fp(), h = Pp();
    Qt !== e || _t !== i ? (eo = null, to = _e() + 500, la(e, i)) : na = Te(
      e,
      i
    );
    t: do
      try {
        if (At !== 0 && xt !== null) {
          i = xt;
          var f = Je;
          e: switch (At) {
            case 1:
              At = 0, Je = null, ra(e, i, f, 1);
              break;
            case 2:
            case 9:
              if (cm(f)) {
                At = 0, Je = null, ev(i);
                break;
              }
              i = function() {
                At !== 2 && At !== 9 || Qt !== e || (At = 7), Di(e);
              }, f.then(i, i);
              break t;
            case 3:
              At = 7;
              break t;
            case 4:
              At = 5;
              break t;
            case 7:
              cm(f) ? (At = 0, Je = null, ev(i)) : (At = 0, Je = null, ra(e, i, f, 7));
              break;
            case 5:
              var y = null;
              switch (xt.tag) {
                case 26:
                  y = xt.memoizedState;
                case 5:
                case 27:
                  var _ = xt;
                  if (y ? qv(y) : _.stateNode.complete) {
                    At = 0, Je = null;
                    var E = _.sibling;
                    if (E !== null) xt = E;
                    else {
                      var U = _.return;
                      U !== null ? (xt = U, so(U)) : xt = null;
                    }
                    break e;
                  }
              }
              At = 0, Je = null, ra(e, i, f, 5);
              break;
            case 6:
              At = 0, Je = null, ra(e, i, f, 6);
              break;
            case 8:
              Pc(), Wt = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        lx();
        break;
      } catch (Y) {
        Jp(e, Y);
      }
    while (!0);
    return Xi = Fn = null, B.H = o, B.A = h, Ot = l, xt !== null ? 0 : (Qt = null, _t = 0, Sr(), Wt);
  }
  function lx() {
    for (; xt !== null && !Cs(); )
      tv(xt);
  }
  function tv(e) {
    var i = Mp(e.alternate, e, sn);
    e.memoizedProps = e.pendingProps, i === null ? so(e) : xt = i;
  }
  function ev(e) {
    var i = e, l = i.alternate;
    switch (i.tag) {
      case 15:
      case 0:
        i = bp(
          l,
          i,
          i.pendingProps,
          i.type,
          void 0,
          _t
        );
        break;
      case 11:
        i = bp(
          l,
          i,
          i.pendingProps,
          i.type.render,
          i.ref,
          _t
        );
        break;
      case 5:
        pc(i);
      default:
        Cp(l, i), i = xt = Pf(i, sn), i = Mp(l, i, sn);
    }
    e.memoizedProps = e.pendingProps, i === null ? so(e) : xt = i;
  }
  function ra(e, i, l, o) {
    Xi = Fn = null, pc(i), Js = null, Ja = 0;
    var h = i.return;
    try {
      if (Zy(
        e,
        h,
        i,
        l,
        _t
      )) {
        Wt = 1, Gr(
          e,
          oi(l, e.current)
        ), xt = null;
        return;
      }
    } catch (f) {
      if (h !== null) throw xt = h, f;
      Wt = 1, Gr(
        e,
        oi(l, e.current)
      ), xt = null;
      return;
    }
    i.flags & 32768 ? (Nt || o === 1 ? e = !0 : na || (_t & 536870912) !== 0 ? e = !1 : (Sn = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ze.current, o !== null && o.tag === 13 && (o.flags |= 16384))), iv(i, e)) : so(i);
  }
  function so(e) {
    var i = e;
    do {
      if ((i.flags & 32768) !== 0) {
        iv(
          i,
          Sn
        );
        return;
      }
      e = i.return;
      var l = Iy(
        i.alternate,
        i,
        sn
      );
      if (l !== null) {
        xt = l;
        return;
      }
      if (i = i.sibling, i !== null) {
        xt = i;
        return;
      }
      xt = i = e;
    } while (i !== null);
    Wt === 0 && (Wt = 5);
  }
  function iv(e, i) {
    do {
      var l = Fy(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, xt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !i && (e = e.sibling, e !== null)) {
        xt = e;
        return;
      }
      xt = e = l;
    } while (e !== null);
    Wt = 6, xt = null;
  }
  function nv(e, i, l, o, h, f, y, _, E) {
    e.cancelPendingCommit = null;
    do
      ao();
    while (re !== 0);
    if ((Ot & 6) !== 0) throw Error(a(327));
    if (i !== null) {
      if (i === e.current) throw Error(a(177));
      if (f = i.lanes | i.childLanes, f |= $u, le(
        e,
        l,
        f,
        y,
        _,
        E
      ), e === Qt && (xt = Qt = null, _t = 0), aa = i, Cn = e, an = l, Jc = f, Ic = h, Kp = o, (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, cx(gi, function() {
        return ov(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (i.flags & 13878) !== 0, (i.subtreeFlags & 13878) !== 0 || o) {
        o = B.T, B.T = null, h = Z.p, Z.p = 2, y = Ot, Ot |= 4;
        try {
          Py(e, i, l);
        } finally {
          Ot = y, Z.p = h, B.T = o;
        }
      }
      re = 1, sv(), av(), lv();
    }
  }
  function sv() {
    if (re === 1) {
      re = 0;
      var e = Cn, i = aa, l = (i.flags & 13878) !== 0;
      if ((i.subtreeFlags & 13878) !== 0 || l) {
        l = B.T, B.T = null;
        var o = Z.p;
        Z.p = 2;
        var h = Ot;
        Ot |= 4;
        try {
          Up(i, e);
          var f = dh, y = Vf(e.containerInfo), _ = f.focusedElem, E = f.selectionRange;
          if (y !== _ && _ && _.ownerDocument && Yf(
            _.ownerDocument.documentElement,
            _
          )) {
            if (E !== null && Bu(_)) {
              var U = E.start, Y = E.end;
              if (Y === void 0 && (Y = U), "selectionStart" in _)
                _.selectionStart = U, _.selectionEnd = Math.min(
                  Y,
                  _.value.length
                );
              else {
                var K = _.ownerDocument || document, H = K && K.defaultView || window;
                if (H.getSelection) {
                  var q = H.getSelection(), at = _.textContent.length, ut = Math.min(E.start, at), qt = E.end === void 0 ? ut : Math.min(E.end, at);
                  !q.extend && ut > qt && (y = qt, qt = ut, ut = y);
                  var O = $f(
                    _,
                    ut
                  ), z = $f(
                    _,
                    qt
                  );
                  if (O && z && (q.rangeCount !== 1 || q.anchorNode !== O.node || q.anchorOffset !== O.offset || q.focusNode !== z.node || q.focusOffset !== z.offset)) {
                    var L = K.createRange();
                    L.setStart(O.node, O.offset), q.removeAllRanges(), ut > qt ? (q.addRange(L), q.extend(z.node, z.offset)) : (L.setEnd(z.node, z.offset), q.addRange(L));
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
              var V = K[_];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          bo = !!hh, dh = hh = null;
        } finally {
          Ot = h, Z.p = o, B.T = l;
        }
      }
      e.current = i, re = 2;
    }
  }
  function av() {
    if (re === 2) {
      re = 0;
      var e = Cn, i = aa, l = (i.flags & 8772) !== 0;
      if ((i.subtreeFlags & 8772) !== 0 || l) {
        l = B.T, B.T = null;
        var o = Z.p;
        Z.p = 2;
        var h = Ot;
        Ot |= 4;
        try {
          Dp(e, i.alternate, i);
        } finally {
          Ot = h, Z.p = o, B.T = l;
        }
      }
      re = 3;
    }
  }
  function lv() {
    if (re === 4 || re === 3) {
      re = 0, or();
      var e = Cn, i = aa, l = an, o = Kp;
      (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0 ? re = 5 : (re = 0, aa = Cn = null, rv(e, e.pendingLanes));
      var h = e.pendingLanes;
      if (h === 0 && (Nn = null), Qi(l), i = i.stateNode, Ce && typeof Ce.onCommitFiberRoot == "function")
        try {
          Ce.onCommitFiberRoot(
            Vn,
            i,
            void 0,
            (i.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        i = B.T, h = Z.p, Z.p = 2, B.T = null;
        try {
          for (var f = e.onRecoverableError, y = 0; y < o.length; y++) {
            var _ = o[y];
            f(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          B.T = i, Z.p = h;
        }
      }
      (an & 3) !== 0 && ao(), Di(e), h = e.pendingLanes, (l & 261930) !== 0 && (h & 42) !== 0 ? e === Fc ? fl++ : (fl = 0, Fc = e) : fl = 0, ml(0);
    }
  }
  function rv(e, i) {
    (e.pooledCacheLanes &= i) === 0 && (i = e.pooledCache, i != null && (e.pooledCache = null, Za(i)));
  }
  function ao() {
    return sv(), av(), lv(), ov();
  }
  function ov() {
    if (re !== 5) return !1;
    var e = Cn, i = Jc;
    Jc = 0;
    var l = Qi(an), o = B.T, h = Z.p;
    try {
      Z.p = 32 > l ? 32 : l, B.T = null, l = Ic, Ic = null;
      var f = Cn, y = an;
      if (re = 0, aa = Cn = null, an = 0, (Ot & 6) !== 0) throw Error(a(331));
      var _ = Ot;
      if (Ot |= 4, Yp(f.current), qp(
        f,
        f.current,
        y,
        l
      ), Ot = _, ml(0, !1), Ce && typeof Ce.onPostCommitFiberRoot == "function")
        try {
          Ce.onPostCommitFiberRoot(Vn, f);
        } catch {
        }
      return !0;
    } finally {
      Z.p = h, B.T = o, rv(e, i);
    }
  }
  function uv(e, i, l) {
    i = oi(l, i), i = zc(e.stateNode, i, 2), e = yn(e, i, 2), e !== null && (ii(e, 2), Di(e));
  }
  function Rt(e, i, l) {
    if (e.tag === 3)
      uv(e, e, l);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          uv(
            i,
            e,
            l
          );
          break;
        } else if (i.tag === 1) {
          var o = i.stateNode;
          if (typeof i.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Nn === null || !Nn.has(o))) {
            e = oi(l, e), l = cp(2), o = yn(i, l, 2), o !== null && (hp(
              l,
              o,
              i,
              e
            ), ii(o, 2), Di(o));
            break;
          }
        }
        i = i.return;
      }
  }
  function eh(e, i, l) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new ix();
      var h = /* @__PURE__ */ new Set();
      o.set(i, h);
    } else
      h = o.get(i), h === void 0 && (h = /* @__PURE__ */ new Set(), o.set(i, h));
    h.has(l) || (Xc = !0, h.add(l), e = rx.bind(null, e, i, l), i.then(e, e));
  }
  function rx(e, i, l) {
    var o = e.pingCache;
    o !== null && o.delete(i), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qt === e && (_t & l) === l && (Wt === 4 || Wt === 3 && (_t & 62914560) === _t && 300 > _e() - Pr ? (Ot & 2) === 0 && la(e, 0) : Zc |= l, sa === _t && (sa = 0)), Di(e);
  }
  function cv(e, i) {
    i === 0 && (i = Me()), e = Wn(e, i), e !== null && (ii(e, i), Di(e));
  }
  function ox(e) {
    var i = e.memoizedState, l = 0;
    i !== null && (l = i.retryLane), cv(e, l);
  }
  function ux(e, i) {
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
    o !== null && o.delete(i), cv(e, l);
  }
  function cx(e, i) {
    return ti(e, i);
  }
  var lo = null, oa = null, ih = !1, ro = !1, nh = !1, jn = 0;
  function Di(e) {
    e !== oa && e.next === null && (oa === null ? lo = oa = e : oa = oa.next = e), ro = !0, ih || (ih = !0, dx());
  }
  function ml(e, i) {
    if (!nh && ro) {
      nh = !0;
      do
        for (var l = !1, o = lo; o !== null; ) {
          if (e !== 0) {
            var h = o.pendingLanes;
            if (h === 0) var f = 0;
            else {
              var y = o.suspendedLanes, _ = o.pingedLanes;
              f = (1 << 31 - Se(42 | e) + 1) - 1, f &= h & ~(y & ~_), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (l = !0, mv(o, f));
          } else
            f = _t, f = ue(
              o,
              o === Qt ? f : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (f & 3) === 0 || Te(o, f) || (l = !0, mv(o, f));
          o = o.next;
        }
      while (l);
      nh = !1;
    }
  }
  function hx() {
    hv();
  }
  function hv() {
    ro = ih = !1;
    var e = 0;
    jn !== 0 && _x() && (e = jn);
    for (var i = _e(), l = null, o = lo; o !== null; ) {
      var h = o.next, f = dv(o, i);
      f === 0 ? (o.next = null, l === null ? lo = h : l.next = h, h === null && (oa = l)) : (l = o, (e !== 0 || (f & 3) !== 0) && (ro = !0)), o = h;
    }
    re !== 0 && re !== 5 || ml(e), jn !== 0 && (jn = 0);
  }
  function dv(e, i) {
    for (var l = e.suspendedLanes, o = e.pingedLanes, h = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var y = 31 - Se(f), _ = 1 << y, E = h[y];
      E === -1 ? ((_ & l) === 0 || (_ & o) !== 0) && (h[y] = Oe(_, i)) : E <= i && (e.expiredLanes |= _), f &= ~_;
    }
    if (i = Qt, l = _t, l = ue(
      e,
      e === i ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, l === 0 || e === i && (At === 2 || At === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && cn(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Te(e, l)) {
      if (i = l & -l, i === e.callbackPriority) return i;
      switch (o !== null && cn(o), Qi(l)) {
        case 2:
        case 8:
          l = Hi;
          break;
        case 32:
          l = gi;
          break;
        case 268435456:
          l = Aa;
          break;
        default:
          l = gi;
      }
      return o = fv.bind(null, e), l = ti(l, o), e.callbackPriority = i, e.callbackNode = l, i;
    }
    return o !== null && o !== null && cn(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function fv(e, i) {
    if (re !== 0 && re !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (ao() && e.callbackNode !== l)
      return null;
    var o = _t;
    return o = ue(
      e,
      e === Qt ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (Zp(e, o, i), dv(e, _e()), e.callbackNode != null && e.callbackNode === l ? fv.bind(null, e) : null);
  }
  function mv(e, i) {
    if (ao()) return null;
    Zp(e, i, !0);
  }
  function dx() {
    Mx(function() {
      (Ot & 6) !== 0 ? ti(
        ur,
        hx
      ) : hv();
    });
  }
  function sh() {
    if (jn === 0) {
      var e = Xs;
      e === 0 && (e = Es, Es <<= 1, (Es & 261888) === 0 && (Es = 256)), jn = e;
    }
    return jn;
  }
  function pv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : pr("" + e);
  }
  function vv(e, i) {
    var l = i.ownerDocument.createElement("input");
    return l.name = i.name, l.value = i.value, e.id && l.setAttribute("form", e.id), i.parentNode.insertBefore(l, i), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function fx(e, i, l, o, h) {
    if (i === "submit" && l && l.stateNode === h) {
      var f = pv(
        (h[Ae] || null).action
      ), y = o.submitter;
      y && (i = (i = y[Ae] || null) ? pv(i.formAction) : y.getAttribute("formAction"), i !== null && (f = i, y = null));
      var _ = new yr(
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
                if (jn !== 0) {
                  var E = y ? vv(h, y) : new FormData(h);
                  Mc(
                    l,
                    {
                      pending: !0,
                      data: E,
                      method: h.method,
                      action: f
                    },
                    null,
                    E
                  );
                }
              } else
                typeof f == "function" && (_.preventDefault(), E = y ? vv(h, y) : new FormData(h), Mc(
                  l,
                  {
                    pending: !0,
                    data: E,
                    method: h.method,
                    action: f
                  },
                  f,
                  E
                ));
            },
            currentTarget: h
          }
        ]
      });
    }
  }
  for (var ah = 0; ah < Qu.length; ah++) {
    var lh = Qu[ah], mx = lh.toLowerCase(), px = lh[0].toUpperCase() + lh.slice(1);
    xi(
      mx,
      "on" + px
    );
  }
  xi(Xf, "onAnimationEnd"), xi(Zf, "onAnimationIteration"), xi(Wf, "onAnimationStart"), xi("dblclick", "onDoubleClick"), xi("focusin", "onFocus"), xi("focusout", "onBlur"), xi(Ty, "onTransitionRun"), xi(Oy, "onTransitionStart"), xi(Dy, "onTransitionCancel"), xi(Jf, "onTransitionEnd"), Ds("onMouseEnter", ["mouseout", "mouseover"]), Ds("onMouseLeave", ["mouseout", "mouseover"]), Ds("onPointerEnter", ["pointerout", "pointerover"]), Ds("onPointerLeave", ["pointerout", "pointerover"]), Gn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Gn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Gn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Gn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Gn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Gn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pl)
  );
  function gv(e, i) {
    i = (i & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var o = e[l], h = o.event;
      o = o.listeners;
      t: {
        var f = void 0;
        if (i)
          for (var y = o.length - 1; 0 <= y; y--) {
            var _ = o[y], E = _.instance, U = _.currentTarget;
            if (_ = _.listener, E !== f && h.isPropagationStopped())
              break t;
            f = _, h.currentTarget = U;
            try {
              f(h);
            } catch (Y) {
              _r(Y);
            }
            h.currentTarget = null, f = E;
          }
        else
          for (y = 0; y < o.length; y++) {
            if (_ = o[y], E = _.instance, U = _.currentTarget, _ = _.listener, E !== f && h.isPropagationStopped())
              break t;
            f = _, h.currentTarget = U;
            try {
              f(h);
            } catch (Y) {
              _r(Y);
            }
            h.currentTarget = null, f = E;
          }
      }
    }
  }
  function wt(e, i) {
    var l = i[yu];
    l === void 0 && (l = i[yu] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    l.has(o) || (bv(i, e, 2, !1), l.add(o));
  }
  function rh(e, i, l) {
    var o = 0;
    i && (o |= 4), bv(
      l,
      e,
      o,
      i
    );
  }
  var oo = "_reactListening" + Math.random().toString(36).slice(2);
  function oh(e) {
    if (!e[oo]) {
      e[oo] = !0, hf.forEach(function(l) {
        l !== "selectionchange" && (vx.has(l) || rh(l, !1, e), rh(l, !0, e));
      });
      var i = e.nodeType === 9 ? e : e.ownerDocument;
      i === null || i[oo] || (i[oo] = !0, rh("selectionchange", !1, i));
    }
  }
  function bv(e, i, l, o) {
    switch (Xv(i)) {
      case 2:
        var h = Vx;
        break;
      case 8:
        h = Gx;
        break;
      default:
        h = Sh;
    }
    l = h.bind(
      null,
      i,
      l,
      e
    ), h = void 0, !ju || i !== "touchstart" && i !== "touchmove" && i !== "wheel" || (h = !0), o ? h !== void 0 ? e.addEventListener(i, l, {
      capture: !0,
      passive: h
    }) : e.addEventListener(i, l, !0) : h !== void 0 ? e.addEventListener(i, l, {
      passive: h
    }) : e.addEventListener(i, l, !1);
  }
  function uh(e, i, l, o, h) {
    var f = o;
    if ((i & 1) === 0 && (i & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var y = o.tag;
        if (y === 3 || y === 4) {
          var _ = o.stateNode.containerInfo;
          if (_ === h) break;
          if (y === 4)
            for (y = o.return; y !== null; ) {
              var E = y.tag;
              if ((E === 3 || E === 4) && y.stateNode.containerInfo === h)
                return;
              y = y.return;
            }
          for (; _ !== null; ) {
            if (y = zs(_), y === null) return;
            if (E = y.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              o = f = y;
              continue t;
            }
            _ = _.parentNode;
          }
        }
        o = o.return;
      }
    Sf(function() {
      var U = f, Y = Cu(l), K = [];
      t: {
        var H = If.get(e);
        if (H !== void 0) {
          var q = yr, at = e;
          switch (e) {
            case "keypress":
              if (gr(l) === 0) break t;
            case "keydown":
            case "keyup":
              q = uy;
              break;
            case "focusin":
              at = "focus", q = Ou;
              break;
            case "focusout":
              at = "blur", q = Ou;
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
              q = Cf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = I1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = dy;
              break;
            case Xf:
            case Zf:
            case Wf:
              q = ty;
              break;
            case Jf:
              q = my;
              break;
            case "scroll":
            case "scrollend":
              q = W1;
              break;
            case "wheel":
              q = vy;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = iy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = jf;
              break;
            case "toggle":
            case "beforetoggle":
              q = by;
          }
          var ut = (i & 4) !== 0, qt = !ut && (e === "scroll" || e === "scrollend"), O = ut ? H !== null ? H + "Capture" : null : H;
          ut = [];
          for (var z = U, L; z !== null; ) {
            var V = z;
            if (L = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || L === null || O === null || (V = Ba(z, O), V != null && ut.push(
              vl(z, V, L)
            )), qt) break;
            z = z.return;
          }
          0 < ut.length && (H = new q(
            H,
            at,
            null,
            l,
            Y
          ), K.push({ event: H, listeners: ut }));
        }
      }
      if ((i & 7) === 0) {
        t: {
          if (H = e === "mouseover" || e === "pointerover", q = e === "mouseout" || e === "pointerout", H && l !== Nu && (at = l.relatedTarget || l.fromElement) && (zs(at) || at[ks]))
            break t;
          if ((q || H) && (H = Y.window === Y ? Y : (H = Y.ownerDocument) ? H.defaultView || H.parentWindow : window, q ? (at = l.relatedTarget || l.toElement, q = U, at = at ? zs(at) : null, at !== null && (qt = u(at), ut = at.tag, at !== qt || ut !== 5 && ut !== 27 && ut !== 6) && (at = null)) : (q = null, at = U), q !== at)) {
            if (ut = Cf, V = "onMouseLeave", O = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (ut = jf, V = "onPointerLeave", O = "onPointerEnter", z = "pointer"), qt = q == null ? H : La(q), L = at == null ? H : La(at), H = new ut(
              V,
              z + "leave",
              q,
              l,
              Y
            ), H.target = qt, H.relatedTarget = L, V = null, zs(Y) === U && (ut = new ut(
              O,
              z + "enter",
              at,
              l,
              Y
            ), ut.target = L, ut.relatedTarget = qt, V = ut), qt = V, q && at)
              e: {
                for (ut = gx, O = q, z = at, L = 0, V = O; V; V = ut(V))
                  L++;
                V = 0;
                for (var ot = z; ot; ot = ut(ot))
                  V++;
                for (; 0 < L - V; )
                  O = ut(O), L--;
                for (; 0 < V - L; )
                  z = ut(z), V--;
                for (; L--; ) {
                  if (O === z || z !== null && O === z.alternate) {
                    ut = O;
                    break e;
                  }
                  O = ut(O), z = ut(z);
                }
                ut = null;
              }
            else ut = null;
            q !== null && yv(
              K,
              H,
              q,
              ut,
              !1
            ), at !== null && qt !== null && yv(
              K,
              qt,
              at,
              ut,
              !0
            );
          }
        }
        t: {
          if (H = U ? La(U) : window, q = H.nodeName && H.nodeName.toLowerCase(), q === "select" || q === "input" && H.type === "file")
            var jt = Lf;
          else if (Af(H))
            if (Bf)
              jt = jy;
            else {
              jt = Cy;
              var lt = Ny;
            }
          else
            q = H.nodeName, !q || q.toLowerCase() !== "input" || H.type !== "checkbox" && H.type !== "radio" ? U && Mu(U.elementType) && (jt = Lf) : jt = Ey;
          if (jt && (jt = jt(e, U))) {
            Rf(
              K,
              jt,
              l,
              Y
            );
            break t;
          }
          lt && lt(e, H, U), e === "focusout" && U && H.type === "number" && U.memoizedProps.value != null && Su(H, "number", H.value);
        }
        switch (lt = U ? La(U) : window, e) {
          case "focusin":
            (Af(lt) || lt.contentEditable === "true") && (Hs = lt, Uu = U, Ga = null);
            break;
          case "focusout":
            Ga = Uu = Hs = null;
            break;
          case "mousedown":
            Hu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hu = !1, Gf(K, l, Y);
            break;
          case "selectionchange":
            if (zy) break;
          case "keydown":
          case "keyup":
            Gf(K, l, Y);
        }
        var gt;
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
          Us ? Of(e, l) && (St = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (St = "onCompositionStart");
        St && (kf && l.locale !== "ko" && (Us || St !== "onCompositionStart" ? St === "onCompositionEnd" && Us && (gt = Mf()) : (dn = Y, ku = "value" in dn ? dn.value : dn.textContent, Us = !0)), lt = uo(U, St), 0 < lt.length && (St = new Ef(
          St,
          e,
          null,
          l,
          Y
        ), K.push({ event: St, listeners: lt }), gt ? St.data = gt : (gt = Df(l), gt !== null && (St.data = gt)))), (gt = xy ? wy(e, l) : _y(e, l)) && (St = uo(U, "onBeforeInput"), 0 < St.length && (lt = new Ef(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          Y
        ), K.push({
          event: lt,
          listeners: St
        }), lt.data = gt)), fx(
          K,
          e,
          U,
          l,
          Y
        );
      }
      gv(K, i);
    });
  }
  function vl(e, i, l) {
    return {
      instance: e,
      listener: i,
      currentTarget: l
    };
  }
  function uo(e, i) {
    for (var l = i + "Capture", o = []; e !== null; ) {
      var h = e, f = h.stateNode;
      if (h = h.tag, h !== 5 && h !== 26 && h !== 27 || f === null || (h = Ba(e, l), h != null && o.unshift(
        vl(e, h, f)
      ), h = Ba(e, i), h != null && o.push(
        vl(e, h, f)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function gx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function yv(e, i, l, o, h) {
    for (var f = i._reactName, y = []; l !== null && l !== o; ) {
      var _ = l, E = _.alternate, U = _.stateNode;
      if (_ = _.tag, E !== null && E === o) break;
      _ !== 5 && _ !== 26 && _ !== 27 || U === null || (E = U, h ? (U = Ba(l, f), U != null && y.unshift(
        vl(l, U, E)
      )) : h || (U = Ba(l, f), U != null && y.push(
        vl(l, U, E)
      ))), l = l.return;
    }
    y.length !== 0 && e.push({ event: i, listeners: y });
  }
  var bx = /\r\n?/g, yx = /\u0000|\uFFFD/g;
  function xv(e) {
    return (typeof e == "string" ? e : "" + e).replace(bx, `
`).replace(yx, "");
  }
  function wv(e, i) {
    return i = xv(i), xv(e) === i;
  }
  function Ht(e, i, l, o, h, f) {
    switch (l) {
      case "children":
        typeof o == "string" ? i === "body" || i === "textarea" && o === "" || Rs(e, o) : (typeof o == "number" || typeof o == "bigint") && i !== "body" && Rs(e, "" + o);
        break;
      case "className":
        fr(e, "class", o);
        break;
      case "tabIndex":
        fr(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        fr(e, l, o);
        break;
      case "style":
        wf(e, o, f);
        break;
      case "data":
        if (i !== "object") {
          fr(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (i !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = pr("" + o), e.setAttribute(l, o);
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
          typeof f == "function" && (l === "formAction" ? (i !== "input" && Ht(e, i, "name", h.name, h, null), Ht(
            e,
            i,
            "formEncType",
            h.formEncType,
            h,
            null
          ), Ht(
            e,
            i,
            "formMethod",
            h.formMethod,
            h,
            null
          ), Ht(
            e,
            i,
            "formTarget",
            h.formTarget,
            h,
            null
          )) : (Ht(e, i, "encType", h.encType, h, null), Ht(e, i, "method", h.method, h, null), Ht(e, i, "target", h.target, h, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(l);
          break;
        }
        o = pr("" + o), e.setAttribute(l, o);
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
        l = pr("" + o), e.setAttributeNS(
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
        wt("beforetoggle", e), wt("toggle", e), dr(e, "popover", o);
        break;
      case "xlinkActuate":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        $i(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        $i(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        $i(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        $i(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        dr(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = X1.get(l) || l, dr(e, l, o));
    }
  }
  function ch(e, i, l, o, h, f) {
    switch (l) {
      case "style":
        wf(e, o, f);
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
        typeof o == "string" ? Rs(e, o) : (typeof o == "number" || typeof o == "bigint") && Rs(e, "" + o);
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
        if (!df.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (h = l.endsWith("Capture"), i = l.slice(2, h ? l.length - 7 : void 0), f = e[Ae] || null, f = f != null ? f[l] : null, typeof f == "function" && e.removeEventListener(i, f, h), typeof o == "function")) {
              typeof f != "function" && f !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(i, o, h);
              break t;
            }
            l in e ? e[l] = o : o === !0 ? e.setAttribute(l, "") : dr(e, l, o);
          }
    }
  }
  function ye(e, i, l) {
    switch (i) {
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
                  throw Error(a(137, i));
                default:
                  Ht(e, i, f, y, l, null);
              }
          }
        h && Ht(e, i, "srcSet", l.srcSet, l, null), o && Ht(e, i, "src", l.src, l, null);
        return;
      case "input":
        wt("invalid", e);
        var _ = f = y = h = null, E = null, U = null;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var Y = l[o];
            if (Y != null)
              switch (o) {
                case "name":
                  h = Y;
                  break;
                case "type":
                  y = Y;
                  break;
                case "checked":
                  E = Y;
                  break;
                case "defaultChecked":
                  U = Y;
                  break;
                case "value":
                  f = Y;
                  break;
                case "defaultValue":
                  _ = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(a(137, i));
                  break;
                default:
                  Ht(e, i, o, Y, l, null);
              }
          }
        gf(
          e,
          f,
          _,
          E,
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
                Ht(e, i, h, _, l, null);
            }
        i = f, l = y, e.multiple = !!o, i != null ? As(e, !!o, i, !1) : l != null && As(e, !!o, l, !0);
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
                Ht(e, i, y, _, l, null);
            }
        yf(e, o, h, f);
        return;
      case "option":
        for (E in l)
          l.hasOwnProperty(E) && (o = l[E], o != null) && (E === "selected" ? e.selected = o && typeof o != "function" && typeof o != "symbol" : Ht(e, i, E, o, l, null));
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
        for (o = 0; o < pl.length; o++)
          wt(pl[o], e);
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
                throw Error(a(137, i));
              default:
                Ht(e, i, U, o, l, null);
            }
        return;
      default:
        if (Mu(i)) {
          for (Y in l)
            l.hasOwnProperty(Y) && (o = l[Y], o !== void 0 && ch(
              e,
              i,
              Y,
              o,
              l,
              void 0
            ));
          return;
        }
    }
    for (_ in l)
      l.hasOwnProperty(_) && (o = l[_], o != null && Ht(e, i, _, o, l, null));
  }
  function xx(e, i, l, o) {
    switch (i) {
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
        var h = null, f = null, y = null, _ = null, E = null, U = null, Y = null;
        for (q in l) {
          var K = l[q];
          if (l.hasOwnProperty(q) && K != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = K;
              default:
                o.hasOwnProperty(q) || Ht(e, i, q, null, o, K);
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
                Y = q;
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
                  throw Error(a(137, i));
                break;
              default:
                q !== K && Ht(
                  e,
                  i,
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
          E,
          U,
          Y,
          f,
          h
        );
        return;
      case "select":
        q = y = _ = H = null;
        for (f in l)
          if (E = l[f], l.hasOwnProperty(f) && E != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                q = E;
              default:
                o.hasOwnProperty(f) || Ht(
                  e,
                  i,
                  f,
                  null,
                  o,
                  E
                );
            }
        for (h in o)
          if (f = o[h], E = l[h], o.hasOwnProperty(h) && (f != null || E != null))
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
                f !== E && Ht(
                  e,
                  i,
                  h,
                  f,
                  o,
                  E
                );
            }
        i = _, l = y, o = q, H != null ? As(e, !!l, H, !1) : !!o != !!l && (i != null ? As(e, !!l, i, !0) : As(e, !!l, l ? [] : "", !1));
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
                Ht(e, i, _, null, o, h);
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
                h !== f && Ht(e, i, y, h, o, f);
            }
        bf(e, H, q);
        return;
      case "option":
        for (var at in l)
          H = l[at], l.hasOwnProperty(at) && H != null && !o.hasOwnProperty(at) && (at === "selected" ? e.selected = !1 : Ht(
            e,
            i,
            at,
            null,
            o,
            H
          ));
        for (E in o)
          H = o[E], q = l[E], o.hasOwnProperty(E) && H !== q && (H != null || q != null) && (E === "selected" ? e.selected = H && typeof H != "function" && typeof H != "symbol" : Ht(
            e,
            i,
            E,
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
          H = l[ut], l.hasOwnProperty(ut) && H != null && !o.hasOwnProperty(ut) && Ht(e, i, ut, null, o, H);
        for (U in o)
          if (H = o[U], q = l[U], o.hasOwnProperty(U) && H !== q && (H != null || q != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(a(137, i));
                break;
              default:
                Ht(
                  e,
                  i,
                  U,
                  H,
                  o,
                  q
                );
            }
        return;
      default:
        if (Mu(i)) {
          for (var qt in l)
            H = l[qt], l.hasOwnProperty(qt) && H !== void 0 && !o.hasOwnProperty(qt) && ch(
              e,
              i,
              qt,
              void 0,
              o,
              H
            );
          for (Y in o)
            H = o[Y], q = l[Y], !o.hasOwnProperty(Y) || H === q || H === void 0 && q === void 0 || ch(
              e,
              i,
              Y,
              H,
              o,
              q
            );
          return;
        }
    }
    for (var O in l)
      H = l[O], l.hasOwnProperty(O) && H != null && !o.hasOwnProperty(O) && Ht(e, i, O, null, o, H);
    for (K in o)
      H = o[K], q = l[K], !o.hasOwnProperty(K) || H === q || H == null && q == null || Ht(e, i, K, H, o, q);
  }
  function _v(e) {
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
  function wx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, i = 0, l = performance.getEntriesByType("resource"), o = 0; o < l.length; o++) {
        var h = l[o], f = h.transferSize, y = h.initiatorType, _ = h.duration;
        if (f && _ && _v(y)) {
          for (y = 0, _ = h.responseEnd, o += 1; o < l.length; o++) {
            var E = l[o], U = E.startTime;
            if (U > _) break;
            var Y = E.transferSize, K = E.initiatorType;
            Y && _v(K) && (E = E.responseEnd, y += Y * (E < _ ? 1 : (_ - U) / (E - U)));
          }
          if (--o, i += 8 * (f + y) / (h.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return i / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hh = null, dh = null;
  function co(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Sv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Mv(e, i) {
    if (e === 0)
      switch (i) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && i === "foreignObject" ? 0 : e;
  }
  function fh(e, i) {
    return e === "textarea" || e === "noscript" || typeof i.children == "string" || typeof i.children == "number" || typeof i.children == "bigint" || typeof i.dangerouslySetInnerHTML == "object" && i.dangerouslySetInnerHTML !== null && i.dangerouslySetInnerHTML.__html != null;
  }
  var mh = null;
  function _x() {
    var e = window.event;
    return e && e.type === "popstate" ? e === mh ? !1 : (mh = e, !0) : (mh = null, !1);
  }
  var Nv = typeof setTimeout == "function" ? setTimeout : void 0, Sx = typeof clearTimeout == "function" ? clearTimeout : void 0, Cv = typeof Promise == "function" ? Promise : void 0, Mx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cv < "u" ? function(e) {
    return Cv.resolve(null).then(e).catch(Nx);
  } : Nv;
  function Nx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function kn(e) {
    return e === "head";
  }
  function Ev(e, i) {
    var l = i, o = 0;
    do {
      var h = l.nextSibling;
      if (e.removeChild(l), h && h.nodeType === 8)
        if (l = h.data, l === "/$" || l === "/&") {
          if (o === 0) {
            e.removeChild(h), da(i);
            return;
          }
          o--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          o++;
        else if (l === "html")
          gl(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, gl(l);
          for (var f = l.firstChild; f; ) {
            var y = f.nextSibling, _ = f.nodeName;
            f[Ra] || _ === "SCRIPT" || _ === "STYLE" || _ === "LINK" && f.rel.toLowerCase() === "stylesheet" || l.removeChild(f), f = y;
          }
        } else
          l === "body" && gl(e.ownerDocument.body);
      l = h;
    } while (l);
    da(i);
  }
  function jv(e, i) {
    var l = e;
    e = 0;
    do {
      var o = l.nextSibling;
      if (l.nodeType === 1 ? i ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (i ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), o && o.nodeType === 8)
        if (l = o.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = o;
    } while (l);
  }
  function ph(e) {
    var i = e.firstChild;
    for (i && i.nodeType === 10 && (i = i.nextSibling); i; ) {
      var l = i;
      switch (i = i.nextSibling, l.nodeName) {
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
  function Cx(e, i, l, o) {
    for (; e.nodeType === 1; ) {
      var h = l;
      if (e.nodeName.toLowerCase() !== i.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Ra])
          switch (i) {
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
      } else if (i === "input" && e.type === "hidden") {
        var f = h.name == null ? null : "" + h.name;
        if (h.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = fi(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Ex(e, i, l) {
    if (i === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function kv(e, i) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = fi(e.nextSibling), e === null)) return null;
    return e;
  }
  function vh(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function gh(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function jx(e, i) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = i;
    else if (e.data !== "$?" || l.readyState !== "loading")
      i();
    else {
      var o = function() {
        i(), l.removeEventListener("DOMContentLoaded", o);
      };
      l.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function fi(e) {
    for (; e != null; e = e.nextSibling) {
      var i = e.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (i = e.data, i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&" || i === "F!" || i === "F")
          break;
        if (i === "/$" || i === "/&") return null;
      }
    }
    return e;
  }
  var bh = null;
  function zv(e) {
    e = e.nextSibling;
    for (var i = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (i === 0)
            return fi(e.nextSibling);
          i--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || i++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Tv(e) {
    e = e.previousSibling;
    for (var i = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (i === 0) return e;
          i--;
        } else l !== "/$" && l !== "/&" || i++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ov(e, i, l) {
    switch (i = co(l), e) {
      case "html":
        if (e = i.documentElement, !e) throw Error(a(452));
        return e;
      case "head":
        if (e = i.head, !e) throw Error(a(453));
        return e;
      case "body":
        if (e = i.body, !e) throw Error(a(454));
        return e;
      default:
        throw Error(a(451));
    }
  }
  function gl(e) {
    for (var i = e.attributes; i.length; )
      e.removeAttributeNode(i[0]);
    xu(e);
  }
  var mi = /* @__PURE__ */ new Map(), Dv = /* @__PURE__ */ new Set();
  function ho(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ln = Z.d;
  Z.d = {
    f: kx,
    r: zx,
    D: Tx,
    C: Ox,
    L: Dx,
    m: Ax,
    X: Lx,
    S: Rx,
    M: Bx
  };
  function kx() {
    var e = ln.f(), i = io();
    return e || i;
  }
  function zx(e) {
    var i = Ts(e);
    i !== null && i.tag === 5 && i.type === "form" ? Jm(i) : ln.r(e);
  }
  var ua = typeof document > "u" ? null : document;
  function Av(e, i, l) {
    var o = ua;
    if (o && typeof i == "string" && i) {
      var h = li(i);
      h = 'link[rel="' + e + '"][href="' + h + '"]', typeof l == "string" && (h += '[crossorigin="' + l + '"]'), Dv.has(h) || (Dv.add(h), e = { rel: e, crossOrigin: l, href: i }, o.querySelector(h) === null && (i = o.createElement("link"), ye(i, "link", e), ce(i), o.head.appendChild(i)));
    }
  }
  function Tx(e) {
    ln.D(e), Av("dns-prefetch", e, null);
  }
  function Ox(e, i) {
    ln.C(e, i), Av("preconnect", e, i);
  }
  function Dx(e, i, l) {
    ln.L(e, i, l);
    var o = ua;
    if (o && e && i) {
      var h = 'link[rel="preload"][as="' + li(i) + '"]';
      i === "image" && l && l.imageSrcSet ? (h += '[imagesrcset="' + li(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (h += '[imagesizes="' + li(
        l.imageSizes
      ) + '"]')) : h += '[href="' + li(e) + '"]';
      var f = h;
      switch (i) {
        case "style":
          f = ca(e);
          break;
        case "script":
          f = ha(e);
      }
      mi.has(f) || (e = b(
        {
          rel: "preload",
          href: i === "image" && l && l.imageSrcSet ? void 0 : e,
          as: i
        },
        l
      ), mi.set(f, e), o.querySelector(h) !== null || i === "style" && o.querySelector(bl(f)) || i === "script" && o.querySelector(yl(f)) || (i = o.createElement("link"), ye(i, "link", e), ce(i), o.head.appendChild(i)));
    }
  }
  function Ax(e, i) {
    ln.m(e, i);
    var l = ua;
    if (l && e) {
      var o = i && typeof i.as == "string" ? i.as : "script", h = 'link[rel="modulepreload"][as="' + li(o) + '"][href="' + li(e) + '"]', f = h;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ha(e);
      }
      if (!mi.has(f) && (e = b({ rel: "modulepreload", href: e }, i), mi.set(f, e), l.querySelector(h) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(yl(f)))
              return;
        }
        o = l.createElement("link"), ye(o, "link", e), ce(o), l.head.appendChild(o);
      }
    }
  }
  function Rx(e, i, l) {
    ln.S(e, i, l);
    var o = ua;
    if (o && e) {
      var h = Os(o).hoistableStyles, f = ca(e);
      i = i || "default";
      var y = h.get(f);
      if (!y) {
        var _ = { loading: 0, preload: null };
        if (y = o.querySelector(
          bl(f)
        ))
          _.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": i },
            l
          ), (l = mi.get(f)) && yh(e, l);
          var E = y = o.createElement("link");
          ce(E), ye(E, "link", e), E._p = new Promise(function(U, Y) {
            E.onload = U, E.onerror = Y;
          }), E.addEventListener("load", function() {
            _.loading |= 1;
          }), E.addEventListener("error", function() {
            _.loading |= 2;
          }), _.loading |= 4, fo(y, i, o);
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
  function Lx(e, i) {
    ln.X(e, i);
    var l = ua;
    if (l && e) {
      var o = Os(l).hoistableScripts, h = ha(e), f = o.get(h);
      f || (f = l.querySelector(yl(h)), f || (e = b({ src: e, async: !0 }, i), (i = mi.get(h)) && xh(e, i), f = l.createElement("script"), ce(f), ye(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(h, f));
    }
  }
  function Bx(e, i) {
    ln.M(e, i);
    var l = ua;
    if (l && e) {
      var o = Os(l).hoistableScripts, h = ha(e), f = o.get(h);
      f || (f = l.querySelector(yl(h)), f || (e = b({ src: e, async: !0, type: "module" }, i), (i = mi.get(h)) && xh(e, i), f = l.createElement("script"), ce(f), ye(f, "link", e), l.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, o.set(h, f));
    }
  }
  function Rv(e, i, l, o) {
    var h = (h = ct.current) ? ho(h) : null;
    if (!h) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (i = ca(l.href), l = Os(
          h
        ).hoistableStyles, o = l.get(i), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(i, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ca(l.href);
          var f = Os(
            h
          ).hoistableStyles, y = f.get(e);
          if (y || (h = h.ownerDocument || h, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, y), (f = h.querySelector(
            bl(e)
          )) && !f._p && (y.instance = f, y.state.loading = 5), mi.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, mi.set(e, l), f || Ux(
            h,
            e,
            l,
            y.state
          ))), i && o === null)
            throw Error(a(528, ""));
          return y;
        }
        if (i && o !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return i = l.async, l = l.src, typeof l == "string" && i && typeof i != "function" && typeof i != "symbol" ? (i = ha(l), l = Os(
          h
        ).hoistableScripts, o = l.get(i), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(i, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, e));
    }
  }
  function ca(e) {
    return 'href="' + li(e) + '"';
  }
  function bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Lv(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ux(e, i, l, o) {
    e.querySelector('link[rel="preload"][as="style"][' + i + "]") ? o.loading = 1 : (i = e.createElement("link"), o.preload = i, i.addEventListener("load", function() {
      return o.loading |= 1;
    }), i.addEventListener("error", function() {
      return o.loading |= 2;
    }), ye(i, "link", l), ce(i), e.head.appendChild(i));
  }
  function ha(e) {
    return '[src="' + li(e) + '"]';
  }
  function yl(e) {
    return "script[async]" + e;
  }
  function Bv(e, i, l) {
    if (i.count++, i.instance === null)
      switch (i.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + li(l.href) + '"]'
          );
          if (o)
            return i.instance = o, ce(o), o;
          var h = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), ce(o), ye(o, "style", h), fo(o, l.precedence, e), i.instance = o;
        case "stylesheet":
          h = ca(l.href);
          var f = e.querySelector(
            bl(h)
          );
          if (f)
            return i.state.loading |= 4, i.instance = f, ce(f), f;
          o = Lv(l), (h = mi.get(h)) && yh(o, h), f = (e.ownerDocument || e).createElement("link"), ce(f);
          var y = f;
          return y._p = new Promise(function(_, E) {
            y.onload = _, y.onerror = E;
          }), ye(f, "link", o), i.state.loading |= 4, fo(f, l.precedence, e), i.instance = f;
        case "script":
          return f = ha(l.src), (h = e.querySelector(
            yl(f)
          )) ? (i.instance = h, ce(h), h) : (o = l, (h = mi.get(f)) && (o = b({}, l), xh(o, h)), e = e.ownerDocument || e, h = e.createElement("script"), ce(h), ye(h, "link", o), e.head.appendChild(h), i.instance = h);
        case "void":
          return null;
        default:
          throw Error(a(443, i.type));
      }
    else
      i.type === "stylesheet" && (i.state.loading & 4) === 0 && (o = i.instance, i.state.loading |= 4, fo(o, l.precedence, e));
    return i.instance;
  }
  function fo(e, i, l) {
    for (var o = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), h = o.length ? o[o.length - 1] : null, f = h, y = 0; y < o.length; y++) {
      var _ = o[y];
      if (_.dataset.precedence === i) f = _;
      else if (f !== h) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (i = l.nodeType === 9 ? l.head : l, i.insertBefore(e, i.firstChild));
  }
  function yh(e, i) {
    e.crossOrigin == null && (e.crossOrigin = i.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = i.referrerPolicy), e.title == null && (e.title = i.title);
  }
  function xh(e, i) {
    e.crossOrigin == null && (e.crossOrigin = i.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = i.referrerPolicy), e.integrity == null && (e.integrity = i.integrity);
  }
  var mo = null;
  function Uv(e, i, l) {
    if (mo === null) {
      var o = /* @__PURE__ */ new Map(), h = mo = /* @__PURE__ */ new Map();
      h.set(l, o);
    } else
      h = mo, o = h.get(l), o || (o = /* @__PURE__ */ new Map(), h.set(l, o));
    if (o.has(e)) return o;
    for (o.set(e, null), l = l.getElementsByTagName(e), h = 0; h < l.length; h++) {
      var f = l[h];
      if (!(f[Ra] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = f.getAttribute(i) || "";
        y = e + y;
        var _ = o.get(y);
        _ ? _.push(f) : o.set(y, [f]);
      }
    }
    return o;
  }
  function Hv(e, i, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      i === "title" ? e.querySelector("head > title") : null
    );
  }
  function Hx(e, i, l) {
    if (l === 1 || i.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof i.precedence != "string" || typeof i.href != "string" || i.href === "")
          break;
        return !0;
      case "link":
        if (typeof i.rel != "string" || typeof i.href != "string" || i.href === "" || i.onLoad || i.onError)
          break;
        return i.rel === "stylesheet" ? (e = i.disabled, typeof i.precedence == "string" && e == null) : !0;
      case "script":
        if (i.async && typeof i.async != "function" && typeof i.async != "symbol" && !i.onLoad && !i.onError && i.src && typeof i.src == "string")
          return !0;
    }
    return !1;
  }
  function qv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qx(e, i, l, o) {
    if (l.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var h = ca(o.href), f = i.querySelector(
          bl(h)
        );
        if (f) {
          i = f._p, i !== null && typeof i == "object" && typeof i.then == "function" && (e.count++, e = po.bind(e), i.then(e, e)), l.state.loading |= 4, l.instance = f, ce(f);
          return;
        }
        f = i.ownerDocument || i, o = Lv(o), (h = mi.get(h)) && yh(o, h), f = f.createElement("link"), ce(f);
        var y = f;
        y._p = new Promise(function(_, E) {
          y.onload = _, y.onerror = E;
        }), ye(f, "link", o), l.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, i), (i = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = po.bind(e), i.addEventListener("load", l), i.addEventListener("error", l));
    }
  }
  var wh = 0;
  function Qx(e, i) {
    return e.stylesheets && e.count === 0 && go(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var o = setTimeout(function() {
        if (e.stylesheets && go(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + i);
      0 < e.imgBytes && wh === 0 && (wh = 62500 * wx());
      var h = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && go(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > wh ? 50 : 800) + i
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(h);
      };
    } : null;
  }
  function po() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) go(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var vo = null;
  function go(e, i) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, vo = /* @__PURE__ */ new Map(), i.forEach($x, e), vo = null, po.call(e));
  }
  function $x(e, i) {
    if (!(i.state.loading & 4)) {
      var l = vo.get(e);
      if (l) var o = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), vo.set(e, l);
        for (var h = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < h.length; f++) {
          var y = h[f];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (l.set(y.dataset.precedence, y), o = y);
        }
        o && l.set(null, o);
      }
      h = i.instance, y = h.getAttribute("data-precedence"), f = l.get(y) || o, f === o && l.set(null, h), l.set(y, h), this.count++, o = po.bind(this), h.addEventListener("load", o), h.addEventListener("error", o), f ? f.parentNode.insertBefore(h, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(h, e.firstChild)), i.state.loading |= 4;
    }
  }
  var xl = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: st,
    _currentValue2: st,
    _threadCount: 0
  };
  function Yx(e, i, l, o, h, f, y, _, E) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = De(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = De(0), this.hiddenUpdates = De(null), this.identifierPrefix = o, this.onUncaughtError = h, this.onCaughtError = f, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Qv(e, i, l, o, h, f, y, _, E, U, Y, K) {
    return e = new Yx(
      e,
      i,
      l,
      y,
      E,
      U,
      Y,
      K,
      _
    ), i = 1, f === !0 && (i |= 24), f = Xe(3, null, null, i), e.current = f, f.stateNode = e, i = tc(), i.refCount++, e.pooledCache = i, i.refCount++, f.memoizedState = {
      element: o,
      isDehydrated: l,
      cache: i
    }, sc(f), e;
  }
  function $v(e) {
    return e ? (e = $s, e) : $s;
  }
  function Yv(e, i, l, o, h, f) {
    h = $v(h), o.context === null ? o.context = h : o.pendingContext = h, o = bn(i), o.payload = { element: l }, f = f === void 0 ? null : f, f !== null && (o.callback = f), l = yn(e, o, i), l !== null && (qe(l, e, i), Fa(l, e, i));
  }
  function Vv(e, i) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < i ? l : i;
    }
  }
  function _h(e, i) {
    Vv(e, i), (e = e.alternate) && Vv(e, i);
  }
  function Gv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var i = Wn(e, 67108864);
      i !== null && qe(i, e, 67108864), _h(e, 67108864);
    }
  }
  function Kv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var i = Fe();
      i = qi(i);
      var l = Wn(e, i);
      l !== null && qe(l, e, i), _h(e, i);
    }
  }
  var bo = !0;
  function Vx(e, i, l, o) {
    var h = B.T;
    B.T = null;
    var f = Z.p;
    try {
      Z.p = 2, Sh(e, i, l, o);
    } finally {
      Z.p = f, B.T = h;
    }
  }
  function Gx(e, i, l, o) {
    var h = B.T;
    B.T = null;
    var f = Z.p;
    try {
      Z.p = 8, Sh(e, i, l, o);
    } finally {
      Z.p = f, B.T = h;
    }
  }
  function Sh(e, i, l, o) {
    if (bo) {
      var h = Mh(o);
      if (h === null)
        uh(
          e,
          i,
          o,
          yo,
          l
        ), Zv(e, o);
      else if (Xx(
        h,
        e,
        i,
        l,
        o
      ))
        o.stopPropagation();
      else if (Zv(e, o), i & 4 && -1 < Kx.indexOf(e)) {
        for (; h !== null; ) {
          var f = Ts(h);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var y = It(f.pendingLanes);
                  if (y !== 0) {
                    var _ = f;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; y; ) {
                      var E = 1 << 31 - Se(y);
                      _.entanglements[1] |= E, y &= ~E;
                    }
                    Di(f), (Ot & 6) === 0 && (to = _e() + 500, ml(0));
                  }
                }
                break;
              case 31:
              case 13:
                _ = Wn(f, 2), _ !== null && qe(_, f, 2), io(), _h(f, 2);
            }
          if (f = Mh(o), f === null && uh(
            e,
            i,
            o,
            yo,
            l
          ), f === h) break;
          h = f;
        }
        h !== null && o.stopPropagation();
      } else
        uh(
          e,
          i,
          o,
          null,
          l
        );
    }
  }
  function Mh(e) {
    return e = Cu(e), Nh(e);
  }
  var yo = null;
  function Nh(e) {
    if (yo = null, e = zs(e), e !== null) {
      var i = u(e);
      if (i === null) e = null;
      else {
        var l = i.tag;
        if (l === 13) {
          if (e = c(i), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = d(i), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
          e = null;
        } else i !== e && (e = null);
      }
    }
    return yo = e, null;
  }
  function Xv(e) {
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
          case ur:
            return 2;
          case Hi:
            return 8;
          case gi:
          case Yn:
            return 32;
          case Aa:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ch = !1, zn = null, Tn = null, On = null, wl = /* @__PURE__ */ new Map(), _l = /* @__PURE__ */ new Map(), Dn = [], Kx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Zv(e, i) {
    switch (e) {
      case "focusin":
      case "focusout":
        zn = null;
        break;
      case "dragenter":
      case "dragleave":
        Tn = null;
        break;
      case "mouseover":
      case "mouseout":
        On = null;
        break;
      case "pointerover":
      case "pointerout":
        wl.delete(i.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _l.delete(i.pointerId);
    }
  }
  function Sl(e, i, l, o, h, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: i,
      domEventName: l,
      eventSystemFlags: o,
      nativeEvent: f,
      targetContainers: [h]
    }, i !== null && (i = Ts(i), i !== null && Gv(i)), e) : (e.eventSystemFlags |= o, i = e.targetContainers, h !== null && i.indexOf(h) === -1 && i.push(h), e);
  }
  function Xx(e, i, l, o, h) {
    switch (i) {
      case "focusin":
        return zn = Sl(
          zn,
          e,
          i,
          l,
          o,
          h
        ), !0;
      case "dragenter":
        return Tn = Sl(
          Tn,
          e,
          i,
          l,
          o,
          h
        ), !0;
      case "mouseover":
        return On = Sl(
          On,
          e,
          i,
          l,
          o,
          h
        ), !0;
      case "pointerover":
        var f = h.pointerId;
        return wl.set(
          f,
          Sl(
            wl.get(f) || null,
            e,
            i,
            l,
            o,
            h
          )
        ), !0;
      case "gotpointercapture":
        return f = h.pointerId, _l.set(
          f,
          Sl(
            _l.get(f) || null,
            e,
            i,
            l,
            o,
            h
          )
        ), !0;
    }
    return !1;
  }
  function Wv(e) {
    var i = zs(e.target);
    if (i !== null) {
      var l = u(i);
      if (l !== null) {
        if (i = l.tag, i === 13) {
          if (i = c(l), i !== null) {
            e.blockedOn = i, hn(e.priority, function() {
              Kv(l);
            });
            return;
          }
        } else if (i === 31) {
          if (i = d(l), i !== null) {
            e.blockedOn = i, hn(e.priority, function() {
              Kv(l);
            });
            return;
          }
        } else if (i === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function xo(e) {
    if (e.blockedOn !== null) return !1;
    for (var i = e.targetContainers; 0 < i.length; ) {
      var l = Mh(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var o = new l.constructor(
          l.type,
          l
        );
        Nu = o, l.target.dispatchEvent(o), Nu = null;
      } else
        return i = Ts(l), i !== null && Gv(i), e.blockedOn = l, !1;
      i.shift();
    }
    return !0;
  }
  function Jv(e, i, l) {
    xo(e) && l.delete(i);
  }
  function Zx() {
    Ch = !1, zn !== null && xo(zn) && (zn = null), Tn !== null && xo(Tn) && (Tn = null), On !== null && xo(On) && (On = null), wl.forEach(Jv), _l.forEach(Jv);
  }
  function wo(e, i) {
    e.blockedOn === i && (e.blockedOn = null, Ch || (Ch = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      Zx
    )));
  }
  var _o = null;
  function Iv(e) {
    _o !== e && (_o = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        _o === e && (_o = null);
        for (var i = 0; i < e.length; i += 3) {
          var l = e[i], o = e[i + 1], h = e[i + 2];
          if (typeof o != "function") {
            if (Nh(o || l) === null)
              continue;
            break;
          }
          var f = Ts(l);
          f !== null && (e.splice(i, 3), i -= 3, Mc(
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
  function da(e) {
    function i(E) {
      return wo(E, e);
    }
    zn !== null && wo(zn, e), Tn !== null && wo(Tn, e), On !== null && wo(On, e), wl.forEach(i), _l.forEach(i);
    for (var l = 0; l < Dn.length; l++) {
      var o = Dn[l];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < Dn.length && (l = Dn[0], l.blockedOn === null); )
      Wv(l), l.blockedOn === null && Dn.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (o = 0; o < l.length; o += 3) {
        var h = l[o], f = l[o + 1], y = h[Ae] || null;
        if (typeof f == "function")
          y || Iv(l);
        else if (y) {
          var _ = null;
          if (f && f.hasAttribute("formAction")) {
            if (h = f, y = f[Ae] || null)
              _ = y.formAction;
            else if (Nh(h) !== null) continue;
          } else _ = y.action;
          typeof _ == "function" ? l[o + 1] = _ : (l.splice(o, 3), o -= 3), Iv(l);
        }
      }
  }
  function Fv() {
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
    function i() {
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
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", i), navigation.addEventListener("navigateerror", i), setTimeout(l, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", i), navigation.removeEventListener("navigateerror", i), h !== null && (h(), h = null);
      };
    }
  }
  function Eh(e) {
    this._internalRoot = e;
  }
  So.prototype.render = Eh.prototype.render = function(e) {
    var i = this._internalRoot;
    if (i === null) throw Error(a(409));
    var l = i.current, o = Fe();
    Yv(l, o, e, i, null, null);
  }, So.prototype.unmount = Eh.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var i = e.containerInfo;
      Yv(e.current, 2, null, e, null, null), io(), i[ks] = null;
    }
  };
  function So(e) {
    this._internalRoot = e;
  }
  So.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var i = yi();
      e = { blockedOn: null, target: e, priority: i };
      for (var l = 0; l < Dn.length && i !== 0 && i < Dn[l].priority; l++) ;
      Dn.splice(l, 0, e), l === 0 && Wv(e);
    }
  };
  var Pv = t.version;
  if (Pv !== "19.2.7")
    throw Error(
      a(
        527,
        Pv,
        "19.2.7"
      )
    );
  Z.findDOMNode = function(e) {
    var i = e._reactInternals;
    if (i === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = v(i), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Wx = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: B,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Mo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Mo.isDisabled && Mo.supportsFiber)
      try {
        Vn = Mo.inject(
          Wx
        ), Ce = Mo;
      } catch {
      }
  }
  return Nl.createRoot = function(e, i) {
    if (!r(e)) throw Error(a(299));
    var l = !1, o = "", h = lp, f = rp, y = op;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (o = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (f = i.onCaughtError), i.onRecoverableError !== void 0 && (y = i.onRecoverableError)), i = Qv(
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
      Fv
    ), e[ks] = i.current, oh(e), new Eh(i);
  }, Nl.hydrateRoot = function(e, i, l) {
    if (!r(e)) throw Error(a(299));
    var o = !1, h = "", f = lp, y = rp, _ = op, E = null;
    return l != null && (l.unstable_strictMode === !0 && (o = !0), l.identifierPrefix !== void 0 && (h = l.identifierPrefix), l.onUncaughtError !== void 0 && (f = l.onUncaughtError), l.onCaughtError !== void 0 && (y = l.onCaughtError), l.onRecoverableError !== void 0 && (_ = l.onRecoverableError), l.formState !== void 0 && (E = l.formState)), i = Qv(
      e,
      1,
      !0,
      i,
      l ?? null,
      o,
      h,
      E,
      f,
      y,
      _,
      Fv
    ), i.context = $v(null), l = i.current, o = Fe(), o = qi(o), h = bn(o), h.callback = null, yn(l, h, o), l = o, i.current.lanes = l, ii(i, l), Di(i), e[ks] = i.current, oh(e), new So(i);
  }, Nl.version = "19.2.7", Nl;
}
var ug;
function rw() {
  if (ug) return kh.exports;
  ug = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (t) {
        console.error(t);
      }
  }
  return s(), kh.exports = lw(), kh.exports;
}
var ow = rw(), C = Dd();
const Qe = /* @__PURE__ */ Px(C);
var hs = W0();
function uw() {
  for (var s = arguments.length, t = new Array(s), n = 0; n < s; n++)
    t[n] = arguments[n];
  return C.useMemo(
    () => (a) => {
      t.forEach((r) => r(a));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  );
}
const su = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ka(s) {
  const t = Object.prototype.toString.call(s);
  return t === "[object Window]" || // In Electron context the Window object serializes to [object global]
  t === "[object global]";
}
function Ad(s) {
  return "nodeType" in s;
}
function Ve(s) {
  var t, n;
  return s ? ka(s) ? s : Ad(s) && (t = (n = s.ownerDocument) == null ? void 0 : n.defaultView) != null ? t : window : window;
}
function Rd(s) {
  const {
    Document: t
  } = Ve(s);
  return s instanceof t;
}
function Zl(s) {
  return ka(s) ? !1 : s instanceof Ve(s).HTMLElement;
}
function J0(s) {
  return s instanceof Ve(s).SVGElement;
}
function za(s) {
  return s ? ka(s) ? s.document : Ad(s) ? Rd(s) ? s : Zl(s) || J0(s) ? s.ownerDocument : document : document : document;
}
const Bi = su ? C.useLayoutEffect : C.useEffect;
function Ld(s) {
  const t = C.useRef(s);
  return Bi(() => {
    t.current = s;
  }), C.useCallback(function() {
    for (var n = arguments.length, a = new Array(n), r = 0; r < n; r++)
      a[r] = arguments[r];
    return t.current == null ? void 0 : t.current(...a);
  }, []);
}
function cw() {
  const s = C.useRef(null), t = C.useCallback((a, r) => {
    s.current = setInterval(a, r);
  }, []), n = C.useCallback(() => {
    s.current !== null && (clearInterval(s.current), s.current = null);
  }, []);
  return [t, n];
}
function Hl(s, t) {
  t === void 0 && (t = [s]);
  const n = C.useRef(s);
  return Bi(() => {
    n.current !== s && (n.current = s);
  }, t), n;
}
function Wl(s, t) {
  const n = C.useRef();
  return C.useMemo(
    () => {
      const a = s(n.current);
      return n.current = a, a;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...t]
  );
}
function Vo(s) {
  const t = Ld(s), n = C.useRef(null), a = C.useCallback(
    (r) => {
      r !== n.current && t?.(r, n.current), n.current = r;
    },
    //eslint-disable-next-line
    []
  );
  return [n, a];
}
function pd(s) {
  const t = C.useRef();
  return C.useEffect(() => {
    t.current = s;
  }, [s]), t.current;
}
let Ah = {};
function Jl(s, t) {
  return C.useMemo(() => {
    if (t)
      return t;
    const n = Ah[s] == null ? 0 : Ah[s] + 1;
    return Ah[s] = n, s + "-" + n;
  }, [s, t]);
}
function I0(s) {
  return function(t) {
    for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      a[r - 1] = arguments[r];
    return a.reduce((u, c) => {
      const d = Object.entries(c);
      for (const [m, v] of d) {
        const g = u[m];
        g != null && (u[m] = g + s * v);
      }
      return u;
    }, {
      ...t
    });
  };
}
const ya = /* @__PURE__ */ I0(1), Go = /* @__PURE__ */ I0(-1);
function hw(s) {
  return "clientX" in s && "clientY" in s;
}
function Bd(s) {
  if (!s)
    return !1;
  const {
    KeyboardEvent: t
  } = Ve(s.target);
  return t && s instanceof t;
}
function dw(s) {
  if (!s)
    return !1;
  const {
    TouchEvent: t
  } = Ve(s.target);
  return t && s instanceof t;
}
function vd(s) {
  if (dw(s)) {
    if (s.touches && s.touches.length) {
      const {
        clientX: t,
        clientY: n
      } = s.touches[0];
      return {
        x: t,
        y: n
      };
    } else if (s.changedTouches && s.changedTouches.length) {
      const {
        clientX: t,
        clientY: n
      } = s.changedTouches[0];
      return {
        x: t,
        y: n
      };
    }
  }
  return hw(s) ? {
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
        y: n
      } = s;
      return "translate3d(" + (t ? Math.round(t) : 0) + "px, " + (n ? Math.round(n) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(s) {
      if (!s)
        return;
      const {
        scaleX: t,
        scaleY: n
      } = s;
      return "scaleX(" + t + ") scaleY(" + n + ")";
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
        duration: n,
        easing: a
      } = s;
      return t + " " + n + "ms " + a;
    }
  }
}), cg = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function fw(s) {
  return s.matches(cg) ? s : s.querySelector(cg);
}
const mw = {
  display: "none"
};
function pw(s) {
  let {
    id: t,
    value: n
  } = s;
  return Qe.createElement("div", {
    id: t,
    style: mw
  }, n);
}
function vw(s) {
  let {
    id: t,
    announcement: n,
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
  }, n);
}
function gw() {
  const [s, t] = C.useState("");
  return {
    announce: C.useCallback((a) => {
      a != null && t(a);
    }, []),
    announcement: s
  };
}
const F0 = /* @__PURE__ */ C.createContext(null);
function bw(s) {
  const t = C.useContext(F0);
  C.useEffect(() => {
    if (!t)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return t(s);
  }, [s, t]);
}
function yw() {
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
const xw = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, ww = {
  onDragStart(s) {
    let {
      active: t
    } = s;
    return "Picked up draggable item " + t.id + ".";
  },
  onDragOver(s) {
    let {
      active: t,
      over: n
    } = s;
    return n ? "Draggable item " + t.id + " was moved over droppable area " + n.id + "." : "Draggable item " + t.id + " is no longer over a droppable area.";
  },
  onDragEnd(s) {
    let {
      active: t,
      over: n
    } = s;
    return n ? "Draggable item " + t.id + " was dropped over droppable area " + n.id : "Draggable item " + t.id + " was dropped.";
  },
  onDragCancel(s) {
    let {
      active: t
    } = s;
    return "Dragging was cancelled. Draggable item " + t.id + " was dropped.";
  }
};
function _w(s) {
  let {
    announcements: t = ww,
    container: n,
    hiddenTextDescribedById: a,
    screenReaderInstructions: r = xw
  } = s;
  const {
    announce: u,
    announcement: c
  } = gw(), d = Jl("DndLiveRegion"), [m, v] = C.useState(!1);
  if (C.useEffect(() => {
    v(!0);
  }, []), bw(C.useMemo(() => ({
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
  }), [u, t])), !m)
    return null;
  const g = Qe.createElement(Qe.Fragment, null, Qe.createElement(pw, {
    id: a,
    value: r.draggable
  }), Qe.createElement(vw, {
    id: d,
    announcement: c
  }));
  return n ? hs.createPortal(g, n) : g;
}
var oe;
(function(s) {
  s.DragStart = "dragStart", s.DragMove = "dragMove", s.DragEnd = "dragEnd", s.DragCancel = "dragCancel", s.DragOver = "dragOver", s.RegisterDroppable = "registerDroppable", s.SetDroppableDisabled = "setDroppableDisabled", s.UnregisterDroppable = "unregisterDroppable";
})(oe || (oe = {}));
function Ko() {
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
  for (var s = arguments.length, t = new Array(s), n = 0; n < s; n++)
    t[n] = arguments[n];
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
function Sw(s, t) {
  return Math.sqrt(Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2));
}
function Mw(s, t) {
  let {
    data: {
      value: n
    }
  } = s, {
    data: {
      value: a
    }
  } = t;
  return n - a;
}
function Nw(s, t) {
  let {
    data: {
      value: n
    }
  } = s, {
    data: {
      value: a
    }
  } = t;
  return a - n;
}
function Cw(s, t) {
  if (!s || s.length === 0)
    return null;
  const [n] = s;
  return n[t];
}
function hg(s, t, n) {
  return t === void 0 && (t = s.left), n === void 0 && (n = s.top), {
    x: t + s.width * 0.5,
    y: n + s.height * 0.5
  };
}
const qd = (s) => {
  let {
    collisionRect: t,
    droppableRects: n,
    droppableContainers: a
  } = s;
  const r = hg(t, t.left, t.top), u = [];
  for (const c of a) {
    const {
      id: d
    } = c, m = n.get(d);
    if (m) {
      const v = Sw(hg(m), r);
      u.push({
        id: d,
        data: {
          droppableContainer: c,
          value: v
        }
      });
    }
  }
  return u.sort(Mw);
};
function Ew(s, t) {
  const n = Math.max(t.top, s.top), a = Math.max(t.left, s.left), r = Math.min(t.left + t.width, s.left + s.width), u = Math.min(t.top + t.height, s.top + s.height), c = r - a, d = u - n;
  if (a < r && n < u) {
    const m = t.width * t.height, v = s.width * s.height, g = c * d, b = g / (m + v - g);
    return Number(b.toFixed(4));
  }
  return 0;
}
const jw = (s) => {
  let {
    collisionRect: t,
    droppableRects: n,
    droppableContainers: a
  } = s;
  const r = [];
  for (const u of a) {
    const {
      id: c
    } = u, d = n.get(c);
    if (d) {
      const m = Ew(d, t);
      m > 0 && r.push({
        id: c,
        data: {
          droppableContainer: u,
          value: m
        }
      });
    }
  }
  return r.sort(Nw);
};
function kw(s, t, n) {
  return {
    ...s,
    scaleX: t && n ? t.width / n.width : 1,
    scaleY: t && n ? t.height / n.height : 1
  };
}
function P0(s, t) {
  return s && t ? {
    x: s.left - t.left,
    y: s.top - t.top
  } : Mi;
}
function zw(s) {
  return function(n) {
    for (var a = arguments.length, r = new Array(a > 1 ? a - 1 : 0), u = 1; u < a; u++)
      r[u - 1] = arguments[u];
    return r.reduce((c, d) => ({
      ...c,
      top: c.top + s * d.y,
      bottom: c.bottom + s * d.y,
      left: c.left + s * d.x,
      right: c.right + s * d.x
    }), {
      ...n
    });
  };
}
const Tw = /* @__PURE__ */ zw(1);
function Ow(s) {
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
function Dw(s, t, n) {
  const a = Ow(t);
  if (!a)
    return s;
  const {
    scaleX: r,
    scaleY: u,
    x: c,
    y: d
  } = a, m = s.left - c - (1 - r) * parseFloat(n), v = s.top - d - (1 - u) * parseFloat(n.slice(n.indexOf(" ") + 1)), g = r ? s.width / r : s.width, b = u ? s.height / u : s.height;
  return {
    width: g,
    height: b,
    top: v,
    right: m + g,
    bottom: v + b,
    left: m
  };
}
const Aw = {
  ignoreTransform: !1
};
function Ta(s, t) {
  t === void 0 && (t = Aw);
  let n = s.getBoundingClientRect();
  if (t.ignoreTransform) {
    const {
      transform: v,
      transformOrigin: g
    } = Ve(s).getComputedStyle(s);
    v && (n = Dw(n, v, g));
  }
  const {
    top: a,
    left: r,
    width: u,
    height: c,
    bottom: d,
    right: m
  } = n;
  return {
    top: a,
    left: r,
    width: u,
    height: c,
    bottom: d,
    right: m
  };
}
function dg(s) {
  return Ta(s, {
    ignoreTransform: !0
  });
}
function Rw(s) {
  const t = s.innerWidth, n = s.innerHeight;
  return {
    top: 0,
    left: 0,
    right: t,
    bottom: n,
    width: t,
    height: n
  };
}
function Lw(s, t) {
  return t === void 0 && (t = Ve(s).getComputedStyle(s)), t.position === "fixed";
}
function Bw(s, t) {
  t === void 0 && (t = Ve(s).getComputedStyle(s));
  const n = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((r) => {
    const u = t[r];
    return typeof u == "string" ? n.test(u) : !1;
  });
}
function Qd(s, t) {
  const n = [];
  function a(r) {
    if (t != null && n.length >= t || !r)
      return n;
    if (Rd(r) && r.scrollingElement != null && !n.includes(r.scrollingElement))
      return n.push(r.scrollingElement), n;
    if (!Zl(r) || J0(r) || n.includes(r))
      return n;
    const u = Ve(s).getComputedStyle(r);
    return r !== s && Bw(r, u) && n.push(r), Lw(r, u) ? n : a(r.parentNode);
  }
  return s ? a(s) : n;
}
function tb(s) {
  const [t] = Qd(s, 1);
  return t ?? null;
}
function Rh(s) {
  return !su || !s ? null : ka(s) ? s : Ad(s) ? Rd(s) || s === za(s).scrollingElement ? window : Zl(s) ? s : null : null;
}
function eb(s) {
  return ka(s) ? s.scrollX : s.scrollLeft;
}
function ib(s) {
  return ka(s) ? s.scrollY : s.scrollTop;
}
function gd(s) {
  return {
    x: eb(s),
    y: ib(s)
  };
}
var fe;
(function(s) {
  s[s.Forward = 1] = "Forward", s[s.Backward = -1] = "Backward";
})(fe || (fe = {}));
function nb(s) {
  return !su || !s ? !1 : s === document.scrollingElement;
}
function sb(s) {
  const t = {
    x: 0,
    y: 0
  }, n = nb(s) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: s.clientHeight,
    width: s.clientWidth
  }, a = {
    x: s.scrollWidth - n.width,
    y: s.scrollHeight - n.height
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
const Uw = {
  x: 0.2,
  y: 0.2
};
function Hw(s, t, n, a, r) {
  let {
    top: u,
    left: c,
    right: d,
    bottom: m
  } = n;
  a === void 0 && (a = 10), r === void 0 && (r = Uw);
  const {
    isTop: v,
    isBottom: g,
    isLeft: b,
    isRight: x
  } = sb(s), S = {
    x: 0,
    y: 0
  }, w = {
    x: 0,
    y: 0
  }, M = {
    height: t.height * r.y,
    width: t.width * r.x
  };
  return !v && u <= t.top + M.height ? (S.y = fe.Backward, w.y = a * Math.abs((t.top + M.height - u) / M.height)) : !g && m >= t.bottom - M.height && (S.y = fe.Forward, w.y = a * Math.abs((t.bottom - M.height - m) / M.height)), !x && d >= t.right - M.width ? (S.x = fe.Forward, w.x = a * Math.abs((t.right - M.width - d) / M.width)) : !b && c <= t.left + M.width && (S.x = fe.Backward, w.x = a * Math.abs((t.left + M.width - c) / M.width)), {
    direction: S,
    speed: w
  };
}
function qw(s) {
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
    left: n,
    right: a,
    bottom: r
  } = s.getBoundingClientRect();
  return {
    top: t,
    left: n,
    right: a,
    bottom: r,
    width: s.clientWidth,
    height: s.clientHeight
  };
}
function ab(s) {
  return s.reduce((t, n) => ya(t, gd(n)), Mi);
}
function Qw(s) {
  return s.reduce((t, n) => t + eb(n), 0);
}
function $w(s) {
  return s.reduce((t, n) => t + ib(n), 0);
}
function Yw(s, t) {
  if (t === void 0 && (t = Ta), !s)
    return;
  const {
    top: n,
    left: a,
    bottom: r,
    right: u
  } = t(s);
  tb(s) && (r <= 0 || u <= 0 || n >= window.innerHeight || a >= window.innerWidth) && s.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const Vw = [["x", ["left", "right"], Qw], ["y", ["top", "bottom"], $w]];
class $d {
  constructor(t, n) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const a = Qd(n), r = ab(a);
    this.rect = {
      ...t
    }, this.width = t.width, this.height = t.height;
    for (const [u, c, d] of Vw)
      for (const m of c)
        Object.defineProperty(this, m, {
          get: () => {
            const v = d(a), g = r[u] - v;
            return this.rect[m] + g;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class Tl {
  constructor(t) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((n) => {
        var a;
        return (a = this.target) == null ? void 0 : a.removeEventListener(...n);
      });
    }, this.target = t;
  }
  add(t, n, a) {
    var r;
    (r = this.target) == null || r.addEventListener(t, n, a), this.listeners.push([t, n, a]);
  }
}
function Gw(s) {
  const {
    EventTarget: t
  } = Ve(s);
  return s instanceof t ? s : za(s);
}
function Lh(s, t) {
  const n = Math.abs(s.x), a = Math.abs(s.y);
  return typeof t == "number" ? Math.sqrt(n ** 2 + a ** 2) > t : "x" in t && "y" in t ? n > t.x && a > t.y : "x" in t ? n > t.x : "y" in t ? a > t.y : !1;
}
var vi;
(function(s) {
  s.Click = "click", s.DragStart = "dragstart", s.Keydown = "keydown", s.ContextMenu = "contextmenu", s.Resize = "resize", s.SelectionChange = "selectionchange", s.VisibilityChange = "visibilitychange";
})(vi || (vi = {}));
function fg(s) {
  s.preventDefault();
}
function Kw(s) {
  s.stopPropagation();
}
var Dt;
(function(s) {
  s.Space = "Space", s.Down = "ArrowDown", s.Right = "ArrowRight", s.Left = "ArrowLeft", s.Up = "ArrowUp", s.Esc = "Escape", s.Enter = "Enter", s.Tab = "Tab";
})(Dt || (Dt = {}));
const lb = {
  start: [Dt.Space, Dt.Enter],
  cancel: [Dt.Esc],
  end: [Dt.Space, Dt.Enter, Dt.Tab]
}, Xw = (s, t) => {
  let {
    currentCoordinates: n
  } = t;
  switch (s.code) {
    case Dt.Right:
      return {
        ...n,
        x: n.x + 25
      };
    case Dt.Left:
      return {
        ...n,
        x: n.x - 25
      };
    case Dt.Down:
      return {
        ...n,
        y: n.y + 25
      };
    case Dt.Up:
      return {
        ...n,
        y: n.y - 25
      };
  }
};
class rb {
  constructor(t) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = t;
    const {
      event: {
        target: n
      }
    } = t;
    this.props = t, this.listeners = new Tl(za(n)), this.windowListeners = new Tl(Ve(n)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(vi.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: t,
      onStart: n
    } = this.props, a = t.node.current;
    a && Yw(a), n(Mi);
  }
  handleKeyDown(t) {
    if (Bd(t)) {
      const {
        active: n,
        context: a,
        options: r
      } = this.props, {
        keyboardCodes: u = lb,
        coordinateGetter: c = Xw,
        scrollBehavior: d = "smooth"
      } = r, {
        code: m
      } = t;
      if (u.end.includes(m)) {
        this.handleEnd(t);
        return;
      }
      if (u.cancel.includes(m)) {
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
        active: n,
        context: a.current,
        currentCoordinates: g
      });
      if (b) {
        const x = Go(b, g), S = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: w
        } = a.current;
        for (const M of w) {
          const N = t.code, {
            isTop: j,
            isRight: T,
            isLeft: R,
            isBottom: D,
            maxScroll: $,
            minScroll: G
          } = sb(M), A = qw(M), X = {
            x: Math.min(N === Dt.Right ? A.right - A.width / 2 : A.right, Math.max(N === Dt.Right ? A.left : A.left + A.width / 2, b.x)),
            y: Math.min(N === Dt.Down ? A.bottom - A.height / 2 : A.bottom, Math.max(N === Dt.Down ? A.top : A.top + A.height / 2, b.y))
          }, F = N === Dt.Right && !T || N === Dt.Left && !R, I = N === Dt.Down && !D || N === Dt.Up && !j;
          if (F && X.x !== b.x) {
            const it = M.scrollLeft + x.x, nt = N === Dt.Right && it <= $.x || N === Dt.Left && it >= G.x;
            if (nt && !x.y) {
              M.scrollTo({
                left: it,
                behavior: d
              });
              return;
            }
            nt ? S.x = M.scrollLeft - it : S.x = N === Dt.Right ? M.scrollLeft - $.x : M.scrollLeft - G.x, S.x && M.scrollBy({
              left: -S.x,
              behavior: d
            });
            break;
          } else if (I && X.y !== b.y) {
            const it = M.scrollTop + x.y, nt = N === Dt.Down && it <= $.y || N === Dt.Up && it >= G.y;
            if (nt && !x.x) {
              M.scrollTo({
                top: it,
                behavior: d
              });
              return;
            }
            nt ? S.y = M.scrollTop - it : S.y = N === Dt.Down ? M.scrollTop - $.y : M.scrollTop - G.y, S.y && M.scrollBy({
              top: -S.y,
              behavior: d
            });
            break;
          }
        }
        this.handleMove(t, ya(Go(b, this.referenceCoordinates), S));
      }
    }
  }
  handleMove(t, n) {
    const {
      onMove: a
    } = this.props;
    t.preventDefault(), a(n);
  }
  handleEnd(t) {
    const {
      onEnd: n
    } = this.props;
    t.preventDefault(), this.detach(), n();
  }
  handleCancel(t) {
    const {
      onCancel: n
    } = this.props;
    t.preventDefault(), this.detach(), n();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
rb.activators = [{
  eventName: "onKeyDown",
  handler: (s, t, n) => {
    let {
      keyboardCodes: a = lb,
      onActivation: r
    } = t, {
      active: u
    } = n;
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
function mg(s) {
  return !!(s && "distance" in s);
}
function pg(s) {
  return !!(s && "delay" in s);
}
class Yd {
  constructor(t, n, a) {
    var r;
    a === void 0 && (a = Gw(t.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = t, this.events = n;
    const {
      event: u
    } = t, {
      target: c
    } = u;
    this.props = t, this.events = n, this.document = za(c), this.documentListeners = new Tl(this.document), this.listeners = new Tl(a), this.windowListeners = new Tl(Ve(c)), this.initialCoordinates = (r = vd(u)) != null ? r : Mi, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: t,
      props: {
        options: {
          activationConstraint: n,
          bypassActivationConstraint: a
        }
      }
    } = this;
    if (this.listeners.add(t.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(t.end.name, this.handleEnd), t.cancel && this.listeners.add(t.cancel.name, this.handleCancel), this.windowListeners.add(vi.Resize, this.handleCancel), this.windowListeners.add(vi.DragStart, fg), this.windowListeners.add(vi.VisibilityChange, this.handleCancel), this.windowListeners.add(vi.ContextMenu, fg), this.documentListeners.add(vi.Keydown, this.handleKeydown), n) {
      if (a != null && a({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (pg(n)) {
        this.timeoutId = setTimeout(this.handleStart, n.delay), this.handlePending(n);
        return;
      }
      if (mg(n)) {
        this.handlePending(n);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(t, n) {
    const {
      active: a,
      onPending: r
    } = this.props;
    r(a, t, this.initialCoordinates, n);
  }
  handleStart() {
    const {
      initialCoordinates: t
    } = this, {
      onStart: n
    } = this.props;
    t && (this.activated = !0, this.documentListeners.add(vi.Click, Kw, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(vi.SelectionChange, this.removeTextSelection), n(t));
  }
  handleMove(t) {
    var n;
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
    const m = (n = vd(t)) != null ? n : Mi, v = Go(r, m);
    if (!a && d) {
      if (mg(d)) {
        if (d.tolerance != null && Lh(v, d.tolerance))
          return this.handleCancel();
        if (Lh(v, d.distance))
          return this.handleStart();
      }
      if (pg(d) && Lh(v, d.tolerance))
        return this.handleCancel();
      this.handlePending(d, v);
      return;
    }
    t.cancelable && t.preventDefault(), c(m);
  }
  handleEnd() {
    const {
      onAbort: t,
      onEnd: n
    } = this.props;
    this.detach(), this.activated || t(this.props.active), n();
  }
  handleCancel() {
    const {
      onAbort: t,
      onCancel: n
    } = this.props;
    this.detach(), this.activated || t(this.props.active), n();
  }
  handleKeydown(t) {
    t.code === Dt.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var t;
    (t = this.document.getSelection()) == null || t.removeAllRanges();
  }
}
const Zw = {
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
class Il extends Yd {
  constructor(t) {
    const {
      event: n
    } = t, a = za(n.target);
    super(t, Zw, a);
  }
}
Il.activators = [{
  eventName: "onPointerDown",
  handler: (s, t) => {
    let {
      nativeEvent: n
    } = s, {
      onActivation: a
    } = t;
    return !n.isPrimary || n.button !== 0 ? !1 : (a?.({
      event: n
    }), !0);
  }
}];
const Ww = {
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
class Jw extends Yd {
  constructor(t) {
    super(t, Ww, za(t.event.target));
  }
}
Jw.activators = [{
  eventName: "onMouseDown",
  handler: (s, t) => {
    let {
      nativeEvent: n
    } = s, {
      onActivation: a
    } = t;
    return n.button === bd.RightClick ? !1 : (a?.({
      event: n
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
class Iw extends Yd {
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
Iw.activators = [{
  eventName: "onTouchStart",
  handler: (s, t) => {
    let {
      nativeEvent: n
    } = s, {
      onActivation: a
    } = t;
    const {
      touches: r
    } = n;
    return r.length > 1 ? !1 : (a?.({
      event: n
    }), !0);
  }
}];
var Ol;
(function(s) {
  s[s.Pointer = 0] = "Pointer", s[s.DraggableRect = 1] = "DraggableRect";
})(Ol || (Ol = {}));
var Xo;
(function(s) {
  s[s.TreeOrder = 0] = "TreeOrder", s[s.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Xo || (Xo = {}));
function Fw(s) {
  let {
    acceleration: t,
    activator: n = Ol.Pointer,
    canScroll: a,
    draggingRect: r,
    enabled: u,
    interval: c = 5,
    order: d = Xo.TreeOrder,
    pointerCoordinates: m,
    scrollableAncestors: v,
    scrollableAncestorRects: g,
    delta: b,
    threshold: x
  } = s;
  const S = t2({
    delta: b,
    disabled: !u
  }), [w, M] = cw(), N = C.useRef({
    x: 0,
    y: 0
  }), j = C.useRef({
    x: 0,
    y: 0
  }), T = C.useMemo(() => {
    switch (n) {
      case Ol.Pointer:
        return m ? {
          top: m.y,
          bottom: m.y,
          left: m.x,
          right: m.x
        } : null;
      case Ol.DraggableRect:
        return r;
    }
  }, [n, r, m]), R = C.useRef(null), D = C.useCallback(() => {
    const G = R.current;
    if (!G)
      return;
    const A = N.current.x * j.current.x, X = N.current.y * j.current.y;
    G.scrollBy(A, X);
  }, []), $ = C.useMemo(() => d === Xo.TreeOrder ? [...v].reverse() : v, [d, v]);
  C.useEffect(
    () => {
      if (!u || !v.length || !T) {
        M();
        return;
      }
      for (const G of $) {
        if (a?.(G) === !1)
          continue;
        const A = v.indexOf(G), X = g[A];
        if (!X)
          continue;
        const {
          direction: F,
          speed: I
        } = Hw(G, X, T, t, x);
        for (const it of ["x", "y"])
          S[it][F[it]] || (I[it] = 0, F[it] = 0);
        if (I.x > 0 || I.y > 0) {
          M(), R.current = G, w(D, c), N.current = I, j.current = F;
          return;
        }
      }
      N.current = {
        x: 0,
        y: 0
      }, j.current = {
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
      $,
      g,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(x)
    ]
  );
}
const Pw = {
  x: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  },
  y: {
    [fe.Backward]: !1,
    [fe.Forward]: !1
  }
};
function t2(s) {
  let {
    delta: t,
    disabled: n
  } = s;
  const a = pd(t);
  return Wl((r) => {
    if (n || !a || !r)
      return Pw;
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
  }, [n, t, a]);
}
function e2(s, t) {
  const n = t != null ? s.get(t) : void 0, a = n ? n.node.current : null;
  return Wl((r) => {
    var u;
    return t == null ? null : (u = a ?? r) != null ? u : null;
  }, [a, t]);
}
function i2(s, t) {
  return C.useMemo(() => s.reduce((n, a) => {
    const {
      sensor: r
    } = a, u = r.activators.map((c) => ({
      eventName: c.eventName,
      handler: t(c.handler, a)
    }));
    return [...n, ...u];
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
const vg = /* @__PURE__ */ new Map();
function n2(s, t) {
  let {
    dragging: n,
    dependencies: a,
    config: r
  } = t;
  const [u, c] = C.useState(null), {
    frequency: d,
    measure: m,
    strategy: v
  } = r, g = C.useRef(s), b = N(), x = Hl(b), S = C.useCallback(function(j) {
    j === void 0 && (j = []), !x.current && c((T) => T === null ? j : T.concat(j.filter((R) => !T.includes(R))));
  }, [x]), w = C.useRef(null), M = Wl((j) => {
    if (b && !n)
      return vg;
    if (!j || j === vg || g.current !== s || u != null) {
      const T = /* @__PURE__ */ new Map();
      for (let R of s) {
        if (!R)
          continue;
        if (u && u.length > 0 && !u.includes(R.id) && R.rect.current) {
          T.set(R.id, R.rect.current);
          continue;
        }
        const D = R.node.current, $ = D ? new $d(m(D), D) : null;
        R.rect.current = $, $ && T.set(R.id, $);
      }
      return T;
    }
    return j;
  }, [s, u, n, b, m]);
  return C.useEffect(() => {
    g.current = s;
  }, [s]), C.useEffect(
    () => {
      b || S();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, b]
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
        return n;
      default:
        return !n;
    }
  }
}
function ob(s, t) {
  return Wl((n) => s ? n || (typeof t == "function" ? t(s) : s) : null, [t, s]);
}
function s2(s, t) {
  return ob(s, t);
}
function a2(s) {
  let {
    callback: t,
    disabled: n
  } = s;
  const a = Ld(t), r = C.useMemo(() => {
    if (n || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: u
    } = window;
    return new u(a);
  }, [a, n]);
  return C.useEffect(() => () => r?.disconnect(), [r]), r;
}
function au(s) {
  let {
    callback: t,
    disabled: n
  } = s;
  const a = Ld(t), r = C.useMemo(
    () => {
      if (n || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: u
      } = window;
      return new u(a);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n]
  );
  return C.useEffect(() => () => r?.disconnect(), [r]), r;
}
function l2(s) {
  return new $d(Ta(s), s);
}
function gg(s, t, n) {
  t === void 0 && (t = l2);
  const [a, r] = C.useState(null);
  function u() {
    r((m) => {
      if (!s)
        return null;
      if (s.isConnected === !1) {
        var v;
        return (v = m ?? n) != null ? v : null;
      }
      const g = t(s);
      return JSON.stringify(m) === JSON.stringify(g) ? m : g;
    });
  }
  const c = a2({
    callback(m) {
      if (s)
        for (const v of m) {
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
  return Bi(() => {
    u(), s ? (d?.observe(s), c?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (d?.disconnect(), c?.disconnect());
  }, [s]), a;
}
function r2(s) {
  const t = ob(s);
  return P0(s, t);
}
const bg = [];
function o2(s) {
  const t = C.useRef(s), n = Wl((a) => s ? a && a !== bg && s && t.current && s.parentNode === t.current.parentNode ? a : Qd(s) : bg, [s]);
  return C.useEffect(() => {
    t.current = s;
  }, [s]), n;
}
function u2(s) {
  const [t, n] = C.useState(null), a = C.useRef(s), r = C.useCallback((u) => {
    const c = Rh(u.target);
    c && n((d) => d ? (d.set(c, gd(c)), new Map(d)) : null);
  }, []);
  return C.useEffect(() => {
    const u = a.current;
    if (s !== u) {
      c(u);
      const d = s.map((m) => {
        const v = Rh(m);
        return v ? (v.addEventListener("scroll", r, {
          passive: !0
        }), [v, gd(v)]) : null;
      }).filter((m) => m != null);
      n(d.length ? new Map(d) : null), a.current = s;
    }
    return () => {
      c(s), c(u);
    };
    function c(d) {
      d.forEach((m) => {
        const v = Rh(m);
        v?.removeEventListener("scroll", r);
      });
    }
  }, [r, s]), C.useMemo(() => s.length ? t ? Array.from(t.values()).reduce((u, c) => ya(u, c), Mi) : ab(s) : Mi, [s, t]);
}
function yg(s, t) {
  t === void 0 && (t = []);
  const n = C.useRef(null);
  return C.useEffect(
    () => {
      n.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), C.useEffect(() => {
    const a = s !== Mi;
    a && !n.current && (n.current = s), !a && n.current && (n.current = null);
  }, [s]), n.current ? Go(s, n.current) : Mi;
}
function c2(s) {
  C.useEffect(
    () => {
      if (!su)
        return;
      const t = s.map((n) => {
        let {
          sensor: a
        } = n;
        return a.setup == null ? void 0 : a.setup();
      });
      return () => {
        for (const n of t)
          n?.();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    s.map((t) => {
      let {
        sensor: n
      } = t;
      return n;
    })
  );
}
function h2(s, t) {
  return C.useMemo(() => s.reduce((n, a) => {
    let {
      eventName: r,
      handler: u
    } = a;
    return n[r] = (c) => {
      u(c, t);
    }, n;
  }, {}), [s, t]);
}
function ub(s) {
  return C.useMemo(() => s ? Rw(s) : null, [s]);
}
const xg = [];
function d2(s, t) {
  t === void 0 && (t = Ta);
  const [n] = s, a = ub(n ? Ve(n) : null), [r, u] = C.useState(xg);
  function c() {
    u(() => s.length ? s.map((m) => nb(m) ? a : new $d(t(m), m)) : xg);
  }
  const d = au({
    callback: c
  });
  return Bi(() => {
    d?.disconnect(), c(), s.forEach((m) => d?.observe(m));
  }, [s]), r;
}
function f2(s) {
  if (!s)
    return null;
  if (s.children.length > 1)
    return s;
  const t = s.children[0];
  return Zl(t) ? t : s;
}
function m2(s) {
  let {
    measure: t
  } = s;
  const [n, a] = C.useState(null), r = C.useCallback((v) => {
    for (const {
      target: g
    } of v)
      if (Zl(g)) {
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
    const g = f2(v);
    u?.disconnect(), g && u?.observe(g), a(g ? t(g) : null);
  }, [t, u]), [d, m] = Vo(c);
  return C.useMemo(() => ({
    nodeRef: d,
    rect: n,
    setRef: m
  }), [n, d, m]);
}
const p2 = [{
  sensor: Il,
  options: {}
}, {
  sensor: rb,
  options: {}
}], v2 = {
  current: {}
}, Uo = {
  draggable: {
    measure: dg
  },
  droppable: {
    measure: dg,
    strategy: Ql.WhileDragging,
    frequency: yd.Optimized
  },
  dragOverlay: {
    measure: Ta
  }
};
class Dl extends Map {
  get(t) {
    var n;
    return t != null && (n = super.get(t)) != null ? n : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((t) => {
      let {
        disabled: n
      } = t;
      return !n;
    });
  }
  getNodeFor(t) {
    var n, a;
    return (n = (a = this.get(t)) == null ? void 0 : a.node.current) != null ? n : void 0;
  }
}
const g2 = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new Dl(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Ko
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Uo,
  measureDroppableContainers: Ko,
  windowRect: null,
  measuringScheduled: !1
}, b2 = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Ko,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Ko
}, lu = /* @__PURE__ */ C.createContext(b2), cb = /* @__PURE__ */ C.createContext(g2);
function y2() {
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
      containers: new Dl()
    }
  };
}
function x2(s, t) {
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
        element: n
      } = t, {
        id: a
      } = n, r = new Dl(s.droppable.containers);
      return r.set(a, n), {
        ...s,
        droppable: {
          ...s.droppable,
          containers: r
        }
      };
    }
    case oe.SetDroppableDisabled: {
      const {
        id: n,
        key: a,
        disabled: r
      } = t, u = s.droppable.containers.get(n);
      if (!u || a !== u.key)
        return s;
      const c = new Dl(s.droppable.containers);
      return c.set(n, {
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
        id: n,
        key: a
      } = t, r = s.droppable.containers.get(n);
      if (!r || a !== r.key)
        return s;
      const u = new Dl(s.droppable.containers);
      return u.delete(n), {
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
function w2(s) {
  let {
    disabled: t
  } = s;
  const {
    active: n,
    activatorEvent: a,
    draggableNodes: r
  } = C.useContext(lu), u = pd(a), c = pd(n?.id);
  return C.useEffect(() => {
    if (!t && !a && u && c != null) {
      if (!Bd(u) || document.activeElement === u.target)
        return;
      const d = r.get(c);
      if (!d)
        return;
      const {
        activatorNode: m,
        node: v
      } = d;
      if (!m.current && !v.current)
        return;
      requestAnimationFrame(() => {
        for (const g of [m.current, v.current]) {
          if (!g)
            continue;
          const b = fw(g);
          if (b) {
            b.focus();
            break;
          }
        }
      });
    }
  }, [a, t, r, c, u]), null;
}
function _2(s, t) {
  let {
    transform: n,
    ...a
  } = t;
  return s != null && s.length ? s.reduce((r, u) => u({
    transform: r,
    ...a
  }), n) : n;
}
function S2(s) {
  return C.useMemo(
    () => ({
      draggable: {
        ...Uo.draggable,
        ...s?.draggable
      },
      droppable: {
        ...Uo.droppable,
        ...s?.droppable
      },
      dragOverlay: {
        ...Uo.dragOverlay,
        ...s?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s?.draggable, s?.droppable, s?.dragOverlay]
  );
}
function M2(s) {
  let {
    activeNode: t,
    measure: n,
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
  Bi(() => {
    if (!c && !d || !t) {
      u.current = !1;
      return;
    }
    if (u.current || !a)
      return;
    const v = t?.node.current;
    if (!v || v.isConnected === !1)
      return;
    const g = n(v), b = P0(g, a);
    if (c || (b.x = 0), d || (b.y = 0), u.current = !0, Math.abs(b.x) > 0 || Math.abs(b.y) > 0) {
      const x = tb(v);
      x && x.scrollBy({
        top: b.y,
        left: b.x
      });
    }
  }, [t, c, d, a, n]);
}
const hb = /* @__PURE__ */ C.createContext({
  ...Mi,
  scaleX: 1,
  scaleY: 1
});
var Ln;
(function(s) {
  s[s.Uninitialized = 0] = "Uninitialized", s[s.Initializing = 1] = "Initializing", s[s.Initialized = 2] = "Initialized";
})(Ln || (Ln = {}));
const Vd = /* @__PURE__ */ C.memo(function(t) {
  var n, a, r, u;
  let {
    id: c,
    accessibility: d,
    autoScroll: m = !0,
    children: v,
    sensors: g = p2,
    collisionDetection: b = jw,
    measuring: x,
    modifiers: S,
    ...w
  } = t;
  const M = C.useReducer(x2, void 0, y2), [N, j] = M, [T, R] = yw(), [D, $] = C.useState(Ln.Uninitialized), G = D === Ln.Initialized, {
    draggable: {
      active: A,
      nodes: X,
      translate: F
    },
    droppable: {
      containers: I
    }
  } = N, it = A != null ? X.get(A) : null, nt = C.useRef({
    initial: null,
    translated: null
  }), yt = C.useMemo(() => {
    var Jt;
    return A != null ? {
      id: A,
      // It's possible for the active node to unmount while dragging
      data: (Jt = it?.data) != null ? Jt : v2,
      rect: nt
    } : null;
  }, [A, it]), bt = C.useRef(null), [Bt, B] = C.useState(null), [Z, st] = C.useState(null), ht = Hl(w, Object.values(w)), ft = Jl("DndDescribedBy", c), k = C.useMemo(() => I.getEnabled(), [I]), Q = S2(x), {
    droppableRects: J,
    measureDroppableContainers: tt,
    measuringScheduled: dt
  } = n2(k, {
    dragging: G,
    dependencies: [F.x, F.y],
    config: Q.droppable
  }), ct = e2(X, A), Mt = C.useMemo(() => Z ? vd(Z) : null, [Z]), Gt = js(), Tt = s2(ct, Q.draggable.measure);
  M2({
    activeNode: A != null ? X.get(A) : null,
    config: Gt.layoutShiftCompensation,
    initialRect: Tt,
    measure: Q.draggable.measure
  });
  const Ct = gg(ct, Q.draggable.measure, Tt), Ci = gg(ct ? ct.parentElement : null), ze = C.useRef({
    activatorEvent: null,
    active: null,
    activeNode: ct,
    collisionRect: null,
    collisions: null,
    droppableRects: J,
    draggableNodes: X,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: I,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), Ui = I.getNodeFor((n = ze.current.over) == null ? void 0 : n.id), me = m2({
    measure: Q.dragOverlay.measure
  }), Ei = (a = me.nodeRef.current) != null ? a : ct, ji = G ? (r = me.rect) != null ? r : Ct : null, rr = !!(me.nodeRef.current && me.rect), Da = r2(rr ? null : Ct), $n = ub(Ei ? Ve(Ei) : null), ti = o2(G ? Ui ?? ct : null), cn = d2(ti), Cs = _2(S, {
    transform: {
      x: F.x - Da.x,
      y: F.y - Da.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: Z,
    active: yt,
    activeNodeRect: Ct,
    containerNodeRect: Ci,
    draggingNodeRect: ji,
    over: ze.current.over,
    overlayNodeRect: me.rect,
    scrollableAncestors: ti,
    scrollableAncestorRects: cn,
    windowRect: $n
  }), or = Mt ? ya(Mt, F) : null, _e = u2(ti), vu = yg(_e), ur = yg(_e, [Ct]), Hi = ya(Cs, vu), gi = ji ? Tw(ji, Cs) : null, Yn = yt && gi ? b({
    active: yt,
    collisionRect: gi,
    droppableRects: J,
    droppableContainers: k,
    pointerCoordinates: or
  }) : null, Aa = Cw(Yn, "id"), [ki, cr] = C.useState(null), Vn = rr ? Cs : ya(Cs, ur), Ce = kw(Vn, (u = ki?.rect) != null ? u : null, Ct), ei = C.useRef(null), Se = C.useCallback(
    (Jt, It) => {
      let {
        sensor: ue,
        options: Te
      } = It;
      if (bt.current == null)
        return;
      const Oe = X.get(bt.current);
      if (!Oe)
        return;
      const Me = Jt.nativeEvent, De = new ue({
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
            onDragPending: Qi
          } = ht.current, yi = {
            id: le,
            constraint: bi,
            initialCoordinates: Ge,
            offset: ni
          };
          Qi?.(yi), T({
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
          } = ht.current, qi = {
            activatorEvent: Me,
            active: {
              id: bi,
              data: Ge.data,
              rect: nt
            }
          };
          hs.unstable_batchedUpdates(() => {
            ni?.(qi), $(Ln.Initializing), j({
              type: oe.DragStart,
              initialCoordinates: le,
              active: bi
            }), T({
              type: "onDragStart",
              event: qi
            }), B(ei.current), st(Me);
          });
        },
        onMove(le) {
          j({
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
            over: qi,
            scrollAdjustedTranslate: Qi
          } = ze.current;
          let yi = null;
          if (Ge && Qi) {
            const {
              cancelDrop: hn
            } = ht.current;
            yi = {
              activatorEvent: Me,
              active: Ge,
              collisions: ni,
              delta: Qi,
              over: qi
            }, le === oe.DragEnd && typeof hn == "function" && await Promise.resolve(hn(yi)) && (le = oe.DragCancel);
          }
          bt.current = null, hs.unstable_batchedUpdates(() => {
            j({
              type: le
            }), $(Ln.Uninitialized), cr(null), B(null), st(null), ei.current = null;
            const hn = le === oe.DragEnd ? "onDragEnd" : "onDragCancel";
            if (yi) {
              const si = ht.current[hn];
              si?.(yi), T({
                type: hn,
                event: yi
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [X]
  ), gu = C.useCallback((Jt, It) => (ue, Te) => {
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
    Jt(ue, It.options, De) === !0 && (Oe.dndKit = {
      capturedBy: It.sensor
    }, bt.current = Te, Se(ue, It));
  }, [X, Se]), hr = i2(g, gu);
  c2(g), Bi(() => {
    Ct && D === Ln.Initializing && $(Ln.Initialized);
  }, [Ct, D]), C.useEffect(
    () => {
      const {
        onDragMove: Jt
      } = ht.current, {
        active: It,
        activatorEvent: ue,
        collisions: Te,
        over: Oe
      } = ze.current;
      if (!It || !ue)
        return;
      const Me = {
        active: It,
        activatorEvent: ue,
        collisions: Te,
        delta: {
          x: Hi.x,
          y: Hi.y
        },
        over: Oe
      };
      hs.unstable_batchedUpdates(() => {
        Jt?.(Me), T({
          type: "onDragMove",
          event: Me
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Hi.x, Hi.y]
  ), C.useEffect(
    () => {
      const {
        active: Jt,
        activatorEvent: It,
        collisions: ue,
        droppableContainers: Te,
        scrollAdjustedTranslate: Oe
      } = ze.current;
      if (!Jt || bt.current == null || !It || !Oe)
        return;
      const {
        onDragOver: Me
      } = ht.current, De = Te.get(Aa), ii = De && De.rect.current ? {
        id: De.id,
        rect: De.rect.current,
        data: De.data,
        disabled: De.disabled
      } : null, le = {
        active: Jt,
        activatorEvent: It,
        collisions: ue,
        delta: {
          x: Oe.x,
          y: Oe.y
        },
        over: ii
      };
      hs.unstable_batchedUpdates(() => {
        cr(ii), Me?.(le), T({
          type: "onDragOver",
          event: le
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Aa]
  ), Bi(() => {
    ze.current = {
      activatorEvent: Z,
      active: yt,
      activeNode: ct,
      collisionRect: gi,
      collisions: Yn,
      droppableRects: J,
      draggableNodes: X,
      draggingNode: Ei,
      draggingNodeRect: ji,
      droppableContainers: I,
      over: ki,
      scrollableAncestors: ti,
      scrollAdjustedTranslate: Hi
    }, nt.current = {
      initial: ji,
      translated: gi
    };
  }, [yt, ct, Yn, gi, X, Ei, ji, J, I, ki, ti, Hi]), Fw({
    ...Gt,
    delta: F,
    draggingRect: gi,
    pointerCoordinates: or,
    scrollableAncestors: ti,
    scrollableAncestorRects: cn
  });
  const bu = C.useMemo(() => ({
    active: yt,
    activeNode: ct,
    activeNodeRect: Ct,
    activatorEvent: Z,
    collisions: Yn,
    containerNodeRect: Ci,
    dragOverlay: me,
    draggableNodes: X,
    droppableContainers: I,
    droppableRects: J,
    over: ki,
    measureDroppableContainers: tt,
    scrollableAncestors: ti,
    scrollableAncestorRects: cn,
    measuringConfiguration: Q,
    measuringScheduled: dt,
    windowRect: $n
  }), [yt, ct, Ct, Z, Yn, Ci, me, X, I, J, ki, tt, ti, cn, Q, dt, $n]), Es = C.useMemo(() => ({
    activatorEvent: Z,
    activators: hr,
    active: yt,
    activeNodeRect: Ct,
    ariaDescribedById: {
      draggable: ft
    },
    dispatch: j,
    draggableNodes: X,
    over: ki,
    measureDroppableContainers: tt
  }), [Z, hr, yt, Ct, j, ft, X, ki, tt]);
  return Qe.createElement(F0.Provider, {
    value: R
  }, Qe.createElement(lu.Provider, {
    value: Es
  }, Qe.createElement(cb.Provider, {
    value: bu
  }, Qe.createElement(hb.Provider, {
    value: Ce
  }, v)), Qe.createElement(w2, {
    disabled: d?.restoreFocus === !1
  })), Qe.createElement(_w, {
    ...d,
    hiddenTextDescribedById: ft
  }));
  function js() {
    const Jt = Bt?.autoScrollEnabled === !1, It = typeof m == "object" ? m.enabled === !1 : m === !1, ue = G && !Jt && !It;
    return typeof m == "object" ? {
      ...m,
      enabled: ue
    } : {
      enabled: ue
    };
  }
}), N2 = /* @__PURE__ */ C.createContext(null), wg = "button", C2 = "Draggable";
function E2(s) {
  let {
    id: t,
    data: n,
    disabled: a = !1,
    attributes: r
  } = s;
  const u = Jl(C2), {
    activators: c,
    activatorEvent: d,
    active: m,
    activeNodeRect: v,
    ariaDescribedById: g,
    draggableNodes: b,
    over: x
  } = C.useContext(lu), {
    role: S = wg,
    roleDescription: w = "draggable",
    tabIndex: M = 0
  } = r ?? {}, N = m?.id === t, j = C.useContext(N ? hb : N2), [T, R] = Vo(), [D, $] = Vo(), G = h2(c, t), A = Hl(n);
  Bi(
    () => (b.set(t, {
      id: t,
      key: u,
      node: T,
      activatorNode: D,
      data: A
    }), () => {
      const F = b.get(t);
      F && F.key === u && b.delete(t);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [b, t]
  );
  const X = C.useMemo(() => ({
    role: S,
    tabIndex: M,
    "aria-disabled": a,
    "aria-pressed": N && S === wg ? !0 : void 0,
    "aria-roledescription": w,
    "aria-describedby": g.draggable
  }), [a, S, M, N, w, g.draggable]);
  return {
    active: m,
    activatorEvent: d,
    activeNodeRect: v,
    attributes: X,
    isDragging: N,
    listeners: a ? void 0 : G,
    node: T,
    over: x,
    setNodeRef: R,
    setActivatorNodeRef: $,
    transform: j
  };
}
function j2() {
  return C.useContext(cb);
}
const k2 = "Droppable", z2 = {
  timeout: 25
};
function T2(s) {
  let {
    data: t,
    disabled: n = !1,
    id: a,
    resizeObserverConfig: r
  } = s;
  const u = Jl(k2), {
    active: c,
    dispatch: d,
    over: m,
    measureDroppableContainers: v
  } = C.useContext(lu), g = C.useRef({
    disabled: n
  }), b = C.useRef(!1), x = C.useRef(null), S = C.useRef(null), {
    disabled: w,
    updateMeasurementsFor: M,
    timeout: N
  } = {
    ...z2,
    ...r
  }, j = Hl(M ?? a), T = C.useCallback(
    () => {
      if (!b.current) {
        b.current = !0;
        return;
      }
      S.current != null && clearTimeout(S.current), S.current = setTimeout(() => {
        v(Array.isArray(j.current) ? j.current : [j.current]), S.current = null;
      }, N);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [N]
  ), R = au({
    callback: T,
    disabled: w || !c
  }), D = C.useCallback((X, F) => {
    R && (F && (R.unobserve(F), b.current = !1), X && R.observe(X));
  }, [R]), [$, G] = Vo(D), A = Hl(t);
  return C.useEffect(() => {
    !R || !$.current || (R.disconnect(), b.current = !1, R.observe($.current));
  }, [$, R]), C.useEffect(
    () => (d({
      type: oe.RegisterDroppable,
      element: {
        id: a,
        key: u,
        disabled: n,
        node: $,
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
    n !== g.current.disabled && (d({
      type: oe.SetDroppableDisabled,
      id: a,
      key: u,
      disabled: n
    }), g.current.disabled = n);
  }, [a, u, n, d]), {
    active: c,
    rect: x,
    isOver: m?.id === a,
    node: $,
    over: m,
    setNodeRef: G
  };
}
function Gd(s, t, n) {
  const a = s.slice();
  return a.splice(n < 0 ? a.length + n : n, 0, a.splice(t, 1)[0]), a;
}
function O2(s, t) {
  return s.reduce((n, a, r) => {
    const u = t.get(a);
    return u && (n[r] = u), n;
  }, Array(s.length));
}
function No(s) {
  return s !== null && s >= 0;
}
function D2(s, t) {
  if (s === t)
    return !0;
  if (s.length !== t.length)
    return !1;
  for (let n = 0; n < s.length; n++)
    if (s[n] !== t[n])
      return !1;
  return !0;
}
function A2(s) {
  return typeof s == "boolean" ? {
    draggable: s,
    droppable: s
  } : s;
}
const Fl = (s) => {
  let {
    rects: t,
    activeIndex: n,
    overIndex: a,
    index: r
  } = s;
  const u = Gd(t, a, n), c = t[r], d = u[r];
  return !d || !c ? null : {
    x: d.left - c.left,
    y: d.top - c.top,
    scaleX: d.width / c.width,
    scaleY: d.height / c.height
  };
}, db = "Sortable", fb = /* @__PURE__ */ Qe.createContext({
  activeIndex: -1,
  containerId: db,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Fl,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function Kd(s) {
  let {
    children: t,
    id: n,
    items: a,
    strategy: r = Fl,
    disabled: u = !1
  } = s;
  const {
    active: c,
    dragOverlay: d,
    droppableRects: m,
    over: v,
    measureDroppableContainers: g
  } = j2(), b = Jl(db, n), x = d.rect !== null, S = C.useMemo(() => a.map((G) => typeof G == "object" && "id" in G ? G.id : G), [a]), w = c != null, M = c ? S.indexOf(c.id) : -1, N = v ? S.indexOf(v.id) : -1, j = C.useRef(S), T = !D2(S, j.current), R = N !== -1 && M === -1 || T, D = A2(u);
  Bi(() => {
    T && w && g(S);
  }, [T, S, w, g]), C.useEffect(() => {
    j.current = S;
  }, [S]);
  const $ = C.useMemo(
    () => ({
      activeIndex: M,
      containerId: b,
      disabled: D,
      disableTransforms: R,
      items: S,
      overIndex: N,
      useDragOverlay: x,
      sortedRects: O2(S, m),
      strategy: r
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [M, b, D.draggable, D.droppable, R, S, N, m, x, r]
  );
  return Qe.createElement(fb.Provider, {
    value: $
  }, t);
}
const R2 = (s) => {
  let {
    id: t,
    items: n,
    activeIndex: a,
    overIndex: r
  } = s;
  return Gd(n, a, r).indexOf(t);
}, L2 = (s) => {
  let {
    containerId: t,
    isSorting: n,
    wasDragging: a,
    index: r,
    items: u,
    newIndex: c,
    previousItems: d,
    previousContainerId: m,
    transition: v
  } = s;
  return !v || !a || d !== u && r === c ? !1 : n ? !0 : c !== r && t === m;
}, B2 = {
  duration: 200,
  easing: "ease"
}, mb = "transform", U2 = /* @__PURE__ */ ql.Transition.toString({
  property: mb,
  duration: 0,
  easing: "linear"
}), H2 = {
  roleDescription: "sortable"
};
function q2(s) {
  let {
    disabled: t,
    index: n,
    node: a,
    rect: r
  } = s;
  const [u, c] = C.useState(null), d = C.useRef(n);
  return Bi(() => {
    if (!t && n !== d.current && a.current) {
      const m = r.current;
      if (m) {
        const v = Ta(a.current, {
          ignoreTransform: !0
        }), g = {
          x: m.left - v.left,
          y: m.top - v.top,
          scaleX: m.width / v.width,
          scaleY: m.height / v.height
        };
        (g.x || g.y) && c(g);
      }
    }
    n !== d.current && (d.current = n);
  }, [t, n, a, r]), C.useEffect(() => {
    u && c(null);
  }, [u]), u;
}
function Q2(s) {
  let {
    animateLayoutChanges: t = L2,
    attributes: n,
    disabled: a,
    data: r,
    getNewIndex: u = R2,
    id: c,
    strategy: d,
    resizeObserverConfig: m,
    transition: v = B2
  } = s;
  const {
    items: g,
    containerId: b,
    activeIndex: x,
    disabled: S,
    disableTransforms: w,
    sortedRects: M,
    overIndex: N,
    useDragOverlay: j,
    strategy: T
  } = C.useContext(fb), R = $2(a, S), D = g.indexOf(c), $ = C.useMemo(() => ({
    sortable: {
      containerId: b,
      index: D,
      items: g
    },
    ...r
  }), [b, r, D, g]), G = C.useMemo(() => g.slice(g.indexOf(c)), [g, c]), {
    rect: A,
    node: X,
    isOver: F,
    setNodeRef: I
  } = T2({
    id: c,
    data: $,
    disabled: R.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: G,
      ...m
    }
  }), {
    active: it,
    activatorEvent: nt,
    activeNodeRect: yt,
    attributes: bt,
    setNodeRef: Bt,
    listeners: B,
    isDragging: Z,
    over: st,
    setActivatorNodeRef: ht,
    transform: ft
  } = E2({
    id: c,
    data: $,
    attributes: {
      ...H2,
      ...n
    },
    disabled: R.draggable
  }), k = uw(I, Bt), Q = !!it, J = Q && !w && No(x) && No(N), tt = !j && Z, dt = tt && J ? ft : null, Mt = J ? dt ?? (d ?? T)({
    rects: M,
    activeNodeRect: yt,
    activeIndex: x,
    overIndex: N,
    index: D
  }) : null, Gt = No(x) && No(N) ? u({
    id: c,
    items: g,
    activeIndex: x,
    overIndex: N
  }) : D, Tt = it?.id, Ct = C.useRef({
    activeId: Tt,
    items: g,
    newIndex: Gt,
    containerId: b
  }), Ci = g !== Ct.current.items, ze = t({
    active: it,
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
  }), Ui = q2({
    disabled: !ze,
    index: D,
    node: X,
    rect: A
  });
  return C.useEffect(() => {
    Q && Ct.current.newIndex !== Gt && (Ct.current.newIndex = Gt), b !== Ct.current.containerId && (Ct.current.containerId = b), g !== Ct.current.items && (Ct.current.items = g);
  }, [Q, Gt, b, g]), C.useEffect(() => {
    if (Tt === Ct.current.activeId)
      return;
    if (Tt != null && Ct.current.activeId == null) {
      Ct.current.activeId = Tt;
      return;
    }
    const Ei = setTimeout(() => {
      Ct.current.activeId = Tt;
    }, 50);
    return () => clearTimeout(Ei);
  }, [Tt]), {
    active: it,
    activeIndex: x,
    attributes: bt,
    data: $,
    rect: A,
    index: D,
    newIndex: Gt,
    items: g,
    isOver: F,
    isSorting: Q,
    isDragging: Z,
    listeners: B,
    node: X,
    overIndex: N,
    over: st,
    setNodeRef: k,
    setActivatorNodeRef: ht,
    setDroppableNodeRef: I,
    setDraggableNodeRef: Bt,
    transform: Ui ?? Mt,
    transition: me()
  };
  function me() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      Ui || // Or to prevent items jumping to back to their "new" position when items change
      Ci && Ct.current.newIndex === D
    )
      return U2;
    if (!(tt && !Bd(nt) || !v) && (Q || ze))
      return ql.Transition.toString({
        ...v,
        property: mb
      });
  }
}
function $2(s, t) {
  var n, a;
  return typeof s == "boolean" ? {
    draggable: s,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (n = s?.draggable) != null ? n : t.draggable,
    droppable: (a = s?.droppable) != null ? a : t.droppable
  };
}
Dt.Down, Dt.Right, Dt.Up, Dt.Left;
const pb = C.createContext(null);
function Y2({ source: s, children: t }) {
  return /* @__PURE__ */ p.jsx(pb.Provider, { value: s, children: t });
}
function Ni() {
  const s = C.useContext(pb);
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
function Lt() {
  return Ni().callService;
}
function V2() {
  const t = Ni().connection, n = (r) => t ? (t.addEventListener("ready", r), t.addEventListener("disconnected", r), t.addEventListener("reconnect-error", r), () => {
    t.removeEventListener("ready", r), t.removeEventListener("disconnected", r), t.removeEventListener("reconnect-error", r);
  }) : () => {
  }, a = () => !t || t.connected ? "live" : "reconnecting";
  return C.useSyncExternalStore(n, a);
}
function rt(s) {
  return s.split(".")[0];
}
function P(s) {
  return s.attributes.friendly_name || s.entity_id;
}
function pt(s) {
  return s.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ms(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toString() : s.toFixed(1).replace(/\.0$/, "");
}
function ds(s, t, n) {
  return Math.min(n, Math.max(t, s));
}
function ru(s, t = Date.now()) {
  if (!s) return "";
  const n = Date.parse(s);
  if (Number.isNaN(n)) return "";
  const a = Math.max(0, Math.round((t - n) / 1e3));
  if (a < 45) return "just now";
  const r = Math.round(a / 60);
  if (r < 60) return `${r}m ago`;
  const u = Math.round(r / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.round(u / 24);
  if (c < 7) return `${c}d ago`;
  const d = Math.round(c / 7);
  if (d < 5) return `${d}w ago`;
  const m = Math.round(c / 30);
  return m < 12 ? `${m}mo ago` : `${Math.round(c / 365)}y ago`;
}
function Et(s, t) {
  const n = s.attributes.supported_features;
  return n != null && (n & t) === t;
}
function Al() {
  return crypto.randomUUID();
}
const G2 = [
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
function vb(s) {
  return `heuristic:${s.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
}
function gb(s) {
  const t = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [n, a] of G2) if (t.includes(n)) return a;
  return "Home";
}
function K2(s) {
  const t = {};
  for (const n of Object.values(s)) {
    const a = gb(n);
    t[n.entity_id] = { areaId: vb(a), areaName: a, floorId: null, floorName: null };
  }
  return t;
}
const _g = /* @__PURE__ */ new WeakMap(), Sg = /* @__PURE__ */ new WeakMap(), Mg = /* @__PURE__ */ new WeakMap();
function bb(s) {
  let t = _g.get(s);
  return t || (t = X2(s), _g.set(s, t)), t;
}
async function X2(s) {
  const { connection: t } = s;
  if (!t) return null;
  try {
    const [n, a, r, u] = await Promise.all([
      t.sendMessagePromise({ type: "config/area_registry/list" }),
      t.sendMessagePromise({ type: "config/device_registry/list" }),
      t.sendMessagePromise({ type: "config/entity_registry/list" }),
      // Floors are newer; tolerate a server that doesn't know the command.
      t.sendMessagePromise({ type: "config/floor_registry/list" }).catch(() => [])
    ]);
    return { areas: n, devices: a, entities: r, floors: u };
  } catch {
    return null;
  }
}
function yb(s) {
  let t = Sg.get(s);
  return t || (t = Z2(s), Sg.set(s, t)), t;
}
async function Z2(s) {
  const t = await bb(s);
  if (!t) return K2(s.getStates());
  const { areas: n, devices: a, entities: r, floors: u } = t, c = /* @__PURE__ */ new Map();
  for (const w of u) c.set(w.floor_id, w.name || w.floor_id);
  const d = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map();
  for (const w of n)
    d.set(w.area_id, w.name || w.area_id), m.set(w.area_id, w.floor_id ?? null);
  const v = /* @__PURE__ */ new Map();
  for (const w of a) w.area_id && v.set(w.id, w.area_id);
  const g = (w) => {
    const M = m.get(w) ?? null;
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
    const M = gb(w);
    b[w.entity_id] = { areaId: vb(M), areaName: M, floorId: null, floorName: null };
  }
  return b;
}
function ou() {
  const s = Ni(), [t, n] = C.useState(void 0);
  return C.useEffect(() => {
    let a = !0;
    return yb(s).then((r) => {
      a && n(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
function xb(s) {
  let t = Mg.get(s);
  return t || (t = W2(s), Mg.set(s, t)), t;
}
async function W2(s) {
  const t = await bb(s);
  if (!t) return {};
  const n = {};
  for (const a of t.entities)
    n[a.entity_id] = {
      entityCategory: a.entity_category ?? null,
      hidden: a.hidden_by != null,
      disabled: a.disabled_by != null
    };
  return n;
}
function J2() {
  const s = Ni(), [t, n] = C.useState(void 0);
  return C.useEffect(() => {
    let a = !0;
    return xb(s).then((r) => {
      a && n(r);
    }), () => {
      a = !1;
    };
  }, [s]), t;
}
const I2 = [
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
], F2 = /\b(restart|reboot|identify|update|firmware|re-?index)\b/i, P2 = /* @__PURE__ */ new Set(["restart", "identify", "update"]);
function uu(s, t, n) {
  if (n && (n.entityCategory === "diagnostic" || n.entityCategory === "config" || n.hidden || n.disabled))
    return !1;
  for (const r of I2) if (r.test(s)) return !1;
  const a = rt(s);
  if (a === "button" || a === "switch") {
    const r = t?.attributes.device_class ?? void 0;
    if (r && P2.has(r)) return !1;
    const u = `${s} ${t ? P(t) : ""}`;
    if (F2.test(u)) return !1;
  }
  return !0;
}
function Pl(s, t, n) {
  return uu(s, t, n?.[s]);
}
const t_ = [
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
], e_ = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor", "binary_sensor", "humidifier", "siren"]), Ng = ["Living Room", "Kitchen", "Bedroom", "Office", "Bathroom", "Hallway", "Garage", "Outdoor", "Garden", "Home"];
function i_(s, t) {
  const n = t?.[s.entity_id];
  if (n) return n.areaName;
  const a = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [r, u] of t_) if (a.includes(r)) return u;
  return "Home";
}
function n_(s, t) {
  const n = t?.[s.entity_id];
  return n && !n.areaId.startsWith("heuristic:") ? n.areaId : null;
}
function s_(s) {
  const t = rt(s);
  return t === "media_player" || t === "sensor" ? 2 : 1;
}
function a_(s, t, n) {
  const a = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of Object.values(s)) {
    const d = rt(c.entity_id);
    if (!e_.has(d) || d === "sensor" && !c.attributes.unit_of_measurement || !uu(c.entity_id, c, n?.[c.entity_id])) continue;
    const m = i_(c, t);
    let v = a.get(m);
    v || (v = [], a.set(m, v)), v.push(c), r.has(m) || r.set(m, n_(c, t));
  }
  const u = [];
  for (const [c, d] of a) {
    const m = (T) => d.filter((R) => rt(R.entity_id) === T).sort((R, D) => P(R).localeCompare(P(D))), v = m("light"), g = m("climate"), b = m("media_player"), x = m("cover"), S = m("lock"), w = [...m("switch"), ...m("fan"), ...m("humidifier"), ...m("siren")], M = [...m("sensor"), ...m("binary_sensor")], N = [], j = (T, R, D, $) => {
      R.length && N.push({ id: Al(), type: T, title: $, entityIds: R, span: D });
    };
    g.length && j("hero", [g[0].entity_id], 2), j("group", v.map((T) => T.entity_id), 2, "Lighting");
    for (const T of b) j("card", [T.entity_id], 2);
    g.length > 1 && j("list", g.slice(1).map((T) => T.entity_id), 1, "Climate"), j("list", [...S, ...x].map((T) => T.entity_id), 1, "Security & doors"), j("group", w.map((T) => T.entity_id), 1, "Switches & fans"), j("list", M.map((T) => T.entity_id), 1, "Sensors"), N.length && u.push({ id: Al(), name: c, areaId: r.get(c) ?? null, blocks: N });
  }
  return u.sort((c, d) => {
    const m = Ng.indexOf(c.name), v = Ng.indexOf(d.name);
    return (m < 0 ? 99 : m) - (v < 0 ? 99 : v) || c.name.localeCompare(d.name);
  }), { version: 3, rooms: u, overrides: {} };
}
const Zo = "simui:dashboard:v2";
function Cg(s) {
  const t = s, n = s.span ?? t.size ?? 1, a = { ...s, span: n };
  return delete a.size, a;
}
function Eg(s) {
  const t = {};
  for (const [n, a] of Object.entries(s.overrides ?? {}))
    t[n] = { blocks: (a.blocks ?? []).map(Cg) };
  return {
    version: 3,
    overrides: t,
    rooms: (s.rooms ?? []).map((n) => ({ ...n, blocks: n.blocks.map(Cg) }))
  };
}
async function l_(s) {
  const t = s.connection;
  if (t)
    try {
      const n = await t.sendMessagePromise({ type: "frontend/get_user_data", key: Zo }), a = n?.value?.version;
      if (n && n.value && (a === 2 || a === 3)) return Eg(n.value);
    } catch {
    }
  try {
    const n = localStorage.getItem(Zo);
    if (n) {
      const a = JSON.parse(n), r = a.version;
      if (r === 2 || r === 3) return Eg(a);
    }
  } catch {
  }
  return null;
}
async function r_(s, t) {
  try {
    localStorage.setItem(Zo, JSON.stringify(t));
  } catch {
  }
  const n = s.connection;
  if (n)
    try {
      await n.sendMessagePromise({ type: "frontend/set_user_data", key: Zo, value: t });
    } catch {
    }
}
const o_ = (s) => s === 1 ? 2 : s === 2 ? "full" : 1, wb = C.createContext(null);
function Ss() {
  const s = C.useContext(wb);
  if (!s) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return s;
}
function u_(s) {
  const t = s.replace(/^\/+/, ""), [n, a] = t.split("/");
  return n === "category" && a ? { kind: "category", id: a } : n === "room" && a ? { kind: "room", id: a } : { kind: "home" };
}
function c_({ children: s }) {
  const t = Ni(), [n, a] = C.useState(null), [r, u] = C.useState({ kind: "home" }), [c, d] = C.useState(!1), [m, v] = C.useState(null), g = C.useRef(!1);
  C.useEffect(() => {
    let w = !0;
    return (async () => {
      const M = await l_(t), [N, j] = M ? [void 0, void 0] : await Promise.all([yb(t), xb(t)]), T = M ?? a_(t.getStates(), N, j);
      w && (a(T), g.current = !0);
    })(), () => {
      w = !1;
    };
  }, [t]), C.useEffect(() => {
    !g.current || !n || r_(t, n);
  }, [n, t]);
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
        const N = `category:${r.id}`, j = M.overrides?.[N];
        return j ? { ...M, overrides: { ...M.overrides, [N]: { blocks: w(j.blocks) } } } : M;
      }
      return M;
    });
  }, x = (w) => {
    d(!1), u(w), window.scrollTo?.(0, 0);
  }, S = {
    config: n,
    route: r,
    goHome: () => x({ kind: "home" }),
    openRoom: (w) => x({ kind: "room", id: w }),
    openCategory: (w) => x({ kind: "category", id: w }),
    navigate: (w) => x(u_(w)),
    editing: c,
    setEditing: d,
    reorderBlocks: (w, M) => b((N) => Gd(N, w, M)),
    removeBlock: (w) => b((M) => M.filter((N) => N.id !== w)),
    cycleBlockSpan: (w) => b((M) => M.map((N) => N.id === w ? { ...N, span: o_(N.span) } : N)),
    addCard: (w) => b((M) => [...M, { id: Al(), type: "card", entityIds: [w], span: s_(w) }]),
    createOverride: (w, M) => a(
      (N) => N && {
        ...N,
        overrides: {
          ...N.overrides ?? {},
          // Fresh stable ids so the snapshot doesn't depend on the volatile
          // preset id scheme.
          [`category:${w}`]: { blocks: M.map((j) => ({ ...j, id: Al() })) }
        }
      }
    ),
    resetOverride: (w) => a((M) => {
      if (!M?.overrides) return M;
      const N = { ...M.overrides };
      return delete N[`category:${w}`], { ...M, overrides: N };
    }),
    createHomeOverride: (w) => a(
      (M) => M && { ...M, overrides: { ...M.overrides ?? {}, home: { blocks: w.map((N) => ({ ...N, id: Al() })) } } }
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
  return /* @__PURE__ */ p.jsx(wb.Provider, { value: S, children: s });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _b = (...s) => s.filter((t, n, a) => !!t && t.trim() !== "" && a.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h_ = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d_ = (s) => s.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, a) => a ? a.toUpperCase() : n.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jg = (s) => {
  const t = d_(s);
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
const f_ = (s) => {
  for (const t in s)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, m_ = C.createContext({}), p_ = () => C.useContext(m_), v_ = C.forwardRef(
  ({ color: s, size: t, strokeWidth: n, absoluteStrokeWidth: a, className: r = "", children: u, iconNode: c, ...d }, m) => {
    const {
      size: v = 24,
      strokeWidth: g = 2,
      absoluteStrokeWidth: b = !1,
      color: x = "currentColor",
      className: S = ""
    } = p_() ?? {}, w = a ?? b ? Number(n ?? g) * 24 / Number(t ?? v) : n ?? g;
    return C.createElement(
      "svg",
      {
        ref: m,
        ...Uh,
        width: t ?? v ?? Uh.width,
        height: t ?? v ?? Uh.height,
        stroke: s ?? x,
        strokeWidth: w,
        className: _b("lucide", S, r),
        ...!u && !f_(d) && { "aria-hidden": "true" },
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
  const n = C.forwardRef(
    ({ className: a, ...r }, u) => C.createElement(v_, {
      ref: u,
      iconNode: t,
      className: _b(
        `lucide-${h_(jg(s))}`,
        `lucide-${s}`,
        a
      ),
      ...r
    })
  );
  return n.displayName = jg(s), n;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g_ = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], b_ = et("activity", g_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y_ = [
  ["circle", { cx: "12", cy: "13", r: "8", key: "3y4lt7" }],
  ["path", { d: "M5 3 2 6", key: "18tl5t" }],
  ["path", { d: "m22 6-3-3", key: "1opdir" }],
  ["path", { d: "M6.38 18.7 4 21", key: "17xu3x" }],
  ["path", { d: "M17.64 18.67 20 21", key: "kv2oe2" }],
  ["path", { d: "m9 13 2 2 4-4", key: "6343dt" }]
], x_ = et("alarm-clock-check", y_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w_ = [
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
], __ = et("bath", w_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S_ = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
], M_ = et("bed-double", S_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N_ = [
  ["path", { d: "M3 3h18", key: "o7r712" }],
  ["path", { d: "M20 7H8", key: "gd2fo2" }],
  ["path", { d: "M20 11H8", key: "1ynp89" }],
  ["path", { d: "M10 19h10", key: "19hjk5" }],
  ["path", { d: "M8 15h12", key: "1yqzne" }],
  ["path", { d: "M4 3v14", key: "fggqzn" }],
  ["circle", { cx: "4", cy: "19", r: "2", key: "p3m9r0" }]
], Zd = et("blinds", N_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C_ = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
], E_ = et("box", C_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j_ = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], k_ = et("briefcase", j_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z_ = [
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
], T_ = et("car", z_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O_ = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", key: "3zrzxg" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8", key: "g6cvee" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4", key: "1y1dii" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20", key: "xu2jvo" }]
], D_ = et("cast", O_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Wd = et("check", A_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R_ = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ps = et("chevron-down", R_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L_ = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Sb = et("chevron-left", L_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], U_ = et("chevron-right", B_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H_ = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], $l = et("chevron-up", H_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Q_ = et("circle-check", q_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
], Mb = et("circle-dot", $_);
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
], V_ = et("clapperboard", Y_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 19v1", key: "1dk2by" }],
  ["path", { d: "M8 14v1", key: "84yxot" }],
  ["path", { d: "M16 19v1", key: "v220m7" }],
  ["path", { d: "M16 14v1", key: "g12gj6" }],
  ["path", { d: "M12 21v1", key: "q8vafk" }],
  ["path", { d: "M12 16v1", key: "1mx6rx" }]
], K_ = et("cloud-drizzle", G_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 17H7", key: "pygtm1" }],
  ["path", { d: "M17 21H9", key: "1u2q02" }]
], Z_ = et("cloud-fog", X_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W_ = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", key: "1cez44" }],
  ["path", { d: "m13 12-3 5h4l-3 5", key: "1t22er" }]
], kg = et("cloud-lightning", W_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M8 19h.01", key: "puxtts" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
  ["path", { d: "M12 21h.01", key: "h35vbk" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }],
  ["path", { d: "M16 19h.01", key: "1vcnzz" }]
], Hh = et("cloud-snow", J_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I_ = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
], F_ = et("cloud-rain", I_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P_ = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Nb = et("cloud", P_);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tS = [
  ["path", { d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z", key: "44yre2" }],
  ["path", { d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61", key: "leugyv" }]
], eS = et("cloudy", tS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iS = [
  ["path", { d: "M10 12h.01", key: "1kxr2c" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14", key: "36qu9e" }],
  ["path", { d: "M2 20h20", key: "owomy5" }]
], nS = et("door-closed", iS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sS = [
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
], Cb = et("door-open", sS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aS = [
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
], lS = et("droplets", aS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rS = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      key: "484a7f"
    }
  ],
  ["path", { d: "M12 12v.01", key: "u5ubse" }]
], _a = et("fan", rS);
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
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
], uS = et("file-code", oS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cS = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], Eb = et("flame", cS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hS = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
], dS = et("gauge", hS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fS = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
], Jd = et("house", fS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], pS = et("info", mS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vS = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Wo = et("lightbulb", vS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], Oa = et("lock-open", gS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bS = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], vs = et("lock", bS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yS = [["path", { d: "M5 12h14", key: "1ays0h" }]], jb = et("minus", yS);
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
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], wS = et("moon", xS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _S = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], zg = et("octagon-alert", _S);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SS = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], kb = et("pause", SS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MS = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], Id = et("pencil", MS);
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
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Sa = et("play", NS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CS = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], tr = et("plus", CS);
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
], jS = et("power-off", ES);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kS = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], gs = et("power", kS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], TS = et("refresh-cw", zS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], zb = et("rotate-ccw", OS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DS = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], AS = et("server", DS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RS = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Tb = et("shield-check", RS);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], BS = et("shield", LS);
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
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], Ob = et("skip-back", US);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HS = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], Db = et("skip-forward", HS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qS = [
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
], QS = et("snowflake", qS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $S = [
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
], YS = et("sofa", $S);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VS = [
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
], GS = et("sparkles", VS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KS = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Ma = et("square", KS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XS = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Ho = et("sun", XS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZS = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], Na = et("thermometer", ZS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WS = [
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
], JS = et("trees", WS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IS = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Yl = et("triangle-alert", IS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FS = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
], PS = et("tv", FS);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
], eM = et("utensils", tM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], nM = et("video-off", iM);
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
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
], Ab = et("volume-2", sM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
], Rb = et("volume-x", aM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lM = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
], qo = et("wind", lM);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Lb = et("x", rM);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], uM = et("zap", oM);
function Bb(s, t, n) {
  const a = [], r = s.blocks.find((d) => d.type === "hero")?.entityIds[0], u = r ? n[r]?.attributes.current_temperature : void 0;
  if (u != null && a.push(`${Math.round(Number(u))}°`), t.length) {
    const d = t.filter((m) => n[m]?.state === "on").length;
    d && a.push(`${d} ${d === 1 ? "light" : "lights"} on`);
  }
  const c = s.blocks.flatMap((d) => d.entityIds).filter((d) => d.startsWith("lock."));
  if (c.length) {
    const d = c.filter((m) => n[m]?.state === "unlocked").length;
    a.push(d ? `${d} unlocked` : "all locked");
  }
  return a.join(" · ");
}
function Ub(s) {
  return s.blocks.flatMap((t) => t.entityIds).filter((t) => t.startsWith("light."));
}
function cM(s) {
  const t = s.toLowerCase();
  return t.includes("living") ? YS : t.includes("kitchen") ? eM : t.includes("bed") ? M_ : t.includes("office") ? k_ : t.includes("bath") ? __ : t.includes("hall") ? Cb : t.includes("garage") ? T_ : t.includes("outdoor") || t.includes("garden") ? JS : Jd;
}
function hM({ room: s, onOpen: t }) {
  const n = C.useMemo(() => Ub(s), [s]), a = C.useMemo(() => s.blocks.flatMap((g) => g.entityIds).filter((g) => g.startsWith("lock.")), [s]), r = C.useMemo(() => new Set(s.blocks.flatMap((g) => g.entityIds)).size, [s]), u = $e((g) => n.some((b) => g[b]?.state === "on")), c = $e((g) => a.some((b) => g[b]?.state === "unlocked")), d = $e((g) => Bb(s, n, g)), m = cM(s.name), v = u ? "warm" : c ? "amber" : "accent";
  return /* @__PURE__ */ p.jsxs("button", { className: `simui-roomcard${u ? " lit" : ""}`, onClick: t, children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-roomcard-top", children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-roomcard-icon ${v}`, children: /* @__PURE__ */ p.jsx(m, { size: 18, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx(U_, { className: "simui-roomcard-go", size: 16 })
    ] }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-roomcard-name", children: s.name }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-roomcard-glance num", children: d || `${r} ${r === 1 ? "device" : "devices"}` })
  ] });
}
function dM(s, t) {
  switch (s.action) {
    case "call-service": {
      const [n, a] = s.service.split(".");
      if (!n || !a) return;
      t.callService(
        n,
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
function er() {
  const s = Lt(), { navigate: t, openSheet: n } = Ss();
  return C.useCallback(
    (a, r) => {
      dM(a, { callService: s, entityId: r, navigate: t, openSheet: n });
    },
    [s, t, n]
  );
}
function ir(s) {
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
function nr(s) {
  return s ? (t) => {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), s());
  } : void 0;
}
function fM({ children: s }) {
  return /* @__PURE__ */ p.jsx("div", { className: "simui-strip", children: s });
}
function mM({
  label: s,
  count: t,
  iconOn: n,
  iconOff: a,
  activeColor: r = "warm",
  onTap: u
}) {
  const c = t > 0, d = c ? { "--pill-accent": ir(r) } : void 0;
  return /* @__PURE__ */ p.jsxs(
    "button",
    {
      type: "button",
      className: `simui-pill-count${c ? " is-active" : ""}`,
      style: d,
      onClick: u,
      onKeyDown: nr(u),
      "aria-label": `${t} ${s}`,
      "aria-pressed": c,
      disabled: !u,
      children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-ic", children: c ? n : a }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-num", children: t }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function pM({
  label: s,
  icon: t,
  accent: n = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": ir(n) };
  return /* @__PURE__ */ p.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-nav",
      style: r,
      onClick: a,
      onKeyDown: nr(a),
      "aria-label": s,
      disabled: !a,
      children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-ic", children: t }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-label", children: s })
      ]
    }
  );
}
function vM({
  icon: s,
  label: t,
  accent: n = "accent",
  onTap: a
}) {
  const r = { "--pill-accent": ir(n) };
  return /* @__PURE__ */ p.jsx(
    "button",
    {
      type: "button",
      className: "simui-pill-action",
      style: r,
      onClick: a,
      onKeyDown: nr(a),
      "aria-label": t,
      title: t,
      disabled: !a,
      children: /* @__PURE__ */ p.jsx("span", { className: "simui-pill-ic", children: s })
    }
  );
}
function gM({
  label: s,
  icon: t,
  accent: n = "warn",
  visible: a
}) {
  if (!a) return null;
  const r = { "--pill-accent": ir(n) };
  return /* @__PURE__ */ p.jsxs("span", { className: "simui-pill-badge", style: r, children: [
    t && /* @__PURE__ */ p.jsx("span", { className: "simui-pill-ic", children: t }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-pill-label", children: s })
  ] });
}
function bM({
  entity: s,
  primary: t,
  secondary: n,
  icon: a,
  activeColor: r = "accent",
  onTap: u
}) {
  const c = ke(s), d = !!c && c.state !== "off" && c.state !== "unavailable" && c.state !== "unknown" && c.state !== "", m = d ? { "--pill-accent": ir(r) } : void 0, v = t ?? (c ? pt(c.state) : "—"), g = n ?? (c ? P(c) : s), b = `simui-pill-status${d ? " is-active" : ""}${u ? " is-clickable" : ""}`, x = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    a && /* @__PURE__ */ p.jsx("span", { className: `simui-pill-ic${d ? " is-on" : ""}`, children: a }),
    /* @__PURE__ */ p.jsxs("span", { className: "simui-pill-status-body", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-pill-status-primary", children: v }),
      g != null && g !== "" && /* @__PURE__ */ p.jsx("span", { className: "simui-pill-status-secondary", children: g })
    ] })
  ] });
  return u ? /* @__PURE__ */ p.jsx("button", { type: "button", className: b, style: m, onClick: u, onKeyDown: nr(u), children: x }) : /* @__PURE__ */ p.jsx("div", { className: b, style: m, children: x });
}
function yM({
  entity: s,
  name: t,
  onTap: n
}) {
  const a = ke(s), r = t ?? (a ? P(a) : s), u = a && a.state !== "unavailable" && a.state !== "unknown" ? pt(a.state) : "—";
  return /* @__PURE__ */ p.jsxs(
    "button",
    {
      type: "button",
      className: "simui-pill-select",
      onClick: n,
      onKeyDown: nr(n),
      "aria-label": `${r}: ${u}`,
      disabled: !n,
      children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-select-name", children: r }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-select-value", children: u }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-pill-select-caret", children: /* @__PURE__ */ p.jsx(ps, { size: 13, strokeWidth: 2 }) })
      ]
    }
  );
}
const Hb = {
  lightbulb: Wo,
  thermostat: Na,
  thermometer: Na,
  cast: D_,
  tv: PS,
  shield: BS,
  activity: b_,
  zap: uM,
  sparkles: GS,
  server: AS,
  fan: _a,
  "lock-open": Oa,
  lock: vs,
  "power-off": jS,
  power: gs,
  "alert-triangle": Yl,
  "alert-octagon": zg,
  "alert-octagon-2": zg,
  box: E_,
  blinds: Zd,
  gauge: dS,
  home: Jd
};
function Ca(s, t = 15) {
  const n = s && Hb[s] || Mb;
  return /* @__PURE__ */ p.jsx(n, { size: t, strokeWidth: 2 });
}
function xM(s) {
  return Hb[s] || Mb;
}
const wM = [
  { id: "lights", name: "Lights", icon: "lightbulb", accent: "warm", present: (s) => pi(s, "light") },
  { id: "climate", name: "Climate", icon: "thermostat", accent: "accent", present: (s) => pi(s, "climate") || pi(s, "humidifier") },
  { id: "media", name: "Media", icon: "cast", accent: "accent", present: (s) => pi(s, "media_player") },
  { id: "security", name: "Security", icon: "shield", accent: "up", present: (s) => pi(s, "lock") || pi(s, "alarm_control_panel") || _M(s, "door", "window", "motion") },
  { id: "sensors", name: "Sensors", icon: "activity", accent: "up", present: (s) => SM(s) || pi(s, "binary_sensor") },
  { id: "power", name: "Power", icon: "zap", accent: "warn", present: (s) => MM(s) },
  { id: "scenes", name: "Scenes", icon: "sparkles", accent: "accent", present: (s) => pi(s, "scene") || pi(s, "script") },
  { id: "server", name: "System", icon: "server", accent: "up", present: (s) => NM(s) }
];
function pi(s, t) {
  return ar(s, (n) => rt(n.entity_id) === t && ae(n));
}
function _M(s, ...t) {
  return ar(s, (n) => rt(n.entity_id) === "binary_sensor" && t.includes(n.attributes.device_class));
}
function SM(s) {
  return ar(s, (t) => rt(t.entity_id) === "sensor" && t.attributes.unit_of_measurement != null && ae(t));
}
function MM(s) {
  return ar(s, (t) => rt(t.entity_id) === "sensor" && (t.attributes.device_class === "power" || t.attributes.device_class === "energy"));
}
function NM(s) {
  return ar(s, (t) => /docker|proxmox|container|zfs|truenas|\bnas\b|\bpbs\b|server/i.test(`${t.entity_id} ${P(t)}`));
}
function qb(s) {
  const { states: t } = s, n = { blocks: [] }, a = [];
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
    visibleWhen: CM(t, (x) => rt(x.entity_id) === "lock", "unlocked")
  });
  const r = Object.values(t).find((x) => rt(x.entity_id) === "weather" && ae(x));
  r && a.push({ kind: "status", entityId: r.entity_id, stateContent: ["state"] }), a.length && (n.statusStrip = a);
  const u = Object.values(t).find(
    (x) => rt(x.entity_id) === "cover" && /garage|door|gate/i.test(P(x))
  );
  u && n.blocks.push({
    id: zt("home-alert"),
    type: "hero",
    title: P(u),
    entityIds: [u.entity_id],
    span: "full",
    visibleWhen: { entity: u.entity_id, state: "open" }
  });
  const c = Object.values(t).filter((x) => (rt(x.entity_id) === "scene" || rt(x.entity_id) === "script") && ae(x)).map((x) => x.entity_id);
  c.length && n.blocks.push({
    id: zt("home-scenes"),
    type: "group",
    title: "Scenes",
    axis: "function",
    entityIds: c.slice(0, 8),
    span: "full"
  });
  const d = wM.filter((x) => x.present(t));
  n.blocks.push({
    id: zt("home-launcher"),
    type: "group",
    title: "Everything",
    axis: "none",
    entityIds: d.map((x) => `category.${x.id}`),
    span: "full"
  });
  const m = [], v = (x) => {
    const S = Object.values(t).find(x);
    S && m.push(S.entity_id);
  };
  v((x) => rt(x.entity_id) === "sensor" && x.attributes.device_class === "power" && /house|home|total|load|consumption/i.test(P(x))), v((x) => rt(x.entity_id) === "sensor" && /sol(ar)?|pv|generation/i.test(P(x)) && x.attributes.unit_of_measurement != null), v((x) => rt(x.entity_id) === "sensor" && x.attributes.device_class === "battery");
  const g = Object.values(t).find((x) => /washer|dryer|dishwasher|laundry/i.test(P(x)) && ae(x));
  g && m.push(g.entity_id), m.length && n.blocks.push({
    id: zt("home-live"),
    type: "group",
    title: "Live status",
    axis: "function",
    entityIds: m,
    span: 2
  });
  const b = Object.values(t).find((x) => rt(x.entity_id) === "alarm_control_panel" && ae(x));
  if (b)
    n.blocks.push({
      id: zt("home-security"),
      type: "hero",
      title: P(b),
      entityIds: [b.entity_id],
      span: "full"
    });
  else {
    const x = Object.values(t).filter((S) => rt(S.entity_id) === "lock" && ae(S)).map((S) => S.entity_id);
    x.length && n.blocks.push({
      id: zt("home-locks"),
      type: "list",
      title: "Security & doors",
      axis: "none",
      entityIds: x,
      span: 1
    });
  }
  return n;
}
function CM(s, t, n) {
  const a = Object.values(s).find(t);
  return { entity: a ? a.entity_id : "unknown.none", state: n };
}
const EM = 6;
function Tg(s, t) {
  const n = `${s} ${t}`.toLowerCase();
  return /group|all\b|_lights\b|\blights$/.test(n);
}
function Og(s) {
  const t = s.filter((a) => Tg(a.id, a.name)), n = s.filter((a) => !Tg(a.id, a.name));
  return [...t, ...n].map((a) => a.id);
}
function jM(s) {
  const { states: t, areas: n, registry: a } = s, r = Object.values(t).filter(
    (c) => c.entity_id.startsWith("light.") && Pl(c.entity_id, c, a)
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
  ], r.length <= EM) {
    const c = Og(r.map((d) => ({ id: d.entity_id, name: P(d) })));
    return u.blocks.push(Dg("Lights", c, "full")), u;
  }
  for (const [c, d] of Wb(r, n)) {
    const m = Og(d.map((v) => ({ id: v.entity_id, name: P(v) })));
    m.length && u.blocks.push(Dg(c, m, 2));
  }
  return u;
}
function Dg(s, t, n) {
  return { id: zt("lights"), type: "group", title: s, axis: "room", tile: "slider", entityIds: t, span: n };
}
function kM(s) {
  return s.find((n) => /master|whole|home|main|house|hvac/i.test(P(n))) ?? s[0];
}
function zM(s, t, n) {
  const a = [], r = Object.values(s).filter(
    (u) => Zb(u) && u.attributes.device_class === "temperature" && Pl(u.entity_id, u, n)
  ).slice(0, 4);
  for (const u of r)
    a.push({ entity: u.entity_id, name: qn(u), fill: "line", strokeWidth: 2 });
  if (!a.length)
    for (const u of t.slice(0, 3))
      a.push({ entity: u.entity_id, name: qn(u), fill: "line", strokeWidth: 2 });
  return a;
}
function TM(s) {
  const { states: t, registry: n } = s, a = Hn(t, "climate", n).filter(ae), r = Hn(t, "humidifier", n).filter(ae), u = { blocks: [] };
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
    const d = kM(a);
    u.blocks.push({
      id: zt("climate-hero"),
      type: "hero",
      title: qn(d),
      entityIds: [d.entity_id],
      span: "full"
    });
    const m = a.filter((v) => v.entity_id !== d.entity_id);
    m.length && u.blocks.push({
      id: zt("climate-zones"),
      type: "group",
      title: "Zones",
      axis: "function",
      entityIds: m.map((v) => v.entity_id),
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
  const c = zM(t, a, n);
  if (c.length) {
    const d = {
      title: "Temperature trend",
      window: { value: 72, unit: "h" },
      bucket: "hour",
      reducer: "mean",
      backend: "history",
      header: { showCurrent: !0, colorize: !0 },
      axes: [{ id: "temp" }],
      series: c.map((m) => ({ ...m, axisId: "temp" })),
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
      entityIds: c.map((m) => m.entity),
      span: "full",
      chart: d
    });
  }
  return u;
}
const OM = 8, Qb = [
  { key: "temperature", title: "Temperature", classes: ["temperature"], units: ["°C", "°F"] },
  { key: "humidity", title: "Humidity", classes: ["humidity"], units: ["%"] },
  { key: "air", title: "Air quality", classes: ["pm25", "pm10", "pm1", "co2", "carbon_dioxide", "volatile_organic_compounds", "aqi", "nitrogen_dioxide", "ozone"] },
  { key: "pressure", title: "Pressure", classes: ["pressure", "atmospheric_pressure"] },
  { key: "illuminance", title: "Light level", classes: ["illuminance"] },
  { key: "battery", title: "Battery", classes: ["battery"] },
  { key: "signal", title: "Signal", classes: ["signal_strength"] }
];
function DM(s) {
  const t = s.attributes.device_class, n = s.attributes.unit_of_measurement;
  for (const a of Qb) {
    if (t && a.classes.includes(t)) return { key: a.key, title: a.title };
    if (!t && n && a.units?.includes(n)) return { key: a.key, title: a.title };
  }
}
function AM(s) {
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
function RM(s) {
  const { states: t, areas: n, registry: a } = s, r = (g) => Pl(g.entity_id, g, a), u = Object.values(t).filter((g) => Zb(g) && r(g)), c = Object.values(t).filter(
    (g) => rt(g.entity_id) === "binary_sensor" && ae(g) && r(g)
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
  const m = /* @__PURE__ */ new Map(), v = [];
  for (const g of u) {
    const b = DM(g);
    if (!b) {
      v.push(g);
      continue;
    }
    let x = m.get(b.key);
    x || (x = { title: b.title, ents: [] }, m.set(b.key, x)), x.ents.push(g);
  }
  if (u.length >= OM) {
    const g = ["temperature", "humidity", "air"];
    for (const b of g) {
      const x = m.get(b);
      !x || x.ents.length < 2 || d.blocks.push(LM(x.title, b, x.ents.slice(0, 6)));
    }
  }
  for (const g of Qb) {
    const b = m.get(g.key);
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
      d.blocks.push(Ag("Status", c.map((g) => g.entity_id)));
    else
      for (const [g, b] of Wb(c, n))
        d.blocks.push(Ag(g, b.map((x) => x.entity_id)));
  return d;
}
function LM(s, t, n) {
  const a = AM(t), r = n.map((c, d) => ({
    entity: c.entity_id,
    name: qn(c),
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
    entityIds: n.map((c) => c.entity_id),
    span: "full",
    chart: u
  };
}
function Ag(s, t) {
  return {
    id: zt("sensors-binary"),
    type: "list",
    title: s,
    axis: "room",
    entityIds: t,
    span: 1
  };
}
const BM = /* @__PURE__ */ new Set(["W", "kW"]), UM = /* @__PURE__ */ new Set(["Wh", "kWh", "MWh"]);
function HM(s) {
  if (rt(s.entity_id) !== "sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class, n = s.attributes.unit_of_measurement;
  return t === "power" || t === "energy" || !!n && (BM.has(n) || UM.has(n));
}
function jl(s, t) {
  return t.test(`${s.entity_id} ${P(s)}`);
}
function qM(s) {
  return jl(s, /sol(ar)?|pv|generation|inverter/i) ? "solar" : jl(s, /batt(ery)?|soc|state_of_charge/i) ? "battery" : jl(s, /grid|import|export|mains|utility/i) ? "grid" : jl(s, /house|home|total|load|consumption|whole/i) ? "load" : "circuit";
}
function QM(s) {
  const { states: t, registry: n } = s, a = (N) => Pl(N.entity_id, N, n), r = Object.values(t).filter((N) => HM(N) && a(N)), u = { blocks: [] };
  if (!r.length) return u;
  const c = /* @__PURE__ */ new Map();
  for (const N of r) {
    const j = qM(N);
    let T = c.get(j);
    T || (T = [], c.set(j, T)), T.push(N);
  }
  const d = c.get("solar") ?? [], m = c.get("battery") ?? [], v = c.get("grid") ?? [], g = c.get("load") ?? [], b = c.get("circuit") ?? [], x = [];
  g.length && x.push({ kind: "status", entityId: g[0].entity_id, stateContent: ["state"] }), d.length && x.push({ kind: "status", entityId: d[0].entity_id, stateContent: ["state"] }), m.length && x.push({ kind: "status", entityId: m[0].entity_id, stateContent: ["state"] }), x.length && (u.statusStrip = x);
  const S = [];
  d.length && S.push({ entity: d[0].entity_id, name: qn(d[0]), fill: "area", color: "var(--up)", opacity: 0.25, strokeWidth: 2, axisId: "power" });
  const w = g[0] ?? v[0];
  if (w && S.push({ entity: w.entity_id, name: qn(w), fill: "line", color: "var(--warn)", strokeWidth: 2, axisId: "power" }), m.length && S.push({ entity: m[0].entity_id, name: qn(m[0]), fill: "line", color: "var(--accent)", strokeWidth: 1, axisId: "battery" }), S.length) {
    const N = [{ id: "power" }];
    m.length && N.push({ id: "battery", min: 0, max: 100, opposite: !0 });
    const j = {
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
      chart: j
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
    (N) => (rt(N.entity_id) === "switch" || rt(N.entity_id) === "input_boolean") && ae(N) && a(N) && (N.attributes.device_class === "outlet" || jl(N, /outlet|plug|gpo|socket/i))
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
function bs({
  value: s,
  since: t,
  tone: n = "muted"
}) {
  const a = t ? ru(t) : "";
  return /* @__PURE__ */ p.jsxs("span", { className: `simui-state${n !== "muted" ? ` ${n}` : ""}`, children: [
    s,
    a && /* @__PURE__ */ p.jsxs("span", { className: "simui-since", children: [
      " · ",
      a
    ] })
  ] });
}
const Ai = 8;
function Jo({ items: s, x: t, y: n, onClose: a, header: r }) {
  const u = C.useRef(null), [c, d] = C.useState({ x: t, y: n }), [m, v] = C.useState(-1), g = s.map((w, M) => w.disabled ? -1 : M).filter((w) => w >= 0);
  C.useLayoutEffect(() => {
    const w = u.current;
    if (!w) return;
    const { width: M, height: N } = w.getBoundingClientRect(), j = window.innerWidth, T = window.innerHeight;
    let R = t, D = n;
    R + M > j - Ai && (R = Math.max(Ai, j - M - Ai)), D + N > T - Ai && (D = Math.max(Ai, T - N - Ai)), R < Ai && (R = Ai), D < Ai && (D = Ai), d({ x: R, y: D });
  }, [t, n, s.length]), C.useEffect(() => {
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
        const j = (N + w + g.length) % g.length;
        return g[j];
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
        w.preventDefault(), m >= 0 && s[m] && b(s[m]);
        break;
      case "Tab":
        w.preventDefault(), x(w.shiftKey ? -1 : 1);
        break;
    }
  };
  return hs.createPortal(
    // Wrap in `simui-root` so the scoped CSS applies even though we portal to
    // <body> (outside the app's React tree) — matching Sheet.tsx's pattern.
    /* @__PURE__ */ p.jsxs(
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
          r && /* @__PURE__ */ p.jsx("div", { className: "simui-ctxhead", onKeyDown: (w) => w.stopPropagation(), children: r }),
          r && s.length > 0 && /* @__PURE__ */ p.jsx("div", { className: "simui-ctxsep", role: "separator" }),
          s.map((w, M) => /* @__PURE__ */ p.jsxs("div", { role: "presentation", className: "simui-ctxgroup", children: [
            w.separator && M > 0 && /* @__PURE__ */ p.jsx("div", { className: "simui-ctxsep", role: "separator" }),
            /* @__PURE__ */ p.jsxs(
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
                  w.icon != null && /* @__PURE__ */ p.jsx("span", { className: "simui-ctxic", children: w.icon }),
                  /* @__PURE__ */ p.jsx("span", { className: "simui-ctxlabel", children: w.label })
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
const Rg = { open: !1, x: 0, y: 0 }, $M = 480, Lg = 10;
function Fd() {
  const [s, t] = C.useState(Rg), n = C.useRef(null), a = C.useRef(null), r = C.useCallback(() => {
    n.current != null && (clearTimeout(n.current), n.current = null), a.current = null;
  }, []), u = C.useCallback(() => t(Rg), []), c = C.useCallback((b, x) => t({ open: !0, x: b, y: x }), []), d = C.useCallback(
    (b) => {
      b.preventDefault(), b.stopPropagation(), c(b.clientX, b.clientY);
    },
    [c]
  ), m = C.useCallback(
    (b) => {
      const x = b.touches[0];
      x && (a.current = { x: x.clientX, y: x.clientY }, r(), n.current = setTimeout(() => {
        n.current = null, a.current && c(a.current.x, a.current.y);
      }, $M));
    },
    [r, c]
  ), v = C.useCallback(
    (b) => {
      const x = b.touches[0];
      if (!x || !a.current) return;
      const S = Math.abs(x.clientX - a.current.x), w = Math.abs(x.clientY - a.current.y);
      (S > Lg || w > Lg) && r();
    },
    [r]
  );
  C.useEffect(() => r, [r]);
  const g = {
    onContextMenu: d,
    onTouchStart: m,
    onTouchMove: v,
    onTouchEnd: r,
    onTouchCancel: r
  };
  return {
    open: s.open,
    menuProps: g,
    onContextMenu: d,
    onTouchStart: m,
    position: s.open ? { x: s.x, y: s.y } : null,
    openAt: c,
    close: u
  };
}
function sr({ entity: s, features: t }) {
  return t.length ? /* @__PURE__ */ p.jsx("div", { className: "simui-feats", children: t.map((n, a) => /* @__PURE__ */ p.jsx(YM, { entity: s, feature: n }, `${n.type}-${a}`)) }) : null;
}
function YM({ entity: s, feature: t }) {
  switch (t.type) {
    case "cover-open-close":
      return /* @__PURE__ */ p.jsx(VM, { entity: s });
    case "climate-hvac-modes":
      return /* @__PURE__ */ p.jsx(KM, { entity: s, modes: t.modes, style: t.style });
    case "climate-fan-modes":
      return /* @__PURE__ */ p.jsx(XM, { entity: s });
    case "target-temperature":
      return /* @__PURE__ */ p.jsx(ZM, { entity: s });
    case "fan-speed":
      return /* @__PURE__ */ p.jsx(WM, { entity: s });
    case "fan-oscillate":
      return /* @__PURE__ */ p.jsx(JM, { entity: s });
    case "lock-commands":
      return /* @__PURE__ */ p.jsx(IM, { entity: s });
    case "alarm-modes":
      return /* @__PURE__ */ p.jsx(tN, { entity: s, modes: t.modes });
  }
}
const Co = { OPEN: 1, CLOSE: 2 };
function VM({ entity: s }) {
  const t = Lt(), n = s.attributes.supported_features ?? 0, a = s.state === "opening" || s.state === "closing", r = (u) => {
    t("cover", u, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-controls", children: [
    (n & Co.OPEN) === Co.OPEN && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => r("open_cover"), children: /* @__PURE__ */ p.jsx($l, { size: 15, strokeWidth: 2 }) }),
    /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", disabled: !a, onClick: () => r("stop_cover"), children: /* @__PURE__ */ p.jsx(Ma, { size: 12, strokeWidth: 2 }) }),
    (n & Co.CLOSE) === Co.CLOSE && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => r("close_cover"), children: /* @__PURE__ */ p.jsx(ps, { size: 15, strokeWidth: 2 }) })
  ] });
}
const GM = {
  heat: Eb,
  cool: QS,
  heat_cool: Ho,
  auto: Ho,
  dry: Ho,
  fan_only: _a,
  off: gs
};
function KM({
  entity: s,
  modes: t,
  style: n
}) {
  const a = Lt(), r = (u) => {
    a("climate", "set_hvac_mode", { hvac_mode: u }, { entity_id: s.entity_id });
  };
  return n === "dropdown" ? /* @__PURE__ */ p.jsx(
    $b,
    {
      value: s.state,
      options: t,
      ariaLabel: "HVAC mode",
      onSelect: r
    }
  ) : /* @__PURE__ */ p.jsx("div", { className: "simui-seg", role: "group", "aria-label": "HVAC mode", children: t.map((u) => {
    const c = GM[u] ?? gs, d = s.state === u;
    return /* @__PURE__ */ p.jsx(
      "button",
      {
        className: `simui-segbtn${d ? " is-active" : ""}`,
        "aria-pressed": d,
        "aria-label": pt(u),
        title: pt(u),
        onClick: () => r(u),
        children: n === "icons" ? /* @__PURE__ */ p.jsx(c, { size: 14, strokeWidth: 2 }) : pt(u)
      },
      u
    );
  }) });
}
function XM({ entity: s }) {
  const t = Lt(), n = s.attributes.fan_modes ?? [], a = s.attributes.fan_mode;
  return n.length ? /* @__PURE__ */ p.jsx(
    $b,
    {
      value: a ?? "",
      options: n,
      ariaLabel: "Fan mode",
      onSelect: (r) => {
        t("climate", "set_fan_mode", { fan_mode: r }, { entity_id: s.entity_id });
      }
    }
  ) : null;
}
function ZM({ entity: s }) {
  const t = Lt(), n = s.attributes, a = n.temperature, r = n.target_temp_step ?? 0.5, u = n.min_temp ?? 7, c = n.max_temp ?? 35;
  if (a == null) return null;
  const d = (m) => {
    const v = ds(Math.round((a + m) / r) * r, u, c);
    t("climate", "set_temperature", { temperature: v }, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-step", children: [
    /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => d(-r), children: /* @__PURE__ */ p.jsx(jb, { size: 14, strokeWidth: 2.5 }) }),
    /* @__PURE__ */ p.jsxs("span", { className: "simui-target", children: [
      eN(a),
      "°"
    ] }),
    /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => d(r), children: /* @__PURE__ */ p.jsx(tr, { size: 14, strokeWidth: 2.5 }) })
  ] });
}
function WM({ entity: s }) {
  const t = Lt(), n = s.attributes.percentage ?? 0, a = s.attributes.percentage_step, r = a && a > 0 ? a : 1, u = {
    background: `linear-gradient(to right, var(--accent) ${n}%, var(--faint) ${n}%)`
  };
  return /* @__PURE__ */ p.jsx(
    "input",
    {
      className: "simui-slider",
      type: "range",
      min: 0,
      max: 100,
      step: r,
      value: n,
      "aria-label": "Fan speed",
      style: u,
      onChange: (c) => {
        t("fan", "set_percentage", { percentage: Number(c.target.value) }, { entity_id: s.entity_id });
      }
    }
  );
}
function JM({ entity: s }) {
  const t = Lt(), n = !!s.attributes.oscillating;
  return /* @__PURE__ */ p.jsxs(
    "button",
    {
      className: `simui-ftoggle${n ? " is-active" : ""}`,
      role: "switch",
      "aria-checked": n,
      "aria-label": "Oscillate",
      onClick: () => {
        t("fan", "oscillate", { oscillating: !n }, { entity_id: s.entity_id });
      },
      children: [
        /* @__PURE__ */ p.jsx(_a, { size: 14, strokeWidth: 2 }),
        /* @__PURE__ */ p.jsx("span", { children: "Oscillate" })
      ]
    }
  );
}
function IM({ entity: s }) {
  const t = Lt(), n = s.state === "locked", a = s.state === "locking" || s.state === "unlocking", r = (u) => {
    t("lock", u, void 0, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-seg", role: "group", "aria-label": "Lock", children: [
    /* @__PURE__ */ p.jsxs(
      "button",
      {
        className: `simui-segbtn${n ? " is-active" : ""}`,
        "aria-pressed": n,
        disabled: a,
        onClick: () => r("lock"),
        children: [
          /* @__PURE__ */ p.jsx(vs, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ p.jsx("span", { children: "Lock" })
        ]
      }
    ),
    /* @__PURE__ */ p.jsxs(
      "button",
      {
        className: `simui-segbtn${n ? "" : " is-active"}`,
        "aria-pressed": !n,
        disabled: a,
        onClick: () => r("unlock"),
        children: [
          /* @__PURE__ */ p.jsx(Oa, { size: 14, strokeWidth: 2 }),
          /* @__PURE__ */ p.jsx("span", { children: "Unlock" })
        ]
      }
    )
  ] });
}
const FM = {
  disarmed: "alarm_disarm",
  armed_home: "alarm_arm_home",
  armed_away: "alarm_arm_away",
  armed_night: "alarm_arm_night",
  armed_vacation: "alarm_arm_vacation",
  armed_custom_bypass: "alarm_arm_custom_bypass"
}, PM = {
  disarmed: "Disarm",
  armed_home: "Home",
  armed_away: "Away",
  armed_night: "Night",
  armed_vacation: "Vacation",
  armed_custom_bypass: "Custom"
};
function tN({ entity: s, modes: t }) {
  const n = Lt();
  return /* @__PURE__ */ p.jsx("div", { className: "simui-seg", role: "group", "aria-label": "Alarm mode", children: t.map((a) => {
    const r = FM[a];
    if (!r) return null;
    const u = s.state === a;
    return /* @__PURE__ */ p.jsx(
      "button",
      {
        className: `simui-segbtn${u ? " is-active" : ""}`,
        "aria-pressed": u,
        onClick: () => {
          n("alarm_control_panel", r, void 0, { entity_id: s.entity_id });
        },
        children: PM[a] ?? pt(a)
      },
      a
    );
  }) });
}
function $b({
  value: s,
  options: t,
  ariaLabel: n,
  onSelect: a
}) {
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-fsel-wrap", children: [
    /* @__PURE__ */ p.jsx(
      "select",
      {
        className: "simui-fsel",
        "aria-label": n,
        value: s,
        onChange: (r) => a(r.target.value),
        children: t.map((r) => /* @__PURE__ */ p.jsx("option", { value: r, children: pt(r) }, r))
      }
    ),
    /* @__PURE__ */ p.jsx(ps, { className: "simui-fsel-caret", size: 13, strokeWidth: 2 })
  ] });
}
function eN(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const iN = /* @__PURE__ */ new Set(["light", "climate", "cover", "fan", "lock", "alarm_control_panel"]);
function Vl(s) {
  return iN.has(rt(s));
}
function Gl({ entityId: s, compact: t }) {
  const n = ke(s);
  if (!n) return null;
  if (rt(s) === "light") return /* @__PURE__ */ p.jsx(aN, { entity: n, compact: t });
  const a = nN(rt(s), n);
  return a.length ? /* @__PURE__ */ p.jsx("div", { className: `simui-qc${t ? " compact" : ""}`, children: /* @__PURE__ */ p.jsx(sr, { entity: n, features: a }) }) : null;
}
function nN(s, t) {
  switch (s) {
    case "climate": {
      const n = t.attributes.hvac_modes ?? [], a = [];
      return n.length && a.push({ type: "climate-hvac-modes", modes: n, style: "icons" }), a.push({ type: "target-temperature" }), a;
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
const Bg = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]), sN = [
  { name: "Red", hs: [4, 86] },
  { name: "Orange", hs: [28, 88] },
  { name: "Amber", hs: [44, 90] },
  { name: "Green", hs: [128, 70] },
  { name: "Teal", hs: [172, 68] },
  { name: "Blue", hs: [218, 82] },
  { name: "Violet", hs: [268, 68] },
  { name: "Pink", hs: [322, 72] }
];
function aN({ entity: s, compact: t }) {
  const n = Lt(), a = s.entity_id, r = s.attributes, u = s.state === "on", c = r.brightness ?? 0, d = u ? Math.max(1, Math.round(c / 255 * 100)) : 0, m = r.supported_color_modes ?? [], v = r.color_mode, g = (D) => r[D] != null, b = m.some((D) => Bg.has(D)) || v != null && Bg.has(v) || g("rgb_color") || g("hs_color") || g("rgbw_color") || g("rgbww_color") || g("xy_color"), x = m.includes("color_temp") || v === "color_temp" || g("color_temp") || g("color_temp_kelvin"), S = r.min_color_temp_kelvin ?? 2200, w = r.max_color_temp_kelvin ?? 6500, M = r.color_temp_kelvin ?? Math.round((S + w) / 2), N = (D) => {
    n("light", "turn_on", { brightness_pct: D }, { entity_id: a });
  }, j = (D) => {
    n("light", "turn_on", { color_temp_kelvin: D }, { entity_id: a });
  }, T = (D) => {
    n("light", "turn_on", { hs_color: D }, { entity_id: a });
  }, R = {
    background: `linear-gradient(to right, var(--warm) ${d}%, var(--faint) ${d}%)`
  };
  return /* @__PURE__ */ p.jsxs("div", { className: `simui-qc light${t ? " compact" : ""}`, children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-qc-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-val num", children: u ? `${d}%` : "Off" })
    ] }),
    /* @__PURE__ */ p.jsx(
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
    x && /* @__PURE__ */ p.jsx(
      "input",
      {
        className: "simui-temp-ribbon",
        type: "range",
        min: S,
        max: w,
        step: 50,
        value: M,
        "aria-label": "Colour temperature",
        onChange: (D) => j(Number(D.target.value))
      }
    ),
    b && /* @__PURE__ */ p.jsx("div", { className: "simui-qc-swatches", children: sN.map((D) => /* @__PURE__ */ p.jsx(
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
const lN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), rN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), oN = /* @__PURE__ */ new Set(["moisture"]);
function Yb(s) {
  const t = rt(s.entity_id), n = s.attributes.device_class;
  if (t === "lock") {
    const r = s.state === "locked", u = s.state === "locking" || s.state === "unlocking";
    return {
      word: u ? pt(s.state) : r ? "Locked" : "Unlocked",
      tone: r ? "secure" : "warn",
      icon: r ? vs : Oa,
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
      icon: r ? Yl : u ? Tb : x_,
      attention: r
    };
  }
  const a = s.state === "on";
  return n && rN.has(n) ? {
    word: a ? "Detected" : "Clear",
    tone: a ? "alert" : "secure",
    icon: Eb,
    attention: a
  } : n && oN.has(n) ? {
    word: a ? "Leak" : "Dry",
    tone: a ? "alert" : "secure",
    icon: lS,
    attention: a
  } : n && lN.has(n) ? {
    word: a ? "Open" : "Closed",
    tone: a ? "warn" : "secure",
    icon: a ? Cb : nS,
    attention: a
  } : n === "motion" || n === "occupancy" || n === "presence" ? {
    word: a ? "Motion" : "Clear",
    tone: a ? "warn" : "idle",
    icon: qo,
    attention: !1
    // motion is informational, not an alert
  } : {
    word: a ? "On" : "Clear",
    tone: a ? "warn" : "secure",
    icon: a ? Yl : Q_,
    attention: !1
  };
}
function Vb({ entity: s, name: t, menuItems: n }) {
  const a = ke(s), r = Fd(), u = er();
  if (!a) return null;
  const c = t ?? P(a), d = a.state === "unavailable" || a.state === "unknown", m = [
    { label: "Details", onClick: () => u({ action: "more-info" }, s) },
    ...n ?? []
  ];
  if (d)
    return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsxs(
        "div",
        {
          className: "simui-statusboard tone-idle is-unavailable",
          role: "group",
          "aria-label": `${c}: Unavailable`,
          ...r.menuProps,
          children: [
            /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(Yl, { size: 22, strokeWidth: 2 }) }),
            /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-word", children: "Unavailable" }),
            /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-name", title: c, children: c }),
            /* @__PURE__ */ p.jsx(bs, { value: "", since: a.last_changed, tone: "muted" })
          ]
        }
      ),
      r.open && r.position && /* @__PURE__ */ p.jsx(
        Jo,
        {
          items: m,
          x: r.position.x,
          y: r.position.y,
          onClose: r.close,
          header: Vl(s) ? /* @__PURE__ */ p.jsx(Gl, { entityId: s, compact: !0 }) : void 0
        }
      )
    ] });
  const v = Yb(a), g = v.icon;
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: `simui-statusboard tone-${v.tone}${v.attention ? " is-attn" : ""}`,
        role: "group",
        "aria-label": `${c}: ${v.word}`,
        ...r.menuProps,
        children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-ic", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(g, { size: 22, strokeWidth: 2 }) }),
          /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-word", children: v.word }),
          /* @__PURE__ */ p.jsx("span", { className: "simui-statusboard-name", title: c, children: c }),
          /* @__PURE__ */ p.jsx(bs, { value: "", since: a.last_changed, tone: v.tone === "alert" || v.tone === "warn" ? "warn" : "muted" })
        ]
      }
    ),
    r.open && r.position && /* @__PURE__ */ p.jsx(
      Jo,
      {
        items: m,
        x: r.position.x,
        y: r.position.y,
        onClose: r.close,
        header: Vl(s) ? /* @__PURE__ */ p.jsx(Gl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function uN({ entities: s, clearLabel: t }) {
  const n = $e((u) => Gb(u, s).join(",")), a = C.useMemo(() => n ? n.split(",") : [], [n]), r = s.length;
  if (a.length === 0) {
    const u = t ? t(r) : `All ${r} clear`;
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-attn is-clear", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-attn-ic", children: /* @__PURE__ */ p.jsx(Tb, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-attn-clear", children: u })
    ] });
  }
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-attn is-active", role: "alert", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-attn-head", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-attn-ic warn", children: /* @__PURE__ */ p.jsx(Yl, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-attn-title", children: a.length === 1 ? "1 needs attention" : `${a.length} need attention` })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-attn-tiles", children: a.map((u) => /* @__PURE__ */ p.jsx(Vb, { entity: u }, u)) })
  ] });
}
function Gb(s, t) {
  const n = [];
  for (const a of t) {
    const r = s[a];
    !r || r.state === "unavailable" || r.state === "unknown" || Yb(r).attention && n.push(a);
  }
  return n;
}
const cN = /* @__PURE__ */ new Set(["door", "garage_door", "window", "opening"]), hN = /* @__PURE__ */ new Set(["smoke", "gas", "carbon_monoxide"]), dN = /* @__PURE__ */ new Set(["moisture"]);
function fN(s) {
  if (rt(s.entity_id) !== "binary_sensor" || !ae(s)) return !1;
  const t = s.attributes.device_class;
  return !!t && (cN.has(t) || hN.has(t) || dN.has(t));
}
function mN(s) {
  if (!ae(s)) return !1;
  const t = s.attributes.device_class, n = `${s.entity_id} ${s.attributes.friendly_name ?? ""}`.toLowerCase();
  return t === "garage" || t === "door" || /garage|gate|front|back|exterior|entry/.test(n);
}
function pN(s) {
  const { states: t, registry: n } = s, a = Hn(t, "lock", n).filter(ae), r = Hn(t, "alarm_control_panel", n).filter(ae), u = Hn(t, "cover", n).filter(mN), c = Object.values(t).filter(
    (M) => fN(M) && Pl(M.entity_id, M, n)
  ), d = [...r, ...a, ...u, ...c], m = { blocks: [] };
  if (!d.length) return m;
  const v = d.map((M) => M.entity_id), g = Gb(t, v), b = new Set(g), x = [];
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
  }), x.length && (m.statusStrip = x), m.blocks.push({
    id: zt("security-attention"),
    type: "attention",
    entityIds: v,
    span: "full"
  });
  for (const M of r)
    m.blocks.push({
      id: zt("security-alarm"),
      type: "hero",
      title: M.attributes.friendly_name ?? M.entity_id,
      entityIds: [M.entity_id],
      span: "full"
    });
  const w = [...a, ...u, ...c].map((M) => M.entity_id).sort((M, N) => (b.has(N) ? 1 : 0) - (b.has(M) ? 1 : 0));
  return w.length && m.blocks.push(vN("Doors & locks", w)), m;
}
function vN(s, t) {
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
function Kb(s) {
  return `${s.entity_id} ${P(s)}`.toLowerCase();
}
function de(s, t) {
  return t.test(Kb(s));
}
function gN(s) {
  const t = s.some((d) => de(d, /proxmox|\bpve\b|_vm_|\blxc\b|qemu/)), n = s.some((d) => de(d, /docker|container|portainer/)), a = s.some((d) => de(d, /zfs|truenas|\bpool\b|dataset|\bzpool\b/)), r = s.some((d) => de(d, /\bpbs\b|backup|proxmox_backup|datastore/)), u = s.some((d) => de(d, /unifi|udm|\bwan\b|\bpoe\b|gateway/)), c = /* @__PURE__ */ new Set();
  for (const d of s) {
    if (!de(d, /cpu|load|memory|mem_used|disk/) || !de(d, /server|node|host|nas|\bpve\b|proxmox|truenas/)) continue;
    const v = P(d).match(/^([A-Za-z][\w-]*(?:Server|NAS|Node|Host)?)/);
    v && c.add(v[1]);
  }
  return { proxmox: t, docker: n, zfs: a, backups: r, unifi: u, nodes: [...c].sort() };
}
function Ug() {
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
function bN(s) {
  const t = Object.values(s.states).filter(ae), n = gN(t), a = { blocks: [] };
  if (!n.proxmox && !n.docker && !n.zfs && !n.backups && !n.nodes.length)
    return a;
  const r = [
    {
      kind: "count",
      icon: "alert-octagon",
      label: "need attention",
      accent: "warn",
      source: Ug()
    }
  ];
  if ((n.proxmox || n.nodes.length) && r.push({
    kind: "count",
    icon: "server",
    label: "nodes up",
    accent: "up",
    source: { include: [{ domain: "binary_sensor", name: "*node*", state: "on" }, { domain: "binary_sensor", name: "*host*", state: "on" }], hideWhenEmpty: !1 }
  }), n.docker && r.push({
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
    source: Ug()
  }), n.nodes.length)
    for (const d of n.nodes) {
      const m = yN(t, d);
      m.length && a.blocks.push({
        id: zt("server-node"),
        type: "group",
        title: d,
        axis: "function",
        entityIds: m,
        span: 2
      });
    }
  if (n.proxmox) {
    const d = t.filter((m) => (rt(m.entity_id) === "switch" || rt(m.entity_id) === "binary_sensor") && de(m, /_vm_|\blxc\b|qemu|guest/)).map((m) => m.entity_id);
    d.length && a.blocks.push({
      id: zt("server-vms"),
      type: "group",
      title: "Virtual machines",
      axis: "function",
      entityIds: d,
      span: 2
    });
  }
  if (n.docker) {
    const d = t.filter((m) => rt(m.entity_id) === "switch" && de(m, /docker|container/)).map((m) => m.entity_id);
    d.length && a.blocks.push({
      id: zt("server-containers"),
      type: "group",
      title: "Containers",
      axis: "function",
      entityIds: d,
      span: 2
    });
  }
  if (n.zfs) {
    const d = t.filter((m) => rt(m.entity_id) === "sensor" && de(m, /pool|dataset|zfs|free|used|capacity/) && de(m, /%|gb|tb|gib|tib|free|used|pool|dataset/i)).map((m) => m.entity_id);
    if (d.length) {
      a.blocks.push({
        id: zt("server-zfs"),
        type: "group",
        title: "Storage",
        axis: "function",
        entityIds: d,
        span: 2
      });
      const m = t.find((v) => rt(v.entity_id) === "sensor" && de(v, /pool/) && (v.attributes.unit_of_measurement === "%" || de(v, /used|free|capacity/)));
      if (m) {
        const v = {
          title: "Pool capacity (30d)",
          window: { value: 30, unit: "d" },
          bucket: "day",
          reducer: "max",
          backend: "statistics",
          header: { showCurrent: !0, colorize: !0 },
          axes: [{ id: "pct", min: 0, max: 100 }],
          series: [{ entity: m.entity_id, name: qn(m), fill: "area", color: "var(--accent)", opacity: 0.2, strokeWidth: 2, axisId: "pct" }],
          thresholds: [{ value: 80, color: "var(--warn)" }]
        };
        a.blocks.push({
          id: zt("server-zfs-trend"),
          type: "chart",
          title: "Pool capacity",
          entityIds: [m.entity_id],
          span: "full",
          chart: v
        });
      }
    }
  }
  if (n.backups) {
    const d = t.filter((m) => (rt(m.entity_id) === "sensor" || rt(m.entity_id) === "binary_sensor") && de(m, /backup|pbs|datastore/)).map((m) => m.entity_id);
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
    (d) => rt(d.entity_id) === "binary_sensor" && de(d, u) || rt(d.entity_id) === "sensor" && de(d, u) && de(d, /status|up|online|reachable|ping/)
  ).map((d) => d.entity_id);
  if (c.length && a.blocks.push({
    id: zt("server-launchpad"),
    type: "group",
    title: "Services",
    axis: "function",
    entityIds: c,
    span: 2
  }), n.unifi) {
    const d = t.filter((m) => de(m, /unifi|udm|\bwan\b|\bpoe\b|gateway|throughput|clients/) && (rt(m.entity_id) === "sensor" || rt(m.entity_id) === "binary_sensor" || rt(m.entity_id) === "button" || rt(m.entity_id) === "switch")).map((m) => m.entity_id);
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
function yN(s, t) {
  const n = t.toLowerCase();
  return s.filter((a) => {
    const r = Kb(a);
    return r.includes(n) ? /cpu|load|memory|mem|disk|temp|uptime|vms|status|power/.test(r) : !1;
  }).map((a) => a.entity_id).sort();
}
const xN = [
  {
    id: "home",
    name: "Home summary",
    description: "The landing surface — status strip, scenes, a category launcher, live status, security.",
    accent: "accent",
    build: qb
  },
  {
    id: "lights",
    name: "Lights",
    description: "All your lights, grouped by room, with the room group tile leading each section.",
    accent: "warm",
    build: jM
  },
  {
    id: "climate",
    name: "Climate",
    description: "Feature-control tiles — mode and setpoint inline — plus a comfort trend.",
    accent: "accent",
    build: TM
  },
  {
    id: "sensors",
    name: "Sensors",
    description: "Split by data type — numeric sparklines, binary status tiles, overview charts.",
    accent: "up",
    build: RM
  },
  {
    id: "power",
    name: "Power",
    description: "Merged generation + consumption, a live flow chart, and a per-circuit sparkline wall.",
    accent: "warn",
    build: QM
  },
  {
    id: "security",
    name: "Security",
    description: "A presence-first status board — locks, doors and hazards — with an Attention escalation strip and the alarm hero.",
    accent: "green",
    build: pN
  },
  {
    id: "server",
    name: "Server / Homelab",
    description: "Node vitals, VM/container control, ZFS, backups and a service launchpad — auto-detected.",
    accent: "up",
    build: bN
  }
];
function wN(s) {
  return xN.find((t) => t.id === s);
}
let Hg = 0;
function zt(s) {
  return Hg += 1, `preset-${s}-${Hg}`;
}
function qg(s, t) {
  return s.includes("*") ? new RegExp(
    "^" + s.split("*").map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$",
    "i"
  ).test(t) : s === t;
}
function _N(s) {
  return s == null ? [] : Array.isArray(s) ? s : [s];
}
function Qg(s, t, n) {
  return !(t.entityId && !qg(t.entityId, s.entity_id) || t.domain && rt(s.entity_id) !== t.domain || t.state && !_N(t.state).includes(s.state) || t.name && !qg(t.name, P(s)) || t.area && n?.(s.entity_id) !== t.area);
}
function Xb(s, t, n, a) {
  const r = !s.includeNoise, u = [];
  for (const c of Object.values(t))
    r && !uu(c.entity_id, c, a?.[c.entity_id]) || s.include.some((d) => Qg(c, d, n)) && (s.exclude?.some((d) => Qg(c, d, n)) || u.push(c.entity_id));
  return u.sort();
}
function Hn(s, t, n) {
  return Object.values(s).filter((a) => rt(a.entity_id) === t && uu(a.entity_id, a, n?.[a.entity_id])).sort((a, r) => P(a).localeCompare(P(r)));
}
function ar(s, t) {
  for (const n of Object.values(s)) if (t(n)) return !0;
  return !1;
}
function ae(s) {
  return s.state !== "unavailable" && s.state !== "unknown";
}
function Zb(s) {
  return rt(s.entity_id) === "sensor" && s.attributes.unit_of_measurement != null && ae(s);
}
function qn(s, t) {
  return P(s).trim() || P(s);
}
const SN = [
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
function MN(s, t) {
  const n = t?.[s.entity_id];
  if (n) return n.areaName;
  const a = `${s.entity_id} ${P(s)}`.toLowerCase();
  for (const [r, u] of SN) if (a.includes(r)) return u;
  return "Home";
}
function Wb(s, t) {
  const n = [
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
    const u = MN(r, t);
    let c = a.get(u);
    c || (c = [], a.set(u, c)), c.push(r);
  }
  return [...a.entries()].sort((r, u) => {
    const c = n.indexOf(r[0]), d = n.indexOf(u[0]);
    return (c < 0 ? 99 : c) - (d < 0 ? 99 : d) || r[0].localeCompare(u[0]);
  });
}
function Jb({ pills: s }) {
  return s.length ? /* @__PURE__ */ p.jsx(fM, { children: s.map((t, n) => /* @__PURE__ */ p.jsx(NN, { pill: t }, n)) }) : null;
}
function NN({ pill: s }) {
  const t = er();
  switch (s.kind) {
    case "count":
      return /* @__PURE__ */ p.jsx(CN, { pill: s });
    case "nav":
      return /* @__PURE__ */ p.jsx(
        pM,
        {
          icon: Ca(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t({ action: "navigate", path: s.path })
        }
      );
    case "action":
      return /* @__PURE__ */ p.jsx(
        vM,
        {
          icon: Ca(s.icon),
          label: s.label,
          accent: s.accent,
          onTap: () => t(s.action)
        }
      );
    case "conditional":
      return /* @__PURE__ */ p.jsx(EN, { pill: s });
    case "status":
      return /* @__PURE__ */ p.jsx(bM, { entity: s.entityId });
    case "select":
      return /* @__PURE__ */ p.jsx(
        yM,
        {
          entity: s.entityId,
          name: s.name,
          onTap: () => t({ action: "more-info" }, s.entityId)
        }
      );
  }
}
function CN({ pill: s }) {
  const t = $e((n) => Xb(s.source, n).length);
  return /* @__PURE__ */ p.jsx(
    mM,
    {
      label: s.label,
      count: t,
      iconOn: Ca(s.icon),
      iconOff: Ca(s.icon),
      activeColor: s.accent
    }
  );
}
function EN({ pill: s }) {
  const t = $e((n) => {
    const a = s.visibleWhen, r = n[a.entity];
    if (!r || a.state != null && !(Array.isArray(a.state) ? a.state : [a.state]).includes(r.state))
      return !1;
    const u = Number(r.state);
    return !(a.above != null && !(u > a.above) || a.below != null && !(u < a.below));
  });
  return /* @__PURE__ */ p.jsx(gM, { label: s.label, icon: Ca(s.icon), accent: s.accent, visible: t });
}
function jN({ block: s }) {
  const t = ke(s.entityIds[0]);
  if (!t) return null;
  const n = t.attributes, a = rt(t.entity_id);
  if (a === "climate" || n.current_temperature != null) {
    const c = n.current_temperature, d = n.temperature, m = n.hvac_action;
    let v = t.state.replace(/_/g, " ");
    return m === "heating" && d != null ? v = `Heating to ${qh(d)}°` : m === "cooling" && d != null ? v = `Cooling to ${qh(d)}°` : m === "idle" ? v = "Idle" : d != null && (v = `Set to ${qh(d)}°`), /* @__PURE__ */ p.jsxs("div", { className: "simui-hero", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "simui-hero-temp num", children: [
        c != null ? Math.round(c) : "—",
        /* @__PURE__ */ p.jsx("small", { children: "°" })
      ] }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-hero-sub", children: v })
    ] });
  }
  const u = kN(a, t.state);
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-hero is-state", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-hero-state num", children: pt(t.state) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-hero-sub", children: s.title ?? P(t) }),
    u.length > 0 && /* @__PURE__ */ p.jsx(sr, { entity: t, features: u })
  ] });
}
function kN(s, t) {
  return s === "alarm_control_panel" ? [{ type: "alarm-modes", modes: ["disarmed", "armed_home", "armed_away", "armed_night"] }] : s === "cover" ? [{ type: "cover-open-close" }] : s === "lock" ? [{ type: "lock-commands" }] : [];
}
function qh(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function zN(s) {
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
  onClick: n,
  className: a = "",
  style: r,
  orientation: u = "horizontal",
  color: c,
  menuProps: d
}) {
  const m = n ? (b) => {
    (b.key === "Enter" || b.key === " ") && (b.preventDefault(), n());
  } : void 0, v = zN(c), g = v ? { ...r, "--tile-accent": v } : r;
  return /* @__PURE__ */ p.jsx(
    "div",
    {
      className: [
        "simui-tile",
        u === "vertical" ? "is-vertical" : "",
        t ? "is-active" : "",
        v && t ? "is-tinted" : "",
        n ? "is-clickable" : "",
        a
      ].filter(Boolean).join(" "),
      onClick: n,
      onKeyDown: m,
      role: n ? "button" : void 0,
      tabIndex: n ? 0 : void 0,
      style: g,
      ...d,
      children: s
    }
  );
}
function TN({
  name: s,
  icon: t,
  color: n = "accent",
  orientation: a = "vertical",
  onTap: r
}) {
  return /* @__PURE__ */ p.jsxs(Xt, { orientation: a, color: n, active: !0, onClick: r, className: "is-launcher", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-launch-ic", children: Ca(t, a === "vertical" ? 20 : 16) }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-name simui-launch-name", title: s, children: s })
  ] });
}
function Qh({ iso: s }) {
  const t = ru(s);
  return t ? /* @__PURE__ */ p.jsxs("span", { className: "simui-since", children: [
    " · ",
    t
  ] }) : null;
}
const $g = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "humidifier", "siren", "automation"]);
function Io({ entityId: s }) {
  const t = ke(s), n = Lt(), a = er(), r = Fd(), u = rt(s), c = t ? P(t) : s, d = !!t && t.state === "on", m = !!t && t.state === "locked", v = [
    ...u === "light" || $g.has(u) ? [{ label: d ? "Turn off" : "Turn on", onClick: () => a({ action: "toggle" }, s) }] : [],
    ...u === "lock" ? [{ label: m ? "Unlock" : "Lock", onClick: () => {
      n("lock", m ? "unlock" : "lock", {}, { entity_id: s });
    } }] : [],
    { label: "Details", icon: /* @__PURE__ */ p.jsx(pS, { size: 14 }), onClick: () => a({ action: "more-info" }, s) }
  ], g = r.open && r.position && /* @__PURE__ */ p.jsx(
    Jo,
    {
      items: v,
      x: r.position.x,
      y: r.position.y,
      onClose: r.close,
      header: Vl(s) ? /* @__PURE__ */ p.jsx(Gl, { entityId: s, compact: !0 }) : void 0
    }
  );
  if (!t)
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name muted", children: s }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-state", children: "—" }),
      g
    ] });
  if (t.state === "unavailable" || t.state === "unknown")
    return /* @__PURE__ */ p.jsxs("button", { className: "simui-erow as-row is-unavailable", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-state", children: pt(t.state) }),
      g
    ] });
  if (u === "light") {
    const b = t.attributes.brightness ?? 0, x = d ? Math.max(1, Math.round(b / 255 * 100)) : 0, S = () => {
      n("light", d ? "turn_off" : "turn_on", {}, { entity_id: s });
    }, w = (M) => {
      n("light", "turn_on", { brightness_pct: Number(M.target.value) }, { entity_id: s });
    };
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("button", { className: "simui-erow-dot", "data-on": d, "aria-label": `Toggle ${c}`, onClick: S }),
      /* @__PURE__ */ p.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      d ? /* @__PURE__ */ p.jsx(
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
      ) : /* @__PURE__ */ p.jsx("span", { className: "simui-erow-state", children: "Off" }),
      g
    ] });
  }
  if (u === "lock") {
    const b = () => {
      n("lock", m ? "unlock" : "lock", {}, { entity_id: s });
    };
    return /* @__PURE__ */ p.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-erow-ic${m ? "" : " amber"}`, children: m ? /* @__PURE__ */ p.jsx(vs, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ p.jsx(Oa, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsxs("span", { className: `simui-erow-state${m ? "" : " warn"}`, children: [
        m ? "Locked" : "Unlocked",
        /* @__PURE__ */ p.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if (u === "cover") {
    const b = t.attributes.current_position, x = (S) => {
      n("cover", S, void 0, { entity_id: s });
    };
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-erow", ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-state", children: b != null ? `${b}%` : pt(t.state) }),
      Et(t, 1) && /* @__PURE__ */ p.jsx("button", { className: "simui-rbtn", "aria-label": "Open", onClick: () => x("open_cover"), children: /* @__PURE__ */ p.jsx($l, { size: 14 }) }),
      Et(t, 2) && /* @__PURE__ */ p.jsx("button", { className: "simui-rbtn", "aria-label": "Close", onClick: () => x("close_cover"), children: /* @__PURE__ */ p.jsx(ps, { size: 14 }) }),
      g
    ] });
  }
  if (u === "climate") {
    const b = t.attributes.current_temperature, x = t.attributes.hvac_action ?? t.state, S = x === "heating" ? " warn" : x === "cooling" ? " on" : "";
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-erow climate", ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("button", { className: "simui-erow-name as-btn", onClick: () => a({ action: "more-info" }, s), children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: `simui-erow-state${S}`, children: b != null ? `${Math.round(b)}°` : pt(t.state) }),
      /* @__PURE__ */ p.jsx(sr, { entity: t, features: [{ type: "target-temperature" }] }),
      g
    ] });
  }
  if (u === "sensor" || u === "binary_sensor") {
    const b = t.attributes.unit_of_measurement ?? "", x = u === "binary_sensor";
    return /* @__PURE__ */ p.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsxs("span", { className: x ? "simui-erow-state" : "simui-erow-val num", children: [
        pt(t.state),
        b ? ` ${b}` : "",
        x && /* @__PURE__ */ p.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  if ($g.has(u) && (t.state === "on" || t.state === "off")) {
    const b = () => {
      n("homeassistant", d ? "turn_off" : "turn_on", {}, { entity_id: s });
    };
    return /* @__PURE__ */ p.jsxs("button", { className: "simui-erow as-row", onClick: b, ...r.menuProps, children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-erow-ic${d ? " cool" : ""}`, children: /* @__PURE__ */ p.jsx(gs, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsxs("span", { className: `simui-erow-state${d ? " on" : ""}`, children: [
        d ? "On" : "Off",
        /* @__PURE__ */ p.jsx(Qh, { iso: t.last_changed })
      ] }),
      g
    ] });
  }
  return /* @__PURE__ */ p.jsxs("button", { className: "simui-erow as-row", onClick: () => a({ action: "more-info" }, s), ...r.menuProps, children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-erow-name", children: c }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-erow-state", children: pt(t.state) }),
    g
  ] });
}
function $t(s) {
  var t = s.width, n = s.height;
  if (t < 0)
    throw new Error("Negative width is not allowed for Size");
  if (n < 0)
    throw new Error("Negative height is not allowed for Size");
  return {
    width: t,
    height: n
  };
}
function fs(s, t) {
  return s.width === t.width && s.height === t.height;
}
var ON = (
  /** @class */
  (function() {
    function s(t) {
      var n = this;
      this._resolutionListener = function() {
        return n._onResolutionChanged();
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
      var n = this, a = { next: t };
      return this._observers.push(a), {
        unsubscribe: function() {
          n._observers = n._observers.filter(function(r) {
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
      this._observers.forEach(function(n) {
        return n.next(t._window.devicePixelRatio);
      }), this._reinstallResolutionListener();
    }, s;
  })()
);
function DN(s) {
  return new ON(s);
}
var AN = (
  /** @class */
  (function() {
    function s(t, n, a) {
      var r;
      this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = t, this._canvasElementClientSize = $t({
        width: this._canvasElement.clientWidth,
        height: this._canvasElement.clientHeight
      }), this._transformBitmapSize = n ?? (function(u) {
        return u;
      }), this._allowResizeObserver = (r = a?.allowResizeObserver) !== null && r !== void 0 ? r : !0, this._chooseAndInitObserver();
    }
    return s.prototype.dispose = function() {
      var t, n;
      if (this._canvasElement === null)
        throw new Error("Object is disposed");
      (t = this._canvasElementResizeObserver) === null || t === void 0 || t.disconnect(), this._canvasElementResizeObserver = null, (n = this._devicePixelRatioObservable) === null || n === void 0 || n.dispose(), this._devicePixelRatioObservable = null, this._suggestedBitmapSizeChangedListeners.length = 0, this._bitmapSizeChangedListeners.length = 0, this._canvasElement = null;
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
      this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(n) {
        return n !== t;
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
      this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(n) {
        return n !== t;
      });
    }, s.prototype.applySuggestedBitmapSize = function() {
      if (this._suggestedBitmapSize !== null) {
        var t = this._suggestedBitmapSize;
        this._suggestedBitmapSize = null, this._resizeBitmap(t), this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize);
      }
    }, s.prototype._resizeBitmap = function(t) {
      var n = this.bitmapSize;
      fs(n, t) || (this.canvasElement.width = t.width, this.canvasElement.height = t.height, this._emitBitmapSizeChanged(n, t));
    }, s.prototype._emitBitmapSizeChanged = function(t, n) {
      var a = this;
      this._bitmapSizeChangedListeners.forEach(function(r) {
        return r.call(a, t, n);
      });
    }, s.prototype._suggestNewBitmapSize = function(t) {
      var n = this._suggestedBitmapSize, a = $t(this._transformBitmapSize(t, this._canvasElementClientSize)), r = fs(this.bitmapSize, a) ? null : a;
      n === null && r === null || n !== null && r !== null && fs(n, r) || (this._suggestedBitmapSize = r, this._emitSuggestedBitmapSizeChanged(n, r));
    }, s.prototype._emitSuggestedBitmapSizeChanged = function(t, n) {
      var a = this;
      this._suggestedBitmapSizeChangedListeners.forEach(function(r) {
        return r.call(a, t, n);
      });
    }, s.prototype._chooseAndInitObserver = function() {
      var t = this;
      if (!this._allowResizeObserver) {
        this._initDevicePixelRatioObservable();
        return;
      }
      LN().then(function(n) {
        return n ? t._initResizeObserver() : t._initDevicePixelRatioObservable();
      });
    }, s.prototype._initDevicePixelRatioObservable = function() {
      var t = this;
      if (this._canvasElement !== null) {
        var n = Yg(this._canvasElement);
        if (n === null)
          throw new Error("No window is associated with the canvas");
        this._devicePixelRatioObservable = DN(n), this._devicePixelRatioObservable.subscribe(function() {
          return t._invalidateBitmapSize();
        }), this._invalidateBitmapSize();
      }
    }, s.prototype._invalidateBitmapSize = function() {
      var t, n;
      if (this._canvasElement !== null) {
        var a = Yg(this._canvasElement);
        if (a !== null) {
          var r = (n = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && n !== void 0 ? n : a.devicePixelRatio, u = this._canvasElement.getClientRects(), c = (
            // eslint-disable-next-line no-negated-condition
            u[0] !== void 0 ? BN(u[0], r) : $t({
              width: this._canvasElementClientSize.width * r,
              height: this._canvasElementClientSize.height * r
            })
          );
          this._suggestNewBitmapSize(c);
        }
      }
    }, s.prototype._initResizeObserver = function() {
      var t = this;
      this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(n) {
        var a = n.find(function(c) {
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
function RN(s, t) {
  return new AN(s, t.transform, t.options);
}
function Yg(s) {
  return s.ownerDocument.defaultView;
}
function LN() {
  return new Promise(function(s) {
    var t = new ResizeObserver(function(n) {
      s(n.every(function(a) {
        return "devicePixelContentBoxSize" in a;
      })), t.disconnect();
    });
    t.observe(document.body, { box: "device-pixel-content-box" });
  }).catch(function() {
    return !1;
  });
}
function BN(s, t) {
  return $t({
    width: Math.round(s.left * t + s.width * t) - Math.round(s.left * t),
    height: Math.round(s.top * t + s.height * t) - Math.round(s.top * t)
  });
}
var UN = (
  /** @class */
  (function() {
    function s(t, n, a) {
      if (n.width === 0 || n.height === 0)
        throw new TypeError("Rendering target could only be created on a media with positive width and height");
      if (this._mediaSize = n, a.width === 0 || a.height === 0)
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
function ys(s, t) {
  var n = s.canvasElementClientSize;
  if (n.width === 0 || n.height === 0)
    return null;
  var a = s.bitmapSize;
  if (a.width === 0 || a.height === 0)
    return null;
  var r = s.canvasElement.getContext("2d", t);
  return r === null ? null : new UN(r, n, a);
}
/*!
 * @license
 * TradingView Lightweight Charts™ v5.2.0
 * Copyright (c) 2026 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
const Ib = { title: "", visible: !0, hitTestTolerance: 3, lastValueVisible: !0, priceLineVisible: !0, priceLineSource: 0, priceLineWidth: 1, priceLineColor: "", priceLineStyle: 2, baseLineVisible: !0, baseLineWidth: 1, baseLineColor: "#B2B5BE", baseLineStyle: 0, priceFormat: { type: "price", precision: 2, minMove: 0.01 } };
var Vg, cs;
function Qn(s, t) {
  const n = (function(a, r) {
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
  return s.setLineDash(n), n;
}
function Fb(s, t, n, a) {
  s.beginPath();
  const r = s.lineWidth % 2 ? 0.5 : 0;
  s.moveTo(n, t + r), s.lineTo(a, t + r), s.stroke();
}
function we(s, t) {
  if (!s) throw new Error("Assertion failed" + (t ? ": " + t : ""));
}
function Ye(s) {
  if (s === void 0) throw new Error("Value is undefined");
  return s;
}
function W(s) {
  if (s === null) throw new Error("Value is null");
  return s;
}
function Un(s) {
  return W(Ye(s));
}
(function(s) {
  s[s.Simple = 0] = "Simple", s[s.WithSteps = 1] = "WithSteps", s[s.Curved = 2] = "Curved";
})(Vg || (Vg = {})), (function(s) {
  s[s.Solid = 0] = "Solid", s[s.Dotted = 1] = "Dotted", s[s.Dashed = 2] = "Dashed", s[s.LargeDashed = 3] = "LargeDashed", s[s.SparseDotted = 4] = "SparseDotted";
})(cs || (cs = {}));
class te {
  constructor() {
    this.t = [];
  }
  i(t, n, a) {
    const r = { h: t, l: n, o: a === !0 };
    this.t.push(r);
  }
  _(t) {
    const n = this.t.findIndex(((a) => t === a.h));
    n > -1 && this.t.splice(n, 1);
  }
  u(t) {
    this.t = this.t.filter(((n) => n.l !== t));
  }
  p(t, n, a) {
    const r = [...this.t];
    this.t = this.t.filter(((u) => !u.o)), r.forEach(((u) => u.h(t, n, a)));
  }
  v() {
    return this.t.length > 0;
  }
  m() {
    this.t = [];
  }
}
function Pe(s, ...t) {
  for (const n of t) for (const a in n) n[a] !== void 0 && Object.prototype.hasOwnProperty.call(n, a) && !["__proto__", "constructor", "prototype"].includes(a) && (typeof n[a] != "object" || s[a] === void 0 || Array.isArray(n[a]) ? s[a] = n[a] : Pe(s[a], n[a]));
  return s;
}
function Ea(s) {
  return typeof s == "number" && isFinite(s);
}
function Kl(s) {
  return typeof s == "number" && s % 1 == 0;
}
function lr(s) {
  return typeof s == "string";
}
function Eo(s) {
  return typeof s == "boolean";
}
function on(s) {
  const t = s;
  if (!t || typeof t != "object") return t;
  let n, a, r;
  for (a in n = Array.isArray(t) ? [] : {}, t) t.hasOwnProperty(a) && (r = t[a], n[a] = r && typeof r == "object" ? on(r) : r);
  return n;
}
function Gg(s) {
  return s !== null;
}
function xd(s) {
  return s === null ? void 0 : s;
}
const Pb = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function Fo(s, t, n) {
  return t === void 0 && (t = Pb), `${n = n !== void 0 ? `${n} ` : ""}${s}px ${t}`;
}
class HN {
  constructor(t) {
    this.M = { S: 1, C: 5, k: NaN, P: "", T: "", R: "", D: "", I: 0, V: 0, B: 0, A: 0, L: 0 }, this.O = t;
  }
  N() {
    const t = this.M, n = this.F(), a = this.W();
    return t.k === n && t.T === a || (t.k = n, t.T = a, t.P = Fo(n, a), t.A = 2.5 / 12 * n, t.I = t.A, t.V = n / 12 * t.C, t.B = n / 12 * t.C, t.L = 0), t.R = this.H(), t.D = this.U(), this.M;
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
function Kg(s) {
  return 0.199 * s[0] + 0.687 * s[1] + 0.114 * s[2];
}
class qN {
  constructor(t, n) {
    this.j = /* @__PURE__ */ new Map(), this.q = t, n && (this.j = n);
  }
  Y(t, n) {
    if (t === "transparent") return t;
    const a = this.K(t), r = a[3];
    return `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${n * r})`;
  }
  Z(t) {
    const n = this.K(t);
    return { G: `rgb(${n[0]}, ${n[1]}, ${n[2]})`, X: Kg(n) > 160 ? "black" : "white" };
  }
  J(t) {
    return Kg(this.K(t));
  }
  tt(t, n, a) {
    const [r, u, c, d] = this.K(t), [m, v, g, b] = this.K(n), x = [$h(r + a * (m - r)), $h(u + a * (v - u)), $h(c + a * (g - c)), (S = d + a * (b - d), S <= 0 || S > 1 ? Math.min(Math.max(S, 0), 1) : Math.round(1e4 * S) / 1e4)];
    var S;
    return `rgba(${x[0]}, ${x[1]}, ${x[2]}, ${x[3]})`;
  }
  K(t) {
    const n = this.j.get(t);
    if (n) return n;
    const a = (function(c) {
      const d = document.createElement("div");
      d.style.display = "none", document.body.appendChild(d), d.style.color = c;
      const m = window.getComputedStyle(d).color;
      return document.body.removeChild(d), m;
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
class t1 {
  constructor() {
    this.it = [];
  }
  nt(t) {
    this.it = t;
  }
  st(t, n, a) {
    this.it.forEach(((r) => {
      r.st(t, n, a);
    }));
  }
}
class Ms {
  st(t, n, a) {
    t.useBitmapCoordinateSpace(((r) => this.et(r, n, a)));
  }
}
class QN extends Ms {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et({ context: t, horizontalPixelRatio: n, verticalPixelRatio: a }) {
    if (this.rt === null || this.rt.lt === null) return;
    const r = this.rt.lt, u = this.rt, c = Math.max(1, Math.floor(n)) % 2 / 2, d = (m) => {
      t.beginPath();
      for (let v = r.to - 1; v >= r.from; --v) {
        const g = u.ot[v], b = Math.round(g._t * n) + c, x = g.ut * a, S = m * a + c;
        t.moveTo(b, x), t.arc(b, x, S, 0, 2 * Math.PI);
      }
      t.fill();
    };
    u.ct > 0 && (t.fillStyle = u.dt, d(u.ft + u.ct)), t.fillStyle = u.vt, d(u.ft);
  }
}
function $N() {
  return { ot: [{ _t: 0, ut: 0, wt: 0, Mt: 0 }], vt: "", dt: "", ft: 0, ct: 0, lt: null };
}
const YN = { from: 0, to: 1 };
class VN {
  constructor(t, n, a) {
    this.gt = new t1(), this.bt = [], this.St = [], this.xt = !0, this.O = t, this.Ct = n, this.yt = a, this.gt.nt(this.bt);
  }
  kt(t) {
    this.Pt(), this.xt = !0;
  }
  Tt() {
    return this.xt && (this.Rt(), this.xt = !1), this.gt;
  }
  Pt() {
    const t = this.yt.Dt();
    t.length !== this.bt.length && (this.St = t.map($N), this.bt = this.St.map(((n) => {
      const a = new QN();
      return a.ht(n), a;
    })), this.gt.nt(this.bt));
  }
  Rt() {
    const t = this.Ct.N().mode === 2 || !this.Ct.It(), n = this.yt.Vt(), a = this.Ct.Bt(), r = this.O.Et();
    this.Pt(), n.forEach(((u, c) => {
      const d = this.St[c], m = u.At(a), v = u.Lt();
      !t && m !== null && u.It() && v !== null ? (d.vt = m.zt, d.ft = m.ft, d.ct = m.Ot, d.ot[0].Mt = m.Mt, d.ot[0].ut = u.Ft().Nt(m.Mt, v.Wt), d.dt = m.Ht ?? this.O.Ut(d.ot[0].ut / u.Ft().$t()), d.ot[0].wt = a, d.ot[0]._t = r.jt(a), d.lt = YN) : d.lt = null;
    }));
  }
}
class GN extends Ms {
  constructor(t) {
    super(), this.qt = t;
  }
  et({ context: t, bitmapSize: n, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const u = this.qt.Yt.It, c = this.qt.Kt.It;
    if (!u && !c) return;
    const d = Math.round(this.qt._t * a), m = Math.round(this.qt.ut * r);
    t.lineCap = "butt", u && d >= 0 && (t.lineWidth = Math.floor(this.qt.Yt.ct * a), t.strokeStyle = this.qt.Yt.R, t.fillStyle = this.qt.Yt.R, Qn(t, this.qt.Yt.Zt), (function(v, g, b, x) {
      v.beginPath();
      const S = v.lineWidth % 2 ? 0.5 : 0;
      v.moveTo(g + S, b), v.lineTo(g + S, x), v.stroke();
    })(t, d, 0, n.height)), c && m >= 0 && (t.lineWidth = Math.floor(this.qt.Kt.ct * r), t.strokeStyle = this.qt.Kt.R, t.fillStyle = this.qt.Kt.R, Qn(t, this.qt.Kt.Zt), Fb(t, m, 0, n.width));
  }
}
class KN {
  constructor(t, n) {
    this.xt = !0, this.Gt = { Yt: { ct: 1, Zt: 0, R: "", It: !1 }, Kt: { ct: 1, Zt: 0, R: "", It: !1 }, _t: 0, ut: 0 }, this.Xt = new GN(this.Gt), this.Jt = t, this.yt = n;
  }
  kt() {
    this.xt = !0;
  }
  Tt(t) {
    return this.xt && (this.Rt(), this.xt = !1), this.Xt;
  }
  Rt() {
    const t = this.Jt.It(), n = this.yt.Qt().N().crosshair, a = this.Gt;
    if (n.mode === 2) return a.Kt.It = !1, void (a.Yt.It = !1);
    a.Kt.It = t && this.Jt.ti(this.yt), a.Yt.It = t && this.Jt.ii(), a.Kt.ct = n.horzLine.width, a.Kt.Zt = n.horzLine.style, a.Kt.R = n.horzLine.color, a.Yt.ct = n.vertLine.width, a.Yt.Zt = n.vertLine.style, a.Yt.R = n.vertLine.color, a._t = this.Jt.ni(), a.ut = this.Jt.si();
  }
}
function cu(s, t, n, a, r, u) {
  s.save(), s.globalCompositeOperation = "copy", s.fillStyle = u, s.fillRect(t, n, a, r), s.restore();
}
function Xg(s, t, n, a, r, u) {
  s.beginPath(), s.roundRect ? s.roundRect(t, n, a, r, u) : (s.lineTo(t + a - u[1], n), u[1] !== 0 && s.arcTo(t + a, n, t + a, n + u[1], u[1]), s.lineTo(t + a, n + r - u[2]), u[2] !== 0 && s.arcTo(t + a, n + r, t + a - u[2], n + r, u[2]), s.lineTo(t + u[3], n + r), u[3] !== 0 && s.arcTo(t, n + r, t, n + r - u[3], u[3]), s.lineTo(t, n + u[0]), u[0] !== 0 && s.arcTo(t, n, t + u[0], n, u[0]));
}
function Zg(s, t, n, a, r, u, c = 0, d = [0, 0, 0, 0], m = "") {
  if (s.save(), !c || !m || m === u) return Xg(s, t, n, a, r, d), s.fillStyle = u, s.fill(), void s.restore();
  const v = c / 2;
  var g;
  Xg(s, t + v, n + v, a - c, r - c, (g = -v, d.map(((b) => b === 0 ? b : b + g)))), u !== "transparent" && (s.fillStyle = u, s.fill()), m !== "transparent" && (s.lineWidth = c, s.strokeStyle = m, s.closePath(), s.stroke()), s.restore();
}
function e1(s, t, n, a, r, u, c) {
  s.save(), s.globalCompositeOperation = "copy";
  const d = s.createLinearGradient(0, 0, 0, r);
  d.addColorStop(0, u), d.addColorStop(1, c), s.fillStyle = d, s.fillRect(t, n, a, r), s.restore();
}
class Wg {
  constructor(t, n) {
    this.ht(t, n);
  }
  ht(t, n) {
    this.qt = t, this.ei = n;
  }
  $t(t, n) {
    return this.qt.It ? t.k + t.A + t.I : 0;
  }
  st(t, n, a, r) {
    if (!this.qt.It || this.qt.ri.length === 0) return;
    const u = this.qt.R, c = this.ei.G, d = t.useBitmapCoordinateSpace(((m) => {
      const v = m.context;
      v.font = n.P;
      const g = this.hi(m, n, a, r), b = g.ai;
      return g.li ? Zg(v, b.oi, b._i, b.ui, b.ci, c, b.di, [b.ft, 0, 0, b.ft], c) : Zg(v, b.fi, b._i, b.ui, b.ci, c, b.di, [0, b.ft, b.ft, 0], c), this.qt.pi && (v.fillStyle = u, v.fillRect(b.fi, b.mi, b.wi - b.fi, b.Mi)), this.qt.gi && (v.fillStyle = n.D, v.fillRect(g.li ? b.bi - b.di : 0, b._i, b.di, b.Si - b._i)), g;
    }));
    t.useMediaCoordinateSpace((({ context: m }) => {
      const v = d.xi;
      m.font = n.P, m.textAlign = d.li ? "right" : "left", m.textBaseline = "middle", m.fillStyle = u, m.fillText(this.qt.ri, v.Ci, (v._i + v.Si) / 2 + v.yi);
    }));
  }
  hi(t, n, a, r) {
    const { context: u, bitmapSize: c, mediaSize: d, horizontalPixelRatio: m, verticalPixelRatio: v } = t, g = this.qt.pi || !this.qt.ki ? n.C : 0, b = this.qt.Pi ? n.S : 0, x = n.A + this.ei.Ti, S = n.I + this.ei.Ri, w = n.V, M = n.B, N = this.qt.ri, j = n.k, T = a.Di(u, N), R = Math.ceil(a.Ii(u, N)), D = j + x + S, $ = n.S + w + M + R + g, G = Math.max(1, Math.floor(v));
    let A = Math.round(D * v);
    A % 2 != G % 2 && (A += 1);
    const X = b > 0 ? Math.max(1, Math.floor(b * m)) : 0, F = Math.round($ * m), I = Math.round(g * m), it = this.ei.Vi ?? this.ei.Bi ?? this.ei.Ei, nt = Math.round(it * v) - Math.floor(0.5 * v), yt = Math.floor(nt + G / 2 - A / 2), bt = yt + A, Bt = r === "right", B = Bt ? d.width - b : b, Z = Bt ? c.width - X : X;
    let st, ht, ft;
    return Bt ? (st = Z - F, ht = Z - I, ft = B - g - w - b) : (st = Z + F, ht = Z + I, ft = B + g + w), { li: Bt, ai: { _i: yt, mi: nt, Si: bt, ui: F, ci: A, ft: 2 * m, di: X, oi: st, fi: Z, wi: ht, Mi: G, bi: c.width }, xi: { _i: yt / v, Si: bt / v, Ci: ft, yi: T } };
  }
}
class hu {
  constructor(t) {
    this.Ai = { Ei: 0, G: "#000", Ri: 0, Ti: 0 }, this.Li = { ri: "", It: !1, pi: !0, ki: !1, Ht: "", R: "#FFF", gi: !1, Pi: !1 }, this.zi = { ri: "", It: !1, pi: !1, ki: !0, Ht: "", R: "#FFF", gi: !0, Pi: !0 }, this.xt = !0, this.Oi = new (t || Wg)(this.Li, this.Ai), this.Ni = new (t || Wg)(this.zi, this.Ai);
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
  $t(t, n = !1) {
    return Math.max(this.Oi.$t(t, n), this.Ni.$t(t, n));
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
class XN extends hu {
  constructor(t, n, a) {
    super(), this.Jt = t, this.Ki = n, this.Zi = a;
  }
  Yi(t, n, a) {
    if (t.It = !1, this.Jt.N().mode === 2) return;
    const r = this.Jt.N().horzLine;
    if (!r.labelVisible) return;
    const u = this.Ki.Lt();
    if (!this.Jt.It() || this.Ki.Gi() || u === null) return;
    const c = this.Ki.Xi().Z(r.labelBackgroundColor);
    a.G = c.G, t.R = c.X;
    const d = 2 / 12 * this.Ki.k();
    a.Ti = d, a.Ri = d;
    const m = this.Zi(this.Ki);
    a.Ei = m.Ei, t.ri = this.Ki.Ji(m.Mt, u), t.It = !0;
  }
}
const ZN = /[1-9]/g;
class i1 {
  constructor() {
    this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  st(t, n) {
    if (this.qt === null || this.qt.It === !1 || this.qt.ri.length === 0) return;
    const a = t.useMediaCoordinateSpace((({ context: x }) => (x.font = n.P, Math.round(n.Qi.Ii(x, W(this.qt).ri, ZN)))));
    if (a <= 0) return;
    const r = n.tn, u = a + 2 * r, c = u / 2, d = this.qt.nn;
    let m = this.qt.Ei, v = Math.floor(m - c) + 0.5;
    v < 0 ? (m += Math.abs(0 - v), v = Math.floor(m - c) + 0.5) : v + u > d && (m -= Math.abs(d - (v + u)), v = Math.floor(m - c) + 0.5);
    const g = v + u, b = Math.ceil(0 + n.S + n.C + n.A + n.k + n.I);
    t.useBitmapCoordinateSpace((({ context: x, horizontalPixelRatio: S, verticalPixelRatio: w }) => {
      const M = W(this.qt);
      x.fillStyle = M.G;
      const N = Math.round(v * S), j = Math.round(0 * w), T = Math.round(g * S), R = Math.round(b * w), D = Math.round(2 * S);
      if (x.beginPath(), x.moveTo(N, j), x.lineTo(N, R - D), x.arcTo(N, R, N + D, R, D), x.lineTo(T - D, R), x.arcTo(T, R, T, R - D, D), x.lineTo(T, j), x.fill(), M.pi) {
        const $ = Math.round(M.Ei * S), G = j, A = Math.round((G + n.C) * w);
        x.fillStyle = M.R;
        const X = Math.max(1, Math.floor(S)), F = Math.floor(0.5 * S);
        x.fillRect($ - F, G, X, A - G);
      }
    })), t.useMediaCoordinateSpace((({ context: x }) => {
      const S = W(this.qt), w = 0 + n.S + n.C + n.A + n.k / 2;
      x.font = n.P, x.textAlign = "left", x.textBaseline = "middle", x.fillStyle = S.R;
      const M = n.Qi.Di(x, "Apr0");
      x.translate(v + r, w + M), x.fillText(S.ri, 0, 0);
    }));
  }
}
class WN {
  constructor(t, n, a) {
    this.xt = !0, this.Xt = new i1(), this.Gt = { It: !1, G: "#4c525e", R: "white", ri: "", nn: 0, Ei: NaN, pi: !0 }, this.Ct = t, this.sn = n, this.Zi = a;
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
    const n = this.Ct.N().vertLine;
    if (!n.labelVisible) return;
    const a = this.sn.Et();
    if (a.Gi()) return;
    t.nn = a.nn();
    const r = this.Zi();
    if (r === null) return;
    t.Ei = r.Ei;
    const u = a.en(this.Ct.Bt());
    t.ri = a.rn(W(u)), t.It = !0;
    const c = this.sn.Xi().Z(n.labelBackgroundColor);
    t.G = c.G, t.R = c.X, t.pi = a.N().ticksVisible;
  }
}
class n1 {
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
class JN extends n1 {
  constructor(t, n) {
    super(), this.yt = null, this.fn = NaN, this.pn = 0, this.vn = !1, this.mn = /* @__PURE__ */ new Map(), this.wn = !1, this.Mn = /* @__PURE__ */ new WeakMap(), this.gn = /* @__PURE__ */ new WeakMap(), this.bn = NaN, this.Sn = NaN, this.xn = NaN, this.Cn = NaN, this.sn = t, this.yn = n, this.kn = /* @__PURE__ */ ((r, u) => (c) => {
      const d = u(), m = r();
      if (c === W(this.yt).Pn()) return { Mt: m, Ei: d };
      {
        const v = W(c.Lt());
        return { Mt: c.Tn(d, v), Ei: d };
      }
    })((() => this.fn), (() => this.Sn));
    const a = /* @__PURE__ */ ((r, u) => () => {
      const c = this.sn.Et().Rn(r()), d = u();
      return c && Number.isFinite(d) ? { wt: c, Ei: d } : null;
    })((() => this.pn), (() => this.ni()));
    this.Dn = new WN(this, t, a);
  }
  N() {
    return this.yn;
  }
  In(t, n) {
    this.xn = t, this.Cn = n;
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
  An(t, n, a) {
    this.wn || (this.wn = !0), this.vn = !0, this.Ln(t, n, a);
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
    const n = this.sn, a = n.Et();
    let r = null, u = null;
    for (const v of n.Wn()) {
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
    const c = [r, u].filter(Gg);
    if (c.length === 0) return t;
    const d = a.jt(t), m = c.map(((v) => Math.abs(d - a.jt(v))));
    return c[m.indexOf(Math.min(...m))];
  }
  jn(t) {
    let n = this.Mn.get(t);
    n || (n = new KN(this, t), this.Mn.set(t, n));
    let a = this.gn.get(t);
    return a || (a = new VN(this.sn, this, t), this.gn.set(t, a)), [n, a];
  }
  ti(t) {
    return t === this.yt && this.yn.horzLine.visible;
  }
  ii() {
    return this.yn.vertLine.visible;
  }
  qn(t, n) {
    this.vn && this.yt === t || this.mn.clear();
    const a = [];
    return this.yt === t && a.push(this.Yn(this.mn, n, this.kn)), a;
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
  Ln(t, n, a) {
    this.Xn(t, n, a) && this.Nn();
  }
  Xn(t, n, a) {
    const r = this.bn, u = this.Sn, c = this.fn, d = this.pn, m = this.yt, v = this.Gn(a);
    this.pn = t, this.bn = isNaN(t) ? NaN : this.sn.Et().jt(t), this.yt = a;
    const g = v !== null ? v.Lt() : null;
    return v !== null && g !== null ? (this.fn = n, this.Sn = v.Nt(n, g)) : (this.fn = NaN, this.Sn = NaN), r !== this.bn || u !== this.Sn || d !== this.pn || c !== this.fn || m !== this.yt;
  }
  On() {
    const t = this.sn.Jn().map(((a) => a.Un().Qn())).filter(Gg), n = t.length === 0 ? null : Math.max(...t);
    this.pn = n !== null ? n : NaN;
  }
  Yn(t, n, a) {
    let r = t.get(n);
    return r === void 0 && (r = new XN(this, n, a), t.set(n, r)), r;
  }
}
function du(s) {
  return s === "left" || s === "right";
}
class xe {
  constructor(t) {
    this.ts = /* @__PURE__ */ new Map(), this.ns = [], this.ss = t;
  }
  es(t, n) {
    const a = (function(r, u) {
      return r === void 0 ? u : { rs: Math.max(r.rs, u.rs), hs: r.hs || u.hs };
    })(this.ts.get(t), n);
    this.ts.set(t, a);
  }
  ls() {
    return this.ss;
  }
  _s(t) {
    const n = this.ts.get(t);
    return n === void 0 ? { rs: this.ss } : { rs: Math.max(this.ss, n.rs), hs: n.hs };
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
    for (const n of t.ns) this.xs(n);
    this.ss = Math.max(this.ss, t.ss), t.ts.forEach(((n, a) => {
      this.es(a, n);
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
    const t = this.ns.findIndex(((n) => n.ds === 5));
    t !== -1 && this.ns.splice(t, 1);
  }
}
class s1 {
  formatTickmarks(t) {
    return t.map(((n) => this.format(n)));
  }
}
const Jg = ".";
function un(s, t) {
  if (!Ea(s)) return "n/a";
  if (!Kl(t)) throw new TypeError("invalid length");
  if (t < 0 || t > 16) throw new TypeError("invalid length");
  return t === 0 ? s.toString() : ("0000000000000000" + s.toString()).slice(-t);
}
class fu extends s1 {
  constructor(t, n) {
    if (super(), n || (n = 1), Ea(t) && Kl(t) || (t = 100), t < 0) throw new TypeError("invalid base");
    this.Ki = t, this.ks = n, this.Ps();
  }
  format(t) {
    const n = t < 0 ? "−" : "";
    return t = Math.abs(t), n + this.Ts(t);
  }
  Ps() {
    if (this.Rs = 0, this.Ki > 0 && this.ks > 0) {
      let t = this.Ki;
      for (; t > 1; ) t /= 10, this.Rs++;
    }
  }
  Ts(t) {
    const n = this.Ki / this.ks;
    let a = Math.floor(t), r = "";
    const u = this.Rs !== void 0 ? this.Rs : NaN;
    if (n > 1) {
      let c = +(Math.round(t * n) - a * n).toFixed(this.Rs);
      c >= n && (c -= n, a += 1), r = Jg + un(+c.toFixed(this.Rs) * this.ks, u);
    } else a = Math.round(a * n) / n, u > 0 && (r = Jg + un(0, u));
    return a.toFixed(0) + r;
  }
}
class a1 extends fu {
  constructor(t = 100) {
    super(t);
  }
  format(t) {
    return `${super.format(t)}%`;
  }
}
class IN extends s1 {
  constructor(t) {
    super(), this.Ds = t;
  }
  format(t) {
    let n = "";
    return t < 0 && (n = "-", t = -t), t < 995 ? n + this.Is(t) : t < 999995 ? n + this.Is(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), n + this.Is(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), n + this.Is(t / 1e9) + "B");
  }
  Is(t) {
    let n;
    const a = Math.pow(10, this.Ds);
    return n = (t = Math.round(t * a) / a) >= 1e-15 && t < 1 ? t.toFixed(this.Ds).replace(/\.?0+$/, "") : String(t), n.replace(/(\.[1-9]*)0+$/, ((r, u) => u));
  }
}
const FN = /[2-9]/g;
class Po {
  constructor(t = 50) {
    this.Vs = 0, this.Bs = 1, this.Es = 1, this.As = {}, this.Ls = /* @__PURE__ */ new Map(), this.zs = t;
  }
  Os() {
    this.Vs = 0, this.Ls.clear(), this.Bs = 1, this.Es = 1, this.As = {};
  }
  Ii(t, n, a) {
    return this.Ns(t, n, a).width;
  }
  Di(t, n, a) {
    const r = this.Ns(t, n, a);
    return ((r.actualBoundingBoxAscent || 0) - (r.actualBoundingBoxDescent || 0)) / 2;
  }
  Ns(t, n, a) {
    const r = a || FN, u = String(n).replace(r, "0");
    if (this.Ls.has(u)) return Ye(this.Ls.get(u)).Fs;
    if (this.Vs === this.zs) {
      const d = this.As[this.Es];
      delete this.As[this.Es], this.Ls.delete(d), this.Es++, this.Vs--;
    }
    t.save(), t.textBaseline = "middle";
    const c = t.measureText(u);
    return t.restore(), c.width === 0 && n.length || (this.Ls.set(u, { Fs: c, Ws: this.Bs }), this.As[this.Bs] = u, this.Vs++, this.Bs++), c;
  }
}
class PN {
  constructor(t) {
    this.Hs = null, this.M = null, this.Us = "right", this.$s = t;
  }
  js(t, n, a) {
    this.Hs = t, this.M = n, this.Us = a;
  }
  st(t) {
    this.M !== null && this.Hs !== null && this.Hs.st(t, this.M, this.$s, this.Us);
  }
}
class l1 {
  constructor(t, n, a) {
    this.qs = t, this.$s = new Po(50), this.Ys = n, this.O = a, this.F = -1, this.Xt = new PN(this.$s);
  }
  Tt() {
    const t = this.O.Ks(this.Ys);
    if (t === null) return null;
    const n = t.Zs(this.Ys) ? t.Gs() : this.Ys.Ft();
    if (n === null) return null;
    const a = t.Xs(n);
    if (a === "overlay") return null;
    const r = this.O.Js();
    return r.k !== this.F && (this.F = r.k, this.$s.Os()), this.Xt.js(this.qs.qi(), r, a), this.Xt;
  }
}
class tC extends Ms {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  Qs(t, n) {
    if (!this.qt?.It) return null;
    const { ut: a, ct: r, te: u } = this.qt;
    return n >= a - r - 7 && n <= a + r + 7 ? { ie: this.qt, ne: Math.abs(n - a), se: 2, ee: "price-line", te: u } : null;
  }
  et({ context: t, bitmapSize: n, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null || this.qt.It === !1) return;
    const u = Math.round(this.qt.ut * r);
    u < 0 || u > n.height || (t.lineCap = "butt", t.strokeStyle = this.qt.R, t.lineWidth = Math.floor(this.qt.ct * a), Qn(t, this.qt.Zt), Fb(t, u, 0, n.width));
  }
}
class Pd {
  constructor(t) {
    this.re = { ut: 0, R: "rgba(0, 0, 0, 0)", ct: 1, Zt: 0, It: !1 }, this.he = new tC(), this.xt = !0, this.ae = t, this.le = t.Qt(), this.he.ht(this.re);
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    return this.ae.It() ? (this.xt && (this.oe(), this.xt = !1), this.he) : null;
  }
}
class eC extends Pd {
  constructor(t) {
    super(t);
  }
  oe() {
    this.re.It = !1;
    const t = this.ae.Ft(), n = t._e()._e;
    if (n !== 2 && n !== 3) return;
    const a = this.ae.N();
    if (!a.baseLineVisible || !this.ae.It()) return;
    const r = this.ae.Lt();
    r !== null && (this.re.It = !0, this.re.ut = t.Nt(r.Wt, r.Wt), this.re.R = a.baseLineColor, this.re.ct = a.baseLineWidth, this.re.Zt = a.baseLineStyle);
  }
}
class iC extends Ms {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  ue() {
    return this.qt;
  }
  et({ context: t, horizontalPixelRatio: n, verticalPixelRatio: a }) {
    const r = this.qt;
    if (r === null) return;
    const u = Math.max(1, Math.floor(n)), c = u % 2 / 2, d = Math.round(r.ce.x * n) + c, m = r.ce.y * a;
    t.fillStyle = r.de, t.beginPath();
    const v = Math.max(2, 1.5 * r.fe) * n;
    t.arc(d, m, v, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = r.pe, t.beginPath(), t.arc(d, m, r.ft * n, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = u, t.strokeStyle = r.ve, t.beginPath(), t.arc(d, m, r.ft * n + u / 2, 0, 2 * Math.PI, !1), t.stroke();
  }
}
const nC = [{ me: 0, we: 0.25, Me: 4, ge: 10, be: 0.25, Se: 0, xe: 0.4, Ce: 0.8 }, { me: 0.25, we: 0.525, Me: 10, ge: 14, be: 0, Se: 0, xe: 0.8, Ce: 0 }, { me: 0.525, we: 1, Me: 14, ge: 14, be: 0, Se: 0, xe: 0, Ce: 0 }];
class sC {
  constructor(t) {
    this.Xt = new iC(), this.xt = !0, this.ye = !0, this.ke = performance.now(), this.Pe = this.ke - 1, this.Te = t;
  }
  Re() {
    this.Pe = this.ke - 1, this.kt();
  }
  De() {
    if (this.kt(), this.Te.N().lastPriceAnimation === 2) {
      const t = performance.now(), n = this.Pe - t;
      if (n > 0) return void (n < 650 && (this.Pe += 2600));
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
    const t = this.Te.Qt().Et(), n = t.Ee(), a = this.Te.Lt();
    if (n === null || a === null) return;
    const r = this.Te.Ae(!0);
    if (r.Le || !n.ze(r.$n)) return;
    const u = { x: t.jt(r.$n), y: this.Te.Ft().Nt(r.Mt, a.Wt) }, c = r.R, d = this.Te.N().lineWidth, m = this.Oe(this.Ne(), c);
    this.Xt.ht({ de: c, fe: d, pe: m.pe, ve: m.ve, ft: m.ft, ce: u });
  }
  Be() {
    const t = this.Xt.ue();
    if (t !== null) {
      const n = this.Oe(this.Ne(), t.de);
      t.pe = n.pe, t.ve = n.ve, t.ft = n.ft;
    }
  }
  Ne() {
    return this.Ve() ? performance.now() - this.ke : 2599;
  }
  Fe(t, n, a, r) {
    const u = a + (r - a) * n;
    return this.Te.Qt().Xi().Y(t, u);
  }
  Oe(t, n) {
    const a = t % 2600 / 2600;
    let r;
    for (const v of nC) if (a >= v.me && a <= v.we) {
      r = v;
      break;
    }
    we(r !== void 0, "Last price animation internal logic error");
    const u = (a - r.me) / (r.we - r.me);
    return { pe: this.Fe(n, u, r.be, r.Se), ve: this.Fe(n, u, r.xe, r.Ce), ft: (c = u, d = r.Me, m = r.ge, d + (m - d) * c) };
    var c, d, m;
  }
}
class aC extends Pd {
  constructor(t) {
    super(t);
  }
  oe() {
    const t = this.re;
    t.It = !1;
    const n = this.ae.N();
    if (!n.priceLineVisible || !this.ae.It()) return;
    const a = this.ae.Ae(n.priceLineSource === 0);
    a.Le || (t.It = !0, t.ut = a.Ei, t.R = this.ae.We(a.R), t.ct = n.priceLineWidth, t.Zt = n.priceLineStyle);
  }
}
class lC extends hu {
  constructor(t) {
    super(), this.Jt = t;
  }
  Yi(t, n, a) {
    t.It = !1, n.It = !1;
    const r = this.Jt;
    if (!r.It()) return;
    const u = r.N(), c = u.lastValueVisible, d = r.He() !== "", m = u.seriesLastValueMode === 0, v = r.Ae(!1);
    if (v.Le) return;
    c && (t.ri = this.Ue(v, c, m), t.It = t.ri.length !== 0), (d || m) && (n.ri = this.$e(v, c, d, m), n.It = n.ri.length > 0);
    const g = r.We(v.R), b = this.Jt.Qt().Xi().Z(g);
    a.G = b.G, a.Ei = v.Ei, n.Ht = r.Qt().Ut(v.Ei / r.Ft().$t()), t.Ht = g, t.R = b.X, n.R = b.X;
  }
  $e(t, n, a, r) {
    let u = "";
    const c = this.Jt.He();
    return a && c.length !== 0 && (u += `${c} `), n && r && (u += this.Jt.Ft().je() ? t.qe : t.Ye), u.trim();
  }
  Ue(t, n, a) {
    return n ? a ? this.Jt.Ft().je() ? t.Ye : t.qe : t.ri : "";
  }
}
function Ig(s, t, n, a) {
  const r = Number.isFinite(t), u = Number.isFinite(n);
  return r && u ? s(t, n) : r || u ? r ? t : n : a;
}
class je {
  constructor(t, n) {
    this.Ke = t, this.Ze = n;
  }
  Ge(t) {
    return t !== null && this.Ke === t.Ke && this.Ze === t.Ze;
  }
  Xe() {
    return new je(this.Ke, this.Ze);
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
    return t === null ? this : new je(Ig(Math.min, this.Je(), t.Je(), -1 / 0), Ig(Math.max, this.Qe(), t.Qe(), 1 / 0));
  }
  ir(t) {
    if (!Ea(t) || this.Ze - this.Ke === 0) return;
    const n = 0.5 * (this.Ze + this.Ke);
    let a = this.Ze - n, r = this.Ke - n;
    a *= t, r *= t, this.Ze = n + a, this.Ke = n + r;
  }
  nr(t) {
    Ea(t) && (this.Ze += t, this.Ke += t);
  }
  sr() {
    return { minValue: this.Ke, maxValue: this.Ze };
  }
  static er(t) {
    return t === null ? null : new je(t.minValue, t.maxValue);
  }
}
class tu {
  constructor(t, n) {
    this.rr = t, this.hr = n || null;
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
    return t === null ? null : new tu(je.er(t.priceRange), t.margins);
  }
}
const rC = [2, 4, 8, 16, 32, 64, 128, 256, 512], oC = "Custom series with conflation reducer must have a priceValueBuilder method";
class uC extends Pd {
  constructor(t, n) {
    super(t), this._r = n;
  }
  oe() {
    const t = this.re;
    t.It = !1;
    const n = this._r.N();
    if (!this.ae.It() || !n.lineVisible) return;
    const a = this._r.ur();
    a !== null && (t.It = !0, t.ut = a, t.R = n.color, t.ct = n.lineWidth, t.Zt = n.lineStyle, t.te = this._r.N().id);
  }
}
class cC extends hu {
  constructor(t, n) {
    super(), this.Te = t, this._r = n;
  }
  Yi(t, n, a) {
    t.It = !1, n.It = !1;
    const r = this._r.N(), u = r.axisLabelVisible, c = r.title !== "", d = this.Te;
    if (!u || !d.It()) return;
    const m = this._r.ur();
    if (m === null) return;
    c && (n.ri = r.title, n.It = !0), n.Ht = d.Qt().Ut(m / d.Ft().$t()), t.ri = this.cr(r.price), t.It = !0;
    const v = this.Te.Qt().Xi().Z(r.axisLabelColor || r.color);
    a.G = v.G;
    const g = r.axisLabelTextColor || v.X;
    t.R = g, n.R = g, a.Ei = m;
  }
  cr(t) {
    const n = this.Te.Lt();
    return n === null ? "" : this.Te.Ft().Ji(t, n.Wt);
  }
}
class hC {
  constructor(t, n) {
    this.Te = t, this.yn = n, this.dr = new uC(t, this), this.qs = new cC(t, this), this.pr = new l1(this.qs, t, t.Qt());
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
    const t = this.Te, n = t.Ft();
    if (t.Qt().Et().Gi() || n.Gi()) return null;
    const a = t.Lt();
    return a === null ? null : n.Nt(this.yn.price, a.Wt);
  }
}
class dC {
  constructor() {
    this.br = /* @__PURE__ */ new WeakMap();
  }
  Sr(t, n, a) {
    const r = 1 / n * a;
    if (t >= r) return 1;
    const u = r / t, c = Math.pow(2, Math.floor(Math.log2(u)));
    return Math.min(c, 512);
  }
  Cr(t, n, a, r = !1, u) {
    if (t.length === 0 || n <= 1) return t;
    const c = this.yr(n);
    if (c <= 1) return t;
    const d = this.kr(t);
    let m = d.Pr.get(c);
    return m !== void 0 || (m = this.Tr(t, c, a, r, u, d.Pr), d.Pr.set(c, m)), m;
  }
  Rr(t, n, a, r, u = !1, c) {
    if (a < 1 || t.length === 0) return t;
    const d = this.kr(t), m = d.Pr.get(a);
    if (!m) return this.Cr(t, a, r, u, c);
    const v = this.Dr(t, n, a, m, u, r, c);
    return d.Pr.set(a, v), v;
  }
  yr(t) {
    if (t <= 2) return 2;
    for (const n of rC) if (t <= n) return n;
    return 512;
  }
  Ir(t) {
    if (t.length === 0) return 0;
    const n = t[0], a = t[t.length - 1];
    return 31 * t.length + 17 * n.$n + 13 * a.$n;
  }
  Tr(t, n, a, r = !1, u, c = /* @__PURE__ */ new Map()) {
    if (n === 2) return this.Vr(t, 2, a, r, u);
    const d = n / 2;
    let m = c.get(d);
    return m || (m = this.Tr(t, d, a, r, u, c), c.set(d, m)), this.Br(m, a, r, u);
  }
  Vr(t, n, a, r = !1, u) {
    const c = this.Er(t, n, a, r, u);
    return this.Ar(c, r);
  }
  Br(t, n, a = !1, r) {
    const u = this.Er(t, 2, n, a, r);
    return this.Ar(u, a);
  }
  Er(t, n, a, r = !1, u) {
    const c = [];
    for (let d = 0; d < t.length; d += n)
      if (t.length - d >= n) {
        const m = this.Lr(t[d], t[d + 1], a, r, u);
        m.zr = !1, c.push(m);
      } else if (c.length === 0) c.push(this.Or(t[d], !0));
      else {
        const m = c[c.length - 1];
        c[c.length - 1] = this.Nr(m, t[d], a, r, u);
      }
    return c;
  }
  Fr(t, n) {
    return (t ?? 1) + (n ?? 1);
  }
  Lr(t, n, a, r = !1, u) {
    if (!r || !a || !u) {
      const v = t.Wt[1] > n.Wt[1] ? t.Wt[1] : n.Wt[1], g = t.Wt[2] < n.Wt[2] ? t.Wt[2] : n.Wt[2];
      return { Wr: t.$n, Hr: n.$n, Ur: t.wt, $r: n.wt, jr: t.Wt[0], qr: v, Yr: g, Kr: n.Wt[3], Zr: this.Fr(t.Zr, n.Zr), Gr: void 0, zr: !1 };
    }
    const c = a(this.Xr(t, u), this.Xr(n, u)), d = u(c), m = d.length ? d[d.length - 1] : 0;
    return { Wr: t.$n, Hr: n.$n, Ur: t.wt, $r: n.wt, jr: t.Wt[0], qr: Math.max(t.Wt[1], m), Yr: Math.min(t.Wt[2], m), Kr: m, Zr: this.Fr(t.Zr, n.Zr), Gr: c, zr: !1 };
  }
  Nr(t, n, a, r = !1, u) {
    if (!r || !a || !u) return { Wr: t.Wr, Hr: n.$n, Ur: t.Ur, $r: n.wt, jr: t.jr, qr: t.qr > n.Wt[1] ? t.qr : n.Wt[1], Yr: t.Yr < n.Wt[2] ? t.Yr : n.Wt[2], Kr: n.Wt[3], Zr: t.Zr + (n.Zr ?? 1), Gr: t.Gr, zr: !1 };
    const c = t.Gr, d = this.Xr(n, u), m = c ? { data: c, index: t.Wr, originalTime: t.Ur, time: t.Ur, priceValues: u(c) } : null, v = m ? a(m, d) : d.data, g = m ? u(v) : d.priceValues, b = g.length ? g[g.length - 1] : 0;
    return { Wr: t.Wr, Hr: n.$n, Ur: t.Ur, $r: n.wt, jr: t.jr, qr: Math.max(t.qr, b), Yr: Math.min(t.Yr, b), Kr: b, Zr: t.Zr + (n.Zr ?? 1), Gr: v, zr: !1 };
  }
  Jr(t, n, a, r, u, c, d = !1, m) {
    const v = n === r ? u : t[n];
    if (a - n == 1) return this.Or(v, !0);
    const g = n + 1 === r ? u : t[n + 1];
    let b = this.Lr(v, g, c, d, m);
    for (let x = n + 2; x < a; x++) {
      const S = x === r ? u : t[x];
      b = this.Nr(b, S, c, d, m);
    }
    return b;
  }
  Xr(t, n) {
    const a = t.ue ?? {};
    return { data: t.ue, index: t.$n, originalTime: t.Qr, time: t.wt, priceValues: n(a) };
  }
  th(t, n = !1) {
    const a = n === !0, r = !!t.Gr;
    return { $n: t.Wr, wt: t.Ur, Qr: t.Ur, Wt: [a ? t.Kr : t.jr, t.qr, t.Yr, t.Kr], Zr: t.Zr, ue: a ? r ? t.Gr : { wt: t.Ur } : void 0 };
  }
  Ar(t, n = !1) {
    return t.map(((a) => this.th(a, n)));
  }
  Dr(t, n, a, r, u = !1, c, d) {
    if (r.length === 0) return r;
    const m = t.length - 1, v = Math.floor(m / a) * a;
    if (Math.min(v + a, t.length) - v < a && t.length > a) {
      const g = t.slice();
      return g[g.length - 1] = n, this.Cr(g, a, c, u, d);
    }
    if (Math.floor((m - 1) / a) === Math.floor(m / a) || r.length === 1) {
      const g = Math.min(v + a, t.length), b = g - v;
      if (b <= 0) return r;
      const x = b === 1 ? this.Or(v === m ? n : t[v], !0) : this.Jr(t, v, g, m, n, c, u, d);
      return r[r.length - 1] = this.th(x, u), r;
    }
    {
      const g = t.slice();
      return g[g.length - 1] = n, this.Cr(g, a, c, u, d);
    }
  }
  Or(t, n = !1) {
    return { Wr: t.$n, Hr: t.$n, Ur: t.wt, $r: t.wt, jr: t.Wt[0], qr: t.Wt[1], Yr: t.Wt[2], Kr: t.Wt[3], Zr: t.Zr ?? 1, Gr: t.ue, zr: n };
  }
  kr(t) {
    const n = this.ih(t), a = this.Ir(t);
    return n.nh !== a && (n.Pr.clear(), n.nh = a), n;
  }
  ih(t) {
    let n = this.br.get(t);
    return n === void 0 && (n = { nh: this.Ir(t), Pr: /* @__PURE__ */ new Map() }, this.br.set(t, n)), n;
  }
}
class fC extends n1 {
  constructor(t) {
    super(), this.sn = t;
  }
  Qt() {
    return this.sn;
  }
}
const mC = { Bar: (s, t, n, a) => {
  const r = t.upColor, u = t.downColor, c = W(s(n, a)), d = Un(c.Wt[0]) <= Un(c.Wt[3]);
  return { sh: c.R ?? (d ? r : u) };
}, Candlestick: (s, t, n, a) => {
  const r = t.upColor, u = t.downColor, c = t.borderUpColor, d = t.borderDownColor, m = t.wickUpColor, v = t.wickDownColor, g = W(s(n, a)), b = Un(g.Wt[0]) <= Un(g.Wt[3]);
  return { sh: g.R ?? (b ? r : u), eh: g.Ht ?? (b ? c : d), rh: g.hh ?? (b ? m : v) };
}, Custom: (s, t, n, a) => ({ sh: W(s(n, a)).R ?? t.color }), Area: (s, t, n, a) => {
  const r = W(s(n, a));
  return { sh: r.vt ?? t.lineColor, vt: r.vt ?? t.lineColor, ah: r.ah ?? t.topColor, oh: r.oh ?? t.bottomColor };
}, Baseline: (s, t, n, a) => {
  const r = W(s(n, a));
  return { sh: r.Wt[3] >= t.baseValue.price ? t.topLineColor : t.bottomLineColor, _h: r._h ?? t.topLineColor, uh: r.uh ?? t.bottomLineColor, dh: r.dh ?? t.topFillColor1, fh: r.fh ?? t.topFillColor2, ph: r.ph ?? t.bottomFillColor1, mh: r.mh ?? t.bottomFillColor2 };
}, Line: (s, t, n, a) => {
  const r = W(s(n, a));
  return { sh: r.R ?? t.color, vt: r.R ?? t.color };
}, Histogram: (s, t, n, a) => ({ sh: W(s(n, a)).R ?? t.color }) };
class pC {
  constructor(t) {
    this.wh = (n, a) => a !== void 0 ? a.Wt : this.Te.Un().Mh(n), this.Te = t, this.gh = mC[t.bh()];
  }
  Sh(t, n) {
    return this.gh(this.wh, this.Te.N(), t, n);
  }
}
function r1(s, t, n, a, r = 0, u = t.length) {
  let c = u - r;
  for (; 0 < c; ) {
    const d = c >> 1, m = r + d;
    a(t[m], n) === s ? (r = m + 1, c -= d + 1) : c = d;
  }
  return r;
}
const xs = r1.bind(null, !0), tf = r1.bind(null, !1);
var Fg;
(function(s) {
  s[s.NearestLeft = -1] = "NearestLeft", s[s.None = 0] = "None", s[s.NearestRight = 1] = "NearestRight";
})(Fg || (Fg = {}));
const Rn = 30;
class vC {
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
  Hn(t, n = 0) {
    const a = this.Ih(t, n);
    return a === null ? null : { ...this.Vh(a), $n: this.Dh(a) };
  }
  Bh() {
    return this.xh;
  }
  Eh(t, n, a) {
    if (this.Gi()) return null;
    let r = null;
    for (const u of a)
      r = jo(r, this.Ah(t, n, u));
    return r;
  }
  ht(t) {
    this.yh.clear(), this.Ch.clear(), this.xh = t, this.kh = t.map(((n) => n.$n));
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
  Ih(t, n) {
    const a = this.zh(t);
    if (a === null && n !== 0) switch (n) {
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
    let n = this.Fh(t);
    return n > 0 && (n -= 1), n !== this.xh.length && this.Dh(n) < t ? n : null;
  }
  Nh(t) {
    const n = this.Wh(t);
    return n !== this.xh.length && t < this.Dh(n) ? n : null;
  }
  zh(t) {
    const n = this.Fh(t);
    return n === this.xh.length || t < this.xh[n].$n ? null : n;
  }
  Fh(t) {
    return xs(this.xh, t, ((n, a) => n.$n < a));
  }
  Wh(t) {
    return tf(this.xh, t, ((n, a) => n.$n > a));
  }
  Hh(t, n, a) {
    let r = null;
    for (let u = t; u < n; u++) {
      const c = this.xh[u].Wt[a];
      Number.isNaN(c) || (r === null ? r = { Uh: c, $h: c } : (c < r.Uh && (r.Uh = c), c > r.$h && (r.$h = c)));
    }
    return r;
  }
  Ah(t, n, a) {
    if (this.Gi()) return null;
    let r = null;
    const u = W(this.Rh()), c = W(this.Qn()), d = Math.max(t, u), m = Math.min(n, c), v = Math.ceil(d / Rn) * Rn, g = Math.max(v, Math.floor(m / Rn) * Rn);
    {
      const x = this.Fh(d), S = this.Wh(Math.min(m, v, n));
      r = jo(r, this.Hh(x, S, a));
    }
    let b = this.Ch.get(a);
    b === void 0 && (b = /* @__PURE__ */ new Map(), this.Ch.set(a, b));
    for (let x = Math.max(v + 1, d); x < g; x += Rn) {
      const S = Math.floor(x / Rn);
      let w = b.get(S);
      if (w === void 0) {
        const M = this.Fh(S * Rn), N = this.Wh((S + 1) * Rn - 1);
        w = this.Hh(M, N, a), b.set(S, w);
      }
      r = jo(r, w);
    }
    {
      const x = this.Fh(g), S = this.Wh(m);
      r = jo(r, this.Hh(x, S, a));
    }
    return r;
  }
}
function jo(s, t) {
  return s === null ? t : t === null ? s : { Uh: Math.min(s.Uh, t.Uh), $h: Math.max(s.$h, t.$h) };
}
function Yh() {
  return new vC();
}
const eu = { setLineStyle: Qn };
class gC {
  constructor(t) {
    this.jh = t;
  }
  st(t, n, a) {
    this.jh.draw(t, eu);
  }
  qh(t, n, a) {
    this.jh.drawBackground?.(t, eu);
  }
}
class bC {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const n = new gC(t);
    return this.Ls = { Kh: t, Zh: n }, n;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
class o1 {
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
    const n = t.map(((a) => new bC(a)));
    return this.Xh = { Kh: t, Zh: n }, n;
  }
  Qs(t, n) {
    return this.Jh.hitTest?.(t, n) ?? null;
  }
}
let yC = class extends o1 {
  cn() {
    return [];
  }
};
class xC {
  constructor(t) {
    this.jh = t;
  }
  st(t, n, a) {
    this.jh.draw(t, eu);
  }
  qh(t, n, a) {
    this.jh.drawBackground?.(t, eu);
  }
}
class Pg {
  constructor(t) {
    this.Ls = null, this.Yh = t;
  }
  Tt() {
    const t = this.Yh.renderer();
    if (t === null) return null;
    if (this.Ls?.Kh === t) return this.Ls.Zh;
    const n = new xC(t);
    return this.Ls = { Kh: t, Zh: n }, n;
  }
  Gh() {
    return this.Yh.zOrder?.() ?? "normal";
  }
}
function u1(s) {
  return { ri: s.text(), Ei: s.coordinate(), Vi: s.fixedCoordinate?.(), R: s.textColor(), G: s.backColor(), It: s.visible?.() ?? !0, pi: s.tickVisible?.() ?? !0 };
}
class wC {
  constructor(t, n) {
    this.Xt = new i1(), this.ta = t, this.ia = n;
  }
  Tt() {
    return this.Xt.ht({ nn: this.ia.nn(), ...u1(this.ta) }), this.Xt;
  }
}
class _C extends hu {
  constructor(t, n) {
    super(), this.ta = t, this.Ki = n;
  }
  Yi(t, n, a) {
    const r = u1(this.ta);
    a.G = r.G, t.R = r.R;
    const u = 2 / 12 * this.Ki.k();
    a.Ti = u, a.Ri = u, a.Ei = r.Ei, a.Vi = r.Vi, t.ri = r.ri, t.It = r.It, t.pi = r.pi;
  }
}
class SC extends o1 {
  constructor(t, n) {
    super(t), this.na = null, this.sa = null, this.ea = null, this.ra = null, this.Te = n;
  }
  dn() {
    const t = this.Jh.timeAxisViews?.() ?? [];
    if (this.na?.Kh === t) return this.na.Zh;
    const n = this.Te.Qt().Et(), a = t.map(((r) => new wC(r, n)));
    return this.na = { Kh: t, Zh: a }, a;
  }
  qn() {
    const t = this.Jh.priceAxisViews?.() ?? [];
    if (this.sa?.Kh === t) return this.sa.Zh;
    const n = this.Te.Ft(), a = t.map(((r) => new _C(r, n)));
    return this.sa = { Kh: t, Zh: a }, a;
  }
  ha() {
    const t = this.Jh.priceAxisPaneViews?.() ?? [];
    if (this.ea?.Kh === t) return this.ea.Zh;
    const n = t.map(((a) => new Pg(a)));
    return this.ea = { Kh: t, Zh: n }, n;
  }
  aa() {
    const t = this.Jh.timeAxisPaneViews?.() ?? [];
    if (this.ra?.Kh === t) return this.ra.Zh;
    const n = t.map(((a) => new Pg(a)));
    return this.ra = { Kh: t, Zh: n }, n;
  }
  la(t, n) {
    return this.Jh.autoscaleInfo?.(t, n) ?? null;
  }
}
function Vh(s, t, n, a) {
  s.forEach(((r) => {
    t(r).forEach(((u) => {
      u.Gh() === n && a.push(u);
    }));
  }));
}
function Gh(s) {
  return s.jn();
}
function MC(s) {
  return s.ha();
}
function NC(s) {
  return s.aa();
}
const CC = ["Area", "Line", "Baseline"];
class mu extends fC {
  constructor(t, n, a, r, u) {
    super(t), this.qt = Yh(), this.dr = new aC(this), this.oa = [], this._a = new eC(this), this.ua = null, this.ca = null, this.da = null, this.fa = [], this.pa = new dC(), this.va = /* @__PURE__ */ new Map(), this.ma = null, this.yn = a, this.wa = n;
    const c = new lC(this);
    if (this.mn = [c], this.pr = new l1(c, this, t), CC.includes(this.wa) && (this.ua = new sC(this)), this.Ma(), this.Yh = r(this, this.Qt(), u), this.wa === "Custom") {
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
    const n = { Le: !0 }, a = this.Ft();
    if (this.Qt().Et().Gi() || a.Gi() || this.qt.Gi()) return n;
    const r = this.Qt().Et().Ee(), u = this.Lt();
    if (r === null || u === null) return n;
    let c, d;
    if (t) {
      const b = this.qt.Ph();
      if (b === null) return n;
      c = b, d = b.$n;
    } else {
      const b = this.qt.Hn(r.bi(), -1);
      if (b === null || (c = this.qt.Mh(b.$n), c === null)) return n;
      d = b.$n;
    }
    const m = c.Wt[3], v = this.Sa().Sh(d, { Wt: c }), g = a.Nt(m, u.Wt);
    return { Le: !1, Mt: m, ri: a.Ji(m, u.Wt), qe: a.xa(m), Ye: a.Ca(m, u.Wt), R: v.sh, Ei: g, $n: d };
  }
  Sa() {
    return this.ca !== null || (this.ca = new pC(this)), this.ca;
  }
  N() {
    return this.yn;
  }
  vr(t) {
    const n = this.Qt(), { priceScaleId: a, visible: r, priceFormat: u } = t;
    a !== void 0 && a !== this.yn.priceScaleId && n.ya(this, a), r !== void 0 && r !== this.yn.visible && n.ka();
    const c = t.conflationThresholdFactor !== void 0;
    Pe(this.yn, t), c && (this.va.clear(), this.Qt().mr()), u !== void 0 && (this.Ma(), n.Pa()), n.Ta(this), n.Ra(), this.Yh.kt("options");
  }
  ht(t, n) {
    this.qt.ht(t), this.va.clear();
    const a = this.Qt().Et().N();
    a.enableConflation && a.precomputeConflationOnInit && this.Da(a.precomputeConflationPriority), this.Yh.kt("data"), this.ua !== null && (n && n.Ia ? this.ua.De() : t.length === 0 && this.ua.Re());
    const r = this.Qt().Ks(this);
    this.Qt().Va(r), this.Qt().Ta(this), this.Qt().Ra(), this.Qt().mr();
  }
  Ba(t) {
    const n = new hC(this, t);
    return this.oa.push(n), this.Qt().Ta(this), n;
  }
  Ea(t) {
    const n = this.oa.indexOf(t);
    n !== -1 && this.oa.splice(n, 1), this.Qt().Ta(this);
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
    const n = t.Oa();
    return this.qt.Hn(n, 1);
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
    const n = this.Fa();
    if (!this.va.has(n)) return;
    const a = this.wa === "Custom", r = a && this.ma || void 0, u = a && this.Yh.Wa ? (m) => {
      const v = m, g = this.Yh.Wa(v);
      return Array.isArray(g) ? g : [typeof g == "number" ? g : 0];
    } : void 0, c = this.pa.Rr(this.qt.Bh(), t, n, r, a, u), d = Yh();
    d.ht(c), this.va.set(n, d);
  }
  Ha() {
    const t = this.Qt().Et().N().enableConflation;
    if (this.wa === "Custom" && this.ma === null) return this.qt;
    if (!t) return this.qt;
    const n = this.Fa(), a = this.va.get(n);
    return a || (this.Ua(n), this.va.get(n) ?? this.qt);
  }
  $a(t) {
    const n = this.qt.Mh(t);
    return n === null ? null : this.wa === "Bar" || this.wa === "Candlestick" || this.wa === "Custom" ? { jr: n.Wt[0], qr: n.Wt[1], Yr: n.Wt[2], Kr: n.Wt[3] } : n.Wt[3];
  }
  ja(t) {
    const n = [];
    Vh(this.fa, Gh, "top", n);
    const a = this.ua;
    return a !== null && a.It() && (this.da === null && a.Ve() && (this.da = setTimeout((() => {
      this.da = null, this.Qt().qa();
    }), 0)), a.Ie(), n.unshift(a)), n;
  }
  jn() {
    const t = [];
    this.Ya() || t.push(this._a), t.push(this.Yh, this.dr);
    const n = this.oa.map(((a) => a.wr()));
    return t.push(...n), Vh(this.fa, Gh, "normal", t), t;
  }
  Ka() {
    return this.Za(Gh, "bottom");
  }
  Ga(t) {
    return this.Za(MC, t);
  }
  Xa(t) {
    return this.Za(NC, t);
  }
  Ja(t, n) {
    return this.fa.map(((a) => a.Qs(t, n))).filter(((a) => a !== null));
  }
  cn() {
    return [this.pr, ...this.oa.map(((t) => t.Mr()))];
  }
  qn(t, n) {
    if (n !== this.hn && !this.Ya()) return [];
    const a = [...this.mn];
    for (const r of this.oa) a.push(r.gr());
    return this.fa.forEach(((r) => {
      a.push(...r.qn());
    })), a;
  }
  dn() {
    const t = [];
    return this.fa.forEach(((n) => {
      t.push(...n.dn());
    })), t;
  }
  la(t, n) {
    if (this.yn.autoscaleInfoProvider !== void 0) {
      const a = this.yn.autoscaleInfoProvider((() => {
        const r = this.Qa(t, n);
        return r === null ? null : r.sr();
      }));
      return tu.er(a);
    }
    return this.Qa(t, n);
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
    const n = this.qt.Mh(t);
    return n === null ? null : { Mt: n.Wt[3], ft: this.nl(), Ht: this.sl(), Ot: this.el(), zt: this.rl(t) };
  }
  He() {
    return this.yn.title;
  }
  It() {
    return this.yn.visible;
  }
  hl(t) {
    this.fa.push(new SC(t, this));
  }
  al(t) {
    this.fa = this.fa.filter(((n) => n.Qh() !== t));
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
  Qa(t, n) {
    if (!Kl(t) || !Kl(n) || this.qt.Gi()) return null;
    const a = this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline" || this.wa === "Histogram" ? [3] : [2, 1], r = this.qt.Eh(t, n, a);
    let u = r !== null ? new je(r.Uh, r.$h) : null, c = null;
    if (this.bh() === "Histogram") {
      const d = this.yn.base, m = new je(d, d);
      u = u !== null ? u.Ss(m) : m;
    }
    return this.fa.forEach(((d) => {
      const m = d.la(t, n);
      if (m?.priceRange) {
        const v = new je(m.priceRange.minValue, m.priceRange.maxValue);
        u = u !== null ? u.Ss(v) : v;
      }
      m?.margins && (c = m.margins);
    })), new tu(u, c);
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
        const n = this.yn.crosshairMarkerBackgroundColor;
        if (n.length !== 0) return n;
      }
    }
    return this.Sa().Sh(t).sh;
  }
  Ma() {
    switch (this.yn.priceFormat.type) {
      case "custom": {
        const t = this.yn.priceFormat.formatter;
        this.il = { format: t, formatTickmarks: this.yn.priceFormat.tickmarksFormatter ?? ((n) => n.map(t)) };
        break;
      }
      case "volume":
        this.il = new IN(this.yn.priceFormat.precision);
        break;
      case "percent":
        this.il = new a1(this.yn.priceFormat.precision);
        break;
      default: {
        const t = Math.pow(10, this.yn.priceFormat.precision);
        this.il = new fu(t, this.yn.priceFormat.minMove * t);
      }
    }
    this.hn !== null && this.hn.dl();
  }
  Za(t, n) {
    const a = [];
    return Vh(this.fa, t, n, a), a;
  }
  Fa() {
    const { fl: t, pl: n, vl: a } = this.ml();
    return this.pa.Sr(t, n, a);
  }
  ml() {
    const t = this.Qt().Et(), n = t.fl(), a = window.devicePixelRatio || 1, r = t.N().conflationThresholdFactor;
    return { fl: n, pl: a, vl: this.yn.conflationThresholdFactor ?? r ?? 1 };
  }
  wl(t) {
    const n = this.qt.Bh();
    let a;
    if (this.wa === "Custom" && this.ma !== null) {
      const u = this.ll();
      if (!u) throw new Error(oC);
      a = this.pa.Cr(n, t, this.ma, !0, ((c) => u(c)));
    } else a = this.pa.Cr(n, t);
    const r = Yh();
    return r.ht(a), r;
  }
  Ua(t) {
    const n = this.wl(t);
    this.va.set(t, n);
  }
  Da(t) {
    if (this.wa === "Custom" && (this.ma === null || !this.ll())) return;
    this.va.clear();
    const n = this.Qt().Et().Ml();
    for (const a of n) {
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
    const n = this.wl(t);
    this.va.set(t, n);
  }
}
const EC = [3], jC = [0, 1, 2, 3];
class kC {
  constructor(t) {
    this.yn = t;
  }
  xl(t, n, a) {
    let r = t;
    if (this.yn.mode === 0) return r;
    const u = a.Pn(), c = u.Lt();
    if (c === null) return r;
    const d = u.Nt(t, c), m = a.Cl().filter(((g) => g instanceof mu)).reduce(((g, b) => {
      if (a.Zs(b) || !b.It()) return g;
      const x = b.Ft(), S = b.Un();
      if (x.Gi() || !S.ze(n)) return g;
      const w = S.Mh(n);
      if (w === null) return g;
      const M = Un(b.Lt()), N = this.yn.mode === 3 ? jC : EC;
      return g.concat(N.map(((j) => x.Nt(w.Wt[j], M.Wt))));
    }), []);
    if (m.length === 0) return r;
    m.sort(((g, b) => Math.abs(g - d) - Math.abs(b - d)));
    const v = m[0];
    return r = u.Tn(v, c), r;
  }
}
function xa(s, t, n) {
  return Math.min(Math.max(s, t), n);
}
function ko(s, t, n) {
  return t - s <= n;
}
class zC extends Ms {
  constructor() {
    super(...arguments), this.qt = null;
  }
  ht(t) {
    this.qt = t;
  }
  et({ context: t, bitmapSize: n, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (this.qt === null) return;
    const u = Math.max(1, Math.floor(a));
    t.lineWidth = u, (function(c, d) {
      c.save(), c.lineWidth % 2 && c.translate(0.5, 0.5), d(), c.restore();
    })(t, (() => {
      const c = W(this.qt);
      if (c.yl) {
        t.strokeStyle = c.kl, Qn(t, c.Pl), t.beginPath();
        for (const d of c.Tl) {
          const m = Math.round(d.Rl * a);
          t.moveTo(m, -u), t.lineTo(m, n.height + u);
        }
        t.stroke();
      }
      if (c.Dl) {
        t.strokeStyle = c.Il, Qn(t, c.Vl), t.beginPath();
        for (const d of c.Bl) {
          const m = Math.round(d.Rl * r);
          t.moveTo(-u, m), t.lineTo(n.width + u, m);
        }
        t.stroke();
      }
    }));
  }
}
class TC {
  constructor(t) {
    this.Xt = new zC(), this.xt = !0, this.yt = t;
  }
  kt() {
    this.xt = !0;
  }
  Tt() {
    if (this.xt) {
      const t = this.yt.Qt().N().grid, n = { Dl: t.horzLines.visible, yl: t.vertLines.visible, Il: t.horzLines.color, kl: t.vertLines.color, Vl: t.horzLines.style, Pl: t.vertLines.style, Bl: this.yt.Pn().El(), Tl: (this.yt.Qt().Et().El() || []).map(((a) => ({ Rl: a.coord }))) };
      this.Xt.ht(n), this.xt = !1;
    }
    return this.Xt;
  }
}
class OC {
  constructor(t) {
    this.Yh = new TC(t);
  }
  wr() {
    return this.Yh;
  }
}
const Kh = { Al: 4, Ll: 1e-4 };
function ga(s, t) {
  const n = 100 * (s - t) / t;
  return t < 0 ? -n : n;
}
function DC(s, t) {
  const n = ga(s.Je(), t), a = ga(s.Qe(), t);
  return new je(n, a);
}
function Rl(s, t) {
  const n = 100 * (s - t) / t + 100;
  return t < 0 ? -n : n;
}
function AC(s, t) {
  const n = Rl(s.Je(), t), a = Rl(s.Qe(), t);
  return new je(n, a);
}
function iu(s, t) {
  const n = Math.abs(s);
  if (n < 1e-15) return 0;
  const a = Math.log10(n + t.Ll) + t.Al;
  return s < 0 ? -a : a;
}
function Ll(s, t) {
  const n = Math.abs(s);
  if (n < 1e-15) return 0;
  const a = Math.pow(10, n - t.Al) - t.Ll;
  return s < 0 ? -a : a;
}
function Cl(s, t) {
  if (s === null) return null;
  const n = iu(s.Je(), t), a = iu(s.Qe(), t);
  return new je(n, a);
}
function ba(s, t) {
  if (s === null) return null;
  const n = Ll(s.Je(), t), a = Ll(s.Qe(), t);
  return new je(n, a);
}
function Xh(s) {
  if (s === null) return Kh;
  const t = Math.abs(s.Qe() - s.Je());
  if (t >= 1 || t < 1e-15) return Kh;
  const n = Math.ceil(Math.abs(Math.log10(t))), a = Kh.Al + n;
  return { Al: a, Ll: 1 / Math.pow(10, a) };
}
class Zh {
  constructor(t, n) {
    if (this.zl = t, this.Ol = n, (function(a) {
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
  Fl(t, n, a) {
    const r = this.zl === 0 ? 0 : 1 / this.zl;
    let u = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - n)))), c = 0, d = this.Ol[0];
    for (; ; ) {
      const b = ko(u, r, 1e-14) && u > r + 1e-14, x = ko(u, a * d, 1e-14), S = ko(u, 1, 1e-14);
      if (!(b && x && S)) break;
      u /= d, d = this.Ol[++c % this.Ol.length];
    }
    if (u <= r + 1e-14 && (u = r), u = Math.max(1, u), this.Nl.length > 0 && (m = u, v = 1, g = 1e-14, Math.abs(m - v) < g)) for (c = 0, d = this.Nl[0]; ko(u, a * d, 1e-14) && u > r + 1e-14; ) u /= d, d = this.Nl[++c % this.Nl.length];
    var m, v, g;
    return u;
  }
}
class t0 {
  constructor(t, n, a, r) {
    this.Wl = [], this.Ki = t, this.zl = n, this.Hl = a, this.Ul = r;
  }
  Fl(t, n) {
    if (t < n) throw new Error("high < low");
    const a = this.Ki.$t(), r = (t - n) * this.$l() / a, u = new Zh(this.zl, [2, 2.5, 2]), c = new Zh(this.zl, [2, 2, 2.5]), d = new Zh(this.zl, [2.5, 2, 2]), m = [];
    return m.push(u.Fl(t, n, r), c.Fl(t, n, r), d.Fl(t, n, r)), (function(v) {
      if (v.length < 1) throw Error("array is empty");
      let g = v[0];
      for (let b = 1; b < v.length; ++b) v[b] < g && (g = v[b]);
      return g;
    })(m);
  }
  jl() {
    const t = this.Ki, n = t.Lt();
    if (n === null) return void (this.Wl = []);
    const a = t.$t(), r = this.Hl(a - 1, n), u = this.Hl(0, n), c = this.Ki.N().entireTextOnly ? this.ql() / 2 : 0, d = c, m = a - 1 - c, v = Math.max(r, u), g = Math.min(r, u);
    if (v === g) return void (this.Wl = []);
    const b = this.Fl(v, g);
    if (this.Yl(n, b, v, g, d, m), t.Kl() && this.Zl(b, g, v)) {
      const w = this.Ki.Gl();
      this.Xl(n, b, d, m, w, 2 * w);
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
  Yl(t, n, a, r, u, c) {
    const d = this.Wl, m = this.Ki;
    let v = a % n;
    v += v < 0 ? n : 0;
    const g = a >= r ? 1 : -1;
    let b = null, x = 0;
    for (let S = a - v; S > r; S -= n) {
      const w = this.Ul(S, t, !0);
      b !== null && Math.abs(w - b) < this.$l() || w < u || w > c || (x < d.length ? (d[x].Rl = w, d[x].io = m.no(S), d[x].Jl = S) : d.push({ Rl: w, io: m.no(S), Jl: S }), x++, b = w, m.so() && (n = this.Fl(S * g, r)));
    }
    d.length = x;
  }
  Xl(t, n, a, r, u, c) {
    const d = this.Wl, m = this.eo(t, a, u, c), v = this.eo(t, r, -c, -u), g = this.Ul(0, t, !0) - this.Ul(n, t, !0);
    d.length > 0 && d[0].Rl - m.Rl < g / 2 && d.shift(), d.length > 0 && v.Rl - d[d.length - 1].Rl < g / 2 && d.pop(), d.unshift(m), d.push(v);
  }
  eo(t, n, a, r) {
    const u = (a + r) / 2, c = this.Hl(n + a, t), d = this.Hl(n + r, t), m = Math.min(c, d), v = Math.max(c, d), g = Math.max(0.1, this.Fl(v, m)), b = this.Hl(n + u, t), x = b - b % g, S = this.Ul(x, t, !0);
    return { io: this.Ki.no(x), Rl: S, Jl: x };
  }
  Zl(t, n, a) {
    let r = Un(this.Ki.ar());
    return this.Ki.so() && (r = ba(r, this.Ki.ro())), r.Je() - n < t && a - r.Qe() < t;
  }
}
function c1(s) {
  return s.slice().sort(((t, n) => W(t.ln()) - W(n.ln())));
}
var e0;
(function(s) {
  s[s.Normal = 0] = "Normal", s[s.Logarithmic = 1] = "Logarithmic", s[s.Percentage = 2] = "Percentage", s[s.IndexedTo100 = 3] = "IndexedTo100";
})(e0 || (e0 = {}));
const i0 = new a1(), n0 = new fu(100, 1);
class RC {
  constructor(t, n, a, r, u) {
    this.ho = 0, this.ao = null, this.rr = null, this.lo = null, this.oo = { _o: !1, uo: null }, this.co = !1, this.do = 0, this.fo = 0, this.po = new te(), this.vo = new te(), this.mo = [], this.wo = null, this.Mo = null, this.bo = null, this.So = null, this.xo = null, this.il = n0, this.Co = Xh(null), this.yo = t, this.yn = n, this.ko = a, this.Po = r, this.To = u, this.Ro = new t0(this, 100, this.Do.bind(this), this.Io.bind(this));
  }
  cl() {
    return this.yo;
  }
  N() {
    return this.yn;
  }
  vr(t) {
    if (Pe(this.yn, t), this.dl(), t.mode !== void 0 && this.Vo({ _e: t.mode }), t.scaleMargins !== void 0) {
      const n = Ye(t.scaleMargins.top), a = Ye(t.scaleMargins.bottom);
      if (n < 0 || n > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${n}`);
      if (a < 0 || a > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${a}`);
      if (n + a > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${n + a}`);
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
    const n = this._e();
    let a = null;
    t.hs !== void 0 && (this.yn.autoScale = t.hs), t._e !== void 0 && (this.yn.mode = t._e, t._e !== 2 && t._e !== 3 || (this.yn.autoScale = !0), this.oo._o = !1), n._e === 1 && t._e !== n._e && ((function(u, c) {
      if (u === null) return !1;
      const d = Ll(u.Je(), c), m = Ll(u.Qe(), c);
      return isFinite(d) && isFinite(m);
    })(this.rr, this.Co) ? (a = ba(this.rr, this.Co), a !== null && this.Oo(a)) : this.yn.autoScale = !0), t._e === 1 && t._e !== n._e && (a = Cl(this.rr, this.Co), a !== null && this.Oo(a));
    const r = n._e !== this.yn.mode;
    r && (n._e === 2 || this.je()) && this.dl(), r && (n._e === 3 || this.Lo()) && this.dl(), t.zo !== void 0 && n.zo !== t.zo && (this.yn.invertScale = t.zo, this.No()), this.vo.p(n, this._e());
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
  Oo(t, n) {
    const a = this.rr;
    (n || a === null && t !== null || a !== null && !a.Ge(t)) && (this.bo = null, this.rr = t);
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
  Nt(t, n) {
    return this.je() ? t = ga(t, n) : this.Lo() && (t = Rl(t, n)), this.Io(t, n);
  }
  Zo(t, n, a) {
    this.jo();
    const r = this.$o(), u = W(this.ar()), c = u.Je(), d = u.Qe(), m = this.Ho() - 1, v = this.zo(), g = m / (d - c), b = a === void 0 ? 0 : a.from, x = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < x; w++) {
      const M = t[w], N = M.Mt;
      if (isNaN(N)) continue;
      let j = N;
      S !== null && (j = S(M.Mt, n));
      const T = r + g * (j - c), R = v ? T : this.ho - 1 - T;
      M.ut = R;
    }
  }
  Xo(t, n, a) {
    this.jo();
    const r = this.$o(), u = W(this.ar()), c = u.Je(), d = u.Qe(), m = this.Ho() - 1, v = this.zo(), g = m / (d - c), b = a === void 0 ? 0 : a.from, x = a === void 0 ? t.length : a.to, S = this.Go();
    for (let w = b; w < x; w++) {
      const M = t[w];
      let N = M.jr, j = M.qr, T = M.Yr, R = M.Kr;
      S !== null && (N = S(M.jr, n), j = S(M.qr, n), T = S(M.Yr, n), R = S(M.Kr, n));
      let D = r + g * (N - c), $ = v ? D : this.ho - 1 - D;
      M.Jo = $, D = r + g * (j - c), $ = v ? D : this.ho - 1 - D, M.Qo = $, D = r + g * (T - c), $ = v ? D : this.ho - 1 - D, M.t_ = $, D = r + g * (R - c), $ = v ? D : this.ho - 1 - D, M.i_ = $;
    }
  }
  Tn(t, n) {
    const a = this.Do(t, n);
    return this.n_(a, n);
  }
  n_(t, n) {
    let a = t;
    return this.je() ? a = (function(r, u) {
      return u < 0 && (r = -r), r / 100 * u + u;
    })(a, n) : this.Lo() && (a = (function(r, u) {
      return r -= 100, u < 0 && (r = -r), r / 100 * u + u;
    })(a, n)), a;
  }
  Cl() {
    return this.mo;
  }
  Dt() {
    return this.Mo || (this.Mo = c1(this.mo)), this.Mo;
  }
  s_(t) {
    this.mo.indexOf(t) === -1 && (this.mo.push(t), this.dl(), this.e_());
  }
  r_(t) {
    const n = this.mo.indexOf(t);
    if (n === -1) throw new Error("source is not attached to scale");
    this.mo.splice(n, 1), this.mo.length === 0 && (this.Vo({ hs: !0 }), this.Oo(null)), this.dl(), this.e_();
  }
  Lt() {
    let t = null;
    for (const n of this.mo) {
      const a = n.Lt();
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
    const n = this.Ro.El();
    return this.bo = { El: n, h_: t }, this.po.p(), n;
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
    let n = (this.So + 0.2 * (this.ho - 1)) / (t + 0.2 * (this.ho - 1));
    const a = W(this.lo).Xe();
    n = Math.max(n, 0.1), a.ir(n), this.Oo(a);
  }
  __() {
    this.je() || this.Lo() || (this.So = null, this.lo = null);
  }
  u_(t) {
    this.Eo() || this.xo === null && this.lo === null && (this.Gi() || (this.xo = t, this.lo = W(this.ar()).Xe()));
  }
  c_(t) {
    if (this.Eo() || this.xo === null) return;
    const n = W(this.ar()).tr() / (this.Ho() - 1);
    let a = t - this.xo;
    this.zo() && (a *= -1);
    const r = a * n, u = W(this.lo).Xe();
    u.nr(r), this.Oo(u, !0), this.bo = null;
  }
  d_() {
    this.Eo() || this.xo !== null && (this.xo = null, this.lo = null);
  }
  tl() {
    return this.il || this.dl(), this.il;
  }
  Ji(t, n) {
    switch (this.yn.mode) {
      case 2:
        return this.f_(ga(t, n));
      case 3:
        return this.tl().format(Rl(t, n));
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
  Ca(t, n) {
    return t = ga(t, n), this.f_(t, i0);
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
    let n = 100;
    this.wo !== null && (n = Math.round(this.wo.Kh())), this.il = n0, this.je() ? (this.il = i0, n = 100) : this.Lo() ? (this.il = new fu(100, 1), n = 100) : this.wo !== null && (this.il = this.wo.tl()), this.Ro = new t0(this, n, this.Do.bind(this), this.Io.bind(this)), this.Ro.jl();
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
  Io(t, n) {
    if (this.jo(), this.Gi()) return 0;
    t = this.so() && t ? iu(t, this.Co) : t;
    const a = W(this.ar()), r = this.$o() + (this.Ho() - 1) * (t - a.Je()) / a.tr();
    return this.Ko(r);
  }
  Do(t, n) {
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
    let n = null;
    const a = this.m_();
    let r = 0, u = 0;
    for (const m of a) {
      if (!m.It()) continue;
      const v = m.Lt();
      if (v === null) continue;
      const g = m.la(t.Oa(), t.bi());
      let b = g && g.ar();
      if (b !== null) {
        switch (this.yn.mode) {
          case 1:
            b = Cl(b, this.Co);
            break;
          case 2:
            b = DC(b, v.Wt);
            break;
          case 3:
            b = AC(b, v.Wt);
        }
        if (n = n === null ? b : n.Ss(W(b)), g !== null) {
          const x = g.lr();
          x !== null && (r = Math.max(r, x.above), u = Math.max(u, x.below));
        }
      }
    }
    if (this.Kl() && (r = Math.max(r, this.Gl()), u = Math.max(u, this.Gl())), r === this.do && u === this.fo || (this.do = r, this.fo = u, this.bo = null, this.Bo()), n !== null) {
      if (n.Je() === n.Qe()) {
        const m = 5 * this.M_();
        this.so() && (n = ba(n, this.Co)), n = new je(n.Je() - m, n.Qe() + m), this.so() && (n = Cl(n, this.Co));
      }
      if (this.so()) {
        const m = ba(n, this.Co), v = Xh(m);
        if (c = v, d = this.Co, c.Al !== d.Al || c.Ll !== d.Ll) {
          const g = this.lo !== null ? ba(this.lo, this.Co) : null;
          this.Co = v, n = Cl(m, v), g !== null && (this.lo = Cl(g, v));
        }
      }
      this.Oo(n);
    } else this.rr === null && (this.Oo(new je(-0.5, 0.5)), this.Co = Xh(null));
    var c, d;
  }
  Go() {
    return this.je() ? ga : this.Lo() ? Rl : this.so() ? (t) => iu(t, this.Co) : null;
  }
  b_(t, n, a) {
    return n === void 0 ? (a === void 0 && (a = this.tl()), a.format(t)) : n(t);
  }
  S_(t, n, a) {
    return n === void 0 ? (a === void 0 && (a = this.tl()), a.formatTickmarks(t)) : n(t);
  }
  cr(t, n) {
    return this.b_(t, this.Po.priceFormatter, n);
  }
  v_(t, n) {
    const a = this.Po.priceFormatter;
    return this.S_(t, this.Po.tickmarksPriceFormatter ?? (a ? (r) => r.map(a) : void 0), n);
  }
  f_(t, n) {
    return this.b_(t, this.Po.percentageFormatter, n);
  }
  p_(t, n) {
    const a = this.Po.percentageFormatter;
    return this.S_(t, this.Po.tickmarksPercentageFormatter ?? (a ? (r) => r.map(a) : void 0), n);
  }
}
function s0(s) {
  return s instanceof mu;
}
class _d {
  constructor(t, n) {
    this.mo = [], this.x_ = /* @__PURE__ */ new Map(), this.ho = 0, this.C_ = 0, this.y_ = 1, this.Mo = null, this.k_ = null, this.P_ = !1, this.T_ = new te(), this.fa = [], this.ia = t, this.sn = n, this.R_ = new OC(this);
    const a = n.N();
    this.D_ = this.I_("left", a.leftPriceScale), this.V_ = this.I_("right", a.rightPriceScale), this.D_.Fo().i(this.B_.bind(this, this.D_), this), this.V_.Fo().i(this.B_.bind(this, this.V_), this), this.E_(a);
  }
  E_(t) {
    if (t.leftPriceScale && this.D_.vr(t.leftPriceScale), t.rightPriceScale && this.V_.vr(t.rightPriceScale), t.localization && (this.D_.dl(), this.V_.dl()), t.overlayPriceScales) {
      const n = Array.from(this.x_.values());
      for (const a of n) {
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
    return this.x_.has(t) ? Ye(this.x_.get(t))[0].Ft() : null;
  }
  m() {
    this.Qt().L_().u(this), this.D_.Fo().u(this), this.V_.Fo().u(this), this.mo.forEach(((t) => {
      t.m && t.m();
    })), this.fa = this.fa.filter(((t) => {
      const n = t.Qh();
      return n.detached && n.detached(), !1;
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
    this.ho = t, this.D_.Wo(t), this.V_.Wo(t), this.mo.forEach(((n) => {
      if (this.Zs(n)) {
        const a = n.Ft();
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
    return this.mo.filter(s0);
  }
  Cl() {
    return this.mo;
  }
  Zs(t) {
    const n = t.Ft();
    return n === null || this.D_ !== n && this.V_ !== n;
  }
  s_(t, n, a) {
    this.j_(t, n, a ? t.ln() : this.mo.length);
  }
  r_(t, n) {
    const a = this.mo.indexOf(t);
    we(a !== -1, "removeDataSource: invalid data source"), this.mo.splice(a, 1), n || this.mo.forEach(((c, d) => c._n(d)));
    const r = W(t.Ft()).cl();
    if (this.x_.has(r)) {
      const c = Ye(this.x_.get(r)), d = c.indexOf(t);
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
  G_(t, n) {
    t.l_(n);
  }
  X_(t, n) {
    t.o_(n), this.F_();
  }
  J_(t) {
    t.__();
  }
  Q_(t, n) {
    t.u_(n);
  }
  tu(t, n) {
    t.c_(n), this.F_();
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
    const [t, n] = this.nu();
    let a = null;
    return t.N().visible && t.Cl().length !== 0 ? a = t : n.N().visible && n.Cl().length !== 0 ? a = n : this.mo.length !== 0 && (a = this.mo[0].Ft()), a === null && (a = this.Gs() ?? t), a;
  }
  Gs() {
    const [t, n] = this.nu();
    return t.N().visible ? t : n.N().visible ? n : null;
  }
  q_(t) {
    t !== null && t.Eo() && this.su(t);
  }
  eu(t) {
    const n = this.ia.Ee();
    t.Vo({ hs: !0 }), n !== null && t.w_(n), this.F_();
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
    return this.Mo === null && (this.Mo = c1(this.mo)), this.Mo;
  }
  au() {
    const t = this.Dt(), n = this.sn.ou()?.lu, a = this.sn.N().hoveredSeriesOnTop, r = this.k_;
    if (r !== null && r.Kh === t && r._u === n && r.uu === a) return r.cu;
    const u = (function(c, d, m) {
      if (!m) return c;
      const v = c.indexOf(d);
      if (v === -1 || v === c.length - 1) return c;
      const g = [];
      for (let b = 0; b < c.length; b++) b !== v && g.push(c[b]);
      return g.push(c[v]), g;
    })(t, n, a);
    return this.k_ = { Kh: t, _u: n, uu: a, cu: u }, u;
  }
  du(t, n) {
    n = xa(n, 0, this.mo.length - 1);
    const a = this.mo.indexOf(t);
    we(a !== -1, "setSeriesOrder: invalid data source"), this.mo.splice(a, 1), this.mo.splice(n, 0, t), this.mo.forEach(((r, u) => r._n(u))), this.Y_();
    for (const r of [this.D_, this.V_]) r.e_(), r.dl();
    this.sn.mr();
  }
  Vt() {
    return this.Dt().filter(s0);
  }
  fu() {
    return this.T_;
  }
  pu() {
    return this.R_;
  }
  hl(t) {
    this.fa.push(new yC(t));
  }
  al(t) {
    this.fa = this.fa.filter(((n) => n.Qh() !== t)), t.detached && t.detached(), this.sn.mr();
  }
  vu() {
    return this.fa;
  }
  Ja(t, n) {
    return this.fa.map(((a) => a.Qs(t, n))).filter(((a) => a !== null));
  }
  su(t) {
    const n = t.m_();
    if (n && n.length > 0 && !this.ia.Gi()) {
      const a = this.ia.Ee();
      a !== null && t.w_(a);
    }
    t.Nn();
  }
  j_(t, n, a) {
    let r = this.A_(n);
    if (r === null && (r = this.I_(n, this.sn.N().overlayPriceScales)), this.mo.splice(a, 0, t), !du(n)) {
      const u = this.x_.get(n) || [];
      u.push(t), this.x_.set(n, u);
    }
    t._n(a), r.s_(t), t.un(r), this.q_(r), this.Y_();
  }
  Y_() {
    this.Mo = null, this.k_ = null;
  }
  nu() {
    return this.sn.N().defaultVisiblePriceScaleId === "left" ? [this.D_, this.V_] : [this.V_, this.D_];
  }
  B_(t, n, a) {
    n._e !== a._e && this.su(t);
  }
  I_(t, n) {
    const a = { visible: !0, autoScale: !0, ...on(n) }, r = new RC(t, a, this.sn.N().layout, this.sn.N().localization, this.sn.Xi());
    return r.Wo(this.$t()), r;
  }
}
function Sd(s, t) {
  return t === null || s.se === 2 && t.se !== 2 || (t.se !== 2 || s.se === 2) && s.ne !== t.ne && s.ne < t.ne;
}
function h1(s) {
  return { te: s.te, ie: s.ie };
}
function LC(s) {
  return { ne: s.distance ?? 0, se: s.hitTestPriority ?? (s.itemType === "marker" ? 2 : 0), ee: s.itemType ?? "primitive", mu: s.cursorStyle, te: s.externalId };
}
function zo(s) {
  return { lu: s.lu, wu: h1(s.Mu), mu: s.Mu.mu, ee: s.Mu.ee ?? "primitive" };
}
function BC(s, t, n, a) {
  let r = null;
  for (const u of s) {
    let c = u.Qs?.(t, n, a) ?? null;
    if (c === null) {
      const d = u.Tt(a);
      c = d !== null && d.Qs ? d.Qs(t, n) : null;
    }
    if (c !== null) {
      const d = { gu: u, Mu: c };
      (r === null || Sd(d.Mu, r.Mu)) && (r = d);
    }
  }
  return r;
}
function UC(s) {
  return s.jn !== void 0;
}
function d1(s, t, n) {
  const a = [s, ...s.Dt()].reverse(), r = (function(d, m, v) {
    let g, b, x;
    for (const M of d) {
      const N = M.Ja?.(m, v) ?? [];
      for (const j of N) {
        const T = LC(j);
        S = j.zOrder, w = g?.zOrder, (!w || S === "top" && w !== "top" || S === "normal" && w === "bottom" || j.zOrder === g?.zOrder && b !== void 0 && Sd(T, b) || j.zOrder === g?.zOrder && b === void 0) && (g = j, b = T, x = M);
      }
    }
    var S, w;
    return g && x && b ? { Mu: b, bu: g, lu: x } : null;
  })(a, t, n);
  if (r?.bu.zOrder === "top") return zo(r);
  let u = null, c = null;
  for (const d of a) {
    if (r && r.lu === d && r.bu.zOrder !== "bottom" && !r.bu.isBackground) return u ?? zo(r);
    if (UC(d)) {
      const m = BC(d.jn(s), t, n, s);
      if (m !== null) {
        const v = { lu: d, gu: m.gu, wu: h1(m.Mu), mu: m.Mu.mu, ee: m.Mu.ee ?? "primitive" };
        (u === null || Sd(m.Mu, c)) && (u = v, c = m.Mu);
      }
    }
    if (r && r.lu === d && r.bu.zOrder !== "bottom" && r.bu.isBackground) return u ?? zo(r);
  }
  return u !== null ? u : r?.bu ? zo(r) : null;
}
class HC {
  constructor(t, n, a = 50) {
    this.Vs = 0, this.Bs = 1, this.Es = 1, this.Ls = /* @__PURE__ */ new Map(), this.As = /* @__PURE__ */ new Map(), this.Su = t, this.xu = n, this.zs = a;
  }
  Cu(t) {
    const n = t.time, a = this.xu.cacheKey(n), r = this.Ls.get(a);
    if (r !== void 0) return r.yu;
    if (this.Vs === this.zs) {
      const c = this.As.get(this.Es);
      this.As.delete(this.Es), this.Ls.delete(Ye(c)), this.Es++, this.Vs--;
    }
    const u = this.Su(t);
    return this.Ls.set(a, { yu: u, Ws: this.Bs }), this.As.set(this.Bs, a), this.Vs++, this.Bs++, u;
  }
}
class Bl {
  constructor(t, n) {
    we(t <= n, "right should be >= left"), this.ku = t, this.Pu = n;
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
function a0(s, t) {
  return s === null || t === null ? s === t : s.Ge(t);
}
class qC {
  constructor() {
    this.Ru = /* @__PURE__ */ new Map(), this.Ls = null, this.Du = !1;
  }
  Iu(t) {
    this.Du = t, this.Ls = null;
  }
  Vu(t, n) {
    this.Bu(n), this.Ls = null;
    for (let a = n; a < t.length; ++a) {
      const r = t[a];
      let u = this.Ru.get(r.timeWeight);
      u === void 0 && (u = [], this.Ru.set(r.timeWeight, u)), u.push({ index: a, time: r.time, weight: r.timeWeight, originalTime: r.originalTime });
    }
  }
  Eu(t, n, a, r, u) {
    const c = Math.ceil(n / t);
    return this.Ls !== null && this.Ls.Au === c && u === this.Ls.Lu && a === this.Ls.zu || (this.Ls = { Lu: u, zu: a, El: this.Ou(c, a, r), Au: c }), this.Ls.El;
  }
  Bu(t) {
    if (t === 0) return void this.Ru.clear();
    const n = [];
    this.Ru.forEach(((a, r) => {
      t <= a[0].index ? n.push(r) : a.splice(xs(a, t, ((u) => u.index < t)), 1 / 0);
    }));
    for (const a of n) this.Ru.delete(a);
  }
  Ou(t, n, a) {
    let r = [];
    const u = (c) => !n || a.has(c.index);
    for (const c of Array.from(this.Ru.keys()).sort(((d, m) => m - d))) {
      if (!this.Ru.get(c)) continue;
      const d = r;
      r = [];
      const m = d.length;
      let v = 0;
      const g = Ye(this.Ru.get(c)), b = g.length;
      let x = 1 / 0, S = -1 / 0;
      for (let w = 0; w < b; w++) {
        const M = g[w], N = M.index;
        for (; v < m; ) {
          const j = d[v], T = j.index;
          if (!(T < N && u(j))) {
            x = T;
            break;
          }
          v++, r.push(j), S = T, x = 1 / 0;
        }
        if (x - N >= t && N - S >= t && u(M)) r.push(M), S = N;
        else if (this.Du) return d;
      }
      for (; v < m; v++) u(d[v]) && r.push(d[v]);
    }
    return r;
  }
}
class wa {
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
    return new wa(null);
  }
}
function QC(s, t) {
  return s.weight > t.weight ? s : t;
}
class $C {
  constructor(t, n, a, r) {
    this.C_ = 0, this.Uu = null, this.$u = [], this.xo = null, this.So = null, this.ju = new qC(), this.qu = /* @__PURE__ */ new Map(), this.Yu = wa.Hu(), this.Ku = !0, this.Zu = new te(), this.Gu = new te(), this.Xu = new te(), this.Ju = null, this.Qu = null, this.tc = /* @__PURE__ */ new Map(), this.nc = -1, this.sc = [], this.ec = 1, this.yn = n, this.Po = a, this.rc = n.rightOffset, this.hc = n.barSpacing, this.sn = t, this.ac(n), this.xu = r, this.lc(), this.ju.Iu(n.uniformDistribution), this.oc(), this._c();
  }
  N() {
    return this.yn;
  }
  uc(t) {
    Pe(this.Po, t), this.cc(), this.lc();
  }
  vr(t, n) {
    Pe(this.yn, t), this.yn.fixLeftEdge && this.dc(), this.yn.fixRightEdge && this.fc(), t.barSpacing !== void 0 && this.sn.Ms(t.barSpacing), t.rightOffset !== void 0 && this.sn.gs(t.rightOffset), this.ac(t), t.minBarSpacing === void 0 && t.maxBarSpacing === void 0 || this.sn.Ms(t.barSpacing ?? this.hc), t.ignoreWhitespaceIndices !== void 0 && t.ignoreWhitespaceIndices !== this.yn.ignoreWhitespaceIndices && this._c(), this.cc(), this.lc(), t.enableConflation === void 0 && t.conflationThresholdFactor === void 0 || this.oc(), this.Xu.p();
  }
  Rn(t) {
    return this.$u[t]?.time ?? null;
  }
  en(t) {
    return this.$u[t] ?? null;
  }
  vc(t, n) {
    if (this.$u.length < 1) return null;
    if (this.xu.key(t) > this.xu.key(this.$u[this.$u.length - 1].time)) return n ? this.$u.length - 1 : null;
    const a = xs(this.$u, this.xu.key(t), ((r, u) => this.xu.key(r.time) < u));
    return this.xu.key(t) < this.xu.key(this.$u[a].time) ? n ? a : null : a;
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
    const n = { from: t.Oa(), to: t.bi() };
    return this.bc(n);
  }
  bc(t) {
    const n = Math.round(t.from), a = Math.round(t.to), r = W(this.Sc()), u = W(this.xc());
    return { from: W(this.en(Math.max(r, n))), to: W(this.en(Math.min(u, a))) };
  }
  Cc(t) {
    return { from: W(this.vc(t.from, !0)), to: W(this.vc(t.to, !0)) };
  }
  nn() {
    return this.C_;
  }
  N_(t) {
    if (!isFinite(t) || t <= 0 || this.C_ === t) return;
    const n = this.Mc(), a = this.C_;
    if (this.C_ = t, this.Ku = !0, this.yn.lockVisibleTimeRangeOnResize && a !== 0) {
      const r = this.hc * t / a;
      this.hc = r;
    }
    if (this.yn.fixLeftEdge && n !== null && n.Oa() <= 0) {
      const r = a - t;
      this.rc -= Math.round(r / this.hc) + 1, this.Ku = !0;
    }
    this.yc(), this.kc();
  }
  jt(t) {
    if (this.Gi() || !Kl(t)) return 0;
    const n = this.Pc() + this.rc - t;
    return this.C_ - (n + 0.5) * this.hc - 1;
  }
  Tc(t, n) {
    const a = this.Pc(), r = n === void 0 ? 0 : n.from, u = n === void 0 ? t.length : n.to;
    for (let c = r; c < u; c++) {
      const d = t[c].wt, m = a + this.rc - d, v = this.C_ - (m + 0.5) * this.hc - 1;
      t[c]._t = v;
    }
  }
  Rc(t, n) {
    const a = Math.ceil(this.Dc(t));
    return n && this.yn.ignoreWhitespaceIndices && !this.Ic(a) ? this.Vc(a) : a;
  }
  gs(t) {
    this.Ku = !0, this.rc = t, this.kc(), this.sn.Bc(), this.sn.mr();
  }
  fl() {
    return this.hc;
  }
  Ms(t) {
    const n = this.hc;
    if (this.Ec(t), this.yn.rightOffsetPixels !== void 0 && n !== 0) {
      const a = this.rc * n / this.hc;
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
    const t = this.hc, n = 5 * (this.sn.N().layout.fontSize + 4) / 8 * (this.yn.tickMarkMaxCharacterLength || 8), a = Math.round(n / t), r = W(this.Ee()), u = Math.max(r.Oa(), r.Oa() - a), c = Math.max(r.bi(), r.bi() - a), d = this.ju.Eu(t, n, this.yn.ignoreWhitespaceIndices, this.tc, this.nc), m = this.Sc() + a, v = this.xc() - a, g = this.Lc(), b = this.yn.fixLeftEdge || g, x = this.yn.fixRightEdge || g;
    let S = 0;
    for (const w of d) {
      if (!(u <= w.index && w.index <= c)) continue;
      let M;
      S < this.sc.length ? (M = this.sc[S], M.coord = this.jt(w.index), M.label = this.zc(w), M.weight = w.weight) : (M = { needAlignCoordinate: !1, coord: this.jt(w.index), label: this.zc(w), weight: w.weight }, this.sc.push(M)), this.hc > n / 2 && !g ? M.needAlignCoordinate = !1 : M.needAlignCoordinate = b && w.index <= m || x && w.index >= v, S++;
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
  Fc(t, n) {
    const a = this.Dc(t), r = this.fl(), u = r + n * (r / 10);
    this.Ms(u), this.yn.rightBarStaysOnScroll || this.gs(this.Ac() + (a - this.Dc(t)));
  }
  l_(t) {
    this.xo && this.d_(), this.So === null && this.Ju === null && (this.Gi() || (this.So = t, this.Wc()));
  }
  o_(t) {
    if (this.Ju === null) return;
    const n = xa(this.C_ - t, 0, this.C_), a = xa(this.C_ - W(this.So), 0, this.C_);
    n !== 0 && a !== 0 && this.Ms(this.Ju.fl * n / a);
  }
  __() {
    this.So !== null && (this.So = null, this.Hc());
  }
  u_(t) {
    this.xo === null && this.Ju === null && (this.Gi() || (this.xo = t, this.Wc()));
  }
  c_(t) {
    if (this.xo === null) return;
    const n = (this.xo - t) / this.fl();
    this.rc = W(this.Ju).Ac + n, this.Ku = !0, this.kc();
  }
  d_() {
    this.xo !== null && (this.xo = null, this.Hc());
  }
  Uc() {
    this.$c(this.yn.rightOffset);
  }
  $c(t, n = 400) {
    if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
    if (!isFinite(n) || n <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
    const a = this.rc, r = performance.now();
    this.sn.ps({ jc: (u) => (u - r) / n >= 1, qc: (u) => {
      const c = (u - r) / n;
      return c >= 1 ? t : a + (t - a) * c;
    } });
  }
  kt(t, n) {
    this.Ku = !0, this.$u = t, this.ju.Vu(t, n), this.kc();
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
  Gc(t, n) {
    const a = t.Tu(), r = n && this.yn.rightOffsetPixels || 0;
    this.Ec((this.C_ - r) / a), this.rc = t.bi() - this.Pc(), n && (this.rc = r ? r / this.fl() : this.yn.rightOffset), this.kc(), this.Ku = !0, this.sn.Bc(), this.sn.mr();
  }
  Xc() {
    const t = this.Sc(), n = this.xc();
    if (t === null || n === null) return;
    const a = !this.yn.rightOffsetPixels && this.yn.rightOffset || 0;
    this.Gc(new Bl(t, n + a), !0);
  }
  Jc(t) {
    const n = new Bl(t.from, t.to);
    this.Gc(n);
  }
  rn(t) {
    return this.Po.timeFormatter !== void 0 ? this.Po.timeFormatter(t.originalTime) : this.xu.formatHorzItem(t.time);
  }
  _c() {
    if (!this.yn.ignoreWhitespaceIndices) return;
    this.tc.clear();
    const t = this.sn.Jn();
    for (const n of t) for (const a of n.ul()) this.tc.set(a, !0);
    this.nc++;
  }
  Qc() {
    return this.ec;
  }
  Ml() {
    const t = 1 / (window.devicePixelRatio || 1), n = this.yn.minBarSpacing;
    if (n >= t) return [1];
    const a = [1];
    let r = 2;
    for (; r <= 512; )
      n < t / r && a.push(r), r *= 2;
    return a;
  }
  Lc() {
    const t = this.sn.N().handleScroll, n = this.sn.N().handleScale;
    return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || n.axisDoubleClickReset.time || n.axisPressedMouseMove.time || n.mouseWheel || n.pinch);
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
    const n = this.td(t), a = this.Pc() + this.rc - n;
    return Math.round(1e6 * a) / 1e6;
  }
  Ec(t) {
    const n = this.hc;
    this.hc = t, this.yc(), n !== this.hc && (this.Ku = !0, this.nd(), this.oc());
  }
  wc() {
    if (!this.Ku) return;
    if (this.Ku = !1, this.Gi()) return void this.sd(wa.Hu());
    const t = this.Pc(), n = this.C_ / this.hc, a = this.rc + t, r = new Bl(a - n + 1, a);
    this.sd(new wa(r));
  }
  yc() {
    const t = xa(this.hc, this.ed(), this.rd());
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
    const n = t / this.hc, a = Math.pow(2, Math.floor(Math.log2(n)));
    this.ec = Math.min(a, 512);
  }
  kc() {
    const t = this.hd();
    t !== null && this.rc < t && (this.rc = t, this.Ku = !0);
    const n = this.ad();
    this.rc > n && (this.rc = n, this.Ku = !0);
  }
  hd() {
    const t = this.Sc(), n = this.Uu;
    return t === null || n === null ? null : t - n - 1 + (this.yn.fixLeftEdge ? this.C_ / this.hc : Math.min(2, this.$u.length));
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
    let n = this.qu.get(t.weight);
    return n === void 0 && (n = new HC(((a) => this.ld(a)), this.xu), this.qu.set(t.weight, n)), n.Cu(t);
  }
  ld(t) {
    return this.xu.formatTickmark(t, this.Po);
  }
  sd(t) {
    const n = this.Yu;
    this.Yu = t, a0(n.Fu(), this.Yu.Fu()) || this.Zu.p(), a0(n.Wu(), this.Yu.Wu()) || this.Gu.p(), this.nd();
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
    const n = this.Ee();
    if (n === null) return;
    const a = n.Oa() - t;
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
    const n = (function* (r) {
      const u = Math.round(r), c = u < r;
      let d = 1;
      for (; ; ) c ? (yield u + d, yield u - d) : (yield u - d, yield u + d), d++;
    })(t), a = this.xc();
    for (; a; ) {
      const r = n.next().value;
      if (this.tc.get(r)) return r;
      if (r < 0 || r > a) break;
    }
    return t;
  }
  ac(t) {
    if (t.rightOffsetPixels !== void 0) {
      const n = t.rightOffsetPixels / (t.barSpacing || this.hc);
      this.sn.gs(n);
    }
  }
}
var l0, r0, o0, Md, u0;
(function(s) {
  s[s.OnTouchEnd = 0] = "OnTouchEnd", s[s.OnNextTap = 1] = "OnNextTap";
})(l0 || (l0 = {}));
class YC {
  constructor(t, n, a) {
    this.od = [], this._d = [], this.ud = null, this.C_ = 0, this.dd = null, this.fd = new te(), this.pd = new te(), this.vd = null, this.md = t, this.yn = n, this.xu = a, this.To = new qN(this.yn.layout.colorParsers), this.wd = new HN(this), this.ia = new $C(this, n.timeScale, this.yn.localization, a), this.Ct = new JN(this, n.crosshair), this.Md = new kC(n.crosshair), n.addDefaultPane && (this.gd(0), this.od[0].O_(2)), this.bd = this.Sd(0), this.xd = this.Sd(1);
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
    const n = this.yd(t);
    this.Cd(n);
  }
  ou() {
    return this.dd;
  }
  kd(t) {
    if (this.dd?.lu === t?.lu && this.dd?.wu?.te === t?.wu?.te && this.dd?.wu?.ie === t?.wu?.ie && this.dd?.mu === t?.mu && this.dd?.ee === t?.ee) return;
    const n = this.dd;
    this.dd = t, n !== null && this.Ta(n.lu), t !== null && t.lu !== n?.lu && this.Ta(t.lu);
  }
  N() {
    return this.yn;
  }
  vr(t) {
    Pe(this.yn, t), this.od.forEach(((n) => n.E_(t))), t.timeScale !== void 0 && this.ia.vr(t.timeScale), t.localization !== void 0 && this.ia.uc(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.fd.p(), this.bd = this.Sd(0), this.xd = this.Sd(1), this.Pa();
  }
  Pd(t, n, a = 0) {
    const r = this.od[a];
    if (r === void 0) return;
    if (t === "left") return Pe(this.yn, { leftPriceScale: n }), r.E_({ leftPriceScale: n }), this.fd.p(), void this.Pa();
    if (t === "right") return Pe(this.yn, { rightPriceScale: n }), r.E_({ rightPriceScale: n }), this.fd.p(), void this.Pa();
    const u = this.Td(t, a);
    u !== null && (u.Ft.vr(n), this.fd.p());
  }
  Td(t, n) {
    const a = this.od[n];
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
  Id(t, n) {
    t.Wo(n), this.Bc();
  }
  N_(t) {
    this.C_ = t, this.ia.N_(this.C_), this.od.forEach(((n) => n.N_(t))), this.Bc();
  }
  Vd(t) {
    this.od.length !== 1 && (we(t >= 0 && t < this.od.length, "Invalid pane index"), this.od.splice(t, 1), this.Pa());
  }
  Bd(t, n) {
    if (this.od.length < 2) return;
    we(t >= 0 && t < this.od.length, "Invalid pane index");
    const a = this.od[t], r = this.od.reduce(((b, x) => b + x.z_()), 0), u = this.od.reduce(((b, x) => b + x.$t()), 0), c = u - 30 * (this.od.length - 1);
    n = Math.min(c, Math.max(30, n));
    const d = r / u, m = a.$t();
    a.O_(n * d);
    let v = n - m, g = this.od.length - 1;
    for (const b of this.od) if (b !== a) {
      const x = Math.min(c, Math.max(30, b.$t() - v / g));
      v -= b.$t() - x, g -= 1;
      const S = x * d;
      b.O_(S);
    }
    this.Pa();
  }
  Ed(t, n) {
    we(t >= 0 && t < this.od.length && n >= 0 && n < this.od.length, "Invalid pane index");
    const a = this.od[t], r = this.od[n];
    this.od[t] = r, this.od[n] = a, this.Pa();
  }
  Ad(t, n) {
    if (we(t >= 0 && t < this.od.length && n >= 0 && n < this.od.length, "Invalid pane index"), t === n) return;
    const [a] = this.od.splice(t, 1);
    this.od.splice(n, 0, a), this.Pa();
  }
  G_(t, n, a) {
    t.G_(n, a);
  }
  X_(t, n, a) {
    t.X_(n, a), this.Ra(), this.Cd(this.Ld(t, 2));
  }
  J_(t, n) {
    t.J_(n), this.Cd(this.Ld(t, 2));
  }
  Q_(t, n, a) {
    n.Eo() || t.Q_(n, a);
  }
  tu(t, n, a) {
    n.Eo() || (t.tu(n, a), this.Ra(), this.Cd(this.Ld(t, 2)));
  }
  iu(t, n) {
    n.Eo() || (t.iu(n), this.Cd(this.Ld(t, 2)));
  }
  eu(t, n) {
    t.eu(n), this.Cd(this.Ld(t, 2));
  }
  zd(t) {
    this.ia.l_(t);
  }
  Od(t, n) {
    const a = this.Et();
    if (a.Gi() || n === 0) return;
    const r = a.nn();
    t = Math.max(1, Math.min(t, r)), a.Fc(t, n), this.Bc();
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
  jd(t, n, a, r, u) {
    this.Ct.In(t, n);
    let c = NaN, d = this.ia.Rc(t, !0);
    const m = this.ia.Ee();
    m !== null && (d = Math.min(Math.max(m.Oa(), d), m.bi())), d = this.Ct.Fn(d);
    const v = r.Pn(), g = v.Lt();
    if (g !== null && (c = v.Tn(n, g)), c = this.Md.xl(c, d, r), this.Ct.An(d, c, r), this.qa(), !u) {
      const b = d1(r, t, n);
      this.kd(b && { lu: b.lu, wu: b.wu, mu: b.mu || null, ee: b.ee }), this.pd.p(this.Ct.Bt(), { x: t, y: n }, a);
    }
  }
  qd(t, n, a) {
    const r = a.Pn(), u = r.Lt(), c = r.Nt(t, W(u)), d = this.ia.vc(n, !0), m = this.ia.jt(W(d));
    this.jd(m, c, null, a, !0);
  }
  Yd(t) {
    this.Rd().zn(), this.qa(), t || this.pd.p(null, null, null);
  }
  Ra() {
    const t = this.Ct.Kn();
    if (t !== null) {
      const n = this.Ct.Bn(), a = this.Ct.En();
      this.jd(n, a, null, t);
    }
    this.Ct.Nn();
  }
  Kd(t, n, a) {
    const r = this.ia.Rn(0);
    n !== void 0 && a !== void 0 && this.ia.kt(n, a);
    const u = this.ia.Rn(0), c = this.ia.Pc(), d = this.ia.Ee();
    if (d !== null && r !== null && u !== null) {
      const m = d.ze(c), v = this.xu.key(r) > this.xu.key(u), g = t !== null && t > c && !v, b = this.ia.N().allowShiftVisibleRangeOnWhitespaceReplacement, x = m && (a !== void 0 || b) && this.ia.N().shiftVisibleRangeOnNewBar;
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
    const n = this.od.find(((a) => a.Dt().includes(t)));
    return n === void 0 ? null : n;
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
  Gd(t, n) {
    const a = this.gd(n);
    this.Xd(t, a), this._d.push(t), this.ka(), this._d.length === 1 ? this.Pa() : this.mr();
  }
  Jd(t) {
    const n = this.Ks(t), a = this._d.indexOf(t);
    we(a !== -1, "Series not found");
    const r = W(n);
    this._d.splice(a, 1), r.r_(t), t.m && t.m(), this.ka(), this.ia._c(), this.Qd(r);
  }
  ya(t, n) {
    const a = W(this.Ks(t));
    a.r_(t, !0), a.s_(t, n, !0);
  }
  Xc() {
    const t = xe.Cs();
    t.us(), this.Cd(t);
  }
  tf(t) {
    const n = xe.Cs();
    n.fs(t), this.Cd(n);
  }
  ws() {
    const t = xe.Cs();
    t.ws(), this.Cd(t);
  }
  Ms(t) {
    const n = xe.Cs();
    n.Ms(t), this.Cd(n);
  }
  gs(t) {
    const n = xe.Cs();
    n.gs(t), this.Cd(n);
  }
  ps(t) {
    const n = xe.Cs();
    n.ps(t), this.Cd(n);
  }
  cs() {
    const t = xe.Cs();
    t.cs(), this.Cd(t);
  }
  if() {
    const t = this.yn.defaultVisiblePriceScaleId, n = this.yn.leftPriceScale.visible;
    return n !== this.yn.rightPriceScale.visible ? n ? "left" : "right" : t;
  }
  nf(t, n) {
    if (we(n >= 0, "Index should be greater or equal to 0"), n === this.sf(t)) return;
    const a = W(this.Ks(t));
    a.r_(t);
    const r = this.gd(n);
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
    const n = this.xd, a = this.bd;
    if (n === a) return n;
    if (t = Math.max(0, Math.min(100, Math.round(100 * t))), this.vd === null || this.vd.ah !== a || this.vd.oh !== n) this.vd = { ah: a, oh: n, rf: /* @__PURE__ */ new Map() };
    else {
      const u = this.vd.rf.get(t);
      if (u !== void 0) return u;
    }
    const r = this.To.tt(a, n, t / 100);
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
    const n = new _d(this.ia, this);
    this.od.push(n);
    const a = t ?? this.od.length - 1, r = xe.ys();
    return r.es(a, { rs: 0, hs: !0 }), this.Cd(r), n;
  }
  gd(t) {
    return we(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.od.length, t)) < this.od.length ? this.od[t] : this.lf(t);
  }
  sf(t) {
    return this.od.findIndex(((n) => n.U_().includes(t)));
  }
  Ld(t, n) {
    const a = new xe(n);
    if (t !== null) {
      const r = this.od.indexOf(t);
      a.es(r, { rs: n });
    }
    return a;
  }
  yd(t, n) {
    return n === void 0 && (n = 2), this.Ld(this.Ks(t), n);
  }
  Cd(t) {
    this.md && this.md(t), this.od.forEach(((n) => n.pu().wr().kt()));
  }
  Xd(t, n) {
    const a = t.N().priceScaleId, r = a !== void 0 ? a : this.if();
    n.s_(t, r), du(r) || t.vr(t.N());
  }
  Sd(t) {
    const n = this.yn.layout;
    return n.background.type === "gradient" ? t === 0 ? n.background.topColor : n.background.bottomColor : n.background.color;
  }
  Qd(t) {
    return !t.H_() && t.Cl().length === 0 && this.od.length > 1 && (this.od.splice(this.hf(t), 1), this.Pa(), !0);
  }
}
function f1(s) {
  if (s >= 1) return 0;
  let t = 0;
  for (; t < 8; t++) {
    const n = Math.round(s);
    if (Math.abs(n - s) < 1e-8) return t;
    s *= 10;
  }
  return t;
}
function Nd(s) {
  return !Ea(s) && !lr(s);
}
function m1(s) {
  return Ea(s);
}
(function(s) {
  s[s.Disabled = 0] = "Disabled", s[s.Continuous = 1] = "Continuous", s[s.OnDataUpdate = 2] = "OnDataUpdate";
})(r0 || (r0 = {})), (function(s) {
  s[s.LastBar = 0] = "LastBar", s[s.LastVisible = 1] = "LastVisible";
})(o0 || (o0 = {})), (function(s) {
  s.Solid = "solid", s.VerticalGradient = "gradient";
})(Md || (Md = {})), (function(s) {
  s[s.Year = 0] = "Year", s[s.Month = 1] = "Month", s[s.DayOfMonth = 2] = "DayOfMonth", s[s.Time = 3] = "Time", s[s.TimeWithSeconds = 4] = "TimeWithSeconds";
})(u0 || (u0 = {}));
const c0 = (s) => s.getUTCFullYear();
function VC(s, t, n) {
  return t.replace(/yyyy/g, ((a) => un(c0(a), 4))(s)).replace(/yy/g, ((a) => un(c0(a) % 100, 2))(s)).replace(/MMMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "long" }))(s, n)).replace(/MMM/g, ((a, r) => new Date(a.getUTCFullYear(), a.getUTCMonth(), 1).toLocaleString(r, { month: "short" }))(s, n)).replace(/MM/g, ((a) => un(((r) => r.getUTCMonth() + 1)(a), 2))(s)).replace(/dd/g, ((a) => un(((r) => r.getUTCDate())(a), 2))(s));
}
class p1 {
  constructor(t = "yyyy-MM-dd", n = "default") {
    this._f = t, this.uf = n;
  }
  Cu(t) {
    return VC(t, this._f, this.uf);
  }
}
class GC {
  constructor(t) {
    this.cf = t || "%h:%m:%s";
  }
  Cu(t) {
    return this.cf.replace("%h", un(t.getUTCHours(), 2)).replace("%m", un(t.getUTCMinutes(), 2)).replace("%s", un(t.getUTCSeconds(), 2));
  }
}
const KC = { df: "yyyy-MM-dd", ff: "%h:%m:%s", pf: " ", vf: "default" };
class XC {
  constructor(t = {}) {
    const n = { ...KC, ...t };
    this.mf = new p1(n.df, n.vf), this.wf = new GC(n.ff), this.Mf = n.pf;
  }
  Cu(t) {
    return `${this.mf.Cu(t)}${this.Mf}${this.wf.Cu(t)}`;
  }
}
function To(s) {
  return 60 * s * 60 * 1e3;
}
function Wh(s) {
  return 60 * s * 1e3;
}
const Oo = [{ gf: (h0 = 1, 1e3 * h0), bf: 10 }, { gf: Wh(1), bf: 20 }, { gf: Wh(5), bf: 21 }, { gf: Wh(30), bf: 22 }, { gf: To(1), bf: 30 }, { gf: To(3), bf: 31 }, { gf: To(6), bf: 32 }, { gf: To(12), bf: 33 }];
var h0;
function d0(s, t) {
  if (s.getUTCFullYear() !== t.getUTCFullYear()) return 70;
  if (s.getUTCMonth() !== t.getUTCMonth()) return 60;
  if (s.getUTCDate() !== t.getUTCDate()) return 50;
  for (let n = Oo.length - 1; n >= 0; --n) if (Math.floor(t.getTime() / Oo[n].gf) !== Math.floor(s.getTime() / Oo[n].gf)) return Oo[n].bf;
  return 0;
}
function Jh(s) {
  let t = s;
  if (lr(s) && (t = ef(s)), !Nd(t)) throw new Error("time must be of type BusinessDay");
  const n = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
  return { Sf: Math.round(n.getTime() / 1e3), xf: t };
}
function f0(s) {
  if (!m1(s)) throw new Error("time must be of type isUTCTimestamp");
  return { Sf: s };
}
function ef(s) {
  const t = new Date(s);
  if (isNaN(t.getTime())) throw new Error(`Invalid date string=${s}, expected format=yyyy-mm-dd`);
  return { day: t.getUTCDate(), month: t.getUTCMonth() + 1, year: t.getUTCFullYear() };
}
function m0(s) {
  lr(s.time) && (s.time = ef(s.time));
}
class p0 {
  options() {
    return this.yn;
  }
  setOptions(t) {
    this.yn = t, this.updateFormatter(t.localization);
  }
  preprocessData(t) {
    Array.isArray(t) ? (function(n) {
      n.forEach(m0);
    })(t) : m0(t);
  }
  createConverterToInternalObj(t) {
    return W((function(n) {
      return n.length === 0 ? null : Nd(n[0].time) || lr(n[0].time) ? Jh : f0;
    })(t));
  }
  key(t) {
    return typeof t == "object" && "Sf" in t ? t.Sf : this.key(this.convertHorzItemToInternal(t));
  }
  cacheKey(t) {
    const n = t;
    return n.xf === void 0 ? new Date(1e3 * n.Sf).getTime() : new Date(Date.UTC(n.xf.year, n.xf.month - 1, n.xf.day)).getTime();
  }
  convertHorzItemToInternal(t) {
    return m1(n = t) ? f0(n) : Nd(n) ? Jh(n) : Jh(ef(n));
    var n;
  }
  updateFormatter(t) {
    if (!this.yn) return;
    const n = t.dateFormat;
    this.yn.timeScale.timeVisible ? this.Cf = new XC({ df: n, ff: this.yn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m", pf: "   ", vf: t.locale }) : this.Cf = new p1(n, t.locale);
  }
  formatHorzItem(t) {
    const n = t;
    return this.Cf.Cu(new Date(1e3 * n.Sf));
  }
  formatTickmark(t, n) {
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
      const u = r.tickMarkFormatter(t.originalTime, a, n.locale);
      if (u !== null) return u;
    }
    return (function(u, c, d) {
      const m = {};
      switch (c) {
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
      const v = u.xf === void 0 ? new Date(1e3 * u.Sf) : new Date(Date.UTC(u.xf.year, u.xf.month - 1, u.xf.day));
      return new Date(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()).toLocaleString(d, m);
    })(t.time, a, n.locale);
  }
  maxTickMarkWeight(t) {
    let n = t.reduce(QC, t[0]).weight;
    return n > 30 && n < 50 && (n = 30), n;
  }
  fillWeightsForPoints(t, n) {
    (function(a, r = 0) {
      if (a.length === 0) return;
      let u = r === 0 ? null : a[r - 1].time.Sf, c = u !== null ? new Date(1e3 * u) : null, d = 0;
      for (let m = r; m < a.length; ++m) {
        const v = a[m], g = new Date(1e3 * v.time.Sf);
        c !== null && (v.timeWeight = d0(g, c)), d += v.time.Sf - (u || v.time.Sf), u = v.time.Sf, c = g;
      }
      if (r === 0 && a.length > 1) {
        const m = Math.ceil(d / (a.length - 1)), v = new Date(1e3 * (a[0].time.Sf - m));
        a[0].timeWeight = d0(new Date(1e3 * a[0].time.Sf), v);
      }
    })(t, n);
  }
  static yf(t) {
    return Pe({ localization: { dateFormat: "dd MMM 'yy" } }, t ?? {});
  }
}
const ja = typeof window < "u";
function v0() {
  return !!ja && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
}
function Ih() {
  return !!ja && /iPhone|iPad|iPod/.test(window.navigator.platform);
}
function ZC(s, t) {
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
function WC(s) {
  ja && window.chrome !== void 0 && s.addEventListener("mousedown", ((t) => {
    if (t.button === 1) return t.preventDefault(), !1;
  }));
}
class pu {
  constructor(t, n, a) {
    this.kf = 0, this.Pf = null, this.Tf = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Rf = 0, this.Df = null, this.If = { _t: Number.NEGATIVE_INFINITY, ut: Number.POSITIVE_INFINITY }, this.Vf = null, this.Bf = !1, this.Ef = null, this.Af = null, this.Lf = !1, this.zf = !1, this.Of = !1, this.Nf = null, this.Ff = null, this.Wf = null, this.Hf = null, this.Uf = null, this.$f = null, this.jf = null, this.qf = 0, this.Yf = !1, this.Kf = !1, this.Zf = !1, this.Gf = 0, this.Xf = null, this.Jf = !Ih(), this.Qf = (r) => {
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
    }, this.dp = t, this.lp = n, this.yn = a, this.fp();
  }
  m() {
    this.Nf !== null && (this.Nf(), this.Nf = null), this.Ff !== null && (this.Ff(), this.Ff = null), this.Hf !== null && (this.Hf(), this.Hf = null), this.Uf !== null && (this.Uf(), this.Uf = null), this.$f !== null && (this.$f(), this.$f = null), this.Wf !== null && (this.Wf(), this.Wf = null), this.pp(), this.cp();
  }
  vp(t) {
    this.Hf && this.Hf();
    const n = this.mp.bind(this);
    if (this.Hf = () => {
      this.dp.removeEventListener("mousemove", n);
    }, this.dp.addEventListener("mousemove", n), this.np(t)) return;
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
    const n = this.sp(t);
    this._p(n, this.lp.Mp), this.Jf = !0;
  }
  gp(t) {
    const n = Fh(t.changedTouches, W(this.Xf));
    if (n === null || (this.Gf = Do(t), this.jf !== null) || this.Kf) return;
    this.Yf = !0;
    const a = this.rp(Ri(n), W(this.Af)), { bp: r, Sp: u, ep: c } = a;
    if (this.Lf || !(c < 5)) {
      if (!this.Lf) {
        const d = 0.5 * r, m = u >= d && !this.yn.xp(), v = d > u && !this.yn.Cp();
        m || v || (this.Kf = !0), this.Lf = !0, this.Of = !0, this.pp(), this.op();
      }
      if (!this.Kf) {
        const d = this.sp(t, n);
        this.hp(d, this.lp.yp), fa(t);
      }
    }
  }
  kp(t) {
    if (t.button !== 0) return;
    const n = this.rp(Ri(t), W(this.Ef)), { ep: a } = n;
    if (a >= 5 && (this.zf = !0, this.cp()), this.zf) {
      const r = this.sp(t);
      this._p(r, this.lp.Pp);
    }
  }
  rp(t, n) {
    const a = Math.abs(n._t - t._t), r = Math.abs(n.ut - t.ut);
    return { bp: a, Sp: r, ep: a + r };
  }
  Tp(t) {
    let n = Fh(t.changedTouches, W(this.Xf));
    if (n === null && t.touches.length === 0 && (n = t.changedTouches[0]), n === null) return;
    this.Xf = null, this.Gf = Do(t), this.pp(), this.Af = null, this.$f && (this.$f(), this.$f = null);
    const a = this.sp(t, n);
    if (this.hp(a, this.lp.Rp), ++this.Rf, this.Df && this.Rf > 1) {
      const { ep: r } = this.rp(Ri(n), this.If);
      r < 30 && !this.Of && this.hp(a, this.lp.ap), this.op();
    } else this.Of || (this.hp(a, this.lp.Dp), this.lp.Dp && fa(t));
    this.Rf === 0 && fa(t), t.touches.length === 0 && this.Bf && (this.Bf = !1, fa(t));
  }
  tp(t) {
    if (t.button !== 0) return;
    const n = this.sp(t);
    if (this.Ef = null, this.Zf = !1, this.Uf && (this.Uf(), this.Uf = null), v0() && this.dp.ownerDocument.documentElement.removeEventListener("mouseleave", this.Qf), !this.np(t)) if (this._p(n, this.lp.Ip), ++this.kf, this.Pf && this.kf > 1) {
      const { ep: a } = this.rp(Ri(t), this.Tf);
      a < 5 && !this.zf && this._p(n, this.lp.up), this.cp();
    } else this.zf || this._p(n, this.lp.Vp);
  }
  pp() {
    this.Vf !== null && (clearTimeout(this.Vf), this.Vf = null);
  }
  Bp(t) {
    if (this.Xf !== null) return;
    const n = t.changedTouches[0];
    this.Xf = n.identifier, this.Gf = Do(t);
    const a = this.dp.ownerDocument.documentElement;
    this.Of = !1, this.Lf = !1, this.Kf = !1, this.Af = Ri(n), this.$f && (this.$f(), this.$f = null);
    {
      const u = this.gp.bind(this), c = this.Tp.bind(this);
      this.$f = () => {
        a.removeEventListener("touchmove", u), a.removeEventListener("touchend", c);
      }, a.addEventListener("touchmove", u, { passive: !1 }), a.addEventListener("touchend", c, { passive: !1 }), this.pp(), this.Vf = setTimeout(this.Ep.bind(this, t), 240);
    }
    const r = this.sp(t, n);
    this.hp(r, this.lp.Ap), this.Df || (this.Rf = 0, this.Df = setTimeout(this.op.bind(this), 500), this.If = Ri(n));
  }
  Lp(t) {
    if (t.button !== 0) return;
    const n = this.dp.ownerDocument.documentElement;
    v0() && n.addEventListener("mouseleave", this.Qf), this.zf = !1, this.Ef = Ri(t), this.Uf && (this.Uf(), this.Uf = null);
    {
      const r = this.kp.bind(this), u = this.tp.bind(this);
      this.Uf = () => {
        n.removeEventListener("mousemove", r), n.removeEventListener("mouseup", u);
      }, n.addEventListener("mousemove", r), n.addEventListener("mouseup", u);
    }
    if (this.Zf = !0, this.np(t)) return;
    const a = this.sp(t);
    this._p(a, this.lp.zp), this.Pf || (this.kf = 0, this.Pf = setTimeout(this.cp.bind(this), 500), this.Tf = Ri(t));
  }
  fp() {
    this.dp.addEventListener("mouseenter", this.vp.bind(this)), this.dp.addEventListener("touchcancel", this.pp.bind(this));
    {
      const t = this.dp.ownerDocument, n = (a) => {
        this.lp.Op && (a.composed && this.dp.contains(a.composedPath()[0]) || a.target && this.dp.contains(a.target) || this.lp.Op());
      };
      this.Ff = () => {
        t.removeEventListener("touchstart", n);
      }, this.Nf = () => {
        t.removeEventListener("mousedown", n);
      }, t.addEventListener("mousedown", n), t.addEventListener("touchstart", n, { passive: !0 });
    }
    Ih() && (this.Wf = () => {
      this.dp.removeEventListener("dblclick", this.ip);
    }, this.dp.addEventListener("dblclick", this.ip)), this.dp.addEventListener("mouseleave", this.Np.bind(this)), this.dp.addEventListener("touchstart", this.Bp.bind(this), { passive: !0 }), WC(this.dp), this.dp.addEventListener("mousedown", this.Lp.bind(this)), this.Fp(), this.dp.addEventListener("touchmove", (() => {
    }), { passive: !1 });
  }
  Fp() {
    this.lp.Wp === void 0 && this.lp.Hp === void 0 && this.lp.Up === void 0 || (this.dp.addEventListener("touchstart", ((t) => this.$p(t.touches)), { passive: !0 }), this.dp.addEventListener("touchmove", ((t) => {
      if (t.touches.length === 2 && this.jf !== null && this.lp.Hp !== void 0) {
        const n = g0(t.touches[0], t.touches[1]) / this.qf;
        this.lp.Hp(this.jf, n), fa(t);
      }
    }), { passive: !1 }), this.dp.addEventListener("touchend", ((t) => {
      this.$p(t.touches);
    })));
  }
  $p(t) {
    t.length === 1 && (this.Yf = !1), t.length !== 2 || this.Yf || this.Bf ? this.jp() : this.qp(t);
  }
  qp(t) {
    const n = this.dp.getBoundingClientRect() || { left: 0, top: 0 };
    this.jf = { _t: (t[0].clientX - n.left + (t[1].clientX - n.left)) / 2, ut: (t[0].clientY - n.top + (t[1].clientY - n.top)) / 2 }, this.qf = g0(t[0], t[1]), this.lp.Wp !== void 0 && this.lp.Wp(), this.pp();
  }
  jp() {
    this.jf !== null && (this.jf = null, this.lp.Up !== void 0 && this.lp.Up());
  }
  Np(t) {
    if (this.Hf && this.Hf(), this.np(t) || !this.Jf) return;
    const n = this.sp(t);
    this._p(n, this.lp.Yp), this.Jf = !Ih();
  }
  Ep(t) {
    const n = Fh(t.touches, W(this.Xf));
    if (n === null) return;
    const a = this.sp(t, n);
    this.hp(a, this.lp.Kp), this.Of = !0, this.Bf = !0;
  }
  np(t) {
    return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : Do(t) < this.Gf + 500;
  }
  hp(t, n) {
    n && n.call(this.lp, t);
  }
  _p(t, n) {
    n && n.call(this.lp, t);
  }
  sp(t, n) {
    const a = n || t, r = this.dp.getBoundingClientRect() || { left: 0, top: 0 };
    return { clientX: a.clientX, clientY: a.clientY, pageX: a.pageX, pageY: a.pageY, screenX: a.screenX, screenY: a.screenY, localX: a.clientX - r.left, localY: a.clientY - r.top, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey, metaKey: t.metaKey, Zp: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click", Gp: t.type, Xp: a.target, gu: t.view, Jp: () => {
      t.type !== "touchstart" && fa(t);
    } };
  }
}
function g0(s, t) {
  const n = s.clientX - t.clientX, a = s.clientY - t.clientY;
  return Math.sqrt(n * n + a * a);
}
function fa(s) {
  s.cancelable && s.preventDefault();
}
function Ri(s) {
  return { _t: s.pageX, ut: s.pageY };
}
function Do(s) {
  return s.timeStamp || performance.now();
}
function Fh(s, t) {
  for (let n = 0; n < s.length; ++n) if (s[n].identifier === t) return s[n];
  return null;
}
class JC {
  constructor(t, n, a) {
    this.Qp = null, this.tv = null, this.iv = !0, this.nv = null, this.sv = t, this.ev = t.rv()[n], this.hv = t.rv()[a], this.av = document.createElement("tr"), this.av.style.height = "1px", this.lv = document.createElement("td"), this.lv.style.position = "relative", this.lv.style.padding = "0", this.lv.style.margin = "0", this.lv.setAttribute("colspan", "3"), this.ov(), this.av.appendChild(this.lv), this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp = null, this.tv = null);
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
  fv(t, n, a) {
    const r = this.dv();
    t.fillStyle = this.sv.N().layout.panes.separatorColor, t.fillRect(n, a, r.width, r.height);
  }
  kt() {
    this.ov(), this.sv.N().layout.panes.enableResize !== this.iv && (this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp !== null && (this.lv.removeChild(this.Qp.pv), this.lv.removeChild(this.Qp.vv), this.Qp = null), this.tv !== null && (this.tv.m(), this.tv = null)));
  }
  _v() {
    const t = document.createElement("div"), n = t.style;
    n.position = "fixed", n.display = "none", n.zIndex = "49", n.top = "0", n.left = "0", n.width = "100%", n.height = "100%", n.cursor = "row-resize", this.lv.appendChild(t);
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
    const n = this.ev.Sv().z_() + this.hv.Sv().z_(), a = n / (this.ev.cv().height + this.hv.cv().height), r = 30 * a;
    n <= 2 * r || (this.nv = { xv: t.pageY, Cv: this.ev.Sv().z_(), yv: n - r, kv: n, Pv: a, Tv: r }, this.Qp.pv.style.display = "block");
  }
  gv(t) {
    const n = this.nv;
    if (n === null) return;
    const a = (t.pageY - n.xv) * n.Pv, r = xa(n.Cv + a, n.Tv, n.yv);
    this.ev.Sv().O_(r), this.hv.Sv().O_(n.kv - r), this.sv.Qt().Pa();
  }
  bv(t) {
    this.nv !== null && this.Qp !== null && (this.nv = null, this.Qp.pv.style.display = "none");
  }
}
function Ph(s, t) {
  return s.Rv - t.Rv;
}
function td(s, t, n) {
  const a = (s.Rv - t.Rv) / (s.wt - t.wt);
  return Math.sign(a) * Math.min(Math.abs(a), n);
}
class IC {
  constructor(t, n, a, r) {
    this.Dv = null, this.Iv = null, this.Vv = null, this.Bv = null, this.Ev = null, this.Av = 0, this.Lv = 0, this.zv = t, this.Ov = n, this.Nv = a, this.ks = r;
  }
  Fv(t, n) {
    if (this.Dv !== null) {
      if (this.Dv.wt === n) return void (this.Dv.Rv = t);
      if (Math.abs(this.Dv.Rv - t) < this.ks) return;
    }
    this.Bv = this.Vv, this.Vv = this.Iv, this.Iv = this.Dv, this.Dv = { wt: n, Rv: t };
  }
  me(t, n) {
    if (this.Dv === null || this.Iv === null || n - this.Dv.wt > 50) return;
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
    let m = 0;
    for (let v = 0; v < c.length; ++v) m += d[v] / a * c[v];
    Math.abs(m) < this.zv || (this.Ev = { Rv: t, wt: n }, this.Lv = m, this.Av = (function(v, g) {
      const b = Math.log(g);
      return Math.log(1 * b / -v) / b;
    })(Math.abs(m), this.Nv));
  }
  qc(t) {
    const n = W(this.Ev), a = t - n.wt;
    return n.Rv + this.Lv * (Math.pow(this.Nv, a) - 1) / Math.log(this.Nv);
  }
  jc(t) {
    return this.Ev === null || this.Wv(t) === this.Av;
  }
  Wv(t) {
    const n = t - W(this.Ev).wt;
    return Math.min(n, this.Av);
  }
}
class FC {
  constructor(t, n) {
    this.Hv = void 0, this.Uv = void 0, this.$v = void 0, this.vn = !1, this.jv = t, this.qv = n, this.Yv();
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
function ws(s, t) {
  const n = W(s.ownerDocument).createElement("canvas");
  s.appendChild(n);
  const a = RN(n, { options: { allowResizeObserver: !0 }, transform: (r, u) => ({ width: Math.max(r.width, u.width), height: Math.max(r.height, u.height) }) });
  return a.resizeCanvasElement(t), a;
}
function _s(s) {
  s.width = 1, s.height = 1, s.getContext("2d")?.clearRect(0, 0, 1, 1);
}
function Ed(s, t, n, a) {
  s.qh && s.qh(t, n, a);
}
function Qo(s, t, n, a) {
  s.st(t, n, a);
}
function jd(s, t, n, a) {
  const r = s(n, a);
  for (const u of r) {
    const c = u.Tt(a);
    c !== null && t(c);
  }
}
function ed(s, t) {
  return (n) => (function(a) {
    return a.Ft !== void 0;
  })(n) ? (n.Ft()?.cl() ?? "") !== t ? [] : n.Ga?.(s) ?? [] : [];
}
function b0(s, t, n, a) {
  if (!s.length) return;
  let r = 0;
  const u = s[0].$t(a, !0);
  let c = t === 1 ? n / 2 - (s[0].Hi() - u / 2) : s[0].Hi() - u / 2 - n / 2;
  c = Math.max(0, c);
  for (let d = 1; d < s.length; d++) {
    const m = s[d], v = s[d - 1], g = v.$t(a, !1), b = m.Hi(), x = v.Hi();
    if (t === 1 ? b > x - g : b < x + g) {
      const S = x - g * t;
      m.Ui(S);
      const w = S - t * g / 2;
      if ((t === 1 ? w < 0 : w > n) && c > 0) {
        const M = t === 1 ? -1 - w : w - n, N = Math.min(M, c);
        for (let j = r; j < s.length; j++) s[j].Ui(s[j].Hi() + t * N);
        c -= N;
      }
    } else r = d, c = t === 1 ? x - g - b : b - (x + g);
  }
}
class y0 {
  constructor(t, n, a, r) {
    this.Ki = null, this.Qv = null, this.tm = !1, this.im = new Po(200), this.nm = null, this.sm = 0, this.rm = !1, this.hm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.lm = () => {
      this.rm || this.yt.am().Qt().mr();
    }, this.yt = t, this.yn = n, this.ko = n.layout, this.wd = a, this.om = r === "left", this._m = ed("normal", r), this.um = ed("top", r), this.dm = ed("bottom", r), this.lv = document.createElement("div"), this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.lv.style.width = "25px", this.lv.style.left = "0", this.lv.style.position = "relative", this.fm = ws(this.lv, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const u = this.fm.canvasElement;
    u.style.position = "absolute", u.style.zIndex = "1", u.style.left = "0", u.style.top = "0", this.pm = ws(this.lv, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const c = this.pm.canvasElement;
    c.style.position = "absolute", c.style.zIndex = "2", c.style.left = "0", c.style.top = "0";
    const d = { zp: this.Mv.bind(this), Ap: this.Mv.bind(this), Pp: this.gv.bind(this), yp: this.gv.bind(this), Op: this.vm.bind(this), Ip: this.bv.bind(this), Rp: this.bv.bind(this), up: this.wm.bind(this), ap: this.wm.bind(this), wp: this.Mm.bind(this), Yp: this.wv.bind(this) };
    this.tv = new pu(this.pm.canvasElement, d, { xp: () => !this.yn.handleScroll.vertTouchDrag, Cp: () => !0 });
  }
  m() {
    this.tv.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), _s(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), _s(this.fm.canvasElement), this.fm.dispose(), this.Ki !== null && this.Ki.a_().u(this), this.Ki = null;
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
    const n = this.gm(), a = W(this.fm.canvasElement.getContext("2d", { colorSpace: this.yt.am().N().layout.colorSpace }));
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
    const m = t || 34;
    return Cd(Math.ceil(n.S + n.C + n.V + n.B + 5 + m));
  }
  Cm(t) {
    this.Qv !== null && fs(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`);
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
    const n = { colorSpace: this.yt.am().N().layout.colorSpace };
    if (t !== 1) {
      this.Pm(), this.fm.applySuggestedBitmapSize();
      const r = ys(this.fm, n);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u), this.Rm(u);
      })), this.yt.Dm(r, this.dm), this.Im(r), this.yt.Dm(r, this._m), this.Vm(r));
    }
    this.pm.applySuggestedBitmapSize();
    const a = ys(this.pm, n);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.Bm(a), this.yt.Dm(a, this.um));
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, n, a, r) {
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, n, a), r)) {
      const c = this.pm.canvasElement;
      t.drawImage(c, n, a);
    }
  }
  kt() {
    this.Ki?.El();
  }
  Mv(t) {
    if (this.Ki === null || this.Ki.Gi() || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const n = this.yt.am().Qt(), a = this.yt.Sv();
    this.tm = !0, n.G_(a, this.Ki, t.localY);
  }
  gv(t) {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const n = this.yt.am().Qt(), a = this.yt.Sv(), r = this.Ki;
    n.X_(a, r, t.localY);
  }
  vm() {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const t = this.yt.am().Qt(), n = this.yt.Sv(), a = this.Ki;
    this.tm && (this.tm = !1, t.J_(n, a));
  }
  bv(t) {
    if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
    const n = this.yt.am().Qt(), a = this.yt.Sv();
    this.tm = !1, n.J_(a, this.Ki);
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
    const t = [], n = this.Ki === null ? void 0 : this.Ki;
    return ((a) => {
      for (let r = 0; r < a.length; ++r) {
        const u = a[r].qn(this.yt.Sv(), n);
        for (let c = 0; c < u.length; c++) t.push(u[c]);
      }
    })(this.yt.Sv().Dt()), t;
  }
  Tm({ context: t, bitmapSize: n }) {
    const { width: a, height: r } = n, u = this.yt.Sv().Qt(), c = u.$(), d = u.ef();
    c === d ? cu(t, 0, 0, a, r, c) : e1(t, 0, 0, a, r, c, d);
  }
  Rm({ context: t, bitmapSize: n, horizontalPixelRatio: a }) {
    if (this.Qv === null || this.Ki === null || !this.Ki.N().borderVisible) return;
    t.fillStyle = this.Ki.N().borderColor;
    const r = Math.max(1, Math.floor(this.gm().S * a));
    let u;
    u = this.om ? n.width - r : 0, t.fillRect(u, 0, r, n.height);
  }
  Im(t) {
    if (this.Qv === null || this.Ki === null) return;
    const n = this.Ki.El(), a = this.Ki.N(), r = this.gm(), u = this.om ? this.Qv.width - r.C : 0;
    a.borderVisible && a.ticksVisible && t.useBitmapCoordinateSpace((({ context: c, horizontalPixelRatio: d, verticalPixelRatio: m }) => {
      c.fillStyle = a.borderColor;
      const v = Math.max(1, Math.floor(m)), g = Math.floor(0.5 * m), b = Math.round(r.C * d);
      c.beginPath();
      for (const x of n) c.rect(Math.floor(u * d), Math.round(x.Rl * m) - g, b, v);
      c.fill();
    })), t.useMediaCoordinateSpace((({ context: c }) => {
      c.font = this.Sm(), c.fillStyle = a.textColor ?? this.ko.textColor, c.textAlign = this.om ? "right" : "left", c.textBaseline = "middle";
      const d = this.om ? Math.round(u - r.V) : Math.round(u + r.C + r.V), m = n.map(((v) => this.im.Di(c, v.io)));
      for (let v = n.length; v--; ) {
        const g = n[v];
        c.fillText(g.io, d, g.Rl + m[v]);
      }
    }));
  }
  Pm() {
    if (this.Qv === null || this.Ki === null) return;
    let t = this.Qv.height / 2;
    const n = [], a = this.Ki.Dt().slice(), r = this.yt.Sv(), u = this.gm();
    this.Ki === r.Gs() && this.yt.Sv().Dt().forEach(((m) => {
      r.Zs(m) && a.push(m);
    }));
    const c = this.Ki.Cl()[0], d = this.Ki;
    a.forEach(((m) => {
      const v = m.qn(r, d);
      v.forEach(((g) => {
        g.$i() && g.Wi() === null && (g.Ui(null), n.push(g));
      })), c === m && v.length > 0 && (t = v[0].Ei());
    })), this.Ki.N().alignLabels && this.Am(n, u, t);
  }
  Am(t, n, a) {
    if (this.Qv === null) return;
    const r = t.filter(((c) => c.Ei() <= a)), u = t.filter(((c) => c.Ei() > a));
    r.sort(((c, d) => d.Ei() - c.Ei())), r.length && u.length && u.push(r[0]), u.sort(((c, d) => c.Ei() - d.Ei()));
    for (const c of t) {
      const d = Math.floor(c.$t(n) / 2), m = c.Ei();
      m > -d && m < d && c.Ui(d), m > this.Qv.height - d && m < this.Qv.height + d && c.Ui(this.Qv.height - d);
    }
    b0(r, 1, this.Qv.height, n), b0(u, -1, this.Qv.height, n);
  }
  Vm(t) {
    if (this.Qv === null) return;
    const n = this.xm(), a = this.gm(), r = this.om ? "right" : "left";
    n.forEach(((u) => {
      u.ji() && u.Tt(W(this.Ki)).st(t, a, this.im, r);
    }));
  }
  Bm(t) {
    if (this.Qv === null || this.Ki === null) return;
    const n = this.yt.am().Qt(), a = [], r = this.yt.Sv(), u = n.Rd().qn(r, this.Ki);
    u.length && a.push(u);
    const c = this.gm(), d = this.om ? "right" : "left";
    a.forEach(((m) => {
      m.forEach(((v) => {
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
    return Fo(this.ko.fontSize, this.ko.fontFamily);
  }
}
function PC(s, t) {
  return s.Ka?.(t) ?? [];
}
function x0(s, t) {
  return s.jn?.(t) ?? [];
}
function w0(s, t) {
  return s.cn?.(t) ?? [];
}
function tE(s, t) {
  return s.ja?.(t) ?? [];
}
class nf {
  constructor(t, n) {
    this.Qv = $t({ width: 0, height: 0 }), this.Lm = null, this.zm = null, this.Om = null, this.Nm = null, this.Fm = !1, this.Wm = new te(), this.Hm = new te(), this.Um = 0, this.$m = !1, this.jm = null, this.qm = !1, this.Ym = null, this.Km = null, this.rm = !1, this.hm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.lm = () => {
      this.rm || this.Zm === null || this.sn().mr();
    }, this.qv = t, this.Zm = n, this.Zm.fu().i(this.Gm.bind(this), this, !0), this.Xm = document.createElement("td"), this.Xm.style.padding = "0", this.Xm.style.position = "relative";
    const a = document.createElement("div");
    a.style.width = "100%", a.style.height = "100%", a.style.position = "relative", a.style.overflow = "hidden", this.Jm = document.createElement("td"), this.Jm.style.padding = "0", this.Qm = document.createElement("td"), this.Qm.style.padding = "0", this.Xm.appendChild(a), this.fm = ws(a, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const r = this.fm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "1", r.style.left = "0", r.style.top = "0", this.pm = ws(a, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const u = this.pm.canvasElement;
    u.style.position = "absolute", u.style.zIndex = "2", u.style.left = "0", u.style.top = "0", this.av = document.createElement("tr"), this.av.appendChild(this.Jm), this.av.appendChild(this.Xm), this.av.appendChild(this.Qm), this.tw(), this.tv = new pu(this.pm.canvasElement, this, { xp: () => this.jm === null && !this.qv.N().handleScroll.vertTouchDrag, Cp: () => this.jm === null && !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.Lm !== null && this.Lm.m(), this.zm !== null && this.zm.m(), this.Om = null, this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), _s(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), _s(this.fm.canvasElement), this.fm.dispose(), this.Zm !== null && (this.Zm.fu().u(this), this.Zm.m()), this.tv.m();
  }
  Sv() {
    return W(this.Zm);
  }
  iw(t) {
    this.Zm !== null && this.Zm.fu().u(this), this.Zm = t, this.Zm !== null && this.Zm.fu().i(nf.prototype.Gm.bind(this), this, !0), this.tw(), this.qv.rv().indexOf(this) === this.qv.rv().length - 1 ? (this.Om = this.Om ?? new FC(this.Xm, this.qv), this.Om.kt()) : (this.Om?.Kv(), this.Om = null);
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
    const n = t.localX, a = t.localY;
    this.rw(n, a, t);
  }
  zp(t) {
    this.ew(), this.hw(), this.rw(t.localX, t.localY, t);
  }
  Mp(t) {
    if (!this.Zm) return;
    this.ew();
    const n = t.localX, a = t.localY;
    this.rw(n, a, t);
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
      const n = { x: t.localX, y: t.localY };
      this.uw(n, n, t);
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
  Hp(t, n) {
    if (!this.qv.N().handleScale.pinch) return;
    const a = 5 * (n - this.Um);
    this.Um = n, this.sn().Od(t._t, a);
  }
  Ap(t) {
    this.$m = !1, this.qm = this.jm !== null, this.hw();
    const n = this.sn().Rd();
    this.jm !== null && n.It() && (this.Ym = { x: n.ni(), y: n.si() }, this.jm = { x: t.localX, y: t.localY });
  }
  yp(t) {
    if (this.Zm === null) return;
    const n = t.localX, a = t.localY;
    if (this.jm === null) this.ow(t);
    else {
      this.qm = !1;
      const r = W(this.Ym), u = r.x + (n - this.jm.x), c = r.y + (a - this.jm.y);
      this.rw(u, c, t);
    }
  }
  Rp(t) {
    this.am().N().trackingMode.exitMode === 0 && (this.qm = !0), this.pw(), this._w(t);
  }
  Qs(t, n) {
    const a = this.Zm;
    return a === null ? null : d1(a, t, n);
  }
  mw(t, n) {
    W(n === "left" ? this.Lm : this.zm).Cm($t({ width: t, height: this.Qv.height }));
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    fs(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.Xm.style.width = t.width + "px", this.Xm.style.height = t.height + "px");
  }
  ww() {
    const t = W(this.Zm);
    t.q_(t.K_()), t.q_(t.Z_());
    for (const n of t.Cl()) if (t.Zs(n)) {
      const a = n.Ft();
      a !== null && t.q_(a), n.Nn();
    }
    for (const n of t.vu()) n.Nn();
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, n, a, r) {
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, n, a), r)) {
      const c = this.pm.canvasElement;
      t !== null && t.drawImage(c, n, a);
    }
  }
  km(t) {
    if (t === 0 || this.Zm === null) return;
    t > 1 && this.ww(), this.Lm !== null && this.Lm.km(t), this.zm !== null && this.zm.km(t);
    const n = { colorSpace: this.qv.N().layout.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = ys(this.fm, n);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u);
      })), this.Zm && (this.Mw(r, PC), this.gw(r), this.Mw(r, x0), this.Mw(r, w0)));
    }
    this.pm.applySuggestedBitmapSize();
    const a = ys(this.pm, n);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.bw(a), this.Mw(a, tE), this.Mw(a, w0));
  }
  Sw() {
    return this.Lm;
  }
  xw() {
    return this.zm;
  }
  Dm(t, n) {
    this.Mw(t, n);
  }
  Gm() {
    this.Zm !== null && this.Zm.fu().u(this), this.Zm = null;
  }
  aw(t) {
    this.lw(this.Wm, t);
  }
  lw(t, n) {
    const a = n.localX, r = n.localY;
    t.v() && t.p(this.sn().Et().Rc(a), { x: a, y: r }, n);
  }
  Tm({ context: t, bitmapSize: n }) {
    const { width: a, height: r } = n, u = this.sn(), c = u.$(), d = u.ef();
    c === d ? cu(t, 0, 0, a, r, d) : e1(t, 0, 0, a, r, c, d);
  }
  gw(t) {
    const n = W(this.Zm), a = n.pu().wr().Tt(n);
    a !== null && a.st(t, !1);
  }
  bw(t) {
    this.Cw(t, x0, Qo, this.sn().Rd());
  }
  Mw(t, n) {
    const a = W(this.Zm), r = a.au(), u = a.vu();
    for (const c of u) this.Cw(t, n, Ed, c);
    for (const c of r) this.Cw(t, n, Ed, c);
    for (const c of u) this.Cw(t, n, Qo, c);
    for (const c of r) this.Cw(t, n, Qo, c);
  }
  Cw(t, n, a, r) {
    const u = W(this.Zm), c = u.Qt().ou(), d = c !== null && c.lu === r, m = c !== null && d && c.wu !== void 0 ? c.wu.ie : void 0;
    jd(n, ((v) => a(v, t, d, m)), r, u);
  }
  nw() {
    if (this.Zm === null) return;
    const t = this.qv, n = this.Zm.K_().N().visible, a = this.Zm.Z_().N().visible;
    n || this.Lm === null || (this.Jm.removeChild(this.Lm.uv()), this.Lm.m(), this.Lm = null), a || this.zm === null || (this.Qm.removeChild(this.zm.uv()), this.zm.m(), this.zm = null);
    const r = t.Qt().Zd();
    n && this.Lm === null && (this.Lm = new y0(this, t.N(), r, "left"), this.Jm.appendChild(this.Lm.uv())), a && this.zm === null && (this.zm = new y0(this, t.N(), r, "right"), this.Qm.appendChild(this.zm.uv()));
  }
  yw(t) {
    return t.Zp && this.$m || this.jm !== null;
  }
  rw(t, n, a) {
    t = Math.max(0, Math.min(t, this.Qv.width - 1)), n = Math.max(0, Math.min(n, this.Qv.height - 1)), this.sn().jd(t, n, a, W(this.Zm));
  }
  cw() {
    this.sn().Yd();
  }
  pw() {
    this.qm && (this.jm = null, this.cw());
  }
  uw(t, n, a) {
    this.jm = t, this.qm = !1, this.rw(n.x, n.y, a);
    const r = this.sn().Rd();
    this.Ym = { x: r.ni(), y: r.si() };
  }
  sn() {
    return this.qv.Qt();
  }
  _w(t) {
    if (!this.Fm) return;
    const n = this.sn(), a = this.Sv();
    if (n.iu(a, a.Pn()), this.Nm = null, this.Fm = !1, n.Hd(), this.Km !== null) {
      const r = performance.now(), u = n.Et();
      this.Km.me(u.Ac(), r), this.Km.jc(r) || n.ps(this.Km);
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
    const n = this.sn(), a = n.Et();
    if (a.Gi()) return;
    const r = this.qv.N(), u = r.handleScroll, c = r.kineticScroll;
    if ((!u.pressedMouseMove || t.Zp) && (!u.horzTouchDrag && !u.vertTouchDrag || !t.Zp)) return;
    const d = this.Zm.Pn(), m = performance.now();
    if (this.Nm !== null || this.yw(t) || (this.Nm = { x: t.clientX, y: t.clientY, Sf: m, kw: t.localX, Pw: t.localY }), this.Nm !== null && !this.Fm && (this.Nm.x !== t.clientX || this.Nm.y !== t.clientY)) {
      if (t.Zp && c.touch || !t.Zp && c.mouse) {
        const v = a.fl();
        this.Km = new IC(0.2 / v, 7 / v, 0.997, 15 / v), this.Km.Fv(a.Ac(), this.Nm.Sf);
      } else this.Km = null;
      d.Gi() || n.Q_(this.Zm, d, t.localY), n.Fd(t.localX), this.Fm = !0;
    }
    this.Fm && (d.Gi() || n.tu(this.Zm, d, t.localY), n.Wd(t.localX), this.Km !== null && this.Km.Fv(a.Ac(), m));
  }
}
class _0 {
  constructor(t, n, a, r, u) {
    this.xt = !0, this.Qv = $t({ width: 0, height: 0 }), this.hm = () => this.km(3), this.om = t === "left", this.wd = a.Zd, this.yn = n, this.Tw = r, this.Rw = u, this.lv = document.createElement("div"), this.lv.style.width = "25px", this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.fm = ws(this.lv, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
  }
  m() {
    this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), _s(this.fm.canvasElement), this.fm.dispose();
  }
  uv() {
    return this.lv;
  }
  cv() {
    return this.Qv;
  }
  Cm(t) {
    fs(this.Qv, t) || (this.Qv = t, this.fm.resizeCanvasElement(t), this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.xt = !0);
  }
  km(t) {
    if (t < 3 && !this.xt || this.Qv.width === 0 || this.Qv.height === 0) return;
    this.xt = !1, this.fm.applySuggestedBitmapSize();
    const n = ys(this.fm, { colorSpace: this.yn.layout.colorSpace });
    n !== null && n.useBitmapCoordinateSpace(((a) => {
      this.Tm(a), this.Rm(a);
    }));
  }
  dv() {
    return this.fm.bitmapSize;
  }
  fv(t, n, a) {
    const r = this.dv();
    r.width > 0 && r.height > 0 && t.drawImage(this.fm.canvasElement, n, a);
  }
  Rm({ context: t, bitmapSize: n, horizontalPixelRatio: a, verticalPixelRatio: r }) {
    if (!this.Tw()) return;
    t.fillStyle = this.yn.timeScale.borderColor;
    const u = Math.floor(this.wd.N().S * a), c = Math.floor(this.wd.N().S * r), d = this.om ? n.width - u : 0;
    t.fillRect(d, 0, u, c);
  }
  Tm({ context: t, bitmapSize: n }) {
    cu(t, 0, 0, n.width, n.height, this.Rw());
  }
}
function sf(s) {
  return (t) => t.Xa?.(s) ?? [];
}
const eE = sf("normal"), iE = sf("top"), nE = sf("bottom");
class sE {
  constructor(t, n) {
    this.Dw = null, this.Iw = null, this.M = null, this.Vw = !1, this.Qv = $t({ width: 0, height: 0 }), this.Bw = new te(), this.im = new Po(5), this.rm = !1, this.hm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.lm = () => {
      this.rm || this.qv.Qt().mr();
    }, this.qv = t, this.xu = n, this.yn = t.N().layout, this.Hv = document.createElement("tr"), this.Ew = document.createElement("td"), this.Ew.style.padding = "0", this.Aw = document.createElement("td"), this.Aw.style.padding = "0", this.lv = document.createElement("td"), this.lv.style.height = "25px", this.lv.style.padding = "0", this.Lw = document.createElement("div"), this.Lw.style.width = "100%", this.Lw.style.height = "100%", this.Lw.style.position = "relative", this.Lw.style.overflow = "hidden", this.lv.appendChild(this.Lw), this.fm = ws(this.Lw, $t({ width: 16, height: 16 })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
    const a = this.fm.canvasElement;
    a.style.position = "absolute", a.style.zIndex = "1", a.style.left = "0", a.style.top = "0", this.pm = ws(this.Lw, $t({ width: 16, height: 16 })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
    const r = this.pm.canvasElement;
    r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0", this.Hv.appendChild(this.Ew), this.Hv.appendChild(this.lv), this.Hv.appendChild(this.Aw), this.zw(), this.qv.Qt().L_().i(this.zw.bind(this), this), this.tv = new pu(this.pm.canvasElement, this, { xp: () => !0, Cp: () => !this.qv.N().handleScroll.horzTouchDrag });
  }
  m() {
    this.tv.m(), this.Dw !== null && this.Dw.m(), this.Iw !== null && this.Iw.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), _s(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), _s(this.fm.canvasElement), this.fm.dispose();
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
    const n = this.qv.Qt();
    !n.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && n.zd(t.localX);
  }
  Ap(t) {
    this.zp(t);
  }
  Op() {
    const t = this.qv.Qt();
    !t.Et().Gi() && this.Vw && (this.Vw = !1, this.qv.N().handleScale.axisPressedMouseMove.time && t.$d());
  }
  Pp(t) {
    const n = this.qv.Qt();
    !n.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && n.Ud(t.localX);
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
  Ww(t, n, a) {
    fs(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.Bw.p(t)), this.Dw !== null && this.Dw.Cm($t({ width: n, height: t.height })), this.Iw !== null && this.Iw.Cm($t({ width: a, height: t.height }));
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
  fv(t, n, a, r) {
    const u = this.dv();
    if (u.width > 0 && u.height > 0 && (t.drawImage(this.fm.canvasElement, n, a), r)) {
      const c = this.pm.canvasElement;
      t.drawImage(c, n, a);
    }
  }
  km(t) {
    if (t === 0) return;
    const n = { colorSpace: this.yn.colorSpace };
    if (t !== 1) {
      this.fm.applySuggestedBitmapSize();
      const r = ys(this.fm, n);
      r !== null && (r.useBitmapCoordinateSpace(((u) => {
        this.Tm(u), this.Rm(u), this.jw(r, nE);
      })), this.Im(r), this.jw(r, eE)), this.Dw !== null && this.Dw.km(t), this.Iw !== null && this.Iw.km(t);
    }
    this.pm.applySuggestedBitmapSize();
    const a = ys(this.pm, n);
    a !== null && (a.useBitmapCoordinateSpace((({ context: r, bitmapSize: u }) => {
      r.clearRect(0, 0, u.width, u.height);
    })), this.qw([...this.qv.Qt().Jn(), this.qv.Qt().Rd()], a), this.jw(a, iE));
  }
  jw(t, n) {
    const a = this.qv.Qt().Jn();
    for (const r of a) jd(n, ((u) => Ed(u, t, !1, void 0)), r, void 0);
    for (const r of a) jd(n, ((u) => Qo(u, t, !1, void 0)), r, void 0);
  }
  Tm({ context: t, bitmapSize: n }) {
    cu(t, 0, 0, n.width, n.height, this.qv.Qt().ef());
  }
  Rm({ context: t, bitmapSize: n, verticalPixelRatio: a }) {
    if (this.qv.N().timeScale.borderVisible) {
      t.fillStyle = this.Yw();
      const r = Math.max(1, Math.floor(this.Uw().S * a));
      t.fillRect(0, 0, n.width, r);
    }
  }
  Im(t) {
    const n = this.qv.Qt().Et(), a = n.El();
    if (!a || a.length === 0) return;
    const r = this.xu.maxTickMarkWeight(a), u = this.Uw(), c = n.N();
    c.borderVisible && c.ticksVisible && t.useBitmapCoordinateSpace((({ context: d, horizontalPixelRatio: m, verticalPixelRatio: v }) => {
      d.strokeStyle = this.Yw(), d.fillStyle = this.Yw();
      const g = Math.max(1, Math.floor(m)), b = Math.floor(0.5 * m);
      d.beginPath();
      const x = Math.round(u.C * v);
      for (let S = a.length; S--; ) {
        const w = Math.round(a[S].coord * m);
        d.rect(w - b, 0, g, x);
      }
      d.fill();
    })), t.useMediaCoordinateSpace((({ context: d }) => {
      const m = u.S + u.C + u.A + u.k / 2;
      d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = this.H(), d.font = this.Sm();
      for (const v of a) if (v.weight < r) {
        const g = v.needAlignCoordinate ? this.Kw(d, v.coord, v.label) : v.coord;
        d.fillText(v.label, g, m);
      }
      this.qv.N().timeScale.allowBoldLabels && (d.font = this.Zw());
      for (const v of a) if (v.weight >= r) {
        const g = v.needAlignCoordinate ? this.Kw(d, v.coord, v.label) : v.coord;
        d.fillText(v.label, g, m);
      }
    }));
  }
  Kw(t, n, a) {
    const r = this.im.Ii(t, a), u = r / 2, c = Math.floor(n - u) + 0.5;
    return c < 0 ? n += Math.abs(0 - c) : c + r > this.Qv.width && (n -= Math.abs(this.Qv.width - (c + r))), n;
  }
  qw(t, n) {
    const a = this.Uw();
    for (const r of t) for (const u of r.dn()) u.Tt().st(n, a);
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
    return Fo(this.F(), this.yn.fontFamily);
  }
  Zw() {
    return Fo(this.F(), this.yn.fontFamily, "bold");
  }
  Uw() {
    this.M === null && (this.M = { S: 1, L: NaN, A: NaN, I: NaN, tn: NaN, C: 5, k: NaN, P: "", Qi: new Po(), $w: 0 });
    const t = this.M, n = this.Sm();
    if (t.P !== n) {
      const a = this.F();
      t.k = a, t.P = n, t.A = 3 * a / 12, t.I = 3 * a / 12, t.tn = 9 * a / 12, t.L = 0, t.$w = 4 * a / 12, t.Qi.Os();
    }
    return this.M;
  }
  Em(t) {
    this.lv.style.cursor = t === 1 ? "ew-resize" : "default";
  }
  zw() {
    const t = this.qv.Qt(), n = t.N();
    n.leftPriceScale.visible || this.Dw === null || (this.Ew.removeChild(this.Dw.uv()), this.Dw.m(), this.Dw = null), n.rightPriceScale.visible || this.Iw === null || (this.Aw.removeChild(this.Iw.uv()), this.Iw.m(), this.Iw = null);
    const a = { Zd: this.qv.Qt().Zd() }, r = () => n.leftPriceScale.borderVisible && t.Et().N().borderVisible, u = () => t.ef();
    n.leftPriceScale.visible && this.Dw === null && (this.Dw = new _0("left", n, a, r, u), this.Ew.appendChild(this.Dw.uv())), n.rightPriceScale.visible && this.Iw === null && (this.Iw = new _0("right", n, a, r, u), this.Aw.appendChild(this.Iw.uv()));
  }
}
const aE = !!ja && !!navigator.userAgentData && navigator.userAgentData.brands.some(((s) => s.brand.includes("Chromium"))) && !!ja && (navigator?.userAgentData?.platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
class lE {
  constructor(t, n, a) {
    var r;
    this.Gw = [], this.Xw = [], this.Jw = 0, this.ho = 0, this.C_ = 0, this.Qw = 0, this.tM = 0, this.iM = null, this.nM = !1, this.Wm = new te(), this.Hm = new te(), this.pd = new te(), this.sM = null, this.eM = null, this.jv = t, this.yn = n, this.xu = a, this.Hv = document.createElement("div"), this.Hv.classList.add("tv-lightweight-charts"), this.Hv.style.overflow = "hidden", this.Hv.style.direction = "ltr", this.Hv.style.width = "100%", this.Hv.style.height = "100%", (r = this.Hv).style.userSelect = "none", r.style.webkitUserSelect = "none", r.style.msUserSelect = "none", r.style.MozUserSelect = "none", r.style.webkitTapHighlightColor = "transparent", this.rM = document.createElement("table"), this.rM.setAttribute("cellspacing", "0"), this.Hv.appendChild(this.rM), this.hM = this.aM.bind(this), id(this.yn) && this.lM(!0), this.sn = new YC(this.md.bind(this), this.yn, a), this.Qt().Dd().i(this.oM.bind(this), this), this._M = new sE(this, this.xu), this.rM.appendChild(this._M.uv());
    const u = n.autoSize && this.uM();
    let c = this.yn.width, d = this.yn.height;
    if (u || c === 0 || d === 0) {
      const m = t.getBoundingClientRect();
      c = c || m.width, d = d || m.height;
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
  cM(t, n, a = !1) {
    if (this.ho === n && this.C_ === t) return;
    const r = (function(d) {
      const m = Math.floor(d.width), v = Math.floor(d.height);
      return $t({ width: m - m % 2, height: v - v % 2 });
    })($t({ width: t, height: n }));
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
    for (let n = 0; n < this.Gw.length; n++) this.Gw[n].km(t._s(n).rs);
    this.yn.timeScale.visible && this._M.km(t.ls());
  }
  vr(t) {
    const n = id(this.yn);
    this.sn.vr(t);
    const a = id(this.yn);
    a !== n && this.lM(a), t.layout?.panes && this.gM(), this.fM(), this.bM(t);
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
    const n = this.xM(null), a = document.createElement("canvas");
    a.width = n.width, a.height = n.height;
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
    return Ye(this.Gw[t]).cv();
  }
  gM() {
    this.Xw.forEach(((t) => {
      t.kt();
    }));
  }
  bM(t) {
    (t.autoSize !== void 0 || !this.sM || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.sM && this.uM(), t.autoSize === !1 && this.sM !== null && this.mM(), t.autoSize || t.width === void 0 && t.height === void 0 || this.cM(t.width || this.C_, t.height || this.ho));
  }
  xM(t, n) {
    let a = 0, r = 0;
    const u = this.Gw[0], c = (m, v) => {
      let g = 0;
      for (let b = 0; b < this.Gw.length; b++) {
        const x = this.Gw[b], S = W(m === "left" ? x.Sw() : x.xw()), w = S.dv();
        if (t !== null && S.fv(t, v, g, n), g += w.height, b < this.Gw.length - 1) {
          const M = this.Xw[b], N = M.dv();
          t !== null && M.fv(t, v, g), g += N.height;
        }
      }
    };
    this.yM() && (c("left", 0), a += W(u.Sw()).dv().width);
    for (let m = 0; m < this.Gw.length; m++) {
      const v = this.Gw[m], g = v.dv();
      if (t !== null && v.fv(t, a, r, n), r += g.height, m < this.Gw.length - 1) {
        const b = this.Xw[m], x = b.dv();
        t !== null && b.fv(t, a, r), r += x.height;
      }
    }
    a += u.dv().width, this.kM() && (c("right", a), a += W(u.xw()).dv().width);
    const d = (m, v, g) => {
      W(m === "left" ? this._M.Ow() : this._M.Nw()).fv(W(t), v, g);
    };
    if (this.yn.timeScale.visible) {
      const m = this._M.dv();
      if (t !== null) {
        let v = 0;
        this.yM() && (d("left", v, r), v = W(u.Sw()).dv().width), this._M.fv(t, v, r, n), v += m.width, this.kM() && d("right", v, r);
      }
      r += m.height;
    }
    return $t({ width: a, height: r });
  }
  DM() {
    let t = 0, n = 0, a = 0;
    for (const N of this.Gw) this.yM() && (n = Math.max(n, W(N.Sw()).bm(), this.yn.leftPriceScale.minimumWidth)), this.kM() && (a = Math.max(a, W(N.xw()).bm(), this.yn.rightPriceScale.minimumWidth)), t += N.z_();
    n = Cd(n), a = Cd(a);
    const r = this.C_, u = this.ho, c = Math.max(r - n - a, 0), d = 1 * this.Xw.length, m = this.yn.timeScale.visible;
    let v = m ? Math.max(this._M.Hw(), this.yn.timeScale.minimumHeight) : 0;
    var g;
    v = (g = v) + g % 2;
    const b = d + v, x = u < b ? 0 : u - b, S = x / t;
    let w = 0;
    const M = window.devicePixelRatio || 1;
    for (let N = 0; N < this.Gw.length; ++N) {
      const j = this.Gw[N];
      j.iw(this.sn.Zn()[N]);
      let T = 0, R = 0;
      R = N === this.Gw.length - 1 ? Math.ceil((x - w) * M) / M : Math.round(j.z_() * S * M) / M, T = Math.max(R, 2), w += T, j.Cm($t({ width: c, height: T })), this.yM() && j.mw(n, "left"), this.kM() && j.mw(a, "right"), j.Sv() && this.sn.Id(j.Sv(), T);
    }
    this._M.Ww($t({ width: m ? c : 0, height: v }), m ? n : 0, m ? a : 0), this.sn.N_(c), this.Qw !== n && (this.Qw = n), this.tM !== a && (this.tM = a);
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
    return aE ? 1 / window.devicePixelRatio : 1;
  }
  aM(t) {
    if (!(t.deltaX !== 0 && this.yn.handleScroll.mouseWheel || t.deltaY !== 0 && this.yn.handleScale.mouseWheel)) return;
    const n = this.IM(t), a = n * t.deltaX / 100, r = -n * t.deltaY / 100;
    if (t.cancelable && t.preventDefault(), r !== 0 && this.yn.handleScale.mouseWheel) {
      const u = Math.sign(r) * Math.min(1, Math.abs(r)), c = t.clientX - this.Hv.getBoundingClientRect().left;
      this.Qt().Od(c, u);
    }
    a !== 0 && this.yn.handleScroll.mouseWheel && this.Qt().Nd(-80 * a);
  }
  MM(t, n) {
    const a = t.ls();
    a === 3 && this.VM(), a !== 3 && a !== 2 || (this.BM(t), this.EM(t, n), this._M.kt(), this.Gw.forEach(((r) => {
      r.sw();
    })), this.iM?.ls() === 3 && (this.iM.Ss(t), this.VM(), this.BM(this.iM), this.EM(this.iM, n), t = this.iM, this.iM = null)), this.km(t);
  }
  EM(t, n) {
    for (const a of t.bs()) this.xs(a, n);
  }
  BM(t) {
    const n = this.sn.Zn();
    for (let a = 0; a < n.length; a++) t._s(a).hs && n[a].ru();
  }
  xs(t, n) {
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
        t.Wt.jc(n) || a.gs(t.Wt.qc(n));
    }
  }
  md(t) {
    this.iM !== null ? this.iM.Ss(t) : this.iM = t, this.nM || (this.nM = !0, this.Jw = window.requestAnimationFrame(((n) => {
      if (this.nM = !1, this.Jw = 0, this.iM !== null) {
        const a = this.iM;
        this.iM = null, this.MM(a, n);
        for (const r of a.bs()) if (r.ds === 5 && !r.Wt.jc(n)) {
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
    const t = this.sn.Zn(), n = t.length, a = this.Gw.length;
    for (let r = n; r < a; r++) {
      const u = Ye(this.Gw.pop());
      this.rM.removeChild(u.uv()), u.dw().u(this), u.fw().u(this), u.m();
      const c = this.Xw.pop();
      c !== void 0 && this.vM(c);
    }
    for (let r = a; r < n; r++) {
      const u = new nf(this, t[r]);
      if (u.dw().i(this.AM.bind(this, u), this), u.fw().i(this.LM.bind(this, u), this), this.Gw.push(u), r > 0) {
        const c = new JC(this, r - 1, r);
        this.Xw.push(c), this.rM.insertBefore(c.uv(), this._M.uv());
      }
      this.rM.insertBefore(u.uv(), this._M.uv());
    }
    for (let r = 0; r < n; r++) {
      const u = t[r], c = this.Gw[r];
      c.Sv() !== u ? c.iw(u) : c.tw();
    }
    this.fM(), this.DM();
  }
  zM(t, n, a, r) {
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
    const d = this.Qt().ou(), m = this.OM(r), v = (function(g, b) {
      const x = g !== null && g.lu instanceof mu ? g.lu : void 0, S = g?.wu?.te, w = b !== void 0 && b !== -1 ? b : void 0;
      return g === null || g.ee === void 0 ? { NM: x, FM: S } : { NM: x, FM: S, WM: { ds: g.ee, HM: (M = g.lu, N = g.ee, M instanceof _d ? "pane-primitive" : N === "marker" || N === "primitive" ? "series-primitive" : "series"), UM: ZC(g.ee, S), U_: x, $M: S, jM: w } };
      var M, N;
    })(d, m);
    return { Qr: c, $n: t ?? void 0, qM: n ?? void 0, jM: m !== -1 ? m : void 0, NM: v.NM, YM: u, FM: v.FM, WM: v.WM, KM: a ?? void 0 };
  }
  OM(t) {
    let n = -1;
    if (t) n = this.Gw.indexOf(t);
    else {
      const a = this.Qt().Rd().Kn();
      a !== null && (n = this.Qt().Zn().indexOf(a));
    }
    return n;
  }
  AM(t, n, a, r) {
    this.Wm.p((() => this.zM(n, a, r, t)));
  }
  LM(t, n, a, r) {
    this.Hm.p((() => this.zM(n, a, r, t)));
  }
  oM(t, n, a) {
    this.PM(this.Qt().ou()?.mu ?? null), this.pd.p((() => this.zM(t, n, a)));
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
      const n = t[t.length - 1];
      if (!n) return;
      const a = n.contentRect.width, r = n.contentRect.height;
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
function rE(s) {
  return s.open === void 0 && s.value === void 0;
}
function oE(s) {
  return (function(t) {
    return t.open !== void 0;
  })(s) || (function(t) {
    return t.value !== void 0;
  })(s);
}
function S0(s, t, n, a) {
  const r = n.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return n.color !== void 0 && (u.R = n.color), u;
}
function uE(s, t, n, a) {
  const r = n.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return n.lineColor !== void 0 && (u.vt = n.lineColor), n.topColor !== void 0 && (u.ah = n.topColor), n.bottomColor !== void 0 && (u.oh = n.bottomColor), u;
}
function cE(s, t, n, a) {
  const r = n.value, u = { $n: t, wt: s, Wt: [r, r, r, r], Qr: a };
  return n.topLineColor !== void 0 && (u._h = n.topLineColor), n.bottomLineColor !== void 0 && (u.uh = n.bottomLineColor), n.topFillColor1 !== void 0 && (u.dh = n.topFillColor1), n.topFillColor2 !== void 0 && (u.fh = n.topFillColor2), n.bottomFillColor1 !== void 0 && (u.ph = n.bottomFillColor1), n.bottomFillColor2 !== void 0 && (u.mh = n.bottomFillColor2), u;
}
function hE(s, t, n, a) {
  const r = { $n: t, wt: s, Wt: [n.open, n.high, n.low, n.close], Qr: a };
  return n.color !== void 0 && (r.R = n.color), r;
}
function dE(s, t, n, a) {
  const r = { $n: t, wt: s, Wt: [n.open, n.high, n.low, n.close], Qr: a };
  return n.color !== void 0 && (r.R = n.color), n.borderColor !== void 0 && (r.Ht = n.borderColor), n.wickColor !== void 0 && (r.hh = n.wickColor), r;
}
function fE(s, t, n, a, r) {
  const u = Ye(r)(n), c = Math.max(...u), d = Math.min(...u), m = u[u.length - 1], v = [m, c, d, m], { time: g, color: b, ...x } = n;
  return { $n: t, wt: s, Wt: v, Qr: a, ue: x, R: b };
}
function ma(s) {
  return s.Wt !== void 0;
}
function M0(s, t) {
  return t.customValues !== void 0 && (s.ZM = t.customValues), s;
}
function us(s) {
  return (t, n, a, r, u, c) => (function(d, m) {
    return m ? m(d) : rE(d);
  })(a, c) ? M0({ wt: t, $n: n, Qr: r }, a) : M0(s(t, n, a, r, u), a);
}
function N0(s) {
  return { Candlestick: us(dE), Bar: us(hE), Area: us(uE), Baseline: us(cE), Histogram: us(S0), Line: us(S0), Custom: us(fE) }[s];
}
function C0(s) {
  return { $n: 0, GM: /* @__PURE__ */ new Map(), za: s };
}
function E0(s, t) {
  if (s !== void 0 && s.length !== 0) return { XM: t.key(s[0].wt), JM: t.key(s[s.length - 1].wt) };
}
function j0(s) {
  let t;
  return s.forEach(((n) => {
    t === void 0 && (t = n.Qr);
  })), Ye(t);
}
class mE {
  constructor(t) {
    this.QM = /* @__PURE__ */ new Map(), this.tg = /* @__PURE__ */ new Map(), this.ig = /* @__PURE__ */ new Map(), this.ng = [], this.xu = t;
  }
  m() {
    this.QM.clear(), this.tg.clear(), this.ig.clear(), this.ng = [];
  }
  sg(t, n) {
    let a = this.QM.size !== 0, r = !1;
    const u = this.tg.get(t);
    if (u !== void 0) if (this.tg.size === 1) a = !1, r = !0, this.QM.clear();
    else for (const m of this.ng) m.pointData.GM.delete(t) && (r = !0);
    let c = [];
    if (n.length !== 0) {
      const m = n.map(((S) => S.time)), v = this.xu.createConverterToInternalObj(n), g = N0(t.bh()), b = t.ll(), x = t.ol();
      c = n.map(((S, w) => {
        const M = v(S.time), N = this.xu.key(M);
        let j = this.QM.get(N);
        j === void 0 && (j = C0(M), this.QM.set(N, j), r = !0);
        const T = g(M, j.$n, S, m[w], b, x);
        return j.GM.set(t, T), T;
      }));
    }
    a && this.eg(), this.rg(t, c);
    let d = -1;
    if (r) {
      const m = [];
      this.QM.forEach(((v) => {
        m.push({ timeWeight: 0, time: v.za, pointData: v, originalTime: j0(v.GM) });
      })), m.sort(((v, g) => this.xu.key(v.time) - this.xu.key(g.time))), d = this.hg(m);
    }
    return this.ag(t, d, (function(m, v, g) {
      const b = E0(m, g), x = E0(v, g);
      if (b !== void 0 && x !== void 0) return { lg: !1, Ia: b.JM >= x.JM && b.XM >= x.XM };
    })(this.tg.get(t), u, this.xu));
  }
  Jd(t) {
    return this.sg(t, []);
  }
  og(t, n, a) {
    if (a && t.Na()) throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
    const r = n;
    (function(j) {
      j.Qr === void 0 && (j.Qr = j.time);
    })(r), this.xu.preprocessData(n);
    const u = this.xu.createConverterToInternalObj([n])(n.time), c = this.ig.get(t);
    if (!a && c !== void 0 && this.xu.key(u) < this.xu.key(c)) throw new Error(`Cannot update oldest data, last time=${c}, new time=${u}`);
    let d = this.QM.get(this.xu.key(u));
    if (a && d === void 0) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
    const m = d === void 0;
    d === void 0 && (d = C0(u), this.QM.set(this.xu.key(u), d));
    const v = N0(t.bh()), g = t.ll(), b = t.ol(), x = v(u, d.$n, n, r.Qr, g, b), S = !a && !m && c !== void 0 && this.xu.key(u) === this.xu.key(c);
    d.GM.set(t, x), a ? this._g(t, x, d.$n) : S && t.Na() && ma(x) ? (t.Rr(x), this.ug(t, x)) : this.ug(t, x);
    const w = { Ia: ma(x), lg: a };
    if (!m) return this.ag(t, -1, w);
    const M = { timeWeight: 0, time: d.za, pointData: d, originalTime: j0(d.GM) }, N = xs(this.ng, this.xu.key(M.time), ((j, T) => this.xu.key(j.time) < T));
    this.ng.splice(N, 0, M);
    for (let j = N; j < this.ng.length; ++j) Ao(this.ng[j].pointData, j);
    return this.xu.fillWeightsForPoints(this.ng, N), this.ag(t, N, w);
  }
  cg(t, n) {
    const a = this.tg.get(t);
    if (a === void 0 || n <= 0) return [[], this.dg()];
    n = Math.min(n, a.length);
    const r = a.splice(-n).reverse();
    a.length === 0 ? this.ig.delete(t) : this.ig.set(t, a[a.length - 1].wt);
    for (const u of r) {
      const c = this.QM.get(this.xu.key(u.wt));
      if (c && (c.GM.delete(t), c.GM.size === 0)) {
        this.QM.delete(this.xu.key(c.za)), this.ng.splice(c.$n, 1);
        for (let d = c.$n; d < this.ng.length; ++d) Ao(this.ng[d].pointData, d);
      }
    }
    return [r, this.ag(t, this.ng.length - 1, { lg: !1, Ia: !1 })];
  }
  ug(t, n) {
    let a = this.tg.get(t);
    a === void 0 && (a = [], this.tg.set(t, a));
    const r = a.length !== 0 ? a[a.length - 1] : null;
    r === null || this.xu.key(n.wt) > this.xu.key(r.wt) ? ma(n) && a.push(n) : ma(n) ? a[a.length - 1] = n : a.splice(-1, 1), this.ig.set(t, n.wt);
  }
  _g(t, n, a) {
    const r = this.tg.get(t);
    if (r === void 0) return;
    const u = xs(r, a, ((c, d) => c.$n < d));
    ma(n) ? r[u] = n : r.splice(u, 1);
  }
  rg(t, n) {
    n.length !== 0 ? (this.tg.set(t, n.filter(ma)), this.ig.set(t, n[n.length - 1].wt)) : (this.tg.delete(t), this.ig.delete(t));
  }
  eg() {
    for (const t of this.ng) t.pointData.GM.size === 0 && this.QM.delete(this.xu.key(t.time));
  }
  hg(t) {
    let n = -1;
    for (let a = 0; a < this.ng.length && a < t.length; ++a) {
      const r = this.ng[a], u = t[a];
      if (this.xu.key(r.time) !== this.xu.key(u.time)) {
        n = a;
        break;
      }
      u.timeWeight = r.timeWeight, Ao(u.pointData, a);
    }
    if (n === -1 && this.ng.length !== t.length && (n = Math.min(this.ng.length, t.length)), n === -1) return -1;
    for (let a = n; a < t.length; ++a) Ao(t[a].pointData, a);
    return this.xu.fillWeightsForPoints(t, n), this.ng = t, n;
  }
  fg() {
    if (this.tg.size === 0) return null;
    let t = 0;
    return this.tg.forEach(((n) => {
      n.length !== 0 && (t = Math.max(t, n[n.length - 1].$n));
    })), t;
  }
  ag(t, n, a) {
    const r = this.dg();
    if (n !== -1) this.tg.forEach(((u, c) => {
      r.U_.set(c, { ue: u, pg: c === t ? a : void 0 });
    })), this.tg.has(t) || r.U_.set(t, { ue: [], pg: a }), r.Et.vg = this.ng, r.Et.mg = n;
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
function Ao(s, t) {
  s.$n = t, s.GM.forEach(((n) => {
    n.$n = t;
  }));
}
function pE(s, t) {
  return s._t < t;
}
function vE(s, t) {
  return t < s._t;
}
function kd(s, t, n, a) {
  return xs(s, t, pE, n, a);
}
function zd(s, t, n, a) {
  return tf(s, t, vE, n, a);
}
function $o(s, t, n) {
  return { ne: s, se: t, ee: n };
}
function k0(s, t, n, a) {
  return s >= t - a && s <= n + a;
}
function kl(s, t, n, a, r, u) {
  const c = r - n, d = u - a;
  if (c === 0 && d === 0) return Math.hypot(s - n, t - a);
  const m = ((s - n) * c + (t - a) * d) / (c * c + d * d), v = Math.max(0, Math.min(1, m)), g = n + c * v, b = a + d * v;
  return Math.hypot(s - g, t - b);
}
const nd = [0, 0];
function gE(s, t, n) {
  return t === void 0 || t.wt !== s.wt - 1 ? s._t - n / 2 : (t._t + s._t) / 2;
}
function bE(s, t, n) {
  return t === void 0 || t.wt !== s.wt + 1 ? s._t + n / 2 : (s._t + t._t) / 2;
}
function yE(s, t, n, a, r, u, c) {
  if (t === null || t.from >= t.to || s.length === 0) return null;
  const d = r / 2 + u, m = kd(s, n - d, t.from, t.to), v = zd(s, n + d, m, t.to);
  if (m >= v) return null;
  let g = Number.POSITIVE_INFINITY;
  for (let b = m; b < v; b++) {
    const x = s[b], S = b > t.from ? s[b - 1] : void 0, w = b < t.to - 1 ? s[b + 1] : void 0, M = gE(x, S, r) - u, N = bE(x, w, r) + u;
    if (n < M || n > N) continue;
    c(x, nd);
    const j = nd[0], T = nd[1], R = Math.min(j, T), D = Math.max(j, T), $ = R - u, G = D + u;
    if (a >= R && a <= D) g = Math.min(g, 0);
    else if (a >= $ && a <= G) {
      const A = Math.min(Math.abs(a - R), Math.abs(D - a));
      g = Math.min(g, A);
    }
  }
  return Number.isFinite(g) ? $o(g, 0, "series-range") : null;
}
function xE(s, t) {
  return s.wt < t;
}
function wE(s, t) {
  return t < s.wt;
}
function _E(s, t, n) {
  const a = t.Oa(), r = t.bi(), u = xs(s, a, xE), c = tf(s, r, wE);
  if (!n) return { from: u, to: c };
  let d = u, m = c;
  return u > 0 && u < s.length && s[u].wt >= a && (d = u - 1), c > 0 && c < s.length && s[c - 1].wt <= r && (m = c + 1), { from: d, to: m };
}
class v1 {
  constructor(t, n, a) {
    this.wg = !0, this.Mg = !0, this.gg = !0, this.bg = [], this.Sg = null, this.xg = -1, this.ae = t, this.le = n, this.Cg = a;
  }
  kt(t) {
    this.wg = !0, t === "data" && (this.Mg = !0), t === "options" && (this.gg = !0);
  }
  Tt() {
    return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.kg) : null;
  }
  Qs(t, n) {
    return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.Pg(t, n)) : null;
  }
  Pg(t, n) {
    return null;
  }
  Tg() {
    this.bg = this.bg.map(((t) => ({ ...t, ...this.ae.Sa().Sh(t.wt) })));
  }
  Rg() {
    this.Sg = null;
  }
  yg() {
    const t = this.le.Et(), n = t.N().enableConflation ? t.Qc() : 0;
    n !== this.xg && (this.Mg = !0, this.xg = n), this.Mg && (this.Dg(), this.Mg = !1), this.gg && (this.Tg(), this.gg = !1), this.wg && (this.Ig(), this.wg = !1);
  }
  Ig() {
    const t = this.ae.Ft(), n = this.le.Et();
    if (this.Rg(), n.Gi() || t.Gi()) return;
    const a = n.Ee();
    if (a === null || this.ae.Un().Th() === 0) return;
    const r = this.ae.Lt();
    r !== null && (this.Sg = _E(this.bg, a, this.Cg), this.Vg(t, n, r.Wt), this.Bg());
  }
}
class SE {
  constructor(t, n) {
    this.Eg = t, this.Ki = n;
  }
  st(t, n, a) {
    this.Eg.draw(t, this.Ki, n, a);
  }
}
function ME(s) {
  switch (s) {
    case "point":
      return 2;
    case "range":
      return 0;
    default:
      return 1;
  }
}
class NE extends v1 {
  constructor(t, n, a) {
    super(t, n, !1), this.Yh = a, this.Eg = this.Yh.renderer(), this.kg = new SE(this.Eg, ((r) => this.Ag(r)));
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
  Pg(t, n) {
    const a = this.Eg.hitTest?.(t, n, ((c) => this.Ag(c)));
    if (a != null) return { ne: (r = a).distance, se: ME(r.type), ee: "custom", mu: r.cursorStyle, te: r.objectId, ie: r.hitTestData };
    var r;
    const u = yE(this.bg, this.Sg, t, n, this.le.Et().fl(), this.ae.N().hitTestTolerance, ((c, d) => {
      const m = c.Lg;
      let v = NaN, g = NaN;
      if (m !== void 0 && !this.Yh.isWhitespace(m)) for (const b of this.Yh.priceValueBuilder(m)) {
        const x = this.Ag(b);
        x !== null && (v = Number.isNaN(v) ? x : Math.min(v, x), g = Number.isNaN(g) ? x : Math.max(g, x));
      }
      d[0] = v, d[1] = g;
    }));
    return u === null ? null : { ...u, ee: "custom" };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((n) => ({ wt: n.$n, _t: NaN, ...t.Sh(n.$n), Lg: n.ue })));
  }
  Vg(t, n) {
    n.Tc(this.bg, xd(this.Sg));
  }
  Bg() {
    this.Yh.update({ bars: this.bg.map(CE), barSpacing: this.le.Et().fl(), visibleRange: this.Sg, conflationFactor: this.le.Et().Qc() }, this.ae.N());
  }
  Ag(t) {
    const n = this.ae.Lt();
    return n === null ? null : this.ae.Ft().Nt(t, n.Wt);
  }
}
function CE(s) {
  return { x: s._t, time: s.wt, originalData: s.Lg, barColor: s.sh };
}
const EE = { color: "#2196f3" }, jE = (s, t, n) => {
  const a = Un(n);
  return new NE(s, t, a);
};
function af(s) {
  const t = { value: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function z0(s) {
  const t = af(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function kE(s) {
  const t = af(s);
  return s.vt !== void 0 && (t.lineColor = s.vt), s.ah !== void 0 && (t.topColor = s.ah), s.oh !== void 0 && (t.bottomColor = s.oh), t;
}
function zE(s) {
  const t = af(s);
  return s._h !== void 0 && (t.topLineColor = s._h), s.uh !== void 0 && (t.bottomLineColor = s.uh), s.dh !== void 0 && (t.topFillColor1 = s.dh), s.fh !== void 0 && (t.topFillColor2 = s.fh), s.ph !== void 0 && (t.bottomFillColor1 = s.ph), s.mh !== void 0 && (t.bottomFillColor2 = s.mh), t;
}
function g1(s) {
  const t = { open: s.Wt[0], high: s.Wt[1], low: s.Wt[2], close: s.Wt[3], time: s.Qr };
  return s.ZM !== void 0 && (t.customValues = s.ZM), t;
}
function TE(s) {
  const t = g1(s);
  return s.R !== void 0 && (t.color = s.R), t;
}
function OE(s) {
  const t = g1(s), { R: n, Ht: a, hh: r } = s;
  return n !== void 0 && (t.color = n), a !== void 0 && (t.borderColor = a), r !== void 0 && (t.wickColor = r), t;
}
function Yo(s) {
  return { Area: kE, Line: z0, Baseline: zE, Histogram: z0, Bar: TE, Candlestick: OE, Custom: DE }[s];
}
function DE(s) {
  const t = s.Qr;
  return { ...s.ue, time: t };
}
const AE = { vertLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, horzLine: { color: "#9598A1", width: 1, style: 3, visible: !0, labelVisible: !0, labelBackgroundColor: "#131722" }, mode: 1, doNotSnapToHiddenSeriesIndices: !1 }, RE = { vertLines: { color: "#D6DCDE", style: 0, visible: !0 }, horzLines: { color: "#D6DCDE", style: 0, visible: !0 } }, LE = { background: { type: "solid", color: "#FFFFFF" }, textColor: "#191919", fontSize: 12, fontFamily: Pb, panes: { enableResize: !0, separatorColor: "#E0E3EB", separatorHoverColor: "rgba(178, 181, 189, 0.2)" }, attributionLogo: !0, colorSpace: "srgb", colorParsers: [] }, sd = { autoScale: !0, mode: 0, invertScale: !1, alignLabels: !0, borderVisible: !0, borderColor: "#2B2B43", entireTextOnly: !1, visible: !1, ticksVisible: !1, scaleMargins: { bottom: 0.1, top: 0.2 }, minimumWidth: 0, ensureEdgeTickMarksVisible: !1, tickMarkDensity: 2.5 }, BE = { rightOffset: 0, barSpacing: 6, minBarSpacing: 0.5, maxBarSpacing: 0, fixLeftEdge: !1, fixRightEdge: !1, lockVisibleTimeRangeOnResize: !1, rightBarStaysOnScroll: !1, borderVisible: !0, borderColor: "#2B2B43", visible: !0, timeVisible: !1, secondsVisible: !0, shiftVisibleRangeOnNewBar: !0, allowShiftVisibleRangeOnWhitespaceReplacement: !1, ticksVisible: !1, uniformDistribution: !1, minimumHeight: 0, allowBoldLabels: !0, ignoreWhitespaceIndices: !1, enableConflation: !1, conflationThresholdFactor: 1, precomputeConflationOnInit: !1, precomputeConflationPriority: "background" };
function T0() {
  return { addDefaultPane: !0, hoveredSeriesOnTop: !0, width: 0, height: 0, autoSize: !1, layout: LE, crosshair: AE, grid: RE, overlayPriceScales: { ...sd }, leftPriceScale: { ...sd, visible: !1 }, rightPriceScale: { ...sd, visible: !0 }, defaultVisiblePriceScaleId: "right", timeScale: BE, localization: { locale: ja ? navigator.language : "", dateFormat: "dd MMM 'yy" }, handleScroll: { mouseWheel: !0, pressedMouseMove: !0, horzTouchDrag: !0, vertTouchDrag: !0 }, handleScale: { axisPressedMouseMove: { time: !0, price: !0 }, axisDoubleClickReset: { time: !0, price: !0 }, mouseWheel: !0, pinch: !0 }, kineticScroll: { mouse: !1, touch: !0 }, trackingMode: { exitMode: 1 } };
}
class b1 {
  constructor(t, n, a) {
    this.sv = t, this.zg = n, this.Og = a ?? 0;
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
    this.setAutoScale(!1), this.Ki().qo(new je(t.from, t.to));
  }
  getVisibleRange() {
    let t, n, a = this.Ki().ar();
    if (a === null) return null;
    if (this.Ki().so()) {
      const r = this.Ki().M_(), u = f1(r);
      a = ba(a, this.Ki().ro()), t = Number((Math.round(a.Je() / r) * r).toFixed(u)), n = Number((Math.round(a.Qe() / r) * r).toFixed(u));
    } else t = a.Je(), n = a.Qe();
    return { from: t, to: n };
  }
  setAutoScale(t) {
    this.applyOptions({ autoScale: t });
  }
  Ki() {
    return W(this.sv.Qt().Td(this.zg, this.Og)).Ft;
  }
}
class UE {
  constructor(t, n, a, r) {
    this.sv = t, this.yt = a, this.Ng = n, this.Fg = r;
  }
  getHeight() {
    return this.yt.$t();
  }
  setHeight(t) {
    const n = this.sv.Qt(), a = n.hf(this.yt);
    n.Bd(a, t);
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
    const n = this.paneIndex();
    n !== t && (we(t >= 0 && t < this.sv.rv().length, "Invalid pane index"), this.sv.Qt().Ad(n, t));
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
    return new b1(this.sv, t, this.paneIndex());
  }
  setPreserveEmptyPane(t) {
    this.yt.W_(t);
  }
  preserveEmptyPane() {
    return this.yt.H_();
  }
  addCustomSeries(t, n = {}, a = 0) {
    return this.Fg.addCustomSeries(t, n, a);
  }
  addSeries(t, n = {}) {
    return this.Fg.addSeries(t, n, this.paneIndex());
  }
}
const HE = { color: "#FF0000", price: 0, lineStyle: 2, lineWidth: 1, lineVisible: !0, axisLabelVisible: !0, title: "", axisLabelColor: "", axisLabelTextColor: "" };
class O0 {
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
class qE {
  constructor(t, n, a, r, u, c) {
    this.Hg = new te(), this.ae = t, this.Ug = n, this.$g = a, this.xu = u, this.Fg = r, this.jg = c;
  }
  m() {
    this.Hg.m();
  }
  priceFormatter() {
    return this.ae.tl();
  }
  priceToCoordinate(t) {
    const n = this.ae.Lt();
    return n === null ? null : this.ae.Ft().Nt(t, n.Wt);
  }
  coordinateToPrice(t) {
    const n = this.ae.Lt();
    return n === null ? null : this.ae.Ft().Tn(t, n.Wt);
  }
  barsInLogicalRange(t) {
    if (t === null) return null;
    const n = new wa(new Bl(t.from, t.to)).Fu(), a = this.ae.Un();
    if (a.Gi()) return null;
    const r = a.Hn(n.Oa(), 1), u = a.Hn(n.bi(), -1), c = W(a.Rh()), d = W(a.Qn());
    if (r !== null && u !== null && r.$n > u.$n) return { barsBefore: t.from - c, barsAfter: d - t.to };
    const m = { barsBefore: r === null || r.$n === c ? t.from - c : r.$n - c, barsAfter: u === null || u.$n === d ? d - t.to : d - u.$n };
    return r !== null && u !== null && (m.from = r.Qr, m.to = u.Qr), m;
  }
  setData(t) {
    this.xu, this.ae.bh(), this.Ug.qg(this.ae, t), this.Yg("full");
  }
  update(t, n = !1) {
    this.ae.bh(), this.Ug.Kg(this.ae, t, n), this.Yg("update");
  }
  pop(t = 1) {
    const n = this.Ug.Zg(this.ae, t);
    n.length !== 0 && this.Yg("update");
    const a = Yo(this.seriesType());
    return n.map(((r) => a(r)));
  }
  dataByIndex(t, n) {
    const a = this.ae.Un().Hn(t, n);
    return a === null ? null : Yo(this.seriesType())(a);
  }
  data() {
    const t = Yo(this.seriesType());
    return this.ae.Un().Bh().map(((n) => t(n)));
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
    return on(this.ae.N());
  }
  priceScale() {
    return this.$g.priceScale(this.ae.Ft().cl(), this.getPane().paneIndex());
  }
  createPriceLine(t) {
    const n = Pe(on(HE), t), a = this.ae.Ba(n);
    return new O0(a);
  }
  removePriceLine(t) {
    this.ae.Ea(t.Wg());
  }
  priceLines() {
    return this.ae.Aa().map(((t) => new O0(t)));
  }
  seriesType() {
    return this.ae.bh();
  }
  lastValueData(t) {
    const n = this.ae.Ae(t);
    return n.Le ? { noData: !0 } : { noData: !1, price: n.Mt, color: n.R };
  }
  attachPrimitive(t) {
    this.ae.hl(t), t.attached && t.attached({ chart: this.Fg, series: this, requestUpdate: () => this.ae.Qt().Pa(), horzScaleBehavior: this.xu });
  }
  detachPrimitive(t) {
    this.ae.al(t), t.detached && t.detached(), this.ae.Qt().Pa();
  }
  getPane() {
    const t = this.ae, n = W(this.ae.Qt().Ks(t));
    return this.jg(n);
  }
  moveToPane(t) {
    this.ae.Qt().nf(this.ae, t);
  }
  seriesOrder() {
    const t = this.ae.Qt().Ks(this.ae);
    return t === null ? -1 : t.U_().indexOf(this.ae);
  }
  setSeriesOrder(t) {
    const n = this.ae.Qt().Ks(this.ae);
    n !== null && n.du(this.ae, t);
  }
  Yg(t) {
    this.Hg.v() && this.Hg.p(t);
  }
}
class QE {
  constructor(t, n, a) {
    this.Gg = new te(), this.Gu = new te(), this.Bw = new te(), this.sn = t, this.ia = t.Et(), this._M = n, this.ia.Yc().i(this.Xg.bind(this)), this.ia.Kc().i(this.Jg.bind(this)), this._M.Fw().i(this.Qg.bind(this)), this.xu = a;
  }
  m() {
    this.ia.Yc().u(this), this.ia.Kc().u(this), this._M.Fw().u(this), this.Gg.m(), this.Gu.m(), this.Bw.m();
  }
  scrollPosition() {
    return this.ia.Ac();
  }
  scrollToPosition(t, n) {
    n ? this.ia.$c(t, 1e3) : this.sn.gs(t);
  }
  scrollToRealTime() {
    this.ia.Uc();
  }
  getVisibleRange() {
    const t = this.ia.gc();
    return t === null ? null : { from: t.from.originalTime, to: t.to.originalTime };
  }
  setVisibleRange(t) {
    const n = { from: this.xu.convertHorzItemToInternal(t.from), to: this.xu.convertHorzItemToInternal(t.to) }, a = this.ia.Cc(n);
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
    const n = this.sn.Et();
    return n.Gi() ? null : n.jt(t);
  }
  coordinateToLogical(t) {
    return this.ia.Gi() ? null : this.ia.Rc(t);
  }
  timeToIndex(t, n) {
    const a = this.xu.convertHorzItemToInternal(t);
    return this.ia.vc(a, n);
  }
  timeToCoordinate(t) {
    const n = this.timeToIndex(t, !1);
    return n === null ? null : this.ia.jt(n);
  }
  coordinateToTime(t) {
    const n = this.sn.Et(), a = n.Rc(t), r = n.en(a);
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
    return { ...on(this.ia.N()), barSpacing: this.ia.fl() };
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
function D0(s) {
  return (function(t) {
    if (Eo(t.handleScale)) {
      const a = t.handleScale;
      t.handleScale = { axisDoubleClickReset: { time: a, price: a }, axisPressedMouseMove: { time: a, price: a }, mouseWheel: a, pinch: a };
    } else if (t.handleScale !== void 0) {
      const { axisPressedMouseMove: a, axisDoubleClickReset: r } = t.handleScale;
      Eo(a) && (t.handleScale.axisPressedMouseMove = { time: a, price: a }), Eo(r) && (t.handleScale.axisDoubleClickReset = { time: r, price: r });
    }
    const n = t.handleScroll;
    Eo(n) && (t.handleScroll = { horzTouchDrag: n, vertTouchDrag: n, mouseWheel: n, pressedMouseMove: n });
  })(s), s;
}
class $E {
  constructor(t, n, a) {
    this.tb = /* @__PURE__ */ new Map(), this.ib = /* @__PURE__ */ new Map(), this.nb = new te(), this.sb = new te(), this.eb = new te(), this.od = /* @__PURE__ */ new WeakMap(), this.rb = new mE(n);
    const r = a === void 0 ? on(T0()) : Pe(on(T0()), D0(a));
    this.hb = n, this.sv = new lE(t, r, n), this.sv.dw().i(((c) => {
      this.nb.v() && this.nb.p(this.ab(c()));
    }), this), this.sv.fw().i(((c) => {
      this.sb.v() && this.sb.p(this.ab(c()));
    }), this), this.sv.Dd().i(((c) => {
      this.eb.v() && this.eb.p(this.ab(c()));
    }), this);
    const u = this.sv.Qt();
    this.lb = new QE(u, this.sv.pM(), this.hb);
  }
  remove() {
    this.sv.dw().u(this), this.sv.fw().u(this), this.sv.Dd().u(this), this.lb.m(), this.sv.m(), this.tb.clear(), this.ib.clear(), this.nb.m(), this.sb.m(), this.eb.m(), this.rb.m();
  }
  resize(t, n, a) {
    this.autoSizeActive() || this.sv.cM(t, n, a);
  }
  addCustomSeries(t, n = {}, a = 0) {
    const r = ((u) => ({ type: "Custom", isBuiltIn: !1, defaultOptions: { ...EE, ...u.defaultOptions() }, ob: jE, _b: u }))(Un(t));
    return this.ub(r, n, a);
  }
  addSeries(t, n = {}, a = 0) {
    return this.ub(t, n, a);
  }
  removeSeries(t) {
    const n = Ye(this.tb.get(t)), a = this.rb.Jd(n);
    this.sv.Qt().Jd(n), this.cb(a), this.tb.delete(t), this.ib.delete(n);
  }
  qg(t, n) {
    this.cb(this.rb.sg(t, n));
  }
  Kg(t, n, a) {
    this.cb(this.rb.og(t, n, a));
  }
  Zg(t, n) {
    const [a, r] = this.rb.cg(t, n);
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
  priceScale(t, n = 0) {
    return new b1(this.sv, t, n);
  }
  timeScale() {
    return this.lb;
  }
  applyOptions(t) {
    this.sv.vr(D0(t));
  }
  options() {
    return this.sv.N();
  }
  takeScreenshot(t = !1, n = !1) {
    let a, r;
    try {
      n || (a = this.sv.Qt().N().crosshair.mode, this.sv.vr({ crosshair: { mode: 2 } })), r = this.sv.SM(t);
    } finally {
      n || a === void 0 || this.sv.Qt().vr({ crosshair: { mode: a } });
    }
    return r;
  }
  addPane(t = !1) {
    const n = this.sv.Qt().af();
    return n.W_(t), this.fb(n);
  }
  removePane(t) {
    this.sv.Qt().Vd(t);
  }
  swapPanes(t, n) {
    this.sv.Qt().Ed(t, n);
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
    const n = this.sv.RM(t);
    return { height: n.height, width: n.width };
  }
  setCrosshairPosition(t, n, a) {
    const r = this.tb.get(a);
    if (r === void 0) return;
    const u = this.sv.Qt().Ks(r);
    u !== null && this.sv.Qt().qd(t, n, u);
  }
  clearCrosshairPosition() {
    this.sv.Qt().Yd(!0);
  }
  horzBehaviour() {
    return this.hb;
  }
  ub(t, n = {}, a = 0) {
    we(t.ob !== void 0), (function(m) {
      if (m === void 0 || m.type === "custom") return;
      const v = m;
      v.minMove !== void 0 && v.precision === void 0 && (v.precision = f1(v.minMove));
    })(n.priceFormat), t.type === "Candlestick" && (function(m) {
      m.borderColor !== void 0 && (m.borderUpColor = m.borderColor, m.borderDownColor = m.borderColor), m.wickColor !== void 0 && (m.wickUpColor = m.wickColor, m.wickDownColor = m.wickColor);
    })(n);
    const r = Pe(on(Ib), on(t.defaultOptions), n), u = t.ob, c = new mu(this.sv.Qt(), t.type, r, u, t._b);
    this.sv.Qt().Gd(c, a);
    const d = new qE(c, this, this, this, this.hb, ((m) => this.fb(m)));
    return this.tb.set(d, c), this.ib.set(c, d), d;
  }
  cb(t) {
    const n = this.sv.Qt();
    n.Kd(t.Et.Pc, t.Et.vg, t.Et.mg), t.U_.forEach(((a, r) => r.ht(a.ue, a.pg))), n.Et()._c(), n.Bc();
  }
  pb(t) {
    return Ye(this.ib.get(t));
  }
  mb(t) {
    return t !== void 0 && this.ib.has(t) ? this.pb(t) : void 0;
  }
  ab(t) {
    const n = /* @__PURE__ */ new Map();
    t.YM.forEach(((u, c) => {
      const d = c.bh(), m = Yo(d)(u);
      if (d !== "Custom") we(oE(m));
      else {
        const v = c.ol();
        we(!v || v(m) === !1);
      }
      n.set(this.pb(c), m);
    }));
    const a = this.mb(t.NM), r = t.WM === void 0 ? void 0 : { type: t.WM.ds, sourceKind: t.WM.HM, objectKind: t.WM.UM, series: this.mb(t.WM.U_), objectId: t.WM.$M, paneIndex: t.WM.jM };
    return { time: t.Qr, logical: t.$n, point: t.qM, paneIndex: t.jM, hoveredInfo: r, hoveredSeries: a, hoveredObjectId: t.FM, seriesData: n, sourceEvent: t.KM };
  }
  fb(t) {
    let n = this.od.get(t);
    return n || (n = new UE(this.sv, ((a) => this.pb(a)), t, this), this.od.set(t, n)), n;
  }
}
function YE(s) {
  if (lr(s)) {
    const t = document.getElementById(s);
    return we(t !== null, `Cannot find element in DOM with id=${s}`), t;
  }
  return s;
}
function VE(s, t, n) {
  const a = YE(s), r = new $E(a, t, n);
  return t.setOptions(r.options()), r;
}
function GE(s, t) {
  return VE(s, new p0(), p0.yf(t));
}
function El(s, t, n, a) {
  return Math.hypot(n - s, a - t);
}
function y1(s, t, n, a, r, u, c, d = 0) {
  if (t.length === 0 || a.from >= t.length || a.to <= 0) return;
  const { context: m, horizontalPixelRatio: v, verticalPixelRatio: g } = s, b = t[a.from];
  let x = u(s, b), S = b;
  if (a.to - a.from < 2) {
    const w = r / 2;
    m.beginPath();
    const M = { _t: b._t - w, ut: b.ut }, N = { _t: b._t + w, ut: b.ut };
    m.moveTo(M._t * v, M.ut * g), m.lineTo(N._t * v, N.ut * g), c(s, x, M, N);
  } else {
    const w = d > 0;
    let M = 0;
    const N = (T, R) => {
      if (c(s, x, S, R), m.beginPath(), x = T, S = R, w) {
        const D = M % d;
        m.lineDashOffset = D, M = D;
      }
    };
    let j = S;
    m.beginPath(), m.moveTo(b._t * v, b.ut * g);
    for (let T = a.from + 1; T < a.to; ++T) {
      j = t[T];
      const R = j._t * v, D = j.ut * g, $ = u(s, j);
      switch (n) {
        case 0:
          if (m.lineTo(R, D), w) {
            const G = t[T - 1], A = G._t * v, X = G.ut * g;
            M += El(A, X, R, D);
          }
          break;
        case 1: {
          const G = t[T - 1], A = G.ut * g;
          m.lineTo(R, A), w && (M += Math.abs(j._t - G._t) * v), $ !== x && (N($, j), m.lineTo(R, A)), m.lineTo(R, D), w && (M += Math.abs(j.ut - G.ut) * g);
          break;
        }
        case 2: {
          const [G, A] = lf(t, T - 1, T), X = G._t * v, F = G.ut * g, I = A._t * v, it = A.ut * g;
          if (m.bezierCurveTo(X, F, I, it, R, D), w) {
            const nt = t[T - 1], yt = nt._t * v, bt = nt.ut * g, Bt = El(yt, bt, R, D), B = El(yt, bt, X, F) + El(X, F, I, it) + El(I, it, R, D);
            M += (Bt + B) / 2;
          }
          break;
        }
      }
      n !== 1 && $ !== x && (N($, j), m.moveTo(R, D));
    }
    (S !== j || S === j && n === 1) && c(s, x, S, j), w && (m.lineDashOffset = 0);
  }
}
const A0 = 6;
function ad(s, t) {
  return { _t: s._t - t._t, ut: s.ut - t.ut };
}
function R0(s, t) {
  return { _t: s._t / t, ut: s.ut / t };
}
function lf(s, t, n) {
  const a = Math.max(0, t - 1), r = Math.min(s.length - 1, n + 1);
  var u, c;
  return [(u = s[t], c = R0(ad(s[n], s[a]), A0), { _t: u._t + c._t, ut: u.ut + c.ut }), ad(s[n], R0(ad(s[r], s[t]), A0))];
}
function KE(s, t) {
  const n = s.context;
  n.strokeStyle = t, n.stroke();
}
class XE extends Ms {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: n, lt: a, wb: r, Mb: u, ct: c, Zt: d, gb: m } = this.rt;
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineWidth = c * t.verticalPixelRatio;
    const g = Qn(v, d);
    v.lineJoin = "round";
    const b = this.bb.bind(this), x = (function(S) {
      return S.reduce(((w, M) => w + M), 0);
    })(g);
    u !== void 0 && y1(t, n, u, a, r, b, KE, x), m && (function(S, w, M, N, j) {
      if (N.to - N.from <= 0) return;
      const { horizontalPixelRatio: T, verticalPixelRatio: R, context: D } = S;
      let $ = null;
      const G = Math.max(1, Math.floor(T)) % 2 / 2, A = M * R + G;
      for (let X = N.to - 1; X >= N.from; --X) {
        const F = w[X];
        if (F) {
          const I = j(S, F);
          I !== $ && ($ !== null && D.fill(), D.beginPath(), D.fillStyle = I, $ = I);
          const it = Math.round(F._t * T) + G, nt = F.ut * R;
          D.moveTo(it, nt), D.arc(it, nt, A, 0, 2 * Math.PI);
        }
      }
      D.fill();
    })(t, n, m, a, b);
  }
}
class x1 extends XE {
  bb(t, n) {
    return n.vt;
  }
}
function L0(s, t, n, a, r) {
  const u = 1 - r;
  return u * u * u * s + 3 * u * u * r * t + 3 * u * r * r * n + r * r * r * a;
}
function ZE(s, t, n, a, r) {
  if (n === 2) {
    const [u, c] = lf(a, r - 1, r);
    return [Math.min(s._t, t._t, u._t, c._t), Math.max(s._t, t._t, u._t, c._t)];
  }
  return [Math.min(s._t, t._t), Math.max(s._t, t._t)];
}
function WE(s, t, n, a, r, u, c, d) {
  switch (r) {
    case 1: {
      const m = kl(s, t, n._t, n.ut, a._t, n.ut), v = kl(s, t, a._t, n.ut, a._t, a.ut), g = Math.min(m, v);
      return g <= d ? g : null;
    }
    case 2: {
      const [m, v] = lf(u, c - 1, c), g = (function(b, x, S) {
        let w = Number.POSITIVE_INFINITY, M = S[0];
        for (let N = 1; N <= 12; N++) {
          const j = N / 12, T = { _t: L0(S[0]._t, S[1]._t, S[2]._t, S[3]._t, j), ut: L0(S[0].ut, S[1].ut, S[2].ut, S[3].ut, j) };
          w = Math.min(w, kl(b, x, M._t, M.ut, T._t, T.ut)), M = T;
        }
        return w;
      })(s, t, [n, m, v, a]);
      return g <= d ? g : null;
    }
    default: {
      const m = kl(s, t, n._t, n.ut, a._t, a.ut);
      return m <= d ? m : null;
    }
  }
}
class JE extends v1 {
  constructor(t, n) {
    super(t, n, !0);
  }
  Vg(t, n, a) {
    n.Tc(this.bg, xd(this.Sg)), t.Zo(this.bg, a, xd(this.Sg));
  }
  Sb(t, n) {
    return { wt: t, Mt: n, _t: NaN, ut: NaN };
  }
  Dg() {
    const t = this.ae.Sa();
    this.bg = this.ae.Ha().Bh().map(((n) => {
      let a;
      if ((n.Zr ?? 1) > 1) {
        const r = n.Wt[1], u = n.Wt[2], c = n.Wt[3];
        a = Math.abs(r - c) > Math.abs(u - c) ? r : u;
      } else a = n.Wt[3];
      return this.xb(n.$n, a, t);
    }));
  }
}
class w1 extends JE {
  Pg(t, n) {
    const a = this.ae.N();
    return (function(r, u, c, d, m, v, g, b = 0, x = 0) {
      if (u === null || u.from >= u.to || r.length === 0) return null;
      const S = Math.max(v / 2, g ?? 0) + x;
      let w = Number.POSITIVE_INFINITY;
      if (g !== void 0) {
        const D = g + x, $ = kd(r, c - D, u.from, u.to), G = zd(r, c + D, $, u.to);
        for (let A = $; A < G; A++) {
          const X = r[A];
          if (!k0(c, X._t, X._t, g + x)) continue;
          const F = Math.hypot(c - X._t, d - X.ut);
          F <= g + x && (w = Math.min(w, F));
        }
      }
      if (u.to - u.from < 2) {
        const D = r[u.from], $ = Math.max(b / 2, S), G = kl(c, d, D._t - $, D.ut, D._t + $, D.ut);
        return G <= S && (w = Math.min(w, G)), Number.isFinite(w) ? $o(w, 2, "series-point") : null;
      }
      let M = Number.POSITIVE_INFINITY;
      const N = kd(r, c - S, u.from, u.to), j = zd(r, c + S, N, u.to), T = Math.max(u.from + 1, N), R = Math.min(u.to, j + 1);
      for (let D = T; D < R; D++) {
        const $ = r[D - 1], G = r[D], [A, X] = ZE($, G, m, r, D);
        if (!k0(c, A, X, S)) continue;
        const F = WE(c, d, $, G, m, r, D, S);
        F !== null && (M = Math.min(M, F));
      }
      return Number.isFinite(w) ? $o(w, 2, "series-point") : Number.isFinite(M) ? $o(M, 1, "series-line") : null;
    })(this.bg, this.Sg, t, n, a.lineType, a.lineVisible ? a.lineWidth : 1, a.pointMarkersVisible ? a.pointMarkersRadius || a.lineWidth / 2 + 2 : void 0, this.le.Et().fl(), a.hitTestTolerance);
  }
}
class IE extends w1 {
  constructor() {
    super(...arguments), this.kg = new x1();
  }
  xb(t, n, a) {
    return { ...this.Sb(t, n), ...a.Sh(t) };
  }
  Bg() {
    const t = this.ae.N(), n = { ot: this.bg, Zt: t.lineStyle, Mb: t.lineVisible ? t.lineType : void 0, ct: t.lineWidth, gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0, lt: this.Sg, wb: this.le.Et().fl() };
    this.kg.ht(n);
  }
}
const FE = { type: "Line", isBuiltIn: !0, defaultOptions: { color: "#2196f3", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new IE(s, t) };
function PE(s, t, n, a, r) {
  const { context: u, horizontalPixelRatio: c, verticalPixelRatio: d } = t;
  u.lineTo(r._t * c, s * d), u.lineTo(a._t * c, s * d), u.closePath(), u.fillStyle = n, u.fill();
}
class tj extends Ms {
  constructor() {
    super(...arguments), this.rt = null;
  }
  ht(t) {
    this.rt = t;
  }
  et(t) {
    if (this.rt === null) return;
    const { ot: n, lt: a, wb: r, ct: u, Zt: c, Mb: d } = this.rt, m = this.rt.Db ?? (this.rt.Ib ? 0 : t.mediaSize.height);
    if (a === null) return;
    const v = t.context;
    v.lineCap = "butt", v.lineJoin = "round", v.lineWidth = u, Qn(v, c), v.lineWidth = 1, y1(t, n, d, a, r, this.Vb.bind(this), PE.bind(null, m));
  }
}
class ej {
  Bb(t, n) {
    const a = this.Eb, { Ab: r, Lb: u, zb: c, Ob: d, Db: m, Nb: v, Fb: g } = n;
    if (this.Wb === void 0 || a === void 0 || a.Ab !== r || a.Lb !== u || a.zb !== c || a.Ob !== d || a.Db !== m || a.Nb !== v || a.Fb !== g) {
      const { verticalPixelRatio: b } = t, x = m || v > 0 ? b : 1, S = v * x, w = g === t.bitmapSize.height ? g : g * x, M = (m ?? 0) * x, N = t.context.createLinearGradient(0, S, 0, w);
      if (N.addColorStop(0, r), m != null) {
        const j = xa((M - S) / (w - S), 0, 1);
        N.addColorStop(j, u), N.addColorStop(j, c);
      }
      N.addColorStop(1, d), this.Wb = N, this.Eb = n;
    }
    return this.Wb;
  }
}
class ij extends tj {
  constructor() {
    super(...arguments), this.Hb = new ej();
  }
  Vb(t, n) {
    return this.Hb.Bb(t, { Ab: n.ah, Lb: "", zb: "", Ob: n.oh, Nb: this.rt?.Nb ?? 0, Fb: t.bitmapSize.height });
  }
}
class nj extends w1 {
  constructor(t, n) {
    super(t, n), this.kg = new t1(), this.qb = new ij(), this.Yb = new x1(), this.kg.nt([this.qb, this.Yb]);
  }
  xb(t, n, a) {
    return { ...this.Sb(t, n), ...a.Sh(t) };
  }
  Bg() {
    const t = this.ae.N();
    if (this.Sg === null || this.bg.length === 0) return;
    let n;
    if (t.relativeGradient) {
      n = this.bg[this.Sg.from].ut;
      for (let a = this.Sg.from; a < this.Sg.to; a++) {
        const r = this.bg[a];
        r.ut < n && (n = r.ut);
      }
    }
    this.qb.ht({ Mb: t.lineType, ot: this.bg, Zt: t.lineStyle, ct: t.lineWidth, Db: null, Nb: n, Ib: t.invertFilledArea, lt: this.Sg, wb: this.le.Et().fl() }), this.Yb.ht({ Mb: t.lineVisible ? t.lineType : void 0, ot: this.bg, Zt: t.lineStyle, ct: t.lineWidth, lt: this.Sg, wb: this.le.Et().fl(), gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0 });
  }
}
const sj = { type: "Area", isBuiltIn: !0, defaultOptions: { topColor: "rgba( 46, 220, 135, 0.4)", bottomColor: "rgba( 40, 221, 100, 0)", invertFilledArea: !1, relativeGradient: !1, lineColor: "#33D778", lineStyle: 0, lineWidth: 3, lineType: 0, lineVisible: !0, crosshairMarkerVisible: !0, crosshairMarkerRadius: 4, crosshairMarkerBorderColor: "", crosshairMarkerBorderWidth: 2, crosshairMarkerBackgroundColor: "", lastPriceAnimation: 0, pointMarkersVisible: !1 }, ob: (s, t) => new nj(s, t) };
({ ...Ib });
function _1(s) {
  return s.unit === "d" ? s.value * 24 * 36e5 : s.value * 36e5;
}
function S1(s) {
  if (s == null) return null;
  const t = Number.parseFloat(s);
  return Number.isFinite(t) ? t : null;
}
function aj(s) {
  let t = s >>> 0 || 1;
  return () => (t ^= t << 13, t ^= t >>> 17, t ^= t << 5, t >>>= 0, t / 4294967296);
}
function lj(s) {
  let t = 2166136261;
  for (let n = 0; n < s.length; n++)
    t ^= s.charCodeAt(n), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function rj(s, t, n) {
  const a = _1(n), r = n.unit === "d" ? Math.min(n.value * 24, 240) : Math.min(n.value * 12, 240), c = Date.now() - a, d = a / Math.max(1, r - 1), m = aj(lj(s)), v = (Math.abs(t) || 1) * 0.12 + 0.5, g = new Array(r);
  g[r - 1] = t;
  for (let b = r - 2; b >= 0; b--)
    g[b] = g[b + 1] + (m() - 0.5) * v;
  return g.map((b, x) => ({ t: Math.round(c + x * d), v: Math.round(b * 100) / 100 }));
}
function oj(s) {
  const t = S1(s.s ?? s.state);
  if (t == null) return null;
  const n = s.lu ?? s.last_updated;
  let a;
  if (typeof n == "number") a = n < 1e12 ? n * 1e3 : n;
  else if (typeof n == "string") a = Date.parse(n);
  else return null;
  return Number.isFinite(a) ? { t: a, v: t } : null;
}
function ld(s, t) {
  return t.map((n) => s[n]?.state ?? "").join("|");
}
function uj(s, t) {
  const n = t.join(","), [a, r] = C.useState(() => ld(s.getStates(), t));
  return C.useEffect(() => (r(ld(s.getStates(), t)), s.subscribe(() => {
    const u = ld(s.getStates(), t);
    r((c) => c === u ? c : u);
  })), [s, n]), a;
}
function M1(s, t) {
  const n = Ni(), a = s.filter(Boolean).join(","), r = `${t.value}${t.unit}`, u = C.useMemo(() => s.filter(Boolean), [a]), c = !!n.connection, [d, m] = C.useState({}), v = C.useRef(0);
  C.useEffect(() => {
    const b = n.connection;
    if (!b || u.length === 0) {
      m({});
      return;
    }
    const x = ++v.current, S = /* @__PURE__ */ new Date(), w = new Date(S.getTime() - _1(t));
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
      for (const j of u) {
        const T = M?.[j] ?? [], R = [];
        for (const D of T) {
          const $ = oj(D);
          $ && R.push($);
        }
        R.length && (N[j] = R);
      }
      m(N);
    }).catch(() => {
      x === v.current && m({});
    });
  }, [n, u, r]);
  const g = uj(n, u);
  return C.useMemo(() => {
    const b = n.getStates(), x = {};
    for (const S of u) {
      if (d[S]?.length) {
        x[S] = d[S];
        continue;
      }
      const w = S1(b[S]?.state);
      w != null && (x[S] = rj(S, w, t));
    }
    return x;
  }, [n, u, d, g, r, c]);
}
function N1({ spec: s }) {
  const t = C.useMemo(() => s.series.map((r) => r.entity), [s.series]), n = M1(t, s.window), a = s.title ?? `History chart: ${s.series.map((r) => r.name ?? E1(r.entity)).join(", ")}`;
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-chart", role: "group", "aria-label": a, children: [
    (s.title || s.header.showCurrent) && /* @__PURE__ */ p.jsxs("div", { className: "simui-chart-head", children: [
      s.title && /* @__PURE__ */ p.jsx("span", { className: "simui-chart-title", children: s.title }),
      s.header.showCurrent && /* @__PURE__ */ p.jsx("div", { className: "simui-chart-readout", children: s.series.map((r, u) => /* @__PURE__ */ p.jsx(
        cj,
        {
          series: r,
          color: fj(r, u),
          colorize: s.header.colorize
        },
        `${r.entity}-${u}`
      )) })
    ] }),
    /* @__PURE__ */ p.jsx(hj, { spec: s, data: n })
  ] });
}
function cj({
  series: s,
  color: t,
  colorize: n
}) {
  const a = ke(s.entity), r = a?.state, u = r != null ? Number.parseFloat(r) : NaN, c = a?.attributes.unit_of_measurement, d = Number.isFinite(u) ? ms(u) : r ?? "—";
  return /* @__PURE__ */ p.jsxs("span", { className: "simui-chart-cur", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-chart-dot", style: { background: t } }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-chart-cur-name", children: s.name ?? E1(s.entity) }),
    /* @__PURE__ */ p.jsxs("span", { className: "simui-chart-cur-val", style: n ? { color: t } : void 0, children: [
      d,
      c && Number.isFinite(u) ? /* @__PURE__ */ p.jsxs("small", { children: [
        " ",
        c
      ] }) : null
    ] })
  ] });
}
function hj({ spec: s, data: t }) {
  const n = C.useRef(null), a = C.useRef(null), r = C.useRef([]);
  return C.useEffect(() => {
    const u = n.current;
    if (!u) return;
    const c = getComputedStyle(u), d = (M, N) => c.getPropertyValue(M).trim() || N, m = d("--text", "#edeef2"), v = d("--muted", "#838996"), g = d("--faint", "#23262e"), b = GE(u, {
      layout: {
        background: { type: Md.Solid, color: "transparent" },
        textColor: v,
        fontFamily: getComputedStyle(u).fontFamily,
        attributionLogo: !1
      },
      grid: {
        vertLines: { color: g, style: cs.Solid },
        horzLines: { color: g, style: cs.Solid }
      },
      rightPriceScale: { borderColor: g, visible: !0 },
      leftPriceScale: { borderColor: g, visible: !1 },
      timeScale: { borderColor: g, timeVisible: s.window.unit === "h", secondsVisible: !1 },
      crosshair: {
        mode: wd.Magnet,
        vertLine: { color: v, width: 1, style: cs.Dotted, labelBackgroundColor: g },
        horzLine: { color: v, width: 1, style: cs.Dotted, labelBackgroundColor: g, labelVisible: !0 }
      },
      handleScale: !1,
      handleScroll: !1,
      autoSize: !1
    });
    b.applyOptions({ layout: { textColor: v } }), a.current = b;
    const x = (s.axes.length ? s.axes : [void 0]).some((M) => B0(M) === "left");
    b.priceScale("left").applyOptions({ visible: x, borderColor: g, textColor: m }), b.priceScale("right").applyOptions({ borderColor: g, textColor: m }), r.current = s.series.map((M, N) => {
      const j = dj(M, N, c), T = mj(s, M), R = B0(T), D = pj(M.strokeWidth ?? 2);
      if (M.fill === "area") {
        const G = M.opacity ?? 0.18, A = b.addSeries(sj, {
          lineColor: j,
          topColor: H0(j, G),
          bottomColor: H0(j, 0),
          lineWidth: D,
          priceScaleId: R,
          priceLineVisible: !1,
          lastValueVisible: !0,
          crosshairMarkerVisible: !0
        });
        return U0(A, T), A;
      }
      const $ = b.addSeries(FE, {
        color: j,
        lineWidth: D,
        priceScaleId: R,
        priceLineVisible: !1,
        lastValueVisible: !0,
        crosshairMarkerVisible: !0
      });
      return U0($, T), $;
    });
    const S = r.current[0];
    if (S && s.thresholds?.length)
      for (const M of s.thresholds)
        S.createPriceLine({
          price: M.value,
          color: C1(M.color, c),
          lineWidth: 1,
          lineStyle: cs.Dashed,
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
  }, [gj(s)]), C.useEffect(() => {
    const u = a.current;
    if (u)
      try {
        let c = !1;
        s.series.forEach((d, m) => {
          const v = r.current[m];
          if (!v) return;
          const g = t[d.entity] ?? [], b = vj(g).map((x) => ({
            time: Math.floor(x.t / 1e3),
            value: x.v
          }));
          v.setData(b), b.length && (c = !0);
        }), c && u.timeScale().fitContent();
      } catch {
      }
  }, [t, s.series]), /* @__PURE__ */ p.jsx("div", { className: "simui-chart-canvas", ref: n, "aria-hidden": "true" });
}
const Ul = ["--accent", "--warm", "--up", "--down", "--warn"];
function dj(s, t, n) {
  if (s.color) return C1(s.color, n);
  const a = Ul[t % Ul.length], r = ["#5b8cff", "#ffb267", "#3fd08a", "#f0735e", "#f0a84b"][t % Ul.length];
  return n?.getPropertyValue(a).trim() || r;
}
function fj(s, t) {
  return s.color ?? `var(${Ul[t % Ul.length]})`;
}
function C1(s, t) {
  const n = s.trim();
  if (n.startsWith("--")) return t?.getPropertyValue(n).trim() || n;
  const a = n.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i);
  return a && t?.getPropertyValue(a[1]).trim() || n;
}
function E1(s) {
  return (s.split(".")[1] ?? s).replace(/_/g, " ").replace(/^\w/, (n) => n.toUpperCase());
}
function mj(s, t) {
  return t.axisId ? s.axes.find((n) => n.id === t.axisId) : s.axes[0];
}
function B0(s) {
  return s?.opposite ? "right" : "left";
}
function U0(s, t) {
  if (!t || t.min == null || t.max == null) return;
  const n = t.min, a = t.max;
  s.applyOptions({
    autoscaleInfoProvider: () => ({
      priceRange: { minValue: n, maxValue: a }
    })
  });
}
function pj(s) {
  const t = Math.round(s);
  return t < 1 ? 1 : t > 4 ? 4 : t;
}
function H0(s, t) {
  const n = Math.max(0, Math.min(1, t)), a = s.trim();
  if (/^#([0-9a-f]{3})$/i.test(a)) {
    const u = parseInt(a[1] + a[1], 16), c = parseInt(a[2] + a[2], 16), d = parseInt(a[3] + a[3], 16);
    return `rgba(${u}, ${c}, ${d}, ${n})`;
  }
  if (/^#([0-9a-f]{6})$/i.test(a)) {
    const u = parseInt(a.slice(1, 3), 16), c = parseInt(a.slice(3, 5), 16), d = parseInt(a.slice(5, 7), 16);
    return `rgba(${u}, ${c}, ${d}, ${n})`;
  }
  const r = a.match(/^rgb\(([^)]+)\)$/i);
  return r ? `rgba(${r[1]}, ${n})` : `color-mix(in srgb, ${a} ${Math.round(n * 100)}%, transparent)`;
}
function vj(s) {
  const t = [...s].sort((r, u) => r.t - u.t), n = [];
  let a = -1;
  for (const r of t) {
    const u = Math.floor(r.t / 1e3);
    u === a ? n[n.length - 1] = r : (n.push(r), a = u);
  }
  return n;
}
function gj(s) {
  const t = s.series.map((r) => `${r.entity}:${r.fill}:${r.color ?? ""}:${r.strokeWidth ?? ""}:${r.axisId ?? ""}:${r.opacity ?? ""}`).join(","), n = s.axes.map((r) => `${r.id}:${r.opposite ? 1 : 0}:${r.min ?? ""}:${r.max ?? ""}:${r.ticks ?? ""}`).join(","), a = (s.thresholds ?? []).map((r) => `${r.value}:${r.color}`).join(",");
  return `${s.window.value}${s.window.unit}|${t}|${n}|${a}`;
}
const q0 = 'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function j1({ open: s, title: t, onClose: n, children: a }) {
  const r = C.useRef(null), u = C.useRef(null), c = C.useId(), d = C.useCallback(
    (m) => {
      if (m.key === "Escape") {
        m.preventDefault(), n();
        return;
      }
      if (m.key !== "Tab") return;
      const v = r.current;
      if (!v) return;
      const g = v.querySelectorAll(q0);
      if (g.length === 0) {
        m.preventDefault(), v.focus();
        return;
      }
      const b = g[0], x = g[g.length - 1], S = document.activeElement;
      m.shiftKey && (S === b || !v.contains(S)) ? (m.preventDefault(), x.focus()) : !m.shiftKey && S === x && (m.preventDefault(), b.focus());
    },
    [n]
  );
  return C.useEffect(() => {
    if (!s) return;
    u.current = document.activeElement, document.addEventListener("keydown", d, !0);
    const m = r.current;
    return (m?.querySelector(q0) ?? m)?.focus(), () => {
      document.removeEventListener("keydown", d, !0), u.current?.focus?.();
    };
  }, [s, d]), s ? hs.createPortal(
    /* @__PURE__ */ p.jsx("div", { className: "simui-root simui-sheet-backdrop", onClick: n, children: /* @__PURE__ */ p.jsxs(
      "div",
      {
        ref: r,
        className: "simui-sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": t ? void 0 : "Details",
        "aria-labelledby": t ? c : void 0,
        tabIndex: -1,
        onClick: (m) => m.stopPropagation(),
        children: [
          t && /* @__PURE__ */ p.jsxs("header", { className: "simui-sheet-head", children: [
            /* @__PURE__ */ p.jsx("span", { id: c, className: "simui-sheet-title", children: t }),
            /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: n, "aria-label": "Close", children: /* @__PURE__ */ p.jsx(Lb, { size: 16 }) })
          ] }),
          /* @__PURE__ */ p.jsx("div", { className: "simui-sheet-body", children: a })
        ]
      }
    ) }),
    document.body
  ) : null;
}
const bj = { value: 24, unit: "h" }, yj = 140, xj = 40;
function wj({ entityId: s, band: t, window: n, name: a, accent: r, onExpand: u }) {
  const c = ke(s), d = n ?? bj, m = !!c && (c.state === "unavailable" || c.state === "unknown"), g = M1(m ? [] : [s], d)[s], b = c?.attributes.unit_of_measurement, x = c?.state, S = x != null ? Number.parseFloat(x) : NaN, w = !m && Number.isFinite(S), M = a ?? (c ? P(c) : s), { delta: N, outOfBand: j } = C.useMemo(() => {
    const G = (g ?? []).map((nt) => nt.v), A = G.length ? G[0] : void 0, X = w ? S : G.length ? G[G.length - 1] : void 0, F = A != null && X != null ? X - A : void 0, I = w ? S : X, it = I != null && t != null && (t.min != null && I < t.min || t.max != null && I > t.max);
    return { delta: F, outOfBand: !!it };
  }, [g, S, w, t]), T = j ? "var(--warn)" : r ?? "var(--muted)", R = `simui-metric-val num${j ? " oob" : ""}`;
  if (m)
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-metric is-unavailable", children: [
      /* @__PURE__ */ p.jsx("div", { className: "simui-metric-head", children: /* @__PURE__ */ p.jsx("span", { className: "simui-metric-name", title: M, children: M }) }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-metric-value", children: /* @__PURE__ */ p.jsx("span", { className: "simui-metric-val num", children: "—" }) })
    ] });
  const D = (G) => {
    u && (G.stopPropagation(), u());
  }, $ = u ? (G) => {
    (G.key === "Enter" || G.key === " ") && (G.preventDefault(), u());
  } : void 0;
  return /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: `simui-metric${u ? " is-clickable" : ""}`,
      onClick: u ? D : void 0,
      onKeyDown: $,
      role: u ? "button" : void 0,
      tabIndex: u ? 0 : void 0,
      "aria-label": u ? `${M} — view chart` : void 0,
      style: { "--metric-accent": T },
      children: [
        /* @__PURE__ */ p.jsxs("div", { className: "simui-metric-head", children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-metric-name", title: M, children: M }),
          N != null && Math.abs(N) >= _j && /* @__PURE__ */ p.jsxs("span", { className: `simui-metric-delta num ${N > 0 ? "up" : "down"}`, children: [
            N > 0 ? "+" : "−",
            ms(Math.abs(N))
          ] })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "simui-metric-value", children: [
          /* @__PURE__ */ p.jsx("span", { className: R, children: w ? ms(S) : x ?? "—" }),
          b && w && /* @__PURE__ */ p.jsx("span", { className: "simui-metric-unit", children: b })
        ] }),
        /* @__PURE__ */ p.jsx(
          Sj,
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
const _j = 0.05;
function Sj({
  values: s,
  band: t,
  stroke: n,
  width: a = yj,
  height: r = xj
}) {
  const u = C.useMemo(() => `ms-${Math.random().toString(36).slice(2, 8)}`, []);
  if (s.length < 2)
    return /* @__PURE__ */ p.jsx("div", { className: "simui-metric-spark is-empty", style: { height: r }, "aria-hidden": "true" });
  const c = Math.min(...s), d = Math.max(...s), m = (d - c || Math.abs(d) || 1) * 0.12, v = c - m, b = d + m - v || 1, x = a / (s.length - 1), S = (T) => r - (T - v) / b * r, M = s.map((T, R) => `${(R * x).toFixed(1)},${S(T).toFixed(1)}`).join(" "), N = `0,${r} ${M} ${a},${r}`;
  let j = null;
  if (t && (t.min != null || t.max != null)) {
    const T = t.max != null ? Q0(S(t.max), r) : 0, R = t.min != null ? Q0(S(t.min), r) : r, D = Math.max(0, R - T);
    D > 0.5 && (j = { y: T, h: D });
  }
  return /* @__PURE__ */ p.jsxs(
    "svg",
    {
      className: "simui-metric-spark",
      width: "100%",
      height: r,
      viewBox: `0 0 ${a} ${r}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ p.jsx("defs", { children: /* @__PURE__ */ p.jsxs("linearGradient", { id: u, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ p.jsx("stop", { offset: "0%", stopColor: n, stopOpacity: "0.22" }),
          /* @__PURE__ */ p.jsx("stop", { offset: "100%", stopColor: n, stopOpacity: "0" })
        ] }) }),
        j && /* @__PURE__ */ p.jsx(
          "rect",
          {
            className: "simui-metric-band",
            x: "0",
            y: j.y.toFixed(1),
            width: a,
            height: j.h.toFixed(1)
          }
        ),
        /* @__PURE__ */ p.jsx("polygon", { points: N, fill: `url(#${u})`, stroke: "none" }),
        /* @__PURE__ */ p.jsx(
          "polyline",
          {
            points: M,
            fill: "none",
            stroke: n,
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
function Q0(s, t) {
  return s < 0 ? 0 : s > t ? t : s;
}
const rd = [
  { id: "24h", label: "24h", window: { value: 24, unit: "h" } },
  { id: "7d", label: "7d", window: { value: 7, unit: "d" } },
  { id: "30d", label: "30d", window: { value: 30, unit: "d" } }
];
function k1({
  entityId: s,
  spec: t,
  band: n,
  accent: a,
  name: r,
  range: u = "24h",
  children: c
}) {
  const [d, m] = C.useState(!1), [v, g] = C.useState(u), b = ke(s ?? ""), x = r ?? (b ? P(b) : s), S = rd.find((j) => j.id === v)?.window ?? rd[0].window, w = C.useMemo(() => t ? { ...t, window: S } : s ? Mj(s, x ?? s, S, a, n) : null, [t, s, x, S, a, n]), M = c ?? (s ? /* @__PURE__ */ p.jsx(
    wj,
    {
      entityId: s,
      band: n,
      window: S,
      name: r,
      accent: a,
      onExpand: () => m(!0)
    }
  ) : null), N = c != null ? /* @__PURE__ */ p.jsx(
    "div",
    {
      className: "simui-expand-glance is-clickable",
      role: "button",
      tabIndex: 0,
      "aria-label": x ? `${x} — view chart` : "View chart",
      onClick: () => m(!0),
      onKeyDown: (j) => {
        (j.key === "Enter" || j.key === " ") && (j.preventDefault(), m(!0));
      },
      children: M
    }
  ) : M;
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    N,
    /* @__PURE__ */ p.jsx(j1, { open: d, title: x, onClose: () => m(!1), children: /* @__PURE__ */ p.jsxs("div", { className: "simui-expand-sheet", children: [
      /* @__PURE__ */ p.jsx("div", { className: "simui-range-toggle", role: "tablist", "aria-label": "Chart range", children: rd.map((j) => /* @__PURE__ */ p.jsx(
        "button",
        {
          role: "tab",
          "aria-selected": v === j.id,
          className: `simui-range-btn${v === j.id ? " active" : ""}`,
          onClick: () => g(j.id),
          children: j.label
        },
        j.id
      )) }),
      w && /* @__PURE__ */ p.jsx("div", { className: "simui-expand-chart", children: /* @__PURE__ */ p.jsx(N1, { spec: w }) })
    ] }) })
  ] });
}
function Mj(s, t, n, a, r) {
  const u = [];
  return r?.min != null && u.push({ value: r.min, color: "var(--warn)" }), r?.max != null && u.push({ value: r.max, color: "var(--warn)" }), {
    title: t,
    window: n,
    bucket: n.unit === "d" ? "day" : "hour",
    reducer: "mean",
    backend: n.unit === "d" && n.value > 7 ? "statistics" : "history",
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
  return t <= 0 ? ds(Math.round(s), 0, 100) : ds(Math.round(s / t) * t, 0, 100);
}
function Nj(s) {
  const { value: t, onCommit: n, axis: a = "auto", commitMs: r = 120, step: u = 1, disabled: c, threshold: d = 4 } = s, [m, v] = C.useState(() => od(t, u)), [g, b] = C.useState(!1), [x, S] = C.useState(a === "auto" ? "vertical" : a), w = C.useRef(!1), M = C.useRef(m), N = C.useRef(null), j = C.useRef(a === "auto" ? null : a), T = C.useRef(null), R = C.useRef(null), D = C.useRef(!1), $ = C.useRef(null), G = C.useRef(null), A = C.useRef(0), X = C.useRef(null), F = C.useRef(n);
  F.current = n;
  const I = C.useCallback(() => {
    if (X.current != null && (clearTimeout(X.current), X.current = null), G.current != null) {
      const B = G.current;
      G.current = null, A.current = Date.now(), F.current(B);
    }
  }, []), it = C.useCallback(
    (B) => {
      G.current = B;
      const Z = Date.now(), st = Math.max(0, r - (Z - A.current));
      X.current != null && clearTimeout(X.current), X.current = setTimeout(I, st);
    },
    [r, I]
  );
  C.useEffect(() => {
    if (w.current || G.current != null) return;
    const B = od(t, u);
    M.current = B, v(B);
  }, [t, u]);
  const nt = C.useCallback(() => {
    $.current = null;
    const B = N.current, Z = R.current;
    if (!B || !Z) return;
    if (j.current == null && T.current) {
      const k = Math.abs(Z.x - T.current.x), Q = Math.abs(Z.y - T.current.y);
      if (k > d || Q > d) {
        const J = Q >= k ? "vertical" : "horizontal";
        j.current = J, S(J);
      }
    }
    const st = j.current ?? "vertical";
    let ht;
    st === "vertical" ? ht = B.height > 0 ? (B.bottom - Z.y) / B.height * 100 : 0 : ht = B.width > 0 ? (Z.x - B.left) / B.width * 100 : 0;
    const ft = od(ht, u);
    ft !== M.current && (M.current = ft, v(ft), it(ft));
  }, [u, d, it]);
  C.useEffect(() => {
    if (!g) return;
    const B = (st) => {
      if (w.current) {
        if (st.preventDefault(), R.current = { x: st.clientX, y: st.clientY }, T.current && !D.current) {
          const ht = Math.abs(st.clientX - T.current.x), ft = Math.abs(st.clientY - T.current.y);
          (ht > d || ft > d) && (D.current = !0);
        }
        $.current == null && ($.current = requestAnimationFrame(nt));
      }
    }, Z = () => {
      w.current = !1, b(!1), $.current != null && (cancelAnimationFrame($.current), $.current = null), D.current && (G.current == null && (G.current = M.current), I());
    };
    return window.addEventListener("pointermove", B, { passive: !1 }), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z), () => {
      window.removeEventListener("pointermove", B), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z);
    };
  }, [g, d, nt, I]), C.useEffect(
    () => () => {
      $.current != null && cancelAnimationFrame($.current), X.current != null && clearTimeout(X.current);
    },
    []
  );
  const yt = C.useCallback(
    (B) => {
      if (c || B.button != null && B.button !== 0) return;
      const Z = B.currentTarget;
      N.current = Z.getBoundingClientRect(), T.current = { x: B.clientX, y: B.clientY }, R.current = { x: B.clientX, y: B.clientY }, D.current = !1, j.current = a === "auto" ? null : a, w.current = !0, b(!0);
    },
    [c, a]
  ), bt = x === "horizontal" ? { width: `${m}%` } : { height: `${m}%` }, Bt = C.useCallback(() => D.current, []);
  return { value: m, dragging: g, moved: Bt, handlers: { onPointerDown: yt }, fillStyle: bt };
}
const $0 = 4, Cj = {
  light: {
    tint: "var(--warm)",
    read: (s) => {
      if (s.state !== "on") return 0;
      const t = s.attributes.brightness;
      return t != null ? Math.max(1, Math.round(t / 255 * 100)) : 100;
    },
    isOn: (s) => s.state === "on",
    icon: () => Wo,
    commit: (s, t, n) => s("light", "turn_on", { brightness_pct: n }, { entity_id: t.entity_id }),
    toggle: (s, t, n) => s("light", n ? "turn_off" : "turn_on", {}, { entity_id: t.entity_id })
  },
  cover: {
    tint: "var(--accent)",
    read: (s) => {
      const t = s.attributes.current_position;
      return t ?? (s.state === "open" ? 100 : 0);
    },
    isOn: (s) => s.state === "open" || (s.attributes.current_position ?? 0) > 0,
    icon: () => Zd,
    commit: (s, t, n) => s("cover", "set_cover_position", { position: n }, { entity_id: t.entity_id }),
    toggle: (s, t, n) => s("cover", n ? "close_cover" : "open_cover", void 0, { entity_id: t.entity_id })
  },
  fan: {
    tint: "var(--cool)",
    read: (s) => {
      if (s.state !== "on") return 0;
      const t = s.attributes.percentage;
      return t ?? 100;
    },
    isOn: (s) => s.state === "on",
    icon: () => _a,
    commit: (s, t, n) => s("fan", "set_percentage", { percentage: n }, { entity_id: t.entity_id }),
    toggle: (s, t, n) => s("fan", n ? "turn_off" : "turn_on", {}, { entity_id: t.entity_id })
  },
  media_player: {
    tint: "var(--violet)",
    read: (s) => {
      const t = s.attributes.volume_level;
      return t != null ? Math.round(t * 100) : 0;
    },
    isOn: (s) => !s.attributes.is_volume_muted && s.state !== "off",
    icon: (s) => s ? Ab : Rb,
    commit: (s, t, n) => s("media_player", "volume_set", { volume_level: n / 100 }, { entity_id: t.entity_id }),
    toggle: (s, t, n) => s("media_player", "volume_mute", { is_volume_muted: n }, { entity_id: t.entity_id })
  }
};
function Ej({ entity: s, name: t, step: n = 1, menuItems: a }) {
  const r = ke(s), u = Lt(), c = Fd(), d = er(), m = (nt, yt, bt, Bt) => {
    u(nt, yt, bt, Bt);
  }, v = rt(s), g = Cj[v], b = !!r && (r.state === "unavailable" || r.state === "unknown"), x = r?.attributes.supported_features ?? 0, S = !!g && !b && (v !== "cover" || (x & $0) === $0), w = !!r && !!g && g.isOn(r), M = r && g ? g.read(r) ?? 0 : 0, N = Nj({
    value: M,
    axis: "vertical",
    step: n,
    disabled: !S || !r,
    onCommit: (nt) => {
      r && g && g.commit(m, r, nt);
    }
  }), j = C.useRef(!1);
  if (!r || !g) return null;
  const T = t ?? P(r), R = S ? N.value : w ? M : 0, D = g.icon(w), $ = () => {
    if (j.current) {
      j.current = !1;
      return;
    }
    b || g.toggle(m, r, w);
  }, G = () => {
    N.moved() && (j.current = !0);
  }, A = (nt) => {
    nt.stopPropagation(), g.toggle(m, r, w);
  }, X = (nt) => {
    const yt = Math.max(0, Math.min(100, Math.round(nt)));
    g.commit(m, r, yt);
  }, F = (nt) => {
    if (nt.key === "Enter" || nt.key === " ") {
      nt.preventDefault(), b || g.toggle(m, r, w);
      return;
    }
    if (!S) return;
    const yt = 10;
    switch (nt.key) {
      case "ArrowUp":
      case "ArrowRight":
        nt.preventDefault(), X(R + n);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        nt.preventDefault(), X(R - n);
        break;
      case "PageUp":
        nt.preventDefault(), X(R + yt);
        break;
      case "PageDown":
        nt.preventDefault(), X(R - yt);
        break;
      case "Home":
        nt.preventDefault(), X(0);
        break;
      case "End":
        nt.preventDefault(), X(100);
        break;
    }
  }, I = { ...N.fillStyle, background: g.tint }, it = [
    { label: w ? V0(v) : Y0(v), onClick: () => g.toggle(m, r, w) },
    { label: "Details", onClick: () => d({ action: "more-info" }, s) },
    ...a ?? []
  ];
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: `simui-slidertile${w ? " is-on" : ""}${N.dragging ? " is-dragging" : ""}${S ? "" : " is-static"}${b ? " is-unavailable" : ""}`,
        style: { "--slider-tint": g.tint },
        role: "slider",
        "aria-label": `${T} ${jj(v)}`,
        "aria-orientation": "vertical",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": R,
        "aria-valuetext": `${R}%`,
        "aria-disabled": S ? void 0 : !0,
        tabIndex: 0,
        onClick: $,
        onKeyDown: F,
        onPointerUpCapture: G,
        ...S ? N.handlers : {},
        ...c.menuProps,
        children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-slidertile-fill", style: I, "aria-hidden": "true" }),
          /* @__PURE__ */ p.jsxs("span", { className: "simui-slidertile-body", children: [
            /* @__PURE__ */ p.jsxs("span", { className: "simui-slidertile-head", children: [
              /* @__PURE__ */ p.jsx(
                "button",
                {
                  type: "button",
                  className: `simui-slidertile-ic${w ? " on" : ""}`,
                  "aria-label": w ? V0(v) : Y0(v),
                  onClick: A,
                  onPointerDown: (nt) => nt.stopPropagation(),
                  children: /* @__PURE__ */ p.jsx(D, { size: 18, strokeWidth: 2 })
                }
              ),
              /* @__PURE__ */ p.jsx("span", { className: "simui-slidertile-pct num", children: kj(v, w, R) })
            ] }),
            /* @__PURE__ */ p.jsx("span", { className: "simui-slidertile-name", title: T, children: T })
          ] })
        ]
      }
    ),
    c.open && c.position && /* @__PURE__ */ p.jsx(
      Jo,
      {
        items: it,
        x: c.position.x,
        y: c.position.y,
        onClose: c.close,
        header: Vl(s) ? /* @__PURE__ */ p.jsx(Gl, { entityId: s, compact: !0 }) : void 0
      }
    )
  ] });
}
function jj(s) {
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
function kj(s, t, n) {
  return (s === "light" || s === "fan") && !t ? "Off" : s === "media_player" && !t ? "Muted" : `${n}%`;
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
function V0(s) {
  switch (s) {
    case "cover":
      return "Close";
    case "media_player":
      return "Mute";
    default:
      return "Turn off";
  }
}
const z1 = "category.", zj = {
  lights: { name: "Lights", icon: "lightbulb", color: "warm" },
  climate: { name: "Climate", icon: "thermostat", color: "teal" },
  media: { name: "Media", icon: "cast", color: "violet" },
  security: { name: "Security", icon: "shield", color: "green" },
  sensors: { name: "Sensors", icon: "activity", color: "cyan" },
  power: { name: "Power", icon: "zap", color: "warn" },
  scenes: { name: "Scenes", icon: "sparkles", color: "pink" },
  server: { name: "System", icon: "server", color: "slate" }
};
function Tj({ block: s }) {
  const t = s.entityIds;
  if (t.length && t.every((c) => c.startsWith(z1)))
    return /* @__PURE__ */ p.jsx(Aj, { block: s });
  if (t.length > 0 && t.every((c) => rt(c) === "scene" || rt(c) === "script"))
    return /* @__PURE__ */ p.jsx(Rj, { block: s });
  if (s.axis === "metrics")
    return /* @__PURE__ */ p.jsx(Hj, { block: s });
  if (s.tile === "statusboard")
    return /* @__PURE__ */ p.jsx(qj, { block: s });
  if (s.tile === "slider")
    return /* @__PURE__ */ p.jsx(Qj, { block: s });
  const a = t.length > 0 && t.every((c) => rt(c) === "light"), r = s.axis ?? "none", u = r === "room" || r === "floor" || r === "device-class";
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    a && /* @__PURE__ */ p.jsx($j, { ids: t }),
    u ? /* @__PURE__ */ p.jsx(Oj, { ids: t, axis: r }) : /* @__PURE__ */ p.jsx("div", { className: "simui-rows", children: t.map((c) => /* @__PURE__ */ p.jsx(Io, { entityId: c }, c)) })
  ] });
}
function Oj({ ids: s, axis: t }) {
  const n = ou(), a = Ni().getStates(), r = (c) => a[c]?.attributes.device_class, u = /* @__PURE__ */ new Map();
  for (const c of s) {
    const d = Dj(c, t, n, r);
    let m = u.get(d);
    m || (m = [], u.set(d, m)), m.push(c);
  }
  return u.size <= 1 ? /* @__PURE__ */ p.jsx("div", { className: "simui-rows", children: s.map((c) => /* @__PURE__ */ p.jsx(Io, { entityId: c }, c)) }) : /* @__PURE__ */ p.jsx("div", { className: "simui-subgroups", children: [...u.entries()].map(([c, d]) => /* @__PURE__ */ p.jsxs("div", { className: "simui-subgroup", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-subhead", children: c }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-rows", children: d.map((m) => /* @__PURE__ */ p.jsx(Io, { entityId: m }, m)) })
  ] }, c)) });
}
function Dj(s, t, n, a) {
  if (t === "floor")
    return n?.[s]?.floorName ?? n?.[s]?.areaName ?? "Home";
  if (t === "room")
    return n?.[s]?.areaName ?? "Other";
  if (t === "device-class") {
    const r = a(s);
    return pt(r || rt(s));
  }
  return "Other";
}
function Aj({ block: s }) {
  const { openCategory: t } = Ss(), n = s.entityIds.map((a) => a.slice(z1.length));
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-launcher-grid", children: n.map((a) => {
      const r = zj[a] ?? { name: pt(a), icon: "home", color: "accent" };
      return /* @__PURE__ */ p.jsx(
        TN,
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
function Rj({ block: s }) {
  const t = er();
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-launcher-grid", children: s.entityIds.map((n) => /* @__PURE__ */ p.jsx(Lj, { entityId: n, onTap: () => t({ action: "call-service", service: `${rt(n)}.turn_on`, target: { entity_id: n } }, n) }, n)) })
  ] });
}
function Lj({ entityId: s, onTap: t }) {
  const n = ke(s), a = xM("sparkles");
  return /* @__PURE__ */ p.jsxs("button", { className: "simui-scene-tile", onClick: t, "aria-label": n ? P(n) : s, children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-launch-ic", children: /* @__PURE__ */ p.jsx(a, { size: 18, strokeWidth: 2 }) }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-name simui-launch-name", children: n ? P(n) : s })
  ] });
}
function Bj(s) {
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
function Uj(s) {
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
function Hj({ block: s }) {
  const t = Ni().getStates();
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-metric-wall", children: s.entityIds.map((n) => {
      const a = t[n];
      return /* @__PURE__ */ p.jsx(k1, { entityId: n, band: Bj(a), accent: Uj(a) }, n);
    }) })
  ] });
}
function qj({ block: s }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-statusboard-grid", children: s.entityIds.map((t) => /* @__PURE__ */ p.jsx(Vb, { entity: t }, t)) })
  ] });
}
function Qj({ block: s }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface", children: [
    s.title && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s.title }) }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-slider-wall", children: s.entityIds.map((t) => /* @__PURE__ */ p.jsx(Ej, { entity: t, step: rt(t) === "light" ? 1 : 5 }, t)) })
  ] });
}
function $j({ ids: s }) {
  const t = Lt(), n = $e((r) => {
    const u = s.filter((d) => r[d]?.state === "on");
    if (!u.length) return 0;
    const c = u.reduce((d, m) => d + Number(r[m]?.attributes.brightness ?? 0), 0);
    return Math.round(c / u.length / 255 * 100);
  }), a = (r) => {
    const u = Number(r.target.value);
    s.forEach((c) => {
      t("light", "turn_on", { brightness_pct: u }, { entity_id: c });
    });
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-master", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-master-label", children: "All" }),
    /* @__PURE__ */ p.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: n,
        "aria-label": "All lights brightness",
        onChange: a,
        style: { background: `linear-gradient(to right, var(--warm) ${n}%, var(--faint) ${n}%)` }
      }
    ),
    /* @__PURE__ */ p.jsxs("span", { className: "simui-master-val num", children: [
      n,
      "%"
    ] })
  ] });
}
function Yj({ block: s }) {
  return s.source ? /* @__PURE__ */ p.jsx(Vj, { block: s }) : /* @__PURE__ */ p.jsx(T1, { title: s.title, ids: s.entityIds });
}
function Vj({ block: s }) {
  const t = ou(), n = s.source, a = $e(
    (u) => Xb(n, u, (c) => t?.[c]?.areaName).join(",")
  ), r = a ? a.split(",") : [];
  return !r.length && (n.hideWhenEmpty ?? !0) ? null : /* @__PURE__ */ p.jsx(T1, { title: s.title, ids: r, empty: "Nothing right now." });
}
function T1({ title: s, ids: t, empty: n }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-surface list", children: [
    s && /* @__PURE__ */ p.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ p.jsx("span", { children: s }) }),
    t.length ? /* @__PURE__ */ p.jsx("div", { className: "simui-rows divided", children: t.map((a) => /* @__PURE__ */ p.jsx(Io, { entityId: a }, a)) }) : n && /* @__PURE__ */ p.jsx("div", { className: "simui-list-empty", children: n })
  ] });
}
const Gj = {
  scene: V_,
  script: uS,
  button: gs,
  input_button: gs
};
function Kj(s) {
  return s === "scene" || s === "script" ? "turn_on" : "press";
}
function Ro({ entity: s }) {
  const t = Lt(), n = rt(s.entity_id), a = s.state === "unavailable" || s.state === "unknown", r = Gj[n] ?? Sa, u = P(s), c = () => {
    a || t(n, Kj(n), {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ p.jsx(
    Xt,
    {
      onClick: a ? void 0 : c,
      className: `simui-action${a ? " is-unavailable" : ""}`,
      children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(r, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: u, children: u }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-action-run", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(Sa, { size: 13, strokeWidth: 2, fill: "currentColor" }) })
      ] })
    }
  );
}
const Xj = 1e4;
function Zj({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", n = s.attributes.entity_picture, [a, r] = C.useState(() => Date.now());
  C.useEffect(() => {
    if (t || !n) return;
    const d = window.setInterval(() => r(Date.now()), Xj);
    return () => window.clearInterval(d);
  }, [t, n]);
  const u = n ? `${n}${n.includes("?") ? "&" : "?"}_=${a}` : void 0, c = P(s);
  return /* @__PURE__ */ p.jsx(Xt, { className: `simui-camera${t ? " is-unavailable" : ""}`, children: /* @__PURE__ */ p.jsxs("div", { className: "simui-cam-frame", children: [
    u && !t ? /* @__PURE__ */ p.jsx("img", { className: "simui-cam-img", src: u, alt: c, loading: "lazy" }) : /* @__PURE__ */ p.jsx("div", { className: "simui-cam-empty", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(nM, { size: 20, strokeWidth: 1.75 }) }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-cam-cap", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-cam-name", title: c, children: c }),
      t && /* @__PURE__ */ p.jsx("span", { className: "simui-cam-state", children: pt(s.state) })
    ] })
  ] }) });
}
const Wj = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, Jj = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function Ij({ entity: s }) {
  const t = Lt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ p.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(Na, { size: 16, strokeWidth: 2 }) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ p.jsxs("span", { className: "simui-big", children: [
          "—",
          /* @__PURE__ */ p.jsx("span", { className: "simui-unit", children: "°" })
        ] }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: "Unavailable" })
      ] })
    ] });
  const a = s.attributes, r = a.hvac_action, u = a.current_temperature, c = a.temperature, d = a.target_temp_low, m = a.target_temp_high, v = a.target_temp_step ?? 0.5, g = a.min_temp ?? 7, b = a.max_temp ?? 35, x = r && Wj[r] || Jj[s.state] || "", S = (N) => {
    if (c == null) return;
    const j = ds(Math.round((c + N) / v) * v, g, b);
    t("climate", "set_temperature", { temperature: j }, { entity_id: s.entity_id });
  }, w = a.hvac_modes ?? [], M = w.length > 1 ? [{ type: "climate-hvac-modes", modes: w, style: "icons" }] : [];
  return /* @__PURE__ */ p.jsxs(Xt, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-ic ${x}`, children: /* @__PURE__ */ p.jsx(Na, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsxs("span", { className: "simui-big", children: [
        u != null ? Math.round(u) : "—",
        /* @__PURE__ */ p.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      c != null ? /* @__PURE__ */ p.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => S(-v), children: /* @__PURE__ */ p.jsx(jb, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ p.jsxs("span", { className: "simui-target", children: [
          ud(c),
          "°"
        ] }),
        /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => S(v), children: /* @__PURE__ */ p.jsx(tr, { size: 14, strokeWidth: 2.5 }) })
      ] }) : d != null && m != null ? /* @__PURE__ */ p.jsxs("span", { className: "simui-target", children: [
        ud(d),
        "–",
        ud(m),
        "°"
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx(sr, { entity: s, features: M })
  ] });
}
function ud(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
const Lo = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function Fj({ entity: s }) {
  const t = Lt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ p.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-value", children: "Unavailable" })
    ] }) });
  const a = s.attributes.current_position, r = s.state === "open" || a != null && a > 0, u = Et(s, Lo.SET_POSITION) && a != null, c = (m, v) => {
    t("cover", m, v, { entity_id: s.entity_id });
  }, d = u ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0;
  return /* @__PURE__ */ p.jsxs(Xt, { className: r ? "is-on" : "", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-value", children: a != null ? `${a}%` : pt(s.state) })
    ] }),
    u ? /* @__PURE__ */ p.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: a,
        "aria-label": "Position",
        style: d,
        onChange: (m) => c("set_cover_position", { position: Number(m.target.value) })
      }
    ) : /* @__PURE__ */ p.jsxs("div", { className: "simui-controls", children: [
      Et(s, Lo.OPEN) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => c("open_cover"), children: /* @__PURE__ */ p.jsx($l, { size: 15, strokeWidth: 2 }) }),
      Et(s, Lo.STOP) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => c("stop_cover"), children: /* @__PURE__ */ p.jsx(Ma, { size: 12, strokeWidth: 2 }) }),
      Et(s, Lo.CLOSE) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => c("close_cover"), children: /* @__PURE__ */ p.jsx(ps, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const Pj = { SET_SPEED: 1 };
function tk({ entity: s }) {
  const t = Lt(), n = s.state === "unavailable" || s.state === "unknown", a = s.state === "on", r = a ? s.attributes.percentage ?? 100 : 0, u = !n && Et(s, Pj.SET_SPEED), c = P(s), d = () => {
    t("fan", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, m = (b) => {
    t("fan", "set_percentage", { percentage: Number(b.target.value) }, { entity_id: s.entity_id });
  }, g = {
    background: `linear-gradient(to right, ${a ? "var(--cool)" : "var(--faint)"} ${r}%, var(--faint) ${r}%)`
  };
  return n ? /* @__PURE__ */ p.jsx(Xt, { className: "simui-fan is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(_a, { size: 16, strokeWidth: 2 }) }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: c, children: c }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ p.jsxs(Xt, { onClick: d, className: `simui-fan${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-ic${a ? " cool" : ""}`, children: /* @__PURE__ */ p.jsx(_a, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: c, children: c }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${r}%` : "Off" })
    ] }),
    u && /* @__PURE__ */ p.jsx(
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
        onChange: m
      }
    )
  ] });
}
const ek = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function ik({ entity: s }) {
  const t = Lt(), n = rt(s.entity_id);
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ p.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ p.jsx("div", { className: "simui-row", children: /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }) }),
      /* @__PURE__ */ p.jsx(bs, { value: "Unavailable" })
    ] });
  const r = s.state === "on" || s.state === "off", u = s.state === "on", c = ek.has(n) && r, d = s.attributes.unit_of_measurement ?? "", m = c ? () => {
    t("homeassistant", u ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  } : void 0;
  return /* @__PURE__ */ p.jsxs(Xt, { onClick: m, className: c && u ? "is-on" : "", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      c && /* @__PURE__ */ p.jsx("span", { className: `simui-ic${u ? " cool" : ""}`, children: /* @__PURE__ */ p.jsx(gs, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ p.jsx(
      bs,
      {
        value: `${pt(s.state)}${d ? ` ${d}` : ""}`,
        since: r ? s.last_changed : void 0
      }
    )
  ] });
}
function nk({ entity: s }) {
  const t = Lt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ p.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(Wo, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-pct", children: "Unavailable" })
    ] }) });
  const a = s.state === "on", r = s.attributes.brightness ?? 0, u = a ? Math.max(1, Math.round(r / 255 * 100)) : 0, c = () => {
    t("light", a ? "turn_off" : "turn_on", {}, { entity_id: s.entity_id });
  }, d = (g) => {
    t("light", "turn_on", { brightness_pct: Number(g.target.value) }, { entity_id: s.entity_id });
  }, v = { background: `linear-gradient(to right, ${a ? "var(--warm)" : "var(--faint)"} ${u}%, var(--faint) ${u}%)` };
  return /* @__PURE__ */ p.jsxs(Xt, { onClick: c, className: a ? "is-lit" : "", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-ic${a ? " warm" : ""}`, children: /* @__PURE__ */ p.jsx(Wo, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: `simui-pct${a ? " on" : ""}`, children: a ? `${u}%` : "Off" })
    ] }),
    /* @__PURE__ */ p.jsx(
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
function sk({ entity: s }) {
  const t = Lt();
  if (s.state === "unavailable" || s.state === "unknown")
    return /* @__PURE__ */ p.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(vs, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ p.jsx(bs, { value: "Unavailable", tone: "muted" })
    ] });
  const a = s.state === "locked", r = () => {
    t("lock", a ? "unlock" : "lock", {}, { entity_id: s.entity_id });
  };
  return /* @__PURE__ */ p.jsxs(Xt, { onClick: r, className: a ? "" : "is-unlocked", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: `simui-ic${a ? "" : " amber"}`, children: a ? /* @__PURE__ */ p.jsx(vs, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ p.jsx(Oa, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
    ] }),
    /* @__PURE__ */ p.jsx(bs, { value: a ? "Locked" : "Unlocked", since: s.last_changed, tone: a ? "muted" : "warn" })
  ] });
}
const pa = 16;
function ak(s, t) {
  return new Promise((n) => {
    if (!s || typeof document > "u") {
      n(null);
      return;
    }
    const a = new Image();
    a.crossOrigin = "anonymous", a.decoding = "async";
    const r = (u) => {
      a.onload = null, a.onerror = null, n(t?.aborted ? null : u);
    };
    a.onerror = () => r(null), a.onload = () => {
      if (t?.aborted) {
        r(null);
        return;
      }
      try {
        const u = document.createElement("canvas");
        u.width = pa, u.height = pa;
        const c = u.getContext("2d", { willReadFrequently: !0 });
        if (!c) {
          r(null);
          return;
        }
        c.drawImage(a, 0, 0, pa, pa);
        const { data: d } = c.getImageData(0, 0, pa, pa);
        r(lk(d));
      } catch {
        r(null);
      }
    }, a.src = s;
  });
}
function lk(s) {
  let t = 0, n = 0, a = 0, r = 0, u = 0, c = 0, d = 0, m = 0;
  for (let R = 0; R < s.length; R += 4) {
    const D = s[R], $ = s[R + 1], G = s[R + 2], A = s[R + 3] / 255;
    if (A < 0.5) continue;
    const X = Math.max(D, $, G), F = Math.min(D, $, G);
    if (X < 18 || F > 240) {
      u += D * A, c += $ * A, d += G * A, m += A;
      continue;
    }
    const I = X === 0 ? 0 : (X - F) / X, it = I * I * A;
    t += D * it, n += $ * it, a += G * it, r += it, u += D * A, c += $ * A, d += G * A, m += A;
  }
  let v, g, b;
  if (r > 1e-3)
    v = t / r, g = n / r, b = a / r;
  else if (m > 0)
    v = u / m, g = c / m, b = d / m;
  else
    return null;
  const x = ok(v, g, b), S = x[0], w = rk(x[2], 0.32, 0.66), M = Math.max(x[1], 0.18);
  [v, g, b] = uk(S, M, w);
  const N = Math.round(v), j = Math.round(g), T = Math.round(b);
  return { rgb: `rgb(${N} ${j} ${T})`, r: N, g: j, b: T, h: S, s: M, l: w };
}
function rk(s, t, n) {
  return Math.min(n, Math.max(t, s));
}
function ok(s, t, n) {
  s /= 255, t /= 255, n /= 255;
  const a = Math.max(s, t, n), r = Math.min(s, t, n), u = a - r;
  let c = 0;
  u !== 0 && (a === s ? c = (t - n) / u % 6 : a === t ? c = (n - s) / u + 2 : c = (s - t) / u + 4, c *= 60, c < 0 && (c += 360));
  const d = (a + r) / 2, m = u === 0 ? 0 : u / (1 - Math.abs(2 * d - 1));
  return [c, m, d];
}
function uk(s, t, n) {
  const a = (1 - Math.abs(2 * n - 1)) * t, r = (s % 360 + 360) % 360 / 60, u = a * (1 - Math.abs(r % 2 - 1));
  let c = 0, d = 0, m = 0;
  r >= 0 && r < 1 ? [c, d, m] = [a, u, 0] : r < 2 ? [c, d, m] = [u, a, 0] : r < 3 ? [c, d, m] = [0, a, u] : r < 4 ? [c, d, m] = [0, u, a] : r < 5 ? [c, d, m] = [u, 0, a] : [c, d, m] = [a, 0, u];
  const v = n - a / 2;
  return [(c + v) * 255, (d + v) * 255, (m + v) * 255];
}
function O1(s) {
  const [t, n] = C.useState(null);
  return C.useEffect(() => {
    if (!s) {
      n(null);
      return;
    }
    const a = { aborted: !1 };
    return ak(s, a).then((r) => {
      a.aborted || n(r);
    }), () => {
      a.aborted = !0;
    };
  }, [s]), t;
}
function D1(s) {
  if (s)
    return { "--album-tint": s.rgb };
}
const G0 = { PREV: 16, NEXT: 32 };
function ck({ entity: s }) {
  const t = Lt(), n = s.attributes, a = s.state;
  if (a === "unavailable" || a === "unknown")
    return /* @__PURE__ */ p.jsx(Xt, { className: "is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: "Unavailable" })
    ] }) });
  const u = a === "playing", c = n.media_title, d = n.media_artist ?? n.media_album_name ?? n.app_name, m = n.entity_picture, v = !!c, g = O1(m), b = (x) => {
    t("media_player", x, void 0, { entity_id: s.entity_id });
  };
  return v ? /* @__PURE__ */ p.jsx(Xt, { style: D1(g), className: g ? "is-album-tinted" : "", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-np", children: [
    m ? /* @__PURE__ */ p.jsx("img", { className: "simui-art", src: m, alt: "" }) : /* @__PURE__ */ p.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-title", title: c, children: c }),
      d && /* @__PURE__ */ p.jsx("span", { className: "simui-artist", title: d, children: d })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-tp", children: [
      Et(s, G0.PREV) && /* @__PURE__ */ p.jsx("button", { "aria-label": "Previous", onClick: () => b("media_previous_track"), children: /* @__PURE__ */ p.jsx(Ob, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ p.jsx("button", { className: "play", "aria-label": u ? "Pause" : "Play", onClick: () => b("media_play_pause"), children: u ? /* @__PURE__ */ p.jsx(kb, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ p.jsx(Sa, { size: 15, fill: "currentColor" }) }),
      Et(s, G0.NEXT) && /* @__PURE__ */ p.jsx("button", { "aria-label": "Next", onClick: () => b("media_next_track"), children: /* @__PURE__ */ p.jsx(Db, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ p.jsxs(Xt, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: pt(a) })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ p.jsx("button", { className: "play", "aria-label": "Play", onClick: () => b("media_play_pause"), children: /* @__PURE__ */ p.jsx(Sa, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function hk({ values: s, width: t = 116, height: n = 26 }) {
  if (s.length < 2) return null;
  const a = Math.min(...s), u = Math.max(...s) - a || 1, c = t / (s.length - 1), d = s.map((m, v) => `${(v * c).toFixed(1)},${(n - (m - a) / u * n).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ p.jsx(
    "svg",
    {
      className: "simui-spark",
      width: t,
      height: n,
      viewBox: `0 0 ${t} ${n}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ p.jsx(
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
const cd = /* @__PURE__ */ new Map(), dk = 40;
function fk({ entity: s }) {
  const t = s.attributes, n = t.unit_of_measurement ?? "", a = t.device_class === "temperature", r = s.state === "unavailable" || s.state === "unknown", u = Number(s.state), c = !r && s.state !== "" && !Number.isNaN(u), d = C.useRef(""), [, m] = C.useState(0);
  if (C.useEffect(() => {
    if (!c || d.current === s.state) return;
    d.current = s.state;
    const S = cd.get(s.entity_id) ?? [];
    for (S.push(u); S.length > dk; ) S.shift();
    cd.set(s.entity_id, S), m((w) => w + 1);
  }, [s.entity_id, s.state, c, u]), r)
    return /* @__PURE__ */ p.jsxs(Xt, { className: "is-unavailable", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
        a && /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(Na, { size: 15, strokeWidth: 2 }) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) })
      ] }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: /* @__PURE__ */ p.jsx("span", { className: "simui-big", children: "—" }) })
    ] });
  const v = cd.get(s.entity_id) ?? [], g = v.length > 1 ? u - v[0] : 0, b = c && Math.abs(g) >= 0.05, x = a ? "°" : "";
  return /* @__PURE__ */ p.jsxs(Xt, { children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      a && /* @__PURE__ */ p.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ p.jsx(Na, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: P(s), children: P(s) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      b && /* @__PURE__ */ p.jsxs("span", { className: `simui-delta ${g > 0 ? "up" : "down"}`, children: [
        g > 0 ? "▲" : "▼",
        " ",
        ms(Math.abs(g)),
        x
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ p.jsxs("span", { className: "simui-big", children: [
        c ? ms(u) : s.state,
        n ? /* @__PURE__ */ p.jsxs("span", { className: "simui-unit", children: [
          " ",
          n
        ] }) : null
      ] }),
      c && v.length > 1 && /* @__PURE__ */ p.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ p.jsx(hk, { values: v, width: 64, height: 22 }) })
    ] })
  ] });
}
const hd = { STOP: 8, RETURN_HOME: 16, START: 8192 }, mk = /* @__PURE__ */ new Set(["cleaning", "returning"]);
function pk({ entity: s }) {
  const t = Lt(), n = s.state === "unavailable" || s.state === "unknown", a = mk.has(s.state), r = P(s), u = (c) => {
    t("vacuum", c, {}, { entity_id: s.entity_id });
  };
  return n ? /* @__PURE__ */ p.jsx(Xt, { className: "simui-vacuum is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: r, children: r }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ p.jsxs(Xt, { className: `simui-vacuum${a ? " is-on" : ""}`, children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: r, children: r }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ p.jsx(bs, { value: pt(s.state), since: s.last_changed, tone: a ? "on" : "muted" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-controls", children: [
      Et(s, hd.START) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Start", onClick: () => u("start"), children: /* @__PURE__ */ p.jsx(Sa, { size: 13, strokeWidth: 2, fill: "currentColor" }) }),
      Et(s, hd.STOP) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => u("stop"), children: /* @__PURE__ */ p.jsx(Ma, { size: 12, strokeWidth: 2 }) }),
      Et(s, hd.RETURN_HOME) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Return to base", onClick: () => u("return_to_base"), children: /* @__PURE__ */ p.jsx(Jd, { size: 14, strokeWidth: 2 }) })
    ] })
  ] });
}
const vk = {
  "clear-night": wS,
  cloudy: eS,
  exceptional: qo,
  fog: Z_,
  hail: Hh,
  lightning: kg,
  "lightning-rainy": kg,
  partlycloudy: Nb,
  pouring: F_,
  rainy: K_,
  snowy: Hh,
  "snowy-rainy": Hh,
  sunny: Ho,
  windy: qo,
  "windy-variant": qo
};
function K0(s) {
  return vk[s] ?? Nb;
}
function gk(s) {
  if (!s) return "";
  const t = Date.parse(s);
  return Number.isNaN(t) ? "" : new Date(t).toLocaleDateString(void 0, { weekday: "short" });
}
function bk({ entity: s }) {
  const t = s.state === "unavailable" || s.state === "unknown", n = s.attributes, a = n.temperature, r = n.temperature_unit ?? "°", u = s.state, c = K0(u), d = P(s), m = (Array.isArray(n.forecast) ? n.forecast : []).slice(0, 4);
  return t ? /* @__PURE__ */ p.jsx(Xt, { className: "simui-weather is-unavailable", children: /* @__PURE__ */ p.jsxs("div", { className: "simui-row", children: [
    /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: d, children: d }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: pt(s.state) })
  ] }) }) : /* @__PURE__ */ p.jsxs(Xt, { className: "simui-weather", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-wx-head", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-wx-ic", children: /* @__PURE__ */ p.jsx(c, { size: 26, strokeWidth: 1.75 }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "simui-wx-now", children: [
        /* @__PURE__ */ p.jsxs("span", { className: "simui-wx-temp", children: [
          a != null ? ms(a) : "—",
          /* @__PURE__ */ p.jsx("span", { className: "simui-unit", children: r })
        ] }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-wx-cond", title: d, children: pt(u) })
      ] })
    ] }),
    m.length > 0 && /* @__PURE__ */ p.jsx("div", { className: "simui-wx-fc", children: m.map((v, g) => {
      const b = K0(v.condition ?? "");
      return /* @__PURE__ */ p.jsxs("div", { className: "simui-wx-fcd", children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-wx-fcl", children: gk(v.datetime) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-wx-fci", children: /* @__PURE__ */ p.jsx(b, { size: 14, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ p.jsxs("span", { className: "simui-wx-fct", children: [
          v.temperature != null ? ms(v.temperature) : "—",
          "°"
        ] })
      ] }, v.datetime ?? g);
    }) })
  ] });
}
const yk = {
  light: nk,
  sensor: fk,
  climate: Ij,
  media_player: ck,
  cover: Fj,
  lock: sk,
  camera: Zj,
  weather: bk,
  fan: tk,
  vacuum: pk,
  scene: Ro,
  script: Ro,
  button: Ro,
  input_button: Ro
};
function A1(s) {
  return yk[s] ?? ik;
}
function xk({ block: s }) {
  const t = s.entityIds[0], n = ke(t), a = A1(rt(t));
  return n ? /* @__PURE__ */ p.jsx(a, { entity: n }) : /* @__PURE__ */ p.jsxs("div", { className: "simui-tile", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-row", children: /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: t, children: t }) }),
    /* @__PURE__ */ p.jsx("span", { className: "simui-state", children: "Unavailable" })
  ] });
}
class nu extends C.Component {
  constructor() {
    super(...arguments);
    os(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  // The boundary IS the handling — swallow rather than spew console noise.
  componentDidCatch(n, a) {
  }
  componentDidUpdate(n) {
    this.state.failed && (n.children !== this.props.children || n.resetKey !== this.props.resetKey) && this.setState({ failed: !1 });
  }
  render() {
    return this.state.failed ? this.props.fallback !== void 0 ? this.props.fallback : this.props.compact ? /* @__PURE__ */ p.jsx("div", { className: "simui-eb-compact", role: "status", children: this.props.label ? `${this.props.label} unavailable` : "Unavailable" }) : /* @__PURE__ */ p.jsxs("div", { className: "simui-eb-full", role: "alert", children: [
      /* @__PURE__ */ p.jsx("div", { className: "simui-eb-title", children: "Something went wrong" }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-eb-body", children: "A part of the panel failed to render. Navigate away and back, or reload to recover." })
    ] }) : this.props.children;
  }
}
function wk({ block: s }) {
  return s.chart ? /* @__PURE__ */ p.jsx("div", { className: "simui-surface card", children: /* @__PURE__ */ p.jsx(nu, { fallback: /* @__PURE__ */ p.jsx("div", { className: "simui-chart-fallback", children: "Chart unavailable" }), children: /* @__PURE__ */ p.jsx(N1, { spec: s.chart }) }) }) : null;
}
const R1 = (s) => s === 2 ? " span-2" : s === "full" ? " span-full" : "", _k = (s) => s === 2 ? "2×" : s === "full" ? "Full" : "1×";
function L1({ block: s }) {
  switch (s.type) {
    case "hero":
      return /* @__PURE__ */ p.jsx(jN, { block: s });
    case "group":
      return /* @__PURE__ */ p.jsx(Tj, { block: s });
    case "list":
      return /* @__PURE__ */ p.jsx(Yj, { block: s });
    case "chart":
      return /* @__PURE__ */ p.jsx(wk, { block: s });
    case "card":
      return /* @__PURE__ */ p.jsx(xk, { block: s });
    case "attention":
      return /* @__PURE__ */ p.jsx(uN, { entities: s.entityIds });
    default:
      return null;
  }
}
function B1({ block: s }) {
  return $e((n) => {
    const a = s.visibleWhen;
    if (!a) return !0;
    const r = n[a.entity];
    return U1(a, r?.state, Number(r?.state));
  }) ? /* @__PURE__ */ p.jsx("div", { className: `simui-block${R1(s.span)}`, children: /* @__PURE__ */ p.jsx(L1, { block: s }) }) : null;
}
function U1(s, t, n) {
  if (s.state != null) {
    const a = Array.isArray(s.state) ? s.state : [s.state];
    if (t == null || !a.includes(t)) return !1;
  }
  return !(s.above != null && !(n > s.above) || s.below != null && !(n < s.below));
}
function rf({ block: s, editing: t }) {
  const { removeBlock: n, cycleBlockSpan: a } = Ss(), r = $e((x) => {
    const S = s.visibleWhen;
    if (!S) return !0;
    const w = x[S.entity];
    return U1(S, w?.state, Number(w?.state));
  }), { attributes: u, listeners: c, setNodeRef: d, transform: m, transition: v, isDragging: g } = Q2({
    id: s.id,
    disabled: !t
  });
  if (!r && !t) return null;
  const b = {
    transform: ql.Transform.toString(m),
    transition: v,
    zIndex: g ? 20 : void 0
  };
  return /* @__PURE__ */ p.jsxs(
    "div",
    {
      ref: d,
      style: b,
      className: `simui-block${R1(s.span)}${t ? " editing" : ""}${g ? " dragging" : ""}`,
      children: [
        /* @__PURE__ */ p.jsx(L1, { block: s }),
        t && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx("div", { className: "simui-card-grab", ...u, ...c, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ p.jsx("button", { className: "simui-card-btn size", onPointerDown: (x) => x.stopPropagation(), onClick: () => a(s.id), "aria-label": "Cycle width", children: _k(s.span) }),
          /* @__PURE__ */ p.jsx("button", { className: "simui-card-btn x", onPointerDown: (x) => x.stopPropagation(), onClick: () => n(s.id), "aria-label": "Remove block", children: "×" })
        ] })
      ]
    }
  );
}
function of({ existing: s, onAdd: t, onClose: n }) {
  const a = Xd(), [r, u] = C.useState(""), c = new Set(s), d = r.toLowerCase(), m = Object.values(a).filter((v) => !c.has(v.entity_id)).filter((v) => P(v).toLowerCase().includes(d) || v.entity_id.includes(d)).sort((v, g) => P(v).localeCompare(P(g))).slice(0, 200);
  return /* @__PURE__ */ p.jsx("div", { className: "simui-modal", onClick: n, children: /* @__PURE__ */ p.jsxs("div", { className: "simui-modal-card", onClick: (v) => v.stopPropagation(), children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ p.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: r,
          onChange: (v) => u(v.target.value)
        }
      ),
      /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: n, "aria-label": "Close", children: /* @__PURE__ */ p.jsx(Lb, { size: 16 }) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-modal-list", children: [
      m.map((v) => /* @__PURE__ */ p.jsxs("div", { className: "simui-add-row", onClick: () => t(v.entity_id), children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-name", title: v.entity_id, children: P(v) }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-add-dom", children: rt(v.entity_id) })
      ] }, v.entity_id)),
      m.length === 0 && /* @__PURE__ */ p.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function Sk(s, t) {
  return t === "above_horizon" ? s < 8 ? "dawn" : s >= 18 ? "dusk" : "day" : t === "below_horizon" ? s >= 5 && s < 8 ? "dawn" : s >= 18 && s < 21 ? "dusk" : "night" : s < 5 ? "night" : s < 8 ? "dawn" : s < 18 ? "day" : s < 21 ? "dusk" : "night";
}
const Mk = {
  dawn: { hue: "var(--pink)", base: 0.55 },
  // rose first light
  day: { hue: "var(--warm)", base: 0.42 },
  // warm, low — daylight carries the room
  dusk: { hue: "var(--violet)", base: 0.62 },
  // violet wind-down
  night: { hue: "var(--slate)", base: 0.34 }
  // deep, cool, quiet
};
function Nk(s, t) {
  const n = t && t.length ? t.filter((m) => m.startsWith("light.")) : Object.keys(s).filter((m) => m.startsWith("light."));
  let a = 0;
  if (n.length) {
    const m = n.reduce((v, g) => v + (s[g]?.state === "on" ? 1 : 0), 0);
    a = Math.round(m / n.length * 10);
  }
  let r = 0;
  for (const m in s)
    if (m.charCodeAt(0) === 99 && m.startsWith("climate.") && s[m]?.attributes?.hvac_action === "cooling") {
      r = 1;
      break;
    }
  const u = s["sun.sun"]?.state ?? "", c = Sk((/* @__PURE__ */ new Date()).getHours(), String(u));
  return (c === "night" ? 0 : c === "dawn" ? 1 : c === "day" ? 2 : 3) * 100 + r * 20 + a;
}
function Ck(s) {
  const t = Math.floor(s / 100), n = t === 0 ? "night" : t === 1 ? "dawn" : t === 2 ? "day" : "dusk", a = Math.floor(s % 100 / 20) === 1, r = s % 20;
  return { phase: n, cooling: a, warm: r };
}
function H1({
  mode: s = "field",
  lightIds: t,
  maxOpacity: n,
  className: a
}) {
  const r = $e((M) => Nk(M, t)), { phase: u, cooling: c, warm: d } = C.useMemo(() => Ck(r), [r]), m = Mk[u], v = d / 10, g = n ?? (s === "dots" ? 0.16 : 0.2), b = g * 0.3, x = Math.min(g, b + v * (g - b) * m.base * 1.6 + m.base * (g - b) * 0.5), S = Math.min(g, b + v * (g - b) * 1.2 + m.base * (g - b) * 0.4), w = {
    "--amb-phase": m.hue,
    // Warm bloom strength: present once any light is on, scaled by the fraction.
    "--amb-warm": v.toFixed(2),
    // Cool wash: only ignites while a climate entity is actively cooling.
    "--amb-cool": c ? "1" : "0",
    "--amb-opacity": (s === "dots" ? S : x).toFixed(3)
  };
  return /* @__PURE__ */ p.jsx(
    "div",
    {
      className: `simui-ambient-canvas is-${s}${a ? ` ${a}` : ""}`,
      "data-phase": u,
      "aria-hidden": "true",
      style: w
    }
  );
}
function Ek() {
  const s = (/* @__PURE__ */ new Date()).getHours();
  return s < 5 ? "Good night" : s < 12 ? "Good morning" : s < 18 ? "Good afternoon" : "Good evening";
}
function jk() {
  const { config: s, openRoom: t, editing: n, setEditing: a, reorderBlocks: r, addCard: u, createHomeOverride: c, resetHomeOverride: d } = Ss(), m = Xd(), v = ou(), [g, b] = C.useState(!1), x = Hd(Ud(Il, { activationConstraint: { distance: 5 } })), S = C.useMemo(() => Object.keys(m).sort().join(","), [m]), w = C.useMemo(() => qb({ states: m }), [S, v]), M = s ? s.rooms.map((A) => A.id).join(",") : "", N = C.useMemo(
    () => s ? s.rooms.flatMap((A) => A.blocks.flatMap((X) => X.entityIds)).filter((A) => A.startsWith("light.")) : [],
    [M]
    // eslint-disable-line react-hooks/exhaustive-deps
  ), j = s?.overrides?.home, T = j ? j.blocks : w.blocks, R = T.map((A) => A.id), D = () => {
    if (n) {
      a(!1);
      return;
    }
    j || c(w.blocks), a(!0);
  }, $ = () => {
    d(), a(!1);
  }, G = (A) => {
    const { active: X, over: F } = A;
    if (!F || X.id === F.id) return;
    const I = R.indexOf(String(X.id)), it = R.indexOf(String(F.id));
    I >= 0 && it >= 0 && r(I, it);
  };
  return s ? /* @__PURE__ */ p.jsxs("div", { className: "simui-app simui-home", children: [
    /* @__PURE__ */ p.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-head-title", children: Ek() }),
      /* @__PURE__ */ p.jsx(kk, { config: s }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      n && j && /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: $, "aria-label": "Reset home", children: /* @__PURE__ */ p.jsx(zb, { size: 15 }) }),
      n && /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: () => b(!0), "aria-label": "Add card", children: /* @__PURE__ */ p.jsx(tr, { size: 16 }) }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          className: `simui-iconbtn-h${n ? " active" : ""}`,
          onClick: D,
          "aria-label": n ? "Done editing" : "Edit home",
          children: n ? /* @__PURE__ */ p.jsx(Wd, { size: 16 }) : /* @__PURE__ */ p.jsx(Id, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-content simui-home-content", children: [
      /* @__PURE__ */ p.jsx(H1, { lightIds: N }),
      /* @__PURE__ */ p.jsxs("div", { className: "simui-home-layer", children: [
        w.statusStrip && w.statusStrip.length > 0 && /* @__PURE__ */ p.jsx(Jb, { pills: w.statusStrip }),
        T.length > 0 && (j ? /* @__PURE__ */ p.jsx(Vd, { sensors: x, collisionDetection: qd, onDragEnd: G, children: /* @__PURE__ */ p.jsx(Kd, { items: R, strategy: Fl, children: /* @__PURE__ */ p.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((A) => /* @__PURE__ */ p.jsx(rf, { block: A, editing: n }, A.id)) }) }) }) : /* @__PURE__ */ p.jsx("div", { className: "simui-grid simui-surface-grid simui-home-summary", children: T.map((A) => /* @__PURE__ */ p.jsx(B1, { block: A }, A.id)) })),
        /* @__PURE__ */ p.jsx("div", { className: "simui-rooms-head", children: "Rooms" }),
        /* @__PURE__ */ p.jsx("div", { className: "simui-home-grid", children: s.rooms.map((A) => /* @__PURE__ */ p.jsx(hM, { room: A, onOpen: () => t(A.id) }, A.id)) })
      ] })
    ] }),
    g && /* @__PURE__ */ p.jsx(
      of,
      {
        existing: T.flatMap((A) => A.entityIds),
        onAdd: u,
        onClose: () => b(!1)
      }
    )
  ] }) : null;
}
function kk({ config: s }) {
  const t = $e((n) => {
    const r = s.rooms.flatMap((c) => c.blocks.flatMap((d) => d.entityIds)).filter((c) => c.startsWith("light.")).filter((c) => n[c]?.state === "on").length, u = s.rooms.length;
    return `${u} ${u === 1 ? "room" : "rooms"}${r ? ` · ${r} lights on` : ""}`;
  });
  return /* @__PURE__ */ p.jsx("span", { className: "simui-head-glance num", children: t });
}
function zk({ room: s }) {
  const { editing: t, setEditing: n, reorderBlocks: a, addCard: r, goHome: u } = Ss(), [c, d] = C.useState(!1), m = Hd(Ud(Il, { activationConstraint: { distance: 5 } })), v = s.blocks.map((x) => x.id), g = C.useMemo(() => Ub(s), [s]), b = (x) => {
    const { active: S, over: w } = x;
    if (!w || S.id === w.id) return;
    const M = v.indexOf(String(S.id)), N = v.indexOf(String(w.id));
    M >= 0 && N >= 0 && a(M, N);
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ p.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ p.jsx("button", { className: "simui-back", onClick: u, "aria-label": "Back to home", children: /* @__PURE__ */ p.jsx(Sb, { size: 18 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-head-title", children: s.name }),
      /* @__PURE__ */ p.jsx(Tk, { room: s, lightIds: g }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      t && /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: () => d(!0), "aria-label": "Add card", children: /* @__PURE__ */ p.jsx(tr, { size: 16 }) }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          className: `simui-iconbtn-h${t ? " active" : ""}`,
          onClick: () => n(!t),
          "aria-label": t ? "Done editing" : "Edit room",
          children: t ? /* @__PURE__ */ p.jsx(Wd, { size: 16 }) : /* @__PURE__ */ p.jsx(Id, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-content simui-room", children: [
      /* @__PURE__ */ p.jsx(Ok, { lightIds: g }),
      /* @__PURE__ */ p.jsx(Vd, { sensors: m, collisionDetection: qd, onDragEnd: b, children: /* @__PURE__ */ p.jsx(Kd, { items: v, strategy: Fl, children: /* @__PURE__ */ p.jsx("div", { className: "simui-grid", children: s.blocks.map((x) => /* @__PURE__ */ p.jsx(rf, { block: x, editing: t }, x.id)) }) }) })
    ] }),
    c && /* @__PURE__ */ p.jsx(
      of,
      {
        existing: s.blocks.flatMap((x) => x.entityIds),
        onAdd: r,
        onClose: () => d(!1)
      }
    )
  ] });
}
function Tk({ room: s, lightIds: t }) {
  const n = $e((a) => Bb(s, t, a));
  return n ? /* @__PURE__ */ p.jsx("span", { className: "simui-head-glance num", children: n }) : null;
}
function Ok({ lightIds: s }) {
  const n = 0.04 + $e((a) => {
    if (!s.length) return 0;
    const r = s.filter((u) => a[u]?.state === "on").length;
    return Math.round(r / s.length * 10) / 10;
  }) * 0.13;
  return /* @__PURE__ */ p.jsx("div", { className: "simui-ambient", style: { "--amb": String(n) } });
}
const Dk = /* @__PURE__ */ new Set(["lights", "climate"]), Ak = {
  lights: "lights",
  climate: "climate",
  sensors: "sensors",
  power: "power",
  security: "security",
  server: "server"
}, Rk = {
  lights: "Lights",
  climate: "Climate",
  media: "Media",
  security: "Security",
  sensors: "Sensors",
  power: "Power",
  scenes: "Scenes",
  server: "System"
};
function Lk({ categoryId: s }) {
  const t = Xd(), n = ou(), a = J2(), { config: r, goHome: u, editing: c, setEditing: d, reorderBlocks: m, addCard: v, createOverride: g, resetOverride: b } = Ss(), [x, S] = C.useState(!1), w = Hd(Ud(Il, { activationConstraint: { distance: 5 } })), M = C.useMemo(() => Object.keys(t).sort().join(","), [t]), N = C.useMemo(() => {
    const I = Ak[s], it = I ? wN(I) : void 0;
    return it ? it.build({ states: t, areas: n, registry: a }) : Bk(s, t);
  }, [s, M, n, a]), j = r?.overrides?.[`category:${s}`], T = j ? j.blocks : N.blocks, R = T.map((I) => I.id), D = Rk[s] ?? s, $ = Dk.has(s), G = C.useMemo(
    () => $ ? T.flatMap((I) => I.entityIds).filter((I) => I.startsWith("light.")) : [],
    [$, T]
  ), A = (I) => {
    const { active: it, over: nt } = I;
    if (!nt || it.id === nt.id) return;
    const yt = R.indexOf(String(it.id)), bt = R.indexOf(String(nt.id));
    yt >= 0 && bt >= 0 && m(yt, bt);
  }, X = () => {
    if (c) {
      d(!1);
      return;
    }
    j || g(s, N.blocks), d(!0);
  }, F = () => {
    b(s), d(!1);
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ p.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ p.jsx("button", { className: "simui-back", onClick: u, "aria-label": "Back to home", children: /* @__PURE__ */ p.jsx(Sb, { size: 18 }) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-head-title", children: D }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-spacer" }),
      c && j && /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: F, "aria-label": "Reset to preset", children: /* @__PURE__ */ p.jsx(zb, { size: 15 }) }),
      c && /* @__PURE__ */ p.jsx("button", { className: "simui-iconbtn-h", onClick: () => S(!0), "aria-label": "Add card", children: /* @__PURE__ */ p.jsx(tr, { size: 16 }) }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          className: `simui-iconbtn-h${c ? " active" : ""}`,
          onClick: X,
          "aria-label": c ? "Done editing" : "Edit surface",
          children: c ? /* @__PURE__ */ p.jsx(Wd, { size: 16 }) : /* @__PURE__ */ p.jsx(Id, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: `simui-content${$ ? " simui-cat-content" : ""}`, children: [
      $ && /* @__PURE__ */ p.jsx(H1, { mode: "field", lightIds: G, maxOpacity: 0.12 }),
      /* @__PURE__ */ p.jsxs("div", { className: $ ? "simui-cat-layer" : void 0, children: [
        N.statusStrip && N.statusStrip.length > 0 && /* @__PURE__ */ p.jsx(Jb, { pills: N.statusStrip }),
        T.length ? j ? /* @__PURE__ */ p.jsx(Vd, { sensors: w, collisionDetection: qd, onDragEnd: A, children: /* @__PURE__ */ p.jsx(Kd, { items: R, strategy: Fl, children: /* @__PURE__ */ p.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((I) => /* @__PURE__ */ p.jsx(rf, { block: I, editing: c }, I.id)) }) }) }) : /* @__PURE__ */ p.jsx("div", { className: "simui-grid simui-surface-grid", children: T.map((I) => /* @__PURE__ */ p.jsx(B1, { block: I }, I.id)) }) : /* @__PURE__ */ p.jsxs("div", { className: "simui-msg", children: [
          "Nothing in ",
          D.toLowerCase(),
          " yet."
        ] })
      ] })
    ] }),
    x && /* @__PURE__ */ p.jsx(
      of,
      {
        existing: T.flatMap((I) => I.entityIds),
        onAdd: v,
        onClose: () => S(!1)
      }
    )
  ] });
}
function Bk(s, t) {
  const n = { blocks: [] };
  if (s === "media") {
    const a = Hn(t, "media_player").filter(ae);
    for (const r of a)
      n.blocks.push({ id: zt("cat-media"), type: "card", entityIds: [r.entity_id], span: 2 });
    return n;
  }
  if (s === "scenes") {
    const a = [...Hn(t, "scene"), ...Hn(t, "script")].filter(ae).map((r) => r.entity_id);
    return a.length && n.blocks.push({ id: zt("cat-scenes"), type: "group", title: "Scenes & scripts", axis: "function", entityIds: a, span: "full" }), n;
  }
  return n;
}
function Uk({
  hs: s,
  onChange: t,
  size: n = 200,
  label: a = "Colour"
}) {
  const r = C.useRef(null), u = C.useRef(!1), c = C.useId(), [d, m] = s, v = d * Math.PI / 180, g = Math.min(1, Math.max(0, m / 100)), b = 0.5 + Math.cos(v) * 0.5 * g, x = 0.5 + Math.sin(v) * 0.5 * g, S = C.useCallback(
    (T, R) => {
      const D = r.current;
      if (!D) return s;
      const $ = D.getBoundingClientRect(), G = (T - $.left) / $.width - 0.5, A = (R - $.top) / $.height - 0.5;
      let X = Math.atan2(A, G) * 180 / Math.PI;
      X < 0 && (X += 360);
      const F = Math.min(1, Math.hypot(G, A) / 0.5);
      return [Math.round(X), Math.round(F * 100)];
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
  }, []), j = C.useCallback(
    (T) => {
      switch (T.key) {
        case "ArrowRight":
          T.preventDefault(), t([(d + 6) % 360, m]);
          break;
        case "ArrowLeft":
          T.preventDefault(), t([(d - 6 + 360) % 360, m]);
          break;
        case "ArrowUp":
          T.preventDefault(), t([d, Math.min(100, m + 6)]);
          break;
        case "ArrowDown":
          T.preventDefault(), t([d, Math.max(0, m - 6)]);
          break;
        case "Home":
          T.preventDefault(), t([d, 100]);
          break;
        case "End":
          T.preventDefault(), t([d, 0]);
          break;
      }
    },
    [d, m, t]
  );
  return /* @__PURE__ */ p.jsxs(
    "div",
    {
      ref: r,
      className: "simui-wheel",
      role: "slider",
      tabIndex: 0,
      "aria-label": a,
      "aria-labelledby": c,
      "aria-valuetext": `Hue ${d} degrees, saturation ${m} percent`,
      "aria-valuemin": 0,
      "aria-valuemax": 360,
      "aria-valuenow": d,
      style: { width: n, height: n },
      onPointerDown: w,
      onPointerMove: M,
      onPointerUp: N,
      onPointerCancel: N,
      onKeyDown: j,
      children: [
        /* @__PURE__ */ p.jsx("span", { id: c, className: "simui-sr-only", children: a }),
        /* @__PURE__ */ p.jsx("div", { className: "simui-wheel-disc", "aria-hidden": "true" }),
        /* @__PURE__ */ p.jsx(
          "div",
          {
            className: "simui-wheel-thumb",
            "aria-hidden": "true",
            style: {
              left: `${b * 100}%`,
              top: `${x * 100}%`,
              background: `hsl(${d} ${m}% 50%)`
            }
          }
        )
      ]
    }
  );
}
const rn = 270, va = 135, zl = 200, Bn = zl / 2, Bo = 78, dd = 12;
function fd({
  value: s,
  min: t,
  max: n,
  step: a = 0.5,
  current: r,
  unit: u = "°",
  tint: c = "muted",
  label: d = "Target temperature",
  onChange: m,
  size: v = 200
}) {
  const g = C.useRef(null), b = C.useRef(!1), x = Math.max(1e-4, n - t), S = qk((s - t) / x), w = c === "warm" ? "var(--warm)" : c === "cool" ? "var(--cool)" : "var(--accent)", M = C.useCallback(
    (A) => {
      const X = Math.round((A - t) / a) * a + t, F = Math.round(X / a) * a;
      return Hk(Number(F.toFixed(4)), t, n);
    },
    [t, n, a]
  ), N = C.useCallback(
    (A, X) => {
      const F = g.current;
      if (!F) return s;
      const I = F.getBoundingClientRect(), it = (A - I.left) / I.width * zl - Bn, nt = (X - I.top) / I.height * zl - Bn;
      let bt = Math.atan2(nt, it) * 180 / Math.PI - va;
      for (; bt < 0; ) bt += 360;
      return bt > rn && (bt = bt - rn > (360 - rn) / 2 ? 0 : rn), M(t + bt / rn * x);
    },
    [s, M, t, x]
  ), j = C.useCallback(
    (A) => {
      A.preventDefault(), b.current = !0, A.currentTarget.setPointerCapture?.(A.pointerId), m(N(A.clientX, A.clientY));
    },
    [N, m]
  ), T = C.useCallback(
    (A) => {
      b.current && m(N(A.clientX, A.clientY));
    },
    [N, m]
  ), R = C.useCallback((A) => {
    b.current = !1, A.currentTarget.releasePointerCapture?.(A.pointerId);
  }, []), D = C.useCallback(
    (A) => {
      switch (A.key) {
        case "ArrowRight":
        case "ArrowUp":
          A.preventDefault(), m(M(s + a));
          break;
        case "ArrowLeft":
        case "ArrowDown":
          A.preventDefault(), m(M(s - a));
          break;
        case "Home":
          A.preventDefault(), m(t);
          break;
        case "End":
          A.preventDefault(), m(n);
          break;
      }
    },
    [s, a, M, m, t, n]
  ), $ = rn / 360 * 2 * Math.PI * Bo, G = Td(va + S * rn, Bo);
  return /* @__PURE__ */ p.jsxs(
    "svg",
    {
      ref: g,
      className: "simui-dial",
      role: "slider",
      tabIndex: 0,
      "aria-label": d,
      "aria-valuemin": t,
      "aria-valuemax": n,
      "aria-valuenow": s,
      "aria-valuetext": `${md(s)}${u}`,
      viewBox: `0 0 ${zl} ${zl}`,
      width: v,
      height: v,
      onPointerDown: j,
      onPointerMove: T,
      onPointerUp: R,
      onPointerCancel: R,
      onKeyDown: D,
      children: [
        /* @__PURE__ */ p.jsx(
          "path",
          {
            className: "simui-dial-track",
            d: X0(va, va + rn, Bo),
            fill: "none",
            strokeWidth: dd,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ p.jsx(
          "path",
          {
            className: "simui-dial-prog",
            d: X0(va, va + S * rn, Bo),
            fill: "none",
            stroke: w,
            strokeWidth: dd,
            strokeLinecap: "round",
            style: { strokeDasharray: $, transition: "stroke 0.2s ease" }
          }
        ),
        /* @__PURE__ */ p.jsx(
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
        /* @__PURE__ */ p.jsxs("text", { className: "simui-dial-value", x: Bn, y: Bn - 2, textAnchor: "middle", fill: "var(--text)", children: [
          md(s),
          /* @__PURE__ */ p.jsx("tspan", { className: "simui-dial-unit", fill: "var(--muted)", children: u })
        ] }),
        r != null && /* @__PURE__ */ p.jsxs("text", { className: "simui-dial-current", x: Bn, y: Bn + 24, textAnchor: "middle", fill: "var(--muted)", children: [
          md(r),
          u,
          " now"
        ] })
      ]
    }
  );
}
function X0(s, t, n) {
  const a = Td(s, n), r = Td(t, n), u = Math.abs(t - s) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${n} ${n} 0 ${u} 1 ${r.x} ${r.y}`;
}
function Td(s, t) {
  const n = s * Math.PI / 180;
  return { x: Bn + Math.cos(n) * t, y: Bn + Math.sin(n) * t };
}
function Hk(s, t, n) {
  return Math.min(n, Math.max(t, s));
}
function qk(s) {
  return Math.min(1, Math.max(0, s));
}
function md(s) {
  return Number.isInteger(s) ? `${s}` : s.toFixed(1);
}
function Od(s, t) {
  const n = C.useRef(s);
  n.current = s;
  const a = C.useRef(0), r = C.useRef(null), u = C.useRef(null);
  return C.useCallback(
    (...c) => {
      u.current = c;
      const d = performance.now(), m = t - (d - a.current);
      m <= 0 ? (a.current = d, u.current = null, n.current(...c)) : r.current == null && (r.current = setTimeout(() => {
        r.current = null, a.current = performance.now();
        const v = u.current;
        u.current = null, v && n.current(...v);
      }, m));
    },
    [t]
  );
}
const Qk = /* @__PURE__ */ new Set(["light", "climate"]);
function $k(s) {
  return Qk.has(rt(s));
}
function uf({ entityId: s }) {
  const t = ke(s);
  if (!t) return null;
  const n = rt(s);
  return n === "light" ? /* @__PURE__ */ p.jsx(Yk, { entity: t }) : n === "climate" ? /* @__PURE__ */ p.jsx(Xk, { entity: t }) : /* @__PURE__ */ p.jsx(Zk, { entity: t, domain: n });
}
const Z0 = /* @__PURE__ */ new Set(["hs", "rgb", "rgbw", "rgbww", "xy"]);
function Yk({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.attributes, r = s.state === "on", u = a.brightness ?? 0, c = r ? Math.max(1, Math.round(u / 255 * 100)) : 0, d = a.supported_color_modes ?? [], m = a.color_mode, v = ($) => a[$] != null, g = d.some(($) => Z0.has($)) || m != null && Z0.has(m) || v("rgb_color") || v("hs_color") || v("rgbw_color") || v("rgbww_color") || v("xy_color"), b = d.includes("color_temp") || m === "color_temp" || v("color_temp") || v("color_temp_kelvin"), x = a.min_color_temp_kelvin ?? 2200, S = a.max_color_temp_kelvin ?? 6500, w = a.color_temp_kelvin ?? Math.round((x + S) / 2), N = a.hs_color ?? [40, 70], j = ($) => {
    t("light", "turn_on", { brightness_pct: $ }, { entity_id: n });
  }, T = ($) => {
    t("light", "turn_on", { color_temp_kelvin: $ }, { entity_id: n });
  }, R = Od(
    ($) => {
      t("light", "turn_on", { hs_color: $ }, { entity_id: n });
    },
    110
  ), D = {
    background: `linear-gradient(to right, var(--warm) ${c}%, var(--faint) ${c}%)`
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom light", children: [
    g && /* @__PURE__ */ p.jsx("div", { className: "simui-bloom-wheelwrap", children: /* @__PURE__ */ p.jsx(Uk, { hs: N, onChange: R, size: 208, label: "Light colour" }) }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom-sliders", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "simui-qc-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Brightness" }),
        /* @__PURE__ */ p.jsx("span", { className: "simui-qc-val num", children: r ? `${c}%` : "Off" })
      ] }),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          className: "simui-slider warm",
          type: "range",
          min: 0,
          max: 100,
          value: c,
          "aria-label": "Brightness",
          style: D,
          onChange: ($) => j(Number($.target.value))
        }
      ),
      b && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        /* @__PURE__ */ p.jsxs("div", { className: "simui-qc-row", children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Temperature" }),
          /* @__PURE__ */ p.jsxs("span", { className: "simui-qc-val num", children: [
            w,
            "K"
          ] })
        ] }),
        /* @__PURE__ */ p.jsx(
          "input",
          {
            className: "simui-temp-ribbon",
            type: "range",
            min: x,
            max: S,
            step: 50,
            value: w,
            "aria-label": "Colour temperature",
            onChange: ($) => T(Number($.target.value))
          }
        )
      ] })
    ] })
  ] });
}
const Vk = /* @__PURE__ */ new Set(["heating", "heat"]), Gk = /* @__PURE__ */ new Set(["cooling", "cool", "fan"]);
function Kk(s) {
  const t = s.attributes.hvac_action, n = s.state;
  return t && Vk.has(t) ? "warm" : t && Gk.has(t) ? "cool" : n === "heat" ? "warm" : n === "cool" ? "cool" : "muted";
}
function Xk({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.attributes, r = a.min_temp ?? 7, u = a.max_temp ?? 35, c = a.target_temp_step ?? 0.5, d = a.current_temperature, m = a.temperature, v = a.target_temp_low, g = a.target_temp_high, b = a.hvac_modes ?? [], x = Kk(s), S = Od(
    (M) => {
      t("climate", "set_temperature", { temperature: M }, { entity_id: n });
    },
    110
  ), w = Od(
    (M, N) => {
      t("climate", "set_temperature", { target_temp_low: M, target_temp_high: N }, { entity_id: n });
    },
    110
  );
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom climate", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-bloom-dialwrap", children: m != null ? /* @__PURE__ */ p.jsx(
      fd,
      {
        value: ds(m, r, u),
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
      /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom-dialpair", children: [
        /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Heat to" }),
          /* @__PURE__ */ p.jsx(
            fd,
            {
              value: ds(v, r, g),
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
        /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom-dialcol", children: [
          /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Cool to" }),
          /* @__PURE__ */ p.jsx(
            fd,
            {
              value: ds(g, v, u),
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
    ) : d != null && /* @__PURE__ */ p.jsxs("div", { className: "simui-bloom-readonly num", children: [
      d,
      "° now"
    ] }) }),
    b.length > 0 && /* @__PURE__ */ p.jsx("div", { className: "simui-seg simui-bloom-modes", role: "group", "aria-label": "HVAC mode", children: b.map((M) => {
      const N = s.state === M;
      return /* @__PURE__ */ p.jsx(
        "button",
        {
          className: `simui-segbtn${N ? " is-active" : ""}`,
          "aria-pressed": N,
          onClick: () => {
            t("climate", "set_hvac_mode", { hvac_mode: M }, { entity_id: n });
          },
          children: pt(M)
        },
        M
      );
    }) })
  ] });
}
function Zk({ entity: s, domain: t }) {
  const n = Wk(t);
  return n.length ? /* @__PURE__ */ p.jsx("div", { className: "simui-bloom feats", children: /* @__PURE__ */ p.jsx(sr, { entity: s, features: n }) }) : null;
}
function Wk(s) {
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
function Ns({ entity: s, omit: t }) {
  const n = s.attributes, a = /* @__PURE__ */ new Set([
    "friendly_name",
    "icon",
    "supported_features",
    "entity_picture",
    ...t ?? []
  ]), r = Object.entries(n).filter(([u]) => !a.has(u)).filter(([, u]) => u != null && u !== "" && (typeof u != "object" || Array.isArray(u)));
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-attrs", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-key", children: "State" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-val num", children: pt(s.state) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-key", children: "Changed" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-val num", children: ru(s.last_changed) || "—" })
    ] }),
    r.map(([u, c]) => /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-key", children: pt(u) }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-val num", children: Jk(c) })
    ] }, u)),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-attr", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-key", children: "Entity" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-val muted", children: s.entity_id })
    ] })
  ] });
}
function Jk(s) {
  return Array.isArray(s) ? s.map((t) => String(t)).join(", ") : typeof s == "number" ? String(s) : typeof s == "boolean" ? s ? "Yes" : "No" : pt(String(s));
}
const Ik = [
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
function Fk({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.attributes, r = a.effect_list ?? [], u = a.effect, c = a.color_mode;
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ p.jsx(uf, { entityId: n }) }),
    c && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-pillrow", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-pilllabel", children: "Colour mode" }),
      /* @__PURE__ */ p.jsx("span", { className: "simui-detail-pillval num", children: pt(c) })
    ] }),
    r.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Effect" }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Effect", children: r.map((d) => {
        const m = u === d;
        return /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `simui-segbtn${m ? " is-active" : ""}`,
            "aria-pressed": m,
            onClick: () => {
              t("light", "turn_on", { effect: d }, { entity_id: n });
            },
            children: pt(d)
          },
          d
        );
      }) })
    ] }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s, omit: [...Ik, "effect", "effect_list", "color_mode"] })
  ] });
}
function Xl({
  value: s,
  unit: t,
  sub: n,
  tone: a,
  since: r
}) {
  const u = r ? ru(r) : "";
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-dh", children: [
    /* @__PURE__ */ p.jsxs("div", { className: `simui-dh-value num${a ? ` ${a}` : ""}`, children: [
      s,
      t && /* @__PURE__ */ p.jsx("span", { className: "simui-dh-unit", children: t })
    ] }),
    n && /* @__PURE__ */ p.jsx("div", { className: "simui-dh-sub", children: n }),
    u && /* @__PURE__ */ p.jsx("div", { className: "simui-dh-since num", children: u })
  ] });
}
const Pk = [
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
function tz(s) {
  const t = s.attributes.hvac_action;
  if (t === "heating" || s.state === "heat") return "warm";
  if (t === "cooling" || t === "fan" || s.state === "cool") return "cool";
}
function ez({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.attributes, r = a.current_temperature, u = a.current_humidity, c = a.hvac_action, d = a.preset_modes ?? [], m = a.preset_mode, v = a.fan_modes ?? [], g = a.fan_mode, b = [
    pt(c || s.state),
    u != null ? `${Math.round(u)}% humidity` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsx(
      Xl,
      {
        value: r != null ? Math.round(r) : "—",
        unit: "°",
        sub: b || void 0,
        tone: tz(s),
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ p.jsx("div", { className: "simui-detail-widget", children: /* @__PURE__ */ p.jsx(uf, { entityId: n }) }),
    d.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Preset" }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Preset mode", children: d.map((x) => {
        const S = m === x;
        return /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_preset_mode", { preset_mode: x }, { entity_id: n });
            },
            children: pt(x)
          },
          x
        );
      }) })
    ] }),
    v.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Fan" }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Fan mode", children: v.map((x) => {
        const S = g === x;
        return /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `simui-segbtn${S ? " is-active" : ""}`,
            "aria-pressed": S,
            onClick: () => {
              t("climate", "set_fan_mode", { fan_mode: x }, { entity_id: n });
            },
            children: pt(x)
          },
          x
        );
      }) })
    ] }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s, omit: [...Pk, "preset_modes", "preset_mode", "fan_modes", "fan_mode"] })
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
function iz({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.attributes, r = s.state, u = r === "playing", c = r === "off" || r === "idle" || r === "standby" || r === "unavailable", d = a.media_title, m = a.media_artist ?? a.media_album_name ?? a.app_name, v = a.entity_picture, g = O1(v), b = a.volume_level, x = a.is_volume_muted === !0, S = a.source_list ?? [], w = a.source, M = Et(s, Li.PLAY) || Et(s, Li.PAUSE) || Et(s, Li.PREV) || Et(s, Li.NEXT), N = (R, D) => {
    t("media_player", R, D, { entity_id: n });
  }, j = b != null ? Math.round(b * 100) : 0, T = {
    background: `linear-gradient(to right, var(--accent) ${j}%, var(--faint) ${j}%)`
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: `simui-md-now${g ? " is-album-tinted" : ""}`,
        style: g ? D1(g) : void 0,
        children: [
          v ? /* @__PURE__ */ p.jsx("img", { className: "simui-md-art", src: v, alt: "" }) : /* @__PURE__ */ p.jsx("div", { className: "simui-md-art" }),
          /* @__PURE__ */ p.jsxs("div", { className: "simui-md-meta", children: [
            d ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
              /* @__PURE__ */ p.jsx("span", { className: "simui-md-title", title: d, children: d }),
              m && /* @__PURE__ */ p.jsx("span", { className: "simui-md-artist", title: m, children: m })
            ] }) : /* @__PURE__ */ p.jsx("span", { className: "simui-md-title", children: pt(r) }),
            d && /* @__PURE__ */ p.jsx("span", { className: "simui-md-state num", children: pt(r) })
          ] })
        ]
      }
    ),
    M && /* @__PURE__ */ p.jsxs("div", { className: "simui-md-transport", children: [
      Et(s, Li.PREV) && /* @__PURE__ */ p.jsx("button", { className: "simui-md-btn", "aria-label": "Previous", onClick: () => N("media_previous_track"), children: /* @__PURE__ */ p.jsx(Ob, { size: 20, fill: "currentColor" }) }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          className: "simui-md-btn play",
          "aria-label": u ? "Pause" : "Play",
          disabled: c,
          onClick: () => N("media_play_pause"),
          children: u ? /* @__PURE__ */ p.jsx(kb, { size: 18, fill: "currentColor" }) : /* @__PURE__ */ p.jsx(Sa, { size: 18, fill: "currentColor" })
        }
      ),
      Et(s, Li.STOP) && /* @__PURE__ */ p.jsx("button", { className: "simui-md-btn", "aria-label": "Stop", onClick: () => N("media_stop"), children: /* @__PURE__ */ p.jsx(Ma, { size: 14, fill: "currentColor" }) }),
      Et(s, Li.NEXT) && /* @__PURE__ */ p.jsx("button", { className: "simui-md-btn", "aria-label": "Next", onClick: () => N("media_next_track"), children: /* @__PURE__ */ p.jsx(Db, { size: 20, fill: "currentColor" }) })
    ] }),
    (Et(s, Li.VOLUME_SET) || b != null) && /* @__PURE__ */ p.jsxs("div", { className: "simui-md-volrow", children: [
      Et(s, Li.VOLUME_MUTE) && /* @__PURE__ */ p.jsx(
        "button",
        {
          className: `simui-iconbtn-h${x ? " active" : ""}`,
          "aria-label": x ? "Unmute" : "Mute",
          "aria-pressed": x,
          onClick: () => N("volume_mute", { is_volume_muted: !x }),
          children: x ? /* @__PURE__ */ p.jsx(Rb, { size: 16 }) : /* @__PURE__ */ p.jsx(Ab, { size: 16 })
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: x ? 0 : j,
          "aria-label": "Volume",
          style: T,
          onChange: (R) => N("volume_set", { volume_level: Number(R.target.value) / 100 })
        }
      ),
      /* @__PURE__ */ p.jsxs("span", { className: "simui-qc-val num", children: [
        j,
        "%"
      ] })
    ] }),
    Et(s, Li.SELECT_SOURCE) && S.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Source" }),
      /* @__PURE__ */ p.jsx("div", { className: "simui-seg simui-detail-seg", role: "group", "aria-label": "Source", children: S.map((R) => {
        const D = w === R;
        return /* @__PURE__ */ p.jsx(
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
    /* @__PURE__ */ p.jsx(
      Ns,
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
function nz({ entity: s }) {
  const t = Lt(), n = s.attributes, a = n.current_position, r = n.current_tilt_position, u = Et(s, Si.SET_POSITION) && a != null, c = Et(s, Si.SET_TILT_POSITION) || Et(s, Si.OPEN_TILT) || Et(s, Si.CLOSE_TILT), d = (g, b) => {
    t("cover", g, b, { entity_id: s.entity_id });
  }, m = a != null ? { background: `linear-gradient(to right, var(--accent) ${a}%, var(--faint) ${a}%)` } : void 0, v = r != null ? { background: `linear-gradient(to right, var(--accent) ${r}%, var(--faint) ${r}%)` } : void 0;
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsx(
      Xl,
      {
        value: a ?? pt(s.state),
        unit: a != null ? "%" : void 0,
        sub: a != null ? pt(s.state) : void 0,
        tone: s.state === "open" ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    u && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsx("span", { className: "simui-qc-label", children: "Position" }),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          className: "simui-slider",
          type: "range",
          min: 0,
          max: 100,
          value: a,
          "aria-label": "Position",
          style: m,
          onChange: (g) => d("set_cover_position", { position: Number(g.target.value) })
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-buttons", children: [
      Et(s, Si.OPEN) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => d("open_cover"), children: /* @__PURE__ */ p.jsx($l, { size: 16, strokeWidth: 2 }) }),
      Et(s, Si.STOP) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => d("stop_cover"), children: /* @__PURE__ */ p.jsx(Ma, { size: 12, strokeWidth: 2 }) }),
      Et(s, Si.CLOSE) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => d("close_cover"), children: /* @__PURE__ */ p.jsx(ps, { size: 16, strokeWidth: 2 }) })
    ] }),
    c && /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-field", children: [
      /* @__PURE__ */ p.jsxs("span", { className: "simui-qc-label", children: [
        "Tilt",
        r != null ? ` · ${r}%` : ""
      ] }),
      Et(s, Si.SET_TILT_POSITION) && r != null && /* @__PURE__ */ p.jsx(
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
      /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-buttons", children: [
        Et(s, Si.OPEN_TILT) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Open tilt", onClick: () => d("open_cover_tilt"), children: /* @__PURE__ */ p.jsx($l, { size: 16, strokeWidth: 2 }) }),
        Et(s, Si.STOP_TILT) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Stop tilt", onClick: () => d("stop_cover_tilt"), children: /* @__PURE__ */ p.jsx(Ma, { size: 12, strokeWidth: 2 }) }),
        Et(s, Si.CLOSE_TILT) && /* @__PURE__ */ p.jsx("button", { className: "simui-sbtn", "aria-label": "Close tilt", onClick: () => d("close_cover_tilt"), children: /* @__PURE__ */ p.jsx(ps, { size: 16, strokeWidth: 2 }) })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s, omit: ["current_position", "current_tilt_position"] })
  ] });
}
function sz({ entity: s }) {
  const t = Lt(), n = s.entity_id, a = s.state === "locked", r = s.state === "locking" || s.state === "unlocking", u = (c) => {
    t("lock", c, {}, { entity_id: n });
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsx(
      Xl,
      {
        value: pt(s.state),
        tone: a ? void 0 : "warn",
        since: s.last_changed
      }
    ),
    /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-buttons wide", children: [
      /* @__PURE__ */ p.jsxs(
        "button",
        {
          className: `simui-segbtn lg${a ? " is-active" : ""}`,
          "aria-pressed": a,
          disabled: r,
          onClick: () => u("lock"),
          children: [
            /* @__PURE__ */ p.jsx(vs, { size: 15, strokeWidth: 2 }),
            " Lock"
          ]
        }
      ),
      /* @__PURE__ */ p.jsxs(
        "button",
        {
          className: `simui-segbtn lg${!a && !r ? " is-active" : ""}`,
          "aria-pressed": !a && !r,
          disabled: r,
          onClick: () => u("unlock"),
          children: [
            /* @__PURE__ */ p.jsx(Oa, { size: 15, strokeWidth: 2 }),
            " Unlock"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s })
  ] });
}
function az({ entity: s }) {
  const n = s.attributes.unit_of_measurement, a = Number.parseFloat(s.state), r = rt(s.entity_id) === "sensor" && s.state !== "" && Number.isFinite(a), u = s.state === "on";
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    r ? /* @__PURE__ */ p.jsx(Xl, { value: lz(a), unit: n, since: s.last_changed }) : /* @__PURE__ */ p.jsx(
      Xl,
      {
        value: pt(s.state),
        tone: u ? "accent" : void 0,
        since: s.last_changed
      }
    ),
    r && /* @__PURE__ */ p.jsx("div", { className: "simui-detail-chart", children: /* @__PURE__ */ p.jsx(k1, { entityId: s.entity_id, accent: "var(--cyan)" }) }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s })
  ] });
}
function lz(s) {
  return Math.abs(s) >= 100 ? Math.round(s).toLocaleString() : s.toFixed(1).replace(/\.0$/, "");
}
function rz({ entityId: s }) {
  const t = ke(s);
  if (!t)
    return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail-empty", children: [
      s,
      " is unavailable."
    ] });
  switch (rt(s)) {
    case "light":
      return /* @__PURE__ */ p.jsx(Fk, { entity: t });
    case "climate":
      return /* @__PURE__ */ p.jsx(ez, { entity: t });
    case "media_player":
      return /* @__PURE__ */ p.jsx(iz, { entity: t });
    case "cover":
      return /* @__PURE__ */ p.jsx(nz, { entity: t });
    case "lock":
      return /* @__PURE__ */ p.jsx(sz, { entity: t });
    case "sensor":
    case "binary_sensor":
      return /* @__PURE__ */ p.jsx(az, { entity: t });
    default:
      return /* @__PURE__ */ p.jsx(oz, { entity: t });
  }
}
function oz({ entity: s }) {
  const t = s.entity_id, n = A1(rt(t));
  return /* @__PURE__ */ p.jsxs("div", { className: "simui-detail", children: [
    /* @__PURE__ */ p.jsx("div", { className: "simui-detail-widget", children: $k(t) ? /* @__PURE__ */ p.jsx(uf, { entityId: t }) : Vl(t) ? /* @__PURE__ */ p.jsx(Gl, { entityId: t }) : /* @__PURE__ */ p.jsx(n, { entity: s }) }),
    /* @__PURE__ */ p.jsx(Ns, { entity: s })
  ] });
}
function uz() {
  const { config: s, route: t, sheetEntityId: n, closeSheet: a } = Ss(), r = t.kind === "home" ? "home" : `${t.kind}/${t.id}`;
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(nu, { compact: !0, label: "This view", resetKey: r, children: /* @__PURE__ */ p.jsx(u, {}) }),
    /* @__PURE__ */ p.jsx(nu, { compact: !0, label: "Detail", resetKey: n ?? "", children: /* @__PURE__ */ p.jsx(cz, { entityId: n, onClose: a }) })
  ] });
  function u() {
    if (!s) return /* @__PURE__ */ p.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
    if (t.kind === "category") return /* @__PURE__ */ p.jsx(Lk, { categoryId: t.id });
    if (!s.rooms.length) return /* @__PURE__ */ p.jsx("div", { className: "simui-msg", children: "No rooms to show yet." });
    if (t.kind === "home") return /* @__PURE__ */ p.jsx(jk, {});
    const c = s.rooms.find((d) => d.id === t.id) ?? s.rooms[0];
    return /* @__PURE__ */ p.jsx(zk, { room: c }, c.id);
  }
}
function cz({ entityId: s, onClose: t }) {
  const n = ke(s ?? ""), a = s ? n ? P(n) : s : void 0;
  return /* @__PURE__ */ p.jsx(j1, { open: !!s, title: a, onClose: t, children: s && /* @__PURE__ */ p.jsx(rz, { entityId: s }) });
}
function hz() {
  return V2() === "live" ? null : /* @__PURE__ */ p.jsxs("div", { className: "simui-conn-banner", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ p.jsx(TS, { size: 13, className: "simui-conn-ic", "aria-hidden": "true" }),
    /* @__PURE__ */ p.jsx("span", { children: "Reconnecting to Home Assistant…" })
  ] });
}
function dz() {
  return /* @__PURE__ */ p.jsxs(nu, { children: [
    /* @__PURE__ */ p.jsx(hz, {}),
    /* @__PURE__ */ p.jsx(c_, { children: /* @__PURE__ */ p.jsx(uz, {}) })
  ] });
}
const fz = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--cool: #5ec8e6;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--violet: #a78bfa;--cyan: #5ec8e6;--pink: #ec8fb8;--teal: #34c0a8;--slate: #7c93c8;--hairline: var(--divider-color, rgba(255,255,255,.06));--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:0 0 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:color-mix(in srgb,var(--text) 4%,var(--surface));border:1px solid transparent;border-radius:16px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease,border-color .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{background:color-mix(in srgb,var(--text) 7.5%,var(--surface))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-erow.is-unavailable,.simui-slidertile.is-unavailable,.simui-tile.is-unavailable,.simui-statusboard.is-unavailable,.simui-metric.is-unavailable{opacity:.4}.simui-slidertile.is-unavailable{cursor:default}.simui-slidertile.is-unavailable .simui-slidertile-fill{display:none}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-state.on{color:var(--accent)}.simui-since{color:var(--muted);opacity:.62;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}.simui-topbar{display:flex;align-items:center;gap:8px;padding:6px 2px 10px}.simui-pills{display:flex;gap:6px;overflow-x:auto;min-width:0;scrollbar-width:none}.simui-pills::-webkit-scrollbar{display:none}.simui-pill{flex:none;padding:6px 13px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,background .12s ease}.simui-pill:hover{color:var(--text)}.simui-pill.active{color:var(--text);background:var(--surface);border-color:var(--faint)}.simui-room{position:relative}.simui-ambient{position:absolute;inset:0 -16px auto;height:300px;z-index:0;pointer-events:none;opacity:var(--amb, .06);background:radial-gradient(120% 80% at 26% 0%,var(--warm),transparent 62%)}.simui-room>.simui-room-head,.simui-room>.simui-grid{position:relative;z-index:1}.simui-room-head{display:flex;align-items:baseline;gap:12px;padding:8px 2px 16px}.simui-room-name{font-size:22px;font-weight:600;letter-spacing:-.3px}.simui-room-glance{font-size:12px;color:var(--muted)}.simui-block{position:relative}.simui-block.span-2{grid-column:span 2}.simui-block.span-full{grid-column:1 / -1}.simui-block.editing .simui-surface,.simui-block.editing .simui-tile,.simui-block.editing .simui-hero{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px;border-radius:var(--radius)}.simui-block.dragging{opacity:.55}.simui-hero{padding:2px 6px 18px}.simui-hero-temp{font-size:46px;font-weight:300;letter-spacing:-1.5px;line-height:.9}.simui-hero-temp small{font-size:20px;color:var(--muted);font-weight:400}.simui-hero-sub{margin-top:8px;font-size:12px;color:var(--muted)}.simui-hero-state{font-size:30px;font-weight:400;letter-spacing:-.8px;line-height:1}.simui-hero.is-state .simui-feats{margin-top:14px}.simui-surface{background:var(--group, rgba(255, 255, 255, .035));border:none;border-radius:20px;padding:15px 16px}.simui-surface-head{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:11px;font-weight:500}.simui-rows{display:flex;flex-direction:column}.simui-rows.divided .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-master{display:flex;align-items:center;gap:10px;margin-bottom:10px}.simui-master-label{font-size:12px;color:var(--muted);width:26px}.simui-master-val{font-size:12px;color:var(--text);min-width:34px;text-align:right}.simui-erow{display:flex;align-items:center;gap:10px;padding:8px 0;min-width:0;width:100%;background:none;border:none;color:inherit;font:inherit;text-align:left}button.simui-erow,.simui-erow.as-row{cursor:pointer}.simui-erow-name{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-erow-name.as-btn{background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-align:left;min-width:0}.simui-erow-name.muted{color:var(--muted)}.simui-erow-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-erow-ic.amber{color:var(--warn)}.simui-erow-ic.cool{color:var(--accent)}.simui-erow-dot{flex:none;width:9px;height:9px;padding:0;border:none;border-radius:50%;background:#4b4f57;cursor:pointer}.simui-erow-dot[data-on=true]{background:var(--warm);box-shadow:0 0 0 3px color-mix(in srgb,var(--warm) 20%,transparent)}.simui-erow-state{font-size:12px;color:var(--muted)}.simui-erow-state.warn{color:var(--warn)}.simui-erow-state.on{color:var(--accent)}.simui-erow-val{font-size:13px;color:var(--text)}.simui-slider.mini{max-width:96px}.simui-rbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer}.simui-rbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--bg);border-bottom:1px solid var(--faint)}.simui-head-title{font-size:20px;font-weight:600;letter-spacing:-.3px;white-space:nowrap}.simui-head-glance{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-back{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;margin-left:-6px;border-radius:9px;border:none;background:transparent;color:var(--muted);cursor:pointer}.simui-back:hover{color:var(--text);background:var(--surface)}.simui-content{padding:16px}.simui-home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}.simui-roomcard{position:relative;display:flex;flex-direction:column;gap:10px;min-height:122px;padding:15px 16px;text-align:left;color:var(--text);background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border:1px solid transparent;border-radius:20px;cursor:pointer;overflow:hidden;transition:background .18s ease,transform .12s ease,box-shadow .18s ease}.simui-roomcard:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface));transform:translateY(-1px);box-shadow:0 6px 22px #00000038}.simui-roomcard:active{transform:translateY(0) scale(.995)}.simui-roomcard.lit{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 20%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 5%,var(--surface))}.simui-roomcard.lit:hover{background:radial-gradient(125% 105% at 100% 0%,color-mix(in srgb,var(--warm) 26%,transparent),transparent 58%),color-mix(in srgb,var(--warm) 7%,var(--surface))}.simui-roomcard-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.simui-roomcard-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:40px;height:40px;border-radius:13px;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-icon.warm{color:var(--warm);background:color-mix(in srgb,var(--warm) 16%,transparent)}.simui-roomcard-icon.amber{color:var(--warn);background:color-mix(in srgb,var(--warn) 16%,transparent)}.simui-roomcard-icon.accent{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.simui-roomcard-name{font-size:15px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-roomcard-go{color:var(--muted);flex:none;opacity:.5}.simui-roomcard-glance{font-size:12px;color:var(--muted);margin-top:auto}.simui-feats{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.simui-feats:empty{display:none}.simui-seg{display:inline-flex;align-items:center;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-segbtn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-width:26px;height:24px;padding:0 8px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,background .12s ease}.simui-segbtn:hover:not(:disabled){color:var(--text)}.simui-segbtn.is-active{background:var(--surface);color:var(--accent)}.simui-segbtn:disabled{opacity:.45;cursor:default}.simui-ftoggle{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 11px;border-radius:999px;border:1px solid var(--faint);background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-ftoggle.is-active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-fsel-wrap{position:relative;display:inline-flex;align-items:center}.simui-fsel{appearance:none;-webkit-appearance:none;height:26px;padding:0 26px 0 10px;border-radius:8px;border:1px solid var(--faint);background:var(--surface-2);color:var(--text);font-size:12px;font-weight:500;cursor:pointer;outline:none}.simui-fsel:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-fsel-caret{position:absolute;right:8px;pointer-events:none;color:var(--muted)}.simui-strip{display:flex;align-items:stretch;gap:8px;overflow-x:auto;min-width:0;margin-bottom:14px;padding-bottom:2px;scrollbar-width:none}.simui-strip::-webkit-scrollbar{display:none}.simui-pill-count,.simui-pill-nav,.simui-pill-action,.simui-pill-badge,.simui-pill-status,.simui-pill-select{--pill-accent: var(--muted);flex:none;display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 13px;border-radius:999px;border:1px solid var(--faint);background:var(--surface);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,border-color .12s ease,background .12s ease}.simui-pill-count:disabled,.simui-pill-nav:disabled,.simui-pill-action:disabled,.simui-pill-select:disabled{cursor:default}.simui-pill-count:hover:not(:disabled),.simui-pill-nav:hover:not(:disabled),.simui-pill-action:hover:not(:disabled),.simui-pill-status.is-clickable:hover,.simui-pill-select:hover:not(:disabled){color:var(--text);border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-pill-ic{display:inline-flex;align-items:center;color:var(--muted)}.simui-pill-num{font-variant-numeric:tabular-nums;font-feature-settings:"tnum";font-weight:600;color:var(--text)}.simui-pill-label{color:var(--muted)}.simui-pill-count.is-active{color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 9%,var(--surface))}.simui-pill-count.is-active .simui-pill-ic,.simui-pill-nav .simui-pill-ic{color:var(--pill-accent)}.simui-pill-action{width:36px;padding:0;justify-content:center}.simui-pill-action .simui-pill-ic{color:var(--pill-accent)}.simui-pill-badge{cursor:default;color:var(--text);border-color:color-mix(in srgb,var(--pill-accent) 40%,var(--faint));background:color-mix(in srgb,var(--pill-accent) 10%,var(--surface))}.simui-pill-badge .simui-pill-ic{color:var(--pill-accent)}.simui-pill-status{cursor:default;align-items:center}.simui-pill-status.is-clickable{cursor:pointer}.simui-pill-status.is-active{border-color:color-mix(in srgb,var(--pill-accent) 35%,var(--faint))}.simui-pill-ic.is-on{color:var(--pill-accent)}.simui-pill-status-body{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15}.simui-pill-status-primary{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums}.simui-pill-status-secondary{color:var(--muted);font-size:11px}.simui-pill-select{gap:6px}.simui-pill-select-name{color:var(--muted)}.simui-pill-select-value{color:var(--text);font-weight:600}.simui-pill-select-caret{display:inline-flex;color:var(--muted)}.simui-sheet-backdrop{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;justify-content:center;background:#00000080}.simui-sheet{display:flex;flex-direction:column;width:100%;max-width:540px;max-height:88vh;background:var(--surface);border:1px solid var(--faint);border-radius:20px 20px 0 0;overflow:hidden;box-shadow:0 -8px 40px #0006}.simui-sheet-head{position:sticky;top:0;flex:none;display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--faint);background:var(--surface)}.simui-sheet-title{flex:1;font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-sheet-body{overflow:auto;padding:16px}@media(min-width:720px){.simui-sheet-backdrop{align-items:center;padding:24px}.simui-sheet{border-radius:18px;max-width:480px}}.simui-detail{display:flex;flex-direction:column;gap:16px}.simui-detail-widget .simui-tile{background:var(--surface-2)}.simui-detail-empty{color:var(--muted);font-size:14px}.simui-detail-attrs{display:flex;flex-direction:column;gap:1px;border-top:1px solid var(--faint)}.simui-detail-attr{display:flex;align-items:baseline;gap:12px;padding:8px 2px;border-bottom:1px solid var(--faint)}.simui-detail-key{flex:none;min-width:120px;color:var(--muted);font-size:12px;text-transform:capitalize}.simui-detail-val{flex:1;text-align:right;font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;word-break:break-word}.simui-detail-val.muted{color:var(--muted)}.simui-qc{display:flex;flex-direction:column;gap:11px}.simui-qc.compact{gap:9px}.simui-qc-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px}.simui-qc-label{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-qc-val{font-size:13px;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-qc-swatches{display:flex;flex-wrap:wrap;gap:8px}.simui-qc-swatch{width:26px;height:26px;padding:0;border-radius:50%;border:1px solid var(--hairline);cursor:pointer;transition:transform .1s ease,box-shadow .12s ease}.simui-qc-swatch:hover{transform:scale(1.12);box-shadow:0 0 0 2px color-mix(in srgb,var(--text) 18%,transparent)}.simui-qc.compact .simui-qc-swatch{width:22px;height:22px}.simui-temp-ribbon{-webkit-appearance:none;appearance:none;width:100%;height:14px;border-radius:999px;cursor:pointer;outline:none;background:linear-gradient(to right,#ffb46b,#fff4e6,#cfe0ff)}.simui-temp-ribbon::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28);box-shadow:0 1px 4px #00000073}.simui-temp-ribbon::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,.28)}.simui-erow.climate .simui-feats{flex:none;margin-left:10px}.simui-ctxmenu{position:fixed;z-index:200;box-sizing:border-box;display:flex;flex-direction:column;width:max-content;min-width:200px;max-width:min(280px,calc(100vw - 16px));min-height:0;max-height:calc(100vh - 16px);overflow-y:auto;padding:6px;background:var(--surface-2);border:1px solid var(--hairline);border-radius:14px;box-shadow:0 14px 40px #00000080;outline:none}.simui-ctxgroup{display:contents}.simui-ctxhead{padding:4px 6px 8px}.simui-ctxhead+.simui-ctxitem{margin-top:0}.simui-ctxsep{height:1px;margin:5px 6px;background:var(--hairline)}.simui-ctxitem{display:flex;align-items:center;gap:9px;width:100%;min-width:0;padding:8px 9px;border:none;border-radius:9px;background:transparent;color:var(--text);font-size:13px;text-align:left;cursor:pointer}.simui-ctxitem:hover:not(:disabled),.simui-ctxitem.is-active{background:var(--surface)}.simui-ctxitem:disabled{opacity:.4;cursor:default}.simui-ctxitem.danger{color:var(--down)}.simui-ctxic{display:inline-flex;flex:none;color:var(--muted)}.simui-ctxitem.danger .simui-ctxic{color:var(--down)}.simui-ctxlabel{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-chart{display:flex;flex-direction:column;gap:8px;width:100%}.simui-chart-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 16px}.simui-chart-title{font-size:13px;font-weight:600;color:var(--text)}.simui-chart-readout{display:flex;flex-wrap:wrap;gap:6px 16px;margin-left:auto}.simui-chart-cur{display:inline-flex;align-items:center;gap:6px;font-size:12px}.simui-chart-dot{width:8px;height:8px;border-radius:50%;flex:none}.simui-chart-cur-name{color:var(--muted)}.simui-chart-cur-val{color:var(--text);font-weight:600;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-chart-cur-val small{color:var(--muted);font-weight:500}.simui-chart-canvas{width:100%;height:220px}.simui-chart-fallback{padding:18px 4px;color:var(--muted);font-size:13px}.simui-surface-grid{align-items:start}.simui-surface.card{padding:12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius)}.simui-subgroups{display:flex;flex-direction:column;gap:12px}.simui-subhead{font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500;margin:2px 0 6px}.simui-list-empty{padding:4px 2px;font-size:13px;color:var(--muted)}.simui-launcher-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px}.simui-tile.is-vertical{align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px}.simui-tile.is-launcher{cursor:pointer}.simui-tile.is-launcher.is-tinted{background:color-mix(in srgb,var(--tile-accent) 10%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 28%,var(--faint))}.simui-launch-ic{display:inline-flex;align-items:center;justify-content:center;color:var(--tile-accent, var(--accent))}.simui-launch-name{font-size:12px;font-weight:600;max-width:100%}.simui-scene-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;min-height:84px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);color:var(--text);cursor:pointer;transition:border-color .15s ease,background .15s ease}.simui-scene-tile:hover{border-color:color-mix(in srgb,var(--accent) 30%,var(--faint))}.simui-scene-tile .simui-launch-ic,.simui-ic.on{color:var(--accent)}.simui-tile.is-tinted{background:color-mix(in srgb,var(--tile-accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--tile-accent) 22%,var(--faint))}.simui-rooms-head{margin:18px 2px 10px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-home-summary{margin-bottom:4px}.simui-home-content{position:relative}.simui-home-layer{position:relative;z-index:1}.simui-home-summary{display:flex;flex-direction:column;align-items:stretch;gap:22px;margin-bottom:10px}.simui-home-summary>.simui-block{min-width:0;width:100%}.simui-home-summary .simui-surface,.simui-home-summary .simui-surface.list,.simui-home-summary .simui-surface.card{background:transparent;border:none;padding:0;border-radius:0}.simui-home-summary .simui-surface-head{margin:0 2px 10px}.simui-home-summary .simui-launcher-grid{gap:4px;grid-template-columns:repeat(auto-fill,minmax(78px,1fr))}.simui-home-summary .simui-tile.is-launcher,.simui-home-summary .simui-tile.is-launcher.is-tinted,.simui-home-summary .simui-tile.is-launcher.is-active{background:transparent;border:none;min-height:80px;gap:9px;padding:8px 4px;border-radius:16px;transition:background .15s ease,transform .12s ease}.simui-home-summary .simui-tile.is-launcher:hover{background:color-mix(in srgb,var(--text) 5%,transparent)}.simui-home-summary .simui-tile.is-launcher:active{transform:scale(.97)}.simui-home-summary .simui-launch-ic{width:48px;height:48px;border-radius:16px;color:var(--tile-accent, var(--accent));background:color-mix(in srgb,var(--tile-accent, var(--accent)) 15%,transparent)}.simui-home-summary .simui-launch-name{color:var(--text);font-size:12px;font-weight:500}.simui-home-summary .simui-rows .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-home-layer .simui-pill-count,.simui-home-layer .simui-pill-nav,.simui-home-layer .simui-pill-action,.simui-home-layer .simui-pill-select{background:color-mix(in srgb,var(--text) 3%,transparent);border-color:color-mix(in srgb,var(--text) 9%,transparent)}.simui-rooms-head{margin:26px 2px 12px}.simui-metric-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}.simui-metric{--metric-accent: var(--muted);display:flex;flex-direction:column;gap:5px;padding:11px 12px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));border-radius:14px;box-shadow:inset 0 .5px #ffffff0d;transition:background .15s ease,box-shadow .15s ease}.simui-metric.is-clickable{cursor:pointer}.simui-metric.is-clickable:hover{background:color-mix(in srgb,var(--text) 6.5%,var(--surface))}.simui-metric.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-metric-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;min-width:0}.simui-metric-name{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-metric-delta{flex:none;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-delta.up{color:var(--up)}.simui-metric-delta.down{color:var(--down)}.simui-metric-value{display:flex;align-items:baseline;gap:4px}.simui-metric-val{font-size:22px;font-weight:300;letter-spacing:-.5px;line-height:1;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-metric-val.oob{color:var(--warn)}.simui-metric-unit{font-size:11px;color:var(--muted)}.simui-metric-spark{display:block;width:100%;margin-top:2px;color:var(--metric-accent)}.simui-metric-spark.is-empty{background:linear-gradient(var(--hairline),var(--hairline)) center / 100% 1px no-repeat}.simui-metric-band{fill:color-mix(in srgb,var(--up) 12%,transparent)}.simui-expand-glance.is-clickable{cursor:pointer}.simui-expand-glance.is-clickable:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:2px;border-radius:14px}.simui-expand-sheet{display:flex;flex-direction:column;gap:14px}.simui-expand-chart{width:100%}.simui-range-toggle{display:inline-flex;align-self:flex-start;gap:2px;padding:2px;border-radius:9px;background:var(--surface-2);border:1px solid var(--faint)}.simui-range-btn{min-width:44px;height:26px;padding:0 10px;border:none;border-radius:7px;background:transparent;color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;font-variant-numeric:tabular-nums;transition:color .12s ease,background .12s ease}.simui-range-btn:hover{color:var(--text)}.simui-range-btn.active{background:var(--surface);color:var(--accent)}.simui-slider-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.simui-slidertile{--slider-tint: var(--warm);position:relative;display:flex;min-height:92px;padding:0;overflow:hidden;border-radius:16px;background:color-mix(in srgb,var(--text) 4%,var(--surface));box-shadow:inset 0 .5px #ffffff0f;cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;transition:box-shadow .15s ease}.simui-slidertile.is-on{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 24%,transparent)}.simui-slidertile.is-dragging{box-shadow:inset 0 .5px #ffffff14,inset 0 0 0 1px color-mix(in srgb,var(--slider-tint) 42%,transparent)}.simui-slidertile.is-static{cursor:default;touch-action:auto}.simui-slidertile:focus-visible{outline:2px solid color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:1px}.simui-slidertile-fill{position:absolute;left:0;right:0;bottom:0;height:0;opacity:.18;pointer-events:none;transition:height .04s linear,opacity .15s ease}.simui-slidertile.is-on .simui-slidertile-fill{opacity:.28}.simui-slidertile.is-dragging .simui-slidertile-fill{transition:none}.simui-slidertile-body{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:space-between;gap:8px;width:100%;padding:11px 12px}.simui-slidertile-head{display:flex;align-items:center;gap:8px}.simui-slidertile-ic{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;padding:0;border:none;border-radius:9px;background:color-mix(in srgb,var(--text) 6%,transparent);color:var(--muted);cursor:pointer;transition:color .12s ease,background .12s ease}.simui-slidertile-ic.on{color:var(--slider-tint);background:color-mix(in srgb,var(--slider-tint) 16%,transparent)}.simui-slidertile-pct{margin-left:auto;font-size:13px;font-weight:500;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-slidertile-name{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-statusboard{--board-tint: var(--muted);display:flex;flex-direction:column;gap:6px;min-height:96px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--text) 3.5%,var(--surface));box-shadow:inset 0 .5px #ffffff0d;cursor:default;transition:background .18s ease,box-shadow .18s ease}.simui-statusboard.tone-secure{--board-tint: var(--up)}.simui-statusboard.tone-warn{--board-tint: var(--warn)}.simui-statusboard.tone-alert{--board-tint: var(--down)}.simui-statusboard.tone-idle{--board-tint: var(--muted)}.simui-statusboard.is-attn{background:color-mix(in srgb,var(--board-tint) 10%,var(--surface));box-shadow:inset 0 .5px #ffffff12,0 0 0 1px color-mix(in srgb,var(--board-tint) 30%,transparent),0 4px 18px color-mix(in srgb,var(--board-tint) 16%,transparent)}.simui-statusboard-ic{display:inline-flex;color:var(--muted)}.simui-statusboard.is-attn .simui-statusboard-ic{color:var(--board-tint)}.simui-statusboard-word{font-size:17px;font-weight:500;letter-spacing:-.2px;color:var(--text)}.simui-statusboard.is-attn .simui-statusboard-word{color:var(--board-tint)}.simui-statusboard-name{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-statusboard .simui-state{font-size:11px}.simui-attn{margin-bottom:2px}.simui-attn.is-clear{display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:14px;background:color-mix(in srgb,var(--text) 3%,var(--surface))}.simui-attn-ic{display:inline-flex;color:var(--up)}.simui-attn-ic.warn{color:var(--warn)}.simui-attn-clear{font-size:13px;color:var(--muted)}.simui-attn.is-active{display:flex;flex-direction:column;gap:10px;padding:13px 14px;border-radius:18px;background:color-mix(in srgb,var(--warn) 8%,var(--surface));box-shadow:0 0 0 1px color-mix(in srgb,var(--warn) 26%,transparent)}.simui-attn-head{display:flex;align-items:center;gap:8px}.simui-attn-title{font-size:13px;font-weight:600;color:var(--warn)}.simui-attn-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}.simui-ambient-canvas{position:absolute;inset:-16px 0 auto;height:460px;z-index:0;pointer-events:none;opacity:var(--amb-opacity, .12);transition:opacity .6s ease,background .6s ease}.simui-ambient-canvas.is-field{background:radial-gradient(120% 80% at 18% -10%,color-mix(in srgb,var(--warm) 70%,transparent),transparent 56%),radial-gradient(130% 90% at 84% -4%,var(--amb-phase, var(--slate)),transparent 60%)}.simui-ambient-canvas.is-field:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background:radial-gradient(120% 80% at 30% 0%,var(--warm),transparent 58%)}.simui-ambient-canvas.is-field:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:calc(var(--amb-cool, 0) * .7);background:radial-gradient(120% 90% at 80% 6%,var(--cool),transparent 60%)}.simui-ambient-canvas.is-dots{inset:0;height:auto;background-image:radial-gradient(color-mix(in srgb,var(--amb-phase, var(--warm)) 80%,transparent) .9px,transparent 1px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%);mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.4) 40%,transparent 78%)}.simui-ambient-canvas.is-dots:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:var(--amb-warm, 0);background-image:radial-gradient(var(--warm) 1px,transparent 1.4px);background-size:5px 5px;-webkit-mask-image:linear-gradient(to bottom,#000 0%,transparent 70%);mask-image:linear-gradient(to bottom,#000 0%,transparent 70%)}.simui-cat-content{position:relative}.simui-cat-layer{position:relative;z-index:1}.simui-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.simui-bloom{display:flex;flex-direction:column;gap:18px;align-items:stretch}.simui-bloom.light .simui-bloom-wheelwrap,.simui-bloom-dialwrap{display:flex;justify-content:center}.simui-bloom-sliders{display:flex;flex-direction:column;gap:9px}.simui-bloom-modes{align-self:stretch;flex-wrap:wrap}.simui-bloom-dialpair{display:flex;gap:18px;justify-content:center}.simui-bloom-dialcol{display:flex;flex-direction:column;align-items:center;gap:6px}.simui-bloom-readonly{font-size:30px;font-weight:300;color:var(--text);text-align:center;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wheel{position:relative;flex:none;border-radius:50%;cursor:pointer;touch-action:none;outline:none}.simui-wheel:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 55%,transparent)}.simui-wheel-disc{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at center,#fff,#fff0 70%),conic-gradient(from 90deg,red,#ff0,#0f0,#0ff,#00f,#f0f,red);box-shadow:inset 0 0 0 1px var(--hairline)}.simui-wheel-thumb{position:absolute;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%);border:2px solid #fff;box-shadow:0 1px 5px #00000080;pointer-events:none}.simui-dial{flex:none;cursor:pointer;touch-action:none;outline:none}.simui-dial:focus-visible{filter:drop-shadow(0 0 4px color-mix(in srgb,var(--accent) 70%,transparent))}.simui-dial-track{stroke:var(--faint)}.simui-dial-knob{stroke:var(--surface);stroke-width:2}.simui-dial-value{font-size:40px;font-weight:300;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-dial-unit{font-size:20px}.simui-dial-current{font-size:12px}.simui-tile.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 12%,var(--surface));box-shadow:inset 0 .5px #ffffff0f,inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 22%,transparent)}.simui-tile.is-album-tinted .simui-art{box-shadow:0 2px 16px color-mix(in srgb,var(--album-tint) 38%,transparent)}.simui-dh{display:flex;flex-direction:column;gap:2px}.simui-dh-value{display:flex;align-items:baseline;gap:4px;font-size:44px;font-weight:300;line-height:1;letter-spacing:-1px;color:var(--text)}.simui-dh-value.warm{color:var(--warm)}.simui-dh-value.cool{color:var(--cool)}.simui-dh-value.accent{color:var(--accent)}.simui-dh-value.warn{color:var(--warn)}.simui-dh-value.up{color:var(--up)}.simui-dh-value.down{color:var(--down)}.simui-dh-unit{font-size:20px;font-weight:400;color:var(--muted)}.simui-dh-sub{font-size:13px;color:var(--muted)}.simui-dh-since{font-size:12px;color:var(--muted);opacity:.7}.simui-detail-field{display:flex;flex-direction:column;gap:8px}.simui-detail-seg{flex-wrap:wrap;align-self:flex-start;max-width:100%}.simui-detail-chart .simui-metric{background:var(--surface-2);border-radius:12px;padding:12px}.simui-detail-pillrow{display:flex;align-items:baseline;justify-content:space-between;gap:12px}.simui-detail-pilllabel{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:500}.simui-detail-pillval{font-size:13px;color:var(--text)}.simui-detail-buttons{display:flex;align-items:center;gap:8px}.simui-detail-buttons .simui-sbtn{width:36px;height:30px}.simui-detail-buttons.wide{gap:10px}.simui-segbtn.lg{height:38px;flex:1;gap:7px;font-size:13px}.simui-md-now{display:flex;align-items:center;gap:14px;padding:12px;border-radius:16px;background:var(--surface-2)}.simui-md-now.is-album-tinted{background:color-mix(in srgb,var(--album-tint) 14%,var(--surface));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--album-tint) 24%,transparent)}.simui-md-art{flex:none;width:84px;height:84px;border-radius:12px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-md-now.is-album-tinted .simui-md-art{box-shadow:0 2px 18px color-mix(in srgb,var(--album-tint) 40%,transparent)}.simui-md-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}.simui-md-title{font-size:16px;font-weight:600;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-artist{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-md-state{margin-top:2px;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted)}.simui-md-transport{display:flex;align-items:center;justify-content:center;gap:22px}.simui-md-btn{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer;transition:color .12s ease}.simui-md-btn:hover:not(:disabled){color:var(--accent)}.simui-md-btn:disabled{opacity:.4;cursor:default}.simui-md-btn.play{width:48px;height:48px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-md-btn.play:hover:not(:disabled){color:var(--surface);opacity:.88}.simui-md-volrow{display:flex;align-items:center;gap:12px}.simui-md-volrow .simui-slider{flex:1}.simui-md-volrow .simui-qc-val{flex:none;min-width:38px;text-align:right}.simui-root{--focus-ring: 0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-ctxitem:focus-visible,.simui-segbtn:focus-visible,.simui-ftoggle:focus-visible,.simui-sbtn:focus-visible,.simui-iconbtn-h:focus-visible,.simui-range-btn:focus-visible,.simui-card-grab:focus-visible,.simui-card-btn:focus-visible,.simui-qc-swatch:focus-visible,.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{outline:none;box-shadow:var(--focus-ring)}.simui-pill-count:focus-visible,.simui-pill-nav:focus-visible,.simui-pill-action:focus-visible,.simui-pill-status.is-clickable:focus-visible,.simui-pill-select:focus-visible,.simui-qc-swatch:focus-visible{border-radius:999px}.simui-slider:focus-visible,.simui-temp-ribbon:focus-visible{border-radius:999px}.simui-sheet:focus-visible,.simui-ctxmenu:focus-visible{outline:none;box-shadow:var(--focus-ring)}@media(prefers-reduced-motion:reduce){.simui-root *,.simui-root *:before,.simui-root *:after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;transition-delay:0ms!important;scroll-behavior:auto!important}}.simui-camera{padding:0;overflow:hidden;gap:0}.simui-cam-frame{position:relative;width:100%;aspect-ratio:16 / 10;min-height:96px;background:var(--surface-2)}.simui-cam-img{display:block;width:100%;height:100%;object-fit:cover}.simui-cam-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--muted);background:var(--surface-2)}.simui-cam-cap{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:8px;padding:18px 12px 8px;background:linear-gradient(to top,rgba(0,0,0,.55),transparent)}.simui-cam-name{font-size:12px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 2px rgba(0,0,0,.5)}.simui-cam-state{margin-left:auto;font-size:11px;color:#fffc}.simui-weather{gap:10px}.simui-wx-head{display:flex;align-items:center;gap:11px}.simui-wx-ic{display:inline-flex;flex:none;color:var(--cool)}.simui-wx-now{display:flex;flex-direction:column;gap:1px;min-width:0}.simui-wx-temp{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-wx-cond{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-wx-fc{display:flex;gap:6px}.simui-wx-fcd{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border-radius:9px;background:color-mix(in srgb,var(--text) 4%,transparent)}.simui-wx-fcl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px}.simui-wx-fci{display:inline-flex;color:var(--muted)}.simui-wx-fct{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge{align-items:stretch;gap:6px}.simui-gauge-wrap{position:relative;display:flex;align-items:center;justify-content:center}.simui-gauge-svg{display:block}.simui-gauge-track{stroke:var(--faint)}.simui-gauge-fill{stroke:var(--accent);transition:stroke-dasharray .25s ease}.simui-gauge-readout{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;pointer-events:none}.simui-gauge-val{font-size:20px;font-weight:600;line-height:1;letter-spacing:-.4px;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-gauge-unit{font-size:11px;color:var(--muted);font-weight:500}.simui-action{justify-content:center}.simui-action.is-clickable:hover .simui-action-run{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-action-run{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:999px;border:1px solid var(--faint);color:var(--muted);transition:color .12s ease,border-color .12s ease}.simui-eb-full{max-width:480px;margin:48px auto;padding:20px 22px;background:var(--surface);border:1px solid var(--hairline);border-radius:var(--radius);color:var(--text)}.simui-eb-title{font-size:15px;font-weight:600;letter-spacing:-.2px;margin-bottom:6px}.simui-eb-body{font-size:13px;line-height:1.5;color:var(--muted)}.simui-eb-compact{margin:8px 2px;padding:10px 12px;font-size:12px;color:var(--muted);background:color-mix(in srgb,var(--text) 3%,var(--surface));border:1px solid var(--hairline);border-radius:10px}.simui-conn-banner{display:flex;align-items:center;gap:8px;margin:0 0 12px;padding:7px 12px;font-size:12px;font-weight:500;color:var(--warn);background:color-mix(in srgb,var(--warn) 9%,var(--surface));border:1px solid color-mix(in srgb,var(--warn) 28%,var(--faint));border-radius:10px}.simui-conn-ic{flex:none;color:var(--warn)}';
class mz extends HTMLElement {
  constructor() {
    super(...arguments);
    os(this, "_root");
    os(this, "_mount");
    os(this, "_hass");
    os(this, "_listeners", /* @__PURE__ */ new Set());
    os(this, "_source");
  }
  set hass(n) {
    this._hass = n, this._listeners.forEach((a) => a());
  }
  get hass() {
    return this._hass;
  }
  set narrow(n) {
  }
  set route(n) {
  }
  set panel(n) {
  }
  connectedCallback() {
    if (!this._source) {
      const n = this;
      this._source = {
        subscribe(a) {
          return n._listeners.add(a), () => n._listeners.delete(a);
        },
        getStates: () => n._hass ? n._hass.states : {},
        callService: (a, r, u, c) => n._hass.callService(a, r, u, c),
        get connection() {
          return n._hass ? n._hass.connection : void 0;
        }
      };
    }
    if (!this._mount) {
      const n = document.createElement("style");
      n.textContent = fz, this.appendChild(n), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = ow.createRoot(this._mount), this._root.render(
        /* @__PURE__ */ p.jsx(Y2, { source: this._source, children: /* @__PURE__ */ p.jsx(dz, {}) })
      );
    }
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", mz);
