/**
 * utility functions for ReactMagnifier component
 */
/**
 * Validates that a string prop is non-empty.
 *
 * @param prop - The string to validate.
 * @returns `true` if the string is truthy and has length > 0.
 */
export declare const isValidProp: (prop: string) => boolean;
/**
 * Logs a styled warning message to the browser console.
 * The message is prefixed with "ReactMagnifier Error:" and rendered with
 * orange-on-cream styling for visibility.
 *
 * @param message - The error description to display.
 */
export declare const logMagnifierError: (message: string) => void;
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
export declare const triggerCustomEvent: (eventType: string, element: HTMLElement | null) => void;
/**
 * Calculates the cursor position relative to an image element's bounding box.
 * Supports both MouseEvent and TouchEvent sources.
 *
 * @param event        - The mouse or touch event.
 * @param imageElement - The target image element (returns {0,0} if null).
 * @returns An object with `x` and `y` coordinates relative to the image.
 */
export declare const getCursorPos: (
  event: MouseEvent | TouchEvent,
  imageElement: HTMLImageElement | null
) => {
  x: number;
  y: number;
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
export declare const createMagnifierGlass: (
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
) => HTMLDivElement | null;
//# sourceMappingURL=utils.d.ts.map
