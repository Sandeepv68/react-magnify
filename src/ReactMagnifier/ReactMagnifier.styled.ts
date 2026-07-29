import styled, { createGlobalStyle } from 'styled-components';

/**
 * Global CSS injected via styled-components' createGlobalStyle.
 *
 * Defines styles for the imperatively-created .react-magnifier-glass element
 * (position, sizing, z-index, shadow) and the visibility/opacity transition
 * classes (.show-magnifier / .hide-magnifier). A GlobalStyle is required here
 * because the glass DOM node is created imperatively in utils.ts rather than
 * rendered as a styled-component.
 */
export const MagnifierGlobalStyles = createGlobalStyle`
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
 * Wrapper <div> that holds the <img> and the magnifier glass overlay.
 * Uses inline-block layout and relative positioning so the absolutely-positioned
 * glass stays scoped to the container. A visible focus-ring is applied via
 * :focus-visible for keyboard accessibility.
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
 * Screen-reader-only utility element.
 * Visually hides content while keeping it available to assistive technology.
 * Used to announce magnifier state changes (visible / hidden / position updates).
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
