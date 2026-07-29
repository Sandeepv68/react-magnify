import React, { useRef, useEffect, useCallback, useState, useId } from 'react';
import type { ReactMagnifierProps } from './ReactMagnifier.Interface';
import {
  isValidProp,
  logMagnifierError,
  triggerCustomEvent,
  getCursorPos,
  createMagnifierGlass,
} from './utils';
import { MagnifierGlobalStyles, ImageContainer, SrOnly } from './ReactMagnifier.styled';

const IMAGE_URL_MISSING_ERROR =
  'Image url is missing! <ReactMagnifier imageUrl={url}/> is required.';

const defaultProps: Partial<ReactMagnifierProps> = {
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getMagnifier: (): void => {},
  customImgClass: '',
  customContainerClass: '',
};

const ReactMagnifier = React.memo(
  React.forwardRef<HTMLDivElement, Partial<ReactMagnifierProps>>(
    function ReactMagnifier(props, ref) {
      const finalProps: ReactMagnifierProps = {
        ...defaultProps,
        ...props,
        // Merge deprecated customImgStyles/customContainerStyles into new props
        customImgClass:
          props.customImgClass ||
          (props as Record<string, unknown>).customImgStyles ||
          defaultProps.customImgClass,
        customContainerClass:
          props.customContainerClass ||
          (props as Record<string, unknown>).customContainerStyles ||
          defaultProps.customContainerClass,
      } as ReactMagnifierProps;

      const magnifiableImageRef = useRef<HTMLImageElement>(null);
      const imageContainerRef = useRef<HTMLDivElement>(null);
      const glassRef = useRef<HTMLDivElement | null>(null);
      const isInitializedRef = useRef(false);
      const magnifierHelpId = useId();

      const [magnifierDimensions, setMagnifierDimensions] = useState({
        width: 0,
        height: 0,
      });
      const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

      const handleGetCursorPos = useCallback((event: MouseEvent | TouchEvent) => {
        return getCursorPos(event, magnifiableImageRef.current);
      }, []);

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

          const padding = finalProps.magnifierBorderWidth;
          glass.style.backgroundPosition = `-${x * finalProps.zoomSize - width + padding}px -${y * finalProps.zoomSize - height + padding}px`;

          triggerCustomEvent('magnifier-moved', container);
        },
        [
          magnifierDimensions,
          finalProps.zoomSize,
          finalProps.magnifierBorderWidth,
          handleGetCursorPos,
        ]
      );

      const handleShowMagnifier = useCallback(() => {
        const glass = glassRef.current;
        if (glass) {
          glass.classList.remove('hide-magnifier');
          glass.classList.add('show-magnifier');
          setIsMagnifierVisible(true);
          triggerCustomEvent('magnifier-visible', imageContainerRef.current);
        }
      }, []);

      const handleHideMagnifier = useCallback(() => {
        const glass = glassRef.current;
        if (glass) {
          glass.classList.remove('show-magnifier');
          glass.classList.add('hide-magnifier');
          setIsMagnifierVisible(false);
          triggerCustomEvent('magnifier-invisible', imageContainerRef.current);
        }
      }, []);

      const updateBackgroundPosition = useCallback(
        (glass: HTMLDivElement) => {
          const image = magnifiableImageRef.current;
          if (!image) return;

          const { width, height } = magnifierDimensions;
          const left = parseFloat(glass.style.left) || 0;
          const top = parseFloat(glass.style.top) || 0;

          const x = left + width;
          const y = top + height;

          const padding = finalProps.magnifierBorderWidth;
          glass.style.backgroundPosition = `-${x * finalProps.zoomSize - width + padding}px -${y * finalProps.zoomSize - height + padding}px`;
        },
        [magnifierDimensions, finalProps.zoomSize, finalProps.magnifierBorderWidth]
      );

      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (!isMagnifierVisible || !glassRef.current || !magnifiableImageRef.current) {
            return;
          }

          const glass = glassRef.current;
          const image = magnifiableImageRef.current;
          const step = 10;
          const maxLeft = image.width - magnifierDimensions.width / finalProps.zoomSize;
          const maxTop = image.height - magnifierDimensions.height / finalProps.zoomSize;

          let handled = false;

          switch (event.key) {
            case 'ArrowUp': {
              event.preventDefault();
              const currentTop = parseFloat(glass.style.top) || 0;
              glass.style.top = `${Math.max(0, Math.min(maxTop, currentTop - step))}px`;
              handled = true;
              break;
            }
            case 'ArrowDown': {
              event.preventDefault();
              const currentTopDown = parseFloat(glass.style.top) || 0;
              glass.style.top = `${Math.max(0, Math.min(maxTop, currentTopDown + step))}px`;
              handled = true;
              break;
            }
            case 'ArrowLeft': {
              event.preventDefault();
              const currentLeft = parseFloat(glass.style.left) || 0;
              glass.style.left = `${Math.max(0, Math.min(maxLeft, currentLeft - step))}px`;
              handled = true;
              break;
            }
            case 'ArrowRight': {
              event.preventDefault();
              const currentLeftRight = parseFloat(glass.style.left) || 0;
              glass.style.left = `${Math.max(0, Math.min(maxLeft, currentLeftRight + step))}px`;
              handled = true;
              break;
            }
            case 'Escape': {
              event.preventDefault();
              handleHideMagnifier();
              handled = true;
              break;
            }
            default:
              break;
          }

          if (handled && event.key !== 'Escape') {
            updateBackgroundPosition(glass);
            triggerCustomEvent('magnifier-moved', imageContainerRef.current);
          }
        },
        [
          isMagnifierVisible,
          handleHideMagnifier,
          updateBackgroundPosition,
          magnifierDimensions,
          finalProps.zoomSize,
        ]
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
          zoomSize: finalProps.zoomSize,
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

        if (ref) {
          if (typeof ref === 'function') {
            ref(container);
          } else {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = container;
          }
        }

        triggerCustomEvent('magnifier-initialized', container);

        return () => {
          if (glassRef.current) {
            glassRef.current.remove();
            glassRef.current = null;
          }
          isInitializedRef.current = false;
          if (ref) {
            if (typeof ref === 'function') {
              ref(null);
            } else {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = null;
            }
          }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [finalProps.imageUrl]);

      useEffect(() => {
        const glass = glassRef.current;
        const image = magnifiableImageRef.current;
        const container = imageContainerRef.current;

        if (!glass || !image || !container) {
          return;
        }

        glass.addEventListener('mousemove', handleMoveMagnifier);
        glass.addEventListener('touchmove', handleMoveMagnifier);
        image.addEventListener('mousemove', handleMoveMagnifier);
        image.addEventListener('touchmove', handleMoveMagnifier);

        container.addEventListener('mouseenter', handleShowMagnifier);
        container.addEventListener('mouseleave', handleHideMagnifier);
        container.addEventListener('focusin', handleShowMagnifier);
        container.addEventListener('focusout', handleHideMagnifier);

        window.addEventListener('keydown', handleKeyDown);

        return () => {
          glass.removeEventListener('mousemove', handleMoveMagnifier);
          glass.removeEventListener('touchmove', handleMoveMagnifier);
          image.removeEventListener('mousemove', handleMoveMagnifier);
          image.removeEventListener('touchmove', handleMoveMagnifier);
          container.removeEventListener('mouseenter', handleShowMagnifier);
          container.removeEventListener('mouseleave', handleHideMagnifier);
          container.removeEventListener('focusin', handleShowMagnifier);
          container.removeEventListener('focusout', handleHideMagnifier);
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleMoveMagnifier, handleShowMagnifier, handleHideMagnifier, handleKeyDown]);

      const containerClass = ['react-magnifier-image-container', finalProps.customContainerClass]
        .filter(Boolean)
        .join(' ');

      return (
        <>
          <MagnifierGlobalStyles />
          <ImageContainer
            className={containerClass}
            ref={imageContainerRef}
            role="group"
            aria-label="Image magnifier"
            tabIndex={0}
          >
            <img
              ref={magnifiableImageRef}
              className={finalProps.customImgClass || undefined}
              src={finalProps.imageUrl}
              width={finalProps.imageWidth}
              height={finalProps.imageHeight}
              alt={finalProps.imageAltText}
              role="img"
              aria-describedby={magnifierHelpId}
            />
            {isMagnifierVisible && (
              <SrOnly id={magnifierHelpId} role="status" aria-live="polite">
                Magnifier active. Use arrow keys to navigate, Escape to close.
              </SrOnly>
            )}
          </ImageContainer>
        </>
      );
    }
  )
);

ReactMagnifier.displayName = 'ReactMagnifier';

export default ReactMagnifier;
