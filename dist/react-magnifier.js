var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import require$$0, { useMemo, useRef, useState, useCallback, useEffect } from "react";
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
            } catch (x) {
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
      } catch (x) {
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
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
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
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = require$$0, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
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
  let x = 0;
  let y = 0;
  if (event instanceof MouseEvent) {
    x = event.pageX - rect.left;
    y = event.pageY - rect.top;
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    x = event.touches[0].pageX - rect.left;
    y = event.touches[0].pageY - rect.top;
  }
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  return { x, y };
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
  getMagnifier: () => {
  },
  customImgStyles: "",
  customContainerStyles: ""
};
const ReactMagnifier = require$$0.memo(function ReactMagnifier2(props = {}) {
  const finalProps = useMemo(
    () => __spreadValues(__spreadValues({}, defaultProps), props),
    [props]
  );
  const magnifiableImageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const glassRef = useRef(null);
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
      let x = pos.x;
      let y = pos.y;
      const { width, height } = magnifierDimensions;
      if (x > image.width - width / finalProps.zoomSize) {
        x = image.width - width / finalProps.zoomSize;
      }
      if (x < width / finalProps.zoomSize) {
        x = width / finalProps.zoomSize;
      }
      if (y > image.height - height / finalProps.zoomSize) {
        y = image.height - height / finalProps.zoomSize;
      }
      if (y < height / finalProps.zoomSize) {
        y = height / finalProps.zoomSize;
      }
      glass.style.left = `${x - width}px`;
      glass.style.top = `${y - height}px`;
      glass.style.backgroundPosition = `-${x * finalProps.zoomSize - width + PIXEL_PADDING}px -${y * finalProps.zoomSize - height + PIXEL_PADDING}px`;
      triggerCustomEvent("magnfier-moved", container);
    },
    [magnifierDimensions, finalProps.zoomSize, handleGetCursorPos]
  );
  const handleShowMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove("hide-magnifier");
      glass.classList.add("show-magnifier");
      setIsMagnifierVisible(true);
      triggerCustomEvent("magnfier-visible", imageContainerRef.current);
    }
  }, []);
  const handleHideMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove("show-magnifier");
      glass.classList.add("hide-magnifier");
      setIsMagnifierVisible(false);
      triggerCustomEvent("magnfier-invisible", imageContainerRef.current);
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
        case "ArrowUp":
          event.preventDefault();
          const currentTop = parseFloat(glass.style.top) || 0;
          glass.style.top = `${Math.max(0, currentTop - step)}px`;
          handled = true;
          break;
        case "ArrowDown":
          event.preventDefault();
          const currentTopDown = parseFloat(glass.style.top) || 0;
          glass.style.top = `${currentTopDown + step}px`;
          handled = true;
          break;
        case "ArrowLeft":
          event.preventDefault();
          const currentLeft = parseFloat(glass.style.left) || 0;
          glass.style.left = `${Math.max(0, currentLeft - step)}px`;
          handled = true;
          break;
        case "ArrowRight":
          event.preventDefault();
          const currentLeftRight = parseFloat(glass.style.left) || 0;
          glass.style.left = `${currentLeftRight + step}px`;
          handled = true;
          break;
        case "Escape":
          event.preventDefault();
          handleHideMagnifier();
          handled = true;
          break;
      }
      if (handled) {
        triggerCustomEvent("magnfier-moved", imageContainerRef.current);
      }
    },
    [isMagnifierVisible, handleHideMagnifier]
  );
  const initializeMagnifier = useCallback(() => {
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;
    if (!isValidProp(finalProps.imageUrl) || !image || !container) {
      if (!isValidProp(finalProps.imageUrl)) {
        logMagnifierError(IMAGE_URL_MISSING_ERROR);
      }
      return;
    }
    if (glassRef.current) {
      glassRef.current.remove();
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
    const width = glass.offsetWidth / 2;
    const height = glass.offsetHeight / 2;
    setMagnifierDimensions({ width, height });
    glass.addEventListener("mousemove", handleMoveMagnifier);
    glass.addEventListener("touchmove", handleMoveMagnifier);
    image.addEventListener("mousemove", handleMoveMagnifier);
    image.addEventListener("touchmove", handleMoveMagnifier);
    container.addEventListener("mouseenter", handleShowMagnifier);
    container.addEventListener("mouseleave", handleHideMagnifier);
    container.addEventListener("focusin", handleShowMagnifier);
    container.addEventListener("focusout", handleHideMagnifier);
    window.addEventListener("keydown", handleKeyDown);
    finalProps.getMagnifier(container);
    triggerCustomEvent("magnifier-initialized", container);
  }, [
    finalProps,
    handleMoveMagnifier,
    handleShowMagnifier,
    handleHideMagnifier,
    handleKeyDown
  ]);
  const cleanupMagnifier = useCallback(() => {
    const glass = glassRef.current;
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;
    if (glass) {
      glass.removeEventListener("mousemove", handleMoveMagnifier);
      glass.removeEventListener("touchmove", handleMoveMagnifier);
      glass.remove();
      glassRef.current = null;
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
  }, [handleMoveMagnifier, handleShowMagnifier, handleHideMagnifier, handleKeyDown]);
  useEffect(() => {
    initializeMagnifier();
    return () => {
      cleanupMagnifier();
    };
  }, [initializeMagnifier, cleanupMagnifier]);
  useEffect(() => {
    initializeMagnifier();
  }, [finalProps.imageUrl, initializeMagnifier]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `react-magnifier-image-container ${finalProps.customContainerStyles}`,
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
          "div",
          {
            id: "magnifier-help",
            className: "sr-only",
            role: "status",
            "aria-live": "polite",
            children: "Magnifier active. Use arrow keys to navigate, Escape to close."
          }
        )
      ]
    }
  );
});
ReactMagnifier.displayName = "ReactMagnifier";
export {
  ReactMagnifier
};
//# sourceMappingURL=react-magnifier.js.map
