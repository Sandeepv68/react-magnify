/**
 * utility functions for ReactMagnifier component
 */

/**
 * Validates that a string prop is non-empty.
 *
 * @param prop - The string to validate.
 * @returns `true` if the string is truthy and has length > 0.
 */
export const isValidProp = (prop: string): boolean => {
  return Boolean(prop && prop.length > 0);
};

/**
 * Logs a styled warning message to the browser console.
 * The message is prefixed with "ReactMagnifier Error:" and rendered with
 * orange-on-cream styling for visibility.
 *
 * @param message - The error description to display.
 */
export const logMagnifierError = (message: string): void => {
  console.warn(
    `%c ReactMagnifier Error: ${message}`,
    'background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;'
  );
};

/**
 * Dispatches a CustomEvent on the given DOM element.
 *
 * The event's `detail` property is set to the element itself, allowing
 * consumers to listen for lifecycle events such as `magnifier-initialized`,
 * `magnifier-moved`, `magnifier-visible`, or `magnifier-invisible`.
 *
 * @param eventType - The custom event type name.
 * @param element   - The target element (no-op if null).
 */
export const triggerCustomEvent = (eventType: string, element: HTMLElement | null): void => {
  if (element) {
    const event = new CustomEvent(eventType, { detail: element });
    element.dispatchEvent(event);
  }
};

/**
 * Calculates the cursor position relative to an image element's bounding box.
 * Supports both MouseEvent and TouchEvent sources.
 *
 * @param event        - The mouse or touch event.
 * @param imageElement - The target image element (returns {0,0} if null).
 * @returns An object with `x` and `y` coordinates relative to the image.
 */
export const getCursorPos = (
  event: MouseEvent | TouchEvent,
  imageElement: HTMLImageElement | null
): { x: number; y: number } => {
  if (!imageElement) {
    return { x: 0, y: 0 };
  }

  const rect = imageElement.getBoundingClientRect();
  let x = 0;
  let y = 0;

  if (event instanceof MouseEvent) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    x = event.touches[0].clientX - rect.left;
    y = event.touches[0].clientY - rect.top;
  }

  return { x, y };
};

/**
 * Creates and inserts the magnifier glass <div> into the container.
 *
 * The glass is configured with the provided dimension, border, cursor, shadow,
 * and zoom-level styles, then inserted before the image element so it renders as
 * an overlay. The background-image is set to the same image source but scaled
 * according to `zoomSize` to produce the magnified effect.
 *
 * @param container      - The parent container to insert the glass into.
 * @param imageElement   - The image being magnified (provides `src` and natural
 *                         dimensions for `background-size`).
 * @param props          - Magnifier configuration.
 * @param props.magnifierWidth   - Glass width in pixels.
 * @param props.magnifierHeight  - Glass height in pixels.
 * @param props.magnifierRadius  - Border-radius as a percentage.
 * @param props.magnifierBorderWidth - Border width in pixels.
 * @param props.magnifierBorderStyle - CSS border-style value.
 * @param props.magnifierBorderColor - CSS border-color value.
 * @param props.magnifierShadow  - Whether to apply a box-shadow.
 * @param props.cursor           - CSS cursor value.
 * @param props.zoomSize         - Magnification factor.
 * @returns The created glass element, or `null` if container or image is missing.
 */
export const createMagnifierGlass = (
  container: HTMLDivElement | null,
  imageElement: HTMLImageElement | null,
  props: {
    magnifierWidth: number;
    magnifierHeight: number;
    magnifierRadius: number;
    magnifierBorderWidth: number;
    magnifierBorderStyle: string;
    magnifierBorderColor: string;
    magnifierShadow: boolean;
    cursor: string;
    zoomSize: number;
  }
): HTMLDivElement | null => {
  if (!container || !imageElement) {
    return null;
  }

  const glass = document.createElement('div');
  glass.setAttribute('class', 'react-magnifier-glass');
  glass.setAttribute('role', 'img');
  glass.setAttribute('aria-label', 'Image magnifier');

  glass.classList.add('hide-magnifier');
  glass.style.width = `${props.magnifierWidth}px`;
  glass.style.height = `${props.magnifierHeight}px`;
  glass.style.borderRadius = `${props.magnifierRadius}%`;
  glass.style.border = `${props.magnifierBorderWidth}px ${props.magnifierBorderStyle} ${props.magnifierBorderColor}`;
  glass.style.cursor = props.cursor;
  glass.style.boxShadow = props.magnifierShadow
    ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    : 'none';
  glass.style.backgroundImage = `url('${imageElement.src}')`;
  glass.style.backgroundRepeat = 'no-repeat';
  glass.style.backgroundSize = `${imageElement.width * props.zoomSize}px ${
    imageElement.height * props.zoomSize
  }px`;

  container.insertBefore(glass, imageElement);

  return glass;
};
