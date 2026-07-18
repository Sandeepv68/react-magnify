/**
 * Utility functions for ReactMagnifier component
 */

/**
 * Validates if a string prop is valid and not empty
 * @param prop - The property to validate
 * @returns True if the property is a non-empty string
 */
export const isValidProp = (prop: string): boolean => {
  return Boolean(prop && prop.length > 0);
};

/**
 * Logs a styled error message to console
 * @param message - The error message to log
 */
export const logMagnifierError = (message: string): void => {
  // eslint-disable-next-line no-console
  console.log(
    `%c ReactMagnifier Error: ${message}`,
    'background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;'
  );
};

/**
 * Dispatches a custom event on an element
 * @param eventType - The type of custom event to dispatch
 * @param element - The DOM element to dispatch the event on
 */
export const triggerCustomEvent = (eventType: string, element: HTMLElement | null): void => {
  if (element) {
    const event = new CustomEvent(eventType, { detail: element });
    element.dispatchEvent(event);
  }
};

/**
 * Gets cursor position relative to an image element
 * @param event - The mouse or touch event
 * @param imageElement - The reference image element
 * @returns Object with x and y coordinates
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
    x = event.pageX - rect.left;
    y = event.pageY - rect.top;
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    x = event.touches[0].pageX - rect.left;
    y = event.touches[0].pageY - rect.top;
  }

  // Consider any page scrolling
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;

  return { x, y };
};

/**
 * Debounce function to limit how often a function can be called
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Creates and configures the magnifier glass DOM element
 * @param container - The container to insert the glass into
 * @param imageElement - The image element being magnified
 * @param props - The magnifier configuration properties
 * @returns The created glass element or null if creation failed
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

  // Set styles
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

  // Insert into container
  container.insertBefore(glass, imageElement);

  return glass;
};
