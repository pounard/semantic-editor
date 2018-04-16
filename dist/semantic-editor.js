(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SemanticEditor"] = factory();
	else
		root["SemanticEditor"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(11);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(5);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(25);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(8);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(27);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(12);
var has = __webpack_require__(16);
var SRC = __webpack_require__(11)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(6).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(4);
var invoke = __webpack_require__(36);
var html = __webpack_require__(37);
var cel = __webpack_require__(14);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(8)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(5);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
module.exports = __webpack_require__(45);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(0);
var ctx = __webpack_require__(4);
var classof = __webpack_require__(10);
var $export = __webpack_require__(24);
var isObject = __webpack_require__(3);
var aFunction = __webpack_require__(5);
var anInstance = __webpack_require__(28);
var forOf = __webpack_require__(29);
var speciesConstructor = __webpack_require__(35);
var task = __webpack_require__(18).set;
var microtask = __webpack_require__(38)();
var newPromiseCapabilityModule = __webpack_require__(19);
var perform = __webpack_require__(39);
var promiseResolve = __webpack_require__(40);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(43)(PROMISE);
Wrapper = __webpack_require__(6)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(44)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(6);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(15);
var ctx = __webpack_require__(4);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(14)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(4);
var call = __webpack_require__(30);
var isArrayIter = __webpack_require__(31);
var anObject = __webpack_require__(2);
var toLength = __webpack_require__(32);
var getIterFn = __webpack_require__(34);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(10);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(5);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(18).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(8)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var isObject = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(19);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_style_less__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__less_style_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__less_style_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__core__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__core__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__core__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Edit = __webpack_require__(53);
var Interface = __webpack_require__(54);
var Items = __webpack_require__(48);
var DEFAULT_CONFIGURATION_ITEMS = [Items.BlockQuote, Items.DefinitionBody, Items.DefinitionList, Items.DefinitionTitle, Items.Heading1, Items.Heading2, Items.Heading3, Items.Heading4, Items.Heading5, Items.Heading6, Items.ListItem, Items.OrderedList, Items.Paragraph, Items.UnorderedList];
function editor(root, config) {
    if (!root.querySelectorAll) {
        console.log(root + " is not a valid HtmlElement");
        return;
    }
    root.classList.add("semantic-editor");
    if (!config) {
        config = {
            items: DEFAULT_CONFIGURATION_ITEMS
        };
    }
    if (!config.items.length) {
        console.log(root + " is not a valid HtmlElement");
        return;
    }
    var editor = {
        config: config,
        document: root.ownerDocument,
        insertDialog: null,
        root: root,
        focusedElement: null
    };
    Interface.buildAddButons(editor);
    initAllItemsIn(editor);
    var testElement = editor.document.querySelector("#insert-blockquote-test");
    if (testElement) {
        testElement.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();
            insertItemAfter(Items.BlockQuote, editor, root.querySelector(":focus"));
        });
    }
}
exports.editor = editor;
function insertItemAfter(item, editor, current, doFocus) {
    if (doFocus === void 0) {
        doFocus = true;
    }
    if (!item.insertable) {
        throw "item is not insertable: " + item;
    }
    var element = editor.document.createElement(item.tagName);
    if (item.build) {
        item.build(element, editor);
    }
    if (current && current.parentElement) {
        current.parentElement.insertBefore(element, current.nextElementSibling);
    } else if (editor.focusedElement && editor.focusedElement.parentElement) {
        editor.focusedElement.parentElement.insertBefore(element, editor.focusedElement.nextElementSibling);
    } else {
        editor.root.appendChild(element);
    }
    initSingleItem(editor, element);
    initAllItemsIn(editor, element);
    if (element.isContentEditable) {
        element.focus();
    } else {
        var editable = element.querySelector("[contenteditable=\"true\"]");
        if (editable) {
            editable.focus();
        }
    }
}
exports.insertItemAfter = insertItemAfter;
function buildItemSelector(item) {
    var parts = [];
    var isValid = false;
    if (item.validParents && item.validParents.length) {
        isValid = true;
        for (var _i = 0, _a = item.validParents; _i < _a.length; _i++) {
            var parent_1 = _a[_i];
            parts.push(parent_1 + " > " + item.tagName);
        }
    }
    if (item.rootAllowed) {
        isValid = true;
        parts.push("" + item.tagName);
    }
    if (!isValid) {
        throw "item is not valid, it must have at least one valid parent or be allowed to root: " + item;
    }
    return parts.join(", ");
}
function matches(element, selectors, editor) {
    var found = editor.root.querySelectorAll(selectors);
    if (found.length) {
        for (var i = 0; i < found.length; i++) {
            if (found[i] === element) {
                return true;
            }
        }
    }
    return false;
}
function initAllItemsIn(editor, context) {
    if (!context) {
        context = editor.root;
    } else if (!editor.root.contains(context)) {
        throw "you cannot initialize an item that is not in the editor: " + context;
    }
    for (var _i = 0, _a = editor.config.items; _i < _a.length; _i++) {
        var item = _a[_i];
        var selectors = buildItemSelector(item);
        for (var _b = 0, _c = context.querySelectorAll(selectors); _b < _c.length; _b++) {
            var element = _c[_b];
            initItem(element, item, editor);
        }
    }
}
function initSingleItem(editor, element) {
    if (!editor.root.contains(element)) {
        throw "you cannot initialize an item that is not in the editor: " + element;
    }
    for (var _i = 0, _a = editor.config.items; _i < _a.length; _i++) {
        var item = _a[_i];
        var selectors = buildItemSelector(item);
        if (matches(element, selectors, editor)) {
            initItem(element, item, editor);
            return true;
        }
    }
    return false;
}
function initItem(element, item, editor) {
    if (element.getAttribute("data-ready")) {
        console.log("element is already initialized " + element);
        return;
    }
    element.setAttribute("data-ready", "1");
    if (item.editable) {
        initEditableItem(element, item, editor);
    }
}
function initEditableItem(element, item, editor) {
    element.contentEditable = "true";
    if (element.innerText.match(/^\s*$/)) {
        element.innerText = "\n";
    }
    element.addEventListener("focus", function (event) {
        editor.focusedElement = element;
        if (element.parentElement) {
            if (element.parentElement === editor.root) {
                Interface.refreshAddButtons(editor);
            } else {
                Interface.refreshAddButtons(editor, element.parentElement);
            }
        }
    });
    element.addEventListener("keypress", function (event) {
        if (!event.target) {
            return;
        }
        if (event.keyCode === 13) {
            if (!element.parentElement) {
                throw "element is invalid (has no parent): " + element;
            }
            event.stopPropagation();
            event.preventDefault();
            if (item.onEnterKeyPress) {
                item.onEnterKeyPress(element, editor);
            } else {
                var tagName = item.onEnterKeyPressCreateTag || "p";
                var sibling = editor.document.createElement(tagName);
                element.parentElement.insertBefore(sibling, element.nextElementSibling);
                initSingleItem(editor, sibling);
                sibling.innerText = "\n";
                sibling.focus();
            }
        } else if (event.keyCode === 8) {
            if (!element.parentElement) {
                throw "element is invalid (has no parent): " + element;
            }
            if (element.innerText === "" || element.innerText === "\n") {
                event.stopPropagation();
                event.preventDefault();
                if (!Edit.selectTabbablePrev(editor.root)) {
                    element.blur();
                }
                element.parentElement.removeChild(element);
            }
        } else if (event.keyCode === 46) {
            if (!element.parentElement) {
                throw "element is invalid (has no parent): " + element;
            }
            if (element.innerText === "" || element.innerText === "\n") {
                event.stopPropagation();
                event.preventDefault();
                if (!Edit.selectTabbableNext(editor.root)) {
                    element.blur();
                }
                element.parentElement.removeChild(element);
            } else if (Edit.getCursorPosition(element).atEnd) {
                event.stopPropagation();
                event.preventDefault();
                console.log("not implemented yet: I should move content from the next focusable element within here");
            }
        }
    });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.Paragraph = {
    tagName: "p",
    validParents: ["li"],
    rootAllowed: true,
    editable: true,
    insertable: true
};
exports.BlockQuote = {
    tagName: "blockquote",
    rootAllowed: true,
    insertable: true,
    build: function (target, editor) {
        return target.appendChild(editor.document.createElement("p"));
    }
};
exports.OrderedList = {
    tagName: "ol",
    rootAllowed: true,
    insertable: true,
    build: function (target, editor) {
        return target.appendChild(editor.document.createElement("li"));
    }
};
exports.UnorderedList = {
    tagName: "ul",
    rootAllowed: true,
    insertable: true,
    build: function (target, editor) {
        return target.appendChild(editor.document.createElement("li"));
    }
};
exports.ListItem = {
    tagName: "li",
    validParents: ["ol", "ul"],
    editable: true,
    onEnterKeyPressCreateTag: "li"
};
exports.DefinitionList = {
    tagName: "dl",
    rootAllowed: true,
    insertable: true,
    build: function (target, editor) {
        target.appendChild(editor.document.createElement("dt"));
        target.appendChild(editor.document.createElement("dd"));
    }
};
exports.DefinitionTitle = {
    tagName: "dt",
    validParents: ["dl"],
    editable: true,
    onEnterKeyPressCreateTag: "dd"
};
exports.DefinitionBody = {
    tagName: "dd",
    validParents: ["dl"],
    editable: true,
    onEnterKeyPressCreateTag: "dt"
};
exports.Heading1 = {
    tagName: "h1",
    rootAllowed: true,
    insertable: true,
    editable: true
};
exports.Heading2 = {
    tagName: "h2",
    rootAllowed: true,
    insertable: true,
    editable: true
};
exports.Heading3 = {
    tagName: "h3",
    rootAllowed: true,
    insertable: true,
    editable: true
};
exports.Heading4 = {
    tagName: "h4",
    rootAllowed: true,
    insertable: true,
    editable: true
};
exports.Heading5 = {
    tagName: "h5",
    rootAllowed: true,
    insertable: true,
    editable: true
};
exports.Heading6 = {
    tagName: "h6",
    rootAllowed: true,
    insertable: true,
    editable: true
};

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function changeCursorPosition(element, toStart) {
    var range, selection;
    if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(toStart);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.collapse(toStart);
        range.select();
    }
}
function changeCursorPositionToStart(element) {
    changeCursorPosition(element, true);
}
exports.changeCursorPositionToStart = changeCursorPositionToStart;
function changeCursorPositionToEnd(element) {
    changeCursorPosition(element, false);
}
exports.changeCursorPositionToEnd = changeCursorPositionToEnd;
function getCursorPosition(element) {
    var _document = element.ownerDocument;
    var _window = _document.defaultView || _document.parentWindow;
    var selection;
    var caretOffset = 0;
    var endOffset = 0;
    if (_window.getSelection) {
        selection = _window.getSelection();
        if (selection.rangeCount > 0) {
            var range = _window.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            endOffset = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((selection = _document.selection) && selection.type != "Control") {
        var textRange = selection.createRange();
        var preCaretTextRange = _document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return {
        position: caretOffset,
        selectionLength: endOffset + 1,
        atStart: caretOffset === 0,
        atEnd: caretOffset === endOffset
    };
}
exports.getCursorPosition = getCursorPosition;
function selectTabbablePrev(context, wrapLookup) {
    if (wrapLookup === void 0) {
        wrapLookup = false;
    }
    var current = context.querySelector(':focus');
    if (current) {
        var previous = null;
        var fallbackOnNext = false;
        for (var _i = 0, _a = context.querySelectorAll("[contenteditable=\"true\"]"); _i < _a.length; _i++) {
            var element = _a[_i];
            if (element === current) {
                if (previous) {
                    previous.focus();
                    changeCursorPositionToEnd(previous);
                    return true;
                } else {
                    fallbackOnNext = true;
                }
            } else if (fallbackOnNext) {
                element.focus();
                changeCursorPositionToEnd(element);
                return true;
            } else {
                previous = element;
            }
        }
    }
    if (wrapLookup) {
        var first = context.querySelector("[contenteditable=\"true\"]");
        if (first) {
            first.focus();
            changeCursorPositionToEnd(first);
            return true;
        }
    }
    return false;
}
exports.selectTabbablePrev = selectTabbablePrev;
function selectTabbableNext(context, wrapLookup) {
    if (wrapLookup === void 0) {
        wrapLookup = false;
    }
    var current = context.querySelector(':focus');
    if (current) {
        var isNext = false;
        for (var _i = 0, _a = context.querySelectorAll("[contenteditable=\"true\"]"); _i < _a.length; _i++) {
            var element = _a[_i];
            if (isNext) {
                element.focus();
                changeCursorPositionToStart(element);
                return true;
            } else if (element === current) {
                isNext = true;
            }
        }
    }
    if (wrapLookup) {
        var first = context.querySelector("[contenteditable=\"true\"]");
        if (first) {
            first.focus();
            changeCursorPositionToStart(first);
            return true;
        }
    }
    return false;
}
exports.selectTabbableNext = selectTabbableNext;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Core = __webpack_require__(47);
function buildAddButons(editor) {
    var dialog = editor.document.createElement("div");
    dialog.setAttribute("data-insert-dialog", "true");
    dialog.setAttribute("class", "semantic-editor-insert");
    var _loop_1 = function (item) {
        if (item.insertable) {
            var button_1 = editor.document.createElement("button");
            button_1.setAttribute("data-insert-tag", item.tagName);
            button_1.innerHTML = item.tagName;
            dialog.appendChild(button_1);
            button_1.addEventListener("click", function (event) {
                event.stopPropagation();
                event.preventDefault();
                if (!button_1.disabled) {
                    Core.insertItemAfter(item, editor);
                }
            });
        }
    };
    for (var _i = 0, _a = editor.config.items; _i < _a.length; _i++) {
        var item = _a[_i];
        _loop_1(item);
    }
    editor.insertDialog = dialog;
    editor.root.parentElement.insertBefore(dialog, editor.root);
    return dialog;
}
exports.buildAddButons = buildAddButons;
function refreshAddButtons(editor, target) {
    if (editor.insertDialog) {
        for (var _i = 0, _a = editor.config.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var button = editor.insertDialog.querySelector("[data-insert-tag=\"" + item.tagName + "\"]");
            if (button) {
                button.disabled = true;
                if (target) {
                    if (item.validParents) {
                        for (var _b = 0, _c = item.validParents; _b < _c.length; _b++) {
                            var validParent = _c[_b];
                            if (target.tagName === validParent) {
                                button.disabled = false;
                                continue;
                            }
                        }
                    }
                } else {
                    button.disabled = !item.rootAllowed;
                }
            }
        }
    }
}
exports.refreshAddButtons = refreshAddButtons;

/***/ })
/******/ ]);
});