var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
import t, { createElement, useMemo, useRef, useState, useCallback, useEffect } from "react";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x2) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x2) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k2) {
          return "key" !== k2;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        maybeKey,
        getOwner(),
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node2) {
      isValidElement(node2) ? node2._store && (node2._store.validated = 1) : "object" === typeof node2 && null !== node2 && node2.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node2._payload.status ? isValidElement(node2._payload.value) && node2._payload.value._store && (node2._payload.value._store.validated = 1) : node2._store && (node2._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = t, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  }();
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
const isValidProp = (prop) => {
  return Boolean(prop && prop.length > 0);
};
const logMagnifierError = (message) => {
  console.log(
    `%c ReactMagnifier Error: ${message}`,
    "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;"
  );
};
const triggerCustomEvent = (eventType, element) => {
  if (element) {
    const event = new CustomEvent(eventType, { detail: element });
    element.dispatchEvent(event);
  }
};
const getCursorPos = (event, imageElement) => {
  if (!imageElement) {
    return { x: 0, y: 0 };
  }
  const rect = imageElement.getBoundingClientRect();
  let x2 = 0;
  let y2 = 0;
  if (event instanceof MouseEvent) {
    x2 = event.pageX - rect.left;
    y2 = event.pageY - rect.top;
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    x2 = event.touches[0].pageX - rect.left;
    y2 = event.touches[0].pageY - rect.top;
  }
  x2 = x2 - window.pageXOffset;
  y2 = y2 - window.pageYOffset;
  return { x: x2, y: y2 };
};
const createMagnifierGlass = (container, imageElement, props) => {
  if (!container || !imageElement) {
    return null;
  }
  const glass = document.createElement("div");
  glass.setAttribute("class", "react-magnifier-glass");
  glass.setAttribute("role", "img");
  glass.setAttribute("aria-label", "Image magnifier");
  glass.classList.add("hide-magnifier");
  glass.style.width = `${props.magnifierWidth}px`;
  glass.style.height = `${props.magnifierHeight}px`;
  glass.style.borderRadius = `${props.magnifierRadius}%`;
  glass.style.border = `${props.magnifierBorderWidth}px ${props.magnifierBorderStyle} ${props.magnifierBorderColor}`;
  glass.style.cursor = props.cursor;
  glass.style.boxShadow = props.magnifierShadow ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" : "none";
  glass.style.backgroundImage = `url('${imageElement.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${imageElement.width * props.zoomSize}px ${imageElement.height * props.zoomSize}px`;
  container.insertBefore(glass, imageElement);
  return glass;
};
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
function filter(array, pattern) {
  return array.filter(function(value) {
    return !match(value, pattern);
  });
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
  while (root.root)
    root = copy(root.root, { children: [root] });
  append(root, root.siblings);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && (strlen(characters2) - length2 || variable === 0 && previous === 47))
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else {
                switch (atrule) {
                  case 99:
                    if (charat(characters2, 3) === 110) break;
                  case 108:
                    if (charat(characters2, 2) === 97) break;
                  default:
                    offset = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
              }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return WEBKIT + value + value;
    case 4855:
      return WEBKIT + value.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /space-between/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_2, a2, b2, c2, d2, e, f2) {
        return MS + a2 + ":" + b2 + f2 + (c2 ? MS + a2 + "-span:" + (d2 ? e : +e - +b2) + f2 : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  for (var i2 = 0; i2 < children.length; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case NAMESPACE:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i2 = 0; i2 < length2; i2++)
      output += collection[i2](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(children = element.props, function(value) {
              switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
                case "::placeholder":
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
              }
              return "";
            });
      }
  }
}
var r, i;
const c = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", a = "active", l = "data-styled-version", u = "6.4.4", h = "/*!sc*/\n", d = "undefined" != typeof window && "undefined" != typeof document;
function p(e) {
  if ("undefined" != typeof process && void 0 !== process.env) {
    const t2 = process.env[e];
    if (void 0 !== t2 && "" !== t2) return "false" !== t2;
  }
}
const f = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : null !== (i = null !== (r = p("REACT_APP_SC_DISABLE_SPEEDY")) && void 0 !== r ? r : p("SC_DISABLE_SPEEDY")) && void 0 !== i ? i : "undefined" != typeof process && void 0 !== process.env && "production" !== process.env.NODE_ENV), m = "sc-keyframes-", y = {}, g = "production" !== process.env.NODE_ENV ? { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n\n", 18: "Accessing `useTheme` hook outside of a `<ThemeProvider>` element.\n\n```jsx\nimport { useTheme } from 'styled-components';\nexport function StyledCompoent({ children }) {\n  const theme = useTheme();\n  return <div style={{ width: theme.sizes.full }}>{children}</div>;\n}\n\nimport { StyledComponent } from './StyledComponent';\nimport { theme } from './theme';\nexport function App() {\n  return (\n    <ThemeProvider theme={theme}>\n      <StyledComponent />\n    </ThemeProvider>\n  );\n}\n```\n\nIf you need access to the theme in an uncertain composition scenario, `React.useContext(ThemeContext)` will not emit an error if there is no `ThemeProvider` ancestor.\n" } : {};
function v(e, ...t2) {
  return "production" === process.env.NODE_ENV ? new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t2.length > 0 ? ` Args: ${t2.join(", ")}` : ""}`) : new Error(function(...e2) {
    let t3 = e2[0];
    const n = [];
    for (let t4 = 1, o = e2.length; t4 < o; t4 += 1) n.push(e2[t4]);
    return n.forEach((e3) => {
      t3 = t3.replace(/%[a-z]/, e3);
    }), t3;
  }(g[e], ...t2).trim());
}
const S = 1 << 30;
let b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), N = 1;
const C = (e) => {
  if (b.has(e)) return b.get(e);
  for (; w.has(N); ) N++;
  const t2 = N++;
  if ("production" !== process.env.NODE_ENV && ((0 | t2) < 0 || t2 > S)) throw v(16, `${t2}`);
  return b.set(e, t2), w.set(t2, e), t2;
}, O = (e) => w.get(e), E = (e, t2) => {
  N = t2 + 1, b.set(e, t2), w.set(t2, e);
}, A = /invalid hook call/i, P = /* @__PURE__ */ new Set(), _ = (e, n) => {
  if ("production" !== process.env.NODE_ENV) {
    const o = `The component ${e}${n ? ` with the id of "${n}"` : ""} has been created dynamically.
You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.
See https://styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method for more info.
`, s = console.error;
    try {
      let e2 = true;
      console.error = (t2, ...n2) => {
        A.test(t2) ? (e2 = false, P.delete(o)) : s(t2, ...n2);
      }, "function" == typeof t.useState && t.useState(null), e2 && !P.has(o) && (console.warn(o), P.add(o));
    } catch (e2) {
      A.test(e2.message) && P.delete(o);
    } finally {
      console.error = s;
    }
  }
}, I = Object.freeze([]), $ = Object.freeze({});
function R(e, t2, n = $) {
  return e.theme !== n.theme && e.theme || t2 || n.theme;
}
const j = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, x = /(^-|-$)/g;
function T(e) {
  return e.replace(j, "-").replace(x, "");
}
const k = /(a)(d)/gi, D = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97));
function V(e) {
  let t2, n = "";
  for (t2 = Math.abs(e); t2 > 52; t2 = t2 / 52 | 0) n = D(t2 % 52) + n;
  return (D(t2 % 52) + n).replace(k, "$1-$2");
}
const M = 5381, G = (e, t2) => {
  let n = t2.length;
  for (; n; ) e = 33 * e ^ t2.charCodeAt(--n);
  return e;
}, F = (e) => G(M, e);
function z(e) {
  return V(F(e) >>> 0);
}
function W(e) {
  return "production" !== process.env.NODE_ENV && "string" == typeof e && e || e.displayName || e.name || "Component";
}
function L(e) {
  return "string" == typeof e && ("production" === process.env.NODE_ENV || e.charAt(0) === e.charAt(0).toLowerCase());
}
function B(e) {
  return L(e) ? `styled.${e}` : `Styled(${W(e)})`;
}
const q = Symbol.for("react.memo"), H = Symbol.for("react.forward_ref"), Y = { contextType: true, defaultProps: true, displayName: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, propTypes: true, type: true }, U = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, J = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, X = { [H]: { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, [q]: J };
function K(e) {
  return ("type" in (t2 = e) && t2.type.$$typeof) === q ? J : "$$typeof" in e ? X[e.$$typeof] : Y;
  var t2;
}
const Q = Object.defineProperty, Z = Object.getOwnPropertyNames, ee = Object.getOwnPropertySymbols, te = Object.getOwnPropertyDescriptor, ne = Object.getPrototypeOf, oe = Object.prototype;
function se(e, t2, n) {
  if ("string" != typeof t2) {
    const o = ne(t2);
    o && o !== oe && se(e, o, n);
    const s = Z(t2).concat(ee(t2)), r2 = K(e), i2 = K(t2);
    for (let o2 = 0; o2 < s.length; ++o2) {
      const c2 = s[o2];
      if (!(c2 in U || n && n[c2] || i2 && c2 in i2 || r2 && c2 in r2)) {
        const n2 = te(t2, c2);
        try {
          Q(e, c2, n2);
        } catch (e2) {
        }
      }
    }
  }
  return e;
}
function re(e) {
  return "function" == typeof e;
}
const ie = Symbol.for("react.forward_ref");
function ce(e) {
  return null != e && ("object" == typeof e || "function" == typeof e) && e.$$typeof === ie && "styledComponentId" in e;
}
function ae(e, t2) {
  return e && t2 ? e + " " + t2 : e || t2 || "";
}
function le(e, t2) {
  return e.join("");
}
function ue(e) {
  return null !== e && "object" == typeof e && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function he(e, t2, n = false) {
  if (!n && !ue(e) && !Array.isArray(e)) return t2;
  if (Array.isArray(t2)) for (let n2 = 0; n2 < t2.length; n2++) e[n2] = he(e[n2], t2[n2]);
  else if (ue(t2)) for (const n2 in t2) e[n2] = he(e[n2], t2[n2]);
  return e;
}
function de(e, t2) {
  Object.defineProperty(e, "toString", { value: t2 });
}
const pe = class {
  constructor(e) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e, this._cGroup = 0, this._cIndex = 0;
  }
  indexOfGroup(e) {
    if (e === this._cGroup) return this._cIndex;
    let t2 = this._cIndex;
    if (e > this._cGroup) for (let n = this._cGroup; n < e; n++) t2 += this.groupSizes[n];
    else for (let n = this._cGroup - 1; n >= e; n--) t2 -= this.groupSizes[n];
    return this._cGroup = e, this._cIndex = t2, t2;
  }
  insertRules(e, t2) {
    if (e >= this.groupSizes.length) {
      const t3 = this.groupSizes, n2 = t3.length;
      let o2 = n2;
      for (; e >= o2; ) if (o2 <<= 1, o2 < 0) throw v(16, `${e}`);
      this.groupSizes = new Uint32Array(o2), this.groupSizes.set(t3), this.length = o2;
      for (let e2 = n2; e2 < o2; e2++) this.groupSizes[e2] = 0;
    }
    let n = this.indexOfGroup(e + 1), o = 0;
    for (let s = 0, r2 = t2.length; s < r2; s++) this.tag.insertRule(n, t2[s]) && (this.groupSizes[e]++, n++, o++);
    o > 0 && this._cGroup > e && (this._cIndex += o);
  }
  clearGroup(e) {
    if (e < this.length) {
      const t2 = this.groupSizes[e], n = this.indexOfGroup(e), o = n + t2;
      this.groupSizes[e] = 0;
      for (let e2 = n; e2 < o; e2++) this.tag.deleteRule(n);
      t2 > 0 && this._cGroup > e && (this._cIndex -= t2);
    }
  }
  getGroup(e) {
    let t2 = "";
    if (e >= this.length || 0 === this.groupSizes[e]) return t2;
    const n = this.groupSizes[e], o = this.indexOfGroup(e), s = o + n;
    for (let e2 = o; e2 < s; e2++) t2 += this.tag.getRule(e2) + h;
    return t2;
  }
}, fe = `style[${c}][${l}="${u}"]`, me = new RegExp(`^${c}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`), ye = (e) => "undefined" != typeof ShadowRoot && e instanceof ShadowRoot || "host" in e && 11 === e.nodeType, ge = (e) => {
  if (!e) return document;
  if (ye(e)) return e;
  if ("getRootNode" in e) {
    const t2 = e.getRootNode();
    if (ye(t2)) return t2;
  }
  return document;
}, ve = (e, t2, n) => {
  const o = n.split(",");
  let s;
  for (let n2 = 0, r2 = o.length; n2 < r2; n2++) (s = o[n2]) && e.registerName(t2, s);
}, Se = (e, t2) => {
  var n;
  const o = (null !== (n = t2.textContent) && void 0 !== n ? n : "").split(h), s = [];
  for (let t3 = 0, n2 = o.length; t3 < n2; t3++) {
    const n3 = o[t3].trim();
    if (!n3) continue;
    const r2 = n3.match(me);
    if (r2) {
      const t4 = 0 | parseInt(r2[1], 10), n4 = r2[2];
      0 !== t4 && (E(n4, t4), ve(e, n4, r2[3]), e.getTag().insertRules(t4, s)), s.length = 0;
    } else s.push(n3);
  }
}, be = (e) => {
  const t2 = ge(e.options.target).querySelectorAll(fe);
  for (let n = 0, o = t2.length; n < o; n++) {
    const o2 = t2[n];
    o2 && o2.getAttribute(c) !== a && (Se(e, o2), o2.parentNode && o2.parentNode.removeChild(o2));
  }
};
let we = false;
function Ne() {
  if (false !== we) return we;
  if ("undefined" != typeof document) {
    const e = document.head.querySelector('meta[property="csp-nonce"]');
    if (e) return we = e.nonce || e.getAttribute("content") || void 0;
    const t2 = document.head.querySelector('meta[name="sc-nonce"]');
    if (t2) return we = t2.getAttribute("content") || void 0;
  }
  return we = "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0;
}
const Ce = (e, t2) => {
  const n = document.head, o = e || n, s = document.createElement("style"), r2 = ((e2) => {
    const t3 = Array.from(e2.querySelectorAll(`style[${c}]`));
    return t3[t3.length - 1];
  })(o), i2 = void 0 !== r2 ? r2.nextSibling : null;
  s.setAttribute(c, a), s.setAttribute(l, u);
  const h2 = t2 || Ne();
  return h2 && s.setAttribute("nonce", h2), o.insertBefore(s, i2), s;
}, Oe = class {
  constructor(e, t2) {
    this.element = Ce(e, t2), this.element.appendChild(document.createTextNode("")), this.sheet = ((e2) => {
      var t3;
      if (e2.sheet) return e2.sheet;
      const n = null !== (t3 = e2.getRootNode().styleSheets) && void 0 !== t3 ? t3 : document.styleSheets;
      for (let t4 = 0, o = n.length; t4 < o; t4++) {
        const o2 = n[t4];
        if (o2.ownerNode === e2) return o2;
      }
      throw v(17);
    })(this.element), this.length = 0;
  }
  insertRule(e, t2) {
    try {
      return this.sheet.insertRule(t2, e), this.length++, true;
    } catch (e2) {
      return false;
    }
  }
  deleteRule(e) {
    this.sheet.deleteRule(e), this.length--;
  }
  getRule(e) {
    const t2 = this.sheet.cssRules[e];
    return t2 && t2.cssText ? t2.cssText : "";
  }
}, Ee = class {
  constructor(e, t2) {
    this.element = Ce(e, t2), this.nodes = this.element.childNodes, this.length = 0;
  }
  insertRule(e, t2) {
    if (e <= this.length && e >= 0) {
      const n = document.createTextNode(t2);
      return this.element.insertBefore(n, this.nodes[e] || null), this.length++, true;
    }
    return false;
  }
  deleteRule(e) {
    this.element.removeChild(this.nodes[e]), this.length--;
  }
  getRule(e) {
    return e < this.length ? this.nodes[e].textContent : "";
  }
};
let Ae = d;
const Pe = { isServer: !d, useCSSOMInjection: !f };
class _e {
  static registerId(e) {
    return C(e);
  }
  constructor(e = $, t2 = {}, n) {
    this.options = Object.assign(Object.assign({}, Pe), e), this.gs = t2, this.keyframeIds = /* @__PURE__ */ new Set(), this.names = new Map(n), this.server = !!e.isServer, !this.server && d && Ae && (Ae = false, be(this)), de(this, () => ((e2) => {
      const t3 = e2.getTag(), { length: n2 } = t3;
      let o = "";
      for (let s = 0; s < n2; s++) {
        const n3 = O(s);
        if (void 0 === n3) continue;
        const r2 = e2.names.get(n3);
        if (void 0 === r2 || !r2.size) continue;
        const i2 = t3.getGroup(s);
        if (0 === i2.length) continue;
        const a2 = c + ".g" + s + '[id="' + n3 + '"]';
        let l2 = "";
        for (const e3 of r2) e3.length > 0 && (l2 += e3 + ",");
        o += i2 + a2 + '{content:"' + l2 + '"}' + h;
      }
      return o;
    })(this));
  }
  rehydrate() {
    !this.server && d && be(this);
  }
  reconstructWithOptions(e, t2 = true) {
    const n = new _e(Object.assign(Object.assign({}, this.options), e), this.gs, t2 && this.names || void 0);
    return n.keyframeIds = new Set(this.keyframeIds), !this.server && d && e.target !== this.options.target && ge(this.options.target) !== ge(e.target) && be(n), n;
  }
  allocateGSInstance(e) {
    return this.gs[e] = (this.gs[e] || 0) + 1;
  }
  getTag() {
    return this.tag || (this.tag = (e = (({ useCSSOMInjection: e2, target: t2, nonce: n }) => e2 ? new Oe(t2, n) : new Ee(t2, n))(this.options), new pe(e)));
    var e;
  }
  hasNameForId(e, t2) {
    var n, o;
    return null !== (o = null === (n = this.names.get(e)) || void 0 === n ? void 0 : n.has(t2)) && void 0 !== o && o;
  }
  registerName(e, t2) {
    C(e), e.startsWith(m) && this.keyframeIds.add(e);
    const n = this.names.get(e);
    n ? n.add(t2) : this.names.set(e, /* @__PURE__ */ new Set([t2]));
  }
  insertRules(e, t2, n) {
    this.registerName(e, t2), this.getTag().insertRules(C(e), n);
  }
  clearNames(e) {
    this.names.has(e) && this.names.get(e).clear();
  }
  clearRules(e) {
    this.getTag().clearGroup(C(e)), this.clearNames(e);
  }
  clearTag() {
    this.tag = void 0;
  }
}
const Ie = /* @__PURE__ */ new WeakSet(), $e = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexShrink: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, scale: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
function Re(e, t2) {
  return null == t2 || "boolean" == typeof t2 || "" === t2 ? "" : "number" != typeof t2 || 0 === t2 || e in $e || e.startsWith("--") ? String(t2).trim() : t2 + "px";
}
const je = 47;
function xe(e) {
  if (45 === e.charCodeAt(0) && 45 === e.charCodeAt(1)) return e;
  let t2 = "";
  for (let n = 0; n < e.length; n++) {
    const o = e.charCodeAt(n);
    t2 += o >= 65 && o <= 90 ? "-" + String.fromCharCode(o + 32) : e[n];
  }
  return t2.startsWith("ms-") ? "-" + t2 : t2;
}
const Te = Symbol.for("sc-keyframes");
function ke(e) {
  return "object" == typeof e && null !== e && Te in e;
}
function De(e) {
  return re(e) && !(e.prototype && e.prototype.isReactComponent);
}
const Ve = (e) => null == e || false === e || "" === e, Me = Symbol.for("react.client.reference");
function Ge(e) {
  return e.$$typeof === Me;
}
function Fe(e) {
  const t2 = e.$$id, n = (t2 && t2.includes("#") ? t2.split("#").pop() : t2) || e.name || "unknown";
  console.warn(`Interpolating a client component (${n}) as a selector is not supported in server components. The component selector pattern requires access to the component's internal class name, which is not available across the server/client boundary. Use a plain CSS class selector instead.`);
}
function ze(e, t2) {
  for (const n in e) {
    const o = e[n];
    e.hasOwnProperty(n) && !Ve(o) && (Array.isArray(o) && Ie.has(o) || re(o) ? t2.push(xe(n) + ":", o, ";") : ue(o) ? (t2.push(n + " {"), ze(o, t2), t2.push("}")) : t2.push(xe(n) + ": " + Re(n, o) + ";"));
  }
}
function We(e, t2, n, o, s = []) {
  if (Ve(e)) return s;
  const r2 = typeof e;
  if ("string" === r2) return s.push(e), s;
  if ("function" === r2) {
    if (Ge(e)) return "production" !== process.env.NODE_ENV && Fe(e), s;
    if (De(e) && t2) {
      const r3 = e(t2);
      return "production" === process.env.NODE_ENV || "object" != typeof r3 || Array.isArray(r3) || ke(r3) || ue(r3) || null === r3 || console.error(`${W(e)} is not a styled component and cannot be referred to via component selector. See https://styled-components.com/docs/advanced#referring-to-other-components for more details.`), We(r3, t2, n, o, s);
    }
    return s.push(e), s;
  }
  if (Array.isArray(e)) {
    for (let r3 = 0; r3 < e.length; r3++) We(e[r3], t2, n, o, s);
    return s;
  }
  return ce(e) ? (s.push(`.${e.styledComponentId}`), s) : ke(e) ? (n ? (e.inject(n, o), s.push(e.getName(o))) : s.push(e), s) : Ge(e) ? ("production" !== process.env.NODE_ENV && Fe(e), s) : ue(e) ? e.toString !== Object.prototype.toString ? (s.push(e.toString()), s) : (ze(e, s), s) : (s.push(e.toString()), s);
}
const Le = F(u);
class Be {
  constructor(e, t2, n) {
    this.rules = e, this.componentId = t2, this.baseHash = G(Le, t2), this.baseStyle = n, _e.registerId(t2);
  }
  generateAndInjectStyles(e, t2, n) {
    let o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, t2, n) : "";
    {
      let s = "";
      for (let o2 = 0; o2 < this.rules.length; o2++) {
        const r2 = this.rules[o2];
        if ("string" == typeof r2) s += r2;
        else if (r2) if (De(r2)) {
          const o3 = r2(e);
          "string" == typeof o3 ? s += o3 : null != o3 && false !== o3 && ("production" === process.env.NODE_ENV || "object" != typeof o3 || Array.isArray(o3) || ke(o3) || ue(o3) || console.error(`${W(r2)} is not a styled component and cannot be referred to via component selector. See https://styled-components.com/docs/advanced#referring-to-other-components for more details.`), s += le(We(o3, e, t2, n)));
        } else s += le(We(r2, e, t2, n));
      }
      if (s) {
        this.dynamicNameCache || (this.dynamicNameCache = /* @__PURE__ */ new Map());
        const e2 = n.hash ? n.hash + s : s;
        let r2 = this.dynamicNameCache.get(e2);
        if (!r2) {
          if (r2 = V(G(G(this.baseHash, n.hash), s) >>> 0), this.dynamicNameCache.size >= 200) {
            const e3 = this.dynamicNameCache.keys().next().value;
            void 0 !== e3 && this.dynamicNameCache.delete(e3);
          }
          this.dynamicNameCache.set(e2, r2);
        }
        if (!t2.hasNameForId(this.componentId, r2)) {
          const e3 = n(s, "." + r2, void 0, this.componentId);
          t2.insertRules(this.componentId, r2, e3);
        }
        o = ae(o, r2);
      }
    }
    return o;
  }
}
const qe = /&/g;
function He(e, t2) {
  let n = 0;
  for (; --t2 >= 0 && 92 === e.charCodeAt(t2); ) n++;
  return !(1 & ~n);
}
function Ye(e) {
  const t2 = e.length;
  let n = "", o = 0, s = 0, r2 = 0, i2 = false, c2 = false;
  for (let a2 = 0; a2 < t2; a2++) {
    const l2 = e.charCodeAt(a2);
    if (0 !== r2 || i2 || l2 !== je || 42 !== e.charCodeAt(a2 + 1)) if (i2) 42 === l2 && e.charCodeAt(a2 + 1) === je && (i2 = false, a2++);
    else if (34 !== l2 && 39 !== l2 || He(e, a2)) {
      if (0 === r2) if (123 === l2) s++;
      else if (125 === l2) {
        if (s--, s < 0) {
          c2 = true;
          let n2 = a2 + 1;
          for (; n2 < t2; ) {
            const t3 = e.charCodeAt(n2);
            if (59 === t3 || 10 === t3) break;
            n2++;
          }
          n2 < t2 && 59 === e.charCodeAt(n2) && n2++, s = 0, a2 = n2 - 1, o = n2;
          continue;
        }
        0 === s && (n += e.substring(o, a2 + 1), o = a2 + 1);
      } else 59 === l2 && 0 === s && (n += e.substring(o, a2 + 1), o = a2 + 1);
    } else 0 === r2 ? r2 = l2 : r2 === l2 && (r2 = 0);
    else i2 = true, a2++;
  }
  return c2 || 0 !== s || 0 !== r2 ? (o < t2 && 0 === s && 0 === r2 && (n += e.substring(o)), n) : e;
}
function Ue(e, t2) {
  const n = t2 + " ", o = "," + n;
  for (let s = 0; s < e.length; s++) {
    const r2 = e[s];
    if ("rule" === r2.type) {
      r2.value = (n + r2.value).replaceAll(",", o);
      const e2 = r2.props, t3 = [];
      for (let o2 = 0; o2 < e2.length; o2++) t3[o2] = n + e2[o2];
      r2.props = t3;
    }
    Array.isArray(r2.children) && "@keyframes" !== r2.type && Ue(r2.children, t2);
  }
  return e;
}
function Je({ options: e = $, plugins: t2 = I } = $) {
  let n, s, r2;
  const i2 = (e2, t3, o) => o.startsWith(s) && o.endsWith(s) && o.replaceAll(s, "").length > 0 ? `.${n}` : e2, c2 = t2.slice();
  c2.push((e2) => {
    e2.type === RULESET && e2.value.includes("&") && (r2 || (r2 = new RegExp(`\\${s}\\b`, "g")), e2.props[0] = e2.props[0].replace(qe, s).replace(r2, i2));
  }), e.prefix && c2.push(prefixer), c2.push(stringify);
  let a2 = [];
  const l2 = middleware(c2.concat(rulesheet((e2) => a2.push(e2)))), u2 = (t3, i3 = "", c3 = "", u3 = "&") => {
    n = u3, s = i3, r2 = void 0;
    const h3 = function(e2) {
      const t4 = -1 !== e2.indexOf("//"), n2 = -1 !== e2.indexOf("}");
      if (!t4 && !n2) return e2;
      if (!t4) return Ye(e2);
      const o = e2.length;
      let s2 = "", r3 = 0, i4 = 0, c4 = 0, a3 = 0, l3 = 0, u4 = false;
      for (; i4 < o; ) {
        const t5 = e2.charCodeAt(i4);
        if (34 !== t5 && 39 !== t5 || He(e2, i4)) if (0 === c4) if (t5 === je && i4 + 1 < o && 42 === e2.charCodeAt(i4 + 1)) {
          for (i4 += 2; i4 + 1 < o && (42 !== e2.charCodeAt(i4) || e2.charCodeAt(i4 + 1) !== je); ) i4++;
          i4 += 2;
        } else if (40 !== t5) if (41 !== t5) if (a3 > 0) i4++;
        else if (42 === t5 && i4 + 1 < o && e2.charCodeAt(i4 + 1) === je) s2 += e2.substring(r3, i4), i4 += 2, r3 = i4, u4 = true;
        else if (t5 === je && i4 + 1 < o && e2.charCodeAt(i4 + 1) === je) {
          for (s2 += e2.substring(r3, i4); i4 < o && 10 !== e2.charCodeAt(i4); ) i4++;
          r3 = i4, u4 = true;
        } else 123 === t5 ? l3++ : 125 === t5 && l3--, i4++;
        else a3 > 0 && a3--, i4++;
        else a3++, i4++;
        else i4++;
        else 0 === c4 ? c4 = t5 : c4 === t5 && (c4 = 0), i4++;
      }
      return u4 ? (r3 < o && (s2 += e2.substring(r3)), 0 === l3 ? s2 : Ye(s2)) : 0 === l3 ? e2 : Ye(e2);
    }(t3);
    let d3 = compile(c3 || i3 ? c3 + " " + i3 + " { " + h3 + " }" : h3);
    return e.namespace && (d3 = Ue(d3, e.namespace)), a2 = [], serialize(d3, l2), a2;
  }, h2 = e;
  let d2 = M;
  for (let e2 = 0; e2 < t2.length; e2++) t2[e2].name || v(15), d2 = G(d2, t2[e2].name);
  return (null == h2 ? void 0 : h2.namespace) && (d2 = G(d2, h2.namespace)), (null == h2 ? void 0 : h2.prefix) && (d2 = G(d2, "p")), u2.hash = d2 !== M ? d2.toString() : "", u2;
}
const Xe = new _e(), Ke = Je(), Qe = t.createContext({ shouldForwardProp: void 0, styleSheet: Xe, stylis: Ke, stylisPlugins: void 0 });
Qe.Consumer;
function et() {
  return t.useContext(Qe);
}
const nt = t.createContext(void 0);
nt.Consumer;
const it = Object.prototype.hasOwnProperty, ct = {};
function at(e, t2) {
  const n = "string" != typeof e ? "sc" : T(e);
  ct[n] = (ct[n] || 0) + 1;
  const o = n + "-" + z(u + n + ct[n]);
  return t2 ? t2 + "-" + o : o;
}
let lt;
function ut(o, s, r2) {
  const i2 = ce(o), c2 = o, a2 = !L(o), { attrs: l2 = I, componentId: u2 = at(s.displayName, s.parentComponentId), displayName: h2 = B(o) } = s, d2 = s.displayName && s.componentId ? T(s.displayName) + "-" + s.componentId : s.componentId || u2, p2 = i2 && c2.attrs ? c2.attrs.concat(l2).filter(Boolean) : l2;
  let { shouldForwardProp: f2 } = s;
  if (i2 && c2.shouldForwardProp) {
    const e = c2.shouldForwardProp;
    if (s.shouldForwardProp) {
      const t2 = s.shouldForwardProp;
      f2 = (n, o2) => e(n, o2) && t2(n, o2);
    } else f2 = e;
  }
  const m2 = new Be(r2, d2, i2 ? c2.componentStyle : void 0);
  function y2(o2, s2) {
    return function(o3, s3, r3) {
      const { attrs: i3, componentStyle: c3, defaultProps: a3, foldedComponentIds: l3, styledComponentId: u3, target: h3 } = o3, d3 = t.useContext(nt), p3 = et(), f3 = o3.shouldForwardProp || p3.shouldForwardProp;
      "production" !== process.env.NODE_ENV && t.useDebugValue && t.useDebugValue(u3);
      const m3 = R(s3, d3, a3) || $;
      let y3, g3;
      {
        const e = t.useRef(null), n = e.current;
        if (null !== n && n[1] === m3 && n[2] === p3.styleSheet && n[3] === p3.stylis && n[7] === c3 && function(e2, t2, n2) {
          const o4 = e2, s4 = t2;
          let r4 = 0;
          for (const e3 in s4) if (it.call(s4, e3) && (r4++, o4[e3] !== s4[e3])) return false;
          return r4 === n2;
        }(n[0], s3, n[4])) y3 = n[5], g3 = n[6];
        else {
          y3 = function(e2, t2, n3) {
            const o4 = Object.assign(Object.assign({}, t2), { className: void 0, theme: n3 }), s4 = e2.length > 1;
            for (let n4 = 0; n4 < e2.length; n4++) {
              const r4 = e2[n4], i4 = re(r4) ? r4(s4 ? Object.assign({}, o4) : o4) : r4;
              for (const e3 in i4) "className" === e3 ? o4.className = ae(o4.className, i4[e3]) : "style" === e3 ? o4.style = Object.assign(Object.assign({}, o4.style), i4[e3]) : e3 in t2 && void 0 === t2[e3] || (o4[e3] = i4[e3]);
            }
            return "className" in t2 && "string" == typeof t2.className && (o4.className = ae(o4.className, t2.className)), o4;
          }(i3, s3, m3), g3 = function(e2, n3, o4, s4) {
            const r4 = e2.generateAndInjectStyles(n3, o4, s4);
            return "production" !== process.env.NODE_ENV && t.useDebugValue && t.useDebugValue(r4), r4;
          }(c3, y3, p3.styleSheet, p3.stylis);
          let n2 = 0;
          for (const e2 in s3) it.call(s3, e2) && n2++;
          e.current = [s3, m3, p3.styleSheet, p3.stylis, n2, y3, g3, c3];
        }
      }
      "production" !== process.env.NODE_ENV && o3.warnTooManyClasses && o3.warnTooManyClasses(g3);
      const v2 = y3.as || h3, S2 = function(t2, n, o4, s4) {
        const r4 = {};
        for (const i4 in t2) void 0 === t2[i4] || "$" === i4[0] || "as" === i4 || "theme" === i4 && t2.theme === o4 || ("forwardedAs" === i4 ? r4.as = t2.forwardedAs : s4 && !s4(i4, n) || (r4[i4] = t2[i4], s4 || "development" !== process.env.NODE_ENV || isPropValid(i4) || (lt || (lt = /* @__PURE__ */ new Set())).has(i4) || !L(n) || n.includes("-") || (lt.add(i4), console.warn(`styled-components: it looks like an unknown prop "${i4}" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via \`<StyleSheetManager shouldForwardProp={...}>\` (connect an API like \`@emotion/is-prop-valid\`) or consider using transient props (\`$\` prefix for automatic filtering.)`))));
        return r4;
      }(y3, v2, m3, f3);
      let b2 = ae(l3, u3);
      return g3 && (b2 += " " + g3), y3.className && (b2 += " " + y3.className), S2[L(v2) && v2.includes("-") ? "class" : "className"] = b2, r3 && (S2.ref = r3), createElement(v2, S2);
    }(g2, o2, s2);
  }
  y2.displayName = h2;
  let g2 = t.forwardRef(y2);
  return g2.attrs = p2, g2.componentStyle = m2, g2.displayName = h2, g2.shouldForwardProp = f2, g2.foldedComponentIds = i2 ? ae(c2.foldedComponentIds, c2.styledComponentId) : "", g2.styledComponentId = d2, g2.target = i2 ? c2.target : o, Object.defineProperty(g2, "defaultProps", { get() {
    return this._foldedDefaultProps;
  }, set(e) {
    this._foldedDefaultProps = i2 ? function(e2, ...t2) {
      for (const n of t2) he(e2, n, true);
      return e2;
    }({}, c2.defaultProps, e) : e;
  } }), "production" !== process.env.NODE_ENV && (_(h2, d2), g2.warnTooManyClasses = /* @__PURE__ */ ((e, t2) => {
    let n = {}, o2 = false;
    return (s2) => {
      !o2 && (n[s2] = true, Object.keys(n).length >= 200) && (console.warn(`Over 200 classes were generated for component ${e}${t2 ? ` with the id of "${t2}"` : ""}.
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), o2 = true, n = {});
    };
  })(h2, d2)), de(g2, () => `.${g2.styledComponentId}`), a2 && se(g2, o, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), g2;
}
var ht = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]);
function dt(e, t2) {
  const n = [e[0]];
  for (let o = 0, s = t2.length; o < s; o += 1) n.push(t2[o], e[o + 1]);
  return n;
}
const pt = (e) => (Ie.add(e), e);
function ft(e, ...t2) {
  if (re(e) || ue(e)) return pt(We(dt(I, [e, ...t2])));
  const n = e;
  return 0 === t2.length && 1 === n.length && "string" == typeof n[0] ? We(n) : pt(We(dt(n, t2)));
}
function mt(e, t2, n = $) {
  if (!t2) throw v(1, t2);
  const o = (o2, ...s) => e(t2, n, ft(o2, ...s));
  return o.attrs = (o2) => mt(e, t2, Object.assign(Object.assign({}, n), { attrs: Array.prototype.concat(n.attrs, o2).filter(Boolean) })), o.withConfig = (o2) => mt(e, t2, Object.assign(Object.assign({}, n), o2)), o;
}
const yt = (e) => mt(ut, e), gt = yt;
ht.forEach((e) => {
  gt[e] = yt(e);
});
class vt {
  constructor(e, t2) {
    this.instanceRules = /* @__PURE__ */ new Map(), this.rules = e, this.componentId = t2, this.isStatic = function(e2) {
      for (let t3 = 0; t3 < e2.length; t3 += 1) {
        const n = e2[t3];
        if (re(n) && !ce(n)) return false;
      }
      return true;
    }(e), _e.registerId(this.componentId);
  }
  removeStyles(e, t2) {
    this.instanceRules.delete(e), this.rebuildGroup(t2);
  }
  renderStyles(e, t2, n, o) {
    const s = this.componentId;
    if (this.isStatic) {
      if (n.hasNameForId(s, s + e)) this.instanceRules.has(e) || this.computeRules(e, t2, n, o);
      else {
        const r3 = this.computeRules(e, t2, n, o);
        n.insertRules(s, r3.name, r3.rules);
      }
      return;
    }
    const r2 = this.instanceRules.get(e);
    if (this.computeRules(e, t2, n, o), !n.server && r2) {
      const t3 = r2.rules, n2 = this.instanceRules.get(e).rules;
      if (t3.length === n2.length) {
        let e2 = true;
        for (let o2 = 0; o2 < t3.length; o2++) if (t3[o2] !== n2[o2]) {
          e2 = false;
          break;
        }
        if (e2) return;
      }
    }
    this.rebuildGroup(n);
  }
  computeRules(e, t2, n, o) {
    const s = le(We(this.rules, t2, n, o)), r2 = { name: this.componentId + e, rules: o(s, "") };
    return this.instanceRules.set(e, r2), r2;
  }
  rebuildGroup(e) {
    const t2 = this.componentId;
    e.clearRules(t2);
    for (const n of this.instanceRules.values()) e.insertRules(t2, n.name, n.rules);
  }
}
function St(e, ...n) {
  const o = ft(e, ...n), s = `sc-global-${z(JSON.stringify(o))}`, r2 = new vt(o, s);
  "production" !== process.env.NODE_ENV && _(s);
  const i2 = (e2) => {
    const n2 = et(), i3 = t.useContext(nt);
    let a2;
    {
      const e3 = t.useRef(null);
      null === e3.current && (e3.current = n2.styleSheet.allocateGSInstance(s)), a2 = e3.current;
    }
    "production" !== process.env.NODE_ENV && t.Children.count(e2.children) && console.warn(`The global style component ${s} was given child JSX. createGlobalStyle does not render children.`), "production" !== process.env.NODE_ENV && o.some((e3) => "string" == typeof e3 && -1 !== e3.indexOf("@import")) && console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."), n2.styleSheet.server && c2(a2, e2, n2.styleSheet, i3, n2.stylis);
    {
      const o2 = r2.isStatic ? [a2, n2.styleSheet, r2] : [a2, e2, n2.styleSheet, i3, n2.stylis, r2], l2 = t.useRef(r2);
      t.useLayoutEffect(() => {
        n2.styleSheet.server || (l2.current !== r2 && (n2.styleSheet.clearRules(s), l2.current = r2), c2(a2, e2, n2.styleSheet, i3, n2.stylis));
      }, o2), t.useLayoutEffect(() => () => {
        n2.styleSheet.server || r2.removeStyles(a2, n2.styleSheet);
      }, [a2, n2.styleSheet, r2]);
    }
    return n2.styleSheet.server && r2.instanceRules.delete(a2), null;
  };
  function c2(e2, t2, n2, o2, s2) {
    if (r2.isStatic) r2.renderStyles(e2, y, n2, s2);
    else {
      const c3 = Object.assign(Object.assign({}, t2), { theme: R(t2, o2, i2.defaultProps) });
      r2.renderStyles(e2, c3, n2, s2);
    }
  }
  return t.memo(i2);
}
"production" !== process.env.NODE_ENV && "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://styled-components.com/docs/basics#react-native");
const It = `__sc-${c}__`;
"production" !== process.env.NODE_ENV && "test" !== process.env.NODE_ENV && "undefined" != typeof window && (window[It] || (window[It] = 0), 1 === window[It] && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://styled-components.com/docs/faqs#why-am-i-getting-a-warning-about-several-instances-of-module-on-the-page for more info."), window[It] += 1);
const MagnifierGlobalStyles = St`
  * {
    box-sizing: border-box;
  }

  .react-magnifier-glass {
    position: absolute;
    border: 3px solid #000;
    border-radius: 50%;
    cursor: none;
    height: 100px;
    width: 100px;
    z-index: 999999;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .show-magnifier {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }

  .hide-magnifier {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }
`;
const ImageContainer = gt.div`
  display: inline-block;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`;
const SrOnly = gt.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
const PIXEL_PADDING = 3;
const IMAGE_URL_MISSING_ERROR = "Image url is missing! <ReactMagnifier imageUrl={url}/> is required.";
const defaultProps = {
  imageUrl: "",
  imageAltText: "react-magnifier-image",
  imageWidth: "auto",
  imageHeight: "auto",
  magnifierHeight: 100,
  magnifierWidth: 100,
  magnifierRadius: 50,
  magnifierBorderColor: "#000",
  magnifierBorderStyle: "solid",
  magnifierBorderWidth: 3,
  magnifierShadow: true,
  cursor: "none",
  zoomSize: 2,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getMagnifier: () => {
  },
  customImgStyles: "",
  customContainerStyles: ""
};
const ReactMagnifier = t.memo(function ReactMagnifier2(props = {}) {
  const finalProps = useMemo(
    () => __spreadValues(__spreadValues({}, defaultProps), props),
    [props]
  );
  const magnifiableImageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const glassRef = useRef(null);
  const isInitializedRef = useRef(false);
  const [magnifierDimensions, setMagnifierDimensions] = useState({ width: 0, height: 0 });
  const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);
  const handleGetCursorPos = useCallback(
    (event) => {
      return getCursorPos(event, magnifiableImageRef.current);
    },
    []
  );
  const handleMoveMagnifier = useCallback(
    (event) => {
      event.preventDefault();
      const glass = glassRef.current;
      const image = magnifiableImageRef.current;
      const container = imageContainerRef.current;
      if (!glass || !image || !container) {
        return;
      }
      const pos = handleGetCursorPos(event);
      let x2 = pos.x;
      let y2 = pos.y;
      const { width, height } = magnifierDimensions;
      if (x2 > image.width - width / finalProps.zoomSize) {
        x2 = image.width - width / finalProps.zoomSize;
      }
      if (x2 < width / finalProps.zoomSize) {
        x2 = width / finalProps.zoomSize;
      }
      if (y2 > image.height - height / finalProps.zoomSize) {
        y2 = image.height - height / finalProps.zoomSize;
      }
      if (y2 < height / finalProps.zoomSize) {
        y2 = height / finalProps.zoomSize;
      }
      glass.style.left = `${x2 - width}px`;
      glass.style.top = `${y2 - height}px`;
      glass.style.backgroundPosition = `-${x2 * finalProps.zoomSize - width + PIXEL_PADDING}px -${y2 * finalProps.zoomSize - height + PIXEL_PADDING}px`;
      triggerCustomEvent("magnifier-moved", container);
    },
    [magnifierDimensions, finalProps.zoomSize, handleGetCursorPos]
  );
  const handleShowMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove("hide-magnifier");
      glass.classList.add("show-magnifier");
      setIsMagnifierVisible(true);
      triggerCustomEvent("magnifier-visible", imageContainerRef.current);
    }
  }, []);
  const handleHideMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove("show-magnifier");
      glass.classList.add("hide-magnifier");
      setIsMagnifierVisible(false);
      triggerCustomEvent("magnifier-invisible", imageContainerRef.current);
    }
  }, []);
  const handleKeyDown = useCallback(
    (event) => {
      if (!isMagnifierVisible || !glassRef.current || !magnifiableImageRef.current) {
        return;
      }
      const glass = glassRef.current;
      const step = 10;
      let handled = false;
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          const currentTop = parseFloat(glass.style.top) || 0;
          glass.style.top = `${Math.max(0, currentTop - step)}px`;
          handled = true;
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          const currentTopDown = parseFloat(glass.style.top) || 0;
          glass.style.top = `${currentTopDown + step}px`;
          handled = true;
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const currentLeft = parseFloat(glass.style.left) || 0;
          glass.style.left = `${Math.max(0, currentLeft - step)}px`;
          handled = true;
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          const currentLeftRight = parseFloat(glass.style.left) || 0;
          glass.style.left = `${currentLeftRight + step}px`;
          handled = true;
          break;
        }
        case "Escape": {
          event.preventDefault();
          handleHideMagnifier();
          handled = true;
          break;
        }
      }
      if (handled) {
        triggerCustomEvent("magnifier-moved", imageContainerRef.current);
      }
    },
    [isMagnifierVisible, handleHideMagnifier]
  );
  useEffect(() => {
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;
    if (!isValidProp(finalProps.imageUrl)) {
      logMagnifierError(IMAGE_URL_MISSING_ERROR);
      isInitializedRef.current = false;
      if (glassRef.current) {
        glassRef.current.remove();
        glassRef.current = null;
      }
      return;
    }
    if (isInitializedRef.current && glassRef.current && glassRef.current.isConnected) {
      return;
    }
    if (!image || !container) {
      return;
    }
    if (glassRef.current) {
      glassRef.current.remove();
      glassRef.current = null;
    }
    const glass = createMagnifierGlass(container, image, {
      magnifierWidth: finalProps.magnifierWidth,
      magnifierHeight: finalProps.magnifierHeight,
      magnifierRadius: finalProps.magnifierRadius,
      magnifierBorderWidth: finalProps.magnifierBorderWidth,
      magnifierBorderStyle: finalProps.magnifierBorderStyle,
      magnifierBorderColor: finalProps.magnifierBorderColor,
      magnifierShadow: finalProps.magnifierShadow,
      cursor: finalProps.cursor,
      zoomSize: finalProps.zoomSize
    });
    if (!glass) {
      return;
    }
    glassRef.current = glass;
    isInitializedRef.current = true;
    const width = glass.offsetWidth / 2;
    const height = glass.offsetHeight / 2;
    setMagnifierDimensions({ width, height });
    finalProps.getMagnifier(container);
    triggerCustomEvent("magnifier-initialized", container);
    return () => {
      if (glassRef.current) {
        glassRef.current.remove();
        glassRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [finalProps.imageUrl]);
  useEffect(() => {
    const glass = glassRef.current;
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;
    if (!glass || !image || !container) {
      return;
    }
    glass.addEventListener("mousemove", handleMoveMagnifier);
    glass.addEventListener("touchmove", handleMoveMagnifier);
    image.addEventListener("mousemove", handleMoveMagnifier);
    image.addEventListener("touchmove", handleMoveMagnifier);
    container.addEventListener("mouseenter", handleShowMagnifier);
    container.addEventListener("mouseleave", handleHideMagnifier);
    container.addEventListener("focusin", handleShowMagnifier);
    container.addEventListener("focusout", handleHideMagnifier);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (glass) {
        glass.removeEventListener("mousemove", handleMoveMagnifier);
        glass.removeEventListener("touchmove", handleMoveMagnifier);
      }
      if (image) {
        image.removeEventListener("mousemove", handleMoveMagnifier);
        image.removeEventListener("touchmove", handleMoveMagnifier);
      }
      if (container) {
        container.removeEventListener("mouseenter", handleShowMagnifier);
        container.removeEventListener("mouseleave", handleHideMagnifier);
        container.removeEventListener("focusin", handleShowMagnifier);
        container.removeEventListener("focusout", handleHideMagnifier);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMoveMagnifier, handleShowMagnifier, handleHideMagnifier, handleKeyDown]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MagnifierGlobalStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ImageContainer,
      {
        className: `react-magnifier-image-container${finalProps.customContainerStyles ? ` ${finalProps.customContainerStyles}` : ""}`,
        ref: imageContainerRef,
        role: "group",
        "aria-label": "Image magnifier",
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              ref: magnifiableImageRef,
              className: finalProps.customImgStyles,
              src: finalProps.imageUrl,
              width: finalProps.imageWidth,
              height: finalProps.imageHeight,
              alt: finalProps.imageAltText,
              role: "img",
              "aria-describedby": "magnifier-help"
            }
          ),
          isMagnifierVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
            SrOnly,
            {
              id: "magnifier-help",
              role: "status",
              "aria-live": "polite",
              children: "Magnifier active. Use arrow keys to navigate, Escape to close."
            }
          )
        ]
      }
    )
  ] });
});
ReactMagnifier.displayName = "ReactMagnifier";
export {
  ReactMagnifier
};
//# sourceMappingURL=react-magnifier.js.map
