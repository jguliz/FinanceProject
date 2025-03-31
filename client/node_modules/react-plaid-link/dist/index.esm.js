import react, { useState, useEffect } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var useScript_1 = createCommonjsModule(function (module, exports) {

var __rest = commonjsGlobal && commonjsGlobal.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});



function useScript(_a) {
  var src = _a.src,
      _b = _a.checkForExisting,
      checkForExisting = _b === void 0 ? false : _b,
      attributes = __rest(_a, ["src", "checkForExisting"]);

  var _c = react.useState(true),
      loading = _c[0],
      setLoading = _c[1];

  var _d = react.useState(null),
      error = _d[0],
      setError = _d[1];

  react.useEffect(function () {
    if (!isBrowser) return;

    if (checkForExisting) {
      var existing = document.querySelectorAll("script[src=\"" + src + "\"]");

      if (existing.length > 0) {
        setLoading(false);
        return;
      }
    }

    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', src);
    Object.keys(attributes).forEach(function (key) {
      if (scriptEl[key] === undefined) {
        scriptEl.setAttribute(key, attributes[key]);
      } else {
        scriptEl[key] = attributes[key];
      }
    });

    var handleLoad = function () {
      setLoading(false);
    };

    var handleError = function (error) {
      setError(error);
    };

    scriptEl.addEventListener('load', handleLoad);
    scriptEl.addEventListener('error', handleError);
    document.body.appendChild(scriptEl);
    return function () {
      scriptEl.removeEventListener('load', handleLoad);
      scriptEl.removeEventListener('error', handleError);
    }; // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  return [loading, error];
}

exports.default = useScript;
var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
});

unwrapExports(useScript_1);

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



exports.default = useScript_1.default;
});

var useScript = unwrapExports(lib);

var renameKeyInObject = function renameKeyInObject(o, oldKey, newKey) {
  var newObject = {};
  delete Object.assign(newObject, o, _defineProperty({}, newKey, o[oldKey]))[oldKey];
  return newObject;
};
/**
 * Wrap link handler creation and instance to clean up iframe via destroy() method
 */


var createPlaid = function createPlaid(options) {
  var state = {
    plaid: null,
    open: false,
    onExitCallback: null
  }; // If Plaid is not available, throw an Error

  if (typeof window === 'undefined' || !window.Plaid) {
    throw new Error('Plaid not loaded');
  }

  var config = renameKeyInObject(options, 'publicKey', 'key');
  state.plaid = window.Plaid.create(_objectSpread2({}, config, {
    onExit: function onExit() {
      config.onExit && config.onExit.apply(config, arguments);
      state.onExitCallback && state.onExitCallback();
    }
  }));

  var open = function open() {
    if (!state.plaid) {
      return;
    }

    state.open = true;
    state.onExitCallback = null;
    state.plaid.open();
  };

  var exit = function exit(exitOptions, callback) {
    if (!state.open || !state.plaid) {
      callback && callback();
      return;
    }

    state.onExitCallback = callback;
    state.plaid.exit(exitOptions);

    if (exitOptions && exitOptions.force) {
      state.open = false;
    }
  };

  var destroy = function destroy() {
    if (!state.plaid) {
      return;
    }

    state.plaid.destroy();
    state.plaid = null;
  };

  return {
    open: open,
    exit: exit,
    destroy: destroy
  };
};

var PLAID_LINK_STABLE_URL = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';

var noop = function noop() {};
/**
 * This hook loads Plaid script and manages the Plaid Link creation for you.
 * You get easy open & exit methods to call and loading & error states.
 *
 * This will destroy the Plaid UI on un-mounting so it's up to you to be
 * graceful to the user.
 *
 * A new Plaid instance is created every time the token and products options change.
 * It's up to you to prevent unnecessary re-creations on re-render.
 */


var usePlaidLink = function usePlaidLink(options) {
  // Asynchronously load the plaid/link/stable url into the DOM
  var _useScript = useScript({
    src: PLAID_LINK_STABLE_URL,
    checkForExisting: true
  }),
      _useScript2 = _slicedToArray(_useScript, 2),
      loading = _useScript2[0],
      error = _useScript2[1]; // internal state


  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      plaid = _useState2[0],
      setPlaid = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      iframeLoaded = _useState4[0],
      setIframeLoaded = _useState4[1];

  useEffect(function () {
    // If the link.js script is still loading, return prematurely
    if (loading) {
      return;
    }

    if (error || !window.Plaid) {
      // eslint-disable-next-line no-console
      console.error('Error loading Plaid', error);
      return;
    } // if an old plaid instance exists, destroy it before
    // creating a new one


    if (plaid != null) {
      plaid.exit({
        force: true
      }, function () {
        return plaid.destroy();
      });
    }

    var next = createPlaid(_objectSpread2({}, options, {
      onLoad: function onLoad() {
        setIframeLoaded(true);
        options.onLoad && options.onLoad();
      }
    }));
    setPlaid(next); // destroy the Plaid iframe factory

    return function () {
      return next.exit({
        force: true
      }, function () {
        return next.destroy();
      });
    };
  }, [loading, error, options.token, (options.product || []).slice().sort().join(',')]);
  return {
    error: error,
    ready: !loading || iframeLoaded,
    exit: plaid ? plaid.exit : noop,
    open: plaid ? plaid.open : noop
  };
};

var PlaidLink = function PlaidLink(props) {
  var children = props.children,
      style = props.style,
      className = props.className,
      config = _objectWithoutProperties(props, ["children", "style", "className"]);

  var _usePlaidLink = usePlaidLink(_objectSpread2({}, config)),
      error = _usePlaidLink.error,
      open = _usePlaidLink.open;

  return react.createElement("button", {
    disabled: Boolean(error),
    type: "button",
    className: className,
    style: _objectSpread2({
      padding: '6px 4px',
      outline: 'none',
      background: '#FFFFFF',
      border: '2px solid #F1F1F1',
      borderRadius: '4px'
    }, style),
    onClick: function onClick() {
      return open();
    }
  }, children);
};
PlaidLink.displayName = 'PlaidLink';

export { PlaidLink, usePlaidLink };
