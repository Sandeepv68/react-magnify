export interface ReactMagnifierProps {
  imageUrl: string;
  imageAltText: string;
  imageWidth: number | string;
  imageHeight: number | string;
  magnifierHeight: number;
  magnifierWidth: number;
  magnifierRadius: number;
  magnifierBorderStyle: string;
  magnifierBorderColor: string;
  magnifierBorderWidth: number;
  magnifierShadow: boolean;
  cursor: string;
  zoomSize: number;
  getMagnifier: (container: HTMLDivElement | null) => void;
  /**
   * @deprecated Use `customImgClass` instead.
   */
  customImgStyles?: string;
  /**
   * @deprecated Use `customContainerClass` instead.
   */
  customContainerStyles?: string;
  customImgClass: string;
  customContainerClass: string;
}
//# sourceMappingURL=ReactMagnifier.Interface.d.ts.map
