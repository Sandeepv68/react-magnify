export interface ReactMagnifierProps {
  /** The URL of the image to magnify. */
  imageUrl: string;

  /** Alt text for the image element. */
  imageAltText: string;

  /** Width of the image element. Accepts any valid CSS width value. */
  imageWidth: number | string;

  /** Height of the image element. Accepts any valid CSS height value. */
  imageHeight: number | string;

  /** Height of the magnifier glass in pixels. */
  magnifierHeight: number;

  /** Width of the magnifier glass in pixels. */
  magnifierWidth: number;

  /** Border radius of the magnifier glass as a percentage. */
  magnifierRadius: number;

  /** CSS border-style value for the magnifier glass (e.g. "solid", "dashed"). */
  magnifierBorderStyle: string;

  /** CSS border-color value for the magnifier glass. */
  magnifierBorderColor: string;

  /** Border width of the magnifier glass in pixels. */
  magnifierBorderWidth: number;

  /** Whether to apply a drop shadow to the magnifier glass. */
  magnifierShadow: boolean;

  /** CSS cursor value applied over the magnifier glass area. */
  cursor: string;

  /** Magnification factor (e.g. 2 = 2x zoom). */
  zoomSize: number;

  /**
   * Callback invoked when the magnifier is initialized.
   * Receives the container HTMLDivElement as its argument.
   */
  getMagnifier: (container: HTMLDivElement | null) => void;

  /**
   * Custom CSS class name applied to the image element.
   * @deprecated Use `customImgClass` instead.
   */
  customImgStyles?: string;

  /**
   * Custom CSS class name applied to the container element.
   * @deprecated Use `customContainerClass` instead.
   */
  customContainerStyles?: string;

  /** Custom CSS class name applied to the image element. */
  customImgClass: string;

  /** Custom CSS class name applied to the container element. */
  customContainerClass: string;
}
