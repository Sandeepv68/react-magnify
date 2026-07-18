/**
 * ReactMagnifier v1.0.0
 * A modern, accessible React component for image magnification
 * Migrated to React 19 with TypeScript, hooks, and accessibility features
 * Original author: Sandeep Vattapparambil
 */

import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { ReactMagnifierProps } from './ReactMagnifier.Interface';
import {
  isValidProp,
  logMagnifierError,
  triggerCustomEvent,
  getCursorPos,
  createMagnifierGlass,
} from './utils';
// @ts-ignore - CSS imports are valid in Vite, TypeScript doesn't have built-in support
import './style.css';

/**
 * Constants
 */
const PIXEL_PADDING = 3;
const IMAGE_URL_MISSING_ERROR =
  'Image url is missing! <ReactMagnifier imageUrl={url}/> is required.';

/**
 * Default props for ReactMagnifier component
 */
const defaultProps: ReactMagnifierProps = {
  imageUrl: '',
  imageAltText: 'react-magnifier-image',
  imageWidth: 'auto',
  imageHeight: 'auto',
  magnifierHeight: 100,
  magnifierWidth: 100,
  magnifierRadius: 50,
  magnifierBorderColor: '#000',
  magnifierBorderStyle: 'solid',
  magnifierBorderWidth: 3,
  magnifierShadow: true,
  cursor: 'none',
  zoomSize: 2,
  getMagnifier: (): void => {},
  customImgStyles: '',
  customContainerStyles: '',
};

/**
 * ReactMagnifier Component
 * A modern, accessible image magnification component with keyboard support and ARIA attributes
 *
 * @component
 * @example
 * <ReactMagnifier
 *   imageUrl="https://example.com/image.jpg"
 *   zoomSize={3}
 *   magnifierHeight={200}
 *   magnifierWidth={200}
 * />
 */
