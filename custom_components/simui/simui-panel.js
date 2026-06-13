var Jg = Object.defineProperty;
var kg = (i, s, f) => s in i ? Jg(i, s, { enumerable: !0, configurable: !0, writable: !0, value: f }) : i[s] = f;
var Zi = (i, s, f) => kg(i, typeof s != "symbol" ? s + "" : s, f);
function $g(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var mf = { exports: {} }, mu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bh;
function Wg() {
  if (Bh) return mu;
  Bh = 1;
  var i = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function f(o, d, m) {
    var S = null;
    if (m !== void 0 && (S = "" + m), d.key !== void 0 && (S = "" + d.key), "key" in d) {
      m = {};
      for (var z in d)
        z !== "key" && (m[z] = d[z]);
    } else m = d;
    return d = m.ref, {
      $$typeof: i,
      type: o,
      key: S,
      ref: d !== void 0 ? d : null,
      props: m
    };
  }
  return mu.Fragment = s, mu.jsx = f, mu.jsxs = f, mu;
}
var qh;
function Fg() {
  return qh || (qh = 1, mf.exports = Wg()), mf.exports;
}
var O = Fg(), gf = { exports: {} }, gu = {}, yf = { exports: {} }, bf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yh;
function Ig() {
  return Yh || (Yh = 1, (function(i) {
    function s(C, w) {
      var J = C.length;
      C.push(w);
      t: for (; 0 < J; ) {
        var ct = J - 1 >>> 1, gt = C[ct];
        if (0 < d(gt, w))
          C[ct] = w, C[J] = gt, J = ct;
        else break t;
      }
    }
    function f(C) {
      return C.length === 0 ? null : C[0];
    }
    function o(C) {
      if (C.length === 0) return null;
      var w = C[0], J = C.pop();
      if (J !== w) {
        C[0] = J;
        t: for (var ct = 0, gt = C.length, y = gt >>> 1; ct < y; ) {
          var N = 2 * (ct + 1) - 1, q = C[N], X = N + 1, P = C[X];
          if (0 > d(q, J))
            X < gt && 0 > d(P, q) ? (C[ct] = P, C[X] = J, ct = X) : (C[ct] = q, C[N] = J, ct = N);
          else if (X < gt && 0 > d(P, J))
            C[ct] = P, C[X] = J, ct = X;
          else break t;
        }
      }
      return w;
    }
    function d(C, w) {
      var J = C.sortIndex - w.sortIndex;
      return J !== 0 ? J : C.id - w.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      i.unstable_now = function() {
        return m.now();
      };
    } else {
      var S = Date, z = S.now();
      i.unstable_now = function() {
        return S.now() - z;
      };
    }
    var b = [], h = [], M = 1, _ = null, H = 3, B = !1, k = !1, Y = !1, Z = !1, W = typeof setTimeout == "function" ? setTimeout : null, et = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function nt(C) {
      for (var w = f(h); w !== null; ) {
        if (w.callback === null) o(h);
        else if (w.startTime <= C)
          o(h), w.sortIndex = w.expirationTime, s(b, w);
        else break;
        w = f(h);
      }
    }
    function it(C) {
      if (Y = !1, nt(C), !k)
        if (f(b) !== null)
          k = !0, lt || (lt = !0, Ot());
        else {
          var w = f(h);
          w !== null && ee(it, w.startTime - C);
        }
    }
    var lt = !1, L = -1, I = 5, pt = -1;
    function Ct() {
      return Z ? !0 : !(i.unstable_now() - pt < I);
    }
    function dt() {
      if (Z = !1, lt) {
        var C = i.unstable_now();
        pt = C;
        var w = !0;
        try {
          t: {
            k = !1, Y && (Y = !1, et(L), L = -1), B = !0;
            var J = H;
            try {
              e: {
                for (nt(C), _ = f(b); _ !== null && !(_.expirationTime > C && Ct()); ) {
                  var ct = _.callback;
                  if (typeof ct == "function") {
                    _.callback = null, H = _.priorityLevel;
                    var gt = ct(
                      _.expirationTime <= C
                    );
                    if (C = i.unstable_now(), typeof gt == "function") {
                      _.callback = gt, nt(C), w = !0;
                      break e;
                    }
                    _ === f(b) && o(b), nt(C);
                  } else o(b);
                  _ = f(b);
                }
                if (_ !== null) w = !0;
                else {
                  var y = f(h);
                  y !== null && ee(
                    it,
                    y.startTime - C
                  ), w = !1;
                }
              }
              break t;
            } finally {
              _ = null, H = J, B = !1;
            }
            w = void 0;
          }
        } finally {
          w ? Ot() : lt = !1;
        }
      }
    }
    var Ot;
    if (typeof K == "function")
      Ot = function() {
        K(dt);
      };
    else if (typeof MessageChannel < "u") {
      var Jt = new MessageChannel(), Gt = Jt.port2;
      Jt.port1.onmessage = dt, Ot = function() {
        Gt.postMessage(null);
      };
    } else
      Ot = function() {
        W(dt, 0);
      };
    function ee(C, w) {
      L = W(function() {
        C(i.unstable_now());
      }, w);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, i.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < C ? Math.floor(1e3 / C) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return H;
    }, i.unstable_next = function(C) {
      switch (H) {
        case 1:
        case 2:
        case 3:
          var w = 3;
          break;
        default:
          w = H;
      }
      var J = H;
      H = w;
      try {
        return C();
      } finally {
        H = J;
      }
    }, i.unstable_requestPaint = function() {
      Z = !0;
    }, i.unstable_runWithPriority = function(C, w) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var J = H;
      H = C;
      try {
        return w();
      } finally {
        H = J;
      }
    }, i.unstable_scheduleCallback = function(C, w, J) {
      var ct = i.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? ct + J : ct) : J = ct, C) {
        case 1:
          var gt = -1;
          break;
        case 2:
          gt = 250;
          break;
        case 5:
          gt = 1073741823;
          break;
        case 4:
          gt = 1e4;
          break;
        default:
          gt = 5e3;
      }
      return gt = J + gt, C = {
        id: M++,
        callback: w,
        priorityLevel: C,
        startTime: J,
        expirationTime: gt,
        sortIndex: -1
      }, J > ct ? (C.sortIndex = J, s(h, C), f(b) === null && C === f(h) && (Y ? (et(L), L = -1) : Y = !0, ee(it, J - ct))) : (C.sortIndex = gt, s(b, C), k || B || (k = !0, lt || (lt = !0, Ot()))), C;
    }, i.unstable_shouldYield = Ct, i.unstable_wrapCallback = function(C) {
      var w = H;
      return function() {
        var J = H;
        H = w;
        try {
          return C.apply(this, arguments);
        } finally {
          H = J;
        }
      };
    };
  })(bf)), bf;
}
var Xh;
function Pg() {
  return Xh || (Xh = 1, yf.exports = Ig()), yf.exports;
}
var pf = { exports: {} }, tt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lh;
function t0() {
  if (Lh) return tt;
  Lh = 1;
  var i = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), S = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), _ = Symbol.for("react.activity"), H = Symbol.iterator;
  function B(y) {
    return y === null || typeof y != "object" ? null : (y = H && y[H] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var k = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Y = Object.assign, Z = {};
  function W(y, N, q) {
    this.props = y, this.context = N, this.refs = Z, this.updater = q || k;
  }
  W.prototype.isReactComponent = {}, W.prototype.setState = function(y, N) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, N, "setState");
  }, W.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function et() {
  }
  et.prototype = W.prototype;
  function K(y, N, q) {
    this.props = y, this.context = N, this.refs = Z, this.updater = q || k;
  }
  var nt = K.prototype = new et();
  nt.constructor = K, Y(nt, W.prototype), nt.isPureReactComponent = !0;
  var it = Array.isArray;
  function lt() {
  }
  var L = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function pt(y, N, q) {
    var X = q.ref;
    return {
      $$typeof: i,
      type: y,
      key: N,
      ref: X !== void 0 ? X : null,
      props: q
    };
  }
  function Ct(y, N) {
    return pt(y.type, N, y.props);
  }
  function dt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === i;
  }
  function Ot(y) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(q) {
      return N[q];
    });
  }
  var Jt = /\/+/g;
  function Gt(y, N) {
    return typeof y == "object" && y !== null && y.key != null ? Ot("" + y.key) : N.toString(36);
  }
  function ee(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(lt, lt) : (y.status = "pending", y.then(
          function(N) {
            y.status === "pending" && (y.status = "fulfilled", y.value = N);
          },
          function(N) {
            y.status === "pending" && (y.status = "rejected", y.reason = N);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function C(y, N, q, X, P) {
    var F = typeof y;
    (F === "undefined" || F === "boolean") && (y = null);
    var ht = !1;
    if (y === null) ht = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          ht = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case i:
            case s:
              ht = !0;
              break;
            case M:
              return ht = y._init, C(
                ht(y._payload),
                N,
                q,
                X,
                P
              );
          }
      }
    if (ht)
      return P = P(y), ht = X === "" ? "." + Gt(y, 0) : X, it(P) ? (q = "", ht != null && (q = ht.replace(Jt, "$&/") + "/"), C(P, N, q, "", function(mt) {
        return mt;
      })) : P != null && (dt(P) && (P = Ct(
        P,
        q + (P.key == null || y && y.key === P.key ? "" : ("" + P.key).replace(
          Jt,
          "$&/"
        ) + "/") + ht
      )), N.push(P)), 1;
    ht = 0;
    var Ut = X === "" ? "." : X + ":";
    if (it(y))
      for (var St = 0; St < y.length; St++)
        X = y[St], F = Ut + Gt(X, St), ht += C(
          X,
          N,
          q,
          F,
          P
        );
    else if (St = B(y), typeof St == "function")
      for (y = St.call(y), St = 0; !(X = y.next()).done; )
        X = X.value, F = Ut + Gt(X, St++), ht += C(
          X,
          N,
          q,
          F,
          P
        );
    else if (F === "object") {
      if (typeof y.then == "function")
        return C(
          ee(y),
          N,
          q,
          X,
          P
        );
      throw N = String(y), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ht;
  }
  function w(y, N, q) {
    if (y == null) return y;
    var X = [], P = 0;
    return C(y, X, "", "", function(F) {
      return N.call(q, F, P++);
    }), X;
  }
  function J(y) {
    if (y._status === -1) {
      var N = y._result;
      N = N(), N.then(
        function(q) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = q);
        },
        function(q) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = q);
        }
      ), y._status === -1 && (y._status = 0, y._result = N);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  }, gt = {
    map: w,
    forEach: function(y, N, q) {
      w(
        y,
        function() {
          N.apply(this, arguments);
        },
        q
      );
    },
    count: function(y) {
      var N = 0;
      return w(y, function() {
        N++;
      }), N;
    },
    toArray: function(y) {
      return w(y, function(N) {
        return N;
      }) || [];
    },
    only: function(y) {
      if (!dt(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return tt.Activity = _, tt.Children = gt, tt.Component = W, tt.Fragment = f, tt.Profiler = d, tt.PureComponent = K, tt.StrictMode = o, tt.Suspense = b, tt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, tt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return L.H.useMemoCache(y);
    }
  }, tt.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, tt.cacheSignal = function() {
    return null;
  }, tt.cloneElement = function(y, N, q) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var X = Y({}, y.props), P = y.key;
    if (N != null)
      for (F in N.key !== void 0 && (P = "" + N.key), N)
        !I.call(N, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && N.ref === void 0 || (X[F] = N[F]);
    var F = arguments.length - 2;
    if (F === 1) X.children = q;
    else if (1 < F) {
      for (var ht = Array(F), Ut = 0; Ut < F; Ut++)
        ht[Ut] = arguments[Ut + 2];
      X.children = ht;
    }
    return pt(y.type, P, X);
  }, tt.createContext = function(y) {
    return y = {
      $$typeof: S,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: m,
      _context: y
    }, y;
  }, tt.createElement = function(y, N, q) {
    var X, P = {}, F = null;
    if (N != null)
      for (X in N.key !== void 0 && (F = "" + N.key), N)
        I.call(N, X) && X !== "key" && X !== "__self" && X !== "__source" && (P[X] = N[X]);
    var ht = arguments.length - 2;
    if (ht === 1) P.children = q;
    else if (1 < ht) {
      for (var Ut = Array(ht), St = 0; St < ht; St++)
        Ut[St] = arguments[St + 2];
      P.children = Ut;
    }
    if (y && y.defaultProps)
      for (X in ht = y.defaultProps, ht)
        P[X] === void 0 && (P[X] = ht[X]);
    return pt(y, F, P);
  }, tt.createRef = function() {
    return { current: null };
  }, tt.forwardRef = function(y) {
    return { $$typeof: z, render: y };
  }, tt.isValidElement = dt, tt.lazy = function(y) {
    return {
      $$typeof: M,
      _payload: { _status: -1, _result: y },
      _init: J
    };
  }, tt.memo = function(y, N) {
    return {
      $$typeof: h,
      type: y,
      compare: N === void 0 ? null : N
    };
  }, tt.startTransition = function(y) {
    var N = L.T, q = {};
    L.T = q;
    try {
      var X = y(), P = L.S;
      P !== null && P(q, X), typeof X == "object" && X !== null && typeof X.then == "function" && X.then(lt, ct);
    } catch (F) {
      ct(F);
    } finally {
      N !== null && q.types !== null && (N.types = q.types), L.T = N;
    }
  }, tt.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, tt.use = function(y) {
    return L.H.use(y);
  }, tt.useActionState = function(y, N, q) {
    return L.H.useActionState(y, N, q);
  }, tt.useCallback = function(y, N) {
    return L.H.useCallback(y, N);
  }, tt.useContext = function(y) {
    return L.H.useContext(y);
  }, tt.useDebugValue = function() {
  }, tt.useDeferredValue = function(y, N) {
    return L.H.useDeferredValue(y, N);
  }, tt.useEffect = function(y, N) {
    return L.H.useEffect(y, N);
  }, tt.useEffectEvent = function(y) {
    return L.H.useEffectEvent(y);
  }, tt.useId = function() {
    return L.H.useId();
  }, tt.useImperativeHandle = function(y, N, q) {
    return L.H.useImperativeHandle(y, N, q);
  }, tt.useInsertionEffect = function(y, N) {
    return L.H.useInsertionEffect(y, N);
  }, tt.useLayoutEffect = function(y, N) {
    return L.H.useLayoutEffect(y, N);
  }, tt.useMemo = function(y, N) {
    return L.H.useMemo(y, N);
  }, tt.useOptimistic = function(y, N) {
    return L.H.useOptimistic(y, N);
  }, tt.useReducer = function(y, N, q) {
    return L.H.useReducer(y, N, q);
  }, tt.useRef = function(y) {
    return L.H.useRef(y);
  }, tt.useState = function(y) {
    return L.H.useState(y);
  }, tt.useSyncExternalStore = function(y, N, q) {
    return L.H.useSyncExternalStore(
      y,
      N,
      q
    );
  }, tt.useTransition = function() {
    return L.H.useTransition();
  }, tt.version = "19.2.7", tt;
}
var Gh;
function jf() {
  return Gh || (Gh = 1, pf.exports = t0()), pf.exports;
}
var Sf = { exports: {} }, de = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qh;
function e0() {
  if (Qh) return de;
  Qh = 1;
  var i = jf();
  function s(b) {
    var h = "https://react.dev/errors/" + b;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var M = 2; M < arguments.length; M++)
        h += "&args[]=" + encodeURIComponent(arguments[M]);
    }
    return "Minified React error #" + b + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f() {
  }
  var o = {
    d: {
      f,
      r: function() {
        throw Error(s(522));
      },
      D: f,
      C: f,
      L: f,
      m: f,
      X: f,
      S: f,
      M: f
    },
    p: 0,
    findDOMNode: null
  }, d = Symbol.for("react.portal");
  function m(b, h, M) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: _ == null ? null : "" + _,
      children: b,
      containerInfo: h,
      implementation: M
    };
  }
  var S = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function z(b, h) {
    if (b === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, de.createPortal = function(b, h) {
    var M = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(s(299));
    return m(b, h, null, M);
  }, de.flushSync = function(b) {
    var h = S.T, M = o.p;
    try {
      if (S.T = null, o.p = 2, b) return b();
    } finally {
      S.T = h, o.p = M, o.d.f();
    }
  }, de.preconnect = function(b, h) {
    typeof b == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, o.d.C(b, h));
  }, de.prefetchDNS = function(b) {
    typeof b == "string" && o.d.D(b);
  }, de.preinit = function(b, h) {
    if (typeof b == "string" && h && typeof h.as == "string") {
      var M = h.as, _ = z(M, h.crossOrigin), H = typeof h.integrity == "string" ? h.integrity : void 0, B = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      M === "style" ? o.d.S(
        b,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: _,
          integrity: H,
          fetchPriority: B
        }
      ) : M === "script" && o.d.X(b, {
        crossOrigin: _,
        integrity: H,
        fetchPriority: B,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, de.preinitModule = function(b, h) {
    if (typeof b == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var M = z(
            h.as,
            h.crossOrigin
          );
          o.d.M(b, {
            crossOrigin: M,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && o.d.M(b);
  }, de.preload = function(b, h) {
    if (typeof b == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var M = h.as, _ = z(M, h.crossOrigin);
      o.d.L(b, M, {
        crossOrigin: _,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, de.preloadModule = function(b, h) {
    if (typeof b == "string")
      if (h) {
        var M = z(h.as, h.crossOrigin);
        o.d.m(b, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: M,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else o.d.m(b);
  }, de.requestFormReset = function(b) {
    o.d.r(b);
  }, de.unstable_batchedUpdates = function(b, h) {
    return b(h);
  }, de.useFormState = function(b, h, M) {
    return S.H.useFormState(b, h, M);
  }, de.useFormStatus = function() {
    return S.H.useHostTransitionStatus();
  }, de.version = "19.2.7", de;
}
var Zh;
function ov() {
  if (Zh) return Sf.exports;
  Zh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return i(), Sf.exports = e0(), Sf.exports;
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
var Vh;
function l0() {
  if (Vh) return gu;
  Vh = 1;
  var i = Pg(), s = jf(), f = ov();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function m(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function S(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function z(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function b(t) {
    if (m(t) !== t)
      throw Error(o(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = m(t), e === null) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === l) return b(a), t;
          if (u === n) return b(a), e;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== n.return) l = a, n = u;
      else {
        for (var c = !1, r = a.child; r; ) {
          if (r === l) {
            c = !0, l = a, n = u;
            break;
          }
          if (r === n) {
            c = !0, n = a, l = u;
            break;
          }
          r = r.sibling;
        }
        if (!c) {
          for (r = u.child; r; ) {
            if (r === l) {
              c = !0, l = u, n = a;
              break;
            }
            if (r === n) {
              c = !0, n = u, l = a;
              break;
            }
            r = r.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (l.alternate !== n) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? t : e;
  }
  function M(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = M(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var _ = Object.assign, H = Symbol.for("react.element"), B = Symbol.for("react.transitional.element"), k = Symbol.for("react.portal"), Y = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), W = Symbol.for("react.profiler"), et = Symbol.for("react.consumer"), K = Symbol.for("react.context"), nt = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), pt = Symbol.for("react.activity"), Ct = Symbol.for("react.memo_cache_sentinel"), dt = Symbol.iterator;
  function Ot(t) {
    return t === null || typeof t != "object" ? null : (t = dt && t[dt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Jt = Symbol.for("react.client.reference");
  function Gt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Jt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Y:
        return "Fragment";
      case W:
        return "Profiler";
      case Z:
        return "StrictMode";
      case it:
        return "Suspense";
      case lt:
        return "SuspenseList";
      case pt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case k:
          return "Portal";
        case K:
          return t.displayName || "Context";
        case et:
          return (t._context.displayName || "Context") + ".Consumer";
        case nt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case L:
          return e = t.displayName || null, e !== null ? e : Gt(t.type) || "Memo";
        case I:
          e = t._payload, t = t._init;
          try {
            return Gt(t(e));
          } catch {
          }
      }
    return null;
  }
  var ee = Array.isArray, C = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], gt = -1;
  function y(t) {
    return { current: t };
  }
  function N(t) {
    0 > gt || (t.current = ct[gt], ct[gt] = null, gt--);
  }
  function q(t, e) {
    gt++, ct[gt] = t.current, t.current = e;
  }
  var X = y(null), P = y(null), F = y(null), ht = y(null);
  function Ut(t, e) {
    switch (q(F, e), q(P, t), q(X, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? ih(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = ih(e), t = ch(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    N(X), q(X, t);
  }
  function St() {
    N(X), N(P), N(F);
  }
  function mt(t) {
    t.memoizedState !== null && q(ht, t);
    var e = X.current, l = ch(e, t.type);
    e !== l && (q(P, t), q(X, l));
  }
  function ul(t) {
    P.current === t && (N(X), N(P)), ht.current === t && (N(ht), ru._currentValue = J);
  }
  var me, ml;
  function le(t) {
    if (me === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        me = e && e[1] || "", ml = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + me + t + ml;
  }
  var il = !1;
  function cl(t, e) {
    if (!t || il) return "";
    il = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var j = function() {
                throw Error();
              };
              if (Object.defineProperty(j.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(j, []);
                } catch (D) {
                  var T = D;
                }
                Reflect.construct(t, [], j);
              } else {
                try {
                  j.call();
                } catch (D) {
                  T = D;
                }
                t.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                T = D;
              }
              (j = t()) && typeof j.catch == "function" && j.catch(function() {
              });
            }
          } catch (D) {
            if (D && T && typeof D.stack == "string")
              return [D.stack, T.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), c = u[0], r = u[1];
      if (c && r) {
        var v = c.split(`
`), E = r.split(`
`);
        for (a = n = 0; n < v.length && !v[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < E.length && !E[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === v.length || a === E.length)
          for (n = v.length - 1, a = E.length - 1; 1 <= n && 0 <= a && v[n] !== E[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (v[n] !== E[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || v[n] !== E[a]) {
                  var R = `
` + v[n].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      il = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? le(l) : "";
  }
  function Du(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return le(t.type);
      case 16:
        return le("Lazy");
      case 13:
        return t.child !== e && e !== null ? le("Suspense Fallback") : le("Suspense");
      case 19:
        return le("SuspenseList");
      case 0:
      case 15:
        return cl(t.type, !1);
      case 11:
        return cl(t.type.render, !1);
      case 1:
        return cl(t.type, !0);
      case 31:
        return le("Activity");
      default:
        return "";
    }
  }
  function Ta(t) {
    try {
      var e = "", l = null;
      do
        e += Du(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var rn = Object.prototype.hasOwnProperty, we = i.unstable_scheduleCallback, Bl = i.unstable_cancelCallback, Rn = i.unstable_shouldYield, Mu = i.unstable_requestPaint, fe = i.unstable_now, lc = i.unstable_getCurrentPriorityLevel, Ou = i.unstable_ImmediatePriority, gl = i.unstable_UserBlockingPriority, Ie = i.unstable_NormalPriority, dn = i.unstable_LowPriority, _a = i.unstable_IdlePriority, sl = i.log, Cu = i.unstable_setDisableYieldValue, hn = null, he = null;
  function Be(t) {
    if (typeof sl == "function" && Cu(t), he && typeof he.setStrictMode == "function")
      try {
        he.setStrictMode(hn, t);
      } catch {
      }
  }
  var oe = Math.clz32 ? Math.clz32 : ac, nc = Math.log, Nu = Math.LN2;
  function ac(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (nc(t) / Nu | 0) | 0;
  }
  var Un = 256, jn = 262144, Bt = 4194304;
  function qt(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Ft(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var r = n & 134217727;
    return r !== 0 ? (n = r & ~u, n !== 0 ? a = qt(n) : (c &= r, c !== 0 ? a = qt(c) : l || (l = r & ~t, l !== 0 && (a = qt(l))))) : (r = n & ~u, r !== 0 ? a = qt(r) : c !== 0 ? a = qt(c) : l || (l = n & ~t, l !== 0 && (a = qt(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function ge(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function ye(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function re() {
    var t = Bt;
    return Bt <<= 1, (Bt & 62914560) === 0 && (Bt = 4194304), t;
  }
  function be(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function qe(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function kt(t, e, l, n, a, u) {
    var c = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var r = t.entanglements, v = t.expirationTimes, E = t.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var R = 31 - oe(l), j = 1 << R;
      r[R] = 0, v[R] = -1;
      var T = E[R];
      if (T !== null)
        for (E[R] = null, R = 0; R < T.length; R++) {
          var D = T[R];
          D !== null && (D.lane &= -536870913);
        }
      l &= ~j;
    }
    n !== 0 && Pe(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~e));
  }
  function Pe(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - oe(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function Me(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - oe(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function Ye(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : yl(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function yl(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function bl(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function tl() {
    var t = w.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ch(t.type));
  }
  function ql(t, e) {
    var l = w.p;
    try {
      return w.p = t, e();
    } finally {
      w.p = l;
    }
  }
  var Xe = Math.random().toString(36).slice(2), ne = "__reactFiber$" + Xe, pe = "__reactProps$" + Xe, Hn = "__reactContainer$" + Xe, uc = "__reactEvents$" + Xe, wv = "__reactListeners$" + Xe, Bv = "__reactHandles$" + Xe, Kf = "__reactResources$" + Xe, Aa = "__reactMarker$" + Xe;
  function ic(t) {
    delete t[ne], delete t[pe], delete t[uc], delete t[wv], delete t[Bv];
  }
  function wn(t) {
    var e = t[ne];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Hn] || l[ne]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = vh(t); t !== null; ) {
            if (l = t[ne]) return l;
            t = vh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Bn(t) {
    if (t = t[ne] || t[Hn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Da(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function qn(t) {
    var e = t[Kf];
    return e || (e = t[Kf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function It(t) {
    t[Aa] = !0;
  }
  var Jf = /* @__PURE__ */ new Set(), kf = {};
  function vn(t, e) {
    Yn(t, e), Yn(t + "Capture", e);
  }
  function Yn(t, e) {
    for (kf[t] = e, t = 0; t < e.length; t++)
      Jf.add(e[t]);
  }
  var qv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), $f = {}, Wf = {};
  function Yv(t) {
    return rn.call(Wf, t) ? !0 : rn.call($f, t) ? !1 : qv.test(t) ? Wf[t] = !0 : ($f[t] = !0, !1);
  }
  function Ru(t, e, l) {
    if (Yv(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Uu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function pl(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + n);
    }
  }
  function Le(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Ff(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Xv(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(c) {
          l = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(c) {
          l = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function cc(t) {
    if (!t._valueTracker) {
      var e = Ff(t) ? "checked" : "value";
      t._valueTracker = Xv(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function If(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = Ff(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function ju(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Lv = /[\n"\\]/g;
  function Ge(t) {
    return t.replace(
      Lv,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function sc(t, e, l, n, a, u, c, r) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Le(e)) : t.value !== "" + Le(e) && (t.value = "" + Le(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), e != null ? fc(t, c, Le(e)) : l != null ? fc(t, c, Le(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + Le(r) : t.removeAttribute("name");
  }
  function Pf(t, e, l, n, a, u, c, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        cc(t);
        return;
      }
      l = l != null ? "" + Le(l) : "", e = e != null ? "" + Le(e) : l, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = r ? t.checked : !!n, t.defaultChecked = !!n, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), cc(t);
  }
  function fc(t, e, l) {
    e === "number" && ju(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function Xn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Le(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function to(t, e, l) {
    if (e != null && (e = "" + Le(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Le(l) : "";
  }
  function eo(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(o(92));
        if (ee(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Le(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), cc(t);
  }
  function Ln(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Gv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function lo(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Gv.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function no(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && lo(t, a, n);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && lo(t, u, e[u]);
  }
  function oc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var Qv = /* @__PURE__ */ new Map([
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
  ]), Zv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hu(t) {
    return Zv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Sl() {
  }
  var rc = null;
  function dc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Gn = null, Qn = null;
  function ao(t) {
    var e = Bn(t);
    if (e && (t = e.stateNode)) {
      var l = t[pe] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (sc(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Ge(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[pe] || null;
                if (!a) throw Error(o(90));
                sc(
                  n,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              n = l[e], n.form === t.form && If(n);
          }
          break t;
        case "textarea":
          to(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Xn(t, !!l.multiple, e, !1);
      }
    }
  }
  var hc = !1;
  function uo(t, e, l) {
    if (hc) return t(e, l);
    hc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (hc = !1, (Gn !== null || Qn !== null) && (Ei(), Gn && (e = Gn, t = Qn, Qn = Gn = null, ao(e), t)))
        for (e = 0; e < t.length; e++) ao(t[e]);
    }
  }
  function Ma(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[pe] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
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
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        o(231, e, typeof l)
      );
    return l;
  }
  var xl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vc = !1;
  if (xl)
    try {
      var Oa = {};
      Object.defineProperty(Oa, "passive", {
        get: function() {
          vc = !0;
        }
      }), window.addEventListener("test", Oa, Oa), window.removeEventListener("test", Oa, Oa);
    } catch {
      vc = !1;
    }
  var Yl = null, mc = null, wu = null;
  function io() {
    if (wu) return wu;
    var t, e = mc, l = e.length, n, a = "value" in Yl ? Yl.value : Yl.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var c = l - t;
    for (n = 1; n <= c && e[l - n] === a[u - n]; n++) ;
    return wu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Bu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function qu() {
    return !0;
  }
  function co() {
    return !1;
  }
  function Se(t) {
    function e(l, n, a, u, c) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (l = t[r], this[r] = l ? l(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? qu : co, this.isPropagationStopped = co, this;
    }
    return _(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = qu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = qu);
      },
      persist: function() {
      },
      isPersistent: qu
    }), e;
  }
  var mn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Yu = Se(mn), Ca = _({}, mn, { view: 0, detail: 0 }), Vv = Se(Ca), gc, yc, Na, Xu = _({}, Ca, {
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
    getModifierState: pc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Na && (Na && t.type === "mousemove" ? (gc = t.screenX - Na.screenX, yc = t.screenY - Na.screenY) : yc = gc = 0, Na = t), gc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : yc;
    }
  }), so = Se(Xu), Kv = _({}, Xu, { dataTransfer: 0 }), Jv = Se(Kv), kv = _({}, Ca, { relatedTarget: 0 }), bc = Se(kv), $v = _({}, mn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wv = Se($v), Fv = _({}, mn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Iv = Se(Fv), Pv = _({}, mn, { data: 0 }), fo = Se(Pv), tm = {
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
  }, em = {
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
  }, lm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function nm(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = lm[t]) ? !!e[t] : !1;
  }
  function pc() {
    return nm;
  }
  var am = _({}, Ca, {
    key: function(t) {
      if (t.key) {
        var e = tm[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Bu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? em[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: pc,
    charCode: function(t) {
      return t.type === "keypress" ? Bu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Bu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), um = Se(am), im = _({}, Xu, {
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
  }), oo = Se(im), cm = _({}, Ca, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: pc
  }), sm = Se(cm), fm = _({}, mn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), om = Se(fm), rm = _({}, Xu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dm = Se(rm), hm = _({}, mn, {
    newState: 0,
    oldState: 0
  }), vm = Se(hm), mm = [9, 13, 27, 32], Sc = xl && "CompositionEvent" in window, Ra = null;
  xl && "documentMode" in document && (Ra = document.documentMode);
  var gm = xl && "TextEvent" in window && !Ra, ro = xl && (!Sc || Ra && 8 < Ra && 11 >= Ra), ho = " ", vo = !1;
  function mo(t, e) {
    switch (t) {
      case "keyup":
        return mm.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function go(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Zn = !1;
  function ym(t, e) {
    switch (t) {
      case "compositionend":
        return go(e);
      case "keypress":
        return e.which !== 32 ? null : (vo = !0, ho);
      case "textInput":
        return t = e.data, t === ho && vo ? null : t;
      default:
        return null;
    }
  }
  function bm(t, e) {
    if (Zn)
      return t === "compositionend" || !Sc && mo(t, e) ? (t = io(), wu = mc = Yl = null, Zn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return ro && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var pm = {
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
  function yo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!pm[t.type] : e === "textarea";
  }
  function bo(t, e, l, n) {
    Gn ? Qn ? Qn.push(n) : Qn = [n] : Gn = n, e = Oi(e, "onChange"), 0 < e.length && (l = new Yu(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var Ua = null, ja = null;
  function Sm(t) {
    th(t, 0);
  }
  function Lu(t) {
    var e = Da(t);
    if (If(e)) return t;
  }
  function po(t, e) {
    if (t === "change") return e;
  }
  var So = !1;
  if (xl) {
    var xc;
    if (xl) {
      var Ec = "oninput" in document;
      if (!Ec) {
        var xo = document.createElement("div");
        xo.setAttribute("oninput", "return;"), Ec = typeof xo.oninput == "function";
      }
      xc = Ec;
    } else xc = !1;
    So = xc && (!document.documentMode || 9 < document.documentMode);
  }
  function Eo() {
    Ua && (Ua.detachEvent("onpropertychange", zo), ja = Ua = null);
  }
  function zo(t) {
    if (t.propertyName === "value" && Lu(ja)) {
      var e = [];
      bo(
        e,
        ja,
        t,
        dc(t)
      ), uo(Sm, e);
    }
  }
  function xm(t, e, l) {
    t === "focusin" ? (Eo(), Ua = e, ja = l, Ua.attachEvent("onpropertychange", zo)) : t === "focusout" && Eo();
  }
  function Em(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Lu(ja);
  }
  function zm(t, e) {
    if (t === "click") return Lu(e);
  }
  function Tm(t, e) {
    if (t === "input" || t === "change")
      return Lu(e);
  }
  function _m(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Oe = typeof Object.is == "function" ? Object.is : _m;
  function Ha(t, e) {
    if (Oe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!rn.call(e, a) || !Oe(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function To(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function _o(t, e) {
    var l = To(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = t + l.textContent.length, t <= e && n >= e)
          return { node: l, offset: e - t };
        t = n;
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
      l = To(l);
    }
  }
  function Ao(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Ao(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Do(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = ju(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = ju(t.document);
    }
    return e;
  }
  function zc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Am = xl && "documentMode" in document && 11 >= document.documentMode, Vn = null, Tc = null, wa = null, _c = !1;
  function Mo(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    _c || Vn == null || Vn !== ju(n) || (n = Vn, "selectionStart" in n && zc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), wa && Ha(wa, n) || (wa = n, n = Oi(Tc, "onSelect"), 0 < n.length && (e = new Yu(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = Vn)));
  }
  function gn(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Kn = {
    animationend: gn("Animation", "AnimationEnd"),
    animationiteration: gn("Animation", "AnimationIteration"),
    animationstart: gn("Animation", "AnimationStart"),
    transitionrun: gn("Transition", "TransitionRun"),
    transitionstart: gn("Transition", "TransitionStart"),
    transitioncancel: gn("Transition", "TransitionCancel"),
    transitionend: gn("Transition", "TransitionEnd")
  }, Ac = {}, Oo = {};
  xl && (Oo = document.createElement("div").style, "AnimationEvent" in window || (delete Kn.animationend.animation, delete Kn.animationiteration.animation, delete Kn.animationstart.animation), "TransitionEvent" in window || delete Kn.transitionend.transition);
  function yn(t) {
    if (Ac[t]) return Ac[t];
    if (!Kn[t]) return t;
    var e = Kn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in Oo)
        return Ac[t] = e[l];
    return t;
  }
  var Co = yn("animationend"), No = yn("animationiteration"), Ro = yn("animationstart"), Dm = yn("transitionrun"), Mm = yn("transitionstart"), Om = yn("transitioncancel"), Uo = yn("transitionend"), jo = /* @__PURE__ */ new Map(), Dc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Dc.push("scrollEnd");
  function el(t, e) {
    jo.set(t, e), vn(e, [t]);
  }
  var Gu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Qe = [], Jn = 0, Mc = 0;
  function Qu() {
    for (var t = Jn, e = Mc = Jn = 0; e < t; ) {
      var l = Qe[e];
      Qe[e++] = null;
      var n = Qe[e];
      Qe[e++] = null;
      var a = Qe[e];
      Qe[e++] = null;
      var u = Qe[e];
      if (Qe[e++] = null, n !== null && a !== null) {
        var c = n.pending;
        c === null ? a.next = a : (a.next = c.next, c.next = a), n.pending = a;
      }
      u !== 0 && Ho(l, a, u);
    }
  }
  function Zu(t, e, l, n) {
    Qe[Jn++] = t, Qe[Jn++] = e, Qe[Jn++] = l, Qe[Jn++] = n, Mc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function Oc(t, e, l, n) {
    return Zu(t, e, l, n), Vu(t);
  }
  function bn(t, e) {
    return Zu(t, null, null, e), Vu(t);
  }
  function Ho(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - oe(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function Vu(t) {
    if (50 < au)
      throw au = 0, qs = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var kn = {};
  function Cm(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ce(t, e, l, n) {
    return new Cm(t, e, l, n);
  }
  function Cc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function El(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ce(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function wo(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Ku(t, e, l, n, a, u) {
    var c = 0;
    if (n = t, typeof t == "function") Cc(t) && (c = 1);
    else if (typeof t == "string")
      c = Hg(
        t,
        l,
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case pt:
          return t = Ce(31, l, e, a), t.elementType = pt, t.lanes = u, t;
        case Y:
          return pn(l.children, a, u, e);
        case Z:
          c = 8, a |= 24;
          break;
        case W:
          return t = Ce(12, l, e, a | 2), t.elementType = W, t.lanes = u, t;
        case it:
          return t = Ce(13, l, e, a), t.elementType = it, t.lanes = u, t;
        case lt:
          return t = Ce(19, l, e, a), t.elementType = lt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case K:
                c = 10;
                break t;
              case et:
                c = 9;
                break t;
              case nt:
                c = 11;
                break t;
              case L:
                c = 14;
                break t;
              case I:
                c = 16, n = null;
                break t;
            }
          c = 29, l = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = Ce(c, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function pn(t, e, l, n) {
    return t = Ce(7, t, n, e), t.lanes = l, t;
  }
  function Nc(t, e, l) {
    return t = Ce(6, t, null, e), t.lanes = l, t;
  }
  function Bo(t) {
    var e = Ce(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Rc(t, e, l) {
    return e = Ce(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var qo = /* @__PURE__ */ new WeakMap();
  function Ze(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = qo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Ta(e)
      }, qo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ta(e)
    };
  }
  var $n = [], Wn = 0, Ju = null, Ba = 0, Ve = [], Ke = 0, Xl = null, fl = 1, ol = "";
  function zl(t, e) {
    $n[Wn++] = Ba, $n[Wn++] = Ju, Ju = t, Ba = e;
  }
  function Yo(t, e, l) {
    Ve[Ke++] = fl, Ve[Ke++] = ol, Ve[Ke++] = Xl, Xl = t;
    var n = fl;
    t = ol;
    var a = 32 - oe(n) - 1;
    n &= ~(1 << a), l += 1;
    var u = 32 - oe(e) + a;
    if (30 < u) {
      var c = a - a % 5;
      u = (n & (1 << c) - 1).toString(32), n >>= c, a -= c, fl = 1 << 32 - oe(e) + a | l << a | n, ol = u + t;
    } else
      fl = 1 << u | l << a | n, ol = t;
  }
  function Uc(t) {
    t.return !== null && (zl(t, 1), Yo(t, 1, 0));
  }
  function jc(t) {
    for (; t === Ju; )
      Ju = $n[--Wn], $n[Wn] = null, Ba = $n[--Wn], $n[Wn] = null;
    for (; t === Xl; )
      Xl = Ve[--Ke], Ve[Ke] = null, ol = Ve[--Ke], Ve[Ke] = null, fl = Ve[--Ke], Ve[Ke] = null;
  }
  function Xo(t, e) {
    Ve[Ke++] = fl, Ve[Ke++] = ol, Ve[Ke++] = Xl, fl = e.id, ol = e.overflow, Xl = t;
  }
  var ae = null, Nt = null, vt = !1, Ll = null, Je = !1, Hc = Error(o(519));
  function Gl(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw qa(Ze(e, t)), Hc;
  }
  function Lo(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[ne] = t, e[pe] = n, l) {
      case "dialog":
        ft("cancel", e), ft("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ft("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < iu.length; l++)
          ft(iu[l], e);
        break;
      case "source":
        ft("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ft("error", e), ft("load", e);
        break;
      case "details":
        ft("toggle", e);
        break;
      case "input":
        ft("invalid", e), Pf(
          e,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        ft("invalid", e);
        break;
      case "textarea":
        ft("invalid", e), eo(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || ah(e.textContent, l) ? (n.popover != null && (ft("beforetoggle", e), ft("toggle", e)), n.onScroll != null && ft("scroll", e), n.onScrollEnd != null && ft("scrollend", e), n.onClick != null && (e.onclick = Sl), e = !0) : e = !1, e || Gl(t, !0);
  }
  function Go(t) {
    for (ae = t.return; ae; )
      switch (ae.tag) {
        case 5:
        case 31:
        case 13:
          Je = !1;
          return;
        case 27:
        case 3:
          Je = !0;
          return;
        default:
          ae = ae.return;
      }
  }
  function Fn(t) {
    if (t !== ae) return !1;
    if (!vt) return Go(t), vt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Ps(t.type, t.memoizedProps)), l = !l), l && Nt && Gl(t), Go(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Nt = hh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Nt = hh(t);
    } else
      e === 27 ? (e = Nt, ln(t.type) ? (t = af, af = null, Nt = t) : Nt = e) : Nt = ae ? $e(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Sn() {
    Nt = ae = null, vt = !1;
  }
  function wc() {
    var t = Ll;
    return t !== null && (Te === null ? Te = t : Te.push.apply(
      Te,
      t
    ), Ll = null), t;
  }
  function qa(t) {
    Ll === null ? Ll = [t] : Ll.push(t);
  }
  var Bc = y(null), xn = null, Tl = null;
  function Ql(t, e, l) {
    q(Bc, e._currentValue), e._currentValue = l;
  }
  function _l(t) {
    t._currentValue = Bc.current, N(Bc);
  }
  function qc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Yc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var c = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = a;
          for (var v = 0; v < e.length; v++)
            if (r.context === e[v]) {
              u.lanes |= l, r = u.alternate, r !== null && (r.lanes |= l), qc(
                u.return,
                l,
                t
              ), n || (c = null);
              break t;
            }
          u = r.next;
        }
      } else if (a.tag === 18) {
        if (c = a.return, c === null) throw Error(o(341));
        c.lanes |= l, u = c.alternate, u !== null && (u.lanes |= l), qc(c, l, t), c = null;
      } else c = a.child;
      if (c !== null) c.return = a;
      else
        for (c = a; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (a = c.sibling, a !== null) {
            a.return = c.return, c = a;
            break;
          }
          c = c.return;
        }
      a = c;
    }
  }
  function In(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var c = a.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var r = a.type;
          Oe(a.pendingProps.value, c.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (a === ht.current) {
        if (c = a.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(ru) : t = [ru]);
      }
      a = a.return;
    }
    t !== null && Yc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function ku(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Oe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function En(t) {
    xn = t, Tl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ue(t) {
    return Qo(xn, t);
  }
  function $u(t, e) {
    return xn === null && En(t), Qo(t, e);
  }
  function Qo(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Tl === null) {
      if (t === null) throw Error(o(308));
      Tl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Tl = Tl.next = e;
    return l;
  }
  var Nm = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, Rm = i.unstable_scheduleCallback, Um = i.unstable_NormalPriority, Qt = {
    $$typeof: K,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Xc() {
    return {
      controller: new Nm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ya(t) {
    t.refCount--, t.refCount === 0 && Rm(Um, function() {
      t.controller.abort();
    });
  }
  var Xa = null, Lc = 0, Pn = 0, ta = null;
  function jm(t, e) {
    if (Xa === null) {
      var l = Xa = [];
      Lc = 0, Pn = Zs(), ta = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return Lc++, e.then(Zo, Zo), e;
  }
  function Zo() {
    if (--Lc === 0 && Xa !== null) {
      ta !== null && (ta.status = "fulfilled");
      var t = Xa;
      Xa = null, Pn = 0, ta = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Hm(t, e) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = e;
        for (var a = 0; a < l.length; a++) (0, l[a])(e);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++)
          (0, l[a])(void 0);
      }
    ), n;
  }
  var Vo = C.S;
  C.S = function(t, e) {
    Md = fe(), typeof e == "object" && e !== null && typeof e.then == "function" && jm(t, e), Vo !== null && Vo(t, e);
  };
  var zn = y(null);
  function Gc() {
    var t = zn.current;
    return t !== null ? t : Mt.pooledCache;
  }
  function Wu(t, e) {
    e === null ? q(zn, zn.current) : q(zn, e.pool);
  }
  function Ko() {
    var t = Gc();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var ea = Error(o(460)), Qc = Error(o(474)), Fu = Error(o(542)), Iu = { then: function() {
  } };
  function Jo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function ko(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Sl, Sl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Wo(t), t;
      default:
        if (typeof e.status == "string") e.then(Sl, Sl);
        else {
          if (t = Mt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = e, t.status = "pending", t.then(
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Wo(t), t;
        }
        throw _n = e, ea;
    }
  }
  function Tn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (_n = l, ea) : l;
    }
  }
  var _n = null;
  function $o() {
    if (_n === null) throw Error(o(459));
    var t = _n;
    return _n = null, t;
  }
  function Wo(t) {
    if (t === ea || t === Fu)
      throw Error(o(483));
  }
  var la = null, La = 0;
  function Pu(t) {
    var e = La;
    return La += 1, la === null && (la = []), ko(la, t, e);
  }
  function Ga(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function ti(t, e) {
    throw e.$$typeof === H ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Fo(t) {
    function e(p, g) {
      if (t) {
        var x = p.deletions;
        x === null ? (p.deletions = [g], p.flags |= 16) : x.push(g);
      }
    }
    function l(p, g) {
      if (!t) return null;
      for (; g !== null; )
        e(p, g), g = g.sibling;
      return null;
    }
    function n(p) {
      for (var g = /* @__PURE__ */ new Map(); p !== null; )
        p.key !== null ? g.set(p.key, p) : g.set(p.index, p), p = p.sibling;
      return g;
    }
    function a(p, g) {
      return p = El(p, g), p.index = 0, p.sibling = null, p;
    }
    function u(p, g, x) {
      return p.index = x, t ? (x = p.alternate, x !== null ? (x = x.index, x < g ? (p.flags |= 67108866, g) : x) : (p.flags |= 67108866, g)) : (p.flags |= 1048576, g);
    }
    function c(p) {
      return t && p.alternate === null && (p.flags |= 67108866), p;
    }
    function r(p, g, x, U) {
      return g === null || g.tag !== 6 ? (g = Nc(x, p.mode, U), g.return = p, g) : (g = a(g, x), g.return = p, g);
    }
    function v(p, g, x, U) {
      var V = x.type;
      return V === Y ? R(
        p,
        g,
        x.props.children,
        U,
        x.key
      ) : g !== null && (g.elementType === V || typeof V == "object" && V !== null && V.$$typeof === I && Tn(V) === g.type) ? (g = a(g, x.props), Ga(g, x), g.return = p, g) : (g = Ku(
        x.type,
        x.key,
        x.props,
        null,
        p.mode,
        U
      ), Ga(g, x), g.return = p, g);
    }
    function E(p, g, x, U) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = Rc(x, p.mode, U), g.return = p, g) : (g = a(g, x.children || []), g.return = p, g);
    }
    function R(p, g, x, U, V) {
      return g === null || g.tag !== 7 ? (g = pn(
        x,
        p.mode,
        U,
        V
      ), g.return = p, g) : (g = a(g, x), g.return = p, g);
    }
    function j(p, g, x) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = Nc(
          "" + g,
          p.mode,
          x
        ), g.return = p, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case B:
            return x = Ku(
              g.type,
              g.key,
              g.props,
              null,
              p.mode,
              x
            ), Ga(x, g), x.return = p, x;
          case k:
            return g = Rc(
              g,
              p.mode,
              x
            ), g.return = p, g;
          case I:
            return g = Tn(g), j(p, g, x);
        }
        if (ee(g) || Ot(g))
          return g = pn(
            g,
            p.mode,
            x,
            null
          ), g.return = p, g;
        if (typeof g.then == "function")
          return j(p, Pu(g), x);
        if (g.$$typeof === K)
          return j(
            p,
            $u(p, g),
            x
          );
        ti(p, g);
      }
      return null;
    }
    function T(p, g, x, U) {
      var V = g !== null ? g.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return V !== null ? null : r(p, g, "" + x, U);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case B:
            return x.key === V ? v(p, g, x, U) : null;
          case k:
            return x.key === V ? E(p, g, x, U) : null;
          case I:
            return x = Tn(x), T(p, g, x, U);
        }
        if (ee(x) || Ot(x))
          return V !== null ? null : R(p, g, x, U, null);
        if (typeof x.then == "function")
          return T(
            p,
            g,
            Pu(x),
            U
          );
        if (x.$$typeof === K)
          return T(
            p,
            g,
            $u(p, x),
            U
          );
        ti(p, x);
      }
      return null;
    }
    function D(p, g, x, U, V) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return p = p.get(x) || null, r(g, p, "" + U, V);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case B:
            return p = p.get(
              U.key === null ? x : U.key
            ) || null, v(g, p, U, V);
          case k:
            return p = p.get(
              U.key === null ? x : U.key
            ) || null, E(g, p, U, V);
          case I:
            return U = Tn(U), D(
              p,
              g,
              x,
              U,
              V
            );
        }
        if (ee(U) || Ot(U))
          return p = p.get(x) || null, R(g, p, U, V, null);
        if (typeof U.then == "function")
          return D(
            p,
            g,
            x,
            Pu(U),
            V
          );
        if (U.$$typeof === K)
          return D(
            p,
            g,
            x,
            $u(g, U),
            V
          );
        ti(g, U);
      }
      return null;
    }
    function G(p, g, x, U) {
      for (var V = null, yt = null, Q = g, ut = g = 0, rt = null; Q !== null && ut < x.length; ut++) {
        Q.index > ut ? (rt = Q, Q = null) : rt = Q.sibling;
        var bt = T(
          p,
          Q,
          x[ut],
          U
        );
        if (bt === null) {
          Q === null && (Q = rt);
          break;
        }
        t && Q && bt.alternate === null && e(p, Q), g = u(bt, g, ut), yt === null ? V = bt : yt.sibling = bt, yt = bt, Q = rt;
      }
      if (ut === x.length)
        return l(p, Q), vt && zl(p, ut), V;
      if (Q === null) {
        for (; ut < x.length; ut++)
          Q = j(p, x[ut], U), Q !== null && (g = u(
            Q,
            g,
            ut
          ), yt === null ? V = Q : yt.sibling = Q, yt = Q);
        return vt && zl(p, ut), V;
      }
      for (Q = n(Q); ut < x.length; ut++)
        rt = D(
          Q,
          p,
          ut,
          x[ut],
          U
        ), rt !== null && (t && rt.alternate !== null && Q.delete(
          rt.key === null ? ut : rt.key
        ), g = u(
          rt,
          g,
          ut
        ), yt === null ? V = rt : yt.sibling = rt, yt = rt);
      return t && Q.forEach(function(sn) {
        return e(p, sn);
      }), vt && zl(p, ut), V;
    }
    function $(p, g, x, U) {
      if (x == null) throw Error(o(151));
      for (var V = null, yt = null, Q = g, ut = g = 0, rt = null, bt = x.next(); Q !== null && !bt.done; ut++, bt = x.next()) {
        Q.index > ut ? (rt = Q, Q = null) : rt = Q.sibling;
        var sn = T(p, Q, bt.value, U);
        if (sn === null) {
          Q === null && (Q = rt);
          break;
        }
        t && Q && sn.alternate === null && e(p, Q), g = u(sn, g, ut), yt === null ? V = sn : yt.sibling = sn, yt = sn, Q = rt;
      }
      if (bt.done)
        return l(p, Q), vt && zl(p, ut), V;
      if (Q === null) {
        for (; !bt.done; ut++, bt = x.next())
          bt = j(p, bt.value, U), bt !== null && (g = u(bt, g, ut), yt === null ? V = bt : yt.sibling = bt, yt = bt);
        return vt && zl(p, ut), V;
      }
      for (Q = n(Q); !bt.done; ut++, bt = x.next())
        bt = D(Q, p, ut, bt.value, U), bt !== null && (t && bt.alternate !== null && Q.delete(bt.key === null ? ut : bt.key), g = u(bt, g, ut), yt === null ? V = bt : yt.sibling = bt, yt = bt);
      return t && Q.forEach(function(Kg) {
        return e(p, Kg);
      }), vt && zl(p, ut), V;
    }
    function Dt(p, g, x, U) {
      if (typeof x == "object" && x !== null && x.type === Y && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case B:
            t: {
              for (var V = x.key; g !== null; ) {
                if (g.key === V) {
                  if (V = x.type, V === Y) {
                    if (g.tag === 7) {
                      l(
                        p,
                        g.sibling
                      ), U = a(
                        g,
                        x.props.children
                      ), U.return = p, p = U;
                      break t;
                    }
                  } else if (g.elementType === V || typeof V == "object" && V !== null && V.$$typeof === I && Tn(V) === g.type) {
                    l(
                      p,
                      g.sibling
                    ), U = a(g, x.props), Ga(U, x), U.return = p, p = U;
                    break t;
                  }
                  l(p, g);
                  break;
                } else e(p, g);
                g = g.sibling;
              }
              x.type === Y ? (U = pn(
                x.props.children,
                p.mode,
                U,
                x.key
              ), U.return = p, p = U) : (U = Ku(
                x.type,
                x.key,
                x.props,
                null,
                p.mode,
                U
              ), Ga(U, x), U.return = p, p = U);
            }
            return c(p);
          case k:
            t: {
              for (V = x.key; g !== null; ) {
                if (g.key === V)
                  if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                    l(
                      p,
                      g.sibling
                    ), U = a(g, x.children || []), U.return = p, p = U;
                    break t;
                  } else {
                    l(p, g);
                    break;
                  }
                else e(p, g);
                g = g.sibling;
              }
              U = Rc(x, p.mode, U), U.return = p, p = U;
            }
            return c(p);
          case I:
            return x = Tn(x), Dt(
              p,
              g,
              x,
              U
            );
        }
        if (ee(x))
          return G(
            p,
            g,
            x,
            U
          );
        if (Ot(x)) {
          if (V = Ot(x), typeof V != "function") throw Error(o(150));
          return x = V.call(x), $(
            p,
            g,
            x,
            U
          );
        }
        if (typeof x.then == "function")
          return Dt(
            p,
            g,
            Pu(x),
            U
          );
        if (x.$$typeof === K)
          return Dt(
            p,
            g,
            $u(p, x),
            U
          );
        ti(p, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, g !== null && g.tag === 6 ? (l(p, g.sibling), U = a(g, x), U.return = p, p = U) : (l(p, g), U = Nc(x, p.mode, U), U.return = p, p = U), c(p)) : l(p, g);
    }
    return function(p, g, x, U) {
      try {
        La = 0;
        var V = Dt(
          p,
          g,
          x,
          U
        );
        return la = null, V;
      } catch (Q) {
        if (Q === ea || Q === Fu) throw Q;
        var yt = Ce(29, Q, null, p.mode);
        return yt.lanes = U, yt.return = p, yt;
      } finally {
      }
    };
  }
  var An = Fo(!0), Io = Fo(!1), Zl = !1;
  function Zc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Vc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Vl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Kl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (xt & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = Vu(t), Ho(t, null, l), e;
    }
    return Zu(t, n, e, l), Vu(t);
  }
  function Qa(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Me(t, l);
    }
  }
  function Kc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = c : u = u.next = c, l = l.next;
        } while (l !== null);
        u === null ? a = u = e : u = u.next = e;
      } else a = u = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Jc = !1;
  function Za() {
    if (Jc) {
      var t = ta;
      if (t !== null) throw t;
    }
  }
  function Va(t, e, l, n) {
    Jc = !1;
    var a = t.updateQueue;
    Zl = !1;
    var u = a.firstBaseUpdate, c = a.lastBaseUpdate, r = a.shared.pending;
    if (r !== null) {
      a.shared.pending = null;
      var v = r, E = v.next;
      v.next = null, c === null ? u = E : c.next = E, c = v;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, r = R.lastBaseUpdate, r !== c && (r === null ? R.firstBaseUpdate = E : r.next = E, R.lastBaseUpdate = v));
    }
    if (u !== null) {
      var j = a.baseState;
      c = 0, R = E = v = null, r = u;
      do {
        var T = r.lane & -536870913, D = T !== r.lane;
        if (D ? (ot & T) === T : (n & T) === T) {
          T !== 0 && T === Pn && (Jc = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var G = t, $ = r;
            T = e;
            var Dt = l;
            switch ($.tag) {
              case 1:
                if (G = $.payload, typeof G == "function") {
                  j = G.call(Dt, j, T);
                  break t;
                }
                j = G;
                break t;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = $.payload, T = typeof G == "function" ? G.call(Dt, j, T) : G, T == null) break t;
                j = _({}, j, T);
                break t;
              case 2:
                Zl = !0;
            }
          }
          T = r.callback, T !== null && (t.flags |= 64, D && (t.flags |= 8192), D = a.callbacks, D === null ? a.callbacks = [T] : D.push(T));
        } else
          D = {
            lane: T,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, R === null ? (E = R = D, v = j) : R = R.next = D, c |= T;
        if (r = r.next, r === null) {
          if (r = a.shared.pending, r === null)
            break;
          D = r, r = D.next, D.next = null, a.lastBaseUpdate = D, a.shared.pending = null;
        }
      } while (!0);
      R === null && (v = j), a.baseState = v, a.firstBaseUpdate = E, a.lastBaseUpdate = R, u === null && (a.shared.lanes = 0), Fl |= c, t.lanes = c, t.memoizedState = j;
    }
  }
  function Po(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function tr(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Po(l[t], e);
  }
  var na = y(null), ei = y(0);
  function er(t, e) {
    t = jl, q(ei, t), q(na, e), jl = t | e.baseLanes;
  }
  function kc() {
    q(ei, jl), q(na, na.current);
  }
  function $c() {
    jl = ei.current, N(na), N(ei);
  }
  var Ne = y(null), ke = null;
  function Jl(t) {
    var e = t.alternate;
    q(Yt, Yt.current & 1), q(Ne, t), ke === null && (e === null || na.current !== null || e.memoizedState !== null) && (ke = t);
  }
  function Wc(t) {
    q(Yt, Yt.current), q(Ne, t), ke === null && (ke = t);
  }
  function lr(t) {
    t.tag === 22 ? (q(Yt, Yt.current), q(Ne, t), ke === null && (ke = t)) : kl();
  }
  function kl() {
    q(Yt, Yt.current), q(Ne, Ne.current);
  }
  function Re(t) {
    N(Ne), ke === t && (ke = null), N(Yt);
  }
  var Yt = y(0);
  function li(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || lf(l) || nf(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Al = 0, at = null, _t = null, Zt = null, ni = !1, aa = !1, Dn = !1, ai = 0, Ka = 0, ua = null, wm = 0;
  function Ht() {
    throw Error(o(321));
  }
  function Fc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Oe(t[l], e[l])) return !1;
    return !0;
  }
  function Ic(t, e, l, n, a, u) {
    return Al = u, at = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, C.H = t === null || t.memoizedState === null ? Yr : hs, Dn = !1, u = l(n, a), Dn = !1, aa && (u = ar(
      e,
      l,
      n,
      a
    )), nr(t), u;
  }
  function nr(t) {
    C.H = $a;
    var e = _t !== null && _t.next !== null;
    if (Al = 0, Zt = _t = at = null, ni = !1, Ka = 0, ua = null, e) throw Error(o(300));
    t === null || Vt || (t = t.dependencies, t !== null && ku(t) && (Vt = !0));
  }
  function ar(t, e, l, n) {
    at = t;
    var a = 0;
    do {
      if (aa && (ua = null), Ka = 0, aa = !1, 25 <= a) throw Error(o(301));
      if (a += 1, Zt = _t = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      C.H = Xr, u = e(l, n);
    } while (aa);
    return u;
  }
  function Bm() {
    var t = C.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Ja(e) : e, t = t.useState()[0], (_t !== null ? _t.memoizedState : null) !== t && (at.flags |= 1024), e;
  }
  function Pc() {
    var t = ai !== 0;
    return ai = 0, t;
  }
  function ts(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function es(t) {
    if (ni) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ni = !1;
    }
    Al = 0, Zt = _t = at = null, aa = !1, Ka = ai = 0, ua = null;
  }
  function ve() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Zt === null ? at.memoizedState = Zt = t : Zt = Zt.next = t, Zt;
  }
  function Xt() {
    if (_t === null) {
      var t = at.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = _t.next;
    var e = Zt === null ? at.memoizedState : Zt.next;
    if (e !== null)
      Zt = e, _t = t;
    else {
      if (t === null)
        throw at.alternate === null ? Error(o(467)) : Error(o(310));
      _t = t, t = {
        memoizedState: _t.memoizedState,
        baseState: _t.baseState,
        baseQueue: _t.baseQueue,
        queue: _t.queue,
        next: null
      }, Zt === null ? at.memoizedState = Zt = t : Zt = Zt.next = t;
    }
    return Zt;
  }
  function ui() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ja(t) {
    var e = Ka;
    return Ka += 1, ua === null && (ua = []), t = ko(ua, t, e), e = at, (Zt === null ? e.memoizedState : Zt.next) === null && (e = e.alternate, C.H = e === null || e.memoizedState === null ? Yr : hs), t;
  }
  function ii(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ja(t);
      if (t.$$typeof === K) return ue(t);
    }
    throw Error(o(438, String(t)));
  }
  function ls(t) {
    var e = null, l = at.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = at.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = ui(), at.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = Ct;
    return e.index++, l;
  }
  function Dl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ci(t) {
    var e = Xt();
    return ns(e, _t, t);
  }
  function ns(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var c = a.next;
        a.next = u.next, u.next = c;
      }
      e.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var r = c = null, v = null, E = e, R = !1;
      do {
        var j = E.lane & -536870913;
        if (j !== E.lane ? (ot & j) === j : (Al & j) === j) {
          var T = E.revertLane;
          if (T === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null
            }), j === Pn && (R = !0);
          else if ((Al & T) === T) {
            E = E.next, T === Pn && (R = !0);
            continue;
          } else
            j = {
              lane: 0,
              revertLane: E.revertLane,
              gesture: null,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null
            }, v === null ? (r = v = j, c = u) : v = v.next = j, at.lanes |= T, Fl |= T;
          j = E.action, Dn && l(u, j), u = E.hasEagerState ? E.eagerState : l(u, j);
        } else
          T = {
            lane: j,
            revertLane: E.revertLane,
            gesture: E.gesture,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null
          }, v === null ? (r = v = T, c = u) : v = v.next = T, at.lanes |= j, Fl |= j;
        E = E.next;
      } while (E !== null && E !== e);
      if (v === null ? c = u : v.next = r, !Oe(u, t.memoizedState) && (Vt = !0, R && (l = ta, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = c, t.baseQueue = v, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function as(t) {
    var e = Xt(), l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, u = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var c = a = a.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== a);
      Oe(u, e.memoizedState) || (Vt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, n];
  }
  function ur(t, e, l) {
    var n = at, a = Xt(), u = vt;
    if (u) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = e();
    var c = !Oe(
      (_t || a).memoizedState,
      l
    );
    if (c && (a.memoizedState = l, Vt = !0), a = a.queue, cs(sr.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || c || Zt !== null && Zt.memoizedState.tag & 1) {
      if (n.flags |= 2048, ia(
        9,
        { destroy: void 0 },
        cr.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), Mt === null) throw Error(o(349));
      u || (Al & 127) !== 0 || ir(n, e, l);
    }
    return l;
  }
  function ir(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = at.updateQueue, e === null ? (e = ui(), at.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function cr(t, e, l, n) {
    e.value = l, e.getSnapshot = n, fr(e) && or(t);
  }
  function sr(t, e, l) {
    return l(function() {
      fr(e) && or(t);
    });
  }
  function fr(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Oe(t, l);
    } catch {
      return !0;
    }
  }
  function or(t) {
    var e = bn(t, 2);
    e !== null && _e(e, t, 2);
  }
  function us(t) {
    var e = ve();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Dn) {
        Be(!0);
        try {
          l();
        } finally {
          Be(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dl,
      lastRenderedState: t
    }, e;
  }
  function rr(t, e, l, n) {
    return t.baseState = l, ns(
      t,
      _t,
      typeof n == "function" ? n : Dl
    );
  }
  function qm(t, e, l, n, a) {
    if (oi(t)) throw Error(o(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      C.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, dr(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function dr(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = C.T, c = {};
      C.T = c;
      try {
        var r = l(a, n), v = C.S;
        v !== null && v(c, r), hr(t, e, r);
      } catch (E) {
        is(t, e, E);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), C.T = u;
      }
    } else
      try {
        u = l(a, n), hr(t, e, u);
      } catch (E) {
        is(t, e, E);
      }
  }
  function hr(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        vr(t, e, n);
      },
      function(n) {
        return is(t, e, n);
      }
    ) : vr(t, e, l);
  }
  function vr(t, e, l) {
    e.status = "fulfilled", e.value = l, mr(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, dr(t, l)));
  }
  function is(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, mr(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function mr(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function gr(t, e) {
    return e;
  }
  function yr(t, e) {
    if (vt) {
      var l = Mt.formState;
      if (l !== null) {
        t: {
          var n = at;
          if (vt) {
            if (Nt) {
              e: {
                for (var a = Nt, u = Je; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break e;
                  }
                  if (a = $e(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Nt = $e(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            Gl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return l = ve(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gr,
      lastRenderedState: e
    }, l.queue = n, l = wr.bind(
      null,
      at,
      n
    ), n.dispatch = l, n = us(!1), u = ds.bind(
      null,
      at,
      !1,
      n.queue
    ), n = ve(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = qm.bind(
      null,
      at,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function br(t) {
    var e = Xt();
    return pr(e, _t, t);
  }
  function pr(t, e, l) {
    if (e = ns(
      t,
      e,
      gr
    )[0], t = ci(Dl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = Ja(e);
      } catch (c) {
        throw c === ea ? Fu : c;
      }
    else n = e;
    e = Xt();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (at.flags |= 2048, ia(
      9,
      { destroy: void 0 },
      Ym.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function Ym(t, e) {
    t.action = e;
  }
  function Sr(t) {
    var e = Xt(), l = _t;
    if (l !== null)
      return pr(e, l, t);
    Xt(), e = e.memoizedState, l = Xt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function ia(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = at.updateQueue, e === null && (e = ui(), at.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function xr() {
    return Xt().memoizedState;
  }
  function si(t, e, l, n) {
    var a = ve();
    at.flags |= t, a.memoizedState = ia(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function fi(t, e, l, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    _t !== null && n !== null && Fc(n, _t.memoizedState.deps) ? a.memoizedState = ia(e, u, l, n) : (at.flags |= t, a.memoizedState = ia(
      1 | e,
      u,
      l,
      n
    ));
  }
  function Er(t, e) {
    si(8390656, 8, t, e);
  }
  function cs(t, e) {
    fi(2048, 8, t, e);
  }
  function Xm(t) {
    at.flags |= 4;
    var e = at.updateQueue;
    if (e === null)
      e = ui(), at.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function zr(t) {
    var e = Xt().memoizedState;
    return Xm({ ref: e, nextImpl: t }), function() {
      if ((xt & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Tr(t, e) {
    return fi(4, 2, t, e);
  }
  function _r(t, e) {
    return fi(4, 4, t, e);
  }
  function Ar(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Dr(t, e, l) {
    l = l != null ? l.concat([t]) : null, fi(4, 4, Ar.bind(null, e, t), l);
  }
  function ss() {
  }
  function Mr(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Fc(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function Or(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Fc(e, n[1]))
      return n[0];
    if (n = t(), Dn) {
      Be(!0);
      try {
        t();
      } finally {
        Be(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function fs(t, e, l) {
    return l === void 0 || (Al & 1073741824) !== 0 && (ot & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Cd(), at.lanes |= t, Fl |= t, l);
  }
  function Cr(t, e, l, n) {
    return Oe(l, e) ? l : na.current !== null ? (t = fs(t, l, n), Oe(t, e) || (Vt = !0), t) : (Al & 42) === 0 || (Al & 1073741824) !== 0 && (ot & 261930) === 0 ? (Vt = !0, t.memoizedState = l) : (t = Cd(), at.lanes |= t, Fl |= t, e);
  }
  function Nr(t, e, l, n, a) {
    var u = w.p;
    w.p = u !== 0 && 8 > u ? u : 8;
    var c = C.T, r = {};
    C.T = r, ds(t, !1, e, l);
    try {
      var v = a(), E = C.S;
      if (E !== null && E(r, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var R = Hm(
          v,
          n
        );
        ka(
          t,
          e,
          R,
          He(t)
        );
      } else
        ka(
          t,
          e,
          n,
          He(t)
        );
    } catch (j) {
      ka(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: j },
        He()
      );
    } finally {
      w.p = u, c !== null && r.types !== null && (c.types = r.types), C.T = c;
    }
  }
  function Lm() {
  }
  function os(t, e, l, n) {
    if (t.tag !== 5) throw Error(o(476));
    var a = Rr(t).queue;
    Nr(
      t,
      a,
      e,
      J,
      l === null ? Lm : function() {
        return Ur(t), l(n);
      }
    );
  }
  function Rr(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dl,
        lastRenderedState: J
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Ur(t) {
    var e = Rr(t);
    e.next === null && (e = t.alternate.memoizedState), ka(
      t,
      e.next.queue,
      {},
      He()
    );
  }
  function rs() {
    return ue(ru);
  }
  function jr() {
    return Xt().memoizedState;
  }
  function Hr() {
    return Xt().memoizedState;
  }
  function Gm(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = He();
          t = Vl(l);
          var n = Kl(e, t, l);
          n !== null && (_e(n, e, l), Qa(n, e, l)), e = { cache: Xc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Qm(t, e, l) {
    var n = He();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oi(t) ? Br(e, l) : (l = Oc(t, e, l, n), l !== null && (_e(l, t, n), qr(l, e, n)));
  }
  function wr(t, e, l) {
    var n = He();
    ka(t, e, l, n);
  }
  function ka(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oi(t)) Br(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var c = e.lastRenderedState, r = u(c, l);
          if (a.hasEagerState = !0, a.eagerState = r, Oe(r, c))
            return Zu(t, e, a, 0), Mt === null && Qu(), !1;
        } catch {
        } finally {
        }
      if (l = Oc(t, e, a, n), l !== null)
        return _e(l, t, n), qr(l, e, n), !0;
    }
    return !1;
  }
  function ds(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: Zs(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oi(t)) {
      if (e) throw Error(o(479));
    } else
      e = Oc(
        t,
        l,
        n,
        2
      ), e !== null && _e(e, t, 2);
  }
  function oi(t) {
    var e = t.alternate;
    return t === at || e !== null && e === at;
  }
  function Br(t, e) {
    aa = ni = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function qr(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Me(t, l);
    }
  }
  var $a = {
    readContext: ue,
    use: ii,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht,
    useHostTransitionStatus: Ht,
    useFormState: Ht,
    useActionState: Ht,
    useOptimistic: Ht,
    useMemoCache: Ht,
    useCacheRefresh: Ht
  };
  $a.useEffectEvent = Ht;
  var Yr = {
    readContext: ue,
    use: ii,
    useCallback: function(t, e) {
      return ve().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: Er,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, si(
        4194308,
        4,
        Ar.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return si(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      si(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = ve();
      e = e === void 0 ? null : e;
      var n = t();
      if (Dn) {
        Be(!0);
        try {
          t();
        } finally {
          Be(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = ve();
      if (l !== void 0) {
        var a = l(e);
        if (Dn) {
          Be(!0);
          try {
            l(e);
          } finally {
            Be(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = Qm.bind(
        null,
        at,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = ve();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = us(t);
      var e = t.queue, l = wr.bind(null, at, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: ss,
    useDeferredValue: function(t, e) {
      var l = ve();
      return fs(l, t, e);
    },
    useTransition: function() {
      var t = us(!1);
      return t = Nr.bind(
        null,
        at,
        t.queue,
        !0,
        !1
      ), ve().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = at, a = ve();
      if (vt) {
        if (l === void 0)
          throw Error(o(407));
        l = l();
      } else {
        if (l = e(), Mt === null)
          throw Error(o(349));
        (ot & 127) !== 0 || ir(n, e, l);
      }
      a.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return a.queue = u, Er(sr.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, ia(
        9,
        { destroy: void 0 },
        cr.bind(
          null,
          n,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = ve(), e = Mt.identifierPrefix;
      if (vt) {
        var l = ol, n = fl;
        l = (n & ~(1 << 32 - oe(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = ai++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = wm++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: rs,
    useFormState: yr,
    useActionState: yr,
    useOptimistic: function(t) {
      var e = ve();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = ds.bind(
        null,
        at,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: ls,
    useCacheRefresh: function() {
      return ve().memoizedState = Gm.bind(
        null,
        at
      );
    },
    useEffectEvent: function(t) {
      var e = ve(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((xt & 2) !== 0)
          throw Error(o(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, hs = {
    readContext: ue,
    use: ii,
    useCallback: Mr,
    useContext: ue,
    useEffect: cs,
    useImperativeHandle: Dr,
    useInsertionEffect: Tr,
    useLayoutEffect: _r,
    useMemo: Or,
    useReducer: ci,
    useRef: xr,
    useState: function() {
      return ci(Dl);
    },
    useDebugValue: ss,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Cr(
        l,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ci(Dl)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ja(t),
        e
      ];
    },
    useSyncExternalStore: ur,
    useId: jr,
    useHostTransitionStatus: rs,
    useFormState: br,
    useActionState: br,
    useOptimistic: function(t, e) {
      var l = Xt();
      return rr(l, _t, t, e);
    },
    useMemoCache: ls,
    useCacheRefresh: Hr
  };
  hs.useEffectEvent = zr;
  var Xr = {
    readContext: ue,
    use: ii,
    useCallback: Mr,
    useContext: ue,
    useEffect: cs,
    useImperativeHandle: Dr,
    useInsertionEffect: Tr,
    useLayoutEffect: _r,
    useMemo: Or,
    useReducer: as,
    useRef: xr,
    useState: function() {
      return as(Dl);
    },
    useDebugValue: ss,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return _t === null ? fs(l, t, e) : Cr(
        l,
        _t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = as(Dl)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ja(t),
        e
      ];
    },
    useSyncExternalStore: ur,
    useId: jr,
    useHostTransitionStatus: rs,
    useFormState: Sr,
    useActionState: Sr,
    useOptimistic: function(t, e) {
      var l = Xt();
      return _t !== null ? rr(l, _t, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: ls,
    useCacheRefresh: Hr
  };
  Xr.useEffectEvent = zr;
  function vs(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : _({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var ms = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = He(), a = Vl(n);
      a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (_e(e, t, n), Qa(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = He(), a = Vl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (_e(e, t, n), Qa(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = He(), n = Vl(l);
      n.tag = 2, e != null && (n.callback = e), e = Kl(t, n, l), e !== null && (_e(e, t, l), Qa(e, t, l));
    }
  };
  function Lr(t, e, l, n, a, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, c) : e.prototype && e.prototype.isPureReactComponent ? !Ha(l, n) || !Ha(a, u) : !0;
  }
  function Gr(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && ms.enqueueReplaceState(e, e.state, null);
  }
  function Mn(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = _({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function Qr(t) {
    Gu(t);
  }
  function Zr(t) {
    console.error(t);
  }
  function Vr(t) {
    Gu(t);
  }
  function ri(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Kr(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function gs(t, e, l) {
    return l = Vl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ri(t, e);
    }, l;
  }
  function Jr(t) {
    return t = Vl(t), t.tag = 3, t;
  }
  function kr(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        Kr(e, l, n);
      };
    }
    var c = l.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      Kr(e, l, n), typeof a != "function" && (Il === null ? Il = /* @__PURE__ */ new Set([this]) : Il.add(this));
      var r = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Zm(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && In(
        e,
        l,
        a,
        !0
      ), l = Ne.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return ke === null ? zi() : l.alternate === null && wt === 0 && (wt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === Iu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Ls(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === Iu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Ls(t, n, a)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return Ls(t, n, a), zi(), !1;
    }
    if (vt)
      return e = Ne.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Hc && (t = Error(o(422), { cause: n }), qa(Ze(t, l)))) : (n !== Hc && (e = Error(o(423), {
        cause: n
      }), qa(
        Ze(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ze(n, l), a = gs(
        t.stateNode,
        n,
        a
      ), Kc(t, a), wt !== 4 && (wt = 2)), !1;
    var u = Error(o(520), { cause: n });
    if (u = Ze(u, l), nu === null ? nu = [u] : nu.push(u), wt !== 4 && (wt = 2), e === null) return !0;
    n = Ze(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = gs(l.stateNode, n, t), Kc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Il === null || !Il.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = Jr(a), kr(
              a,
              t,
              l,
              n
            ), Kc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var ys = Error(o(461)), Vt = !1;
  function ie(t, e, l, n) {
    e.child = t === null ? Io(e, null, l, n) : An(
      e,
      t.child,
      l,
      n
    );
  }
  function $r(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var c = {};
      for (var r in n)
        r !== "ref" && (c[r] = n[r]);
    } else c = n;
    return En(e), n = Ic(
      t,
      e,
      l,
      c,
      u,
      a
    ), r = Pc(), t !== null && !Vt ? (ts(t, e, a), Ml(t, e, a)) : (vt && r && Uc(e), e.flags |= 1, ie(t, e, n, a), e.child);
  }
  function Wr(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !Cc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Fr(
        t,
        e,
        u,
        n,
        a
      )) : (t = Ku(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !_s(t, a)) {
      var c = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ha, l(c, n) && t.ref === e.ref)
        return Ml(t, e, a);
    }
    return e.flags |= 1, t = El(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Fr(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Ha(u, n) && t.ref === e.ref)
        if (Vt = !1, e.pendingProps = n = u, _s(t, a))
          (t.flags & 131072) !== 0 && (Vt = !0);
        else
          return e.lanes = t.lanes, Ml(t, e, a);
    }
    return bs(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Ir(t, e, l, n) {
    var a = n.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~u;
        } else n = 0, e.child = null;
        return Pr(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Wu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? er(e, u) : kc(), lr(e);
      else
        return n = e.lanes = 536870912, Pr(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (Wu(e, u.cachePool), er(e, u), kl(), e.memoizedState = null) : (t !== null && Wu(e, null), kc(), kl());
    return ie(t, e, a, l), e.child;
  }
  function Wa(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Pr(t, e, l, n, a) {
    var u = Gc();
    return u = u === null ? null : { parent: Qt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Wu(e, null), kc(), lr(e), t !== null && In(t, e, n, !0), e.childLanes = a, null;
  }
  function di(t, e) {
    return e = vi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function td(t, e, l) {
    return An(e, t.child, null, l), t = di(e, e.pendingProps), t.flags |= 2, Re(e), e.memoizedState = null, t;
  }
  function Vm(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (vt) {
        if (n.mode === "hidden")
          return t = di(e, n), e.lanes = 536870912, Wa(null, t);
        if (Wc(e), (t = Nt) ? (t = dh(
          t,
          Je
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Xl !== null ? { id: fl, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Bo(t), l.return = e, e.child = l, ae = e, Nt = null)) : t = null, t === null) throw Gl(e);
        return e.lanes = 536870912, null;
      }
      return di(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Wc(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = td(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
      else if (Vt || In(t, e, l, !1), a = (l & t.childLanes) !== 0, Vt || a) {
        if (n = Mt, n !== null && (c = Ye(n, l), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, bn(t, c), _e(n, t, c), ys;
        zi(), e = td(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Nt = $e(c.nextSibling), ae = e, vt = !0, Ll = null, Je = !1, t !== null && Xo(e, t), e = di(e, n), e.flags |= 4096;
      return e;
    }
    return t = El(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function hi(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function bs(t, e, l, n, a) {
    return En(e), l = Ic(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = Pc(), t !== null && !Vt ? (ts(t, e, a), Ml(t, e, a)) : (vt && n && Uc(e), e.flags |= 1, ie(t, e, l, a), e.child);
  }
  function ed(t, e, l, n, a, u) {
    return En(e), e.updateQueue = null, l = ar(
      e,
      n,
      l,
      a
    ), nr(t), n = Pc(), t !== null && !Vt ? (ts(t, e, u), Ml(t, e, u)) : (vt && n && Uc(e), e.flags |= 1, ie(t, e, l, u), e.child);
  }
  function ld(t, e, l, n, a) {
    if (En(e), e.stateNode === null) {
      var u = kn, c = l.contextType;
      typeof c == "object" && c !== null && (u = ue(c)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ms, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, Zc(e), c = l.contextType, u.context = typeof c == "object" && c !== null ? ue(c) : kn, u.state = e.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (vs(
        e,
        l,
        c,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ms.enqueueReplaceState(u, u.state, null), Va(e, n, u, a), Za(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var r = e.memoizedProps, v = Mn(l, r);
      u.props = v;
      var E = u.context, R = l.contextType;
      c = kn, typeof R == "object" && R !== null && (c = ue(R));
      var j = l.getDerivedStateFromProps;
      R = typeof j == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, R || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || E !== c) && Gr(
        e,
        u,
        n,
        c
      ), Zl = !1;
      var T = e.memoizedState;
      u.state = T, Va(e, n, u, a), Za(), E = e.memoizedState, r || T !== E || Zl ? (typeof j == "function" && (vs(
        e,
        l,
        j,
        n
      ), E = e.memoizedState), (v = Zl || Lr(
        e,
        l,
        v,
        n,
        T,
        E,
        c
      )) ? (R || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = E), u.props = n, u.state = E, u.context = c, n = v) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, Vc(t, e), c = e.memoizedProps, R = Mn(l, c), u.props = R, j = e.pendingProps, T = u.context, E = l.contextType, v = kn, typeof E == "object" && E !== null && (v = ue(E)), r = l.getDerivedStateFromProps, (E = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== j || T !== v) && Gr(
        e,
        u,
        n,
        v
      ), Zl = !1, T = e.memoizedState, u.state = T, Va(e, n, u, a), Za();
      var D = e.memoizedState;
      c !== j || T !== D || Zl || t !== null && t.dependencies !== null && ku(t.dependencies) ? (typeof r == "function" && (vs(
        e,
        l,
        r,
        n
      ), D = e.memoizedState), (R = Zl || Lr(
        e,
        l,
        R,
        n,
        T,
        D,
        v
      ) || t !== null && t.dependencies !== null && ku(t.dependencies)) ? (E || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, D, v), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        D,
        v
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = D), u.props = n, u.state = D, u.context = v, n = R) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, hi(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = An(
      e,
      t.child,
      null,
      a
    ), e.child = An(
      e,
      null,
      l,
      a
    )) : ie(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = Ml(
      t,
      e,
      a
    ), t;
  }
  function nd(t, e, l, n) {
    return Sn(), e.flags |= 256, ie(t, e, l, n), e.child;
  }
  var ps = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ss(t) {
    return { baseLanes: t, cachePool: Ko() };
  }
  function xs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= je), t;
  }
  function ad(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Yt.current & 2) !== 0), c && (a = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (vt) {
        if (a ? Jl(e) : kl(), (t = Nt) ? (t = dh(
          t,
          Je
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Xl !== null ? { id: fl, overflow: ol } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Bo(t), l.return = e, e.child = l, ae = e, Nt = null)) : t = null, t === null) throw Gl(e);
        return nf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var r = n.children;
      return n = n.fallback, a ? (kl(), a = e.mode, r = vi(
        { mode: "hidden", children: r },
        a
      ), n = pn(
        n,
        a,
        l,
        null
      ), r.return = e, n.return = e, r.sibling = n, e.child = r, n = e.child, n.memoizedState = Ss(l), n.childLanes = xs(
        t,
        c,
        l
      ), e.memoizedState = ps, Wa(null, n)) : (Jl(e), Es(e, r));
    }
    var v = t.memoizedState;
    if (v !== null && (r = v.dehydrated, r !== null)) {
      if (u)
        e.flags & 256 ? (Jl(e), e.flags &= -257, e = zs(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (kl(), e.child = t.child, e.flags |= 128, e = null) : (kl(), r = n.fallback, a = e.mode, n = vi(
          { mode: "visible", children: n.children },
          a
        ), r = pn(
          r,
          a,
          l,
          null
        ), r.flags |= 2, n.return = e, r.return = e, n.sibling = r, e.child = n, An(
          e,
          t.child,
          null,
          l
        ), n = e.child, n.memoizedState = Ss(l), n.childLanes = xs(
          t,
          c,
          l
        ), e.memoizedState = ps, e = Wa(null, n));
      else if (Jl(e), nf(r)) {
        if (c = r.nextSibling && r.nextSibling.dataset, c) var E = c.dgst;
        c = E, n = Error(o(419)), n.stack = "", n.digest = c, qa({ value: n, source: null, stack: null }), e = zs(
          t,
          e,
          l
        );
      } else if (Vt || In(t, e, l, !1), c = (l & t.childLanes) !== 0, Vt || c) {
        if (c = Mt, c !== null && (n = Ye(c, l), n !== 0 && n !== v.retryLane))
          throw v.retryLane = n, bn(t, n), _e(c, t, n), ys;
        lf(r) || zi(), e = zs(
          t,
          e,
          l
        );
      } else
        lf(r) ? (e.flags |= 192, e.child = t.child, e = null) : (t = v.treeContext, Nt = $e(
          r.nextSibling
        ), ae = e, vt = !0, Ll = null, Je = !1, t !== null && Xo(e, t), e = Es(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (kl(), r = n.fallback, a = e.mode, v = t.child, E = v.sibling, n = El(v, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = v.subtreeFlags & 65011712, E !== null ? r = El(
      E,
      r
    ) : (r = pn(
      r,
      a,
      l,
      null
    ), r.flags |= 2), r.return = e, n.return = e, n.sibling = r, e.child = n, Wa(null, n), n = e.child, r = t.child.memoizedState, r === null ? r = Ss(l) : (a = r.cachePool, a !== null ? (v = Qt._currentValue, a = a.parent !== v ? { parent: v, pool: v } : a) : a = Ko(), r = {
      baseLanes: r.baseLanes | l,
      cachePool: a
    }), n.memoizedState = r, n.childLanes = xs(
      t,
      c,
      l
    ), e.memoizedState = ps, Wa(t.child, n)) : (Jl(e), l = t.child, t = l.sibling, l = El(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Es(t, e) {
    return e = vi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function vi(t, e) {
    return t = Ce(22, t, null, e), t.lanes = 0, t;
  }
  function zs(t, e, l) {
    return An(e, t.child, null, l), t = Es(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function ud(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), qc(t.return, e, l);
  }
  function Ts(t, e, l, n, a, u) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: u
    } : (c.isBackwards = e, c.rendering = null, c.renderingStartTime = 0, c.last = n, c.tail = l, c.tailMode = a, c.treeForkCount = u);
  }
  function id(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var c = Yt.current, r = (c & 2) !== 0;
    if (r ? (c = c & 1 | 2, e.flags |= 128) : c &= 1, q(Yt, c), ie(t, e, n, l), n = vt ? Ba : 0, !r && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && ud(t, l, e);
        else if (t.tag === 19)
          ud(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "forwards":
        for (l = e.child, a = null; l !== null; )
          t = l.alternate, t !== null && li(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Ts(
          e,
          !1,
          a,
          l,
          u,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && li(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        Ts(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        Ts(
          e,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ml(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), Fl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (In(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, l = El(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = El(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function _s(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ku(t)));
  }
  function Km(t, e, l) {
    switch (e.tag) {
      case 3:
        Ut(e, e.stateNode.containerInfo), Ql(e, Qt, t.memoizedState.cache), Sn();
        break;
      case 27:
      case 5:
        mt(e);
        break;
      case 4:
        Ut(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ql(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Wc(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Jl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? ad(t, e, l) : (Jl(e), t = Ml(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Jl(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (In(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return id(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), q(Yt, Yt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Ir(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Ql(e, Qt, t.memoizedState.cache);
    }
    return Ml(t, e, l);
  }
  function cd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Vt = !0;
      else {
        if (!_s(t, l) && (e.flags & 128) === 0)
          return Vt = !1, Km(
            t,
            e,
            l
          );
        Vt = (t.flags & 131072) !== 0;
      }
    else
      Vt = !1, vt && (e.flags & 1048576) !== 0 && Yo(e, Ba, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Tn(e.elementType), e.type = t, typeof t == "function")
            Cc(t) ? (n = Mn(t, n), e.tag = 1, e = ld(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = bs(
              null,
              e,
              t,
              n,
              l
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === nt) {
                e.tag = 11, e = $r(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === L) {
                e.tag = 14, e = Wr(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = Gt(t) || t, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return bs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = Mn(
          n,
          e.pendingProps
        ), ld(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (Ut(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          n = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, Vc(t, e), Va(e, n, null, l);
          var c = e.memoizedState;
          if (n = c.cache, Ql(e, Qt, n), n !== u.cache && Yc(
            e,
            [Qt],
            l,
            !0
          ), Za(), n = c.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: c.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = nd(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = Ze(
                Error(o(424)),
                e
              ), qa(a), e = nd(
                t,
                e,
                n,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Nt = $e(t.firstChild), ae = e, vt = !0, Ll = null, Je = !0, l = Io(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Sn(), n === a) {
              e = Ml(
                t,
                e,
                l
              );
              break t;
            }
            ie(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return hi(t, e), t === null ? (l = bh(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : vt || (l = e.type, t = e.pendingProps, n = Ci(
          F.current
        ).createElement(l), n[ne] = e, n[pe] = t, ce(n, l, t), It(n), e.stateNode = n) : e.memoizedState = bh(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return mt(e), t === null && vt && (n = e.stateNode = mh(
          e.type,
          e.pendingProps,
          F.current
        ), ae = e, Je = !0, a = Nt, ln(e.type) ? (af = a, Nt = $e(n.firstChild)) : Nt = a), ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), hi(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && vt && ((a = n = Nt) && (n = Eg(
          n,
          e.type,
          e.pendingProps,
          Je
        ), n !== null ? (e.stateNode = n, ae = e, Nt = $e(n.firstChild), Je = !1, a = !0) : a = !1), a || Gl(e)), mt(e), a = e.type, u = e.pendingProps, c = t !== null ? t.memoizedProps : null, n = u.children, Ps(a, u) ? n = null : c !== null && Ps(a, c) && (e.flags |= 32), e.memoizedState !== null && (a = Ic(
          t,
          e,
          Bm,
          null,
          null,
          l
        ), ru._currentValue = a), hi(t, e), ie(t, e, n, l), e.child;
      case 6:
        return t === null && vt && ((t = l = Nt) && (l = zg(
          l,
          e.pendingProps,
          Je
        ), l !== null ? (e.stateNode = l, ae = e, Nt = null, t = !0) : t = !1), t || Gl(e)), null;
      case 13:
        return ad(t, e, l);
      case 4:
        return Ut(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = An(
          e,
          null,
          n,
          l
        ) : ie(t, e, n, l), e.child;
      case 11:
        return $r(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ie(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return n = e.pendingProps, Ql(e, e.type, n.value), ie(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, En(e), a = ue(a), n = n(a), e.flags |= 1, ie(t, e, n, l), e.child;
      case 14:
        return Wr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Fr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return id(t, e, l);
      case 31:
        return Vm(t, e, l);
      case 22:
        return Ir(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return En(e), n = ue(Qt), t === null ? (a = Gc(), a === null && (a = Mt, u = Xc(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, Zc(e), Ql(e, Qt, a)) : ((t.lanes & l) !== 0 && (Vc(t, e), Va(e, null, null, l), Za()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), Ql(e, Qt, n)) : (n = u.cache, Ql(e, Qt, n), n !== a.cache && Yc(
          e,
          [Qt],
          l,
          !0
        ))), ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Ol(t) {
    t.flags |= 4;
  }
  function As(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (jd()) t.flags |= 8192;
        else
          throw _n = Iu, Qc;
    } else t.flags &= -16777217;
  }
  function sd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !zh(e))
      if (jd()) t.flags |= 8192;
      else
        throw _n = Iu, Qc;
  }
  function mi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? re() : 536870912, t.lanes |= e, oa |= e);
  }
  function Fa(t, e) {
    if (!vt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function Rt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, n = 0;
    if (e)
      for (var a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = l, e;
  }
  function Jm(t, e, l) {
    var n = e.pendingProps;
    switch (jc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Rt(e), null;
      case 1:
        return Rt(e), null;
      case 3:
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), _l(Qt), St(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Fn(e) ? Ol(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, wc())), Rt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (Ol(e), u !== null ? (Rt(e), sd(e, u)) : (Rt(e), As(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (Ol(e), Rt(e), sd(e, u)) : (Rt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && Ol(e), Rt(e), As(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (ul(e), l = F.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Ol(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Rt(e), null;
          }
          t = X.current, Fn(e) ? Lo(e) : (t = mh(a, n, l), e.stateNode = t, Ol(e));
        }
        return Rt(e), null;
      case 5:
        if (ul(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Ol(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Rt(e), null;
          }
          if (u = X.current, Fn(e))
            Lo(e);
          else {
            var c = Ci(
              F.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? c.createElement("select", {
                      is: n.is
                    }) : c.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? c.createElement(a, { is: n.is }) : c.createElement(a);
                }
            }
            u[ne] = e, u[pe] = n;
            t: for (c = e.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === e) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === e)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            e.stateNode = u;
            t: switch (ce(u, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && Ol(e);
          }
        }
        return Rt(e), As(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && Ol(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(o(166));
          if (t = F.current, Fn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = ae, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[ne] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || ah(t.nodeValue, l)), t || Gl(e, !0);
          } else
            t = Ci(t).createTextNode(
              n
            ), t[ne] = e, e.stateNode = t;
        }
        return Rt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = Fn(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[ne] = e;
            } else
              Sn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), t = !1;
          } else
            l = wc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Re(e), e) : (Re(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Rt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = Fn(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(o(317));
              a[ne] = e;
            } else
              Sn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), a = !1;
          } else
            a = wc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Re(e), e) : (Re(e), null);
        }
        return Re(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), mi(e, e.updateQueue), Rt(e), null);
      case 4:
        return St(), t === null && ks(e.stateNode.containerInfo), Rt(e), null;
      case 10:
        return _l(e.type), Rt(e), null;
      case 19:
        if (N(Yt), n = e.memoizedState, n === null) return Rt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) Fa(n, !1);
          else {
            if (wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = li(t), u !== null) {
                  for (e.flags |= 128, Fa(n, !1), t = u.updateQueue, e.updateQueue = t, mi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    wo(l, t), l = l.sibling;
                  return q(
                    Yt,
                    Yt.current & 1 | 2
                  ), vt && zl(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && fe() > Si && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = li(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, mi(e, t), Fa(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !vt)
                return Rt(e), null;
            } else
              2 * fe() - n.renderingStartTime > Si && l !== 536870912 && (e.flags |= 128, a = !0, Fa(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = fe(), t.sibling = null, l = Yt.current, q(
          Yt,
          a ? l & 1 | 2 : l & 1
        ), vt && zl(e, n.treeForkCount), t) : (Rt(e), null);
      case 22:
      case 23:
        return Re(e), $c(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Rt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Rt(e), l = e.updateQueue, l !== null && mi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && N(zn), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), _l(Qt), Rt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function km(t, e) {
    switch (jc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return _l(Qt), St(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return ul(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Re(e), e.alternate === null)
            throw Error(o(340));
          Sn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Re(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          Sn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return N(Yt), null;
      case 4:
        return St(), null;
      case 10:
        return _l(e.type), null;
      case 22:
      case 23:
        return Re(e), $c(), t !== null && N(zn), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return _l(Qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function fd(t, e) {
    switch (jc(e), e.tag) {
      case 3:
        _l(Qt), St();
        break;
      case 26:
      case 27:
      case 5:
        ul(e);
        break;
      case 4:
        St();
        break;
      case 31:
        e.memoizedState !== null && Re(e);
        break;
      case 13:
        Re(e);
        break;
      case 19:
        N(Yt);
        break;
      case 10:
        _l(e.type);
        break;
      case 22:
      case 23:
        Re(e), $c(), t !== null && N(zn);
        break;
      case 24:
        _l(Qt);
    }
  }
  function Ia(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var u = l.create, c = l.inst;
            n = u(), c.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (r) {
      Tt(e, e.return, r);
    }
  }
  function $l(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            var c = n.inst, r = c.destroy;
            if (r !== void 0) {
              c.destroy = void 0, a = e;
              var v = l, E = r;
              try {
                E();
              } catch (R) {
                Tt(
                  a,
                  v,
                  R
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (R) {
      Tt(e, e.return, R);
    }
  }
  function od(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        tr(e, l);
      } catch (n) {
        Tt(t, t.return, n);
      }
    }
  }
  function rd(t, e, l) {
    l.props = Mn(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      Tt(t, e, n);
    }
  }
  function Pa(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(n) : l.current = n;
      }
    } catch (a) {
      Tt(t, e, a);
    }
  }
  function rl(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          Tt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          Tt(t, e, a);
        }
      else l.current = null;
  }
  function dd(t) {
    var e = t.type, l = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      Tt(t, t.return, a);
    }
  }
  function Ds(t, e, l) {
    try {
      var n = t.stateNode;
      gg(n, t.type, l, e), n[pe] = e;
    } catch (a) {
      Tt(t, t.return, a);
    }
  }
  function hd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ln(t.type) || t.tag === 4;
  }
  function Ms(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || hd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ln(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Os(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = Sl));
    else if (n !== 4 && (n === 27 && ln(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (Os(t, e, l), t = t.sibling; t !== null; )
        Os(t, e, l), t = t.sibling;
  }
  function gi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && ln(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (gi(t, e, l), t = t.sibling; t !== null; )
        gi(t, e, l), t = t.sibling;
  }
  function vd(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      ce(e, n, l), e[ne] = t, e[pe] = l;
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  var Cl = !1, Kt = !1, Cs = !1, md = typeof WeakSet == "function" ? WeakSet : Set, Pt = null;
  function $m(t, e) {
    if (t = t.containerInfo, Fs = Bi, t = Do(t), zc(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var a = n.anchorOffset, u = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break t;
            }
            var c = 0, r = -1, v = -1, E = 0, R = 0, j = t, T = null;
            e: for (; ; ) {
              for (var D; j !== l || a !== 0 && j.nodeType !== 3 || (r = c + a), j !== u || n !== 0 && j.nodeType !== 3 || (v = c + n), j.nodeType === 3 && (c += j.nodeValue.length), (D = j.firstChild) !== null; )
                T = j, j = D;
              for (; ; ) {
                if (j === t) break e;
                if (T === l && ++E === a && (r = c), T === u && ++R === n && (v = c), (D = j.nextSibling) !== null) break;
                j = T, T = j.parentNode;
              }
              j = D;
            }
            l = r === -1 || v === -1 ? null : { start: r, end: v };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Is = { focusedElem: t, selectionRange: l }, Bi = !1, Pt = e; Pt !== null; )
      if (e = Pt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Pt = t;
      else
        for (; Pt !== null; ) {
          switch (e = Pt, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  a = t[l], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, l = e, a = u.memoizedProps, u = u.memoizedState, n = l.stateNode;
                try {
                  var G = Mn(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    G,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch ($) {
                  Tt(
                    l,
                    l.return,
                    $
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  ef(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ef(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Pt = t;
            break;
          }
          Pt = e.return;
        }
  }
  function gd(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Rl(t, l), n & 4 && Ia(5, l);
        break;
      case 1:
        if (Rl(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Tt(l, l.return, c);
            }
          else {
            var a = Mn(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              Tt(
                l,
                l.return,
                c
              );
            }
          }
        n & 64 && od(l), n & 512 && Pa(l, l.return);
        break;
      case 3:
        if (Rl(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            tr(t, e);
          } catch (c) {
            Tt(l, l.return, c);
          }
        }
        break;
      case 27:
        e === null && n & 4 && vd(l);
      case 26:
      case 5:
        Rl(t, l), e === null && n & 4 && dd(l), n & 512 && Pa(l, l.return);
        break;
      case 12:
        Rl(t, l);
        break;
      case 31:
        Rl(t, l), n & 4 && pd(t, l);
        break;
      case 13:
        Rl(t, l), n & 4 && Sd(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = ag.bind(
          null,
          l
        ), Tg(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || Cl, !n) {
          e = e !== null && e.memoizedState !== null || Kt, a = Cl;
          var u = Kt;
          Cl = n, (Kt = e) && !u ? Ul(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Rl(t, l), Cl = a, Kt = u;
        }
        break;
      case 30:
        break;
      default:
        Rl(t, l);
    }
  }
  function yd(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, yd(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && ic(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var jt = null, xe = !1;
  function Nl(t, e, l) {
    for (l = l.child; l !== null; )
      bd(t, e, l), l = l.sibling;
  }
  function bd(t, e, l) {
    if (he && typeof he.onCommitFiberUnmount == "function")
      try {
        he.onCommitFiberUnmount(hn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Kt || rl(l, e), Nl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Kt || rl(l, e);
        var n = jt, a = xe;
        ln(l.type) && (jt = l.stateNode, xe = !1), Nl(
          t,
          e,
          l
        ), su(l.stateNode), jt = n, xe = a;
        break;
      case 5:
        Kt || rl(l, e);
      case 6:
        if (n = jt, a = xe, jt = null, Nl(
          t,
          e,
          l
        ), jt = n, xe = a, jt !== null)
          if (xe)
            try {
              (jt.nodeType === 9 ? jt.body : jt.nodeName === "HTML" ? jt.ownerDocument.body : jt).removeChild(l.stateNode);
            } catch (u) {
              Tt(
                l,
                e,
                u
              );
            }
          else
            try {
              jt.removeChild(l.stateNode);
            } catch (u) {
              Tt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        jt !== null && (xe ? (t = jt, oh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), ba(t)) : oh(jt, l.stateNode));
        break;
      case 4:
        n = jt, a = xe, jt = l.stateNode.containerInfo, xe = !0, Nl(
          t,
          e,
          l
        ), jt = n, xe = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        $l(2, l, e), Kt || $l(4, l, e), Nl(
          t,
          e,
          l
        );
        break;
      case 1:
        Kt || (rl(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && rd(
          l,
          e,
          n
        )), Nl(
          t,
          e,
          l
        );
        break;
      case 21:
        Nl(
          t,
          e,
          l
        );
        break;
      case 22:
        Kt = (n = Kt) || l.memoizedState !== null, Nl(
          t,
          e,
          l
        ), Kt = n;
        break;
      default:
        Nl(
          t,
          e,
          l
        );
    }
  }
  function pd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ba(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
    }
  }
  function Sd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ba(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
  }
  function Wm(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new md()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new md()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function yi(t, e) {
    var l = Wm(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = ug.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function Ee(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], u = t, c = e, r = c;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (ln(r.type)) {
                jt = r.stateNode, xe = !1;
                break t;
              }
              break;
            case 5:
              jt = r.stateNode, xe = !1;
              break t;
            case 3:
            case 4:
              jt = r.stateNode.containerInfo, xe = !0;
              break t;
          }
          r = r.return;
        }
        if (jt === null) throw Error(o(160));
        bd(u, c, a), jt = null, xe = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        xd(e, t), e = e.sibling;
  }
  var ll = null;
  function xd(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ee(e, t), ze(t), n & 4 && ($l(3, t, t.return), Ia(3, t), $l(5, t, t.return));
        break;
      case 1:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || rl(l, l.return)), n & 64 && Cl && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = ll;
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || rl(l, l.return)), n & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      u = a.getElementsByTagName("title")[0], (!u || u[Aa] || u[ne] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), ce(u, n, l), u[ne] = t, It(u), n = u;
                      break t;
                    case "link":
                      var c = xh(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (c) {
                        for (var r = 0; r < c.length; r++)
                          if (u = c[r], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            c.splice(r, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ce(u, n, l), a.head.appendChild(u);
                      break;
                    case "meta":
                      if (c = xh(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (r = 0; r < c.length; r++)
                          if (u = c[r], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            c.splice(r, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ce(u, n, l), a.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  u[ne] = t, It(u), n = u;
                }
                t.stateNode = n;
              } else
                Eh(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Sh(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, n === null ? Eh(
              a,
              t.type,
              t.stateNode
            ) : Sh(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Ds(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || rl(l, l.return)), l !== null && n & 4 && Ds(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || rl(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Ln(a, "");
          } catch (G) {
            Tt(t, t.return, G);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, Ds(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (Cs = !0);
        break;
      case 6:
        if (Ee(e, t), ze(t), n & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (G) {
            Tt(t, t.return, G);
          }
        }
        break;
      case 3:
        if (Ui = null, a = ll, ll = Ni(e.containerInfo), Ee(e, t), ll = a, ze(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ba(e.containerInfo);
          } catch (G) {
            Tt(t, t.return, G);
          }
        Cs && (Cs = !1, Ed(t));
        break;
      case 4:
        n = ll, ll = Ni(
          t.stateNode.containerInfo
        ), Ee(e, t), ze(t), ll = n;
        break;
      case 12:
        Ee(e, t), ze(t);
        break;
      case 31:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, yi(t, n)));
        break;
      case 13:
        Ee(e, t), ze(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (pi = fe()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, yi(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var v = l !== null && l.memoizedState !== null, E = Cl, R = Kt;
        if (Cl = E || a, Kt = R || v, Ee(e, t), Kt = R, Cl = E, ze(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || v || Cl || Kt || On(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                v = l = e;
                try {
                  if (u = v.stateNode, a)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    r = v.stateNode;
                    var j = v.memoizedProps.style, T = j != null && j.hasOwnProperty("display") ? j.display : null;
                    r.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (G) {
                  Tt(v, v.return, G);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                v = e;
                try {
                  v.stateNode.nodeValue = a ? "" : v.memoizedProps;
                } catch (G) {
                  Tt(v, v.return, G);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                v = e;
                try {
                  var D = v.stateNode;
                  a ? rh(D, !0) : rh(v.stateNode, !1);
                } catch (G) {
                  Tt(v, v.return, G);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, yi(t, l))));
        break;
      case 19:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, yi(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ee(e, t), ze(t);
    }
  }
  function ze(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (hd(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, u = Ms(t);
            gi(t, u, a);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (Ln(c, ""), l.flags &= -33);
            var r = Ms(t);
            gi(t, r, c);
            break;
          case 3:
          case 4:
            var v = l.stateNode.containerInfo, E = Ms(t);
            Os(
              t,
              E,
              v
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (R) {
        Tt(t, t.return, R);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Ed(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Ed(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Rl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        gd(t, e.alternate, e), e = e.sibling;
  }
  function On(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          $l(4, e, e.return), On(e);
          break;
        case 1:
          rl(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && rd(
            e,
            e.return,
            l
          ), On(e);
          break;
        case 27:
          su(e.stateNode);
        case 26:
        case 5:
          rl(e, e.return), On(e);
          break;
        case 22:
          e.memoizedState === null && On(e);
          break;
        case 30:
          On(e);
          break;
        default:
          On(e);
      }
      t = t.sibling;
    }
  }
  function Ul(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, u = e, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ul(
            a,
            u,
            l
          ), Ia(4, u);
          break;
        case 1:
          if (Ul(
            a,
            u,
            l
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (E) {
              Tt(n, n.return, E);
            }
          if (n = u, a = n.updateQueue, a !== null) {
            var r = n.stateNode;
            try {
              var v = a.shared.hiddenCallbacks;
              if (v !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < v.length; a++)
                  Po(v[a], r);
            } catch (E) {
              Tt(n, n.return, E);
            }
          }
          l && c & 64 && od(u), Pa(u, u.return);
          break;
        case 27:
          vd(u);
        case 26:
        case 5:
          Ul(
            a,
            u,
            l
          ), l && n === null && c & 4 && dd(u), Pa(u, u.return);
          break;
        case 12:
          Ul(
            a,
            u,
            l
          );
          break;
        case 31:
          Ul(
            a,
            u,
            l
          ), l && c & 4 && pd(a, u);
          break;
        case 13:
          Ul(
            a,
            u,
            l
          ), l && c & 4 && Sd(a, u);
          break;
        case 22:
          u.memoizedState === null && Ul(
            a,
            u,
            l
          ), Pa(u, u.return);
          break;
        case 30:
          break;
        default:
          Ul(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Ns(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Ya(l));
  }
  function Rs(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ya(t));
  }
  function nl(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        zd(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function zd(t, e, l, n) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        nl(
          t,
          e,
          l,
          n
        ), a & 2048 && Ia(9, e);
        break;
      case 1:
        nl(
          t,
          e,
          l,
          n
        );
        break;
      case 3:
        nl(
          t,
          e,
          l,
          n
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ya(t)));
        break;
      case 12:
        if (a & 2048) {
          nl(
            t,
            e,
            l,
            n
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, c = u.id, r = u.onPostCommit;
            typeof r == "function" && r(
              c,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (v) {
            Tt(e, e.return, v);
          }
        } else
          nl(
            t,
            e,
            l,
            n
          );
        break;
      case 31:
        nl(
          t,
          e,
          l,
          n
        );
        break;
      case 13:
        nl(
          t,
          e,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, c = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : tu(t, e) : u._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : (u._visibility |= 2, ca(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Ns(c, e);
        break;
      case 24:
        nl(
          t,
          e,
          l,
          n
        ), a & 2048 && Rs(e.alternate, e);
        break;
      default:
        nl(
          t,
          e,
          l,
          n
        );
    }
  }
  function ca(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, c = e, r = l, v = n, E = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ca(
            u,
            c,
            r,
            v,
            a
          ), Ia(8, c);
          break;
        case 23:
          break;
        case 22:
          var R = c.stateNode;
          c.memoizedState !== null ? R._visibility & 2 ? ca(
            u,
            c,
            r,
            v,
            a
          ) : tu(
            u,
            c
          ) : (R._visibility |= 2, ca(
            u,
            c,
            r,
            v,
            a
          )), a && E & 2048 && Ns(
            c.alternate,
            c
          );
          break;
        case 24:
          ca(
            u,
            c,
            r,
            v,
            a
          ), a && E & 2048 && Rs(c.alternate, c);
          break;
        default:
          ca(
            u,
            c,
            r,
            v,
            a
          );
      }
      e = e.sibling;
    }
  }
  function tu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            tu(l, n), a & 2048 && Ns(
              n.alternate,
              n
            );
            break;
          case 24:
            tu(l, n), a & 2048 && Rs(n.alternate, n);
            break;
          default:
            tu(l, n);
        }
        e = e.sibling;
      }
  }
  var eu = 8192;
  function sa(t, e, l) {
    if (t.subtreeFlags & eu)
      for (t = t.child; t !== null; )
        Td(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Td(t, e, l) {
    switch (t.tag) {
      case 26:
        sa(
          t,
          e,
          l
        ), t.flags & eu && t.memoizedState !== null && wg(
          l,
          ll,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        sa(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = ll;
        ll = Ni(t.stateNode.containerInfo), sa(
          t,
          e,
          l
        ), ll = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = eu, eu = 16777216, sa(
          t,
          e,
          l
        ), eu = n) : sa(
          t,
          e,
          l
        ));
        break;
      default:
        sa(
          t,
          e,
          l
        );
    }
  }
  function _d(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function lu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, Dd(
            n,
            t
          );
        }
      _d(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Ad(t), t = t.sibling;
  }
  function Ad(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        lu(t), t.flags & 2048 && $l(9, t, t.return);
        break;
      case 3:
        lu(t);
        break;
      case 12:
        lu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, bi(t)) : lu(t);
        break;
      default:
        lu(t);
    }
  }
  function bi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, Dd(
            n,
            t
          );
        }
      _d(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          $l(8, e, e.return), bi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, bi(e));
          break;
        default:
          bi(e);
      }
      t = t.sibling;
    }
  }
  function Dd(t, e) {
    for (; Pt !== null; ) {
      var l = Pt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          $l(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ya(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Pt = n;
      else
        t: for (l = t; Pt !== null; ) {
          n = Pt;
          var a = n.sibling, u = n.return;
          if (yd(n), n === l) {
            Pt = null;
            break t;
          }
          if (a !== null) {
            a.return = u, Pt = a;
            break t;
          }
          Pt = u;
        }
    }
  }
  var Fm = {
    getCacheForType: function(t) {
      var e = ue(Qt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ue(Qt).controller.signal;
    }
  }, Im = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Mt = null, st = null, ot = 0, zt = 0, Ue = null, Wl = !1, fa = !1, Us = !1, jl = 0, wt = 0, Fl = 0, Cn = 0, js = 0, je = 0, oa = 0, nu = null, Te = null, Hs = !1, pi = 0, Md = 0, Si = 1 / 0, xi = null, Il = null, $t = 0, Pl = null, ra = null, Hl = 0, ws = 0, Bs = null, Od = null, au = 0, qs = null;
  function He() {
    return (xt & 2) !== 0 && ot !== 0 ? ot & -ot : C.T !== null ? Zs() : tl();
  }
  function Cd() {
    if (je === 0)
      if ((ot & 536870912) === 0 || vt) {
        var t = jn;
        jn <<= 1, (jn & 3932160) === 0 && (jn = 262144), je = t;
      } else je = 536870912;
    return t = Ne.current, t !== null && (t.flags |= 32), je;
  }
  function _e(t, e, l) {
    (t === Mt && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (da(t, 0), tn(
      t,
      ot,
      je,
      !1
    )), qe(t, l), ((xt & 2) === 0 || t !== Mt) && (t === Mt && ((xt & 2) === 0 && (Cn |= l), wt === 4 && tn(
      t,
      ot,
      je,
      !1
    )), dl(t));
  }
  function Nd(t, e, l) {
    if ((xt & 6) !== 0) throw Error(o(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ge(t, e), a = n ? eg(t, e) : Xs(t, e, !0), u = n;
    do {
      if (a === 0) {
        fa && !n && tn(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Pm(l)) {
          a = Xs(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            e = c;
            t: {
              var r = t;
              a = nu;
              var v = r.current.memoizedState.isDehydrated;
              if (v && (da(r, c).flags |= 256), c = Xs(
                r,
                c,
                !1
              ), c !== 2) {
                if (Us && !v) {
                  r.errorRecoveryDisabledLanes |= u, Cn |= u, a = 4;
                  break t;
                }
                u = Te, Te = a, u !== null && (Te === null ? Te = u : Te.push.apply(
                  Te,
                  u
                ));
              }
              a = c;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          da(t, 0), tn(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              tn(
                n,
                e,
                je,
                !Wl
              );
              break t;
            case 2:
              Te = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (a = pi + 300 - fe(), 10 < a)) {
            if (tn(
              n,
              e,
              je,
              !Wl
            ), Ft(n, 0, !0) !== 0) break t;
            Hl = e, n.timeoutHandle = sh(
              Rd.bind(
                null,
                n,
                l,
                Te,
                xi,
                Hs,
                e,
                je,
                Cn,
                oa,
                Wl,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          Rd(
            n,
            l,
            Te,
            xi,
            Hs,
            e,
            je,
            Cn,
            oa,
            Wl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    dl(t);
  }
  function Rd(t, e, l, n, a, u, c, r, v, E, R, j, T, D) {
    if (t.timeoutHandle = -1, j = e.subtreeFlags, j & 8192 || (j & 16785408) === 16785408) {
      j = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Sl
      }, Td(
        e,
        u,
        j
      );
      var G = (u & 62914560) === u ? pi - fe() : (u & 4194048) === u ? Md - fe() : 0;
      if (G = Bg(
        j,
        G
      ), G !== null) {
        Hl = u, t.cancelPendingCommit = G(
          Xd.bind(
            null,
            t,
            e,
            u,
            l,
            n,
            a,
            c,
            r,
            v,
            R,
            j,
            null,
            T,
            D
          )
        ), tn(t, u, c, !E);
        return;
      }
    }
    Xd(
      t,
      e,
      u,
      l,
      n,
      a,
      c,
      r,
      v
    );
  }
  function Pm(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Oe(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function tn(t, e, l, n) {
    e &= ~js, e &= ~Cn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - oe(a), c = 1 << u;
      n[u] = -1, a &= ~c;
    }
    l !== 0 && Pe(t, l, e);
  }
  function Ei() {
    return (xt & 6) === 0 ? (uu(0), !1) : !0;
  }
  function Ys() {
    if (st !== null) {
      if (zt === 0)
        var t = st.return;
      else
        t = st, Tl = xn = null, es(t), la = null, La = 0, t = st;
      for (; t !== null; )
        fd(t.alternate, t), t = t.return;
      st = null;
    }
  }
  function da(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, pg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Hl = 0, Ys(), Mt = t, st = l = El(t.current, null), ot = e, zt = 0, Ue = null, Wl = !1, fa = ge(t, e), Us = !1, oa = je = js = Cn = Fl = wt = 0, Te = nu = null, Hs = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - oe(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return jl = e, Qu(), l;
  }
  function Ud(t, e) {
    at = null, C.H = $a, e === ea || e === Fu ? (e = $o(), zt = 3) : e === Qc ? (e = $o(), zt = 4) : zt = e === ys ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ue = e, st === null && (wt = 1, ri(
      t,
      Ze(e, t.current)
    ));
  }
  function jd() {
    var t = Ne.current;
    return t === null ? !0 : (ot & 4194048) === ot ? ke === null : (ot & 62914560) === ot || (ot & 536870912) !== 0 ? t === ke : !1;
  }
  function Hd() {
    var t = C.H;
    return C.H = $a, t === null ? $a : t;
  }
  function wd() {
    var t = C.A;
    return C.A = Fm, t;
  }
  function zi() {
    wt = 4, Wl || (ot & 4194048) !== ot && Ne.current !== null || (fa = !0), (Fl & 134217727) === 0 && (Cn & 134217727) === 0 || Mt === null || tn(
      Mt,
      ot,
      je,
      !1
    );
  }
  function Xs(t, e, l) {
    var n = xt;
    xt |= 2;
    var a = Hd(), u = wd();
    (Mt !== t || ot !== e) && (xi = null, da(t, e)), e = !1;
    var c = wt;
    t: do
      try {
        if (zt !== 0 && st !== null) {
          var r = st, v = Ue;
          switch (zt) {
            case 8:
              Ys(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ne.current === null && (e = !0);
              var E = zt;
              if (zt = 0, Ue = null, ha(t, r, v, E), l && fa) {
                c = 0;
                break t;
              }
              break;
            default:
              E = zt, zt = 0, Ue = null, ha(t, r, v, E);
          }
        }
        tg(), c = wt;
        break;
      } catch (R) {
        Ud(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Tl = xn = null, xt = n, C.H = a, C.A = u, st === null && (Mt = null, ot = 0, Qu()), c;
  }
  function tg() {
    for (; st !== null; ) Bd(st);
  }
  function eg(t, e) {
    var l = xt;
    xt |= 2;
    var n = Hd(), a = wd();
    Mt !== t || ot !== e ? (xi = null, Si = fe() + 500, da(t, e)) : fa = ge(
      t,
      e
    );
    t: do
      try {
        if (zt !== 0 && st !== null) {
          e = st;
          var u = Ue;
          e: switch (zt) {
            case 1:
              zt = 0, Ue = null, ha(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Jo(u)) {
                zt = 0, Ue = null, qd(e);
                break;
              }
              e = function() {
                zt !== 2 && zt !== 9 || Mt !== t || (zt = 7), dl(t);
              }, u.then(e, e);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              Jo(u) ? (zt = 0, Ue = null, qd(e)) : (zt = 0, Ue = null, ha(t, e, u, 7));
              break;
            case 5:
              var c = null;
              switch (st.tag) {
                case 26:
                  c = st.memoizedState;
                case 5:
                case 27:
                  var r = st;
                  if (c ? zh(c) : r.stateNode.complete) {
                    zt = 0, Ue = null;
                    var v = r.sibling;
                    if (v !== null) st = v;
                    else {
                      var E = r.return;
                      E !== null ? (st = E, Ti(E)) : st = null;
                    }
                    break e;
                  }
              }
              zt = 0, Ue = null, ha(t, e, u, 5);
              break;
            case 6:
              zt = 0, Ue = null, ha(t, e, u, 6);
              break;
            case 8:
              Ys(), wt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        lg();
        break;
      } catch (R) {
        Ud(t, R);
      }
    while (!0);
    return Tl = xn = null, C.H = n, C.A = a, xt = l, st !== null ? 0 : (Mt = null, ot = 0, Qu(), wt);
  }
  function lg() {
    for (; st !== null && !Rn(); )
      Bd(st);
  }
  function Bd(t) {
    var e = cd(t.alternate, t, jl);
    t.memoizedProps = t.pendingProps, e === null ? Ti(t) : st = e;
  }
  function qd(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = ed(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          ot
        );
        break;
      case 11:
        e = ed(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          ot
        );
        break;
      case 5:
        es(e);
      default:
        fd(l, e), e = st = wo(e, jl), e = cd(l, e, jl);
    }
    t.memoizedProps = t.pendingProps, e === null ? Ti(t) : st = e;
  }
  function ha(t, e, l, n) {
    Tl = xn = null, es(e), la = null, La = 0;
    var a = e.return;
    try {
      if (Zm(
        t,
        a,
        e,
        l,
        ot
      )) {
        wt = 1, ri(
          t,
          Ze(l, t.current)
        ), st = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw st = a, u;
      wt = 1, ri(
        t,
        Ze(l, t.current)
      ), st = null;
      return;
    }
    e.flags & 32768 ? (vt || n === 1 ? t = !0 : fa || (ot & 536870912) !== 0 ? t = !1 : (Wl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ne.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Yd(e, t)) : Ti(e);
  }
  function Ti(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Yd(
          e,
          Wl
        );
        return;
      }
      t = e.return;
      var l = Jm(
        e.alternate,
        e,
        jl
      );
      if (l !== null) {
        st = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        st = e;
        return;
      }
      st = e = t;
    } while (e !== null);
    wt === 0 && (wt = 5);
  }
  function Yd(t, e) {
    do {
      var l = km(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, st = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        st = t;
        return;
      }
      st = t = l;
    } while (t !== null);
    wt = 6, st = null;
  }
  function Xd(t, e, l, n, a, u, c, r, v) {
    t.cancelPendingCommit = null;
    do
      _i();
    while ($t !== 0);
    if ((xt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (u = e.lanes | e.childLanes, u |= Mc, kt(
        t,
        l,
        u,
        c,
        r,
        v
      ), t === Mt && (st = Mt = null, ot = 0), ra = e, Pl = t, Hl = l, ws = u, Bs = a, Od = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ig(Ie, function() {
        return Vd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = C.T, C.T = null, a = w.p, w.p = 2, c = xt, xt |= 4;
        try {
          $m(t, e, l);
        } finally {
          xt = c, w.p = a, C.T = n;
        }
      }
      $t = 1, Ld(), Gd(), Qd();
    }
  }
  function Ld() {
    if ($t === 1) {
      $t = 0;
      var t = Pl, e = ra, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null;
        var n = w.p;
        w.p = 2;
        var a = xt;
        xt |= 4;
        try {
          xd(e, t);
          var u = Is, c = Do(t.containerInfo), r = u.focusedElem, v = u.selectionRange;
          if (c !== r && r && r.ownerDocument && Ao(
            r.ownerDocument.documentElement,
            r
          )) {
            if (v !== null && zc(r)) {
              var E = v.start, R = v.end;
              if (R === void 0 && (R = E), "selectionStart" in r)
                r.selectionStart = E, r.selectionEnd = Math.min(
                  R,
                  r.value.length
                );
              else {
                var j = r.ownerDocument || document, T = j && j.defaultView || window;
                if (T.getSelection) {
                  var D = T.getSelection(), G = r.textContent.length, $ = Math.min(v.start, G), Dt = v.end === void 0 ? $ : Math.min(v.end, G);
                  !D.extend && $ > Dt && (c = Dt, Dt = $, $ = c);
                  var p = _o(
                    r,
                    $
                  ), g = _o(
                    r,
                    Dt
                  );
                  if (p && g && (D.rangeCount !== 1 || D.anchorNode !== p.node || D.anchorOffset !== p.offset || D.focusNode !== g.node || D.focusOffset !== g.offset)) {
                    var x = j.createRange();
                    x.setStart(p.node, p.offset), D.removeAllRanges(), $ > Dt ? (D.addRange(x), D.extend(g.node, g.offset)) : (x.setEnd(g.node, g.offset), D.addRange(x));
                  }
                }
              }
            }
            for (j = [], D = r; D = D.parentNode; )
              D.nodeType === 1 && j.push({
                element: D,
                left: D.scrollLeft,
                top: D.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < j.length; r++) {
              var U = j[r];
              U.element.scrollLeft = U.left, U.element.scrollTop = U.top;
            }
          }
          Bi = !!Fs, Is = Fs = null;
        } finally {
          xt = a, w.p = n, C.T = l;
        }
      }
      t.current = e, $t = 2;
    }
  }
  function Gd() {
    if ($t === 2) {
      $t = 0;
      var t = Pl, e = ra, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = C.T, C.T = null;
        var n = w.p;
        w.p = 2;
        var a = xt;
        xt |= 4;
        try {
          gd(t, e.alternate, e);
        } finally {
          xt = a, w.p = n, C.T = l;
        }
      }
      $t = 3;
    }
  }
  function Qd() {
    if ($t === 4 || $t === 3) {
      $t = 0, Mu();
      var t = Pl, e = ra, l = Hl, n = Od;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? $t = 5 : ($t = 0, ra = Pl = null, Zd(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Il = null), bl(l), e = e.stateNode, he && typeof he.onCommitFiberRoot == "function")
        try {
          he.onCommitFiberRoot(
            hn,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = C.T, a = w.p, w.p = 2, C.T = null;
        try {
          for (var u = t.onRecoverableError, c = 0; c < n.length; c++) {
            var r = n[c];
            u(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          C.T = e, w.p = a;
        }
      }
      (Hl & 3) !== 0 && _i(), dl(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === qs ? au++ : (au = 0, qs = t) : au = 0, uu(0);
    }
  }
  function Zd(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ya(e)));
  }
  function _i() {
    return Ld(), Gd(), Qd(), Vd();
  }
  function Vd() {
    if ($t !== 5) return !1;
    var t = Pl, e = ws;
    ws = 0;
    var l = bl(Hl), n = C.T, a = w.p;
    try {
      w.p = 32 > l ? 32 : l, C.T = null, l = Bs, Bs = null;
      var u = Pl, c = Hl;
      if ($t = 0, ra = Pl = null, Hl = 0, (xt & 6) !== 0) throw Error(o(331));
      var r = xt;
      if (xt |= 4, Ad(u.current), zd(
        u,
        u.current,
        c,
        l
      ), xt = r, uu(0, !1), he && typeof he.onPostCommitFiberRoot == "function")
        try {
          he.onPostCommitFiberRoot(hn, u);
        } catch {
        }
      return !0;
    } finally {
      w.p = a, C.T = n, Zd(t, e);
    }
  }
  function Kd(t, e, l) {
    e = Ze(l, e), e = gs(t.stateNode, e, 2), t = Kl(t, e, 2), t !== null && (qe(t, 2), dl(t));
  }
  function Tt(t, e, l) {
    if (t.tag === 3)
      Kd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Kd(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Il === null || !Il.has(n))) {
            t = Ze(l, t), l = Jr(2), n = Kl(e, l, 2), n !== null && (kr(
              l,
              n,
              e,
              t
            ), qe(n, 2), dl(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function Ls(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Im();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (Us = !0, a.add(l), t = ng.bind(null, t, e, l), e.then(t, t));
  }
  function ng(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Mt === t && (ot & l) === l && (wt === 4 || wt === 3 && (ot & 62914560) === ot && 300 > fe() - pi ? (xt & 2) === 0 && da(t, 0) : js |= l, oa === ot && (oa = 0)), dl(t);
  }
  function Jd(t, e) {
    e === 0 && (e = re()), t = bn(t, e), t !== null && (qe(t, e), dl(t));
  }
  function ag(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Jd(t, l);
  }
  function ug(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    n !== null && n.delete(e), Jd(t, l);
  }
  function ig(t, e) {
    return we(t, e);
  }
  var Ai = null, va = null, Gs = !1, Di = !1, Qs = !1, en = 0;
  function dl(t) {
    t !== va && t.next === null && (va === null ? Ai = va = t : va = va.next = t), Di = !0, Gs || (Gs = !0, sg());
  }
  function uu(t, e) {
    if (!Qs && Di) {
      Qs = !0;
      do
        for (var l = !1, n = Ai; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var c = n.suspendedLanes, r = n.pingedLanes;
              u = (1 << 31 - oe(42 | t) + 1) - 1, u &= a & ~(c & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Fd(n, u));
          } else
            u = ot, u = Ft(
              n,
              n === Mt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || ge(n, u) || (l = !0, Fd(n, u));
          n = n.next;
        }
      while (l);
      Qs = !1;
    }
  }
  function cg() {
    kd();
  }
  function kd() {
    Di = Gs = !1;
    var t = 0;
    en !== 0 && bg() && (t = en);
    for (var e = fe(), l = null, n = Ai; n !== null; ) {
      var a = n.next, u = $d(n, e);
      u === 0 ? (n.next = null, l === null ? Ai = a : l.next = a, a === null && (va = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (Di = !0)), n = a;
    }
    $t !== 0 && $t !== 5 || uu(t), en !== 0 && (en = 0);
  }
  function $d(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - oe(u), r = 1 << c, v = a[c];
      v === -1 ? ((r & l) === 0 || (r & n) !== 0) && (a[c] = ye(r, e)) : v <= e && (t.expiredLanes |= r), u &= ~r;
    }
    if (e = Mt, l = ot, l = Ft(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Bl(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || ge(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && Bl(n), bl(l)) {
        case 2:
        case 8:
          l = gl;
          break;
        case 32:
          l = Ie;
          break;
        case 268435456:
          l = _a;
          break;
        default:
          l = Ie;
      }
      return n = Wd.bind(null, t), l = we(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && Bl(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Wd(t, e) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (_i() && t.callbackNode !== l)
      return null;
    var n = ot;
    return n = Ft(
      t,
      t === Mt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (Nd(t, n, e), $d(t, fe()), t.callbackNode != null && t.callbackNode === l ? Wd.bind(null, t) : null);
  }
  function Fd(t, e) {
    if (_i()) return null;
    Nd(t, e, !0);
  }
  function sg() {
    Sg(function() {
      (xt & 6) !== 0 ? we(
        Ou,
        cg
      ) : kd();
    });
  }
  function Zs() {
    if (en === 0) {
      var t = Pn;
      t === 0 && (t = Un, Un <<= 1, (Un & 261888) === 0 && (Un = 256)), en = t;
    }
    return en;
  }
  function Id(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Hu("" + t);
  }
  function Pd(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function fg(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = Id(
        (a[pe] || null).action
      ), c = n.submitter;
      c && (e = (e = c[pe] || null) ? Id(e.formAction) : c.getAttribute("formAction"), e !== null && (u = e, c = null));
      var r = new Yu(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (en !== 0) {
                  var v = c ? Pd(a, c) : new FormData(a);
                  os(
                    l,
                    {
                      pending: !0,
                      data: v,
                      method: a.method,
                      action: u
                    },
                    null,
                    v
                  );
                }
              } else
                typeof u == "function" && (r.preventDefault(), v = c ? Pd(a, c) : new FormData(a), os(
                  l,
                  {
                    pending: !0,
                    data: v,
                    method: a.method,
                    action: u
                  },
                  u,
                  v
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Vs = 0; Vs < Dc.length; Vs++) {
    var Ks = Dc[Vs], og = Ks.toLowerCase(), rg = Ks[0].toUpperCase() + Ks.slice(1);
    el(
      og,
      "on" + rg
    );
  }
  el(Co, "onAnimationEnd"), el(No, "onAnimationIteration"), el(Ro, "onAnimationStart"), el("dblclick", "onDoubleClick"), el("focusin", "onFocus"), el("focusout", "onBlur"), el(Dm, "onTransitionRun"), el(Mm, "onTransitionStart"), el(Om, "onTransitionCancel"), el(Uo, "onTransitionEnd"), Yn("onMouseEnter", ["mouseout", "mouseover"]), Yn("onMouseLeave", ["mouseout", "mouseover"]), Yn("onPointerEnter", ["pointerout", "pointerover"]), Yn("onPointerLeave", ["pointerout", "pointerover"]), vn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), vn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), vn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), vn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), vn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), vn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var iu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), dg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(iu)
  );
  function th(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var c = n.length - 1; 0 <= c; c--) {
            var r = n[c], v = r.instance, E = r.currentTarget;
            if (r = r.listener, v !== u && a.isPropagationStopped())
              break t;
            u = r, a.currentTarget = E;
            try {
              u(a);
            } catch (R) {
              Gu(R);
            }
            a.currentTarget = null, u = v;
          }
        else
          for (c = 0; c < n.length; c++) {
            if (r = n[c], v = r.instance, E = r.currentTarget, r = r.listener, v !== u && a.isPropagationStopped())
              break t;
            u = r, a.currentTarget = E;
            try {
              u(a);
            } catch (R) {
              Gu(R);
            }
            a.currentTarget = null, u = v;
          }
      }
    }
  }
  function ft(t, e) {
    var l = e[uc];
    l === void 0 && (l = e[uc] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (eh(e, t, 2, !1), l.add(n));
  }
  function Js(t, e, l) {
    var n = 0;
    e && (n |= 4), eh(
      l,
      t,
      n,
      e
    );
  }
  var Mi = "_reactListening" + Math.random().toString(36).slice(2);
  function ks(t) {
    if (!t[Mi]) {
      t[Mi] = !0, Jf.forEach(function(l) {
        l !== "selectionchange" && (dg.has(l) || Js(l, !1, t), Js(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Mi] || (e[Mi] = !0, Js("selectionchange", !1, e));
    }
  }
  function eh(t, e, l, n) {
    switch (Ch(e)) {
      case 2:
        var a = Xg;
        break;
      case 8:
        a = Lg;
        break;
      default:
        a = of;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !vc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function $s(t, e, l, n, a) {
    var u = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var c = n.tag;
        if (c === 3 || c === 4) {
          var r = n.stateNode.containerInfo;
          if (r === a) break;
          if (c === 4)
            for (c = n.return; c !== null; ) {
              var v = c.tag;
              if ((v === 3 || v === 4) && c.stateNode.containerInfo === a)
                return;
              c = c.return;
            }
          for (; r !== null; ) {
            if (c = wn(r), c === null) return;
            if (v = c.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              n = u = c;
              continue t;
            }
            r = r.parentNode;
          }
        }
        n = n.return;
      }
    uo(function() {
      var E = u, R = dc(l), j = [];
      t: {
        var T = jo.get(t);
        if (T !== void 0) {
          var D = Yu, G = t;
          switch (t) {
            case "keypress":
              if (Bu(l) === 0) break t;
            case "keydown":
            case "keyup":
              D = um;
              break;
            case "focusin":
              G = "focus", D = bc;
              break;
            case "focusout":
              G = "blur", D = bc;
              break;
            case "beforeblur":
            case "afterblur":
              D = bc;
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
              D = so;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Jv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = sm;
              break;
            case Co:
            case No:
            case Ro:
              D = Wv;
              break;
            case Uo:
              D = om;
              break;
            case "scroll":
            case "scrollend":
              D = Vv;
              break;
            case "wheel":
              D = dm;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = Iv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = oo;
              break;
            case "toggle":
            case "beforetoggle":
              D = vm;
          }
          var $ = (e & 4) !== 0, Dt = !$ && (t === "scroll" || t === "scrollend"), p = $ ? T !== null ? T + "Capture" : null : T;
          $ = [];
          for (var g = E, x; g !== null; ) {
            var U = g;
            if (x = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || x === null || p === null || (U = Ma(g, p), U != null && $.push(
              cu(g, U, x)
            )), Dt) break;
            g = g.return;
          }
          0 < $.length && (T = new D(
            T,
            G,
            null,
            l,
            R
          ), j.push({ event: T, listeners: $ }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (T = t === "mouseover" || t === "pointerover", D = t === "mouseout" || t === "pointerout", T && l !== rc && (G = l.relatedTarget || l.fromElement) && (wn(G) || G[Hn]))
            break t;
          if ((D || T) && (T = R.window === R ? R : (T = R.ownerDocument) ? T.defaultView || T.parentWindow : window, D ? (G = l.relatedTarget || l.toElement, D = E, G = G ? wn(G) : null, G !== null && (Dt = m(G), $ = G.tag, G !== Dt || $ !== 5 && $ !== 27 && $ !== 6) && (G = null)) : (D = null, G = E), D !== G)) {
            if ($ = so, U = "onMouseLeave", p = "onMouseEnter", g = "mouse", (t === "pointerout" || t === "pointerover") && ($ = oo, U = "onPointerLeave", p = "onPointerEnter", g = "pointer"), Dt = D == null ? T : Da(D), x = G == null ? T : Da(G), T = new $(
              U,
              g + "leave",
              D,
              l,
              R
            ), T.target = Dt, T.relatedTarget = x, U = null, wn(R) === E && ($ = new $(
              p,
              g + "enter",
              G,
              l,
              R
            ), $.target = x, $.relatedTarget = Dt, U = $), Dt = U, D && G)
              e: {
                for ($ = hg, p = D, g = G, x = 0, U = p; U; U = $(U))
                  x++;
                U = 0;
                for (var V = g; V; V = $(V))
                  U++;
                for (; 0 < x - U; )
                  p = $(p), x--;
                for (; 0 < U - x; )
                  g = $(g), U--;
                for (; x--; ) {
                  if (p === g || g !== null && p === g.alternate) {
                    $ = p;
                    break e;
                  }
                  p = $(p), g = $(g);
                }
                $ = null;
              }
            else $ = null;
            D !== null && lh(
              j,
              T,
              D,
              $,
              !1
            ), G !== null && Dt !== null && lh(
              j,
              Dt,
              G,
              $,
              !0
            );
          }
        }
        t: {
          if (T = E ? Da(E) : window, D = T.nodeName && T.nodeName.toLowerCase(), D === "select" || D === "input" && T.type === "file")
            var yt = po;
          else if (yo(T))
            if (So)
              yt = Tm;
            else {
              yt = Em;
              var Q = xm;
            }
          else
            D = T.nodeName, !D || D.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? E && oc(E.elementType) && (yt = po) : yt = zm;
          if (yt && (yt = yt(t, E))) {
            bo(
              j,
              yt,
              l,
              R
            );
            break t;
          }
          Q && Q(t, T, E), t === "focusout" && E && T.type === "number" && E.memoizedProps.value != null && fc(T, "number", T.value);
        }
        switch (Q = E ? Da(E) : window, t) {
          case "focusin":
            (yo(Q) || Q.contentEditable === "true") && (Vn = Q, Tc = E, wa = null);
            break;
          case "focusout":
            wa = Tc = Vn = null;
            break;
          case "mousedown":
            _c = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            _c = !1, Mo(j, l, R);
            break;
          case "selectionchange":
            if (Am) break;
          case "keydown":
          case "keyup":
            Mo(j, l, R);
        }
        var ut;
        if (Sc)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          Zn ? mo(t, l) && (rt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (rt = "onCompositionStart");
        rt && (ro && l.locale !== "ko" && (Zn || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && Zn && (ut = io()) : (Yl = R, mc = "value" in Yl ? Yl.value : Yl.textContent, Zn = !0)), Q = Oi(E, rt), 0 < Q.length && (rt = new fo(
          rt,
          t,
          null,
          l,
          R
        ), j.push({ event: rt, listeners: Q }), ut ? rt.data = ut : (ut = go(l), ut !== null && (rt.data = ut)))), (ut = gm ? ym(t, l) : bm(t, l)) && (rt = Oi(E, "onBeforeInput"), 0 < rt.length && (Q = new fo(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          R
        ), j.push({
          event: Q,
          listeners: rt
        }), Q.data = ut)), fg(
          j,
          t,
          E,
          l,
          R
        );
      }
      th(j, e);
    });
  }
  function cu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Oi(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = Ma(t, l), a != null && n.unshift(
        cu(t, a, u)
      ), a = Ma(t, e), a != null && n.push(
        cu(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function hg(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function lh(t, e, l, n, a) {
    for (var u = e._reactName, c = []; l !== null && l !== n; ) {
      var r = l, v = r.alternate, E = r.stateNode;
      if (r = r.tag, v !== null && v === n) break;
      r !== 5 && r !== 26 && r !== 27 || E === null || (v = E, a ? (E = Ma(l, u), E != null && c.unshift(
        cu(l, E, v)
      )) : a || (E = Ma(l, u), E != null && c.push(
        cu(l, E, v)
      ))), l = l.return;
    }
    c.length !== 0 && t.push({ event: e, listeners: c });
  }
  var vg = /\r\n?/g, mg = /\u0000|\uFFFD/g;
  function nh(t) {
    return (typeof t == "string" ? t : "" + t).replace(vg, `
`).replace(mg, "");
  }
  function ah(t, e) {
    return e = nh(e), nh(t) === e;
  }
  function At(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Ln(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Ln(t, "" + n);
        break;
      case "className":
        Uu(t, "class", n);
        break;
      case "tabIndex":
        Uu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Uu(t, l, n);
        break;
      case "style":
        no(t, n, u);
        break;
      case "data":
        if (e !== "object") {
          Uu(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Hu("" + n), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && At(t, e, "name", a.name, a, null), At(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), At(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), At(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (At(t, e, "encType", a.encType, a, null), At(t, e, "method", a.method, a, null), At(t, e, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = Hu("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = Sl);
        break;
      case "onScroll":
        n != null && ft("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ft("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(o(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(o(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
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
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = Hu("" + n), t.setAttributeNS(
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
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "" + n) : t.removeAttribute(l);
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
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(l) : t.setAttribute(l, n);
        break;
      case "popover":
        ft("beforetoggle", t), ft("toggle", t), Ru(t, "popover", n);
        break;
      case "xlinkActuate":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        pl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        pl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        pl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        pl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Ru(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Qv.get(l) || l, Ru(t, l, n));
    }
  }
  function Ws(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        no(t, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(o(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(o(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Ln(t, n) : (typeof n == "number" || typeof n == "bigint") && Ln(t, "" + n);
        break;
      case "onScroll":
        n != null && ft("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ft("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = Sl);
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
        if (!kf.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), u = t[pe] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : Ru(t, l, n);
          }
    }
  }
  function ce(t, e, l) {
    switch (e) {
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
        ft("error", t), ft("load", t);
        var n = !1, a = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  At(t, e, u, c, l, null);
              }
          }
        a && At(t, e, "srcSet", l.srcSet, l, null), n && At(t, e, "src", l.src, l, null);
        return;
      case "input":
        ft("invalid", t);
        var r = u = c = a = null, v = null, E = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var R = l[n];
            if (R != null)
              switch (n) {
                case "name":
                  a = R;
                  break;
                case "type":
                  c = R;
                  break;
                case "checked":
                  v = R;
                  break;
                case "defaultChecked":
                  E = R;
                  break;
                case "value":
                  u = R;
                  break;
                case "defaultValue":
                  r = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(o(137, e));
                  break;
                default:
                  At(t, e, n, R, l, null);
              }
          }
        Pf(
          t,
          u,
          r,
          v,
          E,
          c,
          a,
          !1
        );
        return;
      case "select":
        ft("invalid", t), n = c = u = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (r = l[a], r != null))
            switch (a) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                c = r;
                break;
              case "multiple":
                n = r;
              default:
                At(t, e, a, r, l, null);
            }
        e = u, l = c, t.multiple = !!n, e != null ? Xn(t, !!n, e, !1) : l != null && Xn(t, !!n, l, !0);
        return;
      case "textarea":
        ft("invalid", t), u = a = n = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (r = l[c], r != null))
            switch (c) {
              case "value":
                n = r;
                break;
              case "defaultValue":
                a = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                At(t, e, c, r, l, null);
            }
        eo(t, n, a, u);
        return;
      case "option":
        for (v in l)
          if (l.hasOwnProperty(v) && (n = l[v], n != null))
            switch (v) {
              case "selected":
                t.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                At(t, e, v, n, l, null);
            }
        return;
      case "dialog":
        ft("beforetoggle", t), ft("toggle", t), ft("cancel", t), ft("close", t);
        break;
      case "iframe":
      case "object":
        ft("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < iu.length; n++)
          ft(iu[n], t);
        break;
      case "image":
        ft("error", t), ft("load", t);
        break;
      case "details":
        ft("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ft("error", t), ft("load", t);
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
        for (E in l)
          if (l.hasOwnProperty(E) && (n = l[E], n != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                At(t, e, E, n, l, null);
            }
        return;
      default:
        if (oc(e)) {
          for (R in l)
            l.hasOwnProperty(R) && (n = l[R], n !== void 0 && Ws(
              t,
              e,
              R,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (n = l[r], n != null && At(t, e, r, n, l, null));
  }
  function gg(t, e, l, n) {
    switch (e) {
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
        var a = null, u = null, c = null, r = null, v = null, E = null, R = null;
        for (D in l) {
          var j = l[D];
          if (l.hasOwnProperty(D) && j != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = j;
              default:
                n.hasOwnProperty(D) || At(t, e, D, null, n, j);
            }
        }
        for (var T in n) {
          var D = n[T];
          if (j = l[T], n.hasOwnProperty(T) && (D != null || j != null))
            switch (T) {
              case "type":
                u = D;
                break;
              case "name":
                a = D;
                break;
              case "checked":
                E = D;
                break;
              case "defaultChecked":
                R = D;
                break;
              case "value":
                c = D;
                break;
              case "defaultValue":
                r = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null)
                  throw Error(o(137, e));
                break;
              default:
                D !== j && At(
                  t,
                  e,
                  T,
                  D,
                  n,
                  j
                );
            }
        }
        sc(
          t,
          c,
          r,
          v,
          E,
          R,
          u,
          a
        );
        return;
      case "select":
        D = c = r = T = null;
        for (u in l)
          if (v = l[u], l.hasOwnProperty(u) && v != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                D = v;
              default:
                n.hasOwnProperty(u) || At(
                  t,
                  e,
                  u,
                  null,
                  n,
                  v
                );
            }
        for (a in n)
          if (u = n[a], v = l[a], n.hasOwnProperty(a) && (u != null || v != null))
            switch (a) {
              case "value":
                T = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== v && At(
                  t,
                  e,
                  a,
                  u,
                  n,
                  v
                );
            }
        e = r, l = c, n = D, T != null ? Xn(t, !!l, T, !1) : !!n != !!l && (e != null ? Xn(t, !!l, e, !0) : Xn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        D = T = null;
        for (r in l)
          if (a = l[r], l.hasOwnProperty(r) && a != null && !n.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                At(t, e, r, null, n, a);
            }
        for (c in n)
          if (a = n[c], u = l[c], n.hasOwnProperty(c) && (a != null || u != null))
            switch (c) {
              case "value":
                T = a;
                break;
              case "defaultValue":
                D = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(o(91));
                break;
              default:
                a !== u && At(t, e, c, a, n, u);
            }
        to(t, T, D);
        return;
      case "option":
        for (var G in l)
          if (T = l[G], l.hasOwnProperty(G) && T != null && !n.hasOwnProperty(G))
            switch (G) {
              case "selected":
                t.selected = !1;
                break;
              default:
                At(
                  t,
                  e,
                  G,
                  null,
                  n,
                  T
                );
            }
        for (v in n)
          if (T = n[v], D = l[v], n.hasOwnProperty(v) && T !== D && (T != null || D != null))
            switch (v) {
              case "selected":
                t.selected = T && typeof T != "function" && typeof T != "symbol";
                break;
              default:
                At(
                  t,
                  e,
                  v,
                  T,
                  n,
                  D
                );
            }
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
        for (var $ in l)
          T = l[$], l.hasOwnProperty($) && T != null && !n.hasOwnProperty($) && At(t, e, $, null, n, T);
        for (E in n)
          if (T = n[E], D = l[E], n.hasOwnProperty(E) && T !== D && (T != null || D != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(o(137, e));
                break;
              default:
                At(
                  t,
                  e,
                  E,
                  T,
                  n,
                  D
                );
            }
        return;
      default:
        if (oc(e)) {
          for (var Dt in l)
            T = l[Dt], l.hasOwnProperty(Dt) && T !== void 0 && !n.hasOwnProperty(Dt) && Ws(
              t,
              e,
              Dt,
              void 0,
              n,
              T
            );
          for (R in n)
            T = n[R], D = l[R], !n.hasOwnProperty(R) || T === D || T === void 0 && D === void 0 || Ws(
              t,
              e,
              R,
              T,
              n,
              D
            );
          return;
        }
    }
    for (var p in l)
      T = l[p], l.hasOwnProperty(p) && T != null && !n.hasOwnProperty(p) && At(t, e, p, null, n, T);
    for (j in n)
      T = n[j], D = l[j], !n.hasOwnProperty(j) || T === D || T == null && D == null || At(t, e, j, T, n, D);
  }
  function uh(t) {
    switch (t) {
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
  function yg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, c = a.initiatorType, r = a.duration;
        if (u && r && uh(c)) {
          for (c = 0, r = a.responseEnd, n += 1; n < l.length; n++) {
            var v = l[n], E = v.startTime;
            if (E > r) break;
            var R = v.transferSize, j = v.initiatorType;
            R && uh(j) && (v = v.responseEnd, c += R * (v < r ? 1 : (r - E) / (v - E)));
          }
          if (--n, e += 8 * (u + c) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Fs = null, Is = null;
  function Ci(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function ih(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ch(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Ps(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var tf = null;
  function bg() {
    var t = window.event;
    return t && t.type === "popstate" ? t === tf ? !1 : (tf = t, !0) : (tf = null, !1);
  }
  var sh = typeof setTimeout == "function" ? setTimeout : void 0, pg = typeof clearTimeout == "function" ? clearTimeout : void 0, fh = typeof Promise == "function" ? Promise : void 0, Sg = typeof queueMicrotask == "function" ? queueMicrotask : typeof fh < "u" ? function(t) {
    return fh.resolve(null).then(t).catch(xg);
  } : sh;
  function xg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ln(t) {
    return t === "head";
  }
  function oh(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), ba(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          su(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, su(l);
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling, r = u.nodeName;
            u[Aa] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = c;
          }
        } else
          l === "body" && su(t.ownerDocument.body);
      l = a;
    } while (l);
    ba(e);
  }
  function rh(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = n;
    } while (l);
  }
  function ef(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ef(l), ic(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Eg(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Aa])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = $e(t.nextSibling), t === null) break;
    }
    return null;
  }
  function zg(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = $e(t.nextSibling), t === null)) return null;
    return t;
  }
  function dh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = $e(t.nextSibling), t === null)) return null;
    return t;
  }
  function lf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function nf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Tg(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var n = function() {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function $e(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var af = null;
  function hh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return $e(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function vh(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function mh(t, e, l) {
    switch (e = Ci(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function su(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    ic(t);
  }
  var We = /* @__PURE__ */ new Map(), gh = /* @__PURE__ */ new Set();
  function Ni(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var wl = w.d;
  w.d = {
    f: _g,
    r: Ag,
    D: Dg,
    C: Mg,
    L: Og,
    m: Cg,
    X: Rg,
    S: Ng,
    M: Ug
  };
  function _g() {
    var t = wl.f(), e = Ei();
    return t || e;
  }
  function Ag(t) {
    var e = Bn(t);
    e !== null && e.tag === 5 && e.type === "form" ? Ur(e) : wl.r(t);
  }
  var ma = typeof document > "u" ? null : document;
  function yh(t, e, l) {
    var n = ma;
    if (n && typeof e == "string" && e) {
      var a = Ge(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), gh.has(a) || (gh.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), ce(e, "link", t), It(e), n.head.appendChild(e)));
    }
  }
  function Dg(t) {
    wl.D(t), yh("dns-prefetch", t, null);
  }
  function Mg(t, e) {
    wl.C(t, e), yh("preconnect", t, e);
  }
  function Og(t, e, l) {
    wl.L(t, e, l);
    var n = ma;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + Ge(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + Ge(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + Ge(
        l.imageSizes
      ) + '"]')) : a += '[href="' + Ge(t) + '"]';
      var u = a;
      switch (e) {
        case "style":
          u = ga(t);
          break;
        case "script":
          u = ya(t);
      }
      We.has(u) || (t = _(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), We.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(fu(u)) || e === "script" && n.querySelector(ou(u)) || (e = n.createElement("link"), ce(e, "link", t), It(e), n.head.appendChild(e)));
    }
  }
  function Cg(t, e) {
    wl.m(t, e);
    var l = ma;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Ge(n) + '"][href="' + Ge(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ya(t);
      }
      if (!We.has(u) && (t = _({ rel: "modulepreload", href: t }, e), We.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ou(u)))
              return;
        }
        n = l.createElement("link"), ce(n, "link", t), It(n), l.head.appendChild(n);
      }
    }
  }
  function Ng(t, e, l) {
    wl.S(t, e, l);
    var n = ma;
    if (n && t) {
      var a = qn(n).hoistableStyles, u = ga(t);
      e = e || "default";
      var c = a.get(u);
      if (!c) {
        var r = { loading: 0, preload: null };
        if (c = n.querySelector(
          fu(u)
        ))
          r.loading = 5;
        else {
          t = _(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = We.get(u)) && uf(t, l);
          var v = c = n.createElement("link");
          It(v), ce(v, "link", t), v._p = new Promise(function(E, R) {
            v.onload = E, v.onerror = R;
          }), v.addEventListener("load", function() {
            r.loading |= 1;
          }), v.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, Ri(c, e, n);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: r
        }, a.set(u, c);
      }
    }
  }
  function Rg(t, e) {
    wl.X(t, e);
    var l = ma;
    if (l && t) {
      var n = qn(l).hoistableScripts, a = ya(t), u = n.get(a);
      u || (u = l.querySelector(ou(a)), u || (t = _({ src: t, async: !0 }, e), (e = We.get(a)) && cf(t, e), u = l.createElement("script"), It(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Ug(t, e) {
    wl.M(t, e);
    var l = ma;
    if (l && t) {
      var n = qn(l).hoistableScripts, a = ya(t), u = n.get(a);
      u || (u = l.querySelector(ou(a)), u || (t = _({ src: t, async: !0, type: "module" }, e), (e = We.get(a)) && cf(t, e), u = l.createElement("script"), It(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function bh(t, e, l, n) {
    var a = (a = F.current) ? Ni(a) : null;
    if (!a) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = ga(l.href), l = qn(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = ga(l.href);
          var u = qn(
            a
          ).hoistableStyles, c = u.get(t);
          if (c || (a = a.ownerDocument || a, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = a.querySelector(
            fu(t)
          )) && !u._p && (c.instance = u, c.state.loading = 5), We.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, We.set(t, l), u || jg(
            a,
            t,
            l,
            c.state
          ))), e && n === null)
            throw Error(o(528, ""));
          return c;
        }
        if (e && n !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = ya(l), l = qn(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ga(t) {
    return 'href="' + Ge(t) + '"';
  }
  function fu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function ph(t) {
    return _({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function jg(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), ce(e, "link", l), It(e), t.head.appendChild(e));
  }
  function ya(t) {
    return '[src="' + Ge(t) + '"]';
  }
  function ou(t) {
    return "script[async]" + t;
  }
  function Sh(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Ge(l.href) + '"]'
          );
          if (n)
            return e.instance = n, It(n), n;
          var a = _({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), It(n), ce(n, "style", a), Ri(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = ga(l.href);
          var u = t.querySelector(
            fu(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, It(u), u;
          n = ph(l), (a = We.get(a)) && uf(n, a), u = (t.ownerDocument || t).createElement("link"), It(u);
          var c = u;
          return c._p = new Promise(function(r, v) {
            c.onload = r, c.onerror = v;
          }), ce(u, "link", n), e.state.loading |= 4, Ri(u, l.precedence, t), e.instance = u;
        case "script":
          return u = ya(l.src), (a = t.querySelector(
            ou(u)
          )) ? (e.instance = a, It(a), a) : (n = l, (a = We.get(u)) && (n = _({}, l), cf(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), It(a), ce(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, Ri(n, l.precedence, t));
    return e.instance;
  }
  function Ri(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, c = 0; c < n.length; c++) {
      var r = n[c];
      if (r.dataset.precedence === e) u = r;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function uf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function cf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ui = null;
  function xh(t, e, l) {
    if (Ui === null) {
      var n = /* @__PURE__ */ new Map(), a = Ui = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Ui, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[Aa] || u[ne] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(e) || "";
        c = t + c;
        var r = n.get(c);
        r ? r.push(u) : n.set(c, [u]);
      }
    }
    return n;
  }
  function Eh(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Hg(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function zh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function wg(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = ga(n.href), u = e.querySelector(
          fu(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ji.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, It(u);
          return;
        }
        u = e.ownerDocument || e, n = ph(n), (a = We.get(a)) && uf(n, a), u = u.createElement("link"), It(u);
        var c = u;
        c._p = new Promise(function(r, v) {
          c.onload = r, c.onerror = v;
        }), ce(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = ji.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var sf = 0;
  function Bg(t, e) {
    return t.stylesheets && t.count === 0 && wi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && wi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && sf === 0 && (sf = 62500 * yg());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && wi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > sf ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function ji() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) wi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Hi = null;
  function wi(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Hi = /* @__PURE__ */ new Map(), e.forEach(qg, t), Hi = null, ji.call(t));
  }
  function qg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Hi.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Hi.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var c = a[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), n = c);
        }
        n && l.set(null, n);
      }
      a = e.instance, c = a.getAttribute("data-precedence"), u = l.get(c) || n, u === n && l.set(null, a), l.set(c, a), this.count++, n = ji.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var ru = {
    $$typeof: K,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function Yg(t, e, l, n, a, u, c, r, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = be(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = be(0), this.hiddenUpdates = be(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Th(t, e, l, n, a, u, c, r, v, E, R, j) {
    return t = new Yg(
      t,
      e,
      l,
      c,
      v,
      E,
      R,
      j,
      r
    ), e = 1, u === !0 && (e |= 24), u = Ce(3, null, null, e), t.current = u, u.stateNode = t, e = Xc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, Zc(u), t;
  }
  function _h(t) {
    return t ? (t = kn, t) : kn;
  }
  function Ah(t, e, l, n, a, u) {
    a = _h(a), n.context === null ? n.context = a : n.pendingContext = a, n = Vl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = Kl(t, n, e), l !== null && (_e(l, t, e), Qa(l, t, e));
  }
  function Dh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function ff(t, e) {
    Dh(t, e), (t = t.alternate) && Dh(t, e);
  }
  function Mh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = bn(t, 67108864);
      e !== null && _e(e, t, 67108864), ff(t, 67108864);
    }
  }
  function Oh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = He();
      e = yl(e);
      var l = bn(t, e);
      l !== null && _e(l, t, e), ff(t, e);
    }
  }
  var Bi = !0;
  function Xg(t, e, l, n) {
    var a = C.T;
    C.T = null;
    var u = w.p;
    try {
      w.p = 2, of(t, e, l, n);
    } finally {
      w.p = u, C.T = a;
    }
  }
  function Lg(t, e, l, n) {
    var a = C.T;
    C.T = null;
    var u = w.p;
    try {
      w.p = 8, of(t, e, l, n);
    } finally {
      w.p = u, C.T = a;
    }
  }
  function of(t, e, l, n) {
    if (Bi) {
      var a = rf(n);
      if (a === null)
        $s(
          t,
          e,
          n,
          qi,
          l
        ), Nh(t, n);
      else if (Qg(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (Nh(t, n), e & 4 && -1 < Gg.indexOf(t)) {
        for (; a !== null; ) {
          var u = Bn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = qt(u.pendingLanes);
                  if (c !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; c; ) {
                      var v = 1 << 31 - oe(c);
                      r.entanglements[1] |= v, c &= ~v;
                    }
                    dl(u), (xt & 6) === 0 && (Si = fe() + 500, uu(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = bn(u, 2), r !== null && _e(r, u, 2), Ei(), ff(u, 2);
            }
          if (u = rf(n), u === null && $s(
            t,
            e,
            n,
            qi,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        $s(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function rf(t) {
    return t = dc(t), df(t);
  }
  var qi = null;
  function df(t) {
    if (qi = null, t = wn(t), t !== null) {
      var e = m(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = S(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = z(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return qi = t, null;
  }
  function Ch(t) {
    switch (t) {
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
        switch (lc()) {
          case Ou:
            return 2;
          case gl:
            return 8;
          case Ie:
          case dn:
            return 32;
          case _a:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hf = !1, nn = null, an = null, un = null, du = /* @__PURE__ */ new Map(), hu = /* @__PURE__ */ new Map(), cn = [], Gg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Nh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        nn = null;
        break;
      case "dragenter":
      case "dragleave":
        an = null;
        break;
      case "mouseover":
      case "mouseout":
        un = null;
        break;
      case "pointerover":
      case "pointerout":
        du.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hu.delete(e.pointerId);
    }
  }
  function vu(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = Bn(e), e !== null && Mh(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function Qg(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return nn = vu(
          nn,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return an = vu(
          an,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return un = vu(
          un,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return du.set(
          u,
          vu(
            du.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, hu.set(
          u,
          vu(
            hu.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function Rh(t) {
    var e = wn(t.target);
    if (e !== null) {
      var l = m(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = S(l), e !== null) {
            t.blockedOn = e, ql(t.priority, function() {
              Oh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = z(l), e !== null) {
            t.blockedOn = e, ql(t.priority, function() {
              Oh(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Yi(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = rf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        rc = n, l.target.dispatchEvent(n), rc = null;
      } else
        return e = Bn(l), e !== null && Mh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Uh(t, e, l) {
    Yi(t) && l.delete(e);
  }
  function Zg() {
    hf = !1, nn !== null && Yi(nn) && (nn = null), an !== null && Yi(an) && (an = null), un !== null && Yi(un) && (un = null), du.forEach(Uh), hu.forEach(Uh);
  }
  function Xi(t, e) {
    t.blockedOn === e && (t.blockedOn = null, hf || (hf = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      Zg
    )));
  }
  var Li = null;
  function jh(t) {
    Li !== t && (Li = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        Li === t && (Li = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (df(n || l) === null)
              continue;
            break;
          }
          var u = Bn(l);
          u !== null && (t.splice(e, 3), e -= 3, os(
            u,
            {
              pending: !0,
              data: a,
              method: l.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function ba(t) {
    function e(v) {
      return Xi(v, t);
    }
    nn !== null && Xi(nn, t), an !== null && Xi(an, t), un !== null && Xi(un, t), du.forEach(e), hu.forEach(e);
    for (var l = 0; l < cn.length; l++) {
      var n = cn[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < cn.length && (l = cn[0], l.blockedOn === null); )
      Rh(l), l.blockedOn === null && cn.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], c = a[pe] || null;
        if (typeof u == "function")
          c || jh(l);
        else if (c) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, c = u[pe] || null)
              r = c.formAction;
            else if (df(a) !== null) continue;
          } else r = c.action;
          typeof r == "function" ? l[n + 1] = r : (l.splice(n, 3), n -= 3), jh(l);
        }
      }
  }
  function Hh() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return a = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function vf(t) {
    this._internalRoot = t;
  }
  Gi.prototype.render = vf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var l = e.current, n = He();
    Ah(l, n, t, e, null, null);
  }, Gi.prototype.unmount = vf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Ah(t.current, 2, null, t, null, null), Ei(), e[Hn] = null;
    }
  };
  function Gi(t) {
    this._internalRoot = t;
  }
  Gi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = tl();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < cn.length && e !== 0 && e < cn[l].priority; l++) ;
      cn.splice(l, 0, t), l === 0 && Rh(t);
    }
  };
  var wh = s.version;
  if (wh !== "19.2.7")
    throw Error(
      o(
        527,
        wh,
        "19.2.7"
      )
    );
  w.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = h(e), t = t !== null ? M(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Vg = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qi.isDisabled && Qi.supportsFiber)
      try {
        hn = Qi.inject(
          Vg
        ), he = Qi;
      } catch {
      }
  }
  return gu.createRoot = function(t, e) {
    if (!d(t)) throw Error(o(299));
    var l = !1, n = "", a = Qr, u = Zr, c = Vr;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError)), e = Th(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      u,
      c,
      Hh
    ), t[Hn] = e.current, ks(t), new vf(e);
  }, gu.hydrateRoot = function(t, e, l) {
    if (!d(t)) throw Error(o(299));
    var n = !1, a = "", u = Qr, c = Zr, r = Vr, v = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), e = Th(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      v,
      u,
      c,
      r,
      Hh
    ), e.context = _h(null), l = e.current, n = He(), n = yl(n), a = Vl(n), a.callback = null, Kl(l, a, n), l = n, e.current.lanes = l, qe(e, l), dl(e), t[Hn] = e.current, ks(t), new Gi(e);
  }, gu.version = "19.2.7", gu;
}
var Kh;
function n0() {
  if (Kh) return gf.exports;
  Kh = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return i(), gf.exports = l0(), gf.exports;
}
var a0 = n0(), A = jf();
const Ae = /* @__PURE__ */ $g(A);
var yu = ov();
function u0() {
  for (var i = arguments.length, s = new Array(i), f = 0; f < i; f++)
    s[f] = arguments[f];
  return A.useMemo(
    () => (o) => {
      s.forEach((d) => d(o));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    s
  );
}
const Pi = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function xa(i) {
  const s = Object.prototype.toString.call(i);
  return s === "[object Window]" || // In Electron context the Window object serializes to [object global]
  s === "[object global]";
}
function Hf(i) {
  return "nodeType" in i;
}
function De(i) {
  var s, f;
  return i ? xa(i) ? i : Hf(i) && (s = (f = i.ownerDocument) == null ? void 0 : f.defaultView) != null ? s : window : window;
}
function wf(i) {
  const {
    Document: s
  } = De(i);
  return i instanceof s;
}
function Tu(i) {
  return xa(i) ? !1 : i instanceof De(i).HTMLElement;
}
function rv(i) {
  return i instanceof De(i).SVGElement;
}
function Ea(i) {
  return i ? xa(i) ? i.document : Hf(i) ? wf(i) ? i : Tu(i) || rv(i) ? i.ownerDocument : document : document : document;
}
const hl = Pi ? A.useLayoutEffect : A.useEffect;
function Bf(i) {
  const s = A.useRef(i);
  return hl(() => {
    s.current = i;
  }), A.useCallback(function() {
    for (var f = arguments.length, o = new Array(f), d = 0; d < f; d++)
      o[d] = arguments[d];
    return s.current == null ? void 0 : s.current(...o);
  }, []);
}
function i0() {
  const i = A.useRef(null), s = A.useCallback((o, d) => {
    i.current = setInterval(o, d);
  }, []), f = A.useCallback(() => {
    i.current !== null && (clearInterval(i.current), i.current = null);
  }, []);
  return [s, f];
}
function xu(i, s) {
  s === void 0 && (s = [i]);
  const f = A.useRef(i);
  return hl(() => {
    f.current !== i && (f.current = i);
  }, s), f;
}
function _u(i, s) {
  const f = A.useRef();
  return A.useMemo(
    () => {
      const o = i(f.current);
      return f.current = o, o;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...s]
  );
}
function ki(i) {
  const s = Bf(i), f = A.useRef(null), o = A.useCallback(
    (d) => {
      d !== f.current && s?.(d, f.current), f.current = d;
    },
    //eslint-disable-next-line
    []
  );
  return [f, o];
}
function Mf(i) {
  const s = A.useRef();
  return A.useEffect(() => {
    s.current = i;
  }, [i]), s.current;
}
let xf = {};
function Au(i, s) {
  return A.useMemo(() => {
    if (s)
      return s;
    const f = xf[i] == null ? 0 : xf[i] + 1;
    return xf[i] = f, i + "-" + f;
  }, [i, s]);
}
function dv(i) {
  return function(s) {
    for (var f = arguments.length, o = new Array(f > 1 ? f - 1 : 0), d = 1; d < f; d++)
      o[d - 1] = arguments[d];
    return o.reduce((m, S) => {
      const z = Object.entries(S);
      for (const [b, h] of z) {
        const M = m[b];
        M != null && (m[b] = M + i * h);
      }
      return m;
    }, {
      ...s
    });
  };
}
const Sa = /* @__PURE__ */ dv(1), $i = /* @__PURE__ */ dv(-1);
function c0(i) {
  return "clientX" in i && "clientY" in i;
}
function qf(i) {
  if (!i)
    return !1;
  const {
    KeyboardEvent: s
  } = De(i.target);
  return s && i instanceof s;
}
function s0(i) {
  if (!i)
    return !1;
  const {
    TouchEvent: s
  } = De(i.target);
  return s && i instanceof s;
}
function Of(i) {
  if (s0(i)) {
    if (i.touches && i.touches.length) {
      const {
        clientX: s,
        clientY: f
      } = i.touches[0];
      return {
        x: s,
        y: f
      };
    } else if (i.changedTouches && i.changedTouches.length) {
      const {
        clientX: s,
        clientY: f
      } = i.changedTouches[0];
      return {
        x: s,
        y: f
      };
    }
  }
  return c0(i) ? {
    x: i.clientX,
    y: i.clientY
  } : null;
}
const Eu = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(i) {
      if (!i)
        return;
      const {
        x: s,
        y: f
      } = i;
      return "translate3d(" + (s ? Math.round(s) : 0) + "px, " + (f ? Math.round(f) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(i) {
      if (!i)
        return;
      const {
        scaleX: s,
        scaleY: f
      } = i;
      return "scaleX(" + s + ") scaleY(" + f + ")";
    }
  },
  Transform: {
    toString(i) {
      if (i)
        return [Eu.Translate.toString(i), Eu.Scale.toString(i)].join(" ");
    }
  },
  Transition: {
    toString(i) {
      let {
        property: s,
        duration: f,
        easing: o
      } = i;
      return s + " " + f + "ms " + o;
    }
  }
}), Jh = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function f0(i) {
  return i.matches(Jh) ? i : i.querySelector(Jh);
}
const o0 = {
  display: "none"
};
function r0(i) {
  let {
    id: s,
    value: f
  } = i;
  return Ae.createElement("div", {
    id: s,
    style: o0
  }, f);
}
function d0(i) {
  let {
    id: s,
    announcement: f,
    ariaLiveType: o = "assertive"
  } = i;
  const d = {
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
  return Ae.createElement("div", {
    id: s,
    style: d,
    role: "status",
    "aria-live": o,
    "aria-atomic": !0
  }, f);
}
function h0() {
  const [i, s] = A.useState("");
  return {
    announce: A.useCallback((o) => {
      o != null && s(o);
    }, []),
    announcement: i
  };
}
const hv = /* @__PURE__ */ A.createContext(null);
function v0(i) {
  const s = A.useContext(hv);
  A.useEffect(() => {
    if (!s)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return s(i);
  }, [i, s]);
}
function m0() {
  const [i] = A.useState(() => /* @__PURE__ */ new Set()), s = A.useCallback((o) => (i.add(o), () => i.delete(o)), [i]);
  return [A.useCallback((o) => {
    let {
      type: d,
      event: m
    } = o;
    i.forEach((S) => {
      var z;
      return (z = S[d]) == null ? void 0 : z.call(S, m);
    });
  }, [i]), s];
}
const g0 = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, y0 = {
  onDragStart(i) {
    let {
      active: s
    } = i;
    return "Picked up draggable item " + s.id + ".";
  },
  onDragOver(i) {
    let {
      active: s,
      over: f
    } = i;
    return f ? "Draggable item " + s.id + " was moved over droppable area " + f.id + "." : "Draggable item " + s.id + " is no longer over a droppable area.";
  },
  onDragEnd(i) {
    let {
      active: s,
      over: f
    } = i;
    return f ? "Draggable item " + s.id + " was dropped over droppable area " + f.id : "Draggable item " + s.id + " was dropped.";
  },
  onDragCancel(i) {
    let {
      active: s
    } = i;
    return "Dragging was cancelled. Draggable item " + s.id + " was dropped.";
  }
};
function b0(i) {
  let {
    announcements: s = y0,
    container: f,
    hiddenTextDescribedById: o,
    screenReaderInstructions: d = g0
  } = i;
  const {
    announce: m,
    announcement: S
  } = h0(), z = Au("DndLiveRegion"), [b, h] = A.useState(!1);
  if (A.useEffect(() => {
    h(!0);
  }, []), v0(A.useMemo(() => ({
    onDragStart(_) {
      let {
        active: H
      } = _;
      m(s.onDragStart({
        active: H
      }));
    },
    onDragMove(_) {
      let {
        active: H,
        over: B
      } = _;
      s.onDragMove && m(s.onDragMove({
        active: H,
        over: B
      }));
    },
    onDragOver(_) {
      let {
        active: H,
        over: B
      } = _;
      m(s.onDragOver({
        active: H,
        over: B
      }));
    },
    onDragEnd(_) {
      let {
        active: H,
        over: B
      } = _;
      m(s.onDragEnd({
        active: H,
        over: B
      }));
    },
    onDragCancel(_) {
      let {
        active: H,
        over: B
      } = _;
      m(s.onDragCancel({
        active: H,
        over: B
      }));
    }
  }), [m, s])), !b)
    return null;
  const M = Ae.createElement(Ae.Fragment, null, Ae.createElement(r0, {
    id: o,
    value: d.draggable
  }), Ae.createElement(d0, {
    id: z,
    announcement: S
  }));
  return f ? yu.createPortal(M, f) : M;
}
var Wt;
(function(i) {
  i.DragStart = "dragStart", i.DragMove = "dragMove", i.DragEnd = "dragEnd", i.DragCancel = "dragCancel", i.DragOver = "dragOver", i.RegisterDroppable = "registerDroppable", i.SetDroppableDisabled = "setDroppableDisabled", i.UnregisterDroppable = "unregisterDroppable";
})(Wt || (Wt = {}));
function Wi() {
}
function p0(i, s) {
  return A.useMemo(
    () => ({
      sensor: i,
      options: s ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i, s]
  );
}
function S0() {
  for (var i = arguments.length, s = new Array(i), f = 0; f < i; f++)
    s[f] = arguments[f];
  return A.useMemo(
    () => [...s].filter((o) => o != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...s]
  );
}
const al = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function x0(i, s) {
  return Math.sqrt(Math.pow(i.x - s.x, 2) + Math.pow(i.y - s.y, 2));
}
function E0(i, s) {
  let {
    data: {
      value: f
    }
  } = i, {
    data: {
      value: o
    }
  } = s;
  return f - o;
}
function z0(i, s) {
  let {
    data: {
      value: f
    }
  } = i, {
    data: {
      value: o
    }
  } = s;
  return o - f;
}
function T0(i, s) {
  if (!i || i.length === 0)
    return null;
  const [f] = i;
  return f[s];
}
function kh(i, s, f) {
  return s === void 0 && (s = i.left), f === void 0 && (f = i.top), {
    x: s + i.width * 0.5,
    y: f + i.height * 0.5
  };
}
const _0 = (i) => {
  let {
    collisionRect: s,
    droppableRects: f,
    droppableContainers: o
  } = i;
  const d = kh(s, s.left, s.top), m = [];
  for (const S of o) {
    const {
      id: z
    } = S, b = f.get(z);
    if (b) {
      const h = x0(kh(b), d);
      m.push({
        id: z,
        data: {
          droppableContainer: S,
          value: h
        }
      });
    }
  }
  return m.sort(E0);
};
function A0(i, s) {
  const f = Math.max(s.top, i.top), o = Math.max(s.left, i.left), d = Math.min(s.left + s.width, i.left + i.width), m = Math.min(s.top + s.height, i.top + i.height), S = d - o, z = m - f;
  if (o < d && f < m) {
    const b = s.width * s.height, h = i.width * i.height, M = S * z, _ = M / (b + h - M);
    return Number(_.toFixed(4));
  }
  return 0;
}
const D0 = (i) => {
  let {
    collisionRect: s,
    droppableRects: f,
    droppableContainers: o
  } = i;
  const d = [];
  for (const m of o) {
    const {
      id: S
    } = m, z = f.get(S);
    if (z) {
      const b = A0(z, s);
      b > 0 && d.push({
        id: S,
        data: {
          droppableContainer: m,
          value: b
        }
      });
    }
  }
  return d.sort(z0);
};
function M0(i, s, f) {
  return {
    ...i,
    scaleX: s && f ? s.width / f.width : 1,
    scaleY: s && f ? s.height / f.height : 1
  };
}
function vv(i, s) {
  return i && s ? {
    x: i.left - s.left,
    y: i.top - s.top
  } : al;
}
function O0(i) {
  return function(f) {
    for (var o = arguments.length, d = new Array(o > 1 ? o - 1 : 0), m = 1; m < o; m++)
      d[m - 1] = arguments[m];
    return d.reduce((S, z) => ({
      ...S,
      top: S.top + i * z.y,
      bottom: S.bottom + i * z.y,
      left: S.left + i * z.x,
      right: S.right + i * z.x
    }), {
      ...f
    });
  };
}
const C0 = /* @__PURE__ */ O0(1);
function N0(i) {
  if (i.startsWith("matrix3d(")) {
    const s = i.slice(9, -1).split(/, /);
    return {
      x: +s[12],
      y: +s[13],
      scaleX: +s[0],
      scaleY: +s[5]
    };
  } else if (i.startsWith("matrix(")) {
    const s = i.slice(7, -1).split(/, /);
    return {
      x: +s[4],
      y: +s[5],
      scaleX: +s[0],
      scaleY: +s[3]
    };
  }
  return null;
}
function R0(i, s, f) {
  const o = N0(s);
  if (!o)
    return i;
  const {
    scaleX: d,
    scaleY: m,
    x: S,
    y: z
  } = o, b = i.left - S - (1 - d) * parseFloat(f), h = i.top - z - (1 - m) * parseFloat(f.slice(f.indexOf(" ") + 1)), M = d ? i.width / d : i.width, _ = m ? i.height / m : i.height;
  return {
    width: M,
    height: _,
    top: h,
    right: b + M,
    bottom: h + _,
    left: b
  };
}
const U0 = {
  ignoreTransform: !1
};
function za(i, s) {
  s === void 0 && (s = U0);
  let f = i.getBoundingClientRect();
  if (s.ignoreTransform) {
    const {
      transform: h,
      transformOrigin: M
    } = De(i).getComputedStyle(i);
    h && (f = R0(f, h, M));
  }
  const {
    top: o,
    left: d,
    width: m,
    height: S,
    bottom: z,
    right: b
  } = f;
  return {
    top: o,
    left: d,
    width: m,
    height: S,
    bottom: z,
    right: b
  };
}
function $h(i) {
  return za(i, {
    ignoreTransform: !0
  });
}
function j0(i) {
  const s = i.innerWidth, f = i.innerHeight;
  return {
    top: 0,
    left: 0,
    right: s,
    bottom: f,
    width: s,
    height: f
  };
}
function H0(i, s) {
  return s === void 0 && (s = De(i).getComputedStyle(i)), s.position === "fixed";
}
function w0(i, s) {
  s === void 0 && (s = De(i).getComputedStyle(i));
  const f = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((d) => {
    const m = s[d];
    return typeof m == "string" ? f.test(m) : !1;
  });
}
function Yf(i, s) {
  const f = [];
  function o(d) {
    if (s != null && f.length >= s || !d)
      return f;
    if (wf(d) && d.scrollingElement != null && !f.includes(d.scrollingElement))
      return f.push(d.scrollingElement), f;
    if (!Tu(d) || rv(d) || f.includes(d))
      return f;
    const m = De(i).getComputedStyle(d);
    return d !== i && w0(d, m) && f.push(d), H0(d, m) ? f : o(d.parentNode);
  }
  return i ? o(i) : f;
}
function mv(i) {
  const [s] = Yf(i, 1);
  return s ?? null;
}
function Ef(i) {
  return !Pi || !i ? null : xa(i) ? i : Hf(i) ? wf(i) || i === Ea(i).scrollingElement ? window : Tu(i) ? i : null : null;
}
function gv(i) {
  return xa(i) ? i.scrollX : i.scrollLeft;
}
function yv(i) {
  return xa(i) ? i.scrollY : i.scrollTop;
}
function Cf(i) {
  return {
    x: gv(i),
    y: yv(i)
  };
}
var te;
(function(i) {
  i[i.Forward = 1] = "Forward", i[i.Backward = -1] = "Backward";
})(te || (te = {}));
function bv(i) {
  return !Pi || !i ? !1 : i === document.scrollingElement;
}
function pv(i) {
  const s = {
    x: 0,
    y: 0
  }, f = bv(i) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: i.clientHeight,
    width: i.clientWidth
  }, o = {
    x: i.scrollWidth - f.width,
    y: i.scrollHeight - f.height
  }, d = i.scrollTop <= s.y, m = i.scrollLeft <= s.x, S = i.scrollTop >= o.y, z = i.scrollLeft >= o.x;
  return {
    isTop: d,
    isLeft: m,
    isBottom: S,
    isRight: z,
    maxScroll: o,
    minScroll: s
  };
}
const B0 = {
  x: 0.2,
  y: 0.2
};
function q0(i, s, f, o, d) {
  let {
    top: m,
    left: S,
    right: z,
    bottom: b
  } = f;
  o === void 0 && (o = 10), d === void 0 && (d = B0);
  const {
    isTop: h,
    isBottom: M,
    isLeft: _,
    isRight: H
  } = pv(i), B = {
    x: 0,
    y: 0
  }, k = {
    x: 0,
    y: 0
  }, Y = {
    height: s.height * d.y,
    width: s.width * d.x
  };
  return !h && m <= s.top + Y.height ? (B.y = te.Backward, k.y = o * Math.abs((s.top + Y.height - m) / Y.height)) : !M && b >= s.bottom - Y.height && (B.y = te.Forward, k.y = o * Math.abs((s.bottom - Y.height - b) / Y.height)), !H && z >= s.right - Y.width ? (B.x = te.Forward, k.x = o * Math.abs((s.right - Y.width - z) / Y.width)) : !_ && S <= s.left + Y.width && (B.x = te.Backward, k.x = o * Math.abs((s.left + Y.width - S) / Y.width)), {
    direction: B,
    speed: k
  };
}
function Y0(i) {
  if (i === document.scrollingElement) {
    const {
      innerWidth: m,
      innerHeight: S
    } = window;
    return {
      top: 0,
      left: 0,
      right: m,
      bottom: S,
      width: m,
      height: S
    };
  }
  const {
    top: s,
    left: f,
    right: o,
    bottom: d
  } = i.getBoundingClientRect();
  return {
    top: s,
    left: f,
    right: o,
    bottom: d,
    width: i.clientWidth,
    height: i.clientHeight
  };
}
function Sv(i) {
  return i.reduce((s, f) => Sa(s, Cf(f)), al);
}
function X0(i) {
  return i.reduce((s, f) => s + gv(f), 0);
}
function L0(i) {
  return i.reduce((s, f) => s + yv(f), 0);
}
function G0(i, s) {
  if (s === void 0 && (s = za), !i)
    return;
  const {
    top: f,
    left: o,
    bottom: d,
    right: m
  } = s(i);
  mv(i) && (d <= 0 || m <= 0 || f >= window.innerHeight || o >= window.innerWidth) && i.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const Q0 = [["x", ["left", "right"], X0], ["y", ["top", "bottom"], L0]];
class Xf {
  constructor(s, f) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const o = Yf(f), d = Sv(o);
    this.rect = {
      ...s
    }, this.width = s.width, this.height = s.height;
    for (const [m, S, z] of Q0)
      for (const b of S)
        Object.defineProperty(this, b, {
          get: () => {
            const h = z(o), M = d[m] - h;
            return this.rect[b] + M;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class bu {
  constructor(s) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((f) => {
        var o;
        return (o = this.target) == null ? void 0 : o.removeEventListener(...f);
      });
    }, this.target = s;
  }
  add(s, f, o) {
    var d;
    (d = this.target) == null || d.addEventListener(s, f, o), this.listeners.push([s, f, o]);
  }
}
function Z0(i) {
  const {
    EventTarget: s
  } = De(i);
  return i instanceof s ? i : Ea(i);
}
function zf(i, s) {
  const f = Math.abs(i.x), o = Math.abs(i.y);
  return typeof s == "number" ? Math.sqrt(f ** 2 + o ** 2) > s : "x" in s && "y" in s ? f > s.x && o > s.y : "x" in s ? f > s.x : "y" in s ? o > s.y : !1;
}
var Fe;
(function(i) {
  i.Click = "click", i.DragStart = "dragstart", i.Keydown = "keydown", i.ContextMenu = "contextmenu", i.Resize = "resize", i.SelectionChange = "selectionchange", i.VisibilityChange = "visibilitychange";
})(Fe || (Fe = {}));
function Wh(i) {
  i.preventDefault();
}
function V0(i) {
  i.stopPropagation();
}
var Et;
(function(i) {
  i.Space = "Space", i.Down = "ArrowDown", i.Right = "ArrowRight", i.Left = "ArrowLeft", i.Up = "ArrowUp", i.Esc = "Escape", i.Enter = "Enter", i.Tab = "Tab";
})(Et || (Et = {}));
const xv = {
  start: [Et.Space, Et.Enter],
  cancel: [Et.Esc],
  end: [Et.Space, Et.Enter, Et.Tab]
}, K0 = (i, s) => {
  let {
    currentCoordinates: f
  } = s;
  switch (i.code) {
    case Et.Right:
      return {
        ...f,
        x: f.x + 25
      };
    case Et.Left:
      return {
        ...f,
        x: f.x - 25
      };
    case Et.Down:
      return {
        ...f,
        y: f.y + 25
      };
    case Et.Up:
      return {
        ...f,
        y: f.y - 25
      };
  }
};
class Ev {
  constructor(s) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = s;
    const {
      event: {
        target: f
      }
    } = s;
    this.props = s, this.listeners = new bu(Ea(f)), this.windowListeners = new bu(De(f)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(Fe.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: s,
      onStart: f
    } = this.props, o = s.node.current;
    o && G0(o), f(al);
  }
  handleKeyDown(s) {
    if (qf(s)) {
      const {
        active: f,
        context: o,
        options: d
      } = this.props, {
        keyboardCodes: m = xv,
        coordinateGetter: S = K0,
        scrollBehavior: z = "smooth"
      } = d, {
        code: b
      } = s;
      if (m.end.includes(b)) {
        this.handleEnd(s);
        return;
      }
      if (m.cancel.includes(b)) {
        this.handleCancel(s);
        return;
      }
      const {
        collisionRect: h
      } = o.current, M = h ? {
        x: h.left,
        y: h.top
      } : al;
      this.referenceCoordinates || (this.referenceCoordinates = M);
      const _ = S(s, {
        active: f,
        context: o.current,
        currentCoordinates: M
      });
      if (_) {
        const H = $i(_, M), B = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: k
        } = o.current;
        for (const Y of k) {
          const Z = s.code, {
            isTop: W,
            isRight: et,
            isLeft: K,
            isBottom: nt,
            maxScroll: it,
            minScroll: lt
          } = pv(Y), L = Y0(Y), I = {
            x: Math.min(Z === Et.Right ? L.right - L.width / 2 : L.right, Math.max(Z === Et.Right ? L.left : L.left + L.width / 2, _.x)),
            y: Math.min(Z === Et.Down ? L.bottom - L.height / 2 : L.bottom, Math.max(Z === Et.Down ? L.top : L.top + L.height / 2, _.y))
          }, pt = Z === Et.Right && !et || Z === Et.Left && !K, Ct = Z === Et.Down && !nt || Z === Et.Up && !W;
          if (pt && I.x !== _.x) {
            const dt = Y.scrollLeft + H.x, Ot = Z === Et.Right && dt <= it.x || Z === Et.Left && dt >= lt.x;
            if (Ot && !H.y) {
              Y.scrollTo({
                left: dt,
                behavior: z
              });
              return;
            }
            Ot ? B.x = Y.scrollLeft - dt : B.x = Z === Et.Right ? Y.scrollLeft - it.x : Y.scrollLeft - lt.x, B.x && Y.scrollBy({
              left: -B.x,
              behavior: z
            });
            break;
          } else if (Ct && I.y !== _.y) {
            const dt = Y.scrollTop + H.y, Ot = Z === Et.Down && dt <= it.y || Z === Et.Up && dt >= lt.y;
            if (Ot && !H.x) {
              Y.scrollTo({
                top: dt,
                behavior: z
              });
              return;
            }
            Ot ? B.y = Y.scrollTop - dt : B.y = Z === Et.Down ? Y.scrollTop - it.y : Y.scrollTop - lt.y, B.y && Y.scrollBy({
              top: -B.y,
              behavior: z
            });
            break;
          }
        }
        this.handleMove(s, Sa($i(_, this.referenceCoordinates), B));
      }
    }
  }
  handleMove(s, f) {
    const {
      onMove: o
    } = this.props;
    s.preventDefault(), o(f);
  }
  handleEnd(s) {
    const {
      onEnd: f
    } = this.props;
    s.preventDefault(), this.detach(), f();
  }
  handleCancel(s) {
    const {
      onCancel: f
    } = this.props;
    s.preventDefault(), this.detach(), f();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
Ev.activators = [{
  eventName: "onKeyDown",
  handler: (i, s, f) => {
    let {
      keyboardCodes: o = xv,
      onActivation: d
    } = s, {
      active: m
    } = f;
    const {
      code: S
    } = i.nativeEvent;
    if (o.start.includes(S)) {
      const z = m.activatorNode.current;
      return z && i.target !== z ? !1 : (i.preventDefault(), d?.({
        event: i.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function Fh(i) {
  return !!(i && "distance" in i);
}
function Ih(i) {
  return !!(i && "delay" in i);
}
class Lf {
  constructor(s, f, o) {
    var d;
    o === void 0 && (o = Z0(s.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = s, this.events = f;
    const {
      event: m
    } = s, {
      target: S
    } = m;
    this.props = s, this.events = f, this.document = Ea(S), this.documentListeners = new bu(this.document), this.listeners = new bu(o), this.windowListeners = new bu(De(S)), this.initialCoordinates = (d = Of(m)) != null ? d : al, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: s,
      props: {
        options: {
          activationConstraint: f,
          bypassActivationConstraint: o
        }
      }
    } = this;
    if (this.listeners.add(s.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(s.end.name, this.handleEnd), s.cancel && this.listeners.add(s.cancel.name, this.handleCancel), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.DragStart, Wh), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), this.windowListeners.add(Fe.ContextMenu, Wh), this.documentListeners.add(Fe.Keydown, this.handleKeydown), f) {
      if (o != null && o({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (Ih(f)) {
        this.timeoutId = setTimeout(this.handleStart, f.delay), this.handlePending(f);
        return;
      }
      if (Fh(f)) {
        this.handlePending(f);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(s, f) {
    const {
      active: o,
      onPending: d
    } = this.props;
    d(o, s, this.initialCoordinates, f);
  }
  handleStart() {
    const {
      initialCoordinates: s
    } = this, {
      onStart: f
    } = this.props;
    s && (this.activated = !0, this.documentListeners.add(Fe.Click, V0, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(Fe.SelectionChange, this.removeTextSelection), f(s));
  }
  handleMove(s) {
    var f;
    const {
      activated: o,
      initialCoordinates: d,
      props: m
    } = this, {
      onMove: S,
      options: {
        activationConstraint: z
      }
    } = m;
    if (!d)
      return;
    const b = (f = Of(s)) != null ? f : al, h = $i(d, b);
    if (!o && z) {
      if (Fh(z)) {
        if (z.tolerance != null && zf(h, z.tolerance))
          return this.handleCancel();
        if (zf(h, z.distance))
          return this.handleStart();
      }
      if (Ih(z) && zf(h, z.tolerance))
        return this.handleCancel();
      this.handlePending(z, h);
      return;
    }
    s.cancelable && s.preventDefault(), S(b);
  }
  handleEnd() {
    const {
      onAbort: s,
      onEnd: f
    } = this.props;
    this.detach(), this.activated || s(this.props.active), f();
  }
  handleCancel() {
    const {
      onAbort: s,
      onCancel: f
    } = this.props;
    this.detach(), this.activated || s(this.props.active), f();
  }
  handleKeydown(s) {
    s.code === Et.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var s;
    (s = this.document.getSelection()) == null || s.removeAllRanges();
  }
}
const J0 = {
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
class Gf extends Lf {
  constructor(s) {
    const {
      event: f
    } = s, o = Ea(f.target);
    super(s, J0, o);
  }
}
Gf.activators = [{
  eventName: "onPointerDown",
  handler: (i, s) => {
    let {
      nativeEvent: f
    } = i, {
      onActivation: o
    } = s;
    return !f.isPrimary || f.button !== 0 ? !1 : (o?.({
      event: f
    }), !0);
  }
}];
const k0 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var Nf;
(function(i) {
  i[i.RightClick = 2] = "RightClick";
})(Nf || (Nf = {}));
class $0 extends Lf {
  constructor(s) {
    super(s, k0, Ea(s.event.target));
  }
}
$0.activators = [{
  eventName: "onMouseDown",
  handler: (i, s) => {
    let {
      nativeEvent: f
    } = i, {
      onActivation: o
    } = s;
    return f.button === Nf.RightClick ? !1 : (o?.({
      event: f
    }), !0);
  }
}];
const Tf = {
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
class W0 extends Lf {
  constructor(s) {
    super(s, Tf);
  }
  static setup() {
    return window.addEventListener(Tf.move.name, s, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(Tf.move.name, s);
    };
    function s() {
    }
  }
}
W0.activators = [{
  eventName: "onTouchStart",
  handler: (i, s) => {
    let {
      nativeEvent: f
    } = i, {
      onActivation: o
    } = s;
    const {
      touches: d
    } = f;
    return d.length > 1 ? !1 : (o?.({
      event: f
    }), !0);
  }
}];
var pu;
(function(i) {
  i[i.Pointer = 0] = "Pointer", i[i.DraggableRect = 1] = "DraggableRect";
})(pu || (pu = {}));
var Fi;
(function(i) {
  i[i.TreeOrder = 0] = "TreeOrder", i[i.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Fi || (Fi = {}));
function F0(i) {
  let {
    acceleration: s,
    activator: f = pu.Pointer,
    canScroll: o,
    draggingRect: d,
    enabled: m,
    interval: S = 5,
    order: z = Fi.TreeOrder,
    pointerCoordinates: b,
    scrollableAncestors: h,
    scrollableAncestorRects: M,
    delta: _,
    threshold: H
  } = i;
  const B = P0({
    delta: _,
    disabled: !m
  }), [k, Y] = i0(), Z = A.useRef({
    x: 0,
    y: 0
  }), W = A.useRef({
    x: 0,
    y: 0
  }), et = A.useMemo(() => {
    switch (f) {
      case pu.Pointer:
        return b ? {
          top: b.y,
          bottom: b.y,
          left: b.x,
          right: b.x
        } : null;
      case pu.DraggableRect:
        return d;
    }
  }, [f, d, b]), K = A.useRef(null), nt = A.useCallback(() => {
    const lt = K.current;
    if (!lt)
      return;
    const L = Z.current.x * W.current.x, I = Z.current.y * W.current.y;
    lt.scrollBy(L, I);
  }, []), it = A.useMemo(() => z === Fi.TreeOrder ? [...h].reverse() : h, [z, h]);
  A.useEffect(
    () => {
      if (!m || !h.length || !et) {
        Y();
        return;
      }
      for (const lt of it) {
        if (o?.(lt) === !1)
          continue;
        const L = h.indexOf(lt), I = M[L];
        if (!I)
          continue;
        const {
          direction: pt,
          speed: Ct
        } = q0(lt, I, et, s, H);
        for (const dt of ["x", "y"])
          B[dt][pt[dt]] || (Ct[dt] = 0, pt[dt] = 0);
        if (Ct.x > 0 || Ct.y > 0) {
          Y(), K.current = lt, k(nt, S), Z.current = Ct, W.current = pt;
          return;
        }
      }
      Z.current = {
        x: 0,
        y: 0
      }, W.current = {
        x: 0,
        y: 0
      }, Y();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      nt,
      o,
      Y,
      m,
      S,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(et),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(B),
      k,
      h,
      it,
      M,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(H)
    ]
  );
}
const I0 = {
  x: {
    [te.Backward]: !1,
    [te.Forward]: !1
  },
  y: {
    [te.Backward]: !1,
    [te.Forward]: !1
  }
};
function P0(i) {
  let {
    delta: s,
    disabled: f
  } = i;
  const o = Mf(s);
  return _u((d) => {
    if (f || !o || !d)
      return I0;
    const m = {
      x: Math.sign(s.x - o.x),
      y: Math.sign(s.y - o.y)
    };
    return {
      x: {
        [te.Backward]: d.x[te.Backward] || m.x === -1,
        [te.Forward]: d.x[te.Forward] || m.x === 1
      },
      y: {
        [te.Backward]: d.y[te.Backward] || m.y === -1,
        [te.Forward]: d.y[te.Forward] || m.y === 1
      }
    };
  }, [f, s, o]);
}
function ty(i, s) {
  const f = s != null ? i.get(s) : void 0, o = f ? f.node.current : null;
  return _u((d) => {
    var m;
    return s == null ? null : (m = o ?? d) != null ? m : null;
  }, [o, s]);
}
function ey(i, s) {
  return A.useMemo(() => i.reduce((f, o) => {
    const {
      sensor: d
    } = o, m = d.activators.map((S) => ({
      eventName: S.eventName,
      handler: s(S.handler, o)
    }));
    return [...f, ...m];
  }, []), [i, s]);
}
var zu;
(function(i) {
  i[i.Always = 0] = "Always", i[i.BeforeDragging = 1] = "BeforeDragging", i[i.WhileDragging = 2] = "WhileDragging";
})(zu || (zu = {}));
var Rf;
(function(i) {
  i.Optimized = "optimized";
})(Rf || (Rf = {}));
const Ph = /* @__PURE__ */ new Map();
function ly(i, s) {
  let {
    dragging: f,
    dependencies: o,
    config: d
  } = s;
  const [m, S] = A.useState(null), {
    frequency: z,
    measure: b,
    strategy: h
  } = d, M = A.useRef(i), _ = Z(), H = xu(_), B = A.useCallback(function(W) {
    W === void 0 && (W = []), !H.current && S((et) => et === null ? W : et.concat(W.filter((K) => !et.includes(K))));
  }, [H]), k = A.useRef(null), Y = _u((W) => {
    if (_ && !f)
      return Ph;
    if (!W || W === Ph || M.current !== i || m != null) {
      const et = /* @__PURE__ */ new Map();
      for (let K of i) {
        if (!K)
          continue;
        if (m && m.length > 0 && !m.includes(K.id) && K.rect.current) {
          et.set(K.id, K.rect.current);
          continue;
        }
        const nt = K.node.current, it = nt ? new Xf(b(nt), nt) : null;
        K.rect.current = it, it && et.set(K.id, it);
      }
      return et;
    }
    return W;
  }, [i, m, f, _, b]);
  return A.useEffect(() => {
    M.current = i;
  }, [i]), A.useEffect(
    () => {
      _ || B();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, _]
  ), A.useEffect(
    () => {
      m && m.length > 0 && S(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(m)]
  ), A.useEffect(
    () => {
      _ || typeof z != "number" || k.current !== null || (k.current = setTimeout(() => {
        B(), k.current = null;
      }, z));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [z, _, B, ...o]
  ), {
    droppableRects: Y,
    measureDroppableContainers: B,
    measuringScheduled: m != null
  };
  function Z() {
    switch (h) {
      case zu.Always:
        return !1;
      case zu.BeforeDragging:
        return f;
      default:
        return !f;
    }
  }
}
function zv(i, s) {
  return _u((f) => i ? f || (typeof s == "function" ? s(i) : i) : null, [s, i]);
}
function ny(i, s) {
  return zv(i, s);
}
function ay(i) {
  let {
    callback: s,
    disabled: f
  } = i;
  const o = Bf(s), d = A.useMemo(() => {
    if (f || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: m
    } = window;
    return new m(o);
  }, [o, f]);
  return A.useEffect(() => () => d?.disconnect(), [d]), d;
}
function tc(i) {
  let {
    callback: s,
    disabled: f
  } = i;
  const o = Bf(s), d = A.useMemo(
    () => {
      if (f || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: m
      } = window;
      return new m(o);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f]
  );
  return A.useEffect(() => () => d?.disconnect(), [d]), d;
}
function uy(i) {
  return new Xf(za(i), i);
}
function tv(i, s, f) {
  s === void 0 && (s = uy);
  const [o, d] = A.useState(null);
  function m() {
    d((b) => {
      if (!i)
        return null;
      if (i.isConnected === !1) {
        var h;
        return (h = b ?? f) != null ? h : null;
      }
      const M = s(i);
      return JSON.stringify(b) === JSON.stringify(M) ? b : M;
    });
  }
  const S = ay({
    callback(b) {
      if (i)
        for (const h of b) {
          const {
            type: M,
            target: _
          } = h;
          if (M === "childList" && _ instanceof HTMLElement && _.contains(i)) {
            m();
            break;
          }
        }
    }
  }), z = tc({
    callback: m
  });
  return hl(() => {
    m(), i ? (z?.observe(i), S?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (z?.disconnect(), S?.disconnect());
  }, [i]), o;
}
function iy(i) {
  const s = zv(i);
  return vv(i, s);
}
const ev = [];
function cy(i) {
  const s = A.useRef(i), f = _u((o) => i ? o && o !== ev && i && s.current && i.parentNode === s.current.parentNode ? o : Yf(i) : ev, [i]);
  return A.useEffect(() => {
    s.current = i;
  }, [i]), f;
}
function sy(i) {
  const [s, f] = A.useState(null), o = A.useRef(i), d = A.useCallback((m) => {
    const S = Ef(m.target);
    S && f((z) => z ? (z.set(S, Cf(S)), new Map(z)) : null);
  }, []);
  return A.useEffect(() => {
    const m = o.current;
    if (i !== m) {
      S(m);
      const z = i.map((b) => {
        const h = Ef(b);
        return h ? (h.addEventListener("scroll", d, {
          passive: !0
        }), [h, Cf(h)]) : null;
      }).filter((b) => b != null);
      f(z.length ? new Map(z) : null), o.current = i;
    }
    return () => {
      S(i), S(m);
    };
    function S(z) {
      z.forEach((b) => {
        const h = Ef(b);
        h?.removeEventListener("scroll", d);
      });
    }
  }, [d, i]), A.useMemo(() => i.length ? s ? Array.from(s.values()).reduce((m, S) => Sa(m, S), al) : Sv(i) : al, [i, s]);
}
function lv(i, s) {
  s === void 0 && (s = []);
  const f = A.useRef(null);
  return A.useEffect(
    () => {
      f.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    s
  ), A.useEffect(() => {
    const o = i !== al;
    o && !f.current && (f.current = i), !o && f.current && (f.current = null);
  }, [i]), f.current ? $i(i, f.current) : al;
}
function fy(i) {
  A.useEffect(
    () => {
      if (!Pi)
        return;
      const s = i.map((f) => {
        let {
          sensor: o
        } = f;
        return o.setup == null ? void 0 : o.setup();
      });
      return () => {
        for (const f of s)
          f?.();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    i.map((s) => {
      let {
        sensor: f
      } = s;
      return f;
    })
  );
}
function oy(i, s) {
  return A.useMemo(() => i.reduce((f, o) => {
    let {
      eventName: d,
      handler: m
    } = o;
    return f[d] = (S) => {
      m(S, s);
    }, f;
  }, {}), [i, s]);
}
function Tv(i) {
  return A.useMemo(() => i ? j0(i) : null, [i]);
}
const nv = [];
function ry(i, s) {
  s === void 0 && (s = za);
  const [f] = i, o = Tv(f ? De(f) : null), [d, m] = A.useState(nv);
  function S() {
    m(() => i.length ? i.map((b) => bv(b) ? o : new Xf(s(b), b)) : nv);
  }
  const z = tc({
    callback: S
  });
  return hl(() => {
    z?.disconnect(), S(), i.forEach((b) => z?.observe(b));
  }, [i]), d;
}
function dy(i) {
  if (!i)
    return null;
  if (i.children.length > 1)
    return i;
  const s = i.children[0];
  return Tu(s) ? s : i;
}
function hy(i) {
  let {
    measure: s
  } = i;
  const [f, o] = A.useState(null), d = A.useCallback((h) => {
    for (const {
      target: M
    } of h)
      if (Tu(M)) {
        o((_) => {
          const H = s(M);
          return _ ? {
            ..._,
            width: H.width,
            height: H.height
          } : H;
        });
        break;
      }
  }, [s]), m = tc({
    callback: d
  }), S = A.useCallback((h) => {
    const M = dy(h);
    m?.disconnect(), M && m?.observe(M), o(M ? s(M) : null);
  }, [s, m]), [z, b] = ki(S);
  return A.useMemo(() => ({
    nodeRef: z,
    rect: f,
    setRef: b
  }), [f, z, b]);
}
const vy = [{
  sensor: Gf,
  options: {}
}, {
  sensor: Ev,
  options: {}
}], my = {
  current: {}
}, Ji = {
  draggable: {
    measure: $h
  },
  droppable: {
    measure: $h,
    strategy: zu.WhileDragging,
    frequency: Rf.Optimized
  },
  dragOverlay: {
    measure: za
  }
};
class Su extends Map {
  get(s) {
    var f;
    return s != null && (f = super.get(s)) != null ? f : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((s) => {
      let {
        disabled: f
      } = s;
      return !f;
    });
  }
  getNodeFor(s) {
    var f, o;
    return (f = (o = this.get(s)) == null ? void 0 : o.node.current) != null ? f : void 0;
  }
}
const gy = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new Su(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Wi
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Ji,
  measureDroppableContainers: Wi,
  windowRect: null,
  measuringScheduled: !1
}, yy = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Wi,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Wi
}, ec = /* @__PURE__ */ A.createContext(yy), _v = /* @__PURE__ */ A.createContext(gy);
function by() {
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
      containers: new Su()
    }
  };
}
function py(i, s) {
  switch (s.type) {
    case Wt.DragStart:
      return {
        ...i,
        draggable: {
          ...i.draggable,
          initialCoordinates: s.initialCoordinates,
          active: s.active
        }
      };
    case Wt.DragMove:
      return i.draggable.active == null ? i : {
        ...i,
        draggable: {
          ...i.draggable,
          translate: {
            x: s.coordinates.x - i.draggable.initialCoordinates.x,
            y: s.coordinates.y - i.draggable.initialCoordinates.y
          }
        }
      };
    case Wt.DragEnd:
    case Wt.DragCancel:
      return {
        ...i,
        draggable: {
          ...i.draggable,
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
    case Wt.RegisterDroppable: {
      const {
        element: f
      } = s, {
        id: o
      } = f, d = new Su(i.droppable.containers);
      return d.set(o, f), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: d
        }
      };
    }
    case Wt.SetDroppableDisabled: {
      const {
        id: f,
        key: o,
        disabled: d
      } = s, m = i.droppable.containers.get(f);
      if (!m || o !== m.key)
        return i;
      const S = new Su(i.droppable.containers);
      return S.set(f, {
        ...m,
        disabled: d
      }), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: S
        }
      };
    }
    case Wt.UnregisterDroppable: {
      const {
        id: f,
        key: o
      } = s, d = i.droppable.containers.get(f);
      if (!d || o !== d.key)
        return i;
      const m = new Su(i.droppable.containers);
      return m.delete(f), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: m
        }
      };
    }
    default:
      return i;
  }
}
function Sy(i) {
  let {
    disabled: s
  } = i;
  const {
    active: f,
    activatorEvent: o,
    draggableNodes: d
  } = A.useContext(ec), m = Mf(o), S = Mf(f?.id);
  return A.useEffect(() => {
    if (!s && !o && m && S != null) {
      if (!qf(m) || document.activeElement === m.target)
        return;
      const z = d.get(S);
      if (!z)
        return;
      const {
        activatorNode: b,
        node: h
      } = z;
      if (!b.current && !h.current)
        return;
      requestAnimationFrame(() => {
        for (const M of [b.current, h.current]) {
          if (!M)
            continue;
          const _ = f0(M);
          if (_) {
            _.focus();
            break;
          }
        }
      });
    }
  }, [o, s, d, S, m]), null;
}
function xy(i, s) {
  let {
    transform: f,
    ...o
  } = s;
  return i != null && i.length ? i.reduce((d, m) => m({
    transform: d,
    ...o
  }), f) : f;
}
function Ey(i) {
  return A.useMemo(
    () => ({
      draggable: {
        ...Ji.draggable,
        ...i?.draggable
      },
      droppable: {
        ...Ji.droppable,
        ...i?.droppable
      },
      dragOverlay: {
        ...Ji.dragOverlay,
        ...i?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i?.draggable, i?.droppable, i?.dragOverlay]
  );
}
function zy(i) {
  let {
    activeNode: s,
    measure: f,
    initialRect: o,
    config: d = !0
  } = i;
  const m = A.useRef(!1), {
    x: S,
    y: z
  } = typeof d == "boolean" ? {
    x: d,
    y: d
  } : d;
  hl(() => {
    if (!S && !z || !s) {
      m.current = !1;
      return;
    }
    if (m.current || !o)
      return;
    const h = s?.node.current;
    if (!h || h.isConnected === !1)
      return;
    const M = f(h), _ = vv(M, o);
    if (S || (_.x = 0), z || (_.y = 0), m.current = !0, Math.abs(_.x) > 0 || Math.abs(_.y) > 0) {
      const H = mv(h);
      H && H.scrollBy({
        top: _.y,
        left: _.x
      });
    }
  }, [s, S, z, o, f]);
}
const Av = /* @__PURE__ */ A.createContext({
  ...al,
  scaleX: 1,
  scaleY: 1
});
var fn;
(function(i) {
  i[i.Uninitialized = 0] = "Uninitialized", i[i.Initializing = 1] = "Initializing", i[i.Initialized = 2] = "Initialized";
})(fn || (fn = {}));
const Ty = /* @__PURE__ */ A.memo(function(s) {
  var f, o, d, m;
  let {
    id: S,
    accessibility: z,
    autoScroll: b = !0,
    children: h,
    sensors: M = vy,
    collisionDetection: _ = D0,
    measuring: H,
    modifiers: B,
    ...k
  } = s;
  const Y = A.useReducer(py, void 0, by), [Z, W] = Y, [et, K] = m0(), [nt, it] = A.useState(fn.Uninitialized), lt = nt === fn.Initialized, {
    draggable: {
      active: L,
      nodes: I,
      translate: pt
    },
    droppable: {
      containers: Ct
    }
  } = Z, dt = L != null ? I.get(L) : null, Ot = A.useRef({
    initial: null,
    translated: null
  }), Jt = A.useMemo(() => {
    var Bt;
    return L != null ? {
      id: L,
      // It's possible for the active node to unmount while dragging
      data: (Bt = dt?.data) != null ? Bt : my,
      rect: Ot
    } : null;
  }, [L, dt]), Gt = A.useRef(null), [ee, C] = A.useState(null), [w, J] = A.useState(null), ct = xu(k, Object.values(k)), gt = Au("DndDescribedBy", S), y = A.useMemo(() => Ct.getEnabled(), [Ct]), N = Ey(H), {
    droppableRects: q,
    measureDroppableContainers: X,
    measuringScheduled: P
  } = ly(y, {
    dragging: lt,
    dependencies: [pt.x, pt.y],
    config: N.droppable
  }), F = ty(I, L), ht = A.useMemo(() => w ? Of(w) : null, [w]), Ut = jn(), St = ny(F, N.draggable.measure);
  zy({
    activeNode: L != null ? I.get(L) : null,
    config: Ut.layoutShiftCompensation,
    initialRect: St,
    measure: N.draggable.measure
  });
  const mt = tv(F, N.draggable.measure, St), ul = tv(F ? F.parentElement : null), me = A.useRef({
    activatorEvent: null,
    active: null,
    activeNode: F,
    collisionRect: null,
    collisions: null,
    droppableRects: q,
    draggableNodes: I,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: Ct,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), ml = Ct.getNodeFor((f = me.current.over) == null ? void 0 : f.id), le = hy({
    measure: N.dragOverlay.measure
  }), il = (o = le.nodeRef.current) != null ? o : F, cl = lt ? (d = le.rect) != null ? d : mt : null, Du = !!(le.nodeRef.current && le.rect), Ta = iy(Du ? null : mt), rn = Tv(il ? De(il) : null), we = cy(lt ? ml ?? F : null), Bl = ry(we), Rn = xy(B, {
    transform: {
      x: pt.x - Ta.x,
      y: pt.y - Ta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: w,
    active: Jt,
    activeNodeRect: mt,
    containerNodeRect: ul,
    draggingNodeRect: cl,
    over: me.current.over,
    overlayNodeRect: le.rect,
    scrollableAncestors: we,
    scrollableAncestorRects: Bl,
    windowRect: rn
  }), Mu = ht ? Sa(ht, pt) : null, fe = sy(we), lc = lv(fe), Ou = lv(fe, [mt]), gl = Sa(Rn, lc), Ie = cl ? C0(cl, Rn) : null, dn = Jt && Ie ? _({
    active: Jt,
    collisionRect: Ie,
    droppableRects: q,
    droppableContainers: y,
    pointerCoordinates: Mu
  }) : null, _a = T0(dn, "id"), [sl, Cu] = A.useState(null), hn = Du ? Rn : Sa(Rn, Ou), he = M0(hn, (m = sl?.rect) != null ? m : null, mt), Be = A.useRef(null), oe = A.useCallback(
    (Bt, qt) => {
      let {
        sensor: Ft,
        options: ge
      } = qt;
      if (Gt.current == null)
        return;
      const ye = I.get(Gt.current);
      if (!ye)
        return;
      const re = Bt.nativeEvent, be = new Ft({
        active: Gt.current,
        activeNode: ye,
        event: re,
        options: ge,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: me,
        onAbort(kt) {
          if (!I.get(kt))
            return;
          const {
            onDragAbort: Me
          } = ct.current, Ye = {
            id: kt
          };
          Me?.(Ye), et({
            type: "onDragAbort",
            event: Ye
          });
        },
        onPending(kt, Pe, Me, Ye) {
          if (!I.get(kt))
            return;
          const {
            onDragPending: bl
          } = ct.current, tl = {
            id: kt,
            constraint: Pe,
            initialCoordinates: Me,
            offset: Ye
          };
          bl?.(tl), et({
            type: "onDragPending",
            event: tl
          });
        },
        onStart(kt) {
          const Pe = Gt.current;
          if (Pe == null)
            return;
          const Me = I.get(Pe);
          if (!Me)
            return;
          const {
            onDragStart: Ye
          } = ct.current, yl = {
            activatorEvent: re,
            active: {
              id: Pe,
              data: Me.data,
              rect: Ot
            }
          };
          yu.unstable_batchedUpdates(() => {
            Ye?.(yl), it(fn.Initializing), W({
              type: Wt.DragStart,
              initialCoordinates: kt,
              active: Pe
            }), et({
              type: "onDragStart",
              event: yl
            }), C(Be.current), J(re);
          });
        },
        onMove(kt) {
          W({
            type: Wt.DragMove,
            coordinates: kt
          });
        },
        onEnd: qe(Wt.DragEnd),
        onCancel: qe(Wt.DragCancel)
      });
      Be.current = be;
      function qe(kt) {
        return async function() {
          const {
            active: Me,
            collisions: Ye,
            over: yl,
            scrollAdjustedTranslate: bl
          } = me.current;
          let tl = null;
          if (Me && bl) {
            const {
              cancelDrop: ql
            } = ct.current;
            tl = {
              activatorEvent: re,
              active: Me,
              collisions: Ye,
              delta: bl,
              over: yl
            }, kt === Wt.DragEnd && typeof ql == "function" && await Promise.resolve(ql(tl)) && (kt = Wt.DragCancel);
          }
          Gt.current = null, yu.unstable_batchedUpdates(() => {
            W({
              type: kt
            }), it(fn.Uninitialized), Cu(null), C(null), J(null), Be.current = null;
            const ql = kt === Wt.DragEnd ? "onDragEnd" : "onDragCancel";
            if (tl) {
              const Xe = ct.current[ql];
              Xe?.(tl), et({
                type: ql,
                event: tl
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [I]
  ), nc = A.useCallback((Bt, qt) => (Ft, ge) => {
    const ye = Ft.nativeEvent, re = I.get(ge);
    if (
      // Another sensor is already instantiating
      Gt.current !== null || // No active draggable
      !re || // Event has already been captured
      ye.dndKit || ye.defaultPrevented
    )
      return;
    const be = {
      active: re
    };
    Bt(Ft, qt.options, be) === !0 && (ye.dndKit = {
      capturedBy: qt.sensor
    }, Gt.current = ge, oe(Ft, qt));
  }, [I, oe]), Nu = ey(M, nc);
  fy(M), hl(() => {
    mt && nt === fn.Initializing && it(fn.Initialized);
  }, [mt, nt]), A.useEffect(
    () => {
      const {
        onDragMove: Bt
      } = ct.current, {
        active: qt,
        activatorEvent: Ft,
        collisions: ge,
        over: ye
      } = me.current;
      if (!qt || !Ft)
        return;
      const re = {
        active: qt,
        activatorEvent: Ft,
        collisions: ge,
        delta: {
          x: gl.x,
          y: gl.y
        },
        over: ye
      };
      yu.unstable_batchedUpdates(() => {
        Bt?.(re), et({
          type: "onDragMove",
          event: re
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gl.x, gl.y]
  ), A.useEffect(
    () => {
      const {
        active: Bt,
        activatorEvent: qt,
        collisions: Ft,
        droppableContainers: ge,
        scrollAdjustedTranslate: ye
      } = me.current;
      if (!Bt || Gt.current == null || !qt || !ye)
        return;
      const {
        onDragOver: re
      } = ct.current, be = ge.get(_a), qe = be && be.rect.current ? {
        id: be.id,
        rect: be.rect.current,
        data: be.data,
        disabled: be.disabled
      } : null, kt = {
        active: Bt,
        activatorEvent: qt,
        collisions: Ft,
        delta: {
          x: ye.x,
          y: ye.y
        },
        over: qe
      };
      yu.unstable_batchedUpdates(() => {
        Cu(qe), re?.(kt), et({
          type: "onDragOver",
          event: kt
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_a]
  ), hl(() => {
    me.current = {
      activatorEvent: w,
      active: Jt,
      activeNode: F,
      collisionRect: Ie,
      collisions: dn,
      droppableRects: q,
      draggableNodes: I,
      draggingNode: il,
      draggingNodeRect: cl,
      droppableContainers: Ct,
      over: sl,
      scrollableAncestors: we,
      scrollAdjustedTranslate: gl
    }, Ot.current = {
      initial: cl,
      translated: Ie
    };
  }, [Jt, F, dn, Ie, I, il, cl, q, Ct, sl, we, gl]), F0({
    ...Ut,
    delta: pt,
    draggingRect: Ie,
    pointerCoordinates: Mu,
    scrollableAncestors: we,
    scrollableAncestorRects: Bl
  });
  const ac = A.useMemo(() => ({
    active: Jt,
    activeNode: F,
    activeNodeRect: mt,
    activatorEvent: w,
    collisions: dn,
    containerNodeRect: ul,
    dragOverlay: le,
    draggableNodes: I,
    droppableContainers: Ct,
    droppableRects: q,
    over: sl,
    measureDroppableContainers: X,
    scrollableAncestors: we,
    scrollableAncestorRects: Bl,
    measuringConfiguration: N,
    measuringScheduled: P,
    windowRect: rn
  }), [Jt, F, mt, w, dn, ul, le, I, Ct, q, sl, X, we, Bl, N, P, rn]), Un = A.useMemo(() => ({
    activatorEvent: w,
    activators: Nu,
    active: Jt,
    activeNodeRect: mt,
    ariaDescribedById: {
      draggable: gt
    },
    dispatch: W,
    draggableNodes: I,
    over: sl,
    measureDroppableContainers: X
  }), [w, Nu, Jt, mt, W, gt, I, sl, X]);
  return Ae.createElement(hv.Provider, {
    value: K
  }, Ae.createElement(ec.Provider, {
    value: Un
  }, Ae.createElement(_v.Provider, {
    value: ac
  }, Ae.createElement(Av.Provider, {
    value: he
  }, h)), Ae.createElement(Sy, {
    disabled: z?.restoreFocus === !1
  })), Ae.createElement(b0, {
    ...z,
    hiddenTextDescribedById: gt
  }));
  function jn() {
    const Bt = ee?.autoScrollEnabled === !1, qt = typeof b == "object" ? b.enabled === !1 : b === !1, Ft = lt && !Bt && !qt;
    return typeof b == "object" ? {
      ...b,
      enabled: Ft
    } : {
      enabled: Ft
    };
  }
}), _y = /* @__PURE__ */ A.createContext(null), av = "button", Ay = "Draggable";
function Dy(i) {
  let {
    id: s,
    data: f,
    disabled: o = !1,
    attributes: d
  } = i;
  const m = Au(Ay), {
    activators: S,
    activatorEvent: z,
    active: b,
    activeNodeRect: h,
    ariaDescribedById: M,
    draggableNodes: _,
    over: H
  } = A.useContext(ec), {
    role: B = av,
    roleDescription: k = "draggable",
    tabIndex: Y = 0
  } = d ?? {}, Z = b?.id === s, W = A.useContext(Z ? Av : _y), [et, K] = ki(), [nt, it] = ki(), lt = oy(S, s), L = xu(f);
  hl(
    () => (_.set(s, {
      id: s,
      key: m,
      node: et,
      activatorNode: nt,
      data: L
    }), () => {
      const pt = _.get(s);
      pt && pt.key === m && _.delete(s);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_, s]
  );
  const I = A.useMemo(() => ({
    role: B,
    tabIndex: Y,
    "aria-disabled": o,
    "aria-pressed": Z && B === av ? !0 : void 0,
    "aria-roledescription": k,
    "aria-describedby": M.draggable
  }), [o, B, Y, Z, k, M.draggable]);
  return {
    active: b,
    activatorEvent: z,
    activeNodeRect: h,
    attributes: I,
    isDragging: Z,
    listeners: o ? void 0 : lt,
    node: et,
    over: H,
    setNodeRef: K,
    setActivatorNodeRef: it,
    transform: W
  };
}
function My() {
  return A.useContext(_v);
}
const Oy = "Droppable", Cy = {
  timeout: 25
};
function Ny(i) {
  let {
    data: s,
    disabled: f = !1,
    id: o,
    resizeObserverConfig: d
  } = i;
  const m = Au(Oy), {
    active: S,
    dispatch: z,
    over: b,
    measureDroppableContainers: h
  } = A.useContext(ec), M = A.useRef({
    disabled: f
  }), _ = A.useRef(!1), H = A.useRef(null), B = A.useRef(null), {
    disabled: k,
    updateMeasurementsFor: Y,
    timeout: Z
  } = {
    ...Cy,
    ...d
  }, W = xu(Y ?? o), et = A.useCallback(
    () => {
      if (!_.current) {
        _.current = !0;
        return;
      }
      B.current != null && clearTimeout(B.current), B.current = setTimeout(() => {
        h(Array.isArray(W.current) ? W.current : [W.current]), B.current = null;
      }, Z);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [Z]
  ), K = tc({
    callback: et,
    disabled: k || !S
  }), nt = A.useCallback((I, pt) => {
    K && (pt && (K.unobserve(pt), _.current = !1), I && K.observe(I));
  }, [K]), [it, lt] = ki(nt), L = xu(s);
  return A.useEffect(() => {
    !K || !it.current || (K.disconnect(), _.current = !1, K.observe(it.current));
  }, [it, K]), A.useEffect(
    () => (z({
      type: Wt.RegisterDroppable,
      element: {
        id: o,
        key: m,
        disabled: f,
        node: it,
        rect: H,
        data: L
      }
    }), () => z({
      type: Wt.UnregisterDroppable,
      key: m,
      id: o
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o]
  ), A.useEffect(() => {
    f !== M.current.disabled && (z({
      type: Wt.SetDroppableDisabled,
      id: o,
      key: m,
      disabled: f
    }), M.current.disabled = f);
  }, [o, m, f, z]), {
    active: S,
    rect: H,
    isOver: b?.id === o,
    node: it,
    over: b,
    setNodeRef: lt
  };
}
function Qf(i, s, f) {
  const o = i.slice();
  return o.splice(f < 0 ? o.length + f : f, 0, o.splice(s, 1)[0]), o;
}
function Ry(i, s) {
  return i.reduce((f, o, d) => {
    const m = s.get(o);
    return m && (f[d] = m), f;
  }, Array(i.length));
}
function Vi(i) {
  return i !== null && i >= 0;
}
function Uy(i, s) {
  if (i === s)
    return !0;
  if (i.length !== s.length)
    return !1;
  for (let f = 0; f < i.length; f++)
    if (i[f] !== s[f])
      return !1;
  return !0;
}
function jy(i) {
  return typeof i == "boolean" ? {
    draggable: i,
    droppable: i
  } : i;
}
const Zf = (i) => {
  let {
    rects: s,
    activeIndex: f,
    overIndex: o,
    index: d
  } = i;
  const m = Qf(s, o, f), S = s[d], z = m[d];
  return !z || !S ? null : {
    x: z.left - S.left,
    y: z.top - S.top,
    scaleX: z.width / S.width,
    scaleY: z.height / S.height
  };
}, Dv = "Sortable", Mv = /* @__PURE__ */ Ae.createContext({
  activeIndex: -1,
  containerId: Dv,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Zf,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function Hy(i) {
  let {
    children: s,
    id: f,
    items: o,
    strategy: d = Zf,
    disabled: m = !1
  } = i;
  const {
    active: S,
    dragOverlay: z,
    droppableRects: b,
    over: h,
    measureDroppableContainers: M
  } = My(), _ = Au(Dv, f), H = z.rect !== null, B = A.useMemo(() => o.map((lt) => typeof lt == "object" && "id" in lt ? lt.id : lt), [o]), k = S != null, Y = S ? B.indexOf(S.id) : -1, Z = h ? B.indexOf(h.id) : -1, W = A.useRef(B), et = !Uy(B, W.current), K = Z !== -1 && Y === -1 || et, nt = jy(m);
  hl(() => {
    et && k && M(B);
  }, [et, B, k, M]), A.useEffect(() => {
    W.current = B;
  }, [B]);
  const it = A.useMemo(
    () => ({
      activeIndex: Y,
      containerId: _,
      disabled: nt,
      disableTransforms: K,
      items: B,
      overIndex: Z,
      useDragOverlay: H,
      sortedRects: Ry(B, b),
      strategy: d
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Y, _, nt.draggable, nt.droppable, K, B, Z, b, H, d]
  );
  return Ae.createElement(Mv.Provider, {
    value: it
  }, s);
}
const wy = (i) => {
  let {
    id: s,
    items: f,
    activeIndex: o,
    overIndex: d
  } = i;
  return Qf(f, o, d).indexOf(s);
}, By = (i) => {
  let {
    containerId: s,
    isSorting: f,
    wasDragging: o,
    index: d,
    items: m,
    newIndex: S,
    previousItems: z,
    previousContainerId: b,
    transition: h
  } = i;
  return !h || !o || z !== m && d === S ? !1 : f ? !0 : S !== d && s === b;
}, qy = {
  duration: 200,
  easing: "ease"
}, Ov = "transform", Yy = /* @__PURE__ */ Eu.Transition.toString({
  property: Ov,
  duration: 0,
  easing: "linear"
}), Xy = {
  roleDescription: "sortable"
};
function Ly(i) {
  let {
    disabled: s,
    index: f,
    node: o,
    rect: d
  } = i;
  const [m, S] = A.useState(null), z = A.useRef(f);
  return hl(() => {
    if (!s && f !== z.current && o.current) {
      const b = d.current;
      if (b) {
        const h = za(o.current, {
          ignoreTransform: !0
        }), M = {
          x: b.left - h.left,
          y: b.top - h.top,
          scaleX: b.width / h.width,
          scaleY: b.height / h.height
        };
        (M.x || M.y) && S(M);
      }
    }
    f !== z.current && (z.current = f);
  }, [s, f, o, d]), A.useEffect(() => {
    m && S(null);
  }, [m]), m;
}
function Gy(i) {
  let {
    animateLayoutChanges: s = By,
    attributes: f,
    disabled: o,
    data: d,
    getNewIndex: m = wy,
    id: S,
    strategy: z,
    resizeObserverConfig: b,
    transition: h = qy
  } = i;
  const {
    items: M,
    containerId: _,
    activeIndex: H,
    disabled: B,
    disableTransforms: k,
    sortedRects: Y,
    overIndex: Z,
    useDragOverlay: W,
    strategy: et
  } = A.useContext(Mv), K = Qy(o, B), nt = M.indexOf(S), it = A.useMemo(() => ({
    sortable: {
      containerId: _,
      index: nt,
      items: M
    },
    ...d
  }), [_, d, nt, M]), lt = A.useMemo(() => M.slice(M.indexOf(S)), [M, S]), {
    rect: L,
    node: I,
    isOver: pt,
    setNodeRef: Ct
  } = Ny({
    id: S,
    data: it,
    disabled: K.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: lt,
      ...b
    }
  }), {
    active: dt,
    activatorEvent: Ot,
    activeNodeRect: Jt,
    attributes: Gt,
    setNodeRef: ee,
    listeners: C,
    isDragging: w,
    over: J,
    setActivatorNodeRef: ct,
    transform: gt
  } = Dy({
    id: S,
    data: it,
    attributes: {
      ...Xy,
      ...f
    },
    disabled: K.draggable
  }), y = u0(Ct, ee), N = !!dt, q = N && !k && Vi(H) && Vi(Z), X = !W && w, P = X && q ? gt : null, ht = q ? P ?? (z ?? et)({
    rects: Y,
    activeNodeRect: Jt,
    activeIndex: H,
    overIndex: Z,
    index: nt
  }) : null, Ut = Vi(H) && Vi(Z) ? m({
    id: S,
    items: M,
    activeIndex: H,
    overIndex: Z
  }) : nt, St = dt?.id, mt = A.useRef({
    activeId: St,
    items: M,
    newIndex: Ut,
    containerId: _
  }), ul = M !== mt.current.items, me = s({
    active: dt,
    containerId: _,
    isDragging: w,
    isSorting: N,
    id: S,
    index: nt,
    items: M,
    newIndex: mt.current.newIndex,
    previousItems: mt.current.items,
    previousContainerId: mt.current.containerId,
    transition: h,
    wasDragging: mt.current.activeId != null
  }), ml = Ly({
    disabled: !me,
    index: nt,
    node: I,
    rect: L
  });
  return A.useEffect(() => {
    N && mt.current.newIndex !== Ut && (mt.current.newIndex = Ut), _ !== mt.current.containerId && (mt.current.containerId = _), M !== mt.current.items && (mt.current.items = M);
  }, [N, Ut, _, M]), A.useEffect(() => {
    if (St === mt.current.activeId)
      return;
    if (St != null && mt.current.activeId == null) {
      mt.current.activeId = St;
      return;
    }
    const il = setTimeout(() => {
      mt.current.activeId = St;
    }, 50);
    return () => clearTimeout(il);
  }, [St]), {
    active: dt,
    activeIndex: H,
    attributes: Gt,
    data: it,
    rect: L,
    index: nt,
    newIndex: Ut,
    items: M,
    isOver: pt,
    isSorting: N,
    isDragging: w,
    listeners: C,
    node: I,
    overIndex: Z,
    over: J,
    setNodeRef: y,
    setActivatorNodeRef: ct,
    setDroppableNodeRef: Ct,
    setDraggableNodeRef: ee,
    transform: ml ?? ht,
    transition: le()
  };
  function le() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      ml || // Or to prevent items jumping to back to their "new" position when items change
      ul && mt.current.newIndex === nt
    )
      return Yy;
    if (!(X && !qf(Ot) || !h) && (N || me))
      return Eu.Transition.toString({
        ...h,
        property: Ov
      });
  }
}
function Qy(i, s) {
  var f, o;
  return typeof i == "boolean" ? {
    draggable: i,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (f = i?.draggable) != null ? f : s.draggable,
    droppable: (o = i?.droppable) != null ? o : s.droppable
  };
}
Et.Down, Et.Right, Et.Up, Et.Left;
const Cv = A.createContext(null);
function Zy({ hass: i, children: s }) {
  return /* @__PURE__ */ O.jsx(Cv.Provider, { value: i, children: s });
}
function vl() {
  const i = A.useContext(Cv);
  if (!i) throw new Error("useHass must be used inside a <HassProvider>");
  return i;
}
function Nn(i) {
  return i.split(".")[0];
}
function Lt(i) {
  return i.attributes.friendly_name || i.entity_id;
}
function Vf(i) {
  return i.replace(/_/g, " ").replace(/^\w/, (s) => s.toUpperCase());
}
function uv(i) {
  return Math.abs(i) >= 100 ? Math.round(i).toString() : i.toFixed(1).replace(/\.0$/, "");
}
function Vy(i, s, f) {
  return Math.min(f, Math.max(s, i));
}
function pa(i, s) {
  const f = i.attributes.supported_features;
  return f != null && (f & s) === s;
}
function Uf() {
  return crypto.randomUUID();
}
const Ky = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor"]), iv = ["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor"];
function Nv(i) {
  return Nn(i) === "media_player" ? 2 : 1;
}
function Jy(i) {
  const s = Object.values(i).filter((o) => {
    const d = Nn(o.entity_id);
    return !(!Ky.has(d) || d === "sensor" && !o.attributes.unit_of_measurement);
  });
  s.sort((o, d) => {
    const m = iv.indexOf(Nn(o.entity_id)), S = iv.indexOf(Nn(d.entity_id));
    return m - S || Lt(o).localeCompare(Lt(d));
  });
  const f = s.map((o) => ({ id: Uf(), entityId: o.entity_id, size: Nv(o.entity_id) }));
  return { version: 1, views: [{ id: Uf(), title: "Home", cards: f }] };
}
const Ii = "simui:dashboard:v1";
async function ky(i) {
  const s = i.connection;
  if (s)
    try {
      const f = await s.sendMessagePromise({ type: "frontend/get_user_data", key: Ii });
      if (f && f.value) return f.value;
    } catch {
    }
  try {
    const f = localStorage.getItem(Ii);
    if (f) return JSON.parse(f);
  } catch {
  }
  return null;
}
async function $y(i, s) {
  try {
    localStorage.setItem(Ii, JSON.stringify(s));
  } catch {
  }
  const f = i.connection;
  if (f)
    try {
      await f.sendMessagePromise({ type: "frontend/set_user_data", key: Ii, value: s });
    } catch {
    }
}
const Rv = A.createContext(null);
function Wy() {
  const i = A.useContext(Rv);
  if (!i) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return i;
}
function Fy({ children: i }) {
  const s = vl(), f = A.useRef(s);
  f.current = s;
  const [o, d] = A.useState(null), [m, S] = A.useState(!1), z = A.useRef(!1);
  A.useEffect(() => {
    let M = !0;
    return (async () => {
      const H = await ky(f.current) ?? Jy(f.current.states);
      M && (d(H), z.current = !0);
    })(), () => {
      M = !1;
    };
  }, []), A.useEffect(() => {
    !z.current || !o || $y(f.current, o);
  }, [o]);
  const b = (M) => {
    d((_) => {
      if (!_) return _;
      const [H, ...B] = _.views;
      return { ..._, views: [{ ...H, cards: M(H.cards) }, ...B] };
    });
  }, h = {
    config: o,
    editing: m,
    setEditing: S,
    reorder: (M, _) => b((H) => Qf(H, M, _)),
    addCard: (M) => b((_) => [..._, { id: Uf(), entityId: M, size: Nv(M) }]),
    removeCard: (M) => b((_) => _.filter((H) => H.id !== M)),
    setCardSize: (M, _) => b((H) => H.map((B) => B.id === M ? { ...B, size: _ } : B))
  };
  return /* @__PURE__ */ O.jsx(Rv.Provider, { value: h, children: i });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uv = (...i) => i.filter((s, f, o) => !!s && s.trim() !== "" && o.indexOf(s) === f).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iy = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Py = (i) => i.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, f, o) => o ? o.toUpperCase() : f.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cv = (i) => {
  const s = Py(i);
  return s.charAt(0).toUpperCase() + s.slice(1);
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var _f = {
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
const t1 = (i) => {
  for (const s in i)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
  return !1;
}, e1 = A.createContext({}), l1 = () => A.useContext(e1), n1 = A.forwardRef(
  ({ color: i, size: s, strokeWidth: f, absoluteStrokeWidth: o, className: d = "", children: m, iconNode: S, ...z }, b) => {
    const {
      size: h = 24,
      strokeWidth: M = 2,
      absoluteStrokeWidth: _ = !1,
      color: H = "currentColor",
      className: B = ""
    } = l1() ?? {}, k = o ?? _ ? Number(f ?? M) * 24 / Number(s ?? h) : f ?? M;
    return A.createElement(
      "svg",
      {
        ref: b,
        ..._f,
        width: s ?? h ?? _f.width,
        height: s ?? h ?? _f.height,
        stroke: i ?? H,
        strokeWidth: k,
        className: Uv("lucide", B, d),
        ...!m && !t1(z) && { "aria-hidden": "true" },
        ...z
      },
      [
        ...S.map(([Y, Z]) => A.createElement(Y, Z)),
        ...Array.isArray(m) ? m : [m]
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
const se = (i, s) => {
  const f = A.forwardRef(
    ({ className: o, ...d }, m) => A.createElement(n1, {
      ref: m,
      iconNode: s,
      className: Uv(
        `lucide-${Iy(cv(i))}`,
        `lucide-${i}`,
        o
      ),
      ...d
    })
  );
  return f.displayName = cv(i), f;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], u1 = se("check", a1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], c1 = se("chevron-down", i1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], f1 = se("chevron-up", s1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o1 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], r1 = se("lightbulb", o1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], h1 = se("lock-open", d1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], m1 = se("lock", v1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g1 = [["path", { d: "M5 12h14", key: "1ays0h" }]], y1 = se("minus", g1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b1 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], p1 = se("pause", b1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], x1 = se("pencil", S1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], sv = se("play", E1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], jv = se("plus", z1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T1 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], _1 = se("power", T1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A1 = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], D1 = se("skip-back", A1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M1 = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], O1 = se("skip-forward", M1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], N1 = se("square", C1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R1 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], Hv = se("thermometer", R1);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], j1 = se("x", U1);
function on({ children: i, active: s, onClick: f, className: o = "", style: d }) {
  const m = f ? (S) => {
    (S.key === "Enter" || S.key === " ") && (S.preventDefault(), f());
  } : void 0;
  return /* @__PURE__ */ O.jsx(
    "div",
    {
      className: [
        "simui-tile",
        s ? "is-active" : "",
        f ? "is-clickable" : "",
        o
      ].filter(Boolean).join(" "),
      onClick: f,
      onKeyDown: m,
      role: f ? "button" : void 0,
      tabIndex: f ? 0 : void 0,
      style: d,
      children: i
    }
  );
}
const H1 = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, w1 = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function B1({ entity: i }) {
  const { callService: s } = vl(), f = i.attributes, o = f.hvac_action, d = f.current_temperature, m = f.temperature, S = f.target_temp_low, z = f.target_temp_high, b = f.target_temp_step ?? 0.5, h = f.min_temp ?? 7, M = f.max_temp ?? 35, _ = o && H1[o] || w1[i.state] || "", H = (B) => {
    if (m == null) return;
    const k = Vy(Math.round((m + B) / b) * b, h, M);
    s("climate", "set_temperature", { temperature: k }, { entity_id: i.entity_id });
  };
  return /* @__PURE__ */ O.jsxs(on, { children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsx("span", { className: `simui-ic ${_}`, children: /* @__PURE__ */ O.jsx(Hv, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsxs("span", { className: "simui-big", children: [
        d != null ? Math.round(d) : "—",
        /* @__PURE__ */ O.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      m != null ? /* @__PURE__ */ O.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ O.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => H(-b), children: /* @__PURE__ */ O.jsx(y1, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ O.jsxs("span", { className: "simui-target", children: [
          Af(m),
          "°"
        ] }),
        /* @__PURE__ */ O.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => H(b), children: /* @__PURE__ */ O.jsx(jv, { size: 14, strokeWidth: 2.5 }) })
      ] }) : S != null && z != null ? /* @__PURE__ */ O.jsxs("span", { className: "simui-target", children: [
        Af(S),
        "–",
        Af(z),
        "°"
      ] }) : null
    ] })
  ] });
}
function Af(i) {
  return Number.isInteger(i) ? `${i}` : i.toFixed(1);
}
const Ki = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function q1({ entity: i }) {
  const { callService: s } = vl(), f = i.attributes.current_position, o = i.state === "open" || f != null && f > 0, d = pa(i, Ki.SET_POSITION) && f != null, m = (z, b) => void s("cover", z, b, { entity_id: i.entity_id }), S = d ? { background: `linear-gradient(to right, var(--accent) ${f}%, var(--faint) ${f}%)` } : void 0;
  return /* @__PURE__ */ O.jsxs(on, { className: o ? "is-on" : "", children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-value", children: f != null ? `${f}%` : Vf(i.state) })
    ] }),
    d ? /* @__PURE__ */ O.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: f,
        "aria-label": "Position",
        style: S,
        onChange: (z) => m("set_cover_position", { position: Number(z.target.value) })
      }
    ) : /* @__PURE__ */ O.jsxs("div", { className: "simui-controls", children: [
      pa(i, Ki.OPEN) && /* @__PURE__ */ O.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => m("open_cover"), children: /* @__PURE__ */ O.jsx(f1, { size: 15, strokeWidth: 2 }) }),
      pa(i, Ki.STOP) && /* @__PURE__ */ O.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => m("stop_cover"), children: /* @__PURE__ */ O.jsx(N1, { size: 12, strokeWidth: 2 }) }),
      pa(i, Ki.CLOSE) && /* @__PURE__ */ O.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => m("close_cover"), children: /* @__PURE__ */ O.jsx(c1, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const Y1 = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function X1({ entity: i }) {
  const { callService: s } = vl(), f = Nn(i.entity_id), o = i.state === "on" || i.state === "off", d = i.state === "on", m = Y1.has(f) && o, S = i.attributes.unit_of_measurement ?? "", z = m ? () => void s("homeassistant", d ? "turn_off" : "turn_on", {}, { entity_id: i.entity_id }) : void 0;
  return /* @__PURE__ */ O.jsxs(on, { onClick: z, className: m && d ? "is-on" : "", children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      m && /* @__PURE__ */ O.jsx("span", { className: `simui-ic${d ? " cool" : ""}`, children: /* @__PURE__ */ O.jsx(_1, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) })
    ] }),
    /* @__PURE__ */ O.jsxs("span", { className: "simui-state", children: [
      Vf(i.state),
      S ? ` ${S}` : ""
    ] })
  ] });
}
function L1({ entity: i }) {
  const { callService: s } = vl(), f = i.state === "on", o = i.attributes.brightness ?? 0, d = f ? Math.max(1, Math.round(o / 255 * 100)) : 0, m = () => void s("light", f ? "turn_off" : "turn_on", {}, { entity_id: i.entity_id }), S = (h) => void s("light", "turn_on", { brightness_pct: Number(h.target.value) }, { entity_id: i.entity_id }), b = { background: `linear-gradient(to right, ${f ? "var(--warm)" : "var(--faint)"} ${d}%, var(--faint) ${d}%)` };
  return /* @__PURE__ */ O.jsxs(on, { onClick: m, className: f ? "is-lit" : "", children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsx("span", { className: `simui-ic${f ? " warm" : ""}`, children: /* @__PURE__ */ O.jsx(r1, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ O.jsx("span", { className: `simui-pct${f ? " on" : ""}`, children: f ? `${d}%` : "Off" })
    ] }),
    /* @__PURE__ */ O.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: d,
        "aria-label": `${Lt(i)} brightness`,
        style: b,
        onClick: (h) => h.stopPropagation(),
        onChange: S
      }
    )
  ] });
}
function G1({ entity: i }) {
  const { callService: s } = vl(), f = i.state === "locked", o = () => void s("lock", f ? "unlock" : "lock", {}, { entity_id: i.entity_id });
  return /* @__PURE__ */ O.jsxs(on, { onClick: o, className: f ? "" : "is-unlocked", children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsx("span", { className: `simui-ic${f ? "" : " amber"}`, children: f ? /* @__PURE__ */ O.jsx(m1, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ O.jsx(h1, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) })
    ] }),
    /* @__PURE__ */ O.jsx("span", { className: `simui-state${f ? "" : " warn"}`, children: f ? "Locked" : "Unlocked" })
  ] });
}
const fv = { PREV: 16, NEXT: 32 };
function Q1({ entity: i }) {
  const { callService: s } = vl(), f = i.attributes, o = i.state, d = o === "playing", m = f.media_title, S = f.media_artist ?? f.media_album_name ?? f.app_name, z = f.entity_picture, b = !!m, h = (M) => void s("media_player", M, void 0, { entity_id: i.entity_id });
  return b ? /* @__PURE__ */ O.jsx(on, { children: /* @__PURE__ */ O.jsxs("div", { className: "simui-np", children: [
    z ? /* @__PURE__ */ O.jsx("img", { className: "simui-art", src: z, alt: "" }) : /* @__PURE__ */ O.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ O.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ O.jsx("span", { className: "simui-title", title: m, children: m }),
      S && /* @__PURE__ */ O.jsx("span", { className: "simui-artist", title: S, children: S })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: "simui-tp", children: [
      pa(i, fv.PREV) && /* @__PURE__ */ O.jsx("button", { "aria-label": "Previous", onClick: () => h("media_previous_track"), children: /* @__PURE__ */ O.jsx(D1, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ O.jsx("button", { className: "play", "aria-label": d ? "Pause" : "Play", onClick: () => h("media_play_pause"), children: d ? /* @__PURE__ */ O.jsx(p1, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ O.jsx(sv, { size: 15, fill: "currentColor" }) }),
      pa(i, fv.NEXT) && /* @__PURE__ */ O.jsx("button", { "aria-label": "Next", onClick: () => h("media_next_track"), children: /* @__PURE__ */ O.jsx(O1, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ O.jsxs(on, { children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-state", children: Vf(o) })
    ] }),
    /* @__PURE__ */ O.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ O.jsx("button", { className: "play", "aria-label": "Play", onClick: () => h("media_play_pause"), children: /* @__PURE__ */ O.jsx(sv, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function Z1({ values: i, width: s = 116, height: f = 26 }) {
  if (i.length < 2) return null;
  const o = Math.min(...i), m = Math.max(...i) - o || 1, S = s / (i.length - 1), z = i.map((b, h) => `${(h * S).toFixed(1)},${(f - (b - o) / m * f).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ O.jsx(
    "svg",
    {
      className: "simui-spark",
      width: s,
      height: f,
      viewBox: `0 0 ${s} ${f}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ O.jsx(
        "polyline",
        {
          points: z,
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
const Df = /* @__PURE__ */ new Map(), V1 = 40;
function K1({ entity: i }) {
  const s = i.attributes, f = s.unit_of_measurement ?? "", o = s.device_class === "temperature", d = Number(i.state), m = i.state !== "" && !Number.isNaN(d), S = A.useRef(""), [, z] = A.useState(0);
  A.useEffect(() => {
    if (!m || S.current === i.state) return;
    S.current = i.state;
    const H = Df.get(i.entity_id) ?? [];
    for (H.push(d); H.length > V1; ) H.shift();
    Df.set(i.entity_id, H), z((B) => B + 1);
  }, [i.entity_id, i.state, m, d]);
  const b = Df.get(i.entity_id) ?? [], h = b.length > 1 ? d - b[0] : 0, M = m && Math.abs(h) >= 0.05, _ = o ? "°" : "";
  return /* @__PURE__ */ O.jsxs(on, { children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", children: [
      o && /* @__PURE__ */ O.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ O.jsx(Hv, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: Lt(i), children: Lt(i) }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      M && /* @__PURE__ */ O.jsxs("span", { className: `simui-delta ${h > 0 ? "up" : "down"}`, children: [
        h > 0 ? "▲" : "▼",
        " ",
        uv(Math.abs(h)),
        _
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ O.jsxs("span", { className: "simui-big", children: [
        m ? uv(d) : i.state,
        f ? /* @__PURE__ */ O.jsxs("span", { className: "simui-unit", children: [
          " ",
          f
        ] }) : null
      ] }),
      m && b.length > 1 && /* @__PURE__ */ O.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ O.jsx(Z1, { values: b, width: 64, height: 22 }) })
    ] })
  ] });
}
const J1 = {
  light: L1,
  sensor: K1,
  climate: B1,
  media_player: Q1,
  cover: q1,
  lock: G1
};
function k1(i) {
  return J1[i] ?? X1;
}
function $1({ card: i, editing: s, onRemove: f, onResize: o }) {
  const { states: d } = vl(), m = d[i.entityId], { attributes: S, listeners: z, setNodeRef: b, transform: h, transition: M, isDragging: _ } = Gy({
    id: i.id,
    disabled: !s
  }), H = {
    transform: Eu.Transform.toString(h),
    transition: M,
    zIndex: _ ? 20 : void 0
  }, B = k1(Nn(i.entityId));
  return /* @__PURE__ */ O.jsxs(
    "div",
    {
      ref: b,
      style: H,
      className: `simui-card${i.size === 2 ? " span-2" : ""}${s ? " editing" : ""}${_ ? " dragging" : ""}`,
      children: [
        m ? /* @__PURE__ */ O.jsx(B, { entity: m }) : /* @__PURE__ */ O.jsxs("div", { className: "simui-tile", children: [
          /* @__PURE__ */ O.jsx("div", { className: "simui-row", children: /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: i.entityId, children: i.entityId }) }),
          /* @__PURE__ */ O.jsx("span", { className: "simui-state", children: "Unavailable" })
        ] }),
        s && /* @__PURE__ */ O.jsxs(O.Fragment, { children: [
          /* @__PURE__ */ O.jsx("div", { className: "simui-card-grab", ...S, ...z, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ O.jsx("button", { className: "simui-card-btn size", onPointerDown: (k) => k.stopPropagation(), onClick: o, "aria-label": "Toggle width", children: i.size === 2 ? "1×" : "2×" }),
          /* @__PURE__ */ O.jsx("button", { className: "simui-card-btn x", onPointerDown: (k) => k.stopPropagation(), onClick: f, "aria-label": "Remove card", children: "×" })
        ] })
      ]
    }
  );
}
function W1({ existing: i, onAdd: s, onClose: f }) {
  const { states: o } = vl(), [d, m] = A.useState(""), S = new Set(i), z = d.toLowerCase(), b = Object.values(o).filter((h) => !S.has(h.entity_id)).filter((h) => Lt(h).toLowerCase().includes(z) || h.entity_id.includes(z)).sort((h, M) => Lt(h).localeCompare(Lt(M))).slice(0, 200);
  return /* @__PURE__ */ O.jsx("div", { className: "simui-modal", onClick: f, children: /* @__PURE__ */ O.jsxs("div", { className: "simui-modal-card", onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ O.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ O.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: d,
          onChange: (h) => m(h.target.value)
        }
      ),
      /* @__PURE__ */ O.jsx("button", { className: "simui-iconbtn-h", onClick: f, "aria-label": "Close", children: /* @__PURE__ */ O.jsx(j1, { size: 16 }) })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: "simui-modal-list", children: [
      b.map((h) => /* @__PURE__ */ O.jsxs("div", { className: "simui-add-row", onClick: () => s(h.entity_id), children: [
        /* @__PURE__ */ O.jsx("span", { className: "simui-name", title: h.entity_id, children: Lt(h) }),
        /* @__PURE__ */ O.jsx("span", { className: "simui-add-dom", children: Nn(h.entity_id) })
      ] }, h.entity_id)),
      b.length === 0 && /* @__PURE__ */ O.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function F1() {
  const { states: i } = vl(), { config: s, editing: f, setEditing: o, reorder: d, addCard: m, removeCard: S, setCardSize: z } = Wy(), [b, h] = A.useState(!1), M = S0(p0(Gf, { activationConstraint: { distance: 5 } }));
  if (!s) return /* @__PURE__ */ O.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
  const _ = s.views[0], H = _.cards.map((Y) => Y.id), B = Object.keys(i).length, k = (Y) => {
    const { active: Z, over: W } = Y;
    if (!W || Z.id === W.id) return;
    const et = H.indexOf(String(Z.id)), K = H.indexOf(String(W.id));
    et >= 0 && K >= 0 && d(et, K);
  };
  return /* @__PURE__ */ O.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ O.jsxs("header", { className: "simui-header", children: [
      /* @__PURE__ */ O.jsx("h1", { children: _.title }),
      /* @__PURE__ */ O.jsxs("span", { className: "simui-sub", children: [
        _.cards.length,
        " cards · ",
        B,
        " entities"
      ] }),
      /* @__PURE__ */ O.jsx("span", { className: "simui-spacer" }),
      f && /* @__PURE__ */ O.jsx("button", { className: "simui-iconbtn-h", onClick: () => h(!0), "aria-label": "Add card", children: /* @__PURE__ */ O.jsx(jv, { size: 16 }) }),
      /* @__PURE__ */ O.jsx(
        "button",
        {
          className: `simui-iconbtn-h${f ? " active" : ""}`,
          onClick: () => o(!f),
          "aria-label": f ? "Done editing" : "Edit dashboard",
          children: f ? /* @__PURE__ */ O.jsx(u1, { size: 16 }) : /* @__PURE__ */ O.jsx(x1, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ O.jsx(Ty, { sensors: M, collisionDetection: _0, onDragEnd: k, children: /* @__PURE__ */ O.jsx(Hy, { items: H, strategy: Zf, children: /* @__PURE__ */ O.jsx("div", { className: "simui-grid", children: _.cards.map((Y) => /* @__PURE__ */ O.jsx(
      $1,
      {
        card: Y,
        editing: f,
        onRemove: () => S(Y.id),
        onResize: () => z(Y.id, Y.size === 2 ? 1 : 2)
      },
      Y.id
    )) }) }) }),
    b && /* @__PURE__ */ O.jsx(
      W1,
      {
        existing: _.cards.map((Y) => Y.entityId),
        onAdd: m,
        onClose: () => h(!1)
      }
    )
  ] });
}
function I1() {
  return /* @__PURE__ */ O.jsx(Fy, { children: /* @__PURE__ */ O.jsx(F1, {}) });
}
const P1 = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:16px 16px 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);transition:border-color .15s ease,background .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}';
function tb(i) {
  return {
    states: i.states,
    connection: i.connection,
    callService: (s, f, o, d) => i.callService(s, f, o, d)
  };
}
class eb extends HTMLElement {
  constructor() {
    super(...arguments);
    Zi(this, "_root");
    Zi(this, "_mount");
    Zi(this, "_hass");
  }
  set hass(f) {
    this._hass = f, this._render();
  }
  get hass() {
    return this._hass;
  }
  // Accepted but currently unused — declared so HA's property writes don't warn.
  set narrow(f) {
  }
  set route(f) {
  }
  set panel(f) {
  }
  connectedCallback() {
    if (!this._mount) {
      const f = document.createElement("style");
      f.textContent = P1, this.appendChild(f), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = a0.createRoot(this._mount);
    }
    this._render();
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ O.jsx(Zy, { hass: tb(this._hass), children: /* @__PURE__ */ O.jsx(I1, {}) })
    );
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", eb);
