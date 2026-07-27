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
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
const isValidProp = (prop) => {
  return Boolean(prop && prop.length > 0);
};
const logMagnifierError = (message) => {
  console.warn(
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
const MagnifierGlobalStyles = createGlobalStyle`
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
const ImageContainer = styled.div`
  display: inline-block;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`;
const SrOnly = styled.div`
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
const ReactMagnifier = React.memo(function ReactMagnifier2(props = {}) {
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
  const updateBackgroundPosition = useCallback(
    (glass) => {
      const image = magnifiableImageRef.current;
      if (!image) return;
      const { width, height } = magnifierDimensions;
      const left = parseFloat(glass.style.left) || 0;
      const top = parseFloat(glass.style.top) || 0;
      const x = left + width;
      const y = top + height;
      glass.style.backgroundPosition = `-${x * finalProps.zoomSize - width + PIXEL_PADDING}px -${y * finalProps.zoomSize - height + PIXEL_PADDING}px`;
    },
    [magnifierDimensions, finalProps.zoomSize]
  );
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
      if (handled && event.key !== "Escape") {
        updateBackgroundPosition(glass);
        triggerCustomEvent("magnifier-moved", imageContainerRef.current);
      }
    },
    [isMagnifierVisible, handleHideMagnifier, updateBackgroundPosition]
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MagnifierGlobalStyles, {}),
    /* @__PURE__ */ jsxs(
      ImageContainer,
      {
        className: `react-magnifier-image-container${finalProps.customContainerStyles ? ` ${finalProps.customContainerStyles}` : ""}`,
        ref: imageContainerRef,
        role: "group",
        "aria-label": "Image magnifier",
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsx(
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
          isMagnifierVisible && /* @__PURE__ */ jsx(
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