const ReactMagnifier = React.memo(function ReactMagnifier(
  props: Partial<ReactMagnifierProps> = {}
): React.ReactElement {
  // Merge props with defaults
  const finalProps: ReactMagnifierProps = useMemo(
    () => ({
      ...defaultProps,
      ...props,
    }),
    [props]
  );

  // Refs
  const magnifiableImageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);

  // State
  const [magnifierDimensions, setMagnifierDimensions] = useState({ width: 0, height: 0 });
  const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

  /**
   * Get cursor position with proper null checking
   */
  const handleGetCursorPos = useCallback(
    (event: MouseEvent | TouchEvent) => {
      return getCursorPos(event, magnifiableImageRef.current);
    },
    []
  );

  /**
   * Move magnifier glass and update background position
   */
  const handleMoveMagnifier = useCallback(
    (event: MouseEvent | TouchEvent) => {
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

      // Prevent magnifier glass from going outside image bounds
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

      // Set magnifier position
      glass.style.left = `${x - width}px`;
      glass.style.top = `${y - height}px`;

      // Set background position to show magnified view
      glass.style.backgroundPosition =
        `-${x * finalProps.zoomSize - width + PIXEL_PADDING}px -${
          y * finalProps.zoomSize - height + PIXEL_PADDING
        }px`;

      // Dispatch custom event
      triggerCustomEvent('magnfier-moved', container);
    },
    [magnifierDimensions, finalProps.zoomSize, handleGetCursorPos]
  );

  /**
   * Show magnifier glass
   */
  const handleShowMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove('hide-magnifier');
      glass.classList.add('show-magnifier');
      setIsMagnifierVisible(true);
      triggerCustomEvent('magnfier-visible', imageContainerRef.current);
    }
  }, []);

  /**
   * Hide magnifier glass
   */
  const handleHideMagnifier = useCallback(() => {
    const glass = glassRef.current;
    if (glass) {
      glass.classList.remove('show-magnifier');
      glass.classList.add('hide-magnifier');
      setIsMagnifierVisible(false);
      triggerCustomEvent('magnfier-invisible', imageContainerRef.current);
    }
  }, []);

  /**
   * Handle keyboard events for accessibility
   * Arrow keys: move magnifier
   * Escape: hide magnifier
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isMagnifierVisible || !glassRef.current || !magnifiableImageRef.current) {
        return;
      }

      const glass = glassRef.current;
      const step = 10; // pixels per key press

      let handled = false;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          const currentTop = parseFloat(glass.style.top) || 0;
          glass.style.top = `${Math.max(0, currentTop - step)}px`;
          handled = true;
          break;
        case 'ArrowDown':
          event.preventDefault();
          const currentTopDown = parseFloat(glass.style.top) || 0;
          glass.style.top = `${currentTopDown + step}px`;
          handled = true;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          const currentLeft = parseFloat(glass.style.left) || 0;
          glass.style.left = `${Math.max(0, currentLeft - step)}px`;
          handled = true;
          break;
        case 'ArrowRight':
          event.preventDefault();
          const currentLeftRight = parseFloat(glass.style.left) || 0;
          glass.style.left = `${currentLeftRight + step}px`;
          handled = true;
          break;
        case 'Escape':
          event.preventDefault();
          handleHideMagnifier();
          handled = true;
          break;
        default:
          break;
      }

      if (handled) {
        triggerCustomEvent('magnfier-moved', imageContainerRef.current);
      }
    },
    [isMagnifierVisible, handleHideMagnifier]
  );

  /**
   * Initialize magnifier: create glass element and set up event listeners
   */
  useEffect(() => {
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;

    // Reset initialization flag when image URL changes
    if (!isValidProp(finalProps.imageUrl)) {
      logMagnifierError(IMAGE_URL_MISSING_ERROR);
      isInitializedRef.current = false;
      if (glassRef.current) {
        glassRef.current.remove();
        glassRef.current = null;
      }
      return;
    }

    // Prevent re-initialization on the same image
    if (isInitializedRef.current && glassRef.current && glassRef.current.isConnected) {
      return;
    }

    if (!image || !container) {
      return;
    }

    // Clean up existing glass if present
    if (glassRef.current) {
      glassRef.current.remove();
      glassRef.current = null;
    }

    // Create magnifier glass
    const glass = createMagnifierGlass(container, image, {
      magnifierWidth: finalProps.magnifierWidth,
      magnifierHeight: finalProps.magnifierHeight,
      magnifierRadius: finalProps.magnifierRadius,
      magnifierBorderWidth: finalProps.magnifierBorderWidth,
      magnifierBorderStyle: finalProps.magnifierBorderStyle,
      magnifierBorderColor: finalProps.magnifierBorderColor,
      magnifierShadow: finalProps.magnifierShadow,
      cursor: finalProps.cursor,
      zoomSize: finalProps.zoomSize,
    });

    if (!glass) {
      return;
    }

    glassRef.current = glass;
    isInitializedRef.current = true;

    // Calculate magnifier dimensions
    const width = glass.offsetWidth / 2;
    const height = glass.offsetHeight / 2;
    setMagnifierDimensions({ width, height });

    // Call the callback prop
    finalProps.getMagnifier(container);

    // Dispatch initialized event
    triggerCustomEvent('magnifier-initialized', container);

    // Cleanup on unmount
    return () => {
      if (glassRef.current) {
        glassRef.current.remove();
        glassRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [finalProps.imageUrl]);

  /**
   * Set up event listeners after magnifier is created
   */
  useEffect(() => {
    const glass = glassRef.current;
    const image = magnifiableImageRef.current;
    const container = imageContainerRef.current;

    if (!glass || !image || !container) {
      return;
    }

    // Add mouse/touch event listeners
    glass.addEventListener('mousemove', handleMoveMagnifier);
    glass.addEventListener('touchmove', handleMoveMagnifier);
    image.addEventListener('mousemove', handleMoveMagnifier);
    image.addEventListener('touchmove', handleMoveMagnifier);

    // Add enter/leave listeners for visibility
    container.addEventListener('mouseenter', handleShowMagnifier);
    container.addEventListener('mouseleave', handleHideMagnifier);
    container.addEventListener('focusin', handleShowMagnifier);
    container.addEventListener('focusout', handleHideMagnifier);

    // Add keyboard listener for accessibility
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      if (glass) {
        glass.removeEventListener('mousemove', handleMoveMagnifier);
        glass.removeEventListener('touchmove', handleMoveMagnifier);
      }
      if (image) {
        image.removeEventListener('mousemove', handleMoveMagnifier);
        image.removeEventListener('touchmove', handleMoveMagnifier);
      }
      if (container) {
        container.removeEventListener('mouseenter', handleShowMagnifier);
        container.removeEventListener('mouseleave', handleHideMagnifier);
        container.removeEventListener('focusin', handleShowMagnifier);
        container.removeEventListener('focusout', handleHideMagnifier);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleMoveMagnifier, handleShowMagnifier, handleHideMagnifier, handleKeyDown]);

  return (
    <div
      className={`react-magnifier-image-container ${finalProps.customContainerStyles}`}
      ref={imageContainerRef}
      role="group"
      aria-label="Image magnifier"
      tabIndex={0}
    >
      <img
        ref={magnifiableImageRef}
        className={finalProps.customImgStyles}
        src={finalProps.imageUrl}
        width={finalProps.imageWidth}
        height={finalProps.imageHeight}
        alt={finalProps.imageAltText}
        role="img"
        aria-describedby="magnifier-help"
      />
      {isMagnifierVisible && (
        <div
          id="magnifier-help"
          className="sr-only"
          role="status"
          aria-live="polite"
        >
          Magnifier active. Use arrow keys to navigate, Escape to close.
        </div>
      )}
    </div>
  );
});

ReactMagnifier.displayName = 'ReactMagnifier';

export default ReactMagnifier;
