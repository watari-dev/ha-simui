var i0 = Object.defineProperty;
var u0 = (u, c, s) => c in u ? i0(u, c, { enumerable: !0, configurable: !0, writable: !0, value: s }) : u[c] = s;
var Sa = (u, c, s) => u0(u, typeof c != "symbol" ? c + "" : c, s);
function c0(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var bo = { exports: {} }, pi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xm;
function s0() {
  if (Xm) return pi;
  Xm = 1;
  var u = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.fragment");
  function s(r, m, d) {
    var y = null;
    if (d !== void 0 && (y = "" + d), m.key !== void 0 && (y = "" + m.key), "key" in m) {
      d = {};
      for (var S in m)
        S !== "key" && (d[S] = m[S]);
    } else d = m;
    return m = d.ref, {
      $$typeof: u,
      type: r,
      key: y,
      ref: m !== void 0 ? m : null,
      props: d
    };
  }
  return pi.Fragment = c, pi.jsx = s, pi.jsxs = s, pi;
}
var Qm;
function o0() {
  return Qm || (Qm = 1, bo.exports = s0()), bo.exports;
}
var g = o0(), So = { exports: {} }, bi = {}, xo = { exports: {} }, Eo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zm;
function r0() {
  return Zm || (Zm = 1, (function(u) {
    function c(O, B) {
      var J = O.length;
      O.push(B);
      t: for (; 0 < J; ) {
        var ct = J - 1 >>> 1, gt = O[ct];
        if (0 < m(gt, B))
          O[ct] = B, O[J] = gt, J = ct;
        else break t;
      }
    }
    function s(O) {
      return O.length === 0 ? null : O[0];
    }
    function r(O) {
      if (O.length === 0) return null;
      var B = O[0], J = O.pop();
      if (J !== B) {
        O[0] = J;
        t: for (var ct = 0, gt = O.length, b = gt >>> 1; ct < b; ) {
          var C = 2 * (ct + 1) - 1, Y = O[C], L = C + 1, P = O[L];
          if (0 > m(Y, J))
            L < gt && 0 > m(P, Y) ? (O[ct] = P, O[L] = J, ct = L) : (O[ct] = Y, O[C] = J, ct = C);
          else if (L < gt && 0 > m(P, J))
            O[ct] = P, O[L] = J, ct = L;
          else break t;
        }
      }
      return B;
    }
    function m(O, B) {
      var J = O.sortIndex - B.sortIndex;
      return J !== 0 ? J : O.id - B.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      u.unstable_now = function() {
        return d.now();
      };
    } else {
      var y = Date, S = y.now();
      u.unstable_now = function() {
        return y.now() - S;
      };
    }
    var x = [], h = [], M = 1, T = null, U = 3, H = !1, Z = !1, q = !1, Q = !1, W = typeof setTimeout == "function" ? setTimeout : null, lt = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function nt(O) {
      for (var B = s(h); B !== null; ) {
        if (B.callback === null) r(h);
        else if (B.startTime <= O)
          r(h), B.sortIndex = B.expirationTime, c(x, B);
        else break;
        B = s(h);
      }
    }
    function ut(O) {
      if (q = !1, nt(O), !Z)
        if (s(x) !== null)
          Z = !0, et || (et = !0, Mt());
        else {
          var B = s(h);
          B !== null && le(ut, B.startTime - O);
        }
    }
    var et = !1, G = -1, I = 5, bt = -1;
    function Ot() {
      return Q ? !0 : !(u.unstable_now() - bt < I);
    }
    function dt() {
      if (Q = !1, et) {
        var O = u.unstable_now();
        bt = O;
        var B = !0;
        try {
          t: {
            Z = !1, q && (q = !1, lt(G), G = -1), H = !0;
            var J = U;
            try {
              e: {
                for (nt(O), T = s(x); T !== null && !(T.expirationTime > O && Ot()); ) {
                  var ct = T.callback;
                  if (typeof ct == "function") {
                    T.callback = null, U = T.priorityLevel;
                    var gt = ct(
                      T.expirationTime <= O
                    );
                    if (O = u.unstable_now(), typeof gt == "function") {
                      T.callback = gt, nt(O), B = !0;
                      break e;
                    }
                    T === s(x) && r(x), nt(O);
                  } else r(x);
                  T = s(x);
                }
                if (T !== null) B = !0;
                else {
                  var b = s(h);
                  b !== null && le(
                    ut,
                    b.startTime - O
                  ), B = !1;
                }
              }
              break t;
            } finally {
              T = null, U = J, H = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Mt() : et = !1;
        }
      }
    }
    var Mt;
    if (typeof k == "function")
      Mt = function() {
        k(dt);
      };
    else if (typeof MessageChannel < "u") {
      var Jt = new MessageChannel(), Xt = Jt.port2;
      Jt.port1.onmessage = dt, Mt = function() {
        Xt.postMessage(null);
      };
    } else
      Mt = function() {
        W(dt, 0);
      };
    function le(O, B) {
      G = W(function() {
        O(u.unstable_now());
      }, B);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, u.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < O ? Math.floor(1e3 / O) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, u.unstable_next = function(O) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = U;
      }
      var J = U;
      U = B;
      try {
        return O();
      } finally {
        U = J;
      }
    }, u.unstable_requestPaint = function() {
      Q = !0;
    }, u.unstable_runWithPriority = function(O, B) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var J = U;
      U = O;
      try {
        return B();
      } finally {
        U = J;
      }
    }, u.unstable_scheduleCallback = function(O, B, J) {
      var ct = u.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? ct + J : ct) : J = ct, O) {
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
      return gt = J + gt, O = {
        id: M++,
        callback: B,
        priorityLevel: O,
        startTime: J,
        expirationTime: gt,
        sortIndex: -1
      }, J > ct ? (O.sortIndex = J, c(h, O), s(x) === null && O === s(h) && (q ? (lt(G), G = -1) : q = !0, le(ut, J - ct))) : (O.sortIndex = gt, c(x, O), Z || H || (Z = !0, et || (et = !0, Mt()))), O;
    }, u.unstable_shouldYield = Ot, u.unstable_wrapCallback = function(O) {
      var B = U;
      return function() {
        var J = U;
        U = B;
        try {
          return O.apply(this, arguments);
        } finally {
          U = J;
        }
      };
    };
  })(Eo)), Eo;
}
var Vm;
function f0() {
  return Vm || (Vm = 1, xo.exports = r0()), xo.exports;
}
var zo = { exports: {} }, tt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Km;
function d0() {
  if (Km) return tt;
  Km = 1;
  var u = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), x = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), M = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), U = Symbol.iterator;
  function H(b) {
    return b === null || typeof b != "object" ? null : (b = U && b[U] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var Z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, q = Object.assign, Q = {};
  function W(b, C, Y) {
    this.props = b, this.context = C, this.refs = Q, this.updater = Y || Z;
  }
  W.prototype.isReactComponent = {}, W.prototype.setState = function(b, C) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, C, "setState");
  }, W.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function lt() {
  }
  lt.prototype = W.prototype;
  function k(b, C, Y) {
    this.props = b, this.context = C, this.refs = Q, this.updater = Y || Z;
  }
  var nt = k.prototype = new lt();
  nt.constructor = k, q(nt, W.prototype), nt.isPureReactComponent = !0;
  var ut = Array.isArray;
  function et() {
  }
  var G = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function bt(b, C, Y) {
    var L = Y.ref;
    return {
      $$typeof: u,
      type: b,
      key: C,
      ref: L !== void 0 ? L : null,
      props: Y
    };
  }
  function Ot(b, C) {
    return bt(b.type, C, b.props);
  }
  function dt(b) {
    return typeof b == "object" && b !== null && b.$$typeof === u;
  }
  function Mt(b) {
    var C = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(Y) {
      return C[Y];
    });
  }
  var Jt = /\/+/g;
  function Xt(b, C) {
    return typeof b == "object" && b !== null && b.key != null ? Mt("" + b.key) : C.toString(36);
  }
  function le(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(et, et) : (b.status = "pending", b.then(
          function(C) {
            b.status === "pending" && (b.status = "fulfilled", b.value = C);
          },
          function(C) {
            b.status === "pending" && (b.status = "rejected", b.reason = C);
          }
        )), b.status) {
          case "fulfilled":
            return b.value;
          case "rejected":
            throw b.reason;
        }
    }
    throw b;
  }
  function O(b, C, Y, L, P) {
    var F = typeof b;
    (F === "undefined" || F === "boolean") && (b = null);
    var mt = !1;
    if (b === null) mt = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          mt = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case u:
            case c:
              mt = !0;
              break;
            case M:
              return mt = b._init, O(
                mt(b._payload),
                C,
                Y,
                L,
                P
              );
          }
      }
    if (mt)
      return P = P(b), mt = L === "" ? "." + Xt(b, 0) : L, ut(P) ? (Y = "", mt != null && (Y = mt.replace(Jt, "$&/") + "/"), O(P, C, Y, "", function(vt) {
        return vt;
      })) : P != null && (dt(P) && (P = Ot(
        P,
        Y + (P.key == null || b && b.key === P.key ? "" : ("" + P.key).replace(
          Jt,
          "$&/"
        ) + "/") + mt
      )), C.push(P)), 1;
    mt = 0;
    var jt = L === "" ? "." : L + ":";
    if (ut(b))
      for (var St = 0; St < b.length; St++)
        L = b[St], F = jt + Xt(L, St), mt += O(
          L,
          C,
          Y,
          F,
          P
        );
    else if (St = H(b), typeof St == "function")
      for (b = St.call(b), St = 0; !(L = b.next()).done; )
        L = L.value, F = jt + Xt(L, St++), mt += O(
          L,
          C,
          Y,
          F,
          P
        );
    else if (F === "object") {
      if (typeof b.then == "function")
        return O(
          le(b),
          C,
          Y,
          L,
          P
        );
      throw C = String(b), Error(
        "Objects are not valid as a React child (found: " + (C === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : C) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return mt;
  }
  function B(b, C, Y) {
    if (b == null) return b;
    var L = [], P = 0;
    return O(b, L, "", "", function(F) {
      return C.call(Y, F, P++);
    }), L;
  }
  function J(b) {
    if (b._status === -1) {
      var C = b._result;
      C = C(), C.then(
        function(Y) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = Y);
        },
        function(Y) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = Y);
        }
      ), b._status === -1 && (b._status = 0, b._result = C);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(b) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var C = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
        error: b
      });
      if (!window.dispatchEvent(C)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", b);
      return;
    }
    console.error(b);
  }, gt = {
    map: B,
    forEach: function(b, C, Y) {
      B(
        b,
        function() {
          C.apply(this, arguments);
        },
        Y
      );
    },
    count: function(b) {
      var C = 0;
      return B(b, function() {
        C++;
      }), C;
    },
    toArray: function(b) {
      return B(b, function(C) {
        return C;
      }) || [];
    },
    only: function(b) {
      if (!dt(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return tt.Activity = T, tt.Children = gt, tt.Component = W, tt.Fragment = s, tt.Profiler = m, tt.PureComponent = k, tt.StrictMode = r, tt.Suspense = x, tt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, tt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return G.H.useMemoCache(b);
    }
  }, tt.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, tt.cacheSignal = function() {
    return null;
  }, tt.cloneElement = function(b, C, Y) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var L = q({}, b.props), P = b.key;
    if (C != null)
      for (F in C.key !== void 0 && (P = "" + C.key), C)
        !I.call(C, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && C.ref === void 0 || (L[F] = C[F]);
    var F = arguments.length - 2;
    if (F === 1) L.children = Y;
    else if (1 < F) {
      for (var mt = Array(F), jt = 0; jt < F; jt++)
        mt[jt] = arguments[jt + 2];
      L.children = mt;
    }
    return bt(b.type, P, L);
  }, tt.createContext = function(b) {
    return b = {
      $$typeof: y,
      _currentValue: b,
      _currentValue2: b,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, b.Provider = b, b.Consumer = {
      $$typeof: d,
      _context: b
    }, b;
  }, tt.createElement = function(b, C, Y) {
    var L, P = {}, F = null;
    if (C != null)
      for (L in C.key !== void 0 && (F = "" + C.key), C)
        I.call(C, L) && L !== "key" && L !== "__self" && L !== "__source" && (P[L] = C[L]);
    var mt = arguments.length - 2;
    if (mt === 1) P.children = Y;
    else if (1 < mt) {
      for (var jt = Array(mt), St = 0; St < mt; St++)
        jt[St] = arguments[St + 2];
      P.children = jt;
    }
    if (b && b.defaultProps)
      for (L in mt = b.defaultProps, mt)
        P[L] === void 0 && (P[L] = mt[L]);
    return bt(b, F, P);
  }, tt.createRef = function() {
    return { current: null };
  }, tt.forwardRef = function(b) {
    return { $$typeof: S, render: b };
  }, tt.isValidElement = dt, tt.lazy = function(b) {
    return {
      $$typeof: M,
      _payload: { _status: -1, _result: b },
      _init: J
    };
  }, tt.memo = function(b, C) {
    return {
      $$typeof: h,
      type: b,
      compare: C === void 0 ? null : C
    };
  }, tt.startTransition = function(b) {
    var C = G.T, Y = {};
    G.T = Y;
    try {
      var L = b(), P = G.S;
      P !== null && P(Y, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(et, ct);
    } catch (F) {
      ct(F);
    } finally {
      C !== null && Y.types !== null && (C.types = Y.types), G.T = C;
    }
  }, tt.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, tt.use = function(b) {
    return G.H.use(b);
  }, tt.useActionState = function(b, C, Y) {
    return G.H.useActionState(b, C, Y);
  }, tt.useCallback = function(b, C) {
    return G.H.useCallback(b, C);
  }, tt.useContext = function(b) {
    return G.H.useContext(b);
  }, tt.useDebugValue = function() {
  }, tt.useDeferredValue = function(b, C) {
    return G.H.useDeferredValue(b, C);
  }, tt.useEffect = function(b, C) {
    return G.H.useEffect(b, C);
  }, tt.useEffectEvent = function(b) {
    return G.H.useEffectEvent(b);
  }, tt.useId = function() {
    return G.H.useId();
  }, tt.useImperativeHandle = function(b, C, Y) {
    return G.H.useImperativeHandle(b, C, Y);
  }, tt.useInsertionEffect = function(b, C) {
    return G.H.useInsertionEffect(b, C);
  }, tt.useLayoutEffect = function(b, C) {
    return G.H.useLayoutEffect(b, C);
  }, tt.useMemo = function(b, C) {
    return G.H.useMemo(b, C);
  }, tt.useOptimistic = function(b, C) {
    return G.H.useOptimistic(b, C);
  }, tt.useReducer = function(b, C, Y) {
    return G.H.useReducer(b, C, Y);
  }, tt.useRef = function(b) {
    return G.H.useRef(b);
  }, tt.useState = function(b) {
    return G.H.useState(b);
  }, tt.useSyncExternalStore = function(b, C, Y) {
    return G.H.useSyncExternalStore(
      b,
      C,
      Y
    );
  }, tt.useTransition = function() {
    return G.H.useTransition();
  }, tt.version = "19.2.7", tt;
}
var Jm;
function Yo() {
  return Jm || (Jm = 1, zo.exports = d0()), zo.exports;
}
var _o = { exports: {} }, de = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var km;
function m0() {
  if (km) return de;
  km = 1;
  var u = Yo();
  function c(x) {
    var h = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var M = 2; M < arguments.length; M++)
        h += "&args[]=" + encodeURIComponent(arguments[M]);
    }
    return "Minified React error #" + x + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var r = {
    d: {
      f: s,
      r: function() {
        throw Error(c(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, m = /* @__PURE__ */ Symbol.for("react.portal");
  function d(x, h, M) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: T == null ? null : "" + T,
      children: x,
      containerInfo: h,
      implementation: M
    };
  }
  var y = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(x, h) {
    if (x === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, de.createPortal = function(x, h) {
    var M = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(c(299));
    return d(x, h, null, M);
  }, de.flushSync = function(x) {
    var h = y.T, M = r.p;
    try {
      if (y.T = null, r.p = 2, x) return x();
    } finally {
      y.T = h, r.p = M, r.d.f();
    }
  }, de.preconnect = function(x, h) {
    typeof x == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(x, h));
  }, de.prefetchDNS = function(x) {
    typeof x == "string" && r.d.D(x);
  }, de.preinit = function(x, h) {
    if (typeof x == "string" && h && typeof h.as == "string") {
      var M = h.as, T = S(M, h.crossOrigin), U = typeof h.integrity == "string" ? h.integrity : void 0, H = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      M === "style" ? r.d.S(
        x,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: T,
          integrity: U,
          fetchPriority: H
        }
      ) : M === "script" && r.d.X(x, {
        crossOrigin: T,
        integrity: U,
        fetchPriority: H,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, de.preinitModule = function(x, h) {
    if (typeof x == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var M = S(
            h.as,
            h.crossOrigin
          );
          r.d.M(x, {
            crossOrigin: M,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && r.d.M(x);
  }, de.preload = function(x, h) {
    if (typeof x == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var M = h.as, T = S(M, h.crossOrigin);
      r.d.L(x, M, {
        crossOrigin: T,
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
  }, de.preloadModule = function(x, h) {
    if (typeof x == "string")
      if (h) {
        var M = S(h.as, h.crossOrigin);
        r.d.m(x, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: M,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else r.d.m(x);
  }, de.requestFormReset = function(x) {
    r.d.r(x);
  }, de.unstable_batchedUpdates = function(x, h) {
    return x(h);
  }, de.useFormState = function(x, h, M) {
    return y.H.useFormState(x, h, M);
  }, de.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, de.version = "19.2.7", de;
}
var $m;
function vh() {
  if ($m) return _o.exports;
  $m = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return u(), _o.exports = m0(), _o.exports;
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
var Wm;
function h0() {
  if (Wm) return bi;
  Wm = 1;
  var u = f0(), c = Yo(), s = vh();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
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
  function y(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function S(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function x(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === l) return x(a), t;
          if (i === n) return x(a), e;
          i = i.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== n.return) l = a, n = i;
      else {
        for (var o = !1, f = a.child; f; ) {
          if (f === l) {
            o = !0, l = a, n = i;
            break;
          }
          if (f === n) {
            o = !0, n = a, l = i;
            break;
          }
          f = f.sibling;
        }
        if (!o) {
          for (f = i.child; f; ) {
            if (f === l) {
              o = !0, l = i, n = a;
              break;
            }
            if (f === n) {
              o = !0, n = i, l = a;
              break;
            }
            f = f.sibling;
          }
          if (!o) throw Error(r(189));
        }
      }
      if (l.alternate !== n) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
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
  var T = Object.assign, U = /* @__PURE__ */ Symbol.for("react.element"), H = /* @__PURE__ */ Symbol.for("react.transitional.element"), Z = /* @__PURE__ */ Symbol.for("react.portal"), q = /* @__PURE__ */ Symbol.for("react.fragment"), Q = /* @__PURE__ */ Symbol.for("react.strict_mode"), W = /* @__PURE__ */ Symbol.for("react.profiler"), lt = /* @__PURE__ */ Symbol.for("react.consumer"), k = /* @__PURE__ */ Symbol.for("react.context"), nt = /* @__PURE__ */ Symbol.for("react.forward_ref"), ut = /* @__PURE__ */ Symbol.for("react.suspense"), et = /* @__PURE__ */ Symbol.for("react.suspense_list"), G = /* @__PURE__ */ Symbol.for("react.memo"), I = /* @__PURE__ */ Symbol.for("react.lazy"), bt = /* @__PURE__ */ Symbol.for("react.activity"), Ot = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), dt = Symbol.iterator;
  function Mt(t) {
    return t === null || typeof t != "object" ? null : (t = dt && t[dt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Jt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Xt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Jt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case q:
        return "Fragment";
      case W:
        return "Profiler";
      case Q:
        return "StrictMode";
      case ut:
        return "Suspense";
      case et:
        return "SuspenseList";
      case bt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Z:
          return "Portal";
        case k:
          return t.displayName || "Context";
        case lt:
          return (t._context.displayName || "Context") + ".Consumer";
        case nt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case G:
          return e = t.displayName || null, e !== null ? e : Xt(t.type) || "Memo";
        case I:
          e = t._payload, t = t._init;
          try {
            return Xt(t(e));
          } catch {
          }
      }
    return null;
  }
  var le = Array.isArray, O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], gt = -1;
  function b(t) {
    return { current: t };
  }
  function C(t) {
    0 > gt || (t.current = ct[gt], ct[gt] = null, gt--);
  }
  function Y(t, e) {
    gt++, ct[gt] = t.current, t.current = e;
  }
  var L = b(null), P = b(null), F = b(null), mt = b(null);
  function jt(t, e) {
    switch (Y(F, e), Y(P, t), Y(L, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? fm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = fm(e), t = dm(e, t);
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
    C(L), Y(L, t);
  }
  function St() {
    C(L), C(P), C(F);
  }
  function vt(t) {
    t.memoizedState !== null && Y(mt, t);
    var e = L.current, l = dm(e, t.type);
    e !== l && (Y(P, t), Y(L, l));
  }
  function il(t) {
    P.current === t && (C(L), C(P)), mt.current === t && (C(mt), hi._currentValue = J);
  }
  var ve, hl;
  function ne(t) {
    if (ve === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ve = e && e[1] || "", hl = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ve + t + hl;
  }
  var ul = !1;
  function cl(t, e) {
    if (!t || ul) return "";
    ul = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (N) {
                  var A = N;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (N) {
                  A = N;
                }
                t.call(w.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                A = N;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (N) {
            if (N && A && typeof N.stack == "string")
              return [N.stack, A.stack];
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
      var i = n.DetermineComponentFrameRoot(), o = i[0], f = i[1];
      if (o && f) {
        var v = o.split(`
`), _ = f.split(`
`);
        for (a = n = 0; n < v.length && !v[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < _.length && !_[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === v.length || a === _.length)
          for (n = v.length - 1, a = _.length - 1; 1 <= n && 0 <= a && v[n] !== _[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (v[n] !== _[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || v[n] !== _[a]) {
                  var R = `
` + v[n].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      ul = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? ne(l) : "";
  }
  function Ci(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ne(t.type);
      case 16:
        return ne("Lazy");
      case 13:
        return t.child !== e && e !== null ? ne("Suspense Fallback") : ne("Suspense");
      case 19:
        return ne("SuspenseList");
      case 0:
      case 15:
        return cl(t.type, !1);
      case 11:
        return cl(t.type.render, !1);
      case 1:
        return cl(t.type, !0);
      case 31:
        return ne("Activity");
      default:
        return "";
    }
  }
  function Da(t) {
    try {
      var e = "", l = null;
      do
        e += Ci(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var mn = Object.prototype.hasOwnProperty, He = u.unstable_scheduleCallback, Hl = u.unstable_cancelCallback, jn = u.unstable_shouldYield, Ri = u.unstable_requestPaint, oe = u.unstable_now, uc = u.unstable_getCurrentPriorityLevel, ji = u.unstable_ImmediatePriority, vl = u.unstable_UserBlockingPriority, Ie = u.unstable_NormalPriority, hn = u.unstable_LowPriority, Na = u.unstable_IdlePriority, sl = u.log, wi = u.unstable_setDisableYieldValue, vn = null, me = null;
  function Be(t) {
    if (typeof sl == "function" && wi(t), me && typeof me.setStrictMode == "function")
      try {
        me.setStrictMode(vn, t);
      } catch {
      }
  }
  var re = Math.clz32 ? Math.clz32 : sc, cc = Math.log, Ui = Math.LN2;
  function sc(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (cc(t) / Ui | 0) | 0;
  }
  var wn = 256, Un = 262144, qt = 4194304;
  function Yt(t) {
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
  function It(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, i = t.suspendedLanes, o = t.pingedLanes;
    t = t.warmLanes;
    var f = n & 134217727;
    return f !== 0 ? (n = f & ~i, n !== 0 ? a = Yt(n) : (o &= f, o !== 0 ? a = Yt(o) : l || (l = f & ~t, l !== 0 && (a = Yt(l))))) : (f = n & ~i, f !== 0 ? a = Yt(f) : o !== 0 ? a = Yt(o) : l || (l = n & ~t, l !== 0 && (a = Yt(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & i) === 0 && (i = a & -a, l = e & -e, i >= l || i === 32 && (l & 4194048) !== 0) ? e : a;
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
  function fe() {
    var t = qt;
    return qt <<= 1, (qt & 62914560) === 0 && (qt = 4194304), t;
  }
  function pe(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function qe(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function kt(t, e, l, n, a, i) {
    var o = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var f = t.entanglements, v = t.expirationTimes, _ = t.hiddenUpdates;
    for (l = o & ~l; 0 < l; ) {
      var R = 31 - re(l), w = 1 << R;
      f[R] = 0, v[R] = -1;
      var A = _[R];
      if (A !== null)
        for (_[R] = null, R = 0; R < A.length; R++) {
          var N = A[R];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~w;
    }
    n !== 0 && Pe(t, n, 0), i !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(o & ~e));
  }
  function Pe(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - re(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function Ne(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - re(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function Ye(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : gl(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function gl(t) {
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
  function yl(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function tl() {
    var t = B.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Um(t.type));
  }
  function Bl(t, e) {
    var l = B.p;
    try {
      return B.p = t, e();
    } finally {
      B.p = l;
    }
  }
  var Le = Math.random().toString(36).slice(2), ae = "__reactFiber$" + Le, be = "__reactProps$" + Le, Hn = "__reactContainer$" + Le, oc = "__reactEvents$" + Le, kh = "__reactListeners$" + Le, $h = "__reactHandles$" + Le, Fo = "__reactResources$" + Le, Ma = "__reactMarker$" + Le;
  function rc(t) {
    delete t[ae], delete t[be], delete t[oc], delete t[kh], delete t[$h];
  }
  function Bn(t) {
    var e = t[ae];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Hn] || l[ae]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = bm(t); t !== null; ) {
            if (l = t[ae]) return l;
            t = bm(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function qn(t) {
    if (t = t[ae] || t[Hn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Oa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Yn(t) {
    var e = t[Fo];
    return e || (e = t[Fo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Pt(t) {
    t[Ma] = !0;
  }
  var Io = /* @__PURE__ */ new Set(), Po = {};
  function gn(t, e) {
    Ln(t, e), Ln(t + "Capture", e);
  }
  function Ln(t, e) {
    for (Po[t] = e, t = 0; t < e.length; t++)
      Io.add(e[t]);
  }
  var Wh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), tr = {}, er = {};
  function Fh(t) {
    return mn.call(er, t) ? !0 : mn.call(tr, t) ? !1 : Wh.test(t) ? er[t] = !0 : (tr[t] = !0, !1);
  }
  function Hi(t, e, l) {
    if (Fh(e))
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
  function Bi(t, e, l) {
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
  function Ge(t) {
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
  function lr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Ih(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, i = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(o) {
          l = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(o) {
          l = "" + o;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function fc(t) {
    if (!t._valueTracker) {
      var e = lr(t) ? "checked" : "value";
      t._valueTracker = Ih(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function nr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = lr(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function qi(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ph = /[\n"\\]/g;
  function Xe(t) {
    return t.replace(
      Ph,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function dc(t, e, l, n, a, i, o, f) {
    t.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.type = o : t.removeAttribute("type"), e != null ? o === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ge(e)) : t.value !== "" + Ge(e) && (t.value = "" + Ge(e)) : o !== "submit" && o !== "reset" || t.removeAttribute("value"), e != null ? mc(t, o, Ge(e)) : l != null ? mc(t, o, Ge(l)) : n != null && t.removeAttribute("value"), a == null && i != null && (t.defaultChecked = !!i), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Ge(f) : t.removeAttribute("name");
  }
  function ar(t, e, l, n, a, i, o, f) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), e != null || l != null) {
      if (!(i !== "submit" && i !== "reset" || e != null)) {
        fc(t);
        return;
      }
      l = l != null ? "" + Ge(l) : "", e = e != null ? "" + Ge(e) : l, f || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = f ? t.checked : !!n, t.defaultChecked = !!n, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.name = o), fc(t);
  }
  function mc(t, e, l) {
    e === "number" && qi(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function Gn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ge(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function ir(t, e, l) {
    if (e != null && (e = "" + Ge(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ge(l) : "";
  }
  function ur(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(r(92));
        if (le(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Ge(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), fc(t);
  }
  function Xn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var tv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cr(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || tv.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function sr(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && cr(t, a, n);
    } else
      for (var i in e)
        e.hasOwnProperty(i) && cr(t, i, e[i]);
  }
  function hc(t) {
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
  var ev = /* @__PURE__ */ new Map([
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
  ]), lv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yi(t) {
    return lv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function bl() {
  }
  var vc = null;
  function gc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Qn = null, Zn = null;
  function or(t) {
    var e = qn(t);
    if (e && (t = e.stateNode)) {
      var l = t[be] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (dc(
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
              'input[name="' + Xe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[be] || null;
                if (!a) throw Error(r(90));
                dc(
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
              n = l[e], n.form === t.form && nr(n);
          }
          break t;
        case "textarea":
          ir(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Gn(t, !!l.multiple, e, !1);
      }
    }
  }
  var yc = !1;
  function rr(t, e, l) {
    if (yc) return t(e, l);
    yc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (yc = !1, (Qn !== null || Zn !== null) && (Au(), Qn && (e = Qn, t = Zn, Zn = Qn = null, or(e), t)))
        for (e = 0; e < t.length; e++) or(t[e]);
    }
  }
  function Ca(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[be] || null;
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
        r(231, e, typeof l)
      );
    return l;
  }
  var Sl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), pc = !1;
  if (Sl)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          pc = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      pc = !1;
    }
  var ql = null, bc = null, Li = null;
  function fr() {
    if (Li) return Li;
    var t, e = bc, l = e.length, n, a = "value" in ql ? ql.value : ql.textContent, i = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var o = l - t;
    for (n = 1; n <= o && e[l - n] === a[i - n]; n++) ;
    return Li = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Gi(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Xi() {
    return !0;
  }
  function dr() {
    return !1;
  }
  function Se(t) {
    function e(l, n, a, i, o) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = i, this.target = o, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(i) : i[f]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Xi : dr, this.isPropagationStopped = dr, this;
    }
    return T(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Xi);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Xi);
      },
      persist: function() {
      },
      isPersistent: Xi
    }), e;
  }
  var yn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Qi = Se(yn), ja = T({}, yn, { view: 0, detail: 0 }), nv = Se(ja), Sc, xc, wa, Zi = T({}, ja, {
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
    getModifierState: zc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== wa && (wa && t.type === "mousemove" ? (Sc = t.screenX - wa.screenX, xc = t.screenY - wa.screenY) : xc = Sc = 0, wa = t), Sc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : xc;
    }
  }), mr = Se(Zi), av = T({}, Zi, { dataTransfer: 0 }), iv = Se(av), uv = T({}, ja, { relatedTarget: 0 }), Ec = Se(uv), cv = T({}, yn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sv = Se(cv), ov = T({}, yn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), rv = Se(ov), fv = T({}, yn, { data: 0 }), hr = Se(fv), dv = {
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
  }, mv = {
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
  }, hv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = hv[t]) ? !!e[t] : !1;
  }
  function zc() {
    return vv;
  }
  var gv = T({}, ja, {
    key: function(t) {
      if (t.key) {
        var e = dv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Gi(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? mv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zc,
    charCode: function(t) {
      return t.type === "keypress" ? Gi(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Gi(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), yv = Se(gv), pv = T({}, Zi, {
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
  }), vr = Se(pv), bv = T({}, ja, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zc
  }), Sv = Se(bv), xv = T({}, yn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ev = Se(xv), zv = T({}, Zi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), _v = Se(zv), Tv = T({}, yn, {
    newState: 0,
    oldState: 0
  }), Av = Se(Tv), Dv = [9, 13, 27, 32], _c = Sl && "CompositionEvent" in window, Ua = null;
  Sl && "documentMode" in document && (Ua = document.documentMode);
  var Nv = Sl && "TextEvent" in window && !Ua, gr = Sl && (!_c || Ua && 8 < Ua && 11 >= Ua), yr = " ", pr = !1;
  function br(t, e) {
    switch (t) {
      case "keyup":
        return Dv.indexOf(e.keyCode) !== -1;
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
  function Sr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Vn = !1;
  function Mv(t, e) {
    switch (t) {
      case "compositionend":
        return Sr(e);
      case "keypress":
        return e.which !== 32 ? null : (pr = !0, yr);
      case "textInput":
        return t = e.data, t === yr && pr ? null : t;
      default:
        return null;
    }
  }
  function Ov(t, e) {
    if (Vn)
      return t === "compositionend" || !_c && br(t, e) ? (t = fr(), Li = bc = ql = null, Vn = !1, t) : null;
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
        return gr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Cv = {
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
  function xr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Cv[t.type] : e === "textarea";
  }
  function Er(t, e, l, n) {
    Qn ? Zn ? Zn.push(n) : Zn = [n] : Qn = n, e = ju(e, "onChange"), 0 < e.length && (l = new Qi(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var Ha = null, Ba = null;
  function Rv(t) {
    im(t, 0);
  }
  function Vi(t) {
    var e = Oa(t);
    if (nr(e)) return t;
  }
  function zr(t, e) {
    if (t === "change") return e;
  }
  var _r = !1;
  if (Sl) {
    var Tc;
    if (Sl) {
      var Ac = "oninput" in document;
      if (!Ac) {
        var Tr = document.createElement("div");
        Tr.setAttribute("oninput", "return;"), Ac = typeof Tr.oninput == "function";
      }
      Tc = Ac;
    } else Tc = !1;
    _r = Tc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ar() {
    Ha && (Ha.detachEvent("onpropertychange", Dr), Ba = Ha = null);
  }
  function Dr(t) {
    if (t.propertyName === "value" && Vi(Ba)) {
      var e = [];
      Er(
        e,
        Ba,
        t,
        gc(t)
      ), rr(Rv, e);
    }
  }
  function jv(t, e, l) {
    t === "focusin" ? (Ar(), Ha = e, Ba = l, Ha.attachEvent("onpropertychange", Dr)) : t === "focusout" && Ar();
  }
  function wv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Vi(Ba);
  }
  function Uv(t, e) {
    if (t === "click") return Vi(e);
  }
  function Hv(t, e) {
    if (t === "input" || t === "change")
      return Vi(e);
  }
  function Bv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Me = typeof Object.is == "function" ? Object.is : Bv;
  function qa(t, e) {
    if (Me(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!mn.call(e, a) || !Me(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function Nr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Mr(t, e) {
    var l = Nr(t);
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
      l = Nr(l);
    }
  }
  function Or(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Or(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Cr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = qi(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = qi(t.document);
    }
    return e;
  }
  function Dc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var qv = Sl && "documentMode" in document && 11 >= document.documentMode, Kn = null, Nc = null, Ya = null, Mc = !1;
  function Rr(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Mc || Kn == null || Kn !== qi(n) || (n = Kn, "selectionStart" in n && Dc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), Ya && qa(Ya, n) || (Ya = n, n = ju(Nc, "onSelect"), 0 < n.length && (e = new Qi(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = Kn)));
  }
  function pn(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Jn = {
    animationend: pn("Animation", "AnimationEnd"),
    animationiteration: pn("Animation", "AnimationIteration"),
    animationstart: pn("Animation", "AnimationStart"),
    transitionrun: pn("Transition", "TransitionRun"),
    transitionstart: pn("Transition", "TransitionStart"),
    transitioncancel: pn("Transition", "TransitionCancel"),
    transitionend: pn("Transition", "TransitionEnd")
  }, Oc = {}, jr = {};
  Sl && (jr = document.createElement("div").style, "AnimationEvent" in window || (delete Jn.animationend.animation, delete Jn.animationiteration.animation, delete Jn.animationstart.animation), "TransitionEvent" in window || delete Jn.transitionend.transition);
  function bn(t) {
    if (Oc[t]) return Oc[t];
    if (!Jn[t]) return t;
    var e = Jn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in jr)
        return Oc[t] = e[l];
    return t;
  }
  var wr = bn("animationend"), Ur = bn("animationiteration"), Hr = bn("animationstart"), Yv = bn("transitionrun"), Lv = bn("transitionstart"), Gv = bn("transitioncancel"), Br = bn("transitionend"), qr = /* @__PURE__ */ new Map(), Cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Cc.push("scrollEnd");
  function el(t, e) {
    qr.set(t, e), gn(e, [t]);
  }
  var Ki = typeof reportError == "function" ? reportError : function(t) {
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
  }, Qe = [], kn = 0, Rc = 0;
  function Ji() {
    for (var t = kn, e = Rc = kn = 0; e < t; ) {
      var l = Qe[e];
      Qe[e++] = null;
      var n = Qe[e];
      Qe[e++] = null;
      var a = Qe[e];
      Qe[e++] = null;
      var i = Qe[e];
      if (Qe[e++] = null, n !== null && a !== null) {
        var o = n.pending;
        o === null ? a.next = a : (a.next = o.next, o.next = a), n.pending = a;
      }
      i !== 0 && Yr(l, a, i);
    }
  }
  function ki(t, e, l, n) {
    Qe[kn++] = t, Qe[kn++] = e, Qe[kn++] = l, Qe[kn++] = n, Rc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function jc(t, e, l, n) {
    return ki(t, e, l, n), $i(t);
  }
  function Sn(t, e) {
    return ki(t, null, null, e), $i(t);
  }
  function Yr(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, i = t.return; i !== null; )
      i.childLanes |= l, n = i.alternate, n !== null && (n.childLanes |= l), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (a = !0)), t = i, i = i.return;
    return t.tag === 3 ? (i = t.stateNode, a && e !== null && (a = 31 - re(l), t = i.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), i) : null;
  }
  function $i(t) {
    if (50 < ci)
      throw ci = 0, Xs = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var $n = {};
  function Xv(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Oe(t, e, l, n) {
    return new Xv(t, e, l, n);
  }
  function wc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function xl(t, e) {
    var l = t.alternate;
    return l === null ? (l = Oe(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Lr(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Wi(t, e, l, n, a, i) {
    var o = 0;
    if (n = t, typeof t == "function") wc(t) && (o = 1);
    else if (typeof t == "string")
      o = Jg(
        t,
        l,
        L.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case bt:
          return t = Oe(31, l, e, a), t.elementType = bt, t.lanes = i, t;
        case q:
          return xn(l.children, a, i, e);
        case Q:
          o = 8, a |= 24;
          break;
        case W:
          return t = Oe(12, l, e, a | 2), t.elementType = W, t.lanes = i, t;
        case ut:
          return t = Oe(13, l, e, a), t.elementType = ut, t.lanes = i, t;
        case et:
          return t = Oe(19, l, e, a), t.elementType = et, t.lanes = i, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
                o = 10;
                break t;
              case lt:
                o = 9;
                break t;
              case nt:
                o = 11;
                break t;
              case G:
                o = 14;
                break t;
              case I:
                o = 16, n = null;
                break t;
            }
          o = 29, l = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = Oe(o, l, e, a), e.elementType = t, e.type = n, e.lanes = i, e;
  }
  function xn(t, e, l, n) {
    return t = Oe(7, t, n, e), t.lanes = l, t;
  }
  function Uc(t, e, l) {
    return t = Oe(6, t, null, e), t.lanes = l, t;
  }
  function Gr(t) {
    var e = Oe(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Hc(t, e, l) {
    return e = Oe(
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
  var Xr = /* @__PURE__ */ new WeakMap();
  function Ze(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Xr.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Da(e)
      }, Xr.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Da(e)
    };
  }
  var Wn = [], Fn = 0, Fi = null, La = 0, Ve = [], Ke = 0, Yl = null, ol = 1, rl = "";
  function El(t, e) {
    Wn[Fn++] = La, Wn[Fn++] = Fi, Fi = t, La = e;
  }
  function Qr(t, e, l) {
    Ve[Ke++] = ol, Ve[Ke++] = rl, Ve[Ke++] = Yl, Yl = t;
    var n = ol;
    t = rl;
    var a = 32 - re(n) - 1;
    n &= ~(1 << a), l += 1;
    var i = 32 - re(e) + a;
    if (30 < i) {
      var o = a - a % 5;
      i = (n & (1 << o) - 1).toString(32), n >>= o, a -= o, ol = 1 << 32 - re(e) + a | l << a | n, rl = i + t;
    } else
      ol = 1 << i | l << a | n, rl = t;
  }
  function Bc(t) {
    t.return !== null && (El(t, 1), Qr(t, 1, 0));
  }
  function qc(t) {
    for (; t === Fi; )
      Fi = Wn[--Fn], Wn[Fn] = null, La = Wn[--Fn], Wn[Fn] = null;
    for (; t === Yl; )
      Yl = Ve[--Ke], Ve[Ke] = null, rl = Ve[--Ke], Ve[Ke] = null, ol = Ve[--Ke], Ve[Ke] = null;
  }
  function Zr(t, e) {
    Ve[Ke++] = ol, Ve[Ke++] = rl, Ve[Ke++] = Yl, ol = e.id, rl = e.overflow, Yl = t;
  }
  var ie = null, Ct = null, ht = !1, Ll = null, Je = !1, Yc = Error(r(519));
  function Gl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ga(Ze(e, t)), Yc;
  }
  function Vr(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[ae] = t, e[be] = n, l) {
      case "dialog":
        ot("cancel", e), ot("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ot("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < oi.length; l++)
          ot(oi[l], e);
        break;
      case "source":
        ot("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ot("error", e), ot("load", e);
        break;
      case "details":
        ot("toggle", e);
        break;
      case "input":
        ot("invalid", e), ar(
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
        ot("invalid", e);
        break;
      case "textarea":
        ot("invalid", e), ur(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || om(e.textContent, l) ? (n.popover != null && (ot("beforetoggle", e), ot("toggle", e)), n.onScroll != null && ot("scroll", e), n.onScrollEnd != null && ot("scrollend", e), n.onClick != null && (e.onclick = bl), e = !0) : e = !1, e || Gl(t, !0);
  }
  function Kr(t) {
    for (ie = t.return; ie; )
      switch (ie.tag) {
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
          ie = ie.return;
      }
  }
  function In(t) {
    if (t !== ie) return !1;
    if (!ht) return Kr(t), ht = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || no(t.type, t.memoizedProps)), l = !l), l && Ct && Gl(t), Kr(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ct = pm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ct = pm(t);
    } else
      e === 27 ? (e = Ct, en(t.type) ? (t = so, so = null, Ct = t) : Ct = e) : Ct = ie ? $e(t.stateNode.nextSibling) : null;
    return !0;
  }
  function En() {
    Ct = ie = null, ht = !1;
  }
  function Lc() {
    var t = Ll;
    return t !== null && (_e === null ? _e = t : _e.push.apply(
      _e,
      t
    ), Ll = null), t;
  }
  function Ga(t) {
    Ll === null ? Ll = [t] : Ll.push(t);
  }
  var Gc = b(null), zn = null, zl = null;
  function Xl(t, e, l) {
    Y(Gc, e._currentValue), e._currentValue = l;
  }
  function _l(t) {
    t._currentValue = Gc.current, C(Gc);
  }
  function Xc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Qc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var o = a.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var f = i;
          i = a;
          for (var v = 0; v < e.length; v++)
            if (f.context === e[v]) {
              i.lanes |= l, f = i.alternate, f !== null && (f.lanes |= l), Xc(
                i.return,
                l,
                t
              ), n || (o = null);
              break t;
            }
          i = f.next;
        }
      } else if (a.tag === 18) {
        if (o = a.return, o === null) throw Error(r(341));
        o.lanes |= l, i = o.alternate, i !== null && (i.lanes |= l), Xc(o, l, t), o = null;
      } else o = a.child;
      if (o !== null) o.return = a;
      else
        for (o = a; o !== null; ) {
          if (o === t) {
            o = null;
            break;
          }
          if (a = o.sibling, a !== null) {
            a.return = o.return, o = a;
            break;
          }
          o = o.return;
        }
      a = o;
    }
  }
  function Pn(t, e, l, n) {
    t = null;
    for (var a = e, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var o = a.alternate;
        if (o === null) throw Error(r(387));
        if (o = o.memoizedProps, o !== null) {
          var f = a.type;
          Me(a.pendingProps.value, o.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (a === mt.current) {
        if (o = a.alternate, o === null) throw Error(r(387));
        o.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(hi) : t = [hi]);
      }
      a = a.return;
    }
    t !== null && Qc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function Ii(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Me(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function _n(t) {
    zn = t, zl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ue(t) {
    return Jr(zn, t);
  }
  function Pi(t, e) {
    return zn === null && _n(t), Jr(t, e);
  }
  function Jr(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, zl === null) {
      if (t === null) throw Error(r(308));
      zl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else zl = zl.next = e;
    return l;
  }
  var Qv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Zv = u.unstable_scheduleCallback, Vv = u.unstable_NormalPriority, Qt = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Zc() {
    return {
      controller: new Qv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Xa(t) {
    t.refCount--, t.refCount === 0 && Zv(Vv, function() {
      t.controller.abort();
    });
  }
  var Qa = null, Vc = 0, ta = 0, ea = null;
  function Kv(t, e) {
    if (Qa === null) {
      var l = Qa = [];
      Vc = 0, ta = ks(), ea = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return Vc++, e.then(kr, kr), e;
  }
  function kr() {
    if (--Vc === 0 && Qa !== null) {
      ea !== null && (ea.status = "fulfilled");
      var t = Qa;
      Qa = null, ta = 0, ea = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Jv(t, e) {
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
  var $r = O.S;
  O.S = function(t, e) {
    jd = oe(), typeof e == "object" && e !== null && typeof e.then == "function" && Kv(t, e), $r !== null && $r(t, e);
  };
  var Tn = b(null);
  function Kc() {
    var t = Tn.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function tu(t, e) {
    e === null ? Y(Tn, Tn.current) : Y(Tn, e.pool);
  }
  function Wr() {
    var t = Kc();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var la = Error(r(460)), Jc = Error(r(474)), eu = Error(r(542)), lu = { then: function() {
  } };
  function Fr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ir(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(bl, bl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, tf(t), t;
      default:
        if (typeof e.status == "string") e.then(bl, bl);
        else {
          if (t = Nt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
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
            throw t = e.reason, tf(t), t;
        }
        throw Dn = e, la;
    }
  }
  function An(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Dn = l, la) : l;
    }
  }
  var Dn = null;
  function Pr() {
    if (Dn === null) throw Error(r(459));
    var t = Dn;
    return Dn = null, t;
  }
  function tf(t) {
    if (t === la || t === eu)
      throw Error(r(483));
  }
  var na = null, Za = 0;
  function nu(t) {
    var e = Za;
    return Za += 1, na === null && (na = []), Ir(na, t, e);
  }
  function Va(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function au(t, e) {
    throw e.$$typeof === U ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function ef(t) {
    function e(E, p) {
      if (t) {
        var z = E.deletions;
        z === null ? (E.deletions = [p], E.flags |= 16) : z.push(p);
      }
    }
    function l(E, p) {
      if (!t) return null;
      for (; p !== null; )
        e(E, p), p = p.sibling;
      return null;
    }
    function n(E) {
      for (var p = /* @__PURE__ */ new Map(); E !== null; )
        E.key !== null ? p.set(E.key, E) : p.set(E.index, E), E = E.sibling;
      return p;
    }
    function a(E, p) {
      return E = xl(E, p), E.index = 0, E.sibling = null, E;
    }
    function i(E, p, z) {
      return E.index = z, t ? (z = E.alternate, z !== null ? (z = z.index, z < p ? (E.flags |= 67108866, p) : z) : (E.flags |= 67108866, p)) : (E.flags |= 1048576, p);
    }
    function o(E) {
      return t && E.alternate === null && (E.flags |= 67108866), E;
    }
    function f(E, p, z, j) {
      return p === null || p.tag !== 6 ? (p = Uc(z, E.mode, j), p.return = E, p) : (p = a(p, z), p.return = E, p);
    }
    function v(E, p, z, j) {
      var K = z.type;
      return K === q ? R(
        E,
        p,
        z.props.children,
        j,
        z.key
      ) : p !== null && (p.elementType === K || typeof K == "object" && K !== null && K.$$typeof === I && An(K) === p.type) ? (p = a(p, z.props), Va(p, z), p.return = E, p) : (p = Wi(
        z.type,
        z.key,
        z.props,
        null,
        E.mode,
        j
      ), Va(p, z), p.return = E, p);
    }
    function _(E, p, z, j) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== z.containerInfo || p.stateNode.implementation !== z.implementation ? (p = Hc(z, E.mode, j), p.return = E, p) : (p = a(p, z.children || []), p.return = E, p);
    }
    function R(E, p, z, j, K) {
      return p === null || p.tag !== 7 ? (p = xn(
        z,
        E.mode,
        j,
        K
      ), p.return = E, p) : (p = a(p, z), p.return = E, p);
    }
    function w(E, p, z) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = Uc(
          "" + p,
          E.mode,
          z
        ), p.return = E, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case H:
            return z = Wi(
              p.type,
              p.key,
              p.props,
              null,
              E.mode,
              z
            ), Va(z, p), z.return = E, z;
          case Z:
            return p = Hc(
              p,
              E.mode,
              z
            ), p.return = E, p;
          case I:
            return p = An(p), w(E, p, z);
        }
        if (le(p) || Mt(p))
          return p = xn(
            p,
            E.mode,
            z,
            null
          ), p.return = E, p;
        if (typeof p.then == "function")
          return w(E, nu(p), z);
        if (p.$$typeof === k)
          return w(
            E,
            Pi(E, p),
            z
          );
        au(E, p);
      }
      return null;
    }
    function A(E, p, z, j) {
      var K = p !== null ? p.key : null;
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return K !== null ? null : f(E, p, "" + z, j);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case H:
            return z.key === K ? v(E, p, z, j) : null;
          case Z:
            return z.key === K ? _(E, p, z, j) : null;
          case I:
            return z = An(z), A(E, p, z, j);
        }
        if (le(z) || Mt(z))
          return K !== null ? null : R(E, p, z, j, null);
        if (typeof z.then == "function")
          return A(
            E,
            p,
            nu(z),
            j
          );
        if (z.$$typeof === k)
          return A(
            E,
            p,
            Pi(E, z),
            j
          );
        au(E, z);
      }
      return null;
    }
    function N(E, p, z, j, K) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return E = E.get(z) || null, f(p, E, "" + j, K);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case H:
            return E = E.get(
              j.key === null ? z : j.key
            ) || null, v(p, E, j, K);
          case Z:
            return E = E.get(
              j.key === null ? z : j.key
            ) || null, _(p, E, j, K);
          case I:
            return j = An(j), N(
              E,
              p,
              z,
              j,
              K
            );
        }
        if (le(j) || Mt(j))
          return E = E.get(z) || null, R(p, E, j, K, null);
        if (typeof j.then == "function")
          return N(
            E,
            p,
            z,
            nu(j),
            K
          );
        if (j.$$typeof === k)
          return N(
            E,
            p,
            z,
            Pi(p, j),
            K
          );
        au(p, j);
      }
      return null;
    }
    function X(E, p, z, j) {
      for (var K = null, yt = null, V = p, it = p = 0, ft = null; V !== null && it < z.length; it++) {
        V.index > it ? (ft = V, V = null) : ft = V.sibling;
        var pt = A(
          E,
          V,
          z[it],
          j
        );
        if (pt === null) {
          V === null && (V = ft);
          break;
        }
        t && V && pt.alternate === null && e(E, V), p = i(pt, p, it), yt === null ? K = pt : yt.sibling = pt, yt = pt, V = ft;
      }
      if (it === z.length)
        return l(E, V), ht && El(E, it), K;
      if (V === null) {
        for (; it < z.length; it++)
          V = w(E, z[it], j), V !== null && (p = i(
            V,
            p,
            it
          ), yt === null ? K = V : yt.sibling = V, yt = V);
        return ht && El(E, it), K;
      }
      for (V = n(V); it < z.length; it++)
        ft = N(
          V,
          E,
          it,
          z[it],
          j
        ), ft !== null && (t && ft.alternate !== null && V.delete(
          ft.key === null ? it : ft.key
        ), p = i(
          ft,
          p,
          it
        ), yt === null ? K = ft : yt.sibling = ft, yt = ft);
      return t && V.forEach(function(cn) {
        return e(E, cn);
      }), ht && El(E, it), K;
    }
    function $(E, p, z, j) {
      if (z == null) throw Error(r(151));
      for (var K = null, yt = null, V = p, it = p = 0, ft = null, pt = z.next(); V !== null && !pt.done; it++, pt = z.next()) {
        V.index > it ? (ft = V, V = null) : ft = V.sibling;
        var cn = A(E, V, pt.value, j);
        if (cn === null) {
          V === null && (V = ft);
          break;
        }
        t && V && cn.alternate === null && e(E, V), p = i(cn, p, it), yt === null ? K = cn : yt.sibling = cn, yt = cn, V = ft;
      }
      if (pt.done)
        return l(E, V), ht && El(E, it), K;
      if (V === null) {
        for (; !pt.done; it++, pt = z.next())
          pt = w(E, pt.value, j), pt !== null && (p = i(pt, p, it), yt === null ? K = pt : yt.sibling = pt, yt = pt);
        return ht && El(E, it), K;
      }
      for (V = n(V); !pt.done; it++, pt = z.next())
        pt = N(V, E, it, pt.value, j), pt !== null && (t && pt.alternate !== null && V.delete(pt.key === null ? it : pt.key), p = i(pt, p, it), yt === null ? K = pt : yt.sibling = pt, yt = pt);
      return t && V.forEach(function(a0) {
        return e(E, a0);
      }), ht && El(E, it), K;
    }
    function Dt(E, p, z, j) {
      if (typeof z == "object" && z !== null && z.type === q && z.key === null && (z = z.props.children), typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case H:
            t: {
              for (var K = z.key; p !== null; ) {
                if (p.key === K) {
                  if (K = z.type, K === q) {
                    if (p.tag === 7) {
                      l(
                        E,
                        p.sibling
                      ), j = a(
                        p,
                        z.props.children
                      ), j.return = E, E = j;
                      break t;
                    }
                  } else if (p.elementType === K || typeof K == "object" && K !== null && K.$$typeof === I && An(K) === p.type) {
                    l(
                      E,
                      p.sibling
                    ), j = a(p, z.props), Va(j, z), j.return = E, E = j;
                    break t;
                  }
                  l(E, p);
                  break;
                } else e(E, p);
                p = p.sibling;
              }
              z.type === q ? (j = xn(
                z.props.children,
                E.mode,
                j,
                z.key
              ), j.return = E, E = j) : (j = Wi(
                z.type,
                z.key,
                z.props,
                null,
                E.mode,
                j
              ), Va(j, z), j.return = E, E = j);
            }
            return o(E);
          case Z:
            t: {
              for (K = z.key; p !== null; ) {
                if (p.key === K)
                  if (p.tag === 4 && p.stateNode.containerInfo === z.containerInfo && p.stateNode.implementation === z.implementation) {
                    l(
                      E,
                      p.sibling
                    ), j = a(p, z.children || []), j.return = E, E = j;
                    break t;
                  } else {
                    l(E, p);
                    break;
                  }
                else e(E, p);
                p = p.sibling;
              }
              j = Hc(z, E.mode, j), j.return = E, E = j;
            }
            return o(E);
          case I:
            return z = An(z), Dt(
              E,
              p,
              z,
              j
            );
        }
        if (le(z))
          return X(
            E,
            p,
            z,
            j
          );
        if (Mt(z)) {
          if (K = Mt(z), typeof K != "function") throw Error(r(150));
          return z = K.call(z), $(
            E,
            p,
            z,
            j
          );
        }
        if (typeof z.then == "function")
          return Dt(
            E,
            p,
            nu(z),
            j
          );
        if (z.$$typeof === k)
          return Dt(
            E,
            p,
            Pi(E, z),
            j
          );
        au(E, z);
      }
      return typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint" ? (z = "" + z, p !== null && p.tag === 6 ? (l(E, p.sibling), j = a(p, z), j.return = E, E = j) : (l(E, p), j = Uc(z, E.mode, j), j.return = E, E = j), o(E)) : l(E, p);
    }
    return function(E, p, z, j) {
      try {
        Za = 0;
        var K = Dt(
          E,
          p,
          z,
          j
        );
        return na = null, K;
      } catch (V) {
        if (V === la || V === eu) throw V;
        var yt = Oe(29, V, null, E.mode);
        return yt.lanes = j, yt.return = E, yt;
      }
    };
  }
  var Nn = ef(!0), lf = ef(!1), Ql = !1;
  function kc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function $c(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Zl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Vl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (xt & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = $i(t), Yr(t, null, l), e;
    }
    return ki(t, n, e, l), $i(t);
  }
  function Ka(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Ne(t, l);
    }
  }
  function Wc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, i = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var o = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = o : i = i.next = o, l = l.next;
        } while (l !== null);
        i === null ? a = i = e : i = i.next = e;
      } else a = i = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Fc = !1;
  function Ja() {
    if (Fc) {
      var t = ea;
      if (t !== null) throw t;
    }
  }
  function ka(t, e, l, n) {
    Fc = !1;
    var a = t.updateQueue;
    Ql = !1;
    var i = a.firstBaseUpdate, o = a.lastBaseUpdate, f = a.shared.pending;
    if (f !== null) {
      a.shared.pending = null;
      var v = f, _ = v.next;
      v.next = null, o === null ? i = _ : o.next = _, o = v;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, f = R.lastBaseUpdate, f !== o && (f === null ? R.firstBaseUpdate = _ : f.next = _, R.lastBaseUpdate = v));
    }
    if (i !== null) {
      var w = a.baseState;
      o = 0, R = _ = v = null, f = i;
      do {
        var A = f.lane & -536870913, N = A !== f.lane;
        if (N ? (rt & A) === A : (n & A) === A) {
          A !== 0 && A === ta && (Fc = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, $ = f;
            A = e;
            var Dt = l;
            switch ($.tag) {
              case 1:
                if (X = $.payload, typeof X == "function") {
                  w = X.call(Dt, w, A);
                  break t;
                }
                w = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = $.payload, A = typeof X == "function" ? X.call(Dt, w, A) : X, A == null) break t;
                w = T({}, w, A);
                break t;
              case 2:
                Ql = !0;
            }
          }
          A = f.callback, A !== null && (t.flags |= 64, N && (t.flags |= 8192), N = a.callbacks, N === null ? a.callbacks = [A] : N.push(A));
        } else
          N = {
            lane: A,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, R === null ? (_ = R = N, v = w) : R = R.next = N, o |= A;
        if (f = f.next, f === null) {
          if (f = a.shared.pending, f === null)
            break;
          N = f, f = N.next, N.next = null, a.lastBaseUpdate = N, a.shared.pending = null;
        }
      } while (!0);
      R === null && (v = w), a.baseState = v, a.firstBaseUpdate = _, a.lastBaseUpdate = R, i === null && (a.shared.lanes = 0), Wl |= o, t.lanes = o, t.memoizedState = w;
    }
  }
  function nf(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function af(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        nf(l[t], e);
  }
  var aa = b(null), iu = b(0);
  function uf(t, e) {
    t = jl, Y(iu, t), Y(aa, e), jl = t | e.baseLanes;
  }
  function Ic() {
    Y(iu, jl), Y(aa, aa.current);
  }
  function Pc() {
    jl = iu.current, C(aa), C(iu);
  }
  var Ce = b(null), ke = null;
  function Kl(t) {
    var e = t.alternate;
    Y(Lt, Lt.current & 1), Y(Ce, t), ke === null && (e === null || aa.current !== null || e.memoizedState !== null) && (ke = t);
  }
  function ts(t) {
    Y(Lt, Lt.current), Y(Ce, t), ke === null && (ke = t);
  }
  function cf(t) {
    t.tag === 22 ? (Y(Lt, Lt.current), Y(Ce, t), ke === null && (ke = t)) : Jl();
  }
  function Jl() {
    Y(Lt, Lt.current), Y(Ce, Ce.current);
  }
  function Re(t) {
    C(Ce), ke === t && (ke = null), C(Lt);
  }
  var Lt = b(0);
  function uu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || uo(l) || co(l)))
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
  var Tl = 0, at = null, Tt = null, Zt = null, cu = !1, ia = !1, Mn = !1, su = 0, $a = 0, ua = null, kv = 0;
  function Ht() {
    throw Error(r(321));
  }
  function es(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Me(t[l], e[l])) return !1;
    return !0;
  }
  function ls(t, e, l, n, a, i) {
    return Tl = i, at = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, O.H = t === null || t.memoizedState === null ? Zf : ys, Mn = !1, i = l(n, a), Mn = !1, ia && (i = of(
      e,
      l,
      n,
      a
    )), sf(t), i;
  }
  function sf(t) {
    O.H = Ia;
    var e = Tt !== null && Tt.next !== null;
    if (Tl = 0, Zt = Tt = at = null, cu = !1, $a = 0, ua = null, e) throw Error(r(300));
    t === null || Vt || (t = t.dependencies, t !== null && Ii(t) && (Vt = !0));
  }
  function of(t, e, l, n) {
    at = t;
    var a = 0;
    do {
      if (ia && (ua = null), $a = 0, ia = !1, 25 <= a) throw Error(r(301));
      if (a += 1, Zt = Tt = null, t.updateQueue != null) {
        var i = t.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      O.H = Vf, i = e(l, n);
    } while (ia);
    return i;
  }
  function $v() {
    var t = O.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Wa(e) : e, t = t.useState()[0], (Tt !== null ? Tt.memoizedState : null) !== t && (at.flags |= 1024), e;
  }
  function ns() {
    var t = su !== 0;
    return su = 0, t;
  }
  function as(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function is(t) {
    if (cu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      cu = !1;
    }
    Tl = 0, Zt = Tt = at = null, ia = !1, $a = su = 0, ua = null;
  }
  function he() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Zt === null ? at.memoizedState = Zt = t : Zt = Zt.next = t, Zt;
  }
  function Gt() {
    if (Tt === null) {
      var t = at.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = Zt === null ? at.memoizedState : Zt.next;
    if (e !== null)
      Zt = e, Tt = t;
    else {
      if (t === null)
        throw at.alternate === null ? Error(r(467)) : Error(r(310));
      Tt = t, t = {
        memoizedState: Tt.memoizedState,
        baseState: Tt.baseState,
        baseQueue: Tt.baseQueue,
        queue: Tt.queue,
        next: null
      }, Zt === null ? at.memoizedState = Zt = t : Zt = Zt.next = t;
    }
    return Zt;
  }
  function ou() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Wa(t) {
    var e = $a;
    return $a += 1, ua === null && (ua = []), t = Ir(ua, t, e), e = at, (Zt === null ? e.memoizedState : Zt.next) === null && (e = e.alternate, O.H = e === null || e.memoizedState === null ? Zf : ys), t;
  }
  function ru(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Wa(t);
      if (t.$$typeof === k) return ue(t);
    }
    throw Error(r(438, String(t)));
  }
  function us(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = ou(), at.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = Ot;
    return e.index++, l;
  }
  function Al(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function fu(t) {
    var e = Gt();
    return cs(e, Tt, t);
  }
  function cs(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, i = n.pending;
    if (i !== null) {
      if (a !== null) {
        var o = a.next;
        a.next = i.next, i.next = o;
      }
      e.baseQueue = a = i, n.pending = null;
    }
    if (i = t.baseState, a === null) t.memoizedState = i;
    else {
      e = a.next;
      var f = o = null, v = null, _ = e, R = !1;
      do {
        var w = _.lane & -536870913;
        if (w !== _.lane ? (rt & w) === w : (Tl & w) === w) {
          var A = _.revertLane;
          if (A === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), w === ta && (R = !0);
          else if ((Tl & A) === A) {
            _ = _.next, A === ta && (R = !0);
            continue;
          } else
            w = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, v === null ? (f = v = w, o = i) : v = v.next = w, at.lanes |= A, Wl |= A;
          w = _.action, Mn && l(i, w), i = _.hasEagerState ? _.eagerState : l(i, w);
        } else
          A = {
            lane: w,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, v === null ? (f = v = A, o = i) : v = v.next = A, at.lanes |= w, Wl |= w;
        _ = _.next;
      } while (_ !== null && _ !== e);
      if (v === null ? o = i : v.next = f, !Me(i, t.memoizedState) && (Vt = !0, R && (l = ea, l !== null)))
        throw l;
      t.memoizedState = i, t.baseState = o, t.baseQueue = v, n.lastRenderedState = i;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function ss(t) {
    var e = Gt(), l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, i = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var o = a = a.next;
      do
        i = t(i, o.action), o = o.next;
      while (o !== a);
      Me(i, e.memoizedState) || (Vt = !0), e.memoizedState = i, e.baseQueue === null && (e.baseState = i), l.lastRenderedState = i;
    }
    return [i, n];
  }
  function rf(t, e, l) {
    var n = at, a = Gt(), i = ht;
    if (i) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var o = !Me(
      (Tt || a).memoizedState,
      l
    );
    if (o && (a.memoizedState = l, Vt = !0), a = a.queue, fs(mf.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || o || Zt !== null && Zt.memoizedState.tag & 1) {
      if (n.flags |= 2048, ca(
        9,
        { destroy: void 0 },
        df.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), Nt === null) throw Error(r(349));
      i || (Tl & 127) !== 0 || ff(n, e, l);
    }
    return l;
  }
  function ff(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = at.updateQueue, e === null ? (e = ou(), at.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function df(t, e, l, n) {
    e.value = l, e.getSnapshot = n, hf(e) && vf(t);
  }
  function mf(t, e, l) {
    return l(function() {
      hf(e) && vf(t);
    });
  }
  function hf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Me(t, l);
    } catch {
      return !0;
    }
  }
  function vf(t) {
    var e = Sn(t, 2);
    e !== null && Te(e, t, 2);
  }
  function os(t) {
    var e = he();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Mn) {
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
      lastRenderedReducer: Al,
      lastRenderedState: t
    }, e;
  }
  function gf(t, e, l, n) {
    return t.baseState = l, cs(
      t,
      Tt,
      typeof n == "function" ? n : Al
    );
  }
  function Wv(t, e, l, n, a) {
    if (hu(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var i = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(o) {
          i.listeners.push(o);
        }
      };
      O.T !== null ? l(!0) : i.isTransition = !1, n(i), l = e.pending, l === null ? (i.next = e.pending = i, yf(e, i)) : (i.next = l.next, e.pending = l.next = i);
    }
  }
  function yf(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var i = O.T, o = {};
      O.T = o;
      try {
        var f = l(a, n), v = O.S;
        v !== null && v(o, f), pf(t, e, f);
      } catch (_) {
        rs(t, e, _);
      } finally {
        i !== null && o.types !== null && (i.types = o.types), O.T = i;
      }
    } else
      try {
        i = l(a, n), pf(t, e, i);
      } catch (_) {
        rs(t, e, _);
      }
  }
  function pf(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        bf(t, e, n);
      },
      function(n) {
        return rs(t, e, n);
      }
    ) : bf(t, e, l);
  }
  function bf(t, e, l) {
    e.status = "fulfilled", e.value = l, Sf(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, yf(t, l)));
  }
  function rs(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, Sf(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function Sf(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function xf(t, e) {
    return e;
  }
  function Ef(t, e) {
    if (ht) {
      var l = Nt.formState;
      if (l !== null) {
        t: {
          var n = at;
          if (ht) {
            if (Ct) {
              e: {
                for (var a = Ct, i = Je; a.nodeType !== 8; ) {
                  if (!i) {
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
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                Ct = $e(
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
    return l = he(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xf,
      lastRenderedState: e
    }, l.queue = n, l = Gf.bind(
      null,
      at,
      n
    ), n.dispatch = l, n = os(!1), i = gs.bind(
      null,
      at,
      !1,
      n.queue
    ), n = he(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = Wv.bind(
      null,
      at,
      a,
      i,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function zf(t) {
    var e = Gt();
    return _f(e, Tt, t);
  }
  function _f(t, e, l) {
    if (e = cs(
      t,
      e,
      xf
    )[0], t = fu(Al)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = Wa(e);
      } catch (o) {
        throw o === la ? eu : o;
      }
    else n = e;
    e = Gt();
    var a = e.queue, i = a.dispatch;
    return l !== e.memoizedState && (at.flags |= 2048, ca(
      9,
      { destroy: void 0 },
      Fv.bind(null, a, l),
      null
    )), [n, i, t];
  }
  function Fv(t, e) {
    t.action = e;
  }
  function Tf(t) {
    var e = Gt(), l = Tt;
    if (l !== null)
      return _f(e, l, t);
    Gt(), e = e.memoizedState, l = Gt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function ca(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = at.updateQueue, e === null && (e = ou(), at.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function Af() {
    return Gt().memoizedState;
  }
  function du(t, e, l, n) {
    var a = he();
    at.flags |= t, a.memoizedState = ca(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function mu(t, e, l, n) {
    var a = Gt();
    n = n === void 0 ? null : n;
    var i = a.memoizedState.inst;
    Tt !== null && n !== null && es(n, Tt.memoizedState.deps) ? a.memoizedState = ca(e, i, l, n) : (at.flags |= t, a.memoizedState = ca(
      1 | e,
      i,
      l,
      n
    ));
  }
  function Df(t, e) {
    du(8390656, 8, t, e);
  }
  function fs(t, e) {
    mu(2048, 8, t, e);
  }
  function Iv(t) {
    at.flags |= 4;
    var e = at.updateQueue;
    if (e === null)
      e = ou(), at.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function Nf(t) {
    var e = Gt().memoizedState;
    return Iv({ ref: e, nextImpl: t }), function() {
      if ((xt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Mf(t, e) {
    return mu(4, 2, t, e);
  }
  function Of(t, e) {
    return mu(4, 4, t, e);
  }
  function Cf(t, e) {
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
  function Rf(t, e, l) {
    l = l != null ? l.concat([t]) : null, mu(4, 4, Cf.bind(null, e, t), l);
  }
  function ds() {
  }
  function jf(t, e) {
    var l = Gt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && es(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function wf(t, e) {
    var l = Gt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && es(e, n[1]))
      return n[0];
    if (n = t(), Mn) {
      Be(!0);
      try {
        t();
      } finally {
        Be(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function ms(t, e, l) {
    return l === void 0 || (Tl & 1073741824) !== 0 && (rt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Ud(), at.lanes |= t, Wl |= t, l);
  }
  function Uf(t, e, l, n) {
    return Me(l, e) ? l : aa.current !== null ? (t = ms(t, l, n), Me(t, e) || (Vt = !0), t) : (Tl & 42) === 0 || (Tl & 1073741824) !== 0 && (rt & 261930) === 0 ? (Vt = !0, t.memoizedState = l) : (t = Ud(), at.lanes |= t, Wl |= t, e);
  }
  function Hf(t, e, l, n, a) {
    var i = B.p;
    B.p = i !== 0 && 8 > i ? i : 8;
    var o = O.T, f = {};
    O.T = f, gs(t, !1, e, l);
    try {
      var v = a(), _ = O.S;
      if (_ !== null && _(f, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var R = Jv(
          v,
          n
        );
        Fa(
          t,
          e,
          R,
          Ue(t)
        );
      } else
        Fa(
          t,
          e,
          n,
          Ue(t)
        );
    } catch (w) {
      Fa(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: w },
        Ue()
      );
    } finally {
      B.p = i, o !== null && f.types !== null && (o.types = f.types), O.T = o;
    }
  }
  function Pv() {
  }
  function hs(t, e, l, n) {
    if (t.tag !== 5) throw Error(r(476));
    var a = Bf(t).queue;
    Hf(
      t,
      a,
      e,
      J,
      l === null ? Pv : function() {
        return qf(t), l(n);
      }
    );
  }
  function Bf(t) {
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
        lastRenderedReducer: Al,
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
        lastRenderedReducer: Al,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function qf(t) {
    var e = Bf(t);
    e.next === null && (e = t.alternate.memoizedState), Fa(
      t,
      e.next.queue,
      {},
      Ue()
    );
  }
  function vs() {
    return ue(hi);
  }
  function Yf() {
    return Gt().memoizedState;
  }
  function Lf() {
    return Gt().memoizedState;
  }
  function tg(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ue();
          t = Zl(l);
          var n = Vl(e, t, l);
          n !== null && (Te(n, e, l), Ka(n, e, l)), e = { cache: Zc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function eg(t, e, l) {
    var n = Ue();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hu(t) ? Xf(e, l) : (l = jc(t, e, l, n), l !== null && (Te(l, t, n), Qf(l, e, n)));
  }
  function Gf(t, e, l) {
    var n = Ue();
    Fa(t, e, l, n);
  }
  function Fa(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (hu(t)) Xf(e, a);
    else {
      var i = t.alternate;
      if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = e.lastRenderedReducer, i !== null))
        try {
          var o = e.lastRenderedState, f = i(o, l);
          if (a.hasEagerState = !0, a.eagerState = f, Me(f, o))
            return ki(t, e, a, 0), Nt === null && Ji(), !1;
        } catch {
        }
      if (l = jc(t, e, a, n), l !== null)
        return Te(l, t, n), Qf(l, e, n), !0;
    }
    return !1;
  }
  function gs(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: ks(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hu(t)) {
      if (e) throw Error(r(479));
    } else
      e = jc(
        t,
        l,
        n,
        2
      ), e !== null && Te(e, t, 2);
  }
  function hu(t) {
    var e = t.alternate;
    return t === at || e !== null && e === at;
  }
  function Xf(t, e) {
    ia = cu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Qf(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Ne(t, l);
    }
  }
  var Ia = {
    readContext: ue,
    use: ru,
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
  Ia.useEffectEvent = Ht;
  var Zf = {
    readContext: ue,
    use: ru,
    useCallback: function(t, e) {
      return he().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: Df,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, du(
        4194308,
        4,
        Cf.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return du(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      du(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = he();
      e = e === void 0 ? null : e;
      var n = t();
      if (Mn) {
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
      var n = he();
      if (l !== void 0) {
        var a = l(e);
        if (Mn) {
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
      }, n.queue = t, t = t.dispatch = eg.bind(
        null,
        at,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = he();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = os(t);
      var e = t.queue, l = Gf.bind(null, at, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: ds,
    useDeferredValue: function(t, e) {
      var l = he();
      return ms(l, t, e);
    },
    useTransition: function() {
      var t = os(!1);
      return t = Hf.bind(
        null,
        at,
        t.queue,
        !0,
        !1
      ), he().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = at, a = he();
      if (ht) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = e(), Nt === null)
          throw Error(r(349));
        (rt & 127) !== 0 || ff(n, e, l);
      }
      a.memoizedState = l;
      var i = { value: l, getSnapshot: e };
      return a.queue = i, Df(mf.bind(null, n, i, t), [
        t
      ]), n.flags |= 2048, ca(
        9,
        { destroy: void 0 },
        df.bind(
          null,
          n,
          i,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = he(), e = Nt.identifierPrefix;
      if (ht) {
        var l = rl, n = ol;
        l = (n & ~(1 << 32 - re(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = su++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = kv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: vs,
    useFormState: Ef,
    useActionState: Ef,
    useOptimistic: function(t) {
      var e = he();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = gs.bind(
        null,
        at,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: us,
    useCacheRefresh: function() {
      return he().memoizedState = tg.bind(
        null,
        at
      );
    },
    useEffectEvent: function(t) {
      var e = he(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((xt & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, ys = {
    readContext: ue,
    use: ru,
    useCallback: jf,
    useContext: ue,
    useEffect: fs,
    useImperativeHandle: Rf,
    useInsertionEffect: Mf,
    useLayoutEffect: Of,
    useMemo: wf,
    useReducer: fu,
    useRef: Af,
    useState: function() {
      return fu(Al);
    },
    useDebugValue: ds,
    useDeferredValue: function(t, e) {
      var l = Gt();
      return Uf(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = fu(Al)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : Wa(t),
        e
      ];
    },
    useSyncExternalStore: rf,
    useId: Yf,
    useHostTransitionStatus: vs,
    useFormState: zf,
    useActionState: zf,
    useOptimistic: function(t, e) {
      var l = Gt();
      return gf(l, Tt, t, e);
    },
    useMemoCache: us,
    useCacheRefresh: Lf
  };
  ys.useEffectEvent = Nf;
  var Vf = {
    readContext: ue,
    use: ru,
    useCallback: jf,
    useContext: ue,
    useEffect: fs,
    useImperativeHandle: Rf,
    useInsertionEffect: Mf,
    useLayoutEffect: Of,
    useMemo: wf,
    useReducer: ss,
    useRef: Af,
    useState: function() {
      return ss(Al);
    },
    useDebugValue: ds,
    useDeferredValue: function(t, e) {
      var l = Gt();
      return Tt === null ? ms(l, t, e) : Uf(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ss(Al)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : Wa(t),
        e
      ];
    },
    useSyncExternalStore: rf,
    useId: Yf,
    useHostTransitionStatus: vs,
    useFormState: Tf,
    useActionState: Tf,
    useOptimistic: function(t, e) {
      var l = Gt();
      return Tt !== null ? gf(l, Tt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: us,
    useCacheRefresh: Lf
  };
  Vf.useEffectEvent = Nf;
  function ps(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : T({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var bs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Ue(), a = Zl(n);
      a.payload = e, l != null && (a.callback = l), e = Vl(t, a, n), e !== null && (Te(e, t, n), Ka(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Ue(), a = Zl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Vl(t, a, n), e !== null && (Te(e, t, n), Ka(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Ue(), n = Zl(l);
      n.tag = 2, e != null && (n.callback = e), e = Vl(t, n, l), e !== null && (Te(e, t, l), Ka(e, t, l));
    }
  };
  function Kf(t, e, l, n, a, i, o) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, i, o) : e.prototype && e.prototype.isPureReactComponent ? !qa(l, n) || !qa(a, i) : !0;
  }
  function Jf(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && bs.enqueueReplaceState(e, e.state, null);
  }
  function On(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = T({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function kf(t) {
    Ki(t);
  }
  function $f(t) {
    console.error(t);
  }
  function Wf(t) {
    Ki(t);
  }
  function vu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Ff(t, e, l) {
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
  function Ss(t, e, l) {
    return l = Zl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      vu(t, e);
    }, l;
  }
  function If(t) {
    return t = Zl(t), t.tag = 3, t;
  }
  function Pf(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = n.value;
      t.payload = function() {
        return a(i);
      }, t.callback = function() {
        Ff(e, l, n);
      };
    }
    var o = l.stateNode;
    o !== null && typeof o.componentDidCatch == "function" && (t.callback = function() {
      Ff(e, l, n), typeof a != "function" && (Fl === null ? Fl = /* @__PURE__ */ new Set([this]) : Fl.add(this));
      var f = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function lg(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && Pn(
        e,
        l,
        a,
        !0
      ), l = Ce.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return ke === null ? Du() : l.alternate === null && Bt === 0 && (Bt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === lu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Vs(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === lu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Vs(t, n, a)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Vs(t, n, a), Du(), !1;
    }
    if (ht)
      return e = Ce.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Yc && (t = Error(r(422), { cause: n }), Ga(Ze(t, l)))) : (n !== Yc && (e = Error(r(423), {
        cause: n
      }), Ga(
        Ze(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ze(n, l), a = Ss(
        t.stateNode,
        n,
        a
      ), Wc(t, a), Bt !== 4 && (Bt = 2)), !1;
    var i = Error(r(520), { cause: n });
    if (i = Ze(i, l), ui === null ? ui = [i] : ui.push(i), Bt !== 4 && (Bt = 2), e === null) return !0;
    n = Ze(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = Ss(l.stateNode, n, t), Wc(l, t), !1;
        case 1:
          if (e = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Fl === null || !Fl.has(i))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = If(a), Pf(
              a,
              t,
              l,
              n
            ), Wc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var xs = Error(r(461)), Vt = !1;
  function ce(t, e, l, n) {
    e.child = t === null ? lf(e, null, l, n) : Nn(
      e,
      t.child,
      l,
      n
    );
  }
  function td(t, e, l, n, a) {
    l = l.render;
    var i = e.ref;
    if ("ref" in n) {
      var o = {};
      for (var f in n)
        f !== "ref" && (o[f] = n[f]);
    } else o = n;
    return _n(e), n = ls(
      t,
      e,
      l,
      o,
      i,
      a
    ), f = ns(), t !== null && !Vt ? (as(t, e, a), Dl(t, e, a)) : (ht && f && Bc(e), e.flags |= 1, ce(t, e, n, a), e.child);
  }
  function ed(t, e, l, n, a) {
    if (t === null) {
      var i = l.type;
      return typeof i == "function" && !wc(i) && i.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = i, ld(
        t,
        e,
        i,
        n,
        a
      )) : (t = Wi(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (i = t.child, !Ms(t, a)) {
      var o = i.memoizedProps;
      if (l = l.compare, l = l !== null ? l : qa, l(o, n) && t.ref === e.ref)
        return Dl(t, e, a);
    }
    return e.flags |= 1, t = xl(i, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function ld(t, e, l, n, a) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (qa(i, n) && t.ref === e.ref)
        if (Vt = !1, e.pendingProps = n = i, Ms(t, a))
          (t.flags & 131072) !== 0 && (Vt = !0);
        else
          return e.lanes = t.lanes, Dl(t, e, a);
    }
    return Es(
      t,
      e,
      l,
      n,
      a
    );
  }
  function nd(t, e, l, n) {
    var a = n.children, i = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~i;
        } else n = 0, e.child = null;
        return ad(
          t,
          e,
          i,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && tu(
          e,
          i !== null ? i.cachePool : null
        ), i !== null ? uf(e, i) : Ic(), cf(e);
      else
        return n = e.lanes = 536870912, ad(
          t,
          e,
          i !== null ? i.baseLanes | l : l,
          l,
          n
        );
    } else
      i !== null ? (tu(e, i.cachePool), uf(e, i), Jl(), e.memoizedState = null) : (t !== null && tu(e, null), Ic(), Jl());
    return ce(t, e, a, l), e.child;
  }
  function Pa(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function ad(t, e, l, n, a) {
    var i = Kc();
    return i = i === null ? null : { parent: Qt._currentValue, pool: i }, e.memoizedState = {
      baseLanes: l,
      cachePool: i
    }, t !== null && tu(e, null), Ic(), cf(e), t !== null && Pn(t, e, n, !0), e.childLanes = a, null;
  }
  function gu(t, e) {
    return e = pu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function id(t, e, l) {
    return Nn(e, t.child, null, l), t = gu(e, e.pendingProps), t.flags |= 2, Re(e), e.memoizedState = null, t;
  }
  function ng(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (ht) {
        if (n.mode === "hidden")
          return t = gu(e, n), e.lanes = 536870912, Pa(null, t);
        if (ts(e), (t = Ct) ? (t = ym(
          t,
          Je
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Yl !== null ? { id: ol, overflow: rl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Gr(t), l.return = e, e.child = l, ie = e, Ct = null)) : t = null, t === null) throw Gl(e);
        return e.lanes = 536870912, null;
      }
      return gu(e, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var o = i.dehydrated;
      if (ts(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = id(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Vt || Pn(t, e, l, !1), a = (l & t.childLanes) !== 0, Vt || a) {
        if (n = Nt, n !== null && (o = Ye(n, l), o !== 0 && o !== i.retryLane))
          throw i.retryLane = o, Sn(t, o), Te(n, t, o), xs;
        Du(), e = id(
          t,
          e,
          l
        );
      } else
        t = i.treeContext, Ct = $e(o.nextSibling), ie = e, ht = !0, Ll = null, Je = !1, t !== null && Zr(e, t), e = gu(e, n), e.flags |= 4096;
      return e;
    }
    return t = xl(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function yu(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Es(t, e, l, n, a) {
    return _n(e), l = ls(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = ns(), t !== null && !Vt ? (as(t, e, a), Dl(t, e, a)) : (ht && n && Bc(e), e.flags |= 1, ce(t, e, l, a), e.child);
  }
  function ud(t, e, l, n, a, i) {
    return _n(e), e.updateQueue = null, l = of(
      e,
      n,
      l,
      a
    ), sf(t), n = ns(), t !== null && !Vt ? (as(t, e, i), Dl(t, e, i)) : (ht && n && Bc(e), e.flags |= 1, ce(t, e, l, i), e.child);
  }
  function cd(t, e, l, n, a) {
    if (_n(e), e.stateNode === null) {
      var i = $n, o = l.contextType;
      typeof o == "object" && o !== null && (i = ue(o)), i = new l(n, i), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = bs, e.stateNode = i, i._reactInternals = e, i = e.stateNode, i.props = n, i.state = e.memoizedState, i.refs = {}, kc(e), o = l.contextType, i.context = typeof o == "object" && o !== null ? ue(o) : $n, i.state = e.memoizedState, o = l.getDerivedStateFromProps, typeof o == "function" && (ps(
        e,
        l,
        o,
        n
      ), i.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (o = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), o !== i.state && bs.enqueueReplaceState(i, i.state, null), ka(e, n, i, a), Ja(), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      i = e.stateNode;
      var f = e.memoizedProps, v = On(l, f);
      i.props = v;
      var _ = i.context, R = l.contextType;
      o = $n, typeof R == "object" && R !== null && (o = ue(R));
      var w = l.getDerivedStateFromProps;
      R = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, R || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (f || _ !== o) && Jf(
        e,
        i,
        n,
        o
      ), Ql = !1;
      var A = e.memoizedState;
      i.state = A, ka(e, n, i, a), Ja(), _ = e.memoizedState, f || A !== _ || Ql ? (typeof w == "function" && (ps(
        e,
        l,
        w,
        n
      ), _ = e.memoizedState), (v = Ql || Kf(
        e,
        l,
        v,
        n,
        A,
        _,
        o
      )) ? (R || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = _), i.props = n, i.state = _, i.context = o, n = v) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      i = e.stateNode, $c(t, e), o = e.memoizedProps, R = On(l, o), i.props = R, w = e.pendingProps, A = i.context, _ = l.contextType, v = $n, typeof _ == "object" && _ !== null && (v = ue(_)), f = l.getDerivedStateFromProps, (_ = typeof f == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (o !== w || A !== v) && Jf(
        e,
        i,
        n,
        v
      ), Ql = !1, A = e.memoizedState, i.state = A, ka(e, n, i, a), Ja();
      var N = e.memoizedState;
      o !== w || A !== N || Ql || t !== null && t.dependencies !== null && Ii(t.dependencies) ? (typeof f == "function" && (ps(
        e,
        l,
        f,
        n
      ), N = e.memoizedState), (R = Ql || Kf(
        e,
        l,
        R,
        n,
        A,
        N,
        v
      ) || t !== null && t.dependencies !== null && Ii(t.dependencies)) ? (_ || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, N, v), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        n,
        N,
        v
      )), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || o === t.memoizedProps && A === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || o === t.memoizedProps && A === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = N), i.props = n, i.state = N, i.context = v, n = R) : (typeof i.componentDidUpdate != "function" || o === t.memoizedProps && A === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || o === t.memoizedProps && A === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return i = n, yu(t, e), n = (e.flags & 128) !== 0, i || n ? (i = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : i.render(), e.flags |= 1, t !== null && n ? (e.child = Nn(
      e,
      t.child,
      null,
      a
    ), e.child = Nn(
      e,
      null,
      l,
      a
    )) : ce(t, e, l, a), e.memoizedState = i.state, t = e.child) : t = Dl(
      t,
      e,
      a
    ), t;
  }
  function sd(t, e, l, n) {
    return En(), e.flags |= 256, ce(t, e, l, n), e.child;
  }
  var zs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function _s(t) {
    return { baseLanes: t, cachePool: Wr() };
  }
  function Ts(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= we), t;
  }
  function od(t, e, l) {
    var n = e.pendingProps, a = !1, i = (e.flags & 128) !== 0, o;
    if ((o = i) || (o = t !== null && t.memoizedState === null ? !1 : (Lt.current & 2) !== 0), o && (a = !0, e.flags &= -129), o = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (ht) {
        if (a ? Kl(e) : Jl(), (t = Ct) ? (t = ym(
          t,
          Je
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Yl !== null ? { id: ol, overflow: rl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Gr(t), l.return = e, e.child = l, ie = e, Ct = null)) : t = null, t === null) throw Gl(e);
        return co(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var f = n.children;
      return n = n.fallback, a ? (Jl(), a = e.mode, f = pu(
        { mode: "hidden", children: f },
        a
      ), n = xn(
        n,
        a,
        l,
        null
      ), f.return = e, n.return = e, f.sibling = n, e.child = f, n = e.child, n.memoizedState = _s(l), n.childLanes = Ts(
        t,
        o,
        l
      ), e.memoizedState = zs, Pa(null, n)) : (Kl(e), As(e, f));
    }
    var v = t.memoizedState;
    if (v !== null && (f = v.dehydrated, f !== null)) {
      if (i)
        e.flags & 256 ? (Kl(e), e.flags &= -257, e = Ds(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (Jl(), e.child = t.child, e.flags |= 128, e = null) : (Jl(), f = n.fallback, a = e.mode, n = pu(
          { mode: "visible", children: n.children },
          a
        ), f = xn(
          f,
          a,
          l,
          null
        ), f.flags |= 2, n.return = e, f.return = e, n.sibling = f, e.child = n, Nn(
          e,
          t.child,
          null,
          l
        ), n = e.child, n.memoizedState = _s(l), n.childLanes = Ts(
          t,
          o,
          l
        ), e.memoizedState = zs, e = Pa(null, n));
      else if (Kl(e), co(f)) {
        if (o = f.nextSibling && f.nextSibling.dataset, o) var _ = o.dgst;
        o = _, n = Error(r(419)), n.stack = "", n.digest = o, Ga({ value: n, source: null, stack: null }), e = Ds(
          t,
          e,
          l
        );
      } else if (Vt || Pn(t, e, l, !1), o = (l & t.childLanes) !== 0, Vt || o) {
        if (o = Nt, o !== null && (n = Ye(o, l), n !== 0 && n !== v.retryLane))
          throw v.retryLane = n, Sn(t, n), Te(o, t, n), xs;
        uo(f) || Du(), e = Ds(
          t,
          e,
          l
        );
      } else
        uo(f) ? (e.flags |= 192, e.child = t.child, e = null) : (t = v.treeContext, Ct = $e(
          f.nextSibling
        ), ie = e, ht = !0, Ll = null, Je = !1, t !== null && Zr(e, t), e = As(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (Jl(), f = n.fallback, a = e.mode, v = t.child, _ = v.sibling, n = xl(v, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = v.subtreeFlags & 65011712, _ !== null ? f = xl(
      _,
      f
    ) : (f = xn(
      f,
      a,
      l,
      null
    ), f.flags |= 2), f.return = e, n.return = e, n.sibling = f, e.child = n, Pa(null, n), n = e.child, f = t.child.memoizedState, f === null ? f = _s(l) : (a = f.cachePool, a !== null ? (v = Qt._currentValue, a = a.parent !== v ? { parent: v, pool: v } : a) : a = Wr(), f = {
      baseLanes: f.baseLanes | l,
      cachePool: a
    }), n.memoizedState = f, n.childLanes = Ts(
      t,
      o,
      l
    ), e.memoizedState = zs, Pa(t.child, n)) : (Kl(e), l = t.child, t = l.sibling, l = xl(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (o = e.deletions, o === null ? (e.deletions = [t], e.flags |= 16) : o.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function As(t, e) {
    return e = pu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function pu(t, e) {
    return t = Oe(22, t, null, e), t.lanes = 0, t;
  }
  function Ds(t, e, l) {
    return Nn(e, t.child, null, l), t = As(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function rd(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Xc(t.return, e, l);
  }
  function Ns(t, e, l, n, a, i) {
    var o = t.memoizedState;
    o === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: i
    } : (o.isBackwards = e, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = l, o.tailMode = a, o.treeForkCount = i);
  }
  function fd(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, i = n.tail;
    n = n.children;
    var o = Lt.current, f = (o & 2) !== 0;
    if (f ? (o = o & 1 | 2, e.flags |= 128) : o &= 1, Y(Lt, o), ce(t, e, n, l), n = ht ? La : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && rd(t, l, e);
        else if (t.tag === 19)
          rd(t, l, e);
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
          t = l.alternate, t !== null && uu(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Ns(
          e,
          !1,
          a,
          l,
          i,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && uu(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        Ns(
          e,
          !0,
          l,
          null,
          i,
          n
        );
        break;
      case "together":
        Ns(
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
  function Dl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), Wl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Pn(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, l = xl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = xl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Ms(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ii(t)));
  }
  function ag(t, e, l) {
    switch (e.tag) {
      case 3:
        jt(e, e.stateNode.containerInfo), Xl(e, Qt, t.memoizedState.cache), En();
        break;
      case 27:
      case 5:
        vt(e);
        break;
      case 4:
        jt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Xl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ts(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Kl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? od(t, e, l) : (Kl(e), t = Dl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Kl(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (Pn(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return fd(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Y(Lt, Lt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, nd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Xl(e, Qt, t.memoizedState.cache);
    }
    return Dl(t, e, l);
  }
  function dd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Vt = !0;
      else {
        if (!Ms(t, l) && (e.flags & 128) === 0)
          return Vt = !1, ag(
            t,
            e,
            l
          );
        Vt = (t.flags & 131072) !== 0;
      }
    else
      Vt = !1, ht && (e.flags & 1048576) !== 0 && Qr(e, La, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = An(e.elementType), e.type = t, typeof t == "function")
            wc(t) ? (n = On(t, n), e.tag = 1, e = cd(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = Es(
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
                e.tag = 11, e = td(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === G) {
                e.tag = 14, e = ed(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = Xt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Es(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = On(
          n,
          e.pendingProps
        ), cd(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (jt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          n = e.pendingProps;
          var i = e.memoizedState;
          a = i.element, $c(t, e), ka(e, n, null, l);
          var o = e.memoizedState;
          if (n = o.cache, Xl(e, Qt, n), n !== i.cache && Qc(
            e,
            [Qt],
            l,
            !0
          ), Ja(), n = o.element, i.isDehydrated)
            if (i = {
              element: n,
              isDehydrated: !1,
              cache: o.cache
            }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
              e = sd(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = Ze(
                Error(r(424)),
                e
              ), Ga(a), e = sd(
                t,
                e,
                n,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ct = $e(t.firstChild), ie = e, ht = !0, Ll = null, Je = !0, l = lf(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (En(), n === a) {
              e = Dl(
                t,
                e,
                l
              );
              break t;
            }
            ce(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return yu(t, e), t === null ? (l = zm(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : ht || (l = e.type, t = e.pendingProps, n = wu(
          F.current
        ).createElement(l), n[ae] = e, n[be] = t, se(n, l, t), Pt(n), e.stateNode = n) : e.memoizedState = zm(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return vt(e), t === null && ht && (n = e.stateNode = Sm(
          e.type,
          e.pendingProps,
          F.current
        ), ie = e, Je = !0, a = Ct, en(e.type) ? (so = a, Ct = $e(n.firstChild)) : Ct = a), ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), yu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && ht && ((a = n = Ct) && (n = wg(
          n,
          e.type,
          e.pendingProps,
          Je
        ), n !== null ? (e.stateNode = n, ie = e, Ct = $e(n.firstChild), Je = !1, a = !0) : a = !1), a || Gl(e)), vt(e), a = e.type, i = e.pendingProps, o = t !== null ? t.memoizedProps : null, n = i.children, no(a, i) ? n = null : o !== null && no(a, o) && (e.flags |= 32), e.memoizedState !== null && (a = ls(
          t,
          e,
          $v,
          null,
          null,
          l
        ), hi._currentValue = a), yu(t, e), ce(t, e, n, l), e.child;
      case 6:
        return t === null && ht && ((t = l = Ct) && (l = Ug(
          l,
          e.pendingProps,
          Je
        ), l !== null ? (e.stateNode = l, ie = e, Ct = null, t = !0) : t = !1), t || Gl(e)), null;
      case 13:
        return od(t, e, l);
      case 4:
        return jt(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = Nn(
          e,
          null,
          n,
          l
        ) : ce(t, e, n, l), e.child;
      case 11:
        return td(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ce(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return n = e.pendingProps, Xl(e, e.type, n.value), ce(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, _n(e), a = ue(a), n = n(a), e.flags |= 1, ce(t, e, n, l), e.child;
      case 14:
        return ed(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return ld(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return fd(t, e, l);
      case 31:
        return ng(t, e, l);
      case 22:
        return nd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return _n(e), n = ue(Qt), t === null ? (a = Kc(), a === null && (a = Nt, i = Zc(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= l), a = i), e.memoizedState = { parent: n, cache: a }, kc(e), Xl(e, Qt, a)) : ((t.lanes & l) !== 0 && ($c(t, e), ka(e, null, null, l), Ja()), a = t.memoizedState, i = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), Xl(e, Qt, n)) : (n = i.cache, Xl(e, Qt, n), n !== a.cache && Qc(
          e,
          [Qt],
          l,
          !0
        ))), ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Nl(t) {
    t.flags |= 4;
  }
  function Os(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Yd()) t.flags |= 8192;
        else
          throw Dn = lu, Jc;
    } else t.flags &= -16777217;
  }
  function md(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Nm(e))
      if (Yd()) t.flags |= 8192;
      else
        throw Dn = lu, Jc;
  }
  function bu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? fe() : 536870912, t.lanes |= e, fa |= e);
  }
  function ti(t, e) {
    if (!ht)
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
  function ig(t, e, l) {
    var n = e.pendingProps;
    switch (qc(e), e.tag) {
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
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), _l(Qt), St(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (In(e) ? Nl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Lc())), Rt(e), null;
      case 26:
        var a = e.type, i = e.memoizedState;
        return t === null ? (Nl(e), i !== null ? (Rt(e), md(e, i)) : (Rt(e), Os(
          e,
          a,
          null,
          n,
          l
        ))) : i ? i !== t.memoizedState ? (Nl(e), Rt(e), md(e, i)) : (Rt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && Nl(e), Rt(e), Os(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (il(e), l = F.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Nl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Rt(e), null;
          }
          t = L.current, In(e) ? Vr(e) : (t = Sm(a, n, l), e.stateNode = t, Nl(e));
        }
        return Rt(e), null;
      case 5:
        if (il(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Nl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Rt(e), null;
          }
          if (i = L.current, In(e))
            Vr(e);
          else {
            var o = wu(
              F.current
            );
            switch (i) {
              case 1:
                i = o.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                i = o.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    i = o.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    i = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    i = o.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof n.is == "string" ? o.createElement("select", {
                      is: n.is
                    }) : o.createElement("select"), n.multiple ? i.multiple = !0 : n.size && (i.size = n.size);
                    break;
                  default:
                    i = typeof n.is == "string" ? o.createElement(a, { is: n.is }) : o.createElement(a);
                }
            }
            i[ae] = e, i[be] = n;
            t: for (o = e.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6)
                i.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                o.child.return = o, o = o.child;
                continue;
              }
              if (o === e) break t;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === e)
                  break t;
                o = o.return;
              }
              o.sibling.return = o.return, o = o.sibling;
            }
            e.stateNode = i;
            t: switch (se(i, a, n), a) {
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
            n && Nl(e);
          }
        }
        return Rt(e), Os(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && Nl(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = F.current, In(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = ie, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[ae] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || om(t.nodeValue, l)), t || Gl(e, !0);
          } else
            t = wu(t).createTextNode(
              n
            ), t[ae] = e, e.stateNode = t;
        }
        return Rt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = In(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[ae] = e;
            } else
              En(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), t = !1;
          } else
            l = Lc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Re(e), e) : (Re(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Rt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = In(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
              a[ae] = e;
            } else
              En(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), a = !1;
          } else
            a = Lc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Re(e), e) : (Re(e), null);
        }
        return Re(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), bu(e, e.updateQueue), Rt(e), null);
      case 4:
        return St(), t === null && Is(e.stateNode.containerInfo), Rt(e), null;
      case 10:
        return _l(e.type), Rt(e), null;
      case 19:
        if (C(Lt), n = e.memoizedState, n === null) return Rt(e), null;
        if (a = (e.flags & 128) !== 0, i = n.rendering, i === null)
          if (a) ti(n, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (i = uu(t), i !== null) {
                  for (e.flags |= 128, ti(n, !1), t = i.updateQueue, e.updateQueue = t, bu(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Lr(l, t), l = l.sibling;
                  return Y(
                    Lt,
                    Lt.current & 1 | 2
                  ), ht && El(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && oe() > _u && (e.flags |= 128, a = !0, ti(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = uu(i), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, bu(e, t), ti(n, !0), n.tail === null && n.tailMode === "hidden" && !i.alternate && !ht)
                return Rt(e), null;
            } else
              2 * oe() - n.renderingStartTime > _u && l !== 536870912 && (e.flags |= 128, a = !0, ti(n, !1), e.lanes = 4194304);
          n.isBackwards ? (i.sibling = e.child, e.child = i) : (t = n.last, t !== null ? t.sibling = i : e.child = i, n.last = i);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = oe(), t.sibling = null, l = Lt.current, Y(
          Lt,
          a ? l & 1 | 2 : l & 1
        ), ht && El(e, n.treeForkCount), t) : (Rt(e), null);
      case 22:
      case 23:
        return Re(e), Pc(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Rt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Rt(e), l = e.updateQueue, l !== null && bu(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && C(Tn), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), _l(Qt), Rt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function ug(t, e) {
    switch (qc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return _l(Qt), St(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return il(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Re(e), e.alternate === null)
            throw Error(r(340));
          En();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Re(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          En();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return C(Lt), null;
      case 4:
        return St(), null;
      case 10:
        return _l(e.type), null;
      case 22:
      case 23:
        return Re(e), Pc(), t !== null && C(Tn), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return _l(Qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function hd(t, e) {
    switch (qc(e), e.tag) {
      case 3:
        _l(Qt), St();
        break;
      case 26:
      case 27:
      case 5:
        il(e);
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
        C(Lt);
        break;
      case 10:
        _l(e.type);
        break;
      case 22:
      case 23:
        Re(e), Pc(), t !== null && C(Tn);
        break;
      case 24:
        _l(Qt);
    }
  }
  function ei(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var i = l.create, o = l.inst;
            n = i(), o.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (f) {
      _t(e, e.return, f);
    }
  }
  function kl(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            var o = n.inst, f = o.destroy;
            if (f !== void 0) {
              o.destroy = void 0, a = e;
              var v = l, _ = f;
              try {
                _();
              } catch (R) {
                _t(
                  a,
                  v,
                  R
                );
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (R) {
      _t(e, e.return, R);
    }
  }
  function vd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        af(e, l);
      } catch (n) {
        _t(t, t.return, n);
      }
    }
  }
  function gd(t, e, l) {
    l.props = On(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      _t(t, e, n);
    }
  }
  function li(t, e) {
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
      _t(t, e, a);
    }
  }
  function fl(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          _t(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          _t(t, e, a);
        }
      else l.current = null;
  }
  function yd(t) {
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
      _t(t, t.return, a);
    }
  }
  function Cs(t, e, l) {
    try {
      var n = t.stateNode;
      Ng(n, t.type, l, e), n[be] = e;
    } catch (a) {
      _t(t, t.return, a);
    }
  }
  function pd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && en(t.type) || t.tag === 4;
  }
  function Rs(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || pd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && en(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function js(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = bl));
    else if (n !== 4 && (n === 27 && en(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (js(t, e, l), t = t.sibling; t !== null; )
        js(t, e, l), t = t.sibling;
  }
  function Su(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && en(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (Su(t, e, l), t = t.sibling; t !== null; )
        Su(t, e, l), t = t.sibling;
  }
  function bd(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      se(e, n, l), e[ae] = t, e[be] = l;
    } catch (i) {
      _t(t, t.return, i);
    }
  }
  var Ml = !1, Kt = !1, ws = !1, Sd = typeof WeakSet == "function" ? WeakSet : Set, te = null;
  function cg(t, e) {
    if (t = t.containerInfo, eo = Gu, t = Cr(t), Dc(t)) {
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
            var a = n.anchorOffset, i = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, i.nodeType;
            } catch {
              l = null;
              break t;
            }
            var o = 0, f = -1, v = -1, _ = 0, R = 0, w = t, A = null;
            e: for (; ; ) {
              for (var N; w !== l || a !== 0 && w.nodeType !== 3 || (f = o + a), w !== i || n !== 0 && w.nodeType !== 3 || (v = o + n), w.nodeType === 3 && (o += w.nodeValue.length), (N = w.firstChild) !== null; )
                A = w, w = N;
              for (; ; ) {
                if (w === t) break e;
                if (A === l && ++_ === a && (f = o), A === i && ++R === n && (v = o), (N = w.nextSibling) !== null) break;
                w = A, A = w.parentNode;
              }
              w = N;
            }
            l = f === -1 || v === -1 ? null : { start: f, end: v };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (lo = { focusedElem: t, selectionRange: l }, Gu = !1, te = e; te !== null; )
      if (e = te, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, te = t;
      else
        for (; te !== null; ) {
          switch (e = te, i = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  a = t[l], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                t = void 0, l = e, a = i.memoizedProps, i = i.memoizedState, n = l.stateNode;
                try {
                  var X = On(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    X,
                    i
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch ($) {
                  _t(
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
                  io(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      io(t);
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
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, te = t;
            break;
          }
          te = e.return;
        }
  }
  function xd(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Cl(t, l), n & 4 && ei(5, l);
        break;
      case 1:
        if (Cl(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (o) {
              _t(l, l.return, o);
            }
          else {
            var a = On(
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
            } catch (o) {
              _t(
                l,
                l.return,
                o
              );
            }
          }
        n & 64 && vd(l), n & 512 && li(l, l.return);
        break;
      case 3:
        if (Cl(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
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
            af(t, e);
          } catch (o) {
            _t(l, l.return, o);
          }
        }
        break;
      case 27:
        e === null && n & 4 && bd(l);
      case 26:
      case 5:
        Cl(t, l), e === null && n & 4 && yd(l), n & 512 && li(l, l.return);
        break;
      case 12:
        Cl(t, l);
        break;
      case 31:
        Cl(t, l), n & 4 && _d(t, l);
        break;
      case 13:
        Cl(t, l), n & 4 && Td(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = gg.bind(
          null,
          l
        ), Hg(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || Ml, !n) {
          e = e !== null && e.memoizedState !== null || Kt, a = Ml;
          var i = Kt;
          Ml = n, (Kt = e) && !i ? Rl(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Cl(t, l), Ml = a, Kt = i;
        }
        break;
      case 30:
        break;
      default:
        Cl(t, l);
    }
  }
  function Ed(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Ed(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && rc(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var wt = null, xe = !1;
  function Ol(t, e, l) {
    for (l = l.child; l !== null; )
      zd(t, e, l), l = l.sibling;
  }
  function zd(t, e, l) {
    if (me && typeof me.onCommitFiberUnmount == "function")
      try {
        me.onCommitFiberUnmount(vn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Kt || fl(l, e), Ol(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Kt || fl(l, e);
        var n = wt, a = xe;
        en(l.type) && (wt = l.stateNode, xe = !1), Ol(
          t,
          e,
          l
        ), fi(l.stateNode), wt = n, xe = a;
        break;
      case 5:
        Kt || fl(l, e);
      case 6:
        if (n = wt, a = xe, wt = null, Ol(
          t,
          e,
          l
        ), wt = n, xe = a, wt !== null)
          if (xe)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(l.stateNode);
            } catch (i) {
              _t(
                l,
                e,
                i
              );
            }
          else
            try {
              wt.removeChild(l.stateNode);
            } catch (i) {
              _t(
                l,
                e,
                i
              );
            }
        break;
      case 18:
        wt !== null && (xe ? (t = wt, vm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), ba(t)) : vm(wt, l.stateNode));
        break;
      case 4:
        n = wt, a = xe, wt = l.stateNode.containerInfo, xe = !0, Ol(
          t,
          e,
          l
        ), wt = n, xe = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        kl(2, l, e), Kt || kl(4, l, e), Ol(
          t,
          e,
          l
        );
        break;
      case 1:
        Kt || (fl(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && gd(
          l,
          e,
          n
        )), Ol(
          t,
          e,
          l
        );
        break;
      case 21:
        Ol(
          t,
          e,
          l
        );
        break;
      case 22:
        Kt = (n = Kt) || l.memoizedState !== null, Ol(
          t,
          e,
          l
        ), Kt = n;
        break;
      default:
        Ol(
          t,
          e,
          l
        );
    }
  }
  function _d(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ba(t);
      } catch (l) {
        _t(e, e.return, l);
      }
    }
  }
  function Td(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ba(t);
      } catch (l) {
        _t(e, e.return, l);
      }
  }
  function sg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Sd()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Sd()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function xu(t, e) {
    var l = sg(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = yg.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function Ee(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], i = t, o = e, f = o;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (en(f.type)) {
                wt = f.stateNode, xe = !1;
                break t;
              }
              break;
            case 5:
              wt = f.stateNode, xe = !1;
              break t;
            case 3:
            case 4:
              wt = f.stateNode.containerInfo, xe = !0;
              break t;
          }
          f = f.return;
        }
        if (wt === null) throw Error(r(160));
        zd(i, o, a), wt = null, xe = !1, i = a.alternate, i !== null && (i.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Ad(e, t), e = e.sibling;
  }
  var ll = null;
  function Ad(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ee(e, t), ze(t), n & 4 && (kl(3, t, t.return), ei(3, t), kl(5, t, t.return));
        break;
      case 1:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), n & 64 && Ml && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = ll;
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), n & 4) {
          var i = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      i = a.getElementsByTagName("title")[0], (!i || i[Ma] || i[ae] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = a.createElement(n), a.head.insertBefore(
                        i,
                        a.querySelector("head > title")
                      )), se(i, n, l), i[ae] = t, Pt(i), n = i;
                      break t;
                    case "link":
                      var o = Am(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (o) {
                        for (var f = 0; f < o.length; f++)
                          if (i = o[f], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            o.splice(f, 1);
                            break e;
                          }
                      }
                      i = a.createElement(n), se(i, n, l), a.head.appendChild(i);
                      break;
                    case "meta":
                      if (o = Am(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (f = 0; f < o.length; f++)
                          if (i = o[f], i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            o.splice(f, 1);
                            break e;
                          }
                      }
                      i = a.createElement(n), se(i, n, l), a.head.appendChild(i);
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  i[ae] = t, Pt(i), n = i;
                }
                t.stateNode = n;
              } else
                Dm(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Tm(
                a,
                n,
                t.memoizedProps
              );
          else
            i !== n ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, n === null ? Dm(
              a,
              t.type,
              t.stateNode
            ) : Tm(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Cs(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), l !== null && n & 4 && Cs(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Xn(a, "");
          } catch (X) {
            _t(t, t.return, X);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, Cs(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (ws = !0);
        break;
      case 6:
        if (Ee(e, t), ze(t), n & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (X) {
            _t(t, t.return, X);
          }
        }
        break;
      case 3:
        if (Bu = null, a = ll, ll = Uu(e.containerInfo), Ee(e, t), ll = a, ze(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ba(e.containerInfo);
          } catch (X) {
            _t(t, t.return, X);
          }
        ws && (ws = !1, Dd(t));
        break;
      case 4:
        n = ll, ll = Uu(
          t.stateNode.containerInfo
        ), Ee(e, t), ze(t), ll = n;
        break;
      case 12:
        Ee(e, t), ze(t);
        break;
      case 31:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, xu(t, n)));
        break;
      case 13:
        Ee(e, t), ze(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (zu = oe()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, xu(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var v = l !== null && l.memoizedState !== null, _ = Ml, R = Kt;
        if (Ml = _ || a, Kt = R || v, Ee(e, t), Kt = R, Ml = _, ze(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || v || Ml || Kt || Cn(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                v = l = e;
                try {
                  if (i = v.stateNode, a)
                    o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    f = v.stateNode;
                    var w = v.memoizedProps.style, A = w != null && w.hasOwnProperty("display") ? w.display : null;
                    f.style.display = A == null || typeof A == "boolean" ? "" : ("" + A).trim();
                  }
                } catch (X) {
                  _t(v, v.return, X);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                v = e;
                try {
                  v.stateNode.nodeValue = a ? "" : v.memoizedProps;
                } catch (X) {
                  _t(v, v.return, X);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                v = e;
                try {
                  var N = v.stateNode;
                  a ? gm(N, !0) : gm(v.stateNode, !1);
                } catch (X) {
                  _t(v, v.return, X);
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
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, xu(t, l))));
        break;
      case 19:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, xu(t, n)));
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
          if (pd(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, i = Rs(t);
            Su(t, i, a);
            break;
          case 5:
            var o = l.stateNode;
            l.flags & 32 && (Xn(o, ""), l.flags &= -33);
            var f = Rs(t);
            Su(t, f, o);
            break;
          case 3:
          case 4:
            var v = l.stateNode.containerInfo, _ = Rs(t);
            js(
              t,
              _,
              v
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (R) {
        _t(t, t.return, R);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Dd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Dd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Cl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        xd(t, e.alternate, e), e = e.sibling;
  }
  function Cn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kl(4, e, e.return), Cn(e);
          break;
        case 1:
          fl(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && gd(
            e,
            e.return,
            l
          ), Cn(e);
          break;
        case 27:
          fi(e.stateNode);
        case 26:
        case 5:
          fl(e, e.return), Cn(e);
          break;
        case 22:
          e.memoizedState === null && Cn(e);
          break;
        case 30:
          Cn(e);
          break;
        default:
          Cn(e);
      }
      t = t.sibling;
    }
  }
  function Rl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, i = e, o = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            a,
            i,
            l
          ), ei(4, i);
          break;
        case 1:
          if (Rl(
            a,
            i,
            l
          ), n = i, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (_) {
              _t(n, n.return, _);
            }
          if (n = i, a = n.updateQueue, a !== null) {
            var f = n.stateNode;
            try {
              var v = a.shared.hiddenCallbacks;
              if (v !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < v.length; a++)
                  nf(v[a], f);
            } catch (_) {
              _t(n, n.return, _);
            }
          }
          l && o & 64 && vd(i), li(i, i.return);
          break;
        case 27:
          bd(i);
        case 26:
        case 5:
          Rl(
            a,
            i,
            l
          ), l && n === null && o & 4 && yd(i), li(i, i.return);
          break;
        case 12:
          Rl(
            a,
            i,
            l
          );
          break;
        case 31:
          Rl(
            a,
            i,
            l
          ), l && o & 4 && _d(a, i);
          break;
        case 13:
          Rl(
            a,
            i,
            l
          ), l && o & 4 && Td(a, i);
          break;
        case 22:
          i.memoizedState === null && Rl(
            a,
            i,
            l
          ), li(i, i.return);
          break;
        case 30:
          break;
        default:
          Rl(
            a,
            i,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Us(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Xa(l));
  }
  function Hs(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Xa(t));
  }
  function nl(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Nd(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function Nd(t, e, l, n) {
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
        ), a & 2048 && ei(9, e);
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
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Xa(t)));
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
            var i = e.memoizedProps, o = i.id, f = i.onPostCommit;
            typeof f == "function" && f(
              o,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (v) {
            _t(e, e.return, v);
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
        i = e.stateNode, o = e.alternate, e.memoizedState !== null ? i._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : ni(t, e) : i._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : (i._visibility |= 2, sa(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Us(o, e);
        break;
      case 24:
        nl(
          t,
          e,
          l,
          n
        ), a & 2048 && Hs(e.alternate, e);
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
  function sa(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t, o = e, f = l, v = n, _ = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          sa(
            i,
            o,
            f,
            v,
            a
          ), ei(8, o);
          break;
        case 23:
          break;
        case 22:
          var R = o.stateNode;
          o.memoizedState !== null ? R._visibility & 2 ? sa(
            i,
            o,
            f,
            v,
            a
          ) : ni(
            i,
            o
          ) : (R._visibility |= 2, sa(
            i,
            o,
            f,
            v,
            a
          )), a && _ & 2048 && Us(
            o.alternate,
            o
          );
          break;
        case 24:
          sa(
            i,
            o,
            f,
            v,
            a
          ), a && _ & 2048 && Hs(o.alternate, o);
          break;
        default:
          sa(
            i,
            o,
            f,
            v,
            a
          );
      }
      e = e.sibling;
    }
  }
  function ni(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            ni(l, n), a & 2048 && Us(
              n.alternate,
              n
            );
            break;
          case 24:
            ni(l, n), a & 2048 && Hs(n.alternate, n);
            break;
          default:
            ni(l, n);
        }
        e = e.sibling;
      }
  }
  var ai = 8192;
  function oa(t, e, l) {
    if (t.subtreeFlags & ai)
      for (t = t.child; t !== null; )
        Md(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Md(t, e, l) {
    switch (t.tag) {
      case 26:
        oa(
          t,
          e,
          l
        ), t.flags & ai && t.memoizedState !== null && kg(
          l,
          ll,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        oa(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = ll;
        ll = Uu(t.stateNode.containerInfo), oa(
          t,
          e,
          l
        ), ll = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = ai, ai = 16777216, oa(
          t,
          e,
          l
        ), ai = n) : oa(
          t,
          e,
          l
        ));
        break;
      default:
        oa(
          t,
          e,
          l
        );
    }
  }
  function Od(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function ii(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          te = n, Rd(
            n,
            t
          );
        }
      Od(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Cd(t), t = t.sibling;
  }
  function Cd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ii(t), t.flags & 2048 && kl(9, t, t.return);
        break;
      case 3:
        ii(t);
        break;
      case 12:
        ii(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Eu(t)) : ii(t);
        break;
      default:
        ii(t);
    }
  }
  function Eu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          te = n, Rd(
            n,
            t
          );
        }
      Od(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, e, e.return), Eu(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Eu(e));
          break;
        default:
          Eu(e);
      }
      t = t.sibling;
    }
  }
  function Rd(t, e) {
    for (; te !== null; ) {
      var l = te;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Xa(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, te = n;
      else
        t: for (l = t; te !== null; ) {
          n = te;
          var a = n.sibling, i = n.return;
          if (Ed(n), n === l) {
            te = null;
            break t;
          }
          if (a !== null) {
            a.return = i, te = a;
            break t;
          }
          te = i;
        }
    }
  }
  var og = {
    getCacheForType: function(t) {
      var e = ue(Qt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ue(Qt).controller.signal;
    }
  }, rg = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Nt = null, st = null, rt = 0, zt = 0, je = null, $l = !1, ra = !1, Bs = !1, jl = 0, Bt = 0, Wl = 0, Rn = 0, qs = 0, we = 0, fa = 0, ui = null, _e = null, Ys = !1, zu = 0, jd = 0, _u = 1 / 0, Tu = null, Fl = null, $t = 0, Il = null, da = null, wl = 0, Ls = 0, Gs = null, wd = null, ci = 0, Xs = null;
  function Ue() {
    return (xt & 2) !== 0 && rt !== 0 ? rt & -rt : O.T !== null ? ks() : tl();
  }
  function Ud() {
    if (we === 0)
      if ((rt & 536870912) === 0 || ht) {
        var t = Un;
        Un <<= 1, (Un & 3932160) === 0 && (Un = 262144), we = t;
      } else we = 536870912;
    return t = Ce.current, t !== null && (t.flags |= 32), we;
  }
  function Te(t, e, l) {
    (t === Nt && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (ma(t, 0), Pl(
      t,
      rt,
      we,
      !1
    )), qe(t, l), ((xt & 2) === 0 || t !== Nt) && (t === Nt && ((xt & 2) === 0 && (Rn |= l), Bt === 4 && Pl(
      t,
      rt,
      we,
      !1
    )), dl(t));
  }
  function Hd(t, e, l) {
    if ((xt & 6) !== 0) throw Error(r(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ge(t, e), a = n ? mg(t, e) : Zs(t, e, !0), i = n;
    do {
      if (a === 0) {
        ra && !n && Pl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, i && !fg(l)) {
          a = Zs(t, e, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = e, t.errorRecoveryDisabledLanes & i)
            var o = 0;
          else
            o = t.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
          if (o !== 0) {
            e = o;
            t: {
              var f = t;
              a = ui;
              var v = f.current.memoizedState.isDehydrated;
              if (v && (ma(f, o).flags |= 256), o = Zs(
                f,
                o,
                !1
              ), o !== 2) {
                if (Bs && !v) {
                  f.errorRecoveryDisabledLanes |= i, Rn |= i, a = 4;
                  break t;
                }
                i = _e, _e = a, i !== null && (_e === null ? _e = i : _e.push.apply(
                  _e,
                  i
                ));
              }
              a = o;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          ma(t, 0), Pl(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, i = a, i) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Pl(
                n,
                e,
                we,
                !$l
              );
              break t;
            case 2:
              _e = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (a = zu + 300 - oe(), 10 < a)) {
            if (Pl(
              n,
              e,
              we,
              !$l
            ), It(n, 0, !0) !== 0) break t;
            wl = e, n.timeoutHandle = mm(
              Bd.bind(
                null,
                n,
                l,
                _e,
                Tu,
                Ys,
                e,
                we,
                Rn,
                fa,
                $l,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          Bd(
            n,
            l,
            _e,
            Tu,
            Ys,
            e,
            we,
            Rn,
            fa,
            $l,
            i,
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
  function Bd(t, e, l, n, a, i, o, f, v, _, R, w, A, N) {
    if (t.timeoutHandle = -1, w = e.subtreeFlags, w & 8192 || (w & 16785408) === 16785408) {
      w = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: bl
      }, Md(
        e,
        i,
        w
      );
      var X = (i & 62914560) === i ? zu - oe() : (i & 4194048) === i ? jd - oe() : 0;
      if (X = $g(
        w,
        X
      ), X !== null) {
        wl = i, t.cancelPendingCommit = X(
          Vd.bind(
            null,
            t,
            e,
            i,
            l,
            n,
            a,
            o,
            f,
            v,
            R,
            w,
            null,
            A,
            N
          )
        ), Pl(t, i, o, !_);
        return;
      }
    }
    Vd(
      t,
      e,
      i,
      l,
      n,
      a,
      o,
      f,
      v
    );
  }
  function fg(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], i = a.getSnapshot;
          a = a.value;
          try {
            if (!Me(i(), a)) return !1;
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
  function Pl(t, e, l, n) {
    e &= ~qs, e &= ~Rn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var i = 31 - re(a), o = 1 << i;
      n[i] = -1, a &= ~o;
    }
    l !== 0 && Pe(t, l, e);
  }
  function Au() {
    return (xt & 6) === 0 ? (si(0), !1) : !0;
  }
  function Qs() {
    if (st !== null) {
      if (zt === 0)
        var t = st.return;
      else
        t = st, zl = zn = null, is(t), na = null, Za = 0, t = st;
      for (; t !== null; )
        hd(t.alternate, t), t = t.return;
      st = null;
    }
  }
  function ma(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, Cg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), wl = 0, Qs(), Nt = t, st = l = xl(t.current, null), rt = e, zt = 0, je = null, $l = !1, ra = ge(t, e), Bs = !1, fa = we = qs = Rn = Wl = Bt = 0, _e = ui = null, Ys = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - re(n), i = 1 << a;
        e |= t[a], n &= ~i;
      }
    return jl = e, Ji(), l;
  }
  function qd(t, e) {
    at = null, O.H = Ia, e === la || e === eu ? (e = Pr(), zt = 3) : e === Jc ? (e = Pr(), zt = 4) : zt = e === xs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, je = e, st === null && (Bt = 1, vu(
      t,
      Ze(e, t.current)
    ));
  }
  function Yd() {
    var t = Ce.current;
    return t === null ? !0 : (rt & 4194048) === rt ? ke === null : (rt & 62914560) === rt || (rt & 536870912) !== 0 ? t === ke : !1;
  }
  function Ld() {
    var t = O.H;
    return O.H = Ia, t === null ? Ia : t;
  }
  function Gd() {
    var t = O.A;
    return O.A = og, t;
  }
  function Du() {
    Bt = 4, $l || (rt & 4194048) !== rt && Ce.current !== null || (ra = !0), (Wl & 134217727) === 0 && (Rn & 134217727) === 0 || Nt === null || Pl(
      Nt,
      rt,
      we,
      !1
    );
  }
  function Zs(t, e, l) {
    var n = xt;
    xt |= 2;
    var a = Ld(), i = Gd();
    (Nt !== t || rt !== e) && (Tu = null, ma(t, e)), e = !1;
    var o = Bt;
    t: do
      try {
        if (zt !== 0 && st !== null) {
          var f = st, v = je;
          switch (zt) {
            case 8:
              Qs(), o = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ce.current === null && (e = !0);
              var _ = zt;
              if (zt = 0, je = null, ha(t, f, v, _), l && ra) {
                o = 0;
                break t;
              }
              break;
            default:
              _ = zt, zt = 0, je = null, ha(t, f, v, _);
          }
        }
        dg(), o = Bt;
        break;
      } catch (R) {
        qd(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, zl = zn = null, xt = n, O.H = a, O.A = i, st === null && (Nt = null, rt = 0, Ji()), o;
  }
  function dg() {
    for (; st !== null; ) Xd(st);
  }
  function mg(t, e) {
    var l = xt;
    xt |= 2;
    var n = Ld(), a = Gd();
    Nt !== t || rt !== e ? (Tu = null, _u = oe() + 500, ma(t, e)) : ra = ge(
      t,
      e
    );
    t: do
      try {
        if (zt !== 0 && st !== null) {
          e = st;
          var i = je;
          e: switch (zt) {
            case 1:
              zt = 0, je = null, ha(t, e, i, 1);
              break;
            case 2:
            case 9:
              if (Fr(i)) {
                zt = 0, je = null, Qd(e);
                break;
              }
              e = function() {
                zt !== 2 && zt !== 9 || Nt !== t || (zt = 7), dl(t);
              }, i.then(e, e);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              Fr(i) ? (zt = 0, je = null, Qd(e)) : (zt = 0, je = null, ha(t, e, i, 7));
              break;
            case 5:
              var o = null;
              switch (st.tag) {
                case 26:
                  o = st.memoizedState;
                case 5:
                case 27:
                  var f = st;
                  if (o ? Nm(o) : f.stateNode.complete) {
                    zt = 0, je = null;
                    var v = f.sibling;
                    if (v !== null) st = v;
                    else {
                      var _ = f.return;
                      _ !== null ? (st = _, Nu(_)) : st = null;
                    }
                    break e;
                  }
              }
              zt = 0, je = null, ha(t, e, i, 5);
              break;
            case 6:
              zt = 0, je = null, ha(t, e, i, 6);
              break;
            case 8:
              Qs(), Bt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        hg();
        break;
      } catch (R) {
        qd(t, R);
      }
    while (!0);
    return zl = zn = null, O.H = n, O.A = a, xt = l, st !== null ? 0 : (Nt = null, rt = 0, Ji(), Bt);
  }
  function hg() {
    for (; st !== null && !jn(); )
      Xd(st);
  }
  function Xd(t) {
    var e = dd(t.alternate, t, jl);
    t.memoizedProps = t.pendingProps, e === null ? Nu(t) : st = e;
  }
  function Qd(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = ud(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          rt
        );
        break;
      case 11:
        e = ud(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          rt
        );
        break;
      case 5:
        is(e);
      default:
        hd(l, e), e = st = Lr(e, jl), e = dd(l, e, jl);
    }
    t.memoizedProps = t.pendingProps, e === null ? Nu(t) : st = e;
  }
  function ha(t, e, l, n) {
    zl = zn = null, is(e), na = null, Za = 0;
    var a = e.return;
    try {
      if (lg(
        t,
        a,
        e,
        l,
        rt
      )) {
        Bt = 1, vu(
          t,
          Ze(l, t.current)
        ), st = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw st = a, i;
      Bt = 1, vu(
        t,
        Ze(l, t.current)
      ), st = null;
      return;
    }
    e.flags & 32768 ? (ht || n === 1 ? t = !0 : ra || (rt & 536870912) !== 0 ? t = !1 : ($l = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ce.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Zd(e, t)) : Nu(e);
  }
  function Nu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Zd(
          e,
          $l
        );
        return;
      }
      t = e.return;
      var l = ig(
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
    Bt === 0 && (Bt = 5);
  }
  function Zd(t, e) {
    do {
      var l = ug(t.alternate, t);
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
    Bt = 6, st = null;
  }
  function Vd(t, e, l, n, a, i, o, f, v) {
    t.cancelPendingCommit = null;
    do
      Mu();
    while ($t !== 0);
    if ((xt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (i = e.lanes | e.childLanes, i |= Rc, kt(
        t,
        l,
        i,
        o,
        f,
        v
      ), t === Nt && (st = Nt = null, rt = 0), da = e, Il = t, wl = l, Ls = i, Gs = a, wd = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, pg(Ie, function() {
        return Wd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null, a = B.p, B.p = 2, o = xt, xt |= 4;
        try {
          cg(t, e, l);
        } finally {
          xt = o, B.p = a, O.T = n;
        }
      }
      $t = 1, Kd(), Jd(), kd();
    }
  }
  function Kd() {
    if ($t === 1) {
      $t = 0;
      var t = Il, e = da, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null;
        var n = B.p;
        B.p = 2;
        var a = xt;
        xt |= 4;
        try {
          Ad(e, t);
          var i = lo, o = Cr(t.containerInfo), f = i.focusedElem, v = i.selectionRange;
          if (o !== f && f && f.ownerDocument && Or(
            f.ownerDocument.documentElement,
            f
          )) {
            if (v !== null && Dc(f)) {
              var _ = v.start, R = v.end;
              if (R === void 0 && (R = _), "selectionStart" in f)
                f.selectionStart = _, f.selectionEnd = Math.min(
                  R,
                  f.value.length
                );
              else {
                var w = f.ownerDocument || document, A = w && w.defaultView || window;
                if (A.getSelection) {
                  var N = A.getSelection(), X = f.textContent.length, $ = Math.min(v.start, X), Dt = v.end === void 0 ? $ : Math.min(v.end, X);
                  !N.extend && $ > Dt && (o = Dt, Dt = $, $ = o);
                  var E = Mr(
                    f,
                    $
                  ), p = Mr(
                    f,
                    Dt
                  );
                  if (E && p && (N.rangeCount !== 1 || N.anchorNode !== E.node || N.anchorOffset !== E.offset || N.focusNode !== p.node || N.focusOffset !== p.offset)) {
                    var z = w.createRange();
                    z.setStart(E.node, E.offset), N.removeAllRanges(), $ > Dt ? (N.addRange(z), N.extend(p.node, p.offset)) : (z.setEnd(p.node, p.offset), N.addRange(z));
                  }
                }
              }
            }
            for (w = [], N = f; N = N.parentNode; )
              N.nodeType === 1 && w.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < w.length; f++) {
              var j = w[f];
              j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
            }
          }
          Gu = !!eo, lo = eo = null;
        } finally {
          xt = a, B.p = n, O.T = l;
        }
      }
      t.current = e, $t = 2;
    }
  }
  function Jd() {
    if ($t === 2) {
      $t = 0;
      var t = Il, e = da, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = O.T, O.T = null;
        var n = B.p;
        B.p = 2;
        var a = xt;
        xt |= 4;
        try {
          xd(t, e.alternate, e);
        } finally {
          xt = a, B.p = n, O.T = l;
        }
      }
      $t = 3;
    }
  }
  function kd() {
    if ($t === 4 || $t === 3) {
      $t = 0, Ri();
      var t = Il, e = da, l = wl, n = wd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? $t = 5 : ($t = 0, da = Il = null, $d(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Fl = null), yl(l), e = e.stateNode, me && typeof me.onCommitFiberRoot == "function")
        try {
          me.onCommitFiberRoot(
            vn,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = O.T, a = B.p, B.p = 2, O.T = null;
        try {
          for (var i = t.onRecoverableError, o = 0; o < n.length; o++) {
            var f = n[o];
            i(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          O.T = e, B.p = a;
        }
      }
      (wl & 3) !== 0 && Mu(), dl(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === Xs ? ci++ : (ci = 0, Xs = t) : ci = 0, si(0);
    }
  }
  function $d(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Xa(e)));
  }
  function Mu() {
    return Kd(), Jd(), kd(), Wd();
  }
  function Wd() {
    if ($t !== 5) return !1;
    var t = Il, e = Ls;
    Ls = 0;
    var l = yl(wl), n = O.T, a = B.p;
    try {
      B.p = 32 > l ? 32 : l, O.T = null, l = Gs, Gs = null;
      var i = Il, o = wl;
      if ($t = 0, da = Il = null, wl = 0, (xt & 6) !== 0) throw Error(r(331));
      var f = xt;
      if (xt |= 4, Cd(i.current), Nd(
        i,
        i.current,
        o,
        l
      ), xt = f, si(0, !1), me && typeof me.onPostCommitFiberRoot == "function")
        try {
          me.onPostCommitFiberRoot(vn, i);
        } catch {
        }
      return !0;
    } finally {
      B.p = a, O.T = n, $d(t, e);
    }
  }
  function Fd(t, e, l) {
    e = Ze(l, e), e = Ss(t.stateNode, e, 2), t = Vl(t, e, 2), t !== null && (qe(t, 2), dl(t));
  }
  function _t(t, e, l) {
    if (t.tag === 3)
      Fd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Fd(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Fl === null || !Fl.has(n))) {
            t = Ze(l, t), l = If(2), n = Vl(e, l, 2), n !== null && (Pf(
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
  function Vs(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new rg();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (Bs = !0, a.add(l), t = vg.bind(null, t, e, l), e.then(t, t));
  }
  function vg(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Nt === t && (rt & l) === l && (Bt === 4 || Bt === 3 && (rt & 62914560) === rt && 300 > oe() - zu ? (xt & 2) === 0 && ma(t, 0) : qs |= l, fa === rt && (fa = 0)), dl(t);
  }
  function Id(t, e) {
    e === 0 && (e = fe()), t = Sn(t, e), t !== null && (qe(t, e), dl(t));
  }
  function gg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Id(t, l);
  }
  function yg(t, e) {
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
        throw Error(r(314));
    }
    n !== null && n.delete(e), Id(t, l);
  }
  function pg(t, e) {
    return He(t, e);
  }
  var Ou = null, va = null, Ks = !1, Cu = !1, Js = !1, tn = 0;
  function dl(t) {
    t !== va && t.next === null && (va === null ? Ou = va = t : va = va.next = t), Cu = !0, Ks || (Ks = !0, Sg());
  }
  function si(t, e) {
    if (!Js && Cu) {
      Js = !0;
      do
        for (var l = !1, n = Ou; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var o = n.suspendedLanes, f = n.pingedLanes;
              i = (1 << 31 - re(42 | t) + 1) - 1, i &= a & ~(o & ~f), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (l = !0, lm(n, i));
          } else
            i = rt, i = It(
              n,
              n === Nt ? i : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (i & 3) === 0 || ge(n, i) || (l = !0, lm(n, i));
          n = n.next;
        }
      while (l);
      Js = !1;
    }
  }
  function bg() {
    Pd();
  }
  function Pd() {
    Cu = Ks = !1;
    var t = 0;
    tn !== 0 && Og() && (t = tn);
    for (var e = oe(), l = null, n = Ou; n !== null; ) {
      var a = n.next, i = tm(n, e);
      i === 0 ? (n.next = null, l === null ? Ou = a : l.next = a, a === null && (va = l)) : (l = n, (t !== 0 || (i & 3) !== 0) && (Cu = !0)), n = a;
    }
    $t !== 0 && $t !== 5 || si(t), tn !== 0 && (tn = 0);
  }
  function tm(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
      var o = 31 - re(i), f = 1 << o, v = a[o];
      v === -1 ? ((f & l) === 0 || (f & n) !== 0) && (a[o] = ye(f, e)) : v <= e && (t.expiredLanes |= f), i &= ~f;
    }
    if (e = Nt, l = rt, l = It(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Hl(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || ge(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && Hl(n), yl(l)) {
        case 2:
        case 8:
          l = vl;
          break;
        case 32:
          l = Ie;
          break;
        case 268435456:
          l = Na;
          break;
        default:
          l = Ie;
      }
      return n = em.bind(null, t), l = He(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && Hl(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function em(t, e) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Mu() && t.callbackNode !== l)
      return null;
    var n = rt;
    return n = It(
      t,
      t === Nt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (Hd(t, n, e), tm(t, oe()), t.callbackNode != null && t.callbackNode === l ? em.bind(null, t) : null);
  }
  function lm(t, e) {
    if (Mu()) return null;
    Hd(t, e, !0);
  }
  function Sg() {
    Rg(function() {
      (xt & 6) !== 0 ? He(
        ji,
        bg
      ) : Pd();
    });
  }
  function ks() {
    if (tn === 0) {
      var t = ta;
      t === 0 && (t = wn, wn <<= 1, (wn & 261888) === 0 && (wn = 256)), tn = t;
    }
    return tn;
  }
  function nm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Yi("" + t);
  }
  function am(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function xg(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var i = nm(
        (a[be] || null).action
      ), o = n.submitter;
      o && (e = (e = o[be] || null) ? nm(e.formAction) : o.getAttribute("formAction"), e !== null && (i = e, o = null));
      var f = new Qi(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (tn !== 0) {
                  var v = o ? am(a, o) : new FormData(a);
                  hs(
                    l,
                    {
                      pending: !0,
                      data: v,
                      method: a.method,
                      action: i
                    },
                    null,
                    v
                  );
                }
              } else
                typeof i == "function" && (f.preventDefault(), v = o ? am(a, o) : new FormData(a), hs(
                  l,
                  {
                    pending: !0,
                    data: v,
                    method: a.method,
                    action: i
                  },
                  i,
                  v
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var $s = 0; $s < Cc.length; $s++) {
    var Ws = Cc[$s], Eg = Ws.toLowerCase(), zg = Ws[0].toUpperCase() + Ws.slice(1);
    el(
      Eg,
      "on" + zg
    );
  }
  el(wr, "onAnimationEnd"), el(Ur, "onAnimationIteration"), el(Hr, "onAnimationStart"), el("dblclick", "onDoubleClick"), el("focusin", "onFocus"), el("focusout", "onBlur"), el(Yv, "onTransitionRun"), el(Lv, "onTransitionStart"), el(Gv, "onTransitionCancel"), el(Br, "onTransitionEnd"), Ln("onMouseEnter", ["mouseout", "mouseover"]), Ln("onMouseLeave", ["mouseout", "mouseover"]), Ln("onPointerEnter", ["pointerout", "pointerover"]), Ln("onPointerLeave", ["pointerout", "pointerover"]), gn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), gn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), gn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), gn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), gn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), gn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var oi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), _g = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(oi)
  );
  function im(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var o = n.length - 1; 0 <= o; o--) {
            var f = n[o], v = f.instance, _ = f.currentTarget;
            if (f = f.listener, v !== i && a.isPropagationStopped())
              break t;
            i = f, a.currentTarget = _;
            try {
              i(a);
            } catch (R) {
              Ki(R);
            }
            a.currentTarget = null, i = v;
          }
        else
          for (o = 0; o < n.length; o++) {
            if (f = n[o], v = f.instance, _ = f.currentTarget, f = f.listener, v !== i && a.isPropagationStopped())
              break t;
            i = f, a.currentTarget = _;
            try {
              i(a);
            } catch (R) {
              Ki(R);
            }
            a.currentTarget = null, i = v;
          }
      }
    }
  }
  function ot(t, e) {
    var l = e[oc];
    l === void 0 && (l = e[oc] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (um(e, t, 2, !1), l.add(n));
  }
  function Fs(t, e, l) {
    var n = 0;
    e && (n |= 4), um(
      l,
      t,
      n,
      e
    );
  }
  var Ru = "_reactListening" + Math.random().toString(36).slice(2);
  function Is(t) {
    if (!t[Ru]) {
      t[Ru] = !0, Io.forEach(function(l) {
        l !== "selectionchange" && (_g.has(l) || Fs(l, !1, t), Fs(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ru] || (e[Ru] = !0, Fs("selectionchange", !1, e));
    }
  }
  function um(t, e, l, n) {
    switch (Um(e)) {
      case 2:
        var a = Ig;
        break;
      case 8:
        a = Pg;
        break;
      default:
        a = ho;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !pc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Ps(t, e, l, n, a) {
    var i = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var f = n.stateNode.containerInfo;
          if (f === a) break;
          if (o === 4)
            for (o = n.return; o !== null; ) {
              var v = o.tag;
              if ((v === 3 || v === 4) && o.stateNode.containerInfo === a)
                return;
              o = o.return;
            }
          for (; f !== null; ) {
            if (o = Bn(f), o === null) return;
            if (v = o.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              n = i = o;
              continue t;
            }
            f = f.parentNode;
          }
        }
        n = n.return;
      }
    rr(function() {
      var _ = i, R = gc(l), w = [];
      t: {
        var A = qr.get(t);
        if (A !== void 0) {
          var N = Qi, X = t;
          switch (t) {
            case "keypress":
              if (Gi(l) === 0) break t;
            case "keydown":
            case "keyup":
              N = yv;
              break;
            case "focusin":
              X = "focus", N = Ec;
              break;
            case "focusout":
              X = "blur", N = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              N = Ec;
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
              N = mr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = iv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = Sv;
              break;
            case wr:
            case Ur:
            case Hr:
              N = sv;
              break;
            case Br:
              N = Ev;
              break;
            case "scroll":
            case "scrollend":
              N = nv;
              break;
            case "wheel":
              N = _v;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = rv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = vr;
              break;
            case "toggle":
            case "beforetoggle":
              N = Av;
          }
          var $ = (e & 4) !== 0, Dt = !$ && (t === "scroll" || t === "scrollend"), E = $ ? A !== null ? A + "Capture" : null : A;
          $ = [];
          for (var p = _, z; p !== null; ) {
            var j = p;
            if (z = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || z === null || E === null || (j = Ca(p, E), j != null && $.push(
              ri(p, j, z)
            )), Dt) break;
            p = p.return;
          }
          0 < $.length && (A = new N(
            A,
            X,
            null,
            l,
            R
          ), w.push({ event: A, listeners: $ }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (A = t === "mouseover" || t === "pointerover", N = t === "mouseout" || t === "pointerout", A && l !== vc && (X = l.relatedTarget || l.fromElement) && (Bn(X) || X[Hn]))
            break t;
          if ((N || A) && (A = R.window === R ? R : (A = R.ownerDocument) ? A.defaultView || A.parentWindow : window, N ? (X = l.relatedTarget || l.toElement, N = _, X = X ? Bn(X) : null, X !== null && (Dt = d(X), $ = X.tag, X !== Dt || $ !== 5 && $ !== 27 && $ !== 6) && (X = null)) : (N = null, X = _), N !== X)) {
            if ($ = mr, j = "onMouseLeave", E = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && ($ = vr, j = "onPointerLeave", E = "onPointerEnter", p = "pointer"), Dt = N == null ? A : Oa(N), z = X == null ? A : Oa(X), A = new $(
              j,
              p + "leave",
              N,
              l,
              R
            ), A.target = Dt, A.relatedTarget = z, j = null, Bn(R) === _ && ($ = new $(
              E,
              p + "enter",
              X,
              l,
              R
            ), $.target = z, $.relatedTarget = Dt, j = $), Dt = j, N && X)
              e: {
                for ($ = Tg, E = N, p = X, z = 0, j = E; j; j = $(j))
                  z++;
                j = 0;
                for (var K = p; K; K = $(K))
                  j++;
                for (; 0 < z - j; )
                  E = $(E), z--;
                for (; 0 < j - z; )
                  p = $(p), j--;
                for (; z--; ) {
                  if (E === p || p !== null && E === p.alternate) {
                    $ = E;
                    break e;
                  }
                  E = $(E), p = $(p);
                }
                $ = null;
              }
            else $ = null;
            N !== null && cm(
              w,
              A,
              N,
              $,
              !1
            ), X !== null && Dt !== null && cm(
              w,
              Dt,
              X,
              $,
              !0
            );
          }
        }
        t: {
          if (A = _ ? Oa(_) : window, N = A.nodeName && A.nodeName.toLowerCase(), N === "select" || N === "input" && A.type === "file")
            var yt = zr;
          else if (xr(A))
            if (_r)
              yt = Hv;
            else {
              yt = wv;
              var V = jv;
            }
          else
            N = A.nodeName, !N || N.toLowerCase() !== "input" || A.type !== "checkbox" && A.type !== "radio" ? _ && hc(_.elementType) && (yt = zr) : yt = Uv;
          if (yt && (yt = yt(t, _))) {
            Er(
              w,
              yt,
              l,
              R
            );
            break t;
          }
          V && V(t, A, _), t === "focusout" && _ && A.type === "number" && _.memoizedProps.value != null && mc(A, "number", A.value);
        }
        switch (V = _ ? Oa(_) : window, t) {
          case "focusin":
            (xr(V) || V.contentEditable === "true") && (Kn = V, Nc = _, Ya = null);
            break;
          case "focusout":
            Ya = Nc = Kn = null;
            break;
          case "mousedown":
            Mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mc = !1, Rr(w, l, R);
            break;
          case "selectionchange":
            if (qv) break;
          case "keydown":
          case "keyup":
            Rr(w, l, R);
        }
        var it;
        if (_c)
          t: {
            switch (t) {
              case "compositionstart":
                var ft = "onCompositionStart";
                break t;
              case "compositionend":
                ft = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ft = "onCompositionUpdate";
                break t;
            }
            ft = void 0;
          }
        else
          Vn ? br(t, l) && (ft = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (ft = "onCompositionStart");
        ft && (gr && l.locale !== "ko" && (Vn || ft !== "onCompositionStart" ? ft === "onCompositionEnd" && Vn && (it = fr()) : (ql = R, bc = "value" in ql ? ql.value : ql.textContent, Vn = !0)), V = ju(_, ft), 0 < V.length && (ft = new hr(
          ft,
          t,
          null,
          l,
          R
        ), w.push({ event: ft, listeners: V }), it ? ft.data = it : (it = Sr(l), it !== null && (ft.data = it)))), (it = Nv ? Mv(t, l) : Ov(t, l)) && (ft = ju(_, "onBeforeInput"), 0 < ft.length && (V = new hr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          R
        ), w.push({
          event: V,
          listeners: ft
        }), V.data = it)), xg(
          w,
          t,
          _,
          l,
          R
        );
      }
      im(w, e);
    });
  }
  function ri(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function ju(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = Ca(t, l), a != null && n.unshift(
        ri(t, a, i)
      ), a = Ca(t, e), a != null && n.push(
        ri(t, a, i)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Tg(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function cm(t, e, l, n, a) {
    for (var i = e._reactName, o = []; l !== null && l !== n; ) {
      var f = l, v = f.alternate, _ = f.stateNode;
      if (f = f.tag, v !== null && v === n) break;
      f !== 5 && f !== 26 && f !== 27 || _ === null || (v = _, a ? (_ = Ca(l, i), _ != null && o.unshift(
        ri(l, _, v)
      )) : a || (_ = Ca(l, i), _ != null && o.push(
        ri(l, _, v)
      ))), l = l.return;
    }
    o.length !== 0 && t.push({ event: e, listeners: o });
  }
  var Ag = /\r\n?/g, Dg = /\u0000|\uFFFD/g;
  function sm(t) {
    return (typeof t == "string" ? t : "" + t).replace(Ag, `
`).replace(Dg, "");
  }
  function om(t, e) {
    return e = sm(e), sm(t) === e;
  }
  function At(t, e, l, n, a, i) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Xn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Xn(t, "" + n);
        break;
      case "className":
        Bi(t, "class", n);
        break;
      case "tabIndex":
        Bi(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Bi(t, l, n);
        break;
      case "style":
        sr(t, n, i);
        break;
      case "data":
        if (e !== "object") {
          Bi(t, "data", n);
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
        n = Yi("" + n), t.setAttribute(l, n);
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
          typeof i == "function" && (l === "formAction" ? (e !== "input" && At(t, e, "name", a.name, a, null), At(
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
        n = Yi("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = bl);
        break;
      case "onScroll":
        n != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
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
        l = Yi("" + n), t.setAttributeNS(
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
        ot("beforetoggle", t), ot("toggle", t), Hi(t, "popover", n);
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
        Hi(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = ev.get(l) || l, Hi(t, l, n));
    }
  }
  function to(t, e, l, n, a, i) {
    switch (l) {
      case "style":
        sr(t, n, i);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(r(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(r(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? Xn(t, n) : (typeof n == "number" || typeof n == "bigint") && Xn(t, "" + n);
        break;
      case "onScroll":
        n != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = bl);
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
        if (!Po.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), i = t[be] || null, i = i != null ? i[l] : null, typeof i == "function" && t.removeEventListener(e, i, a), typeof n == "function")) {
              typeof i != "function" && i !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : Hi(t, l, n);
          }
    }
  }
  function se(t, e, l) {
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
        ot("error", t), ot("load", t);
        var n = !1, a = !1, i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var o = l[i];
            if (o != null)
              switch (i) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  At(t, e, i, o, l, null);
              }
          }
        a && At(t, e, "srcSet", l.srcSet, l, null), n && At(t, e, "src", l.src, l, null);
        return;
      case "input":
        ot("invalid", t);
        var f = i = o = a = null, v = null, _ = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var R = l[n];
            if (R != null)
              switch (n) {
                case "name":
                  a = R;
                  break;
                case "type":
                  o = R;
                  break;
                case "checked":
                  v = R;
                  break;
                case "defaultChecked":
                  _ = R;
                  break;
                case "value":
                  i = R;
                  break;
                case "defaultValue":
                  f = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(r(137, e));
                  break;
                default:
                  At(t, e, n, R, l, null);
              }
          }
        ar(
          t,
          i,
          f,
          v,
          _,
          o,
          a,
          !1
        );
        return;
      case "select":
        ot("invalid", t), n = o = i = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (f = l[a], f != null))
            switch (a) {
              case "value":
                i = f;
                break;
              case "defaultValue":
                o = f;
                break;
              case "multiple":
                n = f;
              default:
                At(t, e, a, f, l, null);
            }
        e = i, l = o, t.multiple = !!n, e != null ? Gn(t, !!n, e, !1) : l != null && Gn(t, !!n, l, !0);
        return;
      case "textarea":
        ot("invalid", t), i = a = n = null;
        for (o in l)
          if (l.hasOwnProperty(o) && (f = l[o], f != null))
            switch (o) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                a = f;
                break;
              case "children":
                i = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                At(t, e, o, f, l, null);
            }
        ur(t, n, a, i);
        return;
      case "option":
        for (v in l)
          l.hasOwnProperty(v) && (n = l[v], n != null) && (v === "selected" ? t.selected = n && typeof n != "function" && typeof n != "symbol" : At(t, e, v, n, l, null));
        return;
      case "dialog":
        ot("beforetoggle", t), ot("toggle", t), ot("cancel", t), ot("close", t);
        break;
      case "iframe":
      case "object":
        ot("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < oi.length; n++)
          ot(oi[n], t);
        break;
      case "image":
        ot("error", t), ot("load", t);
        break;
      case "details":
        ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ot("error", t), ot("load", t);
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
        for (_ in l)
          if (l.hasOwnProperty(_) && (n = l[_], n != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                At(t, e, _, n, l, null);
            }
        return;
      default:
        if (hc(e)) {
          for (R in l)
            l.hasOwnProperty(R) && (n = l[R], n !== void 0 && to(
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
    for (f in l)
      l.hasOwnProperty(f) && (n = l[f], n != null && At(t, e, f, n, l, null));
  }
  function Ng(t, e, l, n) {
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
        var a = null, i = null, o = null, f = null, v = null, _ = null, R = null;
        for (N in l) {
          var w = l[N];
          if (l.hasOwnProperty(N) && w != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = w;
              default:
                n.hasOwnProperty(N) || At(t, e, N, null, n, w);
            }
        }
        for (var A in n) {
          var N = n[A];
          if (w = l[A], n.hasOwnProperty(A) && (N != null || w != null))
            switch (A) {
              case "type":
                i = N;
                break;
              case "name":
                a = N;
                break;
              case "checked":
                _ = N;
                break;
              case "defaultChecked":
                R = N;
                break;
              case "value":
                o = N;
                break;
              case "defaultValue":
                f = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(r(137, e));
                break;
              default:
                N !== w && At(
                  t,
                  e,
                  A,
                  N,
                  n,
                  w
                );
            }
        }
        dc(
          t,
          o,
          f,
          v,
          _,
          R,
          i,
          a
        );
        return;
      case "select":
        N = o = f = A = null;
        for (i in l)
          if (v = l[i], l.hasOwnProperty(i) && v != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                N = v;
              default:
                n.hasOwnProperty(i) || At(
                  t,
                  e,
                  i,
                  null,
                  n,
                  v
                );
            }
        for (a in n)
          if (i = n[a], v = l[a], n.hasOwnProperty(a) && (i != null || v != null))
            switch (a) {
              case "value":
                A = i;
                break;
              case "defaultValue":
                f = i;
                break;
              case "multiple":
                o = i;
              default:
                i !== v && At(
                  t,
                  e,
                  a,
                  i,
                  n,
                  v
                );
            }
        e = f, l = o, n = N, A != null ? Gn(t, !!l, A, !1) : !!n != !!l && (e != null ? Gn(t, !!l, e, !0) : Gn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = A = null;
        for (f in l)
          if (a = l[f], l.hasOwnProperty(f) && a != null && !n.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                At(t, e, f, null, n, a);
            }
        for (o in n)
          if (a = n[o], i = l[o], n.hasOwnProperty(o) && (a != null || i != null))
            switch (o) {
              case "value":
                A = a;
                break;
              case "defaultValue":
                N = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(r(91));
                break;
              default:
                a !== i && At(t, e, o, a, n, i);
            }
        ir(t, A, N);
        return;
      case "option":
        for (var X in l)
          A = l[X], l.hasOwnProperty(X) && A != null && !n.hasOwnProperty(X) && (X === "selected" ? t.selected = !1 : At(
            t,
            e,
            X,
            null,
            n,
            A
          ));
        for (v in n)
          A = n[v], N = l[v], n.hasOwnProperty(v) && A !== N && (A != null || N != null) && (v === "selected" ? t.selected = A && typeof A != "function" && typeof A != "symbol" : At(
            t,
            e,
            v,
            A,
            n,
            N
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
        for (var $ in l)
          A = l[$], l.hasOwnProperty($) && A != null && !n.hasOwnProperty($) && At(t, e, $, null, n, A);
        for (_ in n)
          if (A = n[_], N = l[_], n.hasOwnProperty(_) && A !== N && (A != null || N != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(r(137, e));
                break;
              default:
                At(
                  t,
                  e,
                  _,
                  A,
                  n,
                  N
                );
            }
        return;
      default:
        if (hc(e)) {
          for (var Dt in l)
            A = l[Dt], l.hasOwnProperty(Dt) && A !== void 0 && !n.hasOwnProperty(Dt) && to(
              t,
              e,
              Dt,
              void 0,
              n,
              A
            );
          for (R in n)
            A = n[R], N = l[R], !n.hasOwnProperty(R) || A === N || A === void 0 && N === void 0 || to(
              t,
              e,
              R,
              A,
              n,
              N
            );
          return;
        }
    }
    for (var E in l)
      A = l[E], l.hasOwnProperty(E) && A != null && !n.hasOwnProperty(E) && At(t, e, E, null, n, A);
    for (w in n)
      A = n[w], N = l[w], !n.hasOwnProperty(w) || A === N || A == null && N == null || At(t, e, w, A, n, N);
  }
  function rm(t) {
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
  function Mg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], i = a.transferSize, o = a.initiatorType, f = a.duration;
        if (i && f && rm(o)) {
          for (o = 0, f = a.responseEnd, n += 1; n < l.length; n++) {
            var v = l[n], _ = v.startTime;
            if (_ > f) break;
            var R = v.transferSize, w = v.initiatorType;
            R && rm(w) && (v = v.responseEnd, o += R * (v < f ? 1 : (f - _) / (v - _)));
          }
          if (--n, e += 8 * (i + o) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var eo = null, lo = null;
  function wu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function fm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function dm(t, e) {
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
  function no(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var ao = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === ao ? !1 : (ao = t, !0) : (ao = null, !1);
  }
  var mm = typeof setTimeout == "function" ? setTimeout : void 0, Cg = typeof clearTimeout == "function" ? clearTimeout : void 0, hm = typeof Promise == "function" ? Promise : void 0, Rg = typeof queueMicrotask == "function" ? queueMicrotask : typeof hm < "u" ? function(t) {
    return hm.resolve(null).then(t).catch(jg);
  } : mm;
  function jg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function en(t) {
    return t === "head";
  }
  function vm(t, e) {
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
          fi(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, fi(l);
          for (var i = l.firstChild; i; ) {
            var o = i.nextSibling, f = i.nodeName;
            i[Ma] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = o;
          }
        } else
          l === "body" && fi(t.ownerDocument.body);
      l = a;
    } while (l);
    ba(e);
  }
  function gm(t, e) {
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
  function io(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          io(l), rc(l);
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
  function wg(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Ma])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (i !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (i = t.getAttribute("src"), (i !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === i)
          return t;
      } else return t;
      if (t = $e(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Ug(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = $e(t.nextSibling), t === null)) return null;
    return t;
  }
  function ym(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = $e(t.nextSibling), t === null)) return null;
    return t;
  }
  function uo(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function co(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Hg(t, e) {
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
  var so = null;
  function pm(t) {
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
  function bm(t) {
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
  function Sm(t, e, l) {
    switch (e = wu(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function fi(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    rc(t);
  }
  var We = /* @__PURE__ */ new Map(), xm = /* @__PURE__ */ new Set();
  function Uu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ul = B.d;
  B.d = {
    f: Bg,
    r: qg,
    D: Yg,
    C: Lg,
    L: Gg,
    m: Xg,
    X: Zg,
    S: Qg,
    M: Vg
  };
  function Bg() {
    var t = Ul.f(), e = Au();
    return t || e;
  }
  function qg(t) {
    var e = qn(t);
    e !== null && e.tag === 5 && e.type === "form" ? qf(e) : Ul.r(t);
  }
  var ga = typeof document > "u" ? null : document;
  function Em(t, e, l) {
    var n = ga;
    if (n && typeof e == "string" && e) {
      var a = Xe(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), xm.has(a) || (xm.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), se(e, "link", t), Pt(e), n.head.appendChild(e)));
    }
  }
  function Yg(t) {
    Ul.D(t), Em("dns-prefetch", t, null);
  }
  function Lg(t, e) {
    Ul.C(t, e), Em("preconnect", t, e);
  }
  function Gg(t, e, l) {
    Ul.L(t, e, l);
    var n = ga;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + Xe(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + Xe(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + Xe(
        l.imageSizes
      ) + '"]')) : a += '[href="' + Xe(t) + '"]';
      var i = a;
      switch (e) {
        case "style":
          i = ya(t);
          break;
        case "script":
          i = pa(t);
      }
      We.has(i) || (t = T(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), We.set(i, t), n.querySelector(a) !== null || e === "style" && n.querySelector(di(i)) || e === "script" && n.querySelector(mi(i)) || (e = n.createElement("link"), se(e, "link", t), Pt(e), n.head.appendChild(e)));
    }
  }
  function Xg(t, e) {
    Ul.m(t, e);
    var l = ga;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Xe(n) + '"][href="' + Xe(t) + '"]', i = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = pa(t);
      }
      if (!We.has(i) && (t = T({ rel: "modulepreload", href: t }, e), We.set(i, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(mi(i)))
              return;
        }
        n = l.createElement("link"), se(n, "link", t), Pt(n), l.head.appendChild(n);
      }
    }
  }
  function Qg(t, e, l) {
    Ul.S(t, e, l);
    var n = ga;
    if (n && t) {
      var a = Yn(n).hoistableStyles, i = ya(t);
      e = e || "default";
      var o = a.get(i);
      if (!o) {
        var f = { loading: 0, preload: null };
        if (o = n.querySelector(
          di(i)
        ))
          f.loading = 5;
        else {
          t = T(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = We.get(i)) && oo(t, l);
          var v = o = n.createElement("link");
          Pt(v), se(v, "link", t), v._p = new Promise(function(_, R) {
            v.onload = _, v.onerror = R;
          }), v.addEventListener("load", function() {
            f.loading |= 1;
          }), v.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Hu(o, e, n);
        }
        o = {
          type: "stylesheet",
          instance: o,
          count: 1,
          state: f
        }, a.set(i, o);
      }
    }
  }
  function Zg(t, e) {
    Ul.X(t, e);
    var l = ga;
    if (l && t) {
      var n = Yn(l).hoistableScripts, a = pa(t), i = n.get(a);
      i || (i = l.querySelector(mi(a)), i || (t = T({ src: t, async: !0 }, e), (e = We.get(a)) && ro(t, e), i = l.createElement("script"), Pt(i), se(i, "link", t), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function Vg(t, e) {
    Ul.M(t, e);
    var l = ga;
    if (l && t) {
      var n = Yn(l).hoistableScripts, a = pa(t), i = n.get(a);
      i || (i = l.querySelector(mi(a)), i || (t = T({ src: t, async: !0, type: "module" }, e), (e = We.get(a)) && ro(t, e), i = l.createElement("script"), Pt(i), se(i, "link", t), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(a, i));
    }
  }
  function zm(t, e, l, n) {
    var a = (a = F.current) ? Uu(a) : null;
    if (!a) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = ya(l.href), l = Yn(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = ya(l.href);
          var i = Yn(
            a
          ).hoistableStyles, o = i.get(t);
          if (o || (a = a.ownerDocument || a, o = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(t, o), (i = a.querySelector(
            di(t)
          )) && !i._p && (o.instance = i, o.state.loading = 5), We.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, We.set(t, l), i || Kg(
            a,
            t,
            l,
            o.state
          ))), e && n === null)
            throw Error(r(528, ""));
          return o;
        }
        if (e && n !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = pa(l), l = Yn(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function ya(t) {
    return 'href="' + Xe(t) + '"';
  }
  function di(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function _m(t) {
    return T({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Kg(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), se(e, "link", l), Pt(e), t.head.appendChild(e));
  }
  function pa(t) {
    return '[src="' + Xe(t) + '"]';
  }
  function mi(t) {
    return "script[async]" + t;
  }
  function Tm(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Xe(l.href) + '"]'
          );
          if (n)
            return e.instance = n, Pt(n), n;
          var a = T({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Pt(n), se(n, "style", a), Hu(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = ya(l.href);
          var i = t.querySelector(
            di(a)
          );
          if (i)
            return e.state.loading |= 4, e.instance = i, Pt(i), i;
          n = _m(l), (a = We.get(a)) && oo(n, a), i = (t.ownerDocument || t).createElement("link"), Pt(i);
          var o = i;
          return o._p = new Promise(function(f, v) {
            o.onload = f, o.onerror = v;
          }), se(i, "link", n), e.state.loading |= 4, Hu(i, l.precedence, t), e.instance = i;
        case "script":
          return i = pa(l.src), (a = t.querySelector(
            mi(i)
          )) ? (e.instance = a, Pt(a), a) : (n = l, (a = We.get(i)) && (n = T({}, l), ro(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Pt(a), se(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, Hu(n, l.precedence, t));
    return e.instance;
  }
  function Hu(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, i = a, o = 0; o < n.length; o++) {
      var f = n[o];
      if (f.dataset.precedence === e) i = f;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(t, i.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function oo(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function ro(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Bu = null;
  function Am(t, e, l) {
    if (Bu === null) {
      var n = /* @__PURE__ */ new Map(), a = Bu = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Bu, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var i = l[a];
      if (!(i[Ma] || i[ae] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = i.getAttribute(e) || "";
        o = t + o;
        var f = n.get(o);
        f ? f.push(i) : n.set(o, [i]);
      }
    }
    return n;
  }
  function Dm(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Jg(t, e, l) {
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
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Nm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function kg(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = ya(n.href), i = e.querySelector(
          di(a)
        );
        if (i) {
          e = i._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = qu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = i, Pt(i);
          return;
        }
        i = e.ownerDocument || e, n = _m(n), (a = We.get(a)) && oo(n, a), i = i.createElement("link"), Pt(i);
        var o = i;
        o._p = new Promise(function(f, v) {
          o.onload = f, o.onerror = v;
        }), se(i, "link", n), l.instance = i;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = qu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var fo = 0;
  function $g(t, e) {
    return t.stylesheets && t.count === 0 && Lu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && Lu(t, t.stylesheets), t.unsuspend) {
          var i = t.unsuspend;
          t.unsuspend = null, i();
        }
      }, 6e4 + e);
      0 < t.imgBytes && fo === 0 && (fo = 62500 * Mg());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Lu(t, t.stylesheets), t.unsuspend)) {
            var i = t.unsuspend;
            t.unsuspend = null, i();
          }
        },
        (t.imgBytes > fo ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function qu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Yu = null;
  function Lu(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Yu = /* @__PURE__ */ new Map(), e.forEach(Wg, t), Yu = null, qu.call(t));
  }
  function Wg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Yu.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Yu.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var o = a[i];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (l.set(o.dataset.precedence, o), n = o);
        }
        n && l.set(null, n);
      }
      a = e.instance, o = a.getAttribute("data-precedence"), i = l.get(o) || n, i === n && l.set(null, a), l.set(o, a), this.count++, n = qu.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), i ? i.parentNode.insertBefore(a, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var hi = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function Fg(t, e, l, n, a, i, o, f, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pe(0), this.hiddenUpdates = pe(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Mm(t, e, l, n, a, i, o, f, v, _, R, w) {
    return t = new Fg(
      t,
      e,
      l,
      o,
      v,
      _,
      R,
      w,
      f
    ), e = 1, i === !0 && (e |= 24), i = Oe(3, null, null, e), t.current = i, i.stateNode = t, e = Zc(), e.refCount++, t.pooledCache = e, e.refCount++, i.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, kc(i), t;
  }
  function Om(t) {
    return t ? (t = $n, t) : $n;
  }
  function Cm(t, e, l, n, a, i) {
    a = Om(a), n.context === null ? n.context = a : n.pendingContext = a, n = Zl(e), n.payload = { element: l }, i = i === void 0 ? null : i, i !== null && (n.callback = i), l = Vl(t, n, e), l !== null && (Te(l, t, e), Ka(l, t, e));
  }
  function Rm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function mo(t, e) {
    Rm(t, e), (t = t.alternate) && Rm(t, e);
  }
  function jm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Sn(t, 67108864);
      e !== null && Te(e, t, 67108864), mo(t, 67108864);
    }
  }
  function wm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ue();
      e = gl(e);
      var l = Sn(t, e);
      l !== null && Te(l, t, e), mo(t, e);
    }
  }
  var Gu = !0;
  function Ig(t, e, l, n) {
    var a = O.T;
    O.T = null;
    var i = B.p;
    try {
      B.p = 2, ho(t, e, l, n);
    } finally {
      B.p = i, O.T = a;
    }
  }
  function Pg(t, e, l, n) {
    var a = O.T;
    O.T = null;
    var i = B.p;
    try {
      B.p = 8, ho(t, e, l, n);
    } finally {
      B.p = i, O.T = a;
    }
  }
  function ho(t, e, l, n) {
    if (Gu) {
      var a = vo(n);
      if (a === null)
        Ps(
          t,
          e,
          n,
          Xu,
          l
        ), Hm(t, n);
      else if (e0(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (Hm(t, n), e & 4 && -1 < t0.indexOf(t)) {
        for (; a !== null; ) {
          var i = qn(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var o = Yt(i.pendingLanes);
                  if (o !== 0) {
                    var f = i;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; o; ) {
                      var v = 1 << 31 - re(o);
                      f.entanglements[1] |= v, o &= ~v;
                    }
                    dl(i), (xt & 6) === 0 && (_u = oe() + 500, si(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Sn(i, 2), f !== null && Te(f, i, 2), Au(), mo(i, 2);
            }
          if (i = vo(n), i === null && Ps(
            t,
            e,
            n,
            Xu,
            l
          ), i === a) break;
          a = i;
        }
        a !== null && n.stopPropagation();
      } else
        Ps(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function vo(t) {
    return t = gc(t), go(t);
  }
  var Xu = null;
  function go(t) {
    if (Xu = null, t = Bn(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = y(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = S(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Xu = t, null;
  }
  function Um(t) {
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
        switch (uc()) {
          case ji:
            return 2;
          case vl:
            return 8;
          case Ie:
          case hn:
            return 32;
          case Na:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yo = !1, ln = null, nn = null, an = null, vi = /* @__PURE__ */ new Map(), gi = /* @__PURE__ */ new Map(), un = [], t0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ln = null;
        break;
      case "dragenter":
      case "dragleave":
        nn = null;
        break;
      case "mouseover":
      case "mouseout":
        an = null;
        break;
      case "pointerover":
      case "pointerout":
        vi.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gi.delete(e.pointerId);
    }
  }
  function yi(t, e, l, n, a, i) {
    return t === null || t.nativeEvent !== i ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: i,
      targetContainers: [a]
    }, e !== null && (e = qn(e), e !== null && jm(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function e0(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return ln = yi(
          ln,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return nn = yi(
          nn,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return an = yi(
          an,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return vi.set(
          i,
          yi(
            vi.get(i) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, gi.set(
          i,
          yi(
            gi.get(i) || null,
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
  function Bm(t) {
    var e = Bn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = y(l), e !== null) {
            t.blockedOn = e, Bl(t.priority, function() {
              wm(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = S(l), e !== null) {
            t.blockedOn = e, Bl(t.priority, function() {
              wm(l);
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
  function Qu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = vo(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        vc = n, l.target.dispatchEvent(n), vc = null;
      } else
        return e = qn(l), e !== null && jm(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function qm(t, e, l) {
    Qu(t) && l.delete(e);
  }
  function l0() {
    yo = !1, ln !== null && Qu(ln) && (ln = null), nn !== null && Qu(nn) && (nn = null), an !== null && Qu(an) && (an = null), vi.forEach(qm), gi.forEach(qm);
  }
  function Zu(t, e) {
    t.blockedOn === e && (t.blockedOn = null, yo || (yo = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      l0
    )));
  }
  var Vu = null;
  function Ym(t) {
    Vu !== t && (Vu = t, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        Vu === t && (Vu = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (go(n || l) === null)
              continue;
            break;
          }
          var i = qn(l);
          i !== null && (t.splice(e, 3), e -= 3, hs(
            i,
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
      return Zu(v, t);
    }
    ln !== null && Zu(ln, t), nn !== null && Zu(nn, t), an !== null && Zu(an, t), vi.forEach(e), gi.forEach(e);
    for (var l = 0; l < un.length; l++) {
      var n = un[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < un.length && (l = un[0], l.blockedOn === null); )
      Bm(l), l.blockedOn === null && un.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], i = l[n + 1], o = a[be] || null;
        if (typeof i == "function")
          o || Ym(l);
        else if (o) {
          var f = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, o = i[be] || null)
              f = o.formAction;
            else if (go(a) !== null) continue;
          } else f = o.action;
          typeof f == "function" ? l[n + 1] = f : (l.splice(n, 3), n -= 3), Ym(l);
        }
      }
  }
  function Lm() {
    function t(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(o) {
            return a = o;
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
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
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
  function po(t) {
    this._internalRoot = t;
  }
  Ku.prototype.render = po.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var l = e.current, n = Ue();
    Cm(l, n, t, e, null, null);
  }, Ku.prototype.unmount = po.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Cm(t.current, 2, null, t, null, null), Au(), e[Hn] = null;
    }
  };
  function Ku(t) {
    this._internalRoot = t;
  }
  Ku.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = tl();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < un.length && e !== 0 && e < un[l].priority; l++) ;
      un.splice(l, 0, t), l === 0 && Bm(t);
    }
  };
  var Gm = c.version;
  if (Gm !== "19.2.7")
    throw Error(
      r(
        527,
        Gm,
        "19.2.7"
      )
    );
  B.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = h(e), t = t !== null ? M(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var n0 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ju = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ju.isDisabled && Ju.supportsFiber)
      try {
        vn = Ju.inject(
          n0
        ), me = Ju;
      } catch {
      }
  }
  return bi.createRoot = function(t, e) {
    if (!m(t)) throw Error(r(299));
    var l = !1, n = "", a = kf, i = $f, o = Wf;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (o = e.onRecoverableError)), e = Mm(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      i,
      o,
      Lm
    ), t[Hn] = e.current, Is(t), new po(e);
  }, bi.hydrateRoot = function(t, e, l) {
    if (!m(t)) throw Error(r(299));
    var n = !1, a = "", i = kf, o = $f, f = Wf, v = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (o = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), e = Mm(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      v,
      i,
      o,
      f,
      Lm
    ), e.context = Om(null), l = e.current, n = Ue(), n = gl(n), a = Zl(n), a.callback = null, Vl(l, a, n), l = n, e.current.lanes = l, qe(e, l), dl(e), t[Hn] = e.current, Is(t), new Ku(e);
  }, bi.version = "19.2.7", bi;
}
var Fm;
function v0() {
  if (Fm) return So.exports;
  Fm = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
  }
  return u(), So.exports = h0(), So.exports;
}
var g0 = v0(), D = Yo();
const Ae = /* @__PURE__ */ c0(D);
var Si = vh();
function y0() {
  for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
    c[s] = arguments[s];
  return D.useMemo(
    () => (r) => {
      c.forEach((m) => m(r));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    c
  );
}
const lc = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function _a(u) {
  const c = Object.prototype.toString.call(u);
  return c === "[object Window]" || // In Electron context the Window object serializes to [object global]
  c === "[object global]";
}
function Lo(u) {
  return "nodeType" in u;
}
function De(u) {
  var c, s;
  return u ? _a(u) ? u : Lo(u) && (c = (s = u.ownerDocument) == null ? void 0 : s.defaultView) != null ? c : window : window;
}
function Go(u) {
  const {
    Document: c
  } = De(u);
  return u instanceof c;
}
function Di(u) {
  return _a(u) ? !1 : u instanceof De(u).HTMLElement;
}
function gh(u) {
  return u instanceof De(u).SVGElement;
}
function Ta(u) {
  return u ? _a(u) ? u.document : Lo(u) ? Go(u) ? u : Di(u) || gh(u) ? u.ownerDocument : document : document : document;
}
const ml = lc ? D.useLayoutEffect : D.useEffect;
function Xo(u) {
  const c = D.useRef(u);
  return ml(() => {
    c.current = u;
  }), D.useCallback(function() {
    for (var s = arguments.length, r = new Array(s), m = 0; m < s; m++)
      r[m] = arguments[m];
    return c.current == null ? void 0 : c.current(...r);
  }, []);
}
function p0() {
  const u = D.useRef(null), c = D.useCallback((r, m) => {
    u.current = setInterval(r, m);
  }, []), s = D.useCallback(() => {
    u.current !== null && (clearInterval(u.current), u.current = null);
  }, []);
  return [c, s];
}
function _i(u, c) {
  c === void 0 && (c = [u]);
  const s = D.useRef(u);
  return ml(() => {
    s.current !== u && (s.current = u);
  }, c), s;
}
function Ni(u, c) {
  const s = D.useRef();
  return D.useMemo(
    () => {
      const r = u(s.current);
      return s.current = r, r;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...c]
  );
}
function Fu(u) {
  const c = Xo(u), s = D.useRef(null), r = D.useCallback(
    (m) => {
      m !== s.current && c?.(m, s.current), s.current = m;
    },
    //eslint-disable-next-line
    []
  );
  return [s, r];
}
function jo(u) {
  const c = D.useRef();
  return D.useEffect(() => {
    c.current = u;
  }, [u]), c.current;
}
let To = {};
function Mi(u, c) {
  return D.useMemo(() => {
    if (c)
      return c;
    const s = To[u] == null ? 0 : To[u] + 1;
    return To[u] = s, u + "-" + s;
  }, [u, c]);
}
function yh(u) {
  return function(c) {
    for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), m = 1; m < s; m++)
      r[m - 1] = arguments[m];
    return r.reduce((d, y) => {
      const S = Object.entries(y);
      for (const [x, h] of S) {
        const M = d[x];
        M != null && (d[x] = M + u * h);
      }
      return d;
    }, {
      ...c
    });
  };
}
const xa = /* @__PURE__ */ yh(1), Iu = /* @__PURE__ */ yh(-1);
function b0(u) {
  return "clientX" in u && "clientY" in u;
}
function Qo(u) {
  if (!u)
    return !1;
  const {
    KeyboardEvent: c
  } = De(u.target);
  return c && u instanceof c;
}
function S0(u) {
  if (!u)
    return !1;
  const {
    TouchEvent: c
  } = De(u.target);
  return c && u instanceof c;
}
function wo(u) {
  if (S0(u)) {
    if (u.touches && u.touches.length) {
      const {
        clientX: c,
        clientY: s
      } = u.touches[0];
      return {
        x: c,
        y: s
      };
    } else if (u.changedTouches && u.changedTouches.length) {
      const {
        clientX: c,
        clientY: s
      } = u.changedTouches[0];
      return {
        x: c,
        y: s
      };
    }
  }
  return b0(u) ? {
    x: u.clientX,
    y: u.clientY
  } : null;
}
const Ti = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(u) {
      if (!u)
        return;
      const {
        x: c,
        y: s
      } = u;
      return "translate3d(" + (c ? Math.round(c) : 0) + "px, " + (s ? Math.round(s) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(u) {
      if (!u)
        return;
      const {
        scaleX: c,
        scaleY: s
      } = u;
      return "scaleX(" + c + ") scaleY(" + s + ")";
    }
  },
  Transform: {
    toString(u) {
      if (u)
        return [Ti.Translate.toString(u), Ti.Scale.toString(u)].join(" ");
    }
  },
  Transition: {
    toString(u) {
      let {
        property: c,
        duration: s,
        easing: r
      } = u;
      return c + " " + s + "ms " + r;
    }
  }
}), Im = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function x0(u) {
  return u.matches(Im) ? u : u.querySelector(Im);
}
const E0 = {
  display: "none"
};
function z0(u) {
  let {
    id: c,
    value: s
  } = u;
  return Ae.createElement("div", {
    id: c,
    style: E0
  }, s);
}
function _0(u) {
  let {
    id: c,
    announcement: s,
    ariaLiveType: r = "assertive"
  } = u;
  const m = {
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
    id: c,
    style: m,
    role: "status",
    "aria-live": r,
    "aria-atomic": !0
  }, s);
}
function T0() {
  const [u, c] = D.useState("");
  return {
    announce: D.useCallback((r) => {
      r != null && c(r);
    }, []),
    announcement: u
  };
}
const ph = /* @__PURE__ */ D.createContext(null);
function A0(u) {
  const c = D.useContext(ph);
  D.useEffect(() => {
    if (!c)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return c(u);
  }, [u, c]);
}
function D0() {
  const [u] = D.useState(() => /* @__PURE__ */ new Set()), c = D.useCallback((r) => (u.add(r), () => u.delete(r)), [u]);
  return [D.useCallback((r) => {
    let {
      type: m,
      event: d
    } = r;
    u.forEach((y) => {
      var S;
      return (S = y[m]) == null ? void 0 : S.call(y, d);
    });
  }, [u]), c];
}
const N0 = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, M0 = {
  onDragStart(u) {
    let {
      active: c
    } = u;
    return "Picked up draggable item " + c.id + ".";
  },
  onDragOver(u) {
    let {
      active: c,
      over: s
    } = u;
    return s ? "Draggable item " + c.id + " was moved over droppable area " + s.id + "." : "Draggable item " + c.id + " is no longer over a droppable area.";
  },
  onDragEnd(u) {
    let {
      active: c,
      over: s
    } = u;
    return s ? "Draggable item " + c.id + " was dropped over droppable area " + s.id : "Draggable item " + c.id + " was dropped.";
  },
  onDragCancel(u) {
    let {
      active: c
    } = u;
    return "Dragging was cancelled. Draggable item " + c.id + " was dropped.";
  }
};
function O0(u) {
  let {
    announcements: c = M0,
    container: s,
    hiddenTextDescribedById: r,
    screenReaderInstructions: m = N0
  } = u;
  const {
    announce: d,
    announcement: y
  } = T0(), S = Mi("DndLiveRegion"), [x, h] = D.useState(!1);
  if (D.useEffect(() => {
    h(!0);
  }, []), A0(D.useMemo(() => ({
    onDragStart(T) {
      let {
        active: U
      } = T;
      d(c.onDragStart({
        active: U
      }));
    },
    onDragMove(T) {
      let {
        active: U,
        over: H
      } = T;
      c.onDragMove && d(c.onDragMove({
        active: U,
        over: H
      }));
    },
    onDragOver(T) {
      let {
        active: U,
        over: H
      } = T;
      d(c.onDragOver({
        active: U,
        over: H
      }));
    },
    onDragEnd(T) {
      let {
        active: U,
        over: H
      } = T;
      d(c.onDragEnd({
        active: U,
        over: H
      }));
    },
    onDragCancel(T) {
      let {
        active: U,
        over: H
      } = T;
      d(c.onDragCancel({
        active: U,
        over: H
      }));
    }
  }), [d, c])), !x)
    return null;
  const M = Ae.createElement(Ae.Fragment, null, Ae.createElement(z0, {
    id: r,
    value: m.draggable
  }), Ae.createElement(_0, {
    id: S,
    announcement: y
  }));
  return s ? Si.createPortal(M, s) : M;
}
var Wt;
(function(u) {
  u.DragStart = "dragStart", u.DragMove = "dragMove", u.DragEnd = "dragEnd", u.DragCancel = "dragCancel", u.DragOver = "dragOver", u.RegisterDroppable = "registerDroppable", u.SetDroppableDisabled = "setDroppableDisabled", u.UnregisterDroppable = "unregisterDroppable";
})(Wt || (Wt = {}));
function Pu() {
}
function C0(u, c) {
  return D.useMemo(
    () => ({
      sensor: u,
      options: c ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [u, c]
  );
}
function R0() {
  for (var u = arguments.length, c = new Array(u), s = 0; s < u; s++)
    c[s] = arguments[s];
  return D.useMemo(
    () => [...c].filter((r) => r != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...c]
  );
}
const al = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function j0(u, c) {
  return Math.sqrt(Math.pow(u.x - c.x, 2) + Math.pow(u.y - c.y, 2));
}
function w0(u, c) {
  let {
    data: {
      value: s
    }
  } = u, {
    data: {
      value: r
    }
  } = c;
  return s - r;
}
function U0(u, c) {
  let {
    data: {
      value: s
    }
  } = u, {
    data: {
      value: r
    }
  } = c;
  return r - s;
}
function H0(u, c) {
  if (!u || u.length === 0)
    return null;
  const [s] = u;
  return s[c];
}
function Pm(u, c, s) {
  return c === void 0 && (c = u.left), s === void 0 && (s = u.top), {
    x: c + u.width * 0.5,
    y: s + u.height * 0.5
  };
}
const B0 = (u) => {
  let {
    collisionRect: c,
    droppableRects: s,
    droppableContainers: r
  } = u;
  const m = Pm(c, c.left, c.top), d = [];
  for (const y of r) {
    const {
      id: S
    } = y, x = s.get(S);
    if (x) {
      const h = j0(Pm(x), m);
      d.push({
        id: S,
        data: {
          droppableContainer: y,
          value: h
        }
      });
    }
  }
  return d.sort(w0);
};
function q0(u, c) {
  const s = Math.max(c.top, u.top), r = Math.max(c.left, u.left), m = Math.min(c.left + c.width, u.left + u.width), d = Math.min(c.top + c.height, u.top + u.height), y = m - r, S = d - s;
  if (r < m && s < d) {
    const x = c.width * c.height, h = u.width * u.height, M = y * S, T = M / (x + h - M);
    return Number(T.toFixed(4));
  }
  return 0;
}
const Y0 = (u) => {
  let {
    collisionRect: c,
    droppableRects: s,
    droppableContainers: r
  } = u;
  const m = [];
  for (const d of r) {
    const {
      id: y
    } = d, S = s.get(y);
    if (S) {
      const x = q0(S, c);
      x > 0 && m.push({
        id: y,
        data: {
          droppableContainer: d,
          value: x
        }
      });
    }
  }
  return m.sort(U0);
};
function L0(u, c, s) {
  return {
    ...u,
    scaleX: c && s ? c.width / s.width : 1,
    scaleY: c && s ? c.height / s.height : 1
  };
}
function bh(u, c) {
  return u && c ? {
    x: u.left - c.left,
    y: u.top - c.top
  } : al;
}
function G0(u) {
  return function(s) {
    for (var r = arguments.length, m = new Array(r > 1 ? r - 1 : 0), d = 1; d < r; d++)
      m[d - 1] = arguments[d];
    return m.reduce((y, S) => ({
      ...y,
      top: y.top + u * S.y,
      bottom: y.bottom + u * S.y,
      left: y.left + u * S.x,
      right: y.right + u * S.x
    }), {
      ...s
    });
  };
}
const X0 = /* @__PURE__ */ G0(1);
function Q0(u) {
  if (u.startsWith("matrix3d(")) {
    const c = u.slice(9, -1).split(/, /);
    return {
      x: +c[12],
      y: +c[13],
      scaleX: +c[0],
      scaleY: +c[5]
    };
  } else if (u.startsWith("matrix(")) {
    const c = u.slice(7, -1).split(/, /);
    return {
      x: +c[4],
      y: +c[5],
      scaleX: +c[0],
      scaleY: +c[3]
    };
  }
  return null;
}
function Z0(u, c, s) {
  const r = Q0(c);
  if (!r)
    return u;
  const {
    scaleX: m,
    scaleY: d,
    x: y,
    y: S
  } = r, x = u.left - y - (1 - m) * parseFloat(s), h = u.top - S - (1 - d) * parseFloat(s.slice(s.indexOf(" ") + 1)), M = m ? u.width / m : u.width, T = d ? u.height / d : u.height;
  return {
    width: M,
    height: T,
    top: h,
    right: x + M,
    bottom: h + T,
    left: x
  };
}
const V0 = {
  ignoreTransform: !1
};
function Aa(u, c) {
  c === void 0 && (c = V0);
  let s = u.getBoundingClientRect();
  if (c.ignoreTransform) {
    const {
      transform: h,
      transformOrigin: M
    } = De(u).getComputedStyle(u);
    h && (s = Z0(s, h, M));
  }
  const {
    top: r,
    left: m,
    width: d,
    height: y,
    bottom: S,
    right: x
  } = s;
  return {
    top: r,
    left: m,
    width: d,
    height: y,
    bottom: S,
    right: x
  };
}
function th(u) {
  return Aa(u, {
    ignoreTransform: !0
  });
}
function K0(u) {
  const c = u.innerWidth, s = u.innerHeight;
  return {
    top: 0,
    left: 0,
    right: c,
    bottom: s,
    width: c,
    height: s
  };
}
function J0(u, c) {
  return c === void 0 && (c = De(u).getComputedStyle(u)), c.position === "fixed";
}
function k0(u, c) {
  c === void 0 && (c = De(u).getComputedStyle(u));
  const s = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((m) => {
    const d = c[m];
    return typeof d == "string" ? s.test(d) : !1;
  });
}
function Zo(u, c) {
  const s = [];
  function r(m) {
    if (c != null && s.length >= c || !m)
      return s;
    if (Go(m) && m.scrollingElement != null && !s.includes(m.scrollingElement))
      return s.push(m.scrollingElement), s;
    if (!Di(m) || gh(m) || s.includes(m))
      return s;
    const d = De(u).getComputedStyle(m);
    return m !== u && k0(m, d) && s.push(m), J0(m, d) ? s : r(m.parentNode);
  }
  return u ? r(u) : s;
}
function Sh(u) {
  const [c] = Zo(u, 1);
  return c ?? null;
}
function Ao(u) {
  return !lc || !u ? null : _a(u) ? u : Lo(u) ? Go(u) || u === Ta(u).scrollingElement ? window : Di(u) ? u : null : null;
}
function xh(u) {
  return _a(u) ? u.scrollX : u.scrollLeft;
}
function Eh(u) {
  return _a(u) ? u.scrollY : u.scrollTop;
}
function Uo(u) {
  return {
    x: xh(u),
    y: Eh(u)
  };
}
var ee;
(function(u) {
  u[u.Forward = 1] = "Forward", u[u.Backward = -1] = "Backward";
})(ee || (ee = {}));
function zh(u) {
  return !lc || !u ? !1 : u === document.scrollingElement;
}
function _h(u) {
  const c = {
    x: 0,
    y: 0
  }, s = zh(u) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: u.clientHeight,
    width: u.clientWidth
  }, r = {
    x: u.scrollWidth - s.width,
    y: u.scrollHeight - s.height
  }, m = u.scrollTop <= c.y, d = u.scrollLeft <= c.x, y = u.scrollTop >= r.y, S = u.scrollLeft >= r.x;
  return {
    isTop: m,
    isLeft: d,
    isBottom: y,
    isRight: S,
    maxScroll: r,
    minScroll: c
  };
}
const $0 = {
  x: 0.2,
  y: 0.2
};
function W0(u, c, s, r, m) {
  let {
    top: d,
    left: y,
    right: S,
    bottom: x
  } = s;
  r === void 0 && (r = 10), m === void 0 && (m = $0);
  const {
    isTop: h,
    isBottom: M,
    isLeft: T,
    isRight: U
  } = _h(u), H = {
    x: 0,
    y: 0
  }, Z = {
    x: 0,
    y: 0
  }, q = {
    height: c.height * m.y,
    width: c.width * m.x
  };
  return !h && d <= c.top + q.height ? (H.y = ee.Backward, Z.y = r * Math.abs((c.top + q.height - d) / q.height)) : !M && x >= c.bottom - q.height && (H.y = ee.Forward, Z.y = r * Math.abs((c.bottom - q.height - x) / q.height)), !U && S >= c.right - q.width ? (H.x = ee.Forward, Z.x = r * Math.abs((c.right - q.width - S) / q.width)) : !T && y <= c.left + q.width && (H.x = ee.Backward, Z.x = r * Math.abs((c.left + q.width - y) / q.width)), {
    direction: H,
    speed: Z
  };
}
function F0(u) {
  if (u === document.scrollingElement) {
    const {
      innerWidth: d,
      innerHeight: y
    } = window;
    return {
      top: 0,
      left: 0,
      right: d,
      bottom: y,
      width: d,
      height: y
    };
  }
  const {
    top: c,
    left: s,
    right: r,
    bottom: m
  } = u.getBoundingClientRect();
  return {
    top: c,
    left: s,
    right: r,
    bottom: m,
    width: u.clientWidth,
    height: u.clientHeight
  };
}
function Th(u) {
  return u.reduce((c, s) => xa(c, Uo(s)), al);
}
function I0(u) {
  return u.reduce((c, s) => c + xh(s), 0);
}
function P0(u) {
  return u.reduce((c, s) => c + Eh(s), 0);
}
function ty(u, c) {
  if (c === void 0 && (c = Aa), !u)
    return;
  const {
    top: s,
    left: r,
    bottom: m,
    right: d
  } = c(u);
  Sh(u) && (m <= 0 || d <= 0 || s >= window.innerHeight || r >= window.innerWidth) && u.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const ey = [["x", ["left", "right"], I0], ["y", ["top", "bottom"], P0]];
class Vo {
  constructor(c, s) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const r = Zo(s), m = Th(r);
    this.rect = {
      ...c
    }, this.width = c.width, this.height = c.height;
    for (const [d, y, S] of ey)
      for (const x of y)
        Object.defineProperty(this, x, {
          get: () => {
            const h = S(r), M = m[d] - h;
            return this.rect[x] + M;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class xi {
  constructor(c) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((s) => {
        var r;
        return (r = this.target) == null ? void 0 : r.removeEventListener(...s);
      });
    }, this.target = c;
  }
  add(c, s, r) {
    var m;
    (m = this.target) == null || m.addEventListener(c, s, r), this.listeners.push([c, s, r]);
  }
}
function ly(u) {
  const {
    EventTarget: c
  } = De(u);
  return u instanceof c ? u : Ta(u);
}
function Do(u, c) {
  const s = Math.abs(u.x), r = Math.abs(u.y);
  return typeof c == "number" ? Math.sqrt(s ** 2 + r ** 2) > c : "x" in c && "y" in c ? s > c.x && r > c.y : "x" in c ? s > c.x : "y" in c ? r > c.y : !1;
}
var Fe;
(function(u) {
  u.Click = "click", u.DragStart = "dragstart", u.Keydown = "keydown", u.ContextMenu = "contextmenu", u.Resize = "resize", u.SelectionChange = "selectionchange", u.VisibilityChange = "visibilitychange";
})(Fe || (Fe = {}));
function eh(u) {
  u.preventDefault();
}
function ny(u) {
  u.stopPropagation();
}
var Et;
(function(u) {
  u.Space = "Space", u.Down = "ArrowDown", u.Right = "ArrowRight", u.Left = "ArrowLeft", u.Up = "ArrowUp", u.Esc = "Escape", u.Enter = "Enter", u.Tab = "Tab";
})(Et || (Et = {}));
const Ah = {
  start: [Et.Space, Et.Enter],
  cancel: [Et.Esc],
  end: [Et.Space, Et.Enter, Et.Tab]
}, ay = (u, c) => {
  let {
    currentCoordinates: s
  } = c;
  switch (u.code) {
    case Et.Right:
      return {
        ...s,
        x: s.x + 25
      };
    case Et.Left:
      return {
        ...s,
        x: s.x - 25
      };
    case Et.Down:
      return {
        ...s,
        y: s.y + 25
      };
    case Et.Up:
      return {
        ...s,
        y: s.y - 25
      };
  }
};
class Dh {
  constructor(c) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = c;
    const {
      event: {
        target: s
      }
    } = c;
    this.props = c, this.listeners = new xi(Ta(s)), this.windowListeners = new xi(De(s)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(Fe.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: c,
      onStart: s
    } = this.props, r = c.node.current;
    r && ty(r), s(al);
  }
  handleKeyDown(c) {
    if (Qo(c)) {
      const {
        active: s,
        context: r,
        options: m
      } = this.props, {
        keyboardCodes: d = Ah,
        coordinateGetter: y = ay,
        scrollBehavior: S = "smooth"
      } = m, {
        code: x
      } = c;
      if (d.end.includes(x)) {
        this.handleEnd(c);
        return;
      }
      if (d.cancel.includes(x)) {
        this.handleCancel(c);
        return;
      }
      const {
        collisionRect: h
      } = r.current, M = h ? {
        x: h.left,
        y: h.top
      } : al;
      this.referenceCoordinates || (this.referenceCoordinates = M);
      const T = y(c, {
        active: s,
        context: r.current,
        currentCoordinates: M
      });
      if (T) {
        const U = Iu(T, M), H = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: Z
        } = r.current;
        for (const q of Z) {
          const Q = c.code, {
            isTop: W,
            isRight: lt,
            isLeft: k,
            isBottom: nt,
            maxScroll: ut,
            minScroll: et
          } = _h(q), G = F0(q), I = {
            x: Math.min(Q === Et.Right ? G.right - G.width / 2 : G.right, Math.max(Q === Et.Right ? G.left : G.left + G.width / 2, T.x)),
            y: Math.min(Q === Et.Down ? G.bottom - G.height / 2 : G.bottom, Math.max(Q === Et.Down ? G.top : G.top + G.height / 2, T.y))
          }, bt = Q === Et.Right && !lt || Q === Et.Left && !k, Ot = Q === Et.Down && !nt || Q === Et.Up && !W;
          if (bt && I.x !== T.x) {
            const dt = q.scrollLeft + U.x, Mt = Q === Et.Right && dt <= ut.x || Q === Et.Left && dt >= et.x;
            if (Mt && !U.y) {
              q.scrollTo({
                left: dt,
                behavior: S
              });
              return;
            }
            Mt ? H.x = q.scrollLeft - dt : H.x = Q === Et.Right ? q.scrollLeft - ut.x : q.scrollLeft - et.x, H.x && q.scrollBy({
              left: -H.x,
              behavior: S
            });
            break;
          } else if (Ot && I.y !== T.y) {
            const dt = q.scrollTop + U.y, Mt = Q === Et.Down && dt <= ut.y || Q === Et.Up && dt >= et.y;
            if (Mt && !U.x) {
              q.scrollTo({
                top: dt,
                behavior: S
              });
              return;
            }
            Mt ? H.y = q.scrollTop - dt : H.y = Q === Et.Down ? q.scrollTop - ut.y : q.scrollTop - et.y, H.y && q.scrollBy({
              top: -H.y,
              behavior: S
            });
            break;
          }
        }
        this.handleMove(c, xa(Iu(T, this.referenceCoordinates), H));
      }
    }
  }
  handleMove(c, s) {
    const {
      onMove: r
    } = this.props;
    c.preventDefault(), r(s);
  }
  handleEnd(c) {
    const {
      onEnd: s
    } = this.props;
    c.preventDefault(), this.detach(), s();
  }
  handleCancel(c) {
    const {
      onCancel: s
    } = this.props;
    c.preventDefault(), this.detach(), s();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
Dh.activators = [{
  eventName: "onKeyDown",
  handler: (u, c, s) => {
    let {
      keyboardCodes: r = Ah,
      onActivation: m
    } = c, {
      active: d
    } = s;
    const {
      code: y
    } = u.nativeEvent;
    if (r.start.includes(y)) {
      const S = d.activatorNode.current;
      return S && u.target !== S ? !1 : (u.preventDefault(), m?.({
        event: u.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function lh(u) {
  return !!(u && "distance" in u);
}
function nh(u) {
  return !!(u && "delay" in u);
}
class Ko {
  constructor(c, s, r) {
    var m;
    r === void 0 && (r = ly(c.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = c, this.events = s;
    const {
      event: d
    } = c, {
      target: y
    } = d;
    this.props = c, this.events = s, this.document = Ta(y), this.documentListeners = new xi(this.document), this.listeners = new xi(r), this.windowListeners = new xi(De(y)), this.initialCoordinates = (m = wo(d)) != null ? m : al, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: c,
      props: {
        options: {
          activationConstraint: s,
          bypassActivationConstraint: r
        }
      }
    } = this;
    if (this.listeners.add(c.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(c.end.name, this.handleEnd), c.cancel && this.listeners.add(c.cancel.name, this.handleCancel), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.DragStart, eh), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), this.windowListeners.add(Fe.ContextMenu, eh), this.documentListeners.add(Fe.Keydown, this.handleKeydown), s) {
      if (r != null && r({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (nh(s)) {
        this.timeoutId = setTimeout(this.handleStart, s.delay), this.handlePending(s);
        return;
      }
      if (lh(s)) {
        this.handlePending(s);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(c, s) {
    const {
      active: r,
      onPending: m
    } = this.props;
    m(r, c, this.initialCoordinates, s);
  }
  handleStart() {
    const {
      initialCoordinates: c
    } = this, {
      onStart: s
    } = this.props;
    c && (this.activated = !0, this.documentListeners.add(Fe.Click, ny, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(Fe.SelectionChange, this.removeTextSelection), s(c));
  }
  handleMove(c) {
    var s;
    const {
      activated: r,
      initialCoordinates: m,
      props: d
    } = this, {
      onMove: y,
      options: {
        activationConstraint: S
      }
    } = d;
    if (!m)
      return;
    const x = (s = wo(c)) != null ? s : al, h = Iu(m, x);
    if (!r && S) {
      if (lh(S)) {
        if (S.tolerance != null && Do(h, S.tolerance))
          return this.handleCancel();
        if (Do(h, S.distance))
          return this.handleStart();
      }
      if (nh(S) && Do(h, S.tolerance))
        return this.handleCancel();
      this.handlePending(S, h);
      return;
    }
    c.cancelable && c.preventDefault(), y(x);
  }
  handleEnd() {
    const {
      onAbort: c,
      onEnd: s
    } = this.props;
    this.detach(), this.activated || c(this.props.active), s();
  }
  handleCancel() {
    const {
      onAbort: c,
      onCancel: s
    } = this.props;
    this.detach(), this.activated || c(this.props.active), s();
  }
  handleKeydown(c) {
    c.code === Et.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var c;
    (c = this.document.getSelection()) == null || c.removeAllRanges();
  }
}
const iy = {
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
class Jo extends Ko {
  constructor(c) {
    const {
      event: s
    } = c, r = Ta(s.target);
    super(c, iy, r);
  }
}
Jo.activators = [{
  eventName: "onPointerDown",
  handler: (u, c) => {
    let {
      nativeEvent: s
    } = u, {
      onActivation: r
    } = c;
    return !s.isPrimary || s.button !== 0 ? !1 : (r?.({
      event: s
    }), !0);
  }
}];
const uy = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var Ho;
(function(u) {
  u[u.RightClick = 2] = "RightClick";
})(Ho || (Ho = {}));
class cy extends Ko {
  constructor(c) {
    super(c, uy, Ta(c.event.target));
  }
}
cy.activators = [{
  eventName: "onMouseDown",
  handler: (u, c) => {
    let {
      nativeEvent: s
    } = u, {
      onActivation: r
    } = c;
    return s.button === Ho.RightClick ? !1 : (r?.({
      event: s
    }), !0);
  }
}];
const No = {
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
class sy extends Ko {
  constructor(c) {
    super(c, No);
  }
  static setup() {
    return window.addEventListener(No.move.name, c, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(No.move.name, c);
    };
    function c() {
    }
  }
}
sy.activators = [{
  eventName: "onTouchStart",
  handler: (u, c) => {
    let {
      nativeEvent: s
    } = u, {
      onActivation: r
    } = c;
    const {
      touches: m
    } = s;
    return m.length > 1 ? !1 : (r?.({
      event: s
    }), !0);
  }
}];
var Ei;
(function(u) {
  u[u.Pointer = 0] = "Pointer", u[u.DraggableRect = 1] = "DraggableRect";
})(Ei || (Ei = {}));
var tc;
(function(u) {
  u[u.TreeOrder = 0] = "TreeOrder", u[u.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(tc || (tc = {}));
function oy(u) {
  let {
    acceleration: c,
    activator: s = Ei.Pointer,
    canScroll: r,
    draggingRect: m,
    enabled: d,
    interval: y = 5,
    order: S = tc.TreeOrder,
    pointerCoordinates: x,
    scrollableAncestors: h,
    scrollableAncestorRects: M,
    delta: T,
    threshold: U
  } = u;
  const H = fy({
    delta: T,
    disabled: !d
  }), [Z, q] = p0(), Q = D.useRef({
    x: 0,
    y: 0
  }), W = D.useRef({
    x: 0,
    y: 0
  }), lt = D.useMemo(() => {
    switch (s) {
      case Ei.Pointer:
        return x ? {
          top: x.y,
          bottom: x.y,
          left: x.x,
          right: x.x
        } : null;
      case Ei.DraggableRect:
        return m;
    }
  }, [s, m, x]), k = D.useRef(null), nt = D.useCallback(() => {
    const et = k.current;
    if (!et)
      return;
    const G = Q.current.x * W.current.x, I = Q.current.y * W.current.y;
    et.scrollBy(G, I);
  }, []), ut = D.useMemo(() => S === tc.TreeOrder ? [...h].reverse() : h, [S, h]);
  D.useEffect(
    () => {
      if (!d || !h.length || !lt) {
        q();
        return;
      }
      for (const et of ut) {
        if (r?.(et) === !1)
          continue;
        const G = h.indexOf(et), I = M[G];
        if (!I)
          continue;
        const {
          direction: bt,
          speed: Ot
        } = W0(et, I, lt, c, U);
        for (const dt of ["x", "y"])
          H[dt][bt[dt]] || (Ot[dt] = 0, bt[dt] = 0);
        if (Ot.x > 0 || Ot.y > 0) {
          q(), k.current = et, Z(nt, y), Q.current = Ot, W.current = bt;
          return;
        }
      }
      Q.current = {
        x: 0,
        y: 0
      }, W.current = {
        x: 0,
        y: 0
      }, q();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      c,
      nt,
      r,
      q,
      d,
      y,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lt),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(H),
      Z,
      h,
      ut,
      M,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(U)
    ]
  );
}
const ry = {
  x: {
    [ee.Backward]: !1,
    [ee.Forward]: !1
  },
  y: {
    [ee.Backward]: !1,
    [ee.Forward]: !1
  }
};
function fy(u) {
  let {
    delta: c,
    disabled: s
  } = u;
  const r = jo(c);
  return Ni((m) => {
    if (s || !r || !m)
      return ry;
    const d = {
      x: Math.sign(c.x - r.x),
      y: Math.sign(c.y - r.y)
    };
    return {
      x: {
        [ee.Backward]: m.x[ee.Backward] || d.x === -1,
        [ee.Forward]: m.x[ee.Forward] || d.x === 1
      },
      y: {
        [ee.Backward]: m.y[ee.Backward] || d.y === -1,
        [ee.Forward]: m.y[ee.Forward] || d.y === 1
      }
    };
  }, [s, c, r]);
}
function dy(u, c) {
  const s = c != null ? u.get(c) : void 0, r = s ? s.node.current : null;
  return Ni((m) => {
    var d;
    return c == null ? null : (d = r ?? m) != null ? d : null;
  }, [r, c]);
}
function my(u, c) {
  return D.useMemo(() => u.reduce((s, r) => {
    const {
      sensor: m
    } = r, d = m.activators.map((y) => ({
      eventName: y.eventName,
      handler: c(y.handler, r)
    }));
    return [...s, ...d];
  }, []), [u, c]);
}
var Ai;
(function(u) {
  u[u.Always = 0] = "Always", u[u.BeforeDragging = 1] = "BeforeDragging", u[u.WhileDragging = 2] = "WhileDragging";
})(Ai || (Ai = {}));
var Bo;
(function(u) {
  u.Optimized = "optimized";
})(Bo || (Bo = {}));
const ah = /* @__PURE__ */ new Map();
function hy(u, c) {
  let {
    dragging: s,
    dependencies: r,
    config: m
  } = c;
  const [d, y] = D.useState(null), {
    frequency: S,
    measure: x,
    strategy: h
  } = m, M = D.useRef(u), T = Q(), U = _i(T), H = D.useCallback(function(W) {
    W === void 0 && (W = []), !U.current && y((lt) => lt === null ? W : lt.concat(W.filter((k) => !lt.includes(k))));
  }, [U]), Z = D.useRef(null), q = Ni((W) => {
    if (T && !s)
      return ah;
    if (!W || W === ah || M.current !== u || d != null) {
      const lt = /* @__PURE__ */ new Map();
      for (let k of u) {
        if (!k)
          continue;
        if (d && d.length > 0 && !d.includes(k.id) && k.rect.current) {
          lt.set(k.id, k.rect.current);
          continue;
        }
        const nt = k.node.current, ut = nt ? new Vo(x(nt), nt) : null;
        k.rect.current = ut, ut && lt.set(k.id, ut);
      }
      return lt;
    }
    return W;
  }, [u, d, s, T, x]);
  return D.useEffect(() => {
    M.current = u;
  }, [u]), D.useEffect(
    () => {
      T || H();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s, T]
  ), D.useEffect(
    () => {
      d && d.length > 0 && y(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(d)]
  ), D.useEffect(
    () => {
      T || typeof S != "number" || Z.current !== null || (Z.current = setTimeout(() => {
        H(), Z.current = null;
      }, S));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [S, T, H, ...r]
  ), {
    droppableRects: q,
    measureDroppableContainers: H,
    measuringScheduled: d != null
  };
  function Q() {
    switch (h) {
      case Ai.Always:
        return !1;
      case Ai.BeforeDragging:
        return s;
      default:
        return !s;
    }
  }
}
function Nh(u, c) {
  return Ni((s) => u ? s || (typeof c == "function" ? c(u) : u) : null, [c, u]);
}
function vy(u, c) {
  return Nh(u, c);
}
function gy(u) {
  let {
    callback: c,
    disabled: s
  } = u;
  const r = Xo(c), m = D.useMemo(() => {
    if (s || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: d
    } = window;
    return new d(r);
  }, [r, s]);
  return D.useEffect(() => () => m?.disconnect(), [m]), m;
}
function nc(u) {
  let {
    callback: c,
    disabled: s
  } = u;
  const r = Xo(c), m = D.useMemo(
    () => {
      if (s || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: d
      } = window;
      return new d(r);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s]
  );
  return D.useEffect(() => () => m?.disconnect(), [m]), m;
}
function yy(u) {
  return new Vo(Aa(u), u);
}
function ih(u, c, s) {
  c === void 0 && (c = yy);
  const [r, m] = D.useState(null);
  function d() {
    m((x) => {
      if (!u)
        return null;
      if (u.isConnected === !1) {
        var h;
        return (h = x ?? s) != null ? h : null;
      }
      const M = c(u);
      return JSON.stringify(x) === JSON.stringify(M) ? x : M;
    });
  }
  const y = gy({
    callback(x) {
      if (u)
        for (const h of x) {
          const {
            type: M,
            target: T
          } = h;
          if (M === "childList" && T instanceof HTMLElement && T.contains(u)) {
            d();
            break;
          }
        }
    }
  }), S = nc({
    callback: d
  });
  return ml(() => {
    d(), u ? (S?.observe(u), y?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (S?.disconnect(), y?.disconnect());
  }, [u]), r;
}
function py(u) {
  const c = Nh(u);
  return bh(u, c);
}
const uh = [];
function by(u) {
  const c = D.useRef(u), s = Ni((r) => u ? r && r !== uh && u && c.current && u.parentNode === c.current.parentNode ? r : Zo(u) : uh, [u]);
  return D.useEffect(() => {
    c.current = u;
  }, [u]), s;
}
function Sy(u) {
  const [c, s] = D.useState(null), r = D.useRef(u), m = D.useCallback((d) => {
    const y = Ao(d.target);
    y && s((S) => S ? (S.set(y, Uo(y)), new Map(S)) : null);
  }, []);
  return D.useEffect(() => {
    const d = r.current;
    if (u !== d) {
      y(d);
      const S = u.map((x) => {
        const h = Ao(x);
        return h ? (h.addEventListener("scroll", m, {
          passive: !0
        }), [h, Uo(h)]) : null;
      }).filter((x) => x != null);
      s(S.length ? new Map(S) : null), r.current = u;
    }
    return () => {
      y(u), y(d);
    };
    function y(S) {
      S.forEach((x) => {
        const h = Ao(x);
        h?.removeEventListener("scroll", m);
      });
    }
  }, [m, u]), D.useMemo(() => u.length ? c ? Array.from(c.values()).reduce((d, y) => xa(d, y), al) : Th(u) : al, [u, c]);
}
function ch(u, c) {
  c === void 0 && (c = []);
  const s = D.useRef(null);
  return D.useEffect(
    () => {
      s.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    c
  ), D.useEffect(() => {
    const r = u !== al;
    r && !s.current && (s.current = u), !r && s.current && (s.current = null);
  }, [u]), s.current ? Iu(u, s.current) : al;
}
function xy(u) {
  D.useEffect(
    () => {
      if (!lc)
        return;
      const c = u.map((s) => {
        let {
          sensor: r
        } = s;
        return r.setup == null ? void 0 : r.setup();
      });
      return () => {
        for (const s of c)
          s?.();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    u.map((c) => {
      let {
        sensor: s
      } = c;
      return s;
    })
  );
}
function Ey(u, c) {
  return D.useMemo(() => u.reduce((s, r) => {
    let {
      eventName: m,
      handler: d
    } = r;
    return s[m] = (y) => {
      d(y, c);
    }, s;
  }, {}), [u, c]);
}
function Mh(u) {
  return D.useMemo(() => u ? K0(u) : null, [u]);
}
const sh = [];
function zy(u, c) {
  c === void 0 && (c = Aa);
  const [s] = u, r = Mh(s ? De(s) : null), [m, d] = D.useState(sh);
  function y() {
    d(() => u.length ? u.map((x) => zh(x) ? r : new Vo(c(x), x)) : sh);
  }
  const S = nc({
    callback: y
  });
  return ml(() => {
    S?.disconnect(), y(), u.forEach((x) => S?.observe(x));
  }, [u]), m;
}
function _y(u) {
  if (!u)
    return null;
  if (u.children.length > 1)
    return u;
  const c = u.children[0];
  return Di(c) ? c : u;
}
function Ty(u) {
  let {
    measure: c
  } = u;
  const [s, r] = D.useState(null), m = D.useCallback((h) => {
    for (const {
      target: M
    } of h)
      if (Di(M)) {
        r((T) => {
          const U = c(M);
          return T ? {
            ...T,
            width: U.width,
            height: U.height
          } : U;
        });
        break;
      }
  }, [c]), d = nc({
    callback: m
  }), y = D.useCallback((h) => {
    const M = _y(h);
    d?.disconnect(), M && d?.observe(M), r(M ? c(M) : null);
  }, [c, d]), [S, x] = Fu(y);
  return D.useMemo(() => ({
    nodeRef: S,
    rect: s,
    setRef: x
  }), [s, S, x]);
}
const Ay = [{
  sensor: Jo,
  options: {}
}, {
  sensor: Dh,
  options: {}
}], Dy = {
  current: {}
}, Wu = {
  draggable: {
    measure: th
  },
  droppable: {
    measure: th,
    strategy: Ai.WhileDragging,
    frequency: Bo.Optimized
  },
  dragOverlay: {
    measure: Aa
  }
};
class zi extends Map {
  get(c) {
    var s;
    return c != null && (s = super.get(c)) != null ? s : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((c) => {
      let {
        disabled: s
      } = c;
      return !s;
    });
  }
  getNodeFor(c) {
    var s, r;
    return (s = (r = this.get(c)) == null ? void 0 : r.node.current) != null ? s : void 0;
  }
}
const Ny = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new zi(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Pu
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: Wu,
  measureDroppableContainers: Pu,
  windowRect: null,
  measuringScheduled: !1
}, My = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Pu,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Pu
}, ac = /* @__PURE__ */ D.createContext(My), Oh = /* @__PURE__ */ D.createContext(Ny);
function Oy() {
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
      containers: new zi()
    }
  };
}
function Cy(u, c) {
  switch (c.type) {
    case Wt.DragStart:
      return {
        ...u,
        draggable: {
          ...u.draggable,
          initialCoordinates: c.initialCoordinates,
          active: c.active
        }
      };
    case Wt.DragMove:
      return u.draggable.active == null ? u : {
        ...u,
        draggable: {
          ...u.draggable,
          translate: {
            x: c.coordinates.x - u.draggable.initialCoordinates.x,
            y: c.coordinates.y - u.draggable.initialCoordinates.y
          }
        }
      };
    case Wt.DragEnd:
    case Wt.DragCancel:
      return {
        ...u,
        draggable: {
          ...u.draggable,
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
        element: s
      } = c, {
        id: r
      } = s, m = new zi(u.droppable.containers);
      return m.set(r, s), {
        ...u,
        droppable: {
          ...u.droppable,
          containers: m
        }
      };
    }
    case Wt.SetDroppableDisabled: {
      const {
        id: s,
        key: r,
        disabled: m
      } = c, d = u.droppable.containers.get(s);
      if (!d || r !== d.key)
        return u;
      const y = new zi(u.droppable.containers);
      return y.set(s, {
        ...d,
        disabled: m
      }), {
        ...u,
        droppable: {
          ...u.droppable,
          containers: y
        }
      };
    }
    case Wt.UnregisterDroppable: {
      const {
        id: s,
        key: r
      } = c, m = u.droppable.containers.get(s);
      if (!m || r !== m.key)
        return u;
      const d = new zi(u.droppable.containers);
      return d.delete(s), {
        ...u,
        droppable: {
          ...u.droppable,
          containers: d
        }
      };
    }
    default:
      return u;
  }
}
function Ry(u) {
  let {
    disabled: c
  } = u;
  const {
    active: s,
    activatorEvent: r,
    draggableNodes: m
  } = D.useContext(ac), d = jo(r), y = jo(s?.id);
  return D.useEffect(() => {
    if (!c && !r && d && y != null) {
      if (!Qo(d) || document.activeElement === d.target)
        return;
      const S = m.get(y);
      if (!S)
        return;
      const {
        activatorNode: x,
        node: h
      } = S;
      if (!x.current && !h.current)
        return;
      requestAnimationFrame(() => {
        for (const M of [x.current, h.current]) {
          if (!M)
            continue;
          const T = x0(M);
          if (T) {
            T.focus();
            break;
          }
        }
      });
    }
  }, [r, c, m, y, d]), null;
}
function jy(u, c) {
  let {
    transform: s,
    ...r
  } = c;
  return u != null && u.length ? u.reduce((m, d) => d({
    transform: m,
    ...r
  }), s) : s;
}
function wy(u) {
  return D.useMemo(
    () => ({
      draggable: {
        ...Wu.draggable,
        ...u?.draggable
      },
      droppable: {
        ...Wu.droppable,
        ...u?.droppable
      },
      dragOverlay: {
        ...Wu.dragOverlay,
        ...u?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [u?.draggable, u?.droppable, u?.dragOverlay]
  );
}
function Uy(u) {
  let {
    activeNode: c,
    measure: s,
    initialRect: r,
    config: m = !0
  } = u;
  const d = D.useRef(!1), {
    x: y,
    y: S
  } = typeof m == "boolean" ? {
    x: m,
    y: m
  } : m;
  ml(() => {
    if (!y && !S || !c) {
      d.current = !1;
      return;
    }
    if (d.current || !r)
      return;
    const h = c?.node.current;
    if (!h || h.isConnected === !1)
      return;
    const M = s(h), T = bh(M, r);
    if (y || (T.x = 0), S || (T.y = 0), d.current = !0, Math.abs(T.x) > 0 || Math.abs(T.y) > 0) {
      const U = Sh(h);
      U && U.scrollBy({
        top: T.y,
        left: T.x
      });
    }
  }, [c, y, S, r, s]);
}
const Ch = /* @__PURE__ */ D.createContext({
  ...al,
  scaleX: 1,
  scaleY: 1
});
var sn;
(function(u) {
  u[u.Uninitialized = 0] = "Uninitialized", u[u.Initializing = 1] = "Initializing", u[u.Initialized = 2] = "Initialized";
})(sn || (sn = {}));
const Hy = /* @__PURE__ */ D.memo(function(c) {
  var s, r, m, d;
  let {
    id: y,
    accessibility: S,
    autoScroll: x = !0,
    children: h,
    sensors: M = Ay,
    collisionDetection: T = Y0,
    measuring: U,
    modifiers: H,
    ...Z
  } = c;
  const q = D.useReducer(Cy, void 0, Oy), [Q, W] = q, [lt, k] = D0(), [nt, ut] = D.useState(sn.Uninitialized), et = nt === sn.Initialized, {
    draggable: {
      active: G,
      nodes: I,
      translate: bt
    },
    droppable: {
      containers: Ot
    }
  } = Q, dt = G != null ? I.get(G) : null, Mt = D.useRef({
    initial: null,
    translated: null
  }), Jt = D.useMemo(() => {
    var qt;
    return G != null ? {
      id: G,
      // It's possible for the active node to unmount while dragging
      data: (qt = dt?.data) != null ? qt : Dy,
      rect: Mt
    } : null;
  }, [G, dt]), Xt = D.useRef(null), [le, O] = D.useState(null), [B, J] = D.useState(null), ct = _i(Z, Object.values(Z)), gt = Mi("DndDescribedBy", y), b = D.useMemo(() => Ot.getEnabled(), [Ot]), C = wy(U), {
    droppableRects: Y,
    measureDroppableContainers: L,
    measuringScheduled: P
  } = hy(b, {
    dragging: et,
    dependencies: [bt.x, bt.y],
    config: C.droppable
  }), F = dy(I, G), mt = D.useMemo(() => B ? wo(B) : null, [B]), jt = Un(), St = vy(F, C.draggable.measure);
  Uy({
    activeNode: G != null ? I.get(G) : null,
    config: jt.layoutShiftCompensation,
    initialRect: St,
    measure: C.draggable.measure
  });
  const vt = ih(F, C.draggable.measure, St), il = ih(F ? F.parentElement : null), ve = D.useRef({
    activatorEvent: null,
    active: null,
    activeNode: F,
    collisionRect: null,
    collisions: null,
    droppableRects: Y,
    draggableNodes: I,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: Ot,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), hl = Ot.getNodeFor((s = ve.current.over) == null ? void 0 : s.id), ne = Ty({
    measure: C.dragOverlay.measure
  }), ul = (r = ne.nodeRef.current) != null ? r : F, cl = et ? (m = ne.rect) != null ? m : vt : null, Ci = !!(ne.nodeRef.current && ne.rect), Da = py(Ci ? null : vt), mn = Mh(ul ? De(ul) : null), He = by(et ? hl ?? F : null), Hl = zy(He), jn = jy(H, {
    transform: {
      x: bt.x - Da.x,
      y: bt.y - Da.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: B,
    active: Jt,
    activeNodeRect: vt,
    containerNodeRect: il,
    draggingNodeRect: cl,
    over: ve.current.over,
    overlayNodeRect: ne.rect,
    scrollableAncestors: He,
    scrollableAncestorRects: Hl,
    windowRect: mn
  }), Ri = mt ? xa(mt, bt) : null, oe = Sy(He), uc = ch(oe), ji = ch(oe, [vt]), vl = xa(jn, uc), Ie = cl ? X0(cl, jn) : null, hn = Jt && Ie ? T({
    active: Jt,
    collisionRect: Ie,
    droppableRects: Y,
    droppableContainers: b,
    pointerCoordinates: Ri
  }) : null, Na = H0(hn, "id"), [sl, wi] = D.useState(null), vn = Ci ? jn : xa(jn, ji), me = L0(vn, (d = sl?.rect) != null ? d : null, vt), Be = D.useRef(null), re = D.useCallback(
    (qt, Yt) => {
      let {
        sensor: It,
        options: ge
      } = Yt;
      if (Xt.current == null)
        return;
      const ye = I.get(Xt.current);
      if (!ye)
        return;
      const fe = qt.nativeEvent, pe = new It({
        active: Xt.current,
        activeNode: ye,
        event: fe,
        options: ge,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: ve,
        onAbort(kt) {
          if (!I.get(kt))
            return;
          const {
            onDragAbort: Ne
          } = ct.current, Ye = {
            id: kt
          };
          Ne?.(Ye), lt({
            type: "onDragAbort",
            event: Ye
          });
        },
        onPending(kt, Pe, Ne, Ye) {
          if (!I.get(kt))
            return;
          const {
            onDragPending: yl
          } = ct.current, tl = {
            id: kt,
            constraint: Pe,
            initialCoordinates: Ne,
            offset: Ye
          };
          yl?.(tl), lt({
            type: "onDragPending",
            event: tl
          });
        },
        onStart(kt) {
          const Pe = Xt.current;
          if (Pe == null)
            return;
          const Ne = I.get(Pe);
          if (!Ne)
            return;
          const {
            onDragStart: Ye
          } = ct.current, gl = {
            activatorEvent: fe,
            active: {
              id: Pe,
              data: Ne.data,
              rect: Mt
            }
          };
          Si.unstable_batchedUpdates(() => {
            Ye?.(gl), ut(sn.Initializing), W({
              type: Wt.DragStart,
              initialCoordinates: kt,
              active: Pe
            }), lt({
              type: "onDragStart",
              event: gl
            }), O(Be.current), J(fe);
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
      Be.current = pe;
      function qe(kt) {
        return async function() {
          const {
            active: Ne,
            collisions: Ye,
            over: gl,
            scrollAdjustedTranslate: yl
          } = ve.current;
          let tl = null;
          if (Ne && yl) {
            const {
              cancelDrop: Bl
            } = ct.current;
            tl = {
              activatorEvent: fe,
              active: Ne,
              collisions: Ye,
              delta: yl,
              over: gl
            }, kt === Wt.DragEnd && typeof Bl == "function" && await Promise.resolve(Bl(tl)) && (kt = Wt.DragCancel);
          }
          Xt.current = null, Si.unstable_batchedUpdates(() => {
            W({
              type: kt
            }), ut(sn.Uninitialized), wi(null), O(null), J(null), Be.current = null;
            const Bl = kt === Wt.DragEnd ? "onDragEnd" : "onDragCancel";
            if (tl) {
              const Le = ct.current[Bl];
              Le?.(tl), lt({
                type: Bl,
                event: tl
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [I]
  ), cc = D.useCallback((qt, Yt) => (It, ge) => {
    const ye = It.nativeEvent, fe = I.get(ge);
    if (
      // Another sensor is already instantiating
      Xt.current !== null || // No active draggable
      !fe || // Event has already been captured
      ye.dndKit || ye.defaultPrevented
    )
      return;
    const pe = {
      active: fe
    };
    qt(It, Yt.options, pe) === !0 && (ye.dndKit = {
      capturedBy: Yt.sensor
    }, Xt.current = ge, re(It, Yt));
  }, [I, re]), Ui = my(M, cc);
  xy(M), ml(() => {
    vt && nt === sn.Initializing && ut(sn.Initialized);
  }, [vt, nt]), D.useEffect(
    () => {
      const {
        onDragMove: qt
      } = ct.current, {
        active: Yt,
        activatorEvent: It,
        collisions: ge,
        over: ye
      } = ve.current;
      if (!Yt || !It)
        return;
      const fe = {
        active: Yt,
        activatorEvent: It,
        collisions: ge,
        delta: {
          x: vl.x,
          y: vl.y
        },
        over: ye
      };
      Si.unstable_batchedUpdates(() => {
        qt?.(fe), lt({
          type: "onDragMove",
          event: fe
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vl.x, vl.y]
  ), D.useEffect(
    () => {
      const {
        active: qt,
        activatorEvent: Yt,
        collisions: It,
        droppableContainers: ge,
        scrollAdjustedTranslate: ye
      } = ve.current;
      if (!qt || Xt.current == null || !Yt || !ye)
        return;
      const {
        onDragOver: fe
      } = ct.current, pe = ge.get(Na), qe = pe && pe.rect.current ? {
        id: pe.id,
        rect: pe.rect.current,
        data: pe.data,
        disabled: pe.disabled
      } : null, kt = {
        active: qt,
        activatorEvent: Yt,
        collisions: It,
        delta: {
          x: ye.x,
          y: ye.y
        },
        over: qe
      };
      Si.unstable_batchedUpdates(() => {
        wi(qe), fe?.(kt), lt({
          type: "onDragOver",
          event: kt
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Na]
  ), ml(() => {
    ve.current = {
      activatorEvent: B,
      active: Jt,
      activeNode: F,
      collisionRect: Ie,
      collisions: hn,
      droppableRects: Y,
      draggableNodes: I,
      draggingNode: ul,
      draggingNodeRect: cl,
      droppableContainers: Ot,
      over: sl,
      scrollableAncestors: He,
      scrollAdjustedTranslate: vl
    }, Mt.current = {
      initial: cl,
      translated: Ie
    };
  }, [Jt, F, hn, Ie, I, ul, cl, Y, Ot, sl, He, vl]), oy({
    ...jt,
    delta: bt,
    draggingRect: Ie,
    pointerCoordinates: Ri,
    scrollableAncestors: He,
    scrollableAncestorRects: Hl
  });
  const sc = D.useMemo(() => ({
    active: Jt,
    activeNode: F,
    activeNodeRect: vt,
    activatorEvent: B,
    collisions: hn,
    containerNodeRect: il,
    dragOverlay: ne,
    draggableNodes: I,
    droppableContainers: Ot,
    droppableRects: Y,
    over: sl,
    measureDroppableContainers: L,
    scrollableAncestors: He,
    scrollableAncestorRects: Hl,
    measuringConfiguration: C,
    measuringScheduled: P,
    windowRect: mn
  }), [Jt, F, vt, B, hn, il, ne, I, Ot, Y, sl, L, He, Hl, C, P, mn]), wn = D.useMemo(() => ({
    activatorEvent: B,
    activators: Ui,
    active: Jt,
    activeNodeRect: vt,
    ariaDescribedById: {
      draggable: gt
    },
    dispatch: W,
    draggableNodes: I,
    over: sl,
    measureDroppableContainers: L
  }), [B, Ui, Jt, vt, W, gt, I, sl, L]);
  return Ae.createElement(ph.Provider, {
    value: k
  }, Ae.createElement(ac.Provider, {
    value: wn
  }, Ae.createElement(Oh.Provider, {
    value: sc
  }, Ae.createElement(Ch.Provider, {
    value: me
  }, h)), Ae.createElement(Ry, {
    disabled: S?.restoreFocus === !1
  })), Ae.createElement(O0, {
    ...S,
    hiddenTextDescribedById: gt
  }));
  function Un() {
    const qt = le?.autoScrollEnabled === !1, Yt = typeof x == "object" ? x.enabled === !1 : x === !1, It = et && !qt && !Yt;
    return typeof x == "object" ? {
      ...x,
      enabled: It
    } : {
      enabled: It
    };
  }
}), By = /* @__PURE__ */ D.createContext(null), oh = "button", qy = "Draggable";
function Yy(u) {
  let {
    id: c,
    data: s,
    disabled: r = !1,
    attributes: m
  } = u;
  const d = Mi(qy), {
    activators: y,
    activatorEvent: S,
    active: x,
    activeNodeRect: h,
    ariaDescribedById: M,
    draggableNodes: T,
    over: U
  } = D.useContext(ac), {
    role: H = oh,
    roleDescription: Z = "draggable",
    tabIndex: q = 0
  } = m ?? {}, Q = x?.id === c, W = D.useContext(Q ? Ch : By), [lt, k] = Fu(), [nt, ut] = Fu(), et = Ey(y, c), G = _i(s);
  ml(
    () => (T.set(c, {
      id: c,
      key: d,
      node: lt,
      activatorNode: nt,
      data: G
    }), () => {
      const bt = T.get(c);
      bt && bt.key === d && T.delete(c);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [T, c]
  );
  const I = D.useMemo(() => ({
    role: H,
    tabIndex: q,
    "aria-disabled": r,
    "aria-pressed": Q && H === oh ? !0 : void 0,
    "aria-roledescription": Z,
    "aria-describedby": M.draggable
  }), [r, H, q, Q, Z, M.draggable]);
  return {
    active: x,
    activatorEvent: S,
    activeNodeRect: h,
    attributes: I,
    isDragging: Q,
    listeners: r ? void 0 : et,
    node: lt,
    over: U,
    setNodeRef: k,
    setActivatorNodeRef: ut,
    transform: W
  };
}
function Ly() {
  return D.useContext(Oh);
}
const Gy = "Droppable", Xy = {
  timeout: 25
};
function Qy(u) {
  let {
    data: c,
    disabled: s = !1,
    id: r,
    resizeObserverConfig: m
  } = u;
  const d = Mi(Gy), {
    active: y,
    dispatch: S,
    over: x,
    measureDroppableContainers: h
  } = D.useContext(ac), M = D.useRef({
    disabled: s
  }), T = D.useRef(!1), U = D.useRef(null), H = D.useRef(null), {
    disabled: Z,
    updateMeasurementsFor: q,
    timeout: Q
  } = {
    ...Xy,
    ...m
  }, W = _i(q ?? r), lt = D.useCallback(
    () => {
      if (!T.current) {
        T.current = !0;
        return;
      }
      H.current != null && clearTimeout(H.current), H.current = setTimeout(() => {
        h(Array.isArray(W.current) ? W.current : [W.current]), H.current = null;
      }, Q);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [Q]
  ), k = nc({
    callback: lt,
    disabled: Z || !y
  }), nt = D.useCallback((I, bt) => {
    k && (bt && (k.unobserve(bt), T.current = !1), I && k.observe(I));
  }, [k]), [ut, et] = Fu(nt), G = _i(c);
  return D.useEffect(() => {
    !k || !ut.current || (k.disconnect(), T.current = !1, k.observe(ut.current));
  }, [ut, k]), D.useEffect(
    () => (S({
      type: Wt.RegisterDroppable,
      element: {
        id: r,
        key: d,
        disabled: s,
        node: ut,
        rect: U,
        data: G
      }
    }), () => S({
      type: Wt.UnregisterDroppable,
      key: d,
      id: r
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [r]
  ), D.useEffect(() => {
    s !== M.current.disabled && (S({
      type: Wt.SetDroppableDisabled,
      id: r,
      key: d,
      disabled: s
    }), M.current.disabled = s);
  }, [r, d, s, S]), {
    active: y,
    rect: U,
    isOver: x?.id === r,
    node: ut,
    over: x,
    setNodeRef: et
  };
}
function ko(u, c, s) {
  const r = u.slice();
  return r.splice(s < 0 ? r.length + s : s, 0, r.splice(c, 1)[0]), r;
}
function Zy(u, c) {
  return u.reduce((s, r, m) => {
    const d = c.get(r);
    return d && (s[m] = d), s;
  }, Array(u.length));
}
function ku(u) {
  return u !== null && u >= 0;
}
function Vy(u, c) {
  if (u === c)
    return !0;
  if (u.length !== c.length)
    return !1;
  for (let s = 0; s < u.length; s++)
    if (u[s] !== c[s])
      return !1;
  return !0;
}
function Ky(u) {
  return typeof u == "boolean" ? {
    draggable: u,
    droppable: u
  } : u;
}
const $o = (u) => {
  let {
    rects: c,
    activeIndex: s,
    overIndex: r,
    index: m
  } = u;
  const d = ko(c, r, s), y = c[m], S = d[m];
  return !S || !y ? null : {
    x: S.left - y.left,
    y: S.top - y.top,
    scaleX: S.width / y.width,
    scaleY: S.height / y.height
  };
}, Rh = "Sortable", jh = /* @__PURE__ */ Ae.createContext({
  activeIndex: -1,
  containerId: Rh,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: $o,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function Jy(u) {
  let {
    children: c,
    id: s,
    items: r,
    strategy: m = $o,
    disabled: d = !1
  } = u;
  const {
    active: y,
    dragOverlay: S,
    droppableRects: x,
    over: h,
    measureDroppableContainers: M
  } = Ly(), T = Mi(Rh, s), U = S.rect !== null, H = D.useMemo(() => r.map((et) => typeof et == "object" && "id" in et ? et.id : et), [r]), Z = y != null, q = y ? H.indexOf(y.id) : -1, Q = h ? H.indexOf(h.id) : -1, W = D.useRef(H), lt = !Vy(H, W.current), k = Q !== -1 && q === -1 || lt, nt = Ky(d);
  ml(() => {
    lt && Z && M(H);
  }, [lt, H, Z, M]), D.useEffect(() => {
    W.current = H;
  }, [H]);
  const ut = D.useMemo(
    () => ({
      activeIndex: q,
      containerId: T,
      disabled: nt,
      disableTransforms: k,
      items: H,
      overIndex: Q,
      useDragOverlay: U,
      sortedRects: Zy(H, x),
      strategy: m
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, T, nt.draggable, nt.droppable, k, H, Q, x, U, m]
  );
  return Ae.createElement(jh.Provider, {
    value: ut
  }, c);
}
const ky = (u) => {
  let {
    id: c,
    items: s,
    activeIndex: r,
    overIndex: m
  } = u;
  return ko(s, r, m).indexOf(c);
}, $y = (u) => {
  let {
    containerId: c,
    isSorting: s,
    wasDragging: r,
    index: m,
    items: d,
    newIndex: y,
    previousItems: S,
    previousContainerId: x,
    transition: h
  } = u;
  return !h || !r || S !== d && m === y ? !1 : s ? !0 : y !== m && c === x;
}, Wy = {
  duration: 200,
  easing: "ease"
}, wh = "transform", Fy = /* @__PURE__ */ Ti.Transition.toString({
  property: wh,
  duration: 0,
  easing: "linear"
}), Iy = {
  roleDescription: "sortable"
};
function Py(u) {
  let {
    disabled: c,
    index: s,
    node: r,
    rect: m
  } = u;
  const [d, y] = D.useState(null), S = D.useRef(s);
  return ml(() => {
    if (!c && s !== S.current && r.current) {
      const x = m.current;
      if (x) {
        const h = Aa(r.current, {
          ignoreTransform: !0
        }), M = {
          x: x.left - h.left,
          y: x.top - h.top,
          scaleX: x.width / h.width,
          scaleY: x.height / h.height
        };
        (M.x || M.y) && y(M);
      }
    }
    s !== S.current && (S.current = s);
  }, [c, s, r, m]), D.useEffect(() => {
    d && y(null);
  }, [d]), d;
}
function tp(u) {
  let {
    animateLayoutChanges: c = $y,
    attributes: s,
    disabled: r,
    data: m,
    getNewIndex: d = ky,
    id: y,
    strategy: S,
    resizeObserverConfig: x,
    transition: h = Wy
  } = u;
  const {
    items: M,
    containerId: T,
    activeIndex: U,
    disabled: H,
    disableTransforms: Z,
    sortedRects: q,
    overIndex: Q,
    useDragOverlay: W,
    strategy: lt
  } = D.useContext(jh), k = ep(r, H), nt = M.indexOf(y), ut = D.useMemo(() => ({
    sortable: {
      containerId: T,
      index: nt,
      items: M
    },
    ...m
  }), [T, m, nt, M]), et = D.useMemo(() => M.slice(M.indexOf(y)), [M, y]), {
    rect: G,
    node: I,
    isOver: bt,
    setNodeRef: Ot
  } = Qy({
    id: y,
    data: ut,
    disabled: k.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: et,
      ...x
    }
  }), {
    active: dt,
    activatorEvent: Mt,
    activeNodeRect: Jt,
    attributes: Xt,
    setNodeRef: le,
    listeners: O,
    isDragging: B,
    over: J,
    setActivatorNodeRef: ct,
    transform: gt
  } = Yy({
    id: y,
    data: ut,
    attributes: {
      ...Iy,
      ...s
    },
    disabled: k.draggable
  }), b = y0(Ot, le), C = !!dt, Y = C && !Z && ku(U) && ku(Q), L = !W && B, P = L && Y ? gt : null, mt = Y ? P ?? (S ?? lt)({
    rects: q,
    activeNodeRect: Jt,
    activeIndex: U,
    overIndex: Q,
    index: nt
  }) : null, jt = ku(U) && ku(Q) ? d({
    id: y,
    items: M,
    activeIndex: U,
    overIndex: Q
  }) : nt, St = dt?.id, vt = D.useRef({
    activeId: St,
    items: M,
    newIndex: jt,
    containerId: T
  }), il = M !== vt.current.items, ve = c({
    active: dt,
    containerId: T,
    isDragging: B,
    isSorting: C,
    id: y,
    index: nt,
    items: M,
    newIndex: vt.current.newIndex,
    previousItems: vt.current.items,
    previousContainerId: vt.current.containerId,
    transition: h,
    wasDragging: vt.current.activeId != null
  }), hl = Py({
    disabled: !ve,
    index: nt,
    node: I,
    rect: G
  });
  return D.useEffect(() => {
    C && vt.current.newIndex !== jt && (vt.current.newIndex = jt), T !== vt.current.containerId && (vt.current.containerId = T), M !== vt.current.items && (vt.current.items = M);
  }, [C, jt, T, M]), D.useEffect(() => {
    if (St === vt.current.activeId)
      return;
    if (St != null && vt.current.activeId == null) {
      vt.current.activeId = St;
      return;
    }
    const ul = setTimeout(() => {
      vt.current.activeId = St;
    }, 50);
    return () => clearTimeout(ul);
  }, [St]), {
    active: dt,
    activeIndex: U,
    attributes: Xt,
    data: ut,
    rect: G,
    index: nt,
    newIndex: jt,
    items: M,
    isOver: bt,
    isSorting: C,
    isDragging: B,
    listeners: O,
    node: I,
    overIndex: Q,
    over: J,
    setNodeRef: b,
    setActivatorNodeRef: ct,
    setDroppableNodeRef: Ot,
    setDraggableNodeRef: le,
    transform: hl ?? mt,
    transition: ne()
  };
  function ne() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      hl || // Or to prevent items jumping to back to their "new" position when items change
      il && vt.current.newIndex === nt
    )
      return Fy;
    if (!(L && !Qo(Mt) || !h) && (C || ve))
      return Ti.Transition.toString({
        ...h,
        property: wh
      });
  }
}
function ep(u, c) {
  var s, r;
  return typeof u == "boolean" ? {
    draggable: u,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (s = u?.draggable) != null ? s : c.draggable,
    droppable: (r = u?.droppable) != null ? r : c.droppable
  };
}
Et.Down, Et.Right, Et.Up, Et.Left;
const Uh = D.createContext(null);
function lp({ source: u, children: c }) {
  return /* @__PURE__ */ g.jsx(Uh.Provider, { value: u, children: c });
}
function Oi() {
  const u = D.useContext(Uh);
  if (!u) throw new Error("useHassSource must be used inside <HassProvider>");
  return u;
}
function Wo(u) {
  const c = Oi();
  return D.useSyncExternalStore(c.subscribe, () => c.getStates()[u]);
}
function np() {
  const u = Oi();
  return D.useSyncExternalStore(u.subscribe, u.getStates);
}
function za(u) {
  const c = Oi();
  return D.useSyncExternalStore(c.subscribe, () => u(c.getStates()));
}
function dn() {
  return Oi().callService;
}
function rn(u) {
  return u.split(".")[0];
}
function Ut(u) {
  return u.attributes.friendly_name || u.entity_id;
}
function Ea(u) {
  return u.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}
function rh(u) {
  return Math.abs(u) >= 100 ? Math.round(u).toString() : u.toFixed(1).replace(/\.0$/, "");
}
function ap(u, c, s) {
  return Math.min(s, Math.max(c, u));
}
function on(u, c) {
  const s = u.attributes.supported_features;
  return s != null && (s & c) === c;
}
function qo() {
  return crypto.randomUUID();
}
const ip = [
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
], up = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor", "binary_sensor", "humidifier", "siren"]), fh = ["Living Room", "Kitchen", "Bedroom", "Office", "Bathroom", "Hallway", "Garage", "Outdoor", "Garden", "Home"];
function cp(u) {
  const c = `${u.entity_id} ${Ut(u)}`.toLowerCase();
  for (const [s, r] of ip) if (c.includes(s)) return r;
  return "Home";
}
function sp(u) {
  const c = rn(u);
  return c === "media_player" || c === "sensor" ? 2 : 1;
}
function op(u) {
  const c = /* @__PURE__ */ new Map();
  for (const r of Object.values(u)) {
    const m = rn(r.entity_id);
    if (!up.has(m) || m === "sensor" && !r.attributes.unit_of_measurement) continue;
    const d = cp(r);
    let y = c.get(d);
    y || (y = [], c.set(d, y)), y.push(r);
  }
  const s = [];
  for (const [r, m] of c) {
    const d = (q) => m.filter((Q) => rn(Q.entity_id) === q).sort((Q, W) => Ut(Q).localeCompare(Ut(W))), y = d("light"), S = d("climate"), x = d("media_player"), h = d("cover"), M = d("lock"), T = [...d("switch"), ...d("fan"), ...d("humidifier"), ...d("siren")], U = [...d("sensor"), ...d("binary_sensor")], H = [], Z = (q, Q, W, lt) => {
      Q.length && H.push({ id: qo(), type: q, title: lt, entityIds: Q, size: W });
    };
    S.length && Z("hero", [S[0].entity_id], 2), Z("group", y.map((q) => q.entity_id), 2, "Lighting");
    for (const q of x) Z("card", [q.entity_id], 2);
    S.length > 1 && Z("list", S.slice(1).map((q) => q.entity_id), 1, "Climate"), Z("list", [...M, ...h].map((q) => q.entity_id), 1, "Security & doors"), Z("group", T.map((q) => q.entity_id), 1, "Switches & fans"), Z("list", U.map((q) => q.entity_id), 1, "Sensors"), H.length && s.push({ id: qo(), name: r, areaId: null, blocks: H });
  }
  return s.sort((r, m) => {
    const d = fh.indexOf(r.name), y = fh.indexOf(m.name);
    return (d < 0 ? 99 : d) - (y < 0 ? 99 : y) || r.name.localeCompare(m.name);
  }), { version: 2, rooms: s };
}
const ec = "simui:dashboard:v2";
async function rp(u) {
  const c = u.connection;
  if (c)
    try {
      const s = await c.sendMessagePromise({ type: "frontend/get_user_data", key: ec });
      if (s && s.value && s.value.version === 2) return s.value;
    } catch {
    }
  try {
    const s = localStorage.getItem(ec);
    if (s) {
      const r = JSON.parse(s);
      if (r.version === 2) return r;
    }
  } catch {
  }
  return null;
}
async function fp(u, c) {
  try {
    localStorage.setItem(ec, JSON.stringify(c));
  } catch {
  }
  const s = u.connection;
  if (s)
    try {
      await s.sendMessagePromise({ type: "frontend/set_user_data", key: ec, value: c });
    } catch {
    }
}
const Hh = D.createContext(null);
function ic() {
  const u = D.useContext(Hh);
  if (!u) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return u;
}
function dp({ children: u }) {
  const c = Oi(), [s, r] = D.useState(null), [m, d] = D.useState({ kind: "home" }), [y, S] = D.useState(!1), x = D.useRef(!1);
  D.useEffect(() => {
    let T = !0;
    return (async () => {
      const H = await rp(c) ?? op(c.getStates());
      T && (r(H), x.current = !0);
    })(), () => {
      T = !1;
    };
  }, [c]), D.useEffect(() => {
    !x.current || !s || fp(c, s);
  }, [s, c]);
  const h = (T) => {
    r((U) => !U || m.kind !== "room" ? U : { ...U, rooms: U.rooms.map((H) => H.id === m.id ? { ...H, blocks: T(H.blocks) } : H) });
  }, M = {
    config: s,
    route: m,
    goHome: () => {
      S(!1), d({ kind: "home" }), window.scrollTo?.(0, 0);
    },
    openRoom: (T) => {
      S(!1), d({ kind: "room", id: T }), window.scrollTo?.(0, 0);
    },
    editing: y,
    setEditing: S,
    reorderBlocks: (T, U) => h((H) => ko(H, T, U)),
    removeBlock: (T) => h((U) => U.filter((H) => H.id !== T)),
    setBlockSize: (T, U) => h((H) => H.map((Z) => Z.id === T ? { ...Z, size: U } : Z)),
    addCard: (T) => h((U) => [...U, { id: qo(), type: "card", entityIds: [T], size: sp(T) }])
  };
  return /* @__PURE__ */ g.jsx(Hh.Provider, { value: M, children: u });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = (...u) => u.filter((c, s, r) => !!c && c.trim() !== "" && r.indexOf(c) === s).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mp = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = (u) => u.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (c, s, r) => r ? r.toUpperCase() : s.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dh = (u) => {
  const c = hp(u);
  return c.charAt(0).toUpperCase() + c.slice(1);
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Mo = {
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
const vp = (u) => {
  for (const c in u)
    if (c.startsWith("aria-") || c === "role" || c === "title")
      return !0;
  return !1;
}, gp = D.createContext({}), yp = () => D.useContext(gp), pp = D.forwardRef(
  ({ color: u, size: c, strokeWidth: s, absoluteStrokeWidth: r, className: m = "", children: d, iconNode: y, ...S }, x) => {
    const {
      size: h = 24,
      strokeWidth: M = 2,
      absoluteStrokeWidth: T = !1,
      color: U = "currentColor",
      className: H = ""
    } = yp() ?? {}, Z = r ?? T ? Number(s ?? M) * 24 / Number(c ?? h) : s ?? M;
    return D.createElement(
      "svg",
      {
        ref: x,
        ...Mo,
        width: c ?? h ?? Mo.width,
        height: c ?? h ?? Mo.height,
        stroke: u ?? U,
        strokeWidth: Z,
        className: Bh("lucide", H, m),
        ...!d && !vp(S) && { "aria-hidden": "true" },
        ...S
      },
      [
        ...y.map(([q, Q]) => D.createElement(q, Q)),
        ...Array.isArray(d) ? d : [d]
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
const Ft = (u, c) => {
  const s = D.forwardRef(
    ({ className: r, ...m }, d) => D.createElement(pp, {
      ref: d,
      iconNode: c,
      className: Bh(
        `lucide-${mp(dh(u))}`,
        `lucide-${u}`,
        r
      ),
      ...m
    })
  );
  return s.displayName = dh(u), s;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bp = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Sp = Ft("check", bp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], qh = Ft("chevron-down", xp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], zp = Ft("chevron-left", Ep);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _p = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Tp = Ft("chevron-right", _p);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ap = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Yh = Ft("chevron-up", Ap);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Np = Ft("lightbulb", Dp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], Lh = Ft("lock-open", Mp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Op = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], Gh = Ft("lock", Op);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = [["path", { d: "M5 12h14", key: "1ays0h" }]], Rp = Ft("minus", Cp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], wp = Ft("pause", jp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], Hp = Ft("pencil", Up);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bp = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], mh = Ft("play", Bp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Xh = Ft("plus", qp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yp = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Qh = Ft("power", Yp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], Gp = Ft("skip-back", Lp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], Qp = Ft("skip-forward", Xp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Vp = Ft("square", Zp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], Zh = Ft("thermometer", Kp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], kp = Ft("x", Jp);
function Vh(u, c, s) {
  const r = [], m = u.blocks.find((S) => S.type === "hero")?.entityIds[0], d = m ? s[m]?.attributes.current_temperature : void 0;
  if (d != null && r.push(`${Math.round(Number(d))}°`), c.length) {
    const S = c.filter((x) => s[x]?.state === "on").length;
    S && r.push(`${S} ${S === 1 ? "light" : "lights"} on`);
  }
  const y = u.blocks.flatMap((S) => S.entityIds).filter((S) => S.startsWith("lock."));
  if (y.length) {
    const S = y.filter((x) => s[x]?.state === "unlocked").length;
    r.push(S ? `${S} unlocked` : "all locked");
  }
  return r.join(" · ");
}
function Kh(u) {
  return u.blocks.flatMap((c) => c.entityIds).filter((c) => c.startsWith("light."));
}
function $p({ room: u, onOpen: c }) {
  const s = D.useMemo(() => Kh(u), [u]), r = D.useMemo(() => new Set(u.blocks.flatMap((y) => y.entityIds)).size, [u]), m = za((y) => s.some((S) => y[S]?.state === "on")), d = za((y) => Vh(u, s, y));
  return /* @__PURE__ */ g.jsxs("button", { className: `simui-roomcard${m ? " lit" : ""}`, onClick: c, children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-roomcard-top", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-roomcard-name", children: u.name }),
      /* @__PURE__ */ g.jsx(Tp, { className: "simui-roomcard-go", size: 16 })
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: "simui-roomcard-glance num", children: d || `${r} ${r === 1 ? "device" : "devices"}` })
  ] });
}
function Wp() {
  const u = (/* @__PURE__ */ new Date()).getHours();
  return u < 5 ? "Good night" : u < 12 ? "Good morning" : u < 18 ? "Good afternoon" : "Good evening";
}
function Fp() {
  const { config: u, openRoom: c } = ic();
  return u ? /* @__PURE__ */ g.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ g.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-head-title", children: Wp() }),
      /* @__PURE__ */ g.jsx(Ip, { config: u })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "simui-content", children: /* @__PURE__ */ g.jsx("div", { className: "simui-home-grid", children: u.rooms.map((s) => /* @__PURE__ */ g.jsx($p, { room: s, onOpen: () => c(s.id) }, s.id)) }) })
  ] }) : null;
}
function Ip({ config: u }) {
  const c = za((s) => {
    const m = u.rooms.flatMap((y) => y.blocks.flatMap((S) => S.entityIds)).filter((y) => y.startsWith("light.")).filter((y) => s[y]?.state === "on").length, d = u.rooms.length;
    return `${d} ${d === 1 ? "room" : "rooms"}${m ? ` · ${m} lights on` : ""}`;
  });
  return /* @__PURE__ */ g.jsx("span", { className: "simui-head-glance num", children: c });
}
function Pp({ block: u }) {
  const c = Wo(u.entityIds[0]);
  if (!c) return null;
  const s = c.attributes, r = s.current_temperature, m = s.temperature, d = s.hvac_action;
  let y = c.state.replace(/_/g, " ");
  return d === "heating" && m != null ? y = `Heating to ${Oo(m)}°` : d === "cooling" && m != null ? y = `Cooling to ${Oo(m)}°` : d === "idle" ? y = "Idle" : m != null && (y = `Set to ${Oo(m)}°`), /* @__PURE__ */ g.jsxs("div", { className: "simui-hero", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-hero-temp num", children: [
      r != null ? Math.round(r) : "—",
      /* @__PURE__ */ g.jsx("small", { children: "°" })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "simui-hero-sub", children: y })
  ] });
}
function Oo(u) {
  return Number.isInteger(u) ? `${u}` : u.toFixed(1);
}
const tb = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "humidifier", "siren", "automation"]);
function Jh({ entityId: u }) {
  const c = Wo(u), s = dn();
  if (!c)
    return /* @__PURE__ */ g.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name muted", children: u }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-state", children: "—" })
    ] });
  const r = rn(u), m = Ut(c);
  if (r === "light") {
    const d = c.state === "on", y = c.attributes.brightness ?? 0, S = d ? Math.max(1, Math.round(y / 255 * 100)) : 0, x = () => {
      s("light", d ? "turn_off" : "turn_on", {}, { entity_id: u });
    }, h = (M) => {
      s("light", "turn_on", { brightness_pct: Number(M.target.value) }, { entity_id: u });
    };
    return /* @__PURE__ */ g.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ g.jsx("button", { className: "simui-erow-dot", "data-on": d, "aria-label": `Toggle ${m}`, onClick: x }),
      /* @__PURE__ */ g.jsx("button", { className: "simui-erow-name as-btn", onClick: x, children: m }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      d ? /* @__PURE__ */ g.jsx(
        "input",
        {
          className: "simui-slider warm mini",
          type: "range",
          min: 1,
          max: 100,
          value: S,
          "aria-label": `${m} brightness`,
          onChange: h,
          style: { background: `linear-gradient(to right, var(--warm) ${S}%, var(--faint) ${S}%)` }
        }
      ) : /* @__PURE__ */ g.jsx("span", { className: "simui-erow-state", children: "Off" })
    ] });
  }
  if (r === "lock") {
    const d = c.state === "locked", y = () => {
      s("lock", d ? "unlock" : "lock", {}, { entity_id: u });
    };
    return /* @__PURE__ */ g.jsxs("button", { className: "simui-erow as-row", onClick: y, children: [
      /* @__PURE__ */ g.jsx("span", { className: `simui-erow-ic${d ? "" : " amber"}`, children: d ? /* @__PURE__ */ g.jsx(Gh, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ g.jsx(Lh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: `simui-erow-state${d ? "" : " warn"}`, children: d ? "Locked" : "Unlocked" })
    ] });
  }
  if (r === "cover") {
    const d = c.attributes.current_position, y = (S) => {
      s("cover", S, void 0, { entity_id: u });
    };
    return /* @__PURE__ */ g.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-state", children: d != null ? `${d}%` : Ea(c.state) }),
      on(c, 1) && /* @__PURE__ */ g.jsx("button", { className: "simui-rbtn", "aria-label": "Open", onClick: () => y("open_cover"), children: /* @__PURE__ */ g.jsx(Yh, { size: 14 }) }),
      on(c, 2) && /* @__PURE__ */ g.jsx("button", { className: "simui-rbtn", "aria-label": "Close", onClick: () => y("close_cover"), children: /* @__PURE__ */ g.jsx(qh, { size: 14 }) })
    ] });
  }
  if (r === "sensor" || r === "binary_sensor") {
    const d = c.attributes.unit_of_measurement ?? "";
    return /* @__PURE__ */ g.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsxs("span", { className: "simui-erow-val num", children: [
        Ea(c.state),
        d ? ` ${d}` : ""
      ] })
    ] });
  }
  if (tb.has(r) && (c.state === "on" || c.state === "off")) {
    const d = c.state === "on", y = () => {
      s("homeassistant", d ? "turn_off" : "turn_on", {}, { entity_id: u });
    };
    return /* @__PURE__ */ g.jsxs("button", { className: "simui-erow as-row", onClick: y, children: [
      /* @__PURE__ */ g.jsx("span", { className: `simui-erow-ic${d ? " cool" : ""}`, children: /* @__PURE__ */ g.jsx(Qh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: `simui-erow-state${d ? " on" : ""}`, children: d ? "On" : "Off" })
    ] });
  }
  return /* @__PURE__ */ g.jsxs("div", { className: "simui-erow", children: [
    /* @__PURE__ */ g.jsx("span", { className: "simui-erow-name", children: m }),
    /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ g.jsx("span", { className: "simui-erow-state", children: Ea(c.state) })
  ] });
}
function eb({ block: u }) {
  const c = u.entityIds, s = c.length > 0 && c.every((r) => rn(r) === "light");
  return /* @__PURE__ */ g.jsxs("div", { className: "simui-surface", children: [
    u.title && /* @__PURE__ */ g.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ g.jsx("span", { children: u.title }) }),
    s && /* @__PURE__ */ g.jsx(lb, { ids: c }),
    /* @__PURE__ */ g.jsx("div", { className: "simui-rows", children: c.map((r) => /* @__PURE__ */ g.jsx(Jh, { entityId: r }, r)) })
  ] });
}
function lb({ ids: u }) {
  const c = dn(), s = za((m) => {
    const d = u.filter((S) => m[S]?.state === "on");
    if (!d.length) return 0;
    const y = d.reduce((S, x) => S + Number(m[x]?.attributes.brightness ?? 0), 0);
    return Math.round(y / d.length / 255 * 100);
  }), r = (m) => {
    const d = Number(m.target.value);
    u.forEach((y) => {
      c("light", "turn_on", { brightness_pct: d }, { entity_id: y });
    });
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "simui-master", children: [
    /* @__PURE__ */ g.jsx("span", { className: "simui-master-label", children: "All" }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: s,
        "aria-label": "All lights brightness",
        onChange: r,
        style: { background: `linear-gradient(to right, var(--warm) ${s}%, var(--faint) ${s}%)` }
      }
    ),
    /* @__PURE__ */ g.jsxs("span", { className: "simui-master-val num", children: [
      s,
      "%"
    ] })
  ] });
}
function nb({ block: u }) {
  return /* @__PURE__ */ g.jsxs("div", { className: "simui-surface list", children: [
    u.title && /* @__PURE__ */ g.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ g.jsx("span", { children: u.title }) }),
    /* @__PURE__ */ g.jsx("div", { className: "simui-rows divided", children: u.entityIds.map((c) => /* @__PURE__ */ g.jsx(Jh, { entityId: c }, c)) })
  ] });
}
function fn({ children: u, active: c, onClick: s, className: r = "", style: m }) {
  const d = s ? (y) => {
    (y.key === "Enter" || y.key === " ") && (y.preventDefault(), s());
  } : void 0;
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      className: [
        "simui-tile",
        c ? "is-active" : "",
        s ? "is-clickable" : "",
        r
      ].filter(Boolean).join(" "),
      onClick: s,
      onKeyDown: d,
      role: s ? "button" : void 0,
      tabIndex: s ? 0 : void 0,
      style: m,
      children: u
    }
  );
}
const ab = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, ib = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function ub({ entity: u }) {
  const c = dn(), s = u.attributes, r = s.hvac_action, m = s.current_temperature, d = s.temperature, y = s.target_temp_low, S = s.target_temp_high, x = s.target_temp_step ?? 0.5, h = s.min_temp ?? 7, M = s.max_temp ?? 35, T = r && ab[r] || ib[u.state] || "", U = (H) => {
    if (d == null) return;
    const Z = ap(Math.round((d + H) / x) * x, h, M);
    c("climate", "set_temperature", { temperature: Z }, { entity_id: u.entity_id });
  };
  return /* @__PURE__ */ g.jsxs(fn, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsx("span", { className: `simui-ic ${T}`, children: /* @__PURE__ */ g.jsx(Zh, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsxs("span", { className: "simui-big", children: [
        m != null ? Math.round(m) : "—",
        /* @__PURE__ */ g.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      d != null ? /* @__PURE__ */ g.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ g.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => U(-x), children: /* @__PURE__ */ g.jsx(Rp, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ g.jsxs("span", { className: "simui-target", children: [
          Co(d),
          "°"
        ] }),
        /* @__PURE__ */ g.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => U(x), children: /* @__PURE__ */ g.jsx(Xh, { size: 14, strokeWidth: 2.5 }) })
      ] }) : y != null && S != null ? /* @__PURE__ */ g.jsxs("span", { className: "simui-target", children: [
        Co(y),
        "–",
        Co(S),
        "°"
      ] }) : null
    ] })
  ] });
}
function Co(u) {
  return Number.isInteger(u) ? `${u}` : u.toFixed(1);
}
const $u = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function cb({ entity: u }) {
  const c = dn(), s = u.attributes.current_position, r = u.state === "open" || s != null && s > 0, m = on(u, $u.SET_POSITION) && s != null, d = (S, x) => {
    c("cover", S, x, { entity_id: u.entity_id });
  }, y = m ? { background: `linear-gradient(to right, var(--accent) ${s}%, var(--faint) ${s}%)` } : void 0;
  return /* @__PURE__ */ g.jsxs(fn, { className: r ? "is-on" : "", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-value", children: s != null ? `${s}%` : Ea(u.state) })
    ] }),
    m ? /* @__PURE__ */ g.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: s,
        "aria-label": "Position",
        style: y,
        onChange: (S) => d("set_cover_position", { position: Number(S.target.value) })
      }
    ) : /* @__PURE__ */ g.jsxs("div", { className: "simui-controls", children: [
      on(u, $u.OPEN) && /* @__PURE__ */ g.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => d("open_cover"), children: /* @__PURE__ */ g.jsx(Yh, { size: 15, strokeWidth: 2 }) }),
      on(u, $u.STOP) && /* @__PURE__ */ g.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => d("stop_cover"), children: /* @__PURE__ */ g.jsx(Vp, { size: 12, strokeWidth: 2 }) }),
      on(u, $u.CLOSE) && /* @__PURE__ */ g.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => d("close_cover"), children: /* @__PURE__ */ g.jsx(qh, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const sb = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function ob({ entity: u }) {
  const c = dn(), s = rn(u.entity_id), r = u.state === "on" || u.state === "off", m = u.state === "on", d = sb.has(s) && r, y = u.attributes.unit_of_measurement ?? "", S = d ? () => {
    c("homeassistant", m ? "turn_off" : "turn_on", {}, { entity_id: u.entity_id });
  } : void 0;
  return /* @__PURE__ */ g.jsxs(fn, { onClick: S, className: d && m ? "is-on" : "", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      d && /* @__PURE__ */ g.jsx("span", { className: `simui-ic${m ? " cool" : ""}`, children: /* @__PURE__ */ g.jsx(Qh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) })
    ] }),
    /* @__PURE__ */ g.jsxs("span", { className: "simui-state", children: [
      Ea(u.state),
      y ? ` ${y}` : ""
    ] })
  ] });
}
function rb({ entity: u }) {
  const c = dn(), s = u.state === "on", r = u.attributes.brightness ?? 0, m = s ? Math.max(1, Math.round(r / 255 * 100)) : 0, d = () => {
    c("light", s ? "turn_off" : "turn_on", {}, { entity_id: u.entity_id });
  }, y = (h) => {
    c("light", "turn_on", { brightness_pct: Number(h.target.value) }, { entity_id: u.entity_id });
  }, x = { background: `linear-gradient(to right, ${s ? "var(--warm)" : "var(--faint)"} ${m}%, var(--faint) ${m}%)` };
  return /* @__PURE__ */ g.jsxs(fn, { onClick: d, className: s ? "is-lit" : "", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsx("span", { className: `simui-ic${s ? " warm" : ""}`, children: /* @__PURE__ */ g.jsx(Np, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: `simui-pct${s ? " on" : ""}`, children: s ? `${m}%` : "Off" })
    ] }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: m,
        "aria-label": `${Ut(u)} brightness`,
        style: x,
        onClick: (h) => h.stopPropagation(),
        onChange: y
      }
    )
  ] });
}
function fb({ entity: u }) {
  const c = dn(), s = u.state === "locked", r = () => {
    c("lock", s ? "unlock" : "lock", {}, { entity_id: u.entity_id });
  };
  return /* @__PURE__ */ g.jsxs(fn, { onClick: r, className: s ? "" : "is-unlocked", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsx("span", { className: `simui-ic${s ? "" : " amber"}`, children: s ? /* @__PURE__ */ g.jsx(Gh, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ g.jsx(Lh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) })
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: `simui-state${s ? "" : " warn"}`, children: s ? "Locked" : "Unlocked" })
  ] });
}
const hh = { PREV: 16, NEXT: 32 };
function db({ entity: u }) {
  const c = dn(), s = u.attributes, r = u.state, m = r === "playing", d = s.media_title, y = s.media_artist ?? s.media_album_name ?? s.app_name, S = s.entity_picture, x = !!d, h = (M) => {
    c("media_player", M, void 0, { entity_id: u.entity_id });
  };
  return x ? /* @__PURE__ */ g.jsx(fn, { children: /* @__PURE__ */ g.jsxs("div", { className: "simui-np", children: [
    S ? /* @__PURE__ */ g.jsx("img", { className: "simui-art", src: S, alt: "" }) : /* @__PURE__ */ g.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-title", title: d, children: d }),
      y && /* @__PURE__ */ g.jsx("span", { className: "simui-artist", title: y, children: y })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-tp", children: [
      on(u, hh.PREV) && /* @__PURE__ */ g.jsx("button", { "aria-label": "Previous", onClick: () => h("media_previous_track"), children: /* @__PURE__ */ g.jsx(Gp, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ g.jsx("button", { className: "play", "aria-label": m ? "Pause" : "Play", onClick: () => h("media_play_pause"), children: m ? /* @__PURE__ */ g.jsx(wp, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ g.jsx(mh, { size: 15, fill: "currentColor" }) }),
      on(u, hh.NEXT) && /* @__PURE__ */ g.jsx("button", { "aria-label": "Next", onClick: () => h("media_next_track"), children: /* @__PURE__ */ g.jsx(Qp, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ g.jsxs(fn, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-state", children: Ea(r) })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ g.jsx("button", { className: "play", "aria-label": "Play", onClick: () => h("media_play_pause"), children: /* @__PURE__ */ g.jsx(mh, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function mb({ values: u, width: c = 116, height: s = 26 }) {
  if (u.length < 2) return null;
  const r = Math.min(...u), d = Math.max(...u) - r || 1, y = c / (u.length - 1), S = u.map((x, h) => `${(h * y).toFixed(1)},${(s - (x - r) / d * s).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ g.jsx(
    "svg",
    {
      className: "simui-spark",
      width: c,
      height: s,
      viewBox: `0 0 ${c} ${s}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ g.jsx(
        "polyline",
        {
          points: S,
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
const Ro = /* @__PURE__ */ new Map(), hb = 40;
function vb({ entity: u }) {
  const c = u.attributes, s = c.unit_of_measurement ?? "", r = c.device_class === "temperature", m = Number(u.state), d = u.state !== "" && !Number.isNaN(m), y = D.useRef(""), [, S] = D.useState(0);
  D.useEffect(() => {
    if (!d || y.current === u.state) return;
    y.current = u.state;
    const U = Ro.get(u.entity_id) ?? [];
    for (U.push(m); U.length > hb; ) U.shift();
    Ro.set(u.entity_id, U), S((H) => H + 1);
  }, [u.entity_id, u.state, d, m]);
  const x = Ro.get(u.entity_id) ?? [], h = x.length > 1 ? m - x[0] : 0, M = d && Math.abs(h) >= 0.05, T = r ? "°" : "";
  return /* @__PURE__ */ g.jsxs(fn, { children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", children: [
      r && /* @__PURE__ */ g.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ g.jsx(Zh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: Ut(u), children: Ut(u) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      M && /* @__PURE__ */ g.jsxs("span", { className: `simui-delta ${h > 0 ? "up" : "down"}`, children: [
        h > 0 ? "▲" : "▼",
        " ",
        rh(Math.abs(h)),
        T
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ g.jsxs("span", { className: "simui-big", children: [
        d ? rh(m) : u.state,
        s ? /* @__PURE__ */ g.jsxs("span", { className: "simui-unit", children: [
          " ",
          s
        ] }) : null
      ] }),
      d && x.length > 1 && /* @__PURE__ */ g.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ g.jsx(mb, { values: x, width: 64, height: 22 }) })
    ] })
  ] });
}
const gb = {
  light: rb,
  sensor: vb,
  climate: ub,
  media_player: db,
  cover: cb,
  lock: fb
};
function yb(u) {
  return gb[u] ?? ob;
}
function pb({ block: u }) {
  const c = u.entityIds[0], s = Wo(c), r = yb(rn(c));
  return s ? /* @__PURE__ */ g.jsx(r, { entity: s }) : /* @__PURE__ */ g.jsxs("div", { className: "simui-tile", children: [
    /* @__PURE__ */ g.jsx("div", { className: "simui-row", children: /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: c, children: c }) }),
    /* @__PURE__ */ g.jsx("span", { className: "simui-state", children: "Unavailable" })
  ] });
}
function bb({ block: u }) {
  switch (u.type) {
    case "hero":
      return /* @__PURE__ */ g.jsx(Pp, { block: u });
    case "group":
      return /* @__PURE__ */ g.jsx(eb, { block: u });
    case "list":
      return /* @__PURE__ */ g.jsx(nb, { block: u });
    case "card":
      return /* @__PURE__ */ g.jsx(pb, { block: u });
    default:
      return null;
  }
}
function Sb({ block: u, editing: c }) {
  const { removeBlock: s, setBlockSize: r } = ic(), { attributes: m, listeners: d, setNodeRef: y, transform: S, transition: x, isDragging: h } = tp({
    id: u.id,
    disabled: !c
  }), M = {
    transform: Ti.Transform.toString(S),
    transition: x,
    zIndex: h ? 20 : void 0
  };
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      ref: y,
      style: M,
      className: `simui-block${u.size === 2 ? " span-2" : ""}${c ? " editing" : ""}${h ? " dragging" : ""}`,
      children: [
        /* @__PURE__ */ g.jsx(bb, { block: u }),
        c && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
          /* @__PURE__ */ g.jsx("div", { className: "simui-card-grab", ...m, ...d, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ g.jsx("button", { className: "simui-card-btn size", onPointerDown: (T) => T.stopPropagation(), onClick: () => r(u.id, u.size === 2 ? 1 : 2), "aria-label": "Toggle width", children: u.size === 2 ? "1×" : "2×" }),
          /* @__PURE__ */ g.jsx("button", { className: "simui-card-btn x", onPointerDown: (T) => T.stopPropagation(), onClick: () => s(u.id), "aria-label": "Remove block", children: "×" })
        ] })
      ]
    }
  );
}
function xb({ existing: u, onAdd: c, onClose: s }) {
  const r = np(), [m, d] = D.useState(""), y = new Set(u), S = m.toLowerCase(), x = Object.values(r).filter((h) => !y.has(h.entity_id)).filter((h) => Ut(h).toLowerCase().includes(S) || h.entity_id.includes(S)).sort((h, M) => Ut(h).localeCompare(Ut(M))).slice(0, 200);
  return /* @__PURE__ */ g.jsx("div", { className: "simui-modal", onClick: s, children: /* @__PURE__ */ g.jsxs("div", { className: "simui-modal-card", onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ g.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: m,
          onChange: (h) => d(h.target.value)
        }
      ),
      /* @__PURE__ */ g.jsx("button", { className: "simui-iconbtn-h", onClick: s, "aria-label": "Close", children: /* @__PURE__ */ g.jsx(kp, { size: 16 }) })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-modal-list", children: [
      x.map((h) => /* @__PURE__ */ g.jsxs("div", { className: "simui-add-row", onClick: () => c(h.entity_id), children: [
        /* @__PURE__ */ g.jsx("span", { className: "simui-name", title: h.entity_id, children: Ut(h) }),
        /* @__PURE__ */ g.jsx("span", { className: "simui-add-dom", children: rn(h.entity_id) })
      ] }, h.entity_id)),
      x.length === 0 && /* @__PURE__ */ g.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function Eb({ room: u }) {
  const { editing: c, setEditing: s, reorderBlocks: r, addCard: m, goHome: d } = ic(), [y, S] = D.useState(!1), x = R0(C0(Jo, { activationConstraint: { distance: 5 } })), h = u.blocks.map((U) => U.id), M = D.useMemo(() => Kh(u), [u]), T = (U) => {
    const { active: H, over: Z } = U;
    if (!Z || H.id === Z.id) return;
    const q = h.indexOf(String(H.id)), Q = h.indexOf(String(Z.id));
    q >= 0 && Q >= 0 && r(q, Q);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ g.jsxs("header", { className: "simui-head", children: [
      /* @__PURE__ */ g.jsx("button", { className: "simui-back", onClick: d, "aria-label": "Back to home", children: /* @__PURE__ */ g.jsx(zp, { size: 18 }) }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-head-title", children: u.name }),
      /* @__PURE__ */ g.jsx(zb, { room: u, lightIds: M }),
      /* @__PURE__ */ g.jsx("span", { className: "simui-spacer" }),
      c && /* @__PURE__ */ g.jsx("button", { className: "simui-iconbtn-h", onClick: () => S(!0), "aria-label": "Add card", children: /* @__PURE__ */ g.jsx(Xh, { size: 16 }) }),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: `simui-iconbtn-h${c ? " active" : ""}`,
          onClick: () => s(!c),
          "aria-label": c ? "Done editing" : "Edit room",
          children: c ? /* @__PURE__ */ g.jsx(Sp, { size: 16 }) : /* @__PURE__ */ g.jsx(Hp, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "simui-content simui-room", children: [
      /* @__PURE__ */ g.jsx(_b, { lightIds: M }),
      /* @__PURE__ */ g.jsx(Hy, { sensors: x, collisionDetection: B0, onDragEnd: T, children: /* @__PURE__ */ g.jsx(Jy, { items: h, strategy: $o, children: /* @__PURE__ */ g.jsx("div", { className: "simui-grid", children: u.blocks.map((U) => /* @__PURE__ */ g.jsx(Sb, { block: U, editing: c }, U.id)) }) }) })
    ] }),
    y && /* @__PURE__ */ g.jsx(
      xb,
      {
        existing: u.blocks.flatMap((U) => U.entityIds),
        onAdd: m,
        onClose: () => S(!1)
      }
    )
  ] });
}
function zb({ room: u, lightIds: c }) {
  const s = za((r) => Vh(u, c, r));
  return s ? /* @__PURE__ */ g.jsx("span", { className: "simui-head-glance num", children: s }) : null;
}
function _b({ lightIds: u }) {
  const s = 0.04 + za((r) => {
    if (!u.length) return 0;
    const m = u.filter((d) => r[d]?.state === "on").length;
    return Math.round(m / u.length * 10) / 10;
  }) * 0.13;
  return /* @__PURE__ */ g.jsx("div", { className: "simui-ambient", style: { "--amb": String(s) } });
}
function Tb() {
  const { config: u, route: c } = ic();
  if (!u) return /* @__PURE__ */ g.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
  if (!u.rooms.length) return /* @__PURE__ */ g.jsx("div", { className: "simui-msg", children: "No rooms to show yet." });
  if (c.kind === "home") return /* @__PURE__ */ g.jsx(Fp, {});
  const s = u.rooms.find((r) => r.id === c.id) ?? u.rooms[0];
  return /* @__PURE__ */ g.jsx(Eb, { room: s }, s.id);
}
function Ab() {
  return /* @__PURE__ */ g.jsx(dp, { children: /* @__PURE__ */ g.jsx(Tb, {}) });
}
const Db = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:0 0 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);transition:border-color .15s ease,background .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}.simui-topbar{display:flex;align-items:center;gap:8px;padding:6px 2px 10px}.simui-pills{display:flex;gap:6px;overflow-x:auto;min-width:0;scrollbar-width:none}.simui-pills::-webkit-scrollbar{display:none}.simui-pill{flex:none;padding:6px 13px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,background .12s ease}.simui-pill:hover{color:var(--text)}.simui-pill.active{color:var(--text);background:var(--surface);border-color:var(--faint)}.simui-room{position:relative}.simui-ambient{position:absolute;inset:0 -16px auto;height:300px;z-index:0;pointer-events:none;opacity:var(--amb, .06);background:radial-gradient(120% 80% at 26% 0%,var(--warm),transparent 62%)}.simui-room>.simui-room-head,.simui-room>.simui-grid{position:relative;z-index:1}.simui-room-head{display:flex;align-items:baseline;gap:12px;padding:8px 2px 16px}.simui-room-name{font-size:22px;font-weight:600;letter-spacing:-.3px}.simui-room-glance{font-size:12px;color:var(--muted)}.simui-block{position:relative}.simui-block.span-2{grid-column:span 2}.simui-block.editing .simui-surface,.simui-block.editing .simui-tile,.simui-block.editing .simui-hero{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px;border-radius:var(--radius)}.simui-block.dragging{opacity:.55}.simui-hero{padding:2px 6px 18px}.simui-hero-temp{font-size:46px;font-weight:300;letter-spacing:-1.5px;line-height:.9}.simui-hero-temp small{font-size:20px;color:var(--muted);font-weight:400}.simui-hero-sub{margin-top:8px;font-size:12px;color:var(--muted)}.simui-surface{background:var(--group, rgba(255, 255, 255, .035));border:1px solid var(--faint);border-radius:20px;padding:15px 16px}.simui-surface-head{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:11px;font-weight:500}.simui-rows{display:flex;flex-direction:column}.simui-rows.divided .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-master{display:flex;align-items:center;gap:10px;margin-bottom:10px}.simui-master-label{font-size:12px;color:var(--muted);width:26px}.simui-master-val{font-size:12px;color:var(--text);min-width:34px;text-align:right}.simui-erow{display:flex;align-items:center;gap:10px;padding:8px 0;min-width:0;width:100%;background:none;border:none;color:inherit;font:inherit;text-align:left}button.simui-erow,.simui-erow.as-row{cursor:pointer}.simui-erow-name{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-erow-name.as-btn{background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-align:left;min-width:0}.simui-erow-name.muted{color:var(--muted)}.simui-erow-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-erow-ic.amber{color:var(--warn)}.simui-erow-ic.cool{color:var(--accent)}.simui-erow-dot{flex:none;width:9px;height:9px;padding:0;border:none;border-radius:50%;background:#4b4f57;cursor:pointer}.simui-erow-dot[data-on=true]{background:var(--warm);box-shadow:0 0 0 3px color-mix(in srgb,var(--warm) 20%,transparent)}.simui-erow-state{font-size:12px;color:var(--muted)}.simui-erow-state.warn{color:var(--warn)}.simui-erow-state.on{color:var(--accent)}.simui-erow-val{font-size:13px;color:var(--text)}.simui-slider.mini{max-width:96px}.simui-rbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer}.simui-rbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:13px 16px;background:var(--bg);border-bottom:1px solid var(--faint)}.simui-head-title{font-size:20px;font-weight:600;letter-spacing:-.3px;white-space:nowrap}.simui-head-glance{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.simui-back{display:inline-flex;align-items:center;justify-content:center;flex:none;width:30px;height:30px;margin-left:-6px;border-radius:9px;border:none;background:transparent;color:var(--muted);cursor:pointer}.simui-back:hover{color:var(--text);background:var(--surface)}.simui-content{padding:16px}.simui-home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(196px,1fr));gap:12px}.simui-roomcard{display:flex;flex-direction:column;gap:10px;min-height:96px;padding:15px 16px;text-align:left;background:var(--surface);border:1px solid var(--faint);border-radius:18px;cursor:pointer;transition:border-color .15s ease,background .15s ease}.simui-roomcard:hover{border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-roomcard.lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-roomcard-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.simui-roomcard-name{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-roomcard-go{color:var(--muted);flex:none}.simui-roomcard-glance{font-size:12px;color:var(--muted);margin-top:auto}';
class Nb extends HTMLElement {
  constructor() {
    super(...arguments);
    Sa(this, "_root");
    Sa(this, "_mount");
    Sa(this, "_hass");
    Sa(this, "_listeners", /* @__PURE__ */ new Set());
    Sa(this, "_source");
  }
  set hass(s) {
    this._hass = s, this._listeners.forEach((r) => r());
  }
  get hass() {
    return this._hass;
  }
  set narrow(s) {
  }
  set route(s) {
  }
  set panel(s) {
  }
  connectedCallback() {
    if (!this._source) {
      const s = this;
      this._source = {
        subscribe(r) {
          return s._listeners.add(r), () => s._listeners.delete(r);
        },
        getStates: () => s._hass ? s._hass.states : {},
        callService: (r, m, d, y) => s._hass.callService(r, m, d, y),
        get connection() {
          return s._hass ? s._hass.connection : void 0;
        }
      };
    }
    if (!this._mount) {
      const s = document.createElement("style");
      s.textContent = Db, this.appendChild(s), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = g0.createRoot(this._mount), this._root.render(
        /* @__PURE__ */ g.jsx(lp, { source: this._source, children: /* @__PURE__ */ g.jsx(Ab, {}) })
      );
    }
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", Nb);
