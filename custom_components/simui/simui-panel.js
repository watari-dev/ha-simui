var n0 = Object.defineProperty;
var a0 = (i, c, o) => c in i ? n0(i, c, { enumerable: !0, configurable: !0, writable: !0, value: o }) : i[c] = o;
var Sa = (i, c, o) => a0(i, typeof c != "symbol" ? c + "" : c, o);
function u0(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var yo = { exports: {} }, yu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gm;
function i0() {
  if (Gm) return yu;
  Gm = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(r, m, d) {
    var g = null;
    if (d !== void 0 && (g = "" + d), m.key !== void 0 && (g = "" + m.key), "key" in m) {
      d = {};
      for (var x in m)
        x !== "key" && (d[x] = m[x]);
    } else d = m;
    return m = d.ref, {
      $$typeof: i,
      type: r,
      key: g,
      ref: m !== void 0 ? m : null,
      props: d
    };
  }
  return yu.Fragment = c, yu.jsx = o, yu.jsxs = o, yu;
}
var Qm;
function c0() {
  return Qm || (Qm = 1, yo.exports = i0()), yo.exports;
}
var y = c0(), po = { exports: {} }, pu = {}, bo = { exports: {} }, So = {};
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
function s0() {
  return Zm || (Zm = 1, (function(i) {
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
    function o(O) {
      return O.length === 0 ? null : O[0];
    }
    function r(O) {
      if (O.length === 0) return null;
      var B = O[0], J = O.pop();
      if (J !== B) {
        O[0] = J;
        t: for (var ct = 0, gt = O.length, S = gt >>> 1; ct < S; ) {
          var C = 2 * (ct + 1) - 1, q = O[C], L = C + 1, P = O[L];
          if (0 > m(q, J))
            L < gt && 0 > m(P, q) ? (O[ct] = P, O[L] = J, ct = L) : (O[ct] = q, O[C] = J, ct = C);
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
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      i.unstable_now = function() {
        return d.now();
      };
    } else {
      var g = Date, x = g.now();
      i.unstable_now = function() {
        return g.now() - x;
      };
    }
    var p = [], h = [], M = 1, A = null, U = 3, H = !1, V = !1, Y = !1, Z = !1, W = typeof setTimeout == "function" ? setTimeout : null, lt = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function nt(O) {
      for (var B = o(h); B !== null; ) {
        if (B.callback === null) r(h);
        else if (B.startTime <= O)
          r(h), B.sortIndex = B.expirationTime, c(p, B);
        else break;
        B = o(h);
      }
    }
    function it(O) {
      if (Y = !1, nt(O), !V)
        if (o(p) !== null)
          V = !0, et || (et = !0, Mt());
        else {
          var B = o(h);
          B !== null && ee(it, B.startTime - O);
        }
    }
    var et = !1, X = -1, I = 5, bt = -1;
    function Ot() {
      return Z ? !0 : !(i.unstable_now() - bt < I);
    }
    function dt() {
      if (Z = !1, et) {
        var O = i.unstable_now();
        bt = O;
        var B = !0;
        try {
          t: {
            V = !1, Y && (Y = !1, lt(X), X = -1), H = !0;
            var J = U;
            try {
              e: {
                for (nt(O), A = o(p); A !== null && !(A.expirationTime > O && Ot()); ) {
                  var ct = A.callback;
                  if (typeof ct == "function") {
                    A.callback = null, U = A.priorityLevel;
                    var gt = ct(
                      A.expirationTime <= O
                    );
                    if (O = i.unstable_now(), typeof gt == "function") {
                      A.callback = gt, nt(O), B = !0;
                      break e;
                    }
                    A === o(p) && r(p), nt(O);
                  } else r(p);
                  A = o(p);
                }
                if (A !== null) B = !0;
                else {
                  var S = o(h);
                  S !== null && ee(
                    it,
                    S.startTime - O
                  ), B = !1;
                }
              }
              break t;
            } finally {
              A = null, U = J, H = !1;
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
      var Jt = new MessageChannel(), Gt = Jt.port2;
      Jt.port1.onmessage = dt, Mt = function() {
        Gt.postMessage(null);
      };
    } else
      Mt = function() {
        W(dt, 0);
      };
    function ee(O, B) {
      X = W(function() {
        O(i.unstable_now());
      }, B);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, i.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < O ? Math.floor(1e3 / O) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, i.unstable_next = function(O) {
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
    }, i.unstable_requestPaint = function() {
      Z = !0;
    }, i.unstable_runWithPriority = function(O, B) {
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
    }, i.unstable_scheduleCallback = function(O, B, J) {
      var ct = i.unstable_now();
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
      }, J > ct ? (O.sortIndex = J, c(h, O), o(p) === null && O === o(h) && (Y ? (lt(X), X = -1) : Y = !0, ee(it, J - ct))) : (O.sortIndex = gt, c(p, O), V || H || (V = !0, et || (et = !0, Mt()))), O;
    }, i.unstable_shouldYield = Ot, i.unstable_wrapCallback = function(O) {
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
  })(So)), So;
}
var Vm;
function o0() {
  return Vm || (Vm = 1, bo.exports = s0()), bo.exports;
}
var xo = { exports: {} }, tt = {};
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
function r0() {
  if (Km) return tt;
  Km = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), g = /* @__PURE__ */ Symbol.for("react.context"), x = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), M = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.activity"), U = Symbol.iterator;
  function H(S) {
    return S === null || typeof S != "object" ? null : (S = U && S[U] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var V = {
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
  function W(S, C, q) {
    this.props = S, this.context = C, this.refs = Z, this.updater = q || V;
  }
  W.prototype.isReactComponent = {}, W.prototype.setState = function(S, C) {
    if (typeof S != "object" && typeof S != "function" && S != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, S, C, "setState");
  }, W.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function lt() {
  }
  lt.prototype = W.prototype;
  function k(S, C, q) {
    this.props = S, this.context = C, this.refs = Z, this.updater = q || V;
  }
  var nt = k.prototype = new lt();
  nt.constructor = k, Y(nt, W.prototype), nt.isPureReactComponent = !0;
  var it = Array.isArray;
  function et() {
  }
  var X = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function bt(S, C, q) {
    var L = q.ref;
    return {
      $$typeof: i,
      type: S,
      key: C,
      ref: L !== void 0 ? L : null,
      props: q
    };
  }
  function Ot(S, C) {
    return bt(S.type, C, S.props);
  }
  function dt(S) {
    return typeof S == "object" && S !== null && S.$$typeof === i;
  }
  function Mt(S) {
    var C = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(q) {
      return C[q];
    });
  }
  var Jt = /\/+/g;
  function Gt(S, C) {
    return typeof S == "object" && S !== null && S.key != null ? Mt("" + S.key) : C.toString(36);
  }
  function ee(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(et, et) : (S.status = "pending", S.then(
          function(C) {
            S.status === "pending" && (S.status = "fulfilled", S.value = C);
          },
          function(C) {
            S.status === "pending" && (S.status = "rejected", S.reason = C);
          }
        )), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function O(S, C, q, L, P) {
    var F = typeof S;
    (F === "undefined" || F === "boolean") && (S = null);
    var mt = !1;
    if (S === null) mt = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          mt = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case i:
            case c:
              mt = !0;
              break;
            case M:
              return mt = S._init, O(
                mt(S._payload),
                C,
                q,
                L,
                P
              );
          }
      }
    if (mt)
      return P = P(S), mt = L === "" ? "." + Gt(S, 0) : L, it(P) ? (q = "", mt != null && (q = mt.replace(Jt, "$&/") + "/"), O(P, C, q, "", function(vt) {
        return vt;
      })) : P != null && (dt(P) && (P = Ot(
        P,
        q + (P.key == null || S && S.key === P.key ? "" : ("" + P.key).replace(
          Jt,
          "$&/"
        ) + "/") + mt
      )), C.push(P)), 1;
    mt = 0;
    var jt = L === "" ? "." : L + ":";
    if (it(S))
      for (var St = 0; St < S.length; St++)
        L = S[St], F = jt + Gt(L, St), mt += O(
          L,
          C,
          q,
          F,
          P
        );
    else if (St = H(S), typeof St == "function")
      for (S = St.call(S), St = 0; !(L = S.next()).done; )
        L = L.value, F = jt + Gt(L, St++), mt += O(
          L,
          C,
          q,
          F,
          P
        );
    else if (F === "object") {
      if (typeof S.then == "function")
        return O(
          ee(S),
          C,
          q,
          L,
          P
        );
      throw C = String(S), Error(
        "Objects are not valid as a React child (found: " + (C === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : C) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return mt;
  }
  function B(S, C, q) {
    if (S == null) return S;
    var L = [], P = 0;
    return O(S, L, "", "", function(F) {
      return C.call(q, F, P++);
    }), L;
  }
  function J(S) {
    if (S._status === -1) {
      var C = S._result;
      C = C(), C.then(
        function(q) {
          (S._status === 0 || S._status === -1) && (S._status = 1, S._result = q);
        },
        function(q) {
          (S._status === 0 || S._status === -1) && (S._status = 2, S._result = q);
        }
      ), S._status === -1 && (S._status = 0, S._result = C);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var ct = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var C = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
        error: S
      });
      if (!window.dispatchEvent(C)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, gt = {
    map: B,
    forEach: function(S, C, q) {
      B(
        S,
        function() {
          C.apply(this, arguments);
        },
        q
      );
    },
    count: function(S) {
      var C = 0;
      return B(S, function() {
        C++;
      }), C;
    },
    toArray: function(S) {
      return B(S, function(C) {
        return C;
      }) || [];
    },
    only: function(S) {
      if (!dt(S))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return S;
    }
  };
  return tt.Activity = A, tt.Children = gt, tt.Component = W, tt.Fragment = o, tt.Profiler = m, tt.PureComponent = k, tt.StrictMode = r, tt.Suspense = p, tt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X, tt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(S) {
      return X.H.useMemoCache(S);
    }
  }, tt.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, tt.cacheSignal = function() {
    return null;
  }, tt.cloneElement = function(S, C, q) {
    if (S == null)
      throw Error(
        "The argument must be a React element, but you passed " + S + "."
      );
    var L = Y({}, S.props), P = S.key;
    if (C != null)
      for (F in C.key !== void 0 && (P = "" + C.key), C)
        !I.call(C, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && C.ref === void 0 || (L[F] = C[F]);
    var F = arguments.length - 2;
    if (F === 1) L.children = q;
    else if (1 < F) {
      for (var mt = Array(F), jt = 0; jt < F; jt++)
        mt[jt] = arguments[jt + 2];
      L.children = mt;
    }
    return bt(S.type, P, L);
  }, tt.createContext = function(S) {
    return S = {
      $$typeof: g,
      _currentValue: S,
      _currentValue2: S,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, S.Provider = S, S.Consumer = {
      $$typeof: d,
      _context: S
    }, S;
  }, tt.createElement = function(S, C, q) {
    var L, P = {}, F = null;
    if (C != null)
      for (L in C.key !== void 0 && (F = "" + C.key), C)
        I.call(C, L) && L !== "key" && L !== "__self" && L !== "__source" && (P[L] = C[L]);
    var mt = arguments.length - 2;
    if (mt === 1) P.children = q;
    else if (1 < mt) {
      for (var jt = Array(mt), St = 0; St < mt; St++)
        jt[St] = arguments[St + 2];
      P.children = jt;
    }
    if (S && S.defaultProps)
      for (L in mt = S.defaultProps, mt)
        P[L] === void 0 && (P[L] = mt[L]);
    return bt(S, F, P);
  }, tt.createRef = function() {
    return { current: null };
  }, tt.forwardRef = function(S) {
    return { $$typeof: x, render: S };
  }, tt.isValidElement = dt, tt.lazy = function(S) {
    return {
      $$typeof: M,
      _payload: { _status: -1, _result: S },
      _init: J
    };
  }, tt.memo = function(S, C) {
    return {
      $$typeof: h,
      type: S,
      compare: C === void 0 ? null : C
    };
  }, tt.startTransition = function(S) {
    var C = X.T, q = {};
    X.T = q;
    try {
      var L = S(), P = X.S;
      P !== null && P(q, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(et, ct);
    } catch (F) {
      ct(F);
    } finally {
      C !== null && q.types !== null && (C.types = q.types), X.T = C;
    }
  }, tt.unstable_useCacheRefresh = function() {
    return X.H.useCacheRefresh();
  }, tt.use = function(S) {
    return X.H.use(S);
  }, tt.useActionState = function(S, C, q) {
    return X.H.useActionState(S, C, q);
  }, tt.useCallback = function(S, C) {
    return X.H.useCallback(S, C);
  }, tt.useContext = function(S) {
    return X.H.useContext(S);
  }, tt.useDebugValue = function() {
  }, tt.useDeferredValue = function(S, C) {
    return X.H.useDeferredValue(S, C);
  }, tt.useEffect = function(S, C) {
    return X.H.useEffect(S, C);
  }, tt.useEffectEvent = function(S) {
    return X.H.useEffectEvent(S);
  }, tt.useId = function() {
    return X.H.useId();
  }, tt.useImperativeHandle = function(S, C, q) {
    return X.H.useImperativeHandle(S, C, q);
  }, tt.useInsertionEffect = function(S, C) {
    return X.H.useInsertionEffect(S, C);
  }, tt.useLayoutEffect = function(S, C) {
    return X.H.useLayoutEffect(S, C);
  }, tt.useMemo = function(S, C) {
    return X.H.useMemo(S, C);
  }, tt.useOptimistic = function(S, C) {
    return X.H.useOptimistic(S, C);
  }, tt.useReducer = function(S, C, q) {
    return X.H.useReducer(S, C, q);
  }, tt.useRef = function(S) {
    return X.H.useRef(S);
  }, tt.useState = function(S) {
    return X.H.useState(S);
  }, tt.useSyncExternalStore = function(S, C, q) {
    return X.H.useSyncExternalStore(
      S,
      C,
      q
    );
  }, tt.useTransition = function() {
    return X.H.useTransition();
  }, tt.version = "19.2.7", tt;
}
var Jm;
function Bo() {
  return Jm || (Jm = 1, xo.exports = r0()), xo.exports;
}
var Eo = { exports: {} }, de = {};
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
function f0() {
  if (km) return de;
  km = 1;
  var i = Bo();
  function c(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var M = 2; M < arguments.length; M++)
        h += "&args[]=" + encodeURIComponent(arguments[M]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(c(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, m = /* @__PURE__ */ Symbol.for("react.portal");
  function d(p, h, M) {
    var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: A == null ? null : "" + A,
      children: p,
      containerInfo: h,
      implementation: M
    };
  }
  var g = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, de.createPortal = function(p, h) {
    var M = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(c(299));
    return d(p, h, null, M);
  }, de.flushSync = function(p) {
    var h = g.T, M = r.p;
    try {
      if (g.T = null, r.p = 2, p) return p();
    } finally {
      g.T = h, r.p = M, r.d.f();
    }
  }, de.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, r.d.C(p, h));
  }, de.prefetchDNS = function(p) {
    typeof p == "string" && r.d.D(p);
  }, de.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var M = h.as, A = x(M, h.crossOrigin), U = typeof h.integrity == "string" ? h.integrity : void 0, H = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      M === "style" ? r.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: A,
          integrity: U,
          fetchPriority: H
        }
      ) : M === "script" && r.d.X(p, {
        crossOrigin: A,
        integrity: U,
        fetchPriority: H,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, de.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var M = x(
            h.as,
            h.crossOrigin
          );
          r.d.M(p, {
            crossOrigin: M,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && r.d.M(p);
  }, de.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var M = h.as, A = x(M, h.crossOrigin);
      r.d.L(p, M, {
        crossOrigin: A,
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
  }, de.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var M = x(h.as, h.crossOrigin);
        r.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: M,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else r.d.m(p);
  }, de.requestFormReset = function(p) {
    r.d.r(p);
  }, de.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, de.useFormState = function(p, h, M) {
    return g.H.useFormState(p, h, M);
  }, de.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, de.version = "19.2.7", de;
}
var $m;
function vh() {
  if ($m) return Eo.exports;
  $m = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (c) {
        console.error(c);
      }
  }
  return i(), Eo.exports = f0(), Eo.exports;
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
function d0() {
  if (Wm) return pu;
  Wm = 1;
  var i = o0(), c = Bo(), o = vh();
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
  function g(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function x(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
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
          if (u === l) return p(a), t;
          if (u === n) return p(a), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== n.return) l = a, n = u;
      else {
        for (var s = !1, f = a.child; f; ) {
          if (f === l) {
            s = !0, l = a, n = u;
            break;
          }
          if (f === n) {
            s = !0, n = a, l = u;
            break;
          }
          f = f.sibling;
        }
        if (!s) {
          for (f = u.child; f; ) {
            if (f === l) {
              s = !0, l = u, n = a;
              break;
            }
            if (f === n) {
              s = !0, n = u, l = a;
              break;
            }
            f = f.sibling;
          }
          if (!s) throw Error(r(189));
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
  var A = Object.assign, U = /* @__PURE__ */ Symbol.for("react.element"), H = /* @__PURE__ */ Symbol.for("react.transitional.element"), V = /* @__PURE__ */ Symbol.for("react.portal"), Y = /* @__PURE__ */ Symbol.for("react.fragment"), Z = /* @__PURE__ */ Symbol.for("react.strict_mode"), W = /* @__PURE__ */ Symbol.for("react.profiler"), lt = /* @__PURE__ */ Symbol.for("react.consumer"), k = /* @__PURE__ */ Symbol.for("react.context"), nt = /* @__PURE__ */ Symbol.for("react.forward_ref"), it = /* @__PURE__ */ Symbol.for("react.suspense"), et = /* @__PURE__ */ Symbol.for("react.suspense_list"), X = /* @__PURE__ */ Symbol.for("react.memo"), I = /* @__PURE__ */ Symbol.for("react.lazy"), bt = /* @__PURE__ */ Symbol.for("react.activity"), Ot = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), dt = Symbol.iterator;
  function Mt(t) {
    return t === null || typeof t != "object" ? null : (t = dt && t[dt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Jt = /* @__PURE__ */ Symbol.for("react.client.reference");
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
      case et:
        return "SuspenseList";
      case bt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case V:
          return "Portal";
        case k:
          return t.displayName || "Context";
        case lt:
          return (t._context.displayName || "Context") + ".Consumer";
        case nt:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case X:
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
  var ee = Array.isArray, O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], gt = -1;
  function S(t) {
    return { current: t };
  }
  function C(t) {
    0 > gt || (t.current = ct[gt], ct[gt] = null, gt--);
  }
  function q(t, e) {
    gt++, ct[gt] = t.current, t.current = e;
  }
  var L = S(null), P = S(null), F = S(null), mt = S(null);
  function jt(t, e) {
    switch (q(F, e), q(P, t), q(L, null), e.nodeType) {
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
    C(L), q(L, t);
  }
  function St() {
    C(L), C(P), C(F);
  }
  function vt(t) {
    t.memoizedState !== null && q(mt, t);
    var e = L.current, l = dm(e, t.type);
    e !== l && (q(P, t), q(L, l));
  }
  function ul(t) {
    P.current === t && (C(L), C(P)), mt.current === t && (C(mt), mu._currentValue = J);
  }
  var ve, hl;
  function le(t) {
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
                  var T = N;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (N) {
                  T = N;
                }
                t.call(w.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                T = N;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (N) {
            if (N && T && typeof N.stack == "string")
              return [N.stack, T.stack];
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
      var u = n.DetermineComponentFrameRoot(), s = u[0], f = u[1];
      if (s && f) {
        var v = s.split(`
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
      il = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? le(l) : "";
  }
  function Ou(t, e) {
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
  function Aa(t) {
    try {
      var e = "", l = null;
      do
        e += Ou(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var mn = Object.prototype.hasOwnProperty, He = i.unstable_scheduleCallback, Bl = i.unstable_cancelCallback, jn = i.unstable_shouldYield, Cu = i.unstable_requestPaint, oe = i.unstable_now, ac = i.unstable_getCurrentPriorityLevel, Ru = i.unstable_ImmediatePriority, vl = i.unstable_UserBlockingPriority, Ie = i.unstable_NormalPriority, hn = i.unstable_LowPriority, Da = i.unstable_IdlePriority, sl = i.log, ju = i.unstable_setDisableYieldValue, vn = null, me = null;
  function Be(t) {
    if (typeof sl == "function" && ju(t), me && typeof me.setStrictMode == "function")
      try {
        me.setStrictMode(vn, t);
      } catch {
      }
  }
  var re = Math.clz32 ? Math.clz32 : ic, uc = Math.log, wu = Math.LN2;
  function ic(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (uc(t) / wu | 0) | 0;
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
  function Ft(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var f = n & 134217727;
    return f !== 0 ? (n = f & ~u, n !== 0 ? a = Yt(n) : (s &= f, s !== 0 ? a = Yt(s) : l || (l = f & ~t, l !== 0 && (a = Yt(l))))) : (f = n & ~u, f !== 0 ? a = Yt(f) : s !== 0 ? a = Yt(s) : l || (l = n & ~t, l !== 0 && (a = Yt(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
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
  function kt(t, e, l, n, a, u) {
    var s = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var f = t.entanglements, v = t.expirationTimes, _ = t.hiddenUpdates;
    for (l = s & ~l; 0 < l; ) {
      var R = 31 - re(l), w = 1 << R;
      f[R] = 0, v[R] = -1;
      var T = _[R];
      if (T !== null)
        for (_[R] = null, R = 0; R < T.length; R++) {
          var N = T[R];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~w;
    }
    n !== 0 && Pe(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(s & ~e));
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
  function ql(t, e) {
    var l = B.p;
    try {
      return B.p = t, e();
    } finally {
      B.p = l;
    }
  }
  var Le = Math.random().toString(36).slice(2), ne = "__reactFiber$" + Le, be = "__reactProps$" + Le, Hn = "__reactContainer$" + Le, cc = "__reactEvents$" + Le, Kh = "__reactListeners$" + Le, Jh = "__reactHandles$" + Le, Fo = "__reactResources$" + Le, Na = "__reactMarker$" + Le;
  function sc(t) {
    delete t[ne], delete t[be], delete t[cc], delete t[Kh], delete t[Jh];
  }
  function Bn(t) {
    var e = t[ne];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Hn] || l[ne]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = bm(t); t !== null; ) {
            if (l = t[ne]) return l;
            t = bm(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function qn(t) {
    if (t = t[ne] || t[Hn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Ma(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Yn(t) {
    var e = t[Fo];
    return e || (e = t[Fo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function It(t) {
    t[Na] = !0;
  }
  var Io = /* @__PURE__ */ new Set(), Po = {};
  function gn(t, e) {
    Ln(t, e), Ln(t + "Capture", e);
  }
  function Ln(t, e) {
    for (Po[t] = e, t = 0; t < e.length; t++)
      Io.add(e[t]);
  }
  var kh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), tr = {}, er = {};
  function $h(t) {
    return mn.call(er, t) ? !0 : mn.call(tr, t) ? !1 : kh.test(t) ? er[t] = !0 : (tr[t] = !0, !1);
  }
  function Uu(t, e, l) {
    if ($h(e))
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
  function Hu(t, e, l) {
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
  function Xe(t) {
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
  function Wh(t, e, l) {
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
        set: function(s) {
          l = "" + s, u.call(this, s);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function oc(t) {
    if (!t._valueTracker) {
      var e = lr(t) ? "checked" : "value";
      t._valueTracker = Wh(
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
  function Bu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fh = /[\n"\\]/g;
  function Ge(t) {
    return t.replace(
      Fh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function rc(t, e, l, n, a, u, s, f) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), e != null ? s === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Xe(e)) : t.value !== "" + Xe(e) && (t.value = "" + Xe(e)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), e != null ? fc(t, s, Xe(e)) : l != null ? fc(t, s, Xe(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Xe(f) : t.removeAttribute("name");
  }
  function ar(t, e, l, n, a, u, s, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        oc(t);
        return;
      }
      l = l != null ? "" + Xe(l) : "", e = e != null ? "" + Xe(e) : l, f || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = f ? t.checked : !!n, t.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s), oc(t);
  }
  function fc(t, e, l) {
    e === "number" && Bu(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function Xn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Xe(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function ur(t, e, l) {
    if (e != null && (e = "" + Xe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Xe(l) : "";
  }
  function ir(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(r(92));
        if (ee(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Xe(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), oc(t);
  }
  function Gn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Ih = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cr(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Ih.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
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
      for (var u in e)
        e.hasOwnProperty(u) && cr(t, u, e[u]);
  }
  function dc(t) {
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
  var Ph = /* @__PURE__ */ new Map([
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
  ]), tv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function qu(t) {
    return tv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function bl() {
  }
  var mc = null;
  function hc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Qn = null, Zn = null;
  function or(t) {
    var e = qn(t);
    if (e && (t = e.stateNode)) {
      var l = t[be] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (rc(
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
                var a = n[be] || null;
                if (!a) throw Error(r(90));
                rc(
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
          ur(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Xn(t, !!l.multiple, e, !1);
      }
    }
  }
  var vc = !1;
  function rr(t, e, l) {
    if (vc) return t(e, l);
    vc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (vc = !1, (Qn !== null || Zn !== null) && (Ti(), Qn && (e = Qn, t = Zn, Zn = Qn = null, or(e), t)))
        for (e = 0; e < t.length; e++) or(t[e]);
    }
  }
  function Oa(t, e) {
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
  var Sl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gc = !1;
  if (Sl)
    try {
      var Ca = {};
      Object.defineProperty(Ca, "passive", {
        get: function() {
          gc = !0;
        }
      }), window.addEventListener("test", Ca, Ca), window.removeEventListener("test", Ca, Ca);
    } catch {
      gc = !1;
    }
  var Yl = null, yc = null, Yu = null;
  function fr() {
    if (Yu) return Yu;
    var t, e = yc, l = e.length, n, a = "value" in Yl ? Yl.value : Yl.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var s = l - t;
    for (n = 1; n <= s && e[l - n] === a[u - n]; n++) ;
    return Yu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function Lu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Xu() {
    return !0;
  }
  function dr() {
    return !1;
  }
  function Se(t) {
    function e(l, n, a, u, s) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = s, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Xu : dr, this.isPropagationStopped = dr, this;
    }
    return A(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Xu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Xu);
      },
      persist: function() {
      },
      isPersistent: Xu
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
  }, Gu = Se(yn), Ra = A({}, yn, { view: 0, detail: 0 }), ev = Se(Ra), pc, bc, ja, Qu = A({}, Ra, {
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
    getModifierState: xc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ja && (ja && t.type === "mousemove" ? (pc = t.screenX - ja.screenX, bc = t.screenY - ja.screenY) : bc = pc = 0, ja = t), pc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : bc;
    }
  }), mr = Se(Qu), lv = A({}, Qu, { dataTransfer: 0 }), nv = Se(lv), av = A({}, Ra, { relatedTarget: 0 }), Sc = Se(av), uv = A({}, yn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iv = Se(uv), cv = A({}, yn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), sv = Se(cv), ov = A({}, yn, { data: 0 }), hr = Se(ov), rv = {
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
  }, fv = {
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
  }, dv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function mv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = dv[t]) ? !!e[t] : !1;
  }
  function xc() {
    return mv;
  }
  var hv = A({}, Ra, {
    key: function(t) {
      if (t.key) {
        var e = rv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Lu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? fv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: xc,
    charCode: function(t) {
      return t.type === "keypress" ? Lu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Lu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), vv = Se(hv), gv = A({}, Qu, {
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
  }), vr = Se(gv), yv = A({}, Ra, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: xc
  }), pv = Se(yv), bv = A({}, yn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Sv = Se(bv), xv = A({}, Qu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ev = Se(xv), zv = A({}, yn, {
    newState: 0,
    oldState: 0
  }), _v = Se(zv), Tv = [9, 13, 27, 32], Ec = Sl && "CompositionEvent" in window, wa = null;
  Sl && "documentMode" in document && (wa = document.documentMode);
  var Av = Sl && "TextEvent" in window && !wa, gr = Sl && (!Ec || wa && 8 < wa && 11 >= wa), yr = " ", pr = !1;
  function br(t, e) {
    switch (t) {
      case "keyup":
        return Tv.indexOf(e.keyCode) !== -1;
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
  function Dv(t, e) {
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
  function Nv(t, e) {
    if (Vn)
      return t === "compositionend" || !Ec && br(t, e) ? (t = fr(), Yu = yc = Yl = null, Vn = !1, t) : null;
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
  var Mv = {
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
    return e === "input" ? !!Mv[t.type] : e === "textarea";
  }
  function Er(t, e, l, n) {
    Qn ? Zn ? Zn.push(n) : Zn = [n] : Qn = n, e = Ri(e, "onChange"), 0 < e.length && (l = new Gu(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var Ua = null, Ha = null;
  function Ov(t) {
    um(t, 0);
  }
  function Zu(t) {
    var e = Ma(t);
    if (nr(e)) return t;
  }
  function zr(t, e) {
    if (t === "change") return e;
  }
  var _r = !1;
  if (Sl) {
    var zc;
    if (Sl) {
      var _c = "oninput" in document;
      if (!_c) {
        var Tr = document.createElement("div");
        Tr.setAttribute("oninput", "return;"), _c = typeof Tr.oninput == "function";
      }
      zc = _c;
    } else zc = !1;
    _r = zc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ar() {
    Ua && (Ua.detachEvent("onpropertychange", Dr), Ha = Ua = null);
  }
  function Dr(t) {
    if (t.propertyName === "value" && Zu(Ha)) {
      var e = [];
      Er(
        e,
        Ha,
        t,
        hc(t)
      ), rr(Ov, e);
    }
  }
  function Cv(t, e, l) {
    t === "focusin" ? (Ar(), Ua = e, Ha = l, Ua.attachEvent("onpropertychange", Dr)) : t === "focusout" && Ar();
  }
  function Rv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Zu(Ha);
  }
  function jv(t, e) {
    if (t === "click") return Zu(e);
  }
  function wv(t, e) {
    if (t === "input" || t === "change")
      return Zu(e);
  }
  function Uv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Me = typeof Object.is == "function" ? Object.is : Uv;
  function Ba(t, e) {
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
    for (var e = Bu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Bu(t.document);
    }
    return e;
  }
  function Tc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Hv = Sl && "documentMode" in document && 11 >= document.documentMode, Kn = null, Ac = null, qa = null, Dc = !1;
  function Rr(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Dc || Kn == null || Kn !== Bu(n) || (n = Kn, "selectionStart" in n && Tc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), qa && Ba(qa, n) || (qa = n, n = Ri(Ac, "onSelect"), 0 < n.length && (e = new Gu(
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
  }, Nc = {}, jr = {};
  Sl && (jr = document.createElement("div").style, "AnimationEvent" in window || (delete Jn.animationend.animation, delete Jn.animationiteration.animation, delete Jn.animationstart.animation), "TransitionEvent" in window || delete Jn.transitionend.transition);
  function bn(t) {
    if (Nc[t]) return Nc[t];
    if (!Jn[t]) return t;
    var e = Jn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in jr)
        return Nc[t] = e[l];
    return t;
  }
  var wr = bn("animationend"), Ur = bn("animationiteration"), Hr = bn("animationstart"), Bv = bn("transitionrun"), qv = bn("transitionstart"), Yv = bn("transitioncancel"), Br = bn("transitionend"), qr = /* @__PURE__ */ new Map(), Mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Mc.push("scrollEnd");
  function el(t, e) {
    qr.set(t, e), gn(e, [t]);
  }
  var Vu = typeof reportError == "function" ? reportError : function(t) {
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
  }, Qe = [], kn = 0, Oc = 0;
  function Ku() {
    for (var t = kn, e = Oc = kn = 0; e < t; ) {
      var l = Qe[e];
      Qe[e++] = null;
      var n = Qe[e];
      Qe[e++] = null;
      var a = Qe[e];
      Qe[e++] = null;
      var u = Qe[e];
      if (Qe[e++] = null, n !== null && a !== null) {
        var s = n.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), n.pending = a;
      }
      u !== 0 && Yr(l, a, u);
    }
  }
  function Ju(t, e, l, n) {
    Qe[kn++] = t, Qe[kn++] = e, Qe[kn++] = l, Qe[kn++] = n, Oc |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function Cc(t, e, l, n) {
    return Ju(t, e, l, n), ku(t);
  }
  function Sn(t, e) {
    return Ju(t, null, null, e), ku(t);
  }
  function Yr(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - re(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function ku(t) {
    if (50 < iu)
      throw iu = 0, Ls = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var $n = {};
  function Lv(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Oe(t, e, l, n) {
    return new Lv(t, e, l, n);
  }
  function Rc(t) {
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
  function $u(t, e, l, n, a, u) {
    var s = 0;
    if (n = t, typeof t == "function") Rc(t) && (s = 1);
    else if (typeof t == "string")
      s = Vg(
        t,
        l,
        L.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case bt:
          return t = Oe(31, l, e, a), t.elementType = bt, t.lanes = u, t;
        case Y:
          return xn(l.children, a, u, e);
        case Z:
          s = 8, a |= 24;
          break;
        case W:
          return t = Oe(12, l, e, a | 2), t.elementType = W, t.lanes = u, t;
        case it:
          return t = Oe(13, l, e, a), t.elementType = it, t.lanes = u, t;
        case et:
          return t = Oe(19, l, e, a), t.elementType = et, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
                s = 10;
                break t;
              case lt:
                s = 9;
                break t;
              case nt:
                s = 11;
                break t;
              case X:
                s = 14;
                break t;
              case I:
                s = 16, n = null;
                break t;
            }
          s = 29, l = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = Oe(s, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function xn(t, e, l, n) {
    return t = Oe(7, t, n, e), t.lanes = l, t;
  }
  function jc(t, e, l) {
    return t = Oe(6, t, null, e), t.lanes = l, t;
  }
  function Xr(t) {
    var e = Oe(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function wc(t, e, l) {
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
  var Gr = /* @__PURE__ */ new WeakMap();
  function Ze(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Gr.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Aa(e)
      }, Gr.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Aa(e)
    };
  }
  var Wn = [], Fn = 0, Wu = null, Ya = 0, Ve = [], Ke = 0, Ll = null, ol = 1, rl = "";
  function El(t, e) {
    Wn[Fn++] = Ya, Wn[Fn++] = Wu, Wu = t, Ya = e;
  }
  function Qr(t, e, l) {
    Ve[Ke++] = ol, Ve[Ke++] = rl, Ve[Ke++] = Ll, Ll = t;
    var n = ol;
    t = rl;
    var a = 32 - re(n) - 1;
    n &= ~(1 << a), l += 1;
    var u = 32 - re(e) + a;
    if (30 < u) {
      var s = a - a % 5;
      u = (n & (1 << s) - 1).toString(32), n >>= s, a -= s, ol = 1 << 32 - re(e) + a | l << a | n, rl = u + t;
    } else
      ol = 1 << u | l << a | n, rl = t;
  }
  function Uc(t) {
    t.return !== null && (El(t, 1), Qr(t, 1, 0));
  }
  function Hc(t) {
    for (; t === Wu; )
      Wu = Wn[--Fn], Wn[Fn] = null, Ya = Wn[--Fn], Wn[Fn] = null;
    for (; t === Ll; )
      Ll = Ve[--Ke], Ve[Ke] = null, rl = Ve[--Ke], Ve[Ke] = null, ol = Ve[--Ke], Ve[Ke] = null;
  }
  function Zr(t, e) {
    Ve[Ke++] = ol, Ve[Ke++] = rl, Ve[Ke++] = Ll, ol = e.id, rl = e.overflow, Ll = t;
  }
  var ae = null, Ct = null, ht = !1, Xl = null, Je = !1, Bc = Error(r(519));
  function Gl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw La(Ze(e, t)), Bc;
  }
  function Vr(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[ne] = t, e[be] = n, l) {
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
        for (l = 0; l < su.length; l++)
          ot(su[l], e);
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
        ot("invalid", e), ir(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || om(e.textContent, l) ? (n.popover != null && (ot("beforetoggle", e), ot("toggle", e)), n.onScroll != null && ot("scroll", e), n.onScrollEnd != null && ot("scrollend", e), n.onClick != null && (e.onclick = bl), e = !0) : e = !1, e || Gl(t, !0);
  }
  function Kr(t) {
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
  function In(t) {
    if (t !== ae) return !1;
    if (!ht) return Kr(t), ht = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || eo(t.type, t.memoizedProps)), l = !l), l && Ct && Gl(t), Kr(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ct = pm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Ct = pm(t);
    } else
      e === 27 ? (e = Ct, ln(t.type) ? (t = io, io = null, Ct = t) : Ct = e) : Ct = ae ? $e(t.stateNode.nextSibling) : null;
    return !0;
  }
  function En() {
    Ct = ae = null, ht = !1;
  }
  function qc() {
    var t = Xl;
    return t !== null && (_e === null ? _e = t : _e.push.apply(
      _e,
      t
    ), Xl = null), t;
  }
  function La(t) {
    Xl === null ? Xl = [t] : Xl.push(t);
  }
  var Yc = S(null), zn = null, zl = null;
  function Ql(t, e, l) {
    q(Yc, e._currentValue), e._currentValue = l;
  }
  function _l(t) {
    t._currentValue = Yc.current, C(Yc);
  }
  function Lc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Xc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var s = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = a;
          for (var v = 0; v < e.length; v++)
            if (f.context === e[v]) {
              u.lanes |= l, f = u.alternate, f !== null && (f.lanes |= l), Lc(
                u.return,
                l,
                t
              ), n || (s = null);
              break t;
            }
          u = f.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(r(341));
        s.lanes |= l, u = s.alternate, u !== null && (u.lanes |= l), Lc(s, l, t), s = null;
      } else s = a.child;
      if (s !== null) s.return = a;
      else
        for (s = a; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (a = s.sibling, a !== null) {
            a.return = s.return, s = a;
            break;
          }
          s = s.return;
        }
      a = s;
    }
  }
  function Pn(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(r(387));
        if (s = s.memoizedProps, s !== null) {
          var f = a.type;
          Me(a.pendingProps.value, s.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (a === mt.current) {
        if (s = a.alternate, s === null) throw Error(r(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(mu) : t = [mu]);
      }
      a = a.return;
    }
    t !== null && Xc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function Fu(t) {
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
  function Iu(t, e) {
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
  var Xv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Gv = i.unstable_scheduleCallback, Qv = i.unstable_NormalPriority, Qt = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Gc() {
    return {
      controller: new Xv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Xa(t) {
    t.refCount--, t.refCount === 0 && Gv(Qv, function() {
      t.controller.abort();
    });
  }
  var Ga = null, Qc = 0, ta = 0, ea = null;
  function Zv(t, e) {
    if (Ga === null) {
      var l = Ga = [];
      Qc = 0, ta = Ks(), ea = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return Qc++, e.then(kr, kr), e;
  }
  function kr() {
    if (--Qc === 0 && Ga !== null) {
      ea !== null && (ea.status = "fulfilled");
      var t = Ga;
      Ga = null, ta = 0, ea = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Vv(t, e) {
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
    jd = oe(), typeof e == "object" && e !== null && typeof e.then == "function" && Zv(t, e), $r !== null && $r(t, e);
  };
  var Tn = S(null);
  function Zc() {
    var t = Tn.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function Pu(t, e) {
    e === null ? q(Tn, Tn.current) : q(Tn, e.pool);
  }
  function Wr() {
    var t = Zc();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var la = Error(r(460)), Vc = Error(r(474)), ti = Error(r(542)), ei = { then: function() {
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
    if (t === la || t === ti)
      throw Error(r(483));
  }
  var na = null, Qa = 0;
  function li(t) {
    var e = Qa;
    return Qa += 1, na === null && (na = []), Ir(na, t, e);
  }
  function Za(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function ni(t, e) {
    throw e.$$typeof === U ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function ef(t) {
    function e(E, b) {
      if (t) {
        var z = E.deletions;
        z === null ? (E.deletions = [b], E.flags |= 16) : z.push(b);
      }
    }
    function l(E, b) {
      if (!t) return null;
      for (; b !== null; )
        e(E, b), b = b.sibling;
      return null;
    }
    function n(E) {
      for (var b = /* @__PURE__ */ new Map(); E !== null; )
        E.key !== null ? b.set(E.key, E) : b.set(E.index, E), E = E.sibling;
      return b;
    }
    function a(E, b) {
      return E = xl(E, b), E.index = 0, E.sibling = null, E;
    }
    function u(E, b, z) {
      return E.index = z, t ? (z = E.alternate, z !== null ? (z = z.index, z < b ? (E.flags |= 67108866, b) : z) : (E.flags |= 67108866, b)) : (E.flags |= 1048576, b);
    }
    function s(E) {
      return t && E.alternate === null && (E.flags |= 67108866), E;
    }
    function f(E, b, z, j) {
      return b === null || b.tag !== 6 ? (b = jc(z, E.mode, j), b.return = E, b) : (b = a(b, z), b.return = E, b);
    }
    function v(E, b, z, j) {
      var K = z.type;
      return K === Y ? R(
        E,
        b,
        z.props.children,
        j,
        z.key
      ) : b !== null && (b.elementType === K || typeof K == "object" && K !== null && K.$$typeof === I && An(K) === b.type) ? (b = a(b, z.props), Za(b, z), b.return = E, b) : (b = $u(
        z.type,
        z.key,
        z.props,
        null,
        E.mode,
        j
      ), Za(b, z), b.return = E, b);
    }
    function _(E, b, z, j) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== z.containerInfo || b.stateNode.implementation !== z.implementation ? (b = wc(z, E.mode, j), b.return = E, b) : (b = a(b, z.children || []), b.return = E, b);
    }
    function R(E, b, z, j, K) {
      return b === null || b.tag !== 7 ? (b = xn(
        z,
        E.mode,
        j,
        K
      ), b.return = E, b) : (b = a(b, z), b.return = E, b);
    }
    function w(E, b, z) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = jc(
          "" + b,
          E.mode,
          z
        ), b.return = E, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case H:
            return z = $u(
              b.type,
              b.key,
              b.props,
              null,
              E.mode,
              z
            ), Za(z, b), z.return = E, z;
          case V:
            return b = wc(
              b,
              E.mode,
              z
            ), b.return = E, b;
          case I:
            return b = An(b), w(E, b, z);
        }
        if (ee(b) || Mt(b))
          return b = xn(
            b,
            E.mode,
            z,
            null
          ), b.return = E, b;
        if (typeof b.then == "function")
          return w(E, li(b), z);
        if (b.$$typeof === k)
          return w(
            E,
            Iu(E, b),
            z
          );
        ni(E, b);
      }
      return null;
    }
    function T(E, b, z, j) {
      var K = b !== null ? b.key : null;
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return K !== null ? null : f(E, b, "" + z, j);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case H:
            return z.key === K ? v(E, b, z, j) : null;
          case V:
            return z.key === K ? _(E, b, z, j) : null;
          case I:
            return z = An(z), T(E, b, z, j);
        }
        if (ee(z) || Mt(z))
          return K !== null ? null : R(E, b, z, j, null);
        if (typeof z.then == "function")
          return T(
            E,
            b,
            li(z),
            j
          );
        if (z.$$typeof === k)
          return T(
            E,
            b,
            Iu(E, z),
            j
          );
        ni(E, z);
      }
      return null;
    }
    function N(E, b, z, j, K) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return E = E.get(z) || null, f(b, E, "" + j, K);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case H:
            return E = E.get(
              j.key === null ? z : j.key
            ) || null, v(b, E, j, K);
          case V:
            return E = E.get(
              j.key === null ? z : j.key
            ) || null, _(b, E, j, K);
          case I:
            return j = An(j), N(
              E,
              b,
              z,
              j,
              K
            );
        }
        if (ee(j) || Mt(j))
          return E = E.get(z) || null, R(b, E, j, K, null);
        if (typeof j.then == "function")
          return N(
            E,
            b,
            z,
            li(j),
            K
          );
        if (j.$$typeof === k)
          return N(
            E,
            b,
            z,
            Iu(b, j),
            K
          );
        ni(b, j);
      }
      return null;
    }
    function G(E, b, z, j) {
      for (var K = null, yt = null, Q = b, ut = b = 0, ft = null; Q !== null && ut < z.length; ut++) {
        Q.index > ut ? (ft = Q, Q = null) : ft = Q.sibling;
        var pt = T(
          E,
          Q,
          z[ut],
          j
        );
        if (pt === null) {
          Q === null && (Q = ft);
          break;
        }
        t && Q && pt.alternate === null && e(E, Q), b = u(pt, b, ut), yt === null ? K = pt : yt.sibling = pt, yt = pt, Q = ft;
      }
      if (ut === z.length)
        return l(E, Q), ht && El(E, ut), K;
      if (Q === null) {
        for (; ut < z.length; ut++)
          Q = w(E, z[ut], j), Q !== null && (b = u(
            Q,
            b,
            ut
          ), yt === null ? K = Q : yt.sibling = Q, yt = Q);
        return ht && El(E, ut), K;
      }
      for (Q = n(Q); ut < z.length; ut++)
        ft = N(
          Q,
          E,
          ut,
          z[ut],
          j
        ), ft !== null && (t && ft.alternate !== null && Q.delete(
          ft.key === null ? ut : ft.key
        ), b = u(
          ft,
          b,
          ut
        ), yt === null ? K = ft : yt.sibling = ft, yt = ft);
      return t && Q.forEach(function(sn) {
        return e(E, sn);
      }), ht && El(E, ut), K;
    }
    function $(E, b, z, j) {
      if (z == null) throw Error(r(151));
      for (var K = null, yt = null, Q = b, ut = b = 0, ft = null, pt = z.next(); Q !== null && !pt.done; ut++, pt = z.next()) {
        Q.index > ut ? (ft = Q, Q = null) : ft = Q.sibling;
        var sn = T(E, Q, pt.value, j);
        if (sn === null) {
          Q === null && (Q = ft);
          break;
        }
        t && Q && sn.alternate === null && e(E, Q), b = u(sn, b, ut), yt === null ? K = sn : yt.sibling = sn, yt = sn, Q = ft;
      }
      if (pt.done)
        return l(E, Q), ht && El(E, ut), K;
      if (Q === null) {
        for (; !pt.done; ut++, pt = z.next())
          pt = w(E, pt.value, j), pt !== null && (b = u(pt, b, ut), yt === null ? K = pt : yt.sibling = pt, yt = pt);
        return ht && El(E, ut), K;
      }
      for (Q = n(Q); !pt.done; ut++, pt = z.next())
        pt = N(Q, E, ut, pt.value, j), pt !== null && (t && pt.alternate !== null && Q.delete(pt.key === null ? ut : pt.key), b = u(pt, b, ut), yt === null ? K = pt : yt.sibling = pt, yt = pt);
      return t && Q.forEach(function(l0) {
        return e(E, l0);
      }), ht && El(E, ut), K;
    }
    function Dt(E, b, z, j) {
      if (typeof z == "object" && z !== null && z.type === Y && z.key === null && (z = z.props.children), typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case H:
            t: {
              for (var K = z.key; b !== null; ) {
                if (b.key === K) {
                  if (K = z.type, K === Y) {
                    if (b.tag === 7) {
                      l(
                        E,
                        b.sibling
                      ), j = a(
                        b,
                        z.props.children
                      ), j.return = E, E = j;
                      break t;
                    }
                  } else if (b.elementType === K || typeof K == "object" && K !== null && K.$$typeof === I && An(K) === b.type) {
                    l(
                      E,
                      b.sibling
                    ), j = a(b, z.props), Za(j, z), j.return = E, E = j;
                    break t;
                  }
                  l(E, b);
                  break;
                } else e(E, b);
                b = b.sibling;
              }
              z.type === Y ? (j = xn(
                z.props.children,
                E.mode,
                j,
                z.key
              ), j.return = E, E = j) : (j = $u(
                z.type,
                z.key,
                z.props,
                null,
                E.mode,
                j
              ), Za(j, z), j.return = E, E = j);
            }
            return s(E);
          case V:
            t: {
              for (K = z.key; b !== null; ) {
                if (b.key === K)
                  if (b.tag === 4 && b.stateNode.containerInfo === z.containerInfo && b.stateNode.implementation === z.implementation) {
                    l(
                      E,
                      b.sibling
                    ), j = a(b, z.children || []), j.return = E, E = j;
                    break t;
                  } else {
                    l(E, b);
                    break;
                  }
                else e(E, b);
                b = b.sibling;
              }
              j = wc(z, E.mode, j), j.return = E, E = j;
            }
            return s(E);
          case I:
            return z = An(z), Dt(
              E,
              b,
              z,
              j
            );
        }
        if (ee(z))
          return G(
            E,
            b,
            z,
            j
          );
        if (Mt(z)) {
          if (K = Mt(z), typeof K != "function") throw Error(r(150));
          return z = K.call(z), $(
            E,
            b,
            z,
            j
          );
        }
        if (typeof z.then == "function")
          return Dt(
            E,
            b,
            li(z),
            j
          );
        if (z.$$typeof === k)
          return Dt(
            E,
            b,
            Iu(E, z),
            j
          );
        ni(E, z);
      }
      return typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint" ? (z = "" + z, b !== null && b.tag === 6 ? (l(E, b.sibling), j = a(b, z), j.return = E, E = j) : (l(E, b), j = jc(z, E.mode, j), j.return = E, E = j), s(E)) : l(E, b);
    }
    return function(E, b, z, j) {
      try {
        Qa = 0;
        var K = Dt(
          E,
          b,
          z,
          j
        );
        return na = null, K;
      } catch (Q) {
        if (Q === la || Q === ti) throw Q;
        var yt = Oe(29, Q, null, E.mode);
        return yt.lanes = j, yt.return = E, yt;
      }
    };
  }
  var Nn = ef(!0), lf = ef(!1), Zl = !1;
  function Kc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Jc(t, e) {
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
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = ku(t), Yr(t, null, l), e;
    }
    return Ju(t, n, e, l), ku(t);
  }
  function Va(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Ne(t, l);
    }
  }
  function kc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var s = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = s : u = u.next = s, l = l.next;
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
  var $c = !1;
  function Ka() {
    if ($c) {
      var t = ea;
      if (t !== null) throw t;
    }
  }
  function Ja(t, e, l, n) {
    $c = !1;
    var a = t.updateQueue;
    Zl = !1;
    var u = a.firstBaseUpdate, s = a.lastBaseUpdate, f = a.shared.pending;
    if (f !== null) {
      a.shared.pending = null;
      var v = f, _ = v.next;
      v.next = null, s === null ? u = _ : s.next = _, s = v;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, f = R.lastBaseUpdate, f !== s && (f === null ? R.firstBaseUpdate = _ : f.next = _, R.lastBaseUpdate = v));
    }
    if (u !== null) {
      var w = a.baseState;
      s = 0, R = _ = v = null, f = u;
      do {
        var T = f.lane & -536870913, N = T !== f.lane;
        if (N ? (rt & T) === T : (n & T) === T) {
          T !== 0 && T === ta && ($c = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var G = t, $ = f;
            T = e;
            var Dt = l;
            switch ($.tag) {
              case 1:
                if (G = $.payload, typeof G == "function") {
                  w = G.call(Dt, w, T);
                  break t;
                }
                w = G;
                break t;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = $.payload, T = typeof G == "function" ? G.call(Dt, w, T) : G, T == null) break t;
                w = A({}, w, T);
                break t;
              case 2:
                Zl = !0;
            }
          }
          T = f.callback, T !== null && (t.flags |= 64, N && (t.flags |= 8192), N = a.callbacks, N === null ? a.callbacks = [T] : N.push(T));
        } else
          N = {
            lane: T,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, R === null ? (_ = R = N, v = w) : R = R.next = N, s |= T;
        if (f = f.next, f === null) {
          if (f = a.shared.pending, f === null)
            break;
          N = f, f = N.next, N.next = null, a.lastBaseUpdate = N, a.shared.pending = null;
        }
      } while (!0);
      R === null && (v = w), a.baseState = v, a.firstBaseUpdate = _, a.lastBaseUpdate = R, u === null && (a.shared.lanes = 0), Fl |= s, t.lanes = s, t.memoizedState = w;
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
  var aa = S(null), ai = S(0);
  function uf(t, e) {
    t = jl, q(ai, t), q(aa, e), jl = t | e.baseLanes;
  }
  function Wc() {
    q(ai, jl), q(aa, aa.current);
  }
  function Fc() {
    jl = ai.current, C(aa), C(ai);
  }
  var Ce = S(null), ke = null;
  function Jl(t) {
    var e = t.alternate;
    q(Lt, Lt.current & 1), q(Ce, t), ke === null && (e === null || aa.current !== null || e.memoizedState !== null) && (ke = t);
  }
  function Ic(t) {
    q(Lt, Lt.current), q(Ce, t), ke === null && (ke = t);
  }
  function cf(t) {
    t.tag === 22 ? (q(Lt, Lt.current), q(Ce, t), ke === null && (ke = t)) : kl();
  }
  function kl() {
    q(Lt, Lt.current), q(Ce, Ce.current);
  }
  function Re(t) {
    C(Ce), ke === t && (ke = null), C(Lt);
  }
  var Lt = S(0);
  function ui(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || ao(l) || uo(l)))
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
  var Tl = 0, at = null, Tt = null, Zt = null, ii = !1, ua = !1, Mn = !1, ci = 0, ka = 0, ia = null, Kv = 0;
  function Ht() {
    throw Error(r(321));
  }
  function Pc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Me(t[l], e[l])) return !1;
    return !0;
  }
  function ts(t, e, l, n, a, u) {
    return Tl = u, at = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, O.H = t === null || t.memoizedState === null ? Zf : vs, Mn = !1, u = l(n, a), Mn = !1, ua && (u = of(
      e,
      l,
      n,
      a
    )), sf(t), u;
  }
  function sf(t) {
    O.H = Fa;
    var e = Tt !== null && Tt.next !== null;
    if (Tl = 0, Zt = Tt = at = null, ii = !1, ka = 0, ia = null, e) throw Error(r(300));
    t === null || Vt || (t = t.dependencies, t !== null && Fu(t) && (Vt = !0));
  }
  function of(t, e, l, n) {
    at = t;
    var a = 0;
    do {
      if (ua && (ia = null), ka = 0, ua = !1, 25 <= a) throw Error(r(301));
      if (a += 1, Zt = Tt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      O.H = Vf, u = e(l, n);
    } while (ua);
    return u;
  }
  function Jv() {
    var t = O.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? $a(e) : e, t = t.useState()[0], (Tt !== null ? Tt.memoizedState : null) !== t && (at.flags |= 1024), e;
  }
  function es() {
    var t = ci !== 0;
    return ci = 0, t;
  }
  function ls(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function ns(t) {
    if (ii) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ii = !1;
    }
    Tl = 0, Zt = Tt = at = null, ua = !1, ka = ci = 0, ia = null;
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
  function Xt() {
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
  function si() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $a(t) {
    var e = ka;
    return ka += 1, ia === null && (ia = []), t = Ir(ia, t, e), e = at, (Zt === null ? e.memoizedState : Zt.next) === null && (e = e.alternate, O.H = e === null || e.memoizedState === null ? Zf : vs), t;
  }
  function oi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return $a(t);
      if (t.$$typeof === k) return ue(t);
    }
    throw Error(r(438, String(t)));
  }
  function as(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = si(), at.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = Ot;
    return e.index++, l;
  }
  function Al(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ri(t) {
    var e = Xt();
    return us(e, Tt, t);
  }
  function us(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = u.next, u.next = s;
      }
      e.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var f = s = null, v = null, _ = e, R = !1;
      do {
        var w = _.lane & -536870913;
        if (w !== _.lane ? (rt & w) === w : (Tl & w) === w) {
          var T = _.revertLane;
          if (T === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), w === ta && (R = !0);
          else if ((Tl & T) === T) {
            _ = _.next, T === ta && (R = !0);
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
            }, v === null ? (f = v = w, s = u) : v = v.next = w, at.lanes |= T, Fl |= T;
          w = _.action, Mn && l(u, w), u = _.hasEagerState ? _.eagerState : l(u, w);
        } else
          T = {
            lane: w,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, v === null ? (f = v = T, s = u) : v = v.next = T, at.lanes |= w, Fl |= w;
        _ = _.next;
      } while (_ !== null && _ !== e);
      if (v === null ? s = u : v.next = f, !Me(u, t.memoizedState) && (Vt = !0, R && (l = ea, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = s, t.baseQueue = v, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function is(t) {
    var e = Xt(), l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, u = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var s = a = a.next;
      do
        u = t(u, s.action), s = s.next;
      while (s !== a);
      Me(u, e.memoizedState) || (Vt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, n];
  }
  function rf(t, e, l) {
    var n = at, a = Xt(), u = ht;
    if (u) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var s = !Me(
      (Tt || a).memoizedState,
      l
    );
    if (s && (a.memoizedState = l, Vt = !0), a = a.queue, os(mf.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || s || Zt !== null && Zt.memoizedState.tag & 1) {
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
      u || (Tl & 127) !== 0 || ff(n, e, l);
    }
    return l;
  }
  function ff(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = at.updateQueue, e === null ? (e = si(), at.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
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
  function cs(t) {
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
    return t.baseState = l, us(
      t,
      Tt,
      typeof n == "function" ? n : Al
    );
  }
  function kv(t, e, l, n, a) {
    if (mi(t)) throw Error(r(485));
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
        then: function(s) {
          u.listeners.push(s);
        }
      };
      O.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, yf(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function yf(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = O.T, s = {};
      O.T = s;
      try {
        var f = l(a, n), v = O.S;
        v !== null && v(s, f), pf(t, e, f);
      } catch (_) {
        ss(t, e, _);
      } finally {
        u !== null && s.types !== null && (u.types = s.types), O.T = u;
      }
    } else
      try {
        u = l(a, n), pf(t, e, u);
      } catch (_) {
        ss(t, e, _);
      }
  }
  function pf(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        bf(t, e, n);
      },
      function(n) {
        return ss(t, e, n);
      }
    ) : bf(t, e, l);
  }
  function bf(t, e, l) {
    e.status = "fulfilled", e.value = l, Sf(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, yf(t, l)));
  }
  function ss(t, e, l) {
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
                for (var a = Ct, u = Je; a.nodeType !== 8; ) {
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
    }, l.queue = n, l = Xf.bind(
      null,
      at,
      n
    ), n.dispatch = l, n = cs(!1), u = hs.bind(
      null,
      at,
      !1,
      n.queue
    ), n = he(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = kv.bind(
      null,
      at,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function zf(t) {
    var e = Xt();
    return _f(e, Tt, t);
  }
  function _f(t, e, l) {
    if (e = us(
      t,
      e,
      xf
    )[0], t = ri(Al)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = $a(e);
      } catch (s) {
        throw s === la ? ti : s;
      }
    else n = e;
    e = Xt();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (at.flags |= 2048, ca(
      9,
      { destroy: void 0 },
      $v.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function $v(t, e) {
    t.action = e;
  }
  function Tf(t) {
    var e = Xt(), l = Tt;
    if (l !== null)
      return _f(e, l, t);
    Xt(), e = e.memoizedState, l = Xt();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function ca(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = at.updateQueue, e === null && (e = si(), at.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function Af() {
    return Xt().memoizedState;
  }
  function fi(t, e, l, n) {
    var a = he();
    at.flags |= t, a.memoizedState = ca(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function di(t, e, l, n) {
    var a = Xt();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    Tt !== null && n !== null && Pc(n, Tt.memoizedState.deps) ? a.memoizedState = ca(e, u, l, n) : (at.flags |= t, a.memoizedState = ca(
      1 | e,
      u,
      l,
      n
    ));
  }
  function Df(t, e) {
    fi(8390656, 8, t, e);
  }
  function os(t, e) {
    di(2048, 8, t, e);
  }
  function Wv(t) {
    at.flags |= 4;
    var e = at.updateQueue;
    if (e === null)
      e = si(), at.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function Nf(t) {
    var e = Xt().memoizedState;
    return Wv({ ref: e, nextImpl: t }), function() {
      if ((xt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Mf(t, e) {
    return di(4, 2, t, e);
  }
  function Of(t, e) {
    return di(4, 4, t, e);
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
    l = l != null ? l.concat([t]) : null, di(4, 4, Cf.bind(null, e, t), l);
  }
  function rs() {
  }
  function jf(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Pc(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function wf(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Pc(e, n[1]))
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
  function fs(t, e, l) {
    return l === void 0 || (Tl & 1073741824) !== 0 && (rt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Ud(), at.lanes |= t, Fl |= t, l);
  }
  function Uf(t, e, l, n) {
    return Me(l, e) ? l : aa.current !== null ? (t = fs(t, l, n), Me(t, e) || (Vt = !0), t) : (Tl & 42) === 0 || (Tl & 1073741824) !== 0 && (rt & 261930) === 0 ? (Vt = !0, t.memoizedState = l) : (t = Ud(), at.lanes |= t, Fl |= t, e);
  }
  function Hf(t, e, l, n, a) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var s = O.T, f = {};
    O.T = f, hs(t, !1, e, l);
    try {
      var v = a(), _ = O.S;
      if (_ !== null && _(f, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var R = Vv(
          v,
          n
        );
        Wa(
          t,
          e,
          R,
          Ue(t)
        );
      } else
        Wa(
          t,
          e,
          n,
          Ue(t)
        );
    } catch (w) {
      Wa(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: w },
        Ue()
      );
    } finally {
      B.p = u, s !== null && f.types !== null && (s.types = f.types), O.T = s;
    }
  }
  function Fv() {
  }
  function ds(t, e, l, n) {
    if (t.tag !== 5) throw Error(r(476));
    var a = Bf(t).queue;
    Hf(
      t,
      a,
      e,
      J,
      l === null ? Fv : function() {
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
    e.next === null && (e = t.alternate.memoizedState), Wa(
      t,
      e.next.queue,
      {},
      Ue()
    );
  }
  function ms() {
    return ue(mu);
  }
  function Yf() {
    return Xt().memoizedState;
  }
  function Lf() {
    return Xt().memoizedState;
  }
  function Iv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ue();
          t = Vl(l);
          var n = Kl(e, t, l);
          n !== null && (Te(n, e, l), Va(n, e, l)), e = { cache: Gc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Pv(t, e, l) {
    var n = Ue();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mi(t) ? Gf(e, l) : (l = Cc(t, e, l, n), l !== null && (Te(l, t, n), Qf(l, e, n)));
  }
  function Xf(t, e, l) {
    var n = Ue();
    Wa(t, e, l, n);
  }
  function Wa(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (mi(t)) Gf(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var s = e.lastRenderedState, f = u(s, l);
          if (a.hasEagerState = !0, a.eagerState = f, Me(f, s))
            return Ju(t, e, a, 0), Nt === null && Ku(), !1;
        } catch {
        }
      if (l = Cc(t, e, a, n), l !== null)
        return Te(l, t, n), Qf(l, e, n), !0;
    }
    return !1;
  }
  function hs(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: Ks(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mi(t)) {
      if (e) throw Error(r(479));
    } else
      e = Cc(
        t,
        l,
        n,
        2
      ), e !== null && Te(e, t, 2);
  }
  function mi(t) {
    var e = t.alternate;
    return t === at || e !== null && e === at;
  }
  function Gf(t, e) {
    ua = ii = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Qf(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, Ne(t, l);
    }
  }
  var Fa = {
    readContext: ue,
    use: oi,
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
  Fa.useEffectEvent = Ht;
  var Zf = {
    readContext: ue,
    use: oi,
    useCallback: function(t, e) {
      return he().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: Df,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, fi(
        4194308,
        4,
        Cf.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return fi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      fi(4, 2, t, e);
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
      }, n.queue = t, t = t.dispatch = Pv.bind(
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
      t = cs(t);
      var e = t.queue, l = Xf.bind(null, at, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: rs,
    useDeferredValue: function(t, e) {
      var l = he();
      return fs(l, t, e);
    },
    useTransition: function() {
      var t = cs(!1);
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
      var u = { value: l, getSnapshot: e };
      return a.queue = u, Df(mf.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, ca(
        9,
        { destroy: void 0 },
        df.bind(
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
      var t = he(), e = Nt.identifierPrefix;
      if (ht) {
        var l = rl, n = ol;
        l = (n & ~(1 << 32 - re(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = ci++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Kv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: ms,
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
      return e.queue = l, e = hs.bind(
        null,
        at,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: as,
    useCacheRefresh: function() {
      return he().memoizedState = Iv.bind(
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
  }, vs = {
    readContext: ue,
    use: oi,
    useCallback: jf,
    useContext: ue,
    useEffect: os,
    useImperativeHandle: Rf,
    useInsertionEffect: Mf,
    useLayoutEffect: Of,
    useMemo: wf,
    useReducer: ri,
    useRef: Af,
    useState: function() {
      return ri(Al);
    },
    useDebugValue: rs,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Uf(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ri(Al)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : $a(t),
        e
      ];
    },
    useSyncExternalStore: rf,
    useId: Yf,
    useHostTransitionStatus: ms,
    useFormState: zf,
    useActionState: zf,
    useOptimistic: function(t, e) {
      var l = Xt();
      return gf(l, Tt, t, e);
    },
    useMemoCache: as,
    useCacheRefresh: Lf
  };
  vs.useEffectEvent = Nf;
  var Vf = {
    readContext: ue,
    use: oi,
    useCallback: jf,
    useContext: ue,
    useEffect: os,
    useImperativeHandle: Rf,
    useInsertionEffect: Mf,
    useLayoutEffect: Of,
    useMemo: wf,
    useReducer: is,
    useRef: Af,
    useState: function() {
      return is(Al);
    },
    useDebugValue: rs,
    useDeferredValue: function(t, e) {
      var l = Xt();
      return Tt === null ? fs(l, t, e) : Uf(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = is(Al)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : $a(t),
        e
      ];
    },
    useSyncExternalStore: rf,
    useId: Yf,
    useHostTransitionStatus: ms,
    useFormState: Tf,
    useActionState: Tf,
    useOptimistic: function(t, e) {
      var l = Xt();
      return Tt !== null ? gf(l, Tt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: as,
    useCacheRefresh: Lf
  };
  Vf.useEffectEvent = Nf;
  function gs(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : A({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var ys = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Ue(), a = Vl(n);
      a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (Te(e, t, n), Va(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Ue(), a = Vl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = Kl(t, a, n), e !== null && (Te(e, t, n), Va(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Ue(), n = Vl(l);
      n.tag = 2, e != null && (n.callback = e), e = Kl(t, n, l), e !== null && (Te(e, t, l), Va(e, t, l));
    }
  };
  function Kf(t, e, l, n, a, u, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, s) : e.prototype && e.prototype.isPureReactComponent ? !Ba(l, n) || !Ba(a, u) : !0;
  }
  function Jf(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && ys.enqueueReplaceState(e, e.state, null);
  }
  function On(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = A({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function kf(t) {
    Vu(t);
  }
  function $f(t) {
    console.error(t);
  }
  function Wf(t) {
    Vu(t);
  }
  function hi(t, e) {
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
  function ps(t, e, l) {
    return l = Vl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      hi(t, e);
    }, l;
  }
  function If(t) {
    return t = Vl(t), t.tag = 3, t;
  }
  function Pf(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        Ff(e, l, n);
      };
    }
    var s = l.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      Ff(e, l, n), typeof a != "function" && (Il === null ? Il = /* @__PURE__ */ new Set([this]) : Il.add(this));
      var f = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function tg(t, e, l, n, a) {
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
            return ke === null ? Ai() : l.alternate === null && Bt === 0 && (Bt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), Qs(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), Qs(t, n, a)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Qs(t, n, a), Ai(), !1;
    }
    if (ht)
      return e = Ce.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== Bc && (t = Error(r(422), { cause: n }), La(Ze(t, l)))) : (n !== Bc && (e = Error(r(423), {
        cause: n
      }), La(
        Ze(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ze(n, l), a = ps(
        t.stateNode,
        n,
        a
      ), kc(t, a), Bt !== 4 && (Bt = 2)), !1;
    var u = Error(r(520), { cause: n });
    if (u = Ze(u, l), uu === null ? uu = [u] : uu.push(u), Bt !== 4 && (Bt = 2), e === null) return !0;
    n = Ze(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = ps(l.stateNode, n, t), kc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Il === null || !Il.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = If(a), Pf(
              a,
              t,
              l,
              n
            ), kc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var bs = Error(r(461)), Vt = !1;
  function ie(t, e, l, n) {
    e.child = t === null ? lf(e, null, l, n) : Nn(
      e,
      t.child,
      l,
      n
    );
  }
  function td(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var s = {};
      for (var f in n)
        f !== "ref" && (s[f] = n[f]);
    } else s = n;
    return _n(e), n = ts(
      t,
      e,
      l,
      s,
      u,
      a
    ), f = es(), t !== null && !Vt ? (ls(t, e, a), Dl(t, e, a)) : (ht && f && Uc(e), e.flags |= 1, ie(t, e, n, a), e.child);
  }
  function ed(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !Rc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, ld(
        t,
        e,
        u,
        n,
        a
      )) : (t = $u(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Ds(t, a)) {
      var s = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ba, l(s, n) && t.ref === e.ref)
        return Dl(t, e, a);
    }
    return e.flags |= 1, t = xl(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function ld(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Ba(u, n) && t.ref === e.ref)
        if (Vt = !1, e.pendingProps = n = u, Ds(t, a))
          (t.flags & 131072) !== 0 && (Vt = !0);
        else
          return e.lanes = t.lanes, Dl(t, e, a);
    }
    return Ss(
      t,
      e,
      l,
      n,
      a
    );
  }
  function nd(t, e, l, n) {
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
        return ad(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Pu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? uf(e, u) : Wc(), cf(e);
      else
        return n = e.lanes = 536870912, ad(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (Pu(e, u.cachePool), uf(e, u), kl(), e.memoizedState = null) : (t !== null && Pu(e, null), Wc(), kl());
    return ie(t, e, a, l), e.child;
  }
  function Ia(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function ad(t, e, l, n, a) {
    var u = Zc();
    return u = u === null ? null : { parent: Qt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Pu(e, null), Wc(), cf(e), t !== null && Pn(t, e, n, !0), e.childLanes = a, null;
  }
  function vi(t, e) {
    return e = yi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ud(t, e, l) {
    return Nn(e, t.child, null, l), t = vi(e, e.pendingProps), t.flags |= 2, Re(e), e.memoizedState = null, t;
  }
  function eg(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (ht) {
        if (n.mode === "hidden")
          return t = vi(e, n), e.lanes = 536870912, Ia(null, t);
        if (Ic(e), (t = Ct) ? (t = ym(
          t,
          Je
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ll !== null ? { id: ol, overflow: rl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Xr(t), l.return = e, e.child = l, ae = e, Ct = null)) : t = null, t === null) throw Gl(e);
        return e.lanes = 536870912, null;
      }
      return vi(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var s = u.dehydrated;
      if (Ic(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = ud(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Vt || Pn(t, e, l, !1), a = (l & t.childLanes) !== 0, Vt || a) {
        if (n = Nt, n !== null && (s = Ye(n, l), s !== 0 && s !== u.retryLane))
          throw u.retryLane = s, Sn(t, s), Te(n, t, s), bs;
        Ai(), e = ud(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Ct = $e(s.nextSibling), ae = e, ht = !0, Xl = null, Je = !1, t !== null && Zr(e, t), e = vi(e, n), e.flags |= 4096;
      return e;
    }
    return t = xl(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function gi(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Ss(t, e, l, n, a) {
    return _n(e), l = ts(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = es(), t !== null && !Vt ? (ls(t, e, a), Dl(t, e, a)) : (ht && n && Uc(e), e.flags |= 1, ie(t, e, l, a), e.child);
  }
  function id(t, e, l, n, a, u) {
    return _n(e), e.updateQueue = null, l = of(
      e,
      n,
      l,
      a
    ), sf(t), n = es(), t !== null && !Vt ? (ls(t, e, u), Dl(t, e, u)) : (ht && n && Uc(e), e.flags |= 1, ie(t, e, l, u), e.child);
  }
  function cd(t, e, l, n, a) {
    if (_n(e), e.stateNode === null) {
      var u = $n, s = l.contextType;
      typeof s == "object" && s !== null && (u = ue(s)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ys, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, Kc(e), s = l.contextType, u.context = typeof s == "object" && s !== null ? ue(s) : $n, u.state = e.memoizedState, s = l.getDerivedStateFromProps, typeof s == "function" && (gs(
        e,
        l,
        s,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (s = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), s !== u.state && ys.enqueueReplaceState(u, u.state, null), Ja(e, n, u, a), Ka(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var f = e.memoizedProps, v = On(l, f);
      u.props = v;
      var _ = u.context, R = l.contextType;
      s = $n, typeof R == "object" && R !== null && (s = ue(R));
      var w = l.getDerivedStateFromProps;
      R = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, R || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || _ !== s) && Jf(
        e,
        u,
        n,
        s
      ), Zl = !1;
      var T = e.memoizedState;
      u.state = T, Ja(e, n, u, a), Ka(), _ = e.memoizedState, f || T !== _ || Zl ? (typeof w == "function" && (gs(
        e,
        l,
        w,
        n
      ), _ = e.memoizedState), (v = Zl || Kf(
        e,
        l,
        v,
        n,
        T,
        _,
        s
      )) ? (R || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = _), u.props = n, u.state = _, u.context = s, n = v) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, Jc(t, e), s = e.memoizedProps, R = On(l, s), u.props = R, w = e.pendingProps, T = u.context, _ = l.contextType, v = $n, typeof _ == "object" && _ !== null && (v = ue(_)), f = l.getDerivedStateFromProps, (_ = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s !== w || T !== v) && Jf(
        e,
        u,
        n,
        v
      ), Zl = !1, T = e.memoizedState, u.state = T, Ja(e, n, u, a), Ka();
      var N = e.memoizedState;
      s !== w || T !== N || Zl || t !== null && t.dependencies !== null && Fu(t.dependencies) ? (typeof f == "function" && (gs(
        e,
        l,
        f,
        n
      ), N = e.memoizedState), (R = Zl || Kf(
        e,
        l,
        R,
        n,
        T,
        N,
        v
      ) || t !== null && t.dependencies !== null && Fu(t.dependencies)) ? (_ || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, N, v), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        N,
        v
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || s === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = N), u.props = n, u.state = N, u.context = v, n = R) : (typeof u.componentDidUpdate != "function" || s === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, gi(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = Nn(
      e,
      t.child,
      null,
      a
    ), e.child = Nn(
      e,
      null,
      l,
      a
    )) : ie(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = Dl(
      t,
      e,
      a
    ), t;
  }
  function sd(t, e, l, n) {
    return En(), e.flags |= 256, ie(t, e, l, n), e.child;
  }
  var xs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Es(t) {
    return { baseLanes: t, cachePool: Wr() };
  }
  function zs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= we), t;
  }
  function od(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, s;
    if ((s = u) || (s = t !== null && t.memoizedState === null ? !1 : (Lt.current & 2) !== 0), s && (a = !0, e.flags &= -129), s = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (ht) {
        if (a ? Jl(e) : kl(), (t = Ct) ? (t = ym(
          t,
          Je
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ll !== null ? { id: ol, overflow: rl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Xr(t), l.return = e, e.child = l, ae = e, Ct = null)) : t = null, t === null) throw Gl(e);
        return uo(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var f = n.children;
      return n = n.fallback, a ? (kl(), a = e.mode, f = yi(
        { mode: "hidden", children: f },
        a
      ), n = xn(
        n,
        a,
        l,
        null
      ), f.return = e, n.return = e, f.sibling = n, e.child = f, n = e.child, n.memoizedState = Es(l), n.childLanes = zs(
        t,
        s,
        l
      ), e.memoizedState = xs, Ia(null, n)) : (Jl(e), _s(e, f));
    }
    var v = t.memoizedState;
    if (v !== null && (f = v.dehydrated, f !== null)) {
      if (u)
        e.flags & 256 ? (Jl(e), e.flags &= -257, e = Ts(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (kl(), e.child = t.child, e.flags |= 128, e = null) : (kl(), f = n.fallback, a = e.mode, n = yi(
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
        ), n = e.child, n.memoizedState = Es(l), n.childLanes = zs(
          t,
          s,
          l
        ), e.memoizedState = xs, e = Ia(null, n));
      else if (Jl(e), uo(f)) {
        if (s = f.nextSibling && f.nextSibling.dataset, s) var _ = s.dgst;
        s = _, n = Error(r(419)), n.stack = "", n.digest = s, La({ value: n, source: null, stack: null }), e = Ts(
          t,
          e,
          l
        );
      } else if (Vt || Pn(t, e, l, !1), s = (l & t.childLanes) !== 0, Vt || s) {
        if (s = Nt, s !== null && (n = Ye(s, l), n !== 0 && n !== v.retryLane))
          throw v.retryLane = n, Sn(t, n), Te(s, t, n), bs;
        ao(f) || Ai(), e = Ts(
          t,
          e,
          l
        );
      } else
        ao(f) ? (e.flags |= 192, e.child = t.child, e = null) : (t = v.treeContext, Ct = $e(
          f.nextSibling
        ), ae = e, ht = !0, Xl = null, Je = !1, t !== null && Zr(e, t), e = _s(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (kl(), f = n.fallback, a = e.mode, v = t.child, _ = v.sibling, n = xl(v, {
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
    ), f.flags |= 2), f.return = e, n.return = e, n.sibling = f, e.child = n, Ia(null, n), n = e.child, f = t.child.memoizedState, f === null ? f = Es(l) : (a = f.cachePool, a !== null ? (v = Qt._currentValue, a = a.parent !== v ? { parent: v, pool: v } : a) : a = Wr(), f = {
      baseLanes: f.baseLanes | l,
      cachePool: a
    }), n.memoizedState = f, n.childLanes = zs(
      t,
      s,
      l
    ), e.memoizedState = xs, Ia(t.child, n)) : (Jl(e), l = t.child, t = l.sibling, l = xl(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (s = e.deletions, s === null ? (e.deletions = [t], e.flags |= 16) : s.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function _s(t, e) {
    return e = yi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function yi(t, e) {
    return t = Oe(22, t, null, e), t.lanes = 0, t;
  }
  function Ts(t, e, l) {
    return Nn(e, t.child, null, l), t = _s(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function rd(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), Lc(t.return, e, l);
  }
  function As(t, e, l, n, a, u) {
    var s = t.memoizedState;
    s === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: u
    } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = n, s.tail = l, s.tailMode = a, s.treeForkCount = u);
  }
  function fd(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var s = Lt.current, f = (s & 2) !== 0;
    if (f ? (s = s & 1 | 2, e.flags |= 128) : s &= 1, q(Lt, s), ie(t, e, n, l), n = ht ? Ya : 0, !f && t !== null && (t.flags & 128) !== 0)
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
          t = l.alternate, t !== null && ui(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), As(
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
          if (t = a.alternate, t !== null && ui(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        As(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        As(
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
    if (t !== null && (e.dependencies = t.dependencies), Fl |= e.lanes, (l & e.childLanes) === 0)
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
  function Ds(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Fu(t)));
  }
  function lg(t, e, l) {
    switch (e.tag) {
      case 3:
        jt(e, e.stateNode.containerInfo), Ql(e, Qt, t.memoizedState.cache), En();
        break;
      case 27:
      case 5:
        vt(e);
        break;
      case 4:
        jt(e, e.stateNode.containerInfo);
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
          return e.flags |= 128, Ic(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Jl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? od(t, e, l) : (Jl(e), t = Dl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        Jl(e);
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
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), q(Lt, Lt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, nd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Ql(e, Qt, t.memoizedState.cache);
    }
    return Dl(t, e, l);
  }
  function dd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Vt = !0;
      else {
        if (!Ds(t, l) && (e.flags & 128) === 0)
          return Vt = !1, lg(
            t,
            e,
            l
          );
        Vt = (t.flags & 131072) !== 0;
      }
    else
      Vt = !1, ht && (e.flags & 1048576) !== 0 && Qr(e, Ya, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = An(e.elementType), e.type = t, typeof t == "function")
            Rc(t) ? (n = On(t, n), e.tag = 1, e = cd(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = Ss(
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
              } else if (a === X) {
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
            throw e = Gt(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ss(
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
          var u = e.memoizedState;
          a = u.element, Jc(t, e), Ja(e, n, null, l);
          var s = e.memoizedState;
          if (n = s.cache, Ql(e, Qt, n), n !== u.cache && Xc(
            e,
            [Qt],
            l,
            !0
          ), Ka(), n = s.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: s.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
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
              ), La(a), e = sd(
                t,
                e,
                n,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ct = $e(t.firstChild), ae = e, ht = !0, Xl = null, Je = !0, l = lf(
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
            ie(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return gi(t, e), t === null ? (l = zm(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : ht || (l = e.type, t = e.pendingProps, n = ji(
          F.current
        ).createElement(l), n[ne] = e, n[be] = t, ce(n, l, t), It(n), e.stateNode = n) : e.memoizedState = zm(
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
        ), ae = e, Je = !0, a = Ct, ln(e.type) ? (io = a, Ct = $e(n.firstChild)) : Ct = a), ie(
          t,
          e,
          e.pendingProps.children,
          l
        ), gi(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && ht && ((a = n = Ct) && (n = Rg(
          n,
          e.type,
          e.pendingProps,
          Je
        ), n !== null ? (e.stateNode = n, ae = e, Ct = $e(n.firstChild), Je = !1, a = !0) : a = !1), a || Gl(e)), vt(e), a = e.type, u = e.pendingProps, s = t !== null ? t.memoizedProps : null, n = u.children, eo(a, u) ? n = null : s !== null && eo(a, s) && (e.flags |= 32), e.memoizedState !== null && (a = ts(
          t,
          e,
          Jv,
          null,
          null,
          l
        ), mu._currentValue = a), gi(t, e), ie(t, e, n, l), e.child;
      case 6:
        return t === null && ht && ((t = l = Ct) && (l = jg(
          l,
          e.pendingProps,
          Je
        ), l !== null ? (e.stateNode = l, ae = e, Ct = null, t = !0) : t = !1), t || Gl(e)), null;
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
        ) : ie(t, e, n, l), e.child;
      case 11:
        return td(
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
        return a = e.type._context, n = e.pendingProps.children, _n(e), a = ue(a), n = n(a), e.flags |= 1, ie(t, e, n, l), e.child;
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
        return eg(t, e, l);
      case 22:
        return nd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return _n(e), n = ue(Qt), t === null ? (a = Zc(), a === null && (a = Nt, u = Gc(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, Kc(e), Ql(e, Qt, a)) : ((t.lanes & l) !== 0 && (Jc(t, e), Ja(e, null, null, l), Ka()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), Ql(e, Qt, n)) : (n = u.cache, Ql(e, Qt, n), n !== a.cache && Xc(
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
    throw Error(r(156, e.tag));
  }
  function Nl(t) {
    t.flags |= 4;
  }
  function Ns(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Yd()) t.flags |= 8192;
        else
          throw Dn = ei, Vc;
    } else t.flags &= -16777217;
  }
  function md(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Nm(e))
      if (Yd()) t.flags |= 8192;
      else
        throw Dn = ei, Vc;
  }
  function pi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? fe() : 536870912, t.lanes |= e, fa |= e);
  }
  function Pa(t, e) {
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
  function ng(t, e, l) {
    var n = e.pendingProps;
    switch (Hc(e), e.tag) {
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
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), _l(Qt), St(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (In(e) ? Nl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, qc())), Rt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (Nl(e), u !== null ? (Rt(e), md(e, u)) : (Rt(e), Ns(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (Nl(e), Rt(e), md(e, u)) : (Rt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && Nl(e), Rt(e), Ns(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (ul(e), l = F.current, a = e.type, t !== null && e.stateNode != null)
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
        if (ul(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Nl(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Rt(e), null;
          }
          if (u = L.current, In(e))
            Vr(e);
          else {
            var s = ji(
              F.current
            );
            switch (u) {
              case 1:
                u = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = s.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? s.createElement("select", {
                      is: n.is
                    }) : s.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? s.createElement(a, { is: n.is }) : s.createElement(a);
                }
            }
            u[ne] = e, u[be] = n;
            t: for (s = e.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                u.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === e) break t;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === e)
                  break t;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
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
            n && Nl(e);
          }
        }
        return Rt(e), Ns(
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
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = ae, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[ne] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || om(t.nodeValue, l)), t || Gl(e, !0);
          } else
            t = ji(t).createTextNode(
              n
            ), t[ne] = e, e.stateNode = t;
        }
        return Rt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = In(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[ne] = e;
            } else
              En(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), t = !1;
          } else
            l = qc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
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
              a[ne] = e;
            } else
              En(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Rt(e), a = !1;
          } else
            a = qc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Re(e), e) : (Re(e), null);
        }
        return Re(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), pi(e, e.updateQueue), Rt(e), null);
      case 4:
        return St(), t === null && Ws(e.stateNode.containerInfo), Rt(e), null;
      case 10:
        return _l(e.type), Rt(e), null;
      case 19:
        if (C(Lt), n = e.memoizedState, n === null) return Rt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) Pa(n, !1);
          else {
            if (Bt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = ui(t), u !== null) {
                  for (e.flags |= 128, Pa(n, !1), t = u.updateQueue, e.updateQueue = t, pi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Lr(l, t), l = l.sibling;
                  return q(
                    Lt,
                    Lt.current & 1 | 2
                  ), ht && El(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && oe() > zi && (e.flags |= 128, a = !0, Pa(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = ui(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, pi(e, t), Pa(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !ht)
                return Rt(e), null;
            } else
              2 * oe() - n.renderingStartTime > zi && l !== 536870912 && (e.flags |= 128, a = !0, Pa(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = oe(), t.sibling = null, l = Lt.current, q(
          Lt,
          a ? l & 1 | 2 : l & 1
        ), ht && El(e, n.treeForkCount), t) : (Rt(e), null);
      case 22:
      case 23:
        return Re(e), Fc(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Rt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Rt(e), l = e.updateQueue, l !== null && pi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && C(Tn), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), _l(Qt), Rt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function ag(t, e) {
    switch (Hc(e), e.tag) {
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
        return Re(e), Fc(), t !== null && C(Tn), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return _l(Qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function hd(t, e) {
    switch (Hc(e), e.tag) {
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
        C(Lt);
        break;
      case 10:
        _l(e.type);
        break;
      case 22:
      case 23:
        Re(e), Fc(), t !== null && C(Tn);
        break;
      case 24:
        _l(Qt);
    }
  }
  function tu(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var u = l.create, s = l.inst;
            n = u(), s.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (f) {
      _t(e, e.return, f);
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
            var s = n.inst, f = s.destroy;
            if (f !== void 0) {
              s.destroy = void 0, a = e;
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
        } while (n !== u);
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
  function eu(t, e) {
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
  function Ms(t, e, l) {
    try {
      var n = t.stateNode;
      Ag(n, t.type, l, e), n[be] = e;
    } catch (a) {
      _t(t, t.return, a);
    }
  }
  function pd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ln(t.type) || t.tag === 4;
  }
  function Os(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || pd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ln(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Cs(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = bl));
    else if (n !== 4 && (n === 27 && ln(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (Cs(t, e, l), t = t.sibling; t !== null; )
        Cs(t, e, l), t = t.sibling;
  }
  function bi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && ln(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (bi(t, e, l), t = t.sibling; t !== null; )
        bi(t, e, l), t = t.sibling;
  }
  function bd(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      ce(e, n, l), e[ne] = t, e[be] = l;
    } catch (u) {
      _t(t, t.return, u);
    }
  }
  var Ml = !1, Kt = !1, Rs = !1, Sd = typeof WeakSet == "function" ? WeakSet : Set, Pt = null;
  function ug(t, e) {
    if (t = t.containerInfo, Ps = Li, t = Cr(t), Tc(t)) {
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
            var s = 0, f = -1, v = -1, _ = 0, R = 0, w = t, T = null;
            e: for (; ; ) {
              for (var N; w !== l || a !== 0 && w.nodeType !== 3 || (f = s + a), w !== u || n !== 0 && w.nodeType !== 3 || (v = s + n), w.nodeType === 3 && (s += w.nodeValue.length), (N = w.firstChild) !== null; )
                T = w, w = N;
              for (; ; ) {
                if (w === t) break e;
                if (T === l && ++_ === a && (f = s), T === u && ++R === n && (v = s), (N = w.nextSibling) !== null) break;
                w = T, T = w.parentNode;
              }
              w = N;
            }
            l = f === -1 || v === -1 ? null : { start: f, end: v };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (to = { focusedElem: t, selectionRange: l }, Li = !1, Pt = e; Pt !== null; )
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
                  var G = On(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    G,
                    u
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
                  no(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      no(t);
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
            t.return = e.return, Pt = t;
            break;
          }
          Pt = e.return;
        }
  }
  function xd(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Cl(t, l), n & 4 && tu(5, l);
        break;
      case 1:
        if (Cl(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (s) {
              _t(l, l.return, s);
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
            } catch (s) {
              _t(
                l,
                l.return,
                s
              );
            }
          }
        n & 64 && vd(l), n & 512 && eu(l, l.return);
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
          } catch (s) {
            _t(l, l.return, s);
          }
        }
        break;
      case 27:
        e === null && n & 4 && bd(l);
      case 26:
      case 5:
        Cl(t, l), e === null && n & 4 && yd(l), n & 512 && eu(l, l.return);
        break;
      case 12:
        Cl(t, l);
        break;
      case 31:
        Cl(t, l), n & 4 && _d(t, l);
        break;
      case 13:
        Cl(t, l), n & 4 && Td(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = hg.bind(
          null,
          l
        ), wg(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || Ml, !n) {
          e = e !== null && e.memoizedState !== null || Kt, a = Ml;
          var u = Kt;
          Ml = n, (Kt = e) && !u ? Rl(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Cl(t, l), Ml = a, Kt = u;
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
    e !== null && (t.alternate = null, Ed(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && sc(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
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
        ln(l.type) && (wt = l.stateNode, xe = !1), Ol(
          t,
          e,
          l
        ), ru(l.stateNode), wt = n, xe = a;
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
            } catch (u) {
              _t(
                l,
                e,
                u
              );
            }
          else
            try {
              wt.removeChild(l.stateNode);
            } catch (u) {
              _t(
                l,
                e,
                u
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
        $l(2, l, e), Kt || $l(4, l, e), Ol(
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
  function ig(t) {
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
  function Si(t, e) {
    var l = ig(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = vg.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function Ee(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], u = t, s = e, f = s;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (ln(f.type)) {
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
        zd(u, s, a), wt = null, xe = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
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
        Ee(e, t), ze(t), n & 4 && ($l(3, t, t.return), tu(3, t), $l(5, t, t.return));
        break;
      case 1:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), n & 64 && Ml && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = ll;
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), n & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      u = a.getElementsByTagName("title")[0], (!u || u[Na] || u[ne] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), ce(u, n, l), u[ne] = t, It(u), n = u;
                      break t;
                    case "link":
                      var s = Am(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (s) {
                        for (var f = 0; f < s.length; f++)
                          if (u = s[f], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            s.splice(f, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ce(u, n, l), a.head.appendChild(u);
                      break;
                    case "meta":
                      if (s = Am(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (f = 0; f < s.length; f++)
                          if (u = s[f], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            s.splice(f, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), ce(u, n, l), a.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  u[ne] = t, It(u), n = u;
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
            u !== n ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, n === null ? Dm(
              a,
              t.type,
              t.stateNode
            ) : Tm(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && Ms(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), l !== null && n & 4 && Ms(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Ee(e, t), ze(t), n & 512 && (Kt || l === null || fl(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            Gn(a, "");
          } catch (G) {
            _t(t, t.return, G);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, Ms(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (Rs = !0);
        break;
      case 6:
        if (Ee(e, t), ze(t), n & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (G) {
            _t(t, t.return, G);
          }
        }
        break;
      case 3:
        if (Hi = null, a = ll, ll = wi(e.containerInfo), Ee(e, t), ll = a, ze(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ba(e.containerInfo);
          } catch (G) {
            _t(t, t.return, G);
          }
        Rs && (Rs = !1, Dd(t));
        break;
      case 4:
        n = ll, ll = wi(
          t.stateNode.containerInfo
        ), Ee(e, t), ze(t), ll = n;
        break;
      case 12:
        Ee(e, t), ze(t);
        break;
      case 31:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Si(t, n)));
        break;
      case 13:
        Ee(e, t), ze(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Ei = oe()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Si(t, n)));
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
                  if (u = v.stateNode, a)
                    s = u.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    f = v.stateNode;
                    var w = v.memoizedProps.style, T = w != null && w.hasOwnProperty("display") ? w.display : null;
                    f.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (G) {
                  _t(v, v.return, G);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                v = e;
                try {
                  v.stateNode.nodeValue = a ? "" : v.memoizedProps;
                } catch (G) {
                  _t(v, v.return, G);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                v = e;
                try {
                  var N = v.stateNode;
                  a ? gm(N, !0) : gm(v.stateNode, !1);
                } catch (G) {
                  _t(v, v.return, G);
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
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, Si(t, l))));
        break;
      case 19:
        Ee(e, t), ze(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Si(t, n)));
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
            var a = l.stateNode, u = Os(t);
            bi(t, u, a);
            break;
          case 5:
            var s = l.stateNode;
            l.flags & 32 && (Gn(s, ""), l.flags &= -33);
            var f = Os(t);
            bi(t, f, s);
            break;
          case 3:
          case 4:
            var v = l.stateNode.containerInfo, _ = Os(t);
            Cs(
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
          $l(4, e, e.return), Cn(e);
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
          ru(e.stateNode);
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
      var n = e.alternate, a = t, u = e, s = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            a,
            u,
            l
          ), tu(4, u);
          break;
        case 1:
          if (Rl(
            a,
            u,
            l
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (_) {
              _t(n, n.return, _);
            }
          if (n = u, a = n.updateQueue, a !== null) {
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
          l && s & 64 && vd(u), eu(u, u.return);
          break;
        case 27:
          bd(u);
        case 26:
        case 5:
          Rl(
            a,
            u,
            l
          ), l && n === null && s & 4 && yd(u), eu(u, u.return);
          break;
        case 12:
          Rl(
            a,
            u,
            l
          );
          break;
        case 31:
          Rl(
            a,
            u,
            l
          ), l && s & 4 && _d(a, u);
          break;
        case 13:
          Rl(
            a,
            u,
            l
          ), l && s & 4 && Td(a, u);
          break;
        case 22:
          u.memoizedState === null && Rl(
            a,
            u,
            l
          ), eu(u, u.return);
          break;
        case 30:
          break;
        default:
          Rl(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function js(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Xa(l));
  }
  function ws(t, e) {
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
        ), a & 2048 && tu(9, e);
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
            var u = e.memoizedProps, s = u.id, f = u.onPostCommit;
            typeof f == "function" && f(
              s,
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
        u = e.stateNode, s = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : lu(t, e) : u._visibility & 2 ? nl(
          t,
          e,
          l,
          n
        ) : (u._visibility |= 2, sa(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && js(s, e);
        break;
      case 24:
        nl(
          t,
          e,
          l,
          n
        ), a & 2048 && ws(e.alternate, e);
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
      var u = t, s = e, f = l, v = n, _ = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          sa(
            u,
            s,
            f,
            v,
            a
          ), tu(8, s);
          break;
        case 23:
          break;
        case 22:
          var R = s.stateNode;
          s.memoizedState !== null ? R._visibility & 2 ? sa(
            u,
            s,
            f,
            v,
            a
          ) : lu(
            u,
            s
          ) : (R._visibility |= 2, sa(
            u,
            s,
            f,
            v,
            a
          )), a && _ & 2048 && js(
            s.alternate,
            s
          );
          break;
        case 24:
          sa(
            u,
            s,
            f,
            v,
            a
          ), a && _ & 2048 && ws(s.alternate, s);
          break;
        default:
          sa(
            u,
            s,
            f,
            v,
            a
          );
      }
      e = e.sibling;
    }
  }
  function lu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            lu(l, n), a & 2048 && js(
              n.alternate,
              n
            );
            break;
          case 24:
            lu(l, n), a & 2048 && ws(n.alternate, n);
            break;
          default:
            lu(l, n);
        }
        e = e.sibling;
      }
  }
  var nu = 8192;
  function oa(t, e, l) {
    if (t.subtreeFlags & nu)
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
        ), t.flags & nu && t.memoizedState !== null && Kg(
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
        ll = wi(t.stateNode.containerInfo), oa(
          t,
          e,
          l
        ), ll = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = nu, nu = 16777216, oa(
          t,
          e,
          l
        ), nu = n) : oa(
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
  function au(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, Rd(
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
        au(t), t.flags & 2048 && $l(9, t, t.return);
        break;
      case 3:
        au(t);
        break;
      case 12:
        au(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, xi(t)) : au(t);
        break;
      default:
        au(t);
    }
  }
  function xi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Pt = n, Rd(
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
          $l(8, e, e.return), xi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, xi(e));
          break;
        default:
          xi(e);
      }
      t = t.sibling;
    }
  }
  function Rd(t, e) {
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
          Xa(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Pt = n;
      else
        t: for (l = t; Pt !== null; ) {
          n = Pt;
          var a = n.sibling, u = n.return;
          if (Ed(n), n === l) {
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
  var cg = {
    getCacheForType: function(t) {
      var e = ue(Qt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ue(Qt).controller.signal;
    }
  }, sg = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Nt = null, st = null, rt = 0, zt = 0, je = null, Wl = !1, ra = !1, Us = !1, jl = 0, Bt = 0, Fl = 0, Rn = 0, Hs = 0, we = 0, fa = 0, uu = null, _e = null, Bs = !1, Ei = 0, jd = 0, zi = 1 / 0, _i = null, Il = null, $t = 0, Pl = null, da = null, wl = 0, qs = 0, Ys = null, wd = null, iu = 0, Ls = null;
  function Ue() {
    return (xt & 2) !== 0 && rt !== 0 ? rt & -rt : O.T !== null ? Ks() : tl();
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
    (t === Nt && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (ma(t, 0), tn(
      t,
      rt,
      we,
      !1
    )), qe(t, l), ((xt & 2) === 0 || t !== Nt) && (t === Nt && ((xt & 2) === 0 && (Rn |= l), Bt === 4 && tn(
      t,
      rt,
      we,
      !1
    )), dl(t));
  }
  function Hd(t, e, l) {
    if ((xt & 6) !== 0) throw Error(r(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ge(t, e), a = n ? fg(t, e) : Gs(t, e, !0), u = n;
    do {
      if (a === 0) {
        ra && !n && tn(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !og(l)) {
          a = Gs(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            e = s;
            t: {
              var f = t;
              a = uu;
              var v = f.current.memoizedState.isDehydrated;
              if (v && (ma(f, s).flags |= 256), s = Gs(
                f,
                s,
                !1
              ), s !== 2) {
                if (Us && !v) {
                  f.errorRecoveryDisabledLanes |= u, Rn |= u, a = 4;
                  break t;
                }
                u = _e, _e = a, u !== null && (_e === null ? _e = u : _e.push.apply(
                  _e,
                  u
                ));
              }
              a = s;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          ma(t, 0), tn(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              tn(
                n,
                e,
                we,
                !Wl
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
          if ((e & 62914560) === e && (a = Ei + 300 - oe(), 10 < a)) {
            if (tn(
              n,
              e,
              we,
              !Wl
            ), Ft(n, 0, !0) !== 0) break t;
            wl = e, n.timeoutHandle = mm(
              Bd.bind(
                null,
                n,
                l,
                _e,
                _i,
                Bs,
                e,
                we,
                Rn,
                fa,
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
          Bd(
            n,
            l,
            _e,
            _i,
            Bs,
            e,
            we,
            Rn,
            fa,
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
  function Bd(t, e, l, n, a, u, s, f, v, _, R, w, T, N) {
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
        u,
        w
      );
      var G = (u & 62914560) === u ? Ei - oe() : (u & 4194048) === u ? jd - oe() : 0;
      if (G = Jg(
        w,
        G
      ), G !== null) {
        wl = u, t.cancelPendingCommit = G(
          Vd.bind(
            null,
            t,
            e,
            u,
            l,
            n,
            a,
            s,
            f,
            v,
            R,
            w,
            null,
            T,
            N
          )
        ), tn(t, u, s, !_);
        return;
      }
    }
    Vd(
      t,
      e,
      u,
      l,
      n,
      a,
      s,
      f,
      v
    );
  }
  function og(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Me(u(), a)) return !1;
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
    e &= ~Hs, e &= ~Rn, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - re(a), s = 1 << u;
      n[u] = -1, a &= ~s;
    }
    l !== 0 && Pe(t, l, e);
  }
  function Ti() {
    return (xt & 6) === 0 ? (cu(0), !1) : !0;
  }
  function Xs() {
    if (st !== null) {
      if (zt === 0)
        var t = st.return;
      else
        t = st, zl = zn = null, ns(t), na = null, Qa = 0, t = st;
      for (; t !== null; )
        hd(t.alternate, t), t = t.return;
      st = null;
    }
  }
  function ma(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, Mg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), wl = 0, Xs(), Nt = t, st = l = xl(t.current, null), rt = e, zt = 0, je = null, Wl = !1, ra = ge(t, e), Us = !1, fa = we = Hs = Rn = Fl = Bt = 0, _e = uu = null, Bs = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - re(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return jl = e, Ku(), l;
  }
  function qd(t, e) {
    at = null, O.H = Fa, e === la || e === ti ? (e = Pr(), zt = 3) : e === Vc ? (e = Pr(), zt = 4) : zt = e === bs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, je = e, st === null && (Bt = 1, hi(
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
    return O.H = Fa, t === null ? Fa : t;
  }
  function Xd() {
    var t = O.A;
    return O.A = cg, t;
  }
  function Ai() {
    Bt = 4, Wl || (rt & 4194048) !== rt && Ce.current !== null || (ra = !0), (Fl & 134217727) === 0 && (Rn & 134217727) === 0 || Nt === null || tn(
      Nt,
      rt,
      we,
      !1
    );
  }
  function Gs(t, e, l) {
    var n = xt;
    xt |= 2;
    var a = Ld(), u = Xd();
    (Nt !== t || rt !== e) && (_i = null, ma(t, e)), e = !1;
    var s = Bt;
    t: do
      try {
        if (zt !== 0 && st !== null) {
          var f = st, v = je;
          switch (zt) {
            case 8:
              Xs(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ce.current === null && (e = !0);
              var _ = zt;
              if (zt = 0, je = null, ha(t, f, v, _), l && ra) {
                s = 0;
                break t;
              }
              break;
            default:
              _ = zt, zt = 0, je = null, ha(t, f, v, _);
          }
        }
        rg(), s = Bt;
        break;
      } catch (R) {
        qd(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, zl = zn = null, xt = n, O.H = a, O.A = u, st === null && (Nt = null, rt = 0, Ku()), s;
  }
  function rg() {
    for (; st !== null; ) Gd(st);
  }
  function fg(t, e) {
    var l = xt;
    xt |= 2;
    var n = Ld(), a = Xd();
    Nt !== t || rt !== e ? (_i = null, zi = oe() + 500, ma(t, e)) : ra = ge(
      t,
      e
    );
    t: do
      try {
        if (zt !== 0 && st !== null) {
          e = st;
          var u = je;
          e: switch (zt) {
            case 1:
              zt = 0, je = null, ha(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Fr(u)) {
                zt = 0, je = null, Qd(e);
                break;
              }
              e = function() {
                zt !== 2 && zt !== 9 || Nt !== t || (zt = 7), dl(t);
              }, u.then(e, e);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              Fr(u) ? (zt = 0, je = null, Qd(e)) : (zt = 0, je = null, ha(t, e, u, 7));
              break;
            case 5:
              var s = null;
              switch (st.tag) {
                case 26:
                  s = st.memoizedState;
                case 5:
                case 27:
                  var f = st;
                  if (s ? Nm(s) : f.stateNode.complete) {
                    zt = 0, je = null;
                    var v = f.sibling;
                    if (v !== null) st = v;
                    else {
                      var _ = f.return;
                      _ !== null ? (st = _, Di(_)) : st = null;
                    }
                    break e;
                  }
              }
              zt = 0, je = null, ha(t, e, u, 5);
              break;
            case 6:
              zt = 0, je = null, ha(t, e, u, 6);
              break;
            case 8:
              Xs(), Bt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        dg();
        break;
      } catch (R) {
        qd(t, R);
      }
    while (!0);
    return zl = zn = null, O.H = n, O.A = a, xt = l, st !== null ? 0 : (Nt = null, rt = 0, Ku(), Bt);
  }
  function dg() {
    for (; st !== null && !jn(); )
      Gd(st);
  }
  function Gd(t) {
    var e = dd(t.alternate, t, jl);
    t.memoizedProps = t.pendingProps, e === null ? Di(t) : st = e;
  }
  function Qd(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = id(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          rt
        );
        break;
      case 11:
        e = id(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          rt
        );
        break;
      case 5:
        ns(e);
      default:
        hd(l, e), e = st = Lr(e, jl), e = dd(l, e, jl);
    }
    t.memoizedProps = t.pendingProps, e === null ? Di(t) : st = e;
  }
  function ha(t, e, l, n) {
    zl = zn = null, ns(e), na = null, Qa = 0;
    var a = e.return;
    try {
      if (tg(
        t,
        a,
        e,
        l,
        rt
      )) {
        Bt = 1, hi(
          t,
          Ze(l, t.current)
        ), st = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw st = a, u;
      Bt = 1, hi(
        t,
        Ze(l, t.current)
      ), st = null;
      return;
    }
    e.flags & 32768 ? (ht || n === 1 ? t = !0 : ra || (rt & 536870912) !== 0 ? t = !1 : (Wl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = Ce.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Zd(e, t)) : Di(e);
  }
  function Di(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Zd(
          e,
          Wl
        );
        return;
      }
      t = e.return;
      var l = ng(
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
      var l = ag(t.alternate, t);
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
  function Vd(t, e, l, n, a, u, s, f, v) {
    t.cancelPendingCommit = null;
    do
      Ni();
    while ($t !== 0);
    if ((xt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (u = e.lanes | e.childLanes, u |= Oc, kt(
        t,
        l,
        u,
        s,
        f,
        v
      ), t === Nt && (st = Nt = null, rt = 0), da = e, Pl = t, wl = l, qs = u, Ys = a, wd = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, gg(Ie, function() {
        return Wd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null, a = B.p, B.p = 2, s = xt, xt |= 4;
        try {
          ug(t, e, l);
        } finally {
          xt = s, B.p = a, O.T = n;
        }
      }
      $t = 1, Kd(), Jd(), kd();
    }
  }
  function Kd() {
    if ($t === 1) {
      $t = 0;
      var t = Pl, e = da, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null;
        var n = B.p;
        B.p = 2;
        var a = xt;
        xt |= 4;
        try {
          Ad(e, t);
          var u = to, s = Cr(t.containerInfo), f = u.focusedElem, v = u.selectionRange;
          if (s !== f && f && f.ownerDocument && Or(
            f.ownerDocument.documentElement,
            f
          )) {
            if (v !== null && Tc(f)) {
              var _ = v.start, R = v.end;
              if (R === void 0 && (R = _), "selectionStart" in f)
                f.selectionStart = _, f.selectionEnd = Math.min(
                  R,
                  f.value.length
                );
              else {
                var w = f.ownerDocument || document, T = w && w.defaultView || window;
                if (T.getSelection) {
                  var N = T.getSelection(), G = f.textContent.length, $ = Math.min(v.start, G), Dt = v.end === void 0 ? $ : Math.min(v.end, G);
                  !N.extend && $ > Dt && (s = Dt, Dt = $, $ = s);
                  var E = Mr(
                    f,
                    $
                  ), b = Mr(
                    f,
                    Dt
                  );
                  if (E && b && (N.rangeCount !== 1 || N.anchorNode !== E.node || N.anchorOffset !== E.offset || N.focusNode !== b.node || N.focusOffset !== b.offset)) {
                    var z = w.createRange();
                    z.setStart(E.node, E.offset), N.removeAllRanges(), $ > Dt ? (N.addRange(z), N.extend(b.node, b.offset)) : (z.setEnd(b.node, b.offset), N.addRange(z));
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
          Li = !!Ps, to = Ps = null;
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
      var t = Pl, e = da, l = (e.flags & 8772) !== 0;
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
      $t = 0, Cu();
      var t = Pl, e = da, l = wl, n = wd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? $t = 5 : ($t = 0, da = Pl = null, $d(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Il = null), yl(l), e = e.stateNode, me && typeof me.onCommitFiberRoot == "function")
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
          for (var u = t.onRecoverableError, s = 0; s < n.length; s++) {
            var f = n[s];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          O.T = e, B.p = a;
        }
      }
      (wl & 3) !== 0 && Ni(), dl(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === Ls ? iu++ : (iu = 0, Ls = t) : iu = 0, cu(0);
    }
  }
  function $d(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Xa(e)));
  }
  function Ni() {
    return Kd(), Jd(), kd(), Wd();
  }
  function Wd() {
    if ($t !== 5) return !1;
    var t = Pl, e = qs;
    qs = 0;
    var l = yl(wl), n = O.T, a = B.p;
    try {
      B.p = 32 > l ? 32 : l, O.T = null, l = Ys, Ys = null;
      var u = Pl, s = wl;
      if ($t = 0, da = Pl = null, wl = 0, (xt & 6) !== 0) throw Error(r(331));
      var f = xt;
      if (xt |= 4, Cd(u.current), Nd(
        u,
        u.current,
        s,
        l
      ), xt = f, cu(0, !1), me && typeof me.onPostCommitFiberRoot == "function")
        try {
          me.onPostCommitFiberRoot(vn, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = a, O.T = n, $d(t, e);
    }
  }
  function Fd(t, e, l) {
    e = Ze(l, e), e = ps(t.stateNode, e, 2), t = Kl(t, e, 2), t !== null && (qe(t, 2), dl(t));
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
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Il === null || !Il.has(n))) {
            t = Ze(l, t), l = If(2), n = Kl(e, l, 2), n !== null && (Pf(
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
  function Qs(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new sg();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (Us = !0, a.add(l), t = mg.bind(null, t, e, l), e.then(t, t));
  }
  function mg(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Nt === t && (rt & l) === l && (Bt === 4 || Bt === 3 && (rt & 62914560) === rt && 300 > oe() - Ei ? (xt & 2) === 0 && ma(t, 0) : Hs |= l, fa === rt && (fa = 0)), dl(t);
  }
  function Id(t, e) {
    e === 0 && (e = fe()), t = Sn(t, e), t !== null && (qe(t, e), dl(t));
  }
  function hg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Id(t, l);
  }
  function vg(t, e) {
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
  function gg(t, e) {
    return He(t, e);
  }
  var Mi = null, va = null, Zs = !1, Oi = !1, Vs = !1, en = 0;
  function dl(t) {
    t !== va && t.next === null && (va === null ? Mi = va = t : va = va.next = t), Oi = !0, Zs || (Zs = !0, pg());
  }
  function cu(t, e) {
    if (!Vs && Oi) {
      Vs = !0;
      do
        for (var l = !1, n = Mi; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var s = n.suspendedLanes, f = n.pingedLanes;
              u = (1 << 31 - re(42 | t) + 1) - 1, u &= a & ~(s & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, lm(n, u));
          } else
            u = rt, u = Ft(
              n,
              n === Nt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || ge(n, u) || (l = !0, lm(n, u));
          n = n.next;
        }
      while (l);
      Vs = !1;
    }
  }
  function yg() {
    Pd();
  }
  function Pd() {
    Oi = Zs = !1;
    var t = 0;
    en !== 0 && Ng() && (t = en);
    for (var e = oe(), l = null, n = Mi; n !== null; ) {
      var a = n.next, u = tm(n, e);
      u === 0 ? (n.next = null, l === null ? Mi = a : l.next = a, a === null && (va = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (Oi = !0)), n = a;
    }
    $t !== 0 && $t !== 5 || cu(t), en !== 0 && (en = 0);
  }
  function tm(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var s = 31 - re(u), f = 1 << s, v = a[s];
      v === -1 ? ((f & l) === 0 || (f & n) !== 0) && (a[s] = ye(f, e)) : v <= e && (t.expiredLanes |= f), u &= ~f;
    }
    if (e = Nt, l = rt, l = Ft(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Bl(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || ge(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && Bl(n), yl(l)) {
        case 2:
        case 8:
          l = vl;
          break;
        case 32:
          l = Ie;
          break;
        case 268435456:
          l = Da;
          break;
        default:
          l = Ie;
      }
      return n = em.bind(null, t), l = He(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && Bl(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function em(t, e) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Ni() && t.callbackNode !== l)
      return null;
    var n = rt;
    return n = Ft(
      t,
      t === Nt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (Hd(t, n, e), tm(t, oe()), t.callbackNode != null && t.callbackNode === l ? em.bind(null, t) : null);
  }
  function lm(t, e) {
    if (Ni()) return null;
    Hd(t, e, !0);
  }
  function pg() {
    Og(function() {
      (xt & 6) !== 0 ? He(
        Ru,
        yg
      ) : Pd();
    });
  }
  function Ks() {
    if (en === 0) {
      var t = ta;
      t === 0 && (t = wn, wn <<= 1, (wn & 261888) === 0 && (wn = 256)), en = t;
    }
    return en;
  }
  function nm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : qu("" + t);
  }
  function am(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function bg(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = nm(
        (a[be] || null).action
      ), s = n.submitter;
      s && (e = (e = s[be] || null) ? nm(e.formAction) : s.getAttribute("formAction"), e !== null && (u = e, s = null));
      var f = new Gu(
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
                if (en !== 0) {
                  var v = s ? am(a, s) : new FormData(a);
                  ds(
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
                typeof u == "function" && (f.preventDefault(), v = s ? am(a, s) : new FormData(a), ds(
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
  for (var Js = 0; Js < Mc.length; Js++) {
    var ks = Mc[Js], Sg = ks.toLowerCase(), xg = ks[0].toUpperCase() + ks.slice(1);
    el(
      Sg,
      "on" + xg
    );
  }
  el(wr, "onAnimationEnd"), el(Ur, "onAnimationIteration"), el(Hr, "onAnimationStart"), el("dblclick", "onDoubleClick"), el("focusin", "onFocus"), el("focusout", "onBlur"), el(Bv, "onTransitionRun"), el(qv, "onTransitionStart"), el(Yv, "onTransitionCancel"), el(Br, "onTransitionEnd"), Ln("onMouseEnter", ["mouseout", "mouseover"]), Ln("onMouseLeave", ["mouseout", "mouseover"]), Ln("onPointerEnter", ["pointerout", "pointerover"]), Ln("onPointerLeave", ["pointerout", "pointerover"]), gn(
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
  var su = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Eg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(su)
  );
  function um(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var s = n.length - 1; 0 <= s; s--) {
            var f = n[s], v = f.instance, _ = f.currentTarget;
            if (f = f.listener, v !== u && a.isPropagationStopped())
              break t;
            u = f, a.currentTarget = _;
            try {
              u(a);
            } catch (R) {
              Vu(R);
            }
            a.currentTarget = null, u = v;
          }
        else
          for (s = 0; s < n.length; s++) {
            if (f = n[s], v = f.instance, _ = f.currentTarget, f = f.listener, v !== u && a.isPropagationStopped())
              break t;
            u = f, a.currentTarget = _;
            try {
              u(a);
            } catch (R) {
              Vu(R);
            }
            a.currentTarget = null, u = v;
          }
      }
    }
  }
  function ot(t, e) {
    var l = e[cc];
    l === void 0 && (l = e[cc] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (im(e, t, 2, !1), l.add(n));
  }
  function $s(t, e, l) {
    var n = 0;
    e && (n |= 4), im(
      l,
      t,
      n,
      e
    );
  }
  var Ci = "_reactListening" + Math.random().toString(36).slice(2);
  function Ws(t) {
    if (!t[Ci]) {
      t[Ci] = !0, Io.forEach(function(l) {
        l !== "selectionchange" && (Eg.has(l) || $s(l, !1, t), $s(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ci] || (e[Ci] = !0, $s("selectionchange", !1, e));
    }
  }
  function im(t, e, l, n) {
    switch (Um(e)) {
      case 2:
        var a = Wg;
        break;
      case 8:
        a = Fg;
        break;
      default:
        a = fo;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !gc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Fs(t, e, l, n, a) {
    var u = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var s = n.tag;
        if (s === 3 || s === 4) {
          var f = n.stateNode.containerInfo;
          if (f === a) break;
          if (s === 4)
            for (s = n.return; s !== null; ) {
              var v = s.tag;
              if ((v === 3 || v === 4) && s.stateNode.containerInfo === a)
                return;
              s = s.return;
            }
          for (; f !== null; ) {
            if (s = Bn(f), s === null) return;
            if (v = s.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              n = u = s;
              continue t;
            }
            f = f.parentNode;
          }
        }
        n = n.return;
      }
    rr(function() {
      var _ = u, R = hc(l), w = [];
      t: {
        var T = qr.get(t);
        if (T !== void 0) {
          var N = Gu, G = t;
          switch (t) {
            case "keypress":
              if (Lu(l) === 0) break t;
            case "keydown":
            case "keyup":
              N = vv;
              break;
            case "focusin":
              G = "focus", N = Sc;
              break;
            case "focusout":
              G = "blur", N = Sc;
              break;
            case "beforeblur":
            case "afterblur":
              N = Sc;
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
              N = nv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = pv;
              break;
            case wr:
            case Ur:
            case Hr:
              N = iv;
              break;
            case Br:
              N = Sv;
              break;
            case "scroll":
            case "scrollend":
              N = ev;
              break;
            case "wheel":
              N = Ev;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = sv;
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
              N = _v;
          }
          var $ = (e & 4) !== 0, Dt = !$ && (t === "scroll" || t === "scrollend"), E = $ ? T !== null ? T + "Capture" : null : T;
          $ = [];
          for (var b = _, z; b !== null; ) {
            var j = b;
            if (z = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || z === null || E === null || (j = Oa(b, E), j != null && $.push(
              ou(b, j, z)
            )), Dt) break;
            b = b.return;
          }
          0 < $.length && (T = new N(
            T,
            G,
            null,
            l,
            R
          ), w.push({ event: T, listeners: $ }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (T = t === "mouseover" || t === "pointerover", N = t === "mouseout" || t === "pointerout", T && l !== mc && (G = l.relatedTarget || l.fromElement) && (Bn(G) || G[Hn]))
            break t;
          if ((N || T) && (T = R.window === R ? R : (T = R.ownerDocument) ? T.defaultView || T.parentWindow : window, N ? (G = l.relatedTarget || l.toElement, N = _, G = G ? Bn(G) : null, G !== null && (Dt = d(G), $ = G.tag, G !== Dt || $ !== 5 && $ !== 27 && $ !== 6) && (G = null)) : (N = null, G = _), N !== G)) {
            if ($ = mr, j = "onMouseLeave", E = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && ($ = vr, j = "onPointerLeave", E = "onPointerEnter", b = "pointer"), Dt = N == null ? T : Ma(N), z = G == null ? T : Ma(G), T = new $(
              j,
              b + "leave",
              N,
              l,
              R
            ), T.target = Dt, T.relatedTarget = z, j = null, Bn(R) === _ && ($ = new $(
              E,
              b + "enter",
              G,
              l,
              R
            ), $.target = z, $.relatedTarget = Dt, j = $), Dt = j, N && G)
              e: {
                for ($ = zg, E = N, b = G, z = 0, j = E; j; j = $(j))
                  z++;
                j = 0;
                for (var K = b; K; K = $(K))
                  j++;
                for (; 0 < z - j; )
                  E = $(E), z--;
                for (; 0 < j - z; )
                  b = $(b), j--;
                for (; z--; ) {
                  if (E === b || b !== null && E === b.alternate) {
                    $ = E;
                    break e;
                  }
                  E = $(E), b = $(b);
                }
                $ = null;
              }
            else $ = null;
            N !== null && cm(
              w,
              T,
              N,
              $,
              !1
            ), G !== null && Dt !== null && cm(
              w,
              Dt,
              G,
              $,
              !0
            );
          }
        }
        t: {
          if (T = _ ? Ma(_) : window, N = T.nodeName && T.nodeName.toLowerCase(), N === "select" || N === "input" && T.type === "file")
            var yt = zr;
          else if (xr(T))
            if (_r)
              yt = wv;
            else {
              yt = Rv;
              var Q = Cv;
            }
          else
            N = T.nodeName, !N || N.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? _ && dc(_.elementType) && (yt = zr) : yt = jv;
          if (yt && (yt = yt(t, _))) {
            Er(
              w,
              yt,
              l,
              R
            );
            break t;
          }
          Q && Q(t, T, _), t === "focusout" && _ && T.type === "number" && _.memoizedProps.value != null && fc(T, "number", T.value);
        }
        switch (Q = _ ? Ma(_) : window, t) {
          case "focusin":
            (xr(Q) || Q.contentEditable === "true") && (Kn = Q, Ac = _, qa = null);
            break;
          case "focusout":
            qa = Ac = Kn = null;
            break;
          case "mousedown":
            Dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dc = !1, Rr(w, l, R);
            break;
          case "selectionchange":
            if (Hv) break;
          case "keydown":
          case "keyup":
            Rr(w, l, R);
        }
        var ut;
        if (Ec)
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
        ft && (gr && l.locale !== "ko" && (Vn || ft !== "onCompositionStart" ? ft === "onCompositionEnd" && Vn && (ut = fr()) : (Yl = R, yc = "value" in Yl ? Yl.value : Yl.textContent, Vn = !0)), Q = Ri(_, ft), 0 < Q.length && (ft = new hr(
          ft,
          t,
          null,
          l,
          R
        ), w.push({ event: ft, listeners: Q }), ut ? ft.data = ut : (ut = Sr(l), ut !== null && (ft.data = ut)))), (ut = Av ? Dv(t, l) : Nv(t, l)) && (ft = Ri(_, "onBeforeInput"), 0 < ft.length && (Q = new hr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          R
        ), w.push({
          event: Q,
          listeners: ft
        }), Q.data = ut)), bg(
          w,
          t,
          _,
          l,
          R
        );
      }
      um(w, e);
    });
  }
  function ou(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Ri(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = Oa(t, l), a != null && n.unshift(
        ou(t, a, u)
      ), a = Oa(t, e), a != null && n.push(
        ou(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function zg(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function cm(t, e, l, n, a) {
    for (var u = e._reactName, s = []; l !== null && l !== n; ) {
      var f = l, v = f.alternate, _ = f.stateNode;
      if (f = f.tag, v !== null && v === n) break;
      f !== 5 && f !== 26 && f !== 27 || _ === null || (v = _, a ? (_ = Oa(l, u), _ != null && s.unshift(
        ou(l, _, v)
      )) : a || (_ = Oa(l, u), _ != null && s.push(
        ou(l, _, v)
      ))), l = l.return;
    }
    s.length !== 0 && t.push({ event: e, listeners: s });
  }
  var _g = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
  function sm(t) {
    return (typeof t == "string" ? t : "" + t).replace(_g, `
`).replace(Tg, "");
  }
  function om(t, e) {
    return e = sm(e), sm(t) === e;
  }
  function At(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || Gn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && Gn(t, "" + n);
        break;
      case "className":
        Hu(t, "class", n);
        break;
      case "tabIndex":
        Hu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Hu(t, l, n);
        break;
      case "style":
        sr(t, n, u);
        break;
      case "data":
        if (e !== "object") {
          Hu(t, "data", n);
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
        n = qu("" + n), t.setAttribute(l, n);
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
        n = qu("" + n), t.setAttribute(l, n);
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
        l = qu("" + n), t.setAttributeNS(
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
        ot("beforetoggle", t), ot("toggle", t), Uu(t, "popover", n);
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
        Uu(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Ph.get(l) || l, Uu(t, l, n));
    }
  }
  function Is(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        sr(t, n, u);
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
        typeof n == "string" ? Gn(t, n) : (typeof n == "number" || typeof n == "bigint") && Gn(t, "" + n);
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
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), u = t[be] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : Uu(t, l, n);
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
        ot("error", t), ot("load", t);
        var n = !1, a = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var s = l[u];
            if (s != null)
              switch (u) {
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
                  At(t, e, u, s, l, null);
              }
          }
        a && At(t, e, "srcSet", l.srcSet, l, null), n && At(t, e, "src", l.src, l, null);
        return;
      case "input":
        ot("invalid", t);
        var f = u = s = a = null, v = null, _ = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var R = l[n];
            if (R != null)
              switch (n) {
                case "name":
                  a = R;
                  break;
                case "type":
                  s = R;
                  break;
                case "checked":
                  v = R;
                  break;
                case "defaultChecked":
                  _ = R;
                  break;
                case "value":
                  u = R;
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
          u,
          f,
          v,
          _,
          s,
          a,
          !1
        );
        return;
      case "select":
        ot("invalid", t), n = s = u = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (f = l[a], f != null))
            switch (a) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                s = f;
                break;
              case "multiple":
                n = f;
              default:
                At(t, e, a, f, l, null);
            }
        e = u, l = s, t.multiple = !!n, e != null ? Xn(t, !!n, e, !1) : l != null && Xn(t, !!n, l, !0);
        return;
      case "textarea":
        ot("invalid", t), u = a = n = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (f = l[s], f != null))
            switch (s) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                a = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                At(t, e, s, f, l, null);
            }
        ir(t, n, a, u);
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
        for (n = 0; n < su.length; n++)
          ot(su[n], t);
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
        if (dc(e)) {
          for (R in l)
            l.hasOwnProperty(R) && (n = l[R], n !== void 0 && Is(
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
  function Ag(t, e, l, n) {
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
        var a = null, u = null, s = null, f = null, v = null, _ = null, R = null;
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
        for (var T in n) {
          var N = n[T];
          if (w = l[T], n.hasOwnProperty(T) && (N != null || w != null))
            switch (T) {
              case "type":
                u = N;
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
                s = N;
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
                  T,
                  N,
                  n,
                  w
                );
            }
        }
        rc(
          t,
          s,
          f,
          v,
          _,
          R,
          u,
          a
        );
        return;
      case "select":
        N = s = f = T = null;
        for (u in l)
          if (v = l[u], l.hasOwnProperty(u) && v != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                N = v;
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
                f = u;
                break;
              case "multiple":
                s = u;
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
        e = f, l = s, n = N, T != null ? Xn(t, !!l, T, !1) : !!n != !!l && (e != null ? Xn(t, !!l, e, !0) : Xn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = T = null;
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
        for (s in n)
          if (a = n[s], u = l[s], n.hasOwnProperty(s) && (a != null || u != null))
            switch (s) {
              case "value":
                T = a;
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
                a !== u && At(t, e, s, a, n, u);
            }
        ur(t, T, N);
        return;
      case "option":
        for (var G in l)
          T = l[G], l.hasOwnProperty(G) && T != null && !n.hasOwnProperty(G) && (G === "selected" ? t.selected = !1 : At(
            t,
            e,
            G,
            null,
            n,
            T
          ));
        for (v in n)
          T = n[v], N = l[v], n.hasOwnProperty(v) && T !== N && (T != null || N != null) && (v === "selected" ? t.selected = T && typeof T != "function" && typeof T != "symbol" : At(
            t,
            e,
            v,
            T,
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
          T = l[$], l.hasOwnProperty($) && T != null && !n.hasOwnProperty($) && At(t, e, $, null, n, T);
        for (_ in n)
          if (T = n[_], N = l[_], n.hasOwnProperty(_) && T !== N && (T != null || N != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(r(137, e));
                break;
              default:
                At(
                  t,
                  e,
                  _,
                  T,
                  n,
                  N
                );
            }
        return;
      default:
        if (dc(e)) {
          for (var Dt in l)
            T = l[Dt], l.hasOwnProperty(Dt) && T !== void 0 && !n.hasOwnProperty(Dt) && Is(
              t,
              e,
              Dt,
              void 0,
              n,
              T
            );
          for (R in n)
            T = n[R], N = l[R], !n.hasOwnProperty(R) || T === N || T === void 0 && N === void 0 || Is(
              t,
              e,
              R,
              T,
              n,
              N
            );
          return;
        }
    }
    for (var E in l)
      T = l[E], l.hasOwnProperty(E) && T != null && !n.hasOwnProperty(E) && At(t, e, E, null, n, T);
    for (w in n)
      T = n[w], N = l[w], !n.hasOwnProperty(w) || T === N || T == null && N == null || At(t, e, w, T, n, N);
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
  function Dg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, s = a.initiatorType, f = a.duration;
        if (u && f && rm(s)) {
          for (s = 0, f = a.responseEnd, n += 1; n < l.length; n++) {
            var v = l[n], _ = v.startTime;
            if (_ > f) break;
            var R = v.transferSize, w = v.initiatorType;
            R && rm(w) && (v = v.responseEnd, s += R * (v < f ? 1 : (f - _) / (v - _)));
          }
          if (--n, e += 8 * (u + s) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ps = null, to = null;
  function ji(t) {
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
  function eo(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var lo = null;
  function Ng() {
    var t = window.event;
    return t && t.type === "popstate" ? t === lo ? !1 : (lo = t, !0) : (lo = null, !1);
  }
  var mm = typeof setTimeout == "function" ? setTimeout : void 0, Mg = typeof clearTimeout == "function" ? clearTimeout : void 0, hm = typeof Promise == "function" ? Promise : void 0, Og = typeof queueMicrotask == "function" ? queueMicrotask : typeof hm < "u" ? function(t) {
    return hm.resolve(null).then(t).catch(Cg);
  } : mm;
  function Cg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ln(t) {
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
          ru(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, ru(l);
          for (var u = l.firstChild; u; ) {
            var s = u.nextSibling, f = u.nodeName;
            u[Na] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = s;
          }
        } else
          l === "body" && ru(t.ownerDocument.body);
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
  function no(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          no(l), sc(l);
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
  function Rg(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[Na])
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
  function jg(t, e, l) {
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
  function ao(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function uo(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function wg(t, e) {
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
  var io = null;
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
    switch (e = ji(l), t) {
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
  function ru(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    sc(t);
  }
  var We = /* @__PURE__ */ new Map(), xm = /* @__PURE__ */ new Set();
  function wi(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ul = B.d;
  B.d = {
    f: Ug,
    r: Hg,
    D: Bg,
    C: qg,
    L: Yg,
    m: Lg,
    X: Gg,
    S: Xg,
    M: Qg
  };
  function Ug() {
    var t = Ul.f(), e = Ti();
    return t || e;
  }
  function Hg(t) {
    var e = qn(t);
    e !== null && e.tag === 5 && e.type === "form" ? qf(e) : Ul.r(t);
  }
  var ga = typeof document > "u" ? null : document;
  function Em(t, e, l) {
    var n = ga;
    if (n && typeof e == "string" && e) {
      var a = Ge(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), xm.has(a) || (xm.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), ce(e, "link", t), It(e), n.head.appendChild(e)));
    }
  }
  function Bg(t) {
    Ul.D(t), Em("dns-prefetch", t, null);
  }
  function qg(t, e) {
    Ul.C(t, e), Em("preconnect", t, e);
  }
  function Yg(t, e, l) {
    Ul.L(t, e, l);
    var n = ga;
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
          u = ya(t);
          break;
        case "script":
          u = pa(t);
      }
      We.has(u) || (t = A(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), We.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(fu(u)) || e === "script" && n.querySelector(du(u)) || (e = n.createElement("link"), ce(e, "link", t), It(e), n.head.appendChild(e)));
    }
  }
  function Lg(t, e) {
    Ul.m(t, e);
    var l = ga;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Ge(n) + '"][href="' + Ge(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = pa(t);
      }
      if (!We.has(u) && (t = A({ rel: "modulepreload", href: t }, e), We.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(du(u)))
              return;
        }
        n = l.createElement("link"), ce(n, "link", t), It(n), l.head.appendChild(n);
      }
    }
  }
  function Xg(t, e, l) {
    Ul.S(t, e, l);
    var n = ga;
    if (n && t) {
      var a = Yn(n).hoistableStyles, u = ya(t);
      e = e || "default";
      var s = a.get(u);
      if (!s) {
        var f = { loading: 0, preload: null };
        if (s = n.querySelector(
          fu(u)
        ))
          f.loading = 5;
        else {
          t = A(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = We.get(u)) && co(t, l);
          var v = s = n.createElement("link");
          It(v), ce(v, "link", t), v._p = new Promise(function(_, R) {
            v.onload = _, v.onerror = R;
          }), v.addEventListener("load", function() {
            f.loading |= 1;
          }), v.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Ui(s, e, n);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: f
        }, a.set(u, s);
      }
    }
  }
  function Gg(t, e) {
    Ul.X(t, e);
    var l = ga;
    if (l && t) {
      var n = Yn(l).hoistableScripts, a = pa(t), u = n.get(a);
      u || (u = l.querySelector(du(a)), u || (t = A({ src: t, async: !0 }, e), (e = We.get(a)) && so(t, e), u = l.createElement("script"), It(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Qg(t, e) {
    Ul.M(t, e);
    var l = ga;
    if (l && t) {
      var n = Yn(l).hoistableScripts, a = pa(t), u = n.get(a);
      u || (u = l.querySelector(du(a)), u || (t = A({ src: t, async: !0, type: "module" }, e), (e = We.get(a)) && so(t, e), u = l.createElement("script"), It(u), ce(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function zm(t, e, l, n) {
    var a = (a = F.current) ? wi(a) : null;
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
          var u = Yn(
            a
          ).hoistableStyles, s = u.get(t);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, s), (u = a.querySelector(
            fu(t)
          )) && !u._p && (s.instance = u, s.state.loading = 5), We.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, We.set(t, l), u || Zg(
            a,
            t,
            l,
            s.state
          ))), e && n === null)
            throw Error(r(528, ""));
          return s;
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
    return 'href="' + Ge(t) + '"';
  }
  function fu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function _m(t) {
    return A({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Zg(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), ce(e, "link", l), It(e), t.head.appendChild(e));
  }
  function pa(t) {
    return '[src="' + Ge(t) + '"]';
  }
  function du(t) {
    return "script[async]" + t;
  }
  function Tm(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Ge(l.href) + '"]'
          );
          if (n)
            return e.instance = n, It(n), n;
          var a = A({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), It(n), ce(n, "style", a), Ui(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = ya(l.href);
          var u = t.querySelector(
            fu(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, It(u), u;
          n = _m(l), (a = We.get(a)) && co(n, a), u = (t.ownerDocument || t).createElement("link"), It(u);
          var s = u;
          return s._p = new Promise(function(f, v) {
            s.onload = f, s.onerror = v;
          }), ce(u, "link", n), e.state.loading |= 4, Ui(u, l.precedence, t), e.instance = u;
        case "script":
          return u = pa(l.src), (a = t.querySelector(
            du(u)
          )) ? (e.instance = a, It(a), a) : (n = l, (a = We.get(u)) && (n = A({}, l), so(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), It(a), ce(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, Ui(n, l.precedence, t));
    return e.instance;
  }
  function Ui(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, s = 0; s < n.length; s++) {
      var f = n[s];
      if (f.dataset.precedence === e) u = f;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function co(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function so(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Hi = null;
  function Am(t, e, l) {
    if (Hi === null) {
      var n = /* @__PURE__ */ new Map(), a = Hi = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Hi, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[Na] || u[ne] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = u.getAttribute(e) || "";
        s = t + s;
        var f = n.get(s);
        f ? f.push(u) : n.set(s, [u]);
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
  function Vg(t, e, l) {
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
  function Kg(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = ya(n.href), u = e.querySelector(
          fu(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Bi.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, It(u);
          return;
        }
        u = e.ownerDocument || e, n = _m(n), (a = We.get(a)) && co(n, a), u = u.createElement("link"), It(u);
        var s = u;
        s._p = new Promise(function(f, v) {
          s.onload = f, s.onerror = v;
        }), ce(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Bi.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var oo = 0;
  function Jg(t, e) {
    return t.stylesheets && t.count === 0 && Yi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && Yi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && oo === 0 && (oo = 62500 * Dg());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Yi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > oo ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Bi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Yi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var qi = null;
  function Yi(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, qi = /* @__PURE__ */ new Map(), e.forEach(kg, t), qi = null, Bi.call(t));
  }
  function kg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = qi.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), qi.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var s = a[u];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (l.set(s.dataset.precedence, s), n = s);
        }
        n && l.set(null, n);
      }
      a = e.instance, s = a.getAttribute("data-precedence"), u = l.get(s) || n, u === n && l.set(null, a), l.set(s, a), this.count++, n = Bi.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var mu = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function $g(t, e, l, n, a, u, s, f, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pe(0), this.hiddenUpdates = pe(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Mm(t, e, l, n, a, u, s, f, v, _, R, w) {
    return t = new $g(
      t,
      e,
      l,
      s,
      v,
      _,
      R,
      w,
      f
    ), e = 1, u === !0 && (e |= 24), u = Oe(3, null, null, e), t.current = u, u.stateNode = t, e = Gc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, Kc(u), t;
  }
  function Om(t) {
    return t ? (t = $n, t) : $n;
  }
  function Cm(t, e, l, n, a, u) {
    a = Om(a), n.context === null ? n.context = a : n.pendingContext = a, n = Vl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = Kl(t, n, e), l !== null && (Te(l, t, e), Va(l, t, e));
  }
  function Rm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function ro(t, e) {
    Rm(t, e), (t = t.alternate) && Rm(t, e);
  }
  function jm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Sn(t, 67108864);
      e !== null && Te(e, t, 67108864), ro(t, 67108864);
    }
  }
  function wm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ue();
      e = gl(e);
      var l = Sn(t, e);
      l !== null && Te(l, t, e), ro(t, e);
    }
  }
  var Li = !0;
  function Wg(t, e, l, n) {
    var a = O.T;
    O.T = null;
    var u = B.p;
    try {
      B.p = 2, fo(t, e, l, n);
    } finally {
      B.p = u, O.T = a;
    }
  }
  function Fg(t, e, l, n) {
    var a = O.T;
    O.T = null;
    var u = B.p;
    try {
      B.p = 8, fo(t, e, l, n);
    } finally {
      B.p = u, O.T = a;
    }
  }
  function fo(t, e, l, n) {
    if (Li) {
      var a = mo(n);
      if (a === null)
        Fs(
          t,
          e,
          n,
          Xi,
          l
        ), Hm(t, n);
      else if (Pg(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (Hm(t, n), e & 4 && -1 < Ig.indexOf(t)) {
        for (; a !== null; ) {
          var u = qn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var s = Yt(u.pendingLanes);
                  if (s !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; s; ) {
                      var v = 1 << 31 - re(s);
                      f.entanglements[1] |= v, s &= ~v;
                    }
                    dl(u), (xt & 6) === 0 && (zi = oe() + 500, cu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Sn(u, 2), f !== null && Te(f, u, 2), Ti(), ro(u, 2);
            }
          if (u = mo(n), u === null && Fs(
            t,
            e,
            n,
            Xi,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        Fs(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function mo(t) {
    return t = hc(t), ho(t);
  }
  var Xi = null;
  function ho(t) {
    if (Xi = null, t = Bn(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = g(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = x(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Xi = t, null;
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
        switch (ac()) {
          case Ru:
            return 2;
          case vl:
            return 8;
          case Ie:
          case hn:
            return 32;
          case Da:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var vo = !1, nn = null, an = null, un = null, hu = /* @__PURE__ */ new Map(), vu = /* @__PURE__ */ new Map(), cn = [], Ig = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hm(t, e) {
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
        hu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vu.delete(e.pointerId);
    }
  }
  function gu(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = qn(e), e !== null && jm(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function Pg(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return nn = gu(
          nn,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return an = gu(
          an,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return un = gu(
          un,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return hu.set(
          u,
          gu(
            hu.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, vu.set(
          u,
          gu(
            vu.get(u) || null,
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
          if (e = g(l), e !== null) {
            t.blockedOn = e, ql(t.priority, function() {
              wm(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = x(l), e !== null) {
            t.blockedOn = e, ql(t.priority, function() {
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
  function Gi(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = mo(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        mc = n, l.target.dispatchEvent(n), mc = null;
      } else
        return e = qn(l), e !== null && jm(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function qm(t, e, l) {
    Gi(t) && l.delete(e);
  }
  function t0() {
    vo = !1, nn !== null && Gi(nn) && (nn = null), an !== null && Gi(an) && (an = null), un !== null && Gi(un) && (un = null), hu.forEach(qm), vu.forEach(qm);
  }
  function Qi(t, e) {
    t.blockedOn === e && (t.blockedOn = null, vo || (vo = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      t0
    )));
  }
  var Zi = null;
  function Ym(t) {
    Zi !== t && (Zi = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        Zi === t && (Zi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (ho(n || l) === null)
              continue;
            break;
          }
          var u = qn(l);
          u !== null && (t.splice(e, 3), e -= 3, ds(
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
      return Qi(v, t);
    }
    nn !== null && Qi(nn, t), an !== null && Qi(an, t), un !== null && Qi(un, t), hu.forEach(e), vu.forEach(e);
    for (var l = 0; l < cn.length; l++) {
      var n = cn[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < cn.length && (l = cn[0], l.blockedOn === null); )
      Bm(l), l.blockedOn === null && cn.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], s = a[be] || null;
        if (typeof u == "function")
          s || Ym(l);
        else if (s) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, s = u[be] || null)
              f = s.formAction;
            else if (ho(a) !== null) continue;
          } else f = s.action;
          typeof f == "function" ? l[n + 1] = f : (l.splice(n, 3), n -= 3), Ym(l);
        }
      }
  }
  function Lm() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
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
  function go(t) {
    this._internalRoot = t;
  }
  Vi.prototype.render = go.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var l = e.current, n = Ue();
    Cm(l, n, t, e, null, null);
  }, Vi.prototype.unmount = go.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Cm(t.current, 2, null, t, null, null), Ti(), e[Hn] = null;
    }
  };
  function Vi(t) {
    this._internalRoot = t;
  }
  Vi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = tl();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < cn.length && e !== 0 && e < cn[l].priority; l++) ;
      cn.splice(l, 0, t), l === 0 && Bm(t);
    }
  };
  var Xm = c.version;
  if (Xm !== "19.2.7")
    throw Error(
      r(
        527,
        Xm,
        "19.2.7"
      )
    );
  B.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = h(e), t = t !== null ? M(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var e0 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ki = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ki.isDisabled && Ki.supportsFiber)
      try {
        vn = Ki.inject(
          e0
        ), me = Ki;
      } catch {
      }
  }
  return pu.createRoot = function(t, e) {
    if (!m(t)) throw Error(r(299));
    var l = !1, n = "", a = kf, u = $f, s = Wf;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError)), e = Mm(
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
      s,
      Lm
    ), t[Hn] = e.current, Ws(t), new go(e);
  }, pu.hydrateRoot = function(t, e, l) {
    if (!m(t)) throw Error(r(299));
    var n = !1, a = "", u = kf, s = $f, f = Wf, v = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (s = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), e = Mm(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      v,
      u,
      s,
      f,
      Lm
    ), e.context = Om(null), l = e.current, n = Ue(), n = gl(n), a = Vl(n), a.callback = null, Kl(l, a, n), l = n, e.current.lanes = l, qe(e, l), dl(e), t[Hn] = e.current, Ws(t), new Vi(e);
  }, pu.version = "19.2.7", pu;
}
var Fm;
function m0() {
  if (Fm) return po.exports;
  Fm = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (c) {
        console.error(c);
      }
  }
  return i(), po.exports = d0(), po.exports;
}
var h0 = m0(), D = Bo();
const Ae = /* @__PURE__ */ u0(D);
var bu = vh();
function v0() {
  for (var i = arguments.length, c = new Array(i), o = 0; o < i; o++)
    c[o] = arguments[o];
  return D.useMemo(
    () => (r) => {
      c.forEach((m) => m(r));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    c
  );
}
const ec = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function za(i) {
  const c = Object.prototype.toString.call(i);
  return c === "[object Window]" || // In Electron context the Window object serializes to [object global]
  c === "[object global]";
}
function qo(i) {
  return "nodeType" in i;
}
function De(i) {
  var c, o;
  return i ? za(i) ? i : qo(i) && (c = (o = i.ownerDocument) == null ? void 0 : o.defaultView) != null ? c : window : window;
}
function Yo(i) {
  const {
    Document: c
  } = De(i);
  return i instanceof c;
}
function Au(i) {
  return za(i) ? !1 : i instanceof De(i).HTMLElement;
}
function gh(i) {
  return i instanceof De(i).SVGElement;
}
function _a(i) {
  return i ? za(i) ? i.document : qo(i) ? Yo(i) ? i : Au(i) || gh(i) ? i.ownerDocument : document : document : document;
}
const ml = ec ? D.useLayoutEffect : D.useEffect;
function Lo(i) {
  const c = D.useRef(i);
  return ml(() => {
    c.current = i;
  }), D.useCallback(function() {
    for (var o = arguments.length, r = new Array(o), m = 0; m < o; m++)
      r[m] = arguments[m];
    return c.current == null ? void 0 : c.current(...r);
  }, []);
}
function g0() {
  const i = D.useRef(null), c = D.useCallback((r, m) => {
    i.current = setInterval(r, m);
  }, []), o = D.useCallback(() => {
    i.current !== null && (clearInterval(i.current), i.current = null);
  }, []);
  return [c, o];
}
function zu(i, c) {
  c === void 0 && (c = [i]);
  const o = D.useRef(i);
  return ml(() => {
    o.current !== i && (o.current = i);
  }, c), o;
}
function Du(i, c) {
  const o = D.useRef();
  return D.useMemo(
    () => {
      const r = i(o.current);
      return o.current = r, r;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...c]
  );
}
function Wi(i) {
  const c = Lo(i), o = D.useRef(null), r = D.useCallback(
    (m) => {
      m !== o.current && c?.(m, o.current), o.current = m;
    },
    //eslint-disable-next-line
    []
  );
  return [o, r];
}
function Co(i) {
  const c = D.useRef();
  return D.useEffect(() => {
    c.current = i;
  }, [i]), c.current;
}
let zo = {};
function Nu(i, c) {
  return D.useMemo(() => {
    if (c)
      return c;
    const o = zo[i] == null ? 0 : zo[i] + 1;
    return zo[i] = o, i + "-" + o;
  }, [i, c]);
}
function yh(i) {
  return function(c) {
    for (var o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), m = 1; m < o; m++)
      r[m - 1] = arguments[m];
    return r.reduce((d, g) => {
      const x = Object.entries(g);
      for (const [p, h] of x) {
        const M = d[p];
        M != null && (d[p] = M + i * h);
      }
      return d;
    }, {
      ...c
    });
  };
}
const xa = /* @__PURE__ */ yh(1), Fi = /* @__PURE__ */ yh(-1);
function y0(i) {
  return "clientX" in i && "clientY" in i;
}
function Xo(i) {
  if (!i)
    return !1;
  const {
    KeyboardEvent: c
  } = De(i.target);
  return c && i instanceof c;
}
function p0(i) {
  if (!i)
    return !1;
  const {
    TouchEvent: c
  } = De(i.target);
  return c && i instanceof c;
}
function Ro(i) {
  if (p0(i)) {
    if (i.touches && i.touches.length) {
      const {
        clientX: c,
        clientY: o
      } = i.touches[0];
      return {
        x: c,
        y: o
      };
    } else if (i.changedTouches && i.changedTouches.length) {
      const {
        clientX: c,
        clientY: o
      } = i.changedTouches[0];
      return {
        x: c,
        y: o
      };
    }
  }
  return y0(i) ? {
    x: i.clientX,
    y: i.clientY
  } : null;
}
const _u = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(i) {
      if (!i)
        return;
      const {
        x: c,
        y: o
      } = i;
      return "translate3d(" + (c ? Math.round(c) : 0) + "px, " + (o ? Math.round(o) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(i) {
      if (!i)
        return;
      const {
        scaleX: c,
        scaleY: o
      } = i;
      return "scaleX(" + c + ") scaleY(" + o + ")";
    }
  },
  Transform: {
    toString(i) {
      if (i)
        return [_u.Translate.toString(i), _u.Scale.toString(i)].join(" ");
    }
  },
  Transition: {
    toString(i) {
      let {
        property: c,
        duration: o,
        easing: r
      } = i;
      return c + " " + o + "ms " + r;
    }
  }
}), Im = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function b0(i) {
  return i.matches(Im) ? i : i.querySelector(Im);
}
const S0 = {
  display: "none"
};
function x0(i) {
  let {
    id: c,
    value: o
  } = i;
  return Ae.createElement("div", {
    id: c,
    style: S0
  }, o);
}
function E0(i) {
  let {
    id: c,
    announcement: o,
    ariaLiveType: r = "assertive"
  } = i;
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
  }, o);
}
function z0() {
  const [i, c] = D.useState("");
  return {
    announce: D.useCallback((r) => {
      r != null && c(r);
    }, []),
    announcement: i
  };
}
const ph = /* @__PURE__ */ D.createContext(null);
function _0(i) {
  const c = D.useContext(ph);
  D.useEffect(() => {
    if (!c)
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    return c(i);
  }, [i, c]);
}
function T0() {
  const [i] = D.useState(() => /* @__PURE__ */ new Set()), c = D.useCallback((r) => (i.add(r), () => i.delete(r)), [i]);
  return [D.useCallback((r) => {
    let {
      type: m,
      event: d
    } = r;
    i.forEach((g) => {
      var x;
      return (x = g[m]) == null ? void 0 : x.call(g, d);
    });
  }, [i]), c];
}
const A0 = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}, D0 = {
  onDragStart(i) {
    let {
      active: c
    } = i;
    return "Picked up draggable item " + c.id + ".";
  },
  onDragOver(i) {
    let {
      active: c,
      over: o
    } = i;
    return o ? "Draggable item " + c.id + " was moved over droppable area " + o.id + "." : "Draggable item " + c.id + " is no longer over a droppable area.";
  },
  onDragEnd(i) {
    let {
      active: c,
      over: o
    } = i;
    return o ? "Draggable item " + c.id + " was dropped over droppable area " + o.id : "Draggable item " + c.id + " was dropped.";
  },
  onDragCancel(i) {
    let {
      active: c
    } = i;
    return "Dragging was cancelled. Draggable item " + c.id + " was dropped.";
  }
};
function N0(i) {
  let {
    announcements: c = D0,
    container: o,
    hiddenTextDescribedById: r,
    screenReaderInstructions: m = A0
  } = i;
  const {
    announce: d,
    announcement: g
  } = z0(), x = Nu("DndLiveRegion"), [p, h] = D.useState(!1);
  if (D.useEffect(() => {
    h(!0);
  }, []), _0(D.useMemo(() => ({
    onDragStart(A) {
      let {
        active: U
      } = A;
      d(c.onDragStart({
        active: U
      }));
    },
    onDragMove(A) {
      let {
        active: U,
        over: H
      } = A;
      c.onDragMove && d(c.onDragMove({
        active: U,
        over: H
      }));
    },
    onDragOver(A) {
      let {
        active: U,
        over: H
      } = A;
      d(c.onDragOver({
        active: U,
        over: H
      }));
    },
    onDragEnd(A) {
      let {
        active: U,
        over: H
      } = A;
      d(c.onDragEnd({
        active: U,
        over: H
      }));
    },
    onDragCancel(A) {
      let {
        active: U,
        over: H
      } = A;
      d(c.onDragCancel({
        active: U,
        over: H
      }));
    }
  }), [d, c])), !p)
    return null;
  const M = Ae.createElement(Ae.Fragment, null, Ae.createElement(x0, {
    id: r,
    value: m.draggable
  }), Ae.createElement(E0, {
    id: x,
    announcement: g
  }));
  return o ? bu.createPortal(M, o) : M;
}
var Wt;
(function(i) {
  i.DragStart = "dragStart", i.DragMove = "dragMove", i.DragEnd = "dragEnd", i.DragCancel = "dragCancel", i.DragOver = "dragOver", i.RegisterDroppable = "registerDroppable", i.SetDroppableDisabled = "setDroppableDisabled", i.UnregisterDroppable = "unregisterDroppable";
})(Wt || (Wt = {}));
function Ii() {
}
function M0(i, c) {
  return D.useMemo(
    () => ({
      sensor: i,
      options: c ?? {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i, c]
  );
}
function O0() {
  for (var i = arguments.length, c = new Array(i), o = 0; o < i; o++)
    c[o] = arguments[o];
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
function C0(i, c) {
  return Math.sqrt(Math.pow(i.x - c.x, 2) + Math.pow(i.y - c.y, 2));
}
function R0(i, c) {
  let {
    data: {
      value: o
    }
  } = i, {
    data: {
      value: r
    }
  } = c;
  return o - r;
}
function j0(i, c) {
  let {
    data: {
      value: o
    }
  } = i, {
    data: {
      value: r
    }
  } = c;
  return r - o;
}
function w0(i, c) {
  if (!i || i.length === 0)
    return null;
  const [o] = i;
  return o[c];
}
function Pm(i, c, o) {
  return c === void 0 && (c = i.left), o === void 0 && (o = i.top), {
    x: c + i.width * 0.5,
    y: o + i.height * 0.5
  };
}
const U0 = (i) => {
  let {
    collisionRect: c,
    droppableRects: o,
    droppableContainers: r
  } = i;
  const m = Pm(c, c.left, c.top), d = [];
  for (const g of r) {
    const {
      id: x
    } = g, p = o.get(x);
    if (p) {
      const h = C0(Pm(p), m);
      d.push({
        id: x,
        data: {
          droppableContainer: g,
          value: h
        }
      });
    }
  }
  return d.sort(R0);
};
function H0(i, c) {
  const o = Math.max(c.top, i.top), r = Math.max(c.left, i.left), m = Math.min(c.left + c.width, i.left + i.width), d = Math.min(c.top + c.height, i.top + i.height), g = m - r, x = d - o;
  if (r < m && o < d) {
    const p = c.width * c.height, h = i.width * i.height, M = g * x, A = M / (p + h - M);
    return Number(A.toFixed(4));
  }
  return 0;
}
const B0 = (i) => {
  let {
    collisionRect: c,
    droppableRects: o,
    droppableContainers: r
  } = i;
  const m = [];
  for (const d of r) {
    const {
      id: g
    } = d, x = o.get(g);
    if (x) {
      const p = H0(x, c);
      p > 0 && m.push({
        id: g,
        data: {
          droppableContainer: d,
          value: p
        }
      });
    }
  }
  return m.sort(j0);
};
function q0(i, c, o) {
  return {
    ...i,
    scaleX: c && o ? c.width / o.width : 1,
    scaleY: c && o ? c.height / o.height : 1
  };
}
function bh(i, c) {
  return i && c ? {
    x: i.left - c.left,
    y: i.top - c.top
  } : al;
}
function Y0(i) {
  return function(o) {
    for (var r = arguments.length, m = new Array(r > 1 ? r - 1 : 0), d = 1; d < r; d++)
      m[d - 1] = arguments[d];
    return m.reduce((g, x) => ({
      ...g,
      top: g.top + i * x.y,
      bottom: g.bottom + i * x.y,
      left: g.left + i * x.x,
      right: g.right + i * x.x
    }), {
      ...o
    });
  };
}
const L0 = /* @__PURE__ */ Y0(1);
function X0(i) {
  if (i.startsWith("matrix3d(")) {
    const c = i.slice(9, -1).split(/, /);
    return {
      x: +c[12],
      y: +c[13],
      scaleX: +c[0],
      scaleY: +c[5]
    };
  } else if (i.startsWith("matrix(")) {
    const c = i.slice(7, -1).split(/, /);
    return {
      x: +c[4],
      y: +c[5],
      scaleX: +c[0],
      scaleY: +c[3]
    };
  }
  return null;
}
function G0(i, c, o) {
  const r = X0(c);
  if (!r)
    return i;
  const {
    scaleX: m,
    scaleY: d,
    x: g,
    y: x
  } = r, p = i.left - g - (1 - m) * parseFloat(o), h = i.top - x - (1 - d) * parseFloat(o.slice(o.indexOf(" ") + 1)), M = m ? i.width / m : i.width, A = d ? i.height / d : i.height;
  return {
    width: M,
    height: A,
    top: h,
    right: p + M,
    bottom: h + A,
    left: p
  };
}
const Q0 = {
  ignoreTransform: !1
};
function Ta(i, c) {
  c === void 0 && (c = Q0);
  let o = i.getBoundingClientRect();
  if (c.ignoreTransform) {
    const {
      transform: h,
      transformOrigin: M
    } = De(i).getComputedStyle(i);
    h && (o = G0(o, h, M));
  }
  const {
    top: r,
    left: m,
    width: d,
    height: g,
    bottom: x,
    right: p
  } = o;
  return {
    top: r,
    left: m,
    width: d,
    height: g,
    bottom: x,
    right: p
  };
}
function th(i) {
  return Ta(i, {
    ignoreTransform: !0
  });
}
function Z0(i) {
  const c = i.innerWidth, o = i.innerHeight;
  return {
    top: 0,
    left: 0,
    right: c,
    bottom: o,
    width: c,
    height: o
  };
}
function V0(i, c) {
  return c === void 0 && (c = De(i).getComputedStyle(i)), c.position === "fixed";
}
function K0(i, c) {
  c === void 0 && (c = De(i).getComputedStyle(i));
  const o = /(auto|scroll|overlay)/;
  return ["overflow", "overflowX", "overflowY"].some((m) => {
    const d = c[m];
    return typeof d == "string" ? o.test(d) : !1;
  });
}
function Go(i, c) {
  const o = [];
  function r(m) {
    if (c != null && o.length >= c || !m)
      return o;
    if (Yo(m) && m.scrollingElement != null && !o.includes(m.scrollingElement))
      return o.push(m.scrollingElement), o;
    if (!Au(m) || gh(m) || o.includes(m))
      return o;
    const d = De(i).getComputedStyle(m);
    return m !== i && K0(m, d) && o.push(m), V0(m, d) ? o : r(m.parentNode);
  }
  return i ? r(i) : o;
}
function Sh(i) {
  const [c] = Go(i, 1);
  return c ?? null;
}
function _o(i) {
  return !ec || !i ? null : za(i) ? i : qo(i) ? Yo(i) || i === _a(i).scrollingElement ? window : Au(i) ? i : null : null;
}
function xh(i) {
  return za(i) ? i.scrollX : i.scrollLeft;
}
function Eh(i) {
  return za(i) ? i.scrollY : i.scrollTop;
}
function jo(i) {
  return {
    x: xh(i),
    y: Eh(i)
  };
}
var te;
(function(i) {
  i[i.Forward = 1] = "Forward", i[i.Backward = -1] = "Backward";
})(te || (te = {}));
function zh(i) {
  return !ec || !i ? !1 : i === document.scrollingElement;
}
function _h(i) {
  const c = {
    x: 0,
    y: 0
  }, o = zh(i) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: i.clientHeight,
    width: i.clientWidth
  }, r = {
    x: i.scrollWidth - o.width,
    y: i.scrollHeight - o.height
  }, m = i.scrollTop <= c.y, d = i.scrollLeft <= c.x, g = i.scrollTop >= r.y, x = i.scrollLeft >= r.x;
  return {
    isTop: m,
    isLeft: d,
    isBottom: g,
    isRight: x,
    maxScroll: r,
    minScroll: c
  };
}
const J0 = {
  x: 0.2,
  y: 0.2
};
function k0(i, c, o, r, m) {
  let {
    top: d,
    left: g,
    right: x,
    bottom: p
  } = o;
  r === void 0 && (r = 10), m === void 0 && (m = J0);
  const {
    isTop: h,
    isBottom: M,
    isLeft: A,
    isRight: U
  } = _h(i), H = {
    x: 0,
    y: 0
  }, V = {
    x: 0,
    y: 0
  }, Y = {
    height: c.height * m.y,
    width: c.width * m.x
  };
  return !h && d <= c.top + Y.height ? (H.y = te.Backward, V.y = r * Math.abs((c.top + Y.height - d) / Y.height)) : !M && p >= c.bottom - Y.height && (H.y = te.Forward, V.y = r * Math.abs((c.bottom - Y.height - p) / Y.height)), !U && x >= c.right - Y.width ? (H.x = te.Forward, V.x = r * Math.abs((c.right - Y.width - x) / Y.width)) : !A && g <= c.left + Y.width && (H.x = te.Backward, V.x = r * Math.abs((c.left + Y.width - g) / Y.width)), {
    direction: H,
    speed: V
  };
}
function $0(i) {
  if (i === document.scrollingElement) {
    const {
      innerWidth: d,
      innerHeight: g
    } = window;
    return {
      top: 0,
      left: 0,
      right: d,
      bottom: g,
      width: d,
      height: g
    };
  }
  const {
    top: c,
    left: o,
    right: r,
    bottom: m
  } = i.getBoundingClientRect();
  return {
    top: c,
    left: o,
    right: r,
    bottom: m,
    width: i.clientWidth,
    height: i.clientHeight
  };
}
function Th(i) {
  return i.reduce((c, o) => xa(c, jo(o)), al);
}
function W0(i) {
  return i.reduce((c, o) => c + xh(o), 0);
}
function F0(i) {
  return i.reduce((c, o) => c + Eh(o), 0);
}
function I0(i, c) {
  if (c === void 0 && (c = Ta), !i)
    return;
  const {
    top: o,
    left: r,
    bottom: m,
    right: d
  } = c(i);
  Sh(i) && (m <= 0 || d <= 0 || o >= window.innerHeight || r >= window.innerWidth) && i.scrollIntoView({
    block: "center",
    inline: "center"
  });
}
const P0 = [["x", ["left", "right"], W0], ["y", ["top", "bottom"], F0]];
class Qo {
  constructor(c, o) {
    this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
    const r = Go(o), m = Th(r);
    this.rect = {
      ...c
    }, this.width = c.width, this.height = c.height;
    for (const [d, g, x] of P0)
      for (const p of g)
        Object.defineProperty(this, p, {
          get: () => {
            const h = x(r), M = m[d] - h;
            return this.rect[p] + M;
          },
          enumerable: !0
        });
    Object.defineProperty(this, "rect", {
      enumerable: !1
    });
  }
}
class Su {
  constructor(c) {
    this.target = void 0, this.listeners = [], this.removeAll = () => {
      this.listeners.forEach((o) => {
        var r;
        return (r = this.target) == null ? void 0 : r.removeEventListener(...o);
      });
    }, this.target = c;
  }
  add(c, o, r) {
    var m;
    (m = this.target) == null || m.addEventListener(c, o, r), this.listeners.push([c, o, r]);
  }
}
function ty(i) {
  const {
    EventTarget: c
  } = De(i);
  return i instanceof c ? i : _a(i);
}
function To(i, c) {
  const o = Math.abs(i.x), r = Math.abs(i.y);
  return typeof c == "number" ? Math.sqrt(o ** 2 + r ** 2) > c : "x" in c && "y" in c ? o > c.x && r > c.y : "x" in c ? o > c.x : "y" in c ? r > c.y : !1;
}
var Fe;
(function(i) {
  i.Click = "click", i.DragStart = "dragstart", i.Keydown = "keydown", i.ContextMenu = "contextmenu", i.Resize = "resize", i.SelectionChange = "selectionchange", i.VisibilityChange = "visibilitychange";
})(Fe || (Fe = {}));
function eh(i) {
  i.preventDefault();
}
function ey(i) {
  i.stopPropagation();
}
var Et;
(function(i) {
  i.Space = "Space", i.Down = "ArrowDown", i.Right = "ArrowRight", i.Left = "ArrowLeft", i.Up = "ArrowUp", i.Esc = "Escape", i.Enter = "Enter", i.Tab = "Tab";
})(Et || (Et = {}));
const Ah = {
  start: [Et.Space, Et.Enter],
  cancel: [Et.Esc],
  end: [Et.Space, Et.Enter, Et.Tab]
}, ly = (i, c) => {
  let {
    currentCoordinates: o
  } = c;
  switch (i.code) {
    case Et.Right:
      return {
        ...o,
        x: o.x + 25
      };
    case Et.Left:
      return {
        ...o,
        x: o.x - 25
      };
    case Et.Down:
      return {
        ...o,
        y: o.y + 25
      };
    case Et.Up:
      return {
        ...o,
        y: o.y - 25
      };
  }
};
class Dh {
  constructor(c) {
    this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = c;
    const {
      event: {
        target: o
      }
    } = c;
    this.props = c, this.listeners = new Su(_a(o)), this.windowListeners = new Su(De(o)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach();
  }
  attach() {
    this.handleStart(), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(Fe.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode: c,
      onStart: o
    } = this.props, r = c.node.current;
    r && I0(r), o(al);
  }
  handleKeyDown(c) {
    if (Xo(c)) {
      const {
        active: o,
        context: r,
        options: m
      } = this.props, {
        keyboardCodes: d = Ah,
        coordinateGetter: g = ly,
        scrollBehavior: x = "smooth"
      } = m, {
        code: p
      } = c;
      if (d.end.includes(p)) {
        this.handleEnd(c);
        return;
      }
      if (d.cancel.includes(p)) {
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
      const A = g(c, {
        active: o,
        context: r.current,
        currentCoordinates: M
      });
      if (A) {
        const U = Fi(A, M), H = {
          x: 0,
          y: 0
        }, {
          scrollableAncestors: V
        } = r.current;
        for (const Y of V) {
          const Z = c.code, {
            isTop: W,
            isRight: lt,
            isLeft: k,
            isBottom: nt,
            maxScroll: it,
            minScroll: et
          } = _h(Y), X = $0(Y), I = {
            x: Math.min(Z === Et.Right ? X.right - X.width / 2 : X.right, Math.max(Z === Et.Right ? X.left : X.left + X.width / 2, A.x)),
            y: Math.min(Z === Et.Down ? X.bottom - X.height / 2 : X.bottom, Math.max(Z === Et.Down ? X.top : X.top + X.height / 2, A.y))
          }, bt = Z === Et.Right && !lt || Z === Et.Left && !k, Ot = Z === Et.Down && !nt || Z === Et.Up && !W;
          if (bt && I.x !== A.x) {
            const dt = Y.scrollLeft + U.x, Mt = Z === Et.Right && dt <= it.x || Z === Et.Left && dt >= et.x;
            if (Mt && !U.y) {
              Y.scrollTo({
                left: dt,
                behavior: x
              });
              return;
            }
            Mt ? H.x = Y.scrollLeft - dt : H.x = Z === Et.Right ? Y.scrollLeft - it.x : Y.scrollLeft - et.x, H.x && Y.scrollBy({
              left: -H.x,
              behavior: x
            });
            break;
          } else if (Ot && I.y !== A.y) {
            const dt = Y.scrollTop + U.y, Mt = Z === Et.Down && dt <= it.y || Z === Et.Up && dt >= et.y;
            if (Mt && !U.x) {
              Y.scrollTo({
                top: dt,
                behavior: x
              });
              return;
            }
            Mt ? H.y = Y.scrollTop - dt : H.y = Z === Et.Down ? Y.scrollTop - it.y : Y.scrollTop - et.y, H.y && Y.scrollBy({
              top: -H.y,
              behavior: x
            });
            break;
          }
        }
        this.handleMove(c, xa(Fi(A, this.referenceCoordinates), H));
      }
    }
  }
  handleMove(c, o) {
    const {
      onMove: r
    } = this.props;
    c.preventDefault(), r(o);
  }
  handleEnd(c) {
    const {
      onEnd: o
    } = this.props;
    c.preventDefault(), this.detach(), o();
  }
  handleCancel(c) {
    const {
      onCancel: o
    } = this.props;
    c.preventDefault(), this.detach(), o();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll();
  }
}
Dh.activators = [{
  eventName: "onKeyDown",
  handler: (i, c, o) => {
    let {
      keyboardCodes: r = Ah,
      onActivation: m
    } = c, {
      active: d
    } = o;
    const {
      code: g
    } = i.nativeEvent;
    if (r.start.includes(g)) {
      const x = d.activatorNode.current;
      return x && i.target !== x ? !1 : (i.preventDefault(), m?.({
        event: i.nativeEvent
      }), !0);
    }
    return !1;
  }
}];
function lh(i) {
  return !!(i && "distance" in i);
}
function nh(i) {
  return !!(i && "delay" in i);
}
class Zo {
  constructor(c, o, r) {
    var m;
    r === void 0 && (r = ty(c.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = c, this.events = o;
    const {
      event: d
    } = c, {
      target: g
    } = d;
    this.props = c, this.events = o, this.document = _a(g), this.documentListeners = new Su(this.document), this.listeners = new Su(r), this.windowListeners = new Su(De(g)), this.initialCoordinates = (m = Ro(d)) != null ? m : al, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach();
  }
  attach() {
    const {
      events: c,
      props: {
        options: {
          activationConstraint: o,
          bypassActivationConstraint: r
        }
      }
    } = this;
    if (this.listeners.add(c.move.name, this.handleMove, {
      passive: !1
    }), this.listeners.add(c.end.name, this.handleEnd), c.cancel && this.listeners.add(c.cancel.name, this.handleCancel), this.windowListeners.add(Fe.Resize, this.handleCancel), this.windowListeners.add(Fe.DragStart, eh), this.windowListeners.add(Fe.VisibilityChange, this.handleCancel), this.windowListeners.add(Fe.ContextMenu, eh), this.documentListeners.add(Fe.Keydown, this.handleKeydown), o) {
      if (r != null && r({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      }))
        return this.handleStart();
      if (nh(o)) {
        this.timeoutId = setTimeout(this.handleStart, o.delay), this.handlePending(o);
        return;
      }
      if (lh(o)) {
        this.handlePending(o);
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
  handlePending(c, o) {
    const {
      active: r,
      onPending: m
    } = this.props;
    m(r, c, this.initialCoordinates, o);
  }
  handleStart() {
    const {
      initialCoordinates: c
    } = this, {
      onStart: o
    } = this.props;
    c && (this.activated = !0, this.documentListeners.add(Fe.Click, ey, {
      capture: !0
    }), this.removeTextSelection(), this.documentListeners.add(Fe.SelectionChange, this.removeTextSelection), o(c));
  }
  handleMove(c) {
    var o;
    const {
      activated: r,
      initialCoordinates: m,
      props: d
    } = this, {
      onMove: g,
      options: {
        activationConstraint: x
      }
    } = d;
    if (!m)
      return;
    const p = (o = Ro(c)) != null ? o : al, h = Fi(m, p);
    if (!r && x) {
      if (lh(x)) {
        if (x.tolerance != null && To(h, x.tolerance))
          return this.handleCancel();
        if (To(h, x.distance))
          return this.handleStart();
      }
      if (nh(x) && To(h, x.tolerance))
        return this.handleCancel();
      this.handlePending(x, h);
      return;
    }
    c.cancelable && c.preventDefault(), g(p);
  }
  handleEnd() {
    const {
      onAbort: c,
      onEnd: o
    } = this.props;
    this.detach(), this.activated || c(this.props.active), o();
  }
  handleCancel() {
    const {
      onAbort: c,
      onCancel: o
    } = this.props;
    this.detach(), this.activated || c(this.props.active), o();
  }
  handleKeydown(c) {
    c.code === Et.Esc && this.handleCancel();
  }
  removeTextSelection() {
    var c;
    (c = this.document.getSelection()) == null || c.removeAllRanges();
  }
}
const ny = {
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
class Vo extends Zo {
  constructor(c) {
    const {
      event: o
    } = c, r = _a(o.target);
    super(c, ny, r);
  }
}
Vo.activators = [{
  eventName: "onPointerDown",
  handler: (i, c) => {
    let {
      nativeEvent: o
    } = i, {
      onActivation: r
    } = c;
    return !o.isPrimary || o.button !== 0 ? !1 : (r?.({
      event: o
    }), !0);
  }
}];
const ay = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var wo;
(function(i) {
  i[i.RightClick = 2] = "RightClick";
})(wo || (wo = {}));
class uy extends Zo {
  constructor(c) {
    super(c, ay, _a(c.event.target));
  }
}
uy.activators = [{
  eventName: "onMouseDown",
  handler: (i, c) => {
    let {
      nativeEvent: o
    } = i, {
      onActivation: r
    } = c;
    return o.button === wo.RightClick ? !1 : (r?.({
      event: o
    }), !0);
  }
}];
const Ao = {
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
class iy extends Zo {
  constructor(c) {
    super(c, Ao);
  }
  static setup() {
    return window.addEventListener(Ao.move.name, c, {
      capture: !1,
      passive: !1
    }), function() {
      window.removeEventListener(Ao.move.name, c);
    };
    function c() {
    }
  }
}
iy.activators = [{
  eventName: "onTouchStart",
  handler: (i, c) => {
    let {
      nativeEvent: o
    } = i, {
      onActivation: r
    } = c;
    const {
      touches: m
    } = o;
    return m.length > 1 ? !1 : (r?.({
      event: o
    }), !0);
  }
}];
var xu;
(function(i) {
  i[i.Pointer = 0] = "Pointer", i[i.DraggableRect = 1] = "DraggableRect";
})(xu || (xu = {}));
var Pi;
(function(i) {
  i[i.TreeOrder = 0] = "TreeOrder", i[i.ReversedTreeOrder = 1] = "ReversedTreeOrder";
})(Pi || (Pi = {}));
function cy(i) {
  let {
    acceleration: c,
    activator: o = xu.Pointer,
    canScroll: r,
    draggingRect: m,
    enabled: d,
    interval: g = 5,
    order: x = Pi.TreeOrder,
    pointerCoordinates: p,
    scrollableAncestors: h,
    scrollableAncestorRects: M,
    delta: A,
    threshold: U
  } = i;
  const H = oy({
    delta: A,
    disabled: !d
  }), [V, Y] = g0(), Z = D.useRef({
    x: 0,
    y: 0
  }), W = D.useRef({
    x: 0,
    y: 0
  }), lt = D.useMemo(() => {
    switch (o) {
      case xu.Pointer:
        return p ? {
          top: p.y,
          bottom: p.y,
          left: p.x,
          right: p.x
        } : null;
      case xu.DraggableRect:
        return m;
    }
  }, [o, m, p]), k = D.useRef(null), nt = D.useCallback(() => {
    const et = k.current;
    if (!et)
      return;
    const X = Z.current.x * W.current.x, I = Z.current.y * W.current.y;
    et.scrollBy(X, I);
  }, []), it = D.useMemo(() => x === Pi.TreeOrder ? [...h].reverse() : h, [x, h]);
  D.useEffect(
    () => {
      if (!d || !h.length || !lt) {
        Y();
        return;
      }
      for (const et of it) {
        if (r?.(et) === !1)
          continue;
        const X = h.indexOf(et), I = M[X];
        if (!I)
          continue;
        const {
          direction: bt,
          speed: Ot
        } = k0(et, I, lt, c, U);
        for (const dt of ["x", "y"])
          H[dt][bt[dt]] || (Ot[dt] = 0, bt[dt] = 0);
        if (Ot.x > 0 || Ot.y > 0) {
          Y(), k.current = et, V(nt, g), Z.current = Ot, W.current = bt;
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
      c,
      nt,
      r,
      Y,
      d,
      g,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(lt),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(H),
      V,
      h,
      it,
      M,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(U)
    ]
  );
}
const sy = {
  x: {
    [te.Backward]: !1,
    [te.Forward]: !1
  },
  y: {
    [te.Backward]: !1,
    [te.Forward]: !1
  }
};
function oy(i) {
  let {
    delta: c,
    disabled: o
  } = i;
  const r = Co(c);
  return Du((m) => {
    if (o || !r || !m)
      return sy;
    const d = {
      x: Math.sign(c.x - r.x),
      y: Math.sign(c.y - r.y)
    };
    return {
      x: {
        [te.Backward]: m.x[te.Backward] || d.x === -1,
        [te.Forward]: m.x[te.Forward] || d.x === 1
      },
      y: {
        [te.Backward]: m.y[te.Backward] || d.y === -1,
        [te.Forward]: m.y[te.Forward] || d.y === 1
      }
    };
  }, [o, c, r]);
}
function ry(i, c) {
  const o = c != null ? i.get(c) : void 0, r = o ? o.node.current : null;
  return Du((m) => {
    var d;
    return c == null ? null : (d = r ?? m) != null ? d : null;
  }, [r, c]);
}
function fy(i, c) {
  return D.useMemo(() => i.reduce((o, r) => {
    const {
      sensor: m
    } = r, d = m.activators.map((g) => ({
      eventName: g.eventName,
      handler: c(g.handler, r)
    }));
    return [...o, ...d];
  }, []), [i, c]);
}
var Tu;
(function(i) {
  i[i.Always = 0] = "Always", i[i.BeforeDragging = 1] = "BeforeDragging", i[i.WhileDragging = 2] = "WhileDragging";
})(Tu || (Tu = {}));
var Uo;
(function(i) {
  i.Optimized = "optimized";
})(Uo || (Uo = {}));
const ah = /* @__PURE__ */ new Map();
function dy(i, c) {
  let {
    dragging: o,
    dependencies: r,
    config: m
  } = c;
  const [d, g] = D.useState(null), {
    frequency: x,
    measure: p,
    strategy: h
  } = m, M = D.useRef(i), A = Z(), U = zu(A), H = D.useCallback(function(W) {
    W === void 0 && (W = []), !U.current && g((lt) => lt === null ? W : lt.concat(W.filter((k) => !lt.includes(k))));
  }, [U]), V = D.useRef(null), Y = Du((W) => {
    if (A && !o)
      return ah;
    if (!W || W === ah || M.current !== i || d != null) {
      const lt = /* @__PURE__ */ new Map();
      for (let k of i) {
        if (!k)
          continue;
        if (d && d.length > 0 && !d.includes(k.id) && k.rect.current) {
          lt.set(k.id, k.rect.current);
          continue;
        }
        const nt = k.node.current, it = nt ? new Qo(p(nt), nt) : null;
        k.rect.current = it, it && lt.set(k.id, it);
      }
      return lt;
    }
    return W;
  }, [i, d, o, A, p]);
  return D.useEffect(() => {
    M.current = i;
  }, [i]), D.useEffect(
    () => {
      A || H();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o, A]
  ), D.useEffect(
    () => {
      d && d.length > 0 && g(null);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(d)]
  ), D.useEffect(
    () => {
      A || typeof x != "number" || V.current !== null || (V.current = setTimeout(() => {
        H(), V.current = null;
      }, x));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x, A, H, ...r]
  ), {
    droppableRects: Y,
    measureDroppableContainers: H,
    measuringScheduled: d != null
  };
  function Z() {
    switch (h) {
      case Tu.Always:
        return !1;
      case Tu.BeforeDragging:
        return o;
      default:
        return !o;
    }
  }
}
function Nh(i, c) {
  return Du((o) => i ? o || (typeof c == "function" ? c(i) : i) : null, [c, i]);
}
function my(i, c) {
  return Nh(i, c);
}
function hy(i) {
  let {
    callback: c,
    disabled: o
  } = i;
  const r = Lo(c), m = D.useMemo(() => {
    if (o || typeof window > "u" || typeof window.MutationObserver > "u")
      return;
    const {
      MutationObserver: d
    } = window;
    return new d(r);
  }, [r, o]);
  return D.useEffect(() => () => m?.disconnect(), [m]), m;
}
function lc(i) {
  let {
    callback: c,
    disabled: o
  } = i;
  const r = Lo(c), m = D.useMemo(
    () => {
      if (o || typeof window > "u" || typeof window.ResizeObserver > "u")
        return;
      const {
        ResizeObserver: d
      } = window;
      return new d(r);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [o]
  );
  return D.useEffect(() => () => m?.disconnect(), [m]), m;
}
function vy(i) {
  return new Qo(Ta(i), i);
}
function uh(i, c, o) {
  c === void 0 && (c = vy);
  const [r, m] = D.useState(null);
  function d() {
    m((p) => {
      if (!i)
        return null;
      if (i.isConnected === !1) {
        var h;
        return (h = p ?? o) != null ? h : null;
      }
      const M = c(i);
      return JSON.stringify(p) === JSON.stringify(M) ? p : M;
    });
  }
  const g = hy({
    callback(p) {
      if (i)
        for (const h of p) {
          const {
            type: M,
            target: A
          } = h;
          if (M === "childList" && A instanceof HTMLElement && A.contains(i)) {
            d();
            break;
          }
        }
    }
  }), x = lc({
    callback: d
  });
  return ml(() => {
    d(), i ? (x?.observe(i), g?.observe(document.body, {
      childList: !0,
      subtree: !0
    })) : (x?.disconnect(), g?.disconnect());
  }, [i]), r;
}
function gy(i) {
  const c = Nh(i);
  return bh(i, c);
}
const ih = [];
function yy(i) {
  const c = D.useRef(i), o = Du((r) => i ? r && r !== ih && i && c.current && i.parentNode === c.current.parentNode ? r : Go(i) : ih, [i]);
  return D.useEffect(() => {
    c.current = i;
  }, [i]), o;
}
function py(i) {
  const [c, o] = D.useState(null), r = D.useRef(i), m = D.useCallback((d) => {
    const g = _o(d.target);
    g && o((x) => x ? (x.set(g, jo(g)), new Map(x)) : null);
  }, []);
  return D.useEffect(() => {
    const d = r.current;
    if (i !== d) {
      g(d);
      const x = i.map((p) => {
        const h = _o(p);
        return h ? (h.addEventListener("scroll", m, {
          passive: !0
        }), [h, jo(h)]) : null;
      }).filter((p) => p != null);
      o(x.length ? new Map(x) : null), r.current = i;
    }
    return () => {
      g(i), g(d);
    };
    function g(x) {
      x.forEach((p) => {
        const h = _o(p);
        h?.removeEventListener("scroll", m);
      });
    }
  }, [m, i]), D.useMemo(() => i.length ? c ? Array.from(c.values()).reduce((d, g) => xa(d, g), al) : Th(i) : al, [i, c]);
}
function ch(i, c) {
  c === void 0 && (c = []);
  const o = D.useRef(null);
  return D.useEffect(
    () => {
      o.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    c
  ), D.useEffect(() => {
    const r = i !== al;
    r && !o.current && (o.current = i), !r && o.current && (o.current = null);
  }, [i]), o.current ? Fi(i, o.current) : al;
}
function by(i) {
  D.useEffect(
    () => {
      if (!ec)
        return;
      const c = i.map((o) => {
        let {
          sensor: r
        } = o;
        return r.setup == null ? void 0 : r.setup();
      });
      return () => {
        for (const o of c)
          o?.();
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    i.map((c) => {
      let {
        sensor: o
      } = c;
      return o;
    })
  );
}
function Sy(i, c) {
  return D.useMemo(() => i.reduce((o, r) => {
    let {
      eventName: m,
      handler: d
    } = r;
    return o[m] = (g) => {
      d(g, c);
    }, o;
  }, {}), [i, c]);
}
function Mh(i) {
  return D.useMemo(() => i ? Z0(i) : null, [i]);
}
const sh = [];
function xy(i, c) {
  c === void 0 && (c = Ta);
  const [o] = i, r = Mh(o ? De(o) : null), [m, d] = D.useState(sh);
  function g() {
    d(() => i.length ? i.map((p) => zh(p) ? r : new Qo(c(p), p)) : sh);
  }
  const x = lc({
    callback: g
  });
  return ml(() => {
    x?.disconnect(), g(), i.forEach((p) => x?.observe(p));
  }, [i]), m;
}
function Ey(i) {
  if (!i)
    return null;
  if (i.children.length > 1)
    return i;
  const c = i.children[0];
  return Au(c) ? c : i;
}
function zy(i) {
  let {
    measure: c
  } = i;
  const [o, r] = D.useState(null), m = D.useCallback((h) => {
    for (const {
      target: M
    } of h)
      if (Au(M)) {
        r((A) => {
          const U = c(M);
          return A ? {
            ...A,
            width: U.width,
            height: U.height
          } : U;
        });
        break;
      }
  }, [c]), d = lc({
    callback: m
  }), g = D.useCallback((h) => {
    const M = Ey(h);
    d?.disconnect(), M && d?.observe(M), r(M ? c(M) : null);
  }, [c, d]), [x, p] = Wi(g);
  return D.useMemo(() => ({
    nodeRef: x,
    rect: o,
    setRef: p
  }), [o, x, p]);
}
const _y = [{
  sensor: Vo,
  options: {}
}, {
  sensor: Dh,
  options: {}
}], Ty = {
  current: {}
}, $i = {
  draggable: {
    measure: th
  },
  droppable: {
    measure: th,
    strategy: Tu.WhileDragging,
    frequency: Uo.Optimized
  },
  dragOverlay: {
    measure: Ta
  }
};
class Eu extends Map {
  get(c) {
    var o;
    return c != null && (o = super.get(c)) != null ? o : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((c) => {
      let {
        disabled: o
      } = c;
      return !o;
    });
  }
  getNodeFor(c) {
    var o, r;
    return (o = (r = this.get(c)) == null ? void 0 : r.node.current) != null ? o : void 0;
  }
}
const Ay = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new Eu(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: Ii
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: $i,
  measureDroppableContainers: Ii,
  windowRect: null,
  measuringScheduled: !1
}, Dy = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: Ii,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: Ii
}, nc = /* @__PURE__ */ D.createContext(Dy), Oh = /* @__PURE__ */ D.createContext(Ay);
function Ny() {
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
      containers: new Eu()
    }
  };
}
function My(i, c) {
  switch (c.type) {
    case Wt.DragStart:
      return {
        ...i,
        draggable: {
          ...i.draggable,
          initialCoordinates: c.initialCoordinates,
          active: c.active
        }
      };
    case Wt.DragMove:
      return i.draggable.active == null ? i : {
        ...i,
        draggable: {
          ...i.draggable,
          translate: {
            x: c.coordinates.x - i.draggable.initialCoordinates.x,
            y: c.coordinates.y - i.draggable.initialCoordinates.y
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
        element: o
      } = c, {
        id: r
      } = o, m = new Eu(i.droppable.containers);
      return m.set(r, o), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: m
        }
      };
    }
    case Wt.SetDroppableDisabled: {
      const {
        id: o,
        key: r,
        disabled: m
      } = c, d = i.droppable.containers.get(o);
      if (!d || r !== d.key)
        return i;
      const g = new Eu(i.droppable.containers);
      return g.set(o, {
        ...d,
        disabled: m
      }), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: g
        }
      };
    }
    case Wt.UnregisterDroppable: {
      const {
        id: o,
        key: r
      } = c, m = i.droppable.containers.get(o);
      if (!m || r !== m.key)
        return i;
      const d = new Eu(i.droppable.containers);
      return d.delete(o), {
        ...i,
        droppable: {
          ...i.droppable,
          containers: d
        }
      };
    }
    default:
      return i;
  }
}
function Oy(i) {
  let {
    disabled: c
  } = i;
  const {
    active: o,
    activatorEvent: r,
    draggableNodes: m
  } = D.useContext(nc), d = Co(r), g = Co(o?.id);
  return D.useEffect(() => {
    if (!c && !r && d && g != null) {
      if (!Xo(d) || document.activeElement === d.target)
        return;
      const x = m.get(g);
      if (!x)
        return;
      const {
        activatorNode: p,
        node: h
      } = x;
      if (!p.current && !h.current)
        return;
      requestAnimationFrame(() => {
        for (const M of [p.current, h.current]) {
          if (!M)
            continue;
          const A = b0(M);
          if (A) {
            A.focus();
            break;
          }
        }
      });
    }
  }, [r, c, m, g, d]), null;
}
function Cy(i, c) {
  let {
    transform: o,
    ...r
  } = c;
  return i != null && i.length ? i.reduce((m, d) => d({
    transform: m,
    ...r
  }), o) : o;
}
function Ry(i) {
  return D.useMemo(
    () => ({
      draggable: {
        ...$i.draggable,
        ...i?.draggable
      },
      droppable: {
        ...$i.droppable,
        ...i?.droppable
      },
      dragOverlay: {
        ...$i.dragOverlay,
        ...i?.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i?.draggable, i?.droppable, i?.dragOverlay]
  );
}
function jy(i) {
  let {
    activeNode: c,
    measure: o,
    initialRect: r,
    config: m = !0
  } = i;
  const d = D.useRef(!1), {
    x: g,
    y: x
  } = typeof m == "boolean" ? {
    x: m,
    y: m
  } : m;
  ml(() => {
    if (!g && !x || !c) {
      d.current = !1;
      return;
    }
    if (d.current || !r)
      return;
    const h = c?.node.current;
    if (!h || h.isConnected === !1)
      return;
    const M = o(h), A = bh(M, r);
    if (g || (A.x = 0), x || (A.y = 0), d.current = !0, Math.abs(A.x) > 0 || Math.abs(A.y) > 0) {
      const U = Sh(h);
      U && U.scrollBy({
        top: A.y,
        left: A.x
      });
    }
  }, [c, g, x, r, o]);
}
const Ch = /* @__PURE__ */ D.createContext({
  ...al,
  scaleX: 1,
  scaleY: 1
});
var on;
(function(i) {
  i[i.Uninitialized = 0] = "Uninitialized", i[i.Initializing = 1] = "Initializing", i[i.Initialized = 2] = "Initialized";
})(on || (on = {}));
const wy = /* @__PURE__ */ D.memo(function(c) {
  var o, r, m, d;
  let {
    id: g,
    accessibility: x,
    autoScroll: p = !0,
    children: h,
    sensors: M = _y,
    collisionDetection: A = B0,
    measuring: U,
    modifiers: H,
    ...V
  } = c;
  const Y = D.useReducer(My, void 0, Ny), [Z, W] = Y, [lt, k] = T0(), [nt, it] = D.useState(on.Uninitialized), et = nt === on.Initialized, {
    draggable: {
      active: X,
      nodes: I,
      translate: bt
    },
    droppable: {
      containers: Ot
    }
  } = Z, dt = X != null ? I.get(X) : null, Mt = D.useRef({
    initial: null,
    translated: null
  }), Jt = D.useMemo(() => {
    var qt;
    return X != null ? {
      id: X,
      // It's possible for the active node to unmount while dragging
      data: (qt = dt?.data) != null ? qt : Ty,
      rect: Mt
    } : null;
  }, [X, dt]), Gt = D.useRef(null), [ee, O] = D.useState(null), [B, J] = D.useState(null), ct = zu(V, Object.values(V)), gt = Nu("DndDescribedBy", g), S = D.useMemo(() => Ot.getEnabled(), [Ot]), C = Ry(U), {
    droppableRects: q,
    measureDroppableContainers: L,
    measuringScheduled: P
  } = dy(S, {
    dragging: et,
    dependencies: [bt.x, bt.y],
    config: C.droppable
  }), F = ry(I, X), mt = D.useMemo(() => B ? Ro(B) : null, [B]), jt = Un(), St = my(F, C.draggable.measure);
  jy({
    activeNode: X != null ? I.get(X) : null,
    config: jt.layoutShiftCompensation,
    initialRect: St,
    measure: C.draggable.measure
  });
  const vt = uh(F, C.draggable.measure, St), ul = uh(F ? F.parentElement : null), ve = D.useRef({
    activatorEvent: null,
    active: null,
    activeNode: F,
    collisionRect: null,
    collisions: null,
    droppableRects: q,
    draggableNodes: I,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: Ot,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  }), hl = Ot.getNodeFor((o = ve.current.over) == null ? void 0 : o.id), le = zy({
    measure: C.dragOverlay.measure
  }), il = (r = le.nodeRef.current) != null ? r : F, cl = et ? (m = le.rect) != null ? m : vt : null, Ou = !!(le.nodeRef.current && le.rect), Aa = gy(Ou ? null : vt), mn = Mh(il ? De(il) : null), He = yy(et ? hl ?? F : null), Bl = xy(He), jn = Cy(H, {
    transform: {
      x: bt.x - Aa.x,
      y: bt.y - Aa.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent: B,
    active: Jt,
    activeNodeRect: vt,
    containerNodeRect: ul,
    draggingNodeRect: cl,
    over: ve.current.over,
    overlayNodeRect: le.rect,
    scrollableAncestors: He,
    scrollableAncestorRects: Bl,
    windowRect: mn
  }), Cu = mt ? xa(mt, bt) : null, oe = py(He), ac = ch(oe), Ru = ch(oe, [vt]), vl = xa(jn, ac), Ie = cl ? L0(cl, jn) : null, hn = Jt && Ie ? A({
    active: Jt,
    collisionRect: Ie,
    droppableRects: q,
    droppableContainers: S,
    pointerCoordinates: Cu
  }) : null, Da = w0(hn, "id"), [sl, ju] = D.useState(null), vn = Ou ? jn : xa(jn, Ru), me = q0(vn, (d = sl?.rect) != null ? d : null, vt), Be = D.useRef(null), re = D.useCallback(
    (qt, Yt) => {
      let {
        sensor: Ft,
        options: ge
      } = Yt;
      if (Gt.current == null)
        return;
      const ye = I.get(Gt.current);
      if (!ye)
        return;
      const fe = qt.nativeEvent, pe = new Ft({
        active: Gt.current,
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
          const Pe = Gt.current;
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
          bu.unstable_batchedUpdates(() => {
            Ye?.(gl), it(on.Initializing), W({
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
              cancelDrop: ql
            } = ct.current;
            tl = {
              activatorEvent: fe,
              active: Ne,
              collisions: Ye,
              delta: yl,
              over: gl
            }, kt === Wt.DragEnd && typeof ql == "function" && await Promise.resolve(ql(tl)) && (kt = Wt.DragCancel);
          }
          Gt.current = null, bu.unstable_batchedUpdates(() => {
            W({
              type: kt
            }), it(on.Uninitialized), ju(null), O(null), J(null), Be.current = null;
            const ql = kt === Wt.DragEnd ? "onDragEnd" : "onDragCancel";
            if (tl) {
              const Le = ct.current[ql];
              Le?.(tl), lt({
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
  ), uc = D.useCallback((qt, Yt) => (Ft, ge) => {
    const ye = Ft.nativeEvent, fe = I.get(ge);
    if (
      // Another sensor is already instantiating
      Gt.current !== null || // No active draggable
      !fe || // Event has already been captured
      ye.dndKit || ye.defaultPrevented
    )
      return;
    const pe = {
      active: fe
    };
    qt(Ft, Yt.options, pe) === !0 && (ye.dndKit = {
      capturedBy: Yt.sensor
    }, Gt.current = ge, re(Ft, Yt));
  }, [I, re]), wu = fy(M, uc);
  by(M), ml(() => {
    vt && nt === on.Initializing && it(on.Initialized);
  }, [vt, nt]), D.useEffect(
    () => {
      const {
        onDragMove: qt
      } = ct.current, {
        active: Yt,
        activatorEvent: Ft,
        collisions: ge,
        over: ye
      } = ve.current;
      if (!Yt || !Ft)
        return;
      const fe = {
        active: Yt,
        activatorEvent: Ft,
        collisions: ge,
        delta: {
          x: vl.x,
          y: vl.y
        },
        over: ye
      };
      bu.unstable_batchedUpdates(() => {
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
        collisions: Ft,
        droppableContainers: ge,
        scrollAdjustedTranslate: ye
      } = ve.current;
      if (!qt || Gt.current == null || !Yt || !ye)
        return;
      const {
        onDragOver: fe
      } = ct.current, pe = ge.get(Da), qe = pe && pe.rect.current ? {
        id: pe.id,
        rect: pe.rect.current,
        data: pe.data,
        disabled: pe.disabled
      } : null, kt = {
        active: qt,
        activatorEvent: Yt,
        collisions: Ft,
        delta: {
          x: ye.x,
          y: ye.y
        },
        over: qe
      };
      bu.unstable_batchedUpdates(() => {
        ju(qe), fe?.(kt), lt({
          type: "onDragOver",
          event: kt
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Da]
  ), ml(() => {
    ve.current = {
      activatorEvent: B,
      active: Jt,
      activeNode: F,
      collisionRect: Ie,
      collisions: hn,
      droppableRects: q,
      draggableNodes: I,
      draggingNode: il,
      draggingNodeRect: cl,
      droppableContainers: Ot,
      over: sl,
      scrollableAncestors: He,
      scrollAdjustedTranslate: vl
    }, Mt.current = {
      initial: cl,
      translated: Ie
    };
  }, [Jt, F, hn, Ie, I, il, cl, q, Ot, sl, He, vl]), cy({
    ...jt,
    delta: bt,
    draggingRect: Ie,
    pointerCoordinates: Cu,
    scrollableAncestors: He,
    scrollableAncestorRects: Bl
  });
  const ic = D.useMemo(() => ({
    active: Jt,
    activeNode: F,
    activeNodeRect: vt,
    activatorEvent: B,
    collisions: hn,
    containerNodeRect: ul,
    dragOverlay: le,
    draggableNodes: I,
    droppableContainers: Ot,
    droppableRects: q,
    over: sl,
    measureDroppableContainers: L,
    scrollableAncestors: He,
    scrollableAncestorRects: Bl,
    measuringConfiguration: C,
    measuringScheduled: P,
    windowRect: mn
  }), [Jt, F, vt, B, hn, ul, le, I, Ot, q, sl, L, He, Bl, C, P, mn]), wn = D.useMemo(() => ({
    activatorEvent: B,
    activators: wu,
    active: Jt,
    activeNodeRect: vt,
    ariaDescribedById: {
      draggable: gt
    },
    dispatch: W,
    draggableNodes: I,
    over: sl,
    measureDroppableContainers: L
  }), [B, wu, Jt, vt, W, gt, I, sl, L]);
  return Ae.createElement(ph.Provider, {
    value: k
  }, Ae.createElement(nc.Provider, {
    value: wn
  }, Ae.createElement(Oh.Provider, {
    value: ic
  }, Ae.createElement(Ch.Provider, {
    value: me
  }, h)), Ae.createElement(Oy, {
    disabled: x?.restoreFocus === !1
  })), Ae.createElement(N0, {
    ...x,
    hiddenTextDescribedById: gt
  }));
  function Un() {
    const qt = ee?.autoScrollEnabled === !1, Yt = typeof p == "object" ? p.enabled === !1 : p === !1, Ft = et && !qt && !Yt;
    return typeof p == "object" ? {
      ...p,
      enabled: Ft
    } : {
      enabled: Ft
    };
  }
}), Uy = /* @__PURE__ */ D.createContext(null), oh = "button", Hy = "Draggable";
function By(i) {
  let {
    id: c,
    data: o,
    disabled: r = !1,
    attributes: m
  } = i;
  const d = Nu(Hy), {
    activators: g,
    activatorEvent: x,
    active: p,
    activeNodeRect: h,
    ariaDescribedById: M,
    draggableNodes: A,
    over: U
  } = D.useContext(nc), {
    role: H = oh,
    roleDescription: V = "draggable",
    tabIndex: Y = 0
  } = m ?? {}, Z = p?.id === c, W = D.useContext(Z ? Ch : Uy), [lt, k] = Wi(), [nt, it] = Wi(), et = Sy(g, c), X = zu(o);
  ml(
    () => (A.set(c, {
      id: c,
      key: d,
      node: lt,
      activatorNode: nt,
      data: X
    }), () => {
      const bt = A.get(c);
      bt && bt.key === d && A.delete(c);
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [A, c]
  );
  const I = D.useMemo(() => ({
    role: H,
    tabIndex: Y,
    "aria-disabled": r,
    "aria-pressed": Z && H === oh ? !0 : void 0,
    "aria-roledescription": V,
    "aria-describedby": M.draggable
  }), [r, H, Y, Z, V, M.draggable]);
  return {
    active: p,
    activatorEvent: x,
    activeNodeRect: h,
    attributes: I,
    isDragging: Z,
    listeners: r ? void 0 : et,
    node: lt,
    over: U,
    setNodeRef: k,
    setActivatorNodeRef: it,
    transform: W
  };
}
function qy() {
  return D.useContext(Oh);
}
const Yy = "Droppable", Ly = {
  timeout: 25
};
function Xy(i) {
  let {
    data: c,
    disabled: o = !1,
    id: r,
    resizeObserverConfig: m
  } = i;
  const d = Nu(Yy), {
    active: g,
    dispatch: x,
    over: p,
    measureDroppableContainers: h
  } = D.useContext(nc), M = D.useRef({
    disabled: o
  }), A = D.useRef(!1), U = D.useRef(null), H = D.useRef(null), {
    disabled: V,
    updateMeasurementsFor: Y,
    timeout: Z
  } = {
    ...Ly,
    ...m
  }, W = zu(Y ?? r), lt = D.useCallback(
    () => {
      if (!A.current) {
        A.current = !0;
        return;
      }
      H.current != null && clearTimeout(H.current), H.current = setTimeout(() => {
        h(Array.isArray(W.current) ? W.current : [W.current]), H.current = null;
      }, Z);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [Z]
  ), k = lc({
    callback: lt,
    disabled: V || !g
  }), nt = D.useCallback((I, bt) => {
    k && (bt && (k.unobserve(bt), A.current = !1), I && k.observe(I));
  }, [k]), [it, et] = Wi(nt), X = zu(c);
  return D.useEffect(() => {
    !k || !it.current || (k.disconnect(), A.current = !1, k.observe(it.current));
  }, [it, k]), D.useEffect(
    () => (x({
      type: Wt.RegisterDroppable,
      element: {
        id: r,
        key: d,
        disabled: o,
        node: it,
        rect: U,
        data: X
      }
    }), () => x({
      type: Wt.UnregisterDroppable,
      key: d,
      id: r
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [r]
  ), D.useEffect(() => {
    o !== M.current.disabled && (x({
      type: Wt.SetDroppableDisabled,
      id: r,
      key: d,
      disabled: o
    }), M.current.disabled = o);
  }, [r, d, o, x]), {
    active: g,
    rect: U,
    isOver: p?.id === r,
    node: it,
    over: p,
    setNodeRef: et
  };
}
function Ko(i, c, o) {
  const r = i.slice();
  return r.splice(o < 0 ? r.length + o : o, 0, r.splice(c, 1)[0]), r;
}
function Gy(i, c) {
  return i.reduce((o, r, m) => {
    const d = c.get(r);
    return d && (o[m] = d), o;
  }, Array(i.length));
}
function Ji(i) {
  return i !== null && i >= 0;
}
function Qy(i, c) {
  if (i === c)
    return !0;
  if (i.length !== c.length)
    return !1;
  for (let o = 0; o < i.length; o++)
    if (i[o] !== c[o])
      return !1;
  return !0;
}
function Zy(i) {
  return typeof i == "boolean" ? {
    draggable: i,
    droppable: i
  } : i;
}
const Jo = (i) => {
  let {
    rects: c,
    activeIndex: o,
    overIndex: r,
    index: m
  } = i;
  const d = Ko(c, r, o), g = c[m], x = d[m];
  return !x || !g ? null : {
    x: x.left - g.left,
    y: x.top - g.top,
    scaleX: x.width / g.width,
    scaleY: x.height / g.height
  };
}, Rh = "Sortable", jh = /* @__PURE__ */ Ae.createContext({
  activeIndex: -1,
  containerId: Rh,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Jo,
  disabled: {
    draggable: !1,
    droppable: !1
  }
});
function Vy(i) {
  let {
    children: c,
    id: o,
    items: r,
    strategy: m = Jo,
    disabled: d = !1
  } = i;
  const {
    active: g,
    dragOverlay: x,
    droppableRects: p,
    over: h,
    measureDroppableContainers: M
  } = qy(), A = Nu(Rh, o), U = x.rect !== null, H = D.useMemo(() => r.map((et) => typeof et == "object" && "id" in et ? et.id : et), [r]), V = g != null, Y = g ? H.indexOf(g.id) : -1, Z = h ? H.indexOf(h.id) : -1, W = D.useRef(H), lt = !Qy(H, W.current), k = Z !== -1 && Y === -1 || lt, nt = Zy(d);
  ml(() => {
    lt && V && M(H);
  }, [lt, H, V, M]), D.useEffect(() => {
    W.current = H;
  }, [H]);
  const it = D.useMemo(
    () => ({
      activeIndex: Y,
      containerId: A,
      disabled: nt,
      disableTransforms: k,
      items: H,
      overIndex: Z,
      useDragOverlay: U,
      sortedRects: Gy(H, p),
      strategy: m
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Y, A, nt.draggable, nt.droppable, k, H, Z, p, U, m]
  );
  return Ae.createElement(jh.Provider, {
    value: it
  }, c);
}
const Ky = (i) => {
  let {
    id: c,
    items: o,
    activeIndex: r,
    overIndex: m
  } = i;
  return Ko(o, r, m).indexOf(c);
}, Jy = (i) => {
  let {
    containerId: c,
    isSorting: o,
    wasDragging: r,
    index: m,
    items: d,
    newIndex: g,
    previousItems: x,
    previousContainerId: p,
    transition: h
  } = i;
  return !h || !r || x !== d && m === g ? !1 : o ? !0 : g !== m && c === p;
}, ky = {
  duration: 200,
  easing: "ease"
}, wh = "transform", $y = /* @__PURE__ */ _u.Transition.toString({
  property: wh,
  duration: 0,
  easing: "linear"
}), Wy = {
  roleDescription: "sortable"
};
function Fy(i) {
  let {
    disabled: c,
    index: o,
    node: r,
    rect: m
  } = i;
  const [d, g] = D.useState(null), x = D.useRef(o);
  return ml(() => {
    if (!c && o !== x.current && r.current) {
      const p = m.current;
      if (p) {
        const h = Ta(r.current, {
          ignoreTransform: !0
        }), M = {
          x: p.left - h.left,
          y: p.top - h.top,
          scaleX: p.width / h.width,
          scaleY: p.height / h.height
        };
        (M.x || M.y) && g(M);
      }
    }
    o !== x.current && (x.current = o);
  }, [c, o, r, m]), D.useEffect(() => {
    d && g(null);
  }, [d]), d;
}
function Iy(i) {
  let {
    animateLayoutChanges: c = Jy,
    attributes: o,
    disabled: r,
    data: m,
    getNewIndex: d = Ky,
    id: g,
    strategy: x,
    resizeObserverConfig: p,
    transition: h = ky
  } = i;
  const {
    items: M,
    containerId: A,
    activeIndex: U,
    disabled: H,
    disableTransforms: V,
    sortedRects: Y,
    overIndex: Z,
    useDragOverlay: W,
    strategy: lt
  } = D.useContext(jh), k = Py(r, H), nt = M.indexOf(g), it = D.useMemo(() => ({
    sortable: {
      containerId: A,
      index: nt,
      items: M
    },
    ...m
  }), [A, m, nt, M]), et = D.useMemo(() => M.slice(M.indexOf(g)), [M, g]), {
    rect: X,
    node: I,
    isOver: bt,
    setNodeRef: Ot
  } = Xy({
    id: g,
    data: it,
    disabled: k.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: et,
      ...p
    }
  }), {
    active: dt,
    activatorEvent: Mt,
    activeNodeRect: Jt,
    attributes: Gt,
    setNodeRef: ee,
    listeners: O,
    isDragging: B,
    over: J,
    setActivatorNodeRef: ct,
    transform: gt
  } = By({
    id: g,
    data: it,
    attributes: {
      ...Wy,
      ...o
    },
    disabled: k.draggable
  }), S = v0(Ot, ee), C = !!dt, q = C && !V && Ji(U) && Ji(Z), L = !W && B, P = L && q ? gt : null, mt = q ? P ?? (x ?? lt)({
    rects: Y,
    activeNodeRect: Jt,
    activeIndex: U,
    overIndex: Z,
    index: nt
  }) : null, jt = Ji(U) && Ji(Z) ? d({
    id: g,
    items: M,
    activeIndex: U,
    overIndex: Z
  }) : nt, St = dt?.id, vt = D.useRef({
    activeId: St,
    items: M,
    newIndex: jt,
    containerId: A
  }), ul = M !== vt.current.items, ve = c({
    active: dt,
    containerId: A,
    isDragging: B,
    isSorting: C,
    id: g,
    index: nt,
    items: M,
    newIndex: vt.current.newIndex,
    previousItems: vt.current.items,
    previousContainerId: vt.current.containerId,
    transition: h,
    wasDragging: vt.current.activeId != null
  }), hl = Fy({
    disabled: !ve,
    index: nt,
    node: I,
    rect: X
  });
  return D.useEffect(() => {
    C && vt.current.newIndex !== jt && (vt.current.newIndex = jt), A !== vt.current.containerId && (vt.current.containerId = A), M !== vt.current.items && (vt.current.items = M);
  }, [C, jt, A, M]), D.useEffect(() => {
    if (St === vt.current.activeId)
      return;
    if (St != null && vt.current.activeId == null) {
      vt.current.activeId = St;
      return;
    }
    const il = setTimeout(() => {
      vt.current.activeId = St;
    }, 50);
    return () => clearTimeout(il);
  }, [St]), {
    active: dt,
    activeIndex: U,
    attributes: Gt,
    data: it,
    rect: X,
    index: nt,
    newIndex: jt,
    items: M,
    isOver: bt,
    isSorting: C,
    isDragging: B,
    listeners: O,
    node: I,
    overIndex: Z,
    over: J,
    setNodeRef: S,
    setActivatorNodeRef: ct,
    setDroppableNodeRef: Ot,
    setDraggableNodeRef: ee,
    transform: hl ?? mt,
    transition: le()
  };
  function le() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      hl || // Or to prevent items jumping to back to their "new" position when items change
      ul && vt.current.newIndex === nt
    )
      return $y;
    if (!(L && !Xo(Mt) || !h) && (C || ve))
      return _u.Transition.toString({
        ...h,
        property: wh
      });
  }
}
function Py(i, c) {
  var o, r;
  return typeof i == "boolean" ? {
    draggable: i,
    // Backwards compatibility
    droppable: !1
  } : {
    draggable: (o = i?.draggable) != null ? o : c.draggable,
    droppable: (r = i?.droppable) != null ? r : c.droppable
  };
}
Et.Down, Et.Right, Et.Up, Et.Left;
const Uh = D.createContext(null);
function tp({ source: i, children: c }) {
  return /* @__PURE__ */ y.jsx(Uh.Provider, { value: i, children: c });
}
function Mu() {
  const i = D.useContext(Uh);
  if (!i) throw new Error("useHassSource must be used inside <HassProvider>");
  return i;
}
function ko(i) {
  const c = Mu();
  return D.useSyncExternalStore(c.subscribe, () => c.getStates()[i]);
}
function ep() {
  const i = Mu();
  return D.useSyncExternalStore(i.subscribe, i.getStates);
}
function $o(i) {
  const c = Mu();
  return D.useSyncExternalStore(c.subscribe, () => i(c.getStates()));
}
function dn() {
  return Mu().callService;
}
function Hl(i) {
  return i.split(".")[0];
}
function Ut(i) {
  return i.attributes.friendly_name || i.entity_id;
}
function Ea(i) {
  return i.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}
function rh(i) {
  return Math.abs(i) >= 100 ? Math.round(i).toString() : i.toFixed(1).replace(/\.0$/, "");
}
function lp(i, c, o) {
  return Math.min(o, Math.max(c, i));
}
function rn(i, c) {
  const o = i.attributes.supported_features;
  return o != null && (o & c) === c;
}
function Ho() {
  return crypto.randomUUID();
}
const np = [
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
], ap = /* @__PURE__ */ new Set(["light", "climate", "media_player", "cover", "lock", "fan", "switch", "sensor", "binary_sensor", "humidifier", "siren"]), fh = ["Living Room", "Kitchen", "Bedroom", "Office", "Bathroom", "Hallway", "Garage", "Outdoor", "Garden", "Home"];
function up(i) {
  const c = `${i.entity_id} ${Ut(i)}`.toLowerCase();
  for (const [o, r] of np) if (c.includes(o)) return r;
  return "Home";
}
function ip(i) {
  const c = Hl(i);
  return c === "media_player" || c === "sensor" ? 2 : 1;
}
function cp(i) {
  const c = /* @__PURE__ */ new Map();
  for (const r of Object.values(i)) {
    const m = Hl(r.entity_id);
    if (!ap.has(m) || m === "sensor" && !r.attributes.unit_of_measurement) continue;
    const d = up(r);
    let g = c.get(d);
    g || (g = [], c.set(d, g)), g.push(r);
  }
  const o = [];
  for (const [r, m] of c) {
    const d = (Y) => m.filter((Z) => Hl(Z.entity_id) === Y).sort((Z, W) => Ut(Z).localeCompare(Ut(W))), g = d("light"), x = d("climate"), p = d("media_player"), h = d("cover"), M = d("lock"), A = [...d("switch"), ...d("fan"), ...d("humidifier"), ...d("siren")], U = [...d("sensor"), ...d("binary_sensor")], H = [], V = (Y, Z, W, lt) => {
      Z.length && H.push({ id: Ho(), type: Y, title: lt, entityIds: Z, size: W });
    };
    x.length && V("hero", [x[0].entity_id], 2), V("group", g.map((Y) => Y.entity_id), 2, "Lighting");
    for (const Y of p) V("card", [Y.entity_id], 2);
    x.length > 1 && V("list", x.slice(1).map((Y) => Y.entity_id), 1, "Climate"), V("list", [...M, ...h].map((Y) => Y.entity_id), 1, "Security & doors"), V("group", A.map((Y) => Y.entity_id), 1, "Switches & fans"), V("list", U.map((Y) => Y.entity_id), 1, "Sensors"), H.length && o.push({ id: Ho(), name: r, areaId: null, blocks: H });
  }
  return o.sort((r, m) => {
    const d = fh.indexOf(r.name), g = fh.indexOf(m.name);
    return (d < 0 ? 99 : d) - (g < 0 ? 99 : g) || r.name.localeCompare(m.name);
  }), { version: 2, rooms: o };
}
const tc = "simui:dashboard:v2";
async function sp(i) {
  const c = i.connection;
  if (c)
    try {
      const o = await c.sendMessagePromise({ type: "frontend/get_user_data", key: tc });
      if (o && o.value && o.value.version === 2) return o.value;
    } catch {
    }
  try {
    const o = localStorage.getItem(tc);
    if (o) {
      const r = JSON.parse(o);
      if (r.version === 2) return r;
    }
  } catch {
  }
  return null;
}
async function op(i, c) {
  try {
    localStorage.setItem(tc, JSON.stringify(c));
  } catch {
  }
  const o = i.connection;
  if (o)
    try {
      await o.sendMessagePromise({ type: "frontend/set_user_data", key: tc, value: c });
    } catch {
    }
}
const Hh = D.createContext(null);
function Wo() {
  const i = D.useContext(Hh);
  if (!i) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return i;
}
function rp({ children: i }) {
  const c = Mu(), [o, r] = D.useState(null), [m, d] = D.useState(null), [g, x] = D.useState(!1), p = D.useRef(!1);
  D.useEffect(() => {
    let A = !0;
    return (async () => {
      const H = await sp(c) ?? cp(c.getStates());
      A && (r(H), d(H.rooms[0]?.id ?? null), p.current = !0);
    })(), () => {
      A = !1;
    };
  }, [c]), D.useEffect(() => {
    !p.current || !o || op(c, o);
  }, [o, c]);
  const h = (A) => {
    r((U) => U && { ...U, rooms: U.rooms.map((H) => H.id === m ? { ...H, blocks: A(H.blocks) } : H) });
  }, M = {
    config: o,
    activeRoomId: m,
    setActiveRoom: d,
    editing: g,
    setEditing: x,
    reorderBlocks: (A, U) => h((H) => Ko(H, A, U)),
    removeBlock: (A) => h((U) => U.filter((H) => H.id !== A)),
    setBlockSize: (A, U) => h((H) => H.map((V) => V.id === A ? { ...V, size: U } : V)),
    addCard: (A) => h((U) => [...U, { id: Ho(), type: "card", entityIds: [A], size: ip(A) }])
  };
  return /* @__PURE__ */ y.jsx(Hh.Provider, { value: M, children: i });
}
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = (...i) => i.filter((c, o, r) => !!c && c.trim() !== "" && r.indexOf(c) === o).join(" ").trim();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fp = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dp = (i) => i.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (c, o, r) => r ? r.toUpperCase() : o.toLowerCase()
);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dh = (i) => {
  const c = dp(i);
  return c.charAt(0).toUpperCase() + c.slice(1);
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Do = {
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
const mp = (i) => {
  for (const c in i)
    if (c.startsWith("aria-") || c === "role" || c === "title")
      return !0;
  return !1;
}, hp = D.createContext({}), vp = () => D.useContext(hp), gp = D.forwardRef(
  ({ color: i, size: c, strokeWidth: o, absoluteStrokeWidth: r, className: m = "", children: d, iconNode: g, ...x }, p) => {
    const {
      size: h = 24,
      strokeWidth: M = 2,
      absoluteStrokeWidth: A = !1,
      color: U = "currentColor",
      className: H = ""
    } = vp() ?? {}, V = r ?? A ? Number(o ?? M) * 24 / Number(c ?? h) : o ?? M;
    return D.createElement(
      "svg",
      {
        ref: p,
        ...Do,
        width: c ?? h ?? Do.width,
        height: c ?? h ?? Do.height,
        stroke: i ?? U,
        strokeWidth: V,
        className: Bh("lucide", H, m),
        ...!d && !mp(x) && { "aria-hidden": "true" },
        ...x
      },
      [
        ...g.map(([Y, Z]) => D.createElement(Y, Z)),
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
const se = (i, c) => {
  const o = D.forwardRef(
    ({ className: r, ...m }, d) => D.createElement(gp, {
      ref: d,
      iconNode: c,
      className: Bh(
        `lucide-${fp(dh(i))}`,
        `lucide-${i}`,
        r
      ),
      ...m
    })
  );
  return o.displayName = dh(i), o;
};
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], pp = se("check", yp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bp = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], qh = se("chevron-down", bp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sp = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Yh = se("chevron-up", Sp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Ep = se("lightbulb", xp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zp = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
], Lh = se("lock-open", zp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _p = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], Xh = se("lock", _p);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tp = [["path", { d: "M5 12h14", key: "1ays0h" }]], Ap = se("minus", Tp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Np = se("pause", Dp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
], Op = se("pencil", Mp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], mh = se("play", Cp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Gh = se("plus", Rp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Qh = se("power", jp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wp = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
      key: "15892j"
    }
  ],
  ["path", { d: "M3 20V4", key: "1ptbpl" }]
], Up = se("skip-back", wp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
], Bp = se("skip-forward", Hp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], Yp = se("square", qp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
], Zh = se("thermometer", Lp);
/**
 * @license lucide-react v1.18.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Gp = se("x", Xp);
function Qp({ block: i }) {
  const c = ko(i.entityIds[0]);
  if (!c) return null;
  const o = c.attributes, r = o.current_temperature, m = o.temperature, d = o.hvac_action;
  let g = c.state.replace(/_/g, " ");
  return d === "heating" && m != null ? g = `Heating to ${No(m)}°` : d === "cooling" && m != null ? g = `Cooling to ${No(m)}°` : d === "idle" ? g = "Idle" : m != null && (g = `Set to ${No(m)}°`), /* @__PURE__ */ y.jsxs("div", { className: "simui-hero", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-hero-temp num", children: [
      r != null ? Math.round(r) : "—",
      /* @__PURE__ */ y.jsx("small", { children: "°" })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "simui-hero-sub", children: g })
  ] });
}
function No(i) {
  return Number.isInteger(i) ? `${i}` : i.toFixed(1);
}
const Zp = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "humidifier", "siren", "automation"]);
function Vh({ entityId: i }) {
  const c = ko(i), o = dn();
  if (!c)
    return /* @__PURE__ */ y.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name muted", children: i }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-state", children: "—" })
    ] });
  const r = Hl(i), m = Ut(c);
  if (r === "light") {
    const d = c.state === "on", g = c.attributes.brightness ?? 0, x = d ? Math.max(1, Math.round(g / 255 * 100)) : 0, p = () => {
      o("light", d ? "turn_off" : "turn_on", {}, { entity_id: i });
    }, h = (M) => {
      o("light", "turn_on", { brightness_pct: Number(M.target.value) }, { entity_id: i });
    };
    return /* @__PURE__ */ y.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ y.jsx("button", { className: "simui-erow-dot", "data-on": d, "aria-label": `Toggle ${m}`, onClick: p }),
      /* @__PURE__ */ y.jsx("button", { className: "simui-erow-name as-btn", onClick: p, children: m }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      d ? /* @__PURE__ */ y.jsx(
        "input",
        {
          className: "simui-slider warm mini",
          type: "range",
          min: 1,
          max: 100,
          value: x,
          "aria-label": `${m} brightness`,
          onChange: h,
          style: { background: `linear-gradient(to right, var(--warm) ${x}%, var(--faint) ${x}%)` }
        }
      ) : /* @__PURE__ */ y.jsx("span", { className: "simui-erow-state", children: "Off" })
    ] });
  }
  if (r === "lock") {
    const d = c.state === "locked", g = () => {
      o("lock", d ? "unlock" : "lock", {}, { entity_id: i });
    };
    return /* @__PURE__ */ y.jsxs("button", { className: "simui-erow as-row", onClick: g, children: [
      /* @__PURE__ */ y.jsx("span", { className: `simui-erow-ic${d ? "" : " amber"}`, children: d ? /* @__PURE__ */ y.jsx(Xh, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ y.jsx(Lh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: `simui-erow-state${d ? "" : " warn"}`, children: d ? "Locked" : "Unlocked" })
    ] });
  }
  if (r === "cover") {
    const d = c.attributes.current_position, g = (x) => {
      o("cover", x, void 0, { entity_id: i });
    };
    return /* @__PURE__ */ y.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-state", children: d != null ? `${d}%` : Ea(c.state) }),
      rn(c, 1) && /* @__PURE__ */ y.jsx("button", { className: "simui-rbtn", "aria-label": "Open", onClick: () => g("open_cover"), children: /* @__PURE__ */ y.jsx(Yh, { size: 14 }) }),
      rn(c, 2) && /* @__PURE__ */ y.jsx("button", { className: "simui-rbtn", "aria-label": "Close", onClick: () => g("close_cover"), children: /* @__PURE__ */ y.jsx(qh, { size: 14 }) })
    ] });
  }
  if (r === "sensor" || r === "binary_sensor") {
    const d = c.attributes.unit_of_measurement ?? "";
    return /* @__PURE__ */ y.jsxs("div", { className: "simui-erow", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsxs("span", { className: "simui-erow-val num", children: [
        Ea(c.state),
        d ? ` ${d}` : ""
      ] })
    ] });
  }
  if (Zp.has(r) && (c.state === "on" || c.state === "off")) {
    const d = c.state === "on", g = () => {
      o("homeassistant", d ? "turn_off" : "turn_on", {}, { entity_id: i });
    };
    return /* @__PURE__ */ y.jsxs("button", { className: "simui-erow as-row", onClick: g, children: [
      /* @__PURE__ */ y.jsx("span", { className: `simui-erow-ic${d ? " cool" : ""}`, children: /* @__PURE__ */ y.jsx(Qh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name", children: m }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: `simui-erow-state${d ? " on" : ""}`, children: d ? "On" : "Off" })
    ] });
  }
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-erow", children: [
    /* @__PURE__ */ y.jsx("span", { className: "simui-erow-name", children: m }),
    /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
    /* @__PURE__ */ y.jsx("span", { className: "simui-erow-state", children: Ea(c.state) })
  ] });
}
function Vp({ block: i }) {
  const c = i.entityIds, o = c.length > 0 && c.every((r) => Hl(r) === "light");
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-surface", children: [
    i.title && /* @__PURE__ */ y.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ y.jsx("span", { children: i.title }) }),
    o && /* @__PURE__ */ y.jsx(Kp, { ids: c }),
    /* @__PURE__ */ y.jsx("div", { className: "simui-rows", children: c.map((r) => /* @__PURE__ */ y.jsx(Vh, { entityId: r }, r)) })
  ] });
}
function Kp({ ids: i }) {
  const c = dn(), o = $o((m) => {
    const d = i.filter((x) => m[x]?.state === "on");
    if (!d.length) return 0;
    const g = d.reduce((x, p) => x + Number(m[p]?.attributes.brightness ?? 0), 0);
    return Math.round(g / d.length / 255 * 100);
  }), r = (m) => {
    const d = Number(m.target.value);
    i.forEach((g) => {
      c("light", "turn_on", { brightness_pct: d }, { entity_id: g });
    });
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-master", children: [
    /* @__PURE__ */ y.jsx("span", { className: "simui-master-label", children: "All" }),
    /* @__PURE__ */ y.jsx(
      "input",
      {
        className: "simui-slider warm",
        type: "range",
        min: 0,
        max: 100,
        value: o,
        "aria-label": "All lights brightness",
        onChange: r,
        style: { background: `linear-gradient(to right, var(--warm) ${o}%, var(--faint) ${o}%)` }
      }
    ),
    /* @__PURE__ */ y.jsxs("span", { className: "simui-master-val num", children: [
      o,
      "%"
    ] })
  ] });
}
function Jp({ block: i }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-surface list", children: [
    i.title && /* @__PURE__ */ y.jsx("div", { className: "simui-surface-head", children: /* @__PURE__ */ y.jsx("span", { children: i.title }) }),
    /* @__PURE__ */ y.jsx("div", { className: "simui-rows divided", children: i.entityIds.map((c) => /* @__PURE__ */ y.jsx(Vh, { entityId: c }, c)) })
  ] });
}
function fn({ children: i, active: c, onClick: o, className: r = "", style: m }) {
  const d = o ? (g) => {
    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), o());
  } : void 0;
  return /* @__PURE__ */ y.jsx(
    "div",
    {
      className: [
        "simui-tile",
        c ? "is-active" : "",
        o ? "is-clickable" : "",
        r
      ].filter(Boolean).join(" "),
      onClick: o,
      onKeyDown: d,
      role: o ? "button" : void 0,
      tabIndex: o ? 0 : void 0,
      style: m,
      children: i
    }
  );
}
const kp = { heating: "warm", cooling: "cool", drying: "warm", fan: "cool" }, $p = { heat: "warm", cool: "cool", heat_cool: "cool", auto: "cool" };
function Wp({ entity: i }) {
  const c = dn(), o = i.attributes, r = o.hvac_action, m = o.current_temperature, d = o.temperature, g = o.target_temp_low, x = o.target_temp_high, p = o.target_temp_step ?? 0.5, h = o.min_temp ?? 7, M = o.max_temp ?? 35, A = r && kp[r] || $p[i.state] || "", U = (H) => {
    if (d == null) return;
    const V = lp(Math.round((d + H) / p) * p, h, M);
    c("climate", "set_temperature", { temperature: V }, { entity_id: i.entity_id });
  };
  return /* @__PURE__ */ y.jsxs(fn, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsx("span", { className: `simui-ic ${A}`, children: /* @__PURE__ */ y.jsx(Zh, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsxs("span", { className: "simui-big", children: [
        m != null ? Math.round(m) : "—",
        /* @__PURE__ */ y.jsx("span", { className: "simui-unit", children: "°" })
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      d != null ? /* @__PURE__ */ y.jsxs("div", { className: "simui-step", children: [
        /* @__PURE__ */ y.jsx("button", { className: "simui-sbtn", "aria-label": "Lower target", onClick: () => U(-p), children: /* @__PURE__ */ y.jsx(Ap, { size: 14, strokeWidth: 2.5 }) }),
        /* @__PURE__ */ y.jsxs("span", { className: "simui-target", children: [
          Mo(d),
          "°"
        ] }),
        /* @__PURE__ */ y.jsx("button", { className: "simui-sbtn", "aria-label": "Raise target", onClick: () => U(p), children: /* @__PURE__ */ y.jsx(Gh, { size: 14, strokeWidth: 2.5 }) })
      ] }) : g != null && x != null ? /* @__PURE__ */ y.jsxs("span", { className: "simui-target", children: [
        Mo(g),
        "–",
        Mo(x),
        "°"
      ] }) : null
    ] })
  ] });
}
function Mo(i) {
  return Number.isInteger(i) ? `${i}` : i.toFixed(1);
}
const ki = { OPEN: 1, CLOSE: 2, SET_POSITION: 4, STOP: 8 };
function Fp({ entity: i }) {
  const c = dn(), o = i.attributes.current_position, r = i.state === "open" || o != null && o > 0, m = rn(i, ki.SET_POSITION) && o != null, d = (x, p) => {
    c("cover", x, p, { entity_id: i.entity_id });
  }, g = m ? { background: `linear-gradient(to right, var(--accent) ${o}%, var(--faint) ${o}%)` } : void 0;
  return /* @__PURE__ */ y.jsxs(fn, { className: r ? "is-on" : "", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-value", children: o != null ? `${o}%` : Ea(i.state) })
    ] }),
    m ? /* @__PURE__ */ y.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: o,
        "aria-label": "Position",
        style: g,
        onChange: (x) => d("set_cover_position", { position: Number(x.target.value) })
      }
    ) : /* @__PURE__ */ y.jsxs("div", { className: "simui-controls", children: [
      rn(i, ki.OPEN) && /* @__PURE__ */ y.jsx("button", { className: "simui-sbtn", "aria-label": "Open", onClick: () => d("open_cover"), children: /* @__PURE__ */ y.jsx(Yh, { size: 15, strokeWidth: 2 }) }),
      rn(i, ki.STOP) && /* @__PURE__ */ y.jsx("button", { className: "simui-sbtn", "aria-label": "Stop", onClick: () => d("stop_cover"), children: /* @__PURE__ */ y.jsx(Yp, { size: 12, strokeWidth: 2 }) }),
      rn(i, ki.CLOSE) && /* @__PURE__ */ y.jsx("button", { className: "simui-sbtn", "aria-label": "Close", onClick: () => d("close_cover"), children: /* @__PURE__ */ y.jsx(qh, { size: 15, strokeWidth: 2 }) })
    ] })
  ] });
}
const Ip = /* @__PURE__ */ new Set(["switch", "fan", "input_boolean", "siren", "humidifier", "automation"]);
function Pp({ entity: i }) {
  const c = dn(), o = Hl(i.entity_id), r = i.state === "on" || i.state === "off", m = i.state === "on", d = Ip.has(o) && r, g = i.attributes.unit_of_measurement ?? "", x = d ? () => {
    c("homeassistant", m ? "turn_off" : "turn_on", {}, { entity_id: i.entity_id });
  } : void 0;
  return /* @__PURE__ */ y.jsxs(fn, { onClick: x, className: d && m ? "is-on" : "", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      d && /* @__PURE__ */ y.jsx("span", { className: `simui-ic${m ? " cool" : ""}`, children: /* @__PURE__ */ y.jsx(Qh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) })
    ] }),
    /* @__PURE__ */ y.jsxs("span", { className: "simui-state", children: [
      Ea(i.state),
      g ? ` ${g}` : ""
    ] })
  ] });
}
function tb({ entity: i }) {
  const c = dn(), o = i.state === "on", r = i.attributes.brightness ?? 0, m = o ? Math.max(1, Math.round(r / 255 * 100)) : 0, d = () => {
    c("light", o ? "turn_off" : "turn_on", {}, { entity_id: i.entity_id });
  }, g = (h) => {
    c("light", "turn_on", { brightness_pct: Number(h.target.value) }, { entity_id: i.entity_id });
  }, p = { background: `linear-gradient(to right, ${o ? "var(--warm)" : "var(--faint)"} ${m}%, var(--faint) ${m}%)` };
  return /* @__PURE__ */ y.jsxs(fn, { onClick: d, className: o ? "is-lit" : "", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsx("span", { className: `simui-ic${o ? " warm" : ""}`, children: /* @__PURE__ */ y.jsx(Ep, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: `simui-pct${o ? " on" : ""}`, children: o ? `${m}%` : "Off" })
    ] }),
    /* @__PURE__ */ y.jsx(
      "input",
      {
        className: "simui-slider",
        type: "range",
        min: 0,
        max: 100,
        value: m,
        "aria-label": `${Ut(i)} brightness`,
        style: p,
        onClick: (h) => h.stopPropagation(),
        onChange: g
      }
    )
  ] });
}
function eb({ entity: i }) {
  const c = dn(), o = i.state === "locked", r = () => {
    c("lock", o ? "unlock" : "lock", {}, { entity_id: i.entity_id });
  };
  return /* @__PURE__ */ y.jsxs(fn, { onClick: r, className: o ? "" : "is-unlocked", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsx("span", { className: `simui-ic${o ? "" : " amber"}`, children: o ? /* @__PURE__ */ y.jsx(Xh, { size: 15, strokeWidth: 2 }) : /* @__PURE__ */ y.jsx(Lh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) })
    ] }),
    /* @__PURE__ */ y.jsx("span", { className: `simui-state${o ? "" : " warn"}`, children: o ? "Locked" : "Unlocked" })
  ] });
}
const hh = { PREV: 16, NEXT: 32 };
function lb({ entity: i }) {
  const c = dn(), o = i.attributes, r = i.state, m = r === "playing", d = o.media_title, g = o.media_artist ?? o.media_album_name ?? o.app_name, x = o.entity_picture, p = !!d, h = (M) => {
    c("media_player", M, void 0, { entity_id: i.entity_id });
  };
  return p ? /* @__PURE__ */ y.jsx(fn, { children: /* @__PURE__ */ y.jsxs("div", { className: "simui-np", children: [
    x ? /* @__PURE__ */ y.jsx("img", { className: "simui-art", src: x, alt: "" }) : /* @__PURE__ */ y.jsx("div", { className: "simui-art" }),
    /* @__PURE__ */ y.jsxs("div", { className: "simui-np-body", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-title", title: d, children: d }),
      g && /* @__PURE__ */ y.jsx("span", { className: "simui-artist", title: g, children: g })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "simui-tp", children: [
      rn(i, hh.PREV) && /* @__PURE__ */ y.jsx("button", { "aria-label": "Previous", onClick: () => h("media_previous_track"), children: /* @__PURE__ */ y.jsx(Up, { size: 18, fill: "currentColor" }) }),
      /* @__PURE__ */ y.jsx("button", { className: "play", "aria-label": m ? "Pause" : "Play", onClick: () => h("media_play_pause"), children: m ? /* @__PURE__ */ y.jsx(Np, { size: 15, fill: "currentColor" }) : /* @__PURE__ */ y.jsx(mh, { size: 15, fill: "currentColor" }) }),
      rn(i, hh.NEXT) && /* @__PURE__ */ y.jsx("button", { "aria-label": "Next", onClick: () => h("media_next_track"), children: /* @__PURE__ */ y.jsx(Bp, { size: 18, fill: "currentColor" }) })
    ] })
  ] }) }) : /* @__PURE__ */ y.jsxs(fn, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-state", children: Ea(r) })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "simui-tp", style: { marginLeft: 0 }, children: /* @__PURE__ */ y.jsx("button", { className: "play", "aria-label": "Play", onClick: () => h("media_play_pause"), children: /* @__PURE__ */ y.jsx(mh, { size: 15, fill: "currentColor" }) }) })
  ] });
}
function nb({ values: i, width: c = 116, height: o = 26 }) {
  if (i.length < 2) return null;
  const r = Math.min(...i), d = Math.max(...i) - r || 1, g = c / (i.length - 1), x = i.map((p, h) => `${(h * g).toFixed(1)},${(o - (p - r) / d * o).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ y.jsx(
    "svg",
    {
      className: "simui-spark",
      width: c,
      height: o,
      viewBox: `0 0 ${c} ${o}`,
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ y.jsx(
        "polyline",
        {
          points: x,
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
const Oo = /* @__PURE__ */ new Map(), ab = 40;
function ub({ entity: i }) {
  const c = i.attributes, o = c.unit_of_measurement ?? "", r = c.device_class === "temperature", m = Number(i.state), d = i.state !== "" && !Number.isNaN(m), g = D.useRef(""), [, x] = D.useState(0);
  D.useEffect(() => {
    if (!d || g.current === i.state) return;
    g.current = i.state;
    const U = Oo.get(i.entity_id) ?? [];
    for (U.push(m); U.length > ab; ) U.shift();
    Oo.set(i.entity_id, U), x((H) => H + 1);
  }, [i.entity_id, i.state, d, m]);
  const p = Oo.get(i.entity_id) ?? [], h = p.length > 1 ? m - p[0] : 0, M = d && Math.abs(h) >= 0.05, A = r ? "°" : "";
  return /* @__PURE__ */ y.jsxs(fn, { children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", children: [
      r && /* @__PURE__ */ y.jsx("span", { className: "simui-ic", children: /* @__PURE__ */ y.jsx(Zh, { size: 15, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: Ut(i), children: Ut(i) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      M && /* @__PURE__ */ y.jsxs("span", { className: `simui-delta ${h > 0 ? "up" : "down"}`, children: [
        h > 0 ? "▲" : "▼",
        " ",
        rh(Math.abs(h)),
        A
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "simui-row", style: { alignItems: "flex-end" }, children: [
      /* @__PURE__ */ y.jsxs("span", { className: "simui-big", children: [
        d ? rh(m) : i.state,
        o ? /* @__PURE__ */ y.jsxs("span", { className: "simui-unit", children: [
          " ",
          o
        ] }) : null
      ] }),
      d && p.length > 1 && /* @__PURE__ */ y.jsx("span", { style: { marginLeft: "auto" }, className: "simui-spark", children: /* @__PURE__ */ y.jsx(nb, { values: p, width: 64, height: 22 }) })
    ] })
  ] });
}
const ib = {
  light: tb,
  sensor: ub,
  climate: Wp,
  media_player: lb,
  cover: Fp,
  lock: eb
};
function cb(i) {
  return ib[i] ?? Pp;
}
function sb({ block: i }) {
  const c = i.entityIds[0], o = ko(c), r = cb(Hl(c));
  return o ? /* @__PURE__ */ y.jsx(r, { entity: o }) : /* @__PURE__ */ y.jsxs("div", { className: "simui-tile", children: [
    /* @__PURE__ */ y.jsx("div", { className: "simui-row", children: /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: c, children: c }) }),
    /* @__PURE__ */ y.jsx("span", { className: "simui-state", children: "Unavailable" })
  ] });
}
function ob({ block: i }) {
  switch (i.type) {
    case "hero":
      return /* @__PURE__ */ y.jsx(Qp, { block: i });
    case "group":
      return /* @__PURE__ */ y.jsx(Vp, { block: i });
    case "list":
      return /* @__PURE__ */ y.jsx(Jp, { block: i });
    case "card":
      return /* @__PURE__ */ y.jsx(sb, { block: i });
    default:
      return null;
  }
}
function rb({ block: i, editing: c }) {
  const { removeBlock: o, setBlockSize: r } = Wo(), { attributes: m, listeners: d, setNodeRef: g, transform: x, transition: p, isDragging: h } = Iy({
    id: i.id,
    disabled: !c
  }), M = {
    transform: _u.Transform.toString(x),
    transition: p,
    zIndex: h ? 20 : void 0
  };
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      ref: g,
      style: M,
      className: `simui-block${i.size === 2 ? " span-2" : ""}${c ? " editing" : ""}${h ? " dragging" : ""}`,
      children: [
        /* @__PURE__ */ y.jsx(ob, { block: i }),
        c && /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
          /* @__PURE__ */ y.jsx("div", { className: "simui-card-grab", ...m, ...d, "aria-label": "Drag to reorder" }),
          /* @__PURE__ */ y.jsx("button", { className: "simui-card-btn size", onPointerDown: (A) => A.stopPropagation(), onClick: () => r(i.id, i.size === 2 ? 1 : 2), "aria-label": "Toggle width", children: i.size === 2 ? "1×" : "2×" }),
          /* @__PURE__ */ y.jsx("button", { className: "simui-card-btn x", onPointerDown: (A) => A.stopPropagation(), onClick: () => o(i.id), "aria-label": "Remove block", children: "×" })
        ] })
      ]
    }
  );
}
function fb({ room: i }) {
  const { editing: c, reorderBlocks: o } = Wo(), r = O0(M0(Vo, { activationConstraint: { distance: 5 } })), m = i.blocks.map((x) => x.id), d = D.useMemo(
    () => i.blocks.flatMap((x) => x.entityIds).filter((x) => Hl(x) === "light"),
    [i]
  ), g = (x) => {
    const { active: p, over: h } = x;
    if (!h || p.id === h.id) return;
    const M = m.indexOf(String(p.id)), A = m.indexOf(String(h.id));
    M >= 0 && A >= 0 && o(M, A);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-room", children: [
    /* @__PURE__ */ y.jsx(db, { lightIds: d }),
    /* @__PURE__ */ y.jsx(mb, { room: i, lightIds: d }),
    /* @__PURE__ */ y.jsx(wy, { sensors: r, collisionDetection: U0, onDragEnd: g, children: /* @__PURE__ */ y.jsx(Vy, { items: m, strategy: Jo, children: /* @__PURE__ */ y.jsx("div", { className: "simui-grid", children: i.blocks.map((x) => /* @__PURE__ */ y.jsx(rb, { block: x, editing: c }, x.id)) }) }) })
  ] });
}
function db({ lightIds: i }) {
  const o = 0.04 + $o((r) => {
    if (!i.length) return 0;
    const m = i.filter((d) => r[d]?.state === "on").length;
    return Math.round(m / i.length * 10) / 10;
  }) * 0.13;
  return /* @__PURE__ */ y.jsx("div", { className: "simui-ambient", style: { "--amb": String(o) } });
}
function mb({ room: i, lightIds: c }) {
  const o = $o((r) => {
    const m = [], d = i.blocks.find((p) => p.type === "hero")?.entityIds[0], g = d ? r[d]?.attributes.current_temperature : void 0;
    if (g != null && m.push(`${Math.round(Number(g))}°`), c.length) {
      const p = c.filter((h) => r[h]?.state === "on").length;
      p && m.push(`${p} ${p === 1 ? "light" : "lights"} on`);
    }
    const x = i.blocks.flatMap((p) => p.entityIds).filter((p) => p.startsWith("lock."));
    if (x.length) {
      const p = x.filter((h) => r[h]?.state === "unlocked").length;
      m.push(p ? `${p} unlocked` : "all locked");
    }
    return m.join(" · ");
  });
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-room-head", children: [
    /* @__PURE__ */ y.jsx("span", { className: "simui-room-name", children: i.name }),
    o && /* @__PURE__ */ y.jsx("span", { className: "simui-room-glance num", children: o })
  ] });
}
function hb({ existing: i, onAdd: c, onClose: o }) {
  const r = ep(), [m, d] = D.useState(""), g = new Set(i), x = m.toLowerCase(), p = Object.values(r).filter((h) => !g.has(h.entity_id)).filter((h) => Ut(h).toLowerCase().includes(x) || h.entity_id.includes(x)).sort((h, M) => Ut(h).localeCompare(Ut(M))).slice(0, 200);
  return /* @__PURE__ */ y.jsx("div", { className: "simui-modal", onClick: o, children: /* @__PURE__ */ y.jsxs("div", { className: "simui-modal-card", onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-modal-head", children: [
      /* @__PURE__ */ y.jsx(
        "input",
        {
          autoFocus: !0,
          className: "simui-search",
          placeholder: "Add a card — search entities…",
          value: m,
          onChange: (h) => d(h.target.value)
        }
      ),
      /* @__PURE__ */ y.jsx("button", { className: "simui-iconbtn-h", onClick: o, "aria-label": "Close", children: /* @__PURE__ */ y.jsx(Gp, { size: 16 }) })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "simui-modal-list", children: [
      p.map((h) => /* @__PURE__ */ y.jsxs("div", { className: "simui-add-row", onClick: () => c(h.entity_id), children: [
        /* @__PURE__ */ y.jsx("span", { className: "simui-name", title: h.entity_id, children: Ut(h) }),
        /* @__PURE__ */ y.jsx("span", { className: "simui-add-dom", children: Hl(h.entity_id) })
      ] }, h.entity_id)),
      p.length === 0 && /* @__PURE__ */ y.jsx("div", { className: "simui-msg", children: "No matches" })
    ] })
  ] }) });
}
function vb() {
  const { config: i, activeRoomId: c, setActiveRoom: o, editing: r, setEditing: m, addCard: d } = Wo(), [g, x] = D.useState(!1);
  if (!i) return /* @__PURE__ */ y.jsx("div", { className: "simui-msg", children: "Loading dashboard…" });
  if (!i.rooms.length) return /* @__PURE__ */ y.jsx("div", { className: "simui-msg", children: "No rooms to show yet." });
  const p = i.rooms.find((h) => h.id === c) ?? i.rooms[0];
  return /* @__PURE__ */ y.jsxs("div", { className: "simui-app", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "simui-topbar", children: [
      /* @__PURE__ */ y.jsx("div", { className: "simui-pills", children: i.rooms.map((h) => /* @__PURE__ */ y.jsx(
        "button",
        {
          className: `simui-pill${h.id === p.id ? " active" : ""}`,
          onClick: () => o(h.id),
          children: h.name
        },
        h.id
      )) }),
      /* @__PURE__ */ y.jsx("span", { className: "simui-spacer" }),
      r && /* @__PURE__ */ y.jsx("button", { className: "simui-iconbtn-h", onClick: () => x(!0), "aria-label": "Add card", children: /* @__PURE__ */ y.jsx(Gh, { size: 16 }) }),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          className: `simui-iconbtn-h${r ? " active" : ""}`,
          onClick: () => m(!r),
          "aria-label": r ? "Done editing" : "Edit dashboard",
          children: r ? /* @__PURE__ */ y.jsx(pp, { size: 16 }) : /* @__PURE__ */ y.jsx(Op, { size: 15 })
        }
      )
    ] }),
    /* @__PURE__ */ y.jsx(fb, { room: p }, p.id),
    g && /* @__PURE__ */ y.jsx(
      hb,
      {
        existing: p.blocks.flatMap((h) => h.entityIds),
        onAdd: d,
        onClose: () => x(!1)
      }
    )
  ] });
}
function gb() {
  return /* @__PURE__ */ y.jsx(rp, { children: /* @__PURE__ */ y.jsx(vb, {}) });
}
const yb = '.simui-root{--bg: var(--primary-background-color, #0a0b0d);--surface: var(--ha-card-background, var(--card-background-color, #15171c));--surface-2: #1b1e25;--text: var(--primary-text-color, #edeef2);--muted: var(--secondary-text-color, #838996);--faint: var(--divider-color, #23262e);--accent: var(--primary-color, #5b8cff);--warm: #ffb267;--up: #3fd08a;--down: #f0735e;--warn: #f0a84b;--radius: 14px;font-family:var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);color:var(--text);background:var(--bg);min-height:100%}.simui-root *{box-sizing:border-box}.simui-big,.simui-pct,.simui-target,.simui-value,.simui-delta{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}.simui-app{padding:16px 16px 40px;max-width:1600px;margin:0 auto}.simui-header{display:flex;align-items:baseline;gap:10px;padding:2px 2px 14px}.simui-header h1{margin:0;font-size:17px;font-weight:600;letter-spacing:-.2px}.simui-sub{color:var(--muted);font-size:12px}.simui-section{margin-bottom:18px}.simui-section-head{display:flex;align-items:center;gap:8px;margin:6px 2px 9px;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:500}.simui-count{background:var(--faint);color:var(--muted);border-radius:999px;padding:0 6px;font-size:10px;line-height:16px}.simui-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.simui-tile{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:72px;padding:11px 12px;background:var(--surface);border:1px solid var(--faint);border-radius:var(--radius);transition:border-color .15s ease,background .15s ease}.simui-tile.is-clickable{cursor:pointer}.simui-tile.is-clickable:hover{border-color:color-mix(in srgb,var(--text) 18%,var(--faint))}.simui-tile.is-lit{background:color-mix(in srgb,var(--warm) 7%,var(--surface));border-color:color-mix(in srgb,var(--warm) 22%,var(--faint))}.simui-tile.is-unlocked{background:color-mix(in srgb,var(--warn) 8%,var(--surface));border-color:color-mix(in srgb,var(--warn) 22%,var(--faint))}.simui-tile.is-on{background:color-mix(in srgb,var(--accent) 8%,var(--surface));border-color:color-mix(in srgb,var(--accent) 22%,var(--faint))}.simui-tile.span-2{grid-column:span 2}.simui-row{display:flex;align-items:center;gap:8px;min-width:0}.simui-spacer{flex:1}.simui-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-ic.warm{color:var(--warm)}.simui-ic.cool{color:var(--accent)}.simui-ic.amber{color:var(--warn)}.simui-big{font-size:22px;font-weight:600;line-height:1;letter-spacing:-.4px}.simui-unit{font-size:12px;color:var(--muted);font-weight:500}.simui-pct{font-size:13px;color:var(--muted)}.simui-pct.on{color:var(--warm)}.simui-state{font-size:13px;color:var(--muted)}.simui-state.warn{color:var(--warn)}.simui-value{font-size:13px;color:var(--muted)}.simui-delta{font-size:11px;color:var(--muted)}.simui-delta.up{color:var(--up)}.simui-delta.down{color:var(--down)}.simui-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:var(--faint);outline:none;cursor:pointer}.simui-slider::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);border:none}.simui-slider::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:var(--text)}.simui-step,.simui-controls{display:flex;align-items:center;gap:8px}.simui-sbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer;transition:border-color .12s ease,color .12s ease}.simui-sbtn:hover{border-color:var(--accent);color:var(--accent)}.simui-target{min-width:30px;text-align:center;font-size:13px;font-weight:500}.simui-np{display:flex;align-items:center;gap:11px;width:100%}.simui-art{flex:none;width:46px;height:46px;border-radius:10px;object-fit:cover;background:linear-gradient(135deg,#2b2350,#5b8cff 130%)}.simui-np-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.simui-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-artist{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-tp{display:flex;align-items:center;gap:14px;margin-left:auto;flex:none}.simui-tp button{display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:var(--text);cursor:pointer}.simui-tp .play{width:32px;height:32px;border-radius:50%;background:var(--text);color:var(--surface)}.simui-spark{color:var(--muted)}.simui-msg{padding:24px;font-size:14px;color:var(--muted)}.simui-header{align-items:center}.simui-iconbtn-h{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;border:1px solid var(--faint);background:transparent;color:var(--muted);cursor:pointer;transition:color .12s ease,border-color .12s ease}.simui-iconbtn-h:hover{color:var(--text);border-color:color-mix(in srgb,var(--text) 20%,var(--faint))}.simui-iconbtn-h.active{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,var(--faint))}.simui-card{position:relative}.simui-card.span-2{grid-column:span 2}.simui-card.editing .simui-tile{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px}.simui-card.dragging{opacity:.55}.simui-card-grab{position:absolute;inset:0;z-index:5;border-radius:var(--radius);cursor:grab;touch-action:none}.simui-card-grab:active{cursor:grabbing}.simui-card-btn{position:absolute;z-index:6;display:flex;align-items:center;justify-content:center;height:20px;border:none;cursor:pointer;line-height:1}.simui-card-btn.x{top:-7px;right:-7px;width:20px;border-radius:50%;background:var(--down);color:#fff;font-size:13px}.simui-card-btn.size{top:-7px;left:-7px;width:26px;border-radius:999px;background:var(--surface-2);color:var(--text);border:1px solid var(--faint);font-size:9px;font-weight:600}.simui-modal{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:#00000080}.simui-modal-card{display:flex;flex-direction:column;width:min(440px,100%);max-height:72vh;background:var(--surface);border:1px solid var(--faint);border-radius:16px;overflow:hidden}.simui-modal-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--faint)}.simui-search{flex:1;background:var(--bg);border:1px solid var(--faint);border-radius:9px;padding:8px 11px;color:var(--text);font-size:13px;outline:none}.simui-search:focus{border-color:color-mix(in srgb,var(--accent) 50%,var(--faint))}.simui-modal-list{overflow:auto;padding:6px}.simui-add-row{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:9px;cursor:pointer}.simui-add-row:hover{background:var(--surface-2)}.simui-add-dom{margin-left:auto;font-size:10px;letter-spacing:.4px;text-transform:uppercase;color:var(--muted)}.simui-topbar{display:flex;align-items:center;gap:8px;padding:6px 2px 10px}.simui-pills{display:flex;gap:6px;overflow-x:auto;min-width:0;scrollbar-width:none}.simui-pills::-webkit-scrollbar{display:none}.simui-pill{flex:none;padding:6px 13px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:color .12s ease,background .12s ease}.simui-pill:hover{color:var(--text)}.simui-pill.active{color:var(--text);background:var(--surface);border-color:var(--faint)}.simui-room{position:relative}.simui-ambient{position:absolute;inset:-20px -16px auto;height:340px;z-index:0;pointer-events:none;opacity:var(--amb, .06);background:radial-gradient(120% 80% at 26% 0%,var(--warm),transparent 62%)}.simui-room>.simui-room-head,.simui-room>.simui-grid{position:relative;z-index:1}.simui-room-head{display:flex;align-items:baseline;gap:12px;padding:8px 2px 16px}.simui-room-name{font-size:22px;font-weight:600;letter-spacing:-.3px}.simui-room-glance{font-size:12px;color:var(--muted)}.simui-block{position:relative}.simui-block.span-2{grid-column:span 2}.simui-block.editing .simui-surface,.simui-block.editing .simui-tile,.simui-block.editing .simui-hero{outline:1px dashed color-mix(in srgb,var(--text) 22%,transparent);outline-offset:-1px;border-radius:var(--radius)}.simui-block.dragging{opacity:.55}.simui-hero{padding:2px 6px 18px}.simui-hero-temp{font-size:46px;font-weight:300;letter-spacing:-1.5px;line-height:.9}.simui-hero-temp small{font-size:20px;color:var(--muted);font-weight:400}.simui-hero-sub{margin-top:8px;font-size:12px;color:var(--muted)}.simui-surface{background:var(--group, rgba(255, 255, 255, .035));border:1px solid var(--faint);border-radius:18px;padding:14px 15px}.simui-surface-head{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:11px;font-weight:500}.simui-rows{display:flex;flex-direction:column}.simui-rows.divided .simui-erow+.simui-erow{border-top:1px solid var(--faint)}.simui-master{display:flex;align-items:center;gap:10px;margin-bottom:10px}.simui-master-label{font-size:12px;color:var(--muted);width:26px}.simui-master-val{font-size:12px;color:var(--text);min-width:34px;text-align:right}.simui-erow{display:flex;align-items:center;gap:10px;padding:8px 0;min-width:0;width:100%;background:none;border:none;color:inherit;font:inherit;text-align:left}button.simui-erow,.simui-erow.as-row{cursor:pointer}.simui-erow-name{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.simui-erow-name.as-btn{background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-align:left;min-width:0}.simui-erow-name.muted{color:var(--muted)}.simui-erow-ic{display:inline-flex;flex:none;color:var(--muted)}.simui-erow-ic.amber{color:var(--warn)}.simui-erow-ic.cool{color:var(--accent)}.simui-erow-dot{flex:none;width:9px;height:9px;padding:0;border:none;border-radius:50%;background:#4b4f57;cursor:pointer}.simui-erow-dot[data-on=true]{background:var(--warm);box-shadow:0 0 0 3px color-mix(in srgb,var(--warm) 20%,transparent)}.simui-erow-state{font-size:12px;color:var(--muted)}.simui-erow-state.warn{color:var(--warn)}.simui-erow-state.on{color:var(--accent)}.simui-erow-val{font-size:13px;color:var(--text)}.simui-slider.mini{max-width:96px}.simui-rbtn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;border-radius:7px;border:1px solid var(--faint);background:transparent;color:var(--text);cursor:pointer}.simui-rbtn:hover{border-color:var(--accent);color:var(--accent)}';
class pb extends HTMLElement {
  constructor() {
    super(...arguments);
    Sa(this, "_root");
    Sa(this, "_mount");
    Sa(this, "_hass");
    Sa(this, "_listeners", /* @__PURE__ */ new Set());
    Sa(this, "_source");
  }
  set hass(o) {
    this._hass = o, this._listeners.forEach((r) => r());
  }
  get hass() {
    return this._hass;
  }
  set narrow(o) {
  }
  set route(o) {
  }
  set panel(o) {
  }
  connectedCallback() {
    if (!this._source) {
      const o = this;
      this._source = {
        subscribe(r) {
          return o._listeners.add(r), () => o._listeners.delete(r);
        },
        getStates: () => o._hass ? o._hass.states : {},
        callService: (r, m, d, g) => o._hass.callService(r, m, d, g),
        get connection() {
          return o._hass ? o._hass.connection : void 0;
        }
      };
    }
    if (!this._mount) {
      const o = document.createElement("style");
      o.textContent = yb, this.appendChild(o), this._mount = document.createElement("div"), this._mount.className = "simui-root", this.appendChild(this._mount), this._root = h0.createRoot(this._mount), this._root.render(
        /* @__PURE__ */ y.jsx(tp, { source: this._source, children: /* @__PURE__ */ y.jsx(gb, {}) })
      );
    }
  }
  disconnectedCallback() {
    this._root?.unmount(), this._root = void 0, this._mount = void 0;
  }
}
customElements.get("simui-panel") || customElements.define("simui-panel", pb);
