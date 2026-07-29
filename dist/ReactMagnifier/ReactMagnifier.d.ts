import { default as React } from 'react';
import { ReactMagnifierProps } from './ReactMagnifier.Interface';
/**
 * ReactMagnifier — an accessible, keyboard-navigable image magnifier.
 *
 * Wraps an `<img>` in a container and creates an overlay "magnifier glass" that
 * follows the cursor (or touch point) and shows a zoomed portion of the image.
 *
 * @remarks
 * The component is wrapped in both `React.memo` (to avoid unnecessary re-renders)
 * and `React.forwardRef` (so the parent can access the container `HTMLDivElement`).
 *
 * @example
 * ```tsx
 * import { ReactMagnifier } from '@sandeepv68/react-magnifier';
 *
 * function ProductPage() {
 *   return (
 *     <ReactMagnifier
 *       imageUrl="https://example.com/product.jpg"
 *       zoomSize={3}
 *       magnifierWidth={200}
 *       magnifierHeight={200}
 *     />
 *   );
 * }
 * ```
 *
 * @param props - See {@link ReactMagnifierProps} for all available options.
 * @param ref   - Forwarded ref attached to the container `<div>`.
 */
declare const ReactMagnifier: React.NamedExoticComponent<
  Partial<ReactMagnifierProps> & React.RefAttributes<HTMLDivElement>
>;
export default ReactMagnifier;
//# sourceMappingURL=ReactMagnifier.d.ts.map
