import styled, { createGlobalStyle } from 'styled-components';

/**
 * Global styles for the imperatively-created magnifier glass element
 * and the screen-reader utility class. These cannot be styled-components
 * because the glass DOM node is created manually in utils.ts.
 */
export const MagnifierGlobalStyles = createGlobalStyle`
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

/**
 * Styled container div that wraps the image and the magnifier glass.
 */
export const ImageContainer = styled.div`
  display: inline-block;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`;

/**
 * Visually hidden element for screen-reader announcements.
 */
export const SrOnly = styled.div`
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
